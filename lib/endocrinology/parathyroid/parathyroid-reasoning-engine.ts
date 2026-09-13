export type ParathyroidSemanticOrigin =
  | 'GUIDELINE_THRESHOLD'
  | 'ASSAY_DEPENDENT'
  | 'MEASURED'
  | 'DERIVED'
  | 'MODELLED'
  | 'EXTRAPOLATED';

export interface CalciumCorrectionInput {
  totalCalciumMmolL: number;
  albuminGPerL: number;
  ionizedCalciumMmolL?: number;
}

export interface CalciumCorrectionOutput {
  correctedCalciumMmolL: number;
  isHypercalcemic: boolean;
  isHypocalcemic: boolean;
  referenceMethod: 'measured_ionized' | 'calculated_payne';
  comment: string;
}

export function calculateCorrectedCalcium(input: CalciumCorrectionInput): CalciumCorrectionOutput {
  if (input.ionizedCalciumMmolL !== undefined) {
    const isHyper = input.ionizedCalciumMmolL > 1.32;
    const isHypo = input.ionizedCalciumMmolL < 1.15;
    return {
      correctedCalciumMmolL: input.ionizedCalciumMmolL,
      isHypercalcemic: isHyper,
      isHypocalcemic: isHypo,
      referenceMethod: 'measured_ionized',
      comment: 'Wapń zjonizowany stanowi złoty standard diagnostyczny, eliminując błędy dysproteinemii, hemodilucji czy ciąży.',
    };
  }

  // Payne formula in SI: Ca_corr = Ca_tot + 0.02 * (40 - Albumin)
  const albuminDiff = 40.0 - input.albuminGPerL;
  const corrected = Number((input.totalCalciumMmolL + 0.02 * albuminDiff).toFixed(2));
  const isHyper = corrected > 2.55;
  const isHypo = corrected < 2.15;

  return {
    correctedCalciumMmolL: corrected,
    isHypercalcemic: isHyper,
    isHypocalcemic: isHypo,
    referenceMethod: 'calculated_payne',
    comment: 'Wzór Payne’a szacuje stężenie frakcji związanej z albuminami. W skrajnych zaburzeniach kwasowo-zasadowych lub ciężkiej hipoalbuminemii preferuj wapń zjonizowany.',
  };
}

export interface CCCREvaluationInput {
  serumCalciumMmolL: number;
  serumCreatinineUmolL: number;
  urineCalcium24hMmolL: number;
  urineCreatinine24hMmolL: number;
  vitaminD25OhNgMl?: number;
  eGfrMlMin?: number;
  takingThiazides?: boolean;
  takingLithium?: boolean;
  familyHistoryHypercalcemia?: boolean;
}

export interface CCCREvaluationOutput {
  cccr: number;
  classification: 'fhh_more_likely' | 'overlap_zone' | 'phpt_more_likely';
  clinicalInterpretation: string;
  confoundersDetected: string[];
  recommendedAction: string;
  semanticOrigin: ParathyroidSemanticOrigin;
}

