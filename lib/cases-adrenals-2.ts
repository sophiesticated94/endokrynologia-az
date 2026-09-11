import type { ClinicalCase } from './cases.ts';
import { make, step } from './cases-adrenals-helper.ts';

export const adrenalCasesPart2: ClinicalCase[] = [
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
