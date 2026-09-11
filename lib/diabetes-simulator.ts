export interface DiabetesState {
  betaCellFunction: number; // 0 to 150 %
  insulinResistance: number; // 1.0 (normal) to 5.0 (severe)
  mealCarbs: number; // 0 to 120 g
  mealGlycemicIndex: 'low' | 'medium' | 'high';
  insulinBolus: number; // 0 to 20 j
  basalRate: number; // 0 to 3.0 j/h
  dkaTrigger: boolean; // stress/infection/missed dose
  sglt2Inhibitor: boolean;
  glp1Agonist: boolean;
}

export interface GlucoseCurvePoint {
  time: number; // minutes 0 to 240
  glucose: number; // mg/dl
  insulin: number; // uU/ml
}

export interface DiabetesMetrics {
  fastingGlucose: number;
  peakGlucose: number;
  glucoseCurve: GlucoseCurvePoint[];
  tir: number; // Time in Range 70-180 mg/dl (%)
  tar: number; // Time above Range >180 mg/dl (%)
  tbr: number; // Time below Range <70 mg/dl (%)
  cv: number; // Coefficient of Variation (%)
  gmi: number; // Glucose Management Indicator (~HbA1c %)
  dkaMetrics: {
    ph: number;
    hco3: number; // mmol/l
    anionGap: number; // mmol/l
    betaHydroxybutyrate: number; // mmol/l
    correctedSodium: number; // mmol/l
    effectiveOsmolality: number; // mOsm/kg
    fluidDeficitLiters: number; // L
    isDka: boolean;
    isHhs: boolean;
  };
  pumpMetrics: {
    tdd: number; // Total Daily Dose
    isf: number; // mg/dl / 1 j
    icr: number; // g / 1 j
    suggestedBolus: number; // j
    iob: number; // units active
  };
  status: string;
  alertType: 'normal' | 'warning' | 'danger';
  recommendations: string[];
}

export const defaultDiabetesState: DiabetesState = {
  betaCellFunction: 100,
  insulinResistance: 1.0,
  mealCarbs: 50,
  mealGlycemicIndex: 'medium',
  insulinBolus: 0,
  basalRate: 0,
  dkaTrigger: false,
  sglt2Inhibitor: false,
  glp1Agonist: false,
};

