import type {
  LessonExperienceV2,
  LearningObjective,
  LearningActivity,
  AssessmentLevel,
} from './course-types.ts';

export interface ObjectiveCoverageDetail {
  objective: LearningObjective;
  activities: LearningActivity[];
  levels: Set<AssessmentLevel>;
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
    hasGenerationTransfer: boolean;
  };
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

  let missingAppCount = 0;
  let missingGenCount = 0;
  let coveredCount = 0;

  for (const obj of experience.objectives) {
    const matching = allActivities.filter(a => a.objectiveIds.includes(obj.id));
    const levels = new Set<AssessmentLevel>(matching.map(inferAssessmentLevel));
    const distinctTypes = new Set(matching.map(a => a.type));
    const missingRequirements: string[] = [];

    if (matching.length === 0) {
      missingRequirements.push('Brak jakiejkolwiek aktywności sprawdzającej ten cel.');
    } else {
      coveredCount++;
    }

    // Contract: decision, differentiation, safety require Application
    const requiresApp = ['decision', 'differentiation', 'safety'].includes(obj.kind);
    if (requiresApp && !levels.has('application') && !levels.has('generation')) {
      missingRequirements.push(`Cel typu „${obj.kind}” wymaga zadania na poziomie Application.`);
      missingAppCount++;
    }

    // Key objective requirement: at least 2 activity types
    if (matching.length > 0 && distinctTypes.size < 2) {
      missingRequirements.push('Kluczowy cel powinien mieć sprawdzenie przez co najmniej 2 różne typy zadań.');
    }

    const meetsContract = missingRequirements.length === 0;
    details[obj.id] = {
      objective: obj,
      activities: matching,
      levels,
      meetsContract,
      missingRequirements,
    };
  }

  // Contract: at least one Generation / transfer item in the lesson
  const hasGeneration = allActivities.some(a => inferAssessmentLevel(a) === 'generation');
  if (!hasGeneration) {
    missingGenCount++;
  }

  const isValid = Object.values(details).every(d => d.meetsContract) && hasGeneration;

  return {
    lessonId: experience.lessonId,
    isValid,
    objectives: details,
    summary: {
      totalObjectives: experience.objectives.length,
      coveredObjectives: coveredCount,
      missingApplication: missingAppCount,
      missingGeneration: missingGenCount,
      hasGenerationTransfer: hasGeneration,
    },
  };
}

export function selectLessonMasteryTest(
  experience: LessonExperienceV2,
  options: { count?: number; excludeActivityIds?: string[]; rng?: () => number } = {}
): LearningActivity[] {
  const { count = 3, excludeActivityIds = [], rng = Math.random } = options;
  const bank = experience.assessmentBank || [];
  const excludedSet = new Set(excludeActivityIds);

  // Filter pool
  const candidatePool = bank.filter(a => !excludedSet.has(a.id));
  const fallbackPool = getAllExperienceActivities(experience, false).filter(a => !excludedSet.has(a.id) && a.type !== 'recall');

  const selected: LearningActivity[] = [];
  const coveredObjIds = new Set<string>();

  // Ensure objective coverage first
  for (const obj of experience.objectives) {
    if (selected.length >= count) break;
    const match = candidatePool.find(a => a.objectiveIds.includes(obj.id) && !selected.some(s => s.id === a.id));
    if (match) {
      selected.push(match);
      match.objectiveIds.forEach(id => coveredObjIds.add(id));
    }
  }

  // If objectives not yet covered and pool exhausted, use fallback pool
  for (const obj of experience.objectives) {
    if (selected.length >= count) break;
    if (!coveredObjIds.has(obj.id)) {
      const match = fallbackPool.find(a => a.objectiveIds.includes(obj.id) && !selected.some(s => s.id === a.id));
      if (match) {
        selected.push(match);
        match.objectiveIds.forEach(id => coveredObjIds.add(id));
      }
    }
  }

  // Fill remaining slots
  const remainingCandidates = [...candidatePool, ...fallbackPool].filter(a => !selected.some(s => s.id === a.id));
  const shuffled = [...remainingCandidates].sort(() => rng() - 0.5);
  while (selected.length < count && shuffled.length > 0) {
    selected.push(shuffled.pop()!);
  }

  return selected.slice(0, count);
}

export function selectModuleMasteryTest(
  experiences: Record<string, LessonExperienceV2>,
  options: { count?: number; excludeActivityIds?: string[]; rng?: () => number } = {}
): LearningActivity[] {
  const { count = 10, excludeActivityIds = [], rng = Math.random } = options;
  const excludedSet = new Set(excludeActivityIds);

  // Group bank items by lesson
  const lessonEntries = Object.values(experiences);
  const selected: LearningActivity[] = [];

  // Pick 1 from each lesson first
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

  // Fill remaining if needed
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
