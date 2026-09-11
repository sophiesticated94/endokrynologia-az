export type SimulatorState = {
  thyroidCapacity: number; // 0 - 200%
  trabStimulation: number; // 0 - 10
  pituitaryFunction: number; // 0 - 100%
  exogenousLT4: number; // 0 - 250 mcg
  thiamazoleDose: number; // 0 - 40 mg
};

export const defaultState: SimulatorState = {
  thyroidCapacity: 100,
  trabStimulation: 0,
  pituitaryFunction: 100,
  exogenousLT4: 0,
  thiamazoleDose: 0,
};

export type Preset = {
  id: string;
  name: string;
  tag: string;
  description: string;
  state: SimulatorState;
};

export const presets: Preset[] = [
  {
    id: 'euthyroid',
    name: 'Prawidłowa eutyreoza',
    tag: 'Zdrowy układ',
    description: 'Wzorcowy stan równowagi osi HPT. Prawidłowe ujemne sprzężenie zwrotne.',
    state: { ...defaultState },
  },
  {
    id: 'hashimoto_unmanaged',
    name: 'Nieleczone Hashimoto',
    tag: 'Pierwotna niedoczynność',
    description: 'Autoimmunizacyjne zniszczenie pęcherzyków tarczycy. Kompensacyjny gwałtowny wyrzut TSH.',
    state: {
      thyroidCapacity: 20,
      trabStimulation: 0,
      pituitaryFunction: 100,
      exogenousLT4: 0,
      thiamazoleDose: 0,
    },
  },
  {
    id: 'hashimoto_managed',
    name: 'Hashimoto wyrównane LT4',
    tag: 'Prawidłowa substytucja',
    description: 'Substytucja lewotyroksyną (100 µg/d) przywraca eutyreozę i normalizuje TSH.',
    state: {
      thyroidCapacity: 20,
      trabStimulation: 0,
      pituitaryFunction: 100,
      exogenousLT4: 100,
      thiamazoleDose: 0,
    },
  },
  {
    id: 'graves',
    name: 'Choroba Gravesa-Basedowa',
    tag: 'Jawna tyreotoksykoza',
    description: 'Autoprzeciwciała TRAb stymulują receptor TSH. Masywny wzrost FT4 i supresja TSH do zera.',
    state: {
      thyroidCapacity: 160,
      trabStimulation: 8,
      pituitaryFunction: 100,
      exogenousLT4: 0,
      thiamazoleDose: 0,
    },
  },
  {
    id: 'central_hypo',
    name: 'Niedoczynność przysadkowa',
    tag: 'Niedoczynność wtórna',
    description: 'Uszkodzenie przedniego płata przysadki. Niskie FT4 bez adekwatnego wzrostu TSH.',
    state: {
      thyroidCapacity: 90,
      trabStimulation: 0,
      pituitaryFunction: 15,
      exogenousLT4: 0,
      thiamazoleDose: 0,
    },
  },
  {
    id: 'overdose_lt4',
    name: 'Przedawkowanie lewotyroksyny',
    tag: 'Jatrogenna nadczynność',
    description: 'Za wysoka dawka substytucyjna LT4 (225 µg). Wzrost FT4 tłumi endogenne TSH do zera.',
    state: {
      thyroidCapacity: 80,
      trabStimulation: 0,
      pituitaryFunction: 100,
      exogenousLT4: 225,
      thiamazoleDose: 0,
    },
  },
];

