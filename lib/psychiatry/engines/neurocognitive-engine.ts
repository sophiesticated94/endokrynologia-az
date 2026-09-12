/**
 * Pure clinical reasoning engine for Organic, Neurocognitive, and Geriatric Psychiatry.
 * Enforces:
 * - Decision-support without fake probabilities or deterministic claims
 * - Validated assessment tools (4AT, ACB, Beers 2023, MCA Capacity)
 * - Negative test != positive psychiatric diagnosis
 */

export interface FourAtInput {
  alertness: 0 | 4; // 0 = Normal, 4 = Altered (drowsiness or agitation)
  amt4: 0 | 1 | 2; // 0 = 4 correct, 1 = 1 error, 2 = 2+ errors or untestable
  attention: 0 | 1 | 2; // 0 = 7+ months back, 1 = <7 months, 2 = untestable / cannot start
  acuteChange: 0 | 4; // 0 = No, 4 = Yes (acute onset or fluctuating course)
}

export interface FourAtResult {
  score: number;
  category: 'unlikely' | 'possible_cognitive_impairment' | 'possible_delirium';
  summary: string;
  interpretation: string;
  limitations: string[];
  evidenceId: string;
}

export function evaluate4AT(input: FourAtInput): FourAtResult {
  const score = input.alertness + input.amt4 + input.attention + input.acuteChange;

  let category: FourAtResult['category'] = 'unlikely';
  let summary = '';
  let interpretation = '';

  if (score >= 4) {
    category = 'possible_delirium';
    summary = `Wynik 4AT: ${score}/12 pkt — Podejrzenie majaczenia (+/- otępienie)`;
    interpretation =
      'Wynik silnie zwiększa podejrzenie ostrego majaczenia (delirium). Wymaga pilnej weryfikacji fluktuacji w wywiadzie oraz wdrożenia poszukiwania odwracalnych przyczyn somatycznych i toksycznych (Cause Hunt).';
  } else if (score >= 1) {
    category = 'possible_cognitive_impairment';
    summary = `Wynik 4AT: ${score}/12 pkt — Możliwe zaburzenia poznawcze bez cech majaczenia`;
    interpretation =
      'Wynik sugeruje obecność przewlekłych deficytów poznawczych bez ostrych cech majaczenia w momencie badania. Jeśli wywiad wskazuje na nagłe załamanie funkcjonowania, należy powtórzyć ocenę w innej porze doby.';
  } else {
    category = 'unlikely';
    summary = `Wynik 4AT: 0/12 pkt — Małe prawdopodobieństwo majaczenia`;
    interpretation =
      'Brak uchwytnych cech majaczenia w badaniu przyłóżkowym. Pamiętaj: pojedynczy wynik 0 nie wyklucza hipoaktywnego delirium o przebiegu falującym, jeśli personel zgłasza zaburzenia w nocy.';
  }

  return {
    score,
    category,
    summary,
    interpretation,
    limitations: [
      '4AT jest zwalidowanym narzędziem przesiewowym (screening tool), a nie ostatecznym testem diagnostycznym.',
      'Punkty są przyznawane również za niemożność wykonania próby (untestable), co chroni przed przeoczeniem pacjentów w stanie ciężkim.',
      'Narzędzie nie różnicuje etiologii majaczenia (wymaga równoległego Cause Hunt).',
    ],
    evidenceId: 'evidence-4at-performance',
  };
}

export interface AcbDrugItem {
  drug: string;
  score: 1 | 2 | 3;
  rationale: string;
}

