import test from 'node:test';
import assert from 'node:assert/strict';

import { thyroidLessons, thyroidExperiences, thyroidSources, thyroidClaims } from '../lib/endocrinology/tarczyca-content.ts';
import { pituitaryLessons, pituitaryExperiences, pituitarySources, pituitaryClaims } from '../lib/endocrinology/przysadka-content.ts';
import {
  validateObjectiveCoverage,
  getAllExperienceActivities,
  selectLessonMasteryTest,
  selectModuleMasteryAssessment,
  selectModuleQuickReview,
} from '../lib/assessment-coverage.ts';
import { LessonExperienceV2Schema } from '../lib/content/schemas/lesson-revision.ts';

test('Wave 1: Tarczyca module satisfies 100% objective coverage & playbook gates', () => {
  assert.equal(thyroidLessons.length, 16, 'Tarczyca must have 16 lessons');
  assert.equal(Object.keys(thyroidExperiences).length, 16, 'Tarczyca must have 16 experiences');

  for (const lesson of thyroidLessons) {
    const exp = thyroidExperiences[lesson.id];
    assert.ok(exp, 'Experience must exist for tarczyca lesson ' + lesson.id);

    // 1. Zod Schema parse
    const parsed = LessonExperienceV2Schema.safeParse(exp);
    assert.ok(parsed.success, 'Tarczyca experience failed schema: ' + JSON.stringify(parsed.error?.issues));

    // 2. Playbook Objective Coverage Gate
    const report = validateObjectiveCoverage(exp);
    assert.ok(report.isValid, 'Tarczyca lesson failed coverage report: ' + JSON.stringify(report.summary));
    assert.equal(report.summary.missingApplication, 0, 'Tarczyca lesson has missing application objectives');
    assert.equal(report.summary.missingGeneration, 0, 'Tarczyca lesson has missing generation objectives');
    assert.ok(report.summary.hasGenerationTransfer, 'Tarczyca lesson must have Generation transfer item');

    assert.equal(report.summary.missingTransfer, 0, 'Tarczyca lesson has missing transfer objectives');
    assert.equal(report.summary.missingGenerationTransfer, 0, 'Tarczyca lesson has missing generationTransfer objectives');

    // 3. Multi-level assessment gate: every objective has >= 2 distinct activity types
    for (const [objId, detail] of Object.entries(report.objectives)) {
      assert.ok(detail.meetsContract, 'Tarczyca obj ' + objId + ' did not meet contract: ' + detail.missingRequirements.join(', '));
      const distinctTypes = new Set(detail.activities.map(a => a.type));
      assert.ok(distinctTypes.size >= 2, 'Tarczyca obj ' + objId + ' must have >= 2 distinct activity types, had ' + distinctTypes.size);
    }

    // 4. Assessment Bank verification (coverage-driven, not quota-capped)
    assert.ok(Array.isArray(exp.assessmentBank), 'Tarczyca lesson must have assessmentBank');
    assert.ok(exp.assessmentBank.length >= 2, 'Tarczyca lesson bank size must be >= 2, got ' + exp.assessmentBank.length);

    // 5. Test bank item selector
    const masteryTest = selectLessonMasteryTest(exp, { count: 3 });
    assert.equal(masteryTest.length, 3, 'Should select exactly 3 activities for mastery test in ' + lesson.id);
  }
});

