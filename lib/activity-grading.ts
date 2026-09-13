import type {
  LearningActivity,
  RubricEvaluationStatus,
} from './course-types.ts';
import {
  defaultRubricEvaluator,
  type RubricEvaluationResult,
  type MultiDimensionalEvaluationResult,
} from './rubric-evaluator.ts';

export type ActivityResponse =
  | number
  | number[]
  | string
  | Record<string, string>
  | { selected?: number | number[]; rationale?: string; userConfirmedStatus?: RubricEvaluationStatus }
  | { text?: string; userConfirmedStatus?: RubricEvaluationStatus }
  | { dimensions?: Record<string, string>; userConfirmedStatus?: RubricEvaluationStatus }
  | { classifications?: Record<string, 'supports' | 'opposes' | 'neutral'> };

export interface DetailedGradingResult {
  status: RubricEvaluationStatus;
  correct: boolean;
  score: number;
  feedback?: string;
  rubricResult?: RubricEvaluationResult | MultiDimensionalEvaluationResult;
  decisionResult?: boolean;
  rationaleResult?: RubricEvaluationStatus;
}

export function evaluateActivity(activity: LearningActivity, response: ActivityResponse): DetailedGradingResult {
  if (activity.type === 'recall') {
    return {
      status: 'ungraded',
      correct: true,
      score: 1,
      feedback: 'Zadanie odtworzenia z pamięci podlega autorefleksji względem odpowiedzi wzorcowej.',
    };
  }

  if (activity.type === 'single_choice' || activity.type === 'lab' || activity.type === 'trend' || activity.type === 'missing_information') {
    const isCorrect = response === activity.answer;
    return {
      status: isCorrect ? 'correct' : 'needs_revision',
      correct: isCorrect,
      score: isCorrect ? 1 : 0,
      feedback: isCorrect ? activity.explanation : (typeof response === 'number' && activity.optionFeedback?.[response]) || activity.explanation,
    };
  }

  if (activity.type === 'multi_select') {
    if (!Array.isArray(response)) {
      return { status: 'needs_revision', correct: false, score: 0, feedback: 'Brak zaznaczonych odpowiedzi.' };
    }
    const expected = [...activity.answers].sort();
    const actual = [...response].sort();
    const isCorrect = actual.length === expected.length && actual.every((v, i) => v === expected[i]);
    const overlap = actual.filter(v => expected.includes(v)).length;
    const extra = actual.filter(v => !expected.includes(v)).length;

    let status: RubricEvaluationStatus = 'needs_revision';
    let score = 0;
    if (isCorrect) {
      status = 'correct';
      score = 1;
    } else if (overlap > 0 && extra === 0) {
      status = 'partially_correct';
      score = overlap / expected.length;
    }

    return {
      status,
      correct: isCorrect,
      score,
      feedback: activity.explanation,
    };
  }

  if (activity.type === 'ordering') {
    if (!Array.isArray(response)) {
      return { status: 'needs_revision', correct: false, score: 0, feedback: 'Nieprawidłowy format kolejności.' };
    }
    const isCorrect = response.join(',') === activity.correctOrder.join(',');
    let matchCount = 0;
    for (let i = 0; i < activity.correctOrder.length; i++) {
      if (response[i] === activity.correctOrder[i]) matchCount++;
    }
    const score = matchCount / Math.max(1, activity.correctOrder.length);
    const status: RubricEvaluationStatus = isCorrect ? 'correct' : score >= 0.5 ? 'partially_correct' : 'needs_revision';

    return {
      status,
      correct: isCorrect,
      score,
      feedback: activity.explanation,
    };
  }

  if (activity.type === 'numeric') {
    const rawVal = typeof response === 'object' && response !== null && 'value' in response ? (response as { value: unknown }).value : response;
    const parsed = typeof rawVal === 'number' ? rawVal : Number(String(rawVal).replace(',', '.'));
    const isCorrect = Number.isFinite(parsed) && Math.abs(parsed - activity.answer) <= activity.tolerance;
    return {
      status: isCorrect ? 'correct' : 'needs_revision',
      correct: isCorrect,
      score: isCorrect ? 1 : 0,
      feedback: activity.explanation,
    };
  }

  if (activity.type === 'matching') {
    if (!response || Array.isArray(response) || typeof response !== 'object') {
      return { status: 'needs_revision', correct: false, score: 0, feedback: 'Brak par dopasowania.' };
    }
    const map = response as Record<string, string>;
    let matched = 0;
    for (const [left, right] of activity.pairs) {
      if (map[left] === right) matched++;
    }
    const total = activity.pairs.length;
    const isCorrect = matched === total;
    const status: RubricEvaluationStatus = isCorrect ? 'correct' : matched > 0 ? 'partially_correct' : 'needs_revision';
    return {
      status,
      correct: isCorrect,
      score: total > 0 ? matched / total : 0,
      feedback: activity.explanation,
    };
  }

  if (activity.type === 'evidence_weighting') {
    let map: Record<string, string> = {};
    if (response && typeof response === 'object') {
      if ('classifications' in response && typeof response.classifications === 'object') {
        map = response.classifications as Record<string, string>;
      } else if (!Array.isArray(response)) {
        map = response as Record<string, string>;
      }
    }
    let matched = 0;
    const total = activity.items.length;
    for (const item of activity.items) {
      if (map[item.id] === item.expected) matched++;
    }
    const isCorrect = total > 0 && matched === total;
    const status: RubricEvaluationStatus = isCorrect ? 'correct' : matched > 0 ? 'partially_correct' : 'needs_revision';
    return {
      status,
      correct: isCorrect,
      score: total > 0 ? matched / total : 0,
      feedback: activity.explanation,
    };
  }

  if (activity.type === 'short_answer') {
    const text = typeof response === 'string' ? response : (response && typeof response === 'object' && 'text' in response) ? String(response.text || '') : '';
    const userConf = (response && typeof response === 'object' && 'userConfirmedStatus' in response) ? (response.userConfirmedStatus as RubricEvaluationStatus | undefined) : undefined;
    const rubricRes = defaultRubricEvaluator.evaluate(activity.rubric, text);
    const hasCritical = rubricRes.criticalErrors.length > 0;
    // Canonical precedence: criticalError -> needs_revision regardless of self-review
    const finalStatus: RubricEvaluationStatus = hasCritical ? 'needs_revision' : (userConf || rubricRes.status);
    const isCorrect = finalStatus === 'correct';
    return {
      status: finalStatus,
      correct: isCorrect,
      score: finalStatus === 'correct' ? 1 : finalStatus === 'partially_correct' ? 0.5 : 0,
      feedback: rubricRes.feedback,
      rubricResult: rubricRes,
    };
  }

  if (activity.type === 'select_and_justify') {
    let selected: number | number[] | undefined;
    let rationale = '';
    let userConf: RubricEvaluationStatus | undefined;

    if (response && typeof response === 'object' && 'selected' in response) {
      if (typeof response.selected === 'number' || Array.isArray(response.selected)) {
        selected = response.selected;
      }
      rationale = String(response.rationale || '');
      userConf = response.userConfirmedStatus as RubricEvaluationStatus | undefined;
    }

    // Evaluate decision component
    let decisionCorrect = false;
    if (Array.isArray(activity.answer)) {
      if (Array.isArray(selected)) {
        decisionCorrect = [...selected].sort().join(',') === [...activity.answer].sort().join(',');
      }
    } else {
      decisionCorrect = selected === activity.answer;
    }

    // Evaluate rationale component
    const rubricRes = defaultRubricEvaluator.evaluate(activity.rationaleRubric, rationale);
    const hasCritical = rubricRes.criticalErrors.length > 0;
    // Canonical precedence: critical error cannot be overridden by user confirmation
    const rationaleStatus: RubricEvaluationStatus = hasCritical ? 'needs_revision' : (userConf || rubricRes.status);

    let finalStatus: RubricEvaluationStatus = 'ungraded';
    if (hasCritical) {
      finalStatus = 'needs_revision';
    } else if (!decisionCorrect) {
      // wrong decision + good reasoning => partially_correct or needs_revision, NEVER correct
      finalStatus = (rationaleStatus === 'correct' || rationaleStatus === 'partially_correct')
        ? 'partially_correct'
        : 'needs_revision';
    } else {
      // correct decision
      if (rationaleStatus === 'correct') {
        finalStatus = 'correct';
      } else if (rationaleStatus === 'partially_correct') {
        finalStatus = 'partially_correct';
      } else if (rationaleStatus === 'needs_revision') {
        finalStatus = 'needs_revision';
      } else {
        finalStatus = 'ungraded';
      }
    }

    const decisionFeedback = decisionCorrect ? 'Decyzja: trafna.' : 'Decyzja: nietrafna.';
    const rationaleFeedback = `Uzasadnienie: ${rubricRes.feedback}`;
    const feedback = `${decisionFeedback} ${rationaleFeedback}`;

    return {
      status: finalStatus,
      correct: finalStatus === 'correct',
      score: finalStatus === 'correct' ? 1 : finalStatus === 'partially_correct' ? 0.5 : 0,
      feedback,
      rubricResult: rubricRes,
      decisionResult: decisionCorrect,
      rationaleResult: rationaleStatus,
    };
  }

  if (activity.type === 'clinical_reasoning') {
    const dimTexts = (response && typeof response === 'object' && 'dimensions' in response)
      ? (response.dimensions as Record<string, string>)
      : (response && typeof response === 'object' && !('text' in response))
      ? (response as Record<string, string>)
      : {};
    const userConf = (response && typeof response === 'object' && 'userConfirmedStatus' in response)
      ? (response.userConfirmedStatus as RubricEvaluationStatus | undefined)
      : undefined;
    const multiRes = defaultRubricEvaluator.evaluateMultiDimensional(activity.rubric, dimTexts);
    const hasCritical = multiRes.criticalErrors.length > 0 ||
      Object.values(multiRes.dimensions).some(d => d.criticalErrors.length > 0);
    // Canonical precedence: criticalError -> needs_revision regardless of self-review
    const finalStatus: RubricEvaluationStatus = hasCritical ? 'needs_revision' : (userConf || multiRes.overallStatus);
    return {
      status: finalStatus,
      correct: finalStatus === 'correct',
      score: finalStatus === 'correct' ? 1 : finalStatus === 'partially_correct' ? 0.5 : 0,
      feedback: activity.explanation,
      rubricResult: multiRes,
    };
  }

  return { status: 'needs_revision', correct: false, score: 0 };
}

export function gradeActivity(activity: LearningActivity, response: ActivityResponse): boolean | null {
  if (activity.type === 'recall') return null;
  const res = evaluateActivity(activity, response);
  if (res.status === 'ungraded') return null;
  return res.correct;
}
