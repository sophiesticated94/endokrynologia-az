/** Qualitative teaching model. No dose-to-concentration or individual risk prediction. */
export type Gonads = 'testes' | 'ovaries';
export type GonadFunction = 'active' | 'impaired' | 'absent';
export type Blocker = 'none' | 'spiro' | 'cpa' | 'agonist' | 'antagonist' | 'fivear';
export type AtlasState = {
  gonads: Gonads; function: GonadFunction; uterus: boolean;
  hormone: 'none' | 'estradiol' | 'testosterone';
  route: 'oral' | 'transdermal' | 'injection'; blocker: Blocker;
  phase: 'early' | 'established';
  progesterone?: boolean;
  cycle?: 'follicular' | 'ovulatory' | 'luteal';
};
export const initialAtlas: AtlasState = {gonads:'testes', function:'active', uterus:false, hormone:'estradiol', route:'transdermal', blocker:'none', phase:'established'};
export const blockerLabels: Record<Blocker,string> = {none:'Bez dodatkowej blokady',spiro:'Spironolakton — receptor AR',cpa:'CPA — AR i gonadotropiny',agonist:'Agonista GnRH — efekt zależy od czasu',antagonist:'Antagonista GnRH — receptor przysadkowy',fivear:'Inhibitor 5α-reduktazy — T → DHT'};
export function describeAtlas(s: AtlasState) {
  const absent = s.function === 'absent';
  const impaired = s.function === 'impaired';
  const flare = s.blocker === 'agonist' && s.phase === 'early';
  const central = s.blocker === 'cpa' || s.blocker === 'antagonist' || (s.blocker === 'agonist' && !flare);
  const steroid = s.hormone !== 'none';
  const arBlocked = s.blocker === 'spiro' || s.blocker === 'cpa';
  const gonadal = absent ? 'Brak produkcji gonadalnej' : impaired ? 'Ograniczona rezerwa; odpowiedź zmienna' : central ? 'Produkcja hamowana przez spadek gonadotropin' : flare ? 'Możliwy przejściowy wzrost produkcji' : steroid ? 'Możliwe hamowanie produkcji przez sprzężenie zwrotne' : 'Produkcja endogenna czynnych gonad';
  const cycling = s.gonads === 'ovaries' && !absent && !impaired && !steroid && s.blocker === 'none' && !s.progesterone;
  const positiveFeedback = cycling && s.cycle === 'ovulatory';
  const feedback = positiveFeedback ? 'Utrzymany przedowulacyjny wzrost E2 może wyzwolić dodatnie sprzężenie i wyrzut LH' : flare ? 'Możliwy początkowy wyrzut LH/FSH (flare)' : central ? 'LH/FSH hamowane farmakologicznie' : steroid || s.progesterone ? 'Ujemne sprzężenie od hormonu egzogennego; stopień supresji zmienny' : absent || impaired ? 'Utrata sprzężenia: tendencja do wzrostu LH/FSH przy sprawnej przysadce' : cycling && s.cycle === 'luteal' ? 'Progesteron i E2 ciałka żółtego uczestniczą w ujemnym sprzężeniu' : 'Regulacja fizjologiczna; w jajnikach zależna od fazy cyklu';
  const notes = [
    'Nadnercza i przemiany obwodowe pozostają aktywne po gonadektomii. Ich udział nie zastępuje automatycznie odpowiedniej substytucji.',
    absent ? 'Brak gonad jest trwałą zmianą anatomii. Wzrost LH nie odtworzy gonadalnej produkcji hormonów.' : 'Farmakologiczne hamowanie gonad nie jest ich usunięciem. Odzyskanie czynności po zmianie leczenia jest indywidualne.',
  ];
  if (absent && !steroid) notes.push('Brak egzogennego hormonu przy braku gonad: oceń objawy niedoboru i zdrowie kości. Model nie określa czasu do utraty masy kostnej.');
  if (absent && central) notes.push('Po usunięciu gonad supresja LH/FSH nie hamuje nieistniejącej produkcji gonadalnej. Ponownie oceń wskazanie do leku.');
  if (s.gonads === 'ovaries' && !absent && s.uterus && s.hormone === 'testosterone') notes.push('Testosteron i brak miesiączki nie są antykoncepcją. Możliwa jest owulacja i ciąża.');
  if (s.gonads === 'ovaries' && !s.uterus && !absent) notes.push('Brak macicy nie oznacza braku czynności jajników. Nie można oceniać jej na podstawie krwawienia.');
  if (s.uterus && s.hormone === 'estradiol') notes.push('Przy zachowanym endometrium systemowy estrogen wymaga oceny potrzeby ochrony endometrium; atlas nie modeluje schematu progestagenu.');
  if (s.blocker === 'cpa') notes.push('CPA: ekspozycja skumulowana ma znaczenie dla ryzyka oponiaka. Prolaktyna nie jest badaniem przesiewowym w kierunku oponiaka.');
  if (s.blocker === 'spiro') notes.push('Spironolakton: oceniaj potas, funkcję nerek, ciśnienie i interakcje. Blokada AR nie jest równoważna określonemu spadkowi T.');
  if (s.hormone === 'testosterone') notes.push('Oceniaj morfologię i rzeczywisty hematokryt. Nie można przewidzieć Hct ani zakrzepicy z samej dawki testosteronu.');
  if (s.progesterone) notes.push('Progesteron nie jest automatycznym składnikiem feminizującej GAHT. Ograniczone dowody nie pozwalają obiecać większego rozwoju piersi. Ochrona endometrium to odrębne wskazanie.');
  if (s.hormone !== 'none' && s.route === 'injection') notes.push('Iniekcja: interpretuj badanie według preparatu i czasu od podania. Szczyt i dołek nie są zamienne; atlas nie wylicza ich wysokości.');
  if (s.hormone !== 'none' && s.route === 'transdermal') notes.push('Droga przezskórna: wchłanianie jest zmienne, zależne od preparatu i aplikacji. Unikaj zanieczyszczenia miejsca pobrania żelem.');
  return {
    gonadal, feedback, absent, central, flare, arBlocked, positiveFeedback,
    progesterone: s.progesterone ? 'Źródło egzogenne; działanie przez PR, możliwa modulacja osi' : cycling && s.cycle === 'luteal' ? 'Progesteron z ciałka żółtego po owulacji' : absent ? 'Brak źródła gonadalnego; pozostaje niewielki udział pozagonadalny' : 'Produkcja zależna od czynności gonad i owulacji; nie wynika z samej obecności jajników',
    inhibin: absent ? 'Brak gonadalnej inhibiny; znika jej hamowanie FSH' : impaired ? 'Inhibina może być obniżona; zależy od czynności gonad' : 'Inhibina reguluje głównie FSH; nie jest kopią sprzężenia LH',
    testosterone: s.hormone === 'testosterone' ? 'Źródło egzogenne + ewentualna produkcja endogenna' : s.gonads === 'testes' && !absent ? gonadal : absent ? 'Prekursory nadnerczowe i konwersja obwodowa; brak udziału gonad' : 'Prekursory nadnerczowe, konwersja obwodowa i udział jajników',
    estradiol: s.hormone === 'estradiol' ? 'Źródło egzogenne + aromatyzacja obwodowa' : s.hormone === 'testosterone' ? 'Aromatyzacja egzogennego T pozostaje możliwa także bez jajników' : s.gonads === 'ovaries' && !absent ? gonadal : 'Konwersja obwodowa; stężenia wymagają pomiaru',
    dht: s.blocker === 'fivear' ? 'Konwersja T → DHT hamowana; AR nie jest bezpośrednio blokowany' : 'T → DHT przez 5α-reduktazę w tkankach',
    receptor: arBlocked ? 'Działanie na AR hamowane; stężenie T nie opisuje całej blokady' : 'T i DHT działają na AR; E2 na receptory estrogenowe',
    shbg: s.hormone === 'estradiol' && s.route === 'oral' ? 'Doustny E2 może zwiększać SHBG przez wpływ wątrobowy; wielkość zmienna' : 'SHBG i albumina wiążą hormony; stężenie całkowite ≠ frakcja wolna',
    fertility: absent ? 'Brak produkcji gamet przez usunięte gonady; znaczenie mają wcześniej zabezpieczone gamety' : 'Nie da się ustalić płodności z procentu supresji osi ani samego T/E2',
    notes,
  };
}

export const atlasTimeline = [
  {label:'Godziny i dni',text:'Podanie, wchłanianie i eliminacja zależą od preparatu. Zaznacz moment pobrania krwi względem iniekcji lub aplikacji. Jedna próbka nie opisuje całego profilu.'},
  {label:'Tygodnie',text:'Sprzężenia i odpowiedź gonad dostosowują się do terapii. Agonista GnRH może początkowo pobudzać oś, a następnie ją hamuje; antagonista nie wymaga takiego początkowego pobudzenia.'},
  {label:'Miesiące i lata',text:'Efekty tkankowe rozwijają się z różną szybkością. Głos po testosteronie może zmienić się trwale; estrogen nie cofa automatycznie wcześniejszych zmian krtani. Nie przewidujemy wyglądu z poziomu hormonu.'},
];
