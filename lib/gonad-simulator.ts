// Simulator logic for Gonads & Reproductive Medicine (Module 06)

export interface VermeulenResult {
  freeT_pmol: number;
  freeT_ng_dl: number;
  freeT_percent: number;
  bioavailableT_nmol: number;
  bioavailableT_percent: number;
  fai: number;
}

export function calculateVermeulen(totalT_nmol: number, shbg_nmol: number, alb_g_l: number = 43): VermeulenResult {
  const tMol = Math.max(0.01, totalT_nmol) * 1e-9;
  const shbgMol = Math.max(0.1, shbg_nmol) * 1e-9;
  const albMol = (Math.max(10, alb_g_l) / 66437); // Human serum albumin Mw ~66.4 kDa
  const Ks = 1.0e9; // SHBG association constant (L/mol)
  const Ka = 3.6e4; // Albumin association constant (L/mol)

  const N = 1 + Ka * albMol;
  const a = N * Ks;
  const b = N + Ks * (shbgMol - tMol);
  const c = -tMol;

  const delta = Math.max(0, b * b - 4 * a * c);
  const freeTMol = (-b + Math.sqrt(delta)) / (2 * a);
  const freeT_pmol = freeTMol * 1e12;
  const freeT_ng_dl = (freeT_pmol * 288.42) / 10000; // pmol/L to ng/dL
  const freeT_percent = totalT_nmol > 0 ? (freeTMol / tMol) * 100 : 0;

  const bioMol = freeTMol * (1 + Ka * albMol);
  const bioavailableT_nmol = bioMol * 1e9;
  const bioavailableT_percent = totalT_nmol > 0 ? (bioMol / tMol) * 100 : 0;

  const fai = shbg_nmol > 0 ? (100 * totalT_nmol) / shbg_nmol : 0;

  return {
    freeT_pmol: Math.round(freeT_pmol * 10) / 10,
    freeT_ng_dl: Math.round(freeT_ng_dl * 100) / 100,
    freeT_percent: Math.round(freeT_percent * 100) / 100,
    bioavailableT_nmol: Math.round(bioavailableT_nmol * 10) / 10,
    bioavailableT_percent: Math.round(bioavailableT_percent * 10) / 10,
    fai: Math.round(fai * 10) / 10,
  };
}

export type BiologicalSex = 'male' | 'female';
export type TherapyMode = 'trt' | 'aas' | 'gaht-fem' | 'gaht-masc';
export type IvfTrigger = 'hcg' | 'gnrh_agonist';
export type OhssGrade = 'Brak' | 'Łagodny' | 'Umiarkowany' | 'Ciężki' | 'Krytyczny';

export interface GonadSimulatorState {
  activeTab: 'hpg' | 'therapy' | 'ivf';
  // Tab 1: HPG & Vermeulen
  sex: BiologicalSex;
  totalT: number; // nmol/L (0.5 - 60)
  shbg: number; // nmol/L (5 - 150)
  albumin: number; // g/L (25 - 55)
  gnrhIntervalMinutes: number; // 30 - 240 min (pulse frequency)
  aromataseActivityPercent: number; // 20 - 200% (e.g. inhibited by letrozole or elevated in obesity)
  oralEstrogenLoad: boolean; // increases liver SHBG

  // Tab 2: Therapy & Transition
  therapyMode: TherapyMode;
  medication: string;
  weeklyEquivalentDoseMg: number;
  therapyDurationWeeks: number;
  antiandrogen: 'none' | 'cpa' | 'spiro' | 'gnrh_analog';

  // Tab 3: IVF & OHSS
  afc: number; // Antral follicle count (2 - 50)
  amh: number; // ng/mL (0.1 - 15)
  e2Trigger: number; // pg/mL at trigger (500 - 8000)
  oocytesCount: number; // 0 - 45
  trigger: IvfTrigger;
  freezeAll: boolean;
  cabergolineCoTreatment: boolean;
}

