import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { evaluateTraumaDissociation } from '../lib/psychiatry/engines/trauma-dissociation-engine.ts';
import { TRAUMA_PRESETS } from '../lib/psychiatry/presets/trauma-presets.ts';
import { getPreset } from '../lib/content/preset-registry.ts';
import { TRAUMA_PATIENT_THREADS } from '../lib/psychiatry/cases/trauma-threads.ts';
import { PATIENT_THREADS } from '../lib/psychiatry/cases/threads.ts';
import {
  traumaLessons,
  traumaExperiences,
  traumaSources,
  traumaClaims,
} from '../lib/psychiatry/trauma-content.ts';

// ---------------------------------------------------------------------------
// 1. DOMAIN ENGINE INVARIANTS: DID, BPD, PSYCHOSIS, TLE, cPTSD
// ---------------------------------------------------------------------------

test('Trauma Engine: DID requires identity discontinuity + autobiographical amnesia context', () => {
  // Case A: Discontinuity + everyday amnesia -> primary candidate with ICD-11 6B64
  const resValid = evaluateTraumaDissociation({
    identityDiscontinuity: 'distinct_personality_states',
    amnesiaType: 'recurrent_daily_activities',
    depersonalizationDerealization: true,
    realityTesting: 'intact',
    traumaIntrusions: 'distressing_memories',
    avoidanceHyperarousal: true,
    affectInstability: 'none',
    interpersonalPattern: 'stable',
    negativeSelfConcept: 'none',
    hallucinations: 'internal_dialogue_ego_dystonic',
    thoughtDisorder: false,
    symptomDuration: 'chronic_months',
    suicidalityRisk: 'none',
  });

  const didHyp = resValid.hypotheses.find(h => h.category === 'DID');
  assert.ok(didHyp);
  assert.equal(didHyp.level, 'primary_candidate');
  assert.ok(didHyp.condition.includes('6B64'), 'DID must use ICD-11 6B64 code');
  assert.ok(!didHyp.condition.includes('6B60'), 'DID must NOT use old 6B60 code');
  assert.ok(resValid.supportingEvidence.DID.length >= 2);

  // Case B: Discontinuity WITHOUT amnesia (amnesiaType: 'none') -> NOT primary candidate
  const resNoAmnesia = evaluateTraumaDissociation({
    identityDiscontinuity: 'distinct_personality_states',
    amnesiaType: 'none',
    depersonalizationDerealization: true,
    realityTesting: 'intact',
    traumaIntrusions: 'none',
    avoidanceHyperarousal: false,
    affectInstability: 'none',
    interpersonalPattern: 'stable',
    negativeSelfConcept: 'none',
    hallucinations: 'none',
    thoughtDisorder: false,
    symptomDuration: 'chronic_months',
    suicidalityRisk: 'none',
  });

  const didNoAmnesiaHyp = resNoAmnesia.hypotheses.find(h => h.category === 'DID');
  assert.ok(didNoAmnesiaHyp);
  assert.notEqual(didNoAmnesiaHyp.level, 'primary_candidate');
  assert.ok(resNoAmnesia.opposingEvidence.DID.some(e => e.includes('amnezji')));
  assert.ok(resNoAmnesia.missingInformation.length > 0);
});

test('Trauma Engine: Hallucinations alone do not imply psychosis when reality testing is intact', () => {
  const res = evaluateTraumaDissociation({
    identityDiscontinuity: 'distinct_personality_states',
    amnesiaType: 'recurrent_daily_activities',
    depersonalizationDerealization: true,
    realityTesting: 'intact',
    traumaIntrusions: 'none',
    avoidanceHyperarousal: false,
    affectInstability: 'none',
    interpersonalPattern: 'stable',
    negativeSelfConcept: 'none',
    hallucinations: 'internal_dialogue_ego_dystonic',
    thoughtDisorder: false,
    symptomDuration: 'chronic_months',
    suicidalityRisk: 'none',
  });

  // Psychosis hypothesis should NOT be primary candidate
  const psychHyp = res.hypotheses.find(h => h.category === 'Psychosis');
  assert.equal(psychHyp, undefined);
  assert.ok(res.opposingEvidence.Psychosis.some(e => e.includes('nie stanowią dowodu schizofrenii')));
});

