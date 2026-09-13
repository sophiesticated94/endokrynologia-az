import test from 'node:test';
import assert from 'node:assert/strict';
import { LearningActivitySchema } from '../lib/content/schemas/lesson-revision.ts';
import { DeterministicRubricEvaluator } from '../lib/rubric-evaluator.ts';
import { evaluateActivity } from '../lib/activity-grading.ts';
import { practicePayload, projectActivities } from '../lib/learning.ts';
import {
  validateObjectiveCoverage,
  selectLessonMasteryTest,
} from '../lib/assessment-coverage.ts';

// 1. SCHEMA PARSING FOR ALL 10 ACTIVITY TYPES
test('Assessment Infrastructure: Zod schema parses all activity types', () => {
  const base = {
    id: 'act-test-1',
    objectiveIds: ['obj-1'],
    prompt: 'Przykładowy prompt',
    explanation: 'Wyjaśnienie kliniczne',
    difficulty: 'student',
    reasoning: 'mechanism',
    sourceIds: ['src-1'],
  };

  // single_choice
  assert.doesNotThrow(() =>
    LearningActivitySchema.parse({ ...base, type: 'single_choice', options: ['A', 'B'], answer: 0 })
  );

  // multi_select
  assert.doesNotThrow(() =>
    LearningActivitySchema.parse({ ...base, type: 'multi_select', options: ['A', 'B', 'C'], answers: [0, 2] })
  );

  // ordering
  assert.doesNotThrow(() =>
    LearningActivitySchema.parse({ ...base, type: 'ordering', items: ['Krok 1', 'Krok 2'], correctOrder: [0, 1] })
  );

  // matching
  assert.doesNotThrow(() =>
    LearningActivitySchema.parse({ ...base, type: 'matching', pairs: [['Lewy', 'Prawy']] })
  );

  // numeric
  assert.doesNotThrow(() =>
    LearningActivitySchema.parse({ ...base, type: 'numeric', answer: 4.5, tolerance: 0.5, unit: 'mIU/l' })
  );

  // recall
  assert.doesNotThrow(() =>
    LearningActivitySchema.parse({ ...base, type: 'recall', modelAnswer: 'Wzorzec odpowiedzi' })
  );

  // short_answer
  assert.doesNotThrow(() =>
    LearningActivitySchema.parse({
      ...base,
      type: 'short_answer',
      modelAnswer: 'Pełna odpowiedź',
      rubric: {
        requiredConcepts: [{ id: 'c1', label: 'Cechy TLE', acceptedPhrases: ['tle', 'padaczka skroniowa'] }],
        minRequired: 1,
      },
    })
  );

  // select_and_justify
  assert.doesNotThrow(() =>
    LearningActivitySchema.parse({
      ...base,
      type: 'select_and_justify',
      options: ['Opcja 1', 'Opcja 2'],
      answer: 0,
      rationaleRubric: {
        requiredConcepts: [{ id: 'r1', label: 'Uzasadnienie', acceptedPhrases: ['uzasadnienie'] }],
        minRequired: 1,
      },
    })
  );

  // clinical_reasoning
  assert.doesNotThrow(() =>
    LearningActivitySchema.parse({
      ...base,
      type: 'clinical_reasoning',
      modelAnswer: 'Rozumowanie wieloosiowe',
      rubric: {
        dimensions: [
          {
            id: 'hyp',
            label: 'Hipoteza',
            requiredConcepts: [{ id: 'h1', label: 'Hashimoto', acceptedPhrases: ['hashimoto'] }],
          },
        ],
      },
    })
  );

  // evidence_weighting
  assert.doesNotThrow(() =>
    LearningActivitySchema.parse({
      ...base,
      type: 'evidence_weighting',
      hypothesis: 'Choroba Gravesa-Basedowa',
      items: [
        {
          id: 'item-1',
          text: 'Obecność wytrzeszczu',
          expected: 'supports',
          explanation: 'Wspiera Gravesa',
        },
      ],
    })
  );
});

