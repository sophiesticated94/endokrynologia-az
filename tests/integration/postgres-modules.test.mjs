import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import path from 'node:path';
import fsp from 'node:fs/promises';
import { runMigrations } from '../../scripts/run-migrations.mjs';
import { migrateModule } from '../../scripts/migrate-module.mjs';
import { createDatabase } from '../../db/postgres/index.ts';
import { PostgresContentRepository } from '../../lib/content/content-repository.ts';
import { ContentAssetRepository } from '../../lib/content/asset-repository.ts';
import { AssetService } from '../../lib/content/asset-service.ts';
import { FileSystemObjectStorage } from '../../lib/storage/filesystem/filesystem-object-storage.ts';
import { normalizeStorageKey } from '../../lib/storage/storage-key.ts';
import { getContentRepository } from '../../lib/content/content-repository-factory.ts';
import { getPreset, allWidgetPresets } from '../../lib/content/preset-registry.ts';
import { LessonRevisionDocumentSchema } from '../../lib/content/schemas/lesson-revision.ts';
import { lessons, lessonRevisions, contentSources } from '../../db/postgres/schema.ts';
import { eq, inArray } from 'drizzle-orm';

const TEST_DB_URL =
  process.env.DATABASE_URL_TEST ||
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/endokrynologia_test';

const MODULES_TO_TEST = [
  { id: 'tarczyca', expectedLessonCount: 16, sampleLessonId: 'fizjologia' },
  { id: 'cukrzyca', expectedLessonCount: 16, sampleLessonId: 'cukrzyca-fizjologia' },
  { id: 'przysadka', expectedLessonCount: 16, sampleLessonId: 'przysadka-fizjologia' },
];

