'use client';
import { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  Layers3,
  Stethoscope,
  LockKeyhole,
  Lightbulb,
  Activity,
  BookA,
} from 'lucide-react';
import { lessons, plannedModules, type Lesson } from '@/lib/course';
import { cases } from '@/lib/cases';
import type { LearningState } from '@/lib/learning';
import { SourceList, ThyroidArt } from './course-ui';
import { GlossaryText } from './glossary-components';
import {
  ThyroidAxisDiagram,
  LabMatrixDiagram,
  ThyroiditisCurveDiagram,
  EuTiradsVisualGuide,
  OrbitopathyEyeDiagram,
  PregnancyThyroidCurve,
  CancerHistologyDiagram,
} from './medical-diagrams';
import {
  PituitaryAnatomyDiagram,
  ChiasmFieldDiagram,
  OgttGrowthHormoneCurve,
  CushingDiagnosticPathway,
  WaterBalanceMatrix,
  SheehanSyndromeDiagram,
} from './pituitary-diagrams';
import { HptSimulator } from './hpt-simulator';
import { PituitarySimulator } from './pituitary-simulator';

export type Route =
  | 'home'
  | 'course'
  | 'cases'
  | 'cards'
  | 'exam'
  | 'results'
  | 'account'
  | 'simulator'
  | 'glossary'
  | `lesson/${string}`
  | `quiz/${string}`
  | `case/${string}`;

type Navigation = (route: Route) => void;

