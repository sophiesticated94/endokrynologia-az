'use client';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Clock,
  GraduationCap,
  Layers3,
  Stethoscope,
  Activity,
} from 'lucide-react';
import { lessons } from '@/lib/course';
import { cases } from '@/lib/cases';
import type { LearningState } from '@/lib/learning';
import { ThyroidArt } from '../course-ui';
import type { Navigation } from './types';
import { LessonRow } from './lesson-row';

export function Dashboard({
  state,
  go,
  due,
  newCount,
}: {
  state: LearningState;
  go: Navigation;
  due: number;
  newCount: number;
}) {
  const next = lessons.find(l => !state.completed.includes(l.id)) ?? lessons[0];
  const percent = Math.round((state.completed.length / lessons.length) * 100);

  return (
    <>
      <div className="page-heading home-heading">
        <div>
          <p className="eyebrow">TWOJA CODZIENNA DAWKA WIEDZY</p>
          <h1>{state.completed.length ? 'Wracamy do nauki.' : 'Dobrze Cię widzieć.'}</h1>
          <p>Endokrynologia staje się prostsza, gdy rozumiesz jej podstawy.</p>
        </div>
        <span className="level-label">
          <GraduationCap size={18} />
          {state.level === 'doctor' ? 'Poziom lekarski' : 'Poziom studencki'}
        </span>
      </div>

      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">
            {next.moduleId === 'otylosc'
              ? 'MODUŁ 08 · OTYŁOŚĆ I ZABURZENIA LIPIDOWE'
              : next.moduleId === 'nen'
                ? 'MODUŁ 07 · NOWOTWORY NEUROENDOKRYNNE'
                : next.moduleId === 'gonady'
                  ? 'MODUŁ 06 · GONADY'
                  : next.moduleId === 'cukrzyca'
                    ? 'MODUŁ 05 · CUKRZYCA'
                    : next.moduleId === 'przytarczyce'
                      ? 'MODUŁ 04 · PRZYTARCZYCE'
                      : next.moduleId === 'nadnercza'
                        ? 'MODUŁ 03 · NADNERCZA'
                        : next.moduleId === 'przysadka'
                          ? 'MODUŁ 02 · PRZYSADKA'
                          : 'MODUŁ 01 · TARCZYCA'}
          </span>
          <h2>
            {next.moduleId === 'otylosc' ? (
              <>
                Metabolizm i lipidy.
                <br />
                GLP-1, bariatria i PCSK9.
              </>
            ) : next.moduleId === 'nen' ? (
              <>
                Onkologia endokrynna.
                <br />
                NEN, MEN i celowana PRRT.
              </>
            ) : next.moduleId === 'gonady' ? (
              <>
                Medycyna rozrodu.
                <br />
                Oś HPG, TRT i GAHT.
              </>
            ) : next.moduleId === 'cukrzyca' ? (
              <>
                Gospodarka glukozą.
                <br />
                Insulina, CGM i pompy.
              </>
            ) : next.moduleId === 'przytarczyce' ? (
              <>
                Wapń i fosfor.
                <br />
                Przytarczyce i kości.
              </>
            ) : next.moduleId === 'nadnercza' ? (
              <>
                Czapki nerkowe.
                <br />
                Kortyzol i katecholaminy.
              </>
            ) : next.moduleId === 'przysadka' ? (
              <>
                Dyrygent orkiestry.
                <br />
                Siodło i podwzgórze.
              </>
            ) : (
              <>
                Mały gruczoł.
                <br />
                Wielkie znaczenie.
              </>
            )}
          </h2>
          <p>
            {next.moduleId === 'otylosc'
              ? 'Od adipobiologii i agonizmu GLP-1/GIP po kwalifikację IFSO 2023, MASLD/MASH, hipercholesterolemię rodzinną i model Halla.'
              : next.moduleId === 'nen'
                ? 'Od biologii CgA/5-HIAA i klasyfikacji WHO po guzy pNET, zespoły MEN1/2/4, dozymetrię PRRT i schemat CAPTEM.'
                : next.moduleId === 'gonady'
                  ? 'Od generatora pulsów GnRH i hipogonadyzmu po PCOS, MHT, procedury IVF/OHSS, tranzycję i równanie Vermeulena.'
                  : next.moduleId === 'cukrzyca'
                    ? 'Od fizjologii komórki beta i nowoczesnych analogów po DKA/HHS, algorytmy pomp i interpretację CGM.'
                    : next.moduleId === 'przytarczyce'
                      ? 'Od pierwotnej nadczynności i tężyczki po przełom hiperkalcemiczny, zespół głodnych kości i osteoporozę.'
                      : next.moduleId === 'nadnercza'
                        ? 'Od choroby Addisona i przełomu nadnerczowego po zespół Conna, pheochromocytoma i raka ACC.'
                        : next.moduleId === 'przysadka'
                          ? 'Od gruczolaków i zaburzeń pola widzenia po moczówkę prostą i SIADH.'
                          : 'Od osi hormonalnej po decyzje przy łóżku pacjenta. Poznaj tarczycę krok po kroku.'}
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="primary" onClick={() => go(`lesson/${next.id}`)}>
              {state.completed.length ? 'Kontynuuj naukę' : 'Rozpocznij naukę'}
              <ArrowRight size={18} />
            </button>
            <button className="secondary" onClick={() => go('simulator')}>
              <Activity size={17} /> Symulatory kliniczne
            </button>
          </div>
          <div className="hero-meta">
            <BookOpen size={15} />
            {lessons.length} lekcji (8 modułów)
            <span>·</span>
            <Clock size={15} />
            około 35 godzin nauki
          </div>
        </div>

        <ThyroidArt />
      </section>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon teal">
            <BookOpen size={22} />
          </div>
          <div>
            <small>Ukończone lekcje</small>
            <strong>
              {state.completed.length}
              <span> / {lessons.length}</span>
            </strong>
          </div>
          <div
            className="mini-ring"
            style={{ background: `conic-gradient(#177d6d ${percent}%,#e8efec 0)` }}
          >
            <span>{percent}%</span>
          </div>
        </div>

        <button className="stat-card" onClick={() => go('cards')}>
          <div className="stat-icon peach">
            <Layers3 size={22} />
          </div>
          <div>
            <small>Fiszki do powtórki</small>
            <strong>
              {due}
              <span> + {newCount} nowych</span>
            </strong>
          </div>
          <ArrowUpRight size={19} />
        </button>

        <button className="stat-card" onClick={() => go('cases')}>
          <div className="stat-icon blue">
            <Stethoscope size={22} />
          </div>
          <div>
            <small>Przypadki ukończone</small>
            <strong>
              {new Set(state.attempts.filter(a => a.kind === 'case').map(a => a.target_id)).size}
              <span> / {cases.length}</span>
            </strong>
          </div>
          <ArrowUpRight size={19} />
        </button>
      </div>

      <div className="dashboard-columns">
        <section>
          <div className="section-heading">
            <div>
              <h2>Twój następny krok</h2>
              <small style={{ color: '#687771', display: 'block', marginTop: '2px' }}>
                Kolejne 3 lekcje w kolejce · Pełny program liczy {lessons.length} lekcji
              </small>
            </div>
            <button className="text-button" onClick={() => go('course')}>
              Cały program ({lessons.length})
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="lesson-list">
            {(() => {
              const nextIdx = Math.max(0, lessons.indexOf(next));
              const startIdx = Math.min(nextIdx, Math.max(0, lessons.length - 3));
              return lessons.slice(startIdx, startIdx + 3).map(l => (
                <LessonRow key={l.id} lesson={l} state={state} go={go} />
              ));
            })()}
          </div>
        </section>

        <section className="practice-card">
          <span className="eyebrow">WIEDZA W PRAKTYCE</span>
          <div className="practice-symbol">
            <Stethoscope size={30} />
          </div>
          <h2>
            Co zrobisz
            <br />
            jako pierwsze?
          </h2>
          <p>Objawy, wyniki, decyzja. Sprawdź swoje rozumowanie na fikcyjnym przypadku.</p>
          <button className="text-button" onClick={() => go(`case/${cases[2].id}`)}>
            Poznaj pacjentkę
            <ArrowRight size={17} />
          </button>
        </section>
      </div>
    </>
  );
}
