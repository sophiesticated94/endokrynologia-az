import type {
  RubricDefinition,
  MultiDimensionalRubricDefinition,
  RubricEvaluationStatus,
} from './course-types.ts';

export interface RubricEvaluationResult {
  status: RubricEvaluationStatus;
  score: number;
  coveredConcepts: Array<{ id: string; label: string }>;
  missingConcepts: Array<{ id: string; label: string }>;
  criticalErrors: Array<{ id: string; feedback: string }>;
  warnings: Array<{ id: string; feedback: string }>;
  feedback: string;
}

export interface MultiDimensionalEvaluationResult {
  dimensions: Record<string, RubricEvaluationResult>;
  criticalErrors: Array<{ id: string; feedback: string }>;
  overallStatus: RubricEvaluationStatus;
}

export interface RubricEvaluator {
  evaluate(rubric: RubricDefinition, studentText: string): RubricEvaluationResult;
  evaluateMultiDimensional(
    rubric: MultiDimensionalRubricDefinition,
    dimensionTexts: Record<string, string>
  ): MultiDimensionalEvaluationResult;
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'„”]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function matchPhrase(normText: string, phrase: string): boolean {
  const normPhrase = normalizeText(phrase);
  if (!normPhrase) return false;
  return normText.includes(normPhrase);
}

function checkNegation(normText: string, phrase: string): boolean {
  const normPhrase = normalizeText(phrase);
  const index = normText.indexOf(normPhrase);
  if (index === -1) return false;
  const preceding = normText.slice(Math.max(0, index - 30), index);
  return /\b(nie|brak|bez|nigdy|ani|nieprawda)\b/.test(preceding);
}

export class DeterministicRubricEvaluator implements RubricEvaluator {
  evaluate(rubric: RubricDefinition, studentText: string): RubricEvaluationResult {
    const rawTrimmed = studentText.trim();
    if (rawTrimmed.length < 5) {
      return {
        status: 'ungraded',
        score: 0,
        coveredConcepts: [],
        missingConcepts: rubric.requiredConcepts.map(c => ({ id: c.id, label: c.label })),
        criticalErrors: [],
        warnings: [],
        feedback: 'Odpowiedź jest zbyt krótka, aby ocenić ujęcie kluczowych pojęć klinicznych.',
      };
    }

    const normText = normalizeText(studentText);
    const criticalErrors: Array<{ id: string; feedback: string }> = [];
    const warnings: Array<{ id: string; feedback: string }> = [];

    // Check contradictions and critical errors
    if (rubric.contradictions) {
      for (const contra of rubric.contradictions) {
        for (const pattern of contra.patterns) {
          if (matchPhrase(normText, pattern)) {
            if (contra.severity === 'critical') {
              criticalErrors.push({ id: contra.id, feedback: contra.feedback });
            } else {
              warnings.push({ id: contra.id, feedback: contra.feedback });
            }
            break;
          }
        }
      }
    }

    // Evaluate required concepts
    const coveredConcepts: Array<{ id: string; label: string }> = [];
    const missingConcepts: Array<{ id: string; label: string }> = [];

    for (const concept of rubric.requiredConcepts) {
      let matched = false;
      for (const phrase of concept.acceptedPhrases) {
        if (matchPhrase(normText, phrase)) {
          if (concept.negationSensitive) {
            const hasNeg = checkNegation(normText, phrase);
            if (!hasNeg) {
              matched = true;
              break;
            }
          } else {
            matched = true;
            break;
          }
        }
      }

      if (matched) {
        coveredConcepts.push({ id: concept.id, label: concept.label });
      } else {
        missingConcepts.push({ id: concept.id, label: concept.label });
      }
    }

    const minReq = Math.min(rubric.minRequired, rubric.requiredConcepts.length);
    let status: RubricEvaluationStatus = 'ungraded';
    let score = 0;

    if (criticalErrors.length > 0) {
      status = 'needs_revision';
      score = 0;
    } else if (coveredConcepts.length >= minReq) {
      status = 'correct';
      score = 1;
    } else if (coveredConcepts.length > 0) {
      status = 'partially_correct';
      score = coveredConcepts.length / Math.max(1, rubric.requiredConcepts.length);
    } else {
      status = 'ungraded';
      score = 0;
    }

    const feedbackLines: string[] = [];
    if (coveredConcepts.length > 0) {
      feedbackLines.push(`Ujęto pojęcia: ${coveredConcepts.map(c => c.label).join(', ')}.`);
    }
    if (missingConcepts.length > 0 && status !== 'correct') {
      feedbackLines.push(`Do uwzględnienia: ${missingConcepts.map(c => c.label).join(', ')}.`);
    }
    if (criticalErrors.length > 0) {
      feedbackLines.push(`Krytyczny błąd kliniczny: ${criticalErrors.map(e => e.feedback).join('; ')}`);
    }

    return {
      status,
      score,
      coveredConcepts,
      missingConcepts,
      criticalErrors,
      warnings,
      feedback: feedbackLines.join(' '),
    };
  }

  evaluateMultiDimensional(
    rubric: MultiDimensionalRubricDefinition,
    dimensionTexts: Record<string, string>
  ): MultiDimensionalEvaluationResult {
    const dimResults: Record<string, RubricEvaluationResult> = {};
    const topCriticalErrors: Array<{ id: string; feedback: string }> = [];

    const combinedNorm = normalizeText(Object.values(dimensionTexts).join(' '));
    if (rubric.criticalErrors) {
      for (const contra of rubric.criticalErrors) {
        for (const pattern of contra.patterns) {
          if (matchPhrase(combinedNorm, pattern)) {
            topCriticalErrors.push({ id: contra.id, feedback: contra.feedback });
            break;
          }
        }
      }
    }

    let hasNeedsRevision = topCriticalErrors.length > 0;
    let hasPartiallyCorrect = false;
    let hasUngraded = false;
    let allCorrect = true;

    for (const dim of rubric.dimensions) {
      const text = dimensionTexts[dim.id] || '';
      const dimRubric = {
        requiredConcepts: dim.requiredConcepts,
        optionalConcepts: dim.optionalConcepts,
        contradictions: dim.criticalErrors,
        minRequired: Math.min(1, dim.requiredConcepts.length),
      };

      const res = this.evaluate(dimRubric, text);
      dimResults[dim.id] = res;

      if (res.status === 'needs_revision') hasNeedsRevision = true;
      else if (res.status === 'partially_correct') hasPartiallyCorrect = true;
      else if (res.status === 'ungraded') hasUngraded = true;

      if (res.status !== 'correct') allCorrect = false;
    }

    let overallStatus: RubricEvaluationStatus = 'ungraded';
    if (hasNeedsRevision) overallStatus = 'needs_revision';
    else if (allCorrect) overallStatus = 'correct';
    else if (hasPartiallyCorrect) overallStatus = 'partially_correct';
    else if (hasUngraded) overallStatus = 'ungraded';

    return {
      dimensions: dimResults,
      criticalErrors: topCriticalErrors,
      overallStatus,
    };
  }
}

export const defaultRubricEvaluator = new DeterministicRubricEvaluator();
