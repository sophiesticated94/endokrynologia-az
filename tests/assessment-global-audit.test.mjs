import test from 'node:test';
import assert from 'node:assert/strict';
import {
  runGlobalAssessmentAudit,
  auditModule,
  MIGRATED_MODULE_IDS,
  CANONICAL_MIGRATED_MODULES,
} from '../scripts/audit-global-assessment.mjs';
import { validateObjectiveCoverage } from '../lib/assessment-coverage.ts';

function createBaseSyntheticExperience(overrides = {}) {
  return {
    experienceVersion: 2,
    lessonId: 'synth-l1',
    objectives: [
      { id: 'obj-safe', statement: 'Bezpieczne dawkowanie leku u osób starszych', kind: 'safety' },
      { id: 'obj-dec', statement: 'Wybór leku z uwzględnieniem interakcji', kind: 'decision' },
    ],
    diagnostic: {
      id: 'synth-diag',
      type: 'single_choice',
      prompt: 'Jakie jest bezpieczne dawkowanie leku u pacjenta w podeszłym wieku?',
      assessmentLevel: 'recognition',
      objectiveIds: ['obj-safe'],
      claimIds: ['claim-1'],
      sourceIds: ['src-1'],
      options: [
        'Zredukować dawkę początkową o 50% i monitorować klirens',
        'Podać dawkę nasycającą podwójną',
        'Zrezygnować z monitorowania nerek',
      ],
      answer: 0,
      explanation: 'Redukcja dawki chroni przed kumulacją toksyczną u osób starszych.',
      difficulty: 'student',
      reasoning: 'safety',
    },
    blocks: [
      {
        id: 'synth-b1',
        title: 'Podstawy farmakoterapii',
        text: 'Tekst edukacyjny omawiający redukcję dawki u pacjentów geriatrycznych.',
        sourceIds: ['src-1'],
      },
    ],
    activities: [
      {
        id: 'act-safe-app',
        type: 'single_choice',
        prompt: 'Wskaż zalecany schemat modyfikacji dawkowania przy obniżonym eGFR.',
        assessmentLevel: 'application',
        transfer: true,
        objectiveIds: ['obj-safe', 'obj-dec'],
        claimIds: ['claim-1'],
        sourceIds: ['src-1'],
        options: [
          'Zmniejszenie dawki o 50% z wydłużeniem odstępu dawkowania',
          'Utrzymanie standardowej dawki bez wydłużenia odstępu',
          'Zwiększenie częstości podawania leku',
        ],
        answer: 0,
        explanation: 'Wydłużenie odstępu lub redukcja dawki zapobiega toksyczności.',
        difficulty: 'student',
        reasoning: 'safety',
      },
    ],
    teachBack: {
      id: 'synth-teach',
      type: 'recall',
      prompt: 'Wyjaśnij mechanizm toksyczności leku u osób z niewydolnością nerek.',
      modelAnswer: 'Obniżony klirens nerkowy prowadzi do kumulacji metabolitów i neurotoksyczności.',
      explanation: 'Uzasadnienie mechanistyczne klirensu i metabolizmu.',
      difficulty: 'both',
      reasoning: 'safety',
      sourceIds: ['src-1'],
      claimIds: ['claim-1'],
      objectiveIds: ['obj-safe'],
      assessmentLevel: 'generation',
    },
    exitTicket: [
      {
        id: 'synth-exit-1',
        type: 'missing_information',
        prompt: 'Który lek pierwszego wyboru należy wdrożyć w przypadku powikłań?',
        assessmentLevel: 'application',
        transfer: true,
        objectiveIds: ['obj-dec'],
        claimIds: ['claim-1'],
        sourceIds: ['src-1'],
        options: [
          'Lek o wysokim profilu bezpieczeństwa i braku interakcji cytochromowych',
          'Silny inhibitor CYP3A4 o wąskim indeksie terapeutycznym',
        ],
        answer: 0,
        explanation: 'Unikanie interakcji z CYP3A4 minimalizuje ryzyko powikłań.',
        difficulty: 'doctor',
        reasoning: 'decision',
      },
    ],
    assessmentBank: [
      {
        id: 'synth-bank-1',
        type: 'single_choice',
        prompt: 'Bank: Pacjent 82-letni z eGFR 30 ml/min wymaga korekty dawki.',
        assessmentLevel: 'application',
        transfer: true,
        objectiveIds: ['obj-safe'],
        claimIds: ['claim-1'],
        sourceIds: ['src-1'],
        options: [
          'Zmniejszyć dawkę i oznaczyć stężenie kreatyniny po 48h',
          'Zwiększyć dawkę dobową',
        ],
        answer: 0,
        explanation: 'Monitorowanie biochemiczne jest niezbędne.',
        difficulty: 'student',
        reasoning: 'safety',
      },
      {
        id: 'synth-bank-2',
        type: 'single_choice',
        prompt: 'Bank: Jakie postępowanie transferowe wdrożyć przy nagłym splątaniu?',
        assessmentLevel: 'generation',
        transfer: true,
        objectiveIds: ['obj-dec'],
        claimIds: ['claim-1'],
        sourceIds: ['src-1'],
        options: [
          'Pilne odstawienie leku nefrotoksycznego i diagnostyka delirium',
          'Dodanie kolejnego leku sedatywnego',
        ],
        answer: 0,
        explanation: 'Delirium wywołane toksycznością wymaga natychmiastowego odstawienia sprawczego leku.',
        difficulty: 'doctor',
        reasoning: 'decision',
      },
    ],
    widgetIds: ['lab-workbench'],
    review: {
      status: 'source-checked',
      checkedAt: '2026-09-12',
      scope: 'Standard',
    },
    ...overrides,
  };
}

