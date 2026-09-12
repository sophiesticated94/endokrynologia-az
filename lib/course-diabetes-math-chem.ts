import { type DraftLesson, q } from './course-types.ts';

export const draftDiabetesMathChem: DraftLesson[] = [
  {
    id: 'cukrzyca-matematyka-modele',
    title: 'Modele glukoza–insulina i ich ograniczenia',
    subtitle: 'Minimal Model Bergmana, HOMA, statystyka CGM i bezpieczna interpretacja reguł empirycznych',
    group: 'Matematyka i modele',
    minutes: 18,
    goals: [
      'Wyprowadzisz Minimalny Model Bergmana dynamiki glukozy i insuliny.',
      'Odróżnisz model badawczy i regułę orientacyjną od indywidualnego ustawienia insulinoterapii.',
    ],
    sections: [
      {
        title: 'Minimalny Model Bergmana (Bergman Minimal Model)',
        text: 'W 1979 roku Richard Bergman zaproponował układ dwóch sprzężonych nieliniowych równań różniczkowych opisujących kinetykę glukozy w osoczu $G(t)$ oraz aktywność insuliny w przedziale pośrednim (ścieżce śródtkankowej) $X(t)$. Równania te stanowią fundament biocybernetyki diabetologicznej: $\\frac{dG(t)}{dt} = -[p_1 + X(t)] G(t) + p_1 G_b$, gdzie $p_1$ to niezależny od insuliny klirens glukozy (efektywność glukozowa $S_G$), $G_b$ to stężenie glukozy w stanie równowagi na czczo. Dynamikę insuliny opisuje drugie równanie: $\\frac{dX(t)}{dt} = -p_2 X(t) + p_3 [I(t) - I_b]$, gdzie $I_b$ to bazowa insulinemia. Wrażliwość na insulinę definiuje iloraz $S_I = \\frac{p_3}{p_2}$.',
      },
      {
        title: 'Wskaźniki HOMA-IR i HOMA-B w stanie stacjonarnym',
        text: 'Model homeostazy Matthews’a (HOMA) wiąże glikemię i insulinemię oznaczone na czczo w stabilnych warunkach. Uproszczony HOMA-IR wyraża formuła: $\\text{HOMA-IR} = \\frac{G_0 \\cdot I_0}{22{,}5}$ dla glukozy w mmol/l i insuliny w $\\mu\\text{U/ml}$ lub $\\frac{G_0 \\cdot I_0}{405}$ dla glukozy w mg/dl. Wynik zależy od metody oznaczenia, populacji i warunków pobrania; nie istnieje jeden uniwersalny próg diagnostyczny dla pojedynczego pacjenta. HOMA nie służy do oceny ostrej hiperglikemii ani do samodzielnego ustalania leczenia.',
      },
      {
        title: 'Reguły orientacyjne — nie kalkulator dawki',
        text: 'Reguły 1800 i 500 bywają używane jako punkty startowe do oszacowania ISF i ICR na podstawie znanej, stabilnej całkowitej dawki dobowej. Rzeczywista odpowiedź zależy m.in. od aktywnej insuliny, trendu CGM, posiłku, wysiłku, choroby i pory dnia. W tej lekcji służą wyłącznie do zrozumienia zależności odwrotnej: większe TDD zwykle oznacza mniejszą wrażliwość. Aplikacja nie wylicza ani nie rekomenduje indywidualnego bolusa.',
      },
    ],
    table: {
      headers: ['Parametr matematyczny', 'Wzór / Reguła', 'Fizjologiczne znaczenie kliniczne'],
      rows: [
        ['ISF (Współczynnik wrażliwości)', '\\text{ISF} = \\frac{1800}{\\text{TDD}}', 'Spadek glikemii [mg/dl] wywołany 1 jednostką insuliny'],
        ['ICR (Wskaźnik węglowodanowy)', '\\text{ICR} = \\frac{500}{\\text{TDD}}', 'Liczba gramów węglowodanów zrównoważona przez 1 jednostkę'],
        ['HOMA-IR', '\\frac{G_0 [\\text{mmol/l}] \\cdot I_0}{22{,}5}', 'Ilościowa miara insulinooporności wątrobowej i obwodowej'],
        ['Współczynnik zmienności (CV)', 'CV = \\frac{\\text{SD}}{\\text{Mean}} \\cdot 100\\%', 'Miara chwiejności glikemii (wartość docelowa \\le 36\\%)'],
        ['Wskaźnik GMI (CGM)', 'GMI = 3{,}31 + 0{,}02392 \\cdot \\overline{G}', 'Szacowane stężenie HbA1c wyliczone ze średniej sensora'],
      ],
    },
    advanced:
      'W systemach sztucznej trzustki (AID) model predykcyjny uwzględnia kinetykę pierwszego rzędu zanikania insuliny w przedziale podskórnym $I_{sc}$ ze stałą absorpcji $k_a$ oraz klirens insuliny z osocza $k_e$: $IOB(t) = \\text{Bolus} \\cdot \\left(1 - \\frac{t}{\\tau}\\right) e^{-k t}$. Zaawansowane algorytmy MPC (Model Predictive Control) rozwiązują w czasie rzeczywistym problem optymalizacyjny minimalizujący kwadrat odchylenia glikemii od trajektorii docelowej przy ograniczeniach na maksymalną dawkę bazy.',
    summary:
      'Modele porządkują zależności, ale nie zastępują pomiaru ani indywidualnych ustawień. HOMA wymaga stabilnych warunków, a reguły ISF/ICR są tylko orientacyjnymi punktami startowymi.',
    sourceIds: ['bergman_model', 'cgm_consensus', 'ada_standards'],
    derivation: {
      title: 'Wyprowadzenie Minimalnego Modelu Bergmana i reguł pomp insulinowych',
      model: 'Układ nieliniowych równań różniczkowych dwukomorowych Bergmana i bilans masowy bolusa',
      steps: [
        {
          step: 'Dynamika komory glukozy (przedział osoczowy)',
          equation: '\\frac{dG(t)}{dt} = -[p_1 + X(t)] G(t) + p_1 G_b',
          explanation: 'Spadek glikemii wynika z klirensu niezależnego od insuliny $p_1$ oraz klirensu przyspieszanego przez aktywną insulinę w przedziale śródtkankowym $X(t)$. $G_b$ to stężenie na czczo.',
        },
        {
          step: 'Dynamika komory insuliny w przedziale pośrednim',
          equation: '\\frac{dX(t)}{dt} = -p_2 X(t) + p_3 [I(t) - I_b]',
          explanation: 'Aktywna insulina $X(t)$ narasta proporcjonalnie do stężenia insuliny osoczowej $I(t)$ ponad bazę $I_b$ i zanika ze stałą degradacji $p_2$. Wrażliwość na insulinę to $S_I = \\frac{p_3}{p_2}$.',
        },
        {
          step: 'Stan równowagi i formuła HOMA-IR',
          equation: '\\text{HOMA-IR} = \\frac{G_0 \\cdot I_0}{22{,}5} \\qquad (G_0 \\text{ w mmol/l}, I_0 \\text{ w } \\mu\\text{U/ml})',
          explanation: 'Wyprowadzona z linearyzacji modelu Bergmana wokół punktu równowagi na czczo u zdrowych ochotników (wartość odniesienia HOMA-IR = 1,0).',
        },
        {
          step: 'Reguła 1800 na współczynnik wrażliwości (ISF)',
          equation: '\\text{ISF} = \\frac{1800}{\\text{TDD}} \\quad [\\text{mg/dl / j.}] \\qquad \\text{lub} \\qquad \\text{ISF} = \\frac{100}{\\text{TDD}} \\quad [\\text{mmol/l / j.}]',
          explanation: 'Doświadczalna stała fizjologiczna Paulsona: 1 jednostka insuliny metabolizuje u osoby dorosłej określoną masę glukozy zależną odwrotnie od dobowego zapotrzebowania TDD.',
        },
        {
          step: 'Reguła 500 na wskaźnik węglowodanowo-insulinowy (ICR)',
          equation: '\\text{ICR} = \\frac{500}{\\text{TDD}} \\quad [\\text{g węglowodanów / j.}]',
          explanation: 'Określa gramaturę węglowodanów zrównoważoną przez 1 j. insuliny podanej w bolusie prandialnym.',
        },
      ],
      clinicalTakeaway: 'ISF i ICR należy weryfikować na danych tej osoby i w bezpiecznych warunkach. Sam wzór nie uwzględnia wszystkich czynników i nie powinien generować dawki w aplikacji edukacyjnej.',
    },
    workedExample: {
      title: 'Porównanie orientacyjnych współczynników bez wyznaczania dawki',
      patient: 'Dwa anonimowe zestawy danych dydaktycznych ze stabilną, znaną całkowitą dawką dobową. Ćwiczenie pokazuje kierunek zależności, nie plan leczenia.',
      inputs: [
        { label: 'Masa ciała', value: '70', unit: 'kg' },
        { label: 'Szacowane TDD (0,6 j./kg)', value: '42', unit: 'j./dobę' },
        { label: 'Aktualna glikemia', value: '220', unit: 'mg/dl' },
        { label: 'Glikemia docelowa', value: '100', unit: 'mg/dl' },
        { label: 'Węglowodany w posiłku', value: '60', unit: 'g' },
      ],
      calculationSteps: [
        'Krok 1: Dla znanego TDD = 42 j./dobę reguła 1800 daje orientacyjne $ISF \\approx 43$ mg/dl/j.',
        'Krok 2: Reguła 500 daje orientacyjne $ICR \\approx 12$ g/j.',
        'Krok 3: Są to hipotezy startowe, które wymagają obserwacji w powtarzalnych warunkach; nie są dawką do zastosowania.',
        'Krok 4: Przed każdą rzeczywistą decyzją potrzebne są indywidualne ustawienia, aktywna insulina, trend, posiłek, wysiłek i plan bezpieczeństwa.',
      ],
      result: 'Obliczenia dają wyłącznie wartości orientacyjne. Nie wolno z nich wyprowadzić dawki bez zweryfikowanych ustawień, aktywnej insuliny i pełnego kontekstu.',
      clinicalAction: 'W praktyce współczynniki ustala i weryfikuje zespół prowadzący wraz z osobą chorującą na cukrzycę; ten przykład nie rekomenduje dawki.',
    },
    questions: [
      q('Pacjent przyjmuje 50 jednostek insuliny na dobę (TDD = 50 j.). Ile wynosi jego współczynnik wrażliwości na insulinę (ISF) wg reguły 1800?',
        ['36 mg/dl na 1 jednostkę insuliny (1800 / 50 = 36)', 'Oznacza to, że 1 j. insuliny obniży jego glikemię średnio o 36 mg/dl.'],
        ['50 mg/dl na 1 jednostkę', 'Wartość 50 odpowiadałaby dobowemu TDD wynoszącemu 36 jednostek.'],
        ['10 mg/dl na 1 jednostkę', 'Zaniżony ISF doprowadziłby do podania 3-krotnie za dużej dawki korekcyjnej i ciężkiej hipoglikemii.']),
      q('Dla pacjenta o TDD = 50 j. ile wynosi wskaźnik węglowodanowo-insulinowy (ICR) wg reguły 500?',
        ['10 gramów węglowodanów na 1 jednostkę insuliny (500 / 50 = 10)', '1 jednostka analogu zrównoważy 10 g węglowodanów (1 wymiennik węglowodanowy WW).'],
        ['25 gramów na 1 jednostkę', 'Zawyżony ICR spowodowałby podanie zbyt małej dawki insuliny i hiperglikemię poposiłkową.'],
        ['2 gramy na 1 jednostkę', 'Taki wskaźnik cechuje skrajną insulinooporność w przebiegu akromegalii lub zespołu Cushinga.']),
      q('Co oznacza zmienna X(t) w Minimalnym Modelu Bergmana?',
        ['Stężenie aktywnej insuliny w przedziale śródtkankowym (pośrednim), która bezpośrednio stymuluje wychwyt glukozy', 'Insulina osoczowa I(t) musi przedostać się przez śródbłonek do płynu śródtkankowego, co tworzy opóźnienie dynamiczne.'],
        ['Stężenie peptydu C w moczu', 'Model Bergmana nie uwzględnia peptydu C w podstawowym układzie równań.'],
        ['Ilość glikogenu zmagazynowanego w hepatocytach', 'Glikogen wątrobowy wchodzi w składową parametru Gb i klirensu p1.']),
      q('Pacjent z glikemią na czczo 180 mg/dl (10,0 mmol/l) i insulinemią 25 uU/ml ma wskaźnik HOMA-IR równy:',
        ['11,1 — świadczący o potężnej insulinooporności (180 * 25 / 405 = 11,1)', 'Norma HOMA-IR u zdrowych wynosi < 2,0–2,5; wynik 11,1 wskazuje na głęboką oporność tkanek.'],
        ['1,0 — idealnie prawidłowy', 'Wartość 1,0 występuje przy glikemii 90 mg/dl i insulinie 4,5 uU/ml.'],
        ['0,2 — wskazujący na bezwzględny brak insuliny', 'Niski HOMA-IR przy hiperglikemii oznacza wyczerpanie komórek beta (T1D), nie insulinooporność.']),
      q('Jaką wartość współczynnika zmienności glikemii (CV) uznaje się w raporcie AGP za granicę między stabilną a chwiejną glikemią?',
        ['CV = 36%', 'Wartość CV <= 36% oznacza stabilną glikemię; CV > 36% to chwiejność niosąca wysokie ryzyko hipoglikemii.'],
        ['CV = 70%', '70% to wartość docelowa dla parametru Time in Range (TIR), nie dla CV.'],
        ['CV = 5%', 'Taka wartość jest nierealna u człowieka nawet bez cukrzycy.']),
    ],
  },
  {
    id: 'cukrzyca-chemia-biochemia',
    title: 'Biochemia receptora insulinowego i szlaki ketogenezy',
    subtitle: 'Kinaza tyrozynowa, szlak IRS-1/PI3K/Akt/AS160/GLUT4, ketogeneza mitochondrialna i stereochemia analogów',
    group: 'Chemia i biochemia',
    minutes: 18,
    goals: [
      'Opiszesz molekularny szlak transdukcji sygnału receptora insulinowego aż do translokacji GLUT4.',
      'Scharakteryzujesz reakcje ketogenezy w mitochondriach hepatocytów oraz modyfikacje chemiczne analogów insuliny.',
    ],
    sections: [
      {
        title: 'Kaskada receptora insulinowego (INSR)',
        text: 'Receptor insulinowy jest heterotetramerem związanym mostkami dwusiarczkowymi (\\alpha_2 \\beta_2). Związanie insuliny z podjednostkami \\alpha indukuje autofosforylację reszt tyrozynowych (Tyr1158, Tyr1162, Tyr1163) w pętli aktywacyjnej podjednostki \\beta (kinazy tyrozynowej). Aktywny receptor fosforyluje białka adaptorowe IRS-1 i IRS-2 na resztach tyrozyny. Do ufosforylowanego IRS-1 przyłącza się kinaza 3-fosfoinozytydowa (PI3K) przez domenę SH2 podjednostki regulatorowej p85, co aktywuje domenę katalityczną p110 do syntezy trójfosforanu fosfatydyloinozytolu PIP3 z PIP2.',
      },
      {
        title: 'Od kinazy Akt/PKB do translokacji transportera GLUT4',
        text: 'Powstały $PIP_3$ w błonie rekrutuje kinazę PDK1 oraz kinazę białkową B (Akt / PKB) przez ich domeny PH. PDK1 fosforyluje Akt na Thr308, a kompleks mTORC2 na Ser473, osiągając pełną aktywność katalityczną. Aktywny Akt fosforyluje białko AS160 (Akt Substrate of 160 kDa — białko aktywujące GTP-azę Rab, Rab-GAP). Ufosforylowane AS160 przestaje hamować białka Rab (Rab8A, Rab10, Rab14), co umożliwia fuzję wewnątrzkomórkowych pęcherzyków GSV (GLUT4 Storage Vesicles) z błoną komórkową mięśni szkieletowych i adipocytów i gwałtowny napływ glukozy.',
      },
      {
        title: 'Biochemia ketogenezy w mitochondriach wątroby',
        text: 'W warunkach niedoboru insuliny nadmiar wolnych kwasów tłuszczowych ulega w hepatocytach beta-oksydacji, tworząc nadmiar acetylo-CoA. Szczawiooctan zostaje wyczerpany przez nasiloną glukoneogenezę, co blokuje cykl Krebsa. Acetylo-CoA wchodzi w 4-etapowy szlak ketogenezy: 1) Tiolaza kondensuje 2 cząsteczki acetylo-CoA w acetooctylo-CoA; 2) Syntaza HMG-CoA dołącza trzeci acetylo-CoA, tworząc beta-hydroksy-beta-metyloglutarylo-CoA (HMG-CoA) — enzym ograniczający szybkość; 3) Liaza HMG-CoA odszczepia acetylo-CoA, uwalniając wolny acetooctan; 4) Dehydrogenaza beta-hydroksymaślanowa zależna od NADH redukuje acetooctan do beta-hydroksymaślanu.',
      },
    ],
    table: {
      headers: ['Etap szlaku molekularnego', 'Kluczowe enzymy / Białka', 'Rola biochemiczna'],
      rows: [
        ['Autofosforylacja receptora', 'INSR kinaza tyrozynowa (Tyr1158/62/63)', 'Otwarcie szczeliny katalitycznej dla substratów IRS'],
        ['Generowanie drugiego przekaźnika', 'PI3K (p85/p110) : PIP2 -> PIP3', 'Stworzenie miejsca dokowania domeny PH dla PDK1 i Akt'],
        ['Fosforylacja AS160', 'Kinaza Akt/PKB -> AS160 (Rab-GAP)', 'Odhamowanie białek Rab i egzocytoza pęcherzyków GLUT4'],
        ['Kluczowy enzym ketogenezy', 'Syntaza HMG-CoA mitochondrialna (HMGCS2)', 'Kondensacja acetoacetylo-CoA z acetylo-CoA (punkt kontrolny)'],
        ['Redukcja ketonów', 'Dehydrogenaza beta-hydroksymaślanowa', 'Przekształcenie acetooctanu w beta-hydroksymaślan zależnie od NADH/NAD+'],
      ],
    },
    advanced:
      'Stereochemia analogów insuliny: 1) Lispro: zamiana sekwencji ProB28-LysB29 na LysB28-ProB29 w pętli C-końcowej łańcucha B uniemożliwia tworzenie wiązań wodorowych niezbędnych do dimeryzacji monomerów; 2) Glargina: dodanie dwóch dodatnich reszt argininy (ArgB31-ArgB32) i zamiana AsnA21 na Gly przesuwa punkt izoelektryczny pI z 5,4 na 6,7 — w kwaśnym fiolkowym roztworze (pH 4,0) jest rozpuszczalna, a po wstrzyknięciu w pH tkanki 7,4 mikrowytrąca się w kryształki; 3) Degludec: usunięcie ThrB30 i dołączenie kwasu heksadekanodiowego do LysB29 umożliwia tworzenie podskórnych łańcuchów wieloheksamerowych wiążących się odwracalnie z albuminami.',
    summary:
      'Sygnał insuliny biegnie przez receptor tyrozynowy, IRS-1, PI3K, Akt i inaktywację AS160, co uwalnia pęcherzyki z GLUT4. Ketogeneza w wątrobie wynika z nadmiaru acetylo-CoA i działania syntazy HMG-CoA.',
    sourceIds: ['insulin_biochem', 'ketogenesis_biochem', 'ptd_guidelines'],
    derivation: {
      title: 'Stechiometria ketogenezy i wyprowadzenie luki anionowej (Anion Gap)',
      model: 'Mitochondrialny szlak HMG-CoA oraz prawo elektroobojętności płynów ustrojowych',
      steps: [
        {
          step: 'Kondensacja tiolazowa i synteza HMG-CoA',
          equation: '2\\,\\text{Acetylo-CoA} \\xrightleftharpoons{\\text{Tiolaza}} \\text{Acetoacetylo-CoA} + \\text{CoA-SH}',
          explanation: 'Następnie syntaza HMG-CoA dołącza trzecią cząsteczkę acetylo-CoA: $\\text{Acetoacetylo-CoA} + \\text{Acetylo-CoA} + H_2O \\longrightarrow \\text{HMG-CoA} + \\text{CoA-SH}$.',
        },
        {
          step: 'Uwolnienie acetooctanu i redukcja do beta-hydroksymaślanu',
          equation: '\\text{Acetooctan} + \\text{NADH} + H^+ \\xrightleftharpoons{\\beta\\text{-HBDH}} \\beta\\text{-Hydroksymaślan} + \\text{NAD}^+',
          explanation: 'W ciężkiej kwasicy wysoki stosunek NADH/NAD+ przesuwa równowagę w prawo — beta-hydroksymaślan stanowi ponad 85–90% puli krążących ciał ketonowych.',
        },
        {
          step: 'Prawo elektroobojętności osocza i definicja luki anionowej',
          equation: '[Na^+] + [\\text{niemierzone kationy}] = [Cl^-] + [HCO_3^-] + [\\text{niemierzone aniony}]',
          explanation: 'Niemierzone aniony to albuminy, fosforany, siarczany oraz patologiczne aniony ketonowe (acetooctan, beta-hydroksymaślan).',
        },
        {
          step: 'Równanie luki anionowej w kwasicy ketonowej (DKA)',
          equation: '\\text{AG} = [Na^+] - \\left([Cl^-] + [HCO_3^-]\\right) > 12\\,\\text{mmol/L}',
          explanation: 'Nagromadzenie kwasów ketonowych zużywa bufor wodorowęglanowy ($H^+ + HCO_3^- \\to H_2CO_3 \\to H_2O + CO_2\\uparrow$), zastępując go anionem ketonowym, co podbija AG nawet do 25–35 mmol/L.',
        },
      ],
      clinicalTakeaway: 'Monitorowanie skuteczności leczenia DKA polega na zamykaniu luki anionowej (spadek AG do normy 8–12 mmol/l) oraz pomiarze stężenia beta-hydroksymaślanu we krwi, a nie na ocenie acetonu w moczu.',
    },
    workedExample: {
      title: 'Biochemiczna analiza gazometrii, luki anionowej i stężenia ketonów w kwasicy DKA',
      patient: 'Kobieta, 21 lat, świeżo rozpoznana cukrzyca typu 1, przyjęta na SOR z dusznością Kussmaula, zapachem acetonu z ust, odwodniona.',
      inputs: [
        { label: 'Sód w surowicy ([Na+])', value: '132', unit: 'mmol/L' },
        { label: 'Chlorki w surowicy ([Cl-])', value: '94', unit: 'mmol/L' },
        { label: 'Wodorowęglany ([HCO3-])', value: '8', unit: 'mmol/L' },
        { label: 'Glikemia w osoczu', value: '450', unit: 'mg/dl' },
        { label: 'pH krwi tętniczej', value: '7,12', unit: '' },
      ],
      calculationSteps: [
        'Krok 1: Wyliczenie luki anionowej osocza: $\\text{AG} = [Na^+] - ([Cl^-] + [HCO_3^-]) = 132 - (94 + 8) = 132 - 102 = 30\\,\\text{mmol/L}$ (norma: 8–12 mmol/L).',
        'Krok 2: Nadwyżka luki anionowej: $\\Delta \\text{AG} = 30 - 12 = 18\\,\\text{mmol/L}$ (świadczy o ciężkiej kwasicy z wysoką luką anionową HAGMA).',
        'Krok 3: Wyliczenie skorygowanego stężenia sodu wg reguły Katza: $[Na^+]_{\\text{skorygowany}} = [Na^+] + 0{,}016 \\times (G - 100) = 132 + 0{,}016 \\times (450 - 100) = 132 + 5{,}6 = 137{,}6\\,\\text{mmol/L}$.',
        'Krok 4: Weryfikacja stężenia beta-hydroksymaślanu włośniczkowego: wynik $6{,}4\\,\\text{mmol/L}$ (norma $<0{,}6$, kryterium DKA $\\ge 3{,}0\\,\\text{mmol/L}$).',
        'Krok 5: Ocena kompensacji oddechowej (reguła Wintera): spodziewane $pCO_2 = 1{,}5 \\times [HCO_3^-] + 8 \\pm 2 = 1{,}5 \\times 8 + 8 = 20 \\pm 2\\,\\text{mmHg}$. Wynik pacjentki $pCO_2 = 19\\,\\text{mmHg}$ potwierdza czystą kwasicę metaboliczną z prawidłową kompensacją Kussmaula.',
      ],
      result: 'Wyniki spełniają kryteria DKA i wskazują na ciężką kwasicę. Luka anionowa pomaga opisać zaburzenie, ale konsensus 2024 nie zaleca jej jako jedynego kryterium ustąpienia DKA.',
      clinicalAction: 'To stan nagły wymagający leczenia i częstego monitorowania według aktualnego protokołu. Dobór płynu, insuliny i potasu zależy m.in. od stanu krążenia, stężenia potasu, chorób współistniejących i seryjnych wyników; przykład nie wyznacza dawek.',
    },
    questions: [
      q('Które białko bezpośrednio reguluje fuzję pęcherzyków zawierających transporter GLUT4 z błoną komórkową po ufosforylowaniu przez kinazę Akt?',
        ['AS160 (Rab-GAP — białko aktywujące GTP-azę Rab)', 'Fosforylacja przez Akt wyłącza aktywność GAP w AS160, co pozwala białkom Rab związać GTP i skierować GLUT4 do błony.'],
        ['Białko p53', 'P53 to czynnik transkrypcyjny supresorowy nowotworów, nie uczestniczy w translokacji GLUT4.'],
        ['Syntaza cytrynianowa', 'Syntaza cytrynianowa to enzym macierzy mitochondrialnej cyklu Krebsa.']),
      q('Dlaczego w ciężkiej kwasicy ketonowej pomiar beta-hydroksymaślanu we krwi jest znacznie dokładniejszy niż test paskowy moczu na acetooctan?',
        ['Wysoki potencjał redukcyjny (nadmiar NADH) przekształca niemal cały acetooctan w beta-hydroksymaślan, którego test paskowy nie wykrywa', 'W trakcie skutecznego leczenia beta-hydroksymaślan utlenia się z powrotem do acetooctanu, co może dawać paradoksalny wzrost ketonurii!'],
        ['Test paskowy w moczu ulega natychmiastowemu zniszczeniu przez glukozę', 'Glukozuria nie niszczy paska nitroprusydkowego.'],
        ['Beta-hydroksymaślan nie jest filtrowany przez kłębuszki nerkowe', 'Jest filtrowany, ale klasyczne paski nitroprusydkowe Legal reagują tylko z grupą ketonową acetooctanu.']),
      q('Jaki enzym stanowi kluczowy punkt kontrolny ograniczający tempo ketogenezy w mitochondriach wątroby?',
        ['Mitochondrialna syntaza HMG-CoA (HMGCS2)', 'Jej ekspresja jest silnie indukowana przez glukagon i hamowana przez insulinę.'],
        ['Glukokinaza', 'Glukokinaza fosforyluje glukozę w cytoplazmie.'],
        ['Reduktaza HMG-CoA', 'Reduktaza HMG-CoA to enzym syntezy cholesterolu w retikulum endoplazmatycznym (cel statyn), a nie ketogenezy.']),
      q('Jaka modyfikacja chemiczna w cząsteczce insuliny glargina zapewnia jej przedłużone, bezszczytowe działanie przez 24 godziny?',
        ['Dodanie dwóch cząsteczek argininy do C-końca łańcucha B, co przesuwa punkt izoelektryczny ku pH obojętnemu i powoduje mikrowytrącanie podskórne', 'W fizjologicznym pH tkanki podskórnej glargina tworzy mikrostrąty powoli uwalniające monomery.'],
        ['Dołączenie cząsteczki cholesterolu', 'Insulina nie jest modyfikowana cholesterolem.'],
        ['Usunięcie całego łańcucha A', 'Łańcuch A jest niezbędny do wiązania z receptorem insulinowym; jego usunięcie zniosłoby aktywność.']),
      q('Co dzieje się z luką anionową (AG) w surowicy pacjenta z cukrzycową kwasicą ketonową (DKA)?',
        ['Wzrasta znacznie powyżej normy (> 12 mmol/l, często osiągając 25–35 mmol/l)', 'Kwasica ketonowa jest klasycznym przykładem kwasicy metabolicznej ze zwiększoną luką anionową (HAGMA).'],
        ['Spada poniżej zera (AG < 0)', 'Ujemna luka anionowa to rzadki błąd laboratoryjny lub ciężka hiperbromidemia.'],
        ['Pozostaje całkowicie stała i wynosi dokładnie 4 mmol/l', 'Norma luki anionowej to 8–12 mmol/l, a obecność anionów ketonowych silnie ją podwyższa.']),
    ],
  },
];
