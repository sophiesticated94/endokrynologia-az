import test from 'node:test';
import assert from 'node:assert/strict';

import {
  evaluateTraumaDissociation,
  DEFAULT_TRAUMA_INPUT,
} from '../lib/psychiatry/engines/trauma-dissociation-engine.ts';
import { evaluateNeurologyFeatures } from '../lib/psychiatry/engines/trauma-neurology-evaluator.ts';
import { evaluateFrameworkCriteria } from '../lib/psychiatry/engines/trauma-framework-evaluator.ts';
import { TRAUMA_PRESETS } from '../lib/psychiatry/presets/trauma-presets.ts';
import { getPreset, TraumaDissociationInputSchema } from '../lib/content/preset-registry.ts';
import { TRAUMA_PATIENT_THREADS } from '../lib/psychiatry/cases/trauma-threads.ts';
import {
  traumaLessons,
  traumaExperiences,
  traumaClaims,
} from '../lib/psychiatry/trauma-content.ts';

// 1. DOMAIN ENGINE INVARIANTS & FUNCTIONAL IMPACT
test('Trauma Engine: Functional impact (distress/impairment) is decoupled from symptom duration', () => {
  // Chronic duration WITHOUT functional impairment/distress does NOT meet criteria
  const resNoImpairment = evaluateFrameworkCriteria({
    identityDiscontinuity: 'distinct_personality_states',
    amnesiaType: 'recurrent_daily_activities',
    symptomDuration: 'chronic_months',
    functionalImpact: { distress: 'none', functionalImpairment: 'none' },
  });
  assert.equal(resNoImpairment.icd11.compatibility, 'does_not_meet');
  assert.equal(resNoImpairment.dsm5tr.compatibility, 'does_not_meet');

  // Unassessed functional impact yields insufficient_information
  const resUnassessed = evaluateFrameworkCriteria({
    identityDiscontinuity: 'distinct_personality_states',
    amnesiaType: 'recurrent_daily_activities',
    symptomDuration: 'chronic_months',
    functionalImpact: { distress: 'unassessed', functionalImpairment: 'unassessed' },
  });
  assert.equal(resUnassessed.icd11.compatibility, 'insufficient_information');
  assert.equal(resUnassessed.dsm5tr.compatibility, 'insufficient_information');

  // Clinically significant impairment with distinct states meets criteria
  const resValid = evaluateTraumaDissociation({
    identityDiscontinuity: 'distinct_personality_states',
    executiveControlPattern: 'recurrent_control_by_multiple_identity_states',
    amnesiaType: 'recurrent_daily_activities',
    depersonalizationDerealization: true,
    realityTesting: 'intact',
    functionalImpact: { distress: 'clinically_significant', functionalImpairment: 'clinically_significant' },
    symptomDuration: 'chronic_months',
  });
  const didHyp = resValid.hypotheses.find((h) => h.category === 'DID');
  assert.ok(didHyp);
  assert.equal(didHyp.level, 'primary_candidate');
  assert.ok(didHyp.condition.includes('6B64'));
});

