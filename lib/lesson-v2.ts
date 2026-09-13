import type {
  LearningActivity,
  LearningObjective,
  Lesson,
  LessonExperienceV2,
  ObjectiveKind,
  Question,
} from './course-types.ts';

function classifyObjective(statement: string): ObjectiveKind {
  const value = statement.toLocaleLowerCase('pl');
  if (/bezpie|piln|przeciwwsk|monitor|zagroż|alarm/.test(value)) return 'safety';
  if (/różnic|odróż|porówn/.test(value)) return 'differentiation';
  if (/decyz|postępow|leczeni|kwalifik|dobier|wybier|wskaz/.test(value)) return 'decision';
  if (/interpret|wynik|panel|trend|oblicz|rozpozn|klasyfik/.test(value)) return 'interpretation';
  return 'mechanism';
}

function toActivity(
  question: Question,
  objectiveId: string,
  reasoning: ObjectiveKind,
  phase: string,
  sources: string[],
): LearningActivity {
  return {
    id: `${question.id}-${phase}-v2`,
    type: phase === 'diagnostic' ? 'single_choice' : phase === 'exit' ? 'missing_information' : 'single_choice',
    objectiveIds: [objectiveId],
    prompt: question.prompt,
    options: question.options.map(option => option.text),
    optionFeedback: question.options.map(option => option.explanation),
    answer: question.answer,
    explanation: question.options[question.answer].explanation,
    hint: 'Najpierw nazwij mechanizm lub wzorzec wyników, dopiero potem wybierz odpowiedź.',
    difficulty: phase === 'exit' ? 'both' : 'student',
    reasoning,
    sourceIds: sources,
  };
}

function widgetIds(lesson: Lesson): LessonExperienceV2['widgetIds'] {
  const id = lesson.id;
  const widgets = new Set<LessonExperienceV2['widgetIds'][number]>();
  if (/fizjologia|diagnostyka|dka|hhs|zapalenia|niedoczynnosc|nadczynnosc|prolactinoma|akromegalia|cushing|hipopituitaryzm|hpa|hpg|tarczyca|adrenal|gonady|hpt/.test(id)) widgets.add('axis-map');
  if (/diagnostyka|dka|hhs|ciaza|cgm|stany-nagle|niedoczynnosc|nadczynnosc|moczowka|siadh|osmolalnosc|lab|wapn|fosfor|ogtt|krzywa|kortyzol|aldosteron/.test(id)) widgets.add('lab-workbench');
  if (/dka|hhs|cgm|zapalenia|niedoczynnosc|ciaza|technologie|pulsacja|operacje|timeline|kinetyka|przetoczenia|porod/.test(id)) widgets.add('timeline');
  if (/diagnostyka|guzki|dka|hhs|klasyfikacja|stany-nagle|guzy-nieczynne|udar-przysadki|algorytm|pathway|nen|rakowiak|bariatria/.test(id)) widgets.add('pathway-builder');
  if (!widgets.size) widgets.add(lesson.moduleId === 'cukrzyca' || lesson.moduleId === 'przytarczyce' ? 'lab-workbench' : 'axis-map');
  return [...widgets].slice(0, 2);
}

export function buildPilotExperiences(lessons: Lesson[]): Record<string, LessonExperienceV2> {
  return Object.fromEntries(
    lessons.map(lesson => {
      const objectives: LearningObjective[] = lesson.goals.slice(0, 4).map((statement, index) => ({
        id: `${lesson.id}-objective-${index + 1}`,
        statement,
        kind: classifyObjective(statement),
      }));
      const objectiveAt = (index: number) => objectives[index % objectives.length].id;
      const diagnostic = toActivity(lesson.questions[0], objectiveAt(0), 'mechanism', 'diagnostic', lesson.sourceIds);
      const activities = lesson.questions.slice(1, 3).map((question, index) =>
        toActivity(question, objectiveAt(index + 1), index === 0 ? 'mechanism' : 'interpretation', `checkpoint-${index + 1}`, lesson.sourceIds),
      );
      const exitTicket = lesson.questions.slice(3).map((question, index) =>
        toActivity(question, objectiveAt(index + 3), index === 0 ? 'decision' : 'safety', 'exit', lesson.sourceIds),
      );
      const blocks = lesson.sections.map((section, index) => ({
        id: `${lesson.id}-block-${index + 1}`,
        title: section.title,
        text: section.text,
        sourceIds: lesson.sourceIds,
        checkpointId: activities[index]?.id,
      }));
      const experience: LessonExperienceV2 = {
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
          prompt: `Wyjaśnij własnymi słowami najważniejszy mechanizm z lekcji „${lesson.title}”.`,
          modelAnswer: lesson.summary,
          explanation: 'Porównaj swoją wypowiedź z odpowiedzią wzorcową. Liczy się mechanizm i warunek zastosowania, nie identyczne brzmienie.',
          difficulty: 'both',
          reasoning: 'mechanism',
          sourceIds: lesson.sourceIds,
        },
        exitTicket,
        widgetIds: widgetIds(lesson),
        review: {
          status: 'source-checked',
          checkedAt: '2026-09-12',
          scope: 'Struktura dydaktyczna v2 i zgodność twierdzeń z przypisanym zestawem źródeł; bez formalnej recenzji klinicznej.',
        },
      };
      return [lesson.id, experience];
    }),
  );
}

export function buildQuestionObjectiveMap(experiences: Record<string, LessonExperienceV2>) {
  const result: Record<string, string[]> = {};
  for (const experience of Object.values(experiences)) {
    for (const activity of [experience.diagnostic, ...experience.activities, ...experience.exitTicket]) {
      const questionId = activity.id.replace(/-(diagnostic|checkpoint-\d+|exit)-v2$/, '');
      result[questionId] = activity.objectiveIds;
    }
  }
  return result;
}

export function requiredCompletionActivityIds(experience: LessonExperienceV2): string[] {
  return [...experience.activities, experience.teachBack, ...experience.exitTicket].map(activity => activity.id);
}

export function isLessonCoreComplete(experience: LessonExperienceV2, completedIds: ReadonlySet<string>): boolean {
  return requiredCompletionActivityIds(experience).every(id => completedIds.has(id));
}

export function findRepeatableActivity(experience: LessonExperienceV2, activityId: string, extraActivities: LearningActivity[] = []): LearningActivity|undefined {
  return [experience.diagnostic, ...experience.activities, experience.teachBack, ...experience.exitTicket, ...extraActivities].find(activity => activity.id === activityId);
}
