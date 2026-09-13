import test from 'node:test';
import assert from 'node:assert/strict';
import { runGlobalAssessmentAudit, MIGRATED_MODULE_IDS, CANONICAL_MIGRATED_MODULES } from '../scripts/audit-global-assessment.mjs';

test('Global Assessment Audit: Dynamic 14-Module Contract & Quality Verification', () => {
  const audit = runGlobalAssessmentAudit();

  // 1. Dynamic Module Inventory
  const expectedMigratedCount = CANONICAL_MIGRATED_MODULES.length;
  const expectedPendingCount = audit.summary.totalModules - expectedMigratedCount;

  assert.ok(audit.summary.totalModules >= 14, 'Course must encompass all curricular modules');
  assert.equal(audit.summary.migratedModulesCount, expectedMigratedCount, 'Migrated module count must match canonical registry');
  assert.equal(audit.summary.pendingModulesCount, expectedPendingCount, 'Pending modules must represent the remaining course curriculum');
  assert.equal(audit.courseStatus, expectedPendingCount === 0 ? 'COMPLETED' : 'IN_PROGRESS');

  // 2. Global Quality and Semantic QA Invariants
  assert.equal(audit.summary.allMigratedPass, true, 'All migrated modules must pass the hard contract with zero regressions');
  assert.equal(audit.summary.totalSemanticQAErrors, 0, 'Zero semantic QA errors allowed in any migrated module');
  assert.ok(audit.summary.totalBankItems >= audit.summary.totalMigratedLessons * 2, 'Migrated lessons must maintain high-density transfer banks');

  // 3. Detailed Per-Module Invariants
  for (const m of audit.modules) {
    if (MIGRATED_MODULE_IDS.has(m.id)) {
      // Migrated Module Contract Verification
      assert.equal(m.status, 'MIGRATED');
      assert.equal(m.hardContractPass, true, `Module ${m.id} must pass hard contract`);
      assert.equal(m.fullyCoveredLessons, m.lessonCount, `Module ${m.id} must achieve 100% objective coverage across all lessons`);
      assert.equal(m.validExperiences, m.lessonCount, `Module ${m.id} must have schema-valid experiences for all lessons`);
      assert.equal(m.semanticQAIssuesCount, 0, `Module ${m.id} must have zero semantic QA errors`);
      assert.equal(m.duplicateActivityIdsCount, 0, `Module ${m.id} must not have duplicate activity IDs`);
      assert.equal(m.unresolvedSourcesCount, 0, `Module ${m.id} must not have unresolved source IDs`);
      assert.equal(m.unresolvedClaimsCount, 0, `Module ${m.id} must not have unresolved claim IDs`);
      assert.equal(m.issues.length, 0, `Module ${m.id} must have zero contract issues`);
      assert.equal(m.migrationDebt, null, `Migrated module ${m.id} must have null migration debt`);
    } else {
      // Pending Module Debt Accounting
      assert.equal(m.status, 'PENDING_MIGRATION');
      assert.equal(m.hardContractPass, false, `Pending module ${m.id} cannot claim hard contract pass`);
      assert.ok(m.migrationDebt, `Pending module ${m.id} must report explicit migration debt`);
      assert.ok(typeof m.migrationDebt.missingBankItems === 'number', `Pending module ${m.id} must quantify missing bank items`);
      assert.ok(typeof m.migrationDebt.missingCoveredLessons === 'number', `Pending module ${m.id} must quantify uncovered lessons`);
      assert.ok(m.migrationDebt.unmigratedReason, `Pending module ${m.id} must document why it is pending migration`);
    }
  }
});
