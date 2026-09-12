import type { Question } from './course-types.ts';

type Choice = [string, string];
type StepDraft = [string, string, Choice, Choice];
export type ClinicalCase = {
  id: string;
  lessonId: string;
  title: string;
  patient: string;
  difficulty: 'Podstawowy' | 'Zaawansowany';
  intro: string;
  steps: (Question & { context: string; stage: string })[];
};

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

export const psychiatryCases: ClinicalCase[] = [
  make(
    'mdd-kryteria-icd11',
    'Gdy zmęczenie nie ustępuje po odpoczynku',
    'Kobieta, 34 lata',
    'Podstawowy',
    'Pacjentka zgłasza się z powodu utrzymującego się od 6 tygodni przygnębienia, całkowitej utraty radości z opieki nad dziećmi i wyczerpania.',
    [
      [
        'Objawy trwają codziennie przez większość dnia od 6 tygodni. Pacjentka budzi się o 4 rano, straciła 4 kg, ma poczucie, że zawodzi rodzinę.',
        'Które objawy spełniają kryteria osiowe epizodu depresyjnego wg ICD-11 CDDR?',
        ['Obniżony nastrój oraz uogólniona anhedonia trwające powyżej 2 tygodni', 'Wystąpienie anhedonii i dysforii przez ponad 14 dni to fundament rozpoznania.'],
        ['Wyłącznie bezsenność poranna i utrata 4 kg', 'Zaburzenia snu i wagi to objawy somatyczne towarzyszące, a nie osiowe.'],
      ],
      [
        'Przed wdrożeniem farmakoterapii zlecono badania laboratoryjne: TSH 2,1 mIU/l, morfologia krwi prawidłowa, ferrytyna 45 ug/l, witamina B12 w normie.',
        'Jak interpretujesz wyniki badań laboratoryjnych?',
        ['Wykluczają częste somatyczne przyczyny obniżenia nastroju (niedoczynność tarczycy, anemię)', 'Prawidłowe TSH i parametry czerwonokrwinkowe wspierają pierwotny charakter epizodu.'],
        ['Świadczą o konieczności natychmiastowej substytucji lewotyroksyną', 'TSH jest w normie, tarczyca pracuje prawidłowo.'],
      ],
      [
        'Pacjentka spełnia 7 z 10 kryteriów ICD-11, funkcjonowanie zawodowe jest istotnie ograniczone, brak objawów psychotycznych i manii w wywiadzie.',
        'Jakie jest ostateczne rozpoznanie kliniczne?',
        ['Umiarkowany epizod depresyjny bez cech psychotycznych', 'Liczba objawów i upośledzenie ról społecznych odpowiadają nasileniu umiarkowanemu.'],
        ['Choroba afektywna dwubiegunowa typu I z manią', 'Brak jakichkolwiek epizodów manii w wywiadzie wyklucza ChAD I.'],
      ],
      [
        'Pacjentka decyduje się na podjęcie kompleksowego leczenia i pyta o rekomendacje.',
        'Zgodnie z wytycznymi CANMAT 2023 i NICE, jakie postępowanie należy zaproponować pacjentce?',
        ['Lek przeciwdepresyjny pierwszego rzutu (np. sertralina lub escitalopram) w połączeniu z psychoterapią CBT', 'W epizodzie umiarkowanym skojarzenie SSRI z psychoterapią daje najwyższy odsetek trwałej remisji.'],
        ['Wyłącznie zalecenie urlopu wypoczynkowego bez farmakoterapii i psychoterapii', 'Odpoczynek sam w sobie nie leczy biologicznego epizodu umiarkowanej depresji.'],
      ],
    ]
  ),

  make(
    'chad-pulapki',
    'Niespodziewana energia po leku przeciwdepresyjnym',
    'Mężczyzna, 26 lat',
    'Zaawansowany',
    'Pacjent z rozpoznaną wstępnie depresją otrzymał sertralinę w dawce 50 mg/d. Po 10 dniach rodzina przyprowadza go z powodu gwałtownej zmiany zachowania.',
    [
      [
        'Pacjent śpi po 2–3 godziny na dobę, mówi bardzo szybko (słowotok), jest drażliwy, wziął kredyt na 80 000 zł na "genialny start-up", czuje niezwykłą moc.',
        'Jaki stan kliniczny rozwinął się u pacjenta?',
        ['Jatrogenne przełączenie fazy (switch) w epizod manii pod wpływem leku przeciwdepresyjnego', 'Zmniejszona potrzeba snu, gonitwa myśli i ekspansywność po SSRI to typowy switch w manię.'],
        ['Typowa reakcja adaptacyjna do sertraliny, którą należy przeczekać', 'Takie objawy nie są adaptacją, lecz ostrym stanem maniakalnym.'],
      ],
      [
        'W dokładnym wywiadzie rodzinnym matka pacjenta leczy się na ChAD, a sam pacjent w wieku 20 lat miał 2-tygodniowy epizod nadmiernej produktywności.',
        'O czym świadczy ten zestaw informacji?',
        ['Pacjent choruje na chorobę afektywną dwubiegunową (spektrum ChAD), a dotychczasowa depresja była fazą ChAD', 'Obciążenie rodzinne i wcześniejszy epizod hipomanii jednoznacznie weryfikują diagnozę w stronę ChAD.'],
        ['To czysta depresja jednobiegunowa z przejściowym niepokojem', 'Epizod manii wyklucza definitywnie depresję jednobiegunową.'],
      ],
      [
        'Objawy trwają 4 dni, doprowadziły do krytycznych decyzji finansowych i wymagają zabezpieczenia przed dalszymi szkodami.',
        'Do jakiego typu ChAD należy ostatecznie zakwalifikować pacjenta?',
        ['ChAD typu I (wystąpienie epizodu manii ze znacznym upośledzeniem funkcjonowania)', 'Obecność manii i dysfunkcji behawioralnej klasyfikuje pacjenta jako ChAD I.'],
        ['Dystymia powikłana nerwicą natręctw', 'Obraz kliniczny jest biegunowo odmienny od dystymii.'],
      ],
      [
        'Pacjent jest pobudzony i w euforii odmawia dalszej współpracy ambulatoryjnej.',
        'Jakie jest natychmiastowe postępowanie farmakologiczne wg Maudsley 15th ed. i CANMAT/ISBD?',
        ['Natychmiastowe odstawienie sertraliny i wdrożenie leku przeciwmaniakalnego (np. olanzapina, aripiprazol lub lit)', 'Podstawą jest usunięcie leku napędzającego manię i podanie leku o działaniu antymaniakalnym.'],
        ['Podwojenie dawki sertraliny do 100 mg/d w celu uspokojenia', 'Eskalacja SSRI w manii pogłębiłaby pobudzenie i mogła wywołać psychozę.'],
      ],
    ]
  ),

  make(
    'zespol-serotoninowy-hunter',
    'Gorączka i drżenia po zabiegu ortopedycznym',
    'Mężczyzna, 48 lat',
    'Zaawansowany',
    'Pacjent przewlekle leczony wenlafaksyną w dawce 225 mg/d przebył zabieg rekonstrukcji więzadła kolanowego. W celu uśmierzenia bólu podano tramadol dożylnie.',
    [
      [
        'Trzy godziny po podaniu tramadolu pacjent staje się skrajnie niespokojny, obficie spocony. Temperatura ciała wynosi 38,9°C, tętno 128/min, ciśnienie 165/100 mmHg.',
        'W badaniu neurologicznym stwierdzono wygórowane odruchy (hiperrefleksję) oraz obustronny wyzwalalny klonus rzepki i stóp. Co podejrzewasz?',
        ['Ostry zespół serotoninowy wskutek interakcji wenlafaksyny z tramadolem', 'Połączenie SNRI z tramadolem (hamującym wychwyt 5-HT) to klasyczna przyczyna toksyczności serotoninowej.'],
        ['Zwykłą pooperacyjną reakcję stresową', 'Klonus i hipertermia nie występują w normalnym przebiegu pooperacyjnym.'],
      ],
      [
        'Lekarz dyżurny weryfikuje objawy pod kątem kryteriów decyzyjnych Huntera.',
        'Czy spełnione są kryteria Huntera u tego chorego?',
        ['Tak, obecność indukowanego klonusu wraz z pobudzeniem i obfitymi potami (diaphoresis) potwierdza rozpoznanie', 'To jeden z kanonicznych, w pełni zwalidowanych warunków decyzyjnych reguły Huntera.'],
        ['Nie, kryteria Huntera wymagają obowiązkowego badania płynu mózgowo-rdzeniowego', 'Kryteria Huntera opierają się wyłącznie na badaniu klinicznym przy łóżku chorego.'],
      ],
      [
        'Wykluczono zakażenie ran i sepsę; parametry zapalne są w normie pooperacyjnej.',
        'Jakie jest rozpoznanie kliniczne?',
        ['Ciężki zespół serotoninowy (toksyczność serotoninowa wg kryteriów Huntera)', 'Kombinacja leków proserotoninergicznych, klonus i niestabilność autonomiczna potwierdzają rozpoznanie.'],
        ['Złośliwy zespół neuroleptyczny bez neuroleptyków', 'NMS wymaga ekspozycji na antagonistów D2, cechuje się sztywnością rury ołowianej, nie klonusem.'],
      ],
      [
        'Pacjent trafia do sali intensywnego nadzoru z rozpoznaniem ostrego zespołu serotoninowego.',
        'Jaki jest właściwy, ratujący życie schemat postępowania terapeutycznego?',
        ['Natychmiastowe odstawienie wenlafaksyny i tramadolu, sedacja diazepamem i.v., fizykalne chłodzenie i podanie cyproheptadyny', 'Sedacja benzodiazepinami zmniejsza napięcie mięśni i hipertermię, a cyproheptadyna blokuje receptory 5-HT2A.'],
        ['Podanie wysokich dawek paracetamolu i ponowne podanie tramadolu', 'Paracetamol nie działa w tej hipertermii, a tramadol napędza śmiertelną toksyczność.'],
      ],
    ]
  ),

  make(
    'nms-ostra-dystonia-eps',
    'Sztywność i gorączka po eskalacji leku przeciwpsychotycznego',
    'Mężczyzna, 31 lat',
    'Zaawansowany',
    'Pacjent hospitalizowany z powodu zaostrzenia schizofrenii otrzymał zwiększoną dawkę haloperidolu domięśniowo z powodu pobudzenia.',
    [
      [
        'Następnego dnia pacjent jest zmutyzowany, leży nieruchomo. W badaniu obecny jest uogólniony opór mięśniowy typu "rury ołowianej" (lead-pipe rigidity), temperatura 39,6°C, poty, tachykardia 135/min.',
        'Który stan nagły jest najbardziej prawdopodobny?',
        ['Złośliwy Zespół Neuroleptyczny (NMS)', 'Blokada D2 haloperidolem z hipertermią, sztywnością rury ołowianej i niestabilnością wegetatywną to klasyczny NMS.'],
        ['Ostry udar niedokrwienny pnia mózgu', 'Uogólniona sztywność pozapiramidowa i hipertermia po neuroleptyku wskazują na NMS.'],
      ],
      [
        'Pobrano badania pilne: leukocytoza 17 800/ul, kinaza kreatynowa (CK) 24 500 IU/l (norma < 190 IU/l), mioglobina w moczu obecna.',
        'Co oznacza tak dramatyczny wzrost kinazy kreatynowej?',
        ['Masywną rabdomiolizę (rozpad mięśni szkieletowych) grożącą ostrą martwicą cewek nerkowych', 'Skrajne napięcie mięśniowe w NMS powoduje rozpad miocytów i uwalnianie CK oraz mioglobiny do krwi.'],
        ['Zawał serca obejmujący wyłącznie prawy przedsionek', 'Tak wysokie wartości CK przy sztywności mięśni szkieletowych odzwierciedlają rabdomiolizę.'],
      ],
      [
        'Zespół spełnia międzynarodowe kryteria konsensusu NMS (Gurrera et al.).',
        'Jakie jest rozpoznanie?',
        ['Złośliwy Zespół Neuroleptyczny (NMS) powikłany rabdomiolizą', 'Obraz kliniczny i laboratoryjny (CK > 20 000 IU/l) jednoznacznie potwierdzają to powikłanie.'],
        ['Katatonia histeryczna bez podłoża somatycznego', 'Wysoka gorączka i rozpad mięśni wykluczają podłoże psychogenne.'],
      ],
      [
        'Temperatura ciała nadal rośnie, pacjent jest zmutyzowany, narasta zagrożenie niewydolnością nerek.',
        'Gdzie i jak należy natychmiast prowadzić dalsze leczenie pacjenta?',
        ['Pilne przekazanie na OIT, intensywna płynoterapia dożylna, dantrolen i.v. i/lub bromokryptyna, chłodzenie fizykalne', 'Nawadnianie chroni nerki przed mioglobiną, dantrolen zwiotcza mięśnie, a bromokryptyna stymuluje receptory D2.'],
        ['Pozostawienie na sali ogólnej i podanie kolejnej dawki haloperidolu', 'Podanie neuroleptyku w NMS drastycznie zwiększa ryzyko zgonu.'],
      ],
    ]
  ),

  make(
    'stabilizatory-lit',
    'Drżenie rąk i chwiejny chód u pacjentki z ChAD',
    'Kobieta, 58 lat',
    'Zaawansowany',
    'Pacjentka leczona z powodzeniem węglanem litu (0,7 mmol/l) z powodu bólu kolana zażywała od tygodnia ketoprofen w dawce 200 mg/d.',
    [
      [
        'Pacjentka zgłasza się z nasilonym, grubofalistym drżeniem rąk, chwiejnością chodu (ataksją), nudnościami i splątaniem. Wypowiada słowa niewyraźnie.',
        'Co podejrzewasz w pierwszej kolejności?',
        ['Zatrucie litem wywołane interakcją z niesteroidowym lekiem przeciwzapalnym (NLPZ)', 'NLPZ hamują wydalanie litu przez nerki, powodując szybki wzrost jego stężenia do wartości toksycznych.'],
        ['Nowy rzut stwardnienia rozsianego', 'Ostry początek u osoby leczonej litem i NLPZ nakazuje w pierwszej kolejności wykluczyć intoksykację.'],
      ],
      [
        'Pobrano krew na badanie TDM: stężenie litu wynosi 1,95 mmol/l, kreatynina wzrosła z 0,8 do 1,6 mg/dl, eGFR spadł do 35 ml/min.',
        'Jak oceniasz stężenie litu w odniesieniu do zakresu terapeutycznego?',
        ['Stężenie w zakresie toksyczności umiarkowanej do ciężkiej (>1,2 mmol/l), z ostrym pogorszeniem funkcji nerek', 'Wartość 1,95 mmol/l grozi trwałym uszkodzeniem układu nerwowego i wymaga pilnej interwencji.'],
        ['Stężenie optymalne, mieszczące się w normie podtrzymującej', 'Zakres podtrzymujący to 0,6–0,8 mmol/l; wartość 1,95 mmol/l jest wysoce toksyczna.'],
      ],
      [
        'Objawy neurologiczne (dyzartria, ataksja, grubofaliste drżenie) są bezpośrednim skutkiem intoksykacji OUN.',
        'Jakie jest rozpoznanie?',
        ['Ostre zatrucie litem na podłożu jatrogennej nefrotoksyczności ketoprofenu', 'Zahamowanie syntezy prostaglandyn przez ketoprofen zmniejszyło klirens litu i doprowadziło do zatrucia.'],
        ['Udar móżdżku spowodowany brakiem potasu', 'Poziom litu 1,95 mmol/l w pełni tłumaczy objawy móżdżkowe.'],
      ],
      [
        'Stan pacjentki jest monitorowany, diureza wynosi 30 ml/h, w EKG rytm zatokowy.',
        'Jakie jest postępowanie terapeutyczne pierwszego rzutu?',
        ['Natychmiastowe odstawienie litu i ketoprofenu, dożylny wlew 0,9% NaCl w celu forsowania diurezy sodowej, monitorowanie litu co 4h (kwalifikacja do hemodializy przy braku poprawy)', 'Płukanie sodem (0,9% NaCl) konkuruje z litem w kanalikach nerkowych i przyspiesza jego eliminację.'],
        ['Podanie furosemidu i diuretyków tiazydowych w celu odwodnienia pacjentki', 'Tiazydy paradoksalnie nasilają wchłanianie zwrotne litu i pogłębiłyby zatrucie!'],
      ],
    ]
  ),
];
