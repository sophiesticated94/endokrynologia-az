import type {
  LessonExperienceV2,
  LearningObjective,
  LearningActivity,
  AssessmentLevel,
} from './course-types.ts';

export interface ObjectiveCoverageDetail {
  objective: LearningObjective;
  activities: LearningActivity[];
  activityCount: number;
  distinctActivityTypes: string[];
  levels: Set<AssessmentLevel>;
  recognition: boolean;
  application: boolean;
  generation: boolean;
  transfer: boolean;
  generationTransfer: boolean;
  assessmentBank: boolean;
  meetsContract: boolean;
  missingRequirements: string[];
}

export interface ObjectiveCoverageReport {
  lessonId: string;
  isValid: boolean;
  objectives: Record<string, ObjectiveCoverageDetail>;
  summary: {
    totalObjectives: number;
    coveredObjectives: number;
    missingApplication: number;
    missingGeneration: number;
    missingTransfer: number;
    missingGenerationTransfer: number;
    hasGeneration: boolean;
    hasTransfer: boolean;
    hasGenerationTransfer: boolean;
  };
  validationIssues?: string[];
}

export interface LessonMasterySelectionResult {
  items: LearningActivity[];
  completeCoverage: boolean;
  uncoveredObjectiveIds: string[];
  minimumRequiredCount: number;
  estimatedMinimumRequiredCount: number;
  contractSatisfied: boolean;
  missingContractDetails?: string[];
}

export interface ModuleMasterySelectionResult {
  items: LearningActivity[];
  completeCoverage: boolean;
  uncoveredTopics: string[];
  coveredObjectiveCount: number;
  totalObjectiveCount: number;
  coverageDebt?: {
    missingSafetyObjectives: string[];
    missingDecisionObjectives: string[];
    uncoveredTopics: string[];
  };
}

export function inferAssessmentLevel(activity: LearningActivity): AssessmentLevel {
  if (activity.assessmentLevel) return activity.assessmentLevel;
  if (['short_answer', 'clinical_reasoning', 'recall'].includes(activity.type)) return 'generation';
  if (['select_and_justify', 'evidence_weighting', 'ordering', 'matching', 'numeric', 'lab', 'trend', 'missing_information'].includes(activity.type)) return 'application';
  return 'recognition';
}

export function isActivityGeneration(activity: LearningActivity): boolean {
  if (activity.assessmentLevel === 'generation') return true;
  return activity.type === 'short_answer' || activity.type === 'clinical_reasoning' || activity.type === 'recall';
}

export function isActivityTransfer(activity: LearningActivity): boolean {
  if (typeof activity.transfer === 'boolean') return activity.transfer;
  if (activity.type === 'recall') return false; // recall/teach-back is never transfer
  return activity.id.includes('-transfer-');
}

export function isActivityGenerationTransfer(activity: LearningActivity): boolean {
  return isActivityGeneration(activity) && isActivityTransfer(activity);
}

export function getAllExperienceActivities(experience: LessonExperienceV2, includeBank = true): LearningActivity[] {
  const inline = [
    experience.diagnostic,
    ...experience.activities,
    experience.teachBack,
    ...experience.exitTicket,
  ];
  if (includeBank && experience.assessmentBank) {
    return [...inline, ...experience.assessmentBank];
  }
  return inline;
}

