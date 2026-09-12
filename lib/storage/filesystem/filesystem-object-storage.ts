import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import type {
  ObjectStorage,
  BinarySource,
  PutObjectOptions,
  StoredObject,
  StoredObjectMetadata,
  StoredObjectContent,
} from '../object-storage.ts';
import { normalizeStorageKey, type StorageKey } from '../storage-key.ts';
import {
  StorageAlreadyExistsError,
  StorageInvalidKeyError,
} from '../storage-errors.ts';

const MIME_BY_EXT: Record<string, string> = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain',
};

function inferMimeType(key: string, explicit?: string): string {
  if (explicit) return explicit;
  const ext = path.extname(key).toLowerCase();
  return MIME_BY_EXT[ext] || 'application/octet-stream';
}

interface SidecarMeta {
  sha256: string;
  mimeType: string;
  size: number;
  updatedAt: string;
  metadata?: Record<string, string>;
}

export class FileSystemObjectStorage implements ObjectStorage {
  readonly rootPath: string;

  constructor(options: { rootPath: string }) {
    if (!options?.rootPath) {
      throw new Error('FileSystemObjectStorage requires rootPath');
    }
    this.rootPath = path.resolve(options.rootPath);
    if (!fs.existsSync(this.rootPath)) {
      fs.mkdirSync(this.rootPath, { recursive: true });
    }
  }

  private resolvePath(key: StorageKey): string {
    const normalizedKey = normalizeStorageKey(key);
    const resolved = path.resolve(this.rootPath, ...normalizedKey.split('/'));

    // Path containment check
    if (!resolved.startsWith(this.rootPath + path.sep) && resolved !== this.rootPath) {
      throw new StorageInvalidKeyError(`Path escapes storage root: ${key}`);
    }

    // Symlink escape check: check existing directory tree
    let current = resolved;
    while (current.length >= this.rootPath.length) {
      if (fs.existsSync(current)) {
        try {
          const real = fs.realpathSync(current);
          if (!real.startsWith(this.rootPath + path.sep) && real !== this.rootPath) {
            throw new StorageInvalidKeyError(`Symlink in path escapes storage root: ${key}`);
          }
        } catch (err: unknown) {
          if (err instanceof StorageInvalidKeyError) throw err;
        }
      }
      const parent = path.dirname(current);
      if (parent === current) break;
      current = parent;
    }

    return resolved;
  }

  private getSidecarPath(filePath: string): string {
    return `${filePath}.meta.json`;
  }

  async put(
    key: StorageKey,
    content: BinarySource,
    options?: PutObjectOptions
  ): Promise<StoredObject> {
    const targetPath = this.resolvePath(key);
    const overwrite = options?.overwrite ?? true;

    if (!overwrite && fs.existsSync(targetPath)) {
      throw new StorageAlreadyExistsError(key);
    }

    const targetDir = path.dirname(targetPath);
    await fsp.mkdir(targetDir, { recursive: true });

    // Temp file for atomic write
    const tempName = `.tmp-${crypto.randomUUID()}`;
    const tempPath = path.join(targetDir, tempName);
    const hash = crypto.createHash('sha256');
    let bytesWritten = 0;

    try {
      if (typeof content === 'string' || Buffer.isBuffer(content) || content instanceof Uint8Array) {
        const buffer = Buffer.isBuffer(content)
          ? content
          : typeof content === 'string'
            ? Buffer.from(content, 'utf-8')
            : Buffer.from(content.buffer, content.byteOffset, content.byteLength);

        hash.update(buffer);
        bytesWritten = buffer.length;
        await fsp.writeFile(tempPath, buffer);
      } else {
        // Stream write
        const fileStream = fs.createWriteStream(tempPath);
        const nodeReadable: NodeJS.ReadableStream =
          'getReader' in content && typeof content.getReader === 'function'
            ? Readable.fromWeb(content as import('node:stream/web').ReadableStream)
            : (content as NodeJS.ReadableStream);

        nodeReadable.on('data', (chunk: Buffer | Uint8Array) => {
          hash.update(chunk);
          bytesWritten += chunk.length;
        });

        await pipeline(nodeReadable, fileStream);
      }

      const sha256 = hash.digest('hex');
      const mimeType = inferMimeType(key, options?.contentType);
      const now = new Date();

      // Write sidecar metadata
      const sidecar: SidecarMeta = {
        sha256,
        mimeType,
        size: bytesWritten,
        updatedAt: now.toISOString(),
        metadata: options?.metadata,
      };
      const sidecarTemp = `${tempPath}.meta`;
      await fsp.writeFile(sidecarTemp, JSON.stringify(sidecar), 'utf-8');

      // Atomic rename temp -> target
      await fsp.rename(tempPath, targetPath);
      await fsp.rename(sidecarTemp, this.getSidecarPath(targetPath));

      return {
        key,
        size: bytesWritten,
        sha256,
        mimeType,
        createdAt: now,
      };
    } catch (err) {
      await fsp.unlink(tempPath).catch(() => {});
      await fsp.unlink(`${tempPath}.meta`).catch(() => {});
      throw err;
    }
  }

