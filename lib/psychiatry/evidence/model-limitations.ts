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
        'Nie wolno automatycznie zmieniać dawki o określoną liczbę miligramów wyłącznie na podstawie pojedynczego wyniku bez weryfikacji compliance i czasu pobrania.',
      ],
      uncertaintyOrCI: 'Wąski indeks terapeutyczny; stężenia >1,2 mmol/l niosą rosnące ryzyko neurotoksyczności.',
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
        'Sama prawidłowa liczba ms NIE oznacza automatycznego „braku przeciwwskazań” bez oceny wywiadu omdleń, wywiadu rodzinnego SCD i elektrolitów.',
      ],
      uncertaintyOrCI: 'Błąd pomiaru QT w EKG wynosi typowo ±10–20 ms.',
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
};

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
