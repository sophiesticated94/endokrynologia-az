import type { Source } from './course-types.ts';

export const adrenalSources: Record<string, Source> = {
  pte_nadnercza: {
    id: 'pte_nadnercza',
    title: 'Polskie Towarzystwo Endokrynologiczne — Postępowanie w guzach nadnerczy i incydentaloma',
    year: '2022',
    url: 'https://doi.org/10.5603/EP.a2022.0045',
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
    title: 'Endocrine Society — The Management of Primary Aldosteronism: Case Detection and Treatment',
    year: '2016',
    url: 'https://doi.org/10.1210/jc.2015-4061',
    kind: 'Międzynarodowe wytyczne',
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
    title: 'PTE — Łagodna autonomiczna sekrecja kortyzolu (MACS) w incydentaloma nadnerczy',
    year: '2023',
    url: 'https://doi.org/10.5603/EP.2023.0012',
    kind: 'Polskie stanowisko ekspertów',
  },
  adrenal_crisis: {
    id: 'adrenal_crisis',
    title: 'Joint Consensus — Prevention and Treatment of Acute Adrenal Crisis in Adults',
    year: '2020',
    url: 'https://doi.org/10.1016/S2213-8587(20)30056-8',
    kind: 'Konsensus: stany nagłe',
  },
  adrenal_surgery: {
    id: 'adrenal_surgery',
    title: 'ESES — Guidelines for Minimally Invasive and Open Adrenal Surgery',
    year: '2020',
    url: 'https://doi.org/10.1007/s00423-020-01912-7',
    kind: 'Wytyczne chirurgiczne',
  },
};
