import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LessonRevisionDocumentSchema,
  LearningActivitySchema,
} from '../lib/content/schemas/lesson-revision.ts';
import { lessons, lessonExperiences } from '../lib/course.ts';

test('Lesson Revision Schema: validates all 16 thyroid lessons against schema', () => {
  const thyroidLessons = lessons.filter((l) => l.moduleId === 'tarczyca');
  assert.equal(thyroidLessons.length, 16, 'Should have exactly 16 thyroid lessons');

  for (const lesson of thyroidLessons) {
    const experience = lessonExperiences[lesson.id];
    const doc = {
      id: lesson.id,
      moduleId: lesson.moduleId,
      title: lesson.title,
      subtitle: lesson.subtitle,
      group: lesson.group,
      minutes: lesson.minutes,
      goals: lesson.goals,
      sections: lesson.sections,
      table: lesson.table,
      advanced: lesson.advanced,
      summary: lesson.summary,
      sourceIds: lesson.sourceIds,
      questions: lesson.questions,
      experience: experience || undefined,
      derivation: lesson.derivation,
      workedExample: lesson.workedExample,
      assetIds: [],
    };

    const parsed = LessonRevisionDocumentSchema.safeParse(doc);
    if (!parsed.success) {
      console.error(`Validation failed for lesson ${lesson.id}:`, parsed.error.format());
    }
    assert.equal(parsed.success, true, `Lesson ${lesson.id} should conform to schema`);
  }
});

test('Lesson Revision Schema: rejects invalid documents', () => {
  const invalidDocs = [
    {}, // empty
    { id: 'foo' }, // missing required fields
    {
      id: 'foo',
      moduleId: 'tarczyca',
      title: 'T',
      subtitle: 'S',
      group: 'G',
      minutes: 10,
      goals: [],
      sections: [],
      table: { headers: [], rows: [] },
      advanced: '',
      summary: '',
      sourceIds: [],
      questions: [],
      experience: {
        experienceVersion: 1, // Invalid version: must be 2
      },
    },
  ];

  for (const invalid of invalidDocs) {
    const parsed = LessonRevisionDocumentSchema.safeParse(invalid);
    assert.equal(parsed.success, false);
  }
});

test('Learning Activity Schema: validates single_choice, multi_select, and recall', () => {
  const single = {
    id: 'act-1',
    type: 'single_choice',
    objectiveIds: ['obj-1'],
    prompt: 'Prompt text?',
    explanation: 'Explanation',
    difficulty: 'student',
    reasoning: 'mechanism',
    sourceIds: ['src-1'],
    options: ['A', 'B', 'C'],
    answer: 0,
  };
  assert.equal(LearningActivitySchema.safeParse(single).success, true);

  const recall = {
    id: 'act-2',
    type: 'recall',
    objectiveIds: ['obj-1'],
    prompt: 'Explain X',
    explanation: 'Explanation',
    difficulty: 'both',
    reasoning: 'safety',
    sourceIds: ['src-1'],
    modelAnswer: 'Model answer text',
  };
  assert.equal(LearningActivitySchema.safeParse(recall).success, true);
});
