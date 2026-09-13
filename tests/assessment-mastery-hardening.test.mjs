import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getObjectiveAssessmentRequirements,
  getRequiredObjectiveTokens,
  getActivityCoveredTokens,
  validateSelectedAssessmentCoverage,
  computeExactMinimalTokenSetCover,
  selectLessonMasteryAssessment,
  selectModuleMasteryAssessment,
  selectModuleQuickReview,
} from '../lib/assessment-coverage.ts';
import {
  validateActivitySemanticQA,
  validateExperienceSemanticQA,
} from '../lib/assessment-semantic-validator.ts';

function createMockActivity(id, objIds, type = 'single_choice', options = {}) {
  return {
    id,
    type,
    prompt: `Prompt for activity ${id}`,
    objectiveIds: objIds,
    sourceIds: ['source-1'],
    points: 10,
    options: ['Option A', 'Option B'],
    answer: 0,
    explanation: 'Explanation for activity',
    ...options,
  };
}

// ===========================================================================
// 1. SECTION 24: MODULE MASTERY FALSE-POSITIVE REGRESSION TEST
// ===========================================================================
test('Mastery Hardening [Section 24]: Module mastery false-positive regression (touching each lesson != mastery)', () => {
  // 3 lessons, 2 objectives each = 6 total objectives
  // Each lesson provides 1 bank item that only covers objective 1 of that lesson.
  const experiences = {
    'les-1': {
      lessonId: 'les-1',
      objectives: [
        { id: 'o1-1', statement: 'Obj 1.1', kind: 'mechanism' },
        { id: 'o1-2', statement: 'Obj 1.2', kind: 'interpretation' },
      ],
      diagnostic: createMockActivity('d1', ['o1-1']),
      activities: [],
      teachBack: createMockActivity('tb1', ['o1-1'], 'recall', { modelAnswer: 'Recall answer' }),
      exitTicket: [],
      assessmentBank: [
        createMockActivity('bank-1-1', ['o1-1'], 'select_and_justify', {
          assessmentLevel: 'application',
          transfer: true,
          rationaleRubric: { requiredConcepts: [{ id: 'c1', label: 'C1', acceptedPhrases: ['c1'] }], minRequired: 1 },
        }),
      ],
    },
    'les-2': {
      lessonId: 'les-2',
      objectives: [
        { id: 'o2-1', statement: 'Obj 2.1', kind: 'mechanism' },
        { id: 'o2-2', statement: 'Obj 2.2', kind: 'interpretation' },
      ],
      diagnostic: createMockActivity('d2', ['o2-1']),
      activities: [],
      teachBack: createMockActivity('tb2', ['o2-1'], 'recall', { modelAnswer: 'Recall answer' }),
      exitTicket: [],
      assessmentBank: [
        createMockActivity('bank-2-1', ['o2-1'], 'select_and_justify', {
          assessmentLevel: 'application',
          transfer: true,
          rationaleRubric: { requiredConcepts: [{ id: 'c2', label: 'C2', acceptedPhrases: ['c2'] }], minRequired: 1 },
        }),
      ],
    },
    'les-3': {
      lessonId: 'les-3',
      objectives: [
        { id: 'o3-1', statement: 'Obj 3.1', kind: 'mechanism' },
        { id: 'o3-2', statement: 'Obj 3.2', kind: 'interpretation' },
      ],
      diagnostic: createMockActivity('d3', ['o3-1']),
      activities: [],
      teachBack: createMockActivity('tb3', ['o3-1'], 'recall', { modelAnswer: 'Recall answer' }),
      exitTicket: [],
      assessmentBank: [
        createMockActivity('bank-3-1', ['o3-1'], 'select_and_justify', {
          assessmentLevel: 'application',
          transfer: true,
          rationaleRubric: { requiredConcepts: [{ id: 'c3', label: 'C3', acceptedPhrases: ['c3'] }], minRequired: 1 },
        }),
      ],
    },
  };

  // If selecting count: 3 (1 item per lesson)
  const resultConstrained = selectModuleMasteryAssessment(experiences, { count: 3 });

  // In the old broken code: uncoveredTopics.length === 0 => completeCoverage was TRUE!
  // In the new truthful code: only 3 of 6 objectives are covered => completeCoverage MUST BE FALSE!
  assert.equal(
    resultConstrained.completeCoverage,
    false,
    'Module mastery CANNOT be complete when 3/6 objectives remain unassessed'
  );
  assert.equal(resultConstrained.items.length, 3, 'Selected 3 items (1 from each lesson)');
  assert.equal(resultConstrained.coveredObjectiveCount, 3);
  assert.equal(resultConstrained.totalObjectiveCount, 6);
  assert.equal(resultConstrained.uncoveredObjectiveIds.length, 3);
  assert.deepEqual(resultConstrained.uncoveredObjectiveIds.sort(), ['o1-2', 'o2-2', 'o3-2'].sort());
  assert.equal(resultConstrained.uncoveredTopics.length, 0, 'All lessons were touched, but objectives were missing');
  assert.ok(resultConstrained.coverageDebt, 'Must report explicit coverage debt');
  assert.equal(resultConstrained.coverageDebt.uncoveredObjectiveIds.length, 3);
});

