import type { Source } from './course-types.ts';

export const nenSources: Record<string, Source> = {
  'enets-consensus-2023': {
    id: 'enets-consensus-2023',
    title: 'ENETS Consensus Guidelines for the Standards of Care in Neuroendocrine Neoplasms',
    year: '2023',
    url: 'https://www.enets.org/guidelines-standards-of-care.html',
    kind: 'Wytyczne ENETS',
  },
  'who-nen-2022': {
    id: 'who-nen-2022',
    title: 'WHO Classification of Tumours: Endocrine and Neuroendocrine Tumours (5th Edition)',
    year: '2022',
    url: 'https://tumourclassification.iarc.who.int/chapters/53',
    kind: 'Klasyfikacja WHO',
  },
  'nanets-pnet-2023': {
    id: 'nanets-pnet-2023',
    title: 'The North American Neuroendocrine Tumor Society Consensus Guidelines for Pancreatic Neuroendocrine Neoplasms & CAPTEM',
    year: '2023',
    url: 'https://nanets.net/guidelines',
    kind: 'Konsensus NANETS',
  },
  'nccn-net-2024': {
    id: 'nccn-net-2024',
    title: 'NCCN Clinical Practice Guidelines in Oncology: Neuroendocrine and Adrenal Tumors (Version 1.2024)',
    year: '2024',
    url: 'https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1448',
    kind: 'Wytyczne NCCN',
  },
  'ata-mtc-2024': {
    id: 'ata-mtc-2024',
    title: 'American Thyroid Association Guidelines for the Management of Medullary Thyroid Carcinoma and MEN2 Syndromes',
    year: '2024',
    url: 'https://www.liebertpub.com/doi/10.1089/thy.2014.0335',
    kind: 'Wytyczne ATA',
  },
  'eanm-prrt-2023': {
    id: 'eanm-prrt-2023',
    title: 'EANM Guideline on Peptide Receptor Radionuclide Therapy with 177Lu-DOTATATE in Neuroendocrine Neoplasms',
    year: '2023',
    url: 'https://link.springer.com/journal/259',
    kind: 'Wytyczne EANM',
  },
  'men-consensus-2021': {
    id: 'men-consensus-2021',
    title: 'Clinical Practice Guidelines for Multiple Endocrine Neoplasia Type 1 and Type 2 (MEN1 and MEN2)',
    year: '2021',
    url: 'https://academic.oup.com/jcem/article/97/9/2990/2823331',
    kind: 'Konsensus MEN1/MEN2',
  },
};
