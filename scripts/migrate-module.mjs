import crypto from 'node:crypto';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { eq, and, desc } from 'drizzle-orm';
import { createDatabase } from '../db/postgres/index.ts';
import {
  courses,
  modules,
  lessons,
  lessonRevisions,
  contentSources,
  evidenceClaims,
  widgetPresets,
} from '../db/postgres/schema.ts';
import { LessonRevisionDocumentSchema } from '../lib/content/schemas/lesson-revision.ts';
import {
  PostgresContentRepository,
  StaticContentRepository,
} from '../lib/content/content-repository.ts';
import { compareLessonDocuments } from '../lib/content/structured-diff.ts';
import { getPreset, WidgetPresetDefinitionSchema } from '../lib/content/preset-registry.ts';
import { getDefaultObjectStorage } from '../lib/storage/create-object-storage.ts';
import { ContentAssetRepository } from '../lib/content/asset-repository.ts';
import { AssetService } from '../lib/content/asset-service.ts';
import { buildCourseAssetKey } from '../lib/content/course-asset-key-builder.ts';
import { resolveCourseModuleSource } from '../lib/content/source-adapter.ts';

function cleanAndSort(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(cleanAndSort);
  const sorted = {};
  for (const key of Object.keys(obj).sort()) {
    if (obj[key] !== undefined) {
      sorted[key] = cleanAndSort(obj[key]);
    }
  }
  return sorted;
}

export function canonicalHash(obj) {
  const cleaned = cleanAndSort(obj);
  return crypto.createHash('sha256').update(JSON.stringify(cleaned)).digest('hex');
}

function collectPresetIds(doc) {
  const presetIds = new Set();
  if (doc.experience && doc.experience.blocks) {
    for (const block of doc.experience.blocks) {
      if (block.inlineEnhancements) {
        for (const enh of block.inlineEnhancements) {
          if (enh.presetId) {
            presetIds.add(enh.presetId);
          }
        }
      }
    }
  }
  return [...presetIds];
}

