export const PSYCHIATRY_CANONICAL_DIAGRAM_IDS = [
  'mse-map',
  'mood-timeline',
  'psychosis-differential',
  'monoamine-synapse',
  'bdnf-trkb-pathway',
  'cstc-loop',
  'fear-circuit',
  'd2-pathways',
  'serotonin-vs-nms',
  'cyp-network',
] as const;

export type PsychiatryDiagramId = (typeof PSYCHIATRY_CANONICAL_DIAGRAM_IDS)[number];

export function isPsychiatryDiagramId(id: string): boolean {
  const normalized = id.replace(/^diagram-/, '');
  if (normalized === 'bdnf-trkb' || normalized === 'serotonin-nms-hunter') return true;
  return (PSYCHIATRY_CANONICAL_DIAGRAM_IDS as readonly string[]).includes(normalized);
}
