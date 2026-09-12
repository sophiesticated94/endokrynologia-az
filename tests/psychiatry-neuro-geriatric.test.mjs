import test from 'node:test';
import assert from 'node:assert/strict';
import { psychiatryLessons, psychiatryQuestions, psychiatryModulesList } from '../lib/course-psychiatry.ts';
import { psychiatryCases } from '../lib/cases-psychiatry.ts';
import { psychiatrySources } from '../lib/course-psychiatry-sources.ts';
import {
  evaluate4AT,
  evaluateAnticholinergicBurden,
  evaluateBeersCriteria,
  evaluateBpsdEtiology,
  evaluateNeurocognitiveClock,
  evaluateCapacityDomains,
} from '../lib/psychiatry/engines/neurocognitive-engine.ts';
import {
  psychiatryLessonExperiences,
  PSYCHIATRY_LESSON_ENHANCEMENTS,
  ALL_PSYCHIATRY_PRESETS,
  PATIENT_THREADS,
} from '../lib/psychiatry/index.ts';
import { PSYCHIATRY_EVIDENCE_REGISTRY } from '../lib/psychiatry/evidence/model-limitations.ts';

// ---------------------------------------------------------------------------
// 1. MODUŁ 03: STRUKTURA PROGRAMOWA I DOKŁADNOŚĆ DYDAKTYCZNA
// ---------------------------------------------------------------------------
test('Moduł 03: 13 lekcji psychiatrii organicznej, neurokognitywnej i wieku podeszłego', () => {
  const organicLessons = psychiatryLessons.filter(l => l.moduleId === 'psych-organiczne');
  assert.equal(organicLessons.length, 13, 'Moduł 03 musi zawierać dokładnie 13 lekcji');

  const expectedLessonIds = [
    'delirium-rozpoznanie-i-dynamika',
    'delirium-vs-otepienie-vs-depresja',
    'diagnostyka-ostrego-zaburzenia-swiadomosci',
    'zaburzenia-poznawcze-mci-a-otepienie',
    'choroba-alzheimera-wzorzec-i-progresja',
    'otepienie-naczyniowe-i-mieszane',
    'otepienie-z-cialami-lewyego-i-parkinson',
    'otepienie-czolowo-skroniowe-bvftd',
    'szybko-postepujace-zespoly-otepienne',
    'psychiatryczne-manifestacje-chorob-somatycznych',
    'bpsd-objawy-behawioralne-i-psychologiczne',
    'psychofarmakologia-wieku-podeszlego',
    'depresja-wieku-podeszlego-i-poznanie',
    'zdolnosc-decyzyjna-capacity-i-safeguarding',
  ];

  for (const lesson of organicLessons) {
    assert.equal(lesson.questions.length, 5, `Lekcja ${lesson.id} musi mieć 5 pytań`);
    assert.ok(lesson.sections.length >= 3, `Lekcja ${lesson.id} musi mieć >=3 sekcje`);
    assert.ok(lesson.goals.length >= 2, `Lekcja ${lesson.id} musi mieć >=2 cele`);
    assert.ok(lesson.advanced.length > 80, `Lekcja ${lesson.id} musi mieć wyczerpujący blok advanced`);
    assert.ok(lesson.table.rows.length >= 2, `Lekcja ${lesson.id} musi mieć tabelę porównawczą`);
    assert.ok(
      lesson.sourceIds.every(sId => psychiatrySources[sId]),
      `Lekcja ${lesson.id} odwołuje się do nieistniejącego źródła`,
    );
  }
});

// ---------------------------------------------------------------------------
// 2. V2 ACTIVE LEARNING I INTEGRACJA ENHANCEMENTS W MODULE 03
// ---------------------------------------------------------------------------
test('Moduł 03: Pełna struktura V2 i Evidence Inspector dla wszystkich 13 lekcji', () => {
  const organicLessons = psychiatryLessons.filter(l => l.moduleId === 'psych-organiczne');

  for (const lesson of organicLessons) {
    const exp = psychiatryLessonExperiences[lesson.id];
    assert.ok(exp, `Brak LessonExperienceV2 dla ${lesson.id}`);
    assert.equal(exp.experienceVersion, 2);
    assert.ok(exp.objectives.length >= 2);
    assert.equal(exp.blocks.length, lesson.sections.length);
    assert.equal(exp.activities.length, 2);
    assert.equal(exp.exitTicket.length, 2);

    const enh = PSYCHIATRY_LESSON_ENHANCEMENTS[lesson.id];
    assert.ok(enh, `Brak enhancement dla ${lesson.id}`);
    assert.ok(enh.whatChangesYourMind, `Brak whatChangesYourMind dla ${lesson.id}`);
    assert.ok(enh.whatChangesYourMind.knownFacts.length > 0);
    assert.ok(enh.whatChangesYourMind.unknownFactors.length > 0);
    assert.ok(enh.whatChangesYourMind.criticalDifferentiatingFactor.length > 15);

    // Sprawdź poprawność zarejestrowanych dowodów
    for (const act of [...exp.activities, ...exp.exitTicket]) {
      for (const sId of act.sourceIds) {
        assert.ok(psychiatrySources[sId], `Nieznane źródło ${sId} w lekcji ${lesson.id}`);
      }
    }
  }
});

