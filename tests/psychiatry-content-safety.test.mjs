import test from 'node:test';
import assert from 'node:assert/strict';
import { psychiatryLessons } from '../lib/course-psychiatry.ts';
import { psychiatryCases } from '../lib/cases-psychiatry.ts';
import {
  calculateDrugState,
  evaluateHunterCriteria,
} from '../lib/psychiatry-engine.ts';
import {
  evaluateExtripLithiumGuidance,
} from '../lib/psychiatry/extrip-guidelines.ts';
import {
  evaluateQtcRisk,
} from '../lib/psychiatry-pharmacokinetics-engine.ts';

// ---------------------------------------------------------------------------
// 1. CONTENT SAFETY & OVERCERTAINTY SCANNER
// ---------------------------------------------------------------------------
test('Content Safety: Scans 38 lessons and 24 cases for forbidden overcertainty patterns', () => {
  const lessonsText = JSON.stringify(psychiatryLessons);
  const casesText = JSON.stringify(psychiatryCases);
  const allPsychContent = lessonsText + '\n' + casesText;

  const forbiddenPatterns = [
    { pattern: /potwierdza pierwotn/i, name: 'potwierdza pierwotne zaburzenie' },
    { pattern: /wyklucza wszystkie/i, name: 'wyklucza wszystkie' },
    { pattern: /patognomoniczn/i, name: 'patognomoniczny (niedopuszczalny w psychiatrii)' },
    { pattern: /próg 80% SERT/i, name: 'próg 80% SERT' },
    { pattern: /próg terapeutyczny.*80%/i, name: 'próg terapeutyczny 80%' },
    { pattern: /optymalne okno Kapura/i, name: 'optymalne okno Kapura' },
    { pattern: /zielone okno Kapura/i, name: 'zielone okno Kapura' },
    { pattern: /odtrutka w NMS/i, name: 'odtrutka w NMS' },
    { pattern: /antidotum.*NMS/i, name: 'antidotum w NMS' },
    { pattern: /cyproheptadyn.*(?:uniwersaln|pewn).*odtrutk/i, name: 'cyproheptadyna jako uniwersalna odtrutka' },
    { pattern: /serotonin syndrome niemal wyłącznie/i, name: 'serotonin syndrome niemal wyłącznie' },
    { pattern: /niemal wyłącznie po połączeniu/i, name: 'niemal wyłącznie po połączeniu' },
    { pattern: /BDNF\s*=\s*\d+/i, name: 'pseudo-matematyka BDNF' },
    { pattern: /diagnosis probability/i, name: 'diagnosis probability' },
    { pattern: /suicide risk %/i, name: 'suicide risk %' },
    { pattern: /ryzyko samobójcze\s*=\s*\d+%/i, name: 'liczbowy procent ryzyka samobójstwa' },
    { pattern: /złoty standard/i, name: 'złoty standard' },
    { pattern: /wykluczaj[ąa]\s+pierwotny\s+proces/i, name: 'wykluczają pierwotny proces (brak odporności na procesy wtórne)' },
    { pattern: /wspieraj[ąa]c\s+diagnoz[ęe]\s+pierwotnego/i, name: 'wspierając diagnozę pierwotnego (negative test fallacy)' },
    { pattern: /eliminuj[ąa]\s+typowe\s+maski\s+internistyczne/i, name: 'eliminują typowe maski internistyczne (overcertainty)' },
  ];

  const violations = [];
  for (const item of forbiddenPatterns) {
    if (item.pattern.test(allPsychContent)) {
      violations.push('Forbidden phrase detected: ' + item.name + ' matching ' + item.pattern);
    }
  }

  assert.equal(violations.length, 0, 'Znaleziono naruszenia nadmiernej pewności:\n' + violations.join('\n'));
});

