import type { DiabetesCaseDraft } from './cases-diabetes-types.ts';

export const diabetesCasesPart2: DiabetesCaseDraft[] = [
  {
    id: 'case-cukrzyca-lada-3c',
    lessonId: 'cukrzyca-lada-3c',
    title: 'Szybkie chudnięcie u 44-latka z rozpoznaną cukrzycą typu 2',
    patient: 'Robert, 44 lata',
    difficulty: 'Zaawansowany',
    intro:
      '44-letni informatyk został zdiagnozowany 8 miesięcy temu jako cukrzyca typu 2 na podstawie glikemii na czczo 145 mg/dl i zalecono mu metforminę w dawce 2 x 1000 mg. Początkowo cukry były stabilne, lecz w ciągu ostatnich 2 miesięcy schudł 7 kg, a glikemie na czczo wzrosły do 210–260 mg/dl mimo ścisłego przestrzegania diety. Pacjent jest szczupły (BMI 22,8 kg/m2).',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Jaki element obrazu klinicznego nakazuje natychmiastową rewizję diagnozy cukrzycy typu 2 u tego chorego?',
        context: 'Pacjent nie ma cech insulinooporności (szczupły, brak rogowacenia ciemnego, prawidłowe lipidy), gwałtownie traci masę ciała.',
        options: [
          {
            text: 'Brak cech otyłości, szybka wtórna nieskuteczność leków doustnych i chudnięcie sugerujące dekompensację wydzielniczą komórek beta',
            explanation: 'Prawidłowo! W klasycznej T2D rezerwa komórek beta wyczerpuje się przez dekady, a nie w 8 miesięcy.',
          },
          {
            text: 'Wiek powyżej 40 lat',
            explanation: 'Wiek 44 lata jest typowy dla T2D, ale nie wyklucza późnej autoimmunizacji (LADA).',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Zlecono poszerzoną diagnostykę serologiczną i rezerwy wydzielniczej. Wynik: anty-GAD65: 280 IU/ml (silnie dodatni), peptyd C na czczo: 0,42 ng/ml (obniżony). Jak należy zinterpretować ten wynik?',
        context: 'HbA1c wynosi 9,2% (77 mmol/mol), w moczu obecne śladowe ketony.',
        options: [
          {
            text: 'Autoimmunologiczna destrukcja komórek beta o późnym początku — cukrzyca LADA',
            explanation: 'Prawidłowo! Wysokie miano anty-GAD i spadek peptydu C potwierdzają proces autoimmunologiczny u dorosłego.',
          },
          {
            text: 'Czysta insulinooporność w przebiegu stłuszczenia wątroby',
            explanation: 'Stłuszczenie wątroby nie generuje swoistych autoprzeciwciał przeciw wyspom trzustkowym.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Jaka jest formalna diagnoza?',
        context: 'Spełniona triada: wiek >35 lat, obecność anty-GAD, początkowy brak konieczności insuliny przez pierwsze 6 miesięcy.',
        options: [
          {
            text: 'Cukrzyca autoimmunologiczna dorosłych (LADA — Latent Autoimmune Diabetes in Adults)',
            explanation: 'Prawidłowo! Spełnione są wszystkie kryteria międzynarodowe rozpoznania LADA.',
          },
          {
            text: 'Cukrzyca typu 3c w przebiegu raka trzustki',
            explanation: 'Brak wywiadu zewnątrzwydzielniczego, a autoprzeciwciała są w typie 3c ujemne.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jaka jest prawidłowa decyzja terapeutyczna?',
        context: 'Glikemia 240 mg/dl, wyczerpująca się rezerwa peptydu C.',
        options: [
          {
            text: 'Niezwłoczne wdrożenie insulinoterapii (początkowo małe dawki bazy i bolusów posiłkowych) w celu protekcji resztkowych komórek beta',
            explanation: 'Prawidłowo! Wczesna insulina chroni ocalałe wyspy i zapobiega nagłej kwasicy ketonowej DKA.',
          },
          {
            text: 'Dołączenie pochodnej sulfonylomocznika (pochodna gliklazydu) w maksymalnej dawce',
            explanation: 'Błąd! Sulfonylomocznik wywołałby gwałtowny wyrzut resztek insuliny i przyspieszył całkowitą apoptozę komórek beta.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-cukrzyca-dka',
    title: 'Pułapka potasowa w ciężkiej kwasicy ketonowej',
    patient: 'Klaudia, 21 lat',
    difficulty: 'Zaawansowany',
    intro:
      '21-letnia studentka z cukrzycą typu 1 od 5 lat przerwała podawanie insuliny z powodu wymiotów w przebiegu ostrego nieżytu żołądkowo-jelitowego. Została przywieziona na SOR w stanie ciężkim: odwodniona, ciśnienie 85/50 mmHg, tętno 130/min, oddech Kussmaula. Wyniki z SOR: glikemia 460 mg/dl, gazometria pH 7,04, HCO3- 5 mmol/l, beta-hydroksymaślan 7,8 mmol/l. Jonogram: Na+ 132 mmol/l, K+ 2,9 mmol/l, Cl- 98 mmol/l.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Który wynik laboratoryjny stanowi BEZPOŚREDNIE ZAGROŻENIE ŻYCIA i zmienia standardową kolejność procedur w DKA?',
        context: 'W EKG stwierdzono spłaszczenie załamków T, obniżenie odcinka ST oraz obecność załamków U.',
        options: [
          {
            text: 'Głęboka hipokaliemia (K+ = 2,9 mmol/L) z cechami elektrokardiograficznymi w EKG',
            explanation: 'Prawidłowo! K+ < 3,3 mmol/L to stan zagrożenia złośliwymi arytmiami komorowymi i asystolią.',
          },
          {
            text: 'Glikemia 460 mg/dl',
            explanation: 'Sama hiperglikemia wymaga wyrównania, ale to hipokaliemia zabija w ciągu minut.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Co stanie się ze stężeniem potasu w surowicy, jeśli w tej chwili podamy dożylnie wlew insuliny?',
        context: 'Insulina aktywuje pompę sodowo-potasową Na+/K+-ATPazę w błonach komórek mięśniowych i wątrobowych.',
        options: [
          {
            text: 'Insulina spowoduje masowy napływ potasu do wnętrza komórek, pogłębiając hipokaliemię do poziomu krytycznego (<2,5 mmol/l) i wywołując zatrzymanie krążenia',
            explanation: 'Prawidłowo! Z tego powodu K+ < 3,3 mmol/l jest BEZWZGLĘDNYM przeciwwskazaniem do podania insuliny!',
          },
          {
            text: 'Stężenie potasu natychmiast gwałtownie wzrośnie',
            explanation: 'Błąd! Insulina obniża potas w osoczu, wpychając go do komórek.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Jaka jest diagnoza kardiologiczno-metaboliczna?',
        context: 'Stwierdzono ciężką kwasicę ketonową (DKA) z ciężką hipokaliemią i niestabilnością hemodynamiczną.',
        options: [
          {
            text: 'Ciężka dekompensacja DKA powikłana zagrażającą życiu hipokaliemią (K+ 2,9 mmol/l) wskutek wymiotów i diurezy osmotycznej',
            explanation: 'Prawidłowo! Wymioty i utrata potasu z moczem doprowadziły do skrajnego wyczerpania puli kationów.',
          },
          {
            text: 'Kwasica ketonowa z typową hiperkaliemią kwasiczą',
            explanation: 'Typowo w kwasicy jony H+ wypierają K+ do osocza, dając hiperkaliemię; u tej pacjentki doszło do rzadkiego, skrajnego zubożenia potasu.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jaki jest JEDYNY prawidłowy pierwszy krok terapeutyczny wg wytycznych JBDS/ADA?',
        context: 'Pacjentka leży na sali R, monitorowanie kardiologiczne.',
        options: [
          {
            text: 'Wstrzymać podanie insuliny! Rozpocząć intensywne nawadnianie krystaloidem z suplementacją KCl 20–40 mmol/h pod kontrolą EKG, a insulinę włączyć dopiero po osiągnięciu K+ >= 3,3 mmol/L',
            explanation: 'Prawidłowo! Żelazny algorytm DKA: najpierw podnieś potas powyżej 3,3 mmol/l, dopiero wtedy włącz wlew insuliny.',
          },
          {
            text: 'Natychmiast podać 20 jednostek insuliny krystalicznej i.v. w bolusie',
            explanation: 'Kardynalny błąd w sztuce lekarskiej — natychmiastowe zatrzymanie krążenia w mechanizmie migotania komór.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-cukrzyca-hhs',
    title: 'Śpiączka u samotnie mieszkającego 78-latka',
    patient: 'Władysław, 78 lat',
    difficulty: 'Zaawansowany',
    intro:
      '78-letni samotny mężczyzna chorujący na cukrzycę typu 2 został znaleziony przez sąsiada w łóżku w stanie głębokiego zamroczenia. Od kilku dni miał gorączkę i kaszel. Przy przyjęciu na SOR: temperatura 38,9°C, ciśnienie 80/50 mmHg, tętno 128/min, skóra pergaminowa, język wysuszony jak wiór, brak kontaktu logicznego. Wstępna glikemia z glukometru: wynik poza skalą („HI” > 600 mg/dl).',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Która cecha z wywiadu i badania fizykalnego najsilniej sugeruje skrajny stopień odwodnienia hipotonicznego?',
        context: 'Szacowany deficyt płynów u pacjenta wynosi ponad 10–12 litrów (> 15% masy ciała).',
        options: [
          {
            text: 'Zapadnięte gałki oczne, suchość błon śluzowych, tachykardia z ciężką hipotonią ortostatyczną i zaburzenia świadomości',
            explanation: 'Prawidłowo! Wielodniowa diureza osmotyczna w połączeniu z brakiem dostępu do wody doprowadziła do skrajnej hipowolemii.',
          },
          {
            text: 'Obrzęki ciastowate obu podudzi',
            explanation: 'Obrzęki obwodowe świadczą o przewodnieniu, które w zespole HHS nie występuje.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Wyniki z laboratorium: glikemia 960 mg/dl (53,3 mmol/l), Na+ 152 mmol/l, K+ 4,8 mmol/l, Cl- 112 mmol/l, mocznik 24 mmol/l, kreatynina 2,4 mg/dl. Gazometria: pH 7,37, HCO3- 24 mmol/l. Ile wynosi efektywna osmolalność osocza?',
        context: 'Wzór: Osm_eff = 2 * [Na+] + Glukoza [mg/dl] / 18.',
        options: [
          {
            text: '357 mOsm/kg H2O — wynik znacznie przewyższa próg rozpoznania HHS (> 320 mOsm/kg H2O)',
            explanation: 'Prawidłowo! Osm_eff = 2 * 152 + 960 / 18 = 304 + 53,3 = 357,3 mOsm/kg. Świadczy o skrajnej hiperosmolalności.',
          },
          {
            text: '290 mOsm/kg H2O — wartość w normie fizjologicznej',
            explanation: 'Błąd rachunkowy; nieuwzględnienie skrajnej hiperglikemii w osmolalności efektywnej.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Brak kwasicy metabolicznej (pH 7,37, HCO3- 24) przy skrajnej hiperglikemii (960 mg/dl) i osmolalności 357 mOsm/kg jednoznacznie definiuje:',
        context: 'Badanie moczu: glukozuria (++++), ketony ujemne.',
        options: [
          {
            text: 'Zespół hiperglikemiczno-hiperosmolarny (HHS) wyzwolony zapaleniem płuc',
            explanation: 'Prawidłowo! Pełny obraz HHS bez kwasicy ketonowej, z infekcyjnym czynnikiem spustowym.',
          },
          {
            text: 'Kwasicę mleczanową (MALA)',
            explanation: 'W kwasicy mleczanowej pH wynosi < 7,20, a wodorowęglany są drastycznie obniżone.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jakie zasady płynoterapii i profilaktyki powikłań należy wdrożyć w pierwszej dobie?',
        context: 'Skorygowany sód wynosi 166 mmol/l. Ryzyko obrzęku mózgu i powikłań zatorowych.',
        options: [
          {
            text: 'Powolna rehydratacja (spadek glikemii < 50–70 mg/dl/h), stosowanie 0,45% NaCl z powodu hipernatremii, małe dawki insuliny i rutynowa heparyna drobnocząsteczkowa (HDCz)',
            explanation: 'Prawidłowo! Zbyt szybkie zbicie cukru grozi obrzękiem mózgu, a zagęszczenie krwi wymaga bezwzględnej profilaktyki przeciwzakrzepowej.',
          },
          {
            text: 'Gwałtowny wlew 5 litrów czystej wody destylowanej dożylnie i 100 jednostek insuliny',
            explanation: 'Błąd śmiertelny! Woda destylowana wywoła natychmiastową hemolizę wewnątrznaczyniową i zgon.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-cukrzyca-hipoglikemia',
    title: 'Utrata przytomności za kierownicą i zjawisko HAAF',
    patient: 'Marek, 40 lat',
    difficulty: 'Podstawowy',
    intro:
      '40-letni inżynier chorujący na cukrzycę typu 1 od 18 lat został znaleziony przez policję w samochodzie na poboczu drogi. Pacjent był splątany, spocony, nie odpowiadał logicznie na pytania. Przybyły zespół ratownictwa zmierzył glikemię: 34 mg/dl (1,9 mmol/l). Po dożylnym podaniu 20% glukozy pacjent odzyskał pełną świadomość. Twierdzi, że „zupełnie nic nie czuł przed zasłabnięciem”.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Dlaczego pacjent nie odczuwał typowych objawów zwiastunowych (kołatania serca, drżenia rąk, lęku) przed utratą przytomności?',
        context: 'W wywiadzie: pacjent dążył do bardzo niskich cukrów, doświadczając 3–4 lekkich hipoglikemii tygodniowo.',
        options: [
          {
            text: 'Wystąpił u niego zespół nieświadomości hipoglikemii (HAAF — Hypoglycemia-Associated Autonomic Failure) z wygaszeniem odpowiedzi adrenergicznej',
            explanation: 'Prawidłowo! Nawracające hipoglikemie resetują próg alarmowy pnia mózgu, eliminując wyrzut adrenaliny.',
          },
          {
            text: 'Pacjent symulował objawy, aby uniknąć mandatu za parkowanie',
            explanation: 'Hipoglikemia 34 mg/dl to obiektywny stan zagrożenia życia (neuroglikopenia), a nie symulacja.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'W analizie danych z sensora CGM stwierdzono, że pacjent spędza aż 12% doby w zakresie TBR (< 70 mg/dl), w tym 5% < 54 mg/dl. Jaka jest prawidłowa ocena tego zapisu wg konsensusu ATTD?',
        context: 'Docelowy TBR to < 4%, a w hipoglikemii głębokiej < 1%.',
        options: [
          {
            text: 'Niedopuszczalnie wysoki czas w hipoglikemii (ponad 3-krotne przekroczenie normy), stwarzający bezpośrednie ryzyko zgonu w mechanizmie „dead in bed”',
            explanation: 'Prawidłowo! 12% to niemal 3 godziny dziennie w niedocukrzeniu, co bezpośrednio uszkadza ośrodkowy układ nerwowy i serce.',
          },
          {
            text: 'Wzorowy profil metaboliczny — im niższy cukier, tym lepiej dla naczyń',
            explanation: 'Błąd! Ciężka hipoglikemia zwiększa śmiertelność sercowo-naczyniową i znosi świadomość ostrzegawczą.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Jaka jest formalna kwalifikacja przebytego epizodu?',
        context: 'Glikemia 34 mg/dl, upośledzenie funkcji poznawczych wymagające pomocy osób trzecich (podanie glukozy przez ZRM).',
        options: [
          {
            text: 'Ciężka hipoglikemia kliniczna (poziom 3) powikłana zespołem nabytej nieświadomości hipoglikemii',
            explanation: 'Prawidłowo! Konieczność interwencji osób trzecich definiuje poziom 3 niezależnie od liczbowej wartości glikemii.',
          },
          {
            text: 'Poziom 1 hipoglikemii (alert glikemiczny)',
            explanation: 'Poziom 1 to glikemia 54–69 mg/dl u przytomnego chorego radzącego sobie samodzielnie.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jakie interwencje należy podjąć natychmiast, aby odzyskać fizjologiczną świadomość hipoglikemii?',
        context: 'Pacjent czasowo powstrzymuje się od prowadzenia pojazdów.',
        options: [
          {
            text: 'Podwyższenie celów glikemii (unikanie cukrów < 70 mg/dl przez 2–3 tygodnie), włączenie predykcyjnych alarmów w CGM i wyposażenie w donosowy glukagon (Baqsimi)',
            explanation: 'Prawidłowo! 2–3 tygodnie bez hipoglikemii przywracają autonomiczną percepcję objawów adrenergicznych.',
          },
          {
            text: 'Dalsze zaostrzenie celów i zredukowanie glikemii docelowej do 60 mg/dl',
            explanation: 'Śmiertelnie niebezpieczne — pogłębi neuroglikopenię i doprowadzi do śpiączki.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-cukrzyca-powiklania-naczyniowe',
    title: 'Białkomocz i pogorszenie filtracji u 58-latka z T2D',
    patient: 'Grzegorz, 58 lat',
    difficulty: 'Zaawansowany',
    intro:
      '58-letni pacjent z cukrzycą typu 2 od 9 lat zgłasza się na rutynowe doroczne badania kontrolne. Czuje się dobrze, ciśnienie tętnicze 142/88 mmHg, masa ciała stabilna. Dotychczasowe leczenie: metformina 2 x 1000 mg i gliklazyd MR 60 mg. W wynikach badań: kreatynina w surowicy wzrosła z 0,9 do 1,3 mg/dl (eGFR spadek z 85 do 58 ml/min/1,73m2). W porannej próbce moczu wskaźnik albumina/kreatynina (UACR) wynosi 185 mg/g (rok temu 22 mg/g).',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Czy pacjent we wczesnym stadium cukrzycowej choroby nerek (DKD) odczuwa jakiekolwiek objawy bólowe nerek lub zaburzenia mikcji?',
        context: 'Pacjent nie zgłasza dolegliwości dyzurycznych ani bólu w okolicy lędźwiowej.',
        options: [
          {
            text: 'Nie, wczesne uszkodzenie kłębuszków nerkowych i mikroalbuminuria przebiegają całkowicie bezobjawowo',
            explanation: 'Prawidłowo! DKD rozwija się „po cichu”, dlatego coroczny screening UACR i eGFR jest absolutną koniecznością.',
          },
          {
            text: 'Tak, zawsze występuje ostry ból kolkowy promieniujący do pachwiny',
            explanation: 'Kolka nerkowa to cecha kamicy moczowodowej, a nie cukrzycowej choroby nerek.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Jak należy sklasyfikować stadium albuminurii i przewlekłej choroby nerek wg klasyfikacji KDIGO?',
        context: 'eGFR = 58 ml/min/1,73m2, UACR = 185 mg/g.',
        options: [
          {
            text: 'Stadium G3a A2 (umiarkowanie upośledzona filtracja z umiarkowanie zwiększoną albuminurią) — wysokie ryzyko progresji',
            explanation: 'Prawidłowo! eGFR 45–59 definiuje stadium G3a, a UACR 30–300 mg/g definiuje kategorię A2.',
          },
          {
            text: 'Stadium G1 A1 (stan całkowicie prawidłowy)',
            explanation: 'Błąd! eGFR < 60 i UACR > 30 mg/g to jawna przewlekła choroba nerek (PChN).',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Jaka jest formalna diagnoza nefrologiczno-diabetologiczna?',
        context: 'Stwierdzono trwały białkomocz kłębuszkowy i spadek eGFR w przebiegu wieloletniej cukrzycy.',
        options: [
          {
            text: 'Cukrzycowa choroba nerek (DKD — Diabetic Kidney Disease) w stadium umiarkowanym',
            explanation: 'Prawidłowo! Obraz odpowiada wczesnemu stwardnieniu kłębuszków (zespół Kimmelstiela-Wilsona).',
          },
          {
            text: 'Ostre odmiedniczkowe zapalenie nerek',
            explanation: 'Brak gorączki, leukocyturii i objawu Chełmońskiego/Goldflama wyklucza ostre zakażenie.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jaki zestaw leków o udowodnionej najwyższej skuteczności nefroprotekcyjnej (KDIGO 1A) należy wdrożyć?',
        context: 'Pacjent wymaga optymalizacji ciśnienia tętniczego i redukcji hiperfiltracji kłębuszkowej.',
        options: [
          {
            text: 'Wdrożenie inhibitora ACE (np. ramipryl) w maksymalnej dawce + inhibitora SGLT2 (np. dapagliflozyna 10 mg) + niesteroidowego MRA (finerenon)',
            explanation: 'Prawidłowo! To nowoczesna potrójna nefroprotekcja hamująca ciśnienie wewnątrzkłębuszkowe, włóknienie i stan zapalny.',
          },
          {
            text: 'Natychmiastowe skierowanie na pilną hemodializoterapię',
            explanation: 'Dializoterapia jest zarezerwowana dla schyłkowej mocznicy (stadium G5 eGFR < 15 ml/min).',
          },
        ],
      },
    ],
  },
  {
    id: 'case-cukrzyca-insulinoterapia-aid',
    title: 'Trudności z wyrównaniem i przerosty poinsulinowe',
    patient: 'Bartosz, 34 lata',
    difficulty: 'Zaawansowany',
    intro:
      '34-letni informatyk chorujący na cukrzycę typu 1 od 14 lat zgłasza się z powodu skrajnie niestabilnych glikemii. W niektóre dni po wstrzyknięciu 10 j. insuliny cukier nie spada przez 3 godziny, a innym razem po identycznej dawce rozwija się gwałtowna hipoglikemia 40 mg/dl. HbA1c 8,6% (70 mmol/mol). W badaniu powłok brzucha lekarz wyczuwa obustronnie w okolicy pępka twarde, niebolesne, „gumowate” guzy podskórne o średnicy ok. 5 cm.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Co przedstawiają wyczuwalne w badaniu palpacyjnym brzucha podskórne zgrubienia?',
        context: 'Pacjent przyznaje, że od lat wstrzykuje insulinę w te same dwa miejsca wokół pępka, „bo tam najmniej boli”, i rzadko zmienia igły w penie.',
        options: [
          {
            text: 'Lipohipertrofię (przerost tkanki tłuszczowej indukowany miejscowym lipogennym działaniem insuliny i mikrourazami)',
            explanation: 'Prawidłowo! Insulina stymuluje miejscową lipogenezę; powtarzane wkłucia w to samo miejsce tworzą przerośniętą, zbliznowaciałą tkankę.',
          },
          {
            text: 'Tłuszczaki nowotworowe wymagające pilnej biopsji chirurgicznej',
            explanation: 'To typowe powikłanie poinsulinowe, a nie nowotwory złośliwe.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Dlaczego wstrzykiwanie insuliny w obszary lipohipertrofii powoduje naprzemienne epizody niewyjaśnionej hiperglikemii i ciężkiej hipoglikemii?',
        context: 'W badaniu USG powłok: obszary zatarcia echogeniczności z nieregularnym unaczynieniem.',
        options: [
          {
            text: 'Przerośnięta tkanka ma nieprzewidywalną perfuzję — lek zalega w mikrodepozytach i wchłania się z opóźnieniem lub uwalnia się lawinowo',
            explanation: 'Prawidłowo! Zmieniona tkanka uniemożliwia stabilną farmakokinetykę leku, destabilizując całe leczenie.',
          },
          {
            text: 'Tkanka przerośnięta bezpośrednio niszczy przeciwciała anty-GAD',
            explanation: 'Lipohipertrofia nie wpływa na miano krążących przeciwciał.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Jaka jest formalna diagnoza powikłania?',
        context: 'Stwierdzono przerosty podskórne i niestabilność terapii MDI.',
        options: [
          {
            text: 'Chwiejna cukrzyca typu 1 z jatrogenną lipohipertrofią powłok brzusznych wskutek braku rotacji miejsc wkłuć',
            explanation: 'Prawidłowo! Diagnoza łączy błąd techniki podawania leku z dekompensacją metaboliczną.',
          },
          {
            text: 'Amyotrofia cukrzycowa udowa',
            explanation: 'Amyotrofia to bolesna neuropatia ruchowa mięśni ud, a nie powikłanie tkanki tłuszczowej brzucha.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jaki plan naprawczy należy wdrożyć?',
        context: 'Pacjent kwalifikuje się do zaawansowanej osobistej pompy insulinowej z zamkniętą pętlą (AID).',
        options: [
          {
            text: 'Bezwzględny zakaz wkłuć w zmienione miejsca przez minimum 3–6 miesięcy, nauka rotacji wkłuć (pośladki, uda, ramiona), jednorazowe igły i przejście na system AID',
            explanation: 'Prawidłowo! Odpoczynek tkanek pozwala na częściową regresję lipohipertrofii, a pompa AID stabilizuje dawkowanie.',
          },
          {
            text: 'Dalsze podawanie insuliny wyłącznie w środek przerośniętych guzów',
            explanation: 'Błąd! Pogłębi to zwłóknienie i doprowadzi do kolejnych niebezpiecznych hipoglikemii.',
          },
        ],
      },
    ],
  },
];
