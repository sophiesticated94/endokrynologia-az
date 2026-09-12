import type { LearningActivity, LessonExperienceV2 } from '../course-types.ts';

export type ActivityBaseInput = {
  id: string;
  objectiveIds: string[];
  difficulty: 'both';
  reasoning: LessonExperienceV2['objectives'][number]['kind'];
  sourceIds: string[];
  hint: string;
};

export type WidgetProvider = {
  'axis-map': (base: ActivityBaseInput) => LearningActivity;
  'lab-workbench': (base: ActivityBaseInput) => LearningActivity;
  timeline: (base: ActivityBaseInput) => LearningActivity;
  'pathway-builder': (base: ActivityBaseInput) => LearningActivity;
};

export const PSYCHIATRY_PROVIDERS: WidgetProvider = {
  'axis-map': base => ({
    ...base,
    type: 'single_choice',
    prompt: 'Wskaż fizjologiczną regułę interakcji receptorowych w szlakach dopaminergicznych i serotoninergicznych.',
    options: [
      'Blokada 5-HT2A w szlaku nigrostriatalnym stymuluje uwalnianie dopaminy i łagodzi ryzyko EPS',
      'Blokada D2 zawsze nasila uwalnianie prolaktyny bez względu na stężenie dopaminy',
      'Pobudzenie receptora 5-HT1A hamuje transmisję serotoninergiczną na obwodzie bez wpływu na autoreceptory',
    ],
    answer: 0,
    explanation: 'W szlaku nigrostriatalnym serotonina hamuje uwalnianie dopaminy przez receptor 5-HT2A. Blokada tego receptora (cecha leków SGA) uwalnia hamulec i zwiększa dopaminę, co łagodzi ryzyko EPS.',
  }),
  'lab-workbench': base => ({
    ...base,
    type: 'lab',
    prompt: 'Ocena stężenia litu 12 godzin po dawce wieczornej wynosi 0,72 mmol/l u pacjenta bez objawów intoksykacji, eGFR 85 ml/min. Jak zinterpretować ten wynik?',
    options: [
      'Prawidłowe stężenie w optymalnym oknie profilaktycznym ChAD (0,6–0,8 mmol/l wg AGNP 2026)',
      'Wynik subterapeutyczny wymagający natychmiastowego podwojenia dawki',
      'Stan bezpośredniego zagrożenia życia wymagający pilnej kwalifikacji do hemodializy',
    ],
    answer: 0,
    explanation: 'Według konsensusu AGNP 2026 stężenie 0,6–0,8 mmol/l 12 h po dawce w stanie stacjonarnym stanowi optymalne okno podtrzymujące w ChAD.',
  }),
  timeline: base => ({
    ...base,
    type: 'trend',
    prompt: 'Włączono escitalopram w ciężkim epizodzie depresyjnym. W jakim przedziale czasowym spodziewasz się pełnego efektu przeciwdepresyjnego w odróżnieniu od wczesnych działań niepożądanych?',
    options: [
      'Działania niepożądane (np. nudności, niepokój) w pierwszych dniach; odpowiedź terapeutyczna po 2–4 (do 6) tygodniach',
      'Pełna remisja następuje w ciągu 24–48 godzin od pierwszej tabletki',
      'Lek nie wywołuje żadnych wczesnych reakcji i działa wyłącznie po 6 miesiącach',
    ],
    answer: 0,
    explanation: 'Transmisja monoamin rośnie szybko, lecz kaskada adaptacji receptorowych (down-regulacja 5-HT1A, ekspresja BDNF) wymaga 2–4 tygodni. Wczesne działania niepożądane pojawiają się natychmiast.',
  }),
  'pathway-builder': base => ({
    ...base,
    type: 'ordering',
    prompt: 'Ułóż właściwy algorytm postępowania przy podejrzeniu ostrego zespołu serotoninowego.',
    items: [
      'Natychmiastowe odstawienie wszystkich leków proserotoninergicznych',
      'Ocena kryteriów Huntera (klonus, hiperrefleksja, pobudzenie, hipertermia)',
      'Leczenie objawowe: chłodzenie fizykalne i sedacja benzodiazepinami',
      'W ciężkich przypadkach intubacja i ewentualne podanie cyproheptadyny',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Priorytetem jest przerwanie ekspozycji toksycznej, standaryzowana ocena kliniczna (kryteria Huntera) oraz sedacja i stabilizacja parametrów życiowych.',
  }),
};

export const PSYCHIATRY_LESSON_ACTIVITY_REGISTRY: Record<string, Partial<WidgetProvider>> = {
  'wywiad-psychiatryczny-mse': {
    'axis-map': base => ({
      ...base,
      type: 'single_choice',
      prompt: 'W badaniu stanu psychicznego (MSE) pacjent zgłasza przekonanie, że audycja radiowa nadaje zaszyfrowane instrukcje dla niego. Jak zaklasyfikować ten objaw?',
      options: [
        'Zaburzenie treści myślenia: urojenia ksobne (odniesienia)',
        'Zaburzenie toku myślenia: rozkojarzenie',
        'Zaburzenie spostrzegania: omam rzekomy (pseudohalucynacja)',
      ],
      answer: 0,
      explanation: 'Urojenia ksobne należą do zaburzeń treści myślenia (fałszywe sądy). Tok myślenia opisuje strukturę i tempo wypowiedzi, a spostrzeganie dotyczy percepcji zmysłowej.',
    }),
  },
  'mdd-kryteria-rozpoznanie': {
    timeline: base => ({
      ...base,
      type: 'trend',
      prompt: 'Pacjent zgłasza obniżony nastrój i anhedonię od 5 dni po kłótni. Jakie kryterium czasowe decyduje o formalnym rozpoznaniu epizodu depresyjnego w DSM-5-TR / ICD-11?',
      options: [
        'Objawy osiowe muszą utrzymywać się przez co najmniej 2 tygodnie niemal codziennie',
        'Wystarczy 48 godzin przy nasilonych myślach rezygnacyjnych',
        'Konieczne jest minimum 6 miesięcy objawów',
      ],
      answer: 0,
      explanation: 'Zgodnie z DSM-5-TR i ICD-11 epizod depresyjny wymaga co najmniej 2 tygodni niemal codziennego występowania objawów osiowych.',
    }),
  },
  'depresja-fenotypy-i-kryteria': {
    timeline: base => ({
      ...base,
      type: 'trend',
      prompt: 'W różnicowaniu fenotypów depresji, jak zdefiniować kryterium czasu i dynamikę epizodu melancholicznego?',
      options: [
        'Minimum 2 tygodnie głębokiego braku reaktywności nastroju, wczesnego budzenia i porannego pogorszenia',
        'Fluktuacje nastroju z pełną reaktywnością w ciągu 2 dni',
        'Wyłącznie przewlekłe objawy trwające powyżej 2 lat',
      ],
      answer: 0,
      explanation: 'Cechy melancholiczne nakładają się na co najmniej 2-tygodniowy epizod depresyjny, z anhedonią, brakiem reaktywności nastroju i dobową zmiennością.',
    }),
  },
  'chad-spektrum-i-ii': {
    'axis-map': base => ({
      ...base,
      type: 'single_choice',
      prompt: 'Jakie jest kluczowe kryterium różnicujące epizod hipomanii (ChAD II) od epizodu manii (ChAD I)?',
      options: [
        'Hipomania (>=4 dni) nie powoduje znacznego upośledzenia funkcjonowania, hospitalizacji ani psychozy; mania (>=7 dni lub hospitalizacja) tak',
        'W hipomanii nie występuje zmniejszona potrzeba snu',
        'Hipomania wymaga obecności usystematyzowanych urojeń wielkościowych',
      ],
      answer: 0,
      explanation: 'Pojawienie się objawów psychotycznych, konieczność hospitalizacji lub wyraźne załamanie funkcjonowania automatycznie klasyfikuje epizod jako manię (ChAD I).',
    }),
  },
  'mania-hipomania-spektrum': {
    'axis-map': base => ({
      ...base,
      type: 'single_choice',
      prompt: 'Pacjent od 5 dni śpi po 3 godziny, czuje przypływ energii i realizuje liczne projekty, nie doznając psychozy i nie wymagając hospitalizacji. Jaka to faza?',
      options: [
        'Hipomania (spełnione kryterium >= 4 dni bez psychozy i bez hospitalizacji)',
        'Mania psychotyczna',
        'Cyklotymia bez epizodu afektywnego',
      ],
      answer: 0,
      explanation: 'Czas trwania >= 4 dni z wyraźnym napędem bez dezorganizacji życia i bez objawów psychotycznych definiuje epizod hipomaniakalny.',
    }),
  },
  'psychoza-i-szlaki-dopaminy': {
    'axis-map': base => ({
      ...base,
      type: 'single_choice',
      prompt: 'Pierwszy rzut psychozy z omamami wzrokowymi i fluktuacją świadomości u 28-latka. Co jest priorytetem diagnostycznym?',
      options: [
        'Wykluczenie psychozy wtórnej (somatycznej, toksycznej, infekcji OUN) przed rozpoznaniem schizofrenii',
        'Natychmiastowe rozpoznanie schizofrenii i włączenie klozapiny',
        'Pominięcie badań laboratoryjnych z uwagi na typowy wiek zachorowania',
      ],
      answer: 0,
      explanation: 'Omamy wzrokowe, nagły początek i fluktuacja świadomości to typowe cechy psychozy wtórnej (organicznej lub intoksykacji), wymagającej pilnych badań laboratoryjnych i obrazowych.',
    }),
  },
  'schizofrenia-kryteria-fazy': {
    'axis-map': base => ({
      ...base,
      type: 'single_choice',
      prompt: 'Jak różnią się kryteria czasu trwania schizofrenii między DSM-5-TR a ICD-11?',
      options: [
        'DSM-5-TR wymaga >=6 miesięcy ciągłych zaburzeń (z >=1 mies. fazy aktywnej); ICD-11 wymaga >=1 miesiąca objawów osiowych',
        'Obie klasyfikacje wymagają dokładnie 1 miesiąca bez wyjątków',
        'ICD-11 wymaga 2 lat obserwacji ambulatoryjnej',
      ],
      answer: 0,
      explanation: 'DSM-5-TR wymaga 6-miesięcznego okna trwania zaburzeń (w tym >=1 miesiąc objawów kryterium A), podczas gdy ICD-11 ustala próg na 1 miesiąc objawów osiowych.',
    }),
  },
  'uklad-dopaminergiczny-d2-d3': {
    'lab-workbench': base => ({
      ...base,
      type: 'lab',
      prompt: 'PET wskazuje 84% occupancy D2 u pacjenta na haloperydolu. Jaka jest implikacja kliniczna heurystyki Kapura?',
      options: [
        'Powyżej 80% occupancy dla czystych antagonistów gwałtownie wzrasta ryzyko EPS przy braku dodatkowej korzyści',
        'Oznacza to pełną neuroprotekcję i brak działań niepożądanych',
        'Occupancy >80% ma zastosowanie wyłącznie do częściowych agonistów',
      ],
      answer: 0,
      explanation: 'Kapur wykazał, że okno 65–80% łączy skuteczność z niskim EPS dla antagonistów. Przekroczenie 80% occupancy dramatycznie zwiększa prawdopodobieństwo parkinsonizmu.',
    }),
  },
  'receptory-dopaminowe-okno-kapura': {
    'lab-workbench': base => ({
      ...base,
      type: 'lab',
      prompt: 'PET wskazuje 84% occupancy D2 u pacjenta na haloperydolu. Jaka jest implikacja kliniczna heurystyki Kapura?',
      options: [
        'Powyżej 80% occupancy dla czystych antagonistów gwałtownie wzrasta ryzyko EPS przy braku dodatkowej korzyści',
        'Oznacza to pełną neuroprotekcję i brak działań niepożądanych',
        'Occupancy >80% ma zastosowanie wyłącznie do częściowych agonistów',
      ],
      answer: 0,
      explanation: 'Kapur wykazał, że okno 65–80% łączy skuteczność z niskim EPS dla antagonistów. Przekroczenie 80% occupancy dramatycznie zwiększa prawdopodobieństwo parkinsonizmu.',
    }),
  },
  'neuroleptyki-generacje-profil': {
    'lab-workbench': base => ({
      ...base,
      type: 'lab',
      prompt: 'Dlaczego u częściowych agonistów D2 (np. arypiprazolu) occupancy >80% nie wywołuje takiego nasilenia parkinsonizmu jak u haloperydolu?',
      options: [
        'Dzięki obecności aktywności wewnętrznej (~30%), która zapewnia podstawową transmisję dopaminergiczną',
        'Ponieważ arypiprazol nie wiąże się w ogóle ze striatum',
        'Ponieważ częściowi agoniści całkowicie eliminują ryzyko akatyzji',
      ],
      answer: 0,
      explanation: 'Arypiprazol ma aktywność wewnętrzną rzędu 25–30%, zapobiegając całkowitemu wyłączeniu sygnału dopaminy w szlaku nigrostriatalnym (choć akatyzja nadal może wystąpić).',
    }),
  },
  'leki-przeciwpsychotyczne-generacje': {
    'lab-workbench': base => ({
      ...base,
      type: 'lab',
      prompt: 'Dlaczego u częściowych agonistów D2 (np. arypiprazolu) occupancy >80% nie wywołuje takiego nasilenia parkinsonizmu jak u haloperydolu?',
      options: [
        'Dzięki obecności aktywności wewnętrznej (~30%), która zapewnia podstawową transmisję dopaminergiczną',
        'Ponieważ arypiprazol nie wiąże się w ogóle ze striatum',
        'Ponieważ częściowi agoniści całkowicie eliminują ryzyko akatyzji',
      ],
      answer: 0,
      explanation: 'Arypiprazol ma aktywność wewnętrzną rzędu 25–30%, zapobiegając całkowitemu wyłączeniu sygnału dopaminy w szlaku nigrostriatalnym (choć akatyzja nadal może wystąpić).',
    }),
  },
  'leki-przeciwpsychotyczne-receptory': {
    'lab-workbench': base => ({
      ...base,
      type: 'lab',
      prompt: 'Oceń znaczenie antagonizmu 5-HT2A leków SGA w kontekście układu pozapiramidowego:',
      options: [
        'Blokada 5-HT2A zdejmuje hamulec z neuronów dopaminergicznych w prążkowiu, łagodząc ryzyko EPS',
        'Blokada 5-HT2A odpowiada wyłącznie za sedację',
        'Antagonizm 5-HT2A nasila hiperprolaktynemię',
      ],
      answer: 0,
      explanation: 'Serotonina hamuje uwalnianie dopaminy w prążkowiu przez 5-HT2A. Blokada tego receptora sprzyja uwalnianiu dopaminy i chroni przed EPS.',
    }),
  },
  'stabilizatory-lit': {
    'lab-workbench': base => ({
      ...base,
      type: 'lab',
      prompt: 'Pacjent na licie przyjmuje ibuprofen z powodu bólu kolana. Jaki mechanizm zagraża intoksykacją?',
      options: [
        'NLPZ hamują prostaglandyny nerkowe, zmniejszając filtrację i nasilając cewkową reabsorpcję litu',
        'NLPZ indukują metabolizm litu w wątrobie',
        'NLPZ powodują natychmiastowe wydalanie litu z moczem',
      ],
      answer: 0,
      explanation: 'Hamowanie syntezy prostaglandyn przez NLPZ zwęża tętniczkę doprowadzającą kłębuszka, obniża GFR i zwiększa wchłanianie zwrotne litu, grożąc toksycznością.',
    }),
  },
  'normotymiki-lit-walproinian-lamotrygina': {
    'lab-workbench': base => ({
      ...base,
      type: 'lab',
      prompt: 'Stężenie litu w surowicy wynosi 2,5 mmol/l u pacjenta z zaburzeniami świadomości i eGFR 28 ml/min. Co wskazują wytyczne EXTRIP 2015?',
      options: [
        'Hemodializa jest zalecana (RECOMMENDED) — neurotoksyczność i upośledzona eliminacja nerkowa',
        'Zalecane wyłącznie leczenie zachowawcze płynami glukozowymi',
        'Wystarczy odstawić lit i zbadać stężenie za 7 dni',
      ],
      answer: 0,
      explanation: 'Zgodnie z konsensusem EXTRIP 2015, obecność zaburzeń świadomości oraz obniżonego eGFR przy stężeniu >2,0 mmol/l stanowi wskazanie do hemodializy (RECOMMENDED).',
    }),
  },
  'stabilizatory-nastroju-normotymiki': {
    'lab-workbench': base => ({
      ...base,
      type: 'lab',
      prompt: 'Stężenie litu w surowicy wynosi 2,5 mmol/l u pacjenta z zaburzeniami świadomości i eGFR 28 ml/min. Co wskazują wytyczne EXTRIP 2015?',
      options: [
        'Hemodializa jest zalecana (RECOMMENDED) — neurotoksyczność i upośledzona eliminacja nerkowa',
        'Zalecane wyłącznie leczenie zachowawcze płynami glukozowymi',
        'Wystarczy odstawić lit i zbadać stężenie za 7 dni',
      ],
      answer: 0,
      explanation: 'Zgodnie z konsensusem EXTRIP 2015, obecność zaburzeń świadomości oraz obniżonego eGFR przy stężeniu >2,0 mmol/l stanowi wskazanie do hemodializy (RECOMMENDED).',
    }),
  },
  'monitorowanie-stezen-tdm': {
    'lab-workbench': base => ({
      ...base,
      type: 'lab',
      prompt: 'Jaki jest standardowy czas pobrania krwi do oznaczenia TDM litu wg wytycznych AGNP?',
      options: [
        '12 godzin po ostatniej dawce (± 30 min) w stanie stacjonarnym (po min. 4-7 dniach stałej dawki)',
        '2 godziny po przyjęciu porannej dawki',
        'W dowolnym momencie cyklu dobowego bez znaczenia dla interpretacji',
      ],
      answer: 0,
      explanation: 'Przedziały referencyjne AGNP dla litu (0,6–0,8 mmol/l) są zwalidowane wyłącznie dla stężenia minimalnego 12 h po dawce wieczornej w stanie stacjonarnym.',
    }),
  },
  'tdm-monitorowanie-agnp': {
    'lab-workbench': base => ({
      ...base,
      type: 'lab',
      prompt: 'Jaki jest standardowy czas pobrania krwi do oznaczenia TDM litu wg wytycznych AGNP?',
      options: [
        '12 godzin po ostatniej dawce (± 30 min) w stanie stacjonarnym (po min. 4-7 dniach stałej dawki)',
        '2 godziny po przyjęciu porannej dawki',
        'W dowolnym momencie cyklu dobowego bez znaczenia dla interpretacji',
      ],
      answer: 0,
      explanation: 'Przedziały referencyjne AGNP dla litu (0,6–0,8 mmol/l) są zwalidowane wyłącznie dla stężenia minimalnego 12 h po dawce wieczornej w stanie stacjonarnym.',
    }),
  },
  'tdm-zasady-agnp': {
    'lab-workbench': base => ({
      ...base,
      type: 'lab',
      prompt: 'Kiedy badanie TDM jest bezwzględnie wskazane jako poziom 1 (strongly recommended) wg AGNP?',
      options: [
        'Dla leków o wąskim indeksie terapeutycznym (lit) oraz w schizofrenii lekoopornej (klozapina)',
        'Wyłącznie przy podejrzeniu błędu laboratorium',
        'Dla każdego leku psychotropowego codziennie',
      ],
      answer: 0,
      explanation: 'Poziom 1 AGNP obejmuje leki o wąskim indeksie lub o krytycznej korelacji stężenia ze skutecznością i bezpieczeństwem (lit, klozapina).',
    }),
  },
  'ostre-stany-toksyczne-zespol-serotoninowy': {
    'pathway-builder': base => ({
      ...base,
      type: 'ordering',
      prompt: 'Ułóż właściwy algorytm postępowania w gałęzi 1 reguły decyzyjnej Huntera (spontaniczny klonus po 5-HT).',
      items: [
        'Potwierdź ekspozycję na substancję o działaniu proserotoninergicznym',
        'Zidentyfikuj obecność spontanicznego klonusu (Gałąź 1 reguły Huntera)',
        'Natychmiast odstaw leki serotoninergiczne i wdróż sedację benzodiazepinami i.v.',
        'Wdrożenie chłodzenia fizykalnego i monitorowania parametrów życiowych na OIT',
      ],
      correctOrder: [0, 1, 2, 3],
      explanation: 'Reguła Huntera wymaga bezwzględnie ekspozycji serotoninergicznej. Spontaniczny klonus spełnia gałąź 1 i wymaga pilnej interwencji.',
    }),
  },
  'interakcje-zespol-serotoninowy-hunter': {
    'pathway-builder': base => ({
      ...base,
      type: 'ordering',
      prompt: 'Ułóż hierarchię weryfikacji 5 gałęzi reguły decyzyjnej Huntera (Dunkley 2003).',
      items: [
        'Sprawdź obecność leku serotoninergicznego (warunek sine qua non)',
        'Oceń klonus spontaniczny (gałąź 1)',
        'Oceń klonus indukowany lub oczny z pobudzeniem bądź potami (gałęzie 2–3)',
        'Oceń drżenie z hiperrefleksją (gałąź 4) lub hipertonię z gorączką i klonusem (gałąź 5)',
      ],
      correctOrder: [0, 1, 2, 3],
      explanation: 'Reguła Huntera bada sekwencyjnie obecność klonusu i objawów autonomiczno-ruchowych wyłącznie przy potwierdzonej ekspozycji 5-HT.',
    }),
  },
  'farmakogenetyka-cyp-pgx': {
    'lab-workbench': base => ({
      ...base,
      type: 'lab',
      prompt: 'Pacjent ze statusem CYP2D6 Poor Metabolizer (PM) otrzymuje wenlafaksynę. Jak zmieni się farmakokinetyka?',
      options: [
        'Wzrost stężenia substancji macierzystej (wenlafaksyny), spadek aktywnego metabolitu O-desmetylu',
        'Natychmiastowe wypłukanie leku z ustroju bez żadnego działania',
        'Spadek stężenia substancji macierzystej o 90%',
      ],
      answer: 0,
      explanation: 'U wolnych metabolizatorów CYP2D6 (PM) konwersja wenlafaksyny do O-desmetylwenlafaksyny jest upośledzona, co podnosi stężenie związku macierzystego.',
    }),
  },
  'interakcje-cyp450': {
    'lab-workbench': base => ({
      ...base,
      type: 'lab',
      prompt: 'Do leczenia fluoksetyną (silny inhibitor CYP2D6) dołączono metoprolol. Jakiego efektu należy się spodziewać?',
      options: [
        'Hamowania metabolizmu metoprololu, kumulacji i ryzyka ciężkiej bradykardii/hipotonii',
        'Zmniejszenia stężenia metoprololu przez indukcję enzymatyczną',
        'Brak jakiejkolwiek interakcji farmakokinetycznej',
      ],
      answer: 0,
      explanation: 'Fluoksetyna jako silny inhibitor CYP2D6 wywołuje fenokonwersję do stanu PM, co może kilkukrotnie zwiększyć stężenie metoprololu we krwi.',
    }),
  },
  'bezpieczenstwo-kardiometaboliczne-qtc-prolaktyna': {
    'lab-workbench': base => ({
      ...base,
      type: 'lab',
      prompt: 'Dlaczego we wzorze Fridericia (QTcF = QT / RR^(1/3)) korekta jest dokładniejsza niż w klasycznym wzorze Bazetta przy tachykardii?',
      options: [
        'Wzór Bazetta nadmiernie wydłuża QTc przy tachykardii, podczas gdy Fridericia zachowuje stabilność fizjologiczną',
        'Wzór Fridericia nie uwzględnia częstości rytmu serca',
        'Bazett jest zalecany przez FDA dla wszystkich nowych leków',
      ],
      answer: 0,
      explanation: 'Formuła Fridericia (QTcF) jest uznawana przez wytyczne kardiologiczne i rejestracyjne (ICH E14) za znacznie mniej podatną na błędy przy częstościach >60/min.',
    }),
  },
  'wydluzenie-qtc-torsade': {
    'lab-workbench': base => ({
      ...base,
      type: 'lab',
      prompt: 'U pacjenta na escitalopramie stwierdzono QTcF 515 ms i hipokaliemię 3,1 mmol/l. Jakie jest postępowanie?',
      options: [
        'Pilna korekta hipokaliemii, monitorowanie EKG i weryfikacja wskazań do modyfikacji leczenia z uwagi na przekroczenie 500 ms',
        'Zwiększenie dawki leku do ustąpienia niepokoju',
        'Pojedynczy pomiar QTcF >500 ms nie wymaga żadnych działań',
      ],
      answer: 0,
      explanation: 'QTcF > 500 ms w obecności hipokaliemii to stan wysokiego ryzyka TdP, wymagający pilnego uzupełnienia K+ i redukcji obciążenia kardiotoksycznego.',
    }),
  },
  'bezpieczenstwo-qtc-eps-prolaktyna': {
    'lab-workbench': base => ({
      ...base,
      type: 'lab',
      prompt: 'Który z neuroleptyków wykazuje najniższe ryzyko wydłużenia QTc i hiperprolaktynemii w badaniach klinicznych?',
      options: [
        'Arypiprazol (częściowy agonista D2, neutralny profil QTc)',
        'Sertindol',
        'Haloperydol i.v.',
      ],
      answer: 0,
      explanation: 'Arypiprazol jako częściowy agonista nie blokuje szlaku guzkowo-lejkowego (brak hiperprolaktynemii) i charakteryzuje się bardzo niskim ryzykiem wydłużenia QTc.',
    }),
  },
  'ocd-i-petla-cstc': {
    'axis-map': base => ({
      ...base,
      type: 'single_choice',
      prompt: 'Co stanowi psychopatologiczną cechę odróżniającą natręctwa w OCD od urojeń w schizofrenii?',
      options: [
        'Egodystoniczność i zachowany krytycyzm (pacjent uznaje natręctwa za własne, lecz irracjonalne)',
        'Brak jakiegokolwiek lęku podczas wykonywania czynności natrętnej',
        'Poczucie nasyłania myśli przez obcą siłę zewnętrzną',
      ],
      answer: 0,
      explanation: 'W klasycznym OCD obsesje są egodystoniczne — pacjent doświadcza ich jako intruzywnych i bezsensownych (krytycyzm zachowany), w przeciwieństwie do egosyntonicznych urojeń.',
    }),
  },
  'zaburzenia-obsesyjno-kompulsyjne-ocd': {
    'axis-map': base => ({
      ...base,
      type: 'single_choice',
      prompt: 'Co stanowi psychopatologiczną cechę odróżniającą natręctwa w OCD od urojeń w schizofrenii?',
      options: [
        'Egodystoniczność i zachowany krytycyzm (pacjent uznaje natręctwa za własne, lecz irracjonalne)',
        'Brak jakiegokolwiek lęku podczas wykonywania czynności natrętnej',
        'Poczucie nasyłania myśli przez obcą siłę zewnętrzną',
      ],
      answer: 0,
      explanation: 'W klasycznym OCD obsesje są egodystoniczne — pacjent doświadcza ich jako intruzywnych i bezsensownych (krytycyzm zachowany), w przeciwieństwie do egosyntonicznych urojeń.',
    }),
  },
};

export function getPsychiatryWidgetProvider(lessonId?: string): WidgetProvider {
  if (lessonId && PSYCHIATRY_LESSON_ACTIVITY_REGISTRY[lessonId]) {
    return { ...PSYCHIATRY_PROVIDERS, ...PSYCHIATRY_LESSON_ACTIVITY_REGISTRY[lessonId] };
  }
  return PSYCHIATRY_PROVIDERS;
}
