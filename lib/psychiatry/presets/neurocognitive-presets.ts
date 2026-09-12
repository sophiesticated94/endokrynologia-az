import type { PsychiatryWorkbenchPreset } from '../types.ts';

export const NEUROCOGNITIVE_PRESETS: Record<string, PsychiatryWorkbenchPreset> = {
  'preset-delirium-jan-postop': {
    id: 'preset-delirium-jan-postop',
    title: 'Hipoaktywne delirium pooperacyjne: Jan B. (82 l.)',
    tab: 'neuro-geriatric',
    patientSummary: 'Jan B. (82 l.), 2. doba po alloplastyce biodra; senny w dzień, w nocy dezorientacja i wyrywanie wenflonu. Podejrzenie depresji obalone przez fluktuację i inattention.',
    data: {
      lessonId: 'delirium-rozpoznanie-i-dynamika',
      subtool: 'delirium-detective',
      patientId: 'thread-jan-delirium',
      alertness: 4,
      amt4: 2,
      attention: 2,
      acuteChange: 4,
      score4AT: 12,
      activeTriggers: ['ból pooperacyjny (NRS 6/10)', 'zatrzymanie moczu (550 ml w USG)', 'tramadol włączony wczoraj'],
      vitalSigns: { hr: 88, bp: '135/80', spo2: 96, temp: 37.1 },
    },
  },

  'preset-delirium-superimposed-jan': {
    id: 'preset-delirium-superimposed-jan',
    title: 'Ocena po wygaszeniu delirium: Jan B. (82 l.)',
    tab: 'neuro-geriatric',
    patientSummary: 'Jan B. 3 miesiące po ustąpieniu delirium. Uwaga stabilna, brak fluktuacji, lecz utrzymują się ubytki pamięci krótkotrwałej i trudności w IADL (delirium nałożone na wczesne otępienie).',
    data: {
      lessonId: 'delirium-vs-otepienie-vs-depresja',
      subtool: 'differential',
      patientId: 'thread-jan-delirium',
      alertness: 0,
      amt4: 1,
      attention: 0,
      acuteChange: 0,
      score4AT: 1,
      functionalImpairment: 'IADL upośledzone (zarządzanie lekami, finanse)',
      differentialVerdict: 'Delirium ustąpiło; ujawnienie zespołu otępiennego w stadium łagodnym',
    },
  },

  'preset-helena-mci-early-ad': {
    id: 'preset-helena-mci-early-ad',
    title: 'Amnestyczne MCI vs wczesne AD: Helena S. (79 l.)',
    tab: 'neuro-geriatric',
    patientSummary: 'Helena S. (79 l.) zgłasza pogorszenie pamięci od 18 miesięcy. Podstawowe ADL zachowane, samodzielna w domu, trudności w rozliczaniu rachunków (granica MCI / dementia).',
    data: {
      lessonId: 'zaburzenia-poznawcze-mci-a-otepienie',
      subtool: 'trajectory',
      patientId: 'thread-helena-neurocog',
      onset: 'insidious_18_months',
      dominantDomain: 'episodic_memory',
      adlPreserved: true,
      iadlImpaired: true,
      mriFindings: 'MTA 2/4 obustronnie, bez świeżych ognisk naczyniowych',
    },
  },

  'preset-helena-bpsd-uti': {
    id: 'preset-helena-bpsd-uti',
    title: 'Ostre BPSD z poszukiwaniem przyczyny: Helena S. (80 l.)',
    tab: 'neuro-geriatric',
    patientSummary: 'Helena S. ze zdiagnozowaną chorobą Alzheimera nagle staje się agresywna wieczorem, uderza opiekunkę przy toalecie. W badaniu moczu leukocytoza i bolesność nadłonowa.',
    data: {
      lessonId: 'bpsd-objawy-behawioralne-i-psychologiczne',
      subtool: 'bpsd-hunt',
      patientId: 'thread-helena-neurocog',
      presentation: {
        behaviour: 'aggressiveness_during_hygiene',
        fever: false,
        utiSuspected: true,
        painIndicators: true,
        retentionOrConstipation: true,
      },
      antipsychoticAppropriate: false,
      firstLineManagement: 'Antybiotykoterapia ZUM, leczenie bólu i łagodna reorientacja',
    },
  },

  'preset-marek-bvftd': {
    id: 'preset-marek-bvftd',
    title: 'Późna zmiana osobowości / bvFTD: Marek T. (63 l.)',
    tab: 'neuro-geriatric',
    patientSummary: 'Marek T. (63 l.), zmiana zachowania od 2 lat: zanik taktu, wygłaszanie sprośnych uwag, brak żalu po śmierci brata, objadanie się czekoladą. Testy pamięci w normie.',
    data: {
      lessonId: 'otepienie-czolowo-skroniowe-bvftd',
      subtool: 'differential',
      patientId: 'thread-marek-personality',
      onsetAge: 61,
      syndromeFeatures: ['disinhibition', 'apathy', 'loss_of_empathy', 'hyperorality'],
      memoryPreserved: true,
      misdiagnosisHistory: 'Początkowo leczony na depresję i kryzys wieku średniego bez efektu SSRI',
      imagingTarget: 'MRI: Zanik kory czołowo-biegunowej i przedniej części płatów skroniowych',
    },
  },

  'preset-dlb-hallucinations': {
    id: 'preset-dlb-hallucinations',
    tab: 'neuro-geriatric',
    title: 'DLB i nadwrażliwość na neuroleptyki (74 l.)',
    patientSummary: 'Stanisław (74 l.) widzi realistyczne postaci dzieci w pokoju (well-formed hallucinations), w nocy krzyczy i uderza rękami (RBD). Po 1 mg haloperidolu: stupor i ciężka sztywność.',
    data: {
      lessonId: 'otepienie-z-cialami-lewyego-i-parkinson',
      subtool: 'differential',
      coreFeatures: ['visual_hallucinations_formed', 'rem_sleep_behaviour_disorder', 'spontaneous_parkinsonism', 'fluctuating_cognition'],
      drugAdverseEvent: 'Katastrofalne zaostrzenie parkinsonizmu po czystym antagoniście D2 (haloperidol)',
      preferredStrategy: 'Inhibitor AChE (donepezil/rywastygmina) na omamy i wahania; unikanie neuroleptyków typowych',
    },
  },

  'preset-autoimmune-encephalitis': {
    id: 'preset-autoimmune-encephalitis',
    title: 'Szybko postępująca psychoza i encefalopatia (24 l.)',
    tab: 'neuro-geriatric',
    patientSummary: 'Karolina (24 l.), w ciągu 3 tygodni narastające omamy, mutyzm, uogólniony napad toniczno-klonowy, mimowolne ruchy języka i warg (dyskinezy) oraz tachykardia (anty-NMDAR).',
    data: {
      lessonId: 'szybko-postepujace-zespoly-otepienne',
      subtool: 'neuro-clock',
      tempo: 'days_weeks',
      redFlags: ['seizures', 'orofacial_dyskinesia', 'autonomic_instability', 'rapid_progression', 'catatonia'],
      diagnosticPriority: 'MRI mózgu, PMR (panel przeciwciał neuronalnych), EEG, USG/TK miednicy w kierunku potworniaka jajnika',
    },
  },

  'preset-geriatric-polypharmacy': {
    id: 'preset-geriatric-polypharmacy',
    title: 'Polifarmacja geriatryczna, ACB i upadki: Władysław (84 l.)',
    tab: 'neuro-geriatric',
    patientSummary: 'Władysław (84 l.) przyjmuje 9 leków m.in. oksybutyninę, hydroksyzynę, zolpidem, tramadol, sertralinę. Trzy upadki w ciągu miesiąca, eGFR 36 ml/min/1.73m2, ACB = 8.',
    data: {
      lessonId: 'psychofarmakologia-wieku-podeszlego',
      subtool: 'med-review',
      age: 84,
      eGfr: 36,
      currentDrugs: ['Oksybutynina', 'Hydroksyzyna', 'Zolpidem', 'Tramadol', 'Sertralina', 'Ramipryl', 'Furosemid', 'Metoprolol', 'Atorwastatyna'],
      acbScore: 8,
      beersFlagsCount: 4,
      priorityAction: 'Depreskrypcja hydroksyzyny i zolpidemu, zamiana oksybutyniny na mirabegron, redukcja ryzyka upadków',
    },
  },
};
