import crypto from 'node:crypto';
import { eq, and, desc } from 'drizzle-orm';
import { createDatabase } from '../db/postgres/index.ts';
import {
  courses,
  modules,
  lessons,
  lessonRevisions,
  contentSources,
} from '../db/postgres/schema.ts';
import { LessonRevisionDocumentSchema } from '../lib/content/schemas/lesson-revision.ts';
import { PostgresContentRepository, StaticContentRepository } from '../lib/content/content-repository.ts';
import {
  lessons as staticLessons,
  lessonExperiences as staticExperiences,
  sources as staticSources,
  modulesList,
  CONTENT_VERSION,
} from '../lib/course.ts';

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

export async function migrateModule(options = {}) {
  const moduleId = options.module || 'tarczyca';
  const isApply = options.apply || false;
  const isVerifyOnly = options.verify || false;
  const databaseUrl = options.databaseUrl || process.env.DATABASE_URL;

  const targetLessons = staticLessons.filter((l) => l.moduleId === moduleId);
  if (targetLessons.length === 0) {
    throw new Error(`No lessons found for module: ${moduleId}`);
  }

  const moduleMeta = modulesList.find((m) => m.id === moduleId) || {
    id: moduleId,
    name: moduleId.charAt(0).toUpperCase() + moduleId.slice(1),
    subtitle: '',
  };

  const { db, close } = createDatabase(databaseUrl);

  try {
    if (isVerifyOnly) {
      console.log(`[verify] Checking parity for module "${moduleId}"...`);
      const pgRepo = new PostgresContentRepository(db);
      const staticRepo = new StaticContentRepository();

      const pgLessons = await pgRepo.listLessons(moduleId);
      console.log(`[verify] Database lessons count: ${pgLessons.length}, Static lessons count: ${targetLessons.length}`);

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
          console.error(`[verify] Lesson missing in database: ${staticL.id}`);
          diffCount++;
          continue;
        }

        const sHash = canonicalHash(staticDoc);
        const pHash = canonicalHash(pgDoc);

        if (sHash !== pHash) {
          console.error(`[verify] Hash mismatch for lesson ${staticL.id}: static=${sHash} vs pg=${pHash}`);
          diffCount++;
        }
      }

      if (diffCount > 0) {
        throw new Error(`Verification failed with ${diffCount} differences!`);
      }

      console.log(`[verify] 100% PARITY VERIFIED for all ${targetLessons.length} lessons in module "${moduleId}".`);
      return { success: true, count: targetLessons.length, verified: true };
    }

    console.log(`[migrate] Processing module: ${moduleId} (${targetLessons.length} lessons)`);
    console.log(`[migrate] Mode: ${isApply ? 'APPLY (writing to database)' : 'DRY RUN (simulation)'}`);

    if (isApply) {
      // 1. Ensure course exists
      await db
        .insert(courses)
        .values({
          id: 'endocrinology',
          title: 'Endokrynologia od A do Z',
          description: 'Interaktywny podręcznik i symulator kliniczny endokrynologii.',
          version: CONTENT_VERSION,
        })
        .onConflictDoUpdate({
          target: courses.id,
          set: {
            title: 'Endokrynologia od A do Z',
            version: CONTENT_VERSION,
            updatedAt: new Date(),
          },
        });

      // 2. Ensure module exists
      await db
        .insert(modules)
        .values({
          id: moduleId,
          courseId: 'endocrinology',
          title: moduleMeta.name,
          subtitle: moduleMeta.subtitle || '',
          sortOrder: 1,
        })
        .onConflictDoUpdate({
          target: modules.id,
          set: {
            title: moduleMeta.name,
            subtitle: moduleMeta.subtitle || '',
            updatedAt: new Date(),
          },
        });
    }

    // Collect and migrate relevant sources
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
    }

    let insertedRevisions = 0;
    let skippedRevisions = 0;

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

      // Strict validation through Zod
      const validated = LessonRevisionDocumentSchema.parse(doc);
      const hash = canonicalHash(validated);

      if (!isApply) {
        console.log(`[dry-run] Validated lesson ${lesson.id} (hash: ${hash.slice(0, 10)}...)`);
        continue;
      }

      // Upsert lesson identity
      await db
        .insert(lessons)
        .values({
          id: lesson.id,
          moduleId: moduleId,
          title: lesson.title,
          subtitle: lesson.subtitle || lesson.title,
          sortOrder: i + 1,
          minutes: lesson.minutes,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: lessons.id,
          set: {
            title: lesson.title,
            subtitle: lesson.subtitle || lesson.title,
            sortOrder: i + 1,
            minutes: lesson.minutes,
            updatedAt: new Date(),
          },
        });

      // Check if revision with same hash already exists (idempotency)
      const existingRev = await db
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
        // Query current max version
        const latestRows = await db
          .select()
          .from(lessonRevisions)
          .where(eq(lessonRevisions.lessonId, lesson.id))
          .orderBy(desc(lessonRevisions.version))
          .limit(1);

        const nextVersion = latestRows[0] ? latestRows[0].version + 1 : 1;

        const newRev = await db
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

      // Ensure publishedRevisionId points to current revision
      await db
        .update(lessons)
        .set({ publishedRevisionId: targetRevisionId })
        .where(eq(lessons.id, lesson.id));
    }

    console.log(
      `[migrate] Completed. Inserted revisions: ${insertedRevisions}, Skipped (unchanged): ${skippedRevisions}`
    );

    return {
      success: true,
      insertedRevisions,
      skippedRevisions,
      totalLessons: targetLessons.length,
    };
  } finally {
    await close();
  }
}

// CLI entry point
if (process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('scripts/migrate-module.mjs')) {
  const args = process.argv.slice(2);
  const moduleArg = args.find((a) => a.startsWith('--module='))?.split('=')[1] || 'tarczyca';
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
