import type { ClinicalCase } from './cases-psychiatry-builder.ts';
import { makeFlexibleCase } from './cases-psychiatry-builder.ts';

export const psychiatryCasesPart2: ClinicalCase[] = [
  // 13. Rotacja antydepresantów (Cross-tapering wg BAP)
  makeFlexibleCase(
    'zamiana-lekow-switching-cross-tapering',
    'Bezpieczna zamiana leku po braku remisji',
    'Beata K., 42 lata',
    'Podstawowy',
    'Pacjentka leczona z powodu nawracającej depresji nie osiągnęła poprawy po 8 tygodniach przyjmowania sertraliny w pełnej dawce 150 mg/d. Planowana jest rotacja na wenlafaksynę.',
    [
      {
        stage: 'Kwalifikacja do zamiany (Switching)',
        context: 'Beata nie ma cech poprawy w skali MADRS (<20% redukcji objawów), tolerancja sertraliny była dobra.',
        prompt: 'Jaki protokół zamiany leków (switching) jest zalecany przez British Association for Psychopharmacology (BAP) przy przejściu z SSRI na SNRI?',
        choices: [
          ['Stopniowa zamiana krzyżowa (cross-tapering): powolna redukcja sertraliny z jednoczesnym powolnym wprowadzaniem wenlafaksyny przez 1–2 tygodnie', 'Cross-tapering minimalizuje ryzyko zespołu odstawiennego (FINISH) oraz nawrotu objawów depresyjnych w okresie przejściowym.'],
          ['Natychmiastowe odstawienie sertraliny i 4-tygodniowy okres wymywania (washout) bez żadnego leku', 'Długi washout przy braku MAOI nie ma uzasadnienia i naraża pacjentkę na ciężki nawrót depresji.'],
          ['Gwałtowne dołączenie maksymalnej dawki wenlafaksyny (225 mg) bez zmniejszania sertraliny', 'Takie postępowanie stwarza ryzyko zespołu serotoninowego i gwałtownych nudności.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Profilaktyka zespołu odstawiennego (FINISH)',
        context: 'Pacjentka pyta o objawy, które mogą pojawić się przy zbyt szybkiej redukcji sertraliny.',
        prompt: 'Które objawy wchodzą w skład zespołu dyskontynuacji leków serotoninergicznych (akronim FINISH)?',
        choices: [
          ['Objawy grypopodobne, bezsenność, nudności, zaburzenia równowagi, parestezje („uczucie wyładowań prądu w głowie”) i nadpobudliwość', 'Są to typowe przejściowe objawy spadku stężenia serotoniny w synapsach, często mylone z nawrotem depresji.'],
          ['Złośliwy zespół neuroleptyczny ze sztywnością i hipertermią', 'NMS wiąże się z blokadą receptorów D2 w OUN, a nie z odstawieniem leków serotoninergicznych.'],
          ['Maniakalne pobudzenie psychoruchowe z urojeniami wielkościowymi', 'Pobudzenie maniakalne jest odrębnym stanem afektywnym, a nie typową składową somatycznego zespołu FINISH.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Monitorowanie ciśnienia tętniczego na SNRI',
        context: 'Wenlafaksyna została pomyślnie zmiareczkowana do dawki 150 mg/d.',
        prompt: 'Jaki parametr somatyczny wymaga szczególnego monitorowania przy dawkach wenlafaksyny ≥150 mg/d ze względu na modulację noradrenergiczną?',
        choices: [
          ['Ciśnienie tętnicze krwi (ryzyko nadciśnienia tętniczego zależnego od dawki przez hamowanie transportera NET)', 'W wyższych dawkach wenlafaksyna hamuje wychwyt noradrenaliny, co może podnosić opór naczyniowy i ciśnienie rozkurczowe.'],
          ['Glikemię na czczo i HbA1c', 'Chociaż leki psychotropowe mogą wpływać na metabolizm, bezpośrednim i zależnym od dawki powikłaniem wyższych dawek wenlafaksyny jest wzrost ciśnienia tętniczego.'],
          ['Czas protrombinowy (INR) przy braku antykoagulantów', 'Wenlafaksyna nie wpływa na syntezę czynników krzepnięcia zależnych od witaminy K.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Ocena remisji po zamianie leku',
        context: 'Po 6 tygodniach na dawce 150 mg/d wenlafaksyny wynik w skali MADRS spadł z 28 do 7 punktów.',
        prompt: 'Jak zaklasyfikować ten wynik kliniczny?',
        choices: [
          ['Pełna remisja kliniczna (objawy wygaszone, powrót do prawidłowego funkcjonowania społeczno-zawodowego)', 'Wynik MADRS ≤10 punktów jest międzynarodowym standardem definiującym remisję.'],
          ['Częściowa odpowiedź terapeutyczna wymagająca augmentacji litem', 'Spadek MADRS do ≤10 punktów oznacza pełną remisję objawową, a nie zaledwie częściową odpowiedź.'],
          ['Konieczność natychmiastowego odstawienia leku z powodu wyleczenia', 'Przedwczesne odstawienie po uzyskaniu remisji grozi szybkim nawrotem; leczenie podtrzymujące powinno trwać min. 6–12 miesięcy.'],
        ],
        answerIndex: 0,
      },
    ]
  ),

  // 14. Lit intoksykacja - Kontynuacja Wątku A (Dorota K., 26 lat)
  makeFlexibleCase(
    'normotymiki-lit-walproinian-lamotrygina',
    'Zatrucie litem po ketoprofenie i odwodnieniu (Wątek A)',
    'Dorota K., 26 lat',
    'Zaawansowany',
    'Pacjentka leczona litem (750 mg/d w stanie stacjonarnym z poziomem 0,70 mmol/l) zgłasza się z powodu grubofalistego drżenia rąk, nudności, wymiotów i zaburzeń równowagi (ataksji).',
    [
      {
        stage: 'Weryfikacja wywiadu i czynników wyzwalających',
        context: 'W wywiadzie: Dorota 4 dni temu skręciła staw skokowy i z powodu bólu przyjmowała ketoprofen 200 mg/d, a z powodu upałów piła mało płynów.',
        prompt: 'Jaki mechanizm odpowiada za dekompensację stężenia litu po włączeniu NLPZ?',
        choices: [
          ['NLPZ hamują nerkową syntezę prostaglandyn rozszerzających naczynia, obniżając GFR i nasilając wchłanianie zwrotne litu w cewce bliższej', 'Połączenie NLPZ lub tiazydów z odwodnieniem gwałtownie załamuje klirens litu i prowadzi do ostrej intoksykacji.'],
          ['NLPZ bezpośrednio wypierają lit z połączeń z albuminami osocza', 'Lit nie wiąże się z białkami osocza; krąży wyłącznie w postaci wolnego kationu Li+.'],
          ['Ketoprofen jest inhibitorem enzymu rozkładającego cząsteczki litu w wątrobie', 'Lit jest pierwiastkiem chemicznym i nie podlega metabolizmowi wątrobowemu; jest wydalany w 95% przez nerki.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Ocena laboratoryjna TDM litu',
        context: 'Pobrano krew ściśle 12 h po dawce wieczornej. Wynik: stężenie litu 1,85 mmol/l, kreatynina 1,4 mg/dl (wcześniej 0,8), eGFR spadł do 52 ml/min.',
        prompt: 'Jak zaklasyfikować to stężenie wg kryteriów konsensusu AGNP TDM?',
        choices: [
          ['Ciężka toksyczność litu (stężenie >1,2 mmol/l z objawami neurologicznymi) wymagająca natychmiastowej hospitalizacji i forsowanego nawadniania i.v.', 'Stężenia zbliżające się do 2,0 mmol/l niosą ryzyko trwałego uszkodzenia móżdżku (zespół SILENT) i ostrego uszkodzenia nerek.'],
          ['Prawidłowe stężenie podtrzymujące w fazie ostrej manii', 'Zakres podtrzymujący to 0,6–0,8 mmol/l; 1,85 mmol/l jest stężeniem jednoznacznie toksycznym.'],
          ['Błąd laboratoryjny niemający znaczenia klinicznego przy braku śpiączki', 'Objawy ataksji i drżenia w pełni korelują z poziomem laboratoryjnym i nakazują natychmiastowe działanie.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Natychmiastowe postępowanie ratunkowe',
        context: 'Dorota trafia na oddział internistyczny/toksykologiczny.',
        prompt: 'Jakie jest postępowanie pierwszego wyboru w umiarkowanej/ciężkiej intoksykacji litem przy wydolnym układzie krążenia?',
        choices: [
          ['Natychmiastowe odstawienie litu i NLPZ, intensywne nawadnianie dożylne 0,9% NaCl (celem przywrócenia wolemii i natriurezy) oraz kontrola diurezy', 'Sód zawarty w 0,9% NaCl konkuruje z litem o nośniki w kanalikach proksymalnych, nasilając nerkowe wydalanie litu.'],
          ['Podanie węgla aktywowanego doustnie', 'Węgiel aktywowany NIE wiąże metali ani jonów nieorganicznych takich jak lit.'],
          ['Wdrożenie leków moczopędnych tiazydowych celem wypłukania leku', 'Tiazydy paradoksalnie ZWIĘKSZAJĄ stężenie litu i pogłębiłyby zatrucie.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Kryteria kwalifikacji do hemodializy',
        context: 'Klinicysta monitoruje parametry nerkowe i neurologiczne pacjentki.',
        prompt: 'Kiedy w zatruciu litem bezwzględnie konieczna jest pilna hemodializa?',
        choices: [
          ['Przy stężeniu litu >4,0 mmol/l (niezależnie od objawów) LUB >2,5 mmol/l przy obecności ciężkich objawów neurotoksyczności, bezmoczu lub załamaniu GFR', 'Hemodializa jest najskuteczniejszą metodą szybkiej eliminacji małej, rozpuszczalnej w wodzie cząsteczki litu z osocza.'],
          ['Zawsze, gdy stężenie przekroczy 0,9 mmol/l', 'Stężenie 0,9 mmol/l wymaga jedynie korekty dawki i obserwacji, nie dializoterapii.'],
          ['Dopiero po wystąpieniu zatrzymania krążenia lub głębokiej śpiączki bez względu na stężenie litu', 'Kwalifikacja do hemodializy opiera się na stężeniu litu i wczesnych objawach neurotoksyczności (EXTRIP), nie czekając na załamanie parametrów krążeniowo-oddechowych.'],
        ],
        answerIndex: 0,
      },
    ],
    { threadId: 'thread-bipolar-spectrum', timeOffsetWeeks: 40 }
  ),

  // 15. Zespół serotoninowy - Hunter
  makeFlexibleCase(
    'ostre-stany-toksyczne-zespol-serotoninowy',
    'Klonus i hipertermia po lekach przeciwbólowych',
    'Ewa D., 34 lata',
    'Zaawansowany',
    'Kobieta leczona paroksetyną (40 mg/d) z powodu lęku napadowego zażyła w ciągu ostatnich 12 godzin tramadol (z powodu rwy kulszowej) oraz syrop z dekstrometorfanem.',
    [
      {
        stage: 'Ocena kryteriów Huntera (Hunter Toxicity Criteria)',
        context: 'Ewa jest pobudzona, zlewa się potem (diaphoresis), ma temperaturę ciała 38,7°C, tętno 120/min. Przy zginaniu grzbietowym stopy występuje 8 samoistnych uderzeń klonusu (klonus indukowany), a w gałkach ocznych widoczny jest klonus oczny.',
        prompt: 'Czy obraz kliniczny spełnia zwalidowane kryteria decyzyjne Huntera toksyczności serotoninergicznej?',
        choices: [
          ['Tak, obecność indukowanego klonusu w połączeniu z pobudzeniem i obfitymi potami u pacjenta po lekach proserotoninergicznych spełnia regułę decyzyjną Huntera', 'Kryteria Huntera cechują się 84% czułością i 97% swoistością; klonus i hipertermia są kluczowymi determinantami.'],
          ['Nie, do rozpoznania wymagana jest obecność sztywności typu „ołowianej rury” i hiporefleksja', 'Sztywność „ołowianej rury” i hiporefleksja są cechami złośliwego zespołu neuroleptycznego (NMS), a nie zespołu serotoninowego.'],
          ['Nie, zespół serotoninowy można rozpoznać wyłącznie po badaniu stężenia serotoniny we krwi w trybie cito', 'Poziom serotoniny w osoczu nie koreluje z neuroprzekaźnictwem w OUN i nie ma wartości diagnostycznej.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Różnicowanie z neuroleptycznym zespołem złośliwym (NMS)',
        context: 'Lekarz dyżurny waha się między zespołem serotoninowym a NMS.',
        prompt: 'Które cechy badania neurologicznego najsilniej odróżniają zespół serotoninowy od NMS?',
        choices: [
          ['W zespole serotoninowym występuje hiperrefleksja, klonus i wzmożona perystaltyka jelit (biegunka), podczas gdy w NMS dominuje skrajna sztywność mięśniowa i hiporefleksja', 'Profil nerwowo-mięśniowy w zespole serotoninowym cechuje się nadpobudliwością i klonusem (szczególnie w kończynach dolnych).'],
          ['W zespole serotoninowym nigdy nie występuje tachykardia ani gorączka', 'W ciężkim zespole serotoninowym hipertermia może przekraczać 40°C i prowadzić do rabdomiolizy.'],
          ['NMS rozwija się w ciągu 30 minut, a zespół serotoninowy wymaga 4 tygodni', 'Jest odwrotnie: zespół serotoninowy narasta gwałtownie (godziny), a NMS rozwija się zazwyczaj podstępnie przez kilka dni.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Postępowanie terapeutyczne w stanie zagrożenia życia',
        context: 'Temperatura ciała rośnie do 39,2°C, narasta sztywność klatki piersiowej utrudniająca wentylację.',
        prompt: 'Jaki jest priorytet postępowania ratunkowego w ciężkiej toksyczności serotoninergicznej?',
        choices: [
          ['Odstawienie leków, agresywne chłodzenie fizykalne, dożylne benzodiazepiny w celu opanowania pobudzenia i mioklonii oraz w ciężkich przypadkach intubacja z relaksacją niedepolaryzującą', 'Sedacja benzodiazepinami obniża napięcie mięśniowe i zapobiega produkcji ciepła; lekiem wspomagającym może być cyproheptadyna.'],
          ['Podanie paracetamolu w wysokiej dawce w celu zresetowania ośrodka termoregulacji', 'Gorączka w zespole serotoninowym wynika z obwodowej aktywności mięśniowej, a nie z przestawienia punktu nastawczego w podwzgórzu (leki przeciwgorączkowe są nieskuteczne).'],
          ['Podanie propranololu w bolusie i.v.', 'Blokada receptorów beta może pogłębić hipotensję i maskować wstrząs bez wpływu na pobudzenie 5-HT.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Farmakologiczna modulacja receptorowa',
        context: 'Rozważasz podanie swoistego antagonisty receptorów 5-HT2A.',
        prompt: 'Jaki lek o działaniu przeciwhistaminowym i antyserotoninergicznym może być zastosowany jako leczenie wspomagające?',
        choices: [
          ['Cyproheptadyna podana dożołądkowo przez zgłębnik', 'Cyproheptadyna blokuje receptory 5-HT2A i może skrócić czas trwania objawów u pacjentów z umiarkowaną/ciężką toksycznością.'],
          ['Flumazenil we wlewie ciągłym', 'Flumazenil jest antagonistą benzodiazepin i mógłby wywołać drgawki.'],
          ['Nalokson w dużej dawce', 'Nalokson odwraca działanie opioidów, lecz nie hamuje kaskady serotoninergicznej wywołanej SSRI.'],
        ],
        answerIndex: 0,
      },
    ]
  ),

  // 16. NMS
  makeFlexibleCase(
    'zlosliwy-zespol-neuroleptyczny-nms',
    'Sztywność ołowianej rury i wysoka kinaza po haloperydolu',
    'Marek W., 40 lat',
    'Zaawansowany',
    'Mężczyzna leczony z powodu ostrej psychozy haloperydolem (15 mg/d) po 4 dniach staje się mutystyczny, leży w łóżku w pozycji zgięciowej, gorączkuje do 39,5°C i obficie się poci.',
    [
      {
        stage: 'Ocena objawów osiowych NMS (Kryteria Levensona/Caroffa)',
        context: 'W badaniu neurologicznym: uogólniony opór plastyczny mięśni we wszystkich kończynach („ołowiana rura”), tachykardia 130/min, niestabilne ciśnienie tętnicze (skoki 180/110 i spadki do 100/60 mmHg), zniesione odruchy głębokie.',
        prompt: 'Jakie rozpoznanie kliniczne wyjaśnia ten ostry stan?',
        choices: [
          ['Złośliwy zespół neuroleptyczny (NMS - Neuroleptic Malignant Syndrome) wywołany blokadą dopaminergiczną', 'Triada: hipertermia, uogólniona sztywność mięśniowa i niestabilność autonomiczna po neuroleptyku to definicja NMS.'],
          ['Ostra dystonia krtaniowa', 'Dystonia dotyczy izolowanej grupy mięśni i nie przebiega z hipertermią oraz niestabilnością krążeniową.'],
          ['Złośliwa hipertermia (MH)', 'Złośliwa hipertermia występuje po halogenowych anestetykach wziewnych lub suksametonium na sali operacyjnej, a nie po haloperidolu na oddziale psychiatrycznym.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Badania laboratoryjne i powikłania narządowe',
        context: 'Pobrano krew na badania pilne.',
        prompt: 'Który parametr laboratoryjny jest kluczowym markerem rozpadu mięśni i monitorowania ciężkości NMS?',
        choices: [
          ['Aktywność kinazy kreatynowej (CK > 1000 IU/l, często >10 000 IU/l) oraz leukocytoza i parametry funkcji nerek', 'Masywny wzrost CK świadczy o rabdomiolizie, która grozi wytrąceniem mioglobiny w cewkach nerkowych i ostrą niewydolnością nerek.'],
          ['Stężenie troponiny sercowej w monoterapii', 'Chociaż tachykardia towarzyszy NMS, to kinaza kreatynowa (CK) odzwierciedla uogólniony rozpad mięśni poprzecznie prążkowanych i ryzyko ostrej niewydolności nerek.'],
          ['Wskaźnik retikulocytozy i odczyn Coombsa', 'Parametry hemolityczne nie są swoistymi markerami uszkodzenia mięśni w przebiegu NMS.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Interwencja farmakologiczna w NMS',
        context: 'Haloperydol został natychmiast odstawiony, wdrożono intensywne nawadnianie krystaloidami.',
        prompt: 'Które leki o działaniu zwiotczającym mięśnie lub dopaminergicznym są stosowane w celowanej terapii NMS?',
        choices: [
          ['Dantrolen (lek blokujący uwalnianie wapnia z siateczki sarkoplazmatycznej) oraz bromokryptyna (agonista receptorów dopaminowych)', 'Dantrolen redukuje hipertermię wywołaną skurczem mięśni, a bromokryptyna przełamuje blokadę dopaminergiczną w podwzgórzu i prążkowiu.'],
          ['Suksametonium (sukcynylocholina) w celu natychmiastowego zwiotczenia mięśni', 'Sukcynylocholina jest depolaryzującym środkiem zwiotczającym przeciwwskazanym przy rabdomiolizie z powodu ryzyka śmiertelnej hiperkaliemii i zatrzymania krążenia.'],
          ['Propranolol i amiodaron we wlewie ciągłym', 'Leki antyarytmiczne nie leczą pierwotnej blokady dopaminergicznej ani rabdomiolizy w NMS i mogą pogłębić niestabilność hemodynamiczną.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Powrót do leczenia przeciwpsychotycznego po przebyciu NMS',
        context: 'Marek wyzdrowiał po 2 tygodniach leczenia na OIT. Psychoza ulega zaostrzeniu.',
        prompt: 'Jakie są zasady bezpiecznego ponownego włączenia leku przeciwpsychotycznego po przebyciu NMS?',
        choices: [
          ['Odczekanie minimum 2 tygodni od pełnej normalizacji CK i objawów, wybór leku o słabym powinowactwie do D2 (np. kwetiapina, klozapina) i powolne miareczkowanie', 'Należy bezwzględnie unikać powrotu do silnego FGA (jak haloperidol) i monitorować temperaturę oraz CK na każdym etapie.'],
          ['Natychmiastowe podanie haloperydolu w tej samej dawce następnego dnia po wypisie', 'Ryzyko nawrotu NMS wynosi wówczas ponad 50% i zagraża życiu.'],
          ['Dożywotni zakaz stosowania jakichkolwiek leków przeciwpsychotycznych nawet w psychozie zagrażającej życiu', 'Możliwe jest ostrożne leczenie lekiem SGA o niskiej sile blokady D2 po ustąpieniu stanu ostrego.'],
        ],
        answerIndex: 0,
      },
    ]
  ),

  // 17. Klozapina - Kontynuacja Wątku B (Jakub M., lekooporność i TRS)
  makeFlexibleCase(
    'lekoopornosc-i-klozapina',
    'Lek z wyboru w lekooporności schizofrenii i nadzór nad szpikiem (Wątek B)',
    'Jakub M., 22 lata',
    'Zaawansowany',
    'Jakub nie uzyskał poprawy po dwóch kolejnych kuracjach atypowymi neuroleptykami (risperidon 6 mg/d przez 8 tyg., następnie olanzapina 20 mg/d przez 10 tyg.). Nadal doświadcza uporczywych omamów słuchowych i urojeń ksobnych.',
    [
      {
        stage: 'Kwalifikacja do schizofrenii lekoopornej (TRS)',
        context: 'Zarówno risperidon, jak i olanzapina były przyjmowane regularnie (potwierdzona wysoka adherencja). Wynik w skali PANSS wynosi 98 punktów.',
        prompt: 'Czy pacjent spełnia międzynarodowe kryteria schizofrenii lekoopornej (Treatment-Resistant Schizophrenia - TRS wg kryteriów Kane\'a / TRRIP)?',
        choices: [
          ['Tak, brak adekwatnej odpowiedzi na co najmniej dwa różne leki przeciwpsychotyczne (w tym min. jeden SGA) stosowane w dawkach terapeutycznych przez co najmniej 6 tygodni definiuje TRS', 'Kwalifikacja TRS upoważnia do natychmiastowego wdrożenia klozapiny jako leku o unikalnej, udowodnionej skuteczności.'],
          ['Nie, wymagane jest wypróbowanie co najmniej 6 różnych leków przez okres 5 lat', 'Zbyt długie opóźnianie włączenia klozapiny prowadzi do nieodwracalnego spadku plastyczności neuronalnej i utrwalenia objawów ubytkowych.'],
          ['Nie, lekooporność można orzec dopiero po braku remisji po pełnym cyklu 12 zabiegów elektrowstrząsowych (ECT)', 'Kryteria lekooporności (TRS) oparte są na braku odpowiedzi na dwa leki przeciwpsychotyczne w adekwatnej dawce i czasie; ECT nie jest warunkiem wstępnym włączenia klozapiny.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Wymogi bezpieczeństwa hematologicznego (ANC)',
        context: 'Przed włączeniem klozapiny Jakub ma wykonaną morfologię krwi.',
        prompt: 'Jaki parametr morfologii i o jakiej minimalnej wartości bezwzględnej warunkuje bezpieczne rozpoczęcie leczenia klozapiną?',
        choices: [
          ['Bezwzględna liczba granulocytów obojętnochłonnych (ANC) ≥ 1500/µl (lub ≥ 1000/µl u osób z łagodną neutropenią etniczną BEN)', 'Klozapina niesie ryzyko agranulocytozy (~0,8%), dlatego terapia wymaga ścisłego monitorowania ANC: co tydzień przez pierwsze 18 tygodni, następnie co 4 tygodnie.'],
          ['Liczba płytek krwi > 500 000/µl', 'Trombocyty nie są głównym celem toksyczności szpikowej klozapiny.'],
          ['Stężenie hemoglobiny > 16 g/dl', 'Norma czerwonokrwinkowa nie definiuje bezpieczeństwa agranulocytarnego.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Wpływ palenia tytoniu na farmakokinetykę klozapiny (CYP1A2)',
        context: 'Jakub wypala paczkę papierosów dziennie (20 sztuk/d). Planuje rzucenie palenia.',
        prompt: 'Co stanie się ze stężeniem klozapiny w surowicy po nagłym zaprzestaniu palenia tytoniu przez Jakuba?',
        choices: [
          ['Stężenie klozapiny może istotnie wzrosnąć (w literaturze opisywano wzrosty o 50–100%) z powodu ustąpienia indukcji izoenzymu CYP1A2 przez węglowodory dymu tytoniowego', 'Wymaga to prewencyjnej redukcji dawki klozapiny, monitorowania objawów i kontroli stężenia TDM, aby zapobiec intoksykacji i sedacji.'],
          ['Stężenie klozapiny natychmiast spadnie do zera', 'Dym tytoniowy indukuje klirens; jego brak spowalnia eliminację leku.'],
          ['Zaprzestanie palenia nie ma żadnego wpływu na metabolizm wątrobowy klozapiny', 'CYP1A2 jest głównym szlakiem eliminacji klozapiny, silnie zależnym od dymu tytoniowego.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Zapobieganie powikłaniom żołądkowo-jelitowym',
        context: 'Klozapina wykazuje silne działanie antycholinergiczne i przeciwserotoninowe na perystaltykę przewodu pokarmowego.',
        prompt: 'Które działanie niepożądane klozapiny jest statystycznie częstszą przyczyną zgonu niż agranulocytoza i wymaga aktywnej profilaktyki przeczyszczającej?',
        choices: [
          ['Ciężkie zaparcie prowadzące do niedrożności porażennej jelit (hipomotoryczność przewodu pokarmowego)', 'Niedrożność jelit wywołana klozapiną niesie wysoką śmiertelność z powodu martwicy i perforacji; wymaga rutynowej oceny wypróżnień i leków osmotycznych (makrogole).'],
          ['Ostre krwawienie z wrzodu żołądka', 'Klozapina nie wykazuje działania wrzodotwórczego w mechanizmie typowym dla NLPZ.'],
          ['Kamica pęcherzyka żółciowego', 'Kamica żółciowa nie jest typowym bezpośrednim powikłaniem klozapiny.'],
        ],
        answerIndex: 0,
      },
    ],
    { threadId: 'thread-psychosis-trs', timeOffsetWeeks: 48 }
  ),

  // 18. Akatyzja na arypiprazolu
  makeFlexibleCase(
    'zaburzenia-ruchowe-polekowe-eps-dysdyskinezy',
    'Uporczywy niepokój ruchowy po częściowym agoniście',
    'Damian R., 27 lat',
    'Zaawansowany',
    'Pacjent z rozpoznaniem schizofrenii po włączeniu arypiprazolu w dawce 15 mg/d zgłasza, że „nie może znaleźć sobie miejsca”, ciągle przestępuje z nogi na nogę i czuje wewnętrzny przymus chodzenia.',
    [
      {
        stage: 'Identyfikacja akatyzacji vs pobudzenie psychotyczne',
        context: 'W badaniu: Damian nieustannie maszeruje po gabinecie, siada na kilka sekund i natychmiast wstaje. Nie ma nasilenia omamów ani urojeń, odczuwa natomiast potworny dyskomfort wewnętrzny.',
        prompt: 'Jakie zaburzenie ruchowe polekowe prezentuje pacjent?',
        choices: [
          ['Akatyzja polekowa (subiektywne poczucie niepokoju ruchowego połączone z obiektywną ruchliwością kończyn dolnych)', 'Akatyzja jest częstym wczesnym działaniem niepożądanym częściowych agonistów D2 i silnych antagonistów D2.'],
          ['Późne dyskinezy (tardive dyskinesia)', 'Późne dyskinezy rozwijają się po wielu miesiącach/latach leczenia i cechują się mimowolnymi ruchami choreiformnymi, zazwyczaj bez subiektywnego przymusu.'],
          ['Katatonia z pobudzeniem', 'W katatonii pobudzenie ma charakter bezcelowy, chaotyczny i towarzyszą mu inne cechy (echolalia, stereotypie, negatywizm).'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Ryzyko kliniczne nieleczonej akatyzacji',
        context: 'Pacjent mówi lekarzowi: „Jeśli to uczucie nie minie, chyba wyskoczę przez okno”.',
        prompt: 'Z jakim poważnym ryzykiem klinicznym wiąże się nierozpoznana lub zlekceważona akatyzja polekowa?',
        choices: [
          ['Gwałtowny wzrost ryzyka impulsywnych zachowań samobójczych i agresywnych oraz porzucenie leczenia', 'Nieznośny dyskomfort psychoruchowy w akatyzacji jest udokumentowanym czynnikiem ryzyka nagłych prób samobójczych.'],
          ['Rozwój zespołu parkinsonowskiego z drżeniem spoczynkowym', 'Akatyzja i parkinsonizm to odrębne zespoły pozapiramidowe, choć mogą współistnieć; najgroźniejszym bezpośrednim ryzykiem silnej akatyzacji są gwałtowne zachowania autodestrukcyjne.'],
          ['Zaostrzenie objawów wytwórczych psychozy', 'Akatyzja jest zaburzeniem ruchowym z komponentem dysforii, choć jej błędne zinterpretowanie jako lęku psychotycznego grozi nieuzasadnionym podniesieniem dawki neuroleptyku.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Farmakoterapia I rzutu w akatyzacji',
        context: 'Należy szybko przynieść ulgę pacjentowi i zredukować napięcie ruchowe.',
        prompt: 'Jaki lek stanowi farmakoterapię I wyboru w ostrej akatyzacji polekowej wg wytycznych Maudsley?',
        choices: [
          ['Lipofilny beta-adrenolityk (propranolol w dawce 20–40 mg/d) lub krótkoterminowo mała dawka benzodiazepiny', 'Propranolol blokuje ośrodkowe i obwodowe receptory beta-adrenergiczne, skutecznie redukując akatyzję u większości chorych.'],
          ['Podwojenie dawki neuroleptyku wywołującego objaw', 'Zwiększenie dawki neuroleptyku dramatycznie zaostrzy akatyzję.'],
          ['Włączenie leku przeciwdepresyjnego z grupy SSRI w wysokiej dawce', 'Leki serotoninergiczne nie są leczeniem z wyboru w ostrej akatyzacji i w początkowym okresie mogą nawet nasilić niepokój ruchowy.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Optymalizacja schematu przeciwpsychotycznego',
        context: 'Po ustąpieniu ostrego epizodu rozważasz długofalowy plan leczenia Damiana.',
        prompt: 'Jakie działanie w zakresie dawkowania arypiprazolu jest uzasadnione, jeśli akatyzja ma tendencję do nawracania?',
        choices: [
          ['Zmniejszenie dawki arypiprazolu (np. do 10 mg/d) lub wolniejsze miareczkowanie, a w razie braku tolerancji zamiana na lek o minimalnym potencjale akatyzacji (np. kwetiapina)', 'Wielu pacjentów toleruje arypiprazol w niższej dawce, zachowując kontrolę przeciwpsychotyczną bez akatyzacji.'],
          ['Natychmiastowe przejście na dożylny haloperidol', 'Haloperidol wykazuje jeszcze wyższy potencjał wywoływania akatyzacji i parkinsonizmu.'],
          ['Wstrzymanie leczenia bez żadnej obserwacji', 'Brak leczenia przeciwpsychotycznego u pacjenta ze schizofrenią prowadzi do nawrotu psychozy.'],
        ],
        answerIndex: 0,
      },
    ]
  ),
];
