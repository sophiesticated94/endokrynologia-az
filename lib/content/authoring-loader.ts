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
import { getPreset, getPresetsForModule } from './preset-registry.ts';

const ENDO_COURSE_INFO = {
  id: 'endocrinology',
  title: 'Endokrynologia od A do Z',
  description: 'Interaktywny podręcznik i symulator kliniczny endokrynologii.',
  version: '2026.09.13',
};

const PSYCH_COURSE_INFO = {
  id: 'psychiatry',
  title: 'Psychiatria i Psychofarmakologia Kliniczna',
  description: 'Podręcznik akademicki, mechanizmy neurobiologiczne i interaktywny symulator decyzyjny.',
  version: '2026.09.13',
};

function canonicalHash(obj: unknown): string {
  const cleanAndSort = (item: unknown): unknown => {
    if (item === null || typeof item !== 'object') return item;
    if (Array.isArray(item)) return item.map(cleanAndSort);
    const sorted: Record<string, unknown> = {};
    for (const key of Object.keys(item as Record<string, unknown>).sort()) {
      if ((item as Record<string, unknown>)[key] !== undefined) {
        sorted[key] = cleanAndSort((item as Record<string, unknown>)[key]);
      }
    }
    return sorted;
  };
  const cleaned = cleanAndSort(obj);
  return crypto.createHash('sha256').update(JSON.stringify(cleaned)).digest('hex');
}

export function discoverContentSrcModulesSync(
  baseDir?: string
): Array<{ courseId: string; moduleId: string; path: string }> {
  const root = baseDir || path.resolve(process.cwd(), 'content-src');
  const results: Array<{ courseId: string; moduleId: string; path: string }> = [];
  if (!fs.existsSync(root)) return results;

  const courseDirs = fs.readdirSync(root, { withFileTypes: true });
  for (const cDir of courseDirs) {
    if (!cDir.isDirectory()) continue;
    const cPath = path.join(root, cDir.name);
    const modDirs = fs.readdirSync(cPath, { withFileTypes: true });
    for (const mDir of modDirs) {
      if (!mDir.isDirectory()) continue;
      const modPath = path.join(cPath, mDir.name);
      if (fs.existsSync(path.join(modPath, 'module.json'))) {
        results.push({ courseId: cDir.name, moduleId: mDir.name, path: modPath });
      }
    }
  }
  return results.sort((a, b) => a.moduleId.localeCompare(b.moduleId));
}

export async function discoverContentSrcModules(
  baseDir?: string
): Promise<Array<{ courseId: string; moduleId: string; path: string }>> {
  return discoverContentSrcModulesSync(baseDir);
}

export function isContentSrcModule(moduleId: string, baseDir?: string): boolean {
  const mods = discoverContentSrcModulesSync(baseDir);
  return mods.some((m) => m.moduleId === moduleId);
}

