import { type DraftLesson, q } from './course-types.ts';

export const draftAdrenalPart1: DraftLesson[] = [
  {
    id: 'nadnercza-anatomia',
    moduleId: 'nadnercza',
    title: 'Fabryka hormonów stresu',
    subtitle: 'Anatomia, warstwy kory, rdzeń i szlaki sterydogenezy',
    group: 'Fundamenty',
    minutes: 15,
    goals: [
      'Poznasz trójwarstwową budowę kory nadnerczy (ZG, ZF, ZR) oraz neuroendokrynny charakter rdzenia.',
      'Zrozumiesz kluczowe szlaki sterydogenezy od cholesterolu do aldosteronu, kortyzolu i DHEA-S oraz asymetrię spływu żylnego.',
    ],
    sections: [
      {
        title: 'Anatomia, położenie i asymetria naczyniowa',
        text: 'Nadnercza to parzyste narządy położone zaotrzewnowo na górnych biegunach nerek, otoczone powięzią nerkową (Geroty) i tkanką tłuszczową. Prawe nadnercze ma kształt piramidalny, lewe półksiężycowaty. Unaczynienie tętnicze pochodzi z trzech źródeł (tętnice nadnerczowe górna, środkowa i dolna). Krytyczna różnica anatomiczna dotyczy spływu żylnego: prawa żyła nadnerczowa jest bardzo krótka (zaledwie kilka milimetrów) i uchodzi bezpośrednio do żyły głównej dolnej (VCI), podczas gdy lewa żyła nadnerczowa jest znacznie dłuższa i uchodzi do lewej żyły nerkowej. Ta asymetria ma fundamentalne znaczenie techniczne podczas cewnikowania żył nadnerczowych (AVS) oraz w chirurgii laparoskopowej.',
      },
      {
        title: 'Kora nadnerczy: Trzy strefy i ich wyspecjalizowane produkty',
        text: 'Kora stanowi ok. 80–90% masy narządu i dzieli się na trzy strefy (od zewnątrz do wewnątrz): 1) Strefa kłębuszkowa (zona glomerulosa — ZG, ok. 15%): syntetyzuje mineralokortykosteroidy, głównie aldosteron, regulowany przez układ RAA i stężenie potasu (niezależnie od ACTH!); 2) Strefa pasmowata (zona fasciculata — ZF, ok. 75%): syntetyzuje glikokortykosteroidy, przede wszystkim kortyzol, pod ścisłą kontrolą przysadkowego ACTH; 3) Strefa siatkowata (zona reticularis — ZR, ok. 10%): wytwarza androgeny nadnerczowe (DHEA, DHEA-S, androstendion), stymulowana przez ACTH. Złota mnemotechnika: GFR — Salt, Sugar, Sex (sól, cukier, seks).',
      },
      {
        title: 'Rdzeń nadnerczy i kaskada katecholamin',
        text: 'Rdzeń nadnerczy wywodzi się ektodermalnie z grzebienia nerwowego i stanowi zmodyfikowany zwój współczulny. Komórki chromafinowe (feochromocyty) są unerwione przez przedzwojowe cholinergiczne włókna współczulne. Syntetyzują one katecholaminy: tyrozyna $\\to$ DOPA $\\to$ dopamina $\\to$ noradrenalina $\\to$ adrenalina. Kluczowy fakt: enzym PNMT (N-metylotransferaza fenyloetanoloaminy), który przekształca noradrenalinę w adrenalinę, jest indukowany przez wysokie stężenia kortyzolu spływającego naczyniami wrotnymi z kory do rdzenia. Dlatego w rdzeniu nadnercza powstaje głównie adrenalina (ok. 80%), w odróżnieniu od zwojów współczulnych.',
      },
    ],
    table: {
      headers: ['Strefa / Część', 'Główny hormon', 'Mechanizm regulacji', 'Rola kliniczna'],
      rows: [
        ['Strefa kłębuszkowa (ZG)', 'Aldosteron', 'Układ RAA (angiotensyna II) i potas K+', 'Resorpcja sodu, wydalanie potasu, regulacja wolemii i RR'],
        ['Strefa pasmowata (ZF)', 'Kortyzol', 'Oś podwzgórze-przysadka (CRH $\\to$ ACTH)', 'Glukogeneza, lipoliza, modulacja odporności, adaptacja do stresu'],
        ['Strefa siatkowata (ZR)', 'DHEA, DHEA-S', 'ACTH (oraz czynniki obwodowe)', 'Prekursory obwodowych androgenów i estrogenów'],
        ['Rdzeń nadnerczy', 'Adrenalina (80%), Noradrenalina (20%)', 'Układ współczulny (acetylocholina)', 'Reakcja „walki lub ucieczki”, skurcz naczyń, glikogenoliza'],
      ],
    },
    advanced:
      'Wszystkie hormony steroidowe powstają z cholesterolu. Pierwszym i ograniczającym szybkość etapem jest transport cholesterolu z zewnętrznej do wewnętrznej błony mitochondrialnej przez białko StAR (Steroidogenic Acute Regulatory protein), a następnie odszczepienie łańcucha bocznego przez enzym CYP11A1 (P450scc) do pregnenolonu. Mutacje białka StAR prowadzą do wrodzonej lipoidowej hiperplazji nadnerczy (ciężki brak wszystkich steroidów). Syntaza aldosteronu (CYP11B2) występuje wyłącznie w strefie kłębuszkowej, co uniemożliwia produkcję aldosteronu w pozostałych strefach.',
    summary:
      'Nadnercza to podwójny narząd: steroidowa kora (ZG: aldosteron, ZF: kortyzol, ZR: androgeny) oraz neuroendokrynny rdzeń (adrenalina). Znajomość asymetrii żylnej i kaskady sterydogenezy jest warunkiem zrozumienia diagnostyki AVS i bloków enzymatycznych.',
    sourceIds: ['pte_nadnercza', 'endo_pa'],
    questions: [
      q(
        'Gdzie uchodzi prawa żyła nadnerczowa u człowieka?',
        ['Bezpośrednio do żyły głównej dolnej (VCI)', 'Prawa żyła nadnerczowa jest krótka i uchodzi wprost do przednio-bocznej ściany żyły głównej dolnej.'],
        ['Do prawej żyły nerkowej', 'Do żyły nerkowej uchodzi lewa żyła nadnerczowa, a nie prawa.'],
        ['Do żyły wrotnej wątroby', 'Nadnercza nie drenują krwi do układu wrotnego wątroby.']
      ),
      q(
        'Który czynnik stanowi główny fizjologiczny regulator wydzielania aldosteronu przez strefę kłębuszkową?',
        ['Układ renina-angiotensyna-aldosteron (Angiotensyna II) oraz stężenie potasu', 'Strefa kłębuszkowa odpowiada na spadek perfuzji nerek i hiperkaliemię, pozostając w dużej mierze niezależna od ACTH.'],
        ['Wydzielany z przysadki hormon ACTH', 'ACTH ma jedynie przejściowy, tonizujący wpływ na ZG; głównym regulatorem jest RAA.'],
        ['Stężenie insuliny we krwi', 'Insulina nie reguluje bezpośrednio syntezy aldosteronu w strefie kłębuszkowej.']
      ),
      q(
        'Dlaczego w rdzeniu nadnerczy powstaje głównie adrenalina, podczas gdy zwoje współczulne wydzielają niemal wyłącznie noradrenalinę?',
        ['Kortyzol spływający z kory indukuje enzym PNMT przekształcający noradrenalinę w adrenalinę', 'Wysokie lokalne stężenie glikokortykosteroidów aktywuje ekspresję N-metylotransferazy fenyloetanoloaminy.'],
        ['Rdzeń nadnerczy nie posiada enzymu hydroksylazy dopaminowej', 'Enzym ten jest obecny i niezbędny do wytwarzania noradrenaliny.'],
        ['W rdzeniu nie ma receptorów dla acetylocholiny', 'Komórki chromafinowe posiadają receptory nikotynowe i muskarynowe dla ACh.']
      ),
      q(
        'Jaki hormon jest głównym produktem strefy pasmowatej (zona fasciculata) kory nadnerczy?',
        ['Kortyzol', 'Kortyzol stanowi główny glikokortykosteroid syntetyzowany pod wpływem ACTH w strefie pasmowatej.'],
        ['Aldosteron', 'Aldosteron jest wytwarzany w strefie kłębuszkowej (ZG).'],
        ['DHEA-S', 'Siarczan dehydroepiandrosteronu to główny produkt strefy siatkowatej (ZR).']
      ),
      q(
        'Jakie białko transportowe odpowiada za pierwszy, ograniczający etap sterydogenezy (transport cholesterolu do wnętrza mitochondrium)?',
        ['Białko StAR (Steroidogenic Acute Regulatory protein)', 'Umożliwia transfer cholesterolu przez błony mitochondrialne do enzymu CYP11A1.'],
        ['Transkortyna (CBG)', 'Transkortyna transportuje kortyzol w osoczu, a nie cholesterol w komórce.'],
        ['Albumina surowicy', 'Albumina jest białkiem nośnikowym we krwi obwodowej.']
      ),
    ],
  },
  {
    id: 'nadnercza-diagnostyka',
    moduleId: 'nadnercza',
    title: 'Odszyfruj korę i rdzeń',
    subtitle: 'Rytm kortyzolu, test z Synacthenem, wskaźnik ARR i wolne metanefryny',
    group: 'Fundamenty',
    minutes: 17,
    goals: [
      'Opanujesz zasady oceny osi HPA: rytm dobowy kortyzolu, interpretację testu stymulacji Synacthenem (250 µg vs 1 µg).',
      'Zrozumiesz oznaczanie układu RAA (wskaźnik ARR) oraz wolnych metanefryn w osoczu bez błędów przedanalitycznych.',
    ],
    sections: [
      {
        title: 'Ocena wydolności osi HPA i pułapki laboratoryjne',
        text: 'Kortyzol wykazuje wyraźny rytm dobowy ze szczytem ok. 6:00–8:00 rano (prawidłowo 10–20 µg/dl lub 280–550 nmol/l) i nadirem o północy (<1,8 µg/dl lub <50 nmol/l). Pojedyncze poranne stężenie kortyzolu ma ograniczoną wartość: stężenie <3 µg/dl (<80 nmol/l) silnie sugeruje niedoczynność kory, a >15–18 µg/dl (>450 nmol/l) praktycznie ją wyklucza. Wartości pośrednie (3–15 µg/dl) bezwzględnie wymagają wykonania testu dynamicznego! Ponad 90% kortyzolu krąży związane z białkiem wiążącym kortykosteroidy (CBG / transkortyna). Estrogeny (doustna antykoncepcja hormonalna) zwiększają CBG, dając fałszywie wysoki kortyzol całkowity — antykoncepcję należy odstawić na 6 tygodni przed badaniem.',
      },
      {
        title: 'Złoty standard: Test stymulacji z syntetycznym ACTH (Synacthen)',
        text: 'Standardowy test z Synacthenem (tetracosactide) polega na dożylnym lub domięśniowym podaniu 250 µg syntetycznego ACTH 1-24 z pomiarem kortyzolu w 0, 30 i 60 minucie. Prawidłowa odpowiedź: w klasycznych testach immunochemicznych stężenie kortyzolu po stymulacji osiąga co najmniej >=18 µg/dl (500 nmol/l). W nowoczesnych testach chromatografii cieczowej ze spektrometrią mas (LC-MS/MS) oraz testach z monoklonalnymi przeciwciałami II generacji próg odcięcia wynosi 14–15 µg/dl (ok. 400–412 nmol/l) z uwagi na wyższą swoistość i brak reakcji krzyżowych. Brak wymaganego wzrostu potwierdza pierwotną niedoczynność kory nadnerczy. Uwaga kliniczna: w świeżej wtórnej niedoczynności nadnerczy (np. po operacji przysadki przed 4–6 tygodniami) kora nadnerczy nie zdążyła jeszcze zaniknąć i może prawidłowo odpowiedzieć na dawkę 250 µg Synacthenu! W tych przypadkach stosuje się test z małą dawką (1 µg) lub test hipoglikemii poinsulinowej (ITT).',
      },
      {
        title: 'Przesiew w kierunku Conna i Pheochromocytoma',
        text: 'W diagnostyce pierwotnego hiperaldosteronizmu przesiewem jest wskaźnik aldosteronowo-reninowy (ARR = stężenie aldosteronu / aktywność reninowa osocza ARO lub stężenie reniny DRC). Krew pobiera się rano po 2 godzinach pionizacji i 5–15 minutach siedzenia. Leki wpływające na RAA (spironolakton odstawić na 4–6 tyg., ACEI/ARB/beta-blokery na 2 tyg.) wymagają odstawienia lub zamiany na doksazosynę i werapamil. Z kolei w diagnostyce guza chromochłonnego testem z wyboru jest pomiar wolnych metanefryn w osoczu (metanefryna i normetanefryna) pobieranych na leżąco po 20–30 minutach odpoczynku w kaniuli założonej wcześniej.',
      },
    ],
    table: {
      headers: ['Badanie laboratoryjne', 'Wartość referencyjna / Odcięcie', 'Interpretacja kliniczna'],
      rows: [
        ['Poranny kortyzol (8:00)', '<3 µg/dl: niedoczynność; >15–18 µg/dl: norma', 'Stężenia pośrednie (3–15 µg/dl) wymagają testu Synacthenu'],
        ['Test z Synacthenem 250 µg', 'Szczyt kortyzolu >=18 µg/dl (500 nmol/l; w LC-MS/MS >=14–15 µg/dl)', 'Poniżej progu odcięcia = niewydolność kory nadnerczy'],
        ['Wskaźnik ARR (Aldo/Renina)', 'ARR podwyższony (zależnie od jednostek: Aldo ng/dl / DRC mIU/l >2,0)', 'Sugeruje pierwotny hiperaldosteronizm; wymaga testu potwierdzenia'],
        ['Wolne metanefryny w osoczu', 'W granicach normy laboratoryjnej', 'Wysoka czułość (97–99%); 3-krotny wzrost niemal przesądza o feo'],
      ],
    },
    advanced:
      'Dlaczego wolne metanefryny w osoczu są lepsze niż katecholaminy? Katecholaminy (adrenalina, noradrenalina) są wydzielane przez guz epizodycznie i mają okres półtrwania zaledwie 1–2 minut. Natomiast komórki guza chromochłonnego stale, w sposób ciągły metabolizują katecholaminy wewnątrzkomórkowo za pomocą enzymu COMT (katecholo-O-metylotransferazy) do metanefryny i normetanefryny, które stale dyfundują do krwioobiegu niezależnie od napadów wyrzutu katecholamin.',
    summary:
      'Diagnostyka kory i rdzenia opiera się na dynamicznych testach i rygorze przedanalitycznym: test 250 µg Synacthenu definiuje rezerwę kory (odcięcie 18 µg/dl, w LC-MS/MS 14–15 µg/dl), wskaźnik ARR wymaga wyrównania potasu i modyfikacji leków, a wolne metanefryny wykazują najwyższą czułość w wykrywaniu feochromocytoma.',
    sourceIds: ['pte_nadnercza', 'endo_pai', 'endo_pa', 'endo_pheo'],
    questions: [
      q(
        'Jakie stężenie kortyzolu w surowicy po podaniu 250 µg Synacthenu wyklucza pierwotną niedoczynność kory nadnerczy?',
        ['Osiągnięcie stężenia co najmniej 18 µg/dl (500 nmol/l) w 30. lub 60. minucie (w LC-MS/MS próg wynosi 14–15 µg/dl)', 'Jest to klasyczne kryterium w testach immunochemicznych; nowoczesne metody LC-MS/MS stosują niższe odcięcie 14–15 µg/dl (400–412 nmol/l).'],
        ['Wzrost o dokładnie 2 µg/dl w stosunku do wartości wyjściowej', 'Sam przyrost bez osiągnięcia bezwzględnego progu 18 µg/dl nie wyklucza niedoczynności.'],
        ['Stężenie powyżej 100 µg/dl', 'Wartość 100 µg/dl jest fizjologicznie niespotykana w standardowym teście.']
      ),
      q(
        'Kiedy pojedyncze poranne oznaczenie stężenia kortyzolu we krwi pozwala bezpiecznie wykluczyć niedoczynność kory nadnerczy bez testów dynamicznych?',
        ['Gdy stężenie wynosi >15–18 µg/dl (>450–500 nmol/l) u osoby nieprzyjmującej estrogenów', 'Wysoki poranny kortyzol świadczy o zachowanej czynności (w LC-MS/MS próg wykluczenia bywa obniżony do >14 µg/dl).'],
        ['Zawsze przy stężeniu powyżej 4 µg/dl', 'Wartości 3–15 µg/dl znajdują się w strefie niepewności i wymagają stymulacji Synacthenem.'],
        ['Nigdy, u każdego pacjenta trzeba wykonać cewnikowanie żył', 'Cewnikowanie wykonuje się w diagnostyce Conna i Cushinga, a nie niedoczynności.']
      ),
      q(
        'Dlaczego doustna antykoncepcja estrogenowa może zafałszować wynik całkowitego kortyzolu w surowicy?',
        ['Estrogeny stymulują wątrobową syntezę CBG (transkortyny), podwyższając stężenie kortyzolu związanego z białkiem', 'Prowadzi to do fałszywie wysokich wyników kortyzolu całkowitego przy prawidłowej frakcji wolnej.'],
        ['Estrogeny niszczą komórki kory nadnerczy', 'Estrogeny nie niszczą kory nadnerczy.'],
        ['Tabletki antykoncepcyjne zawierają syntetyczny kortyzol', 'Antykoncepcja hormonalna zawiera progestageny i etynyloestradiol, a nie kortyzol.']
      ),
      q(
        'Jaki lek moczopędny należy bezwzględnie odstawić na co najmniej 4–6 tygodni przed oznaczeniem wskaźnika ARR?',
        ['Spironolakton (oraz eplerenon)', 'Antagoniści aldosteronu drastycznie podwyższają reninę i fałszują wskaźnik ARR.'],
        ['Doksazosynę', 'Doksazosyna (alfa-bloker) jest lekiem z wyboru, który nie zaburza istotnie wskaźnika ARR.'],
        ['Werapamil o przedłużonym uwalnianiu', 'Werapamil to dopuszczalny bloker kanałów wapniowych w okresie przygotowania do ARR.']
      ),
      q(
        'W jakiej pozycji powinien spocząć pacjent przed pobraniem krwi na wolne metanefryny w osoczu w celu minimalizacji wyników fałszywie dodatnich?',
        ['W pozycji leżącej przez 20–30 minut w cichym pomieszczeniu', 'Pionizacja i stres wkłucia podnoszą napięcie współczulne i fałszują wynik; pozycja leżąca daje najwyższą swoistość.'],
        ['W trakcie intensywnego marszu na bieżni', 'Wysiłek fizyczny dramatycznie wyrzuca katecholaminy i metanefryny.'],
        ['W pozycji stojącej na baczność przez 2 godziny', 'Pionizacja jest wymagana w badaniu reniny, a nie wolnych metanefryn.']
      ),
    ],
  },
  {
    id: 'addison-choroba',
    moduleId: 'nadnercza',
    title: 'Gdy kora zanika',
    subtitle: 'Choroba Addisona, melanodermia, elektrolity i leczenie hydrokortyzonem',
    group: 'Niedoczynność kory i WPN',
    minutes: 18,
    goals: [
      'Rozpoznasz triadę kliniczno-laboratoryjną choroby Addisona: osłabienie, melanodermia, hipotensja, hiponatremia z hiperkaliemią.',
      'Zrozumiesz zasady substytucji dwuhormonalnej (hydrokortyzon + fludrokortyzon) oraz edukację pacjenta (zasada podwajania dawek w chorobie).',
    ],
    sections: [
      {
        title: 'Etiologia: Od gruźlicy do autoimmunologii',
        text: 'Pierwotna niedoczynność kory nadnerczy (choroba Addisona) rozwija się, gdy zniszczeniu ulegnie ponad 90% miąższu kory obu nadnerczy. Historycznie dominowała gruźlica, obecnie w krajach rozwiniętych ponad 80–90% przypadków to autoimmunologiczne zapalenie kory nadnerczy (autoimmune adrenalitis). Cechuje się obecnością autoprzeciwciał przeciwko 21-hydroksylazie (anty-21-OH). Może występować w ramach autoimmunologicznych zespołów wielogruczołowych: APS-1 (mutacja AIRE: Addison, kandydoza, hipoparatiroidyzm) lub APS-2 (zespół Schmidta: Addison, autoimmunologiczna choroba tarczycy i/lub cukrzyca typu 1).',
      },
      {
        title: 'Obraz kliniczny i tajemnica melanodermii',
        text: 'Objawy narastają podstępnie przez miesiące: przewlekłe zmęczenie, osłabienie mięśniowe, chudnięcie, jadłowstręt, hipotensja ortostatyczna oraz charakterystyczne pragnienie soli (salt craving — „chęć zjedzenia ogórka kiszonego lub wypicia wody z solą”). KLUCZOWY OBJAW PATOFIZJOLOGICZNY: Ciemnienie skóry i błon śluzowych (melanodermia / hiperpigmentacja). Brak kortyzolu znosi ujemne sprzężenie zwrotne, prowadząc do gigantycznego wyrzutu przysadkowego ACTH oraz jego prekursora POMC (proopiomelanokortyny). ACTH i peptydy MSH pobudzają receptory melanokortynowe 1 (MC1R) w melanocytach. Przebarwienia pojawiają się w miejscach narażonych na słońce, w zgięciach dłoniowych, na otoczkach brodawek, bliźnach powstałych po początku choroby oraz na błonie śluzowej policzków!',
      },
      {
        title: 'Zaburzenia elektrolitowe i leczenie substytucyjne',
        text: 'W chorobie Addisona zniszczona jest cała kora, w tym strefa kłębuszkowa. Niedobór aldosteronu prowadzi do utraty sodu i wody przez nerki oraz zatrzymywania potasu i jonów wodorowych: powstaje hiponatremia, hiperkaliemia i kwasica metaboliczna. LECZENIE SUBSTYTUCYJNE wymaga uzupełnienia obu hormonów: 1) Hydrokortyzon (15–25 mg/dobę w 2–3 dawkach podzielonych, np. 15 mg rano i 5–10 mg popołudniu, imitując rytm dobowy); 2) Fludrokortyzon (0,05–0,2 mg rano raz dziennie) w celu wyrównania gospodarki sodowo-potasowej i ciśnienia. Każdy chory musi nosić kartę medyczną („Paszport Addisona”) i umieć podwoić dawkę hydrokortyzonu w infekcji z gorączką!',
      },
    ],
    table: {
      headers: ['Cecha kliniczna / Laboratoryjna', 'Mechanizm patofizjologiczny', 'Postępowanie'],
      rows: [
        ['Melanodermia (ciemna skóra)', 'Nadmiar ACTH/POMC stymuluje receptory MC1R na melanocytach', 'Ustępuje stopniowo po wdrożeniu substytucji hydrokortyzonem'],
        ['Hiperkaliemia (K+ >5,0–5,5 mmol/l)', 'Brak aldosteronu upośledza wydalanie potasu w cewkach zbiorczych', 'Substytucja fludrokortyzonem (0,05–0,1 mg/d)'],
        ['Hipotensja ortostatyczna', 'Utrata sodu i wody oraz brak działania permisywnego kortyzolu na naczynia', 'Fludrokortyzon + hydrokortyzon + odpowiednia podaż soli'],
        ['Gorączka >38°C / infekcja', 'Zwiększone zapotrzebowanie obwodowe na glikokortykosteroidy', 'NATYCHMIAST podwoić lub potroić dawkę doustną hydrokortyzonu'],
      ],
    },
    advanced:
      'W chorobie Addisona dochodzi również do zniszczenia strefy siatkowatej i całkowitego braku nadnerczowych androgenów (DHEA i DHEA-S). U mężczyzn nie daje to objawów z powodu produkcji testosteronu przez jądra. U kobiet jednak nadnercza są głównym źródłem androgenów — ich brak prowadzi do utraty owłosienia łonowego i pachowego, spadku libido oraz obniżenia nastroju i energii życiowej. W takich przypadkach wytyczne Endocrine Society dopuszczają włączenie substytucji DHEA (25–50 mg/dobę u kobiet).',
    summary:
      'Choroba Addisona to pierwotne zniszczenie kory z niedoborem kortyzolu i aldosteronu. Melanodermia, hiponatremia i hiperkaliemia odróżniają ją od niedoczynności wtórnej. Leczenie opiera się na hydrokortyzonie i fludrokortyzonie, a znajomość reguł zwiększania dawek chroni przed śmiertelnym przełomem.',
    sourceIds: ['endo_pai', 'pte_nadnercza'],
    questions: [
      q(
        'Dlaczego u pacjentów z chorobą Addisona rozwija się hiperpigmentacja skóry (melanodermia)?',
        ['Brak ujemnego sprzężenia zwrotnego kortyzolu wywołuje nadmierne wydzielanie ACTH i POMC, które aktywują receptory MC1R w melanocytach', 'Peptydy te mają powinowactwo do receptorów melanocytowych, stymulując produkcję barwnika.'],
        ['Brak aldosteronu powoduje odkładanie się żelaza w naskórku', 'To mechanizm hemochromatozy, a nie choroby Addisona.'],
        ['W chorobie Addisona dochodzi do rozpadu erytrocytów i żółtaczki', 'Przebarwienie nie wynika z bilirubiny ani hemolizy.'],
      ),
      q(
        'Jaki zestaw zaburzeń elektrolitowych jest najbardziej charakterystyczny dla pierwotnej niedoczynności kory nadnerczy?',
        ['Hiponatremia z towarzyszącą hiperkaliemią', 'Wynika to bezpośrednio ze współistniejącego braku aldosteronu.'],
        ['Hipernatremia z ciężką hipokaliemią', 'Taki obraz cechuje nadmiar aldosteronu (zespół Conna), a nie jego brak.'],
        ['Izolowana hiperkalcemia z hipofosfatemią', 'To zaburzenie charakterystyczne dla nadczynności przytarczyc.']
      ),
      q(
        'Jakie leczenie substytucyjne należy wdrożyć u pacjenta ze świeżo rozpoznaną chorobą Addisona?',
        ['Substytucję dwuosiową: hydrokortyzon doustnie w 2–3 dawkach oraz fludrokortyzon rano', 'Uzupełnia to brak zarówno glikokortykosteroidów, jak i mineralokortykosteroidów.'],
        ['Wyłącznie sam deksametazon raz na tydzień', 'Deksametazon nie ma działania mineralokortykosteroidowego i nie odtwarza rytmu dobowego.'],
        ['Same wlewy dożylne potasu', 'Podanie potasu pacjentowi z hiperkaliemią grozi zatrzymaniem krążenia!']
      ),
      q(
        'Co powinien zrobić stabilny pacjent z chorobą Addisona w przypadku wystąpienia infekcji z gorączką >38,5°C?',
        ['Podwoić lub potroić dobową dawkę doustnego hydrokortyzonu na czas trwania gorączki', 'To kluczowa zasada „sick day rules”, zapobiegająca rozwojowi ostrego przełomu nadnerczowego.'],
        ['Natychmiast całkowicie odstawić hydrokortyzon', 'Odstawienie leku w infekcji prowadzi wprost do śmiertelnego przełomu nadnerczowego.'],
        ['Zmniejszyć dawkę o połowę i ograniczyć picie płynów', 'Ograniczenie płynów i redukcja dawki nasiliłyby odwodnienie i hipotensję.']
      ),
      q(
        'Które autoprzeciwciała stanowią marker autoimmunologicznego zapalenia kory nadnerczy?',
        ['Przeciwciała przeciwko 21-hydroksylazie (anty-21-OH)', 'Są obecne u ponad 85–90% chorych z autoimmunologiczną chorobą Addisona.'],
        ['Przeciwciała przeciwko peroksydazie tarczycowej (anty-TPO)', 'Anty-TPO to marker choroby Hashimoto.'],
        ['Przeciwciała przeciwko receptorowi TSH (TRAb)', 'TRAb to marker choroby Gravesa-Basedowa.']
      ),
    ],
  },
  {
    id: 'niedoczynnosc-wtorna',
    moduleId: 'nadnercza',
    title: 'Uśpione nadnercza',
    subtitle: 'Niedoczynność wtórna, supresja posteroidowa i pojęcie „bladego Addisona”',
    group: 'Niedoczynność kory i WPN',
    minutes: 16,
    goals: [
      'Zrozumiesz patofizjologiczne różnice między pierwotną a wtórną niedoczynnością kory nadnerczy.',
      'Opanujesz zasady bezpiecznego odstawiania przewlekłej sterydoterapii i rozpoznawania jatrogennej supresji osi HPA.',
    ],
    sections: [
      {
        title: 'Mechanizm: Oś bez dyrygenta i „blady Addison”',
        text: 'Wtórna niedoczynność kory nadnerczy wynika z niedoboru przysadkowego ACTH (guzy siodła, operacje przysadki, apopleksja, urazy głowy), a trzeciorzędowa z niedoboru podwzgórzowego CRH. Ponieważ stężenie ACTH i POMC jest niskie lub nieoznaczalne, melanocyty nie są stymulowane — pacjenci NIE MAJĄ przebarwień skóry. Wręcz przeciwnie: ich powłoki są alabastrowo blade z powodu niedokrwistości i braku stymulacji barwnikowej, stąd tradycyjne określenie „blady Addison” (pale Addison).',
      },
      {
        title: 'Dlaczego nie ma hiperkaliemii? Zachowana strefa kłębuszkowa',
        text: 'Fundamentalna różnica biochemiczna: W niedoczynności wtórnej uszkodzona jest wyłącznie stymulacja stref pasmowatej i siatkowatej (zanik ZF i ZR). Strefa kłębuszkowa (ZG) pozostaje anatomicznie i czynnościowo zachowana, ponieważ jej głównym regulatorem jest układ RAA i stężenie potasu, a nie ACTH! W efekcie synteza aldosteronu jest prawidłowa: pacjent z wtórną niedoczynnością kory nadnerczy NIE MA hiperkaliemii ani znacznej utraty sodu przez nerki, i w związku z tym NIE WYMAGA leczenia fludrokortyzonem!',
      },
      {
        title: 'Jatrogenna supresja osi HPA po sterydoterapii',
        text: 'Najczęstszą przyczyną wtórnej niedoczynności nadnerczy w populacji ogólnej jest jatrogenna supresja osi HPA wywołana przewlekłym stosowaniem egzogennych glikokortykosteroidów (prednizon, metyloprednizolon, deksametazon, a nawet sterydy wziewne, dostawowe czy maści w dużych dawkach). Przyjmowanie sterydów w dawce odpowiadającej >5 mg prednizonu/dobę przez ponad 3–4 tygodnie blokuje podwzgórze i przysadkę, prowadząc do atrofii kory nadnerczy. Nagłe odstawienie leku lub brak zwiększenia dawki w stresie infekcyjnym grozi wystąpieniem ostrego przełomu nadnerczowego! Regeneracja osi po długiej sterydoterapii może trwać od kilku miesięcy do roku.',
      },
    ],
    table: {
      headers: ['Parametr / Cecha', 'Pierwotna niedoczynność (Addison)', 'Wtórna niedoczynność nadnerczy'],
      rows: [
        ['Stężenie ACTH w osoczu', 'Znacznie podwyższone (>100–1000 pg/ml)', 'Niskie lub nieadekwatnie w normie (<10–20 pg/ml)'],
        ['Pigmentacja skóry', 'Melanodermia (ciemna skóra, zgięcia dłoni, błony śluzowe)', 'Brak przebarwień („blady Addison”)'],
        ['Gospodarka potasowa (K+)', 'Częsta hiperkaliemia (brak aldosteronu)', 'Potas w normie (sprawny układ RAA)'],
        ['Substytucja fludrokortyzonem', 'Bezwzględnie konieczna (0,05–0,1 mg/d)', 'Zbędna (strefa kłębuszkowa funkcjonuje prawidłowo)'],
      ],
    },
    advanced:
      'Jak bezpiecznie odstawiać przewlekłą sterydoterapię? Najpierw stopniowo redukuje się dawkę do ekwiwalentu fizjologicznego (ok. 4–5 mg prednizonu lub 15–20 mg hydrokortyzonu rano). Następnie pacjenta przestawia się na krótko działający hydrokortyzon (15 mg rano). Ocenę powrotu sprawności osi HPA przeprowadza się, oznaczając poranny kortyzol przed przyjęciem porannej dawki leku: gdy kortyzol rano przekroczy >10 µg/dl, a w teście z Synacthenem osiągnie >=18 µg/dl (lub >=14–15 µg/dl w metodach LC-MS/MS), sterydoterapię można definitywnie zakończyć.',
    summary:
      'Wtórna niedoczynność nadnerczy cechuje się niskim ACTH, bladą skórą i prawidłowym potasem dzięki zachowanej czynności strefy kłębuszkowej. Wymaga leczenia wyłącznie hydrokortyzonem. Najczęstszą przyczyną jest jatrogenna supresja po sterydach, wymagająca stopniowej redukcji dawki.',
    sourceIds: ['endo_pai', 'pte_nadnercza'],
    questions: [
      q(
        'Dlaczego u pacjenta z wtórną (przysadkową) niedoczynnością kory nadnerczy stężenie potasu w surowicy zazwyczaj pozostaje prawidłowe?',
        ['Strefa kłębuszkowa syntetyzuje aldosteron pod kontrolą układu RAA, niezależnie od przysadkowego ACTH', 'Zachowana produkcja aldosteronu zapewnia prawidłowe wydalanie potasu przez nerki.'],
        ['W chorobach przysadki nerki tracą zdolność wydalania potasu', 'Nerki zachowują prawidłową funkcję cewkową pod wpływem aldosteronu.'],
        ['Potas u tych chorych odkłada się w kościach', 'Potas jest głównym kationem wewnątrzkomórkowym, kości nie magazynują go w ten sposób.']
      ),
      q(
        'Czym różni się wygląd powłok skórnych w chorobie Addisona od wtórnej niedoczynności nadnerczy?',
        ['W chorobie Addisona występuje uogólniona hiperpigmentacja (melanodermia), a we wtórnej skóra jest blada', 'Różnica wynika ze skrajnie wysokiego stężenia ACTH/POMC w Addisonie i niskiego we wtórnej niedoczynności.'],
        ['W obu jednostkach skóra jest jednakowo sino-brunatna', 'Niskie ACTH we wtórnej niedoczynności nie stymuluje melanogenezy.'],
        ['We wtórnej niedoczynności skóra staje się intensywnie pomarańczowa', 'Pomarańczowe zabarwienie daje karotenodermia, a nie brak ACTH.']
      ),
      q(
        'Jaki jest najczęstszy powód wtórnej niewydolności kory nadnerczy w praktyce lekarza POZ i internisty?',
        ['Jatrogenna supresja osi HPA po przewlekłym stosowaniu syntetycznych glikokortykosteroidów', 'Stosowanie sterydów doustnych lub pozajelitowych hamuje wydzielanie CRH i ACTH.']
        ,['Udar krwotoczny podwzgórza', 'Jest to rzadkie powikłanie naczyniowe w porównaniu z powszechną sterydoterapią.'],
        ['Wrodzona mutacja receptora ACTH', 'Wrodzone mutacje są kazuistyką pediatryczną.']
      ),
      q(
        'Czy chory z izolowaną wtórną niedoczynnością kory nadnerczy wymaga przewlekłego przyjmowania fludrokortyzonu?',
        ['Nie, wymaga wyłącznie substytucji hydrokortyzonem, gdyż strefa kłębuszkowa produkuje aldosteron', 'Dodanie fludrokortyzonu u chorego z prawidłowym RAA groziłoby obrzękami i nadciśnieniem tętniczym.'],
        ['Tak, zawsze w dawce 1 mg/dobę', 'Dawka 1 mg jest dawką toksyczną; we wtórnej niedoczynności lek ten w ogóle nie jest wskazany.'],
        ['Tak, ale wyłącznie w okresie letnim', 'Sezonowość nie warunkuje wskazań do leczenia mineralokortykosteroidami.']
      ),
      q(
        'Po jakim czasie stosowania prednizonu w dawce >=5–7,5 mg/dobę należy podejrzewać wystąpienie supresji osi HPA?',
        ['Po ponad 3–4 tygodniach ciągłego leczenia', 'Taki okres wystarcza do wywołania czynnościowej atrofii kory i wymaga stopniowego odstawiania leku.'],
        ['Dopiero po 10 latach nieprzerwanej terapii', 'Supresja rozwija się w ciągu tygodni, a nie dziesięcioleci.'],
        ['Po podaniu pojedynczej tabletki jednorazowo', 'Jednorazowa dawka sterydu nie wywołuje utrwalonej atrofii nadnerczy.']
      ),
    ],
  },
  {
    id: 'wpn-zespol',
    moduleId: 'nadnercza',
    title: 'Pułapka 21-hydroksylazy',
    subtitle: 'Wrodzony przerost nadnerczy (WPN), 17-OH-progesteron i ucieczka w szlak androgenowy',
    group: 'Niedoczynność kory i WPN',
    minutes: 18,
    goals: [
      'Zrozumiesz patomechanizm wrodzonego przerostu nadnerczy (WPN) spowodowanego niedoborem 21-hydroksylazy (CYP21A2).',
      'Rozróżnisz postać klasyczną z utratą soli od postaci prostej wirylizującej oraz opanujesz diagnostykę postaci nieklasycznej (NC-CAH).',
    ],
    sections: [
      {
        title: 'Blok enzymatyczny i ucieczka substratów',
        text: 'Wrodzony przerost nadnerczy (Congenital Adrenal Hyperplasia — CAH / WPN) to grupa chorób uwarunkowanych autosomalnie recesywnie, w których defekt enzymatyczny uniemożliwia prawidłową syntezę kortyzolu. W ponad 90–95% przypadków przyczyną jest mutacja genu CYP21A2 kodującego 21-hydroksylazę. Enzym ten odpowiada za przekształcanie progesteronu w 11-deoksykortykosteron (szlak aldosteronu) oraz 17-OH-progesteronu w 11-deoksykortyzol (szlak kortyzolu). Brak kortyzolu znosi ujemne sprzężenie zwrotne: przysadka masowo wydziela ACTH, co powoduje przerost (hyperplasia) kory nadnerczy. Zgromadzone powyżej bloku prekursory (głównie 17-OHP) zostają przesunięte do jedynego drożnego szlaku — syntezy silnych androgenów nadnerczowych (androstendionu i testosteronu)!',
      },
      {
        title: 'Postać klasyczna: Z utratą soli vs prosta wirylizująca',
        text: 'W zależności od resztkowej aktywności 21-hydroksylazy wyróżnia się postacie: 1) Klasyczna z utratą soli (salt-wasting — SW, aktywność enzymu 0%): całkowity brak kortyzolu i aldosteronu. U noworodków płci żeńskiej (46,XX) w chwili urodzenia występuje obojnactwo narządów płciowych zewnętrznych (wirylizacja: powiększenie łechtaczki, zrośnięcie warg sromowych). U noworodków płci męskiej (46,XY) narządy są prawidłowe, lecz w 2.–3. tygodniu życia dochodzi do załamania stanu: przełom z utratą soli (wymioty, hiponatremia, ciężka hiperkaliemia, wstrząs hipowolemiczny, zgon bez leczenia). 2) Klasyczna prosta wirylizująca (simple virilizing — SV, aktywność 1–2%): zachowana minimalna synteza aldosteronu (brak utraty soli), lecz występuje wirylizacja u dziewczynek oraz przedwczesne fałszywe dojrzewanie u chłopców.',
      },
      {
        title: 'Postać nieklasyczna (NC-CAH) u dorosłych',
        text: 'Nieklasyczny WPN (Non-Classic CAH — NC-CAH, aktywność enzymu 20–50%) jest jedną z najczęstszych chorób jednogenowych (częstość 1:200–1:1000). U noworodków nie ma wad narządów płciowych. Objawy ujawniają się w okresie pokwitania lub u młodych kobiet i doskonale imitują zespół policystycznych jajników (PCOS): oporny trądzik, łysienie androgenowe, hirsutyzm, zaburzenia owulacji i niepłodność. ROZPOZNANIE: Podstawowym testem przesiewowym jest poranne stężenie 17-hydroksyprogesteronu (17-OHP) w fazie folikularnej: stężenie <2 ng/ml w teście immunologicznym (lub <1,5 ng/ml w LC-MS/MS) czyni NC-CAH mało prawdopodobnym. Wartości w szarej strefie (2–10 ng/ml) budzą podejrzenie i wymagają testu stymulacji 250 µg Synacthenu: wyrzut 17-OHP >10 ng/ml (>30 nmol/l, a w LC-MS/MS >8–10 ng/ml) jednoznacznie potwierdza rozpoznanie.',
      },
    ],
    table: {
      headers: ['Postać WPN', 'Aktywność 21-OH', 'Objawy u noworodka / dziecka', 'Obraz u dorosłych / Leczenie'],
      rows: [
        ['Klasyczna z utratą soli', '0%', 'Wirylizacja narządów (46,XX); przełom solny w 2. tyg. (hiponatremia, hiperkaliemia)', 'Substytucja hydrokortyzonem + fludrokortyzonem przez całe życie'],
        ['Klasyczna prosta wirylizująca', '1–2%', 'Wirylizacja (46,XX), rzekome przedwczesne dojrzewanie, szybki zrost nasad kości', 'Hydrokortyzon (hamowanie ACTH i nadmiaru androgenów)'],
        ['Nieklasyczna (NC-CAH)', '20–50%', 'Brak objawów u noworodka; prawidłowe narządy płciowe', 'Hirsutyzm, trądzik, niepłodność (imituje PCOS); małe dawki hydrokortyzonu'],
      ],
    },
    advanced:
      'Dlaczego dzieci z klasycznym WPN bez leczenia osiągają niski ostateczny wzrost dorosły? Nadmiar androgenów w dzieciństwie przyspiesza tempo wzrastania (dziecko jest przejściowo wyższe od rówieśników), lecz jednocześnie powoduje przedwczesne kostnienie i zamykanie chrząstek nasadowych kości długich. Celem leczenia hydrokortyzonem w WPN jest nie tylko substytucja brakującego kortyzolu, ale przede wszystkim stłumienie nadmiernego wydzielania ACTH, co hamuje toksyczną nadprodukcję androgenów nadnerczowych.',
    summary:
      'Niedobór 21-hydroksylazy (CYP21A2) blokuje produkcję kortyzolu i aldosteronu, przekierowując metabolity do szlaku androgenów. Postać z utratą soli grozi zgonem w okresie noworodkowym, a postać nieklasyczna (NC-CAH) jest częstą przyczyną hirsutyzmu i niepłodności diagnozowaną testem 17-OHP.',
    sourceIds: ['cah_guideline', 'pte_nadnercza'],
    questions: [
      q(
        'Jaki metabolit steroidowy ulega masywnej akumulacji we krwi w najczęstszej postaci wrodzonego przerostu nadnerczy (WPN)?',
        ['17-hydroksyprogesteron (17-OHP)', 'Brak enzymu 21-hydroksylazy blokuje dalszą konwersję 17-OHP, powodując jego gromadzenie.'],
        ['Estriol', 'Estriol jest estrogenem syntetyzowanym w łożysku podczas ciąży.'],
        ['Katecholaminy', 'Katecholaminy powstają w rdzeniu nadnerczy z tyrozyny, nie biorą udziału w sterydogenezie kory.']
      ),
      q(
        'Dlaczego u noworodka z klasyczną postacią WPN z utratą soli dochodzi w 2.–3. tygodniu życia do zapaści krążeniowej?',
        ['Całkowity brak aldosteronu prowadzi do masywnej nerkowej utraty sodu, hiponatremii, hiperkaliemii i wstrząsu hipowolemicznego', 'Niedobór mineralokortykosteroidów uniemożliwia zatrzymywanie soli w cewkach zbiorczych.'],
        ['Nadmiar kortyzolu niszczy naczynia krwionośne', 'W WPN występuje ciężki niedobór kortyzolu, a nie nadmiar.'],
        ['Dochodzi do zamknięcia przewodu Botalla', 'Przewód tętniczy nie ma związku z blokiem 21-hydroksylazy.']
      ),
      q(
        'Z jakim powszechnym zaburzeniem endokrynologicznym u młodych kobiet najczęściej bywa mylona nieklasyczna postać WPN (NC-CAH)?',
        ['Zespołem policystycznych jajników (PCOS)', 'Oba stany objawiają się hiperandrogenizmem, trądzikiem, hirsutyzmem i rzadkim miesiączkowaniem.'],
        ['Chorobą Hashimoto z eutyreozą', 'Hashimoto dotyczy tarczycy i nie wywołuje bezpośrednio wirylizacji.'],
        ['Cukrzycą ciążową', 'Cukrzyca to zaburzenie gospodarki węglowodanowej bez hirsutyzmu.']
      ),
      q(
        'Jaki wynik stężenia 17-OHP w teście stymulacji 250 µg Synacthenu definitywnie potwierdza rozpoznanie nieklasycznego WPN?',
        ['Stężenie 17-OHP w 60. minucie testu przekraczające 10 ng/ml (30 nmol/l)', 'Jest to międzynarodowy złoty standard diagnostyczny wg wytycznych Endocrine Society.'],
        ['Spadek stężenia 17-OHP do zera', 'Stymulacja ACTH wyrzuca nagromadzony substrat powyżej bloku, powodując jego skokowy wzrost.'],
        ['Dokładnie 0,5 ng/ml', 'Wartość 0,5 ng/ml jest wartością w pełni prawidłową.']
      ),
      q(
        'Co jest głównym celem terapeutycznym podawania hydrokortyzonu u chorych z wrodzonym przerostem nadnerczy?',
        ['Uzupełnienie niedoboru kortyzolu oraz stłumienie przysadkowego ACTH, co hamuje nadprodukcję androgenów', 'Hydrokortyzon na zasadzie ujemnego sprzężenia zwrotnego wyłącza stymulację ACTH.'],
        ['Pobudzenie kory nadnerczy do szybszego podziału komórkowego', 'Kora jest już patologicznie przerosła z powodu nadmiaru ACTH.'],
        ['Całkowita eliminacja aldosteronu z organizmu', 'Aldosteron jest niezbędny do życia i wymaga dodatkowej substytucji w postaciach z utratą soli.']
      ),
    ],
  },
  {
    id: 'cushing-nadnerczowy',
    moduleId: 'nadnercza',
    title: 'Gdy nadnercze działa na własną rękę',
    subtitle: 'Autonomiczny guz kory nadnercza, subkliniczny zespół Cushinga (MACS) i atrofia drugiego gruczołu',
    group: 'Nadczynności i guz chromochłonny',
    minutes: 17,
    goals: [
      'Rozpoznasz postać zespołu Cushinga niezależną od ACTH (autonomiczny gruczolak kory nadnercza vs subkliniczna hiperkortyzolemia MACS).',
      'Zrozumiesz zjawisko atrofii przeciwległego nadnercza i bezwzględną konieczność okołooperacyjnej osłony hydrokortyzonem.',
    ],
    sections: [
      {
        title: 'Zespół Cushinga ACTH-niezależny: Mechanizm autonomii',
        text: 'Około 20–30% endogennych przypadków zespołu Cushinga ma charakter ACTH-niezależny, wynikający z pierwotnej patologii kory nadnerczy: w 60% jest to pojedynczy łagodny gruczolak kory nadnercza (adrenocortical adenoma), w 30–35% złośliwy rak kory nadnerczy (ACC), a rzadziej obustronny makro- lub mikroguzkowy rozrost kory (PMAH, PPNAD). Komórki guza autonomicznie, bez jakiejkolwiek kontroli przysadki, syntetyzują kortyzol. Nadmiar krążącego kortyzolu hamuje przysadkowe ACTH do wartości skrajnie niskich lub nieoznaczalnych (ACTH <2–5 pg/ml).',
      },
      {
        title: 'Łagodna autonomiczna sekrecja kortyzolu (MACS)',
        text: 'Wielu chorych z przypadkowo wykrytym gruczolakiem nadnercza (incydentaloma) nie wykazuje pełnoobjawowego fenotypu Cushinga (brak purpurowych rozstępów czy miopatii), lecz ma biochemiczne cechy autonomii. Stan ten określano dawniej jako „podkliniczny zespół Cushinga”, a obecnie wg wytycznych ESE/PTE jako łagodną autonomiczną sekrecję kortyzolu (Mild Autonomous Cortisol Secretion — MACS). Kryterium: stężenie kortyzolu w surowicy po nocnym teście 1 mg deksametazonu wynosi >1,8 µg/dl (>50 nmol/l) przy braku cech jawnego hiperkortyzolizmu. MACS prowadzi do powikłań metabolicznych: opornego nadciśnienia, cukrzycy typu 2, dyslipidemii i osteoporozy z patologicznymi złamaniami trzonów kręgowych.',
      },
      {
        title: 'Atrofia drugiego nadnercza i śmiertelna pułapka pooperacyjna',
        text: 'KRYTYCZNA ZASADA BEZPIECZEŃSTWA: Przewlekłe stłumienie ACTH przez autonomiczny guz kortyzolowy prowadzi do głębokiej atrofii zdrowego miąższu kory nadnercza po stronie guza oraz CAŁKOWITEJ ATROFII kory przeciwległego, zdrowego nadnercza! W chwili gdy chirurg wytnie guz (adrenalektomia), pacjent w ciągu kilku godzin traci jedyne źródło kortyzolu w organizmie. Jeśli nie otrzyma dożylnie osłony hydrokortyzonem, natychmiast rozwinie ostry, śmiertelny przełom nadnerczowy! U każdego chorego operowanego z powodu guzów wydzielających kortyzol (nawet z MACS) należy wdrożyć profilaktykę hydrokortyzonem śród- i pooperacyjnie aż do pełnej regeneracji drugiego nadnercza (co może trwać od 6 do 24 miesięcy).',
      },
    ],
    table: {
      headers: ['Jednostka kliniczna', 'Stężenie ACTH w osoczu', 'Test 1 mg DEX', 'Postępowanie i bezpieczeństwo'],
      rows: [
        ['Autonomiczny gruczolak kory', 'Stłumione (<2–5 pg/ml)', 'Brak hamowania (często >5–15 µg/dl)', 'Laparoskopowa adrenalektomia + bezwzględna osłona hydrokortyzonem!'],
        ['Łagodna sekrecja MACS', 'Niskie / w dolnej granicy normy', 'Kortyzol 1,9–5,0 µg/dl po 1 mg DEX', 'Ocena powikłań (osteoporoza, NT, cukrzyca); operacja lub leczenie zachowawcze'],
        ['Choroba Cushinga (przysadka)', 'Wysokie lub nieadekwatnie w normie (>15–20 pg/ml)', 'Brak hamowania po 1 mg DEX', 'Operacja neurochirurgiczna przez zatokę klinową (TSS)'],
      ],
    },
    advanced:
      'W autonomicznych gruczolakach kory nadnerczy wydzielających kortyzol w ostatnich latach zidentyfikowano mutacje somatyczne genu PRKACA kodującego podjednostkę katalityczną alfa kinazy białkowej A (PKA). Mutacja p.Leu206Arg powoduje stałą, konstytutywną aktywność kinazy PKA, która pobudza transkrypcję genów sterydogenezy całkowicie bez obecności ACTH i bez udziału receptora MC2R.',
    summary:
      'Nadnerczowy zespół Cushinga cechuje się autonomiczną produkcją kortyzolu i stłumionym ACTH. Postać subkliniczna (MACS) niesie ryzyko powikłań sercowo-naczyniowych i kostnych. Usunięcie autonomicznego guza wymaga bezwzględnej osłony hydrokortyzonem z powodu atrofii drugiego nadnercza.',
    sourceIds: ['pte_nadnercza', 'pte_macs', 'ese_incidentaloma'],
    questions: [
      q(
        'Jakie stężenie ACTH w osoczu stwierdza się u chorego z jawnym zespołem Cushinga wywołanym pojedynczym autonomicznym gruczolakiem kory nadnercza?',
        ['Stłumione, poniżej dolnej granicy wykrywalności (zwykle <2–5 pg/ml)', 'Autonomiczny nadmiar kortyzolu blokuje przysadkę na drodze ujemnego sprzężenia zwrotnego.'],
        ['Wybitnie podwyższone (>200 pg/ml)', 'Tak wysokie ACTH występuje w ektopowym zespole Cushinga lub w chorobie Addisona.'],
        ['Dokładnie w środku zakresu normy bez wahań', 'Prawidłowe ACTH wyklucza autonomiczną postać nadnerczową.']
      ),
      q(
        'Dlaczego po usunięciu autonomicznego gruczolaka kory nadnercza pacjent musi natychmiast otrzymać hydrokortyzon?',
        ['Przeciwległe zdrowe nadnercze uległo głębokiej atrofii z powodu przewlekłego braku ACTH, co grozi ostrym przełomem nadnerczowym', 'Bez osłony sterydowej chory nie posiada własnej produkcji kortyzolu.'],
        ['Hydrokortyzon zapobiega nawrotowi nowotworu w ranie', 'Hydrokortyzon jest hormonem zastępczym, a nie lekiem przeciwnowotworowym.'],
        ['Aby natychmiast obniżyć ciśnienie tętnicze', 'Hydrokortyzon podtrzymuje ciśnienie, nie służy do jego obniżania.']
      ),
      q(
        'Jakie kryterium w nocnym teście hamowania 1 mg deksametazonu definiuje łagodną autonomiczną sekrecję kortyzolu (MACS) w incydentaloma nadnerczy?',
        ['Kortyzol w surowicy rano >1,8 µg/dl (>50 nmol/l) przy braku jawnych cech fenotypowych zespołu Cushinga', 'Wskazuje to na utratę pełnej fizjologicznej supresji osi HPA.'],
        ['Kortyzol spadający poniżej 0,5 µg/dl', 'Spadek <1,8 µg/dl oznacza w pełni prawidłowe hamowanie.'],
        ['Wzrost stężenia glukozy powyżej 300 mg/dl', 'Test deksametazonu ocenia stężenie kortyzolu, a nie glukozy.']
      ),
      q(
        'Jakie powikłania ogólnoustrojowe najczęściej towarzyszą chorym z łagodną autonomiczną sekrecją kortyzolu (MACS)?',
        ['Oporne nadciśnienie tętnicze, cukrzyca typu 2 oraz osteoporoza ze złamaniami trzonów kręgów', 'Przewlekła subkliniczna ekspozycja na kortyzol niszczy metabolizm i strukturę kości.'],
        ['Bielactwo nabyte i zapalenie tarczycy', 'To cechy chorób autoimmunologicznych, a nie hiperkortyzolemii.'],
        ['Niedociśnienie ortostatyczne i biegunki', 'Niedociśnienie cechuje niedobór kortyzolu, a nie jego autonomiczny nadmiar.']
      ),
      q(
        'Jak długo po operacji usunięcia gruczolaka wydzielającego kortyzol może trwać regeneracja osi HPA i przeciwległego nadnercza?',
        ['Od kilku miesięcy do nawet 1–2 lat', 'W tym okresie pacjent wymaga stopniowo redukowanej substytucji hydrokortyzonem.'],
        ['Dokładnie 24 godziny', 'Atrofia kory nie cofa się w ciągu jednej doby.'],
        ['Oś HPA po operacji nigdy się nie regeneruje', 'W zdecydowanej większości przypadków funkcja zdrowego nadnercza ostatecznie powraca.']
      ),
    ],
  },
];
