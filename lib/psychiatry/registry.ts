import type { Lesson, LessonExperienceV2 } from '../course-types.ts';
import type {
  PsychiatryLessonId,
  PsychiatryLessonEnhancement,
  PsychiatryLessonEnhancementRegistry,
} from './types.ts';
import { buildAllPsychiatryExperiences } from './experiences/index.ts';

export const PSYCHIATRY_LESSON_ENHANCEMENTS_DATA: Record<
  PsychiatryLessonId,
  Omit<PsychiatryLessonEnhancement, 'lessonId' | 'experience'>
> = {
  'wywiad-psychiatryczny-mse': {
    diagrams: ['mse-map'],
    inlineWidgets: ['mse-workbench'],
    workbenchPresetId: 'mse-young-adult-001',
    caseId: 'case-wywiad-psychiatryczny-mse',
    recurringPatientId: 'thread-psychosis-trs',
    whatChangesYourMind: {
      knownFacts: ['Zaniedbanie higieny i ubioru', 'Spowolnienie psychoruchowe', 'Urojenia ksobne bez usystematyzowania'],
      unknownFactors: ['Testy toksykologiczne moczu', 'Dokładna oś czasu objawów od bliskich'],
      criticalDifferentiatingFactor: 'Nagły początek po substancji psychoaktywnej vs powolny wielomiesięczny prodrom (ARMS)',
    },
    evidenceMode: 'clinical-framework',
  },
  'klasyfikacje-dsm5-icd11': {
    diagrams: [],
    inlineWidgets: ['criteria-matcher'],
    caseId: 'case-klasyfikacje-dsm5-icd11',
    whatChangesYourMind: {
      knownFacts: ['Czas trwania objawów >2 tygodni', 'Obniżenie nastroju po stracie'],
      unknownFactors: ['Kontekst żałoby', 'Symptomatologia wegetatywna'],
      criticalDifferentiatingFactor: 'Obecność myśli samobójczych lub cech psychotycznych wyklucza niepowikłaną reakcję adaptacyjną',
    },
    evidenceMode: 'clinical-framework',
  },
  'psychopatologia-objawow': {
    diagrams: ['psychosis-differential'],
    inlineWidgets: [],
    caseId: 'case-psychopatologia-objawow',
    whatChangesYourMind: {
      knownFacts: ['Głosy komentujące zza ściany', 'Poczucie podsłuchu'],
      unknownFactors: ['Wywiad neurologiczny', 'Badanie neuroobrazowe'],
      criticalDifferentiatingFactor: 'Obecność aury węchowej lub napadów z utratą kontaktu kieruje diagnostykę w stronę padaczki skroniowej',
    },
    evidenceMode: 'clinical-framework',
  },
  'depresja-fenotypy-i-kryteria': {
    diagrams: ['bdnf-trkb-pathway'],
    inlineWidgets: [],
    workbenchPresetId: 'depressive-differential-001',
    caseId: 'case-depresja-fenotypy-i-kryteria',
    recurringPatientId: 'thread-bipolar-spectrum',
    whatChangesYourMind: {
      knownFacts: ['Utrata odczuwania przyjemności', 'Wczesne wybudzanie rano', 'Utrata masy ciała'],
      unknownFactors: ['Ukryty wywiad hipomanii w przeszłości', 'Profil hormonów tarczycy i ferrytyna'],
      criticalDifferentiatingFactor: 'Ujawnienie choćby 4-dniowego epizodu hipomanii zmienia całą strategię leczenia z MDD na ChAD typu II',
    },
    evidenceMode: 'clinical-framework',
  },
  'mania-hipomania-spektrum': {
    diagrams: ['mood-timeline'],
    inlineWidgets: [],
    workbenchPresetId: 'bipolar-timeline-001',
    caseId: 'case-mania-hipomania-spektrum',
    recurringPatientId: 'thread-bipolar-spectrum',
    whatChangesYourMind: {
      knownFacts: ['Zmniejszona potrzeba snu', 'Wzmożona rozmowność', 'Brak istotnego zaburzenia funkcjonowania'],
      unknownFactors: ['Stosowanie leków przeciwdepresyjnych', 'Wywiad rodzinny w kierunku ChAD'],
      criticalDifferentiatingFactor: 'Pojawienie się jakichkolwiek objawów psychotycznych natychmiast klasyfikuje stan jako manię (nie hipomanię)',
    },
    evidenceMode: 'clinical-framework',
  },
  'psychoza-i-szlaki-dopaminy': {
    diagrams: ['d2-pathways', 'psychosis-differential'],
    inlineWidgets: ['d2-pet-explorer'],
    caseId: 'case-psychoza-i-szlaki-dopaminy',
    recurringPatientId: 'thread-psychosis-trs',
    whatChangesYourMind: {
      knownFacts: ['Urojenia ksobne', 'Rozkojarzenie toku myślenia', 'Wycofanie społeczne'],
      unknownFactors: ['Obecność i nasilenie komponenty afektywnej'],
      criticalDifferentiatingFactor: 'Utrzymywanie się urojeń poza epizodem depresyjnym/maniakalnym przez >2 tygodnie przesądza o schizoafektywności lub schizofrenii',
    },
    evidenceMode: 'pet-model',
  },
  'zaburzenia-lekowe-gad-napadowy': {
    diagrams: ['fear-circuit'],
    inlineWidgets: [],
    caseId: 'case-zaburzenia-lekowe-gad-napadowy',
    recurringPatientId: 'thread-anxiety-dependence',
    whatChangesYourMind: {
      knownFacts: ['Napady lęku panicznego w zatłoczonych miejscach', 'Zachowania unikające'],
      unknownFactors: ['Spożycie kofeiny i napojów energetycznych', 'EKG (ocena odstępu QTc i rytmu)'],
      criticalDifferentiatingFactor: 'Wykrycie częstoskurczu napadowego w badaniu Holter EKG wyklucza pierwotne podłoże paniczne',
    },
    evidenceMode: 'clinical-framework',
  },
  'ocd-i-petla-cstc': {
    diagrams: ['cstc-loop'],
    inlineWidgets: [],
    workbenchPresetId: 'ocd-cstc-preset-001',
    caseId: 'case-ocd-i-petla-cstc',
    recurringPatientId: 'thread-ocd-circuitry',
    whatChangesYourMind: {
      knownFacts: ['Natrętne myśli o skażeniu patogenami', 'Kompulsyjne mycie dłoni przez 4 godziny dziennie'],
      unknownFactors: ['Stopień wglądu i zachowania oporu', 'Poczucie egodystonii'],
      criticalDifferentiatingFactor: 'Utrata krytycyzmu i przekonanie o bezwzględnej realności zagrożenia kieruje diagnostykę w stronę spektrum psychozy',
    },
    evidenceMode: 'clinical-framework',
  },
  'ptsd-trauma-stres': {
    diagrams: ['fear-circuit'],
    inlineWidgets: [],
    caseId: 'case-ptsd-trauma-stres',
    whatChangesYourMind: {
      knownFacts: ['Nawracające koszmary senne i intruzje po wypadku komunikacyjnym'],
      unknownFactors: ['Używanie alkoholu jako metody uśmierzania pobudzenia', 'Epizody dysocjacyjne'],
      criticalDifferentiatingFactor: 'Złożona dysregulacja afektu i chroniczne poczucie bezwartościowości wskazują na postać CPTSD wg ICD-11',
    },
    evidenceMode: 'clinical-framework',
  },
  'adhd-dorosli-i-rozwojowe': {
    diagrams: [],
    inlineWidgets: [],
    workbenchPresetId: 'adhd-adult-preset-001',
    caseId: 'case-adhd-dorosli-i-rozwojowe',
    whatChangesYourMind: {
      knownFacts: ['Przewlekłe trudności z koncentracją i organizacją zadań'],
      unknownFactors: ['Dokumentacja szkolna z dzieciństwa', 'Objawy przed 12. rokiem życia'],
      criticalDifferentiatingFactor: 'Brak jakichkolwiek przejawów dysfunkcji wykonawczej w dzieciństwie wyklucza ADHD i wskazuje na etiologię afektywną',
    },
    evidenceMode: 'clinical-framework',
  },
  'zaburzenia-osobowosci-wymiarowe': {
    diagrams: [],
    inlineWidgets: [],
    caseId: 'case-zaburzenia-osobowosci-wymiarowe',
    whatChangesYourMind: {
      knownFacts: ['Lęk przed porzuceniem', 'Samookaleczenia pod wpływem odrzucenia', 'Chwiejność emocjonalna'],
      unknownFactors: ['Rytm dobowy nastroju', 'Epizody podwyższonego napędu trwające kilka dni'],
      criticalDifferentiatingFactor: 'Wyraźne fazy wzmożonego napędu niezależne od bodźców relacyjnych nakazują różnicowanie z ChAD',
    },
    evidenceMode: 'clinical-framework',
  },
  'substancje-i-secondary-causes': {
    diagrams: [],
    inlineWidgets: [],
    caseId: 'case-substancje-i-secondary-causes',
    whatChangesYourMind: {
      knownFacts: ['Tachykardia, drżenie rąk i lęk po zaprzestaniu picia alkoholu'],
      unknownFactors: ['Stężenie elektrolitów i glikemia', 'Ocena ilościowa w skali CIWA-Ar'],
      criticalDifferentiatingFactor: 'Pojawienie się zaburzeń świadomości i iluzji wzrokowych oznacza przejście w majaczenie drżenne (stan nagły)',
    },
    evidenceMode: 'clinical-framework',
  },
  'skale-kliniczne-w-psychiatrii': {
    diagrams: [],
    inlineWidgets: [],
    caseId: 'case-depresja-fenotypy-i-kryteria',
    whatChangesYourMind: {
      knownFacts: ['Wynik w skali MADRS lub HAM-D wskazujący na głęboką depresję'],
      unknownFactors: ['Współistniejące schorzenia somatyczne z objawami wegetatywnymi'],
      criticalDifferentiatingFactor: 'Objawy somatyczne mogą fałszywie zawyżać wynik skali psychometrycznej u pacjenta geriatrycznego lub onkologicznego',
    },
    evidenceMode: 'clinical-framework',
  },
  'ocena-ryzyka-samobojczego-agresji': {
    diagrams: [],
    inlineWidgets: [],
    caseId: 'case-depresja-fenotypy-i-kryteria',
    whatChangesYourMind: {
      knownFacts: ['Myśli samobójcze z planem (C-SSRS stopień 4)'],
      unknownFactors: ['Natychmiastowy dostęp do metod letalnych (np. leki, broń)'],
      criticalDifferentiatingFactor: 'Podjęcie konkretnych przygotowań (pożegnania, gromadzenie leków) jest wskazaniem do hospitalizacji w trybie pilnym',
    },
    evidenceMode: 'safety-context',
  },
  'diagnostyka-roznicowa-algorytmy': {
    diagrams: ['psychosis-differential'],
    inlineWidgets: [],
    caseId: 'case-klasyfikacje-dsm5-icd11',
    whatChangesYourMind: {
      knownFacts: ['Zaburzenia poznawcze i nastroju u osoby po 55. roku życia'],
      unknownFactors: ['Rezonans magnetyczny mózgu', 'Panel przeciwciał anty-NMDA i onkoneuronalnych'],
      criticalDifferentiatingFactor: 'Pierwszy w życiu epizod psychotyczny lub depresyjny w wieku dojrzałym wymaga bezwzględnego wykluczenia przyczyn organicznych',
    },
    evidenceMode: 'clinical-framework',
  },
  'przypadki-integracyjne-diagnostyka': {
    diagrams: ['mse-map'],
    inlineWidgets: [],
    caseId: 'case-wywiad-psychiatryczny-mse',
    recurringPatientId: 'thread-psychosis-trs',
    whatChangesYourMind: {
      knownFacts: ['Młody wiek', 'Spadek wyników w nauce', 'Wycofanie z kontaktów rówieśniczych'],
      unknownFactors: ['Czas trwania i dynamika objawów ujemnych'],
      criticalDifferentiatingFactor: 'Wdrożenie psychoterapii i wsparcia w stanie ryzyka (CHR) znacząco redukuje ryzyko konwersji w pełnoobjawową psychozę',
    },
    evidenceMode: 'clinical-framework',
  },
  'farmakokinetyka-oun-bariera': {
    diagrams: [],
    inlineWidgets: [],
    caseId: 'case-farmakogenetyka-cyp-pgx',
    whatChangesYourMind: {
      knownFacts: ['Cząsteczka psychotropowa ma wysoką lipofilność i wiązanie z białkami'],
      unknownFactors: ['Ekspresja pompy P-glikoproteiny w ścianie naczyń mózgowych'],
      criticalDifferentiatingFactor: 'Nadekspresja P-gp może uniemożliwić osiągnięcie stężenia terapeutycznego w mózgu mimo prawidłowej litemii/stężenia we krwi',
    },
    evidenceMode: 'pk-sensitivity',
  },
  'transportery-monoamin-sert-net-dat': {
    diagrams: ['monoamine-synapse'],
    inlineWidgets: [],
    workbenchPresetId: 'sert-occupancy-001',
    caseId: 'case-depresja-fenotypy-i-kryteria',
    whatChangesYourMind: {
      knownFacts: ['SSRI osiąga >80% wysycenia SERT w badaniach PET Meyera przy standardowej dawce'],
      unknownFactors: ['Odpowiedź kliniczna po 6 tygodniach terapii'],
      criticalDifferentiatingFactor: 'Brak remisji przy wysyceniu SERT >80% uzasadnia zmianę mechanizmu (np. dołączenie bupropionu), a nie dalsze podnoszenie dawki SSRI',
    },
    evidenceMode: 'pet-model',
  },
  'receptory-dopaminowe-okno-kapura': {
    diagrams: ['d2-pathways'],
    inlineWidgets: ['d2-pet-explorer'],
    workbenchPresetId: 'd2-evidence-001',
    caseId: 'case-psychoza-i-szlaki-dopaminy',
    recurringPatientId: 'thread-psychosis-trs',
    whatChangesYourMind: {
      knownFacts: ['Historyczna heurystyka populacyjna Kapura: zakres 65–80% occupancy D2 powiązany z odpowiedzią i niższym EPS dla antagonistów PET'],
      unknownFactors: ['Zastosowanie częściowego agonisty D2 (np. arypiprazol, karyprazyna)'],
      criticalDifferentiatingFactor: 'Arypiprazol przy occupancy >80% nie powoduje EPS ani hiperprolaktynemii dzięki aktywności wewnętrznej ~30%',
    },
    evidenceMode: 'pet-model',
  },
  'uklad-serotoninergiczny-receptory': {
    diagrams: ['monoamine-synapse'],
    inlineWidgets: [],
    caseId: 'case-ostre-stany-toksyczne-zespol-serotoninowy',
    whatChangesYourMind: {
      knownFacts: ['Pobudzenie 5-HT1A działa przeciwdepresyjnie; blokada 5-HT2A poprawia architekturę snu'],
      unknownFactors: ['Nadmierna aktywacja obwodowa i ośrodkowa 5-HT2A'],
      criticalDifferentiatingFactor: 'Masywny agonizm receptorów 5-HT2A odpowiada za hipertermię i skurcze kloniczne w zespole serotoninowym',
    },
    evidenceMode: 'clinical-framework',
  },
  'glutaminian-gaba-neuroplastycznosc': {
    diagrams: ['bdnf-trkb-pathway'],
    inlineWidgets: [],
    caseId: 'case-interwencje-biologiczne-ect-rtms-ketamina',
    whatChangesYourMind: {
      knownFacts: ['Antagonizm NMDA wyzwala wyrzut glutaminianu stymulujący receptory AMPA'],
      unknownFactors: ['Kinetyka aktywacji szlaku mTOR i syntezy białek synaptycznych'],
      criticalDifferentiatingFactor: 'Zablokowanie receptorów AMPA znosi przeciwdepresyjne działanie ketaminy, potwierdzając kluczową rolę neuroplastyczności',
    },
    evidenceMode: 'clinical-framework',
  },
  'klasyczne-antydepresanty-ssri-snri-tlpd-maoi': {
    diagrams: ['monoamine-synapse'],
    inlineWidgets: [],
    caseId: 'case-zamiana-lekow-switching-cross-tapering',
    whatChangesYourMind: {
      knownFacts: ['SSRI są lekami I rzutu; TLPD cechuje kardiotoksyczność w przedawkowaniu'],
      unknownFactors: ['Aktywne myśli i tendencje samobójcze pacjenta'],
      criticalDifferentiatingFactor: 'Wysokie ryzyko samobójcze wyklucza ordynację TLPD w warunkach ambulatoryjnych (wystarczy zapas na 7 dni do zgonu)',
    },
    evidenceMode: 'safety-context',
  },
  'atypowe-antydepresanty-multimodalne': {
    diagrams: [],
    inlineWidgets: [],
    caseId: 'case-zamiana-lekow-switching-cross-tapering',
    whatChangesYourMind: {
      knownFacts: ['Bupropion oszczędza funkcje seksualne; mirtazapina poprawia łaknienie i sen'],
      unknownFactors: ['Wywiad w kierunku napadów drgawkowych lub zaburzeń odżywiania'],
      criticalDifferentiatingFactor: 'Wywiad bulimii lub padaczki jest bezwzględnym przeciwwskazaniem do podania bupropionu z powodu obniżenia progu drgawkowego',
    },
    evidenceMode: 'safety-context',
  },
  'normotymiki-lit-walproinian-lamotrygina': {
    diagrams: [],
    inlineWidgets: ['lithium-tdm-interpreter'],
    workbenchPresetId: 'lithium-tdm-measured-001',
    caseId: 'case-normotymiki-lit-walproinian-lamotrygina',
    recurringPatientId: 'thread-bipolar-spectrum',
    whatChangesYourMind: {
      knownFacts: ['Terapeutyczny zakres stężenia litu: 0,6–0,8 mmol/l przy pobraniu dokładnie po 12 godzinach'],
      unknownFactors: ['Równoczesne stosowanie NLPZ, inhibitorów ACE lub diuretyków tiazydowych'],
      criticalDifferentiatingFactor: 'Dołączenie NLPZ zmniejsza wydalanie litu o 30–50% i może doprowadzić do ostrej nefrotoksyczności',
    },
    evidenceMode: 'measured-tdm',
  },
  'leki-przeciwpsychotyczne-generacje': {
    diagrams: ['d2-pathways'],
    inlineWidgets: ['d2-pet-explorer'],
    caseId: 'case-psychoza-i-szlaki-dopaminy',
    recurringPatientId: 'thread-psychosis-trs',
    whatChangesYourMind: {
      knownFacts: ['Atypowe leki przeciwpsychotyczne (SGA) charakteryzują się mniejszym ryzykiem EPS niż FGA'],
      unknownFactors: ['Wyjściowy profil metaboliczny pacjenta (BMI, glukoza, lipidy)'],
      criticalDifferentiatingFactor: 'Współistnienie otyłości lub cukrzycy nakazuje unikanie olanzapiny i klozapiny jako leków I wyboru',
    },
    evidenceMode: 'clinical-framework',
  },
  'benzodiazepiny-leki-z-tapering': {
    diagrams: [],
    inlineWidgets: [],
    caseId: 'case-benzodiazepiny-leki-z-tapering',
    recurringPatientId: 'thread-anxiety-dependence',
    whatChangesYourMind: {
      knownFacts: ['Krótki czas półtrwania alprazolamu sprzyja powstawaniu lęku z odbicia i uzależnieniu'],
      unknownFactors: ['Czas ciągłego przyjmowania i aktualna dawka równoważna diazepamowi'],
      criticalDifferentiatingFactor: 'Nagłe odstawienie po przewlekłym stosowaniu grozi napadami drgawkowymi; konieczna konwersja na diazepam wg protokołu Ashton',
    },
    evidenceMode: 'clinical-framework',
  },
  'farmakoterapia-adhd-stymulanty': {
    diagrams: [],
    inlineWidgets: [],
    caseId: 'case-farmakoterapia-adhd-stymulanty',
    whatChangesYourMind: {
      knownFacts: ['Metylofenidat jest lekiem I rzutu w ADHD u dorosłych; blokuje wychwyt zwrotny DA i NA'],
      unknownFactors: ['Wartości ciśnienia tętniczego, tętno i wywiad arytmii serca'],
      criticalDifferentiatingFactor: 'Niekontrolowane nadciśnienie tętnicze lub wady serca wymagają odroczenia stymulantów lub wyboru atomoksetyny',
    },
    evidenceMode: 'safety-context',
  },
  'monitorowanie-stezen-tdm': {
    diagrams: [],
    inlineWidgets: ['tdm-timing-validator'],
    workbenchPresetId: 'lithium-tdm-measured-001',
    caseId: 'case-normotymiki-lit-walproinian-lamotrygina',
    whatChangesYourMind: {
      knownFacts: ['Badanie TDM wg AGNP 2026 ma poziom 1 (silnie zalecane) dla litu, klozapiny i karbamazepiny'],
      unknownFactors: ['Stan stacjonarny leku (min. 4–5 okresów półtrwania) i godzina pobrania'],
      criticalDifferentiatingFactor: 'Pobranie próbki krwi przed osiągnięciem stanu stacjonarnego nie pozwala na wiarygodną modyfikację dawkowania',
    },
    evidenceMode: 'measured-tdm',
  },
  'farmakogenetyka-cyp-pgx': {
    diagrams: ['cyp-network'],
    inlineWidgets: [],
    workbenchPresetId: 'cyp-interaction-001',
    caseId: 'case-farmakogenetyka-cyp-pgx',
    whatChangesYourMind: {
      knownFacts: ['Fenotyp wolnego metabolizatora CYP2D6 (PM) skutkuje kumulacją substratów (np. trójpierścieniowce, wenlafaksyna)'],
      unknownFactors: ['Jednoczesne stosowanie silnych inhibitorów enzymu (np. fluoksetyna, paroksetyna)'],
      criticalDifferentiatingFactor: 'Fenokonwersja przez silny inhibitor enzymatyczny może przekształcić szybkiego metabolizatora w funkcjonalnego PM',
    },
    evidenceMode: 'safety-context',
  },
  'zamiana-lekow-switching-cross-tapering': {
    diagrams: [],
    inlineWidgets: [],
    caseId: 'case-zamiana-lekow-switching-cross-tapering',
    whatChangesYourMind: {
      knownFacts: ['Cross-tapering zapobiega zespołom odstawiennym FINISH i nawrotowi objawów depresyjnych'],
      unknownFactors: ['Okres półtrwania leku odstawianego (krótki np. wenlafaksyna vs długi np. fluoksetyna)'],
      criticalDifferentiatingFactor: 'Włączanie iMAO wymaga bezwzględnego zachowania okresu wypłukiwania (washout) celem uniknięcia zespołu serotoninowego',
    },
    evidenceMode: 'safety-context',
  },
  'racjonalna-polipragmazja-i-augmentacja': {
    diagrams: [],
    inlineWidgets: [],
    caseId: 'case-zamiana-lekow-switching-cross-tapering',
    whatChangesYourMind: {
      knownFacts: ['Augmentacja litem lub atypowym lekiem przeciwpsychotycznym ma najwyższy poziom dowodów w lekoopornej depresji'],
      unknownFactors: ['Adekwatność dawki i czasu trwania dotychczasowej monoterapii (min. 4–6 tygodni)'],
      criticalDifferentiatingFactor: 'Dołożenie drugiego leku bez uprzedniej optymalizacji pierwszego stanowi błąd przedwczesnej polipragmazji',
    },
    evidenceMode: 'clinical-framework',
  },
  'profilaktyka-dzialan-niepozadanych': {
    diagrams: [],
    inlineWidgets: [],
    caseId: 'case-profilaktyka-dzialan-niepozadanych',
    whatChangesYourMind: {
      knownFacts: ['Rutynowe monitorowanie: morfologia, enzymy wątrobowe, kreatynina, glukoza, lipidy, EKG'],
      unknownFactors: ['Wyjściowe stężenie prolaktyny przed włączeniem rysperydonu'],
      criticalDifferentiatingFactor: 'Objawy hiperprolaktynemii bez badania wyjściowego utrudniają odróżnienie polekowego wzrostu od gruczolaka przysadki',
    },
    evidenceMode: 'safety-context',
  },
  'ostre-stany-toksyczne-zespol-serotoninowy': {
    diagrams: ['serotonin-nms-hunter'],
    inlineWidgets: ['hunter-criteria-evaluator'],
    workbenchPresetId: 'serotonin-hunter-001',
    caseId: 'case-ostre-stany-toksyczne-zespol-serotoninowy',
    whatChangesYourMind: {
      knownFacts: ['Kryteria Huntera: spontaniczny klonus przy leku serotoninergicznym jest wystarczający do rozpoznania'],
      unknownFactors: ['Przyjęcie dekstrometorfanu lub tramadolu bez wiedzy lekarza'],
      criticalDifferentiatingFactor: 'Obecność wygórowanych odruchów i klonusu wyklucza NMS (gdzie dominuje sztywność i hiporefleksja)',
    },
    evidenceMode: 'validated-decision-rule',
  },
  'zlosliwy-zespol-neuroleptyczny-nms': {
    diagrams: ['serotonin-nms-hunter'],
    inlineWidgets: [],
    workbenchPresetId: 'nms-differential-001',
    caseId: 'case-zlosliwy-zespol-neuroleptyczny-nms',
    whatChangesYourMind: {
      knownFacts: ['Sztywność typu ołowianej rury, wysoka gorączka, zaburzenia wegetatywne i wzrost kinazy kreatynowej (CK)'],
      unknownFactors: ['Stosowanie leków antycholinolitycznych lub nagłe odstawienie lewodopy'],
      criticalDifferentiatingFactor: 'Natychmiastowe odstawienie neuroleptyku i wdrożenie intensywnego nawadniania decydują o przeżyciu pacjenta',
    },
    evidenceMode: 'safety-context',
  },
  'bezpieczenstwo-kardiometaboliczne-qtc-prolaktyna': {
    diagrams: [],
    inlineWidgets: ['fridericia-qtc-calculator'],
    workbenchPresetId: 'qtc-crediblemeds-001',
    caseId: 'case-bezpieczenstwo-kardiometaboliczne-qtc-prolaktyna',
    whatChangesYourMind: {
      knownFacts: ['Formuła Fridericia (QTcF) zapobiega fałszywemu alarmowi przy tachykardii; próg alarmowy >500 ms'],
      unknownFactors: ['Stężenie potasu i magnezu w surowicy', 'Jednoczesne leki wydłużające repolaryzację'],
      criticalDifferentiatingFactor: 'Wydłużenie QTcF powyżej 500 ms wymaga natychmiastowej redukcji dawki lub zamiany leku z powodu ryzyka torsade de pointes',
    },
    evidenceMode: 'safety-context',
  },
  'zaburzenia-ruchowe-polekowe-eps-dysdyskinezy': {
    diagrams: ['d2-pathways'],
    inlineWidgets: [],
    caseId: 'case-zaburzenia-ruchowe-polekowe-eps-dysdyskinezy',
    whatChangesYourMind: {
      knownFacts: ['Akatyzja manifestuje się subiektywnym niepokojem motorycznym i przymusem poruszania nogami'],
      unknownFactors: ['Związek czasowy z wdrożeniem lub podniesieniem dawki leku'],
      criticalDifferentiatingFactor: 'Pomyłka akatyzji z zaostrzeniem lęku psychotycznego i zwiększenie neuroleptyku drastycznie nasila ryzyko samobójstwa',
    },
    evidenceMode: 'safety-context',
  },
  'lekoopornosc-i-klozapina': {
    diagrams: [],
    inlineWidgets: [],
    workbenchPresetId: 'clozapine-smoking-001',
    caseId: 'case-lekoopornosc-i-klozapina',
    recurringPatientId: 'thread-psychosis-trs',
    whatChangesYourMind: {
      knownFacts: ['Klozapina jest jedynym lekiem o udowodnionej skuteczności w schizofrenii lekoopornej (TRS)'],
      unknownFactors: ['Aktualna bezwzględna liczba neutrofilów (ANC)', 'Status palenia tytoniu (indukcja CYP1A2)'],
      criticalDifferentiatingFactor: 'Nagłe rzucenie palenia tytoniu podwaja stężenie klozapiny we krwi i może wywołać napad drgawkowy',
    },
    evidenceMode: 'safety-context',
  },
  'interwencje-biologiczne-ect-rtms-ketamina': {
    diagrams: ['bdnf-trkb-pathway'],
    inlineWidgets: [],
    caseId: 'case-interwencje-biologiczne-ect-rtms-ketamina',
    whatChangesYourMind: {
      knownFacts: ['Terapia elektrowstrząsowa (ECT) ma najwyższą skuteczność w ciężkiej depresji psychotycznej i katatonii'],
      unknownFactors: ['Obecność tętniaka lub wzmożonego ciśnienia śródczaszkowego'],
      criticalDifferentiatingFactor: 'W stanie zagrożenia życia przez odwodnienie lub zespół złośliwy ECT jest zabiegiem ratującym życie bez alternatywy farmakologicznej',
    },
    evidenceMode: 'clinical-framework',
  },
};

export function buildPsychiatryEnhancementRegistry(
  lessons: Lesson[],
): PsychiatryLessonEnhancementRegistry {
  const experiences = buildAllPsychiatryExperiences(lessons);
  const registry: Partial<PsychiatryLessonEnhancementRegistry> = {};

  for (const lesson of lessons) {
    const id = lesson.id as PsychiatryLessonId;
    const metadata = PSYCHIATRY_LESSON_ENHANCEMENTS_DATA[id] || {
      diagrams: [],
      inlineWidgets: [],
      evidenceMode: 'clinical-framework',
    };

    registry[id] = {
      lessonId: id,
      experience: experiences[id],
      diagrams: metadata.diagrams,
      inlineWidgets: metadata.inlineWidgets,
      workbenchPresetId: metadata.workbenchPresetId,
      caseId: metadata.caseId,
      recurringPatientId: metadata.recurringPatientId,
      whatChangesYourMind: metadata.whatChangesYourMind,
      evidenceMode: metadata.evidenceMode,
    };
  }

  return registry as PsychiatryLessonEnhancementRegistry;
}