export function validateObjectiveCoverage(experience: LessonExperienceV2): ObjectiveCoverageReport {
  const allActivities = getAllExperienceActivities(experience, true);
  const details: Record<string, ObjectiveCoverageDetail> = {};
  const validationIssues: string[] = [];

  // Check unique IDs across activities
  const seenIds = new Set<string>();
  for (const a of allActivities) {
    if (seenIds.has(a.id)) {
      validationIssues.push(`Zduplikowane ID aktywności w lekcji: "${a.id}"`);
    }
    seenIds.add(a.id);
  }

  // Check assessment bank items for explicit assessmentLevel and valid sourceIds
  if (experience.assessmentBank) {
    for (const bankItem of experience.assessmentBank) {
      if (!bankItem.assessmentLevel) {
        validationIssues.push(`Element banku ocen "${bankItem.id}" nie posiada jawnego assessmentLevel.`);
      }
      if (!bankItem.sourceIds || bankItem.sourceIds.length === 0) {
        validationIssues.push(`Element banku ocen "${bankItem.id}" nie posiada przypisanego sourceIds.`);
      }
    }
  }

  let missingAppCount = 0;
  let missingGenCount = 0;
  let missingTransferCount = 0;
  let missingGenTransferCount = 0;
  let coveredCount = 0;

  for (const obj of experience.objectives) {
    const matching = allActivities.filter(a => a.objectiveIds.includes(obj.id));
    const levels = new Set<AssessmentLevel>(matching.map(inferAssessmentLevel));
    const distinctTypes = Array.from(new Set(matching.map(a => a.type)));
    const missingRequirements: string[] = [];

    const hasRec = matching.some(a => inferAssessmentLevel(a) === 'recognition');
    const hasApp = matching.some(a => inferAssessmentLevel(a) === 'application');
    const hasGen = matching.some(isActivityGeneration);
    const hasTrans = matching.some(isActivityTransfer);
    const hasGenTrans = matching.some(isActivityGenerationTransfer);
    const inBank = experience.assessmentBank ? experience.assessmentBank.some(a => a.objectiveIds.includes(obj.id)) : false;

    if (matching.length === 0) {
      missingRequirements.push('Brak jakiejkolwiek aktywności sprawdzającej ten cel.');
    } else {
      coveredCount++;
    }

    // Contract: decision, differentiation, safety require Application or Generation
    const requiresApp = ['decision', 'differentiation', 'safety'].includes(obj.kind);
    if (requiresApp && !hasApp && !hasGen) {
      missingRequirements.push(`Cel typu „${obj.kind}” wymaga zadania na poziomie Application lub Generation.`);
      missingAppCount++;
    }

    // Transfer required for decision and safety key objectives
    if (['decision', 'safety'].includes(obj.kind) && !hasTrans) {
      missingRequirements.push(`Kluczowy cel typu „${obj.kind}” wymaga zadania transferowego.`);
      missingTransferCount++;
    }

    // Key objective requirement: at least 2 activity types
    if (matching.length > 0 && distinctTypes.length < 2) {
      missingRequirements.push('Kluczowy cel powinien mieć sprawdzenie przez co najmniej 2 różne typy zadań.');
    }

    const meetsContract = missingRequirements.length === 0;
    details[obj.id] = {
      objective: obj, activities: matching, activityCount: matching.length, distinctActivityTypes: distinctTypes,
      levels, recognition: hasRec, application: hasApp, generation: hasGen, transfer: hasTrans,
      generationTransfer: hasGenTrans, assessmentBank: inBank, meetsContract, missingRequirements,
    };
  }

  // Contract: lesson must have generation, transfer, and at least one generation-transfer item
  const hasGeneration = allActivities.some(isActivityGeneration);
  const hasTransfer = allActivities.some(isActivityTransfer);
  const hasGenerationTransfer = allActivities.some(isActivityGenerationTransfer);

  if (!hasGeneration) missingGenCount++;
  if (!hasGenerationTransfer) missingGenTransferCount++;

  const isValid = Object.values(details).every(d => d.meetsContract) && hasGenerationTransfer && validationIssues.length === 0;

  return {
    lessonId: experience.lessonId,
    isValid,
    objectives: details,
    summary: {
      totalObjectives: experience.objectives.length, coveredObjectives: coveredCount,
      missingApplication: missingAppCount, missingGeneration: missingGenCount,
      missingTransfer: missingTransferCount, missingGenerationTransfer: missingGenTransferCount,
      hasGeneration, hasTransfer, hasGenerationTransfer,
    },
    validationIssues: validationIssues.length > 0 ? validationIssues : undefined,
  };
}

