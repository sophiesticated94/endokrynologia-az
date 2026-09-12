import test from 'node:test';
import assert from 'node:assert/strict';
import { psychiatryLessons, psychiatryQuestions, psychiatryFlashcards, psychiatryModulesList } from '../lib/course-psychiatry.ts';
import { psychiatryCases } from '../lib/cases-psychiatry.ts';
import { psychiatryGlossary, psychiatryGlossaryMap } from '../lib/glossary-psychiatry.ts';
import { psychiatrySources } from '../lib/course-psychiatry-sources.ts';
import { COURSES, getCourse } from '../lib/courses-registry.ts';

test('psychiatry curriculum structure: 38 lessons across 2 modules, 190 questions, 194 flashcards, 24 cases', () => {
  assert.equal(psychiatryLessons.length, 38);
  assert.equal(psychiatryQuestions.length, 190);
  assert.equal(psychiatryFlashcards.length, 194);
  assert.equal(psychiatryCases.length, 24);
  assert.equal(psychiatryGlossary.length, 16);
  assert.equal(psychiatryModulesList.length, 2);

  const affective = psychiatryLessons.filter(l => l.moduleId === 'psych-afektywne');
  const pharma = psychiatryLessons.filter(l => l.moduleId === 'psych-farmakologia');

  assert.equal(affective.length, 16, 'Affective & neurobiology module has 16 lessons');
  assert.equal(pharma.length, 22, 'Psychopharmacology & receptors module has 22 lessons');

  for (const l of psychiatryLessons) {
    assert.equal(l.questions.length, 5, `Lesson ${l.id} must have 5 questions`);
    assert.ok(l.sections.length >= 3, `Lesson ${l.id} must have at least 3 sections`);
    assert.ok(l.goals.length >= 2, `Lesson ${l.id} must have at least 2 goals`);
    assert.ok(l.advanced.length > 80, `Lesson ${l.id} must have rigorous advanced depth`);
    assert.ok(l.table.rows.length >= 2, `Lesson ${l.id} must have structured comparison table`);
    assert.ok(l.sourceIds.every(id => psychiatrySources[id]), `Missing source in lesson ${l.id}`);
  }

  for (const q of psychiatryQuestions) {
    assert.equal(q.options.length, 3, `Question ${q.id} must have 3 options`);
    assert.ok(q.answer >= 0 && q.answer <= 2, `Question ${q.id} answer index must be 0-2`);
    assert.ok(q.options[q.answer].explanation.length > 10, `Question ${q.id} must have explanation`);
  }

  for (const c of psychiatryCases) {
    assert.equal(c.steps.length, 4, `Case ${c.id} must have 4 steps`);
    assert.ok(c.steps.every(s => typeof s.stage === 'string' && s.stage.length > 0), `Case ${c.id} steps must have non-empty stage names`);
    for (const step of c.steps) {
      assert.ok(step.options.length >= 2, `Case ${c.id} step ${step.id} must have at least 2 options`);
      assert.ok(step.answer >= 0 && step.answer < step.options.length, `Case ${c.id} step ${step.id} answer out of range`);
      assert.ok(step.options[step.answer].explanation.length > 20);
    }
  }
});

test('courses registry holds valid bundles for endocrinology and psychiatry', () => {
  const endo = getCourse('endocrinology');
  assert.equal(endo.id, 'endocrinology');
  assert.equal(endo.title, 'Endokrynologia i Zaburzenia Metaboliczne');
  assert.equal(endo.lessons.length, 178);
  assert.equal(endo.questions.length, 890);
  assert.equal(endo.flashcards.length, 940);
  assert.equal(endo.cases.length, 120);

  const psych = getCourse('psychiatry');
  assert.equal(psych.id, 'psychiatry');
  assert.equal(psych.title, 'Psychiatria i Psychofarmakologia Kliniczna');
  assert.equal(psych.lessons.length, 38);
  assert.equal(psych.questions.length, 190);
  assert.equal(psych.flashcards.length, 194);
  assert.equal(psych.cases.length, 24);
  assert.equal(psych.glossary.length, 16);
});

test('psychiatry sources include top tier guidelines and seminal neurobiology PET studies', () => {
  assert.ok(psychiatrySources['icd11-cddr']);
  assert.ok(psychiatrySources['dsm5tr']);
  assert.ok(psychiatrySources['maudsley15']);
  assert.ok(psychiatrySources['canmat-mdd-2023']);
  assert.ok(psychiatrySources['agnp-tdm-2026']);
  assert.ok(psychiatrySources['pet-sert-meyer']);
  assert.ok(psychiatrySources['pet-d2-kapur']);
  assert.ok(psychiatrySources['hunter-criteria']);
  assert.ok(psychiatrySources['cpic-cyp2d6-2c19']);

  for (const [key, s] of Object.entries(psychiatrySources)) {
    assert.ok(s.id === key, `Source id mismatch for ${key}`);
    assert.ok(s.title.length > 5, `Source ${key} has too short title`);
    assert.ok(s.year.length >= 4, `Source ${key} year invalid`);
    assert.ok(s.url.startsWith('http'), `Source ${key} url invalid`);
    assert.ok(s.kind.length > 5, `Source ${key} kind too short`);
  }
});

test('psychiatry glossary covers high yield psychopathology and psychopharmacology terms', () => {
  const terms = ['sert', 'd2', 'bdnf', 'hunter', 'nms', 'lit', 'qtc'];
  for (const term of terms) {
    assert.ok(psychiatryGlossaryMap.has(term), `Missing expected glossary term: ${term}`);
    const entry = psychiatryGlossaryMap.get(term);
    assert.ok(entry.term.length > 0);
    assert.ok(entry.short.length > 10);
    assert.ok(entry.full.length > 20);
  }
});
