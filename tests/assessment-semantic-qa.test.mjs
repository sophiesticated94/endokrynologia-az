import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  validateActivitySemanticQA,
  validateExperienceSemanticQA,
} from '../lib/assessment-semantic-validator.ts';

test('Assessment Semantic QA: Synthetic Activity Failure Modes', () => {
  // 1. Single Choice: Invalid answer index
  const oobActivity = {
    id: 'test-oob-1',
    type: 'single_choice',
    prompt: 'Prawidłowe postępowanie w ostrym majaczeniu?',
    objectiveIds: ['obj-1'],
    options: ['Opcja A', 'Opcja B'],
    answer: 3,
    explanation: 'Wyjaśnienie do pytania testowego.',
  };
  const oobRes = validateActivitySemanticQA(oobActivity);
  assert.equal(oobRes.isValid, false);
  assert.ok(oobRes.issues.some(i => i.includes('poza zakresem')));

  // 2. Single Choice: Duplicate options
  const dupOptActivity = {
    id: 'test-dup-1',
    type: 'single_choice',
    prompt: 'Prawidłowe postępowanie w ostrym majaczeniu?',
    objectiveIds: ['obj-1'],
    options: ['Identyczna opcja', 'Identyczna opcja'],
    answer: 0,
    explanation: 'Wyjaśnienie do pytania testowego.',
  };
  const dupRes = validateActivitySemanticQA(dupOptActivity);
  assert.equal(dupRes.isValid, false);
  assert.ok(dupRes.issues.some(i => i.includes('zduplikowane opcje')));

  // 3. Single Choice: Inverted key (explanation matches distractor feedback)
  const invertedKeyActivity = {
    id: 'test-inv-1',
    type: 'single_choice',
    prompt: 'Czy benzodiazepiny są rutynowym lekiem w majaczeniu?',
    objectiveIds: ['obj-1'],
    options: ['Tak, są lekiem z wyboru', 'Nie, są przeciwwskazane'],
    optionFeedback: [
      'Błąd: benzodiazepiny pogarszają uwagę i wydłużają hospitalizację.',
      'Prawidłowo: leczenie niefarmakologiczne i Cause Hunt są kluczowe.',
    ],
    answer: 0, // Inverted! Option 0 is marked as answer, but explanation is from distractor 1
    explanation: 'Prawidłowo: leczenie niefarmakologiczne i Cause Hunt są kluczowe.',
  };
  const invRes = validateActivitySemanticQA(invertedKeyActivity);
  assert.equal(invRes.isValid, false);
  assert.ok(invRes.issues.some(i => i.includes('odwrócony klucz')));

  // 4. Multi Select: Out of bounds answer
  const multiOob = {
    id: 'test-multi-oob',
    type: 'multi_select',
    prompt: 'Które leki należą do grupy SSRI?',
    objectiveIds: ['obj-1'],
    options: ['Sertralina', 'Escitalopram', 'Haloperidol'],
    answers: [0, 5],
    explanation: 'Sertralina i escitalopram to SSRI.',
  };
  const multiRes = validateActivitySemanticQA(multiOob);
  assert.equal(multiRes.isValid, false);
  assert.ok(multiRes.issues.some(i => i.includes('poza zakresem')));

  // 5. Ordering: Invalid permutation
  const badOrder = {
    id: 'test-ord-bad',
    type: 'ordering',
    prompt: 'Uporządkuj etapy Cause Hunt.',
    objectiveIds: ['obj-1'],
    items: ['Krok 1', 'Krok 2', 'Krok 3'],
    correctOrder: [0, 0, 1], // not a valid permutation
    explanation: 'Kolejność etapów.',
  };
  const ordRes = validateActivitySemanticQA(badOrder);
  assert.equal(ordRes.isValid, false);
  assert.ok(ordRes.issues.some(i => i.includes('permutacją')));

  // 6. Matching: Duplicate left key
  const badMatch = {
    id: 'test-match-bad',
    type: 'matching',
    prompt: 'Dopasuj receptor do neuroprzekaźnika.',
    objectiveIds: ['obj-1'],
    pairs: [
      ['D2', 'Dopamina'],
      ['D2', 'Noradrenalina'],
    ],
    explanation: 'Dopasowanie receptorów.',
  };
  const matchRes = validateActivitySemanticQA(badMatch);
  assert.equal(matchRes.isValid, false);
  assert.ok(matchRes.issues.some(i => i.includes('zduplikowany')));

  // 7. Numeric: Negative tolerance
  const badNumeric = {
    id: 'test-num-bad',
    type: 'numeric',
    prompt: 'Oblicz klirens kreatyniny.',
    objectiveIds: ['obj-1'],
    answer: 60,
    tolerance: -5,
    unit: 'ml/min',
    explanation: 'Wzór Cockcrofta-Gaulta.',
  };
  const numRes = validateActivitySemanticQA(badNumeric);
  assert.equal(numRes.isValid, false);
  assert.ok(numRes.issues.some(i => i.includes('tolerancja')));

  // 8. Select and Justify: minRequired > requiredConcepts.length
  const badSaj = {
    id: 'test-saj-bad',
    type: 'select_and_justify',
    prompt: 'Jaki lek wdrożyć?',
    objectiveIds: ['obj-1'],
    options: ['Lek A', 'Lek B'],
    answer: 0,
    rationaleRubric: {
      requiredConcepts: [{ id: 'c1', label: 'Koncept 1', acceptedPhrases: ['fraza'] }],
      minRequired: 3, // impossible: only 1 concept defined
    },
    explanation: 'Wyjaśnienie decyzji.',
  };
  const sajRes = validateActivitySemanticQA(badSaj);
  assert.equal(sajRes.isValid, false);
  assert.ok(sajRes.issues.some(i => i.includes('minRequired')));
});

