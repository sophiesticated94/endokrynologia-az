import type { Lesson, LessonExperienceV2, Source } from '../course-types.ts';
import type { EvidenceClaim } from '../content/schemas/lesson-revision.ts';

import moduleData from '../../content-src/psychiatry/psych-farmakologia/module.json' with { type: 'json' };
import sourcesData from '../../content-src/psychiatry/psych-farmakologia/sources.json' with { type: 'json' };
import claimsData from '../../content-src/psychiatry/psych-farmakologia/claims.json' with { type: 'json' };

import l1 from '../../content-src/psychiatry/psych-farmakologia/lessons/farmakokinetyka-oun-bariera.json' with { type: 'json' };
import l2 from '../../content-src/psychiatry/psych-farmakologia/lessons/transportery-monoamin-sert-net-dat.json' with { type: 'json' };
import l3 from '../../content-src/psychiatry/psych-farmakologia/lessons/receptory-dopaminowe-okno-kapura.json' with { type: 'json' };
import l4 from '../../content-src/psychiatry/psych-farmakologia/lessons/uklad-serotoninergiczny-receptory.json' with { type: 'json' };
import l5 from '../../content-src/psychiatry/psych-farmakologia/lessons/glutaminian-gaba-neuroplastycznosc.json' with { type: 'json' };
import l6 from '../../content-src/psychiatry/psych-farmakologia/lessons/klasyczne-antydepresanty-ssri-snri-tlpd-maoi.json' with { type: 'json' };
import l7 from '../../content-src/psychiatry/psych-farmakologia/lessons/atypowe-antydepresanty-multimodalne.json' with { type: 'json' };
import l8 from '../../content-src/psychiatry/psych-farmakologia/lessons/normotymiki-lit-walproinian-lamotrygina.json' with { type: 'json' };
import l9 from '../../content-src/psychiatry/psych-farmakologia/lessons/leki-przeciwpsychotyczne-generacje.json' with { type: 'json' };
import l10 from '../../content-src/psychiatry/psych-farmakologia/lessons/benzodiazepiny-leki-z-tapering.json' with { type: 'json' };
import l11 from '../../content-src/psychiatry/psych-farmakologia/lessons/farmakoterapia-adhd-stymulanty.json' with { type: 'json' };
import l12 from '../../content-src/psychiatry/psych-farmakologia/lessons/monitorowanie-stezen-tdm.json' with { type: 'json' };
import l13 from '../../content-src/psychiatry/psych-farmakologia/lessons/farmakogenetyka-cyp-pgx.json' with { type: 'json' };
import l14 from '../../content-src/psychiatry/psych-farmakologia/lessons/zamiana-lekow-switching-cross-tapering.json' with { type: 'json' };
import l15 from '../../content-src/psychiatry/psych-farmakologia/lessons/racjonalna-polipragmazja-i-augmentacja.json' with { type: 'json' };
import l16 from '../../content-src/psychiatry/psych-farmakologia/lessons/profilaktyka-dzialan-niepozadanych.json' with { type: 'json' };
import l17 from '../../content-src/psychiatry/psych-farmakologia/lessons/ostre-stany-toksyczne-zespol-serotoninowy.json' with { type: 'json' };
import l18 from '../../content-src/psychiatry/psych-farmakologia/lessons/zlosliwy-zespol-neuroleptyczny-nms.json' with { type: 'json' };
import l19 from '../../content-src/psychiatry/psych-farmakologia/lessons/bezpieczenstwo-kardiometaboliczne-qtc-prolaktyna.json' with { type: 'json' };
import l20 from '../../content-src/psychiatry/psych-farmakologia/lessons/zaburzenia-ruchowe-polekowe-eps-dysdyskinezy.json' with { type: 'json' };
import l21 from '../../content-src/psychiatry/psych-farmakologia/lessons/lekoopornosc-i-klozapina.json' with { type: 'json' };
import l22 from '../../content-src/psychiatry/psych-farmakologia/lessons/interwencje-biologiczne-ect-rtms-ketamina.json' with { type: 'json' };

