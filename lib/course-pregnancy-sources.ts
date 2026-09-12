import type { Source } from './course-types.ts';

export const pregnancySources: Record<string, Source> = {
  ata_pregnancy_2017: {
    id: 'ata_pregnancy_2017',
    title: 'Guidelines of the American Thyroid Association for the Diagnosis and Management of Thyroid Disease During Pregnancy and the Postpartum',
    year: '2017',
    url: 'https://doi.org/10.1089/thy.2016.0457',
    kind: 'Międzynarodowe wytyczne tarczycy w ciąży (ATA)',
  },
  eta_pregnancy_hypo: {
    id: 'eta_pregnancy_hypo',
    title: 'European Thyroid Association Guidelines for the Management of Subclinical Hypothyroidism in Pregnancy and in Children',
    year: '2014',
    url: 'https://doi.org/10.1159/000362597',
    kind: 'Europejskie wytyczne tarczycy w ciąży (ETA)',
  },
  figo_gdm_2024: {
    id: 'figo_gdm_2024',
    title: 'FIGO Good Practice Advice: Gestational Diabetes Mellitus and Postpartum Care',
    year: '2024',
    url: 'https://doi.org/10.1002/ijgo.15420',
    kind: 'Światowe wytyczne położniczo-diabetologiczne (FIGO)',
  },
  ada_pregnancy_2024: {
    id: 'ada_pregnancy_2024',
    title: 'American Diabetes Association — Standards of Care in Diabetes: Management of Diabetes in Pregnancy',
    year: '2024',
    url: 'https://doi.org/10.2337/dc24-S015',
    kind: 'Standardy opieki diabetologicznej w ciąży (ADA)',
  },
  iadpsg_consensus: {
    id: 'iadpsg_consensus',
    title: 'International Association of Diabetes and Pregnancy Study Groups Recommendations on the Diagnosis and Classification of Hyperglycemia in Pregnancy',
    year: '2010',
    url: 'https://doi.org/10.2337/dc09-1848',
    kind: 'Międzynarodowy konsensus kryteriów OGTT w ciąży (IADPSG)',
  },
  endo_pregnancy_adrenal: {
    id: 'endo_pregnancy_adrenal',
    title: 'Diagnosis and Management of Adrenal Insufficiency and Cushing Syndrome During Pregnancy: An Endocrine Society Clinical Review',
    year: '2022',
    url: 'https://doi.org/10.1210/clinem/dgac205',
    kind: 'Przegląd kliniczny Endocrine Society (nadnercza w ciąży)',
  },
  esce_preeclampsia: {
    id: 'esce_preeclampsia',
    title: 'ESC Guidelines for the Management of Cardiovascular Diseases during Pregnancy',
    year: '2018',
    url: 'https://doi.org/10.1093/eurheartj/ehy340',
    kind: 'Wytyczne kardiologiczne ESC (nadciśnienie i guz chromochłonny)',
  },
  endo_pthrP_calcium: {
    id: 'endo_pthrP_calcium',
    title: 'Physiology and Disorders of Calcium and Phosphate Metabolism in Pregnancy and Lactation',
    year: '2020',
    url: 'https://doi.org/10.1152/physrev.00042.2018',
    kind: 'Fizjologia i patologia gospodarki Ca-P w ciąży',
  },
};
