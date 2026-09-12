'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, Check, CheckCircle2, Stethoscope, ExternalLink } from 'lucide-react';
import { sources, CONTENT_VERSION, lessonExperiences, type Question, type Lesson } from '@/lib/course';
import { psychiatrySources } from '@/lib/course-psychiatry-sources';
import type { Confidence, Source } from '@/lib/course-types';
import type { ClinicalCase } from '@/lib/cases';
import { grade } from '@/lib/learning';
import { GlossaryText } from './glossary-components';
import { LabResultsGauge, caseLabs } from './medical-diagrams';
import { safeRandomUUID } from '@/lib/utils';

const combinedSources: Record<string, Source> = {
  ...sources,
  ...psychiatrySources,
};

export function ThyroidArt() {
  return (
    <svg className="thyroid-art" viewBox="0 0 420 330" role="img" aria-label="Schemat tarczycy: dwa płaty połączone cieśnią przed tchawicą">
      <defs>
        <linearGradient id="gland" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#72bcb0" />
          <stop offset="1" stopColor="#277c70" />
        </linearGradient>
        <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#85afa7" opacity=".3" />
        </pattern>
      </defs>
      <circle cx="222" cy="157" r="124" fill="none" stroke="#b9d6cc" strokeDasharray="3 7" />
      <circle cx="222" cy="157" r="94" fill="#d6e8dd" />
      <rect width="420" height="330" fill="url(#dots)" />
      <path d="M181 36Q181 76 155 91L94 120M258 36Q258 76 283 91L350 120M154 239Q220 268 287 239" fill="none" stroke="#93b9ae" strokeWidth="2" />
      <rect x="201" y="86" width="40" height="172" rx="15" fill="#eaf2e8" stroke="#8ea99c" />
      {[110, 127, 144, 161, 178, 195, 212, 229].map(y => (
        <path key={y} d={`M204 ${y} Q221 ${y + 8} 238 ${y}`} fill="none" stroke="#9fb5a6" strokeWidth="3" />
      ))}
      <path d="M196 143C179 101 160 76 144 99C122 133 131 223 165 230C185 231 193 199 197 185L246 185C250 199 258 231 277 230C311 223 320 133 298 99C282 76 263 101 246 143Z" fill="url(#gland)" stroke="#24796d" strokeWidth="2" />
      <path d="M151 114Q140 153 151 200M289 114Q300 153 289 200" stroke="#b7e1cc" strokeWidth="2" fill="none" />
      <path d="M133 158H81M271 176H340M223 184L265 279" stroke="#507c70" />
      <circle cx="133" cy="158" r="3" fill="#174e46" />
      <circle cx="271" cy="176" r="3" fill="#174e46" />
      <text x="19" y="153" fill="#3c6960" fontSize="13">płat prawy</text>
      <text x="335" y="165" fill="#3c6960" fontSize="13">płat lewy</text>
      <text x="270" y="285" fill="#3c6960" fontSize="13">cieśń</text>
      <rect x="38" y="249" width="88" height="40" rx="20" fill="#fff" opacity=".85" />
      <text x="58" y="274" fill="#236f63" fontSize="17" fontWeight="600">T₃ + T₄</text>
    </svg>
  );
}

export function SourceList({ lesson }: { lesson: Lesson }) {
  const documentedReview = lessonExperiences[lesson.id]?.review ?? lesson.review;
  return (
    <div className="sources">
      <h3>Źródła i aktualność</h3>
      <p className="small">
        {documentedReview ? `Sprawdzenie w przypisanych źródłach: ${new Date(documentedReview.checkedAt).toLocaleDateString('pl-PL')}. ${documentedReview.scope}` : 'Treść oczekuje udokumentowanego przeglądu tej lekcji. Rok źródła nie oznacza daty weryfikacji materiału.'} · Wersja {CONTENT_VERSION}
      </p>
      {lesson.sourceIds.map(id => {
        const item = combinedSources[id] ?? sources[id] ?? psychiatrySources[id];
        if (!item) return null;
        return (
          <a key={id} href={item.url || '#'} target="_blank" rel="noreferrer">
            <span>
              {item.title}
              <small>{item.kind} · {item.year}</small>
            </span>
            <ExternalLink size={15} />
          </a>
        );
      })}
      <p className="small">
        Autorskie opracowanie edukacyjne wspomagane AI, bez recenzji klinicznej. Nie zastępuje pełnych wytycznych ani indywidualnej decyzji lekarskiej.
      </p>
    </div>
  );
}