test('Trauma Engine: BPD identity disturbance != DID alter states', () => {
  const res = evaluateTraumaDissociation({
    identityDiscontinuity: 'disturbed_sense_of_self',
    amnesiaType: 'none',
    depersonalizationDerealization: true,
    realityTesting: 'transient_stress_induced',
    traumaIntrusions: 'none',
    avoidanceHyperarousal: false,
    affectInstability: 'rapid_reactive_hours',
    interpersonalPattern: 'intense_fear_of_abandonment',
    negativeSelfConcept: 'persistent_shame_guilt',
    hallucinations: 'none',
    thoughtDisorder: false,
    symptomDuration: 'chronic_months',
    suicidalityRisk: 'none',
  });

  const bpdHyp = res.hypotheses.find(h => h.category === 'BPD');
  assert.ok(bpdHyp);
  assert.equal(bpdHyp.level, 'primary_candidate');

  const didHyp = res.hypotheses.find(h => h.category === 'DID');
  assert.ok(didHyp);
  assert.equal(didHyp.level, 'unlikely_or_incompatible');
  assert.ok(res.opposingEvidence.DID.some(e => e.includes('zaburzeń osobowości')));
});

test('Trauma Engine: PTSD intrusions do not imply DID', () => {
  const res = evaluateTraumaDissociation({
    identityDiscontinuity: 'none',
    amnesiaType: 'trauma_specific',
    depersonalizationDerealization: false,
    realityTesting: 'intact',
    traumaIntrusions: 'flashbacks_acting_as_if',
    avoidanceHyperarousal: true,
    affectInstability: 'none',
    interpersonalPattern: 'stable',
    negativeSelfConcept: 'none',
    hallucinations: 'none',
    thoughtDisorder: false,
    symptomDuration: 'chronic_months',
    suicidalityRisk: 'none',
  });

  const ptsdHyp = res.hypotheses.find(h => h.category === 'PTSD');
  assert.ok(ptsdHyp);
  assert.equal(ptsdHyp.level, 'primary_candidate');

  const didHyp = res.hypotheses.find(h => h.category === 'DID');
  assert.ok(didHyp);
  assert.equal(didHyp.level, 'unlikely_or_incompatible');
});

test('Trauma Engine: Neurological red flags block premature psychiatric closure and prioritize TLE', () => {
  const res = evaluateTraumaDissociation({
    identityDiscontinuity: 'none',
    amnesiaType: 'brief_paroxysmal',
    depersonalizationDerealization: true,
    realityTesting: 'intact',
    traumaIntrusions: 'none',
    avoidanceHyperarousal: false,
    affectInstability: 'none',
    interpersonalPattern: 'stable',
    negativeSelfConcept: 'none',
    hallucinations: 'none',
    thoughtDisorder: false,
    symptomDuration: 'brief_episodes_seconds',
    neurologicalFeatures: {
      hasAuraOrEpigastricRising: true,
      stereotypedSecondsDuration: true,
    },
    suicidalityRisk: 'none',
  });

  assert.ok(res.redFlags.some(rf => rf.includes('workupu neurologicznego')));
  const tleHyp = res.hypotheses.find(h => h.category === 'TLE');
  assert.ok(tleHyp);
  assert.equal(tleHyp.level, 'possible_consideration');
  assert.ok(res.supportingEvidence.TLE.some(e => e.includes('Aura nadbrzuszna')));
});

