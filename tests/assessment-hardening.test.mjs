import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateActivity } from '../lib/activity-grading.ts';
import { practicePayload, projectActivities } from '../lib/learning.ts';
import {
  validateObjectiveCoverage,
  selectLessonMasteryAssessment,
  selectModuleMasteryAssessment,
  selectModuleQuickReview,
  isActivityTransfer,
  isActivityGenerationTransfer,
} from '../lib/assessment-coverage.ts';

// 1. SELF REVIEW & CRITICAL ERROR PRECEDENCE
test('Assessment Hardening: Ungraded and partial can be confirmed, but critical error cannot be overridden', () => {
  const shortAct = {
    id: 'sa-crit-1',
    type: 'short_answer',
    objectiveIds: ['obj-1'],
    prompt: 'Oceń postępowanie w przełomie tarczycowym',
    explanation: 'Należy podać PTU, hydrokortyzon i jod.',
    difficulty: 'doctor',
    reasoning: 'safety',
    sourceIds: ['s1'],
    modelAnswer: 'PTU, hydrokortyzon, jod',
    rubric: {
      requiredConcepts: [
        { id: 'ptu', label: 'Tionamid (PTU)', acceptedPhrases: ['ptu', 'propylotiouracyl'] },
        { id: 'steroid', label: 'Hydrokortyzon', acceptedPhrases: ['hydrokortyzon', 'steryd'] },
      ],
      contradictions: [
        {
          id: 'asa',
          patterns: ['aspiryn', 'kwas acetylosalicylowy'],
          severity: 'critical',
          feedback: 'Kwas acetylosalicylowy wypiera hormony z połączeń z białkami i nasila przełom.',
        },
      ],
      minRequired: 2,
    },
  };

  // Case A: Ungraded matcher -> confirmed correct
  const unconfirmed = evaluateActivity(shortAct, { text: 'Podajemy leki blokujące obwodową konwersję i syntezę.' });
  assert.equal(unconfirmed.status, 'ungraded');
  const confirmedCorrect = evaluateActivity(shortAct, {
    text: 'Podajemy leki blokujące obwodową konwersję i syntezę.',
    userConfirmedStatus: 'correct',
  });
  assert.equal(confirmedCorrect.status, 'correct');
  assert.equal(confirmedCorrect.correct, true);

  // Case B: Critical error present in student answer -> user confirmation CANNOT override!
  const withCritical = evaluateActivity(shortAct, {
    text: 'Podajemy natychmiast PTU, hydrokortyzon oraz aspirynę na gorączkę.',
    userConfirmedStatus: 'correct',
  });
  assert.equal(withCritical.status, 'needs_revision', 'Critical error MUST force needs_revision regardless of self-review');
  assert.equal(withCritical.correct, false);

  // Case C: select_and_justify: wrong decision cannot become correct even if rationale confirmed correct
  const sajAct = {
    id: 'saj-crit-1',
    type: 'select_and_justify',
    objectiveIds: ['obj-1'],
    prompt: 'Wybierz postępowanie',
    explanation: 'Exp',
    difficulty: 'doctor',
    reasoning: 'decision',
    sourceIds: ['s1'],
    options: ['Hydrokortyzon przed LT4', 'LT4 solo'],
    answer: 0,
    rationaleRubric: {
      requiredConcepts: [{ id: 'adr', label: 'Oś nadnerczowa', acceptedPhrases: ['nadnercz'] }],
      minRequired: 1,
    },
  };

  const wrongDecisionConfirmed = evaluateActivity(sajAct, {
    selected: 1, // Wrong decision
    rationale: 'Zabezpieczamy oś nadnerczową.',
    userConfirmedStatus: 'correct',
  });
  assert.notEqual(wrongDecisionConfirmed.status, 'correct', 'Wrong decision can NEVER be correct');
  assert.equal(wrongDecisionConfirmed.decisionResult, false);
});