export interface GonadSimulationResult {
  vermeulen: VermeulenResult;
  lh: number; // IU/L
  fsh: number; // IU/L
  estradiol: number; // pg/mL
  hpgSuppressionPercent: number; // 0 - 100%
  spermatogenesisIndex: number; // 0 - 100%
  hematocritPercent: number; // %
  vteRiskFold: number; // x fold baseline
  gynecomastiaScore: 'Brak' | 'Niska' | 'Umiarkowana' | 'Wysoka';
  ohssGrade: OhssGrade;
  ohssScore: number; // 0 - 100
  clinicalComment: string;
  safetyAlerts: string[];
}

export const initialGonadState: GonadSimulatorState = {
  activeTab: 'hpg',
  sex: 'male',
  totalT: 18.5,
  shbg: 32,
  albumin: 44,
  gnrhIntervalMinutes: 90,
  aromataseActivityPercent: 100,
  oralEstrogenLoad: false,

  therapyMode: 'trt',
  medication: 'testosterone_undecanoate',
  weeklyEquivalentDoseMg: 80,
  therapyDurationWeeks: 12,
  antiandrogen: 'none',

  afc: 16,
  amh: 2.8,
  e2Trigger: 2200,
  oocytesCount: 12,
  trigger: 'hcg',
  freezeAll: false,
  cabergolineCoTreatment: false,
};

