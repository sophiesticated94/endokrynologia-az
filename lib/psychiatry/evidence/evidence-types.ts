export type EvidenceOrigin = 'MEASURED' | 'DERIVED' | 'MODELLED' | 'EXTRAPOLATED';

export type EvidenceLevel =
  | 'GUIDELINE'
  | 'CONSENSUS'
  | 'META-ANALYSIS'
  | 'RCT'
  | 'COHORT'
  | 'PET'
  | 'PK'
  | 'CASE_SERIES'
  | 'MECHANISTIC'
  | 'TEXTBOOK'
  | 'DECISION_RULE';

export interface ClinicalEvidenceContext {
  population: string;
  measurementMethod: string;
  applicability: string;
  doseRange?: string;
  timing?: string;
  sampleSize?: string;
}

export interface ResearchEvidenceContext {
  modelType?: string;
  parameters?: Record<string, string | number>;
  limitations: string[];
  whatCannotBeInferred: string[];
  uncertaintyOrCI?: string;
  equations?: string;
}

export interface EvidenceItem {
  id: string;
  claimLabel: string;
  origin: EvidenceOrigin;
  level: EvidenceLevel;
  sourceId: string;
  quickSummary: string;
  clinicalContext: ClinicalEvidenceContext;
  researchContext: ResearchEvidenceContext;
}

export interface ModelCard {
  modelId: string;
  name: string;
  equation?: string;
  assumptions: string[];
  validationRange: string;
  limitations: string[];
  knownFailureModes: string[];
  isPatientPredictor: false; // Explicitly enforce: NOT a patient-specific prediction
}