// 2. DETERMINISTIC RUBRIC EVALUATOR
test('Assessment Infrastructure: DeterministicRubricEvaluator concept matching and critical error detection', () => {
  const evaluator = new DeterministicRubricEvaluator();
  const rubric = {
    requiredConcepts: [
      { id: 'hypo', label: 'Hipotermia', acceptedPhrases: ['hipotermia', 'obniżona temperatura'] },
      { id: 'brady', label: 'Bradykardia', acceptedPhrases: ['bradykardia', 'zwolnienie rytmu'] },
    ],
    contradictions: [
      {
        id: 'no-danger',
        patterns: ['stan nie wymaga pilnej pomocy', 'można wypisać do domu'],
        severity: 'critical',
        feedback: 'Stan zagraża życiu i bezwzględnie wymaga hospitalizacji na OIT.',
      },
    ],
    minRequired: 2,
  };

  // Full match
  const res1 = evaluator.evaluate(rubric, 'U pacjenta występuje wyraźna hipotermia oraz bradykardia.');
  assert.equal(res1.status, 'correct');
  assert.equal(res1.coveredConcepts.length, 2);
  assert.equal(res1.criticalErrors.length, 0);

  // Partial match
  const res2 = evaluator.evaluate(rubric, 'Stwierdzono jedynie zwolnienie rytmu serca.');
  assert.equal(res2.status, 'partially_correct');
  assert.equal(res2.coveredConcepts.length, 1);
  assert.equal(res2.missingConcepts.length, 1);

  // Critical contradiction
  const res3 = evaluator.evaluate(rubric, 'Jest hipotermia i bradykardia, ale stan nie wymaga pilnej pomocy.');
  assert.equal(res3.status, 'needs_revision');
  assert.equal(res3.criticalErrors.length, 1);
  assert.ok(res3.criticalErrors[0].feedback.includes('zagraża życiu'));

  // Ungraded short text
  const res4 = evaluator.evaluate(rubric, 'nie');
  assert.equal(res4.status, 'ungraded');
});

// 3. ACTIVITY GRADING: SELECT_AND_JUSTIFY & EVIDENCE_WEIGHTING
test('Assessment Infrastructure: Two-phase select_and_justify and evidence_weighting evaluation', () => {
  const sajActivity = {
    id: 'saj-1',
    type: 'select_and_justify',
    objectiveIds: ['obj-1'],
    prompt: 'Wybierz postępowanie i uzasadnij',
    explanation: 'Uzasadnienie referencyjne',
    difficulty: 'doctor',
    reasoning: 'decision',
    sourceIds: ['s1'],
    options: ['Hydrokortyzon przed LT4', 'LT4 w pełnej dawce', 'Obserwacja'],
    answer: 0,
    rationaleRubric: {
      requiredConcepts: [
        { id: 'adrenal', label: 'Niewydolność nadnerczy', acceptedPhrases: ['nadnercz', 'kortyzol'] },
      ],
      minRequired: 1,
    },
  };

  // Correct decision + correct rationale
  const resCorrect = evaluateActivity(sajActivity, {
    selected: 0,
    rationale: 'Konieczne zabezpieczenie osi nadnerczowej przed podaniem LT4, by uniknąć przełomu.',
  });
  assert.equal(resCorrect.status, 'correct');
  assert.equal(resCorrect.correct, true);

  // Correct decision + empty/missing rationale -> partially_correct
  const resPartial = evaluateActivity(sajActivity, {
    selected: 0,
    rationale: 'Bo tak mi się wydaje.',
  });
  assert.equal(resPartial.status, 'ungraded'); // allowed to self-review

  // Wrong decision -> needs_revision
  const resWrong = evaluateActivity(sajActivity, {
    selected: 1,
    rationale: 'Podajemy sam hormon tarczycy.',
  });
  assert.equal(resWrong.status, 'needs_revision');
  assert.equal(resWrong.correct, false);

  // Evidence Weighting
  const ewActivity = {
    id: 'ew-1',
    type: 'evidence_weighting',
    objectiveIds: ['obj-1'],
    prompt: 'Oceń dowody dla hipotezy Gravesa',
    explanation: 'Wyjaśnienie',
    difficulty: 'student',
    reasoning: 'differentiation',
    sourceIds: ['s1'],
    hypothesis: 'Choroba Gravesa-Basedowa',
    items: [
      { id: 'i1', text: 'Wysokie miano TRAb', expected: 'supports', explanation: 'TRAb wspiera Gravesa' },
      { id: 'i2', text: 'Brak wychwytu w scyntygrafii', expected: 'opposes', explanation: 'Sugeruje destrukcję' },
    ],
  };

  const ewCorrect = evaluateActivity(ewActivity, {
    classifications: { i1: 'supports', i2: 'opposes' },
  });
  assert.equal(ewCorrect.status, 'correct');
  assert.equal(ewCorrect.correct, true);

  const ewWrong = evaluateActivity(ewActivity, {
    classifications: { i1: 'opposes', i2: 'supports' },
  });
  assert.equal(ewWrong.status, 'needs_revision');
  assert.equal(ewWrong.correct, false);
});