export function calculateHormones(s: SimulatorState) {
  // Blokada TPO przez tiamazol: 10mg = ~35%, 40mg = ~85%
  const drugBlock = Math.min(0.9, s.thiamazoleDose * 0.022);
  const effectiveCapacity = (s.thyroidCapacity / 100) * (1 - drugBlock);

  // Stymulacja receptora = TSH sygnał + TRAb
  // W pętli sprzężenia: stężenie TSH zależy od wolnego FT4 i sprawności przysadki
  // Rozwiązujemy ujemne sprzężenie zwrotne log-liniowo z tłumieniem oscylacji
  let ft4 = 16.0;
  let tsh = 1.8;

  for (let i = 0; i < 20; i++) {
    const pitCapacity = s.pituitaryFunction / 100;
    // Log-liniowa zależność TSH od FT4 (charakterystyczna dla osi HPT)
    const logTsh = Math.log10(1.8) - 0.13 * (ft4 - 16.0);
    const targetTsh = Math.max(0.01, Math.min(80.0, Math.pow(10, logTsh) * pitCapacity));
    tsh = tsh * 0.3 + targetTsh * 0.7;

    // Odpowiedź tarczycy z saturacją (zniszczona tarczyca nie może dać nieograniczonego rzutu)
    const tshResponse = Math.min(2.2, Math.max(0.05, Math.pow(Math.max(0.01, tsh) / 1.8, 0.4)));
    const trabResponse = s.trabStimulation * 0.25;
    const stimFactor = tshResponse + trabResponse;
    const endogenousFt4 = 16.0 * effectiveCapacity * stimFactor;
    const exogenousFt4 = (s.exogenousLT4 / 100) * 11.5;

    const targetFt4 = Math.max(2.0, Math.min(48.0, endogenousFt4 + exogenousFt4));
    ft4 = ft4 * 0.3 + targetFt4 * 0.7;
  }

  const ft3 = Math.max(1.0, Math.min(14.0, 4.5 * (ft4 / 16.0) + (s.trabStimulation > 4 ? 1.5 : 0)));

  // Klasyfikacja stanu klinicznego
  let status = 'Eutyreoza (stan prawidłowy)';
  let alertType: 'normal' | 'warning' | 'danger' = 'normal';
  let comment = 'Oś hormonalna znajduje się w fizjologicznej równowadze. Stężenia TSH i wolnych hormonów są stabilne.';

  if (s.pituitaryFunction < 40 && ft4 < 12.0) {
    status = 'Wtórna (przysadkowa) niedoczynność tarczycy';
    alertType = 'danger';
    comment = 'Uwaga na pułapkę diagnostyczną: TSH jest „nieadekwatnie prawidłowe” lub niskie mimo jawnie obniżonego FT4! Konieczna ocena rezerwy kory nadnerczy przed włączeniem LT4.';
  } else if (tsh > 4.0 && ft4 < 12.0) {
    status = 'Jawna pierwotna niedoczynność tarczycy';
    alertType = 'danger';
    comment = 'Tarczyca nie syntetyzuje wystarczającej ilości hormonów. Przysadka kompensacyjnie wyrzuca wysokie stężenia TSH.';
  } else if (tsh > 4.0 && ft4 >= 12.0 && ft4 <= 22.0) {
    status = 'Subkliniczna niedoczynność tarczycy';
    alertType = 'warning';
    comment = 'TSH podwyższone przy prawidłowym obwodowym FT4. Wymaga potwierdzenia po 2–3 miesiącach przed ewentualną decyzją o leczeniu.';
  } else if (tsh < 0.4 && ft4 > 22.0) {
    if (s.exogenousLT4 > 150) {
      status = 'Jatrogenna (polekowa) tyreotoksykoza';
      alertType = 'danger';
      comment = 'Zbyt duża dawka lewotyroksyny doprowadziła do zablokowania TSH i nadmiaru hormonów obwodowych. Wskazana redukcja dawki.';
    } else {
      status = 'Jawna nadczynność tarczycy / Tyreotoksykoza';
      alertType = 'danger';
      comment = 'Niekontrolowany nadmiar FT4 wywołuje całkowitą supresję przysadkowego TSH. Ryzyko migotania przedsionków i osteopenii.';
    }
  } else if (tsh < 0.4 && ft4 >= 12.0 && ft4 <= 22.0) {
    status = 'Subkliniczna nadczynność tarczycy';
    alertType = 'warning';
    comment = 'TSH poniżej normy, ale obwodowe hormony mieszczą się jeszcze w przedziale referencyjnym.';
  }

  return {
    tsh: Math.round(tsh * 100) / 100,
    ft4: Math.round(ft4 * 10) / 10,
    ft3: Math.round(ft3 * 10) / 10,
    status,
    alertType,
    comment,
  };
}

