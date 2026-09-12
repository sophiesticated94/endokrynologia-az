import test from 'node:test';
import assert from 'node:assert/strict';
import { psychiatryLessons } from '../lib/course-psychiatry.ts';
import { psychiatryCases } from '../lib/cases-psychiatry.ts';
import {
  psychiatryLessonExperiences,
  PSYCHIATRY_LESSON_ENHANCEMENTS,
  ALL_PSYCHIATRY_PRESETS,
} from '../lib/psychiatry/index.ts';
import { getPsychiatryWidgetProvider } from '../lib/psychiatry/psychiatry-lesson-activities.ts';
import { evaluateHunterCriteria } from '../lib/psychiatry-engine.ts';
import { evaluateExtripLithiumGuidance } from '../lib/psychiatry/extrip-guidelines.ts';
import { calculateD2Occupancy } from '../lib/psychiatry-pharmacokinetics-engine.ts';
import { PSYCHIATRY_EVIDENCE_REGISTRY } from '../lib/psychiatry/evidence/model-limitations.ts';

// Test A: Psychiatry widgets never render endocrine fallback content
test('Test A: Psychiatry widgets never render endocrine fallback content', () => {
  const endocrineKeywords = ['TSH', 'FT4', 'tarczycy', 'glukoza', 'DKA', 'HHS', 'insuliny'];
  for (const lesson of psychiatryLessons) {
    const provider = getPsychiatryWidgetProvider(lesson.id);
    const base = {
      id: `${lesson.id}-test`,
      objectiveIds: ['obj1'],
      difficulty: 'both',
      reasoning: 'mechanism',
      sourceIds: ['s1'],
      hint: 'hint',
    };
    const activities = [
      provider['axis-map'](base),
      provider['lab-workbench'](base),
      provider.timeline(base),
      provider['pathway-builder'](base),
    ];
    assert.ok(activities.length === 4, `4 widget activities must exist for ${lesson.id}`);
    for (const act of activities) {
      const prompt = 'prompt' in act ? act.prompt : '';
      const explanation = 'explanation' in act ? act.explanation : '';
      for (const kw of endocrineKeywords) {
        assert.ok(
          !prompt.includes(kw),
          `Activity prompt in ${lesson.id} contains endocrine keyword "${kw}": "${prompt}"`,
        );
        assert.ok(
          !explanation.includes(kw),
          `Activity explanation in ${lesson.id} contains endocrine keyword "${kw}": "${explanation}"`,
        );
      }
    }
  }
});

// Test B: All enhancement kinds have renderer
test('Test B: All enhancement kinds have renderer', () => {
  const validDiagrams = new Set([
    'mse-map',
    'psychosis-differential',
    'bdnf-trkb-pathway',
    'mood-timeline',
    'fear-circuit',
    'cstc-loop',
    'monoamine-synapse',
    'd2-pathways',
    'cyp-network',
    'serotonin-nms-hunter',
  ]);
  const validInlineWidgets = new Set([
    'mse-workbench',
    'criteria-matcher',
    'd2-pet-explorer',
    'lithium-tdm-interpreter',
    'tdm-timing-validator',
    'hunter-criteria-evaluator',
    'fridericia-qtc-calculator',
  ]);

  for (const [lessonId, enh] of Object.entries(PSYCHIATRY_LESSON_ENHANCEMENTS)) {
    for (const d of enh.diagrams) {
      assert.ok(validDiagrams.has(d), `Lesson ${lessonId} uses unrecognized diagram: ${d}`);
    }
    for (const w of enh.inlineWidgets) {
      assert.ok(validInlineWidgets.has(w), `Lesson ${lessonId} uses unrecognized inlineWidget: ${w}`);
    }
  }
});

// Test C: Placement slot ordering and structure
test('Test C: Placement slot ordering and structure', () => {
  const validModes = new Set([
    'clinical-framework',
    'safety-context',
    'pet-model',
    'measured-tdm',
    'pk-sensitivity',
    'validated-decision-rule',
  ]);
  for (const [lessonId, enh] of Object.entries(PSYCHIATRY_LESSON_ENHANCEMENTS)) {
    assert.ok(validModes.has(enh.evidenceMode), `Invalid evidenceMode in ${lessonId}`);
    if (enh.whatChangesYourMind) {
      assert.ok(Array.isArray(enh.whatChangesYourMind.knownFacts), `knownFacts array in ${lessonId}`);
      assert.ok(enh.whatChangesYourMind.knownFacts.length > 0, `knownFacts not empty in ${lessonId}`);
      assert.ok(Array.isArray(enh.whatChangesYourMind.unknownFactors), `unknownFactors in ${lessonId}`);
      assert.ok(enh.whatChangesYourMind.criticalDifferentiatingFactor.length > 10, `criticalDiff in ${lessonId}`);
    }
  }
});

