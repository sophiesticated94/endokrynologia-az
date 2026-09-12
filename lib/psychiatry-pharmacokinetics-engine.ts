/**
 * Silnik obliczeniowy farmakokinetyki i receptorologii psychiatrycznej
 * Zgodny z AGNP TDM 2026 Update, PET Kapur / Meyer, CPIC oraz CredibleMeds
 * 
 * Zasada niezmiennika:
 * - NIE generuje fikcyjnych stężeń u indywidualnego pacjenta z dawki/masy/eGFR
 * - TDM opiera się na interpretacji ZMIERZONEGO stężenia w kontekście czasu i kliniki
 * - D2 Explorer jawnie rozdziela antagonistów od częściowych agonistów
 */

// ============================================================================
// 1. TDM LITU: INTERPRETER ZMIERZONEGO STĘŻENIA (TRYB A)
// ============================================================================

export interface MeasuredLithiumSampleInput {
  measuredConcentrationMmolL: number;
  hoursSinceLastDose: number;
  daysOnCurrentRegimen: number;
  indication: 'maintenance' | 'acute_mania' | 'other';
  eGfr?: number;
  sodiumMmolL?: number;
  hydrationLoss?: boolean;
  interactingMedications?: ('thiazide' | 'nsaid' | 'acei_arb' | 'loop_diuretic')[];
  symptoms?: ('fine_tremor' | 'coarse_tremor' | 'ataxia' | 'nausea_vomiting' | 'slurred_speech' | 'confusion')[];
}

export interface LithiumTdmInterpretation {
  sampleStatus: 'valid' | 'questionable_timing' | 'not_steady_state' | 'unreliable';
  sampleStatusRationale: string;
  measuredConcentration: number;
  therapeuticZone: 'subtherapeutic' | 'optimal' | 'elevated_warning' | 'toxic' | 'life_threatening';
  therapeuticZoneLabel: string;
  expectedReferenceRange: string;
  clinicalObservations: string[];
  monitoringRecommendations: string[];
  safetyAlert?: string;
  evidenceId: string;
}

