import { PSYCHIATRY_DRUGS, type DrugProfile } from './psychiatry-simulator-data.ts';
import {
  calculateD2Occupancy,
  D2_DRUGS_EVIDENCE,
  type D2OccupancyModel,
} from './psychiatry-pharmacokinetics-engine.ts';

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
  substanceUse: 'brak' | 'alkohol' | 'tyton' | 'zaprzestanie_palenia' | 'stymulanty' | 'thc';
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

export interface HunterClinicalSignsInput {
  spontaneousClonus?: boolean;
  inducibleClonus?: boolean;
  ocularClonus?: boolean;
  agitation?: boolean;
  diaphoresis?: boolean;
  tremor?: boolean;
  hyperreflexia?: boolean;
  hypertonia?: boolean;
  hyperthermiaOver38?: boolean;
  temperature?: number;
  serotonergicExposure?: boolean | 'unknown';
}

export interface HunterEvaluation {
  meetsCriteria: boolean;
  conditionMet: string | null;
  severity: 'brak' | 'zagrozenie_umiarkowane' | 'stan_zagrozenia_zycia';
  rationale: string;
  branchNumber?: 1 | 2 | 3 | 4 | 5;
  missingInformation?: string[];
  disclaimer?: string;
}

export function evaluateHunterCriteria(
  prescriptionsOrExposure: ActivePrescription[] | boolean | 'unknown',
  clinicalSigns: HunterClinicalSignsInput
): HunterEvaluation {
  let exposure: boolean | 'unknown';

  if (typeof prescriptionsOrExposure === 'boolean') {
    exposure = prescriptionsOrExposure;
  } else if (prescriptionsOrExposure === 'unknown') {
    exposure = 'unknown';
  } else if (clinicalSigns.serotonergicExposure !== undefined) {
    exposure = clinicalSigns.serotonergicExposure;
  } else {
    const proserotonin = (prescriptionsOrExposure || []).filter(p => {
      const d = PSYCHIATRY_DRUGS[p.drugId];
      return d && d.serotoninToxicityWeight > 0;
    });
    exposure = proserotonin.length > 0;
  }

  const {
    spontaneousClonus = false,
    inducibleClonus = false,
    ocularClonus = false,
    agitation = false,
    diaphoresis = false,
    tremor = false,
    hyperreflexia = false,
    hypertonia,
    hyperthermiaOver38 = false,
    temperature,
  } = clinicalSigns;

  const isFever = temperature !== undefined ? temperature > 38.0 : hyperthermiaOver38;
  const isHypertonic = hypertonia === true;

  const missingInformation: string[] = [];
  if (exposure === 'unknown') missingInformation.push('Brak potwierdzenia wywiadu ekspozycji na leki serotoninergiczne');
  if (temperature === undefined && !hyperthermiaOver38) missingInformation.push('Brak pomiaru temperatury ciała');
  if (hypertonia === undefined && isFever && (ocularClonus || inducibleClonus)) {
    missingInformation.push('Brak oceny napięcia mięśniowego (ocena hipertonii pod kątem gałęzi 5)');
  }

  const disclaimer = 'EDUKACYJNA REGUŁA DECYZYJNA — Kryteria Huntera (Dunkley 2003: czułość 84%, swoistość 97%) stanowią regułę decyzyjną wyłącznie w kontekście potwierdzonej ekspozycji na substancje serotoninergiczne. Nie są samodzielnym biomarkerem laboratoryjnym.';

  if (exposure === false) {
    return {
      meetsCriteria: false,
      conditionMet: null,
      severity: 'brak',
      rationale: 'Brak aktywnego leku lub udokumentowanej ekspozycji proserotoninergicznej. Zespół serotoninowy nie może być rozpoznany bez ekspozycji.',
      missingInformation,
      disclaimer,
    };
  }

  let branch: 1 | 2 | 3 | 4 | 5 | null = null;
  let conditionMet: string | null = null;

  if (spontaneousClonus) {
    branch = 1;
    conditionMet = 'Gałąź 1: Spontaniczny klonus (spontaneous clonus)';
  } else if (inducibleClonus && (agitation || diaphoresis)) {
    branch = 2;
    conditionMet = 'Gałąź 2: Indukowany klonus + pobudzenie psychoruchowe lub zlewne poty';
  } else if (ocularClonus && (agitation || diaphoresis)) {
    branch = 3;
    conditionMet = 'Gałąź 3: Klonus oczny + pobudzenie psychoruchowe lub zlewne poty';
  } else if (tremor && hyperreflexia) {
    branch = 4;
    conditionMet = 'Gałąź 4: Drżenie mięśniowe + wygórowanie odruchów głębokich (hiperrefleksja)';
  } else if (isHypertonic && isFever && (ocularClonus || inducibleClonus)) {
    branch = 5;
    conditionMet = 'Gałąź 5: Hipertonia mięśniowa + gorączka (>38°C) + klonus oczny lub indukowany';
  }

  if (branch !== null) {
    if (exposure === 'unknown') {
      return {
        meetsCriteria: false,
        conditionMet: `${conditionMet} (UWAGA: niepotwierdzona ekspozycja serotoninergiczna)`,
        branchNumber: branch,
        severity: isFever ? 'stan_zagrozenia_zycia' : 'zagrozenie_umiarkowane',
        rationale: `Obraz neurologiczny odpowiada gałęzi ${branch} kryteriów Huntera, lecz brak pewności co do ekspozycji serotoninergicznej uniemożliwia formalne rozpoznanie zespołu serotoninowego. Wymagana pilna weryfikacja leków.`,
        missingInformation,
        disclaimer,
      };
    }

    return {
      meetsCriteria: true,
      conditionMet,
      branchNumber: branch,
      severity: (isFever || branch === 5) ? 'stan_zagrozenia_zycia' : 'zagrozenie_umiarkowane',
      rationale: `Kryteria decyzyjne Huntera (Dunkley 2003): spełniona ${conditionMet} w kontekście potwierdzonej ekspozycji serotoninergicznej.`,
      missingInformation,
      disclaimer,
    };
  }

  return {
    meetsCriteria: false,
    conditionMet: null,
    severity: 'brak',
    rationale: 'Brak spełnienia żadnej z 5 gałęzi reguły decyzyjnej Huntera (wymagany klonus lub kombinacja drżenia z hiperrefleksją bądź hipertonia z gorączką i klonusem).',
    missingInformation,
    disclaimer,
  };
}

