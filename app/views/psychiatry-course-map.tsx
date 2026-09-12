'use client';
import { useState } from 'react';
import { LockKeyhole } from 'lucide-react';
import {
  psychiatryLessons,
  psychiatryPlannedModules,
} from '@/lib/course-psychiatry';
import type { LearningState } from '@/lib/learning';
import { LessonRow } from './lesson-row';
import type { Navigation } from './types';

export function PsychiatryCourseMap({ state, go }: { state: LearningState; go: Navigation }) {
  const [activeTab, setActiveTab] = useState<
    'all' | 'psych-afektywne' | 'psych-farmakologia' | 'psych-organiczne'
  >('all');

  const afektywneLessons = psychiatryLessons.filter(l => l.moduleId === 'psych-afektywne');
  const farmakologiaLessons = psychiatryLessons.filter(l => l.moduleId === 'psych-farmakologia');
  const organiczneLessons = psychiatryLessons.filter(l => l.moduleId === 'psych-organiczne');

  const afektywneGroups = Array.from(new Set(afektywneLessons.map(l => l.group)));
  const farmakologiaGroups = Array.from(new Set(farmakologiaLessons.map(l => l.group)));
  const organiczneGroups = Array.from(new Set(organiczneLessons.map(l => l.group)));

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
          Moduł 01: Fundamenty i diagnostyka ({afektywneLessons.length})
        </button>
        <button
          className={activeTab === 'psych-farmakologia' ? 'active' : ''}
          onClick={() => setActiveTab('psych-farmakologia')}
        >
          Moduł 02: Psychofarmakologia i leczenie ({farmakologiaLessons.length})
        </button>
        <button
          className={activeTab === 'psych-organiczne' ? 'active' : ''}
          onClick={() => setActiveTab('psych-organiczne')}
        >
          Moduł 03: Organiczna i geriatria ({organiczneLessons.length})
        </button>
      </div>

      <div className="course-curriculum">
        {/* Moduł 01 */}
        {(activeTab === 'all' || activeTab === 'psych-afektywne') && (
          <section className="module-group">
            <header className="module-header">
              <span className="eyebrow">MODUŁ 01 · {afektywneLessons.length} LEKCJI</span>
              <h2>Fundamenty psychiatrii i diagnostyka kliniczna</h2>
              <p>MSE, DSM-5-TR, ICD-11 CDDR, psychopatologia, depresja, mania, psychozy, lęk, OCD, PTSD, ADHD, zaburzenia osobowości i diagnostyka różnicowa.</p>
            </header>

            {afektywneGroups.map(group => (
              <div key={group} className="subgroup">
                <h3>{group}</h3>
                <div className="lesson-list">
                  {afektywneLessons
                    .filter(l => l.group === group)
                    .map(l => (
                      <LessonRow key={l.id} lesson={l} state={state} go={go} />
                    ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Moduł 02 */}
        {(activeTab === 'all' || activeTab === 'psych-farmakologia') && (
          <section className="module-group">
            <header className="module-header">
              <span className="eyebrow">MODUŁ 02 · {farmakologiaLessons.length} LEKCJI</span>
              <h2>Psychofarmakologia kliniczna i leczenie biologiczne</h2>
              <p>PK/PD, SERT/NET/DAT, okno Kapura D2/D3, 5-HT, Glu/GABA, SSRI/SNRI/TLPD, atypowe, stabilizatory, SGA, TDM, PGx, powikłania, ECT/rTMS.</p>
            </header>

            {farmakologiaGroups.map(group => (
              <div key={group} className="subgroup">
                <h3>{group}</h3>
                <div className="lesson-list">
                  {farmakologiaLessons
                    .filter(l => l.group === group)
                    .map(l => (
                      <LessonRow key={l.id} lesson={l} state={state} go={go} />
                    ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Moduł 03 */}
        {(activeTab === 'all' || activeTab === 'psych-organiczne') && (
          <section className="module-group">
            <header className="module-header">
              <span className="eyebrow">MODUŁ 03 · {organiczneLessons.length} LEKCJI</span>
              <h2>Psychiatria organiczna, neurokognitywna i wieku podeszłego</h2>
              <p>Rozumowanie osiowe: pierwotne vs wtórne zaburzenia mózgu. Majaczenie (4AT, fenotyp hipoaktywny), otępienia (AD, DLB, VaD, FTD), kryteria Beers 2023, ciężar antycholinergiczny ACB, postępowanie w BPSD, zespoły gwałtownie postępujące (RPD) oraz ocena zdolności decyzyjnej i ochrona prawna pacjenta.</p>
            </header>

            {organiczneGroups.map(group => (
              <div key={group} className="subgroup">
                <h3>{group}</h3>
                <div className="lesson-list">
                  {organiczneLessons
                    .filter(l => l.group === group)
                    .map(l => (
                      <LessonRow key={l.id} lesson={l} state={state} go={go} />
                    ))}
                </div>
              </div>
            ))}
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
