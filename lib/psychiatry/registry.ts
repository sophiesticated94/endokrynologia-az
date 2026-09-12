import type { Lesson } from '../course-types.ts';
import type {
  PsychiatryLessonId,
  PsychiatryLessonEnhancement,
  PsychiatryLessonEnhancementRegistry,
} from './types.ts';
import { buildAllPsychiatryExperiences } from './experiences/index.ts';
import { GENERAL_PSYCHIATRY_ENHANCEMENTS_DATA } from './registry-general.ts';
import { NEUROCOGNITIVE_ENHANCEMENTS_DATA } from './registry-neuro.ts';

export const PSYCHIATRY_LESSON_ENHANCEMENTS_DATA: Record<
  PsychiatryLessonId,
  Omit<PsychiatryLessonEnhancement, 'lessonId' | 'experience'>
> = {
  ...GENERAL_PSYCHIATRY_ENHANCEMENTS_DATA,
  ...(NEUROCOGNITIVE_ENHANCEMENTS_DATA as any),
};

export function buildPsychiatryEnhancementRegistry(
  lessons: Lesson[],
): PsychiatryLessonEnhancementRegistry {
  const experiences = buildAllPsychiatryExperiences(lessons);
  const registry: Partial<PsychiatryLessonEnhancementRegistry> = {};

  for (const lesson of lessons) {
    const id = lesson.id as PsychiatryLessonId;
    const metadata = PSYCHIATRY_LESSON_ENHANCEMENTS_DATA[id] || {
      diagrams: [],
      inlineWidgets: [],
      evidenceMode: 'clinical-framework',
    };

    registry[id] = {
      lessonId: id,
      experience: experiences[id],
      diagrams: metadata.diagrams,
      inlineWidgets: metadata.inlineWidgets,
      workbenchPresetId: metadata.workbenchPresetId,
      caseId: metadata.caseId,
      recurringPatientId: metadata.recurringPatientId,
      whatChangesYourMind: metadata.whatChangesYourMind,
      evidenceMode: metadata.evidenceMode,
    };
  }

  return registry as PsychiatryLessonEnhancementRegistry;
}
