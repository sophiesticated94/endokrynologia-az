import { type DraftLesson, q } from './course-types.ts';

export const draftPituitaryPart2: DraftLesson[] = [
  {
    id: 'hipopituitaryzm',
    moduleId: 'przysadka',
    title: 'Kiedy przysadka gaśnie',
    subtitle: 'Niedoczynność przysadki, zespół Sheehana i żelazna zasada substytucji',
    group: 'Niedoczynność i gospodarka wodna',
    minutes: 16,
    goals: [
      'Poznasz typową kolejność wypadania osi hormonalnych w powolnym niszczeniu przedniego płata.',
      'Zapamiętasz krytyczną dla życia zasadę: leczenie sterydowe (hydrokortyzon) ZAWSZE wdraża się PRZED lewotyroksyną!',
    ],
    sections: [
      {
        title: 'Etiologia i kolejność wypadania osi hormonalnych',
        text: 'Niedoczynność przysadki (hipopituitaryzm) to niedobór jednego, kilku (częściowa) lub wszystkich (panhipopituitaryzm) hormonów przedniego i/lub tylnego płata. Najczęstszą przyczyną u dorosłych są guzy siodła (makrogruczolaki) oraz stan po ich operacji lub radioterapii. W powolnym ucisku osie hormonalne wypadają w charakterystycznej kolejności: 1. GH (somatotropina) $\\to$ 2. LH i FSH (gonadotropiny) $\\to$ 3. TSH (tyreotropina) $\\to$ 4. ACTH (kortykotropina). Ostatnia wypadająca oś ACTH jest kluczowa dla przeżycia!',
      },
      {
        title: 'Zespół Sheehana — martwica poporodowa',
        text: 'Zespół Sheehana to poporodowa martwica niedokrwienna przedniego płata przysadki wywołana masywnym krwotokiem okołoporodowym i wstrząsem hipowolemicznym. W ciąży przysadka fizjologicznie powiększa się nawet dwukrotnie (głównie rozrost laktotrofów), stając się niezwykle wrażliwa na niedokrwienie. Pierwszym charakterystycznym objawem po porodzie jest całkowity brak laktacji (agnozja laktacyjna) oraz brak powrotu miesiączkowania, po których w ciągu miesięcy rozwija się wtórna niedoczynność tarczycy i kory nadnerczy.',
      },
      {
        title: 'Żelazna zasada substytucji wielohormonalnej',
        text: 'ZASADA RATUJĄCA ŻYCIE: U pacjenta z wtórną niedoczynnością tarczycy (niskie FT4) i współistniejącym niedoborem osi ACTH-kortyzol, leczenie substytucyjne hydrokortyzonem należy bezwzględnie włączyć PRZED rozpoczęciem podawania lewotyroksyny (LT4) lub co najmniej jednocześnie! Włączenie samej lewotyroksyny przyspiesza metabolizm wątrobowy i obwodowy resztek endogennego kortyzolu, co może wywołać natychmiastowy, śmiertelny przełom nadnerczowy!',
      },
    ],
    table: {
      headers: ['Oś hormonalna', 'Zasady leczenia substytucyjnego'],
      rows: [
        ['Oś ACTH — Kortyzol', 'Hydrokortyzon doustnie (15–25 mg/d w 2–3 dawkach podzielonych); ZAWSZE PIERWSZY!'],
        ['Oś TSH — T4', 'Lewotyroksyna (LT4); dawkuj według stężenia FT4 (nie TSH!); dopiero po zabezpieczeniu sterydem'],
        ['Oś LH/FSH — Gonady', 'Testosteron u mężczyzn; terapia estrogenowo-progestagenowa u kobiet (o ile brak przeciwwskazań)'],
        ['Oś GH — Hormon wzrostu', 'Rekombinowany hGH u dorosłych z ciężkim niedoborem i zaburzeniami metabolicznymi'],
      ],
    },
    advanced:
      'W odróżnieniu od pierwotnej niedoczynności nadnerczy (choroby Addisona), w niedoczynności przysadkowej (wtórnej) NIE dochodzi do niedoboru mineralokortykosteroidów (aldosteronu), ponieważ warstwa kłębkowata kory nadnerczy jest regulowana przez układ renina-angiotensyna-aldosteron (RAA) i stężenie potasu, a nie przez ACTH. Dlatego chorzy ci nie wymagają substytucji fludrokortyzonem i rzadko mają hiperkaliemię.',
    summary:
      'Hipopituitaryzm wymaga substytucji brakujących hormonów w ściśle określonej kolejności: hydrokortyzon musi poprzedzać lewotyroksynę. Dawkowanie LT4 kontroluje się poziomem FT4, a nie stłumionym lub nieadekwatnym TSH.',
    sourceIds: ['fleseriu'],
    questions: [
      q(
        'Dlaczego u pacjenta ze złożoną niedoczynnością przysadki hydrokortyzon musi być podany PRZED lewotyroksyną?',
        ['Podanie lewotyroksyny nasila metabolizm i zużycie resztek kortyzolu, co grozi ostrym przełomem nadnerczowym', 'To fundamentalna zasada bezpieczeństwa endokrynologicznego ratująca życie.'],
        ['Lewotyroksyna trwale neutralizuje działanie hydrokortyzonu w żołądku', 'Leki te nie neutralizują się chemicznie w przewodzie pokarmowym.'],
        ['Hydrokortyzon pobudza przysadkę do samoistnej regeneracji', 'Hydrokortyzon uzupełnia niedobór na obwodzie, nie regeneruje martwiczo zmienionej przysadki.']
      ),
      q(
        'Jaki jest najwcześniejszy objaw kliniczny zespołu Sheehana w okresie połogu?',
        ['Brak laktacji (brak napływu pokarmu) pomimo chęci karmienia piersią', 'Związany jest z ostrym niedokrwieniem i martwicą komórek laktotropowych przysadki.'],
        ['Masywny wytrzeszcz obu gałek ocznych', 'Wytrzeszcz to cecha choroby Gravesa-Basedowa, a nie martwicy poporodowej przysadki.'],
        ['Wysoka gorączka z drgawkami tężcowymi', 'To nie jest obraz poporodowej niedoczynności przysadki.']
      ),
      q(
        'Który parametr laboratoryjny służy do monitorowania prawidłowości dawki lewotyroksyny w niedoczynności przysadkowej?',
        ['Stężenie wolnej tyroksyny (FT4) we krwi', 'TSH jest uszkodzone lub nieadekwatnie prawidłowe, dlatego celem jest utrzymanie FT4 w górnej połowie normy.'],
        ['Stężenie TSH w surowicy', 'TSH w niedoczynności wtórnej jest niemiarodajne i nie może służyć do monitorowania dawki.'],
        ['Wydalanie jodu w dobowej zbiórce moczu', 'Joduria nie odzwierciedla wyrównania hormonalnego pacjenta na lewotyroksynie.']
      ),
      q(
        'Dlaczego chory z wtórną niedoczynnością kory nadnerczy w przebiegu hipopituitaryzmu nie wymaga przyjmowania fludrokortyzonu?',
        ['Wydzielanie aldosteronu w nadnerczach jest kontrolowane przez układ RAA i potas, a nie przez ACTH', 'Warstwa kłębkowata zachowuje czynność nawet przy całkowitym braku przysadkowego ACTH.'],
        ['Przysadka sama produkuje aldosteron bezpośrednio do nerek', 'Przysadka nie syntetyzuje aldosteronu.'],
        ['Fludrokortyzon jest bezwzględnie toksyczny dla przysadki mózgowej', 'Nie jest toksyczny, po prostu nie ma wskazań do jego stosowania w niedoczynności wtórnej.']
      ),
      q(
        'Jaka jest zazwyczaj pierwsza oś hormonalna ulegająca upośledzeniu w powolnym niszczeniu przysadki przez guz?',
        ['Oś hormonu wzrostu (GH)', 'Komórki somatotropowe są najbardziej wrażliwe na ucisk mechaniczny i zanikają jako pierwsze.'],
        ['Oś ACTH (kortykotropowa)', 'Oś ACTH jest ewolucyjnie najbardziej odporna i wypada zazwyczaj jako ostatnia.'],
        ['Tylny płat i wydzielanie oksytocyny', 'Tylny płat leży poza główną strefą powolnego ucisku przedniego płata.']
      ),
    ],
  },
  {
    id: 'moczowka-prosta',
    moduleId: 'przysadka',
    title: 'Pragnienie nie do ugaszenia',
    subtitle: 'Moczówka prosta (AVP-D / AVP-R), test odwodnieniowy i diagnostyka kopeptyną',
    group: 'Niedoczynność i gospodarka wodna',
    minutes: 17,
    goals: [
      'Zrozumiesz patofizjologię niedoboru wazopresyny (AVP-D, moczówka centralna) i oporności nerkowej (AVP-R) oraz rolę kopeptyny.',
      'Opanujesz test z desmopresyną, diagnostykę kopeptyną po 3% NaCl lub argininie oraz zasady leczenia dDAVP.',
    ],
    sections: [
      {
        title: 'Objawy: Poliuria, polidypsja i nowa nomenklatura AVP-D / AVP-R',
        text: 'Moczówka prosta (Diabetes Insipidus — obecnie według międzynarodowego konsensusu określana jako AVP-D: niedobór wazopresyny lub AVP-R: oporność na wazopresynę) to zespół objawów wynikający z braku działania arginino-wazopresyny (AVP). Skutkiem jest niezdolność nerek do zagęszczania moczu. Pacjent oddaje ogromne ilości (>3–10 litrów/dobę) skrajnie rozcieńczonego moczu (ciężar właściwy <1,005 g/ml, osmolalność moczu <300 mOsm/kg H2O — hipostenuria). Towarzyszy temu nieposkromione pragnienie (polidypsja) oraz nykturia. Dopóki chory ma zachowane pragnienie i swobodny dostęp do wody, sód we krwi pozostaje w normie (zwykle 140–143 mmol/l).',
      },
      {
        title: 'Różnicowanie: Centralna (AVP-D) vs Nerkowa (AVP-R) vs Psychogenna',
        text: 'Trzy główne stany kliniczne: 1) AVP-D (moczówka centralna): brak AVP (urazy głowy, operacje siodła, histiocytoza z komórek Langerhansa, sarkoidoza, idiopatyczna); 2) AVP-R (moczówka nerkowa): nerki nie reagują na AVP (leczenie litem, hiperkalcemia, hipokaliemia, wrodzone mutacje receptora V2); 3) Polidypsja pierwotna: nadmierne przymusowe picie wody pierwotnie rozcieńcza krew i fizjologicznie hamuje wydzielanie AVP (przysadka i nerki są w pełni zdrowe!).',
      },
      {
        title: 'Diagnostyka: Test z desmopresyną oraz nowoczesna ocena kopeptyny',
        text: 'W klasycznym teście odwodnieniowym ocenia się zagęszczanie moczu (w polidypsji rośnie >750 mOsm/kg, w AVP-D/AVP-R pozostaje <300 mOsm/kg, a podanie desmopresyny dDAVP daje wzrost >50% w postaci centralnej AVP-D). Nowoczesnym złotym standardem (wg wytycznych Christ-Crain i Pituitary Society) jest pomiar stymulowanej kopeptyny (stabilnego zastępczego markera AVP): po wlewie 3% NaCl (do stężenia sodu >=150 mmol/l) stężenie kopeptyny <4,9 pmol/l z trafnością >95% potwierdza AVP-D, a >=4,9 pmol/l dowodzi polidypsji pierwotnej. Alternatywą jest test stymulacji argininą (odcięcie 3,8 pmol/l). Wyjściowa kopeptyna >21,4 pmol/l bez odwodnienia potwierdza nerkową AVP-R.',
      },
    ],
    table: {
      headers: ['Jednostka chorobowa', 'Test z desmopresyną (dDAVP)', 'Stymulowana kopeptyna'],
      rows: [
        ['AVP-D (moczówka centralna)', 'Wzrost osmolalności moczu >50% po dDAVP', '<4,9 pmol/l po 3% NaCl (<3,8 po argininie)'],
        ['AVP-R (moczówka nerkowa)', 'Brak wzrostu osmolalności (<50% po dDAVP)', 'Wyjściowo >21,4 pmol/l bez odwodnienia'],
        ['Polidypsja pierwotna', 'Mocz zagęszczony już w fazie odwodnienia (>750 mOsm/kg)', '>=4,9 pmol/l po 3% NaCl (prawidłowa rezerwa)'],
      ],
    },
    advanced:
      'W badaniu MRI mózgowia zdrowy tylny płat przysadki daje charakterystyczny sygnał wysokiej intensywności („jasny punkt” tylnego płata — posterior pituitary bright spot w obrazach T1-zależnych), który odpowiada magazynom kompleksów wazopresyna-neurofizyna. Zanik tego „jasnego punktu” w T1 silnie przemawia za moczówką prostą centralną lub uszkodzeniem podwzgórza.',
    summary:
      'Moczówka prosta to poliuria i polidypsja (AVP-D lub AVP-R). Test z desmopresyną lub nowoczesny test stymulacji kopeptyny (3% NaCl/arginina) rozstrzygają o etiologii, a leczenie AVP-D opiera się na doustnej lub podjęzykowej desmopresynie.',
    sourceIds: ['baldeweg', 'avpd_copeptin'],
    questions: [
      q(
        'Jak zachowuje się osmolalność moczu po podaniu desmopresyny u pacjenta z moczówką prostą centralną?',
        ['Gwałtownie wzrasta (o ponad 50%), wykazując prawidłową reakcję nerek na brakujący hormon', 'Podanie desmopresyny uzupełnia brak endogennej wazopresyny i umożliwia zagęszczenie moczu.'],
        ['Spada do zera', 'Desmopresyna zatrzymuje wodę w nerkach, więc osmolalność moczu rośnie, a nie spada.'],
        ['Pozostaje całkowicie bez zmian (brak jakiejkolwiek reakcji)', 'Brak reakcji na desmopresynę charakteryzuje moczówkę nerkową, a nie centralną.']
      ),
      q(
        'Co jest głównym niebezpieczeństwem u chorego z moczówką prostą, który traci przytomność lub zostaje pozbawiony dostępu do wody?',
        ['Ciężkie hiperosmotyczne odwodnienie z hipernatremią (sód >160 mmol/l) grożące obrzękiem i krwawieniem śródczaszkowym', 'Utrata hipotonicznego moczu bez uzupełniania płynów prowadzi do zagęszczenia osocza i załamania krążenia.'],
        ['Gwałtowny rozwój hiponatremii i przewodnienia komórkowego', 'Moczówka prowadzi do utraty czystej wody i hipernatremii, a nie hiponatremii.'],
        ['Nagły atak dny moczanowej', 'Dna moczanowa nie jest bezpośrednim ostrym powikłaniem braku wazopresyny.']
      ),
      q(
        'Który powszechnie stosowany lek psychiatryczny jest klasyczną przyczyną nabytej moczówki prostej nerkowej?',
        ['Węglan litu', 'Lit akumuluje się w komórkach głównych cewek zbiorczych nerek i blokuje odpowiedź na AVP.'],
        ['Kwas acetylosalicylowy (aspiryna)', 'Aspiryna w dawkach kardiologicznych nie uszkadza receptora wazopresynowego.'],
        ['Paracetamol', 'Paracetamol nie wywołuje moczówki nerkowej.']
      ),
      q(
        'Jakie stężenie sodu w surowicy cechuje stabilnego pacjenta z moczówką prostą, który wypija 8 litrów wody dziennie zgodnie ze swoim pragnieniem?',
        ['Prawidłowe stężenie sodu (zwykle 140–143 mmol/l, przy górnej granicy normy)', 'Sprawne pragnienie i picie wody w pełni kompensują utratę płynów przez nerki.'],
        ['Ciężka hiponatremia (<115 mmol/l)', 'Hiponatremia występuje w SIADH lub zatruciu wodnym, a nie w moczówce prostej.'],
        ['Stężenie sodu równe zeru', 'Wartość zerowa sodu jest biologicznie niemożliwa.']
      ),
      q(
        'Jaka jest preferowana postać i droga podawania desmopresyny w przewlekłym leczeniu moczówki prostej centralnej?',
        ['Doustne tabletki podjęzykowe (melt) lub tabletki doustne', 'Są wygodne dla pacjenta, umożliwiają precyzyjne dawkowanie i eliminują podrażnienia błony śluzowej nosa.'],
        ['Dożylne wlewy ciągłe przez cewnik centralny przez całe życie', 'Wlewy dożylne stosuje się w stanach ostrych na OIT, a nie w terapii ambulatoryjnej.'],
        ['Inhalacje proszkowe do płuc', 'Desmopresyna nie jest podawana w inhalatorach proszkowych.']
      ),
    ],
  },
  {
    id: 'siadh',
    moduleId: 'przysadka',
    title: 'Zabójczy nadmiar wody',
    subtitle: 'Zespół SIADH, hiponatremia hipoosmotyczna i ryzyko mielinolizy mostu',
    group: 'Niedoczynność i gospodarka wodna',
    minutes: 18,
    goals: [
      'Opanujesz kryteria rozpoznania zespołu nieadekwatnego wydzielania wazopresyny (SIADH / zespół Schwartz-Barttera).',
      'Zrozumiesz śmiertelne niebezpieczeństwo zbyt szybkiej korekty hiponatremii (zespół mielinolizy mostu — CPM).',
    ],
    sections: [
      {
        title: 'Patofizjologia: Za dużo wazopresyny w normowolemii',
        text: 'Zespół nieadekwatnego wydzielania wazopresyny (SIADH) to stan, w którym AVP jest uwalniana w sposób ciągły, niezależnie od osmolalności osocza. Skutkiem jest niekontrolowane zatrzymywanie wolnej wody przez nerki. Prowadzi to do hiponatremii z rozcieńczenia (dilutional hyponatremia) oraz hipoosmolalności osocza. Kluczowa cecha: chory jest w stanie klinicznej normowolemii (euvolemia) — nie ma obrzęków obwodowych ani cech odwodnienia, ponieważ nadmiar wody przesuwa się wewnątrzkomórkowo.',
      },
      {
        title: 'Kryteria diagnostyczne wg Barttera i Schwartza',
        text: 'Warunki konieczne do pewnego rozpoznania SIADH: 1) Hipoosmolalna hiponatremia (sód <135 mmol/l, osmolalność osocza <275 mOsm/kg); 2) Nieadekwatne zagęszczenie moczu (osmolalność moczu >100 mOsm/kg H2O przy niskiej osmolalności krwi); 3) Zwiększone wydalanie sodu w moczu (>30 mmol/l przy normalnej podaży soli); 4) Prawidłowa czynność nerek, tarczycy i kory nadnerczy (przed rozpoznaniem SIADH ZAWSZE wyklucz niedoczynność kory nadnerczy i niedoczynność tarczycy!); 5) Brak stosowania leków moczopędnych.',
      },
      {
        title: 'Leczenie i bezpieczna granica korekty sodu (CPM)',
        text: 'W łagodnym/umiarkowanym SIADH leczeniem z wyboru jest restrykcja płynów (zwykle <800–1000 ml/dobę). W ciężkiej, objawowej hiponatremii (drgawki, śpiączka) stosuje się 3% NaCl. ŻELAZNA ZASADA BEZPIECZEŃSTWA: Tempo wzrostu sodu NIE MOŻE przekraczać 8–10 mmol/l na dobę (a u osób wysokiego ryzyka <6–8 mmol/l/24h)! Zbyt szybkie podnoszenie sodu powoduje odwodnienie komórek mózgu i nieodwracalne zniszczenie osłonek mielinowych — zespół osmotycznej demielinizacji (mielinoliza środkowa mostu — CPM), objawiający się porażeniem czterokończynowym i zespołem zamknięcia (locked-in).',
      },
    ],
    table: {
      headers: ['Parametr laboratoryjny', 'Wartość w SIADH'],
      rows: [
        ['Sód w surowicy', 'Obniżony (<135 mmol/l, często <125 mmol/l)'],
        ['Osmolalność osocza', 'Niska (<275 mOsm/kg H2O) — hipoosmolalność'],
        ['Osmolalność moczu', 'Nieadekwatnie wysoka (>100 mOsm/kg, często >300 mOsm/kg)'],
        ['Sód w moczu', 'Wysoki (>30 mmol/l przy prawidłowej diecie)'],
      ],
    },
    advanced:
      'Głównymi przyczynami ektopowego SIADH są nowotwory złośliwe (aż 75% przypadków stanowi drobnokomórkowy rak płuca — SCLC syntetyzujący AVP), choroby OUN (udar, krwawienie podpajęczynówkowe, zapalenie opon) oraz leki (SSRI, karbamazepina, cyklofosfamid). W opornym SIADH opcją terapeutyczną są antagoniści receptora V2 wazopresyny — waptany (np. tolwaptan).',
    summary:
      'SIADH to hipoosmotyczna hiponatremia w normowolemii z nieadekwatnie zagęszczonym moczem. Podstawą leczenia jest ograniczenie podaży płynów, a w ostrych stanach 3% NaCl. Maksymalny wzrost sodu to 8–10 mmol/l/24h, aby uniknąć śmiertelnej mielinolizy mostu.',
    sourceIds: ['hyponatraemia'],
    questions: [
      q(
        'Jakie jest maksymalne bezpieczne tempo podnoszenia stężenia sodu w leczeniu przewlekłej hiponatremii w ciągu pierwszych 24 godzin?',
        ['Nie więcej niż 8–10 mmol/l na dobę (optymalnie 6–8 mmol/l)', 'Przekroczenie tego tempa grozi nieodwracalną osmotyczną demielinizacją mostu (CPM).'],
        ['Co najmniej 25–30 mmol/l w ciągu pierwszych 6 godzin', 'Tak gwałtowny wzrost doprowadziłby do zgonu lub porażenia czterokończynowego.'],
        ['Sód należy natychmiast wyrównać do 145 mmol/l bez względu na czas', 'Natychmiastowe wyrównanie jest błędem w sztuce lekarskiej o katastrofalnych skutkach neurologicznych.']
      ),
      q(
        'Który stan kliniczny należy bezwzględnie wykluczyć przed postawieniem pewnego rozpoznania zespołu SIADH?',
        ['Niedoczynność kory nadnerczy (niedobór glikokortykosteroidów) oraz ciężką niedoczynność tarczycy', 'Niedobór kortyzolu sam w sobie upośledza wydalanie wolnej wody i doskonale imituje SIADH.'],
        ['Przełom tarczycowy', 'Przełom tarczycowy nie wywołuje izolowanej hipoosmotycznej normowolemicznej hiponatremii.'],
        ['Akromegalię', 'Akromegalia nie jest stanem maskującym kryteria diagnostyczne SIADH.']
      ),
      q(
        'Jaki jest stan objętości wewnątrznaczyniowej (wolemii) u pacjenta z typowym zespołem SIADH?',
        ['Kliniczna normowolemia (euvolemia) — brak obrzęków obwodowych i brak cech odwodnienia', 'Nadmiar wolnej wody rozmieszcza się w całym ustroju, nie dając obrzęków obwodowych ani zastoju płucnego.'],
        ['Ciężka hipowolemia ze spadkiem ciśnienia tętniczego i tachykardią', 'Hipowolemia cechuje odwodnienie lub niewydolność nerek, a nie SIADH.'],
        ['Masywne uogólnione obrzęki (anasarca) z wodobrzuszem', 'Uogólnione obrzęki występują w niewydolności serca, marskości wątroby lub zespole nerczycowym.']
      ),
      q(
        'Co stanowi podstawowe postępowanie pierwszego rzutu u stabilnego pacjenta z bezobjawowym lub łagodnym SIADH?',
        ['Restrykcja płynów (ograniczenie picia płynów do poniżej 800–1000 ml/dobę)', 'Zmniejszenie dowozu wody zmusza organizm do stopniowego zagęszczenia sodu drogą strat niewidocznych.'],
        ['Podawanie dożylne 5% roztworu glukozy w dużej objętości', 'Glukoza 5% to płyn hipotoniczny (czysta woda), który drastycznie pogłębiłby hiponatremię i wywołał obrzęk mózgu!'],
        ['Natychmiastowa dializoterapia', 'Dializoterapia nie jest metodą pierwszego rzutu w niepowikłanym SIADH.']
      ),
      q(
        'Jaki nowotwór złośliwy najczęściej odpowiada za ektopowe wydzielanie wazopresyny i zespół SIADH?',
        ['Rak drobnokomórkowy płuca (SCLC)', 'Aż kilkanaście procent chorych z tym nowotworem wykazuje biochemiczne cechy ektopowego SIADH.'],
        ['Rak płaskonabłonkowy skóry', 'Nowotwory skóry nie produkują ekotopowo wazopresyny.'],
        ['Rak rdzeniasty tarczycy', 'Rak rdzeniasty wydziela kalcytoninę, a nie wazopresynę.']
      ),
    ],
  },
  {
    id: 'przysadka-zapalenia',
    moduleId: 'przysadka',
    title: 'Nacieczenia i zapalenia',
    subtitle: 'Hipofizyty limfocytowe, powikłania immunoterapii onkologicznej (ICI) i choroby ziarniniakowe',
    group: 'Sytuacje szczególne i chirurgia',
    minutes: 15,
    goals: [
      'Poznasz autoimmunologiczne zapalenie przysadki (hipofizyt) w ciąży i połogu.',
      'Zrozumiesz epidemię polekowych zapaleń przysadki po nowoczesnej immunoterapii onkologicznej (anty-CTLA-4, anty-PD-1).',
    ],
    sections: [
      {
        title: 'Autoimmunologiczne limfocytowe zapalenie przysadki (LYH)',
        text: 'Limfocytowe zapalenie przysadki (Lymphocytic Hypophysitis — LYH) to rzadka choroba autoimmunologiczna charakteryzująca się naciekiem limfocytarnym i niszczeniem miąższu gruczołu. Występuje klasycznie u kobiet w III trymestrze ciąży lub w pierwszych miesiącach połogu. W obrazie MRI przysadka jest symetrycznie powiększona, z pogrubieniem lejka szypuły (stalk thickening) i intensywnym, jednolitym wzmocnieniem kontrastowym, co bywa mylone z makrogruczolakiem! W odróżnieniu od guzów, w zapaleniu najwcześniej wypada oś ACTH i TSH, wywołując ciężkie osłabienie i hipotensję.',
      },
      {
        title: 'Rewolucja onkologiczna: Hipofizyt po inhibitorach punktów kontrolnych (ICI)',
        text: 'Wprowadzenie przeciwciał blokujących punkty kontrolne układu odpornościowego w onkologii (zwłaszcza anty-CTLA-4: ipilimumab, a także anty-PD-1/PD-L1: niwolumab, pembrolizumab) wywołało nową jednostkę chorobową — polekowy hipofizyt immunologiczny. Występuje u nawet 5–15% chorych leczonych ipilimumabem, zazwyczaj 8–12 tygodni po rozpoczęciu terapii. Objawia się bólami głowy, narastającym zmęczeniem, nudnościami i hiponatremią z powodu wtórnej niedoczynności nadnerczy.',
      },
      {
        title: 'Choroby naciekowe i ziarniniakowe siodła',
        text: 'Poza autoimmunizacją przysadka i podwzgórze mogą być zajęte przez choroby ogólnoustrojowe: 1) Sarkoidoza OUN (neurosarcoidosis): nacieki ziarniniakowe w szypule i podwzgórzu, dające moczówkę prostą i hiperprolaktynemię z odcięcia; 2) Histiocytoza z komórek Langerhansa (LCH): klasyczna triada z moczówką prostą u młodych chorych; 3) Hemochromatoza: odkładanie żelaza w komórkach gonadotropowych (hipogonadyzm hipogonadotropowy).',
      },
    ],
    table: {
      headers: ['Przyczyna zapalenia / nacieku', 'Charakterystyczne cechy'],
      rows: [
        ['Limfocytowe zapalenie (LYH)', 'Kobiety w ciąży i połogu; pogrubienie szypuły w MRI; wczesny niedobór ACTH'],
        ['Immunoterapia anty-CTLA-4', 'U chorych na czerniaka/raka nerki; bóle głowy, zmęczenie, hiponatremia'],
        ['Sarkoidoza / Histiocytoza', 'Częste zajęcie tylnego płata i szypuły = moczówka prosta + moczówka centralna'],
        ['Hemochromatoza', 'Selektywny zanik osi gonadotropowej (impotencja, brak miesiączki) przez żelazo'],
      ],
    },
    advanced:
      'W odróżnieniu od gruczolaków przysadki, w których lejek jest zepchnięty na bok (odchylenie szypuły), w hipofizycie oraz procesach ziarniniakowych lejek przysadki jest symetrycznie, wrzecionowato pogrubiały (>3–4 mm przy skrzyżowaniu) i wzmacnia się silnie po podaniu gadolinu. To kluczowy znak radiologiczny chroniący chorego przed niepotrzebną operacją.',
    summary:
      'Zapalenia przysadki (w ciąży lub po immunoterapii przeciwnowotworowej) imitują guza, lecz wcześnie niszczą oś ACTH i TSH. Wymagają szybkiej diagnostyki, substytucji hydrokortyzonem i monitorowania osi hormonalnych.',
    sourceIds: ['fleseriu', 'pituitary_endo'],
    questions: [
      q(
        'U chorego na czerniaka leczonego ipilimumabem (anty-CTLA-4) pojawia się silny ból głowy, zmęczenie i sód 128 mmol/l. Co należy pilnie podejrzewać?',
        ['Polekowy hipofizyt (zapalenie przysadki) z wtórną niedoczynnością kory nadnerczy', 'To częste powikłanie immunoterapii wymagające pilnego oznaczenia kortyzolu/ACTH i substytucji hydrokortyzonem.'],
        ['Pewny przerzut czerniaka do kości stopy', 'Ból głowy i hiponatremia wskazują na oś podwzgórzowo-przysadkową, a nie kości stopy.'],
        ['Chorobę Hashimoto z eutyreozą', 'Obraz kliniczny i terapia ipilimumabem jednoznacznie kierują uwagę na zapalenie przysadki.']
      ),
      q(
        'Który objaw radiologiczny w MRI siodła silnie przemawia za zapaleniem przysadki (hipofizytem), a nie za typowym gruczolakiem?',
        ['Symetryczne, wrzecionowate pogrubienie lejka przysadki (szypuły) >3–4 mm', 'W gruczolakach szypuła jest zwykle cienka i przemieszczona na bok, a w zapaleniu sama ulega nacieczeniu.'],
        ['Zwapnienia w kształcie skorupki jajka', 'Zwapnienia są typowe dla czaszkogardlaka lub tętniaka, a nie zapalenia.'],
        ['Całkowity brak jakichkolwiek tkanek w siodle (puste siodło)', 'Puste siodło to zanik tkanki, a w zapaleniu gruczoł jest obrzęknięty i powiększony.']
      ),
      q(
        'Która oś hormonalna ulega najczęściej i najwcześniej upośledzeniu w przebiegu limfocytowego zapalenia przysadki?',
        ['Oś kortykotropowa (ACTH — kortyzol)', 'W odróżnieniu od guzów, gdzie ACTH wypada na końcu, w zapaleniu oś ta jest niszczona wcześnie, zagrażając przełomem nadnerczowym.'],
        ['Oś kalcytoninowa', 'Kalcytonina to hormon tarczycy z komórek C, a nie przysadki.'],
        ['Oś renina-angiotensyna', 'Układ RAA jest nerkowo-wątrobowy i nie zależy od przysadki.']
      ),
      q(
        'Kiedy najczęściej występuje klasyczne limfocytowe zapalenie przysadki (LYH)?',
        ['W III trymestrze ciąży oraz we wczesnym połogu', 'Prawdopodobnie wiąże się to ze zmianami tolerancji immunologicznej w okresie okołoporodowym.'],
        ['U noworodków w pierwszej dobie życia', 'LYH nie jest chorobą okresu noworodkowego.'],
        ['Wyłącznie u mężczyzn po 80. roku życia', 'Klasyczna postać dotyczy w znakomitej większości młodych kobiet.']
      ),
      q(
        'Jaki objaw w zakresie tylnego płata często towarzyszy histiocytozie X i sarkoidozie z zajęciem siodła?',
        ['Moczówka prosta centralna na skutek nacieku podwzgórza i szypuły', 'Procesy ziarniniakowe mają szczególne powinowactwo do lejka przysadki i niszczą neurony wazopresynowe.'],
        ['Ciężki wytrzeszcz gałek ocznych', 'Wytrzeszcz nie jest typowy dla sarkoidozy przysadki.'],
        ['Masywny rozrost żuchwy jak w akromegalii', 'Zapalenia nie stymulują nadprodukcji hormonu wzrostu.']
      ),
    ],
  },
  {
    id: 'udar-przysadki',
    moduleId: 'przysadka',
    title: 'Gdy pęka naczynie w siodle',
    subtitle: 'Apopleksja przysadki, nagłe objawy oczne i pilne leczenie sterydami',
    group: 'Sytuacje szczególne i chirurgia',
    minutes: 16,
    goals: [
      'Rozpoznasz triadę objawów udaru przysadki (apopleksji): nagły piorunujący ból głowy, zaburzenia widzenia i oftalmoplegia.',
      'Ustalisz priorytety ratunkowe: natychmiastowy hydrokortyzon dożylnie i pilna konsultacja neurochirurgiczna.',
    ],
    sections: [
      {
        title: 'Mechanizm i triada kliniczna apopleksji',
        text: 'Udar niedokrwienny lub krwotoczny przysadki (apopleksja przysadki) to stan bezpośredniego zagrożenia życia wynikający z nagłego krwawienia lub zawału w obrębie gruczolaka przysadki (rzadziej w zdrowym gruczole). Guz rosnąc szybko, przerasta swoje unaczynienie lub uciska naczynia w otworze przepony siodła. Triada objawów: 1) Nagły, „piorunujący” ból głowy (często zagałkowy lub czołowy, imitujący krwawienie podpajęczynówkowe z tętniaka); 2) Ostre zaburzenia wzroku (spadek ostrości, ubytki pola widzenia z powodu nagłego uniesienia chiazmy); 3) Oftalmoplegia (opadanie powieki, podwójne widzenie wskutek ucisku nerwów III, IV, VI w ścianie zatoki jamistej).',
      },
      {
        title: 'Zagrożenie zgonem: Ostra wtórna niewydolność nadnerczy',
        text: 'Najczęstszą bezpośrednią przyczyną zgonu w apopleksji przysadki NIE jest uszkodzenie mózgu, lecz ostra niewydolność kory nadnerczy! Zniszczenie komórek kortykotropowych i gwałtowny spadek ACTH prowadzi do załamania stężenia kortyzolu, ciężkiej hipotensji, wstrząsu hemodynamicznego i zgonu. Dlatego każdy pacjent z podejrzeniem apopleksji musi NATYCHMIAST otrzymać dożylnie hydrokortyzon (100 mg w bolusie i 200 mg/dobę w ciągłym wlewie lub dawkach podzielonych) bez czekania na wyniki badań hormonalnych!',
      },
      {
        title: 'Postępowanie: Neurochirurgia vs leczenie zachowawcze',
        text: 'Wskazania do natychmiastowej operacji odbarczającej (transsphenoidalnej w ciągu pierwszych 24–48 godzin): postępujące pogorszenie ostrości wzroku, ubytki pola widzenia, zaburzenia świadomości (śpiączka) lub niestabilność neurologiczna. Jeśli pacjent jest stabilny, a wzrok zachowany i nie pogarsza się, dopuszczalne jest ścisłe monitorowanie na OIT i leczenie zachowawcze wysokimi dawkami sterydów.',
      },
    ],
    table: {
      headers: ['Objaw apopleksji', 'Mechanizm patofizjologiczny'],
      rows: [
        ['Piorunujący ból głowy', 'Nagłe rozciągnięcie opony twardej siodła tureckiego i gałęzi n. trójdzielnego'],
        ['Opadanie powieki / podwójne widzenie', 'Boczny ucisk nerwów gałkoruchowych (zwłaszcza n. III) w zatoce jamistej'],
        ['Ślepota / niedowidzenie', 'Nagłe uciśnięcie skrzyżowania wzrokowego przez krwiak nadsiodłowy'],
        ['Hipotensja / wstrząs naczyniowy', 'Ostra niewydolność nadnerczy z powodu zniszczenia komórek ACTH'],
      ],
    },
    advanced:
      'Czynniki wyzwalające apopleksję przysadki to m.in. leczenie przeciwkrzepliwe lub trombolityczne, operacje kardiochirurgiczne w krążeniu pozaustrojowym, nagłe wahania ciśnienia tętniczego, próby dynamiczne (stymulacja TRH/GnRH) oraz ciąża. W badaniu CT w fazie ostrej widoczna jest hiperdensyjna masa krwi w siodle, jednak MRI pozostaje badaniem o najwyższej czułości.',
    summary:
      'Apopleksja przysadki to ostry zespół neurologiczno-endokrynologiczny. Ratunkiem pierwszego rzutu jest natychmiastowe podanie hydrokortyzonu, a pogorszenie widzenia stanowi bezwzględne wskazanie do pilnego odbarczenia neurochirurgicznego.',
    sourceIds: ['baldeweg'],
    questions: [
      q(
        'Jaki lek należy podać natychmiast każdemu choremu z podejrzeniem apopleksji przysadki, jeszcze przed wynikami badań laboratoryjnych?',
        ['Hydrokortyzon dożylnie w dawce stresowej (np. 100 mg bolus)', 'Chroni chorego przed śmiertelnym wstrząsem w przebiegu ostrej wtórnej niedoczynności nadnerczy.'],
        ['Duże dawki aspiryny doustnie', 'Leki przeciwpłytkowe nasiliłyby krwawienie śródczaszkowe wewnątrz guza.'],
        ['Wlew dożylny dopaminy bez sterydów', 'Sama dopamina nie zastąpi niezbędnego dla przeżycia kortyzolu.'],
        ),
      q(
        'Który objaw u chorego z apopleksją przysadki kwalifikuje go do pilnej operacji neurochirurgicznej w trybie ostrym?',
        ['Postępujący ubytek pola widzenia i nagłe pogorszenie ostrości wzroku', 'Dekompresja chiazmy wzrokowej w ciągu 24–48 godzin zapobiega nieodwracalnej ślepocie.'],
        ['Izolowany ból gardła', 'Ból gardła nie jest objawem apopleksji ani wskazaniem do operacji.'],
        ['Stężenie prolaktyny wynoszące 28 ng/ml', 'Wartość prolaktyny nie decyduje o pilności odbarczenia struktur mózgowia.']
      ),
      q(
        'Z jakim innym zagrażającym życiu stanem neurologicznym najczęściej mylona jest apopleksja przysadki ze względu na nagły ból głowy?',
        ['Krwawieniem podpajęczynówkowym z pękniętego tętniaka mózgu (SAH)', 'W obu stanach ból głowy ma charakter nagłego, piorunującego uderzenia o maksymalnym nasileniu.'],
        ['Nawracającym łagodnym napięciowym bólem głowy', 'Ból napięciowy narasta powoli i nie wiąże się z objawami neurologicznymi ani wstrząsem.'],
        ['Zapaleniem nerwu kulszowego (rwą kulszową)', 'Rwa kulszowa dotyczy kończyny dolnej i kręgosłupa lędźwiowego.']
      ),
      q(
        'Dlaczego porażenie nerwu okoruchowego (III) jest typowym powikłaniem udaru guza przysadki?',
        ['Krwiak i obrzęk gwałtownie rozszerzają się na boki, uciskając nerw biegnący w ścianie zatoki jamistej', 'Objawia się to opadaniem powieki (ptosis), rozszerzeniem źrenicy i zaburzeniami ruchów gałki ocznej.'],
        ['Nerw III jest niszczony przez brak hormonów tarczycy', 'Hormony tarczycy nie odpowiadają bezpośrednio za mechaniczną kompresję nerwu.'],
        ['Przysadka produkuje substancje paraliżujące nerwy obwodowe', 'Gruczolaki nie wytwarzają neurotoksyn porażających nerwy czaszkowe.']
      ),
      q(
        'W jakiej strukturze najczęściej dochodzi do krwawienia w apopleksji przysadki?',
        ['W obrębie wcześniej istniejącego makrogruczolaka przysadki', 'Nieprawidłowo unaczynione, przerośnięte tkanki guza są wysoce podatne na zawał i wylew krwi.'],
        ['W prawidłowym rdzeniu kręgowym', 'Apopleksja przysadki dotyczy wnętrza siodła tureckiego w czaszce.'],
        ['W ścianie pęcherzyka żółciowego', 'Pęcherzyk żółciowy nie ma związku z apopleksją przysadki.']
      ),
    ],
  },
  {
    id: 'przysadka-operacje',
    moduleId: 'przysadka',
    title: 'Dojście przez zatokę klinową',
    subtitle: 'Neurochirurgia przezklinowa, trójfazowa odpowiedź wazopresynowa i opieka pooperacyjna',
    group: 'Sytuacje szczególne i chirurgia',
    minutes: 16,
    goals: [
      'Zrozumiesz zasady operacji przez zatokę klinową (dostęp transsphenoidalny — endoskopowy / mikroskopowy).',
      'Opanujesz monitorowanie powikłań pooperacyjnych: wycieku płynu mózgowo-rdzeniowego oraz klasycznej trójfazowej odpowiedzi wazopresyny.',
    ],
    sections: [
      {
        title: 'Dostęp przezklinowy (transsphenoidal surgery — TSS)',
        text: 'Operacja przez zatokę klinową jest podstawową techniką usuwania guzów siodła tureckiego. Współczesnym złotym standardem jest chirurgia endoskopowa z użyciem neuronawigacji: neurochirurg wprowadza endoskop przez nozdrza i jamę nosową, otwiera przednią ścianę zatoki klinowej i dno siodła tureckiego, zyskując doskonały wgląd w gruczolaka bez konieczności otwierania sklepienia czaszki (kraniotomii). Pozwala to na selektywną adenomektomię z oszczędzeniem zdrowego płata przysadki.',
      },
      {
        title: 'Trójfazowa odpowiedź wazopresynowa po operacji',
        text: 'Manipulacja na szypule i tylnym płacie przysadki podczas operacji może wywołać klasyczną trójfazową reakcję gospodarki wodnej w pierwszych 2 tygodniach: 1) Faza 1 (Doba 1–2): Moczówka prosta (brak AVP z powodu „szoku” neuronów — poliuria, wzrost sodu); 2) Faza 2 (Doba 3–7): SIADH (przejściowa intoksykacja wodna z powodu niekontrolowanego uwalniania zmagazynowanej AVP z obumierających aksonów — oliguria, groźna hiponatremia!); 3) Faza 3 (Po 7–10 dniach): Utrwalona moczówka prosta (jeśli neurony podwzgórza obumarły) lub powrót do pełnej eutyreozy wodnej.',
      },
      {
        title: 'Nadzór pooperacyjny: Płynotok i ocena remisji',
        text: 'Wczesny nadzór wymaga: 1) Kontroli wycieku płynu mózgowo-rdzeniowego przez nos (płynotok nosowy — CSF leak: wodnisty wyciek z nosa nasilający się przy pochyleniu; potwierdza go obecność beta-2-transferyny w płynie; niesie ryzyko zapalenia opon mózgowo-rdzeniowych); 2) Oceny osi ACTH w 2.–3. dobie (kortyzol rano <5 µg/dl świadczy o remisji choroby Cushinga, lecz wymaga natychmiastowej substytucji hydrokortyzonem; kortyzol >15 µg/dl wskazuje na przetrwałą chorobę); 3) Kontrolnego MRI po 3–6 miesiącach.',
      },
    ],
    table: {
      headers: ['Faza pooperacyjna', 'Mechanizm i postępowanie'],
      rows: [
        ['Faza 1 (doba 1–2): Moczówka', 'Szok szypuły; poliuria >300 ml/h; podawaj desmopresynę dopiero po potwierdzeniu hipernatremii'],
        ['Faza 2 (doba 3–7): SIADH', 'Uwalnianie zapasów AVP; groźba hiponatremii; bezwzględna restrykcja płynów!'],
        ['Faza 3 (po 7–10 dniach)', 'Utrwalona moczówka lub powrót normy; konieczny pomiar sodu przed wypisem do domu'],
        ['Wyciek CSF z nosa', 'Podejrzenie płynotoku; zakaz dmuchania nosa, leżenie z uniesionym wezgłowiem, pilny neurochirurg'],
      ],
    },
    advanced:
      'Dlaczego nie należy podawać desmopresyny w fazie 1 „na zapas” przy pojedynczej dużej zbiórce moczu? Ponieważ gdy po 2 dniach pacjent wejdzie w fazę 2 (masywny wyrzut endogennej wazopresyny z lizy aksonów), dodanie egzogennej desmopresyny doprowadzi do katastrofalnej intoksykacji wodnej, spadku sodu do <115 mmol/l i drgawek!',
    summary:
      'Nowoczesna chirurgia przysadki przez zatokę klinową jest mało inwazyjna, lecz wymaga ścisłego monitorowania: unikania powikłań płynotoku, czujności wobec trójfazowej odpowiedzi wazopresyny oraz wczesnej oceny remisji hormonalnej.',
    sourceIds: ['fleseriu', 'baldeweg'],
    questions: [
      q(
        'Czym charakteryzuje się druga faza klasycznej trójfazowej odpowiedzi po operacji przysadki (zwykle między 3. a 7. dobą)?',
        ['Zespołem SIADH z zatrzymaniem wody i ryzykiem ciężkiej hiponatremii na skutek uwalniania zmagazynowanej wazopresyny', 'Umierające aksony podwzgórzowe biernie uwalniają zapasy AVP do krążenia.'],
        ['Całkowitym ustąpieniem wszelkich zaburzeń na zawsze', 'Faza 2 jest podstępna, po niej może nastąpić utrwalona moczówka.'],
        ['Masywną utratą potasu z hipernatremią powyżej 170 mmol/l', 'W fazie 2 sód spada z powodu retencji wody, a nie rośnie.']
      ),
      q(
        'Jakie stężenie kortyzolu w surowicy rano w 2.–3. dobie po operacji choroby Cushinga wskazuje na doszczętne usunięcie gruczolaka (remisję)?',
        ['Bardzo niskie stężenie (<2–5 µg/dl), świadczące o stłumieniu zdrowych komórek kortykotropowych', 'Zdrowe komórki przysadki były przez lata uśpione ujemnym sprzężeniem; ich obudzenie trwa miesiące.'],
        ['Wysokie stężenie (>35 µg/dl)', 'Wysokie stężenie kortyzolu świadczy o niecałkowitej resekcji i przetrwałym guzie.'],
        ['Stężenie dokładnie równe 15 µg/dl', 'Wartość 15 µg/dl budzi podejrzenie braku pełnej remisji choroby.']
      ),
      q(
        'Pacjent po operacji przezklinowej zgłasza wyciek przezroczystego, słodkawego płynu z nosa nasilający się przy pochyleniu głowy do przodu. Jakie powikłanie należy podejrzewać?',
        ['Płynotok nosowy (wyciek płynu mózgowo-rdzeniowego — CSF leak)', 'Uszkodzenie pajęczynówki i opony w dnie siodła stwarza bezpośrednie wrota dla zakażenia opon mózgowo-rdzeniowych.'],
        ['Zwykły alergiczny nieżyt nosa', 'Płynotok pooperacyjny jest groźnym powikłaniem neurochirurgicznym i nigdy nie może być lekceważony jako katar.'],
        ['Ostre zapalenie spojówek', 'Zapalenie spojówek dotyczy worka spojówkowego, a nie wycieku z nosa.']
      ),
      q(
        'Dlaczego po operacji przysadki desmopresyny nie podaje się automatycznie przy pierwszych objawach poliurii?',
        ['Poliuria może być przejściowa, a podanie leku przed drugą fazą (SIADH) grozi śmiertelnym zatruciem wodnym', 'Desmopresynę podaje się rozważnie, dopiero gdy poliurii towarzyszy hipernatremia lub znaczny dyskomfort chorego.'],
        ['Desmopresyna jest lekiem toksycznym dla kości klinowej', 'Desmopresyna jest nanopeptydem i nie uszkadza kości klinowej.'],
        ['Desmopresynę wolno podawać wyłącznie przed operacją', 'Lek stosuje się w leczeniu pooperacyjnym, ale według ścisłych wskazań.']
      ),
      q(
        'Który marker biochemiczny w płynie wyciekającym z nosa pozwala definitywnie odróżnić płyn mózgowo-rdzeniowy od wydzieliny śluzowej nosa?',
        ['Beta-2-transferyna (lub beta-trace protein)', 'Białko to występuje wyłącznie w płynie mózgowo-rdzeniowym i perylimfie ucha wewnętrznego.'],
        ['Stężenie kwasu moczowego', 'Kwas moczowy nie różnicuje płynu mózgowo-rdzeniowego od śluzu nosowego.'],
        ['Obecność hemoglobiny glikowanej HbA1c', 'HbA1c to wskaźnik glikemii w krwinkach czerwonych, bezużyteczny w płynotoku.']
      ),
    ],
  },
];