// 2. MASTERY != REMEDIATION
test('Assessment Hardening: Mastery status is decoupled from current remediation state', () => {
  const dummyAct = {
    id: 'act-m1',
    type: 'single_choice',
    objectiveIds: ['obj-mastery-hardened'],
    prompt: 'P',
    explanation: 'E',
    difficulty: 'student',
    reasoning: 'mechanism',
    sourceIds: ['s1'],
    options: ['A', 'B'],
    answer: 0,
  };

  // Day 0: correct evidence #1
  const ev1 = {
    id: 'e1',
    user_id: 'u1',
    kind: 'practice',
    target_id: 'act-m1',
    content_version: '1',
    created_at: '2026-09-01T10:00:00Z',
    payload: practicePayload('l1', dummyAct, true, 3, true, { answerType: 'choice_index', elapsedMs: 500 }, 'correct'),
  };

  // Day 2: correct evidence #2 (spaced >= 24h, different activity type)
  const ev2 = {
    id: 'e2',
    user_id: 'u1',
    kind: 'practice',
    target_id: 'act-m2',
    content_version: '1',
    created_at: '2026-09-03T10:00:00Z',
    payload: practicePayload('l1', { ...dummyAct, id: 'act-m2', type: 'numeric' }, true, 3, true, { answerType: 'numeric_value', elapsedMs: 800 }, 'correct'),
  };

  const stateMastered = projectActivities([ev1, ev2]);
  const rec1 = stateMastered.mastery['obj-mastery-hardened'];
  assert.equal(rec1.status, 'mastered');
  assert.equal(rec1.remediationRequired, false);

  // Day 3: subsequent attempt yields needs_revision
  const ev3 = {
    id: 'e3',
    user_id: 'u1',
    kind: 'practice',
    target_id: 'act-m3',
    content_version: '1',
    created_at: '2026-09-04T10:00:00Z',
    payload: practicePayload('l1', { ...dummyAct, id: 'act-m3', type: 'short_answer' }, false, 2, true, { answerType: 'text_rubric', elapsedMs: 1200 }, 'needs_revision'),
  };

  const stateWithError = projectActivities([ev1, ev2, ev3]);
  const rec2 = stateWithError.mastery['obj-mastery-hardened'];
  assert.equal(rec2.status, 'mastered', 'Historical mastered status MUST NOT be erased by a single later needs_revision');
  assert.equal(rec2.remediationRequired, true, 'Remediation flag must be raised');
  assert.equal(stateWithError.mistakes.length, 1);

  // Day 4: successful remediation clears remediation flag
  const ev4 = {
    id: 'e4',
    user_id: 'u1',
    kind: 'practice',
    target_id: 'act-m3',
    content_version: '1',
    created_at: '2026-09-05T10:00:00Z',
    payload: practicePayload('l1', { ...dummyAct, id: 'act-m3', type: 'short_answer' }, true, 3, true, { answerType: 'text_rubric', elapsedMs: 900 }, 'correct'),
  };

  const stateRemediated = projectActivities([ev1, ev2, ev3, ev4]);
  const rec3 = stateRemediated.mastery['obj-mastery-hardened'];
  assert.equal(rec3.status, 'mastered');
  assert.equal(rec3.remediationRequired, false, 'Remediation flag must be cleared upon later successful correct attempt');
  assert.equal(stateRemediated.mistakes.length, 0, 'Mistake Notebook must resolve the corrected mistake');
});