test('PostgreSQL Integration: Parameterized Modules Migration & System Invariants', async (t) => {
  // Fail-fast if database is not reachable (never skip!)
  const { db, client, close } = createDatabase(TEST_DB_URL);
  try {
    await client`SELECT 1`;
  } catch (err) {
    throw new Error(
      `[FATAL] Integration tests require PostgreSQL! Database at ${TEST_DB_URL} is unreachable: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
  }

  // 1. Schema migrations & initial test database reset (runs once for entire suite)
  await t.test('Applies Drizzle schema migrations and resets test database', async () => {
    await runMigrations(TEST_DB_URL);
    await client`TRUNCATE TABLE lesson_revisions, lessons, modules, courses, content_assets, content_sources, evidence_claims, widget_presets CASCADE;`;
  });

  // 2. Global invariant: Immutable assets behavior
  await t.test('Global invariant: Immutable assets versioning protects existing files', async () => {
    const tempStorageRoot = path.join(process.cwd(), '.tmp', `asset-test-${Date.now()}`);
    const storage = new FileSystemObjectStorage({ rootPath: tempStorageRoot });
    const assetRepo = new ContentAssetRepository(db);
    const assetService = new AssetService(storage, assetRepo);

    const assetKey = normalizeStorageKey('course-assets/endocrinology/tarczyca/hpt-axis.webp');
    const contentV1 = crypto.randomBytes(512);
    const contentV2 = crypto.randomBytes(768);

    try {
      const recordV1 = await assetService.ingestAsset({
        key: assetKey,
        content: contentV1,
        mimeType: 'image/webp',
      });
      assert.ok(recordV1.id);
      assert.equal(recordV1.byteSize, 512);

      // Duplicate ingestion returns same record
      const dup = await assetService.ingestAsset({ key: assetKey, content: contentV1 });
      assert.equal(dup.id, recordV1.id);

      // Hash change creates new versioned asset without overwriting V1
      const recordV2 = await assetService.ingestAsset({
        key: assetKey,
        content: contentV2,
        mimeType: 'image/webp',
      });
      assert.notEqual(recordV2.id, recordV1.id);
      assert.notEqual(recordV2.objectKey, recordV1.objectKey);
      assert.equal(recordV2.byteSize, 768);

      // Old asset intact
      const getV1 = await assetService.getAsset(recordV1.id);
      assert.ok(getV1);
      assert.deepEqual(Buffer.from(getV1.data), contentV1);

      // New asset stored
      const getV2 = await assetService.getAsset(recordV2.id);
      assert.ok(getV2);
      assert.deepEqual(Buffer.from(getV2.data), contentV2);
    } finally {
      await fsp.rm(tempStorageRoot, { recursive: true, force: true }).catch(() => {});
    }
  });

  // 3. Global invariant: Widget presets registry
  await t.test('Global invariant: Central widget preset registry resolves registered presets', () => {
    assert.ok(Object.keys(allWidgetPresets).length >= 4);
    const hptPreset = getPreset('tarczyca-axis-hpt');
    assert.ok(hptPreset);
    assert.equal(hptPreset.moduleId, 'tarczyca');
    assert.equal(hptPreset.widgetType, 'axis-map');
  });

  // 4. Sequential parameterized migration & verification across all modules
  // NOTE: Database is NOT reset between modules to detect collisions across modules!
  for (const mod of MODULES_TO_TEST) {
    await t.test(`Module [${mod.id}]: Migration, Idempotency, Parity & Invariants`, async (mt) => {
      // 4.1 Apply migration
      await mt.test(`Migrates ${mod.id} with ${mod.expectedLessonCount} lessons`, async () => {
        const result = await migrateModule({
          module: mod.id,
          apply: true,
          databaseUrl: TEST_DB_URL,
        });
        assert.equal(result.success, true);
        assert.equal(result.totalLessons, mod.expectedLessonCount);
        assert.equal(result.insertedRevisions, mod.expectedLessonCount);
      });

      // 4.2 Idempotency
      await mt.test(`Re-running migration for ${mod.id} is strictly idempotent (0 new revisions)`, async () => {
        const rerun = await migrateModule({
          module: mod.id,
          apply: true,
          databaseUrl: TEST_DB_URL,
        });
        assert.equal(rerun.success, true);
        assert.equal(rerun.insertedRevisions, 0);
        assert.equal(rerun.skippedRevisions, mod.expectedLessonCount);
      });

      // 4.3 100% structured parity
      await mt.test(`Verifies 100% structured parity against static sources for ${mod.id}`, async () => {
        const verify = await migrateModule({
          module: mod.id,
          verify: true,
          databaseUrl: TEST_DB_URL,
        });
        assert.equal(verify.verified, true);
        assert.equal(verify.count, mod.expectedLessonCount);
      });

      // 4.4 Invariants: publishedRevisionId, sourceIds, Zod schema
      await mt.test(`Asserts database invariants and schema validity for ${mod.id}`, async () => {
        const repo = new PostgresContentRepository(db);
        const moduleLessons = await repo.listLessons(mod.id);
        assert.equal(moduleLessons.length, mod.expectedLessonCount);

        const allSourceIds = new Set();

        for (const l of moduleLessons) {
          assert.ok(l.id);
          assert.equal(l.moduleId, mod.id);

          // Full document fetch and Zod parse
          const doc = await repo.getLesson(l.id);
          assert.ok(doc, `Lesson ${l.id} must resolve from database`);
          const parsed = LessonRevisionDocumentSchema.parse(doc);
          assert.equal(parsed.id, l.id);

          for (const sid of parsed.sourceIds) {
            allSourceIds.add(sid);
          }

          // Invariant: no draft fallback when publishedRevisionId is null
          await db
            .update(lessons)
            .set({ publishedRevisionId: null })
            .where(eq(lessons.id, l.id));

          const unpub = await repo.getLesson(l.id);
          assert.equal(unpub, null, `Unpublished lesson ${l.id} must return null without fallback`);

          // Restore published revision
          const revs = await db
            .select()
            .from(lessonRevisions)
            .where(eq(lessonRevisions.lessonId, l.id))
            .limit(1);
          await db
            .update(lessons)
            .set({ publishedRevisionId: revs[0].id })
            .where(eq(lessons.id, l.id));
        }

        // Verify all sourceIds exist in content_sources table
        if (allSourceIds.size > 0) {
          const sourcesInDb = await db
            .select()
            .from(contentSources)
            .where(inArray(contentSources.id, [...allSourceIds]));
          assert.equal(sourcesInDb.length, allSourceIds.size, `All sourceIds in ${mod.id} must resolve in content_sources`);
        }
      });

      // 4.5 Runtime factory: compare and database modes
      await mt.test(`ContentRepositoryFactory: compare and database modes work for ${mod.id}`, async () => {
        process.env.CONTENT_DB_MODULES = mod.id;

        const dbRepo = getContentRepository({
          moduleId: mod.id,
          sourceMode: 'database',
          db,
        });
        const dbLesson = await dbRepo.getLesson(mod.sampleLessonId);
        assert.ok(dbLesson);
        assert.equal(dbLesson.id, mod.sampleLessonId);

        const compRepo = getContentRepository({
          moduleId: mod.id,
          sourceMode: 'compare',
          db,
        });
        const compLesson = await compRepo.getLesson(mod.sampleLessonId);
        assert.ok(compLesson);
        assert.equal(compLesson.id, mod.sampleLessonId);
      });
    });
  }

  await close();
});
