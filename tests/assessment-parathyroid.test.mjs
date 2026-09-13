import test from 'node:test';
import assert from 'node:assert/strict';

import {
  parathyroidLessons,
  parathyroidExperiences,
  parathyroidSources,
  parathyroidClaims,
} from '../lib/endocrinology/przytarczyce-content.ts';
import {
  validateObjectiveCoverage,
  getAllExperienceActivities,
  selectLessonMasteryTest,
  selectModuleMasteryAssessment,
  selectModuleQuickReview,
} from '../lib/assessment-coverage.ts';
import { LessonExperienceV2Schema } from '../lib/content/schemas/lesson-revision.ts';

test('Przytarczyce module: 16 lessons satisfy schema and 100% objective coverage', () => {
  assert.equal(parathyroidLessons.length, 16, 'Przytarczyce must have 16 lessons');
  assert.equal(Object.keys(parathyroidExperiences).length, 16, 'Przytarczyce must have 16 experiences');

  for (const lesson of parathyroidLessons) {
    const exp = parathyroidExperiences[lesson.id];
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

test('Przytarczyce module: Full Module Mastery Assessment & Quick Review', () => {
  const masteryAssessment = selectModuleMasteryAssessment(parathyroidExperiences);
  assert.equal(masteryAssessment.completeCoverage, true, 'Parathyroid full module mastery must achieve complete coverage');
  assert.ok(masteryAssessment.items.length >= 16, 'Should select items covering all 16 lessons');
  assert.ok(masteryAssessment.coveredObjectiveCount >= 32, 'Must cover all objectives across the module');

  const quickReview = selectModuleQuickReview(parathyroidExperiences, { count: 10 });
  assert.equal(quickReview.length, 10, 'Quick review should select exactly 10 items');
});

test('Przytarczyce module: Source & Claim Provenance Integrity', () => {
  const sourceKeys = new Set(Object.keys(parathyroidSources));

  for (const exp of Object.values(parathyroidExperiences)) {
    for (const act of getAllExperienceActivities(exp, true)) {
      for (const sid of (act.sourceIds || [])) {
        assert.ok(sourceKeys.has(sid), `Activity ${act.id} references missing source ${sid}`);
      }
    }
  }

  for (const c of parathyroidClaims) {
    for (const sid of c.sourceIds) {
      assert.ok(sourceKeys.has(sid), `Claim ${c.id} references missing source ${sid}`);
    }
  }

  // Verify all 14 claims are referenced across the module
  const referencedClaimIds = new Set();
  for (const exp of Object.values(parathyroidExperiences)) {
    for (const act of getAllExperienceActivities(exp, true)) {
      for (const cid of (act.claimIds || [])) {
        referencedClaimIds.add(cid);
      }
    }
  }

  for (const c of parathyroidClaims) {
    assert.ok(referencedClaimIds.has(c.id), `Parathyroid claim ${c.id} must be referenced in module activities`);
  }
});

test('Przytarczyce module: Clinical Safety & Nuance Assertions (Golden Cases)', () => {
  // 1. Payne formula
  const payneClaim = parathyroidClaims.find(c => c.id === 'claim-pt-payne-formula');
  assert.ok(payneClaim, 'Payne formula claim must exist');
  assert.match(payneClaim.statement, /Payne.*0,02.*40 - albumina/i, 'Must specify Payne formula in SI units');

  // 2. CCCR overlap zone
  const cccrClaim = parathyroidClaims.find(c => c.id === 'claim-pt-cccr-overlap-zone');
  assert.ok(cccrClaim, 'CCCR overlap zone claim must exist');
  assert.match(cccrClaim.statement, /0,010–0,020/i, 'Must define overlap zone 0,010–0,020');
  assert.match(cccrClaim.statement, /20% chorych z FHH/i, 'Must state 20% FHH overlap');

  // 3. FHH parathyroidectomy contraindication
  const fhhSurgClaim = parathyroidClaims.find(c => c.id === 'claim-pt-fhh-parathyroidectomy-ineffective');
  assert.ok(fhhSurgClaim, 'FHH parathyroidectomy contraindication claim must exist');
  assert.match(fhhSurgClaim.statement, /nieskuteczna/i, 'Must state surgery is ineffective in FHH');
  assert.match(fhhSurgClaim.statement, /błędem postępowania/i, 'Must mark as clinical error');

  // 4. ESE 2025 hypoparathyroidism targets
  const targetClaim = parathyroidClaims.find(c => c.id === 'claim-pt-hypopara-target-ca-2025');
  assert.ok(targetClaim, 'Hypoparathyroidism target claim must exist');
  assert.match(targetClaim.statement, /ESE 2025/i, 'Must cite ESE 2025 guidelines');
  assert.match(targetClaim.statement, /2,00–2,15 mmol\/l/i, 'Must define lower limit of normal target range');

  // 5. Hungry bone syndrome predictors
  const hbsClaim = parathyroidClaims.find(c => c.id === 'claim-pt-hungry-bone-predictors');
  assert.ok(hbsClaim, 'HBS predictors claim must exist');
  assert.match(hbsClaim.statement, /PTH.*> 5x GGN/i, 'Must specify PTH > 5x ULN');
  assert.match(hbsClaim.statement, /ALP.*> 300 U\/l/i, 'Must specify ALP > 300 U/l');

  // 6. Hypercalcemic crisis saline first
  const crisisClaim = parathyroidClaims.find(c => c.id === 'claim-pt-severe-hypercalcemia-saline-first');
  assert.ok(crisisClaim, 'Severe hypercalcemia saline first claim must exist');
  assert.match(crisisClaim.statement, /0,9% roztworem NaCl/i, 'Must mandate 0.9% NaCl saline');
  assert.match(crisisClaim.statement, /200–300 ml\/h/i, 'Must specify infusion rate');

  // 7. Teriparatide anabolic mechanism
  const teripClaim = parathyroidClaims.find(c => c.id === 'claim-pt-teriparatide-anabolic');
  assert.ok(teripClaim, 'Teriparatide anabolic claim must exist');
  assert.match(teripClaim.statement, /anaboliczny/i, 'Must describe anabolic action');
  assert.match(teripClaim.statement, /pulsacyjnie/i, 'Must distinguish pulsatile from continuous PTH');

  // 8. Cinacalcet CaSR mechanism
  const cinaClaim = parathyroidClaims.find(c => c.id === 'claim-pt-cinacalcet-mechanism');
  assert.ok(cinaClaim, 'Cinacalcet mechanism claim must exist');
  assert.match(cinaClaim.statement, /allosteryczny modulator/i, 'Must describe PAM mechanism');
});
