import type { GlossaryItem } from './glossary.ts';

export const gonadsGlossary: GlossaryItem[] = [
  {
    id: 'gnrh',
    term: 'GnRH',
    aliases: ['gonadoliberyna', 'lhrh'],
    category: 'hormony',
    definition: 'Dekapeptyd podwzgórzowy wydzielany pulsacyjnie przez neurony KNDy, stymulujący przysadkę do uwalniania LH i FSH.',
    clinicalSignificance: 'Pulsacyjne wydzielanie warunkuje czynność osi HPG. Ciągły wlew analogów prowadzi do desensytyzacji i kastracji farmakologicznej.'
  },
  {
    id: 'lh',
    term: 'LH',
    aliases: ['lutropina', 'hormon luteinizujący'],
    category: 'hormony',
    definition: 'Gonadotropina przysadkowa stymulująca komórki Leydiga w jądrach (do syntezy testosteronu) oraz komórki osłonki jajnika i owulację.',
    normalRange: 'Mężczyźni: 1,5–9,0 IU/l; Kobiety: f. folikularna 2–10, pik owulacyjny 20–80 IU/l',
    clinicalSignificance: 'Wysokie LH przy niskim testosteronie definiuje hipogonadyzm hipergonadotropowy (pierwotny). Niskie LH wskazuje na przyczynę podwzgórzowo-przysadkową.'
  },
  {
    id: 'fsh',
    term: 'FSH',
    aliases: ['folitropina', 'hormon folikulotropowy'],
    category: 'hormony',
    definition: 'Gonadotropina przysadkowa stymulująca komórki Sertolego (spermatogeneza) oraz dojrzewanie pęcherzyków jajnikowych i aromatazę komórek ziarnistych.',
    normalRange: 'Mężczyźni: 1,5–12,0 IU/l; Kobiety: f. folikularna 3,5–12,5 IU/l; menopauza > 25–30 IU/l',
    clinicalSignificance: 'FSH > 25 IU/l u kobiety < 40. r.ż. potwierdza przedwczesną niewydolność jajników (POI). U mężczyzn podwyższone FSH wskazuje na uszkodzenie kanalików nasiennych.'
  },
  {
    id: 'testosteron',
    term: 'Testosteron',
    aliases: ['testosterone', 't całkowity'],
    category: 'hormony',
    definition: 'Główny steroidowy hormon androgenny produkowany przez komórki Leydiga w jądrach oraz w mniejszym stopniu przez korę nadnerczy i jajniki.',
    normalRange: 'Mężczyźni: 12,0–30,0 nmol/l (350–1000 ng/dl); Kobiety: 0,5–1,8 nmol/l (15–50 ng/dl)',
    clinicalSignificance: 'Niski testosteron poranny (< 12 nmol/l lub < 350 ng/dl) wymaga potwierdzenia i oceny frakcji wolnej (Vermeulen) w podejrzeniu hipogonadyzmu.'
  },
  {
    id: 'estradiol',
    term: '17-beta-estradiol',
    aliases: ['estradiol', 'e2'],
    category: 'hormony',
    definition: 'Główny i najsilniejszy biologicznie estrogen produkowany przez komórki ziarniste jajników oraz obwodowo przez aromatazę z testosteronu.',
    normalRange: 'Kobiety: f. folikularna 30–120 pg/ml, pik owulacyjny 150–400 pg/ml; Mężczyźni: 10–40 pg/ml',
    clinicalSignificance: 'Niezbędny do rozwoju cech płciowych, proliferacji endometrium i mineralizacji kości. W MHT i feminizującej GAHT cel wynosi 100–200 pg/ml.'
  },
  {
    id: 'shbg',
    term: 'SHBG',
    aliases: ['globulina wiążąca hormony płciowe'],
    category: 'fizjologia',
    definition: 'Glikoproteina wątrobowa wiążąca testosteron i estradiol z wysokim powinowactwem, modulująca frakcję wolną biologicznie aktywną.',
    normalRange: 'Mężczyźni: 18–54 nmol/l; Kobiety: 30–90 nmol/l',
    clinicalSignificance: 'Spada w otyłości, cukrzycy i hiperinsulinemii (pozornie zaniżając testosteron całkowity); rośnie z wiekiem, w nadczynności tarczycy i przy estrogenach.'
  },
  {
    id: 'dht',
    term: 'Dihydrotestosteron',
    aliases: ['5-alfa-dht', 'dht'],
    category: 'hormony',
    definition: 'Silny androgen tkankowy powstający z testosteronu pod wpływem 5-alfa-reduktazy, o 2–5-krotnie wyższym powinowactwie do receptora AR.',
    clinicalSignificance: 'Odpowiada za rozwój zewnętrznych narządów płciowych męskich in utero, zarost, łojotok oraz łysienie androgenowe i rozrost stercza.'
  },
  {
    id: 'amh',
    term: 'AMH',
    aliases: ['hormon antymüllerowski', 'mis'],
    category: 'diagnostyka',
    definition: 'Glikoproteina z rodziny TGF-beta wydzielana przez komórki ziarniste pęcherzyków preantralnych i małych antralnych jajnika oraz komórki Sertolego jąder.',
    normalRange: 'Kobiety w wieku rozrodczym: 1,0–3,5 ng/ml; PCOS: > 3,5–5,0 ng/ml; POI: < 0,1 ng/ml',
    clinicalSignificance: 'Najstabilniejszy marker rezerwy jajnikowej (niezależny od dnia cyklu). U płodów męskich powoduje fizjologiczną regresję przewodów Müllera.'
  },
  {
    id: 'inhibina-b',
    term: 'Inhibina B',
    aliases: ['inhibin b'],
    category: 'diagnostyka',
    definition: 'Hormon peptydowy wydzielany przez komórki Sertolego w jądrach oraz komórki ziarniste jajników, wybiórczo hamujący wydzielanie FSH.',
    clinicalSignificance: 'Czuły marker spermatogenezy u mężczyzn oraz marker wznowy ziarniszczaka jajnika (granulosa cell tumor).'
  },
  {
    id: 'hcg',
    term: 'hCG',
    aliases: ['gonadotropina kosmówkowa', 'beta-hcg'],
    category: 'hormony',
    definition: 'Hormon trofoblastu o budowie zbliżonej do LH, stymulujący ciałko żółte w ciąży oraz komórki Leydiga do produkcji testosteronu.',
    clinicalSignificance: 'Stosowany w medycynie rozrodu jako trigger owulacji oraz w andrologii do restartu spermatogenezy i steroidogenezy jądrowej.'
  },
  {
    id: 'progesteron',
    term: 'Progesteron',
    aliases: ['p4'],
    category: 'hormony',
    definition: 'Steroid wydzielany przez ciałko żółte w fazie lutealnej oraz łożysko, przygotowujący endometrium do implantacji i podtrzymujący ciążę.',
    normalRange: 'Faza lutealna (dzień 21. cyklu): > 10 ng/ml (świadczy o przebytej owulacji)',
    clinicalSignificance: 'W terapii estrogenowej u kobiet z zachowaną macicą niezbędny do ochrony przed hiperplazją i rakiem endometrium.'
  },
  {
    id: 'cyp19a1',
    term: 'Aromataza (CYP19A1)',
    aliases: ['aromataza', 'syntaza estrogenowa'],
    category: 'fizjologia',
    definition: 'Enzym mikrosomalny cytochromu P450 katalizujący 3-etapową aromatyzację pierścienia A androgenów do pierścienia fenolowego estrogenów.',
    clinicalSignificance: 'Ekspresja w jajnikach, tkance tłuszczowej, kościach i mózgu. Docelowy punkt uchwytu inhibitorów aromatazy (letrozol, anastrozol) w onkologii i indukcji owulacji.'
  },
  {
    id: 'srd5a2',
    term: '5-alfa-reduktaza (SRD5A2)',
    aliases: ['5-alpha-reductase', 'srd5a2'],
    category: 'fizjologia',
    definition: 'Enzym NADPH-zależny redukujący wiązanie podwójne C4=C5 w testosteronie, tworząc 5-alfa-dihydrotestosteron (DHT).',
    clinicalSignificance: 'Wrodzona mutacja prowadzi do 46,XY DSD (niejednoznaczne narządy płciowe u noworodka, wirylizacja w pokwitaniu). Hamowany przez finasteryd i dutasteryd.'
  },
  {
    id: 'pcos',
    term: 'Zespół policystycznych jajników',
    aliases: ['pcos', 'zespół steina-leventhala'],
    category: 'choroby',
    definition: 'Najczęstsza endokrynopatia kobiet w wieku rozrodczym charakteryzująca się oligo-/brakiem owulacji, hiperandrogenizmem i policystyczną morfologią jajników.',
    clinicalSignificance: 'Wiąże się z insulinoopornością, zespołem metabolicznym, niepłodnością anowulacyjną oraz podwyższonym ryzykiem raka endometrium.'
  },
  {
    id: 'poi',
    term: 'Przedwczesna niewydolność jajników',
    aliases: ['poi', 'premature ovarian insufficiency'],
    category: 'choroby',
    definition: 'Utrata czynności hormonalnej i rozrodczej jajników przed 40. rokiem życia z oligo-/amenorrhea i FSH > 25 IU/l w 2 pomiarach.',
    clinicalSignificance: 'Wymaga pełnodawkowej substytucji hormonalnej (MHT) co najmniej do 51. roku życia w celu prewencji zawału, osteoporozy i otępienia.'
  },
  {
    id: 'ohss',
    term: 'Zespół hiperstymulacji jajników',
    aliases: ['ohss'],
    category: 'choroby',
    definition: 'Jatrogenne, zagrażające życiu powikłanie stymulacji owulacji po podaniu hCG, wynikające z masywnego wyrzutu VEGF i uogólnionej przepuszczalności naczyń.',
    clinicalSignificance: 'Objawia się wodobrzuszem, hipowolemią, zagęszczeniem krwi (Hct > 45–50%) i skrajnym ryzykiem zakrzepicy. Prewencja: trigger agonistą GnRH i freeze-all.'
  },
  {
    id: 'kallmann',
    term: 'Zespół Kallmanna',
    aliases: ['kallmann syndrome', 'hipogonadyzm z anosmią'],
    category: 'choroby',
    definition: 'Genetycznie uwarunkowany hipogonadyzm hipogonadotropowy z towarzyszącym brakiem węchu (anosmią/hiposmią) w wyniku defektu migracji neuronów GnRH.',
    clinicalSignificance: 'Manifestuje się brakiem spontanicznego dojrzewania płciowego i eunuchoidalną budową ciała; leczenie TRT lub gonadotropinami w celu indukcji płodności.'
  },
  {
    id: 'klinefelter',
    term: 'Zespół Klinefeltera',
    aliases: ['klinefelter', '47,xxy'],
    category: 'choroby',
    definition: 'Najczęstsza chromosomalna przyczyna męskiego hipogonadyzmu pierwotnego (47,XXY), cechująca się dysgenezją kanalików nasiennych.',
    clinicalSignificance: 'Objawia się wysokim wzrostem, małymi twardymi jądrami (< 4 ml), azoospermią, ginekomastią i wysokimi stężeniami FSH i LH.'
  },
  {
    id: 'cais',
    term: 'Zespół oporności na androgeny (CAIS)',
    aliases: ['cais', 'zespół morrisa'],
    category: 'choroby',
    definition: 'Zaburzenie rozwoju płci 46,XY DSD spowodowane inaktywującą mutacją receptora androgenowego (AR), dające żeński fenotyp zewnętrzny.',
    clinicalSignificance: 'Jądra obecne w jamie brzusznej/kanale pachwinowym, brak macicy (obecny AMH), ślepa pochwa, brak owłosienia łonowego. Ryzyko gonadoblastoma po pokwitaniu.'
  },
  {
    id: 'serm',
    term: 'SERM',
    aliases: ['selektywne modulatory receptora estrogenowego'],
    category: 'leki',
    definition: 'Leki łączące się z kieszenią wiążącą ligand (LBD) receptora ER, wykazujące działanie antagonistyczne w jednych tkankach i agonistyczne w innych.',
    clinicalSignificance: 'Tamoksyfen: antagonista w piersi (leczenie raka i ginekomastii). Klomifen: antagonista w podwzgórzu (indukcja owulacji i restart osi HPG u mężczyzn).'
  }
];
