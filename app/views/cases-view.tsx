'use client';
import { useState } from 'react';
import { ArrowRight, Stethoscope } from 'lucide-react';
import { lessons } from '@/lib/course';
import { cases } from '@/lib/cases';
import type { LearningState } from '@/lib/learning';
import type { Navigation } from './types';

export function CasesView({ state, go }: { state: LearningState; go: Navigation }) {
  const [moduleFilter, setModuleFilter] = useState<'all' | 'tarczyca' | 'przysadka' | 'nadnercza' | 'przytarczyce' | 'cukrzyca' | 'gonady' | 'nen' | 'otylosc'>('all');
  const [diffFilter, setDiffFilter] = useState<'all' | 'Podstawowy' | 'Zaawansowany'>('all');

  const thyroidCount = cases.filter(c => {
    const l = lessons.find(les => les.id === c.lessonId);
    return l?.moduleId === 'tarczyca';
  }).length;
  const pituitaryCount = cases.filter(c => {
    const l = lessons.find(les => les.id === c.lessonId);
    return l?.moduleId === 'przysadka';
  }).length;
  const adrenalCount = cases.filter(c => {
    const l = lessons.find(les => les.id === c.lessonId);
    return l?.moduleId === 'nadnercza';
  }).length;
  const parathyroidCount = cases.filter(c => {
    const l = lessons.find(les => les.id === c.lessonId);
    return l?.moduleId === 'przytarczyce';
  }).length;
  const diabetesCount = cases.filter(c => {
    const l = lessons.find(les => les.id === c.lessonId);
    return l?.moduleId === 'cukrzyca';
  }).length;
  const gonadCount = cases.filter(c => {
    const l = lessons.find(les => les.id === c.lessonId);
    return l?.moduleId === 'gonady';
  }).length;
  const nenCount = cases.filter(c => {
    const l = lessons.find(les => les.id === c.lessonId);
    return l?.moduleId === 'nen';
  }).length;
  const otyloscCount = cases.filter(c => {
    const l = lessons.find(les => les.id === c.lessonId);
    return l?.moduleId === 'otylosc';
  }).length;

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
        <button
          className={moduleFilter === 'tarczyca' ? 'active' : ''}
          onClick={() => setModuleFilter('tarczyca')}
        >
          Moduł 01: Tarczyca ({thyroidCount})
        </button>
        <button
          className={moduleFilter === 'przysadka' ? 'active' : ''}
          onClick={() => setModuleFilter('przysadka')}
        >
          Moduł 02: Przysadka i podwzgórze ({pituitaryCount})
        </button>
        <button
          className={moduleFilter === 'nadnercza' ? 'active' : ''}
          onClick={() => setModuleFilter('nadnercza')}
        >
          Moduł 03: Nadnercza ({adrenalCount})
        </button>
        <button
          className={moduleFilter === 'przytarczyce' ? 'active' : ''}
          onClick={() => setModuleFilter('przytarczyce')}
        >
          Moduł 04: Przytarczyce i Ca–P ({parathyroidCount})
        </button>
        <button
          className={moduleFilter === 'cukrzyca' ? 'active' : ''}
          onClick={() => setModuleFilter('cukrzyca')}
        >
          Moduł 05: Cukrzyca ({diabetesCount})
        </button>
        <button
          className={moduleFilter === 'gonady' ? 'active' : ''}
          onClick={() => setModuleFilter('gonady')}
        >
          Moduł 06: Gonady ({gonadCount})
        </button>
        <button
          className={moduleFilter === 'nen' ? 'active' : ''}
          onClick={() => setModuleFilter('nen')}
        >
          Moduł 07: NEN i MEN ({nenCount})
        </button>
        <button
          className={moduleFilter === 'otylosc' ? 'active' : ''}
          onClick={() => setModuleFilter('otylosc')}
        >
          Moduł 08: Otyłość i lipidy ({otyloscCount})
        </button>
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
            onClick={() => setDiffFilter(value as any)}
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
