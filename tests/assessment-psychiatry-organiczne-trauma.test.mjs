import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import {
  LessonRevisionDocumentSchema,
  LessonExperienceV2Schema,
} from '../lib/content/schemas/lesson-revision.ts';
import { validateObjectiveCoverage } from '../lib/assessment-coverage.ts';
import { DeterministicRubricEvaluator } from '../lib/rubric-evaluator.ts';

const REPO_ROOT = process.cwd();
const MANIFEST_PATH = path.join(REPO_ROOT, 'content-manifest.json');
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

const ORG_DIR = path.join(REPO_ROOT, 'content-src', 'psychiatry', 'psych-organiczne');
const TRAUMA_DIR = path.join(REPO_ROOT, 'content-src', 'psychiatry', 'psych-trauma-dysocjacja');

const organicLessons = fs.readdirSync(path.join(ORG_DIR, 'lessons')).filter(f => f.endsWith('.json'));
const organicExperiences = fs.readdirSync(path.join(ORG_DIR, 'experiences')).filter(f => f.endsWith('.json'));

const traumaLessons = fs.readdirSync(path.join(TRAUMA_DIR, 'lessons')).filter(f => f.endsWith('.json'));
const traumaExperiences = fs.readdirSync(path.join(TRAUMA_DIR, 'experiences')).filter(f => f.endsWith('.json'));

test('Wave 7: Inventory & Manifest Parity', () => {
  assert.equal(organicLessons.length, 13, 'psych-organiczne should contain exactly 13 canonical lessons');
  assert.equal(organicExperiences.length, 13, 'psych-organiczne should contain exactly 13 canonical experiences');
  assert.equal(traumaLessons.length, 16, 'psych-trauma-dysocjacja should contain exactly 16 canonical lessons');
  assert.equal(traumaExperiences.length, 16, 'psych-trauma-dysocjacja should contain exactly 16 canonical experiences');

  for (const f of organicLessons) {
    const lesson = JSON.parse(fs.readFileSync(path.join(ORG_DIR, 'lessons', f), 'utf8'));
    assert.ok(manifest[lesson.id], `Manifest should register organic lesson: ${lesson.id}`);
    assert.equal(manifest[lesson.id].moduleId, 'psych-organiczne');
  }

  for (const f of traumaLessons) {
    const lesson = JSON.parse(fs.readFileSync(path.join(TRAUMA_DIR, 'lessons', f), 'utf8'));
    assert.ok(manifest[lesson.id], `Manifest should register trauma lesson: ${lesson.id}`);
    assert.equal(manifest[lesson.id].moduleId, 'psych-trauma-dysocjacja');
  }
});

test('Wave 7: Schema Validation & 100% Objective Coverage', () => {
  const allExpFiles = [
    ...organicExperiences.map(f => path.join(ORG_DIR, 'experiences', f)),
    ...traumaExperiences.map(f => path.join(TRAUMA_DIR, 'experiences', f)),
  ];

  for (const p of allExpFiles) {
    const exp = JSON.parse(fs.readFileSync(p, 'utf8'));
    assert.doesNotThrow(() => LessonExperienceV2Schema.parse(exp), `Experience ${exp.lessonId} should satisfy schema`);

    const cov = validateObjectiveCoverage(exp);
    assert.equal(cov.isValid, true, `Experience ${exp.lessonId} must meet coverage contract: ${cov.validationIssues?.join('; ')}`);
    assert.ok(exp.assessmentBank && exp.assessmentBank.length >= 3, `Experience ${exp.lessonId} must have >= 3 items in bank`);
    assert.ok(cov.summary.hasGeneration, `Experience ${exp.lessonId} must include generation item`);
    assert.ok(cov.summary.hasTransfer, `Experience ${exp.lessonId} must include transfer item`);
    assert.ok(cov.summary.hasGenerationTransfer, `Experience ${exp.lessonId} must include generation-transfer item`);
  }
});

