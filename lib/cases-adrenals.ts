import type { ClinicalCase } from './cases.ts';

type Choice = [string, string];
type StepDraft = [string, string, Choice, Choice];

const step = (context: string, prompt: string, correct: Choice, wrong: Choice): StepDraft => [
  context,
  prompt,
  correct,
  wrong,
];

const make = (
  lessonId: string,
  title: string,
  patient: string,
  difficulty: ClinicalCase['difficulty'],
  intro: string,
  steps: StepDraft[]
): ClinicalCase => ({
  id: `case-${lessonId}`,
  lessonId,
  title,
  patient,
  difficulty,
  intro,
  steps: steps.map(([context, prompt, correct, wrong], i) => ({
    id: `case-${lessonId}-${i + 1}`,
    lessonId,
    stage: ['Objawy', 'Badania', 'Rozpoznanie', 'Postępowanie'][i],
    context,
    prompt,
    answer: i % 2,
    options: (i % 2 ? [wrong, correct] : [correct, wrong]).map(([text, explanation]) => ({
      text,
      explanation,
    })),
  })),
});

export const adrenalCases: ClinicalCase[] = [
  make(
    'nadnercza-anatomia',
    'Przypadkowy guz a naczynia',
    'Kobieta, 54 lata',
    'Podstawowy',
    'W tomografii jamy brzusznej wykonanej z powodu kamicy nerkowej uwidoczniono guz prawego nadnercza 4,2 cm.',
    [
      step(
        'Pacjentka jest bezobjawowa, ciśnienie 125/80 mmHg. Planowana jest konsultacja chirurgiczna.',
        'Jaki aspekt anatomiczny prawego nadnercza stwarza największe ryzyko krwawienia podczas operacji?',
        [
          'Krótka prawa żyła nadnerczowa uchodząca bezpośrednio do żyły głównej dolnej (VCI)',
          'Przypadkowe naderwanie tego naczynia grozi gwałtownym, trudnym do zaopatrzenia krwawieniem żylnym.',
        ],
        [
          'Połączenie prawego nadnercza z przewodem trzustkowym',
          'Nadnercza nie mają żadnego połączenia anatomicznego z drogami trzustkowymi.',
        ]
      ),
      step(
        'W badaniach laboratoryjnych: sód 140 mmol/l, potas 4,2 mmol/l. Zlecono panel hormonalny.',
        'Która strefa kory nadnerczy odpowiada za produkcję mineralokortykosteroidów (aldosteronu)?',
        [
          'Strefa kłębuszkowa (zona glomerulosa — ZG)',
          'Jest to najbardziej zewnętrzna strefa kory, regulowana głównie przez układ RAA i stężenie potasu.',
        ],
        [
          'Strefa siatkowata (zona reticularis — ZR)',
          'Strefa siatkowata wytwarza androgeny nadnerczowe, a nie aldosteron.',
        ]
      ),
      step(
        'W badaniu TK zmiana ma jednorodną strukturę, a badania hormonalne są prawidłowe.',
        'Do której żyły uchodziłby spływ żylny, gdyby guz znajdował się w lewym nadnerczu?',
        [
          'Do lewej żyły nerkowej',
          'Lewa żyła nadnerczowa jest dłuższa i uchodzi typowo do lewej żyły nerkowej, często z żyłą przeponową.',
        ],
        [
          'Bezpośrednio do aorty brzusznej',
          'Żyły drenują krew do układu żylnego, a nie do aorty tętniczej.',
        ]
      ),
      step(
        'Chora zostaje zakwalifikowana do planowej laparoskopii.',
        'Jaka technika chirurgiczna jest preferowana w łagodnych nieczynnych guzach nadnercza tej wielkości?',
        [
          'Małoinwazyjna laparoskopowa adrenalektomia',
          'Zapewnia małą inwazyjność i szybki powrót do pełnej aktywności życiowej.',
        ],
        [
          'Rozległa torakolaparotomia z resekcją przepony',
          'Dostęp ten rezerwuje się wyłącznie dla olbrzymich guzów złośliwych naciekających sąsiednie narządy.',
        ]
      ),
    ]
  ),

  make(
    'nadnercza-diagnostyka',
    'Przewlekłe zmęczenie to za mało',
    'Mężczyzna, 36 lat',
    'Podstawowy',
    'Pacjent zgłasza od 4 miesięcy narastające osłabienie, spadek masy ciała o 5 kg i zasłabnięcia przy wstawaniu.',
    [
      step(
        'Ciśnienie tętnicze na leżąco 105/65 mmHg, po pionizacji 85/55 mmHg (hipotensja ortostatyczna).',
        'Jakie wstępne badanie hormonalne jest najbardziej przydatne rano w diagnostyce niedoczynności kory?',
        [
          'Poranne stężenie kortyzolu w surowicy krwi (o godz. 8:00)',
          'Wartość <3 µg/dl silnie sugeruje niedoczynność, podczas gdy >15–18 µg/dl praktycznie ją wyklucza.',
        ],
        [
          'Pojedynczy pomiar stężenia glukozy o godzinie 17:00',
          'Popołudniowa glukoza nie diagnozuje rezerwy wydzielniczej kory nadnerczy.',
        ]
      ),
      step(
        'Kortyzol o 8:00 rano wynosi 6,8 µg/dl (strefa niepewności diagnostycznej 3–15 µg/dl).',
        'Jaki test dynamiczny stanowi złoty standard potwierdzenia niedoczynności kory nadnerczy?',
        [
          'Test stymulacji syntetycznym ACTH (Synacthen 250 µg)',
          'Ocenia maksymalną rezerwę wydzielniczą kory nadnerczy w 30. i 60. minucie od podania.',
        ],
        [
          'Doustny test obciążenia 75 g glukozy',
          'OGTT służy do diagnostyki cukrzycy lub akromegalii, a nie niedoczynności kory nadnerczy.',
        ]
      ),
      step(
        'W teście z Synacthenem stężenie kortyzolu wynosi: 0\' — 6,8 µg/dl, 30\' — 9,1 µg/dl, 60\' — 10,4 µg/dl.',
        'Jak interpretujesz tę odpowiedź kory nadnerczy?',
        [
          'Niewydolność kory nadnerczy (brak osiągnięcia wymaganego stężenia >=18 µg/dl)',
          'Prawidłowa kora nadnerczy powinna po stymulacji przekroczyć próg 18 µg/dl (500 nmol/l).',
        ],
        [
          'Prawidłowa rezerwa sterydogenezy',
          'Wartość 10,4 µg/dl jest zdecydowanie poniżej normy i potwierdza hipokortyzolemię.',
        ]
      ),
      step(
        'Potwierdzono hipokortyzolemię. Stężenie ACTH w osoczu pobranym rano wynosi 480 pg/ml (norma 10–60).',
        'Jaki jest kolejny krok w bezpiecznym prowadzeniu pacjenta?',
        [
          'Rozpoznanie pierwotnej niedoczynności kory nadnerczy i wdrożenie hydrokortyzonu z fludrokortyzonem',
          'Wysokie ACTH przy braku odpowiedzi kortyzolu jednoznacznie wskazuje na uszkodzenie samych nadnerczy.',
        ],
        [
          'Skierowanie na operację wycięcia przysadki',
          'Przysadka jest zdrowa i prawidłowo kompensuje brak kortyzolu masowym wydzielaniem ACTH.',
        ]
      ),
    ]
  ),

  make(
    'addison-choroba',
    'Brązowe dłonie i apetyt na sól',
    'Kobieta, 29 lat',
    'Zaawansowany',
    'Młoda kobieta zgłasza postępujące od pół roku osłabienie, nudności, chęć jedzenia soli i ciemnienie skóry.',
    [
      step(
        'W badaniu fizykalnym: brunatne przebarwienia zgięć dłoniowych, otoczek brodawek i błony śluzowej policzków.',
        'Jaki jest mechanizm powstawania melanodermii w chorobie Addisona?',
        [
          'Niedobór kortyzolu odhamowuje przysadkowy ACTH i POMC, które aktywują receptory MC1R na melanocytach',
          'Nadmiar tych peptydów stymuluje melanogenezę w skórze i błonach śluzowych.',
        ],
        [
          'Odkładanie się kryształów kwasu moczowego w naskórku',
          'Kwas moczowy wywołuje dnę moczanową w stawach, a nie przebarwienia skóry.',
        ]
      ),
      step(
        'Jonogram: Sód 124 mmol/l (norma 135–145), Potas 5,8 mmol/l (norma 3,5–5,1). Mocznik podwyższony.',
        'Z czego wynika charakterystyczna hiponatremia ze współistniejącą hiperkaliemią?',
        [
          'Ze zniszczenia strefy kłębuszkowej i braku aldosteronu, co upośledza wydalanie potasu i zatrzymywanie sodu',
          'Utrata obu hormonów kory definiuje pierwotny charakter uszkodzenia.',
        ],
        [
          'Z nadmiernego wydzielania wazopresyny przez tylny płat przysadki',
          'Choć wazopresyna może wzrosnąć w hipowolemii, pierwotną przyczyną hiperkaliemii jest brak aldosteronu.',
        ]
      ),
      step(
        'Przeciwciała przeciwko 21-hydroksylazie (anty-21-OH) są wybitnie dodatnie.',
        'Jakie jest ostateczne rozpoznanie etiologiczne?',
        [
          'Autoimmunologiczne zapalenie kory nadnerczy (choroba Addisona)',
          'Anty-21-OH to swoisty marker autoimmunologicznego niszczenia kory nadnerczy.',
        ],
        [
          'Gruźlica obu nadnerczy',
          'Gruźlica daje zwapnienia w TK i nie wiąże się z obecnością przeciwciał anty-21-OH.',
        ]
      ),
      step(
        'Wdrażasz leczenie: hydrokortyzon 15 mg rano + 5 mg popołudniu oraz fludrokortyzon 0,1 mg rano.',
        'O jakiej zasadzie bezpieczeństwa („sick day rules”) musisz bezwzględnie pouczyć pacjentkę?',
        [
          'W razie gorączki >38°C lub ciężkiej infekcji należy natychmiast podwoić dawkę doustną hydrokortyzonu',
          'Zapobiega to rozwojowi ostrego, śmiertelnego przełomu nadnerczowego w warunkach stresu.',
        ],
        [
          'W trakcie infekcji należy odstawić hydrokortyzon na 3 dni',
          'Odstawienie sterydu w infekcji doprowadzi do natychmiastowego przełomu i zgonu.',
        ]
      ),
    ]
  ),

  make(
    'niedoczynnosc-wtorna',
    'Uśpione po sterydach',
    'Mężczyzna, 48 lat',
    'Zaawansowany',
    'Chory na ciężką postać astmy oskrzelowej nagle z dnia na dzień odstawił przyjmowany od roku prednizon 20 mg/d.',
    [
      step(
        'Po 5 dniach od odstawienia trafił do izby przyjęć z ciężkim osłabieniem, nudnościami i hipotensją 90/60 mmHg.',
        'Dlaczego u chorego nie stwierdza się żadnych przebarwień skóry ani błon śluzowych („blady Addison”)?',
        [
          'Egzogenne sterydy zablokowały przysadkę — stężenie ACTH i POMC jest skrajnie niskie',
          'Brak stymulacji receptorów MC1R przez ACTH skutkuje bladym odcieniem powłok skórnych.',
        ],
        [
          'Melanocyty uległy zniszczeniu przez prednizon',
          'Prednizon nie niszczy komórek barwnikowych skóry.',
        ]
      ),
      step(
        'Badania laboratoryjne: sód 136 mmol/l (norma), potas 4,1 mmol/l (norma), glikemia 68 mg/dl, kortyzol 1,1 µg/dl.',
        'Dlaczego u tego pacjenta stężenie potasu i sodu pozostaje całkowicie prawidłowe?',
        [
          'Strefa kłębuszkowa jest sprawna — produkcja aldosteronu zależy od układu RAA, a nie od ACTH',
          'Prawidłowy aldosteron chroni chorego przed hiperkaliemią i utratą sodu.',
        ],
        [
          'Astma oskrzelowa zapobiega wydalaniu potasu przez nerki',
          'Choroby układu oddechowego nie regulują bezpośrednio cewkowego transportu potasu.',
        ]
      ),
      step(
        'Stwierdzasz ostrą wtórną niedoczynność kory nadnerczy w przebiegu nagłego odstawienia sterydoterapii.',
        'Czy pacjent wymaga włączenia fludrokortyzonu?',
        [
          'Nie, fludrokortyzon jest zbędny, ponieważ wydzielanie aldosteronu jest w pełni zachowane',
          'Podanie mineralokortykosteroidu przy sprawnym RAA wywołałoby niepożądane obrzęki i nadciśnienie.',
        ],
        [
          'Tak, fludrokortyzon jest lekiem pierwszego rzutu u każdego z niskim kortyzolem',
          'Fludrokortyzon podaje się wyłącznie w pierwotnej niedoczynności nadnerczy.',
        ]
      ),
      step(
        'Podajesz dożylnie hydrokortyzon, uzyskując szybką poprawę samopoczucia i normalizację ciśnienia.',
        'Jaki jest prawidłowy schemat dalszego postępowania po ustabilizowaniu stanu ostrego?',
        [
          'Powrót do fizjologicznego ekwiwalentu sterydu i bardzo powolne, stopniowe redukowanie dawki przez miesiące',
          'Pozwala to na powolną regenerację uśpionej osi podwzgórze-przysadka-nadnercza.',
        ],
        [
          'Natychmiastowe definitywne odstawienie wszelkich sterydów',
          'Ponowne odstawienie natychmiast wywoła nawrót zapaści naczyniowej.',
        ]
      ),
    ]
  ),

  make(
    'wpn-zespol',
    'Trądzik, hirsutyzm i nieregularne cykle',
    'Kobieta, 22 lata',
    'Podstawowy',
    'Młoda kobieta zgłasza się z powodu nasilonego trądziku opornego na antybiotyki, hirsutyzmu i rzadkich miesiączek.',
    [
      step(
        'W badaniu: owłosienie typu męskiego (skala Ferrimana-Gallweya 12 pkt), łysienie skroniowe, brak cech Cushinga.',
        'Niedobór którego enzymu odpowiada za ponad 90–95% przypadków wrodzonego przerostu nadnerczy (WPN)?',
        [
          '21-hydroksylazy (kodowanej przez gen CYP21A2)',
          'Defekt tego enzymu blokuje powstawanie kortyzolu i aldosteronu, kierując prekursory w szlak androgenów.',
        ],
        [
          'Aromatazy łożyskowej',
          'Aromataza przekształca androgeny w estrogeny; jej niedobór nie stanowi etiologii WPN.',
        ]
      ),
      step(
        'Ginekolog wysunął podejrzenie zespołu policystycznych jajników (PCOS), lecz zlecił diagnostykę różnicową.',
        'Jaki marker biochemiczny oznaczany rano w fazie folikularnej służy do przesiewu w kierunku nieklasycznego WPN?',
        [
          '17-hydroksyprogesteron (17-OHP)',
          'Nagromadzenie 17-OHP powyżej bloku enzymatycznego 21-hydroksylazy jest kluczowym wskaźnikiem choroby.',
        ],
        [
          'Hormon tyreotropowy (TSH)',
          'TSH ocenia tarczycę, nie odzwierciedla bloku 21-hydroksylazy.',
        ]
      ),
      step(
        'Poranny 17-OHP wynosi 4,2 ng/ml (>2 ng/ml). Wykonano test stymulacji 250 µg Synacthenu.',
        'Jaki wynik stężenia 17-OHP w 60. minucie testu jednoznacznie potwierdza rozpoznanie nieklasycznego WPN?',
        [
          'Wyrzut 17-OHP przekraczający 10 ng/ml (30 nmol/l)',
          'Wartość ta stanowi międzynarodowe kryterium diagnostyczne NC-CAH wg wytycznych Endocrine Society.',
        ],
        [
          'Spadek 17-OHP do wartości zerowej',
          'Stymulacja ACTH gwałtownie nasila gromadzenie substratu przed blokiem, a nie go obniża.',
        ]
      ),
      step(
        'U pacjentki 17-OHP po Synacthenie wzrasta do 18,5 ng/ml. Potwierdzono nieklasyczny WPN (NC-CAH).',
        'Jaki jest mechanizm terapeutyczny zastosowania małych dawek hydrokortyzonu u tej chorej?',
        [
          'Hamowanie wydzielania przysadkowego ACTH na drodze ujemnego sprzężenia, co redukuje nadprodukcję androgenów',
          'Zmniejszenie stymulacji kory nadnerczy powoduje cofanie się hirsutyzmu i powrót owulacji.',
        ],
        [
          'Bezpośrednie niszczenie komórek jajnika',
          'Hydrokortyzon działa na oś przysadkowo-nadnerczową, nie uszkadza jajników.',
        ]
      ),
    ]
  ),

  make(
    'cushing-nadnerczowy',
    'Guz, który uśpił drugie nadnercze',
    'Kobieta, 41 lat',
    'Zaawansowany',
    'Chora zgłasza przyrost masy ciała o 14 kg w 8 miesięcy, zaokrąglenie twarzy, purpurowe rozstępy i osłabienie nóg.',
    [
      step(
        'W badaniu: twarz księżycowata, bawoli kark, szerokie (>1 cm) sine rozstępy na brzuchu, trudność we wstawaniu z krzesła.',
        'Jaki test przesiewowy pierwszego rzutu należy wykonać w celu potwierdzenia hiperkortyzolemii?',
        [
          'Nocny test hamowania 1 mg deksametazonu (lub dobowe wydalanie wolnego kortyzolu w moczu UFC)',
          'Brak supresji kortyzolu rano >=1,8 µg/dl (50 nmol/l) potwierdza autonomiczną hiperkortyzolemię.',
        ],
        [
          'Pojedynczy pomiar stężenia aldosteronu w surowicy',
          'Aldosteron nie diagnozuje zespołu Cushinga.',
        ]
      ),
      step(
        'Kortyzol po 1 mg DEX wynosi 14,2 µg/dl (brak hamowania). Stężenie ACTH w osoczu wynosi <1,5 pg/ml (stłumione).',
        'Gdzie zlokalizowana jest przyczyna hiperkortyzolizmu u tej pacjentki?',
        [
          'W korze nadnercza (postać ACTH-niezależna, autonomiczny guz nadnerczowy)',
          'Autonomiczna nadprodukcja kortyzolu całkowicie wyłącza wydzielanie ACTH przez przysadkę.',
        ],
        [
          'W przednim płacie przysadki mózgowej (choroba Cushinga)',
          'W chorobie przysadkowej ACTH byłoby wysokie lub nieadekwatnie prawidłowe (>15–20 pg/ml).',
        ]
      ),
      step(
        'W tomografii komputerowej stwierdzono pojedynczy guz lewego nadnercza 3,4 cm o cechach łagodnego gruczolaka.',
        'W jakim stanie anatomicznym i czynnościowym znajduje się prawe (przeciwległe) nadnercze?',
        [
          'Jest w stanie głębokiej atrofii z powodu przewlekłego braku stymulacji przysadkowym ACTH',
          'Brak troficznego wpływu ACTH powoduje zanik strefy pasmowatej i siatkowatej zdrowego gruczołu.',
        ],
        [
          'Jest patologicznie powiększone i produkuje potrójną dawkę hormonów',
          'Prawe nadnercze jest uśpione ujemnym sprzężeniem zwrotnym.',
        ]
      ),
      step(
        'Pacjentka zostaje zakwalifikowana do laparoskopowej adrenalektomii lewostronnej.',
        'Jakie zabezpieczenie farmakologiczne jest bezwzględnie konieczne w okresie okołooperacyjnym?',
        [
          'Dożylna osłona hydrokortyzonem w trakcie zabiegu i po nim, aby zapobiec ostremu przełomowi nadnerczowemu',
          'Usunięcie jedynego czynnego źródła kortyzolu przy zanikłym drugim nadnerczu wymaga natychmiastowej substytucji.',
        ],
        [
          'Wlewy potasu i odstawienie wszelkich sterydów',
          'Brak podania hydrokortyzonu doprowadziłby do zapaści naczyniowej i zgonu pacjentki.',
        ]
      ),
    ]
  ),

  make(
    'zespol-conna',
    'Oporne nadciśnienie z prawidłowym potasem',
    'Mężczyzna, 43 lata',
    'Zaawansowany',
    'Pacjent z nadciśnieniem tętniczym od 4 lat, nie reagującym na skojarzenie trzech leków (w tym diuretyku tiazydowego).',
    [
      step(
        'Ciśnienie tętnicze w gabinecie wynosi 168/104 mmHg. W rutynowym jonogramie potas wynosi 3,8 mmol/l (norma 3,5–5,1).',
        'Czy stężenie potasu w granicach normy wyklucza u tego chorego pierwotny hiperaldosteronizm (zespół Conna)?',
        [
          'Nie, ponad połowa pacjentów z pierwotnym hiperaldosteronizmem ma prawidłowy potas (postać normokaliemiczna)',
          'Normokaliemia jest częstą pułapką diagnostyczną; nadciśnienie oporne jest bezwzględnym wskazaniem do badań.',
        ],
        [
          'Tak, do rozpoznania Conna konieczna jest hipokaliemia <3,0 mmol/l',
          'To przestarzały pogląd, który prowadzi do przeoczenia większości chorych.',
        ]
      ),
      step(
        'Po przygotowaniu farmakologicznym oznaczono wskaźnik aldosteronowo-reninowy: ARR wynosi 48 (norma <20–30).',
        'Jaki test konfirmacyjny wykonuje się w celu potwierdzenia autonomii wydzielania aldosteronu?',
        [
          'Test dożylnego obciążenia 2 litrami 0,9% NaCl (lub doustny test z fludrokortyzonem)',
          'W warunkach fizjologicznych nadmiar soli tłumi aldosteron <5 ng/dl; brak supresji potwierdza hiperaldosteronizm.',
        ],
        [
          'Doustny test tolerancji glukozy z pomiarem insuliny',
          'OGTT bada metabolizm węglowodanów, a nie autonomię aldosteronową.',
        ]
      ),
      step(
        'Test obciążenia solą potwierdził autonomię. W TK widoczny jest mikroguzek lewego nadnercza 12 mm.',
        'Dlaczego sam obraz TK nie upoważnia jeszcze do wykonania adrenalektomii u 43-latka chcącego wyleczenia operacyjnego?',
        [
          'Zmiana w TK może być nieczynnym incydentaloma, podczas gdy mikrogruczolak APA może kryć się w prawym nadnerczu',
          'Złotym standardem potwierdzającym jednostronną produkcję jest cewnikowanie żył nadnerczowych (AVS).',
        ],
        [
          'TK nigdy nie uwidacznia nadnerczy u mężczyzn',
          'TK uwidacznia nadnercza u obu płci, lecz nie rozstrzyga o czynności hormonalnej.',
        ]
      ),
      step(
        'W cewnikowaniu AVS wykazano 5-krotny gradient aldosteron/kortyzol po stronie lewej (lateralizacja do lewego nadnercza).',
        'Jakie jest optymalne postępowanie docelowe?',
        [
          'Laparoskopowa adrenalektomia lewostronna, która daje szansę na całkowite wyleczenie nadciśnienia',
          'Wykazanie jednostronnego gruczolaka APA (zespół Conna) kwalifikuje do zabiegu operacyjnego.',
        ],
        [
          'Dojście do 6 leków hipotensyjnych bez operacji',
          'Adrenalektomia w APA usuwa przyczynę i często trwale normalizuje ciśnienie tętnicze.',
        ]
      ),
    ]
  ),

  make(
    'pheochromocytoma',
    'Napad paniki czy guz rdzenia?',
    'Kobieta, 38 lat',
    'Zaawansowany',
    'Pacjentka kierowana przez psychiatrę z powodu opornych na leki „napadów lęku panicznego” z potami i kołataniem serca.',
    [
      step(
        'W trakcie napadu ciśnienie szybuje do 230/125 mmHg, tętno 130/min, twarz staje się trupio blada, pojawia się silny ból głowy.',
        'Jaki test biochemiczny w osoczu charakteryzuje się najwyższą czułością w wykrywaniu feochromocytoma?',
        [
          'Oznaczenie wolnych metanefryn w osoczu krwi (metanefryna i normetanefryna)',
          'Wykazuje czułość 97–99%, ponieważ komórki guza stale metabolizują katecholaminy do metanefryn.',
        ],
        [
          'Pomiar dobowego wydalania glukozy z moczem',
          'Glikozuria nie diagnozuje guzów neuroendokrynnych rdzenia nadnerczy.',
        ]
      ),
      step(
        'Wyniki: Wolna normetanefryna w osoczu przekracza 5-krotnie górną granicę normy. W MRI guz prawego nadnercza 4,5 cm.',
        'Lekarz dyżurny chciał podać dożylnie propranolol (beta-bloker) w celu zwolnienia tętna 130/min. Jaka jest Twoja reakcja?',
        [
          'Kategoryczny sprzeciw: podanie beta-blokera przed blokadą alfa wywoła katastrofalny skok ciśnienia i obrzęk płuc',
          'Blokada beta-2 rozszerzających naczynia pozostawia nieprzeciwstawioną stymulację receptorów alfa-1 i skurcz naczyń.',
        ],
        [
          'Pełna aprobata, propranolol to lek pierwszego wyboru w feo',
          'To śmiertelny błąd medyczny zagrażający udarem krwotocznym i zapaścią sercową.',
        ]
      ),
      step(
        'Wdrażasz prawidłowe przygotowanie farmakologiczne: doksazosynę w stopniowo zwiększanej dawce.',
        'Kiedy dopuszczalne jest ewentualne dołączenie beta-adrenolityku?',
        [
          'Dopiero po kilku dniach skutecznej blokady receptorów alfa, jeśli nadal utrzymuje się tachykardia',
          'Zapewnia to pełne bezpieczeństwo hemodynamiczne chorego przed i w trakcie operacji.',
        ],
        [
          'Nigdy w całym życiu pacjenta',
          'Beta-blokery są dozwolone i pożyteczne, pod warunkiem że podaje się je PO alfa-blokerach.',
        ]
      ),
      step(
        'Chora jest przygotowywana do laparoskopowej adrenalektomii wg kryteriów Roizena.',
        'Jakie zalecenie dietetyczno-płynowe należy wdrożyć w ostatnich dobach przed zabiegiem?',
        [
          'Dietę bogatosolną i intensywne nawadnianie 0,9% NaCl w celu odtworzenia objętości krwi krążącej (wolemii)',
          'Chroni to pacjentkę przed ciężką hipotensją po usunięciu guza i zniknięciu wazokonstrykcji.',
        ],
        [
          'Ścisłe odwadnianie i zakaz picia płynów przez 5 dni',
          'Odwodnienie doprowadziłoby do natychmiastowego wstrząsu hipowolemicznego po zaklipsowaniu naczyń guza.',
        ]
      ),
    ]
  ),

  make(
    'incydentaloma-nadnercza',
    'Niespodzianka w tomografii brzucha',
    'Mężczyzna, 62 lata',
    'Podstawowy',
    'Podczas diagnostyki urologicznej w TK jamy brzusznej bez kontrastu uwidoczniono gładkościenny guz lewego nadnercza 2,4 cm.',
    [
      step(
        'Gęstość natywna zmiany wynosi 4 jednostki Hounsfielda (4 HU). Pacjent jest zaniepokojony podejrzeniem raka.',
        'Jak interpretujesz wartość gęstości natywnej <=10 HU w badaniu TK bez kontrastu?',
        [
          'Zmiana jest łagodnym, bogatym w lipidy gruczolakiem kory nadnercza — ryzyko raka wynosi praktycznie 0%',
          'Wysoka zawartość wewnątrzkomórkowego tłuszczu cechuje łagodne gruczolaki i wyklucza nowotwór złośliwy.',
        ],
        [
          'Wartość 4 HU jednoznacznie potwierdza zaawansowanego raka kory nadnerczy',
          'Raki nadnercza są ubogie w lipidy i mają gęstość natywną znacznie powyżej 20–30 HU.',
        ]
      ),
      step(
        'Pacjent nie ma objawów zespołu Cushinga, ciśnienie 128/78 mmHg. Zlecono badania czynnościowe.',
        'Które badanie hormonalne jest bezwzględnie konieczne u każdego pacjenta z incydentaloma nadnercza?',
        [
          'Nocny test hamowania 1 mg deksametazonu (oraz wolne metanefryny w osoczu)',
          'Pozwala wykluczyć autonomiczną sekrecję kortyzolu (MACS) oraz bezobjawowego guza chromochłonnego.',
        ],
        [
          'Oznaczenie kalcytoniny i gastryny',
          'Są to markery raka rdzeniastego tarczycy i gastrinomy, nieprzydatne w typowym incydentaloma nadnercza.',
        ]
      ),
      step(
        'Wyniki: Kortyzol po 1 mg DEX wynosi 1,2 µg/dl (<1,8 µg/dl), metanefryny w osoczu w normie. Guz jest nieczynny hormonalnie.',
        'Czy chory wymaga wykonania biopsji aspiracyjnej cienkoigłowej (BACC) nadnercza?',
        [
          'Nie, biopsja nadnerczy jest rutynowo przeciwwskazana ze względu na ryzyko powikłań i brak wartości diagnostycznej',
          'Biopsja nie odróżnia gruczolaka od raka i niesie ryzyko powikłań krwotocznych.',
        ],
        [
          'Tak, każdy guz powyżej 2 cm musi mieć biopsję przed wypisem',
          'Wskazaniem do biopsji są wyłącznie podejrzenia przerzutów u chorych onkologicznych po wykluczeniu feo.',
        ]
      ),
      step(
        'Zgodnie z aktualnymi wytycznymi ESE/ENSAT 2023 zmiana ma gęstość 4 HU i brak hipersekrecji.',
        'Jakie jest zalecenie dotyczące dalszego monitorowania obrazowego w tomografii komputerowej?',
        [
          'Nie zaleca się wykonywania dalszych kontrolnych badań TK u pacjenta bez nowych objawów klinicznych',
          'Wytyczne ESE 2023 odeszły od rutynowych kontroli TK małych gruczolaków o gęstości <=10 HU.',
        ],
        [
          'Wykonywanie TK z kontrastem co 3 miesiące przez całe życie',
          'Narażałoby to pacjenta na nieuzasadnione, szkodliwe dawki promieniowania jonizującego.',
        ]
      ),
    ]
  ),

  make(
    'przelom-nadnerczowy',
    'Zapaść w infekcji jelitowej',
    'Mężczyzna, 35 lat',
    'Zaawansowany',
    'Chory z rozpoznaną chorobą Addisona od 3 lat, przyjmujący hydrokortyzon, zachorował na ostry nieżyt żołądkowo-jelitowy.',
    [
      step(
        'Z powodu uporczywych wymiotów od 24 godzin nie przyjął tabletek. Trafia na SOR w stanie wstrząsu: RR 70/40 mmHg, tętno 128/min.',
        'Jakie jest bezpośrednie zagrożenie życia i rozpoznanie robocze u tego chorego?',
        [
          'Ostry przełom nadnerczowy wywołany brakiem podaży hydrokortyzonu w warunkach ostrego stresu infekcyjnego',
          'Brak glikokortykosteroidów prowadzi do zapaści naczyniowej (vasoplegia) i wstrząsu opornego na katecholaminy.',
        ],
        [
          'Zwykłe łagodne niestrawności bez zagrożenia życia',
          'Ciśnienie 70/40 mmHg u chorego z chorobą Addisona to stan bezpośredniego zagrożenia zgonem.',
        ]
      ),
      step(
        'W badaniach z krwi: Sód 118 mmol/l, Potas 6,6 mmol/l, Glikemia 42 mg/dl, gazometria: kwasica metaboliczna.',
        'Jaki lek i w jakiej dawce należy podać NATYCHMIAST dożylnie w bolusie bez czekania na dalsze wyniki?',
        [
          'Hydrokortyzon w dawce 100 mg i.v. w bolusie',
          'Jest to lek pierwszego rzutu, który natychmiast przywraca wrażliwość receptorów naczyniowych.',
        ],
        [
          'Doustną tabletkę fludrokortyzonu popitą herbatą',
          'Chory wymiotuje i jest we wstrząsie; leki doustne nie wchłoną się i nie zadziałają.',
        ]
      ),
      step(
        'Równolegle z bolusem hydrokortyzonu uruchamiasz szybką płynoterapię dożylną.',
        'Jaki płyn infuzyjny i jakie postępowanie metaboliczne stanowi podstawę resuscytacji w przełomie?',
        [
          'Szybki wlew 1000 ml 0,9% NaCl w ciągu pierwszej godziny oraz dożylna glukoza w celu zwalczenia hipoglikemii',
          'Chlorek sodu odtwarza objętość krwi krążącej i uzupełnia sód, a glukoza chroni mózg przed hipoglikemią.',
        ],
        [
          'Wlew czystego koncentratu chlorku potasu (KCl)',
          'Podanie potasu przy wyjściowym stężeniu 6,6 mmol/l doprowadziłoby do asystolii i zgonu pacjenta!',
        ]
      ),
      step(
        'Po 2 godzinach ciśnienie wzrasta do 110/70 mmHg, chory odzyskuje pełną świadomość.',
        'Jak zaplanować podtrzymujące dawkowanie hydrokortyzonu w pierwszej dobie resuscytacji?',
        [
          '200 mg hydrokortyzonu na dobę w ciągłym wlewie i.v. lub w dawkach podzielonych po 50 mg co 6 godzin',
          'Zapewnia to stałe terapeutyczne stężenie glikokortykosteroidu we krwi przez cały okres dekompensacji.',
        ],
        [
          'Pojedyncza dawka 5 mg hydrokortyzonu na kolejne 3 dni',
          'Dawka 5 mg jest wielokrotnie za mała i spowodowałaby natychmiastowy nawrót zapaści naczyniowej.',
        ]
      ),
    ]
  ),

  make(
    'rak-nadnercza',
    'Szybka zmiana rysów i ból w boku',
    'Kobieta, 46 lat',
    'Zaawansowany',
    'Kobieta zgłasza ból w prawym podżebrzu, szybkie narastanie masy ciała (otyłość brzuszna), łysienie skroniowe i zarost na brodzie.',
    [
      step(
        'Objawy rozwinęły się gwałtownie w ciągu zaledwie 3 miesięcy. W badaniu ciśnienie tętnicze 175/105 mmHg, hipokaliemia 2,7 mmol/l.',
        'Dlaczego jednoczesne występowanie objawów zespołu Cushinga i wirylizacji budzi silne podejrzenie raka kory nadnerczy (ACC)?',
        [
          'Rak kory nadnerczy wykazuje chaotyczną, mieszaną hipersekrecję — jednoczesny nadmiar kortyzolu i androgenów (DHEA-S)',
          'Łagodne gruczolaki produkują zazwyczaj pojedynczy hormon; mieszana sekrecja silnie wskazuje na złośliwość.',
        ],
        [
          'Raki nadnercza nigdy nie wydzielają hormonów',
          'Aż około 60% raków kory nadnerczy to guzy czynne hormonalnie.',
        ]
      ),
      step(
        'W TK brzucha uwidoczniono niejednorodną masę prawego nadnercza o wymiarach 9,5 cm z martwicą i gęstością natywną 38 HU.',
        'Jaka skala histopatologiczna oparta na 9 cechach mikroskopowych decyduje o rozpoznaniu złośliwości guza kory?',
        [
          'Skala Weissa (wynik >=3 kryteria definiuje raka kory nadnerczy ACC)',
          'Ocenia m.in. indeks mitotyczny, atypowe mitozy, martwicę i inwazję naczyniową.',
        ],
        [
          'Skala Gleasona',
          'Skala Gleasona służy do oceny raka gruczołu krokowego (prostaty), a nie kory nadnerczy.',
        ]
      ),
      step(
        'Chora zostaje zakwalifikowana do leczenia operacyjnego w ośrodku referencyjnym.',
        'Jaki dostęp chirurgiczny jest bezwzględnie zalecany w przypadku podejrzenia raka kory nadnerczy tej wielkości?',
        [
          'Klasyczna operacja otwarta (laparotomia) z zachowaniem marginesów onkologicznych R0 i limfadenektomią',
          'Operacja laparoskopowa w dużych rakowych guzach grozi przerwaniem torebki i nieuleczalnym rozsiewem otrzewnowym.',
        ],
        [
          'Zabieg przezcewnikowy przez tętnicę udową',
          'Zabiegi wewnątrznaczyniowe nie usuwają masy nowotworowej.',
        ]
      ),
      step(
        'Guz usunięto w całości (R0), w badaniu histopatologicznym potwierdzono ACC (Weiss 6, Ki-67 18%).',
        'Jaki doustny lek o selektywnym działaniu adrenolitycznym stanowi standard terapii uzupełniającej (adjuwantowej)?',
        [
          'Mitotan (o,p\'-DDD) z monitorowaniem stężenia we krwi (okno 14–20 mg/l) i wysokimi dawkami hydrokortyzonu',
          'Mitotan niszczy komórki kory nadnerczy i indukuje CYP3A4, wymagając zwiększonej substytucji sterydowej.',
        ],
        [
          'Czysty jodek potasu (płyn Lugola)',
          'Jod blokuje tarczycę, nie wykazuje żadnego działania w raku kory nadnerczy.',
        ]
      ),
    ]
  ),

  make(
    'adrenalektomia',
    'Opieka na sali wybudzeń po feo',
    'Mężczyzna, 45 lat',
    'Zaawansowany',
    'Chory po pomyślnym laparoskopowym usunięciu guza chromochłonnego lewego nadnercza trafia na salę wybudzeń.',
    [
      step(
        'W trakcie zabiegu preparowanie guza wywołało skok ciśnienia do 220/120 mmHg, opanowany wlewem nitroprusydku sodu.',
        'Co dzieje się z ciśnieniem tętniczym w chwili zaklemowania i przecięcia głównej żyły odprowadzającej krew z guza?',
        [
          'Dochodzi do gwałtownego spadku ciśnienia tętniczego z powodu nagłego odcięcia dopływu katecholamin do krążenia',
          'Łożysko naczyniowe ulega rozszerzeniu, co wymaga gotowości anestezjologa do szybkiego wypełnienia wolemii.',
        ],
        [
          'Ciśnienie natychmiast wzrasta do 300 mmHg na stałe',
          'Usunięcie źródła katecholamin powoduje spadek, a nie wzrost ciśnienia tętniczego.',
        ]
      ),
      step(
        'Na sali wybudzeń ciśnienie pacjenta wynosi 85/50 mmHg, tętno 92/min. Drenaż w loży pooperacyjnej jest suchy.',
        'Jakie postępowanie pierwszego rzutu należy wdrożyć w celu stabilizacji ciśnienia tętniczego po adrenalektomii w feo?',
        [
          'Intensywny wlew dożylny krystaloidów (0,9% NaCl / roztwór Ringera) w celu wypełnienia łożyska naczyniowego',
          'Po przewlekłym skurczu naczyń odtworzenie prawidłowej wolemii jest kluczem do normalizacji ciśnienia.',
        ],
        [
          'Podanie wysokich dawek furosemidu dożylnie',
          'Lek moczopędny pogłębiłby hipowolemię i doprowadził do wstrząsu.',
        ]
      ),
      step(
        'Po 3 godzinach od operacji pacjent staje się niespokojny, spocony, splątany, tętno 110/min. Ciśnienie 115/75 mmHg.',
        'Jakie powikłanie metaboliczne należy natychmiast wykluczyć przy łóżku chorego za pomocą glukometru?',
        [
          'Ciężką hipoglikemię z odbicia (spowodowaną nagłym wyrzutem insuliny po ustąpieniu blokady katecholaminowej)',
          'Katecholaminy silnie hamują wydzielanie insuliny; ich nagłe zniknięcie wywołuje hiperinsulinizm i hipoglikemię.',
        ],
        [
          'Kwasicę ketonową z hiperglikemią',
          'Po operacji feo występuje hipoglikemia, a nie hiperglikemia.',
        ]
      ),
      step(
        'Glikemia z palca wynosi 36 mg/dl. Po dożylnym podaniu 20% glukozy objawy neurologiczne natychmiast ustępują.',
        'Jakie zalecenie dotyczące monitorowania glikemii obowiązuje w pierwszej dobie po wycięciu feochromocytoma?',
        [
          'Ścisła kontrola glikemii co 1–2 godziny i wlew roztworów glukozy w razie tendencji spadkowej',
          'Zapobiega to groźnym powikłaniom neurologicznym hipoglikemii pooperacyjnej.',
        ],
        [
          'Zakaz podawania glukozy przez 48 godzin',
          'Brak leczenia hipoglikemii grozi drgawkami i śpiączką hipoglikemiczną.',
        ]
      ),
    ]
  ),
];
