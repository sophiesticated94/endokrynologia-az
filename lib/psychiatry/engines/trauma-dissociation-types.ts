// Trauma and Dissociation Domain Types & Criteria Models
// ICD-11 (CDDR 2024) and DSM-5-TR (2022) reference representations

export type IdentityDiscontinuity = 'unassessed' | 'none' | 'disturbed_sense_of_self' | 'distinct_personality_states';
export type AmnesiaType = 'unassessed' | 'none' | 'trauma_specific' | 'recurrent_daily_activities' | 'generalized_identity_loss' | 'brief_paroxysmal';
export type RealityTesting = 'unassessed' | 'intact' | 'impaired_delusional' | 'transient_stress_induced';
export type NegativeSelfConcept =
  | 'unassessed'
  | 'none'
  | 'persistent_shame_guilt'
  | 'worthlessness_failure'
  | 'trauma_related_negative_identity';
export type SymptomDuration = 'unassessed' | 'days_under_3' | 'days_under_30' | 'chronic_months' | 'brief_episodes_seconds';
export type SuicidalityRisk = 'unassessed' | 'none' | 'passive_ideation' | 'active_with_intent' | 'recent_severe_self_harm';

// PTSD 3 Independent ICD-11 Domains
export type ReExperiencingInPresent =
  | 'unassessed'
  | 'none'
  | 'intrusive_memories_without_here_and_now_quality'
  | 'vivid_flashback_here_and_now'
  | 'trauma_nightmares_with_reexperiencing';

export type TraumaAvoidance = 'unassessed' | 'none' | 'internal' | 'external' | 'both';
export type PersistentCurrentThreat = 'unassessed' | 'none' | 'hypervigilance' | 'exaggerated_startle' | 'both';

// Functional Impact (Independent of Duration)
export type FunctionalDistressLevel = 'unassessed' | 'none' | 'mild' | 'clinically_significant';
export type FunctionalImpairmentLevel = 'unassessed' | 'none' | 'mild' | 'clinically_significant';

export interface FunctionalImpact {
  distress: FunctionalDistressLevel;
  functionalImpairment: FunctionalImpairmentLevel;
}

// Exclusion Status Model (Suspected/Unresolved vs Confirmed Explanatory)
export type ExclusionStatus = 'none' | 'unresolved' | 'confirmed_explanatory';

// Affect Regulation (cPTSD vs BPD)
export interface AffectRegulation {
  reactiveLability: 'unassessed' | 'none' | 'mild' | 'marked';
  persistentDysregulation: 'unassessed' | 'none' | 'hyperactivation' | 'hypoactivation_numbing' | 'mixed';
}

// Relational Disturbance (cPTSD DSO vs BPD)
export interface RelationalDisturbance {
  sustainedDifficultyWithCloseness: 'unassessed' | 'none' | 'present';
  persistentDetachmentOrAlienation: 'unassessed' | 'none' | 'present';
  unstableIntenseRelationships: 'unassessed' | 'none' | 'present';
  abandonmentSensitivity: 'unassessed' | 'none' | 'present' | 'marked';
}

// Psychosis Multi-Axial Profile (with explicit unassessed support)
export interface PsychosisAxes {
  realityTesting: 'unassessed' | 'intact' | 'partially_impaired' | 'markedly_impaired';
  delusions: {
    presence: 'unassessed' | 'none' | 'suspected' | 'present';
    organization: 'unassessed' | 'none' | 'poorly_formed' | 'systematized' | 'bizarre';
    conviction: 'unassessed' | 'low' | 'moderate' | 'high';
  };
  formalThoughtDisorder: 'unassessed' | 'none' | 'mild' | 'marked';
  behavioralDisorganization: 'unassessed' | 'none' | 'mild' | 'marked';
  negativeSymptoms: {
    avolition: boolean;
    anhedonia: boolean;
    alogia: boolean;
    bluntedAffect: boolean;
    socialWithdrawal: boolean;
    assessed?: boolean;
  };
  functionalDecline: 'unassessed' | 'none' | 'possible' | 'clear';
  longitudinalCourse: 'unassessed' | 'brief' | 'episodic' | 'persistent' | 'progressive';
  moodRelation: 'unassessed' | 'independent' | 'only_during_mood_episode' | 'mixed_or_unclear';
  substanceOrMedicalContext: 'unassessed' | 'none_known' | 'possible' | 'likely';
}

// Voice Hearing Phenomenology (Non-diagnostic metadata)
export interface VoicePhenomenology {
  present: boolean;
  location: 'internal' | 'external' | 'both' | 'unclear';
  attribution: 'self_related' | 'identity_state_related' | 'external_agent' | 'uncertain';
  conviction: 'insight_preserved' | 'partial_insight' | 'fixed_external_attribution';
  form: 'single_voice' | 'multiple_voices' | 'dialoguing' | 'commentary' | 'commanding' | 'mixed';
  controllability: 'some_control' | 'no_control' | 'unknown';
  relationToIdentityStates: 'none' | 'possible' | 'clear';
  associatedDelusions: 'none' | 'possible' | 'present';
  distress: 'low' | 'moderate' | 'high';
}

