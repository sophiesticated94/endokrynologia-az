export type ModuleId = 'tarczyca' | 'przysadka' | 'nadnercza';

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
};

export type DraftLesson = Omit<Lesson, 'questions'> & {
  questions: DraftQuestion[];
};
