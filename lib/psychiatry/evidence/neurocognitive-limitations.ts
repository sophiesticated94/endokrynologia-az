import type { EvidenceItem } from './evidence-types.ts';

export const NEUROCOGNITIVE_EVIDENCE_REGISTRY: Record<string, EvidenceItem> = {
  'evidence-4at-performance': {
    id: 'evidence-4at-performance',
    claimLabel: 'Trafność diagnostyczna 4AT jako narzędzia przesiewowego majaczenia',
    origin: 'DERIVED',
    level: 'DECISION_RULE',
    sourceId: '4at-validation-bellelli-2014',
    quickSummary:
      'Skala 4AT wykazuje czułość ~88–90% i swoistość ~88–91% w wykrywaniu majaczenia u hospitalizowanych chorych w podeszłym wieku; wynik >=4 wskazuje na podejrzenie majaczenia.',
    clinicalContext: {
      population: 'Hospitalizowani pacjenci geriatryczni, chirurgiczni i internistyczni',
      measurementMethod: 'Krótki standaryzowany test przyłóżkowy (czujność, AMT4, uwaga, fluktuacja)',
      applicability: 'Przesiewowe badanie przyłóżkowe; nie zastępuje pogłębionej oceny etiologicznej',
    },
    researchContext: {
      modelType: 'Walidowany wskaźnik przesiewowy (zakres 0–12 pkt)',
      limitations: [
        'Punkty są przyznawane również za niemożność wykonania próby (untestable), co zapobiega fałszywie ujemnym wynikom w ciężkich stanach.',
        'Wynik >=4 nie dowodzi samoistnie majaczenia i wymaga weryfikacji fluktuacji oraz poszukiwania przyczyn somatycznych.',
      ],
      whatCannotBeInferred: [
        'Wynik 4AT NIE określa etiologii majaczenia ani nie zwalnia z poszukiwania infekcji, leków czy zaburzeń metabolicznych.',
        'Wynik 0 nie daje 100% gwarancji braku hipoaktywnego delirium, jeśli wywiad z ostatnich 24h wskazuje na fluktuacje.',
      ],
      uncertaintyOrCI: 'Czułość 88% (95% CI: 80–94%), swoistość 88% (95% CI: 82–93%).',
    },
  },

  'evidence-acb-burden': {
    id: 'evidence-acb-burden',
    claimLabel: 'Skumulowane obciążenie antycholinergiczne mózgu (Skala ACB)',
    origin: 'DERIVED',
    level: 'COHORT',
    sourceId: 'acb-boustani-2008',
    quickSummary:
      'Skala ACB (Anticholinergic Cognitive Burden) przypisuje lekom punktację 1–3; sumaryczny wynik >=3 wiąże się ze statystycznym wzrostem ryzyka pogorszenia funkcji poznawczych i delirium.',
    clinicalContext: {
      population: 'Osoby w wieku podeszłym (>=65 r.ż.) przyjmujące farmakoterapię wielolekową',
      measurementMethod: 'Sumowanie punktów ACB przypisanych substancjom czynnym na podstawie dowodów in vitro i klinicznych',
      applicability: 'Narzędzie oceny presji antycholinergicznej; wsparcie decyzji o depreskrypcji',
    },
    researchContext: {
      modelType: 'Model jakościowo-punktowy ekspozycji farmakologicznej (1: słabe, 2: umiarkowane, 3: silne)',
      limitations: [
        'Suma punktów jest wskaźnikiem populacyjnym i nie pozwala na precyzyjne prognozowanie stężenia w OUN u pojedynczego chorego.',
        'Wielkość przenikania przez barierę krew-mózg oraz polimorfizmy P-gp i CYP modulują rzeczywistą ekspozycję mózgową.',
      ],
      whatCannotBeInferred: [
        'Wysoki wynik ACB NIE oznacza automatycznego zakazu stosowania leku bez oceny wskazania klinicznego.',
        'Nie wolno przeliczać sumy ACB na procentowe ryzyko zgonu, upadku czy otępienia.',
      ],
      uncertaintyOrCI: 'Wskaźnik jakościowy; różnice w klasyfikacjach pomiędzy skalami (ACB vs ARS vs DBI).',
    },
  },

  'evidence-beers-2023': {
    id: 'evidence-beers-2023',
    claimLabel: 'Kryteria Beers AGS 2023 jako narzędzie wsparcia decyzji w geriatrii',
    origin: 'MODELLED',
    level: 'GUIDELINE',
    sourceId: 'ags-beers-criteria-2023',
    quickSummary:
      'Kryteria Beers 2023 identyfikują leki potencjalnie nieodpowiednie (PIM) u seniorów; stanowią system ostrzegawczy i wsparcie decyzji, a nie bezwzględny zakaz ordynacji.',
    clinicalContext: {
      population: 'Pacjenci geriatryczni w wieku >=65 lat w opiece ambulatoryjnej i szpitalnej',
      measurementMethod: 'Analiza profilu lekowego pod kątem interakcji lek-choroba, wieku, funkcji nerek i ryzyka upadków',
      applicability: 'Wskazówki preskrypcyjne (decision-support); wymagają indywidualizacji',
    },
    researchContext: {
      modelType: 'Konsensus ekspercki AGS oparty na przeglądzie systematycznym GRADE',
      limitations: [
        'Kryteria opracowane dla systemu USA; niektóre leki europejskie nie są uwzględnione.',
        'Stosowanie leku z listy Beers może być klinicznie uzasadnione, gdy brak bezpieczniejszych alternatyw i prowadzony jest ścisły monitoring.',
      ],
      whatCannotBeInferred: [
        'Obecność leku na liście Beers NIE stanowi błędu medycznego ani bezwzględnego przeciwwskazania prawnego.',
        'Brak leku na liście Beers nie gwarantuje jego pełnego bezpieczeństwa u danego pacjenta.',
      ],
    },
  },

  'evidence-antipsychotics-dementia-blackbox': {
    id: 'evidence-antipsychotics-dementia-blackbox',
    claimLabel: 'Ostrzeżenie FDA/EMA: Ryzyko udaru mózgu i zgonu po lekach przeciwpsychotycznych w otępieniu',
    origin: 'MEASURED',
    level: 'META-ANALYSIS',
    sourceId: 'nice-ng97-dementia',
    quickSummary:
      'Leki przeciwpsychotyczne u chorych z otępieniem wiążą się z ~1,5–1,8-krotnym wzrostem śmiertelności ogólnej oraz 3-krotnym wzrostem incydentów naczyniowo-mózgowych (udar/TIA).',
    clinicalContext: {
      population: 'Pacjenci z otępieniem i ciężkimi objawami BPSD (pobudzenie, agresja, psychoza)',
      measurementMethod: 'Metaanalizy randomizowanych badań z grupą placebo (RCT) i rejestrów nadzoru bezpieczeństwa',
      applicability: 'Wyłącznie w ciężkim cierpieniu lub bezpośrednim zagrożeniu bezpieczeństwa; najmniejsza dawka, najkrótszy czas',
    },
    researchContext: {
      modelType: 'Metaanaliza efektów stałych i losowych w badaniach fazy III SGA vs placebo',
      limitations: [
        'Ryzyko dotyczy zarówno leków przeciwpsychotycznych I, jak i II generacji.',
        'Średni czas do wystąpienia incydentów naczyniowych może wynosić zaledwie kilka tygodni od włączenia.',
      ],
      whatCannotBeInferred: [
        'Antypsychotyki NIE są lekiem pierwszego wyboru na łagodne pobudzenie, błądzenie czy wokalizacje w otępieniu.',
        'Krótkotrwała korzyść sedacyjna nie eliminuje długofalowego ryzyka naczyniowego i przyspieszenia spadku poznawczego.',
      ],
      uncertaintyOrCI: 'Względne ryzyko zgonu (RR) ~1.54 (95% CI: 1.06–2.23).',
    },
  },

  'evidence-dlb-neuroleptic-sensitivity': {
    id: 'evidence-dlb-neuroleptic-sensitivity',
    claimLabel: 'Ciężka nadwrażliwość na leki przeciwpsychotyczne w otępieniu z ciałami Lewy’ego (DLB)',
    origin: 'MEASURED',
    level: 'CONSENSUS',
    sourceId: 'dlb-mckeith-2017',
    quickSummary:
      'Około 30–50% pacjentów z DLB wykazuje ciężką nadwrażliwość na neuroleptyki blokujące D2 (gwałtowne zaostrzenie parkinsonizmu, stupor, śpiączka, zgon).',
    clinicalContext: {
      population: 'Pacjenci z otępieniem z ciałami Lewy’ego i psychozą w chorobie Parkinsona',
      measurementMethod: 'Kryteria konsensusu DLB Consortium i badania kliniczne nad bezpieczeństwem leków psychotropowych',
      applicability: 'Bezwzględne unikanie typowych neuroleptyków (haloperidol); wyjątkowa ostrożność przy atypowych',
    },
    researchContext: {
      modelType: 'Cecha kardynalna i biomarker wspierający w kryteriach konsensusu McKeith 2017',
      limitations: [
        'Brak ostrej reakcji po neuroleptyku nie wyklucza rozpoznania DLB (występuje u ~ połowy chorych).',
        'Nawet małe dawki neuroleptyków II generacji mogą wywołać nieodwracalne pogorszenie sprawności ruchowej.',
      ],
      whatCannotBeInferred: [
        'Obecność omamów wzrokowych NIE upoważnia do wdrożenia standardowej terapii neuroleptykiem jak w schizofrenii.',
        'Pogorszenie po leku przeciwpsychotycznym nie powinno być mylone ze „złośliwym zespołem neuroleptycznym”, choć może go imitować.',
      ],
    },
  },

  'evidence-chei-memantine-indication': {
    id: 'evidence-chei-memantine-indication',
    claimLabel: 'Wskazania i granice skuteczności inhibitorów acetylocholinoesterazy i memantyny',
    origin: 'DERIVED',
    level: 'GUIDELINE',
    sourceId: 'nice-ng97-dementia',
    quickSummary:
      'ChEI (donepezil, rywastygmina, galantamina) i memantyna łagodzą objawy poznawcze i behawioralne w AD i DLB, lecz nie zatrzymują procesu neurodegeneracji komórkowej.',
    clinicalContext: {
      population: 'Pacjenci z chorobą Alzheimera (postać łagodna, umiarkowana, ciężka) oraz DLB/PDD',
      measurementMethod: 'Randomizowane badania kliniczne z oceną skalami ADAS-Cog, MMSE, CIBIC-plus',
      applicability: 'Leczenie objawowe podtrzymujące funkcje poznawcze i stabilizujące zachowanie',
    },
    researchContext: {
      modelType: 'Farmakologiczna modulacja przekaźnictwa cholinergicznego i glutaminianergicznego',
      limitations: [
        'Wielkość efektu jest umiarkowana (średnio ~1–2 pkt MMSE w porównaniu z placebo przez 6–12 miesięcy).',
        'Działania niepożądane ChEI obejmują bradykardię, omdlenia, nudności i nasilenie ryzyka upadków.',
      ],
      whatCannotBeInferred: [
        'Włączenie leku NIE odwraca utraconych neuronów ani nie zmienia biologicznej trajektorii choroby.',
        'Brak poprawy w testach po 3 miesiącach nie oznacza natychmiastowego odstawienia, o ile spowolniono tempo progresji.',
      ],
    },
  },

  'evidence-capacity-framework': {
    id: 'evidence-capacity-framework',
    claimLabel: 'Kryteria oceny zdolności decyzyjnej (Decision-Making Capacity) wg Mental Capacity Act',
    origin: 'MODELLED',
    level: 'GUIDELINE',
    sourceId: 'mca-2005-capacity',
    quickSummary:
      'Zdolność decyzyjna jest specyficzna dla danej decyzji i czasu (decision- and time-specific); wymaga zrozumienia, zatrzymania, wyważenia i zakomunikowania wyboru.',
    clinicalContext: {
      population: 'Dorośli pacjenci podejmujący decyzje diagnostyczne, lecznicze lub opiekuńcze',
      measurementMethod: 'Kliniczna ustrukturyzowana rozmowa badająca 4 domeny procesowania informacji',
      applicability: 'Ocena przyłóżkowa w sytuacjach odmowy leczenia, wypisu czy zgody na procedury',
    },
    researchContext: {
      modelType: 'Czteroelementowy model funkcjonalny (Understanding, Retention, Weighing, Communicating)',
      limitations: [
        'Nie ma uniwersalnego testu punktowego orzekającego brak zdolności decyzyjnej.',
        'Zdolność może ulegać fluktuacjom (np. w majaczeniu lub po podaniu leków sedatywnych).',
      ],
      whatCannotBeInferred: [
        'Diagnoza otępienia, schizofrenii lub podeszły wiek NIE są tożsame z brakiem zdolności do decydowania o sobie.',
        'Podjęcie decyzji nieracjonalnej lub niezgodnej z radą lekarza samo w sobie nie dowodzi braku capacity.',
      ],
    },
  },

  'evidence-rpd-autoimmune-redflags': {
    id: 'evidence-rpd-autoimmune-redflags',
    claimLabel: 'Czerwone flagi szybko postępującego otępienia i zapalenia mózgu (RPD / Encephalitis)',
    origin: 'MODELLED',
    level: 'GUIDELINE',
    sourceId: 'rpd-graff-radford-2019',
    quickSummary:
      'Dynamika rozwoju objawów w tygodnie/miesiące, napady padaczkowe, dyskinezy, objawy ogniskowe i labilność wegetatywna wymagają pilnego wykluczenia przyczyn odwracalnych (MRI, PMR, EEG).',
    clinicalContext: {
      population: 'Pacjenci z nagłym lub podostrym spadkiem poznawczym i behawioralnym',
      measurementMethod: 'Panel triagingu czasowego i neurologicznego (Neurocognitive Clock)',
      applicability: 'Oddziały neurologii, psychiatrii i internistyczne izby przyjęć',
    },
    researchContext: {
      modelType: 'Hierarchiczny algorytm diagnostyczny w oparciu o wytyczne Mayo Clinic i Lancet Neurol',
      limitations: [
        'Autoprzeciwciała w surowicy mogą być fałszywie ujemne; badanie PMR ma wyższą czułość w zapaleniach limbicznych.',
        'Obraz MRI mózgu może być prawidłowy we wczesnej fazie autoimmunologicznego zapalenia mózgu.',
      ],
      whatCannotBeInferred: [
        'Pojawienie się omamów i pobudzenia u młodej osoby bez wcześniejszego wywiadu NIE upoważnia do wyłącznego rozpoznania schizofrenii bez badań somatycznych.',
        'Negatywny wynik podstawowych badań laboratoryjnych nie wyklucza procesu autoimmunologicznego ani paraneoplastycznego.',
      ],
    },
  },

  'evidence-delirium-multicomponent-prevention': {
    id: 'evidence-delirium-multicomponent-prevention',
    claimLabel: 'Wieloczynnikowa niefarmakologiczna prewencja i postępowanie w majaczeniu (NICE CG103)',
    origin: 'DERIVED',
    level: 'GUIDELINE',
    sourceId: 'nice-cg103-delirium',
    quickSummary:
      'Niefarmakologiczne interwencje wieloelementowe (reorientacja, wczesna mobilizacja, nawodnienie, leczenie bólu, higiena snu) zmniejszają częstość majaczenia o ~30–40%.',
    clinicalContext: {
      population: 'Hospitalizowani pacjenci w grupie podwyższonego ryzyka (wiek >=65 lat, otępienie, złamanie szyjki kości udowej)',
      measurementMethod: 'Protokoły HELP (Hospital Elder Life Program) i wytyczne NICE CG103',
      applicability: 'Oddziały zabiegowe i zachowawcze; standard opieki geriatrycznej',
    },
    researchContext: {
      modelType: 'Zintegrowany pakiet opieki niefarmakologicznej',
      limitations: [
        'Interwencje wymagają zaangażowania zespołu wielodyscyplinarnego i personelu pielęgniarskiego.',
        'Po wystąpieniu delirium farmakoterapia pełni rolę wyłącznie ratunkową przy skrajnym pobudzeniu zagrażającym życiu.',
      ],
      whatCannotBeInferred: [
        'Leki uspokajające NIE zapobiegają majaczeniu; benzodiazepiny mogą je wręcz indukować lub przedłużać.',
      ],
      uncertaintyOrCI: 'Redukcja ryzyka względnego majaczenia o 30–40% (OR 0.69, 95% CI: 0.59–0.81).',
    },
  },
};
