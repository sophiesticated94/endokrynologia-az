import type { Source } from '../../course-types.ts';
import { psychiatrySources } from '../../course-psychiatry-sources.ts';

export type ProvenanceCategory =
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

export interface CanonicalSourceMetadata {
  id: string;
  title: string;
  year: string;
  doi?: string;
  url: string;
  kind: string;
  provenanceCategory: ProvenanceCategory;
}

const PROVENANCE_CATEGORIES: Record<string, ProvenanceCategory> = {
  'agnp-tdm-2026': 'CONSENSUS',
  'extrip-lithium': 'CONSENSUS',
  'nms-consensus': 'CONSENSUS',
  'bush-francis-catatonia': 'DECISION_RULE',
  'apa-ect-guidelines': 'GUIDELINE',
  'hunter-criteria': 'DECISION_RULE',
  'pet-d2-kapur': 'PET',
  'pet-sert-meyer': 'PET',
  'crediblemeds-qt': 'CONSENSUS',
  'cpic-cyp2d6-2c19': 'GUIDELINE',
  'icd11-cddr': 'GUIDELINE',
  'dsm5tr': 'GUIDELINE',
  'maudsley15': 'TEXTBOOK',
  'canmat-mdd-2023': 'GUIDELINE',
  'canmat-isbd-bipolar': 'GUIDELINE',
  'ptp-standardy': 'GUIDELINE',
};

function extractDoi(url: string): string | undefined {
  if (url.startsWith('https://doi.org/')) {
    return url.replace('https://doi.org/', '');
  }
  return undefined;
}

function inferCategory(kind: string): ProvenanceCategory {
  const k = kind.toLowerCase();
  if (k.includes('pet')) return 'PET';
  if (k.includes('konsensus')) return 'CONSENSUS';
  if (k.includes('kryteria') || k.includes('reguła') || k.includes('skala')) return 'DECISION_RULE';
  if (k.includes('wytyczne') || k.includes('standard')) return 'GUIDELINE';
  if (k.includes('podręcznik')) return 'TEXTBOOK';
  return 'GUIDELINE';
}

export const CANONICAL_PSYCHIATRY_SOURCES: Record<string, CanonicalSourceMetadata> = Object.fromEntries(
  Object.entries(psychiatrySources).map(([id, src]) => [
    id,
    {
      id: src.id,
      title: src.title,
      year: src.year,
      url: src.url,
      kind: src.kind,
      doi: extractDoi(src.url),
      provenanceCategory: PROVENANCE_CATEGORIES[id] || inferCategory(src.kind),
    },
  ]),
);

export function getCanonicalSource(sourceId: string): Source | undefined {
  return psychiatrySources[sourceId];
}