export function evaluateCCCR(input: CCCREvaluationInput): CCCREvaluationOutput {
  // CCCR = (U_Ca * S_Cr) / (S_Ca * U_Cr)
  // S_Cr is in umol/L -> convert to mmol/L (/1000)
  const sCrMmol = input.serumCreatinineUmolL / 1000.0;
  const numerator = input.urineCalcium24hMmolL * sCrMmol;
  const denominator = input.serumCalciumMmolL * input.urineCreatinine24hMmolL;

  if (denominator <= 0) {
    throw new Error('CCCR: Nieprawidłowe mianowniki stężeń wapnia lub kreatyniny.');
  }

  const cccr = Number((numerator / denominator).toFixed(4));
  const confounders: string[] = [];

  if (input.vitaminD25OhNgMl !== undefined && input.vitaminD25OhNgMl < 20) {
    confounders.push('Niedobór witaminy D (<20 ng/ml) obniża wydalanie wapnia z moczem i może sztucznie zaniżyć CCCR do strefy FHH u pacjenta z PHPT. Wyrównaj 25(OH)D przed ostateczną interpretacją!');
  }
  if (input.takingThiazides) {
    confounders.push('Diuretyki tiazydowe stymulują cewkową reabsorpcję wapnia, drastycznie zmniejszając CCCR.');
  }
  if (input.takingLithium) {
    confounders.push('Lit przestawia punkt nastawczy receptora CaSR, imitując FHH.');
  }
  if (input.eGfrMlMin !== undefined && input.eGfrMlMin < 60) {
    confounders.push('Niewydolność nerek (eGFR < 60 ml/min) ogranicza filtrację wapnia i zniekształca CCCR.');
  }

  let classification: CCCREvaluationOutput['classification'] = 'overlap_zone';
  let interpretation = '';
  let rec = '';

  if (cccr < 0.010) {
    classification = 'fhh_more_likely';
    interpretation = `CCCR = ${cccr} (< 0,010) zwiększa podejrzenie rodzinnej hipokalciurycznej hiperkalcemii (FHH), ale NIE stanowi jednoznacznego dowodu biologicznego.`;
    rec = confounders.length > 0
      ? 'Wykryto czynniki zakłócające. Usuń czynniki odwracalne (suplementacja witaminy D, odstawienie tiazydów) i powtórz badanie. Przy utrzymującym się niskim CCCR wykonaj badanie genetyczne genu CASR / AP2S1 / GNA11 przed pochopną paratyreoidotomią!'
      : 'Zleć badanie genetyczne (sekwencjonowanie CASR) oraz zbadaj stężenie wapnia u krewnych 1. stopnia. Paratyreoidotomia w FHH jest nieskuteczna i przeciwwskazana.';
  } else if (cccr <= 0.020) {
    classification = 'overlap_zone';
    interpretation = `CCCR = ${cccr} mieści się w szarej strefie nakładania (0,010–0,020). W tej strefie znajduje się ok. 20% chorych z FHH i 10% chorych z pierwotną nadczynnością przytarczyc (PHPT).`;
    rec = 'Konieczna dogłębna ocena kliniczna: wywiad rodzinny, badanie genetyczne CASR, USG/scyntygrafia MIBI przytarczyc oraz eliminacja niedoboru witaminy D.';
  } else {
    classification = 'phpt_more_likely';
    interpretation = `CCCR = ${cccr} (> 0,020) z wysokim prawdopodobieństwem przemawia za pierwotną nadczynnością przytarczyc (PHPT).`;
    rec = 'Kwalifikuj do leczenia operacyjnego wg wskazań 5. Międzynarodowych Warsztatów PHPT (wiek <50 lat, Ca > 0,25 mmol/l pow. normy, osteoporoza T-score <= -2.5, eGFR < 60, kamica nerkowa/wapnica).';
  }

  return {
    cccr,
    classification,
    clinicalInterpretation: interpretation,
    confoundersDetected: confounders,
    recommendedAction: rec,
    semanticOrigin: 'GUIDELINE_THRESHOLD',
  };
}

export interface HypoparathyroidismEvalInput {
  serumCalciumMmolL: number;
  serumPhosphateMmolL: number;
  urineCalcium24hMmolDay?: number;
  hasParesthesiasOrTetany: boolean;
  calcitriolMicrogDay: number;
  calciumElementalMgDay: number;
}

export interface HypoparathyroidismEvalOutput {
  targetMet: boolean;
  safetyAlerts: string[];
  treatmentAdjustment: string;
  semanticOrigin: ParathyroidSemanticOrigin;
}

