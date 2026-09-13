import type {
  LessonExperienceV2,
  LearningObjective,
  LearningActivity,
  AssessmentLevel,
} from './course-types.ts';

export interface ObjectiveAssessmentRequirements {
  requiresAnyAssessment: boolean;
  requiresApplicationOrGeneration: boolean;
  requiresTransfer: boolean;
  requiresGeneration: boolean;
  requiresGenerationTransfer: boolean;
  requiresSafetyCapable: boolean;
  minActivityTypes: number;
}

export interface DetailedUnmetRequirement {
  objectiveId: string;
  missing: string[];
}

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

export interface SelectedAssessmentCoverageReport {
  isValid: boolean;
  uncoveredObjectiveIds: string[];
  unmetRequirements: string[];
  detailedUnmetRequirements: DetailedUnmetRequirement[];
  lessonLevelDebt: string[];
  coveredObjectiveCount: number;
  totalObjectiveCount: number;
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

export function isActivitySafetyCapable(activity: LearningActivity): boolean {
  if (activity.reasoning === 'safety') return true;
  if (activity.id.includes('-safety-') || activity.id.includes('-safe-') || activity.id.endsWith('-safety')) return true;
  if (activity.rubric?.criticalErrors && activity.rubric.criticalErrors.length > 0) return true;
  if (activity.rationaleRubric?.contradictions && activity.rationaleRubric.contradictions.some(c => c.severity === 'critical')) return true;
  const lvl = inferAssessmentLevel(activity);
  return lvl === 'application' || lvl === 'generation';
}

export function getObjectiveAssessmentRequirements(
  objective: LearningObjective
): ObjectiveAssessmentRequirements {
  const kind = objective.kind;
  switch (kind) {
    case 'safety':
      return {
        requiresAnyAssessment: true,
        requiresApplicationOrGeneration: true,
        requiresTransfer: true,
        requiresGeneration: false,
        requiresGenerationTransfer: false,
        requiresSafetyCapable: true,
        minActivityTypes: 2,
      };
    case 'decision':
      return {
        requiresAnyAssessment: true,
        requiresApplicationOrGeneration: true,
        requiresTransfer: true,
        requiresGeneration: false,
        requiresGenerationTransfer: false,
        requiresSafetyCapable: false,
        minActivityTypes: 2,
      };
    case 'differentiation':
      return {
        requiresAnyAssessment: true,
        requiresApplicationOrGeneration: true,
        requiresTransfer: true,
        requiresGeneration: false,
        requiresGenerationTransfer: false,
        requiresSafetyCapable: false,
        minActivityTypes: 2,
      };
    case 'interpretation':
      return {
        requiresAnyAssessment: true,
        requiresApplicationOrGeneration: true,
        requiresTransfer: false,
        requiresGeneration: false,
        requiresGenerationTransfer: false,
        requiresSafetyCapable: false,
        minActivityTypes: 2,
      };
    case 'mechanism':
    default:
      return {
        requiresAnyAssessment: true,
        requiresApplicationOrGeneration: false,
        requiresTransfer: false,
        requiresGeneration: false,
        requiresGenerationTransfer: false,
        requiresSafetyCapable: false,
        minActivityTypes: 2,
      };
  }
}

export function getRequiredObjectiveTokens(objective: LearningObjective, prefix = 'obj'): string[] {
  const reqs = getObjectiveAssessmentRequirements(objective);
  const tokens: string[] = [`${prefix}:${objective.id}:any`];
  if (reqs.requiresApplicationOrGeneration) {
    tokens.push(`${prefix}:${objective.id}:application_or_generation`);
  }
  if (reqs.requiresTransfer) {
    tokens.push(`${prefix}:${objective.id}:transfer`);
  }
  if (reqs.requiresGenerationTransfer) {
    tokens.push(`${prefix}:${objective.id}:generation_transfer`);
  }
  return tokens;
}

export function getActivityCoveredTokens(
  activity: LearningActivity,
  objectives: LearningObjective[],
  prefix = 'obj'
): Set<string> {
  const tokens = new Set<string>();
  const isApp = inferAssessmentLevel(activity) === 'application';
  const isGen = isActivityGeneration(activity);
  const isTrans = isActivityTransfer(activity);
  const isGenTrans = isActivityGenerationTransfer(activity);

  for (const obj of objectives) {
    if (!activity.objectiveIds || !activity.objectiveIds.includes(obj.id)) continue;
    tokens.add(`${prefix}:${obj.id}:any`);
    if (isApp || isGen) {
      tokens.add(`${prefix}:${obj.id}:application_or_generation`);
    }
    if (isTrans) {
      tokens.add(`${prefix}:${obj.id}:transfer`);
    }
    if (isGenTrans) {
      tokens.add(`${prefix}:${obj.id}:generation_transfer`);
    }
  }

  if (isGenTrans) {
    tokens.add('lesson:generation_transfer');
  }

  return tokens;
}

export function validateSelectedAssessmentCoverage(
  objectives: LearningObjective[],
  selectedActivities: LearningActivity[],
  options?: {
    requireGenerationTransfer?: boolean;
    requireGeneration?: boolean;
    requireTransfer?: boolean;
    checkDiversity?: boolean;
  }
): SelectedAssessmentCoverageReport {
  const uncoveredObjectiveIds: string[] = [];
  const unmetRequirements: string[] = [];
  const detailedUnmetRequirements: DetailedUnmetRequirement[] = [];
  const lessonLevelDebt: string[] = [];
  let coveredCount = 0;

  for (const obj of objectives) {
    const matching = selectedActivities.filter(a => a.objectiveIds && a.objectiveIds.includes(obj.id));
    if (matching.length === 0) {
      uncoveredObjectiveIds.push(obj.id);
      unmetRequirements.push(`Cel "${obj.id}" nie jest pokryty przez wybrane zadania.`);
      detailedUnmetRequirements.push({ objectiveId: obj.id, missing: ['any'] });
      continue;
    }

    coveredCount++;
    const reqs = getObjectiveAssessmentRequirements(obj);
    const hasAppOrGen = matching.some(a => inferAssessmentLevel(a) === 'application' || isActivityGeneration(a));
    const hasTrans = matching.some(isActivityTransfer);
    const hasGen = matching.some(isActivityGeneration);
    const hasSafety = matching.some(isActivitySafetyCapable);
    const distinctTypes = Array.from(new Set(matching.map(a => a.type)));

    const missingItems: string[] = [];

    if (reqs.requiresApplicationOrGeneration && !hasAppOrGen) {
      missingItems.push('application');
      unmetRequirements.push(`Cel "${obj.id}" (${obj.kind}) wymaga zadania Application lub Generation.`);
    }
    if (reqs.requiresTransfer && !hasTrans) {
      missingItems.push('transfer');
      unmetRequirements.push(`Cel "${obj.id}" (${obj.kind}) wymaga zadania transferowego.`);
    }
    if (reqs.requiresGeneration && !hasGen) {
      missingItems.push('generation');
      unmetRequirements.push(`Cel "${obj.id}" (${obj.kind}) wymaga zadania Generation.`);
    }
    if (reqs.requiresSafetyCapable && !hasSafety) {
      missingItems.push('safety_capable');
      unmetRequirements.push(`Cel "${obj.id}" (${obj.kind}) wymaga zadania uwzględniającego bezpieczeństwo.`);
    }
    if (options?.checkDiversity && distinctTypes.length < reqs.minActivityTypes) {
      missingItems.push('activity_type_diversity');
      unmetRequirements.push(`Cel "${obj.id}" wymaga co najmniej 2 różnych typów zadań.`);
    }

    if (missingItems.length > 0) {
      if (!uncoveredObjectiveIds.includes(obj.id)) {
        uncoveredObjectiveIds.push(obj.id);
      }
      detailedUnmetRequirements.push({ objectiveId: obj.id, missing: missingItems });
    }
  }

  if (options?.requireGenerationTransfer && !selectedActivities.some(isActivityGenerationTransfer)) {
    lessonLevelDebt.push('missing_generation_transfer');
    unmetRequirements.push('Zestaw zadań nie zawiera zadania Generation Transfer.');
  }
  if (options?.requireGeneration && !selectedActivities.some(isActivityGeneration)) {
    lessonLevelDebt.push('missing_generation');
    unmetRequirements.push('Zestaw zadań nie zawiera zadania Generation.');
  }
  if (options?.requireTransfer && !selectedActivities.some(isActivityTransfer)) {
    lessonLevelDebt.push('missing_transfer');
    unmetRequirements.push('Zestaw zadań nie zawiera zadania Transfer.');
  }

  const isValid = uncoveredObjectiveIds.length === 0 && unmetRequirements.length === 0 && lessonLevelDebt.length === 0;

  return {
    isValid,
    uncoveredObjectiveIds,
    unmetRequirements,
    detailedUnmetRequirements,
    lessonLevelDebt,
    coveredObjectiveCount: coveredCount,
    totalObjectiveCount: objectives.length,
  };
}

export function getAllExperienceActivities(experience: LessonExperienceV2, includeBank = true): LearningActivity[] {
  const inline = [
    experience.diagnostic,
    ...(experience.activities || []),
    experience.teachBack,
    ...(experience.exitTicket || []),
  ].filter(Boolean) as LearningActivity[];
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
    const matching = allActivities.filter(a => a.objectiveIds && a.objectiveIds.includes(obj.id));
    const levels = new Set<AssessmentLevel>(matching.map(inferAssessmentLevel));
    const distinctTypes = Array.from(new Set(matching.map(a => a.type)));
    const missingRequirements: string[] = [];

    const hasRec = matching.some(a => inferAssessmentLevel(a) === 'recognition');
    const hasApp = matching.some(a => inferAssessmentLevel(a) === 'application');
    const hasGen = matching.some(isActivityGeneration);
    const hasTrans = matching.some(isActivityTransfer);
    const hasGenTrans = matching.some(isActivityGenerationTransfer);
    const inBank = experience.assessmentBank ? experience.assessmentBank.some(a => a.objectiveIds && a.objectiveIds.includes(obj.id)) : false;

    if (matching.length === 0) {
      missingRequirements.push('Brak jakiejkolwiek aktywności sprawdzającej ten cel.');
    } else {
      coveredCount++;
    }

    const reqs = getObjectiveAssessmentRequirements(obj);

    if (reqs.requiresApplicationOrGeneration && !hasApp && !hasGen) {
      missingRequirements.push(`Cel typu „${obj.kind}” wymaga zadania na poziomie Application lub Generation.`);
      missingAppCount++;
    }

    if (reqs.requiresTransfer && !hasTrans) {
      missingRequirements.push(`Kluczowy cel typu „${obj.kind}” wymaga zadania transferowego.`);
      missingTransferCount++;
    }

    if (matching.length > 0 && distinctTypes.length < reqs.minActivityTypes) {
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

export * from './assessment-token-cover.ts';
export * from './assessment-selection.ts';
