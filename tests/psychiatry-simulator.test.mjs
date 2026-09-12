import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateHunterCriteria, calculateDrugState, evaluateDiagnosticCriteria } from '../lib/psychiatry-engine.ts';
import { PSYCHIATRY_DRUGS } from '../lib/psychiatry-simulator-data.ts';

const basePatient = {
  age: 32,
  sex: 'K',
  symptomDurationWeeks: 4,
  depressedMood: true,
  anhedonia: true,
  lowEnergy: true,
  sleepPattern: 'bezsennosc_wczesna',
  appetiteWeight: 'spadek_jadlowstret',
  psychomotor: 'spowolnienie',
  guiltWorthlessness: true,
  concentrationImpacting: true,
  suicidalIdeationLevel: 1,
  elevatedExpansiveMood: false,
  flightOfIdeas: false,
  grandiosityOrPsychosis: false,
  excessiveRiskActivities: false,
  familyHistoryBipolar: false,
  substanceUse: 'brak',
  somaticComorbidities: ['brak'],
  labTsh: 1.8,
  labEgfr: 105,
  labPotassium: 4.2,
  cyp2d6Phenotype: 'NM',
  cyp2c19Phenotype: 'NM',
  adherencePercent: 100,
};

test('Hunter decision rule detects serotonin syndrome according to Dunkley 2003 criteria', () => {
  const ssriRx = [{ drugId: 'sertraline', doseMg: 100 }];
  const emptySigns = {
    spontaneousClonus: false,
    inducibleClonus: false,
    ocularClonus: false,
    agitation: false,
    diaphoresis: false,
    tremor: false,
    hyperreflexia: false,
    hyperthermiaOver38: false,
  };

  // Rule 0: No proserotonergic drugs -> false
  const noDrugResult = evaluateHunterCriteria([], { ...emptySigns, spontaneousClonus: true });
  assert.equal(noDrugResult.meetsCriteria, false);

  // Rule 1: Spontaneous clonus -> true
  const r1 = evaluateHunterCriteria(ssriRx, { ...emptySigns, spontaneousClonus: true });
  assert.equal(r1.meetsCriteria, true);
  assert.equal(r1.severity, 'zagrozenie_umiarkowane');

  // Rule 1b: Spontaneous clonus with hyperthermia -> life threatening
  const r1b = evaluateHunterCriteria(ssriRx, { ...emptySigns, spontaneousClonus: true, hyperthermiaOver38: true });
  assert.equal(r1b.meetsCriteria, true);
  assert.equal(r1b.severity, 'stan_zagrozenia_zycia');

  // Rule 2: Inducible clonus + agitation
  const r2 = evaluateHunterCriteria(ssriRx, { ...emptySigns, inducibleClonus: true, agitation: true });
  assert.equal(r2.meetsCriteria, true);

  // Rule 3: Ocular clonus + diaphoresis
  const r3 = evaluateHunterCriteria(ssriRx, { ...emptySigns, ocularClonus: true, diaphoresis: true });
  assert.equal(r3.meetsCriteria, true);

  // Rule 4: Tremor + hyperreflexia
  const r4 = evaluateHunterCriteria(ssriRx, { ...emptySigns, tremor: true, hyperreflexia: true });
  assert.equal(r4.meetsCriteria, true);

  // Rule 5: Hyperthermia (>38) + ocular/inducible clonus + hypertonia === true
  const r5 = evaluateHunterCriteria(ssriRx, { ...emptySigns, hyperthermiaOver38: true, inducibleClonus: true, hypertonia: true });
  assert.equal(r5.meetsCriteria, true);
  assert.equal(r5.severity, 'stan_zagrozenia_zycia');

  // Rule 5 negative test: fever + clonus without hypertonia (undefined) does NOT meet branch 5
  const r5Undefined = evaluateHunterCriteria(ssriRx, { ...emptySigns, hyperthermiaOver38: true, inducibleClonus: true, hypertonia: undefined });
  assert.equal(r5Undefined.meetsCriteria, false);
  assert.ok(r5Undefined.missingInformation?.some(m => m.includes('hipertonii')));

  // Negative control: Isolated tremor without hyperreflexia -> false
  const rNeg = evaluateHunterCriteria(ssriRx, { ...emptySigns, tremor: true });
  assert.equal(rNeg.meetsCriteria, false);
});

test('calculateDrugState models SERT and D2 receptor occupancy and pharmacogenetics', () => {
  // SSRI SERT occupancy (Meyer hyperbolic model)
  const sertralineState = calculateDrugState({ drugId: 'sertraline', doseMg: 50 }, basePatient);
  assert.ok(sertralineState.sertOccupancyPercent >= 75 && sertralineState.sertOccupancyPercent <= 88);
  assert.equal(sertralineState.evidenceCategory, 'PET measured');

  // Antipsychotic D2 occupancy (Kapur 65-80% therapeutic window)
  const olanStandard = calculateDrugState({ drugId: 'olanzapine', doseMg: 10 }, basePatient);
  assert.ok(olanStandard.d2OccupancyPercent >= 65 && olanStandard.d2OccupancyPercent <= 80);
  assert.ok(olanStandard.safetyAlerts.some(a => a.includes('oknie terapeutycznym')));

  const olanHigh = calculateDrugState({ drugId: 'olanzapine', doseMg: 20 }, basePatient);
  assert.ok(olanHigh.d2OccupancyPercent > 80);
  assert.ok(olanHigh.safetyAlerts.some(a => a.includes('EPS')));

  // Pharmacogenomics: CYP2C19 Poor Metabolizer increases sertraline effective dose
  const pmPatient = { ...basePatient, cyp2c19Phenotype: 'PM' };
  const sertralinePm = calculateDrugState({ drugId: 'sertraline', doseMg: 50 }, pmPatient);
  assert.ok(sertralinePm.effectiveDose > sertralineState.effectiveDose);

  // Lithium TDM and renal safety
  const renalImpaired = { ...basePatient, labEgfr: 40 };
  const lithState = calculateDrugState({ drugId: 'lithium', doseMg: 1000 }, renalImpaired);
  assert.ok(lithState.safetyAlerts.some(a => a.includes('toksyczności')));
});

test('evaluateDiagnosticCriteria flags somatic mimics and bipolar traps', () => {
  // True MDD presentation
  const evals = evaluateDiagnosticCriteria(basePatient);
  const mdd = evals.find(e => e.diagnosisId === 'mdd');
  assert.ok(mdd);
  assert.equal(mdd.status, 'spełnione');

  // Somatic mimic: severe hypothyroidism (TSH = 28)
  const hypoPatient = { ...basePatient, labTsh: 28 };
  const hypoEvals = evaluateDiagnosticCriteria(hypoPatient);
  const hypoMdd = hypoEvals.find(e => e.diagnosisId === 'mdd');
  assert.ok(hypoMdd?.trapWarning?.includes('tarczycy'));

  // Bipolar trap: reduced need for sleep + bipolar family history
  const bpdPatient = {
    ...basePatient,
    sleepPattern: 'zmniejszona_potrzeba_snu',
    familyHistoryBipolar: true,
  };
  const bpdEvals = evaluateDiagnosticCriteria(bpdPatient);
  const bpdMdd = bpdEvals.find(e => e.diagnosisId === 'mdd');
  assert.ok(bpdMdd?.trapWarning?.includes('dwubiegunowe'));
});
