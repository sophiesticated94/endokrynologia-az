import type { Lesson, Question, DraftLesson } from './course-types.ts';
import { draftPsychiatryPart1 } from './course-psychiatry-1.ts';
import { draftPsychiatryPart1b } from './course-psychiatry-1b.ts';
import { draftPsychiatryPart2 } from './course-psychiatry-2.ts';
import { draftPsychiatryPart3 } from './course-psychiatry-3.ts';
import { draftPsychiatryPart3b } from './course-psychiatry-3b.ts';
import { draftPsychiatryPart4 } from './course-psychiatry-4.ts';
import { draftPsychiatryPart4b } from './course-psychiatry-4b.ts';
import { psychiatrySources } from './course-psychiatry-sources.ts';
import { psychiatryCases } from './cases-psychiatry.ts';
import { psychiatryGlossary } from './glossary-psychiatry.ts';

export const allPsychiatryDrafts: DraftLesson[] = [
  ...draftPsychiatryPart1,
  ...draftPsychiatryPart1b,
  ...draftPsychiatryPart2,
  ...draftPsychiatryPart3,
  ...draftPsychiatryPart3b,
  ...draftPsychiatryPart4,
  ...draftPsychiatryPart4b,
];

export const psychiatryLessons: Lesson[] = allPsychiatryDrafts.map((l, li) => {
  const subtitle = l.subtitle || l.title;
  const minutes = l.minutes || (l.readTime ? parseInt(l.readTime, 10) : 15);
  const sections = l.sections.map(s => ({
    title: s.title,
    text: s.text || s.content || '',
  }));
  const table = {
    headers: l.table.headers,
    rows: l.table.rows,
  };
  return {
    ...l,
    subtitle,
    minutes,
    sections,
    table,
    questions: l.questions.map((item, i) => {
      const answer = (li + i) % 3;
      const options = item.choices.map(([text, explanation]) => ({ text, explanation }));
      const rotated = [...options.slice(3 - answer), ...options.slice(0, 3 - answer)];
      const id = item.id || `psych-${l.id}-q${i + 1}`;
      return { id, lessonId: l.id, prompt: item.prompt, options: rotated, answer };
    }),
  };
});

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
] as const;

export const psychiatryPlannedModules = [
  'Psychiatria wieku podeszłego i organiczne zaburzenia psychiczne',
  'Zaburzenia odżywiania i psychosomatyka kliniczna',
];

export { psychiatrySources, psychiatryCases, psychiatryGlossary };
