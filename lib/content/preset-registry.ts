import { z } from 'zod';
import { ENDOCRINE_PRESETS } from '../endocrinology/presets/endocrine-presets.ts';
import { ALL_PSYCHIATRY_PRESETS } from '../psychiatry/presets/index.ts';
import { TRAUMA_PRESETS } from '../psychiatry/presets/trauma-presets.ts';

export const AdrenalControlIdSchema = z.enum([
  'morningCortisol',
  'assayMethod',
  'cbgAltered',
  'synacthenPeak',
  'recentPituitaryEvent',
  'aldosterone',
  'renin',
  'potassium',
  'medications',
  'spontaneousHypokalemia',
  'normetanephrine',
  'normetanephrineFraction',
  'metanephrine',
  'metanephrineFraction',
  'alphaBlocker',
  'alphaBlockade',
  'betaBlocker',
  'betaBlockade',
  'plannedSurgeryOrBiopsy',
  'sizeMm',
  'unenhancedHu',
  'postDstCortisol',
  'arrPositive',
  'metanephrinesPositive',
]);

export type AdrenalControlId = z.infer<typeof AdrenalControlIdSchema>;

export const AdrenalWorkbenchPresetSchema = z.object({
  focusSection: z.enum(['hpa_cortisol', 'primary_aldosteronism', 'pheochromocytoma', 'incidentaloma']).optional(),
  visibleControls: z.array(AdrenalControlIdSchema).optional(),
  lockedFields: z.array(AdrenalControlIdSchema).optional(),
  initialCortisol: z.object({
    morningCortisolUgDl: z.number().optional(),
    cbgAltered: z.boolean().optional(),
    synacthenPeakUgDl: z.number().optional(),
    recentPituitaryEventWeeks: z.number().optional(),
    assayMethod: z.enum(['immunoassay', 'lc_ms_ms']).optional(),
  }).strict().optional(),
  initialPA: z.object({
    aldosteroneNgDl: z.number().optional(),
    reninType: z.enum(['pra_ng_ml_h', 'drc_miu_l', 'drc_pg_ml']).optional(),
    reninValue: z.number().optional(),
    potassiumMmolL: z.number().optional(),
    medications: z.array(z.string()).optional(),
    spontaneousHypokalemia: z.boolean().optional(),
  }).strict().optional(),
  initialPheo: z.object({
    normetanephrineFraction: z.number().optional(),
    metanephrineFraction: z.number().optional(),
    currentMedications: z.array(z.string()).optional(),
    alphaBlockerInitiated: z.boolean().optional(),
    betaBlockerInitiated: z.boolean().optional(),
    plannedSurgeryOrBiopsy: z.boolean().optional(),
  }).strict().optional(),
  initialIncidentaloma: z.object({
    sizeMm: z.number().optional(),
    unenhancedHu: z.number().optional(),
    postDstCortisolUgDl: z.number().optional(),
    arrPositive: z.boolean().optional(),
    metanephrinesPositive: z.boolean().optional(),
  }).strict().optional(),
}).strict();

export type AdrenalWorkbenchPresetState = z.infer<typeof AdrenalWorkbenchPresetSchema>;

export const ParathyroidControlIdSchema = z.enum([
  'serumCalcium',
  'serumCreatinine',
  'urineCalcium',
  'urineCalcium24h',
  'urineCreatinine',
  'urineCreatinine24h',
  'vitaminD',
  'vitaminD25Oh',
  'egfr',
  'thiazide',
  'takingThiazides',
  'lithium',
  'takingLithium',
  'measuredTotalCalcium',
  'albumin',
  'serumPhosphate',
  'hasParesthesiasOrTetany',
  'calcitriol',
  'elementalCalcium',
  'calciumElemental',
  'preopCalcium',
  'preopPth',
  'alp',
  'alkalinePhosphatase',
  'age',
  'patientAge',
]);

export type ParathyroidControlId = z.infer<typeof ParathyroidControlIdSchema>;