const BASE_SYNTH_MOD = { id: 'synth-mod', name: 'Moduł Syntetyczny', domain: 'psychiatry' };
const BASE_LESSONS = [{ id: 'synth-l1', moduleId: 'synth-mod', title: 'Lekcja 1' }];
const BASE_SOURCES = { 'src-1': { id: 'src-1', title: 'Źródło 1' } };
const BASE_CLAIMS = [{ id: 'claim-1', text: 'Twierdzenie 1', sourceIds: ['src-1'] }];

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
      assert.equal(m.status, 'PENDING_MIGRATION');
      assert.equal(m.hardContractPass, false, `Pending module ${m.id} cannot claim hard contract pass`);
      assert.ok(m.migrationDebt, `Pending module ${m.id} must report explicit migration debt`);
      assert.ok(typeof m.migrationDebt.missingBankItems === 'number', `Pending module ${m.id} must quantify missing bank items`);
      assert.ok(typeof m.migrationDebt.missingCoveredLessons === 'number', `Pending module ${m.id} must quantify uncovered lessons`);
      assert.ok(m.migrationDebt.unmigratedReason, `Pending module ${m.id} must document why it is pending migration`);
    }
  }
});

test('Global Assessment Audit: Synthetic Module Baseline PASS and CLEAN', () => {
  const exp = createBaseSyntheticExperience();
  const res = auditModule({
    mod: BASE_SYNTH_MOD,
    lessons: BASE_LESSONS,
    getExp: () => exp,
    isMigrated: true,
    sources: BASE_SOURCES,
    claims: BASE_CLAIMS,
  });

  assert.equal(res.hardContractPass, true);
  assert.equal(res.contractStatus, 'PASS');
  assert.equal(res.qualityStatus, 'CLEAN');
  assert.equal(res.hardErrors.length, 0);
  assert.equal(res.semanticQAIssuesCount, 0);
  assert.equal(res.unresolvedSourcesCount, 0);
  assert.equal(res.unresolvedClaimsCount, 0);
  assert.equal(res.duplicateActivityIdsCount, 0);
});

test('Global Assessment Audit Hard Gate: Unresolved Source causes FAIL', () => {
  const exp = createBaseSyntheticExperience();
  exp.diagnostic.sourceIds = ['non-existent-source-999'];

  const res = auditModule({
    mod: BASE_SYNTH_MOD,
    lessons: BASE_LESSONS,
    getExp: () => exp,
    isMigrated: true,
    sources: BASE_SOURCES,
    claims: BASE_CLAIMS,
  });

  assert.equal(res.hardContractPass, false);
  assert.equal(res.contractStatus, 'FAIL');
  assert.equal(res.unresolvedSourcesCount, 1);
  assert.ok(res.hardErrors.some(e => e.includes('Nierozwiązane sourceIds')));
});

test('Global Assessment Audit Hard Gate: Unresolved Claim causes FAIL', () => {
  const exp = createBaseSyntheticExperience();
  exp.diagnostic.claimIds = ['non-existent-claim-999'];

  const res = auditModule({
    mod: BASE_SYNTH_MOD,
    lessons: BASE_LESSONS,
    getExp: () => exp,
    isMigrated: true,
    sources: BASE_SOURCES,
    claims: BASE_CLAIMS,
  });

  assert.equal(res.hardContractPass, false);
  assert.equal(res.contractStatus, 'FAIL');
  assert.equal(res.unresolvedClaimsCount, 1);
  assert.ok(res.hardErrors.some(e => e.includes('Nierozwiązane claimIds')));
});

test('Global Assessment Audit Hard Gate: Duplicate Activity ID causes FAIL', () => {
  const exp = createBaseSyntheticExperience();
  exp.assessmentBank[0].id = exp.activities[0].id;

  const res = auditModule({
    mod: BASE_SYNTH_MOD,
    lessons: BASE_LESSONS,
    getExp: () => exp,
    isMigrated: true,
    sources: BASE_SOURCES,
    claims: BASE_CLAIMS,
  });

  assert.equal(res.hardContractPass, false);
  assert.equal(res.contractStatus, 'FAIL');
  assert.equal(res.duplicateActivityIdsCount, 1);
  assert.ok(res.hardErrors.some(e => e.includes('Zduplikowane ID aktywności')));
});

