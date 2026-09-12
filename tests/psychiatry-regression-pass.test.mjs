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
import { evaluateHunterCriteria, calculateDrugState } from '../lib/psychiatry-engine.ts';
import { evaluateExtripLithiumGuidance } from '../lib/psychiatry/extrip-guidelines.ts';
import { calculateD2Occupancy } from '../lib/psychiatry-pharmacokinetics-engine.ts';
import { PSYCHIATRY_EVIDENCE_REGISTRY } from '../lib/psychiatry/evidence/model-limitations.ts';
import { getSlotRank, compareSlotRanks } from '../lib/psychiatry/placement-helpers.ts';
import {
  hydratePsychiatryPatient,
  hydratePsychiatryPrescriptions,
  hydrateSafetySignsFromPreset,
} from '../lib/psychiatry/presets/hydration.ts';
import { getDiagnosticDurationCriteria } from '../lib/psychiatry/classification-timings.ts';

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
    'mse-map', 'psychosis-differential', 'bdnf-trkb-pathway', 'mood-timeline',
    'fear-circuit', 'cstc-loop', 'monoamine-synapse', 'd2-pathways',
    'cyp-network', 'serotonin-nms-hunter', 'delirium-timeline',
    'delirium-dementia-matrix', 'neurocognitive-differential-map',
    'hippocampal-network-progression', 'dlb-pathway',
    'anticholinergic-burden-consequences',
  ]);
  const validInlineWidgets = new Set([
    'mse-workbench', 'criteria-matcher', 'd2-pet-explorer',
    'lithium-tdm-interpreter', 'tdm-timing-validator',
    'hunter-criteria-evaluator', 'fridericia-qtc-calculator',
    '4at-calculator', 'cause-hunt', 'neuro-clock',
    'bpsd-cause-hunt', 'geriatric-med-review', 'capacity-evaluator',
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
  assert.ok(getSlotRank('after-intro') < getSlotRank('after-text'));
  assert.ok(getSlotRank('after-text') < getSlotRank('before-checkpoint'));
  assert.ok(getSlotRank('before-checkpoint') < getSlotRank('checkpoint'));
  assert.ok(getSlotRank('checkpoint') < getSlotRank('after-checkpoint'));
  assert.ok(getSlotRank('after-checkpoint') < getSlotRank('end-of-block'));
  assert.ok(compareSlotRanks('after-intro', 'after-text') < 0);
  assert.ok(compareSlotRanks('end-of-block', 'checkpoint') > 0);
  assert.equal(compareSlotRanks('checkpoint', 'checkpoint'), 0);

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
    assert.ok(
      ['diagnostic', 'pharmacology', 'safety', 'neuro-geriatric'].includes(preset.tab),
      `Invalid tab ${preset.tab}`
    );
    assert.ok(preset.patientSummary.length > 10, 'Preset must have patientSummary');
    if (preset.data.lessonId) {
      assert.ok(lessonIds.has(preset.data.lessonId), `Preset ${preset.id} lessonId not found`);
    }
  }
});

