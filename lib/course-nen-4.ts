import { type DraftLesson, q } from './course-types.ts';

export const draftNenPart4: DraftLesson[] = [
  {
    id: 'nen-ektopowe-zespoly',
    title: 'Ektopowe zespoły paraneoplastyczne: ACTH, GHRH i PTHrP',
    group: 'Zespoły uwarunkowane genetycznie',
    readTime: '13 min',
    goals: [
      'Zrozumieć patofizjologię ektopowej sekrecji hormonów polipeptydowych przez nowotwory neuroendokrynne.',
      'Scharakteryzować ektopowy zespół Cushinga wywołany przez NEN oskrzela lub grasicy (skrajna hipokaliemia, zasadowica metaboliczna, hiperpigmentacja).',
      'Poznać diagnostykę różnicową: test z wysoką dawką deksametazonu (HDDST) oraz cewnikowanie zatok skalistych dolnych (BIPSS).',
    ],
    sections: [
      {
        title: 'Biologia ektopowej sekrecji w komórkach neuroendokrynnych',
        content:
          'Dzięki neuroendokrynnemu aparatowi transkrypcyjnemu i enzymom obróbki posttranslacyjnej (konwertazy prohormonowe PC1/PC2), nowotwory NEN posiadają unikalną zdolność do ektopowej syntezy hormonów polipeptydowych. Najczęstszym i najbardziej dramatycznym klinicznie jest ektopowy zespół wydzielania ACTH (EAS — ectopic ACTH syndrome), stanowiący 10–15% przypadków zespołu Cushinga zależnego od ACTH. Głównymi źródłami ektopowego ACTH są: rakowiaki oskrzela (50%), rakowiaki grasicy (10%), guzy pNET (10%) oraz raki drobnokomórkowe płuc (SCLC).',
      },
      {
        title: 'Fenotyp kliniczny i pułapki metaboliczne ektopowego ACTH',
        content:
          'W odróżnieniu od powolnej choroby Cushinga (gruczolak przysadki), ektopowy zespół ACTH cechuje się błyskawicznym początkiem i skrajnie wysokimi stężeniami kortyzolu. Z powodu wysycenia enzymu 11beta-HSD2 w cewkach nerkowych kortyzol aktywuje receptory mineralokortykoidowe (MR), wywołując ciężką hipokaliemię (<2,5 mmol/l), oporną zasadowicę metaboliczną i ciężkie nadciśnienie tętnicze. Zamiast typowej otyłości centralnej dominuje nagły spadek masy ciała, osłabienie mięśniowe (miopatia steroidowa), hiperpigmentacja skóry (działanie POMC/ACTH na receptory MC1R) oraz ostre psychozy steroidowe.',
      },
      {
        title: 'Diagnostyka różnicowa: HDDST i cewnikowanie BIPSS',
        content:
          'Różnicowanie z chorobą Cushinga opiera się na teście hamowania 8 mg deksametazonu (HDDST): komórki gruczolaka przysadki częściowo zachowują sprzężenie ujemne i ulegają supresji o >50%, podczas gdy autonomiczne komórki NEN nie ulegają zahamowaniu. Ostatecznym złotym standardem jest obustronne jednoczesne cewnikowanie zatok skalistych dolnych (BIPSS) ze stymulacją CRH: brak gradientu stężenia ACTH między zatokami a krwią obwodową (gradient centralno-obwodowy < 2,0 na czczo i < 3,0 po CRH) jednoznacznie wyklucza źródło przysadkowe i potwierdza ektopowy NEN.',
      },
    ],
    table: {
      caption: 'Różnicowanie przysadkowego i ektopowego zespołu ACTH',
      headers: ['Parametr diagnostyczny', 'Choroba Cushinga (przysadka)', 'Ektopowy zespół ACTH (NEN)'],
      rows: [
        ['Dynamika kliniczna', 'Powolna, wieloletnia, otyłość centralna', 'Błyskawiczna, wyniszczenie, hiperpigmentacja'],
        ['Stężenie potasu w surowicy', 'Zwykle prawidłowe (> 3,5 mmol/l)', 'Ciężka, oporna hipokaliemia (< 2,5 mmol/l)'],
        ['Test z 8 mg deksametazonu', 'Supresja kortyzolu o > 50%', 'Brak supresji (kortyzol pozostaje wysoki)'],
        ['Gradient BIPSS (zatoka/obwód)', 'Obecny gradient (> 2,0 / > 3,0 po CRH)', 'Brak gradientu (< 2,0 po stymulacji CRH)'],
      ],
    },
    advanced:
      'Inne ektopowe zespoły paraneoplastyczne w NEN obejmują: sekrecję GHRH wywołującą rzekomą akromegalię, ektopowe wydzielanie PTHrP prowadzące do ciężkiego przełomu hiperkalcemicznego przy niewykrywalnym parathormonie natywnym (PTH) oraz ektopowe wydzielanie wazopresyny (SIADH) z ciężką hiponatremią z rozcieńczenia.',
    summary:
      'Ektopowy zespół ACTH w przebiegu NEN oskrzela lub trzustki manifestuje się gwałtowną miopatią, hiperpigmentacją i ciężką hipokaliemią. Złotym standardem wykluczenia przysadki jest cewnikowanie zatok skalistych dolnych (BIPSS).',
    sourceIds: ['enets-consensus-2023', 'who-nen-2022'],
    questions: [
      q(
        'Który wynik obustronnego cewnikowania zatok skalistych dolnych (BIPSS) po stymulacji CRH potwierdza ektopowe (pozaprzysadkowe) źródło sekrecji ACTH?',
        ['Stosunek stężenia ACTH w zatoce skalistej do krwi obwodowej poniżej 2,0', 'Brak gradientu centralno-obwodowego po stymulacji dowodzi, że przysadka nie jest źródłem nadmiaru ACTH.'],
        ['Stosunek stężenia ACTH w zatoce do krwi obwodowej przekraczający 15,0', 'Wysoki gradient jednoznacznie potwierdza przysadkową chorobę Cushinga.'],
        ['Gwałtowny spadek stężenia glukozy w zatoce skalistej poniżej 20 mg/dl', 'Pomiar glukozy nie jest elementem protokołu BIPSS.']
      ),
      q(
        'Dlaczego u chorego z ektopowym zespołem Cushinga w przebiegu rakowiaka oskrzela dochodzi do ciężkiej hipokaliemii i zasadowicy metabolicznej?',
        ['Masywny nadmiar kortyzolu wysyca nerkowy enzym 11beta-HSD2 i niespecyficznie aktywuje receptory mineralokortykoidowe (MR)', 'Prowadzi to do niekontrolowanej wymiany sodu na potas i jony wodorowe w cewkach zbiorczych nerek.'],
        ['Rakowiak wydziela enzym bezpośrednio niszczący jony potasu', 'Enzymy nie rozkładają pierwiastków chemicznych.'],
        ['Dochodzi do całkowitej martwicy kory nadnerczy', 'W ektopowym ACTH kora nadnerczy ulega masywnemu obustronnemu przerostowi.']
      ),
      q(
        'Jaki nowotwór neuroendokrynny jest najczęstszą przyczyną ektopowego zespołu ACTH (~50% przypadków)?',
        ['Rakowiak oskrzela', 'Rakowiaki oskrzela odpowiadają za połowę wszystkich przypadków ektopowego wydzielania ACTH.'],
        ['Gruczolak przytarczyc', 'Gruczolaki przytarczyc wydzielają parathormon, a nie ACTH.'],
        ['Rak pęcherzykowy tarczycy', 'Nowotwory pęcherzykowe tarczycy nie wydzielają adrenokortykotropiny.']
      ),
      q(
        'Jak komórki NEN wydzielające ektopowy ACTH reagują w teście hamowania wysoką dawką deksametazonu (HDDST 8 mg)?',
        ['Wykazują brak supresji wydzielania kortyzolu (brak fizjologicznego sprzężenia zwrotnego)', 'Autonomiczne komórki guza nie posiadają sprawnych mechanizmów hamowania zwrotnego przez glikokortykosteroidy.'],
        ['Ulegają supresji o ponad 80% jak w chorobie Cushinga', 'Supresja powyżej 50–80% jest typowa dla gruczolaków przysadki, a nie NEN.'],
        ['Natychmiast ulegają martwicy apoptycznej', 'Deksametazon nie wywołuje ostrej martwicy guza NEN.']
      ),
      q(
        'Jaki peptyd ektopowo wydzielany przez NEN wywołuje hiperkalcemię nowotworową przy niewykrywalnym stężeniu PTH natywnego?',
        ['Białko pokrewne parathormonowi (PTHrP)', 'PTHrP pobudza receptory PTH1R w kościach i nerkach, imitując działanie parathormonu przy supresji natywnego PTH.'],
        ['Kalcytonina', 'Kalcytonina obniża stężenie wapnia, a nie wywołuje hiperkalcemię.'],
        ['Wazopresyna (AVP)', 'Wazopresyna reguluje gospodarkę wodną, a nie homeostazę wapniowo-fosforanową.']
      ),
    ],
  },
  {
    id: 'nen-analogi-somatostatyny',
    title: 'Analogi somatostatyny (SSA): oktreotyd, lanreotyd i pasyreotyd',
    group: 'Terapie celowane, PRRT i chirurgia',
    readTime: '13 min',
    goals: [
      'Poznać farmakodynamikę i profil powinowactwa analogów somatostatyny (SSA) do receptorów SSTR1–SSTR5.',
      'Zrozumieć podwójne działanie SSA: kontrolę objawów wydzielniczych oraz działanie antyproliferacyjne udowodnione w badaniach PROMID i CLARINET.',
      'Poznać wskazania do zastosowania pasyreotydu o szerokim spektrum receptorowym (SSTR1, 2, 3 i 5).',
    ],
    sections: [
      {
        title: 'Biologia receptorów SSTR i rozwój analogów peptydowych',
        content:
          'Natywna somatostatyna (SS-14 i SS-28) jest fizjologicznym neuropeptydem hamującym sekrecję hormonalną i neurotransmisję, lecz jej okres półtrwania w osoczu wynosi zaledwie 1–2 minuty (błyskawiczna degradacja przez peptydazy). Opracowanie syntetycznych oktapeptydów — oktreotydu i lanreotydu — zawierających zmodyfikowane aminokwasy D i mostek disiarczkowy, wydłużyło czas półtrwania do około 2 godzin, a postacie o przedłużonym uwalnianiu (oktreotyd LAR, lanreotyd autogel) umożliwiają podawanie domięśniowe lub głęboko podskórne raz na 28 dni. Leki te wykazują bardzo wysokie powinowactwo do receptora SSTR2 oraz umiarkowane do SSTR5.',
      },
      {
        title: 'Działanie antyproliferacyjne: badania PROMID i CLARINET',
        content:
          'Przez lata analogi somatostatyny stosowano wyłącznie w celu łagodzenia objawów hormonalnych (zespół rakowiaka, VIPoma). Przełomem stały się dwa randomizowane badania III fazy: PROMID (oktreotyd LAR w guzach midgut NET G1) oraz CLARINET (lanreotyd autogel w guzach trzustki i jelita G1/G2 z Ki-67 do 10%). Badania te udowodniły ponad dwukrotne wydłużenie czasu przeżycia wolnego od progresji choroby (PFS), ustanawiając analogi SSA standardem leczenia antyproliferacyjnego pierwszego rzutu w dobrze zróżnicowanych, nieoperacyjnych NEN z ekspresją SSTR.',
      },
      {
        title: 'Pasyreotyd — unikalny analog nowej generacji',
        content:
          'Pasyreotyd (SOM230) to cykloheksapeptyd o unikalnym profilu wiązania: wykazuje 40-krotnie wyższe powinowactwo do SSTR5, 30-krotnie wyższe do SSTR1 i 5-krotnie wyższe do SSTR3 w porównaniu z oktreotydem, przy zachowaniu powinowactwa do SSTR2. Znajduje zastosowanie w chorobie Cushinga, akromegalii opornej na klasyczne SSA oraz w wybranych opornych guzach NEN. Głównym działaniem niepożądanym pasyreotydu jest hiperglikemia i cukrzyca polekowa (blokada SSTR5 i SSTR2 w komórkach beta trzustki z zahamowaniem sekrecji insuliny i inkretyn GLP-1/GIP).',
      },
    ],
    table: {
      caption: 'Profil powinowactwa analogów somatostatyny do podtypów receptora SSTR (wartości IC50 [nM])',
      headers: ['Analog somatostatyny', 'SSTR1', 'SSTR2', 'SSTR3', 'SSTR4', 'SSTR5'],
      rows: [
        ['Natywna somatostatyna (SS-14)', '++ (2,3)', '+++ (0,2)', '++ (1,4)', '++ (1,8)', '+++ (0,9)'],
        ['Oktreotyd', '- (>1000)', '+++ (0,4)', '+ (40)', '- (>1000)', '++ (6,0)'],
        ['Lanreotyd', '- (180)', '+++ (0,5)', '+ (14)', '- (>1000)', '++ (5,7)'],
        ['Pasyreotyd (SOM230)', '++ (9,3)', '+++ (1,0)', '++ (1,5)', '- (>100)', '++++ (0,16)'],
      ],
    },
    advanced:
      'W trakcie długotrwałej terapii analogami somatostatyny u 20–50% chorych dochodzi do wytworzenia bezobjawowych złogów w pęcherzyku żółciowym (kamicy żółciowej) wskutek zahamowania uwalniania cholecystokininy (CCK) i atonii pęcherzyka. Dlatego u chorych kwalifikowanych do pierwotnej operacji cytoredukcyjnej NEN zaleca się jednoczasową profilaktyczną cholecystektomię.',
    summary:
      'Oktreotyd i lanreotyd działają poprzez receptor SSTR2, zapewniając kontrolę objawów i wydłużając czas wolny od progresji (PROMID, CLARINET). Pasyreotyd wiąże się silnie z SSTR5, lecz niesie wysokie ryzyko hiperglikemii.',
    sourceIds: ['enets-consensus-2023', 'nanets-pnet-2023'],
    questions: [
      q(
        'Które dwa przełomowe badania kliniczne III fazy udowodniły bezpośrednie działanie antyproliferacyjne analogów somatostatyny (wydłużenie PFS) w NEN?',
        ['Badania PROMID (oktreotyd LAR) oraz CLARINET (lanreotyd autogel)', 'PROMID i CLARINET udowodniły statystycznie znamienne wydłużenie czasu wolnego od progresji choroby, wprowadzając SSA jako terapię przeciwnowotworową.'],
        ['Badania UKPDS i DCCT', 'To badania dotyczące kontroli glikemii w cukrzycy typu 1 i 2.'],
        ['Badania ALLHAT i SPRINT', 'To badania dotyczące nadciśnienia tętniczego.']
      ),
      q(
        'Jakie powikłanie metaboliczne jest najczęstszym działaniem niepożądanym pasyreotydu z uwagi na jego wysokie powinowactwo do receptora SSTR5?',
        ['Hiperglikemia i rozwój cukrzycy polekowej', 'Pobudzenie SSTR5 w komórkach beta trzustki silnie blokuje wydzielanie insuliny i inkretyn jelitowych GLP-1.'],
        ['Ciężka hiponatremia z przewodnieniem', 'Pasyreotyd nie wywołuje retencji wody ani hiponatremii.'],
        ['Ostra kwasica mleczanowa', 'Kwasica mleczanowa to powikłanie metforminy w hipoksji, a nie pasyreotydu.']
      ),
      q(
        'Do którego podtypu receptora somatostatynowego oktreotyd i lanreotyd wykazują najwyższe powinowactwo wiązania (subnanomolarne IC50)?',
        ['Receptora SSTR2', 'Oktreotyd i lanreotyd wykazują selektywne wysokie powinowactwo do receptora SSTR2, co stanowi podstawę ich skuteczności w NEN.'],
        ['Receptora SSTR1', 'Powinowactwo do SSTR1 jest znikome (IC50 > 1000 nM).'],
        ['Receptora SSTR4', 'Analogi te praktycznie nie wiążą się z podtypem SSTR4.']
      ),
      q(
        'Jakie działanie niepożądane w drogach żółciowych rozwija się u 20–50% chorych leczonych przewlekle analogami SSA?',
        ['Kamica pęcherzyka żółciowego wskutek zahamowania uwalniania CCK i atonii pęcherzyka', 'Brak fizjologicznego obkurczania pęcherzyka sprzyja zastojowi żółci i formowaniu złogów cholesterolo-barwnikowych.'],
        ['Ostre ropne zapalenie dróg żółciowych', 'Analogi SSA nie wywołują bezpośrednio infekcji bakteryjnej dróg żółciowych.'],
        ['Rak dróg żółciowych (cholangiocarcinoma)', 'Stosowanie analogów somatostatyny nie indukuje karcynogenezy w drogach żółciowych.']
      ),
      q(
        'Jaki jest okres półtrwania natywnej somatostatyny (SS-14) w osoczu ludzkim w porównaniu do syntetycznych oktapeptydów?',
        ['Zaledwie 1–2 minuty z powodu szybkiej degradacji przez peptydazy osoczowe', 'Krótki okres półtrwania natywnego peptydu wymusił opracowanie modyfikowanych syntetycznych cząsteczek oktreotydu i lanreotydu.'],
        ['Około 24 godziny', 'Natywny hormon ulega błyskawicznej degradacji i nie ma długiego okresu półtrwania.'],
        ['Ponad 28 dni', 'Okres 28 dni charakteryzuje postacie mikrocząsteczkowe o przedłużonym uwalnianiu LAR, a nie natywną somatostatynę.']
      ),
    ],
  },
  {
    id: 'nen-prrt-celowane-captem',
    title: 'Terapia PRRT 177Lu-DOTATATE, leczenie celowane i schemat CAPTEM',
    group: 'Terapie celowane, PRRT i chirurgia',
    readTime: '13 min',
    goals: [
      'Zrozumieć zasady celowanej radioterapii peptydowej (PRRT) z użyciem 177Lu-DOTATATE na podstawie badania NETTER-1.',
      'Poznać mechanizm działania inhibitorów kinaz tyrozynowych (sunitynib) i szlaku mTOR (ewerolimus) w guzach pNET.',
      'Opanować zasady stosowania schematu chemioterapii CAPTEM (kapecytabina + temozolomid) wg wytycznych NANETS/NCCN oraz rolę enzymu MGMT.',
    ],
    sections: [
      {
        title: 'Terapia radioizotopowa PRRT (177Lu-DOTATATE) i badanie NETTER-1',
        content:
          'Peptide Receptor Radionuclide Therapy (PRRT) wykorzystuje analog somatostatyny wyznakowany emiterem promieniowania beta — lutetem-177 (177Lu, zasięg tkankowy do 2 mm, okres półtrwania 6,7 dnia). W badaniu III fazy NETTER-1 u pacjentów z progresją guzów midgut NET G1/G2 zastosowanie 4 cykli 177Lu-DOTATATE (po 7,4 GBq co 8 tygodni) przyniosło redukcję ryzyka progresji lub zgonu o 79% w porównaniu z podwójną dawką oktreotydu LAR. Główne toksyczności dotyczą szpiku kostnego (mielosupresja) oraz nerek (przeciwdziała się jej wlewem aminokwasów lizyny i argininy).',
      },
      {
        title: 'Terapie celowane w pNET: Ewerolimus i Sunitynib',
        content:
          'W nieoperacyjnych guzach neuroendokrynnych trzustki (pNET) G1 i G2 zarejestrowane są dwa leki celowane o odmiennych punktach uchwytu: (1) ewerolimus — doustny inhibitor kinazy mTOR (kompleksu mTORC1), blokujący translację białek i proliferację zależną od szlaku PI3K/Akt/mTOR (badanie RADIANT-3); (2) sunitynib — wielokinazowy inhibitor receptorów VEGFR-1/2/3, PDGFR i KIT, wykazujący silne działanie antyangiogenne w bogato unaczynionych guzach pNET. Ewerolimus jest dodatkowo zarejestrowany w NEN przewodu pokarmowego i płuc (badanie RADIANT-4).',
      },
      {
        title: 'Schemat chemioterapii CAPTEM wg wytycznych NANETS i NCCN',
        content:
          'W zaawansowanych, agresywnych pNET (zwłaszcza NET G2 i dobrze zróżnicowanych NET G3) wiodącą doustną chemioterapią stał się schemat CAPTEM: kapecytabina (750 mg/m² 2x/d, dni 1–14) w skojarzeniu z temozolomidem (150–200 mg/m² 1x/d wieczorem, dni 10–14) co 28 dni. Sekwencyjne podanie kapecytabiny deplecjonuje wewnątrzkomórkowy enzym naprawy DNA — metylotransferazę MGMT, dramatycznie uwrażliwiając komórki nowotworowe na alkilujące działanie temozolomidu. Odsetek odpowiedzi obiektywnych (ORR) sięga 40–70% u chorych z deficytem MGMT.',
      },
    ],
    table: {
      caption: 'Systemowe opcje terapeutyczne w zaawansowanych NEN',
      headers: ['Linia / Terapia', 'Punkt uchwytu molekularnego', 'Populacja docelowa', 'Główne działania niepożądane'],
      rows: [
        ['PRRT (177Lu-DOTATATE)', 'Emisja cząstek beta w komórkach SSTR2(+)', 'Progresja po SSA w midgut NET i pNET G1/G2', 'Nefrotoksyczność (ochrona Arg/Lys), trombocytopenia, zespół MDS'],
        ['Ewerolimus', 'Inhibitor kinazy mTORC1', 'Zaawansowane pNET, NEN płuc i przewodu pokarmowego', 'Aftowe zapalenie jamy ustnej, nieinfekcyjne zapalenie płuc, hiperglikemia'],
        ['Sunitynib', 'Inhibitor VEGFR, PDGFR, KIT', 'Wyłącznie pNET (guzy trzustki)', 'Nadciśnienie, zespół ręka-stopa, zmęczenie, hipotyreoza'],
        ['Schemat CAPTEM', 'Alkilacja DNA (temozolomid) + deplecja MGMT', 'Agresywne pNET G2/G3, wysoka masa guza', 'Mielosupresja (trombocytopenia), nudności, zmęczenie'],
      ],
    },
    advanced:
      'Ocena ekspresji enzymu naprawy DNA — MGMT (metylacja promotora lub immunohistochemia) — stanowi silny biomarker predykcyjny dla schematu CAPTEM. U pacjentów z brakiem ekspresji MGMT komórki guza nie potrafią usunąć grup metylowych dodanych przez temozolomid, co skutkuje pęknięciem nici DNA i apoptozą.',
    summary:
      'W zaawansowanych NEN armamentarium obejmuje PRRT z 177Lu-DOTATATE (NETTER-1), inhibitory mTOR (ewerolimus) i VEGFR (sunitynib) oraz doustną chemioterapię CAPTEM, wykazującą synergię poprzez deplecję enzymu naprawczego MGMT.',
    sourceIds: ['nanets-pnet-2023', 'eanm-prrt-2023'],
    questions: [
      q(
        'Na czym polega molekularny mechanizm synergii między kapecytabiną a temozolomidem w schemacie chemioterapii CAPTEM?',
        ['Kapecytabina wyczerpuje w komórkach guza zasoby enzymu naprawy DNA — MGMT, uniemożliwiając naprawę uszkodzeń wywołanych przez temozolomid', 'Wcześniejsze podanie kapecytabiny przez 9 dni znosi barierę naprawczą MGMT, potęgując cytotoksyczność alkilującego temozolomidu.'],
        ['Temozolomid przekształca kapecytabinę w czysty fluorouracyl w nerkach', 'Konwersja kapecytabiny zachodzi pod wpływem fosforylazy tymidynowej w guzie, niezależnie od temozolomidu.'],
        ['Leki te łączą się w krwi, tworząc nierozpuszczalny kompleks blokujący receptory SSTR2', 'Mechanizm CAPTEM opiera się na uszkodzeniu DNA, a nie interakcji z receptorami somatostatyny.']
      ),
      q(
        'W jakim celu podczas podawania izotopu lutetu-177 (177Lu-DOTATATE) w procedurze PRRT przetacza się choremu roztwór aminokwasów (lizyny i argininy)?',
        ['W celu wysycenia receptorów w kanalikach proksymalnych nerek i zahamowania cewkowej reabsorpcji radiofarmaceutyku, chroniąc nerki przed nefrotoksycznością', 'Lizyna i arginina współzawodniczą z radiopeptydem o wchłanianie w nerkach, zmniejszając dawkę promieniowania pochłoniętą przez miąższ nerkowy.'],
        ['Aby zapobiec nagłemu spadkowi glukozy we krwi', 'Aminokwasy nie służą do leczenia hipoglikemii.'],
        ['W celu przyspieszenia degradacji osoczowej lutetu-177', 'Lutet jest pierwiastkiem promieniotwórczym i jego rozpad nie zależy od aminokwasów.']
      ),
      q(
        'Jaki rodzaj promieniowania jonizującego emituje lutet-177, warunkując niszczenie komórek w zasięgu do 2 mm?',
        ['Promieniowanie korpuskularne beta-minus (elektrony)', 'Emisja cząstek beta o średnim zasięgu 0,6–2 mm powoduje pęknięcia podwójnej nici DNA w komórkach guza.'],
        ['Ciężkie cząstki alfa (jądra helu)', 'Cząstki alfa cechują aktyn-225 i bizmut-213, a nie lutet-177.'],
        ['Czyste promieniowanie gamma bez emisji cząstek', 'Promieniowanie gamma nie daje tak silnego miejscowego zniszczenia DNA jak cząstki beta.']
      ),
      q(
        'Jaki punkt uchwytu molekularnego posiada ewerolimus zarejestrowany w leczeniu zaawansowanych pNET?',
        ['Kompleks kinazy serynowo-treoninowej mTORC1 w szlaku PI3K/Akt/mTOR', 'Ewerolimus hamuje kinazę mTOR, blokując translację białek proangiogennych i podziały komórkowe.'],
        ['Receptor kinazy tyrozynowej RET', 'Inhibitorami RET są selperkatynib i pralsetynib, a nie ewerolimus.'],
        ['Enzym hydroksylazę tryptofanu (TPH1)', 'Inhibitorem TPH1 jest telotristat etylu.']
      ),
      q(
        'Jaka cecha molekularna w biopsji guza pNET jest silnym predyktorem wysokiej odpowiedzi na schemat CAPTEM?',
        ['Brak lub niska ekspresja enzymu metylotransferazy MGMT (lub metylacja jej promotora)', 'Brak enzymu MGMT uniemożliwia wycinanie grup metylowych dodanych przez temozolomid, wywołując apoptozę komórek guza.'],
        ['Nadekspresja receptorów jądrowych dla estrogenu', 'Receptory estrogenowe nie decydują o odpowiedzi na chemioterapię alkilującą w pNET.'],
        ['Całkowity brak ekspresji synaptofizyny', 'Brak synaptofizyny świadczy o odróżnicowaniu raka, a nie wrażliwości na CAPTEM.']
      ),
    ],
  },
  {
    id: 'nen-matematyka-modele',
    title: 'Modele matematyczne: dozymetria PRRT, kinetyka Ki-67 i RECIST 1.1',
    group: 'Matematyka i modele',
    readTime: '13 min',
    goals: [
      'Zrozumieć matematyczny model dozymetrii MIRD dla PRRT i wyznaczanie skumulowanej dawki pochłoniętej przez nerki (limit 23 Gy / 28 Gy).',
      'Poznać kinetykę czasu podwojenia objętości guza (Tumor Doubling Time, DT) i powiązanie z indeksem proliferacyjnym Ki-67.',
      'Opanować zasady oceny odpowiedzi radiologicznej wg kryteriów RECIST 1.1 dedykowanych nowotworom neuroendokrynnym.',
    ],
    sections: [
      {
        title: 'Dozymetria PRRT: schemat MIRD i limit dawki nerkowej',
        content:
          'W terapii radioizotopowej 177Lu-DOTATATE narządami krytycznymi ograniczającymi dawkę (dose-limiting organs) są nerki oraz szpik kostny. Zgodnie z formalizmem Medical Internal Radiation Dose (MIRD), dawkę pochłoniętą przez nerkę D_{kidney} [Gy] wyznacza całka ze stężenia aktywności w czasie pomnożona przez współczynnik S: D = \tilde{A} \cdot S. Klasyczny limit tolerancji promieniowania zewnętrznego wynosi 23 Gy (dla nerek bez protekcji) lub do 28 Gy przy osłonie aminokwasowej. Przekroczenie tej dawki stwarza wysokie ryzyko popromiennego stwardnienia tętniczek nerkowych i niewydolności nerek z opóźnieniem 12–36 miesięcy.',
      },
      {
        title: 'Czas podwojenia objętości guza (Tumor Doubling Time, DT)',
        content:
          'Wzrost guza neuroendokrynnego w fazie subklinicznej modeluje się równaniem wykładniczym: V(t) = V_0 e^{\lambda t}, gdzie \lambda to stała tempa wzrostu. Czas podwojenia masy nowotworowej wynosi DT = \frac{\ln 2}{\lambda} = \frac{t \cdot \ln 2}{\ln(V_2 / V_1)}. W guzach NET G1 (Ki-67 < 3%) czas podwojenia przekracza często 500–1000 dni, co uzasadnia strategie aktywnego nadzoru (watchful waiting) w małych pNET. W guzach G3 z Ki-67 > 30% DT skraca się do poniżej 30–60 dni, wymagając natychmiastowego wdrożenia agresywnej terapii.',
      },
      {
        title: 'Kryteria RECIST 1.1 w nowotworach neuroendokrynnych',
        content:
          'W ocenie skuteczności leczenia stosuje się kryteria RECIST 1.1 (Response Evaluation Criteria in Solid Tumors), oparte na pomiarze największego wymiaru zmian tarczowych (maksymalnie 2 zmiany na narząd, do 5 zmian łącznie). Odpowiedź całkowita (CR) oznacza zanik wszystkich zmian; częściowa (PR) to spadek sumy najdłuższych wymiarów o \ge 30%; progresja choroby (PD) to wzrost sumy o \ge 20% (i o min. 5 mm bezwzględnie) lub pojawienie się nowego ogniska; stabilizacja (SD) to niespełnienie kryteriów PR ani PD.',
      },
    ],
    table: {
      caption: 'Parametry matematyczne i kryteria w onkologii neuroendokrynnej',
      headers: ['Parametr / Równanie', 'Definicja matematyczna', 'Wartość progowa / Norma', 'Znaczenie kliniczne'],
      rows: [
        ['Dawka nerkowa PRRT (MIRD)', 'D = \\int C_A(t) dt \\cdot S', 'Limit \le 23 Gy (lub \le 28 Gy z Arg/Lys)', 'Zapobieganie nieodwracalnej nefropatii popromiennej'],
        ['Dawka na szpik kostny', 'D_{marrow} = \\tilde{A}_{marrow} \\cdot S', 'Limit \le 2 Gy', 'Zapobieganie mielosupresji i wtórnemu MDS / AML'],
        ['Czas podwojenia guza (DT)', 'DT = (t \\cdot \\ln 2) / \\ln(V_2 / V_1)', '> 500 dni w G1; < 60 dni w G3', 'Kwantyfikacja tempa progresji i agresywności biologicznej'],
        ['Progresja RECIST 1.1 (PD)', '\\Delta \\sum D \ge +20\\% (oraz \ge 5 mm)', 'Próg zmiany linii leczenia', 'Kwalifikacja do eskalacji terapii systemowej'],
      ],
    },
    advanced:
      'W wolno rosnących guzach NET ocena RECIST oparta wyłącznie na średnicy może być myląca, gdyż leki celowane (sunitynib) i PRRT indukują często martwicę centralną i spadek unaczynienia (widoczny w TK jako spadek gęstości w jednostkach Hounsfielda) bez natychmiastowego zmniejszenia wymiarów. Z tego względu w badaniach klinicznych proponuje się kryteria Choi, gdzie spadek gęstości w TK o \ge 15% kwalifikuje się jako odpowiedź guza.',
    summary:
      'Dozymetria PRRT oparta na MIRD chroni nerki (limit 23 Gy) i szpik (limit 2 Gy). Czas podwojenia (DT) koreluje z indeksem Ki-67 i określa dynamikę choroby, a kryteria RECIST 1.1 wyznaczają progresję przy wzroście wymiarów o 20%.',
    sourceIds: ['eanm-prrt-2023', 'enets-consensus-2023'],
    questions: [
      q(
        'Jaki jest powszechnie akceptowany limit skumulowanej dawki promieniowania pochłoniętej przez miąższ nerek podczas cykli PRRT z lutetem-177 przy osłonie aminokwasowej?',
        ['23–28 Gy', 'Przekroczenie progu 23 Gy (lub 28 Gy w obecności protekcji aminokwasowej) drastycznie zwiększa ryzyko późnego schyłkowego uszkodzenia nerek.'],
        ['2–3 Gy', 'Limit 2 Gy odnosi się do dawki na czerwony szpik kostny.'],
        ['100–120 Gy', 'Taka dawka wywołałaby natychmiastową całkowitą martwicę nerek.']
      ),
      q(
        'Jeśli średnica pojedynczej zmiany przerzutowej w wątrobie wzrosła z 20 mm do 26 mm w kontrolnym badaniu TK, to zgodnie z kryteriami RECIST 1.1 zmiana ta kwalifikuje się jako:',
        ['Progresja choroby (Progressive Disease, PD)', 'Wzrost wynosi 30% (z 20 do 26 mm to +6 mm, co spełnia kryterium wzrostu o co najmniej 20% i o minimum 5 mm bezwzględnie).'],
        ['Stabilizacja choroby (Stable Disease, SD)', 'Wzrost przekracza dopuszczalny próg stabilizacji wynoszący 20%.'],
        ['Częściowa odpowiedź (Partial Response, PR)', 'PR wymaga zmniejszenia wymiarów o co najmniej 30%.']
      ),
      q(
        'Jaka zależność matematyczna wiąże czas podwojenia objętości guza (DT) ze stałą tempa wzrostu lambda w modelu wykładniczym?',
        ['DT = (ln 2) / lambda', 'Czas podwojenia wynika bezpośrednio z rozwiązania równania wykładniczego V(t) = 2*V0.'],
        ['DT = lambda * ln 2', 'Iloczyn lambda i ln 2 nie ma wymiaru czasu i jest błędną formułą.'],
        ['DT = e^(lambda * 2)', 'Funkcja eksponencjalna nie wyznacza czasu podwojenia masy nowotworowej.']
      ),
      q(
        'Jaki limit dawki pochłoniętej przez czerwony szpik kostny stosuje się w planowaniu dozymetrycznym PRRT w celu uniknięcia mielosupresji?',
        ['Maksymalnie 2 Gy', 'Limit 2 Gy na czerwony szpik kostny minimalizuje ryzyko nieodwracalnej pancytopenii i wtórnego zespołu mielodysplastycznego.'],
        ['Maksymalnie 23 Gy', 'Dawka 23 Gy to limit dla nerek, dla szpiku byłaby śmiertelna.'],
        ['Maksymalnie 50 Gy', 'Dawka 50 Gy spowodowałaby całkowite zniszczenie układu krwiotwórczego.']
      ),
      q(
        'Jaka zmiana wymiarów zmian tarczowych definiuje częściową odpowiedź (PR) wg kryteriów RECIST 1.1?',
        ['Zmniejszenie sumy najdłuższych średnic zmian o co najmniej 30% w stosunku do wartości wyjściowej', 'Spadek średnicy o 30% odpowiada zmniejszeniu objętości guza o ponad 65%.'],
        ['Zmniejszenie sumy średnic o dokładnie 5%', 'Spadek o 5% mieści się w granicach błędu pomiaru i stabilizacji choroby (SD).'],
        ['Zanikanie wyłącznie markerów biochemicznych bez redukcji wymiarów', 'Kryteria RECIST 1.1 oceniają wyłącznie wymiary anatomiczne w badaniach obrazowych.']
      ),
    ],
  },
  {
    id: 'nen-chemia-biochemia',
    title: 'Biochemia i stereochemia: szlak serotoniny, kinaza RET i receptory SSTR',
    group: 'Chemia i biochemia',
    readTime: '13 min',
    goals: [
      'Poznać szlak biosyntezy serotoniny z L-tryptofanu, enzymy TPH1 i AADC oraz degradację przez MAO-A do kwasu 5-HIAA.',
      'Zrozumieć strukturę kinazy tyrozynowej RET, domenę pozakomórkową bogatą w cysteinę i mechanizm mutacji kodonów C634 i M918T.',
      'Scharakteryzować stereochemię oktapeptydu oktreotydu i kluczową konformację pętli beta niezbędną do dokowania w kieszeni receptora SSTR2.',
    ],
    sections: [
      {
        title: 'Szlak metaboliczny biosyntezy i degradacji serotoniny',
        content:
          'L-tryptofan ulega w komórkach enterochromafinowych hydroksylacji do 5-hydroksytryptofanu (5-HTP) pod wpływem hydroksylazy tryptofanowej 1 (TPH1, enzym zależny od tlenu i tetrahydrobiopteryny BH4). Następnie dekarboksylaza aromatycznych L-aminokwasów (AADC, zależna od fosforanu pirydoksalu PLP) przekształca 5-HTP w serotoninę (5-hydroksytryptaminę, 5-HT). Degradacja zachodzi przy udziale monoaminooksydazy A (MAO-A) do 5-hydroksyindoloaldehydu, który dehydrogenaza aldehydowa utlenia do kwasu 5-hydroksyindolooctowego (5-HIAA), wydalanego przez nerki.',
      },
      {
        title: 'Biologia strukturalna kinazy RET: mutacje kodonów 634 i 918',
        content:
          'Receptor RET jest przezbłonową kinazą tyrozynową. W zespole MEN2A mutacja dotyczy kodonu C634 (zastąpienie cysteiny innym aminokwasem w domenie zewnątrzkomórkowej bogatej w cysteiny). Pozostawia to niesparowaną resztę cysteiny, która tworzy patologiczny międzyłańcuchowy mostek disiarczkowy z innym monomerem RET, wywołując konstytutywną, ligand-niezależną dimeryzację. W zespole MEN2B mutacja kodonu M918T (metionina zastąpiona treoniną) leży w pętli aktywacyjnej domeny kinazowej wewnątrz komórki, przestawiając konformację katalityczną w stan permanentnej aktywności monofosforylacyjnej.',
      },
      {
        title: 'Stereochemia oktreotydu i kieszeń wiążąca receptora SSTR2',
        content:
          'Receptor SSTR2 należy do rodziny receptorów sprzężonych z białkiem G (GPCR z podjednostką Gi/o). Oktreotyd to syntetyczny oktapeptyd o sekwencji: D-Phe-Cys-Phe-D-Trp-Lys-Thr-Cys-Thr-ol, spięty mostkiem disiarczkowym między Cys2 i Cys7. Kluczowym farmakoforem odpowiedzialnym za powinowactwo do SSTR2 jest motyw beta-zwrotu tworzony przez sekwencję -Phe-D-Trp-Lys-Thr-. Odwrócenie konfiguracji na D-Trp zapobiega enzymatycznemu cięciu i stabilizuje konformację wpasowującą się idealnie w hydrofobową kieszeń utworzoną przez helisy transbłonowe TM3, TM6 i TM7 receptora SSTR2.',
      },
    ],
    table: {
      caption: 'Elementy biochemiczne i strukturalne w szlakach NEN',
      headers: ['Cząsteczka / Enzym', 'Reakcja chemiczna / Rola', 'Kofaktor / Struktura', 'Implikacja kliniczna'],
      rows: [
        ['Hydroksylaza tryptofanu (TPH1)', 'L-Tryptofan + O_2 + BH_4 \\to 5-HTP', 'Tetrahydrobiopteryna (BH4)', 'Punkt uchwytu leku telotristat etylu w zespole rakowiaka'],
        ['Monoaminooksydaza A (MAO-A)', 'Serotonina \\to 5-hydroksyindoloaldehyd', 'FAD (dinukleotyd flawinoadeninowy)', 'Enzym płucny i wątrobowy inaktywujący serotoninę'],
        ['Mutacja RET C634 (MEN2A)', 'Nieparzysta cysteina \\to mostek S-S', 'Zewnątrzkomórkowy mostek disiarczkowy', 'Stała dimeryzacja i wskazanie do tyroidectomii < 5 r.ż.'],
        ['Mutacja RET M918T (MEN2B)', 'Met918Thr w pętli aktywacyjnej', 'Wewnątrzkomórkowa kieszeń ATP', 'Agresywny MTC i fenotyp marfanoidalny, operacja < 1 r.ż.'],
      ],
    },
    advanced:
      'Głównym mechanizmem hamowania sekrecji hormonów przez aktywację SSTR2 jest sprzężenie z podjednostką G_{alpha i}, która hamuje cyklazę adenylanową, obniża stężenie wewnątrzkomórkowego cAMP, blokuje napływ jonów wapnia przez kanały napięciowo-zależne (VDCC) i otwiera dokomórkowe kanały potasowe GIRK, wywołując hiperpolaryzację błony komórkowej.',
    summary:
      'Biosynteza serotoniny z tryptofanu zależy od TPH1 i AADC, a degradacja od MAO-A do 5-HIAA. Mutacja RET C634 wywołuje homodimeryzację przez mostek disiarczkowy, a M918T aktywuje pętlę kinazy. Oktreotyd wiąże SSTR2 dzięki stabilnemu zwrotowi beta z D-Trp.',
    sourceIds: ['enets-consensus-2023', 'ata-mtc-2024'],
    questions: [
      q(
        'W jaki sposób mutacja kodonu C634 w protoonkogenie RET (typowa dla MEN2A) prowadzi do permanentnej aktywacji receptora kinazy tyrozynowej?',
        ['Niesparowana cysteina tworzy patologiczny zewnątrzkomórkowy międzyłańcuchowy mostek disiarczkowy z drugim monomerem RET, wymuszając homodimeryzację bez ligandu', 'Wymuszona dimeryzacja nie wymaga obecności fizjologicznego ligandu (GDNF) i stale pobudza proliferację komórek C.'],
        ['Mutacja niszczy domenę transbłonową, uwalniając kinazę do cytoplazmy jako wolny monomer', 'RET musi zachować lokalizację błonową, a mutacja dotyczy zewnątrzkomórkowej domeny bogatej w cysteiny.'],
        ['Powoduje całkowitą degradację receptora w proteasomie wskutek błędnego fałdowania', 'Degradacja skutkowałaby brakiem sygnału, a mutacje RET to klasyczne mutacje gain-of-function.']
      ),
      q(
        'Który element stereochemiczny w strukturze cząsteczki oktreotydu odpowiada za wysoką odporność na proteolizę i wybiórcze dopasowanie do receptora SSTR2?',
        ['Obecność D-tryptofanu (D-Trp) wewnątrz mostka disiarczkowego Cys2-Cys7 stabilizującego motyw beta-zwrotu', 'Zastąpienie naturalnego L-tryptofanu izomerem D chroni wiązanie peptydowe przed endopeptydazami i warunkuje dokowanie w SSTR2.'],
        ['Przyłączenie kowalencyjnego łańcucha kwasu palmitynowego do N-końca peptydu', 'Oktreotyd nie jest peptydem acylującym ani modyfikowanym lipidowo.'],
        ['Wprowadzenie nienaturalnego pierścienia pirymidynowego w pozycji Lys5', 'Pozycja Lys5 zawiera naturalną L-lizynę niezbędną do oddziaływań elektrostatycznych w kieszeni SSTR2.']
      ),
      q(
        'Który enzym jest enzymem ograniczającym szybkość (rate-limiting) biosyntezy serotoniny z L-tryptofanu w komórkach enterochromafinowych jelita?',
        ['Hydroksylaza tryptofanowa 1 (TPH1), zależna od tlenu cząsteczkowego i tetrahydrobiopteryny (BH4)', 'TPH1 katalizuje kluczowy etap przekształcenia L-tryptofanu w 5-hydroksytryptofan i stanowi cel telotristatu etylu.'],
        ['Dekarboksylaza aromatycznych L-aminokwasów (AADC), zależna od witaminy B12', 'AADC jest enzymem niespecyficznym, nie ogranicza szybkości i wymaga kofaktora PLP (witamina B6), a nie B12.'],
        ['Monoaminooksydaza A (MAO-A), zależna od tetrahydrofolianu', 'MAO-A odpowiada za degradację serotoniny, a jej kofaktorem jest FAD.']
      ),
      q(
        'Jaki jest molekularny mechanizm aktywacji kinazy RET wywołany mutacją M918T w zespole MEN2B?',
        ['Mutacja w pętli aktywacyjnej domeny kinazowej przestawia konformację katalityczną w stan permanentnej aktywności jako monomer', 'W MEN2B RET nie wymaga dimeryzacji ani mostków disiarczkowych — pojedynczy monomer wykazuje ciągłą autonomiczną aktywność fosforylacyjną.'],
        ['Mutacja uniemożliwia wiązanie cząsteczki ATP w domenie enzymatycznej', 'Brak wiązania ATP unieczynniłby kinazę zamiast ją aktywować.'],
        ['Mutacja usuwa domenę zewnątrzkomórkową i przekształca receptor w rozpuszczalny czynnik transkrypcyjny', 'RET pozostaje receptorem błonowym; mutacja M918T zmienia konformację pętli aktywacyjnej (A-loop).']
      ),
      q(
        'Za pośrednictwem jakiego szlaku wewnątrzkomórkowego pobudzenie receptora SSTR2 przez analogi somatostatyny hamuje wydzielanie hormonów i peptydów?',
        ['Sprzężenie z podjednostką Gai, hamowanie cyklazy adenylanowej, obniżenie cAMP i blokowanie dokomórkowych kanałów wapniowych VDCC', 'Spadek stężenia cAMP i zahamowanie napływu Ca2+ uniemożliwia fuzję pęcherzyków wydzielniczych z błoną komórkową.'],
        ['Sprzężenie z podjednostką Gs, stymulacja cyklazy adenylanowej i gwałtowny wyrzut jonów wapnia', 'Szlakiem Gs działają receptory stymulujące, np. GLP-1R lub receptor beta-adrenergiczny.'],
        ['Bezpośrednia fosforylacja kinazy JAK2 i aktywacja szlaku czynnika STAT3', 'SSTR2 jest receptorem metabotropowym GPCR, a nie receptorem cytokinowym związanym z kinazami JAK.']
      ),
    ],
  },
];
