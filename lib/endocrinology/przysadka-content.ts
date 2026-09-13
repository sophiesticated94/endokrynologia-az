import type { Lesson, LessonExperienceV2, Source } from '../course-types.ts';
import type { EvidenceClaim } from '../content/schemas/lesson-revision.ts';

import moduleData from '../../content-src/endocrinology/przysadka/module.json' with { type: 'json' };
import sourcesData from '../../content-src/endocrinology/przysadka/sources.json' with { type: 'json' };
import claimsData from '../../content-src/endocrinology/przysadka/claims.json' with { type: 'json' };

import l1 from '../../content-src/endocrinology/przysadka/lessons/przysadka-fizjologia.json' with { type: 'json' };
import l2 from '../../content-src/endocrinology/przysadka/lessons/przysadka-diagnostyka.json' with { type: 'json' };
import l3 from '../../content-src/endocrinology/przysadka/lessons/prolactinoma.json' with { type: 'json' };
import l4 from '../../content-src/endocrinology/przysadka/lessons/akromegalia.json' with { type: 'json' };
import l5 from '../../content-src/endocrinology/przysadka/lessons/cushing-choroba.json' with { type: 'json' };
import l6 from '../../content-src/endocrinology/przysadka/lessons/guzy-nieczynne.json' with { type: 'json' };
import l7 from '../../content-src/endocrinology/przysadka/lessons/hipopituitaryzm.json' with { type: 'json' };
import l8 from '../../content-src/endocrinology/przysadka/lessons/moczowka-prosta.json' with { type: 'json' };
import l9 from '../../content-src/endocrinology/przysadka/lessons/siadh.json' with { type: 'json' };
import l10 from '../../content-src/endocrinology/przysadka/lessons/przysadka-zapalenia.json' with { type: 'json' };
import l11 from '../../content-src/endocrinology/przysadka/lessons/udar-przysadki.json' with { type: 'json' };
import l12 from '../../content-src/endocrinology/przysadka/lessons/przysadka-operacje.json' with { type: 'json' };
import l13 from '../../content-src/endocrinology/przysadka/lessons/przysadka-matematyka-pulsacja.json' with { type: 'json' };
import l14 from '../../content-src/endocrinology/przysadka/lessons/przysadka-matematyka-osmolalnosc.json' with { type: 'json' };
import l15 from '../../content-src/endocrinology/przysadka/lessons/przysadka-chemia-struktury.json' with { type: 'json' };
import l16 from '../../content-src/endocrinology/przysadka/lessons/przysadka-chemia-leki.json' with { type: 'json' };

import exp1 from '../../content-src/endocrinology/przysadka/experiences/przysadka-fizjologia.json' with { type: 'json' };
import exp2 from '../../content-src/endocrinology/przysadka/experiences/przysadka-diagnostyka.json' with { type: 'json' };
import exp3 from '../../content-src/endocrinology/przysadka/experiences/prolactinoma.json' with { type: 'json' };
import exp4 from '../../content-src/endocrinology/przysadka/experiences/akromegalia.json' with { type: 'json' };
import exp5 from '../../content-src/endocrinology/przysadka/experiences/cushing-choroba.json' with { type: 'json' };
import exp6 from '../../content-src/endocrinology/przysadka/experiences/guzy-nieczynne.json' with { type: 'json' };
import exp7 from '../../content-src/endocrinology/przysadka/experiences/hipopituitaryzm.json' with { type: 'json' };
import exp8 from '../../content-src/endocrinology/przysadka/experiences/moczowka-prosta.json' with { type: 'json' };
import exp9 from '../../content-src/endocrinology/przysadka/experiences/siadh.json' with { type: 'json' };
import exp10 from '../../content-src/endocrinology/przysadka/experiences/przysadka-zapalenia.json' with { type: 'json' };
import exp11 from '../../content-src/endocrinology/przysadka/experiences/udar-przysadki.json' with { type: 'json' };
import exp12 from '../../content-src/endocrinology/przysadka/experiences/przysadka-operacje.json' with { type: 'json' };
import exp13 from '../../content-src/endocrinology/przysadka/experiences/przysadka-matematyka-pulsacja.json' with { type: 'json' };
import exp14 from '../../content-src/endocrinology/przysadka/experiences/przysadka-matematyka-osmolalnosc.json' with { type: 'json' };
import exp15 from '../../content-src/endocrinology/przysadka/experiences/przysadka-chemia-struktury.json' with { type: 'json' };
import exp16 from '../../content-src/endocrinology/przysadka/experiences/przysadka-chemia-leki.json' with { type: 'json' };

export const pituitaryModuleMeta = moduleData;
export const pituitarySources: Record<string, Source> = sourcesData as Record<string, Source>;
export const pituitaryMathChemSources = pituitarySources;
export const pituitaryClaims: EvidenceClaim[] = claimsData as EvidenceClaim[];
export const pituitaryLessons: Lesson[] = [
  l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14, l15, l16,
] as Lesson[];

export const pituitaryExperiences: Record<string, LessonExperienceV2> = {
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