export type LegendParameter = {
  id: keyof SimulatorState;
  title: string;
  badge: string;
  badgeType?: 'default' | 'warning' | 'danger' | 'info';
  description: string;
};

export type LegendHormone = {
  id: 'tsh' | 'ft4' | 'ft3';
  name: string;
  badge: string;
  normalRange: string;
  description: string;
  bullets?: string[];
};

export type CurriculumStep = {
  lessonNumber: number;
  lessonId: string;
  title: string;
  focus: string;
  tag: string;
  isCurrent?: boolean;
};

export const simulatorLegend: {
  parameters: LegendParameter[];
  hormones: LegendHormone[];
  curriculum: CurriculumStep[];
} = {
  parameters: [
    {
      id: 'thyroidCapacity',
      title: 'Rezerwa wydzielnicza tarczycy (0–200%)',
      badge: 'Gruczoł obwodowy',
      badgeType: 'default',
      description:
        'Zdolność pęcherzyków tarczycy do produkcji hormonów. Wartość 100% to prawidłowy, zdrowy miąższ. Spadek poniżej 40% odpowiada niszczeniu tarczycy w przebiegu przewlekłego zapalenia Hashimoto, po operacji wycięcia lub leczeniu radiojodem (131-I). Wartości powyżej 100% symulują wole guzkowe lub przerost gruczołu.',
    },
    {
      id: 'pituitaryFunction',
      title: 'Czynność tyreotropowa przysadki (0–100%)',
      badge: 'Nadrzędny regulator',
      badgeType: 'default',
      description:
        'Sprawność przedniego płata przysadki w syntezie TSH. W warunkach fizjologicznych (100%) spadek stężenia hormonów tarczycy wywołuje natychmiastowy, wykładniczy wyrzut TSH. Spadek sprawności (np. poniżej 30%) odzwierciedla rzadką wtórną (przysadkową) niedoczynność tarczycy (np. po operacji gruczolaka przysadki), gdzie TSH jest nieadekwatnie prawidłowe lub niskie mimo jawnie obniżonego FT4!',
    },
    {
      id: 'trabStimulation',
      title: 'Stymulacja przeciwciałami TRAb (0–10)',
      badge: 'Autoimmunizacja (Graves-Basedow)',
      badgeType: 'warning',
      description:
        'Przeciwciała przeciwko receptorowi TSH (TRAb) to patologiczne autoprzeciwciała, które działają jak „zacięty włącznik” w ścianie komórek tarczycy. Wiążą się z receptorem TSH i wymuszają ciągłą, niekontrolowaną produkcję FT4 i FT3 całkowicie poza kontrolą przysadki. Prowadzi to do jawnej tyreotoksykozy i całkowitego stłumienia TSH do zera (<0,01 mIU/l).',
    },
    {
      id: 'exogenousLT4',
      title: 'Egzogenna lewotyroksyna — LT4 (0–250 µg/d)',
      badge: 'Substytucja w niedoczynności',
      badgeType: 'info',
      description:
        'Doustny syntetyczny analog tyroksyny stosowany w leczeniu niedoczynności tarczycy. Podanie leku uzupełnia pulę obwodową (wzrost FT4), która docierając do przysadki, hamuje nadmierne wydzielanie TSH i przywraca stan eutyreozy. Zbyt duża dawka (>150–200 µg/d) wywołuje polekowe przedawkowanie (jatrogenną nadczynność).',
    },
    {
      id: 'thiamazoleDose',
      title: 'Hamowanie syntezy: tiamazol (0–40 mg/d)',
      badge: 'Tyreostatyk w nadczynności',
      badgeType: 'danger',
      description:
        'Główny lek przeciwtarczycowy. Blokuje kluczowy enzym tarczycowy — tyreoperoksydazę (TPO). W efekcie zatrzymuje wbudowywanie jodu do tyreoglobuliny i uniemożliwia produkcję nowych cząsteczek T4 i T3. Stosowany w leczeniu choroby Gravesa-Basedowa i wola toksycznego.',
    },
  ],
  hormones: [
    {
      id: 'tsh',
      name: 'TSH (Tyreotropina)',
      badge: 'Hormon przysadkowy',
      normalRange: '0,4–4,0 mIU/l',
      description:
        'Najczulszy pojedynczy wskaźnik wydolności pierwotnej czynności tarczycy. Działa na zasadzie ujemnego sprzężenia zwrotnego:',
      bullets: [
        'Gdy tarczyca zwalnia (spadek FT4): Przysadka natychmiast wyrzuca wysokie stężenia TSH (>4,0–50 mIU/l), aby pobudzić gruczoł.',
        'Gdy hormonów tarczycy jest za dużo (wysokie FT4): Przysadka zostaje całkowicie zablokowana (TSH spada <0,1 mIU/l).',
      ],
    },
    {
      id: 'ft4',
      name: 'FT4 (Wolna tyroksyna)',
      badge: 'Hormon tarczycowy (frakcja wolna)',
      normalRange: '12,0–22,0 pmol/l (0,8–1,8 ng/dl)',
      description:
        'Główny hormon wytwarzany i uwalniany przez tarczycę. Frakcja wolna stanowi ok. 0,02% całkowitej puli i jako jedyna ma aktywność biologiczną oraz przenika do wnętrza komórek. W odróżnieniu od całkowitego T4, jej stężenie nie zależy od stężenia białek nośnikowych (TBG).',
    },
    {
      id: 'ft3',
      name: 'FT3 (Wolna trójjodotyronina)',
      badge: 'Aktywny metabolit tkankowy',
      normalRange: '3,1–6,8 pmol/l',
      description:
        'Biologicznie najaktywniejszy hormon tarczycy o 4-krotnie wyższym powinowactwie do receptorów jądrowych niż T4. Aż w 80% powstaje poza tarczycą (w wątrobie, nerkach i mięśniach) poprzez odszczepienie atomu jodu przez enzymy dejodynazy.',
    },
  ],
  curriculum: [
    {
      lessonNumber: 1,
      lessonId: 'fizjologia',
      title: 'Lekcja 1: Jak działa tarczyca? (Fizjologia)',
      focus:
        'Poznajesz zdrową oś podwzgórze–przysadka–tarczyca, neurohormon TRH, przysadkowe TSH, produkcję tyroksyny i mechanizm ujemnego sprzężenia zwrotnego.',
      tag: 'Podstawa fizjologiczna symulatora',
    },
    {
      lessonNumber: 2,
      lessonId: 'diagnostyka',
      title: 'Lekcja 2: Czytaj wyniki ze zrozumieniem (Diagnostyka)',
      focus:
        'Tu właśnie osadzony jest pełny symulator! Uczysz się łączyć TSH i FT4 w pary, odróżniać postać jawną od subklinicznej i rozpoznawać pułapkę niedoczynności przysadkowej.',
      tag: 'Miejsce nauki i ćwiczeń w symulatorze',
      isCurrent: true,
    },
    {
      lessonNumber: 3,
      lessonId: 'niedoczynnosc',
      title: 'Lekcja 3: Kiedy tarczyca zwalnia (Niedoczynność i leki)',
      focus:
        'Odkrywasz, jak działa lewotyroksyna (LT4), jak dobrać dawkę substytucyjną, jak unikać interakcji z żelazem/wapniem i dlaczego TSH kontroluje się dopiero po 6–8 tygodniach.',
      tag: 'Wyjaśnia suwak: Egzogenna lewotyroksyna (LT4)',
    },
    {
      lessonNumber: 6,
      lessonId: 'graves',
      title: 'Lekcja 6: Graves-Basedow i oczy (Autoimmunizacja i tyreostatyki)',
      focus:
        'Szczegółowo poznajesz autoprzeciwciała TRAb, objawy orbitopatii oraz leczenie farmakologiczne tiamazolem wraz z zasadami bezpieczeństwa (ryzyko agranulocytozy).',
      tag: 'Wyjaśnia suwaki: Przeciwciała TRAb oraz Tiamazol',
    },
  ],
};

