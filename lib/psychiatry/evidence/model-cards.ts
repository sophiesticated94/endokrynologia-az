import type { ModelCard } from './evidence-types.ts';

export const MODEL_CARDS: Record<string, ModelCard> = {
  'lithium-pk-sensitivity': {
    modelId: 'lithium-pk-sensitivity',
    name: 'Jakościowy model wrażliwości farmakokinetycznej litu',
    assumptions: [
      'Lit jest wydalany w 95% przez nerki z filtracją kłębuszkową i reabsorpcją w kanalikach proksymalnych (~80%).',
      'Odwodnienie i spadek stężenia sodu zwiększają reabsorpcję proksymalną litu.',
      'Tiazydy, NLPZ i inhibitory ACE/ARB obniżają klirens nerkowy litu.',
    ],
    validationRange: 'Zastosowanie wyłącznie edukacyjne — ilustracja kierunku zmian ekspozycji',
    limitations: [
      'Model NIE estymuje dokładnego stężenia osoczowego konkretnego pacjenta.',
      'Rzeczywisty klirens zależy od indywidualnej reabsorpcji cewkowej i hydratacji.',
    ],
    knownFailureModes: [
      'Stosowanie jako zastępstwo laboratoryjnego badania TDM grozi błędem dawkowania.',
    ],
    isPatientPredictor: false,
  },
};
