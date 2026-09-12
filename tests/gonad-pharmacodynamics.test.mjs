import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DRUG_DEFINITIONS,
  GONAD_MODEL_VERSION,
  GONAD_PRESETS,
  simulateHormoneScenario,
} from '../lib/gonad-pharmacodynamics.ts';

const copy = value => JSON.parse(JSON.stringify(value));

test('model is deterministic and every drug family has a dose definition', () => {
  const input = copy(GONAD_PRESETS[0]);
  assert.deepEqual(simulateHormoneScenario(input), simulateHormoneScenario(input));
  assert.match(GONAD_MODEL_VERSION, /^hpg-pkpd-/);
  assert.equal(new Set(DRUG_DEFINITIONS.map(d => d.family)).size, 11);
  for (const drug of DRUG_DEFINITIONS) {
    assert.ok(drug.minDose <= drug.defaultDose && drug.defaultDose <= drug.maxDose, drug.id);
    assert.ok(drug.sourceIds.length > 0, drug.id);
  }
});

test('all prediction intervals are ordered and non-negative', () => {
  const result = simulateHormoneScenario(copy(GONAD_PRESETS[2]));
  for (const point of result.points) for (const [id, x] of Object.entries(point.values)) {
    assert.ok(0 <= x.p05 && x.p05 <= x.p25 && x.p25 <= x.median, id);
    assert.ok(x.median <= x.p75 && x.p75 <= x.p95, id);
  }
});

test('gonadectomy removes inhibin and prevents gonadal response to hCG', () => {
  const base = copy(GONAD_PRESETS[2]);
  base.regimens = [{id:'hcg',drugId:'hcg_urinary',dose:5000,intervalHours:168,hoursSinceLastDose:12,durationDays:30,adherence:100}];
  const intact = simulateHormoneScenario(base).sample.values;
  const absent = simulateHormoneScenario({...base,id:'absent',patient:{...base.patient,gonads:'none',gonadFunction:'absent',gonadReserve:0}}).sample.values;
  assert.ok(intact.inhibin.median > absent.inhibin.median);
  assert.equal(absent.inhibin.median, 0);
  assert.ok(intact.estradiol.median > absent.estradiol.median);
});

test('finasteride lowers DHT without directly lowering testosterone', () => {
  const input = copy(GONAD_PRESETS[2]);
  const before = simulateHormoneScenario(input).sample.values;
  input.regimens.push({id:'fin',drugId:'finasteride',dose:1,intervalHours:24,hoursSinceLastDose:12,durationDays:90,adherence:100});
  const after = simulateHormoneScenario(input).sample.values;
  assert.ok(after.dht.median < before.dht.median * .6);
  assert.ok(Math.abs(after.testosterone.median-before.testosterone.median) < 1e-9);
});

test('higher testosterone dose increases modeled concentration', () => {
  const low = copy(GONAD_PRESETS[2]);
  low.regimens[0].dose = 40;
  const high = copy(low); high.id='high'; high.regimens[0].dose=120;
  assert.ok(simulateHormoneScenario(high).sample.values.testosterone.median > simulateHormoneScenario(low).sample.values.testosterone.median);
});

test('measurement calibration moves median and narrows the band', () => {
  const rawInput = copy(GONAD_PRESETS[0]);
  const raw = simulateHormoneScenario(rawInput).sample.values.estradiol;
  rawInput.observations=[{analyte:'estradiol',value:180,hoursFromNow:0}];
  const calibrated = simulateHormoneScenario(rawInput).sample.values.estradiol;
  assert.equal(calibrated.origin,'calibrated');
  assert.ok(Math.abs(calibrated.median-180)<1);
  assert.ok((calibrated.p95-calibrated.p05) / calibrated.median < (raw.p95-raw.p05) / raw.median);
});

test('pregnancy and developmental stages use distinct physiologic layers', () => {
  const adult = copy(GONAD_PRESETS[2]); adult.regimens=[];
  const child = copy(adult); child.id='child'; child.patient.ageYears=8; child.patient.stage='prepubertal';
  const pregnancy = copy(adult); pregnancy.id='pregnancy'; pregnancy.patient.pregnant=true; pregnancy.patient.gestationalWeek=24;
  assert.ok(simulateHormoneScenario(child).sample.values.estradiol.median < simulateHormoneScenario(adult).sample.values.estradiol.median);
  assert.ok(simulateHormoneScenario(pregnancy).sample.values.progesterone.median > simulateHormoneScenario(adult).sample.values.progesterone.median);
});
