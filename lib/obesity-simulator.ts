export interface ObesitySimulatorInputs {
  age: number;
  sex: 'M' | 'F';
  heightCm: number;
  weightKg: number;
  pal: number; // Physical Activity Level: 1.2 (sedentary) to 1.9 (intense)
  caloricIntake: number; // kcal/day
  bodyFatPct: number; // %
  selectedDrug: 'none' | 'liraglutide' | 'semaglutide' | 'tirzepatide' | 'bupropion_naltrexone' | 'orlistat';
  drugDoseMg: number;
  adherencePct: number; // 0 to 100%
  comorbidities: {
    t2d: boolean;
    htn: boolean;
    osas: boolean;
    masld: boolean;
    gerd: boolean;
    dyslipidemia: boolean;
  };
  bariatricProcedure: 'none' | 'lsg' | 'rygb' | 'oagb';
  monthsPostOp: number;
  tcMgDl: number;
  hdlMgDl: number;
  tgMgDl: number;
  sbpMmHg: number;
  smoker: boolean;
  statinRegimen: 'none' | 'moderate' | 'high' | 'high_ezetimibe' | 'triple_pcsk9' | 'bempedoic_ezetimibe';
  astU_L: number;
  altU_L: number;
  plt10e9_L: number;
}

export interface ObesitySimulatorOutputs {
  bmi: number;
  bmiClass: string;
  idealWeightKg: number;
  excessWeightKg: number;
  bmrMifflin: number;
  bmrKatch: number;
  tdee: number;
  dailyDeficitKcal: number;
  adaptiveThermogenesisKcal: number;
  predictedWeight6m: number;
  predictedWeight12m: number;
  bariatricCandidate: boolean;
  bariatricIndicationReason: string;
  predictedEwlPct: number;
  predictedTbwlPct: number;
  t2dRemissionProbabilityPct: number;
  nutritionalDeficiencyRisks: string[];
  ldlFriedewald: number;
  ldlSampson: number;
  friedewaldValid: boolean;
  nonHdl: number;
  remnantCholesterol: number;
  score2RiskPct: number;
  score2Category: 'Niskie' | 'Umiarkowane' | 'Duże' | 'Bardzo duże';
  targetLdl: number;
  achievedLdl: number;
  ldlGoalAchieved: boolean;
  fib4Score: number;
  fib4RiskCategory: 'Niskie' | 'Pośrednie (szara strefa)' | 'Wysokie';
  alerts: string[];
}

