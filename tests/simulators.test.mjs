import test from 'node:test';
import assert from 'node:assert/strict';
import { lessons } from '../lib/course.ts';
import { calculateHormones, presets, defaultState, simulatorLegend } from '../lib/simulator.ts';
import { calculatePituitaryState, pituitaryPresets, defaultPituitaryState } from '../lib/pituitary-simulator.ts';
import { calculateAdrenalState, adrenalPresets, defaultAdrenalState } from '../lib/adrenal-simulator.ts';
import { calculateParathyroidState, parathyroidPresets, defaultParathyroidState } from '../lib/parathyroid-simulator.ts';
import { calculateDiabetesState, diabetesPresets, defaultDiabetesState } from '../lib/diabetes-simulator.ts';
import { calculateGonadState, calculateVermeulen, GONAD_PRESETS, initialGonadState } from '../lib/gonad-simulator.ts';
import { calculateNenState, initialNenState, NEN_PRESETS } from '../lib/nen-simulator.ts';
import { calculateObesityState, defaultObesityInputs, obesityPresets } from '../lib/obesity-simulator.ts';


test('HPT axis simulation model accurately reflects negative feedback and clinical phenotypes', () => {
  const euthyroid = calculateHormones(defaultState);
  assert.ok(euthyroid.tsh >= 0.4 && euthyroid.tsh <= 4.0);
  assert.ok(euthyroid.ft4 >= 12.0 && euthyroid.ft4 <= 22.0);
  assert.equal(euthyroid.alertType, 'normal');

  const hashimotoPreset = presets.find(p => p.id === 'hashimoto_unmanaged');
  const hashimoto = calculateHormones(hashimotoPreset.state);
  assert.ok(hashimoto.tsh > 4.0, 'TSH should be elevated');
  assert.ok(hashimoto.ft4 < 12.0, 'FT4 should be low');
  assert.equal(hashimoto.alertType, 'danger');
  assert.match(hashimoto.status, /Jawna pierwotna niedoczynność/);

  const treatedHashimoto = presets.find(p => p.id === 'hashimoto_managed');
  const treated = calculateHormones(treatedHashimoto.state);
  assert.ok(treated.tsh >= 0.4 && treated.tsh <= 4.0, 'TSH normalized on LT4 substitution');
  assert.ok(treated.ft4 >= 12.0 && treated.ft4 <= 22.0, 'FT4 normalized on LT4 substitution');
  assert.equal(treated.alertType, 'normal');

  const gravesPreset = presets.find(p => p.id === 'graves');
  const graves = calculateHormones(gravesPreset.state);
  assert.ok(graves.tsh < 0.4, 'TSH should be suppressed');
  assert.ok(graves.ft4 > 22.0, 'FT4 should be elevated');
  assert.equal(graves.alertType, 'danger');
  assert.match(graves.status, /Jawna nadczynność/);

  const centralPreset = presets.find(p => p.id === 'central_hypo');
  const central = calculateHormones(centralPreset.state);
  assert.ok(central.ft4 < 12.0, 'FT4 is low in secondary hypothyroidism');
  assert.ok(central.tsh <= 4.0, 'TSH is inappropriately normal or low');
  assert.equal(central.alertType, 'danger');
  assert.match(central.status, /Wtórna \(przysadkowa\) niedoczynność/);

  const overdosePreset = presets.find(p => p.id === 'overdose_lt4');
  const overdose = calculateHormones(overdosePreset.state);
  assert.ok(overdose.tsh < 0.4, 'TSH suppressed due to excess exogenous LT4');
  assert.ok(overdose.ft4 > 22.0, 'FT4 high due to overdose');
  assert.match(overdose.status, /Jatrogenna \(polekowa\) tyreotoksykoza/);
});

