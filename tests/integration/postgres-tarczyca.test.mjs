import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { runMigrations } from '../../scripts/run-migrations.mjs';
import { migrateModule } from '../../scripts/migrate-module.mjs';
import { createDatabase } from '../../db/postgres/index.ts';
import { PostgresContentRepository } from '../../lib/content/content-repository.ts';
import { ContentAssetRepository } from '../../lib/content/asset-repository.ts';
import { AssetService } from '../../lib/content/asset-service.ts';
import { FileSystemObjectStorage } from '../../lib/storage/filesystem/filesystem-object-storage.ts';
import { normalizeStorageKey } from '../../lib/storage/storage-key.ts';
import path from 'node:path';
import fsp from 'node:fs/promises';

const TEST_DB_URL =
  process.env.DATABASE_URL_TEST ||
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/endokrynologia_test';

test('PostgreSQL Integration: Migrations, Tarczyca Seed, Idempotency and Parity', async (t) => {
  // Check if database is reachable before running suite
  const { db, client, close } = createDatabase(TEST_DB_URL);
  try {
    await client`SELECT 1`;
  } catch {
    console.warn(`[skip] Database not reachable at ${TEST_DB_URL}. Skipping integration test.`);
    await close();
    return;
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
    assert.ok(result.insertedRevisions > 0);
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

  // 4. Parity verification
  await t.test('Verifies 100% parity against static TypeScript sources', async () => {
    const verifyResult = await migrateModule({
      module: 'tarczyca',
      verify: true,
      databaseUrl: TEST_DB_URL,
    });
    assert.equal(verifyResult.verified, true);
    assert.equal(verifyResult.count, 16);
  });

  // 5. Querying via PostgresContentRepository
  await t.test('PostgresContentRepository queries lessons with complete v2 structure', async () => {
    const repo = new PostgresContentRepository(db);
    const list = await repo.listLessons('tarczyca');
    assert.equal(list.length, 16);

    const fizjologia = await repo.getLesson('fizjologia');
    assert.ok(fizjologia);
    assert.equal(fizjologia.id, 'fizjologia');
    assert.equal(fizjologia.moduleId, 'tarczyca');
    assert.ok(fizjologia.goals.length >= 2);
    assert.ok(fizjologia.sections.length >= 3);
    assert.ok(fizjologia.table.headers.length >= 2);
    assert.ok(fizjologia.questions.length >= 5);
    assert.ok(fizjologia.experience);
    assert.equal(fizjologia.experience?.experienceVersion, 2);

    const kinetyka = await repo.getLesson('tarczyca-matematyka-kinetyka');
    assert.ok(kinetyka);
    assert.ok(kinetyka.derivation);
    assert.equal(kinetyka.derivation?.title.length > 0, true);
  });

  // 6. Asset ingestion and retrieval end-to-end
  await t.test('AssetService and ContentAssetRepository ingest and retrieve assets', async () => {
    const tempStorageRoot = path.join(process.cwd(), '.tmp', `asset-test-${Date.now()}`);
    const storage = new FileSystemObjectStorage({ rootPath: tempStorageRoot });
    const assetRepo = new ContentAssetRepository(db);
    const assetService = new AssetService(storage, assetRepo);

    const assetKey = normalizeStorageKey('course-assets/endocrinology/tarczyca/fizjologia/hpt-axis.webp');
    const fakeContent = crypto.randomBytes(1024);

    try {
      const record = await assetService.ingestAsset({
        key: assetKey,
        content: fakeContent,
        mimeType: 'image/webp',
        altText: 'Oś podwzgórze-przysadka-tarczyca',
        caption: 'Schemat sprzężenia zwrotnego HPT',
      });

      assert.ok(record.id);
      assert.equal(record.objectKey, assetKey);
      assert.equal(record.mimeType, 'image/webp');
      assert.equal(record.byteSize, 1024);

      // Retrieve via AssetService
      const retrieved = await assetService.getAsset(record.id);
      assert.ok(retrieved);
      assert.equal(retrieved.record.id, record.id);
      assert.deepEqual(Buffer.from(retrieved.data), fakeContent);

      // Stream retrieval
      const streamObj = await assetService.getAssetStream(record.id);
      assert.ok(streamObj);
      assert.ok(streamObj.stream);

      // Ingesting duplicate returns existing record
      const dup = await assetService.ingestAsset({
        key: assetKey,
        content: fakeContent,
      });
      assert.equal(dup.id, record.id);
    } finally {
      await fsp.rm(tempStorageRoot, { recursive: true, force: true }).catch(() => {});
    }
  });

  await close();
});
