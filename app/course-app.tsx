'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  ChevronRight,
  Layers3,
  Stethoscope,
  ClipboardCheck,
  ChartNoAxesCombined,
  LogIn,
  Menu,
  LockKeyhole,
  FlaskConical,
  RefreshCw,
  Lightbulb,
  ArrowUpRight,
  LayoutDashboard,
  Activity,
  BookA,
  BrainCircuit,
} from 'lucide-react';
import { lessons, flashcards } from '@/lib/course';
import type { Confidence, LearningActivity } from '@/lib/course-types';
import { cases } from '@/lib/cases';
import { useLearning } from '@/lib/use-learning';
import { SourceList, Runner } from './course-ui';
import { Dashboard, CourseMap, LessonView, CasesView, type Route } from './content-views';
import { CardsView, ExamView, ResultsView } from './practice-views';
import { AccountView } from './account-view';
import { HptSimulator } from './hpt-simulator';
import { PituitarySimulator } from './pituitary-simulator';
import { AdrenalSimulator } from './adrenal-simulator';
import { ParathyroidSimulator } from './parathyroid-simulator';
import { DiabetesSimulator } from './diabetes-simulator';
import { GonadSimulator } from './gonad-simulator';
import { NenSimulator } from './nen-simulator';
import { ObesitySimulator } from './obesity-simulator';
import { GlossaryView } from './glossary-components';
import { ErrorNotebook } from './views/error-notebook';

const navItems = [
  ['home', 'Moja nauka', LayoutDashboard],
  ['course', 'Mapa kursu', BookOpen],
  ['simulator', 'Pracownie i symulatory', Activity],
  ['cases', 'Przypadki kliniczne', Stethoscope],
  ['cards', 'Fiszki i powtórki', Layers3],
  ['exam', 'Egzamin', ClipboardCheck],
  ['results', 'Moje wyniki', ChartNoAxesCombined],
  ['mistakes', 'Notatnik błędów', BrainCircuit],
  ['glossary', 'Słowniczek pojęć', BookA],
] as const;

function validRoute(value: string): value is Route {
  return (
    ['home', 'course', 'simulator', 'cases', 'cards', 'exam', 'results', 'mistakes', 'glossary', 'account'].includes(value) ||
    lessons.some(l => value === `lesson/${l.id}` || value === `quiz/${l.id}`) ||
    cases.some(c => value === `case/${c.id}`)
  );
}

