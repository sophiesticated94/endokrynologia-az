'use client';
import { useState } from 'react';
import { ArrowRight, Stethoscope } from 'lucide-react';
import type { CourseId } from '@/lib/course-types';
import { getCourse } from '@/lib/courses-registry';
import type { LearningState } from '@/lib/learning';
import type { Navigation } from './types';

export function CasesView({
  state,
  go,
  activeCourse = 'endocrinology',
}: {
  state: LearningState;
  go: Navigation;
  activeCourse?: CourseId;
}) {
  const course = getCourse(activeCourse);
  const { lessons, cases, modulesList } = course;
  const [moduleFilter, setModuleFilter] = useState<string>('all');
  const [diffFilter, setDiffFilter] = useState<'all' | 'Podstawowy' | 'Zaawansowany'>('all');

  const filteredCases = cases.filter(c => {
    if (diffFilter !== 'all' && c.difficulty !== diffFilter) return false;
    if (moduleFilter === 'all') return true;
    const lesson = lessons.find(l => l.id === c.lessonId);
    return lesson?.moduleId === moduleFilter;
  });

  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">ZASTOSUJ WIEDZĘ</p>
        <h1>Spotkaj się z praktyką</h1>
        <p>{cases.length} fikcyjnych pacjentów. Cztery etapy: objawy, badania, rozpoznanie i postępowanie.</p>
      </div>

      <div className="filter-bar" style={{ marginBottom: '12px' }} aria-label="Wybór działu medycznego">
        <button
          className={moduleFilter === 'all' ? 'active' : ''}
          onClick={() => setModuleFilter('all')}
        >
          Wszystkie działy ({cases.length})
        </button>
        {modulesList.map(m => {
          const count = cases.filter(c => {
            const l = lessons.find(les => les.id === c.lessonId);
            return l?.moduleId === m.id;
          }).length;
          if (count === 0) return null;
          return (
            <button
              key={m.id}
              className={moduleFilter === m.id ? 'active' : ''}
              onClick={() => setModuleFilter(m.id)}
            >
              {m.name} ({count})
            </button>
          );
        })}
      </div>

      <div className="filter-bar" aria-label="Poziom trudności">
        {[
          ['all', 'Wszystkie poziomy'],
          ['Podstawowy', 'Podstawowe'],
          ['Zaawansowany', 'Zaawansowane'],
        ].map(([value, label]) => (
          <button
            className={diffFilter === value ? 'active' : ''}
            aria-pressed={diffFilter === value}
            key={value}
            onClick={() => setDiffFilter(value as typeof diffFilter)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="cases-grid">
        {filteredCases.map(c => (
          <button className="case-card" key={c.id} onClick={() => go(`case/${c.id}`)}>
            <div className="case-card-top">
              <span className="case-icon">
                <Stethoscope size={22} />
              </span>
              <span className={`difficulty ${c.difficulty === 'Zaawansowany' ? 'advanced-badge' : ''}`}>
                {c.difficulty}
              </span>
            </div>
            <small>{c.patient}</small>
            <h2>{c.title}</h2>
            <p>{c.intro}</p>
            <div className="case-card-footer">
              <span>
                {state.attempts.some(a => a.target_id === c.id)
                  ? 'Ukończono · rozwiąż ponownie'
                  : '4 decyzje kliniczne'}
              </span>
              <ArrowRight size={18} />
            </div>
          </button>
        ))}
      </div>
      <p className="small">
        Przypadki są fikcyjne. Po każdej decyzji poznasz uzasadnienie; dalszy etap pokazuje przebieg po
        prawidłowym postępowaniu.
      </p>
    </>
  );
}
