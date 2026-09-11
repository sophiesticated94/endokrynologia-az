import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { lessons, questions, flashcards, sources } from '../lib/course.ts';
import { cases } from '../lib/cases.ts';
import { scheduleReview, sampleQuestions, grade, projectActivities, saveIdempotently, isSafePublicKey } from '../lib/learning.ts';
import { glossary, glossaryMap } from '../lib/glossary.ts';

const now = new Date('2026-09-11T12:00:00Z');

test('isSafePublicKey accepts anon JWT, publishable keys and rejects service_role and invalid keys', () => {
  const anonJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIn0.sig';
  const serviceRoleJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UifQ.sig';
  assert.equal(isSafePublicKey('sb_publishable_demo123'), true);
  assert.equal(isSafePublicKey('sbp_project_anon'), true);
  assert.equal(isSafePublicKey(anonJwt), true);
  assert.equal(isSafePublicKey(serviceRoleJwt), false);
  assert.equal(isSafePublicKey('secret_key_123'), false);
  assert.equal(isSafePublicKey(''), false);
  assert.equal(isSafePublicKey(null), false);
});

test('complete curriculum: 140 lessons across 8 modules, 700 explained questions, 700 cards, 108 four-step cases', () => {
  assert.equal(lessons.length, 140);
  assert.equal(questions.length, 700);
  assert.equal(flashcards.length, 700);
  assert.equal(cases.length, 108);

  const thyroidLessons = lessons.filter(l => l.moduleId === 'tarczyca');
  const pituitaryLessons = lessons.filter(l => l.moduleId === 'przysadka');
  const adrenalLessons = lessons.filter(l => l.moduleId === 'nadnercza');
  const parathyroidLessons = lessons.filter(l => l.moduleId === 'przytarczyce');
  const diabetesLessons = lessons.filter(l => l.moduleId === 'cukrzyca');
  const gonadLessons = lessons.filter(l => l.moduleId === 'gonady');
  const nenLessons = lessons.filter(l => l.moduleId === 'nen');
  const otyloscLessons = lessons.filter(l => l.moduleId === 'otylosc');

  assert.equal(thyroidLessons.length, 16, 'Thyroid must have 16 lessons (12 clinical + 2 math + 2 chem)');
  assert.equal(pituitaryLessons.length, 16, 'Pituitary must have 16 lessons (12 clinical + 2 math + 2 chem)');
  assert.equal(adrenalLessons.length, 16, 'Adrenals must have 16 lessons (12 clinical + 2 math + 2 chem)');
  assert.equal(parathyroidLessons.length, 16, 'Parathyroid must have 16 lessons (12 clinical + 2 math + 2 chem)');
  assert.equal(diabetesLessons.length, 16, 'Diabetes must have 16 lessons (12 clinical + 2 math + 2 chem)');
  assert.equal(gonadLessons.length, 20, 'Gonads must have 20 lessons (16 clinical + 2 math + 2 chem)');
  assert.equal(nenLessons.length, 20, 'NEN must have 20 lessons (16 clinical + 2 math + 2 chem)');
  assert.equal(otyloscLessons.length, 20, 'Otylosc must have 20 lessons (16 clinical + 2 math + 2 chem)');


  for (const l of lessons) {
    assert.equal(l.questions.length, 5);
    assert.ok(l.sections.length >= 3);
    assert.ok(l.goals.length >= 2);
    assert.ok(l.advanced.length > 100);
    assert.ok(l.table.rows.length >= 3);
    assert.ok(l.sourceIds.every(id => sources[id]), `Missing source in lesson ${l.id}`);
  }

  for (const c of cases) {
    assert.equal(c.steps.length, 4);
    assert.deepEqual(c.steps.map(s => s.stage), ['Objawy', 'Badania', 'Rozpoznanie', 'Postępowanie']);
    assert.ok(lessons.some(l => l.id === c.lessonId));
  }

  const bank = [...questions, ...cases.flatMap(c => c.steps)];
  assert.equal(new Set(bank.map(q => q.id)).size, bank.length);
  for (const q of bank) {
    assert.ok(q.answer >= 0 && q.answer < q.options.length);
    assert.ok(q.options.every(o => o.explanation.length > 15 && o.text.length > 0));
    assert.equal(new Set(q.options.map(o => o.text)).size, q.options.length);
  }
});