export interface DrugCalculatedState {
  drug: DrugProfile;
  prescribedDose: number;
  effectiveDose: number;
  exposureTendency: 'lower' | 'neutral' | 'higher';
  exposureExplanation: string;
  estimatedCss: string;
  sertOccupancyPercent: number;
  d2OccupancyPercent: number;
  d2Model?: D2OccupancyModel;
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

  let exposureTendency: 'lower' | 'neutral' | 'higher' = 'neutral';
  let exposureExplanation = 'Standardowy profil metabolizmu populacyjnego.';

  if (cypFactor > 1.2 || adherenceFraction > 1.0) {
    exposureTendency = 'higher';
    exposureExplanation = 'Spowolniony metabolizm (fenotyp PM/IM lub deindukcja enzymatyczna) — tendencja do wyższego stężenia.';
  } else if (cypFactor < 0.8 || adherenceFraction < 0.7) {
    exposureTendency = 'lower';
    exposureExplanation = 'Przyspieszony metabolizm (indukcja dymem tytoniowym lub fenotyp UM) bądź niska adherencja — tendencja do niższej ekspozycji.';
  }

  let estimatedCss: string;
  if (drug.id === 'lithium') {
    estimatedCss = 'Measured TDM required (pomiar 12h po dawce, brak symulacji stężenia)';
  } else if (drug.id === 'clozapine' && patient.substanceUse === 'zaprzestanie_palenia') {
    estimatedCss = 'Exposure may increase (deindukcja CYP1A2: opisywany wzrost o 50–100%; wymagany TDM)';
  } else if (exposureTendency === 'higher') {
    estimatedCss = 'Exposure may increase (spowolniony klirens / interakcja metaboliczna)';
  } else if (exposureTendency === 'lower') {
    estimatedCss = 'Exposure may decrease (przyspieszony klirens / indukcja enzymatyczna)';
  } else {
    estimatedCss = 'TDM not routinely indicated (standardowy metabolizm enzymatyczny)';
  }