export function calculateObesityState(inputs: ObesitySimulatorInputs): ObesitySimulatorOutputs {
  const alerts: string[] = [];

  // 1. Antropometria
  const heightM = inputs.heightCm / 100;
  const bmi = parseFloat((inputs.weightKg / (heightM * heightM)).toFixed(1));

  let bmiClass = 'Norma';
  if (bmi < 18.5) bmiClass = 'Niedowaga';
  else if (bmi < 25.0) bmiClass = 'Norma';
  else if (bmi < 30.0) bmiClass = 'Nadwaga';
  else if (bmi < 35.0) bmiClass = 'Otyłość I st.';
  else if (bmi < 40.0) bmiClass = 'Otyłość II st.';
  else bmiClass = 'Otyłość III st. (olbrzymia)';

  const idealWeightKg = parseFloat((25 * heightM * heightM).toFixed(1));
  const excessWeightKg = Math.max(0, parseFloat((inputs.weightKg - idealWeightKg).toFixed(1)));

  // 2. BMR & TDEE (Mifflin-St Jeor & Katch-McArdle)
  const sexTerm = inputs.sex === 'M' ? 5 : -161;
  const bmrMifflin = Math.round(10 * inputs.weightKg + 6.25 * inputs.heightCm - 5 * inputs.age + sexTerm);

  const ffmKg = inputs.weightKg * (1 - inputs.bodyFatPct / 100);
  const bmrKatch = Math.round(370 + 21.6 * ffmKg);

  const tdee = Math.round(bmrMifflin * inputs.pal);
  const dailyDeficitKcal = tdee - inputs.caloricIntake;

  // 3. Model nieliniowy Halla & Adaptacja metaboliczna
  // Szacowana adaptacja metaboliczna: ~20-25 kcal/d na każdy utracony kilogram prognozowany
  let drugWeightLossPct = 0;
  if (inputs.selectedDrug === 'liraglutide') drugWeightLossPct = 8.0;
  else if (inputs.selectedDrug === 'semaglutide') drugWeightLossPct = 15.0;
  else if (inputs.selectedDrug === 'tirzepatide') drugWeightLossPct = 21.5;
  else if (inputs.selectedDrug === 'bupropion_naltrexone') drugWeightLossPct = 6.0;
  else if (inputs.selectedDrug === 'orlistat') drugWeightLossPct = 4.0;

  const effectiveDrugWeightLossPct = drugWeightLossPct * (inputs.adherencePct / 100);

  // Szacunkowa utrata masy po 12 miesiącach
  let bariatricTbwlPct = 0;
  if (inputs.bariatricProcedure === 'lsg') bariatricTbwlPct = 28.0;
  else if (inputs.bariatricProcedure === 'rygb') bariatricTbwlPct = 33.0;
  else if (inputs.bariatricProcedure === 'oagb') bariatricTbwlPct = 35.0;

  const totalInterventionTbwlPct = Math.min(60, Math.max(effectiveDrugWeightLossPct, bariatricTbwlPct));
  const expectedLossKg = (inputs.weightKg * totalInterventionTbwlPct) / 100;
  const adaptiveThermogenesisKcal = Math.round(expectedLossKg * 22);

  const predictedWeight12m = parseFloat(Math.max(idealWeightKg * 0.85, inputs.weightKg - expectedLossKg).toFixed(1));
  const predictedWeight6m = parseFloat((inputs.weightKg - expectedLossKg * 0.7).toFixed(1));

  // 4. Kwalifikacja bariatryczna wg IFSO/ASMBS 2023
  const hasMetabolicComorbidity =
    inputs.comorbidities.t2d ||
    inputs.comorbidities.htn ||
    inputs.comorbidities.osas ||
    inputs.comorbidities.masld;

  let bariatricCandidate = false;
  let bariatricIndicationReason = 'Brak wskazań do chirurgii metabolicznej (BMI < 30 lub brak powikłań)';

  if (bmi >= 35.0) {
    bariatricCandidate = true;
    bariatricIndicationReason = 'Wskazanie bezwzględne IFSO 2023: BMI >= 35 kg/m² niezależnie od chorób współistniejących';
  } else if (bmi >= 30.0 && hasMetabolicComorbidity) {
    bariatricCandidate = true;
    bariatricIndicationReason = 'Wskazanie warunkowe IFSO 2023: BMI 30,0–34,9 kg/m² z powikłaniami metabolicznymi (T2D/HTN/OSAS/MASLD)';
  }

  // Wskaźniki bariatryczne %EWL i %TBWL
  const lostKg = Math.max(0, inputs.weightKg - predictedWeight12m);
  const predictedTbwlPct = parseFloat(((lostKg / inputs.weightKg) * 100).toFixed(1));
  const predictedEwlPct = excessWeightKg > 0 ? parseFloat(((lostKg / excessWeightKg) * 100).toFixed(1)) : 0;

  // Szansa remisji cukrzycy
  let t2dRemissionProbabilityPct = 0;
  if (inputs.comorbidities.t2d) {
    if (inputs.bariatricProcedure === 'rygb' || inputs.bariatricProcedure === 'oagb') {
      t2dRemissionProbabilityPct = 78;
    } else if (inputs.bariatricProcedure === 'lsg') {
      t2dRemissionProbabilityPct = 62;
    } else if (inputs.selectedDrug === 'tirzepatide') {
      t2dRemissionProbabilityPct = 55;
    } else if (inputs.selectedDrug === 'semaglutide') {
      t2dRemissionProbabilityPct = 40;
    } else {
      t2dRemissionProbabilityPct = 15;
    }
  }

  // Ryzyka niedoborów pooperacyjnych
  const nutritionalDeficiencyRisks: string[] = [];
  if (inputs.bariatricProcedure === 'rygb' || inputs.bariatricProcedure === 'oagb') {
    nutritionalDeficiencyRisks.push('Witamina B12 (brak czynnika IF i kwasu solnego)');
    nutritionalDeficiencyRisks.push('Żelazo (ominięcie dwunastnicy, preferowane wlewy i.v.)');
    nutritionalDeficiencyRisks.push('Cytrynian wapnia + Witamina D3 (ochrona przed osteomalacją)');
    nutritionalDeficiencyRisks.push('Kwas foliowy, cynk i miedź');
  } else if (inputs.bariatricProcedure === 'lsg') {
    nutritionalDeficiencyRisks.push('Żelazo i ferrytyna');
    nutritionalDeficiencyRisks.push('Witamina B12 i witamina D3');
  }

  // 5. Lipidogram: Friedewald vs Sampson
  const friedewaldValid = inputs.tgMgDl < 400;
  const ldlFriedewald = Math.max(0, Math.round(inputs.tcMgDl - inputs.hdlMgDl - inputs.tgMgDl / 5));

  // Formuła Sampsona (NIH Equation 2 - JAMA Cardiol 2020):
  const nonHdl = Math.max(0, inputs.tcMgDl - inputs.hdlMgDl);
  const ldlSampson = Math.max(
    0,
    Math.round(
      inputs.tcMgDl / 0.948 -
      inputs.hdlMgDl / 0.971 -
      (inputs.tgMgDl / 8.56 + (inputs.tgMgDl * nonHdl) / 2140 - (inputs.tgMgDl * inputs.tgMgDl) / 16100) -
      9.44
    )
  );


  const baseLdl = friedewaldValid ? ldlFriedewald : ldlSampson;
  const remnantCholesterol = Math.max(0, inputs.tcMgDl - inputs.hdlMgDl - baseLdl);

  // 6. Redukcja LDL pod wpływem schematu lekowego
  let statinReductionPct = 0;
  if (inputs.statinRegimen === 'moderate') statinReductionPct = 30;
  else if (inputs.statinRegimen === 'high') statinReductionPct = 50;
  else if (inputs.statinRegimen === 'high_ezetimibe') statinReductionPct = 65;
  else if (inputs.statinRegimen === 'triple_pcsk9') statinReductionPct = 85;
  else if (inputs.statinRegimen === 'bempedoic_ezetimibe') statinReductionPct = 38;

  const achievedLdl = Math.round(baseLdl * (1 - statinReductionPct / 100));

  // 7. SCORE2 & Cel LDL wg ESC/EAS 2023
  let score2Category: 'Niskie' | 'Umiarkowane' | 'Duże' | 'Bardzo duże' = 'Umiarkowane';
  let targetLdl = 100;

  if (inputs.comorbidities.t2d || inputs.age >= 65 || baseLdl >= 190) {
    score2Category = 'Bardzo duże';
    targetLdl = 55;
  } else if (inputs.smoker || inputs.sbpMmHg >= 160 || inputs.comorbidities.htn) {
    score2Category = 'Duże';
    targetLdl = 70;
  } else {
    score2Category = 'Umiarkowane';
    targetLdl = 100;
  }

  // Uproszczone wyliczenie ryzyka SCORE2 w %
  let score2RiskPct = Math.round((inputs.age / 10) * 1.5 + (inputs.smoker ? 3 : 0) + (inputs.sbpMmHg - 120) * 0.05);
  if (score2Category === 'Bardzo duże') score2RiskPct = Math.max(10, score2RiskPct);
  score2RiskPct = Math.min(45, Math.max(1, score2RiskPct));

  const ldlGoalAchieved = achievedLdl <= targetLdl;

  // 8. FIB-4 Score
  const sqrtAlt = Math.sqrt(inputs.altU_L);
  const fib4Score = sqrtAlt > 0 && inputs.plt10e9_L > 0
    ? parseFloat(((inputs.age * inputs.astU_L) / (inputs.plt10e9_L * sqrtAlt)).toFixed(2))
    : 0;

  let fib4RiskCategory: 'Niskie' | 'Pośrednie (szara strefa)' | 'Wysokie' = 'Niskie';
  const fib4LowThreshold = inputs.age >= 65 ? 2.0 : 1.30;
  if (fib4Score < fib4LowThreshold) {
    fib4RiskCategory = 'Niskie';
  } else if (fib4Score <= 2.67) {
    fib4RiskCategory = 'Pośrednie (szara strefa)';
  } else {
    fib4RiskCategory = 'Wysokie';
  }

  // Alerty kliniczne
  if (!friedewaldValid) {
    alerts.push('UWAGA: Triglicerydy >= 400 mg/dl zafałszowują formułę Friedewalda — zastosowano formułę Sampsona (NIH).');
  }
  if (inputs.tgMgDl >= 1000) {
    alerts.push('ALARM: Triglicerydy >= 1000 mg/dl — wysokie ryzyko ostrego zapalenia trzustki (OZT)! Wymagana natychmiastowa restrykcja tłuszczu.');
  }
  if (baseLdl >= 190) {
    alerts.push('Podejrzenie hipercholesterolemii rodzinnej (FH) — stężenie LDL-C >= 190 mg/dl wymaga oceny wg skali DLCN i screeningu kaskadowego.');
  }
  if (inputs.bariatricProcedure === 'lsg' && inputs.comorbidities.gerd) {
    alerts.push('OSTRZEŻENIE: Rękawowa resekcja (LSG) przy współistniejącym GERD grozi ciężkim zaostrzeniem refluksu. Rekomendowane RYGB.');
  }
  if (fib4RiskCategory === 'Wysokie') {
    alerts.push('ALARM HEPATOLOGICZNY: FIB-4 > 2,67 wskazuje na wysokie ryzyko zaawansowanego zwłóknienia F3–F4. Konieczna elastografia wątroby.');
  }

  return {
    bmi,
    bmiClass,
    idealWeightKg,
    excessWeightKg,
    bmrMifflin,
    bmrKatch,
    tdee,
    dailyDeficitKcal,
    adaptiveThermogenesisKcal,
    predictedWeight6m,
    predictedWeight12m,
    bariatricCandidate,
    bariatricIndicationReason,
    predictedEwlPct,
    predictedTbwlPct,
    t2dRemissionProbabilityPct,
    nutritionalDeficiencyRisks,
    ldlFriedewald,
    ldlSampson,
    friedewaldValid,
    nonHdl,
    remnantCholesterol,
    score2RiskPct,
    score2Category,
    targetLdl,
    achievedLdl,
    ldlGoalAchieved,
    fib4Score,
    fib4RiskCategory,
    alerts,
  };
}

export { defaultObesityInputs, obesityPresets, type ObesityPreset } from './obesity-simulator-presets.ts';

