import test from 'node:test';
import assert from 'node:assert/strict';
import { runGlobalAssessmentAudit, MIGRATED_MODULE_IDS } from '../scripts/audit-global-assessment.mjs';

test('Global Assessment Audit: Comprehensive 14-Module Contract Verification', () => {
  const audit = runGlobalAssessmentAudit();

  // 1. Module Inventory
  assert.equal(audit.summary.totalModules, 14, 'Course must consist of exactly 14 modules (10 endo + 4 psych)');
  assert.equal(audit.summary.migratedModulesCount, 6, 'Exactly 6 modules must be in MIGRATED state');
  assert.equal(audit.summary.pendingModulesCount, 8, 'Exactly 8 modules must be in PENDING_MIGRATION state');
  assert.equal(audit.courseStatus, 'IN_PROGRESS', 'Course status must be IN_PROGRESS until all 14 modules migrate');

  // 2. Migrated Modules: 100% Hard Contract Compliance
  assert.equal(audit.summary.allMigratedPass, true, 'All migrated modules must pass the hard contract with zero regressions');
  assert.equal(audit.summary.totalMigratedLessons, 99, 'Migrated modules must encompass exactly 99 lessons');
  assert.ok(audit.summary.totalBankItems >= 99 * 2, 'Migrated lessons must have high-density assessment banks');

  for (const m of audit.modules) {
    if (MIGRATED_MODULE_IDS.has(m.id)) {
      assert.equal(m.status, 'MIGRATED');
      assert.equal(m.hardContractPass, true, `Module ${m.id} must pass hard contract`);
      assert.equal(m.fullyCoveredLessons, m.lessonCount, `Module ${m.id} must have 100% covered lessons`);
      assert.equal(m.validExperiences, m.lessonCount, `Module ${m.id} must have valid experience for every lesson`);
      assert.equal(m.issues.length, 0, `Module ${m.id} must have 0 contract issues`);
      assert.equal(m.migrationDebt, null, `Migrated module ${m.id} must have null migration debt`);
    } else {
      assert.equal(m.status, 'PENDING_MIGRATION');
      assert.equal(m.hardContractPass, false, `Pending module ${m.id} cannot claim hard contract pass`);
      assert.ok(m.migrationDebt, `Pending module ${m.id} must report explicit migration debt metrics`);
      assert.ok(m.migrationDebt.missingBankItems > 0, `Pending module ${m.id} must quantify missing bank items`);
    }
  }
});
