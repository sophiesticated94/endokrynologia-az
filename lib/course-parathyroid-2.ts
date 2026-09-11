import { type DraftLesson, q } from './course-types.ts';

export const draftParathyroidPart2: DraftLesson[] = [
  {
    id: 'hipokalcemia-niedoczynnosc',
    title: 'Gdy gaśnie parathormon',
    subtitle: 'Niedoczynność przytarczyc, APS-1 i substytucja aktywną witaminą D',
    group: 'Niedoczynności i tężyczka',
    minutes: 15,
    goals: [
      'Poznasz najczęstsze przyczyny nabytej i wrodzonej niedoczynności przytarczyc.',
      'Opanujesz zasady bezpiecznej substytucji aktywnej witaminy D i soli wapnia.',
      'Zrozumiesz ryzyko hiperkalciurii i nefrokalcynozy przy braku nerkowego działania PTH.',
    ],
    sections: [
      {
        title: 'Etiologia: chirurgia szyi na pierwszym miejscu',
        text: 'Niedoczynność przytarczyc (hipoparatyreoza) charakteryzuje się niedoborem lub brakiem parathormonu (iPTH < 10–15 pg/ml) przy współistniejącej hipokalcemii i hiperfosfatemii. Ponad 75% wszystkich przypadków u dorosłych to niedoczynność pooperacyjna, będąca powikłaniem całkowitej tyreoidektomii (z powodu wola guzkowego lub raka tarczycy) lub powtórnych operacji w obrębie szyi. Dochodzi wówczas do niezamierzonego wycięcia, podwiązania naczyń zaopatrujących lub niedokrwienia przytarczyc. Rzadsze przyczyny obejmują podłoże autoimmunologiczne (izolowane lub w zespole autoimmunologicznej poliendokrynopatii typu 1 — APS-1 z mutacją genu AIRE), hemochromatozę (odkładanie żelaza) oraz chorobę Wilsona.',
      },
      {
        title: 'Paradoks braku PTH w nerkach: pułapka nefrokalcynozy',
        text: 'W warunkach fizjologicznych PTH stymuluje wchłanianie zwrotne wapnia w cewkach dalszych nerek. Gdy brakuje parathormonu, nerkowy próg wydalania wapnia drastycznie spada. Jeżeli w trakcie leczenia substytucyjnego podamy zbyt duże dawki wapnia i aktywnej witaminy D, dążąc do „idealnego” stężenia wapnia w surowicy w środku normy, w nerkach dojdzie do masywnej hiperkalciurii. Rezultatem jest powstawanie obustronnej nefrokalcynozy, kamicy nerkowej i postępującej niewydolności nerek. Z tego powodu wytyczne ESE zalecają cel terapeutyczny stężenia wapnia w surowicy w dolnej granicy normy lub tuż poniżej (8,0–8,5 mg/dl / 2,0–2,15 mmol/l), przy braku objawów tężyczkowych.',
      },
      {
        title: 'Standard leczenia przewlekłego wg wytycznych ESE',
        text: 'Ponieważ w niedoczynności przytarczyc brakuje enzymu 1alfa-hydroksylazy (zależnego od PTH), zwykły cholekalcyferol (witamina D3) jest nieskuteczny w monoterapii. Leczeniem z wyboru są aktywne metabolity lub analogi witaminy D: alfakalcydol (1alfa-OH-D3) w dawce 0,5–3,0 µg/d lub kalcytriol (1,25(OH)2D3) w dawce 0,25–1,5 µg/d, podawane łącznie z doustnym węglanem wapnia (1000–2000 mg Ca elementarnego na dobę w dawkach podzielonych w trakcie posiłków). Konieczne jest okresowe monitorowanie dobowego wydalania wapnia w moczu (DZM) z celem <4 mg/kg m.c./dobę (<300 mg/d u mężczyzn, <250 mg/d u kobiet); przy hiperkalciurii dołącza się diuretyk tiazydowy (np. hydrochlorotiazyd 25–50 mg/d), który nasila cewkowe wchłanianie wapnia.',
      },
    ],
    table: {
      headers: ['Parametr monitorowania', 'Cel terapeutyczny wg ESE', 'Niebezpieczeństwo przekroczenia'],
      rows: [
        ['Wapń całkowity w surowicy', 'Dolna granica normy: 8,0–8,5 mg/dl (2,0–2,15 mmol/l)', 'Hiperkalciuria, nefrokalcynoza, uszkodzenie nerek'],
        ['Wapń zjonizowany (Ca2+)', 'Dolna granica normy (1,10–1,15 mmol/l)', 'Zwapnienia w OUN (zespół Fahra) przy przewlekłym przedawkowaniu'],
        ['Wydalanie wapnia w DZM', '< 4 mg/kg m.c./24h (< 250–300 mg/24h)', 'Kamica nerkowa, niewydolność nerek'],
        ['Iloczyn Ca x P', '< 55 mg2/dl2 (< 4,4 mmol2/l2)', 'Ektopowe zwapnienia w gałkach ocznych (zaćma) i naczyniach'],
      ],
    },
    advanced:
      'W zespole autoimmunologicznej poliendokrynopatii typu 1 (APS-1 / APECED) niedoczynność przytarczyc współistnieje z przewlekłą kandydozą błon śluzowych i skóry oraz chorobą Addisona. W ciężkich postaciach hipoparatyreozy opornych na wysokie dawki kalcytriolu i wapnia, gdy nie udaje się opanować hiperkalciurii, nowoczesną opcją jest rekombinowany ludzki parathormon (rhPTH 1-84), który przywraca fizjologiczne wchłanianie wapnia w nerkach.',
    summary:
      'Niedoczynność przytarczyc (najczęściej pooperacyjna) wymaga leczenia aktywną witaminą D (alfakalcydol/kalcytriol) i węglanem wapnia. Celem jest dolna granica normy wapnia (8,0–8,5 mg/dl), by chronić nerki przed hiperkalciurią i nefrokalcynozą.',
    sourceIds: ['ese_hypopara', 'asbmr_calcium'],
    questions: [
      q(
        'Jaki jest cel terapeutyczny stężenia wapnia całkowitego w surowicy u dorosłego pacjenta z przewlekłą niedoczynnością przytarczyc wg wytycznych ESE?',
        ['Dolna granica normy lub tuż poniżej: 8,0–8,5 mg/dl (2,0–2,15 mmol/l)', 'Taki zakres zapobiega objawom tężyczki, jednocześnie minimalizując ryzyko hiperkalciurii i nefrokalcynozy.'],
        ['Środek lub górna granica normy: 9,8–10,5 mg/dl', 'Dążenie do wysokiego wapnia przy braku PTH wywołuje masywną hiperkalciurię i uszkodzenie nerek.'],
        ['Głęboka hipokalcemia <7,0 mg/dl z obecnością objawów tężyczkowych', 'Objawowa tężyczka zagraża skurczem krtani i zaburzeniami rytmu serca, jest więc niedopuszczalna.']
      ),
      q(
        'Dlaczego w niedoczynności przytarczyc zwykły cholekalcyferol (witamina D3) w monoterapii nie pozwala wyrównać hipokalcemii?',
        ['Brak parathormonu uniemożliwia nerkową 1alfa-hydroksylację do aktywnego kalcytriolu', 'PTH jest bezpośrednim induktorem enzymu CYP27B1 w cewkach nerkowych; bez niego witamina D nie ulega aktywacji.'],
        ['Ponieważ cholekalcyferol jest niszczony przez komórki tarczycy', 'Cholekalcyferol nie ma związku z destrukcją w tarczycy; problemem jest brak enzymatycznej hydroksylacji.'],
        ['Cholekalcyferol obniża stężenie wapnia w przewodzie pokarmowym', 'Witamina D zawsze promuje wchłanianie wapnia, o ile zostanie przekształcona do aktywnej formy.']
      ),
      q(
        'Jakie badanie moczu jest obligatoryjne w monitorowaniu bezpieczeństwa leczenia hipoparatyreozy?',
        ['Dobowa zbiórka moczu na wydalanie wapnia (DZM Ca)', 'Monitorowanie kalciurii chroni miąższ nerkowy przed nieodwracalną nefrokalcynozą.'],
        ['Oznaczenie stężenia glukozy w porannej próbce moczu', 'Glukozuria nie odzwierciedla gospodarki mineralnej.'],
        ['Czystość mikrobiologiczna osadu moczu', 'Posiew moczu wykrywa infekcje, ale nie ocenia nerkowej ucieczki wapnia.']
      ),
      q(
        'Który lek moczopędny można zastosować u chorego z niedoczynnością przytarczyc w celu zmniejszenia hiperkalciurii?',
        ['Hydrochlorotiazyd (diuretyk tiazydowy)', 'Tiazydy zwiększają wchłanianie zwrotne wapnia w cewce dalszej, zmniejszając kalciurię i podnosząc stężenie Ca w surowicy.'],
        ['Furosemid (diuretyk pętlowy)', 'Furosemid nasila wydalanie wapnia z moczem (kalciurię) i pogłębiłby hipokalcemię!'],
        ['Spironolakton (antagonista aldosteronu)', 'Spironolakton oszczędza potas, ale nie wywiera bezpośredniego wpływu na cewkowe wchłanianie wapnia.']
      ),
      q(
        'Co wchodzi w skład klasycznej triady zespołu autoimmunologicznej poliendokrynopatii typu 1 (APS-1 / APECED)?',
        ['Przewlekła kandydoza śluzówkowo-skórna, niedoczynność przytarczyc i choroba Addisona', 'APS-1 jest uwarunkowany mutacją genu AIRE i manifestuje się tymi trzema schorzeniami od dzieciństwa.'],
        ['Choroba Hashimoto, cukrzyca typu 1 i bielactwo', 'To składowe zespołu APS-2 (zespołu Schmidta), a nie APS-1.'],
        ['Guz chromochłonny, rak rdzeniasty tarczycy i gruczolak przytarczyc', 'To zespół MEN2A, uwarunkowany mutacją protoonkogenu RET.']
      ),
    ],
  },
  {
    id: 'tezyczka-objawy',
    title: 'Gdy mięśnie tracą kontrolę: tężyczka',
    subtitle: 'Chvostek, Trousseau, próba ischemiczna i zaburzenia rytmu w EKG',
    group: 'Niedoczynności i tężyczka',
    minutes: 16,
    goals: [
      'Rozpoznasz kliniczne objawy tężyczki jawnej (skurcz mięśni, ręka położnika, skurcz krtani).',
      'Nauczysz się badać objaw Chvostka i objaw Trousseau w tężyczce utajonej.',
      'Połączysz hipokalcemię ze zmianami w EKG (wydłużenie odstępu ST i QTc).',
    ],
    sections: [
      {
        title: 'Fizjologiczny mechanizm nadpobudliwości nerwowo-mięśniowej',
        text: 'Wapń zjonizowany stabilizuje potencjał spoczynkowy błon komórkowych komórek nerwowych i mięśniowych poprzez blokowanie bramkowanych napięciem kanałów sodowych (NaV). Gdy stężenie Ca2+ w płynie pozakomórkowym spada, dochodzi do obniżenia progu pobudliwości neuronów — kanały sodowe otwierają się przy znacznie mniejszej depolaryzacji. Prowadzi to do spontanicznych, powtarzających się wyładowań salw potencjałów czynnościowych we włóknach nerwowych obwodowych, co klinicznie manifestuje się jako tężyczka (tetania): parestezje wokół ust i dystalnych części kończyn, drżenia mięśniowe oraz bolesne skurcze toniczno-kloniczne.',
      },
      {
        title: 'Napad tężyczki jawnej: od ręki położnika do skurczu krtani',
        text: 'Napad tężyczki jawnej rozpoczyna się zazwyczaj mrowieniem warg, języka i opuszek palców, po czym dołączają się symetryczne, silne skurcze mięśni. W obrębie kończyn górnych pojawia się charakterystyczna „ręka położnika” (zgięcie w stawach śródręczno-paliczkowych przy wyprostowanych stawach międzypaliczkowych i przywiedzionym kciuku). W kończynach dolnych dochodzi do skurczu końsko-szpotawe ("skurcz pedałowy"). Najgroźniejszym powikłaniem bezpośrednio zagrażającym uduszeniem jest skurcz głośni i mięśni krtani (laryngospasmus), manifestujący się świstem krtaniowym (stridor), wymagający natychmiastowej intubacji lub konikotomii.',
      },
      {
        title: 'Tężyczka utajona: objawy Chvostka, Trousseau i próba EMG',
        text: 'Gdy hipokalcemia jest łagodna lub rozwija się powoli, tężyczka przebiega w postaci utajonej. W badaniu fizykalnym poszukuje się: 1. Objawu Chvostka — uderzenie młoteczkiem perkusyjnym w pień nerwu twarzowego (2 cm do przodu od płatka ucha) wywołuje gwałtowny skurcz mięśni mimicznych twarzy (kącika ust, skrzydła nosa lub powieki; uwaga: występuje u 10–15% zdrowych osób). 2. Objawu Trousseau — uciśnięcie ramienia mankietem ciśnieniomierza powyżej ciśnienia skurczowego przez 3 minuty wywołuje niedokrwienie i wyzwala skurcz mięśni w postaci „ręki położnika” (objaw wysoce swoisty!). Złotym standardem potwierdzenia tężyczki utajonej jest próba tężyczkowa w elektromiografii (EMG), wykazująca typowe wieloiglicowe wyładowania dubletów i trypletów.',
      },
    ],
    table: {
      headers: ['Objaw kliniczny / próba', 'Sposób wykonania / manifestacja', 'Czułość i swoistość'],
      rows: [
        ['Objaw Chvostka', 'Uderzenie młoteczkiem w n. twarzowy (przed płatkiem ucha) -> skurcz kącika ust', 'Umiarkowanie czuły; nieswoisty (obecny u 10–15% zdrowych)'],
        ['Objaw Trousseau', 'Mankiet ciśnieniomierza napompowany >RR skurczowe przez 3 min -> „ręka położnika”', 'Bardzo wysoka swoistość (>95%) dla hipokalcemii'],
        ['Objaw Lusta', 'Uderzenie w nerw strzałkowy wspólny (poniżej głowy strzałki) -> odwiedzenie stopy', 'Pomocniczy objaw nadpobudliwości obwodowej'],
        ['Zapis EKG', 'Wydłużenie fazy plateau potencjału czynnościowego -> wydłużenie odstępu ST i QTc', 'Czuły marker elektrofizjologiczny (ryzyko torsade de pointes)'],
      ],
    },
    advanced:
      'Ciężka hipomagnezemia (<0,5 mmol/l) wywołuje zjawisko oporności na wapń: magnez jest kofaktorem niezbędnym do uwalniania PTH z ziarnistości komórek przytarczyc oraz do transdukcji sygnału przez receptor PTHR1 w nerkach i kościach. Próba wyrównania hipokalcemii samymi wlewami wapnia u pacjenta z hipomagnezemią będzie całkowicie nieskuteczna! Zawsze w pierwszej kolejności należy podać dożylnie siarczan magnezu (MgSO4).',
    summary:
      'Hipokalcemia zwiększa pobudliwość nerwowo-mięśniową. W badaniu szukaj objawu Trousseau (mankiet ciśnieniomierza) i Chvostka. W EKG hipokalcemia wydłuża odstęp ST/QTc. Zawsze kontroluj i wyrównuj magnez!',
    sourceIds: ['asbmr_calcium', 'ese_hypopara'],
    questions: [
      q(
        'W jaki sposób spadek stężenia wapnia zjonizowanego w surowicy wywołuje skurcze mięśniowe w tężyczce?',
        ['Obniża próg pobudliwości neuronów i włókien mięśniowych przez odblokowanie kanałów sodowych (NaV)', 'Brak zewnątrzkomórkowego wapnia ułatwia depolaryzację błony komórkowej i generowanie spontanicznych potencjałów.'],
        ['Całkowicie blokuje przewodnictwo nerwowe w synapsach', 'Blokada synaptyczna dałaby wiotkie porażenie mięśni, a nie skurcze tężyczkowe.'],
        ['Bezpośrednio niszczy receptory nikotynowe w płytce motorycznej', 'Wapń nie niszczy receptorów; modyfikuje jedynie potencjał progowy komórki.']
      ),
      q(
        'W jaki sposób prawidłowo bada się objaw Trousseau?',
        ['Uciśnięcie ramienia mankietem ciśnieniomierza powyżej ciśnienia skurczowego przez 3 minuty w poszukiwaniu „ręki położnika”', 'Niedokrwienie pnia nerwowego na ramieniu przy hipokalcemii wyzwala patognomoniczny skurcz zginaczy nadgarstka.'],
        ['Uderzenie młoteczkiem perkusyjnym w mięsień czworogłowy uda', 'To badanie odruchu kolanowego, a nie objawu Trousseau.'],
        ['Ucisk obu tętnic szyjnych jednocześnie przez 60 sekund', 'Taki manewr jest skrajnie niebezpieczny i może wywołać udar mózgu lub zatrzymanie krążenia!']
      ),
      q(
        'Jaka zmiana w elektrokardiogramie (EKG) jest najbardziej charakterystyczna dla ostrej hipokalcemii?',
        ['Wydłużenie odcinka ST i odstępu QTc', 'Niedobór wapnia wydłuża fazę plateau (fazę 2) potencjału czynnościowego kardiomiocytów komorowych.'],
        ['Skrócenie odstępu QTc poniżej 350 ms', 'Skrócenie QTc jest typowe dla hiperkalcemii, a nie hipokalcemii.'],
        ['Uniesienie odcinka ST w kształcie fali Osborna', 'Fala Osborna występuje w głębokiej hipotermii.']
      ),
      q(
        'Dlaczego u chorego z tężyczką i współistniejącą hipomagnezemią wlewy samego wapnia nie przynoszą poprawy klinicznej?',
        ['Niedobór magnezu blokuje wydzielanie PTH oraz wywołuje obwodową oporność tkanek na parathormon', 'Magnez jest kofaktorem adenylanocyklazy i szlaków sygnalizacyjnych PTH; bez Mg wyrównanie Ca jest niemożliwe.'],
        ['Magnez jest niezbędny do filtrowania moczu w kłębuszkach nerkowych', 'Filtracja kłębuszkowa nie zależy bezpośrednio od stężenia magnezu.'],
        ['Wapń w obecności hipomagnezemii natychmiast zamienia się w kryształy szczawianu', 'Hipomagnezemia nie wywołuje natychmiastowej krystalizacji wapnia w naczyniach.']
      ),
      q(
        'Który objaw napadu tężyczki stanowi bezpośrednie zagrożenie uduszeniem i zgonem pacjenta?',
        ['Skurcz głośni i mięśni krtani (laryngospasmus)', 'Skurcz krtani zamyka drogi oddechowe i wymaga natychmiastowej interwencji udrożnienia dróg oddechowych oraz wlewu 10% glukonianu wapnia i.v.'],
        ['Mrowienie wokół ust (paresthesia circumoralis)', 'Paresthesie są objawem zwiastunowym, ale nie zagrażają bezpośrednio asfiksją.'],
        ['Skurcz mięśni stopy w zgięciu podeszwowym', 'Skurcz stopy jest bolesny, lecz nie upośledza wentylacji płuc.']
      ),
    ],
  },
  {
    id: 'rzekoma-niedoczynnosc',
    title: 'Oporność na hormon: PHP',
    subtitle: 'Zespół Albrighta, gen GNAS, imprinting i fenotyp AHO',
    group: 'Niedoczynności i tężyczka',
    minutes: 15,
    goals: [
      'Zrozumiesz molekularny mechanizm oporności na PTH w rzekomej niedoczynności przytarczyc (PHP).',
      'Nauczysz się rozpoznawać cechy wrodzonej osteodystrofii Albrighta (fenotyp AHO).',
      'Poznasz zjawisko imprintingu genomowego genu GNAS (PHP-1a vs PPHP).',
    ],
    sections: [
      {
        title: 'Gdy parathormonu jest dużo, ale tkanki go nie słyszą',
        text: 'Rzekoma niedoczynność przytarczyc (PHP — Pseudohypoparathyroidism) to rzadka choroba genetyczna, w której pomimo wysokiego stężenia endogennego PTH w surowicy u pacjenta rozwija się obraz biochemiczny niedoczynności przytarczyc: hipokalcemia oraz hiperfosfatemia. Przyczyną jest obwodowa oporność tkanek docelowych (przede wszystkim cewek nerkowych) na działanie parathormonu, wywołana mutacją w genie GNAS (chromosom 20q13.3), kodującym podjednostkę alfa stymulującego białka G (Gs-alfa). Dochodzi do zablokowania szlaku cyklazy adenylowej i braku generowania cAMP po związaniu PTH z receptorem PTHR1.',
      },
      {
        title: 'Fenotyp wrodzonej osteodystrofii Albrighta (AHO)',
        text: 'W klasycznej postaci (PHP typ 1a) oporności hormonalnej towarzyszy charakterystyczny zespół wad dysmorficznych znany jako wrodzona osteodystrofia Albrighta (AHO — Albright Hereditary Osteodystrophy). Obejmuje on: niskorosłość, zaokrągloną twarz („księżyc w pełni”), otyłość centralną od wczesnego dzieciństwa, niepełnosprawność intelektualną o różnym nasileniu, podskórne zwapnienia lub kostnienia ektopowe oraz patognomoniczną brachydaktylię (skrócenie IV i V kości śródręcza i śródstopia, co przy zaciśnięciu dłoni w pięść objawia się dołkami w miejscu kostek — objaw Archibalda).',
      },
      {
        title: 'Fascynujące zjawisko imprintingu genomowego (piętnowania rodzicielskiego)',
        text: 'Ekspresja genu GNAS w nerkach, przysadce i tarczycy podlega zjawisku imprintingu matczynego — aktywna transkrypcyjnie jest wyłącznie kopia odziedziczona po matce (kopia ojcowska jest fizjologicznie wyciszona). Jeśli mutację inaktywującą GNAS przekaże MATKA, u dziecka rozwija się pełny obraz PHP-1a: fenotyp AHO ORAZ wielohormonalna oporność receptorowa (hipokalcemia z wysokim PTH, oporność na TSH imitująca wrodzoną niedoczynność tarczycy oraz oporność na GHRH i gonadotropiny). Jeśli tę samą mutację przekaże OJCIEC, u dziecka rozwija się rzekoma rzekoma niedoczynność przytarczyc (PPHP — Pseudopseudohypoparathyroidism): występuje fenotyp AHO, lecz gospodarka wapniowo-fosforanowa i stężenie PTH są całkowicie prawidłowe!',
      },
    ],
    table: {
      headers: ['Jednostka chorobowa', 'Pochodzenie mutacji GNAS', 'Fenotyp AHO', 'Gospodarka Ca-P / PTH', 'Oporność na inne hormony (TSH, GHRH)'],
      rows: [
        ['PHP typ 1a', 'Odziedziczona od MATKI', 'Obecny (brachydaktylia, niska sylwetka)', 'Hipokalcemia, hiperfosfatemia, wysoki PTH', 'Obecna (oporność na TSH, LH/FSH, GHRH)'],
        ['Rzekoma rzekoma (PPHP)', 'Odziedziczona od OJCA', 'Obecny (brachydaktylia, niska sylwetka)', 'PRAWIDŁOWA (wapń, fosfor i PTH w normie)', 'Brak oporności'],
        ['PHP typ 1b', 'Defekt metylacji imprintingowej matczynej', 'Nieobecny (prawidłowy wygląd)', 'Hipokalcemia, hiperfosfatemia, wysoki PTH', 'Wybiórcza oporność nerkowa na PTH (czasem TSH)'],
      ],
    },
    advanced:
      'W różnicowaniu typów PHP historycznie stosowano test Ellswortha-Howarda: po dożylnym podaniu syntetycznego PTH 1-34 bada się wydalanie cAMP z moczem. U chorych z prawidłową wrażliwością lub hipoparatyreozą następuje 10–20-krotny wzrost nerkowego cAMP. W PHP-1a i PHP-1b odpowiedź cAMP jest całkowicie zablokowana. W PHP typ 2 odpowiedź cAMP w moczu jest prawidłowa, lecz brak fosfaturii (defekt leży poniżej generowania cAMP).',
    summary:
      'PHP to oporność na PTH (hipokalcemia + wysoki PTH) wywołana mutacją genu GNAS. Przy dziedziczeniu matczynym daje fenotyp AHO i oporność wielohormonalną (PHP-1a). Przy dziedziczeniu ojcowskim daje sam fenotyp AHO bez zaburzeń Ca-P (PPHP).',
    sourceIds: ['asbmr_calcium', 'ese_hypopara'],
    questions: [
      q(
        'Jaki profil biochemiczny w surowicy pozwala odróżnić rzekomą niedoczynność przytarczyc (PHP) od klasycznej pooperacyjnej niedoczynności przytarczyc?',
        ['W PHP stężenie PTH jest znacznie podwyższone, a w niedoczynności pooperacyjnej jest niskie lub niewykrywalne', 'W PHP przytarczyce pracują na najwyższych obrotach, ale nerkowy receptor nie odpowiada na sygnał parathormonu.'],
        ['W PHP stężenie wapnia wynosi powyżej 14 mg/dl', 'W obu jednostkach występuje hipokalcemia i hiperfosfatemia.'],
        ['W PHP fosforany są skrajnie obniżone z powodu masywnej fosfaturii', 'Z powodu braku odpowiedzi na PTH cewki nerkowe nie wydalają fosforanów, co daje hiperfosfatemię.']
      ),
      q(
        'Na czym polega objaw Archibalda w fenotypie wrodzonej osteodystrofii Albrighta (AHO)?',
        ['Obecność dołków zamiast wyniosłości kostek przy zaciśnięciu dłoni w pięść na skutek skrócenia IV i V kości śródręcza', 'Brachydaktylia IV i V promienia dłoni jest klasyczną cechą dysmorficzną zespołu AHO.'],
        ['Gwałtowne zgięcie dłoni po uciśnięciu mankietem ciśnieniomierza', 'To opis objawu Trousseau w tężyczce, a nie wady kośćca w AHO.'],
        ['Brak czucia w opuszkach palców rąk', 'Objaw Archibalda dotyczy anatomii układu kostnego dłoni.']
      ),
      q(
        'Dlaczego u pacjenta z rzekomą rzekomą niedoczynnością przytarczyc (PPHP) stężenie wapnia i parathormonu jest całkowicie prawidłowe pomimo obecności cech AHO?',
        ['Mutacja genu GNAS została odziedziczona po ojcu, a w nerkach aktywna jest wyłącznie kopia matczyna', 'Zjawisko imprintingu genomowego sprawia, że ojcowska kopia GNAS w cewkach nerkowych jest wyciszona, więc jej mutacja nie zaburza nerkowej odpowiedzi na PTH.'],
        ['Pacjent wytworzył przeciwciała neutralizujące mutację genetyczną', 'Przeciwciała nie korygują mutacji wewnątrzkomórkowego białka Gs-alfa.'],
        ['Przytarczyce wytwarzają inny, zastępczy hormon regulujący wapń', 'Homeostaza wapniowa zależy od PTH, a sprawna matczyna kopia genu w nerce wystarcza do zachowania eukalcemii.']
      ),
      q(
        'Który z poniższych hormonów wykazuje oporność receptorową w zespole PHP typ 1a oprócz parathormonu?',
        ['TSH (tyreotropina) oraz GHRH', 'Receptor dla TSH i GHRH również wykorzystuje podjednostkę Gs-alfa podlegającą matczynemu imprintingowi w przysadce i tarczycy.'],
        ['Insulina', 'Receptor insulinowy jest kinazą tyrozynową i nie wykorzystuje białka Gs-alfa.'],
        ['Kortyzol', 'Kortyzol działa przez wewnątrzkomórkowy receptor jądrowy (GR), niezależnie od białek G.']
      ),
      q(
        'Jakie jest leczenie z wyboru zaburzeń gospodarki wapniowo-fosforanowej w PHP?',
        ['Aktywne metabolity witaminy D (alfakalcydol/kalcytriol) oraz preparaty wapnia', 'Leczenie jest identyczne jak w hipoparatyreozie — omija uszkodzony receptor nerkowy poprzez nasilenie jelitowego wchłaniania wapnia.'],
        ['Podawanie bardzo wysokich dawek rekombinowanego parathormonu (rhPTH)', 'Podanie PTH jest nieskuteczne, ponieważ komórki docelowe wykazują oporność na ten hormon.'],
        ['Chirurgiczne przeszczepienie allogenicznych przytarczyc', 'Własne przytarczyce pacjenta są w pełni sprawne i produkują nadmiar PTH.']
      ),
    ],
  },
  {
    id: 'przelom-hiperkalcemiczny',
    title: 'Wapniowa burza: przełom',
    subtitle: 'Wapń >14 mg/dl, wstrząs, bisfosfoniany i protokół ratunkowy',
    group: 'Kości, chirurgia i stany nagłe',
    minutes: 18,
    goals: [
      'Zdiagnozujesz przełom hiperkalcemiczny (Ca >3,5 mmol/l / >14 mg/dl) jako stan bezpośredniego zagrożenia życia.',
      'Opanujesz kolejność interwencji ratunkowych (masywna płynoterapia 0,9% NaCl PRZED diuretykiem!).',
      'Poznasz wskazania do kwasu zoledronowego, kalcytoniny, denosumabu i hemodializy.',
    ],
    sections: [
      {
        title: 'Definicja i manifestacja kliniczna przełomu hiperkalcemicznego',
        text: 'Przełom hiperkalcemiczny to stan bezpośredniego zagrożenia życia, w którym stężenie wapnia całkowitego w surowicy przekracza 3,5 mmol/l (14,0 mg/dl), a wapnia zjonizowanego >1,8–2,0 mmol/l. Najczęstszą przyczyną są zaawansowane nowotwory złośliwe z wydzielaniem PTHrP lub osteolizą (HCM) oraz powikłana pierwotna nadczynność przytarczyc (PHPT). Klinicznie dominuje głębokie odwodnienie (nawet 4–6 litrów deficytu płynowego!), ostre uszkodzenie nerek (AKI), nudności, uporczywe wymioty, zaparcia, bolesne zapalenie trzustki, zaburzenia świadomości od senności przez majaczenie aż do śpiączki oraz groźne komorowe zaburzenia rytmu serca z nagłym zgonem sercowym.',
      },
      {
        title: 'Krok 1: Masywne nawadnianie 0,9% NaCl — fundament ratunku',
        text: 'Pierwszym i najważniejszym krokiem postępowania jest natychmiastowa rehydratacja izotonicznym roztworem 0,9% NaCl. Podaje się 2000–4000 ml soli fizjologicznej w ciągu pierwszych 24 godzin (początkowo 200–500 ml/h pod kontrolą diurezy i osłuchowej oceny płuc). Sól fizjologiczna nie tylko uzupełnia objętość wewnątrznaczyniową i przywraca perfuzję nerek, ale bezpośrednio nasila wydalanie wapnia z moczem: sód i wapń konkurują o ten sam mechanizm reabsorpcji w ramieniu wstępującym pętli Henlego. Kardynalny błąd: podanie furosemidu u odwodnionego pacjenta pogłębia wstrząs hipowolemiczny i nasila hiperkalcemię! Furosemid można rozważyć WYŁĄCZNIE po pełnym nawodnieniu u chorych z objawami przewodnienia lub niewydolnością serca.',
      },
      {
        title: 'Krok 2 i 3: Leki antyresorpcyjne (bisfosfoniany, kalcytonina, denosumab)',
        text: 'Równolegle z nawadnianiem wdraża się leczenie farmakologiczne hamujące osteoklastyczną resorpcję kości: 1. Dożylne bisfosfoniany o wysokiej sile działania: kwas zoledronowy (4 mg we wlewie i.v. trwającym min. 15–30 minut) lub pamidronian (60–90 mg w 2–4 h wlewie). Ich pełny efekt ujawnia się dopiero po 48–72 godzinach, lecz utrzymuje się przez 2–4 tygodnie. 2. Kalcytonina łososiowa (4–8 j.m./kg m.c. s.c. lub i.m. co 6–12 h): działa natychmiast (w ciągu 2–4 godzin), lecz jej efekt wygasa po 48 godzinach z powodu zjawiska tachyfilaksji (internalizacji receptorów). Kalcytonina stanowi idealny „pomost” do czasu zadziałania kwasu zoledronowego. U chorych z ciężką niewydolnością nerek (GFR <30), gdzie bisfosfoniany są nefrotoksyczne, lekiem z wyboru jest denosumab (przeciwciało anty-RANKL 120 mg s.c.). W skrajnych przypadkach z niewydolnością nerek i obrzękiem płuc ratunkiem jest pilna hemodializa bezwapniowa.',
      },
    ],
    table: {
      headers: ['Lek / Interwencja', 'Czas do początku działania', 'Czas trwania efektu', 'Główna uwaga kliniczna'],
      rows: [
        ['Wlew 0,9% NaCl (2–4 litry/dobę)', 'Natychmiastowy (godziny)', 'Podczas trwania wlewu', 'Podstawa terapii; rozcieńcza Ca i nasila kalciurię sodową'],
        ['Kalcytonina (4–8 j.m./kg s.c./i.m.)', 'Bardzo szybki (2–4 godziny)', 'Krótki (24–48 godzin — tachyfilaksja)', 'Szybki pomost do czasu zadziałania bisfosfonianu'],
        ['Kwas zoledronowy (4 mg i.v.)', 'Opóźniony (48–72 godziny)', 'Długi (2–4 tygodnie)', 'Złoty standard; wymaga redukcji dawki lub ostrożności w AKI'],
        ['Denosumab (120 mg s.c.)', 'Umiarkowany (2–4 dni)', 'Długi (kilka tygodni)', 'Opcja z wyboru w ciężkiej niewydolności nerek i oporności na bisfosfoniany'],
        ['Hemodializa z płynem bezwapniowym', 'Natychmiastowy (w trakcie zabiegu)', 'Do czasu zakończenia dializy', 'Wskazana w przełomie z oligurią, GFR <15 lub obrzękiem płuc'],
      ],
    },
    advanced:
      'Glikokortykosteroidy (hydrokortyzon 100 mg i.v. co 8 h lub prednizon 40–60 mg/d p.o.) są wysoce skuteczne w hiperkalcemii wywołanej nadmiarem witaminy D, chorobami ziarniniakowymi (sarkoidoza) oraz w szpiczaku mnogim i chłoniakach. Hamują one ekspresję enzymu 1alfa-hydroksylazy w makrofagach oraz zmniejszają jelitowe wchłanianie wapnia. Nie wykazują natomiast istotnej skuteczności w klasycznej pierwotnej nadczynności przytarczyc ani w hiperkalcemii zależnej od PTHrP.',
    summary:
      'Przełom hiperkalcemiczny (>14 mg/dl) to stan zagrożenia życia. Leczenie: 1. Agresywne nawodnienie 0,9% NaCl (2–4 l/d) — NIGDY furosemid przed nawodnieniem! 2. Kalcytonina na start (działa w 2 h) + kwas zoledronowy i.v. (działa po 48 h). W niewydolności nerek denosumab lub dializa.',
    sourceIds: ['endo_hypercalcemia', 'asbmr_calcium'],
    questions: [
      q(
        'Jaki jest PIERWSZY, najważniejszy krok w postępowaniu ratunkowym u odwodnionego pacjenta z przełomem hiperkalcemicznym (Ca 15,2 mg/dl)?',
        ['Intensywny wlew dożylny izotonicznego roztworu 0,9% NaCl (2000–4000 ml/24h)', 'Rehydratacja uzupełnia krytyczny deficyt płynowy, przywraca filtrację nerkową i nasila wydalanie wapnia z moczem.'],
        ['Natychmiastowe podanie 80 mg furosemidu dożylnie', 'Podanie diuretyku pętlowego u odwodnionego chorego pogłębia hipowolemię, wywołuje wstrząs i nasila hiperkalcemię!'],
        ['Podanie doustne 2 litrów wody mineralnej bogatej w wapń', 'Wapń drogą przewodu pokarmowego jest w hiperkalcemii bezwzględnie przeciwwskazany.']
      ),
      q(
        'Dlaczego kalcytoninę łączy się z kwasem zoledronowym w leczeniu ostrej hiperkalcemii?',
        ['Kalcytonina obniża wapń w ciągu 2–4 godzin (pomost), podczas gdy kwas zoledronowy działa silnie i trwale, lecz dopiero po 48–72 godzinach', 'Kombinacja ta zapewnia natychmiastowe bezpieczeństwo chorego w pierwszej dobie oraz trwałą kontrolę w kolejnych tygodniach.'],
        ['Kwas zoledronowy neutralizuje toksyczność kalcytoniny na wątrobę', 'Leki te nie neutralizują nawzajem toksyczności; działają synergistycznie na osteoklasty.'],
        ['Kalcytonina jest wchłaniana wyłącznie w obecności bisfosfonianów', 'Kalcytonina podawana jest podskórnie lub domięśniowo i działa niezależnie od bisfosfonianów.']
      ),
      q(
        'Który lek antyresorpcyjny jest preferowany w hiperkalcemii nowotworowej u pacjenta ze schyłkową niewydolnością nerek (eGFR 18 ml/min/1,73 m2)?',
        ['Denosumab (przeciwciało monoklonalne anty-RANKL)', 'Denosumab nie jest wydalany przez nerki i nie wykazuje nefrotoksyczności w przeciwieństwie do bisfosfonianów.'],
        ['Wysokie dawki kwasu zoledronowego we wlewie 5-minutowym', 'Kwas zoledronowy w ciężkiej niewydolności nerek może doprowadzić do ostrej martwicy cewek nerkowych.'],
        ['Alendronian doustny w dawce 70 mg raz na dobę', 'Doustne bisfosfoniany nie nadają się do leczenia stanów nagłych i są przeciwwskazane przy GFR <35.']
      ),
      q(
        'W jakich przyczynach hiperkalcemii glikokortykosteroidy (np. prednizon, hydrokortyzon) wykazują najwyższą skuteczność terapeutyczną?',
        ['W chorobach ziarniniakowych (sarkoidoza), zatruciu witaminą D oraz chłoniakach', 'Sterydy hamują pozanerkową ekspresję 1alfa-hydroksylazy w makrofagach i zmniejszają wchłanianie wapnia w jelicie.'],
        ['W typowym autonomicznym pojedynczym gruczolaku przytarczyc', 'W pierwotnej nadczynności przytarczyc sterydy nie obniżają wydzielania PTH ani stężenia wapnia.'],
        ['W rzekomej niedoczynności przytarczyc', 'W PHP występuje hipokalcemia, a nie hiperkalcemia.']
      ),
      q(
        'Kiedy u pacjenta z przełomem hiperkalcemicznym bezwzględnie wskazane jest pilne wdrożenie hemodializy z płynem bezwapniowym?',
        ['W przypadku ciężkiej hiperkalcemii powikłanej bezmoczem, ostrym przewodnieniem lub niewydolnością serca', 'Gdy nerki nie są w stanie wydalić podawanych płynów, hemodializa jest jedyną metodą eliminacji wapnia z ustroju.'],
        ['U każdego pacjenta z wapniem powyżej 11,0 mg/dl', 'Łagodną i umiarkowaną hiperkalcemię leczy się bezpiecznie nawodnieniem i bisfosfonianami.'],
        ['Wyłącznie przed planowaną operacją tarczycy', 'Hemodializa jest procedurą ratunkową w OIT/stacji dializ, a nie standardowym przygotowaniem chirurgicznym.']
      ),
    ],
  },
  {
    id: 'zespol-glodnych-kosci',
    title: 'Po operacji przytarczyc: HBS',
    subtitle: 'Zespół głodnych kości, hipokalcemia z odbicia i profilaktyka',
    group: 'Kości, chirurgia i stany nagłe',
    minutes: 15,
    goals: [
      'Zrozumiesz patogenezę zespołu głodnych kości (Hungry Bone Syndrome — HBS).',
      'Zidentyfikujesz pacjentów wysokiego ryzyka HBS przed paratyreoidktomią (ALP, wielkość gruczolaka).',
      'Opanujesz protokół intensywnej suplementacji wapnia, magnezu i kalcytriolu po zabiegu.',
    ],
    sections: [
      {
        title: 'Czym jest zespół głodnych kości (HBS)?',
        text: 'Zespół głodnych kości (HBS — Hungry Bone Syndrome) to powikłanie paratyreoidktomii, charakteryzujące się gwałtownym, głębokim i przedłużającym się (trwającym tygodnie, a nawet miesiące) spadkiem stężenia wapnia zjonizowanego i całkowitego w surowicy (często <1,8–2,0 mmol/l), któremu towarzyszy głęboka hipofosfatemia oraz hipomagnezemia. Występuje u 15–30% operowanych z powodu zaawansowanej pierwotnej nadczynności przytarczyc oraz u ponad 50–80% chorych operowanych z powodu trzeciorzędowej nadczynności przytarczyc w schyłkowej niewydolności nerek.',
      },
      {
        title: 'Patomechanizm: nagłe załamanie osteolizy przy szalejącej osteoblastozie',
        text: 'Przed operacją przewlekle wysokie stężenie PTH utrzymywało kości w stanie ekstremalnego obrotu metabolicznego z dominacją osteolizy osteoklastycznej. Wycięcie autonomicznego gruczolaka powoduje nagły, spektakularny spadek stężenia PTH we krwi w ciągu kilkunastu minut. W tym momencie osteoklasty natychmiast zaprzestają niszczenia kości, natomiast liczne, nadaktywne osteoblasty kontynuują proces formowania nowej macierzy kostnej. Kość staje się dosłownie „głodna” minerałów: zaczyna zachłannie, masowo wychwytywać krążący w surowicy wapń, fosfor i magnez w celu mineralizacji nieutwardzonego osteoidu, drenując krew z tych jonów.',
      },
      {
        title: 'Czynniki ryzyka i protokół leczenia ratunkowego',
        text: 'Do głównych czynników ryzyka HBS należą: bardzo wysoka wyjściowa aktywność fosfatazy zasadowej (ALP > 3–4x ponad normę — wskaźnik masywnego obrotu kostnego), duży rozmiar i masa wyciętego gruczolaka, zaawansowane zmiany kostne w RTG (osteitis fibrosa cystica, guzy brunatne, podokostnowa resorpcja paliczków) oraz wiek podeszły i współistniejący niedobór witaminy D. Leczenie HBS wymaga ciągłego wlewu dożylnego glukonianu wapnia (10–20 ampułek 10% w 1000 ml 5% glukozy lub 0,9% NaCl pod kontrolą kaniuli centralnej), bardzo wysokich dawek kalcytriolu (1–4 µg/d) lub alfakalcydolu oraz doustnego wapnia (nawet 4–8 g czystego Ca elementarnego/dobę) i preparatów magnezu.',
      },
    ],
    table: {
      headers: ['Czynnik kliniczny', 'Wartość niskiego ryzyka HBS', 'Wartość wysokiego ryzyka HBS'],
      rows: [
        ['Aktywność fosfatazy zasadowej (ALP)', 'Prawidłowa lub lekko podwyższona (<150 IU/l)', 'Wybitnie wysoka (>300–1000 IU/l) — kluczowy predyktor!'],
        ['Objętość / masa gruczolaka', 'Mały mikrogruczolak (<1 cm, <500 mg)', 'Olbrzymi gruczolak (>2–3 cm, masa >2–5 g)'],
        ['Radiologiczne zmiany kostne', 'Brak widocznych ubytków w RTG', 'Resorpcja podokostnowa, torbiele brunatne, osteitis fibrosa cystica'],
        ['Stężenie wapnia przed operacją', 'Lekka hiperkalcemia (<11,5 mg/dl)', 'Ciężka hiperkalcemia (>13,0–14,0 mg/dl)'],
        ['Wyjściowy poziom 25(OH)D', 'Prawidłowy (>30 ng/ml)', 'Głęboki niedobór (<10–15 ng/ml)'],
      ],
    },
    advanced:
      'Kluczową różnicą biochemiczną między zespołem głodnych kości a pooperacyjną niedoczynnością przytarczyc (uszkodzeniem wszystkich 4 gruczołów) jest stężenie FOSFORANÓW w surowicy. W zespole głodnych kości fosforany są wybitnie NISKIE (kość wychwytuje zarówno wapń, jak i fosfor do hydroksyapatytu). W trwałej niedoczynności przytarczyc z powodu braku fosfaturii nerkowej stężenie fosforanów jest WYSOKIE (hiperfosfatemia).',
    summary:
      'Zespół głodnych kości (HBS) to głęboka hipokalcemia i hipofosfatemia po paratyreoidktomii z powodu gwałtownej remineralizacji kości. Głównym predyktorem jest wysoka ALP. Leczenie wymaga wlewów wapnia, magnezu i wysokich dawek kalcytriolu.',
    sourceIds: ['hungry_bone', 'eses_parathyroid'],
    questions: [
      q(
        'Który parametr laboratoryjny oznaczony przed operacją przytarczyc jest najsilniejszym wskaźnikiem ryzyka wystąpienia zespołu głodnych kości (HBS)?',
        ['Wybitnie podwyższona aktywność fosfatazy zasadowej (ALP)', 'Wysoka ALP odzwierciedla nasiloną osteoblastozę i masywny obrót kostny gotowy do natychmiastowego wychwytu wapnia po zabiegu.'],
        ['Stężenie cholesterolu całkowitego w osoczu', 'Profil lipidowy nie ma związku z dynamiką mineralizacji kośćca.'],
        ['Stężenie hormonu tyreotropowego (TSH)', 'TSH ocenia oś tarczycową, a nie intensywność obrotu kostnego przytarczyc.']
      ),
      q(
        'Jakie stężenie fosforanów w surowicy odróżnia zespół głodnych kości (HBS) od trwałej pooperacyjnej niedoczynności przytarczyc?',
        ['W HBS fosforany są bardzo niskie (hipofosfatemia), a w niedoczynności przytarczyc wysokie (hiperfosfatemia)', 'Głodna kość wbudowuje fosforany w hydroksyapatyt, podczas gdy w niedoczynności brak PTH zatrzymuje fosfor w nerkach.'],
        ['W HBS fosforany przekraczają 10 mg/dl', 'W HBS fosforany często spadają poniżej 1,5 mg/dl.'],
        ['W obu jednostkach stężenie fosforanów jest zawsze identyczne i prawidłowe', 'Stężenie fosforanów jest kardynalnym parametrem różnicującym te dwa stany.']
      ),
      q(
        'Dlaczego po wycięciu gruczolaka przytarczycy dochodzi do nagłego załamania stężenia wapnia w surowicy?',
        ['Okres półtrwania PTH wynosi 3–5 minut, co natychmiast wyłącza osteolizę, podczas gdy osteoblasty masowo chłoną wapń', 'Nagła dysproporcja między zahamowanym kościogubieniem a trwającym kościotworzeniem drenuje krew z jonów Ca2+.'],
        ['Gruczolak podczas usuwania wylewa do krwi toksyny niszczące wapń', 'Mechanizm jest czysto fizjologiczny i wynika z kinetyki przebudowy tkanki kostnej.'],
        ['Nerkowe kłębuszki natychmiast zaczynają wydalać 100% wapnia z organizmu', 'W nerkach bez PTH spada próg cewkowy, ale głównym rezerwuarem pochłaniającym wapń jest kość.']
      ),
      q(
        'Jakie leczenie należy zastosować w ostrym zespole głodnych kości?',
        ['Ciągły wlew dożylny glukonianu wapnia, wysokie dawki kalcytriolu i doustny węglan wapnia oraz magnez', 'Tylko agresywna podaż wapnia w połączeniu z aktywną witaminą D jest w stanie nasycić nienasycony kościec.'],
        ['Dożylne podanie kwasu zoledronowego', 'Podanie leku antyresorpcyjnego pogłębiłoby hipokalcemię i zablokowało fizjologiczną odbudowę kości!'],
        ['Ograniczenie płynów i dieta ubogowapniowa', 'Restrykcja wapnia w zespole głodnych kości doprowadziłaby do śmiertelnej tężyczki i zatrzymania akcji serca.']
      ),
      q(
        'Jak długo po operacji może utrzymywać się stan zwiększonego zapotrzebowania na wapń w ciężkim HBS?',
        ['Od kilku tygodni do nawet kilku miesięcy po zabiegu', 'Tyle czasu zajmuje pełna remineralizacja uogólnionych ubytków osteopenicznych w całym szkielecie.'],
        ['Dokładnie przez pierwsze 15 minut po wybudzeniu ze znieczulenia', 'W 15. minucie proces dopiero się rozpoczyna; szczyt hipokalcemii przypada na 2.–4. dobę po operacji.'],
        ['Maksymalnie do 6 godzin od nacięcia skóry', 'HBS jest procesem przewlekłym wymagającym wielotygodniowej opieki ambulatoryjnej.']
      ),
    ],
  },
  {
    id: 'osteoporoza-metabolizm',
    title: 'Cicha degradacja kośćca: osteoporoza',
    subtitle: 'DXA, kalkulator FRAX, bisfosfoniany, denosumab i leki anaboliczne',
    group: 'Kości, chirurgia i stany nagłe',
    minutes: 18,
    goals: [
      'Zinterpretujesz badanie densytometryczne DXA (wskaźnik T-score vs Z-score wg WHO).',
      'Nauczysz się szacować 10-letnie ryzyko złamania osteoporotycznego za pomocą kalkulatora FRAX.',
      'Dobierzesz terapię: leki antyresorpcyjne (bisfosfoniany, denosumab) vs leki kościotwórcze (teryparatyd, romosozumab).',
    ],
    sections: [
      {
        title: 'Definicja osteoporozy i kryteria densytometryczne DXA',
        text: 'Osteoporoza jest układową chorobą szkieletu charakteryzującą się niską masą kostną, zaburzoną mikroarchitekturą tkanki kostnej i w konsekwencji zwiększoną podatnością na złamania niskoenergetyczne (złamania pod wpływem siły odpowiadającej upadkowi z własnej wysokości). Złotym standardem diagnostycznym jest dwuwiązkowa absorpcjometria rentgenowska (DXA) odcinka lędźwiowego kręgosłupa (L1–L4) oraz bliższego końca kości udowej (szyjka kości udowej i całkowity wskaźnik Total Hip). Wg kryteriów WHO u kobiet po menopauzie i mężczyzn >=50. r.ż. wynik określa się wskaźnikiem T-score (odchylenie standardowe od szczytowej masy kostnej młodych dorosłych): norma >= -1,0; osteopenia od -1,1 do -2,4; osteoporoza <= -2,5 SD.',
      },
      {
        title: 'Kalkulator FRAX i bezwzględne wskazania do leczenia',
        text: 'Pamiętaj: wystąpienie złamania niskoenergetycznego kręgu lub szyjki kości udowej pozwala na rozpoznanie osteoporozy klinicznej NIEZALEŻNIE od wyniku densytometrii DXA! W ocenie bezwzględnego 10-letniego ryzyka poważnego złamania osteoporotycznego (MOF — Major Osteoporotic Fracture) stosuje się algorytm FRAX, uwzględniający wiek, płeć, BMI, przebyte złamania własne i u rodziców, palenie tytoniu, reumatoidalne zapalenie stawów, sterydoterapię i spożycie alkoholu. W Polsce próg interwencji terapeutycznej wynosi 10% dla MOF (ryzyko wysokie) lub obecność przebytego złamania kręgowego/biodrowego.',
      },
      {
        title: 'Arsenał terapeutyczny: od antyresorpcji do anabolizmu kości',
        text: 'Leczenie rozpoczyna się od suplementacji witaminy D (zwykle 2000 j.m./d cholekalcyferolu z celem 25(OH)D 30–50 ng/ml) oraz zapewnienia dobowej podaży wapnia w diecie (1000–1200 mg/d). Farmakoterapia dzieli się na dwie grupy: 1. Leki antyresorpcyjne (hamujące osteoklasty): bisfosfoniany doustne (alendronian 70 mg raz w tygodniu, ryzedronian 35 mg raz w tygodniu) lub dożylne (kwas zoledronowy 5 mg i.v. raz w roku) oraz przeciwciało monoklonalne anty-RANKL (denosumab 60 mg s.c. co 6 miesięcy — uwaga: nagłe odstawienie denosumabu wywołuje efekt z odbicia i kaskadę złamań kręgów!). 2. Leki anaboliczne (stymulujące kościotworzenie przez osteoblasty): teryparatyd (rekombinowany PTH 1-34 podawany podskórnie w pulsach raz na dobę przez 24 miesiące) oraz romosozumab (przeciwciało anty-sklerostynie, o unikalnym podwójnym działaniu kościotwórczym i antyresorpcyjnym) — dedykowane dla chorych z bardzo wysokim ryzykiem złamań.',
      },
    ],
    table: {
      headers: ['Grupa leków', 'Przedstawiciele', 'Mechanizm działania', 'Wskazania i ograniczenia'],
      rows: [
        ['Bisfosfoniany doustne', 'Alendronian, Ryzedronian', 'Wbudowują się w hydroksyapatyt, indukują apoptozę osteoklastów', 'I rzut; wymaga popijania wodą na czczo; p/wskazany przy GFR <35'],
        ['Bisfosfoniany dożylne', 'Kwas zoledronowy (5 mg raz/rok)', 'Potężna blokada osteoklastów z pominięciem p. pokarmowego', 'Złoty standard po złamaniu biodra; kontrola nerek przed wlewem'],
        ['Anty-RANKL', 'Denosumab (60 mg co 6 mies. s.c.)', 'Blokuje wiązanie RANKL z receptorem RANK na osteoklastach', 'Bezpieczny w niewydolności nerek; NIE WOLNO odstawiać bez leku pomostowego!'],
        ['Analogi PTH (anaboliczne)', 'Teryparatyd (20 µg/d s.c.)', 'Pulsacyjna stymulacja osteoblastów (kościotworzenie)', 'Ciężka osteoporoza z licznymi złamaniami; max czas terapii 24 miesiące'],
        ['Anty-sklerostyna', 'Romosozumab', 'Znosi hamowanie szlaku Wnt/beta-katenina (anabolizm + antyresorpcja)', 'Bardzo wysokie ryzyko złamań; ostrożnie przy incydentach sercowo-naczyniowych'],
      ],
    },
    advanced:
      'Martwica kości szczęki związana z lekami (MRONJ) oraz atypowe złamania podkrętarzowe kości udowej (AFF) są rzadkimi powikłaniami wieloletniej (>3–5 lat) terapii antyresorpcyjnej silnymi bisfosfonianami. W celu minimalizacji tego ryzyka u chorych z umiarkowanym ryzykiem złamań po 3–5 latach stosuje się „wakacje lekowe” (drug holiday) trwające 1–3 lata, podczas których bisfosfonian nadal powoli uwalnia się ze zmineralizowanej macierzy kostnej.',
    summary:
      'Osteoporoza to T-score <= -2,5 SD lub przebyte złamanie niskoenergetyczne. Podstawą leczenia są bisfosfoniany i denosumab (antyresorpcja), a w ciężkich postaciach teryparatyd i romosozumab (anabolizm). Zapewnij podaż Ca i witaminy D!',
    sourceIds: ['pte_osteoporoza', 'osteoporosis_iof'],
    questions: [
      q(
        'Jak wg kryteriów WHO definiuje się osteoporozę w densytometrii rentgenowskiej (DXA)?',
        ['Wskaźnik T-score <= -2,5 odchylenia standardowego (SD)', 'Wartość T-score od -1,0 do -2,5 oznacza osteopenię, a <= -2,5 potwierdza osteoporozę.'],
        ['Wskaźnik T-score od -1,0 do -2,0 SD', 'To przedział osteopenii, a nie osteoporozy.'],
        ['Wskaźnik Z-score przekraczający +2,0 SD', 'Z-score porównuje gęstość z rówieśnikami i służy do oceny dzieci i młodych mężczyzn.']
      ),
      q(
        '68-letnia kobieta doznała kompresyjnego złamania trzonu kręgu L2 po podniesieniu siatki z zakupami. W DXA jej T-score wynosi -1,9. Jakie jest rozpoznanie?',
        ['Kliniczna osteoporoza powikłana złamaniem niskoenergetycznym', 'Przebycie złamania niskoenergetycznego głównej lokalizacji upoważnia do rozpoznania osteoporozy bez względu na wynik T-score.'],
        ['Jedynie łagodna osteopenia niekwalifikująca się do leczenia', 'Kwalifikacja oparta wyłącznie na liczbie T-score z pominięciem faktu złamania jest kardynalnym błędem.'],
        ['Fizjologiczny stan związany z wiekiem niewymagający interwencji', 'Złamanie kręgu jest stanem patologicznym drastycznie zwiększającym ryzyko kolejnych złamań.']
      ),
      q(
        'Co grozi pacjentowi w przypadku nagłego zaprzestania przyjmowania denosumabu po 3 latach leczenia?',
        ['Gwałtowny wzrost obrotu kostnego z odbicia i kaskada mnogich złamań kompresyjnych kręgów', 'Denosumab nie odkłada się w kościach; po wygaśnięciu przeciwciała następuje gwałtowny wyrzut osteoklastów.'],
        ['Trwałe zablokowanie wydzielania parathormonu', 'Odstawienie leku odblokowuje, a nie hamuje układ kostny.'],
        ['Natychmiastowe stwardnienie kości (osteopetroza)', 'Odwrócenie działania leku wywołuje nagłą osteolizę, a nie stwardnienie kości.']
      ),
      q(
        'Jaki lek przeciwosteoporotyczny działa w mechanizmie ANABOLICZNYM (pobudzającym kościotworzenie przez osteoblasty)?',
        ['Teryparatyd (rekombinowany PTH 1-34)', 'Pulsacyjne codzienne podawanie teryparatydu aktywuje osteoblasty do tworzenia nowej macierzy kostnej.'],
        ['Kwas zoledronowy', 'Kwas zoledronowy jest lekiem antyresorpcyjnym hamującym niszczenie kości.'],
        ['Alendronian sodu', 'Alendronian jest bisfosfonianem o działaniu antyresorpcyjnym.']
      ),
      q(
        'Jakie są zasady prawidłowego przyjmowania doustnych bisfosfonianów (np. alendronianu)?',
        ['Rano na czczo, popijając pełną szklanką zwykłej wody, z zachowaniem pozycji stojącej lub siedzącej przez min. 30 minut', 'Zapobiega to podrażnieniu i owrzodzeniom przełyku oraz maksymalizuje słabą biodostępność leku (<1%).'],
        ['Wieczorem tuż przed snem, bezpośrednio po obfitym posiłku bogatym w nabiał', 'Wapń z posiłku całkowicie zneutralizowałby wchłanianie bisfosfonianu, a pozycja leżąca zniszczyłaby przełyk.'],
        ['Rozpuszczając tabletkę w gorącym soku pomarańczowym lub kawie', 'Bisfosfoniany wolno popijać wyłącznie niegazowaną, przegotowaną lub mineralną wodą niskozmineralizowaną.']
      ),
    ],
  },
];
