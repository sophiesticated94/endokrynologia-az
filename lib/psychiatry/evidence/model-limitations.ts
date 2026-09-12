import type { EvidenceItem, ModelCard } from './evidence-types';

export const PSYCHIATRY_EVIDENCE_REGISTRY: Record<string, EvidenceItem> = {
  'd2-kapur-heuristic': {
    id: 'd2-kapur-heuristic',
    claimLabel: 'Historyczna heurystyka 65–80% blokady D2 dla antagonistów',
    origin: 'MODELLED',
    level: 'PET',
    sourceId: 'pet-d2-kapur',
    quickSummary:
      'Klasyczna reguła empiryczna z badań PET dla czystych antagonistów D2: >65% wiąże się ze statystyczną odpowiedzią przeciwpsychotyczną, a >80% ze skokowym wzrostem EPS.',
    clinicalContext: {
      population: 'Dorośli chorzy na schizofrenię w fazie zaostrzenia (badania PET)',
      measurementMethod: 'Pozytonowa tomografia emisyjna (PET) z ligandem [11C]raklopryd w prążkowiu',
      applicability: 'Czyści antagoniści D2 (np. haloperidol, risperidon, olanzapina)',
      timing: 'Pomiary w stanie stacjonarnym (peak/trough)',
      doseRange: 'Terapeutyczne zakresy dawek FGA i SGA',
    },
    researchContext: {
      modelType: 'Hiperboliczne dopasowanie wiązania Emax w PET',
      limitations: [
        'Heurystyka NIE ma zastosowania do częściowych agonistów D2/D3 (arypiprazol, kariprazyna), którzy przy 85% occupancy mają niskie ryzyko EPS ze względu na wewnętrzną aktywność agonisty.',
        'Wartość occupancy w prążkowiu nie jest bezpośrednim predyktorem remisji u konkretnego pacjenta.',
      ],
      whatCannotBeInferred: [
        'Nie wolno wnioskować, że <65% occupancy u danego pacjenta oznacza brak jakiejkolwiek skuteczności.',
        'Nie wolno wnioskować, że każdy pacjent z occupancy >80% rozwinie ostre objawy pozapiramidowe.',
      ],
      uncertaintyOrCI: 'Rozrzut międzyosobniczy stężeń osoczowych przy tej samej dawce wynosi 3–10 razy.',
    },
  },

  'haloperidol-pet-ed50': {
    id: 'haloperidol-pet-ed50',
    claimLabel: 'Haloperidol ED50 w badaniach PET: ~1,6 mg/d dla 50% occupancy D2',
    origin: 'MODELLED',
    level: 'PET',
    sourceId: 'pet-d2-kapur',
    quickSummary:
      'W populacyjnych badaniach PET dawka haloperidolu około 1,6 mg/d daje szacunkowo 50% blokady D2, a dawka 3–5 mg/d osiąga okno 65–80%.',
    clinicalContext: {
      population: 'Pacjenci ze schizofrenią poddani badaniu [11C]raklopryd PET',
      measurementMethod: 'Badanie wiązania z receptorem D2 w prążkowiu',
      applicability: 'Czysty antagonista D2 haloperidol',
      timing: 'Stan stacjonarny po podaniu doustnym',
      doseRange: 'Zakres dawek badanych w protokole: 1–10 mg/d',
    },
    researchContext: {
      modelType: 'Populacyjny fit krzywej wysycenia: Occupancy = Dose / (ED50 + Dose)',
      limitations: [
        'Model odzwierciedla średnią populacyjną, nie precyzyjne stężenie u konkretnego chorego.',
        'Nie uwzględnia indywidualnego fenotypu metabolizmu ani zmienności wchłaniania.',
      ],
      whatCannotBeInferred: [
        'Nie wolno stosować jako kalkulatora gwarantującego określone stężenie u konkretnego pacjenta.',
      ],
      uncertaintyOrCI: 'Szacowane ED50 w literaturze waha się w przedziale 1,2–2,0 mg/d w zależności od kohorty.',
    },
  },

  'lithium-maintenance-tdm-range': {
    id: 'lithium-maintenance-tdm-range',
    claimLabel: 'Docelowe stężenie podtrzymujące litu: 0,6–0,8 mmol/l (AGNP 2026)',
    origin: 'MEASURED',
    level: 'CONSENSUS',
    sourceId: 'agnp-tdm-2026',
    quickSummary:
      'Konsensualny przedział optymalnej profilaktyki nawrotów w ChAD przy minimalizacji długofalowej nefrotoksyczności.',
    clinicalContext: {
      population: 'Dorośli pacjenci z ChAD w fazie profilaktyki podtrzymującej',
      measurementMethod: 'Jonoselektywna elektroda (ISE) lub spektrofotometria absorpcji atomowej w surowicy',
      applicability: 'Doustne preparaty soli litu (węglan, asparaginian)',
      timing: 'Ściśle 12 h (±30 min) od ostatniej dawki wieczornej',
      doseRange: 'Zindywidualizowana dawka dobowa',
    },
    researchContext: {
      modelType: 'Konsensus międzynarodowy EBM (AGNP TDM Level 1: Strongly Recommended)',
      limitations: [
        'W ostrym epizodzie manii dopuszczalne jest wyższe okno (0,8–1,0 mmol/l).',
        'Stężenia >1,2 mmol/l niosą rosnące ryzyko neurotoksyczności niezależnie od samopoczucia.',
      ],
      whatCannotBeInferred: [
        'Pojedynczy wynik w normie nie wyklucza toksyczności przy ostrym odwodnieniu lub hiponatremii.',
      ],
      uncertaintyOrCI: 'Wąski indeks terapeutyczny; granica bezpieczeństwa <1,2 mmol/l.',
    },
  },

  'lithium-12h-sampling': {
    id: 'lithium-12h-sampling',
    claimLabel: 'Pobieranie próbki litu ściśle 12 h po dawce wieczornej',
    origin: 'MEASURED',
    level: 'CONSENSUS',
    sourceId: 'agnp-tdm-2026',
    quickSummary:
      'Złoty standard standaryzacji próbki: faza dystrybucji tkankowej litu kończy się po 8–10 godzinach od przyjęcia leku.',
    clinicalContext: {
      population: 'Wszyscy chorzy przyjmujący lit w reżimie 1x dziennie (wieczorem) lub 2x dziennie',
      measurementMethod: 'Krew żylna pobrana na czczo przed poranną dawką',
      applicability: 'Standaryzowane oznaczanie stężenia litu w surowicy',
      timing: 'Ściśle 12 godzin (dopuszczalne odchylenie ±30 minut)',
    },
    researchContext: {
      modelType: 'Standaryzacja farmakokinetyczna fazy eliminacji',
      limitations: [
        'Pobranie przed 10 h daje fałszywie zawyżone stężenie w fazie dystrybucji.',
        'Pobranie po >14 h daje zaniżone stężenie w wyniku postępującego klirensu nerkowego.',
      ],
      whatCannotBeInferred: [
        'Wynik z nieznanego lub nieprawidłowego czasu pobrania nie może stanowić podstawy do korekty dawki.',
      ],
    },
  },

  'hunter-validation': {
    id: 'hunter-validation',
    claimLabel: 'Walidacja kryteriów Huntera: Czułość 84%, Swoistość 97%',
    origin: 'DERIVED',
    level: 'DECISION_RULE',
    sourceId: 'hunter-criteria',
    quickSummary:
      'Walidowana reguła decyzyjna toksyczności serotoninergicznej (Dunkley 2003, N=473) przewyższająca dawną klasyfikację Sternbacha.',
    clinicalContext: {
      population: 'Pacjenci z podejrzeniem zespołu serotoninowego po lekach serotoninergicznych',
      measurementMethod: 'Ocena fizykalna klonusu (spontaniczny, indukowany, oczny), drżeń, pobudzenia i potów',
      applicability: 'Ekspozycja na co najmniej 1 lek proserotoninergiczny jest warunkiem koniecznym',
    },
    researchContext: {
      modelType: 'Drzewo decyzyjne oparte na regresji logistycznej',
      limitations: [
        'Klonus może być osłabiony po podaniu leków sedatywnych (benzodiazepiny, miorelaksanty).',
        'Nie zastępuje oceny temperatury ciała i parametrów krążeniowych w stanach zagrożenia życia.',
      ],
      whatCannotBeInferred: [
        'Brak klonusu nie wyklucza łagodnych działań niepożądanych SSRI (np. nudności, tachykardii).',
      ],
      uncertaintyOrCI: 'Badanie prospektywne N=473, czułość 84% (95% CI 75–91%), swoistość 97% (95% CI 95–99%).',
    },
  },

  'qtc-risk-threshold': {
    id: 'qtc-risk-threshold',
    claimLabel: 'Progi ryzyka komorowych zaburzeń rytmu (TdP): QTc >470/480 ms i >500 ms',
    origin: 'DERIVED',
    level: 'GUIDELINE',
    sourceId: 'crediblemeds-qt',
    quickSummary:
      'Wzór Fridericii (QTcF): granica ostrzegawcza to 470 ms (M) / 480 ms (K), a bezwzględny próg krytyczny to >500 ms lub wydłużenie o >60 ms od wyjścia.',
    clinicalContext: {
      population: 'Pacjenci leczeni lekami psychotropowymi z listy CredibleMeds',
      measurementMethod: '12-odprowadzeniowy EKG, automatyczny pomiar QT skorygowany wzorem Fridericii (QTcF = QT / RR^0.333)',
      applicability: 'Zalecany wzór Fridericii przy tętnie 50–100 bpm (mniejsza dysproporcja niż Bazett)',
    },
    researchContext: {
      modelType: 'Korekcja potęgowa odstępu QT z konsensusem kardiologicznym',
      limitations: [
        'Nie ma bezpośredniego zastosowania przy bloku odnóg pęczka Hisa (LBBB/RBBB wymaga JTc).',
        'Prawidłowe QTc w spoczynku nie zabezpiecza przed TdP w obecności ostrej hipokaliemii.',
      ],
      whatCannotBeInferred: [
        'Samo QTc <450 ms NIE jest gwarancją bezpieczeństwa przy jednoczesnym podaniu dwóch leków z Known Risk TdP.',
      ],
      uncertaintyOrCI: 'Błąd ręcznego i automatycznego odczytu QT wynosi typowo ±10–20 ms.',
    },
  },

  'extrip-lithium-recommendation': {
    id: 'extrip-lithium-recommendation',
    claimLabel: 'Wytyczne EXTRIP: Kwalifikacja do leczenia pozaustrojowego (hemodializy) w zatruciu litem',
    origin: 'DERIVED',
    level: 'CONSENSUS',
    sourceId: 'extrip-lithium',
    quickSummary:
      'Wielodyscyplinarny konsensus EXTRIP definiuje poziomy RECOMMENDED i SUGGESTED w oparciu o stan neurologiczny, funkcję nerek i stężenie litu.',
    clinicalContext: {
      population: 'Pacjenci z ostrym lub przewlekłym zatruciem litem',
      measurementMethod: 'Monitorowanie stężenia litu, eGFR, gazometrii i badania neurologicznego',
      applicability: 'Wskazania do dializoterapii / leczenia pozaustrojowego (ECTR)',
    },
    researchContext: {
      modelType: 'Systematyczny przegląd i rekomendacje panelu ekspertów EXTRIP (Decker et al. 2015)',
      limitations: [
        'Zalecenia nie zastępują indywidualnej konsultacji toksykologa i nefrologa w OIT.',
        'Wymagają oceny dynamiki zmian stężenia i przewidywanego czasu eliminacji litu.',
      ],
      whatCannotBeInferred: [
        'Pojedyncza sztywna liczba stężenia (np. >4,0 mmol/l) bez oceny eGFR i objawów neurologicznych nie jest jedynym kryterium.',
      ],
    },
  },

  'lithium-tdm-window': {
    id: 'lithium-tdm-window',
    claimLabel: 'Zakres stężenia terapeutycznego litu 12h po dawce (0,6–0,8 mmol/l)',
    origin: 'MEASURED',
    level: 'CONSENSUS',
    sourceId: 'agnp-tdm-2026',
    quickSummary:
      'Okienko referencyjne w stanie stacjonarnym pobrane ściśle 12 godzin po ostatniej dawce wieczornej.',
    clinicalContext: {
      population: 'Dorośli pacjenci z ChAD w fazie podtrzymującej lub ostrym epizodzie manii',
      measurementMethod: 'Jonoselektywna elektroda (ISE) lub spektrofotometria absorpcji atomowej w surowicy',
      applicability: 'Doustne preparaty węglanu litu i asparaginianu litu',
      timing: 'Ściśle 12 h (±30 min) od ostatniej dawki wieczornej po min. 5–7 dniach na stałej dawce',
    },
    researchContext: {
      modelType: 'Konsensus międzynarodowy EBM (AGNP TDM Level 1: Strongly Recommended)',
      limitations: [
        'Próbka pobrana przed 12h (faza dystrybucji) daje fałszywie zawyżone wartości.',
        'Samo stężenie bez oceny eGFR, sodu, nawodnienia i objawów neurologicznych nie wyklucza wczesnej neurotoksyczności.',
      ],
      whatCannotBeInferred: [
        'Nie wolno automatycznie zmieniać dawki o określoną liczbę miligramów wyłącznie na podstawie pojedynczego wyniku.',
      ],
      uncertaintyOrCI: 'Wąski indeks terapeutyczny; stężenia >1,2 mmol/l niosą rosnące ryzyko neurotoksyczności.',
    },
  },

  'hunter-decision-criteria': {
    id: 'hunter-decision-criteria',
    claimLabel: 'Kryteria decyzyjne Huntera toksyczności serotoninergicznej (2003)',
    origin: 'DERIVED',
    level: 'DECISION_RULE',
    sourceId: 'hunter-criteria',
    quickSummary:
      'Walidowana reguła decyzyjna oparta na klonusie, pobudzeniu i hipertermii w kontekście ekspozycji na leki serotoninergiczne.',
    clinicalContext: {
      population: 'Pacjenci po przedawkowaniu lub politerapii lekami serotoninergicznymi',
      measurementMethod: 'Ocena kliniczna klonusu (spontaniczny, indukowany, oczny), odruchów ścięgnistych i temperatury ciała',
      applicability: 'Warunkiem koniecznym jest udokumentowana ekspozycja na co najmniej jeden lek proserotoninergiczny',
    },
    researchContext: {
      modelType: 'Drzewo decyzyjne z czułością 84% i swoistością 97% względem oceny toksykologa',
      limitations: [
        'Kryteria nie diagnozują łagodnych form toksyczności (np. samo nudności, niepokój).',
        'Klonus może być tłumiony przy jednoczesnym przyjęciu leków zwiotczających mięśnie lub benzodiazepin.',
      ],
      whatCannotBeInferred: [
        'Klonus NIE jest patognomoniczny dla zespołu serotoninowego w oderwaniu od wywiadu lekowego.',
        'Cyproheptadyna NIE jest stuprocentową specyficzną odtrutką; podstawą jest intensywne leczenie objawowe i chłodzenie.',
      ],
      uncertaintyOrCI: 'Czułość 84%, swoistość 97% w badaniu Dunkley 2003 (N=473 pacjentów).',
    },
  },

  'fridericia-qtc-threshold': {
    id: 'fridericia-qtc-threshold',
    claimLabel: 'Wzór Fridericii i progi ryzyka arytmii komorowej (CredibleMeds)',
    origin: 'DERIVED',
    level: 'GUIDELINE',
    sourceId: 'crediblemeds-qt',
    quickSummary:
      'Korekcja odstępu QT wzorem sześciennym Fridericii z oceną kontekstu klinicznego (potas, magnez, leki współistniejące).',
    clinicalContext: {
      population: 'Pacjenci przyjmujący leki psychotropowe blokujące kanał hERG/IKr',
      measurementMethod: '12-odprowadzeniowy EKG spoczynkowy, pomiar manualny lub uśredniony w odprowadzeniu II/V5',
      applicability: 'Tętno 50–100 bpm; wzór Fridericii ma mniejszą zależność od częstości serca niż Bazett',
    },
    researchContext: {
      modelType: 'Korekcja potęgowa: QTcF = QT / (60/HR)^(1/3)',
      limitations: [
        'Obliczony QTcF nie uwzględnia zaburzeń przewodzenia śródkomorowego (LBBB, RBBB wymagają JTc).',
        'Prawidłowy QTcF w pojedynczym EKG nie gwarantuje bezpieczeństwa przy dynamicznym spadku K+ lub odwodnieniu.',
      ],
      whatCannotBeInferred: [
        'Sama prawidłowa liczba ms NIE oznacza automatycznego „braku przeciwwskazań” bez oceny wywiadu omdleń i elektrolitów.',
      ],
      uncertaintyOrCI: 'Błąd pomiaru QT w EKG wynosi typowo ±10–20 ms.',
    },
  },

  'clinical-framework': {
    id: 'clinical-framework',
    claimLabel: 'Standardy nozologiczne ICD-11 CDDR i DSM-5-TR',
    origin: 'DERIVED',
    level: 'GUIDELINE',
    sourceId: 'icd11-cddr',
    quickSummary:
      'Operacyjne kryteria diagnostyczne oparte na badaniu MSE, osi czasu objawów, wykluczeniu masek somatycznych i dysfunkcji społecznej.',
    clinicalContext: {
      population: 'Dorośli pacjenci w ocenie psychiatrycznej ambulatoryjnej i szpitalnej',
      measurementMethod: 'Ustrukturyzowany wywiad kliniczny i systematyczne badanie stanu psychicznego (MSE)',
      applicability: 'Zaburzenia afektywne, psychotyczne, lękowe, obsesyjno-kompulsyjne i neurorozwojowe',
    },
    researchContext: {
      limitations: [
        'Kryteria kategoryczne nie zawsze oddają wymiarową i wieloczynnikową naturę fenotypów psychicznych.',
        'Diagnoza wymaga rzetelnego wykluczenia podłoża somatycznego i toksycznego.',
      ],
      whatCannotBeInferred: [
        'Samo spełnienie kryteriów opisowych nie definiuje jednoznacznego biologicznego mechanizmu przyczynowego u jednostki.',
      ],
    },
  },

  'safety-context': {
    id: 'safety-context',
    claimLabel: 'Standardy bezpieczeństwa farmakoterapii i monitorowania powikłań',
    origin: 'DERIVED',
    level: 'GUIDELINE',
    sourceId: 'maudsley15',
    quickSummary:
      'Protokoły wczesnego wykrywania stanów nagłych (NMS, zespół serotoninowy, wydłużenie QTc, agranulocytoza, akatyzja).',
    clinicalContext: {
      population: 'Pacjenci w trakcie ostrej lub przewlekłej psychofarmakoterapii',
      measurementMethod: 'Nadzór laboratoryjny (morfologia, elektrolity, enzymy, TDM) i monitorowanie EKG/fizykalne',
      applicability: 'Leki przeciwpsychotyczne, normotymiki, leki przeciwdepresyjne i psychostymulanty',
    },
    researchContext: {
      limitations: [
        'Brak objawów w spoczynku nie gwarantuje bezpieczeństwa przy dynamicznych interakcjach lekowych lub odwodnieniu.',
      ],
      whatCannotBeInferred: [
        'Prawidłowe badania wyjściowe nie zwalniają z okresowego monitorowania w trakcie modyfikacji dawek.',
      ],
    },
  },

  'sert-meyer-observation': {
    id: 'sert-meyer-observation',
    claimLabel: 'Wysycenie SERT ~80% w badaniach PET (Meyer 2004)',
    origin: 'MODELLED',
    level: 'PET',
    sourceId: 'pet-d2-kapur',
    quickSummary:
      'W populacyjnych badaniach PET (Meyer et al. 2004) minimalne dawki terapeutyczne SSRI osiągają ~80% blokady SERT w prążkowiu; dalsze zwiększanie dawki powoduje plateau saturacji.',
    clinicalContext: {
      population: 'Dorośli chorzy na depresję leczeni lekami z grupy SSRI/SNRI',
      measurementMethod: 'Pozytonowa tomografia emisyjna (PET) z ligandem [11C]DASB',
      applicability: 'Leki blokujące transporter serotoniny (SERT)',
      timing: 'Stan stacjonarny po doustnym podaniu leku',
      doseRange: 'Zakresy dawek terapeutycznych (np. sertralina 50 mg, escitalopram 10 mg)',
    },
    researchContext: {
      modelType: 'Hiperboliczna krzywa saturacji: Emax * Dose / (ED50 + Dose)',
      limitations: [
        'Zajęcie SERT w badaniu PET nie gwarantuje natychmiastowej remisji u danego pacjenta.',
        'Wymaga 2–4 tygodni na adaptację postsynaptyczną (desensytyzację autoreceptorów 5-HT1A).',
      ],
      whatCannotBeInferred: [
        'Nie wolno zakładać, że wyższe dawki nie mają innych działań (np. DAT przy sertralinie >150 mg).',
      ],
      uncertaintyOrCI: 'W badaniu Meyera occupancy SERT przy dawkach standardowych wynosiło średnio 78–85%.',
    },
  },

  'clozapine-smoking-cyp1a2': {
    id: 'clozapine-smoking-cyp1a2',
    claimLabel: 'Wpływ palenia tytoniu na stężenie klozapiny (CYP1A2)',
    origin: 'MEASURED',
    level: 'CONSENSUS',
    sourceId: 'agnp-tdm-2026',
    quickSummary:
      'Wielopierścieniowe węglowodory aromatyczne (WWA) w dymie tytoniowym indukują CYP1A2. Po zaprzestaniu palenia dochodzi do deindukcji enzymu i opisywanego w literaturze wzrostu stężenia klozapiny o 50–100%, co wymaga pilnego TDM.',
    clinicalContext: {
      population: 'Pacjenci leczeni klozapiną lub olanzapiną zmieniający status palenia tytoniu',
      measurementMethod: 'Oznaczenie TDM w surowicy przed poranną dawką (trough)',
      applicability: 'Substraty enzymu CYP1A2; NRT nie zawiera WWA i nie indukuje enzymu',
      timing: 'Deindukcja zachodzi w ciągu 1–2 tygodni po zaprzestaniu palenia',
      doseRange: 'Wszystkie zakresy dawek klozapiny',
    },
    researchContext: {
      modelType: 'Deindukcja enzymatyczna ze znaczną zmiennością międzyosobniczą',
      limitations: [
        'Wzrost o 50–100% stanowi przedział opisywany w literaturze; rzeczywisty wzrost zależy od polimorfizmu CYP1A2 i liczby wypalanych papierosów.',
        'Infekcja i stan zapalny (IL-6) mogą dodatkowo gwałtownie zredukować aktywność CYP1A2.',
      ],
      whatCannotBeInferred: [
        'Nie wolno modyfikować dawek w ciemno bez wykonania oznaczenia stężenia leku (TDM).',
      ],
      uncertaintyOrCI: 'Zmienność międzyosobnicza klirensu klozapiny jest 3–5-krotna.',
    },
  },

  'extrip-lithium-2015': {
    id: 'extrip-lithium-2015',
    claimLabel: 'Kryteria leczenia nerkozastępczego w zatruciu litem (EXTRIP 2015)',
    origin: 'DERIVED',
    level: 'GUIDELINE',
    sourceId: 'extrip-lithium',
    quickSummary:
      'Zalecenia grupy EXTRIP (Decker 2015): hemodializa zalecana (RECOMMENDED) przy śpiączce, drgawkach, groźnych dysrytmiach lub litemii >4,0 mmol/l przy eGFR <45 ml/min.',
    clinicalContext: {
      population: 'Pacjenci z ostrym, przewlekłym lub zaostrzonym zatruciem litem',
      measurementMethod: 'Oznaczenie stężenia litu w surowicy i ocena eGFR/diurezy',
      applicability: 'Zatrucia litem o różnym przebiegu czasowym',
    },
    researchContext: {
      limitations: [
        'Decyzja o hemodializie opiera się na całościowym stanie klinicznym, nie samym odizolowanym stężeniu.',
      ],
      whatCannotBeInferred: [
        'Pojedyncza litemia <4,0 mmol/l nie wyklucza wskazań do ECTR przy obecności drgawek lub śpiączki.',
      ],
    },
  },

  'strawn-nms-pathophysiology': {
    id: 'strawn-nms-pathophysiology',
    claimLabel: 'Patofizjologia i diagnostyka NMS (Strawn et al. 2007)',
    origin: 'DERIVED',
    level: 'GUIDELINE',
    sourceId: 'strawn-nms',
    quickSummary:
      'Ostra blokada receptorów D2 w podwzgórzu i zwojach podstawy wywołuje sztywność ołowianej rury, hipertermię, skok CK i niestabilność wegetatywną.',
    clinicalContext: {
      population: 'Pacjenci leczeni lekami przeciwpsychotycznymi o silnym powinowactwie do D2',
      measurementMethod: 'Ocena napięcia mięśniowego, temperatury i poziomu kinazy kreatynowej (CK)',
      applicability: 'Różnicowanie stanów nagłych z zespołem serotoninowym i złośliwą hipertermią',
    },
    researchContext: {
      limitations: [
        'Wzrost CK może wystąpić po iniekcji domięśniowej lub pobudzeniu ruchowym bez NMS.',
      ],
      whatCannotBeInferred: [
        'Obecność gorączki u pacjenta na neuroleptyku nie dowodzi automatycznie NMS bez cech sztywności.',
      ],
    },
  },
};

