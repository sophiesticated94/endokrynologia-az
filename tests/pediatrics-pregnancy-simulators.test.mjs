import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateHeightSds,
  calculateTargetHeight,
  evaluateGrowthVelocity,
  evaluatePredictedAdultHeight,
  evaluateGnRhAxis,
  generateScenarioTrajectory,
} from '../lib/pediatrics-growth-engine.ts';
import {
  calculateGestationalProfile,
  evaluateOgtt75g,
  evaluateNeonatalTransition,
} from '../lib/pregnancy-endocrine-engine.ts';

test('Pediatrics: Target Height (Herman / Tanner mid-parental height) calculation', () => {
  // Father 180 cm, Mother 166 cm
  // Boy: (180 + 166 + 13) / 2 = 359 / 2 = 179.5 cm
  const boyTh = calculateTargetHeight(180, 166, 'M');
  assert.equal(boyTh.targetHeightCm, 179.5);
  assert.equal(boyTh.lowerLimitCm, 171.0);
  assert.equal(boyTh.upperLimitCm, 188.0);
  assert.equal(boyTh.evidenceTier, 'EBM-norm');

  // Girl: (180 + 166 - 13) / 2 = 333 / 2 = 166.5 cm
  const girlTh = calculateTargetHeight(180, 166, 'K');
  assert.equal(girlTh.targetHeightCm, 166.5);
  assert.equal(girlTh.lowerLimitCm, 158.0);
  assert.equal(girlTh.upperLimitCm, 175.0);
});

test('Pediatrics: Height SDS calculation and classification', () => {
  // 8-year-old boy: mean ~128.0 cm, SD ~5.4 cm
  const normalBoy = calculateHeightSds(8.0, 'M', 128.0);
  assert.equal(normalBoy.sds, 0.0);
  assert.equal(normalBoy.centile, '50. centyl');

  // Severe short stature: < -2.0 SDS (< 3. centyla)
  const shortBoy = calculateHeightSds(8.0, 'M', 112.0);
  assert.ok(shortBoy.sds < -2.5);
  assert.equal(shortBoy.centile, '< 3. centyla (niskorosłość)');
});

test('Pediatrics: Growth Velocity and GnRH Axis evaluation', () => {
  // Current 114 cm, prev 111 cm in 12 months = 3.0 cm/year -> subnormal for child before puberty
  const slowGrowth = evaluateGrowthVelocity(114.0, 111.0, 12, 7.0);
  assert.equal(slowGrowth.velocityCmPerYear, 3.0);
  assert.equal(slowGrowth.evaluation, 'zwolnione');

  // GnRH test: peak LH > 5.0 IU/l indicates central precocious puberty
  const cppAxis = evaluateGnRhAxis(0.8, 12.0);
  assert.equal(cppAxis.status, 'aktywacja_centralna');

  // Prepubertal axis: basal LH low, peak < 5.0
  const prepubertal = evaluateGnRhAxis(0.1, 1.8);
  assert.equal(prepubertal.status, 'prepubertalna');
});

test('Pediatrics: Scenario trajectories generation', () => {
  const ghdTraj = generateScenarioTrajectory('GHD', 8.0, 114.0, 'M');
  assert.equal(ghdTraj.length, 11);
  for (const pt of ghdTraj) {
    assert.ok(pt.lowerRangeCm <= pt.medianHeightCm);
    assert.ok(pt.medianHeightCm <= pt.upperRangeCm);
    assert.ok(pt.patientUntreatedCm <= pt.patientTreatedCm);
  }
});

test('Pregnancy: 0-40 weeks hormone trajectory & physiological peaks', () => {
  // Week 10: peak hCG
  const w10 = calculateGestationalProfile(10);
  assert.equal(w10.trimester, 1);
  assert.ok(w10.hormones.hcg.value >= 70000);
  assert.ok(w10.hormones.tsh.value <= 1.0, 'TSH dip due to hCG cross-activation');

  // Week 36: high hPL, marked drop in insulin sensitivity Si
  const w36 = calculateGestationalProfile(36);
  assert.equal(w36.trimester, 3);
  assert.ok(w36.hormones.hpl.value >= 5.0);
  assert.ok(w36.insulinSensitivitySiPercent <= 55, 'Insulin sensitivity drops by ~50-60% in 3rd trimester');

  // Postpartum (week 41): rapid clearing of hPL and recovery of Si
  const w41 = calculateGestationalProfile(41);
  assert.equal(w41.trimester, 4);
  assert.equal(w41.insulinSensitivitySiPercent, 100);
  assert.ok(w41.hormones.hcg.value <= 10);
});

test('Pregnancy: OGTT 75g IADPSG / WHO / PTD diagnostic classification', () => {
  // Normal tolerance
  const normal = evaluateOgtt75g({ fastingGlucose: 85, oneHourGlucose: 135, twoHourGlucose: 120, gestationalWeek: 24 });
  assert.equal(normal.diagnosis, 'Prawidłowa tolerancja glukozy');
  assert.equal(normal.severity, 'norma');
  assert.equal(normal.pointsExceeded, 0);

  // GDM based on fasting glucose >= 92 mg/dl
  const gdmFasting = evaluateOgtt75g({ fastingGlucose: 94, oneHourGlucose: 140, twoHourGlucose: 110, gestationalWeek: 24 });
  assert.equal(gdmFasting.diagnosis, 'Cukrzyca ciążowa (GDM)');
  assert.equal(gdmFasting.severity, 'gdm');
  assert.equal(gdmFasting.pointsExceeded, 1);
  assert.equal(gdmFasting.fasting.elevated, true);

  // GDM based on 2-hour glucose >= 153 mg/dl
  const gdm2h = evaluateOgtt75g({ fastingGlucose: 88, oneHourGlucose: 160, twoHourGlucose: 156, gestationalWeek: 26 });
  assert.equal(gdm2h.diagnosis, 'Cukrzyca ciążowa (GDM)');
  assert.equal(gdm2h.severity, 'gdm');
  assert.equal(gdm2h.twoHour.elevated, true);

  // Overt diabetes in pregnancy: fasting >= 126 mg/dl
  const overt = evaluateOgtt75g({ fastingGlucose: 130, oneHourGlucose: 210, twoHourGlucose: 195, gestationalWeek: 12 });
  assert.equal(overt.diagnosis, 'Jawna cukrzyca w ciąży (Overt diabetes)');
  assert.equal(overt.severity, 'jawna');
});

test('Pregnancy: Neonatal transition risk evaluations', () => {
  const severeGdm = evaluateNeonatalTransition({
    isGdmOrPgdm: true,
    maternalHba1c: 8.0,
    maternalPhpt: false,
    maternalGravesTrabPositive: false,
  });
  assert.equal(severeGdm.riskHypoglycemia, 'bardzo wysokie');
  assert.equal(severeGdm.fetalHyperinsulinism, true);

  const phptMother = evaluateNeonatalTransition({
    isGdmOrPgdm: false,
    maternalPhpt: true,
    maternalGravesTrabPositive: false,
  });
  assert.equal(phptMother.riskNeonatalTetany, 'wysokie (matczyna hiperkalcemia)');
  assert.equal(phptMother.tshSurgeExpectedMax, 70);
});
