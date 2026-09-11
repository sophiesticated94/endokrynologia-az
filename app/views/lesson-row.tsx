'use client';
import { Check, ChevronRight, Clock } from 'lucide-react';
import { lessons, type Lesson } from '@/lib/course';
import type { LearningState } from '@/lib/learning';
import type { Navigation } from './types';

export function LessonRow({
  lesson: l,
  state,
  go,
}: {
  lesson: Lesson;
  state: LearningState;
  go: Navigation;
}) {
  return (
    <button className="lesson-row" onClick={() => go(`lesson/${l.id}`)}>
      <span className={`lesson-number ${state.completed.includes(l.id) ? 'done' : ''}`}>
        {state.completed.includes(l.id) ? <Check size={20} /> : String(lessons.indexOf(l) + 1).padStart(2, '0')}
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
