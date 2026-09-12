import { PSYCHIATRY_DRUGS, type DrugProfile } from './psychiatry-simulator-data.ts';

export interface PatientProfile {
  age: number;
  sex: 'K' | 'M';
  symptomDurationWeeks: number;
  depressedMood: boolean;
  anhedonia: boolean;
  lowEnergy: boolean;
  sleepPattern: 'prawidlowy' | 'bezsennosc_wczesna' | 'bezsennosc_pozna' | 'zmniejszona_potrzeba_snu' | 'hipersomnia';
  appetiteWeight: 'prawidlowy' | 'spadek_jadlowstret' | 'wzrost_hiperfagia';
  psychomotor: 'prawidlowy' | 'spowolnienie' | 'pobudzenie_agitacja';
  guiltWorthlessness: boolean;
  concentrationImpacting: boolean;
  suicidalIdeationLevel: 0 | 1 | 2 | 3 | 4 | 5; // C-SSRS
  elevatedExpansiveMood: boolean;
  flightOfIdeas: boolean;
  grandiosityOrPsychosis: boolean;
  excessiveRiskActivities: boolean;
  familyHistoryBipolar: boolean;
  substanceUse: 'brak' | 'alkohol' | 'tyton' | 'stymulanty' | 'thc';
  somaticComorbidities: ('brak' | 'niedoczynnosc_tarczycy' | 'niewydolnosc_nerek' | 'choroba_wiencowa')[];
  labTsh: number;
  labEgfr: number;
  labPotassium: number;
  cyp2d6Phenotype: 'PM' | 'IM' | 'NM' | 'UM';
  cyp2c19Phenotype: 'PM' | 'IM' | 'NM' | 'UM';
  adherencePercent: number; // 0 - 100
}

export interface ActivePrescription {
  drugId: string;
  doseMg: number;
}

export interface HunterEvaluation {
  meetsCriteria: boolean;
  conditionMet: string | null;
  severity: 'brak' | 'zagrozenie_umiarkowane' | 'stan_zagrozenia_zycia';
  rationale: string;
}

export function evaluateHunterCriteria(
  prescriptions: ActivePrescription[],
  clinicalSigns: {
    spontaneousClonus: boolean;
    inducibleClonus: boolean;
    ocularClonus: boolean;
    agitation: boolean;
    diaphoresis: boolean;
    tremor: boolean;
    hyperreflexia: boolean;
    hyperthermiaOver38: boolean;
  }
): HunterEvaluation {
  const proserotoninDrugs = prescriptions.filter(p => {
    const d = PSYCHIATRY_DRUGS[p.drugId];
    return d && d.serotoninToxicityWeight > 0;
  });

  if (proserotoninDrugs.length === 0) {
    return {
      meetsCriteria: false,
      conditionMet: null,
      severity: 'brak',
      rationale: 'Brak aktywnego leku o działaniu proserotoninergicznym.',
    };
  }

  const { spontaneousClonus, inducibleClonus, ocularClonus, agitation, diaphoresis, tremor, hyperreflexia, hyperthermiaOver38 } = clinicalSigns;

  if (spontaneousClonus) {
    return {
      meetsCriteria: true,
      conditionMet: 'Spontaniczny klonus (spontaneous clonus)',
      severity: hyperthermiaOver38 ? 'stan_zagrozenia_zycia' : 'zagrozenie_umiarkowane',
      rationale: 'Kryteria decyzyjne Huntera: spontaniczny klonus u pacjenta po leku serotoninergicznym jest wystarczający do pewnego rozpoznania.',
    };
  }

  if (inducibleClonus && (agitation || diaphoresis)) {
    return {
      meetsCriteria: true,
      conditionMet: 'Indukowany klonus + pobudzenie lub obfite poty',
      severity: hyperthermiaOver38 ? 'stan_zagrozenia_zycia' : 'zagrozenie_umiarkowane',
      rationale: 'Kryteria Huntera: indukowany klonus połączony z pobudzeniem psychoruchowym lub zlewnymi potami.',
    };
  }

  if (ocularClonus && (agitation || diaphoresis)) {
    return {
      meetsCriteria: true,
      conditionMet: 'Klonus oczny + pobudzenie lub obfite poty',
      severity: hyperthermiaOver38 ? 'stan_zagrozenia_zycia' : 'zagrozenie_umiarkowane',
      rationale: 'Kryteria Huntera: mimowolne ruchy gałek ocznych (ocular clonus) z objawami wegetatywnymi.',
    };
  }

  if (tremor && hyperreflexia) {
    return {
      meetsCriteria: true,
      conditionMet: 'Drżenie mięśniowe + wygórowanie odruchów (hiperrefleksja)',
      severity: hyperthermiaOver38 ? 'stan_zagrozenia_zycia' : 'zagrozenie_umiarkowane',
      rationale: 'Kryteria Huntera: drżenie mięśniowe skojarzone z symetrycznym wygórowaniem odruchów głębokich.',
    };
  }

  if (hyperthermiaOver38 && (ocularClonus || inducibleClonus)) {
    return {
      meetsCriteria: true,
      conditionMet: 'Hipertermia (>38°C) + klonus oczny lub indukowany',
      severity: 'stan_zagrozenia_zycia',
      rationale: 'Kryteria Huntera: gorączka z klonusem stanowi bezpośrednie zagrożenie życia (ryzyko rabdomiolizy).',
    };
  }

  return {
    meetsCriteria: false,
    conditionMet: null,
    severity: 'brak',
    rationale: 'Brak spełnienia kryteriów reguły decyzyjnej Huntera (brak klonusu lub kombinacji drżenia z hiperrefleksją).',
  };
}

