// Comparative Framework Evaluator: ICD-11 (CDDR 2024, 6B64) vs DSM-5-TR (2022, 300.14)
// Precise criteria matching, amnesia nuances, and framework-specific caveats.

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

  const hasDistinctStates = input.identityDiscontinuity === 'distinct_personality_states';
  const hasDisturbedSelf = input.identityDiscontinuity === 'disturbed_sense_of_self';
  const hasEverydayAmnesia = input.amnesiaType === 'recurrent_daily_activities';
  const hasTraumaAmnesia = input.amnesiaType === 'trauma_specific';
  const hasGeneralizedAmnesia = input.amnesiaType === 'generalized_identity_loss';
  const hasAnyAmnesia = input.amnesiaType !== 'none';

  const substanceExclusion = Boolean(sub.activeIntoxicationOrWithdrawal);
  const medicalExclusion = Boolean(
    neuro?.focalDeficits ||
    neuro?.hasAuraOrEpigastricRising ||
    (neuro?.episodicPattern === 'stereotyped' && neuro?.episodeDuration === 'seconds')
  );

  // ----------------------------------------------------
  // ICD-11 CDDR 2024: DID (6B64)
  // ----------------------------------------------------
  const icd11Met: string[] = [];
  const icd11Missing: string[] = [];
  const icd11NotRequired: string[] = [];
  const icd11Exclusions: string[] = [];

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

  // Functional impairment
  if (input.symptomDuration === 'chronic_months') {
    icd11Met.push('Kryterium przebiegu i dystresu: Przewlekły przebieg z istotnym upośledzeniem funkcjonowania');
  } else {
    icd11Missing.push('Kryterium przebiegu: Brak potwierdzenia przewlekłości i trwałego upośledzenia funkcjonowania');
  }

  if (substanceExclusion) {
    icd11Exclusions.push('Wykluczenie substancyjne: Aktywna intoksykacja/zespół odstawienny wyklucza pierwotne rozpoznanie 6B64');
  }
  if (medicalExclusion) {
    icd11Exclusions.push('Wykluczenie somatyczne/neurologiczne: Cechy paroksyzmalne wymagają wykluczenia organicznego (TLE/OUN)');
  }

  let icd11Compatibility: FrameworkEvaluation['compatibility'] = 'does_not_meet';
  let icd11Explanation = '';

  if (substanceExclusion || medicalExclusion) {
    icd11Compatibility = 'does_not_meet';
    icd11Explanation = 'Objawy nie mogą być przypisane bezpośredniemu działaniu substancji lub schorzeniu neurologicznemu (np. TLE).';
  } else if (hasDistinctStates && hasAnyAmnesia && input.symptomDuration === 'chronic_months') {
    icd11Compatibility = 'meets';
    icd11Explanation = 'Obraz kliniczny w pełni spełnia wymagania diagnostyczne WHO ICD-11 CDDR dla DID (6B64).';
  } else if (hasDistinctStates && input.amnesiaType === 'none') {
    icd11Compatibility = 'possible';
    icd11Explanation = 'Obecne odrębne stany tożsamości, lecz brak zgłaszanej amnezji wymaga pogłębienia wywiadu (amnezja na amnezję).';
  } else if (hasDisturbedSelf) {
    icd11Compatibility = 'does_not_meet';
    icd11Explanation = 'Niestabilność obrazu siebie bez autonomicznych stanów tożsamości wskazuje na zaburzenie osobowości (np. BPD), a nie DID.';
  } else {
    icd11Compatibility = 'does_not_meet';
    icd11Explanation = 'Brak kryteriów osiowych rozbicia tożsamości i amnezji dysocjacyjnej wg ICD-11.';
  }

  // ----------------------------------------------------
  // DSM-5-TR (2022, 300.14): DID
  // ----------------------------------------------------
  const dsmMet: string[] = [];
  const dsmMissing: string[] = [];
  const dsmNotRequired: string[] = [];
  const dsmExclusions: string[] = [];

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
    dsmMet.push('Kryterium B: Nawracające luki w pamięci zdarzeń urazowych (DSM-5-TR dopuszcza luki w codziennych zdarzeniach LUB informacjach osobistych LUB urazach)');
  } else if (hasGeneralizedAmnesia) {
    dsmMet.push('Kryterium B: Uogólniona amnezja tożsamościowa i zdarzeń życiowych');
  } else {
    dsmMissing.push('Kryterium B: Brak nawracających luk w pamięci zdarzeń codziennych, danych osobistych ani urazów');
  }

  // Criterion C: Distress / impairment
  if (input.symptomDuration === 'chronic_months') {
    dsmMet.push('Kryterium C: Istotne klinicznie cierpienie lub upośledzenie funkcjonowania społecznego/zawodowego');
  } else {
    dsmMissing.push('Kryterium C: Brak udokumentowanego istotnego upośledzenia funkcjonowania');
  }

  // Criterion D: Cultural practice
  dsmNotRequired.push('Kryterium D: Wymaga potwierdzenia, że objawy nie są częścią powszechnych praktyk kulturowych lub religijnych');

  // Criterion E: Substance / Medical
  if (substanceExclusion) {
    dsmExclusions.push('Kryterium E: Wykluczenie substancji – objawy przypisane fizjologicznym skutkom substancji');
  }
  if (medicalExclusion) {
    dsmExclusions.push('Kryterium E: Wykluczenie medyczne – cechy paroksyzmalne sugerują konieczność wykluczenia napadów skroniowych');
  }

  let dsmCompatibility: FrameworkEvaluation['compatibility'] = 'does_not_meet';
  let dsmExplanation = '';

  if (substanceExclusion || medicalExclusion) {
    dsmCompatibility = 'does_not_meet';
    dsmExplanation = 'Kryterium E niespełnione: objawy mogą wynikać z działania substancji lub schorzenia ogólnomedycznego.';
  } else if (hasDistinctStates && hasAnyAmnesia && input.symptomDuration === 'chronic_months') {
    dsmCompatibility = 'meets';
    dsmExplanation = 'Spełnione formalne kryteria A, B, C i E wg DSM-5-TR (300.14).';
  } else if (hasDistinctStates && !hasAnyAmnesia) {
    dsmCompatibility = 'possible';
    dsmExplanation = 'Spełnione kryterium A, lecz kryterium B (amnezja) wymaga weryfikacji przed postawieniem diagnozy DSM-5-TR.';
  } else {
    dsmCompatibility = 'does_not_meet';
    dsmExplanation = 'Brak spełnienia kryteriów osiowych DSM-5-TR dla DID.';
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
      compatibility: dsmCompatibility,
      explanation: dsmExplanation,
      sourceIds: ['src-dsm5-tr-2022'],
    },
  };
}
