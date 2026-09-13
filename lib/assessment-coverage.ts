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
}

export interface ModuleMasterySelectionResult {
  items: LearningActivity[];
  completeCoverage: boolean;
  uncoveredTopics: string[];
  coveredObjectiveCount: number;
  totalObjectiveCount: number;
}

export function inferAssessmentLevel(activity: LearningActivity): AssessmentLevel {
  if (activity.assessmentLevel) return activity.assessmentLevel;

  switch (activity.type) {
    case 'short_answer':
    case 'clinical_reasoning':
    case 'recall':
      return 'generation';
    case 'select_and_justify':
    case 'evidence_weighting':
    case 'ordering':
    case 'matching':
    case 'numeric':
    case 'lab':
    case 'trend':
    case 'missing_information':
      return 'application';
    case 'single_choice':
    case 'multi_select':
    default:
      return 'recognition';
  }
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
      objective: obj,
      activities: matching,
      activityCount: matching.length,
      distinctActivityTypes: distinctTypes,
      levels,
      recognition: hasRec,
      application: hasApp,
      generation: hasGen,
      transfer: hasTrans,
      generationTransfer: hasGenTrans,
      assessmentBank: inBank,
      meetsContract,
      missingRequirements,
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
      totalObjectives: experience.objectives.length,
      coveredObjectives: coveredCount,
      missingApplication: missingAppCount,
      missingGeneration: missingGenCount,
      missingTransfer: missingTransferCount,
      missingGenerationTransfer: missingGenTransferCount,
      hasGeneration,
      hasTransfer,
      hasGenerationTransfer,
    },
    validationIssues: validationIssues.length > 0 ? validationIssues : undefined,
  };
}

export function selectLessonMasteryAssessment(
  experience: LessonExperienceV2,
  options: { count?: number; excludeActivityIds?: string[]; rng?: () => number } = {}
): LessonMasterySelectionResult {
  const { count = 3, excludeActivityIds = [], rng = Math.random } = options;
  const bank = experience.assessmentBank || [];
  const excludedSet = new Set(excludeActivityIds);

  const candidatePool = bank.filter(a => !excludedSet.has(a.id));
  const fallbackPool = getAllExperienceActivities(experience, false).filter(a => !excludedSet.has(a.id) && a.type !== 'recall');

  // Calculate minimum required count to cover all lesson objectives
  const allPool = [...candidatePool, ...fallbackPool];
  const requiredObjIds = new Set(experience.objectives.map(o => o.id));

  // Greedy set-cover to compute minimum required items
  const tempCovered = new Set<string>();
  let minCount = 0;
  const poolCopy = [...allPool];
  while (tempCovered.size < requiredObjIds.size && poolCopy.length > 0) {
    poolCopy.sort((a, b) => {
      const aNew = a.objectiveIds.filter(id => requiredObjIds.has(id) && !tempCovered.has(id)).length;
      const bNew = b.objectiveIds.filter(id => requiredObjIds.has(id) && !tempCovered.has(id)).length;
      return bNew - aNew;
    });
    const best = poolCopy.shift();
    if (!best) break;
    const added = best.objectiveIds.filter(id => requiredObjIds.has(id) && !tempCovered.has(id));
    if (added.length === 0) break;
    added.forEach(id => tempCovered.add(id));
    minCount++;
  }

  // Selection prioritizing: transfer items, coverage of uncovered objectives
  const selected: LearningActivity[] = [];
  const coveredObjIds = new Set<string>();

  // 1. First pass: candidate pool (bank/transfer items)
  const prioritizedCandidates = [...candidatePool].sort((a, b) => (isActivityTransfer(b) ? 1 : 0) - (isActivityTransfer(a) ? 1 : 0));
  for (const act of prioritizedCandidates) {
    if (selected.length >= count) break;
    const coversNew = act.objectiveIds.some(id => requiredObjIds.has(id) && !coveredObjIds.has(id));
    if (coversNew) {
      selected.push(act);
      act.objectiveIds.forEach(id => coveredObjIds.add(id));
    }
  }

  // 2. Second pass: fallback pool for any remaining uncovered objectives
  for (const act of fallbackPool) {
    if (selected.length >= count) break;
    const coversNew = act.objectiveIds.some(id => requiredObjIds.has(id) && !coveredObjIds.has(id));
    if (coversNew && !selected.some(s => s.id === act.id)) {
      selected.push(act);
      act.objectiveIds.forEach(id => coveredObjIds.add(id));
    }
  }

  // 3. Fill remaining slots with diversity
  const remaining = allPool.filter(a => !selected.some(s => s.id === a.id)).sort(() => rng() - 0.5);
  while (selected.length < count && remaining.length > 0) {
    selected.push(remaining.pop()!);
  }

  const uncovered = experience.objectives.map(o => o.id).filter(id => !coveredObjIds.has(id));
  const completeCoverage = uncovered.length === 0;

  return {
    items: selected.slice(0, count),
    completeCoverage,
    uncoveredObjectiveIds: uncovered,
    minimumRequiredCount: Math.max(minCount, 1),
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
  options: { excludeActivityIds?: string[]; rng?: () => number } = {}
): ModuleMasterySelectionResult {
  const { excludeActivityIds = [], rng = Math.random } = options;
  const excludedSet = new Set(excludeActivityIds);
  const lessons = Object.values(experiences);

  const selected: LearningActivity[] = [];
  const coveredObjIds = new Set<string>();
  const coveredTopics = new Set<string>();
  let totalObjectives = 0;

  for (const exp of lessons) {
    totalObjectives += exp.objectives.length;
    const bank = (exp.assessmentBank || []).filter(a => !excludedSet.has(a.id));
    const pool = bank.length > 0 ? bank : getAllExperienceActivities(exp, false).filter(a => !excludedSet.has(a.id) && a.type !== 'recall');

    // Pick items that maximize objective coverage for this lesson
    const shuffledPool = [...pool].sort(() => rng() - 0.5);
    const chosen = shuffledPool[0];
    if (chosen) {
      selected.push(chosen);
      chosen.objectiveIds.forEach(id => coveredObjIds.add(id));
      coveredTopics.add(exp.lessonId);
    }
  }

  const uncoveredTopics = lessons.map(l => l.lessonId).filter(id => !coveredTopics.has(id));

  return {
    items: selected,
    completeCoverage: uncoveredTopics.length === 0,
    uncoveredTopics,
    coveredObjectiveCount: coveredObjIds.size,
    totalObjectiveCount: totalObjectives,
  };
}

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
  return selectModuleQuickReview(experiences, options);
}