// ---------------------------------------------------------------------------
// 3. SILNIK NEUROKOGNITYWNY: 4AT, ACB, BEERS, BPSD, ZEGAR, CAPACITY
// ---------------------------------------------------------------------------
test('Neurocognitive Engine: 4AT Bedside Screening Tool (Bellelli 2014)', () => {
  // 1. Pacjent bez majaczenia (0 pkt)
  const res0 = evaluate4AT({ alertness: 0, amt4: 0, attention: 0, acuteChange: 0 });
  assert.equal(res0.score, 0);
  assert.equal(res0.category, 'unlikely');

  // 2. Możliwe zaburzenia poznawcze bez cech ostrych (2 pkt)
  const resCog = evaluate4AT({ alertness: 0, amt4: 1, attention: 1, acuteChange: 0 });
  assert.equal(resCog.score, 2);
  assert.equal(resCog.category, 'possible_cognitive_impairment');

  // 3. Jawne majaczenie pooperacyjne Jana (12 pkt)
  const resDelirium = evaluate4AT({ alertness: 4, amt4: 2, attention: 2, acuteChange: 4 });
  assert.equal(resDelirium.score, 12);
  assert.equal(resDelirium.category, 'possible_delirium');
  assert.equal(resDelirium.evidenceId, 'evidence-4at-performance');
  assert.ok(resDelirium.limitations.length >= 2);
});

test('Neurocognitive Engine: Anticholinergic Cognitive Burden (ACB)', () => {
  // Test kumulacji: Hydroksyzyna (3) + Diazepam (1) + Tramadol (1) = 5 (High)
  const acb = evaluateAnticholinergicBurden(['hydroksyzyna', 'diazepam', 'tramadol']);
  assert.equal(acb.totalScore, 5);
  assert.equal(acb.burdenCategory, 'high');
  assert.equal(acb.contributingDrugs.length, 3);
  assert.ok(acb.affectedDomains.length >= 4);

  // Test leków bezpiecznych / bez ACB
  const acbLow = evaluateAnticholinergicBurden(['donepezil', 'paracetamol']);
  assert.equal(acbLow.totalScore, 0);
  assert.equal(acbLow.burdenCategory, 'low');
  assert.equal(acbLow.unclassifiedDrugs.length, 2);
});

test('Neurocognitive Engine: Beers 2023 Criteria Decision-Support', () => {
  // Pacjent młody (<65) -> kryteria Beers nieaktywne
  const young = evaluateBeersCriteria(45, ['diazepam', 'hydroksyzyna']);
  assert.equal(young.flags.length, 0);

  // Pacjent geriatryczny (82 l.) z BZD i lekiem antycholinergicznym
  const senior = evaluateBeersCriteria(82, ['diazepam', 'hydroksyzyna', 'haloperidol'], ['otępienie']);
  assert.equal(senior.flags.length, 3);
  assert.ok(senior.flags.some(f => f.criterion.includes('Benzodiazepiny')));
  assert.ok(senior.flags.some(f => f.criterion.includes('antycholinergiczne')));
  assert.ok(senior.flags.some(f => f.criterion.includes('przeciwpsychotyczne')));

  // Sprawdź czy Beers nie jest traktowane jako bezwzględny zakaz
  assert.ok(senior.summary.includes('wsparcie decyzji'));
});

test('Neurocognitive Engine: BPSD PINCH ME & Non-pharmacological first line', () => {
  const bpsd = evaluateBpsdEtiology({
    behaviour: 'Krzyk i agresja wieczorna przy toalecie',
    hasPainIndicators: true,
    hasFeverOrInfectionSigns: true,
    hasUrinaryRetentionOrConstipation: true,
    recentMedicationChange: false,
    environmentalOverload: true,
  });

  assert.ok(bpsd.identifiedTriggers.length >= 3);
  assert.ok(bpsd.nextSteps.some(s => s.toLowerCase().includes('bólu') || s.toLowerCase().includes('posiew')));
  assert.ok(bpsd.antipsychoticWarning.length > 20);
});