// Test E: Preset hydration propagates fields into state
test('Test E: Preset hydration propagates fields into state', () => {
  const basePatient = {
    age: 35,
    sex: 'female',
    cyp2d6Phenotype: 'NM',
    cyp2c19Phenotype: 'NM',
    substanceUse: 'brak',
    adherencePercent: 100,
  };
  const clozapinePreset = ALL_PSYCHIATRY_PRESETS['clozapine-smoking-001'];
  assert.equal(clozapinePreset.data.smokingStatus, 'zaprzestanie_palenia');
  assert.equal(clozapinePreset.data.claimKey, 'clozapine-smoking-cyp1a2');
  const pHydrated = hydratePsychiatryPatient(basePatient, clozapinePreset.data);
  assert.equal(pHydrated.substanceUse, 'zaprzestanie_palenia');
  const rxHydrated = hydratePsychiatryPrescriptions(clozapinePreset.data, clozapinePreset.id);
  assert.ok(rxHydrated.some(r => r.drugId === 'clozapine'));

  const cypPreset = ALL_PSYCHIATRY_PRESETS['cyp-interaction-001'];
  assert.equal(cypPreset.data.inhibitor, 'fluoxetine');
  assert.equal(cypPreset.data.substrate, 'venlafaxine');
  const rxCyp = hydratePsychiatryPrescriptions(cypPreset.data, cypPreset.id);
  assert.ok(rxCyp.some(r => r.drugId === 'fluoxetine'));
  assert.ok(rxCyp.some(r => r.drugId === 'venlafaxine'));

  const d2Preset = ALL_PSYCHIATRY_PRESETS['d2-evidence-001'];
  assert.equal(d2Preset.data.antagonistDrug, 'risperidone');
  assert.equal(d2Preset.data.partialAgonistDrug, 'aripiprazole');
  const rxD2 = hydratePsychiatryPrescriptions(d2Preset.data, d2Preset.id);
  assert.ok(rxD2.some(r => r.drugId === 'risperidone'));
  assert.ok(rxD2.some(r => r.drugId === 'aripiprazole'));

  const lithiumPreset = ALL_PSYCHIATRY_PRESETS['lithium-tdm-measured-001'];
  assert.equal(lithiumPreset.data.measuredLevel, 1.45);
  assert.equal(lithiumPreset.data.hoursSinceDose, 12);
  assert.equal(lithiumPreset.data.eGfr, 62);
  const pLithium = hydratePsychiatryPatient(basePatient, lithiumPreset.data);
  assert.equal(pLithium.labEgfr, 62);
  const rxLithium = hydratePsychiatryPrescriptions(lithiumPreset.data, lithiumPreset.id);
  assert.ok(rxLithium.some(r => r.drugId === 'lithium'));

  const qtcPreset = ALL_PSYCHIATRY_PRESETS['qtc-crediblemeds-001'];
  assert.equal(qtcPreset.data.rawQt, 490);
  assert.equal(qtcPreset.data.potassium, 3.2);
  const pQtc = hydratePsychiatryPatient(basePatient, qtcPreset.data);
  assert.equal(pQtc.labPotassium, 3.2);

  const hunterBranch5 = ALL_PSYCHIATRY_PRESETS['serotonin-hunter-branch5'];
  if (hunterBranch5) {
    const signs = hydrateSafetySignsFromPreset(hunterBranch5.data);
    assert.equal(signs.hypertonia, true);
    assert.equal(signs.hyperthermiaOver38, true);
  }
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

  // NOT_INDICATED: stężenie terapeutyczne przy pełnej ocenie
  const notInd = evaluateExtripLithiumGuidance({
    measuredConcentrationMmolL: 0.8,
    eGfr: 90,
    decreasedConsciousness: false,
    seizures: false,
    dangerousDysrhythmias: false,
    significantConfusion: false,
    projectedHoursToLessThan1MmolL: 0,
  });
  assert.equal(notInd.recommendationLevel, 'NOT_INDICATED');
  assert.equal(notInd.fullyEvaluated, true);
});