test('Trauma Engine: Active substance exposure precludes psychiatric etiology like DID', () => {
  const res = evaluateTraumaDissociation({
    identityDiscontinuity: 'distinct_personality_states',
    amnesiaType: 'recurrent_daily_activities',
    depersonalizationDerealization: true,
    realityTesting: 'intact',
    traumaIntrusions: 'none',
    avoidanceHyperarousal: false,
    affectInstability: 'none',
    interpersonalPattern: 'stable',
    negativeSelfConcept: 'none',
    hallucinations: 'none',
    thoughtDisorder: false,
    symptomDuration: 'chronic_months',
    substanceContext: {
      activeIntoxicationOrWithdrawal: true,
      substanceDetails: 'Syntetyczne katynony',
    },
    suicidalityRisk: 'none',
  });

  assert.ok(res.redFlags.some(rf => rf.includes('Aktywna intoksykacja')));
  assert.ok(res.opposingEvidence.DID.some(e => e.includes('intoksykacji/odstawienia')));
});

test('Trauma Engine: cPTSD requires full DSO triad (affect dysregulation, negative self-concept, relational avoidance)', () => {
  // Case A: Full DSO triad present -> cPTSD primary candidate
  const resFullDSO = evaluateTraumaDissociation({
    identityDiscontinuity: 'disturbed_sense_of_self',
    amnesiaType: 'none',
    depersonalizationDerealization: true,
    realityTesting: 'intact',
    traumaIntrusions: 'distressing_memories',
    avoidanceHyperarousal: true,
    affectInstability: 'rapid_reactive_hours',
    interpersonalPattern: 'alienated_avoidant',
    negativeSelfConcept: 'persistent_shame_guilt',
    hallucinations: 'none',
    thoughtDisorder: false,
    symptomDuration: 'chronic_months',
    suicidalityRisk: 'none',
  });

  const cptsdHyp = resFullDSO.hypotheses.find(h => h.category === 'cPTSD');
  assert.ok(cptsdHyp);
  assert.equal(cptsdHyp.level, 'primary_candidate');
  assert.ok(resFullDSO.supportingEvidence.cPTSD.some(e => e.includes('Kompletna triada')));

  // Case B: Missing negativeSelfConcept ('none') -> cPTSD is NOT primary candidate (should be possible_consideration)
  const resPartialDSO = evaluateTraumaDissociation({
    identityDiscontinuity: 'disturbed_sense_of_self',
    amnesiaType: 'none',
    depersonalizationDerealization: true,
    realityTesting: 'intact',
    traumaIntrusions: 'distressing_memories',
    avoidanceHyperarousal: true,
    affectInstability: 'rapid_reactive_hours',
    interpersonalPattern: 'alienated_avoidant',
    negativeSelfConcept: 'none',
    hallucinations: 'none',
    thoughtDisorder: false,
    symptomDuration: 'chronic_months',
    suicidalityRisk: 'none',
  });

  const ptsdHyp = resPartialDSO.hypotheses.find(h => h.category === 'PTSD');
  assert.ok(ptsdHyp);
  assert.equal(ptsdHyp.level, 'primary_candidate');
  const cptsdPartialHyp = resPartialDSO.hypotheses.find(h => h.category === 'cPTSD');
  assert.ok(cptsdPartialHyp);
  assert.equal(cptsdPartialHyp.level, 'possible_consideration');
  assert.ok(resPartialDSO.opposingEvidence.cPTSD.some(e => e.includes('Brak pełnej triady DSO')));
});

