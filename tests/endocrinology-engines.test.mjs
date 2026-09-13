import test from 'node:test';
import assert from 'node:assert/strict';

import {
  evaluateCortisolStatus,
  evaluatePrimaryAldosteronism,
  evaluatePheoSafety,
  evaluateIncidentaloma,
} from '../lib/endocrinology/adrenal/adrenal-reasoning-engine.ts';

import {
  calculateCorrectedCalcium,
  evaluateCCCR,
  evaluateHypoparathyroidismManagement,
  evaluateHungryBoneRisk,
} from '../lib/endocrinology/parathyroid/parathyroid-reasoning-engine.ts';

test('Adrenal Engine: HPA axis & morning cortisol interpretation', () => {
  // Clear adrenal insufficiency (< 3.0 ug/dl)
  const low = evaluateCortisolStatus({ morningCortisolUgDl: 2.5 });
  assert.equal(low.status, 'strongly_suggests_ai');
  assert.ok(low.actionRequired.includes('hydrokortyzonem'));

  // Indeterminate gray zone (3.0 - 18.0 ug/dl)
  const gray = evaluateCortisolStatus({ morningCortisolUgDl: 9.0 });
  assert.equal(gray.status, 'indeterminate_requires_acth_stim');
  assert.ok(gray.actionRequired.includes('Synacthen'));

  // Intact HPA (>= 18.0 ug/dl for immunoassay)
  const normal = evaluateCortisolStatus({ morningCortisolUgDl: 19.0 });
  assert.equal(normal.status, 'ai_unlikely');

  // Intact HPA with LC-MS/MS (>= 14.0 ug/dl)
  const lcms = evaluateCortisolStatus({ morningCortisolUgDl: 15.0, assayMethod: 'lc_ms_ms' });
  assert.equal(lcms.status, 'ai_unlikely');

  // Estrogen / CBG altered
  const cbg = evaluateCortisolStatus({ morningCortisolUgDl: 19.0, cbgAltered: true });
  assert.equal(cbg.status, 'invalid_sample');
  assert.ok(cbg.interpretation.includes('CBG'));

  // Synacthen test: passing adequate reserve
  const synPass = evaluateCortisolStatus({ morningCortisolUgDl: 9.0, synacthenPeakUgDl: 21.0 });
  assert.equal(synPass.synacthenResult, 'pass_adequate_reserve');

  // Synacthen test: acute secondary AI caveat (<4 weeks)
  const synAcute = evaluateCortisolStatus({
    morningCortisolUgDl: 9.0,
    synacthenPeakUgDl: 21.0,
    recentPituitaryEventWeeks: 2,
  });
  assert.equal(synAcute.synacthenResult, 'caveat_recent_secondary_ai_possible_false_negative');
});

test('Adrenal Engine: Primary Aldosteronism (Endocrine Society 2025)', () => {
  // Hypokalemia suppresses aldosterone causing false negative ARR
  const hypoK = evaluatePrimaryAldosteronism({
    aldosteroneNgDl: 18.0,
    reninType: 'drc_miu_l',
    reninValue: 2.0,
    potassiumMmolL: 3.2,
    medications: [],
  });
  assert.equal(hypoK.potassiumValid, false);
  assert.equal(hypoK.confirmatoryTestIndicated, 'invalid_until_prep');
  assert.ok(hypoK.medicationInterferences.some(i => i.includes('Hipokaliemia')));

  // MRA interference
  const mra = evaluatePrimaryAldosteronism({
    aldosteroneNgDl: 22.0,
    reninType: 'drc_miu_l',
    reninValue: 1.5,
    potassiumMmolL: 4.2,
    medications: ['mra'],
  });
  assert.equal(mra.confirmatoryTestIndicated, 'invalid_until_prep');
  assert.ok(mra.medicationInterferences.some(i => i.includes('spironolakton')));

  // Positive ARR with normokalemia requiring confirmatory testing
  const positiveArr = evaluatePrimaryAldosteronism({
    aldosteroneNgDl: 24.0,
    reninType: 'drc_miu_l',
    reninValue: 2.0,
    potassiumMmolL: 4.1,
    medications: [],
  });
  assert.equal(positiveArr.isArrPositive, true);
  assert.equal(positiveArr.confirmatoryTestIndicated, 'mandatory');

  // Endocrine Society 2025: Spontaneous hypokalemia + PAC >= 20 -> confirmatory test exempt
  const exempt = evaluatePrimaryAldosteronism({
    aldosteroneNgDl: 25.0,
    reninType: 'drc_miu_l',
    reninValue: 2.0,
    potassiumMmolL: 3.9,
    medications: [],
    spontaneousHypokalemia: true,
  });
  assert.equal(exempt.confirmatoryTestIndicated, 'not_needed_spontaneous_severe_pa');
  assert.ok(exempt.recommendation.includes('Endocrine Society 2025'));
});

