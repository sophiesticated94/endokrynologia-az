import type { Lesson, LessonExperienceV2 } from '../../course-types.ts';
import { buildPsychiatryLessonExperience } from './builder.ts';
import { getDiagnosticExperiences } from './diagnostics.ts';
import { getAffectiveExperiences } from './affective-neurobiology.ts';
import { getPharmacologyReceptorsExperiences } from './pharmacology-receptors.ts';
import { getClinicalPharmacotherapyExperiences } from './clinical-pharmacotherapy.ts';
import { getSafetyEmergenciesExperiences } from './safety-emergencies-interventions.ts';
import { getNeuroGeriatricExperiences } from './neuro-geriatric.ts';
import { traumaExperiences } from '../trauma-content.ts';

export function buildAllPsychiatryExperiences(lessons: Lesson[]): Record<string, LessonExperienceV2> {
  const map = new Map(lessons.map(l => [l.id, l]));

  const aggregated: Record<string, LessonExperienceV2> = {
    ...getDiagnosticExperiences(map),
    ...getAffectiveExperiences(map),
    ...getPharmacologyReceptorsExperiences(map),
    ...getClinicalPharmacotherapyExperiences(map),
    ...getSafetyEmergenciesExperiences(map),
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
