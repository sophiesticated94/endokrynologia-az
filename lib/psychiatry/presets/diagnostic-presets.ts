import type { PsychiatryWorkbenchPreset } from '../types.ts';

export const DIAGNOSTIC_PRESETS: Record<string, PsychiatryWorkbenchPreset> = {
  'mse-young-adult-001': {
    id: 'mse-young-adult-001',
    title: 'Ocena MSE: Młody dorosły w pierwszym epizodzie',
    tab: 'diagnostic',
    patientSummary: '21-letni student z wycofaniem społecznym, spowolnieniem psychoruchowym i ambiwalencją afektu.',
    data: {
      lessonId: 'wywiad-psychiatryczny-mse',
      appearance: 'Zaniedbany ubiór, unikanie kontaktu wzrokowego',
      speech: 'Zwolnione tempo, pauzy przed odpowiedziami, zubożenie treści',
      mood: 'Obniżony, „pusty”',
      affect: 'Spłycony, sztywny, niedostosowany',
      thoughtProcess: 'Rozkojarzenie łagodne, perseweracje',
      thoughtContent: 'Urojenia ksobne bez usystematyzowania',
      perception: 'Omamy słuchowe komentujące',
      cognition: 'Zorientowany co do miejsca i czasu',
      insight: 'Brak wglądu w naturę objawów',
    },
  },
  'depressive-differential-001': {
    id: 'depressive-differential-001',
    title: 'Różnicowanie depresji: Maski somatyczne vs MDD',
    tab: 'diagnostic',
    patientSummary: '48-letni inżynier ze zmęczeniem, anhedonią i podejrzeniem maski metabolicznej.',
    data: {
      lessonId: 'depresja-fenotypy-i-kryteria',
      durationWeeks: 6,
      coreSymptoms: ['anhedonia', 'obnizony_nastroj'],
      secondarySymptoms: ['bezsennosc_wczesna', 'spadek_masy', 'spowolnienie'],
      labTsh: 2.1,
      labSodium: 141,
      differential: 'MDD z cechami melancholicznymi po wykluczeniu niedoczynności tarczycy',
    },
  },
  'bipolar-timeline-001': {
    id: 'bipolar-timeline-001',
    title: 'Oś czasu nastroju: Wykrycie epizodu hipomanii',
    tab: 'diagnostic',
    patientSummary: '26-letnia pacjentka z nawracającymi depresjami i niezgłaszanym dotąd okresem wzmożonego napędu.',
    data: {
      lessonId: 'mania-hipomania-spektrum',
      timelineEvents: [
        { age: 22, type: 'depresja', durationMonths: 4 },
        { age: 24, type: 'hipomania_niezauwazona', durationDays: 5, sleepNeedHours: 3.5, excessiveSpending: true },
        { age: 26, type: 'depresja_aktualna', durationMonths: 2, antidepressantTriggeredAgitation: true },
      ],
      classification: 'ChAD typu II (bipolar II) — ryzyko inwersji fazy po SSRI',
    },
  },
  'ocd-cstc-preset-001': {
    id: 'ocd-cstc-preset-001',
    title: 'Pętla CSTC: Natręctwa myciowe i wątpliwości',
    tab: 'diagnostic',
    patientSummary: '29-letni mężczyzna z rytuałami sprawdzania pochłaniającymi 4h na dobę.',
    data: {
      lessonId: 'ocd-i-petla-cstc',
      ybocsScore: 28,
      predominantObsession: 'Skażenie i przeniesienie zarazków',
      compulsion: 'Mycie dłoni wg ścisłego schematu, sprawdzanie kurków gazu',
      insightLevel: 'Zachowany (pacjent uznaje natręctwa za irracjonalne)',
    },
  },
  'adhd-adult-preset-001': {
    id: 'adhd-adult-preset-001',
    title: 'Wywiad DIVA-5: ADHD u osoby dorosłej',
    tab: 'diagnostic',
    patientSummary: '38-letni analityk z przewlekłą prokrastynacją i dysfunkcją wykonawczą.',
    data: {
      lessonId: 'adhd-dorosli-i-rozwojowe',
      childhoodOnsetConfirmed: true,
      inattentionSymptomsCount: 7,
      hyperactivityImpulsivityCount: 4,
      settingsAffected: ['praca', 'dom', 'finanse'],
    },
  },
};