// 4. LEARNING & MASTERY EVENT PROJECTION WITH EVALUATION STATUS
test('Assessment Infrastructure: Mastery projection handles partially_correct and needs_revision correctly', () => {
  const dummyAct = {
    id: 'act-1',
    type: 'single_choice',
    objectiveIds: ['obj-mastery'],
    prompt: 'Test',
    explanation: 'Exp',
    difficulty: 'student',
    reasoning: 'mechanism',
    sourceIds: ['s1'],
    options: ['A', 'B'],
    answer: 0,
  };

  // Event 1: correct on day 0
  const ev1 = {
    id: 'ev-1',
    user_id: 'u1',
    kind: 'practice',
    target_id: 'act-1',
    content_version: '1',
    created_at: '2026-09-10T10:00:00Z',
    payload: practicePayload('l1', dummyAct, true, 3, true, { answerType: 'choice_index', elapsedMs: 1000 }, 'correct'),
  };

  // Event 2: partially_correct on day 1
  const ev2 = {
    id: 'ev-2',
    user_id: 'u1',
    kind: 'practice',
    target_id: 'act-2',
    content_version: '1',
    created_at: '2026-09-11T12:00:00Z',
    payload: practicePayload('l1', { ...dummyAct, id: 'act-2', type: 'short_answer' }, false, 2, true, { answerType: 'text_rubric', elapsedMs: 1500 }, 'partially_correct'),
  };

  const state1 = projectActivities([ev1, ev2]);
  const rec = state1.mastery['obj-mastery'];
  assert.ok(rec);
  assert.equal(rec.correctEvidence, 1); // partially_correct does not increment correctEvidence
  assert.equal(state1.mistakes.length, 0); // partially_correct is NOT added to mistakes

  // Event 3: needs_revision (critical error)
  const ev3 = {
    id: 'ev-3',
    user_id: 'u1',
    kind: 'practice',
    target_id: 'act-3',
    content_version: '1',
    created_at: '2026-09-11T13:00:00Z',
    payload: practicePayload('l1', { ...dummyAct, id: 'act-3', type: 'select_and_justify' }, false, 3, true, { answerType: 'select_and_justify', elapsedMs: 2000 }, 'needs_revision'),
  };

  const state2 = projectActivities([ev1, ev2, ev3]);
  assert.equal(state2.mistakes.length, 1); // needs_revision IS added to mistakes!
  assert.equal(state2.mistakes[0].activityId, 'act-3');
});