// Neurological Features (Phenomenology & History)
export interface NeurologicalFeatures {
  episodicPattern: 'none' | 'non_stereotyped' | 'stereotyped';
  episodeDuration: 'seconds' | 'minutes' | 'hours' | 'variable' | 'unknown';
  aura: {
    epigastricRising: boolean;
    olfactory: boolean;
    gustatory: boolean;
    experientialDejaVuJamaisVu: boolean;
    otherFocalAura: boolean;
  };
  impairedAwareness: 'unassessed' | 'none' | 'possible' | 'clear';
  witnessedAutomatisms: 'unassessed' | 'none' | 'possible' | 'clear';
  postictalState: {
    confusion: boolean;
    somnolence: boolean;
    aphasia: boolean;
    focalDeficit: boolean;
  };
  witnessHistory: 'unassessed' | 'unavailable' | 'available_non_supportive' | 'available_supportive';
  focalNeurologicalDeficits: 'unassessed' | 'none' | 'possible' | 'present';
  confirmedDiagnosis?: 'unassessed' | 'none' | 'suspected_unconfirmed' | 'confirmed_epilepsy_explaining_symptoms' | 'other_neurological_disorder';
  exclusionStatus?: ExclusionStatus;
  // Legacy optional properties
  hasAuraOrEpigastricRising?: boolean;
  stereotypedSecondsDuration?: boolean;
  postictalConfusion?: boolean;
  focalDeficits?: boolean;
}

// Neurological Investigations (EEG, MRI, Specialist Consultation)
export interface NeurologicalInvestigations {
  specialistAssessment?: 'not_done' | 'planned' | 'epilepsy_possible' | 'epilepsy_likely' | 'alternative_diagnosis';
  eeg?: {
    status: 'not_done' | 'normal' | 'nonspecific' | 'epileptiform' | 'inconclusive';
    type?: 'routine' | 'sleep_deprived' | 'ambulatory' | 'video_eeg';
  };
  mri?: {
    status: 'not_done' | 'normal' | 'nonspecific' | 'potential_epileptogenic_lesion' | 'other_abnormality';
  };
}

export interface SubstanceContext {
  activeIntoxicationOrWithdrawal?: boolean;
  onsetDirectlyTiedToSubstance?: boolean;
  substanceDetails?: string;
  exclusionStatus?: ExclusionStatus;
}

// Legacy Aliases for Backward Compatibility
export type TraumaIntrusions = 'none' | 'distressing_memories' | 'flashbacks_acting_as_if';
export type AffectInstability = 'none' | 'rapid_reactive_hours' | 'sustained_weeks';
export type InterpersonalPattern = 'stable' | 'intense_fear_of_abandonment' | 'alienated_avoidant';
export type HallucinationType = 'none' | 'internal_dialogue_ego_dystonic' | 'external_commentary_ego_syntonic' | 'hypnagogic_or_sensory';

// Master Input Interface
export interface TraumaDissociationInput {
  // Dissociation & Identity
  identityDiscontinuity: IdentityDiscontinuity;
  amnesiaType: AmnesiaType;
  depersonalizationDerealization: boolean;
  somatoformDissociation?: boolean;
  realityTesting: RealityTesting;

  // Functional Impact (Independent of Duration)
  functionalImpact?: FunctionalImpact;

  // PTSD Core ICD-11 Domains
  reExperiencingInPresent?: ReExperiencingInPresent;
  traumaAvoidance?: TraumaAvoidance;
  persistentCurrentThreat?: PersistentCurrentThreat;

  // cPTSD DSO & BPD Domains
  negativeSelfConcept: NegativeSelfConcept;
  affectRegulation?: AffectRegulation;
  relationalDisturbance?: RelationalDisturbance;

  // Psychosis & Voices
  psychosisAxes?: PsychosisAxes;
  voicePhenomenology?: VoicePhenomenology;

  // Neurology / Paroxysmal Mimics
  symptomDuration: SymptomDuration;
  neurologicalFeatures?: NeurologicalFeatures;
  neurologicalInvestigations?: NeurologicalInvestigations;

  // Safety & General Context
  substanceContext?: SubstanceContext;
  suicidalityRisk: SuicidalityRisk;

  // Legacy Input Fields (Optional for Backward Compatibility)
  traumaIntrusions?: TraumaIntrusions;
  avoidanceHyperarousal?: boolean;
  affectInstability?: AffectInstability;
  interpersonalPattern?: InterpersonalPattern;
  hallucinations?: HallucinationType;
  thoughtDisorder?: boolean;
}

// Diagnostic Hypotheses
export type DiagnosticCategory =
  | 'DID'
  | 'BPD'
  | 'PTSD'
  | 'cPTSD'
  | 'DPDR'
  | 'DissociativeAmnesia'
  | 'Psychosis'
  | 'TLE'
  | 'SubstanceInduced';