export const CANONICAL_ACB_MAP: Record<string, AcbDrugItem> = {
  // Score 3: Silne działanie antycholinergiczne
  hydroksyzyna: { drug: 'Hydroksyzyna', score: 3, rationale: 'Silna blokada muskarynowa M1, wyraźna sedacja i ryzyko delirium' },
  oksybutynina: { drug: 'Oksybutynina', score: 3, rationale: 'Nieselektywny antagonista M1-M3 o wysokiej penetracji OUN' },
  amitryptylina: { drug: 'Amitryptylina', score: 3, rationale: 'Silny antagonizm muskarynowy TLPD, zaburzenia przewodnictwa i pamięci' },
  klozapina: { drug: 'Klozapina', score: 3, rationale: 'Wysoka blokada M1, ryzyko niedrożności porażennej jelit i sedacji' },
  olanzapina: { drug: 'Olanzapina', score: 3, rationale: 'Umiarkowanie wysoka blokada M1 sprzyjająca zaburzeniom poznawczym' },
  difenhydramina: { drug: 'Difenhydramina', score: 3, rationale: 'Lek przeciwhistaminowy I generacji o silnym profilu antycholinergicznym' },
  klemastyna: { drug: 'Klemastyna', score: 3, rationale: 'Lek przeciwhistaminowy I generacji, ryzyko sedacji i zatrzymania moczu' },
  chlorpromazyna: { drug: 'Chlorpromazyna', score: 3, rationale: 'Klasyczny neuroleptyk fenotiazynowy o silnym działaniu antycholinergicznym' },

  // Score 2: Umiarkowane działanie antycholinergiczne
  baklofen: { drug: 'Baklofen', score: 2, rationale: 'Działanie miorelaksacyjne z umiarkowaną komponentą antycholinergiczną' },
  karbamazepina: { drug: 'Karbamazepina', score: 2, rationale: 'Strukturalne pokrewieństwo z TLPD i umiarkowana blokada muskarynowa' },

  // Score 1: Słabe działanie antycholinergiczne
  haloperidol: { drug: 'Haloperidol', score: 1, rationale: 'Słabe powinowactwo do receptorów muskarynowych w dawkach terapeutycznych' },
  kwetiapina: { drug: 'Kwetiapina', score: 1, rationale: 'Słaby antagonizm M1 (wyższy u metabolitu norkwetiapiny)' },
  rysperydon: { drug: 'Rysperydon', score: 1, rationale: 'Bardzo niskie powinowactwo do receptorów muskarynowych' },
  alprazolam: { drug: 'Alprazolam', score: 1, rationale: 'Słaba aktywność antycholinergiczna w modelach in vitro' },
  diazepam: { drug: 'Diazepam', score: 1, rationale: 'Słaba aktywność antycholinergiczna w modelach in vitro' },
  lorazepam: { drug: 'Lorazepam', score: 1, rationale: 'Znikoma aktywność antycholinergiczna, dominacja sedacji GABA' },
  paroksetyna: { drug: 'Paroksetyna', score: 1, rationale: 'Najsilniejszy komponent antycholinergiczny wśród grupy SSRI' },
  sertralina: { drug: 'Sertralina', score: 1, rationale: 'Minimalny komponent antycholinergiczny w wyższych stężeniach' },
  citalopram: { drug: 'Citalopram', score: 1, rationale: 'Niska aktywność antycholinergiczna' },
  escitalopram: { drug: 'Escitalopram', score: 1, rationale: 'Wysoka selektywność SERT, znikoma aktywność muskarynowa' },
  trazodon: { drug: 'Trazodon', score: 1, rationale: 'Niska aktywność muskarynowa, dominacja blokady 5-HT2A i H1' },
  furosemid: { drug: 'Furosemid', score: 1, rationale: 'Słaby efekt antycholinergiczny opisany w kohortach geriatrycznych' },
  metoprolol: { drug: 'Metoprolol', score: 1, rationale: 'Niska aktywność antycholinergiczna w testach radioligandowych' },
  tramadol: { drug: 'Tramadol', score: 1, rationale: 'Słaby wpływ antycholinergiczny plus ryzyko sedacji i zespołu serotoninowego' },
};

export interface AcbEvaluationResult {
  totalScore: number;
  burdenCategory: 'low' | 'moderate' | 'high';
  contributingDrugs: AcbDrugItem[];
  unclassifiedDrugs: string[];
  affectedDomains: string[];
  recommendation: string;
  evidenceId: string;
}

