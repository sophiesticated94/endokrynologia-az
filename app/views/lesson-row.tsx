'use client';
import { Check, ChevronRight, Clock } from 'lucide-react';
import { lessons, type Lesson } from '@/lib/course';
import { psychiatryLessons } from '@/lib/course-psychiatry';
import type { LearningState } from '@/lib/learning';
import type { Navigation } from './types';

export function LessonRow({
  lesson: l,
  state,
  go,
  index,
}: {
  lesson: Lesson;
  state: LearningState;
  go: Navigation;
  index?: number;
}) {
  const displayNum =
    index !== undefined
      ? String(index).padStart(2, '0')
      : (() => {
          const endoIdx = lessons.indexOf(l);
          if (endoIdx >= 0) return String(endoIdx + 1).padStart(2, '0');
          const psychIdx = psychiatryLessons.indexOf(l);
          if (psychIdx >= 0) return String(psychIdx + 1).padStart(2, '0');
          return '01';
        })();

  return (
    <button className="lesson-row" onClick={() => go(`lesson/${l.id}`)}>
      <span className={`lesson-number ${state.completed.includes(l.id) ? 'done' : ''}`}>
        {state.completed.includes(l.id) ? <Check size={20} /> : displayNum}
      </span>
      <span>
        <strong>{l.title}</strong>
        <small>{l.subtitle}</small>
      </span>
      <span className="lesson-time">
        <Clock size={14} />
        {l.minutes} min
      </span>
      <ChevronRight size={18} />
    </button>
  );
}