test('simulator legend covers all state sliders, hormones and valid curriculum lessons', () => {
  const paramIds = new Set(simulatorLegend.parameters.map(p => p.id));
  for (const key of Object.keys(defaultState)) {
    assert.ok(paramIds.has(key), 'missing legend entry for: ' + key);
  }
  for (const p of simulatorLegend.parameters) {
    assert.ok(p.title && p.title.length > 5);
    assert.ok(p.badge && p.badge.length > 3);
    assert.ok(p.description && p.description.length > 40);
  }
  assert.deepEqual(simulatorLegend.hormones.map(h => h.id), ['tsh', 'ft4', 'ft3']);
  for (const h of simulatorLegend.hormones) {
    assert.ok(h.normalRange && h.normalRange.length > 3);
    assert.ok(h.description && h.description.length > 30);
  }
  assert.ok(simulatorLegend.curriculum.length >= 4);
  for (const step of simulatorLegend.curriculum) {
    assert.ok(lessons.some(l => l.id === step.lessonId), 'curriculum step points to invalid lesson: ' + step.lessonId);
    assert.ok(step.title && step.focus && step.tag);
  }
  const currentStep = simulatorLegend.curriculum.find(s => s.isCurrent);
  assert.ok(currentStep, 'curriculum should highlight embedded simulator lesson');
  assert.equal(currentStep.lessonId, 'diagnostyka');
});

test('pituitary simulator model accurately reflects hormone axes, dynamic testing and visual fields', () => {
  const healthy = calculatePituitaryState(defaultPituitaryState);
  assert.equal(healthy.alertType, 'normal');
  assert.equal(healthy.visualFieldDefect, 'none');
  assert.ok(healthy.prl < 25);
  assert.ok(healthy.serumSodium >= 135 && healthy.serumSodium <= 145);

  // Prolactinoma preset
  const prolactinomaP = pituitaryPresets.find(p => p.id === 'prolactinoma_micro');
  const prolactinoma = calculatePituitaryState(prolactinomaP.state);
  assert.ok(prolactinoma.prl > 50, 'PRL should be significantly elevated in prolactinoma');
  assert.equal(prolactinoma.alertType, 'danger');
  const treatedProlactinoma = calculatePituitaryState({ ...prolactinomaP.state, cabergolineMg: 1.5 });
  assert.ok(treatedProlactinoma.prl < prolactinoma.prl, 'Cabergoline lowers PRL');

  // Acromegaly OGTT dynamic test
  const acromegalyP = pituitaryPresets.find(p => p.id === 'acromegaly_active');
  const acroBasal = calculatePituitaryState(acromegalyP.state);
  assert.ok(acroBasal.gh > 2.0 && acroBasal.igf1 > 350, 'High basal GH and IGF-1 in acromegaly');
  const acroOgtt = calculatePituitaryState({ ...acromegalyP.state, glucoseLoadG: 75 });
  assert.ok(acroOgtt.gh >= 1.0, 'GH fails to suppress <1.0 in acromegaly OGTT');
  const healthyOgtt = calculatePituitaryState({ ...defaultPituitaryState, glucoseLoadG: 75 });
  assert.ok(healthyOgtt.gh < 0.4, 'GH suppresses <0.4 in healthy OGTT');

  // Cushing overnight 1 mg DEX test
  const cushingP = pituitaryPresets.find(p => p.id === 'cushing_disease');
  const cushingBasal = calculatePituitaryState(cushingP.state);
  assert.ok(cushingBasal.cortisol > 20 && cushingBasal.acth > 50);
  const cushingDex = calculatePituitaryState({ ...cushingP.state, dexamethasoneMg: 1 });
  assert.ok(cushingDex.cortisol > 1.8, 'Cortisol fails to suppress <1.8 in Cushing');
  const healthyDex = calculatePituitaryState({ ...defaultPituitaryState, dexamethasoneMg: 1 });
  assert.ok(healthyDex.cortisol < 1.8, 'Cortisol suppresses <1.8 in healthy DEX test');

  // NFPA with suprasellar extension and bitemporal hemianopsia
  const nfpaP = pituitaryPresets.find(p => p.id === 'nfpa_chiasm');
  const nfpa = calculatePituitaryState(nfpaP.state);
  assert.equal(nfpa.visualFieldDefect, 'bitemporal_hemianopsia');
  assert.equal(nfpa.chiasmCompressed, true);
  assert.match(nfpa.comment, /dekompresji neurochirurgicznej/);

  // Central DI & dDAVP test
  const diP = pituitaryPresets.find(p => p.id === 'central_di');
  const diBasal = calculatePituitaryState(diP.state);
  assert.ok(diBasal.urineOsmolality < 300, 'Hypoosmolar urine in DI');
  assert.ok(diBasal.urineVolumeL > 5.0, 'Polyuria in DI');
  const diTreated = calculatePituitaryState({ ...diP.state, desmopressinMcg: 2 });
  assert.ok(diTreated.urineOsmolality > diBasal.urineOsmolality * 1.5, 'Osmolality increases >50% after dDAVP');

  // SIADH
  const siadhP = pituitaryPresets.find(p => p.id === 'siadh_euvolemic');
  const siadh = calculatePituitaryState(siadhP.state);
  assert.ok(siadh.serumSodium < 130, 'Hyponatremia in SIADH');
  assert.ok(siadh.urineOsmolality > 300, 'Inappropriately concentrated urine in SIADH');
  assert.match(siadh.comment, /8–10 mmol\/l\/24h/);
});

