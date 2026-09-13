if (typeof window !== 'undefined') {
  throw new Error('AuthoringLoader is server/tooling-only and cannot be executed in the browser.');
}

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import type { CourseModuleSource } from './source-adapter.ts';
import type { Lesson, LessonExperienceV2, Source } from '../course-types.ts';
import {
  LessonRevisionDocumentSchema,
  LessonExperienceV2Schema,
  EvidenceClaimSchema,
  type EvidenceClaim,
} from './schemas/lesson-revision.ts';

const ENDO_COURSE_INFO = {
  id: 'endocrinology',
  title: 'Endokrynologia od A do Z',
  description: 'Interaktywny podręcznik i symulator kliniczny endokrynologii.',
  version: '2026.09.13',
};

function canonicalHash(obj: unknown): string {
  const cleanAndSort = (item: unknown): unknown => {
    if (item === null || typeof item !== 'object') return item;
    if (Array.isArray(item)) return item.map(cleanAndSort);
    const sorted: Record<string, unknown> = {};
    for (const key of Object.keys(item as Record<string, unknown>).sort()) {
      sorted[key] = cleanAndSort((item as Record<string, unknown>)[key]);
    }
    return sorted;
  };
  const cleaned = cleanAndSort(obj);
  return crypto.createHash('sha256').update(JSON.stringify(cleaned)).digest('hex');
}

export function isContentSrcModule(moduleId: string, baseDir?: string): boolean {
  const root = baseDir || path.resolve(process.cwd(), 'content-src');
  const modDir = path.join(root, 'endocrinology', moduleId);
  return fs.existsSync(path.join(modDir, 'module.json'));
}

export async function loadCourseModuleFromContentSrc(
  moduleId: string,
  baseDir?: string
): Promise<CourseModuleSource & { claims: Record<string, EvidenceClaim> }> {
  const root = baseDir || path.resolve(process.cwd(), 'content-src');
  const modDir = path.join(root, 'endocrinology', moduleId);

  if (!fs.existsSync(modDir)) {
    throw new Error(`Module directory not found: ${modDir}`);
  }

  // 1. module.json
  const moduleRaw = JSON.parse(await fsp.readFile(path.join(modDir, 'module.json'), 'utf8'));
  if (moduleRaw.id !== moduleId) {
    throw new Error(`module.json id "${moduleRaw.id}" does not match requested moduleId "${moduleId}"`);
  }

  // 2. sources.json
  const sourcesRaw = JSON.parse(await fsp.readFile(path.join(modDir, 'sources.json'), 'utf8')) as Record<string, Source>;

  // 3. claims.json
  const claimsPath = path.join(modDir, 'claims.json');
  const claimsList: EvidenceClaim[] = fs.existsSync(claimsPath)
    ? (JSON.parse(await fsp.readFile(claimsPath, 'utf8')) as EvidenceClaim[])
    : [];
  const claimsMap: Record<string, EvidenceClaim> = {};

  for (const c of claimsList) {
    EvidenceClaimSchema.parse(c);
    if (claimsMap[c.id]) {
      throw new Error(`Duplicate claim ID in ${moduleId}: "${c.id}"`);
    }
    claimsMap[c.id] = c;
    for (const sid of c.sourceIds) {
      if (!sourcesRaw[sid]) {
        throw new Error(`Claim "${c.id}" references unknown sourceId "${sid}" in module "${moduleId}"`);
      }
    }
  }

  // 4. lessons/*.json
  const lessonsDir = path.join(modDir, 'lessons');
  const lessonFiles = (await fsp.readdir(lessonsDir)).filter((f) => f.endsWith('.json')).sort();

  const lessons: Lesson[] = [];
  const lessonIds = new Set<string>();

  for (const file of lessonFiles) {
    const raw = JSON.parse(await fsp.readFile(path.join(lessonsDir, file), 'utf8'));
    const expectedId = file.replace(/\.json$/, '');
    if (raw.id !== expectedId) {
      throw new Error(`Lesson file "${file}" has mismatched internal ID "${raw.id}"`);
    }
    if (lessonIds.has(raw.id)) {
      throw new Error(`Duplicate lesson ID "${raw.id}" found in ${moduleId}`);
    }
    lessonIds.add(raw.id);

    // Validate against LessonRevisionDocumentSchema
    LessonRevisionDocumentSchema.parse(raw);

    for (const sid of raw.sourceIds) {
      if (!sourcesRaw[sid]) {
        throw new Error(`Lesson "${raw.id}" references unknown sourceId "${sid}"`);
      }
    }

    lessons.push(raw as Lesson);
  }

  // 5. experiences/*.json
  const experiencesDir = path.join(modDir, 'experiences');
  const expFiles = (await fsp.readdir(experiencesDir)).filter((f) => f.endsWith('.json')).sort();
  const experiences: Record<string, LessonExperienceV2> = {};

  for (const file of expFiles) {
    const raw = JSON.parse(await fsp.readFile(path.join(experiencesDir, file), 'utf8'));
    const expectedId = file.replace(/\.json$/, '');
    if (raw.lessonId !== expectedId) {
      throw new Error(`Experience file "${file}" has mismatched lessonId "${raw.lessonId}"`);
    }
    if (!lessonIds.has(raw.lessonId)) {
      throw new Error(`Orphan experience "${file}" for non-existent lesson "${raw.lessonId}"`);
    }

    LessonExperienceV2Schema.parse(raw);

    // Validate claims in experience blocks
    if (raw.blocks) {
      for (const b of raw.blocks) {
        if (b.claimIds) {
          for (const cid of b.claimIds) {
            if (!claimsMap[cid]) {
              throw new Error(`Block in experience "${raw.lessonId}" references unknown claimId "${cid}"`);
            }
          }
        }
      }
    }

    experiences[raw.lessonId] = raw as LessonExperienceV2;
  }

  // Invariant: every lesson must have an experience
  for (const lid of lessonIds) {
    if (!experiences[lid]) {
      throw new Error(`Lesson "${lid}" in fully-curated module "${moduleId}" lacks an experience definition`);
    }
  }

  return {
    course: ENDO_COURSE_INFO,
    module: {
      id: moduleRaw.id,
      name: moduleRaw.name,
      subtitle: moduleRaw.subtitle || '',
      count: lessons.length,
      sortOrder: moduleRaw.sortOrder,
    },
    lessons,
    lessonExperiences: experiences,
    sources: sourcesRaw,
    claims: claimsMap,
  };
}

