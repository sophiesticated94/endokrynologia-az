import type {
  LearningActivity,
  LessonExperienceV2,
} from './course-types.ts';

export interface ActivityValidationResult {
  isValid: boolean;
  issues: string[];
  hardErrors: string[];
  warnings: string[];
}

export interface ExperienceValidationResult {
  isValid: boolean;
  issues: string[];
  hardErrors: string[];
  warnings: string[];
}

export interface ModuleValidationResult {
  isValid: boolean;
  totalActivities: number;
  totalIssues: number;
  issuesByLesson: Record<string, string[]>;
  totalWarnings?: number;
  warningsByLesson?: Record<string, string[]>;
}

export const LOW_PLAUSIBILITY_DISTRACTOR_PATTERNS: Array<{ regex: RegExp; label: string }> = [
  { regex: /\bnotariusz|\bnotarialn/i, label: 'wymóg notarialny' },
  { regex: /pasożyt.*wątrob/i, label: 'pasożyty wątroby' },
  { regex: /krew.*w.*(roztw[oó]r\s+)?sol/i, label: 'zamiana krwi w roztwór soli' },
  { regex: /doniesienie o zniesławieniu/i, label: 'doniesienie o zniesławieniu' },
  { regex: /zamknąć.*w piwnicy/i, label: 'zamykanie w piwnicy' },
  { regex: /przekupuj.*badając/i, label: 'przekupowanie badającego' },
  { regex: /w 100% przypadków wywołują zgon/i, label: 'bezwzględna 100% śmiertelność leków' },
  { regex: /wlew z solą fizjologiczną/i, label: 'wlew z solą fizjologiczną jako ochrona przed neuroleptykami' },
  { regex: /filtrują krew przez skórę/i, label: 'filtracja krwi przez skórę' },
  { regex: /rozpad.*do glukozy/i, label: 'rozpad metabolitu do glukozy' },
  { regex: /zamieniają się w hemoglobinę/i, label: 'zamiana białek w hemoglobinę' },
  { regex: /10-letni.*psychoterapi/i, label: 'absurdalnie długa psychoterapia w ostrym stanie' },
  { regex: /napar.*z melisy/i, label: 'napary ziołowe w stanie nagłym' },
  { regex: /parti.*rządząc/i, label: 'kryteria polityczne w ocenie medycznej' },
  { regex: /brak zmarszczek|bogactwo finansowe/i, label: 'kryteria estetyczne/majątkowe w zdolności' },
  { regex: /dni parzyste po godzinie 12/i, label: 'magiczne ramy czasowe decyzji' },
  { regex: /właścicielem ciała/i, label: 'własność ciała pacjenta' },
  { regex: /ogródk.*działkow/i, label: 'prace na działce jako przyczyna otępienia' },
  { regex: /przemówieni.*polityczn/i, label: 'wygłaszanie przemówień jako objaw' },
  { regex: /łupież.*skórze/i, label: 'łupież jako kryterium otępienia' },
  { regex: /mecze piłkarsk/i, label: 'oglądanie meczów jako kryterium' },
  { regex: /ospę wietrzną/i, label: 'ospa wietrzna w dzieciństwie w otępieniu' },
  { regex: /malari.*mózgow.*pląsawic/i, label: 'egzotyczna kombinacja malarii i pląsawicy' },
  { regex: /nie biorą udziału w odżywianiu/i, label: 'negacja roli naczyń w odżywianiu mózgu' },
  { regex: /utratę wzroku u każdego/i, label: 'natychmiastowa ślepota u każdego' },
  { regex: /nieśmiertelnoś.*neuron/i, label: 'gwarancja nieśmiertelności neuronów' },
  { regex: /amfetamin.*100 mg/i, label: 'toksyczna dawka amfetaminy' },
];

