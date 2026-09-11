import { type DraftLesson, type Source, q } from './course-types.ts';

export const pituitaryMathChemSources: Record<string, Source> = {
  goodwin: {
    id: 'goodwin',
    title: 'Goodwin BC — Oscillatory behavior in enzymatic control processes',
    year: '1965',
    url: 'https://doi.org/10.1016/0065-2571(65)90067-1',
    kind: 'Dynamika nieliniowa',
  },
  edelman: {
    id: 'edelman',
    title: 'Edelman IS et al. — Interrelations between serum sodium concentration, serum osmolarity and total exchangeable sodium, total exchangeable potassium and total body water',
    year: '1958',
    url: 'https://doi.org/10.1172/JCI103712',
    kind: 'Fizjologia elektrolitowa',
  },
};

export const draftPituitaryMathChem: DraftLesson[] = [
  {
    id: 'przysadka-matematyka-pulsacja',
    moduleId: 'przysadka',
    title: 'Dynamika nieliniowa i pulsacyjność wydzielania przysadkowego',
    subtitle: 'Oscylator Goodwina, dekonwolucja wyrzutów i całka splotu',
    group: 'Matematyka i modele',
    minutes: 19,
    goals: [
      'Poznasz równania różniczkowe oscylatora Goodwina opisujące pulsacyjne generowanie neurohormonów (GnRH, GHRH).',
      'Zastosujesz całkę splotu do rekonstrukcji pierwotnej sekrecji przysadkowej z profilu stężeń w surowicy.',
    ],
    sections: [
      {
        title: 'Brak stałego stężenia: pulsacyjność jako kod informacyjny',
        text: 'Większość hormonów przedniego płata przysadki (LH, FSH, GH, ACTH, PRL) nie jest wydzielana w sposób ciągły, lecz w postaci dyskretnych impulsów (bursts). Generator podwzgórzowy (np. neurony KNDy: kisspeptyna, neurokinina B, dynorfina) wyzwala synchroniczne salwy potencjałów czynnościowych co 60–90 minut. Ciągły wlew GnRH prowadzi do paradoksalnej desensytyzacji i down-regulacji receptorów GnRHR, co jest podstawą stosowania analogów GnRH w leczeniu raka prostaty i endometriozy.',
      },
      {
        title: 'Model matematyczny oscylatora Goodwina',
        text: 'Sprzężenie zwrotne podwzgórze-przysadka-gonada opisuje układ 3 nieliniowych równań różniczkowych Goodwina z ujemnym sprzężeniem opóźnionym: dX/dt = [a1 / (1 + k1 * Z^n)] - b1 * X; dY/dt = a2 * X - b2 * Y; dZ/dt = a3 * Y - b3 * Z, gdzie X to GnRH, Y to LH, a Z to testosteron/estradiol. Dla współczynnika Hilla n >= 8 układ generuje stabilny cykl graniczny (limit cycle) w przestrzeni fazowej bez konieczności zewnętrznego zegara.',
      },
      {
        title: 'Rekonstrukcja dekonwolucyjna (Deconvolution Analysis)',
        text: 'Zmierzony profil stężenia w surowicy C(t) jest splotem funkcji sekrecji S(t) i kinetyki zaniku E(t): C(t) = ∫ S(τ) * exp(-λ(t-τ)) dτ, gdzie λ = ln(2)/t1/2. Dekonwolucja pozwala obliczyć: liczbę epizodów wydzielniczych na dobę, masę wydzieloną w pojedynczym pulsie, czas trwania wyrzutu oraz bazalną (niepulsacyjną) sekrecję. W akromegalii dochodzi do utraty dobowego wyciszenia i wzrostu sekrecji bazalnej.',
      },
    ],
    table: {
      headers: ['Oś hormonalna', 'Częstość pulsacji', 'Znaczenie patofizjologiczne'],
      rows: [
        ['GnRH ⟶ LH/FSH', 'Co 60–90 min (faza folikularna)', 'Rytm determinuje dojrzewanie pęcherzyka; zanika w zespole Kallmanna'],
        ['GHRH/GHIH ⟶ GH', '6–10 wyrzutów/dobę (szczyt w fazie NREM)', 'W akromegalii podwyższona sekrecja bazalna bez supresji w nocy'],
        ['CRH/AVP ⟶ ACTH', 'Rytm dobowy (szczyt 6:00–8:00 rano)', 'W chorobie Cushinga zanik fizjologicznego spadku kortyzolu o północy'],
        ['Dopamina ⟶ PRL', 'Tonistyczne hamowanie z mikropulsami', 'Uwolnienie od hamowania szypuły (stalk effect) powoduje stały wzrost PRL'],
      ],
    },
    advanced:
      'W modelu Goldbetera dynamika wydzielania pulsującego zapobiega adaptacji receptorowej (receptor desensitization). Jeśli interwał między impulsami jest krótszy niż czas defosforylacji i recyklingu receptora GPCR (t_rec ≈ 30–45 min), receptor ulega internalizacji za pośrednictwem beta-arestyny. Dlatego pulsacja o częstotliwości 1 impuls/h utrzymuje wysoką wrażliwość tkankową, a wlew ciągły całkowicie gasi odpowiedź biologiczną.',
    summary:
      'Pulsacyjność osi podwzgórzowo-przysadkowej jest opisana nieliniowymi cyklami granicznymi Goodwina i chroni receptory przed zjawiskiem desensytyzacji.',
    sourceIds: ['goodwin', 'fleseriu', 'melmed'],
    derivation: {
      title: 'Wyprowadzenie oscylatora Goodwina i warunku bifurkacji Hopfa',
      model: 'Układ nieliniowych równań różniczkowych Goodwin (1965)',
      steps: [
        {
          step: 'Układ równań dynamiki osi podwzgórze-przysadka-gonada',
          equation: '\\begin{cases} \\frac{dX}{dt} = \\frac{a_1}{1 + k_1 Z^n} - b_1 X \\\\[4pt] \\frac{dY}{dt} = a_2 X - b_2 Y \\\\[4pt] \\frac{dZ}{dt} = a_3 Y - b_3 Z \\end{cases}',
          explanation: 'X oznacza GnRH, Y to przysadkowe LH, a Z to krążący steroid (testosteron). W mianowniku X występuje nieliniowa inhibicja allosteryczna o współczynniku Hilla n.',
        },
        {
          step: 'Linearyzacja wokół punktu stałego i macierz Jacobiego',
          equation: '\\det(J - \\lambda I) = 0 \\implies (\\lambda + b)^3 + a_1 a_2 a_3 \\cdot |f\'(Z_0)| = 0',
          explanation: 'Wartości własne $\\lambda$ określają stabilność. Warunkiem wystąpienia samowzbudnych niegasnących oscylacji (bifurkacja Hopfa) jest $\\sec(\\pi/3) < n$, czyli $n > 8$.',
        },
        {
          step: 'Rekonstrukcja dekonwolucyjna profilu sekrecji',
          equation: 'C(t) = \\int_{0}^{t} S(\\tau) \\cdot e^{-\\lambda(t - \\tau)}\\,d\\tau',
          explanation: 'Stężenie w surowicy $C(t)$ to splot chwilowej szybkości wyrzutu $S(t)$ z funkcją zaniku jednokompartmentowego.',
        },
      ],
      clinicalTakeaway: 'Wysoka nieliniowość ($n \\ge 8$) jest niezbędna do wygenerowania periodycznych wyrzutów bez zewnętrznego stymulatora. Wlew ciągły agonisty GnRH niszczy pulsację i gasi wydzielanie LH.',
    },
    workedExample: {
      title: 'Dekonwolucja nocnego profilu wyrzutów GH w diagnostyce akromegalii',
      patient: 'Mężczyzna, 38 lat, podejrzenie wczesnej akromegalii (bóle głowy, powiększenie dłoni i stóp, IGF-1 420 ng/ml).',
      inputs: [
        { label: 'Wyrzuty GH', value: '14', unit: 'na dobę' },
        { label: 'Sekrecja bazalna', value: '2,1', unit: 'µg/l (podwyższona)' },
        { label: 'GH w teście OGTT 75g', value: '1,4', unit: 'µg/l (brak supresji <0,4)' },
      ],
      calculationSteps: [
        'Krok 1: W zdrowej osi somatotropowej nocna sekrecja bazowa ulega wygaszeniu do <0,1 µg/l, a 85% dobowej masy GH uwalniane jest w 4–6 ostrych pulsach w fazie snu głębokiego (NREM).',
        'Krok 2: Analiza dekonwolucyjna u pacjenta ujawniła 14 nieskoordynowanych epizodów na dobę oraz stałą, wysoką sekrecję niepulsacyjną (bazalną) 2,1 µg/l.',
        'Krok 3: W teście OGTT 75g glikemia nie zahamowała stężenia GH poniżej progu odcięcia 0,4 µg/l (GH_min = 1,4 µg/l).',
      ],
      result: 'Potwierdzenie autonomicznej, niesupresyjnej hipersekrecji GH przez gruczolak somatotropowy przysadki.',
      clinicalAction: 'Skierowanie na MRI celowany na przysadkę z kontrastem oraz kwalifikacja do operacji przeznosowej (TSS).',
    },
    questions: [
      q(
        'Dlaczego ciągły wlew agonisty receptora GnRH hamuje wydzielanie LH i FSH zamiast je stymulować?',
        ['Powoduje internalizację i down-regulację receptorów GnRHR na gonadotrofach', 'Brak przerw między stymulacjami uniemożliwia recykling receptora z endosomów.'],
        ['Bezpośrednio niszczy komórki przysadki przez martwicę', 'Analogi GnRH nie działają toksycznie ani litycznie na komórki.'],
        ['Blokuje wchłanianie cholesterolu w jelicie cienkim', 'Mechanizm dotyczy receptora błonowego w przednim płacie przysadki.']
      ),
      q(
        'Jaka całka matematyczna opisuje zależność między chwilową sekrecją hormonu S(t) a jego stężeniem w osoczu C(t)?',
        ['Całka splotu z wykładniczą funkcją zaniku jednokompartmentowego', 'Stężenie jest sumą (splotem) wszystkich wcześniejszych wyrzutów wygasających wg exp(-λt).'],
        ['Całka podwójna z objętości krwi krążącej', 'Kinetyka farmakokinetyczna jest opisywana w domenie czasu jako splot jedno- lub dwuwymiarowy.'],
        ['Równanie różniczkowe wyłącznie rzędu zerowego', 'Wydzielanie pulsujące i eliminacja wymagają całki splotowej lub układu rzędu pierwszego.']
      ),
      q(
        'Kiedy u zdrowego człowieka występuje fizjologiczny, największy dobowy szczyt wydzielania hormonu wzrostu (GH)?',
        ['W pierwszych godzinach głębokiego snu wolnofalowego (NREM faza N3)', 'Wyrzut jest skorelowany z falami delta w EEG i odpowiada za regenerację anaboliczną.'],
        ['Dokładnie w południe po posiłku węglowodanowym', 'Wysokie stężenie glukozy hamuje wydzielanie GH, zamiast je stymulować.'],
        ['Podczas nagłego ataku śmiechu w ciągu dnia', 'Rytm GH ma charakter dobowy zsynchronizowany ze snem wolnofalowym.']
      ),
      q(
        'Co dzieje się z fizjologiczną pulsacją ACTH i kortyzolu u pacjenta z chorobą Cushinga (gruczolak ACTH)?',
        ['Zanika fizjologiczny spadek o północy, a sekrecja bazalna staje się stale podwyższona', 'Brak fizjologicznego nadiru kortyzolu w ślinie o 23:00 to kluczowy test przesiewowy.'],
        ['Częstotliwość pulsów rośnie do miliona na sekundę', 'Częstość jest ograniczona fizjologią pęcherzyków wydzielniczych.'],
        ['Kortyzol wydziela się wyłącznie w niedziele rano', 'Choroba Cushinga znosi rytm dobowy na przestrzeni całego tygodnia.']
      ),
      q(
        'Które neurony podwzgórza pełnią kluczową rolę jako generator pulsów GnRH (tzw. pulsator GnRH)?',
        ['Neurony KNDy (wydzielające kisspeptynę, neurokininę B i dynorfinę)', 'Tworzą zsynchronizowaną sieć oscylacyjną w jądrze łukowatym.'],
        ['Komórki glejowe nerwu wzrokowego', 'Glej wzrokowy nie ma właściwości sekrecji neuroendokrynnej.'],
        ['Komórki rdzenia nadnerczy produkujące dopaminę', 'Generator pulsów GnRH znajduje się anatomicznie w podwzgórzu.']
      ),
    ],
  },
  {
    id: 'przysadka-matematyka-osmolalnosc',
    moduleId: 'przysadka',
    title: 'Równanie Edelmana i klirens wolnej wody w zaburzeniach wazopresyny',
    subtitle: 'Matematyczna analiza hiponatremii, hipernatremii i formuła Adrogué-Madias',
    group: 'Matematyka i modele',
    minutes: 21,
    goals: [
      'Wyprowadzisz i zastosujesz równanie Edelmana do kalkulacji stężenia sodu w ustroju.',
      'Obliczysz klirens wolnej wody (C_H2O) oraz przewidzianą zmianę natremii wg formuły Adrogué-Madias.',
    ],
    sections: [
      {
        title: 'Fizykochemiczne fundamenty równania Edelmana',
        text: 'W 1958 r. Edelman wykazał eksperymentalnie, że stężenie sodu w osoczu [Na+] jest funkcją wymiennego sodu (Na_e), wymiennego potasu (K_e) oraz całkowitej wody ustrojowej (TBW): [Na+] = 1,11 * (Na_e + K_e) / TBW - 25,6, co klinicznie upraszcza się do wzoru: [Na+] ≈ (Na_e + K_e) / TBW. Oznacza to, że hiponatremia NIE jest izolowanym niedoborem sodu, lecz zaburzeniem proporcji między ilością kationów osmotycznie czynnych a objętością wody.',
      },
      {
        title: 'Klirens wolnej wody (C_H2O) i klirens elektrolitowy',
        text: 'Całkowity wolumen moczu V składa się z klirensu osmotycznego Cosm oraz klirensu wolnej wody C_H2O: V = Cosm + C_H2O, gdzie Cosm = (U_osm * V) / P_osm. Po przekształceniu: C_H2O = V * (1 - U_osm / P_osm). W moczówce prostej U_osm << P_osm, więc C_H2O > 0 (masowa utrata czystej wody z hipernatremią). W SIADH U_osm > P_osm, stąd C_H2O < 0 (retencja czystej wody z narastającą hiponatremią).',
      },
      {
        title: 'Formuła Adrogué-Madias i bezpieczne tempo wyrównywania',
        text: 'Przewidywany wzrost natremii po przetoczeniu 1 litra płynu infuzyjnego opisuje formuła: $\\Delta [Na^+] = \\frac{[Na^+]_{\\text{infuzja}} + [K^+]_{\\text{infuzja}} - [Na^+]_{\\text{aktualne}}}{\\text{TBW} + 1}$. W hiponatremii zagrażającej obrzękiem mózgu stosuje się 3% NaCl ([Na+] = 513 mmol/L). Żelazny limit prędkości wynosi: nie więcej niż 8–10 mmol/L w ciągu pierwszych 24 h (oraz <18 mmol/L w 48 h), aby zapobiec odwodnieniu osłonki mielinowej komórek glejowych i osmotycznemu zespołowi demielinizacyjnemu (ODS / CPM).',
      },
    ],
    table: {
      headers: ['Płyn infuzyjny', '[Na+] (mmol/L)', 'Δ[Na+] w 1 litrze u osoby 70 kg (TBW=42L)'],
      rows: [
        ['0,9% NaCl (sól fizjologiczna)', '154 mmol/L', '+0,8 mmol/L (nie nadaje się do szybkiej korekty ciężkiego SIADH)'],
        ['3% NaCl (hipertoniczna sól)', '513 mmol/L', '+9,0 mmol/L (100 ml podnosi Na+ o ok. 1 mmol/L)'],
        ['Płyn Ringera mleczan', '130 mmol/L', '0,0 do -0,2 mmol/L (może pogłębiać hiponatremię w SIADH!)'],
        ['5% Glukoza w wodzie', '0 mmol/L', '-3,1 mmol/L (czysta woda; leczenie hipernatremii w moczówce)'],
      ],
    },
    advanced:
      'Gdy w ciężkiej hiponatremii dojdzie do jatrogennego przestrzrzelenia natremii (>10 mmol/L/24h), włącza się natychmiast protokół ratunkowy re-indukcji hiponatremii: podanie 1–2 µg desmopresyny (dDAVP) i wlew 5% glukozy, aby bezpiecznie sprowadzić sód z powrotem poniżej dozwolonego limitu i ochronić most przed demielinizacją.',
    summary:
      'Równanie Edelmana dowodzi, że stężenie sodu zależy od kationów Na+ i K+ podzielonych przez TBW, a formuła Adrogué-Madias chroni przed groźnym zespołem demielinizacyjnym.',
    sourceIds: ['edelman', 'hyponatraemia', 'fleseriu'],
    derivation: {
      title: 'Wyprowadzenie formuły Adrogué-Madias z równania Edelmana',
      model: 'Fizjologia elektrolitowa Edelmana i bilans wolnej wody',
      steps: [
        {
          step: 'Równanie Edelmana',
          equation: '[Na^+] = \\frac{Na_e + K_e}{\\text{TBW}}',
          explanation: 'Stężenie sodu w surowicy to bilans wymiennego sodu i potasu ($Na_e + K_e$) podzielony przez całkowitą objętość wody ustrojowej ($\\text{TBW}$).',
        },
        {
          step: 'Wyprowadzenie przyrostu natremii po wlewie 1 L roztworu',
          equation: '\\Delta [Na^+] = \\frac{[Na^+]_{\\text{infuzja}} + [K^+]_{\\text{infuzja}} - [Na^+]_{\\text{aktualne}}}{\\text{TBW} + 1}',
          explanation: 'Wprowadzenie 1 L płynu o stężeniu elektrolitów $[Na^+]_{\\text{infuzja}}$ i $[K^+]_{\\text{infuzja}}$ zwiększa TBW o 1 L i zmienia pulę kationów.',
        },
      ],
      clinicalTakeaway: 'Formuła chroni przed zbyt szybką korekcją hiponatremii. Maksymalne tempo wyrównywania nie może przekraczać 8–10 mmol/L na 24 godziny, aby uniknąć demielinizacji mostu.',
    },
    workedExample: {
      title: 'Kalkulacja wlewu 3% NaCl w objawowej hiponatremii w przebiegu SIADH',
      patient: 'Kobieta, 58 lat, masa 60 kg, splątana, sód 114 mmol/l, osmolalność moczu 520 mOsm/kg H2O (SIADH).',
      inputs: [
        { label: 'Masa ciała', value: '60', unit: 'kg' },
        { label: 'Sód aktualny', value: '114', unit: 'mmol/l' },
        { label: 'Sód w 3% NaCl', value: '513', unit: 'mmol/l' },
        { label: 'Wskaźnik TBW (0,5)', value: '30', unit: 'L' },
      ],
      calculationSteps: [
        'Krok 1: Obliczenie wody ustrojowej: $\\text{TBW} = 60\\text{ kg} \\times 0{,}5 = 30\\text{ L}$.',
        'Krok 2: Oczekiwany wzrost sodu po 1 L 3% NaCl: $\\Delta [Na^+] = \\frac{513 - 114}{30 + 1} = \\frac{399}{31} = 12{,}87\\,\\text{mmol/L}$.',
        'Krok 3: Objętość 3% NaCl dla bezpiecznego wzrostu o 6 mmol/L w 6h: $V = \\frac{6}{12{,}87} = 0{,}466\\text{ L}$ (ok. $466\\text{ ml}$).',
        'Krok 4: Prędkość wlewu: $\\frac{466\\text{ ml}}{6\\text{ h}} \\approx 78\\,\\text{ml/h}$.',
      ],
      result: 'Wlew 3% NaCl z prędkością 75–80 ml/h pod ścisłą kontrolą jonogramu co 2–3 godziny; cel dobowy: maks. 122 mmol/l (+8 mmol/l/24h).',
      clinicalAction: 'Hospitalizacja w sali intensywnego nadzoru, restrykcja płynów <800 ml/d, przygotowanie protokołu dDAVP na wypadek przestrzrzelenia natremii.',
    },
    questions: [
      q(
        'Co wyraża uproszczone równanie Edelmana w gospodarce wodno-elektrolitowej?',
        ['[Na+] = (Na_e + K_e) / TBW', 'Stężenie sodu to stosunek sumy wymiennego sodu i potasu do całkowitej wody ustrojowej.'],
        ['[Na+] = Ciśnienie skurczowe / eGFR', 'Filtracja kłębuszkowa nie wchodzi bezpośrednio do wzoru Edelmana.'],
        ['[Na+] = Masa ciała pomnożona przez stężenie albumin', 'Albumina nie określa stężenia sodu w modelu Edelmana.']
      ),
      q(
        'Kiedy klirens wolnej wody (C_H2O) przyjmuje wartość ujemną (C_H2O < 0)?',
        ['Gdy osmolalność moczu przewyższa osmolalność osocza (U_osm > P_osm, np. w SIADH)', 'Nerki zagęszczają mocz ponad osocze, zatrzymując czystą wodę w ustroju.'],
        ['Gdy mocz jest skrajnie rozcieńczony (U_osm = 50 mOsm/kg)', 'Wtedy C_H2O jest silnie dodatni (utrata wolnej wody).'],
        ['Gdy diureza dobowa przekracza 10 litrów', 'Wielkość diurezy bez relacji do osmolalności nie determinuje znaku klirensu.']
      ),
      q(
        'Jakie jest maksymalne bezpieczne tempo podnoszenia stężenia sodu w surowicy w przewlekłej hiponatremii?',
        ['Nie więcej niż 8–10 mmol/L w ciągu pierwszych 24 godzin', 'Zapobiega to obkurczeniu komórek śródbłonka i mielinolizie mostu (ODS).'],
        ['Przynajmniej 25–30 mmol/L w pierwszych 6 godzinach', 'Tak gwałtowny skok wywołałby nieodwracalne uszkodzenie pnia mózgu i zgon.'],
        ['Dokładnie 0,1 mmol/L na dobę', 'Zbyt wolne tempo w objawowej hiponatremii naraża na zgon z obrzęku mózgu.']
      ),
      q(
        'Ile milimoli sodu zawiera 1 litr 3% roztworu NaCl stosowanego w ratunkowym leczeniu obrzęku mózgu?',
        ['513 mmol Na+ i 513 mmol Cl-', 'Roztwór hipertoniczny 3% zawiera 30 g NaCl/L (30 / 58,44 ≈ 0,513 mol).'],
        ['154 mmol Na+', 'Tyle zawiera standardowa sól fizjologiczna 0,9% NaCl.'],
        ['1000 mmol Na+', 'Roztwór 1-molowy to 58,5 g/L, co odpowiada 5,85% NaCl.']
      ),
      q(
        'Dlaczego podanie 0,9% NaCl u pacjenta z zespołem SIADH może paradoksalnie pogłębić hiponatremię?',
        ['Bo nerki wydalą cały podany sód w małej objętości moczu (U_osm 600), a zatrzymają wolną wodę', 'Zjawisko odsolenia infuzji: nerka zagęszcza sól ponad 154 mmol/L, a reszta wody rozcieńcza krew.'],
        ['Bo 0,9% NaCl nie zawiera w ogóle sodu', 'Sól fizjologiczna zawiera 154 mmol/L jonów sodowych.'],
        ['Bo sód przekształca się w nerkach w potas', 'Pierwiastki nie ulegają transmutacji w narządach ludzkich.']
      ),
    ],
  },
  {
    id: 'przysadka-chemia-struktury',
    moduleId: 'przysadka',
    title: 'Struktura dimeryczna gonadotropin i mostki dwusiarczkowe tylnego płata',
    subtitle: 'Wspólna podjednostka alfa, swoiste podjednostki beta i nonapeptydy AVP/OXT',
    group: 'Chemia i biochemia',
    minutes: 19,
    goals: [
      'Porównasz strukturę podjednostki alfa i beta hormonów glikoproteinowych (TSH, LH, FSH, hCG).',
      'Zanalizujesz stereochemię wiązania dwusiarczkowego Cys1-Cys6 w nonapeptydach tylnego płata (wazopresyna i oksytocyna).',
    ],
    sections: [
      {
        title: 'Heterodimery glikoproteinowe: Wspólny łańcuch alfa i swoiste beta',
        text: 'Cztery hormony przysadkowo-łożyskowe (TSH, LH, FSH oraz hCG) to heterodimeryczne glikoproteiny. Wszystkie posiadają identyczną podjednostkę alfa (kodowaną przez gen CGA na chromosomie 6, złożoną z 92 aminokwasów z 5 mostkami disiarczkowymi). O specyficzności biologicznej i wiązaniu do receptora decyduje podjednostka beta (TSHB, LHB, FSHB, CGB). Podjednostka beta hCG wykazuje 85% homologii z beta LH, co tłumaczy tyreotoksykozę ciężarnych i luteinizację pęcherzyków przy bardzo wysokim hCG.',
      },
      {
        title: 'Węglowodany i sialilacja: Wpływ na t1/2 w krążeniu',
        text: 'Glikoproteiny te zawierają do 30% masy w postaci łańcuchów oligosacharydowych (N-glikozylacja przy Asn oraz O-glikozylacja w hCG). Końcowe reszty kwasu sjalowego (kwas N-acetyloneuraminowy, NANA) chronią cząsteczkę przed wychwytem przez wątrobowe receptory asjaloglikoproteinowe. C-końcowy peptyd (CTP) podjednostki beta hCG posiada 4 miejsca O-glikozylacji bogate w kwas sjalowy, co wydłuża okres półtrwania hCG do 24–36 h (w porównaniu z zaledwie 20–30 minutami dla LH).',
      },
      {
        title: 'Nonapeptydy tylnego płata: Pętla disiarczkowa Cys1-Cys6',
        text: 'Arginino-wazopresyna (AVP) i oksytocyna (OXT) to peptydy syntetyzowane w jądrach wielkokomórkowych podwzgórza jako prohormony połączone z neurofizynami. Obie cząsteczki mają 9 aminokwasów z mostkiem disiarczkowym pomiędzy resztami Cys1 i Cys6, tworzącym 6-aminokwasowy pierścień i 3-aminokwasowy ogon C-końcowy z amidacją grupy karboksylowej (Gly9-NH2). Różnią się zaledwie 2 pozycjami: poz. 3 (Phe w AVP vs Ile w OXT) oraz poz. 8 (zasadowa Arg w AVP vs hydrofobowa Leu w OXT).',
      },
    ],
    table: {
      headers: ['Cząsteczka', 'Struktura / Podjednostki', 'Różnica chemiczna i funkcja'],
      rows: [
        ['TSH vs LH vs FSH vs hCG', 'Wspólna alfa (92 aa), swoiste beta', 'Beta decyduje o receptorze; beta-hCG ma ogon CTP bogaty w kwas sjalowy'],
        ['Arginino-wazopresyna (AVP)', 'Cys-Tyr-Phe-Gln-Asn-Cys-Pro-Arg-Gly-NH2', 'Phe3 + Arg8; silne działanie antydiuretyczne (V2R) i wazokonstrykcyjne (V1aR)'],
        ['Oksytocyna (OXT)', 'Cys-Tyr-Ile-Gln-Asn-Cys-Pro-Leu-Gly-NH2', 'Ile3 + Leu8; skurcz miocytów macicy i komórek mioepitelialnych gruczołu piersiowego'],
        ['Pętla Cys1-Cys6', 'Wiązanie disiarczkowe (-S-S-)', 'Konieczna dla aktywności biologicznej; jej redukcja gasi działanie receptora'],
      ],
    },
    advanced:
      'Homologia między receptorami V2 wazopresyny a receptorami oksytocynowymi wynosi ponad 60%. W bardzo wysokich dawkach (np. podczas wlewu oksytocyny w indukcji porodu lub krwotoku poporodowym) oksytocyna wykazuje krzyżowe powinowactwo do receptorów V2R w cewkach zbiorczych nerki, wywołując powikłanie w postaci zatrucia wodnego i groźnej hiponatremii.',
    summary:
      'Heterodimery TSH/LH/FSH/hCG dzielą identyczny łańcuch alfa, a AVP i oksytocyna różnią się tylko 2 aminokwasami w obrębie konserwatywnej pętli nonapeptydowej Cys1-Cys6.',
    sourceIds: ['physiology', 'central', 'pregnancy'],
    questions: [
      q(
        'Jaka część cząsteczki jest w 100% identyczna pod względem sekwencji aminokwasowej w TSH, LH, FSH i hCG?',
        ['Podjednostka alfa (CGA)', 'Wszystkie cztery hormony wykorzystują ten sam produkt pojedynczego genu CGA.'],
        ['Podjednostka beta', 'Podjednostka beta jest unikalna dla każdego hormonu i decyduje o swoistości.'],
        ['Mostek eterowy C-O-C', 'Hormony glikoproteinowe to polipeptydy, nie jodowane etery fenolowe.']
      ),
      q(
        'Dlaczego okres półtrwania hCG w osoczu wynosi aż 24–36 godzin, podczas gdy LH zaledwie 20–30 minut?',
        ['Dzięki silnej sialilacji łańcuchów cukrowych C-końcowego peptydu (CTP) w podjednostce beta-hCG', 'Reszty kwasu sjalowego blokują klirens wątrobowy przez receptory asjaloglikoproteinowe.'],
        ['Ponieważ hCG nie krąży we krwi, lecz wyłącznie w limfie', 'hCG krąży we krwi obwodowej w wysokich stężeniach.'],
        ['Ponieważ hCG jest syntetyzowana z czystego złota', 'hCG jest glikoproteiną syntetyzowaną przez syncytiotrofoblast.']
      ),
      q(
        'Ilu aminokwasów liczy dojrzała cząsteczka wazopresyny (AVP) i oksytocyny (OXT)?',
        ['9 aminokwasów (nonapeptyd)', 'Posiada pętlę heksapeptydową zamkniętą mostkiem disiarczkowym i tripeptydowy ogon.'],
        ['198 aminokwasów', 'Tyle liczy podwójny łańcuch prolaktyny lub hormonu wzrostu.'],
        ['Dokładnie 2 aminokwasy', 'Dipeptydy to np. karnozyna; wazopresyna jest nonapeptydem.']
      ),
      q(
        'Które reszty aminokwasowe tworzą kluczowy mostek disiarczkowy zamykający pierścień w cząsteczce wazopresyny?',
        ['Cysteina 1 oraz Cysteina 6 (Cys1-Cys6)', 'Utworzony mostek tiolowy -S-S- jest bezwzględnie wymagany do aktywacji receptora V2.'],
        ['Tyrozyna 2 i Fenyloalanina 3', 'Te reszty nie posiadają grup sulfhydrylowych (-SH).'],
        ['Arginina 8 i Glicynamid 9', 'C-koniec jest zlokalizowany poza pętlą pierścienia.']
      ),
      q(
        'Jakie niebezpieczne powikłanie metaboliczne może wywołać wysoki wlew oksytocyny podczas porodu?',
        ['Hiponatremię z przewodnieniem (zatrucie wodne) przez krzyżową aktywację receptora V2R', 'Oksytocyna w megadawkach naśladuje wazopresynę i blokuje wydalanie wolnej wody.'],
        ['Ciężką hiperkaliemię z zatrzymaniem akcji serca', 'Oksytocyna nie jest bezpośrednim lekiem oszczędzającym potas.'],
        ['Ostrą kwasicę ketonową', 'Kwasica ketonowa wynika z bezwzględnego braku insuliny.']
      ),
    ],
  },
  {
    id: 'przysadka-chemia-leki',
    moduleId: 'przysadka',
    title: 'Farmakofor ergolinowy agonistów dopaminy i modyfikacje wazopresyny',
    subtitle: 'Kabergolina, selektywność desmopresyny (dDAVP) i analogi somatostatyny',
    group: 'Chemia i biochemia',
    minutes: 20,
    goals: [
      'Przeanalizujesz strukturę chemiczną pierścienia ergoliny i selektywność receptorową kabergoliny.',
      'Wyjaśnisz modyfikacje strukturalne desmopresyny (dDAVP) eliminujące efekt presyjny i wydłużające t1/2.',
    ],
    sections: [
      {
        title: 'Farmakofor ergolinowy: Kabergolina i bromokryptyna',
        text: 'Agoniści receptorów dopaminowych stosowani w prolactinoma wywodzą się z alkaloidów buławinki czerwonej (Claviceps purpurea). Szkielet ergoliny (tetracykliczny układ indolowy z pierścieniem chinolinowym) wykazuje wysokie powinowactwo do receptora dopaminowego D2R (sprzężonego z białkiem Gi, hamującego cyklazę adenylanową i sekrecję PRL). Kabergolina posiada łańcuch mocznikowy z grupą allilową, co nadaje jej wielodniowy czas półtrwania (t1/2 ≈ 65–110 h) i umożliwia dawkowanie 1–2 razy w tygodniu.',
      },
      {
        title: 'Selektywność receptorowa a powikłania zastawkowe',
        text: 'Poza receptorem D2R, niektóre ergoliny wykazują powinowactwo do receptora serotoninowego 5-HT2B. Pobudzenie 5-HT2B na fibroblastach zastawek serca indukuje szlak mitogenny i proliferację tkanki łącznej, co w wysokich dawkach stosowanych w chorobie Parkinsona prowadziło do zwłóknienia zastawek. W mikro- i makroprolactinoma stosuje się dawki wielokrotnie mniejsze (zwykle 0,5–1,0 mg/tydzień), gdzie ryzyko kardiotoksyczności jest minimalne, lecz zaleca się kontrolne badanie echokardiograficzne.',
      },
      {
        title: 'Inżynieria cząsteczki desmopresyny: 1-deamino-8-D-arginino-wazopresyna',
        text: 'Naturalna wazopresyna (AVP) ma krótki czas półtrwania (t1/2 ≈ 10–20 min) i działa silnie wazokonstrykcyjnie na naczynia krwionośne przez receptor V1aR. Desmopresyna (dDAVP) zawiera dwie kluczowe modyfikacje syntetyczne: 1) deaminację grupy aminowej Cys1 (zwiększa odporność na aminopeptydazy i wydłuża t1/2 do 2–4 h), oraz 2) substytucję naturalnej L-argininy stereoizomerem D-argininą w pozycji 8. Zmiana konfiguracji przestrzennej w poz. 8 znosi działanie presyjne na V1aR, zwiększając selektywność antydiuretyczną V2 aż 2000-krotnie.',
      },
    ],
    table: {
      headers: ['Lek syntetyczny', 'Modyfikacja strukturalna', 'Zysk farmakologiczny'],
      rows: [
        ['Kabergolina', 'Podstawnik allilowy i mocznikowy w ergolinie', 't1/2 wydłużony do 65–110 h, dawkowanie raz na tydzień, potężna supresja PRL'],
        ['Desmopresyna (dDAVP)', '1-deamino + 8-D-arginina', '2000-krotna selektywność V2R vs V1aR, brak skurczu naczyń, odporność na peptydazy'],
        ['Oktreotyd', 'Syntetyczny cykliczny oktapeptyd (D-Phe-Cys-Phe-D-Trp-Lys-Thr-Cys-Thr-ol)', 'Stabilny analog somatostatyny o t1/2 = 100 min (naturalna SST t1/2 = 2 min), hamuje GH'],
        ['Pasyreotyd', 'Cykloheksapeptyd o wysokim powinowactwie do SSTR5', 'Skuteczny w chorobie Cushinga i akromegalii opornej na oktreotyd'],
      ],
    },
    advanced:
      'Naturalna somatostatyna-14 ulega błyskawicznej degradacji przez endopeptydazy osoczowe w czasie 1–2 minut. W oktreotydzie zastąpienie naturalnego L-tryptofanu stereoizomerem D-Trp w pozycji 4 oraz redukcja C-końcowej treoniny do treoninolu uniemożliwia proteolizę, zachowując 4-aminokwasowy motyw beta-zwrotu (beta-turn) konieczny do aktywacji receptorów SSTR2.',
    summary:
      'Inżynieria leków przysadkowych opiera się na modyfikacjach stereochemicznych (D-aminokwasy w dDAVP i oktreotydzie) oraz syntetycznych pochodnych ergoliny (kabergolina).',
    sourceIds: ['melmed', 'hyponatraemia', 'goodwin'],
    questions: [
      q(
        'Jakie dwie modyfikacje chemiczne wprowadzono w cząsteczce desmopresyny (dDAVP) w stosunku do naturalnej AVP?',
        ['Usunięcie grupy aminowej z Cys1 oraz zamianę L-argininy na D-argininę w pozycji 8', 'Daje to 2000-krotne zmniejszenie działania presyjnego V1a i chroni przed peptydazami.'],
        ['Dodanie 5 atomów jodu do pierścienia fenolowego', 'Jodowanie dotyczy hormonów tarczycy, a nie desmopresyny.'],
        ['Połączenie cząsteczki z albuminą ludzką wiązaniem estrowym', 'Desmopresyna jest syntetycznym nonapeptydem bez modyfikacji albuminowej.']
      ),
      q(
        'Dlaczego kabergolinę można podawać w prolactinoma zaledwie raz lub dwa razy w tygodniu?',
        ['Charakteryzuje się bardzo długim losem metabolicznym i okresem półtrwania t1/2 wynoszącym 65–110 godzin', 'Silne wiązanie z receptorem D2R i powolna dysocjacja tkankowa.'],
        ['Ponieważ przekształca się w organizmie w stałą tkankę kostną', 'Kabergolina jest metabolizowana w wątrobie i wydalana z kałem i moczem.'],
        ['Ponieważ przysadka magazynuje ją w pęcherzykach żółciowych', 'Lek gromadzi się w przednim płacie przysadki, a nie w żółci.']
      ),
      q(
        'Z pobudzeniem którego receptora serotoninowego wiąże się ryzyko włóknienia zastawek serca przy megadawkach ergolin?',
        ['Receptora serotoninowego 5-HT2B', 'Aktywacja 5-HT2B stymuluje mitogenezę fibroblastów zastawek serca.'],
        ['Receptora histaminowego H1', 'Receptor H1 odpowiada za reakcje alergiczne, nie włóknienie zastawkowe.'],
        ['Receptora muskarynowego M2', 'Receptor M2 zwalnia czynność węzła zatokowego, nie powoduje fibrozy.']
      ),
      q(
        'Jaki jest czas półtrwania (t1/2) naturalnej somatostatyny w osoczu człowieka?',
        ['Zaledwie 1–3 minuty (jest błyskawicznie degradowana przez peptydazy)', 'Dlatego nie nadaje się do terapii bez formy ciągłego wlewu dożylnego.'],
        ['Około 14 dni', 'Naturalne peptydy proste ulegają szybkiej proteolizie.'],
        ['Dokładnie 24 godziny', 'Tak długi czas cechuje analogi syntetyczne o przedłużonym uwalnianiu, nie naturalny hormon.']
      ),
      q(
        'Który analog somatostatyny wykazuje 40-krotnie wyższe powinowactwo do receptora SSTR5 niż oktreotyd i jest stosowany w chorobie Cushinga?',
        ['Pasyreotyd', 'Jest uniwersalnym ligandem multireceptorowym (SSTR1, SSTR2, SSTR3, SSTR5).'],
        ['Bromokryptyna', 'Bromokryptyna jest agonistą receptora dopaminowego D2, a nie somatostatynowego.'],
        ['Tiamazol', 'Tiamazol jest tyreostatykiem hamującym peroksydazę tarczycową.']
      ),
    ],
  },
];
