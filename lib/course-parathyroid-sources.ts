import type { Source } from './course-types.ts';

export const parathyroidSources: Record<string, Source> = {
  pte_osteoporoza: {
    id: 'pte_osteoporoza',
    title: 'PTE / PTPBO — Polskie wytyczne diagnostyki i leczenia osteoporozy',
    year: '2022',
    url: 'https://doi.org/10.5603/EP.a2022.0068',
    kind: 'Polskie zalecenia kliniczne',
  },
  ese_phpt: {
    id: 'ese_phpt',
    title: 'ESE / Workshop Consensus — Evaluation and Management of Primary Hyperparathyroidism',
    year: '2022',
    url: 'https://doi.org/10.1210/jendso/bvac140',
    kind: 'Międzynarodowy konsensus',
  },
  ese_hypopara: {
    id: 'ese_hypopara',
    title: 'European Society of Endocrinology — Clinical Guideline: Treatment of Chronic Hypoparathyroidism',
    year: '2021',
    url: 'https://doi.org/10.1530/EJE-15-0628',
    kind: 'Europejskie wytyczne',
  },
  kdigo_ckd_mbd: {
    id: 'kdigo_ckd_mbd',
    title: 'KDIGO — Clinical Practice Guideline Update for Diagnosis and Management of CKD-MBD',
    year: '2024',
    url: 'https://kdigo.org/guidelines/ckd-mbd/',
    kind: 'Międzynarodowe wytyczne nefrologiczne',
  },
  asbmr_calcium: {
    id: 'asbmr_calcium',
    title: 'ASBMR — Disorders of Calcium and Bone Mineral Metabolism',
    year: '2023',
    url: 'https://doi.org/10.1002/jbmr.4789',
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
    title: 'ESES — Consensus on Parathyroid Surgery, Intraoperative PTH, and Minimally Invasive Approaches',
    year: '2021',
    url: 'https://doi.org/10.1007/s00423-021-02158-9',
    kind: 'Konsensus chirurgów endokrynologicznych',
  },
  fhh_consensus: {
    id: 'fhh_consensus',
    title: 'International Consensus — Familial Hypocalciuric Hypercalcemia and Inactivating CaSR Mutations',
    year: '2020',
    url: 'https://doi.org/10.1016/j.bone.2020.115432',
    kind: 'Konsensus genetyczno-kliniczny',
  },
  hungry_bone: {
    id: 'hungry_bone',
    title: 'Endocrine Reviews — Hungry Bone Syndrome: Pathogenesis, Prevention, and Protocol',
    year: '2020',
    url: 'https://doi.org/10.1210/endrev/bnaa008',
    kind: 'Przegląd systematyczny',
  },
  osteoporosis_iof: {
    id: 'osteoporosis_iof',
    title: 'IOF / ESCEO — European Guidance for the Diagnosis and Management of Osteoporosis',
    year: '2020',
    url: 'https://doi.org/10.1007/s00198-020-05459-2',
    kind: 'Europejskie wytyczne',
  },
};
