import test from 'node:test';
import assert from 'node:assert/strict';
import { loadCourseModuleFromContentSrcSync } from '../lib/content/authoring-loader.ts';
import {
  validateObjectiveCoverage,
  selectLessonMasteryAssessment,
  selectModuleMasteryAssessment,
  selectModuleQuickReview,
} from '../lib/assessment-coverage.ts';
import {
  calculateD2Occupancy,
  interpretMeasuredLithiumTdm,
  evaluateQtcRisk,
} from '../lib/psychiatry-pharmacokinetics-engine.ts';
import { evaluateHunterCriteria } from '../lib/psychiatry-engine.ts';

// ---------------------------------------------------------------------------
// 1. SCHEMA & CONTRACT PARITY
// ---------------------------------------------------------------------------
test('Assessment Migration: Schema, contract and manifest parity for psych-afektywne & psych-farmakologia', () => {
  const af = loadCourseModuleFromContentSrcSync('psych-afektywne');
  const ph = loadCourseModuleFromContentSrcSync('psych-farmakologia');

  assert.equal(af.lessons.length, 16, 'psych-afektywne must have exactly 16 canonical lessons');
  assert.equal(Object.keys(af.lessonExperiences).length, 16, 'psych-afektywne must have 16 canonical experiences');
  assert.ok(Object.keys(af.claims).length >= 15, 'psych-afektywne must have >= 15 canonical claims');
  assert.ok(Object.keys(af.sources).length >= 15, 'psych-afektywne must have >= 15 canonical sources');

  assert.equal(ph.lessons.length, 22, 'psych-farmakologia must have exactly 22 canonical lessons');
  assert.equal(Object.keys(ph.lessonExperiences).length, 22, 'psych-farmakologia must have 22 canonical experiences');
  assert.ok(Object.keys(ph.claims).length >= 20, 'psych-farmakologia must have >= 20 canonical claims');
  assert.ok(Object.keys(ph.sources).length >= 20, 'psych-farmakologia must have >= 20 canonical sources');

  // Check unique IDs across all lessons and activities
  const allActivityIds = new Set();
  const allLessonIds = new Set();

  for (const mod of [af, ph]) {
    for (const lesson of mod.lessons) {
      assert.ok(!allLessonIds.has(lesson.id), `Duplicate lesson ID: ${lesson.id}`);
      allLessonIds.add(lesson.id);

      const exp = mod.lessonExperiences[lesson.id];
      assert.ok(exp, `Missing experience for lesson ${lesson.id}`);
      assert.equal(exp.lessonId, lesson.id, `Mismatched experience lessonId for ${lesson.id}`);

      // Collect all activities
      const activities = [
        exp.diagnostic,
        ...exp.activities,
        exp.teachBack,
        ...exp.exitTicket,
        ...(exp.assessmentBank || []),
      ];

      for (const act of activities) {
        assert.ok(!allActivityIds.has(act.id), `Duplicate activity ID detected: ${act.id}`);
        allActivityIds.add(act.id);
        assert.ok(act.prompt.length > 10, `Activity ${act.id} has too short prompt`);
        assert.ok(act.explanation.length > 10, `Activity ${act.id} has too short explanation`);
        assert.ok(act.objectiveIds.length > 0, `Activity ${act.id} has no objectiveIds`);
        assert.ok(act.sourceIds.every(s => mod.sources[s]), `Activity ${act.id} has unresolved sourceId`);
        if (act.claimIds) {
          assert.ok(act.claimIds.every(c => mod.claims[c]), `Activity ${act.id} has unresolved claimId`);
        }
      }
    }
  }
});

