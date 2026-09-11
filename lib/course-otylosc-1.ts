import { type DraftLesson, q } from './course-types.ts';

export const draftOtyloscPart1: DraftLesson[] = [
  {
    id: 'otylosc-biologia-tkanki-tluszczowej',
    title: 'Adipobiologia: biała, brunatna i beżowa tkanka tłuszczowa oraz adipokiny',
    group: 'Fundamenty i diagnostyka',
    readTime: '12 min',
    goals: [
      'Zrozumieć różnice anatomiczne i metaboliczne między podskórną (SAT) a trzewną (VAT) tkanką tłuszczową.',
      'Scharakteryzować termogenezę bezdrżeniową w brunatnej tkance tłuszczowej (BAT) zależną od białka UCP-1.',
      'Poznać główne adipokiny: leptynę, adiponektynę i rezystynę oraz ich rolę w patogenezie insulinooporności.',
    ],
    sections: [
      {
        title: 'Biała tkanka tłuszczowa (WAT): magazyn energii i organ endokrynny',
        content:
          'Biała tkanka tłuszczowa (WAT) składa się z jednokroplowych adipocytów magazynujących triacyloglicerole. Dzieli się na tkankę podskórną (SAT) i trzewną (VAT). VAT charakteryzuje się wyższą aktywnością lipolityczną, gęstszym unaczynieniem i bezpośrednim drenażem do żyły wrotnej, co zalewa wątrobę wolnymi kwasami tłuszczowymi (WKT). W otyłości dochodzi do przerostu (hipertrofii) adipocytów, niedotlenienia tkanek i naciekania przez makrofagi prozapalne M1 (tworzące charakterystyczne struktury koronopodobne, crown-like structures), co inicjuje ogólnoustrojowy stan zapalny o niskim nasileniu.',
      },
      {
        title: 'Brunatna (BAT) i beżowa tkanka tłuszczowa: rozprzęganie fosforylacji oksydacyjnej',
        content:
          'Brunatna tkanka tłuszczowa (BAT) zawiera wielokroplowe adipocyty bogate w mitochondria z białkiem rozprzęgającym 1 (UCP-1, termogenina). Pod wpływem stymulacji beta3-adrenergicznej przez układ współczulny UCP-1 zwiera gradient protonowy w wewnętrznej błonie mitochondrialnej, rozpraszając energię utleniania w postaci ciepła bez syntezy ATP (termogeneza bezdrżeniowa). Pod wpływem zimna, wysiłku fizycznego (iryzyna) lub agonistów PPAR-gamma w obrębie WAT dochodzi do zjawiska tzw. browningu — powstawania termogennych adipocytów beżowych (brite).',
      },
      {
        title: 'Adipokiny: leptyna, adiponektyna i wskaźnik leptyna/adiponektyna',
        content:
          'Adipocyty wydzielają liczne bioaktywne peptydy — adipokiny. Leptyna jest wydzielana proporcjonalnie do masy tłuszczowej i informuje podwzgórze o zasobach energetycznych. W otyłości występuje hiperleptynemia i leptynooporność. Adiponektyna działa przeciwzapalnie, przeciwmiażdżycowo i zwiększa wrażliwość na insulinę poprzez aktywację kinazy AMPK i receptora AdipoR1/R2; jej stężenie w otyłości paradoksalnie spada. Stosunek stężenia leptyny do adiponektyny (L/A ratio) jest czułym biomarkerem dysfunkcji tkanki tłuszczowej (adipozopatii).',
      },
    ],
    table: {
      caption: 'Porównanie typów tkanki tłuszczowej u człowieka',
      headers: ['Cecha', 'Biała tkanka (WAT)', 'Brunatna tkanka (BAT)', 'Beżowa tkanka (Brite)'],
      rows: [
        ['Morfologia', 'Pojedyncza duża kropla lipidowa', 'Liczne drobne krople, gęste mitochondria', 'Wielokroplowa, indukowalna plastyczność'],
        ['Ekspresja UCP-1', 'Brak lub śladowa', 'Bardzo wysoka (konstytutywna)', 'Indukowalna (zimno, wysiłek, iryzyna)'],
        ['Funkcja metaboliczna', 'Magazyn energii, wydzielanie adipokin', 'Termogeneza bezdrżeniowa, utylizacja WKT', 'Zmienna: magazynowanie vs termogeneza'],
        ['Lokalizacja u dorosłego', 'Podskórna, krezkowa, sieciowa', 'Okolica nadobojczykowa, przykręgosłupowa', 'Rozproszona w obrębie podskórnej WAT'],
      ],
    },
    advanced:
      'W zaawansowanej otyłości pojemność magazynowa tkanki podskórnej ulega wyczerpaniu (ang. lipid overflow hypothesis). Nadmiar lipidów odkłada się ektopowo w hepatocytach, miocytach szkieletowych, komórkach beta trzustki i kardiomiocytach. Ektopowe gromadzenie diacylogliceroli (DAG) i ceramidów aktywuje kinazę białkową C (PKC theta/epsilon), która fosforyluje reszty serynowe podłoża receptora insuliny IRS-1, blokując kaskadę PI3K/Akt i indukując głęboką obwodową insulinooporność.',
    summary:
      'WAT magazynuje lipidy i wydziela adipokiny, a jego przerost wywołuje stan zapalny M1 i spadek adiponektyny. BAT i komórki beżowe rozpraszają energię jako ciepło dzięki UCP-1. Przepełnienie adipocytów prowadzi do lipotoksyczności ektopowej.',
    sourceIds: ['easo-2024', 'aace-abcd-2024'],
    questions: [
      q(
        'Która cecha odróżnia trzewną tkankę tłuszczową (VAT) od podskórnej tkanki tłuszczowej (SAT)?',
        ['Wyższa aktywność lipolityczna i bezpośredni drenaż kwasów tłuszczowych do żyły wrotnej', 'VAT bezpośrednio obciąża wątrobę wolnymi kwasami tłuszczowymi, napędzając stłuszczenie i insulinooporność.'],
        ['Całkowity brak receptorów adrenergicznych', 'VAT posiada wysoką gęstość receptorów beta-adrenergicznych stymulujących lipolizę.'],
        ['Wydzielanie wyłącznie przeciwzapalnej adiponektyny', 'VAT wydziela głównie cytokiny prozapalne (IL-6, TNF-alpha), a poziom adiponektyny spada.']
      ),
      q(
        'Jaki jest mechanizm termogenezy bezdrżeniowej w brunatnej tkance tłuszczowej (BAT)?',
        ['Białko UCP-1 rozprzęga gradient protonowy w mitochondriach, uwalniając energię w postaci ciepła bez syntezy ATP', 'Termogenina umożliwia powrót protonów do macierzy mitochondrialnej z pominięciem syntazy ATP.'],
        ['Gwałtowny skurcz mikrowłókien aktynowo-miozynowych w adipocytach', 'Skurcze włókien mięśniowych odpowiadają za drżenia mięśniowe, a nie termogenezę bezdrżeniową.'],
        ['Zahamowanie beta-oksydacji kwasów tłuszczowych i glikolizy beztlenowej', 'Termogeneza wymaga nasilonej beta-oksydacji kwasów tłuszczowych jako paliwa dla łańcucha oddechowego.']
      ),
      q(
        'Jak zmienia się stężenie leptyny i adiponektyny w surowicy u osoby z narastającą otyłością olbrzymią?',
        ['Stężenie leptyny rośnie (leptynooporność), a stężenie adiponektyny paradoksalnie maleje', 'Masa tłuszczowa produkuje duże ilości leptyny, podczas gdy powiększone i niedotlenione adipocyty redukują wydzielanie adiponektyny.'],
        ['Stężenie obu hormonów gwałtownie spada do zera', 'Leptyna wykazuje ścisłą dodatnią korelację z całkowitą masą tkanki tłuszczowej.'],
        ['Stężenie adiponektyny rośnie pięciokrotnie, a leptyna spada', 'Adiponektyna ulega supresji w otyłości pod wpływem TNF-alfa i stanu zapalnego.']
      ),
      q(
        'Czym charakteryzują się tzw. struktury koronopodobne (crown-like structures) w tkance tłuszczowej?',
        ['Są to prozapalne makrofagi M1 otaczające obumarłe lub ulegające martwicy przerośnięte adipocyty', 'Naciek makrofagów wokół martwiczych komórek tłuszczowych podtrzymuje przewlekły ogólnoustrojowy stan zapalny.'],
        ['To depozyty kryształów szczawianu wapnia w błonie komórkowej', 'Szczawiany odkładają się w nerkach, nie tworzą struktur CLS w tkance tłuszczowej.'],
        ['To zbitki komórek beta trzustki migrujące do sieci większej', 'Komórki beta występują wyłącznie w wyspach Langerhansa trzustki.']
      ),
      q(
        'Jaki mechanizm molekularny odpowiada za indukcję insulinooporności przez ektopowo gromadzone ceramidy i diacyloglicerole (DAG)?',
        ['Aktywacja kinazy PKC i patologiczna fosforylacja reszt serynowych białka IRS-1, blokująca szlak PI3K/Akt', 'Fosforylacja serynowa IRS-1 zamiast tyrozynowej hamuje przekazywanie sygnału metabolicznego insuliny.'],
        ['Nieodwracalne zniszczenie genu kodującego proinsulinę w jądrze hepatocytu', 'Lipotoksyczność zaburza przewodzenie sygnału postreceptorowego, nie niszczy genu proinsuliny.'],
        ['Aktywacja pompy sodowo-potasowej i hiperpolaryzacja błony komórkowej', 'Pompa sodowo-potasowa nie pośredniczy w fosforylacji serynowej kaskady insulinowej.']
      ),
    ],
  },
  {
    id: 'otylosc-os-podwzgorzowa-laknienie',
    title: 'Neuroendokrynna regulacja łaknienia: oś podwzgórzowa i układ nagrody',
    group: 'Fundamenty i diagnostyka',
    readTime: '13 min',
    goals: [
      'Poznać anatomię jądra łukowatego (ARC) podwzgórza oraz neurony POMC/CART i NPY/AgRP.',
      'Zrozumieć działanie greliny jako jedynego obwodowego hormonu oreksygennego (stymulującego apetyt).',
      'Scharakteryzować interakcję między homeostatyczną osią podwzgórzową a mezolimbicznym układem nagrody.',
    ],
    sections: [
      {
        title: 'Jądro łukowate (ARC) podwzgórza: sensor stanu energetycznego',
        content:
          'Jądro łukowate (ARC) leży w bezpośrednim sąsiedztwie wyniosłości pośrodkowej, gdzie bariera krew-mózg jest częściowo przepuszczalna dla hormonów krążących. Zawiera dwie antagonistyczne populacje neuronów pierwszego rzędu: neurony anoreksygenne POMC/CART (uwalniające alfa-MSH, który pobudza receptory melanokortyny 4 [MC4R] w jądrze przykomorowym PVN, hamując łaknienie i zwiększając wydatek energii) oraz neurony oreksygenne NPY/AgRP (uwalniające neuropeptyd Y i peptyd agouti, który jest endogennym antagonistą/odwrotnym agonistą MC4R, wywołując silny napęd do jedzenia).',
      },
      {
        title: 'Obwodowe sygnały sytości i głodu: leptyna, insulina, GLP-1, PYY i grelina',
        content:
          'Leptyna i insulina docierają z krążenia do ARC, aktywując neurony POMC i jednocześnie hamując neurony NPY/AgRP. Po posiłku komórki L jelita krętego wydzielają peptyd YY (PYY) i glukagonopodobny peptyd 1 (GLP-1), a komórki I dwunastnicy cholecystokininę (CCK). Sygnały te hamują opróżnianie żołądka i poprzez nerw błędny oraz pole najdalsze (area postrema) stymulują ośrodek sytości. Jedynym znanym obwodowym hormonem pobudzającym apetyt (oreksygennym) jest grelina, wydzielana przez komórki P/D1 dna żołądka na czczo, której stężenie gwałtownie spada po spożyciu posiłku.',
      },
      {
        title: 'Mezolimbiczny układ nagrody: jedzenie hedoniczne a homeostaza',
        content:
          'Spożywanie pokarmu regulowane jest nie tylko przez homeostatyczne zapotrzebowanie na kalorie, ale również przez mezolimbiczny układ dopaminergiczny (pole brzuszne nakrywki VTA, jądro półleżące accumbens). Pokarmy bogatotłuszczowe i bogatowęglowodanowe wyzwalają wyrzut dopaminy i endogennych opioidów, generując uczucie przyjemności i nagrody. Sygnały hedoniczne mogą z łatwością przełamywać podwzgórzowe mechanizmy sytości, prowadząc do zjawiska jedzenia kompulsywnego (hedonic hunger, food craving) i uzależnienia behawioralnego.',
      },
    ],
    table: {
      caption: 'Kluczowe hormony i neuropeptydy regulujące pobieranie pokarmu',
      headers: ['Cząsteczka', 'Miejsce syntezy', 'Punkt uchwytu', 'Wpływ na łaknienie / metabolizm'],
      rows: [
        ['Leptyna', 'Biała tkanka tłuszczowa', 'Receptor LepR w ARC podwzgórza', 'Anoreksygenny (hamuje apetyt, nasila wydatek energii)'],
        ['Grelina', 'Komórki P/D1 dna żołądka', 'Receptor GHSR w podwzgórzu i VTA', 'Oreksygenny (silnie stymuluje głód przedposiłkowy)'],
        ['GLP-1 i PYY', 'Komórki L jelita krętego', 'Receptory GLP-1R / Y2R w mózgu i nerwie błędnym', 'Anoreksygenny (opóźnia opróżnianie żołądka, daje sytość)'],
        ['alfa-MSH', 'Neurony POMC podwzgórza', 'Receptor melanokortyny 4 (MC4R) w PVN', 'Silna tonizacja sytości i stymulacja termogenezy'],
        ['AgRP / NPY', 'Neurony NPY/AgRP w ARC', 'Antagonista receptora MC4R / receptory Y1/Y5', 'Potężna stymulacja apetytu, oszczędzanie energii'],
      ],
    },
    advanced:
      'Grelina podlega unikalnej posttranslacyjnej modyfikacji enzymatycznej katalizowanej przez o-acylotransferazę grelinową (GOAT). Do reszty serynowej w pozycji Ser3 dołączany jest kwas oktanowy (kwas tłuszczowy C8). Jedynie acylowana forma greliny (acylated ghrelin) potrafi przenikać przez barierę krew-mózg i wiązać się z receptorem GHSR-1a. Zablokowanie enzymu GOAT stanowi obiecujący cel poszukiwań leków przeciw otyłości.',
    summary:
      'Łaknienie kontrolują w ARC neurony POMC (sytość via MC4R) i AgRP (głód). Grelina z dna żołądka stymuluje apetyt, a leptyna, GLP-1 i PYY go hamują. Mezolimbiczny układ dopaminergiczny odpowiada za hedoniczne przejadanie się.',
    sourceIds: ['easo-2024', 'aace-abcd-2024'],
    questions: [
      q(
        'Który z wymienionych hormonów jest jedynym znanym obwodowym hormonem o działaniu oreksygennym (stymulującym głód)?',
        ['Grelina', 'Wydzielana głównie przez komórki dna żołądka na czczo; bezpośrednio aktywuje neurony NPY/AgRP.'],
        ['Peptyd YY (PYY)', 'PYY jest hormonem sytości uwalnianym z komórek jelita krętego po posiłku.'],
        ['Cholecystokinina (CCK)', 'CCK daje uczucie sytości i stymuluje skurcz pęcherzyka żółciowego.']
      ),
      q(
        'Jaki skutek wywołuje pobudzenie receptora melanokortyny 4 (MC4R) w jądrze przykomorowym przez alfa-MSH?',
        ['Wywołanie silnego uczucia sytości i zwiększenie wydatku energetycznego organizmu', 'Szlak leptyna-POMC-alfa-MSH-MC4R stanowi główną oś hamowania łaknienia w ośrodkowym układzie nerwowym.'],
        ['Natychmiastowe napadowe pobudzenie apetytu na tłuszcze', 'Napad głodu wywołuje AgRP, który jest antagonistą receptora MC4R.'],
        ['Blokadę uwalniania hormonu tyreotropowego (TSH)', 'Pobudzenie MC4R stymuluje oś tarczycową poprzez uwalnianie TRH, zwiększając metabolizm.']
      ),
      q(
        'W jaki sposób białko AgRP (agouti-related peptide) wpływa na receptor melanokortyny 4 (MC4R)?',
        ['Działa jako kompetycyjny antagonista i odwrotny agonista MC4R, blokując działanie alfa-MSH i wywołując głód', 'AgRP znosi toniczne hamowanie łaknienia przez alfa-MSH, napędzając pobieranie kalorii.'],
        ['Jest allosterycznym aktywatorem MC4R potęgującym sytość', 'AgRP znosi sytość i promuje głód, nie aktywuje MC4R.'],
        ['Kowalencyjnie trawi enzymatycznie cząsteczkę receptora w błonie neuronu', 'AgRP wiąże się odwracalnie z kieszenią wiążącą ligand, nie jest enzymem proteolitycznym.']
      ),
      q(
        'Jaka modyfikacja biochemiczna cząsteczki greliny przez enzym GOAT jest bezwzględnie konieczna do aktywacji receptora GHSR-1a?',
        ['Dołączenie reszty kwasu oktanowego (C8) do seryny w pozycji 3 peptydu (acylacja)', 'Jedynie acylowana grelina posiada aktywność biologiczną pobudzania apetytu i wyrzutu GH.'],
        ['Przyłączenie reszty kwasu glukuronowego do końca C', 'Glukuronidacja inaktywuje ksenobiotyki w wątrobie, nie aktywuje greliny.'],
        ['Cykliczne spięcie dwoma mostkami disiarczkowymi', 'Grelina jest peptydem liniowym, jej aktywność zależy od acylacji oktanolem.']
      ),
      q(
        'Który układ neuroprzekaźnikowy odpowiada za tzw. głód hedoniczny (hedonic hunger) i przełamywanie sygnałów sytości pod wpływem pokarmów smakowitych?',
        ['Mezolimbiczny układ dopaminergiczny i układ receptorów opioidowych (VTA i jądro półleżące)', 'Dopamina i opioidy w układzie nagrody generują pożądanie pokarmu niezależnie od deficytu kalorycznego.'],
        ['Układ cholinergiczny kory móżdżku', 'Móżdżek koordynuje ruchy i równowagę, nie kieruje motywacją pokarmową.'],
        ['Szlak naczynioruchowy histaminy w rdzeniu przedłużonym', 'Histamina w rdzeniu reguluje wymioty i ciśnienie krwi, a nie hedonizm pokarmowy.']
      ),
    ],
  },
  {
    id: 'otylosc-klasyfikacja-fenotypy',
    title: 'Klasyfikacja otyłości: kryteria EASO 2024, skład ciała i otyłość sarkopeniczna',
    group: 'Fundamenty i diagnostyka',
    readTime: '13 min',
    goals: [
      'Poznać nowe ramy diagnostyczne otyłości wg EASO 2024 wykraczające poza sam wskaźnik BMI.',
      'Scharakteryzować pomiary dystrybucji tkanki tłuszczowej: obwód talii i wskaźnik talia-wzrost (WHtR).',
      'Zrozumieć patogenezę i kryteria rozpoznawania otyłości sarkopenicznej u osób starszych i przewlekle chorych.',
    ],
    sections: [
      {
        title: 'Ograniczenia wskaźnika BMI i definicja otyłości jako choroby wg EASO 2024',
        content:
          'Wskaźnik masy ciała BMI (kg/m²) od dziesięcioleci stanowi podstawę klasyfikacji WHO (otyłość I st. 30–34,9; II st. 35–39,9; III st. >= 40 kg/m²; z niższymi progami >= 25 i >= 27,5 dla populacji azjatyckich). BMI nie rozróżnia jednak beztłuszczowej masy ciała (FFM) od tkanki tłuszczowej ani nie określa jej dystrybucji. Zgodnie z konsensusem EASO 2024 otyłość to przewlekła, nawrotowa choroba charakteryzująca się nieprawidłowym lub nadmiernym nagromadzeniem tkanki tłuszczowej, które upośledza zdrowie. Diagnoza wymaga stwierdzenia powikłań narządowych lub metabolicznych (koncepcja ABCD — Adiposity-Based Chronic Disease).',
      },
      {
        title: 'Wskaźniki otyłości trzewnej: obwód talii i WHtR',
        content:
          'Zgromadzenie tłuszczu trzewnego koreluje ze śmiertelnością sercowo-naczyniową znacznie silniej niż masa ciała. Zgodnie z wytycznymi europejskimi podwyższony obwód talii definiuje się jako >= 94 cm u mężczyzn i >= 80 cm u kobiet (kryteria IDF dla rasy kaukaskiej). Uniwersalnym i prostym narzędziem przesiewowym jest wskaźnik talia-wzrost (Waist-to-Height Ratio, WHtR = obwód talii / wzrost w cm). Wartość WHtR > 0,5 wskazuje na zwiększone ryzyko kardiometaboliczne u osób obu płci, dzieci i dorosłych, niezależnie od grupy etnicznej.',
      },
      {
        title: 'Otyłość sarkopeniczna i fenotypy metaboliczne (MHO vs MUO)',
        content:
          'Otyłość sarkopeniczna (SO) to współistnienie nadmiaru tkanki tłuszczowej z utratą masy mięśniowej i spadkiem siły mięśniowej (dynapenia). Rozpoznanie wymaga potwierdzenia obniżonej siły mięśniowej (dynamometria ręki) oraz zaburzeń składu ciała w badaniu bioimpedancji (BIA) lub dwuenergetycznej absorpcjometrii rentgenowskiej (DEXA). Osoby z tzw. otyłością metabolicznie zdrową (MHO — brak cech zespołu metabolicznego pomimo BMI >= 30) z biegiem lat w ponad 50% konwertują do fenotypu metabolicznie niezdrowego (MUO), co dowodzi, że MHO jest stanem przejściowym.',
      },
    ],
    table: {
      caption: 'Klasyfikacja antropometryczna i metaboliczna otyłości',
      headers: ['Wskaźnik', 'Norma', 'Wartość graniczna', 'Znaczenie kliniczne'],
      rows: [
        ['BMI (WHO Europa)', '18,5 – 24,9 kg/m²', '>= 30,0 kg/m² (I st.), >= 35 (II), >= 40 (III)', 'Podstawowy wskaźnik populacyjny, niedokładny u sportowców i seniorów'],
        ['Obwód talii (IDF)', '< 94 cm (M), < 80 cm (K)', '>= 94 cm (M), >= 80 cm (K)', 'Marker otyłości brzusznej/trzewnej i insulinooporności'],
        ['WHtR (Talia / Wzrost)', '< 0,50', '>= 0,50 (podwyższone), >= 0,60 (wysokie ryzyko)', 'Niezależny od wieku i płci uniwersalny predyktor zgonu sercowo-naczyniowego'],
        ['Siła uścisku ręki (HGS)', '> 27 kg (M), > 16 kg (K)', '< 27 kg (M), < 16 kg (K)', 'Kryterium przesiewowe w kierunku otyłości sarkopenicznej'],
      ],
    },
    advanced:
      'W nowym algorytmie EASO 2024 u osoby z BMI 25,0–29,9 kg/m², u której stwierdza się podwyższony obwód talii (>= 94 cm u mężczyzn, >= 80 cm u kobiet) ORAZ obecność przynajmniej jednego medycznego powikłania otyłości (np. dysglikemia, nadciśnienie tętnicze, MASLD, bezdech senny, choroba zwyrodnieniowa stawów nośnych), stawia się pełnoprawne rozpoznanie choroby otyłościowej i kwalifikuje do leczenia farmakologicznego.',
    summary:
      'BMI ma ograniczenia, dlatego EASO 2024 kładzie nacisk na obwód talii, WHtR > 0,5 oraz powikłania narządowe (ABCD). Otyłość sarkopeniczna łączy nadmiar tłuszczu z utratą siły mięśniowej, a fenotyp MHO jest zazwyczaj przejściowy.',
    sourceIds: ['easo-2024', 'aace-abcd-2024'],
    questions: [
      q(
        'Jaka wartość wskaźnika talia-do-wzrostu (WHtR) stanowi uniwersalny punkt odcięcia wskazujący na podwyższone ryzyko kardiometaboliczne?',
        ['WHtR >= 0,50', 'Zasada keep your waist to less than half your height jest uniwersalna dla obu płci i grup etnicznych.'],
        ['WHtR >= 0,95', 'WHtR 0,95 oznaczałoby obwód talii prawie równy wysokości ciała, co jest wartością skrajną.'],
        ['WHtR >= 0,25', 'Wartość 0,25 cechuje osoby w skrajnym wyniszczeniu kachektycznym.']
      ),
      q(
        'Zgodnie z wytycznymi EASO 2024, kiedy u pacjenta z BMI w zakresie nadwagi (27 kg/m²) można postawić rozpoznanie choroby otyłościowej?',
        ['Gdy współistnieje podwyższony obwód talii oraz co najmniej jedno powikłanie narządowe/metaboliczne (np. MASLD lub stan przedcukrzycowy)', 'Koncepcja ABCD uznaje obecność adipozopatii i uszkodzenia narządowego za wystarczające do rozpoznania otyłości.'],
        ['Gdy stężenie cholesterolu całkowitego przekracza 150 mg/dl', 'Sam cholesterol bez powikłań i bez oceny tkanki tłuszczowej nie definiuje otyłości.'],
        ['Wyłącznie wtedy, gdy pacjent wyrazi chęć operacji bariatrycznej', 'Wskazania medyczne wynikają z obiektywnych parametrów klinicznych, a nie samej deklaracji pacjenta.']
      ),
      q(
        'Jakie dwa elementy są niezbędne do potwierdzenia otyłości sarkopenicznej (sarcopenic obesity)?',
        ['Obniżona siła mięśniowa (np. dynamometria ręki) oraz udokumentowana utrata beztłuszczowej masy mięśniowej (w BIA/DEXA) przy nadmiarze tkanki tłuszczowej', 'Sarkopenia wymaga wykazania zarówno dysfunkcji (spadek siły), jak i ubytku masy mięśni szkieletowych.'],
        ['Wysokie stężenie kinazy kreatynowej i ból łydek', 'To objawy zapalenia mięśni lub rabdomiolizy, a nie otyłości sarkopenicznej.'],
        ['Niski wskaźnik BMI < 18,5 kg/m² u osoby z cukrzycą', 'Otyłość sarkopeniczna z definicji przebiega z nadmiarem tkanki tłuszczowej.']
      ),
      q(
        'Jaki jest los większości pacjentów z tzw. otyłością metabolicznie zdrową (MHO) w długoletniej obserwacji klinicznej?',
        ['Ponad 50% z nich w ciągu 10 lat rozwija powikłania metaboliczne (konwersja do MUO)', 'MHO nie jest stanem protekcyjnym, lecz wczesnym, kompensacyjnym stadium choroby otyłościowej.'],
        ['U wszystkich dochodzi do spontanicznego spadku masy ciała do prawidłowego BMI', 'Bez leczenia masa ciała ma tendencję do stabilizacji lub dalszego wzrostu.'],
        ['Wykształcają całkowitą niewrażliwość na powikłania miażdżycowe przez całe życie', 'Nawet w MHO ryzyko sercowo-naczyniowe i niewydolności serca jest wyższe niż u osób szczupłych.']
      ),
      q(
        'Jaki jest prawidłowy punkt odcięcia obwodu talii definiujący otyłość brzuszną u kobiet rasy kaukaskiej wg kryteriów IDF?',
        ['>= 80 cm', 'Wartość 80 cm u kobiet i 94 cm u mężczyzn wyznacza próg podwyższonego ryzyka metabolicznego.'],
        ['>= 102 cm', '102 cm to stary próg amerykański NCEP-ATP III dla mężczyzn, a nie europejski dla kobiet.'],
        ['>= 60 cm', 'Obwód 60 cm to fizjologiczny wymiar talii bardzo szczupłej kobiety.']
      ),
    ],
  },
  {
    id: 'otylosc-genetyka-monogenowa',
    title: 'Genetyka otyłości: szlak leptyna–melanokortyna, mutacje MC4R i rzadkie zespoły',
    group: 'Fundamenty i diagnostyka',
    readTime: '13 min',
    goals: [
      'Zrozumieć monogenowe defekty osi sytości: niedobór leptyny (LEP), receptora leptyny (LEPR) i proopiomelanokortyny (POMC).',
      'Poznać najczęstszą przyczynę monogenowej otyłości u ludzi: mutację receptora melanokortyny 4 (MC4R).',
      'Scharakteryzować zespoły rzadkie (zespół Pradera-Williego, zespół Bardeta-Biedla) oraz celowaną terapię setmelanotydem.',
    ],
    sections: [
      {
        title: 'Szlak leptyna-melanokortyna i monogenowe postacie wczesnej otyłości',
        content:
          'Monogenowa otyłość ujawnia się w niemowlęctwie lub wczesnym dzieciństwie pod postacią skrajnej hiperfagii (braku poczucia sytości) i gwałtownego przyrostu masy ciała. Wrodzony niedobór leptyny (mutacja genu LEP) prowadzi do otyłości olbrzymiej, hipogonadyzmu hipogonadotropowego i ciężkich zaburzeń odporności komórkowej; podanie rekombinowanej leptyny (metreleptyna) dramatycznie normalizuje łaknienie i masę ciała. Podobny fenotyp wywołują mutacje receptora leptyny (LEPR), genu POMC (otyłość, czerwone włosy, jasna karnacja i wtórna niedoczynność kory nadnerczy przez brak ACTH) oraz konwertazy proproteinowej 1 (PCSK1 — zaburzenia trawienia jelitowego, hipokapnia, hipoglikemia).',
      },
      {
        title: 'Mutacja receptora melanokortyny 4 (MC4R): najczęstsza postać monogenowa',
        content:
          'Mutacje genu MC4R dziedziczą się autosomalnie dominująco (z niepełną penetracją) i odpowiadają za 3–5% przypadków ciężkiej otyłości dziecięcej oraz około 1% otyłości u dorosłych. Fenotyp charakteryzuje się wczesną hiperfagią, przyspieszonym wzrastaniem linearnym (wysoki wzrost w dzieciństwie), zwiększoną gęstością mineralną kości i podwyższoną beztłuszczową masą ciała. W odróżnieniu od niedoboru leptyny, poziom leptyny w surowicy jest wysoki i proporcjonalny do masy tłuszczowej.',
      },
      {
        title: 'Zespoły genetyczne i przełom terapeutyczny: setmelanotyd',
        content:
          'Otyłość syndromiczna występuje w zespołach uwarunkowanych genetycznie. Zespół Pradera-Williego (PWS, utrata ekspresji genów ojcowskich w regionie 15q11-q13) cechuje się wiotkością w okresie noworodkowym, a następnie niepohamowaną hiperfagią, dysmorfią, niskorosłością i hipogonadyzmem. Zespół Bardeta-Biedla (BBS, ciliopatia) łączy otyłość z retinitis pigmentosa, polidaktylią i wadami nerek. Przełomem jest setmelanotyd — syntetyczny agonista receptora MC4R, zaaprobowany do leczenia otyłości u chorych z potwierdzonym genetycznie niedoborem POMC, PCSK1, LEPR oraz w zespole Bardeta-Biedla.',
      },
    ],
    table: {
      caption: 'Monogenowe i syndromiczne zaburzenia szlaku melanokortynowego',
      headers: ['Gen / Zespół', 'Mechanizm molekularny', 'Cechy charakterystyczne fenotypu', 'Możliwości terapii celowanej'],
      rows: [
        ['Niedobór leptyny (LEP)', 'Mutacja utraty funkcji LEP', 'Hiperfagia, otyłość niemowlęca, hipogonadyzm, infekcje', 'Metreleptyna (rekombinowana leptyna ludzka)'],
        ['Niedobór POMC', 'Mutacja genu POMC', 'Otyłość, niedobór ACTH, blade zabarwienie skóry, rude włosy', 'Setmelanotyd (agonista MC4R)'],
        ['Mutacja MC4R', 'Mutacja genu receptora MC4R', 'Hiperfagia, przyspieszone wzrastanie, wysoka gęstość kości', 'Analogi GLP-1, kwalifikacja bariatryczna'],
        ['Zespół Pradera-Williego', 'Utrata genów ojcowskich 15q11-q13', 'Hipotonia noworodka, hiperfagia, hipogonadyzm, niski wzrost', 'Hormon wzrostu (rhGH), rygorystyczny nadzór dietetyczny'],
        ['Zespół Bardeta-Biedla', 'Defekt aparatu rzęsek (BBS1-22)', 'Otyłość, polidaktylia, barwnikowe zwyrodnienie siatkówki', 'Setmelanotyd (zaaprobowany przez FDA/EMA)'],
      ],
    },
    advanced:
      'Większość przypadków powszechnej otyłości w populacji ma charakter poligeniczny. Badania asocjacyjne całego genomu (GWAS) zidentyfikowały ponad 1000 loci wpływających na wskaźnik BMI. Najsilniejszym znanym sygnałem poligenicznym są polimorfizmy w obrębie pierwszego intronu genu FTO (fat mass and obesity-associated gene). Wariant ryzyka FTO nie moduluje jednak bezpośrednio genu FTO, lecz zaburza oddziaływanie odległych promotorów genów IRX3 i IRX5, przestawiając wczesne preadipocyty z fenotypu termogennego (beżowego) na program akumulacji lipidów.',
    summary:
      'Mutacja MC4R to najczęstsza monogenowa otyłość, charakteryzująca się hiperfagią i wysokim wzrostem. Niedobory LEP, LEPR i POMC powodują ciężką otyłość od niemowlęctwa. Setmelanotyd to agonista MC4R leczący wybrane defekty szlaku.',
    sourceIds: ['easo-2024', 'aace-abcd-2024'],
    questions: [
      q(
        'Jaka jest najczęstsza monogenowa przyczyna otyłości u ludzi, odpowiadająca za 3–5% ciężkich postaci otyłości dziecięcej?',
        ['Mutacja genu receptora melanokortyny 4 (MC4R)', 'Dziedziczy się autosomalnie dominująco i powoduje utratę hamowania łaknienia w podwzgórzu.'],
        ['Wrodzony brak receptora insulinowego INSR', 'Mutacja INSR wywołuje zespół Donohue (leprechaunizm) z ciężkim charłactwem, a nie otyłość.'],
        ['Mutacja genu dehydrogenazy alkoholowej ADH1', 'Enzymy ADH metabolizują etanol, nie regulują osi sytości w mózgu.']
      ),
      q(
        'Który lek stanowi celowaną terapię substytucyjną u dzieci z wrodzonym genetycznym niedoborem leptyny (mutacja LEP)?',
        ['Metreleptyna (rekombinowana ludzka leptyna)', 'Podawanie metreleptyny uzupełnia brakujący hormon, całkowicie normalizując łaknienie i masę ciała.'],
        ['Setmelanotyd', 'Setmelanotyd działa na receptor MC4R poniżej leptyny, w niedoborze leptyny lekiem z wyboru jest metreleptyna.'],
        ['Metformina', 'Metformina nie koryguje braku hormonu sytości leptyny w mózgu.']
      ),
      q(
        'Dlaczego u pacjentów z mutacją genu proopiomelanokortyny (POMC) oprócz skrajnej otyłości występuje blada skóra, rude włosy i hipokortyzolemia?',
        ['Brak POMC uniemożliwia powstanie zarówno alfa-MSH (pigmentacja i sytość), jak i ACTH (stymulacja kory nadnerczy)', 'Cząsteczka POMC jest wspólnym prekursorem dla alfa-MSH, beta-endorfiny oraz kortykotropiny (ACTH).'],
        ['Mutacja genu POMC blokuje wchłanianie żelaza i miedzi w jelicie czczym', 'Zaburzenia wchłaniania minerałów nie wynikają z mutacji podwzgórzowej POMC.'],
        ['Białko POMC niszczy barwniki melaninowe w mieszkach włosowych', 'POMC nie niszczy melaniny, lecz jest źródłem peptydu MSH niezbędnego do jej syntezy.']
      ),
      q(
        'Dla których wskazań genetycznych zaaprobowany został syntetyczny agonista receptora MC4R — setmelanotyd?',
        ['Niedobór POMC, PCSK1, LEPR oraz zespół Bardeta-Biedla (BBS)', 'Setmelanotyd selektywnie aktywuje receptor MC4R, omijając uszkodzone proksymalne elementy szlaku.'],
        ['Pospolita otyłość poligeniczna u dorosłych bez mutacji', 'Setmelanotyd nie jest zarejestrowany w powszechnej otyłości bez rzadkich defektów genetycznych.'],
        ['Otyłość polekowa po glikokortykosteroidach', 'Otyłość posteroidowa nie wynika z pierwotnego defektu genetycznego szlaku melanokortynowego.']
      ),
      q(
        'Która aberracja genetyczna leży u podstaw zespołu Pradera-Williego (PWS)?',
        ['Utrata ekspresji genów pochodzenia ojcowskiego w regionie 15q11-q13 (np. delecja ojcowska lub disomia matczyna)', 'PWS to klasyczny przykład choroby piętna genomowego (genomic imprinting).'],
        ['Trisomia chromosomu 21', 'Trisomia 21 to zespół Downa.'],
        ['Monosomia chromosomu X (45,X)', 'Kariotyp 45,X definiuje zespół Turnera.']
      ),
    ],
  },
  {
    id: 'otylosc-zespol-metaboliczny',
    title: 'Zespół metaboliczny i insulinooporność: patogeneza, HOMA-IR i lipotoksyczność',
    group: 'Fundamenty i diagnostyka',
    readTime: '13 min',
    goals: [
      'Znać zharmonizowane kryteria rozpoznania zespołu metabolicznego wg IDF i AHA/NHLBI.',
      'Rozumieć formułę matematyczną i ograniczenia wskaźnika insulinooporności HOMA-IR.',
      'Scharakteryzować zjawisko lipotoksyczności, rolę wolnych kwasów tłuszczowych i uszkodzenie komórek beta trzustki.',
    ],
    sections: [
      {
        title: 'Definicja i zharmonizowane kryteria zespołu metabolicznego',
        content:
          'Zespół metaboliczny (MetS) to konstelacja powiązanych ze sobą czynników ryzyka sercowo-naczyniowego i cukrzycy typu 2. Zgodnie ze zharmonizowanymi kryteriami IDF/AHA/NHLBI rozpoznanie stawia się przy obecności co najmniej 3 z 5 kryteriów: 1) zwiększony obwód talii (dla Europy >= 94 cm M, >= 80 cm K); 2) triglicerydy >= 150 mg/dl (1,7 mmol/l) lub leczenie dyslipidemii; 3) obniżony cholesterol HDL < 40 mg/dl (1,0 mmol/l) u mężczyzn i < 50 mg/dl (1,3 mmol/l) u kobiet lub leczenie; 4) ciśnienie tętnicze skurczowe >= 130 mmHg i/lub rozkurczowe >= 85 mmHg lub leczenie hipotensyjne; 5) glikemia na czczo >= 100 mg/dl (5,6 mmol/l) lub leczenie hipoglikemizujące.',
      },
      {
        title: 'Wskaźnik HOMA-IR i laboratoryjna ocena insulinooporności',
        content:
          'Złotym standardem oceny wrażliwości na insulinę w badaniach naukowych jest hiperinsulinemiczna euglikemiczna klamra metaboliczna DeFronzo. W codziennej praktyce klinicznej stosuje się matematyczny model homeostazy (Homeostatic Model Assessment of Insulin Resistance, HOMA-IR), wyliczany z glikemii i insulinemii na czczo: HOMA-IR = [glukoza na czczo (mg/dl) * insulina na czczo (uIU/ml)] / 405 (lub [glukoza w mmol/l * insulina w uIU/ml] / 22,5). Wartość HOMA-IR > 2,0–2,5 wskazuje na istotną insulinooporność. Alternatywnym wskaźnikiem niewymagającym oznaczania insuliny jest wskaźnik TyG (triglicerydy-glukoza).',
      },
      {
        title: 'Lipotoksyczność i postępująca dysfunkcja komórek beta trzustki',
        content:
          'W warunkach insulinooporności tkanka tłuszczowa traci wrażliwość na antylipolityczne działanie insuliny. Niekontrolowana lipoliza uwalnia potężny strumień wolnych kwasów tłuszczowych (WKT). Przewlekła ekspozycja komórek beta trzustki na wysokie stężenia WKT i glukozy (glukolipotoksyczność) wywołuje stres retikulum endoplazmatycznego, stres oksydacyjny i apoptozę komórek beta. W rezultacie dochodzi do załamania kompensacyjnej hiperinsulinemii i progresji ze stanu przedcukrzycowego do jawnej klinicznie cukrzycy typu 2.',
      },
    ],
    table: {
      caption: 'Zharmonizowane kryteria zespołu metabolicznego (IDF / AHA / NHLBI)',
      headers: ['Składowa zespołu', 'Wartość progowa', 'Uwagi kliniczne'],
      rows: [
        ['Obwód talii (otyłość brzuszna)', '>= 94 cm (M), >= 80 cm (K) (Europa)', 'W kryteriach zharmonizowanych nie jest warunkiem bezwzględnym, lecz 1 z 5'],
        ['Triglicerydy w surowicy', '>= 150 mg/dl (1,7 mmol/l)', 'Lub farmakoterapia hipertriglicerydemii (np. fibraty)'],
        ['Cholesterol HDL', '< 40 mg/dl (M), < 50 mg/dl (K)', 'Wskaźnik dyslipidemii aterogennej i małych gęstych LDL'],
        ['Ciśnienie tętnicze', '>= 130 mmHg (skurczowe) i/lub >= 85 mmHg (rozkurczowe)', 'Lub udokumentowane leczenie nadciśnienia tętniczego'],
        ['Glikemia na czczo', '>= 100 mg/dl (5,6 mmol/l)', 'Obejmuje stan przedcukrzycowy (IFG) lub zdiagnozowaną cukrzycę typu 2'],
      ],
    },
    advanced:
      'Dyslipidemia aterogenna w zespole metabolicznym napędzana jest przez białko transportujące estry cholesterolu (CETP). Nadmiar bogatych w triglicerydy cząstek VLDL wymienia triglicerydy na estry cholesterolu z cząstkami LDL i HDL. Cząstki LDL wzbogacone w triglicerydy stają się substratem dla lipazy wątrobowej (HL), która odszczepia lipidy, tworząc małe, gęste cząstki LDL (sdLDL, fenotyp B). Cząstki te z łatwością przenikają pod śródbłonek naczyń, silnie wiążą się z proteoglikanami i ulegają oksydacji (oxLDL), wykazując najwyższą aterogenność.',
    summary:
      'Zespół metaboliczny rozpoznaje się przy spełnieniu >= 3 z 5 kryteriów (talia, TG, HDL, BP, glikemia). HOMA-IR ocenia insulinooporność, a lipotoksyczność WKT prowadzi do dysfunkcji komórek beta i powstawania wysoce aterogennych małych gęstych cząstek sdLDL.',
    sourceIds: ['easo-2024', 'aace-abcd-2024'],
    questions: [
      q(
        'Ile kryteriów spośród 5 składowych musi spełniać pacjent, aby rozpoznać zespół metaboliczny wg kryteriów zharmonizowanych (IDF/AHA/NHLBI)?',
        ['Co najmniej 3 z 5 kryteriów', 'Zharmonizowana definicja traktuje wszystkie 5 składowych równorzędnie.'],
        ['Wszystkie 5 kryteriów jednocześnie', 'Wymóg wszystkich 5 kryteriów drastycznie zaniżyłby czułość rozpoznania wczesnego ryzyka.'],
        ['Tylko 1 dowolne kryterium', 'Jedno kryterium nie stanowi zespołu schorzeń metabolicznych.']
      ),
      q(
        'Jaki wzór matematyczny służy do obliczenia wskaźnika insulinooporności HOMA-IR przy stężeniu glukozy wyrażonym w mg/dl?',
        ['HOMA-IR = [glukoza na czczo (mg/dl) * insulina na czczo (uIU/ml)] / 405', 'Mianownik 405 (lub 22,5 dla glukozy w mmol/l) kalibruje model homeostazy Mathewsa.'],
        ['HOMA-IR = glukoza (mg/dl) / insulina (uIU/ml)', 'Prosty iloraz glukozy i insuliny nie odzwierciedla równowagi pętli sprzężenia zwrotnego.'],
        ['HOMA-IR = [glukoza * 405] + insulina', 'Formuła opiera się na iloczynie stężeń, a nie sumie arytmetycznej.']
      ),
      q(
        'Jaka zmiana w profilu lipoprotein odpowiada za wysoką aterogenność dyslipidemii w zespole metabolicznym?',
        ['Powstawanie małych, gęstych cząstek LDL (sdLDL) pod wpływem białka CETP i lipazy wątrobowej', 'Cząstki sdLDL charakteryzują się wydłużonym czasem krążenia, łatwą penetracją śródbłonka i podatnością na utlenianie.'],
        ['Całkowity brak apolipoproteiny B100 w osoczu', 'W zespole metabolicznym liczba cząstek ApoB jest podwyższona, a nie zerowa.'],
        ['Zwiększenie średnicy i objętości ochronnych cząstek HDL2', 'Cząstki HDL ulegają zmniejszeniu i przyspieszonej degradacji nerkowej, a ich stężenie spada.']
      ),
      q(
        'Jaki próg glikemii na czczo kwalifikuje się jako składowa zespołu metabolicznego wg wytycznych IDF/AHA?',
        ['>= 100 mg/dl (5,6 mmol/l) lub leczenie hipoglikemizujące', 'Próg 100 mg/dl obejmuje nieprawidłową glikemię na czczo (IFG) oraz jawną cukrzycę.'],
        ['>= 126 mg/dl (7,0 mmol/l)', 'Wartość 126 mg/dl to próg rozpoznania cukrzycy, zespół metaboliczny uwzględnia wcześniejszy stan przedcukrzycowy od 100 mg/dl.'],
        ['>= 200 mg/dl (11,1 mmol/l)', '200 mg/dl to próg glikemii przygodnej z objawami hiperglikemii.']
      ),
      q(
        'Co oznacza pojęcie glukolipotoksyczności w odniesieniu do komórek beta trzustki?',
        ['Synergistyczne, niszczące działanie przewlekle podwyższonych stężeń wolnych kwasów tłuszczowych i glukozy, prowadzące do stresu ER i apoptozy komórek beta', 'WKT same w sobie są paliwem, ale w obecności hiperglikemii indukują nagromadzenie ceramidów i śmierć komórek beta.'],
        ['Fizjologiczną regenerację wysp trzustkowych pod wpływem diety ketogenicznej', 'Glukolipotoksyczność niszczy komórki beta, a nie je regeneruje.'],
        ['Zablokowanie wchłaniania glukozy w enterocytach dwunastnicy', 'Zjawisko dotyczy wewnątrzkomórkowego metabolizmu wysp trzustkowych, a nie transportu jelitowego.']
      ),
    ],
  },
];
