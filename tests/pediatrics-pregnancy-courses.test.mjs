import test from 'node:test';
import assert from 'node:assert/strict';
import { lessons, questions, sources } from '../lib/course.ts';
import { pediatricCases } from '../lib/cases-pediatrics.ts';
import { pregnancyCases } from '../lib/cases-pregnancy.ts';

test('pediatric and pregnancy course modules curriculum integrity', () => {
  const pedLessons = lessons.filter(l => l.moduleId === 'pediatria');
  const pregLessons = lessons.filter(l => l.moduleId === 'ciaza');

  assert.equal(pedLessons.length, 16, 'Pediatrics module must have 16 lessons (12 clinical + 2 math + 2 chem)');
  assert.equal(pregLessons.length, 16, 'Pregnancy module must have 16 lessons (12 clinical + 2 math + 2 chem)');

  const allNewLessons = [...pedLessons, ...pregLessons];
  assert.equal(allNewLessons.length, 32);

  for (const l of allNewLessons) {
    assert.equal(l.questions.length, 5, `Lesson ${l.id} must have exactly 5 questions`);
    assert.ok(l.sections.length >= 3, `Lesson ${l.id} must have at least 3 sections`);
    assert.ok(l.goals.length >= 2, `Lesson ${l.id} must have at least 2 goals`);
    assert.ok(l.advanced.length > 80, `Lesson ${l.id} must have rich advanced section`);
    assert.ok(l.table.rows.length >= 3, `Lesson ${l.id} must have at least 3 table rows`);
    assert.ok(l.sourceIds.every(id => sources[id]), `Missing source in lesson ${l.id}`);

    for (const q of l.questions) {
      assert.equal(q.options.length, 3, `Question ${q.id} must have 3 options`);
      assert.ok(q.answer >= 0 && q.answer < 3);
      assert.ok(q.prompt.length > 15);
      for (const opt of q.options) {
        assert.ok(opt.text.length > 0);
        assert.ok(opt.explanation.length > 15);
      }
    }
  }

  const pedQuestions = pedLessons.flatMap(l => l.questions);
  const pregQuestions = pregLessons.flatMap(l => l.questions);
  assert.equal(pedQuestions.length, 80);
  assert.equal(pregQuestions.length, 80);

  // Verify unique IDs among questions
  const qIds = new Set([...pedQuestions, ...pregQuestions].map(q => q.id));
  assert.equal(qIds.size, 160);
});

test('pediatric and pregnancy clinical cases integrity', () => {
  assert.equal(pediatricCases.length, 4, 'Must have 4 pediatric cases');
  assert.equal(pregnancyCases.length, 4, 'Must have 4 pregnancy cases');

  const combinedCases = [...pediatricCases, ...pregnancyCases];
  assert.equal(combinedCases.length, 8);

  const stages = ['Objawy', 'Badania', 'Rozpoznanie', 'Postępowanie'];

  for (const c of combinedCases) {
    assert.equal(c.steps.length, 4, `Case ${c.id} must have 4 steps`);
    assert.deepEqual(c.steps.map(s => s.stage), stages);
    assert.ok(lessons.some(l => l.id === c.lessonId), `Case ${c.id} links to existing lesson ${c.lessonId}`);

    for (const s of c.steps) {
      assert.equal(s.options.length, 2, `Step ${s.id} must have 2 options`);
      assert.ok(s.answer === 0 || s.answer === 1);
      assert.ok(s.prompt.length > 10);
      assert.ok(s.context.length > 15);
      for (const opt of s.options) {
        assert.ok(opt.text.length > 0);
        assert.ok(opt.explanation.length > 15);
      }
    }
  }
});
