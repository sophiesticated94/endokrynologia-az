import type { CourseId } from '@/lib/course-types';
import { COURSES } from '@/lib/courses-registry';
import type { Route } from '../content-views';

export function validRoute(value: string): value is Route {
  return (
    ['home', 'course', 'simulator', 'cases', 'cards', 'exam', 'results', 'mistakes', 'glossary', 'account', 'catalog'].includes(value) ||
    value.startsWith('simulator?') ||
    value.startsWith('simulator/') ||
    COURSES.endocrinology.lessons.some((l: { id: string }) => value === `lesson/${l.id}` || value === `quiz/${l.id}`) ||
    COURSES.psychiatry.lessons.some((l: { id: string }) => value === `lesson/${l.id}` || value === `quiz/${l.id}`) ||
    COURSES.endocrinology.cases.some((c: { id: string }) => value === `case/${c.id}`) ||
    COURSES.psychiatry.cases.some((c: { id: string }) => value === `case/${c.id}`)
  );
}

export function getInitialRoute(): Route {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.slice(1);
  return validRoute(hash) ? hash : 'home';
}

export function getInitialCourse(): CourseId {
  if (typeof window === 'undefined') return 'endocrinology';
  const hash = window.location.hash.slice(1);
  if (hash.startsWith('simulator?') || hash.startsWith('simulator/') || hash === 'simulator') {
    try {
      const saved = localStorage.getItem('med.activeCourse');
      if (saved === 'psychiatry' || saved === 'endocrinology') return saved;
      return 'psychiatry';
    } catch {
      return 'psychiatry';
    }
  }
  if (hash.startsWith('lesson/') || hash.startsWith('quiz/')) {
    if (COURSES.psychiatry.lessons.some((l: { id: string }) => hash === `lesson/${l.id}` || hash === `quiz/${l.id}`)) {
      return 'psychiatry';
    }
    if (COURSES.endocrinology.lessons.some((l: { id: string }) => hash === `lesson/${l.id}` || hash === `quiz/${l.id}`)) {
      return 'endocrinology';
    }
  }
  if (hash.startsWith('case/')) {
    if (COURSES.psychiatry.cases.some((c: { id: string }) => hash === `case/${c.id}`)) {
      return 'psychiatry';
    }
    if (COURSES.endocrinology.cases.some((c: { id: string }) => hash === `case/${c.id}`)) {
      return 'endocrinology';
    }
  }
  try {
    const saved = localStorage.getItem('med.activeCourse');
    if (saved === 'psychiatry' || saved === 'endocrinology') return saved;
  } catch {}
  return 'endocrinology';
}
