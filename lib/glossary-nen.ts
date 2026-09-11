import type { GlossaryItem } from './glossary.ts';

export const nenGlossary: GlossaryItem[] = [
  {
    id: 'cga',
    term: 'Chromogranina A (CgA)',
    aliases: ['cga', 'chromogranin a'],
    category: 'diagnostyka',
    definition: 'Glikoproteina o masie 49 kDa zawarta w ziarnistościach o gęstym rdzeniu komórek neuroendokrynnych, uwalniana drogą egzocytozy wraz z hormonami.',
    normalRange: '< 100 ng/ml (w zależności od metody, zwykle < 3 nmol/l)',
    clinicalSignificance: 'Uniwersalny marker obciążenia masą guza w NEN. Gwałtownie rośnie fałszywie dodatnio przy stosowaniu IPP, w niewydolności nerek i zapaleniu żołądka typu A.'
  },
  {
    id: '5-hiaa',
    term: 'Kwas 5-hydroksyindolooctowy (5-HIAA)',
    aliases: ['5-hiaa', 'kwas 5-hydroksyindolooctowy'],
    category: 'diagnostyka',
    definition: 'Główny końcowy metabolit serotoniny powstający w wyniku działania monoaminooksydazy A (MAO-A) i dehydrogenazy aldehydowej, wydalany z moczem.',
    normalRange: '2–8 mg / 24h (10–40 µmol / 24h)',
    clinicalSignificance: 'Podstawowy marker rakowiaka jelita cienkiego (midgut) i zespołu rakowiaka. Wymaga 3-dniowej diety eliminującej banany, orzechy, awokado, pomidory i czekoladę.'
  },
  {
    id: 'sstr2',
    term: 'Receptor somatostatynowy typu 2 (SSTR2)',
    aliases: ['sstr2', 'somatostatin receptor 2'],
    category: 'fizjologia',
    definition: 'Receptor błonowy sprzężony z białkiem Gi/o, wykazujący gęstą nadekspresję w ponad 80% dobrze zróżnicowanych nowotworów neuroendokrynnych (NET).',
    clinicalSignificance: 'Molekularny cel teranostyczny dla diagnostyki 68Ga-DOTATATE PET/CT oraz celowanej radioterapii izotopowej 177Lu-DOTATATE (PRRT) i analogów SSA.'
  },
  {
    id: 'ki-67',
    term: 'Indeks proliferacyjny Ki-67',
    aliases: ['ki-67', 'indeks ki67', 'mib-1'],
    category: 'diagnostyka',
    definition: 'Białko jądrowe obecne we wszystkich aktywnych fazach cyklu komórkowego (G1, S, G2, M), nieobecne w komórkach spoczynkowych G0, oceniane immunohistochemicznie.',
    normalRange: 'NET G1: < 3%; NET G2: 3–20%; NET G3: > 20%; NEC G3: > 20% (często > 70%)',
    clinicalSignificance: 'Kluczowy parametr histopatologiczny klasyfikacji WHO 2022/2024, decydujący o stopniu złośliwości guza i wyborze między leczeniem celowanym a chemioterapią.'
  },
  {
    id: 'krenning-score',
    term: 'Skala Krenninga',
    aliases: ['krenning', 'skala krenninga'],
    category: 'diagnostyka',
    definition: 'Półilościowa skala oceny wychwytu radiofarmaceutyku w scyntygrafii receptorowej SSTR i PET w porównaniu do narządów referencyjnych.',
    clinicalSignificance: 'Stopień 1: < wątroba; Stopień 2: = wątroba; Stopień 3: > wątroba; Stopień 4: > śledziona/nerki. Kwalifikacja do PRRT wymaga stopnia 3 lub 4.'
  },
  {
    id: 'prrt',
    term: 'Terapia PRRT',
    aliases: ['prrt', 'peptydowa radioterapia celowana'],
    category: 'leki',
    definition: 'Peptide Receptor Radionuclide Therapy — celowana radioterapia izotopowa z użyciem analogu somatostatyny powiązanego z emiterem cząstek beta (177Lu).',
    clinicalSignificance: 'Standard leczenia drugiego rzutu w postępujących midgut NET i pNET po niepowodzeniu SSA. Wydłuża przeżycie wolne od progresji (badanie NETTER-1).'
  },
  {
    id: '177lu-dotatate',
    term: 'Lutet-177 DOTATATE (Lutathera)',
    aliases: ['177lu-dotatate', 'lutathera'],
    category: 'leki',
    definition: 'Radiofarmaceutyk łączący emiter promieniowania beta lutet-177 (okres półtrwania 6,7 dnia) z chelatorem DOTA i oktapeptydem Tyr3-oktreotatanem.',
    clinicalSignificance: 'Podawany dożylnie w dawce 7,4 GBq co 8 tygodni (4 cykle). Wymaga osłony nerek wlewem aminokwasów lizyny i argininy z uwagi na limit dawki 23 Gy.'
  },
  {
    id: 'lanreotyd',
    term: 'Lanreotyd (Autogel)',
    aliases: ['lanreotyd', 'somatuline', 'autogel'],
    category: 'leki',
    definition: 'Długodziałający, syntetyczny cykliczny oktapeptydowy analog somatostatyny o wysokim powinowactwie do receptorów SSTR2 i SSTR5, podawany głęboko podskórnie w ampułkostrzykawce raz na 28 dni.',
    clinicalSignificance: 'Standardowe leczenie antyproliferacyjne i przeciwwydzielnicze w zaawansowanych GEP-NET G1 i G2 (badanie CLARINET — wydłużenie PFS do mediany nieosiągniętej vs 18 mies. w placebo).'
  },
  {
    id: 'menina',
    term: 'Menina (Gen MEN1)',
    aliases: ['menina', 'men1', 'zespół wermera'],
    category: 'fizjologia',
    definition: 'Jądrowe białko supresorowe kodowane przez gen MEN1 (chromosom 11q13), regulujące transkrypcję poprzez interakcję z kompleksem metylotransferazy histonów MLL.',
    clinicalSignificance: 'Mutacje inaktywujące wywołują zespół MEN1 (triada 3P: przytarczyce >95%, trzustka/dwunastnica 70%, przysadka 40%). Dziedziczenie autosomalne dominujące.'
  },
  {
    id: 'ret',
    term: 'Protoonkogen RET',
    aliases: ['ret', 'kinaza ret'],
    category: 'fizjologia',
    definition: 'Gen na chromosomie 10q11.2 kodujący receptorową kinazę tyrozynową RET, kluczową dla rozwoju układu nerwowego i komórek C tarczycy.',
    clinicalSignificance: 'Mutacje konstytutywne (gain-of-function) wywołują zespoły MEN2A (kodon 634) i MEN2B (kodon 918) oraz rodzinnego raka rdzeniastego tarczycy (FMTC).'
  },
  {
    id: 'mtc',
    term: 'Rak rdzeniasty tarczycy (MTC)',
    aliases: ['mtc', 'rak rdzeniasty'],
    category: 'choroby',
    definition: 'Nowotwór złośliwy wywodzący się z komórek przypęcherzykowych C tarczycy produkujących kalcytoninę, stanowiący składową zespołów MEN2A i MEN2B.',
    clinicalSignificance: 'Markerami są kalcytonina i CEA. W zespole MEN2B rozwija się w okresie niemowlęcym i wymaga profilaktycznej tyroidectomii w 1. roku życia.'
  },
  {
    id: 'gastrinoma',
    term: 'Gastrinoma (Zespół Zollingera-Ellisona)',
    aliases: ['gastrinoma', 'zespół zollingera-ellisona', 'zes'],
    category: 'choroby',
    definition: 'Guz neuroendokrynny komórek G autonomicznie wydzielający gastrynę, zlokalizowany najczęściej w trójkącie Passaro (ściana dwunastnicy).',
    clinicalSignificance: 'Prowadzi do ciężkiej opornej choroby wrzodowej żołądka i dwunastnicy oraz biegunek kwasowych. Potwierdzany paradoksalnym wzrostem gastryny po sekretynie.'
  },
  {
    id: 'insulinoma',
    term: 'Insulinoma',
    aliases: ['insulinoma', 'guz insulinowy'],
    category: 'choroby',
    definition: 'Najczęstszy hormonalnie czynny nowotwór neuroendokrynny trzustki (komórki beta), w >90% pojedynczy i łagodny, wydzielający autonomicznie insulinę.',
    clinicalSignificance: 'Manifestuje się triadą Whipple\'a. Diagnostyka polega na 72-godzinnej próbie głodowej (brak supresji insuliny i peptydu C przy glikemii < 55 mg/dl).'
  },
  {
    id: 'glukagonoma',
    term: 'Glukagonoma',
    aliases: ['glukagonoma', 'guz glukagonowy'],
    category: 'choroby',
    definition: 'Złośliwy nowotwór komórek alfa wysepek trzustki wydzielający glukagon, w >70% przypadków posiadający przerzuty w momencie rozpoznania.',
    clinicalSignificance: 'Wywołuje rumień wędrujący nekrolityczny (NME), wyniszczenie mięśniowe, łagodną cukrzycę oraz zakrzepicę żylną (VTE u 30–50% chorych).'
  },
  {
    id: 'nme',
    term: 'Rumień wędrujący nekrolityczny (NME)',
    aliases: ['nme', 'rumień wędrujący nekrolityczny'],
    category: 'choroby',
    definition: 'Patognomoniczna dermatoza paraneoplastyczna w zespole glukagonoma z nekrolizą warstwy kolczystej naskórka, pęcherzami i strupami w fałdach skórnych.',
    clinicalSignificance: 'Wynika z głębokiej hipoaminokwasemii i niedoboru cynku. Spektakularnie cofa się w ciągu 48–72 godzin po podaniu analogu somatostatyny.'
  },
  {
    id: 'vipoma',
    term: 'VIPoma (Zespół WDHA)',
    aliases: ['vipoma', 'zespół vernera-morrisona', 'wdha'],
    category: 'choroby',
    definition: 'Nowotwór neuroendokrynny trzustki wydzielający wazoaktywny peptyd jelitowy (VIP), zwany także cholerą trzustkową.',
    clinicalSignificance: 'Wywołuje triadę WDHA: obfite wodniste stolce (Watery Diarrhea do 5 l/d), skrajną hipokaliemię (Hypokalemia) oraz bezkwaśność soku żołądkowego (Achlorhydria).'
  },
  {
    id: 'trojkat-passaro',
    term: 'Trójkąt Passaro',
    aliases: ['trójkąt passaro', 'gastrinoma triangle'],
    category: 'anatomia',
    definition: 'Obszar anatomiczny wyznaczony przez: przewód pęcherzykowy/wątrobowy wspólny, II/III część dwunastnicy oraz szyjkę/trzon trzustki.',
    clinicalSignificance: 'Lokalizacja ponad 70–90% wszystkich pierwotnych guzów wydzielających gastrynę (gastrinoma), głównie w ścianie dwunastnicy i węzłach chłonnych.'
  },
  {
    id: 'captem',
    term: 'Schemat CAPTEM',
    aliases: ['captem', 'kapecytabina temozolomid'],
    category: 'leki',
    definition: 'Doustny schemat chemioterapii łączący kapecytabinę (dni 1–14) z temozolomidem (dni 10–14) w cyklu 28-dniowym wg konsensusu NANETS/NCCN.',
    clinicalSignificance: 'Podstawowe leczenie cytotoksyczne w zaawansowanych pNET G2 i G3. Kapecytabina wyczerpuje enzym naprawy DNA — MGMT, potęgując skuteczność temozolomidu.'
  },
  {
    id: 'zespol-hedingera',
    term: 'Serce rakowiaka (Zespół Hedingera)',
    aliases: ['zespół hedingera', 'serce rakowiaka', 'carcinoid heart disease'],
    category: 'choroby',
    definition: 'Włóknienie wsierdzia i aparatu zastawkowego prawej połowy serca (głównie zastawki trójdzielnej) wywołane przewlekłym działaniem serotoniny na receptor 5-HT2B.',
    clinicalSignificance: 'Występuje u 20–40% chorych z przerzutami rakowiaka do wątroby. Filtr płucny (enzym MAO-A) chroni lewą komorę serca. Markerem przesiewowym jest NT-proBNP.'
  },
  {
    id: 'przelom-rakowiaka',
    term: 'Przełom rakowiaka (Carcinoid Crisis)',
    aliases: ['przełom rakowiaka', 'carcinoid crisis'],
    category: 'choroby',
    definition: 'Zagrażający życiu, nagły masywny wyrzut mediatorów z komórek rakowiaka pod wpływem stresu, anestezji lub manipulacji guzem.',
    clinicalSignificance: 'Manifestuje się zapaścią naczyniową, tachykardią i skurczem oskrzeli. Adrenalina jest bezwzględnie przeciwwskazana. Leczeniem z wyboru jest dożylny wlew oktreotydu.'
  },
];
