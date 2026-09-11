import { type DraftLesson, q } from './course-types.ts';

export const draftAdrenalPart2: DraftLesson[] = [
  {
    id: 'zespol-conna',
    moduleId: 'nadnercza',
    title: 'Złodziej potasu i sprawca nadciśnienia',
    subtitle: 'Pierwotny hiperaldosteronizm (PA), wskaźnik ARR, testy konfirmacyjne i cewnikowanie AVS',
    group: 'Nadczynności i guz chromochłonny',
    minutes: 18,
    goals: [
      'Zrozumiesz patofizjologię pierwotnego hiperaldosteronizmu (PA): zespół Conna (gruczolak APA) vs obustronny przerost (BAH).',
      'Opanujesz algorytm diagnostyczny: wskaźnik ARR $\\to$ testy konfirmacyjne $\\to$ cewnikowanie żył nadnerczowych (AVS) w celu kwalifikacji do adrenalektomii vs spironolaktonu.',
    ],
    sections: [
      {
        title: 'Epidemiologia i obalenie mitu o hipokaliemii',
        text: 'Pierwotny hiperaldosteronizm (Primary Aldosteronism — PA) to najczęstsza przyczyna wtórnego nadciśnienia tętniczego, odpowiadająca za 5–10% wszystkich chorych na nadciśnienie i aż 20% chorych z nadciśnieniem opornym! KLUCZOWY MIT KLINICZNY: Przez dekady sądzono, że warunkiem rozpoznania jest hipokaliemia. Dziś wiemy, że ponad 60–70% chorych z PA ma stężenie potasu W GRANICACH NORMY (tzw. normokaliemiczny hiperaldosteronizm)! Dlatego prawidłowy potas NIE wyklucza zespołu Conna. Wskazania do badań przesiewowych: nadciśnienie oporne na 3 leki, nadciśnienie z hipokaliemią (spontaniczną lub po małych dawkach diuretyków), nadciśnienie z incydentaloma nadnercza, nadciśnienie u osób <35. r.ż. oraz udar mózgu w młodym wieku.',
      },
      {
        title: 'Etap 1 i 2: Przesiewowy wskaźnik ARR i testy potwierdzenia',
        text: 'Przesiew opiera się na wskaźniku aldosteronowo-reninowym (ARR). W PA stwierdza się autonomicznie wysokie lub nieadekwatne stężenie aldosteronu przy stłumionym stężeniu reniny (DRC <5 mIU/l) lub aktywności reninowej osocza (ARO). Przy podwyższonym ARR kolejnym krokiem (poza chorymi z ciężką spontaniczną hipokaliemią i aldosteronem >20 ng/dl) jest test konfirmacyjny: test dożylnego obciążenia 0,9% NaCl (wlew 2 litrów soli w 4 h; u zdrowego człowieka sól hamuje aldosteron <5 ng/dl, w PA brak supresji >10 ng/dl) lub doustny test z fludrokortyzonem.',
      },
      {
        title: 'Etap 3: Cewnikowanie żył nadnerczowych (AVS) i terapia',
        text: 'Dwie główne przyczyny PA to: 1) Jednostronny gruczolak produkujący aldosteron (APA — klasyczny zespół Conna, ok. 35%), wyleczalny operacyjnie; 2) Obustronny idiopatyczny przerost kory nadnerczy (BAH, ok. 60%), leczony wyłącznie zachowawczo. Ponieważ tomografia komputerowa (TK) myli się w aż 40% przypadków (wykrywa niewydzielające incydentaloma po jednej stronie, podczas gdy mikrogruczolak APA ukrywa się po drugiej!), złotym standardem różnicowania przed operacją jest obustronne cewnikowanie żył nadnerczowych (Adrenal Vein Sampling — AVS). W APA wykonuje się laparoskopową adrenalektomię, a w BAH stosuje antagonistę aldosteronu: spironolakton (25–100 mg/d) lub eplerenon.',
      },
    ],
    table: {
      headers: ['Postać PA', 'Częstość', 'Wynik cewnikowania AVS', 'Leczenie z wyboru'],
      rows: [
        ['Jednostronny gruczolak (APA / Conn)', 'Ok. 35%', 'Lateralizacja wydzielania aldosteronu (gradient strona chora/zdrowa >4:1)', 'Laparoskopowa adrenalektomia jednostronna (wyleczenie)'],
        ['Obustronny przerost kory (BAH)', 'Ok. 60%', 'Brak lateralizacji (symetryczne wydzielanie z obu nadnerczy, wskaźnik <2:1)', 'Farmakoterapia: antagonista aldosteronu (spironolakton / eplerenon)'],
        ['Rzadki rak kory nadnerczy', '<1%', 'Masa >4–6 cm w TK, wysoka gęstość, niejednorodna struktura', 'Pilna otwarta adrenalektomia onkologiczna'],
      ],
    },
    advanced:
      'Jak ocenia się poprawność cewnikowania AVS? Ponieważ żyły nadnerczowe są drobne (zwłaszcza prawa uchodząca do VCI), kaniula może wypaść do żyły głównej. Aby to zweryfikować, w każdej próbce oznacza się kortyzol: wskaźnik selektywności (kortyzol w żyle nadnerczowej / kortyzol w żyle obwodowej) musi wynosić co najmniej >2:1 (bez stymulacji ACTH) lub >3–5:1 (przy ciągłym wlewie Synacthenu). Dopiero po potwierdzeniu selektywności oblicza się wskaźnik lateralizacji (stosunek aldo/kortyzol po stronie dominującej do aldo/kortyzol po stronie niedominującej >4:1).',
    summary:
      'Pierwotny hiperaldosteronizm to częsta przyczyna nadciśnienia tętniczego, w większości przypadków z prawidłowym potasem. Po podwyższonym wskaźniku ARR i teście z solą, cewnikowanie AVS decyduje o kwalifikacji do wyleczenia operacyjnego (adrenalektomia w APA) vs przewlekłej farmakoterapii spironolaktonem (w BAH).',
    sourceIds: ['endo_pa', 'pte_nadnercza'],
    questions: [
      q(
        'Czy prawidłowe stężenie potasu w surowicy krwi wyklucza u pacjenta pierwotny hiperaldosteronizm (zespół Conna)?',
        ['Nie, ponad 60–70% pacjentów z PA ma stężenie potasu w granicach normy (postać normokaliemiczna)', 'Hipokaliemia występuje głównie w ciężkich lub zaawansowanych postaciach choroby.'],
        ['Tak, brak hipokaliemii w 100% wyklucza chorobę', 'To niebezpieczny błąd diagnostyczny prowadzący do pomijania większości chorych.'],
        ['Prawidłowy potas występuje wyłącznie u dzieci', 'Postać normokaliemiczna dominuje we wszystkich grupach wiekowych dorosłych.']
      ),
      q(
        'Dlaczego badanie tomografii komputerowej (TK) nadnerczy nie jest wystarczające do podjęcia decyzji o adrenalektomii w PA?',
        ['W TK często uwidacznia się nieczynny gruczolak (incydentaloma), podczas gdy właściwy mikrogruczolak leży w drugim nadnerczu', 'TK nie ocenia czynności hormonalnej; może dojść do wycięcia zdrowego narządu i pozostawienia źródła choroby.'],
        ['TK nie potrafi odróżnić nadnercza od wątroby', 'Rozdzielczość nowoczesnej tomografii bez problemu identyfikuje narządy zaotrzewnowe.'],
        ['Promieniowanie rentgenowskie niszczy receptory aldosteronowe', 'Promieniowanie diagnostyczne nie wpływa na biochemię receptorową w tkankach.']
      ),
      q(
        'Jaka procedura jest uznawana za złoty standard w różnicowaniu jednostronnego gruczolaka (APA) od obustronnego przerostu nadnerczy (BAH)?',
        ['Obustronne cewnikowanie żył nadnerczowych (Adrenal Vein Sampling — AVS)', 'Pozwala na bezpośrednie porównanie gradientu stężeń aldosteronu po obu stronach.'],
        ['Biopsja aspiracyjna cienkoigłowa nadnerczy (BACC)', 'Biopsja jest przeciwwskazana w guzach nadnerczy ze względu na ryzyko powikłań i brak różnicowania histologycznego.'],
        ['Scyntygrafia kości całego ciała', 'Scyntygrafia kośćca służy do oceny przerzutów kostnych, a nie hiperaldosteronizmu.']
      ),
      q(
        'Jaki lek stanowi podstawę farmakoterapii u chorego z obustronnym przerostem nadnerczy (BAH)?',
        ['Antagonista receptora mineralokortykoidowego (spironolakton lub eplerenon)', 'Blokuje obwodowe działanie nadmiaru aldosteronu w nerkach i naczyniach krwionośnych.'],
        ['Syntetyczny hormon wzrostu (hGH)', 'Hormon wzrostu nie ma zastosowania w leczeniu nadciśnienia w zespole Conna.'],
        ['Duże dawki lewotyroksyny (LT4)', 'Lewotyroksyna to hormon tarczycy i nie leczy hiperaldosteronizmu.']
      ),
      q(
        'Czym charakteryzuje się wskaźnik ARR u pacjenta z pierwotnym hiperaldosteronizmem?',
        ['Podwyższonym stężeniem aldosteronu przy jednoczesnym stłumieniu reniny (wysoki iloraz ARR)', 'Autonomiczny nadmiar aldosteronu hamuje wydzielanie reniny drogą ujemnego sprzężenia zwrotnego.'],
        ['Bardzo wysokim stężeniem reniny i zerowym aldosteronem', 'Taki profil cechuje chorobę Addisona, a nie pierwotny hiperaldosteronizm.'],
        ['Całkowitym brakiem obu hormonów we krwi', 'W PA aldosteron jest produkowany w nadmiarze.']
      ),
    ],
  },
  {
    id: 'pheochromocytoma',
    moduleId: 'nadnercza',
    title: 'Bomba katecholaminowa',
    subtitle: 'Guz chromochłonny, triada objawów, wolne metanefryny i żelazna reguła blokady alfa przed beta',
    group: 'Nadczynności i guz chromochłonny',
    minutes: 18,
    goals: [
      'Rozpoznasz triadę objawów guza chromochłonnego: napadowy ból głowy, zlewne poty i kołatanie serca ze skokami ciśnienia.',
      'Zapamiętasz ratującą życie zasadę farmakoterapii: blokada alfa-adrenergiczna ZAWSZE musi poprzedzać włączenie beta-blokera!',
    ],
    sections: [
      {
        title: 'Czym jest guz chromochłonny i reguła 10%?',
        text: 'Guz chromochłonny (Pheochromocytoma — PCC) to rzadki nowotwór neuroendokrynny wywodzący się z komórek chromafinowych rdzenia nadnerczy produkujący katecholaminy. Guzy o identycznej strukturze zlokalizowane w zwojach współczulnych poza nadnerczami nazywamy paraganglioma (PGL). Dawniej obowiązywała „reguła 10%” (10% obustronne, 10% pozanadnerczowe, 10% złośliwe, 10% rodzinne). Dziś wiemy, że aż 35–40% guzów chromochłonnych ma podłoże genetyczne! Główne zespoły uwarunkowane genetycznie: MEN2A/MEN2B (mutacja RET), choroba von Hippla-Lindaua (VHL), nerwiakowłókniakowatość typu 1 (NF1) oraz mutacje genów dehydrogenazy bursztynianowej (SDHA, SDHB, SDHC, SDHD — SDHB wiąże się z wysokim ryzykiem złośliwości!).',
      },
      {
        title: 'Obraz kliniczny: Klasyczna triada i napadowość',
        text: 'Objawy wynikają z gwałtownego wyrzutu katecholamin: 1) Bóle głowy (nagłe, pulsujące); 2) Zlewne poty (zwłaszcza w górnej połowie ciała); 3) Palpitacje serca / tachykardia. Ta triada u chorego z napadowym lub utrwalonym nadciśnieniem tętniczym ma swoistość >90%! Towarzyszy jej bladość skóry (silny skurcz naczyń obwodowych pod wpływem receptorów alfa-1), drżenie rąk, lęk napadowy (uczucie zbliżającej się śmierci) oraz hipotensja ortostatyczna (z powodu przewlekłego obkurczenia łożyska naczyniowego i odruchowej hipowolemii). Czynniki wyzwalające wyrzut: ucisk brzucha, mikcja (w feo pęcherza), stres, znieczulenie ogólne, niektóre leki (metoklopramid, trójpierścieniowe leki przeciwdepresyjne, beta-blokery!).',
      },
      {
        title: 'Żelazna reguła hemodynamiczna: ALFA przed BETA!',
        text: 'ZASADA RATUJĄCA ŻYCIE: U chorego z guzem chromochłonnym NIGDY NIE WOLNO podać beta-blokera (np. propranololu, metoprololu) przed pełnym zablokowaniem receptorów alfa-adrenergicznych! Dlaczego? Beta-blokery blokują receptory beta-2 w naczyniach krwionośnych (które odpowiadają za fizjologiczne rozszerzanie naczyń). Pozostawia to krążące olbrzymie stężenia katecholamin z niczym nieprzeciwstawionym działaniem na receptory alfa-1 (nieprzeciwstawiony skurcz naczyniowy — unopposed alpha-stimulation)! Skutkiem jest natychmiastowy, katastrofalny skok ciśnienia tętniczego (np. do 280/160 mmHg), ostra niewydolność lewokomorowa, obrzęk płuc, udar krwotoczny mózgu i zgon pacjenta na stole! Prawidłowa sekwencja: najpierw nieselektywny alfa-bloker (fenoksybenzamina) lub selektywny (doksazosyna) przez 10–14 dni, a beta-bloker dołącza się dopiero po kilku dniach, jeśli utrzymuje się tachykardia.',
      },
    ],
    table: {
      headers: ['Krok postępowania', 'Lek / Działanie', 'Cel hemodynamiczny'],
      rows: [
        ['Krok 1 (10–14 dni przed operacją)', 'Alfa-adrenolityk: Fenoksybenzamina lub Doksazosyna', 'Rozszerzenie łożyska naczyniowego, normalizacja ciśnienia, opanowanie napadów'],
        ['Krok 2 (po 2–3 dniach blokady alfa)', 'Beta-adrenolityk: Propranolol lub Metoprolol (gdy tętno >80/min)', 'Zwolnienie czynności serca; BEZWZGLĘDNIE DOPIERO PO ALFA-BLOKERZE!'],
        ['Krok 3 (ostatnie 48–72h przed zabiegiem)', 'Nawadnianie dożylne (sól 0,9% NaCl) + bogatosolna dieta', 'Odtworzenie objętości krwi krążącej (wolemii), zapobieganie zapaści po wycięciu guza'],
        ['Krok 4 (Zabieg operacyjny)', 'Laparoskopowa adrenalektomia z delikatną manipulacją', 'Usunięcie guza; po zaklemowaniu żyły nadnerczowej gotowość na nagły spadek RR'],
      ],
    },
    advanced:
      'Przygotowanie przedoperacyjne ocenia się wg kryteriów Roizena: 1) Ciśnienie tętnicze <130/80 mmHg w pozycji siedzącej przez 24 godziny przed operacją; 2) Ciśnienie skurczowe w pozycji stojącej >90 mmHg (dopuszczalna łagodna hipotensja ortostatyczna potwierdzająca skuteczną blokadę alfa); 3) Brak zmian odcinka ST i załamka T w EKG przez co najmniej 2 tygodnie; 4) Liczba przedwczesnych pobudzeń komorowych <1 na 5 minut.',
    summary:
      'Guz chromochłonny to nowotwór rdzenia produkujący katecholaminy, w 40% uwarunkowany genetycznie. Wolne metanefryny w osoczu stanowią badanie z wyboru. Przygotowanie do operacji bezwzględnie wymaga wdrożenia blokady receptorów alfa-adrenergicznych na 10–14 dni PRZED ewentualnym włączeniem beta-blokera, aby uniknąć śmiertelnego przełomu nadciśnieniowego.',
    sourceIds: ['endo_pheo', 'pte_nadnercza'],
    questions: [
      q(
        'Dlaczego podanie beta-blokera jako pierwszego leku u pacjenta z guzem chromochłonnym jest kardynalnym błędem w sztuce lekarskiej?',
        ['Blokada receptorów naczyniowych beta-2 pozostawia nieprzeciwstawioną stymulację receptorów alfa-1, wywołując gwałtowny skurcz naczyń i przełom nadciśnieniowy', 'Powoduje to nagłą zapaść lewokomorową, obrzęk płuc lub udar mózgu.'],
        ['Beta-bloker natychmiast rozpuszcza torebkę guza i wywołuje krwawienie', 'Beta-adrenolityki nie wykazują działania cytolitycznego na tkankę guza.'],
        ['Beta-bloker przekształca adrenalinę w truciznę wątrobową', 'Katecholaminy są fizjologicznymi aminami, a nie toksynami wątrobowymi.']
      ),
      q(
        'Jaki lek należy wdrożyć jako pierwszy w ramach farmakologicznego przygotowania do operacji feochromocytoma?',
        ['Lek blokujący receptory alfa-adrenergiczne (np. fenoksybenzaminę lub doksazosynę)', 'Zapewnia to rozszerzenie łożyska naczyniowego i bezpieczną kontrolę ciśnienia tętniczego.'],
        ['Czysty beta-adrenolityk (propranolol)', 'Podanie beta-blokera jako pierwszego jest bezwzględnie przeciwwskazane.'],
        ['Wysokie dawki furosemidu w celu odwodnienia pacjenta', 'Odwodnienie nasiliłoby hipowolemię i doprowadziło do wstrząsu.']
      ),
      q(
        'Jaka jest klasyczna triada objawów napadowych sugerująca obecność guza chromochłonnego?',
        ['Ból głowy, zlewne poty i kołatanie serca (tachykardia)', 'Obecność tej triady u chorego z nadciśnieniem wykazuje ponad 90% swoistości dla feochromocytoma.'],
        ['Kaszel, krwioplucie i duszność wdechowa', 'To objawy ze strony układu oddechowego, a nie guza rdzenia nadnerczy.'],
        ['Biegunka tłuszczowa, świąd skóry i żółtaczka', 'To objawy cholestazy i chorób dróg żółciowych.']
      ),
      q(
        'Jaki odsetek guzów chromochłonnych i paraganglioma rozwija się w związku z mutacją germinalną (uwarunkowanie genetyczne)?',
        ['Aż około 35–40% wszystkich przypadków', 'Dlatego współczesne wytyczne zalecają zaoferowanie poradnictwa i testów genetycznych każdemu choremu z feo/PGL.'],
        ['Dokładnie 0% (wyłącznie mutacje nabyte środowiskowo)', 'Feochromocytoma to jeden z najsilniej uwarunkowanych genetycznie nowotworów u ludzi.'],
        ['Mniej niż 0,1%', 'Dawny pogląd o rzadkości mutacji rodzinnych został całkowicie zrewidowany.']
      ),
      q(
        'Dlaczego w ostatnich dobach przed operacją guza chromochłonnego zaleca się intensywne nawadnianie 0,9% NaCl i dietę bogatosolną?',
        ['W celu odtworzenia objętości krwi krążącej (wolemii) i zapobieżenia zapaści naczyniowej po wycięciu guza', 'Po usunięciu guza spada poziom katecholamin i bez nawodnienia dochodzi do ciężkiej hipotensji.'],
        ['Sól kuchenna neutralizuje komórki nowotworowe w krwioobiegu', 'Chlorek sodu nie wykazuje działania onkolitycznego.'],
        ['Aby celowo wywołać obrzęki obwodowe', 'Obrzęki są niepożądane; celem jest ewolemia łożyska naczyniowego.']
      ),
    ],
  },
  {
    id: 'incydentaloma-nadnercza',
    moduleId: 'nadnercza',
    title: 'Niespodzianka w tomografii',
    subtitle: 'Incydentaloma, gęstość natywna w TK (<10 HU), washout i algorytm ESE 2023',
    group: 'Nadczynności i guz chromochłonny',
    minutes: 17,
    goals: [
      'Zrozumiesz definicję incydentaloma nadnercza oraz zasady postępowania wg zaktualizowanych wytycznych ESE/ENSAT 2023.',
      'Opanujesz ocenę radiologiczną: gęstość natywną w jednostkach Hounsfielda (<10 HU) oraz kalkulację bezwzględnego i względnego washoutu.',
    ],
    sections: [
      {
        title: 'Czym jest incydentaloma nadnercza?',
        text: 'Incydentaloma nadnercza to bezobjawowa, przypadkowo wykryta zmiana ogniskowa o średnicy >=1 cm w badaniu obrazowym brzucha (USG, TK, MRI) wykonanym z innych wskazań niż podejrzenie choroby nadnerczy. Występuje u ok. 3–4% dorosłych w średnim wieku i nawet u 10% osób po 70. roku życia. Przed lekarzem stoją dwa fundamentalne pytania: 1) Czy zmiana jest złośliwa (rak kory nadnerczy ACC, przerzut z innego narządu)?; 2) Czy zmiana jest czynna hormonalnie (hiperkortyzolemia MACS, guz chromochłonny, zespół Conna)?',
      },
      {
        title: 'Ocena radiologiczna w TK: Złota reguła 10 jednostek Hounsfielda',
        text: 'Badaniem z wyboru do oceny incydentaloma jest dedykowana tomografia komputerowa nadnerczy (CT). KLUCZOWE KRYTERIUM: Gęstość natywna (bez podania kontrastu) mierzona w jednostkach Hounsfielda (HU): 1) Gęstość natywna <=10 HU: Zmiana jest łagodnym, bogatym w lipidy gruczolakiem kory nadnercza (lipid-rich adenoma)! Czułość wynosi 71%, a swoistość dla łagodności sięga niemal 100%. Zmiana taka nie wymaga dalszej diagnostyki obrazowej ani kontrolnych tomografii! 2) Gęstość natywna >10 HU: Zmiana jest uboga w lipidy (lipid-poor) — może to być łagodny gruczolak, ale także guz chromochłonny, przerzut nowotworowy lub rak kory nadnerczy (ACC). Wymaga wykonania protokołu wielofazowego z oceną wymywania kontrastu (washout) po 15 minutach.',
      },
      {
        title: 'Kalkulacja washoutu i panel hormonalny wg wytycznych ESE 2023',
        text: 'W TK wielofazowej mierzy się gęstość natywną (N), w fazie wrotnej po 60–70 s (E) oraz opóźnionej po 15 min (D): Bezwzględny wskaźnik wymywania APW = (E - D) / (E - N) * 100%. Wartość APW >=60% potwierdza łagodnego gruczolaka. Względny wskaźnik RPW = (E - D) / E * 100% (odcięcie >=40%). PANEL HORMONALNY u każdego pacjenta z incydentaloma: 1) Nocny test hamowania 1 mg deksametazonu (wykluczenie MACS); 2) Wolne metanefryny w osoczu (wykluczenie „cichego” feo); 3) Wskaźnik ARR (wyłącznie u chorych z nadciśnieniem tętniczym lub hipokaliemią). Biopsja nadnerczy jest przeciwwskazana, chyba że podejrzewa się przerzut u chorego z rozsianym nowotworem po wykluczeniu feochromocytoma!',
      },
    ],
    table: {
      headers: ['Cecha w badaniu TK', 'Zmiana łagodna (Gruczolak)', 'Podejrzenie złośliwości (ACC / Przerzut)'],
      rows: [
        ['Gęstość natywna (bez kontrastu)', '<=10 jednostek Hounsfielda (HU)', '>10 HU (często 20–40 HU lub więcej)'],
        ['Bezwzględny washout (APW po 15 min)', '>=60% (szybkie wypłukiwanie kontrastu)', '<60% (opóźnione wypłukiwanie, przetrwałe wzmocnienie)'],
        ['Wymiary zmiany', 'Zazwyczaj mała (<3–4 cm)', 'Często duża (>4–6 cm); nieregularne obrysy, martwica'],
        ['Postępowanie wg ESE 2023', 'Brak dalszych badań obrazowych przy <=10 HU i braku hipersekrecji', 'Konsultacja konsylium wielodyscyplinarnego, adrenalektomia'],
      ],
    },
    advanced:
      'Dlaczego wytyczne ESE 2023 zrezygnowały z powtarzania badań TK po roku u chorych z jednoznacznie łagodnym obrazem (<=10 HU)? Ponieważ wielotysięczne prospektywne rejestry wykazały, że ryzyko transformacji złośliwej małego gruczolaka o gęstości <=10 HU wynosi niemal 0%, podczas gdy powtarzanie badań tomograficznych naraża pacjentów na niepotrzebne promieniowanie jonizujące i indukuje lęk onkologiczny. Ponowną ocenę hormonalną (test 1 mg DEX) zleca się tylko wtedy, gdy pojawią się nowe objawy kliniczne (nowo wykryte nadciśnienie, cukrzyca).',
    summary:
      'Incydentaloma nadnercza wymaga natychmiastowej oceny gęstości natywnej w TK: wynik <=10 HU potwierdza łagodnego gruczolaka. Obowiązuje panel hormonalny (1 mg DEX, metanefryny, a przy nadciśnieniu ARR). Zmiany >4 cm o niejednorodnej strukturze i słabym wash-oucie wymagają pilnej oceny w kierunku raka nadnerczy.',
    sourceIds: ['ese_incidentaloma', 'pte_nadnercza', 'pte_macs'],
    questions: [
      q(
        'Jaka wartość gęstości natywnej w tomografii komputerowej bez kontrastu (TK) pozwala uznać incydentaloma nadnercza za łagodnego gruczolaka bez konieczności dalszych badań obrazowych?',
        ['Gęstość natywna równa lub mniejsza niż 10 jednostek Hounsfielda (<=10 HU)', 'Wartość ta świadczy o wysokiej zawartości lipidów wewnątrzkomórkowych, co cechuje łagodne gruczolaki.'],
        ['Gęstość równa dokładnie 100 HU', 'Gęstość 100 HU odpowiada zwapnieniom lub kościom, a nie gruczolakowi bogatemu w tłuszcz.'],
        ['Gęstość ujemna poniżej minus 200 HU', 'Gęstość <-100 HU cechuje tkankę płucną lub powietrze.'],
      ),
      q(
        'Jaki zestaw badań hormonalnych należy obligatoryjnie wykonać u KAŻDEGO pacjenta z przypadkowo wykrytym guzem nadnercza?',
        ['Nocny test hamowania 1 mg deksametazonu oraz wolne metanefryny w osoczu (a u chorych z nadciśnieniem także wskaźnik ARR)', 'Pozwala to wykryć autonomiczną sekrecję kortyzolu (MACS), guza chromochłonnego oraz zespół Conna.'],
        ['Wyłącznie badanie ogólne moczu paskiem testowym', 'Badanie ogólne moczu nie diagnozuje czynności wydzielniczej kory i rdzenia nadnerczy.'],
        ['Doustny test tolerancji glukozy z hormonem wzrostu', 'Test ten służy do diagnostyki akromegalii w przysadce, a nie incydentaloma nadnercza.']
      ),
      q(
        'Dlaczego biopsja aspiracyjna cienkoigłowa (BACC) jest rutynowo PRZECIWWSKAZANA w diagnostyce incydentaloma nadnerczy?',
        ['Nie potrafi odróżnić łagodnego gruczolaka od raka kory nadnerczy (ACC), a nakłucie feochromocytoma grozi śmiertelnym przełomem', 'Dodatkowo niesie ryzyko rozsiewu komórek raka wzdłuż kanału wkłucia.'],
        ['Igła biopsyjna nie może przebić powięzi Geroty', 'Powięź Geroty jest łatwo osiągalna pod kontrolą USG lub TK.'],
        ['W nadnerczu nie ma komórek jądrzastych', 'Nadnercze składa się z gęstego utkania komórkowego.']
      ),
      q(
        'Jaka wartość bezwzględnego współczynnika wymywania kontrastu (APW) w tomografii z opóźnioną fazą po 15 min przemawia za łagodnym charakterem zmiany?',
        ['Wartość APW równa co najmniej 60% (>=60%)', 'Szybkie oddawanie kontrastu jest typową cechą unaczynienia łagodnych gruczolaków.'],
        ['Wartość APW poniżej 10%', 'Słabe wymywanie (<60%) cechuje nowotwory złośliwe i przerzuty.'],
        ['Wartość APW dokładnie 0%', 'Brak wymywania wskazuje na tkankę podejrzaną onkologicznie.']
      ),
      q(
        'U 60-latka wykryto w TK guz lewego nadnercza 2,2 cm o gęstości natywnej 4 HU. W teście 1 mg DEX kortyzol wynosi 1,2 µg/dl, metanefryny w normie. Jakie jest zalecenie wg wytycznych ESE 2023?',
        ['Nie wymaga dalszych kontrolnych badań obrazowych ani powtarzania tomografii komputerowej', 'Guz jest jednoznacznie łagodny i nieczynny hormonalnie; nie wymaga radioterapii ani operacji.'],
        ['Pilna operacja obustronnego wycięcia nadnerczy w ciągu 24 godzin', 'Wycięcie łagodnego, bezobjawowego gruczolaka o wymiarach 2 cm jest błędem.'],
        ['Wykonanie biopsji gruboigłowej z obu stron', 'Biopsja jest przeciwwskazana w łagodnym incydentaloma.']
      ),
    ],
  },
  {
    id: 'przelom-nadnerczowy',
    moduleId: 'nadnercza',
    title: 'Gdy ciśnienie spada do zera',
    subtitle: 'Ostry przełom nadnerczowy, wstrząs hipowolemiczny i natychmiastowy protokół ratunkowy',
    group: 'Stany nagłe i chirurgia',
    minutes: 18,
    goals: [
      'Rozpoznasz objawy alarmowe ostrego przełomu nadnerczowego: wstrząs oporny na katecholaminy, silne bóle brzucha, hiponatremia, hiperkaliemia, hipoglikemia.',
      'Wdrożysz natychmiastowy protokół ratunkowy: dożylny bolus 100 mg hydrokortyzonu i intensywne nawadnianie 0,9% NaCl bez czekania na wyniki badań!',
    ],
    sections: [
      {
        title: 'Mechanizm: Dlaczego dochodzi do ostrej zapaści?',
        text: 'Ostry przełom nadnerczowy (Adrenal Crisis — AC) to stan bezpośredniego zagrożenia życia wynikający z ostrego, bezwzględnego niedoboru glikokortykosteroidów. Kortyzol wywodzi swoje działanie naczyniowe permisywnie: warunkuje wrażliwość receptorów adrenergicznych na krążące katecholaminy. W jego braku mięśniówka naczyń krwionośnych wiotczeje, dochodzi do uogólnionego rozszerzenia naczyń (vasoplegia), załamania oporu obwodowego i wstrząsu hemodynamicznego opornego na płyny i katecholaminy! Czynniki wyzwalające: ostra infekcja przewodu pokarmowego (wymioty uniemożliwiają wchłonięcie tabletki), zakażenie z gorączką, uraz, zabieg chirurgiczny lub nagłe przerwanie leczenia.',
      },
      {
        title: 'Triada kliniczna imitująca „ostry brzuch”',
        text: 'Obraz kliniczny przełomu bywa podstępny: 1) Ciężka hipotensja (skurczowe RR <80–90 mmHg) ze skłonnością do zapaści krążeniowej; 2) Gwałtowne osłabienie, senność, splątanie lub śpiączka; 3) Zespół rzekomego ostrego brzucha (pseudoperitonitis): silne, kurczowe bóle brzucha z nudnościami, wymiotami i obroną mięśniową. Wielu chorych z nierozpoznanym Addisonem w przełomie trafia na stół operacyjny z podejrzeniem perforacji wyrostka lub niedrożności! W badaniach laboratoryjnych: hiponatremia, ciężka hiperkaliemia (w pierwotnej niedoczynności), hipoglikemia (grożąca drgawkami, szczególnie u dzieci i osób szczupłych) oraz kwasica metaboliczna.',
      },
      {
        title: 'Złoty protokół ratunkowy: Czas to życie',
        text: 'ŻELAZNA ZASADA RATOWNICZA: Przy podejrzeniu przełomu nadnerczowego leczenie należy rozpocząć NATYCHMIAST — zwłoka w oczekiwaniu na wyniki laboratoryjne stwarza bezpośrednie ryzyko zgonu! PROTOKÓŁ RATUNKOWY: 1) Hydrokortyzon: natychmiast 100 mg w bolusie dożylnym (i.v.), a następnie 200 mg na dobę (w ciągłym wlewie i.v. lub 50 mg co 6 godzin i.v./i.m.); 2) Płynoterapia: szybki wlew 1000 ml 0,9% NaCl w ciągu 1. godziny, a łącznie 3–4 litry soli w ciągu pierwszych 24 godzin; 3) Wyrównanie hipoglikemii: dodanie 5% lub 10% glukozy do wlewów; 4) Fludrokortyzon w ostrej fazie jest ZBĘDNY, ponieważ hydrokortyzon w dawce >50–100 mg/dobę całkowicie wysyca receptory mineralokortykosteroidowe!',
      },
    ],
    table: {
      headers: ['Krok resuscytacji', 'Dawka / Preparat', 'Cel kliniczny i zasada bezpieczeństwa'],
      rows: [
        ['Bolus sterydowy (Stat!)', '100 mg Hydrokortyzonu i.v. (natychmiast)', 'Przywrócenie napięcia naczyniowego i permisyjnego działania katecholamin'],
        ['Podtrzymanie sterydowe', '200 mg Hydrokortyzonu / 24h (wlew ciągły lub 50 mg co 6h)', 'Zapewnienie stałego poziomu osoczowego przez pierwszą dobę'],
        ['Resuscytacja płynowa', '0,9% NaCl (1 l w 1. godzinie, łącznie 3–4 l / 24h)', 'Wyrównanie hipowolemii i hiponatremii; ochrona przed wstrząsem'],
        ['Wyrównanie hipoglikemii', 'Wlew 5% lub 10% glukozy i.v.', 'Ochrona mózgowia przed encefalopatią hipoglikemiczną'],
      ],
    },
    advanced:
      'Co zrobić, jeśli pacjent w stanie wstrząsu nie ma wcześniej ustalonego rozpoznania niedoczynności nadnerczy, a chcemy potwierdzić diagnozę? Pobierz jedną probówkę krwi na skrzep (oznaczenie kortyzolu i ACTH) i BEZ CZEKANIA na wynik podaj 100 mg hydrokortyzonu! Jeśli to niemożliwe, alternatywnie można podać dożylnie 4 mg deksametazonu — deksametazon nie interferuje z przeciwciałami w testach immunoenzymatycznych oznaczających endogenny kortyzol, co pozwala na jednoczesne wykonanie testu stymulacji z Synacthenem.',
    summary:
      'Przełom nadnerczowy to ostry stan zagrożenia życia przebiegający ze wstrząsem naczyniowym, bólami brzucha i zaburzeniami elektrolitowymi. Ratunek polega na natychmiastowym podaniu 100 mg hydrokortyzonu i.v. oraz intensywnej płynoterapii 0,9% NaCl przed oczekiwaniem na wyniki badań.',
    sourceIds: ['adrenal_crisis', 'endo_pai', 'pte_nadnercza'],
    questions: [
      q(
        'Jaki lek i w jakiej dawce należy podać natychmiast w bolusie dożylnym choremu z podejrzeniem ostrego przełomu nadnerczowego?',
        ['Hydrokortyzon w dawce 100 mg i.v.', 'Jest to lek pierwszego rzutu ratujący życie, podawany natychmiast bez czekania na wyniki laboratoryjne.'],
        ['Furosemid 80 mg dożylnie', 'Lek moczopędny pogłębiłby wstrząs hipowolemiczny i doprowadził do zatrzymania krążenia.'],
        ['Insulinę krótko działającą w bolusie', 'Insulina pogłębiłaby hipoglikemię, wywołując śpiączkę hipoglikemiczną i drgawki.']
      ),
      q(
        'Dlaczego w ostrej fazie leczenia przełomu nadnerczowego nie ma potrzeby podawania fludrokortyzonu?',
        ['Hydrokortyzon w dawkach powyżej 50–100 mg/dobę w pełni nasyca receptory mineralokortykosteroidowe (MR)', 'Wykazuje wówczas maksymalne działanie zatrzymujące sód i wydalające potas.'],
        ['Fludrokortyzon rozkłada się w soli fizjologicznej', 'Fludrokortyzon nie ulega rozkładowi, jest lekiem doustnym.'],
        ['Mineralokortykosteroidy w przełomie są trucizną dla nerek', 'Fludrokortyzon nie jest nefrotoksyczny, po prostu jest zastąpiony przez dużą dawkę hydrokortyzonu.']
      ),
      q(
        'Z jakim stanem chirurgicznym najczęściej bywa mylony ostry przełom nadnerczowy z powodu objawów brzusznych?',
        ['Z ostrym brzuchem (np. zapaleniem otrzewnej, perforacją wrzodu)', 'Ciężkie kurczowe bóle brzucha i wymioty mogą imitować chirurgiczną katastrofę brzuszną.'],
        ['Z kamicą ślinianki przyusznej', 'Kamica ślinianki nie wywołuje wstrząsu ani bólów brzucha.'],
        ['Ze złamaniem kości podudzia', 'Objawy przełomu dotyczą układu krążenia i jamy brzusznej.']
      ),
      q(
        'Jaki płyn infuzyjny stanowi podstawę resuscytacji płynowej w pierwszej dobie przełomu nadnerczowego?',
        ['0,9% roztwór chlorku sodu (NaCl) w objętości 3–4 litrów na dobę', 'Uzupełnia utracony sód i odtwarza objętość wewnątrznaczyniową.'],
        ['Czysta woda destylowana w szybkim wlewie i.v.', 'Wlew czystej wody wywołałby natychmiastową hemolizę erytrocytów i zgon.'],
        ['Roztwór 20% mannitolu', 'Mannitol jako diuretyk osmotyczny nasiliłby odwodnienie chorego.']
      ),
      q(
        'Jaki steryd można zastosować u chorego we wstrząsie, jeśli planujemy równoczesne wykonanie testu z Synacthenem, bez fałszowania oznaczenia kortyzolu?',
        ['Deksametazon (np. 4 mg i.v.)', 'Deksametazon nie jest wykrywany w standardowych testach immunoenzymatycznych mierzących kortyzol.'],
        ['Hydrokortyzon w megadawkach', 'Hydrokortyzon to bioidentyczny kortyzol i podwyższy jego stężenie we krwi do wartości tysięcznych.'],
        ['Fludrokortyzon domięśniowo', 'Fludrokortyzon nie jest lekiem z wyboru w ostrej resuscytacji glikokortykosteroidowej.']
      ),
    ],
  },
  {
    id: 'rak-nadnercza',
    moduleId: 'nadnercza',
    title: 'Złowrogi cień w przestrzeni zaotrzewnowej',
    subtitle: 'Rak kory nadnerczy (ACC), kryteria Weissa, ocena resekcyjności i leczenie mitotanem',
    group: 'Stany nagłe i chirurgia',
    minutes: 17,
    goals: [
      'Poznasz cechy kliniczne i radiologiczne raka kory nadnerczy (Adrenocortical Carcinoma — ACC).',
      'Zrozumiesz kryteria histopatologiczne skali Weissa oraz zasady terapii adjuwantowej mitotanem i leczenia skojarzonego.',
    ],
    sections: [
      {
        title: 'Epidemiologia, obraz kliniczny i zespół wielohormonalny',
        text: 'Rak kory nadnerczy (Adrenocortical Carcinoma — ACC) to rzadki, lecz niezwykle agresywny nowotwór złośliwy (zapadalność 0,5–2 przypadków na milion na rok). Wykazuje dwa szczyty zachorowań: wczesne dzieciństwo (<5. r.ż.) oraz 4.–5. dekada życia. Około 60% guzów jest czynnych hormonalnie: najbardziej charakterystyczna jest mieszana hipersekrecja — jednoczesny zespół Cushinga oraz wirylizacja u kobiet (nadmiar kortyzolu + DHEA-S/testosteron) lub feminizacja u mężczyzn (nadmiar estrogenów). Szybko narastający zespół Cushinga z hirsutyzmem i łysieniem androgenowym u kobiety w średnim wieku jest klasycznym objawem alarmowym ACC!',
      },
      {
        title: 'Diagnostyka obrazowa i skala histopatologiczna Weissa',
        text: 'W badaniach obrazowych (TK/MRI) raki kory nadnerczy to zazwyczaj duże guzy (>4–6 cm, nierzadko >10–15 cm), o niejednorodnej strukturze (heterogenne), z obszarami martwicy, krwotoków i nieregularnymi zwapnieniami, wykazujące gęstość natywną >20–30 HU i powolny wash-out (<60%). Często naciekają torebkę, żyłę nerkową i żyłę główną dolną. ZŁOTY STANDARD HISTOPATOLOGICZNY: Skala Weissa oparta na 9 cechach mikroskopowych (m.in. wysoki indeks mitotyczny >5 figur podziału na 50 pól widzenia, atypowe figury podziału, martwica, naciekanie torebki i naczyń). Obecność co najmniej >=3 kryteriów Weissa jednoznacznie definiuje nowotwór złośliwy!',
      },
      {
        title: 'Leczenie: Radykalna chirurgia i farmakoterapia mitotanem',
        text: 'Jedyną szansą na całkowite wyleczenie ACC jest doszczętna resekcja chirurgiczna R0 (otwarta adrenalektomia z usunięciem regionalnych węzłów chłonnych i sąsiednich tkanek). Chirurgii laparoskopowej unika się w guzach podejrzanych o ACC z powodu ryzyka pęknięcia torebki i rozsiewu otrzewnowego. Po operacji standardem adjuwantowym (zwłaszcza przy Ki-67 >10%) jest MITOTAN (o,p\'-DDD) — chemioterapeutyk o selektywnym działaniu adrenolitycznym, niszczący mitochondria kory nadnerczy. Mitotan wymaga monitorowania stężenia we krwi (okno terapeutyczne 14–20 mg/l) oraz OBOWIĄZKOWEJ substytucji hydrokortyzonem w podwójnych dawkach (mitotan silnie indukuje enzym CYP3A4, przyspieszając rozkład hydrokortyzonu!). W chorobie zaawansowanej stosuje się schemat EDP-M (etopozyd, doksorubicyna, cisplatyna + mitotan).',
      },
    ],
    table: {
      headers: ['Etap leczenia / Narzędzie', 'Opis postępowania', 'Kluczowe uwagi kliniczne'],
      rows: [
        ['Chirurgia radykalna (R0)', 'Otwarta adrenalektomia z limfadenektomią', 'Podstawa wyleczenia; unikać laparoskopii przy podejrzeniu ACC z torebką'],
        ['Skala Weissa', '9 cech histopatologicznych (atypia, martwica, mitozy)', 'Wynik >=3 kryteriów potwierdza rozpoznanie raka kory nadnerczy'],
        ['Mitotan (adjuwant)', 'Lek adrenolityczny niszczący korę nadnerczy', 'Okno terapeutyczne 14–20 mg/l; wymaga wysokich dawek hydrokortyzonu'],
        ['Chemioterapia EDP-M', 'Etopozyd + Doksorubicyna + Cisplatyna + Mitotan', 'Standard pierwszego rzutu w chorobie zaawansowanej / przerzutowej'],
      ],
    },
    advanced:
      'Dlaczego chory leczony mitotanem wymaga znacznie wyższych dawek hydrokortyzonu niż w klasycznej chorobie Addisona? Mitotan działa dwukierunkowo: 1) Niszczy zdrową i nowotworową korę nadnerczy, wywołując pełną niedoczynność; 2) Jest potężnym induktorem enzymów mikrosomalnych wątroby (zwłaszcza izoenzymu cytochromu CYP3A4), przez co podawany doustnie hydrokortyzon ulega błyskawicznej inaktywacji; 3) Zwiększa stężenie białka CBG we krwi. Dlatego dawka dobowa hydrokortyzonu u chorych na mitotanie wynosi często 40–60 mg/dobę (zamiast standardowych 20 mg), a dawkę monitoruje się stanem klinicznym i poziomem wolnego kortyzolu.',
    summary:
      'Rak kory nadnerczy (ACC) to wysoce złośliwy nowotwór objawiający się zespołem Cushinga z wirylizacją i dużą masą w TK. O rozpoznaniu decyduje skala Weissa (>=3 kryteria). Leczeniem z wyboru jest otwarta operacja R0 oraz terapia mitotanem wymagająca specjalistycznego nadzoru stężeń i substytucji sterydowej.',
    sourceIds: ['ese_acc', 'pte_nadnercza'],
    questions: [
      q(
        'Jaki obraz kliniczny i hormonalny u kobiety w średnim wieku silnie nasuwa podejrzenie raka kory nadnerczy (ACC)?',
        ['Gwałtownie narastający zespół Cushinga ze współistniejącą wirylizacją (hirsutyzm, łysienie androgenowe, nadmiar DHEA-S)', 'Mieszana sekrecja kortyzolu i androgenów jest wysoce charakterystyczna dla raka nadnercza.'],
        ['Stopniowe rozjaśnienie powłok skórnych bez zmian masy ciała', 'Brak objawów nie cechuje agresywnego raka kory.'],
        ['Niskie stężenie wszystkich steroidów z hiperkaliemią', 'Taki obraz cechuje chorobę Addisona, a nie nowotwór wydzielający hormony.']
      ),
      q(
        'Ile kryteriów w mikroskopowej skali Weissa definiuje złośliwy charakter nowotworu kory nadnerczy (ACC)?',
        ['Obecność co najmniej 3 kryteriów (>=3 z 9)', 'Jest to powszechnie akceptowany w patomorfologii punkt odcięcia potwierdzający złośliwość.'],
        ['Wszystkie 9 kryteriów musi być obecnych', 'Obecność 9 kryteriów cechuje skrajnie zaawansowane postacie; do rozpoznania raka wystarczą 3.'],
        ['Żadne kryterium, o raku decyduje wyłącznie średnica powyżej 1 cm', 'Wymiary guza są istotne klinicznie, lecz definicja złośliwości jest histopatologiczna.']
      ),
      q(
        'Jaki lek o selektywnym działaniu adrenolitycznym stanowi standard terapii uzupełniającej u chorych na raka kory nadnerczy?',
        ['Mitotan (o,p\'-DDD)', 'Mitotan wybiórczo uszkadza mitochondria komórek kory nadnerczy i hamuje syntezę steroidów.'],
        ['Spironolakton', 'Spironolakton blokuje receptor aldosteronowy, nie niszczy komórek nowotworowych.'],
        ['Metformina', 'Metformina to doustny lek przeciwcukrzycowy, bez działania adrenolitycznego.']
      ),
      q(
        'Dlaczego u pacjenta przyjmującego mitotan dawka substytucyjna hydrokortyzonu musi być istotnie wyższa niż u standardowego chorego z niedoczynnością kory?',
        ['Mitotan silnie indukuje wątrobowy enzym CYP3A4, co drastycznie przyspiesza obwodowy metabolizm i rozkład hydrokortyzonu', 'Wymaga to zwiększenia dawki sterydu nawet 2–3-krotnie, aby zapobiec przełomowi nadnerczowemu.'],
        ['Mitotan bezpośrednio wiąże hydrokortyzon w żołądku w nierozpuszczalny kamień', 'Leki te nie reagują chemicznie w świetle przewodu pokarmowego.'],
        ['Mitotan regeneruje przysadkowe ACTH', 'Mitotan nie regeneruje osi przysadkowej.']
      ),
      q(
        'Jaki dostęp operacyjny jest zalecany przez wytyczne ESE/ENSAT w przypadku guzów nadnercza o cechach podejrzenia raka kory nadnerczy (ACC)?',
        ['Zabieg klasyczny otwarty z regionalną limfadenektomią (otwarta adrenalektomia)', 'Zapobiega to pęknięciu torebki guza i miejscowemu rozsiewowi komórek nowotworowych w jamie otrzewnej.'],
        ['Zabieg laparoskopowy przez pojedyncze nacięcie 5 mm', 'W guzach złośliwych laparoskopia wiąże się ze zwiększonym ryzykiem wznowy miejscowej.'],
        ['Przezcewnikowa termoablacja mikrofalowa', 'Ablacja termiczna nie zapewnia radykalności onkologicznej R0.']
      ),
    ],
  },
  {
    id: 'adrenalektomia',
    moduleId: 'nadnercza',
    title: 'W rękach chirurga',
    subtitle: 'Chirurgia kory i rdzenia, adrenalektomia laparoskopowa i opieka anestezjologiczna',
    group: 'Stany nagłe i chirurgia',
    minutes: 16,
    goals: [
      'Poznasz techniki operacyjne: laparoskopową adrenalektomię przezotrzewnową (TLA) vs zaotrzewnową (PRA) oraz wskazania do operacji otwartej.',
      'Opanujesz zasady okołooperacyjnego nadzoru hemodynamicznego i substytucyjnego po wycięciu guzów wydzielających hormony.',
    ],
    sections: [
      {
        title: 'Współczesna chirurgia nadnerczy: TLA vs PRA',
        text: 'Złotym standardem w usuwaniu łagodnych guzów kory i rdzenia nadnerczy o średnicy <6 cm jest chirurgia małoinwazyjna. Dwie główne techniki: 1) Przezotrzewnowa adrenalektomia laparoskopowa (Transperitoneal Laparoscopic Adrenalectomy — TLA): chory ułożony na boku (kąt 45–60°); technika zapewnia doskonały, szeroki wgląd anatomiczny i dużą przestrzeń operacyjną, co jest zaletą w większych guzach (4–6 cm); 2) Tylna zaotrzewnowa adrenalektomia retroperitoneoskopowa (Posterior Retroperitoneoscopic Adrenalectomy — PRA): chory ułożony na brzuchu zgięty w stawach biodrowych; dostęp bezpośrednio przez przestrzeń zaotrzewnową pod 12. żebrem omija jamę otrzewną! Zaletą PRA jest brak manipulacji na jelitach, brak zrostów po wcześniejszych operacjach brzusznych oraz mniejszy ból pooperacyjny.',
      },
      {
        title: 'Śródoperacyjne pułapki naczyniowe i hemodynamiczne',
        text: 'Chirurgia nadnerczy wymaga niezwykłej precyzji ze względu na bliskość wielkich pni naczyniowych: 1) Prawe nadnercze: leży za wątrobą i bezpośrednio przylega do żyły głównej dolnej (VCI). Krótka prawa żyła nadnerczowa uchodzi wprost do VCI — jej przypadkowe naderwanie prowadzi do dramatycznego, zagrażającego życiu krwawienia żylnego; 2) Lewe nadnercze: leży za ogonem trzustki i naczyniami śledzionowymi. Lewa żyła nadnerczowa uchodzi do lewej żyły nerkowej, często łącząc się z żyłą przeponową dolną. W guzach chromochłonnych kluczowe jest delikatne preparowanie guza bez uciskania (touch-free technique): każdy ucisk guza powoduje masywny wyrzut katecholamin i skok RR >250 mmHg, a po podwiązaniu żyły głównej guza dochodzi do gwałtownego załamania ciśnienia!',
      },
      {
        title: 'Nadzór pooperacyjny: Zapaść hemodynamiczna vs substytucja sterydowa',
        text: 'Opieka pooperacyjna różni się diametralnie w zależności od typu usuniętego guza: 1) Po wycięciu feochromocytoma: z powodu nagłego zniknięcia katecholamin i rozszerzenia naczyń głównym zagrożeniem jest ciężka hipotensja — chory wymaga agresywnego podawania krystaloidów i monitorowania glikemii (ryzyko hipoglikemii z odbicia po odblokowaniu wydzielania insuliny!); 2) Po wycięciu gruczolaka wydzielającego kortyzol (Cushing/MACS): z powodu atrofii drugiego nadnercza pacjent musi otrzymać dożylny wlew hydrokortyzonu (100 mg/dobę) w trakcie operacji i w 1. dobie, a następnie przejść na doustną substytucję; 3) Po wycięciu gruczolaka Conna (APA): natychmiast odstawia się spironolakton i suplementy potasu, monitorując potas (ryzyko przejściowej hiperkaliemii z powodu uśpienia drugiego nadnercza).',
      },
    ],
    table: {
      headers: ['Jednostka operowana', 'Główne zagrożenie pooperacyjne', 'Postępowanie okołooperacyjne'],
      rows: [
        ['Guz chromochłonny (Pheo)', 'Nagła hipotensja po zaklipsowaniu żyły; hipoglikemia z odbicia', 'Intensywna płynoterapia 0,9% NaCl, wlewy glukozy, monitorowanie inwazyjne'],
        ['Guz kortyzolowy (Cushing/MACS)', 'Ostry przełom nadnerczowy z powodu atrofii drugiego gruczołu', 'Śródoperacyjny bolus hydrokortyzonu, następnie 100 mg/24h i.v. $\\to$ doustnie'],
        ['Gruczolak aldosteronowy (Conn)', 'Przejściowa hiperkaliemia po operacji (uśpienie ZG po drugiej stronie)', 'Odstawić suplementy potasu i spironolakton; kontrolować K+ co 12h'],
        ['Podejrzenie raka ACC (>6 cm)', 'Pęknięcie torebki i miejscowy rozsiew nowotworu', 'Zabieg klasyczny otwarty z marginesem onkologicznym R0'],
      ],
    },
    advanced:
      'Częściowa (oszczędzająca korę) adrenalektomia (cortical-sparing adrenalectomy): W przypadku dziedzicznych postaci guza chromochłonnego (MEN2, VHL), w których ryzyko rozwoju obustronnych guzów wynosi 50–80%, usunięcie obu całych nadnerczy skazuje pacjenta na nieodwracalną jatrogenną chorobę Addisona. Współczesnym standardem w ośrodkach referencyjnych jest wówczas subtotalna adrenalektomia oszczędzająca co najmniej 15–30% zdrowej unaczynionej kory jednego z nadnerczy, co wystarcza do zachowania autonomicznej produkcji kortyzolu bez konieczności substytucji.',
    summary:
      'Chirurgia nadnerczy wykorzystuje techniki laparoskopowe (TLA, PRA) dla guzów łagodnych i dostęp otwarty dla raka ACC. Nadzór anestezjologiczny i pooperacyjny wymaga ścisłej wiedzy o profilu hormonalnym guza: zabezpieczenia płynowego po feo, osłony hydrokortyzonem w Cushinga i kontroli potasu w zespole Conna.',
    sourceIds: ['adrenal_surgery', 'endo_pheo', 'pte_nadnercza'],
    questions: [
      q(
        'Jaka technika chirurgiczna stanowi złoty standard leczenia łagodnych, hormonalnie czynnych guzów nadnercza o średnicy poniżej 6 cm?',
        ['Minimalnie inwazyjna laparoskopowa adrenalektomia (przezotrzewnowa TLA lub zaotrzewnowa PRA)', 'Zapewnia małą utratę krwi, niski ból pooperacyjny i szybki powrót chorego do sprawności.'],
        ['Rozległa torakolaparotomia z resekcją dolnych żeber', 'Dostęp ten rezerwuje się dla olbrzymich guzów złośliwych naciekających sąsiednie narządy.'],
        ['Wyłuszczenie guza łyżeczką kostną przez nakłucie lędźwiowe', 'Taka metoda nie istnieje w urologii i chirurgii endokrynologicznej.']
      ),
      q(
        'Dlaczego uszkodzenie prawej żyły nadnerczowej podczas operacji jest szczególnie niebezpieczne?',
        ['Prawa żyła nadnerczowa jest bardzo krótka i uchodzi bezpośrednio do żyły głównej dolnej (VCI), co grozi masywnym krwotokiem', 'Jej naderwanie wymaga natychmiastowego zaopatrzenia ściany VCI zagrażając zgonem z wykrwawienia.'],
        ['Prawa żyła nadnerczowa zawiera kwas solny', 'Żyły krążenia trzewnego prowadzą krew, a nie soki żołądkowe.'],
        ['Przez prawą żyłę nadnerczową przepływa cała żółć z wątroby', 'Drogi żółciowe nie mają łączności z naczyniami nadnerczowymi.']
      ),
      q(
        'Jakie powikłanie metaboliczne może wystąpić w pierwszych godzinach po pomyślnym usunięciu guza chromochłonnego?',
        ['Hipoglikemia z odbicia, spowodowana odblokowaniem wydzielania insuliny po nagłym spadku katecholamin', 'Katecholaminy stale hamowały komórki beta trzustki; ich zniknięcie wywołuje wyrzut insuliny.'],
        ['Kwasica ketonowa z hiperglikemią >500 mg/dl', 'Po operacji feo glikemia gwałtownie spada, a nie rośnie.'],
        ['Masywna hiperglikemia oporna na insulinoterapię', 'Należy monitorować chorego pod kątem hipoglikemii i podawać wlewy glukozy.']
      ),
      q(
        'Kiedy stosuje się operację oszczędzającą korę nadnercza (cortical-sparing adrenalectomy)?',
        ['W obustronnych guzach chromochłonnych w zespołach genetycznych (MEN2, VHL) w celu uniknięcia przewlekłej choroby Addisona', 'Pozostawienie 15–30% unaczynionego miąższu kory zapewnia wystarczającą produkcję kortyzolu.'],
        ['W każdym przypadku zaawansowanego raka kory nadnerczy ACC', 'W raku ACC zabieg musi być radykalny R0 z marginesem onkologicznym, a nie oszczędzający.'],
        ['U wszystkich chorych z otyłością olbrzymią bez guza', 'Brak guza nie stanowi wskazania do resekcji miąższu nadnerczy.']
      ),
      q(
        'Jakie postępowanie farmakologiczne należy wdrożyć bezpośrednio po wycięciu jednostronnego gruczolaka Conna (APA)?',
        ['Natychmiast odstawić suplementację potasu i spironolakton oraz kontrolować stężenie potasu w surowicy', 'Po usunięciu źródła hiperaldosteronizmu dalsze podawanie spironolaktonu groziłoby ciężką hiperkaliemią.'],
        ['Podwoić dawkę spironolaktonu na kolejne 6 miesięcy', 'Zwiększenie dawki po usunięciu guza jest poważnym błędem medycznym.'],
        ['Podać 100 mg fludrokortyzonu dożylnie', 'Fludrokortyzon w takiej dawce nie istnieje i byłby toksyczny.']
      ),
    ],
  },
];