export function calculateDiabetesState(state: DiabetesState): DiabetesMetrics {
  const {
    betaCellFunction,
    insulinResistance,
    mealCarbs,
    mealGlycemicIndex,
    insulinBolus,
    basalRate,
    dkaTrigger,
    sglt2Inhibitor,
    glp1Agonist,
  } = state;

  // 1. Glikemia wyjściowa na czczo (FPG)
  // Równowaga między wątrobową produkcją glukozy (wzrastającą z insulinoopornością) a rezerwą beta
  let basalInsulinSupply = (betaCellFunction / 100) * 1.0 + basalRate * 0.8;
  if (glp1Agonist) basalInsulinSupply *= 1.25;

  let fpg = 90 * (insulinResistance / Math.max(0.1, basalInsulinSupply));
  if (sglt2Inhibitor) fpg -= 40; // nerkowa utrata glukozy (glukozuria)
  if (glp1Agonist) fpg -= 30; // supresja glukagonu i wątrobowej produkcji glukozy
  fpg = Math.max(45, Math.min(450, fpg));

  // 2. Symulacja dynamicznej krzywej glikemii (Minimal Model approximation)
  // Wchłanianie posiłku zależy od IG: 'low' -> wolne wypłaszczone, 'high' -> ostry wczesny pik
  const igFactor = mealGlycemicIndex === 'low' ? 0.8 : mealGlycemicIndex === 'high' ? 1.3 : 1.0;
  const absorptionPeakTime = mealGlycemicIndex === 'low' ? 75 : mealGlycemicIndex === 'high' ? 40 : 55;

  const points: GlucoseCurvePoint[] = [];
  let peakG = fpg;

  // TDD szacowane
  const tdd = Math.max(15, Math.round(basalRate * 24 + insulinBolus * 3));
  const isf = Math.round(1800 / tdd);
  const icr = Math.round(500 / tdd);

  // Generowanie punktów co 15 minut (0 do 240 min)
  for (let t = 0; t <= 240; t += 15) {
    // Wchłanianie węglowodanów: unormowana funkcja gamma z pikiem 1.0 przy t = absorptionPeakTime
    const tC = Math.max(0, t) / absorptionPeakTime;
    const carbFlux = (mealCarbs * 2.4 * igFactor / insulinResistance) * tC * Math.exp(1 - tC);
    
    // Insulina egzogenna (bolus analogowy) - szczyt po ~60 min
    const tB = Math.max(0, t) / 60;
    const bolusEffect = (insulinBolus * (isf * 0.55) / insulinResistance) * tB * Math.exp(1 - tB);

    // Odpowiedź endogenna (jeśli zachowane komórki beta i brak skrajnej oporności)
    const endoInsulinEffect = (betaCellFunction / 100) * (carbFlux * (glp1Agonist ? 0.92 : 0.85));

    // Sumaryczna glikemia w punkcie czasowym
    let g = fpg + carbFlux - bolusEffect - endoInsulinEffect;
    if (sglt2Inhibitor && g > 140) g -= 20;

    g = Math.max(35, Math.min(550, Math.round(g)));
    if (g > peakG) peakG = g;

    // Insulinemia uU/ml
    const insPlasma = Math.round(10 * basalInsulinSupply + (insulinBolus * 12 * Math.exp(-t / 60)));
    points.push({ time: t, glucose: g, insulin: Math.max(2, insPlasma) });
  }

  // 3. Statystyki CGM
  const inRangeCount = points.filter(p => p.glucose >= 70 && p.glucose <= 180).length;
  const aboveRangeCount = points.filter(p => p.glucose > 180).length;
  const belowRangeCount = points.filter(p => p.glucose < 70).length;

  const tir = Math.round((inRangeCount / points.length) * 100);
  const tar = Math.round((aboveRangeCount / points.length) * 100);
  const tbr = Math.round((belowRangeCount / points.length) * 100);

  const meanG = points.reduce((acc, p) => acc + p.glucose, 0) / points.length;
  const variance = points.reduce((acc, p) => acc + Math.pow(p.glucose - meanG, 2), 0) / points.length;
  const sdG = Math.sqrt(variance);
  const cv = Math.round((sdG / meanG) * 100);
  const gmi = Number((3.31 + 0.02392 * meanG).toFixed(1));

  // 4. Kalkulator ostrych stanów metabolicznych (DKA / HHS)
  // Bezwzględny brak insuliny + trigger wyzwala DKA; u starszego z T2D przy odwodnieniu rozwija się HHS
  let ph = 7.40;
  let hco3 = 24.0;
  let anionGap = 10.0;
  let betaHydroxy = 0.4;
  let measuredNa = 138;
  let fluidDeficit = 0.5;
  let isDka = false;
  let isHhs = false;

  if (dkaTrigger || (betaCellFunction < 15 && basalRate < 0.3)) {
    if (betaCellFunction < 20) {
      // Obraz kwasicy ketonowej DKA
      isDka = true;
      betaHydroxy = Number((3.2 + (100 - betaCellFunction) * 0.05).toFixed(1));
      anionGap = Math.round(14 + betaHydroxy * 2.5);
      hco3 = Math.max(4, Math.round(24 - (anionGap - 10)));
      ph = Number((7.40 - (anionGap - 10) * 0.018).toFixed(2));
      fluidDeficit = 5.5; // ~5-6 litrów
      measuredNa = 132;
    } else if (meanG > 350) {
      // Obraz zespołu hiperosmolarnego HHS
      isHhs = true;
      betaHydroxy = 1.1; // śladowe
      anionGap = 11.0;
      hco3 = 22.0;
      ph = 7.36;
      fluidDeficit = 9.5; // ~9-11 litrów
      measuredNa = 148;
    }
  }

  // Sód skorygowany wg Katza: Na_corr = Na + 0.016 * (G - 100)
  const correctedSodium = Number((measuredNa + 0.016 * (meanG - 100)).toFixed(1));
  const effectiveOsmolality = Math.round(2 * measuredNa + meanG / 18);

  // 5. Sugerowany bolus na posiłek i korektę
  const carbBolus = mealCarbs / icr;
  const correctionBolus = (fpg - 100) / isf;
  const suggestedBolus = Number((Math.max(0, carbBolus + Math.max(0, correctionBolus))).toFixed(1));
  const iob = Number((insulinBolus * 0.65).toFixed(1)); // aktywna insulina

  // 6. Status kliniczny i alerty
  let status = 'Stabilna kontrola glikemii (euglikemia poposiłkowa)';
  let alertType: 'normal' | 'warning' | 'danger' = 'normal';
  const recommendations: string[] = [];

  if (isDka) {
    status = 'Cukrzycowa kwasica ketonowa (DKA) — stan bezpośredniego zagrożenia życia!';
    alertType = 'danger';
    recommendations.push('Natychmiastowa hospitalizacja na OIT / sali intensywnego nadzoru.');
    recommendations.push('Wlew 1000 ml 0,9% NaCl w 1h i kontrola potasu K+ przed włączeniem insuliny.');
    recommendations.push('Wlew dożylny insuliny 0,1 j./kg/h pod ścisłą kontrolą luki anionowej.');
  } else if (isHhs) {
    status = 'Zespół hiperglikemiczno-hiperosmolarny (HHS) ze skrajnym odwodnieniem';
    alertType = 'danger';
    recommendations.push('Powolna rehydratacja hipotonicznymi płynami (spadek glikemii < 50–70 mg/dl/h).');
    recommendations.push('Wdrożenie profilaktyki przeciwzakrzepowej heparyną drobnocząsteczkową (HDCz).');
  } else if (tbr > 4) {
    status = 'Zbyt wysoki czas w hipoglikemii (TBR > 4%) — ryzyko neuroglikopenii';
    alertType = 'danger';
    recommendations.push('Zredukuj dawkę insuliny bazowej lub posiłkowej o 10–20%.');
    recommendations.push('Zastosuj regułę 15/15 w razie spadku cukru poniżej 70 mg/dl.');
    recommendations.push('Wyposaż pacjenta w donosowy glukagon (Baqsimi) lub autostrzykawkę.');
  } else if (tar > 25 || meanG > 180) {
    status = 'Niezadowalające wyrównanie (TAR > 25%) — przewlekła hiperglikemia';
    alertType = 'warning';
    recommendations.push('Rozważ zwiększenie wskaźnika ICR lub optymalizację dawki bazy.');
    recommendations.push('W cukrzycy typu 2 włącz flozynę (SGLT2) i agonistę receptora GLP-1.');
  } else {
    recommendations.push('Utrzymuj aktualny schemat; wskaźnik TIR > 70% spełnia cele konsensusu ATTD.');
    recommendations.push('Monitoruj współczynnik zmienności (CV <= 36%) w raportach AGP.');
  }

  return {
    fastingGlucose: Math.round(fpg),
    peakGlucose: Math.round(peakG),
    glucoseCurve: points,
    tir,
    tar,
    tbr,
    cv,
    gmi,
    dkaMetrics: {
      ph,
      hco3,
      anionGap,
      betaHydroxybutyrate: betaHydroxy,
      correctedSodium,
      effectiveOsmolality,
      fluidDeficitLiters: fluidDeficit,
      isDka,
      isHhs,
    },
    pumpMetrics: {
      tdd,
      isf,
      icr,
      suggestedBolus,
      iob,
    },
    status,
    alertType,
    recommendations,
  };
}