// ---------------------------------------------------------------------------
// 2. OBJECTIVE COVERAGE MATRIX & ASSESSMENT BANK CONTRACT
// ---------------------------------------------------------------------------
test('Assessment Migration: 100% objective coverage with transfer & generation in assessmentBank', () => {
  const af = loadCourseModuleFromContentSrcSync('psych-afektywne');
  const ph = loadCourseModuleFromContentSrcSync('psych-farmakologia');

  for (const mod of [af, ph]) {
    for (const lesson of mod.lessons) {
      const exp = mod.lessonExperiences[lesson.id];
      const report = validateObjectiveCoverage(exp);

      assert.ok(
        report.isValid,
        `Lesson ${lesson.id} failed objective coverage contract: ${JSON.stringify(report.summary)}`
      );
      assert.ok(
        report.summary.hasGeneration,
        `Lesson ${lesson.id} must have Generation assessment`
      );
      assert.ok(
        report.summary.hasTransfer,
        `Lesson ${lesson.id} must have Transfer assessment`
      );
      assert.ok(
        report.summary.hasGenerationTransfer,
        `Lesson ${lesson.id} must have Generation Transfer assessment`
      );

      // Verify assessment bank contract
      assert.ok(
        exp.assessmentBank && exp.assessmentBank.length >= 2,
        `Lesson ${lesson.id} assessmentBank must contain at least 2 items`
      );

      const bankGeneration = exp.assessmentBank.filter(
        a => a.assessmentLevel === 'generation' || a.type === 'short_answer' || a.type === 'clinical_reasoning'
      );
      assert.ok(
        bankGeneration.length >= 1,
        `Lesson ${lesson.id} assessmentBank must have >= 1 Generation Transfer item`
      );

      for (const item of exp.assessmentBank) {
        assert.equal(item.transfer, true, `Bank item ${item.id} must have transfer: true`);
        assert.ok(
          item.assessmentLevel === 'application' || item.assessmentLevel === 'generation',
          `Bank item ${item.id} must have explicit assessmentLevel application or generation`
        );
      }
    }
  }
});

// ---------------------------------------------------------------------------
// 3. DOMAIN & WIDGET INVARIANTS (D2 Kapur, Hunter, Lithium TDM, Fridericia QTcF)
// ---------------------------------------------------------------------------
test('Domain Invariants: D2 occupancy, Hunter serotonin toxicity, Lithium TDM, Fridericia QTcF', () => {
  // 1. D2 Kapur Occupancy Invariants
  const halo2 = calculateD2Occupancy('haloperidol', 2);
  const halo4 = calculateD2Occupancy('haloperidol', 4);
  const halo10 = calculateD2Occupancy('haloperidol', 10);

  assert.ok(halo2.d2OccupancyPercent <= halo4.d2OccupancyPercent, 'D2 occupancy must be monotonic');
  assert.ok(halo4.d2OccupancyPercent <= halo10.d2OccupancyPercent, 'D2 occupancy must be monotonic');
  assert.ok(halo2.d2OccupancyPercent >= 0 && halo10.d2OccupancyPercent <= 100, 'D2 occupancy bounded [0, 100%]');
  assert.ok(!Number.isNaN(halo4.d2OccupancyPercent), 'D2 occupancy must not be NaN');

  const aripiprazole = calculateD2Occupancy('aripiprazole', 15);
  assert.equal(aripiprazole.pharmacologicClass, 'partial_agonist');
  assert.ok(aripiprazole.intrinsicActivityPercent > 0, 'Partial agonist must have positive intrinsic activity');

  // 2. Hunter Serotonin Toxicity Invariants
  // Exposure gating: no serotonergic agent -> cannot diagnose serotonin toxicity
  const noDrug = evaluateHunterCriteria(false, {
    spontaneousClonus: true,
    inducibleClonus: true,
    ocularClonus: true,
    agitation: true,
    diaphoresis: true,
    tremor: true,
    hyperreflexia: true,
    temperature: 39,
  });
  assert.equal(noDrug.meetsCriteria, false, 'Without serotonergic exposure, Hunter must return false');

  // Branch 1: Spontaneous clonus with exposure -> Serotonin Toxicity
  const branch1 = evaluateHunterCriteria(true, {
    spontaneousClonus: true,
  });
  assert.equal(branch1.meetsCriteria, true);
  assert.equal(branch1.branchNumber, 1);

  // 3. Lithium TDM Invariants
  // Próbka po 12h, stan stacjonarny -> Valid
  const validTdm = interpretMeasuredLithiumTdm({
    measuredConcentrationMmolL: 0.72,
    hoursSinceLastDose: 12,
    daysOnCurrentRegimen: 7,
    indication: 'maintenance',
  });
  assert.equal(validTdm.sampleStatus, 'valid');
  assert.equal(validTdm.therapeuticZone, 'optimal');

  // Próbka za wcześnie (np. 6h) -> Questionable timing (faza dystrybucji)
  const earlyTdm = interpretMeasuredLithiumTdm({
    measuredConcentrationMmolL: 1.1,
    hoursSinceLastDose: 6,
    daysOnCurrentRegimen: 7,
    indication: 'maintenance',
  });
  assert.equal(earlyTdm.sampleStatus, 'questionable_timing');

  // Toksyczność z interakcją NLPZ/tiazyd
  const toxicTdm = interpretMeasuredLithiumTdm({
    measuredConcentrationMmolL: 1.6,
    hoursSinceLastDose: 12,
    daysOnCurrentRegimen: 14,
    indication: 'maintenance',
    interactingMedications: ['nsaid', 'thiazide'],
    symptoms: ['ataxia', 'coarse_tremor'],
  });
  assert.equal(toxicTdm.therapeuticZone, 'toxic');
  assert.ok(toxicTdm.safetyAlert?.includes('ALARM BEZPIECZEŃSTWA'));

  // 4. Fridericia QTcF Invariants
  const normalQtc = evaluateQtcRisk({ rawQtMs: 400, heartRateBpm: 60, isFemale: false });
  assert.equal(normalQtc.calculatedQtcMs, 400); // 400 / (1.0)^(1/3) = 400
  assert.equal(normalQtc.riskCategory, 'normal');

  const criticalQtc = evaluateQtcRisk({
    rawQtMs: 510,
    heartRateBpm: 75,
    isFemale: true,
    potassiumMmolL: 3.1,
  });
  assert.ok(criticalQtc.calculatedQtcMs > 500);
  assert.equal(criticalQtc.riskCategory, 'critical');
});

