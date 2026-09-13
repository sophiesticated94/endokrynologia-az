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
  Sliders,
} from 'lucide-react';
import { lessonExperiences as endoExperiences, lessons, type Lesson } from '@/lib/course';
import { psychiatryLessons } from '@/lib/course-psychiatry';
import { psychiatryLessonExperiences, getPsychiatryEnhancement } from '@/lib/psychiatry';
import {
  EvidenceBadge,
  WhatChangesYourMindCard,
  InlineEnhancementRenderer,
  EvidenceInspectorModal,
} from '../components/psychiatry-lesson-enhancements';
import { PsychiatryLabModal } from '../components/psychiatry-lab-modal';
import type { Confidence, LearningActivity, PracticeRecordMeta, InlineEnhancementRef, LessonExperienceV2 } from '@/lib/course-types';
import { isLessonCoreComplete } from '@/lib/lesson-v2';
import type { LearningState } from '@/lib/learning';
import { SourceList } from '../course-ui';
import { FormattedMathText } from '../components/latex-renderer';
import { LatexViewerModal } from '../components/latex-viewer-modal';
import { LessonDiagram } from './lesson-diagrams';
import { LessonSimulators } from './lesson-simulators';
import { MathDerivationCard, WorkedExampleCard } from '../components/math-lesson-cards';
import { PracticeActivityCard } from '../components/practice-activity';
import { LearningWidgets } from '../components/learning-widgets';
import { getPreset } from '@/lib/content/preset-registry';
import type { Navigation } from './types';

const MODULE_LABELS: Record<string, string> = {
  tarczyca: 'MODUŁ 01: TARCZYCA',
  przysadka: 'MODUŁ 02: PRZYSADKA I PODWZGÓRZE',
  nadnercza: 'MODUŁ 03: NADNERCZA',
  przytarczyce: 'MODUŁ 04: PRZYTARCZYCE I Ca–P',
  cukrzyca: 'MODUŁ 05: CUKRZYCA I METABOLIZM',
  gonady: 'MODUŁ 06: GONADY I ROZRÓD',
  nen: 'MODUŁ 07: NOWOTWORY NEUROENDOKRYNNE I MEN',
  otylosc: 'MODUŁ 08: OTYŁOŚĆ I LIPIDY',
  pediatria: 'MODUŁ 09: ENDOKRYNOLOGIA PEDIATRYCZNA',
  'psych-afektywne': 'MODUŁ 01: FUNDAMENTY PSYCHIATRII I DIAGNOSTYKA KLINICZNA',
  'psych-farmakologia': 'MODUŁ 02: PSYCHOFARMAKOLOGIA KLINICZNA I LECZENIE BIOLOGICZNE',
  'psych-organiczne': 'MODUŁ 03: PSYCHIATRIA INTERDYSCYPLINARNA I ORGANICZNA',
  'psych-trauma-dysocjacja': 'MODUŁ 04: TRAUMA, DYSOCJACJA I ZABURZENIA OSOBOWOŚCI',
};