export function validateActivitySemanticQA(activity: LearningActivity): ActivityValidationResult {
  const hardErrors: string[] = [];
  const warnings: string[] = [];

  if (!activity.id || typeof activity.id !== 'string') {
    hardErrors.push('Aktywność nie posiada poprawnego pola "id".');
  }

  if (!activity.prompt || typeof activity.prompt !== 'string' || activity.prompt.trim().length < 5) {
    hardErrors.push(`Aktywność "${activity.id}": prompt musi zawierać co najmniej 5 znaków.`);
  }

  if (!Array.isArray(activity.objectiveIds) || activity.objectiveIds.length === 0) {
    hardErrors.push(`Aktywność "${activity.id}": brak przypisanych objectiveIds.`);
  }

  // Distractor plausibility scan for choice-based activities
  if (Array.isArray(activity.options)) {
    for (let optIdx = 0; optIdx < activity.options.length; optIdx++) {
      const opt = activity.options[optIdx];
      if (typeof opt !== 'string') continue;
      for (const pattern of LOW_PLAUSIBILITY_DISTRACTOR_PATTERNS) {
        if (pattern.regex.test(opt)) {
          warnings.push(
            `Aktywność "${activity.id}": wykryto distractor o niskiej wiarygodności klinicznej (LOW_PLAUSIBILITY_DISTRACTOR: ${pattern.label}) w opcji #${optIdx}: "${opt.slice(0, 60)}...".`
          );
        }
      }
    }
  }

  switch (activity.type) {
    case 'single_choice':
    case 'lab':
    case 'trend':
    case 'missing_information': {
      if (!Array.isArray(activity.options) || activity.options.length < 2) {
        hardErrors.push(`Aktywność "${activity.id}": pole "options" musi zawierać co najmniej 2 warianty.`);
      } else {
        const uniqueOptions = new Set(activity.options.map(o => (typeof o === 'string' ? o.trim() : '')));
        if (uniqueOptions.size !== activity.options.length) {
          hardErrors.push(`Aktywność "${activity.id}": zduplikowane opcje w pytaniu zamkniętym.`);
        }
        if (activity.options.some(o => typeof o !== 'string' || o.trim().length === 0)) {
          hardErrors.push(`Aktywność "${activity.id}": pusta lub niepoprawna treść opcji.`);
        }
      }

      if (typeof activity.answer !== 'number' || !Number.isInteger(activity.answer)) {
        hardErrors.push(`Aktywność "${activity.id}": odpowiedź ("answer") musi być liczbą całkowitą.`);
      } else if (Array.isArray(activity.options) && (activity.answer < 0 || activity.answer >= activity.options.length)) {
        hardErrors.push(`Aktywność "${activity.id}": indeks odpowiedzi ${activity.answer} poza zakresem opcji (0..${activity.options.length - 1}).`);
      }

      if (Array.isArray(activity.optionFeedback)) {
        if (Array.isArray(activity.options) && activity.optionFeedback.length !== activity.options.length) {
          hardErrors.push(`Aktywność "${activity.id}": długość optionFeedback (${activity.optionFeedback.length}) nie odpowiada liczbie opcji (${activity.options.length}).`);
        }

        // Catch inverted key regressions: explanation matching a distractor feedback instead of the answer
        if (typeof activity.answer === 'number' && activity.answer >= 0 && activity.answer < activity.optionFeedback.length) {
          const expectedFeedback = activity.optionFeedback[activity.answer];
          for (let i = 0; i < activity.optionFeedback.length; i++) {
            if (i !== activity.answer && activity.explanation === activity.optionFeedback[i] && activity.explanation !== expectedFeedback) {
              hardErrors.push(`Aktywność "${activity.id}": wykryto odwrócony klucz odpowiedzi — explanation odpowiada distractorowi #${i}, a nie wyznaczonej odpowiedzi #${activity.answer}.`);
            }
          }
        }

        // Catch explicit rejection / error markers inside explanation of supposed correct answer
        if (typeof activity.explanation === 'string' && /^(?:błąd\b|to błąd|nieprawidłowo\b|jest błędem|błędna odpowiedź)/i.test(activity.explanation.trim())) {
          hardErrors.push(`Aktywność "${activity.id}": wyjaśnienie poprawnej odpowiedzi ("explanation") zawiera frazę negującą jako błąd.`);
        }
      }

      if (!activity.explanation || typeof activity.explanation !== 'string' || activity.explanation.trim().length < 5) {
        hardErrors.push(`Aktywność "${activity.id}": brak lub zbyt krótkie wyjaśnienie ("explanation").`);
      }
      break;
    }

    case 'multi_select': {
      if (!Array.isArray(activity.options) || activity.options.length < 2) {
        hardErrors.push(`Aktywność "${activity.id}": multi_select wymaga co najmniej 2 opcji.`);
      } else {
        const uniqueOptions = new Set(activity.options.map(o => (typeof o === 'string' ? o.trim() : '')));
        if (uniqueOptions.size !== activity.options.length) {
          hardErrors.push(`Aktywność "${activity.id}": zduplikowane opcje w multi_select.`);
        }
      }

      if (!Array.isArray(activity.answers) || activity.answers.length === 0) {
        hardErrors.push(`Aktywność "${activity.id}": multi_select wymaga niepustej tablicy "answers".`);
      } else {
        const uniqueAnswers = new Set(activity.answers);
        if (uniqueAnswers.size !== activity.answers.length) {
          hardErrors.push(`Aktywność "${activity.id}": zduplikowane indeksy w "answers".`);
        }
        if (Array.isArray(activity.options)) {
          for (const ans of activity.answers) {
            if (typeof ans !== 'number' || ans < 0 || ans >= activity.options.length) {
              hardErrors.push(`Aktywność "${activity.id}": indeks odpowiedzi ${ans} poza zakresem opcji.`);
            }
          }
        }
      }

      if (!activity.explanation || typeof activity.explanation !== 'string' || activity.explanation.trim().length < 5) {
        hardErrors.push(`Aktywność "${activity.id}": brak lub zbyt krótkie wyjaśnienie.`);
      }
      break;
    }

    case 'ordering': {
      if (!Array.isArray(activity.items) || activity.items.length < 2) {
        hardErrors.push(`Aktywność "${activity.id}": ordering wymaga co najmniej 2 elementów w "items".`);
      }
      if (!Array.isArray(activity.correctOrder) || (activity.items && activity.correctOrder.length !== activity.items.length)) {
        hardErrors.push(`Aktywność "${activity.id}": correctOrder musi mieć tę samą długość co items.`);
      } else {
        const sortedOrder = [...activity.correctOrder].sort((a, b) => a - b);
        for (let i = 0; i < sortedOrder.length; i++) {
          if (sortedOrder[i] !== i) {
            hardErrors.push(`Aktywność "${activity.id}": correctOrder nie jest poprawną permutacją 0..${sortedOrder.length - 1}.`);
            break;
          }
        }
      }
      break;
    }

    case 'matching': {
      if (!Array.isArray(activity.pairs) || activity.pairs.length < 2) {
        hardErrors.push(`Aktywność "${activity.id}": matching wymaga co najmniej 2 par.`);
      } else {
        const leftKeys = new Set<string>();
        for (const pair of activity.pairs) {
          if (!Array.isArray(pair) || pair.length !== 2 || !pair[0] || !pair[1]) {
            hardErrors.push(`Aktywność "${activity.id}": niepoprawny format pary w matching.`);
          } else {
            if (leftKeys.has(pair[0])) {
              hardErrors.push(`Aktywność "${activity.id}": zduplikowany lewy klucz w matching: "${pair[0]}".`);
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
        hardErrors.push(`Aktywność "${activity.id}": pole "answer" w zadaniu numerycznym musi być prawidłową liczbą.`);
      }
      if (typeof activity.tolerance !== 'number' || activity.tolerance < 0) {
        hardErrors.push(`Aktywność "${activity.id}": tolerancja w zadaniu numerycznym musi wynosić >= 0.`);
      }
      if (!activity.unit || typeof activity.unit !== 'string') {
        hardErrors.push(`Aktywność "${activity.id}": zadanie numeryczne musi posiadać określoną jednostkę ("unit").`);
      }
      break;
    }

    case 'evidence_weighting': {
      if (!activity.hypothesis || typeof activity.hypothesis !== 'string' || activity.hypothesis.trim().length < 5) {
        hardErrors.push(`Aktywność "${activity.id}": evidence_weighting wymaga zdefiniowanej hipotezy.`);
      }
      if (!Array.isArray(activity.items) || activity.items.length === 0) {
        hardErrors.push(`Aktywność "${activity.id}": evidence_weighting wymaga niepustej listy "items".`);
      } else {
        for (const item of activity.items) {
          if (!['supports', 'opposes', 'neutral'].includes(item.expected)) {
            hardErrors.push(`Aktywność "${activity.id}": element "${item.id}" posiada niepoprawne oczekiwane pole "${item.expected}".`);
          }
        }
      }
      break;
    }

    case 'select_and_justify': {
      if (!Array.isArray(activity.options) || activity.options.length < 2) {
        hardErrors.push(`Aktywność "${activity.id}": select_and_justify wymaga co najmniej 2 opcji.`);
      }
      if (typeof activity.answer === 'number') {
        if (activity.answer < 0 || activity.answer >= activity.options.length) {
          hardErrors.push(`Aktywność "${activity.id}": indeks odpowiedzi ${activity.answer} poza zakresem.`);
        }
      } else if (!Array.isArray(activity.answer) || activity.answer.length === 0) {
        hardErrors.push(`Aktywność "${activity.id}": niepoprawny format odpowiedzi w select_and_justify.`);
      }
      if (!activity.rationaleRubric || !Array.isArray(activity.rationaleRubric.requiredConcepts) || activity.rationaleRubric.requiredConcepts.length === 0) {
        hardErrors.push(`Aktywność "${activity.id}": select_and_justify wymaga rationaleRubric z requiredConcepts.`);
      } else {
        const rc = activity.rationaleRubric.requiredConcepts;
        const minReq = activity.rationaleRubric.minRequired ?? 1;
        if (minReq < 1 || minReq > rc.length) {
          hardErrors.push(`Aktywność "${activity.id}": minRequired (${minReq}) poza zakresem 1..${rc.length}.`);
        }
      }
      break;
    }

    case 'short_answer': {
      if (!activity.modelAnswer || typeof activity.modelAnswer !== 'string' || activity.modelAnswer.trim().length < 10) {
        hardErrors.push(`Aktywność "${activity.id}": short_answer wymaga modelAnswer o długości >= 10 znaków.`);
      }
      if (!activity.rubric || !Array.isArray(activity.rubric.requiredConcepts) || activity.rubric.requiredConcepts.length === 0) {
        hardErrors.push(`Aktywność "${activity.id}": short_answer wymaga rubryki z requiredConcepts.`);
      }
      break;
    }

    case 'clinical_reasoning': {
      if (!activity.modelAnswer || typeof activity.modelAnswer !== 'string' || activity.modelAnswer.trim().length < 10) {
        hardErrors.push(`Aktywność "${activity.id}": clinical_reasoning wymaga modelAnswer.`);
      }
      if (!activity.rubric || !Array.isArray(activity.rubric.dimensions) || activity.rubric.dimensions.length === 0) {
        hardErrors.push(`Aktywność "${activity.id}": clinical_reasoning wymaga wymiarów oceny (dimensions).`);
      }
      break;
    }

    case 'recall': {
      if (!activity.modelAnswer || typeof activity.modelAnswer !== 'string' || activity.modelAnswer.trim().length < 5) {
        hardErrors.push(`Aktywność "${activity.id}": recall wymaga modelAnswer.`);
      }
      break;
    }

    default:
      hardErrors.push(`Aktywność "${activity.id}": nieznany typ aktywności "${(activity as { type?: string }).type}".`);
  }

  return {
    isValid: hardErrors.length === 0,
    issues: hardErrors,
    hardErrors,
    warnings,
  };
}

export function validateExperienceSemanticQA(
  experience: LessonExperienceV2,
  context?: { availableSourceIds?: Set<string>; availableClaimIds?: Set<string> }
): ExperienceValidationResult {
  const hardErrors: string[] = [];
  const warnings: string[] = [];
  const knownObjectiveIds = new Set((experience.objectives || []).map(o => o.id));
  const seenActivityIds = new Set<string>();

  const activitiesToCheck: LearningActivity[] = [
    experience.diagnostic,
    ...(experience.activities || []),
    experience.teachBack,
    ...(experience.exitTicket || []),
    ...(experience.assessmentBank || []),
  ].filter(Boolean) as LearningActivity[];

  for (const act of activitiesToCheck) {
    if (seenActivityIds.has(act.id)) {
      hardErrors.push(`Lekcja "${experience.lessonId}": zduplikowane ID aktywności "${act.id}".`);
    }
    seenActivityIds.add(act.id);

    // Objective ID validation
    for (const objId of act.objectiveIds || []) {
      if (!knownObjectiveIds.has(objId)) {
        hardErrors.push(`Lekcja "${experience.lessonId}": aktywność "${act.id}" odwołuje się do nieistniejącego objectiveId "${objId}".`);
      }
    }

    // Source IDs validation
    if (context?.availableSourceIds && Array.isArray(act.sourceIds)) {
      for (const sId of act.sourceIds) {
        if (!context.availableSourceIds.has(sId)) {
          hardErrors.push(`Lekcja "${experience.lessonId}": aktywność "${act.id}" odwołuje się do nieznanego sourceId "${sId}".`);
        }
      }
    }

    // Claim IDs validation
    if (context?.availableClaimIds && Array.isArray(act.claimIds)) {
      for (const cId of act.claimIds) {
        if (!context.availableClaimIds.has(cId)) {
          hardErrors.push(`Lekcja "${experience.lessonId}": aktywność "${act.id}" odwołuje się do nieznanego claimId "${cId}".`);
        }
      }
    }

    const res = validateActivitySemanticQA(act);
    hardErrors.push(...res.hardErrors);
    warnings.push(...res.warnings);
  }

  return {
    isValid: hardErrors.length === 0,
    issues: hardErrors,
    hardErrors,
    warnings,
  };
}

export function validateModuleExperiencesQA(
  experiences: Record<string, LessonExperienceV2>,
  context?: { availableSourceIds?: Set<string>; availableClaimIds?: Set<string> }
): ModuleValidationResult {
  let totalActivities = 0;
  let totalHardErrors = 0;
  let totalWarnings = 0;
  const issuesByLesson: Record<string, string[]> = {};
  const warningsByLesson: Record<string, string[]> = {};

  for (const [lessonId, exp] of Object.entries(experiences)) {
    const actCount = 1 + exp.activities.length + 1 + exp.exitTicket.length + (exp.assessmentBank?.length || 0);
    totalActivities += actCount;

    const res = validateExperienceSemanticQA(exp, context);
    if (!res.isValid) {
      issuesByLesson[lessonId] = res.hardErrors;
      totalHardErrors += res.hardErrors.length;
    }
    if (res.warnings.length > 0) {
      warningsByLesson[lessonId] = res.warnings;
      totalWarnings += res.warnings.length;
    }
  }

  return {
    isValid: totalHardErrors === 0,
    totalActivities,
    totalIssues: totalHardErrors,
    issuesByLesson,
    totalWarnings,
    warningsByLesson,
  };
}