export const ParathyroidWorkbenchPresetSchema = z.object({
  focusSection: z.enum(['hypercalcemia_cccr', 'calcium_correction', 'hypoparathyroidism', 'hungry_bone']).optional(),
  visibleControls: z.array(ParathyroidControlIdSchema).optional(),
  lockedFields: z.array(ParathyroidControlIdSchema).optional(),
  initialCorrection: z.object({
    totalCalciumMmolL: z.number().optional(),
    albuminGPerL: z.number().optional(),
    measuredTotalCalciumMmolL: z.number().optional(),
    albuminGDL: z.number().optional(),
  }).strict().optional(),
  initialCCCR: z.object({
    serumCalciumMmolL: z.number().optional(),
    serumCreatinineUmolL: z.number().optional(),
    urineCalcium24hMmolL: z.number().optional(),
    urineCreatinine24hMmolL: z.number().optional(),
    vitaminD25OhNgMl: z.number().optional(),
    eGfrMlMin: z.number().optional(),
    takingThiazides: z.boolean().optional(),
    takingLithium: z.boolean().optional(),
  }).strict().optional(),
  initialHypopara: z.object({
    serumCalciumMmolL: z.number().optional(),
    serumPhosphateMmolL: z.number().optional(),
    urineCalcium24hMmolDay: z.number().optional(),
    hasParesthesiasOrTetany: z.boolean().optional(),
    calcitriolMicrogDay: z.number().optional(),
    calciumElementalMgDay: z.number().optional(),
  }).strict().optional(),
  initialHungryBone: z.object({
    preopCalciumMmolL: z.number().optional(),
    preopPthPgMl: z.number().optional(),
    alkalinePhosphataseUPerL: z.number().optional(),
    patientAge: z.number().optional(),
  }).strict().optional(),
}).strict();

export type ParathyroidWorkbenchPresetState = z.infer<typeof ParathyroidWorkbenchPresetSchema>;

export const TraumaDissociationControlIdSchema = z.enum([
  'identityDiscontinuity',
  'amnesiaType',
  'depersonalizationDerealization',
  'realityTesting',
  'traumaIntrusions',
  'avoidanceHyperarousal',
  'affectInstability',
  'interpersonalPattern',
  'hallucinations',
  'thoughtDisorder',
  'symptomDuration',
  'neurologicalFeatures',
  'substanceContext',
  'suicidalityRisk',
]);

export type TraumaDissociationControlId = z.infer<typeof TraumaDissociationControlIdSchema>;

export const TraumaDissociationPresetSchema = z.object({
  focusSection: z.enum(['differential', 'dissociation_axes', 'safety_neurology']).optional(),
  visibleControls: z.array(TraumaDissociationControlIdSchema).optional(),
  lockedFields: z.array(TraumaDissociationControlIdSchema).optional(),
  input: z.object({
    identityDiscontinuity: z.enum(['none', 'disturbed_sense_of_self', 'distinct_personality_states']).optional(),
    amnesiaType: z.enum(['none', 'trauma_specific', 'recurrent_daily_activities', 'generalized_identity_loss', 'brief_paroxysmal']).optional(),
    depersonalizationDerealization: z.boolean().optional(),
    realityTesting: z.enum(['intact', 'impaired_delusional', 'transient_stress_induced']).optional(),
    traumaIntrusions: z.enum(['none', 'distressing_memories', 'flashbacks_acting_as_if']).optional(),
    avoidanceHyperarousal: z.boolean().optional(),
    affectInstability: z.enum(['none', 'rapid_reactive_hours', 'sustained_weeks']).optional(),
    interpersonalPattern: z.enum(['stable', 'intense_fear_of_abandonment', 'alienated_avoidant']).optional(),
    hallucinations: z.enum(['none', 'internal_dialogue_ego_dystonic', 'external_commentary_ego_syntonic', 'hypnagogic_or_sensory']).optional(),
    thoughtDisorder: z.boolean().optional(),
    symptomDuration: z.enum(['days_under_3', 'days_under_30', 'chronic_months', 'brief_episodes_seconds']).optional(),
    neurologicalFeatures: z.object({
      hasAuraOrEpigastricRising: z.boolean().optional(),
      stereotypedSecondsDuration: z.boolean().optional(),
      postictalConfusion: z.boolean().optional(),
      focalDeficits: z.boolean().optional(),
    }).strict().optional(),
    substanceContext: z.object({
      activeIntoxicationOrWithdrawal: z.boolean().optional(),
      onsetDirectlyTiedToSubstance: z.boolean().optional(),
      substanceDetails: z.string().optional(),
    }).strict().optional(),
    suicidalityRisk: z.enum(['none', 'passive_ideation', 'active_with_intent', 'recent_severe_self_harm']).optional(),
  }).strict().optional(),
}).strict();

