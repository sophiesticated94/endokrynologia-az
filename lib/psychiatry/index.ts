import { psychiatryLessons } from '../course-psychiatry.ts';
import { buildPsychiatryEnhancementRegistry } from './registry.ts';
import { buildAllPsychiatryExperiences } from './experiences/index.ts';
import { ALL_PSYCHIATRY_PRESETS, getPsychiatryPreset } from './presets/index.ts';

export * from './types.ts';
export * from './evidence/evidence-types.ts';
export * from './evidence/model-limitations.ts';
export * from './evidence/source-metadata.ts';
export * from './cases/types.ts';
export * from './cases/threads.ts';
export * from './presets/index.ts';

export const psychiatryLessonExperiences = buildAllPsychiatryExperiences(psychiatryLessons);

export const PSYCHIATRY_LESSON_ENHANCEMENTS = buildPsychiatryEnhancementRegistry(psychiatryLessons);

export function getPsychiatryEnhancement(lessonId: string) {
  return PSYCHIATRY_LESSON_ENHANCEMENTS[lessonId as keyof typeof PSYCHIATRY_LESSON_ENHANCEMENTS];
}

export { ALL_PSYCHIATRY_PRESETS, getPsychiatryPreset };
