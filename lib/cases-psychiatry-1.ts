import type { ClinicalCase } from './cases-psychiatry-builder.ts';
import { make } from './cases-psychiatry-builder.ts';

export const psychiatryCasesPart1: ClinicalCase[] = [
  make(
    'wywiad-psychiatryczny-mse',
    'Niepozorny niepokój u studenta',
    'Mężczyzna, 21 lat',
    'Podstawowy',
    'Student III roku politechniki zgłasza się z powodu narastających od 3 miesięcy trudności w nauce, poczucia izolacji i niepokoju.',
    [
      [
        'W badaniu pacjent ma zubożałą mimikę (hipomimia), wypowiada się cicho, z wydłużonym czasem latencji odpowiedzi. Nie zgłasza jawnych urojeń ani omamów.',
        'Które elementy w ocenie MSE wskazują na obecność objawów ubytkowych (negatywnych)?',
        ['Spłycenie afektu, alogia (ubóstwo mowy) oraz wycofanie społeczne', 'Objawy negatywne cechują się deficytem ekspresji emocjonalnej i zubożeniem kontaktu.'],
        ['Wyłącznie tachykardia i drżenie rąk', 'Objawy wegetatywne nie definiują zespołu ubytkowego w schizofrenii.'],
      ],
      [
        'Wykonano podstawowe badania krwi, toksykologię moczu (ujemna) oraz konsultację neurologiczną (bez odchyleń).',
        'Jaki krok diagnostyczny jest kluczowy przy podejrzeniu prodromu psychozy u osoby młodej?',
        ['Szczegółowy wywiad od rodziny na temat dynamiki zmian funkcjonowania i neuroobrazowanie MRI mózgu', 'Pozwala to ustalić trajektorię pogorszenia i wykluczyć wady lub procesy organiczne OUN.'],
        ['Natychmiastowe skierowanie na rentgen klatki piersiowej i kości czaszki', 'Rentgen kości czaszki nie ocenia miąższu mózgowia ani psychozy.'],
      ],
      [
        'Stan psychiczny pacjenta spełnia kryteria stanu podwyższonego ryzyka psychozy (At-Risk Mental State - ARMS / CHR).',
        'Jakie jest prawidłowe rozpoznanie kliniczne na tym etapie?',
        ['Stan wysokiego ryzyka psychozy z przewagą dysfunkcji poznawczych i wycofania', 'Brak w pełni ukształtowanych objawów wytwórczych nie pozwala jeszcze na rozpoznanie schizofrenii.'],
        ['Choroba Alzheimera o wczesnym początku', 'Otępienie alzheimerowskie w wieku 21 lat bez tła rodzinnego jest skrajnie nieprawdopodobne.'],
      ],
      [
        'Rodzina pyta o dalsze postępowanie terapeutyczne.',
        'Jaka jest rekomendowana strategia w fazie prodromalnej (CHR)?',
        ['Ścisły monitoring kliniczny, psychoedukacja i wsparcie psychoterapeutyczne CBT (neuroleptyki tylko w razie progresji do jawnej psychozy)', 'Wytyczne zalecają powściągliwość w rutynowym włączaniu neuroleptyków przed jawnym epizodem wytwórczym.'],
        ['Wdrożenie haloperydolu w maksymalnej dawce domięśniowo', 'Klasyczne neuroleptyki w prodromie są błędem i nasilają apatię.'],
      ],
    ]
  ),
  make(
    'klasyfikacje-dsm5-icd11',
    'Dylemat kryteriów w gabinecie POZ',
    'Kobieta, 29 lat',
    'Podstawowy',
    'Pacjentka zgłasza się 6 tygodni po nagłej utracie pracy i rozstaniu z partnerem. Skarży się na ciągły smutek, płaczliwość i bezsenność.',
    [
      [
        'Pacjentka spełnia 6 z 9 kryteriów epizodu depresyjnego wg DSM-5-TR, objawy trwają nieprzerwanie od 4 tygodni, występuje anhedonia i poczucie winy.',
        'Czy obecność ciężkiego stresora życiowego (utrata pracy) wyklucza rozpoznanie epizodu depresyjnego?',
        ['Nie, kryteria DSM-5-TR i ICD-11 jednoznacznie zniosły wykluczenie żałoby/stresu, jeśli spełnione są pełne kryteria epizodu', 'Kontekst stresowy nie unieważnia biologicznego epizodu depresyjnego wymagającego leczenia.'],
        ['Tak, przy obecności stresora można rozpoznać wyłącznie przejściowe zmęczenie', 'Bagatelizowanie ciężkiego epizodu jako "reakcji na stres" opóźnia skuteczną terapię.'],
      ],
      [
        'W badaniach laboratoryjnych TSH 1,8 mIU/l, morfologia prawidłowa, CRP w normie.',
        'Co wnosi prawidłowy panel podstawowy w tym przypadku?',
        ['Potwierdza brak uchwytnej somatycznej przyczyny dekompensacji afektywnej', 'Pozwala na bezpieczne postawienie diagnozy pierwotnego epizodu depresyjnego.'],
        ['Wskazuje na bezwzględną konieczność biopsji szpiku kostnego', 'Brak jakichkolwiek wskazań hematologicznych do biopsji szpiku.'],
      ],
      [
        'Objawy trwają ponad miesiąc, nasilenie w skali MADRS wynosi 26 punktów (umiarkowane).',
        'Jak brzmi pełne rozpoznanie wg ICD-11?',
        ['Epizod depresyjny umiarkowany bez cech psychotycznych (6A70.1)', 'Liczba objawów i upośledzenie ról społecznych odpowiadają nasileniu umiarkowanemu.'],
        ['Ostre zaburzenie dysocjacyjne tożsamości', 'Pacjentka nie wykazuje cech dysocjacyjnych.'],
      ],
      [
        'Klinicysta planuje optymalną interwencję leczniczą.',
        'Jakie postępowanie I wyboru rekomendują wytyczne NICE i CANMAT dla depresji umiarkowanej?',
        ['Farmakoterapia lekiem z grupy SSRI (np. sertralina, escitalopram) skojarzona z psychoterapią poznawczo-behawioralną', 'Połączenie farmakoterapii i psychoterapii daje najwyższy odsetek trwałej remisji.'],
        ['Wyłącznie skierowanie do sanatorium uzdrowiskowego bez leków', 'Umiarkowana depresja wymaga aktywnego leczenia przeciwdepresyjnego.'],
      ],
    ]
  ),
  make(
    'psychopatologia-objawow',
    'Głosy zza ściany i poczucie podsłuchu',
    'Mężczyzna, 36 lat',
    'Zaawansowany',
    'Inżynier informatyk twierdzi, że sąsiedzi zamontowali w gniazdkach mikrofony i komentują każdy jego krok w mieszkaniu.',
    [
      [
        'Pacjent słyszy dwa obce głosy dyskutujące między sobą na temat jego myśli i zachowań. Jest bezwzględnie przekonany o realności podsłuchu.',
        'Jak w terminologii psychopatologicznej określa się te objawy?',
        ['Omamy słuchowe słowne (omamy komentujące) oraz usystematyzowane urojenia ksobne i prześladowcze', 'Głosy komentujące w 3. osobie i urojenia prześladowcze to klasyczne objawy osiowe psychozy.'],
        ['Iluzje fizjologiczne i myśli natrętne ego-dystoniczne', 'W iluzjach istnieje realny bodziec, a myśli natrętne są krytykowane przez pacjenta jako własne i absurdalne.'],
      ],
      [
        'W wykonanym w trybie pilnym badaniu MRI głowy nie uwidoczniono zmian ogniskowych ani obrzęku. Toksykologia moczu ujemna.',
        'Jak interpretować ten wynik u pacjenta z ostrymi objawami wytwórczymi?',
        ['Wyklucza proces ekspansywny OUN, udar oraz intoksykację narkotykami, potwierdzając pierwotne tło psychotyczne', 'Czyste neuroobrazowanie i ujemna toksykologia kierują diagnostykę ku spektrum schizofrenii.'],
        ['Dowodzi, że pacjent symuluje objawy dla uzyskania renty', 'Prawidłowe MRI nie wyklucza psychozy; schizofrenia nie daje widocznych guzów w rutynowym MRI.'],
      ],
      [
        'Objawy trwają nieprzerwanie od 4 miesięcy, powodując całkowitą izolację w zaciemnionym pokoju.',
        'Jakie jest rozpoznanie kliniczne wg ICD-11?',
        ['Schizofrenia (Schizophrenia - 6A20)', 'Utrzymywanie się osiowych objawów urojeniowo-omamowych przez ponad 1 miesiąc spełnia wymogi ICD-11.'],
        ['Zaburzenie afektywne dwubiegunowe z manią', 'Brak wzmożonego nastroju, ekspansywności i epizodów maniakalnych.'],
      ],
      [
        'Pacjent nie przyjmował dotąd żadnych leków przeciwpsychotycznych.',
        'Jaki neuroleptyk i w jakim celu należy zaproponować w pierwszej kolejności?',
        ['Atypowy lek przeciwpsychotyczny (np. aripiprazol lub rysperydon w małej/średniej dawce)', 'Leki II/III generacji cechują się korzystnym profilem tolerancji i wysoką skutecznością w pierwszym epizodzie.'],
        ['Chlorpromazyna w dawce 1000 mg/d domięśniowo', 'Stosowanie megadawek FGA w pierwszym epizodzie grozi ciężkim zespołem pozapiramidowym i zniechęceniem do leczenia.'],
      ],
    ]
  ),
  make(
    'depresja-fenotypy-i-kryteria',
    'Gdy zmęczenie nie ustępuje po urlopie',
    'Kobieta, 45 lat',
    'Podstawowy',
    'Księgowa zgłasza się z powodu przewlekłego spadku energii, utraty wagi o 6 kg i budzenia się codziennie o 3 nad ranem.',
    [
      [
        'Pacjentka nie cieszy się z żadnych aktywności, czuje się najgorzej o poranku, ma spowolniony chód i poczucie bezsensu życia.',
        'Jaki fenotyp epizodu depresyjnego prezentuje pacjentka?',
        ['Epizod depresyjny z cechami melancholicznymi (somatycznymi)', 'Wczesne budzenie, poranne pogorszenie, utrata wagi i anhedonia definiują cechy melancholiczne.'],
        ['Epizod depresyjny o fenotypie atypowym', 'W depresji atypowej występuje wzmożony apetyt, hipersomnia i reaktywność nastroju.'],
      ],
      [
        'Wykonano badania: TSH 2,2 mIU/l, fT4 w normie, ferrytyna 60 ng/ml, witamina B12 400 pg/ml, morfologia prawidłowa.',
        'Jaka jest interpretacja profilu metaboliczno-tarczycowego?',
        ['Prawidłowa czynność tarczycy i gospodarka żelazem wykluczają częste somatyczne przyczyny zespołu melancholicznego', 'Pozwala to skupić się na celowanej farmakoterapii przeciwdepresyjnej.'],
        ['Wskazuje na natychmiastową konieczność podania jodu promieniotwórczego', 'Tarczyca pracuje prawidłowo, brak wskazań do leczenia radiojodem.'],
      ],
      [
        'Nasilenie depresji w skali HAM-D wynosi 24 punkty (ciężka depresja bez objawów psychotycznych). Myśli samobójcze o charakterze rezygnacyjnym.',
        'Jakie jest rozpoznanie?',
        ['Ciężki epizod depresyjny z zespołem somatycznym (melancholicznym)', 'Kombinacja głębokiego spowolnienia i wegetatywnych cech melancholii.'],
        ['Zaburzenie hipochondryczne', 'Pacjentka nie skupia się na lęku przed konkretną chorobą, lecz ma globalny deficyt nastroju i energii.'],
      ],
      [
        'Pacjentka wymaga skutecznej farmakoterapii przywracającej napęd i sen.',
        'Jaki lek przeciwdepresyjny I wyboru posiada silne dowody w fenotypie melancholicznym?',
        ['Lek o profilu podwójnym SNRI (np. wenlafaksyna, duloksetyna) lub SSRI w połączeniu z mirtazapiną na noc', 'Modulacja noradrenergiczna i serotoninergiczna wykazuje wysoką skuteczność w melancholii ze spowolnieniem.'],
        ['Hydroksyzyna w kroplach doraźnie', 'Hydroksyzyna jest lekiem przeciwhistaminowym, nie leczy ciężkiej depresji melancholicznej.'],
      ],
    ]
  ),
  make(
    'mania-hipomania-spektrum',
    'Kreatywny zryw i nieprzespane noce',
    'Mężczyzna, 28 lat',
    'Podstawowy',
    'Grafik komputerowy od 5 dni śpi po 2 godziny na dobę, wziął dwa kredyty na "rewolucyjny startup" i mówi tak szybko, że trudno go zrozumieć.',
    [
      [
        'Pacjent jest euforyczny, drażliwy przy próbie przerwania wypowiedzi, wykazuje słowotok, gonitwę myśli i wydatki znacznie przekraczające budżet.',
        'Które cechy stanu psychicznego przesądzają o rozpoznaniu epizodu manii (a nie hipomanii)?',
        ['Znaczne upośledzenie funkcjonowania społeczno-finansowego oraz objawy o nasileniu dezorganizującym', 'W hipomanii funkcjonowanie nie ulega załamaniu i brak jest tak skrajnych zachowań ryzykownych.'],
        ['Wyłącznie zmniejszona potrzeba snu', 'Zmniejszona potrzeba snu występuje w obu stanach, to skala dysfunkcji różnicuje manię.'],
      ],
      [
        'W wywiadzie: w wieku 23 lat przebył 3-miesięczny epizod ciężkiej depresji leczony bezskutecznie dwoma lekami przeciwdepresyjnymi.',
        'Jak ten fakt z przeszłości modyfikuje rozumienie obrazu klinicznego?',
        ['Wskazuje na Chorobę Afektywną Dwubiegunową typu I (ChAD I)', 'Wystąpienie choćby jednego pełnego epizodu manii w życiu definiuje rozpoznanie ChAD I.'],
        ['Świadczy o tym, że pacjent jest zdrowy, a obecne zachowanie to fizjologiczna kompensacja', 'Jest to ciężki, patologiczny epizod afektywny wymagający hospitalizacji.'],
      ],
      [
        'Wykluczono używanie stymulantów (toksykologia moczu ujemna). Stan spełnia kryteria manii.',
        'Jakie jest rozpoznanie kliniczne?',
        ['Epizod maniakalny w przebiegu zaburzenia afektywnego dwubiegunowego typu I', 'Spełnione pełne kryteria czasowe i objawowe manii.'],
        ['Dystymia o wczesnym początku', 'Dystymia to przewlekłe obniżenie nastroju o małym nasileniu, a nie stan manii.'],
      ],
      [
        'Pacjent odmawia przyjmowania leków doustnych i jest silnie pobudzony.',
        'Jakie jest leczenie I rzutu w ostrej manii dwubiegunowej wg standardów CANMAT/ISBD?',
        ['Lek przeciwpsychotyczny II generacji (np. olanzapina, aripiprazol lub kwetiapina) ewentualnie w skojarzeniu z litkiem lub walproinianem', 'SGA najszybciej opanowują pobudzenie maniakalne i przywracają sen.'],
        ['Monoterapia fluoksetyną w dawce 60 mg/d', 'Antydepresant w ostrej manii dramatycznie nasiliłby pobudzenie i ryzyko agresji.'],
      ],
    ]
  ),
  make(
    'psychoza-i-szlaki-dopaminy',
    'Tajemnicze kody na parkingu',
    'Mężczyzna, 24 lata',
    'Zaawansowany',
    'Młody pracownik korporacji przestał wychodzić z mieszkania, twierdząc, że rejestracje aut na parkingu to zaszyfrowane groźby służb specjalnych.',
    [
      [
        'Pacjent nadaje neutralnym bodźcom wzrokowym (numery tablic, kolor kurtek przechodniów) głębokie, zagrażające znaczenie odnoszące się bezpośrednio do niego.',
        'Jakie zjawisko neurobiologiczne i semiotyczne odpowiada za ten objaw?',
        ['Nadawanie aberracyjnej wagi poznawczej (aberrant salience) wywołane hiperdopaminergią w szlaku mezolimbicznym', 'Nadmierny wyrzut dopaminy powoduje, że przypadkowe bodźce stają się dla pacjenta skrajnie ważne i przerażające.'],
        ['Porażenie nerwu okoruchowego', 'Objaw ten dotyczy interpretacji znaczenia, a nie ruchomości gałek ocznych.'],
      ],
      [
        'W szpitalu wykonano tomografię komputerową głowy (norma) oraz panel metaboliczny i toksykologiczny (czysty).',
        'Jaka jest rola badań obrazowych w pierwszym epizodzie psychotycznym (FEP)?',
        ['Konieczne wykluczenie guzów, naczyniaków, krwiaków przymózgowych i wad rozwojowych OUN', 'Organiczne uszkodzenia mózgu mogą idealnie naśladować pierwszy rzut schizofrenii.'],
        ['Badanie neuroobrazowe służy do potwierdzenia podtypu schizofrenii', 'Neuroobrazowanie wyklucza przyczyny wtórne, nie stawia diagnozy schizofrenii.'],
      ],
      [
        'Objawy trwają od 7 tygodni, pacjent nie radzi sobie z samoobsługą.',
        'Jakie jest rozpoznanie kliniczne?',
        ['Pierwszy epizod schizofrenii (6A20 wg ICD-11)', 'Utrzymywanie się osiowych urojeń ksobnych i ksobno-prześladowczych powyżej 1 miesiąca.'],
        ['Fobia społeczna prosta', 'Fobia społeczna nie wiąże się z urojeniową interpretacją rzeczywistości.'],
      ],
      [
        'Klinicysta planuje rozpoczęcie farmakoterapii przeciwpsychotycznej.',
        'W jakim przedziale occupancy receptorów D2 w prążkowiu (okno Kapura) należy dążyć w badaniach neuroobrazowych?',
        ['65% do 80% occupancy D2', 'Zapewnia to kontrolę psychozy bez ryzyka parkinsonizmu polekowego i hiperprolaktynemii.'],
        ['Poniżej 30% occupancy', 'Poniżej 65% neuroleptyk nie wykazuje skuteczności przeciwpsychotycznej.'],
      ],
    ]
  ),
  make(
    'zaburzenia-lekowe-gad-napadowy',
    'Duszność w zatłoczonym metrze',
    'Kobieta, 26 lat',
    'Podstawowy',
    'Architektka zgłasza się po trzech interwencjach Pogotowia Ratunkowego z powodu nagłych epizodów duszności, palpitacji i lęku przed śmiercią.',
    [
      [
        'Napady pojawiają się nagle, trwają około 15–20 minut, towarzyszy im poczucie dławienia, zawroty głowy i drętwienie dłoni. W EKG i troponinach brak odchyleń.',
        'Jakie rozpoznanie należy podejrzewać w pierwszej kolejności?',
        ['Zaburzenie lękowe z napadami paniki (Panic Disorder) z lękiem antycypacyjnym', 'Nagłe rzuty obezwładniającego lęku wegetatywnego bez patologii kardiologicznej to klasyczna panika.'],
        ['Astma oskrzelowa wysiłkowa', 'Prawidłowa spirometria i brak świstów w badaniu osłuchowym wykluczają astmę.'],
      ],
      [
        'Wykluczono guz chromochłonny (prawidłowe metanefryny w moczu) oraz nadczynność tarczycy (TSH w normie).',
        'Dlaczego diagnostyka różnicowa napadów paniki wymaga badań endokrynologicznych?',
        ['Ponieważ nadczynność tarczycy i pheochromocytoma idealnie imitują autonomiczne objawy paniki', 'Wyrzut katecholamin lub hormonów tarczycy wywołuje identyczne pobudzenie adrenergiczne.'],
        ['Badania te są zbędne i generują jedynie koszty', 'Zaniechanie wykluczenia schorzeń somatycznych jest błędem w sztuce lekarskiej.'],
      ],
      [
        'Pacjentka zaczęła unikać jazdy metrem i galerii handlowych z obawy przed brakiem pomocy.',
        'Jakie jest pełne rozpoznanie kliniczne?',
        ['Zaburzenie lękowe z napadami paniki i agorafobią', 'Dołączające unikanie przestrzeni publicznych z lękiem przed uwięzieniem definiuje agorafobię.'],
        ['Zaburzenie urojeniowe', 'Pacjentka ma pełen krytycyzm wobec lękowego charakteru objawów.'],
      ],
      [
        'Pacjentka pyta o najskuteczniejszą formę leczenia długoterminowego.',
        'Jakie leczenie I wyboru należy wdrożyć?',
        ['SSRI (np. sertralina lub escitalopram w powolnej titracji) skojarzone z psychoterapią CBT z ekspozycją', 'SSRI długoterminowo tłumią pobudliwość ciała migdałowatego, a CBT odwrażliwia lęk przed lękiem.'],
        ['Przepisanie alprazolamu w dawce 2 mg 3x dziennie przez rok', 'Prowadzi do ciężkiego uzależnienia i nasilenia lęku z odbicia.'],
      ],
    ]
  ),
  make(
    'ocd-i-petla-cstc',
    'Godziny przy zlewie i symetria biurka',
    'Mężczyzna, 31 lat',
    'Podstawowy',
    'Programista myje ręce po 40 razy dziennie z obawy przed zarazkami, spóźniając się do pracy z powodu konieczności układania przedmiotów.',
    [
      [
        'Pacjent zdaje sobie sprawę z absurdalności swoich obaw, jednak niewykonanie rytuału mycia wywołuje obezwładniający lęk i napięcie.',
        'Która cecha odróżnia myśli natrętne w OCD od myśli urojeniowych w psychozie?',
        ['Zachowany krytycyzm i poczucie ego-dystoniczności (pacjent wie, że myśli pochodzą z jego umysłu i są irracjonalne)', 'W psychozie urojenia są traktowane bezkrytycznie jako obiektywna prawda (ego-syntoniczność).'],
        ['Występowanie wyłącznie w nocy', 'OCD manifestuje się przez cały dzień w trakcie codziennych czynności.'],
      ],
      [
        'Dłonie pacjenta są zaczerwienione, z pęknięciami skóry i maceracją naskórka (objaw przymusowego mycia).',
        'Jaki obwód neuronalny wykazuje nadaktywność w patogenezie tego zaburzenia?',
        ['Pętla korowo-prążkowiowo-wzgórzowo-korowa (CSTC) obejmująca korę oczodołowo-czołową (OFC)', 'Zaburzenie bramkowania w prążkowiu uniemożliwia wygaszenie sygnału o błędzie lub zagrożeniu.'],
        ['Drogi czuciowe sznurów tylnych rdzenia kręgowego', 'Sznury tylne przewodzą czucie wibracji i ułożenia, nie generują natręctw.'],
      ],
      [
        'Nasilenie objawów w skali Y-BOCS wynosi 28 punktów (ciężkie OCD).',
        'Jakie jest rozpoznanie?',
        ['Zaburzenie obsesyjno-kompulsyjne (OCD - Obsessive-Compulsive Disorder)', 'Występują zarówno myśli natrętne (obsesje skażenia), jak i czynności natrętne (kompulsje mycia).'],
        ['Obsesyjno-kompulsyjne zaburzenie osobowości (OCPD)', 'OCPD to utrwalony, ego-syntoniczny wzorzec perfekcjonizmu, a nie uciążliwe rytuały mycia.'],
      ],
      [
        'Klinicysta dobiera farmakoterapię.',
        'Jakie zasady dawkowania SSRI obowiązują w leczeniu OCD w porównaniu z depresją?',
        ['Stosuje się wysokie dawki (np. sertralina 200 mg/d), a czas oczekiwania na odpowiedź wynosi 10–12 tygodni', 'Desensytyzacja receptorowa w pętli CSTC wymaga wyższego stopnia occupancy i dłuższego czasu.'],
        ['Wystarczy dawka minimalna przez 10 dni', 'Dawki minimalne są nieskuteczne w redukcji natręctw w obwodach CSTC.'],
      ],
    ]
  ),
  make(
    'ptsd-trauma-stres',
    'Koszmary i błyski świateł po wypadku',
    'Kobieta, 38 lat',
    'Podstawowy',
    'Kierowniczka marketingu uczestniczyła 3 miesiące temu w zderzeniu czołowym samochodów. Od tego czasu budzi się z krzykiem i nie może wsiąść do auta.',
    [
      [
        'Podczas nagłych dźwięków (klakson, pisk opon) pacjentka przeżywa scenę wypadku, czując zapach spalonej gumy i dymu (flashback). Towarzyszy jej bezsenność i drażliwość.',
        'Które zjawisko kliniczne stanowi patognomoniczną cechę zespołu stresu pourazowego (PTSD)?',
        ['Nawracające, natrętne ponowne przeżywanie traumy (intruzje, flashbacks) wbrew woli pacjenta', 'Jest to rdzenny objaw odróżniający PTSD od zwykłego lęku adaptacyjnego.'],
        ['Całkowita utrata zdolności mowy w języku ojczystym', 'Afazja motoryczna wskazuje na uszkodzenie kory mózgowej, a nie PTSD.'],
      ],
      [
        'W badaniach laboratoryjnych parametry somatyczne w normie.',
        'Jaka zmiana neurobiologiczna w układzie limbicznym odpowiada za brak wygaszania lęku pourazowego?',
        ['Nadreaktywność ciała migdałowatego przy osłabionym hamowaniu ze strony brzuszno-przyśrodkowej kory przedczołowej (vmPFC) i atrofii hipokampa', 'Prowadzi to do niemożności zróżnicowania bezpiecznego kontekstu teraźniejszości od wspomnienia zagrożenia.'],
        ['Całkowity brak neuronów dopaminowych w pniu mózgu', 'PTSD nie jest schorzeniem z ubytkiem istoty czarnej.'],
      ],
      [
        'Objawy trwają ponad 3 miesiące i uniemożliwiają powrót do pracy.',
        'Jakie jest rozpoznanie?',
        ['Zespół stresu pourazowego (PTSD - Post-Traumatic Stress Disorder)', 'Spełnione kryteria ekspozycji na traumę, ponownego przeżywania, unikania i hiperwzbudzenia trwające > 1 miesiąc.'],
        ['Ostra reakcja na stres (ASD)', 'ASD rozpoznaje się wyłącznie w pierwszym miesiącu od ekspozycji na uraz.'],
      ],
      [
        'Pacjentka pyta o najskuteczniejszą terapię przyczynową.',
        'Jaka interwencja psychoterapeutyczna posiada status I wyboru w międzynarodowych wytycznych?',
        ['Psychoterapia poznawczo-behawioralna zorientowana na traumę (TF-CBT) lub terapia odwrażliwiania za pomocą ruchu gałek ocznych (EMDR)', 'Metody te posiadają najwyższy stopień dowodów naukowych (Level 1) w leczeniu śladów pamięciowych traumy.'],
        ['Długotrwałe podawanie benzodiazepin w wysokich dawkach', 'Benzodiazepiny hamują naturalne procesy wygaszania lęku i utrwalają objawy PTSD.'],
      ],
    ]
  ),
  make(
    'adhd-dorosli-i-rozwojowe',
    'Geniusz chaosu na granicy zwolnienia',
    'Mężczyzna, 33 lata',
    'Podstawowy',
    'Analityk finansowy o ponadprzeciętnej inteligencji stoi przed groźbą dyscyplinarnego zwolnienia z powodu chronicznych spóźnień, gubienia dokumentów i prokrastynacji.',
    [
      [
        'Pacjent w sytuacjach presji czasu potrafi pracować przez 14 godzin (hiperfokus), lecz nie potrafi zmusić się do wykonywania rutynowych raportów. Odczuwa stały niepokój wewnętrzny.',
        'Jaki deficyt neuropsychologiczny leży u podłoża takich trudności?',
        ['Dysfunkcja funkcji wykonawczych (pamięci roboczej, planowania i hamowania reakcji) zależna od kory przedczołowej', 'W ADHD uwaga nie jest nieobecna, lecz pozbawiona wewnętrznej, wolicjonalnej kontroli.'],
        ['Pierwotne upośledzenie umysłowe w stopniu umiarkowanym', 'Wysokie IQ i zaawansowane stanowisko analityka wykluczają niepełnosprawność intelektualną.'],
      ],
      [
        'W zebranym wywiadzie od matki pacjenta: w szkole podstawowej stale gubił zeszyty, wiercił się w ławce i rozmawiał z kolegami pomimo bardzo dobrych ocen.',
        'Dlaczego potwierdzenie obecności objawów przed 12. rokiem życia jest obligatoryjne?',
        ['ADHD jest schorzeniem neurorozwojowym trwającym od dzieciństwa; nie może pojawić się po raz pierwszy de novo u dorosłego', 'Jest to bezwzględny wymóg diagnostyczny w kryteriach DSM-5-TR i ICD-11.'],
        ['Wymóg ten ma charakter wyłącznie statystyczny dla celów ubezpieczeniowych', 'Jest to kryterium biologiczne definiujące neurorozwojowy charakter zaburzenia.'],
      ],
      [
        'Po wykluczeniu depresji i ChAD potwierdzono utrzymywanie się deficytów uwagi w pracy i w domu.',
        'Jakie jest rozpoznanie kliniczne?',
        ['ADHD u dorosłych (zespół nadpobudliwości psychoruchowej z deficytem uwagi z przewagą zaburzeń koncentracji)', 'Obecne objawy nieuwagi i wewnętrznego niepokoju trwające od dzieciństwa.'],
        ['Zaburzenie osobowości antyspołecznej', 'Brak cech agresji, łamania praw innych i lekceważenia norm prawnych.'],
      ],
      [
        'Pacjent kwalifikuje się do wdrożenia farmakoterapii celowanej.',
        'Jaki lek stanowi I rzut farmakoterapii ADHD u dorosłych wg wytycznych NICE i WFSBP?',
        ['Psychostymulant: metylofenidat w formulacji o przedłużonym uwalnianiu (CR/OROS)', 'Metylofenidat blokuje DAT i NET w korze przedczołowej, cechując się najwyższą siłą efektu terapeutycznego.'],
        ['Haloperydol w kroplach doustnych', 'Haloperydol blokuje dopaminę i drastycznie pogorszyłby deficyty uwagi pacjenta.'],
      ],
    ]
  ),
  make(
    'zaburzenia-osobowosci-wymiarowe',
    'Labilność emocjonalna i panika przed samotnością',
    'Kobieta, 23 lata',
    'Podstawowy',
    'Studentka trafia do izby przyjęć po powierzchownych nacięciach przedramion wykonanych po tym, jak partner nie odpisał na jej wiadomość przez 2 godziny.',
    [
      [
        'W wywiadzie: burzliwe relacje, skrajne idealizowanie ludzi na zmianę z ich dewaluacją (rozszczepienie), chroniczne poczucie pustki wewnętrznej i lęk przed odrzuceniem.',
        'Który wzorzec osobowości odpowiada temu obrazowi klinicznemu?',
        ['Wzorzec osobowości z pogranicza (Borderline pattern wg ICD-11 / DSM-5-TR)', 'Niestabilność afektu, tożsamości, relacji i zachowania parasuicydalne to cechy osiowe BPD.'],
        ['Osobowość anankastyczna (obsesyjno-kompulsyjna)', 'Osobowość anankastyczna cechuje się sztywnością, chłodem emocjonalnym i dążeniem do porządku, a nie labilnością.'],
      ],
      [
        'W badaniach laboratoryjnych morfologia, elektrolity i EKG w normie. Rany zaopatrzone chirurgicznie.',
        'Jak należy traktować zachowania samouszkadzające (samookaleczenia) u pacjentki z BPD?',
        ['Jako dysfunkcyjny sposób regulacji skrajnego cierpienia emocjonalnego (bólu psychicznego), wymagający oceny ryzyka suicydalnego', 'Samookaleczenia u osób z BPD często pełnią funkcję doraźnej redukcji dysforii, lecz zwiększają ryzyko zgonu w dłuższej perspektywie.'],
        ['Jako złośliwą manipulację, którą personel powinien ukarać zignorowaniem pacjentki', 'Taka postawa personelu jest skrajnie nieetyczna i potęguje kryzys suicydalny.'],
      ],
      [
        'U pacjentki wykluczono obecność epizodu manii i psychozy.',
        'Jak brzmi rozpoznanie wg modelu wymiarowego ICD-11?',
        ['Zaburzenie osobowości o nasileniu umiarkowanym z domeną negatywnej afektywności i odhamowania oraz wzorcem z pogranicza (Borderline)', 'ICD-11 precyzyjnie łączy stopień dysfunkcji z domenami cech i wzorcem specyficznym.'],
        ['Schizofrenia paranoidalna o późnym początku', 'Brak jakichkolwiek objawów psychotycznych i rozpadu toku myślenia.'],
      ],
      [
        'Pacjentka i rodzina pytają o najskuteczniejszą formę trwałej pomocy.',
        'Jaka interwencja stanowi złoty standard leczenia zaburzenia osobowości z pogranicza?',
        ['Terapia dialektyczno-behawioralna (DBT) lub terapia oparta na mentalizacji (MBT)', 'Psychoterapie celowane w regulację emocji i tolerancję dystresu wykazują najwyższą skuteczność w BPD.'],
        ['Wieloletnia polipragmazja czterema neuroleptykami w maksymalnych dawkach', 'Leki w BPD pełnią jedynie funkcję pomocniczą w kryzysach, nie leczą zaburzenia osobowości.'],
      ],
    ]
  ),
  make(
    'diagnostyka-roznicowa-algorytmy',
    'Ostra psychoza u młodej kobiety z gorączką',
    'Kobieta, 22 lata',
    'Zaawansowany',
    'Studentka filologii bez wcześniejszego wywiadu psychiatrycznego zostaje przywieziona przez pogotowie z powodu nagłego pobudzenia, omamów wzrokowych i mutyzmu.',
    [
      [
        'W izbie przyjęć pacjentka ma stan podgorączkowy 38,1°C, tachykardię 118/min, przymusowe mimowolne ruchy języka i warg (dyskinezy orofacjalne) oraz zmienny poziom kontaktu.',
        'Które cechy obrazu klinicznego stanowią tzw. "czerwone flagi" organicznego tła psychozy?',
        ['Gorączka, nagły początek, dyskinezy ustno-twarzowe u pacjentki dotąd nieleczonej neuroleptykiem oraz fluktuacje świadomości', 'Cechy te jednoznacznie wskazują na ostre organiczne zapalenie mózgowia, a nie pierwotną schizofrenię.'],
        ['Młody wiek pacjentki', 'Wiek 22 lata jest typowy dla psychoz, to obecność dyskinez i objawów somatycznych stanowi czerwoną flagę.'],
      ],
      [
        'W badaniu płynu mózgowo-rdzeniowego stwierdzono pleocytozę limfocytarną i podwyższone stężenie białka. Zlecono panel przeciwciał neuronalnych.',
        'Obecność jakich przeciwciał w surowicy lub PMR wyjaśnia ten obraz kliniczny?',
        ['Przeciwciała przeciwko receptorom NMDA (anty-NMDAR)', 'Autoimmunologiczne zapalenie mózgu z przeciwciałami anty-NMDAR typowo manifestuje się ostrą psychozą i dyskinezami u młodych kobiet.'],
        ['Przeciwciała przeciwko tyreoperoksydazie (anty-TPO)', 'Anty-TPO wiążą się z chorobą Hashimoto, rzadko dając tak burzliwe ostre zapalenie z dyskinezami.'],
      ],
      [
        'W wykonanym pilnie USG miednicy mniejszej uwidoczniono potworniaka dojrzałego (teratoma) prawego jajnika.',
        'Jakie jest ostateczne rozpoznanie przyczynowe?',
        ['Autoimmunologiczne zapalenie mózgu z przeciwciałami anty-NMDAR w przebiegu paranowotworowym (potworniak jajnika)', 'Komórki potworniaka zawierają tkankę nerwową prezentującą receptory NMDA, indukując odpowiedź autoimmunologiczną.'],
        ['Schizofrenia hebefreniczna powikłana zapaleniem wyrostka robaczkowego', 'Jest to błędna diagnoza ignorująca przyczynowy związek potworniaka z przeciwciałami anty-NMDAR.'],
      ],
      [
        'Zespół kliniczny planuje pilne postępowanie terapeutyczne.',
        'Jakie leczenie jest postępowaniem z wyboru ratującym życie pacjentki?',
        ['Pilna resekcja chirurgiczna potworniaka jajnika połączona z intensywną immunoterapią (metyloprednizolon i.v., plazmafereza lub IVIG)', 'Usunięcie źródła antygenu w połączeniu z usunięciem krążących przeciwciał prowadzi do pełnego wyleczenia u większości pacjentek.'],
        ['Długoterminowa terapia haloperydolem w monolicie w szpitalu psychiatrycznym', 'Neuroleptyki są przeciwwskazane lub nieskuteczne, a brak immunoterapii grozi zgonem pacjentki.'],
      ],
    ]
  ),
];
