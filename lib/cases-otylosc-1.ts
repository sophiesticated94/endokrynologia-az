import type { OtyloscCaseDraft } from './cases-otylosc-types.ts';

export const otyloscCasesPart1: OtyloscCaseDraft[] = [
  {
    id: 'case-otylosc-kwalifikacja-glp1',
    lessonId: 'otylosc-leki-inkretynowe-glp1',
    title: 'Kwalifikacja do semaglutydu 2.4 mg i zapobieganie nudnościom',
    patient: 'Kobieta, 42 lata',
    difficulty: 'Podstawowy',
    intro: 'Kobieta z masą ciała 98 kg przy wzroście 165 cm (BMI 36,0 kg/m²) zgłasza się z powodu nieskuteczności dotychczasowych prób redukcji wagi dietą i prosi o nowoczesne leczenie farmakologiczne.',
    steps: [
      {
        prompt: 'W badaniach laboratoryjnych: glukoza na czczo 112 mg/dl, HbA1c 5,9%, ALT 48 U/l, lipidogram: TG 190 mg/dl, HDL 42 mg/dl. Jaka jest diagnoza i wskazanie kliniczne?',
        context: 'Pacjentka nie choruje na cukrzycę, w USG cechy stłuszczenia wątroby.',
        options: [
          { text: 'Otyłość II stopnia ze stanem przedcukrzycowym (IFG) i MASLD — pełne wskazanie do analogu GLP-1 (semaglutyd 2,4 mg)', explanation: 'Zgodnie z ChPL i wytycznymi EASO/ADA wskaźnik BMI >= 30 kwalifikuje do farmakoterapii semaglutydem 2,4 mg.' },
          { text: 'Prawidłowa masa ciała bez wskazań do jakiejkolwiek interwencji medycznej', explanation: 'BMI 36,0 kg/m² definiuje otyłość II stopnia powikłaną metabolicznie.' },
        ],
      },
      {
        prompt: 'Jaki wywiad osobisty lub rodzinny należy bezwzględnie zebrać przed wypisaniem pierwszej recepty na semaglutyd?',
        context: 'Pacjentka podaje, że jej ciotka miała operację tarczycy.',
        options: [
          { text: 'Wywiad w kierunku raka rdzeniastego tarczycy (MTC) oraz zespołu mnogiej gruczolakowatości wewnątrzwydzielniczej typu 2 (MEN2)', explanation: 'MTC i MEN2 stanowią bezwzględne przeciwwskazanie do stosowania agonistów receptora GLP-1.' },
          { text: 'Wywiad w kierunku przebytej ospy wietrznej w dzieciństwie', explanation: 'Przebycie ospy wietrznej nie ma żadnego związku ze stosowaniem leków inkretynowych.' },
        ],
      },
      {
        prompt: 'W jaki sposób należy zaplanować schemat dawkowania semaglutydu podskórnego, aby zminimalizować ryzyko nudności i wymiotów?',
        context: 'Lek wstrzykiwany jest raz w tygodniu.',
        options: [
          { text: 'Rozpocząć od dawki 0,25 mg raz w tygodniu i zwiększać dawkę co 4 tygodnie (0,25 -> 0,5 -> 1,0 -> 1,7 -> 2,4 mg)', explanation: 'Czterotygodniowe odstępy pozwalają na stopniową adaptację przewodu pokarmowego do spowolnionej motoryki.' },
          { text: 'Podać od razu pełną dawkę docelową 2,4 mg w pierwszym tygodniu', explanation: 'Pominięcie eskalacji wywołuje gwałtowne nudności, wymioty i może doprowadzić do ostrego odwodnienia.' },
        ],
      },
      {
        prompt: 'Po 6 miesiącach pacjentka schudła 14 kg (do 84 kg), jednak w USG stwierdzono drobne bezobjawowe złogi w pęcherzyku żółciowym. Jaka jest przyczyna?',
        context: 'Brak dolegliwości bólowych brzucha, enzymy wątrobowe w normie.',
        options: [
          { text: 'Szybka redukcja masy ciała zwiększa wysycenie żółci cholesterolem, co w połączeniu ze spowolnieniem pęcherzyka sprzyja litogenezie', explanation: 'Jest to znany mechanizm powstawania kamicy żółciowej podczas gwałtownego chudnięcia na analogach GLP-1.' },
          { text: 'Cząsteczki semaglutydu krystalizują bezpośrednio w przewodach żółciowych', explanation: 'Semaglutyd nie wytrąca się w drogach żółciowych; kamica wynika z mobilizacji endogennego cholesterolu.' },
        ],
      },
    ],
  },
  {
    id: 'case-otylosc-tirzepatyd-insulinoopornosc',
    lessonId: 'otylosc-podwojni-potrojni-agonisci',
    title: 'Podwójny agonista GLP-1/GIP w otyłości z cukrzycą typu 2',

    patient: 'Mężczyzna, 48 lat',
    difficulty: 'Zaawansowany',
    intro: 'Kierowca zawodowy o masie 118 kg przy wzroście 176 cm (BMI 38,1 kg/m²) chorujący na cukrzycę typu 2 od 3 lat (HbA1c 8,4% na metforminie) prosi o lek redukujący masę ciała bez ryzyka hipoglikemii.',
    steps: [
      {
        prompt: 'Pacjent obawia się hipoglikemii podczas prowadzenia pojazdu ciężarowego. Jaki lek o najwyższej sile redukcji masy ciała i minimalnym ryzyku hipoglikemii należy zaproponować?',
        context: 'eGFR 88 ml/min/1,73 m², ciśnienie tętnicze 145/90 mmHg.',
        options: [
          { text: 'Podwójny agonista receptorów GLP-1 i GIP — tirzepatyd w dawce stopniowo eskalowanej do 15 mg s.c. raz w tygodniu', explanation: 'Tirzepatyd stymuluje wydzielanie insuliny w sposób ściśle zależny od glukozy (brak hipoglikemii w monoterapii) i redukuje wagę o ponad 20%.' },
          { text: 'Pochodna sulfonylomocznika (gliklazyd w maksymalnej dawce) w skojarzeniu z insuliną NPH', explanation: 'Pochodne sulfonylomocznika i insulina niosą wysokie ryzyko hipoglikemii i promują dalszy przyrost masy ciała.' },
        ],
      },
      {
        prompt: 'W jaki sposób komponent agonizmu receptora GIP w tirzepatydzie wspomaga działanie metaboliczne w porównaniu do samego GLP-1?',
        context: 'Analiza mechanizmu działania tzw. twincretins.',
        options: [
          { text: 'Poprawia przepływ krwi i elastyczność białej tkanki tłuszczowej, hamując ektopowe odkładanie tłuszczu w wątrobie i mięśniach', explanation: 'GIP fizjologicznie buforuje lipidy w podskórnej tkance tłuszczowej, chroniąc przed lipotoksycznością narządową.' },
          { text: 'Blokuje receptory insulinowe w wątrobie, wymuszając glukoneogenezę', explanation: 'Tirzepatyd zwiększa insulinowrażliwość i hamuje patologiczną glukoneogenezę.' },
        ],
      },
      {
        prompt: 'Po 40 tygodniach leczenia pacjent zredukował masę ciała o 23 kg (BMI 30,7 kg/m²), a HbA1c spadła do 5,6%. Jakie postępowanie długoterminowe należy zaplanować?',
        context: 'Pacjent pyta, czy może całkowicie odstawić lek po osiągnięciu sukcesu.',
        options: [
          { text: 'Kontynuacja leczenia podtrzymującego tirzepatydem — przerwanie terapii wywołuje szybki nawrót masy ciała i dysglikemii', explanation: 'Otyłość jest chorobą przewlekłą; badania SURMOUNT-4 wykazały nawrót masy ciała po przerwaniu terapii u ponad 80% chorych.' },
          { text: 'Natychmiastowe odstawienie leku, ponieważ cukrzyca i otyłość zostały trwale wykorzenione z genomu', explanation: 'Otyłość nie zostaje wyeliminowana z genomu, a biologiczny napęd głodu powraca po usunięciu leku.' },
        ],
      },
      {
        prompt: 'Miesiąc później pacjent zgłasza osłabienie siły mięśniowej przy wchodzeniu po schodach. Analiza składu ciała BIA wykazuje ubytek 6 kg beztłuszczowej masy mięśniowej (FFM). Co należy wdrożyć?',
        context: 'Dynamometria ręki: spadek siły uścisku o 20%.',
        options: [
          { text: 'Wprowadzić nadzorowany trening oporowy (siłowy) oraz zwiększyć podaż białka w diecie do 1,2–1,5 g/kg m.c./dobę', explanation: 'Trening siłowy i aminokwasy chronią mięśnie przed katabolizmem w trakcie intensywnej redukcji masy ciała.' },
          { text: 'Zalecić całkowitą rezygnację z białka na rzecz diety bogatocukrowej', explanation: 'Brak białka nasiliłby atrofię mięśniową i doprowadził do otyłości sarkopenicznej.' },
        ],
      },
    ],
  },
  {
    id: 'case-otylosc-kwalifikacja-bariatryczna',
    lessonId: 'otylosc-bariotria-kwalifikacja-techniki',
    title: 'Kwalifikacja do chirurgii bariatrycznej: wybór LSG vs RYGB',
    patient: 'Kobieta, 36 lat',
    difficulty: 'Zaawansowany',
    intro: 'Młoda kobieta z masą ciała 116 kg przy wzroście 163 cm (BMI 43,7 kg/m²), z ciężkim refluksem żołądkowo-przełykowym i bezdechem sennym, zostaje skierowana na konsultację chirurgiczną.',
    steps: [
      {
        prompt: 'Czy pacjentka spełnia kryteria kwalifikacji do chirurgii bariatrycznej i metabolicznej zgodnie z wytycznymi IFSO/ASMBS 2023?',
        context: 'Pacjentka podejmowała w przeszłości wielokrotne próby odchudzania pod okiem dietetyka.',
        options: [
          { text: 'Tak, BMI >= 35 kg/m² stanowi bezwzględne wskazanie do chirurgii bariatrycznej niezależnie od chorób współistniejących', explanation: 'Wytyczne IFSO 2023 uznają BMI >= 35 za samodzielne wskazanie do operacji metabolicznej.' },
          { text: 'Nie, operacje bariatryczne są dozwolone wyłącznie u pacjentów z BMI powyżej 60 kg/m²', explanation: 'Próg 60 kg/m² to skrajna otyłość; wskazania bariatryczne zaczynają się od BMI 35 (lub 30 z powikłaniami).' },
        ],
      },
      {
        prompt: 'W gastroskopii przedoperacyjnej uwidoczniono nadżerkowe zapalenie przełyku stopnia C wg klasyfikacji Los Angeles oraz przepuklinę rozworu przełykowego 4 cm. Którą technikę operacyjną należy wybrać?',
        context: 'Chirurg rozważa rękawową resekcję żołądka (LSG) lub ominięcie żołądkowe Roux-en-Y (RYGB).',
        options: [
          { text: 'Ominięcie żołądkowe na pętli Roux-en-Y (RYGB) z plastyką rozworu przełykowego', explanation: 'RYGB jest procedurą z wyboru w ciężkim GERD, ponieważ mały niskociśnieniowy zbiornik całkowicie znosi refluks kwaśny.' },
          { text: 'Rękawowa resekcja żołądka (LSG)', explanation: 'LSG podwyższa ciśnienie w żołądku i u pacjentki z zapaleniem LA-C groziłaby owrzodzeniami i perforacją przełyku.' },
        ],
      },
      {
        prompt: 'Jakie badania w kierunku powikłań oddechowych należy bezwzględnie wykonać przed znieczuleniem ogólnym u tej chorej?',
        context: 'W wywiadzie: głośne chrapanie, poranne bóle głowy, skala Epworth 16/24 pkt.',
        options: [
          { text: 'Poligrafia snu (lub polisomnografia) w celu oceny wskaźnika AHI oraz wdrożenie aparatu CPAP przed operacją w razie ciężkiego OSAS', explanation: 'Nieleczony ciężki OSAS drastycznie zwiększa ryzyko powikłań anestezjologicznych i skurczu krtani przy wybudzaniu.' },
          { text: 'Scyntygrafia perfuzyjna mózgu z technetem-99m', explanation: 'Scyntygrafia mózgu nie służy do oceny dróg oddechowych ani bezdechu sennego.' },
        ],
      },
      {
        prompt: 'Podczas kwalifikacji psychologicznej pacjentka przyznaje się do regularnych napadów niekontrolowanego objadania się (Binge Eating Disorder, BED). Jakie postępowanie jest właściwe?',
        context: 'Konsultacja zespołu wielodyscyplinarnego.',
        options: [
          { text: 'Wdrożenie psychoterapii poznawczo-behawioralnej (CBT) przed operacją w celu ustabilizowania nawyków żywieniowych', explanation: 'Nieleczone zaburzenia odżywiania typu BED po operacji grożą rozepchaniem zbiornika żołądkowego i powikłaniami.' },
          { text: 'Natychmiastowe wykonanie zabiegu w trybie pilnym tego samego dnia', explanation: 'Chirurgia bariatryczna wymaga starannego przygotowania psychologicznego i dietetycznego.' },
        ],
      },
    ],
  },
  {
    id: 'case-otylosc-powiklanie-bariatryczne-dumping',
    lessonId: 'otylosc-bariotria-powiklania-suplementacja',
    title: 'Drżenia rąk i poty po posiłku u pacjenta po bypassie żołądkowym',
    patient: 'Mężczyzna, 39 lat',
    difficulty: 'Zaawansowany',
    intro: 'Mężczyzna 8 miesięcy po operacji RYGB zgłasza się z powodu napadów zlewnego potu, kołatania serca, drżenia rąk i osłabienia występujących około 2 godziny po zjedzeniu drożdżówki lub wypiciu soku.',
    steps: [
      {
        prompt: 'W trakcie napadu glukometr wskazał glikemię 38 mg/dl. Spożycie węglowodanów prostych szybko złagodziło objawy. Jakie powikłanie należy rozpoznać?',
        context: 'Przed operacją chory nie miał cukrzycy.',
        options: [
          { text: 'Późny zespół poposiłkowy (late dumping syndrome) z reaktywną hipoglikemią hiperinsulinemiczną', explanation: 'Gwałtowny pasaż węglowodanów do jelita czczego wywołuje nadmierny wyrzut GLP-1 i hipersekrecję insuliny.' },
          { text: 'Wczesny dumping syndrome z hipowolemią tętniczą', explanation: 'Wczesny dumping rozwija się w ciągu 15–30 minut od posiłku i nie wiąże się z hipoglikemią, lecz przesunięciem płynów.' },
        ],
      },
      {
        prompt: 'Co należy wdrożyć w pierwszej kolejności w postępowaniu dietetycznym u tego chorego?',
        context: 'Edukacja żywieniowa pacjenta bariatrycznego.',
        options: [
          { text: 'Całkowitą eliminację cukrów prostych i posiłków o wysokim IG na rzecz węglowodanów złożonych, białka i błonnika oraz rozdzielenie picia od jedzenia', explanation: 'Zapobiega to gwałtownym skokom glikemii i niekontrolowanemu poposiłkowemu wyrzutowi insuliny.' },
          { text: 'Zalecenie zjadania tabliczki czekolady przed każdym głównym posiłkiem', explanation: 'Cukry proste nasiliłyby hiperinsulinizm i pogłębiły reaktywną hipoglikemię.' },
        ],
      },
      {
        prompt: 'Objawy hipoglikemii utrzymują się pomimo modyfikacji diety. Jaki lek doustny hamujący enzym rąbka szczoteczkowego można zastosować w farmakoterapii późnego dumpingu?',
        context: 'Lek opóźnia trawienie węglowodanów złożonych.',
        options: [
          { text: 'Akarboza (inhibitor alfa-glukozydazy)', explanation: 'Akarboza spowalnia trawienie disacharydów i wchłanianie glukozy, wygładzając krzywą insulinową.' },
          { text: 'Insulina glargine w dawce 50 j. rano', explanation: 'Podanie insuliny pogłębiłoby hipoglikemię i mogło doprowadzić do zgonu chorego.' },
        ],
      },
      {
        prompt: 'W diagnostyce różnicowej opornej hipoglikemii pooperacyjnej należy uwzględnić rzadki przerost komórek beta trzustki. Jak nazywa się to schorzenie?',
        context: 'Badanie histopatologiczne wykazuje rozrost wysp Langerhansa.',
        options: [
          { text: 'Nesidioblastoza (nieinsulinomowa hipoglikemia trzustkowa, NIPHS)', explanation: 'Nesidioblastoza to uogólniony przerost i dysfunkcja komórek beta trzustki indukowana przewlekłą stymulacją inkretynową po RYGB.' },
          { text: 'Choroba Addisona kory nadnerczy', explanation: 'Choroba Addisona to pierwotna niewydolność kory nadnerczy, nie przerost komórek beta trzustki.' },
        ],
      },
    ],
  },
  {
    id: 'case-otylosc-niedobory-po-bariatryczne',
    lessonId: 'otylosc-bariotria-powiklania-suplementacja',
    title: 'Niedokrwistość, ataksja i wypadanie włosów 2 lata po ominięciu żołądkowym',
    patient: 'Kobieta, 31 lat',
    difficulty: 'Zaawansowany',
    intro: 'Młoda pacjentka 2 lata po zabiegu RYGB (zredukowała masę ciała ze 112 kg do 68 kg) zgłasza się z powodu narastającej męczliwości, zaburzeń czucia w stopach (parestezji) i wypadania włosów.',
    steps: [
      {
        prompt: 'W morfologii: Hb 9,2 g/dl, MCV 72 fl, ferrytyna 6 ng/ml (norma 15–150), żelazo w surowicy 28 ug/dl. Jaka jest przyczyna tej postaci niedokrwistości?',
        context: 'Pacjentka miesiączkuje regularnie, nie przyjmuje zaleconych suplementów.',
        options: [
          { text: 'Niedokrwistość z niedoboru żelaza wywołana ominięciem dwunastnicy i początkowego jelita czczego oraz hipochlorhydrią w zbiorniku', explanation: 'Dwunastnica jest głównym miejscem wchłaniania żelaza; brak kwasu solnego uniemożliwia redukcję Fe3+ do przyswajalnego Fe2+.' },
          { text: 'Wrodzona sferocytoza uwarunkowana defektem spektryny', explanation: 'Sferocytoza jest wrodzoną anemią hemolityczną, a nie powikłaniem niedoborowym po operacji bariatrycznej.' },
        ],
      },
      {
        prompt: 'Pacjentka zgłasza ponadto parestezje palców stóp i zaburzenia czucia wibracji. Badanie neurologiczne wskazuje na ataksję tylnosznurową. Niedobór której witaminy należy pilnie potwierdzić i wyrównać?',
        context: 'Stężenie w surowicy < 100 pg/ml.',
        options: [
          { text: 'Witamina B12 (kobalamina)', explanation: 'Ominięcie komórek okładzinowych żołądka odcina syntezę czynnika Castlea (IF), blokując wchłanianie B12 i grożąc podostrym zwyrodnieniem rdzenia.' },
          { text: 'Witamina C (kwas askorbinowy)', explanation: 'Niedobór witaminy C wywołuje szkorbut i krwawienia dziąseł, nie izolowaną ataksję tylnosznurową.' },
        ],
      },
      {
        prompt: 'W badaniach biochemicznych: wapń całkowity 8,2 mg/dl, 25(OH)D 11 ng/ml, PTH 148 pg/ml (norma 15–65). Jaki proces metaboliczny toczy się w układzie kostnym?',
        context: 'Gęstość mineralna kości w DEXA: T-score szyjki kości udowej -2,6 (osteoporoza).',
        options: [
          { text: 'Wtórna nadczynność przytarczyc indukowana zespołem złego wchłaniania wapnia i witaminy D, prowadząca do osteomalacji i osteoporozy', explanation: 'Brak wapnia i witaminy D zmusza przytarczyce do nadprodukcji PTH, który wymywa wapń z kośćca.' },
          { text: 'Choroba Pageta kości z hiperkalcemią pierwotną', explanation: 'W chorobie Pageta PTH jest zazwyczaj w normie, a wapń prawidłowy.' },
        ],
      },
      {
        prompt: 'Jaki zestaw suplementów w dawkach leczniczych należy wdrożyć u tej pacjentki?',
        context: 'Planowanie dożywotniej opieki pooperacyjnej.',
        options: [
          { text: 'Cytrynian wapnia (1500 mg/d) z witaminą D3 (4000 IU/d), witamina B12 (1000 ug/d) oraz dożylne wlewy karboksymaltozy żelaza', explanation: 'Wobec zaburzeń wchłaniania w przewodzie pokarmowym głęboki niedobór żelaza po RYGB wymaga drogi parenteralnej.' },
          { text: 'Węglan wapnia w pojedynczej dawce raz w tygodniu i tabletki z witaminą K', explanation: 'Węglan wapnia nie wchłania się bez kwasu solnego, a dawka tygodniowa jest niewystarczająca.' },
        ],
      },
    ],
  },
  {
    id: 'case-otylosc-monogenowa-mc4r',
    lessonId: 'otylosc-genetyka-monogenowa',
    title: 'Wilczy apetyt i przyspieszone wzrastanie u 9-latka z mutacją MC4R',
    patient: 'Chłopiec, 9 lat',
    difficulty: 'Zaawansowany',
    intro: 'Chłopiec w wieku 9 lat z masą ciała 78 kg (BMI > 99 centyla, z-score +3,8) zostaje skierowany przez pediatrę z powodu niepohamowanego łaknienia (ciągłego poszukiwania jedzenia) od 2. roku życia.',
    steps: [
      {
        prompt: 'Lekarz zwraca uwagę, że chłopiec jest znacznie wyższy od rówieśników (wzrost na 97 centylu), a gęstość mineralna kości jest podwyższona. Jaka cecha odróżnia ten obraz od innych zespołów genetycznych?',
        context: 'W zespole Pradera-Williego występuje niskorosłość i wiotkość mięśniowa.',
        options: [
          { text: 'Przyspieszone wzrastanie liniowe przy braku dysmorfii twarzy i opóźnienia rozwoju umysłowego wskazuje na mutację receptora MC4R', explanation: 'Dzieci z mutacją MC4R wykazują wysoki wzrost w dzieciństwie i zwiększoną beztłuszczową masę ciała FFM.' },
          { text: 'Obraz jest patognomoniczny dla wrodzonej niedoczynności tarczycy', explanation: 'Wrodzona niedoczynność tarczycy prowadzi do karłowatości i upośledzenia umysłowego, a nie wysokiego wzrostu.' },
        ],
      },
      {
        prompt: 'W badaniu genetycznym potwierdzono heterozygotyczną mutację utraty funkcji genu MC4R. Jak dziedziczy się to schorzenie?',
        context: 'Ojciec chłopca również zmaga się z otyłością olbrzymią od młodości.',
        options: [
          { text: 'Autosomalnie dominująco z niepełną penetracją', explanation: 'Mutacje MC4R są najczęstszą monogenową przyczyną otyłości dziedziczącą się autosomalnie dominująco.' },
          { text: 'Sprzężone z chromosomem Y (dotyczy wyłącznie linii męskiej)', explanation: 'Gen MC4R leży na chromosomie 18q21, a nie na chromosomie Y.' },
        ],
      },
      {
        prompt: 'Dlaczego u tego chłopca stężenie leptyny w surowicy jest bardzo wysokie (65 ng/ml)?',
        context: 'Wynik badania hormonalnego krwi.',
        options: [
          { text: 'Ponieważ defekt leży poniżej receptora leptyny, a leptyna jest syntetyzowana proporcjonalnie do powiększonej masy tłuszczowej', explanation: 'Neurony POMC odbierają sygnał leptyny, ale brak sprawnego receptora MC4R w PVN uniemożliwia przekazanie sygnału sytości.' },
          { text: 'Chłopiec ma guza neuroendokrynnego wydzielającego leptynę (leptinoma)', explanation: 'Guzy wydzielające leptynę są kazuistyką, hiperleptynemia w otyłości odzwierciedla masę adipocytów.' },
        ],
      },
      {
        prompt: 'Jakie postępowanie terapeutyczne i behawioralne należy wdrożyć u tego pacjenta?',
        context: 'Zasady leczenia monogenowych defektów sytości.',
        options: [
          { text: 'Strukturyzacja środowiska domowego (kontrola dostępu do pożywienia), wsparcie psychodietetyczne oraz rozważenie analogów GLP-1', explanation: 'Choć setmelanotyd nie ma jeszcze powszechnej rejestracji w samej mutacji MC4R, analogi inkretyn wspomagają kontrolę łaknienia drogą alternatywnych szlaków.' },
          { text: 'Zastosowanie metotreksatu w wysokich dawkach immunosupresyjnych', explanation: 'Metotreksat jest lekiem cytostatycznym i przeciwreumatycznym, nie ma zastosowania w mutacji MC4R.' },
        ],
      },
    ],
  },
  {
    id: 'case-otylosc-zespol-pradera-williego',
    lessonId: 'otylosc-genetyka-monogenowa',
    title: 'Hipotonia noworodka i wilczy apetyt kilkulatka w zespole Pradera-Williego',
    patient: 'Chłopiec, 4 lata',
    difficulty: 'Zaawansowany',
    intro: 'Dziecko w wieku 4 lat z postępującą otyłością olbrzymią, niskorosłością i hipogonadyzmem. Matka podaje, że jako niemowlę chłopiec był wiotki i wymagał karmienia sondą, a od 2. roku życia zjada każdą ilość jedzenia.',
    steps: [
      {
        prompt: 'Jakie badanie genetyczne stanowi złoty standard potwierdzenia rozpoznania zespołu Pradera-Williego (PWS)?',
        context: 'W badaniu fizykalnym: wąskie czoło, migdałowate szpary powiekowe, małe dłonie i stopy (akromikria), wnętrostwo.',
        options: [
          { text: 'Test specyficznej metylacji DNA w regionie 15q11-q13 (MS-PCR)', explanation: 'Analiza metylacji wykrywa ponad 99% przypadków PWS wynikających z delecji ojcowskiej, disomii matczynej lub defektu imprintingu.' },
          { text: 'Standardowy kariotyp limfocytarny pod mikroskopem świetlnym', explanation: 'Kariotyp ma zbyt niską rozdzielczość, by uwidocznić submikroskopowe mikrodelecje 15q11-q13.' },
        ],
      },
      {
        prompt: 'Który hormon obwodowy stymulujący apetyt wykazuje paradoksalnie bardzo wysokie stężenia we krwi u dzieci z zespołem Pradera-Williego?',
        context: 'Stężenie peptydu na czczo jest 3–4 razy wyższe niż u rówieśników z pospolitą otyłością.',
        options: [
          { text: 'Grelina (hipergrelinemia)', explanation: 'W zespole PWS występuje autonomiczna, niehamowana poposiłkowo hipersekrecja greliny przez dno żołądka.' },
          { text: 'Adiponektyna', explanation: 'Adiponektyna nie stymuluje głodu; za napęd hiperfagiczny odpowiada grelina.' },
        ],
      },
      {
        prompt: 'Jakie leczenie hormonalne jest standardem opieki pediatrycznej w PWS i poprawia skład ciała oraz napięcie mięśniowe?',
        context: 'Wzrost chłopca znajduje się poniżej 3. centyla.',
        options: [
          { text: 'Rekombinowany ludzki hormon wzrostu (rhGH)', explanation: 'Terapia rhGH w PWS poprawia wzrost linearny, zwiększa masę mięśniową FFM i zmniejsza procentowy udział tkanki tłuszczowej.' },
          { text: 'Wysokie dawki deksametazonu', explanation: 'Glikokortykosteroidy nasiliłyby otyłość, zahamowały wzrost i wywołały jatrogenny zespół Cushinga.' },
        ],
      },
      {
        prompt: 'Przed rozpoczęciem terapii rhGH u dziecka z PWS bezwzględnie konieczne jest wykonanie badania w kierunku:',
        context: 'Bezpieczeństwo leczenia hormonem wzrostu.',
        options: [
          { text: 'Obturacyjnego bezdechu sennego (polisomnografii) oraz oceny przerostu migdałków', explanation: 'rhGH może przejściowo powiększyć tkankę limfatyczną gardła i nasilić bezdech senny, grożąc nagłym zgonem we śnie.' },
          { text: 'Gęstości mineralnej kości metodą densytometrii', explanation: 'Densytometria jest przydatna, ale wykluczenie ciężkiego OSAS stanowi bezwzględny warunek bezpieczeństwa rozpoczęcia rhGH.' },
        ],
      },
    ],
  },
  {
    id: 'case-otylosc-masld-wloknienie',
    lessonId: 'otylosc-masld-mash',
    title: 'Ocena wskaźnika FIB-4 i podejrzenie zwłóknienia wątroby w MASLD',
    patient: 'Mężczyzna, 52 lata',
    difficulty: 'Podstawowy',
    intro: 'Pracownik biurowy z otyłością brzuszną (obwód talii 108 cm, BMI 33,2 kg/m²) zgłasza się z rutynowymi badaniami okresowymi, w których stwierdzono podwyższone próby wątrobowe.',
    steps: [
      {
        prompt: 'Wyniki badań laboratoryjnych: AST 64 U/l, ALT 52 U/l, płytki krwi 145 tys./ul (145 * 10^9/l). Ile wynosi wskaźnik FIB-4 dla tego 52-letniego pacjenta?',
        context: 'Wzór: FIB-4 = [wiek * AST] / [PLT * pierwiastek(ALT)]. Pierwiastek z 52 wynosi ~7,21.',
        options: [
          { text: 'FIB-4 wynosi około 3,18 — kategoria wysokiego ryzyka zaawansowanego zwłóknienia (F3/F4)', explanation: 'Obliczenie: [52 * 64] / [145 * 7,21] = 3328 / 1045,45 = 3,18. Wynik > 2,67 oznacza wysokie prawdopodobieństwo zaawansowanego włóknienia.' },
          { text: 'FIB-4 wynosi 0,45 — brak jakiegokolwiek ryzyka', explanation: 'Błędne obliczenie; niski poziom płytek krwi i wysoki AST podwyższają wynik powyżej 2,67.' },
        ],
      },
      {
        prompt: 'Wskaźnik FIB-4 przekracza 2,67. Jakie nieinwazyjne badanie obrazowe stanowi złoty standard oceny sztywności miąższu wątroby w drugim etapie diagnostyki?',
        context: 'Pacjent nie wyraża zgody na inwazyjną biopsję gruboigłową wątroby.',
        options: [
          { text: 'Elastografia impulsowa wątroby (VCTE, FibroScan) z pomiarem sztywności w kilopaskalach (kPa) i parametru CAP', explanation: 'Elastografia impulsowa precyzyjnie mierzy sztywność tkanki (kPa) korelującą ze stopniem włóknienia oraz stłuszczenie (CAP).' },
          { text: 'Scyntygrafia kośćca z pirofosforanem technetu', explanation: 'Scyntygrafia kości ocenia metabolizm tkanki kostnej, nie bada sztywności wątroby.' },
        ],
      },
      {
        prompt: 'Elastografia wykazała sztywność wątroby 11,4 kPa (stadium włóknienia F2/F3). Jaki lek hipoglikemizujący wykazuje w badaniach klinicznych udowodnioną zdolność do wygaszania zapalenia MASH i redukcji stłuszczenia?',
        context: 'Pacjent ma stan przedcukrzycowy (HbA1c 6,2%).',
        options: [
          { text: 'Semaglutyd podskórny w dawce eskalowanej do 2,4 mg raz w tygodniu', explanation: 'Agoniści GLP-1 indukują rezolucję MASH bez nasilenia włóknienia u ponad połowy chorych dzięki redukcji lipotoksyczności.' },
          { text: 'Gliklazyd o zmodyfikowanym uwalnianiu', explanation: 'Pochodne sulfonylomocznika nie redukują stłuszczenia wątroby i mogą nasilać przyrost masy ciała.' },
        ],
      },
      {
        prompt: 'Jakie badania profilaktyczne w kierunku powikłań marskości należy wdrożyć, jeśli u chorego potwierdzone zostanie zaawansowane zwłóknienie F4 (marskość metaboliczna)?',
        context: 'Nadzór onkologiczny i naczyniowy.',
        options: [
          { text: 'Przesiewowe USG jamy brzusznej co 6 miesięcy (w kierunku raka wątrobowokomórkowego HCC) oraz gastroskopia w kierunku żylaków przełyku', explanation: 'U każdego chorego ze zwłóknieniem F3/F4 obowiązuje regularny nadzór nad powikłaniami nadciśnienia wrotnego i wczesne wykrywanie HCC.' },
          { text: 'Mammografia co 3 miesiące', explanation: 'Mammografia jest badaniem gruczołu piersiowego, nie bada powikłań wątrobowych.' },
        ],
      },
    ],
  },
];
