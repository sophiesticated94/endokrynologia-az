import type { PatientThreadState, ThreadEvent, CounterfactualBranch } from './types.ts';

export const PATIENT_THREADS: Record<string, PatientThreadState> = {
  'thread-bipolar-spectrum': {
    threadId: 'thread-bipolar-spectrum',
    patientName: 'Dorota K.',
    age: 26,
    sex: 'K',
    timelinePoint: 'Epizod depresyjny → ujawnienie hipomanii → ChAD II → stabilizator litu',
    establishedDiagnoses: ['Zaburzenie afektywne dwubiegunowe typu II (ChAD II wg DSM-5-TR / ICD-11)'],
    activeMedications: ['Węglan litu 750 mg/d'],
    knownSensitivities: ['Zła tolerancja monoterapii SSRI (niepokój, bezsenność)'],
    keyHistoryFacts: [
      'W wieku 24 lat 5-dniowy epizod hipomanii: zmniejszona potrzeba snu (3h/dobę bez zmęczenia), natłok myśli, nadmierne wydatki',
      'Wywiad rodzinny dodatni w kierunku ChAD u ciotki pacjentki',
    ],
    smoking: false,
    eGfr: 92,
  },

  'thread-psychosis-trs': {
    threadId: 'thread-psychosis-trs',
    patientName: 'Jakub M.',
    age: 21,
    sex: 'M',
    timelinePoint: 'Debiut psychotyczny → lekooporność (TRS) → klozapina → zmiana palenia tytoniu',
    establishedDiagnoses: ['Schizofrenia paranoidalna lekooporna (TRS)'],
    activeMedications: ['Klozapina 350 mg/d'],
    knownSensitivities: ['Akatyzja po częściowych agonistach D2 w dawkach średnich'],
    keyHistoryFacts: [
      'Nieskuteczność dwóch pełnych kuracji neuroleptykami II generacji w dawkach terapeutycznych przez min. 6 tygodni',
      'Palacz tytoniu (15 papierosów/d): wysoka aktywność CYP1A2, spadek stężenia klozapiny przy paleniu',
    ],
    smoking: true,
    eGfr: 95,
  },

  'thread-anxiety-dependence': {
    threadId: 'thread-anxiety-dependence',
    patientName: 'Anna W.',
    age: 34,
    sex: 'K',
    timelinePoint: 'Lęk napadowy → włączenie SSRI z aktywacją → uzależnienie od BZD → protokół Ashton',
    establishedDiagnoses: ['Zespół lęku napadowego (Panic Disorder)', 'Zespół uzależnienia od benzodiazepin (alprazolam)'],
    activeMedications: ['Sertralina 100 mg/d', 'Diazepam 15 mg/d (w trakcie redukcji wg protokołu Ashton)'],
    knownSensitivities: ['Wczesna aktywacja lękowa i drżenie w pierwszych 10 dniach po SSRI'],
    keyHistoryFacts: [
      'Samodzielne eskalowanie doraźnego alprazolamu do 3 mg/dobę z powodu lęku z odbicia',
      'Stopniowa rotacja na diazepam o długim okresie półtrwania celem eliminacji wahań stężenia',
    ],
    smoking: false,
    eGfr: 88,
  },

  'thread-ocd-circuitry': {
    threadId: 'thread-ocd-circuitry',
    patientName: 'Michał P.',
    age: 29,
    sex: 'M',
    timelinePoint: 'Natręctwa myciowe (CSTC) → maksymalna dawka SSRI → częściowa odpowiedź → augmentacja SGA',
    establishedDiagnoses: ['Zaburzenie obsesyjno-kompulsyjne (OCD) o ciężkim nasileniu (Y-BOCS 28 pkt)'],
    activeMedications: ['Sertralina 200 mg/d', 'Arypiprazol 2.5 mg/d (augmentacja dopaminergiczna)'],
    knownSensitivities: ['Brak istotnych działań niepożądanych, dobra tolerancja serologiczna'],
    keyHistoryFacts: [
      'Rytuały sprawdzania i mycia pochłaniające powyżej 4 godzin na dobę',
      'Wymóg wyższych dawek i dłuższego czasu (10–12 tygodni) do osiągnięcia remisji w OCD',
    ],
    smoking: false,
    eGfr: 90,
  },
  'thread-helena-neurocog': {
    threadId: 'thread-helena-neurocog',
    patientName: 'Helena S.',
    age: 79,
    sex: 'K',
    timelinePoint: 'Łagodne zaburzenia pamięci epizodycznej (MCI) → progresja do otępienia (AD) → epizod BPSD w przebiegu ZUM',
    establishedDiagnoses: ['Łagodne zaburzenia poznawcze (amnestic MCI) w obserwacji'],
    activeMedications: ['Ramipryl 5 mg/d', 'Atorwastatyna 20 mg/d'],
    knownSensitivities: ['Zaparcia i sedacja po lekach przeciwhistaminowych'],
    keyHistoryFacts: [
      'Utrata pamięci świeżej od 18 miesięcy, zapominanie rozmów i terminów wizyt',
      'Funkcjonowanie w podstawowych czynnościach (ADL) zachowane, narastające trudności w IADL (finanse, leki)',
    ],
    smoking: false,
    eGfr: 54,
  },
  'thread-jan-delirium': {
    threadId: 'thread-jan-delirium',
    patientName: 'Jan B.',
    age: 82,
    sex: 'M',
    timelinePoint: 'Zabieg alloplastyki biodra → ostre hipoaktywne delirium → powrót do domu → podejrzenie otępienia nałożonego',
    establishedDiagnoses: ['Stan po alloplastyce stawu biodrowego', 'Nadciśnienie tętnicze'],
    activeMedications: ['Enoksaparyna 40 mg s.c.', 'Metoprolol ZOK 50 mg/d', 'Paracetamol 1g doraźnie'],
    knownSensitivities: ['Paradoksalne pobudzenie po midazolamie'],
    keyHistoryFacts: [
      'Doba 2 po operacji: senność w dzień, w nocy dezorientacja i próby wyrywania cewnika (falowanie objawów)',
      'Wstępnie mylnie uznany przez personel za „pooperacyjną depresję i apatię”',
    ],
    smoking: false,
    eGfr: 48,
  },
  'thread-marek-personality': {
    threadId: 'thread-marek-personality',
    patientName: 'Marek T.',
    age: 63,
    sex: 'M',
    timelinePoint: 'Zmiana osobowości i zanik empatii w 61 r.ż. → błędne rozpoznanie kryzysu/depresji → diagnostyka bvFTD',
    establishedDiagnoses: ['Początkowo: Epizod depresyjny z apatią; weryfikacja w kierunku wariantu behawioralnego FTD'],
    activeMedications: ['Escitalopram 10 mg/d (brak poprawy afektywnej)'],
    knownSensitivities: ['Brak uchwytnych objawów niepożądanych'],
    keyHistoryFacts: [
      'Od 2 lat postępujące odhamowanie, nietaktowne uwagi w towarzystwie, objadanie się słodyczami (hiperororalność)',
      'Brak poczucia choroby (anozognozja), orientacja autopsychiczna i allopsychiczna w testach przesiewowych w normie',
    ],
    smoking: false,
    eGfr: 82,
  },
};

