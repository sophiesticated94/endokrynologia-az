import type { Lesson, LessonExperienceV2, Source } from '../course-types.ts';
import type { EvidenceClaim } from '../content/schemas/lesson-revision.ts';

import moduleData from '../../content-src/psychiatry/psych-organiczne/module.json' with { type: 'json' };
import sourcesData from '../../content-src/psychiatry/psych-organiczne/sources.json' with { type: 'json' };
import claimsData from '../../content-src/psychiatry/psych-organiczne/claims.json' with { type: 'json' };

import l1 from '../../content-src/psychiatry/psych-organiczne/lessons/delirium-rozpoznanie-i-dynamika.json' with { type: 'json' };
import l2 from '../../content-src/psychiatry/psych-organiczne/lessons/delirium-vs-otepienie-vs-depresja.json' with { type: 'json' };
import l3 from '../../content-src/psychiatry/psych-organiczne/lessons/diagnostyka-ostrego-zaburzenia-swiadomosci.json' with { type: 'json' };
import l4 from '../../content-src/psychiatry/psych-organiczne/lessons/zaburzenia-poznawcze-mci-a-otepienie.json' with { type: 'json' };
import l5 from '../../content-src/psychiatry/psych-organiczne/lessons/choroba-alzheimera-wzorzec-i-progresja.json' with { type: 'json' };
import l6 from '../../content-src/psychiatry/psych-organiczne/lessons/naczyniowe-zaburzenia-poznawcze-vad.json' with { type: 'json' };
import l7 from '../../content-src/psychiatry/psych-organiczne/lessons/otepienie-z-cialami-lewyego-i-parkinson.json' with { type: 'json' };
import l8 from '../../content-src/psychiatry/psych-organiczne/lessons/otepienie-czolowo-skroniowe-bvftd.json' with { type: 'json' };
import l9 from '../../content-src/psychiatry/psych-organiczne/lessons/szybko-postepujace-zespoly-otepienne.json' with { type: 'json' };
import l10 from '../../content-src/psychiatry/psych-organiczne/lessons/bpsd-objawy-behawioralne-i-psychologiczne.json' with { type: 'json' };
import l11 from '../../content-src/psychiatry/psych-organiczne/lessons/psychofarmakologia-wieku-podeszlego.json' with { type: 'json' };
import l12 from '../../content-src/psychiatry/psych-organiczne/lessons/depresja-wieku-podeszlego-i-poznanie.json' with { type: 'json' };
import l13 from '../../content-src/psychiatry/psych-organiczne/lessons/zdolnosc-decyzyjna-capacity-i-safeguarding.json' with { type: 'json' };

import exp1 from '../../content-src/psychiatry/psych-organiczne/experiences/delirium-rozpoznanie-i-dynamika.json' with { type: 'json' };
import exp2 from '../../content-src/psychiatry/psych-organiczne/experiences/delirium-vs-otepienie-vs-depresja.json' with { type: 'json' };
import exp3 from '../../content-src/psychiatry/psych-organiczne/experiences/diagnostyka-ostrego-zaburzenia-swiadomosci.json' with { type: 'json' };
import exp4 from '../../content-src/psychiatry/psych-organiczne/experiences/zaburzenia-poznawcze-mci-a-otepienie.json' with { type: 'json' };
import exp5 from '../../content-src/psychiatry/psych-organiczne/experiences/choroba-alzheimera-wzorzec-i-progresja.json' with { type: 'json' };
import exp6 from '../../content-src/psychiatry/psych-organiczne/experiences/naczyniowe-zaburzenia-poznawcze-vad.json' with { type: 'json' };
import exp7 from '../../content-src/psychiatry/psych-organiczne/experiences/otepienie-z-cialami-lewyego-i-parkinson.json' with { type: 'json' };
import exp8 from '../../content-src/psychiatry/psych-organiczne/experiences/otepienie-czolowo-skroniowe-bvftd.json' with { type: 'json' };
import exp9 from '../../content-src/psychiatry/psych-organiczne/experiences/szybko-postepujace-zespoly-otepienne.json' with { type: 'json' };
import exp10 from '../../content-src/psychiatry/psych-organiczne/experiences/bpsd-objawy-behawioralne-i-psychologiczne.json' with { type: 'json' };
import exp11 from '../../content-src/psychiatry/psych-organiczne/experiences/psychofarmakologia-wieku-podeszlego.json' with { type: 'json' };
import exp12 from '../../content-src/psychiatry/psych-organiczne/experiences/depresja-wieku-podeszlego-i-poznanie.json' with { type: 'json' };
import exp13 from '../../content-src/psychiatry/psych-organiczne/experiences/zdolnosc-decyzyjna-capacity-i-safeguarding.json' with { type: 'json' };

export const organicModuleMeta = moduleData;
export const organicSources: Record<string, Source> = sourcesData as Record<string, Source>;
export const organicClaims: EvidenceClaim[] = claimsData as EvidenceClaim[];

export const organicLessons: Lesson[] = [
  l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13,
] as Lesson[];

export const organicExperiences: Record<string, LessonExperienceV2> = {
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
};
