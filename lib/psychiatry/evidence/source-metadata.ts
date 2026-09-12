import type { Source } from '../../course-types.ts';
import { psychiatrySources } from '../../course-psychiatry-sources.ts';

export interface CanonicalSourceMetadata {
  id: string;
  title: string;
  year: string;
  doi?: string;
  url: string;
  kind: string;
  provenanceCategory:
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
}

export const CANONICAL_PSYCHIATRY_SOURCES: Record<string, CanonicalSourceMetadata> = {
  'agnp-tdm-2026': {
    id: 'agnp-tdm-2026',
    title:
      'Consensus Guidelines for Therapeutic Drug Monitoring in Neuropsychopharmacology: Update 2026 - Pharmacokinetic, pharmacogenetic and clinical aspects',
    year: '2026',
    doi: '10.1055/a-2860-7861',
    url: 'https://doi.org/10.1055/a-2860-7861',
    kind: 'Konsensus międzynarodowy: TDM i farmakokinetyka ilościowa (AGNP)',
    provenanceCategory: 'CONSENSUS',
  },
  'nms-consensus': {
    id: 'nms-consensus',
    title:
      'An international consensus study of neuroleptic malignant syndrome diagnostic criteria using the Delphi method',
    year: '2011',
    doi: '10.4088/JCP.10m06438',
    url: 'https://doi.org/10.4088/JCP.10m06438',
    kind: 'Konsensus międzynarodowy: NMS (Delphi)',
    provenanceCategory: 'CONSENSUS',
  },
  'bush-francis-catatonia': {
    id: 'bush-francis-catatonia',
    title: 'Catatonia. I. Rating scale and standardized examination',
    year: '1996',
    doi: '10.1111/j.1600-0447.1996.tb09814.x',
    url: 'https://doi.org/10.1111/j.1600-0447.1996.tb09814.x',
    kind: 'Skala referencyjna i standaryzowane badanie katatonii (BFCRS)',
    provenanceCategory: 'DECISION_RULE',
  },
  'apa-ect-guidelines': {
    id: 'apa-ect-guidelines',
    title:
      'The Practice of Electroconvulsive Therapy: Recommendations for Treatment, Training, and Privileging (A Task Force Report of the APA), Third Edition',
    year: '2023',
    doi: '10.1176/appi.books.9780890427118',
    url: 'https://doi.org/10.1176/appi.books.9780890427118',
    kind: 'Referencyjne wytyczne elektrowstrząsów (APA 3rd Ed)',
    provenanceCategory: 'GUIDELINE',
  },
  'hunter-criteria': {
    id: 'hunter-criteria',
    title: 'Dunkley EJC et al. — The Hunter Serotonin Toxicity Criteria (QJM)',
    year: '2003',
    doi: '10.1093/qjmed/hcg109',
    url: 'https://doi.org/10.1093/qjmed/hcg109',
    kind: 'Kryteria diagnostyczne (toksykologia / stany nagłe)',
    provenanceCategory: 'DECISION_RULE',
  },
  'pet-d2-kapur': {
    id: 'pet-d2-kapur',
    title:
      'Kapur S et al. — Clinical and Theoretical Implications of 5-HT2 and D2 Receptor Occupancy (Am J Psychiatry)',
    year: '2000',
    doi: '10.1176/appi.ajp.157.4.514',
    url: 'https://doi.org/10.1176/appi.ajp.157.4.514',
    kind: 'Badanie pierwotne PET (okno D2 65–80% dla antagonistów)',
    provenanceCategory: 'PET',
  },
  'pet-sert-meyer': {
    id: 'pet-sert-meyer',
    title:
      'Meyer JH et al. — Serotonin Transporter Occupancy of Five Antidepressants in Vivo: A PET Study (Am J Psychiatry)',
    year: '2004',
    doi: '10.1176/appi.ajp.161.5.826',
    url: 'https://doi.org/10.1176/appi.ajp.161.5.826',
    kind: 'Badanie pierwotne PET (krzywa occupancy SERT)',
    provenanceCategory: 'PET',
  },
  'crediblemeds-qt': {
    id: 'crediblemeds-qt',
    title: 'CredibleMeds / AZCERT — QTdrugs List: Risk Categories for Torsades de Pointes',
    year: '2026',
    url: 'https://www.crediblemeds.org/',
    kind: 'Rejestr bezpieczeństwa kardiologicznego QTc',
    provenanceCategory: 'CONSENSUS',
  },
  'cpic-cyp2d6-2c19': {
    id: 'cpic-cyp2d6-2c19',
    title: 'CPIC Guideline for CYP2D6 and CYP2C19 Genotypes and Dosing of Antidepressants',
    year: '2023',
    url: 'https://cpicpgx.org/guidelines/cpic-guideline-for-cyp2d6-and-cyp2c19-genotypes-and-dosing-of-antidepressants/',
    kind: 'Wytyczne farmakogenetyczne CPIC',
    provenanceCategory: 'GUIDELINE',
  },
};

export function getCanonicalSource(sourceId: string): Source | undefined {
  return psychiatrySources[sourceId];
}