test('adrenal simulator model accurately reflects steroidogenesis, RAA axis, pheo hemodynamics, CT washout, and crisis resuscitation', () => {
  // 1. Healthy baseline
  const healthy = calculateAdrenalState(defaultAdrenalState);
  assert.equal(healthy.alertType, 'normal');
  assert.ok(healthy.cortisol >= 10 && healthy.cortisol <= 20);
  assert.ok(healthy.serumPotassium >= 3.5 && healthy.serumPotassium <= 5.0);
  assert.ok(healthy.serumSodium >= 135 && healthy.serumSodium <= 145);
  assert.ok(healthy.systolicBp >= 110 && healthy.systolicBp <= 130);

  // 2. Addison disease preset (Primary Adrenal Insufficiency)
  const addisonP = adrenalPresets.find(p => p.id === 'addison_unmanaged');
  const addison = calculateAdrenalState(addisonP.state);
  assert.ok(addison.cortisol < 5, 'Cortisol must be very low in Addison');
  assert.ok(addison.aldosterone < 5, 'Aldosterone is deficient in primary AI');
  assert.ok(addison.serumPotassium > 5.0, 'Hyperkalemia in Addison disease');
  assert.ok(addison.serumSodium < 135, 'Hyponatremia in Addison disease');
  assert.equal(addison.alertType, 'danger');

  // 3. WPN 21-OH enzyme block
  const wpnP = adrenalPresets.find(p => p.id === 'wpn_classic');
  const wpn = calculateAdrenalState(wpnP.state);
  assert.ok(wpn.ohp17 > 10, '17-OHP heavily accumulates in 21-OH deficiency');
  assert.ok(wpn.dheaS > 400, 'Androgen precursors shunt and rise in 21-OH block');
  assert.ok(wpn.cortisol < 10, 'Cortisol synthesis blocked');
  assert.equal(wpn.alertType, 'danger');

  // 4. Conn syndrome (Primary Aldosteronism)
  const connP = adrenalPresets.find(p => p.id === 'conn_syndrome_apa');
  const conn = calculateAdrenalState(connP.state);
  assert.ok(conn.aldosterone > 20, 'Aldosterone is autonomously high in Conn');
  assert.ok(conn.plasmaReninDrc < 3.0, 'Plasma renin is suppressed');
  assert.ok(conn.arr > 10, 'Aldosterone-to-renin ratio (ARR) is positive');
  assert.ok(conn.serumPotassium < 4.0, 'Hypokalemia in Conn syndrome');
  assert.ok(conn.avsDominantGradient > 4.0, 'Lateralization in AVS');

  // 5. Pheochromocytoma: dangerous uninhibited beta blockade vs safe alpha blockade
  const pheoP = adrenalPresets.find(p => p.id === 'pheo_unpposed_beta_error');
  const dangerousPheo = calculateAdrenalState(pheoP.state);
  assert.ok(dangerousPheo.hemodynamicWarning, 'Must flag fatal uninhibited alpha vasoconstriction when beta blocker given without alpha blocker');
  assert.equal(dangerousPheo.alertType, 'danger');
  assert.match(dangerousPheo.hemodynamicWarning, /BŁĄD/);

  // Safe alpha blockade
  const safePheo = calculateAdrenalState({
    ...pheoP.state,
    alphaBlockerDoxazosinMg: 8,
  });
  assert.equal(safePheo.hemodynamicWarning, undefined, 'Safe when alpha blocker is present');
  assert.ok(safePheo.systolicBp < dangerousPheo.systolicBp, 'Blood pressure controlled under alpha blockade');

  // 6. CT washout calculator per ESE 2023 guidelines
  const adenomaWashout = calculateAdrenalState({
    ...defaultAdrenalState,
    mode: 'incidentaloma_ct',
    ctNativeHu: 6,
    ctVenousHu: 80,
    ctDelayedHu: 26,
  });
  assert.ok(adenomaWashout.ctApwPercent > 60, 'Absolute washout >60% indicates lipid-poor adenoma');
  assert.equal(adenomaWashout.alertType, 'normal');

  const malignantWashout = calculateAdrenalState({
    ...defaultAdrenalState,
    mode: 'incidentaloma_ct',
    ctNativeHu: 38,
    ctVenousHu: 95,
    ctDelayedHu: 79,
  });
  assert.ok(malignantWashout.ctApwPercent < 60, 'Absolute washout <60% is non-adenoma / suspicious');
  assert.equal(malignantWashout.alertType, 'danger');

  // 7. Resuscitation protocol in adrenal crisis
  const unmanagedCrisis = calculateAdrenalState({
    ...defaultAdrenalState,
    mode: 'crisis_resuscitation',
    crisisBolusGiven: false,
    salineResuscitationLiters: 0,
  });
  assert.equal(unmanagedCrisis.alertType, 'danger');

  const treatedCrisis = calculateAdrenalState({
    ...defaultAdrenalState,
    mode: 'crisis_resuscitation',
    crisisBolusGiven: true,
    salineResuscitationLiters: 2,
  });
  assert.equal(treatedCrisis.alertType, 'warning');
  assert.ok(treatedCrisis.systolicBp > unmanagedCrisis.systolicBp);
  assert.ok(treatedCrisis.cortisol > 40);
});