// 2. EXCLUSIONS: UNRESOLVED VS CONFIRMED
test('Trauma Engine: Unresolved exclusions (suspected TLE) vs Confirmed medical exclusions', () => {
  // Suspected TLE (aura + stereotypy) -> unresolved exclusion, insufficient_information
  const resSuspected = evaluateFrameworkCriteria({
    identityDiscontinuity: 'distinct_personality_states',
    amnesiaType: 'recurrent_daily_activities',
    functionalImpact: { distress: 'clinically_significant', functionalImpairment: 'clinically_significant' },
    neurologicalFeatures: { hasAuraOrEpigastricRising: true, episodicPattern: 'stereotyped', episodeDuration: 'seconds' },
  });
  assert.equal(resSuspected.icd11.compatibility, 'insufficient_information');
  assert.ok(resSuspected.icd11.unresolvedExclusions.length > 0);

  // Confirmed epilepsy -> confirmed explanatory exclusion, does_not_meet
  const resConfirmed = evaluateFrameworkCriteria({
    identityDiscontinuity: 'distinct_personality_states',
    amnesiaType: 'recurrent_daily_activities',
    functionalImpact: { distress: 'clinically_significant', functionalImpairment: 'clinically_significant' },
    neurologicalFeatures: { confirmedDiagnosis: 'confirmed_epilepsy_explaining_symptoms', exclusionStatus: 'confirmed_explanatory' },
  });
  assert.equal(resConfirmed.icd11.compatibility, 'does_not_meet');
  assert.ok(resConfirmed.icd11.confirmedExclusions.length > 0);

  // Normal EEG does not rule out epilepsy (exclusion remains unresolved)
  const neuroAssessment = evaluateNeurologyFeatures({
    neurologicalFeatures: { hasAuraOrEpigastricRising: true, episodicPattern: 'stereotyped' },
    neurologicalInvestigations: { eeg: { status: 'normal' } },
  });
  assert.equal(neuroAssessment.exclusionStatus, 'unresolved');
  assert.ok(neuroAssessment.investigationInterpretation.eeg.includes('NICE NG217'));
});

// 3. DATA SUFFICIENCY & DEFAULT PATIENT
test('Trauma Engine: Default unassessed patient and per-hypothesis data sufficiency', () => {
  const defaultEval = evaluateTraumaDissociation(DEFAULT_TRAUMA_INPUT);
  assert.equal(defaultEval.overallDataSufficiency, 'insufficient');
  const didDefault = defaultEval.hypotheses.find((h) => h.category === 'DID');
  assert.equal(didDefault.dataSufficiency, 'insufficient');
  assert.notEqual(didDefault.level, 'primary_candidate');

  // Discontinuity present but amnesia is none -> insufficient data to diagnose DID
  const resNoAmnesia = evaluateTraumaDissociation({
    identityDiscontinuity: 'distinct_personality_states',
    amnesiaType: 'none',
    realityTesting: 'intact',
    functionalImpact: { distress: 'clinically_significant', functionalImpairment: 'clinically_significant' },
    symptomDuration: 'chronic_months',
  });
  const didNoAmnesia = resNoAmnesia.hypotheses.find((h) => h.category === 'DID');
  assert.equal(didNoAmnesia.dataSufficiency, 'insufficient');
  assert.equal(didNoAmnesia.level, 'possible_consideration');
});

// 4. PSYCHOSIS & VOICE MULTI-AXIAL CONVERGENCE
test('Trauma Engine: Multi-axial differential for voice hearing and psychosis convergence', () => {
  // Internal voice alone with intact reality testing != primary psychosis
  const resInternal = evaluateTraumaDissociation({
    identityDiscontinuity: 'distinct_personality_states',
    amnesiaType: 'recurrent_daily_activities',
    realityTesting: 'intact',
    functionalImpact: { distress: 'clinically_significant', functionalImpairment: 'clinically_significant' },
    voicePhenomenology: { present: true, location: 'internal', attribution: 'identity_state_related', conviction: 'insight_preserved' },
  });
  const psychHyp = resInternal.hypotheses.find((h) => h.category === 'Psychosis');
  assert.equal(psychHyp.level, 'unlikely_or_incompatible');

  // Preserved insight and acoustic projection alone != primary psychosis
  const resAcoustic = evaluateTraumaDissociation({
    realityTesting: 'intact',
    voicePhenomenology: { present: true, location: 'external', attribution: 'uncertain', conviction: 'insight_preserved' },
  });
  const psychAcoustic = resAcoustic.hypotheses.find((h) => h.category === 'Psychosis');
  assert.notEqual(psychAcoustic.level, 'primary_candidate');

  // Full psychosis convergence (impaired reality testing + high conviction delusions)
  const resPsychosis = evaluateTraumaDissociation({
    realityTesting: 'impaired_delusional',
    psychosisAxes: {
      realityTesting: 'markedly_impaired',
      delusions: { presence: 'present', conviction: 'high', organization: 'systematized' },
      formalThoughtDisorder: 'marked',
      negativeSymptoms: { affectiveFlattening: true, avolition: true },
      functionalDecline: 'clear',
    },
  });
  const psychFull = resPsychosis.hypotheses.find((h) => h.category === 'Psychosis');
  assert.equal(psychFull.level, 'primary_candidate');
});