import exp1 from '../../content-src/psychiatry/psych-farmakologia/experiences/farmakokinetyka-oun-bariera.json' with { type: 'json' };
import exp2 from '../../content-src/psychiatry/psych-farmakologia/experiences/transportery-monoamin-sert-net-dat.json' with { type: 'json' };
import exp3 from '../../content-src/psychiatry/psych-farmakologia/experiences/receptory-dopaminowe-okno-kapura.json' with { type: 'json' };
import exp4 from '../../content-src/psychiatry/psych-farmakologia/experiences/uklad-serotoninergiczny-receptory.json' with { type: 'json' };
import exp5 from '../../content-src/psychiatry/psych-farmakologia/experiences/glutaminian-gaba-neuroplastycznosc.json' with { type: 'json' };
import exp6 from '../../content-src/psychiatry/psych-farmakologia/experiences/klasyczne-antydepresanty-ssri-snri-tlpd-maoi.json' with { type: 'json' };
import exp7 from '../../content-src/psychiatry/psych-farmakologia/experiences/atypowe-antydepresanty-multimodalne.json' with { type: 'json' };
import exp8 from '../../content-src/psychiatry/psych-farmakologia/experiences/normotymiki-lit-walproinian-lamotrygina.json' with { type: 'json' };
import exp9 from '../../content-src/psychiatry/psych-farmakologia/experiences/leki-przeciwpsychotyczne-generacje.json' with { type: 'json' };
import exp10 from '../../content-src/psychiatry/psych-farmakologia/experiences/benzodiazepiny-leki-z-tapering.json' with { type: 'json' };
import exp11 from '../../content-src/psychiatry/psych-farmakologia/experiences/farmakoterapia-adhd-stymulanty.json' with { type: 'json' };
import exp12 from '../../content-src/psychiatry/psych-farmakologia/experiences/monitorowanie-stezen-tdm.json' with { type: 'json' };
import exp13 from '../../content-src/psychiatry/psych-farmakologia/experiences/farmakogenetyka-cyp-pgx.json' with { type: 'json' };
import exp14 from '../../content-src/psychiatry/psych-farmakologia/experiences/zamiana-lekow-switching-cross-tapering.json' with { type: 'json' };
import exp15 from '../../content-src/psychiatry/psych-farmakologia/experiences/racjonalna-polipragmazja-i-augmentacja.json' with { type: 'json' };
import exp16 from '../../content-src/psychiatry/psych-farmakologia/experiences/profilaktyka-dzialan-niepozadanych.json' with { type: 'json' };
import exp17 from '../../content-src/psychiatry/psych-farmakologia/experiences/ostre-stany-toksyczne-zespol-serotoninowy.json' with { type: 'json' };
import exp18 from '../../content-src/psychiatry/psych-farmakologia/experiences/zlosliwy-zespol-neuroleptyczny-nms.json' with { type: 'json' };
import exp19 from '../../content-src/psychiatry/psych-farmakologia/experiences/bezpieczenstwo-kardiometaboliczne-qtc-prolaktyna.json' with { type: 'json' };
import exp20 from '../../content-src/psychiatry/psych-farmakologia/experiences/zaburzenia-ruchowe-polekowe-eps-dysdyskinezy.json' with { type: 'json' };
import exp21 from '../../content-src/psychiatry/psych-farmakologia/experiences/lekoopornosc-i-klozapina.json' with { type: 'json' };
import exp22 from '../../content-src/psychiatry/psych-farmakologia/experiences/interwencje-biologiczne-ect-rtms-ketamina.json' with { type: 'json' };

export const pharmacologyModuleMeta = moduleData;
export const pharmacologySources: Record<string, Source> = sourcesData as Record<string, Source>;
export const pharmacologyClaims: EvidenceClaim[] = claimsData as EvidenceClaim[];

export const pharmacologyLessons: Lesson[] = [
  l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20, l21, l22,
] as Lesson[];

export const pharmacologyExperiences: Record<string, LessonExperienceV2> = {
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
  [exp17.lessonId]: exp17 as LessonExperienceV2,
  [exp18.lessonId]: exp18 as LessonExperienceV2,
  [exp19.lessonId]: exp19 as LessonExperienceV2,
  [exp20.lessonId]: exp20 as LessonExperienceV2,
  [exp21.lessonId]: exp21 as LessonExperienceV2,
  [exp22.lessonId]: exp22 as LessonExperienceV2,
};
