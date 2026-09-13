// Trauma and Dissociation Domain Types & Criteria Models
// ICD-11 (CDDR 2024) and DSM-5-TR (2022) reference representations

export type IdentityDiscontinuity = 'none' | 'disturbed_sense_of_self' | 'distinct_personality_states';
export type AmnesiaType = 'none' | 'trauma_specific' | 'recurrent_daily_activities' | 'generalized_identity_loss' | 'brief_paroxysmal';
export type RealityTesting = 'intact' | 'impaired_delusional' | 'transient_stress_induced';
export type NegativeSelfConcept =
  | 'none'
  | 'persistent_shame_guilt'
  | 'worthlessness_failure'
  | 'trauma_related_negative_identity';
export type SymptomDuration = 'days_under_3' | 'days_under_30' | 'chronic_months' | 'brief_episodes_seconds';
export type SuicidalityRisk = 'none' | 'passive_ideation' | 'active_with_intent' | 'recent_severe_self_harm';

// PTSD 3 Independent ICD-11 Domains
export type ReExperiencingInPresent =
  | 'none'
  | 'intrusive_memories_without_here_and_now_quality'
  | 'vivid_flashback_here_and_now'
  | 'trauma_nightmares_with_reexperiencing';

export type TraumaAvoidance = 'none' | 'internal' | 'external' | 'both';
export type PersistentCurrentThreat = 'none' | 'hypervigilance' | 'exaggerated_startle' | 'both';

// Affect Regulation (cPTSD vs BPD)
export interface AffectRegulation {
  reactiveLability: 'none' | 'mild' | 'marked';
  persistentDysregulation: 'none' | 'hyperactivation' | 'hypoactivation_numbing' | 'mixed';
}

// Relational Disturbance (cPTSD DSO vs BPD)
export interface RelationalDisturbance {
  sustainedDifficultyWithCloseness: 'none' | 'present';
  persistentDetachmentOrAlienation: 'none' | 'present';
  unstableIntenseRelationships: 'none' | 'present';
  abandonmentSensitivity: 'none' | 'present' | 'marked';
}

// Psychosis Multi-Axial Profile
export interface PsychosisAxes {
  realityTesting: 'intact' | 'partially_impaired' | 'markedly_impaired';
  delusions: {
    presence: 'none' | 'suspected' | 'present';
    organization: 'none' | 'poorly_formed' | 'systematized' | 'bizarre';
    conviction: 'low' | 'moderate' | 'high';
  };
  formalThoughtDisorder: 'none' | 'mild' | 'marked';
  behavioralDisorganization: 'none' | 'mild' | 'marked';
  negativeSymptoms: {
    avolition: boolean;
    anhedonia: boolean;
    alogia: boolean;
    bluntedAffect: boolean;
    socialWithdrawal: boolean;
  };
  functionalDecline: 'none' | 'possible' | 'clear';
  longitudinalCourse: 'unknown' | 'brief' | 'episodic' | 'persistent' | 'progressive';
  moodRelation: 'independent' | 'only_during_mood_episode' | 'mixed_or_unclear';
  substanceOrMedicalContext: 'none_known' | 'possible' | 'likely';
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
  impairedAwareness: 'none' | 'possible' | 'clear';
  witnessedAutomatisms: 'none' | 'possible' | 'clear';
  postictalState: {
    confusion: boolean;
    somnolence: boolean;
    aphasia: boolean;
    focalDeficit: boolean;
  };
  witnessHistory: 'unavailable' | 'available_non_supportive' | 'available_supportive';
  focalNeurologicalDeficits: 'none' | 'possible' | 'present';
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
  realityTesting: RealityTesting;

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
  compatibility: 'meets' | 'possible' | 'insufficient_information' | 'does_not_meet';
  explanation: string;
  sourceIds: string[];
}

// Neurological Output Structure
export interface NeurologicalAssessmentOutput {
  concern: 'low' | 'moderate' | 'high';
  workupPriority: 'routine' | 'specialist_assessment' | 'urgent_assessment';
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
  identityDiscontinuity: 'none',
  amnesiaType: 'none',
  depersonalizationDerealization: false,
  realityTesting: 'intact',
  reExperiencingInPresent: 'none',
  traumaAvoidance: 'none',
  persistentCurrentThreat: 'none',
  negativeSelfConcept: 'none',
  affectRegulation: { reactiveLability: 'none', persistentDysregulation: 'none' },
  relationalDisturbance: {
    sustainedDifficultyWithCloseness: 'none',
    persistentDetachmentOrAlienation: 'none',
    unstableIntenseRelationships: 'none',
    abandonmentSensitivity: 'none',
  },
  psychosisAxes: {
    realityTesting: 'intact',
    delusions: { presence: 'none', organization: 'none', conviction: 'low' },
    formalThoughtDisorder: 'none',
    behavioralDisorganization: 'none',
    negativeSymptoms: {
      avolition: false,
      anhedonia: false,
      alogia: false,
      bluntedAffect: false,
      socialWithdrawal: false,
    },
    functionalDecline: 'none',
    longitudinalCourse: 'persistent',
    moodRelation: 'independent',
    substanceOrMedicalContext: 'none_known',
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
    impairedAwareness: 'none',
    witnessedAutomatisms: 'none',
    postictalState: {
      confusion: false,
      somnolence: false,
      aphasia: false,
      focalDeficit: false,
    },
    witnessHistory: 'unavailable',
    focalNeurologicalDeficits: 'none',
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
  },
  suicidalityRisk: 'none',
};
