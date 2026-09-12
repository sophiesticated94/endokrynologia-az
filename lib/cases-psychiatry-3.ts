import type { ClinicalCase } from './cases-psychiatry-builder.ts';
import { makeFlexibleCase } from './cases-psychiatry-builder.ts';

export const psychiatryCasesPart3: ClinicalCase[] = [
  // Przypadek 1: Wątek Heleny (Etap 1 - MCI vs Otępienie wczesne)
  makeFlexibleCase(
    'zaburzenia-poznawcze-mci-a-otepienie',
    'Amnestyczne MCI czy wczesne otępienie? (Wątek A - Helena S.)',
    'Helena S., 79 lat',
    'Zaawansowany',
    'Emerytowana księgowa zgłasza się z córką z powodu narastających od 18 miesięcy trudności z przypominaniem sobie niedawnych rozmów i terminów wizyt lekarskich.',
    [
      {
        stage: 'Ocena kliniczna i funkcjonalna',
        context: 'W badaniu MoCA Helena uzyskuje 22/30 pkt (traci punkty w odroczonym przypominaniu słów i teście zegara). Córka podaje, że matka bez problemu gotuje, ubiera się i dba o higienę, lecz popełnia błędy przy opłacaniu rachunków przez internet i myli dawkowanie leków.',
        prompt: 'Który element różnicowy jest kluczowy dla odróżnienia amnestycznego MCI od wczesnego otępienia (dementia)?',
        choices: [
          ['Stopień zachowania niezależności w złożonych czynnościach dnia codziennego (IADL) — w otępieniu dochodzi do utraty samodzielności w zarządzaniu lekami i finansami', 'Niezależność funkcjonalna w IADL/ADL jest kryterium rozgraniczającym MCI od otępienia; trudności Heleny w finansach i lekach wskazują na przejście w fazę wczesnego otępienia.'],
          ['Dokładna liczba punktów w teście MoCA (każdy wynik poniżej 24 pkt automatycznie oznacza otępienie)', 'Test przesiewowy nie stawia diagnozy; punktacja wymaga korelacji z funkcjonowaniem w życiu codziennym.'],
          ['Obecność siwych włosów i drżenia rąk podczas pisania', 'Cechy somatyczne starzenia nie determinują stadium zespołu otępiennego.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Badania laboratoryjne i neuroobrazowanie',
        context: 'Morfologia, TSH, witamina B12, glukoza i elektrolity są w normie. W badaniu MRI mózgu stwierdzono umiarkowany zanik hipokampów (skala MTA 2/4 obustronnie) bez świeżych ognisk naczyniowych.',
        prompt: 'Jak poprawnie zinterpretować ten profil badań dodatkowych?',
        choices: [
          ['Prawidłowe parametry krwi zmniejszają prawdopodobieństwo uchwytnych masek internistycznych, a atrofia hipokampów w MRI wspiera podłoże neurodegeneracyjne (prawdopodobna choroba Alzheimera)', 'Ujemny bilans laboratoryjny eliminuje wybrane zaburzenia metaboliczne, a symetryczny zanik MTA wspiera podejrzenie wczesnego AD.'],
          ['Prawidłowe badania krwi definitywnie wykluczają chorobę Alzheimera', 'Rutynowe badania krwi nie wykluczają choroby Alzheimera; służą do poszukiwania przyczyn odwracalnych.'],
          ['Obraz MRI dowodzi w 100%, że pacjentka nigdy nie rozwinie pełnego otępienia', 'Zanik hipokampów MTA 2/4 jest czynnikiem wysokiego ryzyka dalszej progresji.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Plan postępowania i wsparcie',
        context: 'Ustalono rozpoznanie wczesnego otępienia w chorobie Alzheimera. Córka pyta o możliwości leczenia i organizację opieki.',
        prompt: 'Która strategia jest najbardziej zgodna z wytycznymi EBM?',
        choices: [
          ['Rozważenie włączenia inhibitora AChE (np. donepezil) z monitorowaniem tolerancji, ustrukturyzowane wsparcie rodziny w organizacji dozownika leków oraz aktywizacja poznawcza', 'Inhibitory AChE mogą spowolnić spadek poznawczy we wczesnym AD, a wsparcie w zarządzaniu lekami (IADL) zapobiega powikłaniom przedawkowania.'],
          ['Natychmiastowe umieszczenie w zakładzie opiekuńczym bez zgody pacjentki', 'We wczesnym stadium z zachowanymi podstawowymi ADL pacjentka może bezpiecznie funkcjonować w domu ze wsparciem bliskich.'],
          ['Wdrożenie monoterapii haloperidolem w celu ochrony przed pobudzeniem', 'Profilaktyczne podawanie neuroleptyku w łagodnym otępieniu jest przeciwwskazane i szkodliwe.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Analiza kontrfaktyczna',
        context: 'Rozważ wariant przebiegu u Heleny.',
        prompt: 'Gdyby Helena zgłosiła, że objawy pojawiły się nagle 4 dni temu po rozpoczęciu leczenia infekcji dróg oddechowych lekiem przeciwhistaminowym i towarzyszy im senność w dzień, co byłoby najbardziej prawdopodobne?',
        choices: [
          ['Ostre majaczenie polekowe (delirium) na podłożu obciążenia antycholinergicznego, wymagające natychmiastowego odstawienia leku', 'Ostry początek w 4 dni po leku przeciwhistaminowym (antycholinergicznym) wskazuje na delirium, a nie powolny proces Alzheimera.'],
          ['Typowy, fizjologiczny przebieg choroby Alzheimera', 'Choroba Alzheimera nie rozwija się w ciągu 4 dni po infekcji.'],
          ['Złośliwy guz pnia mózgu z rozsiewem do opon', 'Nagłe splątanie po leku przeciwhistaminowym w pierwszej kolejności sugeruje encefalopatię toksyczną/delirium.'],
        ],
        answerIndex: 0,
        counterfactual: {
          alteredFact: 'Początek objawów w 4 dni po leku zamiast 18 miesięcy',
          supports: ['Majaczenie polekowe (delirium)', 'Obciążenie antycholinergiczne OUN'],
          arguesAgainst: ['Powolny proces neurodegeneracyjny jako wyłączna przyczyna'],
          mostDiscriminatingNextStep: 'Przegląd lekowy (skala ACB), test 4AT i odstawienie leku podejrzanego',
          invalidatedManagementSteps: ['Wdrażanie długoterminowej farmakoterapii otępienia bez opanowania stanu ostrego'],
        },
      },
    ],
  ),

  // Przypadek 2: Wątek Heleny (Etap 2 - Ostre BPSD w przebiegu ZUM)
  makeFlexibleCase(
    'bpsd-objawy-behawioralne-i-psychologiczne',
    'Ostre pobudzenie w otępieniu: poszukiwanie przyczyny (Wątek A - Helena S.)',
    'Helena S., 80 lat',
    'Zaawansowany',
    'Rok po rozpoznaniu choroby Alzheimera Helena zostaje przyprowadzona do POZ przez wyczerpaną córkę: od 3 dni jest niespokojna, w nocy błądzi po mieszkaniu, a wczoraj uderzyła córkę przy toalecie.',
    [
      {
        stage: 'Pierwsza ocena i triaging przyczyn',
        context: 'Lekarz dyżurny proponuje natychmiastowe wypisanie recepty na haloperidol lub olanzapinę w celu „opanowania agresji”.',
        prompt: 'Dlaczego automatyczne wdrożenie leku przeciwpsychotycznego w tym momencie jest błędem postępowania?',
        choices: [
          ['Każde nagłe zaostrzenie zachowania (BPSD) u chorego z otępieniem wymaga w pierwszej kolejności poszukiwania odwracalnych przyczyn somatycznych (ból, infekcja, retencja moczu, leki)', 'Leki przeciwpsychotyczne nie leczą somatycznego źródła pobudzenia, a u seniorów z otępieniem niosą czarną ramkę ostrzegawczą (ryzyko udaru mózgu i zgonu).'],
          ['Ponieważ u kobiet po 80 roku życia leki przeciwpsychotyczne nie wchłaniają się z przewodu pokarmowego', 'Leki wchłaniają się, lecz ich nieuzasadnione podanie stwarza zagrożenie życia.'],
          ['Ponieważ pacjentka powinna najpierw odbyć 10 sesji terapii psychodynamicznej', 'W ostrym pobudzeniu z podejrzeniem tła somatycznego psychoterapia wglądowa jest niewykonalna.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Badanie fizykalne i diagnostyka (Cause Hunt)',
        context: 'W badaniu fizykalnym: podbrzusze bolesne przy palpacji, temperatura 37,4°C. W badaniu ogólnym moczu: liczne bakterie, leukocyty zalegające pole widzenia, azotyny dodatnie.',
        prompt: 'Jakie rozpoznanie i plan terapeutyczny są najwłaściwsze?',
        choices: [
          ['Objawowe zakażenie układu moczowego (ZUM) wyzwalające majaczenie nałożone na otępienie i wtórne pobudzenie bólowe; celowana antybiotykoterapia i leczenie bólu', 'ZUM jest jednym z najczęstszych wyzwalaczy ostrego delirium i BPSD; eradykacja zakażenia z reguły prowadzi do wyciszenia agresji bez neuroleptyków.'],
          ['Schizofrenia paranoidalna o późnym początku, z przypadkową bezobjawową bakteriurią', 'Obecność leukocyturii, bolesności podbrzusza i nagłego załamania wyklucza pierwotną schizofrenię.'],
          ['Konieczność natychmiastowego wykonania trepanacji czaszki', 'Brak wskazań neurochirurgicznych przy jawnym zakażeniu dróg moczowych.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Przegląd lekowy i depreskrypcja',
        context: 'W wywiadzie lekowym ustalono, że przed tygodniem Helena otrzymała hydroksyzynę 25 mg na noc na świąd skóry oraz oksybutyninę na nietrzymanie moczu (łączny ACB = 6).',
        prompt: 'Jaki wpływ na stan pacjentki miały te leki i jakie działanie należy podjąć?',
        choices: [
          ['Leki o wysokim potencjale antycholinergicznym nasiliły zatrzymanie moczu, sedację i ubytki pamięci; wskazana jest ich stopniowa depreskrypcja i zamiana na bezpieczniejsze alternatywy', 'Oksybutynina i hydroksyzyna drastycznie podnoszą burden ACB, sprzyjając retencji moczu, infekcjom i majaczeniu.'],
          ['Należy potroić dawki obu leków, aby całkowicie wyciszyć czynność pęcherza i mózgu', 'Eskalacja leków antycholinergicznych u seniora grozi całkowitym bezmoczem i śpiączką.'],
          ['Leki te nie mają żadnego wpływu na układ moczowy ani OUN', 'Oba leki są silnymi antagonistami receptorów muskarynowych.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Analiza kontrfaktyczna',
        context: 'Rozważ sytuację, w której po wyleczeniu ZUM i odstawieniu leków antycholinergicznych agresja ustępuje, lecz pacjentka nadal błądzi w nocy.',
        prompt: 'Jakie niefarmakologiczne postępowanie jest rekomendowane na błądzenie nocne u chorej z otępieniem?',
        choices: [
          ['Zapewnienie bezpiecznej przestrzeni do chodzenia, delikatne oświetlenie drogi do toalety, tabliczki wizualne i stały rytm dnia', 'Metody środowiskowe redukują lęk i urazy bez konieczności stosowania leków sedatywnych wywołujących upadki.'],
          ['Przymusowe unieruchomienie pasami w łóżku przez 12 godzin na dobę', 'Unieruchomienie mechaniczne bez wskazań bezpośredniego zagrożenia jest niedopuszczalne i nasila lęk.'],
          ['Podawanie dużych dawek zolpidemu co 4 godziny', 'Leki z grupy Z u osób z otępieniem dramatycznie zwiększają ryzyko upadków i złamań.'],
        ],
        answerIndex: 0,
        counterfactual: {
          alteredFact: 'Ustąpienie agresji po antybiotyku, lecz utrzymywanie się błądzenia nocnego',
          supports: ['Interwencje niefarmakologiczne i modyfikacja środowiska domowego'],
          arguesAgainst: ['Stosowanie leków przeciwpsychotycznych na samo błądzenie'],
          mostDiscriminatingNextStep: 'Edukacja opiekuna w zakresie higieny snu i zabezpieczenia mieszkania',
          invalidatedManagementSteps: ['Włączanie neuroleptyków sedatywnych w celu unieruchomienia pacjenta'],
        },
      },
    ],
  ),

  // Przypadek 3: Wątek Jana (Etap 1 - Hipoaktywne delirium na chirurgii)
  makeFlexibleCase(
    'delirium-rozpoznanie-i-dynamika',
    'Hipoaktywne delirium po alloplastyce biodra (Wątek B - Jan B.)',
    'Jan B., 82 lata',
    'Zaawansowany',
    'W 2. dobie po planowej alloplastyce stawu biodrowego Jan leży bez ruchu w łóżku, jest podsypiający, nie odpowiada na pytania pielęgniarek i nie podejmuje rehabilitacji. Zespół chirurgiczny podejrzewa „pooperacyjną depresję”.',
    [
      {
        stage: 'Badanie przyłóżkowe i skala 4AT',
        context: 'Lekarz konsultujący przeprowadza badanie 4AT: czujność zmieniona (pacjent z trudem otwiera oczy, po chwili odpływa — 4 pkt), w teście AMT4 podaje błędny rok i myli szpital z dworcem (2 pkt), próba miesięcy wstecz niemożliwa do wykonania z powodu braku skupienia (2 pkt). W nocy pacjent był pobudzony i wyrywał kaniulę dożylną (ostra fluktuacja — 4 pkt). Suma: 12/12 pkt.',
        prompt: 'Jaka jest prawidłowa interpretacja wyniku badania Jana?',
        choices: [
          ['Obraz kliniczny odpowiada ostremu majaczeniu hipoaktywnemu z nocnymi fluktuacjami, wykluczając izolowany epizod depresyjny', 'Wynik 12/12 w 4AT, głębokie zaburzenia czujności i dobowa fluktuacja to klasyczna manifestacja delirium; diagnoza „depresji” opóźnia wykrycie przyczyny somatycznej.'],
          ['Jest to typowa reakcja żałoby po utracie własnego stawu biodrowego', 'Zaburzenia czuwania i dezorientacja allopsychiczna nie mieszczą się w definicji fizjologicznej żałoby.'],
          ['Wynik 12 pkt w 4AT jest w pełni prawidłowy dla każdego 82-latka po operacji', 'Wynik powyżej 3 pkt zawsze wskazuje na patologię OUN wymagającą interwencji.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Poszukiwanie czynników wyzwalających (PINCHES)',
        context: 'W karcie zleceń: Jan otrzymuje tramadol 50 mg co 6h, ketoprofen 100 mg i.v., nie oddawał moczu od 12 godzin (cewnik usunięto wczoraj rano). W USG pęcherza moczowego: 650 ml zalegającego moczu.',
        prompt: 'Co było bezpośrednim, odwracalnym wyzwalaczem majaczenia u Jana?',
        choices: [
          ['Ostre zatrzymanie moczu po usunięciu cewnika oraz działanie ośrodkowe tramadolu', 'Masywne przepełnienie pęcherza generuje silny ból i impulsację nocyceptywną, a tramadol wykazuje działanie sedatywno-deliriogenne u osób starszych.'],
          ['Prawidłowo prowadzona kinezyterapia', 'Kinezyterapia zapobiega majaczeniu, a nie je wywołuje.'],
          ['Dieta lekkostrawna podawana w szpitalu', 'Posiłki szpitalne nie wywołują ostrego zatrzymania moczu z majaczeniem.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Interwencja terapeutyczna',
        context: 'Wykonano natychmiastowe cewnikowanie (odprowadzono 650 ml moczu z natychmiastową ulgą), odstawiono tramadol, wdrożono paracetamol w regularnych dawkach i zalecono obecność rodziny przy łóżku.',
        prompt: 'Jak ocenić skuteczność i prawidłowość takiego postępowania?',
        choices: [
          ['Postępowanie wzorcowe: usunięcie bezpośredniego wyzwalacza somatycznego (zatrzymanie moczu, opioid) i optymalizacja niefarmakologiczna zapobiegają konieczności podawania neuroleptyków', 'Niefarmakologiczne opanowanie przyczyny delirium jest złotym standardem wytycznych NICE CG103.'],
          ['Błąd w sztuce: należało najpierw podać 10 mg haloperidolu i zignorować zaleganie moczu', 'Podanie neuroleptyku przy przepełnionym pęcherzu nasiliłoby zatrzymanie moczu i mogło doprowadzić do pęknięcia narządu.'],
          ['Zabieg cewnikowania jest przeciwwskazany w każdym przypadku majaczenia', 'Odbarczenie przepełnionego pęcherza jest procedurą ratunkową o natychmiastowym efekcie.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Analiza kontrfaktyczna',
        context: 'Rozważ alternatywny przebieg, w którym zamiast zacewnikowania podano Janowi benzodiazepinę (midazolam) na nocne pobudzenie.',
        prompt: 'Jaki skutek miało najbardziej prawdopodobne podanie midazolamu u 82-letniego pacjenta z zatrzymaniem moczu?',
        choices: [
          ['Pogłębienie hipoaktywnego majaczenia, paradoksalne pobudzenie, dalsze zatrzymanie moczu i wzrost ryzyka zgonu', 'Benzodiazepiny u seniorów z majaczeniem (poza odstawieniem alkoholu/BZD) są silnym czynnikiem deliriogennym i zaostrzają zaburzenia świadomości.'],
          ['Natychmiastowe i trwałe wyleczenie z majaczenia w ciągu 15 minut', 'Benzodiazepiny indukują majaczenie, nie stanowią leku pierwszego wyboru.'],
          ['Spontaniczne cofnięcie się zmian zwyrodnieniowych drugiego biodra', 'Leki psychotropowe nie modyfikują struktury chrząstki stawowej.'],
        ],
        answerIndex: 0,
        counterfactual: {
          alteredFact: 'Zastosowanie midazolamu zamiast cewnikowania i analgezji',
          supports: ['Jatrogenne przedłużenie majaczenia', 'Zwiększona śmiertelność pooperacyjna'],
          arguesAgainst: ['Racjonalna geriatryczna opieka okołooperacyjna'],
          mostDiscriminatingNextStep: 'Pilne USG pęcherza moczowego i zaprzestanie podawania BZD',
          invalidatedManagementSteps: ['Eskalacja dawek leków uspokajających przy nierozpoznanej anurii'],
        },
      },
    ],
  ),

  // Przypadek 4: Wątek Jana (Etap 2 - Delirium nałożone na otępienie)
  makeFlexibleCase(
    'delirium-vs-otepienie-vs-depresja',
    'Ocena po wygaszeniu delirium: czy pod spodem kryje się otępienie? (Wątek B - Jan B.)',
    'Jan B., 82 lata',
    'Zaawansowany',
    'Trzy miesiące po alloplastyce stawu biodrowego i ustąpieniu pooperacyjnego delirium Jan zgłasza się z synem na planową ocenę kontrolną. Jan porusza się sprawnie o lasce, jest pogodny i w pełni zorientowany w czasie i miejscu (4AT = 0 pkt).',
    [
      {
        stage: 'Wywiad retrospektywny od syna (Collateral History)',
        context: 'Syn relacjonuje: „Po operacji tata doszedł do siebie, ale już przed szpitalem od ponad roku powtarzał w kółko te same pytania, przestał opłacać rachunki na poczcie i gubił klucze. Wszyscy myśleliśmy, że to po prostu starość, a w szpitalu nagle zupełnie odpłynął”.',
        prompt: 'Jaki wniosek kliniczny wynika z nałożenia ostrego epizodu delirium na wywiad przewlekłych trudności poznawczych?',
        choices: [
          ['Epizod pooperacyjny stanowił majaczenie nałożone na nierozpoznane wcześniej łagodne otępienie (delirium superimposed on dementia)', 'Obecność niezdiagnozowanego otępienia była głównym czynnikiem podatności na pooperacyjne delirium; ustąpienie stanu ostrego pozwala na formalną ocenę procesu przewlekłego.'],
          ['Epizod majaczenia w szpitalu był symulacją ze strony pacjenta', 'Delirium pooperacyjne jest ostrym zespołem biologicznym, nie symulacją.'],
          ['Pacjent jest w 100% zdrowy poznawczo, a relacja syna wynika ze złośliwości', 'Relacja bliskich o rocznych trudnościach w IADL jest kluczowym dowodem na przewlekły proces neurokognitywny.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Badanie neuropsychologiczne w stanie stabilnym',
        context: 'W badaniu MoCA Jan uzyskuje 20/30 pkt (traci punkty w odraczaniu słów, teście zegara i fluencji słownej). Wykonuje polecenia sprawnie, uwaga jest stabilna, brak cech senności ani falowania.',
        prompt: 'Dlaczego formalną ocenę otępienia należy przeprowadzać dopiero po całkowitym wygaszeniu majaczenia?',
        choices: [
          ['Ponieważ ostre zaburzenia uwagi i czuwania w trakcie delirium uniemożliwiają wiarygodną ocenę rzeczywistej rezerwy pamięciowej i wykonawczej', 'Badanie funkcji poznawczych w trakcie majaczenia odzwierciedla stan ostry encefalopatii, a nie stabilny poziom funkcjonowania pacjenta.'],
          ['Ponieważ przepisy NFZ zabraniają używania testów MoCA u osób po zabiegach chirurgicznych', 'Kwestia ma charakter czysto metodologiczny i diagnostyczny, nie administracyjny.'],
          ['Ponieważ test MoCA można wykonywać wyłącznie w pełnej narkozie', 'Testy poznawcze wymagają pełnej przytomności i współpracy chorego.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Strategia prewencji wtórnej delirium',
        context: 'Jan ma zaplanowany za 6 miesięcy zabieg zaćmy. Syn pyta, jak zapobiec ponownemu załamaniu świadomości u ojca.',
        prompt: 'Które zalecenia profilaktyczne mają najwyższą udowodnioną skuteczność wg wytycznych NICE CG103?',
        choices: [
          ['Wieloelementowa prewencja niefarmakologiczna: obecność syna przy wybudzaniu, szybkie założenie okularów i aparatu słuchowego, unikanie leków sedatywnych i antycholinergicznych, dobre nawodnienie i leczenie bólu', 'Protokoły niefarmakologiczne redukują ryzyko nawrotu majaczenia o 30–40% u chorych z otępieniem.'],
          ['Profilaktyczne podanie 10 mg haloperidolu i 10 mg relanium przed wejściem na blok operacyjny', 'Profilaktyczne podawanie neuroleptyków i benzodiazepin zwiększa ryzyko majaczenia i zgonu.'],
          ['Całkowita rezygnacja z leczenia zaćmy i pozostawienie pacjenta w ślepocie', 'Niedowidzenie jest czynnikiem ryzyka delirium; poprawa wzroku chroni przed dezorientacją.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Analiza kontrfaktyczna',
        context: 'Rozważ sytuację, w której Jan po 3 miesiącach nadal ma fluktuacje uwagi, w nocy podsypia, a w dzień krzyczy.',
        prompt: 'Co oznaczałoby utrzymywanie się falowania świadomości i uwagi przez 3 miesiące po operacji?',
        choices: [
          ['Przewlekłe majaczenie (persistent delirium) lub nierozpoznany proces organiczny (np. przewlekły krwiak podtwardówkowy, encefalopatia metaboliczna), wymagające pilnego MRI mózgu', 'Majaczenie może przejść w postać przetrwałą, zwłaszcza przy braku wyeliminowania przyczyny lub powikłaniach śródczaszkowych.'],
          ['Całkowity sukces terapii i brak potrzeby jakichkolwiek badań', 'Utrzymywanie się fluktuacji po 3 miesiącach jest sygnałem alarmowym.'],
          ['Fizjologiczny stan typowy dla każdego człowieka w wieku powyżej 80 lat', 'Przewlekłe majaczenie jest ciężką patologią o złym rokowaniu.'],
        ],
        answerIndex: 0,
        counterfactual: {
          alteredFact: 'Utrzymywanie się wahań świadomości przez 3 miesiące po zabiegu',
          supports: ['Przewlekłe majaczenie (persistent delirium)', 'Przewlekły krwiak podtwardówkowy'],
          arguesAgainst: ['Typowe niepowikłane otępienie bez majaczenia'],
          mostDiscriminatingNextStep: 'Kontrolne MRI mózgu i ocena internistyczna',
          invalidatedManagementSteps: ['Uznanie objawów za nieszkodliwe i zaniechanie diagnostyki'],
        },
      },
    ],
  ),
];