export function interpretMeasuredLithiumTdm(input: MeasuredLithiumSampleInput): LithiumTdmInterpretation {
  const {
    measuredConcentrationMmolL,
    hoursSinceLastDose,
    daysOnCurrentRegimen,
    indication,
    eGfr,
    sodiumMmolL,
    hydrationLoss,
    interactingMedications = [],
    symptoms = [],
  } = input;

  // 1. Weryfikacja interpretowalności próbki
  let sampleStatus: LithiumTdmInterpretation['sampleStatus'] = 'valid';
  let sampleStatusRationale = 'Próbka pobrana prawidłowo w stanie stacjonarnym (ok. 12 h od ostatniej dawki, min. 5 dni na stałej dawce).';

  if (hoursSinceLastDose < 10) {
    sampleStatus = 'questionable_timing';
    sampleStatusRationale = `Próbka pobrana ${hoursSinceLastDose} h po dawce (przed upływem 12 h) przypada na fazę dystrybucji tkanek i może być fałszywie zawyżona.`;
  } else if (hoursSinceLastDose > 14) {
    sampleStatus = 'questionable_timing';
    sampleStatusRationale = `Próbka pobrana ${hoursSinceLastDose} h po dawce (ponad 14 h) może reprezentować stężenie zaniżone przez postępującą eliminację.`;
  }

  if (daysOnCurrentRegimen < 5) {
    sampleStatus = 'not_steady_state';
    sampleStatusRationale = `Pacjent przyjmuje obecną dawkę od ${daysOnCurrentRegimen} dni. Do stanu stacjonarnego (4–5 okresów półtrwania litu) potrzeba co najmniej 5–7 dni.`;
  }

  // 2. Określenie przedziału referencyjnego wg AGNP 2026
  const targetMin = indication === 'acute_mania' ? 0.8 : 0.6;
  const targetMax = indication === 'acute_mania' ? 1.0 : 0.8;
  const expectedReferenceRange = `${targetMin.toFixed(1)} – ${targetMax.toFixed(1)} mmol/l (${indication === 'acute_mania' ? 'ostra mania' : 'profilaktyka/podtrzymanie'})`;

  let therapeuticZone: LithiumTdmInterpretation['therapeuticZone'] = 'optimal';
  let therapeuticZoneLabel = `Stężenie w docelowym oknie terapeutycznym (${expectedReferenceRange})`;

  if (measuredConcentrationMmolL < targetMin) {
    therapeuticZone = 'subtherapeutic';
    therapeuticZoneLabel = `Stężenie subterapeutyczne (<${targetMin} mmol/l)`;
  } else if (measuredConcentrationMmolL > 2.0) {
    therapeuticZone = 'life_threatening';
    therapeuticZoneLabel = 'Zatrucie ciężkie zagrażające życiu (≥2,0 mmol/l)';
  } else if (measuredConcentrationMmolL >= 1.2) {
    therapeuticZone = 'toxic';
    therapeuticZoneLabel = 'Toksyczność litu (≥1,2 mmol/l)';
  } else if (measuredConcentrationMmolL > targetMax) {
    therapeuticZone = 'elevated_warning';
    therapeuticZoneLabel = `Stężenie powyżej okna podtrzymującego (${targetMax}–1,2 mmol/l)`;
  }

  // 3. Obserwacje kliniczne i interakcje
  const observations: string[] = [];
  const recommendations: string[] = [];
  let safetyAlert: string | undefined;

  if (interactingMedications.includes('thiazide')) {
    observations.push('Tiazydy (np. hydrochlorotiazyd): redukują klirens nerkowy litu o 25–50% przez wzrost reabsorpcji sodu i litu w cewce bliższej.');
  }
  if (interactingMedications.includes('nsaid')) {
    observations.push('NLPZ (np. ibuprofen, ketoprofen): hamują syntezę prostaglandyn nerkowych, obniżając filtrację litu (wzrost stężenia o 10–40%).');
  }
  if (interactingMedications.includes('acei_arb')) {
    observations.push('Inhibitory ACE / ARB: mogą wywołać spadek GFR i skumulować stężenie litu.');
  }
  if (hydrationLoss) {
    observations.push('Odwodnienie / utrata płynów (gorączka, biegunka): wywołuje aktywację układu RAA i retencję litu w nerkach.');
  }
  if (sodiumMmolL !== undefined && sodiumMmolL < 135) {
    observations.push(`Hiponatremia (Na+ ${sodiumMmolL} mmol/l): kompensacyjny wychwyt kationów sodowo-litowych w kanalikach proksymalnych.`);
  }
  if (eGfr !== undefined && eGfr < 60) {
    observations.push(`Obniżony eGFR (${eGfr} ml/min/1.73m²): wydłużony klirens nerkowy litu i większa podatność na kumulację.`);
  }

  // Objawy toksyczności
  const severeSymptoms = symptoms.filter(s => ['ataxia', 'coarse_tremor', 'slurred_speech', 'confusion'].includes(s));
  if (severeSymptoms.length > 0 || therapeuticZone === 'toxic' || therapeuticZone === 'life_threatening') {
    safetyAlert = 'ALARM BEZPIECZEŃSTWA: Podejrzenie zatrucia litem. Wstrzymaj podawanie leku, zabezpiecz intensywne nawadnianie 0,9% NaCl i rozważ pilną kwalifikację do hemodializy (przy stężeniu >4,0 mmol/l lub >2,5 mmol/l z ciężkimi objawami).';
    recommendations.push('Natychmiastowe wstrzymanie dawek litu do czasu ustąpienia objawów i normalizacji stężenia.');
    recommendations.push('Pilne powtórzenie stężenia litu, elektrolitów, kreatyniny i gazometrii.');
  } else {
    recommendations.push('Oceniaj odpowiedź kliniczną łącznie ze stanem psychicznym pacjenta, a nie wyłącznie samą liczbę.');
    recommendations.push('Zaplanuj rutynową kontrolę TDM, eGFR i TSH za 3–6 miesięcy u pacjenta stabilnego.');
  }

  return {
    sampleStatus,
    sampleStatusRationale,
    measuredConcentration: measuredConcentrationMmolL,
    therapeuticZone,
    therapeuticZoneLabel,
    expectedReferenceRange,
    clinicalObservations: observations,
    monitoringRecommendations: recommendations,
    safetyAlert,
    evidenceId: 'lithium-tdm-window',
  };
}