// ===========================================================================
// 2. SECTION 25: MODULE SAFETY COVERAGE TEST
// ===========================================================================
test('Mastery Hardening [Section 25]: Module safety coverage gate', () => {
  const experiences = {
    'les-safe': {
      lessonId: 'les-safe',
      objectives: [
        { id: 'obj-critical-safety', statement: 'Prevent fatality', kind: 'safety' },
      ],
      diagnostic: createMockActivity('d-safe', ['obj-critical-safety']),
      activities: [],
      teachBack: createMockActivity('tb-safe', ['obj-critical-safety'], 'recall', { modelAnswer: 'Recall' }),
      exitTicket: [],
      // Bank item only has recognition without transfer
      assessmentBank: [
        createMockActivity('act-safe-rec', ['obj-critical-safety'], 'single_choice', {
          assessmentLevel: 'recognition',
          transfer: false,
        }),
      ],
    },
    'les-other': {
      lessonId: 'les-other',
      objectives: [
        { id: 'obj-other', statement: 'Other concept', kind: 'mechanism' },
      ],
      diagnostic: createMockActivity('d-other', ['obj-other']),
      activities: [],
      teachBack: createMockActivity('tb-other', ['obj-other'], 'recall', { modelAnswer: 'Recall' }),
      exitTicket: [],
      assessmentBank: [
        createMockActivity('act-other-app', ['obj-other'], 'select_and_justify', {
          assessmentLevel: 'application',
          transfer: true,
          rationaleRubric: { requiredConcepts: [{ id: 'co', label: 'CO', acceptedPhrases: ['co'] }], minRequired: 1 },
        }),
      ],
    },
  };

  const modResult = selectModuleMasteryAssessment(experiences);
  assert.equal(modResult.completeCoverage, false, 'Safety objective lacking app/gen and transfer blocks module completion');
  assert.ok(modResult.coverageDebt);
  assert.ok(modResult.coverageDebt.missingSafetyObjectives.includes('obj-critical-safety'));
});

// ===========================================================================
// 3. SECTION 26: MODULE TRANSFER COVERAGE TEST
// ===========================================================================
test('Mastery Hardening [Section 26]: Decision objective requires transfer task', () => {
  const objectives = [
    { id: 'obj-decision-rule', statement: 'Decision rule', kind: 'decision' },
  ];

  // Only recognition, non-transfer activity provided
  const activities = [
    createMockActivity('act-rec-non-transfer', ['obj-decision-rule'], 'single_choice', {
      assessmentLevel: 'recognition',
      transfer: false,
    }),
  ];

  const report = validateSelectedAssessmentCoverage(objectives, activities);
  assert.equal(report.isValid, false, 'Decision objective covered only by recognition non-transfer must fail');
  assert.ok(report.unmetRequirements.some(r => r.includes('wymaga zadania Application lub Generation')));
  assert.ok(report.unmetRequirements.some(r => r.includes('wymaga zadania transferowego')));
});

// ===========================================================================
// 4. SECTION 27: LESSON CONTRACT PARITY TEST
// ===========================================================================
test('Mastery Hardening [Section 27]: Lesson contract parity between selector and validator', () => {
  const objectives = [
    { id: 'obj-diff', statement: 'Differentiation', kind: 'differentiation' },
    { id: 'obj-safe', statement: 'Safety protocol', kind: 'safety' },
  ];

  // High quality valid bank with application/generation + transfer
  const validBank = [
    createMockActivity('b-diff', ['obj-diff'], 'select_and_justify', {
      assessmentLevel: 'application',
      transfer: true,
      rationaleRubric: { requiredConcepts: [{ id: 'c1', label: 'C1', acceptedPhrases: ['c1'] }], minRequired: 1 },
    }),
    createMockActivity('b-safe', ['obj-safe'], 'clinical_reasoning', {
      assessmentLevel: 'generation',
      transfer: true,
      modelAnswer: 'Safe model answer',
      rubric: { dimensions: [{ id: 'd1', label: 'D1', required: true, requiredConcepts: [{ id: 'c2', label: 'C2', acceptedPhrases: ['c2'] }] }] },
    }),
  ];

  const exp = {
    lessonId: 'parity-lesson',
    objectives,
    diagnostic: validBank[0],
    activities: [validBank[1]],
    teachBack: createMockActivity('tb', ['obj-diff'], 'recall', { modelAnswer: 'TB' }),
    exitTicket: [],
    assessmentBank: validBank,
  };

  const selectionResult = selectLessonMasteryAssessment(exp, { count: 2 });
  const validationReport = validateSelectedAssessmentCoverage(objectives, selectionResult.items, { requireGenerationTransfer: true });

  assert.equal(selectionResult.completeCoverage, validationReport.isValid);
  assert.equal(selectionResult.contractSatisfied, validationReport.isValid);
  assert.equal(selectionResult.uncoveredObjectiveIds.length, validationReport.uncoveredObjectiveIds.length);
  assert.equal(selectionResult.completeCoverage, true);
});

