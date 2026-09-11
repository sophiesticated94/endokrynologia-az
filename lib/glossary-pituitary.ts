import type { GlossaryItem } from './glossary.ts';

export const pituitaryGlossary: GlossaryItem[] = [
  {
    id: 'prl',
    term: 'Prolaktyna',
    aliases: ['PRL', 'laktotropina'],
    category: 'hormony',
    definition: 'Hormon polipeptydowy przedniego płata przysadki mózgowej odpowiedzialny za laktację i rozwój gruczołów sutkowych.',
    normalRange: '<25 ng/ml (kobiety), <20 ng/ml (mężczyźni)',
    clinicalSignificance: 'Podlega tonicznemu hamowaniu przez podwzgórzową dopaminę. Wartości >100 ng/ml silnie przemawiają za prolactinoma, a wartości 25–100 ng/ml mogą wynikać z efektu szypułowego, leków, stresu lub niewydolności nerek.'
  },
  {
    id: 'makroprolaktyna',
    term: 'Makroprolaktyna',
    aliases: ['big-big PRL', 'macroprolactin'],
    category: 'diagnostyka',
    definition: 'Wysokocząsteczkowy kompleks monomeru prolaktyny z autoprzeciwciałami klasy IgG o minimalnej bioaktywności in vivo.',
    clinicalSignificance: 'Fałszywie zawyża stężenie PRL w rutynowych testach immunochemicznych. Wymaga wykluczenia metodą precypitacji glikolem polietylenowym (PEG) u bezobjawowych osób z hiperprolaktynemią przed wdrożeniem leczenia.'
  },
  {
    id: 'efekt-hook',
    term: 'Efekt hook',
    aliases: ['efekt hakowy', 'high-dose hook effect'],
    category: 'diagnostyka',
    definition: 'Artefakt laboratoryjny w testach kanapkowych (dwupunktowych), w którym ekstremalnie wysokie stężenie antygenu nasyca przeciwciała wychwytujące i znakowane.',
    clinicalSignificance: 'W olbrzymich gruczolakach prolaktynowych (>3 cm) może dać paradoksalnie tylko miernie podwyższony wynik PRL (np. 50 ng/ml zamiast 50 000 ng/ml). Wymaga seryjnego rozcieńczenia surowicy (1:100), aby uniknąć błędnego rozpoznania NFPA i niepotrzebnej operacji.'
  },
  {
    id: 'kabergolina',
    term: 'Kabergolina',
    aliases: ['Dostinex'],
    category: 'leki',
    definition: 'Syntetyczny, długo działający wybiórczy agonista receptorów dopaminergicznych D2.',
    clinicalSignificance: 'Lek pierwszego wyboru w prolactinoma. Normalizuje PRL u >90% chorych i powoduje znaczne zmniejszenie masy guza. Charakteryzuje się lepszą tolerancją i skutecznością niż bromokryptyna. W dużych dawkach wymaga monitorowania echokardiograficznego zastawek serca.'
  },
  {
    id: 'dopamina',
    term: 'Dopamina',
    aliases: ['PIF', 'czynnik hamujący prolaktynę'],
    category: 'hormony',
    definition: 'Katecholamina podwzgórzowa wydzielana do krążenia wrotnego przysadki, działająca na receptory D2 laktotrofów.',
    clinicalSignificance: 'Jedyny hormon podwzgórzowy wywierający stały, fizjologiczny tonus hamujący na przysadkę. Przerwanie szypuły (uraz, guz) znosi ten wpływ i skutkuje hiperprolaktynemią (efekt odszypułowania / stalk effect).'
  },
  {
    id: 'gh',
    term: 'Hormon wzrostu',
    aliases: ['GH', 'somatotropina', 'STH'],
    category: 'hormony',
    definition: 'Hormon anaboliczny wydzielany pulsacyjnie przez komórki somatotropowe przedniego płata przysadki.',
    normalRange: 'Wydzielanie pulsacyjne, przypadkowy pomiar nie ma wartości diagnostycznej',
    clinicalSignificance: 'Stymuluje wątrobową syntezę IGF-1. Nadmiar u dorosłych prowadzi do akromegalii, a u dzieci do gigantyzmu. W diagnostyce akromegalii bada się brak jego supresji w teście OGTT (<1,0 µg/l).'
  },
  {
    id: 'igf1',
    term: 'IGF-1',
    aliases: ['somatomedyna C', 'insulinopodobny czynnik wzrostu 1'],
    category: 'hormony',
    definition: 'Główny obwodowy mediator działania hormonu wzrostu produkowany głównie w wątrobie.',
    normalRange: 'Zależy ściśle od wieku i płci (normy wieloośrodkowe)',
    clinicalSignificance: 'Podstawowy i najczulszy test przesiewowy w kierunku akromegalii i niedoboru hormonu wzrostu dzięki stabilnemu stężeniu dobowemu (nie ulega pulsacjom jak GH).'
  },
  {
    id: 'somatostatyna',
    term: 'Somatostatyna',
    aliases: ['SRIF', 'GHIH'],
    category: 'hormony',
    definition: 'Peptyd podwzgórzowy hamujący uwalnianie hormonu wzrostu, TSH oraz hormonów żołądkowo-jelitowych.',
    clinicalSignificance: 'Fizjologiczny hamulec osi somatotropowej. Jej syntetyczne analogi są fundamentem farmakoterapii guzów neuroendokrynnych i akromegalii.'
  },
  {
    id: 'oktreotyd',
    term: 'Oktreotyd',
    aliases: ['analog somatostatyny', 'Sandostatin', 'lanreotyd'],
    category: 'leki',
    definition: 'Syntetyczny oktapeptydowy analog somatostatyny o wysokim powinowactwie do receptorów sstr2 i sstr5.',
    clinicalSignificance: 'Lek z wyboru w farmakoterapii akromegalii (po niecałkowitej resekcji TSS lub przy przeciwwskazaniach do operacji) oraz w guzkach TSH-zależnych i guzach neuroendokrynnych (NET).'
  },
  {
    id: 'pegwisomant',
    term: 'Pegwisomant',
    aliases: ['antagonista receptora GH'],
    category: 'leki',
    definition: 'Genetycznie zmodyfikowany analog ludzkiego hormonu wzrostu działający jako antagonista receptora GH.',
    clinicalSignificance: 'Stosowany w opornej akromegalii, gdy analogi somatostatyny nie normalizują IGF-1. Bezpośrednio blokuje receptor obwodowy i obniża IGF-1, nie wpływając na wielkość samego gruczolaka.'
  },
  {
    id: 'acth',
    term: 'Kortykotropina',
    aliases: ['ACTH', 'hormon adrenokortykotropowy'],
    category: 'hormony',
    definition: 'Peptyd wytwarzany z proopiomelanokortyny (POMC) przez komórki kortykotropowe przedniego płata przysadki.',
    normalRange: '10–60 pg/ml (o 8:00 rano, wyraźny rytm dobowy)',
    clinicalSignificance: 'Pobudza warstwę pasmowatą kory nadnerczy do syntezy kortyzolu. Kluczowy parametr różnicujący ACTH-zależny (choroba Cushinga, ektopowe ACTH) od ACTH-niezależnego (guz kory nadnercza) zespołu Cushinga.'
  },
  {
    id: 'deksametazon',
    term: 'Deksametazon',
    aliases: ['test z 1 mg deksametazonu', 'test nocnego hamowania'],
    category: 'diagnostyka',
    definition: 'Silny syntetyczny glikokortykosteroid stosowany m.in. w teście hamowania wydzielania kortyzolu.',
    normalRange: 'Kortyzol poranny po teście <1,8 µg/dl (50 nmol/l) wyklucza hiperkortyzolemię',
    clinicalSignificance: 'Złoty standard przesiewowej diagnostyki zespołu Cushinga. Przyjęcie 1 mg o 23:00 powinno stłumić poranny wyrzut ACTH i obniżyć kortyzol o 8:00 poniżej 1,8 µg/dl.'
  },
  {
    id: 'ufc',
    term: 'Wolny kortyzol w moczu',
    aliases: ['UFC', 'dobowa zbiórka moczu na kortyzol'],
    category: 'diagnostyka',
    definition: 'Pomiar niezwiązanego kortyzolu wydalonego w 24-godzinnej zbiórce moczu.',
    clinicalSignificance: 'Odzwierciedla całkowitą biologiczną dobową produkcję wolnego kortyzolu. Wymaga co najmniej dwukrotnego powtórzenia; wynik >3-krotność normy silnie wskazuje na zespół Cushinga.'
  },
  {
    id: 'bipss',
    term: 'BIPSS',
    aliases: ['obustronne cewnikowanie zatok skalistych dolnych'],
    category: 'diagnostyka',
    definition: 'Inwazyjne badanie angiograficzne polegające na jednoczesnym pobraniu krwi z obu zatok skalistych dolnych i żyły obwodowej po stymulacji CRH.',
    clinicalSignificance: 'Złoty standard różnicowania przysadkowej choroby Cushinga od ektopowego wydzielania ACTH (np. rakowiaka płuc). Gradient zatoka/obwód >2 w warunkach podstawowych lub >3 po CRH potwierdza przysadkowe źródło ACTH.'
  },
  {
    id: 'avp',
    term: 'Wazopresyna',
    aliases: ['AVP', 'ADH', 'arginino-wazopresyna', 'hormon antydiuretyczny'],
    category: 'hormony',
    definition: 'Nonapeptyd syntetyzowany w jądrach nadwzrokowym i przykomorowym podwzgórza, magazynowany i wydzielany przez tylny płat przysadki.',
    clinicalSignificance: 'Reguluje reabsorpcję wolnej wody w cewkach zbiorczych nerek poprzez receptory V2 i akwaporyny 2. Niedobór prowadzi do moczówki prostej, a niekontrolowany nadmiar do zespołu SIADH.'
  },
  {
    id: 'desmopresyna',
    term: 'Desmopresyna',
    aliases: ['dDAVP', 'Minirin'],
    category: 'leki',
    definition: 'Syntetyczny analog wazopresyny o wybiórczym działaniu antydiuretycznym na receptor V2 bez istotnego wpływu naczynioskurczowego.',
    clinicalSignificance: 'Lek z wyboru w leczeniu moczówki prostej centralnej. Używana również w teście odwodnieniowym do różnicowania moczówki centralnej (wzrost osmolalności moczu >50%) od nerkowej.'
  },
  {
    id: 'test-odwodnieniowy',
    term: 'Test odwodnieniowy',
    aliases: ['test odwodnieniowo-wazopresynowy'],
    category: 'diagnostyka',
    definition: 'Standardowe badanie czynnościowe różnicujące przyczyny zespołu wielomoczu i wzmożonego pragnienia.',
    clinicalSignificance: 'Polega na kontrolowanym wstrzymaniu płynów z monitorowaniem osmolalności osocza i moczu, a w drugim etapie podaniu dDAVP. Rozstrzyga pomiędzy polidypsją pierwotną, moczówką centralną i nerkową.'
  },
  {
    id: 'siadh',
    term: 'Zespół SIADH',
    aliases: ['zespół Schwartza-Barttera', 'zespół nieadekwatnego wydzielania wazopresyny'],
    category: 'choroby',
    definition: 'Stan hipoosmotycznej hiponatremii wywołany niesuprymowanym wydzielaniem wazopresyny mimo braku bodźców osmotycznych i hemodynamicznych.',
    clinicalSignificance: 'Cechuje się kliniczną euwolemią, wysokim sodem w moczu (>30 mmol/l) i nieadekwatnie zagęszczonym moczem (>100 mOsm/kg). Wymaga restrykcji płynów i ostrożnego wyrównywania sodu.'
  },
  {
    id: 'cpm',
    term: 'Mielinoliza pośrodkowa mostu',
    aliases: ['CPM', 'zespół demielinizacji osmotycznej', 'ODS'],
    category: 'choroby',
    definition: 'Iatrogenne uszkodzenie osłonek mielinowych w moście mózgu na skutek zbyt szybkiego wyrównywania przewlekłej hiponatremii.',
    clinicalSignificance: 'Prowadzi do tetraplegii, porażenia opuszkowego i zespołu zamknięcia (locked-in). Aby temu zapobiec, tempo korekty natremii nie może przekraczać 8–10 mmol/l w pierwszych 24h.'
  },
  {
    id: 'zespol-sheehana',
    term: 'Zespół Sheehana',
    aliases: ['poporodowa martwica przysadki'],
    category: 'choroby',
    definition: 'Niedokrwienna martwica przedniego płata przysadki mózgowej w następstwie ciężkiego krwotoku i wstrząsu hipowolemicznego podczas porodu.',
    clinicalSignificance: 'Wczesnym objawem jest agalakcja (brak nawału pokarmu i laktacji po porodzie), a późnym wtórny brak miesiączki oraz postępująca niedoczynność kory nadnerczy i tarczycy.'
  },
  {
    id: 'apopleksja-przysadki',
    term: 'Udar przysadki',
    aliases: ['apopleksja przysadkowa', 'krwotok do guza przysadki'],
    category: 'choroby',
    definition: 'Ostry zespół kliniczny wywołany nagłym krwotokiem lub martwicą w obrębie powiększonej przysadki lub istniejącego gruczolaka.',
    clinicalSignificance: 'Objawia się piorunującym bólem głowy, podwójnym widzeniem, oftalmoplegią i ostrym wtórnym przełomem nadnerczowym. Wymaga natychmiastowego dożylnego podania hydrokortyzonu i pilnej oceny neurochirurgicznej.'
  },
  {
    id: 'hipofizyt',
    term: 'Hipofizyt',
    aliases: ['hypophysitis', 'zapalenie przysadki'],
    category: 'choroby',
    definition: 'Przewlekły lub ostry proces zapalny przysadki (limfocytowy, ziarniniakowy, IgG4-zależny lub indukowany lekami biologicznymi).',
    clinicalSignificance: 'Częste powikłanie immunoterapii nowotworów inhibitorami punktów kontrolnych (anty-CTLA-4 ipilimumab, anty-PD-1). Najczęściej prowadzi do trwałego niedoboru osi ACTH i TSH.'
  },
  {
    id: 'hemianopsia-bitemporalis',
    term: 'Niedowidzenie połowicze dwuskroniowe',
    aliases: ['hemianopsia bitemporalna', 'ubytek pól skroniowych'],
    category: 'anatomia',
    definition: 'Klasyczny ubytek w polu widzenia obu oczu wywołany uciskiem od dołu na skrzyżowanie wzrokowe (chiasma opticum).',
    clinicalSignificance: 'Wynika z uszkodzenia skrzyżowanych włókien z nosowych części siatkówek odpowiadających za widzenie skroniowe. Typowy objaw makrogruczolaków przysadki rosnących nadsiodłowo.'
  },
  {
    id: 'szypula-przysadki',
    term: 'Szypuła przysadki',
    aliases: ['lejek', 'infundibulum', 'efekt odszypułowania'],
    category: 'anatomia',
    definition: 'Wąska struktura anatomiczna łącząca guz popielaty podwzgórza z przysadką, zawierająca aksony drogi podwzgórzowo-przysadkowej i naczynia wrotne.',
    clinicalSignificance: 'Jej ucisk lub przerwanie (stalk effect) odcina dopływ hamującej dopaminy, wywołując łagodną/umiarkowaną hiperprolaktynemię (zwykle <100 ng/ml) mimo braku guza prolaktynowego.'
  },
  {
    id: 'zatoka-jamista',
    term: 'Zatoka jamista',
    aliases: ['sinus cavernosus'],
    category: 'anatomia',
    definition: 'Parzysta przestrzeń żylna podstawy czaszki otaczająca po obu stronach siodło tureckie.',
    clinicalSignificance: 'Zawiera tętnicę szyjną wewnętrzną oraz nerwy czaszkowe III, IV, V1, V2 i VI. Boczna inwazja gruczolaka przysadki (skala Knospa 3–4) uciska te nerwy, wywołując ptozę, diplopię i zaburzenia czucia twarzy.'
  },
  {
    id: 'test-tolerancji-insuliny',
    term: 'Test tolerancji insuliny',
    aliases: ['ITT', 'insulin tolerance test'],
    category: 'diagnostyka',
    definition: 'Złoty standard oceny rezerwy osi somatotropowej i kortykotropowej oparty na wywołaniu kontrolowanej hipoglikemii (<40 mg/dl).',
    clinicalSignificance: 'Głęboka hipoglikemia stanowi najsilniejszy bodziec stresowy dla wydzielania GH i ACTH. Bezwzględnie przeciwwskazany u chorych z chorobą niedokrwienną serca i padaczką.'
  }
];
