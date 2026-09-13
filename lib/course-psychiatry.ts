import type { Lesson, Question } from './course-types.ts';
import { psychiatrySources as basePsychiatrySources } from './course-psychiatry-sources.ts';
import { psychiatryCases } from './cases-psychiatry.ts';
import { psychiatryGlossary } from './glossary-psychiatry.ts';
import { affectiveLessons, affectiveSources } from './psychiatry/affective-content.ts';
import { pharmacologyLessons, pharmacologySources } from './psychiatry/pharmacology-content.ts';
import { organicLessons, organicSources } from './psychiatry/organic-content.ts';
import { traumaLessons, traumaSources } from './psychiatry/trauma-content.ts';

export const psychiatryLessons: Lesson[] = [
  ...affectiveLessons,
  ...pharmacologyLessons,
  ...organicLessons,
  ...traumaLessons,
];

export const psychiatryQuestions: Question[] = psychiatryLessons.flatMap(l => l.questions);

export const psychiatryFlashcards = [
  ...psychiatryQuestions.map(q => ({
    id: `${q.id}-card`,
    lessonId: q.lessonId,
    front: q.prompt,
    back: `${q.options[q.answer].text}. ${q.options[q.answer].explanation}`,
  })),
  {
    id: 'psych-concept-sert-pet',
    lessonId: 'transportery-monoamin-sert-net-dat',
    front: 'Dlaczego minimalna dawka terapeutyczna SSRI wysyca już ~80% transporterów SERT w badaniach PET?',
    back: 'Krzywa wysycenia SERT od dawki ma charakter hiperboliczny; podwajanie dawki zwiększa blokadę zaledwie o kilka procent, ale może nasilać działania niepożądane.',
  },
  {
    id: 'psych-concept-d2-window',
    lessonId: 'receptory-dopaminowe-okno-kapura',
    front: 'W jakim przedziale prążkowiowego occupancy D2 (okno Kapura) leki przeciwpsychotyczne zachowują skuteczność bez objawów pozapiramidowych?',
    back: 'W przedziale 65% – 80%. Poniżej 65% brak kontroli psychozy, powyżej 80% gwałtownie rośnie ryzyko EPS i hiperprolaktynemii.',
  },
  {
    id: 'psych-concept-hunter-clonus',
    lessonId: 'ostre-stany-toksyczne-zespol-serotoninowy',
    front: 'Jaki objaw jest warunkiem decyzyjnym o najwyższej czułości i swoistości w kryteriach Huntera zespołu serotoninowego?',
    back: 'Klonus (spontaniczny, indukowany lub oczny). Towarzyszy mu pobudzenie, hiperrefleksja, obfite poty i hipertermia.',
  },
  {
    id: 'psych-concept-lithium-tdm',
    lessonId: 'normotymiki-lit-walproinian-lamotrygina',
    front: 'Jaki jest referencyjny zakres stężenia litu 12h po dawce w leczeniu podtrzymującym ChAD wg AGNP 2026?',
    back: '0,6 – 0,8 mmol/l. Stężenia > 1,2 mmol/l wywołują objawy neurotoksyczności (grubofaliste drżenie, ataksja, śpiączka).',
  },
];

export const psychiatryModulesList = [
  {
    id: 'psych-afektywne' as const,
    name: 'Fundamenty psychiatrii i diagnostyka kliniczna',
    count: 16,
    subtitle: 'MSE, DSM-5-TR / ICD-11, psychopatologia, depresja, mania, psychozy, lęk, OCD, PTSD, ADHD, zaburzenia osobowości i badania somatyczne',
  },
  {
    id: 'psych-farmakologia' as const,
    name: 'Psychofarmakologia kliniczna i leczenie biologiczne',
    count: 22,
    subtitle: 'PK/PD, SERT/NET/DAT, D2/D3 (Kapur), 5-HT, Glu/GABA, SSRI/SNRI/TLPD, atypowe, stabilizatory, SGA, TDM, PGx, powikłania, ECT/rTMS',
  },
  {
    id: 'psych-organiczne' as const,
    name: 'Psychiatria organiczna, neurokognitywna i wieku podeszłego',
    count: 13,
    subtitle: 'Delirium (4AT, Cause Hunt), otępienia (AD, VaD, DLB, bvFTD), RPD, BPSD, Beers 2023, obciążenie antycholinergiczne (ACB), capacity i safeguarding',
  },
  {
    id: 'psych-trauma-dysocjacja' as const,
    name: 'Trauma, dysocjacja i zaburzenia osobowości',
    count: 16,
    subtitle: 'Neurobiologia zagrożenia, PTSD, cPTSD (ICD-11), dysocjacja i DID, wymiarowy model osobowości ICD-11, BPD, diagnostyka różnicowa i DBT',
  },
] as const;

export const psychiatryPlannedModules = [
  'Zaburzenia odżywiania i psychosomatyka kliniczna',
];

const mergedPsychiatrySources = {
  ...basePsychiatrySources,
  ...affectiveSources,
  ...pharmacologySources,
  ...organicSources,
  ...traumaSources,
};

export { mergedPsychiatrySources as psychiatrySources, psychiatryCases, psychiatryGlossary };