function LessonRow({ lesson: l, state, go }: { lesson: Lesson; state: LearningState; go: Navigation }) {
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
          <span className="badge">
            {next.moduleId === 'przysadka' ? 'MODUŁ 02 · PRZYSADKA' : 'MODUŁ 01 · TARCZYCA'}
          </span>
          <h2>
            {next.moduleId === 'przysadka' ? (
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
            {next.moduleId === 'przysadka'
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
            {lessons.length} lekcji (2 moduły)
            <span>·</span>
            <Clock size={15} />
            około 6 godzin nauki
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
              <span> / 12</span>
            </strong>
          </div>
          <ArrowUpRight size={19} />
        </button>
      </div>

      <div className="dashboard-columns">
        <section>
          <div className="section-heading">
            <h2>Twój następny krok</h2>
            <button className="text-button" onClick={() => go('course')}>
              Cały program
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="lesson-list">
            {lessons
              .slice(Math.min(lessons.indexOf(next), 9), Math.min(lessons.indexOf(next), 9) + 3)
              .map(l => (
                <LessonRow key={l.id} lesson={l} state={state} go={go} />
              ))}
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

export function CourseMap({ state, go }: { state: LearningState; go: Navigation }) {
  const [activeTab, setActiveTab] = useState<'all' | 'tarczyca' | 'przysadka'>('all');

  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">OD PODSTAW DO PRAKTYKI</p>
        <h1>Twoja mapa endokrynologii</h1>
        <p>Wybierz moduł lub przeglądaj cały program edukacyjny krok po kroku.</p>
      </div>

      <div className="filter-bar" aria-label="Wybór modułu">
        <button
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => setActiveTab('all')}
        >
          Wszystkie działy ({lessons.length} lekcji)
        </button>
        <button
          className={activeTab === 'tarczyca' ? 'active' : ''}
          onClick={() => setActiveTab('tarczyca')}
        >
          Moduł 01: Tarczyca (12)
        </button>
        <button
          className={activeTab === 'przysadka' ? 'active' : ''}
          onClick={() => setActiveTab('przysadka')}
        >
          Moduł 02: Przysadka i podwzgórze (12)
        </button>
      </div>

      {/* Moduł 01: Tarczyca */}
      {(activeTab === 'all' || activeTab === 'tarczyca') && (
        <div style={{ marginBottom: '40px' }}>
          <section className="module-header">
            <span className="module-number">01</span>
            <div>
              <h2>Tarczyca</h2>
              <p>12 lekcji · 60 pytań · dwa poziomy szczegółowości · Symulator HPT</p>
            </div>
            <span className="badge">DOSTĘPNY</span>
          </section>

          {['Fundamenty', 'Praktyka kliniczna', 'Sytuacje szczególne'].map(group => {
            const groupLessons = lessons.filter(l => l.moduleId === 'tarczyca' && l.group === group);
            if (!groupLessons.length) return null;
            return (
              <section key={`t-${group}`} className="course-group">
                <h3>{group}</h3>
                <div className="lesson-list">
                  {groupLessons.map(l => (
                    <LessonRow key={l.id} lesson={l} state={state} go={go} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* Moduł 02: Przysadka i podwzgórze */}
      {(activeTab === 'all' || activeTab === 'przysadka') && (
        <div style={{ marginBottom: '40px' }}>
          <section className="module-header" style={{ background: '#eaf1f7', borderColor: '#c4d8e7' }}>
            <span className="module-number" style={{ color: '#45779e' }}>02</span>
            <div>
              <h2>Przysadka i podwzgórze</h2>
              <p>12 lekcji · 60 pytań · Gruczolaki, akromegalia, Cushing, moczówka i SIADH · Konsola Przysadkowa</p>
            </div>
            <span className="badge" style={{ color: '#255b85', borderColor: '#adc8dd', background: '#ffffffcc' }}>DOSTĘPNY</span>
          </section>

          {['Fundamenty', 'Gruczolaki i hipersekrecja', 'Niedoczynność i gospodarka wodna', 'Sytuacje szczególne i chirurgia'].map(group => {
            const groupLessons = lessons.filter(l => l.moduleId === 'przysadka' && l.group === group);
            if (!groupLessons.length) return null;
            return (
              <section key={`p-${group}`} className="course-group">
                <h3>{group}</h3>
                <div className="lesson-list">
                  {groupLessons.map(l => (
                    <LessonRow key={l.id} lesson={l} state={state} go={go} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      <h2 className="spaced-heading">Dalsza część Twojej ścieżki</h2>
      <div className="planned-grid">
        {plannedModules.map((name, i) => (
          <div className="planned-card" key={name}>
            <span>{String(i + 3).padStart(2, '0')}</span>
            <h3>{name}</h3>
            <small>
              <LockKeyhole size={13} />
              Planowany moduł
            </small>
          </div>
        ))}
      </div>
    </>
  );
}

export function LessonView({
  lesson,
  state,
  go,
  blocked,
  complete,
  advanced,
}: {
  lesson: Lesson;
  state: LearningState;
  go: Navigation;
  blocked: boolean;
  complete: () => void;
  advanced: () => void;
}) {
  const moduleLessons = lessons.filter(l => l.moduleId === lesson.moduleId);
  const lessonNum = moduleLessons.indexOf(lesson) + 1;
  const moduleLabel = lesson.moduleId === 'przysadka' ? 'MODUŁ 02: PRZYSADKA' : 'MODUŁ 01: TARCZYCA';

  return (
    <div className="lesson-layout">
      <article className="reading lesson-reading">
        <button className="text-button" onClick={() => go('course')}>
          <ArrowLeft size={16} />
          Mapa kursu
        </button>

        <div className="page-heading">
          <p className="eyebrow">
            LEKCJA {String(lessonNum).padStart(2, '0')} / {moduleLessons.length} · {moduleLabel} ·{' '}
            {lesson.group.toUpperCase()}
          </p>
          <h1>{lesson.title}</h1>
          <p>{lesson.subtitle}</p>
          <div className="article-meta">
            <Clock size={16} />
            {lesson.minutes} min
            <GraduationCap size={16} />
            {state.level === 'doctor' ? 'Podstawy + rozszerzenie lekarskie' : 'Podstawy'}
          </div>
        </div>

        <div className="goals">
          <h3>Po tej lekcji</h3>
          {lesson.goals.map(goal => (
            <p key={goal}>
              <CheckCircle2 size={17} />
              <GlossaryText text={goal} />
            </p>
          ))}
        </div>

        {lesson.sections.map((section, i) => (
          <section key={section.title} id={`section-${i}`} className="lesson-section">
            <span className="eyebrow">0{i + 1}</span>
            <h2>{section.title}</h2>
            <p>
              <GlossaryText text={section.text} />
            </p>

            {/* Osadzone wykresy i schematy medyczne — Tarczyca */}
            {lesson.id === 'fizjologia' && i === 0 && <ThyroidAxisDiagram />}
            {lesson.id === 'diagnostyka' && i === 1 && <LabMatrixDiagram />}
            {lesson.id === 'graves' && i === 1 && <OrbitopathyEyeDiagram />}
            {lesson.id === 'zapalenia' && i === 0 && <ThyroiditisCurveDiagram />}
            {lesson.id === 'guzki' && i === 1 && <EuTiradsVisualGuide />}
            {lesson.id === 'nowotwory' && i === 0 && <CancerHistologyDiagram />}
            {lesson.id === 'ciaza' && i === 0 && <PregnancyThyroidCurve />}

            {/* Osadzone wykresy i schematy medyczne — Przysadka */}
            {lesson.id === 'przysadka-fizjologia' && i === 0 && <PituitaryAnatomyDiagram />}
            {lesson.id === 'guzy-nieczynne' && i === 0 && <ChiasmFieldDiagram />}
            {lesson.id === 'akromegalia' && i === 1 && <OgttGrowthHormoneCurve />}
            {lesson.id === 'cushing-choroba' && i === 1 && <CushingDiagnosticPathway />}
            {lesson.id === 'moczowka-prosta' && i === 1 && <WaterBalanceMatrix />}
            {lesson.id === 'hipopituitaryzm' && i === 0 && <SheehanSyndromeDiagram />}
          </section>
        ))}

        {/* Tabela podsumowująca */}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {lesson.table.headers.map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lesson.table.rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx}>
                      <GlossaryText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Zwiastun symulatora w Lekcji 1 */}
        {lesson.id === 'fizjologia' && (
          <div className="simulator-teaser-card">
            <div className="teaser-content">
              <div className="teaser-icon">
                <Activity size={26} />
              </div>
              <div>
                <span className="eyebrow">INTERAKTYWNY MODEL FIZJOLOGICZNY</span>
                <h3>Chcesz sprawdzić ujemne sprzężenie zwrotne w akcji?</h3>
                <p>
                  W <strong>Lekcji 2 („Czytaj wyniki ze zrozumieniem”)</strong> czeka na Ciebie
                  pełny interaktywny <strong>Symulator Osi HPT</strong>. Nauczysz się tam łączyć stężenia TSH i FT4
                  w pary diagnostyczne, a także testować wpływ leków i przeciwciał TRAb.
                </p>
                <div className="teaser-actions">
                  <button
                    type="button"
                    className="primary"
                    onClick={() => go('lesson/diagnostyka')}
                  >
                    Przejdź do Lekcji 2 z symulatorem <ArrowRight size={15} />
                  </button>
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => go('simulator')}
                  >
                    Otwórz pełny symulator z legendą
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pełny Symulator osi HPT osadzony bezpośrednio w Lekcji 2 (Diagnostyka laboratoryjna) */}
        {lesson.id === 'diagnostyka' && (
          <div style={{ margin: '36px 0' }}>
            <HptSimulator embedded />
          </div>
        )}

        {/* Zwiastun konsoli przysadkowej w Lekcji 1 Przysadki */}
        {lesson.id === 'przysadka-fizjologia' && (
          <div className="simulator-teaser-card" style={{ background: '#edf4f8', borderColor: '#c7dce9' }}>
            <div className="teaser-content">
              <div className="teaser-icon" style={{ background: '#dceaf3', color: '#255b85' }}>
                <Activity size={26} />
              </div>
              <div>
                <span className="eyebrow" style={{ color: '#255b85' }}>INTERAKTYWNA KONSOLA KLINICZNA</span>
                <h3>Chcesz przetestować osie przysadki, testy i pole widzenia?</h3>
                <p>
                  W <strong>Lekcji 2 („Rozszyfruj przysadkę”)</strong> czeka na Ciebie
                  pełna <strong>Kliniczna Konsola Przysadkowo-Podwzgórzowa</strong>. Możesz w niej
                  badać osie PRL, GH, ACTH, AVP, przeprowadzać testy dynamiczne (OGTT, deksametazon, dDAVP)
                  oraz symulować ubytki pola widzenia (hemianopsia bitemporalis) i porażenie nerwów zatoki jamistej.
                </p>
                <div className="teaser-actions">
                  <button
                    type="button"
                    className="primary"
                    onClick={() => go('lesson/przysadka-diagnostyka')}
                  >
                    Przejdź do Lekcji 2 z konsolą <ArrowRight size={15} />
                  </button>
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => go('simulator')}
                  >
                    Otwórz symulatory
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pełna Konsola Przysadkowa w Lekcji 2 Przysadki */}
        {lesson.id === 'przysadka-diagnostyka' && (
          <div style={{ margin: '36px 0' }}>
            <PituitarySimulator embedded />
          </div>
        )}


        {/* Rozszerzenie dla lekarza */}
        {state.level === 'doctor' ? (
          <section className="advanced">
            <span className="eyebrow">
              <GraduationCap size={17} /> ROZSZERZENIE DLA LEKARZA
            </span>
            <h2>O krok dalej</h2>
            <p>
              <GlossaryText text={lesson.advanced} />
            </p>
          </section>
        ) : (
          <button className="advanced-toggle" disabled={blocked} onClick={advanced}>
            <GraduationCap size={20} />
            <span>Pokaż rozszerzenie dla lekarza</span>
            <ChevronRight size={18} />
          </button>
        )}

        <div className="takeaway">
          <Lightbulb size={24} />
          <div>
            <h3>Zapamiętaj przede wszystkim</h3>
            <p>
              <GlossaryText text={lesson.summary} />
            </p>
          </div>
        </div>

        <div className="lesson-finish">
          <button
            className="secondary"
            disabled={blocked || state.completed.includes(lesson.id)}
            onClick={complete}
          >
            <Check size={17} />
            {state.completed.includes(lesson.id) ? 'Lekcja ukończona' : 'Oznacz jako ukończoną'}
          </button>
          <button className="primary" onClick={() => go(`quiz/${lesson.id}`)}>
            Sprawdź wiedzę
            <ArrowRight size={17} />
          </button>
        </div>

        <SourceList lesson={lesson} />
      </article>

      <aside className="lesson-aside">
        <p className="eyebrow">W TEJ LEKCJI</p>
        {lesson.sections.map((s, i) => (
          <a
            href={`#section-${i}`}
            key={s.title}
            onClick={e => {
              e.preventDefault();
              document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {s.title}
          </a>
        ))}
        <hr />
        <strong>Teoria spotyka praktykę</strong>
        <p>Przećwicz ten temat na przypadku klinicznym.</p>
        <button className="text-button" onClick={() => go(`case/case-${lesson.id}`)}>
          Otwórz przypadek
          <ArrowUpRight size={15} />
        </button>

        <hr />
        <strong>Szybkie narzędzia</strong>
        <button
          className="text-button"
          onClick={() => go('simulator')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}
        >
          <Activity size={14} /> Symulator osi HPT
        </button>
        <button
          className="text-button"
          onClick={() => go('glossary')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}
        >
          <BookA size={14} /> Słowniczek pojęć
        </button>
      </aside>
    </div>
  );
}

export function CasesView({ state, go }: { state: LearningState; go: Navigation }) {
  const [moduleFilter, setModuleFilter] = useState<'all' | 'tarczyca' | 'przysadka'>('all');
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
        <button
          className={moduleFilter === 'tarczyca' ? 'active' : ''}
          onClick={() => setModuleFilter('tarczyca')}
        >
          Moduł 01: Tarczyca (12)
        </button>
        <button
          className={moduleFilter === 'przysadka' ? 'active' : ''}
          onClick={() => setModuleFilter('przysadka')}
        >
          Moduł 02: Przysadka i podwzgórze (12)
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
