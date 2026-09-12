export interface EndocrineWidgetPreset {
  id: string;
  widgetType: 'axis-map' | 'lab-workbench' | 'timeline' | 'pathway-builder';
  schemaVersion: number;
  moduleId: string;
  lessonId?: string;
  title: string;
  initialState: Record<string, unknown>;
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
};
