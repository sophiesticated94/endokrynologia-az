import type { ClinicalCase } from './cases-psychiatry-builder.ts';
import { makeFlexibleCase } from './cases-psychiatry-builder.ts';

export const psychiatryCasesPart1b: ClinicalCase[] = [
  // 7. Lęk napadowy - Początek Wątku C (Anna W., 34 lata)
  makeFlexibleCase(
    'zaburzenia-lekowe-gad-napadowy',
    'Duszność i lęk przed śmiercią w metrze (Wątek C)',
    'Anna W., 34 lata',
    'Zaawansowany',
    'Prawniczka trafia po raz trzeci w tym miesiącu na SOR: nagły atak duszności, kołatanie serca (HR 130/min), drżenie rąk i silny lęk przed zawałem serca.',
    [
      {
        stage: 'Ocena epizodu ostrego lęku',
        context: 'W EKG tachykardia zatokowa, troponiny ujemne, gazometria wskazuje na umiarkowaną zasadowicę oddechową (hiperwentylacja). Objawy ustąpiły samoistnie po 25 minutach.',
        prompt: 'Jaka sekwencja objawów definiuje napad paniki (zespół lęku napadowego)?',
        choices: [
          ['Nagły początek, szybkie narastanie objawów wegetatywnych ze szczytem w ciągu kilku minut i towarzyszący lęk przed śmiercią lub utratą kontroli', 'Cechą kardynalną paniki jest paroksyzmalny charakter ze szczytem w 10 minut i obawą o katastrofalne skutki somatyczne.'],
          ['Przewlekłe napięcie utrzymujące się bez przerwy przez co najmniej 6 miesięcy', 'Stałe zamartwianie się definiuje lęk uogólniony (GAD), a nie napadowy.'],
          ['Izolowany ból zamostkowy pojawiający się wyłącznie przy intensywnym biegu', 'Wysiłkowy ból w klatce sugeruje dławicę piersiową i wymaga oceny kardiologicznej.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Lęk antycypacyjny i zachowania unikające',
        context: 'Anna zaczęła unikać jazdy metrem, galerii handlowych i samotnego wychodzenia z domu, obawiając się braku możliwości ucieczki.',
        prompt: 'Jakie powikłanie zespołu lęku napadowego rozwinęło się u pacjentki?',
        choices: [
          ['Agorafobia (lęk przed miejscami, z których ucieczka byłaby utrudniona w razie napadu paniki)', 'Agorafobia jest najczęstszym powikłaniem nieleczonego lęku napadowego.'],
          ['Urojenia prześladowcze w przestrzeniach publicznych', 'Brak usystematyzowanych przekonań urojeniowych; pacjentka krytycznie ocenia swój lęk, lecz nie potrafi go powstrzymać.'],
          ['Zaburzenie lękowe uogólnione (GAD) z dominującym zamartwianiem się', 'GAD charakteryzuje się ciągłym, uogólnionym lękiem wolnopłynącym, a nie unikaniem miejsc publicznych z obawy przed atakiem paniki.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Wybór leczenia I rzutu i ryzyko doraźne',
        context: 'Lekarz dyżurny zaproponował wypisanie alprazolamu do przyjmowania przy każdym niepokoju.',
        prompt: 'Dlaczego długotrwała doraźna monoterapia benzodiazepiną o krótkim okresie półtrwania (alprazolam) jest błędem w lęku napadowym?',
        choices: [
          ['Prowadzi do zjawiska tolerancji, uzależnienia psychofizycznego i lęku z odbicia (rebound anxiety), nie lecząc neurobiologicznej przyczyny napadów', 'Lekami I rzutu są SSRI/SNRI oraz psychoterapia CBT; benzodiazepiny mogą być stosowane wyłącznie krótkoterminowo (do 2–4 tyg.) jako pomost.'],
          ['Benzodiazepiny trwale niszczą receptory serotoninowe w pniu mózgu', 'Mechanizm dotyczy modulacji kompleksu GABA-A, nie trwałego zniszczenia receptorów.'],
          ['Alprazolam jest nieskuteczny w tłumieniu ostrego lęku', 'Alprazolam silnie tłumi lęk doraźnie, co właśnie sprzyja szybkiemu uzależnieniu behawioralnemu.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Optymalny plan terapeutyczny',
        context: 'Planujesz wdrożenie leczenia przyczynowego u Anny.',
        prompt: 'Jaka strategia farmakoterapeutyczna minimalizuje ryzyko wczesnej aktywacji lękowej (jitteriness syndrome)?',
        choices: [
          ['Rozpoczęcie od małej dawki SSRI (np. sertralina 25 mg lub escitalopram 5 mg) i powolne zwiększanie co 7–14 dni do dawki terapeutycznej pod osłoną psychoedukacji', 'Osoby z lękiem napadowym są nadwrażliwe na przejściowy wzrost stężenia serotoniny w synapsach w pierwszych dniach leczenia.'],
          ['Włączenie maksymalnej dawki sertraliny (200 mg) od pierwszego dnia', 'Gwałtowna stymulacja 5-HT2A i 5-HT2C wywoła nasilenie lęku i porzucenie terapii przez pacjentkę.'],
          ['Włączenie bupropionu w monoterapii w docelowej dawce 300 mg/d', 'Bupropion ze względu na profil noradrenergiczno-dopaminergiczny może nasilać napady paniki i nie jest lekiem z wyboru w lęku napadowym.'],
        ],
        answerIndex: 0,
      },
    ],
    { threadId: 'thread-anxiety-dependence', timeOffsetWeeks: 0 }
  ),

  // 8. OCD i pętla CSTC - Początek Wątku D (Michał P., 29 lat)
  makeFlexibleCase(
    'ocd-i-petla-cstc',
    'Rytuały czystości i pętla CSTC (Wątek D)',
    'Michał P., 29 lat',
    'Zaawansowany',
    'Inżynier budowlany zgłasza się z dłońmi pokrytymi maceracjami i pęknięciami: myje ręce ponad 50 razy na dobę według ścisłej procedury, by zapobiec „skażeniu rodziny toksynami”.',
    [
      {
        stage: 'Psychopatologia natręctw',
        context: 'Michał zdaje sobie sprawę, że mycie rąk przez 4 godziny na dobę jest przesadne, ale nie potrafi powstrzymać narastającego lęku bez wykonania rytuału.',
        prompt: 'Jaka jest kluczowa różnica między obsesją w OCD a urojeniem w psychozie?',
        choices: [
          ['W OCD natrętne myśli są ego-dystoniczne i traktowane krytycznie jako własne, lecz niechciane, podczas gdy urojenie jest ego-syntoniczne i bezkrytyczne', 'Krytycyzm wobec absurdalności natręctwa jest cechą typową dla OCD (z wyjątkiem postaci z ubogim wglądem).'],
          ['W OCD pacjent zawsze uważa swoje obawy za w pełni uzasadnione faktyczną obecnością trucizn', 'To cecha przekonań urojeniowych lub OCD z całkowitym brakiem wglądu; w typowym OCD pacjent dostrzega nieracjonalność natręctw.'],
          ['Urojenie zawsze ustępuje natychmiast po wykonaniu czynności natrętnej', 'Urojenia nie redukują się po rytuałach; chwilowe rozładowanie napięcia po kompulsji jest charakterystyczne dla OCD.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Neurobiologia obwodów (Model CSTC)',
        context: 'W modelach neuroobrazowych OCD kluczową rolę przypisuje się dysregulacji obwodu korowo-prążkowiowo-wzgórzowo-korowego (CSTC).',
        prompt: 'Które struktury anatomiczne wchodzą w skład pętli CSTC odpowiedzialnej za hamowanie nawykowych zachowań?',
        choices: [
          ['Kora oczodołowo-czołowa (OFC), przedni zakręt obręczy (ACC), prążkowie (jądro ogoniaste) oraz wzgórze', 'Sieć OFC-ACC-prążkowie-wzgórze tworzy pętlę sprzężenia zwrotnego regulującą ocenę zagrożenia i wygaszanie zachowań rytualnych.'],
          ['Głównie ciało migdałowate i jądro półleżące bez udziału kory czołowej', 'Choć ciało migdałowate moduluje lęk, klasyczny model pętli CSTC w OCD kładzie nacisk na oś kora oczodołowo-czołowa/zakręt obręczy – prążkowie – wzgórze.'],
          ['Hipokamp i kora potyliczna bez udziału zwojów podstawy', 'Obwód CSTC opiera się na kluczowej roli zwojów podstawy (prążkowia) w modulacji sygnałów wzgórzowych.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Specyfika farmakoterapii w OCD',
        context: 'Michał pyta o różnicę między dawkowaniem leków przeciwdepresyjnych w depresji a w zaburzeniu obsesyjno-kompulsyjnym.',
        prompt: 'Czym charakteryzuje się skuteczna farmakoterapia SSRI w OCD wg wytycznych WFSBP i NICE?',
        choices: [
          ['Wymaga wyższych dawek niż w depresji (np. sertralina 200 mg, escitalopram 20 mg) i dłuższego czasu oczekiwania na odpowiedź (10–12 tygodni)', 'Blokada transporterów SERT w OCD wymaga głębszej i dłuższej adaptacji receptorowej w prążkowiu i OFC niż w typowym epizodzie depresyjnym.'],
          ['Wystarcza standardowa dawka minimalna (np. sertralina 50 mg) z oceną efektu już po 2 tygodniach', 'W OCD dawki minimalne bywają niewystarczające, a czas do oceny pełnej odpowiedzi wynosi 10–12 tygodni.'],
          ['Konieczne jest natychmiastowe włączenie trójpierścieniowej klomipraminy w dawce 300 mg od 1. dnia', 'Ze względu na profil działań niepożądanych i kardiotoksyczność klomipraminę rezerwuje się zwykle do kolejnych rzutów i wymaga powolnego miareczkowania.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Terapia niefarmakologiczna I wyboru',
        context: 'Poza farmakoterapią planujesz skierowanie Michała na psychoterapię.',
        prompt: 'Jaka metoda psychoterapeutyczna posiada najwyższy poziom dowodów EBM (poziom 1A) w leczeniu OCD?',
        choices: [
          ['Terapia poznawczo-behawioralna z ekspozycją i powstrzymaniem reakcji (ERP - Exposure and Response Prevention)', 'Metoda ERP uczy tolerowania narastającego dyskomfortu bez ucieczki w rytuał, prowadząc do fizjologicznego wygaszenia lęku w pętli CSTC.'],
          ['Tradycyjna psychoanaliza z analizą marzeń sennych bez pracy behawioralnej', 'Brak bezpośredniej ekspozycji behawioralnej w natręctwach myciowych nie redukuje zachowań kompulsywnych.'],
          ['Trening relaksacyjny jako jedyna interwencja bez ekspozycji', 'Sama relaksacja bez ekspozycji nie przerywa pętli lękowo-rytualnej.'],
        ],
        answerIndex: 0,
      },
    ],
    { threadId: 'thread-ocd-circuitry', timeOffsetWeeks: 0 }
  ),

  // 9. PTSD i trauma
  makeFlexibleCase(
    'ptsd-trauma-stres',
    'Koszmary i czujność po wypadku masowym',
    'Piotr S., 32 lata',
    'Podstawowy',
    'Ratownik medyczny 4 miesiące po udziale w akcji ratunkowej w karambolu z wieloma ofiarami śmiertelnymi zgłasza nawracające intruzje, bezsenność i nadmierną czujność.',
    [
      {
        stage: 'Identyfikacja osiowych triad PTSD',
        context: 'Piotr przeżywa nagłe, żywe powroty obrazów wypadku (flashbacki) wyzwalane dźwiękiem syreny, unika rozmów o pracy i reaguje gwałtownym lękiem na nagłe dźwięki (wygórowany startle reflex).',
        prompt: 'Jakie trzy domeny objawowe definiują zespół stresu pourazowego (PTSD wg ICD-11 / DSM-5-TR)?',
        choices: [
          ['Ponowne przeżywanie traumy (intruzje/flashbacki), unikanie bodźców przypominających oraz uporczywe poczucie zagrożenia (nadmierna czujność)', 'Ta triada osiowa odróżnia PTSD od izolowanego epizodu depresyjnego czy żałoby.'],
          ['Urojenia ksobne, omamy węchowe i apatia', 'Objawy te są charakterystyczne dla psychoz, nie dla klasycznego PTSD.'],
          ['Brak reakcji emocjonalnej połączony z euforią', 'W PTSD dominuje dysforia, niepokój i ciągłe wzbudzenie autonomiczne.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Czas trwania i ostra reakcja na stres (ASR)',
        context: 'Objawy u Piotra trwają nieprzerwanie od 16 tygodni.',
        prompt: 'Jaki czas trwania objawów odróżnia PTSD od ostrej reakcji na stres (ASR)?',
        choices: [
          ['ASR ustępuje zazwyczaj w ciągu kilku dni do 4 tygodni od traumy; utrzymywanie się objawów powyżej miesiąca pozwala rozpoznać PTSD', 'Granica 1 miesiąca oddziela fizjologiczną adaptację do skrajnego stresu od utrwalonego zespołu pourazowego.'],
          ['ASR wymaga co najmniej 2 lat objawów', 'ASR jest stanem ostrym i przemijającym w pierwszych dobach/tygodniach.'],
          ['Nie ma żadnej różnicy czasowej między tymi pojęciami', 'Ramy czasowe są kluczowe dla właściwej kwalifikacji klinicznej.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Terapia celowana w traumę',
        context: 'Piotr pyta o skuteczne metody leczenia koszmarów sennych i flashbacków.',
        prompt: 'Które metody terapeutyczne stanowią interwencję I wyboru w PTSD wg wytycznych NICE?',
        choices: [
          ['Psychoterapia skoncentrowana na traumie (CBT-TF lub EMDR) oraz farmakoterapia SSRI (sertralina, paroksetyna) w razie potrzeby', 'EMDR i CBT skoncentrowana na traumie posiadają najwyższy poziom rekomendacji w przetwarzaniu pamięci traumatycznej.'],
          ['Długotrwałe leczenie benzodiazepinami o wysokiej sile (np. klonazepam)', 'Benzodiazepiny w PTSD utrudniają przetwarzanie emocjonalne i wygaszanie lęku oraz niosą wysokie ryzyko nadużywania.'],
          ['Zabiegi elektrowstrząsowe jako interwencja pierwszego rzutu', 'ECT nie jest leczeniem I rzutu w niepowikłanym PTSD.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Leczenie koszmarów sennych',
        context: 'Piotr skarży się na gwałtowne wybudzenia z koszmarami nocnymi i zlany potem budzi się co noc.',
        prompt: 'Jaki lek blokujący receptory alfa-1 adrenergiczne jest stosowany w redukcji koszmarów sennych w PTSD?',
        choices: [
          ['Prazosyna (antagonista receptorów alfa-1 adrenergicznych)', 'Prazosyna zmniejsza nadmierną stymulację noradrenergiczną w OUN w fazie snu REM, redukując koszmary pourazowe.'],
          ['Hydroksyzyna w dawce 50 mg na noc', 'Lek przeciwhistaminowy wykazuje działanie sedatywne, ale nie moduluje specyficznie wzmożonego napięcia noradrenergicznego w fazie REM odpowiedzialnego za koszmary.'],
          ['Propranolol w małej dawce', 'Beta-adrenolityki mogą zmniejszać obwodowe drżenie, lecz w badaniach klinicznych nie redukują koszmarów pourazowych tak swoiście jak antagonista alfa-1 (prazosyna).'],
        ],
        answerIndex: 0,
      },
    ]
  ),

  // 10. ADHD u dorosłych
  makeFlexibleCase(
    'adhd-dorosli-i-rozwojowe',
    'Chaos organizacyjny i prokrastynacja analityka',
    'Rafał M., 38 lat',
    'Zaawansowany',
    'Starszy analityk danych zgłasza się z powodu narastających problemów w pracy: pomimo wysokiego ilorazu inteligencji spóźnia się z projektami, gubi dokumenty i nie potrafi utrzymać uwagi na monotonnych zadaniach.',
    [
      {
        stage: 'Kryterium początku rozwojowego (DIVA-5)',
        context: 'W wywiadzie retrospektywnym Rafał przyznaje, że w szkole podstawowej stale zapominał zeszytów, bujał w obłokach, a świadectwa zawierały uwagi: „Zdolny, ale leniwy i nieskupiony”.',
        prompt: 'Dlaczego potwierdzenie obecności objawów przed 12. rokiem życia jest bezwzględnym warunkiem rozpoznania ADHD u dorosłego?',
        choices: [
          ['ADHD jest zaburzeniem neurorozwojowym; objawy deficytu uwagi pojawiające się de novo po 25. roku życia sugerują inną etiologię (depresję, bezdech senny, substancje)', 'Zgodnie z kryteriami DSM-5-TR objawy muszą manifestować się w okresie rozwojowym, nawet jeśli pełne załamanie kompensacji nastąpiło dopiero w dorosłości.'],
          ['Ponieważ objawy ujawniające się wyłącznie w dorosłości wynikają najczęściej z fizjologicznego starzenia kory mózgowej', 'Fizjologiczne starzenie nie tłumaczy izolowanego deficytu uwagi u młodych dorosłych; wyklucza się raczej schorzenia somatyczne, afektywne lub uzależnienia.'],
          ['Ponieważ wywiad rozwojowy ma jedynie znaczenie orzecznicze, a do diagnozy wystarcza 2-tygodniowy okres rozproszenia', 'Krótkotrwałe epizody dekoncentracji są typowe dla zaburzeń adaptacyjnych lub afektywnych; ADHD wymaga przewlekłego wzorca z początkiem w dzieciństwie.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Diagnostyka różnicowa z zaburzeniami nastroju',
        context: 'Rafał ma obniżoną samoocenę z powodu ciągłych niepowodzeń organizacyjnych. Zastanawiasz się, czy to pierwotny epizod depresyjny czy ADHD.',
        prompt: 'Która cecha w badaniu klinicznym najsilniej przemawia za pierwotnym ADHD z wtórną dysforią?',
        choices: [
          ['Przewlekły, wieloletni charakter trudności z uwagą wykonawczą obecny niezależnie od nastroju, z okresami hiperfokusowania na pasjach', 'W pierwotnej depresji zaburzenia koncentracji mają charakter epizodyczny i ustępują w eutyreozie, a zdolność do hiperfokusowania jest zniesiona przez anhedonię.'],
          ['Gwałtowny początek trudności w ciągu ostatnich 2 tygodni u dotąd perfekcyjnie zorganizowanego pracownika', 'Ostry początek u dorosłego wskazuje na epizod afektywny lub przyczynę organiczną, nie na ADHD.'],
          ['Obecność urojeń winy i wczesnego budzenia o 3 rano', 'Urojenia i wczesne budzenie to cechy ciężkiej depresji melancholicznej.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Farmakoterapia I wyboru u dorosłych',
        context: 'Rozpoznano ADHD z przewagą deficytu uwagi (F90.0). EKG pacjenta jest prawidłowe, ciśnienie tętnicze 120/75 mmHg.',
        prompt: 'Jaka grupa leków stanowi farmakoterapię I rzutu w ADHD u dorosłych wg wytycznych NICE i WFSBP?',
        choices: [
          ['Leki stymulujące blokujące transporter dopaminy i noradrenaliny (metylofenidat o przedłużonym uwalnianiu)', 'Metylofenidat zwiększa dostępność dopaminy i noradrenaliny w korze przedczołowej, poprawiając funkcje wykonawcze u ponad 70% pacjentów.'],
          ['Neuroleptyki klasyczne w małych dawkach (np. perfenazyna)', 'Neuroleptyki blokują receptory D2, co nasila dysfunkcję wykonawczą i zubożenie napędu w ADHD.'],
          ['Monoterapia lekiem przeciwdepresyjnym z grupy SSRI (np. escitalopram)', 'SSRI mogą redukować lęk współistniejący, ale nie poprawiają deficytów uwagi i funkcji wykonawczych w niepowikłanym ADHD.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Bezpieczeństwo kardiologiczne stymulantów',
        context: 'Przed włączeniem metylofenidatu planujesz schemat monitorowania bezpieczeństwa somatycznego.',
        prompt: 'Jakie parametry życiowe należy obowiązkowo kontrolować podczas miareczkowania stymulantów?',
        choices: [
          ['Ciśnienie tętnicze krwi i tętno spoczynkowe na każdej wizycie (ryzyko tachykardii i nadciśnienia)', 'Zwiększenie napięcia noradrenergicznego może podnosić ciśnienie i tętno, co wymaga regularnej kontroli.'],
          ['Dobowa zbiórka katecholamin w moczu przed każdą zmianą dawki', 'Badanie to służy do diagnostyki guza chromochłonnego, nie rutynowej kontroli farmakoterapii ADHD.'],
          ['Seryjne badania echokardiograficzne co 2 tygodnie', 'Rutynowe echo serca nie jest wymagane u bezobjawowych pacjentów z prawidłowym wywiadem sercowo-naczyniowym i prawidłowym EKG.'],
        ],
        answerIndex: 0,
      },
    ]
  ),

  // 11. Zaburzenia osobowości - Model wymiarowy ICD-11
  makeFlexibleCase(
    'zaburzenia-osobowosci-wymiarowe',
    'Niestabilność relacji i lęk przed odrzuceniem',
    'Marta L., 23 lata',
    'Zaawansowany',
    'Studentka pedagogiki zgłasza się po impulsywnym samouszkodzeniu przedramion w reakcji na nieodczytaną przez partnera wiadomość tekstową.',
    [
      {
        stage: 'Model wymiarowy ICD-11 vs kategorie DSM-5',
        context: 'Marta opisuje przewlekłe poczucie pustki, skrajne wahania nastroju trwające od kilku godzin do 2 dni oraz gwałtowne przejścia od idealizacji do dewaluacji bliskich osób.',
        prompt: 'Jak w nowym modelu wymiarowym ICD-11 diagnozuje się zaburzenia osobowości?',
        choices: [
          ['Ocenia się ogólny stopień nasilenia dysfunkcji osobowości (łagodne, umiarkowane, ciężkie) oraz specyficzne domeny cech (np. negatywna afektywność, rozhamowanie)', 'ICD-11 odeszło od sztywnych kategorii ksobnych na rzecz oceny stopnia uszkodzenia relacji i tożsamości oraz profilu cech z wyróżnikiem wzorca granicznego.'],
          ['Wymaga się wyłącznie znalezienia jednego z 10 sztywnych typów bez oceny nasilenia', 'Model kategoryczny był krytykowany za nadmierne nakładanie się rozpoznań.'],
          ['Wymaga się wykonania seryjnych testów laboratoryjnych w kierunku neuroprzekaźników', 'Żadne testy biochemiczne czy laboratoryjne nie stanowią kryterium diagnostycznego zaburzeń osobowości.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Różnicowanie z chorobą afektywną dwubiegunową',
        context: 'Marta miała wcześniej podejrzenie ChAD z powodu „huśtawek nastroju”.',
        prompt: 'Która cecha dynamiki emocjonalnej najsilniej odróżnia zaburzenie osobowości z pogranicza (BPD) od epizodów w ChAD?',
        choices: [
          ['Fluktuacje nastroju w BPD są reaktywne na bodźce interpersonalne i trwają godziny/dni, podczas gdy epizody manii/depresji w ChAD trwają tygodnie/miesiące i są bardziej autonomiczne', 'Reaktywność na odrzucenie i szybka labilność w ciągu doby są cechą kardynalną BPD.'],
          ['W ChAD pacjenci nigdy nie mają lęku przed odrzuceniem', 'Lęk może towarzyszyć wielu stanom, kluczowa jest skala czasowa faz.'],
          ['W BPD nigdy nie występują zachowania autodestrukcyjne', 'Samouszkodzenia i groźby samobójcze są częste w kryzysach BPD.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Psychoterapia I wyboru',
        context: 'Marta pyta, jaka forma leczenia pozwoli jej nauczyć się regulacji emocji i zapobiegania kryzysom.',
        prompt: 'Jaka metoda psychoterapii posiada najwyższy stopień rekomendacji w leczeniu zaburzenia osobowości z pogranicza (BPD)?',
        choices: [
          ['Dialektyczna terapia behawioralna (DBT) lub terapia oparta na mentalizacji (MBT)', 'DBT uczy konkretnych umiejętności tolerancji dystresu, regulacji emocji i uważności, redukując samouszkodzenia.'],
          ['Wieloletnie leczenie benzodiazepinami w dużych dawkach', 'Benzodiazepiny w BPD nasilają impulsywność poprzez odhamowanie behawioralne.'],
          ['Izolowana farmakoterapia z częstą rotacją leków bez interwencji psychoterapeutycznej', 'Sama farmakoterapia bez psychoterapii celowanej (np. DBT) nie prowadzi do trwałej poprawy regulacji emocjonalnej i relacyjnej.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Rola farmakoterapii pomocniczej',
        context: 'W okresie nasilonego kryzysu dysforycznego z lękiem rozważasz farmakoterapię objawową.',
        prompt: 'Jaka jest rola farmakoterapii w zaburzeniu osobowości z pogranicza wg wytycznych NICE?',
        choices: [
          ['Farmakoterapia nie leczy samego zaburzenia osobowości; może być stosowana krótkoterminowo celując w konkretne objawy (np. mała dawka atypowego neuroleptyku w silnej dysforii)', 'NICE wyraźnie przestrzega przed polipragmazją w BPD i traktuje leki jako wsparcie w ostrych kryzysach.'],
          ['Długoterminowa politerapia lekami przeciwpsychotycznymi i stabilizatorami w celu całkowitej eradykacji cech osobowości', 'Wytyczne przestrzegają przed przewlekłą polipragmazją; farmakoterapia nie zmienia struktury osobowości, a jedynie łagodzi ostre objawy kryzysowe.'],
          ['Całkowity bezwzględny zakaz podawania jakichkolwiek leków nawet w ciężkiej depresji współistniejącej', 'Współistniejący pełny epizod dużej depresji wymaga standardowego leczenia przeciwdepresyjnego.'],
        ],
        answerIndex: 0,
      },
    ]
  ),

  // 12. Substancje i secondary causes
  makeFlexibleCase(
    'substancje-i-secondary-causes',
    'Niepokój, drżenie i omamy po nagłym przerwaniu ciągu',
    'Kamil Z., 31 lat',
    'Podstawowy',
    'Mężczyzna zostaje przywieziony na izbę przyjęć przez pogotowie: jest zlany potem, ma silne drżenie całego ciała, tętno 128/min, ciśnienie 165/105 mmHg i twierdzi, że po ścianie biegają owady.',
    [
      {
        stage: 'Rozpoznanie ostrego zespołu odstawiennego',
        context: 'Rodzina informuje, że Kamil pił codziennie duże ilości alkoholu przez 3 tygodnie, a 36 godzin temu gwałtownie przestał z powodu braku pieniędzy.',
        prompt: 'Jaki stan kliniczny prezentuje pacjent (skala CIWA-Ar)?',
        choices: [
          ['Alkoholowy zespół abstynencyjny powikłany majaczeniem (Delirium Tremens) — stan bezpośredniego zagrożenia życia', 'Połączenie zaburzeń świadomości, iluzji/omamów wzrokowych (mikrozoopsje), drżenia i silnego pobudzenia wegetatywnego definiuje majaczenie drżenne.'],
          ['Czysty debiut schizofrenii paranoidalnej', 'Brak pobudzenia wegetatywnego w schizofrenii; wywiad gwałtownego odstawienia alkoholu jest rozstrzygający.'],
          ['Ostry epizod lęku panicznego z somatyzacją', 'Napad paniki nie powoduje zaburzeń świadomości z mikrozoopsjami, a wywiad nagłego odstawienia po ciągu wskazuje na powikłany zespół abstynencyjny.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Farmakoterapia ratunkowa I wyboru',
        context: 'Należy zapobiec drgawkom odstawiennym i powikłaniom krążeniowym majaczenia.',
        prompt: 'Która grupa leków i w jakim schemacie stanowi leczenie z wyboru w alkoholowym zespole odstawiennym wg protokołu CIWA-Ar?',
        choices: [
          ['Benzodiazepiny o długim okresie półtrwania (np. diazepam i.v./p.o.) podawane w dawkach zależnych od nasilenia objawów w skali CIWA-Ar', 'Benzodiazepiny kompensują deficyt hamowania GABA-ergicznego wywołany nagłym odstawieniem etanolu i zapobiegają drgawkom.'],
          ['Monoterapia haloperydolem domięśniowo bez benzodiazepin', 'Haloperydol obniża próg drgawkowy i w monoterapii w zespole odstawiennym zwiększa śmiertelność.'],
          ['Kroplówki z glukozą bez witaminy B1', 'Podanie glukozy przed tiaminą grozi sprowokowaniem ostrej encefalopatii Wernickego.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Profilaktyka zespołu Wernickego-Korsakowa',
        context: 'Przed podaniem płynów zawierających glukozę pacjentowi wyniszczonemu w ciągu alkoholowym konieczna jest suplementacja kofaktorów.',
        prompt: 'Jaki lek należy bezwzględnie podać pozajelitowo przed jakąkolwiek infuzją węglowodanów?',
        choices: [
          ['Tiamina (witamina B1) w wysokiej dawce parenteralnie (i.v. lub i.m.)', 'Zużycie resztek tiaminy w metabolizmie glukozy wywołuje ostre martwicze uszkodzenie ciał suteczkowatych (encefalopatia Wernickego).'],
          ['Potas w bolusie bez uprzedniej oceny EKG i tiaminy', 'Gwałtowna nieskorygowana podaż potasu grozi arytmią, a brak tiaminy naraża na nieodwracalne uszkodzenie struktur podkorowych.'],
          ['Piracetam w dużej dawce dożylnej', 'Leki nootropowe nie mają udowodnionej skuteczności w profilaktyce ostrej encefalopatii Wernickego.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Diagnostyka podwójnej diagnozy',
        context: 'Po 5 dniach Kamil jest w pełnej jasności świadomości. Przyznaje, że zaczął pić alkohol 2 lata temu, by stłumić lęk napadowy.',
        prompt: 'Jakie postępowanie w zakresie podwójnej diagnozy (uzależnienie + zaburzenie lękowe) daje najwyższą szansę na trwałą abstynencję?',
        choices: [
          ['Równoległe, zintegrowane leczenie uzależnienia od alkoholu i zaburzenia lękowego (psychoterapia uzależnień + bezpieczny lek przeciwlękowy nieuzależniający, np. SSRI)', 'Rozdzielanie leczenia („najpierw rok trzeźwości, potem leczenie lęku”) prowadzi do szybkiego nawrotu picia z powodu nieleczonych objawów lękowych.'],
          ['Przepisanie alprazolamu do codziennego stosowania zamiast alkoholu', 'Zastąpienie alkoholu krótko działającą benzodiazepiną prowadzi do wtórnego uzależnienia krzyżowego.'],
          ['Odrębne, sekwencyjne leczenie: odłożenie terapii lęku do uzyskania minimum 12 miesięcy pełnej abstynencji', 'Odkładanie leczenia nasilonego zaburzenia lękowego dramatycznie zwiększa ryzyko samoleczenia alkoholem i wczesnego nawrotu; zaleca się model zintegrowany.'],
        ],
        answerIndex: 0,
      },
    ]
  ),
];
