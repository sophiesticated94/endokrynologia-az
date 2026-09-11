import { type DraftLesson, q } from './course-types.ts';

export const draftOtyloscPart3: DraftLesson[] = [
  {
    id: 'otylosc-leki-nieinkretynowe',
    title: 'Terapie nieinkretynowe: bupropion z naltreksonem, orlistat i leki historyczne',
    group: 'Farmakoterapia otyłości',
    readTime: '13 min',
    goals: [
      'Zrozumieć molekularny synergizm połączenia bupropionu z naltreksonem w podwzgórzu i układzie mezolimbicznym.',
      'Scharakteryzować mechanizm orlistatu, profil działań niepożądanych i konieczność suplementacji witamin ADEK.',
      'Poznać przyczyny wycofania historycznych leków przeciwotyłościowych (pochodne amfetaminy, sybutramina, rimonabant).',
    ],
    sections: [
      {
        title: 'Bupropion / Naltrekson: podwójna blokada podwzgórzowa i układ nagrody',
        content:
          'Preparat złożony bupropionu z naltreksonem (Mysimba/Contrave) łączy inhibitor wychwytu zwrotnego dopaminy i noradrenaliny (bupropion) z antagonistą receptorów opioidowych mi (naltrekson). Bupropion pobudza neurony POMC w jądrze łukowatym do uwalniania alfa-MSH, co wywołuje sytość. Jednakże wraz z alfa-MSH neurony POMC uwalniają beta-endorfinę, która wiąże się z autoreceptorami opioidowymi mi na tych samych neuronach i hamuje dalszą syntezę POMC (pętla autoinhibicji). Naltrekson blokuje receptory mi, znosząc to hamowanie i umożliwiając ciągłą, silną stymulację sytości przez bupropion. Dodatkowo lek działa na mezolimbiczny układ nagrody, redukując głód hedoniczny i napady objadania się (craving).',
      },
      {
        title: 'Orlistat: miejscowy inhibitor lipaz żołądkowo-jelitowych',
        content:
          'Orlistat (Xenical) jest syntetyczną pochodną lipstatyny, która kowalencyjnie wiąże się z resztą serynową w centrum aktywnym lipazy żołądkowej i trzustkowej w świetle przewodu pokarmowego. Uniemożliwia to hydrolizę triacylogliceroli do wchłanialnych wolnych kwasów tłuszczowych i monoacylogliceroli, zmniejszając wchłanianie tłuszczu pokarmowego o około 30%. Ponieważ lek działa czysto miejscowo i nie wchłania się do krążenia, nie wywołuje powikłań ogólnoustrojowych, jednak powoduje stolce tłuszczowe, parcie naglące i wzdęcia. Wymaga profilaktycznej suplementacji witamin rozpuszczalnych w tłuszczach (A, D, E, K) podawanych co najmniej 2 godziny po przyjęciu leku.',
      },
      {
        title: 'Lekcja historii: amfetaminy, fenfluramina, sybutramina i rimonabant',
        content:
          'Historia farmakoterapii otyłości obfituje w leki wycofane z powodu toksyczności. Pochodne amfetaminy wywoływały uzależnienie i psychozy. Połączenie fenfluramina/fentermina (Fen-Phen) doprowadziło do fali zastawkowych wad serca i nadciśnienia płucnego wskutek stymulacji receptorów serotoninowych 5-HT2B. Sybutramina (inhibitor SNRI) została wycofana po badaniu SCOUT z powodu wzrostu incydentów sercowo-naczyniowych i udarów. Rimonabant (odwrotny agonista receptora kannabinoidowego CB1) skutecznie redukował masę ciała, lecz wywoływał ciężkie depresje, lęki i wzrost ryzyka samobójstw.',
      },
    ],
    table: {
      caption: 'Porównanie leków nieinkretynowych stosowanych w otyłości',
      headers: ['Lek', 'Punkt uchwytu', 'Średnia redukcja masy ciała', 'Przeciwwskazania i uwagi'],
      rows: [
        ['Bupropion / Naltrekson', 'Wychwyt NA/DA + blokada receptora mi-opioidowego', '~5,0% – 6,5% (skorygowana o placebo)', 'Niekontrolowane nadciśnienie, padaczka, stosowanie opioidów'],
        ['Orlistat', 'Inhibitor lipazy trzustkowej i żołądkowej w świetle jelita', '~3,0% – 4,0% (skorygowana o placebo)', 'Zespół przewlekłego złego wchłaniania, cholestaza, stolce tłuszczowe'],
        ['Fentermina / Topiramat', 'Uwalnianie NA + modulacja receptorów GABA/kainianowych', '~8,0% – 9,0% (dostępny w USA, brak rejestracji w UE)', 'Choroba wieńcowa, jaskra, nadczynność tarczycy, teratogenność'],
      ],
    },
    advanced:
      'Stosowanie bupropionu z naltreksonem jest bezwzględnie przeciwwskazane u chorych przewlekle przyjmujących leki opioidowe (np. tramadol, buprenorfinę, fentanyl, morfinę) z powodu ryzyka natychmiastowego wywołania ostrego zespołu odstawiennego. Ponadto bupropion obniża próg drgawkowy, co wyklucza jego użycie u chorych na padaczkę, z guzem mózgu lub w trakcie nagłego odstawiania alkoholu lub benzodiazepin. Wymagane jest również monitorowanie ciśnienia tętniczego i tętna ze względu na komponent noradrenergiczny bupropionu.',
    summary:
      'Bupropion z naltreksonem łączy stymulację POMC ze zniesieniem autoinhibicji opioidowej, redukując głód hedoniczny. Orlistat hamuje lipazę jelitową (spadek wchłaniania tłuszczu o 30%), wymagając witamin ADEK. Dawne leki (sybutramina, rimonabant) wycofano przez powikłania krążeniowe i psychiatryczne.',
    sourceIds: ['easo-2024', 'aace-abcd-2024'],
    questions: [
      q(
        'W jaki sposób naltrekson potęguje działanie bupropionu w redukcji łaknienia w preparacie złożonym?',
        ['Blokuje receptory mi-opioidowe, znosząc hamowanie neuronów POMC wywoływane przez endogenną beta-endorfinę', 'Usunięcie autoinhibicji opioidowej pozwala bupropionowi na ciągłą stymulację wydzielania alfa-MSH.'],
        ['Wzmaga wchłanianie bupropionu w żołądku poprzez podwyższenie pH', 'Naltrekson działa w ośrodkowym układzie nerwowym, a nie na wchłanianie żołądkowe.'],
        ['Zmienia bupropion w cząsteczkę peptydu inkretynowego GLP-1', 'Bupropion jest małą cząsteczką chemiczną, nie staje się peptydem.'],
      ),
      q(
        'Który stan chorobowy stanowi bezwzględne przeciwwskazanie do włączenia leku bupropion/naltrekson?',
        ['Wywiad napadów padaczkowych w przeszłości lub niekontrolowane nadciśnienie tętnicze', 'Bupropion obniża próg drgawkowy i może wywołać napad padaczkowy oraz podwyższać ciśnienie.'],
        ['Otyłość brzuszna z obwodem talii > 100 cm', 'Otyłość brzuszna jest głównym wskazaniem do leczenia, a nie przeciwwskazaniem.'],
        ['Stan przedcukrzycowy ze stężeniem glukozy 110 mg/dl', 'Stan przedcukrzycowy odnosi korzyści z redukcji masy ciała pod wpływem leku.'],
      ),
      q(
        'Jakie zalecenie dotyczące suplementacji witamin należy przekazać pacjentowi rozpoczynającemu terapię orlistatem?',
        ['Konieczna jest codzienna suplementacja witamin rozpuszczalnych w tłuszczach (A, D, E, K) przyjmowanych co najmniej 2 godziny przed lub po orlistacie', 'Orlistat upośledza wchłanianie frakcji lipidowej diety wraz z witaminami lipofilnymi.'],
        ['Należy całkowicie odstawić witaminę C i kwas foliowy', 'Witaminy rozpuszczalne w wodzie wchłaniają się prawidłowo i nie wymagają odstawiania.'],
        ['Konieczne są dożylne wlewy witaminy B12 co drugi dzień', 'Orlistat nie zaburza wchłaniania witaminy B12 w jelicie krętym.'],
      ),
      q(
        'Dlaczego lek przeciwotyłościowy rimonabant został definitywnie wycofany z rynku farmaceutycznego?',
        ['Powodował ciężkie zaburzenia psychotyczne, depresję i znamienny wzrost ryzyka prób samobójczych', 'Blokada receptorów endokannabinoidowych CB1 w mózgowiu indukowała anhedonię i stany lękowe.'],
        ['Wywoływał gwałtowną martwicę kory nadnerczy', 'Rimonabant nie wykazywał adrenotoksyczności.'],
        ['Prowadził do nieodwracalnej utraty słuchu', 'Ototoksyczność nie była problemem rimonabantu.'],
      ),
      q(
        'Jaki jest mechanizm działania farmakologicznego orlistatu w świetle przewodu pokarmowego?',
        ['Kowalencyjne hamowanie lipazy żołądkowej i trzustkowej, zapobiegające trawieniu około 30% triglicerydów pokarmowych', 'Niestrawione tłuszcze są wydalane ze stolcem, obniżając bilans kaloryczny posiłku.'],
        ['Blokada receptorów dla kwasów żółciowych w enterocytach', 'Orlistat hamuje enzym lipolityczny, nie wiąże kwasów żółciowych jak cholestyramina.'],
        ['Zabijanie bakterii jelitowych produkujących maślany', 'Lek nie jest antybiotykiem i nie sterylizuje flory jelitowej.'],
      ),
    ],
  },
  {
    id: 'otylosc-strategia-terapeutyczna',
    title: 'Strategia długoterminowa, adaptacja metaboliczna i zapobieganie efektowi jojo',
    group: 'Farmakoterapia otyłości',
    readTime: '13 min',
    goals: [
      'Zrozumieć zjawisko adaptacyjnej termogenezy i nieliniowej dynamiki redukcji masy ciała.',
      'Scharakteryzować zapobieganie utracie beztłuszczowej masy ciała (FFM) poprzez trening oporowy i podaż białka.',
      'Poznać definicję otyłości jako choroby przewlekłej, nawrotowej oraz kryteria braku odpowiedzi na leczenie.',
    ],
    sections: [
      {
        title: 'Adaptacja metaboliczna (termogeneza adaptacyjna): biologiczny opór przed odchudzaniem',
        content:
          'Podczas restrykcji kalorycznej i utraty wagi organizm uruchamia potężne mechanizmy obronne ewolucyjnie wykształcone w celu ochrony przed śmiercią głodową. Spoczynkowy wydatek energetyczny (BMR) spada w stopniu większym, niż wynikałoby to z samej utraty masy tkanek metabolicznie czynnych — zjawisko to nosi nazwę adaptacji metabolicznej (adaptive thermogenesis). Spada stężenie leptyny, hormonów tarczycy (T3) i aktywność układu współczulnego, a jednocześnie rośnie stężenie oreksygennej greliny. W efekcie po kilku miesiącach odchudzania pacjent osiąga tzw. plateau (punkt równowagi), w którym zredukowany wydatek energii zrównuje się z obniżonym spożyciem kalorii.',
      },
      {
        title: 'Ochrona beztłuszczowej masy ciała (FFM) i zapobieganie sarkopenii',
        content:
          'W każdej niefizjologicznie szybkiej redukcji masy ciała od 20% do nawet 40% utraconych kilogramów może stanowić beztłuszczowa masa ciała (FFM — mięśnie szkieletowe, woda, narządy wewnętrzne). Ubytek masy mięśniowej drastycznie obniża wydatek spoczynkowy i zwiększa ryzyko otyłości sarkopenicznej oraz szybkiego efektu jojo po zaprzestaniu restrykcji. Kluczowymi filarami ochrony FFM podczas farmakoterapii analogami GLP-1/GIP są: 1) odpowiednia podaż białka w diecie (1,2–1,5 g/kg należnej masy ciała na dobę); 2) systematyczny trening oporowy (siłowy) stymulujący szlak mTOR i syntezę białek mięśniowych.',
      },
      {
        title: 'Otyłość jako choroba przewlekła nawrotowa: leczenie bezterminowe',
        content:
          'Badania STEP 1 Extension oraz SURMOUNT-4 jednoznacznie udowodniły, że przerwanie stosowania leków inkretynowych (semaglutydu, tirzepatydu) prowadzi w ciągu 1 roku do odzyskania średnio dwóch trzecich (60–70%) utraconej masy ciała oraz nawrotu zaburzeń metabolicznych. Potwierdza to współczesną definicję otyłości jako przewlekłej, nawrotowej choroby wymagającej leczenia bezterminowego (podobnie jak nadciśnienie tętnicze czy cukrzyca). Brak odpowiedzi na lek (non-responder) definiuje się jako ubytek masy ciała < 5% po 12–16 tygodniach stosowania pełnej dawki terapeutycznej, co stanowi wskazanie do zmiany leku lub kwalifikacji bariatrycznej.',
      },
    ],
    table: {
      caption: 'Fazy redukcji masy ciała i zmiany neurohormonalne',
      headers: ['Parametr metaboliczny', 'Faza wczesnej redukcji (0-3 mies.)', 'Faza plateau (6-12 mies.)', 'Faza po odstawieniu leków (efekt jojo)'],
      rows: [
        ['Masa ciała i skład', 'Szybki spadek wody, glikogenu i tłuszczu', 'Zwolnienie spadku, ryzyko utraty FFM', 'Szybki przyrost tłuszczu przy niskiej FFM'],
        ['Spoczynkowy metabolizm (BMR)', 'Umiarkowany spadek proporcjonalny do wagi', 'Głęboka adaptacja metaboliczna (-10% do -20%)', 'Trwale obniżony BMR sprzyja nadwyżce kalorii'],
        ['Leptyna w surowicy', 'Gwałtowny spadek stężenia', 'Bardzo niskie stężenie (głód podwzgórzowy)', 'Powolny wzrost wraz z odbudową tkanki tłuszczowej'],
        ['Grelina na czczo', 'Podwyższona (napęd do jedzenia)', 'Utrzymujące się wysokie stężenie oreksygenne', 'Bardzo wysoka stymulacja apetytu'],
      ],
    },
    advanced:
      'W modelu matematycznym Kevina Halla (NIH Body Weight Planner) wykazano, że reguła 3500 kcal na 1 funt tłuszczu (tzw. reguła Wishnofskyego zakładająca liniowy spadek wagi) jest całkowicie błędna w warunkach długoterminowych. Prawdziwa krzywa ubytku masy ciała ma charakter wykładniczy, asymptotycznie dążący do nowego punktu równowagi (set point). Zgodnie z modelem Halla każdy spadek masy ciała o 1 kg obniża dobowy wydatek energetyczny o około 20–25 kcal/d oraz zwiększa apetyt o około 100 kcal/d powyżej poziomu wyjściowego, co tłumaczy potężny biologiczny napęd do nawrotu masy ciała.',
    summary:
      'Adaptacja metaboliczna obniża wydatek energii i utrudnia redukcję wagi. Utrata mięśni FFM grozi sarkopenią, wymagając białka i treningu siłowego. Otyłość jest chorobą przewlekłą — odstawienie leków cofa ubytek wagi u >65% chorych.',
    sourceIds: ['easo-2024', 'aace-abcd-2024'],
    questions: [
      q(
        'Co oznacza pojęcie adaptacji metabolicznej (adaptacyjnej termogenezy) podczas redukcji masy ciała?',
        ['Spadek spoczynkowego wydatku energetycznego (BMR) w stopniu większym, niż wynikałoby to z samej utraty masy tkanek', 'Organizm obniża tempo metabolizmu w odpowiedzi na deficyt kaloryczny, oszczędzając rezerwy tłuszczowe.'],
        ['Trwałe przyspieszenie akcji serca i podwyższenie temperatury ciała do 39 stopni C', 'Termogeneza adaptacyjna obniża, a nie podwyższa spoczynkowy wydatek energii.'],
        ['Natychmiastowe przekształcenie całej tkanki tłuszczowej w brunatną tkankę BAT', 'W trakcie głodówki proces browningu ulega wygaszeniu w celu oszczędzania energii.'],
      ),
      q(
        'Jaki odsetek utraconej masy ciała odzyskują średnio pacjenci w ciągu roku po zaprzestaniu farmakoterapii agonistami GLP-1 (wg badania STEP 1 Extension)?',
        ['Około dwóch trzecich (60–70%) utraconej masy ciała', 'Odzyskanie masy ciała po odstawieniu dowodzi, że otyłość jest chorobą przewlekłą wymagającą leczenia ciągłego.'],
        ['Dokładnie 0% (masa ciała pozostaje trwale obniżona na zawsze)', 'Nieleczona choroba otyłościowa ma tendencję do natychmiastowego nawrotu.'],
        ['Ponad 300% wyjściowej masy ciała u każdego pacjenta', 'Efekt jojo rzadko prowadzi do potrojenia masy ciała w ciągu 12 miesięcy.'],
      ),
      q(
        'Jaka interwencja jest kluczowa w trakcie intensywnej farmakoterapii otyłości w celu ochrony beztłuszczowej masy ciała (FFM)?',
        ['Wdrożenie regularnego treningu oporowego (siłowego) oraz zapewnienie podaży białka 1,2–1,5 g/kg należnej m.c./dobę', 'Trening siłowy stymuluje anabolizm mięśniowy, zapobiegając otyłości sarkopenicznej.'],
        ['Całkowite wyeliminowanie białka z diety na rzecz tłuszczów nasyconych', 'Niedobór białka drastycznie nasiliłby katabolizm mięśni szkieletowych.'],
        ['Leżenie w łóżku przez 14 godzin na dobę w celu odpoczynku mięśni', 'Unieruchomienie jest silnym czynnikiem indukującym atrofię mięśniową.'],
      ),
      q(
        'Jak zgodnie z wytycznymi definiuje się brak zadowalającej odpowiedzi terapeutycznej (non-responder) na wdrożony lek przeciwotyłościowy?',
        ['Ubytek masy ciała mniejszy niż 5% po 12–16 tygodniach stosowania pełnej dawki terapeutycznej leku', 'W takiej sytuacji wytyczne zalecają modyfikację dawki, zmianę leku lub kwalifikację bariatryczną.'],
        ['Brak spadku masy ciała o co najmniej 30 kg w pierwszym tygodniu leczenia', 'Oczekiwanie 30 kg w tydzień jest biologicznie niemożliwe i medycznie szkodliwe.'],
        ['Wystąpienie jakichkolwiek przejściowych nudności w trakcie eskalacji dawki', 'Nudności są typowym, przejściowym działaniem niepożądanym leków inkretynowych.'],
      ),
      q(
        'Dlaczego tradycyjna reguła Wishnofskyego (3500 kcal deficytu = 1 funt utraty tłuszczu) zawodzi w prognozowaniu długoterminowym?',
        ['Zakłada nierealistycznie liniowy spadek wagi, ignorując spadek BMR i narastający neurohormonalny napęd głodu w miarę chudnięcia', 'Model Halla uwzględnia nieliniową dynamikę i adaptację metaboliczną, odzwierciedlając rzeczywiste plateau.'],
        ['Ponieważ 1 gram tłuszczu dostarcza w rzeczywistości 50 kcal energii', '1 g tłuszczu dostarcza 9 kcal (około 7700 kcal na 1 kg tkanki tłuszczowej).'],
        ['Ponieważ organizm ludzki nie podlega prawom termodynamiki', 'Prawa termodynamiki bezwzględnie obowiązują w fizjologii człowieka.'],
      ),
    ],
  },
  {
    id: 'otylosc-bariotria-kwalifikacja-techniki',
    title: 'Chirurgia bariatryczna i metaboliczna: wytyczne IFSO/ASMBS 2023 i techniki operacyjne',
    group: 'Chirurgia bariatryczna i metaboliczna',
    readTime: '13 min',
    goals: [
      'Znać zaktualizowane wytyczne kwalifikacji bariatrycznej IFSO/ASMBS 2022/2023.',
      'Scharakteryzować anatomię i technikę rękawowej resekcji żołądka (LSG).',
      'Porównać ominięcie żołądkowe Roux-en-Y (RYGB) z ominięciem z jedną pętlą (OAGB).',
    ],
    sections: [
      {
        title: 'Przełomowe wytyczne kwalifikacji IFSO/ASMBS 2022/2023',
        content:
          'W 2022/2023 roku towarzystwa IFSO i ASMBS dokonały pierwszej od 30 lat (od konsensusu NIH z 1991 roku) aktualizacji kryteriów kwalifikacji do chirurgii metabolicznej i bariatrycznej (MBS): 1) Kwalifikacja bezwzględna: osoby z BMI >= 35 kg/m² kwalifikują się do operacji niezależnie od obecności lub braku chorób współistniejących; 2) Kwalifikacja warunkowa: osoby z BMI 30,0–34,9 kg/m² kwalifikują się do operacji, jeśli chorują na cukrzycę typu 2 lub inne istotne powikłania metaboliczne/mechaniczne otyłości; 3) Populacje azjatyckie: progi BMI obniża się o 2,5 kg/m² (odpowiednio BMI >= 32,5 oraz BMI >= 27,5 kg/m²); 4) Górna granica wieku została zniesiona — liczy się stan biologiczny i bilans ryzyka operacyjnego.',
      },
      {
        title: 'Laparoskopowa rękawowa resekcja żołądka (LSG)',
        content:
          'Rękawowa resekcja żołądka (Laparoscopic Sleeve Gastrectomy, LSG) jest obecnie najczęściej wykonywaną operacją bariatryczną na świecie (> 60% procedur). Polega na pionowym wycięciu około 75–80% objętości żołądka wzdłuż krzywizny większej na kalibratorze (sondzie) o rozmiarze 36–40 Fr, z pozostawieniem wąskiego, rurowatego żołądka wzdłuż krzywizny mniejszej. Mechanizm polega na restrykcji objętościowej oraz usunięciu dna żołądka (głównego miejsca syntezy oreksygennej greliny), co gwałtownie tłumi apetyt. Wadą LSG jest ryzyko zaostrzenia lub wywołania de novo refluksu żołądkowo-przełykowego (GERD).',
      },
      {
        title: 'Ominięcie żołądkowe Roux-en-Y (RYGB) i OAGB',
        content:
          'Ominięcie żołądkowo-jelitowe na pętli Roux-en-Y (RYGB) polega na wytworzeniu małego zbiornika żołądkowego (pouch) o objętości 20–30 ml, odcięciu go od reszty żołądka i zespoleniu z pętlą jelita czczego (pętla pokarmowa, alimentary limb o długości 100–150 cm). Pokarm omija odcięty żołądek, dwunastnicę i początkowy odcinek jelita czczego, łącząc się z sokami trawiennymi (pętla żółciowo-trzustkowa, biliopancreatic limb) w pętli wspólnej. RYGB wykazuje doskonałe działanie metaboliczne i przeciwrefluksowe. Alternatywą jest ominięcie żołądkowe z jednym zespoleniem (OAGB / Mini-Gastric Bypass), cechujące się krótszym czasem operacji, lecz niosące ryzyko refluksu zasadowego żółci do żołądka.',
      },
    ],
    table: {
      caption: 'Porównanie głównych procedur chirurgii bariatrycznej i metabolicznej',
      headers: ['Procedura', 'Mechanizm dominujący', 'Średnia utrata masy ciała (%TBWL)', 'Zalety / Wady'],
      rows: [
        ['Rękawowa resekcja (LSG)', 'Restrykcyjny + resekcja komórek grelinowych dna', '~25% – 30% po 1–2 latach', 'Brak zespoleń jelitowych, niska malabsorpcja / Ryzyko GERD'],
        ['Ominięcie Roux-en-Y (RYGB)', 'Restrykcyjny + metaboliczny + neurohormonalny', '~30% – 35% po 1–2 latach', 'Leczy GERD, potężna remisja T2D / Zespół poposiłkowy, wrzody brzeżne'],
        ['Ominięcie z 1 zespoleniem (OAGB)', 'Restrykcyjno-wyłączający (długa pętla)', '~30% – 38% po 1–2 latach', 'Wysoka skuteczność, jedno zespolenie / Ryzyko refluksu żółciowego'],
      ],
    },
    advanced:
      'Głównym przeciwwskazaniem anatomicznym do wykonania rękawowej resekcji żołądka (LSG) jest obecność ciężkiego zapalenia przełyku (stopień C i D wg klasyfikacji Los Angeles), duża przepuklina rozworu przełykowego oraz przełyk Barretta. U tych chorych zabiegiem z wyboru jest ominięcie żołądkowe Roux-en-Y (RYGB), które poprzez dekompresję i niskie ciśnienie w małym zbiorniku żołądkowym całkowicie eliminuje refluks kwaśny i prowadzi do wygojenia zmian zapalnych błony śluzowej przełyku.',
    summary:
      'Nowe kryteria IFSO 2023 kwalifikują do operacji osoby z BMI >= 35 bez powikłań oraz BMI 30–34.9 z powikłaniami. LSG rezygnuje z dna żołądka i obniża grelinę, lecz może nasilać GERD. RYGB jest złotym standardem w otyłości z GERD i ciężką cukrzycą typu 2.',
    sourceIds: ['ifso-asmbs-2023', 'easo-2024'],
    questions: [
      q(
        'Zgodnie ze zaktualizowanymi wytycznymi IFSO/ASMBS 2022/2023, od jakiego progu BMI pacjent kwalifikuje się do chirurgii bariatrycznej bez konieczności współistnienia innych powikłań?',
        ['BMI >= 35 kg/m²', 'Nowe wytyczne zniosły stary wymóg chorób towarzyszących dla BMI 35, uznając ten stopień otyłości za samodzielne wskazanie.'],
        ['BMI >= 50 kg/m²', 'Próg 50 kg/m² to otyłość skrajna (super-obesity), kwalifikacja następuje znacznie wcześniej.'],
        ['BMI >= 25 kg/m²', 'BMI 25 to początek nadwagi w populacji kaukaskiej, nie kwalifikujący do rutynowej operacji.'],
      ),
      q(
        'Dlaczego u pacjenta z otyłością olbrzymią i ciężkim refluksem żołądkowo-przełykowym (GERD stopnia C) procedurą z wyboru jest RYGB, a nie LSG?',
        ['LSG zwiększa ciśnienie wewnątrzżołądkowe i może drastycznie nasilić refluks, podczas gdy mały zbiornik w RYGB trwale leczy GERD', 'RYGB odcina wytwarzanie kwasu w zbiorniku pokarmowym i eliminuje zarzucanie treści żołądkowej do przełyku.'],
        ['LSG jest technicznie niemożliwe do wykonania u osób z refluksem', 'LSG jest wykonalne technicznie, ale obarczone powikłaniem ciężkiego pooperacyjnego zapalenia przełyku.'],
        ['W RYGB kwas żołądkowy jest odprowadzany rurką na zewnątrz ciała', 'Soki trawienne płyną pętlą enzymatyczną w głąb przewodu pokarmowego.'],
      ),
      q(
        'O ile obniża się progi BMI kwalifikacji bariatrycznej dla pacjentów pochodzenia azjatyckiego wg wytycznych IFSO?',
        ['O 2,5 kg/m² (kwalifikacja od BMI >= 32,5 bez powikłań i >= 27,5 z powikłaniami)', 'Populacje azjatyckie kumulują tłuszcz trzewny i rozwijają powikłania kardiometaboliczne przy niższych wartościach BMI.'],
        ['O 10,0 kg/m²', 'Tak drastyczna redukcja progu nie znajduje uzasadnienia epidemiologicznego.'],
        ['Progi nie ulegają żadnej zmianie niezależnie od rasy', 'Medycyna precyzyjna wymaga modyfikacji progów w zależności od etnicznej dystrybucji tkanki tłuszczowej.'],
      ),
      q(
        'Usunięcie której części żołądka podczas rękawowej resekcji (LSG) odpowiada za spektakularny spadek stężenia greliny we krwi?',
        ['Dna żołądka (fundus gastricus)', 'Komórki P/D1 syntetyzujące grelinę są zlokalizowane głównie w błonie śluzowej dna żołądka.'],
        ['Odźwiernika i opuszki dwunastnicy', 'Odźwiernik jest bezwzględnie oszczędzany podczas LSG w celu zachowania funkcji opróżniania żołądka.'],
        ['Wpustu żołądka', 'Wpust żołądka nie jest resekowany; resekcja zaczyna się około 2–4 cm od odźwiernika i kończy przy kącie Hisa.'],
      ),
      q(
        'Czym charakteryzuje się ominięcie żołądkowe z jednym zespoleniem (OAGB / Mini-Gastric Bypass)?',
        ['Wytworzeniem długiego, wąskiego zbiornika żołądkowego i pojedynczego zespolenia pętlowego z jelitem czczym', 'Upraszcza procedurę chirurgiczną i eliminuje ryzyko przepuklin wewnętrznych w przestrzeni Petersena.'],
        ['Wycięciem całego żołądka i bezpośrednim zespoleniem przełyku z jelitem krętym', 'Całkowita gastrektomia jest zabiegiem onkologicznym w raku żołądka, nie procedurą OAGB.'],
        ['Zespoleniem żołądka z pęcherzem moczowym', 'Przewód pokarmowy nigdy nie jest łączony z układem moczowym.'],
      ),
    ],
  },
  {
    id: 'otylosc-bariotria-mechanizmy-remisja',
    title: 'Mechanizmy metaboliczne bariatrii: oś jelitowo-trzustkowa, kwasy żółciowe i remisja T2D',
    group: 'Chirurgia bariatryczna i metaboliczna',
    readTime: '13 min',
    goals: [
      'Zrozumieć teorię jelita przedniego (foregut) i jelita tylnego (hindgut) w remisji cukrzycy typu 2.',
      'Scharakteryzować zmiany w puli kwasów żółciowych i aktywację receptorów FXR oraz TGR5 po operacji bariatrycznej.',
      'Poznać kryteria pełnej remisji cukrzycy typu 2 wg konsensusu ADA/EASD.',
    ],
    sections: [
      {
        title: 'Wczesna remisja cukrzycy typu 2: hipotezy foregut i hindgut',
        content:
          'U pacjentów poddanych operacji RYGB normalizacja glikemii na czczo i odstawienie insuliny następuje często już w 2.–3. dobie po zabiegu, na długo przed istotną utratą tkanki tłuszczowej. Tłumaczą to dwie komplementarne hipotezy: 1) Hipoteza jelita tylnego (hindgut hypothesis) — gwałtowne dotarcie niestrawionego pokarmu do dystalnego odcinka jelita czczego i krętego wywołuje potężny, nawet kilkunastokrotny wzrost poposiłkowego wydzielania inkretyn GLP-1, PYY i oksyntomoduliny przez komórki L, potęgując wyrzut insuliny i hamując glukagon; 2) Hipoteza jelita przedniego (foregut hypothesis) — ominięcie dwunastnicy i proksymalnego jelita czczego wygasza sekrecję hipotetycznych czynników diabetogennych (anty-inkretyn) nasilających insulinooporność.',
      },
      {
        title: 'Sygnalizacja kwasów żółciowych: receptory TGR5 i FXR',
        content:
          'Po zabiegach bariatrycznych (zwłaszcza RYGB i OAGB) dochodzi do 2–3-krotnego wzrostu stężenia krążących w surowicy kwasów żółciowych. Kwasy żółciowe działają nie tylko jako detergenty ułatwiające trawienie tłuszczów, lecz jako potężne hormony metaboliczne: aktywują błonowy receptor sprzężony z białkiem G (TGR5) na komórkach L jelita, stymulując sekrecję GLP-1, oraz w brunatnej tkance tłuszczowej i mięśniach, nasilając termogenezę poprzez konwersję T4 do T3 przez dejodynazę D2. W wątrobie aktywacja jądrowego receptora farnezoidowego X (FXR) hamuje glukoneogenezę i lipogenezę de novo.',
      },
      {
        title: 'Kryteria remisji cukrzycy typu 2 wg ADA/EASD',
        content:
          'Zgodnie z międzynarodowym konsensusem ADA/EASD/ASMBS (2021) remisję cukrzycy typu 2 definiuje się jako utrzymywanie się stężenia hemoglobiny glikowanej HbA1c < 6,5% (48 mmol/mol) przez co najmniej 3 miesiące bez stosowania jakichkolwiek leków hipoglikemizujących. W zależności od czasu trwania cukrzycy przed operacją, rezerwy wydzielniczej komórek beta (stężenie peptydu C) i stopnia utraty wagi, pełną remisję T2D osiąga od 60% do ponad 80% chorych po RYGB/OAGB w ciągu pierwszych 2 lat od zabiegu.',
      },
    ],
    table: {
      caption: 'Czynniki predykcyjne remisji cukrzycy typu 2 po chirurgii bariatrycznej',
      headers: ['Czynnik kliniczny', 'Wysoka szansa na pełną remisję T2D', 'Niska szansa na remisję (konieczność farmakoterapii)'],
      rows: [
        ['Czas trwania cukrzycy', 'Krótki czas (< 5 lat od diagnozy)', 'Długi czas (> 8–10 lat trwania choroby)'],
        ['Stosowane leczenie przed operacją', 'Modyfikacja diety lub metformina w monoterapii', 'Złożona insulinoterapia w wysokich dawkach dobowych'],
        ['Rezerwa komórek beta (peptyd C)', 'Prawidłowe lub wysokie stężenie peptydu C na czczo', 'Niski peptyd C (< 1,0 ng/ml — wyczerpanie wysp trzustkowych)'],
        ['Wskaźnik DiaRem score', 'Niski wynik punktowy (0–7 pkt)', 'Wysoki wynik punktowy (> 18 pkt)'],
      ],
    },
    advanced:
      'Kluczową rolę w trwałej zmianie fenotypu metabolicznego po operacjach bariatrycznych odgrywa rekonfiguracja mikrobioty jelitowej. Dochodzi do gwałtownego spadku stosunku bakterii typu Firmicutes do Bacteroidetes oraz namnożenia gatunków Akkermansia muciniphila i Faecalibacterium prausnitzii. Bakterie te uszczelniają barierę nabłonka jelitowego, zmniejszając translokację bakteryjnego lipopolisacharydu (LPS endotoksemia metaboliczna) do krążenia wrotnego i wygaszając stan zapalny w wątrobie i tkance tłuszczowej.',
    summary:
      'Remisja T2D po RYGB następuje w kilka dni dzięki hipotezie hindgut (wyrzut GLP-1/PYY) i kwasom żółciowym (receptory TGR5/FXR). Remisję definiuje HbA1c < 6,5% bez leków przez >= 3 miesiące. Krótki czas trwania cukrzycy i wysoki peptyd C najlepiej rokują.',
    sourceIds: ['ifso-asmbs-2023', 'ada-obesity-2024'],
    questions: [
      q(
        'Zgodnie z konsensusem ADA/EASD, jaki warunek definiuje pełną remisję cukrzycy typu 2 po zabiegu bariatrycznym?',
        ['Stężenie HbA1c < 6,5% (48 mmol/mol) utrzymujące się przez co najmniej 3 miesiące bez jakichkolwiek leków przeciwcukrzycowych', 'Brak konieczności przyjmowania farmakoterapii przy normoglikemii definiuje remisję metaboliczną.'],
        ['Stężenie glukozy na czczo < 200 mg/dl przy kontynuacji wstrzyknięć insuliny', 'Utrzymywanie leczenia insuliną wyklucza definicję remisji.'],
        ['Utrata masy ciała o dokładnie 100 kg w pierwszym miesiącu', 'Masa ciała nie jest parametrem laboratoryjnym definiującym remisję cukrzycy.'],
      ),
      q(
        'Na czym polega tzw. hipoteza jelita tylnego (hindgut hypothesis) tłumacząca błyskawiczną poprawę glikemii po operacji RYGB?',
        ['Szybkie dotarcie treści pokarmowej do jelita krętego wywołuje potężny wyrzut inkretyn GLP-1 i PYY przez komórki L', 'Ekspozycja komórek L na skoncentrowany chymus potęguje odpowiedź inkretynową i wyrzut insuliny.'],
        ['Odcięcie całego dopływu krwi tętniczej do trzustki', 'Niedokrwienie trzustki wywołałoby martwicę narządu, a nie remisję cukrzycy.'],
        ['Zahamowanie perystaltyki jelita grubego na okres 6 miesięcy', 'Operacja nie paraliżuje perystaltyki okrężnicy.'],
      ),
      q(
        'W jaki sposób podwyższone stężenie kwasów żółciowych w surowicy po RYGB wspomaga termogenezę i wydatek energetyczny?',
        ['Aktywuje receptor błonowy TGR5 w mięśniach i tkance brunatnej, pobudzając enzym dejodynazę D2 do konwersji T4 w aktywny T3', 'Miejscowe wytwarzanie trójjodotyroniny w tkankach docelowych nasila utlenianie substratów energetycznych.'],
        ['Kwasy żółciowe niszczą mitochondria w mięśniach szkieletowych', 'Kwasy żółciowe stymulują, a nie niszczą biogenezę mitochondriów.'],
        ['Zwiększają wydalanie glukozy z moczem poprzez bezpośrednią blokadę SGLT2 w nerkach', 'Kwasy żółciowe nie są inhibitorami kotransportera SGLT2 w nerkach.'],
      ),
      q(
        'Który z wymienionych pacjentów z cukrzycą typu 2 ma najwyższe prawdopodobieństwo osiągnięcia trwałej remisji po operacji bariatrycznej?',
        ['Pacjent chorujący na T2D od 2 lat, leczony wyłącznie metforminą, z wysokim stężeniem peptydu C na czczo', 'Krótki wywiad cukrzycy i zachowana rezerwa komórek beta trzustki to najsilniejsze predyktory remisji.'],
        ['Chory z 20-letnim wywiadem cukrzycy na dobowej dawce insuliny 120 j. i niewykrywalnym peptydem C', 'Wyczerpanie wysp trzustkowych uniemożliwia endogenną remisję cukrzycy.'],
        ['Pacjent z cukrzycą typu 1 i obecnością autoprzeciwciał anty-GAD w wysokim mianie', 'Operacja bariatryczna nie odwraca autoimmunologicznego zniszczenia komórek beta w T1D.'],
      ),
      q(
        'Jaki gatunek bakterii jelitowych namnaża się po operacji bariatrycznej i wywiera działanie przeciwzapalne oraz uszczelniające barierę jelitową?',
        ['Akkermansia muciniphila', 'Bakteria ta odżywia się śluzem jelitowym, wzmacnia barierę jelitową i redukuje endotoksemię metaboliczną.'],
        ['Clostridioides difficile', 'C. difficile to groźny patogen wywołujący rzekomobłoniaste zapalenie jelit.'],
        ['Helicobacter pylori', 'H. pylori kolonizuje żołądek, sprzyjając chorobie wrzodowej i rakowi żołądka.'],
      ),
    ],
  },
  {
    id: 'otylosc-bariotria-powiklania-suplementacja',
    title: 'Powikłania bariatryczne, dumping syndrome i dożywotnia suplementacja niedoborów',
    group: 'Chirurgia bariatryczna i metaboliczna',
    readTime: '13 min',
    goals: [
      'Różnicować wczesny zespół poposiłkowy od późnego zespołu poposiłkowego (reaktywnej hipoglikemii inkretynowej).',
      'Poznać najgroźniejsze powikłania chirurgiczne: nieszczelność zespolenia i przepukliny wewnętrzne w przestrzeni Petersena.',
      'Opanować standard dożywotniej suplementacji witaminowo-mineralnej po procedurach malabsorpcyjnych.',
    ],
    sections: [
      {
        title: 'Wczesny vs późny zespół poposiłkowy (dumping syndrome)',
        content:
          'Zespół poposiłkowy wynika z utraty czynności zwieraczowej odźwiernika. Wczesny dumping syndrome rozwija się 10–30 minut po posiłku: szybki napływ hiperosmolarnego bolusa pokarmowego do jelita czczego wywołuje gwałtowne przesunięcie płynów z łożyska naczyniowego do światła jelita, prowadząc do hipowolemii, tachykardii, zaczerwienienia twarzy (flushing), potów, zawrotów głowy oraz skurczowych bólów brzucha i biegunki. Późny dumping syndrome pojawia się 1–3 godziny po posiłku bogatowęglowodanowym: gwałtowne wchłonięcie glukozy stymuluje nadmierny, nieproporcjonalny wyrzut GLP-1 i insuliny, co wywołuje ciężką hipoglikemię reaktywną (drżenia rąk, neuroglikopenia, zlewne poty). W leczeniu stosuje się dietę niskowęglowodanową o niskim IG, frakcjonowanie posiłków oraz akarbozę lub analogi somatostatyny.',
      },
      {
        title: 'Ostre i późne powikłania chirurgiczne: przeciek i przepukliny wewnętrzne',
        content:
          'Najgroźniejszym wczesnym powikłaniem jest nieszczelność linii zszywek lub zespolenia (leak), manifestująca się nagłą, niewyjaśnioną tachykardią (> 120/min), gorączką, bólem w lewym podżebrzu i dusznością — wymaga pilnej re-laparoskopii. Późnym powikłaniem specyficznym dla RYGB są przepukliny wewnętrzne w krezce (przestrzeń Petersena i okno krezki jelita czczego), mogące prowadzić do skrętu jelita cienkiego i niedokrwienia, objawiające się nawracającymi, kurczowymi bólami brzucha u pacjenta ze znacznym spadkiem masy ciała. Innym częstym powikłaniem są owrzodzenia brzeżne (marginal ulcers) w okolicy zespolenia żołądkowo-jelitowego (kluczowe czynniki ryzyka: palenie tytoniu i NLPZ).',
      },
      {
        title: 'Zasady dożywotniej suplementacji niedoborów żywieniowych',
        content:
          'Zgodnie z wytycznymi ASMBS/EASO każdy pacjent po zabiegu wyłączającym (RYGB, OAGB) wymaga dożywotniej suplementacji: 1) Witamina B12: 1000 ug/d doustnie lub 1000 ug i.m. co 1–3 miesiące (brak kwasu solnego i czynnika wewnętrznego IF uniemożliwia wchłanianie z diety); 2) Żelazo elementarne: 45–60 mg/d (wraz z witaminą C, oddzielnie od wapnia); 3) Cytrynian wapnia (lepiej wchłanialny w hipochlorhydrii niż węglan): 1200–1500 mg/d w dawkach podzielonych wraz z witaminą D3 (3000 IU/d) dla ochrony kości; 4) Kwas foliowy (400–800 ug/d); 5) Cynk i miedź (w zbalansowanym stosunku 1 mg Cu na każde 8–15 mg Zn). W ostrych wymiotach należy bezzwłocznie podać dożylnie tiaminę (witaminę B1), aby zapobiec nieodwracalnej encefalopatii Wernickego.',
      },
    ],
    table: {
      caption: 'Dożywotnia suplementacja witaminowo-mineralna po zabiegach bariatrycznych (wg ASMBS)',
      headers: ['Mikroskładnik', 'Rekomendowana dawka dobowa', 'Forma preparatu / Uwagi kliniczne'],
      rows: [
        ['Witamina B12', '350 – 1000 ug/d p.o. lub 1000 ug/mies. i.m.', 'Ominięcie komórek okładzinowych żołądka blokuje syntezę czynnika IF'],
        ['Wapń', '1200 – 1500 mg/d (w dawkach <= 500 mg)', 'Bezwzględnie cytrynian wapnia (nie wymaga kwaśnego środowiska żołądka)'],
        ['Witamina D3', '3000 IU/d (docelowe stężenie 25(OH)D > 30 ng/ml)', 'Prewencja wtórnej nadczynności przytarczyc i demineralizacji kości'],
        ['Żelazo elementarne', '45 – 60 mg/d (u kobiet miesiączkujących)', 'Przyjmować z witaminą C; w razie nietolerancji lub ciężkiej anemii: wlewy i.v.'],
        ['Tiamina (Wit. B1)', '12 – 50 mg/d (w preparacie wielowitaminowym)', 'W razie uporczywych wymiotów: 100–500 mg/d i.v. (profilaktyka Wernickego)'],
      ],
    },
    advanced:
      'Główną przyczyną hipokalcemii i osteopenii po operacjach bariatrycznych jest ominięcie dwunastnicy — głównego anatomicznego miejsca aktywnego transportu jonów wapnia zależnego od kalbindyny i witaminy D. Ponadto brak kwasu solnego w małym zbiorniku żołądkowym uniemożliwia dysocjację soli wapniowych z pożywienia. Nieleczony deficyt wapnia wywołuje kompensacyjny wzrost wydzielania parathormonu (wtórną nadczynność przytarczyc), przyspieszoną resorpcję kości i osteomalację.',
    summary:
      'Wczesny dumping (hipowolemia) pojawia się < 30 min po posiłku, późny (reaktywna hipoglikemia) po 1-3 h. Przeciek zespolenia manifestuje się niewyjaśnioną tachykardią. Po operacjach malabsorpcyjnych konieczna jest dożywotnia suplementacja cytrynianu wapnia, witaminy D3, B12, żelaza i tiaminy.',
    sourceIds: ['ifso-asmbs-2023', 'easo-2024'],
    questions: [
      q(
        'Czym różni się późny zespół poposiłkowy (late dumping syndrome) od wczesnego zespołu poposiłkowego?',
        ['Rozwija się 1–3 godziny po posiłku i charakteryzuje się objawami hipoglikemii reaktywnej wywołanej wyrzutem GLP-1 i insuliny', 'Wczesny dumping rozwija się w ciągu 30 minut i wynika z przesunięcia płynów i hipowolemii.'],
        ['Występuje wyłącznie u pacjentów po usunięciu wyrostka robaczkowego', 'Dotyczy chorych po resekcjach i ominięciach żołądkowych.'],
        ['Objawia się wyłącznie nagłym wzrostem stężenia glukozy powyżej 400 mg/dl', 'Późny dumping to kliniczna hipoglikemia, a nie hiperglikemia.'],
      ),
      q(
        'Jaki objaw kliniczny jest najwcześniejszym i najbardziej czułym wskaźnikiem nieszczelności zespolenia (leaku) w pierwszych dobach po operacji bariatrycznej?',
        ['Niewyjaśniona tachykardia spoczynkowa przekraczająca 120 uderzeń na minutę', 'Tachykardia często wyprzedza gorączkę, leukocytozę i objawy otrzewnowe.'],
        ['Zaczerwienienie spojówek obu oczu', 'Zaczerwienienie spojówek nie jest markerem powikłań w jamie brzusznej.'],
        ['Gwałtowny spadek stężenia cholesterolu HDL', 'Lipidogram nie reaguje natychmiast na ostry przeciek chirurgiczny.'],
      ),
      q(
        'Dlaczego u pacjentów po ominięciu żołądkowym (RYGB) preparatem wapnia z wyboru jest cytrynian wapnia, a nie węglan wapnia?',
        ['Cytrynian wapnia nie wymaga kwaśnego środowiska kwasu solnego do dysocjacji i efektywnego wchłaniania w jelicie', 'W małym zbiorniku żołądkowym wytwarzanie kwasu solnego jest znikome, co uniemożliwia wchłanianie węglanu wapnia.'],
        ['Węglan wapnia rozpuszcza tytanowe zszywki chirurgiczne w linii cięcia', 'Sole wapnia nie wchodzą w reakcje chemiczne ze zszywkami tytanowymi.'],
        ['Cytrynian wapnia całkowicie zastępuje witaminę D3', 'Wapń nie zastępuje witaminy D3, oba składniki muszą być podawane łącznie.'],
      ),
      q(
        'Jakie postępowanie profilaktyczne należy wdrożyć natychmiast u pacjenta bariatrycznego z uporczywymi wymiotami trwającymi od kilku dni?',
        ['Dożylne podanie tiaminy (witaminy B1) przed jakimkolwiek wlewem glukozy w celu zapobieżenia encefalopatii Wernickego', 'Podanie glukozy przy niedoborze tiaminy gwałtownie zużywa jej resztki i wywołuje ostry zespół Wernickego.'],
        ['Natychmiastowe doustne podanie 2 litrów soku grejpfrutowego', 'Doustne płyny nasilą wymioty, a grejpfrut wchodzi w groźne interakcje lekowe.'],
        ['Zastosowanie leków przeczyszczających o działaniu osmotycznym', 'Leki przeczyszczające pogłębiłyby odwodnienie i zaburzenia elektrolitowe.'],
      ),
      q(
        'Które dwa czynniki behawioralne i farmakologiczne stanowią główne przyczyny powstawania owrzodzeń brzeżnych (marginal ulcers) po RYGB?',
        ['Palenie tytoniu oraz stosowanie niesteroidowych leków przeciwzapalnych (NLPZ)', 'Nikotyna upośledza mikrokrążenie w zespoleniu, a NLPZ niszczą śluzówkową barierę prostaglandynową.'],
        ['Picie zielonej herbaty i spożywanie oliwy z oliwek', 'Zarówno zielona herbata, jak i oliwa są bezpieczne po operacji bariatrycznej.'],
        ['Codzienna suplementacja witaminy B12 i żelaza', 'Witaminy nie wywołują owrzodzeń trawiennych zespolenia.'],
      ),
    ],
  },
];
