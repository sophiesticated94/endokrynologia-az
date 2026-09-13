import type { Lesson, LessonExperienceV2 } from '../../course-types.ts';
import { buildPsychiatryLessonExperience } from './builder.ts';
import { affectiveExperiences } from '../affective-content.ts';
import { pharmacologyExperiences } from '../pharmacology-content.ts';
import { organicExperiences } from '../organic-content.ts';
import { traumaExperiences } from '../trauma-content.ts';

export function buildAllPsychiatryExperiences(lessons: Lesson[]): Record<string, LessonExperienceV2> {
  const aggregated: Record<string, LessonExperienceV2> = {
    ...affectiveExperiences,
    ...pharmacologyExperiences,
    ...organicExperiences,
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
