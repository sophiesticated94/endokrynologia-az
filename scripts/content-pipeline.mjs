import crypto from 'node:crypto';
import { execSync } from 'node:child_process';
import { eq, and, desc, inArray } from 'drizzle-orm';
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
import { PostgresContentRepository } from '../lib/content/content-repository.ts';
import { compareLessonDocuments } from '../lib/content/structured-diff.ts';
import { getPreset, WidgetPresetDefinitionSchema } from '../lib/content/preset-registry.ts';
import { getDefaultObjectStorage } from '../lib/storage/create-object-storage.ts';
import { ContentAssetRepository } from '../lib/content/asset-repository.ts';
import { AssetService } from '../lib/content/asset-service.ts';
import { resolveCourseModuleSource, getAllModuleIds } from '../lib/content/source-adapter.ts';
import { verifyContentManifest } from '../lib/content/authoring-loader.ts';

function cleanAndSort(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(cleanAndSort);
  const sorted = {};
  for (const key of Object.keys(obj).sort()) {
    if (obj[key] !== undefined) sorted[key] = cleanAndSort(obj[key]);
  }
  return sorted;
}

export function canonicalHash(obj) {
  return crypto.createHash('sha256').update(JSON.stringify(cleanAndSort(obj))).digest('hex');
}

function getGitCommitSha() {
  try {
    return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

function buildLessonDocument(lesson, experience) {
  return {
    id: lesson.id,
    moduleId: lesson.moduleId,
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
}

async function syncMetadata(db, moduleSource) {
  const { course, module: modMeta, sources, claims } = moduleSource;
  await db.insert(courses).values({
    id: course.id,
    title: course.title,
    description: course.description,
    version: course.version,
    updatedAt: new Date(),
  }).onConflictDoUpdate({
    target: courses.id,
    set: { title: course.title, description: course.description, version: course.version, updatedAt: new Date() },
  });

  await db.insert(modules).values({
    id: modMeta.id,
    courseId: course.id,
    title: modMeta.name,
    subtitle: modMeta.subtitle || '',
    sortOrder: modMeta.sortOrder,
    updatedAt: new Date(),
  }).onConflictDoUpdate({
    target: modules.id,
    set: { title: modMeta.name, subtitle: modMeta.subtitle || '', sortOrder: modMeta.sortOrder, updatedAt: new Date() },
  });

  for (const src of Object.values(sources)) {
    await db.insert(contentSources).values({
      id: src.id,
      title: src.title,
      year: src.year,
      url: src.url,
      kind: src.kind,
      updatedAt: new Date(),
    }).onConflictDoUpdate({
      target: contentSources.id,
      set: { title: src.title, year: src.year, url: src.url, kind: src.kind, updatedAt: new Date() },
    });
  }

  if (claims) {
    for (const claim of Object.values(claims)) {
      const srcId = claim.sourceIds?.[0] || claim.sourceId;
      if (!srcId) continue;
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

export async function planPipeline(moduleId, db) {
  const modIds = moduleId ? [moduleId] : getAllModuleIds();
  console.log(`\n=================== CONTENT PUBLISHING PLAN ===================`);
  let totalUpToDate = 0;
  let totalNeedsStaging = 0;
  let totalStagedReady = 0;
  let totalStagedStale = 0;

  for (const mId of modIds) {
    const modSrc = resolveCourseModuleSource(mId);
    console.log(`\nModule: ${modSrc.module.name} (${mId}) [${modSrc.lessons.length} lessons]`);

    for (const lesson of modSrc.lessons) {
      const exp = modSrc.lessonExperiences[lesson.id];
      const rawDoc = buildLessonDocument(lesson, exp);
      const validatedDoc = LessonRevisionDocumentSchema.parse(rawDoc);
      const srcHash = canonicalHash(validatedDoc);

      const [lessonRow] = await db.select().from(lessons).where(eq(lessons.id, lesson.id)).limit(1);
      let publishedRev = null;
      if (lessonRow?.publishedRevisionId) {
        const [pRow] = await db.select().from(lessonRevisions).where(eq(lessonRevisions.id, lessonRow.publishedRevisionId)).limit(1);
        publishedRev = pRow || null;
      }

      const [stagedRev] = await db.select().from(lessonRevisions)
        .where(and(eq(lessonRevisions.lessonId, lesson.id), eq(lessonRevisions.status, 'review')))
        .orderBy(desc(lessonRevisions.version)).limit(1);

      let status = 'NEW';
      let details = '';

      if (publishedRev) {
        if (publishedRev.contentHash === srcHash) {
          status = 'UP_TO_DATE';
          totalUpToDate++;
        } else {
          status = 'MODIFIED';
          totalNeedsStaging++;
          const diff = compareLessonDocuments(publishedRev.document, validatedDoc);
          details = `diff: ${diff.hasChanges ? diff.changedFields.join(', ') : 'hash-only'}`;
        }
      } else {
        totalNeedsStaging++;
      }

      if (stagedRev) {
        if (stagedRev.contentHash === srcHash) {
          status = 'STAGED_READY';
          totalStagedReady++;
          details = `rev: ${stagedRev.id.slice(0, 8)} (v${stagedRev.version})`;
        } else {
          status = 'STAGED_STALE';
          totalStagedStale++;
          details = `staged hash mismatch! re-stage needed.`;
        }
      }

      const icon = status === 'UP_TO_DATE' ? '✓' : status === 'STAGED_READY' ? '⏳' : status === 'STAGED_STALE' ? '⚠️' : '⚡';
      console.log(`  ${icon} [${status.padEnd(12)}] ${lesson.id.padEnd(36)} ${details}`);
    }
  }

  console.log(`\nSummary: Up-to-date: ${totalUpToDate} | Needs staging: ${totalNeedsStaging} | Staged ready: ${totalStagedReady} | Staged stale: ${totalStagedStale}`);
  return { totalUpToDate, totalNeedsStaging, totalStagedReady, totalStagedStale };
}

export async function stagePipeline(moduleId, db) {
  const modIds = moduleId ? [moduleId] : getAllModuleIds();
  const commitSha = getGitCommitSha();
  const stagedRevisions = [];

  for (const mId of modIds) {
    const modSrc = resolveCourseModuleSource(mId);
    await syncMetadata(db, modSrc);
    console.log(`[stage] Staging module: ${mId} (commit ${commitSha.slice(0, 7)})...`);

    for (let i = 0; i < modSrc.lessons.length; i++) {
      const lesson = modSrc.lessons[i];
      const exp = modSrc.lessonExperiences[lesson.id];
      const rawDoc = buildLessonDocument(lesson, exp);
      const validatedDoc = LessonRevisionDocumentSchema.parse(rawDoc);
      const srcHash = canonicalHash(validatedDoc);

      await db.insert(lessons).values({
        id: lesson.id,
        moduleId: mId,
        title: lesson.title,
        subtitle: lesson.subtitle || lesson.title,
        sortOrder: i + 1,
        minutes: lesson.minutes,
        updatedAt: new Date(),
      }).onConflictDoUpdate({
        target: lessons.id,
        set: { title: lesson.title, subtitle: lesson.subtitle || lesson.title, sortOrder: i + 1, minutes: lesson.minutes, updatedAt: new Date() },
      });

      const [lessonRow] = await db.select().from(lessons).where(eq(lessons.id, lesson.id)).limit(1);
      if (lessonRow?.publishedRevisionId) {
        const [pub] = await db.select().from(lessonRevisions).where(eq(lessonRevisions.id, lessonRow.publishedRevisionId)).limit(1);
        if (pub && pub.contentHash === srcHash) {
          continue;
        }
      }

      const [existingStaged] = await db.select().from(lessonRevisions)
        .where(and(eq(lessonRevisions.lessonId, lesson.id), eq(lessonRevisions.status, 'review'), eq(lessonRevisions.contentHash, srcHash)))
        .limit(1);

      if (existingStaged) {
        stagedRevisions.push({ id: existingStaged.id, lessonId: lesson.id, version: existingStaged.version, action: 'reused' });
        continue;
      }

      const [latest] = await db.select().from(lessonRevisions).where(eq(lessonRevisions.lessonId, lesson.id)).orderBy(desc(lessonRevisions.version)).limit(1);
      const nextVersion = latest ? latest.version + 1 : 1;
      const revisionId = crypto.randomUUID();

      await db.insert(lessonRevisions).values({
        id: revisionId,
        lessonId: lesson.id,
        version: nextVersion,
        contentHash: srcHash,
        document: validatedDoc,
        status: 'review',
        sourceCommitSha: commitSha,
        changeSummary: latest ? `Update to version ${nextVersion} from ${commitSha.slice(0, 7)}` : 'Initial staged revision',
        reviewedAt: null,
      });

      stagedRevisions.push({ id: revisionId, lessonId: lesson.id, version: nextVersion, action: 'created' });
      console.log(`  + Staged revision ${revisionId} (v${nextVersion}) for lesson ${lesson.id}`);
    }
  }

  console.log(`[stage] Staging complete. Total staged revisions: ${stagedRevisions.length}`);
  return stagedRevisions;
}

export async function publishPipeline(options, db) {
  const { revisionId, moduleId, allStaged } = options;

  let targetRevisions = [];
  if (revisionId) {
    const [rev] = await db.select().from(lessonRevisions).where(eq(lessonRevisions.id, revisionId)).limit(1);
    if (!rev) throw new Error(`Revision not found: ${revisionId}`);
    targetRevisions = [rev];
  } else if (allStaged) {
    if (moduleId) {
      const modLessons = await db.select({ id: lessons.id }).from(lessons).where(eq(lessons.moduleId, moduleId));
      const lIds = modLessons.map(l => l.id);
      if (lIds.length > 0) {
        targetRevisions = await db.select().from(lessonRevisions)
          .where(and(inArray(lessonRevisions.lessonId, lIds), eq(lessonRevisions.status, 'review')));
      }
    } else {
      targetRevisions = await db.select().from(lessonRevisions).where(eq(lessonRevisions.status, 'review'));
    }
  } else {
    throw new Error('Must specify --revision-id=<UUID> or --all-staged (optionally with --module=<ID>)');
  }

  if (targetRevisions.length === 0) {
    console.log('[publish] No revisions eligible for publishing.');
    return [];
  }

  console.log(`[publish] Publishing ${targetRevisions.length} revision(s)...`);
  const published = [];

  for (const rev of targetRevisions) {
    if (rev.status === 'published') {
      console.log(`  - Revision ${rev.id} is already published.`);
      continue;
    }
    if (rev.status !== 'review') {
      throw new Error(`Cannot publish revision ${rev.id} with status "${rev.status}". Only "review" status can be published.`);
    }

    const [lessonRow] = await db.select().from(lessons).where(eq(lessons.id, rev.lessonId)).limit(1);
    if (!lessonRow) throw new Error(`Lesson "${rev.lessonId}" not found for revision ${rev.id}`);
    const modSrc = resolveCourseModuleSource(lessonRow.moduleId);
    const targetL = modSrc.lessons.find(l => l.id === rev.lessonId);
    if (!targetL) throw new Error(`Authoring source not found for lesson "${rev.lessonId}"`);

    const currentRawDoc = buildLessonDocument(targetL, modSrc.lessonExperiences[targetL.id]);
    const validatedDoc = LessonRevisionDocumentSchema.parse(currentRawDoc);
    const currentSrcHash = canonicalHash(validatedDoc);

    if (currentSrcHash !== rev.contentHash) {
      throw new Error(`STAGED_REVISION_STALE: Staged revision ${rev.id} for lesson "${rev.lessonId}" has hash ${rev.contentHash.slice(0, 10)}, but authoring source has changed to ${currentSrcHash.slice(0, 10)}. Re-stage before publishing!`);
    }

    await db.transaction(async (tx) => {
      if (lessonRow.publishedRevisionId && lessonRow.publishedRevisionId !== rev.id) {
        await tx.update(lessonRevisions).set({ status: 'archived' }).where(eq(lessonRevisions.id, lessonRow.publishedRevisionId));
      }
      await tx.update(lessonRevisions).set({ status: 'published', publishedAt: new Date() }).where(eq(lessonRevisions.id, rev.id));
      await tx.update(lessons).set({ publishedRevisionId: rev.id, updatedAt: new Date() }).where(eq(lessons.id, rev.lessonId));
    });

    published.push(rev);
    console.log(`  ✓ Published revision ${rev.id} (v${rev.version}) for lesson "${rev.lessonId}"`);
  }

  console.log(`[publish] Completed. Successfully published ${published.length} revision(s).`);
  return published;
}

export async function verifyPipeline(moduleId, db) {
  const modIds = moduleId ? [moduleId] : getAllModuleIds();
  const repo = new PostgresContentRepository(db);
  console.log(`\n=================== CONTENT VERIFICATION ===================`);
  let passed = 0;
  let failed = 0;

  for (const mId of modIds) {
    const modSrc = resolveCourseModuleSource(mId);
    console.log(`\nVerifying module: ${modSrc.module.name} (${mId})`);

    for (const lesson of modSrc.lessons) {
      const pgDoc = await repo.getLesson(lesson.id);
      if (!pgDoc) {
        console.error(`  ✗ [FAIL] Lesson "${lesson.id}": No published revision found in PostgreSQL!`);
        failed++;
        continue;
      }

      try {
        LessonRevisionDocumentSchema.parse(pgDoc);
      } catch (err) {
        console.error(`  ✗ [FAIL] Lesson "${lesson.id}": Invalid schema in DB: ${err.message}`);
        failed++;
        continue;
      }

      const expectedDoc = LessonRevisionDocumentSchema.parse(buildLessonDocument(lesson, modSrc.lessonExperiences[lesson.id]));
      const diff = compareLessonDocuments(pgDoc, expectedDoc);
      if (diff.hasChanges) {
        console.warn(`  ⚠️ [DRIFT] Lesson "${lesson.id}": Published DB content differs from authoring source: ${diff.changedFields.join(', ')}`);
      } else {
        console.log(`  ✓ [PASS] Lesson "${lesson.id}": Published and fully verified.`);
        passed++;
      }
    }
  }

  console.log(`\nVerification Result: Passed: ${passed} | Failed: ${failed}`);
  if (failed > 0) throw new Error(`Verification failed for ${failed} lesson(s).`);
  return { passed, failed };
}

export async function runPipelineCli() {
  const args = process.argv.slice(2);
  const command = args[0] || 'plan';
  const moduleArg = args.find((a) => a.startsWith('--module='))?.split('=')[1] || (!args[1]?.startsWith('-') ? args[1] : undefined);
  const revisionId = args.find((a) => a.startsWith('--revision-id='))?.split('=')[1];
  const allStaged = args.includes('--all-staged');
  const dbUrl = args.find((a) => a.startsWith('--database-url='))?.split('=')[1] || process.env.DATABASE_URL;

  const { db, close } = createDatabase(dbUrl);

  try {
    switch (command) {
      case 'plan':
        await planPipeline(moduleArg, db);
        break;
      case 'stage':
        await stagePipeline(moduleArg, db);
        break;
      case 'publish':
        await publishPipeline({ revisionId, moduleId: moduleArg, allStaged }, db);
        break;
      case 'verify':
        await verifyPipeline(moduleArg, db);
        break;
      case 'publish-all':
        await stagePipeline(undefined, db);
        await publishPipeline({ allStaged: true }, db);
        await verifyPipeline(undefined, db);
        break;
      case 'manifest-check':
        const res = await verifyContentManifest();
        if (!res.valid) {
          console.error('[manifest-check] FAILED:', res.errors);
          process.exit(1);
        }
        console.log(`[manifest-check] Manifest is valid (${res.entryCount} lessons checked).`);
        break;
      default:
        console.error(`Unknown command: "${command}". Available commands: plan, stage, publish, verify, publish-all, manifest-check`);
        process.exit(1);
    }
  } finally {
    await close();
  }
}

if (process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('scripts/content-pipeline.mjs')) {
  runPipelineCli().catch((err) => {
    console.error('[content-pipeline] Error:', err);
    process.exit(1);
  });
}
