export type WhoGrading = 'NET G1' | 'NET G2' | 'NET G3' | 'NEC G3 (wielko/drobnokomórkowy)';
export type KrenningScore = 0 | 1 | 2 | 3 | 4;
export type RetRiskCategory = 'Highest (HST)' | 'High (H)' | 'Moderate (MOD)' | 'Brak mutacji';
export type MenSyndromeType = 'MEN1' | 'MEN2A' | 'MEN2B' | 'MEN4' | 'VHL' | 'NF1' | 'Sporadyczny';
export type PrrtKidneyRisk = 'Niskie' | 'Umiarkowane' | 'Wysokie' | 'Przekroczony limit';

export interface NenSimulatorState {
  activeTab: 'staging' | 'genetics' | 'prrt';
  // Tab 1: Staging & WHO
  primarySite: 'midgut' | 'pancreas' | 'lung' | 'appendix' | 'stomach';
  ki67Percent: number;
  mitoticCount: number;
  hasNecrosis: boolean;
  sstrKrenning: KrenningScore;
  fdgUptake: boolean;
  cgaValue: number; // ng/ml (norm < 100)
  hiaa5Value: number; // mg/24h (norm < 8)

  // Tab 2: Genetics & MEN
  selectedGenetics: MenSyndromeType;
  retCodon: 'M918T' | 'C634' | 'C618' | 'C609' | 'none';
  hasPheo: boolean;
  hasPhpt: boolean;
  hasPituitary: boolean;
  hasPnet: boolean;
  patientAgeYears: number;

  // Tab 3: PRRT & Systemic
  prrtCyclesCompleted: number; // 0 to 6
  prrtDosePerCycleGbq: number; // typically 7.4
  baselineGfr: number; // ml/min
  aminoAcidProtection: boolean;
  octreotidePremedication: boolean;
  captemActive: boolean;
  mgmtDeficient: boolean;
  plannedSurgery: boolean;
}

export interface CalculatedNenMetrics {
  whoGrade: WhoGrading;
  isPoorlyDifferentiated: boolean;
  prrtEligible: boolean;
  prrtEligibilityReason: string;
  retRiskCategory: RetRiskCategory;
  recommendedThyroidectomyAge: string;
  surgeryPriorityAlert: string | null;
  cumulativeKidneyDoseGy: number;
  kidneyToleranceLimitGy: number;
  kidneyRisk: PrrtKidneyRisk;
  carcinoidCrisisRisk: 'Niskie' | 'Umiarkowane' | 'Krytyczne';
  captemResponseRatePercent: number;
  safetyAlerts: string[];
  clinicalRecommendation: string;
}

export const initialNenState: NenSimulatorState = {
  activeTab: 'staging',
  primarySite: 'midgut',
  ki67Percent: 1.8,
  mitoticCount: 1,
  hasNecrosis: false,
  sstrKrenning: 4,
  fdgUptake: false,
  cgaValue: 240,
  hiaa5Value: 28,

  selectedGenetics: 'Sporadyczny',
  retCodon: 'none',
  hasPheo: false,
  hasPhpt: false,
  hasPituitary: false,
  hasPnet: false,
  patientAgeYears: 58,

  prrtCyclesCompleted: 0,
  prrtDosePerCycleGbq: 7.4,
  baselineGfr: 85,
  aminoAcidProtection: true,
  octreotidePremedication: true,
  captemActive: false,
  mgmtDeficient: true,
  plannedSurgery: false,
};

