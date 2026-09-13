'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Check, HelpCircle, RotateCcw, AlertTriangle, AlertCircle } from 'lucide-react';
import type { Confidence, LearningActivity, PracticeAnswerType, PracticeRecordMeta, RubricEvaluationStatus } from '@/lib/course-types';
import { evaluateActivity, type ActivityResponse, type DetailedGradingResult } from '@/lib/activity-grading';

const confidenceLabels: Record<Confidence, string> = { 1: 'Zgaduję', 2: 'Raczej wiem', 3: 'Jestem pewien' };

function answerType(activity: LearningActivity): PracticeAnswerType {
  if (activity.type === 'multi_select') return 'choice_indexes';
  if (activity.type === 'ordering') return 'ordered_indexes';
  if (activity.type === 'matching') return 'matching_map';
  if (activity.type === 'numeric') return 'numeric_value';
  if (activity.type === 'recall') return 'self_assessment';
  if (activity.type === 'short_answer') return 'text_rubric';
  if (activity.type === 'select_and_justify') return 'select_and_justify';
  if (activity.type === 'clinical_reasoning') return 'clinical_reasoning';
  if (activity.type === 'evidence_weighting') return 'evidence_weighting';
  return 'choice_index';
}

export type EvaluationPhase = 'answering' | 'reviewing' | 'finalized';

