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
    reExperiencingInPresent: 'none',
    avoidanceHyperarousal: false,
    affectInstability: 'none',
    interpersonalPattern: 'stable',
    negativeSelfConcept: 'none',
    hallucinations: 'internal_dialogue_ego_dystonic',
    thoughtDisorder: false,
    symptomDuration: 'chronic_months',
    suicidalityRisk: 'none',
  });

  const didHyp = resValid.hypotheses.find((h) => h.category === 'DID');
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
    reExperiencingInPresent: 'none',
    avoidanceHyperarousal: false,
    affectInstability: 'none',
    interpersonalPattern: 'stable',
    negativeSelfConcept: 'none',
    hallucinations: 'none',
    thoughtDisorder: false,
    symptomDuration: 'chronic_months',
    suicidalityRisk: 'none',
  });

  const didNoAmnesiaHyp = resNoAmnesia.hypotheses.find((h) => h.category === 'DID');
  assert.ok(didNoAmnesiaHyp);
  assert.equal(didNoAmnesiaHyp.level, 'possible_consideration');
  assert.ok(resNoAmnesia.opposingEvidence.DID.some((e) => e.includes('luk pamięciowych')));
  assert.ok(resNoAmnesia.missingInformation.length > 0);
});

test('Trauma Engine: Comparative framework analysis (ICD-11 6B64 vs DSM-5-TR 300.14)', () => {
  const res = evaluateTraumaDissociation({
    identityDiscontinuity: 'distinct_personality_states',
    amnesiaType: 'recurrent_daily_activities',
    depersonalizationDerealization: true,
    realityTesting: 'intact',
    symptomDuration: 'chronic_months',
    suicidalityRisk: 'none',
  });

  assert.ok(res.frameworkAnalysis);
  const { icd11, dsm5tr } = res.frameworkAnalysis;

  // ICD-11 6B64 criteria
  assert.equal(icd11.framework, 'icd11');
  assert.equal(icd11.diagnosisCode, '6B64');
  assert.equal(icd11.compatibility, 'meets');
  assert.ok(icd11.criteriaMet.some((c) => c.includes('Kryterium tożsamości')));
  assert.ok(icd11.criteriaMet.some((c) => c.includes('Kryterium pamięci')));

  // DSM-5-TR 300.14 criteria
  assert.equal(dsm5tr.framework, 'dsm5tr');
  assert.equal(dsm5tr.diagnosisCode, '300.14');
  assert.equal(dsm5tr.compatibility, 'meets');
  assert.ok(dsm5tr.criteriaMet.some((c) => c.includes('Kryterium A')));
  assert.ok(dsm5tr.criteriaMet.some((c) => c.includes('Kryterium B')));

  // Invariant: framework presentation toggle does not alter underlying hypotheses
  const didHyp = res.hypotheses.find((h) => h.category === 'DID');
  assert.ok(didHyp);
  assert.equal(didHyp.level, 'primary_candidate');
});

test('Trauma Engine: Decoupled confidence and data sufficiency invariants', () => {
  // Missing critical information prevents 'high' confidence and 'primary_candidate'
  const resIncomplete = evaluateTraumaDissociation({
    identityDiscontinuity: 'distinct_personality_states',
    amnesiaType: 'none',
    realityTesting: 'intact',
    symptomDuration: 'chronic_months',
  });

  const didHyp = resIncomplete.hypotheses.find((h) => h.category === 'DID');
  assert.ok(didHyp);
  assert.equal(didHyp.dataSufficiency, 'insufficient');
  assert.notEqual(didHyp.confidence, 'high');
  assert.notEqual(didHyp.level, 'primary_candidate');
});