export function calculateGonadState(state: GonadSimulatorState): GonadSimulationResult {
  const effectiveShbg = state.oralEstrogenLoad ? state.shbg * 1.8 : state.shbg;
  const verm = calculateVermeulen(state.totalT, effectiveShbg, state.albumin);

  // Tab 1: HPG feedback calculation
  // Normal pulse interval ~60-90 min. High frequency (>1 pulse / 60 min) favors LH, low (>120 min) favors FSH.
  // Negative feedback from T/E2.
  const tNorm = state.sex === 'male' ? state.totalT / 20 : state.totalT / 1.2;
  const estroSynthesis = (state.totalT * 2.2 * (state.aromataseActivityPercent / 100)) + (state.sex === 'female' ? 40 : 10);
  const feedbackFactor = Math.max(0.05, 1 + 1.4 * (tNorm - 1) + 0.8 * (estroSynthesis / 30 - 1));

  let baselineLh = state.sex === 'male' ? 4.5 : 6.0;
  let baselineFsh = state.sex === 'male' ? 4.0 : 5.5;

  if (state.gnrhIntervalMinutes < 70) {
    baselineLh *= 1.4; // fast GnRH pulses favor LH beta subunit
    baselineFsh *= 0.8;
  } else if (state.gnrhIntervalMinutes > 120) {
    baselineLh *= 0.6;
    baselineFsh *= 1.5; // slow GnRH pulses favor FSH beta subunit
  }

  let computedLh = Math.max(0.1, Math.round((baselineLh / feedbackFactor) * 10) / 10);
  let computedFsh = Math.max(0.1, Math.round((baselineFsh / feedbackFactor) * 10) / 10);
  let computedE2 = Math.round(estroSynthesis);

  // Tab 2: Therapy & Transition logic
  let hpgSuppression = 0;
  let computedHct = state.sex === 'male' ? 45 : 40;
  let computedVte = 1.0;
  let gynecomastiaScore: 'Brak' | 'Niska' | 'Umiarkowana' | 'Wysoka' = 'Brak';
  const safetyAlerts: string[] = [];

  if (state.activeTab === 'therapy') {
    if (state.therapyMode === 'trt') {
      hpgSuppression = Math.min(95, 40 + state.weeklyEquivalentDoseMg * 0.5);
      computedHct = 44 + Math.round((state.weeklyEquivalentDoseMg / 100) * 4.5);
      computedLh = Math.max(0.1, Math.round(computedLh * (1 - hpgSuppression / 100) * 10) / 10);
      computedFsh = Math.max(0.1, Math.round(computedFsh * (1 - hpgSuppression / 100) * 10) / 10);
      if (computedHct > 54) {
        safetyAlerts.push('ALARM: Hematokryt > 54% grozi udarem i zawałem! Wskazana flebotomia i redukcja dawki.');
      } else if (computedHct > 50) {
        safetyAlerts.push('Uwaga: Erytrocytoza graniczna (Hct > 50%). Kontroluj morfologię krwi.');
      }
    } else if (state.therapyMode === 'aas') {
      hpgSuppression = 99.5;
      computedLh = 0.1;
      computedFsh = 0.1;
      computedHct = 46 + Math.round((state.weeklyEquivalentDoseMg / 100) * 6);
      computedVte = 2.8;
      if (state.weeklyEquivalentDoseMg > 250) gynecomastiaScore = 'Wysoka';
      else if (state.weeklyEquivalentDoseMg > 150) gynecomastiaScore = 'Umiarkowana';
      safetyAlerts.push('Głęboka jatrogenna supresja osi HPG (ASIH). Azoospermia i atrofia komórek Leydiga.');
      if (computedHct > 54) safetyAlerts.push('Ciężka erytrocytoza posteroidowa — bezwzględne ryzyko zakrzepowo-zatorowe!');
    } else if (state.therapyMode === 'gaht-fem') {
      computedE2 = Math.min(450, 100 + state.weeklyEquivalentDoseMg * 12);
      if (state.antiandrogen === 'cpa') {
        hpgSuppression = 92;
        computedLh = 0.4;
        computedVte = 2.4;
        safetyAlerts.push('Monitoruj stężenie prolaktyny (ryzyko hiperprolaktynemii i oponiaka przy CPA).');
      } else if (state.antiandrogen === 'spiro') {
        hpgSuppression = 75;
        safetyAlerts.push('Monitoruj stężenie potasu w surowicy (ryzyko hiperkaliemii przy spironolaktonie).');
      } else if (state.antiandrogen === 'gnrh_analog') {
        hpgSuppression = 98;
        computedLh = 0.1;
        computedFsh = 0.1;
      }
      if (computedE2 > 250) safetyAlerts.push('Estradiol powyżej celu WPATH (100–200 pg/ml). Zredukuj dawkę.');
    } else if (state.therapyMode === 'gaht-masc') {
      hpgSuppression = 85;
      computedHct = 44 + Math.round((state.weeklyEquivalentDoseMg / 80) * 6);
      if (computedHct > 52) safetyAlerts.push('Erytrocytoza w maskulinizującej GAHT: rozważ zmianę na żel przezskórny.');
    }
  }

  // Spermatogenesis score
  let spermatogenesisIndex = 85;
  if (hpgSuppression > 80) spermatogenesisIndex = Math.max(0, 100 - hpgSuppression);
  else if (computedFsh < 1.0 || state.totalT < 8) spermatogenesisIndex = 25;

  // Tab 3: OHSS calculation
  let ohssGrade: OhssGrade = 'Brak';
  let ohssScore = 0;
  if (state.activeTab === 'ivf') {
    let riskPoints = 0;
    if (state.afc > 20) riskPoints += 25;
    else if (state.afc > 14) riskPoints += 12;

    if (state.amh > 3.5) riskPoints += 25;
    else if (state.amh > 2.0) riskPoints += 10;

    if (state.e2Trigger > 4000) riskPoints += 30;
    else if (state.e2Trigger > 2500) riskPoints += 15;

    if (state.oocytesCount > 18) riskPoints += 20;

    if (state.trigger === 'hcg') {
      riskPoints *= 1.4;
      computedVte = Math.max(1.0, riskPoints / 15);
    } else {
      // GnRH agonist trigger protects from late OHSS!
      riskPoints *= 0.35;
      computedVte = 1.1;
    }

    if (state.freezeAll) {
      riskPoints *= 0.5; // eliminates late pregnancy-induced OHSS
    }
    if (state.cabergolineCoTreatment) {
      riskPoints *= 0.7; // blocks VEGFR-2 phosphorylation
    }

    ohssScore = Math.min(100, Math.round(riskPoints));
    if (ohssScore >= 75) ohssGrade = 'Krytyczny';
    else if (ohssScore >= 55) ohssGrade = 'Ciężki';
    else if (ohssScore >= 35) ohssGrade = 'Umiarkowany';
    else if (ohssScore >= 18) ohssGrade = 'Łagodny';
    else ohssGrade = 'Brak';

    if (ohssGrade === 'Ciężki' || ohssGrade === 'Krytyczny') {
      safetyAlerts.push('ZAGROŻENIE ŻYCIA: Ciężki/krytyczny OHSS z hemokoncentracją i wodobrzuszem. Konieczna hospitalizacja, albumina i heparyna!');
    }
  }

  // Clinical takeaway summary
  let clinicalComment = 'Układ eugonadalny. Prawidłowa czynność osi podwzgórze–przysadka–gonady.';
  if (state.activeTab === 'hpg') {
    if (verm.freeT_pmol < 220 && state.sex === 'male') {
      clinicalComment = 'Obniżony wolny testosteron (< 220 pmol/L). Stan sugeruje hipogonadyzm komórkowy.';
    } else if (state.totalT < 12 && verm.freeT_pmol >= 220) {
      clinicalComment = 'Pozorny hipogonadyzm: niski testosteron całkowity wynika wyłącznie z niskiego stężenia SHBG (wolny T prawidłowy).';
    }
  } else if (state.activeTab === 'therapy') {
    if (state.therapyMode === 'aas') {
      clinicalComment = 'Zahamowanie osi HPG po dopingu AAS. Wymaga protokołu odblokowującego (hCG + SERM) przed powrotem płodności.';
    } else if (state.therapyMode === 'gaht-fem') {
      clinicalComment = 'Feminizująca GAHT: dążenie do T < 50 ng/dL i E2 100–200 pg/mL z minimalizacją ryzyka VTE drogą przezskórną.';
    }
  } else if (state.activeTab === 'ivf') {
    if (state.trigger === 'gnrh_agonist' && state.freezeAll) {
      clinicalComment = 'Bezpieczny protokół: trigger agonistą GnRH i strategia freeze-all skutecznie wyeliminowały ryzyko ciężkiego OHSS.';
    } else if (ohssScore > 50) {
      clinicalComment = 'Wysokie ryzyko OHSS wywołane triggerem hCG. Rozważ odroczenie transferu i witryfikację oocytów/zarodków.';
    }
  }

  return {
    vermeulen: verm,
    lh: computedLh,
    fsh: computedFsh,
    estradiol: computedE2,
    hpgSuppressionPercent: Math.round(hpgSuppression),
    spermatogenesisIndex,
    hematocritPercent: computedHct,
    vteRiskFold: Math.round(computedVte * 10) / 10,
    gynecomastiaScore,
    ohssGrade,
    ohssScore,
    clinicalComment,
    safetyAlerts,
  };
}

