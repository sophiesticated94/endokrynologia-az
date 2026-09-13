// Comparative Framework Evaluator: ICD-11 (CDDR 2024, 6B64) vs DSM-5-TR (2022, 300.14)
// Precise criteria matching, independent functional impairment, and unresolved vs confirmed exclusion modeling.

import type {
  TraumaDissociationInput,
  FrameworkEvaluation,
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
  const hasEverydayAmnesia = input.amnesiaType === 'recurrent_daily_activities';
  const hasTraumaAmnesia = input.amnesiaType === 'trauma_specific';
  const hasGeneralizedAmnesia = input.amnesiaType === 'generalized_identity_loss';
  const hasAnyAmnesia = input.amnesiaType !== 'none';

  // 1. Functional Distress & Impairment (Independent of Duration)
  const isClinicallySignificant =
    impact?.distress === 'clinically_significant' ||
    impact?.functionalImpairment === 'clinically_significant';
  const isFunctionalUnassessed =
    !impact ||
    (impact.distress === 'unassessed' && impact.functionalImpairment === 'unassessed');
  const hasNoImpairment =
    !isFunctionalUnassessed &&
    (impact?.distress === 'none' || impact?.distress === 'mild') &&
    (impact?.functionalImpairment === 'none' || impact?.functionalImpairment === 'mild');

  // 2. Exclusion Evaluation: Confirmed vs Unresolved
  const confirmedSubstanceExclusion =
    sub.exclusionStatus === 'confirmed_explanatory' ||
    Boolean(sub.onsetDirectlyTiedToSubstance && sub.activeIntoxicationOrWithdrawal);
  const unresolvedSubstanceExclusion =
    !confirmedSubstanceExclusion &&
    (sub.exclusionStatus === 'unresolved' || Boolean(sub.activeIntoxicationOrWithdrawal));

  const confirmedNeurologicalExclusion =
    neuro?.exclusionStatus === 'confirmed_explanatory' ||
    neuro?.confirmedDiagnosis === 'confirmed_epilepsy_explaining_symptoms';
  const unresolvedNeurologicalExclusion =
    !confirmedNeurologicalExclusion &&
    (neuro?.exclusionStatus === 'unresolved' ||
      Boolean(
        neuro?.hasAuraOrEpigastricRising ||
        neuro?.aura?.epigastricRising ||
        (neuro?.episodicPattern === 'stereotyped' && (neuro?.episodeDuration === 'seconds' || neuro?.stereotypedSecondsDuration)) ||
        neuro?.focalNeurologicalDeficits === 'present' ||
        neuro?.focalDeficits
      ));

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

  if (hasDistinctStates) {
    icd11Met.push('Kryterium tożsamości: Wyodrębnienie dwóch lub więcej stanów tożsamości z przerwaniem poczucia ciągłości ja i sprawczości');
  } else if (hasDisturbedSelf) {
    icd11Missing.push('Kryterium tożsamości: Niestabilny obraz siebie bez odrębnych stanów wykonawczych (odpowiada raczej spektrum BPD)');
  } else {
    icd11Missing.push('Kryterium tożsamości: Brak rozbicia tożsamości na odrębne stany');
  }

  if (hasEverydayAmnesia || hasGeneralizedAmnesia) {
    icd11Met.push('Kryterium pamięci: Obecna znaczna amnezja dysocjacyjna obejmująca bieżące zdarzenia codzienne');
  } else if (hasTraumaAmnesia) {
    icd11Met.push('Kryterium pamięci: Amnezja ograniczona do zdarzeń urazowych (ICD-11 dopuszcza początkowe ograniczenie amnezji do traumy)');
    icd11NotRequired.push('Amnezja zdarzeń codziennych nie jest bezwzględnym warunkiem koniecznym we wczesnych stadiach wg ICD-11 CDDR');
  } else {
    icd11Missing.push('Kryterium pamięci: Brak udokumentowanej amnezji dysocjacyjnej');
  }

  // Functional significance
  if (isClinicallySignificant) {
    icd11Met.push('Kryterium upośledzenia: Potwierdzone istotne upośledzenie funkcjonowania osobistego, rodzinnego lub społecznego');
  } else if (isFunctionalUnassessed) {
    icd11Missing.push('Kryterium upośledzenia: Wpływ na funkcjonowanie i cierpienie pacjenta nie został oceniony');
  } else {
    icd11Missing.push('Kryterium upośledzenia: Brak istotnego upośledzenia funkcjonowania (wymóg ICD-11 CDDR niespełniony)');
  }

  if (confirmedSubstanceExclusion) {
    icd11ConfirmedExclusions.push('Wykluczenie substancyjne: Potwierdzona intoksykacja/odstawienie bezpośrednio wyjaśniające objawy');
    icd11Exclusions.push('Potwierdzone wykluczenie substancyjne');
  } else if (unresolvedSubstanceExclusion) {
    icd11UnresolvedExclusions.push('Nierozstrzygnięta ekspozycja substancyjna wymaga wykluczenia przed ostateczną diagnozą');
    icd11Exclusions.push('Nierozstrzygnięte wykluczenie substancyjne');
  }

  if (confirmedNeurologicalExclusion) {
    icd11ConfirmedExclusions.push('Wykluczenie neurologiczne: Potwierdzone schorzenie neurologiczne (np. TLE) wyjaśniające stany napadowe');
    icd11Exclusions.push('Potwierdzone wykluczenie neurologiczne');
  } else if (unresolvedNeurologicalExclusion) {
    icd11UnresolvedExclusions.push('Nierozstrzygnięte podejrzenie padaczki skroniowej (TLE) – wymaga specjalistycznej oceny');
    icd11Exclusions.push('Nierozstrzygnięte wykluczenie neurologiczne');
  }

  let icd11Compatibility: FrameworkEvaluation['compatibility'] = 'does_not_meet';
  let icd11Explanation = '';

  if (hasAnyConfirmedExclusion) {
    icd11Compatibility = 'does_not_meet';
    icd11Explanation = 'Objawy są bezpośrednio wyjaśnione przez potwierdzone schorzenie neurologiczne lub toksyczne.';
  } else if (!hasDistinctStates || hasNoImpairment) {
    icd11Compatibility = 'does_not_meet';
    icd11Explanation = hasDisturbedSelf
      ? 'Niestabilność obrazu siebie bez autonomicznych stanów tożsamości wskazuje na zaburzenie osobowości (np. BPD), a nie DID.'
      : hasNoImpairment
      ? 'Brak istotnego klinicznie cierpienia lub upośledzenia funkcjonowania wyklucza formalne rozpoznanie wg ICD-11 CDDR.'
      : 'Brak kryteriów osiowych rozbicia tożsamości wg ICD-11.';
  } else if (hasAnyUnresolvedExclusion) {
    icd11Compatibility = 'insufficient_information';
    icd11Explanation = 'Nierozstrzygnięte podejrzenie schorzenia neurologicznego (np. TLE) lub substancji wymaga diagnostyki przed potwierdzeniem DID.';
  } else if (isFunctionalUnassessed) {
    icd11Compatibility = 'insufficient_information';
    icd11Explanation = 'Kryteria tożsamości i amnezji są obecne, lecz brak oceny upośledzenia funkcjonowania uniemożliwia pełną ewaluację ICD-11.';
  } else if (hasDistinctStates && hasAnyAmnesia && isClinicallySignificant) {
    icd11Compatibility = 'meets';
    icd11Explanation = 'Obraz kliniczny w pełni spełnia wymagania diagnostyczne WHO ICD-11 CDDR dla DID (6B64).';
  } else if (hasDistinctStates && !hasAnyAmnesia) {
    icd11Compatibility = 'possible';
    icd11Explanation = 'Obecne odrębne stany tożsamości, lecz brak zgłaszanej amnezji wymaga pogłębienia wywiadu (amnezja na amnezję).';
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
  } else {
    dsmMissing.push('Kryterium A: Brak dwóch lub więcej odrębnych stanów osobowości');
  }

  // Criterion B: Recurrent gaps in recall of everyday events, personal info, or traumatic events
  if (hasEverydayAmnesia) {
    dsmMet.push('Kryterium B: Nawracające luki w pamięci zdarzeń codziennych (everyday events) przekraczające zwykłe zapominanie');
  } else if (hasTraumaAmnesia) {
    dsmMet.push('Kryterium B: Nawracające luki w pamięci zdarzeń urazowych (DSM-5-TR dopuszcza luki w zdarzeniach codziennych LUB informacjach osobistych LUB urazach)');
  } else if (hasGeneralizedAmnesia) {
    dsmMet.push('Kryterium B: Uogólniona amnezja tożsamościowa i zdarzeń życiowych');
  } else {
    dsmMissing.push('Kryterium B: Brak nawracających luk w pamięci zdarzeń codziennych, danych osobistych ani urazów');
  }

  // Criterion C: Distress / impairment
  if (isClinicallySignificant) {
    dsmMet.push('Kryterium C: Istotne klinicznie cierpienie lub upośledzenie funkcjonowania społecznego/zawodowego');
  } else if (isFunctionalUnassessed) {
    dsmMissing.push('Kryterium C: Brak oceny cierpienia i upośledzenia funkcjonowania w sferze społecznej lub zawodowej');
  } else {
    dsmMissing.push('Kryterium C: Brak istotnego klinicznie cierpienia ani upośledzenia funkcjonowania');
  }

  // Criterion D: Cultural practice
  dsmNotRequired.push('Kryterium D: Wymaga potwierdzenia, że objawy nie są częścią powszechnych praktyk kulturowych lub religijnych');

  // Criterion E: Substance / Medical
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
  } else if (!hasDistinctStates || hasNoImpairment) {
    dsmCompatibility = 'does_not_meet';
    dsmExplanation = hasNoImpairment
      ? 'Kryterium C niespełnione: brak istotnego klinicznie cierpienia lub upośledzenia funkcjonowania.'
      : 'Kryterium A niespełnione: brak dwóch lub więcej odrębnych stanów osobowości.';
  } else if (hasAnyUnresolvedExclusion) {
    dsmCompatibility = 'insufficient_information';
    dsmExplanation = 'Kryterium E nierozstrzygnięte: obecne cechy paroksyzmalne lub substancyjne wymagają diagnostyki przed postawieniem diagnozy DSM-5-TR.';
  } else if (isFunctionalUnassessed) {
    dsmCompatibility = 'insufficient_information';
    dsmExplanation = 'Kryterium C nierozstrzygnięte: brak oceny istotności klinicznej cierpienia lub upośledzenia funkcjonowania.';
  } else if (hasDistinctStates && hasAnyAmnesia && isClinicallySignificant) {
    dsmCompatibility = 'meets';
    dsmExplanation = 'Spełnione formalne kryteria A, B, C i E wg DSM-5-TR (300.14).';
  } else if (hasDistinctStates && !hasAnyAmnesia) {
    dsmCompatibility = 'possible';
    dsmExplanation = 'Spełnione kryterium A, lecz kryterium B (amnezja) wymaga weryfikacji przed postawieniem diagnozy DSM-5-TR.';
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
