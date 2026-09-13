import test from 'node:test';
import assert from 'node:assert/strict';

import { adrenalLessons, adrenalExperiences, adrenalSources, adrenalClaims } from '../lib/endocrinology/nadnercza-content.ts';
import {
  validateObjectiveCoverage,
  getAllExperienceActivities,
  selectLessonMasteryTest,
  selectModuleMasteryAssessment,
  selectModuleQuickReview,
} from '../lib/assessment-coverage.ts';
import { LessonExperienceV2Schema } from '../lib/content/schemas/lesson-revision.ts';

test('Nadnercza module: 16 lessons satisfy schema and 100% objective coverage', () => {
  assert.equal(adrenalLessons.length, 16, 'Nadnercza must have 16 lessons');
  assert.equal(Object.keys(adrenalExperiences).length, 16, 'Nadnercza must have 16 experiences');

  for (const lesson of adrenalLessons) {
    const exp = adrenalExperiences[lesson.id];
    assert.ok(exp, `Experience must exist for lesson ${lesson.id}`);

    // 1. Zod Schema parse
    const parsed = LessonExperienceV2Schema.safeParse(exp);
    assert.ok(parsed.success, `Lesson ${lesson.id} failed schema: ` + JSON.stringify(parsed.error?.issues));

    // 2. Playbook Objective Coverage Gate
    const report = validateObjectiveCoverage(exp);
    assert.ok(report.isValid, `Lesson ${lesson.id} failed coverage report: ` + JSON.stringify(report.summary));
    assert.equal(report.summary.missingApplication, 0, `Lesson ${lesson.id} has missing application objectives`);
    assert.equal(report.summary.missingGeneration, 0, `Lesson ${lesson.id} has missing generation objectives`);
    assert.ok(report.summary.hasGenerationTransfer, `Lesson ${lesson.id} must have Generation transfer item`);
    assert.equal(report.summary.missingTransfer, 0, `Lesson ${lesson.id} has missing transfer objectives`);

    // 3. Multi-level assessment gate: every objective has >= 2 distinct activity types
    for (const [objId, detail] of Object.entries(report.objectives)) {
      assert.ok(detail.meetsContract, `Obj ${objId} in ${lesson.id} unmet: ${detail.missingRequirements.join(', ')}`);
      const distinctTypes = new Set(detail.activities.map(a => a.type));
      assert.ok(distinctTypes.size >= 2, `Obj ${objId} in ${lesson.id} must have >= 2 distinct activity types, got ${distinctTypes.size}`);
    }

    // 4. Assessment Bank verification
    assert.ok(Array.isArray(exp.assessmentBank), `Lesson ${lesson.id} must have assessmentBank`);
    assert.ok(exp.assessmentBank.length >= 2, `Lesson ${lesson.id} bank size must be >= 2, got ${exp.assessmentBank.length}`);

    // Bank items must have generation transfer and application transfer
    const hasGenTrans = exp.assessmentBank.some(a => (a.assessmentLevel === 'generation' || a.type === 'clinical_reasoning') && a.transfer);
    assert.ok(hasGenTrans, `Lesson ${lesson.id} bank must contain Generation Transfer item`);

    // 5. Test bank item selector
    const masteryTest = selectLessonMasteryTest(exp, { count: 3 });
    assert.equal(masteryTest.length, 3, `Should select 3 activities for mastery test in ${lesson.id}`);
  }
});

test('Nadnercza module: Full Module Mastery Assessment & Quick Review', () => {
  const masteryAssessment = selectModuleMasteryAssessment(adrenalExperiences);
  assert.equal(masteryAssessment.completeCoverage, true, 'Adrenal full module mastery must achieve complete coverage');
  assert.ok(masteryAssessment.items.length >= 16, 'Should select items covering all 16 lessons');
  assert.ok(masteryAssessment.coveredObjectiveCount >= 32, 'Must cover all objectives across the module');

  const quickReview = selectModuleQuickReview(adrenalExperiences, { count: 10 });
  assert.equal(quickReview.length, 10, 'Quick review should select exactly 10 items');
});

