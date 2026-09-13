import type { Lesson, LessonExperienceV2, Source } from '../course-types.ts';
import type { EvidenceClaim } from './schemas/lesson-revision.ts';
import {
  lessons as endoLessons,
  modulesList as endoModulesList,
  lessonExperiences as endoLessonExperiences,
  sources as endoSources,
  CONTENT_VERSION as endoContentVersion,
} from '../course.ts';
import { adrenalClaims } from '../endocrinology/nadnercza-content.ts';
import { parathyroidClaims } from '../endocrinology/przytarczyce-content.ts';
import {
  psychiatryLessons,
  psychiatryModulesList,
  psychiatrySources,
} from '../course-psychiatry.ts';
import { psychiatryLessonExperiences } from '../psychiatry/index.ts';

export interface CourseModuleSource {
  course: {
    id: string;
    title: string;
    description: string;
    version: string;
  };
  module: {
    id: string;
    name: string;
    subtitle: string;
    count: number;
    sortOrder: number;
  };
  lessons: Lesson[];
  lessonExperiences: Record<string, LessonExperienceV2>;
  sources: Record<string, Source>;
  claims?: Record<string, EvidenceClaim>;
}

const ENDO_COURSE_INFO = {
  id: 'endocrinology',
  title: 'Endokrynologia od A do Z',
  description: 'Interaktywny podręcznik i symulator kliniczny endokrynologii.',
  version: endoContentVersion,
};

const PSYCH_COURSE_INFO = {
  id: 'psychiatry',
  title: 'Psychiatria i Psychofarmakologia Kliniczna',
  description: 'Podręcznik akademicki, mechanizmy neurobiologiczne i interaktywny symulator decyzyjny.',
  version: endoContentVersion,
};

export function resolveCourseModuleSource(moduleId: string): CourseModuleSource {
  const normId = moduleId.toLowerCase().trim();

  // 1. Check Endocrinology modules
  const endoModIdx = endoModulesList.findIndex((m) => m.id === normId);
  if (endoModIdx !== -1) {
    const mod = endoModulesList[endoModIdx];
    const moduleLessons = endoLessons.filter((l) => l.moduleId === normId);
    let moduleClaims: Record<string, EvidenceClaim> | undefined;
    if (normId === 'nadnercza') {
      moduleClaims = Object.fromEntries(adrenalClaims.map((c) => [c.id, c]));
    } else if (normId === 'przytarczyce') {
      moduleClaims = Object.fromEntries(parathyroidClaims.map((c) => [c.id, c]));
    }
    return {
      course: ENDO_COURSE_INFO,
      module: {
        id: mod.id,
        name: mod.name,
        subtitle: mod.subtitle || '',
        count: moduleLessons.length,
        sortOrder: endoModIdx + 1,
      },
      lessons: moduleLessons,
      lessonExperiences: endoLessonExperiences,
      sources: endoSources,
      claims: moduleClaims,
    };
  }

  // 2. Check Psychiatry modules
  const psychModIdx = psychiatryModulesList.findIndex((m) => m.id === normId);
  if (psychModIdx !== -1) {
    const mod = psychiatryModulesList[psychModIdx];
    const moduleLessons = psychiatryLessons.filter((l) => l.moduleId === normId);
    return {
      course: PSYCH_COURSE_INFO,
      module: {
        id: mod.id,
        name: mod.name,
        subtitle: mod.subtitle || '',
        count: moduleLessons.length,
        sortOrder: psychModIdx + 1,
      },
      lessons: moduleLessons,
      lessonExperiences: psychiatryLessonExperiences,
      sources: psychiatrySources,
    };
  }

  throw new Error(
    `Unknown module ID "${moduleId}". Must be one of: ${getAllModuleIds().join(', ')}`
  );
}

export function getAllModuleIds(): string[] {
  return [
    ...endoModulesList.map((m) => m.id),
    ...psychiatryModulesList.map((m) => m.id),
  ];
}

export function getAllCourseModuleSources(): CourseModuleSource[] {
  return getAllModuleIds().map(resolveCourseModuleSource);
}
