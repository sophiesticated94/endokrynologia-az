'use client';
import { useState } from 'react';
import { Activity, Beaker, GitBranch, TrendingUp } from 'lucide-react';
import type { Confidence, LearningActivity, LessonExperienceV2, ModuleId, PracticeRecordMeta } from '@/lib/course-types';
import { PracticeActivityCard } from './practice-activity';
import {
  getPsychiatryWidgetProvider,
  PSYCHIATRY_LESSON_ACTIVITY_REGISTRY,
} from '@/lib/psychiatry/psychiatry-lesson-activities';

export { PSYCHIATRY_LESSON_ACTIVITY_REGISTRY };

type RecordPractice = (activity: LearningActivity, correct: boolean, confidence?: Confidence, scored?: boolean, meta?: PracticeRecordMeta) => Promise<boolean>;
const labels: Record<string, readonly [string, any]> = {
  'axis-map': ['Mapa osi', Activity],
  'lab-workbench': ['Panel wyników', Beaker],
  timeline: ['Oś czasu', TrendingUp],
  'pathway-builder': ['Ścieżka decyzji', GitBranch],
  'adrenal-workbench': ['Pracownia nadnerczy', Activity],
  'parathyroid-workbench': ['Pracownia przytarczyc', Beaker],
};

type ActivityBaseInput = {
  id: string;
  objectiveIds: string[];
  difficulty: 'both';
  reasoning: LessonExperienceV2['objectives'][number]['kind'];
  sourceIds: string[];
  hint: string;
};

type WidgetProvider = Record<string, (base: ActivityBaseInput) => LearningActivity>;

