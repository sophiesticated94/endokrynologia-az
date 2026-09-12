import { normalizeStorageKey, type StorageKey } from '../storage/storage-key.ts';

export interface CourseAssetKeyParams {
  courseId: string;
  moduleId: string;
  lessonId: string;
  filename: string;
}

export function buildCourseAssetKey(params: CourseAssetKeyParams): StorageKey {
  const { courseId, moduleId, lessonId, filename } = params;
  return normalizeStorageKey(
    `course-assets/${courseId}/${moduleId}/${lessonId}/${filename}`
  );
}

export function buildSharedAssetKey(category: string, filename: string): StorageKey {
  return normalizeStorageKey(`shared/${category}/${filename}`);
}

export function buildContentAddressedKey(sha256: string, extension = ''): StorageKey {
  const p1 = sha256.slice(0, 2);
  const p2 = sha256.slice(2, 4);
  const ext = extension.startsWith('.') ? extension : extension ? `.${extension}` : '';
  return normalizeStorageKey(`objects/sha256/${p1}/${p2}/${sha256}${ext}`);
}