test('Adrenal Engine: Pheochromocytoma hemodynamic safety', () => {
  // Beta blocker without alpha blocker -> LETHAL ALERT
  const dangerous = evaluatePheoSafety({
    normetanephrineFraction: 4.5,
    metanephrineFraction: 1.2,
    currentMedications: [],
    betaBlockerInitiated: true,
    alphaBlockerInitiated: false,
  });
  assert.ok(dangerous.safetyAlerts.some(a => a.includes('KRYTYCZNY BŁĄD BEZPIECZEŃSTWA')));

  // Planned biopsy/surgery without alpha blockade -> ABSOLUTELY CONTRAINDICATED
  const biopsyAlert = evaluatePheoSafety({
    normetanephrineFraction: 3.2,
    metanephrineFraction: 0.8,
    currentMedications: [],
    plannedSurgeryOrBiopsy: true,
    alphaBlockerInitiated: false,
  });
  assert.ok(biopsyAlert.safetyAlerts.some(a => a.includes('ABSOLUTNY ZAKAZ BIOPSJI')));

  // High probable pheo (>3x ULN)
  const highPheo = evaluatePheoSafety({
    normetanephrineFraction: 4.2,
    metanephrineFraction: 1.5,
    currentMedications: [],
    alphaBlockerInitiated: true,
    betaBlockerInitiated: true,
  });
  assert.equal(highPheo.suspicionLevel, 'high_probable_pheo');
  assert.equal(highPheo.safetyAlerts.length, 0);
});

test('Adrenal Engine: Incidentaloma & MACS risk tiers', () => {
  // Benign lipid-rich adenoma (<= 10 HU)
  const benign = evaluateIncidentaloma({
    sizeMm: 22,
    unenhancedHu: 6,
    postDstCortisolUgDl: 1.4,
  });
  assert.equal(benign.imagingCategory, 'benign_lipid_rich');
  assert.equal(benign.endocrineActivity, 'non_functioning');
  assert.equal(benign.surgicalCandidate, false);

  // MACS confirmed (> 5.0 ug/dL)
  const macsConfirmed = evaluateIncidentaloma({
    sizeMm: 35,
    unenhancedHu: 8,
    postDstCortisolUgDl: 6.2,
  });
  assert.equal(macsConfirmed.endocrineActivity, 'macs_confirmed');
  assert.equal(macsConfirmed.surgicalCandidate, true);

  // MACS possible (1.9 - 5.0 ug/dL)
  const macsPossible = evaluateIncidentaloma({
    sizeMm: 25,
    unenhancedHu: 9,
    postDstCortisolUgDl: 3.2,
  });
  assert.equal(macsPossible.endocrineActivity, 'macs_possible');

  // Malignant suspicion (>= 40 mm, > 10 HU)
  const malignant = evaluateIncidentaloma({
    sizeMm: 48,
    unenhancedHu: 25,
    postDstCortisolUgDl: 1.5,
  });
  assert.equal(malignant.imagingCategory, 'suspicious_malignant');
  assert.equal(malignant.surgicalCandidate, true);
});

test('Parathyroid Engine: Payne calcium correction', () => {
  // Hypoalbuminemia masking normal calcium
  const payne = calculateCorrectedCalcium({ totalCalciumMmolL: 2.05, albuminGPerL: 20 });
  assert.equal(payne.correctedCalciumMmolL, 2.45);
  assert.equal(payne.isHypocalcemic, false);
  assert.equal(payne.isHypercalcemic, false);

  // Ionized calcium override
  const ionized = calculateCorrectedCalcium({
    totalCalciumMmolL: 2.05,
    albuminGPerL: 20,
    ionizedCalciumMmolL: 1.40,
  });
  assert.equal(ionized.referenceMethod, 'measured_ionized');
  assert.equal(ionized.isHypercalcemic, true);
});