export function calculateNenState(state: NenSimulatorState): CalculatedNenMetrics {
  const safetyAlerts: string[] = [];

  // 1. Staging WHO 2022/2024
  let whoGrade: WhoGrading = 'NET G1';
  let isPoorlyDifferentiated = false;

  if (state.hasNecrosis || state.ki67Percent > 55) {
    whoGrade = 'NEC G3 (wielko/drobnokomórkowy)';
    isPoorlyDifferentiated = true;
  } else if (state.ki67Percent > 20 || state.mitoticCount > 20) {
    whoGrade = 'NET G3';
  } else if (state.ki67Percent >= 3 || state.mitoticCount >= 2) {
    whoGrade = 'NET G2';
  } else {
    whoGrade = 'NET G1';
  }

  // Dual-tracer mismatch check
  if (state.sstrKrenning <= 1 && state.fdgUptake) {
    safetyAlerts.push('Fenotyp odróżnicowania (SSTR- / FDG+): komórki utraciły ekspresję receptorów SSTR2, wskazana chemioterapia systemowa zamiast PRRT/SSA.');
  }

  // 2. PRRT Eligibility
  let prrtEligible = false;
  let prrtEligibilityReason = '';
  if (isPoorlyDifferentiated) {
    prrtEligible = false;
    prrtEligibilityReason = 'Dyskwalifikacja: rak słabo zróżnicowany (NEC G3) wymaga chemioterapii opartej na pochodnych platyny.';
  } else if (state.sstrKrenning < 3) {
    prrtEligible = false;
    prrtEligibilityReason = `Wychwyt w skali Krenninga (${state.sstrKrenning}) nie przewyższa wątroby (wymagany stopień 3 lub 4).`;
  } else if (state.baselineGfr < 40) {
    prrtEligible = false;
    prrtEligibilityReason = `Ciężka niewydolność nerek (eGFR ${state.baselineGfr} ml/min < 40 ml/min) uniemożliwia bezpieczne podanie 177Lu-DOTATATE.`;
  } else {
    prrtEligible = true;
    prrtEligibilityReason = 'Kwalifikuje się: wysoka ekspresja SSTR2 (Krenning 3–4), zachowana funkcja nerek i zróżnicowanie NET.';
  }

  // 3. RET & Genetics analysis
  let retRiskCategory: RetRiskCategory = 'Brak mutacji';
  let recommendedThyroidectomyAge = 'Nie dotyczy';

  if (state.retCodon === 'M918T') {
    retRiskCategory = 'Highest (HST)';
    recommendedThyroidectomyAge = 'Pilna tyroidectomia w 1. roku życia (pierwsze miesiące życia)';
  } else if (state.retCodon === 'C634') {
    retRiskCategory = 'High (H)';
    recommendedThyroidectomyAge = 'Profilaktyczna tyroidectomia przed 5. rokiem życia';
  } else if (['C618', 'C609'].includes(state.retCodon)) {
    retRiskCategory = 'Moderate (MOD)';
    recommendedThyroidectomyAge = 'W dzieciństwie / wczesnej młodości w zależności od dynamiki kalcytoniny';
  }

  let surgeryPriorityAlert: string | null = null;
  if (state.hasPheo && state.hasPhpt) {
    surgeryPriorityAlert = 'KRYTYCZNA KOLEJNOŚĆ: Bezwzględnie wyciąć guz chromochłonny (Pheo) PRZED operacją przytarczyc lub tarczycy!';
    safetyAlerts.push(surgeryPriorityAlert);
  } else if (state.hasPheo) {
    surgeryPriorityAlert = 'Guz chromochłonny musi być zoperowany przed jakąkolwiek inną procedurą chirurgiczną.';
    safetyAlerts.push(surgeryPriorityAlert);
  }

  // 4. PRRT Dosimetry & Kidney limits
  const kidneyToleranceLimitGy = state.aminoAcidProtection ? 28 : 23;
  // Each 7.4 GBq cycle delivers approx 4.5 Gy with protection, 6.2 Gy without
  const dosePerCycleGy = state.aminoAcidProtection ? 4.6 : 6.4;
  // Reduced GFR impairs clearance and increases residence time
  const gfrFactor = state.baselineGfr < 60 ? 1.25 : 1.0;
  const cumulativeKidneyDoseGy = Math.round(state.prrtCyclesCompleted * dosePerCycleGy * gfrFactor * 10) / 10;

  let kidneyRisk: PrrtKidneyRisk = 'Niskie';
  if (cumulativeKidneyDoseGy >= kidneyToleranceLimitGy) {
    kidneyRisk = 'Przekroczony limit';
    safetyAlerts.push(`Limit dawki nerkowej (${cumulativeKidneyDoseGy} Gy >= ${kidneyToleranceLimitGy} Gy) PRZEKROCZONY! Ryzyko schyłkowej nefropatii popromiennej.`);
  } else if (cumulativeKidneyDoseGy >= kidneyToleranceLimitGy * 0.8) {
    kidneyRisk = 'Wysokie';
    safetyAlerts.push('Dawka nerkowa zbliża się do progu tolerancji (>80% limitu). Rozważ redukcję aktywności radiopeptydu.');
  } else if (cumulativeKidneyDoseGy >= kidneyToleranceLimitGy * 0.5) {
    kidneyRisk = 'Umiarkowane';
  }

  // 5. Carcinoid crisis risk
  let carcinoidCrisisRisk: 'Niskie' | 'Umiarkowane' | 'Krytyczne' = 'Niskie';
  if (state.plannedSurgery && !state.octreotidePremedication && (state.hiaa5Value > 30 || state.primarySite === 'midgut')) {
    carcinoidCrisisRisk = 'Krytyczne';
    safetyAlerts.push('ZAGROŻENIE PRZEŁOMEM RAKOWIAKA: Planowana operacja bez wlewu oktreotydu! Bezwzględnie wdrożyć wlew i.v. 50–100 µg/h.');
  } else if (state.plannedSurgery && state.octreotidePremedication) {
    carcinoidCrisisRisk = 'Niskie';
  } else if (state.hiaa5Value > 50) {
    carcinoidCrisisRisk = 'Umiarkowane';
  }

  // 6. CAPTEM response rate
  let captemResponseRatePercent = 25;
  if (state.mgmtDeficient && whoGrade !== 'NET G1') {
    captemResponseRatePercent = 65; // High response in MGMT-deficient NET G2/G3
  } else if (!state.mgmtDeficient) {
    captemResponseRatePercent = 18;
  }

  // Summary message
  let clinicalRecommendation = '';
  if (whoGrade === 'NET G1') {
    clinicalRecommendation = 'NET G1: Przebieg powolny. Leczenie pierwszego rzutu to analogi somatostatyny (SSA) lub obserwacja przy małych ogniskach.';
  } else if (whoGrade === 'NET G2') {
    clinicalRecommendation = 'NET G2: Terapia SSA, w razie progresji PRRT (177Lu-DOTATATE) lub leki celowane (sunitynib / ewerolimus / CAPTEM).';
  } else if (whoGrade === 'NET G3') {
    clinicalRecommendation = 'NET G3 (dobrze zróżnicowany): Zachowane szlaki p53/Rb, wysoka wrażliwość na CAPTEM lub PRRT. Unikać schematów platynowych.';
  } else {
    clinicalRecommendation = 'NEC G3 (słabo zróżnicowany): Wysoka złośliwość, inaktywacja TP53/RB1. Wskazana pilna chemioterapia platynowa (cisplatyna + etopozyd).';
  }

  return {
    whoGrade,
    isPoorlyDifferentiated,
    prrtEligible,
    prrtEligibilityReason,
    retRiskCategory,
    recommendedThyroidectomyAge,
    surgeryPriorityAlert,
    cumulativeKidneyDoseGy,
    kidneyToleranceLimitGy,
    kidneyRisk,
    carcinoidCrisisRisk,
    captemResponseRatePercent,
    safetyAlerts,
    clinicalRecommendation,
  };
}