export type TraumaDissociationWorkbenchPresetState = z.infer<typeof TraumaDissociationPresetSchema>;

export const WidgetPresetDefinitionSchema = z.object({
  id: z.string().min(1),
  widgetType: z.string().min(1),
  schemaVersion: z.number().int().positive(),
  moduleId: z.string().min(1),
  lessonId: z.string().optional(),
  title: z.string().min(1),
  initialState: z.record(z.unknown()),
  sourceIds: z.array(z.string()).optional(),
  claimIds: z.array(z.string()).optional(),
  evidenceIds: z.array(z.string()).optional(),
}).strict();

export type WidgetPresetDefinition = z.infer<typeof WidgetPresetDefinitionSchema>;

export function validateWidgetPreset(preset: WidgetPresetDefinition): void {
  WidgetPresetDefinitionSchema.parse(preset);
  if (preset.widgetType === 'adrenal-workbench') {
    AdrenalWorkbenchPresetSchema.parse(preset.initialState);
  } else if (preset.widgetType === 'parathyroid-workbench') {
    ParathyroidWorkbenchPresetSchema.parse(preset.initialState);
  } else if (preset.widgetType === 'trauma-dissociation-workbench') {
    TraumaDissociationPresetSchema.parse(preset.initialState);
  }
}

// Map psychiatry tab to generic widgetType if appropriate
function mapPsychiatryWidgetType(tab: string): string {
  switch (tab) {
    case 'pharmacology':
      return 'receptor-occupancy-explorer';
    case 'safety':
      return 'safety-decision-rule';
    case 'neuro-geriatric':
      return 'neurocognitive-differential';
    case 'diagnostic':
      return 'diagnostic-criteria-workbench';
    default:
      return 'psychiatry-workbench';
  }
}

function mapPsychiatryModuleId(tab: string): string {
  switch (tab) {
    case 'diagnostic':
      return 'psych-afektywne';
    case 'pharmacology':
    case 'safety':
      return 'psych-farmakologia';
    case 'neuro-geriatric':
      return 'psych-organiczne';
    default:
      return 'psych-afektywne';
  }
}

function buildPsychiatryPresets(): Record<string, WidgetPresetDefinition> {
  const result: Record<string, WidgetPresetDefinition> = {};
  for (const [id, p] of Object.entries(ALL_PSYCHIATRY_PRESETS)) {
    result[id] = {
      id: p.id,
      widgetType: mapPsychiatryWidgetType(p.tab),
      schemaVersion: 1,
      moduleId: mapPsychiatryModuleId(p.tab),
      lessonId: (p.data as Record<string, unknown> | undefined)?.lessonId as string | undefined,
      title: p.title,
      initialState: {
        tab: p.tab,
        patientSummary: p.patientSummary,
        ...p.data,
      },
    };
  }
  return result;
}

const psychiatryPresets = buildPsychiatryPresets();

export const allWidgetPresets: Record<string, WidgetPresetDefinition> = {};

for (const [id, preset] of Object.entries(ENDOCRINE_PRESETS)) {
  if (allWidgetPresets[id]) {
    throw new Error(`Duplicate preset ID detected: "${id}"`);
  }
  allWidgetPresets[id] = preset;
}
for (const [id, preset] of Object.entries(psychiatryPresets)) {
  if (allWidgetPresets[id]) {
    throw new Error(`Duplicate preset ID detected: "${id}"`);
  }
  allWidgetPresets[id] = preset;
}
for (const [id, preset] of Object.entries(TRAUMA_PRESETS)) {
  if (allWidgetPresets[id]) {
    throw new Error(`Duplicate preset ID detected: "${id}"`);
  }
  allWidgetPresets[id] = preset;
}

// Validate all presets at startup
for (const [, preset] of Object.entries(allWidgetPresets)) {
  validateWidgetPreset(preset);
}

export function getPreset(id: string): WidgetPresetDefinition | undefined {
  return allWidgetPresets[id];
}

export function getPresetsForModule(moduleId: string): WidgetPresetDefinition[] {
  return Object.values(allWidgetPresets).filter((p) => p.moduleId === moduleId);
}