// ============================================================================
// 2. JAKOŚCIOWY MODEL WRAŻLIWOŚCI PK LITU (TRYB B)
// ============================================================================

export interface LithiumPkSensitivityInput {
  eGfr: number;
  volumeStatus: 'euvolemia' | 'mild_dehydration' | 'severe_dehydration';
  interactingDrugs: ('thiazide' | 'nsaid' | 'acei_arb')[];
}

export interface LithiumPkSensitivityOutput {
  exposureTrend: 'baseline' | 'slight_increase' | 'moderate_increase' | 'marked_increase';
  trendDescription: string;
  mechanisms: string[];
  disclaimer: string;
  evidenceId: string;
}

export function evaluateLithiumPkSensitivity(input: LithiumPkSensitivityInput): LithiumPkSensitivityOutput {
  const { eGfr, volumeStatus, interactingDrugs } = input;
  const mechanisms: string[] = [];

  let riskScore = 0;
  if (eGfr < 30) {
    riskScore += 3;
    mechanisms.push('Ciężka dysfunkcja nerek (eGFR <30): znaczne załamanie klirensu litu.');
  } else if (eGfr < 60) {
    riskScore += 2;
    mechanisms.push('Umiarkowana niewydolność nerek (eGFR 30–59): wydłużenie okresu półtrwania litu.');
  }

  if (volumeStatus === 'severe_dehydration') {
    riskScore += 3;
    mechanisms.push('Ciężkie odwodnienie: maksymalna aktywacja wchłaniania zwrotnego w kanalikach nerkowych.');
  } else if (volumeStatus === 'mild_dehydration') {
    riskScore += 1;
    mechanisms.push('Niewielki deficyt płynowy: tendencja do podwyższenia stężenia.');
  }

  if (interactingDrugs.includes('thiazide')) {
    riskScore += 3;
    mechanisms.push('Tiazyd: bezpośrednie zaburzenie wydalania litu w nerkach.');
  }
  if (interactingDrugs.includes('nsaid')) {
    riskScore += 1;
    mechanisms.push('NLPZ: spadek filtracji kłębuszkowej poprzez spadek prostaglandyn nerkowych.');
  }
  if (interactingDrugs.includes('acei_arb')) {
    riskScore += 1;
    mechanisms.push('ACEI/ARB: możliwy spadek ciśnienia filtracji kłębuszkowej.');
  }

  let exposureTrend: LithiumPkSensitivityOutput['exposureTrend'] = 'baseline';
  let trendDescription = 'Typowa ekspozycja przy prawidłowym klirensie i nawodnieniu.';

  if (riskScore >= 5) {
    exposureTrend = 'marked_increase';
    trendDescription = 'Bardzo silny kierunek ku kumulacji litu i intoksykacji! Zdecydowanie zalecana redukcja dawki i ścisły TDM.';
  } else if (riskScore >= 3) {
    exposureTrend = 'moderate_increase';
    trendDescription = 'Istotna tendencja do wzrostu ekspozycji (możliwy skok stężenia o 30–60%).';
  } else if (riskScore >= 1) {
    exposureTrend = 'slight_increase';
    trendDescription = 'Niewielka tendencja do wzrostu stężenia; wymaga ostrożności.';
  }

  return {
    exposureTrend,
    trendDescription,
    mechanisms,
    disclaimer: 'MODEL EDUKACYJNY — NIE JEST KALKULATOREM STĘŻENIA U KONKRETNEGO PACJENTA.',
    evidenceId: 'lithium-pk-sensitivity',
  };
}

