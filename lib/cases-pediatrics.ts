import type { ClinicalCase } from './cases.ts';

type Choice = [string, string];
type StepDraft = [string, string, Choice, Choice];

const step = (context: string, prompt: string, correct: Choice, wrong: Choice): StepDraft => [context, prompt, correct, wrong];

const make = (
  lessonId: string,
  title: string,
  patient: string,
  difficulty: ClinicalCase['difficulty'],
  intro: string,
  steps: StepDraft[]
): ClinicalCase => ({
  id: `case-${lessonId}`,
  lessonId,
  title,
  patient,
  difficulty,
  intro,
  steps: steps.map(([context, prompt, correct, wrong], i) => ({
    id: `case-${lessonId}-${i + 1}`,
    lessonId,
    stage: ['Objawy', 'Badania', 'Rozpoznanie', 'Postępowanie'][i],
    context,
    prompt,
    answer: i % 2,
    options: (i % 2 ? [wrong, correct] : [correct, wrong]).map(([text, explanation]) => ({
      text,
      explanation,
    })),
  })),
});

export const pediatricCases: ClinicalCase[] = [
  make(
    'ped-niedobor-gh',
    'Chłopiec, który przestał rosnąć',
    'Chłopiec, 7 lat',
    'Podstawowy',
    'Rodzice 7-latka zgłaszają, że od dwóch lat nie zmienia rozmiaru ubrań ani obuwia. Koledzy w klasie są o głowę wyżsi.',
    [
      step(
        'Wzrost 108 cm (-2,8 SDS), masa ciała 18 kg (-1,8 SDS). Tempo wzrastania z ostatnich 12 miesięcy wynosi zaledwie 3,2 cm/rok. Wzrost ojca 178 cm, matki 165 cm (target height 178 cm, ok. +0,2 SDS). Dziecko ma młodzieńczą, lalkowatą twarz i nieco nadmierną tkankę tłuszczową na brzuchu.',
        'Jaki jest pierwszy wniosek z analizy auksologicznej?',
        ['Wyraźna patologiczna niskorosłość z załamaniem tempa wzrostu poniżej potencjału genetycznego', 'Tempo <4 cm/rok i odchylenie od target height o 3 SDS wykluczają niski wzrost rodzinny.'],
        ['Wariant prawidłowego rozwoju rodzinnego bez wskazań do diagnostyki', 'Target height rodziców jest wysoki; załamanie tempa dowodzi procesu chorobowego.']
      ),
      step(
        'Wykluczono celiakię (anty-tTG IgA w normie), niedokrwistość i niewydolność nerek. TSH 2,1 mIU/l, FT4 16 pmol/l. RTG dłoni: wiek kostny oceniono na 4,5 roku (opóźnienie o 2,5 roku). IGF-1 wynosi 32 ng/ml (dolna granica normy: 85 ng/ml).',
        'Jakie badania dynamiczne należy zaplanować w dalszej kolejności?',
        ['Dwa niezależne testy stymulacji wydzielania GH (np. z klonidyną i argininą)', 'Pojedynczy pomiar GH jest bezużyteczny; potwierdzenie GHD wymaga wykazania braku rezerwy przysadkowej w dwóch testach.'],
        ['Doustny test obciążenia glukozą z oceną supresji GH', 'Test z glukozą służy do diagnostyki akromegalii/gigantyzmu, nie niskorosłości.']
      ),
      step(
        'W teście z klonidyną szczyt GH wyniósł 4,2 ng/ml, a w teście z argininą 5,1 ng/ml (oba <10 ng/ml). W wykonanym badaniu MRI przysadki stwierdzono hipoplazję przedniego płata z prawidłową szypułą i neuroprzysadką, bez cech guza nadsiodłowego.',
        'Jakie jest ostateczne rozpoznanie?',
        ['Izolowana somatotropinowa niedoczynność przysadki (GHD)', 'Kryteria auksologiczne, opóźniony wiek kostny, niski IGF-1 i brak wyrzutu GH w 2 testach potwierdzają GHD.'],
        ['Konstytucjonalne opóźnienie wzrastania i dojrzewania (CDGP)', 'W CDGP szczyt GH po torowaniu przekracza 10 ng/ml, a tempo wzrostu nie spada do 3 cm/rok.']
      ),
      step(
        'Dziecko kwalifikuje się do leczenia rekombinowanym ludzkim hormonem wzrostu (rhGH) w ramach programu lekowego.',
        'Jak zaplanować terapię i monitorowanie bezpieczeństwa?',
        ['Rozpocząć rhGH podskórnie codziennie wieczorem (0,025–0,035 mg/kg/d) i monitorować stężenie IGF-1 oraz wiek kostny', 'Celem jest przywrócenie tempa wzrastania (catch-up growth) przy utrzymaniu IGF-1 w bezpiecznym przedziale 0 do +2 SDS.'],
        ['Podać jednorazowy bolus domięśniowy testosteronu i zakończyć diagnostykę', 'U 7-latka testosteron doprowadziłby do niepożądanej wirylizacji i zarośnięcia chrząstek nasadowych.']
      ),
    ]
  ),
  make(
    'ped-przedwczesne-pokwitanie-cpp',
    'Niespodziewany skok rozwojowy sześciolatki',
    'Dziewczynka, 6,5 roku',
    'Zaawansowany',
    'Matka 6,5-letniej dziewczynki zauważyła powiększenie obu gruczołów piersiowych oraz gwałtowne przyspieszenie tempa wzrostu w ciągu ostatnich 6 miesięcy.',
    [
      step(
        'Wzrost 128 cm (+2,2 SDS). Tempo wzrastania wynosi 10,5 cm/rok. W badaniu przedmiotowym: thelarche stadium III wg Tannera, obecne delikatne owłosienie łonowe (pubarche II). Narządy płciowe zewnętrzne wykazują cechy estrogenizacji (bladoróżowa śluzówka przedsionka pochwy).',
        'Co w obrazie klinicznym nakazuje pilną diagnostykę różnicową?',
        ['Pojawienie się cech pokwitania przed 8. r.ż. z przyspieszeniem tempa wzrostu dowodzi rzeczywistego przedwczesnego dojrzewania', 'Nie jest to łagodne izolowane thelarche, gdyż towarzyszy mu skok wzrostowy i estrogenizacja tkanek.'],
        ['Jest to fizjologiczny wariant wcześniejszego dojrzewania niewymagający badań', 'Objawy thelarche III przed ukończeniem 7 lat są zawsze patologiczne i grożą niskorosłością.']
      ),
      step(
        'Wiek kostny wynosi 9 lat (przyspieszenie o 2,5 roku względem wieku metrykalnego). W USG miednicy mniejszej: trzon macicy o wymiarach 42 mm z widoczną linijną echogennością endometrium, oba jajniki o objętości >2,5 ml z drobnymi pęcherzykami. Stężenie estradiolu: 28 pg/ml.',
        'Jakie badanie hormonalne rozstrzyga o postaci centralnej (GnRH-zależnej) vs obwodowej?',
        ['Test stymulacji analogiem GnRH (ocena szczytu LH i FSH)', 'Szczyt LH >5 IU/l potwierdza aktywację osi podwzgórze–przysadka (CPP).'],
        ['Oznaczenie stężenia PTH i kalcytoniny', 'Hormony regulujące wapń nie mają związku z osią gonadotropową.']
      ),
      step(
        'W teście z analogiem GnRH podstawowe LH wynosiło 0,8 IU/l, a w 30. minucie szczyt LH wzrósł do 14,2 IU/l (LH/FSH > 1). W badaniu MRI mózgowia uwidoczniono szypułę podwzgórza o prawidłowej strukturze oraz okrągłą, izointensywną zmianę w dnie komory III o średnicy 8 mm, nieulegającą wzmocnieniu kontrastowemu.',
        'Jakie jest rozpoznanie i podłoże organiczne?',
        ['Przedwczesne dojrzewanie płciowe centralne (CPP) w przebiegu hamartoma podwzgórza', 'Hamartoma podwzgórza to łagodna anomalia działająca jak ektopowy pulsator GnRH.'],
        ['Obwodowe przedwczesne dojrzewanie z guza kory nadnerczy', 'Wysoki wyrzut LH w teście z GnRH wyklucza postać obwodową.']
      ),
      step(
        'Dziewczynka jest zagrożona przedwczesnym zarośnięciem nasad kości i utratą co najmniej 12–15 cm wzrostu docelowego.',
        'Jakie jest postępowanie z wyboru?',
        ['Leczenie długodziałającym analogiem GnRH w iniekcjach depot (np. tryptorelina co 4–12 tygodni)', 'Ciągła ekspozycja receptora GnRH-R wywołuje jego desensytyzację, cofa objawy pokwitania i normalizuje tempo dojrzewania kośćca.'],
        ['Pilna operacja neurochirurgiczna kraniotomii i resekcji guza', 'Hamartoma podwzgórza jest nienowotworową zmianą wrodzoną; operacja niesie ogromne ryzyko powikłań, leczeniem jest farmakoterapia GnRHa.']
      ),
    ]
  ),
  make(
    'ped-wpn-noworodek-przelom',
    'Noworodek w stanie nagłego wstrząsu',
    'Noworodek płci męskiej, 14. doba życia',
    'Zaawansowany',
    'Dwuetapowy noworodek urodzony o czasie, wypisany do domu w 3. dobie. Od dwóch dni niechętnie ssie, ulewa, a dziś wystąpiły chlustające wymioty i postępująca apatia.',
    [
      step(
        'Noworodek wiotki, szary, podsypiający. Tętno 185/min, ciśnienie tętnicze 55/30 mmHg, nawrót kapilarny 4 sekundy. Zapadnięte ciemiączko, suchość błon śluzowych. Narządy płciowe: prącie prawidłowej budowy, oba jądra w mosznie, widoczne wzmożone brunatne zabarwienie skóry moszny i otoczek brodawek.',
        'Co jest najbardziej niebezpieczną pułapką diagnostyczną w tej fazie?',
        ['Rozpoznanie zwężenia odźwiernika lub sepsy bez oznaczenia elektrolitów i glikemii', 'Prawidłowe męskie narządy płciowe usypiają czujność; noworodek umiera w przełomie solnym.'],
        ['Podejrzenie wady serca i zaniechanie poszukiwania przyczyn brzusznych', 'Ocena układu krążenia jest ważna, ale nie wyjaśnia hiperpigmentacji i odwodnienia.']
      ),
      step(
        'Gazometria krwi: pH 7,18, HCO3- 11 mmol/l (kwasica metaboliczna). Jonogram: Na+ 116 mmol/l (skrajna hiponatremia), K+ 8,1 mmol/l (ciężka hiperkaliemia zagrażająca asystolią), glikemia 42 mg/dl (hipoglikemia).',
        'O czym świadczy skojarzenie głębokiej hiponatremii, hiperkaliemii i hipoglikemii?',
        ['O ostrej pierwotnej niewydolności kory nadnerczy (niedobór aldosteronu i kortyzolu)', 'Brak aldosteronu powoduje utratę sodu i retencję potasu; brak kortyzolu odpowiada za hipoglikemię i wstrząs.'],
        ['O moczówce prostej ośrodkowej', 'W moczówce prostej dochodzi do utraty czystej wody i skrajnej hipernatremii, a nie hiponatremii.'],
      ),
      step(
        'W EKG widoczne wysokie, wąskie, symetryczne załamki T (efekt hiperkaliemii). Stężenie 17-hydroksyprogesteronu (17-OHP) wynosi >120 ng/ml (norma <2 ng/ml).',
        'Jakie jest rozpoznanie?',
        ['Klasyczna postać wrodzonego przerostu nadnerczy z utratą soli (niedobór 21-hydroksylazy)', 'Masywny wzrost 17-OHP z hiponatremią i hiperkaliemią jednoznacznie potwierdza zablokowanie genu CYP21A2.'],
        ['Wrodzony przerost odźwiernika', 'Zwężenie odźwiernika wywołuje zasadowicę hipochloremiczną z hipokaliemią, a nie hiperkaliemię i kwasicę.'],
      ),
      step(
        'Noworodek wymaga natychmiastowych działań resuscytacyjnych na oddziale intensywnej terapii.',
        'Jaki jest właściwy schemat leczenia ratunkowego w pierwszej dobie?',
        ['Wlew 0,9% NaCl z 5% glukozą dożylnie, hydrokortyzon i.v. w bolusie (25–50 mg) i ochrona serca (glukonian wapnia i.v.)', 'Płynoterapia uzupełnia objętość naczyniową, glukoza leczy hipoglikemię, a hydrokortyzon zastępuje kortyzol.'],
        ['Wlew czystego płynu 5% glukozy bez elektrolitów i podanie potasu i.v.', 'Podanie płynu bezelektrolitowego nasiliłoby hiponatremię i doprowadziło do obrzęku mózgu, a potas do zatrzymania krążenia.'],
      ),
    ]
  ),
  make(
    'ped-krzywica-zaburzenia-fosforanowe',
    'Krzywica, która nie reaguje na witaminę D',
    'Chłopiec, 22 miesiące',
    'Podstawowy',
    'Chłopiec zaczął chodzić w 14. miesiącu życia. Rodzice zauważyli postępujące wygięcie nóżek w łuk (szpotawość podudzi) oraz kołyszący chód.',
    [
      step(
        'Wzrost poniżej 3. centyla (-2,3 SDS). W badaniu fizykalnym: wyraźna szpotawość obu kończyn dolnych (odstęp międzykłykciowy 6 cm), pogrubienie nasad kości promieniowych (bransolety krzywicze). Chłopiec otrzymywał profilaktycznie 600–800 j.m. witaminy D3 dziennie od urodzenia.',
        'Co należy ocenić w diagnostyce laboratoryjnej w pierwszym kroku?',
        ['Wapń, fosforany, fosfatazę alkaliczną (ALP), PTH oraz 25-OH-D w surowicy', 'Pakiet ten pozwala odróżnić krzywicę z niedoboru witaminy D od krzywic fosfatenicznych i nerkowych.'],
        ['Kwas moczowy i proteinogram', 'Nie mają znaczenia w diagnostyce zaburzeń mineralizacji kośćca.'],
      ),
      step(
        'Wyniki badań: Wapń całkowity 2,38 mmol/l (norma 2,20–2,60), 25-OH-D 38 ng/ml (optymalne), PTH 42 pg/ml (w normie). Fosfataza alkaliczna (ALP) wynosi 890 IU/l (znacznie podwyższona). Fosforany w surowicy: 0,62 mmol/l (skrajnie obniżone, norma dla wieku 1,30–1,90 mmol/l).',
        'Jaki wzorzec biochemiczny reprezentuje ten profil?',
        ['Normokalcemiczną hipofosfatemię z prawidłowym PTH – profil krzywicy hipofosfatemicznej', 'Prawidłowy wapń i witamina D przy głębokiej hipofosfatemii i prawidłowym PTH wykluczają krzywicę niedoborową.'],
        ['Ciężką krzywicę z niedoboru witaminy D (krzywicę żywieniową)', 'W krzywicy niedoborowej 25-OH-D jest skrajnie niskie, a PTH silnie podwyższone.'],
      ),
      step(
        'W moczu stwierdzono podwyższone wydalanie fosforanów i obniżony wskaźnik TmP/GFR. W badaniu genetycznym potwierdzono mutację inaktywującą w genie PHEX zlokalizowanym na chromosomie X. Stężenie FGF23 w surowicy jest patologicznie podwyższone.',
        'Jakie jest ostateczne rozpoznanie?',
        ['Krzywica hipofosfatemiczna sprzężona z chromosomem X (XLH)', 'Mutacja PHEX prowadzi do nadmiaru FGF23, który wywołuje nerkową utratę fosforanów i blokuje syntezę kalcytriolu.'],
        ['Pierwotna nadczynność przytarczyc', 'W nadczynności przytarczyc występuje wysokie stężenie wapnia i wysokie PTH.'],
      ),
      step(
        'Dziecko wymaga wdrożenia celowanego leczenia przyczynowego w celu ochrony kośćca i poprawy wzrastania.',
        'Jaka jest nowoczesna celowana terapia z wyboru?',
        ['Burosumab (przeciwciało monoklonalne anty-FGF23) podawane podskórnie co 2 tygodnie', 'Bezpośrednio blokuje nadmiar FGF23, przywracając nerkową reabsorpcję fosforanów i syntezę 1,25(OH)2D3 bez ryzyka nefrokalcynozy.'],
        ['Wysokie dawki witaminy D3 (100 000 j.m. co miesiąc)', 'Witamina D3 nie leczy defektu FGF23 i doprowadziłaby do hiperwitaminozy i uszkodzenia nerek.'],
      ),
    ]
  ),
];