test('parathyroid simulation model accurately computes Ca-P-PTH axis, CCCR, QTc, and emergency protocols', () => {
  // 1. Healthy state
  const healthy = calculateParathyroidState(defaultParathyroidState);
  assert.ok(healthy.correctedCalciumMgDl >= 8.5 && healthy.correctedCalciumMgDl <= 10.5, 'Corrected Ca in mg/dl normal');
  assert.ok(healthy.ionizedCalciumMmol >= 1.15 && healthy.ionizedCalciumMmol <= 1.32, 'Ionized Ca in mmol/l normal');
  assert.ok(healthy.serumPhosphateMgDl >= 2.5 && healthy.serumPhosphateMgDl <= 4.5, 'Phosphate normal');
  assert.ok(healthy.intactPthPgMl >= 15 && healthy.intactPthPgMl <= 65, 'PTH normal');
  assert.ok(healthy.qtcIntervalMs <= 430, 'Normal QTc');
  assert.equal(healthy.alertType, 'normal');

  // 2. Primary Hyperparathyroidism (PHPT)
  const phptP = parathyroidPresets.find(p => p.id === 'phpt_adenoma');
  const phpt = calculateParathyroidState(phptP.state);
  assert.ok(phpt.correctedCalciumMgDl > 10.5, 'Elevated calcium in PHPT');
  assert.ok(phpt.intactPthPgMl > 65, 'Elevated PTH in PHPT');
  assert.ok(phpt.cccrRatio > 0.02, 'CCCR > 0.02 confirms PHPT over FHH');
  assert.equal(phpt.alertType, 'danger');
  assert.match(phpt.status, /Pierwotna nadczynność przytarczyc/);

  // 3. Familial Hypocalciuric Hypercalcemia (FHH) with low CCCR
  const fhhP = parathyroidPresets.find(p => p.id === 'fhh_mutation');
  const fhh = calculateParathyroidState(fhhP.state);
  assert.ok(fhh.correctedCalciumMgDl > 10.5, 'Hypercalcemia present in FHH');
  assert.ok(fhh.cccrRatio < 0.01, 'CCCR < 0.01 is the diagnostic hallmark of FHH');
  assert.match(fhh.status, /FHH/);

  // 4. Secondary Hyperparathyroidism (SHPT) in CKD
  const shptP = parathyroidPresets.find(p => p.id === 'shpt_ckd');
  const shpt = calculateParathyroidState(shptP.state);
  assert.ok(shpt.intactPthPgMl > 65, 'Compensatory PTH elevation in SHPT');
  assert.ok(shpt.serumPhosphateMgDl > 4.5, 'Phosphate retention in CKD');

  // 5. Postoperative Hypoparathyroidism with severe tetany and QTc prolongation
  const tetanyP = parathyroidPresets.find(p => p.id === 'hypopara_postop');
  const tetany = calculateParathyroidState(tetanyP.state);
  assert.ok(tetany.correctedCalciumMgDl < 8.0, 'Severe hypocalcemia in hypoparathyroidism');
  assert.ok(tetany.intactPthPgMl < 15, 'Deficient PTH');
  assert.ok(tetany.qtcIntervalMs > 460, 'QTc markedly prolonged > 460 ms in acute hypocalcemia');
  assert.notEqual(tetany.tetanyRisk, 'none', 'Tetany risk flagged');

  // 6. Hypercalcemic crisis: premature furosemide error trap
  const furosemideTrapP = parathyroidPresets.find(p => p.id === 'furosemide_crisis_trap');
  const prematureFurosemide = calculateParathyroidState(furosemideTrapP.state);
  assert.ok(prematureFurosemide.furosemideError, 'Must trigger fatal dehydration warning when furosemide given before saline');
  assert.match(prematureFurosemide.status, /BŁĄD/);

  // Safe resuscitation
  const safeCrisis = calculateParathyroidState({
    ...defaultParathyroidState,
    mode: 'hypercalcemic_crisis',
    crisisSalineLiters: 4,
    zoledronicAcidGiven: true,
    calcitoninGiven: true,
  });
  assert.equal(safeCrisis.furosemideError, false, 'No error when resuscitated properly with adequate hydration');
  assert.ok(safeCrisis.correctedCalciumMgDl < 12.0, 'Calcium drops following fluid resuscitation and antiresorptive therapy');

  // 7. Hungry Bone Syndrome (HBS)
  const hbsP = parathyroidPresets.find(p => p.id === 'hungry_bone_postop');
  const hbs = calculateParathyroidState(hbsP.state);
  assert.ok(hbs.correctedCalciumMgDl < 8.0, 'Profound hypocalcemia in HBS');
  assert.ok(hbs.serumPhosphateMgDl < 2.5, 'Profound hypophosphatemia as bone rapidly remineralizes');
  assert.match(hbs.status, /głodnych kości/);
});

