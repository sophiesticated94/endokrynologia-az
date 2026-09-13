export type IdentityDiscontinuity = 'none' | 'disturbed_sense_of_self' | 'distinct_personality_states';
export type AmnesiaType = 'none' | 'trauma_specific' | 'recurrent_daily_activities' | 'generalized_identity_loss' | 'brief_paroxysmal';
export type RealityTesting = 'intact' | 'impaired_delusional' | 'transient_stress_induced';
export type TraumaIntrusions = 'none' | 'distressing_memories' | 'flashbacks_acting_as_if';
export type AffectInstability = 'none' | 'rapid_reactive_hours' | 'sustained_weeks';
export type InterpersonalPattern = 'stable' | 'intense_fear_of_abandonment' | 'alienated_avoidant';
export type HallucinationType = 'none' | 'internal_dialogue_ego_dystonic' | 'external_commentary_ego_syntonic' | 'hypnagogic_or_sensory';
export type SymptomDuration = 'days_under_3' | 'days_under_30' | 'chronic_months' | 'brief_episodes_seconds';
export type SuicidalityRisk = 'none' | 'passive_ideation' | 'active_with_intent' | 'recent_severe_self_harm';

export interface NeurologicalFeatures {
  hasAuraOrEpigastricRising?: boolean;
  stereotypedSecondsDuration?: boolean;
  postictalConfusion?: boolean;
  focalDeficits?: boolean;
}

export interface SubstanceContext {
  activeIntoxicationOrWithdrawal?: boolean;
  onsetDirectlyTiedToSubstance?: boolean;
  substanceDetails?: string;
}

export interface TraumaDissociationInput {
  identityDiscontinuity: IdentityDiscontinuity;
  amnesiaType: AmnesiaType;
  depersonalizationDerealization: boolean;
  realityTesting: RealityTesting;
  traumaIntrusions: TraumaIntrusions;
  avoidanceHyperarousal: boolean;
  affectInstability: AffectInstability;
  interpersonalPattern: InterpersonalPattern;
  hallucinations: HallucinationType;
  thoughtDisorder: boolean;
  symptomDuration: SymptomDuration;
  neurologicalFeatures?: NeurologicalFeatures;
  substanceContext?: SubstanceContext;
  suicidalityRisk: SuicidalityRisk;
}

export interface DiagnosticHypothesis {
  condition: string;
  category: 'DID' | 'BPD' | 'PTSD' | 'cPTSD' | 'DPDR' | 'DissociativeAmnesia' | 'Psychosis' | 'TLE' | 'SubstanceInduced';
  level: 'primary_candidate' | 'possible_consideration' | 'unlikely_or_incompatible';
  rationale: string;
}

export interface TraumaDissociationOutput {
  redFlags: string[];
  supportingEvidence: Record<string, string[]>;
  opposingEvidence: Record<string, string[]>;
  missingInformation: string[];
  hypotheses: DiagnosticHypothesis[];
  whatWouldChangeDecision: string[];
  safetyActionRequired: string | null;
}