export interface GonadPreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  state: Partial<GonadSimulatorState>;
}

export const GONAD_PRESETS: GonadPreset[] = [
  {
    id: 'eugonadal_male',
    name: 'Zdrowy eugonadalny mężczyzna',
    badge: 'Fizjologia',
    description: 'Prawidłowe stężenia testosteronu całkowitego (18,5 nmol/l), SHBG (32 nmol/l) i wolnego T (>350 pmol/l).',
    state: {
      activeTab: 'hpg',
      sex: 'male',
      totalT: 18.5,
      shbg: 32,
      albumin: 44,
      gnrhIntervalMinutes: 90,
      aromataseActivityPercent: 100,
      oralEstrogenLoad: false,
    },
  },
  {
    id: 'obesity_low_shbg',
    name: 'Otyłość z niskim SHBG (pozorny hipogonadyzm)',
    badge: 'Diagnostyka',
    description: 'Niski testosteron całkowity (9,2 nmol/l) przy niskim SHBG (11 nmol/l), lecz prawidłowy wolny T wg Vermeulena (235 pmol/l).',
    state: {
      activeTab: 'hpg',
      sex: 'male',
      totalT: 9.2,
      shbg: 11,
      albumin: 42,
      gnrhIntervalMinutes: 90,
      aromataseActivityPercent: 140,
    },
  },
  {
    id: 'klinefelter',
    name: 'Pierwotny hipogonadyzm (zespół Klinefeltera)',
    badge: 'Andrologia',
    description: 'Niski testosteron (7,0 nmol/l), wysokie LH i FSH w wyniku uszkodzenia komórek Leydiga i kanalików nasiennych.',
    state: {
      activeTab: 'hpg',
      sex: 'male',
      totalT: 6.8,
      shbg: 38,
      albumin: 43,
      gnrhIntervalMinutes: 60,
    },
  },
  {
    id: 'post_aas_asih',
    name: 'Zespół ASIH po dopingu steroidowym (AAS)',
    badge: 'Doping',
    description: 'Całkowita jatrogenna supresja osi HPG po wielomiesięcznym cyklu nandrolonu: LH < 0,2, testosteron 1,5 nmol/l.',
    state: {
      activeTab: 'therapy',
      therapyMode: 'aas',
      weeklyEquivalentDoseMg: 350,
      therapyDurationWeeks: 24,
      totalT: 1.5,
      shbg: 22,
    },
  },
  {
    id: 'pcos_phenotype',
    name: 'Zespół policystycznych jajników (PCOS)',
    badge: 'Ginekologia',
    description: 'Wysoka częstotliwość pulsów GnRH, dominacja LH nad FSH (stosunek > 2:1), wysokie AMH i hiperandrogenizm.',
    state: {
      activeTab: 'hpg',
      sex: 'female',
      totalT: 2.8,
      shbg: 24,
      albumin: 44,
      gnrhIntervalMinutes: 50, // fast pulse frequency promotes LH
      aromataseActivityPercent: 90,
    },
  },
  {
    id: 'ohss_risk_high',
    name: 'Zagrożenie ciężkim OHSS (stymulacja IVF)',
    badge: 'Rozród ART',
    description: 'Młoda pacjentka z PCOS, 24 pęcherzyki, AMH 5,5 ng/ml, estradiol 4600 pg/ml. Trigger hCG wyzwala kaskadę VEGF.',
    state: {
      activeTab: 'ivf',
      afc: 24,
      amh: 5.5,
      e2Trigger: 4600,
      oocytesCount: 22,
      trigger: 'hcg',
      freezeAll: false,
      cabergolineCoTreatment: false,
    },
  },
  {
    id: 'gaht_feminizing',
    name: 'Feminizująca GAHT (standard WPATH SOC-8)',
    badge: 'Tranzycja',
    description: '17-beta-estradiol przezskórny + octan cyproteronu 10 mg: cel T < 50 ng/dl, E2 100–200 pg/ml przy niskim ryzyku VTE.',
    state: {
      activeTab: 'therapy',
      therapyMode: 'gaht-fem',
      weeklyEquivalentDoseMg: 14,
      antiandrogen: 'cpa',
      totalT: 0.9,
      shbg: 65,
    },
  },
  {
    id: 'gaht_masc_polycythemia',
    name: 'Maskulinizująca GAHT z powikłaniem (Hct > 54%)',
    badge: 'Bezpieczeństwo',
    description: 'Ester testosteronu o krótkim okresie półtrwania wywołuje nadmierną stymulację EPO i groźną erytrocytozę (Hct 55,5%).',
    state: {
      activeTab: 'therapy',
      therapyMode: 'gaht-masc',
      weeklyEquivalentDoseMg: 150,
      totalT: 28.0,
      shbg: 28,
    },
  },
];
