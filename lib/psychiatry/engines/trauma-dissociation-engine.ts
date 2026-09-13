export type IdentityDiscontinuity = 'none' | 'disturbed_sense_of_self' | 'distinct_personality_states';
export type AmnesiaType = 'none' | 'trauma_specific' | 'recurrent_daily_activities' | 'generalized_identity_loss' | 'brief_paroxysmal';
export type RealityTesting = 'intact' | 'impaired_delusional' | 'transient_stress_induced';
export type TraumaIntrusions = 'none' | 'distressing_memories' | 'flashbacks_acting_as_if';
export type AffectInstability = 'none' | 'rapid_reactive_hours' | 'sustained_weeks';
export type NegativeSelfConcept =
  | 'none'
  | 'persistent_shame_guilt'
  | 'worthlessness_failure'
  | 'trauma_related_negative_identity';
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
  negativeSelfConcept: NegativeSelfConcept;
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
      'Wskazanie do pilnego workupu neurologicznego: napadowe, stereotypowe epizody (30–120 s) lub aura nadbrzuszna wymagają wykluczenia padaczki płata skroniowego (EEG, MRI głowy) przed przypisaniem objawów pierwotnej dysocjacji.'
    );
    supporting.TLE.push('Krótkotrwały, napadowy lub stereotypowy przebieg epizodów przemawiający za koniecznością diagnostyki neurologicznej');
    if (neuro.hasAuraOrEpigastricRising) {
      supporting.TLE.push('Aura nadbrzuszna lub czuciowa jako silny wskaźnik ogniska skroniowego');
    }
  } else {
    opposing.TLE.push('Brak cech paroksyzmalnych, brak aury i brak stereotypowego przebiegu zmniejsza prawdopodobieństwo padaczki skroniowej');
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
    supporting.SubstanceInduced.push('Początek dolegliwości bezpośrednio powiązany ze spożyciem substancji (np. kannabinoidy, dysocjanty)');
  }

  // 4. DID (Dissociative Identity Disorder, ICD-11 6B64) EVALUATION
  if (input.identityDiscontinuity === 'distinct_personality_states') {
    supporting.DID.push('Odrębne stany tożsamości z przerwaniem poczucia ciągłości ja i sprawczości (disruption of identity)');
  } else if (input.identityDiscontinuity === 'disturbed_sense_of_self') {
    opposing.DID.push('Niestabilny obraz siebie bez odrębnych stanów wykonawczych wskazuje raczej na profil zaburzeń osobowości (BPD), a nie DID');
  } else {
    opposing.DID.push('Brak rozbicia tożsamości uniemożliwia rozpoznanie DID wg kryteriów ICD-11 6B64 / DSM-5-TR');
  }

  if (input.amnesiaType === 'recurrent_daily_activities') {
    supporting.DID.push('Nawracające luki w pamięci bieżących zdarzeń codziennych (everyday amnesia / time loss)');
    supporting.DissociativeAmnesia.push('Udokumentowane luki pamięciowe niewytłumaczalne zwykłym zapominaniem');
  } else if (input.amnesiaType === 'trauma_specific') {
    supporting.PTSD.push('Amnezja dysocjacyjna ograniczona do aspektów urazu');
    supporting.DissociativeAmnesia.push('Amnezja zlokalizowana/selektywna wobec wydarzenia urazowego');
    opposing.DID.push('Brak udokumentowanej amnezji codziennych zdarzeń osłabia rozpoznanie pełnoobjawowego DID');
  } else if (input.amnesiaType === 'none') {
    opposing.DID.push('Brak luk w pamięci autobiograficznej (brak amnezji) wyklucza pełnoobjawowe DID wg ICD-11 6B64 / DSM-5-TR');
    opposing.DissociativeAmnesia.push('Brak amnezji wyklucza zaburzenie amnezyjne');
  }

  // 5. BPD EVALUATION & DISSOCIATION
  if (input.interpersonalPattern === 'intense_fear_of_abandonment') {
    supporting.BPD.push('Paniczny lęk przed porzuceniem i gwałtowne wysiłki zapobiegające osamotnieniu');
  }
  if (input.affectInstability === 'rapid_reactive_hours') {
    supporting.BPD.push('Reaktywna, gwałtowna chwiejność afektu w skali godzin (dysforia, lęk, drażliwość)');
  }
  if (input.identityDiscontinuity === 'disturbed_sense_of_self') {
    supporting.BPD.push('Niestabilność obrazu własnego ja i celów bez wyodrębnienia odrębnych stanów alter');
  }
  if (input.realityTesting === 'transient_stress_induced') {
    supporting.BPD.push('Przemijające, indukowane stresem objawy dysocjacyjne lub paranoiczne (typowy element profilu BPD)');
  }
  if (input.identityDiscontinuity === 'distinct_personality_states' && input.amnesiaType === 'recurrent_daily_activities') {
    opposing.BPD.push('Odrębne stany tożsamości z nawracającą amnezją codzienną wykraczają poza typowy profil BPD (wskazują na DID)');
  }

  // 6. PTSD & cPTSD EVALUATION (DSO TRIAD REQUIREMENT)
  const hasCorePTSD = input.traumaIntrusions !== 'none' && input.avoidanceHyperarousal;
  if (input.traumaIntrusions === 'flashbacks_acting_as_if') {
    supporting.PTSD.push('Dysocjacyjne intruzje pourazowe (flashbacks)');
    supporting.cPTSD.push('Intruzje urazowe spełniające kryterium ponownego przeżywania');
  } else if (input.traumaIntrusions === 'distressing_memories') {
    supporting.PTSD.push('Natrętne, dystresujące wspomnienia urazowe');
    supporting.cPTSD.push('Natrętne wspomnienia spełniające kryterium intruzji');
  } else {
    opposing.PTSD.push('Brak intruzji urazowych uniemożliwia rozpoznanie PTSD');
    opposing.cPTSD.push('Brak osi intruzji wyklucza rozpoznanie cPTSD');
  }

  if (input.avoidanceHyperarousal) {
    supporting.PTSD.push('Współistnienie aktywnego unikania bodźców urazowych oraz wzmożonej czujności');
    supporting.cPTSD.push('Obecność unikania bodźców i stanu wzmożonej czujności');
  } else {
    opposing.PTSD.push('Brak unikania lub wzmożonego wzbudzenia osłabia rozpoznanie PTSD');
    opposing.cPTSD.push('Brak unikania lub wzmożonego wzbudzenia wyklucza rdzeń PTSD');
  }

  // DSO Triad: 1. Affect dysregulation, 2. Negative self-concept, 3. Relational disturbance
  const hasAffectDisturbance = input.affectInstability !== 'none';
  const hasNegativeSelfConcept = input.negativeSelfConcept !== 'none';
  const hasRelationalDisturbance = input.interpersonalPattern === 'alienated_avoidant';
  const hasFullDSO = hasAffectDisturbance && hasNegativeSelfConcept && hasRelationalDisturbance;

  if (hasCorePTSD && hasFullDSO) {
    supporting.cPTSD.push(
      'Kompletna triada zaburzeń organizacji jaźni (DSO: dysregulacja afektu, trwały negatywny obraz siebie, trudności relacyjne) towarzysząca rdzeniowi PTSD'
    );
  } else if (hasCorePTSD) {
    opposing.cPTSD.push(
      'Brak pełnej triady DSO (wymaga jednoczesnej dysregulacji afektu, trwałego negatywnego obrazu siebie i trudności relacyjnych) – obraz odpowiada klasycznemu PTSD'
    );
  }

  // 7. DPDR (Depersonalization/Derealization Disorder)
  if (input.depersonalizationDerealization) {
    if (input.realityTesting === 'intact') {
      supporting.DPDR.push('Uporczywe poczucie obcości ciała lub otoczenia przy w pełni zachowanym testowaniu rzeczywistości (intact reality testing)');
    } else {
      opposing.DPDR.push('Zaburzone testowanie rzeczywistości (przekonanie urojeniowe o obcości) wskazuje na zespół psychotyczny, a nie DPDR');
    }
  } else {
    opposing.DPDR.push('Brak dominujących objawów depersonalizacji ani derealizacji');
  }

  // 8. PSYCHOSIS vs DISSOCIATION (MULTIAXIAL & PROBABILISTIC)
  if (input.realityTesting === 'impaired_delusional' || input.thoughtDisorder) {
    supporting.Psychosis.push('Utrata testowania rzeczywistości lub formalne zaburzenia toku myślenia');
    opposing.DID.push('Urojeniowe przypisanie głosów obcym siłom z utratą krytycyzmu silniej wskazuje na pierwotną psychozę');
    opposing.DPDR.push('Utrata krytycyzmu wyklucza proste zaburzenie depersonalizacyjne');
  }

  if (input.hallucinations === 'external_commentary_ego_syntonic') {
    supporting.Psychosis.push('Głosy o lokalizacji zewnętrznej, komentujące, z osłabionym krytycyzmem');
    opposing.DID.push('Zewnętrzne omamy komentujące z urojeniową interpretacją silniej sugerują proces psychotyczny');
  } else if (input.hallucinations === 'internal_dialogue_ego_dystonic') {
    supporting.DID.push('Złożony dialog wewnętrzny między stanami jaźni (zjawisko częste w dysocjacji tożsamościowej)');
    opposing.Psychosis.push('Wewnętrzne głosy z zachowanym krytycyzmem i tożsamościowym dialogiem nie stanowią dowodu schizofrenii');
  }

  // 9. MISSING INFORMATION DETECTION
  if (input.identityDiscontinuity === 'distinct_personality_states' && input.amnesiaType === 'none') {
    missingInfo.push('Wymagana pogłębiona eksploracja amnezji codziennej: czy pacjent odkrywa nieznane przedmioty, ubrania lub notatki (dowody time loss)?');
  }
  if (input.hallucinations !== 'none' && input.realityTesting === 'intact' && !input.thoughtDisorder) {
    missingInfo.push('Ocena fenomenologii głosów: czy głosy mają charakter dialogu wewnętrznego części tożsamości, czy też omamów z przekonaniem urojeniowym?');
  }
  if (neuro.hasAuraOrEpigastricRising === undefined && input.symptomDuration === 'brief_episodes_seconds') {
    missingInfo.push('Brak danych o aurze (węchowej, smakowej, nadbrzusznej) przy napadowych objawach.');
  }
  if (!sub.substanceDetails && sub.onsetDirectlyTiedToSubstance) {
    missingInfo.push('Konieczny dokładny panel toksykologiczny (kannabinoidy, dysocjanty, syntetyczne katynony).');
  }
  if (hasCorePTSD && !hasFullDSO && (input.negativeSelfConcept === 'none' || input.interpersonalPattern !== 'alienated_avoidant')) {
    missingInfo.push('Ocena wymiarów DSO (obraz siebie, poczucie wstydu/porażki, relacje społeczne) w celu rozstrzygnięcia PTSD vs cPTSD.');
  }

  // 10. COUNTERFACTUAL WHAT WOULD CHANGE DECISION
  whatChanges.push(
    'Gdyby wykluczyć nawracające luki w pamięci autobiograficznej (amnezję codzienną), pełne rozpoznanie DID staje się nieuprawnione, a obraz kliniczny odpowiada raczej BPD lub PTSD z dysocjacją.'
  );
  whatChanges.push(
    'Gdyby epizody odrealnienia miały charakter ściśle napadowy (30–60 s) z aurą nadbrzuszną lub objawami ruchowymi, priorytetem staje się diagnostyka neurologiczna w kierunku padaczki (TLE).'
  );
  whatChanges.push(
    'Gdyby pacjent z objawami odrealnienia utracił krytycyzm i uznał, że jego ciało rzeczywiście uległo zniszczeniu lub świat nie istnieje, stan wymaga kwalifikacji jako zespół psychotyczny.'
  );
  whatChanges.push(
    'Prawidłowe wyniki EEG i neuroobrazowania nie potwierdzają rozpoznania dysocjacyjnego – diagnoza DID wymaga pozytywnych kryteriów klinicznych, a nie jedynie negatywnych wyników badań somatycznych.'
  );

  // 11. HYPOTHESES SYNTHESIS
  const hypotheses: DiagnosticHypothesis[] = [];

  // DID Evaluation (ICD-11 6B64)
  if (input.identityDiscontinuity === 'distinct_personality_states' && input.amnesiaType === 'recurrent_daily_activities' && input.realityTesting === 'intact') {
    hypotheses.push({
      condition: 'Dysocjacyjne zaburzenie tożsamości (DID, ICD-11 6B64)',
      category: 'DID',
      level: 'primary_candidate',
      rationale: 'Obecność odrębnych stanów tożsamości z nawracającą amnezją codziennych zdarzeń oraz zachowanym krytycyzmem spełnia kryteria ICD-11 6B64 i DSM-5-TR.',
    });
  } else if (input.identityDiscontinuity === 'distinct_personality_states') {
    hypotheses.push({
      condition: 'Dysocjacyjne zaburzenie tożsamości (DID, ICD-11 6B64)',
      category: 'DID',
      level: 'possible_consideration',
      rationale: 'Obecne rozbicie tożsamości, lecz brak potwierdzonej amnezji codziennej wymaga dalszej weryfikacji luk pamięciowych przed ustaleniem rozpoznania DID.',
    });
  } else {
    hypotheses.push({
      condition: 'Dysocjacyjne zaburzenie tożsamości (DID, ICD-11 6B64)',
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
      rationale: 'Dominujący lęk przed porzuceniem, szybka chwiejność afektu i niestabilność tożsamości bez odrębnych stanów wykonawczych i bez amnezji codziennej.',
    });
  } else if (input.interpersonalPattern === 'intense_fear_of_abandonment' || input.affectInstability === 'rapid_reactive_hours') {
    hypotheses.push({
      condition: 'Cechy osobowości borderline / BPD',
      category: 'BPD',
      level: 'possible_consideration',
      rationale: 'Obecne cechy niestabilności afektywnej lub relacyjnej, konieczna ocena wymiarowa ICD-11.',
    });
  }

  // cPTSD vs PTSD Evaluation
  if (hasCorePTSD) {
    if (hasFullDSO) {
      hypotheses.push({
        condition: 'Złożony zespół stresu pourazowego (cPTSD, ICD-11 6B41)',
        category: 'cPTSD',
        level: 'primary_candidate',
        rationale: 'Obecna pełna triada PTSD (intruzje, unikanie, wzbudzenie) wraz z kompletną triadą zaburzeń organizacji jaźni (DSO: afekt, trwały negatywny obraz siebie, wycofanie z relacji).',
      });
      if (input.affectInstability === 'rapid_reactive_hours') {
        hypotheses.push({
          condition: 'Współistnienie cech borderline (nakładanie wymiarowe cPTSD/BPD)',
          category: 'BPD',
          level: 'possible_consideration',
          rationale: 'Dysregulacja afektu i urazowość wykazują wymiarowe nakładanie między cPTSD a BPD; różnicowanie opiera się na dominującym wzorcu relacji (alienacja vs lęk przed porzuceniem).',
        });
      }
    } else {
      hypotheses.push({
        condition: 'Zespół stresu pourazowego (PTSD, ICD-11 6B40)',
        category: 'PTSD',
        level: 'primary_candidate',
        rationale: 'Klasyczna triada: intruzje (re-experiencing), unikanie bodźców i wzmożone wzbudzenie (hyperarousal) bez pełnej triady DSO.',
      });
      if (hasAffectDisturbance || hasNegativeSelfConcept) {
        hypotheses.push({
          condition: 'Złożony zespół stresu pourazowego (cPTSD, ICD-11 6B41)',
          category: 'cPTSD',
          level: 'possible_consideration',
          rationale: 'Obecny rdzeń PTSD oraz pojedyncze cechy DSO; wymaga weryfikacji pełnej triady zaburzeń organizacji jaźni.',
        });
      }
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

  // TLE Neurological Differential
  if (neuro.hasAuraOrEpigastricRising || input.symptomDuration === 'brief_episodes_seconds') {
    hypotheses.push({
      condition: 'Wskazanie do diagnostyki w kierunku padaczki skroniowej (TLE)',
      category: 'TLE',
      level: 'possible_consideration',
      rationale: 'Krótki, napadowy lub stereotypowy charakter epizodów z aurą wymaga priorytetowej weryfikacji neurologicznej (EEG, MRI głowy).',
    });
  }

  // Psychosis Evaluation
  if (input.realityTesting === 'impaired_delusional' || input.thoughtDisorder) {
    hypotheses.push({
      condition: 'Pierwotne zaburzenie psychotyczne (Schizofrenia / Zaburzenie urojeniowe)',
      category: 'Psychosis',
      level: 'primary_candidate',
      rationale: 'Utrata testowania rzeczywistości lub formalne zaburzenia toku myślenia.',
    });
  } else if (input.hallucinations === 'external_commentary_ego_syntonic') {
    hypotheses.push({
      condition: 'Zaburzenie z kręgu psychotycznego (do weryfikacji)',
      category: 'Psychosis',
      level: 'possible_consideration',
      rationale: 'Głosy komentujące wymagają weryfikacji krytycyzmu i wykluczenia wczesnego procesu psychotycznego.',
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