test('Global Assessment Audit Hard Gate: Semantic QA Answer-Key Error causes FAIL', () => {
  const exp = createBaseSyntheticExperience();
  exp.diagnostic.answer = 99; // Invalid option index

  const res = auditModule({
    mod: BASE_SYNTH_MOD,
    lessons: BASE_LESSONS,
    getExp: () => exp,
    isMigrated: true,
    sources: BASE_SOURCES,
    claims: BASE_CLAIMS,
  });

  assert.equal(res.hardContractPass, false);
  assert.equal(res.contractStatus, 'FAIL');
  assert.ok(res.semanticQAIssuesCount >= 1);
  assert.ok(res.hardErrors.some(e => e.includes('Błąd semantyczny QA')));
});

test('Global Assessment Audit Hard Gate: Recognition-only Safety Objective causes FAIL', () => {
  const exp = createBaseSyntheticExperience();
  // Remove safety objective from all application/generation activities
  exp.teachBack.objectiveIds = ['obj-dec'];
  exp.activities[0].objectiveIds = ['obj-dec'];
  exp.assessmentBank[0].objectiveIds = ['obj-dec'];
  // Now obj-safe is only covered by synth-diag which is recognition level

  const res = auditModule({
    mod: BASE_SYNTH_MOD,
    lessons: BASE_LESSONS,
    getExp: () => exp,
    isMigrated: true,
    sources: BASE_SOURCES,
    claims: BASE_CLAIMS,
  });

  assert.equal(res.hardContractPass, false);
  assert.equal(res.contractStatus, 'FAIL');
  assert.ok(res.recognitionOnlySafetyObjectives >= 1);
  assert.ok(res.hardErrors.some(e => e.includes('wyłącznie zadania na poziomie Recognition')));
});

test('Global Assessment Audit Hard Gate: Module Mastery Incomplete causes FAIL', () => {
  // 2 lessons, but lesson 2 has uncovered requirements
  const lessons = [
    { id: 'synth-l1', moduleId: 'synth-mod', title: 'Lekcja 1' },
    { id: 'synth-l2', moduleId: 'synth-mod', title: 'Lekcja 2' },
  ];
  const exp1 = createBaseSyntheticExperience();
  const exp2 = {
    ...createBaseSyntheticExperience(),
    lessonId: 'synth-l2',
    objectives: [
      { id: 'obj-uncovered', description: 'Niepokryty cel w lekcji 2', kind: 'knowledge' },
    ],
    activities: [], // No activities covering obj-uncovered!
    assessmentBank: [],
  };

  const res = auditModule({
    mod: BASE_SYNTH_MOD,
    lessons,
    getExp: (id) => (id === 'synth-l1' ? exp1 : exp2),
    isMigrated: true,
    sources: BASE_SOURCES,
    claims: BASE_CLAIMS,
  });

  assert.equal(res.hardContractPass, false);
  assert.equal(res.contractStatus, 'FAIL');
  assert.equal(res.moduleMasteryPass, false);
  assert.ok(res.hardErrors.some(e => e.includes('Naruszenie kontraktu') || e.includes('Niepełne pokrycie module mastery')));
});

test('Global Assessment Audit Warning: Near-Duplicate Prompt generates WARNING but maintains hardContractPass: true', () => {
  const exp = createBaseSyntheticExperience();
  // Duplicate prompt text between activity and bank item
  exp.assessmentBank[1].prompt = exp.activities[0].prompt;

  const res = auditModule({
    mod: BASE_SYNTH_MOD,
    lessons: BASE_LESSONS,
    getExp: () => exp,
    isMigrated: true,
    sources: BASE_SOURCES,
    claims: BASE_CLAIMS,
  });

  assert.equal(res.hardContractPass, true, 'Hard contract must still pass when only a prompt similarity warning is present');
  assert.equal(res.contractStatus, 'PASS');
  assert.equal(res.qualityStatus, 'WARNINGS');
  assert.ok(res.warnings.some(w => w.includes('Możliwy zduplikowany prompt')));
  assert.equal(res.hardErrors.length, 0);
});

test('Global Assessment Audit Debt Accounting: Pending Migration Module reports PENDING and Debt without breaking audit', () => {
  const exp = {
    lessonId: 'synth-l1',
    moduleId: 'synth-mod',
    version: 2,
    objectives: [{ id: 'obj-1', description: 'Cel 1', kind: 'knowledge' }],
    activities: [],
    assessmentBank: [],
  };

  const res = auditModule({
    mod: BASE_SYNTH_MOD,
    lessons: BASE_LESSONS,
    getExp: () => exp,
    isMigrated: false, // Pending module
    sources: BASE_SOURCES,
    claims: BASE_CLAIMS,
  });

  assert.equal(res.status, 'PENDING_MIGRATION');
  assert.equal(res.contractStatus, 'PENDING');
  assert.equal(res.hardContractPass, false);
  assert.ok(res.migrationDebt, 'Pending module must report migration debt');
  assert.equal(res.migrationDebt.missingBankItems, 2); // 1 lesson * 2 - 0 bank items
  assert.equal(res.migrationDebt.missingCoveredLessons, 1);
  assert.ok(res.migrationDebt.unmigratedReason);
});