export function loadCourseModuleFromContentSrcSync(
  moduleId: string,
  baseDir?: string
): CourseModuleSource & { claims: Record<string, EvidenceClaim> } {
  const root = baseDir || path.resolve(process.cwd(), 'content-src');
  const modules = discoverContentSrcModulesSync(root);
  const found = modules.find((m) => m.moduleId === moduleId);

  if (!found) {
    throw new Error(`Module directory not found for moduleId "${moduleId}" in ${root}`);
  }

  const modDir = found.path;

  // 1. module.json
  const moduleRaw = JSON.parse(fs.readFileSync(path.join(modDir, 'module.json'), 'utf8'));
  if (moduleRaw.id !== moduleId) {
    throw new Error(`module.json id "${moduleRaw.id}" does not match requested moduleId "${moduleId}"`);
  }

  // 2. sources.json
  const sourcesRaw = JSON.parse(fs.readFileSync(path.join(modDir, 'sources.json'), 'utf8')) as Record<string, Source>;

  // 3. claims.json
  const claimsPath = path.join(modDir, 'claims.json');
  const claimsList: EvidenceClaim[] = fs.existsSync(claimsPath)
    ? (JSON.parse(fs.readFileSync(claimsPath, 'utf8')) as EvidenceClaim[])
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
  const lessonFiles = fs.readdirSync(lessonsDir).filter((f) => f.endsWith('.json')).sort();

  const lessons: Lesson[] = [];
  const lessonIds = new Set<string>();

  for (const file of lessonFiles) {
    const raw = JSON.parse(fs.readFileSync(path.join(lessonsDir, file), 'utf8'));
    const expectedId = file.replace(/\.json$/, '');
    if (raw.id !== expectedId) {
      throw new Error(`Lesson file "${file}" has mismatched internal ID "${raw.id}"`);
    }
    if (lessonIds.has(raw.id)) {
      throw new Error(`Duplicate lesson ID "${raw.id}" found in ${moduleId}`);
    }
    lessonIds.add(raw.id);

    LessonRevisionDocumentSchema.parse(raw);

    for (const sid of raw.sourceIds) {
      if (!sourcesRaw[sid]) {
        throw new Error(`Lesson "${raw.id}" references unknown sourceId "${sid}"`);
      }
    }

    lessons.push(raw as Lesson);
  }

  // Validate claims lessonIds against loaded lessonIds
  for (const c of claimsList) {
    if (c.lessonIds) {
      for (const lid of c.lessonIds) {
        if (!lessonIds.has(lid)) {
          throw new Error(`Claim "${c.id}" references non-existent lesson "${lid}" in module "${moduleId}"`);
        }
      }
    }
  }

  // 5. experiences/*.json
  const experiencesDir = path.join(modDir, 'experiences');
  const expFiles = fs.readdirSync(experiencesDir).filter((f) => f.endsWith('.json')).sort();
  const experiences: Record<string, LessonExperienceV2> = {};

  for (const file of expFiles) {
    const raw = JSON.parse(fs.readFileSync(path.join(experiencesDir, file), 'utf8'));
    const expectedId = file.replace(/\.json$/, '');
    if (raw.lessonId !== expectedId) {
      throw new Error(`Experience file "${file}" has mismatched lessonId "${raw.lessonId}"`);
    }
    if (experiences[raw.lessonId]) {
      throw new Error(`Duplicate experience ID "${raw.lessonId}" found in ${moduleId}`);
    }
    if (!lessonIds.has(raw.lessonId)) {
      throw new Error(`Orphan experience "${file}" for non-existent lesson "${raw.lessonId}"`);
    }

    LessonExperienceV2Schema.parse(raw);

    // Validate claims and sources in experience blocks
    if (raw.blocks) {
      for (const b of raw.blocks) {
        if (b.claimIds) {
          for (const cid of b.claimIds) {
            if (!claimsMap[cid]) {
              throw new Error(`Block in experience "${raw.lessonId}" references unknown claimId "${cid}"`);
            }
          }
        }
        if (b.sourceIds) {
          for (const sid of b.sourceIds) {
            if (!sourcesRaw[sid]) {
              throw new Error(`Block in experience "${raw.lessonId}" references unknown sourceId "${sid}"`);
            }
          }
        }
        if (b.inlineEnhancements) {
          for (const enh of b.inlineEnhancements) {
            if (enh.presetId) {
              const preset = getPreset(enh.presetId);
              if (!preset) {
                throw new Error(`Inline enhancement in lesson "${raw.lessonId}" references unknown presetId "${enh.presetId}"`);
              }
              if (preset.moduleId !== moduleId) {
                throw new Error(`Preset "${enh.presetId}" belongs to module "${preset.moduleId}", but is referenced by lesson "${raw.lessonId}" in module "${moduleId}"`);
              }
            }
          }
        }
      }
    }

    // Validate widgetConfig presets
    if (raw.widgetConfig) {
      for (const [wId, cfg] of Object.entries(raw.widgetConfig as Record<string, { presetId?: string }>)) {
        if (cfg?.presetId) {
          const preset = getPreset(cfg.presetId);
          if (!preset) {
            throw new Error(`widgetConfig in lesson "${raw.lessonId}" references unknown presetId "${cfg.presetId}"`);
          }
          if (preset.widgetType !== wId) {
            throw new Error(`widgetConfig for "${wId}" references preset "${cfg.presetId}" with mismatched widgetType "${preset.widgetType}"`);
          }
          if (preset.moduleId !== moduleId) {
            throw new Error(`widgetConfig references preset "${cfg.presetId}" from module "${preset.moduleId}", not "${moduleId}"`);
          }
          if (preset.lessonId && preset.lessonId !== raw.lessonId) {
            throw new Error(`widgetConfig references preset "${cfg.presetId}" bound to lesson "${preset.lessonId}", not "${raw.lessonId}"`);
          }
        }
      }
    }

    experiences[raw.lessonId] = raw as LessonExperienceV2;
  }

  // Invariant: every lesson in fully-curated module must have exactly one experience
  for (const lid of lessonIds) {
    if (!experiences[lid]) {
      throw new Error(`Missing experience for lesson "${lid}" in fully-curated module "${moduleId}"`);
    }
  }

  // 6. Validate presets declared for this module
  const modulePresets = getPresetsForModule(moduleId);
  for (const preset of modulePresets) {
    if (preset.moduleId !== moduleId) {
      throw new Error(`Preset "${preset.id}" has moduleId "${preset.moduleId}" which does not match "${moduleId}"`);
    }
    if (preset.lessonId && !lessonIds.has(preset.lessonId)) {
      throw new Error(`Preset "${preset.id}" references non-existent lesson "${preset.lessonId}" in module "${moduleId}"`);
    }
    if (preset.sourceIds) {
      for (const sid of preset.sourceIds) {
        if (!sourcesRaw[sid]) {
          throw new Error(`Preset "${preset.id}" references unknown sourceId "${sid}" in module "${moduleId}"`);
        }
      }
    }
    if (preset.claimIds) {
      for (const cid of preset.claimIds) {
        if (!claimsMap[cid]) {
          throw new Error(`Preset "${preset.id}" references unknown claimId "${cid}" in module "${moduleId}"`);
        }
      }
    }
  }

  return {
    course: found.courseId === 'psychiatry' ? PSYCH_COURSE_INFO : ENDO_COURSE_INFO,
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

export async function loadCourseModuleFromContentSrc(
  moduleId: string,
  baseDir?: string
): Promise<CourseModuleSource & { claims: Record<string, EvidenceClaim> }> {
  return loadCourseModuleFromContentSrcSync(moduleId, baseDir);
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
  const modules = await discoverContentSrcModules(root);

  for (const { moduleId } of modules) {
    const data = await loadCourseModuleFromContentSrc(moduleId, root);
    for (const l of data.lessons) {
      const exp = data.lessonExperiences[l.id];
      const combined = { lesson: l, experience: exp };
      const hash = canonicalHash(combined);
      manifest[l.id] = {
        hash,
        schemaVersion: 2,
        lessonId: l.id,
        moduleId,
      };
    }
  }

  const sorted: Record<string, ContentManifestEntry> = {};
  for (const key of Object.keys(manifest).sort()) {
    sorted[key] = manifest[key];
  }
  return sorted;
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