export function applyThreadEvent(
  state: PatientThreadState,
  event: ThreadEvent,
): PatientThreadState {
  const next: PatientThreadState = {
    ...state,
    establishedDiagnoses: [...state.establishedDiagnoses],
    activeMedications: [...state.activeMedications],
    knownSensitivities: [...state.knownSensitivities],
    keyHistoryFacts: [...state.keyHistoryFacts],
  };

  switch (event.type) {
    case 'smoking_cessation':
      next.smoking = false;
      next.keyHistoryFacts.push(event.reason ? `Zaprzestanie palenia: ${event.reason}` : 'Zaprzestanie palenia tytoniu (spadek indukcji CYP1A2)');
      break;
    case 'smoking_resumption':
      next.smoking = true;
      next.keyHistoryFacts.push(`Wznowienie palenia tytoniu (${event.cigarettesPerDay ?? 15} papierosów/d)`);
      break;
    case 'hypomania_discovered':
      next.keyHistoryFacts.push(`Ujawnienie wywiadu hipomanii: ${event.details}`);
      if (!next.establishedDiagnoses.some(d => d.toLowerCase().includes('chad'))) {
        next.establishedDiagnoses.push('Zaburzenie afektywne dwubiegunowe typu II (ChAD II)');
      }
      break;
    case 'medication_started':
      if (!next.activeMedications.includes(event.medication)) {
        next.activeMedications.push(event.medication);
      }
      break;
    case 'medication_stopped':
      next.activeMedications = next.activeMedications.filter(
        m => !m.toLowerCase().includes(event.medication.toLowerCase()),
      );
      if (event.reason) {
        next.keyHistoryFacts.push(`Odstawienie leku ${event.medication}: ${event.reason}`);
      }
      break;
    case 'diagnosis_updated':
      if (event.replacedDiagnosis) {
        next.establishedDiagnoses = next.establishedDiagnoses.filter(
          d => !d.toLowerCase().includes(event.replacedDiagnosis!.toLowerCase()),
        );
      }
      if (!next.establishedDiagnoses.includes(event.newDiagnosis)) {
        next.establishedDiagnoses.push(event.newDiagnosis);
      }
      break;
    case 'adverse_reaction':
      next.knownSensitivities.push(`${event.reaction} po ${event.drugCausing}`);
      break;
    case 'egfr_changed':
      next.eGfr = event.newEgfr;
      break;
  }

  return next;
}

export function createCounterfactualBranch(
  baseState: PatientThreadState,
  branch: CounterfactualBranch,
): { branchState: PatientThreadState; counterfactual: CounterfactualBranch } {
  return {
    branchState: {
      ...baseState,
      establishedDiagnoses: [...baseState.establishedDiagnoses],
      activeMedications: [...baseState.activeMedications],
      knownSensitivities: [...baseState.knownSensitivities],
      keyHistoryFacts: [...baseState.keyHistoryFacts, `[Kontrfaktycznie]: ${branch.alteredFact}`],
    },
    counterfactual: {
      alteredFact: branch.alteredFact,
      supports: [...branch.supports],
      arguesAgainst: [...branch.arguesAgainst],
      mostDiscriminatingNextStep: branch.mostDiscriminatingNextStep,
      invalidatedManagementSteps: [...branch.invalidatedManagementSteps],
    },
  };
}