// 3. GENERATION VS TRANSFER & COVERAGE VALIDATION
test('Assessment Hardening: TeachBack recall alone is not generation-transfer; coverage requires explicit transfer', () => {
  const mockLesson = {
    experienceVersion: 2,
    lessonId: 'lesson-transfer-check',
    objectives: [
      { id: 'obj-dec', statement: 'Podejmiesz decyzję w przełomie', kind: 'decision' },
    ],
    diagnostic: {
      id: 'd1',
      type: 'single_choice',
      objectiveIds: ['obj-dec'],
      prompt: 'P',
      explanation: 'E',
      difficulty: 'student',
      reasoning: 'decision',
      sourceIds: ['s1'],
      options: ['A', 'B'],
      answer: 0,
      assessmentLevel: 'recognition',
    },
    blocks: [],
    activities: [
      {
        id: 'a1',
        type: 'select_and_justify',
        objectiveIds: ['obj-dec'],
        prompt: 'P',
        explanation: 'E',
        difficulty: 'doctor',
        reasoning: 'decision',
        sourceIds: ['s1'],
        options: ['A', 'B'],
        answer: 0,
        rationaleRubric: { requiredConcepts: [{ id: 'c', label: 'C', acceptedPhrases: ['p'] }], minRequired: 1 },
        assessmentLevel: 'application',
      },
    ],
    teachBack: {
      id: 'tb1',
      type: 'recall',
      objectiveIds: ['obj-dec'],
      prompt: 'Przypomnij',
      explanation: 'E',
      modelAnswer: 'M',
      difficulty: 'both',
      reasoning: 'decision',
      sourceIds: ['s1'],
    },
    exitTicket: [],
    assessmentBank: [],
    widgetIds: [],
    review: { status: 'source-checked', checkedAt: '2026-09-13', scope: 'full' },
  };

  // Teachback alone has generation but NOT transfer
  assert.equal(isActivityTransfer(mockLesson.teachBack), false);
  assert.equal(isActivityGenerationTransfer(mockLesson.teachBack), false);

  const reportNoTransfer = validateObjectiveCoverage(mockLesson);
  assert.equal(reportNoTransfer.summary.hasGenerationTransfer, false);
  assert.equal(reportNoTransfer.isValid, false, 'Lesson without generationTransfer must fail validation gate');

  // Add transfer item in bank
  mockLesson.assessmentBank.push({
    id: 'lesson-transfer-check-transfer-1',
    type: 'short_answer',
    objectiveIds: ['obj-dec'],
    prompt: 'Nowy przypadek kliniczny: 45-letnia pacjentka w izbie przyjęć...',
    explanation: 'E',
    difficulty: 'doctor',
    reasoning: 'decision',
    sourceIds: ['s1'],
    modelAnswer: 'M',
    rubric: { requiredConcepts: [{ id: 'c', label: 'C', acceptedPhrases: ['p'] }], minRequired: 1 },
    assessmentLevel: 'generation',
    transfer: true,
  });

  const reportWithTransfer = validateObjectiveCoverage(mockLesson);
  assert.equal(reportWithTransfer.summary.hasGenerationTransfer, true);
  assert.equal(reportWithTransfer.isValid, true);
});

// 4. LESSON & MODULE MASTERY SELECTION (COVERAGE AWARE)
test('Assessment Hardening: Lesson selection detects budget shortages and module selection covers all topics', () => {
  const testExp = {
    experienceVersion: 2,
    lessonId: 'lesson-multi-obj',
    objectives: [
      { id: 'o1', statement: 'Obj 1', kind: 'mechanism' },
      { id: 'o2', statement: 'Obj 2', kind: 'interpretation' },
      { id: 'o3', statement: 'Obj 3', kind: 'decision' },
    ],
    diagnostic: { id: 'd', type: 'single_choice', objectiveIds: ['o1'], prompt: 'P', explanation: 'E', difficulty: 'student', reasoning: 'mechanism', sourceIds: ['s1'], options: ['A'], answer: 0 },
    blocks: [],
    activities: [
      { id: 'a1', type: 'single_choice', objectiveIds: ['o1'], prompt: 'P', explanation: 'E', difficulty: 'student', reasoning: 'mechanism', sourceIds: ['s1'], options: ['A'], answer: 0 },
      { id: 'a2', type: 'numeric', objectiveIds: ['o2'], prompt: 'P', explanation: 'E', difficulty: 'doctor', reasoning: 'interpretation', sourceIds: ['s1'], answer: 1, tolerance: 0.1, unit: 'u' },
      { id: 'a3', type: 'select_and_justify', objectiveIds: ['o3'], prompt: 'P', explanation: 'E', difficulty: 'doctor', reasoning: 'decision', sourceIds: ['s1'], options: ['A'], answer: 0, rationaleRubric: { requiredConcepts: [{ id: 'c', label: 'C', acceptedPhrases: ['p'] }], minRequired: 1 } },
    ],
    teachBack: { id: 'tb', type: 'recall', objectiveIds: ['o1', 'o2', 'o3'], prompt: 'P', explanation: 'E', modelAnswer: 'M', difficulty: 'both', reasoning: 'mechanism', sourceIds: ['s1'] },
    exitTicket: [],
    assessmentBank: [
      { id: 'b1', type: 'short_answer', objectiveIds: ['o1'], prompt: 'P1', explanation: 'E', difficulty: 'student', reasoning: 'mechanism', sourceIds: ['s1'], modelAnswer: 'M', rubric: { requiredConcepts: [{ id: 'c', label: 'C', acceptedPhrases: ['p'] }], minRequired: 1 }, assessmentLevel: 'generation', transfer: true },
      { id: 'b2', type: 'select_and_justify', objectiveIds: ['o2'], prompt: 'P2', explanation: 'E', difficulty: 'doctor', reasoning: 'interpretation', sourceIds: ['s1'], options: ['A'], answer: 0, rationaleRubric: { requiredConcepts: [{ id: 'c', label: 'C', acceptedPhrases: ['p'] }], minRequired: 1 }, assessmentLevel: 'application', transfer: true },
      { id: 'b3', type: 'clinical_reasoning', objectiveIds: ['o3'], prompt: 'P3', explanation: 'E', difficulty: 'doctor', reasoning: 'decision', sourceIds: ['s1'], modelAnswer: 'M', rubric: { dimensions: [{ id: 'd1', label: 'D1', required: true, requiredConcepts: [{ id: 'c', label: 'C', acceptedPhrases: ['p'] }] }] }, assessmentLevel: 'generation', transfer: true },
    ],
    widgetIds: [],
    review: { status: 'source-checked', checkedAt: '2026-09-13', scope: 'full' },
  };

  // Case A: Count=1 cannot cover 3 independent objectives -> completeCoverage is FALSE
  const shortage = selectLessonMasteryAssessment(testExp, { count: 1 });
  assert.equal(shortage.completeCoverage, false);
  assert.equal(shortage.items.length, 1);
  assert.ok(shortage.uncoveredObjectiveIds.length > 0);
  assert.equal(shortage.minimumRequiredCount, 3);

  // Case B: Count=3 covers all objectives
  const full = selectLessonMasteryAssessment(testExp, { count: 3 });
  assert.equal(full.completeCoverage, true);
  assert.equal(full.uncoveredObjectiveIds.length, 0);

  // Case C: Exclusion of items works
  const excluded = selectLessonMasteryAssessment(testExp, { count: 3, excludeActivityIds: ['b1'] });
  assert.ok(!excluded.items.some(i => i.id === 'b1'));

  // Case D: Module Mastery Assessment covers all lessons/topics
  const moduleMap = {
    'lesson-1': testExp,
    'lesson-2': { ...testExp, lessonId: 'lesson-2' },
  };
  const modResult = selectModuleMasteryAssessment(moduleMap);
  assert.equal(modResult.completeCoverage, true);
  assert.equal(modResult.uncoveredTopics.length, 0);
  assert.equal(modResult.items.length, 2);

  // Quick Review mode
  const quick = selectModuleQuickReview(moduleMap, { count: 1 });
  assert.equal(quick.length, 1);
});

