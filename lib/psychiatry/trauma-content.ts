import type { Lesson, LessonExperienceV2, Source } from '../course-types.ts';
import type { EvidenceClaim } from '../content/schemas/lesson-revision.ts';

import moduleData from '../../content-src/psychiatry/psych-trauma-dysocjacja/module.json' with { type: 'json' };
import sourcesData from '../../content-src/psychiatry/psych-trauma-dysocjacja/sources.json' with { type: 'json' };
import claimsData from '../../content-src/psychiatry/psych-trauma-dysocjacja/claims.json' with { type: 'json' };

import l1 from '../../content-src/psychiatry/psych-trauma-dysocjacja/lessons/trauma-neurobiologia-zagrozenia.json' with { type: 'json' };
import l2 from '../../content-src/psychiatry/psych-trauma-dysocjacja/lessons/pamiec-traumatyczna-i-extinction.json' with { type: 'json' };
import l3 from '../../content-src/psychiatry/psych-trauma-dysocjacja/lessons/reakcja-na-stres-asr-vs-asd.json' with { type: 'json' };
import l4 from '../../content-src/psychiatry/psych-trauma-dysocjacja/lessons/ptsd-kryteria-i-fenomenologia.json' with { type: 'json' };
import l5 from '../../content-src/psychiatry/psych-trauma-dysocjacja/lessons/cptsd-zlozone-ptsd-icd11.json' with { type: 'json' };
import l6 from '../../content-src/psychiatry/psych-trauma-dysocjacja/lessons/spektrum-dysocjacji-kontinuum.json' with { type: 'json' };
import l7 from '../../content-src/psychiatry/psych-trauma-dysocjacja/lessons/depersonalizacja-i-derealizacja.json' with { type: 'json' };
import l8 from '../../content-src/psychiatry/psych-trauma-dysocjacja/lessons/amnezja-dysocjacyjna-i-fuga.json' with { type: 'json' };
import l9 from '../../content-src/psychiatry/psych-trauma-dysocjacja/lessons/did-tozsamosc-i-rozszczepienie.json' with { type: 'json' };
import l10 from '../../content-src/psychiatry/psych-trauma-dysocjacja/lessons/did-roznicowanie-bpd-i-psychoza.json' with { type: 'json' };
import l11 from '../../content-src/psychiatry/psych-trauma-dysocjacja/lessons/osobowosc-icd11-wymiary.json' with { type: 'json' };
import l12 from '../../content-src/psychiatry/psych-trauma-dysocjacja/lessons/borderline-bpd-mechanizmy.json' with { type: 'json' };
import l13 from '../../content-src/psychiatry/psych-trauma-dysocjacja/lessons/bpd-roznicowanie-cptsd-chad-adhd.json' with { type: 'json' };
import l14 from '../../content-src/psychiatry/psych-trauma-dysocjacja/lessons/trauma-somatyka-mimiki-i-bezpieczenstwo.json' with { type: 'json' };
import l15 from '../../content-src/psychiatry/psych-trauma-dysocjacja/lessons/psychoterapia-traumy-fazy-i-metody.json' with { type: 'json' };
import l16 from '../../content-src/psychiatry/psych-trauma-dysocjacja/lessons/dbt-interwencja-kryzysowa-i-bezpieczenstwo.json' with { type: 'json' };

import exp1 from '../../content-src/psychiatry/psych-trauma-dysocjacja/experiences/trauma-neurobiologia-zagrozenia.json' with { type: 'json' };
import exp2 from '../../content-src/psychiatry/psych-trauma-dysocjacja/experiences/pamiec-traumatyczna-i-extinction.json' with { type: 'json' };
import exp3 from '../../content-src/psychiatry/psych-trauma-dysocjacja/experiences/reakcja-na-stres-asr-vs-asd.json' with { type: 'json' };
import exp4 from '../../content-src/psychiatry/psych-trauma-dysocjacja/experiences/ptsd-kryteria-i-fenomenologia.json' with { type: 'json' };
import exp5 from '../../content-src/psychiatry/psych-trauma-dysocjacja/experiences/cptsd-zlozone-ptsd-icd11.json' with { type: 'json' };
import exp6 from '../../content-src/psychiatry/psych-trauma-dysocjacja/experiences/spektrum-dysocjacji-kontinuum.json' with { type: 'json' };
import exp7 from '../../content-src/psychiatry/psych-trauma-dysocjacja/experiences/depersonalizacja-i-derealizacja.json' with { type: 'json' };
import exp8 from '../../content-src/psychiatry/psych-trauma-dysocjacja/experiences/amnezja-dysocjacyjna-i-fuga.json' with { type: 'json' };
import exp9 from '../../content-src/psychiatry/psych-trauma-dysocjacja/experiences/did-tozsamosc-i-rozszczepienie.json' with { type: 'json' };
import exp10 from '../../content-src/psychiatry/psych-trauma-dysocjacja/experiences/did-roznicowanie-bpd-i-psychoza.json' with { type: 'json' };
import exp11 from '../../content-src/psychiatry/psych-trauma-dysocjacja/experiences/osobowosc-icd11-wymiary.json' with { type: 'json' };
import exp12 from '../../content-src/psychiatry/psych-trauma-dysocjacja/experiences/borderline-bpd-mechanizmy.json' with { type: 'json' };
import exp13 from '../../content-src/psychiatry/psych-trauma-dysocjacja/experiences/bpd-roznicowanie-cptsd-chad-adhd.json' with { type: 'json' };
import exp14 from '../../content-src/psychiatry/psych-trauma-dysocjacja/experiences/trauma-somatyka-mimiki-i-bezpieczenstwo.json' with { type: 'json' };
import exp15 from '../../content-src/psychiatry/psych-trauma-dysocjacja/experiences/psychoterapia-traumy-fazy-i-metody.json' with { type: 'json' };
import exp16 from '../../content-src/psychiatry/psych-trauma-dysocjacja/experiences/dbt-interwencja-kryzysowa-i-bezpieczenstwo.json' with { type: 'json' };

export const traumaModuleMeta = moduleData;
export const traumaSources: Record<string, Source> = sourcesData as Record<string, Source>;
export const traumaClaims: EvidenceClaim[] = claimsData as EvidenceClaim[];

export const traumaLessons: Lesson[] = [
  l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14, l15, l16,
] as Lesson[];

export const traumaExperiences: Record<string, LessonExperienceV2> = {
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