test('Trauma Engine: Multi-axial differential for voice hearing and hallucinations vs psychosis', () => {
  const resInternalVoices = evaluateTraumaDissociation({
    identityDiscontinuity: 'distinct_personality_states',
    amnesiaType: 'recurrent_daily_activities',
    depersonalizationDerealization: true,
    realityTesting: 'intact',
    hallucinations: 'internal_dialogue_ego_dystonic',
    voicePhenomenology: {
      present: true,
      perceivedLocation: 'inside_head',
      attribution: 'identity_state_related',
      conviction: 'insight_preserved',
    },
    thoughtDisorder: false,
    symptomDuration: 'chronic_months',
    suicidalityRisk: 'none',
  });

  // Psychosis hypothesis should NOT be primary candidate
  const psychHyp = resInternalVoices.hypotheses.find((h) => h.category === 'Psychosis');
  assert.ok(psychHyp);
  assert.notEqual(psychHyp.level, 'primary_candidate');
  assert.equal(psychHyp.level, 'unlikely_or_incompatible');

  // Invariant: Acoustic projection alone does NOT diagnose psychosis without impaired reality testing
  const resAcoustic = evaluateTraumaDissociation({
    identityDiscontinuity: 'none',
    amnesiaType: 'none',
    realityTesting: 'intact',
    hallucinations: 'external_auditory_voices',
    voicePhenomenology: {
      present: true,
      perceivedLocation: 'acoustic_external_space',
      attribution: 'unclear',
      conviction: 'insight_preserved',
    },
    symptomDuration: 'chronic_months',
  });
  const psychAcoustic = resAcoustic.hypotheses.find((h) => h.category === 'Psychosis');
  assert.notEqual(psychAcoustic?.level, 'primary_candidate');
});

test('Trauma Engine: BPD identity disturbance != DID alter states', () => {
  const res = evaluateTraumaDissociation({
    identityDiscontinuity: 'disturbed_sense_of_self',
    amnesiaType: 'none',
    depersonalizationDerealization: true,
    realityTesting: 'transient_stress_induced',
    affectInstability: 'rapid_reactive_hours',
    interpersonalPattern: 'intense_fear_of_abandonment',
    negativeSelfConcept: 'persistent_shame_guilt',
    hallucinations: 'none',
    thoughtDisorder: false,
    symptomDuration: 'chronic_months',
    suicidalityRisk: 'none',
  });

  const bpdHyp = res.hypotheses.find((h) => h.category === 'BPD');
  assert.ok(bpdHyp);
  assert.equal(bpdHyp.level, 'primary_candidate');

  const didHyp = res.hypotheses.find((h) => h.category === 'DID');
  assert.ok(didHyp);
  assert.equal(didHyp.level, 'unlikely_or_incompatible');
  assert.ok(res.opposingEvidence.DID.some((e) => e.includes('zaburzeń osobowości')));
});

test('Trauma Engine: PTSD core 3-domain rule (ICD-11 CDDR)', () => {
  // Intrusive memories WITHOUT here-and-now quality do NOT satisfy core PTSD re-experiencing
  const resMemoriesOnly = evaluateTraumaDissociation({
    identityDiscontinuity: 'none',
    amnesiaType: 'none',
    realityTesting: 'intact',
    reExperiencingInPresent: 'intrusive_memories_without_here_and_now_quality',
    traumaAvoidance: 'both',
    persistentCurrentThreat: 'hypervigilance',
    symptomDuration: 'chronic_months',
  });
  const ptsdMemoriesHyp = resMemoriesOnly.hypotheses.find((h) => h.category === 'PTSD');
  assert.equal(ptsdMemoriesHyp, undefined, 'Memories without here-and-now cannot make PTSD primary');

  // Full re-experiencing + avoidance + threat satisfies core PTSD
  const resFullCore = evaluateTraumaDissociation({
    identityDiscontinuity: 'none',
    amnesiaType: 'trauma_specific',
    realityTesting: 'intact',
    reExperiencingInPresent: 'vivid_flashback_here_and_now',
    traumaAvoidance: 'both',
    persistentCurrentThreat: 'both',
    symptomDuration: 'chronic_months',
  });
  const ptsdFullHyp = resFullCore.hypotheses.find((h) => h.category === 'PTSD');
  assert.ok(ptsdFullHyp);
  assert.equal(ptsdFullHyp.level, 'primary_candidate');
});

