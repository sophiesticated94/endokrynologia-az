import { z } from 'zod';
import { ENDOCRINE_PRESETS } from '../endocrinology/presets/endocrine-presets.ts';
import { ALL_PSYCHIATRY_PRESETS } from '../psychiatry/presets/index.ts';

export const AdrenalWorkbenchPresetSchema = z.object({
  focusSection: z.enum(['hpa_cortisol', 'primary_aldosteronism', 'pheochromocytoma', 'incidentaloma']).optional(),
  visibleControls: z.array(z.string()).optional(),
  lockedFields: z.array(z.string()).optional(),
  initialCortisol: z.object({
    morningCortisolUgDl: z.number().optional(),
    cbgAltered: z.boolean().optional(),
    synacthenPeakUgDl: z.number().optional(),
    recentPituitaryEventWeeks: z.number().optional(),
    assayMethod: z.enum(['immunoassay', 'lc_ms_ms']).optional(),
  }).optional(),
  initialPA: z.object({
    aldosteroneNgDl: z.number().optional(),
    reninType: z.enum(['pra_ng_ml_h', 'drc_pg_ml']).optional(),
    reninValue: z.number().optional(),
    potassiumMmolL: z.number().optional(),
    medications: z.array(z.string()).optional(),
    spontaneousHypokalemia: z.boolean().optional(),
  }).optional(),
  initialPheo: z.object({
    normetanephrineFraction: z.number().optional(),
    metanephrineFraction: z.number().optional(),
    currentMedications: z.array(z.string()).optional(),
    alphaBlockerInitiated: z.boolean().optional(),
    betaBlockerInitiated: z.boolean().optional(),
  }).optional(),
  initialIncidentaloma: z.object({
    sizeMm: z.number().optional(),
    nativeDensityHu: z.number().optional(),
    absoluteWashoutPercent: z.number().optional(),
    postDstCortisolUgDl: z.number().optional(),
    acthPgMl: z.number().optional(),
  }).optional(),
});

export const ParathyroidWorkbenchPresetSchema = z.object({
  focusSection: z.enum(['hypercalcemia_cccr', 'calcium_correction', 'hypoparathyroidism', 'hungry_bone']).optional(),
  visibleControls: z.array(z.string()).optional(),
  lockedFields: z.array(z.string()).optional(),
  initialCorrection: z.object({
    measuredTotalCalciumMmolL: z.number().optional(),
    albuminGDL: z.number().optional(),
  }).optional(),
  initialCCCR: z.object({
    serumCalciumMmolL: z.number().optional(),
    serumCreatinineUmolL: z.number().optional(),
    urineCalcium24hMmolL: z.number().optional(),
    urineCreatinine24hMmolL: z.number().optional(),
    vitaminD25OhNgMl: z.number().optional(),
    eGfrMlMin: z.number().optional(),
    takingThiazides: z.boolean().optional(),
    takingLithium: z.boolean().optional(),
  }).optional(),
  initialHypopara: z.object({
    serumCalciumMmolL: z.number().optional(),
    serumPhosphateMmolL: z.number().optional(),
    urineCalcium24hMmolDay: z.number().optional(),
    hasParesthesiasOrTetany: z.boolean().optional(),
    calcitriolMicrogDay: z.number().optional(),
    calciumElementalMgDay: z.number().optional(),
  }).optional(),
  initialHungryBone: z.object({
    preopCalciumMmolL: z.number().optional(),
    preopPthPgMl: z.number().optional(),
    preopAlpUL: z.number().optional(),
    ageYears: z.number().optional(),
    adenomaVolumeCm3: z.number().optional(),
  }).optional(),
});

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
});

export type WidgetPresetDefinition = z.infer<typeof WidgetPresetDefinitionSchema>;

export function validateWidgetPreset(preset: WidgetPresetDefinition): void {
  WidgetPresetDefinitionSchema.parse(preset);
  if (preset.widgetType === 'adrenal-workbench') {
    AdrenalWorkbenchPresetSchema.parse(preset.initialState);
  } else if (preset.widgetType === 'parathyroid-workbench') {
    ParathyroidWorkbenchPresetSchema.parse(preset.initialState);
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