// ---------------------------------------------------------------------------
// 4. CONTENT SAFETY & OVERCERTAINTY SCANNER
// ---------------------------------------------------------------------------
test('Content Safety: Scans all 38 canonical psychiatry lessons for forbidden overcertainty patterns', () => {
  const af = loadCourseModuleFromContentSrcSync('psych-afektywne');
  const ph = loadCourseModuleFromContentSrcSync('psych-farmakologia');
  const allContent = JSON.stringify(af) + '\n' + JSON.stringify(ph);

  const forbiddenPatterns = [
    { pattern: /potwierdza pierwotn/i, name: 'potwierdza pierwotne zaburzenie' },
    { pattern: /wyklucza wszystkie/i, name: 'wyklucza wszystkie' },
    { pattern: /patognomoniczn/i, name: 'patognomoniczny' },
    { pattern: /optymalne okno Kapura/i, name: 'optymalne okno Kapura' },
    { pattern: /zielone okno Kapura/i, name: 'zielone okno Kapura' },
    { pattern: /odtrutka w NMS/i, name: 'odtrutka w NMS' },
    { pattern: /antidotum.*NMS/i, name: 'antidotum w NMS' },
    { pattern: /BDNF\s*=\s*\d+/i, name: 'pseudo-matematyka BDNF' },
    { pattern: /diagnosis probability/i, name: 'diagnosis probability' },
    { pattern: /suicide risk %/i, name: 'suicide risk %' },
    { pattern: /ryzyko samobójcze\s*=\s*\d+%/i, name: 'liczbowy procent ryzyka samobójstwa' },
    { pattern: /złoty standard/i, name: 'złoty standard' },
  ];

  const violations = [];
  for (const item of forbiddenPatterns) {
    if (item.pattern.test(allContent)) {
      violations.push(`Forbidden phrase: ${item.name} matching ${item.pattern}`);
    }
  }

  assert.equal(violations.length, 0, `Overcertainty violations detected:\n${violations.join('\n')}`);
});

