import type { Source } from './course-types.ts';

export const adrenalSources: Record<string, Source> = {
  pte_nadnercza: {
    id: 'pte_nadnercza',
    title: 'Polskie Towarzystwo Endokrynologiczne — Postępowanie w guzach nadnerczy i incydentaloma',
    year: '2016',
    url: 'https://doi.org/10.5603/EP.a2016.0039',
    kind: 'Polskie zalecenia kliniczne',
  },
  ese_incidentaloma: {
    id: 'ese_incidentaloma',
    title: 'ESE/ENSAT — Management of Adrenal Incidentalomas: Guideline update',
    year: '2023',
    url: 'https://doi.org/10.1093/ejendo/lvad066',
    kind: 'Europejskie wytyczne',
  },
  endo_pa: {
    id: 'endo_pa',
    title: 'Endocrine Society — Clinical Practice Guideline on Primary Aldosteronism: Screening and Diagnosis',
    year: '2025',
    url: 'https://www.endocrine.org/clinical-practice-guidelines/primary-aldosteronism-2',
    kind: 'Międzynarodowe wytyczne (Endocrine Society 2025)',
  },
  endo_pheo: {
    id: 'endo_pheo',
    title: 'Endocrine Society — Pheochromocytoma and Paraganglioma: Clinical Practice Guideline',
    year: '2014',
    url: 'https://doi.org/10.1210/jc.2014-1498',
    kind: 'Międzynarodowe wytyczne',
  },
  endo_pai: {
    id: 'endo_pai',
    title: 'Endocrine Society — Diagnosis and Treatment of Primary Adrenal Insufficiency',
    year: '2016',
    url: 'https://doi.org/10.1210/jc.2015-1710',
    kind: 'Międzynarodowe wytyczne',
  },
  cah_guideline: {
    id: 'cah_guideline',
    title: 'Endocrine Society — Congenital Adrenal Hyperplasia due to 21-Hydroxylase Deficiency',
    year: '2018',
    url: 'https://doi.org/10.1210/jc.2018-01865',
    kind: 'Międzynarodowe wytyczne',
  },
  ese_acc: {
    id: 'ese_acc',
    title: 'ESE/ENSAT — Clinical Practice Guidelines on the Management of Adrenocortical Carcinoma',
    year: '2018',
    url: 'https://doi.org/10.1530/EJE-18-0608',
    kind: 'Europejskie wytyczne onkologiczne',
  },
  pte_macs: {
    id: 'pte_macs',
    title: 'PTE / ESE — Autonomiczna sekrecja kortyzolu (MACS) w incydentaloma nadnerczy',
    year: '2023',
    url: 'https://doi.org/10.1093/ejendo/lvad066',
    kind: 'Wytyczne kliniczne MACS',
  },
  adrenal_crisis: {
    id: 'adrenal_crisis',
    title: 'Rushworth RL, Torpy DJ, Falhammar H — Adrenal Crisis',
    year: '2019',
    url: 'https://doi.org/10.1056/NEJMra1807486',
    kind: 'N Engl J Med: stany nagłe',
  },
  adrenal_surgery: {
    id: 'adrenal_surgery',
    title: 'ESES — Guidelines for Minimally Invasive and Open Adrenal Surgery',
    year: '2020',
    url: 'https://doi.org/10.1007/s00423-020-01915-4',
    kind: 'Wytyczne chirurgiczne',
  },
};
