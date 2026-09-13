// Neurological & Paroxysmal Seizure (TLE) Evaluator
// Compliant with ILAE 2017 classification and NICE NG217 (2022) guidelines.

import type {
  TraumaDissociationInput,
  NeurologicalAssessmentOutput,
  NeurologicalFeatures,
  NeurologicalInvestigations,
  ExclusionStatus,
} from './trauma-dissociation-types.ts';

export function evaluateNeurologyFeatures(
  input: TraumaDissociationInput
): NeurologicalAssessmentOutput {
  const neuro: Partial<NeurologicalFeatures> = input.neurologicalFeatures || {};
  const inv: Partial<NeurologicalInvestigations> = input.neurologicalInvestigations || {};

  const supporting: string[] = [];
  const opposing: string[] = [];
  const missingCritical: string[] = [];

  // 1. Episode Stereotypy & Duration
  const isStereotyped =
    neuro.episodicPattern === 'stereotyped' || neuro.stereotypedSecondsDuration;
  const isBriefSeconds =
    neuro.episodeDuration === 'seconds' ||
    input.symptomDuration === 'brief_episodes_seconds';
  const isVariableHours =
    neuro.episodeDuration === 'hours' || neuro.episodeDuration === 'variable';

  if (isStereotyped && isBriefSeconds) {
    supporting.push(
      'Krótkotrwałe (30–120 s), ściśle stereotypowe napady – silny wskaźnik fenotypu padaczkowego'
    );
  } else if (isVariableHours) {
    opposing.push(
      'Zmienna, wielogodzinna długość epizodów przemawia przeciwko typowemu napadowi ogniskowemu TLE'
    );
  }

  // 2. Aura Phenomenon
  const aura = neuro.aura;
  const hasAura = Boolean(
    aura?.epigastricRising ||
    aura?.olfactory ||
    aura?.gustatory ||
    aura?.experientialDejaVuJamaisVu ||
    aura?.otherFocalAura ||
    neuro.hasAuraOrEpigastricRising
  );

  if (hasAura) {
    if (aura?.epigastricRising || neuro.hasAuraOrEpigastricRising) {
      supporting.push(
        'Aura nadbrzuszna (epigastric rising) – klasyczny marker ogniska w przyśrodkowym płacie skroniowym'
      );
    }
    if (aura?.olfactory || aura?.gustatory) {
      supporting.push('Aura węchowa lub smakowa – cecha napadów hakowych (uncinate fits)');
    }
    if (aura?.experientialDejaVuJamaisVu) {
      supporting.push('Aura urojeniowo-doświadczeniowa (napadowe déjà vu / jamais vu)');
    }
  } else {
    opposing.push('Brak napadowej aury czuciowej, wegetatywnej ani psychicznej');
  }

  // 3. Witness History & Automatisms
  if (neuro.witnessedAutomatisms === 'clear') {
    supporting.push(
      'Zaobserwowane przez świadków automatyzmy (oralne, manualne) w trakcie zaburzeń świadomości'
    );
  } else if (neuro.witnessedAutomatisms === 'possible') {
    supporting.push('Prawdopodobne automatyzmy ruchowe wymagające obiektywizacji');
  }

  if (neuro.witnessHistory === 'available_supportive') {
    supporting.push(
      'Relacja świadka potwierdza stałą sekwencję objawów i stereotypowość kolejnych napadów'
    );
  } else if (neuro.witnessHistory === 'unavailable' || neuro.witnessHistory === 'unassessed') {
    missingCritical.push(
      'Brak relacji bezpośredniego świadka napadu – kluczowy element obiektywizujący wg NICE NG217'
    );
  }

  // 4. Postictal State & Focal Deficits
  const postictal = neuro.postictalState;
  const hasPostictal = Boolean(
    postictal?.confusion ||
    postictal?.somnolence ||
    postictal?.aphasia ||
    postictal?.focalDeficit ||
    neuro.postictalConfusion
  );

  if (hasPostictal) {
    supporting.push(
      'Obecność stanu ponapadowego (postictal confusion / somnolence / afazja dysfazja)'
    );
  }

  const hasFocalDeficit =
    neuro.focalNeurologicalDeficits === 'present' || Boolean(neuro.focalDeficits);
  if (hasFocalDeficit) {
    supporting.push('Ogniskowe deficyty neurologiczne w badaniu przedmiotowym');
  }

  // 5. Investigations Interpretation (Safety Invariants)
  let eegInterpretation = 'EEG: Badanie niewykonane.';
  const eegStatus = inv.eeg?.status || (inv as Record<string, unknown> | undefined)?.routineEeg;
  const isEpileptiformEEG = eegStatus === 'epileptiform';

  if (eegStatus) {
    if (isEpileptiformEEG) {
      eegInterpretation =
        'EEG: Wyładowania padaczkokształtne (fale ostre, zespoły iglica-fala) silnie wspierają hipotezę napadową w korelacji z obrazem klinicznym.';
      supporting.push('Zapis EEG z wyładowaniami padaczkokształtnymi');
    } else if (eegStatus === 'normal') {
      eegInterpretation =
        'EEG: Prawidłowy zapis spoczynkowy. UWAGA: Prawidłowy rutynowy EEG NIE wyklucza padaczki skroniowej – czułość pojedynczego rutynowego EEG jest ograniczona, szczególnie między napadami (zgodnie z NICE NG217).';
      opposing.push('Rutynowy zapis EEG bez cech padaczkokształtnych (nie wyklucza TLE)');
    } else if (eegStatus === 'nonspecific') {
      eegInterpretation =
        'EEG: Zmiany niespecyficzne (np. uogólnione zwolnienie czynności podstawowej) bez wyładowań napadowych.';
    }
  }

  let mriInterpretation = 'MRI głowy: Badanie niewykonane.';
  const mriStatus = inv.mri?.status || (inv as Record<string, unknown> | undefined)?.brainMri;
  const hasEpileptogenicLesion = mriStatus === 'potential_epileptogenic_lesion';

  if (mriStatus) {
    if (hasEpileptogenicLesion) {
      mriInterpretation =
        'MRI głowy: Zmiana potencjalnie padaczkorodna (np. stwardnienie hipokampa, malformacja naczyniowa lub dysplazja korowa).';
      supporting.push('Zmiana strukturalna w MRI w protokole padaczkowym');
    } else if (mriStatus === 'normal') {
      mriInterpretation =
        'MRI głowy: Obraz prawidłowy. UWAGA: Prawidłowy MRI NIE wyklucza padaczki (część padaczek ogniskowych ma charakter nielesyjny).';
    }
  }

  const safetyInvariant =
    'SAFETY INVARIANT: Prawidłowe wyniki badań EEG i neuroobrazowania NIE potwierdzają zaburzenia dysocjacyjnego ani czynnościowego. Rozpoznanie dysocjacji wymaga spełnienia pozytywnych kryteriów psychopatologicznych.';

  // 6. Exclusion Status
  let exclusionStatus: ExclusionStatus = 'none';
  if (neuro.confirmedDiagnosis || neuro.exclusionStatus === 'confirmed_explanatory') {
    exclusionStatus = 'confirmed_explanatory';
  } else if (
    isEpileptiformEEG ||
    hasAura ||
    (isStereotyped && isBriefSeconds) ||
    neuro.witnessedAutomatisms === 'clear' ||
    hasFocalDeficit ||
    neuro.exclusionStatus === 'unresolved'
  ) {
    // Paroxysmal / focal neurological features present, not yet ruled out (normal EEG does not rule out)
    exclusionStatus = 'unresolved';
  }

  // 7. Clinical Reasoning Priority & Concern (No Arbitrary Score Points)
  let concern: NeurologicalAssessmentOutput['concern'] = 'low';
  let priority: NeurologicalAssessmentOutput['workupPriority'] = 'routine';

  if (hasFocalDeficit) {
    // Focal deficit is an acute red flag requiring urgent assessment
    concern = 'high';
    priority = 'urgent_assessment';
  } else if (isEpileptiformEEG && (isStereotyped || hasAura || isBriefSeconds)) {
    // Proven epileptiform activity with matching paroxysms
    concern = 'high';
    priority = 'urgent_assessment';
  } else if (
    (isStereotyped && isBriefSeconds && (hasAura || neuro.witnessedAutomatisms === 'clear')) ||
    (hasAura && neuro.witnessedAutomatisms === 'clear')
  ) {
    // High clinical phenotype convergence for focal impaired awareness seizures
    concern = 'high';
    priority = 'specialist_assessment';
  } else if (
    hasAura ||
    isStereotyped ||
    neuro.witnessedAutomatisms === 'possible' ||
    hasPostictal ||
    isBriefSeconds ||
    hasEpileptogenicLesion ||
    isEpileptiformEEG
  ) {
    concern = 'moderate';
    priority = 'specialist_assessment';
  }

  return {
    concern,
    workupPriority: priority,
    exclusionStatus,
    supportingFeatures: supporting,
    opposingFeatures: opposing,
    missingCriticalInformation: missingCritical,
    investigationInterpretation: {
      eeg: eegInterpretation,
      mri: mriInterpretation,
      safetyInvariant,
    },
  };
}