  async stat(key: StorageKey): Promise<StoredObjectMetadata | null> {
    const targetPath = this.resolvePath(key);
    try {
      const stats = await fsp.stat(targetPath);
      if (!stats.isFile()) return null;

      const sidecarPath = this.getSidecarPath(targetPath);
      if (fs.existsSync(sidecarPath)) {
        try {
          const raw = await fsp.readFile(sidecarPath, 'utf-8');
          const parsed = JSON.parse(raw) as SidecarMeta;
          return {
            key,
            size: parsed.size,
            sha256: parsed.sha256,
            mimeType: parsed.mimeType,
            updatedAt: new Date(parsed.updatedAt),
            metadata: parsed.metadata,
          };
        } catch {
          // Fall back to on-the-fly hash calculation if sidecar is corrupted
        }
      }

      const buffer = await fsp.readFile(targetPath);
      const sha256 = crypto.createHash('sha256').update(buffer).digest('hex');
      return {
        key,
        size: stats.size,
        sha256,
        mimeType: inferMimeType(key),
        updatedAt: stats.mtime,
      };
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        return null;
      }
      throw err;
    }
  }

  async exists(key: StorageKey): Promise<boolean> {
    const targetPath = this.resolvePath(key);
    try {
      const stats = await fsp.stat(targetPath);
      return stats.isFile();
    } catch {
      return false;
    }
  }

  async get(key: StorageKey): Promise<StoredObjectContent | null> {
    const meta = await this.stat(key);
    if (!meta) return null;

    const targetPath = this.resolvePath(key);
    const buffer = await fsp.readFile(targetPath);
    return {
      metadata: meta,
      data: new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength),
    };
  }

  async getStream(key: StorageKey): Promise<ReadableStream<Uint8Array> | null> {
    const targetPath = this.resolvePath(key);
    if (!fs.existsSync(targetPath)) return null;

    const nodeStream = fs.createReadStream(targetPath);
    return Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;
  }

  async delete(key: StorageKey): Promise<void> {
    const targetPath = this.resolvePath(key);
    await fsp.unlink(targetPath).catch(() => {});
    await fsp.unlink(this.getSidecarPath(targetPath)).catch(() => {});
  }

  async list(prefix?: StorageKey | string): Promise<StoredObjectMetadata[]> {
    const normalizedPrefix = prefix ? normalizeStorageKey(prefix) : '';
    const results: StoredObjectMetadata[] = [];

    const walk = async (dir: string): Promise<void> => {
      let entries: fs.Dirent[];
      try {
        entries = await fsp.readdir(dir, { withFileTypes: true });
      } catch {
        return;
      }

      for (const entry of entries) {
        if (entry.name.startsWith('.tmp') || entry.name.endsWith('.meta.json')) {
          continue;
        }

        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          await walk(fullPath);
        } else if (entry.isFile()) {
          const relPath = path.relative(this.rootPath, fullPath).replace(/\\/g, '/');
          if (!normalizedPrefix || relPath.startsWith(normalizedPrefix)) {
            const meta = await this.stat(relPath as StorageKey);
            if (meta) results.push(meta);
          }
        }
      }
    };

    await walk(this.rootPath);
    return results;
  }
}
