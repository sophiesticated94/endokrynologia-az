import fs from 'node:fs';
import path from 'node:path';
import { modulesList as endoMods, lessonExperiences as endoExps, lessons as allEndoLessons } from '../lib/course.ts';
import { psychiatryModulesList as psychMods, psychiatryLessons } from '../lib/course-psychiatry.ts';
import { buildAllPsychiatryExperiences } from '../lib/psychiatry/experiences/index.ts';
import { LessonExperienceV2Schema } from '../lib/content/schemas/lesson-revision.ts';
import {
  validateObjectiveCoverage,
  getAllExperienceActivities,
  inferAssessmentLevel,
  isActivityGeneration,
  isActivityTransfer,
  selectModuleMasteryAssessment,
} from '../lib/assessment-coverage.ts';
import { validateExperienceSemanticQA } from '../lib/assessment-semantic-validator.ts';

const REPO_ROOT = process.cwd();

export const CANONICAL_MIGRATED_MODULES = [
  'tarczyca',
  'przysadka',
  'nadnercza',
  'przytarczyce',
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

export function auditModule({
  mod,
  lessons,
  getExp,
  isMigrated = false,
  modDir = null,
  sources = null,
  claims = null,
}) {
  let availableSourceIds = new Set();
  let availableClaimIds = new Set();
  const definedClaims = new Set();
  const referencedClaimIds = new Set();
  const referencedSourceIds = new Set();

  if (sources) {
    availableSourceIds = new Set(Object.keys(sources));
  } else if (modDir) {
    const sourcesFile = path.join(modDir, 'sources.json');
    if (fs.existsSync(sourcesFile)) {
      try {
        const sData = JSON.parse(fs.readFileSync(sourcesFile, 'utf8'));
        availableSourceIds = new Set(Object.keys(sData));
      } catch { /* ignore */ }
    }
  }

  if (claims) {
    claims.forEach(c => {
      availableClaimIds.add(c.id);
      definedClaims.add(c.id);
      (c.sourceIds || []).forEach(sid => referencedSourceIds.add(sid));
    });
  } else if (modDir) {
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
  let modSemanticWarnings = 0;
  let recognitionOnlySafetyObjectives = 0;
  let recognitionOnlyDecisionObjectives = 0;
  let modTotalObjectives = 0;
  let modCoveredObjectives = 0;
  let modAppObjectives = 0;
  let modGenObjectives = 0;
  let modTransObjectives = 0;
  let modGenTransCount = 0;

  const hardErrors = [];
  const allWarnings = [];
  const semanticIssues = [];
  const seenActivityIdsInModule = new Set();
  const duplicateActivityIds = [];
  const promptsSeen = new Map();
  const duplicatePrompts = [];
  const moduleExperiencesMap = {};

  for (const l of lessons) {
    const exp = getExp(l.id);
    if (!exp) {
      hardErrors.push(`Brak experience dla lekcji ${l.id}`);
      continue;
    }

    moduleExperiencesMap[l.id] = exp;

    // Check schema
    const parseRes = LessonExperienceV2Schema.safeParse(exp);
    if (!parseRes.success) {
      hardErrors.push(`Błąd schemy w ${l.id}: ${parseRes.error.issues[0]?.message}`);
    } else {
      validExperiences++;
    }

    if (exp.assessmentBank && exp.assessmentBank.length > 0) {
      bankCount += exp.assessmentBank.length;
    }

    // Coverage contract
    const cov = validateObjectiveCoverage(exp);
    modTotalObjectives += cov.summary.totalObjectives;
    modCoveredObjectives += cov.summary.coveredObjectives;
    if (cov.summary.hasGenerationTransfer) modGenTransCount++;
    if (cov.isValid) {
      fullyCoveredLessons++;
    } else if (isMigrated) {
      hardErrors.push(`Naruszenie kontraktu w ${l.id}: ${cov.validationIssues?.join(', ') || 'niepełne pokrycie celów'}`);
    }

    // Semantic QA
    const qa = validateExperienceSemanticQA(exp, {
      availableSourceIds: availableSourceIds.size > 0 ? availableSourceIds : undefined,
      availableClaimIds: availableClaimIds.size > 0 ? availableClaimIds : undefined,
    });
    if (!qa.isValid) {
      modSemanticErrors += qa.hardErrors.length;
      semanticIssues.push(...qa.hardErrors.map(iss => `[${l.id}] ${iss}`));
      if (isMigrated) {
        hardErrors.push(...qa.hardErrors.map(iss => `[${l.id}] Błąd semantyczny QA: ${iss}`));
      }
    }
    if (qa.warnings && qa.warnings.length > 0) {
      modSemanticWarnings += qa.warnings.length;
      allWarnings.push(...qa.warnings.map(w => `[${l.id}] ${w}`));
    }

    // Collect activities for module-wide checks
    const allActs = getAllExperienceActivities(exp, true);
    for (const a of allActs) {
      if (seenActivityIdsInModule.has(a.id)) {
        duplicateActivityIds.push(a.id);
        if (isMigrated) {
          hardErrors.push(`Zduplikowane ID aktywności w module: "${a.id}"`);
        }
      }
      seenActivityIdsInModule.add(a.id);

      if (a.sourceIds) a.sourceIds.forEach(sid => referencedSourceIds.add(sid));
      if (a.claimIds) a.claimIds.forEach(cid => referencedClaimIds.add(cid));

      // Duplicate prompt check
      if (a.prompt && a.prompt.trim().length > 10) {
        const normPrompt = a.prompt.trim().toLowerCase().replace(/\s+/g, ' ');
        if (promptsSeen.has(normPrompt)) {
          duplicatePrompts.push({ prompt: a.prompt.slice(0, 40), firstId: promptsSeen.get(normPrompt), secondId: a.id });
          allWarnings.push(`Możliwy zduplikowany prompt w aktywności "${a.id}" (taki sam jak w "${promptsSeen.get(normPrompt)}")`);
        } else {
          promptsSeen.set(normPrompt, a.id);
        }
      }
    }

    // Quality: Check for recognition-only safety/decision objectives
    for (const obj of exp.objectives || []) {
      const matching = allActs.filter(a => a.objectiveIds && a.objectiveIds.includes(obj.id));
      const hasAppOrGen = matching.some(a => inferAssessmentLevel(a) === 'application' || a.assessmentLevel === 'generation' || a.type === 'short_answer' || a.type === 'clinical_reasoning');
      if (hasAppOrGen) {
        modAppObjectives++;
        if (matching.some(isActivityGeneration)) modGenObjectives++;
      }
      if (matching.some(isActivityTransfer)) modTransObjectives++;

      if (obj.kind === 'safety' && !hasAppOrGen) {
        recognitionOnlySafetyObjectives++;
        if (isMigrated) hardErrors.push(`Cel bezpieczeństwa "${obj.id}" posiada wyłącznie zadania na poziomie Recognition.`);
      }
      if (obj.kind === 'decision' && !hasAppOrGen) {
        recognitionOnlyDecisionObjectives++;
        if (isMigrated) hardErrors.push(`Cel decyzyjny "${obj.id}" posiada wyłącznie zadania na poziomie Recognition.`);
      }
    }
  }

  // Provenance debt
  const unresolvedSources = Array.from(referencedSourceIds).filter(s => availableSourceIds.size > 0 && !availableSourceIds.has(s));
  const unresolvedClaims = Array.from(referencedClaimIds).filter(c => availableClaimIds.size > 0 && !availableClaimIds.has(c));
  const orphanClaims = Array.from(definedClaims).filter(c => !referencedClaimIds.has(c));

  if (isMigrated && unresolvedSources.length > 0) {
    hardErrors.push(`Nierozwiązane sourceIds w module: [${unresolvedSources.join(', ')}]`);
  }
  if (isMigrated && unresolvedClaims.length > 0) {
    hardErrors.push(`Nierozwiązane claimIds w module: [${unresolvedClaims.join(', ')}]`);
  }
  if (orphanClaims.length > 0) {
    allWarnings.push(`Nieużywane claims w module: [${orphanClaims.join(', ')}]`);
  }

  // Module mastery check
  let moduleMasteryPass = false;
  let moduleMasteryDetails = null;
  if (isMigrated && Object.keys(moduleExperiencesMap).length === lessons.length && lessons.length > 0) {
    moduleMasteryDetails = selectModuleMasteryAssessment(moduleExperiencesMap);
    moduleMasteryPass = moduleMasteryDetails.completeCoverage;
    if (!moduleMasteryPass) {
      hardErrors.push(`Niepełne pokrycie module mastery: niepokryte tematy=[${moduleMasteryDetails.uncoveredTopics.join(', ')}], niepokryte cele=[${moduleMasteryDetails.uncoveredObjectiveIds.join(', ')}]`);
    }
  }

  // Hard Gate: All conditions must hold for migrated module
  const hardContractPass = isMigrated
    ? (validExperiences === lessons.length &&
       fullyCoveredLessons === lessons.length &&
       modSemanticErrors === 0 &&
       duplicateActivityIds.length === 0 &&
       unresolvedSources.length === 0 &&
       unresolvedClaims.length === 0 &&
       recognitionOnlySafetyObjectives === 0 &&
       recognitionOnlyDecisionObjectives === 0 &&
       moduleMasteryPass &&
       hardErrors.length === 0)
    : false;

  const contractStatus = isMigrated ? (hardContractPass ? 'PASS' : 'FAIL') : 'PENDING';
  const qualityStatus = (allWarnings.length === 0) ? 'CLEAN' : 'WARNINGS';

  return {
    id: mod.id,
    name: mod.name,
    domain: mod.domain,
    status: isMigrated ? 'MIGRATED' : 'PENDING_MIGRATION',
    migrationStatus: isMigrated ? 'MIGRATED' : 'PENDING_MIGRATION',
    contractStatus,
    qualityStatus,
    lessonCount: lessons.length,
    validExperiences,
    fullyCoveredLessons,
    bankItemsCount: bankCount,
    hardContractPass,
    moduleMasteryPass,
    semanticQAIssuesCount: modSemanticErrors,
    semanticQAWarningsCount: modSemanticWarnings,
    duplicateActivityIdsCount: duplicateActivityIds.length,
    unresolvedSourcesCount: unresolvedSources.length,
    unresolvedClaimsCount: unresolvedClaims.length,
    orphanClaimsCount: orphanClaims.length,
    recognitionOnlySafetyObjectives,
    recognitionOnlyDecisionObjectives,
    hardErrors,
    warnings: allWarnings.slice(0, 10),
    coverage: {
      totalObjectives: modTotalObjectives,
      coveredObjectives: modCoveredObjectives,
      application: modAppObjectives,
      generation: modGenObjectives,
      transfer: modTransObjectives,
      generationTransfer: modGenTransCount,
    },
    semanticQA: {
      answerKeyErrors: modSemanticErrors,
      lowPlausibilityDistractors: modSemanticWarnings,
    },
    provenance: {
      unresolvedSources,
      unresolvedClaims,
      orphanClaims,
    },
    mastery: {
      lessonMasteryPass: fullyCoveredLessons === lessons.length,
      moduleMasteryPass,
      uncoveredRequirements: moduleMasteryDetails?.uncoveredRequirements || [],
    },
    issues: hardErrors,
    semanticIssues: semanticIssues.slice(0, 5),
    migrationDebt: !isMigrated ? {
      missingBankItems: Math.max(0, lessons.length * 2 - bankCount),
      missingCoveredLessons: lessons.length - fullyCoveredLessons,
      recognitionOnlySafetyObjectives,
      unmigratedReason: 'Brak ustrukturyzowanych banków transferowych i doświadczeń V2',
    } : null,
  };
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
  let totalSemanticQAWarnings = 0;

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
    const modResult = auditModule({
      mod,
      lessons,
      getExp,
      isMigrated,
      modDir,
    });

    totalBankItems += modResult.bankItemsCount;
    totalSemanticQAErrors += modResult.semanticQAIssuesCount;
    totalSemanticQAWarnings += modResult.semanticQAWarningsCount;
    results.push(modResult);
  }

  const migratedModules = results.filter(r => r.status === 'MIGRATED');
  const pendingModules = results.filter(r => r.status === 'PENDING_MIGRATION');
  const allMigratedPass = migratedModules.length > 0 && migratedModules.every(m => m.hardContractPass);

  return {
    courseStatus: (migratedModules.length === allModules.length && allMigratedPass) ? 'ASSESSMENT_MIGRATION_COMPLETE' : 'IN_PROGRESS',
    summary: {
      totalModules: allModules.length,
      migratedModulesCount: migratedModules.length,
      pendingModulesCount: pendingModules.length,
      totalLessons,
      totalMigratedLessons,
      totalBankItems,
      totalSemanticQAErrors,
      totalSemanticQAWarnings,
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
    console.log('\n========================================================================================================================');
    console.log('                                GLOBAL ASSESSMENT CONTRACT AUDIT REPORT (14 MODULES)                                    ');
    console.log('========================================================================================================================\n');
    console.log(`Status kursu: ${audit.courseStatus} (${audit.summary.migratedModulesCount}/${audit.summary.totalModules} modułów zmigrowanych)`);
    console.log(`Zmigrowane lekcje z pełnym kontraktem: ${audit.summary.totalMigratedLessons} lekcji (${audit.summary.totalBankItems} zadań w bankach)`);
    console.log(`Błędy semantyczne QA w zmigrowanych: ${audit.summary.totalSemanticQAErrors} (ostrzeżenia distractorów: ${audit.summary.totalSemanticQAWarnings})\n`);

    console.log('| Moduł                      | Dziedzina     | Status   | Lekcje | Bank | Pokrycie | QA Err | Kontrakt | Jakość   |');
    console.log('|----------------------------|---------------|----------|--------|------|----------|--------|----------|----------|');
    for (const m of audit.modules) {
      const idPad = m.id.padEnd(26, ' ');
      const domPad = m.domain.padEnd(13, ' ');
      const statPad = m.status.padEnd(8, ' ');
      const lCount = String(m.lessonCount).padStart(6, ' ');
      const bCount = String(m.bankItemsCount).padStart(4, ' ');
      const cov = `${m.fullyCoveredLessons}/${m.lessonCount}`.padStart(8, ' ');
      const qaErr = String(m.semanticQAIssuesCount).padStart(6, ' ');
      const hard = m.hardContractPass ? '  PASS  ' : (m.status === 'MIGRATED' ? '  FAIL  ' : '  DEBT  ');
      const qual = m.qualityStatus === 'CLEAN' ? '  CLEAN ' : ' WARNING';
      console.log(`| ${idPad} | ${domPad} | ${statPad} | ${lCount} | ${bCount} | ${cov} | ${qaErr} | ${hard} | ${qual} |`);
    }
    console.log('------------------------------------------------------------------------------------------------------------------------\n');

    if (audit.summary.allMigratedPass) {
      console.log(`✓ WSZYSTKIE ZMIGROWANE MODUŁY (${audit.summary.migratedModulesCount}/${audit.summary.migratedModulesCount}, ${audit.summary.totalMigratedLessons} lekcji) SPEŁNIAJĄ W 100% HARD CONTRACT.`);
    } else {
      console.error('✖ WYKRYTO REGRESJĘ W ZMIGROWANYCH MODUŁACH!');
      process.exit(1);
    }
  }
}
