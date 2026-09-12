import type { PsychiatryWorkbenchPreset } from '../types.ts';

export const SAFETY_PRESETS: Record<string, PsychiatryWorkbenchPreset> = {
  'lithium-tdm-measured-001': {
    id: 'lithium-tdm-measured-001',
    title: 'Interpretacja TDM litu: Pacjent z odwodnieniem i NLPZ',
    tab: 'safety',
    patientSummary: '58-letnia pacjentka na licie (750 mg/d) z nowym stężeniem 1,45 mmol/l po ketoprofenie.',
    data: {
      lessonId: 'normotymiki-lit-walproinian-lamotrygina',
      measuredLevel: 1.45,
      hoursSinceDose: 12,
      eGfr: 62,
      interactingDrugs: ['nsaid'],
      symptoms: ['fine_tremor', 'nausea'],
      alert: 'Wczesna neurotoksyczność litu indukowana spadkiem filtracji przez NLPZ',
    },
  },
  'serotonin-hunter-001': {
    id: 'serotonin-hunter-001',
    title: 'Kryteria Huntera: Spontaniczny klonus po tramadolu',
    tab: 'safety',
    patientSummary: '34-letnia pacjentka na paroksetynie po jednorazowym przyjęciu tramadolu i dekstrometorfanu.',
    data: {
      lessonId: 'ostre-stany-toksyczne-zespol-serotoninowy',
      spontaneousClonus: true,
      diaphoresis: true,
      hyperthermia: 38.6,
      hunterMet: true,
      conditionMet: 'Spontaniczny klonus + gorączka (stan zagrożenia życia)',
    },
  },
  'nms-differential-001': {
    id: 'nms-differential-001',
    title: 'Różnicowanie stanów nagłych: NMS vs Zespół serotoninowy',
    tab: 'safety',
    patientSummary: '42-letni mężczyzna po haloperidolu ze sztywnością „ołowianej rury” i CK 18 000 IU/l.',
    data: {
      lessonId: 'zlosliwy-zespol-neuroleptyczny-nms',
      rigidity: 'lead_pipe',
      hyporeflexia: true,
      clonus: false,
      ckLevel: 18000,
      leukocytosis: 16500,
      diagnosis: 'Złośliwy zespół neuroleptyczny (NMS)',
    },
  },
  'qtc-crediblemeds-001': {
    id: 'qtc-crediblemeds-001',
    title: 'Wydłużenie QTc w politerapii psychotropowej',
    tab: 'safety',
    patientSummary: '68-letni pacjent na escitalopramie (20 mg) i amiodaronie z hipokaliemią (K+ 3.2 mmol/l).',
    data: {
      lessonId: 'bezpieczenstwo-kardiometaboliczne-qtc-prolaktyna',
      rawQt: 490,
      hr: 60,
      qtcF: 490,
      potassium: 3.2,
      riskCategory: 'prolonged_borderline_critical',
    },
  },
};
