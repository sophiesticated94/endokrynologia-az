import { z } from 'zod';
import { ENDOCRINE_PRESETS } from '../endocrinology/presets/endocrine-presets.ts';
import { ALL_PSYCHIATRY_PRESETS } from '../psychiatry/presets/index.ts';

export const WidgetPresetDefinitionSchema = z.object({
  id: z.string().min(1),
  widgetType: z.string().min(1),
  schemaVersion: z.number().int().positive(),
  moduleId: z.string().min(1),
  lessonId: z.string().optional(),
  title: z.string().min(1),
  initialState: z.record(z.unknown()),
  evidenceIds: z.array(z.string()).optional(),
});

export type WidgetPresetDefinition = z.infer<typeof WidgetPresetDefinitionSchema>;

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

export const allWidgetPresets: Record<string, WidgetPresetDefinition> = {
  ...ENDOCRINE_PRESETS,
  ...psychiatryPresets,
};

// Validate all presets at startup
for (const [id, preset] of Object.entries(allWidgetPresets)) {
  const parsed = WidgetPresetDefinitionSchema.safeParse(preset);
  if (!parsed.success) {
    throw new Error(`Invalid preset configuration for "${id}": ${parsed.error.message}`);
  }
}

export function getPreset(id: string): WidgetPresetDefinition | undefined {
  return allWidgetPresets[id];
}

export function getPresetsForModule(moduleId: string): WidgetPresetDefinition[] {
  return Object.values(allWidgetPresets).filter((p) => p.moduleId === moduleId);
}
