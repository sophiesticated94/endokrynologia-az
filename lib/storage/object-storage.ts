import type { StorageKey } from './storage-key.ts';

export type BinarySource =
  | Uint8Array
  | Buffer
  | ReadableStream<Uint8Array>
  | NodeJS.ReadableStream
  | string;

export interface PutObjectOptions {
  contentType?: string;
  metadata?: Record<string, string>;
  overwrite?: boolean;
}

export interface StoredObject {
  key: StorageKey;
  size: number;
  sha256: string;
  mimeType: string;
  createdAt: Date;
}

export interface StoredObjectMetadata {
  key: StorageKey;
  size: number;
  sha256: string;
  mimeType: string;
  updatedAt: Date;
  metadata?: Record<string, string>;
}

export interface StoredObjectContent {
  metadata: StoredObjectMetadata;
  data: Uint8Array;
}

export interface ObjectStorage {
  /**
   * Persists binary content under the logical key.
   * Calculates SHA-256 and writes atomically.
   */
  put(key: StorageKey, content: BinarySource, options?: PutObjectOptions): Promise<StoredObject>;

  /**
   * Reads the full object into memory.
   * Returns null if the object does not exist.
   */
  get(key: StorageKey): Promise<StoredObjectContent | null>;

  /**
   * Opens a readable stream for the object content.
   * Returns null if the object does not exist.
   */
  getStream(key: StorageKey): Promise<ReadableStream<Uint8Array> | null>;

  /**
   * Retrieves object metadata without reading the full body into memory.
   * Returns null if the object does not exist.
   */
  stat(key: StorageKey): Promise<StoredObjectMetadata | null>;

  /**
   * Checks whether the object exists.
   */
  exists(key: StorageKey): Promise<boolean>;

  /**
   * Deletes an object. Idempotent: does not throw if missing.
   */
  delete(key: StorageKey): Promise<void>;

  /**
   * Lists objects matching an optional key prefix.
   */
  list(prefix?: StorageKey | string): Promise<StoredObjectMetadata[]>;
}
