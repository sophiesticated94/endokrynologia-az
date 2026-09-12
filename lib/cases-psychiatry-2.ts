import type { ClinicalCase } from './cases-psychiatry-builder.ts';
import { make } from './cases-psychiatry-builder.ts';

export const psychiatryCasesPart2: ClinicalCase[] = [
  make(
    'farmakokinetyka-oun-bariera',
    'Nieoczekiwana senność po antybiotyku',
    'Kobieta, 48 lat',
    'Zaawansowany',
    'Pacjentka stabilna na stałej dawce rysperydonu (2 mg/d) zgłasza się z powodu nagłego, głębokiego otępienia i zawrotów głowy po włączeniu leczenia przeciwgrzybiczego.',
    [
      [
        'W badaniu pacjentka wykazuje sztywność mięśniową, senność i spowolnienie ruchowe. Od 3 dni przyjmuje itrakonazol z powodu grzybicy paznokci.',
        'Jaki mechanizm farmakokinetyczny na poziomie bariery krew-mózg (BBB) wyjaśnia gwałtowny wzrost stężenia leku w mózgowiu?',
        ['Itrakonazol jest silnym inhibitorem glikoproteiny P (P-gp), co zablokowało usuwanie rysperydonu z tkanki mózgowej', 'Rysperydon jest substratem pompy P-gp; zablokowanie pompy effluksowej dramatycznie podnosi stężenie mózgowe leku.'],
        ['Itrakonazol przekształcił się w czysty haloperydol', 'Leki przeciwgrzybicze nie ulegają biotransformacji do neuroleptyków.'],
      ],
      [
        'W badaniach laboratoryjnych stężenie rysperydonu i 9-hydroksyrysperydonu w osoczu jest podwyższone o 70%, próby wątrobowe bez cech ostrej niewydolności.',
        'Co należy zrobić z farmakoterapią w tej sytuacji?',
        ['Zredukować dawkę rysperydonu o co najmniej 50% lub zastąpić itrakonazol lekiem bez wpływu na P-gp i CYP3A4', 'Eliminuje to zagrażającą toksyczność neurologiczną w OUN.'],
        ['Zwiększyć dawkę rysperydonu do 8 mg/d', 'Doprowadziłoby to do ciężkich powikłań pozapiramidowych i zapaści krążeniowej.'],
      ],
      [
        'Po zredukowaniu dawki rysperydonu objawy parkinsonizmu i sedacji ustąpiły w ciągu 48 godzin.',
        'Jakie jest rozpoznanie problemu klinicznego?',
        ['Polekowa toksyczność OUN wywołana interakcją na poziomie pompy effluksowej glikoproteiny P (P-gp)', 'Klasyczny przykład interakcji farmakokinetycznej w barierze krew-mózg.'],
        ['Zapalenie opon mózgowo-rdzeniowych', 'Brak gorączki, sztywności karku oponowej i pleocytozy wyklucza zapalenie opon.'],
      ],
      [
        'Klinicysta planuje zasady bezpieczeństwa farmakoterapii na przyszłość.',
        'O czym należy pamiętać przy włączaniu leków u pacjentów leczonych substratami P-gp?',
        ['O konieczności weryfikacji interakcji z silnymi inhibitorami (np. azole, klarytromycyna, werapamil) i induktorami pompy', 'Zapobiega to gwałtownym wahaniom stężeń neuroleptyków w OUN.'],
        ['O całkowitym zakazie mycia rąk w ciepłej wodzie', 'Temperatura wody nie wpływa na pompę P-gp w naczyniach mózgowych.'],
      ],
    ]
  ),
  make(
    'transportery-monoamin-sert-net-dat',
    'Brak efektu po podwojeniu dawki',
    'Mężczyzna, 39 lat',
    'Podstawowy',
    'Pacjent z depresją przyjmuje sertralinę w dawce 50 mg/d od 4 tygodni z niepełną poprawą. Lekarz zwiększył dawkę do 100 mg, a po kolejnych 2 tygodniach do 200 mg, co wywołało jedynie nudności i biegunkę.',
    [
      [
        'Pacjent pyta, dlaczego 4-krotne zwiększenie dawki (z 50 mg do 200 mg) nie dało 4-krotnego przyrostu poprawy nastroju, a jedynie nasiliło działania niepożądane.',
        'Jakie zjawisko receptorowe i neuroobrazowe PET wyjaśnia ten stan?',
        ['Krzywa occupancy SERT ma kształt hiperboliczny – dawka 50 mg wysyca już ~80% transporterów, a 200 mg zwiększa blokadę zaledwie do ok. 88%', 'Dalsza eskalacja dawki nie przynosi skokowego przyrostu wychwytu 5-HT, stymuluje natomiast obwodowe receptory jelitowe 5-HT3.'],
        ['Transporter SERT uległ natychmiastowej atrofii w nerkach', 'Transporter SERT znajduje się w OUN i na płytkach krwi, nie w nerkach.'],
      ],
      [
        'W badaniu stanu psychicznego: nastrój umiarkowanie obniżony, wyraźna anhedonia i apatia, brak myśli samobójczych.',
        'Jaki krok terapeutyczny jest bardziej racjonalny niż dalsze podnoszenie dawki SSRI ponad 200 mg?',
        ['Zmiana strategii: zmiana klasy leku (np. na SNRI / bupropion) lub augmentacja dotychczasowego leczenia (litem lub aripiprazolem)', 'Przełamuje to ograniczenia wysycenia samego układu serotoninergicznego.'],
        ['Podanie sertraliny w dawce 1000 mg/d', 'Dawka taka przekracza normy bezpieczeństwa i grozi zespołem serotoninowym.'],
      ],
      [
        'Rozpoznano częściową odpowiedź na monoterapię SSRI z ograniczeniem farmakodynamicznym wysycenia SERT.',
        'Jakie jest rozpoznanie?',
        ['Epizod depresyjny z częściową odpowiedzią na SSRI na plateau krzywej wysycenia transportera', 'Stan odpowiada fizjologicznemu nasyceniu układu transportowego 5-HT.'],
        ['Choroba Parkinsona o wczesnym początku', 'Brak objawów parkinsonizmu, spowolnienie ma charakter afektywny.'],
      ],
      [
        'Zdecydowano o wdrożeniu małej dawki aripiprazolu (2,5 mg/d) jako leku augmentującego.',
        'Jaki jest mechanizm korzyści z dołączenia częściowego agonisty D2/D3 w tym punkcie?',
        ['Modulacja przekaźnictwa dopaminowego i receptorów 5-HT1A, niezależna od wysycenia SERT', 'Pozwala na uzyskanie pełnej remisji objawów anhedonii bez eskalacji działań żołądkowych.'],
        ['Natychmiastowe zniszczenie cząsteczek sertraliny we krwi', 'Aripiprazol nie niszczy sertraliny.'],
      ],
    ]
  ),
  make(
    'receptory-dopaminowe-okno-kapura',
    'Sztywność i mlekotok po eskalacji dawki',
    'Kobieta, 27 lat',
    'Zaawansowany',
    'Pacjentka leczona z powodu schizofrenii rysperydonem w dawce zwiększonej z 4 mg do 8 mg/d zgłasza brak miesiączki, wyciek mleka z brodawek oraz sztywność kończyn.',
    [
      [
        'W badaniu neurologicznym: opór plastyczny w stawach łokciowych z objawem koła zębatego, drżenie spoczynkowe dłoni. W badaniach laboratoryjnych prolaktyna 120 ng/ml (norma < 25).',
        'Które zjawisko neuroobrazowe opisane przez Kapura zaszło u pacjentki po podwojeniu dawki?',
        ['Wzrost prążkowiowego occupancy receptorów D2 powyżej 80%, co przełamało próg bezpieczeństwa EPS i odhamowało prolaktynę', 'W oknie 65–80% rysperydon kontrolował psychozę, powyżej 80% wyzwala powikłania pozapiramidowe i guzkowo-lejkowe.'],
        ['Całkowity brak wiązania leku z receptorami D2', 'Wiązanie leku uległo nadmiernemu zwiększeniu, a nie zniesieniu.'],
      ],
      [
        'Objawy wytwórcze psychozy są w pełni kontrolowane, pacjentka nie ma omamów ani urojeń.',
        'Jaki jest najwłaściwszy krok w modyfikacji farmakoterapii?',
        ['Powrót do niższej dawki rysperydonu (np. 3–4 mg/d) lub zamiana na lek częściowo agonistyczny D2 (aripiprazol)', 'Obniżenie occupancy poniżej 80% zniesie parkinsonizm i obniży prolaktynę bez utraty kontroli psychozy.'],
        ['Dołączenie lewodopy w maksymalnej dawce bez zmiany dawki rysperydonu', 'Lewodopa zaostrzyłaby psychozę przez stymulację szlaku mezolimbicznego.'],
      ],
      [
        'Po redukcji dawki rysperydonu do 3 mg/d sztywność mięśniowa ustąpiła, a stężenie prolaktyny uległo normalizacji.',
        'Jakie jest rozpoznanie kliniczne powikłania?',
        ['Jatrogenny zespół pozapiramidowy i hiperprolaktynemia wywołane przekroczeniem okna terapeutycznego blokady D2 (> 80%)', 'Klasyczne powikłanie przedawkowania silnego antagonisty D2.'],
        ['Guz prolaktynowy przysadki (prolactinoma)', 'Polekowy charakter potwierdza szybka normalizacja po redukcji dawki neuroleptyku.'],
      ],
      [
        'Klinicysta omawia z pacjentką dalsze leczenie podtrzymujące.',
        'Jaka jest docelowa zasada dawkowania leków przeciwpsychotycznych w schizofrenii wg EBM?',
        ['Stosowanie najniższej skutecznej dawki utrzymującej occupancy D2 w przedziale 65–80%', 'Maksymalizuje to szanse na długoterminowe funkcjonowanie poznawcze i współpracę pacjenta.'],
        ['Stosowanie zawsze maksymalnej dopuszczalnej dawki z ulotki', 'Prowadzi do wtórnych objawów negatywnych, dyskinez i rezygnacji z leczenia.'],
      ],
    ]
  ),
  make(
    'uklad-serotoninergiczny-receptory',
    'Przyrost masy ciała i żarłoczność na leku',
    'Mężczyzna, 31 lat',
    'Podstawowy',
    'Pacjent leczony mirtazapiną w dawce 30 mg/d z powodu depresji z bezsennością zgłasza ustąpienie bezsenności, lecz przytył 9 kg w ciągu 2 miesięcy z powodu napadów wilczego głodu na słodycze.',
    [
      [
        'Pacjent skarży się, że wieczorami po zażyciu leku odczuwa niepohamowany apetyt na węglowodany proste.',
        'Blokada których receptorów w podwzgórzu odpowiada za ten efekt mirtazapiny?',
        ['Kombinacja silnego antagonizmu receptorów histaminowych H1 oraz serotoninowych 5-HT2C', 'Blokada 5-HT2C i H1 wyłącza fizjologiczny ośrodek sytości i promuje łaknienie.'],
        ['Pobudzenie receptorów beta-3 adrenergicznych w brunatnej tkance tłuszczowej', 'Stymulacja beta-3 nasila lipolizę, nie powoduje otyłości.'],
      ],
      [
        'W badaniach laboratoryjnych: glukoza na czczo 108 mg/dl, trójglicerydy 240 mg/dl, BMI wzrosło z 24 do 27 kg/m2.',
        'Jak zinterpretować zmiany metaboliczne u pacjenta?',
        ['Wczesne stadium zespołu metabolicznego indukowanego farmakologicznie wymagające modyfikacji leku', 'Wzrost glikemii i lipidów w krótkim czasie stwarza ryzyko sercowo-naczyniowe.'],
        ['Fizjologiczny objaw powrotu do zdrowia niewymagający żadnej uwagi', 'Bagatelizowanie otyłości polekowej prowadzi do cukrzycy typu 2 i zawału serca.'],
      ],
      [
        'Depresja jest w remisji, lecz ryzyko metaboliczne jest nieakceptowalne dla pacjenta.',
        'Jakie jest rozpoznanie problemu?',
        ['Polekowy zespół metaboliczny ze znacznym przyrostem masy ciała w przebiegu terapii NaSSA', 'Powikłanie wynikające z profilu receptorowego mirtazapiny.'],
        ['Choroba Cushinga wywołana gruczolakiem przysadki', 'Gwałtowny apetyt po leku wskazuje na tło farmakologiczne bez cech hiperkortyzolemii.'],
      ],
      [
        'Klinicysta planuje zamianę leku przeciwdepresyjnego na preparat o obojętnym profilu metabolicznym.',
        'Jaki lek przeciwdepresyjny nie powoduje przyrostu masy ciała i nie stymuluje łaknienia?',
        ['Bupropion (NDRI) lub wortioksetyna (lek multimodalny)', 'Leki te nie blokują receptorów H1 ani 5-HT2C, sprzyjając utrzymaniu lub redukcji masy ciała.'],
        ['Olanzapina w dawce 20 mg/d', 'Olanzapina wykazuje jeszcze silniejszy potencjał metaboliczny i nasiliłaby otyłość.'],
      ],
    ]
  ),
  make(
    'glutaminian-gaba-neuroplastycznosc',
    'Szybka ulga w głębokim kryzysie suicydalnym',
    'Mężczyzna, 44 lata',
    'Zaawansowany',
    'Pacjent z lekooporną depresją jednobiegunową (po nieskuteczności sertraliny, wenlafaksyny i litu) trafia do kliniki z nasilonymi myślami rezygnacyjnymi i stuporem.',
    [
      [
        'Z uwagi na bezpośrednie zagrożenie życia i lekooporność zakwalifikowano pacjenta do wdrożenia donosowej esketaminy w połączeniu z doustnym lekiem przeciwdepresyjnym.',
        'Jaki jest mechanizm błyskawicznego efektu przeciwdepresyjnego esketaminy?',
        ['Niekompetycyjna blokada receptora NMDA, wyrzut glutaminianu, aktywacja receptorów AMPA i kaskady mTORC1 stymulującej syntezę BDNF', 'Prowadzi to do odbudowy połączeń synaptycznych w korze przedczołowej w ciągu kilku do kilkunastu godzin.'],
        ['Blokada receptorów insuliny w nerkach', 'Esketamina działa na receptory w OUN, nie w nerkach.'],
      ],
      [
        'Po 40 minutach od aplikacji donosowej pacjent zgłasza uczucie unoszenia się i obcości własnego ciała, ciśnienie tętnicze wzrosło ze 120/80 do 145/90 mmHg.',
        'Jak należy zinterpretować te objawy?',
        ['Są to typowe, przemijające zjawiska dysocjacyjne i sympatykomimetyczne wymagające 2-godzinnej obserwacji', 'Objawy te osiągają szczyt w 40 minucie i ustępują samoistnie bez trwałych powikłań.'],
        ['Świadczą o natychmiastowym pęknięciu tętniaka aorty', 'Taki umiarkowany skok RR nie świadczy o rozwarstwieniu aorty u pacjenta bez tętniaka.'],
      ],
      [
        'Następnego dnia rano pacjent zgłasza wyraźne ustąpienie myśli samobójczych i chęć rozmowy z rodziną (spadek w skali MADRS o 16 punktów).',
        'Jakie jest rozpoznanie kliniczne sytuacji terapeutycznej?',
        ['Szybka odpowiedź przeciwdepresyjna i antysuicydalna na interwencję glutaminergiczną w depresji lekoopornej (TRD)', 'Esketamina posiada udowodnioną skuteczność w ostrych kryzysach suicydalnych w TRD.'],
        ['Przejście w ostrą manię psychotyczną', 'Ustąpienie myśli samobójczych i kontakt z bliskimi to remisja depresji, a nie mania.'],
      ],
      [
        'Klinicysta ustala długofalowy schemat leczenia podtrzymującego.',
        'Jak wygląda standardowy protokół indukcji i podtrzymania esketaminy?',
        ['Aplikacja 2 razy w tygodniu przez pierwsze 4 tygodnie, następnie raz w tygodniu i co 2 tygodnie w fazie podtrzymującej', 'Protokół rejestracyjny gwarantuje utrwalenie neuroplastyczności synaptycznej.'],
        ['Podawanie leku co 10 minut przez 30 dni bez przerwy', 'Taki schemat wywołałby ciężką psychozę toksyczną i uzależnienie.'],
      ],
    ]
  ),
  make(
    'klasyczne-antydepresanty-ssri-snri-tlpd-maoi',
    'Poszerzony QRS w szpitalnym oddziale ratunkowym',
    'Kobieta, 52 lata',
    'Zaawansowany',
    'Kobieta zostaje przywieziona nieprzytomna do SOR po celowym spożyciu 40 tabletek amitryptyliny (TLPD). W monitorze widoczna tachykardia z szerokimi zespołami QRS.',
    [
      [
        'W EKG: rytm zatokowy 125/min, poszerzenie zespołu QRS do 140 ms, fala R w odprowadzeniu aVR > 3 mm. Źrenice szerokie, skóra sucha i gorąca.',
        'Zablokowanie jakiego kanału jonowego w kardiomiocytach odpowiada za poszerzenie zespołu QRS i ryzyko zgonu?',
        ['Szybkich sercowych kanałów sodowych Nav1.5', 'TLPD wykazują działanie chinidynopodobne (klasa Ia leków antyarytmicznych), spowalniając depolaryzację komór.'],
        ['Kanałów wapniowych typu L w trzustce', 'Kanały te regulują wyrzut insuliny, nie odpowiadają za poszerzenie QRS.'],
      ],
      [
        'U pacjentki dochodzi do uogólnionego napadu drgawkowego, a ciśnienie tętnicze spada do 75/40 mmHg.',
        'Jaki lek należy podać natychmiast drogą dożylną jako swoistą terapię ratunkową w zatruciu TLPD?',
        ['Wodorowęglan sodu (8,4% NaHCO3) w szybkim wlewie i.v. do uzyskania pH krwi 7,45–7,55', 'Ładunek sodu i alkalizacja osocza wypierają amitryptylinę z kanałów Nav1.5, zwężając QRS i stabilizując rytm.'],
        ['Fenytoinę w szybkim bolusie dożylnym', 'Fenytoina blokuje te same kanały sodowe i nasila kardiotoksyczność TLPD.'],
      ],
      [
        'Po podaniu 150 ml 8,4% NaHCO3 zespół QRS uległ zwężeniu do 98 ms, ciśnienie wzrosło do 105/65 mmHg.',
        'Jakie jest rozpoznanie?',
        ['Ostre ciężkie zatrucie trójpierścieniowym lekiem przeciwdepresyjnym (TLPD) z zagrażającą kardiotoksycznością', 'Obraz z poszerzeniem QRS i objawami cholinolitycznymi jest patognomoniczny dla TLPD.'],
        ['Zawał serca z uniesieniem odcinka ST (STEMI)', 'Poszerzenie QRS uogólnione bez lokalnego uniesienia ST i z suchością śluzówek wskazuje na toksykologię.'],
      ],
      [
        'Po ustabilizowaniu pacjentka trafia na OIT w celu dalszego monitorowania.',
        'Dlaczego leki z grupy TLPD zostały zastąpione w I rzucie leczenia depresji przez SSRI?',
        ['Ze względu na ekstremalną toksyczność w przedawkowaniu i wysokie ryzyko śmiertelnych powikłań kardiologicznych', 'SSRI są bezpieczne w przedawkowaniu, podczas gdy dawka śmiertelna TLPD to zaledwie kilkutygodniowy zapas leku.'],
        ['Ponieważ TLPD są całkowicie nieskuteczne w leczeniu depresji', 'TLPD są wysoce skutecznymi lekami, lecz ich profil bezpieczeństwa jest niekorzystny.'],
      ],
    ]
  ),
  make(
    'atypowe-antydepresanty-multimodalne',
    'Spadek energii i obawa o sferę intymną',
    'Mężczyzna, 35 lat',
    'Podstawowy',
    'Inżynier budownictwa zgłasza się z powodu obniżenia napędu, apatii i trudności z porannym wstawaniem. Wcześniej brał paroksetynę, lecz odstawił ją z powodu anorgazmii.',
    [
      [
        'Pacjent kategorycznie odmawia leków, które mogłyby pogorszyć jego życie seksualne lub wywołać spadek libido.',
        'Który lek przeciwdepresyjny o profilu NDRI jest lekiem I wyboru w tej sytuacji klinicznej?',
        ['Bupropion', 'Jako inhibitor wychwytu zwrotnego noradrenaliny i dopaminy nie wykazuje komponentu serotoninergicznego i nie osłabia funkcji seksualnych.'],
        ['Fluoksetyna w dawce 60 mg/d', 'Wysokie dawki SSRI nasilają zaburzenia erekcji i anorgazmię przez stymulację 5-HT2A.'],
      ],
      [
        'Przed włączeniem leku zebrano wywiad dotyczący napadów padaczkowych (brak), urazów głowy (brak) oraz zaburzeń odżywiania (brak).',
        'Dlaczego wykluczenie padaczki i zaburzeń odżywiania jest bezwzględnie wymagane przed zleceniem bupropionu?',
        ['Bupropion obniża próg drgawkowy, stwarzając ryzyko napadu drgawkowego u osób predysponowanych', 'W bulimii i anoreksji ryzyko to wzrasta wielokrotnie wskutek zaburzeń elektrolitowych.'],
        ['Bupropion powoduje natychmiastowe wypadnięcie wyrostka robaczkowego', 'Nie ma takiego powikłania medycznego.'],
      ],
      [
        'U pacjenta nie stwierdzono żadnych przeciwwskazań neurologicznych ani somatycznych.',
        'Jakie jest rozpoznanie kliniczne?',
        ['Epizod depresyjny z dominującym deficytem dopaminergicznym (apatia/anhedonia) z nietolerancją SSRI', 'Profil pacjenta idealnie kwalifikuje do terapii NDRI.'],
        ['Uzależnienie od kofeiny', 'Objawy wykraczają daleko poza picie kawy, spełniając kryteria MDD.'],
      ],
      [
        'Wdrożono bupropion w dawce 150 mg/d w formulacji o zmodyfikowanym uwalnianiu (Neuraxpharm / Wellbutrin XR).',
        'Jakiej pory dnia dotyczy zalecenie przyjmowania bupropionu XR?',
        ['Rano po śniadaniu, aby uniknąć bezsenności wywołanej działaniem aktywizującym', 'Działanie dopaminergiczno-noradrenergiczne podane wieczorem utrudniałoby zasypianie.'],
        ['Wyłącznie o północy tuż przed snem', 'Przyjęcie stymulującego leku na noc zrujnowałoby architekturę snu pacjenta.'],
      ],
    ]
  ),
  make(
    'normotymiki-lit-walproinian-lamotrygina',
    'Drżenie rąk i pragnienie u pacjenta z ChAD',
    'Mężczyzna, 41 lat',
    'Zaawansowany',
    'Pacjent leczony węglanem litu od 3 lat z powodu ChAD I zgłasza się z powodu nasilonego drżenia grubofalistego dłoni, chwiejnego chodu i pragnienia po zażyciu leków przeciwbólowych na rwę kulszową.',
    [
      [
        'W badaniu pacjent jest senny, podsypiający, mówi niewyraźnie (dyzartria), pije 4 litry wody na dobę. Od tygodnia przyjmuje ketoprofen w wysokich dawkach.',
        'Jaka interakcja farmakokinetyczna doprowadziła do kumulacji litu?',
        ['Niesteroidowe leki przeciwzapalne (NLPZ) hamują syntezę prostaglandyn nerkowych, obniżając filtrację kłębuszkową i klirens litu o 30–50%', 'Powoduje to gwałtowny skok stężenia litu we krwi do wartości toksycznych.'],
        ['Ketoprofen przekształcił się w lit w kanalikach nerkowych', 'Związki chemiczne nie ulegają transmutacji pierwiastków.'],
      ],
      [
        'Oznaczono stężenie litu w surowicy krwi w trybie pilnym: wynik wynosi 1,55 mmol/l (zakres terapeutyczny 0,6–0,8 mmol/l).',
        'Jak należy zakwalifikować ten stan kliniczny?',
        ['Ostra neurotoksyczność litu wymagająca natychmiastowego odstawienia leku i hospitalizacji', 'Stężenia powyżej 1,2–1,5 mmol/l z objawami ataksji i drżeń to stan zagrożenia życia.'],
        ['Optymalne stężenie w fazie zaostrzenia niewymagające modyfikacji', 'Pozostawienie pacjenta na tej dawce grozi nieodwracalnym uszkodzeniem móżdżku i nerek.'],
      ],
      [
        'Wykonano badania: kreatynina 1,6 mg/dl (wzrost z 0,9), sód 138 mmol/l, eGFR 48 ml/min.',
        'Jakie jest rozpoznanie?',
        ['Polekowe zatrucie litem powikłane ostrym uszkodzeniem nerek wskutek interakcji z NLPZ', 'Kombinacja nefrotoksyczności i neurotoksyczności litowej.'],
        ['Udar niedokrwienny móżdżku', 'Symetryczne objawy i wysokie stężenie litu wskazują na zatrucie ogólnoustrojowe.'],
      ],
      [
        'Pacjent trafił na oddział toksykologii lub intensywnej terapii.',
        'Jakie jest leczenie z wyboru w zatruciu litem o stężeniu 1,5–2,0 mmol/l z objawami neurologicznymi?',
        ['Odstawienie litu i NLPZ, intensywna płynoterapia dożylna 0,9% NaCl (forsowanie diurezy sodowej) oraz kontrola parametrów nerkowych', 'Sód konkuruje z litem o resorpcję zwrotną w ramieniu wstępującym pętli Henlego, przyspieszając jego wydalanie.'],
        ['Podanie węgla aktywowanego doustnie', 'Węgiel aktywowany nie wiąże jonów nieorganicznych, takich jak lit.'],
      ],
    ]
  ),
  make(
    'leki-przeciwpsychotyczne-generacje',
    'Niepokój nóg po włączeniu nowego neuroleptyku',
    'Kobieta, 30 lat',
    'Podstawowy',
    'Pacjentka leczona z powodu zaburzeń afektywnych rozpoczęła przyjmowanie aripiprazolu w dawce 10 mg/d. Po 4 dniach zgłasza niemożność usiedzenia na krześle.',
    [
      [
        'Pacjentka stale chodzi po pokoju, przebiera nogami, mówi, że czuje "wewnętrzny silnik w ciele", który zmusza ją do ciągłego ruchu. Nie ma myśli psychotycznych.',
        'Jaki objaw pozapiramidowy rozwinął się u pacjentki?',
        ['Akatyzja polekowa', 'Akatyzja to subiektywne poczucie przymusu ruchu i niemożność pozostania w bezruchu, typowa dla wczesnej fazy aripiprazolu.'],
        ['Ostra fobia społeczna', 'Chęć ruchu ma podłoże somatomotoryczne, a nie lęk przed oceną innych.'],
      ],
      [
        'Klinicysta musi odróżnić akatyzję od pobudzenia psychoruchowego w przebiegu zaostrzenia choroby podstawowej.',
        'Dlaczego błędne rozpoznanie pobudzenia i zwiększenie dawki aripiprazolu byłoby katastrofalne w skutkach?',
        ['Zwiększenie dawki neuroleptyku dramatycznie nasiliłoby akatyzję, co może doprowadzić pacjenta do impulsywnej próby samobójczej', 'Akatyzja jest jednym z najbardziej męczących polekowych stanów psychicznych i generuje ryzyko suicydalne.'],
        ['Spowodowałoby natychmiastową utratę wzroku', 'Aripiprazol nie uszkadza nerwu wzrokowego w ten sposób.'],
      ],
      [
        'W skali BARS (Barnes Akathisia Rating Scale) pacjentka uzyskuje 4 punkty (akatyzja uogólniona umiarkowana).',
        'Jakie jest rozpoznanie?',
        ['Wczesna akatyzja polekowa po częściowym agoniście receptora D2', 'Objaw wystąpił w typowym oknie czasowym pierwszego tygodnia terapii.'],
        ['Zespół niespokojnych nóg (RLS) idiopatyczny', 'RLS występuje wyłącznie wieczorem i w spoczynku nocnym, podczas gdy akatyzja trwa przez cały dzień.'],
      ],
      [
        'Planowane jest pilne wdrożenie leczenia znoszącego objaw.',
        'Jaki lek I wyboru przynosi najszybszą ulgę w akatyzji polekowej?',
        ['Propranolol (20–40 mg/d) lub doraźnie niska dawka benzodiazepiny (np. lorazepam) wraz z redukcją dawki aripiprazolu', 'Beta-adrenolityki wygaszają obwodowe i ośrodkowe napięcie adrenergiczne odpowiedzialne za akatyzację.'],
        ['Zwiększenie dawki aripiprazolu do 30 mg/d', 'To kardynalny błąd nasilający cierpienie pacjentki.'],
      ],
    ]
  ),
  make(
    'benzodiazepiny-leki-z-tapering',
    'Napad paniki z odbicia po odstawieniu leku',
    'Kobieta, 46 lat',
    'Podstawowy',
    'Prawniczka przyjmowała alprazolam w dawce 1 mg 3x dziennie przez 18 miesięcy z powodu lęku. Po skończeniu się opakowania odstawiła lek z dnia na dzień.',
    [
      [
        'Po 24 godzinach od ostatniej tabletki pacjentka doznaje potwornego lęku, drżenia całego ciała, nadwrażliwości na dźwięki i światło oraz skoku ciśnienia do 180/110 mmHg.',
        'Jaki zespół kliniczny rozwinął się u pacjentki?',
        ['Ostry zespół odstawienny po nagłym przerwaniu benzodiazepiny krótko działającej', 'Nagły brak allosterycznej modulacji GABA-A odsłania niehamowaną burzę glutaminergiczną w mózgowiu.'],
        ['Fizjologiczny objaw dobrego samopoczucia', 'Jest to stan bezpośredniego zagrożenia napadem padaczkowym i majaczeniem.'],
      ],
      [
        'Pacjentka trafia do gabinetu lekarskiego w stanie skrajnego niepokoju z drżeniem zamiarowym.',
        'Przed jakim zagrażającym życiu powikłaniem neurologicznym należy natychmiast zabezpieczyć pacjentkę?',
        ['Przed uogólnionym napadem drgawkowym toniczno-klonowym i stanem padaczkowym', 'Nagłe odstawienie wysokich dawek BZD jest jedną z głównych przyczyn polekowych napadów drgawkowych.'],
        ['Przed złamaniem wyrostka mieczykowatego', 'Zespoły odstawienne nie wywołują samoistnych złamań mostka.'],
      ],
      [
        'Pacjentka spełnia kryteria zespołu uzależnienia od benzodiazepin z ostrym zespołem abstynencyjnym.',
        'Jakie jest prawidłowe rozpoznanie?',
        ['Zespół uzależnienia od benzodiazepin powikłany ostrym zespołem abstynencyjnym', 'Wymaga zaplanowanej procedury detoksykacji farmakologicznej.'],
        ['Guz chromochłonny nadnerczy', 'Wywiad przewlekłego przyjmowania alprazolamu jednoznacznie wyjaśnia etiologię objawów.'],
      ],
      [
        'Klinicysta wdraża procedurę bezpiecznego odstawiania wg wytycznych Heather Ashton.',
        'Jaki jest właściwy schemat postępowania wg Protokołu Ashtona?',
        ['Zamiana 3 mg alprazolamu na równoważną dawkę długodziałającego diazepamu (ok. 60 mg/d w dawkach podzielonych) i stopniowa redukcja o 1–2 mg co 1–2 tygodnie', 'Stabilne stężenie diazepamu i jego metabolitów eliminuje skoki lęku i chroni przed drgawkami.'],
        ['Zalecenie picia melisy i całkowitego unikania kontaktu z lekarzem', 'Pozostawienie pacjentki bez BZD stwarza śmiertelne zagrożenie neurologiczne.'],
      ],
    ]
  ),
  make(
    'ostre-stany-toksyczne-zespol-serotoninowy',
    'Gorączka, obfite poty i drżenia u pacjenta z rwą kulszową',
    'Mężczyzna, 56 lat',
    'Zaawansowany',
    'Mężczyzna leczony od roku sertraliną w dawce 100 mg/d otrzymał od lekarza POZ z powodu ostrej rwy kulszowej tramadol w kroplach (300 mg/d). Po 12 godzinach trafia na SOR.',
    [
      [
        'Pacjent ma temperaturę 38,9°C, obficie się poci, jest pobudzony i splątany. W badaniu neurologicznym: klonus obu rzepek i stóp oraz wygórowane odruchy głębokie (4+).',
        'Czy stan pacjenta spełnia kryteria decyzyjne Huntera toksyczności serotoninowej?',
        ['Tak, obecność gorączki > 38°C, wzmożonego napięcia mięśniowego oraz klonusa spełnia kryteria Huntera ze 100% swoistością', 'Połączenie SSRI z tramadolem (inhibitorem SERT) wywołało toksyczną burzę serotoninową.'],
        ['Nie, do zespołu serotoninowego wymagana jest utrata wszystkich zębów', 'Zęby nie mają żadnego związku z układem serotoninergicznym.'],
      ],
      [
        'W badaniach laboratoryjnych leukocytoza 14 tys./ul, stężenie kinazy CPK umiarkowanie podwyższone (650 IU/l), perystaltyka jelit żywa, głośna.',
        'Jaka cecha badania brzucha i perystaltyki odróżnia ten stan od złośliwego zespołu neuroleptycznego (NMS)?',
        ['W zespole serotoninowym perystaltyka jest wzmożona (biegunka, przelewanie), a w NMS jest osłabiona lub porażenna', 'Nadmiar serotoniny silnie stymuluje receptory jelitowe 5-HT3 i 5-HT4.'],
        ['W zespole serotoninowym wątroba całkowicie zanika w USG', 'USG wątroby jest prawidłowe.'],
      ],
      [
        'Wszystkie dane kliniczne wskazują na ciężki stan zagrożenia życia.',
        'Jakie jest rozpoznanie?',
        ['Ciężki zespół serotoninowy indukowany niebezpieczną interakcją sertraliny z tramadolem', 'Klasyczna, zagrażająca życiu jatrogenna toksyczność serotoninowa.'],
        ['Zwykła grypa żołądkowa powikłana odwodnieniem', 'Grypa nie wywołuje wygórowania odruchów ścięgnistych ani klonusa stóp.'],
      ],
      [
        'Zespół SOR natychmiast odstawia sertralinę i tramadol, podaje diazepam i.v. i wdraża chłodzenie.',
        'Jaki lek będący swoistym antagonistą 5-HT2A należy podać jako odtrutkę w tym zespole?',
        ['Cyproheptadyna (początkowo 12 mg p.o. lub przez zgłębnik, potem 2 mg co 2 godziny)', 'Szybko blokuje receptory serotoninowe, wygaszając hipertermię i klonus.'],
        ['Dojęzykowa nitrogliceryna w aerozolu', 'Nitrogliceryna nasiliłaby hipotensję i nie ma wpływu na receptory 5-HT.'],
      ],
    ]
  ),
  make(
    'lekoopornosc-i-klozapina',
    'Przełamanie 5-letniej psychozy lekoopornej',
    'Mężczyzna, 29 lat',
    'Zaawansowany',
    'Mężczyzna z rozpoznaniem schizofrenii od 5 lat był leczony olanzapiną (20 mg/d przez 3 mies.), a następnie aripiprazolem (30 mg/d przez 4 mies.). Nadal słyszy głosy i ma urojenia.',
    [
      [
        'W badaniu TDM potwierdzono prawidłowe stężenia obu wcześniej stosowanych leków, wykluczając brak adherencji. Pacjent nadal spełnia kryteria aktywnej psychozy.',
        'Czy pacjent spełnia międzynarodowe kryteria schizofrenii lekoopornej (TRS) wg grupy TRRIP?',
        ['Tak, brak odpowiedzi na co najmniej 2 różne leki przeciwpsychotyczne w odpowiedniej dawce i czasie przy udokumentowanej adherencji definiuje TRS', 'Odwlekanie wdrożenia leku z wyboru w tym momencie jest błędem w sztuce lekarskiej.'],
        ['Nie, lekooporność można rozpoznać dopiero po przetestowaniu 20 różnych leków przez 50 lat', 'Kryteria TRRIP wymagają dokładnie 2 nieudanych prób terapeutycznych.'],
      ],
      [
        'Przed wdrożeniem klozapiny wykonano badania wyjściowe: morfologia krwi (ANC 4200/ul), glukoza 88 mg/dl, lipidogram w normie, EKG prawidłowe.',
        'Od jakiej dawki należy bezwzględnie rozpocząć titrację klozapiny w pierwszym dniu?',
        ['12,5 mg do 25 mg podane na noc', 'Zabezpiecza to pacjenta przed ciężką hipotensją ortostatyczną i zapaścią naczyniową wywołaną blokadą alfa-1.'],
        ['300 mg rano w pojedynczej dawce', 'Taka dawka uderzeniowa stwarza śmiertelne zagrożenie kardiologiczne.'],
      ],
      [
        'W trakcie powolnego zwiększania dawki dobowej pacjent w 3. tygodniu osiągnął dawkę 300 mg/d. Stężenie klozapiny we krwi wynosi 410 ng/ml.',
        'Jak ocenić to stężenie w odniesieniu do okna terapeutycznego AGNP?',
        ['Stężenie znajduje się w optymalnym przedziale terapeutycznym (350–600 ng/ml)', 'Gwarantuje to maksymalną szansę na redukcję lekoopornych objawów wytwórczych.'],
        ['Stężenie jest skrajnie toksyczne i wymaga dializoterapii', 'Toksyczność pojawia się typowo powyżej 1000 ng/ml.'],
      ],
      [
        'Pacjent zgłasza brak wypróżnienia od 4 dni i ból brzucha.',
        'Jakie krytyczne zalecenie profilaktyczne należy wdrożyć natychmiast, aby zapobiec zgonowi z powodu atonii jelit?',
        ['Natychmiastowe wdrożenie leków osmotycznych (makrogole / PEG), kontrola perystaltyki i wykluczenie niedrożności jelit', 'Hipomotoryka jelit na klozapinie jest powikłaniem potencjalnie śmiertelnym, wymagającym aktywnego leczenia od pierwszych objawów zaparcia.'],
        ['Zalecenie głodówki przez 3 tygodnie', 'Głodówka nie przywróci motoryki porażonego jelita.'],
      ],
    ]
  ),
];