test('Parathyroid Engine: CCCR & FHH vs PHPT differential', () => {
  // Clear FHH (CCCR < 0.010 without confounders)
  const fhh = evaluateCCCR({
    serumCalciumMmolL: 2.70,
    serumCreatinineUmolL: 80, // 0.08 mmol/L
    urineCalcium24hMmolL: 1.2,
    urineCreatinine24hMmolL: 8.0,
    vitaminD25OhNgMl: 35,
  });
  assert.ok(fhh.cccr < 0.010);
  assert.equal(fhh.classification, 'fhh_more_likely');
  assert.ok(fhh.recommendedAction.includes('CASR'));

  // Overlap zone (0.010 - 0.020)
  const overlap = evaluateCCCR({
    serumCalciumMmolL: 2.75,
    serumCreatinineUmolL: 80,
    urineCalcium24hMmolL: 4.2,
    urineCreatinine24hMmolL: 8.0,
    vitaminD25OhNgMl: 32,
  });
  assert.equal(overlap.classification, 'overlap_zone');
  assert.ok(overlap.clinicalInterpretation.includes('strefie nakładania'));

  // PHPT (CCCR > 0.020)
  const phpt = evaluateCCCR({
    serumCalciumMmolL: 2.85,
    serumCreatinineUmolL: 80,
    urineCalcium24hMmolL: 7.5,
    urineCreatinine24hMmolL: 8.0,
  });
  assert.equal(phpt.classification, 'phpt_more_likely');

  // Vitamin D deficiency confounder
  const vitDConfounder = evaluateCCCR({
    serumCalciumMmolL: 2.70,
    serumCreatinineUmolL: 80,
    urineCalcium24hMmolL: 1.0,
    urineCreatinine24hMmolL: 8.0,
    vitaminD25OhNgMl: 12,
  });
  assert.ok(vitDConfounder.confoundersDetected.some(c => c.includes('Niedobór witaminy D')));
});

test('Parathyroid Engine: Hypoparathyroidism management (ESE 2025)', () => {
  // Optimal control: lower normal limit (2.00 - 2.20 mmol/L) without symptoms
  const good = evaluateHypoparathyroidismManagement({
    serumCalciumMmolL: 2.08,
    serumPhosphateMmolL: 1.35,
    urineCalcium24hMmolDay: 5.5,
    hasParesthesiasOrTetany: false,
    calcitriolMicrogDay: 0.5,
    calciumElementalMgDay: 1000,
  });
  assert.equal(good.targetMet, true);
  assert.ok(good.treatmentAdjustment.includes('Leczenie optymalne'));

  // Symptomatic hypocalcemia
  const hypo = evaluateHypoparathyroidismManagement({
    serumCalciumMmolL: 1.85,
    serumPhosphateMmolL: 1.55,
    urineCalcium24hMmolDay: 3.5,
    hasParesthesiasOrTetany: true,
    calcitriolMicrogDay: 0.5,
    calciumElementalMgDay: 1000,
  });
  assert.equal(hypo.targetMet, false);
  assert.ok(hypo.safetyAlerts.some(a => a.includes('Objawowa hipokalcemia')));

  // Hypercalciuria with risk of nephrocalcinosis
  const nephro = evaluateHypoparathyroidismManagement({
    serumCalciumMmolL: 2.35,
    serumPhosphateMmolL: 1.45,
    urineCalcium24hMmolDay: 8.8,
    hasParesthesiasOrTetany: false,
    calcitriolMicrogDay: 1.0,
    calciumElementalMgDay: 1500,
  });
  assert.ok(nephro.safetyAlerts.some(a => a.includes('Zbyt wysokie stężenie wapnia')));
  assert.ok(nephro.safetyAlerts.some(a => a.includes('Hiperkalciuria 24h')));
});

test('Parathyroid Engine: Hungry Bone Syndrome risk score', () => {
  // High risk (preop Ca >= 3.0, PTH > 300, ALP > 200, age > 60, adenoma >= 25mm)
  const highRisk = evaluateHungryBoneRisk({
    preopCalciumMmolL: 3.15,
    preopPthPgMl: 650,
    alkalinePhosphataseUPerL: 380,
    adenomaSizeMm: 30,
    patientAge: 65,
  });
  assert.equal(highRisk.riskScore, 'high');
  assert.equal(highRisk.expectedNadirDaysPostop, '2–4 doba po operacji');
  assert.ok(highRisk.prophylacticStrategy.includes('agresywną suplementację'));

  // Low risk
  const lowRisk = evaluateHungryBoneRisk({
    preopCalciumMmolL: 2.65,
    preopPthPgMl: 120,
    alkalinePhosphataseUPerL: 85,
    adenomaSizeMm: 12,
    patientAge: 35,
  });
  assert.equal(lowRisk.riskScore, 'low');
  assert.equal(lowRisk.expectedNadirDaysPostop, '1–2 doba po operacji');
});