// Aliases for claimKey lookups
PSYCHIATRY_EVIDENCE_REGISTRY['kapur-d2-threshold'] = PSYCHIATRY_EVIDENCE_REGISTRY['d2-kapur-heuristic'];
PSYCHIATRY_EVIDENCE_REGISTRY['agnp-consensus-2026'] = PSYCHIATRY_EVIDENCE_REGISTRY['lithium-maintenance-tdm-range'];
PSYCHIATRY_EVIDENCE_REGISTRY['crediblemeds-qtc'] = PSYCHIATRY_EVIDENCE_REGISTRY['qtc-risk-threshold'];
PSYCHIATRY_EVIDENCE_REGISTRY['meyer-sert-occupancy'] = PSYCHIATRY_EVIDENCE_REGISTRY['sert-meyer-observation'];

export const MODEL_CARDS: Record<string, ModelCard> = {
  'lithium-pk-sensitivity': {
    modelId: 'lithium-pk-sensitivity',
    name: 'Jakościowy model wrażliwości farmakokinetycznej litu',
    assumptions: [
      'Lit jest wydalany w 95% przez nerki z filtracją kłębuszkową i reabsorpcją w kanalikach proksymalnych (~80%).',
      'Odwodnienie i spadek stężenia sodu zwiększają reabsorpcję proksymalną litu.',
      'Tiazydy, NLPZ i inhibitory ACE/ARB obniżają klirens nerkowy litu.',
    ],
    validationRange: 'Zastosowanie wyłącznie edukacyjne — ilustracja kierunku zmian ekspozycji',
    limitations: [
      'Model NIE estymuje dokładnego stężenia osoczowego konkretnego pacjenta.',
      'Rzeczywisty klirens zależy od indywidualnej reabsorpcji cewkowej i hydratacji.',
    ],
    knownFailureModes: [
      'Stosowanie jako zastępstwo laboratoryjnego badania TDM grozi błędem dawkowania.',
    ],
    isPatientPredictor: false,
  },
};
