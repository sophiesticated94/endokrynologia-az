import type { GlossaryItem } from './glossary.ts';

export const parathyroidGlossary: GlossaryItem[] = [
  {
    id: 'parathormon',
    term: 'Parathormon (PTH)',
    aliases: ['pth', 'ipth', 'parathormon'],
    category: 'hormony',
    definition:
      'Hormon polipeptydowy (84 aminokwasy) wydzielany przez komórki główne przytarczyc w odpowiedzi na spadek stężenia zewnątrzkomórkowego wapnia zjonizowanego.',
    clinicalSignificance:
      'Główny hormon hiperkalcemiczny ustroju: zwiększa reabsorpcję wapnia w cewkach dalszych nerek, indukuje 1alfa-hydroksylazę (synteza kalcytriolu), wywołuje fosfaturię oraz stymuluje osteolizę osteoklastyczną w kościach.',
  },
  {
    id: 'casr',
    term: 'Receptor wapniowy (CaSR)',
    aliases: ['casr', 'receptor wapniowy', 'receptor casr'],
    category: 'fizjologia',
    definition:
      'Receptor błonowy z rodziny receptorów sprzężonych z białkiem G (GPCR), zlokalizowany na komórkach przytarczyc oraz w ramieniu wstępującym pętli Henlego w nerkach.',
    clinicalSignificance:
      'Działa jak fizjologiczny „termostat wapniowy”: wysoki poziom Ca2+ hamuje wydzielanie PTH. Mutacje inaktywujące wywołują FHH, a mutacje aktywujące rodzinną hipokalcemię hiperkalciuryczną.',
  },
  {
    id: 'kalcytriol',
    term: 'Kalcytriol (1,25(OH)2D3)',
    aliases: ['kalcytriol', '1,25(oh)2d3', '1,25(oh)2d', 'aktywna witamina d'],
    category: 'hormony',
    definition:
      'Biologicznie najaktywniejsza postać witaminy D, powstająca w cewce bliższej nerek w wyniku 1alfa-hydroksylacji 25-hydroksywitaminy D przez enzym CYP27B1 pod kontrolą PTH.',
    clinicalSignificance:
      'Zwiększa jelitowe wchłanianie wapnia i fosforanów, pobudza mineralizację kości oraz wywiera ujemne sprzężenie zwrotne na komórki przytarczyc. Jego niedobór jest osią napędową SHPT w chorobach nerek.',
  },
  {
    id: 'fgf23',
    term: 'Czynnik wzrostu fibroblastów 23 (FGF23)',
    aliases: ['fgf23', 'czynnik wzrostu fibroblastów 23'],
    category: 'hormony',
    definition:
      'Hormon białkowy wydzielany przez osteocyty pod wpływem hiperfosfatemii i kalcytriolu, działający w nerkach wspólnie z przezbłonowym koreceptorem Klotho.',
    clinicalSignificance:
      'Kluczowy regulator fosfaturii: hamuje nerkowy kotransporter NPT2a, zmniejsza reabsorpcję fosforanów oraz hamuje enzym CYP27B1, chroniąc przed toksycznym nadmiarem fosforanów w ustroju.',
  },
  {
    id: 'wskaźnik cccr',
    term: 'Wskaźnik klirensu wapniowo-kreatyninowego (CCCR / FeCa)',
    aliases: ['cccr', 'feca', 'wskaźnik cccr', 'klirens wapniowo-kreatyninowy'],
    category: 'diagnostyka',
    definition:
      'Wskaźnik laboratoryjny obliczany ze wzoru: (Ca_mocz * Kreatynina_surowica) / (Ca_surowica * Kreatynina_mocz), oceniający frakcjonowane nerkowe wydalanie wapnia.',
    clinicalSignificance:
      'Złoty standard różnicowania hiperkalcemii: wartość < 0,01 jednoznacznie wskazuje na FHH (brak wskazań do operacji!), natomiast > 0,02 jest typowa dla pierwotnej nadczynności przytarczyc (PHPT).',
  },
  {
    id: 'wzór payne’a',
    term: 'Wzór Payne’a (Wapń skorygowany o albuminę)',
    category: 'diagnostyka',
    definition:
      'Równanie korygujące zmierzone stężenie wapnia całkowitego o aktualne stężenie albuminy: Ca_skorygowany (mg/dl) = Ca_zmierzony (mg/dl) + 0,8 * [4,0 - Albumina (g/dl)].',
    clinicalSignificance:
      'Chroni przed błędnym rozpoznaniem hipokalcemii u pacjentów z hipoalbuminemią (marskość wątroby, zespół nerczycowy, niedożywienie, sepsa).',
  },
  {
    id: 'phpt',
    term: 'Pierwotna nadczynność przytarczyc (PHPT)',
    category: 'choroby',
    definition:
      'Stan autonomicznej, niekontrolowanej hipersekrecji parathormonu przez jedną lub więcej przytarczyc, prowadzący do hiperkalcemii i hipofosfatemii.',
    clinicalSignificance:
      'W 85% wywołana pojedynczym gruczolakiem. Przebiega najczęściej bezobjawowo; nieleczona prowadzi do osteoporozy korowej, kamicy nerkowej i powikłań sercowo-naczyniowych. Wyleczalna chirurgicznie.',
  },
  {
    id: 'fhh',
    term: 'Rodzinna hiperkalcemia hipokalciuryczna (FHH)',
    category: 'choroby',
    definition:
      'Łagodne zaburzenie dziedziczone autosomalnie dominująco, wywołane mutacją inaktywującą w genie receptora wapniowego (CASR), przestawiającą próg czułości termostatu wapniowego na wyższy poziom.',
    clinicalSignificance:
      'Cechuje się hiperkalcemią z nieadekwatnie prawidłowym PTH i wskaźnikiem CCCR < 0,01. Przebiega bezobjawowo i nie daje powikłań narządowych. Paratyreoidktomia jest bezwzględnym błędem w sztuce!',
  },
  {
    id: 'shpt',
    term: 'Wtórna nadczynność przytarczyc (SHPT)',
    category: 'choroby',
    definition:
      'Reaktywny przerost i nadczynność wszystkich przytarczyc w odpowiedzi na przewlekły bodziec hipokalcemizujący, najczęściej w przebiegu przewlekłej choroby nerek (PChN) lub zespołu złego wchłaniania.',
    clinicalSignificance:
      'Charakteryzuje się niskim lub prawidłowym wapniem, hiperfosfatemią i wysokim stężeniem PTH. Wymaga kontroli fosforanów (sewelamer) i analogów witaminy D (parikalcytol).',
  },
  {
    id: 'thpt',
    term: 'Trzeciorzędowa nadczynność przytarczyc (THPT)',
    category: 'choroby',
    definition:
      'Stan autonomizacji rozrostu przytarczyc po latach trwania wtórnej nadczynności (zwykle u chorych dializowanych), w którym dochodzi do utraty receptorów CaSR i VDR.',
    clinicalSignificance:
      'Objawia się pojawieniem się hiperkalcemii przy wybitnie wysokim PTH (>800–2000 pg/ml). Zwiększa ryzyko kalcyfilaksji i zgonu naczyniowego; często wymaga subtotalnej paratyreoidktomii.',
  },
  {
    id: 'pthrp',
    term: 'Peptyd parathormonopodobny (PTHrP)',
    category: 'hormony',
    definition:
      'Onkogenny peptyd wydzielany ekotopowo przez komórki nowotworów złośliwych (zwłaszcza raka płaskonabłonkowego płuca, głowy i szyi oraz raka nerki).',
    clinicalSignificance:
      'Wiąże się z receptorem PTHR1, naśladując działanie PTH i wywołując humoralną hiperkalcemię nowotworową (HHM), przy czym endogenne wydzielanie iPTH przez przytarczyce jest całkowicie stłumione.',
  },
  {
    id: 'tezyczka',
    term: 'Tężyczka (Tetania)',
    category: 'choroby',
    definition:
      'Stan wzmożonej pobudliwości nerwowo-mięśniowej wywołany spadkiem zewnątrzkomórkowego stężenia wapnia zjonizowanego (Ca2+) lub magnezu (Mg2+).',
    clinicalSignificance:
      'Objawia się parestezjami, skurczami mięśniowymi („ręka położnika”) oraz zagrażającym uduszeniem skurczem głośni (laryngospasmus). Występuje w postaci jawnej lub utajonej (próba ischemiczna EMG).',
  },
  {
    id: 'objaw chvostka',
    term: 'Objaw Chvostka',
    aliases: ['objaw chvostka', 'chvostek'],
    category: 'diagnostyka',
    definition:
      'Objaw tężyczki utajonej polegający na gwałtownym skurczu mięśni mimicznych twarzy po uderzeniu młoteczkiem perkusyjnym w pień nerwu twarzowego (2 cm przed płatkiem ucha).',
    clinicalSignificance:
      'Świadczy o nadpobudliwości obwodowego układu nerwowego; u 10–15% populacji może występować jako cecha fizjologiczna bez hipokalcemii.',
  },
  {
    id: 'objaw trousseau',
    term: 'Objaw Trousseau',
    aliases: ['objaw trousseau', 'trousseau'],
    category: 'diagnostyka',
    definition:
      'Patognomoniczny objaw tężyczki utajonej wywoływany uciśnięciem ramienia mankietem ciśnieniomierza powyżej ciśnienia skurczowego przez 3 minuty.',
    clinicalSignificance:
      'Niedokrwienie pnia nerwowego prowokuje charakterystyczny kurcz mięśni dłoni („ręka położnika”). Cechuje się bardzo wysoką swoistością (>95%) dla hipokalcemii.',
  },
  {
    id: 'zespół albrighta',
    term: 'Wrodzona osteodystrofia Albrighta (AHO)',
    aliases: ['aho', 'osteodystrofia albrighta'],
    category: 'choroby',
    definition:
      'Genetyczny zespół dysmorficzny związany z mutacją genu GNAS (podjednostki Gs-alfa), obejmujący niskorosłość, zaokrągloną twarz, otyłość centralną i brachydaktylię IV i V kości śródręcza.',
    clinicalSignificance:
      'W połączeniu z opornością na PTH i TSH tworzy rzekomą niedoczynność przytarczyc typu 1a (PHP-1a przy dziedziczeniu matczynym). Przy dziedziczeniu ojcowskim daje fenotyp bez zaburzeń Ca-P (PPHP).',
  },
  {
    id: 'gen gnas',
    term: 'Gen GNAS (Imprinting genomowy)',
    aliases: ['gnas'],
    category: 'fizjologia',
    definition:
      'Gen na chromosomie 20q13.3 kodujący podjednostkę alfa białka Gs, podlegający zjawisku rodzicielskiego piętnowania genomowego w nerkach i przysadce.',
    clinicalSignificance:
      'Kopia ojcowska w cewkach nerkowych jest fizjologicznie wyciszona; mutacja kopii matczynej prowadzi do oporności na PTH (PHP-1a), a mutacja kopii ojcowskiej do PPHP bez oporności nerkowej.',
  },
  {
    id: 'przełom hiperkalcemiczny',
    term: 'Przełom hiperkalcemiczny',
    aliases: ['przełom hiperkalcemiczny', 'kryza hiperkalcemiczna'],
    category: 'choroby',
    definition:
      'Ostry stan bezpośredniego zagrożenia życia ze stężeniem wapnia całkowitego >3,5 mmol/l (>14,0 mg/dl), prowadzący do śpiączki, niewydolności nerek i zatrzymania krążenia.',
    clinicalSignificance:
      'Wymaga natychmiastowej agresywnej rehydratacji 0,9% NaCl (2–4 l/24h), kalcytoniny s.c. i dożylnych bisfosfonianów (kwas zoledronowy). Furosemid podaje się wyłącznie po pełnym nawodnieniu.',
  },
  {
    id: 'zespół głodnych kości',
    term: 'Zespół głodnych kości (Hungry Bone Syndrome)',
    aliases: ['zespół głodnych kości', 'hbs', 'hungry bone syndrome'],
    category: 'choroby',
    definition:
      'Ciężka, przedłużająca się hipokalcemia i hipofosfatemia rozwijająca się po udanej paratyreoidktomii u chorych z zaawansowaną osteopatią nadczynnościową.',
    clinicalSignificance:
      'Nagły spadek PTH wyłącza osteolizę, a nadaktywne osteoblasty masowo pochłaniają Ca, P i Mg z krwi do remineralizacji kości. Głównym predyktorem jest wysoka wyjściowa fosfataza zasadowa (ALP).',
  },
  {
    id: 'kwas zoledronowy',
    term: 'Kwas zoledronowy',
    aliases: ['kwas zoledronowy', 'zoledronian'],
    category: 'leki',
    definition:
      'Dożylny bisfosfonian aminowy III generacji o najwyższej sile powinowactwa do hydroksyapatytu i hamowania syntazy difosforanu farnezylu w osteoklastach.',
    clinicalSignificance:
      'Lek pierwszego rzutu w leczeniu hiperkalcemii nowotworowej (4 mg i.v.) oraz w prewencji złamań w osteoporozie (5 mg i.v. raz w roku). Działa po 48–72 godzinach przez 2–4 tygodnie.',
  },
  {
    id: 'cynakalcet',
    term: 'Cynakalcet',
    aliases: ['cynakalcet', 'cinakalcet'],
    category: 'leki',
    definition:
      'Doustny lek kalcymimetyczny, będący allosterycznym modulatorem receptora wapniowego (CaSR) w przytarczycach.',
    clinicalSignificance:
      'Zwiększa wrażliwość CaSR na pozakomórkowy wapń, hamując wydzielanie PTH i obniżając stężenie wapnia we krwi. Stosowany w wtórnej nadczynności u dializowanych oraz w nieoperacyjnej PHPT.',
  },
  {
    id: 'alfakalcydol',
    term: 'Alfakalcydol (1alfa-OH-D3)',
    aliases: ['alfakalcydol', '1alfa-oh-d3'],
    category: 'leki',
    definition:
      'Syntetyczny analog witaminy D posiadający grupę hydroksylową w pozycji 1alfa, wymagający jedynie 25-hydroksylacji w wątrobie do stania się aktywnym kalcytriolem.',
    clinicalSignificance:
      'Podstawa leczenia niedoczynności przytarczyc i rzekomej niedoczynności przytarczyc; omija brak zależnego od PTH enzymu 1alfa-hydroksylazy w nerkach.',
  },
  {
    id: 'denosumab',
    term: 'Denosumab',
    aliases: ['denosumab'],
    category: 'leki',
    definition:
      'W pełni ludzkie przeciwciało monoklonalne (IgG2) skierowane przeciwko ligandowi RANK (RANKL), naśladujące działanie endogennej osteoprotegeryny.',
    clinicalSignificance:
      'Blokuje powstawanie i przeżycie osteoklastów. Stosowany w osteoporozie (60 mg co 6 mies. s.c.) oraz w hiperkalcemii nowotworowej opornej na bisfosfoniany (120 mg). Bezpieczny w niewydolności nerek.',
  },
  {
    id: 'teryparatyd',
    term: 'Teryparatyd (rhPTH 1-34)',
    aliases: ['teryparatyd', 'rhpth 1-34'],
    category: 'leki',
    definition:
      'Rekombinowany fragment N-końcowy ludzkiego parathormonu (aminokwasy 1-34) o pełnej aktywności biologicznej receptora PTHR1.',
    clinicalSignificance:
      'Podawany w pulsach podskórnych raz na dobę wywiera działanie anaboliczne (kościotwórcze), stymulując osteoblasty. Lek z wyboru w ciężkiej osteoporozie ze złamaniami (max 24 miesiące terapii).',
  },
  {
    id: 't-score',
    term: 'Wskaźnik T-score',
    aliases: ['t-score', 'wskaźnik t-score', 't score'],
    category: 'diagnostyka',
    definition:
      'Liczba odchyleń standardowych (SD), o jaką gęstość mineralna kości (BMD) pacjenta różni się od średniej szczytowej masy kostnej zdrowych młodych dorosłych tej samej płci.',
    clinicalSignificance:
      'Kryterium diagnostyczne osteoporozy wg WHO u kobiet pomenopauzalnych i mężczyzn >=50 lat: norma >= -1,0; osteopenia -1,1 do -2,4; osteoporoza <= -2,5 SD.',
  },
  {
    id: 'densytometria dxa',
    term: 'Absorpcjometria rentgenowska podwójnej energii (DXA)',
    aliases: ['dxa', 'densytometria dxa', 'densytometria'],
    category: 'diagnostyka',
    definition:
      'Złoty standard ilościowej oceny gęstości mineralnej kości (BMD w g/cm2) z wykorzystaniem dwóch wiązek promieniowania rentgenowskiego o różnej energii.',
    clinicalSignificance:
      'Standardowo mierzona w odcinku lędźwiowym kręgosłupa (L1–L4) i bliższym końcu kości udowej; w pierwotnej nadczynności przytarczyc obligatoryjny jest pomiar 1/3 dystalnej kości promieniowej.',
  },
];
