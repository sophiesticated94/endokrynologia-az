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
import type { Confidence, CourseId, LearningActivity, PracticeRecordMeta } from '@/lib/course-types';
import { COURSES, getCourse } from '@/lib/courses-registry';
import { useLearning } from '@/lib/use-learning';
import { practicePayload } from '@/lib/learning';
import { SourceList, Runner } from './course-ui';
import { Dashboard, CourseMap, LessonView, CasesView, type Route } from './content-views';
import { CardsView, ExamView, ResultsView } from './practice-views';
import { AccountView } from './account-view';
import { EndocrinologySimulators } from './views/endocrinology-simulators';
import { PsychiatryCommandCenter } from './psychiatry-command-center';
import { PsychiatryCourseMap } from './views/psychiatry-course-map';
import { CatalogView } from './views/catalog-view';
import { CourseSwitcher } from './course-switcher';
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
    ['home', 'course', 'simulator', 'cases', 'cards', 'exam', 'results', 'mistakes', 'glossary', 'account', 'catalog'].includes(value) ||
    value.startsWith('simulator?') ||
    value.startsWith('simulator/') ||
    COURSES.endocrinology.lessons.some(l => value === `lesson/${l.id}` || value === `quiz/${l.id}`) ||
    COURSES.psychiatry.lessons.some(l => value === `lesson/${l.id}` || value === `quiz/${l.id}`) ||
    COURSES.endocrinology.cases.some(c => value === `case/${c.id}`) ||
    COURSES.psychiatry.cases.some(c => value === `case/${c.id}`)
  );
}