export function evaluateAnticholinergicBurden(drugs: string[]): AcbEvaluationResult {
  const contributing: AcbDrugItem[] = [];
  const unclassified: string[] = [];
  let totalScore = 0;

  for (const rawDrug of drugs) {
    const key = rawDrug.trim().toLowerCase();
    const match = CANONICAL_ACB_MAP[key];
    if (match) {
      contributing.push(match);
      totalScore += match.score;
    } else {
      unclassified.push(rawDrug);
    }
  }

  let burdenCategory: AcbEvaluationResult['burdenCategory'] = 'low';
  let recommendation = '';

  if (totalScore >= 3) {
    burdenCategory = 'high';
    recommendation =
      'Wysokie obciążenie antycholinergiczne (ACB >= 3). Wskazany pilny przegląd lekowy (medication review) i rozważenie stopniowej depreskrypcji leków o punktacji 2–3.';
  } else if (totalScore >= 2) {
    burdenCategory = 'moderate';
    recommendation =
      'Umiarkowane obciążenie antycholinergiczne (ACB = 2). Monitoruj pacjenta pod kątem sedacji, zaparć i wahań poznawczych; unikaj dołączania kolejnych leków muskarynowych.';
  } else {
    burdenCategory = 'low';
    recommendation =
      'Niskie obciążenie antycholinergiczne (ACB <= 1). Profil relatywnie bezpieczny pod kątem muskarynowym, lecz nadal wymaga oceny innych domen sedatywnych i nerkowych.';
  }

  const affectedDomains: string[] = [];
  if (totalScore > 0) {
    affectedDomains.push('Pamięć epizodyczna i uwaga (blokada postsynaptyczna M1 w hipokampie)');
    affectedDomains.push('Ryzyko zaostrzenia delirium (spadek rezerwy cholinergicznej)');
    affectedDomains.push('Układ pokarmowy: spowolnienie perystaltyki i uporczywe zaparcia');
    affectedDomains.push('Układ moczowy: zaleganie moczu / ryzyko ostrego zatrzymania');
    affectedDomains.push('Układ wzrokowy: zaburzenia akomodacji i suchość spojówek');
    affectedDomains.push('Ryzyko upadków w mechanizmie sedacji i zamazanego widzenia');
  }

  return {
    totalScore,
    burdenCategory,
    contributingDrugs: contributing,
    unclassifiedDrugs: unclassified,
    affectedDomains,
    recommendation,
    evidenceId: 'evidence-acb-burden',
  };
}

export interface BeersFlag {
  drug: string;
  criterion: string;
  rationale: string;
  exceptions: string;
  evidenceId: string;
  clinicalContextNotes?: string;
}

export function evaluateBeersCriteria(
  patientAge: number,
  drugs: string[],
  conditions: string[] = [],
): { flags: BeersFlag[]; summary: string } {
  const flags: BeersFlag[] = [];
  if (patientAge < 65) {
    return {
      flags: [],
      summary: 'Kryteria Beers 2023 dotyczą populacji pacjentów geriatrycznych w wieku >=65 lat.',
    };
  }

  const lowerDrugs = drugs.map(d => d.toLowerCase());
  const lowerConditions = conditions.map(c => c.toLowerCase());

  for (const drug of lowerDrugs) {
    if (['alprazolam', 'diazepam', 'lorazepam', 'klonazepam', 'zolpidem', 'zopiklon'].some(b => drug.includes(b))) {
      flags.push({
        drug,
        criterion: 'Benzodiazepiny i leki z grupy Z u osób starszych',
        rationale: 'Zwiększone ryzyko upadków, złamań, majaczenia, zaburzeń poznawczych i wypadków komunikacyjnych.',
        exceptions: 'Wyjątki Beers 2023: zaburzenia drgawkowe (seizure disorders), zaburzenia zachowania w fazie snu REM (RBD), zespół odstawienny benzodiazepin lub alkoholu, ciężkie uogólnione zaburzenie lękowe (severe GAD) oraz znieczulenie okołooperacyjne/proceduralne.',
        evidenceId: 'evidence-beers-2023',
        clinicalContextNotes: 'Lokalne wyjątki kliniczne: opieka paliatywna/terminalna oraz ciężki katatoniczny stupor w protokołach ratunkowych.',
      });
    }

    if (['hydroksyzyna', 'oksybutynina', 'amitryptylina', 'difenhydramina'].some(a => drug.includes(a))) {
      flags.push({
        drug,
        criterion: 'Leki silnie antycholinergiczne',
        rationale: 'Wysokie ryzyko splątania, suchości w ustach, zaparć, zatrzymania moczu i przyspieszenia spadku poznawczego.',
        exceptions: 'Krótkotrwałe leczenie ratunkowe w braku alternatyw; oksybutynina ma bezpieczniejsze alternatywy urologiczne (np. mirabegron).',
        evidenceId: 'evidence-beers-2023',
      });
    }

    if (
      ['haloperidol', 'olanzapina', 'rysperydon', 'kwetiapina'].some(ap => drug.includes(ap)) &&
      lowerConditions.some(c => c.includes('otępienie') || c.includes('dementia') || c.includes('alzheimer'))
    ) {
      flags.push({
        drug,
        criterion: 'Leki przeciwpsychotyczne w otępieniu (BPSD)',
        rationale: 'Zwiększone ryzyko incydentów naczyniowo-mózgowych (udar mózgu / TIA) oraz zwiększona śmiertelność ogólna u osób starszych z otępieniem (ostrzeżenie FDA/EMA).',
        exceptions: 'Wyłącznie w ciężkim cierpieniu lub bezpośrednim zagrożeniu przemocą, gdy metody niefarmakologiczne zawiodły; najmniejsza dawka, krótki czas.',
        evidenceId: 'evidence-antipsychotics-dementia-blackbox',
      });
    }
  }

  return {
    flags,
    summary:
      flags.length > 0
        ? `Zidentyfikowano ${flags.length} ostrzeżeń wg kryteriów Beers 2023. Pamiętaj: kryteria Beers stanowią wsparcie decyzji (decision-support), a nie bezwzględne przeciwwskazanie.`
        : 'Nie zidentyfikowano typowych leków z listy Beers 2023 w podanym profilu.',
  };
}