export function QuestionOptions({
  question,
  selected,
  onSelect,
  reveal,
}: {
  question: Question;
  selected?: number;
  onSelect: (n: number) => void;
  reveal: boolean;
}) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={index}
          type="button"
          className={`option ${selected === index ? 'selected' : ''} ${reveal && index === question.answer ? 'correct' : ''} ${reveal && selected === index && index !== question.answer ? 'incorrect' : ''}`}
          disabled={reveal}
          aria-pressed={selected === index}
          onClick={() => onSelect(index)}
        >
          <span className="choice-letter">
            {reveal && index === question.answer ? <Check size={17} /> : String.fromCharCode(65 + index)}
          </span>
          <span>
            <strong>
              {option.text}
            </strong>
            {reveal && (
              <small>
                {option.explanation}
              </small>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}

export function Runner({
  bank,
  title,
  mode,
  clinical,
  onFinish,
  onActive,
  blocked,
}: {
  bank: Question[];
  title: string;
  mode: 'quiz' | 'exam' | 'case';
  clinical?: ClinicalCase;
  onFinish: (payload: Record<string, unknown>, id: string) => Promise<boolean>;
  onActive: (v: boolean) => void;
  blocked: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);
  const [confidence, setConfidence] = useState<Record<string, Confidence>>({});
  const [missingInfo, setMissingInfo] = useState<Record<string, string>>({});
  const id = useRef('');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    id.current = safeRandomUUID();
    onActive(true);
    return () => onActive(false);
  }, [onActive]);

  const current = bank[index];
  const chosen = answers[current.id];
  const show = !!revealed[current.id];
  const score = grade(bank, answers);
  const count = Object.keys(answers).length;

  async function finish() {
    if (count !== bank.length || blocked) return;
    try {
      setFinished(true);
      onActive(false);
      const snapshots = bank.map(q => ({ ...q, selected: answers[q.id] }));
      setSaveStatus('Zapisywanie wyniku…');
      const reasoning = mode === 'case' ? bank.map(q => ({questionId:q.id,confidence:confidence[q.id],missingInformation:missingInfo[q.id]})) : undefined;
      const ok = await onFinish({ ...score, answers, questions: snapshots, title, ...(reasoning ? {reasoning} : {}) }, id.current);
      setSaveStatus(
        ok
          ? 'Wynik dodany do historii.'
          : 'Wynik oczekuje na zapis. Użyj przycisku „Ponów zapis” powyżej.'
      );
    } catch (err) {
      console.error('Error finishing:', err);
      setSaveStatus('Błąd zapisu wyniku.');
    }
  }

  if (finished)
    return (
      <div className="reading">
        <div className="result-hero">
          <CheckCircle2 size={42} />
          <p className="eyebrow">{mode === 'case' ? 'PRZYPADEK ZAKOŃCZONY' : 'PODSUMOWANIE'}</p>
          <h1>{score.percent}%</h1>
          <p>
            {score.correct} z {score.total} poprawnych odpowiedzi
          </p>
          <p className="small" role="status">
            {saveStatus}
          </p>
        </div>
        <h2>Wróć do sposobu rozumowania</h2>
        {bank.map((q, i) => (
          <section className="panel question-review" key={q.id}>
            <p className="eyebrow">
              PYTANIE {i + 1} · {answers[q.id] === q.answer ? 'POPRAWNIE' : 'DO POWTÓRKI'}
            </p>
            <h3>
              <GlossaryText text={q.prompt} />
            </h3>
            <QuestionOptions question={q} selected={answers[q.id]} reveal onSelect={() => {}} />
          </section>
        ))}
      </div>
    );

  return (
    <div className="reading">
      <div className="page-heading">
        <p className="eyebrow">
          {mode === 'exam'
            ? 'EGZAMIN KOŃCOWY'
            : mode === 'case'
            ? 'DECYZJE KLINICZNE'
            : 'SPRAWDŹ ZROZUMIENIE'}
        </p>
        <h1>{title}</h1>
        <p>
          {mode === 'exam'
            ? 'Odpowiedzi i wyjaśnienia zobaczysz po zakończeniu egzaminu.'
            : 'Wybierz odpowiedź i sprawdź jej uzasadnienie.'}
        </p>
      </div>

      {mode === 'case' && clinical && (
        <div className="stage-steps" aria-label="Etapy postępowania">
          {clinical.steps.map((step, sIdx) => {
            const isCurrent = sIdx === index;
            const isDone = answers[step.id] !== undefined;
            return (
              <span key={step.id} className={`stage-step ${isCurrent ? 'active' : isDone ? 'done' : ''}`}>
                {isDone ? <Check size={13} /> : <span>{sIdx + 1}.</span>}
                {step.stage}
              </span>
            );
          })}
        </div>
      )}

      <div className="runner-progress">
        <span>{mode === 'case' ? clinical?.steps[index].stage : `Pytanie ${index + 1} z ${bank.length}`}</span>
        <span>
          {count}/{bank.length} odpowiedzi
        </span>
      </div>
      <div className="progress">
        <span style={{ width: `${(count / bank.length) * 100}%` }} />
      </div>

      {mode === 'case' && (
        <div className="case-context">
          <Stethoscope size={21} />
          <div>
            <strong>{clinical?.patient}</strong>
            <p>{clinical?.intro}</p>
            <p>
              <GlossaryText text={clinical?.steps[index].context ?? ''} />
            </p>
          </div>
        </div>
      )}

      {/* Wizualny panel laboratoryjny w etapie 2 "Badania" przypadku klinicznego */}
      {mode === 'case' && clinical && index === 1 && caseLabs[clinical.id] && (
        <LabResultsGauge tests={caseLabs[clinical.id]} />
      )}

      <section className="panel question-panel">
        <h2>
          {mode === 'exam' ? current.prompt : <GlossaryText text={current.prompt} />}
        </h2>
        <QuestionOptions
          question={current}
          selected={chosen}
          onSelect={n => setAnswers(v => ({ ...v, [current.id]: n }))}
          reveal={mode !== 'exam' && show}
        />
        {mode === 'case' && !show && <div className="case-reasoning-gate">
          <fieldset><legend>Jak pewna jest Twoja decyzja?</legend><div className="confidence-row">{([1,2,3] as Confidence[]).map(value=><button type="button" key={value} className={confidence[current.id]===value?'active':''} onClick={()=>setConfidence(currentValue=>({...currentValue,[current.id]:value}))}>{value===1?'Zgaduję':value===2?'Raczej wiem':'Jestem pewien'}</button>)}</div></fieldset>
          <label className="field">Który brak danych najłatwiej zmieniłby decyzję?<select value={missingInfo[current.id]??''} onChange={event=>setMissingInfo(currentValue=>({...currentValue,[current.id]:event.target.value}))}><option value="">Wybierz obszar</option><option value="urgency">Stan ogólny i pilność</option><option value="measurement">Wiarygodność pomiaru, jednostki lub zakres</option><option value="alternative">Alternatywne rozpoznanie lub czynnik zakłócający</option><option value="decision-condition">Warunek zmiany decyzji i monitorowanie</option></select></label>
        </div>}
        {mode !== 'exam' && show && (
          <div className={`feedback ${chosen === current.answer ? 'good' : 'bad'}`} role="status">
            <strong>
              {chosen === current.answer ? 'Trafny wybór kliniczny' : 'Wybór nieoptymalny'}
            </strong>
            <p style={{ margin: '6px 0 0' }}>{current.options[chosen!].explanation}</p>
            {mode === 'case' && (
              <><p className="small" style={{ margin: '6px 0 0', opacity: 0.85 }}>Dalszy etap przedstawia przebieg po prawidłowej decyzji.</p><p className="case-reflection"><strong>Co zmieniło decyzję?</strong> Nazwij konkretną daną z kontekstu i sprawdź, czy wybrany przez Ciebie brak informacji mógłby odwrócić wniosek.</p></>
            )}
          </div>
        )}
        <div className="runner-actions">
          <button className="secondary" disabled={index === 0} onClick={() => setIndex(n => n - 1)}>
            <ArrowLeft size={16} />
            Wstecz
          </button>
          {mode !== 'exam' && !show ? (
            <button
              className="primary"
              disabled={chosen === undefined || (mode === 'case' && (!confidence[current.id] || !missingInfo[current.id]))}
              onClick={() => setRevealed(v => ({ ...v, [current.id]: true }))}
            >
              Sprawdź odpowiedź
            </button>
          ) : index < bank.length - 1 ? (
            <button className="primary" disabled={chosen === undefined} onClick={() => setIndex(n => n + 1)}>
              Dalej
              <ArrowRight size={17} />
            </button>
          ) : (
            <button
              className="primary"
              disabled={count !== bank.length || blocked}
              onClick={finish}
            >
              Zakończ i zobacz wynik
              <Check size={17} />
            </button>
          )}
        </div>
        {mode === 'exam' && count < bank.length && (
          <div className="exam-remaining-note">
            <span>
              Pozostało pytań bez odpowiedzi: <strong>{bank.length - count}</strong> z {bank.length}.
              Odpowiedz na wszystkie, aby zakończyć egzamin.
            </span>
          </div>
        )}
      </section>

      {mode === 'exam' && (
        <div className="question-numbers" aria-label="Przejdź do pytania">
          {bank.map((q, i) => (
            <button
              key={q.id}
              aria-label={`Pytanie ${i + 1}${answers[q.id] !== undefined ? ', odpowiedź wybrana' : ''}`}
              aria-current={index === i ? 'step' : undefined}
              className={`${index === i ? 'current' : ''} ${answers[q.id] !== undefined ? 'answered' : ''}`}
              onClick={() => setIndex(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
