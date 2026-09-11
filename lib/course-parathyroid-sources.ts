import type { Source } from './course-types.ts';

export const parathyroidSources: Record<string, Source> = {
  pte_osteoporoza: {
    id: 'pte_osteoporoza',
    title: 'PTE / PTPBO — Polskie wytyczne diagnostyki i leczenia osteoporozy',
    year: '2020',
    url: 'https://doi.org/10.5603/EP.2020.0041',
    kind: 'Polskie zalecenia kliniczne',
  },
  ese_phpt: {
    id: 'ese_phpt',
    title: 'Bilezikian JP et al. — Evaluation and Management of Primary Hyperparathyroidism: Guidelines from the 5th International Workshop',
    year: '2022',
    url: 'https://doi.org/10.1002/jbmr.4677',
    kind: 'Międzynarodowy konsensus',
  },
  ese_hypopara: {
    id: 'ese_hypopara',
    title: 'Revised European Society of Endocrinology Clinical Practice Guideline: Treatment of Chronic Hypoparathyroidism in Adults',
    year: '2025',
    url: 'https://doi.org/10.1093/ejendo/lvaf222',
    kind: 'Europejskie wytyczne (ESE)',
  },
  kdigo_ckd_mbd: {
    id: 'kdigo_ckd_mbd',
    title: 'KDIGO 2017 Clinical Practice Guideline Update for the Diagnosis, Evaluation, Prevention, and Treatment of CKD-MBD',
    year: '2017',
    url: 'https://doi.org/10.1016/j.kisu.2017.04.001',
    kind: 'Międzynarodowe wytyczne nefrologiczne (KDIGO)',
  },
  asbmr_calcium: {
    id: 'asbmr_calcium',
    title: 'ASBMR — Primer on the Metabolic Bone Diseases and Disorders of Mineral Metabolism',
    year: '2018',
    url: 'https://doi.org/10.1002/9781119266594',
    kind: 'Monografia naukowa',
  },
  endo_hypercalcemia: {
    id: 'endo_hypercalcemia',
    title: 'Endocrine Society — Treatment of Hypercalcemia of Malignancy: Clinical Practice Guideline',
    year: '2023',
    url: 'https://doi.org/10.1210/clinem/dgac621',
    kind: 'Międzynarodowe wytyczne',
  },
  eses_parathyroid: {
    id: 'eses_parathyroid',
    title: 'ESES — Consensus statement on intraoperative parathyroid hormone monitoring',
    year: '2015',
    url: 'https://doi.org/10.1007/s00423-015-1339-x',
    kind: 'Konsensus chirurgów endokrynologicznych',
  },
  fhh_consensus: {
    id: 'fhh_consensus',
    title: 'Hannan FM et al. — Epidemiology, Pathophysiology, and Genetics of Primary Hyperparathyroidism and FHH',
    year: '2022',
    url: 'https://doi.org/10.1002/jbmr.4665',
    kind: 'Konsensus genetyczno-kliniczny',
  },
  hungry_bone: {
    id: 'hungry_bone',
    title: 'Witteveen JE et al. — Hungry bone syndrome: still a challenge in the post-operative management of primary hyperparathyroidism',
    year: '2013',
    url: 'https://doi.org/10.1530/EJE-12-0528',
    kind: 'Przegląd systematyczny',
  },
  osteoporosis_iof: {
    id: 'osteoporosis_iof',
    title: 'IOF / ESCEO — European Guidance for the Diagnosis and Management of Osteoporosis in Postmenopausal Women',
    year: '2019',
    url: 'https://doi.org/10.1007/s00198-018-4704-5',
    kind: 'Europejskie wytyczne',
  },
};