export function evaluateHypoparathyroidismManagement(
  input: HypoparathyroidismEvalInput
): HypoparathyroidismEvalOutput {
  const alerts: string[] = [];
  // Target: lower normal range (2.00 - 2.15 mmol/L) without symptoms
  const inLowerNormal = input.serumCalciumMmolL >= 2.00 && input.serumCalciumMmolL <= 2.20;
  const caPProduct = Number((input.serumCalciumMmolL * input.serumPhosphateMmolL).toFixed(2));

  if (input.serumCalciumMmolL < 2.00 && input.hasParesthesiasOrTetany) {
    alerts.push('Objawowa hipokalcemia: zwiększ dawkę aktywnego analogu witaminy D (alfakalcydol/kalcytriol) oraz wapnia elementarnego.');
  }

  if (input.serumCalciumMmolL > 2.30) {
    alerts.push('Zbyt wysokie stężenie wapnia u chorego z niedoczynnością przytarczyc: brak PTH w kanalikach nerkowych powoduje hiperkalciurię i ryzyko nefrokalcynozy przy normokalcemii!');
  }

  if (input.urineCalcium24hMmolDay !== undefined && input.urineCalcium24hMmolDay > 7.5) {
    alerts.push(`Hiperkalciuria 24h (${input.urineCalcium24hMmolDay} mmol/d > 7,5 mmol/d). Ryzyko kamicy nerkowej i spadku GFR. Rozważ zmniejszenie suplementacji wapnia lub dołączenie tiazydów.`);
  }

  if (caPProduct > 4.4) {
    alerts.push(`Iloczyn Ca x P = ${caPProduct} mmol^2/L^2 (> 4,4). Wysokie ryzyko zwapnień pozaszkieletowych (naczynia, OUN, rogówka). Konieczne obniżenie fosforanów w diecie.`);
  }

  let adj = '';
  if (inLowerNormal && !input.hasParesthesiasOrTetany) {
    adj = 'Leczenie optymalne: wapń w dolnej granicy normy bez objawów tężyczkowych, minimalizujące dobowe wydalanie wapnia z moczem.';
  } else if (input.serumCalciumMmolL < 2.00) {
    adj = 'Zwiększ dawkę analogu 1-alfa witaminy D o 0,25-0,5 µg/dobę; pamiętaj, że niedobór PTH ogranicza stymulację enzymu CYP27B1.';
  } else {
    adj = 'Zredukuj dawki węglanu wapnia i/lub kalcytriolu; celem nie jest środek zakresu normy, lecz bezpieczny poziom bezobjawowy.';
  }

  return {
    targetMet: inLowerNormal && !input.hasParesthesiasOrTetany && alerts.length === 0,
    safetyAlerts: alerts,
    treatmentAdjustment: adj,
    semanticOrigin: 'GUIDELINE_THRESHOLD',
  };
}

export interface HungryBoneRiskInput {
  preopCalciumMmolL: number;
  preopPthPgMl: number;
  alkalinePhosphataseUPerL: number; // marker of bone resorption/formation
  adenomaSizeMm?: number;
  patientAge: number;
}

export interface HungryBoneRiskOutput {
  riskScore: 'low' | 'moderate' | 'high';
  expectedNadirDaysPostop: string;
  prophylacticStrategy: string;
}

export function evaluateHungryBoneRisk(input: HungryBoneRiskInput): HungryBoneRiskOutput {
  let score = 0;
  if (input.preopCalciumMmolL >= 3.0) score += 2;
  if (input.preopPthPgMl > 300) score += 3;
  if (input.alkalinePhosphataseUPerL > 200) score += 3;
  if (input.patientAge > 60) score += 1;
  if (input.adenomaSizeMm && input.adenomaSizeMm >= 25) score += 2;

  if (score >= 6) {
    return {
      riskScore: 'high',
      expectedNadirDaysPostop: '2–4 doba po operacji',
      prophylacticStrategy: 'Wysokie ryzyko zespołu głodnych kości (znaczny obrót kostny, wysoki ALP i PTH). Wdróż agresywną suplementację kalcytriolu (1-2 µg/d) i wapnia i.v./p.o. natychmiast po zabiegu, monitoruj Ca, P i Mg co 6-8 h.',
    };
  }
  if (score >= 3) {
    return {
      riskScore: 'moderate',
      expectedNadirDaysPostop: '1–3 doba po operacji',
      prophylacticStrategy: 'Umiarkowane ryzyko. Monitoruj wapń zjonizowany 2x dziennie, miej przygotowany glukonian wapnia do wlewu dożylnego i kalcytriol doustny.',
    };
  }
  return {
    riskScore: 'low',
    expectedNadirDaysPostop: '1–2 doba po operacji',
    prophylacticStrategy: 'Niskie ryzyko. Rutynowa kontrola wapnia w 1. dobie pooperacyjnej, suplementacja doustna w razie łagodnych parestezji.',
  };
}