export interface BpsdPresentation {
  behaviour: string;
  hasFeverOrInfectionSigns: boolean;
  hasPainIndicators: boolean;
  hasUrinaryRetentionOrConstipation: boolean;
  recentMedicationChange: boolean;
  environmentalOverload: boolean;
}

export interface BpsdAnalysisResult {
  identifiedTriggers: string[];
  redFlags: string[];
  nextSteps: string[];
  antipsychoticWarning: string;
}

export function evaluateBpsdEtiology(presentation: BpsdPresentation): BpsdAnalysisResult {
  const triggers: string[] = [];
  const redFlags: string[] = [];
  const nextSteps: string[] = [];

  if (presentation.hasPainIndicators) {
    triggers.push('Ból somatyczny (np. choroba zwyrodnieniowa stawów, uraz po upadku, odleżyna)');
    nextSteps.push('Wdrożenie standaryzowanej behawioralnej skali bólu (np. Doloplus, PAINAD) i próba celowanego analgetyku.');
  }

  if (presentation.hasFeverOrInfectionSigns) {
    triggers.push('Aktywny stan zapalny / infekcja (ZUM, infekcja dróg oddechowych)');
    redFlags.push('Gorączka lub objawy zakażenia w otępieniu mogą wyzwalać ostre delirium z pobudzeniem.');
    nextSteps.push('Badanie ogólne moczu, morfologia, CRP, osłuchiwanie klatki piersiowej.');
  }

  if (presentation.hasUrinaryRetentionOrConstipation) {
    triggers.push('Zatrzymanie moczu lub zaklinowanie stolca (fecaloma)');
    nextSteps.push('Palpacja podbrzusza, USG pęcherza (bladderscan), badanie per rectum.');
  }

  if (presentation.recentMedicationChange) {
    triggers.push('Niedawna zmiana farmakoterapii (włączenie leku o profilu antycholinergicznym lub odstawienie sedatywnego)');
    nextSteps.push('Przegląd farmakoterapii pod kątem indeksu ACB i interakcji.');
  }

  if (presentation.environmentalOverload) {
    triggers.push('Przebodźcowanie środowiskowe, zmiana otoczenia lub personelu opiekuńczego');
    nextSteps.push('Modyfikacja środowiska: wyciszenie hałasu, zapewnienie stałej obecności bliskiej osoby, oświetlenie nocne.');
  }

  return {
    identifiedTriggers: triggers,
    redFlags,
    nextSteps,
    antipsychoticWarning:
      'Leki przeciwpsychotyczne NIE są rutynowym postępowaniem w BPSD. Przed rozważeniem farmakoterapii ratunkowej należy wykluczyć i zaopatrzyć ból, retencję moczu, zaparcie i infekcję.',
  };
}

export type TempoCategory = 'hours_days' | 'days_weeks' | 'weeks_months' | 'months_years';

export interface NeuroClockResult {
  tempoLabel: string;
  urgency: 'immediate_emergency' | 'urgent_inpatient' | 'subacute_workup' | 'elective_outpatient';
  primaryDifferentialBuckets: string[];
  priorityInvestigations: string[];
  whatCannotBeInferred: string[];
}