// 5. BPD TRAIT CONVERGENCE (NO ARBITRARY POINT COUNTS)
test('Trauma Engine: BPD profile emerges from domain convergence, not isolated traits', () => {
  // Abandonment sensitivity alone != BPD primary candidate
  const resIsolated = evaluateTraumaDissociation({
    relationalDisturbance: { abandonmentSensitivity: 'marked' },
    affectRegulation: { reactiveLability: 'none', persistentDysregulation: 'none' },
  });
  assert.notEqual(resIsolated.hypotheses.find((h) => h.category === 'BPD')?.level, 'primary_candidate');

  // Convergence of core instability + self disturbance -> BPD primary candidate
  const resConvergent = evaluateTraumaDissociation({
    identityDiscontinuity: 'disturbed_sense_of_self',
    affectRegulation: { reactiveLability: 'marked', persistentDysregulation: 'hyperactivation' },
    relationalDisturbance: { abandonmentSensitivity: 'marked', unstableIntenseRelationships: 'present' },
    negativeSelfConcept: 'persistent_shame_guilt',
  });
  const bpdHyp = resConvergent.hypotheses.find((h) => h.category === 'BPD');
  assert.equal(bpdHyp.level, 'primary_candidate');
});

// 6. PTSD CORE TRIAD & cPTSD DSO TRIAD
test('Trauma Engine: PTSD core triad & cPTSD complete DSO triad', () => {
  // Intrusive memories without here-and-now quality do not fulfill PTSD core triad
  const resMemories = evaluateTraumaDissociation({
    reExperiencingInPresent: 'intrusive_memories_without_here_and_now_quality',
    traumaAvoidance: 'both',
    persistentCurrentThreat: 'both',
    functionalImpact: { distress: 'clinically_significant', functionalImpairment: 'clinically_significant' },
  });
  assert.equal(resMemories.hypotheses.find((h) => h.category === 'PTSD'), undefined);

  // Complete PTSD core + DSO triad -> cPTSD primary candidate
  const resCPTSD = evaluateTraumaDissociation({
    reExperiencingInPresent: 'vivid_flashback_here_and_now',
    traumaAvoidance: 'both',
    persistentCurrentThreat: 'both',
    affectRegulation: { reactiveLability: 'marked', persistentDysregulation: 'hyperactivation' },
    negativeSelfConcept: 'persistent_shame_guilt',
    relationalDisturbance: { sustainedDifficultyWithCloseness: 'present', persistentDetachmentOrAlienation: 'present' },
    functionalImpact: { distress: 'clinically_significant', functionalImpairment: 'clinically_significant' },
  });
  assert.equal(resCPTSD.hypotheses.find((h) => h.category === 'cPTSD')?.level, 'primary_candidate');
});

// 7. NEUROLOGICAL RED FLAGS & CLINICAL RULES (NO ARBITRARY POINTS)
test('Trauma Engine: Neurological clinical pathways without arbitrary scoring', () => {
  // Focal neurological deficit -> urgent_assessment
  const resFocal = evaluateNeurologyFeatures({
    neurologicalFeatures: { focalNeurologicalDeficits: 'present' },
  });
  assert.equal(resFocal.workupPriority, 'urgent_assessment');
  assert.equal(resFocal.concern, 'high');

  // Stereotyped brief episodes + aura -> specialist_assessment
  const resAura = evaluateNeurologyFeatures({
    neurologicalFeatures: { episodicPattern: 'stereotyped', episodeDuration: 'seconds', hasAuraOrEpigastricRising: true },
  });
  assert.equal(resAura.workupPriority, 'specialist_assessment');
});

