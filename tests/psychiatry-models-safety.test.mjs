import test from 'node:test';
import assert from 'node:assert/strict';
import {
  interpretMeasuredLithiumTdm,
  evaluateLithiumPkSensitivity,
  calculateD2Occupancy,
  evaluateQtcRisk,
} from '../lib/psychiatry-pharmacokinetics-engine.ts';
import { CANONICAL_PSYCHIATRY_SOURCES } from '../lib/psychiatry/evidence/source-metadata.ts';
import { psychiatrySources } from '../lib/course-psychiatry-sources.ts';

test('Safety: Lithium TDM interpreter requires measured concentration and evaluates timing validity', () => {
  // Test 1: Próbka pobrana prawidłowo (12h, stan stacjonarny 7 dni)
  const validSample = interpretMeasuredLithiumTdm({
    measuredConcentrationMmolL: 0.72,
    hoursSinceLastDose: 12,
    daysOnCurrentRegimen: 7,
    indication: 'maintenance',
  });
  assert.equal(validSample.sampleStatus, 'valid');
  assert.equal(validSample.therapeuticZone, 'optimal');
  assert.ok(!JSON.stringify(validSample).includes('zwiększ dawkę o 250 mg'), 'Must NOT generate automatic dose increments');
  assert.ok(!JSON.stringify(validSample).includes('zmniejsz dawkę o 250 mg'), 'Must NOT generate automatic dose decrements');

  // Test 2: Próbka pobrana za wcześnie (8h po dawce - faza dystrybucji)
  const earlySample = interpretMeasuredLithiumTdm({
    measuredConcentrationMmolL: 0.95,
    hoursSinceLastDose: 8,
    daysOnCurrentRegimen: 10,
    indication: 'maintenance',
  });
  assert.equal(earlySample.sampleStatus, 'questionable_timing');
  assert.ok(earlySample.sampleStatusRationale.includes('dystrybucji'));

  // Test 3: Brak stanu stacjonarnego (3 dni na nowej dawce)
  const nonSteadySample = interpretMeasuredLithiumTdm({
    measuredConcentrationMmolL: 0.55,
    hoursSinceLastDose: 12,
    daysOnCurrentRegimen: 3,
    indication: 'maintenance',
  });
  assert.equal(nonSteadySample.sampleStatus, 'not_steady_state');

  // Test 4: Toksyczność z interakcją tiazydową i objawami
  const toxicSample = interpretMeasuredLithiumTdm({
    measuredConcentrationMmolL: 1.65,
    hoursSinceLastDose: 12,
    daysOnCurrentRegimen: 14,
    indication: 'maintenance',
    interactingMedications: ['thiazide', 'nsaid'],
    symptoms: ['ataxia', 'coarse_tremor'],
  });
  assert.equal(toxicSample.therapeuticZone, 'toxic');
  assert.ok(toxicSample.safetyAlert?.includes('ALARM BEZPIECZEŃSTWA'));
  assert.ok(toxicSample.clinicalObservations.some(obs => obs.includes('Tiazyd')));
});

test('Safety: Educational PK sensitivity model is qualitative and contains explicit disclaimer', () => {
  const pk = evaluateLithiumPkSensitivity({
    eGfr: 25,
    volumeStatus: 'severe_dehydration',
    interactingDrugs: ['thiazide', 'nsaid'],
  });
  assert.equal(pk.exposurePressure, 'strong');
  assert.ok(pk.disclaimer.includes('MODEL EDUKACYJNY'));
  assert.ok(pk.disclaimer.includes('brak predykcji stężenia'));
});

test('Safety: D2 PET explorer differentiates antagonists from partial agonists and marks Kapur heuristic', () => {
  // Antagonista: Haloperidol
  const halo = calculateD2Occupancy('haloperidol', 4);
  assert.equal(halo.pharmacologicClass, 'antagonist');
  assert.equal(halo.intrinsicActivityPercent, 0);
  assert.ok(halo.d2OccupancyPercent >= 65);
  assert.ok(halo.evidenceSource.includes('Kapur'));
  assert.ok(halo.limitationNote.length > 20);

  // Częściowy agonista: Aripiprazol
  const ari = calculateD2Occupancy('aripiprazole', 15);
  assert.equal(ari.pharmacologicClass, 'partial_agonist');
  assert.equal(ari.intrinsicActivityPercent, 30);
  assert.ok(ari.d2OccupancyPercent > 75);
  assert.ok(ari.clinicalInterpretation.includes('aktywności wewnętrznej'));
  assert.ok(!ari.clinicalInterpretation.includes('chroni przed EPS'));
  assert.ok(ari.clinicalInterpretation.toLowerCase().includes('akatyzj'));
});

test('Safety: QTcF formula uses Fridericia and evaluates clinical risk context', () => {
  // Normalny QTcF
  const normal = evaluateQtcRisk({ rawQtMs: 400, heartRateBpm: 60, isFemale: false });
  assert.equal(normal.calculatedQtcMs, 400);
  assert.equal(normal.riskCategory, 'normal');
  assert.ok(normal.missingClinicalContext.some(m => m.includes('potasu')));

  // Krytyczny QTcF z hipokaliemią
  const critical = evaluateQtcRisk({
    rawQtMs: 520,
    heartRateBpm: 75,
    isFemale: true,
    potassiumMmolL: 3.1,
    concurrentQtDrugs: ['citalopram', 'amiodarone'],
  });
  assert.ok(critical.calculatedQtcMs >= 500);
  assert.equal(critical.riskCategory, 'critical');
  assert.ok(critical.riskFactorsIdentified.some(r => r.includes('Hipokaliemia')));
  assert.ok(critical.riskFactorsIdentified.some(r => r.includes('citalopram')));
  assert.ok(!critical.actionRecommendation.includes('brak przeciwwskazań'));
});

test('Sources provenance: Canonical metadata fixtures are verified', () => {
  // AGNP TDM 2026
  const agnp = psychiatrySources['agnp-tdm-2026'];
  assert.ok(agnp);
  assert.equal(agnp.year, '2026');
  assert.equal(agnp.url, 'https://doi.org/10.1055/a-2860-7861');
  assert.ok(agnp.title.includes('Consensus Guidelines for Therapeutic Drug Monitoring in Neuropsychopharmacology'));

  // NMS consensus
  const nms = psychiatrySources['nms-consensus'];
  assert.ok(nms);
  assert.equal(nms.year, '2011');
  assert.equal(nms.url, 'https://doi.org/10.4088/JCP.10m06438');
  assert.ok(nms.title.includes('An international consensus study of neuroleptic malignant syndrome'));

  // Bush-Francis
  const bf = psychiatrySources['bush-francis-catatonia'];
  assert.ok(bf);
  assert.equal(bf.year, '1996');
  assert.equal(bf.url, 'https://doi.org/10.1111/j.1600-0447.1996.tb09814.x');
  assert.equal(bf.title, 'Catatonia. I. Rating scale and standardized examination');

  // APA ECT
  const ect = psychiatrySources['apa-ect-guidelines'];
  assert.ok(ect);
  assert.equal(ect.year, '2023');
  assert.equal(ect.url, 'https://doi.org/10.1176/appi.books.9780890427118');
  assert.ok(ect.title.includes('The Practice of Electroconvulsive Therapy'));
});
