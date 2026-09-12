import { q, type DraftLesson } from './course-types.ts';

export const draftPediatricsPart1: DraftLesson[] = [
  {
    id: 'ped-niski-wzrost-algorytm',
    title: 'Auksologia i diagnostyka niskorosłości',
    subtitle: 'Siatki centylowe, odchylenie standardowe SDS i wzrost docelowy',
    group: 'Wzrastanie i rozwój',
    minutes: 16,
    goals: [
      'Zdefiniujesz kryteria auksologiczne niskorosłości (wysokość ciała < -2,0 SDS lub < 3. centyla).',
      'Obliczysz potencjał genetyczny (mid-parental target height wg Tannera) oraz tempo wzrastania (cm/rok).',
    ],
    sections: [
      {
        title: 'Kryteria auksologiczne i siatki centylowe',
        text: 'Niskorosłość definiuje się statystycznie jako wysokość ciała poniżej 3. centyla lub poniżej -2,0 odchylenia standardowego (SDS) dla danego wieku i płci na populacyjnej siatce referencyjnej (w Polsce projekt OLAF/OLA). Pojedynczy punkt pomiarowy nie pozwala jednak rozstrzygnąć o przyczynie. Kluczem diagnostycznym jest tempo wzrastania (growth velocity obliczane w cm/rok na przestrzeni co najmniej 6 miesięcy) – spadek tempa poniżej 25. centyla lub utrata kanału centylowego wskazuje na proces patologiczny.',
      },
      {
        title: 'Wzrost docelowy (Mid-Parental Height)',
        text: 'Genetyczny potencjał wzrostowy szacuje się wzorem Hermana/Tannera: dla chłopców [wzrost ojca + (wzrost matki + 13 cm)] / 2; dla dziewcząt [(wzrost ojca - 13 cm) + wzrost matki] / 2. Przedział docelowy wynosi ±8,5 cm (odpowiada to około ±1,5 SDS). Jeśli aktualny SDS wzrostu dziecka odbiega o więcej niż 1,5–2 SDS w dół od SDS wzrostu docelowego rodziców, istnieje wysokie podejrzenie patologii organicznej lub genetycznej, nawet jeśli dziecko formalnie mieści się jeszcze powyżej -2 SDS populacyjnego.',
      },
      {
        title: 'Wiek kostny i badania pierwszego rzutu',
        text: 'Rentgenogram niedominującej dłoni i nadgarstka (oceniany atlasem Greulicha-Pyle’a lub metodą Tannera-Whitehouse’a TW3) pozwala ocenić dojrzałość szkieletową. W konstytucjonalnym opóźnieniu wzrastania wiek kostny jest opóźniony w stopniu odpowiadającym wiekowi wzrostowemu. W diagnostyce wstępnej należy zawsze wykluczyć przyczyny nieendokrynne: celiakię (anty-tTG IgA), niedokrwistość, przewlekłą chorobę nerek (kreatynina, eGFR), kwasicę cewkową oraz subkliniczną niedoczynność tarczycy (TSH, FT4). U każdej dziewczynki z niewyjaśnioną niskorosłością bezwzględnym standardem jest kariotyp w kierunku zespołu Turnera.',
      },
    ],
    table: {
      headers: ['Wzorzec auksologiczny', 'Tempo wzrastania', 'Wiek kostny', 'Potencjał rodzicielski', 'Najczęstsze rozpoznanie'],
      rows: [
        ['Niski wzrost rodzinny (FSS)', 'Prawidłowe (>25. centyla)', 'Zgodny z wiekiem metrykalnym', 'Zgodny z niskim target height', 'Wariant normy genetycznej'],
        ['Konstytucjonalne opóźnienie (CDGP)', 'Prawidłowe / dolna norma', 'Opóźniony o >1,5–2 lata', 'Zgodny z target height (późny catch-up)', 'Wariant normy rozwojowej'],
        ['Endokrynopatia (GHD, hipotyreoza)', 'Znacznie zwolnione (<25. centyla)', 'Wyraźnie opóźniony', 'Znacząco poniżej target height', 'Wymaga leczenia przyczynowego'],
        ['Dysplazje kostne / Turner', 'Zwolnione, dysproporcja ciała', 'Zmienny / dysmorfie szkieletowe', 'Poniżej target height', 'Wskazanie do genetyki i rhGH'],
      ],
    },
    advanced:
      'Wskaźnik SDS wzrostu oblicza się ze wzoru: (wysokość mierzona - średnia populacyjna dla wieku i płci) / SD populacyjne. W auksologii pediatrycznej utrata więcej niż 0,5 SDS w ciągu 1 roku lub 1,0 SDS w ciągu 2 lat jest bezwzględnym wskazaniem do pogłębionej diagnostyki endokrynologicznej, nawet u dzieci, których całkowity wzrost mieści się jeszcze w granicach normy statystycznej.',
    summary:
      'Pojedynczy pomiar wysokości ciała to za mało. Analizuj tempo wzrastania, target height rodziców i wiek kostny. Zawsze wyklucz celiakię, nerkowe kwasice oraz zespół Turnera u dziewcząt.',
    sourceIds: ['espe_growth', 'ped_olaf_norms'],
    questions: [
      q(
        'Jaka wartość SDS wzrostu stanowi klasyczny punkt odcięcia definiujący niskorosłość?',
        ['Wzrost < -2,0 SDS (poniżej 3. centyla)', 'Jest to powszechnie akceptowany statystyczny próg odcięcia wg ESPE i WHO.'],
        ['Wzrost < -1,0 SDS (poniżej 16. centyla)', '-1,0 SDS mieści się w granicach fizjologicznej normy populacyjnej.'],
        ['Wzrost < -3,0 SDS (wyłącznie poniżej 0,1. centyla)', 'To próg skrajnej niskorosłości, nie podstawowej definicji.'],
        'ped-niski-wzrost-q1'
      ),
      q(
        'Jak oblicza się wzrost docelowy (target height) dla dziewczynki wg wzoru Tannera?',
        ['[(Wzrost ojca - 13 cm) + wzrost matki] / 2', 'Korekta o 13 cm odpowiada średniej różnicy dymorfizmu płciowego w populacji dorosłej.'],
        ['(Wzrost ojca + wzrost matki) / 2', 'Pominięcie korekty płci zawyża docelowy wzrost dziewczynki o 6,5 cm.'],
        ['[(Wzrost ojca + 13 cm) + wzrost matki] / 2', 'Dodanie 13 cm stosuje się u chłopców, a nie u dziewcząt.'],
        'ped-niski-wzrost-q2'
      ),
      q(
        'Które badanie jest bezwzględnie wymagane u każdej dziewczynki z niskorosłością o niejasnej przyczynie?',
        ['Kariotyp limfocytów krwi obwodowej', 'W zespole Turnera niska sylwetka może być jedynym uchwytnym wczesnym objawem dysgenezji gonad.'],
        ['Scyntygrafia kośćca', 'Brak wskazań w rutynowym algorytmie auksologicznym.'],
        ['Dobowy profil glikemii', 'Nie ma wartości diagnostycznej w różnicowaniu niskorosłości.'],
        'ped-niski-wzrost-q3'
      ),
      q(
        'Czym charakteryzuje się konstytucjonalne opóźnienie wzrastania i dojrzewania (CDGP)?',
        ['Prawidłowym tempem wzrastania i opóźnionym wiekiem kostnym', 'Dziecko ma potencjał osiągnięcia prawidłowego wzrostu ostatecznego dzięki dłuższemu okresowi wzrostu.'],
        ['Gwałtownym przyspieszeniem wieku kostnego', 'Przyspieszenie wieku kostnego występuje w przedwczesnym dojrzewaniu, nie w CDGP.'],
        ['Trwałym spadkiem wzrostu poniżej -3 SDS w dorosłości', 'Pacjenci z CDGP wchodzą w pokwitanie później, ale osiągają docelowy wzrost genetyczny.'],
        'ped-niski-wzrost-q4'
      ),
      q(
        'Jakie minimalne tempo wzrastania w okresie prepubertalnym uważa się za alarmujące?',
        ['Spadek poniżej 4–5 cm/rok', 'Fizjologiczne prepubertalne tempo wzrastania to 5–7 cm/rok; tempo <4 cm/rok wskazuje na patologię.'],
        ['Spadek poniżej 10 cm/rok', '10 cm/rok to tempo skoku pokwitaniowego, a nie okresu prepubertalnego.'],
        ['Spadek poniżej 1 cm/rok', 'To skrajne zahamowanie wzrostu spotykane w zaawansowanej hiposomatotropii.'],
        'ped-niski-wzrost-q5'
      ),
    ],
  },
  {
    id: 'ped-niedobor-gh',
    title: 'Niedobór hormonu wzrostu (GHD)',
    subtitle: 'Testy stymulacji wydzielania GH, markery obwodowe IGF-1 i IGFBP-3',
    group: 'Wzrastanie i rozwój',
    minutes: 18,
    goals: [
      'Zrozumiesz zasady wykonywania i interpretacji testów dynamicznych stymulacji GH (arginina, klonidyna, glukagon, ITT).',
      'Zinterpretujesz stężenia IGF-1 i IGFBP-3 oraz zasady kwalifikacji do leczenia rekombinowanym GH (rhGH).',
    ],
    sections: [
      {
        title: 'Dlaczego nie oznacza się podstawowego stężenia GH?',
        text: 'Hormon wzrostu jest wydzielany przez komórki somatotropowe przysadki pulsacyjnie, z najwyższymi pikami w fazie snu głębokiego (fale wolne delta NREM). W ciągu dnia stężenia podstawowe GH u zdrowych dzieci są bardzo niskie i często niewykrywalne (<0,5–1 ng/ml). Dlatego pojedyncze losowe oznaczenie GH nie ma żadnej wartości diagnostycznej. Konieczne jest zastosowanie testów prowokacyjnych (stymulacyjnych), które badają rezerwę wydzielniczą przysadki pod wpływem bodźców farmakologicznych.',
      },
      {
        title: 'Testy stymulacji GH – protokoły i kryteria odcięcia',
        text: 'Rozpoznanie somatotropinowej niedoczynności przysadki (SNP / GHD) wymaga potwierdzenia braku wyrzutu GH w co najmniej dwóch niezależnych testach stymulacyjnych. Stosuje się: test z klonidyną (agonista alfa2-adrenergiczny stymulujący GHRH), test z L-argininą (hamuje wydzielanie podwzgórzowej somatostatyny), test z glukagonem oraz test hipoglikemii poinsulinowej (ITT – złoty standard u młodzieży i dorosłych, wymagający glikemii <40 mg/dl z objawami neuroglikopenii). Tradycyjnym punktem odcięcia dla szczytu GH (peak GH) w Polsce i Europie jest 10 ng/ml (w niektórych wytycznych 7 ng/ml); szczyt poniżej tej wartości wskazuje na niedobór.',
      },
      {
        title: 'Markery obwodowe: IGF-1, IGFBP-3 i neuroobrazowanie',
        text: 'Insulinopodobny czynnik wzrostu 1 (IGF-1) krąży w osoczu związany z białkiem IGFBP-3 i kwasolabilną podjednostką (ALS), wykazując stabilne stężenie dobowe. Niskie stężenie IGF-1 i IGFBP-3 wspiera rozpoznanie GHD, jednak u dzieci poniżej 3–5 r.ż. oraz w stanach niedożywienia IGF-1 może być fizjologicznie niskie bez pierwotnego GHD. Po biochemicznym potwierdzeniu niedoboru GH bezwzględnie konieczne jest wykonanie rezonansu magnetycznego (MRI) okolicy podwzgórzowo-przysadkowej w celu wykluczenia czaszkogardlaka (craniopharyngioma), guza germinalnego, ektopii tylnego płata lub przerwania szypuły przysadki (PSIS).',
      },
    ],
    table: {
      headers: ['Test stymulacji', 'Mechanizm bodźca', 'Zalety kliniczne', 'Przeciwwskazania / Ryzyka'],
      rows: [
        ['Klonidyna (doustnie)', 'Agonista alfa-2 → stymulacja GHRH', 'Wysoka powtarzalność, brak kłucia i.v.', 'Sedacja, senność, możliwa hipotonia'],
        ['Arginina (wlew i.v.)', 'Hamowanie podwzgórzowej somatostatyny', 'Bezpieczna, rzadkie spadki ciśnienia', 'Nudności, rzadko odczyny alergiczne'],
        ['Glukagon (i.m./s.c.)', 'Wtórna stymulacja wyrzutu GH po fazie glikemii', 'Stymuluje jednocześnie wyrzut ACTH i kortyzolu', 'Opóźniona hipoglikemia (konieczny monitoring)'],
        ['ITT (insulina i.v.)', 'Stres neuroglikopeniczny (glikemia <40 mg/dl)', 'Najsilniejszy bodziec, ocena osi GH i HPA', 'Ryzyko drgawek i śpiączki; zakazany u dzieci <5 r.ż. i w padaczce'],
      ],
    },
    advanced:
      'U młodzieży w okresie okołopokwitaniowym z opóźnionym dojrzewaniem wyrzut GH w testach może być fałszywie niski z powodu braku torującego wpływu steroidów płciowych. Wytyczne ESPE i GHRS dopuszczają w takich przypadkach tzw. priming steroidowy (krótkotrwałe podanie estrogenu u dziewcząt lub testosteronu u chłopców przed testem stymulacji), aby uniknąć błędnego rozpoznania trwałego GHD u pacjenta z CDGP.',
    summary:
      'GHD diagnozuje się brakiem wyrzutu GH (<10 ng/ml) w 2 testach stymulacji. IGF-1 i IGFBP-3 odzwierciedlają działanie obwodowe. Każde potwierdzone GHD wymaga MRI przysadki.',
    sourceIds: ['espe_growth', 'ghrs_consensus'],
    questions: [
      q(
        'Dlaczego pojedyncze losowe oznaczenie GH w surowicy nie służy do rozpoznania niedoboru GH?',
        ['Wydzielanie GH jest pulsacyjne i w ciągu dnia fizjologicznie spada do wartości bliskich zera', 'Jedynie testy prowokacyjne badają rezerwę wydzielniczą somatotropów.'],
        ['GH ulega natychmiastowej degradacji w probówce laboratoryjnej', 'Hormon jest stabilny; problemem jest biologia pulsacyjności.'],
        ['GH krąży wyłącznie wewnątrz erytrocytów', 'GH jest hormonem peptydowym krążącym w osoczu.'],
        'ped-niedobor-gh-q1'
      ),
      q(
        'Jaki jest referencyjny próg stężenia maksymalnego (peak GH) w testach stymulacji potwierdzający GHD?',
        ['Szczyt GH poniżej 10 ng/ml (w dwóch niezależnych testach)', 'Jest to klasyczny punkt odcięcia wymagany w programach leczenia rhGH.'],
        ['Szczyt GH poniżej 50 ng/ml', 'To wartość zbyt wysoka, diagnozowałaby fałszywie większość zdrowych dzieci.'],
        ['Szczyt GH poniżej 1 ng/ml', 'Odpowiada to niemal całkowitej apoplazji somatotropowej, nie standardowemu progowi.'],
        'ped-niedobor-gh-q2'
      ),
      q(
        'Dlaczego po laboratoryjnym potwierdzeniu GHD należy pilnie wykonać rezonans magnetyczny (MRI) głowy?',
        ['Aby wykluczyć guz okolicy nadsiodłowej (np. craniopharyngioma) lub wady przysadki (PSIS)', 'Nowotwór uciskający szypułę może manifestować się izolowanym zahamowaniem wzrostu.'],
        ['Aby ocenić gęstość mineralną kości czaszki', 'Densytometria służy do oceny kośćca, nie rezonans magnetyczny mózgowia.'],
        ['W celu pobrania biopsji płynu mózgowo-rdzeniowego', 'MRI jest badaniem obrazowym, nie inwazyjną procedurą bioptyczną.'],
        'ped-niedobor-gh-q3'
      ),
      q(
        'Co oznacza pojęcie „priming steroidowy” przed testami stymulacji GH?',
        ['Wstępne podanie steroidów płciowych u młodzieży prepubertalnej w celu uniknięcia fałszywie ujemnej odpowiedzi GH', 'Estrogeny i testosteron zwiększają wrażliwość somatotropów na bodźce stymulacyjne.'],
        ['Podanie hydrokortyzonu w celu zapobieżenia wstrząsowi', 'Hydrokortyzon nie jest stosowany jako torowanie somatotropowe.'],
        ['Długotrwała suplementacja DHEA u niemowląt', 'Priming dotyczy młodzieży w wieku okołopokwitaniowym z opóźnionym dojrzewaniem.'],
        'ped-niedobor-gh-q4'
      ),
      q(
        'Które białko osoczowe tworzy z IGF-1 i podjednostką ALS stabilny kompleks trójcząsteczkowy?',
        ['IGFBP-3', 'Kompleks potrójny IGF-1 / IGFBP-3 / ALS wydłuża okres półtrwania IGF-1 do kilkunastu godzin.'],
        ['Albuminy osocza', 'Albuminy wiążą hormony steroidowe i tarczycowe, nie tworzą kompleksu potrójnego z IGF-1.'],
        ['Globulina TBG', 'TBG wiąże tyroksynę i trójjodotyroninę.'],
        'ped-niedobor-gh-q5'
      ),
    ],
  },
  {
    id: 'ped-przedwczesne-pokwitanie-cpp',
    title: 'Przedwczesne dojrzewanie płciowe (CPP)',
    subtitle: 'Różnicowanie postaci centralnej (GnRH-zależnej) i obwodowej (GnRH-niezależnej)',
    group: 'Dojrzewanie i gonady',
    minutes: 17,
    goals: [
      'Zdefiniujesz granice wieku przedwczesnego dojrzewania u dziewcząt (<8 lat) i chłopców (<9 lat).',
      'Odróżnisz przedwczesne dojrzewanie centralne (CPP) od obwodowego (PPP) na podstawie testu z GnRH i USG.',
    ],
    sections: [
      {
        title: 'Kryteria wieku i sekwencja objawów',
        text: 'Przedwczesne dojrzewanie płciowe rozpoznaje się przy pojawieniu się wtórnych cech płciowych przed ukończeniem 8. roku życia u dziewcząt (thelarche – powiększenie gruczołów piersiowych) oraz przed ukończeniem 9. roku życia u chłopców (powiększenie objętości jąder ≥4 ml wg orchidometru Pradera). Izolowane wczesne owłosienie łonowe (premature adrenarche) lub izolowany rozwój gruczołów piersiowych (premature thelarche) bez przyspieszenia tempa wzrastania i bez zaawansowania wieku kostnego to łagodne warianty rozwojowe, niewymagające hamowania farmakologicznego.',
      },
      {
        title: 'Postać centralna (CPP) vs obwodowa (PPP)',
        text: 'Przedwczesne dojrzewanie centralne (CPP, rzekome prawdziwe) wynika z przedwczesnej aktywacji generatora pulsów GnRH w podwzgórzu. Charakteryzuje się podwyższonym podstawowym stężeniem LH (>0,2–0,3 IU/l) oraz gwałtownym wyrzutem LH w teście stymulacji analogiem GnRH (LH peak >5 IU/l). W postaci obwodowej (PPP, pseudopubertas praecox) źródłem hormonów płciowych są gonady lub nadnercza autonomicznie wydzielające estrogeny/androgeny (torbiele jajnika, guzy z komórek Leydiga, wrodzony przerost nadnerczy, zespół McCune-Albrighta). W PPP stężenia gonadotropin LH i FSH są trwale zahamowane w ujemnym sprzężeniu zwrotnym.',
      },
      {
        title: 'Leczenie analogami GnRH i ochrona wzrostu ostatecznego',
        text: 'Nieleczone CPP prowadzi do przedwczesnego zarośnięcia nasad kości długich pod wpływem wysokich stężeń estrogenów. Początkowe przyspieszenie tempa wzrastania ustępuje przedwczesnemu zakończeniu wzrostu, skutkując niskorosłością w życiu dorosłym. Leczeniem z wyboru w CPP są długodziałające analogi GnRH o przedłużonym uwalnianiu (np. octan leuproreliny, tryptorelina co 4 lub 12 tygodni). Ciągła stymulacja receptora GnRH-R prowadzi do jego desensytyzacji i internalizacji, całkowicie blokując wyrzut LH/FSH i zatrzymując dojrzewanie.',
      },
    ],
    table: {
      headers: ['Cecha różnicująca', 'Postać centralna (CPP, GnRH-zależna)', 'Postać obwodowa (PPP, GnRH-niezależna)'],
      rows: [
        ['Bodziec inicjujący', 'Aktywacja pulsatora GnRH w podwzgórzu', 'Autonomiczne wydzielanie steroidów (nadnercza/gonady)'],
        ['Test z analogiem GnRH', 'Wyraźny wyrzut LH (szczyt >5 IU/l)', 'Zahamowanie LH i FSH (brak odpowiedzi)'],
        ['Objętość jąder u chłopców', 'Symetrycznie powiększone (≥4 ml)', 'Małe prepubertalne (<4 ml) lub asymetria (guz)'],
        ['Etiologia organiczna', 'U dziewcząt w ~90% idiopatyczna; u chłopców >50% OUN (hamartoma)', 'Torbiele jajnika, CAH, zespół McCune-Albrighta, guzy'],
        ['Leczenie przyczynowe', 'Analogi GnRH depot (desensytyzacja)', 'Leczenie choroby podstawowej (antyandrogeny, inhibitory aromatazy)'],
      ],
    },
    advanced:
      'U każdego chłopca z CPP oraz u dziewcząt poniżej 6. roku życia bezwzględnie wymagane jest badanie MRI mózgowia. Najczęstszą organiczną przyczyną CPP jest hamartoma podwzgórza (guz z komórek glejowych zawierający ektopowy generator GnRH, nieulegający progresji nowotworowej, często związany z napadami śmiechu – gelastic seizures).',
    summary:
      'Granice CPP to <8 lat u dziewcząt i <9 lat u chłopców. Wyrzut LH w teście z GnRH potwierdza CPP; zahamowane gonadotropiny wskazują na PPP. Złotym standardem są analogi GnRH.',
    sourceIds: ['espe_cpp'],
    questions: [
      q(
        'Przed którym rokiem życia pojawienie się thelarche u dziewczynki definiuje przedwczesne dojrzewanie?',
        ['Przed ukończeniem 8. roku życia', 'Jest to międzynarodowy punkt odcięcia przyjęty przez ESPE i PES.'],
        ['Przed ukończeniem 10. roku życia', '10 lat to typowy fizjologiczny wiek początku pokwitania.'],
        ['Przed ukończeniem 6. roku życia', 'Wiek <6 lat to kryterium skrajnie wczesnego dojrzewania o najwyższym ryzyku organicznym.'],
        'ped-przedwczesne-pokwitanie-q1'
      ),
      q(
        'Jaki wynik testu z analogiem GnRH potwierdza postać centralną (CPP)?',
        ['Szczyt LH > 5 IU/l z przewagą LH nad FSH', 'Wskazuje to na dojrzałą, aktywną rezerwę gonadotropową przysadki.'],
        ['Trwałe niewykrywalne stężenie LH < 0,1 IU/l', 'Taki wynik charakteryzuje postać obwodową (PPP) lub brak dojrzewania.'],
        ['Wybiórczy wyrzut TSH', 'GnRH stymuluje komórki gonadotropowe, nie tyreotropowe.'],
        'ped-przedwczesne-pokwitanie-q2'
      ),
      q(
        'Jaki jest mechanizm działania długodziałających analogów GnRH w leczeniu CPP?',
        ['Ciągła stymulacja receptora GnRH-R wywołuje jego desensytyzację i spadek LH/FSH', 'Znosi to pulsacyjny sygnał niezbędny do stymulacji komórek gonadotropowych.'],
        ['Bezpośrednia blokada receptorów estrogenowych w piersiach', 'Analogi GnRH działają na przysadkę, nie na receptory estrogenowe.'],
        ['Hamowanie aromatazy w tkance tłuszczowej', 'Analogi nie są inhibitorami enzymów steroidogenezy.'],
        'ped-przedwczesne-pokwitanie-q3'
      ),
      q(
        'U 6-letniego chłopca stwierdzono owłosienie łonowe i prącie wielkości dorosłego, ale jądra mają po 2 ml. Co to sugeruje?',
        ['Postać obwodową przedwczesnego dojrzewania (np. WPN lub guz nadnercza)', 'Brak powiększenia jąder wskazuje, że androgeny nie pochodzą z aktywacji przysadkowo-gonadalnej.'],
        ['Centralne przedwczesne dojrzewanie idiopatyczne', 'W CPP pierwszym objawem u chłopców jest symetryczny wzrost jąder ≥4 ml.'],
        ['Fizjologiczny wariant normy rozwojowej', 'Zaawansowana wirylizacja w wieku 6 lat jest zawsze zjawiskiem patologicznym.'],
        'ped-przedwczesne-pokwitanie-q4'
      ),
      q(
        'Jaka jest najczęstsza nienowotworowa anomalia OUN wywołująca CPP u małych dzieci?',
        ['Hamartoma podwzgórza (hypothalamic hamartoma)', 'Wytwarza heterotopowe impulsy GnRH, często współistniejąc z napadami żelastycznymi.'],
        ['Glejak nerwu wzrokowego', 'Wiąże się typowo z neurofibromatozą typu 1 i utratą wzroku.'],
        ['Czaszkogardlak', 'Czaszkogardlak typowo prowadzi do niedoczynności przysadki i opóźnienia dojrzewania.'],
        'ped-przedwczesne-pokwitanie-q5'
      ),
    ],
  },
  {
    id: 'ped-opoznione-dojrzewanie-cdgp',
    title: 'Opóźnione dojrzewanie i hipogonadyzm',
    subtitle: 'Konstytucjonalne opóźnienie (CDGP) a hipogonadyzm hipo- i hipergonadotropowy',
    group: 'Dojrzewanie i gonady',
    minutes: 16,
    goals: [
      'Zdefiniujesz kryteria opóźnionego dojrzewania u dziewcząt (brak thelarche w wieku 13 lat) i chłopców (jądra <4 ml w wieku 14 lat).',
      'Przeprowadzisz diagnostykę różnicową między CDGP a wrodzonym hipogonadyzmem hipogonadotropowym (CHH / zespół Kallmanna).',
    ],
    sections: [
      {
        title: 'Definicje i ramy czasowe braku pokwitania',
        text: 'Opóźnione dojrzewanie płciowe (pubertas tarda) rozpoznaje się, gdy u dziewczynki nie stwierdza się cech thelarche w wieku 13 lat lub gdy od thelarche do menarche upłynęło ponad 4–5 lat. U chłopców kryterium stanowi brak powiększenia objętości jąder do co najmniej 4 ml w wieku 14 lat. Najczęstszą przyczyną (odpowiadającą za ponad 65% przypadków u chłopców i 30% u dziewcząt) jest konstytucjonalne opóźnienie wzrastania i dojrzewania (CDGP), będące wariantem prawidłowego rozwoju osobniczego o silnym podłożu rodzinnym.',
      },
      {
        title: 'Klasyfikacja etiologiczna: hipo- vs hipergonadotropowy',
        text: 'W diagnostyce kluczowe jest oznaczenie stężeń LH i FSH w surowicy krwi. Wysokie stężenia gonadotropin przy niskich hormonach płciowych definiują hipogonadyzm hipergonadotropowy (pierwotne uszkodzenie gonad: zespół Turnera 45,X u dziewcząt, zespół Klinefeltera 47,XXY u chłopców, stan po chemio/radioterapii). Niskie lub nieoznaczalne gonadotropiny wskazują na postać hipogonadotropową: przemijającą (CDGP, niedożywienie, anoreksja, przewlekłe choroby jelit) lub trwałą (wrodzony izolowany hipogonadyzm hipogonadotropowy CHH, zespół Kallmanna z anosmią/hiposmią, panhipopituitaryzm).',
      },
      {
        title: 'Diagnostyka różnicowa CDGP vs CHH i postępowanie',
        text: 'Odróżnienie CDGP od wrodzonego niedoboru GnRH (CHH) w wieku 14–16 lat bywa wyzwaniem, gdyż profile hormonalne mogą się pokrywać. Wskazówkami przemawiającymi za CHH są: zaburzenia węchu (hiposmia/anosmia w zespole Kallmanna), wnętrostwo lub mikropenis w wywiadzie noworodkowym, synkinezje rąk oraz brak progresji dojrzewania po 16–18 r.ż. W przypadku nasilonych problemów psychospołecznych u chłopców z CDGP >14. r.ż. stosuje się krótką kurację indukującą małymi dawkami estrów testosteronu (np. 50–100 mg domięśniowo raz w miesiącu przez 3–6 miesięcy), co przyspiesza wzrost bez przedwczesnego zrastania nasad.',
      },
    ],
    table: {
      headers: ['Postać kliniczna', 'Stężenie LH/FSH', 'Etiologia / Narząd uszkodzony', 'Cechy charakterystyczne', 'Postępowanie'],
      rows: [
        ['CDGP (wariant normy)', 'Niskie prepubertalne', 'Fizjologiczne opóźnienie generatora GnRH', 'Opóźniony wiek kostny, wywiad u rodziców', 'Obserwacja lub krótkie torowanie testosteronem'],
        ['Hipogonadyzm hipogonadotropowy (CHH)', 'Trwale niskie / nieoznaczalne', 'Podwzgórze / przysadka (mutacje ANOS1, FGFR1)', 'Anosmia (zespół Kallmanna), mikropenis w wywiadzie', 'Substytucja steroidowa, w przyszłości gonadotropiny'],
        ['Hipogonadyzm hipergonadotropowy', 'Znacznie podwyższone', 'Pierwotna dysgenezja / niewydolność gonad', 'Zespół Turnera, Klinefeltera, po naświetlaniu', 'Substytucja docelowa (estrogeny/androgeny)'],
      ],
    },
    advanced:
      'W różnicowaniu CDGP i CHH pomocne są nowe markery czynności komórek Sertoliego i ziarnistych: inhibina B oraz hormon antymüllerowski (AMH). U chłopców w wieku 12–14 lat stężenie inhibiny B w surowicy <35 pg/ml silnie przemawia za trwałym hipogonadyzmem hipogonadotropowym (CHH), podczas gdy wartości >60 pg/ml wskazują na prawidłową rezerwę jądrową w przebiegu CDGP.',
    summary:
      'Brak cech dojrzewania w wieku 13 lat u dziewcząt i 14 lat u chłopców to wskazanie do diagnostyki. Różnicuj CDGP z hipogonadyzmem hiper- i hipogonadotropowym (w tym zespołem Kallmanna).',
    sourceIds: ['espe_cpp', 'espe_growth'],
    questions: [
      q(
        'W jakim wieku brak powiększenia objętości jąder do ≥4 ml u chłopca definiuje opóźnione dojrzewanie?',
        ['W wieku ukończonych 14 lat', 'Jest to standardowa auksologiczna definicja braku pokwitania u chłopców.'],
        ['W wieku ukończonych 11 lat', 'W tym wieku brak cech dojrzewania jest w pełni fizjologiczny.'],
        ['W wieku ukończonych 17 lat', 'To wiek, w którym większość nastolatków osiąga już zaawansowane stadia pokwitania.'],
        'ped-opoznione-dojrzewanie-q1'
      ),
      q(
        'Jaki objaw pozagonadalny pozwala rozpoznać zespół Kallmanna u nastolatka z brakiem pokwitania?',
        ['Upośledzenie lub brak węchu (hiposmia / anosmia)', 'Wynika ze wspólnego zaburzenia embriogenezy neuronów GnRH i opuszek węchowych.'],
        ['Głuchota czuciowo-nerwowa', 'Nie jest składową klasycznego zespołu Kallmanna.'],
        ['Nietolerancja glukozy', 'Nie stanowi swoistego markera diagnostycznego zespołu Kallmanna.'],
        'ped-opoznione-dojrzewanie-q2'
      ),
      q(
        'Który wzorzec biochemiczny charakteryzuje zespół Turnera lub Klinefeltera?',
        ['Wysokie LH i FSH przy niskich steroidach płciowych (hipogonadyzm hipergonadotropowy)', 'Brak ujemnego sprzężenia zwrotnego z uszkodzonych gonad wywołuje hipersekrecję gonadotropin.'],
        ['Niskie LH i wysokie stężenie estradiolu', 'Taki profil nie występuje w dysgenezji gonad.'],
        ['Niewykrywalne stężenie LH, FSH i prolaktyny', 'Wskazywałoby na uszkodzenie przysadki, nie pierwotną dysgenezję gonadalną.'],
        'ped-opoznione-dojrzewanie-q3'
      ),
      q(
        'Jak postępuje się u 15-letniego chłopca z CDGP cierpiącego na nasilone wycofanie rówieśnicze?',
        ['Stosuje się krótką kurację małymi dawkami testosteronu przez 3–6 miesięcy', 'Przyspiesza to tempo wzrostu i inicjuje drugorzędowe cechy bez utraty wzrostu ostatecznego.'],
        ['Od razu wdraża się dożywotnie leczenie substytucyjne pełnymi dawkami', 'CDGP jest wariantem normy; pełna substytucja zablokowałaby własną oś.'],
        ['Stosuje się wysokie dawki analogów GnRH', 'Analogi GnRH pogłębiłyby zahamowanie pokwitania.'],
        'ped-opoznione-dojrzewanie-q4'
      ),
      q(
        'Który marker osoczowy produkowany przez komórki Sertoliego wspiera zachowaną czynność jąder w diagnostyce CDGP?',
        ['Inhibina B', 'Prawidłowe stężenie inhibiny B przemawia za CDGP, a bardzo niskie za trwałym CHH.'],
        ['Globulina SHBG', 'Jest białkiem transportowym produkowanym w wątrobie.'],
        ['Adiponektyna', 'Jest adipokiną tkanki tłuszczowej, nie markerem komórek Sertoliego.'],
        'ped-opoznione-dojrzewanie-q5'
      ),
    ],
  },
  {
    id: 'ped-wrodzona-niedoczynnosc-tarczycy',
    title: 'Wrodzona niedoczynność tarczycy (CH)',
    subtitle: 'Screening noworodkowy na bibule, okno neuroprotekcyjne i wczesna substytucja LT4',
    group: 'Tarczyca i metabolizm',
    minutes: 17,
    goals: [
      'Wyjaśnisz zasady screeningu noworodkowego w kierunku wrodzonej niedoczynności tarczycy (TSH w 3.–5. dobie życia).',
      'Wdrożysz natychmiastową substytucję lewotyroksyną w dawce neuroprotekcyjnej (10–15 µg/kg/d).',
    ],
    sections: [
      {
        title: 'Screening populacyjny z suchej kropli krwi (bibuła)',
        text: 'Wrodzona niedoczynność tarczycy (congenital hypothyroidism, CH) występuje z częstością około 1:2000–1:3000 żywych urodzeń i stanowi najczęstszą zapobiegawczą przyczynę nieodwracalnej niepełnosprawności intelektualnej. W Polsce krew na bibułę filtracyjną pobiera się w 3.–5. dobie życia. Odroczenie pobrania do minimum 48–72 godzin po porodzie jest krytyczne, aby uniknąć fałszywie dodatnich rozpoznań związanych z fizjologicznym wyrzutem TSH u noworodka (neonatal TSH surge w pierwszych godzinach po urodzeniu). Wartość odcięcia TSH na bibule wynosi typowo >10–15 mIU/l krwi pełnej.',
      },
      {
        title: 'Etiologia: dysgenezja vs dyshormonogeneza',
        text: 'Około 80–85% przypadków pierwotnej CH wynika z dysgenezji gruczołu tarczowego: agenezji (całkowitego braku tarczycy), hipoplazji lub ektopii (najczęściej podjęzykowej). Pozostałe 15–20% to wrodzone defekty syntezy hormonów (dyshormonogeneza), dziedziczone autosomalnie recesywnie (mutacje TPO, tyreoglobuliny TG, symportera sodowo-jodkowego NIS lub enzymu DUOX2). W dysgenezji tarczyca w badaniu USG szyi jest niewidoczna lub szczątkowa, natomiast w dyshormonogenezie występuje wole noworodkowe.',
      },
      {
        title: 'Natychmiastowe leczenie i okno neuroprotekcyjne',
        text: 'Hormony tarczycy są bezwzględnie konieczne dla mielinizacji włókien nerwowych i migracji neuroblastów w rozwijającym się mózgu. Każdy dzień opóźnienia substytucji w pierwszych tygodniach życia wiąże się z utratą punktów ilorazu inteligencji (IQ). Po stwierdzeniu podwyższonego TSH w surowicy i niskiego FT4 należy natychmiast (najlepiej przed ukończeniem 14. doby życia) wdrożyć lewotyroksynę w wysokiej dawce początkowej: 10–15 µg/kg m.c./dobę w postaci tabletki rozkruszonej w kilku kroplach wody lub mleka matki, dążąc do szybkiej normalizacji FT4 w ciągu 7–14 dni.',
      },
    ],
    table: {
      headers: ['Parametr kliniczny', 'Postępowanie / Interpretacja', 'Uzasadnienie fizjologiczne'],
      rows: [
        ['Czas pobrania bibuły', '3.–5. doba życia (po 48h)', 'Uniknięcie fizjologicznego poporodowego wyrzutu TSH (TSH surge)'],
        ['Dawka początkowa LT4', '10–15 µg/kg masy ciała / dobę', 'Szybkie wysycenie receptorów mózgowych w oknie neurogenezy'],
        ['Cel kontroli w 2. tyg.', 'FT4 w górnej połowie normy dla wieku', 'Zapewnienie maksymalnej neuroprotekcji OUN'],
        ['Diagnostyka USG / scyntygrafia', 'Nie opóźniać wdrożenia leczenia!', 'Różnicowanie ektopii/agenezji można wykonać po wdrożeniu LT4'],
      ],
    },
    advanced:
      'W przypadku podejrzenia wtórnej (ośrodkowej) wrodzonej niedoczynności tarczycy screening oparty wyłącznie na TSH nie wykryje zaburzenia (stężenie TSH jest niskie lub nieadekwatnie prawidłowe przy skrajnie niskim FT4). Ośrodkowa niedoczynność tarczycy u noworodka często współistnieje z wrodzoną niedoczynnością kory nadnerczy w przebiegu hipoplazji przysadki lub dysplazji przegrodowo-ocznej (zespół de Morsiera). Podanie LT4 przed zabezpieczeniem hydrokortyzonem grozi wywołaniem śmiertelnego przełomu nadnerczowego.',
    summary:
      'Screening w 3.–5. dobie życia chroni mózg noworodka. Wdrożenie LT4 w dawce 10–15 µg/kg/d przed 14. dniem życia zapobiega nieodwracalnemu uszkodzeniu intelektu.',
    sourceIds: ['espe_hypothyroid'],
    questions: [
      q(
        'Dlaczego krew na bibułę w screeningu wrodzonej niedoczynności tarczycy pobiera się w 3.–5. dobie, a nie w pierwszych godzinach po porodzie?',
        ['Aby uniknąć fizjologicznego wyrzutu TSH u noworodka (neonatal TSH surge)', 'W pierwszych godzinach TSH fizjologicznie rośnie gwałtownie do >50–80 mIU/l.'],
        ['Ponieważ we krwi pępowinowej nie ma w ogóle TSH', 'TSH jest obecne, ale natychmiastowy skok porodowy daje wyniki fałszywie dodatnie.'],
        ['Żeby poczekać na całkowite wydalenie matczynego TSH', 'TSH matki nie przenika przez barierę łożyskową.'],
        'ped-wrodzona-niedoczynnosc-q1'
      ),
      q(
        'Jaka jest zalecana początkowa dawka lewotyroksyny w potwierdzonej wrodzonej niedoczynności tarczycy u noworodka?',
        ['10–15 µg/kg m.c./dobę', 'Wysoka dawka jest konieczna dla natychmiastowej normalizacji FT4 w krytycznym oknie mielinizacji OUN.'],
        ['1,6 µg/kg m.c./dobę', 'Jest to dawka docelowa dla dorosłych, całkowicie niewystarczająca u noworodka.'],
        ['0,5 µg/kg m.c./dobę', 'Zbyt niska dawka doprowadziłaby do trwałego upośledzenia rozwoju umysłowego.'],
        'ped-wrodzona-niedoczynnosc-q2'
      ),
      q(
        'Co stanowi najczęstszą przyczynę wrodzonej niedoczynności tarczycy (odpowiadającą za ~80% przypadków)?',
        ['Dysgenezja tarczycy (ektopia, hipoplazja, agenezja)', 'Wady rozwojowe narządu dominują nad defektami enzymatycznymi.'],
        ['Choroba Hashimoto u matki', 'Przeciwciała matczyne mogą dać postać przejściową, ale nie dominują w etiologii pierwotnej.'],
        ['Mutacja receptora TSH u ojca', 'Dziedziczenie receptorowe stanowi znikomy odsetek rzadkich postaci.'],
        'ped-wrodzona-niedoczynnosc-q3'
      ),
      q(
        'Do którego dnia życia wdrożenie substytucji LT4 gwarantuje optymalny rozwój neuropsychologiczny dziecka?',
        ['Przed ukończeniem 14. doby życia', 'Wdrożenie leczenia w pierwszych 2 tygodniach życia zapobiega deficytom poznawczym.'],
        ['Dopiero po 3. miesiącu życia', 'Po 3 miesiącach dochodzi do nieodwracalnych uszkodzeń kory mózgu.'],
        ['Przed ukończeniem 1. roku życia', 'Opóźnienie o rok skutkuje ciężkim kretynizmem tarczycowym.'],
        'ped-wrodzona-niedoczynnosc-q4'
      ),
      q(
        'Jakie zagrożenie niesie wdrożenie LT4 u noworodka z podejrzeniem mnogiej niedoczynności przysadki przed oceną osi HPA?',
        ['Wywołanie ostrego przełomu nadnerczowego poprzez przyspieszenie metabolizmu kortyzolu', 'Tyroksyna indukuje klirens kortyzolu; w hipokortyzolemii należy najpierw podać hydrokortyzon.'],
        ['Wywołanie przełomu hiperkalcemicznego', 'Tyroksyna nie indukuje ostrej hiperkalcemii u noworodka.'],
        ['Zarośnięcie ciemiączka w 1. dobie', 'Proces zarastania szwów jest długofalowy.'],
        'ped-wrodzona-niedoczynnosc-q5'
      ),
    ],
  },
  {
    id: 'ped-wpn-noworodek-przelom',
    title: 'Wrodzony przerost nadnerczy u noworodka',
    subtitle: 'Niedobór 21-hydroksylazy, postać z utratą soli, 17-OHP i przełom solny',
    group: 'Nadnercza i steroidy',
    minutes: 18,
    goals: [
      'Rozpoznasz klasyczną postać wrodzonego przerostu nadnerczy z utratą soli (salt-wasting CAH) u noworodka.',
      'Wdrożysz natychmiastowe postępowanie w przełomie nadnerczowym: płynoterapię, hydrokortyzon i fludrokortyzon.',
    ],
    sections: [
      {
        title: 'Blok enzymatyczny 21-hydroksylazy (CYP21A2)',
        text: 'Ponad 95% przypadków wrodzonego przerostu nadnerczy (CAH) wynika z mutacji genu CYP21A2 kodującego 21-hydroksylazę steroidową. Brak tego enzymu uniemożliwia konwersję 17-hydroksyprogesteronu (17-OHP) w 11-deoksykortyzol (szlak kortyzolu) oraz progesteronu w 11-deoksykortykosteron (szlak aldosteronu). Niedobór kortyzolu znosi ujemne sprzężenie zwrotne, prowadząc do masywnego wyrzutu ACTH z przysadki. ACTH pobudza korę nadnerczy, a nagromadzone prekursory zostają przesunięte do nieuszkodzonego szlaku androgenowego (DHEA, androstendion, testosteron).',
      },
      {
        title: 'Postać z utratą soli (salt-wasting) vs postać prosta wirylizująca',
        text: 'W klasycznej postaci z utratą soli (około 75% chorych) całkowity brak aldosteronu prowadzi w 1.–3. tygodniu życia do nerkowej utraty sodu i wody oraz retencji potasu. U noworodka rozwija się hiponatremia, hiperkaliemia, kwasica metaboliczna, odwodnienie, apatia, wymioty i zapaść naczyniowa. U dziewczynek (kariotyp 46,XX) nadmiar androgenów w życiu płodowym powoduje wirylizację narządów płciowych (przerost łechtaczki, zrost warg sromowych, wspólne ujście moczowo-płciowe – skala Pradera I–V). U chłopców (46,XY) narządy płciowe są prawidłowe, co stwarza śmiertelną pułapkę diagnostyczną: chłopiec może trafić do szpitala w stanie wstrząsu z błędnym podejrzeniem posocznicy lub zwężenia odźwiernika!',
      },
      {
        title: 'Leczenie przełomu solnego i substytucja przewlekła',
        text: 'W ostrym przełomie solnym postępowaniem ratującym życie jest natychmiastowy wlew 0,9% NaCl z 5% glukozą (resuscytacja płynowa i korekta hipoglikemii) oraz podanie hydrokortyzonu dożylnie w bolusie (25–50 mg), a następnie we wlewie ciągłym lub dawkach podzielonych. Po opanowaniu wstrząsu wdraża się przewlekłą substytucję: doustny hydrokortyzon w dawkach fizjologicznych (10–15 mg/m² m.c./d w 3 dawkach w celu supresji ACTH i androgenów), fludrokortyzon (mineralokortykoid, 0,05–0,2 mg/d) oraz suplementację chlorku sodu (1–2 g NaCl/dobę) u niemowląt.',
      },
    ],
    table: {
      headers: ['Cecha kliniczna / laboratoryjna', 'Postać z utratą soli (SW)', 'Postać prosta wirylizująca (SV)', 'Postać nieklasyczna (NC-CAH)'],
      rows: [
        ['Aktywność 21-hydroksylazy', '0% (całkowity brak)', '1–2% (śladowa resztkowa)', '20–50% (częściowy defekt)'],
        ['Gospodarka wodno-elektrolitowa', 'Hiponatremia, hiperkaliemia, zapaść', 'Prawidłowa (brak utraty soli)', 'Prawidłowa'],
        ['Wirylizacja u noworodków 46,XX', 'Nasilona (skala Pradera III–V)', 'Obecna (skala Pradera I–III)', 'Brak wirylizacji przy urodzeniu'],
        ['Zagrożenie życia u noworodka', 'Śmiertelny przełom w 1.–3. tyg. życia', 'Brak przełomu solnego', 'Brak zagrożenia życia'],
        ['Stężenie 17-OHP', 'Masywnie podwyższone (>100 ng/ml)', 'Wysokie (>10–20 ng/ml)', 'Podwyższone w teście z Synacthenem'],
      ],
    },
    advanced:
      'Skrining noworodkowy CAH opiera się na oznaczeniu 17-OHP w suchej kropli krwi metodą immunoenzymatyczną (DELFIA) lub LC-MS/MS. U wcześniaków i dzieci z niską masą urodzeniową stężenia 17-OHP są fizjologicznie wyższe z powodu niedojrzałości wątrobowego klirensu i stresu okołoporodowego; dlatego normy odcięcia 17-OHP muszą być bezwzględnie stratyfikowane względem masy urodzeniowej i dojrzałości ciążowej.',
    summary:
      'Brak 21-hydroksylazy wywołuje brak kortyzolu/aldosteronu i nadmiar androgenów. U chłopców brak wad narządów płciowych grozi przeoczeniem przełomu solnego (hiponatremia + hiperkaliemia).',
    sourceIds: ['cah_pediatric'],
    questions: [
      q(
        'Który zestaw zaburzeń elektrolitowych u 2-tygodniowego noworodka wskazuje na przełom w przebiegu CAH z utratą soli?',
        ['Ciężka hiponatremia z hiperkaliemią i kwasicą metaboliczną', 'Wynika to z całkowitego braku aldosteronu stymulującego nerkowe wchłanianie Na+ i wydalanie K+.'],
        ['Hipernatremia z hipokaliemią', 'Występuje w hiperaldosteronizmie, nie w jego niedoborze.'],
        ['Izolowana hiperkalcemia z hipofosfatemizją', 'To cecha nadczynności przytarczyc, nie CAH.'],
        'ped-wpn-noworodek-q1'
      ),
      q(
        'Dlaczego noworodek płci męskiej (46,XY) z postacią z utratą soli jest w grupie szczególnego ryzyka zgonu w 2. tygodniu życia?',
        ['Ponieważ ma prawidłowe męskie narządy płciowe i wada nie wzbudza czujności przy urodzeniu', 'Wymioty i zapaść bywają błędnie diagnozowane jako sepsa lub zwężenie odźwiernika.'],
        ['Ponieważ u chłopców CAH przebiega zawsze ciężej niż u dziewczynek', 'Nasilenie enzymatyczne zależy od mutacji, ale dziewczynki chroni wczesna diagnoza z powodu obojnaczych narządów płciowych.'],
        ['Ponieważ chłopcy nie posiadają kory nadnerczy', 'Kora nadnerczy jest obecna, lecz przerośnięta i zablokowana enzymatycznie.'],
        'ped-wpn-noworodek-q2'
      ),
      q(
        'Nagromadzenie którego metabolitu steroidogenezy jest podstawowym markerem laboratoryjnym niedoboru 21-hydroksylazy?',
        ['17-hydroksyprogesteron (17-OHP)', 'Substrat zablokowanego enzymu CYP21A2 kumuluje się w stężeniach sięgających setek ng/ml.'],
        ['Aldosteron', 'Stężenie aldosteronu jest skrajnie obniżone w postaci klasycznej.'],
        ['Kortyzol', 'Kortyzol jest produktem za blokiem enzymatycznym i jego stężenie jest zredukowane.'],
        'ped-wpn-noworodek-q3'
      ),
      q(
        'Jaki lek należy natychmiast podać dożylnie w zagrażającym życiu przełomie solnym u noworodka z CAH?',
        ['Hydrokortyzon w bolusie wraz z wlewem 0,9% NaCl i 5% glukozy', 'Zabezpiecza działanie glukokortykoidowe i resuscytację wstrząsu hipowolemicznego.'],
        ['Dexametazon doustnie w małej dawce', 'Wstrząs wymaga natychmiastowej drogi dożylnej i preparatu o działaniu mineralokortykoidowym.'],
        ['Tiamazol dożylnie', 'Tiamazol jest tyreostatykiem i nie ma zastosowania w CAH.'],
        'ped-wpn-noworodek-q4'
      ),
      q(
        'Jaki jest cel przewlekłego stosowania hydrokortyzonu u dzieci z klasycznym wrodzonym przerostem nadnerczy?',
        ['Zastąpienie niedoboru kortyzolu oraz supresja nadmiernego wydzielania ACTH i androgenów nadnerczowych', 'Hamuje to postępującą wirylizację i przedwczesne zrastanie nasad kostnych.'],
        ['Wywołanie trwałej cukrzycy posteroidowej', 'Jest to powikłanie przedawkowania, nie cel leczenia.'],
        ['Zahamowanie wydzielania hormonu wzrostu', 'Celem jest ochrona wzrostu ostatecznego, a nie jego zahamowanie.'],
        'ped-wpn-noworodek-q5'
      ),
    ],
  },
];