export function computeExactMinimalSetCover(
  items: LearningActivity[],
  requiredObjectiveIds: Set<string>
): { isExact: boolean; count: number } {
  if (requiredObjectiveIds.size === 0) return { isExact: true, count: 0 };
  if (items.length === 0) return { isExact: true, count: 0 };

  // If pool size <= 15, do exact search (combinations of increasing size)
  if (items.length <= 15) {
    const n = items.length;
    for (let k = 1; k <= n; k++) {
      const checkCombination = (start: number, chosen: number[]): boolean => {
        if (chosen.length === k) {
          const covered = new Set<string>();
          for (const idx of chosen) {
            for (const id of items[idx].objectiveIds) {
              if (requiredObjectiveIds.has(id)) covered.add(id);
            }
          }
          return covered.size === requiredObjectiveIds.size;
        }
        for (let i = start; i < n; i++) {
          chosen.push(i);
          if (checkCombination(i + 1, chosen)) return true;
          chosen.pop();
        }
        return false;
      };
      if (checkCombination(0, [])) {
        return { isExact: true, count: k };
      }
    }
  }

  // Greedy fallback for larger pools (> 15)
  const tempCovered = new Set<string>();
  let minCount = 0;
  const poolCopy = [...items];
  while (tempCovered.size < requiredObjectiveIds.size && poolCopy.length > 0) {
    poolCopy.sort((a, b) => {
      const aNew = a.objectiveIds.filter(id => requiredObjectiveIds.has(id) && !tempCovered.has(id)).length;
      const bNew = b.objectiveIds.filter(id => requiredObjectiveIds.has(id) && !tempCovered.has(id)).length;
      return bNew - aNew;
    });
    const best = poolCopy.shift();
    if (!best) break;
    const added = best.objectiveIds.filter(id => requiredObjectiveIds.has(id) && !tempCovered.has(id));
    if (added.length === 0) break;
    added.forEach(id => tempCovered.add(id));
    minCount++;
  }
  return { isExact: false, count: Math.max(minCount, 1) };
}