// 5. CLINICAL REASONING: REQUIRED DIMENSIONS ENFORCEMENT
test('Assessment Hardening: Clinical reasoning requires all required dimensions to be complete', () => {
  const crAct = {
    id: 'cr-dim-1',
    type: 'clinical_reasoning',
    objectiveIds: ['obj-1'],
    prompt: 'Rozumowanie kliniczne wielowymiarowe',
    explanation: 'E',
    difficulty: 'doctor',
    reasoning: 'decision',
    sourceIds: ['s1'],
    modelAnswer: 'M',
    rubric: {
      dimensions: [
        { id: 'hyp', label: 'Główna hipoteza', required: true, requiredConcepts: [{ id: 'c1', label: 'Choroba Gravesa', acceptedPhrases: ['graves'] }] },
        { id: 'diff', label: 'Diagnostyka różnicowa', required: true, requiredConcepts: [{ id: 'c2', label: 'Podostre zapalenie', acceptedPhrases: ['podostre'] }] },
        { id: 'opt', label: 'Niuanse mechanistyczne', required: false, requiredConcepts: [{ id: 'c3', label: 'TRAb', acceptedPhrases: ['trab'] }] },
      ],
    },
  };

  // Only 1 of 2 required dimensions completed -> incomplete/ungraded
  const incompleteRes = evaluateActivity(crAct, {
    dimensions: {
      hyp: 'Podejrzenie choroby Gravesa-Basedowa.',
      // diff is missing!
    },
  });
  assert.equal(incompleteRes.status, 'ungraded', 'Missing required dimension must remain ungraded');

  // Both required dimensions completed, optional omitted -> correct!
  const completeRes = evaluateActivity(crAct, {
    dimensions: {
      hyp: 'Podejrzenie choroby Gravesa-Basedowa.',
      diff: 'Należy wykluczyć podostre zapalenie tarczycy de Quervaina.',
    },
  });
  assert.equal(completeRes.status, 'correct', 'Optional omitted dimension must not block correct status');
});
