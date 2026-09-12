import type { ClinicalCase } from './cases-psychiatry-builder.ts';
import { makeFlexibleCase } from './cases-psychiatry-builder.ts';

export const psychiatryCasesPart2b: ClinicalCase[] = [
  // 19. BZD Tapering wg Ashton - Kontynuacja Wątku C (Anna W., uzależnienie)
  makeFlexibleCase(
    'benzodiazepiny-leki-z-tapering',
    'Pułapka alprazolamu i redukcja wg protokołu Ashton (Wątek C)',
    'Anna W., 35 lat',
    'Zaawansowany',
    'Rok po debiucie lęku napadowego Anna przyjmuje alprazolam w dawce 3 mg/dobę (1 mg co 8h). Każda próba pominięcia dawki wywołuje lęk z odbicia, drżenie, tachykardię i bezsenność.',
    [
      {
        stage: 'Identyfikacja zespołu uzależnienia od benzodiazepin',
        context: 'Anna zgłasza, że początkowa dawka 0,5 mg przestała działać po 4 tygodniach, co zmusiło ją do stopniowej eskalacji dawki do 3 mg/dobę, by uniknąć porannych objawów abstynencyjnych.',
        prompt: 'Które zjawisko farmakologiczne odpowiada za konieczność zwiększania dawki alprazolamu przy przewlekłym stosowaniu?',
        choices: [
          ['Tolerancja farmakodynamiczna wynikająca z internalizacji receptorów GABA-A i odsprzężenia miejsca wiążącego benzodiazepiny', 'Długotrwała stymulacja kompleksem GABA-A prowadzi do down-regulacji receptorów i adaptacji kanałów chlorkowych, co wywołuje tolerancję i zespół odstawienny.'],
          ['Indukcja wątrobowych enzymów mikrosomalnych przyspieszająca klirens', 'Dla większości benzodiazepin tolerancja ma charakter farmakodynamiczny (adaptacja receptorów GABA-A), a nie farmakokinetyczny.'],
          ['Autoimmunologiczne blokowanie transporterów GABA', 'Mechanizm dotyczy modulacji allosterycznej i internalizacji podjednostek receptora GABA-A, nie procesów autoimmunologicznych.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Zasady protokołu prof. Heather Ashton',
        context: 'Anna chce bezpiecznie odstawić alprazolam bez groźnych napadów drgawkowych i lęku z odbicia.',
        prompt: 'Jaki jest fundamentalny pierwszy krok protokołu odstawiania benzodiazepin wg prof. Heather Ashton?',
        choices: [
          ['Stopniowa zamiana (substytucja) krótko działającego alprazolamu na równoważną dawkę długo działającego diazepamu, który zapewnia stabilne stężenie w osoczu', 'Diazepam ma długi okres półtrwania (20–100 h z aktywnymi metabolitami), co eliminuje gwałtowne wahania stężenia („górki i dołki”) typowe dla alprazolamu.'],
          ['Natychmiastowe odstawienie alprazolamu z dnia na dzień bez żadnej osłony', 'Nagłe odstawienie po przewlekłym stosowaniu 3 mg alprazolamu grozi stanem padaczkowym i majaczeniem odstawiennym.'],
          ['Zamiana alprazolamu na podwójną dawkę innego krótko działającego leku nasennego z grupy Z', 'Leki Z działają na te same podjednostki GABA-A i nie rozwiązują problemu uzależnienia.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Równoważnik dawek i tempo redukcji',
        context: 'Alprazolam 3 mg/dobę odpowiada w przybliżeniu dawce 60 mg diazepamu/dobę.',
        prompt: 'Jakie tempo redukcji dawki diazepamu jest bezpieczne i minimalizuje objawy abstynencyjne?',
        choices: [
          ['Powolna redukcja o 1–2 mg diazepamu co 1–2 tygodnie, dostosowywana elastycznie do samopoczucia pacjentki przez okres kilku miesięcy', 'Powolne tempo pozwala na stopniową resensytyzację receptorów GABA-A bez gwałtownej dysforii i drgawek.'],
          ['Zmniejszanie dawki o 50% co 2 dni', 'Zbyt szybka redukcja prowadzi do dekompensacji i porzucenia protokołu przez pacjenta.'],
          ['Natychmiastowe obniżenie dawki o 75% w pierwszym tygodniu i odstawienie w drugim', 'Zbyt agresywna redukcja wywołuje silny zespół z odbicia i drgawki; protokół Ashton zakłada powolne zmniejszanie dawki o 1–2 mg diazepamu co 1–2 tygodnie.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Follow-up i leczenie niefarmakologiczne',
        context: 'W trakcie redukcji diazepamu Anna ma wdrożoną psychoterapię CBT ukierunkowaną na radzenie sobie z napięciem.',
        prompt: 'Jaka jest rola równoległej psychoterapii poznawczo-behawioralnej podczas odstawiania benzodiazepin?',
        choices: [
          ['Pozwala wykształcić niefarmakologiczne strategie radzenia sobie z lękiem i zapobiega nawrotowi sięgania po leki uspokajające po zakończeniu detoksykacji', 'Połączenie protokołu Ashton z psychoterapią CBT daje ponad 80% wskaźnik trwałej abstynencji od benzodiazepin.'],
          ['Zastępuje konieczność redukcji dawek farmakologicznych', 'Psychoterapia nie zapobiegnie fizjologicznym objawom odstawienia bez stopniowego taperingu.'],
          ['Jest bezużyteczna do czasu pełnego zakończenia odstawiania', 'Wsparcie psychoterapeutyczne jest kluczowe w najtrudniejszych fazach redukcji dawki.'],
        ],
        answerIndex: 0,
      },
    ],
    { threadId: 'thread-anxiety-dependence', timeOffsetWeeks: 52 }
  ),

  // 20. ADHD Farmakoterapia u dorosłego
  makeFlexibleCase(
    'farmakoterapia-adhd-stymulanty',
    'Miareczkowanie metylofenidatu u dorosłego z ADHD',
    'Rafał M., 38 lat',
    'Zaawansowany',
    'Pacjent z potwierdzonym w badaniu DIVA-5 rozpoznaniem ADHD o postaci z przewagą deficytu uwagi rozpoczyna leczenie metylofenidatem o przedłużonym uwalnianiu.',
    [
      {
        stage: 'Mechanizm działania metylofenidatu w korze przedczołowej',
        context: 'Rafał pyta, dlaczego lek o działaniu stymulującym pomaga mu się uspokoić i skupić, zamiast wywoływać chaos.',
        prompt: 'Jak w modelu neurobiologicznym tłumaczy się paradoksalny efekt uspokajający i poprawę koncentracji po stymulantach w ADHD?',
        choices: [
          ['Metylofenidat blokuje nośniki DAT i NET, optymalizując ton dopaminergiczny i noradrenergiczny w korze przedczołowej (PFC), co wzmacnia sygnał istotny i wygasza szum neuronalny', 'Zgodnie z teorią Arnsten deficyt dopaminy i noradrenaliny w PFC osłabia bramkowanie uwagi; podniesienie ich stężenia do okna optymalnego przywraca kontrolę wykonawczą.'],
          ['Wywołuje uogólnioną supresję kory mózgowej poprzez mechanizm sedatywny GABA-A', 'Metylofenidat nie jest agonistą GABA-A; działa poprzez modulację katecholamin (dopaminy i noradrenaliny), optymalizując stosunek sygnału do szumu w PFC.'],
          ['Działa poprzez blokadę receptorów serotoninowych 5-HT2A w pniu mózgu', 'Głównym mechanizmem terapeutycznym w ADHD jest hamowanie wychwytu zwrotnego dopaminy i noradrenaliny (blokada DAT i NET), a nie antagonizm 5-HT2A.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Dobór formulacji i miareczkowanie dawki',
        context: 'Pacjent pracuje po 9 godzin dziennie i potrzebuje równego pokrycia uwagi przez cały dzień pracy.',
        prompt: 'Jaka postać farmaceutyczna metylofenidatu jest preferowana u dorosłych aktywnych zawodowo?',
        choices: [
          ['Preparat o zmodyfikowanym/przedłużonym uwalnianiu (np. OROS lub kapsułki o dwufazowym uwalnianiu) zapewniający stabilne działanie przez 8–12 godzin', 'Preparaty o przedłużonym uwalnianiu eliminują konieczność wielokrotnego zażywania tabletek w ciągu dnia i zmniejszają ryzyko wahań nastroju z odbicia.'],
          ['Wyłącznie postać o natychmiastowym uwalnianiu (IR) przyjmowana raz na dobę rano', 'Formulacje IR działają krótko (3–4 godziny), co przy dawkowaniu raz na dobę pozostawia pacjenta bez pokrycia uwagi przez większość dnia pracy.'],
          ['Podskórne iniekcje o powolnym uwalnianiu stosowane co 6 miesięcy', 'Metylofenidat u dorosłych podawany jest doustnie w formulacjach modyfikowanych o profilu dobowym.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Postępowanie w razie działań niepożądanych',
        context: 'Po zwiększeniu dawki metylofenidatu do 36 mg/d Rafał zgłasza spadek apetytu w ciągu dnia i suchość w ustach, ale jego skupienie w pracy jest znakomite.',
        prompt: 'Jaka interwencja behawioralno-dietetyczna jest zalecana przy spadku apetytu wywołanym stymulantami?',
        choices: [
          ['Spożywanie pożywnego, wysokobiałkowego śniadania przed zażyciem tabletki oraz kalorycznej kolacji po wygaśnięciu działania leku wieczorem', 'Przesunięcie głównych posiłków poza szczyt działania stymulanta zapobiega utracie masy ciała bez konieczności rezygnacji ze skutecznej dawki.'],
          ['Natychmiastowe odstawienie leku na stałe', 'Spadek apetytu jest częstym i możliwym do skompensowania działaniem niepożądanym.'],
          ['Natychmiastowe dołączenie cyproheptadyny jako stymulatora apetytu', 'Cyproheptadyna wykazuje działanie sedatywne i antycholinergiczne; w pierwszej kolejności zaleca się modyfikację pór posiłków.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Alternatywy niestymulujące',
        context: 'Rozważasz sytuację, w której u pacjenta z ADHD występują przeciwwskazania kardiologiczne do stymulantów (np. niekontrolowane nadciśnienie).',
        prompt: 'Jaki lek niestymulujący (selektywny inhibitor wychwytu zwrotnego noradrenaliny - NRI) jest zarejestrowany w terapii ADHD u dorosłych?',
        choices: [
          ['Atomoksetyna (selektywny inhibitor wychwytu zwrotnego noradrenaliny bez potencjału uzależniającego)', 'Atomoksetyna zwiększa stężenie noradrenaliny i dopaminy w korze przedczołowej bez działania euforyzującego w układzie nagrody.'],
          ['Haloperidol w kroplach', 'Neuroleptyk klasyczny pogorszy funkcje wykonawcze w ADHD.'],
          ['Alprazolam', 'Benzodiazepiny są przeciwwskazane w zaburzeniach funkcji wykonawczych.'],
        ],
        answerIndex: 0,
      },
    ]
  ),

  // 21. Wydłużenie QTc i kardiotoksyczność
  makeFlexibleCase(
    'bezpieczenstwo-kardiometaboliczne-qtc-prolaktyna',
    'Politerapia kardiologiczno-psychiatryczna i wydłużenie QTc',
    'Stanisław P., 68 lat',
    'Zaawansowany',
    'Mężczyzna po zawale serca przyjmujący amiodaron i metoprolol zgłasza się z powodu ciężkiego epizodu depresyjnego. Lekarz POZ włączył escitalopram w dawce 20 mg/d.',
    [
      {
        stage: 'Ocena spoczynkowego EKG i wzoru Fridericii',
        context: 'W kontrolnym EKG: tętno 56/min, surowy odstęp QT wynosi 510 ms. Wzór Fridericii (QTcF = QT / RR^(1/3)) wykazuje wartość 498 ms.',
        prompt: 'Jak ocenić to wydłużenie w kontekście ryzyka groźnych arytmii komorowych (Torsade de Pointes - TdP wg CredibleMeds)?',
        choices: [
          ['Wartość graniczna / znacznie wydłużona (>480 ms) przy jednoczesnym skojarzeniu dwóch leków o znanym ryzyku TdP (amiodaron + escitalopram) i bradykardii', 'Połączenie escitalopramu w maksymalnej dawce z amiodaronem stwarza skrajne ryzyko wielokształtnego częstoskurczu komorowego (TdP) i nagłego zgonu sercowego.'],
          ['Stan całkowicie bezpieczny, ponieważ QTcF nie przekroczyło 600 ms', 'Próg alarmowy dla interwencji kardiologicznej to ≥500 ms lub przyrost >60 ms od wartości wyjściowej; 498 ms wymaga pilnej modyfikacji.'],
          ['Wskazanie do dołączenia drugiego leku wydłużającego QT w celu sedacji', 'Dodawanie kolejnych leków o potencjale blokady hERG (np. hydroksyzyny czy lewomepromazyny) dramatycznie zwielokrotnia ryzyko TdP.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Korekta czynników elektrolitowych',
        context: 'Badania laboratoryjne wykazują stężenie potasu K+ 3,2 mmol/l oraz magnezu Mg2+ 0,65 mmol/l.',
        prompt: 'Dlaczego hipokaliemia i hipomagnezemia drastycznie nasilają ryzyko TdP przy lekach blokujących kanał hERG?',
        choices: [
          ['Niskie stężenie zewnątrzkomórkowego potasu nasila blokadę kanałów potasowych IKr przez leki i sprzyja powstawaniu wczesnych potencjałów następczych (EAD)', 'Utrzymanie stężenia potasu >4,0 mmol/l i magnezu >0,8 mmol/l jest kluczowym warunkiem ochrony przed arytmią komorową.'],
          ['Niskie stężenie potasu bezpośrednio indukuje trwały blok odnogi pęczka Hisa', 'Hipokaliemia przede wszystkim opóźnia repolaryzację komór poprzez wpływ na prąd IKr, sprzyjając wczesnym potencjałom następczym (EAD) i TdP.'],
          ['Wzrost stężenia potasu hamuje klirens wątrobowy leków przeciwdepresyjnych', 'Wpływ elektrolitowy dotyczy biofizyki kanałów jonowych w miocytach, a nie klirensu CYP450.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Wybór bezpiecznego leku przeciwdepresyjnego u pacjenta kardiologicznego',
        context: 'Należy natychmiast zamienić escitalopram na lek przeciwdepresyjny o minimalnym wpływie na repolaryzację komór serca.',
        prompt: 'Który lek przeciwdepresyjny posiada najniższy potencjał wydłużania odstępu QTc i najbogatsze dowody bezpieczeństwa po zawale serca (badanie SADHART)?',
        choices: [
          ['Sertralina (lub wortioksetyna / bupropion w zależności od profilu)', 'Sertralina została przebadana w dużym badaniu SADHART u pacjentów z ostrą chorobą wieńcową, wykazując profil neutralny dla rytmu serca i brak istotnego wydłużania QTc.'],
          ['Cytalopram w dawce 60 mg/d', 'Cytalopram jest lekiem o najwyższym znanym ryzyku wydłużania QTc wśród SSRI i ma ograniczenie dawki do 20 mg u seniorów.'],
          ['Amitryptylina w wysokiej dawce', 'Trójpierścieniowe leki przeciwdepresyjne (TLPD) silnie blokują kanały sodowe i potasowe, będąc przeciwwskazanymi po zawale serca.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Zalecenia kontrolne i telemetria',
        context: 'Po suplementacji potasu i zamianie na sertralinę wykonano kontrolne EKG po 7 dniach.',
        prompt: 'Jaki wynik kontrolnego QTcF pozwala na bezpieczną kontynuację leczenia w warunkach ambulatoryjnych?',
        choices: [
          ['Skrócenie QTcF do wartości <450 ms przy prawidłowym stężeniu potasu (K+ >4,0 mmol/l)', 'Normalizacja repolaryzacji i wyrównanie elektrolitowe potwierdzają zażegnanie ryzyka TdP.'],
          ['Brak zmian przy QTcF 540 ms', 'Wartość ≥500 ms wymaga natychmiastowej hospitalizacji i telemetrii.'],
          ['Stabilizacja QTcF na poziomie 520 ms bez objawów omdleniowych', 'Wartość QTcF ≥500 ms nadal niesie wysokie ryzyko TdP i wymaga modyfikacji leczenia pomimo braku omdleń w wywiadzie.'],
        ],
        answerIndex: 0,
      },
    ]
  ),

  // 22. Farmakogenetyka CYP2D6 (CPIC)
  makeFlexibleCase(
    'farmakogenetyka-cyp-pgx',
    'Toksyczność wenlafaksyny u wolnego metabolizatora CYP2D6',
    'Hanna T., 50 lat',
    'Zaawansowany',
    'Kobieta leczona z powodu depresji wenlafaksyną w standardowej dawce początkowej 75 mg/d już po 3 dniach zgłasza nie do zniesienia nudności, zawroty głowy, skoki ciśnienia do 180/105 mmHg i silne drżenie.',
    [
      {
        stage: 'Mechanizm farmakogenetyczny (Fenotyp CYP2D6 PM)',
        context: 'Wykonano badanie genotypowania izoenzymów cytochromu P450. Wynik: genotyp CYP2D6 *4/*4 (brak aktywności enzymatycznej - fenotyp Poor Metabolizer, PM).',
        prompt: 'Jak status wolnego metabolizatora CYP2D6 wpływa na losy wenlafaksyny w organizmie wg wytycznych CPIC?',
        choices: [
          ['Brak aktywnego enzymu drastycznie spowalnia przekształcanie wenlafaksyny w jej główny metabolit (O-demetylowenlafaksynę), prowadząc do wielokrotnie wyższego stężenia substancji macierzystej i nasilenia działań niepożądanych', 'U metabolizatorów PM ekspozycja na cząsteczkę macierzystą jest skrajnie wysoka nawet przy małych dawkach początkowych.'],
          ['Prowadzi do całkowitej niewrażliwości transporterów SERT i NET na lek w OUN', 'Genotyp metabolizatora dotyczy farmakokinetyki (klirensu wątrobowego), a nie powinowactwa do transporterów w synapsie.'],
          ['Zwiększa klirens nerkowy cząsteczki macierzystej z moczem', 'Zmniejszona aktywność CYP2D6 upośledza klirens metaboliczny wenlafaksyny, zwiększając ogólnoustrojową ekspozycję na lek.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Zjawisko fenokonwersji (Phenoconversion)',
        context: 'Lekarz zastanawia się, co mogłoby wywołać identyczny stan u osoby z prawidłowym genotypem (Normal Metabolizer, NM).',
        prompt: 'Jaki mechanizm lekowy prowadzi do fenokonwersji pacjenta NM w fenotypowy PM?',
        choices: [
          ['Jednoczesne podanie silnego inhibitora CYP2D6 (np. fluoksetyny, bupropionu lub paroksetyny), który blokuje czynny enzym', 'Fenokonwersja to zjawisko, w którym interakcja lekowa zmienia funkcjonalny metabolizm pacjenta niezależnie od jego wrodzonego genotypu.'],
          ['Zastosowanie silnego induktora enzymatycznego (np. dziurawca zwyczajnego lub karbamazepiny)', 'Induktory enzymatyczne obniżają stężenie leków, podczas gdy fenokonwersja w fenotyp PM wymaga silnej inhibicji enzymu (np. przez paroksetynę lub bupropion).'],
          ['Dieta wysokobiałkowa z całkowitą eliminacją węglowodanów', 'Nawyki żywieniowe nie blokują wybiórczo enzymu CYP2D6 w stopniu wywołującym pełną fenokonwersję.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Zalecenia terapeutyczne CPIC dla wenlafaksyny u CYP2D6 PM',
        context: 'Należy zmodyfikować farmakoterapię u Hanny zgodnie z wytycznymi CPIC / DPWG.',
        prompt: 'Jakie postępowanie rekomenduje konsensus CPIC u pacjenta z fenotypem CYP2D6 Poor Metabolizer przyjmującego wenlafaksynę?',
        choices: [
          ['Rozważenie zamiany na lek przeciwdepresyjny niemetabolizowany przez CYP2D6 (np. escitalopram, sertralina) lub znacząca redukcja dawki wenlafaksyny z monitorowaniem TDM', 'Wybór leku o alternatywnej drodze eliminacji (np. CYP2C19 dla escitalopramu) pozwala uniknąć toksyczności.'],
          ['Natychmiastowe potrojenie dawki wenlafaksyny do 225 mg/d', 'Zwiększenie dawki u metabolizatora PM grozi ciężkim zespołem serotoninowym i kryzą nadciśnieniową.'],
          ['Dołączenie silnego inhibitora CYP2D6 w celu stabilizacji metabolizmu', 'Inhibitor enzymu pogłębiłby zablokowanie szlaku eliminacji i doprowadził do jeszcze groźniejszej intoksykacji wenlafaksyną.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Praktyczne znaczenie TDM w farmakogenetyce',
        context: 'Przed włączeniem nowego leku planujesz kontrolę stężeń osoczowych.',
        prompt: 'Jaka jest rola terapeutycznego monitorowania stężeń leków (TDM) u pacjentów ze zmienionym genotypem CYP?',
        choices: [
          ['Umożliwia precyzyjne zweryfikowanie rzeczywistej ekspozycji organizmu na lek i metabolity, stanowiąc obiektywne potwierdzenie fenotypu farmakokinetycznego', 'TDM łączy dane genetyczne z realnym stanem pacjenta (uwzględniając dietę, wiek i leki współistniejące).'],
          ['TDM jest całkowicie zbędne, jeśli wykonano badanie genetyczne', 'Genotyp wskazuje jedynie na potencjał enzymatyczny, nie uwzględniając interakcji ani wydolności narządów.'],
          ['TDM pozwala przewidzieć wyłącznie genotyp pacjenta bez oceny stężenia leku', 'TDM mierzy rzeczywiste stężenie substancji we krwi (fenotyp funkcjonalny), nie identyfikując bezpośrednio wariantów allelicznych w DNA.'],
        ],
        answerIndex: 0,
      },
    ]
  ),

  // 23. TRD i Esketamina
  makeFlexibleCase(
    'interwencje-biologiczne-ect-rtms-ketamina',
    'Szybka synaptogeneza w depresji lekoopornej (TRD)',
    'Wojciech M., 45 lat',
    'Zaawansowany',
    'Nauczyciel z ciężką depresją lekooporną od 2 lat nie uzyskał poprawy po 4 kolejnych kuracjach lekami przeciwdepresyjnymi z różnych grup w pełnych dawkach i z augmentacją litem. Zgłasza nasilone myśli samobójcze.',
    [
      {
        stage: 'Kwalifikacja do depresji lekoopornej (TRD)',
        context: 'Wojciech spełnia formalne kryteria TRD (niepowodzenie ≥2 kuracji o udokumentowanej adekwatności dawki i czasu trwania). Skala MADRS: 38 punktów.',
        prompt: 'Która nowoczesna interwencja biologiczna o mechanizmie glutaminergicznym wykazuje szybki (w ciągu godzin/dni) efekt przeciwdepresyjny i antysuicydalny?',
        choices: [
          ['Esketamina donosowa (antagonista receptora NMDA) podawana w certyfikowanym ośrodku medycznym w skojarzeniu z doustnym lekiem przeciwdepresyjnym', 'Esketamina blokuje receptory NMDA na interneuronach GABA-ergicznych, wywołując wyrzut glutaminianu, stymulację receptorów AMPA i kaskadę synaptogenezy zależną od BDNF/mTOR.'],
          ['Kolejna monoterapię lekiem SSRI w dawce minimalnej przez 2 dni', 'Kolejny SSRI w monoterapii po 4 nieskutecznych kuracjach ma poniżej 10% szans na powodzenie.'],
          ['Wdrożenie długotrwałej monoterapii benzodiazepiną w wysokiej dawce', 'Benzodiazepiny nie wykazują działania przeciwdepresyjnego ani pronuroplastycznego i nie stanowią leczenia przyczynowego TRD.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Mechanizm molekularny: receptor NMDA a BDNF/mTOR',
        context: 'Pacjent pyta, dlaczego esketamina działa znacznie szybciej niż dotychczasowe leki monoaminowe.',
        prompt: 'Jaki szlak neurobiologiczny odpowiada za szybką odbudowę kolców dendrytycznych w hipokampie i korze przedczołowej po podaniu esketaminy?',
        choices: [
          ['Aktywacja receptorów AMPA prowadzi do depolaryzacji, napływu wapnia i wydzielenia neurotrofiny BDNF, co aktywuje kinazę mTOR i indukuje syntezę białek synaptycznych w 24 godziny', 'Jest to tzw. hipoteza plastyczności glutaminergicznej, fundamentalnie odmienna od wolnej latencji monoaminowej.'],
          ['Trwałe zahamowanie syntezy BDNF i ekspresji receptorów TrkB', 'Esketamina w modelach przedklinicznych stymuluje, a nie hamuje szlak BDNF–TrkB–mTOR.'],
          ['Bezpośrednia blokada obwodowych receptorów beta-1 adrenergicznych', 'Mechanizm ten dotyczy układu krążenia i leków beta-adrenolitycznych, a nie ośrodkowego działania ketaminy.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Monitorowanie bezpieczeństwa po podaniu esketaminy',
        context: 'Po inhalacji esketaminy pacjent pozostaje pod bezpośrednią obserwacją personelu medycznego w ośrodku.',
        prompt: 'Jakie parametry życiowe i objawy przejściowe wymagają obowiązkowego monitorowania przez co najmniej 120 minut po podaniu leku?',
        choices: [
          ['Ciśnienie tętnicze krwi (ryzyko przejściowego skoku RR) oraz obecność objawów dysocjacyjnych i sedacji', 'Esketamina przejściowo podnosi ciśnienie tętnicze i może wywoływać zjawiska dysocjacji (depersonalizacja, derealizacja), które ustępują w ciągu 90–120 minut.'],
          ['Stężenie elektrolitów i gazometria tętnicza co 15 minut', 'Rutynowa inwazyjna diagnostyka gazometryczna nie jest wymagana u pacjentów bez ostrej niewydolności oddechowej.'],
          ['Seryjne badania EEG po każdej dawce', 'Choć ketamina wpływa na czynność bioelektryczną mózgu, rutynowe monitorowanie EEG nie jest zaleceniem porejestracyjnym przy podawaniu esketaminy.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Alternatywne metody niefarmakologiczne (ECT / rTMS)',
        context: 'Wojciech pyta o rolę terapii elektrowstrząsowej (ECT) w razie braku dostępności esketaminy.',
        prompt: 'Jaka jest skuteczność terapii elektrowstrząsowej (ECT) w ciężkiej depresji z bezpośrednim zagrożeniem życia lub objawami psychotycznymi?',
        choices: [
          ['ECT pozostaje najskuteczniejszą biologiczną metodą leczenia ciężkiej depresji z odsetkiem remisji sięgającym 70–85%', 'Wskazaniami pilnymi do ECT są: stupor depresyjny, odmowa przyjmowania płynów i pokarmów, wysokie ryzyko samobójcze oraz depresja psychotyczna oporna na farmakoterapię.'],
          ['ECT jest zarezerwowane wyłącznie dla pacjentów w śpiączce wątrobowej', 'ECT jest uznaną metodą leczenia ciężkich zaburzeń psychotycznych i afektywnych, nie encefalopatii wątrobowej.'],
          ['ECT wiąże się z brakiem jakichkolwiek działań niepożądanych poznawczych', 'ECT niesie ryzyko przemijających zaburzeń pamięci wstecznej i następczej, co wymaga rzetelnej informacji i zgody pacjenta.'],
        ],
        answerIndex: 0,
      },
    ]
  ),

  // 24. Hiperprolaktynemia po neuroleptykach
  makeFlexibleCase(
    'profilaktyka-dzialan-niepozadanych',
    'Mlekotok i brak miesiączki u młodej kobiety na rysperydonie',
    'Karolina S., 24 lata',
    'Podstawowy',
    'Młoda kobieta leczona z powodzeniem rysperydonem w dawce 4 mg/d z powodu psychozy zgłasza brak miesiączki od 4 miesięcy oraz spontaniczny wyciek mleka z brodawek sutkowych (galactorrhea).',
    [
      {
        stage: 'Neuroanatomia osi podwzgórze-przysadka (Szlak guzkowo-lejkowy)',
        context: 'W badaniach laboratoryjnych stężenie prolaktyny wynosi 98 ng/ml (norma <25 ng/ml). Test ciążowy beta-hCG jest ujemny.',
        prompt: 'Który szlak dopaminergiczny odpowiada za fizjologiczne hamowanie uwalniania prolaktyny, a jego blokada przez neuroleptyk wywołuje hiperprolaktynemię?',
        choices: [
          ['Szlak guzkowo-lejkowy (tuberoinfundibular pathway) łączący podwzgórze z przysadką mózgową', 'Dopamina w szlaku guzkowo-lejkowym działa jako PIF (prolactin-inhibiting factor); blokada receptorów D2 w przednim płacie przysadki odhamowuje syntezę prolaktyny.'],
          ['Szlak mezokortykalny', 'Szlak mezokortykalny łączy VTA z korą przedczołową i odpowiada za napęd i funkcje poznawcze.'],
          ['Droga korowo-rdzeniowa', 'Droga korowo-rdzeniowa jest drogą piramidową regulującą ruchy dowolne mięśni szkieletowych.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Długoterminowe konsekwencje hipogonadyzmu',
        context: 'Karolina pyta, czy podwyższona prolaktyna niesie odległe konsekwencje zdrowotne poza zaburzeniami cyklu.',
        prompt: 'Jakie jest główne odległe powikłanie somatyczne przewlekłej hiperprolaktynemii i wtórnego hipogonadyzmu u młodych kobiet?',
        choices: [
          ['Spadek gęstości mineralnej kości prowadzący do wczesnej osteopenii i osteoporozy (z powodu przewlekłego niedoboru estrogenów)', 'Przewlekła supresja osi HPG przez prolaktynę obniża poziom estrogenów, co przyspiesza resorpcję kości i grozi złamaniami patologicznymi.'],
          ['Ostry zespół mielodysplastyczny', 'Prolaktyna nie wywołuje pierwotnej transformacji nowotworowej linii szpikowych.'],
          ['Przewlekła niewydolność kory nadnerczy', 'Hiperprolaktynemia wpływa supresyjnie na oś podwzgórze-przysadka-gonady (GnRH/LH/FSH), a nie na wydzielanie ACTH.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Różnice między lekami przeciwpsychotycznymi w uwalnianiu prolaktyny',
        context: 'Planujesz modyfikację leczenia przeciwpsychotycznego Karoliny.',
        prompt: 'Które leki przeciwpsychotyczne II i III generacji cechują się minimalnym wpływem na stężenie prolaktyny (leki oszczędzające prolaktynę)?',
        choices: [
          ['Arypiprazol (częściowy agonista D2), kwetiapina (szybka dysocjacja od receptora) lub olanzapina w małej dawce', 'Arypiprazol dzięki wewnętrznej aktywności agonisty D2 (~30%) stymuluje receptory w przysadce, obniżając stężenie prolaktyny nawet przy dołączeniu w małej dawce.'],
          ['Amisulpryd w dawce 800 mg/d', 'Amisulpryd, podobnie jak risperidon, słabo penetruje barierę krew-mózg i kumuluje się w przysadce, wywołując skrajną hiperprolaktynemię (>150 ng/ml).'],
          ['Haloperydol w iniekcjach domięśniowych', 'FGA silnie blokują receptory D2 i powodują wysoki wzrost prolaktyny.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Optymalizacja schematu leczenia',
        context: 'Stan psychiczny Karoliny jest w pełni stabilny. Zależy jej na utrzymaniu remisji psychozy i przywróceniu miesiączkowania.',
        prompt: 'Jaka strategia farmakologiczna jest najbardziej elegancka i skuteczna u pacjentki z hiperprolaktynemią na rysperydonie?',
        choices: [
          ['Stopniowa rotacja na arypiprazol LUB dołączenie małej dawki arypiprazolu (2,5–5 mg/d) do rysperydonu celem częściowego pobudzenia receptorów D2 w przysadce', 'Dołączenie małej dawki częściowego agonisty D2 skutecznie obniża prolaktynę bez konieczności rezygnacji ze sprawdzonego leku przeciwpsychotycznego.'],
          ['Rutynowe dołączenie bromokryptyny bez próby modyfikacji leczenia przeciwpsychotycznego', 'Agoniści dopaminy o silnym działaniu mogą destabilizować psychozę; preferuje się modyfikację neuroleptyku (rotację lub małą dawkę arypiprazolu).'],
          ['Natychmiastowe odstawienie wszystkich leków bez kontroli', 'Niesie ponad 70% ryzyko nawrotu ostrego epizodu psychotycznego w ciągu roku.'],
        ],
        answerIndex: 0,
      },
    ]
  ),
];