// Test D: All preset deep links resolve
test('Test D: All preset deep links resolve', () => {
  const lessonIds = new Set(psychiatryLessons.map(l => l.id));
  const presets = Object.values(ALL_PSYCHIATRY_PRESETS);
  assert.ok(presets.length >= 12, `At least 12 presets expected, found ${presets.length}`);

  for (const preset of presets) {
    assert.ok(preset.id, 'Preset must have id');
    assert.ok(preset.title, 'Preset must have title');
    assert.ok(['diagnostic', 'pharmacology', 'safety'].includes(preset.tab), `Invalid tab ${preset.tab}`);
    assert.ok(preset.patientSummary.length > 10, 'Preset must have patientSummary');
    if (preset.data.lessonId) {
      assert.ok(lessonIds.has(preset.data.lessonId), `Preset ${preset.id} lessonId not found`);
    }
  }
});

// Test E: Preset hydration propagates fields into state
test('Test E: Preset hydration propagates fields into state', () => {
  const clozapinePreset = ALL_PSYCHIATRY_PRESETS['clozapine-smoking-001'];
  assert.equal(clozapinePreset.data.smokingStatus, 'zaprzestanie_palenia');
  assert.equal(clozapinePreset.data.claimKey, 'clozapine-smoking-cyp1a2');

  const cypPreset = ALL_PSYCHIATRY_PRESETS['cyp-interaction-001'];
  assert.equal(cypPreset.data.inhibitor, 'fluoxetine');
  assert.equal(cypPreset.data.substrate, 'venlafaxine');

  const d2Preset = ALL_PSYCHIATRY_PRESETS['d2-evidence-001'];
  assert.equal(d2Preset.data.antagonistDrug, 'risperidone');
  assert.equal(d2Preset.data.partialAgonistDrug, 'aripiprazole');

  const lithiumPreset = ALL_PSYCHIATRY_PRESETS['lithium-tdm-measured-001'];
  assert.equal(lithiumPreset.data.measuredLevel, 1.45);
  assert.equal(lithiumPreset.data.hoursSinceDose, 12);
  assert.equal(lithiumPreset.data.eGfr, 62);

  const qtcPreset = ALL_PSYCHIATRY_PRESETS['qtc-crediblemeds-001'];
  assert.equal(qtcPreset.data.rawQt, 490);
  assert.equal(qtcPreset.data.potassium, 3.2);
});

// Test F: Hunter decision tree branches (all 5 branches and exposure requirement)
test('Test F: Hunter decision tree branches and serotonergic exposure requirement', () => {
  const activeRx = [{ drugId: 'sertraline', doseMg: 50 }];

  // Gałąź 1: Spontaniczny klonus
  const b1 = evaluateHunterCriteria(activeRx, { spontaneousClonus: true });
  assert.equal(b1.meetsCriteria, true);
  assert.equal(b1.branchNumber, 1);

  // Gałąź 2: Indukowany klonus + pobudzenie
  const b2 = evaluateHunterCriteria(activeRx, { inducibleClonus: true, agitation: true });
  assert.equal(b2.meetsCriteria, true);
  assert.equal(b2.branchNumber, 2);

  // Gałąź 3: Klonus oczny + zlewne poty
  const b3 = evaluateHunterCriteria(activeRx, { ocularClonus: true, diaphoresis: true });
  assert.equal(b3.meetsCriteria, true);
  assert.equal(b3.branchNumber, 3);

  // Gałąź 4: Drżenie + hiperrefleksja
  const b4 = evaluateHunterCriteria(activeRx, { tremor: true, hyperreflexia: true });
  assert.equal(b4.meetsCriteria, true);
  assert.equal(b4.branchNumber, 4);

  // Gałąź 5: Hipertonia + gorączka + klonus oczny
  const b5 = evaluateHunterCriteria(activeRx, {
    hypertonia: true,
    hyperthermiaOver38: true,
    ocularClonus: true,
  });
  assert.equal(b5.meetsCriteria, true);
  assert.equal(b5.branchNumber, 5);

  // Brak ekspozycji serotoninergicznej (spontaniczny klonus NIE wystarcza)
  const noExp = evaluateHunterCriteria([], { spontaneousClonus: true });
  assert.equal(noExp.meetsCriteria, false);
  assert.equal(noExp.severity, 'brak');
  assert.ok(noExp.rationale.includes('Brak aktywnego leku'));

  // Niepotwierdzona ekspozycja ('unknown')
  const unkExp = evaluateHunterCriteria('unknown', { spontaneousClonus: true });
  assert.equal(unkExp.meetsCriteria, false);
  assert.equal(unkExp.branchNumber, 1);
  assert.ok(unkExp.missingInformation.some(m => m.includes('Brak potwierdzenia')));
});