test('correct answers are distributed and physiology answer remains TSH after rotation', () => {
  assert.deepEqual([...new Set(questions.map(q => q.answer))].sort(), [0, 1, 2]);
  assert.equal(questions[0].options[questions[0].answer].text, 'TSH');
  assert.equal(questions[1].options[questions[1].answer].text, 'Spadek TSH');
});

test('exam samples 30 unique questions, does not mutate bank, varies between runs', () => {
  const before = questions.map(q => q.id);
  const a = sampleQuestions(questions, 30, () => 0.1);
  const b = sampleQuestions(questions, 30, () => 0.8);
  assert.equal(a.length, 30);
  assert.equal(new Set(a.map(q => q.id)).size, 30);
  assert.notDeepEqual(a, b);
  assert.deepEqual(questions.map(q => q.id), before);
  assert.throws(() => sampleQuestions(questions, 701));
});


test('grading handles perfect, empty and changed answers', () => {
  const bank = questions.slice(0, 5);
  const answers = Object.fromEntries(bank.map(q => [q.id, q.answer]));
  assert.deepEqual(grade(bank, answers), { correct: 5, total: 5, percent: 100 });
  assert.equal(grade(bank, {}).correct, 0);
  answers[bank[0].id] = (bank[0].answer + 1) % 3;
  assert.equal(grade(bank, answers).percent, 80);
  assert.equal(grade([], {}).percent, 0);
});

test('review intervals progress 1,3,7,14,30 and cap at 30 days', () => {
  let r;
  for (const days of [1, 3, 7, 14, 30, 30]) {
    r = scheduleReview(r, true, now);
    assert.equal((Date.parse(r.dueAt) - now.getTime()) / 86400000, days);
  }
});

test('forgotten card resets to first stage including already mature cards', () => {
  const r = scheduleReview({ stage: 4, dueAt: now.toISOString() }, false, now);
  assert.deepEqual(r, { stage: 0, dueAt: '2026-09-12T12:00:00.000Z' });
  assert.equal(scheduleReview(r, true, now).stage, 1);
});

const event = (id, kind, target_id, payload = {}, time = '2026-09-11T12:00:00Z') => ({
  id, kind, target_id, payload, user_id: 'test', content_version: 'v1', created_at: time
});

test('event projection is order-independent, deduplicates retries and preserves old attempts', () => {
  const events = [
    event('1', 'lesson', 'fizjologia'),
    event('2', 'quiz', 'fizjologia', { correct: 3 }),
    event('3', 'profile', 'level', { level: 'doctor' }),
    event('4', 'lesson', 'fizjologia')
  ];
  const a = projectActivities(events);
  assert.deepEqual(a, projectActivities([...events].reverse()));
  assert.deepEqual(a, projectActivities([...events, events[1]]));
  assert.equal(a.attempts.length, 1);
  assert.equal(a.attempts[0].content_version, 'v1');
  assert.deepEqual(a.completed, ['fizjologia']);
  assert.equal(a.level, 'doctor');
});

test('multi-device review events converge in server-time order', () => {
  const a = event('a', 'review', 'card', { remembered: true });
  const b = event('b', 'review', 'card', { remembered: true }, '2026-09-12T12:00:00Z');
  const c = event('c', 'review', 'card', { remembered: false }, '2026-09-13T12:00:00Z');
  const state = projectActivities([c, a, b]);
  assert.deepEqual(state, projectActivities([a, b, c, b]));
  assert.equal(state.reviews.card.stage, 0);
  assert.equal(state.reviews.card.dueAt, '2026-09-14T12:00:00.000Z');
});

test('network failure followed by retry reuses id; duplicate acknowledgement is success', async () => {
  const e = event('retry-id', 'exam', 'tarczyca');
  let calls = 0;
  const received = [];
  const insert = async data => {
    received.push(data.id);
    calls++;
    return { error: calls === 1 ? { code: 'network', message: 'offline' } : null };
  };
  await assert.rejects(saveIdempotently(e, insert));
  await saveIdempotently(e, insert);
  assert.deepEqual(received, ['retry-id', 'retry-id']);
  await saveIdempotently(e, async () => ({ error: { code: '23505', message: 'duplicate' } }));
  await assert.rejects(saveIdempotently(e, async () => ({ error: { code: '42501', message: 'forbidden' } })));
});