// 5. OBJECTIVE COVERAGE VALIDATOR & ASSESSMENT BANK SELECTION
test('Assessment Infrastructure: Objective coverage validator and test selection', () => {
  const exp = {
    experienceVersion: 2,
    lessonId: 'lesson-test',
    objectives: [
      { id: 'obj-mech', statement: 'Wyjaśnisz mechanizm sprzężenia', kind: 'mechanism' },
      { id: 'obj-safety', statement: 'Rozpoznasz stan zagrożenia przełomem', kind: 'safety' },
    ],
    diagnostic: {
      id: 'd-1',
      type: 'single_choice',
      objectiveIds: ['obj-mech'],
      prompt: 'Diagnostyka',
      explanation: 'E',
      difficulty: 'student',
      reasoning: 'mechanism',
      sourceIds: ['s1'],
      options: ['A', 'B'],
      answer: 0,
      assessmentLevel: 'recognition',
    },
    blocks: [],
    activities: [
      {
        id: 'act-app',
        type: 'select_and_justify',
        objectiveIds: ['obj-safety'],
        prompt: 'Decyzja safety',
        explanation: 'E',
        difficulty: 'doctor',
        reasoning: 'safety',
        sourceIds: ['s1'],
        options: ['A', 'B'],
        answer: 0,
        rationaleRubric: { requiredConcepts: [{ id: 'c1', label: 'L', acceptedPhrases: ['p'] }], minRequired: 1 },
        assessmentLevel: 'application',
      },
    ],
    teachBack: {
      id: 'tb-1',
      type: 'recall',
      objectiveIds: ['obj-mech', 'obj-safety'],
      prompt: 'Przypomnij',
      explanation: 'E',
      modelAnswer: 'M',
      difficulty: 'both',
      reasoning: 'mechanism',
      sourceIds: ['s1'],
      assessmentLevel: 'generation',
    },
    exitTicket: [
      {
        id: 'ex-1',
        type: 'short_answer',
        objectiveIds: ['obj-mech'],
        prompt: 'Short answer',
        explanation: 'E',
        modelAnswer: 'M',
        difficulty: 'student',
        reasoning: 'mechanism',
        sourceIds: ['s1'],
        rubric: { requiredConcepts: [{ id: 'c1', label: 'L', acceptedPhrases: ['p'] }], minRequired: 1 },
        assessmentLevel: 'generation',
      },
      {
        id: 'ex-2',
        type: 'ordering',
        objectiveIds: ['obj-safety'],
        prompt: 'Order',
        explanation: 'E',
        items: ['1', '2'],
        correctOrder: [0, 1],
        difficulty: 'doctor',
        reasoning: 'safety',
        sourceIds: ['s1'],
        assessmentLevel: 'application',
      },
    ],
    assessmentBank: [
      {
        id: 'bank-1',
        type: 'evidence_weighting',
        objectiveIds: ['obj-safety'],
        prompt: 'Transfer safety',
        explanation: 'E',
        difficulty: 'doctor',
        reasoning: 'safety',
        sourceIds: ['s1'],
        hypothesis: 'Przełom',
        items: [{ id: 'it1', text: 'T1', expected: 'supports', explanation: 'E' }],
        assessmentLevel: 'application',
        transfer: true,
      },
      {
        id: 'bank-2',
        type: 'short_answer',
        objectiveIds: ['obj-mech'],
        prompt: 'Transfer mechanism',
        explanation: 'E',
        modelAnswer: 'M',
        difficulty: 'student',
        reasoning: 'mechanism',
        sourceIds: ['s1'],
        rubric: { requiredConcepts: [{ id: 'c1', label: 'L', acceptedPhrases: ['p'] }], minRequired: 1 },
        assessmentLevel: 'generation',
        transfer: true,
      },
    ],
    widgetIds: ['axis-map'],
    review: { status: 'source-checked', checkedAt: '2026-09-13', scope: 'test' },
  };

  const report = validateObjectiveCoverage(exp);
  assert.equal(report.isValid, true);
  assert.equal(report.summary.coveredObjectives, 2);
  assert.equal(report.summary.missingApplication, 0);
  assert.equal(report.summary.hasGenerationTransfer, true);

  // Lesson Mastery Test Selection
  const testSample = selectLessonMasteryTest(exp, { count: 2 });
  assert.equal(testSample.length, 2);
  assert.ok(testSample.some(item => item.id.startsWith('bank-')));
});