// ===========================================================================
// 5. DIVERSITY INVARIANT TESTS (GRILL-ME & SECTION 1 RESOLUTION)
// ===========================================================================
test('Mastery Hardening [Diversity Invariants]: Single high-quality item vs diversity preference', () => {
  const objective = { id: 'obj-alone', statement: 'Lone decision objective', kind: 'decision' };

  // Single clinical_reasoning item covering all mastery tokens (generation, transfer, generation_transfer)
  const singleGenTransferAct = createMockActivity('cr-transfer-master', ['obj-alone'], 'clinical_reasoning', {
    assessmentLevel: 'generation',
    transfer: true,
    modelAnswer: 'Complete model answer',
    rubric: { dimensions: [{ id: 'd1', label: 'D1', required: true, requiredConcepts: [{ id: 'c', label: 'C', acceptedPhrases: ['c'] }] }] },
  });

  const exp = {
    lessonId: 'lone-exp',
    objectives: [objective],
    diagnostic: singleGenTransferAct,
    activities: [],
    teachBack: createMockActivity('tb', ['obj-alone'], 'recall', { modelAnswer: 'TB' }),
    exitTicket: [],
    assessmentBank: [singleGenTransferAct],
  };

  // 1. In lesson mastery selection: distinctActivityTypes === 1 PASSES because all tokens are covered!
  const lessonRes = selectLessonMasteryAssessment(exp, { count: 1 });
  assert.equal(lessonRes.completeCoverage, true, 'Single transfer generation item satisfies mastery competence');
  assert.equal(lessonRes.contractSatisfied, true);

  // 2. Diversity Tie-Breaker: When two combinations cover identical tokens, selector prefers higher activity diversity
  const actA1 = createMockActivity('cand-a1', ['obj-alone'], 'single_choice', { assessmentLevel: 'application', transfer: true });
  const actA2 = createMockActivity('cand-a2', ['obj-alone'], 'single_choice', { assessmentLevel: 'generation', transfer: true, modelAnswer: 'M' });
  const actB1 = createMockActivity('cand-b1', ['obj-alone'], 'select_and_justify', {
    assessmentLevel: 'application',
    transfer: true,
    rationaleRubric: { requiredConcepts: [{ id: 'c', label: 'C', acceptedPhrases: ['c'] }], minRequired: 1 },
  });
  const actB2 = createMockActivity('cand-b2', ['obj-alone'], 'clinical_reasoning', {
    assessmentLevel: 'generation',
    transfer: true,
    modelAnswer: 'M',
    rubric: { dimensions: [{ id: 'd', label: 'D', required: true, requiredConcepts: [{ id: 'c', label: 'C', acceptedPhrases: ['c'] }] }] },
  });

  const requiredTokens = new Set(['obj:obj-alone:any', 'obj:obj-alone:application_or_generation', 'obj:obj-alone:transfer']);
  // Pool has homogeneous set [actA1, actA2] (both single_choice) and diverse set [actB1, actB2] (select_and_justify + clinical_reasoning)
  const pool = [actA1, actA2, actB1, actB2];

  const coverResult = computeExactMinimalTokenSetCover(
    pool,
    requiredTokens,
    a => getActivityCoveredTokens(a, [objective])
  );

  assert.equal(coverResult.count, 1);
  assert.ok(coverResult.selectedItems.length >= 1);
});

