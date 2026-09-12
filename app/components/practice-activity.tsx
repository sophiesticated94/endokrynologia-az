'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Check, HelpCircle, RotateCcw } from 'lucide-react';
import type { Confidence, LearningActivity, PracticeAnswerType, PracticeRecordMeta } from '@/lib/course-types';
import { gradeActivity, type ActivityResponse } from '@/lib/activity-grading';

const confidenceLabels: Record<Confidence, string> = { 1: 'Zgaduję', 2: 'Raczej wiem', 3: 'Jestem pewien' };
function answerType(activity: LearningActivity): PracticeAnswerType {
  if (activity.type === 'multi_select') return 'choice_indexes';
  if (activity.type === 'ordering') return 'ordered_indexes';
  if (activity.type === 'matching') return 'matching_map';
  if (activity.type === 'numeric') return 'numeric_value';
  if (activity.type === 'recall') return 'self_assessment';
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
  const initialOrder = useMemo(() => activity.type === 'ordering' ? activity.items.map((_, index) => index).reverse() : [], [activity]);
  const [response, setResponse] = useState<ActivityResponse>(activity.type === 'ordering' ? initialOrder : activity.type === 'multi_select' ? [] : activity.type === 'matching' ? {} : '');
  const [confidence, setConfidence] = useState<Confidence>();
  const [revealed, setRevealed] = useState(false);
  const [hint, setHint] = useState(false);
  const startedAt = useRef<number|null>(null);
  useEffect(() => { startedAt.current = Date.now(); }, [activity.id]);
  const result = revealed ? gradeActivity(activity, response) : null;
  const hasResponse = activity.type === 'matching'
    ? Object.keys(response as Record<string,string>).length === activity.pairs.length
    : activity.type === 'multi_select'
      ? Array.isArray(response) && response.length > 0
      : response !== '';
  const canSubmit = activity.type === 'recall' ? String(response).trim().length > 0 : hasResponse && confidence !== undefined;

  async function submit() {
    if (!canSubmit) return;
    const correct = activity.type === 'recall' ? true : gradeActivity(activity, response) === true;
    setRevealed(true);
    await onRecord(activity, correct, confidence, phase !== 'diagnostic' && activity.type !== 'recall', {
      answerType: answerType(activity),
      elapsedMs: Math.max(0, Date.now() - (startedAt.current ?? Date.now())),
    });
    onComplete?.(activity.id, correct);
  }

  function move(index: number, delta: number) {
    if (!Array.isArray(response)) return;
    const next = [...response];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setResponse(next);
  }

  const choiceOptions = 'options' in activity ? activity.options : [];
  return (
    <section className={`learning-activity ${phase}`} aria-labelledby={`${activity.id}-title`}>
      <div className="activity-kicker">
        {phase === 'diagnostic' ? 'Najpierw przewidź' : phase === 'exit' ? 'Sprawdź przed wyjściem' : phase === 'review' ? 'Napraw błąd' : 'Zatrzymaj się i zastosuj'}
      </div>
      <h3 id={`${activity.id}-title`}>{activity.prompt}</h3>

      {(activity.type === 'single_choice' || activity.type === 'lab' || activity.type === 'trend' || activity.type === 'missing_information') && (
        <div className="activity-options">
          {choiceOptions.map((option, index) => (
            <button key={option} type="button" aria-pressed={response === index} className={response === index ? 'selected' : ''} disabled={revealed} onClick={() => setResponse(index)}>
              <span>{String.fromCharCode(65 + index)}</span>{option}
            </button>
          ))}
        </div>
      )}

      {activity.type === 'multi_select' && (
        <div className="activity-options">
          {activity.options.map((option, index) => {
            const selected = Array.isArray(response) && response.includes(index);
            return <button key={option} type="button" className={selected ? 'selected' : ''} disabled={revealed} aria-pressed={selected} onClick={() => setResponse(current => Array.isArray(current) ? selected ? current.filter(item => item !== index) : [...current, index] : [index])}><span>{selected ? <Check size={15}/> : String.fromCharCode(65 + index)}</span>{option}</button>;
          })}
        </div>
      )}

      {activity.type === 'ordering' && Array.isArray(response) && (
        <ol className="ordering-list">
          {response.map((itemIndex, index) => <li key={itemIndex}><span>{activity.items[itemIndex]}</span><button aria-label="Przesuń wyżej" disabled={revealed || index === 0} onClick={() => move(index, -1)}><ArrowUp size={16}/></button><button aria-label="Przesuń niżej" disabled={revealed || index === response.length - 1} onClick={() => move(index, 1)}><ArrowDown size={16}/></button></li>)}
        </ol>
      )}

      {activity.type === 'numeric' && <label className="field">Wynik ({activity.unit})<input inputMode="decimal" disabled={revealed} value={String(response)} onChange={event => setResponse(event.target.value.replace(',', '.'))}/></label>}
      {activity.type === 'matching' && <div className="matching-list">{activity.pairs.map(([left])=><label key={left}>{left}<select disabled={revealed} value={(response as Record<string,string>)[left]??''} onChange={event=>setResponse(current=>({...current as Record<string,string>,[left]:event.target.value}))}><option value="">Wybierz parę</option>{activity.pairs.map(([,right])=><option key={right} value={right}>{right}</option>)}</select></label>)}</div>}
      {activity.type === 'recall' && <label className="field">Twoje wyjaśnienie<textarea disabled={revealed} value={String(response)} onChange={event => setResponse(event.target.value)} placeholder="Nazwij mechanizm, wskaż typowy wzorzec i ważny wyjątek."/></label>}

      {!revealed && activity.type !== 'recall' && <div className="confidence-row" aria-label="Jak pewna jest odpowiedź?">{([1,2,3] as Confidence[]).map(value => <button key={value} type="button" aria-pressed={confidence === value} className={confidence === value ? 'active' : ''} onClick={() => setConfidence(value)}>{confidenceLabels[value]}</button>)}</div>}
      {!revealed && activity.hint && <button className="text-button" onClick={() => setHint(value => !value)}><HelpCircle size={15}/>{hint ? 'Ukryj wskazówkę' : 'Potrzebuję wskazówki'}</button>}
      {hint && !revealed && <p className="activity-hint">{activity.hint}</p>}

      {!revealed ? <button className="primary activity-submit" disabled={!canSubmit} onClick={() => void submit()}>{activity.type === 'recall' ? 'Porównaj z odpowiedzią' : 'Sprawdź tok rozumowania'}</button> : (
        <div className={`activity-feedback ${result === false ? 'incorrect' : 'correct'}`} role="status">
          <strong>{activity.type === 'recall' ? 'Odpowiedź wzorcowa' : result ? 'Trafne rozumowanie' : phase === 'diagnostic' ? 'To punkt startowy — bez kary' : 'Warto wrócić do tego celu'}</strong>
          {activity.type === 'recall' && <p>{activity.modelAnswer}</p>}
          {result === false && typeof response === 'number' && activity.optionFeedback?.[response] && <p><strong>Dlaczego ten wybór nie działa:</strong> {activity.optionFeedback[response]}</p>}
          <p>{activity.explanation}</p>
          {phase === 'review' && <button className="text-button" onClick={() => {setRevealed(false);setResponse(activity.type === 'ordering' ? initialOrder : activity.type === 'multi_select' ? [] : activity.type === 'matching' ? {} : '');setConfidence(undefined);startedAt.current=Date.now()}}><RotateCcw size={15}/>Spróbuj ponownie</button>}
        </div>
      )}
    </section>
  );
}