export function LessonView({
  lesson,
  experience: propExperience,
  state,
  go,
  blocked,
  complete,
  setLevel,
  recordPractice,
}: {
  lesson: Lesson;
  experience?: LessonExperienceV2;
  state: LearningState;
  go: Navigation;
  blocked: boolean;
  complete: () => void;
  setLevel: (level: 'student' | 'doctor') => void;
  recordPractice: (activity: LearningActivity, correct: boolean, confidence?: Confidence, scored?: boolean, meta?: PracticeRecordMeta) => Promise<boolean>;
}) {
  const [latexModalOpen, setLatexModalOpen] = useState(false);
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [labModalPresetId, setLabModalPresetId] = useState<string | null>(null);
  const [selectedClaimKey, setSelectedClaimKey] = useState<string | undefined>(undefined);
  const [finishedActivities, setFinishedActivities] = useState<Set<string>>(new Set());
  const [activeWorkbenchWidget, setActiveWorkbenchWidget] = useState<string | undefined>(undefined);
  const [activeWorkbenchPreset, setActiveWorkbenchPreset] = useState<string | undefined>(undefined);
  const psychEnhancement = getPsychiatryEnhancement(lesson.id);
  // Priority: 1. DB document / prop experience, 2. Curated bundle, 3. Legacy generated
  const experience: LessonExperienceV2 | undefined =
    propExperience ??
    (lesson as { experience?: LessonExperienceV2 }).experience ??
    endoExperiences[lesson.id] ??
    psychiatryLessonExperiences[lesson.id];
  const allCourseLessons = lessons.some(l => l.id === lesson.id) ? lessons : psychiatryLessons;
  const moduleLessons = allCourseLessons.filter(l => l.moduleId === lesson.moduleId);
  const lessonNum = moduleLessons.indexOf(lesson) + 1;
  const nextLesson = moduleLessons[lessonNum];
  const hasLessonMistakes = state.mistakes.some(item => item.lessonId === lesson.id);
  const moduleLabel =
    (lesson.moduleId && MODULE_LABELS[lesson.moduleId]) ||
    (lesson.moduleId ? `MODUŁ: ${lesson.moduleId.toUpperCase()}` : 'MODUŁ 01: TARCZYCA');


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
            {psychEnhancement?.evidenceMode && (
              <EvidenceBadge
                mode={psychEnhancement.evidenceMode}
                onClick={() => {
                  setSelectedClaimKey(undefined);
                  setEvidenceModalOpen(true);
                }}
              />
            )}
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
          {(experience?.objectives ?? lesson.goals.map((statement, index) => ({id:`legacy-${index}`,statement}))).map(goal => (
            <p key={goal.id}>
              <CheckCircle2 size={17} />
              <span><FormattedMathText text={goal.statement} />{experience && <small className={`mastery-chip ${state.mastery[goal.id]?.status ?? 'new'}`}>{state.mastery[goal.id]?.status === 'mastered' ? 'opanowane' : state.mastery[goal.id]?.status === 'practicing' ? 'ćwiczysz' : state.mastery[goal.id]?.status === 'learning' ? 'do poprawy' : 'nowe'}</small>}</span>
            </p>
          ))}
          {experience && <div className="level-switch lesson-level-switch" aria-label="Poziom treści"><button className={state.level==='student'?'active':''} onClick={()=>setLevel('student')}>Student</button><button className={state.level==='doctor'?'active':''} onClick={()=>setLevel('doctor')}>Lekarz / rezydent</button></div>}
        </div>

        {experience && (
          <PracticeActivityCard
            activity={experience.diagnostic}
            phase="diagnostic"
            onRecord={recordPractice}
            onComplete={id => setFinishedActivities(current => new Set(current).add(id))}
          />
        )}

        {(experience?.blocks ?? lesson.sections.map((section,index)=>({id:`legacy-block-${index}`,title:section.title,text:section.text,sourceIds:lesson.sourceIds}))).map((section, i) => {
          const enhancements = section.inlineEnhancements ?? [];
          const renderEnhancement = (enhancement: InlineEnhancementRef) => (
            <InlineEnhancementRenderer
              key={enhancement.id}
              enhancement={enhancement}
              lessonId={lesson.id}
              go={go}
              onOpenEvidence={(claimKey?: string) => {
                setSelectedClaimKey(claimKey);
                setEvidenceModalOpen(true);
              }}
              onOpenLab={(presetId?: string) => {
                if (presetId) {
                  const p = getPreset(presetId);
                  if (p && (p.widgetType === 'adrenal-workbench' || p.widgetType === 'parathyroid-workbench')) {
                    setActiveWorkbenchPreset(presetId);
                    setActiveWorkbenchWidget(p.widgetType);
                    const el = document.getElementById('pracownia-sekcja');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    return;
                  }
                }
                setLabModalPresetId(presetId ?? psychEnhancement?.workbenchPresetId ?? 'mse-young-adult-001');
              }}
            />
          );

          const afterIntro = enhancements.filter(e => e.placement === 'after-intro');
          const afterText = enhancements.filter(e => e.placement === 'after-text');
          const beforeCheckpoint = enhancements.filter(e => e.placement === 'before-checkpoint');
          const afterCheckpoint = enhancements.filter(e => e.placement === 'after-checkpoint');
          const endOfBlock = enhancements.filter(e => e.placement === 'end-of-block' || !e.placement);

          return (
            <section key={section.title} id={`section-${i}`} className="lesson-section">
              <span className="eyebrow">0{i + 1}</span>
              <h2>{section.title}</h2>

              {afterIntro.map(renderEnhancement)}

              <p>
                <FormattedMathText text={section.text} />
              </p>

              {afterText.map(renderEnhancement)}

              <LessonDiagram lessonId={lesson.id} sectionIndex={i} />

              {beforeCheckpoint.map(renderEnhancement)}

              {experience && section.checkpointId && (() => {
                const activity = experience.activities.find(item => item.id === section.checkpointId);
                return activity ? (
                  <PracticeActivityCard
                    activity={activity}
                    onRecord={recordPractice}
                    onComplete={id => setFinishedActivities(current => new Set(current).add(id))}
                  />
                ) : null;
              })()}

              {afterCheckpoint.map(renderEnhancement)}

              {endOfBlock.map(renderEnhancement)}
            </section>
          );
        })}

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
        <LessonSimulators
          lessonId={lesson.id}
          go={go}
          onOpenLab={presetId => {
            setLabModalPresetId(presetId ?? psychEnhancement?.workbenchPresetId ?? 'mse-young-adult-001');
          }}
        />

        {experience && lesson.moduleId && (
          <LearningWidgets
            experience={experience}
            moduleId={lesson.moduleId}
            onRecord={recordPractice}
            activeWidgetOverride={activeWorkbenchWidget}
            activePresetOverride={activeWorkbenchPreset}
          />
        )}

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
          <button className="advanced-toggle" disabled={blocked} onClick={() => setLevel('doctor')}>
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

        {psychEnhancement?.whatChangesYourMind && (
          <WhatChangesYourMindCard whatChanges={psychEnhancement.whatChangesYourMind} />
        )}

        {experience && <section className="exit-zone">
          <span className="eyebrow">ODTWÓRZ I SPRAWDŹ</span>
          <h2>Zamknij lekcję aktywnie</h2>
          <PracticeActivityCard activity={experience.teachBack} onRecord={recordPractice} onComplete={(id)=>setFinishedActivities(current=>new Set(current).add(id))}/>
          {experience.exitTicket.map(activity=><PracticeActivityCard key={activity.id} activity={activity} phase="exit" onRecord={recordPractice} onComplete={(id)=>setFinishedActivities(current=>new Set(current).add(id))}/>)}
        </section>}

        <div className="lesson-finish">
          <button
            className="secondary"
            disabled={blocked || state.completed.includes(lesson.id) || Boolean(experience && !isLessonCoreComplete(experience, finishedActivities))}
            onClick={complete}
          >
            <Check size={17} />
            {state.completed.includes(lesson.id) ? 'Lekcja ukończona' : experience ? 'Zakończ lekcję' : 'Oznacz jako ukończoną'}
          </button>
          <button className="primary" onClick={() => go(`quiz/${lesson.id}`)}>
            Sprawdź wiedzę
            <ArrowRight size={17} />
          </button>
        </div>

        {experience && (
          <section className="next-action" aria-labelledby="next-action-title">
            <div>
              <span className="eyebrow">REKOMENDOWANY NASTĘPNY KROK</span>
              <h3 id="next-action-title">
                {hasLessonMistakes ? 'Napraw konkretny błąd' : state.completed.includes(lesson.id) && nextLesson ? 'Przejdź do kolejnej lekcji' : 'Zastosuj wiedzę w przypadku'}
              </h3>
              <p>{hasLessonMistakes ? 'Notatnik otworzy krótką powtórkę przypisaną do celu, bez cofania do całej lekcji.' : state.completed.includes(lesson.id) && nextLesson ? nextLesson.title : 'Przypadek etapowy sprawdzi decyzję, pewność i brakującą informację.'}</p>
            </div>
            <button className="primary" onClick={() => go(hasLessonMistakes ? 'mistakes' : state.completed.includes(lesson.id) && nextLesson ? `lesson/${nextLesson.id}` : 'cases')}>
              {hasLessonMistakes ? 'Otwórz notatnik' : state.completed.includes(lesson.id) && nextLesson ? 'Następna lekcja' : 'Wybierz przypadek'}
              <ArrowRight size={17} />
            </button>
          </section>
        )}

        <SourceList lesson={lesson} />
      </article>

      <aside className="lesson-aside">
        <p className="eyebrow">W TEJ LEKCJI</p>
        {(experience?.blocks ?? lesson.sections).map((s, i) => (
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
        <button
          className="text-button"
          onClick={() => go(`case/${psychEnhancement?.caseId || `case-${lesson.id}`}`)}
        >
          {psychEnhancement?.recurringPatientId ? 'Otwórz przypadek (Wątek pacjenta)' : 'Otwórz przypadek'}
          <ArrowUpRight size={15} />
        </button>

        <hr />
        <strong>Szybkie narzędzia</strong>
        {psychEnhancement?.workbenchPresetId && (
          <button
            className="text-button"
            onClick={() => setLabModalPresetId(psychEnhancement.workbenchPresetId ?? null)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: '#4f46e5', cursor: 'pointer' }}
          >
            <Sliders size={14} /> Psychiatry Command Center
          </button>
        )}
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

      {evidenceModalOpen && (
        <EvidenceInspectorModal
          mode={psychEnhancement?.evidenceMode}
          claimKey={selectedClaimKey}
          onClose={() => {
            setEvidenceModalOpen(false);
            setSelectedClaimKey(undefined);
          }}
        />
      )}

      {labModalPresetId !== null && (
        <PsychiatryLabModal
          presetId={labModalPresetId}
          onClose={() => setLabModalPresetId(null)}
          onOpenFullScreen={() => {
            go(labModalPresetId ? `simulator?preset=${labModalPresetId}` : 'simulator');
            setLabModalPresetId(null);
          }}
        />
      )}
    </div>
  );
}