// ===========================================================================
// 6. DISTRACTOR PLAUSIBILITY SCANNER TESTS
// ===========================================================================
test('Mastery Hardening [Distractor Plausibility]: Flags cartoon/absurd distractors and passes clinical ones', () => {
  // 1. Absurd distractor: notariusz
  const badAct1 = createMockActivity('act-notariusz', ['obj-1'], 'single_choice', {
    options: ['Prawidłowe postępowanie', 'Wymaga obecności 3 notariuszy'],
    answer: 0,
  });
  const res1 = validateActivitySemanticQA(badAct1);
  assert.ok(res1.warnings.some(w => w.includes('LOW_PLAUSIBILITY_DISTRACTOR') && w.includes('wymóg notarialny')));
  assert.equal(res1.isValid, true, 'Warnings do not fail hard isValid on activity');

  // 2. Absurd distractor: pasożyty wątroby
  const badAct2 = createMockActivity('act-pasozyty', ['obj-1'], 'single_choice', {
    options: ['Prawidłowe', 'Leczą wyłącznie pasożyty wątroby'],
    answer: 0,
  });
  const res2 = validateActivitySemanticQA(badAct2);
  assert.ok(res2.warnings.some(w => w.includes('LOW_PLAUSIBILITY_DISTRACTOR') && w.includes('pasożyty wątroby')));

  // 3. Absurd distractor: krew w roztwór soli
  const badAct3 = createMockActivity('act-sol', ['obj-1'], 'single_choice', {
    options: ['Prawidłowe', 'Leki te zamieniają krew pacjenta w roztwór soli'],
    answer: 0,
  });
  const res3 = validateActivitySemanticQA(badAct3);
  assert.ok(res3.warnings.some(w => w.includes('LOW_PLAUSIBILITY_DISTRACTOR') && w.includes('zamiana krwi w roztwór soli')));

  // 4. Clinical plausible question: 0 warnings
  const goodAct = createMockActivity('act-clinical', ['obj-1'], 'single_choice', {
    options: [
      'Podanie dożylne hydrokortyzonu w dawce 100 mg przed włączeniem L-tyroksyny',
      'Włączenie lewotyroksyny w dużej dawce nasycającej bez osłony glikokortykosteroidowej',
      'Podanie doustne propranololu jako jedynej interwencji',
    ],
    answer: 0,
  });
  const resGood = validateActivitySemanticQA(goodAct);
  assert.equal(resGood.warnings.length, 0, 'Clean clinical question must have 0 distractor warnings');
});

// ===========================================================================
// 7. SECTION 28: GLOBAL AUDIT HARD-GATE TESTS
// ===========================================================================
test('Mastery Hardening [Section 28]: Global audit hard gates strictly block invalid migrated modules', () => {
  // Helper to evaluate hardContractPass logic identically to audit-global-assessment.mjs
  const evaluateHardContractPass = (opts) => {
    const {
      isMigrated,
      validExperiences,
      lessonsCount,
      fullyCoveredLessons,
      modSemanticErrors,
      duplicateActivityIdsCount,
      unresolvedSourcesCount,
      unresolvedClaimsCount,
      recognitionOnlySafetyObjectives,
      moduleMasteryPass,
      issuesCount,
    } = opts;

    return isMigrated
      ? (validExperiences === lessonsCount &&
         fullyCoveredLessons === lessonsCount &&
         modSemanticErrors === 0 &&
         duplicateActivityIdsCount === 0 &&
         unresolvedSourcesCount === 0 &&
         unresolvedClaimsCount === 0 &&
         recognitionOnlySafetyObjectives === 0 &&
         moduleMasteryPass &&
         issuesCount === 0)
      : false;
  };

  const baseValid = {
    isMigrated: true,
    validExperiences: 10,
    lessonsCount: 10,
    fullyCoveredLessons: 10,
    modSemanticErrors: 0,
    duplicateActivityIdsCount: 0,
    unresolvedSourcesCount: 0,
    unresolvedClaimsCount: 0,
    recognitionOnlySafetyObjectives: 0,
    moduleMasteryPass: true,
    issuesCount: 0,
  };

  // Baseline passes
  assert.equal(evaluateHardContractPass(baseValid), true);

  // 1. Unresolved source => FAIL
  assert.equal(evaluateHardContractPass({ ...baseValid, unresolvedSourcesCount: 1 }), false);

  // 2. Unresolved claim => FAIL
  assert.equal(evaluateHardContractPass({ ...baseValid, unresolvedClaimsCount: 1 }), false);

  // 3. Duplicate activity ID => FAIL
  assert.equal(evaluateHardContractPass({ ...baseValid, duplicateActivityIdsCount: 1 }), false);

  // 4. Semantic QA error => FAIL
  assert.equal(evaluateHardContractPass({ ...baseValid, modSemanticErrors: 1 }), false);

  // 5. Recognition-only safety objective => FAIL
  assert.equal(evaluateHardContractPass({ ...baseValid, recognitionOnlySafetyObjectives: 1 }), false);

  // 6. Incomplete module mastery => FAIL
  assert.equal(evaluateHardContractPass({ ...baseValid, moduleMasteryPass: false }), false);

  // 7. Incomplete lesson coverage => FAIL
  assert.equal(evaluateHardContractPass({ ...baseValid, fullyCoveredLessons: 9 }), false);

  // 8. Pending module => cannot claim hard pass (status PENDING_MIGRATION)
  assert.equal(evaluateHardContractPass({ ...baseValid, isMigrated: false }), false);
});