// 8. ACTIVE LEARNING INVARIANTS ON 8 KEY REASONING LESSONS
test('Trauma Module: 8 KEY_REASONING_LESSONS have >= 2 activity types and >= 1 non-single-choice task', () => {
  const KEY_REASONING_LESSONS = [
    'did-tozsamosc-i-rozszczepienie',
    'did-roznicowanie-bpd-i-psychoza',
    'ptsd-kryteria-i-fenomenologia',
    'cptsd-zlozone-ptsd-icd11',
    'borderline-bpd-mechanizmy',
    'depersonalizacja-i-derealizacja',
    'amnezja-dysocjacyjna-i-fuga',
    'trauma-somatyka-mimiki-i-bezpieczenstwo',
  ];

  for (const lessonId of KEY_REASONING_LESSONS) {
    const exp = traumaExperiences[lessonId];
    assert.ok(exp, `Brak doświadczenia dla ${lessonId}`);
    const types = new Set([
      ...(exp.activities || []).map((a) => a.type),
      ...(exp.exitTicket || []).map((e) => e.type),
    ]);
    assert.ok(types.size >= 2, `Lekcja ${lessonId} musi mieć >= 2 różne typy aktywności`);
    const nonSingleChoice = [...types].filter((t) => t !== 'single_choice');
    assert.ok(nonSingleChoice.length >= 1, `Lekcja ${lessonId} musi mieć >= 1 zadanie inne niż single_choice`);
  }
});

// 9. RUNTIME SCHEMA VALIDATION FOR PRESETS AND FIXTURES
test('Trauma Module: Runtime TraumaDissociationInputSchema validation on presets', () => {
  for (const [id, preset] of Object.entries(TRAUMA_PRESETS)) {
    const parsed = TraumaDissociationInputSchema.safeParse(preset.initialState.input);
    assert.ok(parsed.success, `Preset ${id} nie przeszedł walidacji TraumaDissociationInputSchema: ${JSON.stringify(parsed.error?.issues)}`);
    assert.ok(getPreset(id), `Preset ${id} musi być w registry`);
  }
});

// 10. CURRICULUM, THREADS, CLAIMS & SOURCES INTEGRITY
test('Trauma Module: Curriculum parity, recurring patient threads and evidence claims', () => {
  assert.equal(traumaLessons.length, 16);
  assert.equal(Object.keys(TRAUMA_PATIENT_THREADS).length, 6);
  assert.ok(traumaClaims.length >= 20);

  // Elena thread uses ICD-11 6B64
  assert.ok(TRAUMA_PATIENT_THREADS['thread-elena-did'].establishedDiagnoses.some((d) => d.includes('6B64')));
  assert.ok(!TRAUMA_PATIENT_THREADS['thread-elena-did'].establishedDiagnoses.some((d) => d.includes('6B60')));

  // DID claim uses 6B64
  const didClaim = traumaClaims.find((c) => c.id === 'claim-trauma-did-core-criteria');
  assert.ok(didClaim && didClaim.statement.includes('6B64'));
});

// 11. ICD-11 CDDR 6B64 VS DSM-5-TR 300.14 AMNESIA CRITERION DIVERGENCE
test('Trauma Engine: ICD-11 6B64 vs DSM-5-TR 300.14 amnesia divergence when amnesia is none', () => {
  const fwEval = evaluateFrameworkCriteria({
    identityDiscontinuity: 'distinct_personality_states',
    executiveControlPattern: 'recurrent_control_by_multiple_identity_states',
    amnesiaType: 'none',
    functionalImpact: { distress: 'clinically_significant', functionalImpairment: 'clinically_significant' },
    symptomDuration: 'chronic_months',
  });

  // In DSM-5-TR, Criterion B is obligatory: amnesiaType === 'none' means does_not_meet
  assert.equal(fwEval.dsm5tr.compatibility, 'does_not_meet');
  assert.ok(fwEval.dsm5tr.criteriaMissing.some((c) => c.includes('Kryterium B')));

  // In ICD-11 CDDR, amnesia is typical/common but absence does NOT yield does_not_meet if recurrent control & discontinuity are present
  assert.notEqual(fwEval.icd11.compatibility, 'does_not_meet');
  assert.equal(fwEval.icd11.compatibility, 'meets');
  assert.ok(fwEval.icd11.criteriaNotRequired.some((n) => n.includes('Amnezja jest typową cechą DID wg ICD-11 CDDR')));
  assert.ok(fwEval.icd11.explanation.includes('amnezja nie jest warunkiem bezwzględnym'));
});

