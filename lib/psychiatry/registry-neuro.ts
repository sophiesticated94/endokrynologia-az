import type { PsychiatryLessonId, PsychiatryLessonEnhancement } from './types.ts';

export const NEUROCOGNITIVE_ENHANCEMENTS_DATA: Partial<
  Record<PsychiatryLessonId, Omit<PsychiatryLessonEnhancement, 'lessonId' | 'experience'>>
> = {
  'delirium-rozpoznanie-i-dynamika': {
    diagrams: ['delirium-timeline'],
    inlineWidgets: ['4at-calculator'],
    workbenchPresetId: 'preset-delirium-jan-postop',
    caseId: 'case-delirium-rozpoznanie-i-dynamika',
    recurringPatientId: 'thread-jan-delirium',
    whatChangesYourMind: {
      knownFacts: ['Pobudzenie nocne', 'Wyrywanie kaniuli', 'Drobne omamy wzrokowe'],
      unknownFactors: ['Dobowa fluktuacja uwagi', 'Objawy w ciągu dnia w wywiadzie od pielęgniarek'],
      criticalDifferentiatingFactor: 'Nagły początek po operacji oraz falowanie czuwania i uwagi w dobie silnie przemawiają za majaczeniem (delirium), a nie psychozą pierwotną',
    },
    evidenceMode: 'validated-decision-rule',
  },

  'delirium-vs-otepienie-vs-depresja': {
    diagrams: ['delirium-dementia-matrix'],
    inlineWidgets: [],
    workbenchPresetId: 'preset-delirium-superimposed-jan',
    caseId: 'case-delirium-vs-otepienie-vs-depresja',
    recurringPatientId: 'thread-jan-delirium',
    whatChangesYourMind: {
      knownFacts: ['Ubytki pamięci świeżej', 'Zniechęcenie i odpowiedzi „nie wiem”'],
      unknownFactors: ['Poziom czujności i skupienia uwagi przy motywacji', 'Relacja bliskich o funkcjonowaniu w ostatnich 2 latach'],
      criticalDifferentiatingFactor: 'Zachowana uwaga i czujność przy braku dobowych fluktuacji odróżniają wczesne otępienie i depresję od ostrego majaczenia',
    },
    evidenceMode: 'clinical-framework',
  },

  'diagnostyka-ostrego-zaburzenia-swiadomosci': {
    diagrams: [],
    inlineWidgets: ['cause-hunt'],
    workbenchPresetId: 'preset-delirium-jan-postop',
    whatChangesYourMind: {
      knownFacts: ['Nagłe splątanie na oddziale chirurgicznym', 'Prawidłowa morfologia i CRP'],
      unknownFactors: ['Objętość moczu w pęcherzu (USG)', 'Ostatnio podane leki (np. opioidy, BZD)'],
      criticalDifferentiatingFactor: 'Ostre zatrzymanie moczu lub ból pooperacyjny mogą wyzwalać ciężkie majaczenie mimo prawidłowych badań krwi',
    },
    evidenceMode: 'safety-context',
  },

  'zaburzenia-poznawcze-mci-a-otepienie': {
    diagrams: [],
    inlineWidgets: [],
    workbenchPresetId: 'preset-helena-mci-early-ad',
    caseId: 'case-zaburzenia-poznawcze-mci-a-otepienie',
    recurringPatientId: 'thread-helena-neurocog',
    whatChangesYourMind: {
      knownFacts: ['Subiektywne skargi na pamięć', 'Wynik testu przesiewowego poniżej normy'],
      unknownFactors: ['Zdolność do samodzielnego opłacania rachunków i dawkowania leków (IADL)'],
      criticalDifferentiatingFactor: 'Utrata niezależności w złożonych czynnościach dnia codziennego (IADL) stanowi granicę między MCI a otępieniem',
    },
    evidenceMode: 'clinical-framework',
  },

  'choroba-alzheimera-wzorzec-i-progresja': {
    diagrams: ['hippocampal-network-progression'],
    inlineWidgets: [],
    workbenchPresetId: 'preset-helena-mci-early-ad',
    recurringPatientId: 'thread-helena-neurocog',
    whatChangesYourMind: {
      knownFacts: ['Powtarzanie pytań od 18 miesięcy', 'Podstępny początek'],
      unknownFactors: ['Zanik hipokampów w badaniu MRI (skala MTA)', 'Wpływ podpowiedzi na przypominanie słów'],
      criticalDifferentiatingFactor: 'Brak poprawy odtwarzania przy podpowiedziach semantycznych potwierdza deficyt konsolidacji hipokampalnej',
    },
    evidenceMode: 'clinical-framework',
  },

  'naczyniowe-zaburzenia-poznawcze-vad': {
    diagrams: ['neurocognitive-differential-map'],
    inlineWidgets: [],
    whatChangesYourMind: {
      knownFacts: ['Spowolnienie myślenia', 'Trudności w planowaniu i organizacji'],
      unknownFactors: ['Hiperintensywności istoty białej w MRI (skala Fazekas)', 'Obecność zaburzeń chodu i parć na mocz'],
      criticalDifferentiatingFactor: 'Zespół podkorowo-czołowy (spowolnienie + dysfunkcja wykonawcza) i chód magnetyczny wskazują na komponent naczyniowy',
    },
    evidenceMode: 'clinical-framework',
  },

  'otepienie-z-cialami-lewyego-i-parkinson': {
    diagrams: ['dlb-pathway'],
    inlineWidgets: [],
    workbenchPresetId: 'preset-dlb-hallucinations',
    caseId: 'case-otepienie-z-cialami-lewyego-i-parkinson',
    whatChangesYourMind: {
      knownFacts: ['Nawracające omamy wzrokowe postaci ludzi', 'Drżenie rąk i sztywność'],
      unknownFactors: ['Wywiad zaburzeń snu REM (odgrywanie marzeń sennych) sprzed lat'],
      criticalDifferentiatingFactor: 'Obecność cech parkinsonizmu i omamów wzrokowych bezwzględnie zakazuje stosowania klasycznych neuroleptyków (ryzyko śmiertelnej sztywności)',
    },
    evidenceMode: 'clinical-framework',
  },

  'otepienie-czolowo-skroniowe-bvftd': {
    diagrams: [],
    inlineWidgets: [],
    workbenchPresetId: 'preset-marek-bvftd',
    caseId: 'case-otepienie-czolowo-skroniowe-bvftd',
    recurringPatientId: 'thread-marek-personality',
    whatChangesYourMind: {
      knownFacts: ['Zanik taktu i wulgarne żarty', 'Prawidłowy wynik MMSE (29 pkt)'],
      unknownFactors: ['Utrata empatii i hiperororalność w wywiadzie od rodziny', 'Atrofia kory czołowej w MRI'],
      criticalDifferentiatingFactor: 'Nowa zmiana charakteru i norm moralnych po 55 r.ż. z brakiem empatii nakazuje diagnostykę kory czołowej (bvFTD), a nie depresji',
    },
    evidenceMode: 'clinical-framework',
  },

  'szybko-postepujace-zespoly-otepienne': {
    diagrams: [],
    inlineWidgets: ['neuro-clock'],
    workbenchPresetId: 'preset-autoimmune-encephalitis',
    caseId: 'case-szybko-postepujace-zespoly-otepienne',
    whatChangesYourMind: {
      knownFacts: ['Gwałtowny spadek poznawczy w 4 tygodnie', 'Nowe omamy słuchowe'],
      unknownFactors: ['Napad padaczkowy, dyskinezy ustno-twarzowe lub mioklonie w wywiadzie'],
      criticalDifferentiatingFactor: 'Dynamika w tygodnie i obecność napadów padaczkowych wykluczają typową chorobę Alzheimera i nakazują pilne wykluczenie zapalenia mózgu lub procesu prionowego',
    },
    evidenceMode: 'safety-context',
  },

  'bpsd-objawy-behawioralne-i-psychologiczne': {
    diagrams: [],
    inlineWidgets: ['bpsd-cause-hunt'],
    workbenchPresetId: 'preset-helena-bpsd-uti',
    caseId: 'case-bpsd-objawy-behawioralne-i-psychologiczne',
    recurringPatientId: 'thread-helena-neurocog',
    whatChangesYourMind: {
      knownFacts: ['Agresja fizyczna podczas zmiany bielizny', 'Krzyk wieczorny'],
      unknownFactors: ['Bolesność podbrzusza i wynik badania ogólnego moczu', 'Behawioralna ocena bólu stawów'],
      criticalDifferentiatingFactor: 'Wykrycie somatycznego źródła bólu lub infekcji (np. ZUM) pozwala opanować agresję bez ryzykownych neuroleptyków',
    },
    evidenceMode: 'safety-context',
  },

  'psychofarmakologia-wieku-podeszlego': {
    diagrams: ['anticholinergic-burden-consequences'],
    inlineWidgets: ['geriatric-med-review'],
    workbenchPresetId: 'preset-geriatric-polypharmacy',
    caseId: 'case-psychofarmakologia-wieku-podeszlego',
    whatChangesYourMind: {
      knownFacts: ['Nawracające upadki', 'Polifarmacja (9 leków)', 'Wieczorne splątanie'],
      unknownFactors: ['Łączny wskaźnik obciążenia antycholinergicznego (ACB) i stosowanie leków z grupy Z'],
      criticalDifferentiatingFactor: 'Wysoki wskaźnik ACB (>=3) i leki sedatywne są bezpośrednią, odwracalną przyczyną upadków i majaczenia u seniora',
    },
    evidenceMode: 'safety-context',
  },

  'depresja-wieku-podeszlego-i-poznanie': {
    diagrams: [],
    inlineWidgets: [],
    whatChangesYourMind: {
      knownFacts: ['Skargi somatyczne i zniechęcenie', 'Spowolnienie w testach pamięciowych'],
      unknownFactors: ['Myśli samobójcze i poczucie bycia ciężarem dla bliskich', 'Poprawa odtwarzania przy podpowiedziach'],
      criticalDifferentiatingFactor: 'Poprawa odtwarzania przy wskazówkach i postawa „nie wiem” sugerują komponent depresyjny, wymagając bezpiecznego leczenia SSRI (unikanie TLPD)',
    },
    evidenceMode: 'clinical-framework',
  },

  'zdolnosc-decyzyjna-capacity-i-safeguarding': {
    diagrams: [],
    inlineWidgets: ['capacity-evaluator'],
    whatChangesYourMind: {
      knownFacts: ['Diagnoza umiarkowanego otępienia', 'Odmowa proponowanego zabiegu'],
      unknownFactors: ['Zrozumienie, zatrzymanie, wyważenie konsekwencji i zakomunikowanie wyboru'],
      criticalDifferentiatingFactor: 'Diagnoza otępienia nie odbiera automatycznie zdolności decyzyjnej; pacjent może zachowywać capacity do konkretnej decyzji w danym czasie',
    },
    evidenceMode: 'clinical-framework',
  },
};