async function scanAndMigrateAssets(lesson, doc, assetService, isApply) {
  const jsonStr = JSON.stringify(doc);
  const pathRegex =
    /(?:["'(\s]|^)(\/(?:assets|images|public)\/[^"')\s]+|\b[\w\-\.\/]+\.(?:png|webp|jpg|jpeg|svg|avif|gif))(?:["')\s]|$)/gi;

  const foundPaths = new Set();
  let match;
  while ((match = pathRegex.exec(jsonStr)) !== null) {
    const raw = match[1];
    if (raw && !raw.startsWith('/api/assets/')) {
      foundPaths.add(raw);
    }
  }

  let migratedCount = 0;
  for (const rawPath of foundPaths) {
    let resolved = null;
    const candidates = [
      path.resolve(process.cwd(), rawPath.replace(/^\//, '')),
      path.resolve(process.cwd(), 'public', rawPath.replace(/^\//, '')),
    ];
    for (const cand of candidates) {
      if (fs.existsSync(cand)) {
        resolved = cand;
        break;
      }
    }

    if (!resolved) {
      throw new Error(
        `[migrate] Broken asset reference in lesson "${lesson.id}": "${rawPath}" could not be resolved on disk!`
      );
    }

    if (isApply && assetService) {
      const filename = path.basename(resolved);
      const key = buildCourseAssetKey({
        courseId: 'endocrinology',
        moduleId: doc.moduleId,
        lessonId: lesson.id,
        filename,
      });
      const fileBuffer = await fsp.readFile(resolved);
      const record = await assetService.ingestAsset({
        key,
        content: fileBuffer,
        originalFilename: filename,
      });
      doc.assetIds = doc.assetIds || [];
      if (!doc.assetIds.includes(record.id)) {
        doc.assetIds.push(record.id);
      }
      migratedCount++;
    }
  }

  return migratedCount;
}

export async function migrateModule(options = {}) {
  const moduleId = options.module || 'tarczyca';
  const isApply = options.apply || false;
  const isVerifyOnly = options.verify || false;
  const databaseUrl = options.databaseUrl || process.env.DATABASE_URL;

  const moduleSource = resolveCourseModuleSource(moduleId);
  const targetLessons = moduleSource.lessons;
  const moduleMeta = moduleSource.module;
  const courseMeta = moduleSource.course;
  const staticExperiences = moduleSource.lessonExperiences;
  const staticSources = moduleSource.sources;

  const { db, close } = createDatabase(databaseUrl);
  const storage = getDefaultObjectStorage();
  const assetRepo = new ContentAssetRepository(db);
  const assetService = new AssetService(storage, assetRepo);

  try {
    if (isVerifyOnly) {
      console.log(`[verify] Checking structured parity for module "${moduleId}"...`);
      const pgRepo = new PostgresContentRepository(db);
      const staticRepo = new StaticContentRepository();

      const pgLessons = await pgRepo.listLessons(moduleId);
      console.log(
        `[verify] Database lessons count: ${pgLessons.length}, Static lessons count: ${targetLessons.length}`
      );

      if (pgLessons.length !== targetLessons.length) {
        throw new Error(
          `Count mismatch: static has ${targetLessons.length}, postgres has ${pgLessons.length}`
        );
      }

      let diffCount = 0;
      for (const staticL of targetLessons) {
        const staticDoc = await staticRepo.getLesson(staticL.id);
        const pgDoc = await pgRepo.getLesson(staticL.id);

        if (!pgDoc) {
          console.error(
            `[verify] Lesson missing in database or publishedRevisionId not set: ${staticL.id}`
          );
          diffCount++;
          continue;
        }

        const diff = compareLessonDocuments(staticDoc, pgDoc);
        if (!diff.equal) {
          console.error(
            `[verify] Structured diff mismatch for lesson ${staticL.id}:`,
            diff.differences
          );
          diffCount++;
        }
      }

      if (diffCount > 0) {
        throw new Error(`Verification failed with ${diffCount} differences!`);
      }

      console.log(
        `[verify] 100% PARITY VERIFIED for all ${targetLessons.length} lessons in module "${moduleId}".`
      );
      return { success: true, count: targetLessons.length, verified: true };
    }

    console.log(`[migrate] Processing module: ${moduleId} (${targetLessons.length} lessons)`);
    console.log(`[migrate] Mode: ${isApply ? 'APPLY (writing to database)' : 'DRY RUN (simulation)'}`);

    if (isApply) {
      await db
        .insert(courses)
        .values({
          id: courseMeta.id,
          title: courseMeta.title,
          description: courseMeta.description,
          version: courseMeta.version,
        })
        .onConflictDoUpdate({
          target: courses.id,
          set: {
            title: courseMeta.title,
            description: courseMeta.description,
            version: courseMeta.version,
            updatedAt: new Date(),
          },
        });

      await db
        .insert(modules)
        .values({
          id: moduleId,
          courseId: courseMeta.id,
          title: moduleMeta.name,
          subtitle: moduleMeta.subtitle || '',
          sortOrder: moduleMeta.sortOrder,
        })
        .onConflictDoUpdate({
          target: modules.id,
          set: {
            title: moduleMeta.name,
            subtitle: moduleMeta.subtitle || '',
            sortOrder: moduleMeta.sortOrder,
            updatedAt: new Date(),
          },
        });

      // Pre-upsert all lessons in module so foreign keys from widget_presets are always satisfied
      for (let i = 0; i < targetLessons.length; i++) {
        const l = targetLessons[i];
        await db
          .insert(lessons)
          .values({
            id: l.id,
            moduleId: moduleId,
            title: l.title,
            subtitle: l.subtitle || l.title,
            sortOrder: i + 1,
            minutes: l.minutes,
            updatedAt: new Date(),
          })
          .onConflictDoUpdate({
            target: lessons.id,
            set: {
              title: l.title,
              subtitle: l.subtitle || l.title,
              sortOrder: i + 1,
              minutes: l.minutes,
              updatedAt: new Date(),
            },
          });
      }
    }

    // Sources
    const usedSourceIds = new Set(targetLessons.flatMap((l) => l.sourceIds));
    console.log(`[migrate] Found ${usedSourceIds.size} unique canonical sources.`);

    if (isApply) {
      for (const sourceId of usedSourceIds) {
        const src = staticSources[sourceId];
        if (src) {
          await db
            .insert(contentSources)
            .values({
              id: src.id,
              title: src.title,
              year: src.year,
              url: src.url,
              kind: src.kind,
              updatedAt: new Date(),
            })
            .onConflictDoUpdate({
              target: contentSources.id,
              set: {
                title: src.title,
                year: src.year,
                url: src.url,
                kind: src.kind,
                updatedAt: new Date(),
              },
            });
        }
      }

      if (moduleSource.claims) {
        for (const claim of Object.values(moduleSource.claims)) {
          const srcId = claim.sourceIds?.[0] || claim.sourceId;
          if (srcId) {
            const vals = {
              id: claim.id,
              sourceId: srcId,
              statement: claim.statement,
              quote: claim.quote,
              confidence: claim.confidence,
              category: claim.category,
              strength: claim.strength,
              metadata: {
                tags: claim.tags,
                lessonIds: claim.lessonIds,
                value: claim.value,
                unit: claim.unit,
                evidenceType: claim.evidenceType,
                reviewedAt: claim.reviewedAt,
              },
            };
            await db.insert(evidenceClaims).values(vals).onConflictDoUpdate({
              target: evidenceClaims.id,
              set: vals,
            });
          }
        }
      }
    }

    let insertedRevisions = 0;
    let skippedRevisions = 0;
    let totalAssetsMigrated = 0;
    let totalPresetsMigrated = 0;

    for (let i = 0; i < targetLessons.length; i++) {
      const lesson = targetLessons[i];
      const experience = staticExperiences[lesson.id];

      const doc = {
        id: lesson.id,
        moduleId: lesson.moduleId || moduleId,
        title: lesson.title,
        subtitle: lesson.subtitle || lesson.title,
        group: lesson.group,
        minutes: lesson.minutes,
        goals: lesson.goals,
        sections: lesson.sections,
        table: lesson.table,
        advanced: lesson.advanced,
        summary: lesson.summary,
        sourceIds: lesson.sourceIds,
        questions: lesson.questions,
        experience: experience || undefined,
        derivation: lesson.derivation,
        workedExample: lesson.workedExample,
        assetIds: [],
        review: lesson.review,
      };

      // 1. Scan and migrate real assets
      const assetCount = await scanAndMigrateAssets(lesson, doc, assetService, isApply);
      totalAssetsMigrated += assetCount;

      // 2. Validate and migrate referenced widget presets
      const referencedPresets = collectPresetIds(doc);
      for (const presetId of referencedPresets) {
        const presetDef = getPreset(presetId);
        if (!presetDef) {
          throw new Error(
            `[migrate] Broken preset reference in lesson "${lesson.id}": preset "${presetId}" not found in preset registry!`
          );
        }
        WidgetPresetDefinitionSchema.parse(presetDef);

        if (isApply) {
          await db
            .insert(widgetPresets)
            .values({
              id: presetDef.id,
              widgetKind: presetDef.widgetType,
              moduleId: presetDef.moduleId,
              lessonId: presetDef.lessonId,
              title: presetDef.title,
              initialState: presetDef.initialState,
              updatedAt: new Date(),
            })
            .onConflictDoUpdate({
              target: widgetPresets.id,
              set: {
                widgetKind: presetDef.widgetType,
                title: presetDef.title,
                initialState: presetDef.initialState,
                updatedAt: new Date(),
              },
            });
          totalPresetsMigrated++;
        }
      }

      // 3. Strict validation through Zod
      const validated = LessonRevisionDocumentSchema.parse(doc);
      const hash = canonicalHash(validated);

      if (!isApply) {
        console.log(`[dry-run] Validated lesson ${lesson.id} (hash: ${hash.slice(0, 10)}...)`);
        continue;
      }

      // 4. Transactional upsert and publishing
      await db.transaction(async (tx) => {
        const existingRev = await tx
          .select()
          .from(lessonRevisions)
          .where(
            and(
              eq(lessonRevisions.lessonId, lesson.id),
              eq(lessonRevisions.contentHash, hash)
            )
          )
          .limit(1);

        let targetRevisionId;

        if (existingRev[0]) {
          skippedRevisions++;
          targetRevisionId = existingRev[0].id;
        } else {
          const latestRows = await tx
            .select()
            .from(lessonRevisions)
            .where(eq(lessonRevisions.lessonId, lesson.id))
            .orderBy(desc(lessonRevisions.version))
            .limit(1);

          const nextVersion = latestRows[0] ? latestRows[0].version + 1 : 1;

          const newRev = await tx
            .insert(lessonRevisions)
            .values({
              lessonId: lesson.id,
              version: nextVersion,
              contentHash: hash,
              document: validated,
              status: 'published',
            })
            .returning();

          targetRevisionId = newRev[0].id;
          insertedRevisions++;
        }

        await tx
          .update(lessons)
          .set({ publishedRevisionId: targetRevisionId })
          .where(eq(lessons.id, lesson.id));
      });
    }

    console.log(
      `[migrate] Completed. Inserted revisions: ${insertedRevisions}, Skipped (unchanged): ${skippedRevisions}, Assets: ${totalAssetsMigrated}, Presets: ${totalPresetsMigrated}`
    );

    return {
      success: true,
      insertedRevisions,
      skippedRevisions,
      totalAssetsMigrated,
      totalPresetsMigrated,
      totalLessons: targetLessons.length,
    };
  } finally {
    await close();
  }
}

if (
  process.argv[1] &&
  process.argv[1].replace(/\\/g, '/').endsWith('scripts/migrate-module.mjs')
) {
  const args = process.argv.slice(2);
  const moduleArg =
    args.find((a) => a.startsWith('--module='))?.split('=')[1] || 'tarczyca';
  const apply = args.includes('--apply');
  const verify = args.includes('--verify');
  const dbUrlArg = args.find((a) => a.startsWith('--database-url='))?.split('=')[1];

  migrateModule({
    module: moduleArg,
    apply,
    verify,
    databaseUrl: dbUrlArg,
  }).catch((err) => {
    console.error('[migrate] Error:', err);
    process.exit(1);
  });
}
