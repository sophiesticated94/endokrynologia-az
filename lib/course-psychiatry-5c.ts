import { type DraftLesson, q } from './course-types.ts';

export const draftPsychiatryPart5c: DraftLesson[] = [
  {
    id: 'szybko-postepujace-zespoly-otepienne',
    moduleId: 'psych-organiczne',
    title: 'Szybko postępujące zespoły otępienne (RPD) i czerwone flagi',
    subtitle: 'Zegar neurokognitywny, zapalenia autoimmunologiczne, encefalopatie i różnicowanie prionowe',
    group: 'Geriatria kliniczna, bezpieczeństwo i etyka',
    minutes: 19,
    goals: [
      'Zastosujesz „Zegar neurokognitywny” (tempo rozwoju: godziny/dni vs tygodnie/miesiące vs lata) do ustalenia priorytetów diagnostycznych.',
      'Zidentyfikujesz czerwone flagi encefalopatii autoimmunologicznych (napady, dyskinezy ustno-twarzowe, labilność wegetatywna).',
      'Wdrożysz hierarchiczny panel badań (MRI, PMR, EEG, przeciwciała onkoneuronalne) w podejrzeniu odwracalnych przyczyn RPD.',
    ],
    sections: [
      {
        title: 'Zegar neurokognitywny: tempo jako decydujący drogowskaz',
        text: 'Szybko postępujące otępienie (Rapidly Progressive Dementia — RPD) definiuje się jako spadek poznawczy rozwijający się w czasie krótszym niż 1–2 lata, a najczęściej w ciągu tygodni do kilku miesięcy. Zegar neurokognitywny dzieli dynamikę na 4 kategorie: 1) godziny–dni (ostre: delirium, zatrucia, udary, stan padaczkowy); 2) dni–tygodnie (podostre: zapalenia mózgu wirusowe/autoimmunologiczne, ostre zaburzenia metaboliczne); 3) tygodnie–miesiące (RPD: autoimmunologiczne, prionowe CJD, paraneoplastyczne, chłoniaki OUN); 4) miesiące–lata (klasyczne procesy neurodegeneracyjne). Tempo nie daje rozpoznania, lecz narzuca natychmiastową pilność procedur.',
      },
      {
        title: 'Czerwone flagi zapalenia mózgu (Autoimmune Encephalitis)',
        text: 'Autoimmunologiczne zapalenie mózgu (np. z przeciwciałami przeciwko receptorom NMDA, LGI1, CASPR2) uderza często w młodych dorosłych lub seniorów. Prawidłowy model nie łączy sztywno pojedynczych objawów (np. psychoza + dyskinezy = anty-NMDAR), lecz uczy konstelacji czerwonych flag: 1) ostra/podostra psychoza lub labilność afektywna; 2) wczesne napady padaczkowe (zwłaszcza lekooporne lub napady dystoniczne twarzowo-ramienne w anty-LGI1); 3) zaburzenia ruchowe (dyskinezy ustno-twarzowe, pląsawica); 4) fluktuacje czuwania i mutyzm/katatonia; 5) niestabilność autonomiczna (hipo/hipertermia, tachykardia, labilne ciśnienie).',
      },
      {
        title: 'Choroby prionowe (CJD) i inne przyczyny odwracalne',
        text: 'Sporadyczna choroba Creutzfeldta-Jakoba (sCJD) manifestuje się postępującym otępieniem w kilka miesięcy, miokloniami wyzwalanymi bodźcem dźwiękowym (startle reflex), ataksją móżdżkową i wczesnymi objawami wzrokowymi. W diagnostyce kluczowe są: restrykcja dyfuzji w korze wstęgowatej i prążkowiu w MRI (DWI/FLAIR), okresowe wyładowania trójfazowe (PSWC) w EEG oraz białko 14-3-3 i test RT-QuIC w płynie mózgowo-rdzeniowym.',
      },
    ],
    table: {
      headers: ['Grupa etiologiczna', 'Przykłady schorzeń', 'Czerwone flagi kliniczne', 'Kluczowe badanie różnicujące'],
      rows: [
        ['Autoimmunologiczne', 'Zapalenie anty-NMDAR, anty-LGI1', 'Napady padaczkowe, dyskinezy, katatonia', 'Panel przeciwciał w PMR i surowicy, MRI mózgu'],
        ['Prionowe', 'Sporadyczne CJD (sCJD)', 'Mioklonie bodźcowe, ataksja, mutyzm akinetyczny', 'MRI DWI (hyperintensywność kory), test RT-QuIC w PMR'],
        ['Zakaźne', 'HSV, kiła OUN, neuroborelioza, HIV', 'Gorączka, ból głowy, objawy oponowe', 'Badanie ogólne PMR, PCR HSV, serologia OUN'],
        ['Toksyczno-metaboliczne', 'Encefalopatia Wernickego, Hashimoto (SREAT)', 'Ofszyja/ataksja/oczopląs, wysokie aTPO', 'Poziom tiaminy, panel tarczycowy, odpowiedź na sterydy'],
      ],
    },
    advanced:
      'W zapaleniach autoimmunologicznych przeciwciała w surowicy krwi mogą być fałszywie ujemne (np. w anty-NMDAR czułość surowicy wynosi ~85%, podczas gdy w PMR sięga niemal 100%). Ujemny wynik z krwi obwodowej nigdy nie zwalnia z punkcji lędźwiowej przy wysokim podejrzeniu klinicznym.',
    summary:
      'Szybki spadek poznawczy w tygodnie lub miesiące nie pasuje do typowej choroby Alzheimera. Wymaga natychmiastowego wykluczenia przyczyn odwracalnych i zapalnych poprzez MRI, badanie PMR, EEG oraz panele autoprzeciwciał.',
    sourceIds: ['rpd-graff-radford-2019', 'nice-ng97-dementia'],
    questions: [
      q(
        '23-letnia studentka bez wcześniejszego wywiadu psychiatrycznego w ciągu 3 tygodni rozwija objawy lęku, omamów wzrokowo-słuchowych, po czym dołączają mimowolne grymasy ust i języka (dyskinezy), uogólniony napad padaczkowy oraz okresowy mutyzm. Jaki jest priorytet diagnostyczny?',
        ['Pilna hospitalizacja na oddziale neurologii z wykonaniem punkcji lędźwiowej (panel przeciwciał w PMR), MRI mózgu i EEG pod kątem autoimmunologicznego zapalenia mózgu', 'Pojawienie się psychozy z napadami padaczkowymi, dyskinezami i katatonią u młodej osoby w ciągu 3 tygodni jest czerwoną flagą zapalenia mózgu (np. anty-NMDAR).'],
        ['Natychmiastowe rozpoznanie schizofrenii i skierowanie na 10-letnią psychoterapię psychoanalityczną', 'Rozpoznanie schizofrenii przy ostrych napadach padaczkowych i dyskinezach bez badań neurologicznych jest rażącym błędem.'],
        ['Wypisanie do domu z zaleceniem picia naparu z melisy', 'Encefalopatia z napadami drgawkowymi jest stanem bezpośredniego zagrożenia życia.'],
        'psych-rpd-clock-q1'
      ),
      q(
        'Jaka jest najważniejsza zaleta metodyczna podejścia opartego na „Zegarze neurokognitywnym” w diagnostyce zespołów otępiennych?',
        ['Ustala pilność procedur ratunkowych i zawęża grupy etiologiczne na podstawie tempa rozwoju, chroniąc przed przeoczeniem procesów odwracalnych', 'Tempo w tygodnie/miesiące wyklucza rutynowe, powolne podejście ambulatoryjne i nakazuje wykluczenie zapaleń mózgu, guzów czy zakażeń.'],
        ['Pozwala na natychmiastowe zrezygnowanie z badania płynu mózgowo-rdzeniowego u każdego pacjenta', 'Zegar narzuca pilność punkcji lędźwiowej w dynamicznych spadkach poznawczych.'],
        ['Podaje z góry dokładną datę zgonu pacjenta z marginesem do 1 dnia', 'Medycyna nie dysponuje narzędziami do deterministycznego przewidywania daty zgonu.'],
        'psych-rpd-clock-q2'
      ),
      q(
        '70-letni pacjent w ciągu 8 tygodni traci zdolność chodzenia (ataksja), dołączają gwałtowne zrywy mięśniowe po klaśnięciu w dłonie (mioklonie wyzwalane bodźcem) oraz głębokie otępienie. Co jest najbardziej prawdopodobną hipotezą roboczą?',
        ['Podejrzenie choroby prionowej (sporadyczna choroba Creutzfeldta-Jakoba — sCJD)', 'Triada: szybko postępujące otępienie w kilka tygodni, mioklonie bodźcowe (startle) i ataksja to klasyczny obraz sCJD wymagający testu RT-QuIC i MRI DWI.'],
        ['Typowy, łagodny przebieg choroby Alzheimera', 'Choroba Alzheimera nie doprowadza do głębokiego otępienia z ataksją w ciągu 8 tygodni.'],
        ['Przemęczenie pracą w ogródku działkowym', 'Tak gwałtowny zespół neurologiczny nigdy nie jest wynikiem zmęczenia fizycznego.'],
        'psych-rpd-clock-q3'
      ),
      q(
        'Dlaczego ujemny wynik przeciwciał przeciwko receptorom NMDA w surowicy krwi NIE wyklucza autoimmunologicznego zapalenia mózgu?',
        ['Ponieważ swoiste przeciwciała mogą być produkowane wewnątrzpłynowo (intrathecal synthesis), a badanie płynu mózgowo-rdzeniowego ma znacznie wyższą czułość', 'W zapaleniu anty-NMDAR miano przeciwciał w PMR bezpośrednio koreluje z procesem w OUN, podczas gdy we krwi obwodowej może pozostać ujemne.'],
        ['Ponieważ przeciwciała we krwi zamieniają się w hemoglobinę po 2 godzinach', 'Przeciwciała nie przekształcają się w hemoglobinę; różnica wynika z kompartmentowości bariery krew-mózg.'],
        ['Ponieważ krew jest całkowicie pozbawiona białek układu odpornościowego', 'Krew zawiera immunoglobuliny, lecz ich stężenie w surowicy może być niewystarczające we wczesnej fazie.'],
        'psych-rpd-clock-q4'
      ),
      q(
        'Które z wymienionych schorzeń stanowi w pełni odwracalną przyczynę ostrego/podostrego zespołu otępiennego przy wczesnym wdrożeniu leczenia?',
        ['Encefalopatia Wernickego (niedobór tiaminy — witaminy B1) oraz ciężka niedoczynność tarczycy', 'Natychmiastowe podanie wysokich dawek tiaminy parenteralnie lub lewotyroksyny potrafi całkowicie odwrócić objawy encefalopatyczne.'],
        ['Zaawansowana choroba Huntingtona z mutacją 55 powtórzeń CAG', 'Pląsawica Huntingtona jest nieuleczalną chorobą genetyczną o charakterze postępującym.'],
        ['Sporadyczna postać stwardnienia zanikowego bocznego (SLA)', 'SLA jest postępującą chorobą neuronu ruchowego bez możliwości pełnego odwrócenia zmian.'],
        'psych-rpd-clock-q5'
      ),
    ],
  },

  {
    id: 'bpsd-objawy-behawioralne-i-psychologiczne',
    moduleId: 'psych-organiczne',
    title: 'BPSD: pobudzenie, agresja i psychoza w otępieniu',
    subtitle: 'Poszukiwanie odwracalnych przyczyn (ból, ZUM, retencja), interwencje niefarmakologiczne i ryzyko neuroleptyków',
    group: 'Geriatria kliniczna, bezpieczeństwo i etyka',
    minutes: 18,
    goals: [
      'Zrozumiesz i wdrożysz zasadę „najpierw poszukaj przyczyny” (Search for Cause) w każdym nowym epizodzie BPSD.',
      'Zidentyfikujesz ból, zaparcie, zatrzymanie moczu i infekcję jako główne wyzwalacze agresji i krzyku.',
      'Poznasz ograniczenia i ryzyko leków przeciwpsychotycznych w otępieniu (udar mózgu, 1,5–1,8x wzrost śmiertelności).',
    ],
    sections: [
      {
        title: 'BPSD jako niespecyficzna manifestacja cierpienia i niezaspokojonych potrzeb',
        text: 'Objawy behawioralne i psychologiczne w otępieniu (Behavioural and Psychological Symptoms of Dementia — BPSD) obejmują: pobudzenie psychoruchowe, agresję fizyczną i słowną, urojenia (np. niewierności małżeńskiej, złodziei w domu — zespół „okradania”), omamy, błądzenie (wandering), zaburzenia snu i wokalizacje. W zaawansowanym otępieniu pacjent traci zdolność werbalnego zgłaszania dolegliwości — agresja przy toalecie jest często jedynym dostępnym sposobem zakomunikowania ostrego bólu kolana lub pieczenia przy oddawaniu moczu.',
      },
      {
        title: 'Algorytm poszukiwania odwracalnych wyzwalaczy',
        text: 'Pojawienie się nowego lub zaostrzenie dotychczasowego pobudzenia NIE jest wskazaniem do automatycznego włączenia leku przeciwpsychotycznego. Obowiązuje systematyczna weryfikacja: 1) Ból somatyczny (choroba zwyrodnieniowa, odleżyna, uraz po upadku — ocena skalami behawioralnymi Doloplus/PAINAD); 2) Infekcja (bezobjawowy ZUM, zapalenie płuc); 3) Zatrzymanie moczu lub zaklinowanie stolca; 4) Leki (włączenie leku antycholinergicznego, odstawienie leku nasennego); 5) Przebodźcowanie środowiskowe (hałas, nieznana łazienka, zmiana opiekuna).',
      },
      {
        title: 'Leki przeciwpsychotyczne w otępieniu: ograniczenia i czarna ramka',
        text: 'Leki przeciwpsychotyczne (np. risperidon — jedyny zarejestrowany w UE do krótkotrwałego leczenia BPSD w AD) wiążą się z czarną ramką ostrzegawczą (Black Box Warning): 1,5–1,8-krotnym wzrostem śmiertelności ogólnej oraz 3-krotnym wzrostem incydentów naczyniowo-mózgowych (udar mózgu/TIA). Wytyczne NICE NG97 dopuszczają ich stosowanie WYŁĄCZNIE wtedy, gdy pacjent doświadcza ciężkiego cierpienia lub stanowi bezpośrednie zagrożenie przemocą fizyczną dla siebie i otoczenia, po wyczerpaniu metod niefarmakologicznych — w najmniejszej dawce i przez najkrótszy czas (do 6–12 tygodni z próbą odstawienia).',
      },
    ],
    table: {
      headers: ['Objaw BPSD', 'Najczęstsza ukryta przyczyna somatyczna', 'Pierwszy krok niefarmakologiczny', 'Rola farmakoterapii'],
      rows: [
        ['Agresja podczas toalety', 'Ból stawów lub pęcherza moczowego', 'Delikatny dotyk, ciepło, paracetamol przed myciem', 'Niewskazana bez opanowania bólu'],
        ['Błądzenie nocne (wandering)', 'Dezorientacja w ciemności, potrzeba mikcji', 'Oświetlenie drogi do toalety, tabliczki wizualne', 'Brak wskazań do neuroleptyków'],
        ['Podejrzenia o kradzież emerytury', 'Utrata pamięci miejsca schowania pieniędzy', 'Niewchodzenie w spór, potwierdzenie emocji, odwrócenie uwagi', 'Unikanie eskalacji leków'],
        ['Ciężkie pobudzenie z przemocą', 'Nałożone ostre delirium somatyczne', 'Zapewnienie bezpieczeństwa, deeskalacja', 'Krótkoterminowo mała dawka atypowego (SGA)'],
      ],
    },
    advanced:
      'W badaniach CATIE-AD wykazano, że korzyści ze stosowania atypowych leków przeciwpsychotycznych w otępieniu były równoważone przez działania niepożądane (senność, sedacja, objawy pozapiramidowe, zaburzenia chodu, upadki i infekcje dróg oddechowych). Z tego względu leki te nigdy nie powinny być stosowane jako rutynowe „uspokajacze” u osób z demencją.',
    summary:
      'Każde nowe pobudzenie w otępieniu wymaga poszukiwania bólu, infekcji i retencji moczu. Leki przeciwpsychotyczne niosą udokumentowane ryzyko udaru i zgonu, dlatego mogą być stosowane wyłącznie w skrajnym zagrożeniu i przez krótki czas.',
    sourceIds: ['nice-ng97-dementia', 'ags-beers-criteria-2023'],
    questions: [
      q(
        '82-letnia pacjentka z chorobą Alzheimera staje się nagle agresywna, krzyczy i bije opiekunkę za każdym razem, gdy ta próbuje zmienić jej pieluchę. Jaki krok powinien podjąć lekarz w pierwszej kolejności?',
        ['Zastosować behawioralną ocenę bólu (np. skala PAINAD) oraz zbadać pacjentkę pod kątem zakażenia układu moczowego, odparzeń lub bólu stawów biodrowych', 'Pobudzenie wyzwalane manipulacją pielęgnacyjną prawie zawsze wynika z bólu fizycznego; leczenie analgetyczne często całkowicie eliminuje agresję.'],
        ['Natychmiast włączyć olanzapinę w dawce 10 mg dwa razy na dobę bez badania fizykalnego', 'Podanie wysokiej dawki neuroleptyku bez zbadania przyczyny bólu maskuje cierpienie i drastycznie zwiększa ryzyko upadku i zgonu.'],
        ['Wypisać skierowanie do zakładu karnego za napaść na personel', 'Zachowanie jest manifestacją choroby neurodegeneracyjnej i somatycznego bólu, nie przestępstwem.'],
        'psych-bpsd-hunt-q1'
      ),
      q(
        'Dlaczego leki przeciwpsychotyczne (zarówno typowe, jak i atypowe) są opatrzone ostrzeżeniem regulatorów (Black Box Warning) w leczeniu otępienia?',
        ['Z powodu udokumentowanego 1,5–1,8-krotnego wzrostu śmiertelności ogólnej oraz około 3-krotnego wzrostu ryzyka udaru mózgu i TIA', 'Metaanalizy randomizowanych badań klinicznych jednoznacznie potwierdziły istotny wzrost ryzyka sercowo-naczyniowego i zgonów.'],
        ['Ponieważ leki te w 100% przypadków zamieniają krew pacjenta w roztwór soli', 'Taka teza jest biologicznie niemożliwa; ostrzeżenie dotyczy udarów i zgonów naczyniowych.'],
        ['Ponieważ leki przeciwpsychotyczne leczą wyłącznie choroby pasożytnicze wątroby', 'Leki te działają na receptory OUN (D2, 5-HT2A).'],
        'psych-bpsd-hunt-q2'
      ),
      q(
        'Który lek przeciwpsychotyczny posiada w Unii Europejskiej rejestrację do krótkotrwałego (do 6 tygodni) leczenia uporczywej agresji w otępieniu typu Alzheimera po wyczerpaniu metod niefarmakologicznych?',
        ['Rysperydon w małych dawkach (0,25–1 mg/dobę)', 'Rysperydon jest jedynym SGA zarejestrowanym w tym wskazaniu, z zaleceniem regularnej reewaluacji i próby odstawienia.'],
        ['Klozapina w dawce 400 mg/dobę', 'Klozapina nie jest lekiem pierwszego rzutu w BPSD z powodu sedacji, hipotonii i agranulocytozy.'],
        ['Haloperidol w dożylnym wlewie ciągłym', 'Haloperidol dożylny u seniora niesie skrajne ryzyko torsade de pointes i ciężkich objawów pozapiramidowych.'],
        'psych-bpsd-hunt-q3'
      ),
      q(
        'Jak powinna zareagować rodzina 79-letniego chorego z otępieniem, który oskarża córkę o kradzież portfela (który sam ukrył w tapczanie)?',
        ['Unikać konfrontacji i kłótni, potwierdzić emocję lęku pacjenta („rozumiem, że martwi cię portfel”), a następnie odwrócić uwagę inną aktywnością', 'Wchodzenie w logiczny spór wzmaga lęk i agresję; walidacja emocjonalna i dystrakcja są podstawową techniką niefarmakologiczną.'],
        ['Zamknąć pacjenta w piwnicy na 24 godziny w celu wymuszenia przeprosin', 'Pozbawianie wolności i izolacja są niedopuszczalną przemocą nasilającą delirium.'],
        ['Natychmiast wezwać policję i złożyć doniesienie o zniesławieniu', 'Urojenia wynikają z neurodegeneracji i nie podlegają odpowiedzialności karnej.'],
        'psych-bpsd-hunt-q4'
      ),
      q(
        'Kiedy według wytycznych NICE NG97 dopuszczalne jest rozważenie leku przeciwpsychotycznego u pacjenta z BPSD?',
        ['Wyłącznie w sytuacji ciężkiego cierpienia pacjenta lub bezpośredniego zagrożenia zranieniem siebie bądź innych osób, gdy metody niefarmakologiczne zawiodły', 'Wskazania są wąskie i rygorystyczne; leki nie powinny być stosowane z powodu błądzenia, wokalizacji czy łagodnego niepokoju.'],
        ['Zawsze przy każdej wizycie jako rutynowa profilaktyka zachowań agresywnych', 'Rutynowe profilaktyczne stosowanie neuroleptyków w otępieniu jest błędem sztuki.'],
        ['Wyłącznie wtedy, gdy pacjent wyrazi pisemną zgodę w obecności 3 notariuszy', 'W stanach nagłego zagrożenia obowiązują procedury medyczne, nie potrójne akty notarialne.'],
        'psych-bpsd-hunt-q5'
      ),
    ],
  },

  {
    id: 'psychofarmakologia-wieku-podeszlego',
    moduleId: 'psych-organiczne',
    title: 'Psychofarmakologia geriatryczna: polifarmacja, Beers i ACB',
    subtitle: 'Kryteria Beers 2023, obciążenie antycholinergiczne, czynność nerek, upadki i bezpieczeństwo BZD',
    group: 'Geriatria kliniczna, bezpieczeństwo i etyka',
    minutes: 19,
    goals: [
      'Przeprowadzisz przegląd lekowy (Geriatric Medication Review) z oceną obciążenia antycholinergicznego w skali ACB.',
      'Zastosujesz kryteria AGS Beers 2023 jako narzędzie wsparcia decyzji (decision-support), unikając traktowania ich jako sztywnego prawa.',
      'Zrozumiesz odmienności farmakokinetyczne seniorów: spadek GFR, dystrybucję leków lipofilnych i podatność na upadki.',
    ],
    sections: [
      {
        title: 'Farmakokinetyka starzejącego się organizmu: „start low, go slow”',
        text: 'Z wiekiem dochodzi do fizjologicznego spadku przesączania kłębuszkowego (GFR — często ukrytego z powodu niskiej masy mięśniowej i fałszywie prawidłowej kreatyniny), zmniejszenia objętości wody w organizmie oraz wzrostu udziału tkanki tłuszczowej. Leki lipofilne (np. diazepam) wykazują dramatyczne wydłużenie okresu półtrwania (z 30 do ponad 100 godzin), co prowadzi do kumulacji, sedacji i ataksji. Spadek rezerwy wątrobowej CYP i polifarmacja potęgują ryzyko nieprzewidywalnych interakcji.',
      },
      {
        title: 'Obciążenie antycholinergiczne (ACB): cichy wróg kognicji',
        text: 'Leki o działaniu antycholinergicznym blokują postsynaptyczne receptory muskarynowe M1 w hipokampie i korze czołowej, imitując lub pogłębiając objawy otępienia. Skala ACB (Anticholinergic Cognitive Burden) przypisuje lekom punkty: 1 (słabe, np. sertralina, metoprolol, trazodon), 2 (umiarkowane) oraz 3 (silne, np. hydroksyzyna, oksybutynina, amitryptylina, klozapina, klemastyna). Łączny wynik ACB >= 3 wiąże się ze statystycznym wzrostem ryzyka majaczenia, przyspieszonego spadku poznawczego, zaparć, ostrego zatrzymania moczu i upadków.',
      },
      {
        title: 'Kryteria AGS Beers 2023: wsparcie decyzji, nie prawo karne',
        text: 'Kryteria Beers American Geriatrics Society (aktualizacja 2023) to zwalidowane narzędzie wsparcia decyzji (decision-support tool) identyfikujące leki potencjalnie nieodpowiednie (Potentially Inappropriate Medications — PIM) u osób >=65 r.ż. Zalecają unikanie m.in. benzodiazepin i leków z grupy Z (ryzyko upadków, złamań i delirium), leków silnie antycholinergicznych oraz neuroleptyków. Ważna zasada: obecność leku na liście Beers nie oznacza bezwzględnego błędu w sztuce — istnieją wyjątki kliniczne (np. BZD w zespole odstawiennym czy katatonii), a decyzja wymaga indywidualnej oceny korzyści i ryzyka.',
      },
    ],
    table: {
      headers: ['Grupa leków', 'Kluczowe ryzyko geriatryczne wg Beers', 'Punktacja ACB', 'Bezpieczniejsza alternatywa'],
      rows: [
        ['Hydroksyzyna', 'Silna sedacja, zaburzenia pamięci, delirium', 'ACB = 3 (silne)', 'Trazodon w mikrodawce, melatonina, higiena snu'],
        ['Oksybutynina', 'Zaostrzenie otępienia, zatrzymanie moczu', 'ACB = 3 (silne)', 'Mirabegron (agonista beta-3), trening pęcherza'],
        ['Zolpidem / Zopiklon', 'Upadki w nocy, złamania szyjki udowej, splątanie', 'ACB = 0 (lecz sedacja)', 'CBT-I (terapia poznawczo-behawioralna bezsenności)'],
        ['Amitryptylina', 'Hipotonia ortostatyczna, arytmie, splątanie', 'ACB = 3 (silne)', 'Sertralina, escitalopram, duloksetyna w bólu'],
      ],
    },
    advanced:
      'W ocenie czynności nerek u seniora nie należy polegać wyłącznie na stężeniu kreatyniny w surowicy; obligatoryjne jest wyliczenie klirensu kreatyniny wzorem Cockcrofta-Gaulta lub eGFR (CKD-EPI). U pacjenta z wyniszczeniem mięśniowym kreatynina 0,8 mg/dl może odpowiadać skrajnemu upośledzeniu filtracji (eGFR < 30 ml/min).',
    summary:
      'Psychofarmakoterapia geriatryczna wymaga minimalizacji obciążenia antycholinergicznego (ACB) i ostrożności wobec BZD/Z-drugs wg Beers 2023. Zmniejszony klirens nerkowy i wydłużona eliminacja leków lipofilnych nakazują zasadę stopniowego miareczkowania.',
    sourceIds: ['ags-beers-criteria-2023', 'acb-boustani-2008', 'nice-ng97-dementia'],
    questions: [
      q(
        '83-letni pacjent z łagodnymi zaburzeniami poznawczymi otrzymuje od urologa oksybutyninę na nietrzymanie moczu, od internisty hydroksyzynę na świąd skóry i od psychiatry amitryptylinę w małej dawce na ból neuropatyczny. Jakie jest łączne obciążenie ACB tego zestawu?',
        ['Bardzo wysokie (ACB = 9 pkt: 3 + 3 + 3), niosące krytyczne ryzyko ostrego delirium, nasilenia otępienia, zatrzymania moczu i upadków', 'Każdy z tych trzech leków posiada maksymalną punktację ACB = 3; kumulacja blokady muskarynowej drastycznie upośledza funkcje poznawcze seniora.'],
        ['Wynik ACB wynosi 0 punktów, ponieważ leki te nie wpływają na układ cholinergiczny', 'Wszystkie 3 wymienione substancje są klasycznymi, silnymi antagonistami receptorów muskarynowych.'],
        ['Wynik wynosi dokładnie 1 punkt i jest całkowicie bezpieczny dla 90-latka', 'ACB = 9 jest jednym z najwyższych spotykanych w polifarmacji geriatrycznej i wymaga pilnej depreskrypcji.'],
        'psych-ger-pharm-q1'
      ),
      q(
        'Jak należy traktować kryteria AGS Beers 2023 w codziennej praktyce lekarskiej w Polsce i Europie?',
        ['Jako narzędzie wsparcia decyzji (decision-support) identyfikujące leki potencjalnie nieodpowiednie, wymagające indywidualnej oceny klinicznej, a nie jako bezwzględny zakaz prawny', 'Kryteria Beers ostrzegają przed typowymi powikłaniami, lecz w uzasadnionych sytuacjach (np. opieka paliatywna) stosowanie leku z listy może być właściwym wyborem.'],
        ['Jako kodeks karny przewidujący automatyczną utratę prawa wykonywania zawodu za podanie hydroksyzyny', 'Kryteria Beers są zaleceniem towarzystwa naukowego, a nie prawem karnym.'],
        ['Jako zalecenie dotyczące wyłącznie dawkowania antybiotyków u noworodków', 'Kryteria Beers dotyczą pacjentów geriatrycznych w wieku >=65 lat.'],
        'psych-ger-pharm-q2'
      ),
      q(
        'Dlaczego benzodiazepiny o długim okresie półtrwania (np. diazepam) są szczególnie niebezpieczne u pacjentów geriatrycznych?',
        ['Wzrost zawartości tkanki tłuszczowej i spadek klirensu wydłużają okres półtrwania diazepamu do ponad 100 godzin, prowadząc do kumulacji, ataksji i złamań biodra', 'Lipofilny lek kumuluje się w organizmie seniora, wywołując przewlekłą sedację dzienną i zwiotczenie mięśni sprzyjające upadkom.'],
        ['Ponieważ diazepam u seniorów natychmiast wywołuje zawał mięśnia sercowego', 'Diazepam nie jest bezpośrednią przyczyną zawału; grozi powikłaniami sedatywno-upadkowymi.'],
        ['Ponieważ diazepam u osób starszych działa wyłącznie jako stymulant dopaminowy', 'Diazepam jest modulatorem allosterycznym receptora GABA-A, nie stymulantem.'],
        'psych-ger-pharm-q3'
      ),
      q(
        'Co jest zalecaną alternatywą o niższym obciążeniu antycholinergicznym dla oksybutyniny w leczeniu zespołu pęcherza nadreaktywnego u pacjenta z zaburzeniami poznawczymi?',
        ['Mirabegron (selektywny agonista receptorów beta-3 adrenergicznych) lub ustrukturyzowany trening mięśni dna miednicy', 'Mirabegron rozluźnia mięsień wypieracz pęcherza na drodze adrenergicznej, nie blokując receptorów muskarynowych w OUN (ACB = 0).'],
        ['Zwiększenie dawki amitryptyliny do 150 mg na noc', 'Amitryptylina potęguje obciążenie antycholinergiczne i może doprowadzić do anurii.'],
        ['Podanie haloperidolu domięśniowo', 'Haloperidol nie leczy pęcherza nadreaktywnego i niesie ryzyko parkinsonizmu.'],
        'psych-ger-pharm-q4'
      ),
      q(
        'Dlaczego u wyniszczonego 85-letniego pacjenta prawidłowe stężenie kreatyniny (0,7 mg/dl) może maskować ciężką niewydolność nerek?',
        ['Z powodu ubytku masy mięśniowej (sarkopenii) produkcja endogennej kreatyniny jest znikoma, przez co stężenie w surowicy nie odzwierciedla spadku filtracji kłębuszkowej', 'U seniora z niską masą mięśniową GFR może wynosić <30 ml/min mimo pozornie prawidłowego wyniku kreatyniny (konieczne wyliczenie eGFR/klirensu).'],
        ['Ponieważ nerki u osób starszych filtrują krew przez skórę', 'Filtracja kłębuszkowa zachodzi w nerkach, nie przez skórę.'],
        ['Ponieważ kreatynina u osób starszych ulega rozpadowi do glukozy', 'Kreatynina jest metabolitem fosfokreatyny mięśniowej wydalanym przez nerki.'],
        'psych-ger-pharm-q5'
      ),
    ],
  },

  {
    id: 'depresja-wieku-podeszlego-i-poznanie',
    moduleId: 'psych-organiczne',
    title: 'Depresja wieku podeszłego, kognicja i suicydalność',
    subtitle: 'Interakcja afekt-poznanie, granice pojęcia pseudootępienia, samobójstwa u seniorów i farmakoterapia',
    group: 'Geriatria kliniczna, bezpieczeństwo i etyka',
    minutes: 18,
    goals: [
      'Rozpoznasz specyfikę depresji geriatrycznej: dominacja skarg somatycznych, anhedonii i lęku nad jawnym smutkiem.',
      'Zrozumiesz ograniczenia pojęcia „otępienia rzekomego” (pseudodementia) i mechanizmy depresji naczyniowej.',
      'Ocenisz wysokie ryzyko samobójcze u starszych mężczyzn i wdrożysz bezpieczną farmakoterapię (unikanie TLPD).',
    ],
    sections: [
      {
        title: 'Fenotyp geriatryczny: depresja bez smutku (Depression without sadness)',
        text: 'Depresja wieku podeszłego często manifestuje się nietypowo. Zamiast deklarowanego smutku dominują: uporczywe skargi somatyczne (bóle brzucha, zaparcia, pieczenie w klatce piersiowej bez korelacji narządowej), anhedonia, spowolnienie psychoruchowe lub niepokój manipulacyjny, bezsenność oraz lęk hipochondryczny. Pacjenci wykazują postawę rezygnacyjną i zgłaszają „brak sił do życia”.',
      },
      {
        title: 'Interakcja afekt a kognicja: ewolucja pojęcia pseudodementia',
        text: 'Historyczny termin „otępienie rzekome” sugerował, że deficyty poznawcze w depresji są jedynie odwracalną iluzją. Współczesna neuropsychiatria wskazuje, że ubytek szybkości przetwarzania, uwagi i funkcji wykonawczych w depresji geriatrycznej ma realne podłoże biologiczne (hipoperfuzja czołowa, uszkodzenia istoty białej — hipoteza depresji naczyniowej). U około 30–50% seniorów, u których objawy poznawcze ustąpiły po wyleczeniu depresji, w ciągu kolejnych 3–5 lat rozwija się jawne otępienie neurodegeneracyjne.',
      },
      {
        title: 'Suicydalność seniorów i zasady leczenia',
        text: 'Mężczyźni w wieku powyżej 75–80 lat stanowią grupę o najwyższym wskaźniku dokonanych samobójstw w populacji. Próby samobójcze u seniorów charakteryzują się: wysoką intencjonalnością, brutalnością metod i rzadkimi sygnałami ostrzegawczymi (mniej prób manipulacyjnych, wyższa śmiertelność). W leczeniu lekami pierwszego wyboru są SSRI (sertralina, escitalopram) z uwagi na brak kardiotoksyczności i zerowy indeks ACB; należy bezwzględnie unikać trójpierścieniowych leków przeciwdepresyjnych (TLPD) z powodu ryzyka arytmii, zapaści i letalności w przedawkowaniu.',
      },
    ],
    table: {
      headers: ['Wymiar oceny', 'Depresja geriatryczna z deficytem poznawczym', 'Wczesna choroba Alzheimera'],
      rows: [
        ['Początek objawów', 'Dość precyzyjnie określany przez pacjenta („od kilku tygodni”)', 'Podstępny, nieuchwytny, bagatelizowany przez chorego'],
        ['Wgląd w ubytki pamięci', 'Wyolbrzymianie trudności, niepokój z powodu zapominania', 'Pomniejszanie deficytów, anozognozja, maskowanie błędów'],
        ['Postawa w testach', 'Zniechęcenie, szybkie rezygnacje („nie wiem, nie potrafię”)', 'Wysiłek, konfabulacje, próby zatuszowania pomyłek'],
        ['Odpowiedź na podpowiedzi', 'Poprawa wyników przy motywacji i wskazówkach', 'Brak poprawy w konsolidacji pamięci hipokampalnej'],
      ],
    },
    advanced:
      'W przypadku ciężkiej depresji psychotycznej wieku podeszłego, skrajnego odmóżdżającego osłupienia depresyjnego lub braku przyjmowania płynów i pokarmów, metodą leczenia o najwyższej skuteczności i najszybszym efekcie są elektrowstrząsy (ECT). Wiek podeszły nie jest przeciwwskazaniem do ECT, a zabieg cechuje się wyższym profilem bezpieczeństwa niż wysokie dawki kardiotoksycznych leków.',
    summary:
      'Depresja geriatryczna często przebiega pod maską somatyczną i niesie wysokie ryzyko samobójcze. Zaburzenia poznawcze w depresji wymagają czujności, gdyż mogą stanowić zwiastun rozwijającego się procesu neurodegeneracyjnego.',
    sourceIds: ['nice-depression', 'cssrs-scale', 'nice-ng97-dementia'],
    questions: [
      q(
        '81-letni samotny mężczyzna po udarze mózgu skarży się na brak sił, zaparcia i bóle mięśniowe. W gabinecie powtarza: „jestem tylko ciężarem, niedługo wszystko się skończy”, a pytany o pamięć odpowiada zniecierpliwiony: „nie wiem, nic nie pamiętam”. Jak należy ocenić jego stan?',
        ['Stan wysokiego ryzyka samobójczego w przebiegu ciężkiego epizodu depresji wieku podeszłego, wymagający pilnej oceny planów suicydalnych i wdrożenia bezpieczeństwa', 'Starszy samotny mężczyzna z poczuciem bycia ciężarem i aluzjami do końca życia znajduje się w grupie najwyższego ryzyka dokonanego samobójstwa.'],
        ['Naturalny stan pogodzenia się z losem niewymagający żadnej interwencji', 'Poczucie bycia ciężarem i rezygnacja są objawami depresji, a nie zdrowym starzeniem się.'],
        ['Brak jakiegokolwiek ryzyka, ponieważ pacjenci po 80 r.ż. nigdy nie podejmują prób samobójczych', 'Seniorzy cechują się najwyższym wskaźnikiem zgonów samobójczych w całej populacji.'],
        'psych-dep-ger-q1'
      ),
      q(
        'Dlaczego u chorego w podeszłym wieku z ciężkim epizodem depresyjnym należy bezwzględnie unikać włączania trójpierścieniowych leków przeciwdepresyjnych (TLPD, np. amitryptylina)?',
        ['Z powodu silnego działania kardiotoksycznego (wydłużenie QTc, bloki p-k, arytmie komorowe), hipotonii ortostatycznej i wysokiego obciążenia antycholinergicznego (ACB = 3)', 'TLPD niosą śmiertelne ryzyko w przedawkowaniu, prowokują majaczenie i upadki u chorych w podeszłym wieku.'],
        ['Ponieważ TLPD wywołują natychmiastową utratę wzroku u każdego człowieka', 'TLPD mogą dawać zaburzenia akomodacji, lecz nie ślepotę; głównym zagrożeniem jest kardiotoksyczność.'],
        ['Ponieważ TLPD wolno stosować wyłącznie u kobiet w ciąży', 'TLPD są lekami przeciwdepresyjnymi starej generacji, nie dedykowanymi dla ciężarnych.'],
        'psych-dep-ger-q2'
      ),
      q(
        'Jak współczesna neuropsychiatria interpretuje zjawisko ustąpienia deficytów poznawczych po skutecznym wyleczeniu geriatrycznego epizodu depresyjnego?',
        ['Jako stan podwyższonego ryzyka rozwoju jawnego otępienia w perspektywie kilku lat, wymagający okresowej kontroli neuropsychologicznej', 'Deficyty poznawcze w depresji geriatrycznej często odzwierciedlają wczesną dysfunkcję naczyniową lub prodromalną neurodegenerację.'],
        ['Jako stuprocentową gwarancję nieśmiertelności neuronów mózgowych do końca życia', 'Wyleczenie epizodu nie gwarantuje braku późniejszej demencji.'],
        ['Jako dowód na to, że pacjent symulował depresję dla uzyskania renty', 'Epizod depresyjny jest realnym stanem biologicznym, a nie symulacją.'],
        'psych-dep-ger-q3'
      ),
      q(
        'Który lek przeciwdepresyjny jest zalecany jako bezpieczny wybór pierwszego rzutu u starszego pacjenta z depresją i chorobą niedokrwienną serca?',
        ['Sertralina w stopniowo miareczkowanej dawce (np. od 25 mg/d)', 'Sertralina posiada udokumentowane bezpieczeństwo kardiologiczne (badanie SADHART), brak istotnego wpływu antycholinergicznego i niski potencjał interakcji.'],
        ['Klomipramina w dawce dożylnej 150 mg/dobę', 'Klomipramina jest silnym TLPD o wysokim ryzyku kardiologicznym.'],
        ['Wyciąg z dziurawca w niekontrolowanych dawkach w połączeniu z fenelzyną', 'Połączenie niesie śmiertelne ryzyko przełomu nadciśnieniowego i zespołu serotoninowego.'],
        'psych-dep-ger-q4'
      ),
      q(
        'Jaka jest rola terapii elektrowstrząsowej (ECT) u starszych pacjentów z ciężką depresją psychotyczną lub zagrażającym życiu odmóżdżającym osłupieniem?',
        ['Jest wysoce skuteczną, bezpieczną i ratującą życie metodą leczenia o szybszym początku działania niż farmakoterapia wielolekowa', 'Wiek podeszły nie jest przeciwwskazaniem do ECT; zabiegi cechują się ponad 80% skutecznością w ciężkiej geriatrycznej depresji.'],
        ['Jest metodą zakazaną przez wszystkie międzynarodowe towarzystwa medyczne', 'ECT jest uznaną procedurą medyczną w wytycznych APA, NICE i Polskiego Towarzystwa Psychiatrycznego.'],
        ['Służy wyłącznie do leczenia bezsenności o łagodnym nasileniu', 'ECT stosuje się w stanach ciężkich i zagrażających życiu, nie w łagodnej bezsenności.'],
        'psych-dep-ger-q5'
      ),
    ],
  },

  {
    id: 'zdolnosc-decyzyjna-capacity-i-safeguarding',
    moduleId: 'psych-organiczne',
    title: 'Zdolność decyzyjna (capacity), safeguarding i wywiad od opiekuna',
    subtitle: 'Czteroelementowy model oceny, specyficzność decyzyjna i czasowa, ochrona praw seniora i przeciążenie opiekuna',
    group: 'Geriatria kliniczna, bezpieczeństwo i etyka',
    minutes: 19,
    goals: [
      'Zastosujesz ustrukturyzowany model oceny zdolności do podejmowania decyzji (Mental Capacity Act: 4 domeny).',
      'Zrozumiesz zasadę: diagnoza otępienia nie jest tożsama z utratą zdolności decyzyjnej we wszystkich sprawach.',
      'Zidentyfikujesz zjawisko przeciążenia opiekuna (caregiver burden) i wdrożysz procedury ochrony (safeguarding / niebieska karta).',
    ],
    sections: [
      {
        title: 'Zdolność decyzyjna: decision-specific i time-specific',
        text: 'Zdolność do podejmowania decyzji (decision-making capacity) nie jest cechą globalną orzekaną raz na zawsze. Obowiązują dwie zasady kardynalne: 1) Specyficzność wobec decyzji (decision-specific) — pacjent z umiarkowanym otępieniem może nie mieć zdolności do sprzedaży nieruchomości lub zrozumienia skomplikowanej operacji kardiochirurgicznej, lecz w pełni zachowywać zdolność do wyboru posiłku, zgody na pobranie krwi czy wyznaczenia osoby bliskiej; 2) Specyficzność wobec czasu (time-specific) — w stanach z fluktuacjami (delirium) zdolność decyzyjna może zmieniać się z godziny na godzinę.',
      },
      {
        title: 'Czteroelementowy model funkcjonalny (Mental Capacity Framework)',
        text: 'Do uznania, że pacjent posiada zdolność do podjęcia konkretnej decyzji w danym momencie, konieczne jest spełnienie 4 warunków: 1) Zrozumienie informacji istotnych dla decyzji (Understanding: korzyści, ryzyko, alternatywy); 2) Zatrzymanie informacji w pamięci przez czas niezbędny do dokonania wyboru (Retention); 3) Zdolność do wyważenia i logicznego rozważenia informacji (Weighing/Reasoning: ocena konsekwencji wyboru i odmowy); 4) Zdolność do zakomunikowania decyzji (Communicating: słownie, gestem, pismem). Brak którejkolwiek domeny oznacza brak capacity w odniesieniu do tej decyzji.',
      },
      {
        title: 'Safeguarding, wywiad od osób trzecich i przeciążenie opiekuna',
        text: 'Opieka nad pacjentem z zespołem otępiennym wiąże się ze skrajnym obciążeniem fizycznym i emocjonalnym opiekuna (caregiver burden / wypalenie opiekuna). Nierozpoznane przeciążenie prowadzi do załamania opieki, a w skrajnych przypadkach do zaniedbania lub przemocy (elder abuse / safeguarding issues). Kluczową rolę odgrywa regularny, osobny wywiad z opiekunem: ocena snu opiekuna, wsparcia środowiskowego, objawów depresji oraz weryfikacja bezpieczeństwa podawania leków.',
      },
    ],
    table: {
      headers: ['Domena capacity', 'Pytanie badające przyłóżkowo', 'Przykładowa dysfunkcja w otępieniu'],
      rows: [
        ['1. Understanding (Zrozumienie)', '„Czy rozumie Pan/Pani, dlaczego proponujemy pozostanie w szpitalu?”', 'Pacjent uważa, że jest w hotelu i nic mu nie dolega'],
        ['2. Retention (Zatrzymanie)', '„Czy pamięta Pan/Pani, jakie ryzyko wiąże się z przerwaniem leczenia?”', 'Pacjent zapomina treść rozmowy po 15 sekundach'],
        ['3. Weighing (Wyważenie)', '„Jakie mogą być konsekwencje powrotu do domu bez tlenu?”', 'Pacjent ignoruje ryzyko śmierci z powodu urojeń'],
        ['4. Communicating (Zakomunikowanie)', '„Jaki jest ostateczny Pana/Pani wybór po rozważeniu opcji?”', 'Brak możliwości kontaktu z powodu afazji całkowitej lub mutyzmu'],
      ],
    },
    advanced:
      'W polskim prawie medycznym i prawie cywilnym odróżnia się zgodę poinformowaną (informed consent) pacjenta przytomnego od procedur zgody zastępczej (sąd opiekuńczy, przedstawiciel ustawowy). Jeśli pacjent nie ubezwłasnowolniony nie posiada zdolności do świadomego wyrażenia zgody z powodu ostrych zaburzeń świadomości, a stan zagraża życiu, lekarz ma prawo podjąć działania ratunkowe na mocy ustawy o zawodach lekarza i lekarza dentysty.',
    summary:
      'Diagnoza otępienia nie odbiera automatycznie zdolności decyzyjnej. Ocena capacity jest zawsze zorientowana na konkretną decyzję i moment czasowy, wymagając zbadania 4 domen funkcjonalnych. Integralną częścią opieki jest ochrona seniora (safeguarding) i wsparcie opiekuna.',
    sourceIds: ['mca-2005-capacity', 'nice-ng97-dementia'],
    questions: [
      q(
        '80-letni pacjent z łagodnym otępieniem w chorobie Alzheimera ma zapalenie płuc i odmawia hospitalizacji, twierdząc: „wiem, że mogę się udusić w domu, ale wolę umrzeć we własnym łóżku niż w szpitalu”. Rozumie ryzyko, pamięta argumenty lekarza i logicznie waży opcje. Jak należy ocenić jego zdolność decyzyjną?',
        ['Pacjent posiada zachowaną zdolność decyzyjną (capacity) do odmowy hospitalizacji, ponieważ rozumie sytuację, rozważa konsekwencje i komunikuje spójny wybór, a decyzja nieracjonalna medycznie nie oznacza braku capacity', 'Zdolność decyzyjna nie wymaga podejmowania decyzji zgodnych z wolą lekarza; pacjent ma prawo do odmowy leczenia, jeśli spełnia 4 kryteria funkcjonalne.'],
        ['Pacjent automatycznie nie posiada zdolności decyzyjnej, ponieważ każde rozpoznanie otępienia natychmiast pozbawia człowieka praw obywatelskich', 'Diagnoza otępienia nie jest tożsama z ubezwłasnowolnieniem ani automatyczną utratą zdolności decyzyjnej.'],
        ['Pacjent powinien zostać niezwłocznie związany pasami bez badania stanu psychicznego', 'Przymus bezpośredni bez wskazań ustawowych jest bezprawnym pozbawieniem wolności.'],
        'psych-cap-safe-q1'
      ),
      q(
        'Jakie są 4 funkcjonalne domeny oceny zdolności decyzyjnej wg uznanych standardów (Mental Capacity Framework)?',
        ['Zrozumienie informacji istotnych dla decyzji (Understanding), ich zatrzymanie (Retention), zdolność do ich wyważenia i rozważenia konsekwencji (Weighing) oraz zakomunikowanie wyboru (Communicating)', 'Czteroelementowy model ocenia proces myślowy pacjenta, a nie samą treść podjętej decyzji.'],
        ['Bogactwo finansowe, wykształcenie wyższe, brak zmarszczek na twarzy i posiadanie samochodu', 'Status społeczny i majątek nie mają żadnego związku z oceną zdolności decyzyjnej.'],
        ['Zgodność z wolą ordynatora oddziału, partii rządzącej i sąsiadów', 'Zdolność decyzyjna ocenia autonomię pacjenta, a nie konformizm.'],
        'psych-cap-safe-q2'
      ),
      q(
        'Co oznacza zasada, że zdolność do podejmowania decyzji jest „decision-specific” i „time-specific”?',
        ['Oznacza, że oceniamy zdolność do konkretnej decyzji w danym momencie czasu; pacjent może nie być zdolny do sprzedaży domu, lecz zdolny do wyboru obiadu, a jego stan może fluktuować', 'Odrzuca to zero-jedynkowe traktowanie pacjenta jako „całkowicie zdolnego” lub „całkowicie niezdolnego” do jakichkolwiek czynności życiowych.'],
        ['Oznacza, że lekarz podejmuje decyzję wyłącznie w dni parzyste po godzinie 12:00', 'Time-specific odnosi się do dynamiki stanu psychicznego chorego (np. w delirium), a nie do harmonogramu dyżurów.'],
        ['Oznacza, że każda decyzja musi zostać potwierdzona przez test laboratoryjny moczu', 'Testy laboratoryjne nie oceniają zdolności decyzyjnej.'],
        'psych-cap-safe-q3'
      ),
      q(
        'Córka 86-letniej pacjentki z zaawansowanym otępieniem podczas wizyty płacze, jest skrajnie wyczerpana, przyznaje, że śpi po 3 godziny na dobę i obawia się, że „nie wytrzyma i zrobi krzywdę matce”. Jaka interwencja jest kluczowa?',
        ['Natychmiastowe zaadresowanie przeciążenia opiekuna (caregiver burden): wdrożenie opieki wytchnieniowej, wsparcia środowiskowego MOPS, leczenia bezsenności chorej oraz ocena bezpieczeństwa w ramach safeguarding', 'Wypalenie opiekuna jest krytycznym czynnikiem ryzyka załamania opieki i przemocy wobec osób starszych; wymaga pilnej pomocy systemowej.'],
        ['Wyrzucenie córki z gabinetu z naganą za brak miłości rodzicielskiej', 'Reakcja moralizatorska ignoruje biologiczne i emocjonalne wyczerpanie opiekuna.'],
        ['Podanie córce leków przeciwpsychotycznych bez badania', 'Córka wymaga wsparcia socjalnego i psychologicznego, nie przymusowej farmakoterapii.'],
        'psych-cap-safe-q4'
      ),
      q(
        'Dlaczego wywiad od osób trzecich (collateral history) jest niezbędny przy ocenie zdolności seniora do bezpiecznego samodzielnego funkcjonowania w domu?',
        ['Ponieważ pacjent w gabinecie może prezentować wyuczone maski społeczne (social facade), podczas gdy rodzina obserwuje niespłacone rachunki, niedożywienie i przypalanie garnków', 'Fenomen fasady społecznej polega na sprawianiu pozorów pełnej sprawności w krótkiej rozmowie przy całkowitej niesamodzielności w środowisku domowym.'],
        ['Ponieważ prawo zabrania wierzyć seniorom w jakiekolwiek słowo bez podpisu świadka', 'Ocena kliniczna dąży do obiektywizacji faktów, a nie arbitralnego podważania słów pacjenta.'],
        ['Ponieważ rodzina jest właścicielem ciała pacjenta', 'Pacjent jest autonomicznym podmiotem prawa.'],
        'psych-cap-safe-q5'
      ),
    ],
  },
];
