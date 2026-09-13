import fs from 'node:fs';
import path from 'node:path';
import { modulesList as endoMods, lessonExperiences as endoExps, lessons as allEndoLessons } from '../lib/course.ts';
import { psychiatryModulesList as psychMods, psychiatryLessons } from '../lib/course-psychiatry.ts';
import { buildAllPsychiatryExperiences } from '../lib/psychiatry/experiences/index.ts';
import { LessonExperienceV2Schema } from '../lib/content/schemas/lesson-revision.ts';
import { validateObjectiveCoverage, getAllExperienceActivities, inferAssessmentLevel } from '../lib/assessment-coverage.ts';
import { validateExperienceSemanticQA } from '../lib/assessment-semantic-validator.ts';

const REPO_ROOT = process.cwd();

export const CANONICAL_MIGRATED_MODULES = [
  'tarczyca',
  'przysadka',
  'psych-afektywne',
  'psych-farmakologia',
  'psych-organiczne',
  'psych-trauma-dysocjacja',
];

export const MIGRATED_MODULE_IDS = new Set(CANONICAL_MIGRATED_MODULES);

function getModuleContentSrcDir(moduleId, domain) {
  const base = domain === 'psychiatry' ? 'content-src/psychiatry' : 'content-src/endocrinology';
  const dir = path.join(REPO_ROOT, base, moduleId);
  if (fs.existsSync(dir)) return dir;
  const legacyDir = path.join(REPO_ROOT, 'content-src', moduleId);
  return fs.existsSync(legacyDir) ? legacyDir : null;
}

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
  let totalSemanticQAErrors = 0;

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

    const modDir = getModuleContentSrcDir(mod.id, mod.domain);
    let availableSourceIds = new Set();
    let availableClaimIds = new Set();
    const definedClaims = new Set();
    const referencedClaimIds = new Set();
    const referencedSourceIds = new Set();

    if (modDir) {
      const sourcesFile = path.join(modDir, 'sources.json');
      if (fs.existsSync(sourcesFile)) {
        try {
          const sData = JSON.parse(fs.readFileSync(sourcesFile, 'utf8'));
          availableSourceIds = new Set(Object.keys(sData));
        } catch { /* ignore */ }
      }
      const claimsFile = path.join(modDir, 'claims.json');
      if (fs.existsSync(claimsFile)) {
        try {
          const cData = JSON.parse(fs.readFileSync(claimsFile, 'utf8'));
          cData.forEach(c => {
            availableClaimIds.add(c.id);
            definedClaims.add(c.id);
            (c.sourceIds || []).forEach(sid => referencedSourceIds.add(sid));
          });
        } catch { /* ignore */ }
      }
    }

    let validExperiences = 0;
    let bankCount = 0;
    let fullyCoveredLessons = 0;
    let modSemanticErrors = 0;
    let recognitionOnlySafetyObjectives = 0;
    const issues = [];
    const semanticIssues = [];
    const seenActivityIdsInModule = new Set();
    const duplicateActivityIds = [];
    const promptsSeen = new Map();
    const duplicatePrompts = [];

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

      // Coverage contract
      const cov = validateObjectiveCoverage(exp);
      if (cov.isValid) {
        fullyCoveredLessons++;
      } else if (isMigrated) {
        issues.push(`Naruszenie kontraktu w ${l.id}: ${cov.validationIssues?.join(', ') || 'niepełne pokrycie'}`);
      }

      // Semantic QA
      const qa = validateExperienceSemanticQA(exp, {
        availableSourceIds: availableSourceIds.size > 0 ? availableSourceIds : undefined,
        availableClaimIds: availableClaimIds.size > 0 ? availableClaimIds : undefined,
      });
      if (!qa.isValid) {
        modSemanticErrors += qa.issues.length;
        totalSemanticQAErrors += qa.issues.length;
        semanticIssues.push(...qa.issues.map(iss => `[${l.id}] ${iss}`));
      }

      // Collect activities for module-wide checks
      const allActs = getAllExperienceActivities(exp, true);
      for (const a of allActs) {
        if (seenActivityIdsInModule.has(a.id)) {
          duplicateActivityIds.push(a.id);
        }
        seenActivityIdsInModule.add(a.id);

        if (a.sourceIds) a.sourceIds.forEach(sid => referencedSourceIds.add(sid));
        if (a.claimIds) a.claimIds.forEach(cid => referencedClaimIds.add(cid));

        // Duplicate prompt check
        if (a.prompt && a.prompt.trim().length > 10) {
          const normPrompt = a.prompt.trim().toLowerCase().replace(/\s+/g, ' ');
          if (promptsSeen.has(normPrompt)) {
            duplicatePrompts.push({ prompt: a.prompt.slice(0, 40), firstId: promptsSeen.get(normPrompt), secondId: a.id });
          } else {
            promptsSeen.set(normPrompt, a.id);
          }
        }
      }

      // Quality: Check for recognition-only safety/decision objectives
      for (const obj of exp.objectives) {
        if (['safety', 'decision'].includes(obj.kind)) {
          const matching = allActs.filter(a => a.objectiveIds.includes(obj.id));
          const hasAppOrGen = matching.some(a => inferAssessmentLevel(a) === 'application' || a.assessmentLevel === 'generation' || a.type === 'short_answer');
          if (!hasAppOrGen) {
            recognitionOnlySafetyObjectives++;
          }
        }
      }
    }

    // Provenance debt
    const unresolvedSources = Array.from(referencedSourceIds).filter(s => availableSourceIds.size > 0 && !availableSourceIds.has(s));
    const unresolvedClaims = Array.from(referencedClaimIds).filter(c => availableClaimIds.size > 0 && !availableClaimIds.has(c));
    const orphanClaims = Array.from(definedClaims).filter(c => !referencedClaimIds.has(c));

    const hardContractPass = isMigrated
      ? (validExperiences === lessons.length &&
         fullyCoveredLessons === lessons.length &&
         modSemanticErrors === 0 &&
         duplicateActivityIds.length === 0 &&
         issues.length === 0)
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
      semanticQAIssuesCount: modSemanticErrors,
      duplicateActivityIdsCount: duplicateActivityIds.length,
      unresolvedSourcesCount: unresolvedSources.length,
      unresolvedClaimsCount: unresolvedClaims.length,
      orphanClaimsCount: orphanClaims.length,
      recognitionOnlySafetyObjectives,
      issues,
      semanticIssues: semanticIssues.slice(0, 5),
      migrationDebt: !isMigrated ? {
        missingBankItems: Math.max(0, lessons.length * 2 - bankCount),
        missingCoveredLessons: lessons.length - fullyCoveredLessons,
        recognitionOnlySafetyObjectives,
        unmigratedReason: 'Brak ustrukturyzowanych banków transferowych i doświadczeń V2',
      } : null,
    });
  }

  const migratedModules = results.filter(r => r.status === 'MIGRATED');
  const pendingModules = results.filter(r => r.status === 'PENDING_MIGRATION');
  const allMigratedPass = migratedModules.length > 0 && migratedModules.every(m => m.hardContractPass);

  return {
    courseStatus: migratedModules.length === allModules.length ? 'COMPLETED' : 'IN_PROGRESS',
    summary: {
      totalModules: allModules.length,
      migratedModulesCount: migratedModules.length,
      pendingModulesCount: pendingModules.length,
      totalLessons,
      totalMigratedLessons,
      totalBankItems,
      totalSemanticQAErrors,
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
    console.log('\n=================================================================================================================');
    console.log('                          GLOBAL ASSESSMENT CONTRACT AUDIT REPORT (14 MODULES)                                   ');
    console.log('=================================================================================================================\n');
    console.log(`Status kursu: ${audit.courseStatus} (${audit.summary.migratedModulesCount}/${audit.summary.totalModules} modułów zmigrowanych)`);
    console.log(`Zmigrowane lekcje z pełnym kontraktem: ${audit.summary.totalMigratedLessons} lekcji (${audit.summary.totalBankItems} zadań w bankach)`);
    console.log(`Błędy semantyczne QA w zmigrowanych: ${audit.summary.totalSemanticQAErrors}\n`);

    console.log('| Moduł                      | Dziedzina     | Status   | Lekcje | Bank | Pokrycie | QA Err | Kontrakt |');
    console.log('|----------------------------|---------------|----------|--------|------|----------|--------|----------|');
    for (const m of audit.modules) {
      const idPad = m.id.padEnd(26, ' ');
      const domPad = m.domain.padEnd(13, ' ');
      const statPad = m.status.padEnd(8, ' ');
      const lCount = String(m.lessonCount).padStart(6, ' ');
      const bCount = String(m.bankItemsCount).padStart(4, ' ');
      const cov = `${m.fullyCoveredLessons}/${m.lessonCount}`.padStart(8, ' ');
      const qaErr = String(m.semanticQAIssuesCount).padStart(6, ' ');
      const hard = m.hardContractPass ? '  PASS  ' : (m.status === 'MIGRATED' ? '  FAIL  ' : '  DEBT  ');
      console.log(`| ${idPad} | ${domPad} | ${statPad} | ${lCount} | ${bCount} | ${cov} | ${qaErr} | ${hard} |`);
    }
    console.log('-----------------------------------------------------------------------------------------------------------------\n');

    if (audit.summary.allMigratedPass) {
      console.log(`✓ WSZYSTKIE ZMIGROWANE MODUŁY (${audit.summary.migratedModulesCount}/${audit.summary.migratedModulesCount}, ${audit.summary.totalMigratedLessons} lekcji) SPEŁNIAJĄ W 100% HARD CONTRACT.`);
    } else {
      console.error('✖ WYKRYTO REGRESJĘ W ZMIGROWANYCH MODUŁACH!');
      process.exit(1);
    }
  }
}
