import type { ClinicalCase } from './cases.ts';

type Choice = [string, string];
type StepDraft = [string, string, Choice, Choice];

const step = (context: string, prompt: string, correct: Choice, wrong: Choice): StepDraft => [context, prompt, correct, wrong];

const make = (
  lessonId: string,
  title: string,
  patient: string,
  difficulty: ClinicalCase['difficulty'],
  intro: string,
  steps: StepDraft[]
): ClinicalCase => ({
  id: `case-${lessonId}`,
  lessonId,
  title,
  patient,
  difficulty,
  intro,
  steps: steps.map(([context, prompt, correct, wrong], i) => ({
    id: `case-${lessonId}-${i + 1}`,
    lessonId,
    stage: ['Objawy', 'Badania', 'Rozpoznanie', 'Postępowanie'][i],
    context,
    prompt,
    answer: i % 2,
    options: (i % 2 ? [wrong, correct] : [correct, wrong]).map(([text, explanation]) => ({
      text,
      explanation,
    })),
  })),
});

export const pregnancyCases: ClinicalCase[] = [
  make(
    'ciaza-niedoczynnosc-i-subkliniczna',
    'Ciężarna z niedoczynnością tarczycy na początku ciąży',
    'Kobieta, 29 lat (5. hbd)',
    'Podstawowy',
    'Pacjentka z chorobą Hashimoto leczona od 3 lat L-tyroksyną zgłasza się do poradni po otrzymaniu dodatniego testu ciążowego. Martwi się o rozwój mózgu dziecka.',
    [
      step(
        'W 5. tygodniu ciąży pacjentka odczuwa senność i zmęczenie. Obecnie przyjmuje lewotyroksynę w dawce 75 µg/d. W badaniu przedmiotowym bez cech niewydolności krążenia, RR 115/70 mmHg. Co należy zalecić natychmiast po potwierdzeniu ciąży w wytycznych ATA/ETA?',
        'Jakie jest zalecenie postępowania u leczonej kobiety zaraz po potwierdzeniu ciąży?',
        ['Prewencyjne zwiększenie dotychczasowej dawki L-tyroksyny o 20–30% (np. o 2 dodatkowe tabletki w tygodniu) i pilne oznaczenie TSH oraz FT4', 'Wczesna ciąża podwaja TBG i wymaga natychmiastowego zwiększenia podaży tyroksyny dla neurogenezy płodu.'],
        ['Utrzymanie dotychczasowej dawki i odczekanie do końca I trymestru na wykonanie badań kontrolnych', 'Wzrost TBG i transferu przezłożyskowego we wczesnej ciąży powoduje gwałtowny spadek wolnych hormonów.']
      ),
      step(
        'Wyniki badań laboratoryjnych wykonanych w 6. hbd: TSH 3,8 mIU/l, FT4 12,2 pmol/l (dolna granica normy), anty-TPO 420 IU/ml. Jak należy zinterpretować te wyniki w I trymestrze?',
        'Jaka jest prawidłowa interpretacja wyniku TSH u ciężarnej?',
        ['Niewystarczająco wyrównana niedoczynność tarczycy w I trymestrze ciąży (cel TSH w I trymestrze <2,5 mIU/l)', 'TSH 3,8 mIU/l przy dodatnich anty-TPO wiąże się ze zwiększonym ryzykiem poronienia i deficytów neuropoznawczych.'],
        ['Prawidłowa czynność tarczycy dla kobiety w ciąży, ponieważ TSH mieści się poniżej 4,0 mIU/l', 'W I trymestrze norma populacyjna jest obniżona przez tyreotropowe działanie hCG; stężenie nie powinno przekraczać 2,5 mIU/l.']
      ),
      step(
        'Stężenie TSH przekracza normę ciążową, a wysokie miano przeciwciał potwierdza autoimmunizację. Płód w I trymestrze nie syntetyzuje własnych hormonów i polega w 100% na transporcie matczynej tyroksyny.',
        'Jakie jest ostateczne rozpoznanie kliniczne?',
        ['Pierwotna subkliniczna/jawna niedoczynność tarczycy w I trymestrze ciąży w przebiegu przewlekłego zapalenia Hashimoto', 'Wysokie przeciwciała anty-TPO i przekroczenie ciążowego progu TSH 2,5 mIU/l nakazują natychmiastową optymalizację.'],
        ['Fizjologiczna tyreotoksykoza ciążowa indukowana gonadotropiną kosmówkową (hCG)', 'W tyreotoksykozie ciężarnych stężenie TSH ulega stłumieniu <0,1 mIU/l, a FT4 jest podwyższone.']
      ),
      step(
        'Pacjentka wymaga optymalizacji leczenia w celu zagwarantowania prawidłowej mielinizacji i neurogenezy centralnego układu nerwowego płodu.',
        'Jakie powinno być postępowanie terapeutyczne i schemat kontroli laboratoryjnej?',
        ['Zwiększenie dawki L-tyroksyny do 100 µg/d rano na czczo i kontrola TSH oraz FT4 co 4 tygodnie do połowy ciąży', 'Monitorowanie co 4 tygodnie do 20. hbd pozwala na dynamiczną korektę dawki do rosnących stężeń TBG.'],
        ['Dołączenie tyreostatyku (propylotiouracylu) w celu ochrony łożyska przed autoprzeciwciałami', 'Propylotiouracyl jest lekiem przeciwtarczycowym stosowanym w nadczynności, a nie w niedoczynności tarczycy.']
      ),
    ]
  ),
  make(
    'ciaza-tyreotoksykoza-graves-ptu',
    'Kołatanie serca i wole naczyniowe w pierwszym trymestrze',
    'Kobieta, 27 lat (7. hbd)',
    'Zaawansowany',
    'Ciężarna w 7. tygodniu ciąży zgłasza się z powodu uciążliwej tachykardii, duszności wysiłkowej, drżenia rąk i ubytku masy ciała o 3 kg pomimo wilczego apetytu.',
    [
      step(
        'W badaniu przedmiotowym tętno spoczynkowe 115/min, RR 140/65 mmHg, ciepła, wilgotna skóra, drobnofaliste drżenie palców dłoni oraz wyczuwalne powiększenie tarczycy ze słyszalnym szmerem naczyniowym nad płatami.',
        'Co jest kluczową wskazówką różnicującą z przejściową tyreotoksykozą ciężarnych (gestational thyrotoxicosis)?',
        ['Obecność wola naczyniowego, orbitopatii oraz wybitnie wysokich objawów klinicznych przemawia za chorobą Gravesa-Basedowa', 'Przejściowa tyreotoksykoza ciężarnych indukowana hCG nie daje wola naczyniowego ani zmian ocznych.'],
        ['Wymioty ciężarnych są patognomoniczne wyłącznie dla choroby Gravesa i nigdy nie występują w nadczynności indukowanej hCG', 'Wymioty ciężarnych korelują z wysokim stężeniem hCG w gestational thyrotoxicosis.']
      ),
      step(
        'TSH <0,005 mIU/l, FT4 42 pmol/l (ponad dwukrotność górnej granicy normy), TRAb 9,8 IU/l (norma <1,75 IU/l). W USG tarczycy hipoechogeniczny miąższ z burzą naczyniową (inferno).',
        'Jak zinterpretować obecność wysokiego miana przeciwciał TRAb w kontekście ciąży?',
        ['Potwierdzenie choroby Gravesa-Basedowa oraz wysokie ryzyko przezłożyskowego transferu TRAb i tyreotoksykozy płodowej', 'TRAb klasy IgG bez przeszkód penetrują barierę łożyskową i mogą pobudzać tarczycę płodu do wola i tachykardii.'],
        ['Podwyższony poziom TRAb wyklucza chorobę Gravesa i dowodzi zespołu oporności na hormony tarczycy', 'TRAb to autoprzeciwciała swoiste dla receptora TSH w chorobie Gravesa.']
      ),
      step(
        'Stłumione TSH, znacznie podwyższone FT4, wole naczyniowe i bardzo wysokie miano przeciwciał TRAb jednoznacznie pieczętują rozpoznanie.',
        'Jak brzmi pełne rozpoznanie kliniczne?',
        ['Ciężka jawna choroba Gravesa-Basedowa w I trymestrze ciąży', 'Obraz kliniczny i serologiczny spełnia wszystkie kryteria jawnej choroby Gravesa-Basedowa.'],
        ['Podostre zapalenie tarczycy de Quervaina', 'W podostrym zapaleniu tarczycy dominuje silny ból szyi i wysokie OB/CRP, a TRAb są ujemne.']
      ),
      step(
        'Nieleczona nadczynność tarczycy grozi poronieniem, stanem przedrzucawkowym, niewydolnością serca matki oraz obumarciem wewnątrzmacicznym płodu.',
        'Jaki lek przeciwtarczycowy należy wdrożyć w I trymestrze ciąży i jaki jest cel leczenia?',
        ['Propylotiouracyl (PTU) w najniższej skutecznej dawce celującej w górną granicę normy FT4, z zamianą na tiamazol po 16. hbd', 'PTU ma niższe ryzyko embriopatii w I trymestrze niż tiamazol; po 16. hbd zamienia się go na tiamazol z uwagi na hepatotoksyczność PTU.'],
        ['Tiamazol w maksymalnej dawce w skojarzeniu z lewotyroksyną (terapia blokuj-zastępuj) oraz jodoterapia 131-I', 'Terapia block-and-replace oraz podanie radiojodu 131-I są bezwzględnie przeciwwskazane w ciąży!']
      ),
    ]
  ),
  make(
    'ciaza-gdm-kryteria-iadpsg',
    'Nieprawidłowy wynik glikemii w 24. tygodniu ciąży',
    'Kobieta, 31 lat (24. hbd)',
    'Podstawowy',
    'Ciężarna pierwiastka w 24. tygodniu ciąży zgłasza się z wynikiem standardowego doustnego testu tolerancji glukozy (OGTT 75 g).',
    [
      step(
        'Ciąża jednopłodowa, dotychczasowy przyrost masy ciała wynosi 6,5 kg. Ciśnienie tętnicze 120/75 mmHg. Brak objawów wielomoczu czy wzmożonego pragnienia. Pacjentka w I trymestrze miała glikemię na czczo 86 mg/dl.',
        'Jakie było wskazanie do wykonania testu OGTT z 75 g glukozy?',
        ['Rutynowy powszechny skrining w kierunku cukrzycy ciążowej u każdej ciężarnej między 24. a 28. tygodniem ciąży', 'Standard opieki okołoporodowej i wytyczne PTD/FIGO nakazują wykonanie OGTT 75 g w 24.–28. hbd u wszystkich kobiet bez wcześniej wykrytej cukrzycy.'],
        ['Podejrzenie makrosomii płodu na podstawie wymiarów brzucha matki', 'Skrining w 24.–28. hbd jest powszechny, niezależnie od wymiarów płodu w badaniu USG.']
      ),
      step(
        'Wyniki OGTT 75 g: glikemia na czczo: 94 mg/dl, po 1 godzinie: 165 mg/dl, po 2 godzinach: 142 mg/dl. Normy IADPSG/WHO: na czczo <92, 1h <180, 2h <153 mg/dl.',
        'Jak należy zinterpretować ten profil metaboliczny zgodnie z kryteriami IADPSG / WHO / PTD?',
        ['Cukrzyca ciążowa (GDM) – do rozpoznania wystarczy przekroczenie co najmniej jednej z wartości progowych (na czczo ≥92 mg/dl)', 'Wartość na czczo 94 mg/dl przekracza normę 92 mg/dl, co jednoznacznie definiuje GDM bez względu na prawidłowe wartości po 1h i 2h.'],
        ['Prawidłowa tolerancja węglowodanów w ciąży, ponieważ glikemia po 2 godzinach wynosi poniżej 153 mg/dl', 'Zgodnie z kryteriami IADPSG nieprawidłowość w choćby jednym punkcie czasowym nakazuje rozpoznanie GDM.']
      ),
      step(
        'Kobieta nie miała cukrzycy przed ciążą. Niewydolność komórek beta w obliczu fizjologicznego szczytu oporności na insulinę wywołała zaburzenia glikemii.',
        'Jakie jest formalne rozpoznanie i dominujący patomechanizm schorzenia?',
        ['Cukrzyca ciążowa (GDM) wywołana załamaniem kompensacji komórek beta trzustki wobec narastającej łożyskowej insulinooporności (hPL, progesteron)', 'Niewydolność wydzielnicza komórek beta w obliczu fizjologicznego spadku wrażliwości tkanek prowadzi do hiperglikemii.'],
        ['Cukrzyca typu 1 wywołana ostrym autoimmunologicznym zniszczeniem wysp trzustkowych', 'Glikemie po obciążeniu są umiarkowane, brak cech kwasicy ketonowej ani ostrego bezwzględnego niedoboru insuliny.']
      ),
      step(
        'Nieleczona hiperglikemia matczyna prowadzi do hiperinsulinizmu płodu, makrosomii, porodu urazowego i hipoglikemii noworodka.',
        'Jakie powinno być wstępne postępowanie terapeutyczne i docelowe wartości glikemii?',
        ['Wdrożenie diety cukrzycowej o niskim IG, aktywności fizycznej i samokontroli (cele: na czczo <90 mg/dl, 1h po posiłku <140 mg/dl)', 'Dieta i styl życia to podstawa; jeśli >10–20% pomiarów przekracza cele w ciągu 1–2 tygodni, wdraża się insulinoterapię.'],
        ['Natychmiastowe wdrożenie doustnych inhibitorów SGLT2 (flozyn) i restrykcyjna głodówka bezwęglowodanowa', 'Flozyny i leki inkretynowe są przeciwwskazane w ciąży, a głodówka grozi niebezpieczną ketonemią ciążową.']
      ),
    ]
  ),
  make(
    'ciaza-niewydolnosc-nadnerczy-porod',
    'Poród u pacjentki z chorobą Addisona',
    'Kobieta, 30 lat (39. hbd)',
    'Zaawansowany',
    'Ciężarna w 39. tygodniu z rozpoznaną 4 lata wcześniej chorobą Addisona została przyjęta na salę porodową z regularną czynnością skurczową.',
    [
      step(
        'Skurcze macicy co 3–4 minuty, rozwarcie szyjki 4 cm. Dotychczas w ciąży przyjmowała hydrokortyzon 25 mg/d (w dawkach podzielonych 15-10 mg) oraz fludrokortyzon 0,1 mg/d. Ciśnienie tętnicze 105/65 mmHg, tętno 95/min, pacjentka jest spocona i osłabiona.',
        'Jaki fizjologiczny proces zagraża pacjentce w trakcie aktywnego porodu?',
        ['Krytyczny niedobór kortyzolu i ryzyko ostrego przełomu nadnerczowego z powodu braku endogennej reakcji na stres porodowy', 'Poród to stan maksymalnego stresu fizjologicznego, w którym organizm zdrowy produkuje 150–200 mg kortyzolu/dobę.'],
        ['Ryzyko nagłej hiperkaliemii z powodu nadmiaru podawanego fludrokortyzonu', 'Fludrokortyzon sprzyja wydalaniu potasu i retencji sodu, nie grozi nagłą hiperkaliemią w porodzie.']
      ),
      step(
        'Pobrano krew do badań pilnych: glukoza 72 mg/dl, Na 134 mmol/l, K 4,6 mmol/l. KTG płodu prawidłowe (tętno 135/min, dobra zmienność).',
        'Co należy wiedzieć o zapotrzebowaniu na fludrokortyzon w trakcie aktywnego porodu?',
        ['Wysokie dawki hydrokortyzonu (≥100 mg/dobę) wykazują silne działanie mineralokortykosteroidowe, co znosi konieczność podawania fludrokortyzonu', 'Hydrokortyzon w dawkach stresowych w pełni wysyca receptory MR, zapobiegając utracie sodu.'],
        ['Dawka fludrokortyzonu musi zostać zwiększona 10-krotnie w postaci wlewu dożylnego', 'Fludrokortyzon podaje się wyłącznie doustnie i nie zwiększa się jego dawki w stresie okołoporodowym.']
      ),
      step(
        'Bez natychmiastowej osłony steroidowej dojdzie do zapaści naczyniowej, hipoglikemii i zgonu matki oraz płodu.',
        'Jaki stan kliniczny wymaga natychmiastowej interwencji profilaktyczno-terapeutycznej na sali porodowej?',
        ['Aktywna faza porodu u pacjentki z pierwotną niedoczynnością kory nadnerczy wymagająca protokołu stresowej osłony hydrokortyzonowej', 'Zapewnienie dożylnej podaży hydrokortyzonu w dawkach stresowych chroni przed zapaścią hemodynamiczną.'],
        ['Rzucawka porodowa u pacjentki z niekontrolowanym nadciśnieniem indukowanym ciążą', 'Ciśnienie tętnicze pacjentki wynosi 105/65 mmHg, brak drgawek czy cech preeklampsji.']
      ),
      step(
        'W stresie okołoporodowym doustna podaż leków jest nieprzewidywalna i niewystarczająca ze względu na spowolnienie opróżniania żołądka i skurcze porodowe.',
        'Jaki jest złoty standard postępowania farmakologicznego w trakcie porodu drogami natury i we wczesnym połogu?',
        ['Podanie 100 mg hydrokortyzonu i.v. w bolusie przy rozpoczęciu porodu, następnie wlew 200 mg/24h (lub 50 mg co 6h i.v.) oraz płynoterapia 0,9% NaCl z 5% glukozą', 'Zapewnia to stabilność hemodynamiczną i chroni przed hipoglikemią; po porodzie dawkę redukuje się stopniowo w ciągu 48h.'],
        ['Podanie deksametazonu 4 mg domięśniowo i zakaz stosowania jakichkolwiek płynów nawadniających', 'Deksametazon nie posiada komponenty mineralokortykosteroidowej, a restrykcja płynów wywołałaby wstrząs hipowolemiczny.']
      ),
    ]
  ),
];
