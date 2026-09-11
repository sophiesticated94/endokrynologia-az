import { type DraftLesson, q } from './course-types.ts';

export const draftPituitaryPart1: DraftLesson[] = [
  {
    id: 'przysadka-fizjologia',
    moduleId: 'przysadka',
    title: 'Jak rządzona jest orkiestra?',
    subtitle: 'Anatomia siodła tureckiego, płaty i krążenie wrotne',
    group: 'Fundamenty',
    minutes: 14,
    goals: [
      'Poznasz anatomiczne sąsiedztwo przysadki (chiazma opticum, zatoki jamiste) i jego znaczenie kliniczne.',
      'Zrozumiesz rolę krążenia wrotnego przysadki i podwzgórzowych neurohormonów regulujących przedni i tylny płat.',
    ],
    sections: [
      {
        title: 'Anatomia siodła tureckiego i otoczenie',
        text: 'Przysadka mózgowa leży w zagłębieniu kości klinowej zwanym siodłem tureckim. Od góry przykrywa ją przepona siodła, a bezpośrednio nad nią przebiega skrzyżowanie wzrokowe (chiasma opticum). Po bokach siodła znajdują się zatoki jamiste zawierające tętnicę szyjną wewnętrzną oraz nerwy czaszkowe III, IV, V1, V2 i VI. Ekspansja nadsiodłowa guza powoduje ucisk na chiazmę, co wywołuje typowe obustronne niedowidzenie połowicze dwuskroniowe (hemianopsia bitemporalis).',
      },
      {
        title: 'Przedni płat i krążenie wrotne podwzgórzowo-przysadkowe',
        text: 'Przedni płat (gruczołowy, adenohypophysis) powstaje z kieszonki Rathkego. Komórki dokrewne wytwarzają hormony tropowe: TSH, ACTH, LH, FSH oraz hormony działające obwodowo: GH i prolaktynę (PRL). Podwzgórze kontroluje przedni płat drogą naczyniową przez układ wrotny przysadki za pomocą neurohormonów uwalniających (TRH, CRH, GnRH, GHRH) oraz hamujących (dopamina dla prolaktyny i somatostatyna dla GH i TSH). Kluczowy fakt: dopamina stale hamuje wydzielanie prolaktyny; ucisk szypuły guzem odcina dopaminę, powodując wzrost PRL.',
      },
      {
        title: 'Tylny płat i magazyn neurohormonów',
        text: 'Tylny płat (nerwowy, neurohypophysis) jest bezpośrednim przedłużeniem podwzgórza, połączonym szypułą (lejkiem). Ciała neuronów w jądrach nadwzrokowym (SON) i przykomorowym (PVN) podwzgórza syntetyzują wazopresynę (AVP / ADH) oraz oksytocynę. Aksony transportują te nanopeptydy do tylnego płata, skąd są uwalniane do krwi. Uszkodzenie szypuły lub podwzgórza prowadzi do moczówki prostej centralnej z powodu braku AVP.',
      },
    ],
    table: {
      headers: ['Struktura / Hormon', 'Rola i powiązanie kliniczne'],
      rows: [
        ['Chiazma opticum (nad siodłem)', 'Wzrost guza w górę uciska włókna nosowe, dając niedowidzenie dwuskroniowe'],
        ['Zatoki jamiste (bocznie)', 'Naciek guza poraża nerwy gałkoruchowe (III, IV, VI) i powoduje podwójne widzenie'],
        ['Dopamina z podwzgórza', 'Fizjologiczny hamulec prolaktyny; ucisk szypuły = hiperprolaktynemia z odcięcia'],
        ['Tylny płat (AVP / Oksytocyna)', 'Magazyn hormonów podwzgórza; brak AVP wywołuje moczówkę prostą'],
      ],
    },
    advanced:
      'W mikroskopii i immunohistochemii dawny podział na komórki kwasochłonne, zasadochłonne i barwioobojętne zastąpiono klasyfikacją opartą na czynnikach transkrypcyjnych (PIT1: linia GH, PRL, TSH; TPIT: linia ACTH; SF1: linia gonadotropin). Pozwala to precyzyjnie ustalić linię komórkową nawet w nowotworach nieczynnych hormonalnie (tzw. ciche gruczolaki corticotroph/somatotroph, które bywają bardziej agresywne klinicznie).',
    summary:
      'Przysadka to strategiczny węzeł łączący układ nerwowy i dokrewny. Znajomość anatomii siodła tłumaczy objawy ucisku (chiazma, zatoka jamista), a mechanizm hamowania dopaminergicznego wyjaśnia hiperprolaktynemię z odcięcia szypuły.',
    sourceIds: ['pituitary_endo'],
    questions: [
      q(
        'Jaki objaw okulistyczny jest najbardziej typowy dla makrogruczolaka przysadki uciskającego chiazmę?',
        ['Niedowidzenie połowicze dwuskroniowe', 'Wynika z ucisku na krzyżujące się w chiazmie włókna nosowe siatkówki.'],
        ['Jednostronna ślepota barw', 'Nie odpowiada anatomicznemu wzorcowi ucisku skrzyżowania wzrokowego.'],
        ['Wytrzeszcz osiowy gałek ocznych', 'To objaw orbitopatii tarczycowej, a nie ucisku chiazmy w siodle tureckim.']
      ),
      q(
        'Jaki jest główny fizjologiczny czynnik kontrolujący wydzielanie prolaktyny?',
        ['Stale hamujący wpływ dopaminy z podwzgórza', 'Dopamina dociera naczyniami wrotnymi i tonicznie blokuje wydzielanie PRL.'],
        ['Ciągła stymulacja przez neurohormon PRH', 'Głównym mechanizmem regulacji prolaktyny jest toniczne hamowanie, a nie pobudzanie.'],
        ['Bezpośrednia stymulacja przez kortyzol', 'Kortyzol nie jest pierwotnym czynnikiem regulującym syntezę prolaktyny.']
      ),
      q(
        'Gdzie syntetyzowana jest wazopresyna (AVP) magazynowana w tylnym płacie przysadki?',
        ['W jądrach nadwzrokowym i przykomorowym podwzgórza', 'Tylny płat przysadki jedynie magazynuje i uwalnia AVP zsyntetyzowaną w podwzgórzu.'],
        ['W komórkach pęcherzykowych przedniego płata', 'Przedni płat nie wytwarza wazopresyny ani oksytocyny.'],
        ['W rdzeniu nadnerczy', 'Rdzeń nadnerczy syntetyzuje katecholaminy, a nie hormon antydiuretyczny.']
      ),
      q(
        'Co dzieje się ze stężeniem prolaktyny, gdy niefunkcjonujący guz uciska szypułę przysadki?',
        ['Rośnie umiarkowanie (efekt odcięcia szypuły)', 'Ucisk szypuły odcina dopływ podwzgórzowej dopaminy, uwalniając laktotrofy spod hamowania.'],
        ['Spada do zera', 'Odcięcie hamulca dopaminergicznego powoduje wzrost, a nie spadek prolaktyny.'],
        ['Pozostaje całkowicie niezmienione', 'Zablokowanie transportu dopaminy wrotnej zawsze zmienia czynność laktotrofów.']
      ),
      q(
        'Które nerwy czaszkowe mogą ulec uszkodzeniu przy bocznej ekspansji guza przysadki do zatoki jamistej?',
        ['Nerwy III, IV, VI oraz gałęzie V1 i V2 nerwu trójdzielnego', 'Biegną one w ścianie i świetle zatoki jamistej bocznie od siodła tureckiego.'],
        ['Nerwy VII i VIII', 'Nerwy twarzowy i słuchowy przebiegają w przewodzie słuchowym wewnętrznym, z dala od siodła.'],
        ['Nerwy IX, X i XII', 'Nerwy dolnej grupy opuszkowej leżą w rejonie otworu szyjnego i dołu tylnego czaszki.']
      ),
    ],
  },
  {
    id: 'przysadka-diagnostyka',
    moduleId: 'przysadka',
    title: 'Zajrzyj w głąb siodła',
    subtitle: 'Rezonans magnetyczny, pole widzenia i ocena rezerwy hormonalnej',
    group: 'Fundamenty',
    minutes: 15,
    goals: [
      'Nauczysz się różnicować mikrogruczolaki (<10 mm) od makrogruczolaków (>=10 mm) w badaniu MRI.',
      'Opanujesz algorytm laboratoryjnej oceny hormonalnej czynnościowej przysadki.',
    ],
    sections: [
      {
        title: 'Rezonans magnetyczny (MRI) siodła tureckiego',
        text: 'Złotym standardem obrazowania przysadki jest MRI z celowanym protokołem na siodło tureckie (cienkie warstwy <=3 mm w płaszczyznach czołowej i strzałkowej, w obrazach T1 i T2 przed i po dożylnym podaniu kontrastu gadolinowego). Gruczolaki przysadki w sekwencji dynamicznej wzmacniają się wolniej niż zdrowy miąższ gruczołu, uwidaczniając się jako strefa hipointensywna. Rozmiar <10 mm definiuje mikrogruczolaka, a >=10 mm makrogruczolaka.',
      },
      {
        title: 'Ocena pola widzenia i okulistyka',
        text: 'Każdy guz przysadki o wymiarze >=10 mm lub guz dochodzący do skrzyżowania wzrokowego wymaga pilnego badania okulistycznego: perymetrii statycznej (komputerowego pola widzenia) oraz oceny dna oka (zanik tarcz nerwów wzrokowych). Asymetryczny ucisk może wywołać niedowidzenie jednooczne lub mroczki paracentralne. Poprawa pola widzenia jest kluczowym wskaźnikiem powodzenia operacji dekompresyjnej lub farmakoterapii.',
      },
      {
        title: 'Przesiewowy panel hormonalny',
        text: 'Wykrycie zmiany w siodle wymaga pełnej oceny hormonalnej: 1) Nadmiar: prolaktyna (PRL), IGF-1 (marker przesiewowy GH), test hamowania 1 mg deksametazonu (dla ACTH), wolne podjednostki alfa, TSH i FT4; 2) Niedobór: poranny kortyzol i ACTH, TSH i FT4, LH, FSH i estradiol/testosteron, IGF-1, elektrolity (sód, potas) i osmolalność moczu/osocza.',
      },
    ],
    table: {
      headers: ['Badanie', 'Znaczenie kliniczne'],
      rows: [
        ['MRI siodła z kontrastem', 'Złoty standard oceny wielkości, inwazyjności i relacji do chiazmy'],
        ['Komputerowe pole widzenia', 'Wykrywa bezobjawowy ucisk na chiazmę; kwalifikuje do pilnej operacji'],
        ['Stężenie IGF-1 w surowicy', 'Stabilny dobowo marker nadmiaru GH w akromegalii (GH pulsuje)'],
        ['Test 1 mg deksametazonu', 'Przesiew w kierunku autonomicznej produkcji ACTH/kortyzolu'],
      ],
    },
    advanced:
      'W przypadku guzów przysadki tomografia komputerowa (CT) jest badaniem drugiego rzutu, niezastąpionym jednak w ocenie kostnych granic siodła, stopnia upowietrznienia zatoki klinowej przed planowaną operacją transsphenoidalną oraz w poszukiwaniu zwapnień sugerujących czaszkogardlaka (craniopharyngioma).',
    summary:
      'Diagnostyka guza przysadki to zawsze tandem: obrazowanie MRI oceniające anatomię i chiazmę oraz precyzyjny panel laboratoryjny wykluczający nadczynność hormonalną i niedoczynność osi obwodowych.',
    sourceIds: ['freda', 'pituitary_endo'],
    questions: [
      q(
        'Jaki wymiar guza przysadki stanowi granicę między mikrogruczolakiem a makrogruczolakiem?',
        ['10 mm (1 cm)', 'Zmiany poniżej 10 mm to mikrogruczolaki, od 10 mm wzwyż to makrogruczolaki.'],
        ['5 mm', '5 mm to zbyt mały próg; guzy do 9 mm są wciąż klasyfikowane jako mikro.'],
        ['20 mm', '20 mm to duży makrogruczolak, granica klasyfikacyjna przebiega przy 10 mm.']
      ),
      q(
        'Dlaczego w przesiewowej diagnostyce akromegalii oznacza się IGF-1, a nie pojedyncze stężenie hormonu wzrostu (GH)?',
        ['GH wydziela się pulsacyjnie i ma krótki okres półtrwania, a IGF-1 jest stabilny w ciągu doby', 'IGF-1 odzwierciedla zintegrowane dobowe działanie GH i nie zależy od pojedynczych wyrzutów.'],
        ['GH nie krąży w ogóle we krwi obwodowej', 'GH krąży we krwi, lecz jego stężenie gwałtownie fluktuuje między pikami a zerem.'],
        ['IGF-1 jest hormonem przysadkowym, a GH wątrobowym', 'Jest dokładnie odwrotnie: GH pochodzi z przysadki, a IGF-1 powstaje w wątrobie.']
      ),
      q(
        'Jak wzmacniają się gruczolaki przysadki w dynamicznym badaniu MRI po podaniu kontrastu?',
        ['Wolniej niż zdrowy miąższ przedniego płata przysadki', 'Dlatego w fazie wczesnej uwidaczniają się jako obszar hipointensywny na tle jasnego gruczołu.'],
        ['Natychmiast silniej niż jakakolwiek inna tkanka mózgu', 'Szybkie, intensywne wzmocnienie cechuje oponiaki, a nie typowe gruczolaki.'],
        ['Gruczolaki przysadki nigdy nie ulegają wzmocnieniu kontrastowemu', 'Ulegają wzmocnieniu, ale z opóźnieniem w stosunku do bogato unaczynionego miąższu.']
      ),
      q(
        'U chorego z makrogruczolakiem 18 mm wykonujesz perymetrię. Kiedy badanie to należy powtórzyć w trybie pilnym?',
        ['Przy nagłym pogorszeniu ostrości wzroku lub nasileniu bólów głowy', 'Może to świadczyć o wzroście guza lub krwawieniu do jego wnętrza (apopleksji).'],
        ['Dopiero po 5 latach od operacji', 'To zbyt długi odstęp stwarzający ryzyko nieodwracalnej ślepoty.'],
        ['Tylko wtedy, gdy prolaktyna spadnie poniżej normy', 'Ocena pola widzenia wynika z mechanicznego ucisku nerwów, a nie stężenia prolaktyny.']
      ),
      q(
        'Co wchodzi w skład wstępnego panelu hormonalnego u każdego pacjenta z nowo wykrytym incydentaloma przysadki?',
        ['PRL, IGF-1, test 1 mg deksametazonu, TSH, FT4, LH, FSH i elektrolity', 'Pozwala to równolegle ocenić autonomiczną nadprodukcję oraz ewentualną niedoczynność.'],
        ['Wyłącznie badanie stężenia glukozy na czczo', 'Glukoza nie diagnozuje czynności wydzielniczej przysadki.'],
        ['Samo TSH bez oznaczania FT4 ani innych hormonów', 'Samo TSH jest niewystarczające z powodu pułapki niedoczynności wtórnej.']
      ),
    ],
  },
  {
    id: 'prolactinoma',
    moduleId: 'przysadka',
    title: 'Mlekotok, niepłodność i dopamina',
    subtitle: 'Prolactinoma, pułapka makroprolaktyny i leczenie kabergoliną',
    group: 'Gruczolaki i hipersekrecja',
    minutes: 16,
    goals: [
      'Rozpoznasz objawy prolactinoma u kobiet i mężczyzn oraz zróżnicujesz guz prolaktynowy z hiperprolaktynemią czynnościową i polekową.',
      'Zrozumiesz pułapki laboratoryjne: makroprolaktynemię (PEG) oraz efekt „hook”.',
    ],
    sections: [
      {
        title: 'Obraz kliniczny u kobiet i mężczyzn',
        text: 'Prolactinoma to najczęstszy czynnościowo hormonalnie guz przysadki. U kobiet w wieku rozrodczym manifestuje się wcześnie jako mikrogruczolak: rzadkie miesiączki (oligomenorrhea) lub ich brak (amenorrhea), mlekotok (galactorrhea) oraz niepłodność na skutek hamowania pulsacyjnego wydzielania GnRH. U mężczyzn objawy są podstępne: spadek libido, zaburzenia wzwodu, ginekomastia i oligospermia; z tego powodu u mężczyzn guz jest najczęściej diagnozowany późno, jako duży makrogruczolak dający ubytki pola widzenia i bóle głowy.',
      },
      {
        title: 'Pułapki laboratoryjne: Makroprolaktyna i Efekt Hook',
        text: 'Wysokie stężenie prolaktyny wymaga ostrożności: 1) Makroprolaktyna (big-big PRL): kompleksy prolaktyny z przeciwciałami IgG. Są nieaktywne biologicznie, lecz wykrywane przez testy laboratoryjne. Przy braku objawów konieczne jest wytrącanie glikolem polietylenowym (PEG). 2) Efekt „hook” (haczyka): przy gigantycznych stężeniach PRL (>5000 ng/ml w wielkich makroprolactinoma) nadmiar antygenu wysyca przeciwciała wychwytujące i znakujące w teście immunometrycznym, dając fałszywie niski wynik (np. 40 ng/ml). Wymaga powtórzenia oznaczenia w rozcieńczeniu surowicy 1:100!',
      },
      {
        title: 'Leczenie farmakologiczne: Kabergolina lekiem z wyboru',
        text: 'W odróżnieniu od niemal wszystkich innych guzów przysadki, prolactinoma jest chorobą leczoną pierwotnie farmakologicznie, a nie operacyjnie! Lekiem pierwszego rzutu jest kabergolina (długodziałający selektywny agonista receptora dopaminowego D2), skuteczniejsza i lepiej tolerowana niż bromokryptyna. Kabergolina normalizuje stężenie prolaktyny u >85% chorych oraz powoduje znaczne zmniejszenie masy guza (nawet o >50%), co często cofa ubytki pola widzenia w ciągu dni.',
      },
    ],
    table: {
      headers: ['Stężenie PRL', 'Prawdopodobna przyczyna'],
      rows: [
        ['25–100 ng/ml', 'Polekowa (neuroleptyki, metoklopramid), ucisk szypuły (stalk effect), niedoczynność tarczycy'],
        ['100–250 ng/ml', 'Mikroprolactinoma lub makroprolactinoma; wymaga wykluczenia makroprolaktyny'],
        ['>250–5000+ ng/ml', 'Pewny makroprolactinoma; w wielkich guzach pamiętaj o efekcie „hook”'],
        ['Wysoka PRL bez objawów', 'Podejrzenie makroprolaktynemii — zleć test precypitacji PEG'],
      ],
    },
    advanced:
      'W przypadku stosowania bardzo wysokich dawek kabergoliny (znanych z leczenia choroby Parkinsona, >3 mg/dobę) opisywano ryzyko włóknienia zastawek serca przez pobudzenie receptorów 5-HT2B. W dawkach endokrynologicznych (zwykle 0,5–1,0 mg/tydzień) ryzyko to jest minimalne, jednak wytyczne zalecają wykonanie wyjściowego echokardiogramu (ECHO serca) przed długotrwałym leczeniem.',
    summary:
      'Prolactinoma leczy się farmakologicznie agonistami dopaminy (kabergolina), uzyskując normalizację hormonów i regresję guza. Zawsze wykluczaj leki, niedoczynność tarczycy, makroprolaktynę (PEG) oraz efekt hook w makrogruczolakach.',
    sourceIds: ['melmed'],
    questions: [
      q(
        'Jaka jest podstawowa metoda leczenia pierwszego rzutu w większości przypadków prolactinoma?',
        ['Farmakoterapia agonistą dopaminy (kabergoliną)', 'Kabergolina cofa hiperprolaktynemię i zmniejsza wymiary guza u znakomitej większości pacjentów.'],
        ['Natychmiastowa operacja neurochirurgiczna przez zatokę klinową', 'Operacja jest zarezerwowana dla rzadkich przypadków oporności na leki lub nietolerancji.'],
        ['Radioterapia protonowa siodła tureckiego', 'Radioterapia jest metodą odległego rzutu stosowaną sporadycznie w guzach złośliwych.']
      ),
      q(
        'Na czym polega efekt „hook” (haczyka) w diagnostyce wielkich guzów prolaktynowych?',
        ['Ekstremalnie wysokie stężenie PRL wysyca przeciwciała w teście, dając fałszywie niski wynik', 'Wymaga oznaczenia po 100-krotnym rozcieńczeniu surowicy, by uniknąć błędnego rozpoznania NFPA.'],
        ['Prolaktyna fałszywie blokuje receptory dla hormonu wzrostu', 'Efekt hook dotyczy interferencji laboratoryjnej w teście immunoenzymatycznym, a nie receptorów GH.'],
        ['Obecność przeciwciał IgG fałszywie zawyża wynik prolaktyny', 'Obecność kompleksów IgG z prolaktyną to mechanizm makroprolaktynemii, a nie efektu hook.']
      ),
      q(
        'Pacjentka bez objawów hipogonadyzmu ma stężenie PRL 85 ng/ml. Miesiączkuje regularnie i ma dwoje dzieci. Co należy zrobić w pierwszej kolejności?',
        ['Wykonać test precypitacji glikolem polietylenowym (PEG) w kierunku makroprolaktyny', 'Obecność wielkocząsteczkowej makroprolaktyny nie wymaga leczenia i nie daje objawów klinicznych.'],
        ['Pilnie skierować pacjentkę na operację usunięcia przysadki', 'Brak objawów i izolowane umiarkowane podwyższenie PRL nie upoważnia do operacji.'],
        ['Natychmiast wdrożyć maksymalną dawkę kabergoliny', 'Włączanie leczenia bez weryfikacji aktywnej biologicznie monomerycznej prolaktyny jest błędem.']
      ),
      q(
        'Która grupa leków najczęściej wywołuje polekową hiperprolaktynemię w mechanizmie blokady receptorów D2?',
        ['Klasyczne i atypowe leki przeciwpsychotyczne (neuroleptyki) oraz metoklopramid', 'Blokada receptorów dopaminowych D2 w przysadce znosi fizjologiczne hamowanie prolaktyny.'],
        ['Inhibitory konwertazy angiotensyny (ACE-I)', 'Leki hipotensyjne z grupy ACE-I nie wpływają na oś prolaktynową.'],
        ['Antybiotyki beta-laktamowe', 'Antybiotyki nie modulują przewodnictwa dopaminergicznego w podwzgórzu.']
      ),
      q(
        'Dlaczego prolactinoma u mężczyzn jest najczęściej diagnozowany w stadium dużego makrogruczolaka?',
        ['Objawy hipogonadyzmu (spadek libido, impotencja) są przez lata bagatelizowane przez pacjentów', 'Mężczyźni zgłaszają się do lekarza dopiero, gdy guz powoduje bóle głowy lub uciska skrzyżowanie wzrokowe.'],
        ['Męska przysadka nie reaguje na dopaminę', 'Przysadka męska i żeńska posiadają identyczne receptory D2 i podlegają temu samemu hamowaniu.'],
        ['U mężczyzn mikrogruczolaki w ogóle nie powstają', 'Powstają, ale rzadko dają wczesne, alarmujące objawy takie jak brak miesiączki u kobiet.']
      ),
    ],
  },
  {
    id: 'akromegalia',
    moduleId: 'przysadka',
    title: 'Gdy dłonie i rysy twarzy stają się obce',
    subtitle: 'Akromegalia, IGF-1, test OGTT dla GH i analogi somatostatyny',
    group: 'Gruczolaki i hipersekrecja',
    minutes: 17,
    goals: [
      'Rozpoznasz podstępne objawy akromegalii (rozrost tkanek miękkich, bezdech senny, cukrzyca, kardiomiopatia).',
      'Opanujesz kryteria rozpoznania (IGF-1, brak supresji GH w OGTT <1,0 µg/l) oraz leczenie skojarzone.',
    ],
    sections: [
      {
        title: 'Podstępny rozwój i fenotyp akromegalii',
        text: 'Akromegalia wynika w >98% z gruczolaka somatotropowego przysadki wydzielającego hormon wzrostu (GH). Czas od pierwszych objawów do diagnozy wynosi średnio 7–10 lat! U dorosłych po zrośnięciu nasad kostnych dochodzi do rozrostu tkanek miękkich i kości twarzoczaszki: powiększenie nosa, warg, języka (makroglosja), żuchwy (prognatyzm), pogrubienie rysów twarzy, wzrost rozmiaru butów i rękawiczek (konieczność powiększania pierścionków). Dołączają potliwość, zespół cieśni nadgarstka, bóle stawów, obturacyjny bezdech senny (OBS), polipy jelita grubego oraz kardiomiopatia z niewydolnością serca.',
      },
      {
        title: 'Kryteria laboratoryjne: IGF-1 i test OGTT',
        text: 'Diagnostyka dwuetapowa: 1) Badanie przesiewowe: stężenie IGF-1 w surowicy powyżej normy dla wieku i płci. 2) Test potwierdzenia: doustny test tolerancji 75 g glukozy (OGTT) z pomiarem GH w punktach 0, 30, 60, 90 i 120 minut. W warunkach fizjologicznych hiperglikemia hamuje wydzielanie GH <1,0 µg/l (lub <0,4 µg/l w ultraczułych testach). Brak supresji GH potwierdza autonomiczną akromegalię.',
      },
      {
        title: 'Leczenie: Neurochirurgia i farmakoterapia',
        text: 'Leczeniem pierwszego rzutu w akromegalii jest operacja neurochirurgiczna przez zatokę klinową (transsphenoidalna adenomektomia), która daje szansę na całkowite wyleczenie. Przy przetrwałej chorobie lub guzach nieresekcyjnych wkracza farmakoterapia: analogi somatostatyny pierwszej generacji (octreotide LAR, lanreotide autogel blokujące receptory SSTR2), a w drugiej kolejności antagonista receptora GH (pegwisomant) lub analog somatostatyny wieloreceptorowy (pasireotyd).',
      },
    ],
    table: {
      headers: ['Etap postępowania', 'Kryterium / Lek'],
      rows: [
        ['Przesiew laboratoryjny', 'Podwyższone stężenie IGF-1 skorygowane dla wieku i płci'],
        ['Potwierdzenie autonomii', 'Test OGTT 75 g glukozy — brak supresji GH poniżej 1,0 µg/l'],
        ['Leczenie 1. rzutu', 'Operacja neurochirurgiczna przezklinowa (transsphenoidal surgery)'],
        ['Farmakoterapia uzupełniająca', 'Analogi somatostatyny (oktreotyd, lanreotyd), pegwisomant, kabergolina'],
      ],
    },
    advanced:
      'Pegwisomant to zmodyfikowana rekombinowana cząsteczka GH będąca antagonistą receptora obwodowego. Skutecznie normalizuje stężenie IGF-1 i cofa objawy obwodowe u >90% opornych chorych, jednak nie działa na sam guz przysadki (stężenie krążącego GH pozostaje bardzo wysokie, a wymiary guza wymagają monitorowania MRI pod kątem możliwego rozrostu).',
    summary:
      'Akromegalia to podstępna choroba ogólnoustrojowa skracająca życie o 10 lat z przyczyn sercowych i onkologicznych. Diagnozę stawia podwyższony IGF-1 i brak supresji GH w teście OGTT, a leczeniem z wyboru jest operacja przezklinowa.',
    sourceIds: ['katznelson', 'pte_acro'],
    questions: [
      q(
        'Jak zachowuje się stężenie hormonu wzrostu (GH) podczas testu OGTT 75 g glukozy u osoby ze zdrową przysadką?',
        ['Ulega supresji poniżej 1,0 µg/l (często <0,4 µg/l)', 'Hiperglikemia fizjologicznie silnie hamuje uwalnianie somatotropiny z przysadki.'],
        ['Wzrasta powyżej 10 µg/l', 'Wzrost GH po glukozie jest paradoksalną reakcją patologiczną, a nie normą.'],
        ['Pozostaje całkowicie niezmienne na poziomie wyjściowym', 'Fizjologiczna oś GH wykazuje wyraźną dynamikę i podlega hamowaniu metabolicznemu.']
      ),
      q(
        'Co jest leczeniem pierwszego wyboru u pacjenta z nowo rozpoznaną akromegalią i makrogruczolakiem przysadki?',
        ['Operacja neurochirurgiczna przez zatokę klinową (dostęp transsphenoidalny)', 'Jest to jedyna metoda dająca natychmiastowe odbarczenie struktur nerwowych i szansę na całkowite wyleczenie.'],
        ['Wyłącznie leczenie dietetyczne z ograniczeniem węglowodanów', 'Dieta nie hamuje autonomicznego rozrostu gruczolaka przysadki.'],
        ['Podawanie rekombinowanego ludzkiego hormonu wzrostu', 'Podaż GH pogłębiłaby zagrażającą życiu intoksykację hormonalną.']
      ),
      q(
        'Które badanie profilaktyczne jest bezwzględnie zalecane u każdego pacjenta z akromegalią z uwagi na zwiększone ryzyko onkologiczne?',
        ['Kolonoskopia w kierunku polipów i raka jelita grubego', 'Nadmiar GH i IGF-1 stymuluje proliferację nabłonka jelitowego, znacznie zwiększając ryzyko neoplazji.'],
        ['Gastroskopia co 3 miesiące', 'Gastroskopia nie jest badaniem rutynowo dedykowanym w algorytmie powikłań akromegalii.'],
        ['Scyntygrafia kośćca z technetem', 'Nie służy do wczesnego wykrywania nowotworów towarzyszących akromegalii.']
      ),
      q(
        'Jaki lek blokuje receptor obwodowy hormonu wzrostu i nie wymaga obecności receptorów somatostatynowych na guzie?',
        ['Pegwisomant', 'To genetycznie zmodyfikowany analog GH będący antagonistą receptora w wątrobie i tkankach obwodowych.'],
        ['Oktreotyd LAR', 'Oktreotyd działa przez receptory somatostatynowe SSTR2 na komórkach guza.'],
        ['Lewotyroksyna', 'Lewotyroksyna uzupełnia hormony tarczycy i nie ma wpływu na receptor GH.']
      ),
      q(
        'Jaki jest typowy powód opóźnienia rozpoznania akromegalii o średnio 7–10 lat od początku choroby?',
        ['Bardzo powolny, dyskretny rozrost tkanek miękkich przypisywany starzeniu się lub zmianie wagi', 'Zmiany wyglądu zachodzą tak powoli, że ani pacjent, ani bliscy nie zauważają ich z dnia na dzień.'],
        ['Brak dostępności badań laboratoryjnych w Europie', 'Badania IGF-1 są powszechnie dostępne w standardowej diagnostyce.'],
        ['Ciągłe gwałtowne spadki ciśnienia tętniczego', 'W akromegalii dominuje nadciśnienie tętnicze, a nie hipotensja.']
      ),
    ],
  },
  {
    id: 'cushing-choroba',
    moduleId: 'przysadka',
    title: 'Podstępny nadmiar kortyzolu',
    subtitle: 'Choroba Cushinga, gruczolaki kortykotropowe i różnicowanie hiperkortyzolemii',
    group: 'Gruczolaki i hipersekrecja',
    minutes: 18,
    goals: [
      'Rozróżnisz pojęcie zespołu Cushinga (każdy nadmiar kortyzolu) od choroby Cushinga (gruczolak przysadki wydzielający ACTH).',
      'Zrozumiesz trzystopniowy algorytm diagnostyczny: potwierdzenie hiperkortyzolemii $\\to$ oznaczenie ACTH $\\to$ lokalizacja źródła.',
    ],
    sections: [
      {
        title: 'Zespół a choroba Cushinga: Różnica pojęciowa i fenotyp',
        text: 'Zespół Cushinga to zespół objawów klinicznych wywołanych przewlekłym nadmiarem glikokortykosteroidów (najczęściej jatrogennym z powodu leków!). Choroba Cushinga to specyficzna postać endogenna: gruczolak przysadki wydzielający w nadmiarze ACTH (odpowiada za ok. 70% endogennych postaci). Objawy o największej swoistości: proksymalne osłabienie mięśniowe (trudność we wstawaniu z przysiadu), szerokie (>1 cm) żywoczerwone lub purpurowe rozstępy na brzuchu i udach, łatwe siniaczenie przy minimalnym urazie, zaokrąglenie twarzy („księżyc w pełni”), bawoli kark i otyłość trzewna.',
      },
      {
        title: 'Krok 1: Potwierdzenie autonomicznej hiperkortyzolemii',
        text: 'Nigdy nie oznacza się pojedynczego porannego kortyzolu we krwi (stres podbija wynik)! Zgodnie z wytycznymi stosuje się co najmniej dwa różne testy przesiewowe pierwszego rzutu: 1) Test nocnego hamowania 1 mg deksametazonu: podanie 1 mg deksametazonu o godz. 23:00 i pomiar kortyzolu w surowicy o 8:00–9:00 rano następnego dnia. Norma: kortyzol <1,8 µg/dl (50 nmol/l). Wynik >=1,8 potwierdza brak hamowania. 2) Dobowe wydalanie wolnego kortyzolu w moczu (UFC) — co najmniej dwukrotnie. 3) Stężenie kortyzolu w ślinie o północy (ocena zaniku fizjologicznego rytmu dobowego).',
      },
      {
        title: 'Krok 2 i 3: Oznaczenie ACTH i cewnikowanie zatok (BIPSS)',
        text: 'Po potwierdzeniu hiperkortyzolemii mierzy się stężenie ACTH w osoczu rano: ACTH <5 pg/ml oznacza postać ACTH-niezależną (guz lub rozrost nadnerczy — zleć TK nadnerczy). ACTH >15–20 pg/ml oznacza postać ACTH-zależną (choroba Cushinga vs ektopowe wydzielanie ACTH np. przez rakowiaka płuc). Ponieważ mikrogruczolaki kortykotropowe w chorobie Cushinga są mikroskopijne (<5 mm) i w 40% niewidoczne w MRI, złotym standardem różnicowania jest obustronne cewnikowanie zatok skalistych dolnych (BIPSS) ze stymulacją CRH.',
      },
    ],
    table: {
      headers: ['Badanie / Test', 'Kryterium diagnostyczne'],
      rows: [
        ['Test 1 mg deksametazonu', 'Brak hamowania kortyzolu rano >=1,8 µg/dl (50 nmol/l) = patologia'],
        ['Kortyzol w ślinie o 23:00', 'Wzrost stężenia świadczy o zniesieniu fizjologicznego rytmu dobowego'],
        ['Stężenie ACTH w osoczu', '<5 pg/ml = guz nadnercza; >15 pg/ml = postać ACTH-zależna (przysadka / ektopia)'],
        ['Cewnikowanie BIPSS', 'Gradient ACTH przysadka/obwód >2 (lub >3 po CRH) potwierdza chorobę Cushinga'],
      ],
    },
    advanced:
      'W przypadku guzów ektopowo wydzielających ACTH (np. drobnokomórkowy rak płuca, rakowiaki oskrzela) choroba rozwija się bardzo gwałtownie z ciężką hipokaliemią i hiperpigmentacją skóry z powodu stymulacji receptorów MC1R przez olbrzymie stężenia proopiomelanokortyny (POMC) i ACTH, często zanim wykształci się pełny fenotyp otyłości.',
    summary:
      'Choroba Cushinga to gruczolak przysadki stymulujący nadnercza przez ACTH. Rozpoznanie wymaga najpierw potwierdzenia braku hamowania kortyzolu (test 1 mg deksametazonu <1,8 µg/dl), a następnie wykazania nieobniżonego ACTH i lokalizacji w siodle (MRI / BIPSS).',
    sourceIds: ['nieman', 'pte_cushing'],
    questions: [
      q(
        'Jakie stężenie kortyzolu w surowicy krwi o godz. 8:00 rano po przyjęciu 1 mg deksametazonu o 23:00 wyklucza zespół Cushinga?',
        ['Poniżej 1,8 µg/dl (50 nmol/l)', 'Prawidłowa oś podwzgórze-przysadka ulega pełnemu stłumieniu poniżej tego punktu odcięcia.'],
        ['Poniżej 10 µg/dl', 'Wartość 10 µg/dl jest zdecydowanie zbyt wysoka i nie wyklucza łagodnej hiperkortyzolemii.'],
        ['Dokładnie zero mikrogramów', 'W surowicy zawsze oznacza się śladowe ilości; punkt odcięcia ustalono na 1,8 µg/dl.']
      ),
      q(
        'Czym różni się choroba Cushinga od zespołu Cushinga?',
        ['Choroba Cushinga to wyłącznie postać wywołana gruczolakiem przysadki wydzielającym ACTH', 'Zespół Cushinga to pojęcie nadrzędne obejmujące każdą przyczynę hiperkortyzolemii (w tym leki i guzy nadnerczy).'],
        ['Choroba Cushinga dotyczy wyłącznie dzieci, a zespół dorosłych', 'Obie jednostki mogą występować w każdym wieku.'],
        ['W chorobie Cushinga kortyzol jest niski, a w zespole wysoki', 'W obu stanach występuje patologiczny nadmiar kortyzolu.']
      ),
      q(
        'U pacjenta potwierdzono hiperkortyzolemię. Stężenie ACTH w osoczu wynosi <2 pg/ml (całkowicie stłumione). Gdzie zlokalizowana jest przyczyna?',
        ['W korze nadnerczy (autonomiczny guz lub rozrost nadnercza)', 'Nadmiar kortyzolu z nadnercza hamuje przysadkowe ACTH na drodze ujemnego sprzężenia zwrotnego.'],
        ['W przysadce mózgowej', 'Gruczolak przysadki powodowałby wysokie lub nieadekwatnie prawidłowe ACTH, a nie stłumione.'],
        ['W jądrach podwzgórza', 'Podwzgórze w tym stanie jest zablokowane ujemnym sprzężeniem zwrotnym.']
      ),
      q(
        'Dlaczego pojedyncze poranne stężenie kortyzolu we krwi NIE służy do wstępnego wykluczenia zespołu Cushinga?',
        ['Kortyzol wydziela się pulsacyjnie, a stres związany z wkłuciem igły może fałszywie podwyższyć wynik u osoby zdrowej', 'Dlatego stosuje się testy oceniające brak hamowania (deksametazon) lub zanik rytmu dobowego (ślina o północy).'],
        ['Kortyzol rano w ogóle nie występuje we krwi u ludzi', 'Fizjologiczny szczyt wydzielania kortyzolu przypada właśnie na wczesne godziny poranne.'],
        ['Oznaczenie kortyzolu wymaga pobrania płynu mózgowo-rdzeniowego', 'Kortyzol rutynowo oznacza się w surowicy, moczu lub ślinie, a nie w PMR.']
      ),
      q(
        'Kiedy stosuje się obustronne cewnikowanie zatok skalistych dolnych (BIPSS)?',
        ['W celu odróżnienia przysadkowej choroby Cushinga od ektopowego wydzielania ACTH, gdy MRI siodła jest niejednoznaczne', 'Porównanie stężeń ACTH we krwi odpływającej z przysadki i we krwi obwodowej daje 99% pewności co do źródła.'],
        ['Jako rutynowe badanie przesiewowe u każdego chorego z otyłością', 'Jest to inwazyjna procedura naczyniowa zarezerwowana dla trudnych przypadków specjalistycznych.'],
        ['W celu usunięcia gruczolaka przysadki bez operacji', 'BIPSS to badanie czysto diagnostyczne, a nie zabieg terapeutyczny.']
      ),
    ],
  },
  {
    id: 'guzy-nieczynne',
    moduleId: 'przysadka',
    title: 'Cisi lokatorzy siodła',
    subtitle: 'Gruczolaki nieczynne hormonalnie (NFPA), incydentaloma i wskazania neurochirurgiczne',
    group: 'Gruczolaki i hipersekrecja',
    minutes: 14,
    goals: [
      'Zdefiniujesz pojęcie guza nieczynnego hormonalnie (NFPA) oraz incydentaloma przysadki.',
      'Opanujesz kryteria kwalifikacji do leczenia operacyjnego vs bezpiecznej obserwacji w rezonansie.',
    ],
    sections: [
      {
        title: 'Czym są gruczolaki nieczynne hormonalnie (NFPA)?',
        text: 'Gruczolaki nieczynne hormonalnie (Non-Functioning Pituitary Adenomas — NFPA) stanowią około 30–40% wszystkich guzów przysadki. Nie wydzielają do krwi biologicznie aktywnych hormonów w ilościach dających objawy obwodowej nadczynności (choć immunohistochemicznie najczęściej wywodzą się z komórek gonadotropowych syntetyzujących podjednostki alfa lub beta-LH/FSH). Przez lata rosną bezobjawowo, osiągając znaczne rozmiary (makrogruczolaki), zanim zostaną wykryte z powodu ucisku na sąsiednie struktury.',
      },
      {
        title: 'Incydentaloma przysadki — przypadek z rezonansu',
        text: 'Incydentaloma to bezobjawowy guz przysadki wykryty przypadkowo podczas tomografii lub rezonansu głowy wykonywanego z innych wskazań (np. po urazie głowy, w diagnostyce migreny czy zawrotów głowy). Szacuje się, że małe mikrogruczolaki występują u nawet 10–15% zdrowej populacji! Postępowanie zależy od rozmiaru: mikrogruczolaki (<10 mm) rzadko rosną i zwykle wymagają jedynie kontrolnego MRI po 12 miesiącach oraz wyjściowych badań hormonalnych; makrogruczolaki (>=10 mm) wymagają pełnego panelu, perymetrii i częstszego nadzoru.',
      },
      {
        title: 'Wskazania do leczenia operacyjnego',
        text: 'Ponieważ leczenie farmakologiczne w NFPA jest nieskuteczne (brak odpowiedzi na kabergolinę czy analogi somatostatyny w stopniu zmniejszającym masę guza), podstawą leczenia jest operacja neurochirurgiczna przez zatokę klinową. Bezwzględne wskazania do operacji: 1) Ubytek pola widzenia spowodowany bezpośrednim uciskiem na skrzyżowanie wzrokowe lub nerwy wzrokowe; 2) Guz przylegający do chiazmy lub powodujący ucisk pnia mózgu; 3) Apopleksja przysadki z ostrymi objawami neurologicznymi; 4) Udokumentowany postępujący wzrost makrogruczolaka w kontrolnych badaniach MRI.',
      },
    ],
    table: {
      headers: ['Wymiar / Sytuacja kliniczna', 'Zalecane postępowanie'],
      rows: [
        ['Mikrogruczolak (<10 mm), brak objawów', 'Wyjściowy panel hormonalny, kontrolny MRI za 12 miesięcy; brak operacji'],
        ['Makrogruczolak bez ucisku chiazmy', 'Pełny panel hormonalny, perymetria, kontrola MRI za 6 miesięcy'],
        ['Guz uciskający chiazmę wzrokową', 'Pilna kwalifikacja do operacji przez zatokę klinową (dostęp transsphenoidalny)'],
        ['Utrata wzroku / objawy apopleksji', 'Pilna dekompresja neurochirurgiczna w trybie ostrym'],
      ],
    },
    advanced:
      'W przypadku guzów nieoperacyjnych lub niecałkowicie zrespektowanych makrogruczolaków NFPA wykazujących tendencję do wznowy w sąsiedztwie zatoki jamistej metodą z wyboru zapobiegającą dalszemu wzrostowi jest precyzyjna radioterapia stereotaktyczna (np. Gamma Knife lub CyberKnife), która zatrzymuje proliferację u ponad 90% chorych.',
    summary:
      'Gruczolaki nieczynne (NFPA) ujawniają się objawami masy (ubytki wzroku, bóle głowy, niedoczynność przysadki z ucisku). Leczeniem z wyboru w przypadku ucisku na skrzyżowanie wzrokowe jest operacja przezklinowa; bezobjawowe mikrogruczolaki wymagają jedynie bezpiecznego nadzoru.',
    sourceIds: ['freda'],
    questions: [
      q(
        'Jakie jest bezwzględne wskazanie do operacji neurochirurgicznej u pacjenta z gruczolakiem nieczynnym hormonalnie (NFPA)?',
        ['Ubytek pola widzenia wywołany uciskiem na skrzyżowanie wzrokowe', 'Odbarczenie chiazmy wzrokowej zapobiega trwałej i nieodwracalnej utracie wzroku.'],
        ['Wykrycie mikrogruczolaka o średnicy 4 mm w badaniu po urazie głowy', 'Bezobjawowe mikrogruczolaki nie stanowią wskazania do operacji.'],
        ['Obecność pojedynczych przeciwciał anty-TPO w surowicy', 'Przeciwciała tarczycowe nie mają związku ze wskazaniami do operacji przysadki.']
      ),
      q(
        'Czy leczenie farmakologiczne kabergoliną jest standardową terapią pierwszego rzutu w gruczolakach nieczynnych hormonalnie (NFPA)?',
        ['Nie, leczenie farmakologiczne nie powoduje istotnego zmniejszenia masy NFPA, metodą z wyboru jest chirurgia', 'Agoniści dopaminy są wysoce skuteczni w prolactinoma, ale nie w guzach nieczynnych hormonalnie.'],
        ['Tak, każdy guz przysadki leczy się najpierw kabergoliną przez 5 lat', 'Takie postępowanie opóźniłoby konieczną operację i naraziło chorego na utratę wzroku.'],
        ['Tak, ale wyłącznie w skojarzeniu z lewotyroksyną', 'Lewotyroksyna jest hormonem tarczycy, a nie lekiem przeciwnowotworowym na przysadkę.']
      ),
      q(
        'Jak często małe, przypadkowo wykryte mikrogruczolaki przysadki (<10 mm) ulegają powiększeniu w wieloletniej obserwacji?',
        ['Rzadko (w poniżej 10–15% przypadków)', 'Większość mikrogruczolaków pozostaje stabilna przez całe życie pacjenta, stąd zalecenie zachowawczej obserwacji.'],
        ['W 100% przypadków w ciągu pierwszych 2 miesięcy', 'Gruczolaki przysadki nie wykazują tak gwałtownego, złośliwego tempa wzrostu.'],
        ['Nigdy żaden mikrogruczolak się nie powiększa', 'Niewielki odsetek może powoli rosnąć, dlatego zaleca się kontrolne badanie MRI po 12 miesiącach.']
      ),
      q(
        'W jaki sposób duży nieczynny makrogruczolak przysadki może doprowadzić do niedoczynności tarczycy lub kory nadnerczy?',
        ['Poprzez mechaniczny ucisk i niszczenie zdrowego miąższu przedniego płata przysadki', 'Masa guza prowadzi do zaniku komórek tyreotropowych i kortykotropowych, wywołując hipopituitaryzm.'],
        ['Poprzez produkcję toksyn niszczących bezpośrednio nadnercza i tarczycę na obwodzie', 'Guzy przysadki nie wydzielają toksyn obwodowych.'],
        ['Nie może wywołać niedoczynności innych osi', 'Niedoczynność z ucisku jest jednym z najczęstszych powikłań dużych makrogruczolaków.']
      ),
      q(
        'Pacjent ma przypadkowo wykrytego mikrogruczolaka 6 mm bez objawów klinicznych i z prawidłowym polem widzenia. Jaki jest prawidłowy plan nadzoru?',
        ['Oznaczenie profilu hormonalnego i kontrolne badanie MRI za 12 miesięcy', 'To bezpieczne, rekomendowane przez Endocrine Society postępowanie oszczędzające choremu niepotrzebnej operacji.'],
        ['Pilna kraniotomia z otwarciem pokrywy czaszki w ciągu 24 godzin', 'Kraniotomia byłaby błędem w sztuce i nieuzasadnionym narażeniem życia chorego.'],
        ['Zaniechanie jakiejkolwiek kontroli i usunięcie dokumentacji', 'Konieczne jest co najmniej jednorazowe potwierdzenie stabilności zmiany po roku.']
      ),
    ],
  },
];