test('diabetes simulation model accurately computes CGM metrics, pump rules, and DKA/HHS emergency states', () => {
  // 1. Healthy euglycemia
  const healthy = calculateDiabetesState(defaultDiabetesState);
  assert.ok(healthy.fastingGlucose >= 70 && healthy.fastingGlucose <= 100);
  assert.equal(healthy.alertType, 'normal');
  assert.ok(healthy.tir >= 70, 'TIR should meet target');
  assert.equal(healthy.tbr, 0);

  // 2. Well-managed T1D preset
  const t1dP = diabetesPresets.find(p => p.id === 't1d_well_managed');
  const t1d = calculateDiabetesState(t1dP.state);
  assert.ok(t1d.tir >= 70, 'Well-managed T1D meets TIR >= 70%');
  assert.ok(t1d.pumpMetrics.isf > 0);
  assert.ok(t1d.pumpMetrics.icr > 0);
  assert.equal(t1d.alertType, 'normal');

  // 3. Severe DKA preset
  const dkaP = diabetesPresets.find(p => p.id === 'dka_emergency');
  const dka = calculateDiabetesState(dkaP.state);
  assert.equal(dka.alertType, 'danger');
  assert.match(dka.status, /kwasica ketonowa/i);
  assert.ok(dka.dkaMetrics.isDka, 'Flagged as DKA');
  assert.ok(dka.dkaMetrics.anionGap > 16, 'High anion gap acidosis');
  assert.ok(dka.dkaMetrics.ph < 7.30, 'Acidemia pH < 7.30');
  assert.ok(dka.dkaMetrics.betaHydroxybutyrate > 3.0, 'Significant ketonemia > 3.0 mmol/L');
  assert.ok(dka.dkaMetrics.fluidDeficitLiters >= 5, 'Substantial fluid deficit in DKA');

  // 4. HHS preset
  const hhsP = diabetesPresets.find(p => p.id === 'hhs_emergency');
  const hhs = calculateDiabetesState(hhsP.state);
  assert.equal(hhs.alertType, 'danger');
  assert.match(hhs.status, /HHS/i);
  assert.ok(hhs.dkaMetrics.isHhs, 'Flagged as HHS');
  assert.ok(hhs.dkaMetrics.effectiveOsmolality > 320, 'Effective osmolality > 320 mOsm/kg');
  assert.ok(hhs.dkaMetrics.fluidDeficitLiters >= 9, 'Extreme dehydration in HHS');

  // 5. Overbolus hypoglycemia preset
  const hypoP = diabetesPresets.find(p => p.id === 'overbolus_hypo');
  const hypo = calculateDiabetesState(hypoP.state);
  assert.equal(hypo.alertType, 'danger');
  assert.ok(hypo.tbr > 4, 'TBR exceeded safety threshold of 4%');
  assert.match(hypo.status, /hipoglikemii/i);

  // 6. Pump ISF (1800 rule) and ICR (500 rule) formulas
  assert.equal(healthy.pumpMetrics.isf, Math.round(1800 / healthy.pumpMetrics.tdd));
  assert.equal(healthy.pumpMetrics.icr, Math.round(500 / healthy.pumpMetrics.tdd));

  // 7. SGLT2i + GLP-1 modern therapy preset
  const t2dModP = diabetesPresets.find(p => p.id === 't2d_modern_therapy');
  const t2dMod = calculateDiabetesState(t2dModP.state);
  assert.ok(t2dMod.fastingGlucose < 140, 'Flozin + GLP-1 maintains good fasting glucose control');
  assert.ok(t2dMod.tir >= 70, 'Therapy keeps patient predominantly in range');
});

