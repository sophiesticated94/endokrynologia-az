import type {
  LearningActivity,
  LessonExperienceV2,
} from './course-types.ts';

export interface ActivityValidationResult {
  isValid: boolean;
  issues: string[];
}

export interface ExperienceValidationResult {
  isValid: boolean;
  issues: string[];
}

export interface ModuleValidationResult {
  isValid: boolean;
  totalActivities: number;
  totalIssues: number;
  issuesByLesson: Record<string, string[]>;
}

export function validateActivitySemanticQA(activity: LearningActivity): ActivityValidationResult {
  const issues: string[] = [];

  if (!activity.id || typeof activity.id !== 'string') {
    issues.push('Aktywność nie posiada poprawnego pola "id".');
  }

  if (!activity.prompt || typeof activity.prompt !== 'string' || activity.prompt.trim().length < 5) {
    issues.push(`Aktywność "${activity.id}": prompt musi zawierać co najmniej 5 znaków.`);
  }

  if (!Array.isArray(activity.objectiveIds) || activity.objectiveIds.length === 0) {
    issues.push(`Aktywność "${activity.id}": brak przypisanych objectiveIds.`);
  }

  switch (activity.type) {
    case 'single_choice':
    case 'lab':
    case 'trend':
    case 'missing_information': {
      if (!Array.isArray(activity.options) || activity.options.length < 2) {
        issues.push(`Aktywność "${activity.id}": pole "options" musi zawierać co najmniej 2 warianty.`);
      } else {
        const uniqueOptions = new Set(activity.options.map(o => (typeof o === 'string' ? o.trim() : '')));
        if (uniqueOptions.size !== activity.options.length) {
          issues.push(`Aktywność "${activity.id}": zduplikowane opcje w pytaniu zamkniętym.`);
        }
        if (activity.options.some(o => typeof o !== 'string' || o.trim().length === 0)) {
          issues.push(`Aktywność "${activity.id}": pusta lub niepoprawna treść opcji.`);
        }
      }

      if (typeof activity.answer !== 'number' || !Number.isInteger(activity.answer)) {
        issues.push(`Aktywność "${activity.id}": odpowiedź ("answer") musi być liczbą całkowitą.`);
      } else if (Array.isArray(activity.options) && (activity.answer < 0 || activity.answer >= activity.options.length)) {
        issues.push(`Aktywność "${activity.id}": indeks odpowiedzi ${activity.answer} poza zakresem opcji (0..${activity.options.length - 1}).`);
      }

      if (Array.isArray(activity.optionFeedback)) {
        if (Array.isArray(activity.options) && activity.optionFeedback.length !== activity.options.length) {
          issues.push(`Aktywność "${activity.id}": długość optionFeedback (${activity.optionFeedback.length}) nie odpowiada liczbie opcji (${activity.options.length}).`);
        }

        // Catch inverted key regressions: explanation matching a distractor feedback instead of the answer
        if (typeof activity.answer === 'number' && activity.answer >= 0 && activity.answer < activity.optionFeedback.length) {
          const expectedFeedback = activity.optionFeedback[activity.answer];
          for (let i = 0; i < activity.optionFeedback.length; i++) {
            if (i !== activity.answer && activity.explanation === activity.optionFeedback[i] && activity.explanation !== expectedFeedback) {
              issues.push(`Aktywność "${activity.id}": wykryto odwrócony klucz odpowiedzi — explanation odpowiada distractorowi #${i}, a nie wyznaczonej odpowiedzi #${activity.answer}.`);
            }
          }
        }

        // Catch explicit rejection / error markers inside explanation of supposed correct answer
        if (typeof activity.explanation === 'string' && /^(?:błąd\b|to błąd|nieprawidłowo\b|jest błędem|błędna odpowiedź)/i.test(activity.explanation.trim())) {
          issues.push(`Aktywność "${activity.id}": wyjaśnienie poprawnej odpowiedzi ("explanation") zawiera frazę negującą jako błąd.`);
        }
      }

      if (!activity.explanation || typeof activity.explanation !== 'string' || activity.explanation.trim().length < 5) {
        issues.push(`Aktywność "${activity.id}": brak lub zbyt krótkie wyjaśnienie ("explanation").`);
      }
      break;
    }

    case 'multi_select': {
      if (!Array.isArray(activity.options) || activity.options.length < 2) {
        issues.push(`Aktywność "${activity.id}": multi_select wymaga co najmniej 2 opcji.`);
      } else {
        const uniqueOptions = new Set(activity.options.map(o => (typeof o === 'string' ? o.trim() : '')));
        if (uniqueOptions.size !== activity.options.length) {
          issues.push(`Aktywność "${activity.id}": zduplikowane opcje w multi_select.`);
        }
      }

      if (!Array.isArray(activity.answers) || activity.answers.length === 0) {
        issues.push(`Aktywność "${activity.id}": multi_select wymaga niepustej tablicy "answers".`);
      } else {
        const uniqueAnswers = new Set(activity.answers);
        if (uniqueAnswers.size !== activity.answers.length) {
          issues.push(`Aktywność "${activity.id}": zduplikowane indeksy w "answers".`);
        }
        if (Array.isArray(activity.options)) {
          for (const ans of activity.answers) {
            if (typeof ans !== 'number' || ans < 0 || ans >= activity.options.length) {
              issues.push(`Aktywność "${activity.id}": indeks odpowiedzi ${ans} poza zakresem opcji.`);
            }
          }
        }
      }

      if (!activity.explanation || typeof activity.explanation !== 'string' || activity.explanation.trim().length < 5) {
        issues.push(`Aktywność "${activity.id}": brak lub zbyt krótkie wyjaśnienie.`);
      }
      break;
    }

    case 'ordering': {
      if (!Array.isArray(activity.items) || activity.items.length < 2) {
        issues.push(`Aktywność "${activity.id}": ordering wymaga co najmniej 2 elementów w "items".`);
      }
      if (!Array.isArray(activity.correctOrder) || (activity.items && activity.correctOrder.length !== activity.items.length)) {
        issues.push(`Aktywność "${activity.id}": correctOrder musi mieć tę samą długość co items.`);
      } else {
        const sortedOrder = [...activity.correctOrder].sort((a, b) => a - b);
        for (let i = 0; i < sortedOrder.length; i++) {
          if (sortedOrder[i] !== i) {
            issues.push(`Aktywność "${activity.id}": correctOrder nie jest poprawną permutacją 0..${sortedOrder.length - 1}.`);
            break;
          }
        }
      }
      break;
    }

    case 'matching': {
      if (!Array.isArray(activity.pairs) || activity.pairs.length < 2) {
        issues.push(`Aktywność "${activity.id}": matching wymaga co najmniej 2 par.`);
      } else {
        const leftKeys = new Set<string>();
        for (const pair of activity.pairs) {
          if (!Array.isArray(pair) || pair.length !== 2 || !pair[0] || !pair[1]) {
            issues.push(`Aktywność "${activity.id}": niepoprawny format pary w matching.`);
          } else {
            if (leftKeys.has(pair[0])) {
              issues.push(`Aktywność "${activity.id}": zduplikowany lewy klucz w matching: "${pair[0]}".`);
            }
            leftKeys.add(pair[0]);
          }
        }
      }
      break;
    }

    case 'numeric': {
      const numAnswer = typeof activity.answer === 'number' ? activity.answer : (activity as { target?: number }).target;
      if (typeof numAnswer !== 'number' || Number.isNaN(numAnswer)) {
        issues.push(`Aktywność "${activity.id}": pole "answer" w zadaniu numerycznym musi być prawidłową liczbą.`);
      }
      if (typeof activity.tolerance !== 'number' || activity.tolerance < 0) {
        issues.push(`Aktywność "${activity.id}": tolerancja w zadaniu numerycznym musi wynosić >= 0.`);
      }
      if (!activity.unit || typeof activity.unit !== 'string') {
        issues.push(`Aktywność "${activity.id}": zadanie numeryczne musi posiadać określoną jednostkę ("unit").`);
      }
      break;
    }

    case 'evidence_weighting': {
      if (!activity.hypothesis || typeof activity.hypothesis !== 'string' || activity.hypothesis.trim().length < 5) {
        issues.push(`Aktywność "${activity.id}": evidence_weighting wymaga zdefiniowanej hipotezy.`);
      }
      if (!Array.isArray(activity.items) || activity.items.length === 0) {
        issues.push(`Aktywność "${activity.id}": evidence_weighting wymaga niepustej listy "items".`);
      } else {
        for (const item of activity.items) {
          if (!['supports', 'opposes', 'neutral'].includes(item.expected)) {
            issues.push(`Aktywność "${activity.id}": element "${item.id}" posiada niepoprawne oczekiwane pole "${item.expected}".`);
          }
        }
      }
      break;
    }

    case 'select_and_justify': {
      if (!Array.isArray(activity.options) || activity.options.length < 2) {
        issues.push(`Aktywność "${activity.id}": select_and_justify wymaga co najmniej 2 opcji.`);
      }
      if (typeof activity.answer === 'number') {
        if (activity.answer < 0 || activity.answer >= activity.options.length) {
          issues.push(`Aktywność "${activity.id}": indeks odpowiedzi ${activity.answer} poza zakresem.`);
        }
      } else if (!Array.isArray(activity.answer) || activity.answer.length === 0) {
        issues.push(`Aktywność "${activity.id}": niepoprawny format odpowiedzi w select_and_justify.`);
      }
      if (!activity.rationaleRubric || !Array.isArray(activity.rationaleRubric.requiredConcepts) || activity.rationaleRubric.requiredConcepts.length === 0) {
        issues.push(`Aktywność "${activity.id}": select_and_justify wymaga rationaleRubric z requiredConcepts.`);
      } else {
        const rc = activity.rationaleRubric.requiredConcepts;
        const minReq = activity.rationaleRubric.minRequired ?? 1;
        if (minReq < 1 || minReq > rc.length) {
          issues.push(`Aktywność "${activity.id}": minRequired (${minReq}) poza zakresem 1..${rc.length}.`);
        }
      }
      break;
    }

    case 'short_answer': {
      if (!activity.modelAnswer || typeof activity.modelAnswer !== 'string' || activity.modelAnswer.trim().length < 10) {
        issues.push(`Aktywność "${activity.id}": short_answer wymaga modelAnswer o długości >= 10 znaków.`);
      }
      if (!activity.rubric || !Array.isArray(activity.rubric.requiredConcepts) || activity.rubric.requiredConcepts.length === 0) {
        issues.push(`Aktywność "${activity.id}": short_answer wymaga rubryki z requiredConcepts.`);
      }
      break;
    }

    case 'clinical_reasoning': {
      if (!activity.modelAnswer || typeof activity.modelAnswer !== 'string' || activity.modelAnswer.trim().length < 10) {
        issues.push(`Aktywność "${activity.id}": clinical_reasoning wymaga modelAnswer.`);
      }
      if (!activity.rubric || !Array.isArray(activity.rubric.dimensions) || activity.rubric.dimensions.length === 0) {
        issues.push(`Aktywność "${activity.id}": clinical_reasoning wymaga wymiarów oceny (dimensions).`);
      }
      break;
    }

    case 'recall': {
      if (!activity.modelAnswer || typeof activity.modelAnswer !== 'string' || activity.modelAnswer.trim().length < 5) {
        issues.push(`Aktywność "${activity.id}": recall wymaga modelAnswer.`);
      }
      break;
    }

    default:
      issues.push(`Aktywność "${activity.id}": nieznany typ aktywności "${(activity as { type?: string }).type}".`);
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}

export function validateExperienceSemanticQA(
  experience: LessonExperienceV2,
  context?: { availableSourceIds?: Set<string>; availableClaimIds?: Set<string> }
): ExperienceValidationResult {
  const issues: string[] = [];
  const knownObjectiveIds = new Set(experience.objectives.map(o => o.id));
  const seenActivityIds = new Set<string>();

  const activitiesToCheck: LearningActivity[] = [
    experience.diagnostic,
    ...experience.activities,
    experience.teachBack,
    ...experience.exitTicket,
    ...(experience.assessmentBank || []),
  ].filter(Boolean);

  for (const act of activitiesToCheck) {
    if (seenActivityIds.has(act.id)) {
      issues.push(`Lekcja "${experience.lessonId}": zduplikowane ID aktywności "${act.id}".`);
    }
    seenActivityIds.add(act.id);

    // Objective ID validation
    for (const objId of act.objectiveIds || []) {
      if (!knownObjectiveIds.has(objId)) {
        issues.push(`Lekcja "${experience.lessonId}": aktywność "${act.id}" odwołuje się do nieistniejącego objectiveId "${objId}".`);
      }
    }

    // Source IDs validation
    if (context?.availableSourceIds && Array.isArray(act.sourceIds)) {
      for (const sId of act.sourceIds) {
        if (!context.availableSourceIds.has(sId)) {
          issues.push(`Lekcja "${experience.lessonId}": aktywność "${act.id}" odwołuje się do nieznanego sourceId "${sId}".`);
        }
      }
    }

    // Claim IDs validation
    if (context?.availableClaimIds && Array.isArray(act.claimIds)) {
      for (const cId of act.claimIds) {
        if (!context.availableClaimIds.has(cId)) {
          issues.push(`Lekcja "${experience.lessonId}": aktywność "${act.id}" odwołuje się do nieznanego claimId "${cId}".`);
        }
      }
    }

    const res = validateActivitySemanticQA(act);
    issues.push(...res.issues);
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}

export function validateModuleExperiencesQA(
  experiences: Record<string, LessonExperienceV2>,
  context?: { availableSourceIds?: Set<string>; availableClaimIds?: Set<string> }
): ModuleValidationResult {
  let totalActivities = 0;
  let totalIssues = 0;
  const issuesByLesson: Record<string, string[]> = {};

  for (const [lessonId, exp] of Object.entries(experiences)) {
    const actCount = 1 + exp.activities.length + 1 + exp.exitTicket.length + (exp.assessmentBank?.length || 0);
    totalActivities += actCount;

    const res = validateExperienceSemanticQA(exp, context);
    if (!res.isValid) {
      issuesByLesson[lessonId] = res.issues;
      totalIssues += res.issues.length;
    }
  }

  return {
    isValid: totalIssues === 0,
    totalActivities,
    totalIssues,
    issuesByLesson,
  };
}
