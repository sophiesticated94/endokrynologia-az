// Trauma & Dissociation Clinical Reasoning Engine
// Pure multi-axial domain reasoning with comparative framework analysis (ICD-11 / DSM-5-TR)
// Strict invariants: No deterministic closure where criteria are probabilistic; file <= 500 lines.

import type {
  TraumaDissociationInput,
  TraumaDissociationOutput,
  DiagnosticHypothesis,
  ReExperiencingInPresent,
  TraumaAvoidance,
  PersistentCurrentThreat,
  PsychosisAxes,
  NeurologicalFeatures,
} from './trauma-dissociation-types.ts';
import { evaluateFrameworkCriteria } from './trauma-framework-evaluator.ts';
import { evaluateNeurologyFeatures } from './trauma-neurology-evaluator.ts';

export * from './trauma-dissociation-types.ts';

export function normalizeTraumaDissociationInput(raw: Partial<TraumaDissociationInput>): TraumaDissociationInput {
  const fi = raw.functionalImpact || {
    distress: raw.symptomDuration === 'chronic_months' ? 'clinically_significant' : 'unassessed',
    functionalImpairment: raw.symptomDuration === 'chronic_months' ? 'clinically_significant' : 'unassessed',
  };
  const reExp: ReExperiencingInPresent = raw.reExperiencingInPresent || (raw.traumaIntrusions === 'flashbacks_acting_as_if' ? 'vivid_flashback_here_and_now' : raw.traumaIntrusions === 'distressing_memories' ? 'intrusive_memories_without_here_and_now_quality' : 'none');
  const avoidance: TraumaAvoidance = raw.traumaAvoidance || (raw.avoidanceHyperarousal ? 'both' : 'none');
  const threat: PersistentCurrentThreat = raw.persistentCurrentThreat || (raw.avoidanceHyperarousal ? 'both' : 'none');
  const affect = raw.affectRegulation || {
    reactiveLability: raw.affectInstability === 'rapid_reactive_hours' ? 'marked' : 'none',
    persistentDysregulation: raw.affectInstability ? 'hyperactivation' : 'none',
  };
  const relational = raw.relationalDisturbance || {
    sustainedDifficultyWithCloseness: raw.interpersonalPattern === 'alienated_avoidant' ? 'present' : 'none',
    persistentDetachmentOrAlienation: raw.interpersonalPattern === 'alienated_avoidant' ? 'present' : 'none',
    unstableIntenseRelationships: raw.interpersonalPattern === 'intense_fear_of_abandonment' ? 'present' : 'none',
    abandonmentSensitivity: raw.interpersonalPattern === 'intense_fear_of_abandonment' ? 'marked' : 'none',
  };
  const psychAxes: PsychosisAxes = raw.psychosisAxes || {
    realityTesting: raw.realityTesting === 'impaired_delusional' ? 'markedly_impaired' : 'unassessed',
    delusions: {
      presence: raw.thoughtDisorder ? 'present' : 'unassessed',
      organization: 'unassessed',
      conviction: raw.thoughtDisorder ? 'high' : 'unassessed',
    },
    formalThoughtDisorder: raw.thoughtDisorder ? 'marked' : 'unassessed',
    behavioralDisorganization: 'unassessed',
    negativeSymptoms: {
      avolition: false,
      anhedonia: false,
      alogia: false,
      bluntedAffect: false,
      socialWithdrawal: false,
      assessed: false,
    },
    functionalDecline: 'unassessed',
    longitudinalCourse: 'unassessed',
    moodRelation: 'unassessed',
    substanceOrMedicalContext: 'unassessed',
  };
  const neuro: NeurologicalFeatures = raw.neurologicalFeatures || {
    episodicPattern: raw.symptomDuration === 'brief_episodes_seconds' ? 'stereotyped' : 'none',
    episodeDuration: raw.symptomDuration === 'brief_episodes_seconds' ? 'seconds' : 'unknown',
    aura: {
      epigastricRising: false,
      olfactory: false,
      gustatory: false,
      experientialDejaVuJamaisVu: false,
      otherFocalAura: false,
    },
    impairedAwareness: 'unassessed',
    witnessedAutomatisms: 'unassessed',
    postictalState: {
      confusion: false,
      somnolence: false,
      aphasia: false,
      focalDeficit: false,
    },
    witnessHistory: 'unavailable',
    focalNeurologicalDeficits: 'none',
  };

  return {
    ...raw,
    identityDiscontinuity: raw.identityDiscontinuity || 'none',
    amnesiaType: raw.amnesiaType || 'none',
    realityTesting: raw.realityTesting || 'intact',
    symptomDuration: raw.symptomDuration || 'chronic_months',
    functionalImpact: fi,
    reExperiencingInPresent: reExp,
    traumaAvoidance: avoidance,
    persistentCurrentThreat: threat,
    negativeSelfConcept: raw.negativeSelfConcept || 'none',
    affectRegulation: affect,
    relationalDisturbance: relational,
    depersonalizationDerealization: Boolean(raw.depersonalizationDerealization),
    somatoformDissociation: Boolean(raw.somatoformDissociation),
    voicePhenomenology: raw.voicePhenomenology || {
      present: false,
      location: 'unclear',
      attribution: 'uncertain',
      conviction: 'insight_preserved',
      form: 'single_voice',
      controllability: 'unknown',
      relationToIdentityStates: 'none',
      associatedDelusions: 'none',
      distress: 'low',
    },
    psychosisAxes: psychAxes,
    neurologicalFeatures: neuro,
    neurologicalInvestigations: raw.neurologicalInvestigations || {},
    substanceContext: raw.substanceContext || {},
    suicidalityRisk: raw.suicidalityRisk || 'none',
  };
}

