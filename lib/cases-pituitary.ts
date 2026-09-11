import type { ClinicalCase } from './cases.ts';

type Choice = [string, string];
type StepDraft = [string, string, Choice, Choice];

const step = (context: string, prompt: string, correct: Choice, wrong: Choice): StepDraft => [
  context,
  prompt,
  correct,
  wrong,
];

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

export const pituitaryCases: ClinicalCase[] = [
  make(
    'przysadka-fizjologia',
    'Przypadkowy mikroguzek',
    'Kobieta, 34 lata',
    'Podstawowy',
    'W MRI głowy po drobnym urazie uwidoczniono mikroguzka przysadki o średnicy 5 mm.',
    [
      step(
        'Pacjentka nie zgłasza bólów głowy, zaburzeń widzenia ani zaburzeń miesiączkowania. Uraz bez następstw.',
        'Jaki jest priorytet w ocenie tego znaleziska?',
        ['Wykluczenie nadczynności hormonalnej i brak ucisku na skrzyżowanie', 'Mikrogruczolak (<10 mm) rzadko daje objawy ucisku, ale wymaga oceny czynnościowej.'],
        ['Natychmiastowa pilna operacja neurochirurgiczna', 'Bezobjawowe mikrogruczolaki nieczynne nie stanowią wskazania do operacji.']
      ),
      step(
        'W badaniach laboratoryjnych: PRL 18 ng/ml (norma <25), IGF-1 w normie, TSH 1,8 mIU/l, FT4 16 pmol/l, kortyzol poranny 14 µg/dl.',
        'Jak interpretujesz profil hormonalny?',
        ['Prawidłowa czynność wszystkich osi przysadkowych', 'Brak cech nadprodukcji (prolaktyna, IGF-1) ani niedoczynności przysadki.'],
        ['Wskazanie do wdrożenia lewotyroksyny i sterydów', 'Wszystkie osie są całkowicie prawidłowe.']
      ),
      step(
        'Badanie pola widzenia jest prawidłowe, brak deficytów neurologicznych.',
        'Jakie jest ostateczne rozpoznanie?',
        ['Nieczynny mikrogruczolak przysadki (incydentaloma)', 'Zmiana <10 mm, bez ucisku na chiasmę i bez zaburzeń hormonalnych.'],
        ['Guz złośliwy dający przerzuty', 'Gruczolaki przysadki to niemal wyłącznie łagodne zmiany nowotworowe.']
      ),
      step(
        'Pacjentka pyta o dalsze postępowanie i leczenie farmakologiczne.',
        'Jaka jest prawidłowa strategia postępowania?',
        ['Obserwacja i kontrolne MRI za 12 miesięcy bez leków', 'Zgodnie z wytycznymi ESE nieczynne mikrogruczolaki wymagają jedynie kontroli obrazowej.'],
        ['Radioterapia protonowa z supresją dopaminergiczną', 'Nieuzasadniona i szkodliwa interwencja w małej stabilnej zmianie nieczynnej.']
      ),
    ]
  ),

  make(
    'przysadka-diagnostyka',
    'Złożony panel hormonalny',
    'Mężczyzna, 54 lata',
    'Zaawansowany',
    'Pacjent zgłasza postępujące osłabienie, spadek libido i bladość powłok skórnych.',
    [
      step(
        'W badaniu fizykalnym: ciśnienie tętnicze 95/60 mmHg, blada, woskowata skóra, skąpe owłosienie pachowe i łonowe.',
        'Na co wskazują objawy przedmiotowe i podmiotowe?',
        ['Podejrzenie wieloosiowej niedoczynności przysadki', 'Hipotensja, utrata owłosienia i bladość sugerują niedobory ACTH, LH/FSH i TSH.'],
        ['Pierwotną nadczynność kory nadnadnerczy', 'Obraz kliniczny sugeruje niedobór, a nie nadmiar hormonów.']
      ),
      step(
        'Kortyzol poranny 2,1 µg/dl (<3 sugeruje niedobór), ACTH 8 pg/ml (niskie), TSH 1,0 mIU/l przy FT4 7 pmol/l (norma 12–22), testosteron 0,6 ng/ml (norma 3–8).',
        'Co wynika ze skojarzenia tych wyników?',
        ['Niedoczynność wtórna (centralna) wielu osi', 'Niskie stężenia hormonów obwodowych przy nieadekwatnie niskim lub „prawidłowym” TSH i ACTH.'],
        ['Pierwotna choroba Addisona i Hashimoto', 'W chorobach pierwotnych ACTH i TSH byłyby wybitnie podwyższone.']
      ),
      step(
        'Wykonano MRI przysadki: stwierdzono guza siodła tureckiego 16 mm modelującego dno komory III.',
        'Jakie jest rozpoznanie?',
        ['Makrogruczolak przysadki z panhipopituitaryzmem', 'Guz >10 mm uciskający prawidłową tkankę przysadki i wywołujący niedobory hormonalne.'],
        ['Zapalenie opon mózgowo-rdzeniowych', 'Nie tłumaczy obrazu MRI ani przewlekłego panhipopituitaryzmu.']
      ),
      step(
        'Przed planowaną konsultacją neurochirurgiczną konieczna jest substytucja hormonalna.',
        'Który hormon należy podać w pierwszej kolejności?',
        ['Hydrokortyzon przed włączeniem lewotyroksyny', 'Podanie LT4 przed hydrokortyzonem przyspiesza klirens kortyzolu i wywołuje śmiertelny przełom nadnerczowy!'],
        ['Lewotyroksynę w dużej dawce nasycającej', 'Błąd sztuki lekarskiej: może sprowokować ostry przełom nadnerczowy.']
      ),
    ]
  ),

  make(
    'prolactinoma',
    'Mlekotok i nieregularne miesiączki',
    'Kobieta, 27 lat',
    'Podstawowy',
    'Młoda kobieta zgłasza zanik miesiączek od 6 miesięcy i samoistny wyciek z brodawek sutkowych.',
    [
      step(
        'Test ciążowy z moczu jest ujemny. Pacjentka nie przyjmuje neuroleptyków ani leków przeciwwymiotnych.',
        'Jaki jest podstawowy krok diagnostyczny?',
        ['Oznaczenie stężenia prolaktyny (PRL) w surowicy', 'Obraz mlekotoku i braku miesiączki to klasyczny zespół hiperprolaktynemii.'],
        ['Natychmiastowe łyżeczkowanie jamy macicy', 'Diagnostykę zaczynamy od badań hormonalnych i wykluczenia ciąży.']
      ),
      step(
        'Stężenie prolaktyny wynosi 160 ng/ml (norma <25 ng/ml). Wytrącanie PEG nie wykazało makroprolaktyny (monomeryczna PRL >80%).',
        'Co oznacza ten wynik?',
        ['Istotną biologiczną hiperprolaktynemię budzącą podejrzenie prolactinoma', 'Wartości >100 ng/ml są wysoce swoiste dla gruczolaka prolaktynowego.'],
        ['Artefakt laboratoryjny bez znaczenia klinicznego', 'Wysoka PRL monomeryczna ma pełną aktywność biologiczną.']
      ),
      step(
        'W MRI uwidoczniono gruczolaka przedniego płata o średnicy 8 mm (mikroprolactinoma). Pole widzenia prawidłowe.',
        'Jakie jest rozpoznanie?',
        ['Mikroprolactinoma (gruczolak prolaktynowy <10 mm)', 'Zgodne stężenie PRL, obraz MRI i objawy kliniczne.'],
        ['Moczówka prosta', 'Choroba tylnego płata przysadki, niepowiązana z mlekotokiem.']
      ),
      step(
        'Pacjentka pyta o leczenie i możliwość zajścia w ciążę w przyszłości.',
        'Co stanowi leczenie pierwszego rzutu?',
        ['Agonista dopaminy (kabergolina)', 'Kabergolina normalizuje PRL u >90% chorych i powoduje kurczenie guza bez konieczności operacji.'],
        ['Klasyczna kraniotomia czołowa', 'Zabiegi neurochirurgiczne w prolactinoma są zarezerwowane dla oporności lub nietolerancji leków.']
      ),
    ]
  ),

  make(
    'akromegalia',
    'Za ciasne pierścionki i nowe nadciśnienie',
    'Mężczyzna, 44 lata',
    'Zaawansowany',
    'Pacjent zauważył powiększenie dłoni i stóp, zmianę rysów twarzy, zlewne poty i nowo wykryte nadciśnienie.',
    [
      step(
        'Chory zmienił rozmiar buta z 42 na 45 w ciągu 5 lat. Występuje prognatyzm i diastema między zębami.',
        'Jaki jest najlepszy laboratoryjny test przesiewowy?',
        ['Oznaczenie stężenia IGF-1 w surowicy', 'IGF-1 ma stabilne stężenie dobowe i odzwierciedla zintegrowaną sekrecję hormonu wzrostu.'],
        ['Pojedynczy przypadkowy pomiar GH', 'Wydzielanie GH jest pulsacyjne i pojedynczy pomiar może być fałszywie niski lub wysoki.']
      ),
      step(
        'IGF-1 wynosi 3,5-krotność górnej granicy normy dla wieku. W doustnym teście tolerancji glukozy (OGTT 75g) najniższe GH wynosi 4,2 µg/l (norma <1,0 µg/l, a wg czułych testów <0,4 µg/l).',
        'Jak interpretujesz wynik testu OGTT?',
        ['Brak supresji GH potwierdzający autonomiczną nadprodukcję', 'U zdrowego glukoza hamuje GH <1,0 µg/l; brak spadku potwierdza akromegalię.'],
        ['Prawidłową fizjologiczną odpowiedź na obciążenie glukozą', 'Prawidłowo glukoza hamuje, a nie stymuluje GH.']
      ),
      step(
        'MRI uwidoczniło makrogruczolaka przysadki o średnicy 18 mm wpuklającego się do zatoki klinowej.',
        'Jakie jest rozpoznanie?',
        ['Akromegalia w przebiegu somatotropinoma (makrogruczolaka GH)', 'Spełnione kryteria biochemiczne i radiologiczne.'],
        ['Choroba Addisona', 'Niewydolność kory nadnerczy o odmiennej symptomatologii.']
      ),
      step(
        'Guz jest dostępny operacyjnie, pacjent wyraża zgodę na leczenie zabiegowe.',
        'Jaka jest metoda leczenia pierwszego rzutu w akromegalii?',
        ['Operacja przez zatokę klinową (przezklinowa / TSS)', 'Zabieg neurochirurgiczny jest leczeniem z wyboru dającym szansę na całkowite wyleczenie.'],
        ['Długoterminowa obserwacja bez leczenia', 'Akromegalia wiąże się ze znacznym wzrostem śmiertelności sercowo-naczyniowej.']
      ),
    ]
  ),

  make(
    'cushing-choroba',
    'Otyłość brzuszna, siniaki i purpurowe rozstępy',
    'Kobieta, 38 lat',
    'Zaawansowany',
    'Kobieta z narastającym osłabieniem mięśni proksymalnych, twarzą „księżycowatą”, bawołim karkiem i szerokimi sinoczerwonymi rozstępami.',
    [
      step(
        'W badaniu: ciśnienie tętnicze 165/100 mmHg, atrofia skóry, trudność ze wstawaniem z krzesła bez pomocy rąk (miopatia).',
        'Jaki jest pierwszy etap diagnostyki?',
        ['Potwierdzenie hiperkortyzolemii (np. test z 1 mg deksametazonu lub UFC)', 'Test hamowania 1 mg deksametazonu z oceną kortyzolu o 8:00 rano to standard przesiewowy.'],
        ['Natychmiastowe usunięcie obu nadnerczy', 'Przed jakąkolwiek interwencją chirurgiczną konieczne jest ścisłe potwierdzenie i lokalizacja źródła.']
      ),
      step(
        'Kortyzol po 1 mg deksametazonu wynosi 8,4 µg/dl (norma supresji <1,8 µg/dl). Wolny kortyzol w moczu (UFC) 4x norma. ACTH w osoczu 75 pg/ml (norma 10–60).',
        'O czym świadczy nieobniżone stężenie ACTH przy hiperkortyzolemii?',
        ['O zespole Cushinga ACTH-zależnym', 'Podwyższone ACTH wyklucza pierwotny guz nadnercza (w którym ACTH byłoby zahamowane <5 pg/ml).'],
        ['O guzie kory nadnercza wydzielającym autonomicznie kortyzol', 'W autonomicznym guzie nadnercza ACTH ulega głębokiej supresji.']
      ),
      step(
        'W MRI przysadki widoczny mikroguzek 4 mm. W teście z CRH wzrost ACTH o 65% i kortyzolu o 40%.',
        'Jakie jest rozpoznanie?',
        ['Choroba Cushinga (gruczolak przysadki wydzielający ACTH)', 'Klasyczny ACTH-zależny zespół Cushinga pochodzenia przysadkowego.'],
        ['Zespół Nelsona', 'Rozwija się po obustronnej adrenalektomii, a nie de novo.']
      ),
      step(
        'Zespół kwalifikuje chorą do leczenia przyczynowego.',
        'Jaki jest złoty standard leczenia choroby Cushinga?',
        ['Selektywna operacja przezklinowa usunięcia mikrogruczolaka ACTH', 'Daje 70–90% wskaźnik remisji w rękach doświadczonego neurochirurga.'],
        ['Leczenie wyłącznie ketokonazolem przez całe życie', 'Inhibitory steroidogenezy są leczeniem pomostowym, a nie metodą z wyboru.']
      ),
    ]
  ),

  make(
    'guzy-nieczynne',
    'Ubytki w polu widzenia i ucisk skrzyżowania',
    'Mężczyzna, 62 lata',
    'Podstawowy',
    'Kierowca zgłasza, że od kilku miesięcy "nie widzi samochodów nadjeżdżających z boków" i potyka się o meble.',
    [
      step(
        'Badanie perymetryczne wykazało niedowidzenie połowicze dwuskroniowe (hemianopsia bitemporalis). Ostrość wzroku obniżona w oku lewym.',
        'Ucisk której struktury anatomicznej odpowiada za ten ubytek pola widzenia?',
        ['Skrzyżowania wzrokowego przez guz rosnący nadsiodłowo', 'Skrzyżowanie włókien nosowych siatkówki odpowiada za widzenie w polach skroniowych.'],
        ['Płata potylicznego mózgu', 'Daje jednoimienne niedowidzenie połowicze, a nie dwuskroniowe.']
      ),
      step(
        'W pilnym MRI głowy: guz okolicy siodła o wymiarach 28 x 22 x 25 mm uciskający skrzyżowanie wzrokowe. Hormony: PRL 28 ng/ml (efekt odszypułowania), FT4 9 pmol/l, kortyzol 5 µg/dl.',
        'Skąd wynika nieznaczne podwyższenie prolaktyny w tym przypadku?',
        ['Z mechanicznego ucisku szypuły i braku dopaminy (stalk effect)', 'Guz nieczynny uciska szypułę, blokując hamujący dopływ dopaminy z podwzgórza.'],
        ['Jest to olbrzymi prolactinoma', 'Prawdziwy prolactinoma o wymiarach 28 mm miałby PRL >1000 ng/ml.']
      ),
      step(
        'Wykluczono nadprodukcję GH, ACTH i TSH. Występuje częściowa niedoczynność przysadki.',
        'Jakie jest rozpoznanie?',
        ['Nieczynny hormonalnie makrogruczolak przysadki (NFPA) z zespołem ciasnoty', 'NFPA z objawami neurologicznymi i uciskiem dróg wzrokowych.'],
        ['Stwardnienie rozsiane', 'Nie tworzy guza w siodle tureckim.']
      ),
      step(
        'Występuje bezpośrednie zagrożenie trwałej utraty wzroku z powodu ucisku chiasmy.',
        'Jaka jest pilna decyzja terapeutyczna?',
        ['Pilna operacja neurochirurgiczna z dostępu przezklinowego w celu odbarczenia', 'Dekompresja skrzyżowania wzrokowego jest pilnym wskazaniem życiowym i czynnościowym.'],
        ['Próba leczenia kabergoliną przez 6 miesięcy', 'Kabergolina nie działa na nieczynne gruczolaki uciskające chiasmę wzrokową.']
      ),
    ]
  ),

  make(
    'hipopituitaryzm',
    'Krwotok poporodowy i brak pokarmu',
    'Kobieta, 31 lat',
    'Zaawansowany',
    'Pacjentka po powikłanym porodzie z masywnym krwotokiem położniczym i wstrząsem zgłasza brak laktacji i skrajne osłabienie.',
    [
      step(
        'Minęły 3 miesiące od porodu: nie pojawiła się laktacja, brak powrotu miesiączki, chora stale marznie i ma obniżone ciśnienie tętnicze.',
        'Jakie powikłanie należy podejrzewać po ciężkim krwotoku okołoporodowym?',
        ['Zespół Sheehana (poporodową martwicę niedokrwienną przysadki)', 'Powiększona w ciąży przysadka jest skrajnie podatna na niedokrwienie we wstrząsie.'],
        ['Fizjologiczny stan połogowy', 'Brak laktacji i ciężka astenia po wstrząsie to patologia wymagająca natychmiastowej diagnostyki.']
      ),
      step(
        'Badania: kortyzol 1,8 µg/dl, ACTH <5 pg/ml, FT4 6 pmol/l (norma 12–22), TSH 0,6 mIU/l, PRL 1,2 ng/ml, LH <0,5 IU/l.',
        'Jak interpretujesz ten profil laboratoryjny?',
        ['Wielohormonalna niedoczynność przysadki (panhipopituitaryzm)', 'Głęboki niedobór hormonów tropowych i kory nadnerczy, tarczycy oraz gonad.'],
        ['Pierwotna niedoczynność tarczycy', 'TSH byłoby wybitnie podwyższone, a tu jest nieadekwatnie niskie.']
      ),
      step(
        'W MRI mózgowia widoczne częściowo puste siodło tureckie (empty sella) z zanikiem miąższu przysadki.',
        'Jakie jest ostateczne rozpoznanie?',
        ['Zespół Sheehana z jawną wtórną niewydolnością nadnerczy i tarczycy', 'Obraz kliniczny, wywiad krwotoku i badania hormonalne są jednoznaczne.'],
        ['Moczówka prosta nerkowa', 'Dotyczy cewek nerkowych, a nie zniszczenia przysadki.']
      ),
      step(
        'Pacjentka wymaga natychmiastowego rozpoczęcia leczenia substytucyjnego.',
        'W jakiej kolejności należy wdrożyć leczenie?',
        ['Natychmiast hydrokortyzon, a dopiero po 24–48 godzinach lewotyroksynę', 'Podanie LT4 bez uprzedniego zabezpieczenia hydrokortyzonem grozi zgonem w przełomie nadnerczowym!'],
        ['Jednocześnie wysoka dawka radiojodu i lewotyroksyny', 'Radiojod niszczy tarczycę i jest absolutnie przeciwwskazany.']
      ),
    ]
  ),

  make(
    'moczowka-prosta',
    'Wypija 8 litrów wody dziennie',
    'Mężczyzna, 29 lat',
    'Podstawowy',
    'Młody mężczyzna po wypadku komunikacyjnym z urazem podstawy czaszki oddaje do 9 litrów bezbarwnego moczu na dobę.',
    [
      step(
        'Pacjent stale odczuwa pragnienie, wstaje do toalety 6-krotnie każdej nocy. Ciężar właściwy moczu wynosi 1,002.',
        'Jakie zaburzenie gospodarki wodnej podejrzewasz?',
        ['Moczówkę prostą wywołaną urazem szypuły przysadki/podwzgórza', 'Znakomity zespół hipostenurii, poliurii i polidypsji po urazie głowy.'],
        ['Cukrzycę typu 1 z kwasicą ketonową', 'W cukrzycy ciężar właściwy moczu jest wysoki (>1,030) z powodu glukozurii.']
      ),
      step(
        'Sód w surowicy 148 mmol/l (górna granica normy), osmolalność osocza 302 mOsm/kg, osmolalność moczu 110 mOsm/kg (wybitnie hipoosmotyczny).',
        'Co wykazuje powyższy profil osmolalny?',
        ['Niezdolność nerek do zagęszczania moczu mimo hiperosmolalności osocza', 'Prawidłowo przy osmolalności osocza >300 mOsm/kg mocz powinien mieć >800 mOsm/kg.'],
        ['Przewodnienie hipotoniczne', 'Osmolalność osocza jest podwyższona, a nie obniżona.']
      ),
      step(
        'W teście odwodnieniowym po podaniu 2 µg desmopresyny (dDAVP) osmolalność moczu wzrosła ze 115 do 480 mOsm/kg (>300% wzrostu).',
        'Co oznacza spektakularna odpowiedź na egzogenną desmopresynę?',
        ['Potwierdzenie moczówki prostej centralnej (niedobór AVP)', 'Nerki są w pełni wrażliwe na wazopresynę; przyczyną był brak jej wydzielania z przysadki.'],
        ['Moczówkę nerkową z defektem receptora V2', 'W postaci nerkowej brak byłoby wzrostu osmolalności moczu po dDAVP (<50%).']
      ),
      step(
        'Ustalono rozpoznanie pourazowej moczówki prostej centralnej.',
        'Jakie leczenie jest lekami z wyboru?',
        ['Substytucja desmopresyną (dDAVP doustnie lub donosowo)', 'Analog wazopresyny selektywnie działający na receptory V2 w cewkach zbiorczych.'],
        ['Restrykcja płynowa do 500 ml/dobę bez leków', 'Śmiertelnie niebezpieczna u chorego z moczówką centralną – grozi odwodnieniem hipernatronicznym!']
      ),
    ]
  ),

  make(
    'siadh',
    'Hiponatremia u chorego z zapaleniem płuc',
    'Mężczyzna, 68 lat',
    'Zaawansowany',
    'Mężczyzna hospitalizowany z powodu atypowego zapalenia płuc staje się senny, spowolniały i ma nudności.',
    [
      step(
        'Pacjent jest w stanie euwolemii: brak obrzęków i cech odwodnienia. W badaniach: sód 119 mmol/l, kwas moczowy 2,4 mg/dl.',
        'Co oznacza ten profil kliniczny i laboratoryjny?',
        ['Hipoosmotyczna hiponatremia w stanie klinicznej euwolemii', 'Niski sód i niski kwas moczowy przy braku cech hipo- lub hiperwolemii to typowy SIADH.'],
        ['Hiponatremia z przewodnieniem w niewydolności serca', 'Brak obrzęków obwodowych i cech zastoju w krążeniu płucnym.']
      ),
      step(
        'Osmolalność osocza wynosi 252 mOsm/kg H2O (niska), osmolalność moczu 420 mOsm/kg (nieadekwatnie wysoka >100), sód w moczu 58 mmol/l (>30 mmol/l).',
        'O czym świadczy wysoki sód i osmolalność moczu przy hiponatremii?',
        ['O nieadekwatnym wydzielaniu wazopresyny (zespół SIADH / Schwartz-Bartter)', 'Mocz jest zagęszczany wbrew fizjologicznej potrzebie wydalenia wolnej wody.'],
        ['O moczówce prostej', 'W moczówce mocz byłby skrajnie rozcieńczony (<100–200 mOsm/kg).']
      ),
      step(
        'Wykluczono niedoczynność tarczycy (TSH 1,5 mIU/l) oraz niewydolność nadnerczy (kortyzol 22 µg/dl). Brak leków moczopędnych.',
        'Jakie jest ostateczne rozpoznanie?',
        ['SIADH w przebiegu infekcji płucnej', 'Spełnione wszystkie klasyczne kryteria Barttera i Schwartza dla SIADH.'],
        ['Pierwotna polidypsja psychogenna', 'W polidypsji osmolalność moczu ulega maksymalnemu obniżeniu (<100 mOsm/kg).']
      ),
      step(
        'W leczeniu hiponatremii w SIADH obowiązują ścisłe reguły bezpieczeństwa.',
        'Jaka jest kluczowa zasada wyrównywania sodu?',
        ['Ograniczenie płynów i tempo wzrostu sodu nieprzekraczające 8–10 mmol/l na pierwsze 24h', 'Zbyt szybkie podnoszenie sodu grozi śmiertelną mielinolizą pośrodkową mostu (CPM)!'],
        ['Szybki wlew 3% NaCl w celu podniesienia sodu o 25 mmol/l w 6 godzin', 'Katastrofalny błąd skutkujący nieodwracalnym uszkodzeniem pnia mózgu (CPM).']
      ),
    ]
  ),

  make(
    'przysadka-zapalenia',
    'Ból głowy i astenia po immunoterapii onkologicznej',
    'Mężczyzna, 58 lat',
    'Zaawansowany',
    'Chory na czerniaka leczony ipilimumabem (anty-CTLA-4) zgłasza silne bóle głowy, jadłowstręt i narastające osłabienie.',
    [
      step(
        'W badaniu: ciśnienie 100/65 mmHg, tętno 64/min, apatia. Brak gorączki i objawów oponowych.',
        'Jakie powikłanie immunoterapii inhibitorami punktów kontrolnych (ICI) należy wziąć pod uwagę?',
        ['Zapalenie przysadki indukowane immunoterapią (hipofizyt polekowy)', 'Ipilimumab wiąże się z ekspresją CTLA-4 na komórkach przysadki i wywołuje autoimmunologiczne zapalenie.'],
        ['Grypę sezonową', 'Profil kliniczny i terapia ICI wymagają natychmiastowego wykluczenia endokrynopatii autoimmunologicznej.']
      ),
      step(
        'Badania: kortyzol 2,4 µg/dl, ACTH 7 pg/ml, FT4 8 pmol/l, TSH 0,4 mIU/l. W MRI powiększenie przysadki i pogrubienie szypuły.',
        'Jak interpretujesz obraz kliniczny i badania?',
        ['Zapalenie przysadki (hypophysitis) z wielohormonalną niedoczynnością', 'Powiększenie gruczołu i pogrubienie szypuły wraz z deficytem ACTH i TSH to obraz hipofizytu.'],
        ['Gruczolak somatotropinowy', 'Akromegalia daje nadmiar GH/IGF-1, a nie ostrą niedoczynność nadnerczową.']
      ),
      step(
        'Kluczowe w diagnostyce jest odróżnienie od przerzutu czerniaka do OUN.',
        'Co przemawia za zapaleniem indukowanym ICI?',
        ['Równomierne powiększenie siodła, pogrubienie szypuły i dramatyczna reakcja na sterydoterapię', 'Typowa morfologia radiologiczna i czas wystąpienia po 6–12 tygodniach leczenia anty-CTLA-4.'],
        ['Brak jakichkolwiek zmian w osiach hormonalnych', 'Hipofizyt niemal zawsze uszkadza oś kortykotropową.']
      ),
      step(
        'Pacjent ma objawy ostrej wtórnej niedoboru kortyzolu.',
        'Jakie jest natychmiastowe postępowanie?',
        ['Pilne podanie hydrokortyzonu i leczenie substytucyjne', 'Niewydolność nadnerczy w hipofizycie jest bezpośrednim zagrożeniem życia.'],
        ['Natychmiastowe podanie chemioterapii cytotoksycznej', 'Nie leczy stanu nagłego niedoboru steroidów i pogłębi niestabilność.']
      ),
    ]
  ),

  make(
    'udar-przysadki',
    'Gwałtowny piorunujący ból głowy i podwójne widzenie',
    'Kobieta, 49 lat',
    'Zaawansowany',
    'Kobieta nagle doznała najsilniejszego w życiu bólu głowy za gałkami ocznymi z nudnościami, wymiotami i opadnięciem powieki prawej.',
    [
      step(
        'W badaniu neurologicznym: ptoza oka prawego, upośledzenie przywodzenia i unoszenia gałki ocznej (porażenie nerwu III), ciśnienie 85/50 mmHg.',
        'Porażenie którego nerwu w ścianie zatoki jamistej odpowiada za ten deficyt?',
        ['Nerwu okoruchowego (III) uciśniętego przez rozprężający się guz', 'Nerw III przebiega w ścianie zatoki jamistej i jest najbardziej podatny na boczny ucisk.'],
        ['Nerwu trójdzielnego (V3 gałąź żuchwowa)', 'Odpowiada za czucie żuchwy i mięśnie żwacze, nie unosi powieki.']
      ),
      step(
        'W pilnym badaniu MRI (lub TK): powiększone siodło z obszarami wysokiego sygnału krwotocznego i martwicy w obrębie istniejącego wcześniej makrogruczolaka.',
        'Jakie jest rozpoznanie?',
        ['Udar przysadki (apopleksja przysadkowa)', 'Krwotok lub martwica niedokrwienna wewnątrz guza przysadki to ostry stan zagrożenia życia.'],
        ['Migrena z aurą', 'Nie daje krwotoku w siodle tureckim ani nagłego porażenia nerwu III.']
      ),
      step(
        'Chora jest blada, zlana zimnym potem, ciśnienie spada do 80/45 mmHg.',
        'Jakie zaburzenie hemodynamiczno-hormonalne bezpośrednio zagraża jej życiu?',
        ['Ostry wtórny przełom nadnerczowy z powodu nagłego zniszczenia komórek kortykotropowych', 'Większość chorych z udarem przysadki ma krytyczny, natychmiastowy niedobór ACTH i kortyzolu.'],
        ['Przełom tarczycowy z tyreotoksykozą', 'Udar przysadki nie wywołuje nagłego rzutu hormonów tarczycy.']
      ),
      step(
        'Chora wymaga pilnego zabezpieczenia przed planowaną dekompresją neurochirurgiczną.',
        'Co należy podać natychmiast drogą dożylną?',
        ['Dożylnie 100 mg hydrokortyzonu w bolusie', 'Pilna substytucja glikokortykosteroidowa zabezpiecza hemodynamicznie przed zgonem we wstrząsie.'],
        ['Doustną lewotyroksynę w kroplach', 'Nie działa natychmiast i bez hydrokortyzonu jest skrajnie niebezpieczna.']
      ),
    ]
  ),

  make(
    'przysadka-operacje',
    'Trójfazowe wahania sodu po operacji przezklinowej',
    'Mężczyzna, 51 lat',
    'Zaawansowany',
    'Pacjent w 5. dobie po przezklinowym usunięciu makrogruczolaka przysadki.',
    [
      step(
        'W 1. dobie po zabiegu oddawał 6 litrów moczu o niskiej gęstości (faza moczówki prostej). W 5. dobie diureza spadła do 800 ml/dobę, pacjent jest osłabiony i ma mdłości.',
        'Jakie zjawisko fizjologiczne po operacjach okolicy siodła należy podejrzewać?',
        ['Trójfazową odpowiedź moczówkową (DI -> SIADH -> faza trwała)', 'Klasyczny przebieg: 1) ostra DI (uszkodzenie), 2) przejściowy SIADH (niekontrolowane uwalnianie zapasów AVP), 3) trwała DI lub powrót czynności.'],
        ['Niewydolność nerek wymagającą hemodializy', 'Typowe zjawisko po neurochirurgii przysadki wiąże się z dynamiką osi podwzgórze-przysadka.']
      ),
      step(
        'Badania laboratoryjne w 5. dobie: sód 122 mmol/l (głęboki spadek z wyjściowego 142 mmol/l), osmolalność osocza 258 mOsm/kg, osmolalność moczu 520 mOsm/kg.',
        'W jakiej fazie znajduje się obecnie pacjent?',
        ['W drugiej fazie: przejściowego zespołu SIADH z retencją wolnej wody', 'Z obumierających neuronów podwzgórza i tylnego płata uwalniane są zapasy zmagazynowanej wazopresyny.'],
        ['W fazie trwałego odwodnienia hiperosmotycznego', 'Sód i osmolalność osocza są obniżone, a nie podwyższone.']
      ),
      step(
        'Podanie desmopresyny w fazie SIADH byłoby ciężkim błędem i doprowadziłoby do obrzęku mózgu.',
        'Jakie jest prawidłowe postępowanie w tej fazie hiponatremii?',
        ['Restrykcja płynów i ścisłe monitorowanie sodu co 6–8 godzin', 'Ograniczenie podaży płynów pozwala zniwelować retencję wody do czasu wyczerpania uwolnionych zapasów AVP.'],
        ['Podanie 5 litrów 5% roztworu glukozy', 'Gwałtownie obniży sód i doprowadzi do śmiertelnego obrzęku mózgu i wgłobienia.']
      ),
      step(
        'Po 4 kolejnych dniach sód znormalizował się, a w 10. dobie ponownie wzrosła diureza do 5 l/dobę z hipostenurią (faza 3).',
        'Jakie jest ostateczne podsumowanie opieki okołooperacyjnej?',
        ['Konieczna jest dynamiczna ocena sodu i diurezy przez minimum 10–14 dni po operacji', 'Fazy zaburzeń wazopresyny wymagają elastycznej zmiany postępowania (dDAVP w fazie 1 i 3, restrykcja płynów w fazie 2).'],
        ['Stałe podawanie desmopresyny w niezmiennej dawce od 1. dnia po operacji na zawsze', 'Brak adaptacji dawkowania do fazy SIADH grozi ciężkimi powikłaniami neurologicznymi.']
      ),
    ]
  ),
];