test('gonad simulator model accurately computes Vermeulen free testosterone, HPG suppression, GAHT profiles, and OHSS risk', () => {
  // 1. Eugonadal male baseline
  const healthy = calculateGonadState(initialGonadState);
  assert.ok(healthy.vermeulen.freeT_pmol > 220, 'Free T in physiological range');
  assert.ok(healthy.vermeulen.freeT_percent >= 1.5 && healthy.vermeulen.freeT_percent <= 2.5);
  assert.ok(healthy.lh > 1.5 && healthy.lh < 9.0);
  assert.ok(healthy.fsh > 1.5 && healthy.fsh < 12.0);

  // 2. Vermeulen formula check with known parameters
  const verm = calculateVermeulen(18.5, 32, 44);
  assert.ok(verm.freeT_pmol > 300 && verm.freeT_pmol < 450);
  assert.equal(verm.fai, Math.round((100 * 18.5) / 32 * 10) / 10);

  // 3. Obesity with low SHBG preset
  const obPreset = GONAD_PRESETS.find(p => p.id === 'obesity_low_shbg');
  const obState = calculateGonadState({ ...initialGonadState, ...obPreset.state });
  assert.ok(obState.vermeulen.freeT_pmol >= 220, 'Free T normal despite low total T');
  assert.match(obState.clinicalComment, /pozorny hipogonadyzm/i);

  // 4. Klinefelter primary hypogonadism
  const klinePreset = GONAD_PRESETS.find(p => p.id === 'klinefelter');
  const klineState = calculateGonadState({ ...initialGonadState, ...klinePreset.state });
  assert.ok(klineState.lh > 5.0 && klineState.fsh > 4.0, 'Hypergonadotropic response');

  // 5. Post-AAS doping ASIH
  const aasPreset = GONAD_PRESETS.find(p => p.id === 'post_aas_asih');
  const aasState = calculateGonadState({ ...initialGonadState, ...aasPreset.state });
  assert.ok(aasState.hpgSuppressionPercent > 90, 'HPG suppression after AAS doping');
  assert.ok(aasState.spermatogenesisIndex < 10, 'Azoospermia after AAS');

  // 6. High OHSS risk IVF stimulation
  const ohssPreset = GONAD_PRESETS.find(p => p.id === 'ohss_risk_high');
  const ohssState = calculateGonadState({ ...initialGonadState, ...ohssPreset.state });
  assert.ok(['Ciężki', 'Krytyczny'].includes(ohssState.ohssGrade), 'Identified severe OHSS risk');
  assert.ok(ohssState.vteRiskFold > 2.0, 'High thrombosis risk in OHSS');
  assert.ok(ohssState.safetyAlerts.length > 0);

  // 7. Protective IVF freeze-all protocol
  const safeIvf = calculateGonadState({
    ...initialGonadState,
    ...ohssPreset.state,
    trigger: 'gnrh_agonist',
    freezeAll: true,
  });
  assert.ok(safeIvf.ohssScore < ohssState.ohssScore, 'GnRH agonist trigger and freeze-all reduce OHSS score');

  // 8. Maskulinizing GAHT with polycythemia
  const mascPreset = GONAD_PRESETS.find(p => p.id === 'gaht_masc_polycythemia');
  const mascState = calculateGonadState({ ...initialGonadState, ...mascPreset.state });
  assert.ok(mascState.hematocritPercent > 50, 'Polycythemia in masc GAHT');
});