export interface DiagnosticHypothesis {
  condition: string;
  category: DiagnosticCategory;
  level: 'primary_candidate' | 'possible_consideration' | 'unlikely_or_incompatible';
  confidence: 'low' | 'moderate' | 'high';
  dataSufficiency: 'sufficient' | 'insufficient';
  supportingEvidence: string[];
  opposingEvidence: string[];
  missingCriticalInformation: string[];
  rationale: string;
}

// Framework Evaluation Interfaces (ICD-11 vs DSM-5-TR)
export interface FrameworkEvaluation {
  framework: 'icd11' | 'dsm5tr';
  conditionName: string;
  diagnosisCode?: string;
  criteriaMet: string[];
  criteriaMissing: string[];
  criteriaNotRequired: string[];
  exclusions: string[];
  unresolvedExclusions?: string[];
  confirmedExclusions?: string[];
  compatibility: 'meets' | 'possible' | 'insufficient_information' | 'does_not_meet';
  explanation: string;
  sourceIds: string[];
}

// Neurological Output Structure
export interface NeurologicalAssessmentOutput {
  concern: 'low' | 'moderate' | 'high';
  workupPriority: 'routine' | 'specialist_assessment' | 'urgent_assessment';
  exclusionStatus: ExclusionStatus;
  supportingFeatures: string[];
  opposingFeatures: string[];
  missingCriticalInformation: string[];
  investigationInterpretation: {
    eeg: string;
    mri: string;
    safetyInvariant: string;
  };
}

// Overall Output Interface
export interface TraumaDissociationOutput {
  redFlags: string[];
  overallDataSufficiency: 'sufficient' | 'partial' | 'insufficient';
  supportingEvidence: Record<string, string[]>;
  opposingEvidence: Record<string, string[]>;
  missingInformation: string[];
  hypotheses: DiagnosticHypothesis[];
  frameworkAnalysis: {
    icd11: FrameworkEvaluation;
    dsm5tr: FrameworkEvaluation;
  };
  neurologicalAssessment: NeurologicalAssessmentOutput;
  whatWouldChangeDecision: string[];
  safetyActionRequired: string | null;
}

export const DEFAULT_TRAUMA_INPUT: TraumaDissociationInput = {
  identityDiscontinuity: 'unassessed',
  amnesiaType: 'unassessed',
  depersonalizationDerealization: false,
  realityTesting: 'unassessed',
  functionalImpact: {
    distress: 'unassessed',
    functionalImpairment: 'unassessed',
  },
  reExperiencingInPresent: 'unassessed',
  traumaAvoidance: 'unassessed',
  persistentCurrentThreat: 'unassessed',
  negativeSelfConcept: 'unassessed',
  affectRegulation: { reactiveLability: 'unassessed', persistentDysregulation: 'unassessed' },
  relationalDisturbance: {
    sustainedDifficultyWithCloseness: 'unassessed',
    persistentDetachmentOrAlienation: 'unassessed',
    unstableIntenseRelationships: 'unassessed',
    abandonmentSensitivity: 'unassessed',
  },
  psychosisAxes: {
    realityTesting: 'unassessed',
    delusions: { presence: 'unassessed', organization: 'unassessed', conviction: 'unassessed' },
    formalThoughtDisorder: 'unassessed',
    behavioralDisorganization: 'unassessed',
    negativeSymptoms: {
      avolition: false,
      anhedonia: false,
      alogia: false,
      bluntedAffect: false,
      socialWithdrawal: false,
      assessed: false,
    },
    functionalDecline: 'unassessed',
    longitudinalCourse: 'unassessed',
    moodRelation: 'unassessed',
    substanceOrMedicalContext: 'unassessed',
  },
  voicePhenomenology: {
    present: false,
    location: 'unclear',
    attribution: 'uncertain',
    conviction: 'insight_preserved',
    form: 'single_voice',
    controllability: 'unknown',
    relationToIdentityStates: 'none',
    associatedDelusions: 'none',
    distress: 'low',
  },
  symptomDuration: 'chronic_months',
  neurologicalFeatures: {
    episodicPattern: 'none',
    episodeDuration: 'unknown',
    aura: {
      epigastricRising: false,
      olfactory: false,
      gustatory: false,
      experientialDejaVuJamaisVu: false,
      otherFocalAura: false,
    },
    impairedAwareness: 'unassessed',
    witnessedAutomatisms: 'unassessed',
    postictalState: {
      confusion: false,
      somnolence: false,
      aphasia: false,
      focalDeficit: false,
    },
    witnessHistory: 'unavailable',
    focalNeurologicalDeficits: 'unassessed',
    confirmedDiagnosis: 'unassessed',
    exclusionStatus: 'none',
  },
  neurologicalInvestigations: {
    specialistAssessment: 'not_done',
    eeg: { status: 'not_done' },
    mri: { status: 'not_done' },
  },
  substanceContext: {
    activeIntoxicationOrWithdrawal: false,
    onsetDirectlyTiedToSubstance: false,
    substanceDetails: '',
    exclusionStatus: 'none',
  },
  suicidalityRisk: 'none',
};