test('Nadnercza module: Source & Claim Provenance Integrity', () => {
  const sourceKeys = new Set(Object.keys(adrenalSources));

  for (const exp of Object.values(adrenalExperiences)) {
    for (const act of getAllExperienceActivities(exp, true)) {
      for (const sid of (act.sourceIds || [])) {
        assert.ok(sourceKeys.has(sid), `Activity ${act.id} references missing source ${sid}`);
      }
    }
  }

  for (const c of adrenalClaims) {
    for (const sid of c.sourceIds) {
      assert.ok(sourceKeys.has(sid), `Claim ${c.id} references missing source ${sid}`);
    }
  }

  // Verify all 17 claims are referenced across the module
  const referencedClaimIds = new Set();
  for (const exp of Object.values(adrenalExperiences)) {
    for (const act of getAllExperienceActivities(exp, true)) {
      for (const cid of (act.claimIds || [])) {
        referencedClaimIds.add(cid);
      }
    }
  }

  for (const c of adrenalClaims) {
    assert.ok(referencedClaimIds.has(c.id), `Adrenal claim ${c.id} must be referenced in module activities`);
  }
});

test('Nadnercza module: Clinical Safety & Nuance Assertions (Golden Cases)', () => {
  // 1. Primary Aldosteronism confirmatory testing exemption
  const paClaim = adrenalClaims.find(c => c.id === 'claim-adn-pa-confirmatory-exemption');
  assert.ok(paClaim, 'PA confirmatory exemption claim must exist');
  assert.match(paClaim.statement, /spontanicz/i, 'Must mention spontaneous hypokalemia');
  assert.match(paClaim.statement, /20 ng\/dl/i, 'Must mention PAC > 20 ng/dl threshold');

  // 2. Pheochromocytoma unopposed alpha-stimulation danger
  const pheoClaim = adrenalClaims.find(c => c.id === 'claim-adn-pheo-alpha-before-beta');
  assert.ok(pheoClaim, 'Pheo alpha before beta claim must exist');
  assert.match(pheoClaim.statement, /Przed podaniem beta-adrenolityku/i, 'Must mandate alpha before beta blockade');
  assert.match(pheoClaim.statement, /blokada receptorów alfa-1/i, 'Must mention alpha-1 receptor blockade');

  // 3. Adrenal crisis emergency protocol
  const crisisClaim = adrenalClaims.find(c => c.id === 'claim-adn-adrenal-crisis-emergency');
  assert.ok(crisisClaim, 'Adrenal crisis emergency claim must exist');
  assert.match(crisisClaim.statement, /100 mg/i, 'Must mandate 100 mg hydrocortisone');
  assert.match(crisisClaim.statement, /bez oczekiwania na wyniki/i, 'Must treat before laboratory confirmation');

  // 4. Morning cortisol thresholds in adrenal insufficiency
  const morningCortisolClaim = adrenalClaims.find(c => c.id === 'claim-adn-cortisol-morning-thresholds');
  assert.ok(morningCortisolClaim, 'Morning cortisol thresholds claim must exist');
  assert.match(morningCortisolClaim.statement, /3 µg\/dl/i, 'Must mention cut-off < 3 ug/dl');
  assert.match(morningCortisolClaim.statement, /18 µg\/dl/i, 'Must mention cut-off > 18 ug/dl');

  // 5. CAH 17-OHP screening thresholds
  const cahClaim = adrenalClaims.find(c => c.id === 'claim-adn-cah-17ohp-thresholds');
  assert.ok(cahClaim, 'CAH 17-OHP claim must exist');
  assert.match(cahClaim.statement, /200 ng\/dl/i, 'Must mention threshold 200 ng/dl');
  assert.match(cahClaim.statement, /1000 ng\/dl/i, 'Must mention threshold 1000 ng/dl');
});