test('Wave 1: Przysadka module satisfies 100% objective coverage & playbook gates', () => {
  assert.equal(pituitaryLessons.length, 16, 'Przysadka must have 16 lessons');
  assert.equal(Object.keys(pituitaryExperiences).length, 16, 'Przysadka must have 16 experiences');

  for (const lesson of pituitaryLessons) {
    const exp = pituitaryExperiences[lesson.id];
    assert.ok(exp, 'Experience must exist for przysadka lesson ' + lesson.id);

    // 1. Zod Schema parse
    const parsed = LessonExperienceV2Schema.safeParse(exp);
    assert.ok(parsed.success, 'Przysadka experience failed schema: ' + JSON.stringify(parsed.error?.issues));

    // 2. Playbook Objective Coverage Gate
    const report = validateObjectiveCoverage(exp);
    assert.ok(report.isValid, 'Przysadka lesson failed coverage report: ' + JSON.stringify(report.summary));
    assert.equal(report.summary.missingApplication, 0, 'Przysadka lesson has missing application objectives');
    assert.equal(report.summary.missingGeneration, 0, 'Przysadka lesson has missing generation objectives');
    assert.ok(report.summary.hasGenerationTransfer, 'Przysadka lesson must have Generation transfer item');
    assert.equal(report.summary.missingTransfer, 0, 'Przysadka lesson has missing transfer objectives');
    assert.equal(report.summary.missingGenerationTransfer, 0, 'Przysadka lesson has missing generationTransfer objectives');

    // 3. Multi-level assessment gate: every objective has >= 2 distinct activity types
    for (const [objId, detail] of Object.entries(report.objectives)) {
      assert.ok(detail.meetsContract, 'Przysadka obj ' + objId + ' did not meet contract: ' + detail.missingRequirements.join(', '));
      const distinctTypes = new Set(detail.activities.map(a => a.type));
      assert.ok(distinctTypes.size >= 2, 'Przysadka obj ' + objId + ' must have >= 2 distinct activity types, had ' + distinctTypes.size);
    }

    // 4. Assessment Bank verification (coverage-driven, not quota-capped)
    assert.ok(Array.isArray(exp.assessmentBank), 'Przysadka lesson must have assessmentBank');
    assert.ok(exp.assessmentBank.length >= 2, 'Przysadka lesson bank size must be >= 2, got ' + exp.assessmentBank.length);

    // 5. Test bank item selector
    const masteryTest = selectLessonMasteryTest(exp, { count: 3 });
    assert.equal(masteryTest.length, 3, 'Should select exactly 3 activities for mastery test in ' + lesson.id);
  }
});

test('Wave 1: Module mastery test generator across 16 lessons', () => {
  const thyAssessment = selectModuleMasteryAssessment(thyroidExperiences);
  assert.equal(thyAssessment.completeCoverage, true, 'Tarczyca full module mastery assessment must achieve complete coverage');
  assert.equal(thyAssessment.items.length, 16, 'Should select 1 item from each of the 16 lessons');

  const pitAssessment = selectModuleMasteryAssessment(pituitaryExperiences);
  assert.equal(pitAssessment.completeCoverage, true, 'Przysadka full module mastery assessment must achieve complete coverage');
  assert.equal(pitAssessment.items.length, 16, 'Should select 1 item from each of the 16 lessons');

  const thyQuick = selectModuleQuickReview(thyroidExperiences, { count: 10 });
  assert.equal(thyQuick.length, 10, 'Tarczyca quick review should sample 10 items');
});

test('Wave 1: Source & Claim Provenance integrity', () => {
  for (const exp of Object.values(thyroidExperiences)) {
    for (const act of getAllExperienceActivities(exp, true)) {
      for (const sid of (act.sourceIds || [])) {
        assert.ok(thyroidSources[sid], 'Activity ' + act.id + ' references missing source ' + sid + ' in tarczyca');
      }
    }
  }

  for (const c of thyroidClaims) {
    for (const sid of c.sourceIds) {
      assert.ok(thyroidSources[sid], 'Claim ' + c.id + ' references missing source ' + sid + ' in tarczyca');
    }
  }

  for (const exp of Object.values(pituitaryExperiences)) {
    for (const act of getAllExperienceActivities(exp, true)) {
      for (const sid of (act.sourceIds || [])) {
        assert.ok(pituitarySources[sid], 'Activity ' + act.id + ' references missing source ' + sid + ' in przysadka');
      }
    }
  }

  for (const c of pituitaryClaims) {
    for (const sid of c.sourceIds) {
      assert.ok(pituitarySources[sid], 'Claim ' + c.id + ' references missing source ' + sid + ' in przysadka');
    }
  }
});

test('Wave 1: Clinical Safety & Nuance Assertions', () => {
  const stormClaim = thyroidClaims.find(c => c.id === 'claim-thy-storm-bwps-threshold');
  assert.ok(stormClaim, 'Storm claim must exist');
  assert.equal(stormClaim.value, 45, 'BWPS cutoff must be 45');

  const siadhClaim = pituitaryClaims.find(c => c.id === 'claim-pit-hyponatremia-correction-limit');
  assert.ok(siadhClaim, 'SIADH sodium correction limit claim must exist');
  assert.equal(siadhClaim.value, 10.0, 'Max safe correction must be 10 mmol/l/24h');

  const hypoClaim = pituitaryClaims.find(c => c.id === 'claim-pit-hypopituitarism-steroid-priority');
  assert.ok(hypoClaim, 'Hypopituitarism steroid priority claim must exist');
  assert.match(hypoClaim.statement, /hydrokortyzon.*(wyprzedzać|przed).*lewotyroksyn/i, 'Hydrocortisone before LT4 mandate');
});
