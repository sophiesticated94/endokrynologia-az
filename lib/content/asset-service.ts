import type { ObjectStorage, BinarySource } from '../storage/object-storage.ts';
import type { StorageKey } from '../storage/storage-key.ts';
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

export class AssetService {
  private readonly storage: ObjectStorage;
  private readonly assetRepo: ContentAssetRepository;

  constructor(storage: ObjectStorage, assetRepo: ContentAssetRepository) {
    this.storage = storage;
    this.assetRepo = assetRepo;
  }

  async ingestAsset(params: IngestAssetParams): Promise<ContentAssetRecord> {
    const existing = await this.assetRepo.findByObjectKey(params.key);

    // Persist to storage
    const stored = await this.storage.put(params.key, params.content, {
      contentType: params.mimeType,
      overwrite: true,
    });

    if (existing) {
      // If already recorded and hash is identical, return it
      if (existing.sha256 === stored.sha256) {
        return existing;
      }
      // Update metadata and hash
      const updated = await this.assetRepo.update(existing.id, {
        sha256: stored.sha256,
        byteSize: stored.size,
        mimeType: stored.mimeType,
        width: params.width ?? existing.width,
        height: params.height ?? existing.height,
        altText: params.altText ?? existing.altText,
        caption: params.caption ?? existing.caption,
        attribution: params.attribution ?? existing.attribution,
        license: params.license ?? existing.license,
        metadata: (params.metadata as Record<string, unknown>) ?? existing.metadata,
      });
      return updated || existing;
    }

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