const DIABETES_PROVIDERS: WidgetProvider = {
  'axis-map': base => ({
    ...base,
    type: 'single_choice',
    prompt: 'Przy znacznym niedoborze insuliny i wzroście hormonów kontrregulacyjnych przewidź dominujący kierunek zmian.',
    options: ['Spadek lipolizy i ketogenezy', 'Wzrost lipolizy, ketogenezy i produkcji glukozy', 'Izolowany spadek glukagonu'],
    answer: 1,
    explanation: 'Niedobór działania insuliny i przewaga sygnałów kontrregulacyjnych sprzyjają produkcji glukozy oraz ketonów. Model pokazuje kierunek, nie nasilenie u konkretnej osoby.',
  }),
  'lab-workbench': base => ({
    ...base,
    type: 'lab',
    prompt: 'Glukoza 228 mg/dl, β-hydroksymaślan 4,1 mmol/l, pH 7,24, HCO₃⁻ 15 mmol/l. Co wolno stwierdzić z tego zestawu?',
    options: ['Spełnia trzy grupy kryteriów DKA w konsensusie 2024', 'Sama glukoza rozpoznaje HHS', 'Prawidłowe pH wyklucza kwasicę'],
    answer: 0,
    explanation: 'Rozpoznanie DKA wymaga cukrzycy/hiperglikemii, ketonemii i kwasicy. Wyniki ćwiczenia nie zastępują oceny pacjenta ani lokalnego protokołu.',
  }),
  timeline: base => ({
    ...base,
    type: 'trend',
    prompt: 'CGM pokazuje szybki wzrost glikemii, ale pacjent ma nudności i przyjmuje inhibitor SGLT2. Czego nie wolno przeoczyć?',
    options: ['Oceny ketonów i równowagi kwasowo-zasadowej', 'Wyłącznie średniej z ostatnich 14 dni', 'Założenia, że niższa glikemia wyklucza DKA'],
    answer: 0,
    explanation: 'DKA może wystąpić przy glikemii poniżej dawnych progów, zwłaszcza w określonych kontekstach. Trend CGM nie zastępuje wymaganych pomiarów.',
  }),
  'pathway-builder': base => ({
    ...base,
    type: 'ordering',
    prompt: 'Ułóż bezpieczny tok oceny podejrzenia ostrego kryzysu hiperglikemicznego.',
    items: ['Oceń stan ogólny i pilność', 'Zbierz pełny zestaw glukoza/ketony/pH lub HCO₃⁻/osmolalność', 'Rozpoznaj DKA, HHS albo obraz mieszany', 'Zastosuj właściwy protokół i monitorowanie'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Najpierw bezpieczeństwo i komplet danych, potem klasyfikacja oraz postępowanie według protokołu.',
  }),
};

const ENDO_GENERAL_PROVIDERS: WidgetProvider = {
  'axis-map': base => ({
    ...base,
    type: 'single_choice',
    prompt: 'Spada produkcja T4, a podwzgórze i przysadka działają prawidłowo. Jaki wzorzec przewidujesz?',
    options: ['FT4 spada, TSH rośnie', 'FT4 i TSH rosną równolegle', 'FT4 spada, a TSH zawsze pozostaje bez zmian'],
    answer: 0,
    explanation: 'Przy sprawnej osi spadek hormonu obwodowego osłabia ujemne sprzężenie zwrotne i zwiększa sygnał TSH.',
  }),
  'lab-workbench': base => ({
    ...base,
    type: 'lab',
    prompt: 'TSH 1,8 mIU/l i FT4 8 pmol/l po operacji przysadki. Jaka informacja ma największe znaczenie?',
    options: ['Prawidłowa flaga TSH wyklucza chorobę', 'TSH może być nieadekwatne do niskiego FT4', 'Niskie FT4 zawsze oznacza pierwotną chorobę tarczycy'],
    answer: 1,
    explanation: 'W chorobie przysadki samo TSH nie wyklucza niedoczynności centralnej; potrzebne są FT4, kontekst kliniczny i ocena pozostałych osi.',
  }),
  timeline: base => ({
    ...base,
    type: 'trend',
    prompt: 'Po zmianie dawki LT4 FT4 zmienia się wcześniej niż TSH. Który wniosek jest najbezpieczniejszy?',
    options: ['Ocenić czas od zmiany i nie eskalować leczenia na podstawie zbyt wczesnego TSH', 'TSH stabilizuje się w kilka godzin', 'Każde odchylenie wymaga natychmiastowej kolejnej zmiany dawki'],
    answer: 0,
    explanation: 'Oś potrzebuje czasu do nowej równowagi. Interpretacja wymaga znajomości czasu, sposobu przyjmowania i sytuacji klinicznej.',
  }),
  'pathway-builder': base => ({
    ...base,
    type: 'ordering',
    prompt: 'Ułóż tok oceny niespójnych wyników tarczycowych.',
    items: ['Sprawdź kontekst i objawy', 'Zweryfikuj leki, suplementy, czas pobrania i jednostki', 'Powtórz lub omów oznaczenie z laboratorium', 'Dopiero potem rozważ rzadkie rozpoznania'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Niespójność wymaga najpierw kontroli warunków badania i interferencji, zanim uruchomi się diagnostykę rzadkich chorób.',
  }),
  'adrenal-workbench': base => ({
    ...base,
    type: 'single_choice',
    prompt: 'Jakie jest pierwsze i najważniejsze postępowanie farmakologiczne przed zabiegiem wycięcia guza chromochłonnego?',
    options: ['Skuteczna blokada receptorów alfa-adrenergicznych przed podaniem beta-blokera', 'Natychmiastowe podanie kardioselektywnego beta-blokera', 'Podanie wysokich dawek fludrokortyzonu'],
    answer: 0,
    explanation: 'Blokada alfa-adrenolitykiem przed beta-blokerem jest krytycznym wymogiem bezpieczeństwa hemodynamicznego w pheochromocytoma.',
  }),
  'parathyroid-workbench': base => ({
    ...base,
    type: 'single_choice',
    prompt: 'Kiedy wskaźnik CCCR nie pozwala na pewne odróżnienie pierwotnej nadczynności przytarczyc od FHH?',
    options: ['Gdy mieści się w strefie nakładania 0,010–0,020 lub współistnieje niedobór witaminy D', 'Gdy wynosi dokładnie 0,005', 'Gdy wapń całkowity przekracza 3,5 mmol/l'],
    answer: 0,
    explanation: 'Strefa 0,010–0,020 oraz niedobór witaminy D i tiazydy uniemożliwiają jednoznaczne rozstrzygnięcie bez normalizacji 25(OH)D i ew. badań genetycznych genu CASR.',
  }),
};

function getWidgetProvider(moduleId: ModuleId, lessonId?: string): WidgetProvider {
  if (moduleId === 'psych-afektywne' || moduleId === 'psych-farmakologia') {
    return getPsychiatryWidgetProvider(lessonId);
  }
  if (moduleId === 'cukrzyca') {
    return DIABETES_PROVIDERS;
  }
  return ENDO_GENERAL_PROVIDERS;
}

function activityFor(widgetId: LessonExperienceV2['widgetIds'][number], moduleId: ModuleId, experience: LessonExperienceV2): LearningActivity {
  const base: ActivityBaseInput = {
    id: `${experience.lessonId}-${widgetId}-v2`,
    objectiveIds: [experience.objectives[0].id],
    difficulty: 'both',
    reasoning: experience.objectives[0].kind,
    sourceIds: experience.diagnostic.sourceIds,
    hint: 'Najpierw nazwij bodziec, odpowiedź układu i warunek, który może zmienić interpretację.',
  };
  const provider = getWidgetProvider(moduleId, experience.lessonId);
  const factory = provider[widgetId] || ENDO_GENERAL_PROVIDERS[widgetId];
  return factory(base);
}

function withChoiceFeedback(activity: LearningActivity): LearningActivity {
  if (!('options' in activity)) return activity;
  const correct = 'answer' in activity ? activity.answer : -1;
  return {
    ...activity,
    optionFeedback: activity.options.map((_, index) => index === correct
      ? activity.explanation
      : 'Ten wybór pomija kluczowy mechanizm, komplet danych albo warunek bezpieczeństwa opisany w odpowiedzi wzorcowej.'),
  };
}

export function widgetActivitiesForExperience(experience: LessonExperienceV2, moduleId: ModuleId): LearningActivity[] {
  return experience.widgetIds.map(widgetId => withChoiceFeedback(activityFor(widgetId, moduleId, experience)));
}

export function LearningWidgets({experience,moduleId,onRecord}:{experience:LessonExperienceV2;moduleId:ModuleId;onRecord:RecordPractice}) {
  const [active, setActive] = useState(experience.widgetIds[0]);
  if (!active) return null;
  const widgetActivity = widgetActivitiesForExperience(experience, moduleId).find(activity => activity.id === `${experience.lessonId}-${active}-v2`)!;
  return <section className="widget-lab">
    <div className="widget-lab-heading"><div><span className="eyebrow">PRACOWNIA W LEKCJI</span><h2>Najpierw przewidź, potem odsłoń mechanizm</h2></div><span className="model-warning">Model edukacyjny · nie diagnozuje</span></div>
    <div className="widget-tabs" role="tablist" aria-label="Narzędzia tej lekcji">
      {experience.widgetIds.map(id => {
        const [label, Icon] = labels[id] || ['Pracownia', Activity];
        return <button key={id} role="tab" aria-selected={active===id} className={active===id?'active':''} onClick={()=>setActive(id)}><Icon size={16}/>{label}</button>;
      })}
    </div>
    <PracticeActivityCard key={widgetActivity.id} activity={widgetActivity} onRecord={onRecord}/>
  </section>;
}