export function evaluateNeurocognitiveClock(tempo: TempoCategory, redFlags: string[] = []): NeuroClockResult {
  switch (tempo) {
    case 'hours_days':
      return {
        tempoLabel: 'Godziny do dni (dynamika ostra)',
        urgency: 'immediate_emergency',
        primaryDifferentialBuckets: [
          'Majaczenie (delirium) na tle infekcji, zaburzeń elektrolitowych lub hipoksji',
          'Intoksykacja lekowa / zatrucie substancją lub ostry zespół odstawienny',
          'Ostry incydent naczyniowy mózgu (udar niedokrwienny / krwotok)',
          'Stan padaczkowy bezdrgawkowy (NCSE) lub encefalopatia metaboliczna',
        ],
        priorityInvestigations: [
          'Gazometria, glikemia, elektrolity (Na, K, Ca), parametry nerkowe i wątrobowe',
          'EKG i monitorowanie parametrów życiowych (ciśnienie, tętno, saturacja, temperatura)',
          'Tomografia komputerowa (TK) głowy w trybie ostrym',
          'Testy toksykologiczne moczu',
        ],
        whatCannotBeInferred: [
          'Ostry początek wyklucza pierwotny powolny proces otępienny jako jedyną przyczynę załamania.',
          'Prawidłowe wstępne badania laboratoryjne NIE wykluczają delirium (wymagają poszukiwania innych przyczyn somatycznych).',
        ],
      };

    case 'days_weeks':
      return {
        tempoLabel: 'Dni do tygodni (dynamika podostra)',
        urgency: 'urgent_inpatient',
        primaryDifferentialBuckets: [
          'Zapalenie mózgu (autoimmunologiczne, paraneoplastyczne lub wirusowe/HSV)',
          'Szybko rozwijające się zaburzenia metaboliczne lub polekowe',
          'Powikłania neurochirurgiczne (przewlekły krwiak podtwardówkowy po niepamiętanym urazie)',
          'Napad padaczkowy ze stanem pomrocznym lub encefalopatia Hashimoto (SREAT)',
        ],
        priorityInvestigations: [
          'Rezonans magnetyczny (MRI) mózgu z kontrastem (protokół FLAIR, DWI)',
          'Badanie płynu mózgowo-rdzeniowego (cytoza, białko, oligoklonalne, panel autoprzeciwciał)',
          'Elektroencefalografia (EEG) — ocena wyładowań napadowych lub zwolnienia',
          'Panele autoprzeciwciał onkoneuronalnych i powierzchniowych (anty-NMDAR, LGI1, CASPR2)',
        ],
        whatCannotBeInferred: [
          'Podostra psychoza z dyskinezami NIE jest schizofrenią do momentu wykluczenia zapalenia mózgu.',
          'Ujemny wynik przeciwciał w surowicy nie zwalnia z badania PMR przy wysokim podejrzeniu klinicznym.',
        ],
      };

    case 'weeks_months':
      return {
        tempoLabel: 'Tygodnie do kilku miesięcy (szybko postępujące)',
        urgency: 'subacute_workup',
        primaryDifferentialBuckets: [
          'Szybko postępujące zespoły otępienne (RPD): autoimmunologiczne, paraneoplastyczne',
          'Choroby prionowe (sporadyczna choroba Creutzfeldta-Jakoba — sCJD)',
          'Guz pierwotny OUN lub przerzuty do mózgu',
          'Zaburzenia endokrynologiczne i niedoborowe (ciężki niedobór B12, encefalopatia Wernickego)',
        ],
        priorityInvestigations: [
          'MRI mózgu z oceną dyfuzji (restrykcja w korze wstęgowatej i prążkowiu charakterystyczna dla CJD/autoimmune)',
          'PMR: białko 14-3-3 oraz RT-QuIC (test konwersji w kierunku prionów)',
          'Diagnostyka onkologiczna całego ciała (TK klatki/brzucha/miednicy lub PET-CT)',
        ],
        whatCannotBeInferred: [
          'Szybka progresja w kilka miesięcy nie pasuje do typowego wolnego przebiegu choroby Alzheimera.',
          'Brak gorączki nie wyklucza procesu autoimmunologicznego ani prionowego.',
        ],
      };

    case 'months_years':
    default:
      return {
        tempoLabel: 'Miesiące do lat (dynamika przewlekła)',
        urgency: 'elective_outpatient',
        primaryDifferentialBuckets: [
          'Choroba Alzheimera (podstępny początek, wczesna pamięć epizodyczna)',
          'Otępienie naczyniowe / Vascular Cognitive Impairment (dysfunkcja wykonawcza, epizody naczyniowe)',
          'Otępienie z ciałami Lewy’ego (omamy wzrokowe, wahania poznawcze, parkinsonizm, RBD)',
          'Otępienie czołowo-skroniowe (zmiany osobowości po 55 r.ż., odhamowanie, apatia)',
          'Depresja wieku podeszłego z deficytami poznawczymi',
        ],
        priorityInvestigations: [
          'Szczegółowa ocena neuropsychologiczna i wywiad od osób trzecich (collateral history)',
          'MRI mózgu z oceną zaniku hipokampów (skala MTA) i naczyniowej leukoencefalozy (skala Fazekas)',
          'Panel laboratoryjny: TSH, witamina B12, kwas foliowy, elektrolity, próby nerkowe i wątrobowe',
        ],
        whatCannotBeInferred: [
          'Zaburzenia pamięci NIE są tożsame z chorobą Alzheimera (wymagają wykluczenia innych fenotypów).',
          'Prawidłowe TSH i B12 nie dowodzą pierwotnego procesu psychiatrycznego; eliminują jedynie wybrane maski.',
        ],
      };
  }
}

