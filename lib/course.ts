export const CONTENT_VERSION = '2026.09.12.2';
import { buildPilotExperiences, buildQuestionObjectiveMap } from './lesson-v2.ts';
import legacyQuestionIds from './question-ids.json' with {type:'json'};
import {gahtLessons, gahtSources, gahtConceptCards, gahtLessonIds} from './course-gaht.ts';
import {studyPrompts} from './study-paths.ts';
export const VERIFIED_AT = '2026-09-11';
export type { ModuleId, Option, Question, Source, Pair, DraftQuestion, Lesson, DraftLesson } from './course-types.ts';
import { type ModuleId, type Lesson, type DraftLesson, type Source, type LessonExperienceV2 } from './course-types.ts';
import { thyroidSources, thyroidLessons, thyroidExperiences } from './endocrinology/tarczyca-content.ts';
import { pituitarySources, pituitaryLessons, pituitaryExperiences } from './endocrinology/przysadka-content.ts';
import { adrenalSources, adrenalLessons, adrenalExperiences } from './endocrinology/nadnercza-content.ts';
import { parathyroidSources, parathyroidLessons, parathyroidExperiences } from './endocrinology/przytarczyce-content.ts';
import { diabetesSources } from './course-diabetes-sources.ts';
import { draftDiabetesPart1 } from './course-diabetes-1.ts';
import { draftDiabetesPart2 } from './course-diabetes-2.ts';
import { draftDiabetesMathChem } from './course-diabetes-math-chem.ts';
import { gonadsSources } from './course-gonads-sources.ts';
import { draftGonadsPart1 } from './course-gonads-1.ts';
import { draftGonadsPart2 } from './course-gonads-2.ts';
import { draftGonadsPart3 } from './course-gonads-3.ts';
import { draftGonadsPart4 } from './course-gonads-4.ts';
import { nenSources } from './course-nen-sources.ts';
import { draftNenPart1 } from './course-nen-1.ts';
import { draftNenPart2 } from './course-nen-2.ts';
import { draftNenPart3 } from './course-nen-3.ts';
import { draftNenPart4 } from './course-nen-4.ts';
import { otyloscSources } from './course-otylosc-sources.ts';
import { draftOtyloscPart1 } from './course-otylosc-1.ts';
import { draftOtyloscPart2 } from './course-otylosc-2.ts';
import { draftOtyloscPart3 } from './course-otylosc-3.ts';
import { draftOtyloscPart4 } from './course-otylosc-4.ts';
import { pediatricSources } from './course-pediatrics-sources.ts';
import { draftPediatricsPart1 } from './course-pediatrics-1.ts';
import { draftPediatricsPart2 } from './course-pediatrics-2.ts';
import { draftPediatricsMathChem } from './course-pediatrics-math-chem.ts';
import { pregnancySources } from './course-pregnancy-sources.ts';
import { draftPregnancyPart1 } from './course-pregnancy-1.ts';
import { draftPregnancyPart2 } from './course-pregnancy-2.ts';
import { draftPregnancyMathChem } from './course-pregnancy-math-chem.ts';

export const sources: Record<string, Source> = {
  ...gahtSources,
  ...thyroidSources,
  ...pituitarySources,
  ...adrenalSources,
  ...parathyroidSources,
  ...diabetesSources,
  ...gonadsSources,
  ...nenSources,
  ...otyloscSources,
  ...pediatricSources,
  ...pregnancySources,
};

const draftsAfter: DraftLesson[] = [
  ...draftDiabetesPart1.map(l => ({ ...l, moduleId: 'cukrzyca' as ModuleId })),
  ...draftDiabetesPart2.map(l => ({ ...l, moduleId: 'cukrzyca' as ModuleId })),
  ...draftDiabetesMathChem.map(l => ({ ...l, moduleId: 'cukrzyca' as ModuleId })),
  ...draftGonadsPart1.map(l => ({ ...l, moduleId: 'gonady' as ModuleId })),
  ...draftGonadsPart2.map(l => ({ ...l, moduleId: 'gonady' as ModuleId })),
  ...draftGonadsPart3.filter(l=>!gahtLessonIds.includes(l.id)).map(l => ({ ...l, moduleId: 'gonady' as ModuleId })),
  ...gahtLessons,
  ...draftGonadsPart4.map(l => ({ ...l, moduleId: 'gonady' as ModuleId })),
  ...draftNenPart1.map(l => ({ ...l, moduleId: 'nen' as ModuleId })),
  ...draftNenPart2.map(l => ({ ...l, moduleId: 'nen' as ModuleId })),
  ...draftNenPart3.map(l => ({ ...l, moduleId: 'nen' as ModuleId })),
  ...draftNenPart4.map(l => ({ ...l, moduleId: 'nen' as ModuleId })),
  ...draftOtyloscPart1.map(l => ({ ...l, moduleId: 'otylosc' as ModuleId })),
  ...draftOtyloscPart2.map(l => ({ ...l, moduleId: 'otylosc' as ModuleId })),
  ...draftOtyloscPart3.map(l => ({ ...l, moduleId: 'otylosc' as ModuleId })),
  ...draftOtyloscPart4.map(l => ({ ...l, moduleId: 'otylosc' as ModuleId })),
  ...draftPediatricsPart1.map(l => ({ ...l, moduleId: 'pediatria' as ModuleId })),
  ...draftPediatricsPart2.map(l => ({ ...l, moduleId: 'pediatria' as ModuleId })),
  ...draftPediatricsMathChem.map(l => ({ ...l, moduleId: 'pediatria' as ModuleId })),
  ...draftPregnancyPart1.map(l => ({ ...l, moduleId: 'ciaza' as ModuleId })),
  ...draftPregnancyPart2.map(l => ({ ...l, moduleId: 'ciaza' as ModuleId })),
  ...draftPregnancyMathChem.map(l => ({ ...l, moduleId: 'ciaza' as ModuleId })),
];

