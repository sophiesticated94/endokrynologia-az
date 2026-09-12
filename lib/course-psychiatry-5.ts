import { type DraftLesson, q } from './course-types.ts';

export const draftPsychiatryPart5: DraftLesson[] = [
  {
    id: 'delirium-rozpoznanie-i-dynamika',
    moduleId: 'psych-organiczne',
    title: 'Majaczenie (delirium): uwaga, fluktuacja i tempo początku',
    subtitle: 'Rozpoznawanie ostrego zespołu mózgowego, fenotypy hipo/hiperaktywne i kryteria osiowe',
    group: 'Ostre zaburzenia świadomości i zespoły poznawcze',
    minutes: 16,
    goals: [
      'Zidentyfikujesz kardynalne cechy majaczenia: ostry początek, falujący przebieg oraz zaburzenia uwagi i czuwania.',
      'Rozpoznasz postać hipoaktywną majaczenia, najczęściej myloną z depresją lub otępieniem.',
      'Zastosujesz ustrukturyzowane narzędzia oceny (4AT, CAM-ICU) jako zwalidowane wsparcie badania klinicznego.',
    ],
    sections: [
      {
        title: 'Osiowa triada majaczenia: tempo, fluktuacja i uwaga',
        text: 'Majaczenie (delirium) jest ostrym, potencjalnie odwracalnym zespołem zaburzeń funkcji mózgu wywołanym chorobą somatyczną, intoksykacją lub odstawieniem leków. Osiowymi cechami wg ICD-11 i DSM-5-TR są: 1) ostre lub podostre tempo rozwoju (godziny do kilku dni); 2) fluktuujący przebieg w ciągu doby (nasilenie w godzinach wieczornych i nocnych — sundowning); 3) zaburzenia uwagi (niezdolność do skupienia, utrzymania i przeniesienia uwagi) oraz czujności (arousal — od senności po patologiczne wzbudzenie).',
      },
      {
        title: 'Fenotypy ruchowe: pułapka postaci hipoaktywnej',
        text: 'Wyróżniamy trzy fenotypy majaczenia: hiperaktywne (pobudzenie, agresja, omamy, niepokój manipulacyjny — łatwo zauważalne), hipoaktywne (spowolnienie, apatia, patologiczna senność, ubóstwo wypowiedzi) oraz mieszane (najczęstsze w praktyce szpitalnej). Postać hipoaktywna występuje u ponad 50% chorych geriatrycznych i niesie najwyższą śmiertelność, ponieważ bywa błędnie interpretowana jako „zmęczenie pooperacyjne”, „żałoba” lub „depresja”.',
      },
      {
        title: 'Zjawiska psychotyczne w delirium a psychozy pierwotne',
        text: 'Złudzenia (iluzje) i omamy w delirium mają najczęściej charakter wzrokowy (zwierzęta, ruchome cienie, obcy ludzie w pokoju) lub dotykowy i towarzyszy im chwiejny, niespójny sąd realizujący. W przeciwieństwie do schizofrenii omamy w delirium występują na podłożu zaburzeń przytomności i uwagi, nasilają się przy słabym oświetleniu i szybko ustępują wraz z wyrównaniem stanu somatycznego.',
      },
    ],
    table: {
      headers: ['Fenotyp majaczenia', 'Obraz psychoruchowy', 'Typowe objawy', 'Ryzyko diagnostyczne'],
      rows: [
        ['Hipoaktywne', 'Spowolnienie, sedacja, apatia', 'Brak kontaktu, senność w dzień, trudność w skupieniu', 'Przeoczenie, błędna diagnoza depresji, wyższa śmiertelność'],
        ['Hiperaktywne', 'Pobudzenie, wokalizacje, ucieczki', 'Omamy wzrokowe, wyrywanie kaniul, lęk', 'Nieuzasadnione podanie neuroleptyków sedatywnych'],
        ['Mieszane', 'Wahania między sedacją a pobudzeniem', 'Senność rano, niepokój i halucynacje w nocy', 'Brak ciągłości obserwacji między dyżurami'],
      ],
    },
    advanced:
      'Skala 4AT (Alertness, AMT4, Attention, Acute change) jest rekomendowanym przez NICE CG103 narzędziem przyłóżkowym o czułości ~88% i swoistości ~88%. Kluczową zaletą 4AT jest możliwość oceny pacjentów niewspółpracujących lub podsypiających — niemożność wykonania próby uwagi punktuje na korzyść podejrzenia majaczenia, co zapobiega zafałszowaniu wyniku.',
    summary:
      'Majaczenie definiuje ostry początek, dobowa fluktuacja oraz zaburzenia uwagi i czuwania. Postać hipoaktywna jest najgroźniejszą pułapką diagnostyczną, wymagającą systematycznej oceny narzędziami takimi jak 4AT.',
    sourceIds: ['4at-validation-bellelli-2014', 'nice-cg103-delirium', 'dsm5tr'],
    questions: [
      q(
        'Która kombinacja cech klinicznych najsilniej przemawia za majaczeniem (delirium) w odróżnieniu od zaostrzenia schizofrenii?',
        ['Nagły początek w ciągu godzin/dni, falowanie objawów w dobie oraz zaburzenia uwagi i czujności', 'Ostre tempo, fluktuacja i inattention są osiowymi wyznacznikami encefalopatii/delirium; schizofrenia rozwija się typowo przy jasnej świadomości.'],
        ['Obecność dobrze ustrukturyzowanych urojeń ksobnych bez wahań świadomości', 'Ustrukturyzowane urojenia przy jasnej świadomości są typowe dla psychoz pierwotnych, nie delirium.'],
        ['Prawidłowy wynik badania EKG i prawidłowa temperatura ciała', 'Prawidłowe parametry życiowe nie różnicują osiowych mechanizmów psychopatologicznych.'],
        'psych-delirium-dyn-q1'
      ),
      q(
        'Dlaczego hipoaktywna postać majaczenia wiąże się ze statystycznie gorszym rokowaniem i wyższą śmiertelnością niż postać hiperaktywna?',
        ['Ponieważ spowolnienie i patologiczna senność są często przeoczane lub mylone z depresją, co opóźnia wykrycie ostrej przyczyny somatycznej', 'Brak pobudzenia sprawia, że personel nie alarmuje lekarza, a postępująca sepsa lub hipoksja pozostają nierozpoznane.'],
        ['Ponieważ hipoaktywne delirium występuje wyłącznie u pacjentów ze złośliwym zespołem neuroleptycznym', 'Hipoaktywne delirium jest powszechnym zespołem geriatrycznym o zróżnicowanej etiologii internistycznej.'],
        ['Ponieważ postać hipoaktywna jest nieodwracalnym defektem kory potylicznej', 'Majaczenie jest zespołem potencjalnie odwracalnym po usunięciu wyzwalacza somatycznego.'],
        'psych-delirium-dyn-q2'
      ),
      q(
        'Jak należy poprawnie interpretować wynik 6 punktów w skali 4AT u 82-letniego pacjenta po operacji ortopedycznej?',
        ['Wynik silnie zwiększa podejrzenie majaczenia i nakazuje pilne poszukiwanie przyczyn somatycznych i metabolicznych', '4AT jest narzędziem przesiewowym; wynik >=4 wskazuje na wysokie prawdopodobieństwo delirium, lecz nie zastępuje badania lekarskiego ani oceny etiologii.'],
        ['Wynik definitywnie potwierdza otępienie naczyniowe i wyklucza wpływ zabiegu operacyjnego', '4AT nie diagnozuje typu otępienia, a ostry wynik odzwierciedla stan dynamiczny.'],
        ['Wynik oznacza brak wskazań do jakiejkolwiek diagnostyki, jeśli pacjent nie zgłasza omamów', 'Brak omamów jest typowy dla postaci hipoaktywnej i nie obniża czujności przy 6 punktach w 4AT.'],
        'psych-delirium-dyn-q3'
      ),
      q(
        '80-letnia pacjentka w 2. dobie po zabiegu staje się w nocy lękowa, widzi „robaki chodzące po pościeli” i próbuje opuścić łóżko, a rano podsypia i nie odpowiada na pytania. Jaki jest najbardziej dyskryminujący wniosek?',
        ['Obraz kliniczny odpowiada majaczeniu o przebiegu mieszanym, wymagającemu natychmiastowego poszukiwania czynnika wyzwalającego', 'Nocne omamy wzrokowe i pobudzenie w połączeniu z poranną sennością i fluktuacją to klasyczny przebieg majaczenia mieszanego.'],
        ['Stan pacjentki jest debiutem schizofrenii o późnym początku wymagającym pełnej dawki haloperidolu', 'Rozpoznanie schizofrenii w 2. dobie pooperacyjnej przy ostrych wahaniach przytomności jest rażącym błędem.'],
        ['Jest to typowa manipulacja behawioralna niewymagająca żadnych badań kontrolnych', 'Zaburzenia spostrzegania i czuwania u chorego po operacji są zawsze objawem somatycznego stanu zagrożenia.'],
        'psych-delirium-dyn-q4'
      ),
      q(
        'Co jest kluczową zaletą metodologiczną testu 4AT w porównaniu z kwestionariuszami wymagającymi pełnej współpracy pacjenta?',
        ['Pozwala na przyznanie punktów pacjentom podsypiającym lub niewspółpracującym, zapobiegając fałszywie ujemnym wynikom w stanach ciężkich', 'Niemożność wykonania próby uwagi (np. miesięcy od tyłu) punktuje jako nieprawidłowość, co chroni przed zlekceważeniem głębokich zaburzeń czuwania.'],
        ['Wykrywa z dokładnością do 100% stężenie leków przeciwpsychotycznych w osoczu', '4AT jest testem behawioralno-poznawczym, a nie badaniem laboratoryjnym.'],
        ['Zastępuje konieczność wykonania gazometrii i elektrolitów u każdego chorego', 'Żadne narzędzie przesiewowe nie zastępuje diagnostyki laboratoryjnej przyczyny majaczenia.'],
        'psych-delirium-dyn-q5'
      ),
    ],
  },

  {
    id: 'delirium-vs-otepienie-vs-depresja',
    moduleId: 'psych-organiczne',
    title: 'Różnicowanie: Delirium vs Otępienie vs Depresja vs Psychoza',
    subtitle: 'Macierz różnicowa na 8 wymiarach semiotycznych i zjawisko delirium nałożonego',
    group: 'Ostre zaburzenia świadomości i zespoły poznawcze',
    minutes: 18,
    goals: [
      'Zestawisz delirium, otępienie i depresję na osiach: tempo, uwaga, czujność, orientacja i fluktuacja.',
      'Rozpoznasz zjawisko majaczenia nałożonego na otępienie (delirium superimposed on dementia).',
      'Unikniesz błędnego traktowania pojedynczych objawów (np. omamów wzrokowych) jako rozstrzygających w oderwaniu od dynamiki.',
    ],
    sections: [
      {
        title: 'Wielowymiarowa matryca różnicowa: kluczowa kombinacja cech',
        text: 'Różnicowanie geriatrycznych stanów neuropsychiatrycznych opiera się na konstelacji cech, a nie izolowanym objawie. Majaczenie rozwija się w godziny/dni, charakteryzuje się falowaniem objawów, głębokim rozbiciem uwagi i zaburzeniami czuwania. Otępienie (dementia) rozwija się podstępnie w miesiące/lata, uwaga i czujność pozostają względnie zachowane we wczesnych stadiach, a dominują deficyty pamięci i funkcji wykonawczych. W depresji początek jest tygodniowy/miesięczny, uwaga bywa spowolniona przez obniżony napęd, lecz czujność jest zachowana, a pacjent chętnie odpowiada „nie wiem”.',
      },
      {
        title: 'Majaczenie nałożone na otępienie (Delirium Superimposed on Dementia)',
        text: 'Obecność otępienia jest najsilniejszym niezależnym czynnikiem ryzyka wystąpienia majaczenia (wzrost ryzyka 3–5-krotny z powodu obniżonej rezerwy neuronalnej i cholinergicznej). Nałożenie delirium manifestuje się nagłą zmianą dotychczasowego funkcjonowania, nowymi omamami, nasileniem dezorientacji i bezsennością nocną. Kluczowy błąd to uznanie ostrego pogorszenia za „naturalną progresję otępienia” — choroba Alzheimera nie zaostrza się w ciągu 24 godzin bez somatycznego wyzwalacza.',
      },
      {
        title: 'Kiedy obraz przypomina psychozę pierwotną?',
        text: 'Późny debiut psychozy u osoby starszej bez wywiadu psychiatrycznego zawsze obniża próg do diagnostyki organicznej. W psychozach pierwotnych (np. schizofrenia o bardzo późnym początku) urojenia są często spójne i usystematyzowane, a orientacja autopsychiczna i allopsychiczna oraz czuwanie pozostają nienaruszone. Pojawienie się fluktuacji, omamów wzrokowych i splątania nakazuje pilne wykluczenie przyczyn wtórnych.',
      },
    ],
    table: {
      headers: ['Cecha kliniczna', 'Majaczenie (Delirium)', 'Otępienie (Dementia)', 'Depresja wieku podeszłego'],
      rows: [
        ['Początek', 'Nagły: godziny do kilku dni', 'Podstępny: miesiące do lat', 'Stopniowy: tygodnie do miesięcy'],
        ['Przebieg dobowy', 'Znacznie falujący (sundowning)', 'Względnie stabilny w ciągu doby', 'Gorszy rano (poranne zaostrzenie)'],
        ['Uwaga i czujność', 'Głęboko zaburzone, labilne', 'Zachowane we wczesnych stadiach', 'Spowolniona, ale zachowana'],
        ['Odwracalność', 'Zazwyczaj potencjalnie odwracalne', 'Z reguły postępujące', 'Odwracalna po skutecznym leczeniu'],
      ],
    },
    advanced:
      'Pojęcie „otępienia rzekomego” (pseudodementia) w depresji ma charakter historyczny i nie powinno być traktowane dosłownie. Współczesne badania neuroobrazowe wskazują, że zaburzenia poznawcze w depresji geriatrycznej mogą wynikać z uszkodzeń naczyniowych istoty białej (depresja naczyniowa) i stanowią stan podwyższonego ryzyka rozwoju późniejszego otępienia neurodegeneracyjnego.',
    summary:
      'Żadna pojedyncza cecha semiotyczna nie jest absolutna. O rozpoznaniu decyduje kombinacja: tempo rozwoju + fluktuacja + stopień zaburzenia uwagi i czuwania. Nagłe pogorszenie u pacjenta z otępieniem to delirium do czasu wykluczenia przyczyn ostrych.',
    sourceIds: ['nice-cg103-delirium', 'nice-ng97-dementia', 'icd11-cddr'],
    questions: [
      q(
        '84-letni pacjent ze stabilnym od 3 lat otępieniem w chorobie Alzheimera staje się w ciągu 24 godzin agresywny, nie poznaje córki i widzi ogień za oknem. Co jest najbardziej prawidłowym wnioskiem klinicznym?',
        ['Obraz przemawia za majaczeniem nałożonym na otępienie (delirium superimposed on dementia) i wymaga pilnego poszukiwania ostrej przyczyny somatycznej', 'Otępienie neurodegeneracyjne nie postępuje skokowo w 24 godziny; nagłe załamanie u chorego z AD jest z reguły majaczeniem wywołanym infekcją, bólem lub lekiem.'],
        ['Jest to naturalna, spodziewana progresja choroby Alzheimera i wymaga podwojenia dawki memantyny', 'Podwojenie memantyny bez zbadania pacjenta ignoruje ostry stan zagrożenia somatycznego.'],
        ['Stan ten dowodzi, że pierwotna diagnoza choroby Alzheimera była błędna i pacjent choruje na schizofrenię', 'Debiut schizofrenii w wieku 84 lat z nagłym załamaniem jest skrajnie nieprawdopodobny.'],
        'psych-del-vs-dem-q1'
      ),
      q(
        'Który parametr semiotyczny stanowi najważniejszy dyskryminator pomiędzy łagodnym stadium otępienia a hipoaktywnym majaczeniem?',
        ['Uwaga i czujność — w majaczeniu uwaga jest głęboko zaburzona i falująca, a w łagodnym otępieniu uwaga i czuwanie są względnie zachowane', 'Pacjent z wczesnym otępieniem potrafi utrzymać kontakt i skupić się na badaniu, podczas gdy w delirium uwaga natychmiast ulega rozproszeniu.'],
        ['Obecność lub brak ubytków pamięci świeżej', 'Zaburzenia pamięci świeżej występują zarówno w otępieniu, jak i w delirium, nie stanowiąc cechy różnicującej.'],
        ['Wiek metrykalny pacjenta', 'Wiek jest czynnikiem ryzyka obu stanów i nie pozwala na ich odróżnienie.'],
        'psych-del-vs-dem-q2'
      ),
      q(
        '76-letnia pacjentka w gabinecie odpowiada na pytania testowe zniechęconym głosem: „nie wiem, nie pamiętam, to bez sensu”, lecz przy zachęcie wykonuje poprawnie trudniejsze zadania. Nie wykazuje fluktuacji świadomości. Jaka hipoteza jest najbardziej prawdopodobna?',
        ['Zaburzenia funkcji wykonawczych i pamięci w przebiegu epizodu depresyjnego wieku podeszłego', 'Postawa rezygnacyjna, odpowiedzi „nie wiem” przy zachowanej czujności i poprawie pod wpływem motywacji są typowe dla geriatrycznego profilu depresyjnego.'],
        ['Ostre hiperaktywne delirium wymagające natychmiastowych pasów obezwładniających', 'Brak zaburzeń czuwania, brak falowania i brak pobudzenia wykluczają delirium hiperaktywne.'],
        ['Zaawansowana choroba Creutzfeldta-Jakoba w stadium terminalnym', 'Obraz nie wykazuje cech gwałtownej encefalopatii ani mioklonii.'],
        'psych-del-vs-dem-q3'
      ),
      q(
        'Co oznacza pojęcie „sundowning” w kontekście dobowego przebiegu majaczenia i otępienia?',
        ['Charakterystyczne nasilenie lęku, dezorientacji, błądzenia i pobudzenia w godzinach późnopopołudniowych i nocnych', 'Zjawisko to wiąże się ze spadkiem oświetlenia, zmęczeniem sensorycznym i zaburzeniami rytmu okołodobowego melatoniny i kortyzolu.'],
        ['Całkowite ustąpienie wszystkich objawów poznawczych po zachodzie słońca', 'Sundowning oznacza zaostrzenie, a nie ustąpienie objawów w nocy.'],
        ['Występowanie napadów padaczkowych wyłącznie w porze południowej', 'Sundowning nie odnosi się do napadów padaczkowych w południe.'],
        'psych-del-vs-dem-q4'
      ),
      q(
        'Dlaczego u osób starszych z pierwszym w życiu epizodem manii lub psychozy należy przyjąć niższy próg do poszerzonej diagnostyki neurologicznej i obrazowej?',
        ['Ponieważ prawdopodobieństwo etiologii wtórnej (udar, guz, infekcja, leki) jest w tej grupie wiekowej istotnie wyższe niż w młodości', 'Późny debiut objawów afektywnych lub psychotycznych po 65 r.ż. ma znacznie częściej podłoże somatyczno-naczyniowe niż pierwotne.'],
        ['Ponieważ u osób starszych leki psychotropowe w 100% przypadków wywołują zgon', 'Taka teza jest fałszywa; leki wymagają ostrożnego dawkowania, lecz nie są bezwzględnie śmiertelne.'],
        ['Ponieważ schizofrenia wyklucza możliwość zachorowania na jakiekolwiek choroby internistyczne', 'Obecność schorzenia psychicznego nie chroni przed chorobami somatycznymi.'],
        'psych-del-vs-dem-q5'
      ),
    ],
  },

  {
    id: 'diagnostyka-ostrego-zaburzenia-swiadomosci',
    moduleId: 'psych-organiczne',
    title: 'Diagnostyka ostrego zaburzenia świadomości: Cause Hunt i badania',
    subtitle: 'Systematyczne poszukiwanie odwracalnych przyczyn majaczenia bez fałszywej pewności',
    group: 'Ostre zaburzenia świadomości i zespoły poznawcze',
    minutes: 17,
    goals: [
      'Przeprowadzisz ustrukturyzowany proces poszukiwania przyczyn majaczenia (Cause Hunt).',
      'Zidentyfikujesz ukryte wyzwalacze delirium: ból, zatrzymanie moczu, zaparcie, hipoksję i leki.',
      'Zrozumiesz zasadę: prawidłowe rutynowe badania nie oznaczają automatycznie pierwotnego tła psychicznego.',
    ],
    sections: [
      {
        title: 'Cause Hunt: kategorie przyczyn somatycznych i środowiskowych',
        text: 'W majaczeniu rzadko występuje jedna izolowana przyczyna — typowo dochodzi do nałożenia wielu czynników podatności (np. wiek, otępienie, niedosłuch) i czynników wyzwalających. Akronim PINCHES ułatwia systematyczny przegląd: Pain (ból), Infection (infekcja ZUM, zapalenie płuc), Nutrition/Metabolic (hipo/hiperglikemia, Na, K, Ca), Constipation/retention (zaklinowanie stolca, pęcherz moczowy), Hydration/Hypoxia (odwodnienie, niewydolność serca, POChP), Endocrine/Electrolytes (tarczyca, mocznica), Sedatives/Drugs (nowe leki, BZD, opioidy, leki antycholinergiczne).',
      },
      {
        title: 'Ukryte wyzwalacze geriatryczne: pęcherz i jelita',
        text: 'Dwa najczęściej pomijane wyzwalacze delirium to ostre zatrzymanie moczu oraz stolcowe zaklinowanie jelit (fecaloma). U starszego pacjenta z zaburzeniami poznawczymi rozciągnięcie ścian pęcherza lub odbytnicy generuje masywny dopływ nocyceptywny do OUN, wyzwalając pobudzenie psychoruchowe bez klasycznych skarg na ból. Przyłóżkowe USG pęcherza moczowego (bladderscan) oraz badanie per rectum są obowiązkowymi elementami workupu majaczenia.',
      },
      {
        title: 'Pułapka „ujemnych badań” w ostrym zaburzeniu zachowania',
        text: 'Prawidłowe wyniki morfologii, CRP, elektrolitów i TK głowy zmniejszają prawdopodobieństwo jawnych infekcji bakteryjnych, zaburzeń elektrolitowych czy ostrego krwawienia śródczaszkowego. Nie stanowią one jednak dowodu na „chorobę psychiczną” — ostre splątanie może wynikać z bólu, zatrzymania moczu, interakcji lekowych, hipoksji w nocy lub bezdrgawkowego stanu padaczkowego (NCSE), których nie widać w standardowych badaniach krwi.',
      },
    ],
    table: {
      headers: ['Kategoria przyczyny', 'Kluczowe badania', 'Częsty błąd postępowania'],
      rows: [
        ['Infekcja', 'Badanie ogólne i posiew moczu, RTG klatki piersiowej', 'Ignorowanie braku gorączki u osłabionego seniora'],
        ['Zatrzymanie moczu / kału', 'Palpacja podbrzusza, USG pęcherza, per rectum', 'Włączenie leku uspokajającego zamiast założenia cewnika'],
        ['Toksyczność lekowa', 'Przegląd lekowy (ACB, opioidy, sedatywy, tiazydy)', 'Uznanie polifarmacji za „niezmienną” i dołożenie neuroleptyku'],
        ['Metaboliczne / narządowe', 'Glikemia, Na, K, Ca, mocznik, kreatynina, gazometria', 'Niewykonanie gazometrii przy prawidłowym RTG płuc'],
      ],
    },
    advanced:
      'W oddziałach intensywnej terapii zwalidowanym narzędziem monitorowania majaczenia jest CAM-ICU (Confusion Assessment Method for the ICU) lub ICDSC. Ocenia ono fluktuację czuwania w skali RASS oraz obecność inattention w teście ściskania dłoni na literę „A” (np. słowo SAVEAHAART), co pozwala na wiarygodne badanie pacjentów zaintubowanych.',
    summary:
      'Diagnostyka majaczenia to systematyczny Cause Hunt. Przed przypisaniem pacjentowi pierwotnego zaburzenia psychicznego należy obligatoryjnie wykluczyć zatrzymanie moczu, zaparcie, ból, infekcję i toksyczność lekową.',
    sourceIds: ['nice-cg103-delirium', '4at-validation-bellelli-2014'],
    questions: [
      q(
        '81-letni pacjent w 1. dobie po zabiegu pomostowania naczyniowego nagle staje się skrajnie pobudzony, krzyczy i próbuje zeskoczyć z łóżka. Jaki krok diagnostyczno-terapeutyczny powinien poprzedzać podanie leku uspokajającego?',
        ['Ocena parametrów życiowych, wykluczenie hipoksji oraz zbadanie podbrzusza (USG pęcherza w kierunku zatrzymania moczu) i kontrola bólu', 'Nagłe pobudzenie pooperacyjne bardzo często wynika z ostrego zatrzymania moczu lub niedostatecznej analgezji; sedacja bez zbadania pacjenta grozi pęknięciem pęcherza lub zapaścią.'],
        ['Natychmiastowe podanie 10 mg haloperidolu domięśniowo bez badania fizykalnego', 'Podanie wysokiej dawki typowego neuroleptyku seniorowi bez zbadania przyczyny somatycznej jest błędem sztuki.'],
        ['Konsultacja psychoanalityczna w celu przepracowania lęku przed śmiercią', 'Ostre delirium wymaga pilnego postępowania somatycznego, nie psychoterapii wglądowej.'],
        'psych-diag-del-q1'
      ),
      q(
        'Dlaczego brak gorączki i prawidłowa liczba leukocytów u 86-letniego pacjenta z majaczeniem NIE wykluczają aktywnej infekcji bakteryjnej?',
        ['Ponieważ układ immunologiczny osób w podeszłym wieku może nie generować typowej odpowiedzi gorączkowej (immunosenescencja)', 'U seniorów jedyną manifestacją ciężkiego zakażenia układu moczowego lub zapalenia płuc bywa nagłe majaczenie i spadek ciśnienia tętniczego.'],
        ['Ponieważ leukocytoza występuje wyłącznie u pacjentów ze schizofrenią hebefreniczną', 'Leukocytoza jest wskaźnikiem hematologicznym, niezwiązanym z podtypami schizofrenii.'],
        ['Ponieważ bakterie u osób starszych nie wywołują stanu zapalnego', 'Bakterie wywołują zapalenie, lecz odpowiedź ogólnoustrojowa może przebiegać bez gorączki.'],
        'psych-diag-del-q2'
      ),
      q(
        'Jak prawidłowo interpretować informację: „badania laboratoryjne (morfologia, CRP, TSH, glikemia, elektrolity) oraz TK głowy są w normie” u starszej osoby z ostrym splątaniem?',
        ['Zmniejszają prawdopodobieństwo jaskrawych zaburzeń metabolicznych i ostrego krwotoku, lecz nie dowodzą etiologii pierwotnej i wymagają dalszej diagnostyki somatycznej', 'Wyniki ujemne eliminują jedynie część przyczyn; delirium może wynikać z leków, bezdrgawkowego stanu padaczkowego, bólu czy hipoksji.'],
        ['Stanowią bezpośredni dowód na późny debiut schizofrenii paranoidalnej', 'Ujemne wyniki badań laboratoryjnych nie są testem potwierdzającym schizofrenię.'],
        ['Oznaczają, że pacjent symuluje objawy w celu wymuszenia opieki', 'Majaczenie jest biologicznym stanem zagrożenia mózgu, a nie symulacją.'],
        'psych-diag-del-q3'
      ),
      q(
        'Które badanie przyłóżkowe jest najbardziej uzasadnione u pacjenta geriatrycznego z nagłym pobudzeniem wieczornym i brakiem mikcji przez ostatnie 10 godzin?',
        ['Przyłóżkowe USG pęcherza moczowego (bladderscan) lub cewnikowanie diagnostyczne', 'Pozwala na natychmiastowe wykrycie zatrzymania moczu, które bywa bezpośrednią i w pełni odwracalną przyczyną majaczenia.'],
        ['Badanie rezonansu magnetycznego całego ciała w sekwencji angiograficznej', 'Angiografia całego ciała nie jest badaniem pierwszego rzutu przy podejrzeniu zatrzymania moczu.'],
        ['Test plam atramentowych Rorschacha', 'Testy projekcyjne są całkowicie nieprzydatne i niewykonalne w ostrym zespole majaczeniowym.'],
        'psych-diag-del-q4'
      ),
      q(
        'Jaka jest rola narzędzia CAM-ICU w oddziałach intensywnej terapii?',
        ['Umożliwia standaryzowaną ocenę majaczenia u pacjentów krytycznie chorych, w tym zaintubowanych i wentylowanych mechanicznie', 'CAM-ICU bada inattention metodą niewymagającą mowy (ściskanie dłoni na bodziec literowy) w połączeniu z oceną poziomu sedacji RASS.'],
        ['Służy do automatycznego wyliczania dawki dożylnej propofolu bez udziału lekarza', 'CAM-ICU jest narzędziem diagnostycznym, nie pompą infuzyjną.'],
        ['Wykrywa obecność mutacji genetycznych predysponujących do choroby Alzheimera', 'CAM-ICU nie bada genetyki ani predyspozycji do otępienia.'],
        'psych-diag-del-q5'
      ),
    ],
  },

  {
    id: 'zaburzenia-poznawcze-mci-a-otepienie',
    moduleId: 'psych-organiczne',
    title: 'MCI, major neurocognitive disorder i funkcjonowanie',
    subtitle: 'Rozgraniczenie subiektywnych skarg, łagodnych zaburzeń poznawczych i otępienia',
    group: 'Ostre zaburzenia świadomości i zespoły poznawcze',
    minutes: 17,
    goals: [
      'Rozróżnisz subiektywne pogorszenie poznawcze (SCD), łagodne zaburzenia poznawcze (MCI) i otępienie (Dementia).',
      'Wykorzystasz poziom niezależności w codziennym funkcjonowaniu (IADL vs ADL) jako główny dyskryminator nozologiczny.',
      'Zrozumiesz ograniczenia przesiewowych testów poznawczych (MMSE, MoCA) i unikniesz diagnozowania wyłącznie z punktacji.',
    ],
    sections: [
      {
        title: 'Spektrum pogorszenia poznawczego: od SCD do otępienia',
        text: 'Współczesna nozologia wyróżnia kontinuum zmian poznawczych: 1) Subiektywne pogorszenie poznawcze (Subjective Cognitive Decline — SCD): pacjent zgłasza ubytek sprawności, lecz testy neuropsychologiczne są prawidłowe dla wieku i wykształcenia; 2) Łagodne zaburzenia poznawcze (Mild Cognitive Impairment — MCI / Mild Neurocognitive Disorder): obiektywne deficyty w testach w jednej lub wielu domenach, przy zachowanej samodzielności w codziennym życiu; 3) Otępienie (Major Neurocognitive Disorder / Dementia): deficyty poznawcze w stopniu powodującym utratę niezależności funkcjonalnej.',
      },
      {
        title: 'Funkcjonowanie jako kluczowy dyskryminator: IADL vs ADL',
        text: 'O rozpoznaniu otępienia decyduje nie liczba utraconych punktów w teście, lecz utrata zdolności do samodzielnego funkcjonowania. Wyróżniamy: podstawowe czynności życia codziennego (Basic ADL: ubieranie się, jedzenie, toaleta, higiena osobista, poruszanie się) oraz złożone czynności instrumentalne (Instrumental IADL: zarządzanie budżetem i rachunkami, prawidłowe przyjmowanie leków, korzystanie z telefonu, gotowanie, zakupy, podróżowanie komunikacją). W MCI pacjent może wymagać więcej czasu lub kompensacji, lecz zachowuje niezależność; w otępieniu dochodzi do załamania IADL, a w późniejszych stadiach także ADL.',
      },
      {
        title: 'Ograniczenia testów przesiewowych (MMSE, MoCA)',
        text: 'Testy przesiewowe (np. MoCA, MMSE) służą do identyfikacji potrzeby pogłębionej oceny, a nie do stawiania rozpoznania nozologicznego. Wynik zależy silnie od wykształcenia, języka ojczystego, sprawności narządów zmysłów (słuch, wzrok) oraz nastroju. Osoba z wyższym wykształceniem i wczesnym otępieniem może uzyskać wynik w normie dzięki wysokiej rezerwie poznawczej, podczas gdy osoba z niskim wykształceniem i depresją może uzyskać wynik fałszywie niski.',
      },
    ],
    table: {
      headers: ['Kategoria', 'Obiektywne testy poznawcze', 'Funkcjonowanie IADL', 'Funkcjonowanie podstawowe ADL'],
      rows: [
        ['SCD (subiektywne)', 'Prawidłowe dla wieku i edukacji', 'Całkowicie niezależne', 'Niezależne'],
        ['MCI (łagodne zaburzenia)', 'Obiektywnie obniżone (>=1 domena)', 'Zachowane (możliwy większy wysiłek/kompensacja)', 'Niezależne'],
        ['Otępienie łagodne', 'Znacząco obniżone w wielu domenach', 'Upośledzone (wymaga pomocy w lekach/finansach)', 'Względnie zachowane'],
        ['Otępienie umiarkowane/ciężkie', 'Głęboko zaburzone', 'Całkowita zależność od opiekuna', 'Wymaga pomocy w toalecie, ubiorze, karmieniu'],
      ],
    },
    advanced:
      'Wyróżnia się postać amnestyczną MCI (aMCI — dominujący deficyt pamięci epizodycznej, częstsza konwersja do choroby Alzheimera, wskaźnik konwersji ~10–15% rocznie) oraz postać nieamnestyczną MCI (naMCI — dominujące zaburzenia wykonawcze, językowe lub wzrokowo-przestrzenne, częściej związane z patologią naczyniową, czołowo-skroniową lub DLB).',
    summary:
      'Granica między MCI a otępieniem przebiega wzdłuż osi niezależności funkcjonalnej. Testy przesiewowe wspierają czujność kliniczną, lecz diagnoza wymaga oceny wpływu deficytów na codzienne życie (IADL/ADL) z uwzględnieniem wywiadu od bliskich.',
    sourceIds: ['nice-ng97-dementia', 'dsm5tr', 'icd11-cddr'],
    questions: [
      q(
        '73-letnia emerytowana nauczycielka zauważa u siebie zapominanie nazwisk znajomych. W badaniu MoCA uzyskuje 24/30 pkt, lecz samodzielnie prowadzi dom, opłaca rachunki, gotuje i bezpiecznie podróżuje samochodem. Jak prawidłowo zaklasyfikować jej stan?',
        ['Łagodne zaburzenia poznawcze (MCI) — obiektywny spadek w teście przy zachowanej niezależności w złożonych czynnościach dnia codziennego', 'Obecność obiektywnego ubytku bez utraty samodzielności w IADL/ADL definiuje stadium MCI, wykluczając rozpoznanie otępienia.'],
        ['Zaawansowane otępienie w chorobie Alzheimera wymagające ubezwłasnowolnienia', 'Zachowana pełna samodzielność w IADL wyklucza otępienie, a tym bardziej stadium zaawansowane.'],
        ['Stan w pełni prawidłowy, niewymagający żadnej obserwacji ani kontroli za rok', 'Wynik MoCA 24/30 oraz subiektywne skargi wymagają monitorowania dynamiki zmian za 6–12 miesięcy.'],
        'psych-mci-func-q1'
      ),
      q(
        'Który obszar codziennego funkcjonowania najwcześniej ulega zaburzeniu w procesie konwersji z MCI do otępienia?',
        ['Złożone czynności instrumentalne (IADL), takie jak zarządzanie budżetem, przyjmowanie leków i załatwianie spraw urzędowych', 'Funkcje wykonawcze i pamięć robocza potrzebne do IADL załamują się znacznie wcześniej niż podstawowe nawyki higieniczne (ADL).'],
        ['Podstawowe czynności higieniczne (mycie rąk i czesanie się)', 'Podstawowe czynności ADL pozostają zachowane aż do umiarkowanych i ciężkich stadiów otępienia.'],
        ['Odruchy bezwarunkowe połykania i żucia', 'Odruchy połykania ulegają uszkodzeniu dopiero w końcowej fazie zaawansowanego otępienia.'],
        'psych-mci-func-q2'
      ),
      q(
        'Dlaczego wynik 27/30 pkt w teście MMSE u 70-letniego profesora uniwersytetu z podejrzeniem procesu otępiennego NIE pozwala na wykluczenie wczesnej choroby Alzheimera?',
        ['Wysoka rezerwa poznawcza i wykształcenie maskują wczesne deficyty w prostych przesiewowych testach o niskim suficie trudności', 'Testy przesiewowe typu MMSE mają efekt sufitowy; u osób z wysokim wykształceniem wczesne otępienie wymaga czulszych testów (MoCA, pełna bateria neuropsychologiczna).'],
        ['Ponieważ test MMSE jest testem służącym wyłącznie do wykrywania schizofrenii katatonicznej', 'MMSE ocenia ogólne funkcje poznawcze, nie schizofrenię katatoniczną.'],
        ['Ponieważ choroba Alzheimera nigdy nie wpływa na pamięć epizodyczną', 'Zaburzenia pamięci epizodycznej są typową cechą choroby Alzheimera.'],
        'psych-mci-func-q3'
      ),
      q(
        'Czym charakteryzuje się amnestyczna postać MCI (amnestic MCI) w odniesieniu do ryzyka klinicznego?',
        ['Wiąże się ze statystycznie najwyższym ryzykiem progresji do choroby Alzheimera w porównaniu z postaciami nieamnestycznymi', 'Izolowany lub dominujący ubytek odraczania pamięci epizodycznej w aMCI odzwierciedla wczesną dysfunkcję struktur hipokampa i kory śródwęchowej.'],
        ['Gwarantuje 100% samoistne wyleczenie w ciągu 3 miesięcy bez konieczności kontroli', 'aMCI wymaga monitorowania, gdyż u ~10–15% chorych rocznie dochodzi do konwersji do otępienia.'],
        ['Występuje wyłącznie u pacjentów uzależnionych od alkoholu z zespołem Korsakowa', 'aMCI jest jednostką kliniczną wieku podeszłego niezależną od uzależnień.'],
        'psych-mci-func-q4'
      ),
      q(
        'Dlaczego informacje uzyskane od bliskich lub opiekuna (collateral history) są niezbędne do postawienia rozpoznania otępienia?',
        ['Ponieważ pacjent z powodu anozognozji (braku wglądu) lub zaburzeń pamięci może nie dostrzegać i bagatelizować rzeczywistych trudności w codziennym życiu', 'Osoba z wczesnym otępieniem często deklaruje pełną sprawność, a dopiero relacja rodziny ujawnia niespłacone rachunki, przypalanie garnków czy gubienie leków.'],
        ['Ponieważ prawo zabrania rozmawiania z pacjentem bez obecności notariusza', 'Prawo medyczne wymaga badania pacjenta, a wywiad od rodziny jest uzupełnieniem klinicznym.'],
        ['Ponieważ testy neuropsychologiczne są w 100% niewiarygodne bez podpisu członka rodziny', 'Testy są standaryzowane, lecz ocena funkcjonowania w świecie realnym wymaga danych ze środowiska domowego.'],
        'psych-mci-func-q5'
      ),
    ],
  },
];