export interface DiabetesPreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  state: DiabetesState;
}

export const diabetesPresets: DiabetesPreset[] = [
  {
    id: 'healthy',
    name: 'Fizjologiczna euglikemia (Osoba zdrowa)',
    badge: 'Fizjologia',
    description: 'Prawidłowa rezerwa komórek beta (100%), doskonała wrażliwość na insulinę, brak leków egzogennych.',
    state: {
      betaCellFunction: 100,
      insulinResistance: 1.0,
      mealCarbs: 60,
      mealGlycemicIndex: 'medium',
      insulinBolus: 0,
      basalRate: 0,
      dkaTrigger: false,
      sglt2Inhibitor: false,
      glp1Agonist: false,
    },
  },
  {
    id: 't1d_well_managed',
    name: 'Wyrównana cukrzyca typu 1 (Sensor CGM + MDI/AID)',
    badge: 'T1D cel TIR',
    description: 'Brak endogennej sekrecji komórek beta, prawidłowo dobrana baza i bolus do posiłku 50 g węglowodanów.',
    state: {
      betaCellFunction: 0,
      insulinResistance: 1.0,
      mealCarbs: 50,
      mealGlycemicIndex: 'medium',
      insulinBolus: 4.5,
      basalRate: 0.9,
      dkaTrigger: false,
      sglt2Inhibitor: false,
      glp1Agonist: false,
    },
  },
  {
    id: 't2d_insulin_resistant',
    name: 'Cukrzyca typu 2 z zespołem metabolicznym',
    badge: 'T2D oporność',
    description: 'Ciężka insulinooporność obwodowa (2,8x) i wyczerpująca się rezerwa komórek beta (40%).',
    state: {
      betaCellFunction: 40,
      insulinResistance: 2.8,
      mealCarbs: 70,
      mealGlycemicIndex: 'high',
      insulinBolus: 0,
      basalRate: 0,
      dkaTrigger: false,
      sglt2Inhibitor: false,
      glp1Agonist: false,
    },
  },
  {
    id: 't2d_modern_therapy',
    name: 'Cukrzyca typu 2 na flozynie i GLP-1',
    badge: 'Nowoczesne leki',
    description: 'Przełamanie insulinooporności dzięki flozynie (glukozuria) i inkretynie GLP-1 (zwiększona sekrecja i sytość).',
    state: {
      betaCellFunction: 55,
      insulinResistance: 1.6,
      mealCarbs: 50,
      mealGlycemicIndex: 'low',
      insulinBolus: 0,
      basalRate: 0,
      dkaTrigger: false,
      sglt2Inhibitor: true,
      glp1Agonist: true,
    },
  },
  {
    id: 'mody2_gck',
    name: 'Cukrzyca monogenowa MODY 2 (mutacja GCK)',
    badge: 'MODY 2',
    description: 'Podwyższony próg glukokinazy, stabilna łagodna hiperglikemia na czczo (115–130 mg/dl) bez leków.',
    state: {
      betaCellFunction: 75,
      insulinResistance: 1.0,
      mealCarbs: 45,
      mealGlycemicIndex: 'medium',
      insulinBolus: 0,
      basalRate: 0,
      dkaTrigger: false,
      sglt2Inhibitor: false,
      glp1Agonist: false,
    },
  },
  {
    id: 'dka_emergency',
    name: 'Cukrzycowa kwasica ketonowa (Ostra DKA)',
    badge: 'Stan nagły OIT',
    description: 'Brak insuliny bazowej wyzwala masową ketogenezę, kwasicę metaboliczną pH < 7,15 i lukę anionową AG > 25.',
    state: {
      betaCellFunction: 0,
      insulinResistance: 1.4,
      mealCarbs: 20,
      mealGlycemicIndex: 'high',
      insulinBolus: 0,
      basalRate: 0.0,
      dkaTrigger: true,
      sglt2Inhibitor: false,
      glp1Agonist: false,
    },
  },
  {
    id: 'hhs_emergency',
    name: 'Zespół hiperosmolarny HHS u seniora',
    badge: 'HHS kryzys',
    description: 'Skrajna hiperglikemia (> 800 mg/dl), odwodnienie > 10 litrów i osmolalność efektywna > 340 mOsm/kg.',
    state: {
      betaCellFunction: 25,
      insulinResistance: 3.2,
      mealCarbs: 80,
      mealGlycemicIndex: 'high',
      insulinBolus: 0,
      basalRate: 0.0,
      dkaTrigger: true,
      sglt2Inhibitor: false,
      glp1Agonist: false,
    },
  },
  {
    id: 'overbolus_hypo',
    name: 'Jatrogenna hipoglikemia (przedawkowany bolus)',
    badge: 'Zagrożenie hipo',
    description: 'Podanie 12 j. insuliny do małego posiłku 25 g węglowodanów wywołuje spadek glikemii < 50 mg/dl (TBR > 20%).',
    state: {
      betaCellFunction: 10,
      insulinResistance: 1.0,
      mealCarbs: 25,
      mealGlycemicIndex: 'low',
      insulinBolus: 12,
      basalRate: 1.0,
      dkaTrigger: false,
      sglt2Inhibitor: false,
      glp1Agonist: false,
    },
  },
];