// ============================================================================
// 3. D2 PET EVIDENCE EXPLORER
// ============================================================================

export interface D2DrugEvidenceProfile {
  id: string;
  name: string;
  pharmacologicClass: 'antagonist' | 'partial_agonist';
  intrinsicActivityPercent: number; // 0% dla czystych antagonistów, ~30-60% dla częściowych
  ed50Mg: number;
  studyDoseRange: string;
  petStudy: string;
  receptorFingerprint: {
    d2Ki: number;
    d3Ki: number;
    ht2aKi: number;
    ht1aKi: number;
    h1Ki: number;
    m1Ki: number;
    alpha1Ki: number;
  };
}

export const D2_DRUGS_EVIDENCE: Record<string, D2DrugEvidenceProfile> = {
  haloperidol: {
    id: 'haloperidol',
    name: 'Haloperidol',
    pharmacologicClass: 'antagonist',
    intrinsicActivityPercent: 0,
    ed50Mg: 1.6,
    studyDoseRange: '1 – 10 mg/d',
    petStudy: 'Kapur et al. 2000 (Am J Psychiatry)',
    receptorFingerprint: { d2Ki: 1.2, d3Ki: 2.1, ht2aKi: 54, ht1aKi: 1900, h1Ki: 440, m1Ki: 10000, alpha1Ki: 6.0 },
  },
  risperidone: {
    id: 'risperidone',
    name: 'Risperidon',
    pharmacologicClass: 'antagonist',
    intrinsicActivityPercent: 0,
    ed50Mg: 1.4,
    studyDoseRange: '1 – 6 mg/d',
    petStudy: 'Nyberg et al. 1999 / Kapur 2000',
    receptorFingerprint: { d2Ki: 3.8, d3Ki: 5.2, ht2aKi: 0.17, ht1aKi: 420, h1Ki: 20, m1Ki: 10000, alpha1Ki: 2.7 },
  },
  olanzapine: {
    id: 'olanzapine',
    name: 'Olanzapina',
    pharmacologicClass: 'antagonist',
    intrinsicActivityPercent: 0,
    ed50Mg: 7.2,
    studyDoseRange: '5 – 20 mg/d',
    petStudy: 'Kapur et al. 1999 (Arch Gen Psychiatry)',
    receptorFingerprint: { d2Ki: 11, d3Ki: 27, ht2aKi: 4.0, ht1aKi: 2300, h1Ki: 0.08, m1Ki: 26, alpha1Ki: 19 },
  },
  aripiprazole: {
    id: 'aripiprazole',
    name: 'Aripiprazol',
    pharmacologicClass: 'partial_agonist',
    intrinsicActivityPercent: 30,
    ed50Mg: 3.5,
    studyDoseRange: '5 – 30 mg/d',
    petStudy: 'Yokoi et al. 2002 / Grunder et al. 2008',
    receptorFingerprint: { d2Ki: 0.7, d3Ki: 0.8, ht2aKi: 3.4, ht1aKi: 5.6, h1Ki: 61, m1Ki: 10000, alpha1Ki: 26 },
  },
  quetiapine: {
    id: 'quetiapine',
    name: 'Kwetiapina',
    pharmacologicClass: 'antagonist',
    intrinsicActivityPercent: 0,
    ed50Mg: 180,
    studyDoseRange: '150 – 800 mg/d',
    petStudy: 'Gefvert et al. 2001 / Kapur 2000',
    receptorFingerprint: { d2Ki: 160, d3Ki: 340, ht2aKi: 100, ht1aKi: 390, h1Ki: 11, m1Ki: 120, alpha1Ki: 22 },
  },
};

