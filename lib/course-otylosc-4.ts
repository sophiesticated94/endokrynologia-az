import { type DraftLesson, q } from './course-types.ts';

export const draftOtyloscPart4: DraftLesson[] = [
  {
    id: 'otylosc-metabolizm-lipoprotein-klasyfikacja',
    title: 'Metabolizm lipoprotein: szlak egzogenny, endogenny i lipoproteina (a)',
    group: 'Zaburzenia lipidowe i dyslipidemie',
    readTime: '13 min',
    goals: [
      'Poznać szlak egzogenny (chylomikrony, LPL) i endogenny (VLDL, IDL, LDL) transportu lipidów.',
      'Zrozumieć rolę zwrotnego transportu cholesterolu przez cząstki HDL oraz apolipoproteiny ApoB i ApoA1.',
      'Scharakteryzować lipoproteinę (a) [Lp(a)] jako niezależny, uwarunkowany genetycznie czynnik ryzyka sercowo-naczyniowego.',
    ],
    sections: [
      {
        title: 'Szlak egzogenny i endogenny transportu lipidów',
        content:
          'Tłuszcze pokarmowe są pakowane w enterocytach do chylomikronów zawierających apolipoproteinę B-48. W naczyniach włosowatych mięśni i tkanki tłuszczowej enzym lipaza lipoproteinowa (LPL, aktywowana przez ApoC-II na powierzchni chylomikronu) hydrolizuje triglicerydy, uwalniając wolne kwasy tłuszczowe. Pozostałości chylomikronów (remnants) są wychwytywane w wątrobie przez receptor ApoE. W szlaku endogennym wątroba syntetyzuje cząstki VLDL zawierające ApoB-100. Pod wpływem LPL cząstki VLDL tracą triglicerydy, przekształcając się w IDL, a następnie w bogate w cholesterol cząstki LDL, które zaopatrują tkanki obwodowe w cholesterol za pośrednictwem receptora LDLR.',
      },
      {
        title: 'Zwrotny transport cholesterolu (RCT) i cząstki HDL',
        content:
          'Zwrotny transport cholesterolu (RCT) polega na usuwaniu nadmiaru cholesterolu z makrofagów ściany naczyń i transportowaniu go do wątroby w celu wydalenia z żółcią. Wolna apolipoproteina A-I (ApoA-1) syntetyzowana w wątrobie i jelicie wiąże się z transporterem kasetowym ABCA1 na makrofagach, tworząc dyskoidalne cząstki pre-beta-HDL. Enzym acylotransferaza lecytyna:cholesterol (LCAT) estryfikuje wolny cholesterol, przekształcając cząstki w dojrzałe, kuliste HDL3 i HDL2. Cholesterol z HDL trafia do wątroby bezpośrednio przez receptor zmiatający SR-BI lub pośrednio po wymianie na triglicerydy z VLDL/LDL za pośrednictwem białka CETP.',
      },
      {
        title: 'Lipoproteina (a) [Lp(a)] i apolipoproteina B jako markery aterogenności',
        content:
          'Lipoproteina (a) [Lp(a)] składa się z cząstki LDL połączonej mostkiem disiarczkowym z apolipoproteiną (a). Stężenie Lp(a) jest w ponad 90% zdeterminowane genetycznie (gen LPA) i nie zależy od diety ani stylu życia. Ze względu na homologię z plazminogenem Lp(a) wykazuje działanie prozakrzepowe, prozapalne i silnie proaterogenne. Zgodnie z wytycznymi ESC/EAS każdy dorosły człowiek powinien mieć przynajmniej raz w życiu oznaczone stężenie Lp(a); wartość > 50 mg/dl (lub > 125 nmol/l) kwalifikuje chorego do grupy wysokiego ryzyka sercowo-naczyniowego. Całkowitą liczbę krążących cząstek aterogennych najdokładniej odzwierciedla stężenie ApoB (1 cząstka na każdą cząstkę LDL, VLDL i IDL).',
      },
    ],
    table: {
      caption: 'Charakterystyka głównych klas lipoprotein osocza',
      headers: ['Klasa lipoproteiny', 'Główny składnik rdzenia', 'Apolipoproteina strukturalna', 'Główna funkcja biologiczna'],
      rows: [
        ['Chylomikrony', 'Triglicerydy pokarmowe (85–90%)', 'ApoB-48, ApoC-II, ApoE', 'Dostarczanie kwasów tłuszczowych z diety do tkanek obwodowych'],
        ['VLDL', 'Triglicerydy endogenne (55–65%)', 'ApoB-100, ApoC-II, ApoE', 'Eksport triglicerydów z wątroby do mięśni i tkanki tłuszczowej'],
        ['LDL', 'Estry cholesterolu (45–50%)', 'ApoB-100 (wyłączna)', 'Główny transporter cholesterolu do tkanek, kluczowy czynnik miażdżycy'],
        ['HDL', 'Białka (40–50%) i fosfolipidy', 'ApoA-I, ApoA-II', 'Zwrotny transport cholesterolu z tkanek i naczyń do wątroby'],
        ['Lp(a)', 'Estry cholesterolu', 'ApoB-100 powiązana mostkiem z Apo(a)', 'Proaterogenny i prozakrzepowy niezależny czynnik ryzyka'],
      ],
    },
    advanced:
      'Apolipoproteina C-III (ApoC-III) odgrywa kluczową rolę w patofizjologii hipertriglicerydemii. Hamuje lipazę lipoproteinową (LPL) oraz blokuje wychwyt cząstek resztkowych przez receptory wątrobowe, powodując masywną akumulację chylomikronów i VLDL. Nową klasą leków w ciężkiej hipertriglicerydemii są antysensowne oligonukleotydy (ASO) blokujące translację mRNA ApoC-III: volanesorsen oraz olezarsen. Leki te obniżają stężenie triglicerydów o 70–80%, eliminując ryzyko ostrego zapalenia trzustki u pacjentów z zespołem rodzinnej chylomikronemii (FCS).',
    summary:
      'Szlak egzogenny transportuje tłuszcze z diety (chylomikrony z ApoB-48), a endogenny z wątroby (VLDL i LDL z ApoB-100). HDL (ApoA-1) odpowiada za zwrotny transport cholesterolu. Lp(a) to uwarunkowany genetycznie niezależny czynnik ryzyka miażdżycy i stenozy aortalnej.',
    sourceIds: ['esc-eas-dyslipidemia-2023', 'eas-fh-2023'],
    questions: [
      q(
        'Która apolipoproteina znajduje się w dokładnie jednej kopii na każdej aterogennej cząstce lipoproteiny (LDL, VLDL, IDL)?',
        ['Apolipoproteina B-100 (ApoB)', 'Oznaczenie stężenia ApoB odzwierciedla bezwzględną liczbę krążących cząstek aterogennych w osoczu.'],
        ['Apolipoproteina A-I (ApoA-1)', 'ApoA-1 jest białkiem strukturalnym cząstek przeciwmiażdżycowych HDL.'],
        ['Apolipoproteina C-II', 'ApoC-II jest czynnikiem aktywującym LPL i występuje w zmiennej liczbie kopii na cząstkach bogatych w triglicerydy.'],
      ),
      q(
        'Jaki próg stężenia lipoproteiny (a) [Lp(a)] wyznacza istotnie podwyższone ryzyko sercowo-naczyniowe wg wytycznych ESC/EAS?',
        ['Lp(a) > 50 mg/dl (lub > 125 nmol/l)', 'Stężenie powyżej 50 mg/dl wiąże się ze skokowym wzrostem ryzyka miażdżycy i stenozy aortalnej.'],
        ['Lp(a) > 10 mg/dl', 'Wartość 10 mg/dl mieści się w granicach bezpiecznego zakresu referencyjnego.'],
        ['Lp(a) > 500 mg/dl', 'To stężenie skrajne; próg podwyższonego ryzyka zaczyna się już od 50 mg/dl.'],
      ),
      q(
        'Który enzym jest bezpośrednio aktywowany przez apolipoproteinę C-II na powierzchni chylomikronów w celu hydrolizy triglicerydów?',
        ['Lipaza lipoproteinowa (LPL)', 'Wrodzony brak LPL lub ApoC-II prowadzi do zespołu chylomikronemii z triglicerydami > 1000 mg/dl.'],
        ['Acylotransferaza lecytyna:cholesterol (LCAT)', 'LCAT estryfikuje cholesterol w cząstkach HDL pod wpływem ApoA-1.'],
        ['Reduktaza HMG-CoA', 'Reduktaza HMG-CoA jest enzymem wewnątrzkomórkowym szlaku syntezy cholesterolu w hepatocycie.'],
      ),
      q(
        'Z jaką cząsteczką układu krzepnięcia apolipoproteina (a) w cząstce Lp(a) wykazuje wysoką homologię strukturalną, tłumaczącą jej działanie prozakrzepowe?',
        ['Z plazminogenem', 'Apo(a) współzawodniczy z plazminogenem o wiązanie z fibryną, upośledzając fizjologiczną fibrynolizę i promując zakrzepicę.'],
        ['Z fibrynogenem', 'Apo(a) zawiera powtórzenia domen Kringle IV typu plazminogenu, nie ma struktury fibrynogenu.'],
        ['Z antytrombiną III', 'Apo(a) nie jest inhibitorem trombiny.'],
      ),
      q(
        'Jak często zgodnie z wytycznymi ESC/EAS 2023 należy oznaczać stężenie lipoproteiny (a) u osoby dorosłej w celach stratyfikacji ryzyka?',
        ['Przynajmniej raz w życiu u każdego dorosłego człowieka', 'Stężenie Lp(a) jest w ponad 90% uwarunkowane genetycznie i pozostaje stabilne przez całe życie.'],
        ['Co 2 tygodnie w trakcie leczenia statyną', 'Statyny nie obniżają stężenia Lp(a) (mogą je nieznacznie podwyższać), częste pomiary są bezcelowe.'],
        ['Codziennie na czczo przez miesiąc', 'Stężenie Lp(a) nie wykazuje zmienności dobowej wymagającej częstych powtórzeń.'],
      ),
    ],
  },
  {
    id: 'otylosc-hipercholesterolemia-rodzinna',
    title: 'Hipercholesterolemia rodzinna (FH): genetyka, kryteria DLCN i screening kaskadowy',
    group: 'Zaburzenia lipidowe i dyslipidemie',
    readTime: '13 min',
    goals: [
      'Znać genetyczne podłoże hipercholesterolemii rodzinnej: mutacje genów LDLR, APOB i PCSK9.',
      'Opanować kryteria diagnostyczne Dutch Lipid Clinic Network (DLCN) i objawy fizykalne FH.',
      'Zrozumieć zasady kaskadowego screeningu rodzinnego i różnice między postacią heterozygotyczną (HeFH) a homozygotyczną (HoFH).',
    ],
    sections: [
      {
        title: 'Podłoże genetyczne: postać heterozygotyczna (HeFH) vs homozygotyczna (HoFH)',
        content:
          'Hipercholesterolemia rodzinna (FH) to najczęstsza monogenowa choroba metaboliczna człowieka o dziedziczeniu autosomalnym dominującym. Występuje u 1 na 250–300 osób (postać heterozygotyczna HeFH) oraz u 1 na 300 000 osób (postać homozygotyczna HoFH). W ponad 85–90% przypadków przyczyną są mutacje utraty funkcji genu receptora LDL (LDLR). Rzadziej za chorobę odpowiadają mutacje genu apolipoproteiny B (APOB — upośledzone wiązanie z receptorem LDLR) lub mutacje zyskania funkcji genu PCSK9 (gain-of-function — przyspieszona degradacja LDLR). W HeFH stężenie LDL-C wynosi typowo 190–400 mg/dl, a w HoFH przekracza 400–1000 mg/dl, prowadząc do zawałów serca już w dzieciństwie.',
      },
      {
        title: 'Objawy kliniczne i skala Dutch Lipid Clinic Network (DLCN)',
        content:
          'Klasycznymi objawami fizykalnymi patognomonicznymi dla FH są żółtaki ścięgien (tendon xanthomas), szczególnie ścięgna Achillesa i ścięgien prostowników palców rąk, rąbek starczy rogówki (arcus senilis) przed 45. rokiem życia oraz kępki żółte powiek (xanthelasma). Do rozpoznania klinicznego stosuje się skalę punktową Dutch Lipid Clinic Network (DLCN): ocenia się wywiad rodzinny przedwczesnej choroby wieńcowej, wywiad osobisty incydentów naczyniowych, obecność żółtaków ścięgien, stężenie LDL-C na czczo (od 155 do > 325 mg/dl) oraz obecność mutacji genetycznej. Wynik > 8 punktów pozwala na pewne rozpoznanie FH.',
      },
      {
        title: 'Screening kaskadowy i zasady wczesnej intensywnej terapii',
        content:
          'Wczesna diagnoza i wdrożenie leczenia obniżają ryzyko zgonu sercowo-naczyniowego u chorych z HeFH do poziomu populacji ogólnej. Złotym standardem jest screening kaskadowy (cascade screening): u każdego pacjenta ze zdiagnozowaną FH (przypadek wskaźnikowy, index case) przeprowadza się badania genetyczne lub oznaczenia lipidogramu u wszystkich krewnych pierwszego stopnia (rodzice, rodzeństwo, dzieci — ryzyko dziedziczenia wynosi 50%), a następnie u krewnych dalszych stopni. U dzieci z FH farmakoterapię statynami rozpoczyna się zazwyczaj w wieku 8–10 lat.',
      },
    ],
    table: {
      caption: 'Kryteria diagnostyczne Dutch Lipid Clinic Network (DLCN) dla hipercholesterolemii rodzinnej',
      headers: ['Kategoria diagnostyczna', 'Kryterium kliniczne / laboratoryjne', 'Punkty'],
      rows: [
        ['Badanie genetyczne', 'Stwierdzenie patogennej mutacji w genach LDLR, APOB lub PCSK9', '8 pkt (pewne FH)'],
        ['Objawy fizykalne', 'Żółtaki ścięgien u pacjenta / Rąbek starczy rogówki przed 45 r.ż.', '6 pkt / 4 pkt'],
        ['Stężenie LDL-C', '>= 330 mg/dl (>= 8,5 mmol/l) / 250–329 mg/dl (6,5–8,4 mmol/l)', '8 pkt / 5 pkt'],
        ['Wywiad rodzinny', 'Krewny I st. ze wczesną ChNS lub LDL-C > 95 centyla', '1 – 2 pkt'],
        ['Klasyfikacja końcowa', 'Pewne FH (> 8 pkt), Prawdopodobne (6–8 pkt), Możliwe (3–5 pkt)', 'Wynik sumaryczny'],
      ],
    },
    advanced:
      'W postaci homozygotycznej (HoFH) z całkowitym brakiem funkcjonalnych receptorów LDLR (mutacje typu receptor-negative) klasyczne statyny i inhibitory PCSK9 są całkowicie nieskuteczne, ponieważ ich mechanizm polega na nadekspresji LDLR. W tej populacji przełom stanowi ewinkumab — przeciwciało monoklonalne przeciwko białku angiopoietin-like 3 (ANGPTL3). Zablokowanie ANGPTL3 aktywuje lipazę śródbłonkową (EL) i LPL, umożliwiając klirens cząstek VLDL i spadek stężenia LDL-C o około 50% w sposób całkowicie niezależny od obecności receptora LDLR.',
    summary:
      'FH to choroba monogenowa (mutacje LDLR, APOB, PCSK9). Charakteryzuje się bardzo wysokim LDL-C, żółtakami ścięgien i przedwczesną chorobą wieńcową. Skala DLCN (> 8 pkt) i testy genetyczne potwierdzają diagnozę, a screening kaskadowy ratuje życie krewnych.',
    sourceIds: ['eas-fh-2023', 'esc-eas-dyslipidemia-2023'],
    questions: [
      q(
        'Mutacja utraty funkcji którego genu odpowiada za ponad 85–90% wszystkich przypadków hipercholesterolemii rodzinnej (FH)?',
        ['Genu receptora lipoprotein o niskiej gęstości (LDLR)', 'Zmniejszenie liczby czynnych receptorów LDLR na hepatocytach drastycznie blokuje wychwyt LDL z krążenia.'],
        ['Genu insuliny (INS)', 'Mutacje genu insuliny odpowiadają za monogenową cukrzycę noworodkową, nie za FH.'],
        ['Genu leptyny (LEP)', 'Mutacja LEP wywołuje wrodzony niedobór leptyny i otyłość, nie hipercholesterolemię rodzinną.'],
      ),
      q(
        'Jaki objaw w badaniu fizykalnym jest wysoce swoisty (patognomoniczny) dla hipercholesterolemii rodzinnej i daje aż 6 punktów w skali DLCN?',
        ['Żółtaki ścięgien (tendon xanthomas), szczególnie ścięgien Achillesa i prostowników palców rąk', 'Żółtaki ścięgniste odzwierciedlają masywne odkładanie się estrów cholesterolu w tkance łącznej włóknistej.'],
        ['Obrzęk śluzowaty przedgoleniowy', 'Obrzęk przedgoleniowy występuje w chorobie Gravesa-Basedowa.'],
        ['Powiększenie języka z odciskami zębów', 'Makroglosja występuje w akromegalii i amyloidozie.'],
      ),
      q(
        'Ile punktów w skali Dutch Lipid Clinic Network (DLCN) jest wymagane do postawienia pewnego rozpoznania hipercholesterolemii rodzinnej?',
        ['Więcej niż 8 punktów (> 8 pkt)', 'Wynik powyżej 8 punktów definiuje defintive FH i uzasadnia agresywne leczenie hipolipemizujące.'],
        ['Dokładnie 1 punkt', '1 punkt oznacza znikome podejrzenie choroby.'],
        ['Co najmniej 50 punktów', 'Maksymalna punktacja w skali DLCN wynosi kilkanaście punktów.'],
      ),
      q(
        'Na czym polega screening kaskadowy (cascade screening) w rodzinie pacjenta z rozpoznaną hipercholesterolemią rodzinną?',
        ['Na systematycznym badaniu lipidogramu i testach genetycznych u wszystkich krewnych I stopnia, a następnie dalszych stopni', 'Pozwala na identyfikację bezobjawowych nosicieli mutacji we wczesnym wieku i wdrożenie profilaktyki pierwotnej.'],
        ['Na wykonywaniu koronarografii u każdego członka rodziny bez pobierania krwi', 'Koronarografia jest badaniem inwazyjnym, nie metodą przesiewową w populacji.'],
        ['Na corocznym ważeniu wszystkich mieszkańców tego samego osiedla', 'Screening kaskadowy opiera się na więzach krwi i dziedziczeniu genetycznym, nie adresie zamieszkania.'],
      ),
      q(
        'Jaki nowoczesny lek pozwala obniżyć stężenie LDL-C u chorych z homozygotyczną FH (HoFH) z całkowitym brakiem receptorów LDLR?',
        ['Ewinkumab (przeciwciało monoklonalne przeciwko ANGPTL3)', 'Ewinkumab promuje klirens lipoprotein szlakiem lipazy śródbłonkowej całkowicie niezależnie od LDLR.'],
        ['Kwas acetylosalicylowy w dawce 75 mg', 'Aspiryna jest lekiem przeciwpłytkowym, nie obniża stężenia LDL-C.'],
        ['Hydrochlorotiazyd', 'Diuretyk tiazydowy obniża ciśnienie tętnicze, nie koryguje defektu receptora LDLR.'],
      ),
    ],
  },
  {
    id: 'otylosc-farmakoterapia-hipolipemizujaca',
    title: 'Farmakoterapia hipolipemizująca: cele ESC/EAS 2023, statyny, PCSK9i i kwas bempedonowy',
    group: 'Zaburzenia lipidowe i dyslipidemie',
    readTime: '13 min',
    goals: [
      'Znać rygorystyczne docelowe stężenia LDL-C dla poszczególnych kategorii ryzyka wg wytycznych ESC/EAS 2023.',
      'Scharakteryzować algorytm skojarzonej terapii hipolipemizującej: statyna o wysokiej intensywności, ezetymib i inhibitory PCSK9.',
      'Poznać mechanizm działania i miejsce w terapii inklisiranu oraz kwasu bempedonowego u osób z nietolerancją statyn (SAMS).',
    ],
    sections: [
      {
        title: 'Docelowe stężenia LDL-C wg wytycznych ESC/EAS 2023: im niżej, tym lepiej',
        content:
          'Zgodnie z zasadą the lower, the better, the earlier, the longer wytyczne ESC/EAS wyznaczają bezwzględne cele terapeutyczne: 1) Bardzo duże ryzyko sercowo-naczyniowe (przebyty OZW, udar mózgu, miażdżyca w badaniach obrazowych, cukrzyca z powikłaniami, eGFR < 30 ml/min, FH z powikłaniami): cel LDL-C < 55 mg/dl (1,4 mmol/l) ORAZ redukcja o >= 50% w stosunku do wartości wyjściowej; 2) Ekstremalne ryzyko (drugi incydent naczyniowy w ciągu 2 lat): cel LDL-C < 40 mg/dl (1,0 mmol/l); 3) Duże ryzyko: cel LDL-C < 70 mg/dl (1,8 mmol/l) i redukcja >= 50%; 4) Umiarkowane ryzyko: cel LDL-C < 100 mg/dl; 5) Małe ryzyko: cel LDL-C < 116 mg/dl.',
      },
      {
        title: 'Statyny o wysokiej intensywności i synergizm z ezetymibem',
        content:
          'Monoterapia statyną o wysokiej intensywności (atorwastatyna 40–80 mg lub rosuwastatyna 20–40 mg) hamuje reduktazę HMG-CoA, indukując nadekspresję receptorów LDLR i obniżając stężenie LDL-C średnio o 50%. Każde podwojenie dawki statyny daje jedynie dodatkowe 6% redukcji (reguła 6%). Dlatego kluczowe jest wczesne dołączenie ezetymibu (selektywnego inhibitora białka transportowego NPC1L1 w rąbku szczoteczkowym enterocytów), co dodaje kolejne 15–20% redukcji, dając w skojarzeniu łącznie około 65% obniżenia LDL-C przy znikomym ryzyku miopatii.',
      },
      {
        title: 'Inhibitory PCSK9, inklisiran i kwas bempedonowy w nietolerancji statyn (SAMS)',
        content:
          'Białko PCSK9 kieruje receptory LDLR do lizosomów na degradację. Przeciwciała monoklonalne (ewolokumab, alirokumab s.c. co 2–4 tyg.) neutralizują krążące PCSK9, dodając 60% redukcji LDL-C (w potrójnej terapii statyna+ezetymib+PCSK9i spadek LDL-C sięga 85%). Inklisiran to syntetyczny siRNA podawany s.c. co 6 miesięcy, który wycisza translację mRNA PCSK9 w wątrobie. Dla chorych z objawami mięśniowymi zależnymi od statyn (SAMS) przełomem jest kwas bempedonowy — prolek aktywowany przez syntetazę ACSVL1 obecną w wątrobie, lecz nieobecną w mięśniach szkieletowych, co pozwala na hamowanie liazy cytrynianowej ATP (powyżej reduktazy HMG-CoA) bez ryzyka bólów mięśniowych.',
      },
    ],
    table: {
      caption: 'Siła obniżania stężenia cholesterolu LDL przez poszczególne schematy farmakoterapii',
      headers: ['Schemat terapeutyczny', 'Mechanizm działania', 'Średnia redukcja LDL-C (%)', 'Wskazania kliniczne'],
      rows: [
        ['Statyna o umiarkowanej intensywności', 'Inhibicja reduktazy HMG-CoA', '~30%', 'Ryzyko umiarkowane lub nietolerancja wysokich dawek'],
        ['Statyna o wysokiej intensywności (Atorwa 80 / Rosuwa 40)', 'Maksymalna inhibicja reduktazy HMG-CoA', '~50%', 'Wyjściowa terapia w bardzo dużym i dużym ryzyku ASCVD'],
        ['Statyna o wysokiej intensywności + Ezetymib', 'Inhibicja HMG-CoA + blokada NPC1L1', '~65%', 'Brak osiągnięcia celu < 55 mg/dl na samej statynie'],
        ['Statyna + Ezetymib + Inhibitor PCSK9 (lub inklisiran)', 'Potrójna blokada szlaku cholesterolowego', '~85%', 'Bardzo duże ryzyko, FH, wtórna prewencja po zawałach'],
        ['Kwas bempedonowy + Ezetymib', 'Inhibicja liazy cytrynianowej ACL + NPC1L1', '~35% – 40%', 'Całkowita nietolerancja statyn (SAMS)'],
      ],
    },
    advanced:
      'W badaniu CLEAR Outcomes wykazano, że kwas bempedonowy w dawce 180 mg/d u pacjentów z udokumentowaną nietolerancją statyn w prewencji pierwotnej i wtórnej nie tylko obniżył stężenie LDL-C o 21% i hs-CRP o 22%, ale zredukował ryzyko zgonu sercowo-naczyniowego, zawału serca i rewaskularyzacji o 13% (HR = 0,87). Głównymi specyficznymi działaniami niepożądanymi kwasu bempedonowego są: hiperurykemia i zaostrzenie dny moczanowej (hamowanie nerkowego transportera OAT2) oraz nieznaczny wzrost stężenia kreatyniny w surowicy.',
    summary:
      'Cel LDL-C w bardzo dużym ryzyku to < 55 mg/dl i redukcja >= 50%. Statyna o wysokiej intensywności daje -50%, z ezetymibem -65%, a z PCSK9i -85%. Inklisiran to siRNA podawane co 6 miesięcy. Kwas bempedonowy hamuje syntezę cholesterolu bez miotoksyczności w mięśniach.',
    sourceIds: ['esc-eas-dyslipidemia-2023', 'eas-fh-2023'],
    questions: [
      q(
        'Jaki jest docelowy poziom cholesterolu frakcji LDL (LDL-C) u pacjenta po przebytym zawale serca (bardzo duże ryzyko sercowo-naczyniowe) wg wytycznych ESC/EAS 2023?',
        ['LDL-C < 55 mg/dl (1,4 mmol/l) oraz redukcja o co najmniej 50% w stosunku do wartości wyjściowej', 'Rygorystyczny cel zmniejsza tempo progresji blaszki miażdżycowej i zapobiega kolejnym zawałom.'],
        ['LDL-C < 130 mg/dl', '130 mg/dl to cel historyczny sprzed dekad, niedopuszczalny w bardzo dużym ryzyku.'],
        ['Dowolne stężenie, pod warunkiem prawidłowego poziomu trójglicerydów', 'LDL-C jest głównym przyczynowym czynnikiem miażdżycy i wymaga bezwzględnej kontroli.'],
      ),
      q(
        'O ile procent zmniejsza stężenie LDL-C dołączenie ezetymibu do leczenia statyną o wysokiej intensywności?',
        ['O dodatkowe 15–20% (dając łącznie około 65% redukcji LDL-C)', 'Skojarzenie dwóch mechanizmów (syntezy w wątrobie i wchłaniania w jelicie) wykazuje potężny synergizm.'],
        ['O dodatkowe 95%', 'Całkowita eliminacja LDL nie występuje po samym ezetymibie.'],
        ['Nie daje żadnej dodatkowej redukcji stężenia LDL-C', 'Ezetymib wykazuje udowodnione działanie hipolipemizujące w badaniu IMPROVE-IT.'],
      ),
      q(
        'Dlaczego kwas bempedonowy nie wywołuje dolegliwości bólowych mięśni (SAMS), które często występują po statynach?',
        ['Jest prolekiem aktywowanym przez enzym ACSVL1 obecny w wątrobie, który nie ulega ekspresji w mięśniach szkieletowych', 'Brak aktywnego metabolitu w miocytach chroni komórki mięśniowe przed zahamowaniem szlaku mewalonianu.'],
        ['Ponieważ kwas bempedonowy jest czystym środkiem przeciwbólowym z grupy opioidów', 'Lek nie jest analgetykiem, lecz inhibitorem syntezy cholesterolu.'],
        ['Kwas bempedonowy wchłania się wyłącznie do tkanki mózgowej', 'Lek działa metabolicznie w wątrobie, nie penetruje mózgu.'],
      ),
      q(
        'W jakim odstępie czasowym podaje się podskórnie inklisiran w terapii podtrzymującej po fazie nasycenia?',
        ['Raz na 6 miesięcy (dwa razy w roku)', 'Trwałe wyciszenie translacji mRNA PCSK9 za pomocą kompleksu RISC zapewnia wielomiesięczny efekt hipolipemizujący.'],
        ['Codziennie rano przed śniadaniem', 'Codzienne wstrzyknięcia dotyczą leków o krótkim okresie półtrwania.'],
        ['Raz na 10 lat', 'Działanie siRNA nie utrzymuje się przez całą dekadę.'],
      ),
      q(
        'Jaki jest docelowy poziom LDL-C dla pacjenta w kategorii ryzyka ekstremalnego (kolejny incydent naczyniowy w ciągu 2 lat pomimo optymalnego leczenia)?',
        ['LDL-C < 40 mg/dl (1,0 mmol/l)', 'Tak niska wartość indukuje regresję objętości blaszki miażdżycowej potwierdzoną w USG wewnątrznaczyniowym (IVUS).'],
        ['LDL-C < 100 mg/dl', 'Wartość 100 mg/dl jest celem dla umiarkowanego ryzyka, a nie ekstremalnego.'],
        ['Brak celów poniżej 70 mg/dl ze względu na toksyczność', 'Badania kliniczne z PCSK9i udowodniły bezpieczeństwo stężeń LDL-C nawet poniżej 25 mg/dl.'],
      ),
    ],
  },
  {
    id: 'otylosc-matematyka-modele',
    title: 'Modele biofizyczne i matematyczne: model Halla, wzory Sampsona i wskaźniki bariatryczne',
    group: 'Matematyka i modele',
    readTime: '13 min',
    goals: [
      'Zrozumieć matematyczną konstrukcję równania Mifflina-St Jeor i nieliniowego modelu bilansu energii Halla.',
      'Opanować obliczenia stężenia LDL-C formułą Friedewalda oraz nowoczesną formułą Sampsona (NIH Equation 2).',
      'Poznać obliczenia parametrów skuteczności bariatrii: procentowej utraty nadmiaru masy ciała (%EWL) i całkowitej masy ciała (%TBWL).',
    ],
    sections: [
      {
        title: 'Podstawowa przemiana materii (BMR) i nieliniowy model Halla',
        content:
          'Złotym standardem estymacji BMR jest równanie Mifflina-St Jeor: BMR(mężczyźni) = 10*m + 6,25*h - 5*w + 5; BMR(kobiety) = 10*m + 6,25*h - 5*w - 161 (m w kg, h w cm, w w latach). Całkowity wydatek energetyczny (TDEE) wylicza się jako TDEE = BMR * PAL. Nieliniowy model Kevina Halla (NIH Body Weight Planner) opisuje dynamikę masy ciała układem równań różniczkowych uwzględniających podział na masę tłuszczową (FM) i beztłuszczową (FFM) oraz adaptację metaboliczną: delta BMR = -alfa * delta W. W miarę spadku masy ciała wydatek energetyczny maleje wykładniczo, sprawiając, że krzywa ubytku wagi spłaszcza się w czasie aż do osiągnięcia nowego punktu równowagi.',
      },
      {
        title: 'Formuła Friedewalda vs nowoczesna formuła Sampsona (NIH Equation 2)',
        content:
          'Tradycyjna formuła Friedewalda: LDL-C = TC - HDL-C - (TG / 5) zakłada stały stosunek cholesterolu do triglicerydów w cząstkach VLDL równy 1:5. Formuła ta całkowicie załamuje się i drastycznie zaniża stężenie LDL-C, gdy stężenie triglicerydów przekracza 400 mg/dl lub gdy stężenie LDL-C jest bardzo niskie (< 70 mg/dl). W 2020 roku Narodowe Instytuty Zdrowia (NIH) opublikowały formułę Sampsona (NIH Equation 2), opartą na regresji wielomianowej, która uwzględnia nieliniowy wpływ frakcji remnantów i zachowuje precyzję diagnostyczną przy triglicerydach sięgających nawet 800 mg/dl.',
      },
      {
        title: 'Metryki sukcesu w chirurgii bariatrycznej: %EWL vs %TBWL',
        content:
          'Do standaryzacji wyników operacji metabolicznych stosuje się dwa wskaźniki matematyczne: 1) Procentowa utrata całkowitej masy ciała (%TBWL = [(masa wyjściowa - masa aktualna) / masa wyjściowa] * 100%); 2) Procentowa utrata nadmiaru masy ciała (%EWL = [(masa wyjściowa - masa aktualna) / (masa wyjściowa - masa idealna)] * 100%, gdzie masa idealna odpowiada BMI = 25 kg/m²). Sukces bariatryczny definiuje się zazwyczaj jako osiągnięcie %EWL >= 50% lub %TBWL >= 20–25% po 12–24 miesiącach od operacji. Wskaźnik %TBWL jest obecnie preferowany w piśmiennictwie międzynarodowym, gdyż nie zależy od arbitralnie przyjętego wzoru na idealną masę ciała.',
      },
    ],
    table: {
      caption: 'Formuły matematyczne stosowane w diagnostyce otyłości i lipidologii',
      headers: ['Model / Wskaźnik', 'Wzór matematyczny', 'Zastosowanie kliniczne'],
      rows: [
        ['BMR (Mifflin-St Jeor)', '10*m + 6,25*h - 5*w + s (s=+5 M, -161 K)', 'Wyznaczenie podstawowego zapotrzebowania kalorycznego na dobę'],
        ['Formuła Friedewalda', 'LDL-C = TC - HDL-C - (TG / 5)', 'Standardowe wyliczanie LDL-C w mg/dl przy TG < 400 mg/dl'],
        ['Formuła Sampsona (NIH)', 'Korekta wielomianowa uwzględniająca remnanty', 'Precyzyjne wyliczanie LDL-C przy TG w zakresie 400–800 mg/dl'],
        ['%TBWL', '[(Masa_0 - Masa_t) / Masa_0] * 100%', 'Uniwersalna metryka skuteczności farmakoterapii i bariatrii'],
        ['%EWL', '[(Masa_0 - Masa_t) / (Masa_0 - Masa_BMI25)] * 100%', 'Klasyczny wskaźnik utraty nadwagi po operacji bariatrycznej'],
      ],
    },
    advanced:
      'W modelu bilansu energii Halla adaptacja metaboliczna nie jest stałą wartością, lecz funkcją dynamiki ubytku masy ciała: korelacja wynosi około 20–25 kcal/dobę na każdy utracony kilogram. Oznacza to, że u pacjenta, który zredukował masę ciała o 30 kg, dobowe zapotrzebowanie kaloryczne jest o około 600–750 kcal mniejsze, niż wynikałoby to ze statycznych równań teoretycznych dla osoby o tej samej wadze, która nigdy nie była otyła.',
    summary:
      'Model Halla dowodzi nieliniowości odchudzania wskutek adaptacji metabolicznej. Formuła Sampsona zastępuje Friedewalda przy TG > 400 mg/dl. Skuteczność bariatrii mierzy się wskaźnikami %EWL (sukces >= 50%) oraz %TBWL (sukces >= 20-25%).',
    sourceIds: ['easo-2024', 'esc-eas-dyslipidemia-2023'],
    questions: [
      q(
        'Dlaczego tradycyjna formuła Friedewalda nie powinna być stosowana do obliczania stężenia cholesterolu LDL u pacjentów ze stężeniem triglicerydów > 400 mg/dl?',
        ['Ponieważ przy wysokich triglicerydach stały współczynnik TG/5 drastycznie zafałszowuje pulę VLDL, sztucznie zaniżając stężenie LDL-C', 'W takich warunkach należy zastosować nowoczesną formułę Sampsona (NIH) lub bezpośredni pomiar homogeniczny.'],
        ['Ponieważ przy TG > 400 mg/dl cholesterol LDL całkowicie znika z krwi', 'Cząstki LDL nadal krążą w osoczu, jedynie matematyczny szacunek ulega zafałszowaniu.'],
        ['Ponieważ formuła Friedewalda wymaga podania stężenia potasu w moczu', 'Formuła Friedewalda opiera się wyłącznie na TC, HDL i TG.'],
      ),
      q(
        'Pacjent o masie wyjściowej 120 kg zredukował wagę do 96 kg po 12 miesiącach od rękawowej resekcji żołądka. Ile wynosi jego wskaźnik %TBWL?',
        ['20,0% całkowitej utraty masy ciała', '%TBWL = [(120 - 96) / 120] * 100% = [24 / 120] * 100% = 20,0%.'],
        ['50,0%', 'Utrata 50% masy ciała oznaczałaby spadek o 60 kg (do wagi 60 kg).'],
        ['8,0%', '8% to zbyt niska wartość, spadek z 120 do 96 kg to dokładnie jedna piąta wagi (20%).'],
      ),
      q(
        'O jaki czynnik koryguje się równanie Mifflina-St Jeor dla kobiet w porównaniu do mężczyzn przy tej samej masie, wzroście i wieku?',
        ['Odejmuje się 161 kcal (u kobiet wyraz wolny to -161, a u mężczyzn +5)', 'Różnica ta odzwierciedla fizjologicznie niższą zawartość beztłuszczowej masy mięśniowej (FFM) u kobiet.'],
        ['Dodaje się 500 kcal u kobiet', 'Masa mięśniowa u kobiet jest przeciętnie mniejsza, co obniża BMR.'],
        ['Mnoży się wynik przez liczbę przebytych ciąż', 'Równanie nie uwzględnia w wyrazie wolnym liczby porodów.'],
      ),
      q(
        'Jaki wynik procentowej utraty nadmiaru masy ciała (%EWL) jest powszechnie uznawany w literaturze bariatrycznej za kryterium sukcesu operacji po 1–2 latach?',
        ['%EWL >= 50%', 'Osiągnięcie ubytku co najmniej połowy nadmiernej masy ciała powyżej BMI 25 definiuje powodzenie zabiegu.'],
        ['%EWL >= 100% u każdego pacjenta bez wyjątku', '100% oznaczałoby redukcję do idealnego BMI 25, co u osób z wyjściowym BMI 50 jest rzadko osiągalne.'],
        ['%EWL pomiędzy 5% a 10%', 'Spadek o 5–10% to cel farmakoterapii starej generacji, chirurgia bariatryczna osiąga znacznie wyższe rezultaty.'],
      ),
      q(
        'Co dzieje się z dobowym wydatkiem energetycznym TDEE w miarę spadku masy ciała zgodnie z modelem nieliniowym Halla?',
        ['TDEE maleje nieliniowo z powodu mniejszego kosztu poruszania lżejszego ciała oraz adaptacyjnego obniżenia BMR', 'Spadek wydatku energii stopniowo niweluje początkowy deficyt kaloryczny, prowadząc do zjawiska plateau.'],
        ['TDEE rośnie gwałtownie z każdym utraconym kilogramem tłuszczu', 'Wydatek energetyczny maleje, a nie rośnie, w miarę zmniejszania masy ciała.'],
        ['TDEE pozostaje absolutnie niezmienne przez całe życie człowieka', 'Wydatek jest ściśle skorelowany z masą tkanek i poziomem hormonów.'],
      ),
    ],
  },
  {
    id: 'otylosc-chemia-biochemia',
    title: 'Biochemia i stereochemia: kaskada lipolizy, szlak karnitynowy i modyfikacje inkretyn',
    group: 'Chemia i biochemia',
    readTime: '13 min',
    goals: [
      'Poznać trójetapową kaskadę enzymatyczną wewnątrzkomórkowej lipolizy: ATGL, HSL i MGL.',
      'Scharakteryzować szlak karnitynowy (CPT-1, CACT, CPT-2) transportu kwasów tłuszczowych do mitochondrialnej beta-oksydacji.',
      'Zrozumieć chemiczne modyfikacje analogów GLP-1 (łańcuchy dikarboksylowe, mostki kwasów tłuszczowych) i stereospecyficzność statyn.',
    ],
    sections: [
      {
        title: 'Trójetapowa kaskada lipolizy w adipocytach: ATGL, HSL i MGL',
        content:
          'Lipoliza wewnątrzkomórkowa w adipocytach podlega precyzyjnej regulacji hormonalnej. W spoczynku białko perilipina 1 (PLIN1) pokrywa powierzchnię kropli lipidowej, blokując dostęp enzymów. Pod wpływem katecholamin aktywacja receptorów beta-adrenergicznych i kinazy PKA fosforyluje PLIN1 oraz lipazę hormonozależną (HSL). Uwolniony koaktywator CGI-58 (ABHD5) aktywuje lipazę triglicerydową tkanki tłuszczowej (ATGL), która katalizuje pierwszy i ograniczający szybkość etap: hydrolizę triacyloglicerolu do diacyloglicerolu (DAG) z uwolnieniem pierwszego WKT. Następnie ufosforylowana HSL hydrolizuje DAG do monoacyloglicerolu (MAG), a lipaza monoacyloglicerolowa (MGL) rozszczepia MAG na wolny glicerol i trzeci kwas tłuszczowy.',
      },
      {
        title: 'Szlak karnitynowy i beta-oksydacja mitochondrialna',
        content:
          'Długołańcuchowe kwasy tłuszczowe w cytoplazmie ulegają aktywacji do acylo-CoA przez syntetazę acylo-CoA. Wewnętrzna błona mitochondrialna jest jednak nieprzepuszczalna dla acylo-CoA, co wymaga czółenka karnitynowego. Palmitoilotransferaza karnitynowa 1 (CPT-1), zlokalizowana w zewnętrznej błonie mitochondrialnej, przenosi resztę acylową na karnitynę, tworząc acylokarnitynę. Enzym ten jest fizjologicznie silnie allosterycznie hamowany przez malonylo-CoA (pierwszy produkt lipogenezy de novo katalizowany przez karboksylazę acetylo-CoA ACC). Po przeniknięciu przez translokazę CACT enzym CPT-2 odtwarza acylo-CoA w macierzy mitochondrialnej, gdzie wchodzi on w powtarzalne 4-etapowe cykle beta-oksydacji (utlenianie przez FAD, hydratacja, utlenianie przez NAD+, tioliza).',
      },
      {
        title: 'Chemia analogów inkretyn i stereospecyficzność statyn',
        content:
          'Stabilność metaboliczną semaglutydu uzyskano poprzez podstawienie w pozycji 8 kwasu alfa-aminoizomasłowego (Aib), co sterycznie blokuje dostęp enzymu DPP-4, oraz dołączenie do lizyny w pozycji 26 łańcucha dikwasu tłuszczowego C18 z hydrofilowym łącznikiem kwasu glutaminowego. Tirzepatyd posiada jeszcze dłuższy łańcuch dikwasowy C20. Łańcuchy te tworzą odwracalne kompleksy hydrofobowe w kieszeni wiążącej Sudlow I na ludzkiej albuminie osocza. Z kolei statyny wykazują stereospecyficzne podobieństwo do stanu przejściowego 3,5-dihydroksy-heptanianu reduktazy HMG-CoA, blokując kompetycyjnie redukcję HMG-CoA do kwasu mewalonowego ze stałą powinowactwa Ki o rzędy wielkości wyższą niż naturalny substrat.',
      },
    ],
    table: {
      caption: 'Kluczowe enzymy i punkty kontrolne metabolizmu lipidów',
      headers: ['Enzym / Szlak', 'Reakcja chemiczna', 'Regulator allosteryczny / hormonalny', 'Rola fizjologiczna'],
      rows: [
        ['ATGL (Lipaza triglicerydowa)', 'TAG -> DAG + WKT (etap ograniczający lipolizy)', 'Aktywowana przez CGI-58 (po fosforylacji PLIN1 przez PKA)', 'Inicjacja mobilizacji kwasów tłuszczowych z kropli tłuszczowej'],
        ['HSL (Lipaza hormonozależna)', 'DAG -> MAG + WKT', 'Stymulowana przez PKA (katecholaminy), hamowana przez insulinę', 'Hydroliza diacylogliceroli w adipocytach'],
        ['CPT-1 (Palmitoilotransferaza 1)', 'Acylo-CoA + Karnityna -> Acylokarnityna', 'Silnie hamowana przez malonylo-CoA', 'Bramka kontrolna wejścia kwasów tłuszczowych do mitochondrium'],
        ['Reduktaza HMG-CoA', 'HMG-CoA + 2 NADPH -> Mewalonian + 2 NADP+', 'Hamowana kompetycyjnie przez statyny', 'Kluczowy etap ograniczający szybkość syntezy cholesterolu de novo'],
      ],
    },
    advanced:
      'Receptory jądrowe PPAR-alfa regulują transkrypcję genów CPT-1, enzymów beta-oksydacji oraz apolipoproteiny ApoA-I i ApoA-II. Fibraty (fenofibrat, gemfibrozyl) działają jako syntetyczni agoniści PPAR-alfa. W wyniku aktywacji heterodimeru PPAR-alfa/RXR dochodzi do zwiększonego wychwytu i spalania kwasów tłuszczowych w wątrobie, co drastycznie redukuje pulę substratów do syntezy triglicerydów VLDL i prowadzi do spadku stężenia triglicerydów w osoczu o 30–50%.',
    summary:
      'Lipolizę napędza kaskada ATGL -> HSL -> MGL pod kontrolą PKA i perilipiny. CPT-1 kontroluje wejście kwasów do mitochondrium i jest hamowana przez malonylo-CoA. Semaglutyd i tirzepatyd wiążą albuminę dzięki dikwasom C18/C20, a statyny naśladują stan przejściowy HMG-CoA.',
    sourceIds: ['esc-eas-dyslipidemia-2023', 'easo-2024'],
    questions: [
      q(
        'Który enzym katalizuje pierwszy i ograniczający szybkość etap wewnątrzkomórkowej lipolizy w adipocytach, hydrolizując triacyloglicerol do diacyloglicerolu?',
        ['Adipocytarna lipaza triglicerydowa (ATGL, PNPLA2)', 'ATGL współdziała z koaktywatorem CGI-58 uwolnionym z perilipiny po stymulacji beta-adrenergicznej.'],
        ['Lipaza lipoproteinowa (LPL)', 'LPL działa w świetle naczyń włosowatych na lipoproteiny krążące, a nie wewnątrz adipocytu.'],
        ['Dehydrogenaza bursztynianowa', 'Enzym ten bierze udział w cyklu Krebsa i łańcuchu oddechowym, nie katalizuje lipolizy.'],
      ),
      q(
        'Który metabolit pośredni lipogenezy de novo jest silnym allosterycznym inhibitorem enzymu CPT-1, blokującym niepotrzebne spalanie kwasów tłuszczowych podczas ich syntezy?',
        ['Malonylo-CoA', 'Gdy w komórce powstaje malonylo-CoA pod wpływem karboksylazy acetylo-CoA (ACC), CPT-1 zostaje zablokowana, chroniąc nowo zsyntetyzowane kwasy przed beta-oksydacją.'],
        ['Mleczan', 'Mleczan jest produktem glikolizy beztlenowej, nie reguluje CPT-1.'],
        ['Szczawiooctan', 'Szczawiooctan kondensuje z acetylo-CoA w cytrynian, nie jest bezpośrednim inhibitorem CPT-1.'],
      ),
      q(
        'Jaki element strukturalny cząsteczki statyn odpowiada za ich bezpośrednie kompetycyjne wiązanie z centrum aktywnym reduktazy HMG-CoA?',
        ['Grupa kwasu 3,5-dihydroksykarboksylowego naśladująca stan przejściowy naturalnego substratu (mewalonylo-CoA)', 'Struktura ta idealnie pasuje do kieszeni katalitycznej enzymu ze znacznie wyższym powinowactwem niż sam HMG-CoA.'],
        ['Pierścień beta-laktamowy typowy dla penicylin', 'Statyny nie są antybiotykami beta-laktamowymi.'],
        ['Trzy atomy jodu w pierścieniu benzenowym', 'Jod występuje w cząsteczkach hormonów tarczycy i amiodaronie, a nie w statynach.'],
      ),
      q(
        'Które białko osłania powierzchnię kropli lipidowej w spoczynkowym adipocycie i musi ulec fosforylacji przez PKA, aby umożliwić rozpoczęcie lipolizy?',
        ['Perilipina 1 (PLIN1)', 'Fosforylacja perilipiny 1 uwalnia koaktywator CGI-58 i odsłania rdzeń lipidowy dla enzymów lipolitycznych.'],
        ['Albumina surowicy ludzkiej', 'Albumina krąży we krwi i transportuje wolne kwasy tłuszczowe, nie pokrywa kropli tłuszczowej w komórce.'],
        ['Hemoglobina', 'Hemoglobina transportuje tlen w erytrocytach.'],
      ),
      q(
        'Jaki jest cel dołączenia reszty kwasu alfa-aminoizomasłowego (Aib) w pozycji 8 cząsteczki semaglutydu?',
        ['Zapewnienie całkowitej oporności peptydu na enzymatyczne cięcie i inaktywację przez dipeptydylopeptydazę 4 (DPP-4)', 'Naturalny GLP-1 posiada w pozycji 8 alaninę, która jest natychmiast rozpoznawana i odcinana przez DPP-4.'],
        ['Umożliwienie wiązania z hemoglobiną w krwinkach czerwonych', 'Semaglutyd nie wiąże się z hemoglobiną.'],
        ['Przyspieszenie wydalania nerkowego leku w ciągu 15 minut', 'Modyfikacja ma na celu wydłużenie, a nie skrócenie czasu krążenia leku.'],
      ),
    ],
  },
];