export function evaluateTraumaDissociation(rawInput: TraumaDissociationInput): TraumaDissociationOutput {
  const input = normalizeTraumaDissociationInput(rawInput);
  const redFlags: string[] = [];
  const missingInfo: string[] = [];
  const whatChanges: string[] = [];

  const supporting: Record<string, string[]> = {
    DID: [], BPD: [], PTSD: [], cPTSD: [], DPDR: [], DissociativeAmnesia: [], Psychosis: [], TLE: [], SubstanceInduced: [],
  };
  const opposing: Record<string, string[]> = {
    DID: [], BPD: [], PTSD: [], cPTSD: [], DPDR: [], DissociativeAmnesia: [], Psychosis: [], TLE: [], SubstanceInduced: [],
  };

  // 1. NEUROLOGY EVALUATION & SAFETY INVARIANTS
  const neuroAssessment = evaluateNeurologyFeatures(input);
  if (neuroAssessment.concern === 'high') {
    redFlags.push('Wysoki poziom niepokoju neurologicznego: stereotypowe napady lub objawy ogniskowe wymagają priorytetowej konsultacji / workupu neurologicznego (ILAE 2017 / NICE NG217).');
  }
  supporting.TLE.push(...neuroAssessment.supportingFeatures);
  opposing.TLE.push(...neuroAssessment.opposingFeatures);
  missingInfo.push(...neuroAssessment.missingCriticalInformation);

  // 2. SUICIDALITY & CRISIS SAFETY
  let safetyAction: string | null = null;
  if (input.suicidalityRisk === 'active_with_intent') {
    redFlags.push('Aktywne myśli samobójcze z zamiarem i planem – bezpośrednie zagrożenie życia.');
    safetyAction = 'Natychmiastowe wdrożenie planu bezpieczeństwa (Stanley-Brown) i ocena wskazań do pilnej hospitalizacji. Bezwzględne odroczenie technik konfrontacyjnych/ekspozycyjnych.';
  } else if (input.suicidalityRisk === 'recent_severe_self_harm') {
    redFlags.push('Niedawne ciężkie samouszkodzenia – priorytet stabilizacji i regulacji emocji (DBT).');
    safetyAction = 'Priorytet Fazy 1 leczenia (bezpieczeństwo, redukcja szkód). Odroczenie pogłębionej pracy z traumą.';
  }

  // 3. SUBSTANCE CONTEXT
  const sub = input.substanceContext || {};
  if (sub.activeIntoxicationOrWithdrawal) {
    redFlags.push('Aktywna intoksykacja lub zespół odstawienny – objawy mogą mieć charakter bezpośrednio substancyjny.');
    supporting.SubstanceInduced.push('Zbieżność czasowa objawów z ekspozycją na substancję psychoaktywną');
    opposing.DID.push('Objawy występujące wyłącznie w trakcie intoksykacji/odstawienia uniemożliwiają pewne rozpoznanie DID');
  }

  // 4. FRAMEWORK EVALUATION (ICD-11 vs DSM-5-TR)
  const frameworkAnalysis = evaluateFrameworkCriteria(input);

  // 5. PTSD CORE DOMAINS (ICD-11 Triad)
  const reExp = input.reExperiencingInPresent;
  const avoidance = input.traumaAvoidance;
  const threat = input.persistentCurrentThreat;
  const hasFullReExp = reExp === 'vivid_flashback_here_and_now' || reExp === 'trauma_nightmares_with_reexperiencing';
  const hasAvoidance = avoidance !== 'none';
  const hasCurrentThreat = threat !== 'none';
  const hasCorePTSD = hasFullReExp && hasAvoidance && hasCurrentThreat;

  if (hasFullReExp) {
    supporting.PTSD.push('Ponowne przeżywanie w czasie teraźniejszym (flashbacks z poczuciem tu i teraz lub koszmary re-living)');
  } else if (reExp === 'intrusive_memories_without_here_and_now_quality') {
    opposing.PTSD.push('Dystresujące wspomnienia bez cech ponownego przeżywania w teraźniejszości (nie spełniają pełnego kryterium ICD-11 dla PTSD)');
  } else if (reExp === 'none') {
    opposing.PTSD.push('Brak objawów ponownego przeżywania urazu w teraźniejszości');
  }
  if (hasAvoidance) supporting.PTSD.push(`Aktywne unikanie bodźców urazowych (${avoidance})`);
  else opposing.PTSD.push('Brak aktywnego unikania bodźców przypominających uraz');
  if (hasCurrentThreat) supporting.PTSD.push(`Utrzymujące się poczucie aktualnego zagrożenia (${threat})`);
  else opposing.PTSD.push('Brak utrzymującego się wzmożonego wzbudzenia/czujności');

  // 6. cPTSD DSO TRIAD & BPD PROFILE
  const affect = input.affectRegulation!;
  const relational = input.relationalDisturbance!;
  const hasDsoAffect = affect.persistentDysregulation !== 'none';
  const hasDsoSelf = input.negativeSelfConcept !== 'none';
  const hasDsoRelational = relational.sustainedDifficultyWithCloseness === 'present' || relational.persistentDetachmentOrAlienation === 'present';
  const hasFullDSO = hasDsoAffect && hasDsoSelf && hasDsoRelational;

  if (hasFullDSO) {
    supporting.cPTSD.push('Kompletna triada DSO (dysregulacja afektu, trwały negatywny obraz siebie, trudności w utrzymaniu bliskości relacyjnej)');
  } else {
    const missingDso: string[] = [];
    if (!hasDsoAffect) missingDso.push('trwała dysregulacja afektu');
    if (!hasDsoSelf) missingDso.push('negatywny obraz siebie');
    if (!hasDsoRelational) missingDso.push('zaburzenia relacji/bliskości');
    opposing.cPTSD.push(`Brak pełnej triady DSO (brakujące domeny: ${missingDso.join(', ')})`);
  }

  // BPD Multi-axial traits (explicit convergence, not arbitrary counts)
  const hasBpdAffect = affect.reactiveLability === 'marked';
  const hasBpdAbandonment = relational.abandonmentSensitivity === 'marked';
  const hasBpdRelationships = relational.unstableIntenseRelationships === 'present';
  const hasBpdIdentity = input.identityDiscontinuity === 'disturbed_sense_of_self';
  const hasBpdStressDissociation = input.realityTesting === 'transient_stress_induced';
  const hasBpdSelfConcept = input.negativeSelfConcept !== 'none';

  if (hasBpdAbandonment) supporting.BPD.push('Wyraźna wrażliwość na odrzucenie i lęk przed porzuceniem');
  if (hasBpdAffect) supporting.BPD.push('Szybka, reaktywna chwiejność afektu w skali godzin');
  if (hasBpdRelationships) supporting.BPD.push('Niestabilne, intensywne relacje interpersonalne');
  if (hasBpdIdentity) {
    supporting.BPD.push('Rozchwiany obraz własnego ja bez wyodrębnienia odrębnych alter-stanów');
    opposing.DID.push('Rozchwianie tożsamości typowe dla zaburzeń osobowości (BPD), brak autonomicznych alter-stanów');
  }
  if (hasBpdStressDissociation) supporting.BPD.push('Przemijające, indukowane stresem objawy dysocjacyjne');

  const bpdCoreInstability = hasBpdAbandonment || (hasBpdRelationships && hasBpdAffect);
  const bpdSelfFeatures = hasBpdIdentity || hasBpdStressDissociation || hasBpdSelfConcept;
  const bpdConverges = bpdCoreInstability && bpdSelfFeatures;
  const bpdPartial = bpdCoreInstability || bpdSelfFeatures || hasBpdAffect || hasBpdRelationships;

  // 7. DID EVALUATION & AMNESIA NUANCE
  const hasDistinctStates = input.identityDiscontinuity === 'distinct_personality_states';
  const hasEverydayAmnesia = input.amnesiaType === 'recurrent_daily_activities';
  const hasTraumaAmnesia = input.amnesiaType === 'trauma_specific';

  if (hasDistinctStates) supporting.DID.push('Odrębne stany tożsamości z przerwaniem ciągłości poczucia ja i sprawczości');
  else opposing.DID.push('Brak odrębnych stanów tożsamości wykonawczej');

  if (hasEverydayAmnesia) {
    supporting.DID.push('Nawracająca amnezja dotycząca bieżących zdarzeń codziennych (everyday amnesia / time loss)');
    supporting.DissociativeAmnesia.push('Udokumentowane luki pamięciowe niewytłumaczalne zwykłym zapominaniem');
  } else if (hasTraumaAmnesia) {
    supporting.DID.push('Amnezja zdarzeń urazowych (zgodna z wczesnym profilem DID wg ICD-11 CDDR)');
    supporting.DissociativeAmnesia.push('Amnezja ograniczona do zdarzeń urazowych');
  } else if (input.amnesiaType === 'none') {
    opposing.DID.push('Brak zgłaszanych luk pamięciowych / amnezji (wymaga różnicowania z amnezją na amnezję)');
    opposing.DissociativeAmnesia.push('Brak luk w pamięci wyklucza zaburzenie amnezyjne');
  }

  // 8. PSYCHOSIS vs DISSOCIATION MULTI-AXIAL
  const psychAxes = input.psychosisAxes;
  const voice = input.voicePhenomenology;
  const hasFixedDelusions = psychAxes?.delusions?.presence === 'present' && psychAxes.delusions.conviction === 'high';
  const hasThoughtDisorder = psychAxes?.formalThoughtDisorder === 'marked' || Boolean(input.thoughtDisorder);
  const hasImpairedReality = psychAxes?.realityTesting === 'markedly_impaired' || input.realityTesting === 'impaired_delusional';
  const hasNegativeSymptoms = psychAxes?.negativeSymptoms && Object.values(psychAxes.negativeSymptoms).filter(Boolean).length >= 2;
  const hasFunctionalDecline = psychAxes?.functionalDecline === 'clear';

  if (hasImpairedReality || hasFixedDelusions) supporting.Psychosis.push('Utrata krytycyzmu i utrwalone przekonania urojeniowe');
  if (hasThoughtDisorder) supporting.Psychosis.push('Formalne zaburzenia toku myślenia (rozkojarzenie, niespójność)');
  if (hasNegativeSymptoms) supporting.Psychosis.push('Objawy negatywne (spłycenie afektu, awolicja, alogia)');
  if (hasFunctionalDecline) supporting.Psychosis.push('Postępujące pogorszenie funkcjonowania społecznego i poznawczego');

  if (voice?.present) {
    if (voice.attribution === 'identity_state_related') supporting.DID.push('Doświadczenia głosowe w formie dialogu między stanami tożsamości');
    if (voice.conviction === 'fixed_external_attribution') supporting.Psychosis.push('Głosy z urojeniową atrybucją zewnętrzną i brakiem krytycyzmu');
    else if (voice.conviction === 'insight_preserved') opposing.Psychosis.push('Zachowany wgląd w subiektywny charakter głosów osłabia podejrzenie schizofrenii (nie wyklucza)');
  }

  // 9. SYNTHESIS OF DIAGNOSTIC HYPOTHESES WITH DATA SUFFICIENCY
  const hypotheses: DiagnosticHypothesis[] = [];
  const fi = input.functionalImpact || { distress: 'unassessed', functionalImpairment: 'unassessed' };
  const hasFunctionalImpairmentOrDistress =
    fi.distress === 'clinically_significant' || fi.functionalImpairment === 'clinically_significant';
  const functionalUnassessed = fi.distress === 'unassessed' && fi.functionalImpairment === 'unassessed';

  // A. DID Hypothesis
  const didMissing: string[] = [];
  if (input.identityDiscontinuity === 'unassessed') didMissing.push('Nieoceniona ciągłość tożsamości i obecność odrębnych stanów');
  if (input.amnesiaType === 'unassessed') didMissing.push('Nieoceniony profil amnezji dysocjacyjnej');
  else if (hasDistinctStates && input.amnesiaType === 'none') didMissing.push('Obiektywizacja luk pamięciowych (ocena pod kątem amnezji na amnezję)');
  if (functionalUnassessed) didMissing.push('Nieoceniony stopień dystresu / upośledzenia funkcjonowania (kryterium C)');
  if (neuroAssessment.exclusionStatus === 'unresolved') didMissing.push('Nierozstrzygnięte podejrzenie padaczki skroniowej (wymaga ukończenia diagnostyki TLE)');

  const didDataSufficient =
    input.identityDiscontinuity !== 'unassessed' &&
    input.amnesiaType !== 'unassessed' &&
    !functionalUnassessed &&
    (hasDistinctStates
      ? (hasEverydayAmnesia || hasTraumaAmnesia) && neuroAssessment.exclusionStatus !== 'unresolved'
      : true);

  let didLevel: DiagnosticHypothesis['level'] = 'unlikely_or_incompatible';
  let didConfidence: DiagnosticHypothesis['confidence'] = 'low';

  if (hasDistinctStates) {
    if (didDataSufficient && (hasEverydayAmnesia || hasTraumaAmnesia) && hasFunctionalImpairmentOrDistress &&
        input.realityTesting === 'intact' && !sub.activeIntoxicationOrWithdrawal && neuroAssessment.exclusionStatus === 'none') {
      didLevel = 'primary_candidate';
      didConfidence = hasEverydayAmnesia ? 'high' : 'moderate';
    } else {
      didLevel = 'possible_consideration';
      didConfidence = 'moderate';
    }
  }

  hypotheses.push({
    condition: 'Dysocjacyjne zaburzenie tożsamości (DID, ICD-11 6B64)',
    category: 'DID',
    level: didLevel,
    confidence: didConfidence,
    dataSufficiency: didDataSufficient ? 'sufficient' : 'insufficient',
    supportingEvidence: supporting.DID,
    opposingEvidence: opposing.DID,
    missingCriticalInformation: didMissing,
    rationale: didLevel === 'primary_candidate'
      ? 'Obecność odrębnych stanów tożsamości z przerwaniem ciągłości sprawczości, amnezją autobiograficzną oraz istotnym dystresem/upośledzeniem funkcjonowania.'
      : hasDistinctStates
      ? 'Obecne rozbicie tożsamości, lecz wymaga obiektywizacji amnezji, oceny upośledzenia i wykluczenia przyczyn neurologicznych/substancyjnych.'
      : 'Brak autonomicznych stanów tożsamości wyklucza pełnoobjawowe DID.',
  });

  // B. cPTSD vs PTSD
  const traumaDataSufficient = reExp !== 'unassessed' && avoidance !== 'unassessed' && threat !== 'unassessed';

  if (hasCorePTSD && hasFunctionalImpairmentOrDistress) {
    if (hasFullDSO) {
      hypotheses.push({
        condition: 'Złożony zespół stresu pourazowego (cPTSD, ICD-11 6B41)',
        category: 'cPTSD',
        level: 'primary_candidate',
        confidence: traumaDataSufficient ? 'high' : 'moderate',
        dataSufficiency: traumaDataSufficient ? 'sufficient' : 'insufficient',
        supportingEvidence: supporting.cPTSD,
        opposingEvidence: opposing.cPTSD,
        missingCriticalInformation: [],
        rationale: 'Rdzeń PTSD (ponowne przeżywanie w teraźniejszości, unikanie, poczucie zagrożenia) wraz z kompletną triadą DSO i upośledzeniem funkcjonowania.',
      });
    } else {
      hypotheses.push({
        condition: 'Zespół stresu pourazowego (PTSD, ICD-11 6B40)',
        category: 'PTSD',
        level: 'primary_candidate',
        confidence: traumaDataSufficient ? 'high' : 'moderate',
        dataSufficiency: traumaDataSufficient ? 'sufficient' : 'insufficient',
        supportingEvidence: supporting.PTSD,
        opposingEvidence: opposing.PTSD,
        missingCriticalInformation: [],
        rationale: 'Klasyczna triada ICD-11: re-experiencing w teraźniejszości, unikanie i wzmożone poczucie zagrożenia bez pełnej triady DSO.',
      });
      if (hasDsoAffect || hasDsoSelf || hasDsoRelational) {
        hypotheses.push({
          condition: 'Złożony zespół stresu pourazowego (cPTSD, ICD-11 6B41)',
          category: 'cPTSD',
          level: 'possible_consideration',
          confidence: 'moderate',
          dataSufficiency: traumaDataSufficient ? 'sufficient' : 'insufficient',
          supportingEvidence: supporting.cPTSD,
          opposingEvidence: opposing.cPTSD,
          missingCriticalInformation: ['Niekompletna triada DSO – obecne jedynie pojedyncze domeny jaźni.'],
          rationale: 'Obecny rdzeń PTSD oraz pojedyncze elementy DSO; wymaga monitorowania pełnej triady zaburzeń organizacji jaźni.',
        });
      }
    }
  }

  // C. BPD Hypothesis
  const bpdDataSufficient = relational.abandonmentSensitivity !== 'unassessed' && affect.reactiveLability !== 'unassessed';
  const bpdLevel: DiagnosticHypothesis['level'] = bpdConverges && !hasDistinctStates ? 'primary_candidate' : bpdPartial ? 'possible_consideration' : 'unlikely_or_incompatible';

  hypotheses.push({
    condition: 'Zaburzenie osobowości typu borderline (BPD)',
    category: 'BPD',
    level: bpdLevel,
    confidence: bpdDataSufficient && bpdLevel === 'primary_candidate' ? 'high' : 'moderate',
    dataSufficiency: bpdDataSufficient ? 'sufficient' : 'insufficient',
    supportingEvidence: supporting.BPD,
    opposingEvidence: opposing.BPD,
    missingCriticalInformation: bpdDataSufficient ? [] : ['Nieoceniony pełny profil relacyjny i regulacji afektu'],
    rationale: bpdLevel === 'primary_candidate'
      ? 'Wyraźny profil niestabilności afektywnej, wrażliwości na porzucenie i relacji bez autonomicznych alter-stanów tożsamości.'
      : bpdPartial
      ? 'Obecne wybrane cechy niestabilności afektywnej lub relacyjnej bez pełnej konwergencji cech borderline.'
      : 'Brak konwergencji cech niestabilności afektywnej i relacyjnej.',
  });

  // D. DPDR Hypothesis
  if (input.depersonalizationDerealization) {
    const dpdrLevel = input.realityTesting === 'intact' ? 'primary_candidate' : 'possible_consideration';
    hypotheses.push({
      condition: 'Zespół depersonalizacji-derealizacji (DPDR)',
      category: 'DPDR',
      level: dpdrLevel,
      confidence: dpdrLevel === 'primary_candidate' ? 'high' : 'moderate',
      dataSufficiency: 'sufficient',
      supportingEvidence: ['Dominujące poczucie obcości ciała lub otoczenia z zachowanym krytycyzmem'],
      opposingEvidence: [],
      missingCriticalInformation: [],
      rationale: 'Uporczywe poczucie odrealnienia przy w pełni zachowanym testowaniu rzeczywistości.',
    });
  }

  // E. TLE Hypothesis
  const tleDataSufficient = neuroAssessment.missingCriticalInformation.length === 0;
  const tleLevel: DiagnosticHypothesis['level'] = neuroAssessment.concern !== 'low' ? 'possible_consideration' : 'unlikely_or_incompatible';
  hypotheses.push({
    condition: 'Diagnostyka w kierunku padaczki skroniowej (TLE)',
    category: 'TLE',
    level: tleLevel,
    confidence: neuroAssessment.concern === 'high' ? 'moderate' : 'low',
    dataSufficiency: tleDataSufficient ? 'sufficient' : 'insufficient',
    supportingEvidence: neuroAssessment.supportingFeatures,
    opposingEvidence: neuroAssessment.opposingFeatures,
    missingCriticalInformation: neuroAssessment.missingCriticalInformation,
    rationale: tleLevel === 'possible_consideration'
      ? 'Cechy paroksyzmalne, aura lub stereotypowość wymagają obiektywizacji neurologicznej przed zamknięciem psychogennym.'
      : 'Brak cech sugerujących napadowy charakter padaczkowy.',
  });

  // F. Psychosis Hypothesis
  const psychAxesDataSufficient = psychAxes && psychAxes.realityTesting !== 'unassessed' && psychAxes.delusions.presence !== 'unassessed';
  const psychosisCoreConvergence =
    (hasImpairedReality && (hasFixedDelusions || hasThoughtDisorder)) ||
    (voice?.present && voice.conviction === 'fixed_external_attribution' && (hasThoughtDisorder || hasNegativeSymptoms || hasFunctionalDecline));

  const psychLevel: DiagnosticHypothesis['level'] = psychosisCoreConvergence
    ? 'primary_candidate'
    : hasImpairedReality || hasFixedDelusions || hasThoughtDisorder || voice?.conviction === 'fixed_external_attribution'
    ? 'possible_consideration'
    : 'unlikely_or_incompatible';

  hypotheses.push({
    condition: 'Pierwotne zaburzenie psychotyczne (Schizofrenia / Zaburzenie urojeniowe)',
    category: 'Psychosis',
    level: psychLevel,
    confidence: psychLevel === 'primary_candidate' && psychAxesDataSufficient ? 'high' : 'moderate',
    dataSufficiency: psychAxesDataSufficient ? 'sufficient' : 'insufficient',
    supportingEvidence: supporting.Psychosis,
    opposingEvidence: opposing.Psychosis,
    missingCriticalInformation: psychAxesDataSufficient ? [] : ['Brak pełnej oceny osi psychozy (krytycyzm, urojenia, tok myślenia, objawy negatywne)'],
    rationale: psychLevel === 'primary_candidate'
      ? 'Konwergencja utraty krytycyzmu z utrwalonymi urojeniami lub formalnymi zaburzeniami toku myślenia.'
      : psychLevel === 'possible_consideration'
      ? 'Pojedyncze zjawiska psychotyczne lub dysocjacyjne omamy; brak pełnej konwergencji osi psychozy.'
      : 'Zachowane testowanie rzeczywistości bez cech procesu psychotycznego.',
  });

  // Missing info aggregation
  for (const hyp of hypotheses) {
    for (const item of hyp.missingCriticalInformation) {
      if (!missingInfo.includes(item)) missingInfo.push(item);
    }
  }

  // 10. COUNTERFACTUAL WHAT WOULD CHANGE DECISION (Softer reasoning)
  whatChanges.push('Pojawienie się aury nadbrzusznej lub krótkotrwałych, stereotypowych epizodów podnosi priorytet diagnostyki neurologicznej (TLE) i zawiesza ostateczne rozpoznanie zaburzeń dysocjacyjnych jako nierozstrzygnięte wykluczenie.');
  whatChanges.push('Utrata wglądu w subiektywny charakter głosów i pojawienie się utrwalonych urojeń ksobnych silnie przesuwa proces diagnostyczny w stronę spektrum psychotycznego.');
  whatChanges.push('Brak ponownego przeżywania z jakością tu i teraz (jedynie dystresujące wspomnienia) sprawia, że obraz nie spełnia pełnych kryteriów ICD-11 dla PTSD.');
  whatChanges.push('Prawidłowe wyniki EEG i MRI głowy NIE potwierdzają zaburzenia dysocjacyjnego ani nie wykluczają definitywnie padaczki skroniowej (zgodnie z NICE NG217).');
  whatChanges.push('Obiektywne potwierdzenie nawracającej amnezji codziennej (time loss) dostarcza kluczowego kryterium amnezji dysocjacyjnej, znacząco wzmacniając spójność z kryteriami ICD-11 6B64 i DSM-5-TR (przy braku przyczyn organicznych).');

  const candidateHypotheses = hypotheses.filter((h) => h.level !== 'unlikely_or_incompatible');
  const overallDataSufficiency =
    candidateHypotheses.length === 0 || candidateHypotheses.some((h) => h.dataSufficiency === 'insufficient')
      ? candidateHypotheses.length > 0 && candidateHypotheses.some((h) => h.dataSufficiency === 'sufficient')
        ? 'partial'
        : 'insufficient'
      : 'sufficient';

  return {
    redFlags,
    overallDataSufficiency,
    supportingEvidence: supporting,
    opposingEvidence: opposing,
    missingInformation: missingInfo,
    hypotheses,
    frameworkAnalysis,
    neurologicalAssessment: neuroAssessment,
    whatWouldChangeDecision: whatChanges,
    safetyActionRequired: safetyAction,
  };
}
