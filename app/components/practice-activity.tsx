'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Check, HelpCircle, RotateCcw } from 'lucide-react';
import type { Confidence, LearningActivity, PracticeAnswerType, PracticeRecordMeta } from '@/lib/course-types';
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
  const [revealed, setRevealed] = useState(false);
  const [hint, setHint] = useState(false);
  const startedAt = useRef<number | null>(null);
  const rationaleRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    setResponse(initialResponse);
    setConfidence(undefined);
    setRevealed(false);
    setHint(false);
  }, [activity.id, initialResponse]);

  const detailedResult = useMemo<DetailedGradingResult | null>(() => {
    if (!revealed) return null;
    return evaluateActivity(activity, response);
  }, [revealed, activity, response]);

  const hasResponse = useMemo(() => {
    if (activity.type === 'matching') {
      return Object.keys((response as Record<string, string>) || {}).length === activity.pairs.length;
    }
    if (activity.type === 'multi_select') {
      return Array.isArray(response) && response.length > 0;
    }
    if (activity.type === 'evidence_weighting') {
      const cls = (response as { classifications: Record<string, string> })?.classifications || {};
      return activity.items.every(item => Boolean(cls[item.id]));
    }
    if (activity.type === 'select_and_justify') {
      const saj = response as { selected?: number | number[]; rationale?: string };
      return saj && saj.selected !== undefined && (saj.rationale || '').trim().length > 0;
    }
    if (activity.type === 'clinical_reasoning') {
      const dims = (response as { dimensions?: Record<string, string> })?.dimensions || {};
      return activity.rubric.dimensions.some(d => (dims[d.id] || '').trim().length > 0);
    }
    if (activity.type === 'short_answer' || activity.type === 'recall') {
      const text = typeof response === 'string' ? response : (response as { text?: string })?.text || '';
      return text.trim().length > 0;
    }
    return response !== '';
  }, [activity, response]);

  const canSubmit = (activity.type === 'recall' ? hasResponse : hasResponse && confidence !== undefined);

  async function submit() {
    if (!canSubmit) return;
    try {
      const res = evaluateActivity(activity, response);
      setRevealed(true);
      const isScored = phase !== 'diagnostic' && activity.type !== 'recall';
      await onRecord(activity, res.correct, confidence, isScored, {
        answerType: answerType(activity),
        elapsedMs: Math.max(0, Date.now() - (startedAt.current ?? Date.now())),
        evaluationStatus: res.status,
      });
      onComplete?.(activity.id, res.correct);
    } catch (err) {
      console.error('Error submitting activity:', err);
    }
  }

  function move(index: number, delta: number) {
    if (!Array.isArray(response)) return;
    const next = [...response];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setResponse(next);
  }

  // select_and_justify state extraction
  const sajSelected = (activity.type === 'select_and_justify' && typeof response === 'object' && 'selected' in response) ? (response as { selected?: number }).selected : undefined;
  const sajRationale = (activity.type === 'select_and_justify' && typeof response === 'object' && 'rationale' in response) ? (response as { rationale?: string }).rationale || '' : '';

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

      {/* Choice: Multi select */}
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
        <label className="field">Twoje wyjaśnienie<textarea disabled={revealed} value={String(response)} onChange={event => setResponse(event.target.value)} placeholder="Nazwij mechanizm, wskaż typowy wzorzec i ważny wyjątek."/></label>
      )}

      {/* Short Answer */}
      {activity.type === 'short_answer' && (
        <label className="field">
          Odpowiedź kliniczna (1–4 zdania)
          <textarea disabled={revealed} value={typeof response === 'string' ? response : (response as { text?: string })?.text || ''} onChange={e => setResponse(e.target.value)} placeholder="Wymień kluczowe parametry, uzasadnij rozpoznanie lub wskaż niezbędne działanie..." rows={4}/>
        </label>
      )}

      {/* Select and Justify: Two-phase interactive card */}
      {activity.type === 'select_and_justify' && (
        <div className="select-and-justify-block space-y-4">
          <div className="activity-options">
            {activity.options.map((opt, idx) => (
              <button
                key={opt}
                type="button"
                className={sajSelected === idx ? 'selected' : ''}
                disabled={revealed}
                onClick={() => {
                  setResponse({ selected: idx, rationale: sajRationale });
                  setTimeout(() => rationaleRef.current?.focus(), 50);
                }}
              >
                <span>{String.fromCharCode(65 + idx)}</span>{opt}
              </button>
            ))}
          </div>

          {sajSelected !== undefined && (
            <div className="rationale-section animate-fade-in mt-3">
              <label className="field font-medium block mb-1">
                Uzasadnij swoją decyzję (które dane są rozstrzygające?):
                <textarea
                  ref={rationaleRef}
                  disabled={revealed}
                  value={sajRationale}
                  onChange={e => setResponse({ selected: sajSelected, rationale: e.target.value })}
                  placeholder="Wskaż mechanizm, wykluczone alternatywy lub względy bezpieczeństwa..."
                  rows={3}
                  className="w-full mt-1"
                />
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
                    <button
                      key={direction}
                      type="button"
                      disabled={revealed}
                      className={`text-xs px-3 py-1 rounded border ${val === direction ? 'bg-primary text-primary-foreground font-bold' : 'bg-muted'}`}
                      onClick={() => setResponse({ classifications: { ...currentMap, [item.id]: direction } })}
                    >
                      {direction === 'supports' ? 'Wspiera (+)' : direction === 'opposes' ? 'Osłabia (-)' : 'Neutralne (0)'}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Clinical Reasoning (Multi-dimensional) */}
      {activity.type === 'clinical_reasoning' && (
        <div className="clinical-reasoning-block space-y-3">
          {activity.rubric.dimensions.map(dim => {
            const dims = (response as { dimensions?: Record<string, string> })?.dimensions || {};
            return (
              <label key={dim.id} className="field block">
                <span className="font-medium text-sm">{dim.label}</span>
                <textarea
                  disabled={revealed}
                  value={dims[dim.id] || ''}
                  onChange={e => setResponse({ dimensions: { ...dims, [dim.id]: e.target.value } })}
                  placeholder={`Opisz ${dim.label.toLowerCase()}...`}
                  rows={2}
                  className="w-full mt-1"
                />
              </label>
            );
          })}
        </div>
      )}

      {/* Confidence selector */}
      {!revealed && activity.type !== 'recall' && (
        <div className="confidence-row" aria-label="Jak pewna jest odpowiedź?">
          {([1, 2, 3] as Confidence[]).map(value => (
            <button key={value} type="button" aria-pressed={confidence === value} className={confidence === value ? 'active' : ''} onClick={() => setConfidence(value)}>
              {confidenceLabels[value]}
            </button>
          ))}
        </div>
      )}

      {!revealed && activity.hint && (
        <button className="text-button" onClick={() => setHint(v => !v)}>
          <HelpCircle size={15}/>{hint ? 'Ukryj wskazówkę' : 'Potrzebuję wskazówki'}
        </button>
      )}
      {hint && !revealed && <p className="activity-hint">{activity.hint}</p>}

      {/* Submit / Feedback */}
      {!revealed ? (
        <button className="primary activity-submit" disabled={!canSubmit} onClick={() => void submit()}>
          {activity.type === 'recall' ? 'Porównaj z odpowiedzią' : 'Sprawdź tok rozumowania'}
        </button>
      ) : (
        <div className={`activity-feedback ${detailedResult?.correct ? 'correct' : detailedResult?.status === 'partially_correct' ? 'warning' : 'incorrect'}`} role="status">
          <strong>
            {activity.type === 'recall'
              ? 'Odpowiedź wzorcowa'
              : detailedResult?.status === 'correct'
              ? 'Trafne rozumowanie'
              : detailedResult?.status === 'partially_correct'
              ? 'Częściowo poprawne'
              : detailedResult?.status === 'ungraded'
              ? 'Wymaga autorefleksji (ungraded)'
              : phase === 'diagnostic'
              ? 'To punkt startowy — bez kary'
              : 'Warto wrócić do tego celu'}
          </strong>

          {activity.type === 'recall' && <p>{activity.modelAnswer}</p>}
          {'modelAnswer' in activity && activity.modelAnswer && <div className="mt-2 text-sm p-2 bg-muted rounded"><strong>Wzorzec odpowiedzi:</strong> {activity.modelAnswer}</div>}
          {detailedResult?.feedback && <p className="mt-1">{detailedResult.feedback}</p>}

          {/* Rubric feedback details if present */}
          {detailedResult?.rubricResult && 'coveredConcepts' in detailedResult.rubricResult && (
            <div className="rubric-breakdown mt-2 space-y-1 text-xs">
              {detailedResult.rubricResult.coveredConcepts.length > 0 && (
                <div className="text-green-700 dark:text-green-400">✓ Ujęto: {detailedResult.rubricResult.coveredConcepts.map(c => c.label).join(', ')}</div>
              )}
              {detailedResult.rubricResult.missingConcepts.length > 0 && (
                <div className="text-amber-700 dark:text-amber-400">△ Do uzupełnienia: {detailedResult.rubricResult.missingConcepts.map(c => c.label).join(', ')}</div>
              )}
              {detailedResult.rubricResult.criticalErrors.length > 0 && (
                <div className="text-red-700 dark:text-red-400 font-bold">✕ Błąd krytyczny: {detailedResult.rubricResult.criticalErrors.map(e => e.feedback).join('; ')}</div>
              )}
            </div>
          )}

          <p>{activity.explanation}</p>

          {phase === 'review' && (
            <button className="text-button" onClick={() => { setRevealed(false); setResponse(initialResponse); setConfidence(undefined); startedAt.current = Date.now(); }}>
              <RotateCcw size={15}/>Spróbuj ponownie
            </button>
          )}
        </div>
      )}
    </section>
  );
}
