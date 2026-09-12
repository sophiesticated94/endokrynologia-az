/**
 * Metadane kryteriów czasowych klasyfikacji psychiatrycznych: DSM-5-TR vs ICD-11
 * Wykorzystywane przez diagramy różnicowania psychoz oraz sprawdzane w testach regresyjnych.
 */

export interface DiagnosticTimingCriterion {
  system: 'DSM-5-TR' | 'ICD-11';
  disorder: 'schizophrenia' | 'schizoaffective';
  totalDurationMonths?: number;
  activePhaseMonths?: number;
  isolatedPsychosisWeeks?: number;
  summaryText: string;
}

export const PSYCHIATRY_CLASSIFICATION_TIMINGS = {
  schizophrenia: {
    dsm5tr: {
      system: 'DSM-5-TR' as const,
      disorder: 'schizophrenia' as const,
      totalDurationMonths: 6,
      activePhaseMonths: 1,
      summaryText: 'Ciągłe oznaki zaburzenia przez min. 6 miesięcy, w tym min. 1 miesiąc objawów fazy aktywnej (kryterium A); zaburzenie funkcjonowania; objawy nastroju krótkotrwałe.',
    },
    icd11: {
      system: 'ICD-11' as const,
      disorder: 'schizophrenia' as const,
      totalDurationMonths: 1,
      activePhaseMonths: 1,
      summaryText: 'Charakterystyczne objawy osiowe (urojenia, omamy, dezorganizacja, objawy negatywne) utrzymujące się przez min. 1 miesiąc.',
    },
  },
  schizoaffective: {
    dsm5tr: {
      system: 'DSM-5-TR' as const,
      disorder: 'schizoaffective' as const,
      isolatedPsychosisWeeks: 2,
      summaryText: 'Równoczesny epizod nastroju z kryterium A schizofrenii + wymagane min. 2 tygodnie urojeń/omamów bez wyraźnych objawów nastroju w trakcie całego przebiegu choroby.',
    },
    icd11: {
      system: 'ICD-11' as const,
      disorder: 'schizoaffective' as const,
      totalDurationMonths: 1,
      summaryText: 'Równoczesne spełnienie kryteriów schizofrenii i epizodu nastroju przez min. 1 miesiąc; brak sztywnego wymogu 2 tygodni izolowanej psychozy.',
    },
  },
} as const;

export function getDiagnosticDurationCriteria(disorder: 'schizophrenia' | 'schizoaffective') {
  return PSYCHIATRY_CLASSIFICATION_TIMINGS[disorder];
}