export function PracticeActivityCard({
  activity,
  phase = 'checkpoint',
  onRecord,
  onComplete,
}: {
  activity: LearningActivity;
  phase?: 'diagnostic' | 'checkpoint' | 'exit' | 'review';
  onRecord: (activity: LearningActivity, correct: boolean, confidence?: Confidence, scored?: boolean, meta?: PracticeRecordMeta) => Promise<boolean>;
  onComplete?: (id: string, correct: boolean) => void;
}) {
  const initialOrder = useMemo(() => (activity.type === 'ordering' ? activity.items.map((_, index) => index).reverse() : []), [activity]);
  const initialResponse = useMemo<ActivityResponse>(() => {
    if (activity.type === 'ordering') return initialOrder;
    if (activity.type === 'multi_select') return [];
    if (activity.type === 'matching') return {};
    if (activity.type === 'evidence_weighting') return { classifications: {} };
    if (activity.type === 'select_and_justify') return { selected: undefined as unknown as number, rationale: '' };
    if (activity.type === 'clinical_reasoning') return { dimensions: {} };
    return '';
  }, [activity, initialOrder]);

  const [response, setResponse] = useState<ActivityResponse>(initialResponse);
  const [confidence, setConfidence] = useState<Confidence>();
  const [evaluationPhase, setEvaluationPhase] = useState<EvaluationPhase>('answering');
  const [selfReviewChoice, setSelfReviewChoice] = useState<RubricEvaluationStatus>();
  const [evaluationResult, setEvaluationResult] = useState<DetailedGradingResult | null>(null);
  const [hint, setHint] = useState(false);

  const startedAt = useRef<number | null>(null);
  const rationaleRef = useRef<HTMLTextAreaElement | null>(null);
  const reviewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    setResponse(initialResponse);
    setConfidence(undefined);
    setEvaluationPhase('answering');
    setSelfReviewChoice(undefined);
    setEvaluationResult(null);
    setHint(false);
  }, [activity.id, initialResponse]);

  const isOpenAnswer = activity.type === 'short_answer' || activity.type === 'clinical_reasoning' || activity.type === 'select_and_justify';
  const revealed = evaluationPhase !== 'answering';

  const hasResponse = useMemo(() => {
    if (activity.type === 'matching') {
      return Object.keys((response as Record<string, string>) || {}).length === activity.pairs.length;
    }
    if (activity.type === 'multi_select') {
      return Array.isArray(response) && response.length > 0;
    }
    if (activity.type === 'evidence_weighting') {
      const cls = (response && typeof response === 'object' && 'classifications' in response && response.classifications)
        ? (response.classifications as Record<string, string>)
        : {};
      return activity.items.every(item => Boolean(cls[item.id]));
    }
    if (activity.type === 'select_and_justify') {
      const saj = response as { selected?: number | number[]; rationale?: string };
      return saj && saj.selected !== undefined && (saj.rationale || '').trim().length > 0;
    }
    if (activity.type === 'clinical_reasoning') {
      const dims = (response as { dimensions?: Record<string, string> })?.dimensions || {};
      // All required dimensions (default true) must be filled
      return activity.rubric.dimensions.every(dim => {
        const isReq = dim.required !== false;
        return !isReq || (dims[dim.id] || '').trim().length > 0;
      });
    }
    if (activity.type === 'short_answer' || activity.type === 'recall') {
      const text = typeof response === 'string' ? response : (response as { text?: string })?.text || '';
      return text.trim().length > 0;
    }
    return response !== '';
  }, [activity, response]);

  const canSubmit = (activity.type === 'recall' ? hasResponse : hasResponse && confidence !== undefined);

  async function handleInitialSubmit() {
    if (!canSubmit) return;
    const res = evaluateActivity(activity, response);
    setEvaluationResult(res);

    if (isOpenAnswer) {
      setEvaluationPhase('reviewing');
      setTimeout(() => reviewRef.current?.focus(), 50);
    } else {
      setEvaluationPhase('finalized');
      const isScored = phase !== 'diagnostic' && activity.type !== 'recall';
      await onRecord(activity, res.correct, confidence, isScored, {
        answerType: answerType(activity),
        elapsedMs: Math.max(0, Date.now() - (startedAt.current ?? Date.now())),
        evaluationStatus: res.status,
      });
      onComplete?.(activity.id, res.correct);
    }
  }

  async function handleFinalizeReview() {
    const hasCritical = (evaluationResult?.rubricResult && 'criticalErrors' in evaluationResult.rubricResult && evaluationResult.rubricResult.criticalErrors.length > 0);
    const chosenStatus = hasCritical ? 'needs_revision' : (selfReviewChoice || evaluationResult?.status || 'needs_revision');

    const updatedResponse = (typeof response === 'object' && response !== null)
      ? { ...response, userConfirmedStatus: chosenStatus }
      : { text: String(response), userConfirmedStatus: chosenStatus };

    setResponse(updatedResponse);
    const finalRes = evaluateActivity(activity, updatedResponse as ActivityResponse);
    setEvaluationResult(finalRes);
    setEvaluationPhase('finalized');

    const isScored = phase !== 'diagnostic';
    await onRecord(activity, finalRes.correct, confidence, isScored, {
      answerType: answerType(activity),
      elapsedMs: Math.max(0, Date.now() - (startedAt.current ?? Date.now())),
      evaluationStatus: finalRes.status,
    });
    onComplete?.(activity.id, finalRes.correct);
  }

  function move(index: number, delta: number) {
    if (!Array.isArray(response)) return;
    const next = [...response];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setResponse(next);
  }

  const sajSelected = (activity.type === 'select_and_justify' && typeof response === 'object' && 'selected' in response) ? (response as { selected?: number }).selected : undefined;
  const sajRationale = (activity.type === 'select_and_justify' && typeof response === 'object' && 'rationale' in response) ? (response as { rationale?: string }).rationale || '' : '';
  const hasCriticalInReview = Boolean(evaluationResult?.rubricResult && 'criticalErrors' in evaluationResult.rubricResult && evaluationResult.rubricResult.criticalErrors.length > 0);

  return (
    <section className={`learning-activity ${phase}`} aria-labelledby={`${activity.id}-title`}>
      <div className="activity-kicker">
        {phase === 'diagnostic' ? 'Najpierw przewidź' : phase === 'exit' ? 'Sprawdź przed wyjściem' : phase === 'review' ? 'Napraw błąd' : 'Zatrzymaj się i zastosuj'}
      </div>
      <h3 id={`${activity.id}-title`}>{activity.prompt}</h3>

      {/* Choice: Single choice, lab, trend, missing information */}
      {(activity.type === 'single_choice' || activity.type === 'lab' || activity.type === 'trend' || activity.type === 'missing_information') && (
        <div className="activity-options">
          {activity.options.map((option, index) => (
            <button key={option} type="button" aria-pressed={response === index} className={response === index ? 'selected' : ''} disabled={revealed} onClick={() => setResponse(index)}>
              <span>{String.fromCharCode(65 + index)}</span>{option}
            </button>
          ))}
        </div>
      )}

      {/* Multi select */}
      {activity.type === 'multi_select' && (
        <div className="activity-options">
          {activity.options.map((option, index) => {
            const selected = Array.isArray(response) && response.includes(index);
            return (
              <button key={option} type="button" className={selected ? 'selected' : ''} disabled={revealed} aria-pressed={selected} onClick={() => setResponse(current => Array.isArray(current) ? selected ? current.filter(item => item !== index) : [...current, index] : [index])}>
                <span>{selected ? <Check size={15}/> : String.fromCharCode(65 + index)}</span>{option}
              </button>
            );
          })}
        </div>
      )}

      {/* Ordering */}
      {activity.type === 'ordering' && Array.isArray(response) && (
        <ol className="ordering-list">
          {response.map((itemIndex, index) => (
            <li key={itemIndex}>
              <span>{activity.items[itemIndex]}</span>
              <button aria-label="Przesuń wyżej" disabled={revealed || index === 0} onClick={() => move(index, -1)}><ArrowUp size={16}/></button>
              <button aria-label="Przesuń niżej" disabled={revealed || index === response.length - 1} onClick={() => move(index, 1)}><ArrowDown size={16}/></button>
            </li>
          ))}
        </ol>
      )}

      {/* Numeric */}
      {activity.type === 'numeric' && (
        <label className="field">Wynik ({activity.unit})<input inputMode="decimal" disabled={revealed} value={String(response)} onChange={event => setResponse(event.target.value.replace(',', '.'))}/></label>
      )}

      {/* Matching */}
      {activity.type === 'matching' && (
        <div className="matching-list">
          {activity.pairs.map(([left]) => (
            <label key={left}>
              {left}
              <select disabled={revealed} value={(response as Record<string, string>)[left] ?? ''} onChange={event => setResponse(current => ({ ...current as Record<string, string>, [left]: event.target.value }))}>
                <option value="">Wybierz parę</option>
                {activity.pairs.map(([, right]) => <option key={right} value={right}>{right}</option>)}
              </select>
            </label>
          ))}
        </div>
      )}

      {/* Recall */}
      {activity.type === 'recall' && (
        <label className="field">Twoje wyjaśnienie<textarea disabled={revealed} value={String(response)} onChange={event => setResponse(event.target.value)} placeholder="Nazwij mechanizm, wskaż typowy wzorzec i ważny wyjątek." rows={3}/></label>
      )}

      {/* Short Answer */}
      {activity.type === 'short_answer' && (
        <label className="field">
          Odpowiedź kliniczna (1–4 zdania)
          <textarea disabled={revealed} value={typeof response === 'string' ? response : (response as { text?: string })?.text || ''} onChange={e => setResponse(e.target.value)} placeholder="Wymień kluczowe parametry, uzasadnij rozpoznanie lub wskaż niezbędne działanie..." rows={4}/>
        </label>
      )}

      {/* Select and Justify */}
      {activity.type === 'select_and_justify' && (
        <div className="select-and-justify-block space-y-4">
          <div className="activity-options">
            {activity.options.map((opt, idx) => (
              <button key={opt} type="button" className={sajSelected === idx ? 'selected' : ''} disabled={revealed} onClick={() => { setResponse({ selected: idx, rationale: sajRationale }); setTimeout(() => rationaleRef.current?.focus(), 50); }}>
                <span>{String.fromCharCode(65 + idx)}</span>{opt}
              </button>
            ))}
          </div>
          {sajSelected !== undefined && (
            <div className="rationale-section animate-fade-in mt-3">
              <label className="field font-medium block mb-1">
                Uzasadnij swoją decyzję kliniczną:
                <textarea ref={rationaleRef} disabled={revealed} value={sajRationale} onChange={e => setResponse({ selected: sajSelected, rationale: e.target.value })} placeholder="Wskaż mechanizm, wykluczone alternatywy lub względy bezpieczeństwa..." rows={3} className="w-full mt-1"/>
              </label>
            </div>
          )}
        </div>
      )}

      {/* Evidence Weighting */}
      {activity.type === 'evidence_weighting' && (
        <div className="evidence-weighting-block space-y-3">
          <div className="text-sm font-semibold text-muted-foreground mb-2">Hipoteza: <span className="text-foreground font-bold">{activity.hypothesis}</span></div>
          {activity.items.map(item => {
            const currentMap = (response && typeof response === 'object' && 'classifications' in response && response.classifications)
              ? (response.classifications as Record<string, 'supports' | 'opposes' | 'neutral'>)
              : {};
            const val = currentMap[item.id];
            return (
              <div key={item.id} className="p-3 border rounded-lg bg-card space-y-2">
                <div className="text-sm font-medium">{item.text}</div>
                <div className="flex gap-2">
                  {(['supports', 'opposes', 'neutral'] as const).map(direction => (
                    <button key={direction} type="button" disabled={revealed} className={`text-xs px-3 py-1 rounded border ${val === direction ? 'bg-primary text-primary-foreground font-bold' : 'bg-muted'}`} onClick={() => setResponse({ classifications: { ...currentMap, [item.id]: direction } })}>
                      {direction === 'supports' ? 'Wspiera (+)' : direction === 'opposes' ? 'Osłabia (-)' : 'Neutralne (0)'}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Clinical Reasoning */}
      {activity.type === 'clinical_reasoning' && (
        <div className="clinical-reasoning-block space-y-3">
          {activity.rubric.dimensions.map(dim => {
            const dims = (response as { dimensions?: Record<string, string> })?.dimensions || {};
            const isReq = dim.required !== false;
            return (
              <label key={dim.id} className="field block">
                <span className="font-medium text-sm">{dim.label} {isReq ? <span className="text-red-500 font-bold">*</span> : <span className="text-xs text-muted-foreground">(opcjonalnie)</span>}</span>
                <textarea disabled={revealed} value={dims[dim.id] || ''} onChange={e => setResponse({ dimensions: { ...dims, [dim.id]: e.target.value } })} placeholder={`Opisz ${dim.label.toLowerCase()}...`} rows={2} className="w-full mt-1"/>
              </label>
            );
          })}
        </div>
      )}

      {/* Confidence selector (only in answering phase) */}
      {evaluationPhase === 'answering' && activity.type !== 'recall' && (
        <div className="confidence-row" aria-label="Jak pewna jest odpowiedź?">
          {([1, 2, 3] as Confidence[]).map(value => (
            <button key={value} type="button" aria-pressed={confidence === value} className={confidence === value ? 'active' : ''} onClick={() => setConfidence(value)}>
              {confidenceLabels[value]}
            </button>
          ))}
        </div>
      )}

      {evaluationPhase === 'answering' && activity.hint && (
        <button className="text-button" onClick={() => setHint(v => !v)}>
          <HelpCircle size={15}/>{hint ? 'Ukryj wskazówkę' : 'Potrzebuję wskazówki'}
        </button>
      )}
      {hint && evaluationPhase === 'answering' && <p className="activity-hint">{activity.hint}</p>}

      {/* Action Button: Initial Submit */}
      {evaluationPhase === 'answering' && (
        <button className="primary activity-submit" disabled={!canSubmit} onClick={() => void handleInitialSubmit()}>
          {activity.type === 'recall' ? 'Porównaj z odpowiedzią' : isOpenAnswer ? 'Oceń odpowiedź (Self-Review)' : 'Sprawdź odpowiedź'}
        </button>
      )}

      {/* PHASE 2: SELF-REVIEW FOR OPEN ANSWERS */}
      {evaluationPhase === 'reviewing' && (
        <div ref={reviewRef} tabIndex={-1} className="self-review-panel border rounded-lg p-4 bg-muted/40 space-y-4 mt-4 outline-none" aria-live="polite">
          <div className="flex items-center gap-2 border-b pb-2">
            <AlertCircle size={18} className="text-primary"/>
            <h4 className="font-bold text-sm">Ocena odpowiedzi i kryteria (Self-Review)</h4>
          </div>

          {/* Structured Feedback from Rubric */}
          {evaluationResult?.rubricResult && 'coveredConcepts' in evaluationResult.rubricResult && (
            <div className="space-y-2 text-sm">
              {evaluationResult.rubricResult.coveredConcepts.length > 0 && (
                <div className="p-2 rounded bg-green-500/10 text-green-700 dark:text-green-300 flex items-start gap-2">
                  <Check size={16} className="mt-0.5 shrink-0"/>
                  <div><strong>Ujęto:</strong> {evaluationResult.rubricResult.coveredConcepts.map(c => c.label).join(', ')}</div>
                </div>
              )}
              {evaluationResult.rubricResult.missingConcepts.length > 0 && (
                <div className="p-2 rounded bg-amber-500/10 text-amber-800 dark:text-amber-300 flex items-start gap-2">
                  <AlertTriangle size={16} className="mt-0.5 shrink-0"/>
                  <div><strong>Do uzupełnienia:</strong> {evaluationResult.rubricResult.missingConcepts.map(c => c.label).join(', ')}</div>
                </div>
              )}
              {evaluationResult.rubricResult.criticalErrors.length > 0 && (
                <div className="p-2 rounded bg-red-500/10 text-red-700 dark:text-red-300 font-semibold flex items-start gap-2">
                  <AlertCircle size={16} className="mt-0.5 shrink-0"/>
                  <div><strong>Błąd krytyczny:</strong> {evaluationResult.rubricResult.criticalErrors.map(e => e.feedback).join('; ')}</div>
                </div>
              )}
            </div>
          )}

          {/* Model answer revealed during self-review */}
          {'modelAnswer' in activity && activity.modelAnswer && (
            <div className="p-3 bg-card border rounded text-xs space-y-1">
              <span className="font-bold text-muted-foreground uppercase tracking-wide">Wzorzec odpowiedzi klinicznej:</span>
              <p className="text-foreground font-medium">{activity.modelAnswer}</p>
            </div>
          )}

          {/* User Confirmation Selector */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold block text-muted-foreground">Oceń trafność swojej odpowiedzi:</span>
            {hasCriticalInReview ? (
              <div className="text-xs font-bold text-red-600 dark:text-red-400 p-2 bg-red-500/10 rounded">
                ✕ Wykryto błąd krytyczny lub zagrażający bezpieczeństwu. Status „Wymaga poprawy” ma bezwzględne pierwszeństwo i nie może zostać nadpisany.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  className={`p-2 rounded border text-left font-medium transition ${selfReviewChoice === 'correct' ? 'bg-green-600 text-white font-bold' : 'bg-card hover:bg-muted'}`}
                  onClick={() => setSelfReviewChoice('correct')}
                >
                  ✓ Spełnia kryteria (Poprawna)
                </button>
                <button
                  type="button"
                  className={`p-2 rounded border text-left font-medium transition ${selfReviewChoice === 'partially_correct' ? 'bg-amber-600 text-white font-bold' : 'bg-card hover:bg-muted'}`}
                  onClick={() => setSelfReviewChoice('partially_correct')}
                >
                  △ Częściowo trafna
                </button>
                <button
                  type="button"
                  className={`p-2 rounded border text-left font-medium transition ${selfReviewChoice === 'needs_revision' ? 'bg-red-600 text-white font-bold' : 'bg-card hover:bg-muted'}`}
                  onClick={() => setSelfReviewChoice('needs_revision')}
                >
                  ✕ Wymaga uzupełnienia
                </button>
              </div>
            )}
          </div>

          <button className="primary w-full py-2 text-sm font-semibold rounded" onClick={() => void handleFinalizeReview()}>
            Zatwierdź ocenę i zakończ
          </button>
        </div>
      )}

      {/* PHASE 3: FINALIZED FEEDBACK */}
      {evaluationPhase === 'finalized' && (
        <div className={`activity-feedback ${evaluationResult?.correct ? 'correct' : evaluationResult?.status === 'partially_correct' ? 'warning' : 'incorrect'} mt-4`} role="status" aria-live="polite">
          <strong className="flex items-center gap-2">
            {evaluationResult?.status === 'correct' ? <Check size={18}/> : evaluationResult?.status === 'partially_correct' ? <AlertTriangle size={18}/> : <AlertCircle size={18}/>}
            {activity.type === 'recall'
              ? 'Odpowiedź wzorcowa'
              : evaluationResult?.status === 'correct'
              ? 'Trafne rozumowanie'
              : evaluationResult?.status === 'partially_correct'
              ? 'Częściowo poprawne'
              : evaluationResult?.status === 'ungraded'
              ? 'Wymaga autorefleksji (ungraded)'
              : phase === 'diagnostic'
              ? 'Punkt wyjściowy — bez kary'
              : 'Wymaga powtórzenia'}
          </strong>

          {activity.type === 'recall' && <p className="mt-2 text-sm">{activity.modelAnswer}</p>}
          {'modelAnswer' in activity && activity.modelAnswer && activity.type !== 'recall' && (
            <div className="mt-2 text-sm p-2 bg-muted rounded"><strong>Wzorzec odpowiedzi:</strong> {activity.modelAnswer}</div>
          )}
          {evaluationResult?.feedback && <p className="mt-1 text-sm">{evaluationResult.feedback}</p>}

          <p className="mt-2 text-xs text-muted-foreground">{activity.explanation}</p>

          {phase === 'review' && (
            <button className="text-button mt-3" onClick={() => { setEvaluationPhase('answering'); setResponse(initialResponse); setConfidence(undefined); startedAt.current = Date.now(); }}>
              <RotateCcw size={15}/>Spróbuj ponownie
            </button>
          )}
        </div>
      )}
    </section>
  );
}
