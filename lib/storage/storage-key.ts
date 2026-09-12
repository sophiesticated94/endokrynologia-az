import { StorageInvalidKeyError } from './storage-errors.ts';

declare const StorageKeyBrand: unique symbol;
export type StorageKey = string & { readonly [StorageKeyBrand]: true };

const MAX_KEY_LENGTH = 1024;
const DRIVE_LETTER_REGEX = /^[a-zA-Z]:/;

/**
 * Validates and normalizes a raw path or key into a safe, POSIX-style StorageKey.
 * Rejects path traversal (.., .), empty segments, leading slashes, drive letters, UNC, null bytes.
 */
export function normalizeStorageKey(rawKey: unknown): StorageKey {
  if (typeof rawKey !== 'string') {
    throw new StorageInvalidKeyError('Storage key must be a string');
  }

  const trimmed = rawKey.trim();
  if (!trimmed) {
    throw new StorageInvalidKeyError('Storage key cannot be empty');
  }

  if (trimmed.length > MAX_KEY_LENGTH) {
    throw new StorageInvalidKeyError(`Storage key exceeds maximum length of ${MAX_KEY_LENGTH}`);
  }

  if (trimmed.includes('\0')) {
    throw new StorageInvalidKeyError('Storage key cannot contain null bytes');
  }

  if (DRIVE_LETTER_REGEX.test(trimmed) || trimmed.includes(':\\') || trimmed.includes(':/')) {
    throw new StorageInvalidKeyError('Storage key cannot contain Windows drive letters');
  }

  if (trimmed.startsWith('//') || trimmed.startsWith('\\\\')) {
    throw new StorageInvalidKeyError('Storage key cannot be a UNC path');
  }

  if (trimmed.startsWith('/') || trimmed.startsWith('\\')) {
    throw new StorageInvalidKeyError('Storage key must be relative, cannot start with / or \\');
  }

  // Convert backslashes to forward slashes
  const converted = trimmed.replace(/\\/g, '/');

  const segments = converted.split('/');
  for (const segment of segments) {
    if (segment === '') {
      throw new StorageInvalidKeyError('Storage key cannot contain empty path segments (//)');
    }
    if (segment === '.' || segment === '..') {
      throw new StorageInvalidKeyError('Storage key cannot contain relative traversal segments (. or ..)');
    }
  }

  return segments.join('/') as StorageKey;
}

export function isStorageKey(val: unknown): val is StorageKey {
  try {
    normalizeStorageKey(val);
    return true;
  } catch {
    return false;
  }
}