// ---------------------------------------------------------------------------
// 5. GOLDEN CLINICAL CASES VALIDATION
// ---------------------------------------------------------------------------
test('Golden Clinical Cases: Decision thresholds, safety gates, and rubric criticalErrors', () => {
  const af = loadCourseModuleFromContentSrcSync('psych-afektywne');
  const ph = loadCourseModuleFromContentSrcSync('psych-farmakologia');

  // Case 1: Mania vs Hypomania in psych-afektywne
  const maniaExp = af.lessonExperiences['mania-hipomania-spektrum'];
  const maniaBank1 = maniaExp.assessmentBank?.find(a => a.id === 'man-bank-1');
  assert.ok(maniaBank1, 'man-bank-1 must exist');
  assert.equal(maniaBank1.type, 'select_and_justify');
  assert.equal(maniaBank1.answer, 0); // hipomania (< 7 days, no psychosis, no hospitalization)

  // Case 2: Suicide risk C-SSRS intent in psych-afektywne
  const suicideExp = af.lessonExperiences['ocena-ryzyka-samobojczego-agresji'];
  const suicideBank1 = suicideExp.assessmentBank?.find(a => a.id === 'suicide-bank-1');
  assert.ok(suicideBank1, 'suicide-bank-1 must exist');
  assert.ok(suicideBank1.rationaleRubric?.contradictions?.some(c => c.severity === 'critical'));

  // Case 3: Hunter criteria in psych-farmakologia
  const hunterExp = ph.lessonExperiences['ostre-stany-toksyczne-zespol-serotoninowy'];
  const hunterBank1 = hunterExp.assessmentBank?.find(a => a.id === 'ss-bank-1');
  assert.ok(hunterBank1, 'ss-bank-1 must exist');
  assert.ok(hunterBank1.rationaleRubric?.contradictions?.some(c => c.severity === 'critical'));

  // Case 4: NMS CK elevation & rigidity in psych-farmakologia
  const nmsExp = ph.lessonExperiences['zlosliwy-zespol-neuroleptyczny-nms'];
  const nmsBank1 = nmsExp.assessmentBank?.find(a => a.id === 'nms-bank-1');
  assert.ok(nmsBank1, 'nms-bank-1 must exist');

  // Case 5: Clozapine ANC stop threshold in psych-farmakologia
  const clzExp = ph.lessonExperiences['lekoopornosc-i-klozapina'];
  const clzBank1 = clzExp.assessmentBank?.find(a => a.id === 'clz-bank-1');
  assert.ok(clzBank1, 'clz-bank-1 must exist');
  assert.ok(clzBank1.rationaleRubric?.contradictions?.some(c => c.severity === 'critical'));

  // Case 6: Lithium drug interactions (NSAID / thiazide)
  const lithiumExp = ph.lessonExperiences['normotymiki-lit-walproinian-lamotrygina'];
  const lithiumBank1 = lithiumExp.assessmentBank?.find(a => a.id === 'mood-bank-1');
  assert.ok(lithiumBank1, 'mood-bank-1 must exist');
  assert.ok(lithiumBank1.rationaleRubric?.contradictions?.some(c => c.severity === 'critical'));
});

// ---------------------------------------------------------------------------
// 6. MODULE MASTERY & SELECTION PARITY
// ---------------------------------------------------------------------------
test('Module Mastery Selectors: Complete coverage and balanced review', () => {
  const af = loadCourseModuleFromContentSrcSync('psych-afektywne');
  const ph = loadCourseModuleFromContentSrcSync('psych-farmakologia');

  // Test lesson mastery selection
  for (const exp of Object.values(af.lessonExperiences)) {
    const res = selectLessonMasteryAssessment(exp);
    assert.equal(res.completeCoverage, true, `Lesson mastery for ${exp.lessonId} must have complete coverage`);
    assert.ok(res.items.length >= exp.objectives.length);
  }

  // Test module mastery selection for psych-afektywne
  const afModuleRes = selectModuleMasteryAssessment(af.lessonExperiences);
  assert.equal(afModuleRes.completeCoverage, true);
  assert.ok(afModuleRes.items.length >= 16, 'Should select minimal set covering all objectives');
  assert.equal(afModuleRes.coveredObjectiveCount, 48, 'All 48 objectives must be covered in psych-afektywne');

  // Test module quick review for psych-farmakologia
  const phReview = selectModuleQuickReview(ph.lessonExperiences, { count: 10 });
  assert.equal(phReview.length, 10);
});
