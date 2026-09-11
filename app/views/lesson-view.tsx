'use client';
import { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  Lightbulb,
  Activity,
  BookA,
  Code2,
} from 'lucide-react';
import { lessons, type Lesson } from '@/lib/course';
import type { LearningState } from '@/lib/learning';
import { SourceList } from '../course-ui';
import { GlossaryText } from '../glossary-components';
import { FormattedMathText } from '../components/latex-renderer';
import { LatexViewerModal } from '../components/latex-viewer-modal';
import { LessonDiagram } from './lesson-diagrams';
import { LessonSimulators } from './lesson-simulators';
import { MathDerivationCard, WorkedExampleCard } from '../components/math-lesson-cards';
import type { Navigation } from './types';

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
  const [latexModalOpen, setLatexModalOpen] = useState(false);
  const moduleLessons = lessons.filter(l => l.moduleId === lesson.moduleId);
  const lessonNum = moduleLessons.indexOf(lesson) + 1;
  const moduleLabel =
    lesson.moduleId === 'otylosc'
      ? 'MODUŁ 08: OTYŁOŚĆ I ZABURZENIA LIPIDOWE'
      : lesson.moduleId === 'nen'
        ? 'MODUŁ 07: NOWOTWORY NEUROENDOKRYNNE I MEN'
        : lesson.moduleId === 'gonady'
          ? 'MODUŁ 06: GONADY'
          : lesson.moduleId === 'cukrzyca'
            ? 'MODUŁ 05: CUKRZYCA'
            : lesson.moduleId === 'przytarczyce'
              ? 'MODUŁ 04: PRZYTARCZYCE'
              : lesson.moduleId === 'nadnercza'
                ? 'MODUŁ 03: NADNERCZA'
                : lesson.moduleId === 'przysadka'
                  ? 'MODUŁ 02: PRZYSADKA'
                  : 'MODUŁ 01: TARCZYCA';


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
            <button
              type="button"
              onClick={() => setLatexModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                marginLeft: 'auto',
                background: '#f0f9ff',
                border: '1px solid #bae6fd',
                color: '#0369a1',
                borderRadius: '6px',
                padding: '3px 9px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              title="Otwórz przeglądarkę wzorów i piaskownicę LaTeX"
            >
              <Code2 size={13} />
              Wzory LaTeX
            </button>
          </div>
        </div>

        <div className="goals">
          <h3>Po tej lekcji</h3>
          {lesson.goals.map(goal => (
            <p key={goal}>
              <CheckCircle2 size={17} />
              <FormattedMathText text={goal} />
            </p>
          ))}
        </div>

        {lesson.sections.map((section, i) => (
          <section key={section.title} id={`section-${i}`} className="lesson-section">
            <span className="eyebrow">0{i + 1}</span>
            <h2>{section.title}</h2>
            <p>
              <FormattedMathText text={section.text} />
            </p>

            <LessonDiagram lessonId={lesson.id} sectionIndex={i} />
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
                      <FormattedMathText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Symulatory i zwiastuny */}
        <LessonSimulators lessonId={lesson.id} go={go} />

        {/* Formalne wyprowadzenia matematyczne i biofizyczne */}
        <MathDerivationCard derivation={lesson.derivation} />

        {/* Kliniczny przykład obliczeniowy pacjenta */}
        <WorkedExampleCard example={lesson.workedExample} />

        {/* Rozszerzenie dla lekarza */}
        {state.level === 'doctor' ? (
          <section className="advanced">
            <span className="eyebrow">
              <GraduationCap size={17} /> ROZSZERZENIE DLA LEKARZA
            </span>
            <h2>O krok dalej</h2>
            <p>
              <FormattedMathText text={lesson.advanced} />
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
              <FormattedMathText text={lesson.summary} />
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
          <Activity size={14} /> Symulatory kliniczne
        </button>
        <button
          className="text-button"
          onClick={() => setLatexModalOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: '#0284c7' }}
        >
          <Code2 size={14} /> Przeglądarka LaTeX
        </button>
        <button
          className="text-button"
          onClick={() => go('glossary')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}
        >
          <BookA size={14} /> Słowniczek pojęć
        </button>
      </aside>

      {latexModalOpen && (
        <LatexViewerModal
          isOpen={latexModalOpen}
          onClose={() => setLatexModalOpen(false)}
          initialEquation={lesson.derivation?.steps[0]?.equation}
          initialTitle={lesson.title}
        />
      )}
    </div>
  );
}
