import type { Lesson, LessonExperienceV2, Source } from '../course-types.ts';
import {
  lessons as endoLessons,
  modulesList as endoModulesList,
  lessonExperiences as endoLessonExperiences,
  sources as endoSources,
  CONTENT_VERSION as endoContentVersion,
} from '../course.ts';
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