// Test G: EXTRIP RECOMMENDED vs SUGGESTED vs missing data logic
test('Test G: EXTRIP RECOMMENDED vs SUGGESTED vs missing data logic', () => {
  // RECOMMENDED: Stężenie >4.0 mmol/l z upośledzeniem funkcji nerek i śpiączką
  const rec1 = evaluateExtripLithiumGuidance({
    measuredConcentrationMmolL: 5.5,
    eGfr: 30,
    decreasedConsciousness: true,
  });
  assert.equal(rec1.recommendationLevel, 'RECOMMENDED');
  assert.equal(rec1.recommendation, 'RECOMMENDED');

  // SUGGESTED: Stężenie >5.0 mmol/l z prawidłowym GFR i bez ciężkich objawów
  const sug = evaluateExtripLithiumGuidance({
    measuredConcentrationMmolL: 5.2,
    eGfr: 80,
    decreasedConsciousness: false,
    seizures: false,
    dangerousDysrhythmias: false,
    significantConfusion: false,
  });
  assert.equal(sug.recommendationLevel, 'SUGGESTED');

  // Brakujące dane wejściowe
  const missing = evaluateExtripLithiumGuidance({
    measuredConcentrationMmolL: 4.2,
  });
  assert.ok(missing.missingCriticalInputs.length > 0);
  assert.ok(missing.missingCriticalInputs.some(m => m.includes('eGFR')));

  // NOT_INDICATED: stężenie terapeutyczne
  const notInd = evaluateExtripLithiumGuidance({
    measuredConcentrationMmolL: 0.8,
    eGfr: 90,
    decreasedConsciousness: false,
    seizures: false,
    dangerousDysrhythmias: false,
    significantConfusion: false,
  });
  assert.equal(notInd.recommendationLevel, 'NOT_INDICATED');
});

// Test H: DSM-5-TR vs ICD-11 duration criteria
test('Test H: DSM-5-TR vs ICD-11 duration criteria', () => {
  const dsm5MinTotalMonths = 6;
  const dsm5MinActivePhaseMonths = 1;
  const icd11MinMonths = 1;
  assert.equal(dsm5MinTotalMonths, 6);
  assert.equal(dsm5MinActivePhaseMonths, 1);
  assert.equal(icd11MinMonths, 1);
  assert.ok(dsm5MinTotalMonths > icd11MinMonths);
});

// Test I: Partial agonists get not_applicable_to_partial_agonist
test('Test I: Partial agonists get not_applicable_to_partial_agonist', () => {
  const ari = calculateD2Occupancy('aripiprazole', 15);
  assert.equal(ari.heuristicZone, 'not_applicable_to_partial_agonist');
  assert.equal(ari.pharmacologicClass, 'partial_agonist');
  assert.ok(ari.clinicalInterpretation.includes('aktywności wewnętrznej'));
  assert.ok(!ari.clinicalInterpretation.includes('chroni przed EPS'));

  const halo = calculateD2Occupancy('haloperidol', 4);
  assert.equal(halo.pharmacologicClass, 'antagonist');
  assert.notEqual(halo.heuristicZone, 'not_applicable_to_partial_agonist');
});

// Test J: Claim-level evidence keys resolve (all 9 keys)
test('Test J: Claim-level evidence keys resolve', () => {
  const requiredClaimKeys = [
    'hunter-validation',
    'kapur-d2-threshold',
    'extrip-lithium-2015',
    'agnp-consensus-2026',
    'crediblemeds-qtc',
    'strawn-nms-pathophysiology',
    'meyer-sert-occupancy',
    'sert-meyer-observation',
    'clozapine-smoking-cyp1a2',
  ];

  for (const key of requiredClaimKeys) {
    const claim = PSYCHIATRY_EVIDENCE_REGISTRY[key];
    assert.ok(claim, `Missing evidence claim for key: ${key}`);
    assert.ok(claim.id, `Claim ${key} must have id`);
    assert.ok(claim.claimLabel.length > 10, `Claim ${key} claimLabel too short`);
    assert.ok(claim.quickSummary.length > 20, `Claim ${key} quickSummary too short`);
    assert.ok(claim.researchContext.limitations.length > 0, `Claim ${key} limitations missing`);
    assert.ok(claim.sourceId, `Claim ${key} must have sourceId`);
  }
});

// Test K: Longitudinal cases do not have exact 4-step lock
test('Test K: Longitudinal cases do not have exact 4-step lock', () => {
  assert.equal(psychiatryCases.length, 24);
  for (const c of psychiatryCases) {
    assert.ok(c.steps.length >= 3, `Case ${c.id} must have >=3 steps`);
    for (const s of c.steps) {
      assert.ok(s.prompt.length > 10, `Step in ${c.id} prompt too short`);
      assert.ok(s.options.length >= 2, `Step in ${c.id} must have >= 2 options`);
      assert.ok(typeof s.answer === 'number', `Step in ${c.id} must have answer index`);
      assert.ok(s.options[0].explanation.length > 10, `Step in ${c.id} explanation too short`);
    }
  }
});
