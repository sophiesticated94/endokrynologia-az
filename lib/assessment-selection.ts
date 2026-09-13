import type {
  LessonExperienceV2,
  LearningObjective,
  LearningActivity,
  AssessmentLevel,
} from './course-types.ts';
import {
  inferAssessmentLevel,
  isActivityGeneration,
  isActivityTransfer,
  isActivityGenerationTransfer,
  getRequiredObjectiveTokens,
  getActivityCoveredTokens,
  validateSelectedAssessmentCoverage,
  getAllExperienceActivities,
} from './assessment-coverage.ts';
import {
  computeExactMinimalTokenSetCover,
} from './assessment-token-cover.ts';

export interface DetailedObjectiveUnmetRequirement {
  objectiveId: string;
  missing: string[];
}

export interface ModuleUncoveredRequirement {
  objectiveId: string;
  lessonId: string;
  missing: string[];
}

export interface LessonMasterySelectionResult {
  items: LearningActivity[];
  completeCoverage: boolean;
  uncoveredObjectiveIds: string[];
  unmetRequirements: DetailedObjectiveUnmetRequirement[];
  lessonLevelDebt: string[];
  coveredLevels?: Record<string, AssessmentLevel[]>;
  transferCoverage?: { covered: number; total: number };
  generationTransferCoverage?: { covered: boolean };
  minimumRequiredCount?: number;
  estimatedMinimumRequiredCount?: number;
  minimumCountIsExact: boolean;
  contractSatisfied: boolean;
  missingContractDetails?: string[];
}

export interface ModuleMasterySelectionResult {
  items: LearningActivity[];
  completeCoverage: boolean;
  coveredObjectiveCount: number;
  totalRequiredObjectiveCount: number;
  totalObjectiveCount: number;
  uncoveredObjectiveIds: string[];
  uncoveredRequirements: ModuleUncoveredRequirement[];
  uncoveredSafetyObjectives: string[];
  uncoveredDecisionObjectives: string[];
  uncoveredDifferentiationObjectives: string[];
  uncoveredLessonIds: string[];
  uncoveredTopics: string[]; // alias
  minimumRequiredCount?: number;
  estimatedMinimumRequiredCount?: number;
  minimumCountIsExact: boolean;
  coverageDebt?: {
    missingSafetyObjectives: string[];
    missingDecisionObjectives: string[];
    missingDifferentiationObjectives: string[];
    uncoveredTopics: string[];
    uncoveredLessonIds: string[];
    uncoveredObjectiveIds: string[];
    uncoveredRequirements: ModuleUncoveredRequirement[];
  };
}

