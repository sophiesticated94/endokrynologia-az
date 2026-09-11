import type { GlossaryItem } from './glossary.ts';

export const adrenalGlossary: GlossaryItem[] = [
  {
    id: 'aldosteron',
    term: 'Aldosteron',
    category: 'hormony',
    definition:
      'Główny mineralokortykosteroid syntetyzowany w strefie kłębuszkowej kory nadnerczy pod kontrolą układu RAA (angiotensyny II) i stężenia potasu.',
    clinicalSignificance:
      'Działa na cewki dalsze i zbiorcze nerek, stymulując wchłanianie zwrotne sodu i wody oraz wydalanie potasu i jonów H+. Jego nadmiar prowadzi do zespołu Conna, a niedobór do choroby Addisona.',
  },
  {
    id: 'arr',
    term: 'Wskaźnik aldosteronowo-reninowy (ARR)',
    category: 'diagnostyka',
    definition:
      'Iloraz stężenia aldosteronu do aktywności reninowej osocza (ARO) lub stężenia reniny (DRC), stanowiący podstawowe badanie przesiewowe w kierunku pierwotnego hiperaldosteronizmu.',
    clinicalSignificance:
      'Podwyższony ARR wskazuje na autonomiczną produkcję aldosteronu ze stłumioną reniną. Wymaga wyrównania potasu i odstawienia leków interferujących (spironolakton na 4–6 tyg.).',
  },
  {
    id: 'avs',
    term: 'Cewnikowanie żył nadnerczowych (AVS)',
    category: 'diagnostyka',
    definition:
      'Inwazyjna procedura naczyniowa polegająca na jednoczesnym pobraniu krwi z prawej i lewej żyły nadnerczowej oraz żyły obwodowej w celu oceny stężeń aldosteronu i kortyzolu.',
    clinicalSignificance:
      'Złoty standard różnicowania jednostronnego gruczolaka (APA — kwalifikacja do adrenalektomii) od obustronnego przerostu kory (BAH — leczenie spironolaktonem). Gradient >4:1 potwierdza lateralizację.',
  },
  {
    id: 'synacthen',
    term: 'Synacthen (Tetracosactide)',
    category: 'leki',
    definition:
      'Syntetyczny peptyd odpowiadający sekwencji pierwszych 24 aminokwasów ludzkiego hormonu adrenokortykotropowego (ACTH 1-24), zachowujący pełną aktywność biologiczną stymulacji kory.',
    clinicalSignificance:
      'Stosowany w standardowym teście stymulacji 250 µg w diagnostyce niedoczynności kory nadnerczy (prawidłowy szczyt kortyzolu >=18 µg/dl) oraz w diagnostyce bloku 21-hydroksylazy (17-OHP >10 ng/ml).',
  },
  {
    id: '17-ohp',
    term: '17-hydroksyprogesteron (17-OHP)',
    category: 'diagnostyka',
    definition:
      'Steroidowy metabolit pośredni powstający z progesteronu, będący bezpośrednim substratem dla enzymu 21-hydroksylazy w szlaku syntezy kortyzolu.',
    clinicalSignificance:
      'Jego masywna akumulacja we krwi jest markerem wrodzonego przerostu nadnerczy (WPN). Stężenie >2 ng/ml w fazie folikularnej budzi podejrzenie, a >10 ng/ml po Synacthenie potwierdza nieklasyczny WPN (NC-CAH).',
  },
  {
    id: 'metanefryny',
    term: 'Wolne metanefryny w osoczu',
    category: 'diagnostyka',
    definition:
      'Metabolity katecholamin (metanefryna powstająca z adrenaliny oraz normetanefryna z noradrenaliny) wytwarzane w sposób ciągły wewnątrz komórek chromafinowych pod wpływem enzymu COMT.',
    clinicalSignificance:
      'Złoty standard i najczulszy test przesiewowy (czułość 97–99%) w wykrywaniu guza chromochłonnego (pheochromocytoma) i paraganglioma. Krew pobiera się na leżąco po 20–30 min odpoczynku.',
  },
  {
    id: 'feochromocytoma',
    term: 'Guz chromochłonny (Pheochromocytoma)',
    category: 'choroby',
    definition:
      'Rzadki nowotwór neuroendokrynny wywodzący się z komórek chromafinowych rdzenia nadnerczy, wydzielający w sposób ciągły lub napadowy katecholaminy.',
    clinicalSignificance:
      'Objawia się triadą: ból głowy, zlewne poty i kołatanie serca z przełomami nadciśnieniowymi. W 35–40% uwarunkowany genetycznie (MEN2, VHL, NF1, SDHx). Wymaga bezwzględnej blokady alfa przed beta-blokerem!',
  },
  {
    id: 'choroba addisona',
    term: 'Choroba Addisona',
    category: 'choroby',
    definition:
      'Pierwotna przewlekła niedoczynność kory nadnerczy spowodowana zniszczeniem >90% miąższu obu gruczołów, najczęściej na podłożu autoimmunologicznym (anty-21-OH).',
    clinicalSignificance:
      'Charakteryzuje się osłabieniem, chudnięciem, hipotensją, hiponatremią z hiperkaliemią oraz hiperpigmentacją skóry i błon śluzowych (melanodermią) wywołaną nadmiarem ACTH/POMC.',
  },
  {
    id: 'przelom nadnerczowy',
    term: 'Ostry przełom nadnerczowy',
    category: 'choroby',
    definition:
      'Stan bezpośredniego zagrożenia życia wywołany ostrym niedoborem kortyzolu, prowadzący do zapaści naczyniowej (vasoplegia) i wstrząsu hemodynamicznego opornego na katecholaminy.',
    clinicalSignificance:
      'Występuje w przebiegu infekcji, urazu lub nagłego odstawienia sterydów. Wymaga natychmiastowego podania 100 mg hydrokortyzonu i.v. i agresywnej płynoterapii 0,9% NaCl bez czekania na wyniki badań.',
  },
  {
    id: 'zespol conna',
    term: 'Zespół Conna (APA)',
    category: 'choroby',
    definition:
      'Pierwotny hiperaldosteronizm wywołany pojedynczym autonomicznym gruczolakiem strefy kłębuszkowej kory nadnercza produkującym aldosteron.',
    clinicalSignificance:
      'Odpowiada za ok. 35% przypadków pierwotnego hiperaldosteronizmu. Cechuje się nadciśnieniem tętniczym, podwyższonym ARR i lateralizacją w AVS. Jest w pełni wyleczalny jednostronną adrenalektomią.',
  },
  {
    id: 'zespol macs',
    term: 'Łagodna autonomiczna sekrecja kortyzolu (MACS)',
    category: 'choroby',
    definition:
      'Autonomiczne wydzielanie kortyzolu przez guz nadnercza (incydentaloma) bez pełnoobjawowego fenotypu zespołu Cushinga, definiowane stężeniem kortyzolu >1,8 µg/dl w teście 1 mg DEX.',
    clinicalSignificance:
      'Prowadzi do skrytych powikłań metabolicznych i sercowo-naczyniowych (oporne nadciśnienie, cukrzyca, osteoporoza ze złamaniami kręgów). Wymaga osłony hydrokortyzonem przy zabiegach chirurgicznych.',
  },
  {
    id: 'wpn',
    term: 'Wrodzony przerost nadnerczy (WPN / CAH)',
    category: 'choroby',
    definition:
      'Zespół chorób uwarunkowanych autosomalnie recesywnie, w których mutacja enzymu sterydogenezy (najczęściej 21-hydroksylazy) uniemożliwia syntezę kortyzolu i prowadzi do hiperplazji kory pod wpływem ACTH.',
    clinicalSignificance:
      'Substraty uciekają w szlak androgenowy: w postaci klasycznej daje wirylizację u dziewczynek i śmiertelną utratę soli u noworodków, a w postaci nieklasycznej hirsutyzm i niepłodność u młodych kobiet.',
  },
  {
    id: 'rak kory nadnerczy',
    term: 'Rak kory nadnerczy (ACC)',
    category: 'choroby',
    definition:
      'Rzadki, wysoce złośliwy nowotwór kory nadnerczy charakteryzujący się szybkim wzrostem, dużą masą (>4–6 cm), martwicą oraz często mieszaną sekrecją hormonalną (kortyzol + androgeny).',
    clinicalSignificance:
      'Rozpoznanie mikroskopowe opiera się na skali Weissa (>=3 kryteria). Leczeniem z wyboru jest otwarta radykalna resekcja R0 oraz terapia adrenolityczna mitotanem z substytucją glikokortykosteroidową.',
  },
  {
    id: 'mitotan',
    term: 'Mitotan (o,p\'-DDD)',
    category: 'leki',
    definition:
      'Pochodna insektycydu DDT o wybiórczym działaniu cytotoksycznym na mitochondria komórek kory nadnerczy, hamująca enzymy sterydogenezy CYP11A1 i CYP11B1.',
    clinicalSignificance:
      'Lek pierwszego rzutu w terapii uzupełniającej i zaawansowanej raka kory nadnerczy (ACC). Wymaga monitorowania stężenia (okno 14–20 mg/l) oraz podwójnych dawek hydrokortyzonu z powodu indukcji CYP3A4.',
  },
  {
    id: 'fludrokortyzon',
    term: 'Fludrokortyzon',
    category: 'leki',
    definition:
      'Syntetyczny, silny analog mineralokortykosteroidowy o znikomym działaniu glikokortykoidowym w dawkach terapeutycznych, stymulujący receptory MR w nerkach.',
    clinicalSignificance:
      'Niezbędny składnik terapii substytucyjnej w pierwotnej niedoczynności kory nadnerczy (Addison) oraz w klasycznej postaci WPN z utratą soli. Zatrzymuje sód, normalizuje potas i ciśnienie tętnicze.',
  },
  {
    id: 'fenoksybenzamina',
    term: 'Fenoksybenzamina',
    category: 'leki',
    definition:
      'Nieselektywny, nieodwracalny (kowalencyjny) antagonista receptorów alfa-1 i alfa-2 adrenergicznych o długim czasie działania.',
    clinicalSignificance:
      'Historyczny złoty standard w farmakologicznym przygotowaniu chorych z guzem chromochłonnym do operacji (10–14 dni przed zabiegiem). Zapobiega przełomowi nadciśnieniowemu podczas manipulacji guzem.',
  },
  {
    id: 'doksazosyna',
    term: 'Doksazosyna',
    category: 'leki',
    definition:
      'Długo działający, wybiórczy antagonista postsynaptycznych receptorów alfa-1 adrenergicznych.',
    clinicalSignificance:
      'Współcześnie preferowana alternatywa dla fenoksybenzaminy w przygotowaniu przedoperacyjnym feochromocytoma; nie wpływa istotnie na wskaźnik ARR w diagnostyce pierwotnego hiperaldosteronizmu.',
  },
  {
    id: 'spironolakton',
    term: 'Spironolakton',
    category: 'leki',
    definition:
      'Nieselektywny antagonista receptorów mineralokortykoidowych (MR), blokujący wiązanie aldosteronu w komórkach głównych cewek zbiorczych nerek.',
    clinicalSignificance:
      'Lek z wyboru w zachowawczym leczeniu obustronnego przerostu nadnerczy (BAH) w pierwotnym hiperaldosteronizmie. Zatrzymuje potas i obniża ciśnienie. Może wywoływać ginekomastię.',
  },
  {
    id: 'eplerenon',
    term: 'Eplerenon',
    category: 'leki',
    definition:
      'Wybiórczy antagonista receptorów mineralokortykoidowych o znacznie mniejszym powinowactwie do receptorów androgenowych i progesteronowych niż spironolakton.',
    clinicalSignificance:
      'Stosowany w pierwotnym hiperaldosteronizmie u mężczyzn rozwiających ginekomastię lub u kobiet z zaburzeniami miesiączkowania po spironolaktonie.',
  },
  {
    id: 'jednostki hounsfielda',
    term: 'Jednostki Hounsfielda (HU)',
    category: 'diagnostyka',
    definition:
      'Ilościowa skala osłabienia promieniowania rentgenowskiego w tomografii komputerowej, w której woda ma wartość 0 HU, a powietrze -1000 HU.',
    clinicalSignificance:
      'W incydentaloma nadnercza gęstość natywna <=10 HU definiuje łagodnego gruczolaka bogatego w lipidy. Gęstość >10 HU wymaga dalszej oceny washoutu w celu wykluczenia raka lub guza chromochłonnego.',
  },
  {
    id: 'washout tk',
    term: 'Współczynnik wymywania kontrastu (Washout)',
    category: 'diagnostyka',
    definition:
      'Parametr radiologiczny w wielofazowej TK określający odsetek środka cieniującego wypłukanego ze zmiany nadnerczowej po 15 minutach opóźnienia.',
    clinicalSignificance:
      'Bezwzględny wskaźnik APW >=60% lub względny RPW >=40% potwierdza łagodnego gruczolaka ubogiego w lipidy. Słaby washout (<60%) cechuje nowotwory złośliwe (ACC) i przerzuty.',
  },
  {
    id: 'skala weissa',
    term: 'Skala Weissa',
    category: 'diagnostyka',
    definition:
      'System histopatologiczny oparty na 9 cechach mikroskopowych (m.in. mitozy >5/50 HPF, atypowe figury podziału, martwica, inwazja naczyń i torebki) służący do oceny złośliwości guzów kory nadnerczy.',
    clinicalSignificance:
      'Spełnienie co najmniej 3 kryteriów (wynik >=3 z 9) jest uznawane za złoty standard rozpoznania raka kory nadnerczy (ACC).',
  },
  {
    id: 'melanodermia',
    term: 'Melanodermia',
    category: 'fizjologia',
    definition:
      'Uogólnione ciemnienie powłok skórnych i błon śluzowych wywołane nadmierną stymulacją receptorów MC1R na melanocytach przez peptydy pochodzące z rozszczepienia POMC (ACTH i MSH).',
    clinicalSignificance:
      'Kardynalny objaw kliniczny odróżniający pierwotną niedoczynność kory nadnerczy (Addison) od niedoczynności wtórnej (przysadkowej, w której skóra jest alabastrowo blada).',
  },
  {
    id: 'komorki chromafinowe',
    term: 'Komórki chromafinowe (Feochromocyty)',
    category: 'anatomia',
    definition:
      'Zmodyfikowane neurony zazwojowe układu współczulnego zlokalizowane w rdzeniu nadnerczy i ciałkach przyzwojowych, wybarwiające się solami chromu na brunatno.',
    clinicalSignificance:
      'Pod wpływem acetylocholiny z przedzwojowych włókien współczulnych uwalniają do krwi katecholaminy (głównie adrenalinę). Stanowią punkt wyjścia dla guza chromochłonnego.',
  },
  {
    id: 'powiez geroty',
    term: 'Powięź Geroty (Powięź nerkowa)',
    category: 'anatomia',
    definition:
      'Gęsta blaszka tkanki łącznej włóknistej otaczająca nerkę, nadnercze oraz torebkę tłuszczową okołonerkową w przestrzeni zaotrzewnowej.',
    clinicalSignificance:
      'Stanowi naturalną barierę anatomiczną ograniczającą rozrost nowotworów kory i rdzenia nadnerczy. W operacjach radykalnych raka ACC usuwa się narząd en bloc w granicach powięzi Geroty.',
  },
  {
    id: 'renina',
    term: 'Renina (Aktywność reninowa osocza / DRC)',
    category: 'hormony',
    definition:
      'Enzym proteolityczny wydzielany przez aparat przykłębuszkowy nerek w odpowiedzi na spadek ciśnienia perfuzji, hiponatremię lub pobudzenie współczulne, rozszczepiający angiotensynogen do angiotensyny I.',
    clinicalSignificance:
      'Oznaczana jako bezpośrednie stężenie reniny (DRC) lub aktywność reninowa (ARO/PRA). Jest stłumiona w pierwotnym hiperaldosteronizmie (zespół Conna) oraz odruchowo wysoka w chorobie Addisona.',
  },
  {
    id: 'zespół waterhouse’a-friderichsena',
    term: 'Zespół Waterhouse’a-Friderichsena',
    category: 'choroby',
    definition:
      'Piorunująca postać ostrej niewydolności kory nadnerczy spowodowana masywnym obustronnym wylewem krwi do nadnerczy w przebiegu posocznicy, najczęściej meningokokowej (Neisseria meningitidis).',
    clinicalSignificance:
      'Charakteryzuje się wstrząsem septyczno-hipowolemicznym, zespołem DIC oraz wybroczynami na skórze. Śmiertelność przekracza 50%; wymaga natychmiastowej antybiotykoterapii, resuscytacji płynowej i wlewu hydrokortyzonu.',
  },
];