export interface ContentManifestEntry {
  hash: string;
  schemaVersion: number;
  lessonId: string;
  moduleId: string;
}

export async function generateContentManifest(
  baseDir?: string
): Promise<Record<string, ContentManifestEntry>> {
  const root = baseDir || path.resolve(process.cwd(), 'content-src');
  const manifest: Record<string, ContentManifestEntry> = {};

  const modules = ['nadnercza', 'przytarczyce'];
  for (const modId of modules) {
    if (!isContentSrcModule(modId, root)) continue;
    const data = await loadCourseModuleFromContentSrc(modId, root);
    for (const l of data.lessons) {
      const exp = data.lessonExperiences[l.id];
      const combined = { lesson: l, experience: exp };
      const hash = canonicalHash(combined);
      manifest[l.id] = {
        hash,
        schemaVersion: 2,
        lessonId: l.id,
        moduleId: modId,
      };
    }
  }

  return manifest;
}

export async function verifyContentManifest(
  baseDir?: string,
  manifestFile?: string
): Promise<{ valid: boolean; errors: string[]; entryCount: number }> {
  const root = baseDir || path.resolve(process.cwd(), 'content-src');
  const mPath = manifestFile || path.resolve(process.cwd(), 'content-manifest.json');

  if (!fs.existsSync(mPath)) {
    return { valid: false, errors: [`Manifest file not found: ${mPath}`], entryCount: 0 };
  }

  const existing = JSON.parse(await fsp.readFile(mPath, 'utf8')) as Record<string, ContentManifestEntry>;
  const current = await generateContentManifest(root);
  const errors: string[] = [];

  for (const [lessonId, currEntry] of Object.entries(current)) {
    const ex = existing[lessonId];
    if (!ex) {
      errors.push(`Missing manifest entry for lesson "${lessonId}"`);
    } else if (ex.hash !== currEntry.hash) {
      errors.push(`Stale hash for lesson "${lessonId}": expected ${currEntry.hash}, got ${ex.hash}`);
    }
  }

  for (const lessonId of Object.keys(existing)) {
    if (!current[lessonId]) {
      errors.push(`Manifest contains deleted lesson "${lessonId}"`);
    }
  }

  return { valid: errors.length === 0, errors, entryCount: Object.keys(current).length };
}

export async function saveContentManifest(
  baseDir?: string,
  manifestFile?: string
): Promise<void> {
  const mPath = manifestFile || path.resolve(process.cwd(), 'content-manifest.json');
  const manifest = await generateContentManifest(baseDir);
  await fsp.writeFile(mPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`[manifest] Saved ${Object.keys(manifest).length} entries to ${mPath}`);
}
