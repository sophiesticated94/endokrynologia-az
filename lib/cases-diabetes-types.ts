export type DiabetesCaseDraft = {
  id: string;
  lessonId?: string;
  title: string;
  patient: string;
  difficulty: 'Podstawowy' | 'Zaawansowany';
  intro: string;
  steps: {
    stage?: string;
    prompt: string;
    context?: string;
    options: { text: string; explanation: string }[];
  }[];
};
