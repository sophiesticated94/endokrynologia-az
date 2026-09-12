import type { Question } from './course-types.ts';
import type { FlexibleCaseStep, FlexibleClinicalCase } from './psychiatry/cases/types.ts';

export type Choice = [string, string];
export type StepDraft = [string, string, Choice, Choice];
export type ClinicalCase = FlexibleClinicalCase;

export interface DetailedStepDraft {
  stage: string;
  context: string;
  prompt: string;
  choices: Choice[]; // [text, explanation][]
  answerIndex?: number;
  counterfactual?: FlexibleCaseStep['counterfactual'];
}

export const makeFlexibleCase = (
  lessonId: string,
  title: string,
  patient: string,
  difficulty: ClinicalCase['difficulty'],
  intro: string,
  steps: DetailedStepDraft[],
  meta?: { threadId?: string; timeOffsetWeeks?: number }
): FlexibleClinicalCase => ({
  id: `case-${lessonId}`,
  lessonId,
  title,
  patient,
  difficulty,
  intro,
  threadId: meta?.threadId,
  timeOffsetWeeks: meta?.timeOffsetWeeks,
  steps: steps.map((s, i) => ({
    id: `case-${lessonId}-${i + 1}`,
    lessonId,
    stage: s.stage,
    context: s.context,
    prompt: s.prompt,
    answer: s.answerIndex ?? 0,
    options: s.choices.map(([text, explanation]) => ({
      text,
      explanation,
    })),
    counterfactual: s.counterfactual,
  })),
});

export const make = (
  lessonId: string,
  title: string,
  patient: string,
  difficulty: ClinicalCase['difficulty'],
  intro: string,
  steps: StepDraft[]
): ClinicalCase => ({
  id: `case-${lessonId}`,
  lessonId,
  title,
  patient,
  difficulty,
  intro,
  steps: steps.map(([context, prompt, correct, wrong], i) => ({
    id: `case-${lessonId}-${i + 1}`,
    lessonId,
    stage: ['Objawy', 'Badania', 'Rozpoznanie', 'Postępowanie'][i] || `Etap ${i + 1}`,
    context,
    prompt,
    answer: i % 2,
    options: (i % 2 ? [wrong, correct] : [correct, wrong]).map(([text, explanation]) => ({
      text,
      explanation,
    })),
  })),
});
