import { type DraftLesson, q } from './course-types.ts';

export const draftNenPart1: DraftLesson[] = [
  {
    id: 'nen-biologia-markery',
    title: 'Biologia komórki neuroendokrynnej i markery CgA oraz 5-HIAA',
    group: 'Fundamenty i diagnostyka',
    readTime: '12 min',
    goals: [
      'Zrozumieć fenotyp komórek neuroendokrynnych, ziarnistości wydzielnicze o gęstym rdzeniu i ekspresję synaptofizyny oraz chromograniny A.',
      'Poznać czynniki wywołujące fałszywie dodatnie podwyższenie chromograniny A (CgA), zwłaszcza terapię IPP i niewydolność nerek.',
      'Scharakteryzować diagnostykę metabolitu serotoniny (kwas 5-hydroksyindolooctowy, 5-HIAA) w DZM lub osoczu oraz restrykcje dietetyczne.',
    ],
    sections: [
      {
        title: 'Pochodzenie i fenotyp komórek układu neuroendokrynnego (DNES)',
        content:
          'Komórki neuroendokrynne rozsiane w całym organizmie wywodzą się z endodermy (przewód pokarmowy, drogi oddechowe) lub grzebienia nerwowego. Charakteryzują się obecnością ziarnistości wydzielniczych o gęstym rdzeniu (dense-core vesicles), w których magazynowane są aminy biogenne (serotonina, histamina, dopamina) oraz hormony polipeptydowe (gastryna, glukagon, insulina, VIP, somatostatyna). Pęcherzyki synaptyczne zawierają synaptofizynę, która w immunohistochemii stanowi uniwersalny marker tkanki neuroendokrynnej.',
      },
      {
        title: 'Chromogranina A (CgA) — marker uniwersalny i jego pułapki',
        content:
          'Chromogranina A (CgA) to kwaśna glikoproteina o masie 49 kDa, wydzielana z ziarnistości komórek neuroendokrynnych. Koreluje z całkowitą masą guza i służy do monitorowania odpowiedzi na leczenie oraz wczesnego wykrywania wznowy. Kluczowe ograniczenie stanowi niska swoistość: stężenie CgA gwałtownie rośnie w wyniku stosowania inhibitorów pompy protonowej (IPP wywołują hipergastrynemię i hiperplazję komórek ECL), niewydolności nerek (obniżony klirens kłębuszkowy), zanikowego zapalenia żołądka, marskości wątroby i niewydolności serca.',
      },
      {
        title: 'Kwas 5-hydroksyindolooctowy (5-HIAA) jako wskaźnik sekrecji serotoniny',
        content:
          'U pacjentów z nowotworami jelita cienkiego (rakowiakami midgut) metabolit serotoniny — kwas 5-hydroksyindolooctowy (5-HIAA) oznaczany w dobowej zbiórce moczu (DZM) lub w osoczu — cechuje się swoistością rzędu 90–95%. Przed zbiórką moczu pacjent musi bezwzględnie odstawić na 3–5 dni pokarmy bogate w serotoninę i tryptofan: banany, orzechy włoskie, awokado, ananasy, kiwi, bakłażany, pomidory oraz czekoladę, a także leki (np. paracetamol, salicylany).',
      },
    ],
    table: {
      caption: 'Markery krążące w nowotworach neuroendokrynnych',
      headers: ['Marker', 'Matryca', 'Czułość / Zastosowanie', 'Pułapki i przyczyny fałszywych wyników'],
      rows: [
        ['Chromogranina A (CgA)', 'Surowica / osocze', 'Marker uniwersalny masy NEN (60–80%)', 'IPP, eGFR < 60 ml/min, zapalenie żołądka typu A, marskość'],
        ['Kwas 5-HIAA', 'DZM (lub osocze)', 'Swoisty dla rakowiaka midgut i zespołu rakowiaka', 'Dieta bogata w tryptofan/serotoninę, paracetamol, niewydolność nerek'],
        ['Synaptofizyna', 'Tkanka (IHC)', 'Marker różnicowania neuroendokrynnego (blisko 100%)', 'Nie służy do oznaczeń w surowicy (badanie wyłącznie z biopsji)'],
        ['NSE (enolaza neuronowa)', 'Surowica', 'Guzy słabo zróżnicowane (NEC) i drobnokomórkowe', 'Hemoliza próbki krwi drastycznie zawyża wynik NSE'],
      ],
    },
    advanced:
      'Nowoczesną alternatywą dla pojedynczych markerów białkowych staje się test NETest — multigenowy profil ekspresji 51 transkryptów mRNA metodą qPCR z krwi obwodowej. Charakteryzuje się czułością i swoistością przekraczającą 90%, nie ulega zakłóceniom przez IPP i pozwala przewidzieć progresję choroby przed zmianami w badaniach obrazowych.',
    summary:
      'CgA stanowi uniwersalny marker obciążenia nowotworowego NEN, lecz wymaga wykluczenia terapii IPP i niewydolności nerek. 5-HIAA w DZM jest wysoce swoistym wskaźnikiem sekrecji serotoniny w rakowiakach, wymagającym restrykcji dietetycznej.',
    sourceIds: ['enets-consensus-2023', 'who-nen-2022'],
    questions: [
      q(
        'Który z wymienionych czynników najczęściej wywołuje fałszywie dodatnie podwyższenie chromograniny A?',
        ['Stosowanie inhibitorów pompy protonowej (IPP)', 'IPP blokują kwas żołądkowy, powodując hipergastrynemię i pobudzenie komórek ECL do uwalniania CgA.'],
        ['Wypicie kawy bezkofeinowej', 'Kofeina ani kawa nie mają wpływu na ekspresję CgA w komórkach ECL.'],
        ['Pobranie próbki krwi na czczo', 'Pobranie na czczo jest standardem i zapobiega wahaniom poposiłkowym.']
      ),
      q(
        'Jakie zalecenie dietetyczne jest bezwzględnie wymagane przed dobową zbiórką moczu na 5-HIAA?',
        ['Odstawienie bananów, awokado, orzechów włoskich i czekolady na 3–5 dni', 'Pokarmy te zawierają duże stężenia serotoniny i tryptofanu, fałszując wynik DZM.'],
        ['Całkowita dieta bezglutenowa przez 14 dni', 'Gluten nie interferuje z metabolizmem serotoniny i wydalaniem 5-HIAA.'],
        ['Dieta bogatobiałkowa z ograniczeniem płynów do 500 ml/dobę', 'Odwodnienie zagraża uszkodzeniem nerek i zaburza klirens moczowy.']
      ),
      q(
        'Jaki marker tkankowy w badaniu IHC stanowi najbardziej uniwersalny wyznacznik różnicowania neuroendokrynnego?',
        ['Synaptofizyna', 'Synaptofizyna występuje w pęcherzykach synaptycznych komórek neuroendokrynnych i cechuje się blisko 100% czułością.'],
        ['Cytokeratyna 20 (CK20)', 'CK20 jest markerem nabłonkowym typowym dla raka jelita grubego, a nie markerem neuroendokrynnym.'],
        ['Tyreoglobulina', 'Tyreoglobulina jest swoistym markerem komórek pęcherzykowych tarczycy.']
      ),
      q(
        'W jakiej sytuacji klinicznej marker surowiczy NSE (enolaza neuronowa) jest najbardziej przydatny?',
        ['W rakach neuroendokrynnych słabo zróżnicowanych (NEC G3) i drobnokomórkowych', 'NSE ulega nadekspresji w szybko proliferujących, słabo zróżnicowanych rakach neuroendokrynnych.'],
        ['W łagodnym gruczolaku insulinoma G1', 'W łagodnych guzach G1 NSE pozostaje prawidłowe, a markerem jest insulina i proinsulina.'],
        ['W diagnostyce wola guzowatego obojętnego', 'Wole guzkowe obojętne nie wykazuje zmian w stężeniu enolazy swoistej dla neuronów.']
      ),
      q(
        'Jaka nowoczesna technologia molekularna eliminuje ryzyko fałszywych wyników CgA pod wpływem leków IPP?',
        ['Test ekspresji 51 transkryptów mRNA (NETest) z krwi obwodowej', 'NETest mierzy profil ekspresji genów komórek neuroendokrynnych i nie zależy od stężenia gastryny ani IPP.'],
        ['Oznaczenie wolnego pozakomórkowego DNA płodowego', 'Test ten stosuje się w perinatologii, a nie w onkologii neuroendokrynnej.'],
        ['Badanie Western blot na obecność aktyny mięśniowej', 'Aktyna jest białkiem cytoszkieletowym mięśni i nie służy do monitorowania NEN.']
      ),
    ],
  },
  {
    id: 'nen-obrazowanie-sstr',
    title: 'Obrazowanie receptorowe i hybrydowe: 68Ga-DOTATATE PET/CT vs 18F-FDG PET',
    group: 'Fundamenty i diagnostyka',
    readTime: '13 min',
    goals: [
      'Poznać mechanizm ekspresji receptorów somatostatynowych (SSTR1–SSTR5), zwłaszcza SSTR2, na komórkach NEN.',
      'Zrozumieć przewagę radiofarmaceutyków znakowanych galem-68 (68Ga-DOTATATE / DOTATOC) nad klasyczną scyntygrafią OctreoScan.',
      'Zrozumieć zjawisko dual-tracer PET (SSTR-PET vs 18F-FDG PET) w ocenie heterogenności guza i dedyferencjacji.',
    ],
    sections: [
      {
        title: 'Ekspresja receptorów somatostatynowych (SSTR) jako cel teranostyczny',
        content:
          'Ponad 80% dobrze zróżnicowanych guzów neuroendokrynnych (NET G1 i G2) wykazuje bardzo gęstą nadekspresję receptorów somatostatynowych na błonie komórkowej, przede wszystkim podtypu SSTR2 oraz w mniejszym stopniu SSTR5. Fenomen ten stanowi fundament teranostyki nuklearnej — tę samą strukturę ligandu (analogu somatostatyny powiązanego z chelatorem DOTA) wykorzystuje się w diagnostyce pozytonowej po znakowaniu galem-68 (68Ga) oraz w celowanej radioterapii izotopowej (PRRT) po znakowaniu emiterem beta lutetem-177 (177Lu).',
      },
      {
        title: 'Złoty standard: 68Ga-DOTA-peptyd PET/CT i skala Krenninga',
        content:
          'Klasyczna scyntygrafia receptorowa z indor-111 (OctreoScan) została zastąpiona przez badanie 68Ga-DOTATATE/DOTATOC/DOTANOC PET/CT, które cechuje się wyższą rozdzielczością przestrzenną (3–4 mm vs 10–15 mm), czułością rzędu 95% i 10-krotnie niższą dawką pochłoniętą przez pacjenta. Wychwyt w guzie porównuje się do tła fizjologicznego: stopień 1 (mniejszy niż wątroba), stopień 2 (równy wątrobie), stopień 3 (większy niż wątroba), stopień 4 (większy niż śledziona/nerki). Kwalifikacja do PRRT wymaga wychwytu co najmniej w stopniu 3 lub 4 (wg skali Krenninga).',
      },
      {
        title: 'Koncepcja dual-tracer PET: ocena dedyferencjacji i agresywności',
        content:
          'W miarę postępu choroby nowotworowej komórki NEN ulegają dedyferencjacji — tracą ekspresję receptorów SSTR2, a zwiększają tempo glikolizy beztlenowej i gęstość transporterów GLUT1. W badaniach obrazowych prowadzi to do rozbieżności: ogniska łagodne wykazują SSTR(+)/FDG(-), natomiast klony agresywne, odróżnicowane prezentują fenotyp SSTR(-)/FDG(+). Wykonanie podwójnego badania (68Ga-DOTATATE PET + 18F-FDG PET) pozwala wykryć najbardziej złośliwe komponenty i właściwie zaplanować leczenie (np. chemioterapię zamiast PRRT).',
      },
    ],
    table: {
      caption: 'Porównanie modalności obrazowania molekularnego w NEN',
      headers: ['Modalność', 'Wychwyt zależy od', 'Zastosowanie kliniczne', 'Rozdzielczość / Czułość'],
      rows: [
        ['68Ga-DOTATATE PET/CT', 'Gęstość receptorów SSTR2', 'Staging i teranostyka NET G1/G2; kwalifikacja do PRRT', 'Bardzo wysoka (czułość ~95%, wykrywa ogniska >4 mm)'],
        ['18F-FDG PET/CT', 'Glikoliza, GLUT1, heksokinaza', 'Agresywne NET G3, NEC, ocena fenotypu odróżnicowania', 'Wysoka w nowotworach o Ki-67 > 15–20%'],
        ['Scyntygrafia OctreoScan (111In)', 'Receptory SSTR2/SSTR5', 'Metoda historyczna, gdy brak dostępu do PET z 68Ga', 'Niska (SPECT), wysoka ekspozycja na promieniowanie'],
        ['Wielofazowe TK / MRI z kontrastem', 'Unaczynienie (faza wczesnotętnicza)', 'Precyzyjna anatomia, resekcyjność, przerzuty do wątroby', 'Niezbędne do oceny kryteriów RECIST 1.1'],
      ],
    },
    advanced:
      'Fizjologiczny wychwyt 68Ga-DOTATATE występuje w śledzionie (najwyższy), nerkach (wydalanie), korze nadnerczy, przysadce oraz wyrostku haczykowatym trzustki (bogate skupisko komórek wydzielających PP — polipeptyd trzustkowy). Prawidłowy wyrostek haczykowaty nie może być mylony z ogniskiem pierwotnym guza pNET.',
    summary:
      'Obrazowanie 68Ga-DOTATATE PET/CT stanowi złoty standard wykrywania i kwalifikacji do PRRT guzów wykazujących receptory SSTR2. Zestawienie z 18F-FDG PET ujawnia heterogenność i dedyferencjację komórek o wysokim indeksie Ki-67.',
    sourceIds: ['enets-consensus-2023', 'eanm-prrt-2023'],
    questions: [
      q(
        'Jaki stopień wychwytu w skali Krenninga jest warunkiem koniecznym kwalifikacji do radioterapii izotopowej PRRT?',
        ['Wychwyt w ogniskach nowotworowych przewyższający tło fizjologiczne wątroby (stopień 3 lub 4)', 'PRRT wymaga gęstej ekspresji SSTR2 przewyższającej wątrobę, by dostarczyć niszczącą dawkę promieniowania do komórek nowotworowych.'],
        ['Wychwyt mniejszy niż fizjologiczne tło wątroby (stopień 1)', 'Wychwyt niższy od wątroby oznacza zbyt niską gęstość receptorów do skutecznego napromienienia.'],
        ['Wychwyt identyczny z tłem mięśni szkieletowych (stopień 0)', 'Brak wychwytu uniemożliwia zdeponowanie radiofarmaceutyku w guzie.']
      ),
      q(
        'Co oznacza sytuacja, gdy w badaniu dual-tracer przerzuty gromadzą 18F-FDG, lecz nie wykazują wychwytu 68Ga-DOTATATE?',
        ['Komórki uległy dedyferencjacji do agresywnego fenotypu o wysokiej glikolizie i utracie SSTR2', 'Jest to dowód na klonalną progresję w kierunku odróżnicowanego raka (NEC/NET G3), wykluczający celowaną terapię PRRT.'],
        ['Znakomite rokowanie i całkowitą biologiczną remisję nowotworu', 'Wychwyt FDG jest niekorzystnym czynnikiem rokowniczym wskazującym na agresywną proliferację.'],
        ['Wrodzony defekt syntezy kolagenu i tkanki łącznej', 'Glikoliza w PET odzwierciedla metabolizm energetyczny guza, a nie kolagenozę.']
      ),
      q(
        'Który podtyp receptora somatostatynowego dominuje w ponad 80% dobrze zróżnicowanych guzów NET?',
        ['Receptor SSTR2', 'Receptor SSTR2 cechuje się najwyższą gęstością ekspresji na błonie komórkowej komórek NET i jest głównym celem analogów oraz PRRT.'],
        ['Receptor SSTR1', 'Ekspresja podtypu SSTR1 w NET jest znikoma i nie stanowi celu dla syntetycznych analogów oktapeptydowych.'],
        ['Receptor SSTR4', 'Receptor SSTR4 nie wykazuje nadekspresji w nowotworach neuroendokrynnych przewodu pokarmowego.']
      ),
      q(
        'Który narząd wykazuje najwyższy fizjologiczny wychwyt znacznika 68Ga-DOTATATE?',
        ['Śledziona', 'Śledziona zawiera bardzo dużą gęstość receptorów somatostatynowych w limfocytach miazgi czerwonej i białej, stanowiąc narząd o najwyższym fizjologicznym gromadzeniu.'],
        ['Tkanka mózgowa', 'Bariera krew-mózg uniemożliwia swobodną penetrację hydrofilnego radiopeptydu do miąższu mózgowia.'],
        ['Kości długie', 'Wychwyt w zdrowym kośćcu jest minimalny i odpowiada niskiemu tłu tkankowemu.']
      ),
      q(
        'Jaka fizjologiczna struktura trzustki może gromadzić 68Ga-DOTATATE z powodu komórek PP, imitując guza pNET?',
        ['Wyrostek haczykowaty trzustki', 'Wyrostek haczykowaty zawiera anatomiczne skupisko komórek PP wykazujących receptory SSTR, co może dawać fałszywie dodatni obraz guza.'],
        ['Ogon trzustki w sąsiedztwie wnęki śledziony', 'Ogon trzustki nie wykazuje fizjologicznie podwyższonego gromadzenia w stosunku do trzonu.'],
        ['Przewód trzustkowy główny (Wirsunga)', 'Światło przewodu nie gromadzi radiofarmaceutyku receptorowego.']
      ),
    ],
  },
  {
    id: 'nen-klasyfikacja-who',
    title: 'Klasyfikacja histopatologiczna WHO 2022/2024: NET G1/G2/G3 vs NEC',
    group: 'Fundamenty i diagnostyka',
    readTime: '13 min',
    goals: [
      'Poznać aktualne kryteria podziału nowotworów neuroendokrynnych WHO 2022/2024 oparte na stopniu zróżnicowania i indeksie Ki-67.',
      'Zrozumieć krytyczną różnicę biologiczną i kliniczną między dobrze zróżnicowanym NET G3 a słabo zróżnicowanym rakiem neuroendokrynnym (NEC G3).',
      'Poznać markery molekularne rozróżniające NET G3 (mutacje DAXX/ATRX, MEN1) od NEC (mutacje TP53 i RB1).',
    ],
    sections: [
      {
        title: 'Podział na Guzy (NET) i Raki (NEC) — fundament klasyfikacji WHO',
        content:
          'Nowotwory neuroendokrynne układu pokarmowego i trzustki (GEP-NEN) dzielą się na dwie fundamentalnie odmienne kategorie biologiczne: dobrze zróżnicowane guzy neuroendokrynne (NET) oraz słabo zróżnicowane raki neuroendokrynne (NEC). W obrębie NET wyróżnia się stopnie złośliwości G1, G2 i G3 w oparciu o aktywność proliferacyjną mierzoną indeksem Ki-67 lub liczbą figur podziału mitotycznego na 2 mm² (10 pól widzenia dużej mocy, HPF).',
      },
      {
        title: 'Kryteria stopniowania (Grading G1, G2, G3)',
        content:
          'Kryteria WHO definiują: NET G1 (indeks Ki-67 < 3% oraz < 2 mitozy/2 mm²); NET G2 (Ki-67 od 3% do 20% lub 2–20 mitoz/2 mm²); NET G3 (Ki-67 > 20%, najczęściej w przedziale 21–55%, przy zachowanym dobrym zróżnicowaniu cytologicznym i architektonicznym). Z kolei NEC (neuroendocrine carcinoma) to nowotwór z definicji o wysokim stopniu złośliwości (G3, Ki-67 zwykle > 50–70%, często do 100%), charakteryzujący się atypią cytologiczną, martwicą i utratą zróżnicowania.',
      },
      {
        title: 'Podłoże molekularne: NET G3 vs NEC G3',
        content:
          'Rozróżnienie NET G3 od NEC G3 jest kluczowe, ponieważ decyduje o schemacie chemioterapii. NEC wykazuje mutacje genów supresorowych TP53 oraz inaktywację białka retinoblastomy (RB1), reagując na chemioterapię opartą na pochodnych platyny (cisplatyna/karboplatyna z etopozydem). Z kolei NET G3 zachowuje nienaruszone szlaki p53/Rb, a wykazuje mutacje MEN1, DAXX lub ATRX, wykazując oporność na schematy platynowe, a znakomitą odpowiedź na schemat CAPTEM (kapecytabina + temozolomid) lub PRRT.',
      },
    ],
    table: {
      caption: 'Klasyfikacja histopatologiczna GEP-NEN wg WHO 2022/2024',
      headers: ['Kategoria / Stopień', 'Indeks Ki-67 (%)', 'Indeks mitotyczny (/2 mm²)', 'Profil molekularny i terapia'],
      rows: [
        ['NET G1 (dobrze zróżnicowany)', '< 3%', '< 2', 'Ekspresja SSTR2(+); leczenie: analogi SSA, obserwacja'],
        ['NET G2 (dobrze zróżnicowany)', '3% – 20%', '2 – 20', 'Ekspresja SSTR2(+); leczenie: SSA, PRRT, celowane (sunitynib/ewerolimus)'],
        ['NET G3 (dobrze zróżnicowany)', '> 20% (zwykle 21–55%)', '> 20', 'DAXX/ATRX/MEN1; p53/Rb nienaruszone; leczenie: CAPTEM, PRRT'],
        ['NEC G3 (drobnokomórkowy / SCNEC)', '> 20% (często > 70%)', '> 20 (liczna martwica)', 'Inaktywacja TP53 i utrata Rb1; leczenie: cisplatyna + etopozyd'],
        ['NEC G3 (wielkokomórkowy / LCNEC)', '> 20% (często > 50%)', '> 20 (martwica)', 'Inaktywacja TP53/Rb1; leczenie: platyna + etopozyd / FOLFOX'],
      ],
    },
    advanced:
      'Do oceny indeksu Ki-67 patomorfolog musi zliczyć co najmniej 500–2000 komórek nowotworowych w rejonie o największej gęstości jąder wyznakowanych (tzw. hot-spot). W razie rozbieżności między indeksem Ki-67 a liczbą mitoz, o stopniu złośliwości decyduje wyższa uzyskana wartość.',
    summary:
      'Klasyfikacja WHO dzieli nowotwory neuroendokrynne na dobrze zróżnicowane NET (G1–G3) i słabo zróżnicowane NEC G3. Różnicowanie opiera się na indeksie Ki-67 oraz statusie białek p53 i Rb1, decydując o wyborze między chemioterapią platynową a celowaną.',
    sourceIds: ['who-nen-2022', 'enets-consensus-2023'],
    questions: [
      q(
        'Który zestaw cech pozwala jednoznacznie zidentyfikować dobrze zróżnicowany guz NET G3 i odróżnić go od raka NEC G3?',
        ['Zachowane zróżnicowanie histologiczne, nienaruszona ekspresja Rb1 i p53 oraz częste mutacje DAXX/ATRX', 'Cechy te definiują biologię NET G3, determinując skuteczność schematu CAPTEM zamiast cisplatyny z etopozydem.'],
        ['Wskaźnik Ki-67 wynoszący zawsze poniżej 1%', 'Ki-67 poniżej 1% definiuje powolny guz NET G1.'],
        ['Całkowita inaktywacja genu supresorowego RB1 i mutacja TP53', 'Mutacje TP53 i utrata Rb1 są cechą charakterystyczną agresywnych raków NEC G3.']
      ),
      q(
        'Gdy w bioptacie guza NEN indeks Ki-67 wynosi 12%, a liczba figur podziału wynosi 1 mitoza/2 mm², jaki stopień złośliwości należy przypisać guzowi?',
        ['NET G2', 'Zgodnie z wytycznymi WHO w przypadku rozbieżności stopień złośliwości przypisuje się na podstawie parametru wskazującego wyższy grading (Ki-67 12% kwalifikuje do G2).'],
        ['NET G1', 'Nie można przypisać stopnia niższego, gdyż Ki-67 przekracza próg 3%.'],
        ['NEC G3', 'Próg G3 to Ki-67 > 20% lub obecność cech braku zróżnicowania komórkowego.']
      ),
      q(
        'Jaki przedział indeksu Ki-67 definiuje dobrze zróżnicowany nowotwór NET G1 wg WHO 2022?',
        ['Poniżej 3% (oraz < 2 mitoz na 2 mm²)', 'NET G1 to nowotwór o bardzo niskiej aktywności proliferacyjnej z indeksem Ki-67 ściśle poniżej 3%.'],
        ['Od 3% do 20%', 'Zakres 3–20% definiuje stopień pośredni NET G2.'],
        ['Pomiędzy 20% a 50%', 'Wartości powyżej 20% kwalifikują guz do kategorii G3.']
      ),
      q(
        'Na jakiej standaryzowanej powierzchni pola widzenia patomorfolog zlicza figury podziału mitotycznego wg standardu WHO?',
        ['Na powierzchni 2 mm² (odpowiadającej historycznie 10 polom widzenia dużej mocy HPF)', 'Standaryzacja na 2 mm² eliminuje błędy wynikające z różnej średnicy okularów mikroskopów laboratoryjnych.'],
        ['W obrębie 1 pojedynczej komórki nowotworowej', 'Pojedyncza komórka nie pozwala na ocenę mitotyczną tkanki.'],
        ['Na całym skrawku biopsyjnym bez standaryzacji powierzchni', 'Brak standaryzacji uniemożliwiłby porównywalność stopniowania między ośrodkami.']
      ),
      q(
        'Dlaczego rozróżnienie NET G3 od NEC G3 ma kardynalne znaczenie dla doboru leczenia onkologicznego?',
        ['NEC G3 wymaga chemioterapii opartej na cisplatynie i etopozydzie, podczas gdy NET G3 odpowiada na CAPTEM lub PRRT', 'Zastosowanie chemioterapii platynowej w NET G3 wiąże się z bardzo niskim odsetkiem odpowiedzi (<10%), narażając chorego na toksyczność.'],
        ['NET G3 jest zmianą całkowicie łagodną i nie wymaga żadnego leczenia', 'NET G3 jest złośliwym nowotworem o dynamicznym przebiegu wymagającym aktywnej terapii onkologicznej.'],
        ['NEC G3 leczy się wyłącznie obserwacją kliniczną bez farmakoterapii', 'NEC G3 to nowotwór o skrajnej złośliwości wymagający natychmiastowej chemioterapii systemowej.']
      ),
    ],
  },
  {
    id: 'nen-gastrinoma-zoll-ellis',
    title: 'Gastrinoma i zespół Zollingera-Ellisona: trójkąt Passaro i test ze sekretyną',
    group: 'Guzy neuroendokrynne trzustki (pNET)',
    readTime: '13 min',
    goals: [
      'Zrozumieć patofizjologię zespołu Zollingera-Ellisona (ZES) wywołanego autonomiczną sekrecją gastryny.',
      'Poznać anatomię trójkąta Passaro (gastrinoma triangle) i lokalizację ognisk pierwotnych w dwunastnicy i trzustce.',
      'Opanować algorytm diagnostyczny: gastryna na czczo, pH soku żołądkowego oraz test stymulacji sekretyną.',
    ],
    sections: [
      {
        title: 'Patogeneza zespołu Zollingera-Ellisona (ZES)',
        content:
          'Gastrinoma to guz neuroendokrynny wywodzący się z komórek G, autonomicznie wydzielający gastrynę. Masywna hipergastrynemia stymuluje receptory CCK-B/gastrynowe na komórkach okładzinowych i komórkach ECL trzonu żołądka, prowadząc do niepohamowanego wydzielania kwasu solnego (BAO > 15 mmol/h). Skutkuje to ciężką, nawracającą chorobą wrzodową o nietypowej lokalizacji (opuszka i dalsza część dwunastnicy, jelito czcze), zapaleniem przełyku oraz uporczywą bieganką kwasową i tłuszczową (inaktywacja enzymów trzustkowych przez niskie pH).',
      },
      {
        title: 'Trójkąt Passaro (gastrinoma triangle)',
        content:
          'Ponad 70–90% wszystkich guzów wydzielających gastrynę leży w obrębie tzw. trójkąta Passaro. Wierzchołki trójkąta wyznaczają: (1) połączenie przewodu pęcherzykowego ze wspólnym przewodem wątrobowym, (2) połączenie II i III części dwunastnicy, (3) połączenie szyjki i trzonu trzustki. Co istotne, większość gastrinoma lokalizuje się w błonie śluzowej dwunastnicy (małe guzki < 1 cm, często mnogie) lub w okolicznych węzłach chłonnych, a nie w samym miąższu trzustki.',
      },
      {
        title: 'Diagnostyka laboratoryjna: gastryna i test ze sekretyną',
        content:
          'Rozpoznanie wymaga udokumentowania hipergastrynemii na czczo (często > 1000 pg/ml) przy jednoczesnym potwierdzeniu kwaśnego pH soku żołądkowego (pH < 2,0). Wartość gastryny w przedziale 200–1000 pg/ml wymaga testu dynamicznego ze sekretyną: podanie dożylne sekretyny (2 j./kg mc.) u chorych z gastrinoma wywołuje paradoksalny, gwałtowny wzrost gastryny o ponad 120 pg/ml (lub o 50% w stosunku do wartości wyjściowej) w ciągu 2–10 minut (u osób zdrowych sekretyna hamuje uwalnianie gastryny z komórek żołądkowych).',
      },
    ],
    table: {
      caption: 'Diagnostyka różnicowa hipergastrynemii',
      headers: ['Jednostka chorobowa', 'Gastryna na czczo', 'pH treści żołądkowej', 'Odpowiedź na test ze sekretyną'],
      rows: [
        ['Gastrinoma (zespół Zollingera-Ellisona)', 'Wysoka (>200–1000+ pg/ml)', 'Silnie kwaśne (< 2,0)', 'Paradoksalny wzrost gastryny (>120 pg/ml)'],
        ['Terapia IPP / H2-blokery', 'Umiarkowanie podwyższona', 'Zasadowe / obojętne (> 4,0)', 'Brak paradoksalnego wzrostu'],
        ['Zanikowe zapalenie błony śluzowej (typ A)', 'Skrajnie wysoka (brak sprzężenia ujemnego)', 'Achlorhydria (pH > 6,0–7,0)', 'Brak wzrostu (lub spadek)'],
        ['Infekcja Helicobacter pylori', 'Prawidłowa lub lekko podwyższona', 'Kwaśne (< 3,0)', 'Brak wzrostu stężenia'],
      ],
    },
    advanced:
      'Około 20–25% przypadków gastrinoma występuje w przebiegu zespołu MEN1 (mutacja genu MEN1). W MEN1 guzy gastrynowe są niemal zawsze mnogie, zlokalizowane głównie w ścianie dwunastnicy, a wyleczenie chirurgiczne jest znacznie trudniejsze niż w postaciach sporadycznych. U każdego chorego z ZES należy bezwzględnie oznaczyć wapń całkowity, parathormon i prolaktynę.',
    summary:
      'Gastrinoma wywołuje ZES charakteryzujący się oporną chorobą wrzodową i biegunką. Złotym standardem potwierdzenia przy niejednoznacznej hipergastrynemii i pH < 2 jest paradoksalny wzrost gastryny w teście stymulacji sekretyną. Guzy lokalizują się w trójkącie Passaro.',
    sourceIds: ['enets-consensus-2023', 'nanets-pnet-2023'],
    questions: [
      q(
        'Jaki jest prawidłowy wynik testu ze sekretyną potwierdzający rozpoznanie gastrinoma?',
        ['Paradoksalny wzrost stężenia gastryny o ponad 120 pg/ml w ciągu 10 minut', 'Fizjologicznie sekretyna hamuje uwalnianie gastryny, natomiast w komórkach nowotworowych gastrinoma wyzwala masywny wyrzut hormonu.'],
        ['Spadek stężenia gastryny do wartości niewykrywalnych', 'Spadek jest odpowiedzią prawidłową dla fizjologicznych komórek żołądkowych.'],
        ['Wzrost stężenia glukozy o ponad 50 mg/dl', 'Sekretyna nie służy do badania homeostazy glukozowej.']
      ),
      q(
        'Który parametr jest absolutnie niezbędny do wiarygodnej interpretacji podwyższonego stężenia gastryny na czczo?',
        ['Jednoczesny pomiar pH soku żołądkowego (pH < 2,0)', 'Hipergastrynemia przy pH > 4 wynika z braku hamowania ujemnego (np. achlorhydria, IPP) i wyklucza ZES.'],
        ['Dobowa zbiórka moczu na wydalanie wapnia', 'Wapń w moczu ocenia gospodarkę Ca-P, a nie kwasowość żołądka.'],
        ['Oznaczenie stężenia tyreotropiny (TSH)', 'TSH nie odgrywa roli w diagnostyce osi żołądkowo-gastrynowej.']
      ),
      q(
        'Gdzie zlokalizowany jest anatomiczny trójkąt Passaro, w którym rozwija się większość guzów gastrinoma?',
        ['Między przewodem pęcherzykowym/wątrobowym, II/III częścią dwunastnicy a szyjką/trzonem trzustki', 'Ponad 70–90% pierwotnych gastrinoma lokalizuje się w tym trójkącie, przeważnie w ścianie dwunastnicy.'],
        ['W dnie żołądka w sąsiedztwie wpustu', 'Dno żołądka nie wchodzi w skład trójkąta Passaro.'],
        ['W zagięciu śledzionowym okrężnicy', 'Okrężnica nie jest miejscem występowania guzów gastrinoma.']
      ),
      q(
        'Jaki jest główny patomechanizm opornych biegunek u pacjentów z zespołem Zollingera-Ellisona?',
        ['Masywne zakwaszenie treści dwunastnicy inaktywuje enzymy trzustkowe i uszkadza błonę śluzową', 'Lipaza trzustkowa traci aktywność przy pH < 5, co wywołuje ciężką biegankę tłuszczową i kwasową.'],
        ['Zakażenie pierwotniakiem Giardia lamblia', 'Biegunka w ZES ma charakter hormonalno-chemiczny, a nie pasożytniczy.'],
        ['Nadmierne wydzielanie żółci z pęcherzyka żółciowego', 'Sekrecja żółci nie jest bezpośrednią przyczyną kwasowej biegunki w gastrinoma.']
      ),
      q(
        'Z jakim zespołem genetycznym uwarunkowanym dziedzicznie najczęściej współistnieją mnogie guzy gastrinoma?',
        ['Z zespołem MEN1 (mutacja genu meniny)', 'Aż 20–25% guzów gastrinoma występuje u chorych z MEN1, charakteryzując się mnogimi mikroogniskami w dwunastnicy.'],
        ['Z zespołem MEN2B (mutacja RET M918T)', 'W MEN2B nie występują guzy neuroendokrynne przewodu pokarmowego ani gastrinoma.'],
        ['Z chorobą von Recklinghausena (NF1)', 'W NF1 typowe są somatostatinoma dwunastnicy, a nie klasyczne gastrinoma w trójkącie Passaro.']
      ),
    ],
  },
  {
    id: 'nen-insulinoma',
    title: 'Insulinoma: triada Whipple\'a i 72-godzinna próba głodowa',
    group: 'Guzy neuroendokrynne trzustki (pNET)',
    readTime: '13 min',
    goals: [
      'Zrozumieć patofizjologię autonomicznego wydzielania insuliny w guzie insulinoma.',
      'Zdefiniować składowe triady Whipple\'a i zasady bezpiecznego prowadzenia 72-godzinnej próby głodowej.',
      'Poznać kryteria laboratoryjne rozpoznania insulinoma (insulina, peptyd C, proinsulina, beta-hydroksymaślan, brak leków w moczu).',
    ],
    sections: [
      {
        title: 'Epidemiologia i obraz kliniczny insulinoma',
        content:
          'Insulinoma jest najczęstszym hormonalnie czynnym nowotworem neuroendokrynnym trzustki (stanowi ok. 40% wszystkich pNET). Ponad 90% guzów to pojedyncze, łagodne zmiany o średnicy poniżej 2 cm, doskonale poddające się leczeniu chirurgicznemu (enukleacja). Objawy wynikają z neuroglikopenii (zaburzenia koncentracji, splątanie, senność, zmiany osobowości, drgawki, utrata przytomności) oraz wyrzutu amin katecholowych (drżenie rąk, poty, kołatanie serca, głód). Występują zazwyczaj na czczo lub po wysiłku fizycznym.',
      },
      {
        title: 'Triada Whipple\'a i 72-godzinna próba głodowa',
        content:
          'Klasyczną podstawą podejrzenia hipoglikemii organicznej jest triada Whipple\'a: (1) objawy kliniczne hipoglikemii, (2) udokumentowane niskie stężenie glukozy w osoczu krwi żylnej (< 55 mg/dl / 3,0 mmol/l), (3) natychmiastowe ustąpienie dolegliwości po spożyciu węglowodanów. Złotym standardem potwierdzenia jest szpitalna 72-godzinna próba głodowa prowadzona w warunkach ścisłego monitorowania glikemii.',
      },
      {
        title: 'Kryteria laboratoryjne rozpoznania hipoglikemii hiperinsulinemicznej',
        content:
          'Próbę głodową przerywa się, gdy glikemia spadnie poniżej 55 mg/dl przy wystąpieniu objawów neuroglikopenii. W krytycznej próbce krwi pobiera się krew na oznaczenie: glukozy, insuliny, peptydu C, proinsuliny, beta-hydroksymaślanu oraz przesiewowego badania na obecność doustnych leków przeciwcukrzycowych (pochodnych sulfonylomocznika) w osoczu lub moczu. Kryteria potwierdzenia insulinoma obejmują: insulinę ≥ 3 µU/ml (≥18 pmol/l), peptyd C ≥ 0,6 ng/ml (≥0,2 nmol/l), proinsulinę ≥ 5 pmol/l oraz niski beta-hydroksymaślan (≤ 2,7 mmol/l — dowód hamowania lipolizy przez insulinę).',
      },
    ],
    table: {
      caption: 'Różnicowanie przyczyn hipoglikemii w krytycznej próbce krwi (glukoza < 55 mg/dl)',
      headers: ['Przyczyna hipoglikemii', 'Insulina surowicy', 'Peptyd C', 'Beta-hydroksymaślan', 'Leki w surowicy/moczu'],
      rows: [
        ['Insulinoma', 'Wysoka (≥ 3 µU/ml)', 'Wysoki (≥ 0,6 ng/ml)', 'Niski (≤ 2,7 mmol/l)', 'Negatywne'],
        ['Jatrogenna (egzogenna insulina)', 'Bardzo wysoka (często >100)', 'Niski / niewykrywalny (<0,2)', 'Niski', 'Negatywne'],
        ['Przedawkowanie sulfonylomocznika', 'Wysoka', 'Wysoki', 'Niski', 'Obecne pochodne sulfonylomocznika'],
        ['Hipoglikemia reaktywna / z głodu', 'Prawidłowo zahamowana (<3)', 'Prawidłowo zahamowany', 'Wysoki (> 2,7 mmol/l)', 'Negatywne'],
      ],
    },
    advanced:
      'W lokalizacji przedoperacyjnej małych guzów insulinoma niezwykle przydatne jest badanie EUS (endoskopowa ultrasonografia) o czułości >90% oraz selektywny dotętniczy test stymulacji wapniem z cewnikowaniem żył wątrobowych (ASVS — arterial calcium stimulation with venous sampling), gdzie wstrzyknięcie glukonianu wapnia do tętnicy zaopatrującej guz wywołuje gwałtowny skok insuliny w żyle wątrobowej.',
    summary:
      'Insulinoma to najczęstszy pNET, manifestujący się triadą Whipple\'a. Diagnostyka opiera się na 72-godzinnej próbie głodowej, wykazującej brak fizjologicznej supresji insuliny i peptydu C przy hipoglikemii oraz wykluczeniu pochodnych sulfonylomocznika.',
    sourceIds: ['enets-consensus-2023', 'who-nen-2022'],
    questions: [
      q(
        'Który wynik oznaczeń w krytycznej próbce krwi (przy glikemii 42 mg/dl) potwierdza podejrzenie insulinoma i wyklucza hipoglikemię wywołaną podaniem egzogennej insuliny?',
        ['Stężenie peptydu C ≥ 0,6 ng/ml oraz ujemny test na obecność leków przeciwcukrzycowych', 'Peptyd C jest uwalniany ekwimolarnie z endogenną insuliną w procesie rozszczepienia proinsuliny, natomiast preparaty insuliny egzogennej są go pozbawione.'],
        ['Niewykrywalny peptyd C (< 0,1 ng/ml) przy bardzo wysokiej insulinie', 'Obraz ten wskazuje na samobójcze lub pomyłkowe wstrzyknięcie egzogennej insuliny.'],
        ['Wysokie stężenie beta-hydroksymaślanu (> 4,5 mmol/l)', 'Wysoki poziom ciał ketonowych świadczy o braku działania insuliny i fizjologicznej ketogenezie głodowej.']
      ),
      q(
        'Jaki lek wybiórczo blokujący wydzielanie insuliny przez kanały K_ATP stosuje się w farmakoterapii objawowej nieoperacyjnego guza insulinoma?',
        ['Diazoksyd', 'Diazoksyd otwiera kanały potasowe K_ATP w komórkach beta, powodując hiperpolaryzację błony komórkowej i hamowanie egzocytozy insuliny.'],
        ['Gliklazyd', 'Gliklazyd to pochodna sulfonylomocznika, która zamyka K_ATP i stymuluje wydzielanie insuliny, nasilając hipoglikemię.'],
        ['Metformina', 'Metformina nie hamuje uwalniania insuliny w komórkach beta trzustki.']
      ),
      q(
        'Jakie trzy składowe tworzą klasyczną triadę Whipple\'a?',
        ['Objawy hipoglikemii, glikemia < 55 mg/dl w osoczu żylnym i ustąpienie objawów po podaniu glukozy', 'Triada ta stanowi historyczny i współczesny kliniczny punkt wyjścia do poszukiwania hipoglikemii hiperinsulinemicznej.'],
        ['Nadciśnienie tętnicze, tachykardia i drżenie rąk', 'Cechy te są typowe dla napadu guza chromochłonnego.'],
        ['Ból w prawym podżebrzu, żółtaczka mechaniczna i gorączka z dreszczami', 'Zestawienie to tworzy triadę Charcota w zapaleniu dróg żółciowych.']
      ),
      q(
        'Jaki odsetek guzów insulinoma stanowią pojedyncze, łagodne gruczolaki podatne na wyleczenie chirurgiczne?',
        ['Ponad 90%', 'Insulinoma jest wyjątkiem wśród pNET — zdecydowana większość to zmiany łagodne i pojedyncze.'],
        ['Około 10%', 'Jedynie 5–10% guzów insulinoma wykazuje cechy złośliwości z przerzutami do wątroby lub węzłów.'],
        ['Dokładnie 50%', 'Połowa pNET wykazuje złośliwość w przypadku gastrinoma i glukagonoma, ale nie w insulinoma.']
      ),
      q(
        'Dlaczego w krytycznej próbce krwi w przebiegu próby głodowej oznacza się stężenie beta-hydroksymaślanu?',
        ['Niski poziom beta-hydroksymaślanu (≤ 2,7 mmol/l) dowodzi aktywnego działania insuliny hamującej lipolizę i ketogenezę', 'Insulina jest silnym inhibitorem lipazy lipoproteinowej i ketogenezy; jej nadmiar blokuje powstawanie ciał ketonowych mimo głodu.'],
        ['Wysoki poziom ciał ketonowych jest bezpośrednią przyczyną drgawek hipoglikemicznych', 'Drgawki wynikają z neuroglikopenii, a ciała ketonowe stanowią dla mózgu alternatywne paliwo ochronne.'],
        ['Beta-hydroksymaślan jest prekursorem peptydu C w komórkach wyspowych', 'Beta-hydroksymaślan jest ciałem ketonowym powstającym w wątrobie z kwasów tłuszczowych.']
      ),
    ],
  },
];