function mapDraftToLesson(l: DraftLesson, li: number): Lesson {
  const subtitle = l.subtitle || l.title;
  const minutes = l.minutes || (l.readTime ? parseInt(l.readTime, 10) : 12);
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
      const legacy = legacyQuestionIds as Record<string,Record<string,string>>;
      const id = item.id ?? legacy[l.id]?.[item.prompt];
      if (!id) throw new Error(`Nadaj trwały identyfikator pytaniu: ${l.id} / ${item.prompt}`);
      return { id, lessonId: l.id, prompt: item.prompt, options: rotated, answer };
    }),
  };
}

export const lessons: Lesson[] = [
  ...thyroidLessons,
  ...pituitaryLessons,
  ...adrenalLessons,
  ...parathyroidLessons,
  ...draftsAfter.map((l, li) => mapDraftToLesson(l, thyroidLessons.length + pituitaryLessons.length + adrenalLessons.length + parathyroidLessons.length + li)),
];

export const questions = lessons.flatMap(l => l.questions);
const generatedExperiences = buildPilotExperiences(lessons);
// Compatibility facade: Curated content-src experiences strictly override generated pilot experiences
export const lessonExperiences: Record<string, LessonExperienceV2> = {
  ...generatedExperiences,
  ...thyroidExperiences,
  ...pituitaryExperiences,
  ...adrenalExperiences,
  ...parathyroidExperiences,
};
export const questionObjectiveMap = buildQuestionObjectiveMap(lessonExperiences);
export const flashcards = [...questions.map(q => ({
  id: `${q.id}-card`,
  lessonId: q.lessonId,
  front: q.prompt,
  back: `${q.options[q.answer].text}. ${q.options[q.answer].explanation}`,
})), ...gahtConceptCards, ...Object.entries(studyPrompts).map(([moduleId,p])=>({id:`reasoning-${moduleId}-v1`,lessonId:lessons.find(l=>l.moduleId===moduleId)!.id,front:p.question,back:`${p.answer} Pułapka: ${p.pitfall}`}))];

export const modulesList = [
  { id: 'tarczyca', name: 'Tarczyca', count: 16, subtitle: 'Fizjologia, Hashimoto, Graves, guzki, stany nagłe, kinetyka T4 i mechanizm TPO' },
  { id: 'przysadka', name: 'Przysadka i podwzgórze', count: 16, subtitle: 'Gruczolaki, prolactinoma, akromegalia, Cushing, moczówka, oscylatory Goodwina i równanie Edelmana' },
  { id: 'nadnercza', name: 'Nadnercza', count: 16, subtitle: 'Choroba Addisona, zespół Conna, guz chromochłonny, WPN, kinetyka enzymatyczna i stereochemia' },
  { id: 'przytarczyce', name: 'Przytarczyce i Ca–P', count: 16, subtitle: 'Gospodarka Ca–P, tężyczka, model Hilla CaSR, kinetyka mineralizacji i bisfosfoniany' },
  { id: 'cukrzyca', name: 'Cukrzyca i metabolizm', count: 16, subtitle: 'T1D, T2D, MODY, LADA, DKA/HHS, pompy/CGM, model Bergmana i biochemia receptora insuliny' },
  { id: 'gonady', name: 'Gonady i medycyna rozrodu', count: 26, subtitle: 'Oś HPG, hipogonadyzm, PCOS, MHT, IVF/OHSS, 8 lekcji GAHT, DSD i aromataza' },
  { id: 'nen', name: 'Nowotwory neuroendokrynne i MEN', count: 20, subtitle: 'GEP-NEN, rakowiak, gastrinoma, insulinoma, MEN1, MEN2, MEN4, VHL, PRRT, CAPTEM i kinet. receptorowa' },
  { id: 'otylosc', name: 'Otyłość i lipidy', count: 20, subtitle: 'Adipobiologia, GLP-1/GIP, bariatria, MASLD, FH, PCSK9, model Halla i biochemia lipolizy' },
  { id: 'pediatria', name: 'Endokrynologia pediatryczna', count: 16, subtitle: 'Auksologia, SDS, GHD, CPP, CDGP, WPN noworodek, Turner, krzywica, szlak JAK-STAT i steroidogeneza płodowa' },
  { id: 'ciaza', name: 'Endokrynologia ciąży i połogu', count: 16, subtitle: 'Tarczyca w ciąży, Graves/PTU, GDM IADPSG, Addison w porodzie, prolactinoma, model Bergmana i transfer łożyskowy' },
] as const;

export const plannedModules: string[] = [
  'Endokrynologia wieku podeszłego i geriatryczna',
  'Immunoterapia i powikłania endokrynne w onkologii',
];
