import type { OtyloscCaseDraft } from './cases-otylosc-types.ts';

export const otyloscCasesPart2: OtyloscCaseDraft[] = [
  {
    id: 'case-otylosc-hipercholesterolemia-rodzinna-fh',
    lessonId: 'otylosc-hipercholesterolemia-rodzinna',
    title: 'Żółtaki ścięgien i skrajny LDL-C u młodego mężczyzny (HeFH)',
    patient: 'Mężczyzna, 33 lata',
    difficulty: 'Zaawansowany',
    intro: 'Informatyk w wieku 33 lat zgłasza się z powodu zgrubień na obu ścięgnach Achillesa oraz zażółcenia powiek. W wywiadzie: ojciec zmarł nagle na zawał serca w wieku 41 lat.',
    steps: [
      {
        prompt: 'W badaniu fizykalnym stwierdzono obustronne żółtaki ścięgien Achillesa oraz obwódkę starczą rogówki (arcus senilis). W lipidogramie: cholesterol całkowity 380 mg/dl, LDL-C 295 mg/dl, HDL 48 mg/dl, TG 140 mg/dl. Jaka jest diagnoza kliniczna?',
        context: 'Ocena w skali Dutch Lipid Clinic Network (DLCN) przekracza 10 punktów.',
        options: [
          { text: 'Pewne rozpoznanie heterozygotycznej hipercholesterolemii rodzinnej (HeFH)', explanation: 'Żółtaki ścięgien (6 pkt), LDL-C > 250 mg/dl (5 pkt) oraz zawał u krewnego I st. dają łącznie > 8 pkt w skali DLCN.' },
          { text: 'Fizjologiczna dyslipidemia wysiłkowa', explanation: 'Ekstremalny LDL-C 295 mg/dl z żółtakami ścięgien to stan zagrażający życiu, a nie zjawisko fizjologiczne.' },
        ],
      },
      {
        prompt: 'Jaki jest docelowy poziom LDL-C u tego chorego po wdrożeniu leczenia, jeśli zaliczamy go do kategorii bardzo dużego ryzyka sercowo-naczyniowego?',
        context: 'Zgodnie z wytycznymi ESC/EAS 2023.',
        options: [
          { text: 'LDL-C < 55 mg/dl (1,4 mmol/l) oraz redukcja o co najmniej 50% w stosunku do wartości wyjściowej', explanation: 'Osiągnięcie celu < 55 mg/dl z poziomu wyjściowego 295 mg/dl wymaga redukcji o ponad 80%.' },
          { text: 'LDL-C < 190 mg/dl', explanation: '190 mg/dl to wartość skrajnie aterogenna, niedopuszczalna jako cel leczenia.' },
        ],
      },
      {
        prompt: 'Maksymalna tolerowana dawka statyny o wysokiej intensywności (rosuwastatyna 40 mg) w połączeniu z ezetymibem 10 mg obniżyła LDL-C do 105 mg/dl. Jaki lek należy dołączyć w trzecim kroku?',
        context: 'Pacjent wymaga dalszego obniżenia LDL-C o co najmniej 50 mg/dl.',
        options: [
          { text: 'Inhibitor PCSK9 — przeciwciało monoklonalne (ewolokumab lub alirokumab s.c.) lub inklisiran s.c.', explanation: 'Dołączenie inhibitora PCSK9 do statyny i ezetymibu dodaje 60% redukcji LDL-C, pozwalając osiągnąć stężenie < 55 mg/dl.' },
          { text: 'Monoterapię fibratem (fenofibrat 200 mg)', explanation: 'Fibraty obniżają triglicerydy, ale nie obniżają stężenia LDL-C o wymagane 50%.' },
        ],
      },
      {
        prompt: 'Pacjent ma dwoje dzieci w wieku 6 i 8 lat. Jakie postępowanie profilaktyczne należy zaplanować w rodzinie?',
        context: 'Zasady genetyki klinicznej w chorobach jednogenowych.',
        options: [
          { text: 'Screening kaskadowy w rodzinie: badanie lipidogramu i test genetyczny u dzieci w celu wczesnego wdrożenia leczenia w wieku 8–10 lat', explanation: 'Każde dziecko pacjenta z HeFH ma 50% ryzyka odziedziczenia mutacji genu LDLR.' },
          { text: 'Zakaz wykonywania badań u dzieci aż do ukończenia przez nie 40. roku życia', explanation: 'Zaniechanie badań u dzieci z HeFH prowadzi do bezobjawowego rozwoju miażdżycy i przedwczesnego zawału.' },
        ],
      },
    ],
  },
  {
    id: 'case-otylosc-zespol-chylomikronemii-fcs',
    lessonId: 'otylosc-metabolizm-lipoprotein-klasyfikacja',
    title: 'Mleczna surowica i ostre zapalenie trzustki w zespole FCS',
    patient: 'Kobieta, 29 lat',
    difficulty: 'Zaawansowany',
    intro: 'Młoda kobieta w 16. tygodniu ciąży zostaje przyjęta na oddział ratunkowy z powodu opasującego bólu w nadbrzuszu, nudności i wymiotów. Podczas pobierania krwi krew w probówce ma wygląd mleka.',
    steps: [
      {
        prompt: 'Wyniki badań: amylaza w surowicy 820 U/l, lipaza 1450 U/l, triglicerydy w surowicy 1850 mg/dl (21 mmol/l). Jaka jest przyczyna ostrego zapalenia trzustki (OZT)?',
        context: 'W USG brak kamicy pęcherzyka żółciowego, brak wywiadu alkoholowego.',
        options: [
          { text: 'Ostre zapalenie trzustki na tle ciężkiej hipertriglicerydemii w przebiegu zespołu chylomikronemii', explanation: 'Stężenie triglicerydów > 1000 mg/dl (szczególnie > 1770 mg/dl) drastycznie zwiększa ryzyko OZT wskutek zatykania mikrokrążenia trzustki przez chylomikrony.' },
          { text: 'Perforacja wrzodu opuszki dwunastnicy', explanation: 'Perforacja wrzodu daje powietrze pod kopułami przepony i ostry brzuch, nie tłumaczy mlecznej surowicy i TG 1850 mg/dl.' },
        ],
      },
      {
        prompt: 'Jaki defekt genetyczny najczęściej leży u podłoża rodzinnego zespołu chylomikronemii (Familial Chylomicronemia Syndrome, FCS)?',
        context: 'Choroba ujawnia się często w ciąży pod wpływem fizjologicznego wzrostu estrogenów.',
        options: [
          { text: 'Homozygotyczna mutacja genu lipazy lipoproteinowej (LPL) lub genu apolipoproteiny C-II (ApoC-II)', explanation: 'Brak aktywnego enzymu LPL całkowicie uniemożliwia klirens chylomikronów z łożyska naczyniowego.' },
          { text: 'Mutacja receptora insuliny w mięśniach szkieletowych', explanation: 'Mutacje receptora insuliny nie wywołują izolowanego bloku enzymu LPL.' },
        ],
      },
      {
        prompt: 'Jaka interwencja dietetyczna jest absolutną koniecznością w długoterminowym leczeniu pacjenta z zespołem FCS?',
        context: 'Chora pyta o zalecenia żywieniowe.',
        options: [
          { text: 'Rygorystyczna dieta niskotłuszczowa z ograniczeniem tłuszczu całkowitego do < 10–15% dobowego zapotrzebowania kalorycznego (< 20 g tłuszczu/d)', explanation: 'Ponieważ chylomikrony powstają wyłącznie z tłuszczu pokarmowego, restrykcja tłuszczu bezpośrednio eliminuje chylomikronemię.' },
          { text: 'Dieta ketogeniczna bogatotłuszczowa (80% kalorii z boczku i masła)', explanation: 'Dieta ketogeniczna wywołałaby skok triglicerydów do 10 000 mg/dl i zgon z powodu martwiczego OZT.' },
        ],
      },
      {
        prompt: 'Jaki nowoczesny lek będący antysensownym oligonukleotydem (ASO) przeciwko ApoC-III zarejestrowano w terapii zespołu FCS?',
        context: 'Terapia celowana RNA.',
        options: [
          { text: 'Volanesorsen (lub olezarsen)', explanation: 'Wyciszenie syntezy ApoC-III odblokowuje alternatywne drogi klirensu chylomikronów, redukując TG o 70–80%.' },
          { text: 'Hydrokortyzon w dawce substytucyjnej', explanation: 'Glikokortykosteroidy nasilają lipolizę i mogą podwyższać stężenie triglicerydów.' },
        ],
      },
    ],
  },
  {
    id: 'case-otylosc-nietolerancja-statyn-bempedonowy',
    lessonId: 'otylosc-farmakoterapia-hipolipemizujaca',
    title: 'Bóle mięśniowe (SAMS) po statynach i wdrożenie kwasu bempedonowego',
    patient: 'Mężczyzna, 64 lata',
    difficulty: 'Podstawowy',
    intro: 'Emeryt po przebytym zawale serca (angioplastyka LAD 6 miesięcy temu) skarży się na symetryczne bóle i osłabienie mięśni ud i ramion. Próbowano atorwastatyny i rosuwastatyny w różnych dawkach — objawy nawracały po 2 tygodniach.',
    steps: [
      {
        prompt: 'W badaniach: kinaza kreatynowa (CK) wynosi 480 U/l (norma < 190 U/l), LDL-C 142 mg/dl przy celu terapeutycznym < 55 mg/dl. Jakie rozpoznanie należy postawić?',
        context: 'Dolegliwości ustąpiły całkowicie 10 dni po próbnym odstawieniu statyny.',
        options: [
          { text: 'Objawy mięśniowe zależne od statyn (Statin-Associated Muscle Symptoms, SAMS) z umiarkowanym wzrostem CK', explanation: 'Nawracające bóle mięśniowe z podwyższeniem CK po różnych statynach definiują nietolerancję statyn.' },
          { text: 'Zaostrzenie reumatoidalnego zapalenia stawów', explanation: 'RZS dotyczy błony maziowej stawów rąk, a nie symetrycznych brzuśców mięśniowych z podwyższeniem CK.' },
        ],
      },
      {
        prompt: 'Jaki doustny lek hipolipemizujący hamujący biosyntezę cholesterolu powyżej reduktazy HMG-CoA nie wykazuje działania miotoksycznego w mięśniach?',
        context: 'Lek jest prolekiem aktywowanym wyłącznie w wątrobie.',
        options: [
          { text: 'Kwas bempedonowy (180 mg raz na dobę)', explanation: 'Brak enzymu aktywującego ACSVL1 w miocytach szkieletowych sprawia, że kwas bempedonowy nie indukuje miopatii.' },
          { text: 'Gemfibrozyl w skojarzeniu z simwastatyną', explanation: 'Skojarzenie gemfibrozylu ze statyną jest bezwzględnie przeciwwskazane ze względu na skrajne ryzyko rabdomiolizy.' },
        ],
      },
      {
        prompt: 'Jakie działanie niepożądane kwasu bempedonowego należy monitorować w badaniach biochemicznych krwi?',
        context: 'Pacjent chorował w przeszłości na podagrę.',
        options: [
          { text: 'Podwyższenie stężenia kwasu moczowego (hiperurykemię) i ryzyko napadu dny moczanowej', explanation: 'Kwas bempedonowy hamuje nerkowy transporter OAT2, zmniejszając wydalanie kwasu moczowego z moczem.' },
          { text: 'Ciężką hipokaliemię z groźnymi arytmiami komorowymi', explanation: 'Lek nie wpływa na gospodarkę potasową w nerkach.' },
        ],
      },
      {
        prompt: 'W celu osiągnięcia ambitnego celu LDL-C < 55 mg/dl u chorego po zawale z nietolerancją statyn optymalnym schematem nielipidowej terapii skojarzonej jest:',
        context: 'Planowanie terapii hipolipemizującej.',
        options: [
          { text: 'Kwas bempedonowy + Ezetymib + Inhibitor PCSK9 (np. ewolokumab lub inklisiran)', explanation: 'Takie potrójne skojarzenie pozwala obniżyć stężenie LDL-C o ponad 60–75% bez użycia statyny.' },
          { text: 'Suplementacja oleju lnianego 1 łyżka dziennie', explanation: 'Olej lniany nie obniża stężenia LDL-C o wymagane 60% u pacjenta wysokiego ryzyka po zawale.' },
        ],
      },
    ],
  },
  {
    id: 'case-otylosc-otylosc-sarkopeniczna-senior',
    lessonId: 'otylosc-klasyfikacja-fenotypy',
    title: 'Otyłość sarkopeniczna i upadki u 72-letniej pacjentki',
    patient: 'Kobieta, 72 lata',
    difficulty: 'Zaawansowany',
    intro: 'Kobieta w wieku 72 lat o masie 82 kg przy wzroście 156 cm (BMI 33,7 kg/m²) zostaje przyprowadzona przez córkę z powodu osłabienia, trudności ze wstawaniem z fotela i dwóch upadków w ciągu ostatnich 3 miesięcy.',
    steps: [
      {
        prompt: 'W badaniu siły mięśniowej dynamometrem ręcznym uzyskano wynik 14 kg (norma dla kobiet > 16 kg). Czas testu wstawania z krzesła (5-time chair stand) wynosi 17 sekund (norma < 15 s). Jaka patologia czynnościowa występuje u pacjentki?',
        context: 'Masa ciała pacjentki pozostawała stabilna przez ostatnie 5 lat.',
        options: [
          { text: 'Dynapenia (obniżona siła i sprawność mięśniowa) nasuwająca podejrzenie otyłości sarkopenicznej', explanation: 'Niska siła uścisku ręki i wydłużony czas testu krzesła są kluczowymi kryteriami przesiewowymi sarkopenii.' },
          { text: 'Zaawansowane stwardnienie rozsiane (SM)', explanation: 'Początek w 72. roku życia ze stabilną otyłością i symetrycznym osłabieniem to typowy obraz sarkopenii, a nie rzutu SM.' },
        ],
      },
      {
        prompt: 'Jakie badanie instrumentalne składu ciała pozwala precyzyjnie ocenić beztłuszczową masę mięśniową kończyn (wskaźnik ASMI) i potwierdzić otyłość sarkopeniczną?',
        context: 'Potwierdzenie fenotypu zaburzeń składu ciała.',
        options: [
          { text: 'Dwuenergetyczna absorpcjometria rentgenowska (DEXA) całego ciała lub bioimpedancja elektryczna (BIA)', explanation: 'DEXA wylicza wskaźnik beztłuszczowej masy mięśniowej kończyn do kwadratu wzrostu (ASMI < 5,5 kg/m² u kobiet).' },
          { text: 'Elektromiografia (EMG) nerwu twarzowego', explanation: 'EMG nerwu VII ocenia mięśnie mimiczne, nie ma zastosowania w diagnostyce sarkopenii kończyn.' },
        ],
      },
      {
        prompt: 'Dlaczego wdrożenie restrykcyjnej diety redukcyjnej (np. 800 kcal/dobę) bez odpowiedniego nadzoru byłoby skrajnie niebezpieczne u tej pacjentki?',
        context: 'Ryzyko uogólnionej niesprawności u seniora.',
        options: [
          { text: 'Gwałtowny deficyt kaloryczny pogłębiłby ubytek masy mięśniowej i gęstości kości, zwiększając ryzyko złamań i trwałego unieruchomienia', explanation: 'U seniorów utrata białka mięśniowego grozi całkowitą utratą samodzielności (zespół kruchości — frailty syndrome).' },
          { text: 'Spowodowałoby to natychmiastowe zrośnięcie zastawek serca', explanation: 'Restrykcja kaloryczna nie wywołuje mechanicznego zrastania zastawek.' },
        ],
      },
      {
        prompt: 'Jaki program postępowania interdyscyplinarnego jest optymalny u pacjentki z otyłością sarkopeniczną?',
        context: 'Kompleksowa opieka geriatryczno-endokrynologiczna.',
        options: [
          { text: 'Progresywny trening oporowy (siłowy) pod okiem fizjoterapeuty, podaż białka 1,2–1,5 g/kg/d, suplementacja witaminy D oraz umiarkowany deficyt kalorii', explanation: 'Trening siłowy stymuluje resyntezę włókien mięśniowych typu II, a białko dostarcza aminokwasów rozgałęzionych (BCAA).' },
          { text: 'Zalecenie leżenia w łóżku i unikania jakiegokolwiek ruchu', explanation: 'Hipokinezja jest najsilniejszym motorem atrofii mięśniowej u osób starszych.' },
        ],
      },
    ],
  },
  {
    id: 'case-otylosc-zespol-pickwicka-ohs',
    lessonId: 'otylosc-powiklania-sercowo-oddechowe',
    title: 'Sinica, senność dzienna i hiperkapnia w zespole Pickwicka (OHS)',
    patient: 'Mężczyzna, 56 lat',
    difficulty: 'Zaawansowany',
    intro: 'Kierowca autobusu miejskiego o masie 144 kg przy wzroście 174 cm (BMI 47,6 kg/m²) zgłasza się z powodu narastającej senności dziennej (zasypia na światłach), porannych bólów głowy i obrzęków podudzi.',
    steps: [
      {
        prompt: 'W badaniu fizykalnym: sinica warg, obwód szyi 48 cm, tachykardia 102/min, saturacja krwi SpO2 84% w spoczynku przy oddychaniu powietrzem atmosferycznym. Jakie badanie krwi należy wykonać natychmiast?',
        context: 'Pilna diagnostyka niewydolności oddechowej.',
        options: [
          { text: 'Gazometria krwi tętniczej (lub arterializowanej włośniczkowej)', explanation: 'Gazometria jest jedynym badaniem pozwalającym zmierzyć ciśnienie parcjalne CO2 i rozpoznać zespół hipowentylacji.' },
          { text: 'Badanie kału na krew utajoną', explanation: 'Krew utajona diagnozuje krwawienia z przewodu pokarmowego, nie ma znaczenia w ostrej duszności.' },
        ],
      },
      {
        prompt: 'Wyniki gazometrii krwi tętniczej: pH 7,36, PaO2 54 mmHg, PaCO2 56 mmHg, HCO3- 32 mmol/l. Jaka jest interpretacja tego wyniku?',
        context: 'PaCO2 przekracza 45 mmHg w spoczynku w ciągu dnia.',
        options: [
          { text: 'Przewlekła skompensowana kwasica oddechowa (dzienna hiperkapnia) potwierdzająca zespół hipowentylacji w otyłości (OHS, zespół Pickwicka)', explanation: 'Retencja PaCO2 >= 45 mmHg z nerkową kompensacją wodorowęglanową (HCO3- > 27) definiuje OHS.' },
          { text: 'Ostra zasadowica oddechowa wywołana napadem paniki z hiperwentylacją', explanation: 'W hiperwentylacji PaCO2 spada poniżej 35 mmHg, a pH rośnie powyżej 7,45.' },
        ],
      },
      {
        prompt: 'W echokardiografii stwierdzono poszerzenie prawej komory serca oraz cechy nadciśnienia płucnego (RVSP 55 mmHg). Jaki mechanizm doprowadził do rozwoju serca płucnego (cor pulmonale)?',
        context: 'Powikłania naczyniowe przewlekłej hipoksji.',
        options: [
          { text: 'Przewlekła hipoksemia pęcherzykowa wywołała odruchowy skurcz tętniczek płucnych (odruch Eulera-Liljestranda) i przebudowę naczyń płucnych', explanation: 'Hipoksyczny skurcz naczyń płucnych zwiększa opór płucny i prowadzi do przeciążenia i niewydolności prawej komory.' },
          { text: 'Niedomykalność zastawki aortalnej wskutek gorączki reumatycznej', explanation: 'Serce płucne wynika ze zmian w krążeniu małym wywołanych hipowentylacją płuc.' },
        ],
      },
      {
        prompt: 'Jakie leczenie wspomagające oddychanie należy wdrożyć w pierwszej kolejności u tego chorego?',
        context: 'Wybór właściwego trybu wentylacji nieinwazyjnej.',
        options: [
          { text: 'Nieinwazyjna wentylacja dodatnim ciśnieniem (NIV w trybie BiPAP lub CPAP po badaniu miareczkowania ciśnień)', explanation: 'NIV usuwa bezdechy senne, wspomaga objętość oddechową i eliminuje nadmiar dwutlenku węgla z ustroju.' },
          { text: 'Bierna tlenoterapia wąsami tlenowymi (5 l/min) bez aparatu ciśnieniowego', explanation: 'Podanie czystego tlenu bez wsparcia wentylacyjnego u chorych z OHS znosi napęd hipoksyczny i grozi śmiertelną śpiączką hiperkapniczną.' },
        ],
      },
    ],
  },
  {
    id: 'case-otylosc-bupropion-naltrekson',
    lessonId: 'otylosc-leki-nieinkretynowe',
    title: 'Napadowe objadanie się i głód hedoniczny leczony bupropionem/naltreksonem',
    patient: 'Kobieta, 44 lata',
    difficulty: 'Podstawowy',
    intro: 'Księgowa o masie 92 kg przy wzroście 168 cm (BMI 32,6 kg/m²) zgłasza nasilone napady jedzenia słodyczy i przekąsek wieczorami w odpowiedzi na stres w pracy (emotional eating). Ciśnienie tętnicze 125/80 mmHg, brak napadów drgawkowych w wywiadzie.',
    steps: [
      {
        prompt: 'Pacjentka odczuwa silny głód hedoniczny (food cravings) przy braku cech zespołu metabolicznego. Jaki lek doustny działający na układ nagrody i ośrodek głodu w podwzgórzu można zaproponować?',
        context: 'Pacjentka boi się iniekcji podskórnych i preferuje tabletki.',
        options: [
          { text: 'Preparat złożony bupropionu z naltreksonem (Mysimba) w schemacie stopniowej eskalacji dawki do 2 tabletek 2 razy dziennie', explanation: 'Lek łączy stymulację neuronów POMC z modulacją dopaminergicznego układu nagrody, wygaszając kompulsywne łaknienie słodyczy.' },
          { text: 'Insulina izofanowa przed snem', explanation: 'Insulina wywołałaby hipoglikemię i wilczy głód, pogarszając stan chorej.' },
        ],
      },
      {
        prompt: 'W jaki sposób należy miareczkować dawkę leku bupropion/naltrekson w pierwszych tygodniach leczenia?',
        context: 'Zasady bezpiecznego wprowadzania preparatu Mysimba.',
        options: [
          { text: 'Zwiększać dawkę o 1 tabletkę co tydzień (1-0-0 w 1. tyg., 1-0-1 w 2. tyg., 2-0-1 w 3. tyg., docelowo 2-0-2 w 4. tygodniu)', explanation: 'Czterotygodniowa eskalacja minimalizuje nudności, bezsenność i bóle głowy.' },
          { text: 'Rozpocząć od razu od 6 tabletek na dobę', explanation: 'Pominięcie miareczkowania grozi drgawkami i ciężkimi zaburzeniami żołądkowo-jelitowymi.' },
        ],
      },
      {
        prompt: 'Jaki parametr fizykalny należy bezwzględnie kontrolować podczas każdej wizyty kontrolnej u pacjentki przyjmującej bupropion z naltreksonem?',
        context: 'Wpływ bupropionu na układ adrenergiczny.',
        options: [
          { text: 'Ciśnienie tętnicze krwi oraz częstość akcji serca (tętno)', explanation: 'Bupropion zwiększa stężenie noradrenaliny w synapsach, co może podwyższać ciśnienie krwi i wywoływać tachykardię.' },
          { text: 'Pole widzenia metodą perymetrii statycznej', explanation: 'Lek nie uszkadza nerwu wzrokowego ani skrzyżowania wzrokowego.' },
        ],
      },
      {
        prompt: 'Podczas wizyty kontrolnej po 16 tygodniach na pełnej dawce pacjentka schudła zaledwie 1,5 kg (ubytek 1,6% wyjściowej masy ciała). Jakie postępowanie jest zgodne z wytycznymi?',
        context: 'Ocena skuteczności terapii (tzw. reguła 5%).',
        options: [
          { text: 'Odstawić bupropion z naltreksonem z powodu braku odpowiedzi (non-responder < 5% ubytku wagi po 16 tyg.) i zmienić terapię na analog inkretynowy', explanation: 'Zgodnie z ChPL brak redukcji masy ciała o >= 5% po 16 tygodniach nakazuje przerwanie nieskutecznego leczenia.' },
          { text: 'Podwoić dawkę leku do 8 tabletek na dobę', explanation: 'Przekroczenie dawki maksymalnej 4 tabletek na dobę stwarza wysokie ryzyko napadu drgawkowego.' },
        ],
      },
    ],
  },
  {
    id: 'case-otylosc-dyslipidemia-mieszana-cukrzyca',
    lessonId: 'otylosc-zespol-metaboliczny',
    title: 'Aterogenna dyslipidemia cukrzycowa i formuła Sampsona',
    patient: 'Mężczyzna, 50 lat',
    difficulty: 'Zaawansowany',
    intro: 'Mężczyzna z otyłością brzuszną i cukrzycą typu 2 (HbA1c 7,9%) zgłasza się z wynikiem lipidogramu: cholesterol całkowity 260 mg/dl, HDL 32 mg/dl, triglicerydy 520 mg/dl.',
    steps: [
      {
        prompt: 'Laboratorium nie podało stężenia LDL-C, zamieszczając adnotację: triglicerydy > 400 mg/dl, formuła Friedewalda niemiarodajna. Jaka nowoczesna formuła pozwala precyzyjnie oszacować LDL-C?',
        context: 'Triglicerydy w zakresie 400–800 mg/dl.',
        options: [
          { text: 'Formuła Sampsona (NIH Equation 2)', explanation: 'Wzór Sampsona oparty na regresji wielomianowej zachowuje dokładność przy TG do 800 mg/dl.' },
          { text: 'Formuła Cockcrofta-Gaulta', explanation: 'Wzór Cockcrofta-Gaulta szacuje klirens kreatyniny, nie stężenie lipidów.' },
        ],
      },
      {
        prompt: 'Jaki parametr lipidowy można natychmiast wyliczyć z podanych danych bez żadnego błędu matematycznego, odejmując HDL od cholesterolu całkowitego?',
        context: 'Ocena całkowitego ładunku aterogennego.',
        options: [
          { text: 'Cholesterol non-HDL (non-HDL-C = 260 - 32 = 228 mg/dl)', explanation: 'Non-HDL obejmuje cholesterol we wszystkich cząstkach zawierających ApoB (LDL, VLDL, IDL, remnanty) i nie zależy od triglicerydów.' },
          { text: 'Stężenie wolnych kwasów tłuszczowych', explanation: 'WKT wymagają odrębnego oznaczenia laboratoryjnego.' },
        ],
      },
      {
        prompt: 'Jaka patofizjologia odpowiada za obniżenie stężenia ochronnego cholesterolu HDL u tego pacjenta?',
        context: 'Wymiana lipidów między VLDL a HDL.',
        options: [
          { text: 'Aktywność białka CETP przenoszącego triglicerydy z bogatych cząstek VLDL na cząstki HDL, co ułatwia ich degradację przez lipazę wątrobową', explanation: 'Cząstki HDL wzbogacone w triglicerydy stają się niestabilne i są szybko eliminowane przez nerki.' },
          { text: 'Autoimmunologiczne niszczenie apolipoproteiny A-1 przez autoprzeciwciała', explanation: 'Dyslipidemia cukrzycowa nie jest chorobą autoimmunologiczną.' },
        ],
      },
      {
        prompt: 'Jakie postępowanie farmakologiczne należy wdrożyć w pierwszej kolejności u tego chorego z bardzo wysokim ryzykiem sercowo-naczyniowym?',
        context: 'Priorytet wytycznych ESC/EAS 2023.',
        options: [
          { text: 'Wdrożyć statynę o wysokiej intensywności (np. atorwastatyna 40–80 mg) w celu redukcji cząstek ApoB, optymalizując kontrolę glikemii', explanation: 'Statyna jest lekiem pierwszego rzutu; obniża również triglicerydy o 15–30% i drastycznie redukuje ryzyko zawału serca.' },
          { text: 'Podać wyłącznie suplement kwasów omega-3 w dawce 500 mg', explanation: 'Niska dawka kwasów omega-3 nie zastąpi statyny w prewencji powikłań miażdżycowych.' },
        ],
      },
    ],
  },
  {
    id: 'case-otylosc-efekt-jojo-utrata-ffm',
    lessonId: 'otylosc-strategia-terapeutyczna',
    title: 'Drastyczna dieta niskokaloryczna, spadek BMR i powrót masy ciała',
    patient: 'Mężczyzna, 40 lat',
    difficulty: 'Podstawowy',
    intro: 'Mężczyzna w wieku 40 lat zredukował masę ciała ze 115 kg do 88 kg w ciągu 4 miesięcy stosując restrykcyjną dietę kapuścianą (VLCD < 800 kcal/d). Po powrocie do zwykłego żywienia w ciągu roku przytył do 122 kg.',
    steps: [
      {
        prompt: 'Dlaczego pacjent odzyskał całą utraconą masę ciała z nadwyżką (efekt jojo), pomimo że nie przekraczał swojego dawnego zapotrzebowania kalorycznego?',
        context: 'Analiza spoczynkowego metabolizmu.',
        options: [
          { text: 'Gwałtowny ubytek beztłuszczowej masy mięśniowej (FFM) oraz adaptacja metaboliczna obniżyły BMR o ponad 500 kcal/dobę poniżej normy', explanation: 'Organizm w stanie adaptacji metabolicznej spala znacznie mniej kalorii, co sprawia, że nawet umiarkowana dieta prowadzi do nadwyżki energetycznej.' },
          { text: 'Dieta kapuściana wywołała mutację genu receptora melanokortyny 4', explanation: 'Dieta nie indukuje somatycznych mutacji monogenowych w genie MC4R.' },
        ],
      },
      {
        prompt: 'Jaki hormon tkanki tłuszczowej spadł do skrajnie niskich wartości podczas drastycznego odchudzania, generując podwzgórzowy napęd głodu?',
        context: 'Stężenie hormonu sytości.',
        options: [
          { text: 'Leptyna', explanation: 'Gwałtowny spadek leptyny wyłącza neurony POMC i aktywuje neurony AgRP/NPY, wywołując wilczy apetyt.' },
          { text: 'Insulina glargine', explanation: 'Insulina glargine to lek egzogenny, a nie endogenna adipokina tkanki tłuszczowej.' },
        ],
      },
      {
        prompt: 'Jakie tempo redukcji masy ciała jest uznawane za fizjologicznie bezpieczne i chroniące przed nadmierną utratą masy mięśniowej?',
        context: 'Zalecenia EASO i Polskiego Towarzystwa Leczenia Otyłości.',
        options: [
          { text: 'Umiarkowany deficyt kaloryczny (500–750 kcal/d) zapewniający ubytek 0,5–1,0 kg na tydzień (około 2–4 kg na miesiąc)', explanation: 'Stopniowa redukcja pozwala na adaptację układu nerwowego i minimalizuje katabolizm białek mięśniowych.' },
          { text: 'Głodówka całkowita z ubytkiem 10 kg na tydzień', explanation: 'Głodówki całkowite prowadzą do kwasicy ketonowej, zaburzeń elektrolitowych i utraty mięśni.' },
        ],
      },
      {
        prompt: 'W jaki sposób współczesna medycyna definiuje chorobę otyłościową w odniesieniu do zjawiska nawrotu masy ciała?',
        context: 'Koncepcja przewlekłej choroby nawrotowej.',
        options: [
          { text: 'Jako chorobę przewlekłą o podłożu neurohormonalnym z tendencją do nawrotów, wymagającą stałego wsparcia i często bezterminowej farmakoterapii', explanation: 'Otyłość nie jest defektem silnej woli, lecz chorobą regulacji bilansu energii, podobnie jak nadciśnienie wymaga przewlekłego leczenia.' },
          { text: 'Jako przejściowy błąd dietetyczny, który po jednorazowym schudnięciu nigdy nie powinien powrócić', explanation: 'Takie podejście prowadzi do stygmatyzacji pacjentów i ignoruje neurobiologię regulacji masy ciała.' },
        ],
      },
    ],
  },
];