export interface NenPreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  state: Partial<NenSimulatorState>;
}

export const NEN_PRESETS: NenPreset[] = [
  {
    id: 'midgut_net_g1_stable',
    name: 'Stabilny rakowiak jelita krętego (NET G1)',
    badge: 'Midgut G1',
    description: 'Typowy guz jelita krętego z przerzutami do wątroby, Ki-67 1,8%, wysoki wychwyt SSTR2 (Krenning 4). Kontrola na analogu somatostatyny.',
    state: {
      activeTab: 'staging',
      primarySite: 'midgut',
      ki67Percent: 1.8,
      mitoticCount: 1,
      hasNecrosis: false,
      sstrKrenning: 4,
      fdgUptake: false,
      cgaValue: 240,
      hiaa5Value: 24,
    },
  },
  {
    id: 'pnet_g2_captem',
    name: 'Zaawansowany guz trzustki pNET G2 na schemacie CAPTEM',
    badge: 'CAPTEM',
    description: 'Progresja po SSA w guzie trzustki o Ki-67 14%. Niedobór MGMT w biopsji warunkuje wysoką odpowiedź na kapecytabinę z temozolomidem (65%).',
    state: {
      activeTab: 'staging',
      primarySite: 'pancreas',
      ki67Percent: 14,
      mitoticCount: 6,
      hasNecrosis: false,
      sstrKrenning: 3,
      fdgUptake: true,
      captemActive: true,
      mgmtDeficient: true,
    },
  },
  {
    id: 'men1_classical_3p',
    name: 'Klasyczny zespół MEN1 (3P: przytarczyce, trzustka, przysadka)',
    badge: 'Genetyka MEN1',
    description: '34-letni chory z mnogimi gastrinoma w ścianie dwunastnicy, hiperkalcemią w przebiegu PHPT oraz makrogruczolakiem prolaktynowym.',
    state: {
      activeTab: 'genetics',
      selectedGenetics: 'MEN1',
      hasPhpt: true,
      hasPituitary: true,
      hasPnet: true,
      patientAgeYears: 34,
      primarySite: 'pancreas',
    },
  },
  {
    id: 'men2a_pheo_mtc',
    name: 'Zespół MEN2A: guz chromochłonny i rak rdzeniasty (mutacja C634)',
    badge: 'MEN2A / RET',
    description: 'Współistnienie obustronnego Pheo i raka rdzeniastego tarczycy (MTC). KRYTYCZNA zasada: adrenalektomia musi bezwzględnie poprzedzać tyroidectomię.',
    state: {
      activeTab: 'genetics',
      selectedGenetics: 'MEN2A',
      retCodon: 'C634',
      hasPheo: true,
      hasPhpt: true,
      patientAgeYears: 28,
    },
  },
  {
    id: 'men2b_infant_m918t',
    name: 'Zespół MEN2B u niemowlęcia (mutacja M918T — ATA Highest Risk)',
    badge: 'MEN2B / Pilne',
    description: 'Niemowlę z fenotypem marfanoidalnym i nerwiakami języka. Mutacja M918T wymaga natychmiastowej tyroidectomii w 1. roku życia.',
    state: {
      activeTab: 'genetics',
      selectedGenetics: 'MEN2B',
      retCodon: 'M918T',
      hasPheo: false,
      hasPhpt: false,
      patientAgeYears: 1,
    },
  },
  {
    id: 'carcinoid_crisis_risk',
    name: 'Zagrożenie przełomem rakowiaka (operacja bez osłony SSA)',
    badge: 'Stan nagły',
    description: 'Planowana resekcja guza midgut z wysokim stężeniem 5-HIAA bez wdrożonego wlewu oktreotydu — bezpośrednie ryzyko śmiertelnej zapaści.',
    state: {
      activeTab: 'prrt',
      primarySite: 'midgut',
      hiaa5Value: 95,
      plannedSurgery: true,
      octreotidePremedication: false,
    },
  },
  {
    id: 'prrt_kidney_limit_warning',
    name: 'Przekroczony limit dawki nerkowej w PRRT (> 28 Gy)',
    badge: 'Dozymetria PRRT',
    description: 'Chory po 6 cyklach 177Lu-DOTATATE przy wyjściowym eGFR 55 ml/min — skumulowana dawka na nerki osiąga poziom nefrotoksyczny.',
    state: {
      activeTab: 'prrt',
      prrtCyclesCompleted: 6,
      baselineGfr: 55,
      aminoAcidProtection: true,
      sstrKrenning: 4,
    },
  },
  {
    id: 'lung_lcnec_g3',
    name: 'Wielkokomórkowy rak neuroendokrynny płuca (LCNEC G3)',
    badge: 'Płuco NEC G3',
    description: 'Guz płuca o Ki-67 75% z rozległą martwicą. Utrata SSTR2, wysoki wychwyt FDG, wskazanie do chemioterapii cisplatyną z etopozydem.',
    state: {
      activeTab: 'staging',
      primarySite: 'lung',
      ki67Percent: 75,
      mitoticCount: 45,
      hasNecrosis: true,
      sstrKrenning: 1,
      fdgUptake: true,
    },
  },
];
