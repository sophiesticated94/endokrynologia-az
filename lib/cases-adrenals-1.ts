import type { ClinicalCase } from './cases.ts';
import { make, step } from './cases-adrenals-helper.ts';

export const adrenalCasesPart1: ClinicalCase[] = [
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
];
