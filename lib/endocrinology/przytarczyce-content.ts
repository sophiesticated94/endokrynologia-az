import type { Lesson, LessonExperienceV2, Source } from '../course-types.ts';
import type { EvidenceClaim } from '../content/schemas/lesson-revision.ts';

import moduleData from '../../content-src/endocrinology/przytarczyce/module.json' with { type: 'json' };
import sourcesData from '../../content-src/endocrinology/przytarczyce/sources.json' with { type: 'json' };
import claimsData from '../../content-src/endocrinology/przytarczyce/claims.json' with { type: 'json' };

import l1 from '../../content-src/endocrinology/przytarczyce/lessons/przytarczyce-fizjologia.json' with { type: 'json' };
import l2 from '../../content-src/endocrinology/przytarczyce/lessons/przytarczyce-diagnostyka.json' with { type: 'json' };
import l3 from '../../content-src/endocrinology/przytarczyce/lessons/phpt-pierwotna.json' with { type: 'json' };
import l4 from '../../content-src/endocrinology/przytarczyce/lessons/fhh-hiperkalcemia.json' with { type: 'json' };
import l5 from '../../content-src/endocrinology/przytarczyce/lessons/hipokalcemia-niedoczynnosc.json' with { type: 'json' };
import l6 from '../../content-src/endocrinology/przytarczyce/lessons/tezyczka-objawy.json' with { type: 'json' };
import l7 from '../../content-src/endocrinology/przytarczyce/lessons/rzekoma-niedoczynnosc.json' with { type: 'json' };
import l8 from '../../content-src/endocrinology/przytarczyce/lessons/przelom-hiperkalcemiczny.json' with { type: 'json' };
import l9 from '../../content-src/endocrinology/przytarczyce/lessons/shpt-thpt-pchn.json' with { type: 'json' };
import l10 from '../../content-src/endocrinology/przytarczyce/lessons/hiperkalcemia-nowotwory.json' with { type: 'json' };
import l11 from '../../content-src/endocrinology/przytarczyce/lessons/zespol-glodnych-kosci.json' with { type: 'json' };
import l12 from '../../content-src/endocrinology/przytarczyce/lessons/osteoporoza-metabolizm.json' with { type: 'json' };
import l13 from '../../content-src/endocrinology/przytarczyce/lessons/przytarczyce-matematyka-casr-sigmoida.json' with { type: 'json' };
import l14 from '../../content-src/endocrinology/przytarczyce/lessons/przytarczyce-matematyka-kinetyka-mineralizacji.json' with { type: 'json' };
import l15 from '../../content-src/endocrinology/przytarczyce/lessons/przytarczyce-chemia-casr-kalcymimetyki.json' with { type: 'json' };
import l16 from '../../content-src/endocrinology/przytarczyce/lessons/przytarczyce-chemia-witd-bisfosfoniany.json' with { type: 'json' };

import exp1 from '../../content-src/endocrinology/przytarczyce/experiences/przytarczyce-fizjologia.json' with { type: 'json' };
import exp2 from '../../content-src/endocrinology/przytarczyce/experiences/przytarczyce-diagnostyka.json' with { type: 'json' };
import exp3 from '../../content-src/endocrinology/przytarczyce/experiences/phpt-pierwotna.json' with { type: 'json' };
import exp4 from '../../content-src/endocrinology/przytarczyce/experiences/fhh-hiperkalcemia.json' with { type: 'json' };
import exp5 from '../../content-src/endocrinology/przytarczyce/experiences/hipokalcemia-niedoczynnosc.json' with { type: 'json' };
import exp6 from '../../content-src/endocrinology/przytarczyce/experiences/tezyczka-objawy.json' with { type: 'json' };
import exp7 from '../../content-src/endocrinology/przytarczyce/experiences/rzekoma-niedoczynnosc.json' with { type: 'json' };
import exp8 from '../../content-src/endocrinology/przytarczyce/experiences/przelom-hiperkalcemiczny.json' with { type: 'json' };
import exp9 from '../../content-src/endocrinology/przytarczyce/experiences/shpt-thpt-pchn.json' with { type: 'json' };
import exp10 from '../../content-src/endocrinology/przytarczyce/experiences/hiperkalcemia-nowotwory.json' with { type: 'json' };
import exp11 from '../../content-src/endocrinology/przytarczyce/experiences/zespol-glodnych-kosci.json' with { type: 'json' };
import exp12 from '../../content-src/endocrinology/przytarczyce/experiences/osteoporoza-metabolizm.json' with { type: 'json' };
import exp13 from '../../content-src/endocrinology/przytarczyce/experiences/przytarczyce-matematyka-casr-sigmoida.json' with { type: 'json' };
import exp14 from '../../content-src/endocrinology/przytarczyce/experiences/przytarczyce-matematyka-kinetyka-mineralizacji.json' with { type: 'json' };
import exp15 from '../../content-src/endocrinology/przytarczyce/experiences/przytarczyce-chemia-casr-kalcymimetyki.json' with { type: 'json' };
import exp16 from '../../content-src/endocrinology/przytarczyce/experiences/przytarczyce-chemia-witd-bisfosfoniany.json' with { type: 'json' };

export const parathyroidModuleMeta = moduleData;
export const parathyroidSources: Record<string, Source> = sourcesData as Record<string, Source>;
export const parathyroidMathChemSources = parathyroidSources;
export const parathyroidClaims: EvidenceClaim[] = claimsData as EvidenceClaim[];
export const parathyroidLessons: Lesson[] = [
  l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14, l15, l16,
] as Lesson[];

export const parathyroidExperiences: Record<string, LessonExperienceV2> = {
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
