import path from 'node:path';
import type { ObjectStorage } from './object-storage.ts';
import { FileSystemObjectStorage } from './filesystem/filesystem-object-storage.ts';

export interface StorageConfig {
  provider?: 'filesystem' | 's3' | string;
  rootPath?: string;
}

let cachedStorage: ObjectStorage | null = null;

export function createObjectStorage(config?: StorageConfig): ObjectStorage {
  const provider = config?.provider || process.env.CONTENT_STORAGE_PROVIDER || 'filesystem';

  switch (provider) {
    case 'filesystem': {
      const rootPath =
        config?.rootPath ||
        process.env.CONTENT_STORAGE_ROOT ||
        path.join(process.cwd(), '.data', 'storage');
      return new FileSystemObjectStorage({ rootPath });
    }
    default:
      throw new Error(`Unsupported CONTENT_STORAGE_PROVIDER: ${provider}`);
  }
}

export function getDefaultObjectStorage(): ObjectStorage {
  if (!cachedStorage) {
    cachedStorage = createObjectStorage();
  }
  return cachedStorage;
}
