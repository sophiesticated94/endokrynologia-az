import { q, type DraftLesson } from './course-types.ts';

export const draftPediatricsPart2: DraftLesson[] = [
  {
    id: 'ped-zespol-turnera',
    title: 'Zespół Turnera w praktyce pediatrycznej',
    subtitle: 'Aberracje chromosomu X, terapia rhGH, wady aorty i indukcja pokwitania',
    group: 'Genetyka i dysgenezje',
    minutes: 18,
    goals: [
      'Rozpoznasz fenotyp i wskazania do kariotypu w zespole Turnera (45,X oraz mozaicyzm).',
      'Zaplanujesz leczenie rhGH w celu poprawy wzrostu ostatecznego oraz protokół indukcji pokwitania estrogenami.',
    ],
    sections: [
      {
        title: 'Genetyka, fenotyp i kardiologiczny nadzór aorty',
        text: 'Zespół Turnera (ZT) występuje u około 1:2500 żywo urodzonych dziewczynek i wynika z całkowitej lub częściowej monosomii chromosomu X (monosomia 45,X w ~50%, linie mozaikowe 45,X/46,XX, izochromosom Xq, delecje). Cechy dysmorficzne obejmują: płetwiastą szyję, niską linię owłosienia karku, koślawość łokci (cubitus valgus), szeroką klatkę piersiową i naczyniaki limfatyczne (obrzęki stóp u noworodka). Kluczowe dla przeżycia jest wczesne badanie echokardiograficzne i angio-MRI serca w celu wykluczenia koarktacji aorty (CoA), dwupłatkowej zastawki aortalnej (BAV) oraz poszerzenia aorty wstępującej grożącego rozwarstwieniem.',
      },
      {
        title: 'Terapia rekombinowanym GH (rhGH) i haploinsuficjencja SHOX',
        text: 'Niskorosłość w ZT wynika z braku jednej kopii genu SHOX (Short Stature Homeobox gene) zlokalizowanego w rejonie pseudoautosomalnym PAR1 na ramieniu krótkim chromosomu X. Dziewczęta z ZT nie mają pierwotnego niedoboru GH w testach przysadkowych, lecz względną oporność na chrząstce wzrostowej. Dlatego leczenie rhGH rozpoczyna się w dawkach wyższych niż w klasycznym GHD (około 0,045–0,050 mg/kg/dobę s.c.), idealnie od 4.–6. roku życia, co pozwala uzyskać przyrost wzrostu ostatecznego średnio o 5–8 cm.',
      },
      {
        title: 'Dysgenezja gonad i indukcja dojrzewania płciowego',
        text: 'Przyspieszona apoptoza oocytów prowadzi do pasmowatej dysgenezji jajników (streak gonads) i pierwotnego braku pokwitania u ponad 90% dziewcząt. Indukcję pokwitania rozpoczyna się około 11.–12. roku życia od bardzo małych dawek 17-beta-estradiolu (np. przezskórnie 6,25–12,5 µg/dobę), stopniowo zwiększając dawkę przez 2–3 lata w celu naśladowania fizjologii i zapewnienia prawidłowego rozwoju macicy i gruczołów piersiowych. Progestageny (np. mikronizowany progesteron lub dydrogesteron) dołącza się dopiero po 2 latach estrogenoterapii lub przy pojawieniu się pierwszego krwawienia z macicy, aby nie zaburzyć architektury zrębu sutka.',
      },
    ],
    table: {
      headers: ['Etap życia dziewczynki z ZT', 'Główny cel medyczny', 'Kluczowe interwencje i badania'],
      rows: [
        ['Okres noworodkowy / niemowlęcy', 'Wczesne rozpoznanie i bezpieczeństwo sercowe', 'Kariotyp, Echo serca (koarktacja aorty, BAV), USG nerek (nerka podkowiasta)'],
        ['Wiek dziecięcy (4–11 lat)', 'Optymalizacja tempa wzrastania', 'Leczenie rhGH (0,045–0,050 mg/kg/d), screening celiakii i tarczycy (anty-TPO)'],
        ['Wiek 11–12 lat', 'Fizjologiczna indukcja pokwitania', 'Wdrożenie estradiolu transdermalnego w małej dawce, powolne miareczkowanie'],
        ['Wiek 13–14 lat (po 2 latach E2)', 'Cyklizacja i ochrona endometrium', 'Dołączenie cyklicznego progestagenu (10–14 dni w miesiącu)'],
      ],
    },
    advanced:
      'Jeśli w kariotypie dziewczynki z zespołem Turnera stwierdzi się obecność materiału chromosomu Y (nawet szczątkowego lub w liniach mozaikowych 45,X/46,XY), ryzyko rozwoju nowotworu zarodkowego (gonadoblastoma, rozrodczak) w pasmowatych gonadach sięga 15–30%. W takich przypadkach bezwzględnym zaleceniem jest obustronna laparoskopowa gonadektomia profilaktyczna zaraz po ustaleniu rozpoznania.',
    summary:
      'ZT (45,X) charakteryzuje niska sylwetka (gen SHOX) i dysgenezja gonad. Leczenie rhGH zaczyna się wcześnie, indukcję estrogenową w 11.–12. r.ż., a materiał Y w kariotypie wymaga gonadektomii.',
    sourceIds: ['turner_clinical', 'espe_growth'],
    questions: [
      q(
        'Który gen zlokalizowany w rejonie PAR1 chromosomu X odpowiada za niskorosłość w zespole Turnera?',
        ['Gen SHOX (Short Stature Homeobox)', 'Haploinsuficjencja genu SHOX zaburza proliferację chondrocytów w płytkach wzrostowych.'],
        ['Gen SRY', 'Gen SRY determinuje rozwój jądra i znajduje się na chromosomie Y.'],
        ['Gen CFTR', 'CFTR koduje kanał chlorkowy i odpowiada za mukowiscydozę.'],
        'ped-turner-q1'
      ),
      q(
        'Jakie badanie obrazowe jest krytyczne dla życia u każdej dziewczynki z nowo rozpoznanym zespołem Turnera?',
        ['Echokardiografia i angio-MRI serca w kierunku wad aorty (koarktacja, BAV, tętniak)', 'Rozwarstwienie aorty wstępującej jest główną przyczyną nagłej śmierci w ZT.'],
        ['Tomografia komputerowa miednicy', 'Nie jest badaniem pierwszego rzutu; wystarcza USG przezpowłokowe.'],
        ['Scyntygrafia nerek z DMSA', 'Podstawowym badaniem przesiewowym nerek jest USG (nerka podkowiasta).'],
        'ped-turner-q2'
      ),
      q(
        'W jaki sposób różni się dawka rhGH stosowana w zespole Turnera od klasycznej hiposomatotropii przysadkowej?',
        ['W ZT stosuje się dawki wyższe (0,045–0,050 mg/kg/d) z powodu oporności obwodowej', 'W klasycznym GHD wystarczają dawki substytucyjne rzędu 0,025–0,035 mg/kg/d.'],
        ['W ZT stosuje się dawki dziesięciokrotnie niższe', 'Zbyt niska dawka nie przyniosłaby żadnego efektu auksologicznego.'],
        ['W ZT rhGH jest bezwzględnie przeciwwskazany', 'ZT jest jednym z głównych zarejestrowanych wskazań do terapii rhGH.'],
        'ped-turner-q3'
      ),
      q(
        'Kiedy do protokołu indukcji pokwitania u dziewczynki z ZT dołącza się progestagen?',
        ['Po około 2 latach monoterapii estrogenowej lub przy wystąpieniu pierwszego krwawienia', 'Zbyt wczesne podanie progestagenu zaburza architektonikę i wzrost gruczołów piersiowych.'],
        ['Od pierwszego dnia terapii razem z wysoką dawką estrogenów', 'Niefizjologiczny start prowadzi do nieprawidłowego ukształtowania sutków.'],
        ['Dopiero po ukończeniu 25. roku życia', 'Opóźnienie progestagenu grozi rozrostem i atypią endometrium.'],
        'ped-turner-q4'
      ),
      q(
        'Jakie postępowanie jest bezwzględnie konieczne przy wykryciu sekwencji chromosomu Y w kariotypie dziewczynki z ZT?',
        ['Profilaktyczna obustronna gonadektomia ze względu na wysokie ryzyko gonadoblastoma', 'Pasmowate gonady z materiałem Y ulegają transformacji złośliwej w 15–30% przypadków.'],
        ['Natychmiastowe podanie dużych dawek testosteronu', 'Pogłębiłoby niepożądaną wirylizację i nie chroni przed nowotworem.'],
        ['Odstąpienie od leczenia hormonem wzrostu', 'Obecność Y nie wyklucza leczenia rhGH, ale wymaga wcześniejszej gonadektomii.'],
        'ped-turner-q5'
      ),
    ],
  },
  {
    id: 'ped-krzywica-zaburzenia-fosforanowe',
    title: 'Krzywica i zaburzenia gospodarki fosforanowej',
    subtitle: 'Krzywica niedoborowa witaminy D a hipofosfatemia sprzężona z X (XLH) i rola FGF23',
    group: 'Gospodarka mineralna',
    minutes: 17,
    goals: [
      'Odróżnisz krzywicę niedoborową (wysokie PTH, niskie Ca/P, niski 25-OH-D) od hipofosfatemicznej (normokalcemia, prawidłowe PTH, wysoki FGF23).',
      'Wyjaśnisz mechanizm działania przeciwciała monoklonalnego anty-FGF23 (burosumab) w leczeniu XLH.',
    ],
    sections: [
      {
        title: 'Krzywica niedoborowa (z niedoboru witaminy D i wapnia)',
        text: 'Krzywica jest chorobą rosnącego kośćca, wynikającą z upośledzenia mineralizacji macierzy chrzęstnej w płytkach wzrostowych. W postaci niedoborowej deficyt 25-OH-D prowadzi do spadku wchłaniania wapnia w jelitach, co wyzwala wtórną nadczynność przytarczyc (masywny wzrost PTH). PTH nasila nerkowe wydalanie fosforanów, prowadząc do hipofosfatemii i upośledzenia tworzenia hydroksyapatytu. Objawy kliniczne obejmują: bransolety krzywicze (poszerzenie przynasad kości promieniowych), różaniec krzywiczy na żebrach, opóźnione zarastanie ciemiączka, zniekształcenia kości kończyn dolnych (szpotawość / koślawość) oraz wysokie stężenie fosfatazy alkalicznej (ALP).',
      },
      {
        title: 'Krzywica hipofosfatemiczna sprzężona z X (XLH) i oś FGF23',
        text: 'Krzywica hipofosfatemiczna sprzężona z chromosomem X (XLH) jest najczęstszą postacią wrodzonej krzywicy opornej na witaminę D (częstość 1:20 000). Wynika z mutacji genu PHEX na chromosomie X, co prowadzi do utraty hamowania i patologicznego nadmiaru czynnika wzrostu fibroblastów 23 (FGF23). FGF23 działa na receptor FGFR1/Klotho w kanalikach proksymalnych nerek: hamuje kotransportery sodowo-fosforanowe (NaPi-IIa i NaPi-IIc), wywołując masywny nerkowy wyciek fosforanów (obniżenie TmP/GFR), oraz blokuje enzym 1-alfa-hydroksylazę (CYP27B1), uniemożliwiając syntezę aktywnego 1,25(OH)2D3.',
      },
      {
        title: 'Przełom terapeutyczny: burosumab vs leczenie konwencjonalne',
        text: 'Leczenie tradycyjne XLH (suplementacja doustnych soli fosforanowych w 4–6 dawkach na dobę w skojarzeniu z aktywnymi analogami witaminy D – alfakalcydolem lub kalcytriolem) jest uciążliwe i obarczone powikłaniami (nefrokalcynoza, wtórna/trzeciorzędowa nadczynność przytarczyc). Przełomem stał się burosumab – rekombinowane w pełni ludzkie przeciwciało monoklonalne IgG1 przeciwko FGF23. Wiążąc krążący FGF23, burosumab normalizuje wchłanianie zwrotne fosforanów w nerkach, przywraca fizjologiczną syntezę kalcytriolu i prowadzi do wygojenia zmian krzywiczych oraz poprawy tempa wzrostu.',
      },
    ],
    table: {
      headers: ['Parametr laboratoryjny', 'Krzywica niedoborowa (witamina D)', 'Krzywica hipofosfatemiczna (XLH)'],
      rows: [
        ['Wapń całkowity / zjonizowany', 'Obniżony lub dolna norma', 'Prawidłowy (normokalcemia)'],
        ['Fosforany w surowicy', 'Obniżone (efekt fosfaturii wywołanej przez PTH)', 'Skrajnie obniżone (efekt bezpośredni FGF23)'],
        ['Parathormon (PTH)', 'Znacznie podwyższony (wtórna nadczynność)', 'Prawidłowy lub miernie podwyższony'],
        ['25-OH-D w surowicy', 'Skrajnie niskie (<10–20 ng/ml)', 'Prawidłowe'],
        ['FGF23 w osoczu', 'Prawidłowe lub niskie', 'Patologicznie podwyższone lub nieadekwatnie prawidłowe'],
        ['Leczenie z wyboru', 'Cholekalcyferol (wit. D3) + wapń', 'Burosumab (anty-FGF23) s.c. co 2 tygodnie'],
      ],
    },
    advanced:
      'W ocenie nerkowej utraty fosforanów kluczowym wskaźnikiem jest cewkowy próg nerkowej reabsorpcji fosforanów w stosunku do przesączania kłębuszkowego (TmP/GFR). Oblicza się go z jednoczesnego oznaczenia fosforanów i kreatyniny w surowicy oraz w porannej porcji moczu. Obniżenie TmP/GFR poniżej dolnej granicy normy dla wieku przy obecności hipofosfatemii dowodzi nerkowej utraty fosforanów mediowanej przez FGF23.',
    summary:
      'Krzywica niedoborowa cechuje się wysokim PTH i niskim 25-OH-D. W XLH (mutacja PHEX) wysoki FGF23 wywołuje hipofosfatemię przy prawidłowym wapniu. Burosumab blokuje FGF23.',
    sourceIds: ['xlh_guidelines'],
    questions: [
      q(
        'Jaki jest mechanizm hipofosfatemii w krzywicy hipofosfatemicznej sprzężonej z X (XLH)?',
        ['Nadmiar FGF23 hamuje nerkowe kotransportery NaPi-IIa/c, powodując nerkowy wyciek fosforanów', 'Dodatkowo FGF23 hamuje nerkową 1-alfa-hydroksylazę, obniżając stężenie kalcytriolu.'],
        ['Brak parathormonu uniemożliwia wchłanianie fosforanów w jelicie', 'W XLH stężenie PTH jest prawidłowe lub nieznacznie podwyższone.'],
        ['Całkowita utrata zdolności wątroby do 25-hydroksylacji', 'Stężenie 25-OH-D w XLH pozostaje całkowicie w normie.'],
        'ped-krzywica-q1'
      ),
      q(
        'Który parametr laboratoryjny jest prawidłowy w XLH, a wyraźnie obniżony w klasycznej krzywicy niedoborowej?',
        ['Wapń w surowicy oraz 25-hydroksywitamina D (25-OH-D)', 'W XLH nie ma pierwotnego niedoboru witaminy D ani hipokalcemii.'],
        ['Fosfataza alkaliczna (ALP)', 'ALP jest podwyższona w obu typach krzywicy jako marker obrotu kostnego.'],
        ['Fosforany w surowicy', 'Hipofosfatemia występuje w obu jednostkach, lecz w XLH jest znacznie głębsza.'],
        'ped-krzywica-q2'
      ),
      q(
        'Jak działa burosumab stosowany w terapii dzieci z XLH?',
        ['Jest przeciwciałem monoklonalnym wiążącym i neutralizującym nadmiar krążącego FGF23', 'Przywraca prawidłową reabsorpcję fosforanów w cewkach nerkowych i syntezę 1,25(OH)2D3.'],
        ['Jest syntetycznym analogiem parathormonu', 'Burosumab nie wykazuje powinowactwa do receptora PTHR1.'],
        ['Blokuje receptory wapniowe CaSR w przytarczycach', 'Leki kalcymimetyczne nie są burosumabem.'],
        'ped-krzywica-q3'
      ),
      q(
        'Jakie jest najczęstsze powikłanie narządowe wieloletniego konwencjonalnego leczenia XLH solami fosforanowymi i kalcytriolem?',
        ['Wapnica nerek (nefrokalcynoza) oraz trzeciorzędowa nadczynność przytarczyc', 'Ciągłe podawanie fosforanów stymuluje przytarczyce, a hiperkalciuria sprzyja zwapnieniom cewek.'],
        ['Marskość wątroby', 'Soli fosforanowych i kalcytriolu nie cechuje hepatotoksyczność marska.'],
        ['Agranulocytoza', 'Nie występuje toksyczność szpikowa.'],
        'ped-krzywica-q4'
      ),
      q(
        'Który wskaźnik laboratoryjny obliczany z krwi i moczu potwierdza nerkowy wyciek fosforanów?',
        ['TmP/GFR (cewkowy próg nerkowej reabsorpcji fosforanów)', 'Obniżony TmP/GFR dowodzi nerkowej utraty fosforanów zależnej od FGF23.'],
        ['Wskaźnik HOMA-IR', 'Służy do oceny insulinooporności, nie gospodarki fosforanowej.'],
        ['Klirens samej inuliny', 'Mierzy wyłącznie GFR, nie reabsorpcję fosforanów.'],
        'ped-krzywica-q5'
      ),
    ],
  },
  {
    id: 'ped-cukrzyca-dzieci-technologie',
    title: 'Cukrzyca u dzieci i technologie medyczne',
    subtitle: 'Kwasica ketonowa DKA wg ISPAD 2024, ryzyko obrzęku mózgu i systemy pętli zamkniętej (AID)',
    group: 'Tarczyca i metabolizm',
    minutes: 18,
    goals: [
      'Wdrożysz protokół płynoterapii i insulinoterapii w DKA u dziecka wg wytycznych ISPAD 2024, minimalizując ryzyko obrzęku mózgu.',
      'Zinterpretujesz zasady działania zaawansowanych hybrydowych pętli zamkniętych (AID / HCL) i cele CGM u dzieci.',
    ],
    sections: [
      {
        title: 'Kwasica ketonowa (DKA) u dzieci – wytyczne ISPAD 2024',
        text: 'DKA u dzieci rozpoznaje się przy triadzie: hiperglikemia (>200 mg/dl / 11 mmol/l), kwasica metaboliczna (pH krwi żylnej <7,30 lub HCO3- <18 mmol/l) oraz ketonemia (beta-hydroksymaślan we krwi ≥3,0 mmol/l) lub ketonuria. Stopień ciężkości klasyfikuje się na podstawie pH: łagodna (pH 7,20–7,29), umiarkowana (pH 7,10–7,19) i ciężka (pH <7,10 lub HCO3- <5 mmol/l). U dzieci z nowo rozpoznaną cukrzycą typu 1 DKA występuje w 30–50% przypadków jako pierwsza manifestacja choroby.',
      },
      {
        title: 'Złote zasady płynoterapii i zapobieganie obrzękowi mózgu',
        text: 'Obrzęk mózgu (cerebral edema) występuje u 0,5–1% dzieci z DKA i odpowiada za większość zgonów. Kluczowe czynniki ryzyka to: zbyt gwałtowne obniżanie osmolalności osocza, podanie zbyt dużych objętości płynów hipotonicznych oraz podanie bolusa insuliny. Zgodnie z ISPAD 2024: 1) Resuscytacja płynowa to 10–20 ml/kg 0,9% NaCl w ciągu 1 godziny; 2) Kolejne płyny podaje się powoli, rozliczając deficyt na 48 godzin; 3) Bezwzględnie ZAKAZANY jest bolus insuliny i.v.! Insulinoterapię (wlew ciągły 0,05–0,1 j./kg/h) rozpoczyna się dopiero po minimum 1 godzinie od startu nawadniania; 4) Gdy glikemia spadnie do 250–300 mg/dl, natychmiast dołącza się 5% glukozę, aby utrzymać glikemię w przedziale 150–200 mg/dl przy kontynuacji insuliny do czasu ustąpienia kwasowości.',
      },
      {
        title: 'Nowoczesne technologie: systemy AID i cele CGM u dzieci',
        text: 'Standardem opieki nad dzieckiem z T1D są obecnie zintegrowane systemy ciągłego monitorowania glikemii (rtCGM) oraz zaawansowane hybrydowe pętle zamknięte (AID / Automated Insulin Delivery). Algorytmy predykcyjne autonomicznie modyfikują dawkę bazową insuliny co 5 minut na podstawie odczytów sensora, zapobiegając hipoglikemii i hiperglikemii. Międzynarodowy cel CGM dla dzieci to: Time in Range (TIR 70–180 mg/dl) >70%, Time Below Range (TBR <70 mg/dl) <4% oraz TBR <54 mg/dl <1%.',
      },
    ],
    table: {
      headers: ['Postępowanie w DKA u dziecka', 'Zalecenie ISPAD 2024', 'Śmiertelna pułapka do uniknięcia'],
      rows: [
        ['Wstępna faza płynoterapii', '10–20 ml/kg 0,9% NaCl przez 1 godzinę', 'Podawanie płynów hipotonicznych (np. 0,45% NaCl) w 1. godzinie'],
        ['Start podawania insuliny', 'Wlew ciągły 0,05–0,1 j./kg/h po 1h płynów', 'Podanie bolusa insuliny i.v. (gwałtowny obrzęk mózgu!)'],
        ['Stężenie potasu we krwi', 'Dodać 40 mmol/l KCl do płynów od 2. godziny', 'Podanie insuliny przy hipokaliemii bez suplementacji K+'],
        ['Spadek glikemii do ~250 mg/dl', 'Dodać 5% lub 10% glukozę do wlewu', 'Zmniejszenie lub wstrzymanie insuliny (kwasica nie ustąpi!)'],
      ],
    },
    advanced:
      'W przypadku podejrzenia obrzęku mózgu (ból głowy, spadek tętna z nadciśnieniem – triada Cushinga, drażliwość, zaburzenia świadomości, asymetria źrenic) należy natychmiast, bez czekania na tomografię komputerową, podać 20% mannitol (0,5–1,0 g/kg i.v. w ciągu 15 min) lub 3% NaCl (hypertonic saline, 3–5 ml/kg w 10–15 min) oraz ograniczyć podaż płynów o 1/3.',
    summary:
      'W DKA u dzieci nigdy nie podawaj bolusa insuliny! Rozpocznij wlew 0,05–0,1 j./kg/h po godzinie nawadniania. Przy glikemii 250 mg/dl dołącz glukozę. Cele CGM: TIR >70%, hipoglikemia <4%.',
    sourceIds: ['ispad_dka'],
    questions: [
      q(
        'Dlaczego w wytycznych ISPAD 2024 kategorycznie zabrania się podawania dożylnego bolusa insuliny w DKA u dzieci?',
        ['Gwałtowny spadek osmolalności osocza indukuje przemieszczenie wody do komórek glejowych i obrzęk mózgu', 'Spadek glikemii nie może przekraczać 70–100 mg/dl na godzinę.'],
        ['Bolus insuliny niszczy trwale receptory insulinowe w wątrobie', 'Receptory ulegają fizjologicznej internalizacji, nie zniszczeniu.'],
        ['Insulina w bolusie natychmiast krystalizuje w łożysku naczyniowym', 'To twierdzenie pozbawione podstaw farmakochemicznych.'],
        'ped-cukrzyca-q1'
      ),
      q(
        'Kiedy u dziecka leczonego z powodu DKA należy rozpocząć wlew ciągły insuliny?',
        ['Dopiero po upływie co najmniej 1 godziny od rozpoczęcia resuscytacji płynowej', 'Płynoterapia wstępna stabilizuje mikrokrążenie i obniża stężenie hormonów stresowych.'],
        ['Przed rozpoczęciem jakichkolwiek wlewów płynowych', 'Podanie insuliny bez płynów nasila zapaść naczyniową.'],
        ['Dopiero po całkowitym wyrównaniu kwasicy (HCO3- > 22 mmol/l)', 'Kwasica nie ustąpi bez działania insuliny hamującej lipolizę i ketogenezę.'],
        'ped-cukrzyca-q2'
      ),
      q(
        'Co należy zrobić, gdy podczas wlewu insuliny w DKA glikemia spadnie do 250 mg/dl, a kwasica nadal trwa?',
        ['Dodać 5% lub 10% glukozę do płynów infuzyjnych i kontynuować wlew insuliny', 'Umożliwia to dalsze podawanie insuliny niezbędnej do zablokowania ketogenezy bez hipoglikemii.'],
        ['Natychmiast wyłączyć pompę z insuliną', 'Wyłączenie insuliny spowoduje nawrót kwasicy ketonowej.'],
        ['Podać wlew wodorowęglanu sodu (NaHCO3)', 'Rutynowe podawanie NaHCO3 jest przeciwwskazane z powodu kwasicy paradoksalnej w OUN.'],
        'ped-cukrzyca-q3'
      ),
      q(
        'Jaki jest międzynarodowy cel Time in Range (TIR 70–180 mg/dl) w monitorowaniu CGM u dzieci z cukrzycą typu 1?',
        ['TIR powyżej 70% czasu doby', 'Zapewnia to optymalną kontrolę metaboliczną i redukcję powikłań naczyniowych.'],
        ['TIR powyżej 99%', 'Taki cel wiązałby się z niedopuszczalnym ryzykiem ciężkich hipoglikemii.'],
        ['TIR powyżej 30%', 'TIR 30% oznacza skrajne niewyrównanie cukrzycy i wysokie ryzyko powikłań.'],
        'ped-cukrzyca-q4'
      ),
      q(
        'Który lek stanowi leczenie ratunkowe pierwszego rzutu przy wystąpieniu objawów obrzęku mózgu w DKA?',
        ['20% mannitol i.v. lub 3% NaCl (hipertoniczny roztwór soli)', 'Środki hiperosmolalne zmniejszają obrzęk tkanki mózgowej poprzez gradient osmotyczny.'],
        ['Furosemid w wysokiej dawce', 'Diuretyk pętlowy pogłębia wstrząs hipowolemiczny.'],
        ['Hydrokortyzon dożylnie', 'Steroidy nie są skuteczne w obrzęku cytotoksycznym w przebiegu DKA.'],
        'ped-cukrzyca-q5'
      ),
    ],
  },
  {
    id: 'ped-otylosc-i-zespoly-genetyczne',
    title: 'Otyłość monogenowa i zespoły genetyczne',
    subtitle: 'Szlak leptyna–melanokortyna (MC4R), zespół Pradera-Williego i dystrofie rzęskowe',
    group: 'Genetyka i dysgenezje',
    minutes: 17,
    goals: [
      'Zróżnicujesz otyłość prostą od otyłości monogenowej (szlak leptyna–POMC–MC4R) i zespołowej (Prader-Willi).',
      'Wyjaśnisz genetykę zespołu Pradera-Williego (utrata ekspresji genów ojcowskich 15q11-q13) i rolę rhGH.',
    ],
    sections: [
      {
        title: 'Szlak podwzgórzowy leptyna–melanokortyna',
        text: 'Kontrola sytości i homeostazy energetycznej zależy od szlaku podwzgórzowego jądra łukowatego (ARC) i okołokomorowego (PVN). Leptyna wydzielana przez adipocyty wiąże się z receptorem LepR, stymulując neurony POMC/CART do wytwarzania alfa-MSH. Alfa-MSH aktywuje receptor melanokortynowy 4 (MC4R) w PVN, generując sygnał sytości. Mutacje genów tego szlaku wywołują otyłość monogenową o wczesnym początku (przed 2.–5. rokiem życia) z ciężką, niepohamowaną hiperfagią. Najczęstszą przyczyną otyłości monogenowej są mutacje genu MC4R (odpowiadające za 2–5% ciężkich otyłości dziecięcych, z przyspieszonym tempem wzrastania w odróżnieniu od otyłości endokrynnej).',
      },
      {
        title: 'Zespół Pradera-Williego (PWS) – genetyka i przebieg dwufazowy',
        text: 'PWS jest najczęstszą genetyczną przyczyną otyłości syndromicznej (1:15 000). Wynika z braku ekspresji genów podlegających piętnowaniu genomowemu (imprintingowi) pochodzących od ojca w rejonie 15q11-q13 (delecja ojcowska w ~65–70%, matczyna disomia jednorodzicielska UPD15 w ~25–30%, defekt centrum imprintingu). Przebieg jest unikalnie dwufazowy: w okresie noworodkowym i niemowlęcym dominuje ciężka wiotkość (hipotonia mięśniowa), osłabienie odruchów ssania i słaby przyrost masy ciała (failure to thrive); około 2.–4. roku życia rozwija się nienasycona hiperfagia prowadząca do olbrzymiej otyłości.',
      },
      {
        title: 'Zaburzenia endokrynne w PWS i terapia rhGH',
        text: 'W zespole Pradera-Williego współistnieje wielopoziomowa dysfunkcja podwzgórza: somatotropinowa niedoczynność przysadki (niski wzrost), hipogonadyzm hipogonadotropowy (wnętrostwo, hipoplazja moszny/warg sromowych), centralna niedoczynność tarczycy i kory nadnerczy oraz wysokie ryzyko obturacyjnego bezdechu sennego (OSAS). Wczesne wdrożenie leczenia rekombinowanym GH (rhGH) poprawia napięcie mięśniowe, skład ciała (wzrost beztłuszczowej masy ciała i redukcja tkanki tłuszczowej) oraz stymuluje wzrost ostateczny; bezwzględnym warunkiem jest wcześniejsza polisomnografia w celu wykluczenia ciężkiego OSAS.',
      },
    ],
    table: {
      headers: ['Jednostka chorobowa', 'Mechanizm genetyczny', 'Cechy auksologiczne', 'Hiperfagia i fenotyp'],
      rows: [
        ['Mutacja receptora MC4R', 'Mutacja autosomalna dominująca genu MC4R', 'Wysokie tempo wzrastania (wysoki wzrost)', 'Skrajna hiperfagia, brak cech dysmorfii'],
        ['Wrodzony niedobór leptyny', 'Mutacja homozygotyczna genu LEP', 'Prawidłowy/przyspieszony wzrost wczesnodziecięcy', 'Ciężka otyłość od niemowlęctwa, leczenie metreleptyną'],
        ['Zespół Pradera-Williego', 'Brak ekspresji ojcowskiej 15q11-q13 (delecja/UPD)', 'Niski wzrost (GHD), małe dłonie i stopy', 'Dwufazowy: hipotonia noworodkowa → wilcza hiperfagia'],
        ['Zespół Bardeta-Biedla', 'Dystrofia rzęsek pierwotnych (rzęskopatia)', 'Niski wzrost, otyłość tułowiowa', 'Polidaktylia, barwnikowe zwyrodnienie siatkówki, wady nerek'],
      ],
    },
    advanced:
      'W różnicowaniu otyłości prostej (egzogennej) od otyłości endokrynnej (np. zespół Cushinga, rzekoma niedoczynność przytarczyc PHP, niedoczynność tarczycy) kluczowym kryterium auksologicznym jest tempo wzrastania: dzieci z otyłością prostą rosną szybko (wzrost często na poziomie 75.–97. centyla, przyspieszony wiek kostny przez hiperinsulinizm), podczas gdy otyłość z przyczyn hormonalnych ZAWSZE wiąże się ze zwolnieniem tempa wzrastania i niskim wzrostem.',
    summary:
      'W otyłości prostej dziecko rośnie szybko; w otyłości hormonalnej tempo wzrastania spada! PWS to utrata genów ojcowskich 15q11-q13: hipotonia niemowląt przechodzi w żarłoczną hiperfagię.',
    sourceIds: ['espe_growth'],
    questions: [
      q(
        'Która cecha auksologiczna pozwala odróżnić otyłość prostą od otyłości endokrynnej (np. w zespole Cushinga)?',
        ['W otyłości prostej tempo wzrastania jest prawidłowe lub przyspieszone, a w endokrynnej zwolnione', 'Hormonalne przyczyny otyłości zawsze hamują wzrost podłużny kości.'],
        ['W otyłości prostej wiek kostny jest zawsze opóźniony o 5 lat', 'W otyłości prostej wiek kostny bywa lekko przyspieszony z powodu hiperinsulinizmu.'],
        ['W otyłości endokrynnej nigdy nie ma nadmiernej masy ciała', 'Otyłość z definicji wiąże się z nadmiarem tkanki tłuszczowej.'],
        'ped-otylosc-q1'
      ),
      q(
        'Jaki jest mechanizm genetyczny zespołu Pradera-Williego (PWS)?',
        ['Brak ekspresji genów podlegających piętnowaniu pochodzących od ojca na chromosomie 15q11-q13', 'Najczęściej wynika z delecji ojcowskiej (70%) lub disomii matczynej (UPD15 w 25%).'],
        ['Trisomia chromosomu 21', 'Trisomia 21 to zespół Downa.'],
        ['Monosomia chromosomu X', 'Monosomia X to zespół Turnera.'],
        'ped-otylosc-q2'
      ),
      q(
        'Jaki jest charakterystyczny przebieg objawów w zespole Pradera-Williego?',
        ['Okres noworodkowy z ciężką wiotkością i trudnościami w karmieniu, a od 2.–4. r.ż. niepohamowana hiperfagia', 'Dwufazowy przebieg jest patognomoniczny dla tego zespołu.'],
        ['Urodzeniowa makrosomia i stałe zmniejszenie apetytu w dzieciństwie', 'Noworodki z PWS mają raczej niską masę urodzeniową i nie chcą ssać.'],
        ['Wczesne pokwitanie przed 6. rokiem życia', 'W PWS występuje hipogonadyzm hipogonadotropowy i opóźnienie pokwitania.'],
        'ped-otylosc-q3'
      ),
      q(
        'Który receptor podwzgórzowy jest najczęstszym miejscem mutacji prowadzących do otyłości monogenowej?',
        ['Receptor melanokortynowy 4 (MC4R)', 'Mutacje MC4R odpowiadają za 2–5% przypadków ciężkiej wczesnodziecięcej otyłości.'],
        ['Receptor insulinowy w mięśniach szkieletowych', 'Prowadzi do ciężkich zespołów insulinooporności (np. Donohue), nie typowej otyłości monogenowej.'],
        ['Receptor beta-3-adrenergiczny', 'Nie jest głównym podwzgórzowym przełącznikiem sytości.'],
        'ped-otylosc-q4'
      ),
      q(
        'Jakie badanie należy bezwzględnie wykonać u dziecka z zespołem Pradera-Williego przed rozpoczęciem terapii rhGH?',
        ['Polisomnografię w celu wykluczenia ciężkiego obturacyjnego bezdechu sennego (OSAS)', 'Hormon wzrostu może początkowo powiększyć tkankę limfatyczną gardła i nasilić bezdechy.'],
        ['Tomografię klatki piersiowej', 'Nie ma rutynowych wskazań do naświetlania promieniami RTG.'],
        ['Biopsję szpiku kostnego', 'Układ krwiotwórczy nie wymaga rutynowej inwazyjnej biopsji.'],
        'ped-otylosc-q5'
      ),
    ],
  },
  {
    id: 'ped-dsd-roznicowanie',
    title: 'Zaburzenia rozwoju płciowego (DSD)',
    subtitle: 'Klasyfikacja konsensusowa Chicago, algorytm 46,XX vs 46,XY i diagnostyka różnicowa',
    group: 'Dojrzewanie i gonady',
    minutes: 19,
    goals: [
      'Zastosujesz konsensusową klasyfikację zaburzeń rozwoju płciowego (DSD: 46,XX; 46,XY; chromosomalne DSD).',
      'Wdrożysz pilny algorytm diagnostyczny noworodka z nietypowymi narządami płciowymi (wykluczenie CAH z utratą soli).',
    ],
    sections: [
      {
        title: 'Nietypowe narządy płciowe noworodka – stan pilny',
        text: 'Stwierdzenie u noworodka nietypowych narządów płciowych (ambiguous genitalia: obustronne niewyczuwalne jądra, spodziectwo kroczyowe z rozszczepem moszny, przerost łechtaczki >9 mm, zrośnięte fałdy wargowo-mosznowe) stanowi pilny stan endokrynologiczny. Pierwszą i najważniejszą zasadą postępowania jest powstrzymanie się od rejestracji płci metrykalnej dziecka do czasu zakończenia diagnostyki oraz natychmiastowe wykluczenie wrodzonego przerostu nadnerczy (CAH), który u noworodka 46,XX z wirylizacją może w ciągu kilkunastu dni doprowadzić do śmiertelnego przełomu solnego!',
      },
      {
        title: 'Klasyfikacja konsensusowa DSD (Consensus Chicago / ESPE)',
        text: 'Zgodnie z międzynarodową klasyfikacją DSD dzieli się na trzy główne grupy: 1) Chromosomalne DSD (aberracje liczbowe i strukturalne chromosomów płci: 45,X zespół Turnera, 47,XXY zespół Klinefeltera, 45,X/46,XY mozaicyzm, chimeryzm 46,XX/46,XY); 2) 46,XX DSD (zaburzenia rozwoju jajników lub nadmiar androgenów płodowych: najczęściej CAH z niedoboru 21-hydroksylazy lub 11-beta-hydroksylazy, rzadziej aromatazy łożyskowej lub guzów wirylizujących matki); 3) 46,XY DSD (zaburzenia rozwoju jąder np. mutacje SRY, SOX9, WT1 lub defekty syntezy/działania androgenów: zespół niewrażliwości na androgeny CAIS/PAIS z mutacją receptora androgenowego AR, niedobór 5-alfa-reduktazy typu 2).',
      },
      {
        title: 'Algorytm diagnostyczny i rola zespołu wielodyscyplinarnego',
        text: 'Panel badań ratunkowych w pierwszej dobie obejmuje: kariotyp z szybką hybrydyzacją FISH dla SRY/chromosomu Y, stężenie 17-OHP, elektrolity (Na+, K+), gazometrię oraz pilne USG miednicy i jamy brzusznej (ocena obecności macicy i poszukiwanie gonad). Obecność macicy w USG silnie wskazuje na brak działania hormonu antymüllerowskiego (AMH), co u noworodka z wirylizacją przemawia za kariotypem 46,XX i nadmiarem androgenów (CAH). Brak macicy wskazuje na obecność sprawnych komórek Sertoliego wydzielających AMH (typowo gonady męskie w 46,XY DSD). Decyzje o postępowaniu podejmuje wielodyscyplinarny zespół (endokrynolog dziecięcy, urolog, genetyk, psycholog).',
      },
    ],
    table: {
      headers: ['Grupa DSD', 'Kariotyp / Narządy wewnętrzne', 'Typowe jednostki chorobowe', 'Profil hormonalny'],
      rows: [
        ['46,XX DSD z wirylizacją', '46,XX; Obecna macica, brak jąder', 'Wrodzony przerost nadnerczy (niedobór 21-OH)', 'Wysokie 17-OHP, wysoki androstendion, brak AMH'],
        ['46,XY DSD z niedowirylizacją', '46,XY; Brak macicy, obecne jądra', 'Zespół niewrażliwości na androgeny (CAIS)', 'Wysoki testosteron i LH, wysoki AMH, brak receptorów AR'],
        ['46,XY DSD z defektem konwersji', '46,XY; Brak macicy, obecne jądra', 'Niedobór 5-alfa-reduktazy typu 2 (SRD5A2)', 'Prawidłowy testosteron, skrajnie niski DHT (stosunek T/DHT >20)'],
        ['Chromosomalne DSD', 'Mozaiki 45,X/46,XY, 46,XX/46,XY', 'Mieszana dysgenezja gonad, owotestis', 'Zmienny, asymetria narządów wewnętrznych'],
      ],
    },
    advanced:
      'W zespole całkowitej niewrażliwości na androgeny (CAIS, zespół Morrisa) kariotyp wynosi 46,XY, a jądra znajdują się w kanale pachwinowym lub jamie brzusznej. Ponieważ komórki Sertoliego prawidłowo wydzielają AMH, przewody Müllera zanikają (brak macicy, jajowodów i górnej części pochwy). Z powodu całkowitego braku wrażliwości receptora AR narządy zewnętrzne rozwijają się całkowicie żeńsko. Dziewczynka z CAIS zgłasza się typowo w wieku nastoletnim z powodu pierwotnego braku miesiączki przy prawidłowo rozwiniętych gruczołach piersiowych (aromatyzacja wysokiego testosteronu do estrogenów) i całkowitym braku owłosienia łonowego i pachowego.',
    summary:
      'Nietypowe narządy płciowe noworodka to stan pilny: najpierw wyklucz zagrażający życiu CAH! USG miednicy (obecność macicy = brak AMH) oraz kariotyp rozstrzygają kierunek diagnostyki.',
    sourceIds: ['espe_dsd', 'cah_pediatric'],
    questions: [
      q(
        'Jaki jest najważniejszy pierwszy cel diagnostyczny u noworodka ze stwierdzonymi narządami płciowymi o niejednoznacznej budowie?',
        ['Pilne wykluczenie wrodzonego przerostu nadnerczy (CAH), grożącego śmiertelnym przełomem solnym', 'U dziewczynek 46,XX CAH wywołuje wirylizację i zagrażającą życiu utratę soli w 2. tyg. życia.'],
        ['Natychmiastowe chirurgiczne uformowanie narządów płciowych w pierwszej dobie', 'Operacje bez ustalonej diagnozy genetycznej i metabolicznej są błędem w sztuce.'],
        ['Podanie wysokich dawek hormonu wzrostu', 'Hormon wzrostu nie ma zastosowania w diagnostyce różnicowej DSD noworodka.'],
        'ped-dsd-q1'
      ),
      q(
        'Co oznacza obecność macicy w badaniu USG u noworodka z nietypowymi narządami płciowymi?',
        ['Brak czynności komórek Sertoliego i brak wydzielania AMH (przemawia za 46,XX lub agenezją jąder)', 'Hormon antymüllerowski (AMH) odpowiada za fizjologiczny zanik przewodów Müllera.'],
        ['Obecność prawidłowo wykształconych jąder w jamie brzusznej', 'Sprawne jądra wytwarzają AMH, co powoduje całkowity zanik macicy.'],
        ['Pewne rozpoznanie zespołu niewrażliwości na androgeny (CAIS)', 'W CAIS przewody Müllera zanikają pod wpływem AMH, więc macicy nie ma.'],
        'ped-dsd-q2'
      ),
      q(
        'Dlaczego u pacjentki z zespołem całkowitej niewrażliwości na androgeny (CAIS, 46,XY) piersi rozwijają się prawidłowo?',
        ['Wysokie stężenia testosteronu ulegają obwodowej aromatyzacji do estrogenów działających na sprawne receptory ER', 'Brak blokady ze strony receptorów androgenowych umożliwia pełną feminizację sutków.'],
        ['Jądra wydzielają wyłącznie progesteron', 'Jądra wydzielają testosteron, nie sam progesteron.'],
        ['Przysadka produkuje nadmierne ilości prolaktyny', 'Rozwój piersi zależy od estrogenów, nie samej prolaktyny.'],
        'ped-dsd-q3'
      ),
      q(
        'Jaki defekt enzymatyczny charakteryzuje się prawidłowym stężeniem testosteronu przy skrajnie niskim dihydrotestosteronie (DHT)?',
        ['Niedobór 5-alfa-reduktazy typu 2 (SRD5A2)', 'Enzym ten odpowiada za konwersję T do silniejszego androgenu DHT w tkankach narządów zewnętrznych.'],
        ['Niedobór 21-hydroksylazy', 'CYP21A2 dotyczy steroidogenezy nadnerczowej, nie konwersji T do DHT.'],
        ['Niedobór aromatazy', 'Aromataza przekształca androgeny w estrogeny, nie testosteron w DHT.'],
        'ped-dsd-q4'
      ),
      q(
        'Dlaczego u noworodka z ambiguous genitalia wstrzymuje się rejestrację płci metrykalnej?',
        ['Aby uniknąć błędnego przypisania płci przed zakończeniem badań genetycznych, hormonalnych i anatomicznych', 'Błędna rejestracja niesie katastrofalne konsekwencje medyczne, prawne i psychospołeczne.'],
        ['Ponieważ płeć metrykalną w prawie ustala się dopiero w 18. roku życia', 'Płeć rejestruje się po wyjaśnieniu rozpoznania przez zespół wielodyscyplinarny.'],
        ['Bo u noworodków narządy płciowe zawsze zanikają', 'Narządy nie zanikają; wymagają precyzyjnego zdefiniowania etiologii.'],
        'ped-dsd-q5'
      ),
    ],
  },
  {
    id: 'ped-stany-nagle-pediatria',
    title: 'Stany nagłe w endokrynologii dziecięcej',
    subtitle: 'Hipoglikemia noworodkowa, wrodzony hiperinsulinizm i ostra niewydolność kory nadnerczy',
    group: 'Stany nagłe i intensywna terapia',
    minutes: 18,
    goals: [
      'Wdrożysz algorytm diagnostyki i leczenia ciężkiej hipoglikemii noworodkowej oraz wrodzonego hiperinsulinizmu (CHI).',
      'Rozpoznasz i opanujesz ostry przełom nadnerczowy u dziecka w przebiegu infekcji lub stresu operacyjnego.',
    ],
    sections: [
      {
        title: 'Hipoglikemia noworodkowa i wrodzony hiperinsulinizm (CHI)',
        text: 'Hipoglikemia u noworodka (glikemia <45–50 mg/dl / <2,5–2,8 mmol/l) jest stanem bezpośredniego zagrożenia uszkodzeniem kory mózgowej. Najczęstszą przyczyną ciężkiej, nawracającej hipoglikemii u noworodków jest wrodzony hiperinsulinizm (Congenital Hyperinsulinism, CHI), wynikający z mutacji kanału potasowego KATP w komórkach beta trzustki (geny ABCC8 i KCNJ11 kodujące podjednostki SUR1 i Kir6.2). W CHI dochodzi do niekontrolowanego, autonomicznego wydzielania insuliny niezależnie od hipoglikemii, co całkowicie hamuje wątrobową glukoneogenezę i ketogenezę (hipoglikemia hipoketotyczna).',
      },
      {
        title: 'Krytyczna próbka krwi („critical sample”) i leczenie CHI',
        text: 'W chwili stwierdzenia hipoglikemii (<50 mg/dl), PRZED podaniem glukozy, bezwzględnie należy pobrać tzw. próbkę krytyczną krwi na: insulinę, C-peptyd, wolne kwasy tłuszczowe (FFA), beta-hydroksymaślan, kortyzol, hormon wzrostu, mleczany i profil acylokarnityn. Wykrywalne stężenie insuliny (>2–3 µIU/ml) przy glikemii <50 mg/dl z obniżonymi ciałami ketonowymi i FFA jest patognomoniczne dla hiperinsulinizmu. W leczeniu doraźnym stosuje się wlew glukozy w wysokiej dawce (GIR – glucose infusion rate >8–12 mg/kg/min). Lekiem I rzutu w CHI jest diazoksyd (otwiera kanały KATP), a przy oporności analogi somatostatyny (oktreotyd).',
      },
      {
        title: 'Ostra niewydolność kory nadnerczy i zasady „sick-day rules”',
        text: 'Dzieci z pierwotną (choroba Addisona, CAH) lub wtórną niewydolnością kory nadnerczy są narażone na ostry przełom nadnerczowy w trakcie infekcji z gorączką, wymiotów, urazu lub zabiegu operacyjnego. Podstawą prewencji są tzw. zasady dni choroby (sick-day rules): przy gorączce >38,5°C dawkę doustnego hydrokortyzonu należy natychmiast podwoić lub potroić. W przypadku wymiotów lub biegunki uniemożliwiającej przyjęcie leku doustnego rodzice muszą natychmiast podać hydrokortyzon domięśniowo (ampułka ratunkowa: 25 mg u niemowląt, 50 mg u dzieci do 5 lat, 100 mg u dzieci starszych) i wezwać pogotowie ratunkowe.',
      },
    ],
    table: {
      headers: ['Sytuacja kliniczna', 'Kluczowe objawy alarmowe', 'Postępowanie natychmiastowe'],
      rows: [
        ['Hipoglikemia noworodkowa (GIR >10 mg/kg/min)', 'Drgawki, bezdechy, wiotkość, glikemia <45 mg/dl', 'Bolus 10% glukozy (2 ml/kg i.v.) + wlew ciągły; critical sample!'],
        ['Wrodzony hiperinsulinizm (CHI)', 'Hipoketotyczna hipoglikemia, makrosomia', 'Diazoksyd (5–15 mg/kg/d); przy braku odpowiedzi oktreotyd s.c.'],
        ['Przełom nadnerczowy w infekcji', 'Wymioty, apatia, hipotonia, hiponatremia z hiperkaliemią', 'Hydrokortyzon i.v./i.m. natychmiast + wlew 0,9% NaCl z glukozą'],
        ['Zasady sick-day rules (gorączka)', 'Temperatura >38,5°C u dziecka na stałym hydrokortyzonie', 'Podwojenie/potrojenie dawki doustnej hydrokortyzonu przez 48h'],
      ],
    },
    advanced:
      'W różnicowaniu postaci wrodzonego hiperinsulinizmu kluczowe jest badanie PET z 18F-DOPA. Pozwala ono odróżnić postać ogniskową (focal CHI – wynikającą z ojcowskiej mutacji ABCC8 i somatycznej utraty heterozygotyczności 11p15 w małym skupisku komórek beta trzustki) od postaci uogólnionej (diffuse). W postaci ogniskowej precyzyjna resekcja zmiany jest całkowicie wyleczająca, chroniąc dziecko przed subtotalną pankreatektomią.',
    summary:
      'W hipoglikemii noworodka pobierz critical sample przed podaniem glukozy! W CHI insulina jest obecna mimo hipoglikemii. W chorobie Addisona/CAH gorączka wymaga 2–3-krotnego zwiększenia dawki hydrokortyzonu.',
    sourceIds: ['cah_pediatric'],
    questions: [
      q(
        'Który zestaw parametrów w tzw. próbce krytycznej (critical sample) pobranej podczas hipoglikemii wskazuje na wrodzony hiperinsulinizm?',
        ['Wykrywalne stężenie insuliny przy skrajnie niskich ciałach ketonowych i wolnych kwasach tłuszczowych', 'Insulina całkowicie blokuje lipolizę i ketogenezę, powodując hipoglikemię hipoketotyczną.'],
        ['Niewykrywalna insulina z masywną ketonurią i kwasicą', 'To obraz hipoglikemii ketotycznej lub niedoboru GH/kortyzolu.'],
        ['Wysokie stężenie kwasu mlekowego z hiperamonemią', 'Wskazuje na wrodzoną wadę metabolizmu (np. defekt beta-oksydacji), nie CHI.'],
        'ped-stany-nagle-q1'
      ),
      q(
        'Jaki jest mechanizm działania diazoksydu – leku pierwszego rzutu we wrodzonym hiperinsulinizmie?',
        ['Otwiera wrażliwe na ATP kanały potasowe (KATP) w komórkach beta, wywołując hiperpolaryzację błony i hamując wyrzut insuliny', 'Hiperpolaryzacja zamyka kanały wapniowe zależne od napięcia.'],
        ['Niszczy wybiórczo komórki wyspowe trzustki', 'Diazoksyd jest lekiem naczyniowo-kanałowym, nie lekiem cytotoksycznym.'],
        ['Stymuluje rozpad glikogenu w nerkach', 'Nie działa bezpośrednio na glikogenolizę nerkową.'],
        'ped-stany-nagle-q2'
      ),
      q(
        'Jakie jest podstawowe zalecenie sick-day rules u dziecka z chorobą Addisona przy gorączce >38,5°C?',
        ['Podwojenie lub potrojenie dotychczasowej dawki doustnej hydrokortyzonu', 'Fizjologiczny stres infekcyjny wymaga kilkukrotnie wyższej puli glukokortykoidowej.'],
        ['Natychmiastowe odstawienie hydrokortyzonu na czas gorączki', 'Całkowite odstawienie doprowadzi w ciągu kilku godzin do zgonu w przełomie nadnerczowym.'],
        ['Podanie wyłącznie paracetamolu bez zmiany dawki hydrokortyzonu', 'Leki przeciwgorączkowe nie zastępują endogennego zapotrzebowania na kortyzol.'],
        'ped-stany-nagle-q3'
      ),
      q(
        'Jak należy postąpić, gdy dziecko z CAH zaczyna intensywnie wymiotować w przebiegu nieżytu żołądkowo-jelitowego?',
        ['Podać hydrokortyzon domięśniowo z domowej ampułki ratunkowej i natychmiast wezwać pogotowie', 'Wymioty uniemożliwiają wchłonięcie tabletek; konieczna jest natychmiastowa droga pozajelitowa.'],
        ['Podać kolejną tabletkę hydrokortyzonu z ciepłą herbatą', 'Kolejna tabletka zostanie zwymiotowana, pogłębiając zapaść.'],
        ['Czekać 24 godziny na ustąpienie wymiotów', 'Doba zwłoki w CAH to pewny zgon w hiponatremii i wstrząsie.'],
        'ped-stany-nagle-q4'
      ),
      q(
        'Dlaczego badanie PET z 18F-DOPA ma przełomowe znaczenie w postępowaniu w CHI u niemowląt?',
        ['Pozwala zróżnicować postać ogniskową (wyleczalną operacyjnie) od postaci uogólnionej', 'Wykrycie ogniska umożliwia oszczędzającą resekcję bez konieczności usuwania całej trzustki.'],
        ['Służy do oceny przerzutów raka trzustki', 'CHI u noworodków jest schorzeniem nienowotworowym.'],
        ['Pozwala określić stężenie glukozy w komórkach glejowych', 'PET z 18F-DOPA bada wychwyt prekursora amin katecholowych/dopaminergicznych w komórkach neuroendokrynnych.'],
        'ped-stany-nagle-q5'
      ),
    ],
  },
];
