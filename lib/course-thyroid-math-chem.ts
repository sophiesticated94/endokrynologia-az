import { type DraftLesson, type Source, q } from './course-types.ts';

export const thyroidMathChemSources: Record<string, Source> = {
  spina: {
    id: 'spina',
    title: 'SPINA-GB / SPINA-GT Mathematical Endocrine Modeling and Structural Homeostasis',
    year: '2024',
    url: 'https://doi.org/10.3389/fendo.2024.137890',
    kind: 'Model matematyczny',
  },
  tpo_chem: {
    id: 'tpo_chem',
    title: 'Structure and Radical Catalytic Cycle of Thyroid Peroxidase (TPO)',
    year: '2023',
    url: 'https://doi.org/10.1016/j.bbapap.2023.140880',
    kind: 'Biochemia i stereochemia',
  },
};

export const draftThyroidMathChem: DraftLesson[] = [
  {
    id: 'tarczyca-matematyka-kinetyka',
    moduleId: 'tarczyca',
    title: 'Farmakokinetyka lewotyroksyny i model dwukompartmentowy',
    subtitle: 'Objętość dystrybucji, okres półtrwania i stężenie stacjonarne Css',
    group: 'Matematyka i modele',
    minutes: 18,
    goals: [
      'Wyprowadzisz wzór na stężenie stacjonarne Css lewotyroksyny w modelu jedno- i dwukompartmentowym.',
      'Obliczysz czas do osiągnięcia stanu równowagi na podstawie stałej eliminacji ke i t1/2.',
    ],
    sections: [
      {
        title: 'Model jedno- i dwukompartmentowy dystrybucji T4',
        text: 'Lewotyroksyna (T4) charakteryzuje się pozorną objętością dystrybucji Vd wynoszącą około 11–15 L (ok. 0,15–0,2 L/kg u dorosłego). Ponad 99,97% krążącego hormonu jest związane z białkami osocza (TBG, transtyretyna, albumina). W modelu dwukompartmentowym po podaniu doustnym następuje faza szybkiej dystrybucji naczyniowej (kompartment centralny V1), po której następuje powolna wymiana z pulą tkankową i wewnątrzkomórkową (kompartment obwodowy V2, zwłaszcza wątroba i mięśnie szkieletowe).',
      },
      {
        title: 'Kinetyka rzędu pierwszego i czas półtrwania (t1/2 = 7 dni)',
        text: 'Eliminacja T4 podlega kinetyce I rzędu: dC/dt = -ke * C, gdzie stała eliminacji ke wynosi około 0,10 na dobę (0,0042 h^-1). Okres półtrwania wynosi t1/2 = ln(2) / ke ≈ 6,9–7,0 dni u osób w eutyreozie. W niedoczynności t1/2 ulega wydłużeniu do 9–10 dni (z powodu obniżonego metabolizmu), a w nadczynności skraca się do 3–4 dni. Stan równowagi stacjonarnej (steady-state, Css) osiągany jest po 4–5 okresach półtrwania, czyli po około 35–42 dniach (5–6 tygodni).',
      },
      {
        title: 'Formuła stężenia stacjonarnego i fluktuacje międzydawkowe',
        text: 'Średnie stężenie w stanie stacjonarnym wynosi: Css = (F * D) / (Cl * tau), gdzie F to biodostępność (ok. 0,65–0,80 na czczo), D to dawka dobowa, Cl to klirens całkowity (Cl = ke * Vd ≈ 0,05 L/h), a tau to interwał dawkowania (24 h). Z uwagi na długi t1/2 wskaźnik fluktuacji międzydawkowej (Cmax - Cmin)/Css wynosi zaledwie 10–14%, co tłumaczy, dlaczego jednorazowe pominięcie tabletki ma znikomy wpływ na profil stężeń.',
      },
    ],
    table: {
      headers: ['Parametr PK', 'Wartość liczbowa', 'Znaczenie kliniczne'],
      rows: [
        ['Okres półtrwania (t1/2)', '7 dni (168 h)', 'Kontrola TSH najwcześniej po 6–8 tygodniach od korekty dawki'],
        ['Objętość dystrybucji (Vd)', '11–15 L (0,18 L/kg)', 'Ograniczona głównie do osocza i wątroby przez silne wiązanie z TBG'],
        ['Biodostępność (F)', '65–80% na czczo', 'Pokarm, kawa, żelazo i wapń zmniejszają F nawet o 30–50%'],
        ['Czas do steady-state', '4–5 x t1/2 (35–42 dni)', 'Fizjologiczny powód, dla którego TSH nie bada się po 7 dniach'],
      ],
    },
    advanced:
      'Zależność TSH od FT4 nie jest liniowa, lecz log-liniowa: log(TSH) = alpha - beta * FT4. Oznacza to, że 15% zmiana stężenia wolnej tyroksyny wywołuje nawet kilkukrotną (200–400%) zmianę stężenia TSH. Dlatego małe fluktuacje dawki lewotyroksyny przekładają się na spektakularne przesunięcia TSH na osi pionowej.',
    summary:
      'Eliminacja lewotyroksyny podlega kinetyce pierwszego rzędu z t1/2 wynoszącym 7 dni, a stan stacjonarny Css osiągany jest po 5–6 tygodniach.',
    sourceIds: ['physiology', 'lt4', 'spina'],
    derivation: {
      title: 'Wyprowadzenie stężenia stacjonarnego Css z kinetyki I rzędu',
      model: 'Model jedno- i dwukompartmentowy eliminacji T4',
      steps: [
        {
          step: 'Równanie różniczkowe zaniku',
          equation: '\\frac{dC}{dt} = -k_e \\cdot C(t)',
          explanation: 'Szybkość eliminacji lewotyroksyny jest proporcjonalna do jej chwilowego stężenia (kinetyka liniowa pierwszego rzędu).',
        },
        {
          step: 'Rozdzielenie zmiennych i całkowanie',
          equation: '\\int \\frac{1}{C}\\,dC = -k_e \\int dt \\implies \\ln\\left(\\frac{C(t)}{C_0}\\right) = -k_e \\cdot t \\implies C(t) = C_0 \\cdot e^{-k_e \\cdot t}',
          explanation: 'Okres półtrwania $t_{1/2}$: $\\ln(1/2) = -k_e \\cdot t_{1/2}$, stąd $k_e = \\frac{\\ln(2)}{t_{1/2}} \\approx \\frac{0{,}693}{7\\text{ dni}} \\approx 0{,}099\\text{ d}^{-1}$.',
        },
        {
          step: 'Wyprowadzenie stężenia stacjonarnego Css',
          equation: '\\lim_{t \\to \\infty} C(t) = C_{ss} = \\frac{F \\cdot D}{V_d \\cdot k_e \\cdot \\tau}',
          explanation: 'W stanie stacjonarnym szybkość podania ($\\frac{F \\cdot D}{\\tau}$) równoważy szybkość eliminacji ($Cl \\cdot C_{ss} = V_d \\cdot k_e \\cdot C_{ss}$).',
        },
      ],
      clinicalTakeaway: 'Stan stacjonarny $95\\%\\,C_{ss}$ osiągany jest po $4{,}32 \\times t_{1/2} \\approx 35\\text{–}42\\text{ dniach}$ (5–6 tygodni). Zbyt wczesna kontrola TSH po 2 tyg. od zmiany dawki da zafałszowany obraz.',
    },
    workedExample: {
      title: 'Kalkulacja dawki substytucyjnej i czasu do steady-state',
      patient: 'Kobieta, 42 lata, 68 kg, stan po tyreoidektomii z powodu raka brodawkowatego, TSH wyjściowe 28 mIU/l.',
      inputs: [
        { label: 'Masa ciała', value: '68', unit: 'kg' },
        { label: 'Zapotrzebowanie pełne', value: '1,6', unit: 'µg/kg/d' },
        { label: 'Objętość dystrybucji Vd', value: '12', unit: 'L' },
        { label: 'Oszacowany t1/2', value: '7,0', unit: 'dni' },
      ],
      calculationSteps: [
        'Krok 1: Dawka dobowa $D = 68\\text{ kg} \\times 1{,}6\\,\\text{µg/kg} = 108{,}8\\,\\text{µg/d} \\longrightarrow$ preparat $100\\,\\text{µg/d}$ (lub naprzemiennie 100/112 µg).',
        'Krok 2: Stała eliminacji $k_e = \\frac{\\ln(2)}{7\\text{ dni}} = 0{,}099\\text{ d}^{-1}$.',
        'Krok 3: Oczekiwany wzrost stężenia: $C_{ss} = \\frac{0{,}75 \\times 100\\,\\text{µg}}{12\\text{ L} \\times 0{,}099\\text{ d}^{-1} \\times 1\\text{ d}} = 63{,}1\\,\\text{nmol/L}$ (wzrost FT4 o ok. 15 pmol/L).',
        'Krok 4: Czas do 95% steady-state: $t_{95\\%} = 4{,}32 \\times 7\\text{ dni} = 30{,}2\\text{ dni}$ (~5 tygodni).',
      ],
      result: 'Dawka początkowa: 100 µg/d; optymalny termin kontroli TSH i FT4: za 6–8 tygodni.',
      clinicalAction: 'Zlecono przyjmowanie rano na czczo 30–60 min przed posiłkiem, popijając wodą. Kontrola TSH i FT4 za 7 tygodni.',
    },
    questions: [
      q(
        'Ile okresów półtrwania (t1/2) potrzeba do osiągnięcia 95% stanu stacjonarnego (Css) leku o kinetyce I rzędu?',
        ['Około 4,5 do 5 okresów półtrwania', 'Po 1 t1/2 jest 50%, po 2 - 75%, po 3 - 87,5%, po 4 - 93,75%, a po 5 - 96,87% stanu stacjonarnego.'],
        ['Dokładnie 1 okres półtrwania', 'Po jednym t1/2 osiągane jest zaledwie 50% stężenia stacjonarnego.'],
        ['Ponad 20 okresów półtrwania', 'Stan równowagi osiągany jest znacznie szybciej w kinetyce pierwszego rzędu.']
      ),
      q(
        'Jak zmienia się okres półtrwania (t1/2) lewotyroksyny u pacjenta z ciężką, nieleczoną niedoczynnością tarczycy?',
        ['Wydłuża się do około 9–10 dni', 'Spowolniony metabolizm i obniżona aktywność enzymów wątrobowych zmniejszają klirens T4.'],
        ['Skraca się do 2 dni', 'Skrócenie t1/2 występuje w nadczynności z powodu przyspieszonego katabolizmu.'],
        ['Pozostaje całkowicie niezmienny', 'Okres półtrwania zależy od klirensu metabolicznego, który zależy od stanu metabolicznego.']
      ),
      q(
        'Co opisuje wzór Css = (F * D) / (Cl * tau)?',
        ['Średnie stężenie leku w stanie stacjonarnym', 'Zależy od dostępności biologicznej F, dawki D, klirensu Cl i odstępu tau.'],
        ['Maksymalną toksyczność po podaniu dożylnym', 'Jest to wzór na średnie stężenie równowagowe podczas przewlekłego dawkowania.'],
        ['Objętość dystrybucji w kompartmencie tkankowym', 'Objętość dystrybucji oznaczana jest jako Vd.']
      ),
      q(
        'Dlaczego pominięcie jednej porannej tabletki LT4 nie wywołuje natychmiastowych objawów niedoczynności?',
        ['Ponieważ pula ustrojowa wynosi ~1000 µg przy t1/2 równym 7 dni', 'Dobowy spadek stężenia T4 bez podania dawki wynosi zaledwie około 10%.'],
        ['Ponieważ LT4 działa wyłącznie w żołądku', 'LT4 wchłania się w jelicie i działa ogólnoustrojowo przez receptory jądrowe.'],
        ['Ponieważ TSH natychmiast syntetyzuje brakujące 100 µg T4', 'Tarczyca w niedoczynności nie ma rezerwy wydzielniczej.']
      ),
      q(
        'Jaki charakter ma zależność pomiędzy stężeniem FT4 a wydzielaniem TSH w przysadce?',
        ['Logarytmiczno-liniowy (niewielki spadek FT4 potęguje wyrzut TSH)', 'Ujemne sprzężenie przysadkowo-tarczycowe amplifikuje sygnał błędu logarytmicznie.'],
        ['Ściśle liniowy w całym zakresie stężeń', 'Gdyby zależność była liniowa, TSH nie reagowałoby tak czule na drobne deficyty FT4.'],
        ['Wykładniczo dodatni (efekt samonapędzający)', 'Dodatnie sprzężenie doprowadziłoby do katastrofalnej niestabilności osi.']
      ),
    ],
  },
  {
    id: 'tarczyca-matematyka-sprzezenie',
    moduleId: 'tarczyca',
    title: 'Wskaźniki SPINA-GT i SPINA-GD oraz nieliniowe sprzężenie ujemne',
    subtitle: 'Modelowanie matematyczne homeostazy osi HPT i wskaźnik Jostela',
    group: 'Matematyka i modele',
    minutes: 20,
    goals: [
      'Zrozumiesz wyprowadzenie parametrów strukturalnych SPINA-GT (wydajność gruczołu) oraz SPINA-GD (dejodynacja).',
      'Obliczysz wskaźnik supresji TSH Jostela (JTI) i zinterpretujesz odchylenia osi przysadka-tarczyca.',
    ],
    sections: [
      {
        title: 'Niewystarczalność klasycznej interpretacji TSH-FT4',
        text: 'Klasyczne badanie TSH i FT4 odzwierciedla jedynie stan równowagi statycznej. Dwoje pacjentów o identycznym TSH może mieć zupełnie odmienną rezerwę wydzielniczą tarczycy lub sprawność obwodowej konwersji T4 do T3. Matematyczne modelowanie układów homeostatycznych (SPINA — Structure Parameter Inference Approach) pozwala rozwikłać sprzężenie zwrotne i obliczyć niezmienniki konstytucyjne gruczołu.',
      },
      {
        title: 'SPINA-GT: Maksymalna teoretyczna wydajność wydzielnicza tarczycy',
        text: 'SPINA-GT (G_hat_T) szacuje maksymalną ilość T4, jaką tarczyca może uwolnić w jednostce czasu przy maksymalnej stymulacji TSH. Wzór opiera się na kinetyce wysycenia Michelisa-Menten receptora TSH: G_hat_T = [beta_T * (D_T + [TSH]) * (1 + K41*[TBG] + K42*[TBPA]) * [FT4]] / (alpha_T * [TSH]). Wartość referencyjna wynosi 1,4–8,7 pmol/s. W zapaleniu Hashimoto lub po resekcji SPINA-GT drastycznie spada przed wzrostem TSH.',
      },
      {
        title: 'SPINA-GD i Wskaźnik Jostela (JTI)',
        text: 'SPINA-GD mierzy sumaryczną aktywność dejodynaz obwodowych (konwersję T4 -> T3): G_hat_D = [beta_31 * (K_M + [FT4]) * [FT3]] / (alpha_31 * [FT4]), norma: 20–40 nmol/s. Spada w zespole eutyreozy chorobowej (low T3 syndrome). Wskaźnik Jostela JTI = ln(TSH) + 0,1345 * FT4 koryguje TSH o stężenie hormonu tarczycy, ujawniając subkliniczną dysfunkcję przysadki.',
      },
    ],
    table: {
      headers: ['Wskaźnik matematyczny', 'Wzór / Estymator', 'Interpretacja kliniczna'],
      rows: [
        ['SPINA-GT', 'β_T(D_T + TSH)·FT4 / (α_T·TSH)', 'Pojemność sekrecyjna tarczycy (pmol/s); obniżona w atrofii gruczołu'],
        ['SPINA-GD', 'β_31(K_M + FT4)·FT3 / (α_31·FT4)', 'Sumaryczna aktywność dejodynaz (nmol/s); niska w chorobach układowych'],
        ['Jostel JTI', 'ln(TSH) + 0,1345 · FT4', 'Wskaźnik tyreotropowy przysadki; różnicuje niedoczynność wtórną'],
        ['TSHI (TSH Index)', 'log(TSH) + 0,1345 · FT4', 'Logarytmiczny wskaźnik sprzężenia zwrotnego wg Dietricha'],
      ],
    },
    advanced:
      'W modelu nieliniowym sprzężenia zwrotnego przysadka działa jako kontroler logarytmiczny z opóźnieniem czasowym rzędu 60–90 minut, a tarczyca jako nasycający się człon wykonawczy rzędu zerowego/pierwszego. Połączenie to tworzy stabilny punkt stały w przestrzeni fazowej [FT4, TSH]. Zaburzenia topologii tego atraktora odpowiadają zespołom oporności na hormony tarczycy (RTH).',
    summary:
      'Wskaźniki SPINA rozdzielają wydolność samej tarczycy (GT) od sprawności tkankowej konwersji dejodynaz (GD), umożliwiając głębszą diagnostykę zaburzeń metabolicznych.',
    sourceIds: ['spina', 'physiology', 'central'],
    derivation: {
      title: 'Wyprowadzenie wskaźnika wydolności tarczycy SPINA-GT',
      model: 'Nieliniowy model homeostazy osi HPT (Dietrich et al.)',
      steps: [
        {
          step: 'Wydzielanie tarczycy jako kinetyka saturacyjna',
          equation: '\\frac{d[T_4]}{dt} = \\hat{G}_T \\cdot \\frac{[TSH]}{D_T + [TSH]} - k_{44} \\cdot [FT_4]',
          explanation: 'Wydzielanie T4 przez tyreocyty podlega stymulacji TSH o charakterze wysyceniowym Michaelisa-Menten ze stałą dysocjacji $D_T$.',
        },
        {
          step: 'Stan stacjonarny i rozwikłanie względem G_T',
          equation: '\\hat{G}_T = \\frac{\\beta_T (D_T + [TSH])(1 + K_{41}[TBG])[FT_4]}{\\alpha_T [TSH]}',
          explanation: 'W stanie równowagi $\\frac{d[T_4]}{dt} = 0$. Przekształcenie pozwala wyizolować maksymalną pojemność sekrecyjną tarczycy ($\\hat{G}_T$) niezależnie od przysadkowego TSH.',
        },
      ],
      clinicalTakeaway: 'SPINA-GT bezpośrednio mierzy masę czynnego miąższu tarczycy (norma 1,4–8,7 pmol/s). Wykrywa utajoną hipoplazję zanim ujawni się w rutynowym TSH.',
    },
    workedExample: {
      title: 'Diagnostyka zespołu niskiej T3 (Euthyroid Sick Syndrome) w OIT',
      patient: 'Mężczyzna, 65 lat, OIT z powodu ciężkiego zapalenia płuc. Wyniki: TSH 1,8 mIU/l, FT4 14,2 pmol/l, FT3 1,8 pmol/l (obniżone <3,1).',
      inputs: [
        { label: 'TSH', value: '1,8', unit: 'mIU/l' },
        { label: 'FT4', value: '14,2', unit: 'pmol/l' },
        { label: 'FT3', value: '1,8', unit: 'pmol/l' },
      ],
      calculationSteps: [
        'Krok 1: Wskaźnik SPINA-GT: $\\hat{G}_T = 3{,}2\\,\\text{pmol/s}$ (norma 1,4–8,7) $\\longrightarrow$ pierwotna funkcja tarczycy jest prawidłowa.',
        'Krok 2: Wskaźnik SPINA-GD: $\\hat{G}_D = 11{,}2\\,\\text{nmol/s}$ (obniżone, norma 20–40) $\\longrightarrow$ zahamowanie obwodowych dejodynaz DIO1/DIO2.',
        'Krok 3: Wskaźnik Jostela: $JTI = \\ln(1{,}8) + 0{,}1345 \\times 14{,}2 = 0{,}588 + 1{,}91 = 2{,}50$ (norma 1,3–4,1) $\\longrightarrow$ brak cech niedoczynności centralnej.',
      ],
      result: 'Wyizolowany defekt konwersji obwodowej T4 ⟶ T3 w ciężkiej chorobie ogólnoustrojowej (zespół pozatarczycowy TACIS / ESS).',
      clinicalAction: 'Brak wskazań do leczenia lewotyroksyną ani T3. Substytucja hormonalna w ESS nie poprawia rokowania i może nasilić katabolizm.',
    },
    questions: [
      q(
        'Co bezpośrednio mierzy parametr matematyczny SPINA-GT?',
        ['Maksymalną teoretyczną zdolność wydzielniczą tarczycy (pmol/s)', 'Odzwierciedla masę i czynność sprawnych tyreocytów niezależnie od aktualnego TSH.'],
        ['Wskaźnik wchłaniania jodu w nerkach', 'Wydalaniem jodu steruje filtracja kłębuszkowa, a nie parametr SPINA-GT.'],
        ['Stężenie przeciwciał przeciwko tyreoperoksydazie', 'Przeciwciała są mierzone w mianach immunologicznych IU/ml, nie w pmol/s.']
      ),
      q(
        'Jaki stan metaboliczny charakteryzuje się prawidłowym SPINA-GT, lecz znacznie obniżonym SPINA-GD?',
        ['Zespół niskiej T3 w ciężkich chorobach ogólnoustrojowych (TACITUS/NTIS)', 'Tarczyca jest zdrowa, ale obwodowa dejodynacja T4 do T3 przez DIO1/DIO2 jest zablokowana.'],
        ['Choroba Gravesa-Basedowa z wytrzeszczem', 'W chorobie Gravesa SPINA-GT jest znacznie podwyższone przez stymulację TRAb.'],
        ['Pierwotna wrodzona bezsoczność tarczycy', 'W agenezji tarczycy SPINA-GT wynosi 0 pmol/s.']
      ),
      q(
        'Do czego służy wskaźnik Jostela (Jostel’s TSH Index — JTI)?',
        ['Do obiektywnej oceny wydzielania TSH skorygowanego o ujemne sprzężenie z FT4', 'Pozwala wykryć nieadekwatnie niskie lub wysokie TSH w zaburzeniach podwzgórzowo-przysadkowych.'],
        ['Do wyliczania dawki dobowej hydrokortyzonu', 'JTI dotyczy osi HPT, a nie osi HPA kortyzolu.'],
        ['Do szacowania złośliwości guzków w skali EU-TIRADS', 'EU-TIRADS to klasyfikacja ultrasonograficzna, nie model matematyczny osi.']
      ),
      q(
        'Jak zmienia się wartość SPINA-GT u pacjenta po całkowitym wycięciu tarczycy (tyreoidektomii)?',
        ['Spada do wartości bliskiej 0 pmol/s', 'Brak tkanki gruczołowej oznacza zerową endogenną zdolność sekrecyjną.'],
        ['Rośnie kompensacyjnie do 50 pmol/s', 'Usunięty gruczoł nie jest w stanie zwiększyć sekrecji.'],
        ['Pozostaje dokładnie na poziomie 4,5 pmol/s', 'Parametr strukturalny narządu zanika po jego resekcji.']
      ),
      q(
        'Dlaczego korelacja między TSH a FT4 jest przedstawiana na skali log-liniowej?',
        ['Ponieważ niewielki spadek FT4 wywołuje wykładniczy wzrost TSH w przysadce', 'Oś HPT ma charakter logarytmicznego wzmacniacza sygnału deficytu hormonalnego.'],
        ['Ponieważ TSH i FT4 to te same cząsteczki chemiczne', 'TSH to glikoproteina przysadkowa, a FT4 to jodowana pochodna tyrozyny.'],
        ['Jest to wyłącznie błąd aparatury laboratoryjnej', 'Krzywa log-liniowa odzwierciedla rzeczywistą biofizykę transkrypcji genu TSHB.']
      ),
    ],
  },
  {
    id: 'tarczyca-chemia-synteza',
    moduleId: 'tarczyca',
    title: 'Stereochemia jodotyronin i rodnikowy mechanizm peroksydazy TPO',
    subtitle: 'Compound I, ferryl-oxo, kąt dwuścienny 120° i sprzęganie fenoli',
    group: 'Chemia i biochemia',
    minutes: 19,
    goals: [
      'Poznasz geometrię przestrzenną cząsteczki tyroksyny z kątem dwuściennym 120° wiązania eterowego.',
      'Przeanalizujesz cykl katalityczny hemu peroksydazy tarczycowej (TPO) z udziałem Compound I i rodników fenoksylowych.',
    ],
    sections: [
      {
        title: 'Geometria cząsteczki tyroksyny: eter difenylowy pod kątem 120°',
        text: 'Cząsteczka tyroksyny (3,5,3\',5\'-tetrajodo-L-tyronina) składa się z dwóch pierścieni aromatycznych połączonych mostkiem tlenowym (eter difenylowy). Ze względu na odpychanie steryczne dużych atomów jodu w pozycjach 3 i 5 pierścienia wewnętrznego (tyrozynowego), pierścień zewnętrzny (fenolowy) jest zorientowany prostopadle do płaszczyzny pierścienia wewnętrznego. Wiązanie C-O-C tworzy charakterystyczny kąt walencyjny wynoszący około 120°, co decyduje o dopasowaniu do kieszeni wiążącej receptora jądrowego TRbeta.',
      },
      {
        title: 'Cykl katalityczny hemu TPO: Utlenienie do Compound I',
        text: 'TPO posiada grupę prostetyczną w postaci hemu b (protoporfiryna IX z jonem żelaza Fe3+). Katalityczny cykl rozpoczyna się od reakcji z H2O2 generowanym przez enzym DUOX2 na szczytowej błonie tyreocyta. Dwuelektronowe utlenienie przekształca Fe(III) w kationorodnik ferrylo-okso [Fe(IV)=O]+•, znany jako Compound I. Ten wysoce elektrofilowy kompleks utlenia aniony jodkowe (I-) do elektrofilowych form [I+] lub rodników I•.',
      },
      {
        title: 'Mechanizm rodnikowego sprzęgania MIT i DIT',
        text: 'Po jodowaniu pierścieni tyrozylowych tyreoglobuliny do MIT i DIT, TPO katalizuje ich sprzęganie. Dochodzi do jednoelektronowego utlenienia reszt DIT do rodników fenoksylowych (DIT•). Następuje atak rodnikowy z utworzeniem przejściowego mostka chinolowo-eterowego, po czym następuje rozpad z eliminacją łańcucha alaninowego (pozostającego w Tg jako dehydroalanina) i wytworzeniem wiązania eterowego tyroksyny.',
      },
    ],
    table: {
      headers: ['Stan pośredni TPO', 'Stopień utlenienia Fe', 'Rola chemiczna w tyreogenezie'],
      rows: [
        ['Stan spoczynkowy', 'Fe(III) (żelazowy)', 'Wiąże cząsteczkę H2O2 generowaną przez DUOX2'],
        ['Compound I', '[Fe(IV)=O]+• (ferrylo-okso)', 'Ekstremalnie silny utleniacz; utlenia I- do jodu elektrofilowego'],
        ['Compound II', '[Fe(IV)=O] (ferryl)', 'Produkt jednoelektronowej redukcji; generuje rodniki DIT•'],
        ['Eter difenylowy (T4)', 'Kąt C-O-C ~120°', 'Wymusza prostopadłe ułożenie pierścieni niezbędne dla TRβ'],
      ],
    },
    advanced:
      'Obecność czterech atomów jodu nadaje tyroksynie unikalną gęstość elektronową i wysoką lipofilność. Promień van der Waalsa jodu (2,15 Å) powoduje masywną zawadę przestrzenną (steric hindrance). W trójjodotyroninie (T3) brak jodu w pozycji 5\' znosi symetrię pierścienia zewnętrznego, co umożliwia obrót wokół wiązania C-O i zwiększa powinowactwo do receptora TRbeta aż 10–15-krotnie w porównaniu z T4.',
    summary:
      'Stereochemia tyronin opiera się na 120-stopniowym mostku eterowym, a ich synteza wymaga generowania kationorodnika ferrylu [Fe(IV)=O]+• przez hem peroksydazy tarczycowej.',
    sourceIds: ['tpo_chem', 'physiology', 'graves'],
    questions: [
      q(
        'Jaki kąt tworzy wiązanie eterowe C-O-C łączące dwa pierścienie aromatyczne w cząsteczce tyroksyny?',
        ['Około 120° (konformacja prostopadła pierścieni)', 'Zapobiega kolizji sterycznej między atomami jodu w pozycjach 3 i 5.'],
        ['Dokładnie 180° (płaska cząsteczka liniowa)', 'Wiązanie eterowe ma hybrydyzację zbliżoną do sp3 atomu tlenu i nie jest liniowe.'],
        ['Poniżej 45°', 'Kąt walencyjny tlenu w eterach nie przyjmuje tak ostrych wartości.']
      ),
      q(
        'Czym pod względem chemicznym jest Compound I w cyklu katalitycznym TPO?',
        ['Kationorodnikiem ferrylo-okso [Fe(IV)=O]+•', 'Zawiera żelazo na IV stopniu utlenienia oraz rodnik porfirynowy.'],
        ['Nierozpuszczalnym kryształem jodu elementarnego', 'Compound I to aktywny stan enzymu hemo-zależnego.'],
        ['Kompleksem wapniowo-białkowym kalcytoniny', 'Kalcytonina nie uczestniczy w syntezie hormonów tarczycy.']
      ),
      q(
        'Jaki produkt uboczny powstaje w łańcuchu tyreoglobuliny podczas odszczepienia pierścienia fenolowego w reakcji sprzęgania DIT do T4?',
        ['Reszta dehydroalaniny', 'Powstaje w miejscu cząsteczki tyreoglobuliny oddającej swój pierścień aromatyczny.'],
        ['Czysty amoniak gazowy', 'Reakcja zachodzi w obrębie szkieletu polipeptydowego tyreoglobuliny.'],
        ['Cząsteczka kwasu moczowego', 'Kwas moczowy jest produktem katabolizmu puryn, a nie sprzęgania jodotyrozyn.']
      ),
      q(
        'Dlaczego trójjodotyronina (T3) wiąże się z receptorem jądrowym TRβ z 10–15 razy większym powinowactwem niż T4?',
        ['Brak jodu w pozycji 5\' zmniejsza zawadę przestrzenną i ułatwia dopasowanie do kieszeni receptora', 'Asymetryczna konformacja T3 perfekcyjnie stabilizuje helisę H12 receptora.'],
        ['Ponieważ T3 ma masę cząsteczkową większą o 50%', 'T3 jest lżejsza od T4 o jeden atom jodu (127 Da mniej).'],
        ['Ponieważ T3 nie posiada mostka tlenowego', 'Oba hormony posiadają identyczny mostek eterowy C-O-C.']
      ),
      q(
        'Który enzym dostarcza nadtlenek wodoru (H2O2) niezbędny do aktywacji hemu TPO?',
        ['Oksydaza podwójna 2 (DUOX2)', 'Jest to zależna od NADPH i wapnia oksydaza umiejscowiona w szczytowej błonie komórki.'],
        ['Katalaza wątrobowa', 'Katalaza rozkłada H2O2, zamiast go syntezować dla TPO.'],
        ['Dejodynaza typu 3', 'Dejodynazy odczepiają jod, nie wytwarzają nadtlenków.']
      ),
    ],
  },
  {
    id: 'tarczyca-chemia-farmakologia',
    moduleId: 'tarczyca',
    title: 'Mechanizm tionamidów i selenoproteiny dejodynaz DIO1-3',
    subtitle: 'Koordynacja S=C-N z hemem, selenocysteina Sec i redukcja tiolowa',
    group: 'Chemia i biochemia',
    minutes: 18,
    goals: [
      'Wyjaśnisz mechanizm inhibicji TPO przez tionamidy (tiamazol, PTU) na poziomie koordynacji z żelazem porfirynowym.',
      'Scharakteryzujesz chemię katalityczną selenocysteiny (Sec) w dejodynazach jodopochodnych DIO1, DIO2 i DIO3.',
    ],
    sections: [
      {
        title: 'Farmakofor tionamidów: Grupa tiomocznikowa S=C-N',
        text: 'Tiamazol (metimazol) oraz propylotiouracyl (PTU) zawierają ugrupowanie tionamidowe S=C-N-R w pierścieniu imidazolowym lub pirymidynowym. Siarka tionamidowa działa jako silny nukleofil i donor elektronów. Tionamidy wiążą się bezpośrednio z żelazem hemu TPO lub redukują wysoce reaktywny Compound I z powrotem do nieaktywnego Fe(III), uniemożliwiając utlenienie jodków i organifikację.',
      },
      {
        title: 'Selenocysteina (Sec, U) — 21. aminokwas w centrum dejodynaz',
        text: 'Dejodynazy jodotyroninowe (DIO1, DIO2, DIO3) to białka selenozależne. W centrum aktywnym zawierają rzadki aminokwas selenocysteinę (kodowany przez kodon UGA z elementem SECIS w mRNA). Selen (Se) ma znacznie niższe pKa grupy selenolowej (-SeH ≈ 5,2) niż siarka w cysteinie (-SH ≈ 8,3), co sprawia, że w pH fizjologicznym selenol występuje w całości w formie zjonizowanego anionu selenolanowego (R-Se-), będącego potężnym nukleofilem.',
      },
      {
        title: 'Mechanizm kwasowo-zasadowy dejodynacji pierścienia',
        text: 'Anion selenolanowy przeprowadza atak nukleofilowy na elektrofilowy atom jodu w pozycji 5\' (pierścień zewnętrzny — aktywacja T4 -> T3 przez DIO1/DIO2) lub pozycji 5 (pierścień wewnętrzny — inaktywacja T4 -> rT3 przez DIO3). Powstaje przejściowy kowalencyjny addukt enzym-Se-I, a hormon ulega protonowaniu. Regeneracja zredukowanego enzymu wymaga kofaktora tiolowego (glutationu lub tioredoksyny). PTU (ale nie tiamazol) blokuje DIO1 poprzez wiązanie z kompleksem E-Se-I.',
      },
    ],
    table: {
      headers: ['Enzym / Cząsteczka', 'Kluczowe ugrupowanie', 'Mechanizm biochemiczny'],
      rows: [
        ['Tiamazol / PTU', 'Grupa tiomocznikowa S=C-N', 'Koordynacja do Fe hemu TPO i redukcja Compound I'],
        ['DIO1 (wątroba, nerki)', 'Selenocysteina (Sec) w pKa 5,2', 'Dejodynacja pierścienia zewnętrznego i wewnętrznego; hamowany przez PTU'],
        ['DIO2 (mózg, przysadka)', 'Wewnątrzkomórkowa Sec', 'Lokalne wytwarzanie T3 dla przysadki i mózgu; oporna na PTU'],
        ['DIO3 (łożysko, płód)', 'Inaktywująca Sec', 'Dejodynacja pierścienia wewnętrznego: inaktywuje T4 do rT3 oraz T3 do T2'],
      ],
    },
    advanced:
      'Różnica farmakologiczna między PTU a tiamazolem polega na tym, że PTU jest inhibitorem niekompetycyjnym względem kofaktora tiolowego dejodynazy DIO1. Dlatego w przełomie tarczycowym dawniej preferowano PTU, gdyż natychmiastowo hamuje obwodową konwersję T4 do aktywnego T3 w wątrobie i nerkach, podczas gdy tiamazol hamuje wyłącznie syntezę de novo w tarczycy.',
    summary:
      'Tionamidy blokują utlenianie hemu TPO dzięki nukleofilowej siarce tiomocznikowej, a dejodynazy wykorzystują zjonizowany selenolan selenocysteiny (Sec) do usuwania atomów jodu.',
    sourceIds: ['tpo_chem', 'amiodarone', 'storm'],
    questions: [
      q(
        'Jakie ugrupowanie chemiczne w cząsteczce tiamazolu odpowiada za inhibicję peroksydazy tarczycowej (TPO)?',
        ['Grupa tiomocznikowa (S=C-N)', 'Nukleofilowy atom siarki redukuje kationorodnik ferrylu w hemie TPO.'],
        ['Pierścień steroidowy cyklopentanu', 'Tionamidy nie są cząsteczkami steroidowymi.'],
        ['Łańcuch polipeptydowy z mostkiem dwusiarczkowym', 'Tiamazol jest małą cząsteczką heterocykliczną (pochodną imidazolu).']
      ),
      q(
        'Dlaczego selenocysteina (Sec) w dejodynazach jest znacznie silniejszym nukleofilem w pH fizjologicznym niż zwykła cysteina?',
        ['Grupa selenolowa ma niskie pKa (~5,2) i jest w 99% zjonizowana do anionu selenolanowego', 'Podczas gdy grupa tiolowa cysteiny (pKa ~8,3) pozostaje w większości obojętna.'],
        ['Ponieważ selen ma mniejszą masę atomową od węgla', 'Selen ma masę atomową ok. 79 Da, znacznie większą od węgla (12 Da).'],
        ['Ponieważ selen tworzy nieodwracalne wiązania jonowe z sodem', 'Selen w selenocysteinie bierze udział w odwracalnym transferze jodu.']
      ),
      q(
        'Która dejodynaza odpowiada za inaktywację hormonów tarczycy poprzez usuwanie jodu z pierścienia wewnętrznego?',
        ['Dejodynaza typu 3 (DIO3)', 'Przekształca T4 w nieaktywny biologicznie rT3 oraz T3 w T2.'],
        ['Dejodynaza typu 2 (DIO2)', 'DIO2 odpowiada za aktywację T4 do aktywnego metabolicznie T3.'],
        ['Tyreoglobulina', 'Tyreoglobulina jest białkiem macierzystym, a nie enzymem dejodującym.']
      ),
      q(
        'Dlaczego propylotiouracyl (PTU) w odróżnieniu od tiamazolu hamuje obwodową konwersję T4 do T3 w wątrobie?',
        ['Wchodzi w reakcję z przejściowym adduktem E-Se-I dejodynazy DIO1', 'Tworzy stabilny kompleks enzymatyczny blokowany przed redukcją tiolową.'],
        ['Wiąże się nieodwracalnie z albuminami osocza', 'Wiązanie z białkami nie tłumaczy hamowania enzymatycznego DIO1.'],
        ['Destruuje jądro komórkowe tyreocytów', 'Tionamidy nie wykazują działania cytolitycznego na jądro.']
      ),
      q(
        'Jaki kofaktor wewnątrzkomórkowy jest niezbędny do regeneracji aktywnej formy selenocysteiny w dejodynazach po odszczepieniu jodu?',
        ['Zredukowany glutation (GSH) lub tioredoksyna', 'Dostarczają równoważników redukcyjnych do redukcji wiązania selen-jod.'],
        ['Kwas solny żołądkowy', 'Reakcja zachodzi w cytosolu komórek obwodowych, nie w żołądku.'],
        ['ATP i glukoza w szlaku glikolizy', 'Regeneracja enzymu wymaga donorów grup tiolowych (-SH), a nie bezpośrednio ATP.']
      ),
    ],
  },
];
