/**
 * Silnik obliczeniowy farmakokinetyki i receptorologii psychiatrycznej
 * Zgodny z AGNP Consensus 2026, wytycznymi CPIC i modelami Kapura / Meyera
 */

export interface LithiumCalculationResult {
  dailyDoseMg: number;
  dailyDoseMmol: number;
  estimatedClearanceLPerH: number;
  steadyStateTroughMmolL: number;
  status: 'subtherapeutic' | 'optimal_maintenance' | 'acute_mania' | 'warning' | 'toxic' | 'critical';
  statusLabel: string;
  recommendation: string;
  renalRiskIndex: 'low' | 'moderate' | 'high';
}

/**
 * Oblicza przewidywane stężenie litu w punkcie 12h po dawce (trough)
 * 1 tabletka 250 mg węglanu litu (Li2CO3) = ok. 6.77 mmol Li+
 */
export function calculateLithiumLevel(
  dailyDoseMg: number,
  weightKg: number,
  eGfr: number,
  age: number
): LithiumCalculationResult {
  const validDose = Math.max(100, Math.min(2500, dailyDoseMg || 750));
  const validWeight = Math.max(40, Math.min(150, weightKg || 70));
  const validEgfr = Math.max(15, Math.min(150, eGfr || 90));
  const validAge = Math.max(18, Math.min(100, age || 40));

  // 1 g Li2CO3 = 27.1 mmol Li+ (MW = 73.89 g/mol, 2 atomy Li)
  const dailyDoseMmol = (validDose / 1000) * 27.07;

  // Klirens litu (CL_Li) jest w ok. 20-25% klirensu kłębuszkowego (reszta ulega reabsorpcji w cewce bliższej)
  // Normalny CL_Li wynosi ok. 15-35 ml/min (0.9 - 2.1 L/h)
  const renalFactor = (validEgfr / 100) * (validWeight / 70);
  const ageFactor = validAge > 65 ? 0.85 : 1.0;
  const estimatedClearanceLPerH = 1.35 * renalFactor * ageFactor;

  // Css_avg = Dawka_dobowa / (CL * 24)
  // Stężenie 12h po dawce wieczornej jest zbliżone do średniego stężenia z nieznacznym spadkiem
  const steadyStateTroughMmolL = Number((dailyDoseMmol / (estimatedClearanceLPerH * 24)).toFixed(2));

  let status: LithiumCalculationResult['status'] = 'optimal_maintenance';
  let statusLabel = 'Optymalne stężenie podtrzymujące (0,6–0,8 mmol/l)';
  let recommendation = 'Kontynuuj dawkę. Kontrola TDM (12h po dawce), kreatyniny, eGFR i TSH za 3–6 miesięcy.';

  if (steadyStateTroughMmolL < 0.5) {
    status = 'subtherapeutic';
    statusLabel = 'Stężenie subterapeutyczne (<0,5 mmol/l)';
    recommendation = 'Wysokie ryzyko nawrotu manii lub depresji. Rozważ stopniowe zwiększenie dawki o 250 mg pod kontrolą TDM.';
  } else if (steadyStateTroughMmolL <= 0.8) {
    status = 'optimal_maintenance';
    statusLabel = 'Złoty standard podtrzymujący (0,6–0,8 mmol/l)';
    recommendation = 'Najlepszy bilans skuteczności antyautodestrukcyjnej i profilaktycznej ChAD oraz ochrony nerek.';
  } else if (steadyStateTroughMmolL <= 1.0) {
    status = 'acute_mania';
    statusLabel = 'Przedział ostrej manii (0,8–1,0 mmol/l)';
    recommendation = 'Adekwatne w ostrej fazie pobudzenia maniakalnego. Po stabilizacji zredukuj do 0,6–0,8 mmol/l.';
  } else if (steadyStateTroughMmolL <= 1.2) {
    status = 'warning';
    statusLabel = 'Strefa ostrzegawcza (1,0–1,2 mmol/l)';
    recommendation = 'Zwiększone ryzyko wczesnej neurotoksyczności (drżenie rąk, poliuria). Zredukuj dawkę o 250 mg.';
  } else if (steadyStateTroughMmolL < 2.0) {
    status = 'toxic';
    statusLabel = 'Toksyczność umiarkowana / ciężka (1,2–2,0 mmol/l)';
    recommendation = 'Wstrzymaj lit! Objawy: ataksja, bełkotliwa mowa, nudności. Wdrożenie intensywnego nawadniania i.v. NaCl 0,9%.';
  } else {
    status = 'critical';
    statusLabel = 'Zatrucie zagrażające życiu (≥2,0 mmol/l)';
    recommendation = 'Stan bezpośredniego zagrożenia życia! Pilna kwalifikacja do hemodializy. Ryzyko trwałego zespołu SILENT.';
  }

  const renalRiskIndex = validEgfr < 45 ? 'high' : validEgfr < 60 ? 'moderate' : 'low';

  return {
    dailyDoseMg: validDose,
    dailyDoseMmol: Number(dailyDoseMmol.toFixed(1)),
    estimatedClearanceLPerH: Number(estimatedClearanceLPerH.toFixed(2)),
    steadyStateTroughMmolL,
    status,
    statusLabel,
    recommendation,
    renalRiskIndex,
  };
}