  // D2 Occupancy z walidowanego silnika PET
  let d2Occupancy = 0;
  let d2Model: D2OccupancyModel | undefined;
  if (drug.id in D2_DRUGS_EVIDENCE) {
    d2Model = calculateD2Occupancy(drug.id, rx.doseMg);
    d2Occupancy = d2Model.d2OccupancyPercent;
  }

  // SERT Occupancy z badań PET (Meyer et al. 2004)
  let sertOccupancy = 0;
  if (drug.id === 'sertraline') {
    const ed50 = 4.5;
    sertOccupancy = Math.min(88, Math.round((85 * rx.doseMg) / (ed50 + rx.doseMg)));
  } else if (drug.id === 'escitalopram') {
    const ed50 = 1.3;
    sertOccupancy = Math.min(88, Math.round((85 * rx.doseMg) / (ed50 + rx.doseMg)));
  }

  const alerts: string[] = [];
  if (d2Model) {
    if (d2Model.pharmacologicClass === 'partial_agonist') {
      alerts.push(`Aripiprazol (częściowy agonista D2): wysokie occupancy (~${d2Occupancy}%) wynika z wysokiego powinowactwa, lecz obecność aktywności wewnętrznej (~30%) zmienia profil tolerancji. Klasyczna heurystyka Kapura 65–80% NIE ma zastosowania; akatyzja pozostaje istotnym ryzykiem klinicznym.`);
    } else if (d2Occupancy > 80) {
      alerts.push(`Wysycenie receptorów D2 wynosi szacunkowo ~${d2Occupancy}% (>80% heurystyka Kapura dla antagonistów). Zwiększone prawdopodobieństwo objawów pozapiramidowych (EPS) i hiperprolaktynemii.`);
    } else if (d2Occupancy >= 65 && d2Occupancy <= 80) {
      alerts.push(`Wysycenie receptorów D2 w optymalnym oknie terapeutycznym (historyczna heurystyka Kapura 65–80%) dla czystych antagonistów.`);
    }
  }

  if (drug.id === 'lithium') {
    if (patient.labEgfr < 60) {
      alerts.push('Ryzyko kumulacji i toksyczności (obniżony eGFR <60 ml/min): Zmniejszony klirens nerkowy litu. Wymagany ścisły monitoring TDM (12h po dawce).');
    } else {
      alerts.push('Wskazana rutynowa kontrola stężenia litu 12 h po dawce (zakres terapeutyczny wg AGNP: 0,6–0,8 mmol/l).');
    }
  }

  if (drug.primaryCyp.includes('CYP1A2')) {
    if (patient.substanceUse === 'zaprzestanie_palenia') {
      alerts.push('Zaprzestanie palenia tytoniu (deindukcja CYP1A2): opisywany w literaturze wzrost stężenia o 50–100% (duża zmienność osobnicza; wymagane pilne monitorowanie TDM; stan zapalny/infekcja może dodatkowo obniżać klirens).');
    } else if (patient.substanceUse === 'tyton') {
      alerts.push('Aktywne palenie tytoniu: węglowodory aromatyczne dymu indukują CYP1A2, obniżając stężenie o ~50%.');
    }
  }

  return {
    drug,
    prescribedDose: rx.doseMg,
    effectiveDose: Math.round(effectiveDose),
    exposureTendency,
    exposureExplanation,
    estimatedCss,
    sertOccupancyPercent: sertOccupancy,
    d2OccupancyPercent: d2Occupancy,
    d2Model,
    evidenceCategory: d2Model ? 'PET measured' : drug.petOccupancyAtDefaultDose ? 'PET measured' : 'PK-derived',
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