test('nen simulator accurately models WHO 2022 grading, Krenning score, RET risk tiers, MIRD renal dosimetry and CAPTEM response', () => {
  // 1. Baseline midgut NET G1
  const baseline = calculateNenState(initialNenState);
  assert.equal(baseline.whoGrade, 'NET G1');
  assert.equal(baseline.prrtEligible, true);
  assert.equal(baseline.isPoorlyDifferentiated, false);

  // 2. High Ki-67 & necrosis -> NEC G3
  const necPreset = NEN_PRESETS.find(p => p.id === 'lung_lcnec_g3');
  const nec = calculateNenState({ ...initialNenState, ...necPreset.state });
  assert.equal(nec.whoGrade, 'NEC G3 (wielko/drobnokomórkowy)');
  assert.equal(nec.isPoorlyDifferentiated, true);
  assert.equal(nec.prrtEligible, false);

  // 3. CAPTEM with MGMT deficiency vs intact
  const captemPreset = NEN_PRESETS.find(p => p.id === 'pnet_g2_captem');
  const captemState = calculateNenState({ ...initialNenState, ...captemPreset.state });
  assert.equal(captemState.captemResponseRatePercent, 65);
  const captemMgmtIntact = calculateNenState({ ...initialNenState, ...captemPreset.state, mgmtDeficient: false });
  assert.equal(captemMgmtIntact.captemResponseRatePercent, 18);

  // 4. MEN2A with Pheo + MTC: Pheo must be resected first
  const men2aPreset = NEN_PRESETS.find(p => p.id === 'men2a_pheo_mtc');
  const men2a = calculateNenState({ ...initialNenState, ...men2aPreset.state });
  assert.equal(men2a.retRiskCategory, 'High (H)');
  assert.ok(men2a.surgeryPriorityAlert !== null);
  assert.match(men2a.surgeryPriorityAlert, /wyciąć guz chromochłonny.*PRZED operacją/i);

  // 5. MEN2B infant M918T highest risk
  const men2bPreset = NEN_PRESETS.find(p => p.id === 'men2b_infant_m918t');
  const men2b = calculateNenState({ ...initialNenState, ...men2bPreset.state });
  assert.equal(men2b.retRiskCategory, 'Highest (HST)');
  assert.match(men2b.recommendedThyroidectomyAge, /1\. roku życia/i);

  // 6. Carcinoid crisis threat without octreotide premedication
  const crisisPreset = NEN_PRESETS.find(p => p.id === 'carcinoid_crisis_risk');
  const crisis = calculateNenState({ ...initialNenState, ...crisisPreset.state });
  assert.equal(crisis.carcinoidCrisisRisk, 'Krytyczne');
  assert.ok(crisis.safetyAlerts.some(a => /przełom/i.test(a)));

  // 7. PRRT renal dosimetry limit
  const limitPreset = NEN_PRESETS.find(p => p.id === 'prrt_kidney_limit_warning');
  const limitState = calculateNenState({ ...initialNenState, ...limitPreset.state });
  assert.ok(limitState.cumulativeKidneyDoseGy >= 23);
  assert.ok(['Wysokie', 'Przekroczony limit'].includes(limitState.kidneyRisk));
});