test('Assessment Semantic QA: Golden Regression Tests for psych-organiczne', () => {
  const orgDir = 'content-src/psychiatry/psych-organiczne';
  const expPath = path.join(orgDir, 'experiences', 'psychofarmakologia-wieku-podeszlego.json');
  const exp = JSON.parse(fs.readFileSync(expPath, 'utf8'));

  // 1. ACB Score Diagnostic Item: ACB=9 must be correct option
  const diag = exp.diagnostic;
  assert.equal(diag.id, 'psych-psychofarmakologia-wieku-podeszlego-q1-diagnostic-v2');
  assert.ok(diag.options[diag.answer].includes('ACB = 9'), 'Correct answer must be ACB = 9 points');
  assert.ok(diag.explanation.includes('ACB = 3'), 'Explanation must justify sum of anticholinergic burden');
  assert.ok(!diag.options[diag.answer].includes('ACB wynosi 0'), 'ACB = 0 must NOT be marked correct');

  // 2. Beers Criteria Checkpoint: Decision-support tool must be correct option
  const cp1 = exp.activities[0];
  assert.equal(cp1.id, 'psych-psychofarmakologia-wieku-podeszlego-q2-checkpoint-1-v2');
  assert.ok(cp1.options[cp1.answer].includes('narzędzie wsparcia decyzji'), 'Beers must be identified as decision-support tool');
  assert.ok(!cp1.options[cp1.answer].includes('kodeks karny'), 'Criminal code distractor must NOT be marked correct');

  // 3. Oxybutynin Alternative Exit Ticket: Mirabegron must be correct option
  const exit0 = exp.exitTicket[0];
  assert.equal(exit0.id, 'psych-psychofarmakologia-wieku-podeszlego-q4-exit-transfer-v2');
  assert.ok(exit0.options[exit0.answer].includes('Mirabegron'), 'Mirabegron must be the recommended low-ACB alternative');
  assert.ok(!exit0.options[exit0.answer].includes('amitryptyliny'), 'Amitriptyline increase must NOT be marked correct');

  // 4. Sarcopenia Exit Ticket: Muscle wasting masking renal decline must be correct option
  const exit1 = exp.exitTicket[1];
  assert.equal(exit1.id, 'psych-psychofarmakologia-wieku-podeszlego-q5-exit-safety-v2');
  assert.ok(exit1.options[exit1.answer].includes('sarkopenii'), 'Sarcopenia must explain masked renal impairment');
  assert.ok(!exit1.options[exit1.answer].includes('przez skórę'), 'Absurd distractor must NOT be marked correct');

  // 5. RPD Emergency Admission: Neurological admission and LP must be correct option
  const rpdExp = JSON.parse(fs.readFileSync(path.join(orgDir, 'experiences', 'szybko-postepujace-zespoly-otepienne.json'), 'utf8'));
  assert.ok(rpdExp.diagnostic.options[rpdExp.diagnostic.answer].includes('neurologii'), 'Emergency neurology admission must be selected for RPD');
  assert.ok(!rpdExp.diagnostic.options[rpdExp.diagnostic.answer].includes('melisy'), 'Melisa tea must NOT be marked correct for RPD');

  // 6. Capacity Decision-Specific: Understand/Retain/Weigh/Communicate must be correct option
  const capExp = JSON.parse(fs.readFileSync(path.join(orgDir, 'experiences', 'zdolnosc-decyzyjna-capacity-i-safeguarding.json'), 'utf8'));
  assert.ok(capExp.activities[0].options[capExp.activities[0].answer].includes('Understand'), 'MCA functional test must be marked correct');
  assert.ok(!capExp.activities[0].options[capExp.activities[0].answer].includes('Bogactwo finansowe'), 'Wealth/education must NOT be marked correct');
});

test('Assessment Semantic QA: 100% Pass Across All 8 Migrated Modules', () => {
  const migratedPaths = [
    'content-src/endocrinology/tarczyca',
    'content-src/endocrinology/przysadka',
    'content-src/endocrinology/nadnercza',
    'content-src/endocrinology/przytarczyce',
    'content-src/psychiatry/psych-afektywne',
    'content-src/psychiatry/psych-farmakologia',
    'content-src/psychiatry/psych-organiczne',
    'content-src/psychiatry/psych-trauma-dysocjacja',
  ];

  for (const mp of migratedPaths) {
    const expDir = path.join(mp, 'experiences');
    const files = fs.readdirSync(expDir).filter(f => f.endsWith('.json'));
    assert.ok(files.length > 0, `Module ${mp} must have experiences`);

    for (const f of files) {
      const exp = JSON.parse(fs.readFileSync(path.join(expDir, f), 'utf8'));
      const res = validateExperienceSemanticQA(exp);
      assert.equal(
        res.isValid,
        true,
        `Experience ${f} in ${mp} failed semantic QA with issues: ${res.issues.join('; ')}`
      );
    }
  }
});