export interface D2OccupancyModel {
  drugId: string;
  drugName: string;
  doseMg: number;
  d2OccupancyPercent: number;
  pharmacologicClass: 'antagonist' | 'partial_agonist';
  intrinsicActivityPercent: number;
  heuristicZone: 'below_heuristic' | 'within_kapur_heuristic' | 'above_heuristic';
  clinicalInterpretation: string;
  prolactinTendency: 'low' | 'moderate' | 'high';
  limitationNote: string;
  evidenceSource: string;
}

export function calculateD2Occupancy(drugId: string, doseMg: number): D2OccupancyModel {
  const drug = D2_DRUGS_EVIDENCE[drugId] || D2_DRUGS_EVIDENCE.risperidone;
  const safeDose = Math.max(0, doseMg);
  const occupancy = safeDose > 0 ? (safeDose / (drug.ed50Mg + safeDose)) * 100 : 0;
  const roundedOcc = Math.min(96, Math.round(occupancy));

  let heuristicZone: D2OccupancyModel['heuristicZone'] = 'within_kapur_heuristic';
  let clinicalInterpretation = '';

  if (drug.pharmacologicClass === 'partial_agonist') {
    heuristicZone = roundedOcc >= 75 ? 'within_kapur_heuristic' : 'below_heuristic';
    clinicalInterpretation = `Aripiprazol (częściowy agonista): occupancy ~${roundedOcc}%. Dzięki aktywności wewnętrznej (~30%) nie znosi całkowicie transmisji dopaminergicznej, co chroni przed EPS i hiperprolaktynemią nawet przy occupancy >80%.`;
  } else {
    if (roundedOcc < 65) {
      heuristicZone = 'below_heuristic';
      clinicalInterpretation = `Occupancy D2 ~${roundedOcc}% (<65%): Poniżej historycznej heurystyki z badań PET dla pełnej kontroli objawów wytwórczych u większości chorych.`;
    } else if (roundedOcc <= 80) {
      heuristicZone = 'within_kapur_heuristic';
      clinicalInterpretation = `Occupancy D2 ~${roundedOcc}% (65–80%): Historyczny przedział optymalnej odpowiedzi dla antagonistów FGA/SGA bez gwałtownego wzrostu objawów pozapiramidowych.`;
    } else {
      heuristicZone = 'above_heuristic';
      clinicalInterpretation = `Occupancy D2 ~${roundedOcc}% (>80%): W badaniach PET wiąże się ze statystycznym skokiem ryzyka parkinsonizmu polekowego i akatyzji dla czystych antagonistów.`;
    }
  }

  const prolactinTendency = drug.id === 'aripiprazole' ? 'low' : drug.id === 'quetiapine' ? 'low' : drug.id === 'olanzapine' ? 'moderate' : 'high';

  return {
    drugId: drug.id,
    drugName: drug.name,
    doseMg: safeDose,
    d2OccupancyPercent: roundedOcc,
    pharmacologicClass: drug.pharmacologicClass,
    intrinsicActivityPercent: drug.intrinsicActivityPercent,
    heuristicZone,
    clinicalInterpretation,
    prolactinTendency,
    limitationNote: 'Model oparty na dopasowaniu danych populacyjnych PET; rzeczywiste stężenie i occupancy zależą od polimorfizmu CYP, wchłaniania i interakcji.',
    evidenceSource: drug.petStudy,
  };
}

// ============================================================================
// 4. KOREKCJA QTc (FRIDERICIA) Z KONTEKSTEM RYZYKA
// ============================================================================

export interface QtcEvaluationInput {
  rawQtMs: number;
  heartRateBpm: number;
  isFemale?: boolean;
  potassiumMmolL?: number;
  magnesiumMmolL?: number;
  concurrentQtDrugs?: string[];
  cypInhibitorPresent?: boolean;
}

export interface QtcRiskAssessment {
  rawQtMs: number;
  heartRateBpm: number;
  calculatedQtcMs: number;
  method: 'Fridericia (QTcF)';
  riskCategory: 'normal' | 'borderline' | 'prolonged' | 'critical';
  riskFactorsIdentified: string[];
  missingClinicalContext: string[];
  actionRecommendation: string;
}

