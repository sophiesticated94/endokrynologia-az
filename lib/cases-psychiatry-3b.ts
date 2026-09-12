import type { ClinicalCase } from './cases-psychiatry-builder.ts';
import { makeFlexibleCase } from './cases-psychiatry-builder.ts';

export const psychiatryCasesPart3b: ClinicalCase[] = [
  // Przypadek 5: Wątek Marka (Etap 1 - Zmiana osobowości / bvFTD)
  makeFlexibleCase(
    'otepienie-czolowo-skroniowe-bvftd',
    'Późna zmiana osobowości: kryzys czy neurodegeneracja czołowa? (Wątek C - Marek T.)',
    'Marek T., 63 lata',
    'Zaawansowany',
    'Inżynier budownictwa zostaje przyprowadzony na konsultację przez zdesperowaną żonę. Od 2 lat stał się emocjonalnie chłodny, opowiada wulgarne żarty przy wnukach i kompulsywnie wykrada słodycze z szafek.',
    [
      {
        stage: 'Obserwacja i badanie MSE',
        context: 'Marek wchodzi do gabinetu w rozpiętej koszuli, siada z nogami wyciągniętymi na biurko lekarza i żuje gumę. Na pytania odpowiada lekceważąco: „Żona histeryzuje, czuję się świetnie”. Pamięta datę, orientacja allopsychiczna i autopsychiczna bez zarzutu (MMSE 29/30 pkt). Nie wykazuje cienia skruchy, gdy żona wspomina o jego kompromitującym zachowaniu na pogrzebie matki.',
        prompt: 'Która cecha psychopatologiczna jest najbardziej charakterystyczna dla wczesnego stadium wariantu behawioralnego FTD (bvFTD)?',
        choices: [
          ['Głębokie odhamowanie społeczne, utrata empatii i anozognozja (brak wglądu) przy zwodniczo prawidłowych wynikach prostych testów pamięciowych', 'Kora oczodołowo-czołowa odpowiada za takt i empatię; jej pierwotny zanik prowadzi do załamania norm społecznych przy nienaruszonej pamięci hipokampalnej.'],
          ['Ciężkie zaburzenia orientacji w czasie i miejscu z gubieniem się we własnym mieszkaniu', 'Wczesna dezorientacja przestrzenna jest typowa dla choroby Alzheimera, nie bvFTD.'],
          ['Napady paniki z agorafobią i unikaniem wychodzenia z domu', 'Lęk napadowy nie wiąże się z pierwotnym odhamowaniem czołowym.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Diagnostyka różnicowa i pułapki',
        context: 'Przed rokiem psychiatra rozpoznał u Marka „epizod depresyjny z apatią i kryzysem wieku średniego” i włączył escitalopram 10 mg/d, bez jakiejkolwiek poprawy zachowania.',
        prompt: 'Dlaczego u osoby po 55 roku życia z radykalną, nową zmianą charakteru i norm moralnych należy zachować szczególną ostrożność przed rozpoznaniem pierwotnej choroby afektywnej?',
        choices: [
          ['Radykalna zmiana osobowości de novo w wieku dojrzałym bez wcześniejszego wywiadu psychiatrycznego silnie obniża próg podejrzenia procesu organicznego mózgu (np. bvFTD, oponiak płata czołowego)', 'Zaburzenia osobowości i afektu rzadko debiutują po 60 r.ż. jako izolowane jednostki pierwotne; wymagają wykluczenia strukturalnego uszkodzenia płatów czołowych.'],
          ['Ponieważ osoby po 55 r.ż. nigdy nie chorują na depresję ani zaburzenia lękowe', 'Depresja występuje w każdym wieku, lecz nowa zmiana osobowości z brakiem empatii sugeruje proces czołowy.'],
          ['Ponieważ leki z grupy SSRI są w 100% nieskuteczne u mężczyzn', 'Leki SSRI są skuteczne w depresji u obu płci, lecz nie leczą uszkodzenia kory czołowej w FTD.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Neuroobrazowanie i rozpoznanie',
        context: 'Wykonano MRI mózgu, które uwidoczniło wyraźną, asymetryczną atrofię kory czołowo-oczodołowej i biegunów przednich płatów skroniowych. W badaniu neuropsychologicznym stwierdzono głęboką dysfunkcję wykonawczą (błędy w teście Stroopa i teście łączenia punktów TMT-B).',
        prompt: 'Jaka strategia postępowania jest najwłaściwsza dla Marka i jego rodziny?',
        choices: [
          ['Rozpoznanie prawdopodobnego bvFTD wg kryteriów Rascovsky 2011; psychoedukacja rodziny o organicznym podłożu zachowań, zabezpieczenie majątku (ubezwłasnowolnienie/pełnomocnictwo) oraz rozważenie SSRI na impulsywność', 'Świadomość, że bezduszność wynika z neurodegeneracji kory, zmniejsza poczucie winy rodziny; zabezpieczenie kont bankowych chroni przed trwonieniem oszczędności.'],
          ['Wdrożenie przymusowej psychoterapii małżeńskiej w celu nauczenia pacjenta empatii', 'Utrata tkanki kory czołowej uniemożliwia wyuczenie empatii metodami psychoterapii.'],
          ['Włączenie donepezilu w maksymalnej dawce z obietnicą pełnego wyleczenia', 'Inhibitory AChE nie są skuteczne w bvFTD i mogą nasilać drażliwość i odhamowanie.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Analiza kontrfaktyczna',
        context: 'Rozważ alternatywną sytuację u Marka.',
        prompt: 'Gdyby Marek zgłaszał falowanie poziomu przytomności, w nocy toczył walki ze snami (RBD), a w badaniu neurologicznym stwierdzono sztywność plastyczną i drżenie spoczynkowe, na jakie rozpoznanie wskazywałyby te objawy?',
        choices: [
          ['Otępienie z ciałami Lewy’ego (DLB)', 'Triada: RBD, wahania poznawcze i parkinsonizm to kardynalne kryteria DLB, a nie bvFTD.'],
          ['Klasyczny wariant behawioralny FTD', 'RBD i spontaniczny parkinsonizm nie należą do kryteriów osiowych bvFTD.'],
          ['Epizod histeryczny z konwersją ruchową', 'Cechy parkinsonizmu i zaburzenia snu REM są organicznymi biomarkerami synukleinopatii.'],
        ],
        answerIndex: 0,
        counterfactual: {
          alteredFact: 'Obecność RBD, wahań świadomości i sztywności pozapiramidowej zamiast izolowanego odhamowania',
          supports: ['Otępienie z ciałami Lewy’ego (DLB)', 'Synukleinopatia OUN'],
          arguesAgainst: ['Wariant behawioralny FTD jako jedyna przyczyna'],
          mostDiscriminatingNextStep: 'Scyntygrafia DaTscan i badanie polisomnograficzne snu',
          invalidatedManagementSteps: ['Stosowanie leków typowych blokujących D2 (zagrożenie życia w DLB)'],
        },
      },
    ],
  ),

  // Przypadek 6: Przypadek dedykowany (DLB i zagrażająca życiu reakcja na haloperidol)
  makeFlexibleCase(
    'otepienie-z-cialami-lewyego-i-parkinson',
    'Omamy wzrokowe i krytyczna nadwrażliwość na neuroleptyki w DLB',
    'Stanisław K., 74 lata',
    'Zaawansowany',
    'Pacjent ze zdiagnozowanym przed 6 miesiącami łagodnym parkinsonizmem zostaje przywieziony na SOR przez żonę: od kilku tygodni widzi w mieszkaniu postacie obcych ludzi i małych zwierząt, które rozmawiają między sobą.',
    [
      {
        stage: 'Obraz kliniczny i semiotyka halucynacji',
        context: 'Stanisław jest spokojny, opisuje omamy jako barwne, plastyczne i trójwymiarowe. Żona dodaje, że mąż w nocy krzyczy, wymachuje rękami i spada z łóżka, a w ciągu dnia bywają chwile, gdy jest całkowicie logiczny, na przemian z epizodami głębokiego zagapienia.',
        prompt: 'Która cecha omamów w tym przypadku najsilniej różnicuje je od omamów w schizofrenii?',
        choices: [
          ['Obecność dobrze uformowanych, plastycznych omamów wzrokowych na podłożu fluktuacji poznawczych i zaburzeń snu REM (RBD)', 'Omamy wzrokowe w DLB są uformowane i plastyczne, podczas gdy w schizofrenii dominują omamy słuchowe w przestrzeni zewnętrznej przy jasnej świadomości.'],
          ['Głosy komentujące w trzeciej osobie nakazujące podpalenie szpitala', 'Głosy komentujące są typowe dla schizofrenii, nie dla DLB.'],
          ['Omamy węchowe spalonej gumy trwające dokładnie 5 sekund przed drgawkami', 'Omamy węchowe przed drgawkami to aura padaczkowa płata skroniowego.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Jatrogenne zaostrzenie po neuroleptyku',
        context: 'Młody lekarz dyżurny na SOR uznaje omamy za „ostrą psychozę starczą” i podaje Stanisławowi 5 mg haloperidolu domięśniowo. Po 3 godzinach pacjent staje się bezkontaktowy, pojawia się skrajna uogólniona sztywność mięśniowa (objaw koła zębatego), trudności w połykaniu i spadek ciśnienia tętniczego do 85/50 mmHg.',
        prompt: 'Jaki patomechanizm odpowiada za to gwałtowne załamanie stanu pacjenta?',
        choices: [
          ['Ciężka, zagrażająca życiu nadwrażliwość na leki przeciwpsychotyczne (antipsychotic sensitivity) w przebiegu DLB, wywołana blokadą resztkowych receptorów D2 w prążkowiu', 'Nawet 50% chorych z DLB reaguje na klasyczne neuroleptyki zapaścią, katastrofalnym zaostrzeniem parkinsonizmu i stuporem.'],
          ['Alergiczny wstrząs anafilaktyczny na nośnik leku', 'Obraz uogólnionej sztywności pozapiramidowej i stuporu jest efektem neurobiologicznym blokady dopaminergicznej, a nie anafilaksji.'],
          ['Natychmiastowe samowyleczenie z omamów wzrokowych', 'Stan pacjenta uległ krytycznemu pogorszeniu z zagrożeniem życia.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Postępowanie ratunkowe i docelowe',
        context: 'Haloperidol natychmiast odstawiono, wdrożono płynoterapię, monitorowanie kardiologiczne i ostrożne leczenie wspomagające. Po 48 godzinach sztywność częściowo ustąpiła.',
        prompt: 'Jaka farmakoterapia jest bezpieczna i rekomendowana w leczeniu omamów wzrokowych w DLB po opanowaniu stanu ostrego?',
        choices: [
          ['Włączenie inhibitora acetylocholinoesterazy (np. rywastygmina lub donepezil), który łagodzi omamy i fluktuacje bez ryzyka blokady dopaminergicznej', 'Inhibitory AChE są lekami pierwszego wyboru w objawach neuropsychiatrycznych w DLB z uwagi na głęboki ubytek cholinergiczny.'],
          ['Powtórzenie dawki haloperidolu w połączeniu z chlorpromazyną', 'Powtórne podanie neuroleptyków typowych grozi zgonem pacjenta.'],
          ['Wdrożenie leków silnie antycholinergicznych (np. biperyden)', 'Leki antycholinergiczne drastycznie nasilają omamy, splątanie i deficyty poznawcze w DLB.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Analiza kontrfaktyczna',
        context: 'Rozważ konieczność wdrożenia leku przeciwpsychotycznego w DLB, gdyby omamy wywoływały skrajną agresję i zagrażały bezpieczeństwu bliskich.',
        prompt: 'Który lek przeciwpsychotyczny o najsłabszym powinowactwie do D2 dopuszcza się w skrajnych sytuacjach w DLB w minimalnych dawkach?',
        choices: [
          ['Kwetiapina lub klozapina w bardzo małych dawkach pod ścisłym nadzorem', 'Leki te cechują się szybką dysocjacją od receptora D2 i minimalnym ryzykiem zaostrzenia parkinsonizmu w porównaniu z innymi neuroleptykami.'],
          ['Flupentiksol w postaci depot o przedłużonym uwalnianiu', 'Depot typowych neuroleptyków w DLB jest bezwzględnym błędem sztuki.'],
          ['Amisulpryd w dawce 800 mg/dobę', 'Czysty antagonista D2 w wysokiej dawce wywołałby śmiertelne powikłania pozapiramidowe.'],
        ],
        answerIndex: 0,
        counterfactual: {
          alteredFact: 'Obecność skrajnej, zagrażającej życiu agresji wymagającej interwencji farmakologicznej',
          supports: ['Bardzo ostrożne rozważenie kwetiapiny lub klozapiny w mikrodawkach'],
          arguesAgainst: ['Stosowanie haloperidolu, risperidonu czy olanzapiny'],
          mostDiscriminatingNextStep: 'Próba inhibitora AChE przed jakimkolwiek SGA',
          invalidatedManagementSteps: ['Podawanie typowych neuroleptyków i leków o wysokim powinowactwie do D2'],
        },
      },
    ],
  ),

  // Przypadek 7: Przypadek dedykowany (Szybko postępujące otępienie / Encefalopatia autoimmunologiczna)
  makeFlexibleCase(
    'szybko-postepujace-zespoly-otepienne',
    'Szybko postępująca psychoza i encefalopatia: zapalenie mózgu (Karolina, 24 l.)',
    'Karolina W., 24 lata',
    'Zaawansowany',
    'Studentka biologii bez wcześniejszego wywiadu chorobowego w ciągu 3 tygodni rozwija dziwaczne zachowania: słyszy szepty z gniazdek elektrycznych, jest skrajnie pobudzona, po czym dołączają mimowolne ruchy języka i warg.',
    [
      {
        stage: 'Ocena czerwonych flag i Zegar neurokognitywny',
        context: 'W izbie przyjęć szpitala psychiatrycznego Karolina ma epizod utraty kontaktu ze ślinotokiem i drżeniem rąk (uogólniony napad padaczkowy), po którym występuje okresowy mutyzm. W badaniu tętno wynosi 125 bpm, ciśnienie 155/95 mmHg (niestabilność wegetatywna).',
        prompt: 'Które cechy wykluczają niepowikłany debiut schizofrenii i nakazują natychmiastowy transfer na oddział neurologii?',
        choices: [
          ['Ostry/podostry przebieg w 3 tygodnie, napad padaczkowy, dyskinezy ustno-twarzowe oraz labilność autonomiczna', 'Konstelacja ta stanowi zestaw czerwonych flag autoimmunologicznego zapalenia mózgu (np. anty-NMDAR); schizofrenia nie wywołuje pierwotnie napadów padaczkowych ani dyskinez bez leków.'],
          ['Płeć żeńska i wiek 24 lata', 'Wiek 24 lata jest typowy dla debiutu wielu chorób, lecz objawy neurologiczne decydują o etiologii organicznej.'],
          ['Fakt studiowania na trudnym kierunku uniwersyteckim', 'Kierunek studiów nie jest objawem medycznym.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Diagnostyka neurologiczna i immunologiczna',
        context: 'Na oddziale neurologii wykonano punkcję lędźwiową: cytoza 28 komórek/ul (pleocytoza limfocytarna), białko 65 mg/dl. Badanie w kierunku przeciwciał przeciwneuronalnych w płynie mózgowo-rdzeniowym wykazało obecność przeciwciał anty-NMDAR.',
        prompt: 'Jakie badanie obrazowe całego ciała jest bezwzględnie wskazane u młodej kobiety z zapaleniem mózgu z przeciwciałami anty-NMDAR?',
        choices: [
          ['USG przezpochwowe lub rezonans magnetyczny miednicy mniejszej w kierunku potworniaka jajnika (teratoma ovarii)', 'U ponad 40–50% młodych kobiet zapalenie anty-NMDAR jest zespołem paraneoplastycznym wywołanym potworniakiem jajnika zawierającym ektopową tkankę nerwową.'],
          ['Mammografia u obojga rodziców pacjentki', 'Badanie rodziców nie diagnozuje guza u pacjentki.'],
          ['Scyntygrafia kości stóp', 'Brak wskazań do scyntygrafii stóp w diagnostyce zapaleń paraneoplastycznych.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Leczenie przyczynowe i rokowanie',
        context: 'W badaniu USG miednicy wykryto potworniaka jajnika lewego o wymiarach 4 cm. Wdrożono plazmaferezę, dożylne wlewy metyloprednizolonu i wykonano laparoskopowe usunięcie guza.',
        prompt: 'Jakie jest typowe rokowanie u pacjentki z zapaleniem anty-NMDAR przy wczesnym wdrożeniu leczenia onkologicznego i immunomodulującego?',
        choices: [
          ['Dobre — u ponad 75–80% chorych dochodzi do znacznej lub całkowitej remisji objawów neuropsychiatrycznych, choć proces zdrowienia trwa wiele miesięcy', 'Wczesna resekcja potworniaka i usunięcie patogennych przeciwciał umożliwia regenerację funkcji kory mózgowej.'],
          ['Całkowity brak jakichkolwiek szans na przeżycie najbliższego tygodnia', 'Zapalenie anty-NMDAR jest chorobą uleczalną przy prawidłowym postępowaniu intensywnym.'],
          ['Natychmiastowe pogorszenie wymagające amputacji obu kończyn dolnych', 'Leczenie zapalenia mózgu nie wiąże się z amputacjami kończyn.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Analiza kontrfaktyczna',
        context: 'Rozważ sytuację, w której pacjentce podano wysokie dawki haloperidolu w izbie przyjęć psychiatrycznej bez badań neurologicznych.',
        prompt: 'Jakie powikłanie mogłoby wywołać podanie neuroleptyku u pacjentki z nierozpoznanym zapaleniem anty-NMDAR i dyskinezami?',
        choices: [
          ['Ciężką hipertermię, zaostrzenie sztywności, załamanie oddechowe i stan zagrażający życiu, imitujący złośliwy zespół neuroleptyczny', 'Mózg dotknięty zapaleniem autoimmunologicznym jest skrajnie wrażliwy na leki dopaminolityczne; neuroleptyki mogą wywołać śmiertelne załamanie wegetatywne.'],
          ['Natychmiastowe cofnięcie potworniaka jajnika', 'Neuroleptyki nie likwidują nowotworów jajnika.'],
          ['Zwiększenie poziomu hemoglobiny we krwi o 50%', 'Leki przeciwpsychotyczne nie są czynnikiem stymulującym erytropoezę.'],
        ],
        answerIndex: 0,
        counterfactual: {
          alteredFact: 'Błędne rozpoznanie schizofrenii i podanie wysokich dawek haloperidolu',
          supports: ['Jatrogenne powikłanie wegetatywne', 'Zaostrzenie encefalopatii'],
          arguesAgainst: ['Prawidłowe postępowanie diagnostyczne w ostrych stanach neurologicznych'],
          mostDiscriminatingNextStep: 'Natychmiastowe odstawienie neuroleptyku i intensywna terapia neurologiczna',
          invalidatedManagementSteps: ['Leczenie pacjentki w oddziale psychiatrycznym bez zaplecza neurologicznego'],
        },
      },
    ],
  ),

  // Przypadek 8: Przypadek dedykowany (Geriatryczna polifarmacja, upadki i obciążenie ACB)
  makeFlexibleCase(
    'psychofarmakologia-wieku-podeszlego',
    'Polifarmacja geriatryczna, upadki i obciążenie antycholinergiczne (Władysław, 84 l.)',
    'Władysław M., 84 lata',
    'Zaawansowany',
    'Pacjent mieszkający z córką zostaje skierowany na geriatryczny przegląd lekowy z powodu trzech upadków w ciągu ostatniego miesiąca, narastającego splątania wieczornego i przewlekłych zaparć.',
    [
      {
        stage: 'Analiza profilu lekowego i skala ACB',
        context: 'Władysław przyjmuje 9 leków: oksybutyninę 5 mg x 2 (pęcherz), hydroksyzynę 25 mg na noc (świąd/sen), zolpidem 10 mg doraźnie, tramadol 50 mg na ból stawów, sertralinę 50 mg (depresja), ramipryl 5 mg, furosemid 40 mg, metoprolol 50 mg oraz atorwastatynę 20 mg. Jego eGFR wynosi 36 ml/min/1.73m2.',
        prompt: 'Jaki jest wynik obciążenia antycholinergicznego (ACB) i jakie zagrożenia wynikają z tego zestawu leków?',
        choices: [
          ['Łączny ACB wynosi >=8 pkt (oksybutynina=3, hydroksyzyna=3, sertralina=1, furosemid=1, metoprolol=1); potęguje to ryzyko majaczenia, zatrzymania moczu, zaparć, upadków i spadku GFR', 'Wynik ACB >= 3 stanowi wysokie zagrożenie geriatryczne; kumulacja blokady muskarynowej i leków sedatywnych (zolpidem, tramadol) bezpośrednio odpowiada za upadki i splątanie.'],
          ['Zestaw jest całkowicie bezpieczny, ponieważ pacjent przyjmuje każdy lek o innej godzinie', 'Rozłożenie w czasie nie eliminuje skumulowanej blokady receptorowej w OUN u seniora.'],
          ['Leki te nie mają żadnego wpływu na funkcje poznawcze ani motoryczne', 'Leki antycholinergiczne i sedatywne są główną przyczyną odwracalnych upadków i delirium w geriatrii.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Kryteria Beers 2023 i plan depreskrypcji',
        context: 'Lekarz analizuje profil pod kątem kryteriów AGS Beers 2023. Zidentyfikowano obecność leków z grupy PIM (Potentially Inappropriate Medications): hydroksyzyna, oksybutynina, zolpidem, tramadol.',
        prompt: 'Jaka sekwencja depreskrypcji i modyfikacji leczenia jest najbardziej racjonalna?',
        choices: [
          ['Stopniowe odstawienie hydroksyzyny i zolpidemu (edukacja higieny snu), zamiana oksybutyniny na mirabegron lub metody uroginekologiczne, optymalizacja paracetamolu zamiast tramadolu', 'Eliminacja leków silnie antycholinergicznych i sedatywnych zmniejsza ryzyko kolejnego złamania biodra i poprawia sprawność poznawczą bez konieczności rezygnacji z leczenia bólu.'],
          ['Dołożenie haloperidolu 5 mg w celu powstrzymania upadków pacjenta', 'Neuroleptyk nasiliłby ataksję i parkinsonizm, zwielokrotniając ryzyko upadku.'],
          ['Nagłe odstawienie wszystkich 9 leków w jednym dniu bez leczenia substytucyjnego', 'Nagłe odstawienie leków kardiologicznych grozi przełomem nadciśnieniowym i dekompensacją krążenia.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Ocena po 4 tygodniach od depreskrypcji',
        context: 'Po 4 tygodniach od redukcji leków antycholinergicznych i odstawieniu zolpidemu Władysław nie miał ani jednego upadku, ustąpiły zaparcia, a w nocy śpi spokojnie bez majaczenia.',
        prompt: 'Jaki kluczowy wniosek kliniczny płynie z tego przypadku dla geriatrii i psychofarmakologii?',
        choices: [
          ['Wiele zaburzeń poznawczych, splątania i upadków u osób starszych ma charakter jatrogenny i ulega odwróceniu po racjonalnej depreskrypcji', 'Zasada „przegląd lekowy przed nową diagnozą” jest fundamentalnym filarem geriatrii chroniącym przed kaskadami preskrypcyjnymi.'],
          ['Upadki u seniorów są zjawiskiem nieodwracalnym i niepodatnym na żadne modyfikacje lekowe', 'Przypadek dowodzi, że modyfikacja farmakoterapii bezpośrednio eliminuje ryzyko upadków.'],
          ['Pacjenci w podeszłym wieku nie powinni otrzymywać wody ani jedzenia', 'Zalecenie absurdalne; odpowiednie nawodnienie jest kluczem do prawidłowej filtracji nerkowej.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Analiza kontrfaktyczna',
        context: 'Rozważ sytuację, w której z powodu wieczornego splątania lekarz dołożyłby olanzapinę w dawce 10 mg zamiast depreskrypcji.',
        prompt: 'Jakie powikłanie kliniczne byłoby najbardziej prawdopodobne po włączeniu olanzapiny do tego zestawu?',
        choices: [
          ['Dalszy wzrost obciążenia ACB (olanzapina wykazuje blokadę M1), nasilenie sedacji dziennej, hipotonia ortostatyczna i kolejny ciężki upadek ze złamaniem szyjki kości udowej', 'Włączenie neuroleptyku sedatywnego w kaskadzie preskrypcyjnej u chorego z wysokim ACB i eGFR 36 jest klasycznym błędem geriatrycznym o tragicznych skutkach.'],
          ['Natychmiastowe odmłodzenie biologiczne pacjenta o 20 lat', 'Neuroleptyki nie cofają procesów starzenia komórkowego.'],
          ['Wzrost przesączania kłębuszkowego GFR do 150 ml/min', 'Leki psychotropowe nie podnoszą filtracji nerkowej u chorego z przewlekłą chorobą nerek.'],
        ],
        answerIndex: 0,
        counterfactual: {
          alteredFact: 'Wdrożenie olanzapiny zamiast redukcji leków (kaskada preskrypcyjna)',
          supports: ['Jatrogenne złamanie szyjki kości udowej', 'Nasilenie zespołu majaczeniowego'],
          arguesAgainst: ['Zasady racjonalnej geriatrycznej farmakoterapii'],
          mostDiscriminatingNextStep: 'Przegląd lekowy (skala ACB i Beers) przed dodaniem jakiegokolwiek leku uspokajającego',
          invalidatedManagementSteps: ['Leczenie objawów ubocznych polifarmacji kolejnymi lekami psychotropowymi'],
        },
      },
    ],
  ),
];
