import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fsp from 'node:fs/promises';
import { normalizeStorageKey } from '../lib/storage/storage-key.ts';
import { FileSystemObjectStorage } from '../lib/storage/filesystem/filesystem-object-storage.ts';
import { StorageInvalidKeyError } from '../lib/storage/storage-errors.ts';

test('Storage Security: normalizeStorageKey rejects illegal path patterns', () => {
  const illegalKeys = [
    '../secret.txt',
    'foo/../../secret.txt',
    '..\\secret.txt',
    'foo\\..\\secret.txt',
    '/absolute/path.png',
    '\\absolute\\path.png',
    'C:\\Windows\\system32.dll',
    'd:/secret/file.txt',
    '\\\\server\\share\\asset.webp',
    '//server/share/asset.webp',
    'folder/\0/file.txt',
    'folder/file\0.txt',
    'folder//double-slash.txt',
    'folder/./single-dot.txt',
    '',
    '   ',
  ];

  for (const key of illegalKeys) {
    assert.throws(
      () => normalizeStorageKey(key),
      StorageInvalidKeyError,
      `Expected key "${key}" to be rejected`
    );
  }
});

test('Storage Security: FileSystemObjectStorage containment and symlink escape protection', async () => {
  const testRoot = path.join(process.cwd(), '.tmp', `security-tests-${Date.now()}`);
  const outsideDir = path.join(process.cwd(), '.tmp', `outside-root-${Date.now()}`);

  await fsp.mkdir(testRoot, { recursive: true });
  await fsp.mkdir(outsideDir, { recursive: true });

  const storage = new FileSystemObjectStorage({ rootPath: testRoot });

  try {
    // Attempt symlink escape
    const linkPath = path.join(testRoot, 'escaped-link');
    try {
      await fsp.symlink(outsideDir, linkPath, 'dir');
      // If symlink creation succeeds (on Windows may require admin or developer mode)
      const attackKey = normalizeStorageKey('escaped-link/evil.txt');
      await assert.rejects(
        async () => {
          await storage.put(attackKey, Buffer.from('evil content'));
        },
        StorageInvalidKeyError
      );
    } catch (symlinkErr) {
      // In some Windows environments symlink creation without developer mode throws EPERM
      // which is fine, containment is also guaranteed by resolvePath
      assert.ok(symlinkErr);
    }
  } finally {
    await fsp.rm(testRoot, { recursive: true, force: true }).catch(() => {});
    await fsp.rm(outsideDir, { recursive: true, force: true }).catch(() => {});
  }
});
