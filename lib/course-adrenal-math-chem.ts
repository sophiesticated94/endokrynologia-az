import { type DraftLesson, type Source, q } from './course-types.ts';

export const adrenalMathChemSources: Record<string, Source> = {
  cah_kinetics: {
    id: 'cah_kinetics',
    title: 'Krone N et al. — Predicting phenotype in steroid 21-hydroxylase deficiency? Comprehensive genotype-phenotype analysis in 21-hydroxylase deficiency',
    year: '2000',
    url: 'https://doi.org/10.1210/jcem.85.3.6441',
    kind: 'Kinetyka enzymatyczna i korelacja genotyp-fenotyp',
  },
  sterane_chem: {
    id: 'sterane_chem',
    title: 'Miller WL, Auchus RJ — The Molecular Biology, Biochemistry, and Physiology of Human Steroidogenesis and Its Disorders',
    year: '2011',
    url: 'https://doi.org/10.1210/er.2010-0013',
    kind: 'Chemia steroidów i cytochromy P450',
  },
};

export const draftAdrenalMathChem: DraftLesson[] = [
  {
    id: 'nadnercza-matematyka-kinetyka-enzymow',
    moduleId: 'nadnercza',
    title: 'Kinetyka Michaelisa-Menten w blokach enzymatycznych WPN',
    subtitle: 'CYP21A2, akumulacja substratu 17-OHP i bocznik androgenowy',
    group: 'Matematyka i modele',
    minutes: 20,
    goals: [
      'Zastosujesz równanie Michaelisa-Menten do wyjaśnienia korelacji genotyp-fenotyp w deficycie 21-hydroksylazy.',
      'Wyprowadzisz matematyczny model bocznikowania zablokowanego substratu do syntezy androgenów.',
    ],
    sections: [
      {
        title: 'Kinetyka Michaelisa-Menten w deficycie 21-hydroksylazy (CYP21A2)',
        text: 'Wrodzony przerost nadnerczy (WPN / CAH) jest spowodowany w >95% mutacjami genu CYP21A2. Szybkość reakcji hydroksylacji węgla C-21 opisuje równanie Michaelisa-Menten: V = (Vmax * [S]) / (Km + [S]). Aktywność resztkowa enzymu (proporcjonalna do Vmax) determinuje postać kliniczną choroby: <1% Vmax odpowiada postaci klasycznej z utratą soli (brak aldosteronu i kortyzolu), 1–5% Vmax odpowiada postaci klasycznej prostej wirylizującej, natomiast 20–50% Vmax charakteryzuje postać nieklasyczną (NC-CAH).',
      },
      {
        title: 'Akumulacja substratu 17-OHP i amplifikacja w pętli ACTH',
        text: 'Spadek syntezy kortyzolu znosi ujemne sprzężenie zwrotne na poziomie podwzgórza i przysadki, wywołując masywny wyrzut ACTH. ACTH stymuluje wychwyt cholesterolu i steroidogenezę we wczesnych etapach (białko StAR i CYP11A1), dostarczając substratów przed blokiem enzymatycznym. W rezultacie substrat 17-hydroksyprogesteron (17-OHP) kumuluje się do stężeń przekraczających normę nawet 50–100-krotnie (>30–100 ng/ml).',
      },
      {
        title: 'Bocznik androgenowy i test stymulacji Synacthenem',
        text: 'Nadmiar 17-OHP nie może przejść w 11-deoksykortyzol, zostaje więc skierowany do alternatywnego szlaku metabolizowanego przez enzym CYP17A1 (o aktywności 17,20-liazy). Prowadzi to do lawinowego wytwarzania androstendionu i testosteronu. W diagnostyce postaci nieklasycznej stosuje się test stymulacji 250 µg syntetycznego ACTH (Synacthen) z pomiarem 17-OHP w 0 i 60 minucie: wyrzut >10 ng/ml (>30 nmol/l w teście immunologicznym lub >8–10 ng/ml w LC-MS/MS) potwierdza rozpoznanie.',
      },
    ],
    table: {
      headers: ['Postać WPN', 'Aktywność resztkowa CYP21A2 (Vmax)', 'Stężenie 17-OHP i fenotyp kliniczny'],
      rows: [
        ['Klasyczna z utratą soli', '<1% normy', '17-OHP >100 ng/ml; przełom solny u noworodka w 2. tyg. życia, hiperkaliemia'],
        ['Klasyczna prosta wirylizująca', '1–5% normy', '17-OHP 30–100 ng/ml; obojnacze narządy płciowe u dziewczynek, brak utraty soli'],
        ['Nieklasyczna (NC-CAH)', '20–50% normy', '17-OHP w teście ACTH >10 ng/ml (>30 nmol/l, w LC-MS/MS >8–10); hirsutyzm, anowulacja'],
        ['Zdrowa fizjologia', '100% normy', '17-OHP podstawowe <2 ng/ml (w LC-MS/MS <1,5 ng/ml); prawidłowa homeostaza'],
      ],
    },
    advanced:
      'W postaci z utratą soli nowo odkryty tzw. szlak tylnych drzwi (backdoor pathway) omija klasyczną syntezę DHEA/androstendionu. W szlaku tym 17-OHP ulega redukcji przez 5alfa-reduktazę (SRD5A1) i 3alfa-HSD do 17-OH-allopregnanolonu, po czym ulega konwersji bezpośrednio do dihydrotestosteronu (DHT), co tłumaczy ciężką wirylizację płodów żeńskich nawet przy relatywnie niskim krążącym testosteronie.',
    summary:
      'Aktywność enzymatyczna CYP21A2 w kinetyce Michaelisa-Menten bezpośrednio wyznacza stopień akumulacji 17-OHP i intensywność bocznikowania do androgenów.',
    sourceIds: ['cah_kinetics', 'sterane_chem', 'cah_guideline'],
    derivation: {
      title: 'Wyprowadzenie kinetyki Michaelisa-Menten i transformacji Lineweavera-Burka',
      model: 'Równanie stanu stacjonarnego Briggs-Haldane dla CYP21A2',
      steps: [
        {
          step: 'Stan stacjonarny kompleksu enzym-substrat [ES]',
          equation: '\\frac{d[ES]}{dt} = k_1 [E][S] - (k_{-1} + k_{cat})[ES] = 0',
          explanation: 'Szybkość tworzenia kompleksu 21-hydroksylaza·17-OHP równoważy szybkość jego dysocjacji oraz konwersji do 11-deoksykortyzolu.',
        },
        {
          step: 'Definicja stałej Km i Vmax',
          equation: 'K_m = \\frac{k_{-1} + k_{cat}}{k_1}, \\qquad V_{max} = k_{cat} [E]_{tot}',
          explanation: 'Km to stężenie substratu przy V = Vmax/2. W klasycznym WPN z utratą soli delecje lub mutacje I2g redukują Vmax do <1% normy.',
        },
        {
          step: 'Transformacja podwójnych odwrotności Lineweavera-Burka',
          equation: '\\frac{1}{V} = \\frac{K_m}{V_{max}} \\cdot \\frac{1}{[S]} + \\frac{1}{V_{max}}',
          explanation: 'Wykres $1/V$ vs $1/[S]$. Spadek $V_{max}$ przesuwa punkt przecięcia osi OY ($1/V_{max}$) wysoko w górę – enzym jest niewydolny mimo akumulacji [S].',
        },
      ],
      clinicalTakeaway: 'Gdy $V_{max} < 1\\%$, nawet przy nagromadzeniu [S] (17-OHP > 100 ng/ml) szybkość V nie pokrywa zapotrzebowania na mineralo- i glukokortykoidy, wywołując przełom nadnerczowy.',
    },
    workedExample: {
      title: 'Kalkulacja dawkowania hydrokortyzonu i fludrokortyzonu w klasycznym WPN u noworodka',
      patient: 'Noworodek płci żeńskiej (46,XX), 12. doba życia, spadek masy z 3400 g do 2850 g (-16%), apatia, wymioty, Na+ 118 mmol/L, K+ 7,8 mmol/L, 17-OHP 92 ng/ml, wirylizacja Prader III.',
      inputs: [
        { label: 'Aktualna masa ciała', value: '2,85', unit: 'kg' },
        { label: 'Pole powierzchni BSA', value: '0,19', unit: 'm²' },
        { label: 'Stężenie 17-OHP', value: '92', unit: 'ng/ml' },
        { label: 'Sód / Potas', value: '118 / 7,8', unit: 'mmol/L' },
      ],
      calculationSteps: [
        'Krok 1: Powierzchnia ciała wg Mostellera: $\\text{BSA} = \\sqrt{\\frac{2{,}85\\text{ kg} \\times 50\\text{ cm}}{3600}} \\approx 0{,}199\\,\\text{m}^2$.',
        'Krok 2: Przełom nadnerczowy – faza ostra: bolus hydrokortyzonu $25\\,\\text{mg/m}^2 = 0{,}2\\,\\text{m}^2 \\times 25\\text{ mg} = 5\\,\\text{mg i.v.}$, następnie ciągły wlew lub podział na 4 dawki po 2,5 mg co 6h.',
        'Krok 3: Płynoterapia resuscytacyjna: $0{,}9\\%\\text{ NaCl} + 5\\%\\text{ glukoza}$ w dawce $20\\,\\text{ml/kg} = 57\\,\\text{ml}$ w 1h, bez dodatku potasu!',
        'Krok 4: Dawka podtrzymująca po stabilizacji: hydrokortyzon $12\\,\\text{mg/m}^2\\text{/d} = 2{,}5\\,\\text{mg/d}$ w 3 dawkach + fludrokortyzon $100\\,\\text{µg/d}$ + $\\text{NaCl } 1\\text{–}2\\,\\text{g/d}$.',
      ],
      result: 'Stan po bolusie hydrokortyzonu i 0,9% NaCl: ustąpienie hiponatremii i hiperkaliemii; wdrożono hydrokortyzon 2,5 mg/d oraz fludrokortyzon 100 µg/d.',
      clinicalAction: 'Pilne leczenie ratunkowe przełomu solnego. Po stabilizacji stała opieka endokrynologiczna, monitorowanie 17-OHP i androstendionu oraz konsultacja urologii dziecięcej.',
    },
    questions: [
      q(
        'Jaka resztkowa aktywność enzymatyczna (Vmax) 21-hydroksylazy (CYP21A2) cechuje postać klasyczną WPN z utratą soli?',
        ['Mniej niż 1% aktywności prawidłowej', 'Całkowity brak produkcji aldosteronu i kortyzolu prowadzi do zagrażającego życiu przełomu solnego.'],
        ['Około 85–90% aktywności', 'Taki poziom enzymu nie wywołuje objawów klinicznych ani utraty soli.'],
        ['Dokładnie 50% u każdego pacjenta', '50% aktywności cechuje bezobjawowych heterozygotycznych nosicieli mutacji.']
      ),
      q(
        'Który metabolit steroidowy kumuluje się w sposób najbardziej spektakularny w deficycie 21-hydroksylazy i służy jako główny biomarker diagnostyczny?',
        ['17α-Hydroksyprogesteron (17-OHP)', 'Jest bezpośrednim substratem leżącym tuż przed zablokowanym enzymem CYP21A2.'],
        ['Czysty aldosteron', 'Stężenie aldosteronu w klasycznym bloku enzymatycznym jest bliskie zeru.'],
        ['Tyreoglobulina', 'Tyreoglobulina jest białkiem tarczycy, a nie metabolitem kory nadnerczy.']
      ),
      q(
        'Jaka wartość stężenia 17-OHP w 60. minucie testu stymulacji 250 µg Synacthenem stanowi kryterium potwierdzenia nieklasycznego WPN (NC-CAH)?',
        ['Powyżej 10 ng/ml (zwykle >30 nmol/L)', 'Jest to powszechnie akceptowany punkt odcięcia różnicujący NC-CAH od zespołu policystycznych jajników (PCOS).'],
        ['Poniżej 0,001 ng/ml', 'Wartości zerowe wykluczają obecność enzymu lub stymulacji.'],
        ['Dokładnie 500 µg/dl', 'To nierealistycznie wysoka wartość przekraczająca zakresy biologiczne.']
      ),
      q(
        'Dlaczego w deficycie 21-hydroksylazy dochodzi do gwałtownego rozrostu kory nadnerczy (hiperplazji)?',
        ['Brak ujemnego sprzężenia zwrotnego przez kortyzol powoduje nieskrępowany wyrzut ACTH przez przysadkę', 'ACTH działa troficznie i stymuluje przerost komórek kory nadnerczy.'],
        ['Ponieważ komórki nadnerczy ulegają zakażeniu wirusowemu', 'Przerost w WPN ma podłoże neuroendokrynne, nie infekcyjne.'],
        ['Z powodu bezpośredniego działania aldosteronu na DNA', 'W klasycznym WPN aldosteronu brakuje.']
      ),
      q(
        'Czym jest tzw. alternatywny szlak tylnych drzwi (backdoor pathway) w steroidogenezie nadnerczowej?',
        ['Szlakiem syntezy silnego androgenu dihydrotestosteronu (DHT) z pominięciem androstendionu i testosteronu', 'Wykorzystuje redukcję 17-OHP przez 5α-reduktazę i wyjaśnia wirylizację płodu żeńskiego.'],
        ['Drogą ucieczki kortyzolu przez przewód pokarmowy', 'Szlak dotyczy enzymatycznej biosyntezy wewnątrzkomórkowej, nie wydalania.'],
        ['Mechanizmem produkcji adrenaliny w korze nadnerczy', 'Adrenalina powstaje w rdzeniu, nie w szlaku steroidogenezy.']
      ),
    ],
  },
  {
    id: 'nadnercza-matematyka-hemodynamika',
    moduleId: 'nadnercza',
    title: 'Matematyka osi RAA, wskaźnik ARR i krzywe wysycenia receptorów',
    subtitle: 'Wskaźnik aldosteron-renina (ARR), blokada alfa-beta i równanie Hilla',
    group: 'Matematyka i modele',
    minutes: 21,
    goals: [
      'Wyprowadzisz i zinterpretujesz wskaźnik aldosteronowo-reninowy (ARR) w diagnostyce hiperaldosteronizmu pierwotnego.',
      'Zanalizujesz krzywe stężenie-odpowiedź receptorów adrenergicznych (kompetycyjna vs niekompetycyjna blokada w pheochromocytoma).',
    ],
    sections: [
      {
        title: 'Dynamika pętli sprzężenia zwrotnego RAA i wskaźnik ARR',
        text: 'W warunkach fizjologicznych wydzielanie aldosteronu przez warstwę kłębkowatą jest ściśle sprzężone z aktywnością reniny osoczowej (PRA) lub stężeniem reniny (DRC): spadek ciśnienia ⟶ wzrost reniny ⟶ wzrost angiotensyny II ⟶ wzrost aldosteronu ⟶ retencja sodu ⟶ hamowanie reniny. W zespole Conna (autonomia gruczolaka) aldosteron pozostaje wysoki mimo całkowitej supresji reniny. Wskaźnik aldosteronowo-reninowy ARR = PAC / PRA (lub PAC / DRC) pozwala wykryć tę utratę kontroli.',
      },
      {
        title: 'Matematyczne punkty odcięcia ARR i warunki standaryzacji',
        text: 'Wartość odcięcia ARR zależy od jednostek laboratoryjnych: przy stężeniu aldosteronu (PAC) w ng/dl i aktywności reniny (PRA) w ng/ml/h punkt odcięcia wynosi zazwyczaj ARR > 30 (przy PAC > 10–15 ng/dl). Przy reninie oznaczanej jako DRC w mIU/L, próg wynosi ARR > 3,7. Ze względu na mianownik dążący do zera (DRC < 2 mIU/L), wynik może być fałszywie dodatni, dlatego niezbędne jest równoczesne spełnienie kryterium podwyższonego stężenia samego aldosteronu.',
      },
      {
        title: 'Farmakodynamika blokady receptorów alfa: Fenoksybenzamina vs Doksazosyna',
        text: 'W pheochromocytoma napływ noradrenaliny wysyca receptory alfa-1 naczyniowe wg równania Hilla: E = (Emax * [C]^n) / (EC50^n + [C]^n). Doksazosyna jest antagonistą kompetycyjnym (odwracalnym) — przesuwa krzywą w prawo, co oznacza, że nagły masywny wyrzut katecholamin podczas operacji może przełamać blokadę. Fenoksybenzamina jest antagonistą niekompetycyjnym (alkilującym) — tworzy nieodwracalne wiązanie kowalencyjne z receptorem alfa, obniżając Emax, co zapewnia absolutną ochronę przed przełomem.',
      },
    ],
    table: {
      headers: ['Parametr / Lek', 'Model matematyczny', 'Znaczenie kliniczne'],
      rows: [
        ['ARR (PAC / PRA)', 'Iloraz PAC [ng/dl] do PRA [ng/ml/h] > 30', 'Podstawa screeningu w zespole Conna; wymaga wyrównania potasu'],
        ['ARR (PAC / DRC)', 'Iloraz PAC [ng/dl] do DRC [mIU/L] > 3,7', 'Szybka metoda immunochemiczna bezpośredniego pomiaru reniny'],
        ['Doksazosyna', 'Antagonista kompetycyjny (zwiększa pozorne EC50)', 'Mniej działań niepożądanych, ale ryzyko przełamania przy manipulacji guzem'],
        ['Fenoksybenzamina', 'Inhibitor nieodwracalny kowalencyjny (obniża Emax)', 'Złoty standard blokady przedoperacyjnej guza chromochłonnego'],
      ],
    },
    advanced:
      'Kardynalna reguła farmakologiczna w pheochromocytoma: ZAWSZE blokada alfa przed beta! Zablokowanie receptorów beta-2 (odpowiedzialnych za rozkurcz naczyń w mięśniach) przy braku blokady alfa-1 (skurcz naczyń obwodowych) powoduje unopposed alpha-stimulation — gwałtowny wzrost oporu naczyniowego i potencjalnie śmiertelny kryzys nadciśnieniowy z obrzękiem płuc.',
    summary:
      'Wskaźnik ARR ujawnia autonomię aldosteronu wygaszającą reninę, a niekompetycyjna blokada alfa fenoksybenzaminą chroni przed przełomem hemodynamicznym w pheo.',
    sourceIds: ['endo_pa', 'endo_pheo', 'cah_kinetics'],
    derivation: {
      title: 'Wyprowadzenie wskaźnika ARR i granicy błędu przy mianowniku bliskim zeru',
      model: 'Iloraz stężenia aldosteronu do reniny (ARR) i model inhibicji niekompetycyjnej receptorów alfa',
      steps: [
        {
          step: 'Formuła wskaźnika ARR i konwersja jednostek',
          equation: 'ARR = \\frac{PAC}{PRA} \\qquad \\text{lub} \\qquad ARR = \\frac{PAC}{\\frac{DRC}{8{,}2}}',
          explanation: 'Przelicznik PRA na DRC: $1\\,\\text{ng/ml/h PRA} \\approx 8{,}2\\,\\text{mIU/L DRC}$. Wartość odcięcia $ARR > 30$ dla PRA odpowiada progowi $ARR > 3{,}7$ dla DRC.',
        },
        {
          step: 'Asymptotyka błędu przy mianowniku dążącym do zera',
          equation: '\\lim_{DRC \\to 0^+} \\frac{PAC}{DRC} = +\\infty \\quad \\text{dla każdego } PAC > 0',
          explanation: 'Gdy renina jest wygaszona do granicy detekcji (np. $DRC = 0{,}8\\,\\text{mIU/L}$), nawet niski aldosteron $PAC = 4\\,\\text{ng/dl}$ daje fałszywie dodatni $ARR = 5{,}0$. Dlatego wymagany jest bezwzględny warunek progowy: $PAC > 10\\text{–}15\\,\\text{ng/dl}$.',
        },
        {
          step: 'Farmakodynamika Emax i nieodwracalna blokada naczyniowa',
          equation: 'E = \\frac{E_{max, app} \\cdot [C]}{EC_{50} + [C]}, \\qquad E_{max, app} = E_{max} \\cdot \\left(1 - \\frac{[I]}{[I] + K_i}\\right)',
          explanation: 'Fenoksybenzamina kowalencyjnie wiąże się z receptorem $\\alpha_1$. Zmniejsza liczbę aktywnych receptorów $R_{tot}$ i obniża $E_{max}$ odpowiedzi presyjnej, uniemożliwiając przełamanie blokady skokiem katecholamin.',
        },
      ],
      clinicalTakeaway: 'Prawidłowa interpretacja ARR wymaga: normokaliemii, odstawienia antagonistów aldosteronu na 6 tyg. oraz bezwzględnego kryterium $PAC > 10\\text{–}15\\,\\text{ng/dl}$. Blokada alfa fenoksybenzaminą musi obniżyć $E_{max}$ przed wdrożeniem beta-blokera.',
    },
    workedExample: {
      title: 'Diagnostyka zespołu Conna (PA) i interpretacja ARR u pacjenta z opornym nadciśnieniem',
      patient: 'Mężczyzna, 54 lata, oporne nadciśnienie tętnicze (RR 165/105 mmHg na 3 lekach), wyjściowy potas w surowicy 3,1 mmol/L.',
      inputs: [
        { label: 'K+ po suplementacji', value: '4,1', unit: 'mmol/L' },
        { label: 'Aldosteron (PAC)', value: '28,4', unit: 'ng/dl' },
        { label: 'Renina bezpośrednia (DRC)', value: '2,2', unit: 'mIU/L' },
        { label: 'Ciśnienie tętnicze', value: '162/100', unit: 'mmHg' },
      ],
      calculationSteps: [
        'Krok 1: Wyrównanie potasu: przed pobraniem krwi wyrównano hipokaliemię do $K^+ = 4{,}1\\,\\text{mmol/L}$ (hipokaliemia hamuje wydzielanie aldosteronu i dałaby wynik fałszywie ujemny).',
        'Krok 2: Wyliczenie wskaźnika ARR: $ARR = \\frac{PAC}{DRC} = \\frac{28{,}4\\,\\text{ng/dl}}{2{,}2\\,\\text{mIU/L}} = 12{,}91$ (wartość progowa dodatnia $> 3{,}7$).',
        'Krok 3: Weryfikacja kryterium stężenia aldosteronu: $PAC = 28{,}4\\,\\text{ng/dl} > 15\\,\\text{ng/dl}$ (spełniony warunek autonomicznej nadprodukcji).',
        'Krok 4: Test potwierdzenia: test obciążenia $2000\\,\\text{ml } 0{,}9\\%\\text{ NaCl}$ i.v. w ciągu 4h $\\longrightarrow PAC = 14{,}2\\,\\text{ng/dl} > 10\\,\\text{ng/dl}$ (potwierdza autonomię).',
      ],
      result: 'ARR = 12,91 (silnie dodatni), test infuzji soli dodatni – potwierdzenie hiperaldosteronizmu pierwotnego (zespół Conna).',
      clinicalAction: 'Wykonano TK nadnerczy (gruczolak 14 mm lewego nadnercza). Przed kwalifikacją do adrenalektomii zlecono cewnikowanie żył nadnerczowych (AVS) w celu wykluczenia obustronnego rozrostu kory.',
    },
    questions: [
      q(
        'Dlaczego do wiarygodnej interpretacji podwyższonego wskaźnika ARR (>30) konieczne jest jednoczesne wykazanie stężenia aldosteronu (PAC) > 10–15 ng/dl?',
        ['Ponieważ przy bardzo niskiej reninie (mianownik bliski zeru) iloraz może być sztucznie zawyżony przy śladowym aldosteronie', 'Zapobiega to fałszywie dodatnim rozpoznaniom u pacjentów z niskoreninowym nadciśnieniem samoistnym.'],
        ['Ponieważ aldosteron w stężeniu poniżej 15 ng/dl staje się gazem', 'Aldosteron jest hormonem steroidowym rozpuszczalnym w lipidach.'],
        ['Ponieważ renina rozkłada probówkę laboratoryjną', 'Renina to enzym proteolityczny działający w osoczu na angiotensynogen.']
      ),
      q(
        'Dlaczego w przygotowaniu do operacji guza chromochłonnego (pheo) bezwzględnie ZAKAZANE jest wdrożenie beta-blokera przed pełną blokadą alfa?',
        ['Prowadzi do nieposkromionej stymulacji receptorów alfa (unopposed alpha) i zagrażającego życiu skoku ciśnienia', 'Zablokowanie rozkurczających receptorów beta-2 pozostawia naczynia pod wyłącznym wpływem skurczowym alfa-1.'],
        ['Bo beta-bloker natychmiast rozpuszcza guz nadnercza', 'Leki adrenolityczne nie wykazują działania onkolitycznego na guzy chromochłonne.'],
        ['Bo beta-blokery zmieniają grupę krwi pacjenta', 'Leki kardiologiczne nie wpływają na antygeny grupowe układu AB0.']
      ),
      q(
        'Na czym polega przewaga niekompetycyjnego antagonisty receptorów alfa (fenoksybenzaminy) nad antagonistą kompetycyjnym (doksazosyną)?',
        ['Wiąże się kowalencyjnie z receptorem, więc nawet masywny wyrzut katecholamin podczas resekcji nie przełamie blokady', 'Zmniejsza Emax odpowiedzi presyjnej, uniemożliwiając skurcz naczynia.'],
        ['Działa wyłącznie przez 15 sekund i natychmiast znika', 'Fenoksybenzamina działa długo ze względu na konieczność syntezy nowych receptorów de novo.'],
        ['Można ją popijać wyłącznie sokiem grejpfrutowym', 'Sposób popijania nie jest mechanizmem przewagi farmakodynamicznej.']
      ),
      q(
        'Jaki lek hipotensyjny fałszywie drastycznie podwyższa stężenie reniny i może uniemożliwić interpretację wskaźnika ARR (dając wynik fałszywie ujemny)?',
        ['Inhibitory konwertazy angiotensyny (ACE-I) oraz sartany (ARB)', 'Znoszą hamowanie reniny przez angiotensynę II, wywołując gwałtowny skok reniny w osoczu.'],
        ['Czysta witamina C w małej dawce', 'Kwas askorbinowy nie zaburza bezpośrednio pętli sprzężenia osi RAA.'],
        ['Insulina podana do posiłku', 'Insulina nie jest inhibitorem osi renina-angiotensyna.']
      ),
      q(
        'Jaki wpływ na interpretację wskaźnika ARR ma hipokaliemia u pacjenta z podejrzeniem zespołu Conna?',
        ['Hipokaliemia hamuje wydzielanie aldosteronu i może dać wynik fałszywie ujemny', 'Dlatego przed oznaczeniem ARR stężenie potasu w surowicy musi być bezwzględnie wyrównane.'],
        ['Hipokaliemia nie ma żadnego wpływu na steroidogenezę', 'Jon potasu jest bezpośrednim fizjologicznym secretagogiem aldosteronu w warstwie kłębkowatej.'],
        ['Zawsze daje wynik fałszywie dodatni ponad 1000', 'Hipokaliemia obniża stężenie aldosteronu, a nie podwyższa.']
      ),
    ],
  },
  {
    id: 'nadnercza-chemia-steroidogeneza',
    moduleId: 'nadnercza',
    title: 'Stereochemia jądra steranu i cykl katalityczny cytochromów P450',
    subtitle: 'Cyklopentanoperhydrofenantren, orientacja alfa/beta i enzymy hemo-żelazowe',
    group: 'Chemia i biochemia',
    minutes: 20,
    goals: [
      'Scharakteryzujesz stereochemię szkieletu steranu (konformacja krzesełkowa, podstawniki alfa pod płaszczyzną i beta nad płaszczyzną).',
      'Poznasz etapy aktywacji tlenu cząsteczkowego w cyklu katalitycznym cytochromów P450 steroidogenezy.',
    ],
    sections: [
      {
        title: 'Układ cyklopentanoperhydrofenantrenu (Jądro Steranu)',
        text: 'Wszystkie hormony steroidowe kory nadnerczy wywodzą się z czteropierścieniowego szkieletu steranu: trzech pierścieni sześcioczłonowych (A, B, C w układzie fenantrenu) i jednego pięcioczłonowego (D, cyklopentan). Węgiel C-10 i C-13 posiadają grupy metylowe (C-19 i C-18) zorientowane w pozycji beta (powyżej płaszczyzny cząsteczki). Wiązania skierowane w dół określa się jako alfa (trans względem grup metylowych), a skierowane w górę jako beta (cis). Ta sztywna stereochemia decyduje o rozpoznaniu przez jądrowe receptory MR i GR.',
      },
      {
        title: 'Cytochromy P450 jako monooksygenazy hemo-żelazowe',
        text: 'Głównymi enzymami steroidogenezy są cytochromy P450 (CYP11A1, CYP17A1, CYP21A2, CYP11B1, CYP11B2). Reakcja hydroksylacji wymaga aktywacji tlenu cząsteczkowego: RH + O2 + NADPH + H+ ⟶ ROH + H2O + NADP+. Kluczowym elementem katalitycznym jest hem zawierający atom żelaza skoordynowany przez resztę tiolanową cysteiny (tzw. proksymalny ligand tiolanowy).',
      },
      {
        title: 'Cykl transferu elektronów i reaktywny kompleks ferrylu',
        text: 'W mitochondriach elektrony z NADPH są przekazywane przez reduktazę adrenodoksyny (FAD) i adrenodoksynę [2Fe-2S] do cytochromu (CYP11A1, CYP11B1, CYP11B2). W siateczce śródplazmatycznej (CYP17A1, CYP21A2) donorem jest reduktaza P450 (POR). Kolejne etapy: redukcja Fe(III) do Fe(II), wiązanie O2, wprowadzenie drugiego elektronu i rozszczepienie O-O z utworzeniem kationorodnika ferrylu [Fe(IV)=O]+•, który abstrahuje atom wodoru z substratu i wstawia grupę hydroksylową z zachowaniem stereochemii.',
      },
    ],
    table: {
      headers: ['Enzym P450', 'Lokalizacja komórkowa', 'Stereospecyficzna reakcja chemiczna'],
      rows: [
        ['CYP11A1 (P450scc)', 'Wewnętrzna błona mitochondrium', 'Odcina łańcuch boczny cholesterolu C27 ⟶ pregnenolon C21'],
        ['CYP17A1 (17α-hydroksylaza)', 'Błona siateczki śródplazmatycznej', '17α-hydroksylacja (grupa -OH skierowana pod płaszczyznę pierścienia D)'],
        ['CYP21A2 (21-hydroksylaza)', 'Błona siateczki śródplazmatycznej', 'Hydroksylacja grupy metylowej C-21 w łańcuchu bocznym'],
        ['CYP11B1 (11β-hydroksylaza)', 'Wewnętrzna błona mitochondrium', '11β-hydroksylacja (grupa -OH skierowana nad płaszczyznę pierścienia C)'],
        ['CYP11B2 (syntaza aldosteronu)', 'Wewnętrzna błona mitochondrium', 'Trzyetapowe utlenienie grupy C-18 do unikalnego aldehydu'],
      ],
    },
    advanced:
      'Glukokortykoidy różnią się od mineralokortykoidów obecnością grupy 17alfa-OH. W warstwie kłębkowatej (zona glomerulosa) brak ekspresji genu CYP17A1 uniemożliwia produkcję kortyzolu, kierując szlak wyłącznie do aldosteronu. Z kolei enzym 11beta-HSD2 w cewkach dystalnych nerek chroni receptor mineralokortykoidowy (MR) przed zlewem kortyzolu, utleniając grupę 11beta-OH kortyzolu do nieaktywnej 11-ketogrupy kortyzonu.',
    summary:
      'Stereochemia steroidów kory nadnerczy opiera się na sztywnym szkielecie steranu i stereospecyficznych hydroksylacjach katalizowanych przez ferryl hemu cytochromów P450.',
    sourceIds: ['sterane_chem', 'cah_kinetics', 'cah_guideline'],
    questions: [
      q(
        'Ile atomów węgla liczy podstawowy szkielet steroidowy cholesterolu (prekursora steroidogenezy)?',
        ['27 atomów węgla (C27)', 'Podczas syntezy pregnenolonu zostaje skrócony do C21 przez odcięcie 6-węglowego łańcucha kapronowego.'],
        ['Dokładnie 6 atomów węgla', 'Sześć atomów węgla zawiera glukoza; cholesterol ma 27 atomów węgla.'],
        ['Ponad 1000 atomów węgla', 'Polimery mają tysiące węgli; cholesterol to mała cząsteczka lipidowa.']
      ),
      q(
        'Co oznacza oznaczenie podstawnika jako „alfa” (α) w nomenklaturze chemicznej steroidów?',
        ['Wiązanie jest skierowane pod płaszczyznę pierścienia (trans do kątowych grup metylowych)', 'Przykładowo grupa 17α-OH w kortyzolu leży poniżej płaszczyzny pierścienia D.'],
        ['Cząsteczka emituje promieniowanie alfa z rozpadu promieniotwórczego', 'Termin alfa w chemii steroidów określa wyłącznie konfigurację przestrzenną.'],
        ['Cząsteczka rozpuszcza się wyłącznie w alkoholu etylowym', 'Rozpuszczalność nie ma związku z prefiksem alfa w stereochemii.']
      ),
      q(
        'Jaki aminokwas w łańcuchu peptydowym cytochromów P450 stanowi proksymalny ligand koordynujący jon żelaza w hemie?',
        ['Reszta cysteiny (wiązanie tiolanowe Fe-S)', 'Nadaje enzymom P450 charakterystyczne maksimum absorpcji spektrofotometrycznej przy 450 nm w kompleksie z CO.'],
        ['Kwas glutaminowy', 'Kwas glutaminowy nie tworzy wiązania tiolanowego z żelazem porfirykowym.'],
        ['Czysta cząsteczka wody', 'Woda może być dystalnym ligandem wymiennym, ale nie ligandem proksymalnym.']
      ),
      q(
        'Który enzym odpowiada za ochronę receptora mineralokortykoidowego (MR) przed niekontrolowaną aktywacją przez kortyzol w nerkach?',
        ['Dehydrogenaza 11β-hydroksysteroidowa typu 2 (11β-HSD2)', 'Przekształca aktywny kortyzol w nieaktywny kortyzon poprzez utlenienie grupy 11β-OH do 11-keto.'],
        ['Oksydaza monoaminowa (MAO)', 'MAO uczestniczy w rozkładzie amin katecholowych, a nie steroidów.'],
        ['Lipaza trzustkowa', 'Lipaza trawi tłuszcze w świetle przewodu pokarmowego.']
      ),
      q(
        'Dlaczego w warstwie kłębkowatej (zona glomerulosa) kory nadnerczy nie powstaje kortyzol ani androgeny?',
        ['Z powodu braku ekspresji enzymu CYP17A1 (17α-hydroksylazy)', 'Szlak steroidogenezy jest tam zablokowany na poziomie progesteronu i kierowany do aldosteronu.'],
        ['Ponieważ nie dociera tam krew tętnicza', 'Warstwa kłębkowata leży bezpośrednio pod torebką i jest bogato unaczyniona.'],
        ['Ponieważ komórki tej warstwy nie mają mitochondriów', 'Mitochondria są niezbędne do wczesnych i późnych etapów syntezy aldosteronu.']
      ),
    ],
  },
  {
    id: 'nadnercza-chemia-katecholaminy',
    moduleId: 'nadnercza',
    title: 'Szlak biosyntezy i katabolizmu katecholamin: COMT, MAO i metanefryny',
    subtitle: 'Hydroksylaza tyrozynowa, n-metylacja PNMT i o-metylacja metanefryn',
    group: 'Chemia i biochemia',
    minutes: 19,
    goals: [
      'Przeanalizujesz kolejne etapy biochemiczne biosyntezy amin katecholowych z L-tyrozyny.',
      'Zrozumiesz molekularne szlaki inaktywacji przez enzymy COMT i MAO w kontekście diagnostyki guza chromochłonnego.',
    ],
    sections: [
      {
        title: 'Szlak biosyntezy katecholamin: Od tyrozyny do adrenaliny',
        text: 'Biosynteza w komórkach chromochłonnych rdzenia nadnerczy i neuronach współczulnych przebiega w 4 krokach: 1) L-tyrozyna ⟶ L-DOPA (hydroksylaza tyrozynowa TH — etap limitujący szybkość całego szlaku, zależny od tetrahydrobiopteryny BH4, Fe2+ i tlenu); 2) L-DOPA ⟶ Dopamina (dekarboksylaza aromatycznych L-aminokwasów AADC, kofaktor fosforan pirydoksalu PLP/wit. B6); 3) Dopamina ⟶ Noradrenalina (beta-hydroksylaza dopaminowa DBH wewnątrz pęcherzyków chromafinowych, kofaktor miedź i askorbinian); 4) Noradrenalina ⟶ Adrenalina (N-metylotransferaza fenyloetanoloaminowa PNMT w cytosolu, donor grupy metylowej S-adenozylo-L-metionina SAMe).',
      },
      {
        title: 'Rola kortyzolu w indukcji enzymu PNMT w rdzeniu nadnercza',
        text: 'Ekspresja genu PNMT jest silnie indukowana przez glukokortykoidy. Rdzeń nadnercza jest anatomicznie skąpany w krwi żylnej spływającej bezpośrednio z kory nadnerczy przez wrotny układ naczyniowy nadnerczy, co zapewnia stężenie kortyzolu 100-krotnie wyższe niż we krwi obwodowej. Dzięki temu komórki rdzenia posiadają wysoką ekspresję PNMT i wydzielają głównie adrenalinę (ok. 80%), podczas gdy zwoje współczulne pozbawione sąsiedztwa kory syntetyzują niemal wyłącznie noradrenalinę.',
      },
      {
        title: 'Katabolizm: COMT, MAO i diagnostyka metanefryn',
        text: 'Katecholaminy są unieczynniane przez dwa główne enzymy: katecholo-O-metylotransferazę (COMT, zależną od magnezu i SAMe, obecną obficie w komórkach guza pheochromocytoma) oraz monoaminooksydazę (MAO-A i MAO-B). COMT metyluje grupę 3-OH pierścienia katecholowego: noradrenalina przekształca się w normetanefrynę, a adrenalina w metanefrynę. W guzich chromochłonnych metanefryny powstają wewnątrzkomórkowo w sposób ciągły z puli niestabilnych pęcherzyków, co czyni wolne metanefryny w osoczu najczulszym markerem guza.',
      },
    ],
    table: {
      headers: ['Prekursor', 'Enzym i kofaktory', 'Produkt i znaczenie kliniczne'],
      rows: [
        ['L-Tyrozyna', 'Hydroksylaza tyrozynowa (TH) + BH4, O2', 'L-DOPA; etap ograniczający tempo syntezy (rate-limiting)'],
        ['Dopamina', 'Dopamine β-hydroxylase (DBH) + wit. C, Cu2+', 'Noradrenalina wewnątrz ziarnistości chromafinowych'],
        ['Noradrenalina', 'PNMT + SAMe (indukowana przez wysoki kortyzol)', 'Adrenalina; swoista dla rdzenia nadnercza, rzadziej pozanadnerczowych paraganglioma'],
        ['Normetanefryna / Metanefryna', 'COMT (O-metylacja grupy 3-OH)', 'Kluczowe markery diagnostyczne guza chromochłonnego w osoczu i moczu'],
      ],
    },
    advanced:
      'Głównym końcowym metabolitem wydalanym w moczu jest kwas 4-hydroksy-3-metoksymigdałowy (kwas wanilinomigdałowy, VMA), powstający po połączonym działaniu enzymów COMT i MAO z udziałem dehydrogenazy aldehydowej. Oznaczanie VMA w dobowej zbiórce moczu cechuje się jednak niższą czułością niż pomiar wolnych metanefryn, ponieważ metanefryny odzwierciedlają metabolizm wewnątrzguzowy, niezależny od napadowego uwalniania.',
    summary:
      'Biosynteza katecholamin wymaga kaskady 4 enzymów z kluczową rolą indukcji PNMT przez kortyzol, a ich O-metylacja przez COMT generuje diagnostyczne metanefryny.',
    sourceIds: ['endo_pheo', 'sterane_chem', 'pte_nadnercza'],
    questions: [
      q(
        'Jaki enzym katalizuje pierwszy i ograniczający szybkość (rate-limiting) etap biosyntezy katecholamin z tyrozyny?',
        ['Hydroksylaza tyrozynowa (TH)', 'Wymaga tetrahydrobiopteryny (BH4), tlenu i jonów żelaza do wytworzenia L-DOPA.'],
        ['Katecholo-O-metylotransferaza (COMT)', 'COMT jest enzymem degradacji i unieczynniania, nie syntezy.'],
        ['Pompa protonowa żołądka', 'Pompa protonowa transportuje jony H+ w żołądku.']
      ),
      q(
        'Dlaczego rdzeń nadnerczy wytwarza głównie adrenalinę, podczas gdy zwoje współczulne wytwarzają prawie wyłącznie noradrenalinę?',
        ['Ekspresja enzymu PNMT w rdzeniu jest silnie indukowana przez wysokie stężenia kortyzolu z krążenia wrotnego kory', 'Krew omywająca rdzeń ma stężenie kortyzolu 100 razy wyższe niż krew obwodowa.'],
        ['W zwojach współczulnych nie ma atomów azotu', 'Zarówno noradrenalina jak i adrenalina zawierają azot aminowy.'],
        ['Adrenalina jest zakazana w układzie nerwowym przez barierę krew-mózg', 'Neurony adrenergiczne OUN wykorzystują enzym PNMT, ale w zwojach obwodowych go brak.']
      ),
      q(
        'Dlaczego pomiar wolnych metanefryn w osoczu cechuje się wyższą czułością w wykrywaniu pheochromocytoma niż pomiar samej noradrenaliny?',
        ['Metanefryny powstają wewnątrz guza w sposób ciągły z powodu ekspresji COMT, a katecholaminy są wydzielane napadowo', 'Pomiędzy napadami stężenie katecholamin może być prawidłowe, podczas gdy metanefryny są stale podwyższone.'],
        ['Ponieważ metanefryny świecą w ciemności pod lampą UV', 'Oznaczenia laboratoryjne wykorzystują tandemową spektrometrię mas (LC-MS/MS).'],
        ['Ponieważ noradrenalina nie przechodzi do moczu', 'Noradrenalina przechodzi do moczu, lecz w zmiennych ilościach.']
      ),
      q(
        'Co jest uniwersalnym donorem grupy metylowej w reakcji przekształcenia noradrenaliny w adrenalinę przez enzym PNMT?',
        ['S-Adenozylo-L-metionina (SAMe)', 'Oddaje grupę metylową na atom azotu z utworzeniem S-adenozylohomocysteiny.'],
        ['Glukozo-6-fosforan', 'Jest intermediatem glikolizy, nie donorem grup metylowych.'],
        ['Kwas solny', 'HCl nie bierze udziału w reakcjach metylacji enzymatycznej.']
      ),
      q(
        'Jaki jon metalu jest niezbędnym kofaktorem w centrum aktywnym enzymu COMT (katecholo-O-metylotransferazy)?',
        ['Jon magnezu (Mg2+)', 'Koordynuje obie grupy hydroksylowe pierścienia katecholowego, umożliwiając deprotonację i atak na grupę metylową SAMe.'],
        ['Czyste złoto (Au3+)', 'Metale szlachetne nie są fizjologicznymi kofaktorami enzymatycznymi człowieka.'],
        ['Rtęć metaliczna', 'Rtęć jest toksyną blokującą grupy tiolowe, nie kofaktorem.']
      ),
    ],
  },
];
