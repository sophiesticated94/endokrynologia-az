export type ModuleId = 'tarczyca' | 'przysadka' | 'nadnercza' | 'przytarczyce' | 'cukrzyca' | 'gonady' | 'nen' | 'otylosc';

export type Option = { text: string; explanation: string };

export type Question = {
  id: string;
  lessonId: string;
  prompt: string;
  options: Option[];
  answer: number;
};

export type Source = {
  id: string;
  title: string;
  year: string;
  url: string;
  kind: string;
};

export type Pair = [string, string];

export type DraftQuestion = {
  prompt: string;
  choices: Pair[];
};

export const q = (
  prompt: string,
  correct: Pair,
  wrong1: Pair,
  wrong2: Pair
): DraftQuestion => ({
  prompt,
  choices: [correct, wrong1, wrong2],
});

export interface MathDerivationStep {
  step: string;
  equation: string;
  explanation: string;
}

export interface MathDerivation {
  title: string;
  model: string;
  steps: MathDerivationStep[];
  clinicalTakeaway: string;
}

export interface WorkedExampleInput {
  label: string;
  value: string;
  unit: string;
}

export interface WorkedExample {
  title: string;
  patient: string;
  inputs: WorkedExampleInput[];
  calculationSteps: string[];
  result: string;
  clinicalAction: string;
}

export type Lesson = {
  id: string;
  moduleId?: ModuleId;
  title: string;
  subtitle: string;
  group: string;
  minutes: number;
  goals: string[];
  sections: { title: string; text: string }[];
  table: { headers: string[]; rows: string[][] };
  advanced: string;
  summary: string;
  sourceIds: string[];
  questions: Question[];
  derivation?: MathDerivation;
  workedExample?: WorkedExample;
};

export type DraftLesson = {
  id: string;
  moduleId?: ModuleId;
  title: string;
  subtitle?: string;
  group: string;
  minutes?: number;
  readTime?: string;
  goals: string[];
  sections: { title: string; text?: string; content?: string }[];
  table: { caption?: string; headers: string[]; rows: string[][] };
  advanced: string;
  summary: string;
  sourceIds: string[];
  questions: DraftQuestion[];
  derivation?: MathDerivation;
  workedExample?: WorkedExample;
};

