import type { CourseId, Lesson, Question, Source } from './course-types.ts';
import {
  lessons as endoLessons,
  questions as endoQuestions,
  flashcards as endoFlashcards,
  sources as endoSources,
  modulesList as endoModulesList,
  plannedModules as endoPlannedModules,
} from './course.ts';
import { cases as endoCases, type ClinicalCase } from './cases.ts';
import { glossary as endoGlossary } from './glossary.ts';
import {
  psychiatryLessons,
  psychiatryQuestions,
  psychiatryFlashcards,
  psychiatrySources,
  psychiatryModulesList,
  psychiatryPlannedModules,
  psychiatryCases,
} from './course-psychiatry.ts';
import { psychiatryGlossary } from './glossary-psychiatry.ts';

export interface CourseModuleMeta {
  id: string;
  name: string;
  count: number;
  subtitle: string;
}

export interface CourseBundle {
  id: CourseId;
  title: string;
  shortTitle: string;
  brandSub: string;
  code: string;
  badge: string;
  description: string;
  lessons: Lesson[];
  questions: Question[];
  flashcards: { id: string; lessonId: string; front: string; back: string }[];
  cases: ClinicalCase[];
  sources: Record<string, Source>;
  glossary: readonly any[];
  modulesList: readonly CourseModuleMeta[];
  plannedModules: string[];
  defaultSimTab: string;
  standardsBadge: string;
}

export const COURSES: Record<CourseId, CourseBundle> = {
  endocrinology: {
    id: 'endocrinology',
    title: 'Endokrynologia i Zaburzenia Metaboliczne',
    shortTitle: 'Endokrynologia',
    brandSub: 'ENDOKRYNOLOGIA A–Z',
    code: 'ENDO',
    badge: '178 lekcji · 10 modułów',
    description:
      'Kompletny program kliniczno-mechanistyczny: oś HPT, HPA, HPG, gospodarka Ca–P, cukrzyca i pompy, NEN, GAHT oraz metabolizm.',
    lessons: endoLessons,
    questions: endoQuestions,
    flashcards: endoFlashcards,
    cases: endoCases,
    sources: endoSources,
    glossary: endoGlossary,
    modulesList: endoModulesList,
    plannedModules: endoPlannedModules,
    defaultSimTab: 'hpt',
    standardsBadge: 'ETA · PTE · ADA · EASD · Endocrine Society',
  },
  psychiatry: {
    id: 'psychiatry',
    title: 'Psychiatria i Psychofarmakologia Kliniczna',
    shortTitle: 'Psychiatria',
    brandSub: 'PSYCHIATRIA A–Z',
    code: 'PSYCH',
    badge: '21 lekcji · 2 moduły pilotażowe',
    description:
      'Głęboka ścieżka kliniczno-biochemiczna: kryteria ICD-11 CDDR i DSM-5-TR, neurobiologia BDNF/HPA, Maudsley 15th ed., AGNP TDM 2026 i receptorologia PET.',
    lessons: psychiatryLessons,
    questions: psychiatryQuestions,
    flashcards: psychiatryFlashcards,
    cases: psychiatryCases,
    sources: psychiatrySources,
    glossary: psychiatryGlossary,
    modulesList: psychiatryModulesList,
    plannedModules: psychiatryPlannedModules,
    defaultSimTab: 'psych-center',
    standardsBadge: 'ICD-11 CDDR · DSM-5-TR · Maudsley 15th · AGNP 2026',
  },
};

export const courseList = [COURSES.endocrinology, COURSES.psychiatry] as const;

export function getCourse(id: CourseId): CourseBundle {
  return COURSES[id] || COURSES.endocrinology;
}