export default function CourseApp() {
  const [activeCourse, setActiveCourse] = useState<CourseId>('endocrinology');

  const selectCourse = useCallback((id: CourseId) => {
    setActiveCourse(id);
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('med.activeCourse', id); } catch {}
    }
  }, []);

  const course = getCourse(activeCourse);
  const { lessons, flashcards, cases } = course;

  const learning = useLearning(activeCourse);
  const { state, user, configured, loading, saving, pending, error, online } = learning;
  const [route, setRoute] = useState<Route>('home');
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

      // Automatyczne przełączanie kursu po otwarciu bezpośredniego linku
      if (hash.startsWith('simulator?') || hash.startsWith('simulator/')) {
        setActiveCourse('psychiatry');
      } else if (hash.startsWith('lesson/') || hash.startsWith('quiz/')) {
        if (COURSES.psychiatry.lessons.some(l => hash === `lesson/${l.id}` || hash === `quiz/${l.id}`)) {
          setActiveCourse('psychiatry');
        } else if (COURSES.endocrinology.lessons.some(l => hash === `lesson/${l.id}` || hash === `quiz/${l.id}`)) {
          setActiveCourse('endocrinology');
        }
      } else if (hash.startsWith('case/')) {
        if (COURSES.psychiatry.cases.some(c => hash === `case/${c.id}`)) {
          setActiveCourse('psychiatry');
        } else if (COURSES.endocrinology.cases.some(c => hash === `case/${c.id}`)) {
          setActiveCourse('endocrinology');
        }
      } else {
        try {
          const saved = localStorage.getItem('med.activeCourse');
          if (saved === 'psychiatry' || saved === 'endocrinology') {
            setActiveCourse(saved);
          }
        } catch {}
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
  }, [activeCourse, selectCourse]);

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

  let simulatorPresetId: string | undefined = undefined;
  if (route.startsWith('simulator?')) {
    const params = new URLSearchParams(route.slice('simulator?'.length));
    simulatorPresetId = params.get('preset') || undefined;
  } else if (route.startsWith('simulator/')) {
    simulatorPresetId = route.slice('simulator/'.length) || undefined;
  }

  const lesson = lessons.find(l => route === `lesson/${l.id}` || route === `quiz/${l.id}`);
  const clinical = cases.find(c => route === `case/${c.id}`);

  const title =
    route === 'catalog'
      ? 'Katalog kursów'
      : route.startsWith('lesson/') || route.startsWith('quiz/')
      ? `${course.shortTitle} / ${lesson?.title ?? 'Lekcja'}`
      : route.startsWith('case/')
      ? 'Przypadki kliniczne'
      : route.startsWith('simulator')
      ? `${course.shortTitle} · Symulatory`
      : route === 'glossary'
      ? 'Słowniczek pojęć'
      : route === 'mistakes'
      ? 'Notatnik błędów'
      : navItems.find(n => n[0] === route)?.[1] ?? 'Twoje konto';
  const userKey = user?.id ?? 'guest';

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
        <button className="brand" onClick={() => go('home')} aria-label={`${course.title} — strona główna`}>
          <span className="brand-icon">
            {activeCourse === 'endocrinology' ? <FlaskConical size={23} /> : <BrainCircuit size={23} />}
          </span>
          <span>
            {activeCourse === 'endocrinology' ? 'endo' : 'psych'}<span className="brand-light">akademia</span>
            <small>{course.brandSub}</small>
          </span>
        </button>

        <div style={{ padding: '0 12px 12px 12px' }}>
          <CourseSwitcher
            activeCourse={activeCourse}
            onSelectCourse={selectCourse}
            onOpenCatalog={() => go('catalog')}
            variant="sidebar"
          />
        </div>

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
            <CourseSwitcher
              activeCourse={activeCourse}
              onSelectCourse={selectCourse}
              onOpenCatalog={() => go('catalog')}
              variant="topbar"
            />
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
                Tryb gościa · Konta i synchronizacja czekają na konfigurację Supabase. Postęp jest zapisywany
                lokalnie na tym urządzeniu.
              </span>
            </div>
          )}
          {configured === true && !user && !loading && (
            <div className="connection-note">
              <LogIn size={16} />
              <span>Tryb gościa — postęp jest zapisywany lokalnie, bez synchronizacji między urządzeniami.</span>
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

          {route === 'catalog' && (
            <CatalogView activeCourse={activeCourse} onSelectCourse={selectCourse} go={go} />
          )}
          {route === 'home' && (
            <Dashboard
              state={state}
              go={go}
              due={due.length}
              newCount={fresh.length}
              activeCourse={activeCourse}
            />
          )}
          {route === 'course' && (
            activeCourse === 'endocrinology' ? <CourseMap state={state} go={go} /> : <PsychiatryCourseMap state={state} go={go} />
          )}
          {route.startsWith('simulator') && (
            activeCourse === 'endocrinology' ? <EndocrinologySimulators /> : <PsychiatryCommandCenter initialPresetId={simulatorPresetId} />
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
              recordPractice={(activity: LearningActivity, correct: boolean, confidence?: Confidence, scored = true, meta?: PracticeRecordMeta) =>
                learning.record('practice', activity.id, practicePayload(lesson.id, activity, correct, confidence, scored, meta))
              }
            />
          )}
          {route.startsWith('quiz/') && lesson && (
            <>
              <Runner
                key={`${route}-${userKey}-${activeCourse}`}
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
          {route === 'cases' && <CasesView state={state} go={go} activeCourse={activeCourse} />}
          {route.startsWith('case/') && clinical && (
            <>
              <Runner
                key={`${route}-${userKey}-${activeCourse}`}
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
          {route === 'cards' && <CardsView key={`${userKey}-${activeCourse}`} learning={learning} go={go} />}
          {route === 'exam' && <ExamView key={`${userKey}-${activeCourse}`} learning={learning} onActive={setActive} />}
          {route === 'results' && <ResultsView key={`${userKey}-${activeCourse}`} learning={learning} go={go} />}
          {route === 'mistakes' && (
            <ErrorNotebook
              state={state}
              go={go}
              recordPractice={(lessonId, activity, correct, confidence, scored = true, meta) =>
                learning.record('practice', activity.id, practicePayload(lessonId, activity, correct, confidence, scored, meta))
              }
            />
          )}
          {route === 'account' && <AccountView learning={learning} go={go} />}

          <footer className="footer">
            <span>
              {activeCourse === 'endocrinology' ? <FlaskConical size={16} /> : <BrainCircuit size={16} />}
              {course.title}
            </span>
            <span>{course.standardsBadge} · Materiał edukacyjny</span>
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
