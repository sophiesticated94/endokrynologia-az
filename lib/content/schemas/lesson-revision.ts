import { z } from 'zod';

export const ObjectiveKindSchema = z.enum([
  'mechanism',
  'interpretation',
  'differentiation',
  'decision',
  'safety',
]);

export const ActivityDifficultySchema = z.enum(['student', 'doctor', 'both']);

export const LearningObjectiveSchema = z.object({
  id: z.string(),
  statement: z.string(),
  kind: ObjectiveKindSchema,
});

const ActivityBaseSchema = z.object({
  id: z.string(),
  objectiveIds: z.array(z.string()),
  prompt: z.string(),
  explanation: z.string(),
  difficulty: ActivityDifficultySchema,
  reasoning: ObjectiveKindSchema,
  hint: z.string().optional(),
  sourceIds: z.array(z.string()),
  claimIds: z.array(z.string()).optional(),
  optionFeedback: z.array(z.string()).optional(),
});

export const LearningActivitySchema = z.union([
  ActivityBaseSchema.extend({
    type: z.enum(['single_choice', 'lab', 'trend', 'missing_information']),
    options: z.array(z.string()),
    answer: z.number(),
  }),
  ActivityBaseSchema.extend({
    type: z.literal('multi_select'),
    options: z.array(z.string()),
    answers: z.array(z.number()),
  }),
  ActivityBaseSchema.extend({
    type: z.literal('ordering'),
    items: z.array(z.string()),
    correctOrder: z.array(z.number()),
  }),
  ActivityBaseSchema.extend({
    type: z.literal('matching'),
    pairs: z.array(z.tuple([z.string(), z.string()])),
  }),
  ActivityBaseSchema.extend({
    type: z.literal('numeric'),
    answer: z.number(),
    tolerance: z.number(),
    unit: z.string(),
  }),
  ActivityBaseSchema.extend({
    type: z.literal('recall'),
    modelAnswer: z.string(),
  }),
]);

export const InlineEnhancementRefSchema = z.object({
  id: z.string(),
  kind: z.enum([
    'diagram',
    'interactive-widget',
    'micro-case',
    'evidence-panel',
    'workbench-deeplink',
  ]),
  placement: z.enum([
    'after-intro',
    'after-text',
    'before-checkpoint',
    'after-checkpoint',
    'end-of-block',
  ]),
  presetId: z.string().optional(),
});

export const LessonBlockV2Schema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  sourceIds: z.array(z.string()),
  claimIds: z.array(z.string()).optional(),
  checkpointId: z.string().optional(),
  inlineEnhancements: z.array(InlineEnhancementRefSchema).optional(),
});

export const LessonExperienceV2Schema = z.object({
  experienceVersion: z.literal(2),
  lessonId: z.string(),
  objectives: z.array(LearningObjectiveSchema),
  diagnostic: LearningActivitySchema,
  blocks: z.array(LessonBlockV2Schema),
  activities: z.array(LearningActivitySchema),
  teachBack: LearningActivitySchema.and(
    z.object({
      type: z.literal('recall'),
    })
  ),
  exitTicket: z.array(LearningActivitySchema),
  widgetIds: z.array(z.string()),
  review: z.object({
    status: z.enum(['source-checked', 'needs-review', 'draft']),
    checkedAt: z.string(),
    scope: z.string(),
  }),
});

export const MathDerivationStepSchema = z.object({
  step: z.string(),
  equation: z.string(),
  explanation: z.string(),
});

export const MathDerivationSchema = z.object({
  title: z.string(),
  model: z.string(),
  steps: z.array(MathDerivationStepSchema),
  clinicalTakeaway: z.string(),
});

export const WorkedExampleInputSchema = z.object({
  label: z.string(),
  value: z.string(),
  unit: z.string(),
});

export const WorkedExampleSchema = z.object({
  title: z.string(),
  patient: z.string(),
  inputs: z.array(WorkedExampleInputSchema),
  calculationSteps: z.array(z.string()),
  result: z.string(),
  clinicalAction: z.string(),
});

export const OptionSchema = z.object({
  text: z.string(),
  explanation: z.string(),
});

export const QuestionSchema = z.object({
  id: z.string(),
  lessonId: z.string(),
  prompt: z.string(),
  options: z.array(OptionSchema),
  answer: z.number(),
});

export const LessonSectionSchema = z.object({
  title: z.string(),
  text: z.string(),
});

export const LessonTableSchema = z.object({
  caption: z.string().optional(),
  headers: z.array(z.string()),
  rows: z.array(z.array(z.string())),
});

export const LessonRevisionDocumentSchema = z.object({
  id: z.string(),
  moduleId: z.string(),
  title: z.string(),
  subtitle: z.string(),
  group: z.string(),
  minutes: z.number(),
  goals: z.array(z.string()),
  sections: z.array(LessonSectionSchema),
  table: LessonTableSchema,
  advanced: z.string(),
  summary: z.string(),
  sourceIds: z.array(z.string()),
  questions: z.array(QuestionSchema),
  experience: LessonExperienceV2Schema.optional(),
  derivation: MathDerivationSchema.optional(),
  workedExample: WorkedExampleSchema.optional(),
  assetIds: z.array(z.string().uuid()).optional().default([]),
  review: z
    .object({
      checkedAt: z.string(),
      scope: z.string(),
      status: z.string().optional(),
    })
    .optional(),
});

export type LessonRevisionDocument = z.infer<typeof LessonRevisionDocumentSchema>;

export const EvidenceClaimSchema = z.object({
  id: z.string().min(1),
  statement: z.string().min(1),
  category: z.enum([
    'guideline_recommendation',
    'measured',
    'derived',
    'observational_association',
    'mechanistic',
    'modelled',
    'extrapolated',
    'educational_simplification',
  ]),
  strength: z
    .enum(['strong', 'conditional', 'expert_consensus', 'in_vitro_model', 'observational'])
    .optional(),
  sourceIds: z.array(z.string().min(1)),
  lessonIds: z.array(z.string().min(1)).optional(),
  tags: z.array(z.string()).optional(),
  reviewedAt: z.string().optional(),
  value: z.union([z.number(), z.string()]).optional(),
  unit: z.string().optional(),
  comparator: z.string().optional(),
  population: z.string().optional(),
  assayContext: z.string().optional(),
  evidenceType: z.string().optional(),
});

export type EvidenceClaim = z.infer<typeof EvidenceClaimSchema>;