test('Neurocognitive Engine: Neurocognitive Clock & Tempo Categories', () => {
  const acute = evaluateNeurocognitiveClock('hours_days');
  assert.equal(acute.urgency, 'immediate_emergency');
  assert.ok(acute.primaryDifferentialBuckets.some(b => b.includes('Majaczenie')));

  const subacute = evaluateNeurocognitiveClock('weeks_months');
  assert.equal(subacute.urgency, 'subacute_workup');
  assert.ok(subacute.primaryDifferentialBuckets.some(b => b.includes('RPD')));

  const chronic = evaluateNeurocognitiveClock('months_years');
  assert.equal(chronic.urgency, 'elective_outpatient');
  assert.ok(chronic.primaryDifferentialBuckets.some(b => b.includes('Alzheimera')));
});

test('Neurocognitive Engine: MCA 2005 4 Capacity Domains', () => {
  // Wszystkie 4 domeny spełnione -> zdolność zachowana
  const fullCap = evaluateCapacityDomains({
    decisionContext: 'Zgoda na operację zaćmy',
    understandsInformation: true,
    retainsInformation: true,
    weighsOrReasons: true,
    communicatesDecision: true,
  });
  assert.equal(fullCap.isCapacityPreserved, true);
  assert.equal(fullCap.intactDomains.length, 4);

  // Zaburzone ważenie konsekwencji w majaczeniu -> brak zdolności w tej decyzji
  const impairedCap = evaluateCapacityDomains({
    decisionContext: 'Odmowa cewnikowania w ostrym zatrzymaniu moczu',
    understandsInformation: true,
    retainsInformation: true,
    weighsOrReasons: false,
    communicatesDecision: true,
  });
  assert.equal(impairedCap.isCapacityPreserved, false);
  assert.equal(impairedCap.impairedDomains.length, 1);
  assert.ok(impairedCap.safeguardingNote.includes('specyficzna dla danej decyzji i czasu'));
});

// ---------------------------------------------------------------------------
// 4. WERYFIKACJA WĄTKÓW PACJENTÓW I PRESETÓW WORKBENCHA
// ---------------------------------------------------------------------------
test('Wątki podłużne (Longitudinal Threads) i presety neurokognitywne', () => {
  assert.ok(PATIENT_THREADS['thread-helena-neurocog'], 'Brak wątku Heleny');
  assert.ok(PATIENT_THREADS['thread-jan-delirium'], 'Brak wątku Jana');
  assert.ok(PATIENT_THREADS['thread-marek-personality'], 'Brak wątku Marka');

  assert.ok(PATIENT_THREADS['thread-helena-neurocog'].keyHistoryFacts.length >= 2);
  assert.ok(PATIENT_THREADS['thread-jan-delirium'].keyHistoryFacts.length >= 2);
  assert.ok(PATIENT_THREADS['thread-marek-personality'].keyHistoryFacts.length >= 2);

  const neuroPresets = [
    'preset-delirium-jan-postop',
    'preset-delirium-superimposed-jan',
    'preset-helena-mci-early-ad',
    'preset-helena-bpsd-uti',
    'preset-marek-bvftd',
    'preset-dlb-hallucinations',
    'preset-autoimmune-encephalitis',
    'preset-geriatric-polypharmacy',
  ];

  for (const pId of neuroPresets) {
    const p = ALL_PSYCHIATRY_PRESETS[pId];
    assert.ok(p, `Brak presetu: ${pId}`);
    assert.equal(p.tab, 'neuro-geriatric');
    assert.ok(p.patientSummary.length > 10);
  }
});

// ---------------------------------------------------------------------------
// 5. BEZPIECZEŃSTWO TREŚCI: ZERO OVERCERTAINTY W NOWYM MODULE
// ---------------------------------------------------------------------------
test('Content Safety: 13 nowych lekcji i 8 przypadków nie zawiera fałszywej pewności', () => {
  const organicLessons = psychiatryLessons.filter(l => l.moduleId === 'psych-organiczne');
  const organicCases = psychiatryCases.filter(c =>
    organicLessons.some(l => l.id === c.lessonId)
  );

  const content = JSON.stringify(organicLessons) + '\n' + JSON.stringify(organicCases);

  const forbidden = [
    /potwierdza pierwotn/i,
    /wyklucza wszystkie/i,
    /patognomoniczn/i,
    /złoty standard/i,
    /wykluczaj[ąa]\s+pierwotny\s+proces/i,
    /wspieraj[ąa]c\s+diagnoz[ęe]\s+pierwotnego/i,
  ];

  for (const regex of forbidden) {
    assert.ok(!regex.test(content), `Naruszenie reguły anty-overcertainty: ${regex}`);
  }
});