// ---------------------------------------------------------------------------
// 2. MODEL ORIGIN TESTS: MODELLED, MEASURED, EXTRAPOLATED, DERIVED
// ---------------------------------------------------------------------------
test('Model Origin: calculateDrugState assigns explicit evidenceCategory tiers', () => {
  const mockPatient = {
    age: 35,
    gender: 'M',
    weightKg: 70,
    labPotassium: 4.2,
    labEgfr: 90,
    cyp2d6Phenotype: 'NM',
    cyp2c19Phenotype: 'NM',
    substanceUse: 'brak',
    adherenceReported: 'wysoka',
    currentPrescriptions: [],
  };

  // Haloperidol 4 mg (w zakresie badań PET Kapura) -> MODELLED
  const haloStandard = calculateDrugState(
    { drugId: 'haloperidol', doseMg: 4, frequency: '1x/d', durationWeeks: 4, adherenceEstimated: 1.0 },
    mockPatient
  );
  assert.equal(haloStandard.evidenceCategory, 'MODELLED · PET population fit');
  assert.ok(haloStandard.d2OccupancyPercent >= 65 && haloStandard.d2OccupancyPercent <= 80);

  // Haloperidol 35 mg (poza zakresem badań PET Kapura) -> EXTRAPOLATED
  const haloHigh = calculateDrugState(
    { drugId: 'haloperidol', doseMg: 35, frequency: '1x/d', durationWeeks: 4, adherenceEstimated: 1.0 },
    mockPatient
  );
  assert.equal(haloHigh.evidenceCategory, 'EXTRAPOLATED · PET population fit');
  assert.ok(haloHigh.d2Model?.outOfStudyRange === true);

  // Sertralina 50 mg -> MODELLED SERT population fit
  const sertraline = calculateDrugState(
    { drugId: 'sertraline', doseMg: 50, frequency: '1x/d', durationWeeks: 6, adherenceEstimated: 1.0 },
    mockPatient
  );
  assert.equal(sertraline.evidenceCategory, 'MODELLED · PET population fit');
  assert.ok(sertraline.sertOccupancyPercent >= 75);

  // Lit 750 mg -> MEASURED (TDM required)
  const lithium = calculateDrugState(
    { drugId: 'lithium', doseMg: 750, frequency: 'wieczorem', durationWeeks: 8, adherenceEstimated: 1.0 },
    mockPatient
  );
  assert.equal(lithium.evidenceCategory, 'MEASURED (TDM required)');
  assert.ok(lithium.estimatedCss.includes('Measured TDM required'));
});

test('Model Origin: QTcF is mathematically derived (DERIVED) via Fridericia formula', () => {
  const qtcResult = evaluateQtcRisk({ rawQtMs: 440, heartRateBpm: 60, isFemale: false });
  assert.equal(qtcResult.calculatedQtcMs, 440, 'Przy 60 bpm QTcF == QT');
  assert.equal(qtcResult.riskCategory, 'normal');

  const qtcTachy = evaluateQtcRisk({ rawQtMs: 360, heartRateBpm: 125, isFemale: false });
  assert.ok(qtcTachy.calculatedQtcMs > 450);
});

// ---------------------------------------------------------------------------
// 3. EXTRIP GUIDELINE DECISION SUPPORT TESTS
// ---------------------------------------------------------------------------
test('EXTRIP: Missing concentration is not treated as zero; unknown inputs block NOT_INDICATED', () => {
  // Test 1: Brak stężenia litu
  const missingLi = evaluateExtripLithiumGuidance({
    eGfr: 60,
    decreasedConsciousness: false,
    seizures: false,
    dangerousDysrhythmias: false,
    significantConfusion: false,
    projectedHoursToLessThan1MmolL: 20,
  });
  assert.equal(missingLi.recommendation, 'insufficient_information');
  assert.equal(missingLi.fullyEvaluated, false);
  assert.ok(missingLi.missingCriticalInputs.some(m => m.includes('Stężenie litu')));

  // Test 2: Brak przewidywanego czasu eliminacji (unknown criterion)
  const missingElim = evaluateExtripLithiumGuidance({
    lithiumConcentrationMmolL: 2.2,
    eGfr: 70,
    decreasedConsciousness: false,
    seizures: false,
    dangerousDysrhythmias: false,
    significantConfusion: false,
  });
  assert.equal(missingElim.recommendation, 'insufficient_information');
  assert.equal(missingElim.fullyEvaluated, false);
  assert.ok(missingElim.unknownCriteria.some(c => c.includes('Czas eliminacji')));

  // Test 3: Pełna ocena, brak kryteriów -> pewne NOT_INDICATED
  const allAssessedNegative = evaluateExtripLithiumGuidance({
    lithiumConcentrationMmolL: 1.1,
    eGfr: 85,
    decreasedConsciousness: false,
    seizures: false,
    dangerousDysrhythmias: false,
    significantConfusion: false,
    projectedHoursToLessThan1MmolL: 18,
  });
  assert.equal(allAssessedNegative.recommendation, 'NOT_INDICATED');
  assert.equal(allAssessedNegative.fullyEvaluated, true);
  assert.equal(allAssessedNegative.unknownCriteria.length, 0);

  // Test 4: Kryterium RECOMMENDED (Li > 4.0 i dysfunkcja nerek eGFR < 45)
  const recommendedRenal = evaluateExtripLithiumGuidance({
    lithiumConcentrationMmolL: 4.3,
    eGfr: 30,
    decreasedConsciousness: false,
    seizures: false,
    dangerousDysrhythmias: false,
  });
  assert.equal(recommendedRenal.recommendation, 'RECOMMENDED');
  assert.ok(recommendedRenal.criteriaMet.some(c => c.includes('>4,0 mmol/l przy upośledzonej funkcji nerek')));

  // Test 5: Kryterium SUGGESTED (Li > 5.0 przy wydolnych nerkach)
  const suggestedHighLi = evaluateExtripLithiumGuidance({
    lithiumConcentrationMmolL: 5.4,
    eGfr: 80,
    decreasedConsciousness: false,
    seizures: false,
    dangerousDysrhythmias: false,
    significantConfusion: false,
    projectedHoursToLessThan1MmolL: 24,
  });
  assert.equal(suggestedHighLi.recommendation, 'SUGGESTED');
  assert.ok(suggestedHighLi.criteriaMet.some(c => c.includes('>5,0 mmol/l')));
});

