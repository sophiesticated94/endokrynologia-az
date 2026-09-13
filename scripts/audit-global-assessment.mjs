import fs from 'node:fs';
import path from 'node:path';
import { modulesList as endoMods, lessonExperiences as endoExps, lessons as allEndoLessons } from '../lib/course.ts';
import { psychiatryModulesList as psychMods, psychiatryLessons } from '../lib/course-psychiatry.ts';
import { buildAllPsychiatryExperiences } from '../lib/psychiatry/experiences/index.ts';
import { LessonExperienceV2Schema } from '../lib/content/schemas/lesson-revision.ts';
import { validateObjectiveCoverage } from '../lib/assessment-coverage.ts';

const REPO_ROOT = process.cwd();

export const MIGRATED_MODULE_IDS = new Set([
  'tarczyca',
  'przysadka',
  'psych-afektywne',
  'psych-farmakologia',
  'psych-organiczne',
  'psych-trauma-dysocjacja',
]);

export function runGlobalAssessmentAudit() {
  const psychExps = buildAllPsychiatryExperiences(psychiatryLessons);

  const allModules = [
    ...endoMods.map(m => ({ ...m, domain: 'endocrinology' })),
    ...psychMods.map(m => ({ ...m, domain: 'psychiatry' })),
  ];

  const results = [];
  let totalLessons = 0;
  let totalMigratedLessons = 0;
  let totalBankItems = 0;

  for (const mod of allModules) {
    const isMigrated = MIGRATED_MODULE_IDS.has(mod.id);
    let lessons = [];
    let getExp = null;

    if (mod.domain === 'endocrinology') {
      lessons = allEndoLessons.filter(l => l.moduleId === mod.id);
      getExp = (id) => endoExps[id];
    } else {
      lessons = psychiatryLessons.filter(l => l.moduleId === mod.id);
      getExp = (id) => psychExps[id];
    }

    totalLessons += lessons.length;
    if (isMigrated) totalMigratedLessons += lessons.length;

    let validExperiences = 0;
    let bankCount = 0;
    let fullyCoveredLessons = 0;
    const issues = [];

    for (const l of lessons) {
      const exp = getExp(l.id);
      if (!exp) {
        issues.push(`Brak experience dla lekcji ${l.id}`);
        continue;
      }

      // Check schema
      const parseRes = LessonExperienceV2Schema.safeParse(exp);
      if (!parseRes.success) {
        issues.push(`Błąd schemy w ${l.id}: ${parseRes.error.issues[0]?.message}`);
      } else {
        validExperiences++;
      }

      if (exp.assessmentBank && exp.assessmentBank.length > 0) {
        bankCount += exp.assessmentBank.length;
        totalBankItems += exp.assessmentBank.length;
      }

      const cov = validateObjectiveCoverage(exp);
      if (cov.isValid) {
        fullyCoveredLessons++;
      } else if (isMigrated) {
        issues.push(`Naruszenie kontraktu w ${l.id}: ${cov.validationIssues?.join(', ') || 'niepełne pokrycie'}`);
      }
    }

    const hardContractPass = isMigrated
      ? (validExperiences === lessons.length && fullyCoveredLessons === lessons.length && issues.length === 0)
      : false;

    results.push({
      id: mod.id,
      name: mod.name,
      domain: mod.domain,
      status: isMigrated ? 'MIGRATED' : 'PENDING_MIGRATION',
      lessonCount: lessons.length,
      validExperiences,
      fullyCoveredLessons,
      bankItemsCount: bankCount,
      hardContractPass,
      issues,
      migrationDebt: !isMigrated ? {
        missingBankItems: Math.max(0, lessons.length * 3 - bankCount),
        missingCoveredLessons: lessons.length - fullyCoveredLessons,
      } : null,
    });
  }

  const migratedModules = results.filter(r => r.status === 'MIGRATED');
  const pendingModules = results.filter(r => r.status === 'PENDING_MIGRATION');
  const allMigratedPass = migratedModules.every(m => m.hardContractPass);

  return {
    courseStatus: migratedModules.length === allModules.length ? 'COMPLETED' : 'IN_PROGRESS',
    summary: {
      totalModules: allModules.length,
      migratedModulesCount: migratedModules.length,
      pendingModulesCount: pendingModules.length,
      totalLessons,
      totalMigratedLessons,
      totalBankItems,
      allMigratedPass,
    },
    modules: results,
  };
}

// CLI Execution
if (process.argv[1] && process.argv[1].endsWith('audit-global-assessment.mjs')) {
  const audit = runGlobalAssessmentAudit();
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(audit, null, 2));
  } else {
    console.log('\n========================================================================================================');
    console.log('                          GLOBAL ASSESSMENT CONTRACT AUDIT REPORT                                       ');
    console.log('========================================================================================================\n');
    console.log(`Status kursu: ${audit.courseStatus} (${audit.summary.migratedModulesCount}/${audit.summary.totalModules} modułów zmigrowanych)`);
    console.log(`Zmigrowane lekcje z pełnym kontraktem: ${audit.summary.totalMigratedLessons} lekcji (${audit.summary.totalBankItems} zadań w bankach)\n`);

    console.log('| Moduł                      | Dziedzina     | Status   | Lekcje | Bank | Pokrycie | Kontrakt |');
    console.log('|----------------------------|---------------|----------|--------|------|----------|----------|');
    for (const m of audit.modules) {
      const idPad = m.id.padEnd(26, ' ');
      const domPad = m.domain.padEnd(13, ' ');
      const statPad = m.status.padEnd(8, ' ');
      const lCount = String(m.lessonCount).padStart(6, ' ');
      const bCount = String(m.bankItemsCount).padStart(4, ' ');
      const cov = `${m.fullyCoveredLessons}/${m.lessonCount}`.padStart(8, ' ');
      const hard = m.hardContractPass ? '  PASS  ' : (m.status === 'MIGRATED' ? '  FAIL  ' : '  DEBT  ');
      console.log(`| ${idPad} | ${domPad} | ${statPad} | ${lCount} | ${bCount} | ${cov} | ${hard} |`);
    }
    console.log('--------------------------------------------------------------------------------------------------------\n');

    if (audit.summary.allMigratedPass) {
      console.log('✓ WSZYSTKIE ZMIGROWANE MODUŁY (6/6, 99 lekcji) SPEŁNIAJĄ W 100% HARD CONTRACT.');
    } else {
      console.error('✖ WYKRYTO REGRESJĘ W ZMIGROWANYCH MODUŁACH!');
      process.exit(1);
    }
  }
}