export function evaluateTraumaDissociation(input: TraumaDissociationInput): TraumaDissociationOutput {
  const redFlags: string[] = [];
  const supporting: Record<string, string[]> = {
    DID: [],
    BPD: [],
    PTSD: [],
    cPTSD: [],
    DPDR: [],
    DissociativeAmnesia: [],
    Psychosis: [],
    TLE: [],
    SubstanceInduced: [],
  };
  const opposing: Record<string, string[]> = {
    DID: [],
    BPD: [],
    PTSD: [],
    cPTSD: [],
    DPDR: [],
    DissociativeAmnesia: [],
    Psychosis: [],
    TLE: [],
    SubstanceInduced: [],
  };
  const missingInfo: string[] = [];
  const whatChanges: string[] = [];

  // 1. NEUROLOGICAL RED FLAGS & SAFETY
  const neuro = input.neurologicalFeatures || {};
  if (neuro.hasAuraOrEpigastricRising || neuro.stereotypedSecondsDuration || input.symptomDuration === 'brief_episodes_seconds') {
    redFlags.push(
      'Czerwona flaga neurologiczna: napadowe, stereotypowe epizody (30–120 s) lub aura nadbrzuszna wymagają wykluczenia padaczki płata skroniowego (EEG, MRI) przed postawieniem diagnozy dysocjacyjnej.'
    );
    supporting.TLE.push('Stereotypowy, kilkudziesięciosekundowy czas trwania epizodów odrealnienia');
    if (neuro.hasAuraOrEpigastricRising) {
      supporting.TLE.push('Aura nadbrzuszna (uczucie wznoszenia z żołądka) typowa dla ognisk skroniowych');
    }
  } else {
    opposing.TLE.push('Brak cech paroksyzmalnych, brak aury i stereotypowego krótkiego przebiegu');
  }

  if (neuro.focalDeficits) {
    redFlags.push('Ogniskowe objawy neurologiczne – bezwzględne wskazanie do pilnego obrazowania OUN (MRI/TK).');
  }

  // 2. SUICIDALITY & CRISIS
  let safetyAction: string | null = null;
  if (input.suicidalityRisk === 'active_with_intent') {
    redFlags.push('Aktywne myśli samobójcze z zamiarem i planem – bezpośrednie zagrożenie życia.');
    safetyAction = 'Natychmiastowe wdrożenie planu bezpieczeństwa (Stanley-Brown) lub kwalifikacja do pilnej hospitalizacji. Bezwzględny zakaz technik ekspozycyjnych i konfrontacyjnych.';
  } else if (input.suicidalityRisk === 'recent_severe_self_harm') {
    redFlags.push('Niedawne ciężkie samouszkodzenia – priorytet stabilizacji i regulacji emocji (DBT).');
    safetyAction = 'Priorytet Fazy 1 leczenia (bezpieczeństwo, redukcja szkód). Odroczenie pogłębionej pracy z traumą.';
  }

  // 3. SUBSTANCE CONTEXT
  const sub = input.substanceContext || {};
  if (sub.activeIntoxicationOrWithdrawal) {
    redFlags.push('Aktywna intoksykacja lub zespół odstawienny – objawy mogą mieć charakter bezpośrednio substancyjny.');
    supporting.SubstanceInduced.push('Zbieżność czasowa objawów z ekspozycją na substancję psychoaktywną');
    opposing.DID.push('Objawy występujące wyłącznie w trakcie intoksykacji/odstawienia nie uprawniają do diagnozy DID');
  } else if (sub.onsetDirectlyTiedToSubstance) {
    supporting.SubstanceInduced.push('Początek dolegliwości bezpośrednio po zażyciu substancji (np. kannabinoidy, dysocjanty)');
  }

  // 4. DID (Dissociative Identity Disorder) EVALUATION
  if (input.identityDiscontinuity === 'distinct_personality_states') {
    supporting.DID.push('Odrębne stany tożsamości z przerwaniem poczucia ciągłości ja i sprawczości (disruption of identity)');
  } else if (input.identityDiscontinuity === 'disturbed_sense_of_self') {
    opposing.DID.push('Niestabilny obraz siebie bez odrębnych stanów tożsamości wskazuje na zaburzenie osobowości, a nie DID');
  } else {
    opposing.DID.push('Brak zaburzenia tożsamości uniemożliwia rozpoznanie DID');
  }

  if (input.amnesiaType === 'recurrent_daily_activities') {
    supporting.DID.push('Nawracające luki w pamięci bieżących zdarzeń codziennych (everyday amnesia, time loss)');
    supporting.DissociativeAmnesia.push('Udokumentowane luki pamięciowe nie do wytłumaczenia zwykłym zapominaniem');
  } else if (input.amnesiaType === 'trauma_specific') {
    supporting.PTSD.push('Amnezja dysocjacyjna ograniczona do aspektów traumy');
    supporting.DissociativeAmnesia.push('Amnezja zlokalizowana/selektywna wobec wydarzenia urazowego');
    opposing.DID.push('Brak amnezji wobec bieżących zdarzeń codziennych osłabia hipotezę DID');
  } else if (input.amnesiaType === 'none') {
    opposing.DID.push('Brak luk w pamięci autobiograficznej (brak amnezji) wyklucza pełnoobjawowe DID wg ICD-11 / DSM-5-TR');
    opposing.DissociativeAmnesia.push('Brak amnezji wyklucza zaburzenie amnezyjne');
  }

  // 5. BPD (Borderline Personality Disorder) EVALUATION
  if (input.interpersonalPattern === 'intense_fear_of_abandonment') {
    supporting.BPD.push('Paniczny lęk przed porzuceniem i gwałtowne wysiłki zapobiegające osamotnieniu');
  }
  if (input.affectInstability === 'rapid_reactive_hours') {
    supporting.BPD.push('Reaktywna, gwałtowna chwiejność afektu w skali godzin (dysforia, lęk, drażliwość)');
  }
  if (input.identityDiscontinuity === 'disturbed_sense_of_self') {
    supporting.BPD.push('Niestabilność obrazu własnego ja i celów życiowych bez wyodrębnienia odrębnych alterów');
  }
  if (input.realityTesting === 'transient_stress_induced') {
    supporting.BPD.push('Przemijające, indukowane skrajnym stresem relacyjnym objawy dysocjacyjne lub paranoiczne');
  }
  if (input.identityDiscontinuity === 'distinct_personality_states' && input.amnesiaType === 'recurrent_daily_activities') {
    opposing.BPD.push('Odrębne stany tożsamości ze switchingiem i amnezją codzienną wykraczają poza profil BPD (wskazują na DID)');
  }

  // 6. PTSD & cPTSD EVALUATION
  if (input.traumaIntrusions === 'flashbacks_acting_as_if') {
    supporting.PTSD.push('Dysocjacyjne intruzje (flashbacks: przeżywanie traumy w tu i teraz z utratą orientacji)');
    supporting.cPTSD.push('Ciężkie intruzje pourazowe spełniające kryteria osi intruzji');
  } else if (input.traumaIntrusions === 'distressing_memories') {
    supporting.PTSD.push('Natrętne, dystresujące wspomnienia traumatyczne');
    supporting.cPTSD.push('Natrętne wspomnienia spełniające kryterium intruzji');
  } else {
    opposing.PTSD.push('Brak intruzji traumatycznych wyklucza rozpoznanie PTSD');
    opposing.cPTSD.push('Brak osi intruzji wyklucza cPTSD');
  }

  if (input.avoidanceHyperarousal) {
    supporting.PTSD.push('Współistnienie aktywnego unikania bodźców urazowych oraz wzmożonego wzbudzenia');
    supporting.cPTSD.push('Obecność unikania i wzmożonej czujności');
  }

  // Complex PTSD: PTSD + DSO Triad (Affect, Self-concept, Relationships)
  if (
    input.traumaIntrusions !== 'none' &&
    input.avoidanceHyperarousal &&
    input.interpersonalPattern === 'alienated_avoidant' &&
    input.affectInstability !== 'none'
  ) {
    supporting.cPTSD.push('Współwystępowanie triady PTSD z triadą zaburzeń organizacji jaźni (DSO: afekt, relacje, obraz siebie)');
  }

  // 7. DPDR (Depersonalization/Derealization Disorder)
  if (input.depersonalizationDerealization) {
    if (input.realityTesting === 'intact') {
      supporting.DPDR.push('Uporczywe poczucie obcości ciała/otoczenia przy w pełni zachowanym testowaniu rzeczywistości (intact reality testing)');
    } else {
      opposing.DPDR.push('Zaburzone testowanie rzeczywistości (przekonanie urojeniowe o nieistnieniu świata) wskazuje na psychozę, nie DPDR');
    }
  } else {
    opposing.DPDR.push('Brak dominujących objawów depersonalizacji ani derealizacji');
  }

  // 8. PSYCHOSIS vs DISSOCIATION
  if (input.realityTesting === 'impaired_delusional' || input.thoughtDisorder) {
    supporting.Psychosis.push('Utrata testowania rzeczywistości / formalne zaburzenia toku myślenia');
    opposing.DID.push('Urojeniowe przypisanie głosów obcym siłom/owładnięciu wskazuje na pierwotną psychozę');
    opposing.DPDR.push('Utrata krytycyzmu wyklucza proste zaburzenie depersonalizacyjne');
  }

  if (input.hallucinations === 'external_commentary_ego_syntonic') {
    supporting.Psychosis.push('Głosy słyszane w przestrzeni zewnętrznej, bezkrytyczne lub komentujące');
  } else if (input.hallucinations === 'internal_dialogue_ego_dystonic') {
    supporting.DID.push('Złożony dialog wewnętrzny między stanami jaźni (często mylnie brany za objaw Schneiderowski)');
    opposing.Psychosis.push('Wewnętrzne głosy z zachowanym krytycyzmem i złożonym dialogiem tożsamości nie są dowodem schizofrenii');
  }

  // 9. MISSING INFORMATION DETECTION
  if (input.identityDiscontinuity === 'distinct_personality_states' && input.amnesiaType === 'none') {
    missingInfo.push('Wymagana pogłębiona eksploracja amnezji: czy pacjent odkrywa nieznane przedmioty, ubrania lub notatki (dowody time loss)?');
  }
  if (input.hallucinations !== 'none' && input.realityTesting === 'intact' && !input.thoughtDisorder) {
    missingInfo.push('Ocena fenomenologii omamów: czy głosy mają treść złożoną tożsamościowo i czy lokalizują się wewnątrz głowy vs na zewnątrz?');
  }
  if (neuro.hasAuraOrEpigastricRising === undefined && input.symptomDuration === 'brief_episodes_seconds') {
    missingInfo.push('Brak danych o aurze (węchowej, smakowej, nadbrzusznej) przy napadowych objawach.');
  }
  if (!sub.substanceDetails && sub.onsetDirectlyTiedToSubstance) {
    missingInfo.push('Konieczny dokładny panel toksykologiczny (kannabinoidy, dysocjanty, syntetyczne katynony).');
  }

  // 10. COUNTERFACTUAL WHAT WOULD CHANGE DECISION
  whatChanges.push(
    'Gdyby wykluczyć nawracające luki w pamięci autobiograficznej (amnezję codzienną), diagnoza DID staje się nieuprawniona, a obraz odpowiada BPD lub PTSD z cechami dysocjacyjnymi.'
  );
  whatChanges.push(
    'Gdyby epizody odrealnienia trwały ściśle 30–60 sekund z mlaskaniem lub aurą nadbrzuszną, hipoteza TLE bierze bezwzględny priorytet diagnostyczny nad etiologią psychogenną.'
  );
  whatChanges.push(
    'Gdyby pacjent z DPDR utracił krytycyzm i uznał, że jego ciało rzeczywiście uległo rozkładowi lub świat nie istnieje, rozpoznaniem staje się zespół urojeniowy/psychoza (np. zespół Cotarda).'
  );
  whatChanges.push(
    'Prawidłowe wyniki EEG i MRI nie stanowią „potwierdzenia” DID – diagnoza dysocjacyjna wymaga spełnienia kryteriów pozytywnych, nie tylko wykluczenia neurologicznego.'
  );

  // 11. HYPOTHESES SYNTHESIS
  const hypotheses: DiagnosticHypothesis[] = [];

  // DID Evaluation
  if (input.identityDiscontinuity === 'distinct_personality_states' && input.amnesiaType === 'recurrent_daily_activities') {
    hypotheses.push({
      condition: 'Dysocjacyjne zaburzenie tożsamości (DID)',
      category: 'DID',
      level: 'primary_candidate',
      rationale: 'Obecność odrębnych stanów tożsamości połączona z nawracającą amnezją codziennych zdarzeń spełnia kluczowe kryteria ICD-11 i DSM-5-TR.',
    });
  } else if (input.identityDiscontinuity === 'distinct_personality_states' || input.amnesiaType === 'recurrent_daily_activities') {
    hypotheses.push({
      condition: 'Dysocjacyjne zaburzenie tożsamości (DID)',
      category: 'DID',
      level: 'possible_consideration',
      rationale: 'Występują pojedyncze osie dysocjacji tożsamościowej, ale niepełny obraz amnezji lub tożsamości wymaga dalszej weryfikacji.',
    });
  } else {
    hypotheses.push({
      condition: 'Dysocjacyjne zaburzenie tożsamości (DID)',
      category: 'DID',
      level: 'unlikely_or_incompatible',
      rationale: 'Brak odrębnych stanów tożsamości lub brak amnezji wyklucza pełne kryteria DID.',
    });
  }

  // BPD Evaluation
  if (
    input.interpersonalPattern === 'intense_fear_of_abandonment' &&
    input.affectInstability === 'rapid_reactive_hours' &&
    input.identityDiscontinuity !== 'distinct_personality_states'
  ) {
    hypotheses.push({
      condition: 'Zaburzenie osobowości typu borderline (BPD)',
      category: 'BPD',
      level: 'primary_candidate',
      rationale: 'Dominujący lęk przed porzuceniem, wysoka reaktywność afektu i niestabilność tożsamości bez odrębnych alterów i bez amnezji codziennej.',
    });
  } else if (input.interpersonalPattern === 'intense_fear_of_abandonment' || input.affectInstability === 'rapid_reactive_hours') {
    hypotheses.push({
      condition: 'Cechy osobowości borderline / BPD',
      category: 'BPD',
      level: 'possible_consideration',
      rationale: 'Obecne cechy niestabilności afektywnej lub relacyjnej, konieczna ocena wymiarowa ICD-11.',
    });
  }

  // PTSD / cPTSD
  if (input.traumaIntrusions !== 'none' && input.avoidanceHyperarousal) {
    if (input.interpersonalPattern === 'alienated_avoidant' && input.affectInstability !== 'none') {
      hypotheses.push({
        condition: 'Złożony zespół stresu pourazowego (cPTSD wg ICD-11)',
        category: 'cPTSD',
        level: 'primary_candidate',
        rationale: 'Pełna triada PTSD powiązana z triadą zaburzeń organizacji jaźni (DSO) po przewlekłej traumie.',
      });
    } else {
      hypotheses.push({
        condition: 'Zespół stresu pourazowego (PTSD)',
        category: 'PTSD',
        level: 'primary_candidate',
        rationale: 'Klasyczna triada: intruzje (re-experiencing), unikanie bodźców i wzmożone wzbudzenie (hyperarousal).',
      });
    }
  }

  // DPDR
  if (input.depersonalizationDerealization && input.realityTesting === 'intact') {
    hypotheses.push({
      condition: 'Zespół depersonalizacji-derealizacji (DPDR)',
      category: 'DPDR',
      level: 'primary_candidate',
      rationale: 'Dominujące poczucie obcości i odrealnienia z pełnym krytycyzmem i bez formalnych zaburzeń myślenia.',
    });
  }

  // TLE
  if (neuro.hasAuraOrEpigastricRising || input.symptomDuration === 'brief_episodes_seconds') {
    hypotheses.push({
      condition: 'Padaczka płata skroniowego (TLE) – maska neurologiczna',
      category: 'TLE',
      level: 'primary_candidate',
      rationale: 'Krótki, paroksyzmalny charakter napadów z aurą wymaga priorytetowej diagnostyki neurologicznej.',
    });
  }

  // Psychosis
  if (input.realityTesting === 'impaired_delusional' || input.thoughtDisorder) {
    hypotheses.push({
      condition: 'Pierwotne zaburzenie psychotyczne (Schizofrenia / Zaburzenie urojeniowe)',
      category: 'Psychosis',
      level: 'primary_candidate',
      rationale: 'Utrata testowania rzeczywistości i formalne zaburzenia toku myślenia.',
    });
  }

  return {
    redFlags,
    supportingEvidence: supporting,
    opposingEvidence: opposing,
    missingInformation: missingInfo,
    hypotheses,
    whatWouldChangeDecision: whatChanges,
    safetyActionRequired: safetyAction,
  };
}
