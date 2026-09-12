export interface MicroCaseDefinition {
  title: string;
  vignette: string;
  question: string;
  options: string[];
  answer: number;
  rationales: string[];
}

export const PSYCHIATRY_MICRO_CASES: Record<string, MicroCaseDefinition> = {
  'microcase-boundary-disorder': {
    title: 'Różnicowanie: Borderline vs ChAD II',
    vignette: '24-letnia pacjentka zgłasza gwałtowne wahania nastroju w ciągu jednego dnia po kłótni z partnerem. Neguje wielodniowe okresy bezsenności z nadmiarem energii.',
    question: 'Która cecha fenotypowa najbardziej przemawia za zaburzeniem typu borderline (BPD)?',
    options: [
      'Reaktywność afektu na odrzucenie i dysforia trwająca godziny, a nie dni',
      'Poranne nasilenie objawów depresyjnych',
      'Zmniejszona potrzeba snu bez zmęczenia przez 5 dni',
    ],
    answer: 0,
    rationales: [
      'Prawidłowo! W BPD niestabilność nastroju ma charakter ultradobowy (reakcja na relacje), podczas gdy w ChAD faza hipomanii trwa autonomicznie min. 4 dni.',
      'Niepoprawnie: Poranne pogorszenie jest cechą zespołu melancholicznego.',
      'Niepoprawnie: To osiowy objaw hipomanii w ChAD.',
    ],
  },
  'microcase-delirium-tremens': {
    title: 'Stan nagły: Zespół majaczeniowy z odstawienia (DT)',
    vignette: '48-letni mężczyzna 48h po przerwaniu ciągu: drżenie grubofalowe, poty, tachykardia 128/min, iluzje wzrokowe na ścianach.',
    question: 'Jaki jest lek pierwszego rzutu w celu zapobieżenia drgawkom i zgonowi?',
    options: [
      'Haloperidol i.m. w monoterapii',
      'Diazepam i.v. / p.o. miareczkowany według skali CIWA-Ar',
      'Karbamazepina p.o.',
    ],
    answer: 1,
    rationales: [
      'Niepoprawnie: Haloperidol obniża próg drgawkowy i nie zapobiega zgonowi w DT.',
      'Prawidłowo! Benzodiazepiny o długim czasie półtrwania (diazepam) są lekiem z wyboru w celu kontroli pobudzenia i profilaktyki drgawek.',
      'Niepoprawnie: Karbamazepina nie jest lekiem pierwszego rzutu w ostrym majaczeniu.',
    ],
  },
  'microcase-acute-agitation-deescalation': {
    title: 'Postępowanie: Ostre pobudzenie psychoruchowe',
    vignette: '28-letni pacjent pobudzony, podejrzliwy, głośno krzyczący na izbie przyjęć, bez bezpośredniej agresji fizycznej.',
    question: 'Jaki krok postępowania zalecają wytyczne bezpieczeństwa jako pierwszy?',
    options: [
      'Natychmiastowe unieruchomienie pasami bez uprzedzenia',
      'Deeskalacja słowna, bezpieczny dystans i zaoferowanie leczenia doustnego',
      'Iniekcja domięśniowa leku I generacji z zaskoczenia',
    ],
    answer: 1,
    rationales: [
      'Niepoprawnie: Przymus bezpośredni to ostateczność przy bezpośrednim zagrożeniu.',
      'Prawidłowo! Deeskalacja słowna, ograniczenie bodźców i dobrowolny lek doustny to fundament bezpiecznego postępowania.',
      'Niepoprawnie: Zwiększa ryzyko eskalacji agresji i powikłań urazowych.',
    ],
  },
  'microcase-bupropion-mirtazapine-choice': {
    title: 'Dobór leku: Anhedonia i spowolnienie bez bezsenności',
    vignette: '39-letni pacjent z ciężką apatią, brakiem motywacji, spadkiem libido i zachowanym snem.',
    question: 'Który lek przeciwdepresyjny ma najbardziej adekwatny profil receptorowy?',
    options: [
      'Bupropion (NDRI — hamowanie wychwytu NA i DA)',
      'Mirtazapina (NASSA — wysoka sedacja H1 i wzrost apetytu)',
      'Paroksetyna (SSRI o silnym działaniu antycholinergicznym)',
    ],
    answer: 0,
    rationales: [
      'Prawidłowo! Bupropion aktywuje napęd dopaminergiczny i nie nasila sedacji ani dysfunkcji seksualnych.',
      'Niepoprawnie: Mirtazapina pogłębiłaby sedację i spowolnienie.',
      'Niepoprawnie: Paroksetyna niesie wysokie ryzyko dysfunkcji seksualnych i apatii.',
    ],
  },
  'microcase-p-gp-drug-interaction': {
    title: 'Bariera krew-mózg: Transport P-glikoproteiny (ABCB1)',
    vignette: 'Pacjent otrzymujący paliperidon (substrat P-gp) rozpoczyna terapię silnym inhibitorem P-gp (klarytromycyna / werapamil).',
    question: 'Jak zmieni się penetracja substratu do OUN?',
    options: [
      'Wzrośnie stężenie w mózgu w wyniku zablokowania aktywnego wypływu przez barierę K-M',
      'Spadnie penetracja z powodu zwiększonego klirensu nerkowego',
      'P-gp nie ma znaczenia klinicznego dla dystrybucji leków psychotropowych',
    ],
    answer: 0,
    rationales: [
      'Prawidłowo! P-gp działa jak pompa wyrzutowa z OUN do krwi. Jej inhibicja zwiększa stężenie leku w mózgu nawet przy stabilnym stężeniu w surowicy.',
      'Niepoprawnie: Blokada pompy wyrzutowej zwiększa ekspozycję mózgową.',
      'Niepoprawnie: P-gp jest kluczowym determinatorem stężenia leków w OUN.',
    ],
  },
  'microcase-metabolic-syndrome-monitoring': {
    title: 'Nadzór metaboliczny: Olanzapina',
    vignette: '26-letnia pacjentka przed włączeniem olanzapiny w pierwszym epizodzie psychozy.',
    question: 'Jaki jest zalecany schemat kontroli parametrów metabolicznych wg wytycznych?',
    options: [
      'Masa ciała co tydzień przez 6 tyg., lipidy i glikemia w 12. tygodniu, potem raz w roku',
      'Tylko jedno oznaczenie glikemii po roku terapii',
      'Brak konieczności badań laboratoryjnych u osób <30 roku życia',
    ],
    answer: 0,
    rationales: [
      'Prawidłowo! Monitorowanie wczesnego przyrostu masy ciała pozwala wychwycić pacjentów z grupy wysokiego ryzyka powikłań metabolicznych.',
      'Niepoprawnie: Roczna kontrola to za późno na prewencję ostrej dyslipidemii czy cukrzycy.',
      'Niepoprawnie: Młody wiek nie chroni przed metabolicznymi działaniami SGA.',
    ],
  },
};

export function getMicroCase(caseId: string): MicroCaseDefinition {
  return (
    PSYCHIATRY_MICRO_CASES[caseId] || {
      title: 'Mikro-przypadek decyzyjny',
      vignette: 'Pacjent w trakcie modyfikacji leczenia wymaga oceny ryzyka interakcji i weryfikacji kryteriów diagnostycznych.',
      question: 'Jaka jest kluczowa zasada bezpieczeństwa w tym scenariuszu klinicznym?',
      options: [
        'Stopniowe miareczkowanie dawki (start low, go slow) oraz weryfikacja interakcji enzymatycznych',
        'Równoczesne włączenie dwóch leków w dawkach maksymalnych',
        'Pominięcie kontroli laboratoryjnej przed osiągnięciem stanu stacjonarnego',
      ],
      answer: 0,
      rationales: [
        'Prawidłowo! Stopniowe miareczkowanie i nadzór farmakokinetyczny minimalizują ryzyko ostrych powikłań.',
        'Niepoprawnie: Zwiększa ryzyko działań niepożądanych i interakcji toksycznych.',
        'Niepoprawnie: Monitorowanie parametrów wyjściowych i stężenia leku jest niezbędne.',
      ],
    }
  );
}