export function selectLessonMasteryAssessment(
  experience: LessonExperienceV2,
  options: { count?: number; excludeActivityIds?: string[]; rng?: () => number } = {}
): LessonMasterySelectionResult {
  const bank = experience.assessmentBank || [];
  const excludedSet = new Set(options.excludeActivityIds || []);
  const rng = options.rng || Math.random;

  const candidatePool = bank.filter(a => !excludedSet.has(a.id));
  const fallbackPool = getAllExperienceActivities(experience, false).filter(
    a => !excludedSet.has(a.id) && a.type !== 'recall'
  );
  const allPool = [...candidatePool, ...fallbackPool.filter(f => !candidatePool.some(c => c.id === f.id))];

  const requiredTokens = new Set<string>();
  for (const obj of experience.objectives) {
    for (const t of getRequiredObjectiveTokens(obj)) {
      requiredTokens.add(t);
    }
  }
  const hasGenTransInExperience = getAllExperienceActivities(experience, true).some(isActivityGenerationTransfer);
  if (hasGenTransInExperience) {
    requiredTokens.add('lesson:generation_transfer');
  }

  const coverResult = computeExactMinimalTokenSetCover(
    allPool,
    requiredTokens,
    a => getActivityCoveredTokens(a, experience.objectives)
  );

  const minRequired = Math.max(coverResult.count, 1);
  const defaultCount = Math.max(minRequired, experience.objectives.length);
  const targetCount = typeof options.count === 'number' ? options.count : defaultCount;

  let selectedItems: LearningActivity[] = [];

  if (targetCount >= coverResult.selectedItems.length) {
    selectedItems = [...coverResult.selectedItems];
    if (selectedItems.length < targetCount) {
      const remaining = allPool
        .filter(a => !selectedItems.some(s => s.id === a.id))
        .sort((a, b) => {
          const aTrans = isActivityTransfer(a) ? 2 : 0;
          const bTrans = isActivityTransfer(b) ? 2 : 0;
          const aGen = isActivityGeneration(a) ? 1 : 0;
          const bGen = isActivityGeneration(b) ? 1 : 0;
          return (bTrans + bGen) - (aTrans + aGen) || (rng() - 0.5);
        });

      while (selectedItems.length < targetCount && remaining.length > 0) {
        selectedItems.push(remaining.shift()!);
      }
    }
  } else {
    // Constrained count shortfall: prioritize Safety -> Decision -> Differentiation -> App/Trans
    const poolCopy = [...allPool];
    const scoreItem = (a: LearningActivity): number => {
      let score = 0;
      for (const obj of experience.objectives) {
        if (a.objectiveIds && a.objectiveIds.includes(obj.id)) {
          if (obj.kind === 'safety') score += 50;
          else if (obj.kind === 'decision') score += 40;
          else if (obj.kind === 'differentiation') score += 30;
          else if (obj.kind === 'interpretation') score += 20;
          else score += 10;
        }
      }
      if (isActivityTransfer(a)) score += 5;
      if (isActivityGeneration(a)) score += 3;
      return score;
    };
    poolCopy.sort((a, b) => scoreItem(b) - scoreItem(a));
    selectedItems = poolCopy.slice(0, targetCount);
  }

  const coverageReport = validateSelectedAssessmentCoverage(
    experience.objectives,
    selectedItems,
    { requireGenerationTransfer: hasGenTransInExperience }
  );

  const contractSatisfied = coverageReport.isValid;

  const coveredLevels: Record<string, AssessmentLevel[]> = {};
  for (const item of selectedItems) {
    const lvl = inferAssessmentLevel(item);
    for (const objId of item.objectiveIds || []) {
      if (!coveredLevels[objId]) coveredLevels[objId] = [];
      if (!coveredLevels[objId].includes(lvl)) coveredLevels[objId].push(lvl);
    }
  }

  return {
    items: selectedItems,
    completeCoverage: contractSatisfied,
    uncoveredObjectiveIds: coverageReport.uncoveredObjectiveIds,
    unmetRequirements: coverageReport.detailedUnmetRequirements,
    lessonLevelDebt: coverageReport.lessonLevelDebt,
    minimumRequiredCount: coverResult.isExact ? minRequired : undefined,
    estimatedMinimumRequiredCount: !coverResult.isExact ? minRequired : undefined,
    minimumCountIsExact: coverResult.isExact,
    contractSatisfied,
    missingContractDetails: coverageReport.unmetRequirements.length > 0 ? coverageReport.unmetRequirements : undefined,
    coveredLevels,
    transferCoverage: {
      covered: selectedItems.filter(isActivityTransfer).length,
      total: selectedItems.length,
    },
    generationTransferCoverage: {
      covered: selectedItems.some(isActivityGenerationTransfer),
    },
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

  const allObjectives: LearningObjective[] = [];
  const objectiveToLessonMap = new Map<string, string>();
  const safetyObjIds = new Set<string>();
  const decisionObjIds = new Set<string>();
  const diffObjIds = new Set<string>();

  for (const exp of lessons) {
    for (const obj of exp.objectives) {
      allObjectives.push(obj);
      objectiveToLessonMap.set(obj.id, exp.lessonId);
      if (obj.kind === 'safety') safetyObjIds.add(obj.id);
      if (obj.kind === 'decision') decisionObjIds.add(obj.id);
      if (obj.kind === 'differentiation') diffObjIds.add(obj.id);
    }
  }

  // Collect candidate items from each lesson
  const allPool: Array<{ item: LearningActivity; lessonId: string }> = [];
  for (const exp of lessons) {
    const bank = (exp.assessmentBank || []).filter(a => !excludedSet.has(a.id));
    const fallback = getAllExperienceActivities(exp, false).filter(
      a => !excludedSet.has(a.id) && a.type !== 'recall'
    );
    const pool = [...bank, ...fallback.filter(f => !bank.some(b => b.id === f.id))];
    for (const act of pool) {
      allPool.push({ item: act, lessonId: exp.lessonId });
    }
  }

  // Required module tokens
  const moduleRequiredTokens = new Set<string>();
  for (const obj of allObjectives) {
    for (const t of getRequiredObjectiveTokens(obj)) {
      moduleRequiredTokens.add(t);
    }
  }
  for (const exp of lessons) {
    moduleRequiredTokens.add(`topic:${exp.lessonId}`);
  }

  const getItemTokens = (wrapped: { item: LearningActivity; lessonId: string }): Set<string> => {
    const s = getActivityCoveredTokens(wrapped.item, allObjectives);
    s.add(`topic:${wrapped.lessonId}`);
    return s;
  };

  const coverResult = computeExactMinimalTokenSetCover(
    allPool.map(w => w.item),
    moduleRequiredTokens,
    a => {
      const match = allPool.find(w => w.item.id === a.id);
      const lessonId = match ? match.lessonId : (a.objectiveIds && objectiveToLessonMap.get(a.objectiveIds[0])) || '';
      return getItemTokens({ item: a, lessonId });
    }
  );

  const minimalCount = Math.max(coverResult.count, lessons.length);

  let selected: LearningActivity[] = [];

  if (typeof count === 'number' && count < minimalCount) {
    // Constrained budget: prioritize Safety -> Decision -> Differentiation -> App/Trans -> Gen-Trans -> Other
    const scoredPool = allPool.map(w => {
      let score = 0;
      for (const obj of allObjectives) {
        if (w.item.objectiveIds && w.item.objectiveIds.includes(obj.id)) {
          if (obj.kind === 'safety') score += 100;
          else if (obj.kind === 'decision') score += 80;
          else if (obj.kind === 'differentiation') score += 60;
          else if (obj.kind === 'interpretation') score += 40;
          else score += 20;
        }
      }
      if (isActivityTransfer(w.item)) score += 15;
      if (isActivityGenerationTransfer(w.item)) score += 10;
      else if (isActivityGeneration(w.item)) score += 5;
      return { ...w, score };
    });

    scoredPool.sort((a, b) => b.score - a.score || (rng() - 0.5));
    const selectedLessonIds = new Set<string>();

    for (const entry of scoredPool) {
      if (selected.length >= count) break;
      if (!selectedLessonIds.has(entry.lessonId)) {
        selected.push(entry.item);
        selectedLessonIds.add(entry.lessonId);
      }
    }
    for (const entry of scoredPool) {
      if (selected.length >= count) break;
      if (!selected.some(s => s.id === entry.item.id)) {
        selected.push(entry.item);
      }
    }
  } else {
    selected = [...coverResult.selectedItems];
    if (typeof count === 'number' && selected.length < count) {
      const remaining = allPool
        .filter(w => !selected.some(s => s.id === w.item.id))
        .sort((a, b) => (rng() - 0.5));
      while (selected.length < count && remaining.length > 0) {
        selected.push(remaining.shift()!.item);
      }
    }
  }

  const coverageReport = validateSelectedAssessmentCoverage(allObjectives, selected);

  const coveredLessons = new Set<string>();
  for (const act of selected) {
    for (const objId of act.objectiveIds || []) {
      const lesId = objectiveToLessonMap.get(objId);
      if (lesId) coveredLessons.add(lesId);
    }
    const found = allPool.find(w => w.item.id === act.id);
    if (found) coveredLessons.add(found.lessonId);
  }

  const uncoveredLessons = lessons.map(l => l.lessonId).filter(id => !coveredLessons.has(id));
  const missingSafety = Array.from(safetyObjIds).filter(id => coverageReport.uncoveredObjectiveIds.includes(id));
  const missingDecision = Array.from(decisionObjIds).filter(id => coverageReport.uncoveredObjectiveIds.includes(id));
  const missingDifferentiation = Array.from(diffObjIds).filter(id => coverageReport.uncoveredObjectiveIds.includes(id));

  const uncoveredRequirements: ModuleUncoveredRequirement[] = coverageReport.detailedUnmetRequirements.map(d => ({
    objectiveId: d.objectiveId,
    lessonId: objectiveToLessonMap.get(d.objectiveId) || '',
    missing: d.missing,
  }));

  const isComplete = coverageReport.isValid && uncoveredLessons.length === 0 && uncoveredRequirements.length === 0;

  return {
    items: selected,
    completeCoverage: isComplete,
    coveredObjectiveCount: coverageReport.coveredObjectiveCount,
    totalRequiredObjectiveCount: allObjectives.length,
    totalObjectiveCount: allObjectives.length,
    uncoveredObjectiveIds: coverageReport.uncoveredObjectiveIds,
    uncoveredRequirements,
    uncoveredSafetyObjectives: missingSafety,
    uncoveredDecisionObjectives: missingDecision,
    uncoveredDifferentiationObjectives: missingDifferentiation,
    uncoveredLessonIds: uncoveredLessons,
    uncoveredTopics: uncoveredLessons,
    minimumRequiredCount: coverResult.isExact ? minimalCount : undefined,
    estimatedMinimumRequiredCount: !coverResult.isExact ? minimalCount : undefined,
    minimumCountIsExact: coverResult.isExact,
    coverageDebt: !isComplete ? {
      missingSafetyObjectives: missingSafety,
      missingDecisionObjectives: missingDecision,
      missingDifferentiationObjectives: missingDifferentiation,
      uncoveredTopics: uncoveredLessons,
      uncoveredLessonIds: uncoveredLessons,
      uncoveredObjectiveIds: coverageReport.uncoveredObjectiveIds,
      uncoveredRequirements,
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

/**
 * @deprecated Use selectModuleMasteryAssessment instead for full coverage results.
 */
export function selectModuleMasteryTest(
  experiences: Record<string, LessonExperienceV2>,
  options: { count?: number; excludeActivityIds?: string[]; rng?: () => number } = {}
): LearningActivity[] {
  return selectModuleMasteryAssessment(experiences, options).items;
}