test('Trauma Engine: Missing information and counterfactual reasoning provided', () => {
  const res = evaluateTraumaDissociation({
    identityDiscontinuity: 'distinct_personality_states',
    amnesiaType: 'none', // Not yet confirmed
    depersonalizationDerealization: true,
    realityTesting: 'intact',
    traumaIntrusions: 'none',
    avoidanceHyperarousal: false,
    affectInstability: 'none',
    interpersonalPattern: 'stable',
    negativeSelfConcept: 'none',
    hallucinations: 'internal_dialogue_ego_dystonic',
    thoughtDisorder: false,
    symptomDuration: 'chronic_months',
    suicidalityRisk: 'none',
  });

  assert.ok(res.missingInformation.length >= 1);
  assert.ok(res.whatWouldChangeDecision.length >= 3);
  assert.ok(res.whatWouldChangeDecision.some(w => w.includes('amnezję codzienną')));
  assert.ok(res.whatWouldChangeDecision.some(w => w.includes('Prawidłowe wyniki EEG i neuroobrazowania')));
});

// ---------------------------------------------------------------------------
// 2. CURRICULUM, LESSONS, EXPERIENCES, AND SOURCES INTEGRITY
// ---------------------------------------------------------------------------

test('Trauma Module: 16 curated lessons exist with strict schema parity', () => {
  assert.equal(traumaLessons.length, 16, 'Moduł 04 musi mieć 16 lekcji');

  const lessonsDir = path.resolve(process.cwd(), 'content-src/psychiatry/psych-trauma-dysocjacja/lessons');
  const files = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.json'));
  assert.equal(files.length, 16);

  for (const lesson of traumaLessons) {
    assert.equal(lesson.moduleId, 'psych-trauma-dysocjacja');
    assert.ok(lesson.title.length > 5);
    assert.ok(lesson.sections.length >= 3, `Lekcja ${lesson.id} musi mieć >=3 sekcje`);
    assert.ok(lesson.questions.length >= 3, `Lekcja ${lesson.id} musi mieć >=3 pytania`);
    assert.ok(lesson.sourceIds.length >= 1, `Lekcja ${lesson.id} musi mieć źródła`);

    // Verify filename === lesson.id
    assert.ok(files.includes(`${lesson.id}.json`), `Plik ${lesson.id}.json nie istnieje`);

    // Verify all sourceIds exist in sources.json
    for (const sid of lesson.sourceIds) {
      assert.ok(traumaSources[sid], `Źródło ${sid} w lekcji ${lesson.id} nie istnieje w sources.json`);
    }
  }
});

test('Trauma Module: 16 curated V2 experiences exist matching lessons with activity diversity', () => {
  const experiencesDir = path.resolve(process.cwd(), 'content-src/psychiatry/psych-trauma-dysocjacja/experiences');
  const files = fs.readdirSync(experiencesDir).filter(f => f.endsWith('.json'));
  assert.equal(files.length, 16);

  const observedTypes = new Set();

  for (const lesson of traumaLessons) {
    const exp = traumaExperiences[lesson.id];
    assert.ok(exp, `Brak doświadczenia dla lekcji ${lesson.id}`);
    assert.equal(exp.lessonId, lesson.id);
    assert.equal(exp.experienceVersion, 2);
    assert.ok(exp.objectives.length >= 2, `Doświadczenie ${lesson.id} musi mieć >= 2 cele`);
    assert.ok(exp.blocks.length === lesson.sections.length, `Liczba bloków w ${lesson.id} musi odpowiadać sekcjom lekcji`);
    assert.ok(exp.activities.length >= 1, `Doświadczenie ${lesson.id} musi mieć >= 1 aktywność`);
    assert.ok(exp.exitTicket.length >= 1, `Doświadczenie ${lesson.id} musi mieć >= 1 exit ticket`);

    // Track activity types
    for (const act of exp.activities) {
      observedTypes.add(act.type);
    }
    for (const exit of exp.exitTicket) {
      observedTypes.add(exit.type);
    }

    // Verify filename === exp.lessonId
    assert.ok(files.includes(`${exp.lessonId}.json`), `Plik ${exp.lessonId}.json nie istnieje`);
  }

  // Active learning invariant: multiple interactive activity types deployed
  assert.ok(observedTypes.has('single_choice'), 'Musi być single_choice');
  assert.ok(observedTypes.has('ordering'), 'Musi być ordering');
  assert.ok(observedTypes.has('missing_information'), 'Musi być missing_information');
});