export function selectLessonMasteryAssessment(
  experience: LessonExperienceV2,
  options: { count?: number; excludeActivityIds?: string[]; rng?: () => number } = {}
): LessonMasterySelectionResult {
  const defaultCount = Math.max(experience.objectives.length, 3);
  const { count = defaultCount, excludeActivityIds = [], rng = Math.random } = options;
  const bank = experience.assessmentBank || [];
  const excludedSet = new Set(excludeActivityIds);

  const candidatePool = bank.filter(a => !excludedSet.has(a.id));
  const fallbackPool = getAllExperienceActivities(experience, false).filter(a => !excludedSet.has(a.id) && a.type !== 'recall');
  const allPool = [...candidatePool, ...fallbackPool];
  const requiredObjIds = new Set(experience.objectives.map(o => o.id));

  const { count: minRequired } = computeExactMinimalSetCover(allPool, requiredObjIds);

  // Selection prioritizing: transfer items, cognitive level (application/generation), coverage of uncovered objectives
  const selected: LearningActivity[] = [];
  const coveredObjIds = new Set<string>();

  const scoreCandidate = (a: LearningActivity): number => {
    let s = 0;
    if (isActivityTransfer(a)) s += 4;
    if (isActivityGeneration(a)) s += 2;
    else if (inferAssessmentLevel(a) === 'application') s += 1;
    return s;
  };

  const prioritizedCandidates = [...candidatePool].sort((a, b) => scoreCandidate(b) - scoreCandidate(a));
  for (const act of prioritizedCandidates) {
    if (selected.length >= count) break;
    const coversNew = act.objectiveIds.some(id => requiredObjIds.has(id) && !coveredObjIds.has(id));
    if (coversNew) {
      selected.push(act);
      act.objectiveIds.forEach(id => coveredObjIds.add(id));
    }
  }

  for (const act of fallbackPool) {
    if (selected.length >= count) break;
    const coversNew = act.objectiveIds.some(id => requiredObjIds.has(id) && !coveredObjIds.has(id));
    if (coversNew && !selected.some(s => s.id === act.id)) {
      selected.push(act);
      act.objectiveIds.forEach(id => coveredObjIds.add(id));
    }
  }

  const remaining = allPool.filter(a => !selected.some(s => s.id === a.id)).sort(() => rng() - 0.5);
  while (selected.length < count && remaining.length > 0) {
    selected.push(remaining.pop()!);
  }

  const resultItems = selected.slice(0, count);
  const finalCoveredObjIds = new Set<string>();
  for (const act of resultItems) {
    for (const id of act.objectiveIds) {
      if (requiredObjIds.has(id)) finalCoveredObjIds.add(id);
    }
  }

  const missingContractDetails: string[] = [];
  for (const obj of experience.objectives) {
    const matchingSelected = resultItems.filter(a => a.objectiveIds.includes(obj.id));
    if (matchingSelected.length === 0) {
      missingContractDetails.push(`Cel "${obj.id}" nie jest pokryty przez wybrane zadania.`);
      continue;
    }
    const hasAppOrGen = matchingSelected.some(a => inferAssessmentLevel(a) === 'application' || isActivityGeneration(a));
    const hasTrans = matchingSelected.some(isActivityTransfer);

    if (['decision', 'differentiation', 'safety'].includes(obj.kind) && !hasAppOrGen) {
      missingContractDetails.push(`Cel "${obj.id}" (${obj.kind}) wymaga zadania Application lub Generation.`);
    }
    if (['decision', 'safety'].includes(obj.kind) && !hasTrans) {
      missingContractDetails.push(`Cel "${obj.id}" (${obj.kind}) wymaga zadania transferowego.`);
    }
  }

  const uncovered = experience.objectives.map(o => o.id).filter(id => !finalCoveredObjIds.has(id));
  const contractSatisfied = missingContractDetails.length === 0 && uncovered.length === 0;

  return {
    items: resultItems,
    completeCoverage: contractSatisfied,
    uncoveredObjectiveIds: uncovered,
    minimumRequiredCount: Math.max(minRequired, 1),
    estimatedMinimumRequiredCount: Math.max(minRequired, 1),
    contractSatisfied,
    missingContractDetails: missingContractDetails.length > 0 ? missingContractDetails : undefined,
  };
}

export function selectLessonMasteryTest(
  experience: LessonExperienceV2,
  options: { count?: number; excludeActivityIds?: string[]; rng?: () => number } = {}
): LearningActivity[] {
  return selectLessonMasteryAssessment(experience, options).items;
}