export function evaluateQtcRisk(input: QtcEvaluationInput | number, legacyHr?: number, legacyIsFemale?: boolean): QtcRiskAssessment {
  let rawQt: number;
  let hr: number;
  let isFemale = false;
  let potassium: number | undefined;
  let magnesium: number | undefined;
  let concurrentQtDrugs: string[] = [];
  let cypInhibitorPresent = false;

  if (typeof input === 'number') {
    rawQt = input;
    hr = legacyHr || 70;
    isFemale = Boolean(legacyIsFemale);
  } else {
    rawQt = input.rawQtMs;
    hr = input.heartRateBpm;
    isFemale = Boolean(input.isFemale);
    potassium = input.potassiumMmolL;
    magnesium = input.magnesiumMmolL;
    concurrentQtDrugs = input.concurrentQtDrugs || [];
    cypInhibitorPresent = Boolean(input.cypInhibitorPresent);
  }

  const safeHr = Math.max(30, Math.min(220, hr || 70));
  const safeQt = Math.max(200, Math.min(750, rawQt || 400));
  const rrSeconds = 60 / safeHr;
  const calculatedQtcMs = Math.round(safeQt / Math.cbrt(rrSeconds));

  const upperNormal = isFemale ? 460 : 450;
  const prolongedThreshold = isFemale ? 470 : 460;

  let riskCategory: QtcRiskAssessment['riskCategory'] = 'normal';
  if (calculatedQtcMs >= 500) {
    riskCategory = 'critical';
  } else if (calculatedQtcMs >= prolongedThreshold) {
    riskCategory = 'prolonged';
  } else if (calculatedQtcMs >= upperNormal) {
    riskCategory = 'borderline';
  }

  const riskFactors: string[] = [];
  const missingContext: string[] = [];

  if (potassium !== undefined) {
    if (potassium < 3.5) riskFactors.push(`Hipokaliemia (${potassium} mmol/l) — krytyczny czynnik torsade de pointes`);
  } else {
    missingContext.push('Brak aktualnego stężenia potasu (K+)');
  }

  if (magnesium !== undefined) {
    if (magnesium < 0.7) riskFactors.push(`Hipomagnezemia (${magnesium} mmol/l)`);
  } else {
    missingContext.push('Brak stężenia magnezu (Mg2+)');
  }

  if (safeHr < 55) riskFactors.push(`Bradykardia (${safeHr}/min) sprzyja wczesnym potencjałom następczym (EAD)`);
  if (concurrentQtDrugs.length > 0) riskFactors.push(`Jednoczesne leki wydłużające QT (${concurrentQtDrugs.join(', ')})`);
  if (cypInhibitorPresent) riskFactors.push('Obecny silny inhibitor CYP zwiększający ekspozycję na lek');

  let actionRecommendation = 'QTcF w zakresie normy. Monitoruj elektrolity i EKG przy zmianie leczenia.';
  if (riskCategory === 'critical') {
    actionRecommendation = 'KRYTYCZNE wydłużenie QTc (≥500 ms). Wstrzymaj/zredukuj lek, uzupełnij K+ (cel >4,0 mmol/l) i Mg2+ (>0,8 mmol/l), wdrożenie telemetrii.';
  } else if (riskCategory === 'prolonged') {
    actionRecommendation = 'Wydłużone QTc. Rozważ zamianę na lek o minimalnym wpływie na hERG (np. arypiprazol, lurasidon, wortioksetyna).';
  } else if (riskCategory === 'borderline') {
    actionRecommendation = 'Wartość graniczna. Zachowaj szczególną ostrożność przed dołączeniem drugiego leku kardiotoksycznego.';
  }

  return {
    rawQtMs: safeQt,
    heartRateBpm: safeHr,
    calculatedQtcMs,
    method: 'Fridericia (QTcF)',
    riskCategory,
    riskFactorsIdentified: riskFactors,
    missingClinicalContext: missingContext,
    actionRecommendation,
  };
}