// 12. EXECUTIVE CONTROL PATTERN: FULL DID (6B64) VS PARTIAL DID (6B65)
test('Trauma Engine: Executive control differentiates full DID (6B64) from Partial DID (6B65)', () => {
  // Intermittent influence without executive control -> Partial DID 6B65 profile
  const partialEval = evaluateTraumaDissociation({
    identityDiscontinuity: 'distinct_personality_states',
    executiveControlPattern: 'intermittent_influence_without_control',
    amnesiaType: 'recurrent_daily_activities',
    functionalImpact: { distress: 'clinically_significant', functionalImpairment: 'clinically_significant' },
    realityTesting: 'intact',
  });

  const didHyp = partialEval.hypotheses.find((h) => h.category === 'DID');
  assert.ok(didHyp);
  assert.equal(didHyp.level, 'possible_consideration');
  assert.ok(didHyp.rationale.includes('Partial DID 6B65'));
  assert.ok(partialEval.opposingEvidence.DID.some((e) => e.includes('Partial DID, ICD-11 6B65')));

  // Recurrent control by multiple states -> full DID candidate
  const fullEval = evaluateTraumaDissociation({
    identityDiscontinuity: 'distinct_personality_states',
    executiveControlPattern: 'recurrent_control_by_multiple_identity_states',
    amnesiaType: 'recurrent_daily_activities',
    functionalImpact: { distress: 'clinically_significant', functionalImpairment: 'clinically_significant' },
    realityTesting: 'intact',
  });
  assert.equal(fullEval.hypotheses.find((h) => h.category === 'DID')?.level, 'primary_candidate');
});

// 13. UNASSESSED VALUES SEMANTICS (NO SPURIOUS EVIDENCE)
test('Trauma Engine: Unassessed values do not trigger false positive symptoms or spurious opposing evidence', () => {
  const evalUnassessed = evaluateTraumaDissociation({
    identityDiscontinuity: 'unassessed',
    traumaAvoidance: 'unassessed',
    persistentCurrentThreat: 'unassessed',
    negativeSelfConcept: 'unassessed',
    amnesiaType: 'unassessed',
  });

  // Opposing evidence must NOT claim symptoms are absent when they are merely unassessed
  assert.ok(!evalUnassessed.opposingEvidence.PTSD.some((e) => e.includes('Brak aktywnego unikania')));
  assert.ok(!evalUnassessed.opposingEvidence.PTSD.some((e) => e.includes('Brak utrzymującego się wzmożonego')));
  assert.ok(!evalUnassessed.opposingEvidence.cPTSD.some((e) => e.includes('negatywny obraz siebie')));
  assert.ok(!evalUnassessed.opposingEvidence.DID.some((e) => e.includes('Brak odrębnych stanów tożsamości')));
});

// 14. NORMALIZER ROBUSTNESS & LEGACY NORMALIZATION
test('Trauma Engine: Normalizer handles legacy fields without inventing clinical impairment', () => {
  const normalized = evaluateTraumaDissociation({
    symptomDuration: 'chronic_months',
    avoidanceHyperarousal: true,
    affectInstability: 'rapid_reactive_hours',
  });

  // symptomDuration === 'chronic_months' does NOT invent clinically_significant functionalImpact
  assert.equal(normalized.hypotheses.find((h) => h.category === 'DID')?.dataSufficiency, 'insufficient');
  assert.ok(normalized.missingInformation.some((m) => m.includes('dystresu / upośledzenia')));
});