// Test H: DSM-5-TR vs ICD-11 duration criteria
test('Test H: DSM-5-TR vs ICD-11 duration criteria', () => {
  const schCriteria = getDiagnosticDurationCriteria('schizophrenia');
  assert.equal(schCriteria.dsm5tr.totalDurationMonths, 6);
  assert.equal(schCriteria.dsm5tr.activePhaseMonths, 1);
  assert.equal(schCriteria.icd11.totalDurationMonths, 1);
  assert.equal(schCriteria.icd11.activePhaseMonths, 1);
  assert.ok(schCriteria.dsm5tr.totalDurationMonths > schCriteria.icd11.totalDurationMonths);

  const affCriteria = getDiagnosticDurationCriteria('schizoaffective');
  assert.equal(affCriteria.dsm5tr.isolatedPsychosisWeeks, 2);
  assert.equal(affCriteria.icd11.totalDurationMonths, 1);
  assert.ok(affCriteria.dsm5tr.summaryText.includes('2 tygodnie'));
  assert.ok(affCriteria.icd11.summaryText.includes('1 miesiąc'));
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

// Test J: Claim-level evidence keys resolve (all 10 canonical claims and aliases)
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
    'cyp-interaction-observations',
  ];

  for (const key of requiredClaimKeys) {
    const claim = PSYCHIATRY_EVIDENCE_REGISTRY[key];
    assert.ok(claim, `Missing evidence claim for key: ${key}`);
    assert.ok(claim.id, `Claim ${key} must have id`);
    assert.ok(claim.claimLabel.length > 5, `Claim ${key} claimLabel too short`);
    assert.ok(claim.quickSummary.length > 15, `Claim ${key} quickSummary too short`);
    assert.ok(claim.researchContext?.limitations?.length > 0, `Claim ${key} limitations missing`);
    assert.ok(claim.sourceId, `Claim ${key} must have sourceId`);
  }

  assert.ok(PSYCHIATRY_EVIDENCE_REGISTRY['d2-occupancy-model']);
  assert.ok(PSYCHIATRY_EVIDENCE_REGISTRY['lithium-therapeutic-range']);
  assert.ok(PSYCHIATRY_EVIDENCE_REGISTRY['hunter-criteria-validity']);
});

