import type { PsychiatryWorkbenchPreset } from '../types.ts';

export const PHARMACOLOGY_PRESETS: Record<string, PsychiatryWorkbenchPreset> = {
  'd2-evidence-001': {
    id: 'd2-evidence-001',
    title: 'Wizualizacja occupancy D2: Risperidon vs Arypiprazol',
    tab: 'pharmacology',
    patientSummary: 'Porównanie czystego antagonisty z częściowym agonistą pod kątem zajęcia D2 i ryzyka EPS.',
    data: {
      lessonId: 'receptory-dopaminowe-okno-kapura',
      antagonistDrug: 'risperidone',
      antagonistDoseMg: 4,
      partialAgonistDrug: 'aripiprazole',
      partialAgonistDoseMg: 15,
      studyContext: 'PET Kapur 2000 vs Grunder 2008',
    },
  },
  'sert-occupancy-001': {
    id: 'sert-occupancy-001',
    title: 'Krzywa wysycenia SERT w badaniach Meyera',
    tab: 'pharmacology',
    patientSummary: 'Ekspozycja SERT >80% przy standardowych dawkach SSRI i brak liniowej korzyści z megadawek.',
    data: {
      lessonId: 'transportery-monoamin-sert-net-dat',
      drug: 'sertraline',
      dosesTested: [25, 50, 100, 200],
      plateauThreshold: 80,
    },
  },
  'cyp-interaction-001': {
    id: 'cyp-interaction-001',
    title: 'Interakcja fluoksetyna (inhibitor CYP2D6) + metoprolol',
    tab: 'pharmacology',
    patientSummary: 'Wzrost stężenia substratu CYP2D6 po włączeniu silnego inhibitora (fenokonwersja).',
    data: {
      lessonId: 'farmakogenetyka-cyp-pgx',
      inhibitor: 'fluoxetine',
      targetEnzyme: 'CYP2D6',
      substrate: 'venlafaxine',
      expectedEffect: 'Wzrost stężenia substancji macierzystej, spadek metabolitu O-desmetyl',
    },
  },
  'clozapine-smoking-001': {
    id: 'clozapine-smoking-001',
    title: 'Klozapina i zaprzestanie palenia tytoniu (CYP1A2)',
    tab: 'pharmacology',
    patientSummary: 'Zaprzestanie palenia tytoniu (deindukcja CYP1A2): opisywany w literaturze wzrost stężenia klozapiny o 50–100% (duża zmienność osobnicza; wymagane TDM; stan zapalny/infekcja może dodatkowo zmniejszać aktywność CYP1A2).',
    data: {
      lessonId: 'lekoopornosc-i-klozapina',
      drug: 'clozapine',
      baselineDoseMg: 350,
      smokingStatus: 'zaprzestanie_palenia',
      cyp1a2Deinduction: true,
      claimKey: 'clozapine-smoking-cyp1a2',
      monitoringNeed: 'Pilne oznaczenie TDM klozapiny pod kątem drgawek i toksyczności',
    },
  },
};
