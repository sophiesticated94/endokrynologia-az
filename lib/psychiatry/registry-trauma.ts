import type { PsychiatryLessonId, PsychiatryLessonEnhancement } from './types.ts';

export const TRAUMA_ENHANCEMENTS_DATA: Partial<
  Record<PsychiatryLessonId, Omit<PsychiatryLessonEnhancement, 'lessonId' | 'experience'>>
> = {
  'trauma-neurobiologia-zagrozenia': {
    diagrams: [],
    inlineWidgets: [],
    recurringPatientId: 'thread-anna-ptsd',
    whatChangesYourMind: {
      knownFacts: ['Pobudzenie adrenergiczne', 'Uczucie zamarcia (freeze/tonic immobility)'],
      unknownFactors: ['Czas trwania i odwracalność reakcji fizjologicznej'],
      criticalDifferentiatingFactor: 'Reakcja neurobiologiczna w trakcie ostrego zagrożenia jest ewolucyjną adaptacją przetrwaniową, a nie patologią psychiczną',
    },
    evidenceMode: 'clinical-framework',
  },

  'pamiec-traumatyczna-i-extinction': {
    diagrams: [],
    inlineWidgets: [],
    recurringPatientId: 'thread-anna-ptsd',
    whatChangesYourMind: {
      knownFacts: ['Silne warunkowanie lękowe', 'Unikanie bodźców skojarzonych'],
      unknownFactors: ['Zdolność hamowania lęku przez korę przedczołową'],
      criticalDifferentiatingFactor: 'Wygaszanie lęku nie usuwa śladu pamięciowego, lecz tworzy nowe hamujące połączenie korowo-ciałowate',
    },
    evidenceMode: 'clinical-framework',
  },

  'reakcja-na-stres-asr-vs-asd': {
    diagrams: [],
    inlineWidgets: [],
    recurringPatientId: 'thread-anna-ptsd',
    whatChangesYourMind: {
      knownFacts: ['Ostry stresor wypadkowy', 'Dysregulacja wegetatywna'],
      unknownFactors: ['Czas trwania objawów od ekspozycji'],
      criticalDifferentiatingFactor: 'Objawy <3 dni to ostra reakcja na stres (ASR wg ICD-11); ostre zaburzenie stresowe (ASD) wymaga 3 dni do 1 miesiąca',
    },
    evidenceMode: 'clinical-framework',
  },

  'ptsd-kryteria-i-fenomenologia': {
    diagrams: [],
    inlineWidgets: [],
    recurringPatientId: 'thread-anna-ptsd',
    whatChangesYourMind: {
      knownFacts: ['Koszmary senne i intruzje', 'Unikanie i wzmożona czujność'],
      unknownFactors: ['Poczucie tożsamości i relacje interpersonalne'],
      criticalDifferentiatingFactor: 'Klasyczne PTSD cechuje triada intruzji, unikania i wzmożonej czujności bez koniecznych zmian obrazu siebie (DSO)',
    },
    evidenceMode: 'clinical-framework',
  },

  'cptsd-zlozone-ptsd-icd11': {
    diagrams: [],
    inlineWidgets: [],
    recurringPatientId: 'thread-anna-ptsd',
    whatChangesYourMind: {
      knownFacts: ['Triada PTSD', 'Poczucie bezwartościowości i trudności relacyjne'],
      unknownFactors: ['Charakter urazu (jednorazowy vs powtarzalny/przewlekły)'],
      criticalDifferentiatingFactor: 'cPTSD w ICD-11 wymaga triady PTSD oraz 3 cech dysregulacji self (afektywnej, tożsamościowej i relacyjnej)',
    },
    evidenceMode: 'clinical-framework',
  },

  'spektrum-dysocjacji-kontinuum': {
    diagrams: [],
    inlineWidgets: [],
    recurringPatientId: 'thread-michal-dpdr',
    whatChangesYourMind: {
      knownFacts: ['Chwilowe zagapienie vs odcięcie od ciała'],
      unknownFactors: ['Wpływ na funkcjonowanie i obecność amnezji'],
      criticalDifferentiatingFactor: 'Dysocjacja normatywna (absorpcja) nie powoduje amnezji codziennej ani rozbicia tożsamości',
    },
    evidenceMode: 'clinical-framework',
  },

  'depersonalizacja-i-derealizacja': {
    diagrams: [],
    inlineWidgets: [],
    recurringPatientId: 'thread-michal-dpdr',
    whatChangesYourMind: {
      knownFacts: ['Świat wydaje się sztuczny/filmowy', 'Poczucie obcości rąk'],
      unknownFactors: ['Ocena rzeczywistości (reality testing)'],
      criticalDifferentiatingFactor: 'W zaburzeniu DPDR testowanie rzeczywistości jest w pełni nienaruszone — pacjent wie, że to tylko subiektywne wrażenie',
    },
    evidenceMode: 'clinical-framework',
  },

  'amnezja-dysocjacyjna-i-fuga': {
    diagrams: [],
    inlineWidgets: [],
    recurringPatientId: 'thread-elena-did',
    whatChangesYourMind: {
      knownFacts: ['Luka pamięciowa dotycząca trudnych zdarzeń'],
      unknownFactors: ['Pamięć procedur i wiedzy ogólnej semantycznej'],
      criticalDifferentiatingFactor: 'Amnezja dysocjacyjna dotyczy pamięci epizodyczno-autobiograficznej przy nienaruszonej pamięci semantycznej i proceduralnej',
    },
    evidenceMode: 'clinical-framework',
  },

  'did-tozsamosc-i-rozszczepienie': {
    diagrams: [],
    inlineWidgets: [],
    recurringPatientId: 'thread-elena-did',
    whatChangesYourMind: {
      knownFacts: ['Doświadczenie wewnętrznych głosów', 'Zmienne zachowania'],
      unknownFactors: ['Nawracające luki w pamięci autobiograficznej codziennych zdarzeń'],
      criticalDifferentiatingFactor: 'Rozpoznanie DID bezwzględnie wymaga nieciągłości tożsamości/sprawczości ORAZ nawracających luk pamięci autobiograficznej',
    },
    evidenceMode: 'clinical-framework',
  },

  'did-roznicowanie-bpd-i-psychoza': {
    diagrams: [],
    inlineWidgets: [],
    recurringPatientId: 'thread-elena-did',
    whatChangesYourMind: {
      knownFacts: ['Głosy w głowie', 'Niestabilność emocjonalna'],
      unknownFactors: ['Urojenia ksobne vs zachowany krytycyzm w stanie neutralnym'],
      criticalDifferentiatingFactor: 'Głosy same w sobie nie dowodzą psychozy; brak urojeniowego systemu interpretacji i obecność amnezji różnicują DID od schizofrenii',
    },
    evidenceMode: 'clinical-framework',
  },

  'osobowosc-icd11-wymiary': {
    diagrams: [],
    inlineWidgets: [],
    recurringPatientId: 'thread-karolina-bpd',
    whatChangesYourMind: {
      knownFacts: ['Trudności w relacjach i w pracy'],
      unknownFactors: ['Stopień uogólnionego zaburzenia funkcjonowania Self i Interpersonalnego'],
      criticalDifferentiatingFactor: 'ICD-11 ocenia najpierw globalny stopień nasilenia zaburzenia (łagodne, umiarkowane, ciężkie), a dopiero potem domeny cech',
    },
    evidenceMode: 'clinical-framework',
  },

  'borderline-bpd-mechanizmy': {
    diagrams: [],
    inlineWidgets: [],
    recurringPatientId: 'thread-karolina-bpd',
    whatChangesYourMind: {
      knownFacts: ['Lęk przed odrzuceniem', 'Samouszkodzenia w kryzysie'],
      unknownFactors: ['Obecność odrębnych stanów tożsamości z amnezją'],
      criticalDifferentiatingFactor: 'Niestabilność tożsamości w BPD nie tworzy odrębnych stanów alterów z nawracającą amnezją autobiograficzną',
    },
    evidenceMode: 'clinical-framework',
  },

  'bpd-roznicowanie-cptsd-chad-adhd': {
    diagrams: [],
    inlineWidgets: [],
    recurringPatientId: 'thread-karolina-bpd',
    whatChangesYourMind: {
      knownFacts: ['Gwałtowne zmiany nastroju'],
      unknownFactors: ['Czas trwania zmian (godziny pod wpływem bodźca vs tygodnie autonomiczne)'],
      criticalDifferentiatingFactor: 'Afektywna labilność w BPD jest reaktywna na bodźce relacyjne w skali godzin, podczas gdy fazy w ChAD trwają tygodnie',
    },
    evidenceMode: 'clinical-framework',
  },

  'trauma-somatyka-mimiki-i-bezpieczenstwo': {
    diagrams: [],
    inlineWidgets: [],
    recurringPatientId: 'thread-tomasz-tle',
    whatChangesYourMind: {
      knownFacts: ['Krótkie epizody odrealnienia z lękiem'],
      unknownFactors: ['Aura nadbrzuszna, automatyzmy ruchowe, czas trwania dokładnie 30–60 sekund'],
      criticalDifferentiatingFactor: 'Stereotypowe 30-sekundowe napady z aurą nadbrzuszną i automatyzmami wymagają weryfikacji neurologicznej w kierunku padaczki skroniowej',
    },
    evidenceMode: 'safety-context',
  },

  'psychoterapia-traumy-fazy-i-metody': {
    diagrams: [],
    inlineWidgets: [],
    recurringPatientId: 'thread-anna-ptsd',
    whatChangesYourMind: {
      knownFacts: ['Objawy PTSD', 'Gotowość do przepracowania traumy'],
      unknownFactors: ['Stabilność emocjonalna i brak czynnych zachowań zagrażających'],
      criticalDifferentiatingFactor: 'Przetwarzanie traumy (TF-CBT/EMDR) wymaga uprzedniej stabilizacji i zdolności regulacji afektu bez ucieczki w amnezję lub samouszkodzenia',
    },
    evidenceMode: 'clinical-framework',
  },

  'dbt-interwencja-kryzysowa-i-bezpieczenstwo': {
    diagrams: [],
    inlineWidgets: [],
    recurringPatientId: 'thread-karolina-bpd',
    whatChangesYourMind: {
      knownFacts: ['Nawracające akty autoagresji'],
      unknownFactors: ['Hierarchia celów terapeutycznych w DBT'],
      criticalDifferentiatingFactor: 'W DBT zachowania zagrażające życiu mają bezwzględny priorytet przed analizą traumy i innymi celami terapii',
    },
    evidenceMode: 'safety-context',
  },
};
