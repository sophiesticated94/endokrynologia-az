import { type DraftLesson, q } from './course-types.ts';

export const draftPsychiatryPart5b: DraftLesson[] = [
  {
    id: 'choroba-alzheimera-wzorzec-i-progresja',
    moduleId: 'psych-organiczne',
    title: 'Choroba Alzheimera: wzorzec kliniczny, progresja i imitatory',
    subtitle: 'Podstępny początek, kaskada pamięci epizodycznej, model hipokampalny i różnicowanie',
    group: 'Główne zespoły neurodegeneracyjne',
    minutes: 18,
    goals: [
      'Zidentyfikujesz typowy wzorzec kliniczny choroby Alzheimera: podstępny początek i deficyty pamięci epizodycznej.',
      'Zrozumiesz sekwencję progresji sieciowej (kora śródwęchowa/hipokamp → asocjacyjna kora ciemieniowo-skroniowa).',
      'Przeprowadzisz różnicowanie z imitatorami: depresją, chorobą małych naczyń, zaburzeniami snu i lekami.',
    ],
    sections: [
      {
        title: 'Wzorzec kliniczny: nie każde zaburzenie pamięci to Alzheimer',
        text: 'Choroba Alzheimera (AD) jest pierwotnym procesem neurodegeneracyjnym, którego cechą kardynalną jest podstępny początek i powolna, wieloletnia progresja. Wczesny fenotyp typowy charakteryzuje się upośledzeniem pamięci epizodycznej świeżej (trudność w konsolidacji i swobodnym odtwarzaniu nowych informacji, brak poprawy przy podpowiedziach — uszkodzenie hipokampa). Pamięć odległa, procedury i nawyki pozostają nienaruszone przez długi czas.',
      },
      {
        title: 'Kaskada progresji sieciowej i objawy późniejsze',
        text: 'W miarę rozprzestrzeniania się patologii amyloidowo-tauowej z przyśrodkowych struktur płata skroniowego do asocjacyjnej kory ciemieniowo-skroniowej pojawia się klasyczna triada: 1) afazja (początkowo anomia — trudność w znajdowaniu słów, później ubóstwo semantyczne); 2) apraksja (trudność w wykonywaniu celowych czynności manualnych mimo zachowanej siły mięśniowej); 3) agnozja (trudność w rozpoznawaniu znanych twarzy i przedmiotów). Dołączają zaburzenia wzrokowo-przestrzenne (gubienie się w znanym otoczeniu).',
      },
      {
        title: 'Różnicowanie z maskami i imitatorami',
        text: 'Prawidłowe TSH, witamina B12 i morfologia krwi zmniejszają prawdopodobieństwo jawnych masek internistycznych, lecz nie stanowią bezpośredniego dowodu na chorobę Alzheimera. Różnicowanie wymaga wykluczenia: przewlekłych skutków leków sedatywnych i antycholinergicznych, bezdechu sennego (OSA), naczyniowej choroby małych naczyń oraz depresji wieku podeszłego. W neuroobrazowaniu (MRI) wsparciem jest ocena zaniku hipokampów w skali MTA (Medial Temporal Lobe Atrophy).',
      },
    ],
    table: {
      headers: ['Stadium AD', 'Objawy poznawcze', 'Funkcjonowanie codzienne', 'Objawy neuropsychiatryczne'],
      rows: [
        ['Wczesne (łagodne)', 'Ubytki pamięci epizodycznej, anomia', 'Trudności w finansach i lekach (IADL)', 'Lęk, wycofanie, łagodna apatia'],
        ['Umiarkowane', 'Afazja, apraksja, dezorientacja w przestrzeni', 'Wymaga pomocy w ubiorze i toalecie (ADL)', 'BPSD: błądzenie, podejrzliwość, pobudzenie'],
        ['Zaawansowane', 'Głęboka agnozja, mutyzm, zanik mowy', 'Całkowita zależność od opiekuna', 'Sztywność mięśniowa, dysfagia, infekcje'],
      ],
    },
    advanced:
      'Model progresji hipokampalno-sieciowej (Hippocampal/Network Progression Model) traktowany jest jako SUPPORTED DISEASE MODEL. Nie stanowi on deterministycznego biomarkera klinicznego u każdego pacjenta; fenotypy atypowe (np. atrofia korowa tylna — PCA z wczesnymi objawami wzrokowo-przestrzennymi, czy logopeniczna afazja postępująca — lvPPA) mogą przebiegać bez wczesnego ubytku pamięci hipokampalnej.',
    summary:
      'Choroba Alzheimera to podstępny i postępujący ubytek pamięci epizodycznej z późniejszą afazją, apraksją i utratą samodzielności. Prawidłowe badania laboratoryjne wykluczają maski, lecz diagnoza opiera się na fenotypie klinicznym i neuroobrazowaniu.',
    sourceIds: ['nice-ng97-dementia', 'dsm5tr', 'icd11-cddr'],
    questions: [
      q(
        'Który mechanizm zaburzeń pamięci jest najbardziej charakterystyczny dla wczesnego stadium typowej postaci choroby Alzheimera?',
        ['Upośledzenie konsolidacji i odraczania nowych informacji (brak poprawy przy podpowiedziach semantycznych)', 'Wynika z pierwotnego uszkodzenia formacji hipokampa i kory śródwęchowej; podpowiedzi z listą nie pomagają odtworzyć zapomnianych słów.'],
        ['Wybiórcze zapominanie wydarzeń z wczesnego dzieciństwa przy zachowanej pamięci wczorajszego dnia', 'W chorobie Alzheimera pamięć odległa z dzieciństwa jest najlepiej i najdłużej zachowana (prawo Ribota).'],
        ['Gwałtowna utrata pamięci proceduralnej jazdy na rowerze w ciągu 3 dni', 'Pamięć proceduralna opiera się na jądrach podstawy i móżdżku, ulegając zaburzeniu dopiero w bardzo późnym stadium.'],
        'psych-ad-wzor-q1'
      ),
      q(
        'Jaką rolę pełni badanie rezonansu magnetycznego (MRI) głowy w diagnostyce podejrzenia choroby Alzheimera?',
        ['Wspiera rozpoznanie poprzez ocenę zaniku struktur hipokampa (skala MTA) oraz pozwala wykluczyć guzy, krwiaki podtwardówkowe i udary', 'MRI mózgu dostarcza dowodów na atrofię przyśrodkowego płata skroniowego i wyklucza uchwytne strukturalne przyczyny wtórne.'],
        ['W 100% przypadków jednoznacznie przesądza o obecności złogów amyloidu w synapsach', 'Standardowe MRI ocenia atrofię makroskopową, nie mikroskopowe złogi amyloidu (wymagałoby to PET amyloidowego).'],
        ['Jest badaniem całkowicie bezużytecznym u osób powyżej 60 roku życia', 'MRI jest standardem diagnostycznym rekomendowanym przez wytyczne EFNS i NICE.'],
        'psych-ad-wzor-q2'
      ),
      q(
        '78-letni pacjent przyprowadza żonę, która od 2 lat powtarza te same pytania, zapomina o wyłączeniu gazu i ma trudności ze znalezieniem słów podczas rozmowy. Wyniki TSH, elektrolitów i witaminy B12 są w normie. Jaki jest prawidłowy wniosek?',
        ['Wyniki laboratoryjne zmniejszają prawdopodobieństwo wybranych odwracalnych przyczyn somatycznych, a fenotyp kliniczny wspiera podejrzenie otępienia w chorobie Alzheimera', 'Prawidłowe badania krwi eliminują typowe zaburzenia internistyczne, lecz nie są dowodem samym w sobie; rozpoznanie opiera się na 2-letnim przebiegu i deficytach w wywiadzie.'],
        ['Prawidłowe TSH i B12 dowodzą, że pacjentka ma pierwotne zaburzenie urojeniowe', 'Brak odchyleń w parametrach tarczycy nie dowodzi zaburzenia urojeniowego.'],
        ['Obraz kliniczny pozwala na natychmiastowe zakończenie diagnostyki bez badania fizykalnego i neurologicznego', 'Diagnoza otępienia wymaga pełnego badania neurologicznego i obrazowego.'],
        'psych-ad-wzor-q3'
      ),
      q(
        'Czym jest anozognozja obserwowana u wielu pacjentów z chorobą Alzheimera?',
        ['Biologicznym brakiem wglądu i świadomości własnych deficytów poznawczych spowodowanym uszkodzeniem sieci neuronalnych', 'Anozognozja nie jest zwykłym „wypieraniem psychologicznym”, lecz neurologiczną niezdolnością do monitorowania własnych błędów pamięciowych.'],
        ['Zdolnością do natychmiastowego zapamiętywania 100 cyfr po przecinku', 'Taki objaw nie ma związku z anozognozją ani chorobą Alzheimera.'],
        ['Napadowym kurczem mięśni powiek wywołanym światłem słonecznym', 'Kurcz powiek to blefarospazm, a nie anozognozja.'],
        'psych-ad-wzor-q4'
      ),
      q(
        'Jaki jest mechanizm działania inhibitorów acetylocholinoesterazy (donepezil, rywastygmina, galantamina) w chorobie Alzheimera?',
        ['Objawowe zwiększenie stężenia acetylocholiny w szczelinach synaptycznych OUN, bez zatrzymania postępującej utraty neuronów', 'Leki te łagodzą objawy poznawcze i behawioralne, stabilizując sprawność na kilka-kilkanaście miesięcy, lecz nie cofają neurodegeneracji.'],
        ['Całkowita regeneracja i namnożenie obumarłych komórek piramidowych hipokampa', 'Żaden dostępny inhibitor AChE nie regeneruje obumarłych neuronów.'],
        ['Selektywny antagonizm receptorów dopaminowych D2 w prążkowiu', 'Inhibitory AChE działają na układ cholinergiczny, a nie blokadę D2.'],
        'psych-ad-wzor-q5'
      ),
    ],
  },

  {
    id: 'naczyniowe-zaburzenia-poznawcze-vad',
    moduleId: 'psych-organiczne',
    title: 'Naczyniowe zaburzenia poznawcze i otępienie naczyniowe (VaD)',
    subtitle: 'Dysfunkcja wykonawcza, spowolnienie przetwarzania, choroba małych naczyń i patologia mieszana',
    group: 'Główne zespoły neurodegeneracyjne',
    minutes: 17,
    goals: [
      'Zrozumiesz profil poznawczy uszkodzeń naczyniowych: dominacja dysfunkcji wykonawczej i spowolnienia nad pamięcią.',
      'Zrezygnujesz z dogmatycznego oczekiwania „schodkowego przebiegu” — poznasz podstępną postać podkorową (SVD).',
      'Zrozumiesz pojęcie otępienia mieszanego (Mixed Dementia) łączącego patologię Alzheimera i naczyniową.',
    ],
    sections: [
      {
        title: 'Profil poznawczy: dysfunkcja podkorowo-czołowa',
        text: 'W naczyniowych zaburzeniach poznawczych (Vascular Cognitive Impairment — VCI / Vascular Dementia — VaD) osiowym deficytem nie jest pierwotne uszkodzenie kodowania pamięci hipokampalnej, lecz zespół podkorowo-czołowy. Manifestuje się on: spowolnieniem szybkości przetwarzania informacji (psychomotor slowing), upośledzeniem funkcji wykonawczych (planowanie, elastyczność poznawcza, myślenie abstrakcyjne) oraz zaburzeniami uwagi. Wydobywanie informacji z pamięci poprawia się przy zastosowaniu wskazówek (cueing), co świadczy o zachowanej pamięci trwałej.',
      },
      {
        title: 'Przebieg: schodkowy vs podstępny w chorobie małych naczyń',
        text: 'Klasyczny „schodkowy” (stepwise) przebieg z nagłymi zaostrzeniami odpowiada otępieniu wielozawałowemu (multi-infarct dementia) po klinicznie jawnych udarach korowych. Jednak najczęstszą postacią w geriatrii jest podkorowe otępienie naczyniowe w przebiegu choroby małych naczyń (Cerebral Small Vessel Disease — CSVD, choroba Binswangera). Przebiega ono podstępnie, bez uchwytnych epizodów udarowych, prowadząc do zlewnej leukoencefalozy istoty białej (skala Fazekas), lakun i mikrowybroczyn.',
      },
      {
        title: 'Towarzyszące objawy neurologiczne i patologia mieszana',
        text: 'Naczyniowemu uszkodzeniu OUN towarzyszą często: zaburzenia chodu (chód podkorowy, magnetyczny, na szerokiej podstawie — „apraksja chodu”), nietrzymanie moczu z parciami naglącymi oraz labilność emocjonalna (zespół rzekomoopuszkowy — mimowolny płacz lub śmiech). W badaniach neuropatologicznych u większości seniorów stwierdza się patologię mieszaną (Mixed AD + VaD), gdzie uszkodzenia naczyniowe obniżają próg klinicznego ujawnienia się zmian amyloidowych.',
      },
    ],
    table: {
      headers: ['Postać VCI', 'Patologia naczyniowa', 'Dynamika przebiegu', 'Główne cechy kliniczne'],
      rows: [
        ['Wielozawałowe (Multi-infarct)', 'Niedokrwienne udary zakrzepowo-zatorowe dużych naczyń', 'Schodkowa, z nagłymi epizodami pogorszenia', 'Ogniskowe deficyty neurologiczne, asymetria'],
        ['Podkorowe (CSVD / Binswanger)', 'Lipohialinoza małych tętniczek przeszywających', 'Powolna, podstępna, fluktuująca', 'Zwolnienie psychoruchowe, zaburzenia chodu, parcia naglące'],
        ['Mieszane (Mixed AD + VaD)', 'Złogi amyloidu/tau + leukoencefaloza istoty białej', 'Mieszana progresja', 'Ubytki pamięci hipokampalnej + spowolnienie wykonawcze'],
      ],
    },
    advanced:
      'W obrazowaniu MRI mózgu obecność hiperintensywności istoty białej (WMH) w skali Fazekasa (od stopnia 1: drobne punkciki, do 3: zlewne obszary) wspiera naczyniowe tło zaburzeń poznawczych. Jednak sam obraz radiologiczny nie stawia diagnozy otępienia — wymaga korelacji z badaniem neuropsychologicznym i funkcjonowaniem.',
    summary:
      'Otępienie naczyniowe charakteryzuje się wczesną dysfunkcją wykonawczą, spowolnieniem myślenia i zaburzeniami chodu. Postać podkorowa (CSVD) przebiega powoli i podstępnie, imitując chorobę Alzheimera, z którą bardzo często współistnieje.',
    sourceIds: ['nice-ng97-dementia', 'icd11-cddr'],
    questions: [
      q(
        'Który profil neuropsychologiczny najsilniej sugeruje naczyniowe zaburzenia poznawcze (VaD) w odróżnieniu od wczesnej choroby Alzheimera?',
        ['Wyraźne spowolnienie przetwarzania informacji i zaburzenia funkcji wykonawczych przy zachowanej konsolidacji pamięci (poprawa przy podpowiedziach)', 'Uszkodzenie pętli podkorowo-czołowych utrudnia wyszukiwanie informacji i elastyczność myślenia, lecz hipokamp koduje wspomnienia poprawnie.'],
        ['Izolowana utrata pamięci autobiograficznej przy zachowanym tempie psychoruchowym', 'Taki profil jest typowy dla zaburzeń dysocjacyjnych lub wczesnego AD, a nie zespołu podkorowego.'],
        ['Wrodzony brak możliwości rozpoznawania kolorów od dzieciństwa', 'Wada wrodzona widzenia barw nie ma związku z naczyniowym uszkodzeniem mózgu u seniora.'],
        'psych-vad-wzor-q1'
      ),
      q(
        'Dlaczego błędne jest przekonanie, że otępienie naczyniowe zawsze musi przebiegać w sposób „schodkowy” z nagłymi zaostrzeniami?',
        ['Ponieważ najczęstsza postać — podkorowa choroba małych naczyń (CSVD) — postępuje powoli, podstępnie i bezobjawowo klinicznie na co dzień', 'Zmiany w istocie białej i mikrozawały lakunarne kumulują się bez zauważalnych udarów, dając obraz powolnego narastania trudności.'],
        ['Ponieważ schodkowy przebieg występuje wyłącznie w młodzieńczej schizofrenii', 'Pojęcie przebiegu schodkowego odnosi się do udarów wieloogniskowych, nie do schizofrenii.'],
        ['Ponieważ naczynia mózgowe nie biorą udziału w odżywianiu tkanki nerwowej', 'Naczynia zaopatrują mózg w tlen i glukozę, a ich uszkodzenie niszczy mielinę i aksony.'],
        'psych-vad-wzor-q2'
      ),
      q(
        'Który zespól objawów neurologicznych najczęściej towarzyszy podkorowemu otępieniu naczyniowemu (chorobie małych naczyń)?',
        ['Zaburzenia chodu (apraksja chodu na szerokiej podstawie), naglące parcia na mocz oraz chwiejność emocjonalna (zespół rzekomoopuszkowy)', 'Zlewne uszkodzenia istoty białej wokół komór rozrywają drogi korowo-rdzeniowe, pęcherzowe i opuszkowe.'],
        ['Uogólniona wiotkość mięśniowa z zanikiem odruchów głębokich i opadaniem stopy', 'Objawy obwodowe dotyczą polineuropatii, a nie uszkodzenia naczyniowego OUN.'],
        ['Brak jakichkolwiek objawów somatycznych i neurologicznych przez całe życie', 'VaD ze względu na podłoże naczyniowe prawie zawsze manifestuje się mikrosympatyką neurologiczną.'],
        'psych-vad-wzor-q3'
      ),
      q(
        'Co oznacza pojęcie „otępienia mieszanego” (Mixed Dementia) w praktyce klinicznej u chorych w podeszłym wieku?',
        ['Współistnienie zmian neurodegeneracyjnych typu Alzheimera (blaszki amyloidowe, sploty tau) oraz naczyniowego uszkodzenia istoty białej i lakun', 'Naczyniowe niedokrwienie nasila stan zapalny i obniża rezerwę mózgową, przyspieszając kliniczną manifestację patologii amyloidowej.'],
        ['Jednoczesne zachorowanie na malarię mózgową i pląsawicę Huntingtona', 'Mieszane otępienie dotyczy najczęstszego nakładania się patologii AD i naczyniowej.'],
        ['Połączenie autyzmu dziecięcego z ostrym upojeniem alkoholowym', 'Taka konstelacja nie ma nic wspólnego z geriatrycznym otępieniem mieszanym.'],
        'psych-vad-wzor-q4'
      ),
      q(
        'Jakie jest podstawowe postępowanie modyfikujące przebieg u pacjenta ze zdiagnozowanymi naczyniowymi zaburzeniami poznawczymi?',
        ['Agresywna kontrola naczyniowych czynników ryzyka: leczenie nadciśnienia tętniczego, cukrzycy, dyslipidemii oraz rezygnacja z tytoniu', 'Prewencja wtórna incydentów naczyniowych chroni przed kolejnymi uszkodzeniami istoty białej i udarami mózgu.'],
        ['Wdrożenie leczenia elektrowstrząsami w cyklu 20 zabiegów', 'Elektrowstrząsy nie są metodą leczenia otępienia naczyniowego.'],
        ['Podawanie dużych dawek benzodiazepin krótko działających przez 5 lat', 'Benzodiazepiny nasilają zaburzenia poznawcze i podnoszą ryzyko upadków u seniorów.'],
        'psych-vad-wzor-q5'
      ),
    ],
  },

  {
    id: 'otepienie-z-cialami-lewyego-i-parkinson',
    moduleId: 'psych-organiczne',
    title: 'Otępienie z ciałami Lewy’ego (DLB) i psychoza w chorobie Parkinsona',
    subtitle: 'Fluktuacje poznawcze, omamy wzrokowe, zaburzenia snu REM i krytyczna nadwrażliwość na leki D2',
    group: 'Główne zespoły neurodegeneracyjne',
    minutes: 19,
    goals: [
      'Rozpoznasz 4 kardynalne cechy kliniczne otępienia z ciałami Lewy’ego (kryteria McKeith 2017).',
      'Zrozumiesz zjawisko gwałtownej, zagrażającej życiu nadwrażliwości na leki przeciwpsychotyczne u chorych z DLB.',
      'Odróżnisz omamy wzrokowe w DLB od psychozy pierwotnej i wdrożysz bezpieczne leczenie objawowe (ChEI).',
    ],
    sections: [
      {
        title: 'Kryteria kardynalne DLB wg konsensusu McKeith 2017',
        text: 'Otępienie z ciałami Lewy’ego (DLB) jest drugą co do częstości pierwotną przyczyną otępienia neurodegeneracyjnego. Diagnoza opiera się na 4 cechach osiowych: 1) Fluktuacje funkcji poznawczych ze znacznymi wahaniami uwagi i czujności w ciągu dnia; 2) Nawracające, złożone, dobrze uformowane omamy wzrokowe (postacie ludzi, zwierząt, dzieci, często neutralne emocjonalnie lub lękowe); 3) Zaburzenia zachowania w fazie snu REM (RBD: odgrywanie snów, krzyki, wymachiwanie kończynami, często wyprzedzające otępienie o dekady); 4) Spontaniczny parkinsonizm (sztywność, bradykinezja, chód drobnymi kroczkami bez wczesnego drżenia spoczynkowego).',
      },
      {
        title: 'Ciężka nadwrażliwość na leki przeciwpsychotyczne (Antipsychotic Sensitivity)',
        text: 'Około 30–50% pacjentów z DLB wykazuje ciężką, potencjalnie letalną nadwrażliwość na neuroleptyki blokujące receptory D2 (zwłaszcza typowe, np. haloperidol). Nawet pojedyncza mała dawka może wywołać: gwałtowne usztywnienie pozapiramidowe, sedację, stupor, przełom wegetatywny i przyspieszenie zgonu. Dlatego pacjent starszy z omamami wzrokowymi i parkinsonizmem NIGDY nie powinien otrzymywać klasycznych neuroleptyków.',
      },
      {
        title: 'Leczenie objawowe i reguła 1 roku (DLB vs PDD)',
        text: 'W leczeniu omamów wzrokowych i wahań poznawczych w DLB lekami pierwszego wyboru są inhibitory acetylocholinoesterazy (donepezil, rywastygmina), które kompensują masywny deficyt cholinergiczny w jądrze Meynerta. Jeśli konieczne jest leczenie przeciwpsychotyczne (ciężka agresja), dopuszcza się jedynie kwetiapinę lub klozapinę w mikrodawkach. Różnica między DLB a otępieniem w chorobie Parkinsona (PDD) opiera się na konwencji 1 roku: w DLB otępienie pojawia się przed lub w ciągu 12 miesięcy od początku parkinsonizmu; w PDD otępienie rozwija się na podłożu wieloletniej choroby Parkinsona.',
      },
    ],
    table: {
      headers: ['Cecha', 'Otępienie z ciałami Lewy’ego (DLB)', 'Choroba Alzheimera (AD)', 'Schizofrenia o późnym początku'],
      rows: [
        ['Omamy', 'Wzrokowe, złożone, uformowane, wczesne', 'Późne, rzadkie, fragmentaryczne', 'Słuchowe słowne, ksobne, ustrukturyzowane'],
        ['Funkcje ruchowe', 'Wczesny parkinsonizm (sztywność, bradykinezja)', 'Prawidłowe we wczesnych stadiach', 'Brak parkinsonizmu (chyba że polekowy)'],
        ['Sen REM', 'RBD (odgrywanie marzeń sennych) w wywiadzie', 'Zaburzenia zasypiania bez RBD', 'Brak typowego RBD'],
        ['Reakcja na neuroleptyki', 'Ciężka nadwrażliwość (letarg, sztywność, zgon)', 'Standardowa tolerancja receptorowa', 'Odpowiedź przeciwpsychotyczna'],
      ],
    },
    advanced:
      'W kryteriach McKeith 2017 jako biomarkery orientacyjne o wysokiej swoistości dla DLB wymieniono: obniżony wychwyt transportera dopaminy w prążkowiu w badaniu SPECT/PET (DaTscan), scyntygrafię serca MIBG (wykazującą odnerwienie współczulne serca) oraz polisomnograficzne potwierdzenie snu REM bez atonii mięśniowej.',
    summary:
      'DLB to triada: wahania poznawcze, omamy wzrokowe i parkinsonizm, często poprzedzone zaburzeniami snu REM. Klasyczne leki przeciwpsychotyczne są bezwzględnie przeciwwskazane z powodu śmiertelnej nadwrażliwości pozapiramidowej.',
    sourceIds: ['dlb-mckeith-2017', 'nice-ng97-dementia'],
    questions: [
      q(
        'Która konstelacja objawów klinicznych u 74-letniego pacjenta z narastającymi trudnościami poznawczymi najsilniej wskazuje na otępienie z ciałami Lewy’ego (DLB)?',
        ['Dobrze uformowane, plastyczne omamy wzrokowe, wahania czujności w ciągu dnia, sztywność mięśniowa oraz odgrywanie snów w nocy (RBD)', 'Kombinacja omamów wzrokowych, parkinsonizmu, fluktuacji poznawczych i zaburzeń snu REM stanowi rdzeń kryteriów McKeith 2017.'],
        ['Utrata pamięci świeżej z prawidłowym chodem i brakiem jakichkolwiek zjawisk psychotycznych', 'Izolowany wczesny ubytek pamięci świeżej bez objawów ruchowych jest typowy dla choroby Alzheimera, nie DLB.'],
        ['Nagły początek z prawostronnym niedowładem połowiczym i afazją Broca', 'Ostry niedowład połowiczy z afazją to obraz udaru niedokrwiennego kory lewej półkuli.'],
        'psych-dlb-lewy-q1'
      ),
      q(
        '75-letni pacjent z rozpoznanym zespołem parkinsonowskim i łagodnym otępieniem zgłasza, że widzi wieczorem nieznajome dzieci bawiące się w kącie pokoju. Lekarz dyżurny podaje 5 mg haloperidolu domięśniowo. Jakie powikłanie jest najbardziej prawdopodobne?',
        ['Gwałtowne pogorszenie sprawności ruchowej, ciężka uogólniona sztywność, stupor, a nawet zgon z powodu ostrej nadwrażliwości na blokadę D2', 'Pacjenci z DLB wykazują krytyczną nadwrażliwość na neuroleptyki typowe; haloperidol może zablokować resztkowe receptory dopaminowe w prążkowiu.'],
        ['Natychmiastowe i trwałe wyleczenie z parkinsonizmu', 'Haloperidol nasila parkinsonizm, a nie go leczy.'],
        ['Spadek apetytu na słodycze bez żadnych innych następstw', 'Odpowiedź na podanie neuroleptyku w DLB niesie ciężkie ryzyko powikłań zagrażających życiu.'],
        'psych-dlb-lewy-q2'
      ),
      q(
        'Jaka grupa leków stanowi leczenie pierwszego wyboru w łagodzeniu omamów wzrokowych i fluktuacji poznawczych w otępieniu z ciałami Lewy’ego?',
        ['Inhibitory acetylocholinoesterazy (np. donepezil, rywastygmina)', 'Niwelują głęboki deficyt cholinergiczny w korze potylicznej i czołowej, zmniejszając częstość halucynacji wzrokowych bez ryzyka parkinsonizmu.'],
        ['Neuroleptyki I generacji o wysokim powinowactwie do D2 (haloperidol)', 'Haloperidol jest skrajnie niebezpieczny w DLB z powodu ryzyka zapaści i śmiertelnej sztywności.'],
        ['Duże dawki leków antycholinergicznych (np. hydroksyzyna, biperyden)', 'Leki antycholinergiczne drastycznie zaostrzają omamy, splątanie i deficyty poznawcze w DLB.'],
        'psych-dlb-lewy-q3'
      ),
      q(
        'Na czym polega tzw. „reguła 1 roku” (one-year rule) różnicująca otępienie z ciałami Lewy’ego (DLB) od otępienia w chorobie Parkinsona (PDD)?',
        ['W DLB objawy otępienne pojawiają się przed wystąpieniem parkinsonizmu lub w ciągu pierwszych 12 miesięcy od jego początku; w PDD otępienie rozwija się na podłożu wieloletniej choroby Parkinsona', 'Reguła ta jest arbitralną konwencją kliniczną odzwierciedlającą odmienną dynamikę szerzenia się patologii alfa-synukleiny.'],
        ['W DLB pacjent przeżywa dokładnie 1 rok od momentu pierwszej wizyty', 'DLB jest chorobą wieloletnią; reguła 1 roku dotyczy sekwencji objawów poznawczych i ruchowych.'],
        ['W PDD leczenie dopaminergiczne wolno stosować wyłącznie przez 12 miesięcy', 'Leczenie dopaminergiczne w chorobie Parkinsona stosuje się przez wiele lat.'],
        'psych-dlb-lewy-q4'
      ),
      q(
        'Jaki fakt z wywiadu od małżonka pacjenta z podejrzeniem DLB ma kluczowe znaczenie retrospektywne?',
        ['Wieloletnia historia odgrywania marzeń sennych, krzyków i gwałtownych ruchów w nocy (zaburzenie zachowania w fazie REM — RBD)', 'RBD jest wczesnym synukleinopatycznym markerem prodromalnym, wyprzedzającym kliniczne otępienie DLB nawet o 10–20 lat.'],
        ['Informacja, że pacjent w wieku 15 lat chorował na ospę wietrzną', 'Przebyta ospa wietrzna w młodości nie jest markerem synukleinopatii.'],
        ['Fakt, że pacjent lubi oglądać mecze piłkarskie w telewizji', 'Zainteresowania hobbystyczne nie mają znaczenia diagnostycznego w kryteriach DLB.'],
        'psych-dlb-lewy-q5'
      ),
    ],
  },

  {
    id: 'otepienie-czolowo-skroniowe-bvftd',
    moduleId: 'psych-organiczne',
    title: 'Otępienie czołowo-skroniowe (FTD) i wariant behawioralny (bvFTD)',
    subtitle: 'Zmiany osobowości po 55 r.ż., odhamowanie, zanik empatii, hiperororalność i maski psychiatryczne',
    group: 'Główne zespoły neurodegeneracyjne',
    minutes: 18,
    goals: [
      'Zidentyfikujesz kardynalne cechy wariantu behawioralnego FTD (kryteria Rascovsky 2011).',
      'Rozpoznasz pułapki różnicowe: późny debiut manii, zaburzenia osobowości, depresję z apatią.',
      'Zrozumiesz znaczenie zachowanej orientacji w standardowych testach przesiewowych przy dramatycznej dysfunkcji społecznej.',
    ],
    sections: [
      {
        title: 'Wariant behawioralny FTD: radykalna przemiana osobowości',
        text: 'Wariant behawioralny otępienia czołowo-skroniowego (behavioural variant Frontotemporal Dementia — bvFTD) dotyka pacjentów w młodszym wieku niż choroba Alzheimera (typowo 45–65 lat). Osiową cechą jest postępująca zmiana zachowania, charakteru i relacji interpersonalnych. W kryteriach konsensusu Rascovsky (2011) do rozpoznania prawdopodobnego bvFTD wymaga się obecności co najmniej 3 z 6 cech: 1) Wczesne odhamowanie behawioralne (nieadekwatne komentarze seksualne, łamanie norm, agresja słowna); 2) Wczesna apatia lub bezwład; 3) Wczesna utrata empatii i współczucia; 4) Zachowania perseweracyjne, stereotypowe lub kompulsywne; 5) Hiperororalność i zmiany nawyków żywieniowych; 6) Profil neuropsychologiczny z dominacją dysfunkcji wykonawczej.',
      },
      {
        title: 'Maska psychiatryczna: bvFTD vs mania, depresja i kryzys wieku średniego',
        text: 'bvFTD jest najczęściej błędnie diagnozowanym zespołem neurodegeneracyjnym w gabinetach psychiatrycznych. Odhamowanie i podejmowanie ryzykownych decyzji finansowych bywa mylone z manią lub chorobą afektywną dwubiegunową. Apatia i zaniedbanie obowiązków bywają brane za ciężką depresję lub „kryzys wieku średniego”. Kluczowa reguła różnicowa: radykalna, trwała zmiana osobowości i norm moralnych de novo u osoby po 50–55 r.ż. bez wcześniejszego wywiadu psychiatrycznego nakazuje pilne wykluczenie procesu organicznego płatów czołowych.',
      },
      {
        title: 'Paradoks testów przesiewowych (MMSE/MoCA w normie)',
        text: 'W początkowych stadiach bvFTD pacjent potrafi bezbłędnie podać datę, miejsce, powtórzyć 3 słowa i uzyskać 28–30 punktów w teście MMSE, ponieważ kora hipokampa i pamięć epizodyczna są nienaruszone. Jednocześnie chory nie odczuwa żalu po śmierci najbliższej osoby, wykrada jedzenie obcym ludziom w restauracji lub trwoni majątek rodziny. Rutynowe testy przesiewowe są całkowicie ślepe na załamanie kory oczodołowo-czołowej i przedniej skroniowej; wymagane jest neuroobrazowanie (MRI — atrofia czołowa) i ustrukturyzowany wywiad od rodziny.',
      },
    ],
    table: {
      headers: ['Obszar kliniczny', 'Wariant behawioralny FTD (bvFTD)', 'Choroba afektywna dwubiegunowa (Mania)', 'Choroba Alzheimera (AD)'],
      rows: [
        ['Pamięć epizodyczna', 'Względnie zachowana we wczesnej fazie', 'Zachowana (choć rozproszona)', 'Głęboko zaburzona od początku'],
        ['Zasady społeczne i empatia', 'Wczesna, głęboka utrata empatii i taktu', 'Zaburzone wyłącznie w ostrym epizodzie manii', 'Zachowane w stadiach wczesnych i umiarkowanych'],
        ['Nawyki żywieniowe', 'Hiperororalność, pochłanianie słodyczy', 'Brak czasu na jedzenie z powodu gonitwy', 'Brak specyficznego napędu na słodycze'],
        ['Wynik MMSE / MoCA', 'Często fałszywie prawidłowy (28–30 pkt)', 'Prawidłowy poza fazą zaostrzenia', 'Znamiennie obniżony'],
      ],
    },
    advanced:
      'W badaniu MRI mózgu w bvFTD stwierdza się asymetryczną atrofię kory czołowej (brzuszno-przyśrodkowej i oczodołowej) oraz przednich biegunów płatów skroniowych. W pozytonowej tomografii emisyjnej z fluorodeoksyglukozą (FDG-PET) widoczny jest głęboki hipometabolizm czołowo-skroniowy, wyprzedzający widoczną atrofię makroskopową.',
    summary:
      'bvFTD manifestuje się załamaniem norm społecznych, zanikiem empatii i hiperororalnością przy zwodniczo prawidłowych przesiewowych testach pamięci. Nowa zmiana charakteru po 55 r.ż. wymaga natychmiastowej diagnostyki kory czołowej.',
    sourceIds: ['bvftd-rascovsky-2011', 'nice-ng97-dementia'],
    questions: [
      q(
        '62-letni urzędnik bez wywiadu psychiatrycznego od 18 miesięcy staje się opryskliwy, opowiada wulgarne żarty w obecności przełożonych, nie wykazał żadnych emocji na wieść o śmierci syna i obsesyjnie wyjada cukierniczki. W teście MMSE uzyskuje 29/30 pkt. Jaka diagnoza jest najbardziej prawdopodobna?',
        ['Wariant behawioralny otępienia czołowo-skroniowego (bvFTD)', 'Odhamowanie behawioralne, zanik empatii i hiperororalność przy zachowanej pamięci świeżej w MMSE to klasyczny obraz uszkodzenia kory czołowej w kryteriach Rascovsky 2011.'],
        ['Prawidłowe starzenie się mózgu niewymagające żadnej diagnostyki', 'Utrata empatii i wulgarne zachowania u 62-latka nigdy nie są normą fizjologiczną.'],
        ['Wczesne stadium choroby Creutzfeldta-Jakoba o przebiegu 18-miesięcznym', 'Przebieg CJD jest gwałtowny (tygodnie/miesiące) z miokloniami i ataksją, a nie izolowanym odhamowaniem.'],
        'psych-ftd-behave-q1'
      ),
      q(
        'Dlaczego test przesiewowy MMSE może być fałszywie ujemny (wynik w normie) u pacjenta z zaawansowanymi zaburzeniami zachowania w przebiegu bvFTD?',
        ['Ponieważ MMSE bada głównie orientację, pamięć świeżą i proste funkcje językowe, a jest całkowicie niewrażliwy na funkcje kory oczodołowo-czołowej i empatię społeczną', 'Chory potrafi podać datę i powtórzyć słowa, mimo że utracił kontrolę impulsów i zdolność do funkcjonowania w społeczeństwie.'],
        ['Ponieważ test MMSE wolno przeprowadzać wyłącznie u dzieci do 12 roku życia', 'MMSE jest testem dla osób dorosłych i seniorów.'],
        ['Ponieważ pacjenci z bvFTD za każdym razem przekupują osobę badającą', 'Taka teza jest absurdalna; błąd wynika z ograniczeń narzędzia testowego.'],
        'psych-ftd-behave-q2'
      ),
      q(
        'Co oznacza objaw „hiperororalności” (hyperorality) w kryteriach diagnostycznych otępienia czołowo-skroniowego?',
        ['Zmienione nawyki żywieniowe: kompulsywne spożywanie słodyczy, wkładanie niejadalnych przedmiotów do ust i żarłoczność', 'Wynika z uszkodzenia brzuszno-przyśrodkowych struktur płata skroniowego i układu limbicznego (komponent zespołu Klüvera-Bucy’ego).'],
        ['Nieustanne wygłaszanie przemówień politycznych bez zająknięcia', 'Wygłaszanie przemówień to logorea lub mania, nie hiperororalność.'],
        ['Zaburzenie czucia smaku wyłącznie w odniesieniu do soli kuchennej', 'Hiperororalność dotyczy popędu oralnego i wyboru pokarmów, a nie izolowanej utraty smaku słonego.'],
        'psych-ftd-behave-q3'
      ),
      q(
        'Jaki jest najbardziej dyskryminujący wskaźnik pozwalający odróżnić późny epizod manii od wariantu behawioralnego FTD?',
        ['Progresywny, podstępny przebieg z postępującą utratą empatii i obecnością atrofii czołowo-skroniowej w MRI mózgu w bvFTD', 'Mania przebiega fazowo z epizodami remisji, podczas gdy bvFTD jest chorobą neurodegeneracyjną prowadzącą do trwałego ubytku tkanki mózgowej.'],
        ['Poziom ciśnienia tętniczego mierzony na lewym ramieniu', 'Ciśnienie tętnicze nie różnicuje manii od otępienia czołowo-skroniowego.'],
        ['Występowanie łupieżu na skórze głowy', 'Objawy dermatologiczne nie mają wartości dyskryminującej w neuropsychiatrii.'],
        'psych-ftd-behave-q4'
      ),
      q(
        'Jakie jest zalecane postępowanie farmakologiczne w łagodzeniu odhamowania i kompulsji w bvFTD?',
        ['Leki z grupy SSRI (np. trazodon, sertralina) wykazujące umiarkowaną skuteczność w redukcji zachowań stereotypowych i impulsywnych', 'Wykazano, że deficyt serotoninergiczny w korze czołowej odpowiada za impulsywność; SSRI pomagają wyhamować drażliwość i hiperororalność.'],
        ['Wysokie dawki inhibitorów acetylocholinoesterazy (donepezil)', 'ChEI nie mają udowodnionej skuteczności w bvFTD i mogą wręcz nasilać pobudzenie i drażliwość.'],
        ['Monoterapia amfetaminą w dawce 100 mg/dobę', 'Amfetamina w wysokiej dawce nasiliłaby pobudzenie i zachowania agresywne.'],
        'psych-ftd-behave-q5'
      ),
    ],
  },
];