export function selectModuleMasteryAssessment(
  experiences: Record<string, LessonExperienceV2>,
  options: { count?: number; excludeActivityIds?: string[]; rng?: () => number } = {}
): ModuleMasterySelectionResult {
  const { count, excludeActivityIds = [], rng = Math.random } = options;
  const excludedSet = new Set(excludeActivityIds);
  const lessons = Object.values(experiences);

  const safetyObjIds = new Set<string>();
  const decisionObjIds = new Set<string>();
  let totalObjectives = 0;

  for (const exp of lessons) {
    totalObjectives += exp.objectives.length;
    for (const obj of exp.objectives) {
      if (obj.kind === 'safety') safetyObjIds.add(obj.id);
      if (obj.kind === 'decision') decisionObjIds.add(obj.id);
    }
  }

  const selected: LearningActivity[] = [];
  const coveredObjIds = new Set<string>();
  const coveredTopics = new Set<string>();

  for (const exp of lessons) {
    if (typeof count === 'number' && selected.length >= count) break;
    const bank = (exp.assessmentBank || []).filter(a => !excludedSet.has(a.id));
    const pool = bank.length > 0 ? bank : getAllExperienceActivities(exp, false).filter(a => !excludedSet.has(a.id) && a.type !== 'recall');

    const sortedPool = [...pool].sort((a, b) => {
      const aSafety = a.objectiveIds.some(id => safetyObjIds.has(id) || decisionObjIds.has(id)) ? 2 : 0;
      const bSafety = b.objectiveIds.some(id => safetyObjIds.has(id) || decisionObjIds.has(id)) ? 2 : 0;
      const aTrans = isActivityTransfer(a) ? 1 : 0;
      const bTrans = isActivityTransfer(b) ? 1 : 0;
      return (bSafety + bTrans) - (aSafety + aTrans);
    });

    const chosen = sortedPool[0];
    if (chosen) {
      selected.push(chosen);
      chosen.objectiveIds.forEach(id => coveredObjIds.add(id));
      coveredTopics.add(exp.lessonId);
    }
  }

  if (typeof count === 'number' && count > selected.length) {
    const allPool = lessons.flatMap(exp => (exp.assessmentBank || []).concat(getAllExperienceActivities(exp, false)))
      .filter(a => !excludedSet.has(a.id) && !selected.some(s => s.id === a.id) && a.type !== 'recall');

    for (const act of allPool) {
      if (selected.length >= count) break;
      const coversNeeded = act.objectiveIds.some(id => (safetyObjIds.has(id) || decisionObjIds.has(id)) && !coveredObjIds.has(id));
      if (coversNeeded) {
        selected.push(act);
        act.objectiveIds.forEach(id => coveredObjIds.add(id));
      }
    }
  }

  const missingSafety = Array.from(safetyObjIds).filter(id => !coveredObjIds.has(id));
  const missingDecision = Array.from(decisionObjIds).filter(id => !coveredObjIds.has(id));
  const uncoveredTopics = lessons.map(l => l.lessonId).filter(id => !coveredTopics.has(id));
  const isComplete = uncoveredTopics.length === 0;

  return {
    items: selected,
    completeCoverage: isComplete,
    uncoveredTopics,
    coveredObjectiveCount: coveredObjIds.size,
    totalObjectiveCount: totalObjectives,
    coverageDebt: !isComplete ? {
      missingSafetyObjectives: missingSafety,
      missingDecisionObjectives: missingDecision,
      uncoveredTopics,
    } : undefined,
  };
}

/**
 * Quick spaced review sampling items across lessons.
 * NOTE: quickReview !== moduleMastery. Quick review is intended for rapid retrieval practice,
 * whereas module mastery enforces strict coverage of safety, decision, and curriculum objectives.
 */
export function selectModuleQuickReview(
  experiences: Record<string, LessonExperienceV2>,
  options: { count?: number; excludeActivityIds?: string[]; rng?: () => number } = {}
): LearningActivity[] {
  const { count = 10, excludeActivityIds = [], rng = Math.random } = options;
  const excludedSet = new Set(excludeActivityIds);
  const lessonEntries = Object.values(experiences);
  const selected: LearningActivity[] = [];

  const shuffledLessons = [...lessonEntries].sort(() => rng() - 0.5);
  for (const exp of shuffledLessons) {
    if (selected.length >= count) break;
    const bank = (exp.assessmentBank || []).filter(a => !excludedSet.has(a.id));
    const pool = bank.length > 0 ? bank : getAllExperienceActivities(exp, false).filter(a => !excludedSet.has(a.id) && a.type !== 'recall');
    if (pool.length > 0) {
      const pick = pool[Math.floor(rng() * pool.length)];
      selected.push(pick);
    }
  }

  if (selected.length < count) {
    const allRemaining = lessonEntries
      .flatMap(exp => (exp.assessmentBank && exp.assessmentBank.length > 0 ? exp.assessmentBank : getAllExperienceActivities(exp, false)))
      .filter(a => !excludedSet.has(a.id) && !selected.some(s => s.id === a.id) && a.type !== 'recall')
      .sort(() => rng() - 0.5);

    while (selected.length < count && allRemaining.length > 0) {
      selected.push(allRemaining.pop()!);
    }
  }

  return selected.slice(0, count);
}

export function selectModuleMasteryTest(
  experiences: Record<string, LessonExperienceV2>,
  options: { count?: number; excludeActivityIds?: string[]; rng?: () => number } = {}
): LearningActivity[] {
  return selectModuleMasteryAssessment(experiences, options).items;
}
