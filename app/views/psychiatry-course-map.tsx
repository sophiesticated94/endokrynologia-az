'use client';
import { useState } from 'react';
import { LockKeyhole, BrainCircuit, Sparkles } from 'lucide-react';
import {
  psychiatryLessons,
  psychiatryPlannedModules,
} from '@/lib/course-psychiatry';
import type { LearningState } from '@/lib/learning';
import { LessonRow } from './lesson-row';
import type { Navigation } from './types';

export function PsychiatryCourseMap({ state, go }: { state: LearningState; go: Navigation }) {
  const [activeTab, setActiveTab] = useState<'all' | 'psych-afektywne' | 'psych-farmakologia'>('all');

  const afektywneCount = psychiatryLessons.filter(l => l.moduleId === 'psych-afektywne').length;
  const farmakologiaCount = psychiatryLessons.filter(l => l.moduleId === 'psych-farmakologia').length;

  const clinicalAfektywne = psychiatryLessons.filter(l => l.group === 'Klinika zaburzeń afektywnych');
  const neuroAfektywne = psychiatryLessons.filter(l => l.group === 'Neurobiologia i biochemia nastroju');
  const lekiFarmakologia = psychiatryLessons.filter(l => l.group === 'Leki przeciwdepresyjne i stabilizatory');
  const safetyFarmakologia = psychiatryLessons.filter(l => l.group === 'Bezpieczeństwo i stany nagłe');

  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">ICD-11 CDDR · DSM-5-TR · MAUDSLEY 15TH · AGNP 2026</p>
        <h1>Mapa Psychiatrii i Psychofarmakologii</h1>
        <p>Wybierz moduł lub poznawaj mechanizmy neurobiologiczne i decyzje kliniczne krok po kroku.</p>
      </div>

      <div className="filter-bar" aria-label="Wybór modułu psychiatrii">
        <button
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => setActiveTab('all')}
        >
          Wszystkie działy ({psychiatryLessons.length} lekcji)
        </button>
        <button
          className={activeTab === 'psych-afektywne' ? 'active' : ''}
          onClick={() => setActiveTab('psych-afektywne')}
        >
          Moduł 01: Zaburzenia afektywne i neurobiologia ({afektywneCount})
        </button>
        <button
          className={activeTab === 'psych-farmakologia' ? 'active' : ''}
          onClick={() => setActiveTab('psych-farmakologia')}
        >
          Moduł 02: Psychofarmakologia i receptory ({farmakologiaCount})
        </button>
      </div>

      <div className="course-curriculum">
        {/* Moduł 01 */}
        {(activeTab === 'all' || activeTab === 'psych-afektywne') && (
          <section className="module-group">
            <header className="module-header">
              <span className="eyebrow">MODUŁ 01 · 10 LEKCJI</span>
              <h2>Zaburzenia afektywne i neurobiologia nastroju</h2>
              <p>ICD-11 CDDR 2024, DSM-5-TR, szlak BDNF/TrkB, oś HPA, modele kinetyki i diagnostyka różnicowa ChAD vs MDD.</p>
            </header>

            <div className="subgroup">
              <h3>Klinika zaburzeń afektywnych</h3>
              <div className="lesson-list">
                {clinicalAfektywne.map(l => (
                  <LessonRow key={l.id} lesson={l} state={state} go={go} />
                ))}
              </div>
            </div>

            <div className="subgroup">
              <h3>Neurobiologia, biochemia i modele nastroju</h3>
              <div className="lesson-list">
                {neuroAfektywne.map(l => (
                  <LessonRow key={l.id} lesson={l} state={state} go={go} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Moduł 02 */}
        {(activeTab === 'all' || activeTab === 'psych-farmakologia') && (
          <section className="module-group">
            <header className="module-header">
              <span className="eyebrow">MODUŁ 02 · 11 LEKCJI</span>
              <h2>Psychofarmakologia kliniczna i receptorologia</h2>
              <p>Maudsley 15th ed., TDM AGNP 2026, fenotypy CPIC, badania PET (Meyer/Kapur), zespół serotoninowy Huntera i NMS.</p>
            </header>

            <div className="subgroup">
              <h3>Leki przeciwdepresyjne i stabilizatory nastroju</h3>
              <div className="lesson-list">
                {lekiFarmakologia.map(l => (
                  <LessonRow key={l.id} lesson={l} state={state} go={go} />
                ))}
              </div>
            </div>

            <div className="subgroup">
              <h3>Farmakogenetyka, bezpieczeństwo i stany nagłe</h3>
              <div className="lesson-list">
                {safetyFarmakologia.map(l => (
                  <LessonRow key={l.id} lesson={l} state={state} go={go} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Planowane moduły */}
        <section className="panel" style={{ marginTop: '30px' }}>
          <span className="eyebrow">ROZWÓJ KURSU</span>
          <h3>Kolejne moduły psychiatrii w opracowaniu</h3>
          <div className="planned-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginTop: '12px' }}>
            {psychiatryPlannedModules.map((name, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'var(--bg-subtle)', borderRadius: '8px' }}>
                <LockKeyhole size={16} color="var(--text-muted)" />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