test('Wave 7: Domain Invariants & Clinical Safety Gates', () => {
  // 1. Delirium Cause Hunt (PINCH ME) and BZD avoidance
  const delExp = JSON.parse(fs.readFileSync(path.join(ORG_DIR, 'experiences', 'delirium-rozpoznanie-i-dynamika.json'), 'utf8'));
  const bzdBankItem = delExp.assessmentBank.find(i => i.id === 'delirium-bank-1');
  assert.ok(bzdBankItem, 'Delirium bank must have bzd item');
  assert.match(bzdBankItem.prompt, /diazepam/i);

  // 2. DLB neuroleptic sensitivity
  const dlbExp = JSON.parse(fs.readFileSync(path.join(ORG_DIR, 'experiences', 'otepienie-z-cialami-lewyego-i-parkinson.json'), 'utf8'));
  const dlbBankItem = dlbExp.assessmentBank.find(i => i.id === 'dlb-bank-2');
  assert.ok(dlbBankItem, 'DLB bank must have neuroleptic sensitivity clinical reasoning item');
  const dlbCrits = dlbBankItem.rubric.criticalErrors || [];
  assert.ok(dlbCrits.some(c => c.id.includes('haloperidol') || c.patterns.some(p => p.includes('haloperidol'))), 'DLB must forbid haloperidol');

  // 3. MCA 2005 functional test
  const mcaExp = JSON.parse(fs.readFileSync(path.join(ORG_DIR, 'experiences', 'zdolnosc-decyzyjna-capacity-i-safeguarding.json'), 'utf8'));
  const mcaBankItem = mcaExp.assessmentBank.find(i => i.id === 'cap-bank-2');
  assert.ok(mcaBankItem, 'MCA bank must evaluate 4 functional stages of capacity');

  // 4. TLE Mimic vs Dissociation & Normal EEG pitfall
  const tleExp = JSON.parse(fs.readFileSync(path.join(TRAUMA_DIR, 'experiences', 'trauma-somatyka-mimiki-i-bezpieczenstwo.json'), 'utf8'));
  const tleBankItem = tleExp.assessmentBank.find(i => i.id === 'trauma-som-bank-1');
  assert.ok(tleBankItem, 'Trauma somatic mimic bank must test TLE vs psychogenic dissociation');
  const tleCrits = tleBankItem.rubric.criticalErrors || [];
  assert.ok(tleCrits.some(c => c.patterns.some(p => p.includes('eeg'))), 'TLE must penalize claiming normal EEG rules out epilepsy');

  // 5. Trauma psychotherapy contraindication to early exposure
  const terExp = JSON.parse(fs.readFileSync(path.join(TRAUMA_DIR, 'experiences', 'psychoterapia-traumy-fazy-i-metody.json'), 'utf8'));
  const terBankItem = terExp.assessmentBank.find(i => i.id === 'trauma-ter-bank-2');
  assert.ok(terBankItem, 'Trauma therapy bank must evaluate exposure contraindications');

  // 6. DBT hierarchy & rejection of no-suicide contracts
  const dbtExp = JSON.parse(fs.readFileSync(path.join(TRAUMA_DIR, 'experiences', 'dbt-interwencja-kryzysowa-i-bezpieczenstwo.json'), 'utf8'));
  const dbtBankItem = dbtExp.assessmentBank.find(i => i.id === 'dbt-bank-2');
  assert.ok(dbtBankItem, 'DBT bank must reject no-suicide contracts');
  const dbtCrits = dbtBankItem.rubric.criticalErrors || [];
  assert.ok(dbtCrits.some(c => c.patterns.some(p => p.includes('kontrakt'))), 'DBT must penalize relying on no-suicide contract');
});

test('Wave 7: Rubric Evaluation & Critical Error Precedence', () => {
  const evaluator = new DeterministicRubricEvaluator();
  const dlbExp = JSON.parse(fs.readFileSync(path.join(ORG_DIR, 'experiences', 'otepienie-z-cialami-lewyego-i-parkinson.json'), 'utf8'));
  const item = dlbExp.assessmentBank.find(i => i.id === 'dlb-bank-2');

  const dim0Id = item.rubric.dimensions[0].id;

  // Answer containing critical error: prescribing haloperidol in DLB
  const dangerousAnswer = 'Pacjent ma omamy i pobudzenie w przebiegu DLB, więc należy natychmiast podać haloperidol 10mg domięśniowo.';
  const evalDangerous = evaluator.evaluateMultiDimensional(item.rubric, { [dim0Id]: dangerousAnswer });

  assert.equal(evalDangerous.overallStatus, 'needs_revision', 'Critical error must force needs_revision');
  assert.ok(evalDangerous.criticalErrors && evalDangerous.criticalErrors.length > 0, 'Must record triggered critical error');

  // Competent answer
  const dim1Id = item.rubric.dimensions[1].id;
  const compAnswerDim0 = 'U pacjenta z podejrzeniem DLB występuje skrajna nadwrażliwość neuroleptyczna na blokery D2 receptorów dopaminowych.';
  const compAnswerDim1 = 'Wskazana kwetiapina w małej dawce lub klozapina oraz leczenie przyczynowe i niefarmakologiczne.';
  const evalCompetent = evaluator.evaluateMultiDimensional(item.rubric, {
    [dim0Id]: compAnswerDim0,
    [dim1Id]: compAnswerDim1,
  });
  assert.notEqual(evalCompetent.overallStatus, 'needs_revision', 'Competent answer without critical error should not fail with needs_revision');
  assert.equal(evalCompetent.criticalErrors.length, 0, 'Competent answer must have zero critical errors');
});