test('Trauma Module: Presets resolve in PRESET_REGISTRY and have valid claim/source IDs', () => {
  const presetKeys = Object.keys(TRAUMA_PRESETS);
  assert.equal(presetKeys.length, 6, 'Dokładnie 6 presetów');

  for (const [key, def] of Object.entries(TRAUMA_PRESETS)) {
    const registered = getPreset(key);
    assert.ok(registered, `Preset ${key} nie jest zarejestrowany w PRESET_REGISTRY`);
    assert.equal(registered.widgetType, 'trauma-dissociation-workbench');
    assert.equal(registered.moduleId, 'psych-trauma-dysocjacja');

    // Verify sourceIds and claimIds
    if (def.sourceIds) {
      for (const sid of def.sourceIds) {
        assert.ok(traumaSources[sid], `Preset ${key} referuje nieznane źródło ${sid}`);
      }
    }
    if (def.claimIds) {
      for (const cid of def.claimIds) {
        assert.ok(traumaClaims.some(c => c.id === cid), `Preset ${key} referuje nieznany claim ${cid}`);
      }
    }
  }
});

test('Trauma Module: Longitudinal recurring patient threads', () => {
  const threadKeys = Object.keys(TRAUMA_PATIENT_THREADS);
  assert.equal(threadKeys.length, 6, 'Dokładnie 6 powracających pacjentów');

  const expectedThreads = [
    'thread-anna-ptsd',
    'thread-michal-dpdr',
    'thread-elena-did',
    'thread-karolina-bpd',
    'thread-tomasz-tle',
    'thread-kamil-psychosis',
  ];

  for (const tid of expectedThreads) {
    assert.ok(TRAUMA_PATIENT_THREADS[tid], `Brak wątku pacjenta ${tid}`);
    assert.ok(PATIENT_THREADS[tid], `Wątek ${tid} nie jest scalony w PATIENT_THREADS`);
    assert.ok(TRAUMA_PATIENT_THREADS[tid].keyHistoryFacts.length >= 3);
    assert.ok(TRAUMA_PATIENT_THREADS[tid].establishedDiagnoses.length >= 1);
  }

  // Elena DID thread uses 6B64
  assert.ok(
    TRAUMA_PATIENT_THREADS['thread-elena-did'].establishedDiagnoses.some(d => d.includes('6B64')),
    'Wątek Eleny musi zawierać kod ICD-11 6B64'
  );
  assert.ok(
    !TRAUMA_PATIENT_THREADS['thread-elena-did'].establishedDiagnoses.some(d => d.includes('6B60')),
    'Wątek Eleny nie może zawierać 6B60'
  );
});

test('Trauma Module: Evidence claims and sources parity', () => {
  assert.ok(traumaClaims.length >= 20, `Musi być co najmniej 20 claimów (obecnie ${traumaClaims.length})`);
  assert.ok(Object.keys(traumaSources).length >= 10, 'Musi być co najmniej 10 źródeł');

  for (const claim of traumaClaims) {
    assert.ok(claim.id.startsWith('claim-trauma-'), `Claim ${claim.id} musi mieć prefix claim-trauma-`);
    assert.ok(claim.sourceIds.length >= 1, `Claim ${claim.id} musi mieć źródło`);
    for (const sid of claim.sourceIds) {
      assert.ok(traumaSources[sid], `Claim ${claim.id} wskazuje na nieistniejące źródło ${sid}`);
    }
  }

  // Claim for DID core criteria must use 6B64
  const didClaim = traumaClaims.find(c => c.id === 'claim-trauma-did-core-criteria');
  assert.ok(didClaim);
  assert.ok(didClaim.statement.includes('6B64'));
  assert.ok(!didClaim.statement.includes('6B60'));
});