export interface DrugCalculatedState {
  drug: DrugProfile;
  prescribedDose: number;
  effectiveDose: number;
  estimatedCss: string;
  sertOccupancyPercent: number;
  d2OccupancyPercent: number;
  evidenceCategory: string;
  safetyAlerts: string[];
}

export function calculateDrugState(
  rx: ActivePrescription,
  patient: PatientProfile
): DrugCalculatedState {
  const drug = PSYCHIATRY_DRUGS[rx.drugId];
  if (!drug) throw new Error(`Nieznany lek: ${rx.drugId}`);

  let cypFactor = 1.0;
  if (drug.primaryCyp.includes('CYP2D6')) {
    if (patient.cyp2d6Phenotype === 'PM') cypFactor *= 2.2;
    if (patient.cyp2d6Phenotype === 'IM') cypFactor *= 1.4;
    if (patient.cyp2d6Phenotype === 'UM') cypFactor *= 0.45;
  }
  if (drug.primaryCyp.includes('CYP2C19')) {
    if (patient.cyp2c19Phenotype === 'PM') cypFactor *= 1.8;
    if (patient.cyp2c19Phenotype === 'UM') cypFactor *= 0.55;
  }
  if (drug.primaryCyp.includes('CYP1A2') && patient.substanceUse === 'tyton') {
    cypFactor *= 0.55; // dym tytoniowy przyspiesza klirens olanzapiny/klozapiny o ~50%
  }

  const adherenceFraction = Math.max(0.1, patient.adherencePercent / 100);
  const effectiveDose = rx.doseMg * cypFactor * adherenceFraction;

  // Obliczenie occupancy SERT (krzywa hiperboliczna Meyera: Emax * Dose / (ED50 + Dose))
  let sertOccupancy = 0;
  if (drug.class === 'SSRI' || drug.class === 'SNRI') {
    const ed50 = drug.defaultDose * 0.1;
    sertOccupancy = Math.min(88, Math.round((88 * effectiveDose) / (ed50 + effectiveDose)));
  }

  // Obliczenie occupancy D2 (Kapur et al.)
  let d2Occupancy = 0;
  if (drug.class === 'SGA' || drug.class === 'FGA') {
    const ed50D2 = drug.defaultDose * 0.35;
    d2Occupancy = Math.min(94, Math.round((95 * effectiveDose) / (ed50D2 + effectiveDose)));
  }

  const alerts: string[] = [];
  if (d2Occupancy > 80 && drug.id !== 'aripiprazole') {
    alerts.push(`Wysycenie receptorów D2 wynosi ${d2Occupancy}% (>80% próg Kapura). Wysokie ryzyko objawów pozapiramidowych (EPS) i hiperprolaktynemii.`);
  } else if (d2Occupancy >= 65 && d2Occupancy <= 80) {
    alerts.push(`Wysycenie receptorów D2 w optymalnym oknie terapeutycznym (65–80%). Skuteczność przeciwpsychotyczna bez nasilonych EPS.`);
  }

  if (drug.id === 'lithium') {
    const estimatedLevel = ((effectiveDose / 750) * 0.7 * (patient.labEgfr < 60 ? 1.4 : 1.0)).toFixed(2);
    if (Number(estimatedLevel) > 1.2) {
      alerts.push(`Szacowane stężenie litu ${estimatedLevel} mmol/l przekracza próg toksyczności (1,2 mmol/l)! Ryzyko neurotoksyczności.`);
    } else {
      alerts.push(`Szacowane stężenie litu w osoczu: ~${estimatedLevel} mmol/l (norma: 0,6–0,8 mmol/l).`);
    }
  }

  if (drug.credibleMedsQtRisk === 'Known Risk' && (patient.labPotassium < 3.5 || patient.age >= 65)) {
    alerts.push(`Krytyczne ostrzeżenie QTc (CredibleMeds): Pacjent z grupy ryzyka (K+ < 3.5 lub wiek >=65) przyjmuje lek o znanym ryzyku TdP.`);
  }

  return {
    drug,
    prescribedDose: rx.doseMg,
    effectiveDose: Math.round(effectiveDose),
    estimatedCss: drug.id === 'lithium'
      ? `${((effectiveDose / 750) * 0.7 * (patient.labEgfr < 60 ? 1.4 : 1.0)).toFixed(2)} mmol/l`
      : `${Math.round(effectiveDose * 1.5)} ng/ml (szacunek populacyjny)`,
    sertOccupancyPercent: sertOccupancy,
    d2OccupancyPercent: d2Occupancy,
    evidenceCategory: drug.petOccupancyAtDefaultDose ? 'PET measured' : 'PK-derived',
    safetyAlerts: alerts,
  };
}

