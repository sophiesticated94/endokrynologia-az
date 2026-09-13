export type CourseId = 'endocrinology' | 'psychiatry';

export type ModuleId =
  | 'tarczyca'
  | 'przysadka'
  | 'nadnercza'
  | 'przytarczyce'
  | 'cukrzyca'
  | 'gonady'
  | 'nen'
  | 'otylosc'
  | 'pediatria'
  | 'ciaza'
  | 'psych-afektywne'
  | 'psych-farmakologia'
  | 'psych-organiczne'
  | 'psych-trauma-dysocjacja';

export type ObjectiveKind = 'mechanism' | 'interpretation' | 'differentiation' | 'decision' | 'safety';
export type ActivityDifficulty = 'student' | 'doctor' | 'both';
export type Confidence = 1 | 2 | 3;
export type AssessmentLevel = 'recognition' | 'application' | 'generation';
export type RubricEvaluationStatus = 'correct' | 'partially_correct' | 'needs_revision' | 'ungraded';

export interface RubricConcept {
  id: string;
  label: string;
  acceptedPhrases: string[];
  negationSensitive?: boolean;
}

export interface RubricContradiction {
  id: string;
  patterns: string[];
  severity: 'critical' | 'warning';
  feedback: string;
}

export interface RubricDefinition {
  requiredConcepts: RubricConcept[];
  optionalConcepts?: RubricConcept[];
  contradictions?: RubricContradiction[];
  minRequired: number;
}

export interface RubricDimension {
  id: string;
  label: string;
  requiredConcepts: RubricConcept[];
  optionalConcepts?: RubricConcept[];
  criticalErrors?: RubricContradiction[];
}

export interface MultiDimensionalRubricDefinition {
  dimensions: RubricDimension[];
  criticalErrors?: RubricContradiction[];
}

export interface EvidenceWeightingItem {
  id: string;
  text: string;
  expected: 'supports' | 'opposes' | 'neutral';
  explanation: string;
}

export type LearningObjective = {
  id: string;
  statement: string;
  kind: ObjectiveKind;
};

type ActivityBase = {
  id: string;
  objectiveIds: string[];
  prompt: string;
  explanation: string;
  difficulty: ActivityDifficulty;
  reasoning: ObjectiveKind;
  hint?: string;
  sourceIds: string[];
  optionFeedback?: string[];
  claimIds?: string[];
  assessmentLevel?: AssessmentLevel;
};

export type PracticeAnswerType =
  | 'choice_index'
  | 'choice_indexes'
  | 'ordered_indexes'
  | 'matching_map'
  | 'numeric_value'
  | 'self_assessment'
  | 'text_rubric'
  | 'select_and_justify'
  | 'clinical_reasoning'
  | 'evidence_weighting';

export type PracticeRecordMeta = {
  answerType: PracticeAnswerType;
  elapsedMs: number;
  evaluationStatus?: RubricEvaluationStatus;
};

export type LearningActivity =
  | (ActivityBase & { type: 'single_choice' | 'lab' | 'trend' | 'missing_information'; options: string[]; answer: number })
  | (ActivityBase & { type: 'multi_select'; options: string[]; answers: number[] })
  | (ActivityBase & { type: 'ordering'; items: string[]; correctOrder: number[] })
  | (ActivityBase & { type: 'matching'; pairs: Pair[] })
  | (ActivityBase & { type: 'numeric'; answer: number; tolerance: number; unit: string })
  | (ActivityBase & { type: 'recall'; modelAnswer: string })
  | (ActivityBase & { type: 'short_answer'; modelAnswer: string; rubric: RubricDefinition })
  | (ActivityBase & { type: 'select_and_justify'; options: string[]; answer: number | number[]; rationaleRubric: RubricDefinition })
  | (ActivityBase & { type: 'clinical_reasoning'; modelAnswer: string; rubric: MultiDimensionalRubricDefinition })
  | (ActivityBase & { type: 'evidence_weighting'; hypothesis: string; items: EvidenceWeightingItem[] });

export type InlineEnhancementRef = {
  id: string;
  kind: 'diagram' | 'interactive-widget' | 'micro-case' | 'evidence-panel' | 'workbench-deeplink';
  placement: 'after-intro' | 'after-text' | 'before-checkpoint' | 'after-checkpoint' | 'end-of-block';
  presetId?: string;
};

export type LessonBlockV2 = {
  id: string;
  title: string;
  text: string;
  sourceIds: string[];
  checkpointId?: string;
  inlineEnhancements?: InlineEnhancementRef[];
  claimIds?: string[];
};

export type LessonExperienceV2 = {
  experienceVersion: 2;
  lessonId: string;
  objectives: LearningObjective[];
  diagnostic: LearningActivity;
  blocks: LessonBlockV2[];
  activities: LearningActivity[];
  teachBack: LearningActivity & { type: 'recall' };
  exitTicket: LearningActivity[];
  assessmentBank?: LearningActivity[];
  widgetIds: Array<
    | 'axis-map'
    | 'lab-workbench'
    | 'timeline'
    | 'pathway-builder'
    | 'adrenal-workbench'
    | 'parathyroid-workbench'
    | 'trauma-dissociation-workbench'
    | string
  >;
  widgetConfig?: Record<string, { presetId?: string }>;
  review: { status: 'source-checked' | 'needs-review' | 'draft'; checkedAt: string; scope: string };
};

export type Option = { text: string; explanation: string };

export type Question = {
  id: string;
  lessonId: string;
  prompt: string;
  options: Option[];
  answer: number;
};

export type Source = {
  id: string;
  title: string;
  year: string;
  url: string;
  kind: string;
};

export type Pair = [string, string];

export type DraftQuestion = {
  id?: string;
  prompt: string;
  choices: Pair[];
};

export const q = (
  prompt: string,
  correct: Pair,
  wrong1: Pair,
  wrong2: Pair,
  id?: string
): DraftQuestion => ({
  id,
  prompt,
  choices: [correct, wrong1, wrong2],
});

export interface MathDerivationStep {
  step: string;
  equation: string;
  explanation: string;
}

export interface MathDerivation {
  title: string;
  model: string;
  steps: MathDerivationStep[];
  clinicalTakeaway: string;
}

export interface WorkedExampleInput {
  label: string;
  value: string;
  unit: string;
}

export interface WorkedExample {
  title: string;
  patient: string;
  inputs: WorkedExampleInput[];
  calculationSteps: string[];
  result: string;
  clinicalAction: string;
}

export type Lesson = {
  review?: { checkedAt: string; scope: string; status?: 'source-checked' | 'clinician-reviewed' };
  id: string;
  moduleId?: ModuleId;
  title: string;
  subtitle: string;
  group: string;
  minutes: number;
  goals: string[];
  sections: { title: string; text: string }[];
  table: { headers: string[]; rows: string[][] };
  advanced: string;
  summary: string;
  sourceIds: string[];
  questions: Question[];
  derivation?: MathDerivation;
  workedExample?: WorkedExample;
};

export type DraftLesson = {
  review?: { checkedAt: string; scope: string };
  id: string;
  moduleId?: ModuleId;
  title: string;
  subtitle?: string;
  group: string;
  minutes?: number;
  readTime?: string;
  goals: string[];
  sections: { title: string; text?: string; content?: string }[];
  table: { caption?: string; headers: string[]; rows: string[][] };
  advanced: string;
  summary: string;
  sourceIds: string[];
  questions: DraftQuestion[];
  derivation?: MathDerivation;
  workedExample?: WorkedExample;
};
