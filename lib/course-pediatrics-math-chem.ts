import { q, type DraftLesson } from './course-types.ts';

export const draftPediatricsMathChem: DraftLesson[] = [
  {
    id: 'ped-modele-predykcji-wzrostu',
    title: 'Matematyczne modele predykcji wzrostu ostatecznego',
    subtitle: 'Algorytmy Bayleya-Pinneau, Khamisa-Roche’a, Tanner-Whitehouse TW3 i kinetyka PHV',
    group: 'Matematyka i modele',
    minutes: 19,
    goals: [
      'Porównasz matematyczne metody predykcji wzrostu ostatecznego (Bayley-Pinneau z wiekiem kostnym vs Khamis-Roche bez RTG).',
      'Przeanalizujesz krzywą prędkości wzrastania (PHV – peak height velocity) i dynamikę skoku pokwitaniowego.',
    ],
    sections: [
      {
        title: 'Matematyka wzrostu docelowego i ograniczenia auksologii statycznej',
        text: 'Formuła Hermana/Tannera szacuje średni potencjał genetyczny (Mid-Parental Height): MPH_chłopcy = (H_ojca + H_matki + 13) / 2; MPH_dziewczęta = (H_ojca - 13 + H_matki) / 2. Wartość ta stanowi punkt centralny rozkładu Gaussa z odchyleniem standardowym populacji dorosłej (SD ~5,5–6,0 cm). Przedział ufności ±2 SD (ok. ±8,5 cm) oznacza, że samo określenie target height obarczone jest 17-centymetrowym pasmem niepewności genetycznej. Dlatego do precyzyjniejszej predykcji wprowadza się parametry dynamiczne: aktualną wysokość ciała, wiek metrykalny i wiek kostny.',
      },
      {
        title: 'Algorytmy predykcji: Bayley-Pinneau, Roche-Wainer-Thissen i Khamis-Roche',
        text: 'Metoda Bayleya-Pinneau opiera się na założeniu, że odsetek osiągniętego wzrostu ostatecznego (% adult height) jest ściśle skorelowany z wiekiem kostnym ocenianym atlasem Greulicha-Pyle’a: Wzrost_ostateczny = Aktualny_wzrost / Odsetek(Wiek_kostny). Nowsza metoda Khamisa-Roche’a (1994) eliminuje konieczność wykonywania RTG dłoni, wykorzystując równanie regresji wielorakiej oparte na aktualnym wieku, wzroście, masie ciała dziecka oraz średnim wzroście rodziców (z błędem predykcji rzędu 2,5–3,5 cm u dzieci powyżej 4. roku życia).',
      },
      {
        title: 'Dynamika skoku pokwitaniowego i kinetyka PHV (Peak Height Velocity)',
        text: 'W okresie dojrzewania prędkość wzrastania zmienia się nieliniowo. Faza przyspieszenia prowadzi do szczytowego tempa wzrastania (Peak Height Velocity, PHV), które u dziewcząt przypada średnio w stadium Tannera II/III (około 11,5–12 r.ż., tempo 8–9 cm/rok), a u chłopców w stadium Tannera III/IV (około 13,5–14 r.ż., tempo 9,5–11 cm/rok). Menarche u dziewcząt następuje fizjologicznie PO szczycie PHV, w fazie gwałtownej deceleracji; po pierwszej miesiączce dziewczynka rośnie statystycznie już tylko o 4–7 cm.',
      },
    ],
    table: {
      headers: ['Model matematyczny', 'Wymagane parametry wejściowe', 'Zalety modelu', 'Główne ograniczenia'],
      rows: [
        ['Mid-Parental Height (Tanner)', 'Wzrost matki, wzrost ojca, płeć', 'Błyskawiczny w gabinecie, nie wymaga badań', 'Szeroki przedział błędu (±8,5 cm), pomija dynamikę'],
        ['Bayley-Pinneau (BP)', 'Wzrost dziecka, wiek kostny (Greulich-Pyle)', 'Precyzyjny przy skrajnym opóźnieniu/przyspieszeniu', 'Błąd subiektywnej oceny RTG, niedokładny u dysplazji'],
        ['Khamis-Roche (KR)', 'Wiek, wzrost, masa dziecka, wzrost rodziców', 'Brak ekspozycji na RTG, wysoka zgodność statystyczna', 'Skalibrowany tylko dla dzieci rasy kaukaskiej >4 r.ż.'],
        ['Tanner-Whitehouse Mark 3', 'Wiek, wzrost, wiek kostny RUS (TW3)', 'Wysoka powtarzalność analityczna poszczególnych kości', 'Skomplikowana punktacja, czasochłonny'],
      ],
    },
    advanced:
      'W ujęciu różniczkowym prędkość wzrastania v(t) = dH/dt modeluje się funkcjami sigmoidalnymi (np. model Preece-Baines Model 1): H(t) = h1 - 2*(h1 - htheta) / (exp(s0*(t - theta)) + exp(s1*(t - theta))). Model ten pozwala precyzyjnie wyznaczyć matematyczny punkt przegięcia krzywej wzrostu odpowiadający momentowi wystąpienia PHV i oszacować wiek zamknięcia płytek nasadowych pod wpływem rosnącej ekspozycji na estrogeny.',
    summary:
      'Predykcja wzrostu to rachunek prawdopodobieństwa, a nie deterministyczna liczba. Modele BP i Khamisa-Roche’a redukują błąd MPH. Menarche następuje po szczycie PHV (pozostały przyrost ~4–7 cm).',
    sourceIds: ['ped_olaf_norms', 'espe_growth'],
    questions: [
      q(
        'Na czym polega matematyczne założenie metody Bayleya-Pinneau w predykcji wzrostu dorosłego?',
        ['Zakłada, że odsetek osiągniętego wzrostu ostatecznego zależy bezpośrednio od dojrzałości szkieletowej (wieku kostnego)', 'Dzieli aktualny wzrost dziecka przez stablicowany ułamek przypisany do danego wieku kostnego.'],
        ['Opiera się wyłącznie na masie urodzeniowej noworodka', 'Masa urodzeniowa ma minimalną korelację ze wzrostem ostatecznym.'],
        ['Mnoży wzrost ojca przez współczynnik 1,5', 'Wzrost ojca nie jest parametrem formuły Bayleya-Pinneau.'],
        'ped-modele-wzrostu-q1'
      ),
      q(
        'Jaka jest kluczowa zaleta modelu Khamisa-Roche’a w porównaniu z klasycznymi algorytmami auksologicznymi?',
        ['Nie wymaga wykonywania zdjęcia rentgenowskiego dłoni do oceny wieku kostnego', 'Wykorzystuje regresję opartą na wieku, wzroście i wadze dziecka oraz wzroście rodziców.'],
        ['Gwarantuje dokładność co do milimetra bez żadnego przedziału błędu', 'Żaden model auksologiczny nie daje prognozy bez błędu statystycznego.'],
        ['Działa niezawodnie u niemowląt w 1. miesiącu życia', 'Model Khamisa-Roche’a jest zwalidowany dla dzieci powyżej 4. roku życia.'],
        'ped-modele-wzrostu-q2'
      ),
      q(
        'W którym stadium pokwitania wg skali Tannera przypada szczyt prędkości wzrastania (PHV) u dziewcząt?',
        ['W stadium Tannera II / III (przed wystąpieniem pierwszej miesiączki)', 'Skok pokwitaniowy u dziewcząt następuje wcześnie; menarche zamyka fazę najszybszego wzrostu.'],
        ['Dopiero 2 lata po wystąpieniu menarche', 'Po menarche tempo wzrastania gwałtownie spada w kierunku zera.'],
        ['W stadium prepubertalnym Tannera I', 'W stadium I tempo wzrastania jest stabilne i wynosi 5–6 cm/rok.'],
        'ped-modele-wzrostu-q3'
      ),
      q(
        'O ile centymetrów przeciętnie rośnie dziewczynka po wystąpieniu pierwszej miesiączki (menarche)?',
        ['Około 4–7 cm', 'Wysokie stężenia estrogenów indukują zrastanie nasad kości długich, ograniczając dalszy wzrost.'],
        ['O ponad 20–25 cm', 'Taki przyrost występuje w całym okresie pokwitania, nie po menarche.'],
        ['Wzrost natychmiast ulega zatrzymaniu o 0 cm w dniu menarche', 'Zrastanie chrząstek wzrostowych jest procesem trwającym jeszcze 12–24 miesiące.'],
        'ped-modele-wzrostu-q4'
      ),
      q(
        'Jaki jest typowy 95% przedział niepewności (przedział ufności) dla wzrostu docelowego obliczanego ze wzoru Tannera?',
        ['Około ±8,5 cm (pasmo rozpiętości rzędu 17 cm)', 'Wynika to z biologicznego rozrzutu poligenicznego i odchylenia standardowego populacji.'],
        ['Dokładnie ±1 cm', 'Zmienność genetyczna i środowiskowa wyklucza tak wąski margines.'],
        ['Około ±30 cm', 'Rozrzut 60 cm byłby pozbawiony jakiejkolwiek użyteczności klinicznej.'],
        'ped-modele-wzrostu-q5'
      ),
    ],
  },
  {
    id: 'ped-kinetyka-gh-pulsacyjnosc',
    title: 'Kinetyka pulsacyjnego wydzielania GH',
    subtitle: 'Nieliniowy oscylator GHRH–somatostatyna–GH i farmakokinetyka form o przedłużonym uwalnianiu',
    group: 'Matematyka i modele',
    minutes: 18,
    goals: [
      'Wyjaśnisz matematyczny model sprzężonego oscylatora podwzgórzowo-przysadkowego (GHRH vs somatostatyna).',
      'Przeanalizujesz farmakokinetykę dobowych iniekcji rhGH vs nowoczesnych długodziałających preparatów LAGH.',
    ],
    sections: [
      {
        title: 'Oscylator Goodwina: sprzężenie przeciwstawnych neurohormonów',
        text: 'Wydzielanie hormonu wzrostu jest zjawiskiem wysoce pulsacyjnym, generowanym przez dwa przeciwstawne neuropeptydy podwzgórza: somatoliberynę (GHRH – sygnał aktywujący) oraz somatostatynę (SRIF – sygnał hamujący), modulowane obwodowo przez grelinę i ujemne sprzężenie zwrotne IGF-1. Matematycznie pulsator ten zachowuje się jak układ sprzężonych nieliniowych równań różniczkowych z opóźnieniem czasowym (time-delay differential equations). Wyrzut piku GH zachodzi wyłącznie w oknie czasowym, w którym stężenie somatostatyny wrotnej spada (tzw. disinhibition), a stężenie GHRH wzrasta.',
      },
      {
        title: 'Analiza dekonwolucyjna profili dobowych GH',
        text: 'W warunkach fizjologicznych przysadka zdrowego nastolatka generuje 8–12 pulsów GH na dobę, z czego ponad 70% całkowitej dobowej masy hormonu uwalnia się w nocy, podczas pierwszych cykli snu wolnofalowego (NREM faza 3 i 4). Zaawansowana analiza matematyczna profili seryjnych oznaczeń GH (dekonwolucja) pozwala rozdzielić dwa zjawiska: masę wydzielania w pojedynczym pikucie (burst mass) oraz podstawowe tempo eliminacji klirensu osoczowego (okres półtrwania wolnego GH w osoczu wynosi zaledwie 15–20 minut).',
      },
      {
        title: 'Farmakokinetyka rhGH: dobowy profil s.c. vs preparaty LAGH (raz w tygodniu)',
        text: 'Klasyczna terapia rhGH polega na codziennych iniekcjach podskórnych wieczorem. Po podaniu s.c. wchłanianie jest powolne (efekt depot w tkance podskórnej): Cmax w osoczu osiągane jest po 3–5 godzinach, a stężenie powraca do wartości wyjściowych po 12–18 godzinach, co częściowo naśladuje nocny wyrzut. Wprowadzone niedawno długodziałające preparaty hormonu wzrostu (LAGH – Long-Acting Growth Hormone, np. somatrogon, lonapegsomatropina) stosowane raz w tygodniu wykazują odmienną kinetykę: stałe, spłaszczone stężenie w osoczu ze stabilną indukcją syntezy IGF-1 przez 7 dni.',
      },
    ],
    table: {
      headers: ['Forma terapii GH', 'Tmax (szczyt w surowicy)', 'Okres półtrwania t1/2', 'Dynamika IGF-1 w surowicy', 'Uwagi kliniczne'],
      rows: [
        ['Endogenny pik GH', 'Błyskawiczny wyrzut (minuty)', '15–20 minut', 'Stabilna synteza wątrobowa', 'Głównie fazy NREM snu głębokiego'],
        ['Codzienny rhGH s.c.', '3–5 godzin po iniekcji', '2–4 godziny (klirens tkankowy)', 'Szczyt IGF-1 po 16–24 godzinach', 'Wstrzykiwany wieczorem przed snem'],
        ['Długodziałający LAGH (1x/tydz.)', '24–48 godzin po podaniu', '30–60 godzin (np. fuzja z białkiem)', 'Płynna fala IGF-1 przez 7 dni', 'Konieczność pomiaru IGF-1 w 3.–4. dobie'],
      ],
    },
    advanced:
      'Przy monitorowaniu bezpieczeństwa preparatów LAGH oznaczanie stężenia IGF-1 wymaga ścisłego ustandaryzowania czasu pobrania krwi względem cotygodniowej iniekcji. Stężenie IGF-1 osiąga maksimum w 2.–3. dobie po podaniu, a minimum w dobie 7. Wytyczne zalecają docelowe utrzymywanie średniego tygodniowego stężenia IGF-1 w zakresie od 0 do +1,5–2,0 SDS dla wieku i płci.',
    summary:
      'GH wydziela się w 8–12 nocnych pulsach (t1/2 = 15–20 min) w wyniku oscylacji GHRH i somatostatyny. Codzienny rhGH daje Cmax po 3–5h, a LAGH podawany raz w tygodniu utrzymuje stabilny IGF-1.',
    sourceIds: ['ghrs_consensus', 'espe_growth'],
    questions: [
      q(
        'Jaki jest fizjologiczny okres półtrwania (t1/2) wolnego hormonu wzrostu we krwi krążącej?',
        ['Około 15–20 minut', 'Krótki czas półtrwania wymusza badanie rezerwy testami prowokacyjnymi, a nie pojedynczym pomiarem.'],
        ['Około 24 godzin', 'GH nie krąży tak długo; dobowa stabilność dotyczy kompleksu IGF-1/IGFBP-3.'],
        ['Około 7 dni', 'Tydzień to czas działania syntetycznych preparatów fuzorowych LAGH, nie cząsteczki natywnej.'],
        'ped-kinetyka-gh-q1'
      ),
      q(
        'W której fazie snu dochodzi do najsilniejszego fizjologicznego wyrzutu hormonu wzrostu u dzieci?',
        ['W fazie snu wolnofalowego NREM (faza delta / głęboki sen)', 'Wyrzut jest zsynchronizowany z falami wolnymi elektroencefalogramu w pierwszych cyklach snu.'],
        ['W fazie REM z szybkimi ruchami gałek ocznych', 'W fazie REM wydzielanie GH jest zahamowane.'],
        ['Wyłącznie w momencie wybudzenia o poranku', 'Rano stężenie GH jest z reguły bliskie zeru.'],
        'ped-kinetyka-gh-q2'
      ),
      q(
        'Co jest warunkiem koniecznym do wygenerowania piku GH w podwzgórzowym modelu oscylatora Goodwina?',
        ['Równoczesny spadek uwalniania somatostatyny i wyrzut GHRH', 'Brak hamowania somatostatynowego umożliwia maksymalną odpowiedź somatotropów na GHRH.'],
        ['Masywny wyrzut dopaminy i prolaktyny', 'Dopamina nie jest kluczowym pulsacyjnym generatorem piku GH w tym oscylatorze.'],
        ['Gwałtowny wzrost stężenia wolnego kortyzolu', 'Glikokortykoidy w nadmiarze hamują wydzielanie GH.'],
        'ped-kinetyka-gh-q3'
      ),
      q(
        'Kiedy przypada stężenie maksymalne (Cmax) hormonu wzrostu w osoczu po wieczornej iniekcji podskórnej standardowego rhGH?',
        ['Po około 3–5 godzinach od iniekcji s.c.', 'Powolne uwalnianie z tkanki podskórnej tworzy sztuczny nocny profil farmakokinetyczny.'],
        ['Po 30 sekundach', 'Tak szybki pik daje wyłącznie iniekcja dożylna w bolusie.'],
        ['Dopiero po 72 godzinach', 'Po 72 godzinach standardowy rhGH jest całkowicie wyeliminowany z ustroju.'],
        'ped-kinetyka-gh-q4'
      ),
      q(
        'Jaki jest celowy przedział terapeutyczny SDS dla stężenia IGF-1 podczas przewlekłego leczenia rhGH u dzieci?',
        ['Od 0 do +2,0 SDS', 'Gwarantuje to maksymalizację tempa wzrastania przy zachowaniu pełnego profilu bezpieczeństwa onkologicznego.'],
        ['Poniżej -2,0 SDS', 'Utrzymywanie IGF-1 poniżej -2 SDS dowodzi nieskuteczności dawki lub braku adherencji chorego.'],
        ['Powyżej +5,0 SDS', 'Tak wysokie wartości wiążą się z ryzykiem akromegaloidyzmu i powikłań metabolicznych.'],
        'ped-kinetyka-gh-q5'
      ),
    ],
  },
  {
    id: 'ped-szlak-ghr-jak-stat-igf',
    title: 'Biochemia receptora GH i szlak JAK2–STAT5b–IGF1',
    subtitle: 'Dimeryzacja receptora, transdukcja sygnału jądrowego i molekularna oporność na GH (zespół Larona)',
    group: 'Chemia i biochemia',
    minutes: 18,
    goals: [
      'Opiszesz molekularny mechanizm aktywacji receptora GHR poprzez dimeryzację i autofosforylację kinazy JAK2.',
      'Wyjaśnisz kaskadę fosforylacji czynnika transkrypcyjnego STAT5b oraz molekularne podłoże zespołu Larona.',
    ],
    sections: [
      {
        title: 'Budowa receptora GHR i mechanizm asymetrycznej dimeryzacji',
        text: 'Receptor hormonu wzrostu (GHR) należy do rodziny receptorów cytokinowych klasy I. Jest białkiem transbłonowym o pojedynczej domenie przechodzącej przez błonę, pozbawionym własnej wewnętrznej aktywności kinazowej. Cząsteczka GH posiada dwa odrębne miejsca wiążące: Miejsce 1 (o wysokim powinowactwie) oraz Miejsce 2 (o niższym powinowactwie). Aktywacja następuje sekwencyjnie: najpierw pojedyncza cząsteczka GH wiąże się Miejscem 1 z jednym monomerem GHR, po czym rekrutuje drugi monomer GHR przez Miejsce 2, tworząc funkcjonalny homodimer (kompleks 1:2).',
      },
      {
        title: 'Transdukcja sygnału: kinaza JAK2 i fosforylacja STAT5b',
        text: 'Dimeryzacja GHR wymusza rotację domen wewnątrzkomórkowych i zbliżenie konstytutywnie związanych kinaz tyrozynowych JAK2 (Janus kinase 2). Dochodzi do ich wzajemnej transfosforylacji i aktywacji. Aktywna JAK2 fosforyluje specyficzne reszty tyrozynowe w cytoplazmatycznym ogonie GHR, które stają się miejscami dokującymi (docking sites) dla domen SH2 czynnika transkrypcyjnego STAT5b. Związany STAT5b zostaje ufosforylowany na reszcie Tyr699, odłącza się od receptora, tworzy homodimer fosfo-STAT5b i ulega translokacji do jądra komórkowego, gdzie wiąże się z sekwencjami GAS promotorów genów IGF1, IGFBP3 oraz ALS.',
      },
      {
        title: 'Oporność na GH: zespół Larona i mutacje STAT5b',
        text: 'Defekty molekularne na dowolnym etapie tego szlaku wywołują zespół niewrażliwości na hormon wzrostu (zespół Larona). Charakteryzuje się on skrajną niskorosłością (-4 do -8 SDS), hipoplazją części twarzowej czaszki, niebieskawymi twardówkami oraz paradoksalnym profilem laboratoryjnym: BARDZO WYSOKIE stężenie GH przy skrajnie niskich, niemal nieoznaczalnych stężeniach IGF-1 i IGFBP-3. Egzogenny rhGH jest w zespole Larona całkowicie nieskuteczny; jedynym skutecznym leczeniem substytucyjnym jest podawanie rekombinowanego ludzkiego IGF-1 (mecasermina).',
      },
    ],
    table: {
      headers: ['Element szlaku molekularnego', 'Rola biochemiczna', 'Defekt genetyczny', 'Obraz kliniczny'],
      rows: [
        ['Receptor GHR', 'Wiązanie liganda GH i rekrutacja JAK2', 'Delecje/mutacje GHR (zespół Larona)', 'Wysokie GH, niewykrywalny IGF-1 i GHBP'],
        ['Kinaza JAK2', 'Transfosforylacja i fosforylacja tyrozyn GHR', 'Embriotoksyczny w homozygotach', 'Letalny defekt hematopoezy i wzrostu'],
        ['Czynnik STAT5b', 'Transdukcja jądrowa i transkrypcja IGF1', 'Mutacja genu STAT5b', 'Niskorosłość z ciężkim niedoborem odporności (T-reg)'],
        ['Białko ALS (IGFALS)', 'Tworzenie kompleksu potrójnego 150 kDa', 'Mutacja inaktywująca IGFALS', 'Mierny niski wzrost, skrajnie niski IGFBP-3 i ALS'],
      ],
    },
    advanced:
      'Część zewnątrzkomórkowa receptora GHR ulega proteolitycznemu odcięciu przez metaloproteinazę TACE/ADAM17, przechodząc do krążenia jako białko wiążące hormon wzrostu (GHBP). Oznaczenie stężenia GHBP w surowicy pozwala różnicować mutacje zewnątrzkomórkowe GHR (całkowity brak GHBP w klasycznym zespole Larona) od mutacji domen wewnątrzkomórkowych lub szlaku STAT5b (prawidłowe lub podwyższone GHBP).',
    summary:
      'GH wiąże dwa monomery GHR, aktywując kinazę JAK2 i dimer STAT5b, co indukuje ekspresję IGF-1. Mutacja GHR to zespół Larona: bardzo wysokie GH, brak IGF-1, leczenie mecaserminą (rhIGF-1).',
    sourceIds: ['espe_growth', 'ghrs_consensus'],
    questions: [
      q(
        'Jaka jest stechiometria aktywacji receptora GHR przez natywną cząsteczkę hormonu wzrostu?',
        ['Jedna cząsteczka GH wiąże i dimeryzuje dwa monomery receptora GHR (kompleks 1:2)', 'Asymetryczne wiązanie Miejsca 1 i Miejsca 2 wywołuje konformacyjną rotację podjednostek.'],
        ['Dwie cząsteczki GH wiążą jeden monomer receptora (kompleks 2:1)', 'GHR jest homodimerem wiążącym pojedynczy ligand peptydowy.'],
        ['GH tworzy tetramer z czterema cząsteczkami IGF-1', 'IGF-1 działa na odrębny receptor IGF-1R o strukturze tetrameru heterologicznego.'],
        'ped-szlak-ghr-q1'
      ),
      q(
        'Który czynnik transkrypcyjny po fosforylacji przez JAK2 przemieszcza się do jądra komórkowego, aktywując gen IGF1?',
        ['STAT5b', 'Fosforylacja reszty tyrozynowej Tyr699 w STAT5b umożliwia dimeryzację przez domeny SH2.'],
        ['NF-kappa-B', 'NF-kappa-B odpowiada za procesy zapalne i immunologiczne.'],
        ['Czynnik PPAR-gamma', 'PPAR-gamma jest receptorem jądrowym dla kwasów tłuszczowych.'],
        'ped-szlak-ghr-q2'
      ),
      q(
        'Jaki profil hormonalny jest patognomoniczny dla zespołu Larona (pierwotnej niewrażliwości na GH)?',
        ['Bardzo wysokie stężenie GH przy skrajnie niskim stężeniu IGF-1 i IGFBP-3', 'Brak obwodowej odpowiedzi uniemożliwia wytworzenie IGF-1, znosząc ujemne sprzężenie zwrotne na przysadkę.'],
        ['Niewykrywalne GH przy skrajnie wysokim IGF-1', 'Taki profil przeczyłby fizjologicznej zależności kaskady somatotropowej.'],
        ['Wysokie stężenie TSH przy prawidłowym FT4', 'Dotyczy osi tarczycowej, nie niewrażliwości na hormon wzrostu.'],
        'ped-szlak-ghr-q3'
      ),
      q(
        'Który lek stanowi jedyną skuteczną terapię substytucyjną niskorosłości u dzieci z zespołem Larona?',
        ['Mecasermina (rekombinowany ludzki IGF-1 / rhIGF-1)', 'Omija zablokowany receptor GHR, bezpośrednio aktywując receptor IGF-1R na chondrocytach.'],
        ['Megadawki rekombinowanego hormonu wzrostu (rhGH)', 'rhGH jest całkowicie nieskuteczny z powodu braku funkcjonalnych receptorów GHR.'],
        ['Lewotyroksyna w wysokich dawkach', 'LT4 nie zastępuje działania IGF-1 w płytkach wzrostowych.'],
        'ped-szlak-ghr-q4'
      ),
      q(
        'Czym jest białko GHBP krążące w surowicy krwi?',
        ['Zewnątrzkomórkową domeną receptora GHR odciętą przez metaloproteinazę ADAM17', 'Jego brak we krwi dowodzi defektu zewnątrzkomórkowej części receptora GHR.'],
        ['Syntetycznym nośnikiem leków liposomalnych', 'GHBP jest fizjologicznym białkiem krążącym u człowieka.'],
        ['Podjednostką beta przysadkowego hormonu TSH', 'TSH posiada podjednostkę beta, która nie ma związku z GHBP.'],
        'ped-szlak-ghr-q5'
      ),
    ],
  },
  {
    id: 'ped-steroidogeneza-strefy-plodowej',
    title: 'Biochemia steroidogenezy strefy płodowej nadnerczy',
    subtitle: 'Enzymatyka kory płodowej (CYP17A1, SULT2A1), niedobór HSD3B2 i współpraca z łożyskiem',
    group: 'Chemia i biochemia',
    minutes: 19,
    goals: [
      'Wyjaśnisz unikalny fenotyp enzymatyczny strefy płodowej kory nadnerczy (brak HSD3B2, wysoka aktywność 17,20-liazy i sulfotransferazy SULT2A1).',
      'Opiszesz biochemiczną współpracę nadnercza płodu i łożyska w biosyntezie estriolu (E3).',
    ],
    sections: [
      {
        title: 'Morfologia i unikalny profil enzymatyczny kory płodowej nadnerczy',
        text: 'W życiu płodowym kora nadnerczy osiąga olbrzymie rozmiary (stanowiąc narząd większy od nerki płodu). Około 80–85% jej objętości stanowi unikalna strefa płodowa (fetal zone), która zanika wkrótce po urodzeniu. Komórki strefy płodowej charakteryzują się specyficznym wzorcem ekspresji enzymatycznej: posiadają bardzo wysoką aktywność cytochromu P450scc (CYP11A1) oraz CYP17A1 (zwłaszcza aktywności 17,20-liazy) i sulfotransferazy SULT2A1, przy niemal CAŁKOWITYM BRAKU dehydrogenazy 3-beta-hydroksysteroidowej typu 2 (HSD3B2).',
      },
      {
        title: 'Biosynteza DHEA-S jako głównego produktu kory płodowej',
        text: 'Z powodu braku HSD3B2 strefa płodowa nie jest w stanie przekształcić pregnenolonu w progesteron ani 17-OH-pregnenolonu w 17-OH-progesteron (nie może wytwarzać kortyzolu ani aldosteronu na tym etapie). Cały szlak steroidogenezy zostaje skierowany do syntezy dehydroepiandrosteronu (DHEA). Pod wpływem sulfotransferazy SULT2A1 dochodzi do natychmiastowej estryfikacji siarczanowej grupy 3-beta-hydroksylowej, tworząc rozpuszczalny w wodzie siarczan dehydroepiandrosteronu (DHEA-S) w gigantycznych ilościach (około 100–200 mg na dobę).',
      },
      {
        title: 'Jednostka płodowo-łożyskowa i synteza estriolu (E3)',
        text: 'Łożysko ludzkie jest „niekompletnym” narządem steroidogennym: posiada enzymy HSD3B1 i aromatazę (CYP19A1), ale nie ma enzymu CYP17A1 (nie potrafi samo syntetyzować androgenów z cholesterolu). Płód i łożysko tworzą obligatoryjną jednostkę metaboliczną: 1) Nadnercze płodu produkuje DHEA-S; 2) W wątrobie płodu DHEA-S ulega 16-alfa-hydroksylacji przez enzym CYP3A7, tworząc 16α-OH-DHEA-S; 3) Związek ten trafia do łożyska, gdzie sulfataza łożyskowa (STS) odszczepia resztę siarczanową, a aromataza przekształca go w estriol (E3), który przechodzi do krążenia matki.',
      },
    ],
    table: {
      headers: ['Narząd w jednostce', 'Kluczowe enzymy aktywne', 'Enzymy nieobecne / zablokowane', 'Główny produkt opuszczający narząd'],
      rows: [
        ['Nadnercza płodu (strefa płodowa)', 'CYP11A1, CYP17A1 (liaza), SULT2A1', 'HSD3B2 (brak 3β-HSD)', 'DHEA-S (siarczan dehydroepiandrosteronu)'],
        ['Wątroba płodu', 'CYP3A7 (16α-hydroksylaza)', 'Brak enzymów aromatyzujących', '16α-OH-DHEA-S'],
        ['Łożysko', 'Sulfataza steroidowa (STS), HSD3B1, CYP19A1 (aromataza)', 'CYP17A1 (brak 17α-hydroksylazy i liazy)', 'Estriol (E3) oraz progesteron'],
      ],
    },
    advanced:
      'Wrodzony niedobór sulfatazy łożyskowej (X-linked placental sulfatase deficiency) wynika z mutacji genu STS na chromosomie X. W łożysku nie może dojść do hydrolizy estrów siarczanowych 16α-OH-DHEA-S, co skutkuje niemal całkowitym brakiem syntezy estriolu w moczu i surowicy ciężarnej przy prawidłowym dobrostanie płodu. U noworodka płci męskiej defekt ten manifestuje się po urodzeniu rybią łuską sprzężoną z chromosomem X (X-linked ichthyosis) oraz osłabieniem czynności skurczowej macicy podczas porodu.',
    summary:
      'Strefa płodowa nadnerczy ma enzymy CYP17A1 i SULT2A1, lecz nie ma HSD3B2 – produkuje masywne ilości DHEA-S. Po hydroksylacji w wątrobie płodu łożyskowa sulfataza i aromataza tworzą estriol (E3).',
    sourceIds: ['cah_pediatric'],
    questions: [
      q(
        'Brak którego enzymu w strefie płodowej kory nadnerczy uniemożliwia bezpośrednią syntezę kortyzolu i kieruje szlak do DHEA-S?',
        ['Dehydrogenazy 3-beta-hydroksysteroidowej typu 2 (HSD3B2)', 'Brak HSD3B2 uniemożliwia przejście steroidów delta-5 w steroidy delta-4.'],
        ['Aromatazy (CYP19A1)', 'Aromataza przekształca androgeny w estrogeny, nie uczestniczy w syntezie kortyzolu.'],
        ['21-hydroksylazy (CYP21A2)', '21-hydroksylaza jest obecna w warstwie ostatecznej, ale blokada leży wyżej na etapie HSD3B2.'],
        'ped-steroidogeneza-q1'
      ),
      q(
        'Dlaczego łożysko ludzkie jest niezdolne do samodzielnej biosyntezy estrogenów de novo z cholesterolu?',
        ['Nie posiada enzymu CYP17A1 (17-alfa-hydroksylazy / 17,20-liazy)', 'Łożysko jest bezwzględnie uzależnione od dostaw prekursorów androgenowych z nadnerczy płodu i matki.'],
        ['Nie potrafi transportować cholesterolu przez błonę komórkową', 'Łożysko bez problemu pobiera cholesterol z lipoprotein matczynych (LDL).'],
        ['Brak w nim enzymu aromatazy', 'Aromataza jest w łożysku wysoce aktywna.'],
        'ped-steroidogeneza-q2'
      ),
      q(
        'Który narząd płodu przeprowadza kluczową 16-alfa-hydroksylację DHEA-S niezbędną do powstania estriolu (E3)?',
        ['Wątroba płodu (poprzez enzym CYP3A7)', 'Powstały 16α-OH-DHEA-S jest bezpośrednim prekursorem estriolu dla aromatazy łożyskowej.'],
        ['Mózg płodu', 'Układ nerwowy nie przeprowadza 16α-hydroksylacji steroidów nadnerczowych.'],
        ['Nerki płodu', 'Nerki płodu odpowiadają za wydalanie metabolitów, nie syntezę prekursora E3.'],
        'ped-steroidogeneza-q3'
      ),
      q(
        'Jaki objaw skórny rozwija się u chłopca po urodzeniu w przypadku wrodzonego niedoboru łożyskowej sulfatazy steroidowej (STS)?',
        ['Rybia łuska sprzężona z chromosomem X (X-linked ichthyosis)', 'Mutacja STS zaburza degradację siarczanu cholesterolu w naskórku, prowadząc do nadmiernego rogowacenia.'],
        ['Wrodzona pęcherzyca', 'Pęcherzyca ma podłoże autoimmunologiczne, nie enzymatyczne.'],
        ['Bielactwo nabyte', 'Bielactwo wynika z autoimmunologicznego niszczenia melanocytów.'],
        'ped-steroidogeneza-q4'
      ),
      q(
        'Jaka jest fizjologiczna rola estryfikacji siarczanowej DHEA przez enzym SULT2A1 w nadnerczu płodu?',
        ['Zwiększa rozpuszczalność związku w wodzie i inaktywuje silne działanie androgenne, chroniąc płód żeński przed wirylizacją', 'DHEA-S nie wykazuje powinowactwa do receptora androgenowego AR dopóki nie zostanie odsiarczanowany w łożysku.'],
        ['Przyspiesza degradację DHEA w moczu płodu', 'DHEA-S trafia do krążenia wrotnego łożyska, a nie do degradacji nerkowej.'],
        ['Stymuluje wydzielanie insuliny przez komórki beta', 'DHEA-S nie jest sekretagogiem insulinowym.'],
        'ped-steroidogeneza-q5'
      ),
    ],
  },
];
