export interface EndocrineWidgetPreset {
  id: string;
  widgetType:
    | 'axis-map'
    | 'lab-workbench'
    | 'timeline'
    | 'pathway-builder'
    | 'adrenal-workbench'
    | 'parathyroid-workbench'
    | string;
  schemaVersion: number;
  moduleId: string;
  lessonId?: string;
  title: string;
  initialState: Record<string, unknown>;
  sourceIds?: string[];
  claimIds?: string[];
  evidenceIds?: string[];
}

export const ENDOCRINE_PRESETS: Record<string, EndocrineWidgetPreset> = {
  'tarczyca-axis-hpt': {
    id: 'tarczyca-axis-hpt',
    widgetType: 'axis-map',
    schemaVersion: 1,
    moduleId: 'tarczyca',
    lessonId: 'fizjologia',
    title: 'Oś podwzgórze-przysadka-tarczyca (HPT)',
    initialState: {
      trh: 'normal',
      tsh: 'normal',
      ft4: 'normal',
      ft3: 'normal',
      feedbackStatus: 'intact',
    },
    evidenceIds: ['physiology'],
  },
  'tarczyca-lab-workbench': {
    id: 'tarczyca-lab-workbench',
    widgetType: 'lab-workbench',
    schemaVersion: 1,
    moduleId: 'tarczyca',
    lessonId: 'diagnostyka',
    title: 'Interpretator panelu hormonalnego tarczycy',
    initialState: {
      tsh: 1.8,
      ft4: 16.2,
      ft3: 4.8,
      antiTpo: 15,
      trab: 0.4,
      referenceProfile: 'standard-adult',
    },
    evidenceIds: ['central', 'subclinical', 'lt4'],
  },
  'tarczyca-lt4-timeline': {
    id: 'tarczyca-lt4-timeline',
    widgetType: 'timeline',
    schemaVersion: 1,
    moduleId: 'tarczyca',
    lessonId: 'niedoczynnosc',
    title: 'Oś czasu i kinetyka lewotyroksyny (t1/2 = 7 dni)',
    initialState: {
      dose: 75,
      halflifeDays: 7,
      weeksToSteadyState: 6,
      currentWeek: 0,
      ft4Projected: 10,
    },
    evidenceIds: ['lt4', 'spina'],
  },
  'tarczyca-pathway-builder': {
    id: 'tarczyca-pathway-builder',
    widgetType: 'pathway-builder',
    schemaVersion: 1,
    moduleId: 'tarczyca',
    lessonId: 'diagnostyka',
    title: 'Algorytm postępowania przy niespójności laboratoryjnej',
    initialState: {
      steps: [
        'Wywiad lekowy (biotyna, heparyna, amiodaron)',
        'Wykluczenie interferencji przeciwciał heterofilnych',
        'Powtórzenie badania inną metodą analityczną',
        'Ocena osi nadnerczowej i przysadki',
      ],
      currentStep: 0,
    },
    evidenceIds: ['central', 'nodules'],
  },
  'adrenal-pa-arr-interference': {
    id: 'adrenal-pa-arr-interference',
    widgetType: 'adrenal-workbench',
    schemaVersion: 1,
    moduleId: 'nadnercza',
    lessonId: 'zespol-conna',
    title: 'Ocena wskaźnika ARR i interferencji lekowych (ES 2025)',
    initialState: {
      focusSection: 'primary_aldosteronism',
      visibleControls: ['aldosterone', 'renin', 'potassium', 'medications'],
      initialPA: {
        aldosteroneNgDl: 24,
        reninValue: 0.4,
        potassiumMmolL: 3.4,
        medications: ['acei_arb'],
        spontaneousHypokalemia: true,
      },
    },
    sourceIds: ['endo_pa'],
    claimIds: ['claim-adn-pa-screening-2025', 'claim-adn-pa-confirmatory-exemption'],
    evidenceIds: ['endo_pa'],
  },
  'adrenal-hpa-synacthen': {
    id: 'adrenal-hpa-synacthen',
    widgetType: 'adrenal-workbench',
    schemaVersion: 1,
    moduleId: 'nadnercza',
    lessonId: 'addison-choroba',
    title: 'Test stymulacji Synacthenem i pułapka wczesnej wtórnej AI',
    initialState: {
      focusSection: 'hpa_cortisol',
      initialCortisol: {
        morningCortisolUgDl: 6.2,
        synacthenPeakUgDl: 15.0,
        recentPituitaryEventWeeks: 2,
      },
    },
    sourceIds: ['endo_pai'],
    claimIds: ['claim-adn-synacthen-acute-secondary-caveat'],
    evidenceIds: ['endo_pai'],
  },
  'adrenal-pheo-safety': {
    id: 'adrenal-pheo-safety',
    widgetType: 'adrenal-workbench',
    schemaVersion: 1,
    moduleId: 'nadnercza',
    lessonId: 'pheochromocytoma',
    title: 'Protokół bezpieczeństwa PPGL: alfa-blokada przed beta-blokerem',
    initialState: {
      focusSection: 'pheochromocytoma',
      initialPheo: {
        normetanephrineFraction: 4.5,
        betaBlockerInitiated: true,
        alphaBlockerInitiated: false,
      },
    },
    sourceIds: ['endo_pheo'],
    claimIds: ['claim-adn-pheo-alpha-blockade-first'],
    evidenceIds: ['endo_pheo'],
  },
  'adrenal-incidentaloma-macs': {
    id: 'adrenal-incidentaloma-macs',
    widgetType: 'adrenal-workbench',
    schemaVersion: 1,
    moduleId: 'nadnercza',
    lessonId: 'incydentaloma-nadnercza',
    title: 'Fenotypowanie obrazowe i hormonalne incydentaloma (ESE/ENSAT 2023)',
    initialState: {
      focusSection: 'incidentaloma',
      initialIncidentaloma: {
        sizeMm: 26,
        nativeDensityHu: 6,
        postDstCortisolUgDl: 2.2,
      },
    },
    sourceIds: ['ese_incidentaloma', 'pte_macs'],
    claimIds: ['claim-adn-incidentaloma-hu-cutoff', 'claim-adn-macs-dst-tiers'],
    evidenceIds: ['ese_incidentaloma', 'pte_macs'],
  },
  'parathyroid-phpt-fhh-cccr': {
    id: 'parathyroid-phpt-fhh-cccr',
    widgetType: 'parathyroid-workbench',
    schemaVersion: 1,
    moduleId: 'przytarczyce',
    lessonId: 'fhh-hiperkalcemia',
    title: 'Kalkulator CCCR, strefa nakładania i czynniki zakłócające',
    initialState: {
      focusSection: 'hypercalcemia_cccr',
      initialCCCR: {
        serumCalciumMmolL: 2.75,
        serumCreatinineUmolL: 75,
        urineCalcium24hMmolL: 2.1,
        urineCreatinine24hMmolL: 9.8,
        vitaminD25OhNgMl: 14,
      },
    },
    sourceIds: ['fhh_consensus', 'ese_phpt'],
    claimIds: ['claim-pt-cccr-overlap-zone', 'claim-pt-vitd-confounder-cccr'],
    evidenceIds: ['fhh_consensus', 'ese_phpt'],
  },
  'parathyroid-hypopara-management': {
    id: 'parathyroid-hypopara-management',
    widgetType: 'parathyroid-workbench',
    schemaVersion: 1,
    moduleId: 'przytarczyce',
    lessonId: 'tezyczka-objawy',
    title: 'Leczenie przewlekłej niedoczynności przytarczyc (ESE 2025)',
    initialState: {
      focusSection: 'hypoparathyroidism',
      initialHypopara: {
        serumCalciumMmolL: 2.05,
        serumPhosphateMmolL: 1.6,
        calcitriolMicrogDay: 0.5,
        calciumElementalMgDay: 1000,
      },
    },
    sourceIds: ['ese_hypopara'],
    claimIds: ['claim-pt-hypopara-target-ca-2025', 'claim-pt-hypopara-calcitriol-firstline'],
    evidenceIds: ['ese_hypopara'],
  },
  'parathyroid-hungry-bone': {
    id: 'parathyroid-hungry-bone',
    widgetType: 'parathyroid-workbench',
    schemaVersion: 1,
    moduleId: 'przytarczyce',
    lessonId: 'zespol-glodnych-kosci',
    title: 'Ocena ryzyka zespołu głodnych kości po paratyreoidotomii',
    initialState: {
      focusSection: 'hungry_bone',
      initialHungryBone: {
        preopCalciumMmolL: 3.2,
        preopPthPgMl: 540,
        preopAlpUL: 320,
        ageYears: 62,
      },
    },
    sourceIds: ['hungry_bone', 'ese_phpt'],
    claimIds: ['claim-pt-hungry-bone-alp-predictor'],
    evidenceIds: ['hungry_bone', 'ese_phpt'],
  },
};
