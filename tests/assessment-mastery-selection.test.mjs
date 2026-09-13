import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeExactMinimalSetCover,
  selectLessonMasteryAssessment,
  selectModuleMasteryAssessment,
  selectModuleQuickReview,
} from '../lib/assessment-coverage.ts';

function createMockActivity(id, objIds, type = 'single_choice', options = {}) {
  return {
    id,
    type,
    prompt: `Prompt for ${id}`,
    objectiveIds: objIds,
    sourceIds: ['source-1'],
    points: 10,
    ...options,
  };
}

test('Assessment Mastery: Exact Minimal Set Cover for small banks (n <= 15) vs greedy fallback', () => {
  // Empty case
  const emptyRes = computeExactMinimalSetCover([], new Set(['obj-1']));
  assert.strictEqual(emptyRes.count, 0);
  assert.strictEqual(emptyRes.isExact, true);

  const emptyReq = computeExactMinimalSetCover([createMockActivity('a1', ['obj-1'])], new Set());
  assert.strictEqual(emptyReq.count, 0);
  assert.strictEqual(emptyReq.isExact, true);

  // Exact search: 3 items where C covers both obj1 and obj2, while A covers obj1 and B covers obj2
  const items = [
    createMockActivity('a1', ['obj-1']),
    createMockActivity('a2', ['obj-2']),
    createMockActivity('a3', ['obj-1', 'obj-2']),
  ];
  const exactRes = computeExactMinimalSetCover(items, new Set(['obj-1', 'obj-2']));
  assert.strictEqual(exactRes.isExact, true);
  assert.strictEqual(exactRes.count, 1, 'Exact cover should pick single item covering both');

  // Exact search: 3 disjoint items
  const disjoint = [
    createMockActivity('d1', ['obj-1']),
    createMockActivity('d2', ['obj-2']),
    createMockActivity('d3', ['obj-3']),
  ];
  const disjointRes = computeExactMinimalSetCover(disjoint, new Set(['obj-1', 'obj-2', 'obj-3']));
  assert.strictEqual(disjointRes.isExact, true);
  assert.strictEqual(disjointRes.count, 3);

  // Fallback for n > 15
  const largePool = [];
  for (let i = 1; i <= 16; i++) {
    largePool.push(createMockActivity(`item-${i}`, [`obj-${i % 4}`]));
  }
  const greedyRes = computeExactMinimalSetCover(largePool, new Set(['obj-0', 'obj-1', 'obj-2', 'obj-3']));
  assert.strictEqual(greedyRes.isExact, false, 'Pool size > 15 triggers greedy fallback');
  assert.ok(greedyRes.count >= 1 && greedyRes.count <= 4);
});

test('Assessment Mastery: Lesson mastery contract satisfaction and debt reporting', () => {
  const objectives = [
    { id: 'obj-decision', kind: 'decision', description: 'Decision objective' },
    { id: 'obj-knowledge', kind: 'knowledge', description: 'Knowledge objective' },
  ];

  // Case 1: Incomplete contract (missing transfer and application for decision objective)
  const lowCognitiveBank = [
    createMockActivity('act-rec-1', ['obj-decision'], 'single_choice', {
      assessmentLevel: 'recognition',
      transfer: false,
    }),
    createMockActivity('act-rec-2', ['obj-knowledge'], 'single_choice', {
      assessmentLevel: 'recognition',
      transfer: false,
    }),
  ];

  const incompleteExp = {
    lessonId: 'lesson-test-incomplete',
    objectives,
    diagnostic: lowCognitiveBank[0],
    activities: [lowCognitiveBank[1]],
    teachBack: createMockActivity('tb', ['obj-knowledge'], 'recall'),
    exitTicket: [lowCognitiveBank[0]],
    assessmentBank: lowCognitiveBank,
  };

  const resultIncomplete = selectLessonMasteryAssessment(incompleteExp, { count: 2 });
  assert.strictEqual(resultIncomplete.contractSatisfied, false, 'Decision objective requires app/gen and transfer');
  assert.strictEqual(resultIncomplete.completeCoverage, false);
  assert.ok(resultIncomplete.missingContractDetails && resultIncomplete.missingContractDetails.length > 0);
  assert.ok(resultIncomplete.missingContractDetails.some(d => d.includes('Application lub Generation')));
  assert.ok(resultIncomplete.missingContractDetails.some(d => d.includes('transferowego')));

  // Case 2: Satisfied contract (decision objective has clinical_reasoning with transfer: true)
  const validBank = [
    createMockActivity('act-decision-gen', ['obj-decision'], 'clinical_reasoning', {
      assessmentLevel: 'generation',
      transfer: true,
    }),
    createMockActivity('act-know-app', ['obj-knowledge'], 'matching', {
      assessmentLevel: 'application',
      transfer: false,
    }),
  ];

  const completeExp = {
    lessonId: 'lesson-test-complete',
    objectives,
    diagnostic: validBank[0],
    activities: [validBank[1]],
    teachBack: createMockActivity('tb', ['obj-knowledge'], 'recall'),
    exitTicket: [validBank[0]],
    assessmentBank: validBank,
  };

  const resultComplete = selectLessonMasteryAssessment(completeExp, { count: 2 });
  assert.strictEqual(resultComplete.contractSatisfied, true);
  assert.strictEqual(resultComplete.completeCoverage, true);
  assert.strictEqual(resultComplete.uncoveredObjectiveIds.length, 0);
  assert.strictEqual(resultComplete.items.length, 2);
  assert.strictEqual(resultComplete.estimatedMinimumRequiredCount, 2);
});