test('Trauma Engine: cPTSD requires full DSO triad (affect, self-concept, relational)', () => {
  // Full DSO triad present -> cPTSD primary candidate
  const resFullDSO = evaluateTraumaDissociation({
    identityDiscontinuity: 'disturbed_sense_of_self',
    amnesiaType: 'none',
    depersonalizationDerealization: true,
    realityTesting: 'intact',
    reExperiencingInPresent: 'vivid_flashback_here_and_now',
    traumaAvoidance: 'both',
    persistentCurrentThreat: 'both',
    affectRegulation: { reactiveLability: 'marked', persistentDysregulation: 'hyperactivation' },
    negativeSelfConcept: 'persistent_shame_guilt',
    relationalDisturbance: { sustainedDifficultyWithCloseness: 'present', persistentDetachmentOrAlienation: 'present' },
    symptomDuration: 'chronic_months',
  });

  const cptsdHyp = resFullDSO.hypotheses.find((h) => h.category === 'cPTSD');
  assert.ok(cptsdHyp);
  assert.equal(cptsdHyp.level, 'primary_candidate');
  assert.ok(resFullDSO.supportingEvidence.cPTSD.some((e) => e.includes('Kompletna triada DSO')));

  // Missing negativeSelfConcept ('none') -> cPTSD is NOT primary candidate (possible_consideration)
  const resPartialDSO = evaluateTraumaDissociation({
    identityDiscontinuity: 'disturbed_sense_of_self',
    amnesiaType: 'none',
    realityTesting: 'intact',
    reExperiencingInPresent: 'vivid_flashback_here_and_now',
    traumaAvoidance: 'both',
    persistentCurrentThreat: 'both',
    affectRegulation: { reactiveLability: 'marked', persistentDysregulation: 'hyperactivation' },
    negativeSelfConcept: 'none',
    relationalDisturbance: { sustainedDifficultyWithCloseness: 'present', persistentDetachmentOrAlienation: 'present' },
    symptomDuration: 'chronic_months',
  });

  const ptsdHyp = resPartialDSO.hypotheses.find((h) => h.category === 'PTSD');
  assert.ok(ptsdHyp);
  assert.equal(ptsdHyp.level, 'primary_candidate');
  const cptsdPartialHyp = resPartialDSO.hypotheses.find((h) => h.category === 'cPTSD');
  assert.ok(cptsdPartialHyp);
  assert.equal(cptsdPartialHyp.level, 'possible_consideration');
  assert.ok(resPartialDSO.opposingEvidence.cPTSD.some((e) => e.includes('Brak pełnej triady DSO')));
});

test('Trauma Engine: Neurological red flags & TLE safety invariants', () => {
  const res = evaluateTraumaDissociation({
    identityDiscontinuity: 'none',
    amnesiaType: 'brief_paroxysmal',
    depersonalizationDerealization: true,
    realityTesting: 'intact',
    symptomDuration: 'brief_episodes_seconds',
    neurologicalFeatures: {
      hasAuraOrEpigastricRising: true,
      stereotypedSecondsDuration: true,
      episodeDuration: 'seconds',
      episodicPattern: 'stereotyped',
    },
    neurologicalInvestigations: {
      routineEeg: 'normal',
      brainMri: 'normal',
    },
  });

  // Red flags for priority neurology workup
  assert.ok(res.redFlags.some((rf) => rf.includes('neurologicznego')));

  // Safety invariant: TLE is NEVER diagnosed as confirmed / primary candidate
  const tleHyp = res.hypotheses.find((h) => h.category === 'TLE');
  assert.ok(tleHyp);
  assert.equal(tleHyp.level, 'possible_consideration');
  assert.notEqual(tleHyp.level, 'primary_candidate');

  // Normal EEG/MRI does NOT rule out TLE nor confirm dissociation
  assert.ok(res.neurologicalAssessment.opposingFeatures.some((e) => e.includes('nie wyklucza')));
});

test('Trauma Engine: Active substance exposure precludes psychiatric etiology like DID', () => {
  const res = evaluateTraumaDissociation({
    identityDiscontinuity: 'distinct_personality_states',
    amnesiaType: 'recurrent_daily_activities',
    depersonalizationDerealization: true,
    realityTesting: 'intact',
    symptomDuration: 'chronic_months',
    substanceContext: {
      activeIntoxicationOrWithdrawal: true,
      substanceDetails: 'Syntetyczne katynony',
    },
  });

  assert.ok(res.redFlags.some((rf) => rf.includes('Aktywna intoksykacja')));
  assert.ok(res.opposingEvidence.DID.some((e) => e.includes('intoksykacji/odstawienia')));
});

test('Trauma Engine: Missing information and counterfactual reasoning provided', () => {
  const res = evaluateTraumaDissociation({
    identityDiscontinuity: 'distinct_personality_states',
    amnesiaType: 'none',
    depersonalizationDerealization: true,
    realityTesting: 'intact',
    hallucinations: 'internal_dialogue_ego_dystonic',
    thoughtDisorder: false,
    symptomDuration: 'chronic_months',
  });

  assert.ok(res.missingInformation.length >= 1);
  assert.ok(res.whatWouldChangeDecision.length >= 3);
  assert.ok(res.whatWouldChangeDecision.some((w) => w.toLowerCase().includes('amnezj') && w.toLowerCase().includes('codzienn')));
  assert.ok(res.whatWouldChangeDecision.some((w) => w.includes('Prawidłowe wyniki EEG i MRI')));
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