export interface DiagnosticEvaluation {
  diagnosisId: 'mdd' | 'chad1' | 'chad2' | 'dystymia';
  name: string;
  status: 'spełnione' | 'niespełnione' | 'brak danych' | 'sprzeczne dane';
  criteriaList: { label: string; met: boolean; note: string }[];
  trapWarning?: string;
}

export function evaluateDiagnosticCriteria(patient: PatientProfile): DiagnosticEvaluation[] {
  const evaluations: DiagnosticEvaluation[] = [];

  // 1. Epizod depresyjny (MDD wg ICD-11 / DSM-5-TR)
  const coreSymptom = patient.depressedMood || patient.anhedonia;
  const secondarySymptoms = [
    patient.lowEnergy,
    patient.sleepPattern !== 'prawidlowy' && patient.sleepPattern !== 'zmniejszona_potrzeba_snu',
    patient.appetiteWeight !== 'prawidlowy',
    patient.psychomotor !== 'prawidlowy',
    patient.guiltWorthlessness,
    patient.concentrationImpacting,
    patient.suicidalIdeationLevel >= 1,
  ];
  const countSecondary = secondarySymptoms.filter(Boolean).length;
  const durationMet = patient.symptomDurationWeeks >= 2;
  const mddMet = coreSymptom && countSecondary >= 4 && durationMet;

  let mddTrap: string | undefined;
  if (patient.labTsh > 4.5) {
    mddTrap = `Pułapka somatyczna: TSH wynosi ${patient.labTsh} mIU/l. Przed rozpoznaniem pierwotnej depresji należy wykluczyć i skorygować niedoczynność tarczycy!`;
  } else if (patient.sleepPattern === 'zmniejszona_potrzeba_snu' && patient.familyHistoryBipolar) {
    mddTrap = 'Uwaga na spektrum dwubiegunowe (ChAD): Zmniejszona potrzeba snu i wywiad rodzinny ChAD nakazują ostrożność przed podaniem samego SSRI!';
  }

  evaluations.push({
    diagnosisId: 'mdd',
    name: 'Epizod depresyjny (ICD-11 / DSM-5-TR)',
    status: mddMet ? 'spełnione' : countSecondary >= 3 ? 'brak danych' : 'niespełnione',
    criteriaList: [
      { label: 'Objaw osiowy (obniżony nastrój LUB anhedonia)', met: coreSymptom, note: coreSymptom ? 'Obecny' : 'Brak obu objawów osiowych' },
      { label: 'Czas trwania >= 2 tygodnie', met: durationMet, note: `${patient.symptomDurationWeeks} tyg.` },
      { label: 'Co najmniej 5 objawów łącznie', met: (coreSymptom ? 1 : 0) + countSecondary >= 5, note: `${(coreSymptom ? 1 : 0) + countSecondary}/10 objawów` },
      { label: 'Wykluczenie tła somatycznego (TSH)', met: patient.labTsh <= 4.0, note: `TSH: ${patient.labTsh} mIU/l` },
    ],
    trapWarning: mddTrap,
  });

  // 2. Epizod manii (ChAD I)
  const maniaMood = patient.elevatedExpansiveMood;
  const maniaSymptoms = [
    patient.sleepPattern === 'zmniejszona_potrzeba_snu',
    patient.flightOfIdeas,
    patient.grandiosityOrPsychosis,
    patient.excessiveRiskActivities,
  ].filter(Boolean).length;
  const maniaDuration = patient.symptomDurationWeeks >= 1 || patient.grandiosityOrPsychosis;
  const maniaMet = maniaMood && maniaSymptoms >= 3 && maniaDuration;

  evaluations.push({
    diagnosisId: 'chad1',
    name: 'Epizod manii / ChAD typu I',
    status: maniaMet ? 'spełnione' : maniaSymptoms >= 2 ? 'brak danych' : 'niespełnione',
    criteriaList: [
      { label: 'Wyraźnie wzmożony, ekspansywny nastrój i napęd', met: maniaMood, note: maniaMood ? 'Obecny' : 'Brak' },
      { label: 'Zmniejszona potrzeba snu bez zmęczenia', met: patient.sleepPattern === 'zmniejszona_potrzeba_snu', note: patient.sleepPattern },
      { label: 'Gonitwa myśli / wielkościowość / ryzykowne działania', met: maniaSymptoms >= 2, note: `${maniaSymptoms} cechy` },
      { label: 'Czas trwania >= 7 dni lub psychoza', met: maniaDuration, note: `${patient.symptomDurationWeeks} tyg. / psychoza: ${patient.grandiosityOrPsychosis}` },
    ],
    trapWarning: patient.grandiosityOrPsychosis ? 'Obecność objawów psychotycznych bezwzględnie wyklucza hipomanię i klasyfikuje epizod jako manię (ChAD I)!' : undefined,
  });

  return evaluations;
}
