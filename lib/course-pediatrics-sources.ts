import type { Source } from './course-types.ts';

export const pediatricSources: Record<string, Source> = {
  espe_growth: {
    id: 'espe_growth',
    title: 'ESPE/PES Consensus Guidelines for the Diagnosis and Treatment of Growth Hormone Deficiency in Childhood and Adolescence',
    year: '2024',
    url: 'https://doi.org/10.1159/000538910',
    kind: 'Międzynarodowy konsensus pediatryczny (ESPE / PES)',
  },
  ghrs_consensus: {
    id: 'ghrs_consensus',
    title: 'Growth Hormone Research Society — Consensus Guidelines for the Diagnosis and Treatment of Growth Hormone Deficiency',
    year: '2023',
    url: 'https://doi.org/10.1016/j.ghir.2023.101540',
    kind: 'Konsensus badań nad hormonem wzrostu (GHRS)',
  },
  espe_cpp: {
    id: 'espe_cpp',
    title: 'Consensus Statement on the Use of Gonadotropin-Releasing Hormone Analogs in Children with Precocious Puberty',
    year: '2024',
    url: 'https://doi.org/10.1016/S2213-8587(23)00341-2',
    kind: 'Międzynarodowy konsensus dojrzewania płciowego (ESPE / PES)',
  },
  ispad_dka: {
    id: 'ispad_dka',
    title: 'ISPAD Clinical Practice Consensus Guidelines: Diabetic Ketoacidosis and Hyperglycemic Hyperosmolar State in Children and Adolescents',
    year: '2024',
    url: 'https://doi.org/10.1111/pedi.13409',
    kind: 'Światowe wytyczne cukrzycy dziecięcej (ISPAD)',
  },
  espe_dsd: {
    id: 'espe_dsd',
    title: 'Global Consensus on the Management of Differences/Disorders of Sex Development (DSD)',
    year: '2023',
    url: 'https://doi.org/10.1210/clinem/dgad298',
    kind: 'Międzynarodowy konsensus DSD',
  },
  turner_clinical: {
    id: 'turner_clinical',
    title: 'Clinical Practice Guidelines for the Care of Girls and Women with Turner Syndrome: Proceedings from the 2023 Cincinnati International Consensus',
    year: '2024',
    url: 'https://doi.org/10.1530/EJE-23-0300',
    kind: 'Międzynarodowe wytyczne zespołu Turnera',
  },
  espe_hypothyroid: {
    id: 'espe_hypothyroid',
    title: 'European Society for Paediatric Endocrinology Consensus Guidelines on Screening, Diagnosis, and Management of Congenital Hypothyroidism',
    year: '2021',
    url: 'https://doi.org/10.1159/000512818',
    kind: 'Europejskie wytyczne wrodzonej niedoczynności tarczycy',
  },
  cah_pediatric: {
    id: 'cah_pediatric',
    title: 'Congenital Adrenal Hyperplasia Due to Steroid 21-Hydroxylase Deficiency: An Endocrine Society Clinical Practice Guideline',
    year: '2018',
    url: 'https://doi.org/10.1210/jc.2018-01865',
    kind: 'Wytyczne kliniczne Endocrine Society (CAH)',
  },
  xlh_guidelines: {
    id: 'xlh_guidelines',
    title: 'Diagnosis and Management of X-linked Hypophosphataemia: Consensus Recommendations and Use of Burosumab in Children',
    year: '2023',
    url: 'https://doi.org/10.1038/s41574-023-00812-7',
    kind: 'Międzynarodowe wytyczne nefrologiczno-pediatryczne',
  },
  ped_olaf_norms: {
    id: 'ped_olaf_norms',
    title: 'Kulik-Rechberger B et al. — Standardy rozwoju somatycznego dzieci i młodzieży w Polsce (Projekt OLAF / OLA)',
    year: '2020',
    url: 'https://doi.org/10.18544/EP-01.66.02.1742',
    kind: 'Polskie siatki referencyjne auksologii (OLAF / Instytut Matki i Dziecka)',
  },
};