test('obesity simulator accurately models Hall dynamic energy balance, IFSO 2023 bariatric qualification, Friedewald vs Sampson and FIB-4', () => {
  // 1. Baseline qualification and BMR
  const baseline = calculateObesityState(defaultObesityInputs);
  assert.equal(baseline.bmi, 36);
  assert.equal(baseline.bmiClass, 'Otyłość II st.');
  assert.ok(baseline.bariatricCandidate, 'BMI 36 with comorbidities qualifies for bariatric surgery under IFSO 2023');

  assert.ok(baseline.bmrMifflin > 1400 && baseline.bmrMifflin < 1800);
  assert.ok(baseline.tdee > baseline.bmrMifflin);

  // 2. GLP-1 and Dual Agonist weight loss
  const semaState = calculateObesityState({ ...defaultObesityInputs, selectedDrug: 'semaglutide', drugDoseMg: 2.4, adherencePct: 100 });
  const tirzState = calculateObesityState({ ...defaultObesityInputs, selectedDrug: 'tirzepatide', drugDoseMg: 15, adherencePct: 100 });
  assert.ok(tirzState.predictedWeight12m < semaState.predictedWeight12m, 'Tirzepatide produces greater weight loss than semaglutide');

  // 3. Friedewald vs Sampson when TG is high
  const highTgPreset = obesityPresets.find(p => p.id === 'severe-hypertriglyceridemia');
  const lipidState = calculateObesityState(highTgPreset.data);
  assert.equal(lipidState.friedewaldValid, false, 'Friedewald formula is invalid when TG >= 400 mg/dl');
  assert.ok(lipidState.ldlSampson > 0, 'Sampson equation provides valid estimation');
  assert.ok(lipidState.alerts.some(a => /Zapalenia Trzustki/i.test(a)));

  // 4. Bariatric surgery EWL & Remission
  const rygbPreset = obesityPresets.find(p => p.id === 'bariatric-candidate-rygb');
  const rygbState = calculateObesityState(rygbPreset.data);
  assert.ok(rygbState.predictedEwlPct >= 65, 'RYGB achieves >= 65% EWL');
  assert.ok(rygbState.nutritionalDeficiencyRisks.some(r => r.includes('Witamina B12')));


  // 5. FIB-4 liver fibrosis
  assert.ok(baseline.fib4Score > 0);
  assert.ok(['Niskie', 'Pośrednie (szara strefa)', 'Wysokie'].includes(baseline.fib4RiskCategory));

  // 6. ESC/EAS SCORE2 & lipid goals
  const fhPreset = obesityPresets.find(p => p.id === 'familial-hypercholesterolemia');
  const fhState = calculateObesityState(fhPreset.data);
  assert.equal(fhState.targetLdl, 55, 'Target LDL is 55 mg/dl for very high risk FH');
  assert.ok(fhState.achievedLdl < fhState.ldlSampson, 'Triple therapy dramatically lowers LDL');
});