test('Assessment Mastery: Module mastery guarantees 1 item per lesson or reports explicit debt', () => {
  const experiences = {
    'l-1': {
      lessonId: 'l-1',
      objectives: [{ id: 'obj-l1-safe', kind: 'safety', description: 'Safety in L1' }],
      diagnostic: createMockActivity('d1', ['obj-l1-safe']),
      activities: [],
      teachBack: createMockActivity('tb1', ['obj-l1-safe'], 'recall'),
      exitTicket: [],
      assessmentBank: [
        createMockActivity('l1-safe-app', ['obj-l1-safe'], 'select_and_justify', { transfer: true }),
      ],
    },
    'l-2': {
      lessonId: 'l-2',
      objectives: [{ id: 'obj-l2-dec', kind: 'decision', description: 'Decision in L2' }],
      diagnostic: createMockActivity('d2', ['obj-l2-dec']),
      activities: [],
      teachBack: createMockActivity('tb2', ['obj-l2-dec'], 'recall'),
      exitTicket: [],
      assessmentBank: [
        createMockActivity('l2-dec-app', ['obj-l2-dec'], 'evidence_weighting', { transfer: true }),
      ],
    },
    'l-3': {
      lessonId: 'l-3',
      objectives: [{ id: 'obj-l3-know', kind: 'knowledge', description: 'Knowledge in L3' }],
      diagnostic: createMockActivity('d3', ['obj-l3-know']),
      activities: [],
      teachBack: createMockActivity('tb3', ['obj-l3-know'], 'recall'),
      exitTicket: [],
      assessmentBank: [
        createMockActivity('l3-know-rec', ['obj-l3-know'], 'single_choice', { transfer: false }),
      ],
    },
  };

  // Default selection (count undefined): guarantees 1 item per lesson (3 items total)
  const fullModuleResult = selectModuleMasteryAssessment(experiences);
  assert.strictEqual(fullModuleResult.items.length, 3);
  assert.strictEqual(fullModuleResult.completeCoverage, true);
  assert.strictEqual(fullModuleResult.uncoveredTopics.length, 0);
  assert.strictEqual(fullModuleResult.coverageDebt, undefined);

  // Budget shortfall (count = 2 for 3 lessons): reports shortfall truthfully
  const constrainedResult = selectModuleMasteryAssessment(experiences, { count: 2 });
  assert.strictEqual(constrainedResult.items.length, 2);
  assert.strictEqual(constrainedResult.completeCoverage, false);
  assert.ok(constrainedResult.coverageDebt);
  assert.strictEqual(constrainedResult.coverageDebt.uncoveredTopics.length, 1, '1 lesson topic was left uncovered due to budget');

  // Quick Review decoupling: quick review produces items without contract debt enforcement
  const quickReviewItems = selectModuleQuickReview(experiences, { count: 2 });
  assert.strictEqual(quickReviewItems.length, 2);
  assert.ok(Array.isArray(quickReviewItems));
});
