import { q, type DraftLesson } from './course-types.ts';

export const draftPregnancyPart1: DraftLesson[] = [
  {
    id: 'ciaza-tarczyca-fizjologia-zakresy',
    title: 'Fizjologia tarczycy i zakresy referencyjne w ciąży',
    subtitle: 'Wzrost stężenia TBG, tyreotropowa mimikra hCG i trymestralne normy TSH/FT4',
    group: 'Tarczyca w ciąży',
    minutes: 17,
    goals: [
      'Wyjaśnisz dwa kluczowe zjawiska fizjologiczne: wzrost stężenia TBG pod wpływem estrogenów oraz agonizm hCG na receptor TSHR w I trymestrze.',
      'Zinterpretujesz trymestralne zakresy referencyjne TSH oraz ograniczenia immunotestów frakcji wolnej FT4.',
    ],
    sections: [
      {
        title: 'Wzrost stężenia TBG i zapotrzebowania na tyroksynę',
        text: 'Wysokie stężenia estrogenów łożyskowych pobudzają wątrobową syntezę globuliny wiążącej tyroksynę (TBG) oraz zwiększają jej sjaloizację, co dwukrotnie wydłuża jej okres półtrwania. Pula TBG w osoczu rośnie ponad 2-krotnie do około 20. tygodnia ciąży. Aby wysycić zwiększoną pojemność białkową i utrzymać stałą pulę wolnych hormonów, zdrowa tarczyca ciężarnej musi zwiększyć całkowitą produkcję tyroksyny o 30–50%. U kobiet z utajonym autoimmunologicznym zapaleniem tarczycy rezerwa ta jest niewystarczająca, co prowadzi do dekompensacji do jawnej niedoczynności.',
      },
      {
        title: 'Tyreotropowe działanie gonadotropiny kosmówkowej (hCG)',
        text: 'Ludzka gonadotropina kosmówkowa (hCG) wykazuje wysoką homologię strukturalną z TSH (identyczna podjednostka alfa oraz częściowa homologia podjednostki beta). W stężeniach szczytowych (8.–11. tydzień ciąży, sięgających 50 000–100 000 IU/l) hCG bezpośrednio stymuluje receptor TSH (TSHR) na komórkach pęcherzykowych tarczycy. Wywołuje to fizjologiczny wzrost stężenia wolnych hormonów i w mechanizmie ujemnego sprzężenia zwrotnego przejściowe obniżenie stężenia TSH w I trymestrze (często <0,1–0,2 mIU/l u 15–20% zdrowych ciężarnych).',
      },
      {
        title: 'Trymestralne zakresy referencyjne wg wytycznych ATA 2017',
        text: 'Zgodnie z wytycznymi ATA 2017 nie należy stosować uniwersalnej „sztywnej” górnej granicy TSH 2,5 mIU/l dla wszystkich populacji. Standardem jest stosowanie specyficznych trymestralnych zakresów referencyjnych wyznaczonych dla danego laboratorium i populacji. W przypadku braku lokalnych norm ATA zaleca przyjęcie górnej granicy TSH: I trymestr ~4,0 mIU/l (lub obniżenie o 0,5 mIU/l względem normy przedciążowej), II i III trymestr ~4,0 mIU/l. Oznaczenia wolnego FT4 standardowymi testami immunoenzymatycznymi w III trymestrze wykazują fałszywe zaniżenie z powodu spadku albumin i wysokiego stężenia kwasów tłuszczowych.',
      },
    ],
    table: {
      headers: ['Etap ciąży', 'Stężenie hCG', 'Stężenie TBG', 'Fizjologiczny trend TSH', 'Fizjologiczny trend FT4'],
      rows: [
        ['Przed ciążą', 'Niewykrywalne (<5 IU/l)', 'Prawidłowe (15–30 mg/l)', 'Norma populacyjna (0,4–4,0 mIU/l)', 'Prawidłowe (12–22 pmol/l)'],
        ['I trymestr (szczyt hCG)', 'Szczyt 50 000–100 000 IU/l', 'Gwałtowny wzrost', 'Fizjologiczny spadek (często <0,2 mIU/l)', 'Przejściowy wzrost o 10–15%'],
        ['II trymestr', 'Spadek do plateau (~20 000)', 'Maksymalne wysokie (plateau)', 'Powrót do wartości ~0,4–4,0 mIU/l', 'Stabilizacja / powolny spadek'],
        ['III trymestr', 'Stabilne niskie łożyskowe', 'Nadal wysokie', 'Zgodne z normą dla dorosłych', 'Pozorny spadek w testach immunochemicznych'],
      ],
    },
    advanced:
      'Łożysko syntetyzuje dejodynazę typu 3 (DIO3) w bardzo dużych ilościach. DIO3 jest enzymem inaktywującym: przekształca T4 w nieaktywny rT3 oraz T3 w T2. Aktywność dejodynazy łożyskowej stanowi potężny obwodowy klirens matczynych hormonów tarczycy, chroniąc płód przed tyreotoksykozą, lecz jednocześnie drastycznie zwiększa zapotrzebowanie matki na jod i tyroksynę.',
    summary:
      'Wzrost TBG podwaja pulę T4, a szczyt hCG w I trymestrze bezpośrednio stymuluje TSHR, fizjologicznie obniżając TSH. Zapotrzebowanie na hormony wzrasta o 30–50% pod wpływem łożyskowej DIO3.',
    sourceIds: ['ata_pregnancy_2017', 'eta_pregnancy_hypo'],
    questions: [
      q(
        'Dlaczego u 15–20% zdrowych kobiet w 8.–11. tygodniu ciąży stężenie TSH spada poniżej dolnej granicy normy (<0,1–0,2 mIU/l)?',
        ['Wysokie stężenie hCG wykazuje mimikrę strukturalną z TSH i bezpośrednio stymuluje receptor TSHR', 'Wzrost wolnych hormonów tłumi przysadkowe wydzielanie TSH w ujemnym sprzężeniu zwrotnym.'],
        ['W I trymestrze przysadka ulega przejściowemu zanikowi naczyniowemu', 'Przysadka w ciąży fizjologicznie powiększa się o 30–50% z powodu hiperplazji komórek laktotropowych.'],
        ['Płód zużywa całe TSH matki do budowy mózgowia', 'TSH matki nie przenika przez barierę łożyskową.'],
        'ciaza-fizjo-q1'
      ),
      q(
        'O ile procent wzrasta zapotrzebowanie na tyroksynę u ciężarnej ze sprawną tarczycą w I połowie ciąży?',
        ['O około 30–50%', 'Wynika to z podwojenia stężenia TBG, zwiększonego rzutu serca i rozkładu hormonów przez DIO3 łożyska.'],
        ['Zapotrzebowanie spada o połowę', 'Zapotrzebowanie nigdy nie spada; brak wzrostu syntezy prowadzi do hipotyreozy.'],
        ['O ponad 500%', 'Wzrost 5-krotny jest niefizjologiczny i nie występuje u ludzi.'],
        'ciaza-fizjo-q2'
      ),
      q(
        'Który enzym łożyskowy odpowiada za inaktywację tyroksyny do rT3 w jednostce matczyno-płodowej?',
        ['Dejodynaza typu 3 (DIO3)', 'Chroni płód przed nadmiarem hormonów tarczycowych i przyspiesza obrót tyroksyny u matki.'],
        ['Tyreoperoksydaza (TPO)', 'TPO znajduje się w tarczycy, a nie w syncytiotrofoblaście łożyska.'],
        ['Aromataza (CYP19A1)', 'Aromataza odpowiada za syntezę estrogenów, nie dejodynację hormonów tarczycy.'],
        'ciaza-fizjo-q3'
      ),
      q(
        'Jaka jest górna granica normy TSH w I trymestrze ciąży wg wytycznych ATA 2017 w przypadku braku lokalnych norm populacyjnych?',
        ['Około 4,0 mIU/l (lub obniżenie o 0,5 mIU/l względem normy przedciążowej)', 'ATA odeszła od sztywnego progu 2,5 mIU/l, który prowadził do nadmiernego rozpoznawania hipotyreozy.'],
        ['10,0 mIU/l', 'TSH 10 mIU/l to bezwzględna jawna niedoczynność wymagająca natychmiastowego leczenia.'],
        ['1,0 mIU/l', 'Tak niski próg fałszywie diagnozowałby ponad połowę zdrowych ciężarnych.'],
        'ciaza-fizjo-q4'
      ),
      q(
        'Dlaczego oznaczenia FT4 w III trymestrze ciąży standardowymi testami immunologicznymi bywają zaniżone?',
        ['Spadek stężenia albumin i wysokie stężenia wolnych kwasów tłuszczowych interferują z przeciwciałami testu', 'Pomiary bezpośrednią dializą równowagową pokazują prawidłowe stężenia, eliminując artefakt immunochemiczny.'],
        ['Tyroksyna w III trymestrze traci atomy jodu w krążeniu', 'Cząsteczka T4 ma niezmienną strukturę chemiczną.'],
        ['TBG przestaje wiązać hormony pod koniec ciąży', 'Pojemność wiążąca TBG utrzymuje się na wysokim poziomie do samego porodu.'],
        'ciaza-fizjo-q5'
      ),
    ],
  },
  {
    id: 'ciaza-niedoczynnosc-i-subkliniczna',
    title: 'Niedoczynność tarczycy w ciąży',
    subtitle: 'Wpływ na rozwój neuropsychologiczny płodu, rola anty-TPO i zasady dawkowania LT4',
    group: 'Tarczyca w ciąży',
    minutes: 18,
    goals: [
      'Wdrożysz leczenie jawnej i subklinicznej niedoczynności tarczycy wg algorytmu ATA 2017 z uwzględnieniem miana anty-TPO.',
      'Dostosujesz dawkę lewotyroksyny u pacjentki z wcześniej rozpoznaną niedoczynnością natychmiast po potwierdzeniu ciąży (+20–30%).',
    ],
    sections: [
      {
        title: 'Krytyczne znaczenie tyroksyny dla neurogenezy płodu',
        text: 'W I połowie ciąży (do około 16.–18.–20. tygodnia) tarczyca płodu nie syntetyzuje jeszcze wystarczających ilości hormonów. Płód jest całkowicie uzależniony od przezłożyskowego transferu wolnej tyroksyny (FT4) matki. Hormony tarczycy sterują migracją neuronów w korze mózgowej, tworzeniem synaps oraz wczesną mielinizacją. Niewyrównana jawna niedoczynność tarczycy u matki wiąże się ze statystycznym obniżeniem ilorazu inteligencji (IQ) dziecka, a także poronieniem, odklejeniem łożyska, stanem przedrzucawkowym i porodem przedwczesnym.',
      },
      {
        title: 'Algorytm decyzyjny ATA 2017 w subklinicznej niedoczynności (SCH)',
        text: 'Wskazania do wdrożenia lewotyroksyny w ciąży zależą od stężenia TSH oraz obecności przeciwciał przeciw tyreoperoksydazie (anty-TPO): 1) TSH powyżej górnej granicy normy (lub >4,0 mIU/l) z obniżonym FT4 (jawna niedoczynność) – bezwzględne wskazanie do leczenia u każdej kobiety; 2) TSH > górna granica normy (np. >4,0 mIU/l) z prawidłowym FT4 i DODATNIMI anty-TPO – silne zalecenie leczenia LT4; 3) TSH > 10,0 mIU/l (nawet przy prawidłowym FT4 i ujemnych anty-TPO) – bezwzględne wskazanie do leczenia; 4) TSH pomiędzy 2,5 mIU/l a górną granicą normy przy DODATNICH anty-TPO – rozważenie leczenia (słaba rekomendacja); 5) TSH pomiędzy 2,5 a 4,0 mIU/l przy UJEMNYCH anty-TPO – leczenie NIE JEST zalecane.',
      },
      {
        title: 'Praktyczne zasady dostosowania dawki LT4 w ciąży',
        text: 'Kobieta leczona z powodu niedoczynności tarczycy przed ciążą musi zostać poinstruowana, aby natychmiast po uzyskaniu dodatniego testu ciążowego (lub pominięciu miesiączki) samodzielnie zwiększyła dawkę przyjmowanej lewotyroksyny o 20–30% (najprostszy schemat to przyjmowanie 2 dodatkowych tabletek tygodniowo, np. po 1 dodatkowej tabletce w weekend). Kontrolę TSH i FT4 należy zaplanować co 4 tygodnie w I połowie ciąży oraz co najmniej raz między 26. a 32. tygodniem ciąży, dążąc do utrzymania TSH w dolnej połowie normy referencyjnej.',
      },
    ],
    table: {
      headers: ['Stężenie TSH w ciąży', 'Status przeciwciał anty-TPO', 'Kwalifikacja kliniczna', 'Zalecenie ATA 2017'],
      rows: [
        ['TSH > górna norma + FT4 ↓', 'Dodatnie lub ujemne', 'Jawna niedoczynność tarczycy', 'Zdecydowanie zalecane leczenie LT4 (silna rekomendacja)'],
        ['TSH > górna norma + FT4 w normie', 'DODATNIE anty-TPO', 'Subkliniczna niedoczynność z autoimmunizacją', 'Zdecydowanie zalecane leczenie LT4 (silna rekomendacja)'],
        ['TSH > 10,0 mIU/l + FT4 w normie', 'UJEMNE anty-TPO', 'Ciężka subkliniczna niedoczynność', 'Zalecane leczenie LT4 (silna rekomendacja)'],
        ['TSH > górna norma + FT4 w normie', 'UJEMNE anty-TPO', 'Subkliniczna niedoczynność bez autoimmunizacji', 'Można rozważyć leczenie LT4 (słaba rekomendacja)'],
        ['TSH 2,5 – górna norma', 'DODATNIE anty-TPO', 'Eutyreoza z wysokim TSH i autoimmunizacją', 'Można rozważyć leczenie LT4 (słaba rekomendacja)'],
        ['TSH 2,5 – górna norma', 'UJEMNE anty-TPO', 'Fizjologiczny wariant normy', 'Leczenie LT4 NIE JEST zalecane'],
      ],
    },
    advanced:
      'Zapotrzebowanie na jod w ciąży wzrasta z 150 µg/dobę do 250 µg/dobę z powodu 50% wzrostu przesączania kłębuszkowego (wzmożony nerkowy klirens jodu) oraz transferu jodu do płodu. Polskie Towarzystwo Endokrynologiczne oraz WHO zalecają rutynową suplementację 150–200 µg jodu na dobę u wszystkich kobiet ciężarnych i karmiących piersią na terenach o umiarkowanym spożyciu jodu.',
    summary:
      'Jawna niedoczynność i TSH >4 z anty-TPO(+) wymagają natychmiastowej LT4 dla ochrony mózgu płodu. Kobieta na LT4 musi zwiększyć dawkę o 20–30% od razu po potwierdzeniu ciąży!',
    sourceIds: ['ata_pregnancy_2017', 'eta_pregnancy_hypo'],
    questions: [
      q(
        'O ile procent pacjentka ze zdiagnozowaną wcześniej niedoczynnością tarczycy powinna zwiększyć dawkę LT4 po stwierdzeniu ciąży?',
        ['O 20–30% (np. o 2 dodatkowe tabletki w tygodniu)', 'Zapewnia to natychmiastowe pokrycie zapotrzebowania na tyroksynę w kluczowym oknie neurogenezy.'],
        ['O 100% (podwoić dawkę)', 'Podwojenie dawki grozi jatrogenną tyreotoksykozą i zaburzeniami rytmu serca matki.'],
        ['Nie powinna zmieniać dawki aż do porodu', 'Brak modyfikacji prowadzi do dekompensacji i niedoczynności u płodu w I trymestrze.'],
        'ciaza-niedoczynnosc-q1'
      ),
      q(
        'Który stan biochemiczny w ciąży jest bezwzględnym wskazaniem do leczenia LT4 niezależnie od miana anty-TPO?',
        ['Jawna niedoczynność (TSH podwyższone z obniżonym FT4) lub TSH > 10 mIU/l', 'Wytyczne ATA i ETA jednomyślnie nakazują leczenie w celu ochrony rozwoju umysłowego płodu.'],
        ['Izolowane TSH 2,8 mIU/l przy ujemnych przeciwciałach anty-TPO', 'Wartość ta nie wymaga leczenia farmakologicznego.'],
        ['Fizjologiczny spadek TSH do 0,15 mIU/l w 9. tygodniu ciąży', 'Jest to efekt działania hCG, a nie niedoczynności tarczycy.'],
        'ciaza-niedoczynnosc-q2'
      ),
      q(
        'Jak często należy kontrolować stężenie TSH w I połowie ciąży u kobiety przyjmującej lewotyroksynę?',
        ['Co 4 tygodnie aż do połowy ciąży', 'Pozwala to na bieżąco korygować dawkowanie w miarę narastania stężenia TBG i masy łożyska.'],
        ['Raz na rok', 'Tak długa przerwa uniemożliwia bezpieczne prowadzenie ciąży.'],
        ['Codziennie z krwi włośniczkowej', 'TSH ma okres półtrwania rzędu 7 dni i nie zmienia się z dnia na dzień.'],
        'ciaza-niedoczynnosc-q3'
      ),
      q(
        'Dlaczego obecność przeciwciał anty-TPO u ciężarnej z subkliniczną niedoczynnością skłania do wdrożenia leczenia LT4?',
        ['Świadczy o autoimmunizacji i obniżonej rezerwie tarczycowej, grożąc postępującą hipotyreozą w trakcie ciąży', 'Ponadto obecność anty-TPO wiąże się ze statystycznie wyższym ryzykiem poronienia i porodu przedwczesnego.'],
        ['Przeciwciała anty-TPO bezpośrednio uszkadzają łożysko', 'Anty-TPO nie wykazują cytotoksyczności wobec syncytiotrofoblastu.'],
        ['Ponieważ anty-TPO wiążą lewotyroksynę w przewodzie pokarmowym', 'Przeciwciała krążą w osoczu i nie wpływają na wchłanianie leku w jelicie.'],
        'ciaza-niedoczynnosc-q4'
      ),
      q(
        'Jakie jest zalecane dobowe spożycie jodu u kobiet w ciąży wg zaleceń WHO i PTE?',
        ['250 µg/dobę (poprzez dietę i suplementację 150–200 µg)', 'Wzrost filtracji kłębuszkowej i transfer do płodu drastycznie zwiększają dobowe zapotrzebowanie.'],
        ['50 µg/dobę', 'Taka podaż wywołałaby wole endemiczne i niedobór jodu u płodu.'],
        ['5000 µg/dobę', 'Dawki miligramowe jodu wywołują efekt Wolffa-Chaikoffa i blokadę tarczycy noworodka.'],
        'ciaza-niedoczynnosc-q5'
      ),
    ],
  },
  {
    id: 'ciaza-tyreotoksykoza-graves-ptu',
    title: 'Tyreotoksykoza w ciąży: Graves vs GTT',
    subtitle: 'Przemijająca tyreotoksykoza ciążowa, miana TRAb, embriopatia tiamazolu i wybór PTU',
    group: 'Tarczyca w ciąży',
    minutes: 19,
    goals: [
      'Rozróżnisz przemijającą tyreotoksykozę ciążową (GTT) od choroby Gravesa-Basedowa w I trymestrze na podstawie miana TRAb i objawów.',
      'Zastosujesz zasady bezpiecznej farmakoterapii: propylotiouracyl (PTU) w I trymestrze vs tiamazol (MMI) w II i III trymestrze.',
    ],
    sections: [
      {
        title: 'Różnicowanie: Gestational Transient Thyrotoxicosis (GTT) vs choroba Gravesa',
        text: 'Niskie TSH i podwyższone wolne hormony w I trymestrze mogą wynikać z dwóch diametralnie różnych mechanizmów. Przemijająca tyreotoksykoza ciążowa (GTT) występuje u 2–3% ciężarnych, często w przebiegu niepowściągliwych wymiotów ciężarnych (hyperemesis gravidarum) lub ciąży wielopłodowej z ekstremalnymi stężeniami hCG. GTT nie ma podłoża autoimmunologicznego: przeciwciała TRAb są UJEMNE, wole i orbitopatia nie występują, a zaburzenie ustępuje samoistnie po 14.–18. tygodniu wraz ze spadkiem hCG (nie wymaga tyreostatyków!). Choroba Gravesa-Basedowa cechuje się DODATNIMI przeciwciałami TRAb, obecnością wola naczyniowego i wymaga leczenia przeciwtarczycowego.',
      },
      {
        title: 'Embriopatia tiamazolowa a hepatotoksyczność PTU – dylemat I trymestru',
        text: 'Leki przeciwtarczycowe łatwo przechodzą przez łożysko. Tiamazol (metimazol, MMI) podawany w okresie organogenezy (6.–10. tydzień ciąży) wiąże się z ryzykiem specyficznej embriopatii tiamazolowej (aplasia cutis congenita – wrodzony ubytek skóry głowy, atrezja nozdrzy tylnych, atrezja przełyku, dysmorfia twarzy). Propylotiouracyl (PTU) wykazuje znacznie niższe ryzyko teratogenności, lecz niesie rzadkie ryzyko ostrej, piorunującej martwicy wątroby u matki. Dlatego wytyczne ATA 2017 rekomendują: W I trymestrze (do 16. tyg.) lekiem z wyboru jest PTU; na początku II trymestru (około 16. tyg.) należy dokonać zamiany (switch) na tiamazol w celu ochrony wątroby matki.',
      },
      {
        title: 'Cel leczenia tyreostatykiem i monitorowanie TRAb',
        text: 'Celem terapii tyreostatycznej w ciąży NIE JEST całkowita normalizacja TSH, lecz utrzymywanie stężenia wolnego FT4 w GÓRNEJ GRANICY lub nieco powyżej normy przy zastosowaniu NAJMNIEJSZEJ skutecznej dawki leku (tzw. block-and-treat z lewotyroksyną jest w ciąży BEZWZGLĘDNIE ZAKAZANY, gdyż tyroksyna słabo przechodzi przez łożysko, a tyreostatyk łatwo przenika, wywołując ciężkie wole i niedoczynność u płodu!). Przeciwciała TRAb (stymulujące IgG) przenikają przez łożysko po 20. tygodniu; miano TRAb przekraczające 3-krotność normy w II/III trymestrze wymaga monitorowania USG płodu w kierunku tachykardii, wola i zaawansowania wieku kostnego.',
      },
    ],
    table: {
      headers: ['Cecha różnicująca', 'Przemijająca tyreotoksykoza (GTT)', 'Choroba Gravesa-Basedowa'],
      rows: [
        ['Mechanizm', 'Stymulacja TSHR przez wysokie hCG', 'Pobudzające przeciwciała anty-TSHR (TRAb)'],
        ['Przeciwciała TRAb', 'Zawsze UJEMNE', 'DODATNIE u >95% pacjentek'],
        ['Objawy towarzyszące', 'Niepowściągliwe wymioty (hyperemesis)', 'Orbitopatia, drżenie rąk, wole naczyniowe'],
        ['Przebieg naturalny', 'Samoistne ustąpienie po 14.–18. tyg.', 'Utrzymuje się, zaostrzenie w I trymestrze i po porodzie'],
        ['Leczenie przyczynowe', 'Objawowe (nawadnianie), brak tyreostatyków', 'Tyreostatyk: PTU w I trymestrze, MMI w II/III trymestrze'],
      ],
    },
    advanced:
      'W przypadku konieczności wykonania radykalnego leczenia nadczynności tarczycy w ciąży (np. ciężka nietolerancja tyreostatyków, agranulocytoza, brak kontroli w dawkach toksycznych) jedyną dopuszczalną metodą jest tyreoidektomia subtotalna/totalna przeprowadzona w II trymestrze ciąży (najbezpieczniejszy okres pod kątem teratogenności i ryzyka poronienia/porodu przedwczesnego). Terapia radiojodem (131-I) jest w ciąży BEZWZGLĘDNIE PRZECIWWSKAZANA (niszczy tarczycę płodu).',
    summary:
      'GTT to efekt hCG bez TRAb – ustępuje samoistnie, nie podawaj tyreostatyków! W chorobie Gravesa (TRAb+): w I trymestrze stosuj PTU (mniej wad), w II trymestrze zmień na tiamazol (mniej hepatotoksyczności).',
    sourceIds: ['ata_pregnancy_2017'],
    questions: [
      q(
        'Który lek przeciwtarczycowy jest lekiem z wyboru w I trymestrze ciąży w chorobie Gravesa-Basedowa?',
        ['Propylotiouracyl (PTU)', 'PTU wiąże się ze znacznie niższym ryzykiem ciężkich wad wrodzonych (aplasia cutis, atrezja nozdrzy) niż tiamazol.'],
        ['Tiamazol (metimazol) w wysokiej dawce', 'Tiamazol w I trymestrze wiąże się z ryzykiem specyficznej embriopatii tiamazolowej.'],
        ['Radiojod 131-I', 'Radiojod jest bezwzględnie zakazany w ciąży z uwagi na destrukcję tarczycy płodu.'],
        'ciaza-graves-q1'
      ),
      q(
        'Dlaczego na początku II trymestru ciąży zaleca się zamianę propylotiouracylu (PTU) na tiamazol?',
        ['Aby uniknąć rzadkiej, lecz piorunującej martwicy wątroby u ciężarnej wywoływanej przez PTU', 'Okres organogenezy minął, więc ryzyko embriopatii tiamazolowej drastycznie spada.'],
        ['Ponieważ PTU w II trymestrze przestaje hamować syntezę hormonów', 'PTU działa skutecznie przez całą ciążę, ale jego profil bezpieczeństwa wątrobowego jest gorszy.'],
        ['Tiamazol powoduje szybszy poród', 'Tiamazol nie wpływa na indukcję akcji skurczowej.'],
        'ciaza-graves-q2'
      ),
      q(
        'Jaki jest docelowy poziom stężenia hormonów tarczycy podczas leczenia tyreostatykiem w ciąży?',
        ['Utrzymywanie wolnego FT4 w górnej granicy normy lub nieznacznie powyżej przy najniższej dawce leku', 'Chroni to tarczycę płodu przed jatrogenną niedoczynnością i wolem.'],
        ['Całkowita normalizacja TSH do wartości 1,0–1,5 mIU/l', 'Dążenie do normalizacji TSH w ciąży wymagałoby zbyt dużych dawek tyreostatyku blokujących płód.'],
        ['Wyciszenie FT4 poniżej dolnej granicy normy', 'Prowadziłoby do głębokiej niedoczynności u płodu i uszkodzenia OUN.'],
        'ciaza-graves-q3'
      ),
      q(
        'Dlaczego w ciąży bezwzględnie zakazany jest schemat leczenia „block-and-treat” (tyreostatyk + lewotyroksyna)?',
        ['Tyreostatyk łatwo przenika do płodu, a tyroksyna słabo – schemat ten wywołuje ciężkie wole i hipotyreozę płodu', 'Wymagałby wysokich dawek leku przeciwtarczycowego, które uszkadzają gruczoł płodowy.'],
        ['Lewotyroksyna natychmiast neutralizuje działanie tyreostatyku w żołądku', 'Leki wchłaniają się niezależnie; problemem jest asymetria transferu łożyskowego.'],
        ['Wywołuje u matki ciężką kamicę pęcherzyka żółciowego', 'Nie ma to związku z patogenezą kamicy żółciowej.'],
        'ciaza-graves-q4'
      ),
      q(
        'Jak odróżnić przemijającą tyreotoksykozę ciążową (GTT) od choroby Gravesa-Basedowa w 10. tygodniu ciąży?',
        ['W GTT przeciwciała TRAb są ujemne, brak cech orbitopatii, a objawy korelują z wymiotami (hyperemesis)', 'Obecność dodatnich TRAb jednoznacznie wskazuje na podłoże autoimmunologiczne (Graves).'],
        ['W GTT stężenie TSH jest zawsze podwyższone', 'W GTT stężenie TSH jest obniżone z powodu stymulacji receptorów przez hCG.'],
        ['Wyłącznie przez wykonanie scyntygrafii radioizotopowej', 'Scyntygrafia z użyciem izotopów jest bezwzględnie przeciwwskazana w ciąży.'],
        'ciaza-graves-q5'
      ),
    ],
  },
  {
    id: 'ciaza-poporodowe-zapalenie-tarczycy',
    title: 'Poporodowe zapalenie tarczycy (PPT)',
    subtitle: 'Autoimmunizacja poporodowa, przebieg trójfazowy i różnicowanie z nawrotem Gravesa',
    group: 'Tarczyca w ciąży',
    minutes: 17,
    goals: [
      'Zrozumiesz trójfazowy przebieg poporodowego zapalenia tarczycy (tyreotoksykoza destrukcyjna → niedoczynność → eutyreoza/trwałość).',
      'Odróżnisz fazę nadczynności w PPT od nawrotu choroby Gravesa-Basedowa w okresie laktacji.',
    ],
    sections: [
      {
        title: 'Zjawisko „rebound” układu odpornościowego po porodzie',
        text: 'W trakcie ciąży układ odpornościowy matki podlega fizjologicznej tolerancji immunologicznej (przesunięcie równowagi Th1 w stronę Th2), co chroni allogeniczny płód przed odrzuceniem. Po porodzie, w wyniku nagłego ustąpienia supresji łożyskowej, dochodzi do zjawiska odbicia immunologicznego (postpartum immune rebound). U kobiet z utajonymi przeciwciałami anty-TPO lub anty-TG rozwija się poporodowe zapalenie tarczycy (postpartum thyroiditis, PPT), dotykające 5–10% położnic w ciągu pierwszych 12 miesięcy po porodzie.',
      },
      {
        title: 'Trójfazowy przebieg kliniczny PPT',
        text: 'Klasyczny przebieg PPT składa się z trzech kolejnych faz: 1) Faza tyreotoksykozy (1.–4. miesiąc po porodzie) – destrukcja pęcherzyków tarczycy przez nacieki limfocytarne powoduje gwałtowne uwolnienie zmagazynowanych zapasów hormonów do krążenia; 2) Faza niedoczynności (4.–8. miesiąc po porodzie) – wyczerpanie zapasów koloidu przy uszkodzonym nabłonku skutkuje hipotyreozą (zmęczenie, depresja poporodowa, przybór masy ciała, zaburzenia laktacji); 3) Faza powrotu do eutyreozy (po 12 miesiącach u około 70–80% kobiet; u pozostałych 20–30% niedoczynność przechodzi w postać trwałą).',
      },
      {
        title: 'Różnicowanie z chorobą Gravesa i postępowanie terapeutyczne',
        text: 'Odróżnienie fazy tyreotoksykozy w PPT od poporodowego nawrotu choroby Gravesa-Basedowa ma fundamentalne znaczenie. W PPT przeciwciała TRAb są UJEMNE (obecne wysokie miana anty-TPO), a tyreotoksykoza wynika z destrukcji, a nie nadprodukcji. Dlatego w PPT LEKI PRZECIWTARCZYCOWE SĄ CAŁKOWICIE NIESKUTECZNE I PRZECIWWSKAZANE! W fazie tyreotoksykozy PPT stosuje się wyłącznie leczenie objawowe kardioselektywnym beta-blokerem (propranolol w najniższej dawce kompatybilnej z karmieniem piersią). W fazie niedoczynności wdraża się lewotyroksynę, z próbą odstawienia po 6–12 miesiącach w celu weryfikacji powrotu własnej czynności.',
      },
    ],
    table: {
      headers: ['Faza PPT', 'Czas wystąpienia', 'Objawy kliniczne', 'Profil biochemiczny', 'Postępowanie'],
      rows: [
        ['Faza 1: Tyreotoksykoza destrukcyjna', '1.–4. miesiąc po porodzie', 'Drażliwość, tachykardia, spadek wagi', 'TSH ↓, FT4 ↑, TRAb(-), anty-TPO(+)', 'Beta-bloker (propranolol); NIE tyreostatyki!'],
        ['Faza 2: Niedoczynność tarczycy', '4.–8. miesiąc po porodzie', 'Zmęczenie, przygnębienie, sucha skóra', 'TSH ↑, FT4 ↓ lub w normie', 'Lewotyroksyna (LT4) w dawce substytucyjnej'],
        ['Faza 3: Wyzdrowienie / Trwałość', 'Po 12 miesiącach po porodzie', 'Ustąpienie objawów lub utrwalona niedoczynność', 'Normalizacja TSH u ~75%; trwałe TSH ↑ u ~25%', 'Próba odstawienia LT4 po roku; coroczna kontrola TSH'],
      ],
    },
    advanced:
      'Objawy fazy niedoczynności PPT (wyczerpanie, apatia, zaburzenia nastroju, płaczliwość) bardzo często nakładają się na objawy depresji poporodowej (postpartum depression). Zgodnie z wytycznymi ATA u każdej kobiety z rozpoznaną lub podejrzewaną depresją poporodową bezwzględnie należy oznaczyć stężenie TSH i FT4, aby wykluczyć odwracalną organiczną przyczynę zaburzeń afektywnych.',
    summary:
      'PPT to zjawisko odbicia immunologicznego po porodzie. W fazie 1 (destrukcja) tyreostatyki są nieskuteczne – podaj beta-bloker! W fazie 2 podaj LT4. Zawsze zbadaj TSH przy podejrzeniu depresji poporodowej.',
    sourceIds: ['ata_pregnancy_2017'],
    questions: [
      q(
        'Dlaczego w fazie nadczynności poporodowego zapalenia tarczycy (PPT) nie należy stosować leków przeciwtarczycowych (tiamazolu/PTU)?',
        ['Tyreotoksykoza wynika z uwolnienia hormonów ze zniszczonych pęcherzyków, a nie ze wzmożonej syntezy de novo', 'Tyreostatyki hamują syntezę hormonów, która w zapaleniu destrukcyjnym jest już fizjologicznie zablokowana.'],
        ['Tyreostatyki natychmiast zatruwają mleko matki', 'W małych dawkach tiamazol i PTU są dozwolone w laktacji przy chorobie Gravesa.'],
        ['Tyreostatyki wywołują trwałą martwicę przysadki', 'Nie wykazują cytotoksyczności przysadkowej.'],
        'ciaza-ppt-q1'
      ),
      q(
        'Jaki lek jest lekiem z wyboru w łagodzeniu nasilonych objawów sercowo-naczyniowych w fazie tyreotoksykozy PPT u kobiety karmiącej?',
        ['Propranolol w małej dawce', 'Beta-bloker skutecznie zwalnia akcję serca i redukuje drżenie rąk, będąc bezpiecznym w laktacji.'],
        ['Radiojod 131-I', 'Radiojod jest bezwzględnie przeciwwskazany w laktacji (wymagałby natychmiastowego przerwania karmienia).'],
        ['Wodorowęglan sodu dożylnie', 'Nie ma zastosowania w leczeniu objawów tyreotoksykozy.'],
        'ciaza-ppt-q2'
      ),
      q(
        'Które badanie laboratoryjne należy bezwzględnie wykonać u młodej matki w 5. miesiącu po porodzie z objawami ciężkiego przygnębienia i zmęczenia?',
        ['TSH i wolne FT4 w surowicy krwi', 'Niedoczynność tarczycy w przebiegu PPT imituje lub nasila objawy depresji poporodowej.'],
        ['Scyntygrafię całego ciała z technetem', 'Izotop przenika do mleka i jest przeciwwskazany u matek karmiących.'],
        ['Biopsję aspiracyjną szpiku', 'Brak wskazań hematologicznych.'],
        'ciaza-ppt-q3'
      ),
      q(
        'U jakiego odsetka kobiet z poporodowym zapaleniem tarczycy faza niedoczynności przechodzi w trwale utrwaloną hipotyreozę?',
        ['U około 20–30% kobiet (wymaga dożywotniej substytucji LT4)', 'U pozostałych 70–80% dochodzi do regeneracji miąższu i powrotu do eutyreozy.'],
        ['U 100% (wszystkie przypadki są nieodwracalne)', 'Większość przypadków ma charakter samoograniczający się.'],
        ['U 0% (nikt nigdy nie wymaga leczenia przewlekłego)', 'Zapalenie może doprowadzić do całkowitego zwłóknienia miąższu gruczołu.'],
        'ciaza-ppt-q4'
      ),
      q(
        'Które przeciwciała są typowo ujemne w PPT, a dodatnie w chorobie Gravesa-Basedowa?',
        ['Przeciwciała przeciw receptorowi TSH (TRAb)', 'Rozstrzyga to o etiologii tyreotoksykozy poporodowej.'],
        ['Przeciwciała przeciw tyreoperoksydazie (anty-TPO)', 'Anty-TPO są silnie dodatnie w obu jednostkach autoimmunologicznych.'],
        ['Przeciwciała przeciwjądrowe ANA', 'ANA są nieswoiste i nie różnicują PPT od choroby Gravesa.'],
        'ciaza-ppt-q5'
      ),
    ],
  },
  {
    id: 'ciaza-gdm-kryteria-iadpsg',
    title: 'Cukrzyca ciążowa (GDM) – diagnostyka i kryteria',
    subtitle: 'Fizjologiczna insulinooporność łożyskowa, screening OGTT 75g IADPSG/WHO i czynniki ryzyka',
    group: 'Cukrzyca i metabolizm w ciąży',
    minutes: 18,
    goals: [
      'Wyjaśnisz mechanizm fizjologicznej insulinooporności indukowanej hormonami łożyskowymi (hPL, progesteron, kortyzol, TNF-alfa).',
      'Zastosujesz kryteria jednoetapowego testu OGTT 75g wg IADPSG/WHO/FIGO (92 / 180 / 153 mg/dl).',
    ],
    sections: [
      {
        title: 'Mechanizm fizjologicznej insulinooporności łożyskowej',
        text: 'W II i III trymestrze ciąży dochodzi do fizjologicznego spadku wrażliwości tkanek matki na insulinę o 50–60%. Zjawisko to ma fundamentalne znaczenie ewolucyjne: zmniejsza zużycie glukozy przez mięśnie matki, kierując strumień substratów energetycznych przez łożysko do intensywnie rosnącego płodu. Insulinooporność jest indukowana przez hormony wydzielane przez syncytiotrofoblast: laktogen łożyskowy (hPL / hCS), progesteron, łożyskowy hormon wzrostu (PGH), wolny kortyzol oraz cytokiny prozapalne (TNF-alfa). U zdrowej ciężarnej komórki beta trzustki kompensują ten stan 2–3-krotnym wzrostem wydzielania insuliny. Cukrzyca ciążowa (GDM) rozwija się, gdy rezerwa wydzielnicza komórek beta jest niewystarczająca.',
      },
      {
        title: 'Algorytm diagnostyczny: wczesny screening i OGTT 75g w 24.–28. tyg.',
        text: 'W Polsce i wg wytycznych FIGO/IADPSG diagnostyka przebiega dwuetapowo: 1) Podczas pierwszej wizyty w ciąży (do 10. tyg.) oznacza się glikemię na czczo w osoczu krwi żylnej. Glikemia <92 mg/dl (<5,1 mmol/l) jest normą; glikemia 92–125 mg/dl (5,1–6,9 mmol/l) upoważnia do rozpoznania GDM (lub wymaga pilnego OGTT); glikemia na czczo ≥126 mg/dl (≥7,0 mmol/l) oznacza jawną cukrzycę przedciążową (PGDM); 2) U kobiet z prawidłową glikemią w I trymestrze pomiędzy 24. a 28. tygodniem ciąży wykonuje się standardowy doustny test tolerancji 75 g glukozy (OGTT 75g).',
      },
      {
        title: 'Kryteria IADPSG / WHO 2013 dla testu OGTT 75g',
        text: 'Do rozpoznania cukrzycy ciążowej (GDM) w teście OGTT 75g wystarczy spełnienie chociaż JEDNEGO z poniższych trzech kryteriów: 1) Glikemia na czczo: 92–125 mg/dl (5,1–6,9 mmol/l); 2) Glikemia po 1 godzinie: ≥180 mg/dl (≥10,0 mmol/l); 3) Glikemia po 2 godzinach: 153–199 mg/dl (8,5–11,0 mmol/l). Jeśli glikemia na czczo wynosi ≥126 mg/dl lub w 2. godzinie ≥200 mg/dl, rozpoznaje się jawną cukrzycę w ciąży (overt diabetes in pregnancy).',
      },
    ],
    table: {
      headers: ['Punkt pomiarowy w OGTT 75g', 'Wartość prawidłowa', 'Kryterium rozpoznania GDM (wystarczy 1 punkt!)', 'Jawna cukrzyca (PGDM)'],
      rows: [
        ['Na czczo (0 min)', '< 92 mg/dl (< 5,1 mmol/l)', '92 – 125 mg/dl (5,1 – 6,9 mmol/l)', '≥ 126 mg/dl (≥ 7,0 mmol/l)'],
        ['Po 1 godzinie (60 min)', '< 180 mg/dl (< 10,0 mmol/l)', '≥ 180 mg/dl (≥ 10,0 mmol/l)', '—'],
        ['Po 2 godzinach (120 min)', '< 153 mg/dl (< 8,5 mmol/l)', '153 – 199 mg/dl (8,5 – 11,0 mmol/l)', '≥ 200 mg/dl (≥ 11,1 mmol/l)'],
      ],
    },
    advanced:
      'Podstawą patofizjologii powikłań płodowych w GDM jest hipoteza Pedersena: glukoza swobodnie przenika przez łożysko przez dyfuzję ułatwioną (transportery GLUT1), podczas gdy matczyna insulina NIE PRZENIKA bariery łożyskowej. Matczyna hiperglikemia wywołuje hiperglikemię u płodu, stymulując komórki beta trzustki płodu do masywnej hiperinsulinemii. Płodowa insulina działa jak potężny hormon anaboliczny i czynnik wzrostu, prowadząc do makrosomii, kardiomiopatii przerostowej, hipoksji i nagłego zgonu wewnątrzmacicznego.',
    summary:
      'Łożyskowy hPL i kortyzol wywołują 50% spadek wrażliwości na insulinę. W OGTT 75g (24.–28. tydz.) wystarczy 1 punkt nieprawidłowy: na czczo ≥92, 1h ≥180, 2h ≥153 mg/dl!',
    sourceIds: ['iadpsg_consensus', 'figo_gdm_2024'],
    questions: [
      q(
        'Ile nieprawidłowych wartości w teście OGTT 75g (24.–28. tydz.) jest wymaganych do rozpoznania cukrzycy ciążowej wg kryteriów IADPSG/WHO?',
        ['Wystarczy przekroczenie co najmniej JEDNEJ z trzech wartości progowych', 'Jednoetapowy standard IADPSG opiera się na wykazaniu pojedynczego punktu dysfunkcji glikemicznej.'],
        ['Wszystkie trzy wartości muszą być podwyższone jednocześnie', 'Konieczność spełnienia 3 kryteriów przeoczyłaby większość powikłań u płodu.'],
        ['Dokładnie dwie wartości z trzech', 'Taki wymóg obowiązywał w dawnych kryteriach O’Sullivan, od których odstąpiono.'],
        'ciaza-gdm-q1'
      ),
      q(
        'Który zestaw wartości progowych glikemii (mg/dl) w OGTT 75g definiuje cukrzycę ciążową wg IADPSG?',
        ['Na czczo ≥92 mg/dl, po 1h ≥180 mg/dl, po 2h ≥153 mg/dl', 'Są to oficjalne zwalidowane punkty odcięcia przyjęte przez WHO, FIGO i PTD.'],
        ['Na czczo ≥100 mg/dl, po 1h ≥140 mg/dl, po 2h ≥200 mg/dl', 'Wartości te nie odpowiadają kryteriom IADPSG.'],
        ['Na czczo ≥126 mg/dl, po 1h ≥250 mg/dl, po 2h ≥300 mg/dl', 'To kryteria ciężkiej cukrzycy poza ciążą.'],
        'ciaza-gdm-q2'
      ),
      q(
        'Jaki hormon łożyskowy jest głównym mediatorem fizjologicznego spadku wrażliwości na insulinę w II i III trymestrze?',
        ['Laktogen łożyskowy (hPL / human placental lactogen)', 'hPL wykazuje silne działanie lipolityczne i antyinsulinowe w tkankach matki.'],
        ['Oksytocyna', 'Oksytocyna stymuluje skurcze macicy i laktację, nie wywołuje insulinooporności.'],
        ['Relaksyna', 'Relaksyna rozluźnia więzadła miednicy i szyjkę macicy.'],
        'ciaza-gdm-q3'
      ),
      q(
        'Na czym polega mechanizm makrosomii płodu w przebiegu nieleczonej cukrzycy ciążowej (hipoteza Pedersena)?',
        ['Matczyna glukoza swobodnie przenika przez łożysko, wywołując hiperinsulinizm u płodu, który działa anabolicznie', 'Nadmiar insuliny u płodu pobudza odkładanie tkanki tłuszczowej i glikogenu w narządach.'],
        ['Insulina matki przechodzi przez łożysko i bezpośrednio tuczy tkanki płodu', 'Insulina matki nie przenika przez barierę łożyskową.'],
        ['Łożysko produkuje nadmierne ilości hormonu wzrostu bezpośrednio do krwi pępowinowej', 'Makrosomia zależy od osi glukoza–insulina płodowa, nie samego PGH.'],
        'ciaza-gdm-q4'
      ),
      q(
        'Jaki wynik glikemii na czczo w I trymestrze ciąży (przed 10. tyg.) pozwala rozpoznać jawną cukrzycę (PGDM)?',
        ['Glikemia na czczo ≥ 126 mg/dl (≥ 7,0 mmol/l) potwierdzona w drugim badaniu', 'Odpowiada to kryteriom cukrzycy poza ciążą, dowodząc istnienia nierozpoznanej cukrzycy przed zapłodnieniem.'],
        ['Glikemia na czczo ≥ 92 mg/dl', 'Wartość 92–125 mg/dl w I trymestrze klasyfikuje się jako wczesną GDM.'],
        ['Glikemia na czczo ≥ 80 mg/dl', '80 mg/dl to w pełni prawidłowa glikemia na czczo w ciąży.'],
        'ciaza-gdm-q5'
      ),
    ],
  },
  {
    id: 'ciaza-gdm-cele-i-farmakoterapia',
    title: 'GDM: cele glikemiczne i farmakoterapia',
    subtitle: 'Docelowe glikemie, wskaźniki CGM (TIR 63–140 mg/dl), insulina vs doustne leki hipoglikemizujące',
    group: 'Cukrzyca i metabolizm w ciąży',
    minutes: 19,
    goals: [
      'Wdrożysz rygorystyczne cele glikemiczne w samokontroli glukometrem i ciągłym monitorowaniu CGM u ciężarnej.',
      'Wybierzesz bezpieczną farmakoterapię: intensywną insulinoterapię jako złoty standard oraz zrozumiesz ograniczenia metforminy.',
    ],
    sections: [
      {
        title: 'Rygorystyczne cele glikemiczne w ciąży wg ADA / FIGO / PTD',
        text: 'Cele wyrównania glikemii w ciąży są znacznie bardziej restrykcyjne niż poza ciążą, aby zapobiec powikłaniom płodowym (makrosomia, urazy okołoporodowe, hipoglikemia noworodkowa). W samokontroli glukometrem obowiązują: 1) Glikemia na czczo i przed posiłkami: 70–90 mg/dl (lub <95 mg/dl wg ADA); 2) Glikemia 1 godzinę po rozpoczęciu posiłku: <140 mg/dl (<7,8 mmol/l); 3) Glikemia 2 godziny po posiłku: <120 mg/dl (<6,7 mmol/l); 4) Glikemia w nocy (między 2:00 a 4:00): >70 mg/dl (prewencja nocnych hipoglikemii).',
      },
      {
        title: 'Cele ciągłego monitorowania glikemii (CGM) w ciąży',
        text: 'W ciąży fizjologiczne stężenia glukozy są niższe z powodu stałego zużycia przez jednostkę płodowo-łożyskową. Dlatego specyficzny zakres docelowy (Target Range) dla ciężarnych z cukrzycą wynosi 63–140 mg/dl (3,5–7,8 mmol/l). Międzynarodowe rekomendacje Consensus on CGM w ciąży wymagają: Time in Range (TIR 63–140 mg/dl) >70% czasu doby, Time Below Range (TBR <63 mg/dl) <4%, TBR <54 mg/dl <1% oraz Time Above Range (TAR >140 mg/dl) <25%.',
      },
      {
        title: 'Insulinoterapia – złoty standard vs doustne leki hipoglikemizujące',
        text: 'Jeśli po 5–7 dniach stosowania diety cukrzycowej z ograniczeniem węglowodanów prostych i umiarkowanej aktywności fizycznej ponad 10–20% pomiarów przekracza docelowe wartości, natychmiast wdraża się farmakoterapię. Insulina jest jedynym lekiem pierwszego wyboru w ciąży rekomendowanym przez ADA i PTD (nie przenika przez łożysko, brak teratogenności, wysoka sterowalność). Stosuje się analogi szybkodziałające (aspart, lispro) do posiłków oraz analogi długodziałające lub NPH w dawce podstawowej. Metformina i glibenklamid swobodnie przenikają przez łożysko; metformina może być rozważana tylko w wyjątkowych sytuacjach braku zgody na insulinę, lecz badania długofalowe wskazują na wyższy przyrost tkanki tłuszczowej u dzieci matek leczonych metforminą.',
      },
    ],
    table: {
      headers: ['Narzędzie / Parametr', 'Docelowy zakres w ciąży', 'Uzasadnienie kliniczne'],
      rows: [
        ['Glikemia na czczo (glukometr)', '< 90–95 mg/dl (< 5,0–5,3 mmol/l)', 'Glikemia na czczo matki najsilniej koreluje z masą urodzeniową płodu'],
        ['Glikemia 1h po posiłku (glukometr)', '< 140 mg/dl (< 7,8 mmol/l)', 'Ograniczenie poposiłkowego wyrzutu insuliny u płodu'],
        ['Glikemia 2h po posiłku (glukometr)', '< 120 mg/dl (< 6,7 mmol/l)', 'Szybki powrót do normoglikemii'],
        ['Zakres docelowy TIR w CGM', '63 – 140 mg/dl (> 70% doby)', 'Specyficzny ciążowy zakres (dolna granica przesunięta z 70 do 63 mg/dl)'],
        ['Hipoglikemia TBR (<63 mg/dl)', '< 4% doby (<1h/dobę)', 'Ochrona matki przed neuroglikopenią i urazem'],
      ],
    },
    advanced:
      'Do posiłkowych analogów insuliny o najwyższym profilu bezpieczeństwa w ciąży (kategoria B) należą insulina aspart oraz lispro. Wśród analogów długodziałających insulina detemir oraz glargina (U100) posiadają liczne badania bezpieczeństwa wykazujące brak zwiększonego ryzyka wad wrodzonych i powikłań okołoporodowych, stanowiąc nowoczesną alternatywę dla insuliny izofanowej NPH.',
    summary:
      'Cele w ciąży: na czczo <90–95 mg/dl, 1h po posiłku <140 mg/dl; w CGM TIR 63–140 mg/dl >70%. Insulina to jedyny bezpieczny lek I wyboru (nie przenika przez łożysko!).',
    sourceIds: ['ada_pregnancy_2024', 'figo_gdm_2024'],
    questions: [
      q(
        'Jaki jest docelowy zakres stężeń glukozy (Time in Range, TIR) w ciąży w systemach ciągłego monitorowania CGM?',
        ['63 – 140 mg/dl (3,5 – 7,8 mmol/l)', 'Jest to specyficzny węższy przedział ciążowy, w odróżnieniu od standardowego 70–180 mg/dl poza ciążą.'],
        ['70 – 180 mg/dl', 'To zakres dla dorosłych niebędących w ciąży; w ciąży dopuszczałby szkodliwy hiperinsulinizm płodu.'],
        ['100 – 200 mg/dl', 'Wartości te oznaczałyby skrajną hiperglikemię ciążową i ciężką makrosomię.'],
        'ciaza-gdm-cele-q1'
      ),
      q(
        'Jaka jest maksymalna dopuszczalna glikemia 1 godzinę po rozpoczęciu posiłku w samokontroli ciężarnej z GDM?',
        ['Poniżej 140 mg/dl (7,8 mmol/l)', 'Wartość powyżej 140 mg/dl stymuluje trzustkę płodu do niekontrolowanego wyrzutu insuliny.'],
        ['Poniżej 200 mg/dl', '200 mg/dl to próg jawnej toksyczności glukozowej.'],
        ['Poniżej 90 mg/dl', 'Glikemia <90 mg/dl to cel na czczo, nie poposiłkowy.'],
        'ciaza-gdm-cele-q2'
      ),
      q(
        'Dlaczego insulina jest lekiem pierwszego wyboru w leczeniu farmakologicznym cukrzycy ciążowej?',
        ['Cząsteczka insuliny nie przenika przez barierę łożyskową do krążenia płodu', 'Umożliwia skuteczną kontrolę glikemii matki bez bezpośredniego wpływu na płód.'],
        ['Insulina trwale zapobiega wymiotom ciężarnych', 'Insulina nie wykazuje działania przeciwwymiotnego.'],
        ['Ponieważ jako jedyna obniża ciśnienie tętnicze w łożysku', 'Insulina reguluje metabolizm glukozy, a nie ciśnienie łożyskowe.'],
        'ciaza-gdm-cele-q3'
      ),
      q(
        'Co jest głównym powodem ostrożności i ograniczenia stosowania metforminy w ciąży wg wytycznych ADA i PTD?',
        ['Metformina swobodnie przenika przez łożysko, a badania odległe sugerują wyższe ryzyko otyłości u potomstwa', 'Stężenia metforminy we krwi płodu są zbliżone lub wyższe niż we krwi matki.'],
        ['Metformina wywołuje natychmiastowe poronienie w każdym przypadku', 'Metformina nie jest lekiem wczesnoporonnym.'],
        ['Metformina niszczy tarczycę matki', 'Nie ma wpływu na tarczycę.'],
        'ciaza-gdm-cele-q4'
      ),
      q(
        'Kiedy u ciężarnej z GDM na diecie należy podjąć decyzję o wdrożeniu insulinoterapii?',
        ['Gdy po 5–7 dniach diety ponad 10–20% pomiarów glukometrem przekracza wartości docelowe', 'Zbyt długa zwłoka w dołączaniu insuliny skutkuje przerostem tkanki tłuszczowej u płodu.'],
        ['Dopiero gdy masa płodu w USG przekroczy 5 kg', 'To spóźniona reakcja na już zaistniałą ciężką makrosomię.'],
        ['Wyłącznie po wystąpieniu kwasicy ketonowej', 'W GDM kwasica ketonowa występuje rzadko; celem insuliny jest normoglikemia.'],
        'ciaza-gdm-cele-q5'
      ),
    ],
  },
];
