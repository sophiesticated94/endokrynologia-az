import type { Source } from './course';

export const pituitarySources: Record<string, Source> = {
  pituitary_endo: {
    id: 'pituitary_endo',
    title: 'Endotext — Hypothalamic-Pituitary Axis Physiology',
    year: '2023',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK279140/',
    kind: 'Podręcznik: fizjologia nadrzędna',
  },
  katznelson: {
    id: 'katznelson',
    title: 'Endocrine Society — Acromegaly: Clinical Practice Guideline',
    year: '2014',
    url: 'https://academic.oup.com/jcem/article/99/11/3933/2836248',
    kind: 'Wytyczne międzynarodowe',
  },
  melmed: {
    id: 'melmed',
    title: 'Endocrine Society — Diagnosis and Treatment of Hyperprolactinemia',
    year: '2011',
    url: 'https://academic.oup.com/jcem/article/96/2/273/2833446',
    kind: 'Wytyczne: prolactinoma',
  },
  nieman: {
    id: 'nieman',
    title: 'Endocrine Society — Treatment of Cushing’s Syndrome',
    year: '2015',
    url: 'https://academic.oup.com/jcem/article/100/8/2807/2836069',
    kind: 'Wytyczne: hiperkortyzolemia',
  },
  fleseriu: {
    id: 'fleseriu',
    title: 'Endocrine Society — Hormonal Replacement in Hypopituitarism',
    year: '2016',
    url: 'https://academic.oup.com/jcem/article/101/11/3888/2764975',
    kind: 'Wytyczne: niedoczynność przysadki',
  },
  freda: {
    id: 'freda',
    title: 'Endocrine Society — Pituitary Incidentaloma',
    year: '2011',
    url: 'https://academic.oup.com/jcem/article/96/4/894/2833777',
    kind: 'Wytyczne: incydentaloma i NFPA',
  },
  baldeweg: {
    id: 'baldeweg',
    title: 'Society for Endocrinology — Management of Pituitary Apoplexy',
    year: '2019',
    url: 'https://doi.org/10.1530/EC-19-0354',
    kind: 'Wytyczne: stany nagłe',
  },
  hyponatraemia: {
    id: 'hyponatraemia',
    title: 'ESE / ERA-EDTA — Clinical Practice Guideline on Hyponatraemia',
    year: '2014',
    url: 'https://doi.org/10.1530/EJE-13-1020',
    kind: 'Wytyczne: SIADH i zaburzenia sodowe',
  },
  pte_acro: {
    id: 'pte_acro',
    title: 'PTE — Polskie zalecenia diagnostyki i leczenia akromegalii',
    year: '2024',
    url: 'https://doi.org/10.5603/EP.2024.0012',
    kind: 'Polskie wytyczne: PTE',
  },
  pte_cushing: {
    id: 'pte_cushing',
    title: 'PTE — Wytyczne diagnostyki i leczenia zespołu Cushinga u dorosłych',
    year: '2023',
    url: 'https://doi.org/10.5603/EP.2023.0035',
    kind: 'Polskie wytyczne: PTE',
  },
};
