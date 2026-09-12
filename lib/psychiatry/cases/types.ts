import type { Question } from '../../course-types.ts';

export type CaseStageType =
  | 'presentation'
  | 'history'
  | 'mse'
  | 'missing_information'
  | 'lab'
  | 'timeline'
  | 'collateral_history'
  | 'differential'
  | 'decision'
  | 'safety'
  | 'treatment'
  | 'followup'
  | 'counterfactual';

export interface CounterfactualBranch {
  alteredFact: string;
  supports: string[];
  arguesAgainst: string[];
  mostDiscriminatingNextStep: string;
  invalidatedManagementSteps: string[];
}

export interface PatientThreadState {
  threadId: string;
  patientName: string;
  age: number;
  sex: 'K' | 'M';
  timelinePoint: string;
  establishedDiagnoses: string[];
  activeMedications: string[];
  knownSensitivities: string[];
  keyHistoryFacts: string[];
  smoking: boolean;
  eGfr: number;
}

export type FlexibleCaseStep = Question & {
  context: string;
  stage: string;
  stageType?: CaseStageType;
  counterfactual?: CounterfactualBranch;
};

export interface FlexibleClinicalCase {
  id: string;
  lessonId: string;
  title: string;
  patient: string;
  difficulty: 'Podstawowy' | 'Zaawansowany';
  intro: string;
  threadId?: string;
  timeOffsetWeeks?: number;
  steps: FlexibleCaseStep[];
}
