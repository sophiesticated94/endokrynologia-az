export interface PsychiatryGlossaryEntry {
  term: string;
  slug: string;
  category: 'badania' | 'anatomia' | 'leki' | 'jednostki' | 'mechanizmy';
  short: string;
  full: string;
  sources?: string[];
}

export const psychiatryGlossary: PsychiatryGlossaryEntry[] = [
  {
    term: 'ICD-11 CDDR',
    slug: 'icd11-cddr',
    category: 'badania',
    short: 'Clinical Descriptions and Diagnostic Requirements wg WHO',
    full: 'Międzynarodowy standard klasyfikacyjny WHO dla zaburzeń psychicznych (2024), kładący nacisk na wymiarowość objawów i kryteria elastyczności klinicznej.',
    sources: ['icd11-cddr'],
  },
  {
    term: 'DSM-5-TR',
    slug: 'dsm5tr',
    category: 'badania',
    short: 'Kryteria diagnostyczne Amerykańskiego Towarzystwa Psychiatrycznego',
    full: 'Zrewidowane w 2022 roku kryteria diagnostyczne APA, stanowiące globalny punkt odniesienia w badaniach klinicznych i farmakoterapii.',
    sources: ['dsm5tr'],
  },
  {
    term: 'SERT',
    slug: 'sert',
    category: 'mechanizmy',
    short: 'Transporter serotoniny (SLC6A4)',
    full: 'Białko błonowe odpowiedzialne za wychwyt zwrotny 5-HT ze szczeliny synaptycznej do neuronu presynaptycznego. Główny punkt uchwytu SSRI i SNRI.',
    sources: ['pet-sert-meyer'],
  },
  {
    term: 'Receptor D2',
    slug: 'd2',
    category: 'mechanizmy',
    short: 'Receptor dopaminowy typu 2 (Gi/o)',
    full: 'Kluczowy receptor szlaku mezolimbicznego i nigrostriatalnego. W badaniach PET blokada 65–80% D2 zapewnia działanie przeciwpsychotyczne, a >80% wywołuje objawy pozapiramidowe.',
    sources: ['pet-d2-kapur'],
  },
  {
    term: 'BDNF',
    slug: 'bdnf',
    category: 'mechanizmy',
    short: 'Brain-Derived Neurotrophic Factor',
    full: 'Neurotrofina stymulująca przeżycie neuronów, synaptogenezę i neurogenezę w hipokampie. Jej ekspresja wzrasta pod wpływem skutecznego leczenia przeciwdepresyjnego.',
    sources: ['stahl-essential'],
  },
  {
    term: 'TrkB',
    slug: 'trkb',
    category: 'mechanizmy',
    short: 'Receptor kinazy tyrozynowej B dla BDNF',
    full: 'Receptor o aktywności kinazy tyrozynowej wiążący BDNF; uruchamia kaskady sygnałowe MAPK/ERK, PI3K/Akt/mTORC1 oraz PLC-gamma, warunkując plastyczność synaptyczną.',
    sources: ['stahl-essential'],
  },
  {
    term: 'Kryteria Huntera',
    slug: 'hunter',
    category: 'badania',
    short: 'Zwalidowany algorytm diagnostyki zespołu serotoninowego',
    full: 'Reguła decyzyjna oparta na obecności klonusu (spontanicznego, indukowanego lub ocznemu) z pobudzeniem, obfitymi potami lub hipertermią u pacjenta po leku serotoninergicznym.',
    sources: ['hunter-criteria'],
  },
  {
    term: 'NMS',
    slug: 'nms',
    category: 'jednostki',
    short: 'Złośliwy Zespół Neuroleptyczny (Neuroleptic Malignant Syndrome)',
    full: 'Zagrażające życiu powikłanie po lekach blokujących D2: hipertermia, sztywność mięśni typu rury ołowianej, niestabilność wegetatywna i masywny wzrost kinazy kreatynowej (CK > 1000 IU/l).',
    sources: ['nms-consensus'],
  },
  {
    term: 'Akatyzja',
    slug: 'akatyzja',
    category: 'jednostki',
    short: 'Subiektywne uczucie przymusu poruszania się',
    full: 'Uciążliwe powikłanie pozapiramidowe blokady dopaminergicznej w prążkowiu, objawiające się niemożnością usiedzenia w miejscu; bywa mylone z lękiem. Leczone propranololem.',
    sources: ['maudsley15'],
  },
  {
    term: 'Węglan litu',
    slug: 'lit',
    category: 'leki',
    short: 'Lek pierwszego rzutu w stabilizacji nastroju w ChAD',
    full: 'Lek o udowodnionym specyficznym działaniu antysuicydalnym. Hamuje enzymy GSK-3beta i IMPazę; wymaga TDM (stężenie w profilaktyce 0,6–0,8 mmol/l).',
    sources: ['agnp-tdm-2026', 'maudsley15'],
  },
  {
    term: 'Kwas walproinowy (VPA)',
    slug: 'vpa',
    category: 'leki',
    short: 'Stabilizator nastroju o działaniu gabaergicznym',
    full: 'Skuteczny w manii i stanach mieszanych; wysoce teratogenny (wady cewy nerwowej, autyzm), przeciwwskazany u kobiet w wieku rozrodczym bez rygorystycznego programu zapobiegania ciąży.',
    sources: ['maudsley15', 'canmat-isbd-bipolar'],
  },
  {
    term: 'Lamotrygina',
    slug: 'lamotrygina',
    category: 'leki',
    short: 'Stabilizator profilaktyki depresji w ChAD',
    full: 'Blokuje kanały sodowe i uwalnianie glutaminianu. Zapobiega nawrotom faz depresyjnych w ChAD; wymaga bardzo powolnego miareczkowania ze względu na ryzyko zespołu Stevensa-Johnsona.',
    sources: ['canmat-isbd-bipolar'],
  },
  {
    term: 'TDM AGNP',
    slug: 'tdm',
    category: 'badania',
    short: 'Therapeutic Drug Monitoring w psychiatrii',
    full: 'Standaryzowane oznaczanie stężeń leków psychotropowych na czczo w stanie stacjonarnym (trough) wg wytycznych grupy roboczej AGNP 2026.',
    sources: ['agnp-tdm-2026'],
  },
  {
    term: 'CYP2D6',
    slug: 'cyp2d6',
    category: 'mechanizmy',
    short: 'Izoenzym cytochromu P450 metabolizujący psychotropy',
    full: 'Izoenzym odpowiedzialny za metabolizm m.in. rysperydonu, aripiprazolu i wenlafaksyny. Silnie hamowany przez fluoksetynę i paroksetynę.',
    sources: ['cpic-cyp2d6-2c19'],
  },
  {
    term: 'C-SSRS',
    slug: 'c-ssrs',
    category: 'badania',
    short: 'Columbia-Suicide Severity Rating Scale',
    full: 'Walidowana skala oceny ciężkości myśli i zachowań samobójczych, stopniująca nasilenie od pasywnych myśli o śmierci (poziom 1) po plan z intencją realizacji (poziom 5).',
    sources: ['cssrs-scale'],
  },
  {
    term: 'QTc',
    slug: 'qtc',
    category: 'badania',
    short: 'Skorygowany odstęp QT w EKG',
    full: 'Czas repolaryzacji komór serca skorygowany względem częstości rytmu. Wartości > 500 ms grożą złośliwym częstoskurczem komorowym Torsades de Pointes (TdP).',
    sources: ['crediblemeds-qt'],
  },
];

export const psychiatryGlossaryMap = new Map(psychiatryGlossary.map(g => [g.slug, g]));
