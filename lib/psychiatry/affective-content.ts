import type { Lesson, LessonExperienceV2, Source } from '../course-types.ts';
import type { EvidenceClaim } from '../content/schemas/lesson-revision.ts';

import moduleData from '../../content-src/psychiatry/psych-afektywne/module.json' with { type: 'json' };
import sourcesData from '../../content-src/psychiatry/psych-afektywne/sources.json' with { type: 'json' };
import claimsData from '../../content-src/psychiatry/psych-afektywne/claims.json' with { type: 'json' };

import l1 from '../../content-src/psychiatry/psych-afektywne/lessons/wywiad-psychiatryczny-mse.json' with { type: 'json' };
import l2 from '../../content-src/psychiatry/psych-afektywne/lessons/klasyfikacje-dsm5-icd11.json' with { type: 'json' };
import l3 from '../../content-src/psychiatry/psych-afektywne/lessons/psychopatologia-objawow.json' with { type: 'json' };
import l4 from '../../content-src/psychiatry/psych-afektywne/lessons/depresja-fenotypy-i-kryteria.json' with { type: 'json' };
import l5 from '../../content-src/psychiatry/psych-afektywne/lessons/mania-hipomania-spektrum.json' with { type: 'json' };
import l6 from '../../content-src/psychiatry/psych-afektywne/lessons/psychoza-i-szlaki-dopaminy.json' with { type: 'json' };
import l7 from '../../content-src/psychiatry/psych-afektywne/lessons/zaburzenia-lekowe-gad-napadowy.json' with { type: 'json' };
import l8 from '../../content-src/psychiatry/psych-afektywne/lessons/ocd-i-petla-cstc.json' with { type: 'json' };
import l9 from '../../content-src/psychiatry/psych-afektywne/lessons/ptsd-trauma-stres.json' with { type: 'json' };
import l10 from '../../content-src/psychiatry/psych-afektywne/lessons/adhd-dorosli-i-rozwojowe.json' with { type: 'json' };
import l11 from '../../content-src/psychiatry/psych-afektywne/lessons/zaburzenia-osobowosci-wymiarowe.json' with { type: 'json' };
import l12 from '../../content-src/psychiatry/psych-afektywne/lessons/substancje-i-secondary-causes.json' with { type: 'json' };
import l13 from '../../content-src/psychiatry/psych-afektywne/lessons/skale-kliniczne-w-psychiatrii.json' with { type: 'json' };
import l14 from '../../content-src/psychiatry/psych-afektywne/lessons/ocena-ryzyka-samobojczego-agresji.json' with { type: 'json' };
import l15 from '../../content-src/psychiatry/psych-afektywne/lessons/diagnostyka-roznicowa-algorytmy.json' with { type: 'json' };
import l16 from '../../content-src/psychiatry/psych-afektywne/lessons/przypadki-integracyjne-diagnostyka.json' with { type: 'json' };

import exp1 from '../../content-src/psychiatry/psych-afektywne/experiences/wywiad-psychiatryczny-mse.json' with { type: 'json' };
import exp2 from '../../content-src/psychiatry/psych-afektywne/experiences/klasyfikacje-dsm5-icd11.json' with { type: 'json' };
import exp3 from '../../content-src/psychiatry/psych-afektywne/experiences/psychopatologia-objawow.json' with { type: 'json' };
import exp4 from '../../content-src/psychiatry/psych-afektywne/experiences/depresja-fenotypy-i-kryteria.json' with { type: 'json' };
import exp5 from '../../content-src/psychiatry/psych-afektywne/experiences/mania-hipomania-spektrum.json' with { type: 'json' };
import exp6 from '../../content-src/psychiatry/psych-afektywne/experiences/psychoza-i-szlaki-dopaminy.json' with { type: 'json' };
import exp7 from '../../content-src/psychiatry/psych-afektywne/experiences/zaburzenia-lekowe-gad-napadowy.json' with { type: 'json' };
import exp8 from '../../content-src/psychiatry/psych-afektywne/experiences/ocd-i-petla-cstc.json' with { type: 'json' };
import exp9 from '../../content-src/psychiatry/psych-afektywne/experiences/ptsd-trauma-stres.json' with { type: 'json' };
import exp10 from '../../content-src/psychiatry/psych-afektywne/experiences/adhd-dorosli-i-rozwojowe.json' with { type: 'json' };
import exp11 from '../../content-src/psychiatry/psych-afektywne/experiences/zaburzenia-osobowosci-wymiarowe.json' with { type: 'json' };
import exp12 from '../../content-src/psychiatry/psych-afektywne/experiences/substancje-i-secondary-causes.json' with { type: 'json' };
import exp13 from '../../content-src/psychiatry/psych-afektywne/experiences/skale-kliniczne-w-psychiatrii.json' with { type: 'json' };
import exp14 from '../../content-src/psychiatry/psych-afektywne/experiences/ocena-ryzyka-samobojczego-agresji.json' with { type: 'json' };
import exp15 from '../../content-src/psychiatry/psych-afektywne/experiences/diagnostyka-roznicowa-algorytmy.json' with { type: 'json' };
import exp16 from '../../content-src/psychiatry/psych-afektywne/experiences/przypadki-integracyjne-diagnostyka.json' with { type: 'json' };

export const affectiveModuleMeta = moduleData;
export const affectiveSources: Record<string, Source> = sourcesData as Record<string, Source>;
export const affectiveClaims: EvidenceClaim[] = claimsData as EvidenceClaim[];

export const affectiveLessons: Lesson[] = [
  l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14, l15, l16,
] as Lesson[];

export const affectiveExperiences: Record<string, LessonExperienceV2> = {
  [exp1.lessonId]: exp1 as LessonExperienceV2,
  [exp2.lessonId]: exp2 as LessonExperienceV2,
  [exp3.lessonId]: exp3 as LessonExperienceV2,
  [exp4.lessonId]: exp4 as LessonExperienceV2,
  [exp5.lessonId]: exp5 as LessonExperienceV2,
  [exp6.lessonId]: exp6 as LessonExperienceV2,
  [exp7.lessonId]: exp7 as LessonExperienceV2,
  [exp8.lessonId]: exp8 as LessonExperienceV2,
  [exp9.lessonId]: exp9 as LessonExperienceV2,
  [exp10.lessonId]: exp10 as LessonExperienceV2,
  [exp11.lessonId]: exp11 as LessonExperienceV2,
  [exp12.lessonId]: exp12 as LessonExperienceV2,
  [exp13.lessonId]: exp13 as LessonExperienceV2,
  [exp14.lessonId]: exp14 as LessonExperienceV2,
  [exp15.lessonId]: exp15 as LessonExperienceV2,
  [exp16.lessonId]: exp16 as LessonExperienceV2,
};