// Test K: Longitudinal cases do not have exact 4-step lock
test('Test K: Longitudinal cases do not have exact 4-step lock', () => {
  assert.equal(psychiatryCases.length, 32);
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

// Test L: Hunter branch 5 hypertonia undefined vs true
test('Test L: Hunter branch 5 hypertonia undefined vs true', () => {
  const ssriRx = [{ drugId: 'sertraline', doseMg: 100 }];
  const signsBase = {
    spontaneousClonus: false,
    inducibleClonus: true,
    ocularClonus: false,
    agitation: false,
    diaphoresis: false,
    tremor: false,
    hyperreflexia: false,
    hyperthermiaOver38: true,
  };

  const undefRes = evaluateHunterCriteria(ssriRx, { ...signsBase, hypertonia: undefined });
  assert.equal(undefRes.meetsCriteria, false);
  assert.ok(undefRes.missingInformation?.some(m => m.includes('hipertoni')));

  const falseRes = evaluateHunterCriteria(ssriRx, { ...signsBase, hypertonia: false });
  assert.equal(falseRes.meetsCriteria, false);

  const trueRes = evaluateHunterCriteria(ssriRx, { ...signsBase, hypertonia: true });
  assert.equal(trueRes.meetsCriteria, true);
  assert.equal(trueRes.branchNumber, 5);
  assert.equal(trueRes.severity, 'stan_zagrozenia_zycia');
});

// Test M: EXTRIP missing data and per-criterion status
test('Test M: EXTRIP missing data and per-criterion status', () => {
  const emptyRes = evaluateExtripLithiumGuidance({});
  assert.equal(emptyRes.recommendationLevel, 'insufficient_information');
  assert.equal(emptyRes.recommendation, 'insufficient_information');
  assert.ok(emptyRes.missingCriticalInputs.length >= 2);

  const noConcRes = evaluateExtripLithiumGuidance({
    eGfr: 30,
    decreasedConsciousness: false,
    seizures: false,
    dangerousDysrhythmias: false,
  });
  assert.equal(noConcRes.recommendationLevel, 'insufficient_information');
  assert.ok(noConcRes.missingCriticalInputs.some(m => m.toLowerCase().includes('stężen')));

  const concOnlyRes = evaluateExtripLithiumGuidance({ measuredConcentrationMmolL: 4.5 });
  assert.equal(concOnlyRes.recommendationLevel, 'insufficient_information');
  assert.ok(concOnlyRes.missingCriticalInputs.some(m => m.includes('eGFR')));
  assert.ok(concOnlyRes.criteriaEvaluated.some(c => c.status === 'unknown'));

  const validRes = evaluateExtripLithiumGuidance({
    measuredConcentrationMmolL: 4.2,
    eGfr: 35,
    decreasedConsciousness: false,
    seizures: false,
    dangerousDysrhythmias: false,
    significantConfusion: false,
    projectedHoursToLessThan1MmolL: 24,
  });
  assert.equal(validRes.recommendationLevel, 'RECOMMENDED');
  assert.ok(validRes.criteriaEvaluated.every(c => c.status === 'met' || c.status === 'not_met'));
});

// Test N: calculateDrugState exposure direction and no fake ng/ml
test('Test N: calculateDrugState exposure direction and no fake ng/ml', () => {
  const patientNM = {
    age: 30,
    sex: 'male',
    cyp2d6Phenotype: 'NM',
    cyp2c19Phenotype: 'NM',
    substanceUse: 'brak',
    adherencePercent: 100,
  };
  const standardState = calculateDrugState({ drugId: 'olanzapine', doseMg: 10 }, patientNM);
  assert.equal(typeof standardState.estimatedCss, 'string');
  assert.ok(!standardState.estimatedCss.includes('ng/ml'));
  assert.equal(standardState.exposureTendency, 'neutral');

  const patientPM = { ...patientNM, cyp2d6Phenotype: 'PM' };
  const pmState = calculateDrugState({ drugId: 'fluoxetine', doseMg: 20 }, patientPM);
  assert.equal(pmState.exposureTendency, 'higher');
  assert.ok(pmState.estimatedCss.includes('Exposure may increase'));

  const patientCessation = { ...patientNM, substanceUse: 'zaprzestanie_palenia' };
  const clozState = calculateDrugState({ drugId: 'clozapine', doseMg: 300 }, patientCessation);
  assert.ok(clozState.estimatedCss.includes('deindukcja CYP1A2'));
  assert.ok(clozState.estimatedCss.includes('50–100%'));
  assert.ok(!clozState.estimatedCss.includes('ng/ml'));

  const lithState = calculateDrugState({ drugId: 'lithium', doseMg: 750 }, patientNM);
  assert.ok(lithState.estimatedCss.includes('Measured TDM required'));
});

// Test O: Partial agonists do not show Kapur window
test('Test O: Partial agonists do not show Kapur window', () => {
  const ariOccupancy = calculateD2Occupancy('aripiprazole', 15);
  assert.equal(ariOccupancy.heuristicZone, 'not_applicable_to_partial_agonist');
  assert.equal(ariOccupancy.pharmacologicClass, 'partial_agonist');
  assert.ok(ariOccupancy.clinicalInterpretation.includes('aktywności wewnętrznej'));
  assert.ok(ariOccupancy.clinicalInterpretation.includes('heurystyka nie dotyczy') ||
            ariOccupancy.clinicalInterpretation.includes('heurystyka'));
  assert.ok(ariOccupancy.clinicalInterpretation.includes('akatyzja') ||
            ariOccupancy.clinicalInterpretation.includes('akatyzji'));
  assert.ok(!ariOccupancy.clinicalInterpretation.includes('chroni przed EPS'));

  const rispOccupancy = calculateD2Occupancy('risperidone', 4);
  assert.equal(rispOccupancy.pharmacologicClass, 'antagonist');
  assert.notEqual(rispOccupancy.heuristicZone, 'not_applicable_to_partial_agonist');
});

// Test P: Evidence registry integrity and claim lookups
test('Test P: Evidence registry integrity and claim lookups', () => {
  const registryKeys = Object.keys(PSYCHIATRY_EVIDENCE_REGISTRY);
  assert.ok(registryKeys.length >= 10);
  for (const key of registryKeys) {
    const claim = PSYCHIATRY_EVIDENCE_REGISTRY[key];
    assert.ok(claim.id, `Claim ${key} has no id`);
    assert.ok(claim.claimLabel, `Claim ${key} has no label`);
    assert.ok(claim.quickSummary, `Claim ${key} has no quickSummary`);
  }
});

