// Comparative Framework Evaluator: ICD-11 (CDDR 2024, 6B64) vs DSM-5-TR (2022, 300.14)
// Precise criteria matching, independent functional impairment, and unresolved vs confirmed exclusion modeling.
// String clinical enums must be compared explicitly; do not use truthiness.

import type {
  TraumaDissociationInput,
  FrameworkEvaluation,
} from './trauma-dissociation-types.ts';
import {
  isAmnesiaPresent,
  isEverydayAmnesia,
  isFunctionalImpactClinicallySignificant,
  isFunctionalImpactAssessed,
  isExecutiveControlRecurrent,
  hasConfirmedEpilepsyExclusion,
} from './trauma-dissociation-types.ts';

export function evaluateFrameworkCriteria(input: TraumaDissociationInput): {
  icd11: FrameworkEvaluation;
  dsm5tr: FrameworkEvaluation;
} {
  const sub = input.substanceContext || {};
  const neuro = input.neurologicalFeatures;
  const impact = input.functionalImpact;

  const hasDistinctStates = input.identityDiscontinuity === 'distinct_personality_states';
  const hasDisturbedSelf = input.identityDiscontinuity === 'disturbed_sense_of_self';
  const isIdentityAssessed = input.identityDiscontinuity !== 'unassessed';

  const amnesiaPresent = isAmnesiaPresent(input.amnesiaType);
  const amnesiaEveryday = isEverydayAmnesia(input.amnesiaType);
  const amnesiaTrauma = input.amnesiaType === 'trauma_specific';
  const amnesiaUnassessed = input.amnesiaType === 'unassessed';
  const amnesiaExplicitlyAbsent = input.amnesiaType === 'none';

  const executiveRecurrent = isExecutiveControlRecurrent(input.executiveControlPattern);
  const executiveIntermittent = input.executiveControlPattern === 'intermittent_influence_without_control';
  const executiveSingleState = input.executiveControlPattern === 'single_state_only';
  const executiveUnassessed = !input.executiveControlPattern || input.executiveControlPattern === 'unassessed';

  // 1. Functional Distress & Impairment (Independent of Duration)
  const isClinicallySignificant = isFunctionalImpactClinicallySignificant(impact);
  const isFunctionalAssessed = isFunctionalImpactAssessed(impact);
  const isFunctionalUnassessed = !isFunctionalAssessed;
  const hasNoSignificantImpairment =
    isFunctionalAssessed &&
    (impact?.distress === 'none' || impact?.distress === 'mild') &&
    (impact?.functionalImpairment === 'none' || impact?.functionalImpairment === 'mild');

  // 2. Exclusion Evaluation: Confirmed vs Unresolved (Zero Truthiness)
  const confirmedSubstanceExclusion =
    sub.exclusionStatus === 'confirmed_explanatory' ||
    (Boolean(sub.onsetDirectlyTiedToSubstance) && Boolean(sub.activeIntoxicationOrWithdrawal));
  const unresolvedSubstanceExclusion =
    !confirmedSubstanceExclusion &&
    (sub.exclusionStatus === 'unresolved' || Boolean(sub.activeIntoxicationOrWithdrawal));

  const confirmedNeurologicalExclusion =
    neuro?.exclusionStatus === 'confirmed_explanatory' ||
    hasConfirmedEpilepsyExclusion(neuro?.confirmedDiagnosis);

  const unresolvedNeurologicalExclusion =
    !confirmedNeurologicalExclusion &&
    (neuro?.exclusionStatus === 'unresolved' ||
      neuro?.confirmedDiagnosis === 'suspected_unconfirmed' ||
      Boolean(neuro?.aura?.epigastricRising) ||
      Boolean(neuro?.hasAuraOrEpigastricRising) ||
      (neuro?.episodicPattern === 'stereotyped' &&
        (neuro.episodeDuration === 'seconds' || Boolean(neuro.stereotypedSecondsDuration))) ||
      neuro?.focalNeurologicalDeficits === 'present' ||
      Boolean(neuro?.focalDeficits));

  const hasAnyConfirmedExclusion = confirmedSubstanceExclusion || confirmedNeurologicalExclusion;
  const hasAnyUnresolvedExclusion = unresolvedSubstanceExclusion || unresolvedNeurologicalExclusion;

  // ----------------------------------------------------
  // ICD-11 CDDR 2024: DID (6B64)
  // ----------------------------------------------------
  const icd11Met: string[] = [];
  const icd11Missing: string[] = [];
  const icd11NotRequired: string[] = [];
  const icd11Exclusions: string[] = [];
  const icd11UnresolvedExclusions: string[] = [];
  const icd11ConfirmedExclusions: string[] = [];

  // A. Stany tożsamości
  if (hasDistinctStates) {
    icd11Met.push('Wyodrębnienie dwóch lub więcej odrębnych stanów tożsamości z przerwaniem ciągłości ja i sprawczości');
  } else if (hasDisturbedSelf) {
    icd11Missing.push('Niestabilny obraz siebie bez autonomicznych stanów tożsamości (odpowiada BPD, a nie DID)');
  } else if (isIdentityAssessed) {
    icd11Missing.push('Brak rozbicia tożsamości na odrębne stany osobowości');
  } else {
    icd11Missing.push('Ciągłość tożsamości i obecność odrębnych stanów nie została oceniona');
  }

  // B. Nawracająca kontrola wykonawcza (ICD-11 6B64 vs 6B65 Partial DID)
  if (executiveRecurrent) {
    icd11Met.push('Nawracające przejmowanie kontroli wykonawczej nad świadomością i funkcjonowaniem przez min. 2 stany tożsamości');
  } else if (executiveIntermittent) {
    icd11Missing.push('Stany niedominujące wywierają jedynie wpływ intruzywny bez nawracającej kontroli wykonawczej (cecha Partial DID 6B65, wyklucza pełne DID 6B64)');
  } else if (executiveSingleState) {
    icd11Missing.push('Brak przejmowania kontroli wykonawczej przez alternatywne stany tożsamości');
  } else {
    icd11Missing.push('Wzorzec kontroli wykonawczej (executive control) nie został oceniony');
  }

  // C. Amnezja w ICD-11 (cecha typowa i wspierająca, NIE warunek bezwzględny)
  if (amnesiaPresent) {
    if (amnesiaEveryday) {
      icd11Met.push('Amnezja dysocjacyjna: obecna amnezja zdarzeń codziennych (everyday amnesia / time loss)');
    } else if (amnesiaTrauma) {
      icd11Met.push('Amnezja dysocjacyjna: amnezja ograniczona do zdarzeń urazowych');
    } else {
      icd11Met.push('Amnezja dysocjacyjna: obecne luki pamięciowe');
    }
  } else if (amnesiaExplicitlyAbsent) {
    icd11NotRequired.push('Amnezja jest typową cechą DID wg ICD-11 CDDR, lecz nie jest formalnym warunkiem koniecznym; brak zgłaszanej amnezji nie blokuje 6B64 przy obecnej kontroli wykonawczej');
  } else {
    icd11Missing.push('Profil amnezji autobiograficznej nie został oceniony');
  }

  // D. Upośledzenie funkcjonowania / cierpienie
  if (isClinicallySignificant) {
    icd11Met.push('Istotne klinicznie cierpienie lub upośledzenie funkcjonowania osobistego, rodzinnego lub społecznego');
  } else if (isFunctionalUnassessed) {
    icd11Missing.push('Wpływ na funkcjonowanie i cierpienie pacjenta nie został oceniony');
  } else {
    icd11Missing.push('Brak istotnego upośledzenia funkcjonowania (wymóg ICD-11 CDDR niespełniony)');
  }

  // E. Wykluczenia
  if (confirmedSubstanceExclusion) {
    icd11ConfirmedExclusions.push('Potwierdzone bezpośrednie działanie substancji wyjaśniające objawy');
    icd11Exclusions.push('Potwierdzone wykluczenie substancyjne');
  } else if (unresolvedSubstanceExclusion) {
    icd11UnresolvedExclusions.push('Nierozstrzygnięta ekspozycja na substancje wymaga wykluczenia przed diagnozą');
    icd11Exclusions.push('Nierozstrzygnięte wykluczenie substancyjne');
  }

  if (confirmedNeurologicalExclusion) {
    icd11ConfirmedExclusions.push('Potwierdzone schorzenie neurologiczne (np. TLE) wyjaśniające objawy napadowe');
    icd11Exclusions.push('Potwierdzone wykluczenie neurologiczne');
  } else if (unresolvedNeurologicalExclusion) {
    icd11UnresolvedExclusions.push('Nierozstrzygnięte podejrzenie padaczki skroniowej (TLE) – wymaga ukończenia diagnostyki neurologicznej');
    icd11Exclusions.push('Nierozstrzygnięte wykluczenie neurologiczne');
  }

  let icd11Compatibility: FrameworkEvaluation['compatibility'] = 'does_not_meet';
  let icd11Explanation = '';

  if (hasAnyConfirmedExclusion) {
    icd11Compatibility = 'does_not_meet';
    icd11Explanation = 'Objawy są wyjaśnione przez potwierdzone schorzenie neurologiczne lub toksyczne.';
  } else if (hasDisturbedSelf && !hasDistinctStates) {
    icd11Compatibility = 'does_not_meet';
    icd11Explanation = 'Niestabilność obrazu siebie bez autonomicznych stanów tożsamości wskazuje na zaburzenie osobowości (np. BPD), a nie DID.';
  } else if (input.identityDiscontinuity === 'none' || executiveSingleState || hasNoSignificantImpairment) {
    icd11Compatibility = 'does_not_meet';
    icd11Explanation = hasNoSignificantImpairment
      ? 'Brak istotnego klinicznie cierpienia lub upośledzenia funkcjonowania wyklucza formalne rozpoznanie wg ICD-11 CDDR.'
      : 'Brak kryteriów osiowych rozbicia tożsamości i przejmowania kontroli wykonawczej wg ICD-11.';
  } else if (hasAnyUnresolvedExclusion) {
    icd11Compatibility = 'insufficient_information';
    icd11Explanation = 'Nierozstrzygnięte podejrzenie TLE lub ekspozycji substancyjnej wymaga wykluczenia przed potwierdzeniem DID.';
  } else if (!isIdentityAssessed || executiveUnassessed || isFunctionalUnassessed) {
    icd11Compatibility = 'insufficient_information';
    icd11Explanation = 'Brak pełnej oceny tożsamości, kontroli wykonawczej lub upośledzenia uniemożliwia ocenę ICD-11.';
  } else if (hasDistinctStates && executiveRecurrent && isClinicallySignificant) {
    icd11Compatibility = 'meets';
    icd11Explanation = amnesiaPresent
      ? 'Obraz kliniczny w pełni spełnia wymagania diagnostyczne WHO ICD-11 CDDR dla DID (6B64) z nawracającą kontrolą wykonawczą i amnezją.'
      : 'Spełnione formalne wymagania ICD-11 CDDR dla DID (6B64): odrębne stany tożsamości, nawracająca kontrola wykonawcza i upośledzenie funkcjonowania (amnezja nie jest warunkiem bezwzględnym).';
  } else if (hasDistinctStates && executiveIntermittent) {
    icd11Compatibility = 'possible';
    icd11Explanation = 'Obecne odrębne stany tożsamości bez nawracającej kontroli wykonawczej sugerują częściowe DID (Partial DID, ICD-11 6B65).';
  } else {
    icd11Compatibility = 'possible';
    icd11Explanation = 'Kryteria częściowo spełnione, wymaga dalszej oceny klinicznej.';
  }

  // ----------------------------------------------------
  // DSM-5-TR (2022, 300.14): DID
  // ----------------------------------------------------
  const dsmMet: string[] = [];
  const dsmMissing: string[] = [];
  const dsmNotRequired: string[] = [];
  const dsmExclusions: string[] = [];
  const dsmUnresolvedExclusions: string[] = [];
  const dsmConfirmedExclusions: string[] = [];

  // Criterion A: Two or more distinct personality states
  if (hasDistinctStates) {
    dsmMet.push('Kryterium A: Dwa lub więcej odrębne stany osobowości z przerwaniem poczucia własnego ja i sprawczości');
  } else if (isIdentityAssessed) {
    dsmMissing.push('Kryterium A: Brak dwóch lub więcej odrębnych stanów osobowości');
  } else {
    dsmMissing.push('Kryterium A: Ciągłość tożsamości i obecność odrębnych stanów nie została oceniona');
  }

  // Criterion B: Recurrent gaps in recall (OBLIGATORY IN DSM-5-TR)
  if (amnesiaPresent) {
    if (amnesiaEveryday) {
      dsmMet.push('Kryterium B: Nawracające luki w pamięci zdarzeń codziennych (everyday events) przekraczające zwykłe zapominanie');
    } else if (amnesiaTrauma) {
      dsmMet.push('Kryterium B: Nawracające luki w pamięci zdarzeń urazowych (DSM-5-TR dopuszcza zdarzenia codzienne, dane osobiste LUB urazy)');
    } else {
      dsmMet.push('Kryterium B: Obecne nawracające luki w pamięci autobiograficznej');
    }
  } else if (amnesiaExplicitlyAbsent) {
    dsmMissing.push('Kryterium B niespełnione: brak nawracających luk w pamięci zdarzeń codziennych, danych osobistych ani urazów');
  } else {
    dsmMissing.push('Kryterium B: Pamięć autobiograficzna nie została oceniona');
  }

  // Criterion C: Distress / impairment
  if (isClinicallySignificant) {
    dsmMet.push('Kryterium C: Istotne klinicznie cierpienie lub upośledzenie funkcjonowania społecznego/zawodowego');
  } else if (isFunctionalUnassessed) {
    dsmMissing.push('Kryterium C: Brak oceny cierpienia i upośledzenia funkcjonowania');
  } else {
    dsmMissing.push('Kryterium C: Brak istotnego klinicznie cierpienia ani upośledzenia funkcjonowania');
  }

  // Criterion D: Cultural practice
  dsmNotRequired.push('Kryterium D: Objawy nie mogą być częścią powszechnie akceptowanych praktyk kulturowych lub religijnych');

  // Criterion E: Substance / Medical Exclusions
  if (confirmedSubstanceExclusion) {
    dsmConfirmedExclusions.push('Kryterium E: Potwierdzone działanie substancji bezpośrednio wywołujące objawy');
    dsmExclusions.push('Potwierdzone wykluczenie substancyjne (Kryterium E)');
  } else if (unresolvedSubstanceExclusion) {
    dsmUnresolvedExclusions.push('Kryterium E: Nierozstrzygnięta ekspozycja na substancje wymaga weryfikacji');
    dsmExclusions.push('Nierozstrzygnięte wykluczenie substancyjne');
  }

  if (confirmedNeurologicalExclusion) {
    dsmConfirmedExclusions.push('Kryterium E: Potwierdzone schorzenie neurologiczne (np. napady skroniowe) wyjaśniające objawy');
    dsmExclusions.push('Potwierdzone wykluczenie neurologiczne (Kryterium E)');
  } else if (unresolvedNeurologicalExclusion) {
    dsmUnresolvedExclusions.push('Kryterium E: Nierozstrzygnięte cechy paroksyzmalne sugerują konieczność wykluczenia TLE');
    dsmExclusions.push('Nierozstrzygnięte wykluczenie neurologiczne');
  }

  let dsmCompatibility: FrameworkEvaluation['compatibility'] = 'does_not_meet';
  let dsmExplanation = '';

  if (hasAnyConfirmedExclusion) {
    dsmCompatibility = 'does_not_meet';
    dsmExplanation = 'Kryterium E niespełnione: objawy wynikają bezpośrednio z działania substancji lub schorzenia ogólnomedycznego.';
  } else if (input.identityDiscontinuity === 'none' || hasDisturbedSelf || hasNoSignificantImpairment) {
    dsmCompatibility = 'does_not_meet';
    dsmExplanation = hasNoSignificantImpairment
      ? 'Kryterium C niespełnione: brak istotnego klinicznie cierpienia lub upośledzenia funkcjonowania.'
      : 'Kryterium A niespełnione: brak dwóch lub więcej odrębnych stanów osobowości.';
  } else if (amnesiaExplicitlyAbsent) {
    dsmCompatibility = 'does_not_meet';
    dsmExplanation = 'Kryterium B niespełnione: brak nawracających luk w pamięci (amnezji) wyklucza rozpoznanie DID wg DSM-5-TR.';
  } else if (hasAnyUnresolvedExclusion) {
    dsmCompatibility = 'insufficient_information';
    dsmExplanation = 'Kryterium E nierozstrzygnięte: obecne cechy paroksyzmalne lub substancyjne wymagają diagnostyki przed postawieniem diagnozy DSM-5-TR.';
  } else if (!isIdentityAssessed || amnesiaUnassessed || isFunctionalUnassessed) {
    dsmCompatibility = 'insufficient_information';
    dsmExplanation = 'Brak pełnej oceny Kryterium A, B lub C uniemożliwia ocenę DSM-5-TR.';
  } else if (hasDistinctStates && amnesiaPresent && isClinicallySignificant) {
    dsmCompatibility = 'meets';
    dsmExplanation = 'Spełnione formalne kryteria A, B, C i E wg DSM-5-TR (300.14).';
  } else {
    dsmCompatibility = 'possible';
    dsmExplanation = 'Brak pełnego spełnienia kryteriów osiowych DSM-5-TR dla DID.';
  }

  return {
    icd11: {
      framework: 'icd11',
      conditionName: 'Dysocjacyjne zaburzenie tożsamości (ICD-11 6B64)',
      diagnosisCode: '6B64',
      criteriaMet: icd11Met,
      criteriaMissing: icd11Missing,
      criteriaNotRequired: icd11NotRequired,
      exclusions: icd11Exclusions,
      unresolvedExclusions: icd11UnresolvedExclusions,
      confirmedExclusions: icd11ConfirmedExclusions,
      compatibility: icd11Compatibility,
      explanation: icd11Explanation,
      sourceIds: ['src-icd11-cddr-2024'],
    },
    dsm5tr: {
      framework: 'dsm5tr',
      conditionName: 'Dissociative Identity Disorder (DSM-5-TR 300.14)',
      diagnosisCode: '300.14',
      criteriaMet: dsmMet,
      criteriaMissing: dsmMissing,
      criteriaNotRequired: dsmNotRequired,
      exclusions: dsmExclusions,
      unresolvedExclusions: dsmUnresolvedExclusions,
      confirmedExclusions: dsmConfirmedExclusions,
      compatibility: dsmCompatibility,
      explanation: dsmExplanation,
      sourceIds: ['src-dsm5-tr-2022'],
    },
  };
}
