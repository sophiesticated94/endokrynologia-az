import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fsp from 'node:fs/promises';
import crypto from 'node:crypto';
import { Readable } from 'node:stream';
import { FileSystemObjectStorage } from '../lib/storage/filesystem/filesystem-object-storage.ts';
import { normalizeStorageKey } from '../lib/storage/storage-key.ts';
import { StorageAlreadyExistsError } from '../lib/storage/storage-errors.ts';

export function runObjectStorageContractTests(name, storageFactory, cleanup) {
  test(`ObjectStorage Contract [${name}]: put and get roundtrip with binary integrity`, async () => {
    const storage = await storageFactory();
    const key = normalizeStorageKey('test-folder/sample.txt');
    const content = Buffer.from('Hello, Universal Object Storage!');

    const stored = await storage.put(key, content);
    assert.equal(stored.key, key);
    assert.equal(stored.size, content.length);
    assert.equal(
      stored.sha256,
      crypto.createHash('sha256').update(content).digest('hex')
    );

    const retrieved = await storage.get(key);
    assert.ok(retrieved);
    assert.equal(retrieved.metadata.size, content.length);
    assert.equal(retrieved.metadata.sha256, stored.sha256);
    assert.deepEqual(Buffer.from(retrieved.data), content);
  });

  test(`ObjectStorage Contract [${name}]: stream write and stream read`, async () => {
    const storage = await storageFactory();
    const key = normalizeStorageKey('streams/data.bin');
    const randomBytes = crypto.randomBytes(64 * 1024); // 64 KB

    const webStream = Readable.toWeb(Readable.from([randomBytes]));
    const stored = await storage.put(key, webStream, { contentType: 'application/octet-stream' });
    assert.equal(stored.size, randomBytes.length);

    const readStream = await storage.getStream(key);
    assert.ok(readStream);

    const chunks = [];
    for await (const chunk of Readable.fromWeb(readStream)) {
      chunks.push(chunk);
    }
    const fullBuffer = Buffer.concat(chunks);
    assert.deepEqual(fullBuffer, randomBytes);
  });

  test(`ObjectStorage Contract [${name}]: stat, exists and delete`, async () => {
    const storage = await storageFactory();
    const key = normalizeStorageKey('lifecycle/image.png');
    const content = Buffer.from([0x89, 0x50, 0x4e, 0x47]); // PNG header

    assert.equal(await storage.exists(key), false);
    assert.equal(await storage.stat(key), null);

    await storage.put(key, content);
    assert.equal(await storage.exists(key), true);

    const stat = await storage.stat(key);
    assert.ok(stat);
    assert.equal(stat.mimeType, 'image/png');
    assert.equal(stat.size, 4);

    await storage.delete(key);
    assert.equal(await storage.exists(key), false);
    assert.equal(await storage.stat(key), null);

    // Idempotent delete
    await storage.delete(key);
  });

  test(`ObjectStorage Contract [${name}]: overwrite protection`, async () => {
    const storage = await storageFactory();
    const key = normalizeStorageKey('immutable/asset.webp');
    await storage.put(key, Buffer.from('v1'));

    await assert.rejects(
      async () => {
        await storage.put(key, Buffer.from('v2'), { overwrite: false });
      },
      StorageAlreadyExistsError
    );

    // Default overwrite = true succeeds
    await storage.put(key, Buffer.from('v2'));
    const retrieved = await storage.get(key);
    assert.equal(Buffer.from(retrieved.data).toString(), 'v2');
  });

  test(`ObjectStorage Contract [${name}]: list with prefix filtering`, async () => {
    const storage = await storageFactory();
    const p1 = normalizeStorageKey('courses/endocrinology/lesson1/img1.webp');
    const p2 = normalizeStorageKey('courses/endocrinology/lesson1/img2.webp');
    const p3 = normalizeStorageKey('courses/psychiatry/lesson1/img3.webp');

    await storage.put(p1, Buffer.from('img1'));
    await storage.put(p2, Buffer.from('img2'));
    await storage.put(p3, Buffer.from('img3'));

    const endoList = await storage.list('courses/endocrinology');
    const endoKeys = endoList.map(item => item.key);
    assert.ok(endoKeys.includes(p1));
    assert.ok(endoKeys.includes(p2));
    assert.ok(!endoKeys.includes(p3));
  });

  test(`ObjectStorage Contract [${name}]: zero byte content and unicode key`, async () => {
    const storage = await storageFactory();
    const key = normalizeStorageKey('języki/tarczyca-żółć.json');
    const content = Buffer.alloc(0);

    const stored = await storage.put(key, content);
    assert.equal(stored.size, 0);
    assert.equal(
      stored.sha256,
      crypto.createHash('sha256').update(content).digest('hex')
    );

    const got = await storage.get(key);
    assert.ok(got);
    assert.equal(got.data.length, 0);

    if (cleanup) {
      await cleanup();
    }
  });
}

// Run for FileSystemObjectStorage
const testDir = path.join(process.cwd(), '.tmp', `contract-tests-${Date.now()}`);
runObjectStorageContractTests(
  'FileSystemObjectStorage',
  async () => new FileSystemObjectStorage({ rootPath: testDir }),
  async () => {
    await fsp.rm(testDir, { recursive: true, force: true }).catch(() => {});
  }
);
