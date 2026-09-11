import type { NenCaseDraft } from './cases-nen-types.ts';

export const nenCasesPart2: NenCaseDraft[] = [
  {
    id: 'case-nen-przelom-rakowiaka',
    title: 'Zapaść krążeniowa i siny rumieniec na stole operacyjnym',
    patient: 'Kobieta, 60 lat',
    difficulty: 'Zaawansowany',
    intro: 'Pacjentka z potwierdzonymi zmianami ogniskowymi w wątrobie została poddana znieczuleniu ogólnemu do laparoskopowej biopsji gruboigłowej narządu.',
    steps: [
      {
        prompt: 'Bezpośrednio po intubacji i wkłuciu igły biopsyjnej do miąższu wątroby ciśnienie tętnicze gwałtownie spadło do 55/30 mmHg, tętno wzrosło do 145/min, a skóra twarzy i tułowia pokryła się plamistym, purpurowym rumieńcem. Co się dzieje?',
        context: 'Anestezjolog zgłasza wysoki opór dróg oddechowych (bronchospazm).',
        options: [
          { text: 'Ostry, śródoperacyjny przełom rakowiaka (carcinoid crisis) wywołany mechanicznym naruszeniem guza', explanation: 'Naruszenie torebki guza bogatego w naczynia wyzwoliło lawinowy wyrzut serotoniny, kalikreiny i tachykinin do krążenia ogólnego.' },
          { text: 'Odma prężna prawostronna', explanation: 'Odma prężna nie wywołuje purpurowego rumienia twarzy i skurczu oskrzeli o tym charakterze.' },
        ],
      },
      {
        prompt: 'Młodszy anestezjolog sięga po ampułkę z adrenaliną (epinefryną). Dlaczego podanie adrenaliny jest w tej sytuacji bezwzględnie przeciwwskazane?',
        context: 'Hipotensja utrzymuje się mimo wlewu krystaloidów.',
        options: [
          { text: 'Pobudzenie receptorów beta-adrenergicznych na komórkach rakowiaka wyzwoli kolejną falę wyrzutu mediatorów naczynioruchowych, pogłębiając zapaść', explanation: 'Katecholaminy stymulują degranulację guza w zespole rakowiaka, tworząc samonapędzający się mechanizm śmiertelnego wstrząsu.' },
          { text: 'Adrenalina neutralizuje działanie leków zwiotczających mięśnie', explanation: 'Nie ma to związku z patofizjologią przełomu rakowiaka.' },
        ],
      },
      {
        prompt: 'Jaki lek należy natychmiast podać w bolusie dożylnym, aby przerwać degranulację guza i ustabilizować hemodynamikę?',
        context: 'Wkłucie centralne jest zabezpieczone.',
        options: [
          { text: 'Oktreotyd w bolusie dożylnym 500–1000 µg i.v., a następnie ciągły wlew 100–200 µg/h', explanation: 'Oktreotyd natychmiast aktywuje receptory SSTR2 na komórkach guza, blokując egzocytozę ziarnistości wydzielniczych i znosząc rozszerzenie naczyń.' },
          { text: 'Hydrokortyzon w dawce 10 mg doustnie', explanation: 'Steroidy doustne działają z wielogodzinnym opóźnieniem i nie blokują bezpośrednio receptorów SSTR2.' },
        ],
      },
      {
        prompt: 'Po podaniu oktreotydu ciśnienie wzrosło do 115/70 mmHg, a bronchospazm ustąpił. Jaki błąd popełniono przed planowanym zabiegiem?',
        context: 'Analiza protokołu przygotowania przedoperacyjnego.',
        options: [
          { text: 'Nie wdrożono profilaktycznego ciągłego wlewu dożylnego oktreotydu (50–100 µg/h) na 2 godziny przed zabiegiem', explanation: 'Wytyczne ENETS bezwzględnie nakazują wlew profilaktyczny przed każdą procedurą anestezjologiczną lub inwazyjną u chorych z midgut NET.' },
          { text: 'Nie podano pacjentce 2 litrów płynów hipertonicznych dzień wcześniej', explanation: 'Płyny hipertoniczne nie chronią przed wyrzutem mediatorów z komórek guza.' },
        ],
      },
    ],
  },
  {
    id: 'case-nen-ektopowe-zespoly',
    title: 'Ciemna skóra, potas 2,1 mmol/l i nagłe osłabienie nóg',
    patient: 'Mężczyzna, 54 lata',
    difficulty: 'Zaawansowany',
    intro: 'Mężczyzna zgłosił się do izby przyjęć z powodu skrajnego osłabienia mięśni kończyn dolnych uniemożliwiającego wstanie z łóżka, ciemnego zabarwienia skóry i nadciśnienia 195/110 mmHg.',
    steps: [
      {
        prompt: 'W gazometrii: pH 7,54, potas 2,1 mmol/l (ciężka hipokaliemia z zasadowicą metaboliczną). Stężenie kortyzolu w surowicy wynosi 85 µg/dl (norma 5–20), ACTH 320 pg/ml (norma < 46). Jaka jest hipoteza wstępna?',
        context: 'Objawy narosły w ciągu zaledwie 4 tygodni, pacjent schudł 6 kg.',
        options: [
          { text: 'Ektopowy zespół wydzielania ACTH (EAS) w przebiegu nowotworu neuroendokrynnego (np. rakowiaka oskrzela)', explanation: 'Błyskawiczny przebieg, kacheksja, skrajna hipokaliemia i hiperpigmentacja skóry to klasyczny fenotyp paraneoplastycznego ektopowego ACTH.' },
          { text: 'Choroba Addisona (pierwotna niedoczynność kory nadnerczy)', explanation: 'Choroba Addisona cechuje się niskim kortyzolem i hiperkaliemią, a nie kortyzolem 85 µg/dl i hipokaliemią.' },
        ],
      },
      {
        prompt: 'Podano wysokie dawki deksametazonu (test z 8 mg — HDDST). Stężenie kortyzolu rano wynosiło 82 µg/dl (brak supresji). Co oznacza ten wynik?',
        context: 'Test przeprowadzono zgodnie z protokołem.',
        options: [
          { text: 'Potwierdza autonomiczną sekrecję ACTH oporną na sprzężenie ujemne, typową dla ektopowego guza NEN', explanation: 'W odróżnieniu od gruczolaków przysadki (gdzie kortyzol spada o >50%), guzy ektopowe nie posiadają funkcjonalnego sprzężenia ujemnego.' },
          { text: 'Wyklucza jakąkolwiek patologię nadnerczy i wskazuje na błąd laboratoryjny', explanation: 'Brak hamowania jest kluczowym dowodem patologii ektopowej.' },
        ],
      },
      {
        prompt: 'Rezonans magnetyczny przysadki nie wykazuje zmian. Jakie badanie inwazyjne ostatecznie wykluczy mikroproces w przysadce?',
        context: 'Wysokie stężenie ACTH utrzymuje się.',
        options: [
          { text: 'Obustronne jednoczesne cewnikowanie zatok skalistych dolnych (BIPSS) ze stymulacją CRH', explanation: 'Brak gradientu stężeń ACTH między krwią z zatok skalistych a krwią obwodową (gradient < 2,0 po CRH) jednoznacznie dowodzi źródła pozaprzysadkowego.' },
          { text: 'Biopsja szpiku kostnego z talerza kości biodrowej', explanation: 'Szpik kostny nie różnicuje centralnej i ektopowej sekrecji ACTH.' },
        ],
      },
      {
        prompt: 'BIPSS potwierdził brak gradientu. W TK klatki piersiowej uwidoczniono guzek 18 mm w segmencie 6 płuca prawego wykazujący ekspresję SSTR2 w 68Ga-DOTATATE PET. Jakie jest postępowanie docelowe?',
        context: 'Wdrożono metyrapon w celu kontroli hiperkortyzolemii.',
        options: [
          { text: 'Anatomiczna resekcja segmentarna (lub lobektomia) guzka płuca z limfadenektomią', explanation: 'Radykalne wycięcie rakowiaka oskrzela prowadzi do natychmiastowego spadku ACTH i trwałego wyleczenia hiperkortyzolemii.' },
          { text: 'Obustronna adrenalektomia jako jedyna opcja bez ruszania płuc', explanation: 'Guz pierwotny w płucach jest w pełni resekcyjny; adrenalektomię obustronną rozważa się tylko przy nieodnalezionym ognisku ektopowym.' },
        ],
      },
    ],
  },
  {
    id: 'case-nen-prrt-celowane-captem',
    title: 'Progresja pNET G2 i siła schematu CAPTEM',
    patient: 'Kobieta, 56 lat',
    difficulty: 'Zaawansowany',
    intro: 'Chora z nieoperacyjnym guzem trzonu trzustki i nieresekcyjnymi przerzutami do wątroby (NET G2, Ki-67 14%) wykazuje progresję radiologiczną (+28% w RECIST 1.1) po 18 miesiącach terapii lanreotydem.',
    steps: [
      {
        prompt: 'Miąższ wątroby jest w 40% zajęty przez ogniska przerzutowe, enzymy wątrobowe narastają. Zgodnie z konsensusem NANETS/NCCN, jaki doustny schemat chemioterapii należy wdrożyć?',
        context: 'Stan sprawności ECOG 1, morfologia i funkcja nerek prawidłowe.',
        options: [
          { text: 'Doustny schemat CAPTEM (kapecytabina przez 14 dni + temozolomid w dniach 10–14 cyklu 28-dniowego)', explanation: 'CAPTEM jest wiodącym schematem chemioterapii w pNET o wysokiej dynamice i dużej masie guza, dającym wysokie odsetki odpowiedzi obiektywnej (ORR 40–70%).' },
          { text: 'Monoterapia hydroksymocznikiem', explanation: 'Hydroksymocznik stosuje się w zespołach mieloproliferacyjnych, jest całkowicie nieskuteczny w guzach neuroendokrynnych.' },
        ],
      },
      {
        prompt: 'Jaki biomarker immunohistochemiczny w tkance guza ma kluczowe znaczenie predykcyjne dla skuteczności temozolomidu?',
        context: 'Materiał z biopsji przekazano do pracowni patomorfologii.',
        options: [
          { text: 'Ekspresja enzymu naprawy DNA — metylotransferazy MGMT (lub metylacja promotora genu MGMT)', explanation: 'Niski poziom lub brak ekspresji MGMT uniemożliwia komórce guza naprawę uszkodzeń DNA wywołanych przez temozolomid, warunkując wysoką wrażliwość na CAPTEM.' },
          { text: 'Ekspresja receptora HER2', explanation: 'HER2 ma znaczenie w raku piersi i żołądka, nie w guzach neuroendokrynnych.' },
        ],
      },
      {
        prompt: 'Dlaczego kapecytabinę podaje się przez 9 dni przed dołączeniem temozolomidu w 10. dniu cyklu?',
        context: 'Zasada sekwencyjnego dawkowania w protokole NANETS.',
        options: [
          { text: 'Wstępna ekspozycja na kapecytabinę deplecjonuje wewnątrzkomórkowe zasoby MGMT, potęgując cytotoksyczność alkilującego temozolomidu', explanation: 'To zjawisko synergii farmakodynamicznej — wyczerpanie enzymu MGMT otwiera drogę do pęknięć podwójnej nici DNA pod wpływem temozolomidu.' },
          { text: 'Kapecytabina chroni przed wypadaniem włosów', explanation: 'Nie ma takiego mechanizmu protekcyjnego.' },
        ],
      },
      {
        prompt: 'Po 4 cyklach leczenia w kontrolnym badaniu TK stwierdzono zmniejszenie sumy średnic zmian w wątrobie o 42%. Jak sklasyfikować tę odpowiedź wg kryteriów RECIST 1.1?',
        context: 'Brak nowych zmian ogniskowych.',
        options: [
          { text: 'Częściowa odpowiedź (Partial Response, PR)', explanation: 'Kryterium PR wg RECIST 1.1 to spadek sumy najdłuższych wymiarów zmian tarczowych o co najmniej 30%.' },
          { text: 'Stabilizacja choroby (Stable Disease, SD)', explanation: 'Spadek o 42% znacznie przewyższa próg 30%, kwalifikując odpowiedź jako PR.' },
        ],
      },
    ],
  },
  {
    id: 'case-nen-prrt-dozymetria',
    lessonId: 'nen-matematyka-modele',
    title: 'Kwalifikacja do PRRT i ochrona nerek przed promieniowaniem',
    patient: 'Mężczyzna, 63 lata',
    difficulty: 'Zaawansowany',
    intro: 'Pacjent z rozsianym nowotworem neuroendokrynnym jelita krętego (NET G2, Ki-67 8%) po progresji na pełnej dawce oktreotydu LAR został skierowany na kwalifikację do celowanej radioterapii izotopowej PRRT.',
    steps: [
      {
        prompt: 'W badaniu 68Ga-DOTATATE PET/CT stwierdzono bardzo intensywny wychwyt we wszystkich ogniskach wątrobowych i węzłowych, znacznie przewyższający tło śledziony (stopień 4 wg Krenninga). Czy chory spełnia kryteria kwalifikacji?',
        context: 'Badanie 18F-FDG PET wykazało brak ognisk glikolitycznych.',
        options: [
          { text: 'Tak, wysoki wychwyt SSTR2 (Krenning 3–4) i ujemny FDG PET to idealny profil odpowiedzi na 177Lu-DOTATATE', explanation: 'Gęsta ekspresja SSTR2 bez cech odróżnicowania glikolitycznego zapowiada wysoki depozyt dawki promieniowania w masie nowotworowej.' },
          { text: 'Nie, wychwyt wyższy niż w śledzionie jest bezwzględnym przeciwwskazaniem do PRRT', explanation: 'Wysoki wychwyt jest celem i warunkiem kwalifikacji, a nie przeciwwskazaniem.' },
        ],
      },
      {
        prompt: 'Jaki izotop promieniotwórczy powiązany z chelatorem DOTA i analogiem somatostatyny stanowi standard leczenia PRRT (badanie NETTER-1)?',
        context: 'Planowane są 4 cykle w odstępach 8-tygodniowych.',
        options: [
          { text: 'Lutet-177 (177Lu) emitujący cząstki beta o krótkim zasięgu tkankowym (do 2 mm)', explanation: 'Lutet-177 deponuje niszczącą energię promieniowania bezpośrednio w komórkach nowotworowych przy minimalnym uszkodzeniu tkanek sąsiednich.' },
          { text: 'Jod-131 w czystym roztworze jodku sodu', explanation: 'Jod-131 gromadzi się w symporterze jodowo-sodowym tarczycy, a nie w receptorach SSTR2.' },
        ],
      },
      {
        prompt: 'Jaki jest narząd krytyczny ograniczający dawkę w PRRT i jaki jest dopuszczalny limit skumulowanej dawki pochłoniętej?',
        context: 'eGFR wyjściowe pacjenta: 78 ml/min/1,73 m².',
        options: [
          { text: 'Miąższ nerek; limit skumulowanej dawki pochłoniętej wynosi 23 Gy (lub do 28 Gy przy osłonie aminokwasowej)', explanation: 'Kanaliki nerkowe reabsorbują peptydy; przekroczenie progu dozymetrycznego grozi późną niewydolnością nerek.' },
          { text: 'Szkliwo zębów; limit wynosi 100 Gy', explanation: 'Promieniowanie beta w PRRT nie uszkadza szkliwa zębów.' },
        ],
      },
      {
        prompt: 'W jaki sposób zespół medycyny nuklearnej chroni nerki pacjenta podczas każdej infuzji 177Lu-DOTATATE?',
        context: 'Podanie radiofarmaceutyku trwa 30 minut.',
        options: [
          { text: 'Równoczesnym dożylnym wlewem roztworu aminokwasów zasadowych (L-lizyny i L-argininy) trwającym 4 godziny', explanation: 'Aminokwasy blokują ładunkiem elektrycznym megalinowo-kubilinową reabsorpcję radiopeptydu w kanalikach proksymalnych nerek, redukując dawkę pochłoniętą o 40–50%.' },
          { text: 'Podaniem 5 litrów czystego kwasu solnego', explanation: 'Podanie kwasu solnego wywołałoby natychmiastowy zgon.' },
        ],
      },
    ],
  },
  {
    id: 'case-nen-zespol-men4',
    title: 'Guz przysadki i przytarczyc przy ujemnym genie MEN1',
    patient: 'Mężczyzna, 48 lat',
    difficulty: 'Zaawansowany',
    intro: 'Chory z nawracającą kamicą moczową i hiperkalcemią (11,2 mg/dl, PTH 110 pg/ml) przeszedł rezonans magnetyczny głowy z powodu zaburzeń widzenia, w którym wykryto makrogruczolaka przysadki 16 mm.',
    steps: [
      {
        prompt: 'W poradni genetycznej wykonano badanie sekwencjonowania genu MEN1 — wynik okazał się ujemny (brak jakichkolwiek mutacji). Jaki rzadszy zespół genetyczny należy podejrzewać?',
        context: 'Brak cech zespołu MEN2 (brak MTC i Pheo).',
        options: [
          { text: 'Zespół MEN4 wywołany mutacją germinalną w genie CDKN1B', explanation: 'MEN4 to fenokopia MEN1 wynikająca z inaktywacji genu kodującego inhibitor kinaz p27Kip1, manifestująca się PHPT i guzami przysadki w późniejszym wieku.' },
          { text: 'Zespół Li-Fraumeni z mutacją TP53', explanation: 'Li-Fraumeni charakteryzuje się mięsakami, rakiem piersi i kory nadnerczy, a nie izolowanym fenotypem MEN1.' },
        ],
      },
      {
        prompt: 'Jaką metodę diagnostyki molekularnej należy zastosować w celu jednoczesnego zbadania wszystkich rzadkich genów predyspozycji do guzów neuroendokrynnych?',
        context: 'Dostępne laboratorium genetyki klinicznej.',
        options: [
          { text: 'Wielogenowy panel sekwencjonowania nowej generacji (NGS) obejmujący CDKN1B, CDKN1A, CDKN2C, AIP, PRKAR1A', explanation: 'Panele NGS pozwalają szybko i całościowo wykluczyć rzadkie zespoły uwarunkowane genetycznie u chorych z ujemnym testem MEN1.' },
          { text: 'Klasyczny kariotyp z krwi obwodowej pod mikroskopem świetlnym', explanation: 'Kariotyp wykrywa duże aberracje chromosomowe, a nie punktowe mutacje genów supresorowych.' },
        ],
      },
      {
        prompt: 'Badanie NGS potwierdziło mutację heterozygotyczną w genie CDKN1B. Czym charakteryzuje się przebieg kliniczny zespołu MEN4 w porównaniu do klasycznego MEN1?',
        context: 'Pacjent pyta o rokowanie.',
        options: [
          { text: 'Niższą penetracją narządową i wyraźnie późniejszym początkiem manifestacji klinicznych (średnio po 40.–50. r.ż.)', explanation: 'Chorzy z MEN4 rzadziej rozwijają pełną triadę narządową i zachorowania występują średnio 2 dekady później niż w MEN1.' },
          { text: 'Stuprocentową śmiertelnością przed 30. rokiem życia', explanation: 'MEN4 ma przebieg łagodniejszy i wolniejszy niż MEN1.' },
        ],
      },
      {
        prompt: 'Jakie zalecenie dotyczące operacji przytarczyc należy przekazać chirurgowi endokrynologicznemu?',
        context: 'W USG szyi podejrzenie powiększenia dwóch gruczołów przytarczycznych.',
        options: [
          { text: 'Śródoperacyjna eksploracja wszystkich 4 przytarczyc z uwagi na możliwość przerostu wielogruczołowego', explanation: 'Podobnie jak w innych zespołach MEN, zmiany w przytarczycach mogą mieć charakter wieloogniskowy, wymagając starannej oceny obu stron szyi.' },
          { text: 'Wycięcie całej krtani', explanation: 'Brak jakichkolwiek wskazań do resekcji krtani.' },
        ],
      },
    ],
  },
  {
    id: 'case-nen-vhl-nf1',
    title: 'Mnogie torbiele trzustki, guz nerki i nieczynny pNET w zespole VHL',
    patient: 'Kobieta, 31 lat',
    difficulty: 'Zaawansowany',
    intro: 'Młoda kobieta z rodzinnym wywiadem zespołu von Hippla-Lindaua (VHL) zgłosiła się na doroczne kontrolne badania obrazowe.',
    steps: [
      {
        prompt: 'W badaniu MR jamy brzusznej uwidoczniono mnogie torbiele w całym miąższu trzustki oraz dobrze odgraniczony, hiperwaskularny guz w głowie trzustki o średnicy 19 mm. Jaki to nowotwór?',
        context: 'Badania glikemii, gastryny i glukagonu w normie.',
        options: [
          { text: 'Nieczynny hormonalnie guz neuroendokrynny trzustki (non-functioning pNET) w przebiegu zespołu VHL', explanation: 'W zespole VHL guzy pNET występują u 10–15% chorych, w większości są nieczynne hormonalnie i współistnieją z licznymi torbielami narządu.' },
          { text: 'Gruczolakorak przewodowy trzustki (PDAC) o skrajnej złośliwości', explanation: 'PDAC jest guzem hipowaskularnym, wybitnie złośliwym i rzadkim u 30-latków z VHL.' },
        ],
      },
      {
        prompt: 'W prawym biegunie nerki lewej widoczna jest lita zmiana o średnicy 25 mm. Jaki nowotwór nerki jest typowy dla VHL?',
        context: 'Pacjentka nie zgłasza krwiomoczu.',
        options: [
          { text: 'Rak jasnokomórkowy nerki (ccRCC — clear cell renal cell carcinoma)', explanation: 'Utrata genu supresorowego VHL prowadzi do akumulacji HIF i niekontrolowanego rozwoju obustronnych raków jasnokomórkowych nerek.' },
          { text: 'Kłębuszkowe zapalenie nerek', explanation: 'To choroba autoimmunologiczna miąższu, a nie lity guz nowotworowy.' },
        ],
      },
      {
        prompt: 'Przed planowaniem jakichkolwiek zabiegów operacyjnych w zespole VHL jakie badanie biochemiczne należy bezwzględnie wykonać?',
        context: 'Wykluczenie ukrytego guza chromochłonnego.',
        options: [
          { text: 'Oznaczenie wolnych metanefryn w osoczu lub DZM, aby wykluczyć bezobjawowego guza chromochłonnego (Pheo)', explanation: 'Guz chromochłonny występuje u 10–20% chorych z VHL i musi być zdiagnozowany oraz usunięty przed jakąkolwiek inną operacją.' },
          { text: 'Stężenie troponiny T po próbie wysiłkowej', explanation: 'Próba wysiłkowa u chorego z nierozpoznanym Pheo grozi przełomem nadciśnieniowym.' },
        ],
      },
      {
        prompt: 'Jaki innowacyjny lek celowany — inhibitor HIF-2alpha — został zarejestrowany do leczenia guzów pNET i ccRCC w zespole VHL, pozwalając uniknąć resekcji narządowych?',
        context: 'Zmiany mają powolną dynamikę wzrostu.',
        options: [
          { text: 'Belzutifan', explanation: 'Belzutifan blokuje dimeryzację czynnika transkrypcyjnego HIF-2alpha, wywołując regresję guzów nerkowych i trzustkowych w VHL.' },
          { text: 'Tamoksyfen', explanation: 'Tamoksyfen to modulator receptora estrogenowego stosowany w raku piersi.' },
        ],
      },
    ],
  },
  {
    id: 'case-nen-somatostatynoma',
    lessonId: 'nen-analogi-somatostatyny',
    title: 'Kamica pęcherzyka, cukrzyca i guzek brodawki Vatera w NF1',
    patient: 'Mężczyzna, 45 lat',
    difficulty: 'Zaawansowany',
    intro: 'Chory z rozpoznaną w dzieciństwie neurofibromatozą typu 1 (liczne plamy café-au-lait, nerwiakowłókniaki skóry) zgłasza żółtaczkę mechaniczną i stolce tłuszczowe.',
    steps: [
      {
        prompt: 'W badaniach laboratoryjnych: bilirubina całkowita 4,2 mg/dl, GGTP 380 U/l, glikemia na czczo 152 mg/dl. W USG: poszerzenie dróg żółciowych i liczne złogi w pęcherzyku żółciowym. Co uwidoczniła duodenoskopia?',
        context: 'Badanie endoskopowe górnego odcinka przewodu pokarmowego.',
        options: [
          { text: 'Guz okolicy brodawki Vatera (dwunastnicy) wydzielający somatostatynę (somatostatynoma z ciałkami piaszczakowatymi)', explanation: 'Klasyczna, unikalna manifestacja jelitowa w zespole NF1: somatostatynoma brodawki Vatera powodująca cholestazę i triadę somatostatynową.' },
          { text: 'Polip z komórek okładzinowych żołądka', explanation: 'Polipy żołądka nie blokują brodawki Vatera i nie wywołują żółtaczki zaporowej.' },
        ],
      },
      {
        prompt: 'Dlaczego u tego pacjenta rozwinęła się kamica pęcherzyka żółciowego oraz cukrzyca?',
        context: 'Stężenie somatostatyny w osoczu jest podwyższone.',
        options: [
          { text: 'Nadmiar somatostatyny hamuje uwalnianie cholecystokininy (atonia pęcherzyka) oraz wydzielanie insuliny przez komórki beta', explanation: 'Jest to patofizjologiczna triada somatostatynowa (cukrzyca, kamica pęcherzyka żółciowego i biegunka tłuszczowa).' },
          { text: 'Z powodu zakażenia pasożytniczego motylicą wątrobową', explanation: 'Obraz wynika z działania autonomicznego neuropeptydu somatostatyny, a nie parazytozy.' },
        ],
      },
      {
        prompt: 'W badaniu histopatologicznym bioptatu guza widoczne są charakterystyczne koncentryczne zwapnienia. Jak nazywają się te struktury?',
        context: 'Badanie mikroskopowe preparatu.',
        options: [
          { text: 'Ciałka piaszczakowate (psammoma bodies)', explanation: 'Ciałka piaszczakowate są wysoce charakterystyczną cechą histopatologiczną guzów somatostatynoma dwunastnicy w zespole NF1.' },
          { text: 'Ciałka Mallory\'ego', explanation: 'Ciałka Mallory\'ego występują w alkoholowym zapaleniu wątroby.' },
        ],
      },
      {
        prompt: 'Jakie leczenie chirurgiczne pozwoli trwale udrożnić drogi żółciowe i wyleczyć nowotwór?',
        context: 'Brak przerzutów w badaniach obrazowych.',
        options: [
          { text: 'Pankreatoduodenektomia (lub ampulektomia endoskopowa/chirurgiczna) z usunięciem pęcherzyka żółciowego', explanation: 'Resekcja brodawki Vatera wraz z cholecystektomią usuwa źródło hormonów i znosi cholestazę.' },
          { text: 'Przeszczepienie szpiku kostnego', explanation: 'Przeszczep szpiku nie leczy guzów litych dwunastnicy.' },
        ],
      },
    ],
  },
  {
    id: 'case-nen-pluc-lcnec',
    lessonId: 'nen-pluc-oskrzeli',
    title: 'Guz płuca u palacza: Ki-67 70% i chemioterapia platynowa',
    patient: 'Mężczyzna, 67 lat',
    difficulty: 'Zaawansowany',
    intro: 'Wieloletni palacz tytoniu (45 paczkolat) został skierowany z powodu krwioplucia, duszności i ubytku 8 kg masy ciała w ciągu 2 miesięcy.',
    steps: [
      {
        prompt: 'W TK klatki piersiowej widoczny guz płuca lewego 6 cm z rozległą martwicą centralną i powiększonymi węzłami śródpiersia. W biopsji: komórki o cechach neuroendokrynnych, synaptofizyna(+), CgA(+), Ki-67 70%. Jaka jest diagnoza?',
        context: 'Badanie histopatologiczne wykazuje liczne mitozy i komórki o dużej objętości cytoplazmy.',
        options: [
          { text: 'Wielkokomórkowy rak neuroendokrynny płuca (LCNEC — Large Cell Neuroendocrine Carcinoma, stopień G3)', explanation: 'Wysoki indeks Ki-67 (>50%), obfita martwica i złośliwa cytologia definiują raka neuroendokrynnego (NEC), a duże komórki wskazują na LCNEC.' },
          { text: 'Rakowiak typowy płuca (Typical Carcinoid)', explanation: 'Rakowiak typowy ma Ki-67 < 2%, brak martwicy i doskonałe rokowanie; nie występuje z indeksem 70%.' },
        ],
      },
      {
        prompt: 'W badaniach genetycznych tkanki guza wykryto mutację genu TP53 oraz całkowitą utratę białka RB1. O czym świadczy ten profil molekularny?',
        context: 'Analiza szlaków supresorowych.',
        options: [
          { text: 'O biologicznym pokrewieństwie z rakiem drobnokomórkowym (SCLC) i konieczności leczenia chemioterapią platynową', explanation: 'Inaktywacja TP53 i RB1 definiuje raki słabo zróżnicowane (NEC), determinując wysoką początkową wrażliwość na pochodne platyny.' },
          { text: 'O konieczności podania wyłącznie analogu somatostatyny w monoterapii', explanation: 'SSA są nieskuteczne w agresywnych rakach NEC G3 z Ki-67 70%.' },
        ],
      },
      {
        prompt: 'Czy w tym przypadku badanie 68Ga-DOTATATE PET/CT będzie optymalnym narzędziem oceny zaawansowania?',
        context: 'Planowany jest staging całego ciała.',
        options: [
          { text: 'Nie, w rakach NEC dochodzi do utraty ekspresji SSTR2; badaniem z wyboru jest 18F-FDG PET/CT', explanation: 'Raki słabo zróżnicowane cechują się wysokim tempem glikolizy beztlenowej i silnym gromadzeniem fluorodeoksyglukozy (18F-FDG).' },
          { text: 'Tak, każdy nowotwór neuroendokrynny gromadzi 68Ga-DOTATATE w stopniu 4', explanation: 'Raki NEC G3 w większości tracą receptory somatostatynowe.' },
        ],
      },
      {
        prompt: 'Jaki schemat chemioterapii pierwszego rzutu należy wdrożyć w stadium zaawansowanym LCNEC?',
        context: 'Klirens kreatyniny 82 ml/min.',
        options: [
          { text: 'Pochodna platyny (cisplatyna lub karboplatyna) w skojarzeniu z etopozydem (schemat EP)', explanation: 'Schemat oparty na platynie i etopozydzie jest złotym standardem leczenia raków neuroendokrynnych wysokiego stopnia złośliwości (NEC G3).' },
          { text: 'Doustna witamina C w kroplach', explanation: 'Witamina C nie posiada udowodnionego działania przeciwnowotworowego.' },
        ],
      },
    ],
  },
];
