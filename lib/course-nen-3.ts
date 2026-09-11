import { type DraftLesson, q } from './course-types.ts';

export const draftNenPart3: DraftLesson[] = [
  {
    id: 'nen-pluc-oskrzeli',
    title: 'NEN oskrzeli i płuc: rakowiak typowy vs atypowy i raki drobnokomórkowe',
    group: 'Zespół rakowiaka i NEN przewodu pokarmowego oraz płuc',
    readTime: '13 min',
    goals: [
      'Poznać histopatologiczną klasyfikację NEN układu oddechowego wg WHO (rakowiak typowy, atypowy, LCNEC, SCLC).',
      'Zrozumieć kryteria różnicowania oparte na liczbie figur podziału na 2 mm² oraz obecności martwicy skrzepowej.',
      'Scharakteryzować odrębności kliniczne: częstsze zespoły ektopowe (ACTH) i zajęcie lewego serca w zespole rakowiaka.',
    ],
    sections: [
      {
        title: 'Klasyfikacja NEN układu oddechowego wg WHO',
        content:
          'Nowotwory neuroendokrynne płuc i oskrzeli stanowią około 20–25% wszystkich pierwotnych nowotworów płuc i dzielą się na cztery kategorie: (1) rakowiak typowy (TC — typical carcinoid), (2) rakowiak atypowy (AC — atypical carcinoid), (3) wielkokomórkowy rak neuroendokrynny (LCNEC — large cell neuroendocrine carcinoma) oraz (4) drobnokomórkowy rak płuca (SCLC — small cell lung carcinoma). W odróżnieniu od guzów przewodu pokarmowego (GEP-NEN), w płucach klasyfikacja opiera się tradycyjnie na liczbie figur podziału na 2 mm² oraz obecności lub braku martwicy.',
      },
      {
        title: 'Rakowiak typowy vs atypowy — kryteria różnicowania',
        content:
          'Rakowiak typowy (TC) to nowotwór o niskim stopniu złośliwości: wykazuje < 2 mitozy na 2 mm² i całkowity brak ognisk martwicy. Charakteryzuje się znakomitym rokowaniem (5-letnie przeżycie >90–95%) i niskim potencjałem przerzutowym (<10%). Rakowiak atypowy (AC) to nowotwór o pośrednim stopniu złośliwości: wykazuje 2 do 10 mitoz na 2 mm² i/lub obecność punktowej martwicy (focal necrosis). Ryzyko przerzutów do węzłów chłonnych i narządów odległych sięga w AC 30–50%, a 5-letnie przeżycie spada do 60–70%.',
      },
      {
        title: 'Odrębności kliniczne rakowiaków oskrzela',
        content:
          'Rakowiaki oskrzela nie drenują krwi do układu żyły wrotnej, lecz bezpośrednio przez żyły płucne do lewego przedsionka serca. Z tego powodu w rakowiaku oskrzela zespół rakowiaka może rozwinąć się bez obecności przerzutów w wątrobie. Dodatkowo krew bogata w serotoninę dociera najpierw do zastawek lewego serca, co sprawia, że w rakowiaku oskrzela w zespole Hedingera uszkodzeniu ulega zastawka mitralna i aortalna (a nie trójdzielna). Rakowiaki oskrzela są także najczęstszą przyczyną ektopowego zespołu Cushinga (ACTH).',
      },
    ],
    table: {
      caption: 'Kryteria diagnostyczne NEN płuc wg klasyfikacji WHO',
      headers: ['Typ nowotworu', 'Liczba mitoz (/2 mm²)', 'Martwica', 'Palenie tytoniu / 5-letnie przeżycie'],
      rows: [
        ['Rakowiak typowy (TC)', '< 2 mitozy', 'Brak martwicy', 'Brak korelacji z paleniem; 5-letnie przeżycie >90%'],
        ['Rakowiak atypowy (AC)', '2 – 10 mitoz', 'Obecna (punktowa martwica)', 'Słaba korelacja; 5-letnie przeżycie 60–70%'],
        ['LCNEC (wielkokomórkowy)', '> 10 mitoz (zwykle >30)', 'Obecna (rozległa martwica)', 'Silny związek z paleniem; przeżycie 15–25%'],
        ['SCLC (drobnokomórkowy)', '> 10 mitoz (zwykle >70)', 'Obecna (rozległa martwica)', 'Niemal wyłącznie palacze; przeżycie 5–10%'],
      ],
    },
    advanced:
      'W przypadku guzów LCNEC i SCLC w płucach wykazuje się niemal stuprocentową inaktywację genów TP53 oraz RB1. Standardem terapii w stadiach zaawansowanych jest chemioterapia oparta na pochodnych platyny i etopozydzie, często skojarzona z immunoterapią anty-PD-L1 (np. atezolizumab, durwalumab).',
    summary:
      'NEN płuc dzielą się na TC, AC, LCNEC i SCLC na podstawie liczby mitoz i obecności martwicy. Rakowiaki oskrzela mogą wywołać zespół rakowiaka i uszkodzenie zastawek lewego serca bez obecności przerzutów wątrobowych oraz ektopowy zespół Cushinga.',
    sourceIds: ['who-nen-2022', 'enets-consensus-2023'],
    questions: [
      q(
        'Które cechy histopatologiczne definiują rakowiaka atypowego (atypical carcinoid) płuca wg klasyfikacji WHO?',
        ['Obecność od 2 do 10 mitoz na 2 mm² i/lub obecność punktowej martwicy', 'Te cechy odróżniają go od rakowiaka typowego (<2 mitoz, brak martwicy) i kwalifikują do guzów o pośredniej złośliwości.'],
        ['Mniej niż 2 mitozy na 2 mm² przy całkowitym braku martwicy', 'To definicja rakowiaka typowego (TC).'],
        ['Ponad 50 mitoz na 2 mm² z naciekiem drobnokomórkowym', 'To obraz drobnokomórkowego raka płuca (SCLC).']
      ),
      q(
        'Dlaczego u pacjenta z rakowiakiem oskrzela powikłania zastawkowe zespołu rakowiaka mogą dotyczyć zastawki mitralnej i aortalnej?',
        ['Krew z płuc spływa bezpośrednio żyłami płucnymi do lewego przedsionka, eksponując lewe serce na wysokie stężenia serotoniny przed jej inaktywacją', 'Ominięcie krążenia płucnego chroniącego lewą komorę pozwala na uszkodzenie lewostronnych zastawek serca.'],
        ['Rakowiaki oskrzela nie wydzielają serotoniny, lecz kolagen', 'Wydzielają serotoninę, która stymuluje receptory 5-HT2B na wsierdziu.'],
        ['W oskrzelach występuje bezpośredni przeciek do tętnicy udowej', 'Krew spływa do żył płucnych, a nie tętnicy udowej.']
      ),
      q(
        'Jaki rakowiak płuca cechuje się najłagodniejszym przebiegiem i 5-letnim przeżyciem przekraczającym 90–95%?',
        ['Rakowiak typowy (TC — typical carcinoid)', 'Rakowiak typowy cechuje się niskim indeksem mitotycznym i brakiem martwicy, rokując znakomicie.'],
        ['Rakowiak atypowy (AC)', 'Rakowiak atypowy wykazuje większy potencjał przerzutowy, a przeżycie 5-letnie wynosi 60–70%.'],
        ['Wielkokomórkowy rak neuroendokrynny (LCNEC)', 'LCNEC to nowotwór o wysokiej złośliwości i złym rokowaniu.']
      ),
      q(
        'Jaki zespół paraneoplastyczny wywołany ektopowym wydzielaniem hormonów najczęściej kojarzy się z rakowiakami oskrzeli?',
        ['Ektopowy zespół Cushinga wywołany autonomiczną sekrecją ACTH', 'Rakowiaki oskrzela są najczęstszą przyczyną ektopowego ACTH z hipokaliemią i zasadowicą.'],
        ['Pierwotny hiperaldosteronizm (zespół Conna)', 'Rakowiaki oskrzela nie wydzielają aldosteronu.'],
        ['Zespół moczówki prostej nerkowej', 'Moczówka nie jest typowym powikłaniem hormonalnym rakowiaka oskrzela.']
      ),
      q(
        'Jaki profil mutacji genetycznych wykazują agresywne raki płuc LCNEC i SCLC w odróżnieniu od rakowiaków typowych?',
        ['Powszechną inaktywację genów supresorowych TP53 oraz RB1 (blisko 100% przypadków)', 'Mutacje te warunkują agresywny fenotyp i wrażliwość na chemioterapię opartą na pochodnych platyny.'],
        ['Mutacje konstytutywne receptora TSH', 'Receptor TSH nie odgrywa roli w patogenezie raków neuroendokrynnych płuc.'],
        ['Brak jakichkolwiek mutacji somatycznych', 'Nowotwory złośliwe wykazują liczne mutacje somatyczne indukowane dymem tytoniowym.']
      ),
    ],
  },
  {
    id: 'nen-zespol-men1',
    title: 'Zespół MEN1 (zespół Wermera): gen meniny i triada 3P',
    group: 'Zespoły uwarunkowane genetycznie',
    readTime: '13 min',
    goals: [
      'Zrozumieć genetykę zespołu MEN1: dziedziczenie autosomalne dominujące, gen MEN1 kodujący meninę jako gen supresorowy i hipotezę Knudsona.',
      'Scharakteryzować triadę narządową 3P: Przytarczyce (PHPT), Trzustka (pNET) oraz Przysadka (gruczolaki).',
      'Opanować harmonogram badań przesiewowych i strategię leczenia pierwotnej nadczynności przytarczyc w MEN1.',
    ],
    sections: [
      {
        title: 'Podłoże genetyczne i białko menina',
        content:
          'Zespół MEN1 (zespół Wermera) jest chorobą uwarunkowaną genetycznie o dziedziczeniu autosomalnym dominującym z bardzo wysoką penetracją (>95% do 50. roku życia). Odpowiada za nią mutacja inaktywująca w genie MEN1 (chromosom 11q13), kodującym białko meninę. Menina jest jądrowym białkiem supresorowym zaangażowanym w regulację transkrypcji, naprawę DNA i kontrolę cyklu komórkowego. Rozwój nowotworu wymaga utraty heterozygotyczności (LOH) — inaktywacji drugiego allelu genu MEN1 w komórce somatycznej (zgodnie z dwuuderzeniową hipotezą Knudsona).',
      },
      {
        title: 'Triada narządowa 3P (Parathyroid, Pancreas, Pituitary)',
        content:
          'Główne manifestacje MEN1 obejmują: (1) Przytarczyce (Parathyroid — pierwotna nadczynność przytarczyc występuje u >95% chorych, jest najwcześniejszym objawem, dotyczy wielogruczołowego przerostu wszystkich 4 gruczołów); (2) Guzy trzustki i dwunastnicy (Pancreas — pNET u 30–80% chorych, głównie wieloogniskowa gastrinoma w ścianie dwunastnicy i insulinoma); (3) Gruczolaki przysadki (Pituitary — u 30–40% chorych, najczęściej prolactinoma, rzadziej somatotropinoma lub guzy nieczynne hormonalnie). Dodatkowo występują guzy kory nadnerczy, tłuszczaki, oponiaki i rakowiaki oskrzela/grasicy.',
      },
      {
        title: 'Algorytm nadzoru i leczenie nadczynności przytarczyc',
        content:
          'Nadzór nosicieli mutacji MEN1 rozpoczyna się od 5.–8. roku życia i obejmuje coroczne oznaczenie wapnia zjonizowanego, PTH, prolaktyny, IGF-1, gastryny na czczo oraz okresowe badania obrazowe (MR przysadki co 3 lata, EUS/MR trzustki co 1–2 lata). W odróżnieniu od sporadycznej nadczynności przytarczyc (gdzie usuwa się pojedynczy gruczolak), w MEN1 standardem chirurgicznym jest subtotalna paratyroidektomia (usunięcie 3,5 gruczołu) lub całkowita paratyroidektomia z autotransplantacją fragmentu miąższu do mięśni przedramienia (aby ułatwić resekcję w razie nawrotu).',
      },
    ],
    table: {
      caption: 'Manifestacje narządowe w zespole MEN1',
      headers: ['Narząd / Składowa', 'Częstość u nosicieli', 'Wiodący fenotyp patologiczny', 'Badania przesiewowe'],
      rows: [
        ['Przytarczyce (Parathyroid)', '> 95% (do 40 r.ż.)', 'Wielogruczołowy przerost / mnogie gruczolaki', 'Wapń całkowity, zjonizowany, PTH (od 8 r.ż.)'],
        ['Trzustka/Dwunastnica (Pancreas)', '70–80%', 'Mnogie gastrinoma (dwunastnica), insulinoma, guzy nieczynne', 'Gastryna na czczo, chromogranina A, EUS, MR co 1–2 lata'],
        ['Przysadka (Pituitary)', '30–40%', 'Prolactinoma (zwykle makrogruczolaki), GH-secreting', 'Prolaktyna, IGF-1, MR przysadki co 3 lata (od 5 r.ż.)'],
        ['Grasica / Oskrzela / Nadnercza', '20–40%', 'Agresywne rakowiaki grasicy (mężczyźni), gruczolaki kory', 'Niskodawkowe TK klatki piersiowej co 2 lata'],
      ],
    },
    advanced:
      'Rakowiaki grasicy u pacjentów z MEN1 występują niemal wyłącznie u mężczyzn palących tytoń, cechują się skrajnie wysoką złośliwością i są wiodącą przyczyną zgonów związanych z MEN1. Z tego powodu u nosicieli mutacji MEN1 bezwzględnie zaleca się unikanie palenia tytoniu i profilaktyczną resekcję grasicy (tymektomię) podczas operacji przytarczyc.',
    summary:
      'MEN1 to choroba autosomalna dominująca wywołana mutacją genu meniny. Triada 3P obejmuje wielogruczołowy przerost przytarczyc, guzy pNET/dwunastnicy oraz gruczolaki przysadki. Operacja przytarczyc wymaga subtotalnej resekcji 3,5 gruczołu.',
    sourceIds: ['men-consensus-2021', 'who-nen-2022'],
    questions: [
      q(
        'Jaki zabieg operacyjny jest leczeniem z wyboru w pierwotnej nadczynności przytarczyc w przebiegu zespołu MEN1?',
        ['Subtotalna paratyroidektomia (usunięcie 3,5 gruczołu) lub całkowita paratyroidektomia z autotransplantacją do przedramienia', 'Z uwagi na proces wielogruczołowy usunięcie tylko jednego gruczołu prowadzi do szybkiego nawrotu hiperkalcemii u niemal 100% chorych.'],
        ['Wycięcie wyłącznie jednego, największego gruczolaka', 'Prowadzi do nieuniknionego i szybkiego nawrotu choroby z pozostałych powiększonych przytarczyc.'],
        ['Jednostronna lobektomia tarczycy', 'Przytarczyce nie są tkanką tarczycy i operacja tarczycy nie leczy ich przerostu.']
      ),
      q(
        'Który nowotwór w zespole MEN1 cechuje się wybitną predyspozycją do występowania u mężczyzn palących tytoń i skrajnie złośliwym przebiegiem?',
        ['Rakowiak grasicy', 'Rakowiak grasicy w MEN1 jest wysoce inwazyjny, szybko daje przerzuty i stanowi jedną z głównych przyczyn przedwczesnych zgonów.'],
        ['Mikrogruczolak prolaktynowy przysadki', 'Prolactinoma w MEN1 jest guzem łagodnym, doskonale odpowiadającym na agonistów dopaminy.'],
        ['Tłuszczak tkanki podskórnej', 'Tłuszczak to zmiana w 100% łagodna.']
      ),
      q(
        'Jakie trzy narządy tworzą klasyczną triadę 3P zespołu MEN1 (zespołu Wermera)?',
        ['Przytarczyce (PHPT), Trzustka/Dwunastnica (pNET) oraz Przysadka (gruczolaki)', 'Triada ta manifestuje się u większości nosicieli mutacji genu MEN1 do 40.–50. roku życia.'],
        ['Płuca, Prostata i Pęcherz moczowy', 'Płuca i prostata nie należą do klasycznej triady zespołu Wermera.'],
        ['Perykardium, Płuca i Pęcherzyk żółciowy', 'Żaden z tych narządów nie wchodzi w skład zespołu MEN1.']
      ),
      q(
        'Jaka jest funkcja biologiczna białka menina kodowanego przez gen MEN1 na chromosomie 11q13?',
        ['Menina jest jądrowym białkiem supresorowym kontrolującym transkrypcję i stabilność genomu', 'Brak funkcjonalnej meniny prowadzi do deregulacji transkrypcji i rozwoju guzów endokrynnych.'],
        ['Jest kinazą tyrozynową aktywującą receptor insulinowy', 'Menina nie jest kinazą tyrozynową ani receptorem insulinowym.'],
        ['Jest enzymem lizosomalnym rozkładającym sfingolipidy', 'Menina działa w jądrze komórkowym, a nie w lizosomach.']
      ),
      q(
        'Jaki guz neuroendokrynny pNET/dwunastnicy występuje najczęściej u chorych z zespołem MEN1?',
        ['Gastrinoma (często mnogie mikroogniska w ścianie dwunastnicy)', 'Gastrinoma odpowiada za ZES u chorych z MEN1 i stanowi najczęstszy czynny guz pNET w tym zespole.'],
        ['Glukagonoma ogona trzustki', 'Glukagonoma występuje w MEN1 rzadko (<3% chorych).'],
        ['Somatostatynoma wyrostka robaczkowego', 'Wyrostek robaczkowy nie jest typową lokalizacją guzów w zespole MEN1.']
      ),
    ],
  },
  {
    id: 'nen-zespol-men2',
    title: 'Zespoły MEN2A i MEN2B: onkogen RET, MTC i guz chromochłonny',
    group: 'Zespoły uwarunkowane genetycznie',
    readTime: '13 min',
    goals: [
      'Zrozumieć różnicę między genetyką MEN1 (gen supresorowy) a MEN2 (onkogen RET aktywowany mutacjami punktowymi typu gain-of-function).',
      'Porównać fenotypy kliniczne MEN2A (zespół Sipple\'a) oraz agresywny fenotyp MEN2B (zespół Gorlina).',
      'Opanować wytyczne ATA dotyczące korelacji genotyp-fenotyp i optymalnego wieku profilaktycznej tyroidectomii w zależności od kodonu mutacji RET.',
    ],
    sections: [
      {
        title: 'Podłoże genetyczne: protoonkogen RET',
        content:
          'Zespoły MEN2 (dziedziczone autosomalnie dominująco) są wywołane przez mutacje aktywujące (gain-of-function) protoonkogenu RET na chromosomie 10q11.2, kodującego receptorową kinazę tyrozynową RET. W odróżnieniu od genów supresorowych (MEN1, TP53), gdzie nowotworzenie wymaga utraty obu kopii genu, w protoonkogenie RET pojedyncza konstytutywna mutacja prowadzi do ligand-niezależnej dimeryzacji receptora, ciągłej autofosforyzacji tyrozyn i permanentnej aktywacji szlaków proliferacyjnych RAS/MAPK i PI3K/Akt.',
      },
      {
        title: 'Różnicowanie kliniczne: MEN2A vs MEN2B',
        content:
          'W zespole MEN2A (zespół Sipple\'a, 95% przypadków MEN2) występuje: rak rdzeniasty tarczycy (MTC — penetracja bliska 100%), guz chromochłonny nadnerczy (Pheo — 50%, zazwyczaj obustronny) oraz pierwotna nadczynność przytarczyc (PHPT — 20–30%). W zespole MEN2B (zespół Gorlina, 5%) występuje: skrajnie wczesny i wysoce agresywny MTC (rozwijający się w okresie niemowlęcym), Pheo (50%), zwojakonerwiaki błon śluzowych (ganglioneuromas na wargach, języku i w przewodzie pokarmowym — wywinięte wargi, zaparcia/megacolon) oraz marfanoidalna budowa ciała (długie kończyny, wiotkość stawów, brak zwichnięcia soczewki). W MEN2B NIGDY nie występuje nadczynność przytarczyc!',
      },
      {
        title: 'Korelacja genotyp-fenotyp i profilaktyczna tyroidectomia wg ATA',
        content:
          'Wytyczne American Thyroid Association (ATA) dzielą mutacje RET na kategorie ryzyka: (1) Kategoria najwyższego ryzyka (Highest Risk / HST) — mutacja kodonu M918T (typowa dla MEN2B): bezwzględne wskazanie do tyroidectomii w 1. roku życia (często w pierwszych miesiącach); (2) Wysokie ryzyko (High Risk / H) — mutacje kodonów 634 (najczęstsza w MEN2A) i 883: profilaktyczna tyroidectomia przed 5. rokiem życia; (3) Umiarkowane ryzyko (Moderate Risk / MOD) — kodony 609, 611, 618, 620, 768, 790, 804: zabieg w wieku dziecięcym lub odroczenie w zależności od kalcytoniny w surowicy.',
      },
    ],
    table: {
      caption: 'Porównanie zespołów MEN2A i MEN2B',
      headers: ['Cecha / Narząd', 'Zespół MEN2A', 'Zespół MEN2B', 'Uwagi kliniczne'],
      rows: [
        ['Rak rdzeniasty tarczycy (MTC)', '> 95% (pojawia się w wieku 5–20 lat)', '100% (pojawia się w 1. roku życia, bardzo złośliwy)', 'Kalcytonina i CEA to wiodące markery'],
        ['Guz chromochłonny (Pheo)', 'Ok. 50% (często obustronny)', 'Ok. 50% (często obustronny)', 'Pheo ZAWSZE musi być zoperowane PRZED tarczycą!'],
        ['Nadczynność przytarczyc (PHPT)', '20–30% (łagodny przebieg)', '0% (NIGDY nie występuje)', 'Brak konieczności rewizji przytarczyc w MEN2B'],
        ['Cechy fenotypowe', 'Liszaj amyloidowy skóry, choroba Hirschsprunga', 'Nerwiaki błon śluzowych, fenotyp marfanoidalny', 'Umożliwia rozpoznanie kliniczne u noworodka'],
      ],
    },
    advanced:
      'Złota zasada bezpieczeństwa w MEN2: Przed jakąkolwiek operacją tarczycy (lub inną procedurą w znieczuleniu) u nosiciela mutacji RET należy bezwzględnie oznaczyć wolne metanefryny w osoczu lub moczu, aby wykluczyć nierozpoznany guz chromochłonny. Znieczulenie pacjenta z czynnym Pheo grozi śmiertelnym przełomem nadciśnieniowym na stole operacyjnym.',
    summary:
      'MEN2 wynika z mutacji aktywujących kinazę RET. MEN2A obejmuje MTC, Pheo i PHPT; MEN2B to wybitnie agresywny MTC w niemowlęctwie, Pheo, nerwiaki błon śluzowych i budowa marfanoidalna bez cech PHPT. Pheo zawsze operuje się przed tarczycą.',
    sourceIds: ['ata-mtc-2024', 'men-consensus-2021'],
    questions: [
      q(
        'W jakiej kolejności należy przeprowadzić leczenie operacyjne u pacjenta z zespołem MEN2A, u którego stwierdzono jednocześnie raka rdzeniastego tarczycy oraz guza chromochłonnego prawego nadnercza?',
        ['W pierwszej kolejności adrenalektomia (operacja guza chromochłonnego), a dopiero po jej wygojeniu tyroidectomia', 'Znieczulenie pacjenta z nieusuniętym guzem chromochłonnym grozi śmiertelnym przełomem adrenergicznym, tachyarytmią i zawałem serca na stole operacyjnym.'],
        ['W pierwszej kolejności natychmiastowa całkowita tyroidectomia', 'Jest to błąd w sztuce lekarskiej stwarzający bezpośrednie ryzyko zgonu chorego podczas intubacji.'],
        ['Jednoczasowa operacja z jednego cięcia brzuszno-szyjnego', 'Zabiegi te wykonuje się sekwencyjnie dla bezpieczeństwa hemodynamicznego pacjenta.']
      ),
      q(
        'Nosicielstwo której mutacji protoonkogenu RET wymaga przeprowadzenia profilaktycznej tyroidectomii już w 1. roku życia dziecka?',
        ['Mutacji kodonu M918T (kategoria najwyższego ryzyka ATA HST w zespole MEN2B)', 'Mutacja M918T wywołuje złośliwego raka rdzeniastego już w pierwszych miesiącach życia z wczesnymi przerzutami odległymi.'],
        ['Mutacji kodonu 634', 'Kodony 634 kwalifikują do operacji przed 5. rokiem życia.'],
        ['Mutacji kodonu 790', 'Kodon 790 to kategoria umiarkowanego ryzyka, pozwalająca na operację w wieku późniejszym.']
      ),
      q(
        'Czym różni się zespół MEN2B od zespołu MEN2A pod względem zaangażowania przytarczyc?',
        ['W zespole MEN2B nadczynność przytarczyc NIGDY nie występuje', 'Brak składowej przytarczycowej w MEN2B zwalnia z konieczności rutynowego poszukiwania hiperplazji tych gruczołów.'],
        ['W MEN2B nadczynność przytarczyc występuje u 100% chorych', 'W MEN2B przytarczyce nie biorą udziału w procesie nowotworzenia.'],
        ['W MEN2A przytarczyce nigdy nie ulegają przerostowi', 'W MEN2A hiperplazja przytarczyc dotyczy 20–30% nosicieli mutacji.']
      ),
      q(
        'Jakie unikalne cechy fenotypowe pozwalają rozpoznać zespół MEN2B u noworodka lub niemowlęcia bez badań genetycznych?',
        ['Nerwiaki błon śluzowych warg i języka, wywinięte wargi oraz marfanoidalna budowa ciała', 'Cechy te są patognomoniczne dla MEN2B i nakazują pilną tyroidectomię w 1. roku życia.'],
        ['Karłowatość z przedwczesnym zarośnięciem nasad kości', 'W MEN2B pacjenci są wysocy i smukli (fenotyp marfanoidalny).'],
        ['Otyłość olbrzymia z polidaktylią', 'To fenotyp zespołu Pradera-Williego lub Bardeta-Biedla.']
      ),
      q(
        'Dlaczego przed jakąkolwiek planowaną operacją tarczycy u nosiciela mutacji RET bezwzględnie oznacza się wolne metanefryny?',
        ['Aby wykluczyć bezobjawowego guza chromochłonnego i zapobiec śmiertelnemu przełomowi nadciśnieniowemu w znieczuleniu', 'U 50% chorych z MEN2 rozwija się guz chromochłonny, który musi być usunięty przed jakąkolwiek inną operacją.'],
        ['Aby ocenić zapotrzebowanie na lewotyroksynę po tyroidectomii', 'Metanefryny nie mają związku z dawką substytucyjną LT4.'],
        ['Metanefryny są bezpośrednim biomarkerem masy raka rdzeniastego', 'Markerami raka rdzeniastego są kalcytonina i CEA, a nie metanefryny.']
      ),
    ],
  },
  {
    id: 'nen-zespol-men4',
    title: 'Zespół MEN4: gen CDKN1B i diagnostyka różnicowa z MEN1',
    group: 'Zespoły uwarunkowane genetycznie',
    readTime: '12 min',
    goals: [
      'Zdefiniować podłoże genetyczne zespołu MEN4: mutacje genu CDKN1B kodującego inhibitor kinaz cyklinozależnych p27Kip1.',
      'Scharakteryzować fenotyp kliniczny MEN4 jako fenokopię zespołu MEN1 u pacjentów bez mutacji w genie meniny.',
      'Poznać rolę nowoczesnego sekwencjonowania wielogenowego (NGS) w diagnostyce zespołów mnogiej gruczolakowatości wewnątrzwydzielniczej.',
    ],
    sections: [
      {
        title: 'Odkrycie i podłoże molekularne zespołu MEN4',
        content:
          'Około 10–20% pacjentów prezentujących klasyczny fenotyp kliniczny zespołu MEN1 (np. pierwotna nadczynność przytarczyc skojarzona z gruczolakiem przysadki lub guzem trzustki) nie wykazuje mutacji w genie MEN1. W 2006 roku zidentyfikowano u części tych chorych mutacje germinalne w genie CDKN1B (chromosom 12p13), kodującym białko p27Kip1 — kluczowy inhibitor kinaz cyklinozależnych (CDK) kontrolujący punkt kontrolny G1/S cyklu komórkowego. Jednostkę tę nazwano zespołem MEN4.',
      },
      {
        title: 'Fenotyp kliniczny i narządy docelowe',
        content:
          'Fenotyp MEN4 wykazuje znaczne podobieństwo do MEN1 (jest jego fenokopią), lecz cechuje się niższą penetracją i późniejszym początkiem objawów klinicznych (zwykle w 5.–6. dekadzie życia). Najczęstszą manifestacją jest pierwotna nadczynność przytarczyc (PHPT u >80% chorych) oraz gruczolaki przysadki (prolactinoma, guzy somatotropowe i kortykotropowe). U chorych z MEN4 opisuje się także guzy neuroendokrynne trzustki i przewodu pokarmowego, rakowiaki oskrzela, nowotwory narządów rodnych oraz nadnerczy.',
      },
      {
        title: 'Panel NGS w diagnostyce różnicowej',
        content:
          'Współczesna diagnostyka genetyczna zespołów mnogiej gruczolakowatości wewnątrzwydzielniczej odeszła od sekwencjonowania pojedynczych genów metodą Sangera. U każdego pacjenta z podejrzeniem zespołu MEN standardem jest zastosowanie panelu celowanego NGS (Next-Generation Sequencing), obejmującego równoczasową analizę genów: MEN1, RET, CDKN1B (MEN4), CDKN1A, CDKN2B, CDKN2C oraz PRKAR1A i AIP. Pozwala to na jednoznaczne ustalenie rozpoznania i zaplanowanie nadzoru rodzinnego.',
      },
    ],
    table: {
      caption: 'Porównanie zespołów MEN1 i MEN4',
      headers: ['Cecha porównawcza', 'Zespół MEN1', 'Zespół MEN4'],
      rows: [
        ['Gen / Białko', 'MEN1 (11q13) / Menina (białko jądrowe)', 'CDKN1B (12p13) / p27Kip1 (inhibitor kinaz CDK)'],
        ['Częstość występowania', '1 na 20 000 – 40 000 urodzeń', '< 1–3% chorych z podejrzeniem MEN1 bez mutacji'],
        ['Wiek ujawnienia się PHPT', 'Wczesny (często przed 25.–30. r.ż.)', 'Późniejszy (średnio po 40.–50. r.ż.)'],
        ['Penetracja w populacji', 'Bardzo wysoka (>95% do 50 r.ż.)', 'Niepełna penetracja (częstsze przypadki poronne)'],
      ],
    },
    advanced:
      'Inne rzadkie mutacje inhibitorów cyklin (CDKN1A / p21, CDKN2B / p15, CDKN2C / p18) są badane jako potencjalne zespoły MENX u pacjentów z rodzinnymi guzami neuroendokrynnymi, u których nie wykryto mutacji w MEN1 i CDKN1B.',
    summary:
      'Zespół MEN4 to fenokopia MEN1 wywołana mutacjami w genie CDKN1B (p27Kip1). Cechuje się późniejszym początkiem i niższą penetracją. Diagnostyka opiera się na panelach sekwencjonowania nowej generacji (NGS).',
    sourceIds: ['men-consensus-2021', 'who-nen-2022'],
    questions: [
      q(
        'Mutacja w którym genie odpowiada za rozwój zespołu MEN4 u chorego prezentującego nadczynność przytarczyc i gruczolaka przysadki bez mutacji w genie meniny?',
        ['CDKN1B (kodującym inhibitor kinaz cyklinozależnych p27Kip1)', 'Mutacja germinalna CDKN1B zaburza hamowanie cyklu komórkowego w fazie G1, prowadząc do fenotypu MEN4.'],
        ['RET', 'Mutacja RET odpowiada za zespoły MEN2A i MEN2B.'],
        ['VHL', 'Mutacja VHL odpowiada za zespół von Hippla-Lindaua.']
      ),
      q(
        'Czym różni się przebieg kliniczny zespołu MEN4 od klasycznego zespołu MEN1?',
        ['Niższą penetracją genetyczną i wyraźnie późniejszym wiekiem wystąpienia pierwszych objawów klinicznych', 'W MEN4 objawy rozwijają się zazwyczaj w 5.–6. dekadzie życia, podczas gdy w MEN1 w okresie młodzieńczym.'],
        ['Występowaniem wyłącznie u kobiet', 'MEN4 dziedziczy się autosomalnie dominująco i występuje u obu płci.'],
        ['100% ryzykiem wystąpienia raka rdzeniastego tarczycy', 'MTC nie jest składową MEN4, występuje w MEN2.']
      ),
      q(
        'Jaka jest biologiczna funkcja białka p27Kip1 kodowanego przez gen CDKN1B?',
        ['Hamuje kompleksy CDK/cyklina w punkcie kontrolnym G1/S, blokując niekontrolowane podziały komórkowe', 'Utrata funkcji p27Kip1 skutkuje brakiem hamowania cyklu komórkowego i hiperplazją tkanek endokrynnych.'],
        ['Jest receptorem błonowym dla dopaminy w przednim płacie przysadki', 'Dopamina wiąże się z receptorem D2 sprzężonym z białkiem Gi, a nie p27Kip1.'],
        ['Odpowiada za resorpcję wapnia w cewkach dalszych nerek', 'Za transport wapnia odpowiadają kanały TRPV5/6 i pompa PMCA, a nie p27Kip1.']
      ),
      q(
        'Jaka manifestacja endokrynna występuje najczęściej u pacjentów z potwierdzonym zespołem MEN4 (>80% chorych)?',
        ['Pierwotna nadczynność przytarczyc (PHPT)', 'Podobnie jak w MEN1, pierwotna nadczynność przytarczyc jest wiodącą manifestacją w MEN4.'],
        ['Guz chromochłonny nadnerczy (Pheo)', 'Pheo nie jest typową manifestacją zespołu MEN4.'],
        ['Rak pęcherzykowy tarczycy', 'Nowotwory tarczycy wywodzące się z komórek pęcherzykowych nie należą do kryteriów MEN4.']
      ),
      q(
        'Jaka metoda diagnostyczna jest współcześnie standardem różnicowania nietypowych zespołów MEN bez mutacji MEN1?',
        ['Panel celowanego sekwencjonowania wielogenowego NGS (obejmujący MEN1, RET, CDKN1B, AIP i in.)', 'Jednoczesne sekwencjonowanie wielu genów pozwala szybko zidentyfikować mutacje w rzadkich genach predyspozycji.'],
        ['Oznaczenie kariotypu prążkowego z limfocytów krwi obwodowej', 'Kariotyp wykrywa aberracje chromosomalne, a nie mutacje punktowe w genach MEN.'],
        ['Pojedynczy test immunoenzymatyczny ELISA na obecność autoprzeciwciał przeciw meninie', 'Zespoły MEN mają podłoże mutacji germinalnych, a nie procesów autoimmunizacyjnych.']
      ),
    ],
  },
  {
    id: 'nen-vhl-nf1',
    title: 'Zespoły von Hippla-Lindaua (VHL) i neurofibromatozy (NF1): pNET i Pheo',
    group: 'Zespoły uwarunkowane genetycznie',
    readTime: '13 min',
    goals: [
      'Poznać rolę białka VHL w szlaku degradacji czynnika indukowanego hipoksją (HIF-1alpha) i patogenezie guzów naczyniowych oraz pNET.',
      'Scharakteryzować manifestacje narządowe w zespole VHL: naczyniaki siatkówki i móżdżku, rak jasnokomórkowy nerki, guz chromochłonny i pNET.',
      'Poznać manifestacje endokrynne w neurofibromatozie typu 1 (NF1): guz chromochłonny nadnerczy i rakowiak dwunastnicy.',
    ],
    sections: [
      {
        title: 'Szlak VHL / HIF-1alpha i biologia nowotworzenia',
        content:
          'Zespół von Hippla-Lindaua (VHL) jest chorobą dziedziczoną autosomalnie dominująco (1:36 000), wywołaną mutacją genu supresorowego VHL (chromosom 3p25). Białko pVHL tworzy kompleks ligazy ubikwitynowej E3, która w warunkach prawidłowego utlenowania komórki (normoksja) rozpoznaje prolinowo-hydroksylowany czynnik HIF-1alpha i kieruje go do proteasomalnej degradacji. Utrata funkcji pVHL powoduje, że HIF-1alpha ulega permanentnej akumulacji, aktywując transkrypcję genów VEGF, PDGF, GLUT1 i TGF-alfa. Prowadzi to do rzekomej hipoksji (pseudohypoxia) i masywnej, patologicznej angiogenezy.',
      },
      {
        title: 'Manifestacje narządowe zespołu VHL',
        content:
          'Klasyczne cechy VHL obejmują: (1) naczyniaki krwionośne siatkówki (retinal hemangioblastomas — grożące odwarstwieniem siatkówki i ślepotą), (2) naczyniaki móżdżku i rdzenia kręgowego, (3) obustronny, wieloogniskowy rak jasnokomórkowy nerki (ccRCC), (4) guz chromochłonny nadnerczy (Pheo — 10–20%, często obustronny i pozanadnerczowy) oraz (5) zmiany trzustkowe u 70% chorych — torbiele wielokomorowe, torbielakogruczolaki surowicze oraz guzy neuroendokrynne trzustki (pNET u 10–15% pacjentów, niemal zawsze nieczynne hormonalnie).',
      },
      {
        title: 'Manifestacje endokrynne w neurofibromatozie typu 1 (NF1)',
        content:
          'Neurofibromatoza typu 1 (choroba von Recklinghausena) wynika z mutacji genu NF1 (17q11.2) kodującego neurofibrominę — białko aktywujące GTP-azę (GAP) i hamujące onkogen RAS. Oprócz plam café-au-lait, piegów w dołach pachowych i nerwiakowłókniaków, u około 1–5% chorych rozwija się guz chromochłonny (Pheo). Dodatkowo unikalną manifestacją w przewodzie pokarmowym u chorych z NF1 jest guz neuroendokrynny brodawki Vatera / dwunastnicy wydzielający somatostatynę (somatostatynoma dwunastnicy z ciałkami piaszczakowatymi).',
      },
    ],
    table: {
      caption: 'Zespoły genetyczne predysponujące do pNET i guza chromochłonnego',
      headers: ['Zespół', 'Gen / Dziedziczenie', 'Manifestacja w trzustce', 'Manifestacja w nadnerczach i inne cechy'],
      rows: [
        ['Zespół VHL', 'VHL (3p25) / AD', 'Mnogie torbiele trzustki, pNET nieczynne (15%)', 'Guz chromochłonny (Pheo), ccRCC, naczyniaki OUN i siatkówki'],
        ['Zespół NF1', 'NF1 (17q11.2) / AD', 'Somatostatynoma dwunastnicy / brodawki Vatera', 'Guz chromochłonny, plamy café-au-lait, nerwiakowłókniaki'],
        ['Zespół MEN1', 'MEN1 (11q13) / AD', 'Mnogie pNET czynne (gastrinoma, insulinoma)', 'Gruczolaki kory nadnerczy, pierwotna nadczynność przytarczyc, gruczolaki przysadki'],
        ['Zespół MEN2A', 'RET (10q11.2) / AD', 'Brak zmian w trzustce', 'Guz chromochłonny (50%), rak rdzeniasty tarczycy (100%), PHPT'],
      ],
    },
    advanced:
      'W leczeniu nowotworów związanych z zespołem VHL (ccRCC, naczyniaki OUN, pNET) przełomem stał się belzutifan — pierwszy doustny drobnocząsteczkowy inhibitor czynnika HIF-2alpha. Poprzez bezpośrednią blokadę dimeryzacji HIF-2alpha z ARNT hamuje angiogenezę i indukuje regresję guzów trzustki i nerek bez konieczności okaleczającej chirurgii.',
    summary:
      'Zespół VHL cechuje się pseudohipoksją przez stabilizację HIF i manifestuje się naczyniakami OUN/siatkówki, ccRCC, Pheo i pNET. NF1 predysponuje do Pheo i somatostatynoma dwunastnicy. Nowoczesną terapią w VHL jest inhibitor HIF-2alpha — belzutifan.',
    sourceIds: ['who-nen-2022', 'enets-consensus-2023'],
    questions: [
      q(
        'Jaki molekularny mechanizm odpowiada za patologiczną angiogenezę i rozwój guzów naczyniowych oraz pNET w zespole VHL?',
        ['Brak degradacji HIF-1alpha i HIF-2alpha prowadzący do nadmiernej transkrypcji genów naczyniowych (VEGF, PDGF) w stanie normoksji', 'Utrata białka pVHL uniemożliwia ubikwitynację HIF, wywołując stan rzekomej hipoksji komórkowej.'],
        ['Blokada receptorów dla somatostatyny w błonie komórkowej', 'VHL nie wpływa bezpośrednio na ekspresję SSTR2.'],
        ['Nadmierna synteza parathormonu przez nerki', 'Zaburzenia wapniowe nie są cechą patognomoniczną VHL.']
      ),
      q(
        'Który nowotwór neuroendokrynny przewodu pokarmowego wykazuje wybitną predyspozycję do występowania u chorych z neurofibromatozą typu 1 (NF1)?',
        ['Guz wydzielający somatostatynę (somatostatynoma) w okolicy brodawki Vatera w dwunastnicy', 'Somatostatynoma dwunastnicy z ciałkami piaszczakowatymi jest klasyczną składową gastroenterologiczną zespołu NF1.'],
        ['Insulinoma ogona trzustki', 'Insulinoma jest typowa dla MEN1, nie NF1.'],
        ['Glukagonoma trzonu trzustki', 'Glukagonoma rzadko występuje w zespołach uwarunkowanych genetycznie.']
      ),
      q(
        'Jaki nowoczesny drobnocząsteczkowy inhibitor czynnika HIF-2alpha zrewolucjonizował leczenie guzów pNET i nerek w zespole VHL?',
        ['Belzutifan', 'Belzutifan blokuje dimeryzację HIF-2alpha z ARNT, wygaszając transkrypcję VEGF i hamując wzrost nowotworów w VHL.'],
        ['Temozolomid', 'Temozolomid jest lekiem alkilującym stosowanym w pNET, a nie inhibitorem HIF.'],
        ['Lanreotyd', 'Lanreotyd jest analogiem somatostatyny, a nie inhibitorem HIF-2alpha.']
      ),
      q(
        'Jaki charakter mają guzy neuroendokrynne trzustki (pNET) rozwijające się u chorych z zespołem von Hippla-Lindaua?',
        ['W przeważającej większości (>90%) są nieczynne hormonalnie i często mnogie', 'Guzy pNET w VHL rzadko wydzielają aktywne aminy lub peptydy, manifestując się masą guza lub torbielami.'],
        ['Zawsze wywołują ciężką hipoglikemię z hiperinsulinizmem', 'Insulinoma jest typowa dla zespołu MEN1, a nie VHL.'],
        ['Produkują wyłącznie gastrynę w trójkącie Passaro', 'Gastrinoma w VHL występuje skrajnie rzadko.']
      ),
      q(
        'Jaka jest biologiczna rola neurofibrominy kodowanej przez gen NF1 na chromosomie 17q11.2?',
        ['Działa jako białko aktywujące GTP-azę (GAP), wygaszając aktywność protoonkogenu RAS', 'Utrata neurofibrominy prowadzi do konstytutywnej aktywacji szlaku RAS/MAPK i proliferacji nowotworowej.'],
        ['Jest czynnikiem transkrypcyjnym dla preproinsuliny', 'Neurofibromina nie reguluje transkrypcji insuliny.'],
        ['Stanowi podjednostkę pompy sodowo-potasowej', 'Neurofibromina jest białkiem cytoplazmatycznym regulującym szlaki sygnałowe.']
      ),
    ],
  },
];