test('medical glossary contains essential terms with definitions and clinical significance', () => {
  assert.ok(glossary.length >= 20);
  const ids = new Set();
  for (const item of glossary) {
    assert.ok(item.id && item.id.length > 0);
    assert.ok(!ids.has(item.id), 'duplicate id: ' + item.id);
    ids.add(item.id);
    assert.ok(item.term && item.term.length > 0);
    assert.ok(item.definition && item.definition.length > 20);
    assert.ok(item.clinicalSignificance && item.clinicalSignificance.length > 20);
    assert.ok(['hormony', 'diagnostyka', 'choroby', 'leki', 'anatomia', 'fizjologia'].includes(item.category));
  }
  // Core endocrine terms
  assert.ok(glossaryMap.get('tsh'));
  assert.ok(glossaryMap.get('ft4'));
  assert.ok(glossaryMap.get('trab'));
  assert.ok(glossaryMap.get('eu-tirads'));
  assert.ok(glossaryMap.get('tyreotropina'));
  // Neuroendocrine
  assert.ok(glossaryMap.get('prl'));
  assert.ok(glossaryMap.get('gh'));
  assert.ok(glossaryMap.get('acth'));
  assert.ok(glossaryMap.get('avp'));
  assert.ok(glossaryMap.get('siadh'));
  // Adrenal
  assert.ok(glossaryMap.get('aldosteron'));
  assert.ok(glossaryMap.get('17-ohp'));
  assert.ok(glossaryMap.get('fenoksybenzamina'));
  // Parathyroid
  assert.ok(glossaryMap.get('pth'));
  assert.ok(glossaryMap.get('casr'));
  assert.ok(glossaryMap.get('cccr'));
  assert.ok(glossaryMap.get('zespół głodnych kości'));
  // Diabetes
  assert.ok(glossaryMap.get('insulina'));
  assert.ok(glossaryMap.get('c-peptyd'));
  assert.ok(glossaryMap.get('hba1c'));
  assert.ok(glossaryMap.get('dka'));
  assert.ok(glossaryMap.get('hhs'));
  assert.ok(glossaryMap.get('tir'));
  assert.ok(glossaryMap.get('isf'));
  assert.ok(glossaryMap.get('glut4'));
  // Gonads
  assert.ok(glossaryMap.get('gnrh'));
  assert.ok(glossaryMap.get('testosteron'));
  assert.ok(glossaryMap.get('estradiol'));
  assert.ok(glossaryMap.get('shbg'));
  assert.ok(glossaryMap.get('amh'));
  assert.ok(glossaryMap.get('cyp19a1'));
  assert.ok(glossaryMap.get('pcos'));
  assert.ok(glossaryMap.get('ohss'));
  assert.ok(glossaryMap.get('klinefelter'));
  assert.ok(glossaryMap.get('cais'));
  // NEN & MEN
  assert.ok(glossaryMap.get('cga'));
  assert.ok(glossaryMap.get('5-hiaa'));
  assert.ok(glossaryMap.get('sstr2'));
  assert.ok(glossaryMap.get('ki-67'));
  assert.ok(glossaryMap.get('prrt'));
  assert.ok(glossaryMap.get('177lu-dotatate'));
  assert.ok(glossaryMap.get('lanreotyd'));
  assert.ok(glossaryMap.get('menina'));
  assert.ok(glossaryMap.get('ret'));
  assert.ok(glossaryMap.get('mtc'));
  assert.ok(glossaryMap.get('gastrinoma'));
  assert.ok(glossaryMap.get('insulinoma'));
  assert.ok(glossaryMap.get('captem'));
  assert.ok(glossaryMap.get('przelom-rakowiaka'));
  // Otyłość i lipidy
  assert.ok(glossaryMap.get('gip'));
  assert.ok(glossaryMap.get('semaglutyd'));
  assert.ok(glossaryMap.get('tirzepatyd'));
  assert.ok(glossaryMap.get('leptyna'));
  assert.ok(glossaryMap.get('adiponektyna'));
  assert.ok(glossaryMap.get('mc4r'));
  assert.ok(glossaryMap.get('setmelanotyd'));
  assert.ok(glossaryMap.get('masld'));
  assert.ok(glossaryMap.get('mash'));
  assert.ok(glossaryMap.get('fib-4'));
  assert.ok(glossaryMap.get('rygb'));
  assert.ok(glossaryMap.get('lsg'));
  assert.ok(glossaryMap.get('dumping-syndrome'));
  assert.ok(glossaryMap.get('fh'));
  assert.ok(glossaryMap.get('pcsk9'));
  assert.ok(glossaryMap.get('inklisiran'));
  assert.ok(glossaryMap.get('kwas-bempedonowy'));
  assert.ok(glossaryMap.get('score2'));
  assert.ok(glossaryMap.get('fcs'));
  assert.ok(glossaryMap.get('adaptacja-metaboliczna'));
});

