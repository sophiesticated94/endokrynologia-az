import { type DraftLesson, type Source, q } from './course-types.ts';

export const parathyroidMathChemSources: Record<string, Source> = {
  casr_hill: {
    id: 'casr_hill',
    title: 'Brown EM et al. — Cloning and characterization of an extracellular Ca(2+)-sensing receptor from bovine parathyroid',
    year: '1993',
    url: 'https://doi.org/10.1038/366575a0',
    kind: 'Biofizyka CaSR i model allosteryczny',
  },
  qtc_bone: {
    id: 'qtc_bone',
    title: 'Witteveen JE et al. — Hungry bone syndrome: still a challenge in the post-operative management of primary hyperparathyroidism: a systematic review',
    year: '2013',
    url: 'https://doi.org/10.1530/EJE-12-0528',
    kind: 'Kinetyka mineralizacji i zespół głodnych kości',
  },
};

export const draftParathyroidMathChem: DraftLesson[] = [
  {
    id: 'przytarczyce-matematyka-casr-sigmoida',
    moduleId: 'przytarczyce',
    title: 'Równanie Hilla dla receptora CaSR i kinetyka supresji PTH',
    subtitle: 'Sigmoidalna krzywa supresji, kooperatywność nH i przesunięcia set-pointu',
    group: 'Matematyka i modele',
    minutes: 20,
    goals: [
      'Wyprowadzisz 4-parametrowe równanie Hilla opisujące supresję PTH przez stężenie jonów Ca2+.',
      'Obliczysz przesunięcie punktu nastawczego (set-point / EC50) w mutacjach FHH oraz pod wpływem kalcymimetyków.',
    ],
    sections: [
      {
        title: 'Niezwykle stroma sigmoida: kooperatywność receptora CaSR',
        text: 'Zależność między stężeniem wapnia zjonizowanego [Ca2+] a uwalnianiem parathormonu (PTH) nie jest krzywą hiperboliczną, lecz bardzo stromą sigmoidą o współczynniku kooperatywności Hilla nH = 3,5–4,0. Oznacza to potężną allosteryczną kooperatywność homodimeru receptora CaSR — wiązanie pierwszego jonu wapnia dramatycznie ułatwia wiązanie kolejnych jonów w domenie zewnątrzkamórkowej.',
      },
      {
        title: '4-parametrowy model matematyczny supresji PTH',
        text: 'Krzywą supresji opisuje wzór: PTH([Ca2+]) = PTH_min + (PTH_max - PTH_min) / (1 + ([Ca2+] / EC50)^nH). Wartość EC50 (stężenie wapnia zjonizowanego dające 50% supresji sekrecji) określa się jako set-point przytarczyc. U zdrowych wynosi około 1,20–1,22 mmol/L. PTH_min to wydzielanie niesuprymowalne (ok. 5–10% sekrecji maksymalnej). Bardzo wąski zakres fizjologiczny wapnia (1,15–1,32 mmol/L) pokrywa się dokładnie z najbardziej stromym odcinkiem krzywej.',
      },
      {
        title: 'Przesunięcia set-pointu w patologii i farmakoterapii',
        text: 'W rodzinnej hiperkalcemii hipokalciurycznej (FHH — inaktywująca mutacja genu CASR) krzywa przesuwa się w prawo (EC50 wzrasta do 1,35–1,45 mmol/L): przytarczyce odbierają hiperkalcemię jako stan prawidłowy. Z kolei kalcymimetyki (cynakalcet — allosteryczny aktywator CaSR) przesuwają krzywą w lewo (EC50 spada do 1,10–1,15 mmol/L), wymuszając supresję PTH przy niższym stężeniu wapnia. W gruczolaku przytarczyc wzrasta PTH_min i masa tkanki.',
      },
    ],
    table: {
      headers: ['Stan kliniczny', 'Wartość Set-Point (EC50)', 'Kształt krzywej supresji PTH'],
      rows: [
        ['Fizjologia (eukalcemia)', '1,20–1,22 mmol/L', 'Stroma sigmoida (nH ~3,8); pełna supresja przy Ca2+ > 1,30 mmol/L'],
        ['FHH (mutacja inaktywująca)', '1,35–1,45 mmol/L (w prawo)', 'Przesunięcie w prawo; wydzielanie PTH trwa mimo hiperkalcemii'],
        ['Kalcymimetyk (cynakalcet)', '1,10–1,15 mmol/L (w lewo)', 'Przesunięcie w lewo; głęboka supresja PTH nawet przy normokalcemii'],
        ['Autonomiczny gruczolak PHPT', 'Utrata supresji / ↑ PTH_min', 'Wypłaszczenie krzywej, wysokie PTH_min niezależne od stężenia Ca2+'],
      ],
    },
    advanced:
      'W receptorze CaSR sygnał hamujący wydzielanie PTH przekazywany jest przez białko Gq/11 (aktywacja fosfolipazy Cbeta ⟶ IP3 i DAG ⟶ napływ Ca2+ z siateczki) oraz białko Gi (hamowanie cyklazy adenylanowej). W odróżnieniu od większości komórek wydzielniczych (gdzie wzrost Ca2+ stymuluje egzocytozę), w komórkach głównych przytarczyc wysoki wewnątrzkomórkowy wapń paradoksalnie blokuje fuzję pęcherzyków z PTH.',
    summary:
      'Receptor CaSR charakteryzuje się wysoką kooperatywnością Hilla (nH ~3,8), a jego set-point (EC50 ~1,21 mmol/L) przesuwa się w prawo w mutacjach FHH i w lewo pod wpływem cynakalcetu.',
    sourceIds: ['casr_hill', 'fhh_consensus', 'qtc_bone'],
    derivation: {
      title: 'Wyprowadzenie 4-parametrowego równania Hilla dla supresji PTH',
      model: 'Allosteryczny model kooperatywności homodimeru CaSR',
      steps: [
        {
          step: 'Równanie wiązania kooperatywnego Hilla',
          equation: '\\theta = \\frac{[Ca^{2+}]^{n_H}}{EC_{50}^{n_H} + [Ca^{2+}]^{n_H}}',
          explanation: 'Frakcja aktywnych receptorów CaSR theta zależy od potęgi nH (nH ≈ 3,8). Wysokie nH wynika z allosterycznego sprzężenia pomiędzy domenami Venus Flytrap obu monomerów.',
        },
        {
          step: '4-parametrowy model sekrecji PTH',
          equation: 'PTH([Ca^{2+}]) = PTH_{min} + \\frac{PTH_{max} - PTH_{min}}{1 + \\left(\\frac{[Ca^{2+}]}{EC_{50}}\\right)^{n_H}}',
          explanation: 'PTH_max to maksymalne uwalnianie przy hipokalcemii, PTH_min to wydzielanie autonomiczne/bazalne, EC50 to set-point przytarczyc (norma 1,21 mmol/L).',
        },
        {
          step: 'Wpływ mutacji FHH i cynakalcetu na set-point',
          equation: 'EC_{50, FHH} > 1,35 \\text{ mmol/L}, \\quad EC_{50, cinacalcet} < 1,12 \\text{ mmol/L}',
          explanation: 'Inaktywacja CaSR przesuwa krzywą w prawo (wymaga wyższego Ca2+ do supresji). Pozytywny modulator allosteryczny cynakalcet stabilizuje konformację aktywną 7TM, obniżając EC50.',
        },
      ],
      clinicalTakeaway: 'Dzięki nH = 3,8 zakres regulacji eukalcemii jest mikroskopijny (1,15–1,30 mmol/L). W FHH wysoki wapń nie hamuje PTH z powodu przesunięcia EC50 w prawo, co odróżnia ją od gruczolaka (gdzie rośnie PTH_min).',
    },
    workedExample: {
      title: 'Zespół głodnych kości (HBS) po paratyreoidektomii – kinetyka spadku Ca2+ i kalkulacja wlewu',
      patient: 'Mężczyzna, 48 lat, stan 24h po paratyreoidektomii z powodu ciężkiego PHPT z osteitis fibrosa cystica. Przedoperacyjna ALP 580 U/L. Objaw Chvostka i Trousseau dodatnie.',
      inputs: [
        { label: 'Wapń całkowity pooperacyjny', value: '6,6', unit: 'mg/dl (1,65 mmol/L)' },
        { label: 'Wapń zjonizowany Ca2+', value: '0,82', unit: 'mmol/L' },
        { label: 'Fosforany w surowicy', value: '1,4', unit: 'mg/dl (spadek!)' },
        { label: 'Magnez w surowicy', value: '1,2', unit: 'mg/dl (spadek!)' },
      ],
      calculationSteps: [
        'Krok 1: Identyfikacja zespołu HBS: jednoczesny głęboki spadek $[Ca^{2+}]$, $[PO_4^{3-}]$ i $[Mg^{2+}]$ przy ALP $580\\,\\text{U/L}$ potwierdza masywną remineralizację kości, a nie czystą hipoparatyreozę.',
        'Krok 2: Doraźny bolus ratunkowy: $10\\text{–}20\\,\\text{ml } 10\\%\\text{ glukonianu wapnia}$ ($93\\text{–}186\\,\\text{mg Ca}^{2+}$ elementarnego) w $100\\,\\text{ml } 5\\%\\text{ glukozy}$ i.v. w ciągu 15 minut.',
        'Krok 3: Ciągły wlew dożylny: $1\\,\\text{mg/kg/h}$ wapnia elementarnego $\\longrightarrow$ dla $75\\,\\text{kg} = 75\\,\\text{mg/h} \\approx 8\\,\\text{ml/h } 10\\%\\text{ glukonianu wapnia}$ w pompie.',
        'Krok 4: Terapia skojarzona: kalcytriol $1{,}0\\text{–}2{,}0\\,\\text{µg/d} + \\text{węglan wapnia } 3\\text{–}6\\,\\text{g/d} + \\text{siarczan magnezu } 2\\,\\text{g MgSO}_4\\text{ i.v.}$.',
      ],
      result: 'Ustąpienie tężyczki i parestezji; po 12h wlewu Ca2+ wzrósł do 1,05 mmol/L, docelowo utrzymywany w dolnej granicy normy (1,05–1,15 mmol/L).',
      clinicalAction: 'Kontrola stężenia wapnia zjonizowanego co 4–6h. Utrzymanie wlewu przez 3–5 dni z powolnym odstawianiem w miarę wysycania głodu kostnego i przechodzenia na leczenie doustne.',
    },
    questions: [
      q(
        'Jaki współczynnik kooperatywności Hilla (nH) charakteryzuje krzywą supresji PTH przez wapń zjonizowany na receptorze CaSR?',
        ['Około 3,5 do 4,0 (bardzo wysoka kooperatywność allosteryczna)', 'Powoduje, że drobna zmiana stężenia wapnia o 0,05 mmol/L drastycznie zmienia sekrecję PTH.'],
        ['Dokładnie 0 (brak jakiejkolwiek zależności)', 'Gdyby nH wynosił 0, stężenie wapnia nie wpływałoby na PTH.'],
        ['Wartość ujemna -50', 'Współczynnik Hilla opisujący wiązanie liganda przyjmuje wartości dodatnie.']
      ),
      q(
        'Czym jest punkt nastawczy przytarczyc (set-point / EC50)?',
        ['Stężeniem wapnia zjonizowanego, przy którym sekrecja PTH wynosi 50% wartości maksymalnej', 'Fizjologicznie wynosi około 1,20–1,22 mmol/L i wyznacza ośrodek regulacji homeostazy.'],
        ['Maksymalną dawką dożylną glukonianu wapnia', 'Set-point to parametr biofizyczny receptora, nie dawka leku.'],
        ['Wskaźnikiem grubości torebki gruczołu w USG', 'Set-point dotyczy affinities receptora CaSR, a nie anatomii makroskopowej.']
      ),
      q(
        'Jak zmienia się krzywa supresji PTH u pacjenta z rodzinną hiperkalcemią hipokalciuryczną (FHH)?',
        ['Przesuwa się w prawo (set-point EC50 wzrasta do 1,35–1,45 mmol/L)', 'Przytarczyce wymagają wyższego stężenia wapnia, aby zahamować wydzielanie PTH.'],
        ['Przesuwa się w lewo i znika', 'Krzywa przesuwa się w prawo, a nie w lewo.'],
        ['Staje się idealnym kołem na wykresie', 'Krzywe Hilla zachowują kształt sigmoidalny.']
      ),
      q(
        'W jaki sposób kalcymimetyk cynakalcet wpływa na parametry równania Hilla receptora CaSR?',
        ['Działa jako pozytywny modulator allosteryczny (PAM), przesuwając krzywą w lewo i obniżając EC50', 'Zwiększa wrażliwość receptora na zewnątrzkomórkowy wapń, tłumiąc PTH.'],
        ['Blokuje receptory CaSR i podnosi PTH do 1000 pg/ml', 'Cynakalcet aktywuje receptor, hamując wydzielanie PTH.'],
        ['Odcina wiązania peptydowe parathormonu w żołądku', 'Cynakalcet działa na receptor błonowy w przytarczycach.']
      ),
      q(
        'Co jest unikalnego w sygnalizacji wewnątrzkomórkowej w komórkach głównych przytarczyc w porównaniu z innymi komórkami dokrewnymi?',
        ['Wzrost stężenia wewnątrzkomórkowego wapnia (Ca2+) hamuje uwalnianie PTH, zamiast je stymulować', 'Jest to tzw. paradoks przytarczycowy regulowany przez szlaki Gq i Gi.'],
        ['Komórki przytarczyc nie posiadają błony komórkowej', 'Wszystkie komórki ludzkie posiadają dwuwarstwową błonę lipidową.'],
        ['Wapń zamienia się w nich w fosforan żelaza', 'Pierwiastki nie ulegają fuzji jądrowej w tkankach biologicznych.']
      ),
    ],
  },
  {
    id: 'przytarczyce-matematyka-kinetyka-mineralizacji',
    moduleId: 'przytarczyce',
    title: 'Wzór CCCR/FeCa, kinetyka mineralizacji i formuły QTc',
    subtitle: 'Wskaźnik klirensu wapniowo-kreatyninowego, zespół głodnych kości i EKG',
    group: 'Matematyka i modele',
    minutes: 21,
    goals: [
      'Wyprowadzisz i obliczysz wskaźnik klirensu wapniowo-kreatyninowego (CCCR / FeCa) w różnicowaniu PHPT vs FHH.',
      'Zastosujesz formuły korygujące odstęp QT (Bazett i Fridericia) w hipokalcemii i hiperkalcemii.',
    ],
    sections: [
      {
        title: 'Wyprowadzenie wskaźnika CCCR (frakcyjnego wydalania wapnia)',
        text: 'Wskaźnik klirensu wapniowo-kreatyninowego (Calcium-to-Creatinine Clearance Ratio, CCCR) reprezentuje stosunek klirensu nerkowego wapnia (Cl_Ca) do klirensu kreatyniny (Cl_Cr): CCCR = Cl_Ca / Cl_Cr = (U_Ca * V / S_Ca) / (U_Cr * V / S_Cr). Objętość moczu V ulega skróceniu: CCCR = (U_Ca * S_Cr) / (S_Ca * U_Cr). Obie pary stężeń muszą być w tych samych jednostkach (mg/dL lub mmol/L). Wartość CCCR < 0,01 z prawdopodobieństwem >90% wskazuje na FHH, a CCCR > 0,02 na PHPT.',
      },
      {
        title: 'Kinetyka mineralizacji w zespole głodnych kości (Hungry Bone Syndrome)',
        text: 'Po usunięciu gruczolaka przytarczyc u pacjentów z ciężką osteitis fibrosa cystica i wysoką wyjściową fosfatazą alkaliczną (ALP > 3–4x normy) dochodzi do gwałtownego odwrócenia kierunku przepływu jonów: osteoklastoza ustępuje, a osteoblasty masowo syntetyzują kryształy hydroksyapatytu Ca10(PO4)6(OH)2. Spadek stężenia wapnia w czasie opisuje kinetyka wykładnicza: Ca(t) = Ca_target + (Ca_0 - Ca_target) * exp(-k * t), gdzie stała k zależy liniowo od wyjściowego stężenia kostnej frakcji ALP.',
      },
      {
        title: 'Matematyka elektrokardiograficzna: Wzory Bazetta i Fridericia',
        text: 'Hipokalcemia wydłuża fazę 2 (plateau) potencjału czynnościowego kardiomiocytów (napływ Ca2+ przez kanały typu L), powodując wydłużenie odcinka ST i odstępu QT w EKG. Ponieważ czas repolaryzacji zależy od tętna (odstępu RR), stosuje się formuły korygujące: Bazetta QTc = QT / sqrt(RR) oraz Fridericia QTc = QT / cbrt(RR) (RR podane w sekundach). Wartość QTc > 450 ms u mężczyzn i > 460 ms u kobiet zwiastuje wysokie ryzyko polimorficznego częstoskurczu komorowego (Torsade de Pointes).',
      },
    ],
    table: {
      headers: ['Wskaźnik / Wzór', 'Formuła matematyczna', 'Interpretacja kliniczna'],
      rows: [
        ['Wskaźnik CCCR (FeCa)', '(U_Ca · S_Cr) / (S_Ca · U_Cr)', '<0,01 = FHH (nie operuj!); >0,02 = PHPT (wskazana paratyreoidektomia)'],
        ['Formuła Bazetta', 'QTc = QT / √(RR)', 'Powszechnie stosowana, lecz nadmiernie wydłuża QTc przy tachykardii (>100 bpm)'],
        ['Formuła Fridericia', 'QTc = QT / ∛(RR)', 'Bardziej precyzyjna przy tachykardii i bradykardii; standard w badaniach klinicznych'],
        ['Iloczyn Ca x P', 'Wapń [mg/dl] · Fosforany [mg/dl]', '>55 mg²/dl² = ryzyko zwapnień pozaszkieletowych i kalcyfilaksji w SHPT'],
      ],
    },
    advanced:
      'W odróżnieniu od niedoczynności przytarczyc (gdzie w surowicy spada wapń, ale fosforany rosną z powodu braku fosfaturii PTH), w zespole głodnych kości (HBS) dochodzi do jednoczesnego głębokiego spadku wapnia, fosforanów i magnezu. Wynika to ze stechiometrii krystalizacji hydroksyapatytu w macierzy kostnej, który wiąże fosforany w stosunku molowym Ca:P równym 1,67 (10:6).',
    summary:
      'Wskaźnik CCCR < 0,01 bezwzględnie odróżnia FHH od PHPT, a wydłużenie fazy 2 potencjału komorowego w hipokalcemii manifestuje się wydłużeniem QTc wg wzorów Bazetta i Fridericia.',
    sourceIds: ['qtc_bone', 'fhh_consensus', 'ese_hypopara'],
    derivation: {
      title: 'Wyprowadzenie wskaźnika CCCR i korekcji elektrokardiograficznych QTc',
      model: 'Frakcyjne wydalanie nerkowe oraz modele repolaryzacji komorowej Bazetta i Fridericia',
      steps: [
        {
          step: 'Matematyczna redukcja wskaźnika CCCR',
          equation: 'CCCR = \\frac{Cl_{Ca}}{Cl_{Cr}} = \\frac{(U_{Ca} \\cdot V) / S_{Ca}}{(U_{Cr} \\cdot V) / S_{Cr}} = \\frac{U_{Ca} \\cdot S_{Cr}}{S_{Ca} \\cdot U_{Cr}}',
          explanation: 'Objętość diurezy V ulega skróceniu, dzięki czemu wskaźnik oblicza się z pojedynczej porannej próbki moczu i surowicy w tych samych jednostkach (mmol/L).',
        },
        {
          step: 'Równania korekcji odstępu QT',
          equation: 'QTc_{Bazett} = \\frac{QT}{\\sqrt{RR}}, \\quad QTc_{Fridericia} = \\frac{QT}{\\sqrt[3]{RR}} \\quad (RR \\text{ w sekundach})',
          explanation: 'RR = 60 / HR. Model Bazetta zakłada wykładnik 0,5, co przy tachykardii (RR < 0,8 s) sztucznie zawyża QTc. Model Fridericia (0,33) eliminuje błąd nieliniowy.',
        },
        {
          step: 'Stechiometria krystalizacji hydroksyapatytu',
          equation: '10\\,Ca^{2+} + 6\\,HPO_4^{2-} + 2\\,H_2O \\longrightarrow Ca_{10}(PO_4)_6(OH)_2 \\downarrow + 8\\,H^+',
          explanation: 'Stosunek molowy Ca:P wynosi 10:6 = 1,67. Wbudowywanie hydroksyapatytu pochłania wapń i fosfor, uwalniając protony (ryzyko kwasicy metabolicznej).',
        },
      ],
      clinicalTakeaway: 'CCCR < 0,01 definiuje FHH i chroni przed zbędną operacją szyi. W hipokalcemii z tachykardią zawsze weryfikuj QTc wzorem Fridericia, aby uniknąć fałszywego rozpoznania groźnego wydłużenia QT.',
    },
    workedExample: {
      title: 'Różnicowanie FHH vs PHPT za pomocą CCCR oraz ocena ryzyka arytmii w EKG',
      patient: 'Kobieta, 34 lata, bezobjawowa hiperkalcemia w badaniach kontrolnych: Ca 10,9 mg/dl (2,72 mmol/L), PTH 68 pg/ml (lekko podwyższony). W EKG tętno 105/min, surowy QT = 370 ms.',
      inputs: [
        { label: 'Wapń w surowicy S_Ca', value: '2,72', unit: 'mmol/L' },
        { label: 'Kreatynina w surowicy S_Cr', value: '72', unit: 'µmol/L (0,072 mmol/L)' },
        { label: 'Wapń w moczu U_Ca', value: '1,8', unit: 'mmol/L' },
        { label: 'Kreatynina w moczu U_Cr', value: '9,2', unit: 'mmol/L' },
      ],
      calculationSteps: [
        'Krok 1: Wskaźnik CCCR: $CCCR = \\frac{U_{Ca} \\cdot S_{Cr}}{S_{Ca} \\cdot U_{Cr}} = \\frac{1{,}8 \\times 0{,}072}{2{,}72 \\times 9{,}2} = \\frac{0{,}1296}{25{,}024} = 0{,}0052$.',
        'Krok 2: Interpretacja: $CCCR = 0{,}0052 < 0{,}01$ z czułością i swoistością $>90\\%$ potwierdza rodzinną hiperkalcemię hipokalciuryczną (FHH).',
        'Krok 3: Analiza elektrokardiograficzna: $HR = 105\\text{/min} \\implies RR = \\frac{60}{105} = 0{,}571\\,\\text{s}$. Zmierzony $QT = 370\\,\\text{ms}$.',
        'Krok 4: Porównanie korekcji: Bazett: $QTc = \\frac{0{,}370}{\\sqrt{0{,}571}} = 489\\,\\text{ms}$ (fałszywy alarm!). Fridericia: $QTc = \\frac{0{,}370}{\\sqrt[3]{0{,}571}} = 446\\,\\text{ms}$ (w normie $<450\\,\\text{ms}$).',
      ],
      result: 'CCCR = 0,0052 potwierdza FHH (brak wskazań do paratyreoidektomii); QTc wg Fridericia wynosi 446 ms (prawidłowy).',
      clinicalAction: 'Odstąpiono od planowanej operacji wycięcia przytarczyc. Skierowano na badanie genetyczne genu CASR oraz zalecono oznaczenie stężenia wapnia u krewnych I stopnia.',
    },
    questions: [
      q(
        'Jaka wartość wskaźnika klirensu wapniowo-kreatyninowego (CCCR) silnie przemawia za rodzinną hiperkalcemią hipokalciuryczną (FHH) i chroni chorego przed niepotrzebną operacją?',
        ['Poniżej 0,01 (CCCR < 0,01)', 'Świadczy o nadmiernym nerkowym wchłanianiu zwrotnym wapnia z powodu defektu receptora CaSR.'],
        ['Powyżej 0,02', 'CCCR > 0,02 jest typowy dla pierwotnej nadczynności przytarczyc (PHPT).'],
        ['Dokładnie 100,0', 'CCCR jest ułamkiem filtracji i nie przyjmuje takich wartości.']
      ),
      q(
        'Dlaczego wzór Fridericia (QTc = QT / ∛RR) jest uważany za dokładniejszy od wzoru Bazetta przy tachykardii?',
        ['Wzór Bazetta przeszacowuje odstęp QTc przy częstości akcji serca powyżej 80–90/min', 'Pierwiastek trzeciego stopnia łagodniej koryguje krótkie odstępy RR, unikając fałszywych alarmów.'],
        ['Wzór Fridericia nie wymaga znajomości odstępu RR', 'Oba wzory wymagają zmierzenia czasu cyklu serca RR w sekundach.'],
        ['Wzór Fridericia bada stężenie potasu zamiast EKG', 'Formuła dotyczy wyłącznie zapisu elektrokardiograficznego.']
      ),
      q(
        'Jaki specyficzny profil biochemiczny odróżnia zespół głodnych kości (HBS) od pooperacyjnej hipoparatyreozy?',
        ['W HBS zarówno wapń, jak i fosforany drastycznie spadają, podczas gdy w hipoparatyreozie fosforany rosną', 'Wynika to z masowej jednoczesnej budowy hydroksyapatytu wiążącego Ca i P w kościach.'],
        ['W HBS wapń rośnie do 20 mg/dl', 'W HBS dochodzi do ciężkiej hipokalcemii wymagającej wlewów wapnia.'],
        ['W hipoparatyreozie fosfataza zasadowa wynosi 0', 'ALP odzwierciedla aktywność kościotworzenia, nie zeruje się natychmiast.']
      ),
      q(
        'Jaki jest stechiometryczny stosunek molowy jonów wapnia do fosforu (Ca:P) w kryształach hydroksyapatytu kości Ca10(PO4)6(OH)2?',
        ['10 do 6 (czyli 1,67)', 'Na każde 10 jonów wapnia szkielet wbudowuje 6 jonów ortofosforanowych.'],
        ['1 do 1', 'Taki stosunek cechuje fosforan dwuwapniowy, nie dojrzały hydroksyapatyt.'],
        ['100 do 1', 'Kość jest bogatym rezerwuarem zarówno wapnia, jak i fosforu.']
      ),
      q(
        'Przekroczenie jakiej wartości iloczynu wapniowo-fosforanowego (Ca x P w mg²/dl²) stwarza krytyczne ryzyko kalcyfilaksji i zwapnień naczyniowych?',
        ['Powyżej 55 mg²/dl²', 'Przy tej wartości przekroczony zostaje iloczyn rozpuszczalności soli wapniowych w osoczu.'],
        ['Poniżej 5 mg²/dl²', 'Niski iloczyn chroni przed zwapnieniami, ale sprzyja osteomalacji.'],
        ['Dokładnie 1000 mg²/dl²', 'Tak skrajne stężenia nie występują w żywym ustroju.']
      ),
    ],
  },
  {
    id: 'przytarczyce-chemia-casr-kalcymimetyki',
    moduleId: 'przytarczyce',
    title: 'Domena Venus Flytrap CaSR i allosteryczne wiązanie kalcymimetyków',
    subtitle: 'Koordynacja wapnia przez Asp/Glu, białka Gq/11 i transmisyjna domena 7TM',
    group: 'Chemia i biochemia',
    minutes: 20,
    goals: [
      'Zanalizujesz strukturę trójwymiarową domeny Venus Flytrap (VFT) receptora CaSR i koordynację jonów Ca2+ przez reszty karboksylowe.',
      'Scharakteryzujesz wiązanie allosteryczne kalcymimetyków (cynakalcet) w domenie 7TM i modyfikację konformacji receptora.',
    ],
    sections: [
      {
        title: 'Architektura receptora CaSR: Klasa C GPCR i domena VFT',
        text: 'Receptor wykrywający wapń (CaSR) należy do klasy C receptorów sprzężonych z białkami G (obok receptorów mGluR i GABA-B). Działa jako konstytutywny homodimer połączony mostkami dwusiarczkowymi. Posiada ogromną domenę zewnątrzkamórkową (ECD, ~600 aminokwasów) przypominającą pułapkę na muchy (Venus Flytrap, VFT), połączoną bogatym w cysteinę łącznikiem (CRD) z 7-helikalną domeną transbłonową (7TM).',
      },
      {
        title: 'Koordynacja jonów Ca2+ w kieszeni Venus Flytrap',
        text: 'W każdej podjednostce VFT zidentyfikowano do 4–5 niskopowinowatych miejsc wiązania wapnia (Kd w zakresie milimolowym 1–3 mM, idealnie dopasowanym do stężeń w płynie pozakomórkowym). Jony Ca2+ są koordynowane heksagonalnie przez ujemnie naładowane grupy karboksylowe łańcuchów bocznych kwasu asparaginowego (Asp) i kwasu glutaminowego (Glu) oraz atomy tlenu szkieletu peptydowego. Wiązanie wapnia indukuje zamknięcie płatów VFT i skręcenie dimeru o około 30°.',
      },
      {
        title: 'Allosteryczne wiązanie cynakalcetu w kieszeni 7TM',
        text: 'Kalcymimetyki pierwszej (cynakalcet) i nowszej generacji to pochodne fenyloalkiloamin. Nie wiążą się one w miejscu ortosterycznym domeny VFT, lecz w hydrofobowej kieszeni allosterycznej wewnątrz pęczka 7 transbłonowych helis (7TM), stabilizowanej przez reszty Glu837 i Phe832. Cynakalcet obniża barierę energetyczną przejścia receptora w stan aktywny, wzmacniając przekazywanie sygnału przez białka Gq/11 i Gi nawet przy niskich stężeniach Ca2+.',
      },
    ],
    table: {
      headers: ['Domena / Cząsteczka', 'Kluczowe reszty chemiczne', 'Funkcja molekularna'],
      rows: [
        ['Domena Venus Flytrap (VFT)', 'Klaster reszt Asp i Glu w szczelinie', 'Koordynacja wielopunktowa jonów Ca2+; indukuje zamknięcie pułapki'],
        ['Łącznik bogaty w cysteinę (CRD)', '9 konserwatywnych cystein (mostki S-S)', 'Przenosi mechaniczne napięcie konformacyjne z VFT na domenę 7TM'],
        ['Cynakalcet (PAM)', 'Kieszeń hydrofobowa 7TM (Glu837, Trp818)', 'Pozytywny modulator allosteryczny; lewoskrętne przesunięcie krzywej CaSR'],
        ['Etelkalcetyd', 'D-peptyd (D-Cys wiążąca Cys482 mostkiem S-S)', 'Dożylny kalcymimetyk wiążący się kowalencyjnie z domeną ECD'],
      ],
    },
    advanced:
      'Kalcylityki (antagoniści allosteryczni / NAM CaSR, np. ronakalcyt) wiążą się w pokrywającej się kieszeni w domenie 7TM, stabilizując konformację nieaktywną. Wywołują przejściowy wyrzut endogennego PTH, co badano jako potencjalną terapię anaboliczną w osteoporozie (tzw. endogenna paraterapia PTH).',
    summary:
      'CaSR wykrywa jony Ca2+ poprzez koordynację karboksylową w domenie Venus Flytrap, a cynakalcet allosterycznie wzmacnia ten sygnał w obrębie helis 7TM.',
    sourceIds: ['casr_hill', 'fhh_consensus', 'kdigo_ckd_mbd'],
    questions: [
      q(
        'Do której klasy receptorów sprzężonych z białkami G (GPCR) należy receptor wykrywający wapń (CaSR)?',
        ['Do klasy C GPCR (charakteryzującej się olbrzymią domeną zewnątrzkamórkową Venus Flytrap)', 'Wspólnie z receptorami glutaminianowymi mGluR i receptorem GABA-B.'],
        ['Do receptorów związanych z kinazą tyrozynową jak receptor insuliny', 'CaSR jest 7-transbłonowym receptorem GPCR, nie kinazą receptorową.'],
        ['Do wewnątrzjądrowych receptorów hormonów steroidowych', 'CaSR znajduje się w błonie komórkowej tyreocytów i komórek głównych.']
      ),
      q(
        'Jakie reszty aminokwasowe w szczelinie domeny VFT bezpośrednio koordynują dodatnio naładowane jony Ca2+?',
        ['Ujemnie naładowane łańcuchy karboksylowe asparaginianu (Asp) i glutaminianu (Glu)', 'Tworzą klastry elektrostatyczne koordynujące jony wapnia wiązaniami jonowo-dipolowymi.'],
        ['Czyste cząsteczki cholesterolu', 'Lipidy tworzą dwuwarstwę błonową, nie koordynują wapnia w VFT.'],
        ['Nienaładowane atomy helu', 'Hel jest gazem szlachetnym nieobecnym w białkach.']
      ),
      q(
        'W którym miejscu receptora CaSR wiąże się allosteryczny lek cynakalcet?',
        ['W hydrofobowej kieszeni wewnątrz transbłonowej domeny 7TM', 'Nie konkuruje o miejsce wiązania wapnia w domenie VFT (jest modulatorem allosterycznym PAM).'],
        ['W jądrowym DNA komórki głównej', 'Cynakalcet jest małą cząsteczką działającą na receptor błonowy.'],
        ['Bezpośrednio do cząsteczki krążącego parathormonu', 'Lek moduluje receptor w przytarczycy, nie wiąże wolnego PTH w osoczu.']
      ),
      q(
        'Czym pod względem chemicznym różni się nowszy kalcymimetyk etelkalcetyd od cynakalcetu?',
        ['Jest syntetycznym D-heptapeptydem tworzącym mostek disiarczkowy z Cys482 domeny ECD', 'Podaje się go dożylnie na koniec sesji hemodializy u chorych z wtórną nadczynnością.'],
        ['Jest gazem wziewnym stosowanym w anestezji', 'Etelkalcetyd jest roztworem peptydowym do wstrzykiwań i.v.'],
        ['Zawiera 4 atomy radioaktywnego jodu-131', 'Nie jest lekiem radiofarmaceutycznym.']
      ),
      q(
        'Jakie białko G jest głównym przekaźnikiem hamowania sekrecji PTH po aktywacji receptora CaSR?',
        ['Białko Gq/11 aktywujące fosfolipazę Cβ (PLCβ) oraz białko Gi hamujące cyklazę adenylanową', 'Prowadzi do wzrostu wewnątrzkomórkowego IP3 i Ca2+, co paradoksalnie hamuje egzocytozę PTH.'],
        ['Białko Gs stymulujące produkcję cAMP', 'Pobudzenie Gs zwiększałoby wydzielanie PTH, co jest przeciwne do działania CaSR.'],
        ['Białko troponina C', 'Troponina reguluje skurcz filamentów mięśniowych, nie jest białkiem G.']
      ),
    ],
  },
  {
    id: 'przytarczyce-chemia-witd-bisfosfoniany',
    moduleId: 'przytarczyce',
    title: 'Fotoliza 7-dehydrocholesterolu, hydroksylacja witaminy D i mostki P-C-P',
    subtitle: 'Seko-steroidy, 1α-hydroksylaza (CYP27B1) i inhibicja FPPS przez bisfosfoniany',
    group: 'Chemia i biochemia',
    minutes: 21,
    goals: [
      'Wyjaśnisz fotochemiczny etap powstawania cholekalcyferolu pod wpływem UVB (290–315 nm) i dwuetapową hydroksylację enzymatyczną.',
      'Zanalizujesz mechanizm działania aminobisfosfonianów: chelatacja mostka P-C-P w kości i inhibicja syntazy FPPS osteoklastów.',
    ],
    sections: [
      {
        title: 'Fotochemia witaminy D: Rozszczepienie pierścienia B pod wpływem UVB',
        text: 'Prekursorem witaminy D3 w warstwie kolczystej i podstawnej naskórka jest 7-dehydrocholesterol (pochodna cholesterolu z podwójnym wiązaniem w pozycji C-7 i C-8). Promieniowanie ultrafioletowe UVB (długość fali 290–315 nm) powoduje elektrocamiczne otwarcie pierścienia B pomiędzy atomami C-9 i C-10. Powstaje termodynamicznie niestabilna prewitamina D3, która ulega powolnej (24–48 h) izomeryzacji termicznej do cholekalcyferolu. Ponieważ pierścień B jest otwarty, witamina D jest seko-steroidem.',
      },
      {
        title: 'Kaskada hydroksylacji: CYP2R1 (wątroba) i CYP27B1 (nerki)',
        text: 'Cholekalcyferol jest biologicznie nieaktywny. W hepatocytach enzym mikrosomalny CYP2R1 przeprowadza 25-hydroksylację, tworząc kalcydiol (25(OH)D3 — główną formę magazynową o t1/2 ≈ 2–3 tygodnie). W proksymalnych kanalikach nerek mitochondrialny cytochrom CYP27B1 (1alfa-hydroksylaza) dołącza grupę OH przy C-1, tworząc aktywny hormon kalcytriol (1,25(OH)2D3). Ekspresja CYP27B1 jest silnie stymulowana przez parathormon (PTH) i hipofosfatemię, a hamowana przez FGF23 i hiperkalcemię.',
      },
      {
        title: 'Chemia bisfosfonianów: Nielabilny mostek P-C-P i inhibicja FPPS',
        text: 'Naturalny pirofosforan posiada mostek P-O-P, który ulega natychmiastowej hydrolizie przez fosfatazy zasadowe. Leki z grupy bisfosfonianów zawierają mostek P-C-P oporny na enzymatyczną degradację. Dwie grupy fosfonianowe chelatują jony Ca2+, nadając lekowi ogromne powinowactwo do kryształów hydroksyapatytu w kości. Nowoczesne aminobisfosfoniany (zoledronian, alendronian) posiadają łańcuch boczny R2 z atomem azotu, który jest silnym inhibitorem syntazy difosforanu farnezylu (FPPS) w szlaku mewalonianu osteoklastów, co blokuje prenylację białek Rho/Rac i wywołuje apoptozę osteoklastów.',
      },
    ],
    table: {
      headers: ['Związek chemiczny', 'Kluczowa cecha strukturalna', 'Rola farmakologiczna / biologiczna'],
      rows: [
        ['Cholekalcyferol (D3)', 'Seko-steroid z otwartym pierścieniem B (C9-C10)', 'Powstaje w skórze po naświetleniu UVB lub dostarczany w diecie'],
        ['Kalcydiol (25(OH)D3)', '25-hydroksylacja przez wątrobowy CYP2R1', 'Główna krążąca forma witaminy D; miara zaopatrzenia ustroju (norma >30 ng/ml)'],
        ['Kalcytriol (1,25(OH)2D3)', '1α,25-dihydroksylacja przez nerkowy CYP27B1', 'Aktywny ligand receptora jądrowego VDR; zwiększa wchłanianie Ca i P w jelicie'],
        ['Kwas zoledronowy', 'Mostek P-C-P + pierścień imidazolowy z azotem', 'Najsilniejszy bisfosfonian i.v.; blokuje FPPS, leczy przełom hiperkalcemiczny'],
      ],
    },
    advanced:
      'Inhibicja syntazy FPPS przez aminobisfosfoniany uniemożliwia biosyntezę geranylogeranylo-difosforanu (GGPP) niezbędnego do izoprenylacji małych białek G (Rho, Rac, Cdc42). Pozbawione kotwicy lipidowej białka sygnałowe nie mogą przycumować do wewnętrznej powierzchni błony komórkowej osteoklasta, co skutkuje załamaniem rąbka szczoteczkowego (ruffled border), utratą zdolności do sekrecji kwasu solnego i apoptozą komórki kościogubnej.',
    summary:
      'Witamina D jest seko-steroidem wymagającym fotolizy UVB i dwóch hydroksylacji (CYP2R1 i CYP27B1), a bisfosfoniany kotwiczą się mostkiem P-C-P w kości i hamują enzym FPPS w osteoklastach.',
    sourceIds: ['qtc_bone', 'endo_hypercalcemia', 'pte_osteoporoza'],
    questions: [
      q(
        'Dlaczego witamina D3 jest określana w chemii organicznej mianem „seko-steroidu”?',
        ['Ponieważ promieniowanie UVB rozrywa wiązanie węgiel-węgiel w pierścieniu B szkieletu steroidowego', 'Przedrostek „seko-” oznacza związek steroidowy z otwartym jednym z pierścieni.'],
        ['Ponieważ jest wydalana w całości w ciągu jednej sekundy', 'Czas półtrwania metabolitów wynosi od godzin (kalcytriol) do tygodni (kalcydiol).'],
        ['Ponieważ zawiera wyłącznie atomy selenu i kobaltu', 'Witamina D składa się z węgla, wodoru i tlenu.']
      ),
      q(
        'Który metabolit witaminy D oznacza się we krwi obwodowej jako standardowy laboratoryjny wskaźnik zaopatrzenia organizmu?',
        ['25-Hydroksywitaminę D (Kalcydiol / 25(OH)D)', 'Ma długi czas półtrwania (2–3 tygodnie) i odzwierciedla łączną syntezę skórną i podaż dietetyczną.'],
        ['Aktywny 1,25(OH)2D (Kalcytriol)', 'Kalcytriol ma krótki t1/2 (4–6 h) i w hipowitaminozie może być paradoksalnie podwyższony przez wysoki PTH.'],
        ['Czysty cholesterol naskórkowy', 'Cholesterol jest powszechnym lipidem błonowym, nie miarą witaminy D.']
      ),
      q(
        'Czym pod względem chemicznym różni się mostek w cząsteczce bisfosfonianów (P-C-P) od naturalnego pirofosforanu (P-O-P)?',
        ['Atom węgla zamiast tlenu czyni wiązanie P-C-P całkowicie opornym na enzymatyczną hydrolizę fosfatazami', 'Umożliwia to wieloletnie przetrwanie leku w macierzy mineralnej kości.'],
        ['Wiązanie P-C-P eksploduje w kontakcie z wodą', 'Bisfosfoniany są stabilnymi solami rozpuszczalnymi w roztworach wodnych.'],
        ['Bisfosfoniany nie posiadają w ogóle atomów fosforu', 'Zawierają dwie reszty fosfonianowe skoordynowane przy centralnym węglu.']
      ),
      q(
        'Jaki kluczowy enzym szlaku mewalonianowego jest hamowany przez azotowe bisfosfoniany (np. kwas zoledronowy)?',
        ['Syntaza difosforanu farnezylu (FPPS)', 'Blokuje to prenylację małych białek G (Rho, Rac) i prowadzi do apoptozy osteoklastów.'],
        ['Cyklaza adenylowa', 'Cyklaza syntetyzuje cAMP, nie uczestniczy w szlaku mewalonianowym.'],
        ['Pepsyna żołądkowa', 'Pepsyna trawi białka w żołądku.']
      ),
      q(
        'Główny bodziec stymulujący nerkowy enzym CYP27B1 (1α-hydroksylazę) do produkcji aktywnego kalcytriolu to:',
        ['Wysokie stężenie parathormonu (PTH) oraz hipofosfatemia', 'PTH aktywuje transkrypcję genu CYP27B1 w odpowiedzi na hipokalcemię.'],
        ['Hiperkalcemia i wysoki poziom FGF23', 'FGF23 i nadmiar wapnia silnie hamują ekspresję CYP27B1, chroniąc przed zatruciem.'],
        ['Wypicie 5 litrów czystej wody', 'Podaż wody nie jest specyficznym hormonalnym regulatorem 1α-hydroksylazy.']
      ),
    ],
  },
];
