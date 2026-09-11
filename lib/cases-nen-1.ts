import type { NenCaseDraft } from './cases-nen-types.ts';

export const nenCasesPart1: NenCaseDraft[] = [
  {
    id: 'case-nen-biologia-markery',
    title: 'Zagadkowy rumieniec i wodniste biegunki',
    patient: 'Kobieta, 58 lat',
    difficulty: 'Podstawowy',
    intro: 'Pacjentka od roku skarży się na napadowe, kilkuminutowe zaczerwienienie twarzy i dekoltu (flushing) oraz 6–8 wodnistych wypróżnień dziennie.',
    steps: [
      {
        prompt: 'Napady zaczerwienienia twarzy nasilają się po wypiciu kieliszka wina. W USG jamy brzusznej uwidoczniono liczne zmiany ogniskowe w obu płatach wątroby. Jaka jest najbardziej prawdopodobna diagnoza?',
        context: 'Ciśnienie tętnicze podczas napadu 90/60 mmHg, tętno 100/min.',
        options: [
          { text: 'Zespół rakowiaka w przebiegu nowotworu neuroendokrynnego (NET) jelita cienkiego z przerzutami do wątroby', explanation: 'Klasyczna triada: flushing naczynioruchowy, biegunka sekrecyjna i przerzuty wątrobowe omijające krążenie wrotne.' },
          { text: 'Klasyczna choroba wrzodowa żołądka z perforacją', explanation: 'Perforacja daje ostry brzuch deskowaty i objawy otrzewnowe, a nie napadowy flushing twarzy.' },
        ],
      },
      {
        prompt: 'Który zestaw badań laboratoryjnych należy zlecić w pierwszej kolejności w celu potwierdzenia sekrecji serotoniny i masy guza?',
        context: 'Zalecono dietę eliminacyjną na 3 dni przed badaniem.',
        options: [
          { text: 'Kwas 5-hydroksyindolooctowy (5-HIAA) w dobowej zbiórce moczu oraz chromogranina A (CgA) w surowicy', explanation: '5-HIAA odzwierciedla dobowy obrót serotoniny, a CgA koreluje z całkowitym obciążeniem nowotworowym organizmu.' },
          { text: 'Przeciwciała przeciwko peroksydazie tarczycowej (anty-TPO) i gastryna', explanation: 'Anty-TPO diagnozuje chorobę Hashimoto, a nie zespół rakowiaka.' },
        ],
      },
      {
        prompt: 'W DZM stwierdzono stężenie 5-HIAA wynoszące 85 mg/24h (norma < 8). Jakie badanie izotopowe PET/CT stanowi złoty standard lokalizacji ogniska pierwotnego i stagingu?',
        context: 'Pacjentka nie przyjmuje inhibitorów pompy protonowej.',
        options: [
          { text: 'Pozytonowa tomografia emisyjna z galem-68: 68Ga-DOTATATE PET/CT', explanation: '68Ga-DOTATATE PET/CT cechuje się ponad 95% czułością w wykrywaniu receptorów SSTR2 na komórkach guza pierwotnego i przerzutów.' },
          { text: 'Scyntygrafia tarczycy z jodem-131', explanation: 'Jod-131 służy do diagnostyki i leczenia raka tarczycy, a nie nowotworów neuroendokrynnych jelita.' },
        ],
      },
      {
        prompt: 'Badanie 68Ga-PET potwierdziło guz jelita krętego o średnicy 2,5 cm i mnogie przerzuty wątrobowe SSTR2(+). Jakie leczenie farmakologiczne należy wdrożyć natychmiast?',
        context: 'Pacjentka jest osłabiona, wypróżnienia uniemożliwiają wyjście z domu.',
        options: [
          { text: 'Długodziałający analog somatostatyny (oktreotyd LAR lub lanreotyd autogel) podawany co 28 dni', explanation: 'Analogi somatostatyny (SSA) skutecznie hamują wyrzut serotoniny, eliminują flushing i biegunkę oraz wykazują działanie antyproliferacyjne.' },
          { text: 'Chemioterapia wielolekowa cisplatyną z bleomycyną', explanation: 'Toksyczna chemioterapia platynowa nie jest leczeniem pierwszego rzutu w dobrze zróżnicowanych rakowiakach jelita cienkiego (NET G1/G2).' },
        ],
      },
    ],
  },
  {
    id: 'case-nen-zespol-men1',
    title: 'Kamyki w nerkach, prolaktyna i oporne wrzody',
    patient: 'Mężczyzna, 34 lata',
    difficulty: 'Zaawansowany',
    intro: 'Młody mężczyzna przebył dwukrotnie epizod kolki nerkowej z wydaleniem złogu szczawianowo-wapniowego. Dodatkowo skarży się na spadek libido i bóle głowy.',
    steps: [
      {
        prompt: 'W badaniach laboratoryjnych: wapń całkowity 11,4 mg/dl, PTH 145 pg/ml (norma 15–65), prolaktyna 160 ng/ml. Jaki zespół genetyczny należy podejrzewać?',
        context: 'W wywiadzie rodzinnym: matka operowana z powodu wrzodu żołądka w wieku 38 lat.',
        options: [
          { text: 'Zespół mnogiej gruczolakowatości wewnątrzwydzielniczej typu 1 (MEN1, zespół Wermera)', explanation: 'Współistnienie pierwotnej nadczynności przytarczyc (PHPT) i gruczolaka przysadki (prolactinoma) u młodego chorego to klasyczne 2P z triady MEN1.' },
          { text: 'Zespół MEN2B z mutacją kodonu M918T', explanation: 'W MEN2B nie występuje nadczynność przytarczyc ani prolactinoma; obecny jest agresywny rak rdzeniasty i nerwiaki błon śluzowych.' },
        ],
      },
      {
        prompt: 'Pacjent zgłasza nasilające się pieczenie w nadbrzuszu i luźne stolce pomimo przyjmowania omeprazolu w dawce 40 mg. Jakie badanie wykluczy trzecią składową zespołu (trzustkową)?',
        context: 'W gastroskopii mnogie owrzodzenia opuszki i części zstępującej dwunastnicy.',
        options: [
          { text: 'Stężenie gastryny na czczo w surowicy po krótkim odstawieniu IPP oraz badanie EUS trzustki i dwunastnicy', explanation: 'Mnogie owrzodzenia i biegunka u chorych z MEN1 sugerują gastrinoma (zespół Zollingera-Ellisona), zlokalizowaną najczęściej w ścianie dwunastnicy.' },
          { text: 'Kolonoskopia z biopsją błony śluzowej kątnicy', explanation: 'Gastrinoma lokalizuje się w górnym odcinku przewodu pokarmowego (trójkąt Passaro), a nie w jelicie grubym.' },
        ],
      },
      {
        prompt: 'Gastryna wynosi 1400 pg/ml, pH żołądkowe < 1,8. USG szyi i scyntygrafia MIBI wykazują powiększenie 3 przytarczyc. Jaka jest optymalna strategia chirurgiczna przytarczyc?',
        context: 'Planowana jest operacja szyi.',
        options: [
          { text: 'Subtotalna paratyroidektomia (usunięcie 3,5 gruczołu) lub całkowite wycięcie z autotransplantacją fragmentu do mięśnia przedramienia', explanation: 'W MEN1 proces dotyczy wszystkich przytarczyc; wycięcie tylko jednego gruczołu skutkuje niemal 100% nawrotem hiperkalcemii.' },
          { text: 'Wycięcie wyłącznie jednej powiększonej przytarczycy prawej dolnej', explanation: 'W MEN1 usunięcie jednego gruczołu jest błędem w sztuce prowadzącym do szybkiego nawrotu.' },
        ],
      },
      {
        prompt: 'Jakie postępowanie diagnostyczne należy wdrożyć u 12-letniego syna pacjenta?',
        context: 'Chory wyraził zgodę na poradnictwo genetyczne.',
        options: [
          { text: 'Badanie genetyczne w kierunku mutacji w genie MEN1; w razie potwierdzenia nosicielstwa coroczny skrining wapnia i hormonów', explanation: 'Identyfikacja mutacji konstytucyjnej pozwala objąć dziecko prewencyjnym nadzorem biochemicznym i wdrożyć wczesne leczenie.' },
          { text: 'Profilaktyczna resekcja trzustki i przysadki w wieku 12 lat', explanation: 'W zespole MEN1 nie wykonuje się profilaktycznych operacji trzustki ani przysadki u bezobjawowych dzieci.' },
        ],
      },
    ],
  },
  {
    id: 'case-nen-zespol-men2',
    title: 'Guz szyi i skoki ciśnienia do 220/120',
    patient: 'Kobieta, 29 lat',
    difficulty: 'Zaawansowany',
    intro: 'Pacjentka została skierowana z powodu twardego, niebolesnego guzka prawego płata tarczycy o średnicy 22 mm. W wywiadzie napady drżenia rąk i potów ze skokami ciśnienia.',
    steps: [
      {
        prompt: 'W biopsji aspiracyjnej cienkoigłowej (BACC) stwierdzono raka rdzeniastego tarczycy (MTC). Stężenie kalcytoniny wynosi 850 pg/ml. Jaka jest kluczowa hipoteza genetyczna?',
        context: 'Brak wcześniejszych chorób tarczycy.',
        options: [
          { text: 'Zespół MEN2A (zespół Sipple\'a) wywołany mutacją aktywującą w protoonkogenie RET', explanation: 'Rak rdzeniasty tarczycy u młodej osoby z napadowym nadciśnieniem silnie przemawia za zespołem MEN2A z towarzyszącym guzem chromochłonnym.' },
          { text: 'Wole guzkowe toksyczne w chorobie Plummera', explanation: 'Wole toksyczne nie wykazuje komórek raka rdzeniastego i kalcytoniny na poziomie 850 pg/ml.' },
        ],
      },
      {
        prompt: 'Jakie badanie należy bezwzględnie wykonać PRZED skierowaniem pacjentki na operację tarczycy?',
        context: 'Ciśnienie w gabinecie 175/105 mmHg, tętno 108/min.',
        options: [
          { text: 'Dobowe wydalanie wolnych metanefryn i normetanefryn w DZM (lub wolne metanefryny w osoczu) oraz TK nadnerczy', explanation: 'Nierozpoznany guz chromochłonny (Pheo) poddany znieczuleniu ogólnemu grozi śmiertelnym przełomem nadciśnieniowym, udarem lub zatrzymaniem krążenia.' },
          { text: 'Test tolerancji glukozy (OGTT) z oznaczeniem peptydu C', explanation: 'OGTT nie ocenia ryzyka przełomu adrenergicznego w guzie chromochłonnym.' },
        ],
      },
      {
        prompt: 'Badania potwierdziły prawostronnego guza chromochłonnego o wymiarach 4 cm. W jakiej kolejności należy zaplanować zabiegi chirurgiczne?',
        context: 'Wdrożono wstępną blokadę alfa-adrenolityczną fenoksybenzaminą.',
        options: [
          { text: 'Najpierw laparoskopowe wycięcie guza chromochłonnego (adrenalektomia), a po wygojeniu i stabilizacji tyroidectomia', explanation: 'Złota zasada bezpieczeństwa w MEN2: usunięcie pheochromocytoma ZAWSZE poprzedza jakąkolwiek inną operację chirurgiczną.' },
          { text: 'Najpierw całkowita tyroidectomia z limfadenektomią szyjną, aby zapobiec przerzutom MTC', explanation: 'Jest to śmiertelnie niebezpieczny błąd w sztuce lekarskiej stwarzający ryzyko zgonu na stole operacyjnym.' },
        ],
      },
      {
        prompt: 'Badanie genetyczne wykazało mutację C634R w eksonie 11 protoonkogenu RET. Do której kategorii ryzyka wg ATA należy ta zmiana?',
        options: [
          { text: 'Kategoria wysokiego ryzyka (High Risk / ATA-H)', explanation: 'Mutacja kodonu 634 jest klasyczną mutacją MEN2A wysokiego ryzyka, wymagającą profilaktycznej tyroidectomii u nosicieli przed 5. rokiem życia.' },
          { text: 'Kategoria łagodna nienowotworowa', explanation: 'Mutacje RET w MEN2 są bezwzględnie onkogenne i złośliwe.' },
        ],
      },
    ],
  },
  {
    id: 'case-nen-zespol-men2b',
    lessonId: 'nen-zespol-men2',
    title: 'Nietypowe wargi niemowlęcia i marfanoidalny wygląd',
    patient: 'Chłopiec, 14 miesięcy',
    difficulty: 'Zaawansowany',
    intro: 'Dziecko zostało skonsultowane przez chirurga dziecięcego z powodu pogrubiałych, wywiniętych warg, guzkowatych zmian na języku oraz uporczywych zaparć od urodzenia.',
    steps: [
      {
        prompt: 'Pediatra zwraca uwagę na smukłą sylwetkę, długie kończyny, wiotkość stawów oraz mnogie nerwiakowłókniaki błon śluzowych warg. Jaka diagnoza nasuwa się natychmiast?',
        context: 'W USG szyi widoczny podejrzany hipoechogeniczny guzek w tarczycy z mikrozwapnieniami.',
        options: [
          { text: 'Zespół MEN2B (zespół Gorlina) wywołany mutacją RET M918T', explanation: 'Fenotyp marfanoidalny, zwojakonerwiaki błon śluzowych i wczesny rak rdzeniasty tarczycy u niemowlęcia to patognomoniczny obraz MEN2B.' },
          { text: 'Zespół Marfana z mutacją genu fibryliny FBN1', explanation: 'Zespół Marfana nie wywołuje nerwiakowłókniaków błon śluzowych warg ani wczesnego raka tarczycy.' },
        ],
      },
      {
        prompt: 'Stężenie kalcytoniny w surowicy wynosi 1200 pg/ml. Jakie postępowanie terapeutyczne w odniesieniu do tarczycy należy wdrożyć w trybie pilnym?',
        context: 'Wykluczono guz chromochłonny.',
        options: [
          { text: 'Całkowita tyroidectomia z centralną limfadenektomią szyjną w trybie pilnym', explanation: 'W zespole MEN2B rak rdzeniasty rozwija się już w pierwszych miesiącach życia i cechuje się skrajną złośliwością (kategoria ATA Highest Risk).' },
          { text: 'Obserwacja ultrasonograficzna i odroczenie operacji do 18. roku życia', explanation: 'Odroczenie operacji w MEN2B jest wyrokiem śmierci z powodu wczesnych przerzutów MTC do kości, płuc i wątroby.' },
        ],
      },
      {
        prompt: 'Czy u tego pacjenta należy obawiać się rozwoju pierwotnej nadczynności przytarczyc w przyszłości?',
        context: 'Wapń całkowity 9,6 mg/dl, PTH 28 pg/ml.',
        options: [
          { text: 'Nie, w zespole MEN2B pierwotna nadczynność przytarczyc praktycznie nigdy nie występuje (0% chorych)', explanation: 'W odróżnieniu od MEN2A (gdzie PHPT występuje u 20–30%), w zespole MEN2B nadczynność przytarczyc nie wchodzi w skład fenotypu.' },
          { text: 'Tak, u 100% chorych z MEN2B rozwija się przełom hiperkalcemiczny przed 5. rokiem życia', explanation: 'Jest to nieprawda; przytarczyce w MEN2B są nienaruszone.' },
        ],
      },
      {
        prompt: 'Chłopiec ma 12 lat. Od 2 miesięcy zgłasza kołatania serca i bóle głowy. Jakie badanie przesiewowe należy natychmiast wykonać?',
        context: 'Ciśnienie tętnicze 150/95 mmHg.',
        options: [
          { text: 'Oznaczenie wolnych metanefryn w osoczu i MR jamy brzusznej pod kątem obustronnego guza chromochłonnego', explanation: 'U około 50% chorych z MEN2B rozwija się guz chromochłonny nadnerczy, wymagający regularnego corocznego monitorowania od dzieciństwa.' },
          { text: 'Badanie kału na krew utajoną', explanation: 'Objawy sugerują hipersekrecję amin katecholowych, a nie krwawienie z dolnego odcinka przewodu pokarmowego.' },
        ],
      },
    ],
  },
  {
    id: 'case-nen-insulinoma',
    title: 'Poranne omdlenia i cudowne działanie batona',
    patient: 'Mężczyzna, 42 lata',
    difficulty: 'Podstawowy',
    intro: 'Kierowca zawodowy od 6 miesięcy doznaje epizodów zlewnego potu, drżenia rąk, dezorientacji i podwójnego widzenia w godzinach porannych przed śniadaniem.',
    steps: [
      {
        prompt: 'Podczas ostatniego epizodu wezwany zespół ratownictwa medycznego zmierzył glikemię: 36 mg/dl (2,0 mmol/l). Po dożylnym podaniu 20% glukozy objawy ustąpiły natychmiast. Co to za zjawisko?',
        context: 'Chory przybrał w ciągu roku 9 kg, gdyż podjada słodycze, by nie dopuścić do ataków.',
        options: [
          { text: 'Spełniona triada Whipple\'a świadcząca o organicznej hipoglikemii', explanation: 'Objawy neuroglikopenii + udokumentowana glikemia < 55 mg/dl + ustąpienie po podaniu węglowodanów tworzą triadę Whipple\'a.' },
          { text: 'Napad padaczkowy typu grand mal niezwiązany z metabolizmem', explanation: 'Natychmiastowe ustąpienie zaburzeń po podaniu glukozy wyklucza pierwotną padaczkę.' },
        ],
      },
      {
        prompt: 'Pacjent został przyjęty do kliniki endokrynologii. Jakie badanie jest złotym standardem potwierdzenia autonomicznego wydzielania insuliny?',
        context: 'Wykluczono przyjmowanie jakichkolwiek leków hipoglikemizujących.',
        options: [
          { text: 'Szpitalna 72-godzinna próba głodowa z monitorowaniem glikemii i pobraniem krytycznej próbki krwi', explanation: 'Próba głodowa weryfikuje brak fizjologicznej supresji insuliny i peptydu C podczas spadku stężenia glukozy.' },
          { text: 'Doustny test tolerancji glukozy (OGTT) z 75 g glukozy', explanation: 'OGTT diagnozuje cukrzycę i reaktywną hipoglikemię, nie nadaje się do potwierdzania guza insulinoma.' },
        ],
      },
      {
        prompt: 'W 14. godzinie próby glikemia spadła do 41 mg/dl. Pobrano krew: insulina 18 µU/ml (norma < 3), peptyd C 2,4 ng/ml (norma < 0,6), beta-hydroksymaślan 0,8 mmol/l. Jakie jest rozpoznanie?',
        context: 'Toksykologia moczu i osocza na pochodne sulfonylomocznika ujemna.',
        options: [
          { text: 'Endogenna hiperinsulinemiczna hipoglikemia w przebiegu guza insulinoma', explanation: 'Równoczesny brak supresji insuliny i peptydu C przy glikemii < 55 mg/dl oraz brak ketonemii dowodzi autonomicznego guza komórek beta trzustki.' },
          { text: 'Jatrogenne wstrzyknięcie egzogennej insuliny', explanation: 'Egzogenna insulina nie zawiera peptydu C — stężenie peptydu C byłoby wtedy niewykrywalne (<0,1 ng/ml).' },
        ],
      },
      {
        prompt: 'W badaniu EUS uwidoczniono pojedynczy, dobrze odgraniczony guzek trzonu trzustki o średnicy 14 mm. Jakie jest postępowanie z wyboru?',
        context: 'Brak cech złośliwości i powiększonych węzłów.',
        options: [
          { text: 'Laparoskopowa enukleacja guza trzustki (lub resekcja oszczędzająca miąższ)', explanation: 'Ponad 90% insulinoma to pojedyncze, łagodne gruczolaki; enukleacja prowadzi do 100% trwałego wyleczenia pacjenta.' },
          { text: 'Pankreatoduodenektomia metodą Whipple\'a z usunięciem żołądka', explanation: 'Klasyczny zabieg Whipple\'a jest zbyt okaleczający dla małego, łagodnego guzka trzonu trzustki.' },
        ],
      },
    ],
  },
  {
    id: 'case-nen-glukagonoma',
    title: 'Wędrujące pęcherze na skórze i ubytek 15 kg masy ciała',
    patient: 'Kobieta, 62 lata',
    difficulty: 'Zaawansowany',
    intro: 'Kobieta od 8 miesięcy leczy się u dermatologów z powodu bolesnych, nadżerkowych wykwitów w pachwinach i na pośladkach. Dodatkowo schudła 15 kg i rozpoznano u niej łagodną cukrzycę.',
    steps: [
      {
        prompt: 'W badaniu fizykalnym widoczne są wędrujące zmiany rumieniowo-pęcherzowe z martwicą naskórka i tworzeniem strupów w fałdach skórnych. Jak nazywa się ta patognomoniczna dermatoza?',
        context: 'Stężenie hemoglobiny 9,8 g/dl, albuminy 28 g/l (hipoalbuminemia).',
        options: [
          { text: 'Rumień wędrujący nekrolityczny (necrolytic migratory erythema, NME)', explanation: 'NME jest objawem paraneoplastycznym typowym dla guza komórek alfa trzustki — glukagonoma.' },
          { text: 'Rumień wędrujący w przebiegu boreliozy z Lyme', explanation: 'Rumień w boreliozie to pojedyncza, powiększająca się tarczka po ukąszeniu kleszcza, bez martwicy i pęcherzy.' },
        ],
      },
      {
        prompt: 'Jakie badanie hormonalne należy pilnie oznaczyć w surowicy?',
        context: 'Glikemia na czczo 145 mg/dl.',
        options: [
          { text: 'Stężenie glukagonu na czczo w osoczu', explanation: 'Wartość glukagonu przekraczająca 500–1000 pg/ml potwierdza rozpoznanie zespołu glukagonoma.' },
          { text: 'Stężenie tyreoglobuliny i kalcytoniny', explanation: 'Markery te oceniają tarczycę, nie mają związku z rumieniem NME.' },
        ],
      },
      {
        prompt: 'Glukagon wynosi 1850 pg/ml. W TK jamy brzusznej widoczny guz ogona trzustki 5 cm i 2 ogniska w wątrobie. Na jakie powikłanie należy wdrożyć natychmiastową profilaktykę?',
        context: 'Pacjentka leży w łóżku z powodu bólu skóry.',
        options: [
          { text: 'Profilaktykę przeciwkrzepliwą heparyną drobnocząsteczkową (HDCz) z uwagi na wysokie ryzyko zakrzepicy żylnej', explanation: 'Glukagonoma wywołuje ciężki stan nadkrzepliwości; zatorowość płucna występuje u 30–50% chorych i jest częstą przyczyną nagłego zgonu.' },
          { text: 'Profilaktykę przeciwtężcową', explanation: 'Brak ran zanieczyszczonych ziemią, profilaktyka przeciwtężcowa nie zapobiega zatorowości.' },
        ],
      },
      {
        prompt: 'Jaki lek podany podskórnie wywoła spektakularne cofnięcie się zmian skórnych NME w ciągu 48–72 godzin?',
        context: 'Konieczne jest szybkie złagodzenie bólu i stanu zapalnego.',
        options: [
          { text: 'Długodziałający analog somatostatyny (oktreotyd / lanreotyd)', explanation: 'Analogi somatostatyny blokują sekrecję glukagonu, normalizują metabolizm aminokwasów i przynoszą natychmiastową remisję NME.' },
          { text: 'Wysokie dawki glikokortykosteroidów doustnie', explanation: 'Steroidy nasiliłyby katabolizm białkowy i drastycznie pogorszyły cukrzycę.' },
        ],
      },
    ],
  },
  {
    id: 'case-nen-vipoma-rzadkie',
    title: 'Cholera trzustkowa i potas 1,8 mmol/l',
    patient: 'Kobieta, 49 lat',
    difficulty: 'Zaawansowany',
    intro: 'Pacjentka została przyjęta na OIT w stanie ciężkiego odwodnienia i splątania z powodu trwającej od 3 tygodni bezwodnej, obfitej biegunki (do 5 litrów wodnistego stolca na dobę).',
    steps: [
      {
        prompt: 'W badaniach: sód 130 mmol/l, potas 1,8 mmol/l, wodorowęglany 11 mmol/l, pH krwi 7,18, kreatynina 2,6 mg/dl. Jak nazywa się ten zespół kliniczny?',
        context: 'Biegunka nie ustępuje mimo całkowitego powstrzymywania się od jedzenia.',
        options: [
          { text: 'Zespół Vernera-Morrisona (zespół WDHA / cholera trzustkowa) wywołany przez guz VIPoma', explanation: 'Watery Diarrhea, Hypokalemia, Achlorhydria (WDHA) to klasyczny zespół wywołany autonomiczną sekrecją wazoaktywnego peptydu jelitowego.' },
          { text: 'Rzekomobłoniaste zapalenie jelit wywołane przez Clostridioides difficile', explanation: 'Nie daje tak gigantycznej utraty wody (5 l/d) i hipokaliemii 1,8 mmol/l bez wcześniejszej antybiotykoterapii.' },
        ],
      },
      {
        prompt: 'Jakie działania resuscytacyjne należy wdrożyć w pierwszej kolejności?',
        context: 'W EKG widoczne cechy hipokaliemii: spłaszczenie załamków T i wydatne fale U.',
        options: [
          { text: 'Agresywna dożylna płynoterapia krystaloidowa, wlew chlorku potasu (KCl) z osłoną kardiomonitora oraz dożylny oktreotyd', explanation: 'Uzupełnienie potasu i płynów zapobiega zatrzymaniu krążenia w mechanizmie migotania komór, a oktreotyd natychmiast hamuje sekrecję VIP.' },
          { text: 'Podanie doustnego węgla aktywowanego i loperamidu w wysokiej dawce', explanation: 'Środki doustne są całkowicie nieskuteczne w masywnej biegunce sekrecyjnej VIPoma i nie leczą zaburzeń elektrolitowych.' },
        ],
      },
      {
        prompt: 'Stężenie peptydu VIP w surowicy wynosi 650 pg/ml (norma < 75). Badanie TK wykazuje guz ogona trzustki o średnicy 4 cm. Jaki podtyp komórek trzustki uległ transformacji?',
        context: 'Stan chorej ustabilizował się po włączeniu oktreotydu.',
        options: [
          { text: 'Komórki D1 wysepek trzustkowych wytwarzające VIP', explanation: 'Guz VIPoma wywodzi się z nie-beta komórek D1 wysp Langerhansa.' },
          { text: 'Komórki pęcherzykowe wydzielające trypsynę', explanation: 'Komórki pęcherzykowe tworzą gruczolakoraki zewnątrzwydzielnicze, nie guzy neuroendokrynne.' },
        ],
      },
      {
        prompt: 'Po ustabilizowaniu elektrolitów i nawodnieniu pacjentkę zakwalifikowano do leczenia operacyjnego. Jaki zabieg jest leczeniem z wyboru przy braku przerzutów?',
        context: 'Badanie 68Ga-DOTATATE PET nie wykazało ognisk odległych.',
        options: [
          { text: 'Dystalna pankreatektomia ze splenektomią z zachowaniem marginesów onkologicznych', explanation: 'Resekcja ogona trzustki z guzem prowadzi do całkowitego wyleczenia zespołu hormonalnego.' },
          { text: 'Przeszczepienie allogeniczne wysp trzustkowych', explanation: 'Przeszczep wysp stosuje się w chwiejnej cukrzycy typu 1, nie w nowotworach złośliwych.' },
        ],
      },
    ],
  },
  {
    id: 'case-nen-serce-rakowiaka',
    title: 'Duszność, obrzęki podudzi i szmer nad sercem u chorego z midgut NET',
    patient: 'Mężczyzna, 66 lat',
    difficulty: 'Podstawowy',
    intro: 'Chory od 4 lat leczony z powodu rakowiaka jelita krętego z przerzutami do wątroby zgłasza narastające od 3 miesięcy obrzęki kończyn dolnych, powiększenie obwodu brzucha i duszność wysiłkową.',
    steps: [
      {
        prompt: 'W badaniu: cechy zastoju w krążeniu wrotnym, tętnienie żył szyjnych oraz szmer skurczowy nad dolnym brzegiem mostka głośniejszy na wdechu (objaw Carvallo). Co należy podejrzewać?',
        context: 'Stężenie 5-HIAA w DZM z ostatnich badań: 120 mg/24h.',
        options: [
          { text: 'Kardiomiopatię rakowiakową (zespół Hedingera / carcinoid heart disease) z niedomykalnością zastawki trójdzielnej', explanation: 'Objaw Carvallo wskazuje na niedomykalność trójdzielną wywołaną włóknieniem wsierdzia prawej połowy serca pod wpływem serotoniny.' },
          { text: 'Ostre zapalenie osierdzia z tamponadą', explanation: 'Tamponada daje tętno paradoksalne i ciche tony serca bez typowego szmeru niedomykalności trójdzielnej.' },
        ],
      },
      {
        prompt: 'Który biomarker laboratoryjny z krwi charakteryzuje się najwyższą wartością predykcyjną w diagnostyce zespołu Hedingera?',
        context: 'Pobrano rutynowy panel laboratoryjny.',
        options: [
          { text: 'N-końcowy fragment propeptydu natriuretycznego typu B (NT-proBNP)', explanation: 'Wartość NT-proBNP > 260 pg/ml cechuje się ponad 90% czułością w wykrywaniu dysfunkcji prawej komory w sercu rakowiaka.' },
          { text: 'Kinaza kreatynowa (CK-MB)', explanation: 'CK-MB wzrasta w ostrym martwiczym zespole wieńcowym, a nie w przewlekłym włóknieniu wsierdzia.' },
        ],
      },
      {
        prompt: 'W echokardiografii (TTE) stwierdzono zgrubienie, retrakcję i unieruchomienie płatków zastawki trójdzielnej z ciężką falą zwrotną. Dlaczego zmiany nie obejmują zastawki mitralnej?',
        context: 'Lewa komora serca ma prawidłowe wymiary i funkcję skurczową.',
        options: [
          { text: 'Krew przepływająca przez naczynia płucne ulega oczyszczeniu z serotoniny przez śródbłonkową monoaminooksydazę A (MAO-A)', explanation: 'Płuca stanowią metaboliczny filtr dezaktywujący serotoninę, chroniąc lewą połowę serca przed uszkodzeniem.' },
          { text: 'Zastawka mitralna jest zbudowana z tkanki kostnej niewrażliwej na serotoninę', explanation: 'Zastawki serca są strukturami łącznotkankowymi, nie kostnymi.' },
        ],
      },
      {
        prompt: 'Chory ma objawy prawokomorowej niewydolności serca w klasie NYHA III mimo leczenia diuretykami. Jakie postępowanie kardiochirurgiczne jest leczeniem z wyboru?',
        context: 'Chory przyjmuje oktreotyd LAR 30 mg co 4 tygodnie.',
        options: [
          { text: 'Chirurgiczna wymiana zastawki trójdzielnej na bioprotezę pod osłoną ciągłego wlewu dożylnego oktreotydu', explanation: 'Wymiana zastawki przywraca wydolność krążenia; wlew oktreotydu chroni przed śmiertelnym przełomem rakowiaka podczas krążenia pozaustrojowego.' },
          { text: 'Przeszczepienie serca i płuc bez wcześniejszego leczenia farmakologicznego', explanation: 'Wymiana pojedynczej zastawki jest zabiegiem wystarczającym i o nieporównywalnie niższym ryzyku.' },
        ],
      },
    ],
  },
];