test('course map grouping covers all 140 lessons across 8 modules without gaps', () => {
  const moduleGroups = {
    tarczyca: ['Fundamenty', 'Praktyka kliniczna', 'Sytuacje szczególne', 'Matematyka i modele', 'Chemia i biochemia'],
    przysadka: ['Fundamenty', 'Gruczolaki i hipersekrecja', 'Niedoczynność i gospodarka wodna', 'Sytuacje szczególne i chirurgia', 'Matematyka i modele', 'Chemia i biochemia'],
    nadnercza: ['Fundamenty', 'Niedoczynność kory i WPN', 'Nadczynności i guz chromochłonny', 'Stany nagłe i chirurgia', 'Matematyka i modele', 'Chemia i biochemia'],
    przytarczyce: ['Fundamenty', 'Nadczynności i hiperkalcemia', 'Niedoczynności i tężyczka', 'Kości, chirurgia i stany nagłe', 'Matematyka i modele', 'Chemia i biochemia'],
    cukrzyca: ['Fundamenty i diagnostyka', 'Klasyfikacja i patogeneza', 'Ostre stany i powikłania', 'Farmakoterapia i sytuacje szczególne', 'Matematyka i modele', 'Chemia i biochemia'],
    gonady: ['Fundamenty i diagnostyka', 'Andrologia i gonady męskie', 'Ginekologia endokrynologiczna', 'Hormonoterapia tranzycyjna i zaburzenia rozwojowe', 'Matematyka i modele', 'Chemia i biochemia'],
    nen: ['Fundamenty i diagnostyka', 'Guzy neuroendokrynne trzustki (pNET)', 'Zespół rakowiaka i NEN przewodu pokarmowego oraz płuc', 'Zespoły uwarunkowane genetycznie', 'Terapie celowane, PRRT i chirurgia', 'Matematyka i modele', 'Chemia i biochemia'],
    otylosc: ['Fundamenty i diagnostyka', 'Powikłania narządowe i kardiometaboliczne', 'Farmakoterapia otyłości', 'Chirurgia bariatryczna i metaboliczna', 'Zaburzenia lipidowe i dyslipidemie', 'Matematyka i modele', 'Chemia i biochemia'],
  };

  for (const [modId, groups] of Object.entries(moduleGroups)) {
    const modLessons = lessons.filter(l => l.moduleId === modId);
    assert.equal(modLessons.length, (modId === 'gonady' || modId === 'nen' || modId === 'otylosc') ? 20 : 16, `Module ${modId} should have proper lesson count`);
    const lessonGroups = Array.from(new Set(modLessons.map(l => l.group)));
    for (const g of lessonGroups) {
      assert.ok(groups.includes(g), `Group "${g}" should be recognized in module ${modId}`);
    }
  }
});


test('strict architectural rule: no project code file exceeds 500 lines', () => {
  const trackedFiles = execSync('git ls-files "*.ts" "*.tsx" "*.mjs"', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .map(f => f.trim())
    .filter(Boolean);

  const ignoredVendorFiles = new Set(['components/ui/sidebar.tsx']);
  const violations = [];

  for (const file of trackedFiles) {
    if (ignoredVendorFiles.has(file)) continue;
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, 'utf8');
    const lineCount = content.split('\n').length;
    if (lineCount > 500) {
      violations.push(`${file}: ${lineCount} lines (limit: 500)`);
    }
  }

  assert.deepEqual(violations, [], `Files exceeding 500 lines limit:\n${violations.join('\n')}`);
});
