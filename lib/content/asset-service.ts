import crypto from 'node:crypto';
import { Readable } from 'node:stream';
import type { ObjectStorage, BinarySource } from '../storage/object-storage.ts';
import { normalizeStorageKey, type StorageKey } from '../storage/storage-key.ts';
import type { ContentAssetRepository, ContentAssetRecord } from './asset-repository.ts';
import { StorageNotFoundError } from '../storage/storage-errors.ts';

export interface IngestAssetParams {
  key: StorageKey;
  content: BinarySource;
  mimeType?: string;
  width?: number;
  height?: number;
  altText?: string;
  caption?: string;
  attribution?: string;
  license?: string;
  originalFilename?: string;
  metadata?: Record<string, unknown>;
}

async function bufferAndHash(
  source: BinarySource
): Promise<{ buffer: Buffer; sha256: string; size: number }> {
  let buf: Buffer;
  if (Buffer.isBuffer(source)) {
    buf = source;
  } else if (typeof source === 'string') {
    buf = Buffer.from(source, 'utf-8');
  } else if (source instanceof Uint8Array) {
    buf = Buffer.from(source.buffer, source.byteOffset, source.byteLength);
  } else {
    const chunks: Buffer[] = [];
    const stream =
      'getReader' in source
        ? Readable.fromWeb(source as import('node:stream/web').ReadableStream)
        : (source as NodeJS.ReadableStream);
    for await (const chunk of stream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    buf = Buffer.concat(chunks);
  }
  const sha256 = crypto.createHash('sha256').update(buf).digest('hex');
  return { buffer: buf, sha256, size: buf.length };
}

export class AssetService {
  private readonly storage: ObjectStorage;
  private readonly assetRepo: ContentAssetRepository;

  constructor(storage: ObjectStorage, assetRepo: ContentAssetRepository) {
    this.storage = storage;
    this.assetRepo = assetRepo;
  }

  async ingestAsset(params: IngestAssetParams): Promise<ContentAssetRecord> {
    const existing = await this.assetRepo.findByObjectKey(params.key);
    const { buffer, sha256, size } = await bufferAndHash(params.content);

    if (existing) {
      // If already recorded and hash is identical, return existing record
      if (existing.sha256 === sha256) {
        return existing;
      }

      // Hash changed: NEVER mutate existing asset under immutable cache control!
      // Create a new versioned asset key and a new asset record, keeping the old one intact.
      const keyStr = params.key as string;
      const lastDot = keyStr.lastIndexOf('.');
      const ext = lastDot !== -1 ? keyStr.slice(lastDot) : '';
      const base = lastDot !== -1 ? keyStr.slice(0, lastDot) : keyStr;
      const versionedKey = normalizeStorageKey(`${base}-${sha256.slice(0, 8)}${ext}`);

      // Persist new version to storage without overwriting old key
      const storedVersioned = await this.storage.put(versionedKey, buffer, {
        contentType: params.mimeType,
        overwrite: true,
      });

      return await this.assetRepo.create({
        objectKey: versionedKey,
        sha256: storedVersioned.sha256,
        mimeType: storedVersioned.mimeType,
        byteSize: storedVersioned.size,
        width: params.width,
        height: params.height,
        altText: params.altText,
        caption: params.caption,
        attribution: params.attribution,
        license: params.license,
        originalFilename: params.originalFilename,
        metadata: (params.metadata as Record<string, unknown>) ?? {},
      });
    }

    // Persist new asset to storage
    const stored = await this.storage.put(params.key, buffer, {
      contentType: params.mimeType,
      overwrite: true,
    });

    // Insert new asset record
    return await this.assetRepo.create({
      objectKey: params.key,
      sha256: stored.sha256,
      mimeType: stored.mimeType,
      byteSize: stored.size,
      width: params.width,
      height: params.height,
      altText: params.altText,
      caption: params.caption,
      attribution: params.attribution,
      license: params.license,
      originalFilename: params.originalFilename,
      metadata: (params.metadata as Record<string, unknown>) ?? {},
    });
  }

  async getAsset(
    assetId: string
  ): Promise<{ record: ContentAssetRecord; data: Uint8Array } | null> {
    const record = await this.assetRepo.findById(assetId);
    if (!record) return null;

    const content = await this.storage.get(record.objectKey as StorageKey);
    if (!content) {
      throw new StorageNotFoundError(record.objectKey);
    }

    return { record, data: content.data };
  }

  async getAssetStream(
    assetId: string
  ): Promise<{ record: ContentAssetRecord; stream: ReadableStream<Uint8Array> } | null> {
    const record = await this.assetRepo.findById(assetId);
    if (!record) return null;

    const stream = await this.storage.getStream(record.objectKey as StorageKey);
    if (!stream) {
      throw new StorageNotFoundError(record.objectKey);
    }

    return { record, stream };
  }
}
