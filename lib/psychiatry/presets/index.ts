import type { PsychiatryWorkbenchPreset } from '../types.ts';
import { DIAGNOSTIC_PRESETS } from './diagnostic-presets.ts';
import { PHARMACOLOGY_PRESETS } from './pharmacology-presets.ts';
import { SAFETY_PRESETS } from './safety-presets.ts';

export const ALL_PSYCHIATRY_PRESETS: Record<string, PsychiatryWorkbenchPreset> = {
  ...DIAGNOSTIC_PRESETS,
  ...PHARMACOLOGY_PRESETS,
  ...SAFETY_PRESETS,
};

export function getPsychiatryPreset(presetId: string): PsychiatryWorkbenchPreset | undefined {
  return ALL_PSYCHIATRY_PRESETS[presetId];
}

export { DIAGNOSTIC_PRESETS, PHARMACOLOGY_PRESETS, SAFETY_PRESETS };