export interface D2OccupancyModel {
  drugId: string;
  drugName: string;
  doseMg: number;
  d2OccupancyPercent: number;
  therapeuticZone: 'subtherapeutic' | 'optimal' | 'high_eps_risk';
  prolactinRisk: 'low' | 'moderate' | 'high';
  clinicalNote: string;
}

/**
 * Model hiperboliczny saturacji receptorów D2 w prążkowiu (Kapur / Meyer PET)
 * Occ = (Dose / (ED50 + Dose)) * 100%
 */
export function calculateD2Occupancy(drugId: string, doseMg: number): D2OccupancyModel {
  const ed50Map: Record<string, { ed50: number; name: string; prolactin: 'low' | 'moderate' | 'high' }> = {
    haloperidol: { ed50: 1.6, name: 'Haloperidol (FGA)', prolactin: 'high' },
    risperidone: { ed50: 1.4, name: 'Risperidon (SGA)', prolactin: 'high' },
    olanzapine: { ed50: 7.2, name: 'Olanzapina (SGA)', prolactin: 'moderate' },
    aripiprazole: { ed50: 3.5, name: 'Aripiprazol (częściowy agonista)', prolactin: 'low' },
    quetiapine: { ed50: 180, name: 'Kwetiapina (szybka dysocjacja)', prolactin: 'low' },
  };

  const config = ed50Map[drugId] || ed50Map.risperidone;
  const safeDose = Math.max(0, doseMg);
  const occupancy = safeDose > 0 ? (safeDose / (config.ed50 + safeDose)) * 100 : 0;
  const roundedOcc = Math.min(96, Math.round(occupancy));

  let zone: D2OccupancyModel['therapeuticZone'] = 'optimal';
  let clinicalNote = 'Przedział optymalny (65–80% D2 occupancy): kontrola psychozy bez istotnych objawów pozapiramidowych.';

  if (roundedOcc < 65) {
    zone = 'subtherapeutic';
    clinicalNote = 'Zajęcie D2 <65%: niewystarczająca blokada szlaku mezolimbicznego do pełnej kontroli omamów i urojeń.';
  } else if (roundedOcc > 80) {
    zone = 'high_eps_risk';
    clinicalNote = 'Zajęcie D2 >80%: drastyczny wzrost ryzyka parkinsonizmu polekowego, ostrej dystonii i akatyzacji.';
  }

  // Aripiprazol jako częściowy agonista toleruje 85-95% occupancy bez EPS
  if (drugId === 'aripiprazole' && roundedOcc > 80) {
    clinicalNote = 'Jako częściowy agonista D2 aripiprazol wysyca >85% receptorów zachowując wewnętrzną aktywność (~30%), co chroni przed EPS.';
    zone = 'optimal';
  }

  return {
    drugId,
    drugName: config.name,
    doseMg: safeDose,
    d2OccupancyPercent: roundedOcc,
    therapeuticZone: zone,
    prolactinRisk: config.prolactin,
    clinicalNote,
  };
}

export interface QtcRiskAssessment {
  rawQtMs: number;
  heartRateBpm: number;
  calculatedQtcMs: number;
  riskCategory: 'normal' | 'borderline' | 'prolonged' | 'critical';
  recommendation: string;
}

/**
 * Kalkulator korekty QTc wzorem Fridericia (zalecany kardiologicznie) i ocena CredibleMeds
 * QTcF = QT / (RR)^(1/3) = QT / (60 / HR)^(1/3)
 */
export function evaluateQtcRisk(rawQtMs: number, heartRateBpm: number, isFemale = false): QtcRiskAssessment {
  const hr = Math.max(40, Math.min(180, heartRateBpm || 70));
  const qt = Math.max(250, Math.min(700, rawQtMs || 400));
  const rrSeconds = 60 / hr;
  const calculatedQtcMs = Math.round(qt / Math.cbrt(rrSeconds));

  const upperNormal = isFemale ? 460 : 450;
  const prolongedThreshold = isFemale ? 470 : 460;

  let riskCategory: QtcRiskAssessment['riskCategory'] = 'normal';
  let recommendation = 'QTc w normie klinicznej. Brak przeciwwskazań elektrokardiograficznych do leczenia.';

  if (calculatedQtcMs >= 500) {
    riskCategory = 'critical';
    recommendation = 'KRYTYCZNE wydłużenie QTc (≥500 ms): natychmiastowa redukcja lub odstawienie leków z listy Known TdP, badanie K+ i Mg2+, telemetria.';
  } else if (calculatedQtcMs >= prolongedThreshold) {
    riskCategory = 'prolonged';
    recommendation = 'Wydłużone QTc: unikaj leków o wysokim ryzyku (citalopram, escitalopram, haloperidol, amisulpryd). Skoryguj hipokaliemię.';
  } else if (calculatedQtcMs >= upperNormal) {
    riskCategory = 'borderline';
    recommendation = 'Wartość graniczna: zalecana ostrożność przy dołączaniu inhibitorów CYP lub drugiego leku wydłużającego QTc.';
  }

  return {
    rawQtMs: qt,
    heartRateBpm: hr,
    calculatedQtcMs,
    riskCategory,
    recommendation,
  };
}
