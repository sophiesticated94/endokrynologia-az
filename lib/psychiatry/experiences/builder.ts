import type {
  LearningActivity,
  LearningObjective,
  Lesson,
  LessonExperienceV2,
  ObjectiveKind,
  Question,
  InlineEnhancementRef,
} from '../../course-types.ts';

function classifyPsychiatryObjective(statement: string): ObjectiveKind {
  const value = statement.toLocaleLowerCase('pl');
  if (/bezpie|piln|przeciwwsk|monitor|zagroż|alarm|toksycz|objaw alarmowy|odstawien/.test(value)) return 'safety';
  if (/różnic|odróż|porówn|fenotyp|mask|granic/.test(value)) return 'differentiation';
  if (/decyz|postępow|leczeni|kwalifik|dobier|wybier|wskaz|miareczkowan|zmian|tapering|włączeni/.test(value)) return 'decision';
  if (/interpret|wynik|panel|trend|oblicz|rozpozn|klasyfik|kryteri|mse|skal|tdm|pet/.test(value)) return 'interpretation';
  return 'mechanism';
}

function toActivity(
  question: Question,
  objectiveId: string,
  reasoning: ObjectiveKind,
  phase: 'diagnostic' | 'checkpoint-1' | 'checkpoint-2' | 'exit-transfer' | 'exit-safety',
  sourceIds: string[],
): LearningActivity {
  return {
    id: `${question.id}-${phase}-v2`,
    type: phase === 'diagnostic' ? 'single_choice' : phase.startsWith('exit') ? 'missing_information' : 'single_choice',
    objectiveIds: [objectiveId],
    prompt: question.prompt,
    options: question.options.map(option => option.text),
    optionFeedback: question.options.map(option => option.explanation),
    answer: question.answer,
    explanation: question.options[question.answer].explanation,
    hint: 'Zastosuj model wnioskowania klinicznego: najpierw zidentyfikuj patomechanizm lub kryterium, a dopiero potem wybierz działanie.',
    difficulty: phase.startsWith('exit') ? 'both' : 'student',
    reasoning,
    sourceIds,
  };
}

export interface PsychiatryExperienceCustomization {
  inlineEnhancementsBySection?: Record<number, InlineEnhancementRef[]>;
  widgetIds?: LessonExperienceV2['widgetIds'];
}

export function buildPsychiatryLessonExperience(
  lesson: Lesson,
  customization: PsychiatryExperienceCustomization = {},
): LessonExperienceV2 {
  const objectives: LearningObjective[] = lesson.goals.slice(0, 4).map((statement, index) => ({
    id: `${lesson.id}-obj-${index + 1}`,
    statement,
    kind: classifyPsychiatryObjective(statement),
  }));

  if (objectives.length < 2) {
    objectives.push({
      id: `${lesson.id}-obj-2`,
      statement: `Zastosuj zasady diagnostyki i bezpieczeństwa farmakoterapii w temacie: ${lesson.title}`,
      kind: 'safety',
    });
  }

  const objectiveAt = (index: number) => objectives[index % objectives.length].id;

  const diagnostic = toActivity(lesson.questions[0], objectiveAt(0), 'mechanism', 'diagnostic', lesson.sourceIds);
  const activities: LearningActivity[] = [
    toActivity(lesson.questions[1], objectiveAt(1), 'mechanism', 'checkpoint-1', lesson.sourceIds),
    toActivity(lesson.questions[2], objectiveAt(2), 'interpretation', 'checkpoint-2', lesson.sourceIds),
  ];

  const exitTicket: LearningActivity[] = [
    toActivity(lesson.questions[3], objectiveAt(3), 'decision', 'exit-transfer', lesson.sourceIds),
    toActivity(lesson.questions[4], objectiveAt(0), 'safety', 'exit-safety', lesson.sourceIds),
  ];

  const blocks = lesson.sections.map((section, index) => ({
    id: `${lesson.id}-block-${index + 1}`,
    title: section.title,
    text: section.text,
    sourceIds: lesson.sourceIds,
    checkpointId: activities[index]?.id,
    inlineEnhancements: customization.inlineEnhancementsBySection?.[index] || [],
  }));

  const widgets: LessonExperienceV2['widgetIds'] = customization.widgetIds || ['lab-workbench', 'timeline'];

  return {
    experienceVersion: 2,
    lessonId: lesson.id,
    objectives,
    diagnostic,
    blocks,
    activities,
    teachBack: {
      id: `${lesson.id}-teach-back-v2`,
      type: 'recall',
      objectiveIds: objectives.map(item => item.id),
      prompt: `Wyjaśnij własnymi słowami kluczowy mechanizm neurobiologiczny lub algorytm decyzyjny z lekcji „${lesson.title}”.`,
      modelAnswer: lesson.summary,
      explanation:
        'Porównaj swoją odpowiedź z odpowiedzią wzorcową. Zwróć uwagę na mechanizm receptorowy, kryteria diagnostyczne i margines bezpieczeństwa pacjenta.',
      difficulty: 'both',
      reasoning: 'mechanism',
      sourceIds: lesson.sourceIds,
    },
    exitTicket,
    widgetIds: widgets,
    review: {
      status: 'source-checked',
      checkedAt: '2026-09-12',
      scope:
        'Struktura dydaktyczna v2, standardy ICD-11 CDDR, DSM-5-TR, Maudsley 15th ed., AGNP TDM 2026 oraz CPIC.',
    },
  };
}