export interface CapacityAssessment {
  decisionContext: string;
  understandsInformation: boolean | null;
  retainsInformation: boolean | null;
  weighsOrReasons: boolean | null;
  communicatesDecision: boolean | null;
}

export interface CapacityResult {
  decisionContext: string;
  isCapacityPreserved: boolean | 'indeterminate';
  intactDomains: string[];
  impairedDomains: string[];
  missingAssessments: string[];
  interpretation: string;
  safeguardingNote: string;
  evidenceId: string;
}

export function evaluateCapacityDomains(assessment: CapacityAssessment): CapacityResult {
  const intact: string[] = [];
  const impaired: string[] = [];
  const missing: string[] = [];

  const check = (val: boolean | null, name: string) => {
    if (val === true) intact.push(name);
    else if (val === false) impaired.push(name);
    else missing.push(name);
  };

  check(assessment.understandsInformation, '1. Zrozumienie informacji istotnych dla decyzji (Understanding)');
  check(assessment.retainsInformation, '2. Zdolność do zatrzymania informacji w pamięci (Retention)');
  check(assessment.weighsOrReasons, '3. Zdolność do wyważenia i rozważenia konsekwencji (Weighing/Reasoning)');
  check(assessment.communicatesDecision, '4. Zdolność do zakomunikowania wyboru (Communicating a choice)');

  let isCapacityPreserved: boolean | 'indeterminate' = true;
  if (missing.length > 0) {
    isCapacityPreserved = 'indeterminate';
  } else if (impaired.length > 0) {
    isCapacityPreserved = false;
  }

  let interpretation = '';
  if (isCapacityPreserved === 'indeterminate') {
    interpretation = `Ocena niekompletna. Brakuje zbadania ${missing.length} domen. Zdolność decyzyjna nie może zostać orzeczona ani odebrana bez pełnego zbadania wszystkich 4 domen.`;
  } else if (isCapacityPreserved === false) {
    interpretation = `Pacjent nie posiada zdolności decyzyjnej w zakresie: „${assessment.decisionContext}”. Zaburzeniu uległy domeny: ${impaired.join(', ')}.`;
  } else {
    interpretation = `Pacjent posiada zachowaną zdolność do podjęcia decyzji w zakresie: „${assessment.decisionContext}”. Wszystkie 4 domeny procesowania informacji funkcjonują prawidłowo w momencie badania.`;
  }

  return {
    decisionContext: assessment.decisionContext,
    isCapacityPreserved,
    intactDomains: intact,
    impairedDomains: impaired,
    missingAssessments: missing,
    interpretation,
    safeguardingNote:
      'Zasada kluczowa: Diagnoza otępienia NIE oznacza automatycznego braku zdolności decyzyjnej. Zdolność jest zawsze specyficzna dla danej decyzji i czasu (decision- and time-specific).',
    evidenceId: 'evidence-capacity-framework',
  };
}
