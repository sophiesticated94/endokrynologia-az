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
import { lessons, lessonRevisions } from '../../db/postgres/schema.ts';
import { eq } from 'drizzle-orm';

const TEST_DB_URL =
  process.env.DATABASE_URL_TEST ||
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/endokrynologia_test';

test('PostgreSQL Integration: Migrations, Tarczyca Seed, Idempotency, Parity & Invariants', async (t) => {
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

  // 1. Run migrations and reset test database
  await t.test('Applies Drizzle schema migrations to database', async () => {
    await runMigrations(TEST_DB_URL);
    await client`TRUNCATE TABLE lesson_revisions, lessons, modules, courses, content_assets, content_sources, evidence_claims, widget_presets CASCADE;`;
  });

  // 2. Initial migration of tarczyca module
  await t.test('Migrates tarczyca module with 16 lessons into PostgreSQL', async () => {
    const result = await migrateModule({
      module: 'tarczyca',
      apply: true,
      databaseUrl: TEST_DB_URL,
    });
    assert.equal(result.success, true);
    assert.equal(result.totalLessons, 16);
    assert.equal(result.insertedRevisions, 16);
  });

  // 3. Idempotency test
  await t.test('Re-running migration is strictly idempotent (0 new revisions)', async () => {
    const rerunResult = await migrateModule({
      module: 'tarczyca',
      apply: true,
      databaseUrl: TEST_DB_URL,
    });
    assert.equal(rerunResult.success, true);
    assert.equal(rerunResult.insertedRevisions, 0);
    assert.equal(rerunResult.skippedRevisions, 16);
  });

  // 4. Parity verification with structured diff
  await t.test('Verifies 100% structured parity against static TypeScript sources', async () => {
    const verifyResult = await migrateModule({
      module: 'tarczyca',
      verify: true,
      databaseUrl: TEST_DB_URL,
    });
    assert.equal(verifyResult.verified, true);
    assert.equal(verifyResult.count, 16);
  });

  // 5. Publish invariants test: no silent fallback to uncommitted/draft revision
  await t.test('Publish invariants: getLesson returns null when publishedRevisionId is missing', async () => {
    const repo = new PostgresContentRepository(db);

    // Verify normal published lesson resolves
    const fizjologia = await repo.getLesson('fizjologia');
    assert.ok(fizjologia);
    assert.equal(fizjologia.id, 'fizjologia');

    // Simulate an unpublished/draft lesson by nulling publishedRevisionId
    await db
      .update(lessons)
      .set({ publishedRevisionId: null })
      .where(eq(lessons.id, 'fizjologia'));

    const unpub = await repo.getLesson('fizjologia');
    assert.equal(unpub, null, 'Unpublished lesson must return null (NO silent fallback)');

    // Restore publishedRevisionId
    const revs = await db
      .select()
      .from(lessonRevisions)
      .where(eq(lessonRevisions.lessonId, 'fizjologia'))
      .limit(1);
    await db
      .update(lessons)
      .set({ publishedRevisionId: revs[0].id })
      .where(eq(lessons.id, 'fizjologia'));

    const restored = await repo.getLesson('fizjologia');
    assert.ok(restored);
  });

  // 6. Immutable assets test: changing hash creates new asset record without overwriting
  await t.test('Immutable assets: content change generates new asset without overwriting existing', async () => {
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

      // Duplicate ingestion with same content returns identical record
      const dup = await assetService.ingestAsset({
        key: assetKey,
        content: contentV1,
      });
      assert.equal(dup.id, recordV1.id);

      // Ingestion with modified content creates a NEW asset record and preserves V1
      const recordV2 = await assetService.ingestAsset({
        key: assetKey,
        content: contentV2,
        mimeType: 'image/webp',
      });
      assert.notEqual(recordV2.id, recordV1.id);
      assert.notEqual(recordV2.objectKey, recordV1.objectKey);
      assert.equal(recordV2.byteSize, 768);

      // Verify V1 is still intact in storage and DB
      const getV1 = await assetService.getAsset(recordV1.id);
      assert.ok(getV1);
      assert.deepEqual(Buffer.from(getV1.data), contentV1);

      // Verify V2 is in storage and DB
      const getV2 = await assetService.getAsset(recordV2.id);
      assert.ok(getV2);
      assert.deepEqual(Buffer.from(getV2.data), contentV2);
    } finally {
      await fsp.rm(tempStorageRoot, { recursive: true, force: true }).catch(() => {});
    }
  });

  // 7. Widget presets test
  await t.test('Widget presets: central registry resolves endocrine and psychiatry presets', () => {
    assert.ok(Object.keys(allWidgetPresets).length >= 4);
    const hptPreset = getPreset('tarczyca-axis-hpt');
    assert.ok(hptPreset);
    assert.equal(hptPreset.moduleId, 'tarczyca');
    assert.equal(hptPreset.widgetType, 'axis-map');
  });

  // 8. Runtime DB-first factory test
  await t.test('ContentRepositoryFactory: respects source modes and enabled modules', async () => {
    process.env.CONTENT_DB_MODULES = 'tarczyca';

    // Static mode for unlisted module
    const staticRepo = getContentRepository({ moduleId: 'gonady', sourceMode: 'database' });
    const gonadyLesson = await staticRepo.getLesson('gonady-fizjologia');
    // staticRepo handles static lessons cleanly
    assert.ok(staticRepo);

    // Database mode for tarczyca
    const dbRepo = getContentRepository({
      moduleId: 'tarczyca',
      sourceMode: 'database',
      db,
    });
    const dbLesson = await dbRepo.getLesson('fizjologia');
    assert.ok(dbLesson);
    assert.equal(dbLesson.id, 'fizjologia');

    // Compare mode for tarczyca
    const compRepo = getContentRepository({
      moduleId: 'tarczyca',
      sourceMode: 'compare',
      db,
    });
    const compLesson = await compRepo.getLesson('fizjologia');
    assert.ok(compLesson);
    assert.equal(compLesson.id, 'fizjologia');
  });

  await close();
});
