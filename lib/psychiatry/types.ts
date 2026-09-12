import type { LessonExperienceV2 } from '../course-types.ts';

export type PsychiatryModuleId = 'psych-afektywne' | 'psych-farmakologia';

export type PsychiatryLessonId =
  // Moduł 01: Fundamenty psychiatrii i diagnostyka kliniczna (16 lekcji)
  | 'wywiad-psychiatryczny-mse'
  | 'klasyfikacje-dsm5-icd11'
  | 'psychopatologia-objawow'
  | 'depresja-fenotypy-i-kryteria'
  | 'mania-hipomania-spektrum'
  | 'psychoza-i-szlaki-dopaminy'
  | 'zaburzenia-lekowe-gad-napadowy'
  | 'ocd-i-petla-cstc'
  | 'ptsd-trauma-stres'
  | 'adhd-dorosli-i-rozwojowe'
  | 'zaburzenia-osobowosci-wymiarowe'
  | 'substancje-i-secondary-causes'
  | 'skale-kliniczne-w-psychiatrii'
  | 'ocena-ryzyka-samobojczego-agresji'
  | 'diagnostyka-roznicowa-algorytmy'
  | 'przypadki-integracyjne-diagnostyka'
  // Moduł 02: Psychofarmakologia kliniczna i leczenie biologiczne (22 lekcje)
  | 'farmakokinetyka-oun-bariera'
  | 'transportery-monoamin-sert-net-dat'
  | 'receptory-dopaminowe-okno-kapura'
  | 'uklad-serotoninergiczny-receptory'
  | 'glutaminian-gaba-neuroplastycznosc'
  | 'klasyczne-antydepresanty-ssri-snri-tlpd-maoi'
  | 'atypowe-antydepresanty-multimodalne'
  | 'normotymiki-lit-walproinian-lamotrygina'
  | 'leki-przeciwpsychotyczne-generacje'
  | 'benzodiazepiny-leki-z-tapering'
  | 'farmakoterapia-adhd-stymulanty'
  | 'monitorowanie-stezen-tdm'
  | 'farmakogenetyka-cyp-pgx'
  | 'zamiana-lekow-switching-cross-tapering'
  | 'racjonalna-polipragmazja-i-augmentacja'
  | 'profilaktyka-dzialan-niepozadanych'
  | 'ostre-stany-toksyczne-zespol-serotoninowy'
  | 'zlosliwy-zespol-neuroleptyczny-nms'
  | 'bezpieczenstwo-kardiometaboliczne-qtc-prolaktyna'
  | 'zaburzenia-ruchowe-polekowe-eps-dysdyskinezy'
  | 'lekoopornosc-i-klozapina'
  | 'interwencje-biologiczne-ect-rtms-ketamina';

export interface WhatWouldChangeYourMind {
  knownFacts: string[];
  unknownFactors: string[];
  criticalDifferentiatingFactor: string;
}

export interface PsychiatryLessonEnhancement {
  lessonId: PsychiatryLessonId;
  experience?: LessonExperienceV2;
  diagrams: string[];
  inlineWidgets: string[];
  workbenchPresetId?: string;
  caseId?: string;
  recurringPatientId?: string;
  whatChangesYourMind?: WhatWouldChangeYourMind;
  evidenceMode?:
    | 'clinical-framework'
    | 'pet-model'
    | 'measured-tdm'
    | 'validated-decision-rule'
    | 'pk-sensitivity'
    | 'safety-context';
}

export interface PsychiatryWorkbenchPreset {
  id: string;
  title: string;
  tab: 'psych-center' | 'diagnostic' | 'pharmacology' | 'safety';
  patientSummary: string;
  data: Record<string, unknown>;
}

export type PsychiatryLessonEnhancementRegistry = Record<
  PsychiatryLessonId,
  PsychiatryLessonEnhancement
>;
