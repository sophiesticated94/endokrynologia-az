import type { Lesson, LessonExperienceV2 } from '../../course-types.ts';
import { buildPsychiatryLessonExperience } from './builder.ts';
import { affectiveExperiences } from '../affective-content.ts';
import { pharmacologyExperiences } from '../pharmacology-content.ts';
import { getNeuroGeriatricExperiences } from './neuro-geriatric.ts';
import { traumaExperiences } from '../trauma-content.ts';

export function buildAllPsychiatryExperiences(lessons: Lesson[]): Record<string, LessonExperienceV2> {
  const map = new Map(lessons.map(l => [l.id, l]));

  const aggregated: Record<string, LessonExperienceV2> = {
    ...affectiveExperiences,
    ...pharmacologyExperiences,
    ...getNeuroGeriatricExperiences(map),
    ...traumaExperiences,
  };

  // Ensure 100% coverage for any lesson
  for (const lesson of lessons) {
    if (!aggregated[lesson.id]) {
      aggregated[lesson.id] = buildPsychiatryLessonExperience(lesson);
    }
  }

  return aggregated;
}
