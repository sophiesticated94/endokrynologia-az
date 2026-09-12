import type { Lesson } from '@/lib/course';
import type { LearningState } from '@/lib/learning';

export type Route =
  | 'home'
  | 'course'
  | 'cases'
  | 'cards'
  | 'exam'
  | 'results'
  | 'account'
  | 'simulator'
  | `simulator?${string}`
  | `simulator/${string}`
  | 'glossary'
  | 'mistakes'
  | 'catalog'
  | `lesson/${string}`
  | `quiz/${string}`
  | `case/${string}`;

export type Navigation = (route: Route) => void;