export default function CourseApp() {
  const learning = useLearning();
  const { state, user, configured, loading, saving, pending, error, online } = learning;
  const [route, setRoute] = useState<Route>('home');
  const [simTab, setSimTab] = useState<'hpt' | 'pituitary' | 'adrenal' | 'parathyroid' | 'diabetes' | 'gonad' | 'nen' | 'otylosc'>('hpt');
  const routeRef = useRef<Route>('home');
  const [mobile, setMobile] = useState(false);
  const active = useRef(false);
  const setActive = useCallback((v: boolean) => {
    active.current = v;
  }, []);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function changed() {
      const hash = window.location.hash.slice(1);
      if (!validRoute(hash)) return;
      if (
        active.current &&
        hash !== routeRef.current &&
        !window.confirm('Trwa ćwiczenie. Opuścić je i utracić niezakończone odpowiedzi?')
      ) {
        history.replaceState(null, '', `#${routeRef.current}`);
        return;
      }
      active.current = false;
      routeRef.current = hash;
      setRoute(hash);
      setMobile(false);
      window.scrollTo({ top: 0 });
    }
    changed();
    window.addEventListener('hashchange', changed);
    const prevent = (e: BeforeUnloadEvent) => {
      if (active.current) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', prevent);
    return () => {
      window.removeEventListener('hashchange', changed);
      window.removeEventListener('beforeunload', prevent);
    };
  }, []);

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
  }, [route]);

  useEffect(() => {
    if (learning.recovery) window.location.hash = 'account';
  }, [learning.recovery]);

  function go(next: Route) {
    if (next === route) {
      setMobile(false);
      return;
    }
    window.location.hash = next;
  }

  const due = flashcards.filter(c => state.reviews[c.id] && new Date(state.reviews[c.id].dueAt) <= new Date());
  const fresh = flashcards.filter(c => !state.reviews[c.id]);
  const blocked = saving || loading || pending.length > 0;

  const lesson = lessons.find(l => route === `lesson/${l.id}` || route === `quiz/${l.id}`);
  const clinical = cases.find(c => route === `case/${c.id}`);

  const title =
    route.startsWith('lesson/') || route.startsWith('quiz/')
      ? lesson?.moduleId === 'cukrzyca'
        ? 'Moduł 05 / Cukrzyca i metabolizm'
        : lesson?.moduleId === 'przytarczyce'
        ? 'Moduł 04 / Przytarczyce i Ca–P'
        : lesson?.moduleId === 'nadnercza'
          ? 'Moduł 03 / Nadnercza'
          : lesson?.moduleId === 'przysadka'
            ? 'Moduł 02 / Przysadka i podwzgórze'
            : 'Moduł 01 / Tarczyca'
      : route.startsWith('case/')
      ? 'Przypadki kliniczne'
      : route === 'simulator'
      ? 'Pracownie i symulatory'
      : route === 'glossary'
      ? 'Słowniczek pojęć medycznych'
      : route === 'mistakes'
      ? 'Notatnik błędów'
      : navItems.find(n => n[0] === route)?.[1] ?? 'Twoje konto';
  const userKey = user?.id ?? 'guest';

  useEffect(() => {
    const context = (
      document as unknown as {
        modelContext?: { registerTool: (tool: unknown, options: { signal: AbortSignal }) => void | Promise<void> };
      }
    ).modelContext;
    if (!context) return;
    const controller = new AbortController();
    try {
      void Promise.resolve(
        context.registerTool(
          {
            name: 'open_endocrinology_lesson',
            title: 'Otwórz lekcję endokrynologii',
            description: 'Otwiera lekcję po identyfikatorze; nie oznacza jej jako ukończonej.',
            inputSchema: {
              type: 'object',
              properties: { lessonId: { type: 'string', enum: lessons.map(l => l.id) } },
              required: ['lessonId'],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false },
            execute: async (input: unknown) => {
              const id = (input as { lessonId?: unknown })?.lessonId;
              if (typeof id !== 'string' || !lessons.some(l => l.id === id)) throw new Error('Nieznana lekcja');
              if (active.current) throw new Error('Najpierw zakończ aktywne ćwiczenie.');
              const target = `lesson/${id}`;
              window.location.hash = target;
              await new Promise<void>(resolve =>
                requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
              );
              return { route: target, lessonId: id };
            },
          },
          { signal: controller.signal }
        )
      ).catch(() => {});
    } catch {}
    return () => controller.abort();
  }, []);

  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main"
        onClick={e => {
          e.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Przejdź do treści
      </a>
      {mobile && <button aria-label="Zamknij menu" className="scrim" onClick={() => setMobile(false)} />}
      <aside className={`sidebar ${mobile ? 'open' : ''}`}>
        <button className="brand" onClick={() => go('home')} aria-label="Endokrynologia A–Z — strona główna">
          <span className="brand-icon">
            <FlaskConical size={23} />
          </span>
          <span>
            endo<span className="brand-light">akademia</span>
            <small>ENDOKRYNOLOGIA A–Z</small>
          </span>
        </button>
        <div className="nav-label">TWOJA PRZESTRZEŃ</div>
        <nav>
          {navItems.map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => go(id as Route)}
              className={
                route === id ||
                (id === 'course' && route.startsWith('lesson/')) ||
                (id === 'cases' && route.startsWith('case/'))
                  ? 'nav-active'
                  : ''
              }
              aria-current={route === id ? 'page' : undefined}
            >
              <Icon size={20} />
              <span>{label}</span>
              {id === 'cards' && due.length > 0 && <span className="nav-count">{due.length}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="study-note">
            <span className="mini-icon">
              <Lightbulb size={19} />
            </span>
            <strong>
              Zrozum. Zastosuj.
              <br />
              Zapamiętaj.
            </strong>
            <p>Od fizjologii do pierwszej trafnej decyzji klinicznej.</p>
          </div>
          <button className="sidebar-account" onClick={() => go('account')}>
            <span className="avatar">{user ? 'U' : 'G'}</span>
            <span>
              <strong>{user ? 'Twoje konto' : 'Tryb gościa'}</strong>
              <small>{user ? 'Postęp na koncie' : 'Poznaj kurs bez logowania'}</small>
            </span>
            <ChevronRight size={16} />
          </button>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div className="breadcrumbs">
            <button className="mobile-menu icon-button" aria-label="Otwórz menu" onClick={() => setMobile(true)}>
              <Menu size={22} />
            </button>
            <span>Akademia</span>
            <ChevronRight size={14} />
            <strong>{title}</strong>
          </div>
          <div className="top-actions">
            <span className="status-dot" />
            <span className="small">
              {saving
                ? 'Zapisywanie…'
                : loading
                ? 'Łączenie…'
                : user
                ? 'Konto połączone'
                : 'Nauka we własnym tempie'}
            </span>
            <button className="account-button" onClick={() => go('account')}>
              <LogIn size={17} />
              {user ? 'Konto' : 'Zaloguj się'}
            </button>
          </div>
        </header>

        <main id="main" ref={mainRef} tabIndex={-1} className="content">
          {configured === false && (
            <div className="connection-note">
              <LockKeyhole size={16} />
              <span>
                Tryb gościa · Konta i synchronizacja czekają na konfigurację Supabase. Postęp gościa znika po
                odświeżeniu.
              </span>
            </div>
          )}
          {configured === true && !user && !loading && (
            <div className="connection-note">
              <LogIn size={16} />
              <span>Tryb gościa — postęp tej sesji nie jest zapisywany na koncie.</span>
              <button className="text-button" onClick={() => go('account')}>
                Zaloguj się
              </button>
            </div>
          )}
          {!online && (
            <div className="alert" role="alert">
              Brak połączenia z internetem. Synchronizacja wymaga połączenia.
            </div>
          )}
          {error && (
            <div className="alert" role="alert">
              <span>{error}</span>
              <button
                className="secondary"
                disabled={saving || loading}
                onClick={() =>
                  pending.length
                    ? void learning.retry()
                    : configured === null
                    ? learning.retryConfig()
                    : void learning.refresh()
                }
              >
                <RefreshCw size={15} />
                {pending.length ? 'Ponów zapis' : 'Spróbuj ponownie'}
              </button>
            </div>
          )}

          {route === 'home' && <Dashboard state={state} go={go} due={due.length} newCount={fresh.length} />}
          {route === 'course' && <CourseMap state={state} go={go} />}
          {route === 'simulator' && (
            <div>
              <div className="filter-bar" style={{ marginBottom: '22px' }}>
                <button
                  className={simTab === 'hpt' ? 'active' : ''}
                  onClick={() => setSimTab('hpt')}
                >
                  <Activity size={15} /> Moduł 01: Symulator osi HPT (Tarczyca)
                </button>
                <button
                  className={simTab === 'pituitary' ? 'active' : ''}
                  onClick={() => setSimTab('pituitary')}
                >
                  <Activity size={15} /> Moduł 02: Konsola Przysadkowa (Przysadka i podwzgórze)
                </button>
                <button
                  className={simTab === 'adrenal' ? 'active' : ''}
                  onClick={() => setSimTab('adrenal')}
                >
                  <Activity size={15} /> Moduł 03: Konsola Nadnerczowa (Kora i rdzeń nadnerczy)
                </button>
                <button
                  className={simTab === 'parathyroid' ? 'active' : ''}
                  onClick={() => setSimTab('parathyroid')}
                >
                  <Activity size={15} /> Moduł 04: Konsola Przytarczycowa (Przytarczyce i Ca–P)
                </button>
                <button
                  className={simTab === 'diabetes' ? 'active' : ''}
                  onClick={() => setSimTab('diabetes')}
                >
                  <Activity size={15} /> Moduł 05: Konsola Diabetologiczna (HOMA i DKA/HHS)
                </button>
                <button
                  className={simTab === 'gonad' ? 'active' : ''}
                  onClick={() => setSimTab('gonad')}
                >
                  <Activity size={15} /> Moduł 06: Konsola Gonadowa (Gonady i medycyna rozrodu)
                </button>
                <button
                  className={simTab === 'nen' ? 'active' : ''}
                  onClick={() => setSimTab('nen')}
                >
                  <Activity size={15} /> Moduł 07: Konsola Neuroendokrynna (NEN, MEN i PRRT)
                </button>
                <button
                  className={simTab === 'otylosc' ? 'active' : ''}
                  onClick={() => setSimTab('otylosc')}
                >
                  <Activity size={15} /> Moduł 08: Konsola Metaboliczna (Masa, Lipidy i FIB-4)
                </button>
              </div>
              {simTab === 'hpt' && <HptSimulator />}
              {simTab === 'pituitary' && <PituitarySimulator />}
              {simTab === 'adrenal' && <AdrenalSimulator />}
              {simTab === 'parathyroid' && <ParathyroidSimulator />}
              {simTab === 'diabetes' && <DiabetesSimulator />}
              {simTab === 'gonad' && <GonadSimulator />}
              {simTab === 'nen' && <NenSimulator />}
              {simTab === 'otylosc' && <ObesitySimulator />}
            </div>
          )}

          {route === 'glossary' && <GlossaryView go={go} />}
          {route.startsWith('lesson/') && lesson && (
            <LessonView
              lesson={lesson}
              state={state}
              go={go}
              blocked={blocked}
              complete={() => void learning.record('lesson', lesson.id)}
              setLevel={level => void learning.record('profile', 'level', { level })}
              recordPractice={(activity: LearningActivity, correct: boolean, confidence?: Confidence, scored = true) => learning.record('practice', activity.id, {lessonId: lesson.id, objectiveIds: activity.objectiveIds, correct, confidence, activityType: activity.type, scored})}
            />
          )}
          {route.startsWith('quiz/') && lesson && (
            <>
              <Runner
                key={`${route}-${userKey}`}
                bank={lesson.questions}
                title={lesson.title}
                mode="quiz"
                blocked={blocked}
                onActive={setActive}
                onFinish={(payload, id) => learning.record('quiz', lesson.id, payload, id)}
              />
              <div className="reading">
                <SourceList lesson={lesson} />
              </div>
            </>
          )}
          {route === 'cases' && <CasesView state={state} go={go} />}
          {route.startsWith('case/') && clinical && (
            <>
              <Runner
                key={`${route}-${userKey}`}
                bank={clinical.steps}
                title={clinical.title}
                mode="case"
                clinical={clinical}
                blocked={blocked}
                onActive={setActive}
                onFinish={(payload, id) => learning.record('case', clinical.id, payload, id)}
              />
              <div className="reading">
                <SourceList lesson={lessons.find(l => l.id === clinical.lessonId)!} />
              </div>
            </>
          )}
          {route === 'cards' && <CardsView key={userKey} learning={learning} go={go} />}
          {route === 'exam' && <ExamView key={userKey} learning={learning} onActive={setActive} />}
          {route === 'results' && <ResultsView key={userKey} learning={learning} go={go} />}
          {route === 'mistakes' && (
            <ErrorNotebook
              state={state}
              go={go}
              recordPractice={(lessonId, activity, correct, confidence, scored = true) =>
                learning.record('practice', activity.id, {
                  lessonId,
                  objectiveIds: activity.objectiveIds,
                  correct,
                  confidence,
                  activityType: activity.type,
                  scored,
                })
              }
            />
          )}
          {route === 'account' && <AccountView learning={learning} go={go} />}

          <footer className="footer">
            <span>
              <FlaskConical size={16} />
              Endokrynologia A–Z
            </span>
            <span>Materiał edukacyjny · bez recenzji klinicznej</span>
            <button className="text-button" onClick={() => go('course')}>
              Odkrywaj dalej
              <ArrowUpRight size={14} />
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}