// ---------------------------------------------------------------------------
// 4. HUNTER VALIDATED DECISION RULE TESTS
// ---------------------------------------------------------------------------
test('Hunter: Tests all 5 branches, exposure gating, and hypertonia validation', () => {
  // Branch 1: Spontaniczny klonus + ekspozycja
  const b1 = evaluateHunterCriteria(true, { spontaneousClonus: true });
  assert.equal(b1.meetsCriteria, true);
  assert.equal(b1.branchNumber, 1);
  assert.ok(b1.conditionMet?.includes('Gałąź 1'));

  // Branch 2: Indukowany klonus + pobudzenie
  const b2 = evaluateHunterCriteria(true, { inducibleClonus: true, agitation: true });
  assert.equal(b2.meetsCriteria, true);
  assert.equal(b2.branchNumber, 2);

  // Branch 3: Klonus oczny + zlewne poty
  const b3 = evaluateHunterCriteria(true, { ocularClonus: true, diaphoresis: true });
  assert.equal(b3.meetsCriteria, true);
  assert.equal(b3.branchNumber, 3);

  // Branch 4: Drżenie + hiperrefleksja
  const b4 = evaluateHunterCriteria(true, { tremor: true, hyperreflexia: true });
  assert.equal(b4.meetsCriteria, true);
  assert.equal(b4.branchNumber, 4);

  // Branch 5: Hipertonia + gorączka (>38°C) + klonus
  const b5 = evaluateHunterCriteria(true, {
    hypertonia: true,
    temperature: 38.8,
    inducibleClonus: true,
  });
  assert.equal(b5.meetsCriteria, true);
  assert.equal(b5.branchNumber, 5);
  assert.equal(b5.severity, 'stan_zagrozenia_zycia');

  // Branch 5 fail: hypertonia undefined (niepotwierdzona) -> NIE spełnia gałęzi 5
  const b5MissingHypertonia = evaluateHunterCriteria(true, {
    hypertonia: undefined,
    temperature: 38.8,
    inducibleClonus: true,
  });
  assert.equal(b5MissingHypertonia.meetsCriteria, false);
  assert.ok(b5MissingHypertonia.missingInformation?.some(m => m.includes('hipertonii')));

  // Brak ekspozycji serotoninergicznej (false) -> reguła NIE jest spełniona
  const noExposure = evaluateHunterCriteria(false, { spontaneousClonus: true });
  assert.equal(noExposure.meetsCriteria, false);
  assert.equal(noExposure.severity, 'brak');
  assert.ok(noExposure.rationale.includes('Brak aktywnego leku'));

  // Nieznana ekspozycja ('unknown') -> meetsCriteria: false z ostrzeżeniem
  const unknownExposure = evaluateHunterCriteria('unknown', { spontaneousClonus: true });
  assert.equal(unknownExposure.meetsCriteria, false);
  assert.ok(unknownExposure.conditionMet?.includes('niepotwierdzona ekspozycja'));
});
