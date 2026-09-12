import { q, type DraftLesson } from './course-types.ts';

export const draftPregnancyMathChem: DraftLesson[] = [
  {
    id: 'ciaza-modele-insulinoopornosci-lozyskowej',
    title: 'Matematyczny model insulinooporności łożyskowej i kinetyka glukozy',
    subtitle: 'Nieliniowy spadek współczynnika wrażliwości Si w modelu Bergmana i transfer GLUT1 matka–płód',
    group: 'Matematyka i modele',
    minutes: 19,
    goals: [
      'Scharakteryzujesz matematyczny model minimalny Bergmana zmodyfikowany dla ciąży (spadek wskaźnika wrażliwości Si o 50–60%).',
      'Wyjaśnisz kinetykę Michaelis-Menten przezłożyskowego transportu glukozy przez transportery GLUT1.',
    ],
    sections: [
      {
        title: 'Modyfikacja modelu minimalnego Bergmana dla ciąży',
        text: 'W klasycznym modelu minimalnym Bergmana dynamikę glikemii G(t) opisuje układ równań różniczkowych: dG/dt = -(p1 + X(t))*G(t) + p1*Gb, gdzie X(t) oznacza stężenie insuliny w przedziale efektorowym, p1 to niezależny od insuliny klirens glukozy, a wskaźnik wrażliwości na insulinę definiuje się jako Si = p3 / p2. W warunkach ciąży fizjologicznej ekspresja hPL, progesteronu i TNF-alfa powoduje nieliniowy spadek parametru Si z wartości wyjściowej ~5,0–8,0 do zaledwie 2,0–3,5 *(10^-4 min^-1 / (µIU/ml)) w 32.–36. tygodniu ciąży (spadek o 55–60%).',
      },
      {
        title: 'Hiperplazja komórek beta i wskaźnik dyspozycji DI (Disposition Index)',
        text: 'Kompensacja spadku wrażliwości tkankowej opiera się na hipertrofii i hiperplazji komórek beta wysp trzustkowych stymulowanej prolaktyną i łożyskowym hPL przez szlak sygnałowy JAK2/STAT5. Iloczyn wrażliwości tkankowej (Si) i ostrej odpowiedzi wydzielniczej komórek beta na glukozę (AIRg) stanowi tzw. wskaźnik dyspozycji: DI = Si * AIRg. W ciąży fizjologicznej DI pozostaje stały, ponieważ komórki beta zwiększają wydzielanie insuliny dokładnie o taki sam czynnik, o jaki spadła wrażliwość (AIRg rośnie 2–3-krotnie). Cukrzyca ciążowa rozwija się, gdy DI załamuje się poniżej krytycznego progu.',
      },
      {
        title: 'Kinetyka transportu przezłożyskowego glukozy (GLUT1)',
        text: 'Transfer glukozy od matki do płodu zachodzi przez dyfuzję ułatwioną z udziałem transporterów GLUT1 obecnych na błonie mikrokosmkowej i podstawnej syncytiotrofoblastu. Kinetyka tego procesu podlega równaniu Michaelis-Menten: J_glukoza = (Vmax * [G_matka - G_płód]) / (Km + [G_matka - G_płód]), gdzie Km dla GLUT1 wynosi około 10–15 mmol/l. Ponieważ stężenia glukozy we krwi matki (4–8 mmol/l) mieszczą się znacznie poniżej Km, transfer glukozy ma charakter quasi-liniowy pierwszego rzędu: każde zwiększenie glikemii u matki natychmiastowo i proporcjonalnie zwiększa strumień glukozy docierający do płodu.',
      },
    ],
    table: {
      headers: ['Parametr w modelu matematycznym', 'Wartość przed ciążą', 'Wartość w III trymestrze', 'Konsekwencja fizjologiczna'],
      rows: [
        ['Wskaźnik wrażliwości na insulinę (Si)', '100% (wartość bazowa)', '40 – 45% (spadek o 55–60%)', 'Zmniejszony wychwyt glukozy w mięśniach matki'],
        ['Ostra odpowiedź komórek beta (AIRg)', '100% (wartość bazowa)', '250 – 300% (wzrost 2,5–3x)', 'Kompensacyjna hiperinsulinemia u zdrowej ciężarnej'],
        ['Wskaźnik dyspozycji (DI = Si * AIRg)', 'Stały (> 1500)', 'Zachowany w normie; < 800 w GDM', 'Załamanie DI definiuje wyczerpanie rezerwy beta'],
        ['Gradient stężeń glukozy (G_matka - G_płód)', 'Brak', 'Fizjologiczny gradient ~0,8–1,2 mmol/l', 'Ciągły bierny przepływ glukozy do krążenia pępowinowego'],
      ],
    },
    advanced:
      'Glikemia we krwi pępowinowej płodu jest ściśle zależna od stężenia glukozy w żyle matczynej według zależności: [Glukoza_płód] = 0,75 * [Glukoza_matka] - 0,4 (w mmol/l). Przy matczynej glikemii poposiłkowej rzędu 10 mmol/l (180 mg/dl) glikemia płodu osiąga ponad 7,1 mmol/l (128 mg/dl), co drastycznie przekracza próg nerkowy cewek płodowych, wywołując diurezę osmotyczną u płodu i wielowodzie (polyhydramnios).',
    summary:
      'W III trymestrze wrażliwość na insulinę Si spada o 60%. Komórki beta kompensują to 3-krotnym wzrostem wydzielania (stały wskaźnik DI). Transfer GLUT1 jest liniowy – hiperglikemia matki wprost przekłada się na płód.',
    sourceIds: ['ada_pregnancy_2024', 'figo_gdm_2024'],
    questions: [
      q(
        'O ile procent fizjologicznie spada wskaźnik wrażliwości na insulinę (Si w modelu Bergmana) w III trymestrze ciąży?',
        ['O około 50–60%', 'Spadek ten chroni dostawy glukozy dla intensywnie rosnącego mózgu i narządów płodu.'],
        ['O 5%', 'Tak mały spadek nie zapewniłby odpowiedniego przekierowania substratów energetycznych.'],
        ['O 100% (do całkowitej niewrażliwości)', 'Całkowity brak działania insuliny wywołałby śmiertelną kwasicę ketonową u matki.'],
        'ciaza-kinetyka-gdm-q1'
      ),
      q(
        'Czym jest wskaźnik dyspozycji (Disposition Index, DI) i jaka jest jego rola w patogenezie GDM?',
        ['Iloczynem wrażliwości na insulinę i odpowiedzi komórek beta (DI = Si * AIRg); jego spadek oznacza rozwój GDM', 'Jeśli trzustka nie potrafi zwiększyć wydzielania insuliny w stopniu równoważącym spadek wrażliwości, pojawia się hiperglikemia.'],
        ['Wskaźnikiem określającym tempo filtracji kłębuszkowej nerek płodu', 'DI dotyczy komórek beta trzustki i tkanek obwodowych, nie nefronów.'],
        ['Ilorazem stężenia progesteronu do estriolu', 'To wskaźnik dobrostanu łożyska, nie parametr modelu Bergmana.'],
        'ciaza-kinetyka-gdm-q2'
      ),
      q(
        'Dlaczego transfer glukozy przez łożysko z udziałem transporterów GLUT1 ma charakter quasi-liniowy w zakresie stężeń fizjologicznych?',
        ['Ponieważ stężenia glukozy u matki (4–8 mmol/l) są znacznie niższe niż stała Michaelisa Km dla GLUT1 (10–15 mmol/l)', 'Transportery pracują w zakresie nienasyconym, więc każda zmiana glikemii matki wprost modyfikuje strumień do płodu.'],
        ['Transportery GLUT1 działają wyłącznie w mechanizmie pinocytozy', 'GLUT1 działa na zasadzie dyfuzji ułatwionej, nie pinocytozy.'],
        ['W łożysku nie obowiązuje kinetyka enzymatyczna Michaelis-Menten', 'Wszystkie białka nośnikowe podlegają prawom kinetyki nasycalnej.'],
        'ciaza-kinetyka-gdm-q3'
      ),
      q(
        'Jaki jest mechanizm powstawania wielowodzia (polyhydramnios) w przebiegu hiperglikemii ciężarnej?',
        ['Hiperglikemia płodu przekracza próg nerkowy, wywołując diurezę osmotyczną płodu (mocz płodu tworzy płyn owodniowy)', 'Większa objętość wydalanego przez nerki płodu moczu zwiększa pulę płynu owodniowego.'],
        ['Łożysko zaczyna bezpośrednio pompować sól fizjologiczną do jamy owodni', 'Płyn owodniowy w II/III trymestrze jest niemal w całości produkowany przez nerki płodu.'],
        ['Płód przestaje połykać płyn owodniowy z powodu paraliżu przełyku', 'Wielowodzie w cukrzycy wynika z nadprodukcji moczu, nie braku połykania.'],
        'ciaza-kinetyka-gdm-q4'
      ),
      q(
        'Który hormon wydzielany przez łożysko wykazuje najsilniejsze bezpośrednie działanie lipolityczne i antyinsulinowe w ustroju matki?',
        ['Ludzki laktogen łożyskowy (hPL / human placental lactogen)', 'Zwiększa stężenie wolnych kwasów tłuszczowych w surowicy matki, blokując receptory insulinowe w mięśniach.'],
        ['Gonadotropina kosmówkowa (hCG)', 'hCG stymuluje ciałko żółte i tarczycę, nie jest głównym hormonem antyinsulinowym III trymestru.'],
        ['Relaksyna', 'Relaksyna wpływa na tkankę łączną, nie na gospodarkę węglowodanową.'],
        'ciaza-kinetyka-gdm-q5'
      ),
    ],
  },
  {
    id: 'ciaza-kinetyka-transferu-lekow',
    title: 'Farmakokinetyka transferu łożyskowego leków endokrynologicznych',
    subtitle: 'Masa cząsteczkowa, wiązanie z białkami, transport aktywny (insulina, LT4, PTU, tiamazol, metformina)',
    group: 'Matematyka i modele',
    minutes: 18,
    goals: [
      'Zrozumiesz fizykochemiczne determinanty przenikania leków przez barierę łożyskową (masa molowa <500 Da, lipofilność, wiązanie z białkami).',
      'Porównasz profil transferu łożyskowego insuliny (brak), metforminy (wysoki), tyreostatyków i lewotyroksyny.',
    ],
    sections: [
      {
        title: 'Czynniki fizykochemiczne transferu przezłożyskowego',
        text: 'Bariera łożyskowa (syncytiotrofoblast, tkanka łączna kosmków i śródbłonek naczyń płodowych) nie jest barierą bezwzględną, lecz selektywnym filtrem metabolicznym. Szybkość transferu biernego leków zależy od prawa dyfuzji Ficka: dQ/dt = (D * A * K_p * [C_matka - C_płód]) / d. Cząsteczki o masie molowej <500 Da i wysokiej lipofilności (np. metformina, propranolol, tiamazol) swobodnie dyfundują przez barierę. Cząsteczki o masie >1000 Da (np. insulina – masa ~5800 Da, heparyny drobnocząsteczkowe) NIE PRZENIKAJĄ przez łożysko drogą dyfuzji biernej.',
      },
      {
        title: 'Asymetria transferu tyreostatyków i lewotyroksyny',
        text: 'Tyreostatyki – tiamazol (masa 114 Da, słabe wiązanie z białkami ~10%) oraz propylotiouracyl (masa 170 Da, wiązanie z białkami ~80%) – swobodnie przenikają przez łożysko, osiągając we krwi płodu stężenia zbliżone do matczynych (stosunek stężeń płód/matka dla MMI wynosi ~1,0; dla PTU ~0,7). W przeciwieństwie do nich lewotyroksyna (T4), mimo że ma małą masę (777 Da), w 99,97% krąży związana z białkami TBG i transtyretyną, a wolna frakcja jest w 85–90% inaktywowana przez łożyskową dejodynazę DIO3. Dlatego transfer matczynego T4 do płodu jest fizjologicznie powolny i ograniczony.',
      },
      {
        title: 'Transfer metforminy a pompa P-glikoproteiny (MDR1/ABCB1)',
        text: 'Syncytiotrofoblast wykazuje ekspresję transporterów efluksowych zależnych od ATP, w tym P-glikoproteiny (P-gp / ABCB1) oraz białka oporności raka piersi (BCRP / ABCG2), które aktywnie pompują ksenobiotyki z krwi płodu z powrotem do krążenia matki. Metformina (mała hydrofilna cząsteczka, masa 129 Da) nie jest substratem P-gp, lecz jest transportowana przez transportery kationów organicznych OCT1/OCT3 obecne w łożysku. W rezultacie stężenia metforminy we krwi pępowinowej noworodka są równe lub nawet o 10–20% wyższe niż w surowicy matki.',
      },
    ],
    table: {
      headers: ['Lek endokrynologiczny', 'Masa cząsteczkowa (Da)', 'Stopień wiązania z białkami (%)', 'Stosunek stężeń płód / matka', 'Status bezpieczeństwa płodowego'],
      rows: [
        ['Insulina ludzka / analogi', '~ 5808 Da (duży peptyd)', 'Minimalne nieswoiste', '0,0 (NIE PRZENIKA)', 'Lek I wyboru w ciąży (pełne bezpieczeństwo)'],
        ['Metformina', '129 Da (mała cząsteczka)', '0% (brak wiązania)', '1,0 – 1,2 (SWOBODNY TRANSFER)', 'Ograniczone stosowanie (wysoka ekspozycja płodu)'],
        ['Propylotiouracyl (PTU)', '170 Da', '~ 80% (związany)', '0,6 – 0,7 (umiarkowany transfer)', 'Lek z wyboru w I trymestrze'],
        ['Tiamazol (MMI)', '114 Da', '~ 10% (związany)', '0,9 – 1,0 (wysoki transfer)', 'Ryzyko embriopatii w I trym.; bezpieczny w II/III trym.'],
        ['Lewotyroksyna (T4)', '777 Da', '99,97% (TBG/albumina)', '0,2 – 0,3 (ograniczony przez DIO3)', 'Bezpieczna i konieczna w hipotyreozie'],
      ],
    },
    advanced:
      'Glikokortykoidy różnią się diametralnie kinetyką łożyskową: hydrokortyzon i prednizon są substratami dla łożyskowego enzymu 11-beta-HSD2, który utlenia ich grupę 11-hydroksylową do nieaktywnej grupy ketonowej (kortyzon, prednizon), chroniąc płód przed działaniem glukokortykoidowym. Betametazon i deksametazon posiadają fluorowany pierścień steroidowy, który uniemożliwia wiązanie z 11-beta-HSD2; przenikają przez łożysko w 100% w postaci aktywnej biologicznie, co wykorzystuje się celowo w stymulacji pneumocytów typu II do produkcji surfaktantu u płodu.',
    summary:
      'Insulina (>5000 Da) nie przenika przez łożysko. Metformina (129 Da) swobodnie przenika (stężenie płodu równe matce). Tyreostatyki łatwo przenikają, a hydrokortyzon inaktywuje łożyskowy 11-beta-HSD2.',
    sourceIds: ['ada_pregnancy_2024', 'ata_pregnancy_2017'],
    questions: [
      q(
        'Dlaczego insulina podawana matce w cukrzycy ciążowej nie wywołuje bezpośredniej hipoglikemii u płodu?',
        ['Cząsteczka insuliny (~5800 Da) jest zbyt duża, by przeniknąć przez nienaruszoną barierę syncytiotrofoblastu', 'Reguluje glikemię matki, pośrednio normalizując dopływ glukozy do płodu.'],
        ['Insulina matki jest niszczona przez sok żołądkowy ciężarnej', 'Insulinę podaje się podskórnie, nie doustnie.'],
        ['Receptory insulinowe u płodu pojawiają się dopiero po 40. tygodniu', 'Płód posiada własne w pełni funkcjonalne receptory insulinowe od I trymestru.'],
        'ciaza-transfer-q1'
      ),
      q(
        'Jaki jest stosunek stężenia metforminy we krwi pępowinowej płodu do stężenia w surowicy matki?',
        ['Około 1,0–1,2 (stężenie u płodu jest równe lub wyższe niż u matki)', 'Metformina swobodnie przenika przez łożysko za pośrednictwem transporterów OCT.'],
        ['0,0 (metformina w ogóle nie przechodzi do płodu)', 'To insulina nie przechodzi; metformina dyfunduje bez przeszkód.'],
        ['Mniej niż 0,001%', 'Metformina nie jest zatrzymywana przez barierę łożyskową.'],
        'ciaza-transfer-q2'
      ),
      q(
        'Dlaczego podanie lewotyroksyny (LT4) matce nie leczy skutecznie wola i wrodzonej niedoczynności tarczycy u płodu?',
        ['T4 w 99,97% wiąże się z białkami TBG, a wolna frakcja jest w 90% niszczona przez łożyskową dejodynazę DIO3', 'Przezłożyskowy transfer T4 jest zbyt powolny, by w pełni zrównoważyć blokadę tyreostatyczną płodu.'],
        ['Ponieważ tyroksyna w łożysku zamienia się w kwas solny', 'Twierdzenie to jest pozbawione sensu biochemicznego.'],
        ['Tarczyca płodu nie potrafi wiązać tyroksyny', 'Komórki płodu posiadają receptory jądrowe TR-alfa i TR-beta.'],
        'ciaza-transfer-q3'
      ),
      q(
        'Dlaczego betametazon podaje się matce w zagrożeniu porodem przedwczesnym, a nie stosuje się hydrokortyzonu?',
        ['Betametazon nie ulega inaktywacji przez łożyskowy enzym 11-beta-HSD2 i przenika do płodu w postaci aktywnej', 'Hydrokortyzon zostałby w 90% rozłożony w łożysku do nieaktywnego kortyzonu i nie dotarłby do płuc płodu.'],
        ['Hydrokortyzon jest lekiem wstrzymującym akcję skurczową', 'Hydrokortyzon nie jest tokolitykiem.'],
        ['Betametazon pobudza wyłącznie serce matki', 'Celem jest stymulacja syntezy surfaktantu w płucach płodu.'],
        'ciaza-transfer-q4'
      ),
      q(
        'Które białko błonowe w syncytiotrofoblaście aktywnie wypompowuje część leków z powrotem do krwi matczynej?',
        ['P-glikoproteina (P-gp / MDR1 / ABCB1)', 'Jest transporterem efluksowym chroniącym płód przed toksynami i niektórymi lekami ksenobiotycznymi.'],
        ['Kotransporter SGLT2', 'SGLT2 występuje w kanalikach proksymalnych nerek, nie w łożysku.'],
        ['Hemoglobina płodowa HbF', 'HbF transportuje tlen w erytrocytach płodu, nie jest pompą efluksową.'],
        'ciaza-transfer-q5'
      ),
    ],
  },
  {
    id: 'ciaza-struktura-gonadotropiny-hcg-tsh',
    title: 'Struktura glikoprotein osiowych: hCG vs TSH',
    subtitle: 'Wspólna podjednostka alfa, swoistość podjednostki beta i mechanizm cross-aktywacji TSHR',
    group: 'Chemia i biochemia',
    minutes: 19,
    goals: [
      'Wyjaśnisz strukturę heterodimeryczną hormonów glikoproteinowych (TSH, hCG, LH, FSH) i tożsamość podjednostki alfa.',
      'Scharakteryzujesz molekularny mechanizm cross-aktywacji receptora TSHR przez wysokie stężenia hCG w ciąży i zaśniadzie groniastym.',
    ],
    sections: [
      {
        title: 'Heterodimeryczna architektura hormonów glikoproteinowych',
        text: 'Cztery kluczowe hormony człowieka – TSH, LH, FSH oraz łożyskowa gonadotropina kosmówkowa (hCG) – należą do rodziny hormonów glikoproteinowych. Wszystkie posiadają identyczną podjednostkę alfa (kodowaną przez pojedynczy gen CGA na chromosomie 6, zbudowaną z 92 aminokwasów i zawierającą 5 mostków dwusiarczkowych). Swoistość biologiczną i powinowactwo do właściwego receptora nadaje odrębna podjednostka beta (beta-TSH, beta-LH, beta-FSH, beta-hCG). Podjednostka beta-hCG wykazuje aż 82% homologii sekwencji aminokwasowej z podjednostką beta-LH, lecz posiada unikalny hydrofilny koniec C-końcowy (CTP) z 4 miejscami O-glikozylacji, co wydłuża jej okres półtrwania do 24–36 godzin (w porównaniu z 20 minutami dla LH).',
      },
      {
        title: 'Struktura węglowodanowa i ładunek elektryczny',
        text: 'Aż 30% masy cząsteczkowej hCG stanowią łańcuchy oligosacharydowe. Stopień sjaloizacji (zawartości reszt kwasu sjalowego na końcach łańcuchów cukrowych) determinuje ładunek ujemny cząsteczki i jej klirens wątrobowo-nerkowy. Cząsteczki hCG o niskim stopniu sjaloizacji (tzw. izoformy zasadowe) wykazują paradoksalnie znacznie wyższe powinowactwo i siłę aktywacji receptora TSH (TSHR) w porównaniu z izoformami kwaśnymi, mimo że krócej krążą w osoczu.',
      },
      {
        title: 'Molekularny mechanizm cross-aktywacji receptora TSHR',
        text: 'Receptor TSH (TSHR) posiada olbrzymią zewnątrzbłonową domenę wiążącą ligand o strukturze podkowy utworzonej z powtórzeń bogatych w leucynę (LRR). Podjednostka beta-hCG w wysokich stężeniach potrafi oddziaływać z domeną LRR receptora TSHR, indukując przesunięcie tzw. zawiasu domenowego (hinge region) i aktywację białka Gs. Szacuje się, że 1 jednostka aktywności TSH odpowiada około 20 000–50 000 IU hCG. W warunkach fizjologicznych (hCG ~100 000 IU/l) odpowiada to słabej stymulacji tarczycy (ekwiwalent ~2–5 mIU/l TSH). W zaśniadzie groniastym lub raku kosmówki (choriocarcinoma), gdzie stężenia hCG przekraczają 500 000–1 000 000 IU/l, dochodzi do masywnej stymulacji TSHR i rozwoju ciężkiej, jawnej tyreotoksykozy.',
      },
    ],
    table: {
      headers: ['Hormon glikoproteinowy', 'Podjednostka alfa', 'Podjednostka beta (liczba aminokwasów)', 'Główny receptor docelowy', 'Okres półtrwania t1/2'],
      rows: [
        ['TSH (tyreotropina)', 'Wspólna (92 aa, gen CGA)', 'Swoista beta-TSH (118 aa)', 'Receptor TSHR (komórka tarczycy)', 'Około 50 – 60 minut'],
        ['hCG (gonadotropina kosmówkowa)', 'Wspólna (92 aa, gen CGA)', 'Swoista beta-hCG (145 aa z CTP)', 'Receptor LHCGR oraz słabo TSHR', 'Około 24 – 36 godzin'],
        ['LH (lutropina)', 'Wspólna (92 aa, gen CGA)', 'Swoista beta-LH (121 aa)', 'Receptor LHCGR (gonady)', 'Około 20 – 30 minut'],
        ['FSH (folitropina)', 'Wspólna (92 aa, gen CGA)', 'Swoista beta-FSH (111 aa)', 'Receptor FSHR (gonady)', 'Około 3 – 4 godziny'],
      ],
    },
    advanced:
      'Opisano rzadkie rodzinne mutacje punktowe w domenie zewnątrzbłonowej receptora TSHR (np. mutacja K183R), które powodują zmianę przestrzenną kieszeni wiążącej i drastyczny wzrost powinowactwa TSHR do hCG (nawet 10–20-krotny). U kobiet będących nosicielkami tej mutacji już przy fizjologicznych stężeniach hCG we wczesnej ciąży rozwija się ciężka, nawracająca w każdej ciąży tyreotoksykoza (familial gestational hyperthyroidism) bez obecności przeciwciał TRAb.',
    summary:
      'TSH, hCG, LH i FSH mają identyczną podjednostkę alfa. Podjednostka beta-hCG w wysokich stężeniach (>50 000 IU/l) wiąże receptor TSHR, fizjologicznie obniżając TSH, a w zaśniadzie wywołując tyreotoksykozę.',
    sourceIds: ['ata_pregnancy_2017'],
    questions: [
      q(
        'Który element budowy cząsteczkowej jest w 100% identyczny dla hormonów TSH, hCG, LH i FSH?',
        ['Podjednostka alfa (kodowana przez pojedynczy gen CGA na chromosomie 6)', 'Wszystkie 4 hormony posiadają tę samą podjednostkę alfa; różnią się swoistą podjednostką beta.'],
        ['Podjednostka beta', 'Podjednostka beta jest unikalna dla każdego hormonu i nadaje swoistość receptorową.'],
        ['Liczba mostków dwusiarczkowych w podjednostce beta', 'Liczba mostków i sekwencja aminokwasów podjednostek beta różnią się znacząco.'],
        'ciaza-struktura-hcg-q1'
      ),
      q(
        'Co odpowiada za długi okres półtrwania hCG we krwi (24–36 godzin) w porównaniu z LH (20 minut)?',
        ['Obecność hydrofilnego ogona C-końcowego (CTP) w podjednostce beta-hCG bogatego w reszty kwasu sjalowego', 'Gęsta sjaloizacja chroni cząsteczkę przed wychwytem przez receptory asjaloglikoproteinowe w wątrobie.'],
        ['Wiązanie hCG z albuminą w 99,9%', 'hCG krąży w postaci wolnej, nie wiąże się w wysokim stopniu z albuminami.'],
        ['Brak jakichkolwiek wiązań peptydowych w cząsteczce hCG', 'hCG jest białkiem zbudowanym z klasycznych łańcuchów polipeptydowych.'],
        'ciaza-struktura-hcg-q2'
      ),
      q(
        'Ile w przybliżeniu jednostek hCG (IU/l) wywołuje w tarczycy efekt stymulujący równoważny 1 mIU/l TSH?',
        ['Około 20 000 – 50 000 IU/l', 'Dlatego fizjologiczne stężenia 100 000 IU w I trymestrze wywołują łagodną supresję przysadkowego TSH.'],
        ['Dokładnie 1 IU/l', 'Gdyby powinowactwo było równe 1:1, każda ciąża kończyłaby się śmiertelnym przełomem tarczycowym.'],
        ['Ponad 10 000 000 IU/l', 'Tak wysokie stężenia nie występują nawet w zaawansowanych zaśniadach.'],
        'ciaza-struktura-hcg-q3'
      ),
      q(
        'W jakim schorzeniu ginekologicznym stężenie hCG przekracza 500 000 IU/l, wywołując jawną tyreotoksykozę matki?',
        ['W zaśniadzie groniastym całkowitym (mola hydatidosa) lub raku kosmówki (choriocarcinoma)', 'Masywny rozrost trofoblastu generuje gigantyczne stężenia hCG cross-aktywujące receptor TSHR.'],
        ['W zespole policystycznych jajników (PCOS)', 'W PCOS stężenie hCG jest całkowicie niewykrywalne poza ciążą.'],
        ['W endometriozie głęboko naciekającej', 'Endometrioza nie produkuje gonadotropiny kosmówkowej.'],
        'ciaza-struktura-hcg-q4'
      ),
      q(
        'Na czym polega molekularny defekt w rzadkiej rodzinnej nadczynności tarczycy indukowanej ciążą?',
        ['Na mutacji punktowej receptora TSHR w tarczycy, która zwiększa jego wrażliwość na hCG', 'Receptor TSHR o zmienionej strukturze ulega silnej aktywacji już przy prawidłowych stężeniach hCG.'],
        ['Na braku podjednostki alfa w TSH', 'Brak podjednostki alfa uniemożliwiłby syntezę TSH i prowadził do niedoczynności.'],
        ['Na mutacji genu hemoglobiny', 'Hemoglobina transportuje tlen i nie wpływa na powinowactwo receptorów tarczycy.'],
        'ciaza-struktura-hcg-q5'
      ),
    ],
  },
  {
    id: 'ciaza-jednostka-plodowo-lozyskowa',
    title: 'Biochemia jednostki płodowo-łożyskowej: synteza estriolu',
    subtitle: 'Współpraca enzymatyczna nadnerczy i wątroby płodu z łożyskiem oraz diagnostyka prenatalna E3',
    group: 'Chemia i biochemia',
    minutes: 19,
    goals: [
      'Odwzorujesz metaboliczny szlak biosyntezy estriolu (E3) angażujący 3 narządy: nadnercza płodu, wątrobę płodu i łożysko.',
      'Zinterpretujesz znaczenie diagnostyczne stężenia wolnego estriolu (uE3) w teście potrójnym i poczwórnym (screening wad genetycznych).',
    ],
    sections: [
      {
        title: 'Podział ról metabolicznych w jednostce płodowo-łożyskowej',
        text: 'Ciąża człowieka stanowi unikalny układ symbiozy biochemicznej. Ani płód, ani łożysko nie posiadają pełnego zestawu enzymów niezbędnych do biosyntezy estrogenów z cholesterolu. Łożysko syntetyzuje olbrzymie ilości progesteronu (z cholesterolu pobieranego z lipoprotein LDL krwi matki przez enzymy CYP11A1 i HSD3B1), lecz nie ma enzymu CYP17A1, więc nie potrafi syntetyzować androgenów. Płód natomiast posiada wybitnie aktywny enzym CYP17A1 w strefie płodowej nadnerczy, lecz nie ma aromatazy (CYP19A1) ani sulfatazy steroidowej (STS). Dopiero przepływ metabolitów pomiędzy tymi narządami umożliwia biosyntezę estriolu (E3).',
      },
      {
        title: 'Trzyetapowy szlak syntezy estriolu (E3)',
        text: 'Biosynteza estriolu przebiega w trzech precyzyjnych krokach anatomicznych: 1) Krok 1 (Nadnercza płodu): Cholesterol przekształca się w pregnenolon, a następnie przez CYP17A1 w DHEA, który enzym SULT2A1 natychmiast przekształca w siarczan DHEA (DHEA-S); 2) Krok 2 (Wątroba płodu): DHEA-S ulega specyficznej 16-alfa-hydroksylacji przez enzym CYP3A7, tworząc 16α-OH-DHEA-S; 3) Krok 3 (Łożysko): 16α-OH-DHEA-S dociera naczyniami pępowinowymi do łożyska. Łożyskowa sulfataza steroidowa (STS) odszczepia resztę siarczanową do wolnego 16α-OH-DHEA, a aromataza (CYP19A1) przekształca go w estriol (E3), który w ponad 90% trafia do krwiobiegu matki.',
      },
      {
        title: 'Estriol (uE3) jako marker prenatalny dobrostanu płodu',
        text: 'W odróżnieniu od estradiolu (E2) i estronu (E1), których prekursory mogą pochodzić także z nadnerczy matki, ponad 90% krążącego w surowicy ciężarnej estriolu zależy bezwzględnie od sprawnego funkcjonowania nadnerczy i wątroby płodu. Dlatego stężenie wolnego estriolu (unconjugated estriol, uE3) w II trymestrze jest czułym wskaźnikiem dobrostanu płodu. Skrajnie niskie stężenia uE3 (<0,1 MoM – wielokrotności mediany) obserwuje się w: zespole Downa (trisomia 21), zespole Edwardsa (trisomia 18), anencefalii (brak stymulacji ACTH nadnerczy płodu) oraz wrodzonym niedoborze sulfatazy łożyskowej (STS).',
      },
    ],
    table: {
      headers: ['Narząd uczestniczący', 'Główny enzym szlaku E3', 'Substrat wejściowy', 'Produkt przekazywany dalej'],
      rows: [
        ['Nadnercza płodu (fetal zone)', 'CYP17A1 (liaza) + SULT2A1', 'Cholesterol / pregnenolon', 'DHEA-S (siarczan DHEA)'],
        ['Wątroba płodu', 'CYP3A7 (16α-hydroksylaza)', 'DHEA-S z nadnerczy płodu', '16α-OH-DHEA-S'],
        ['Łożysko (syncytiotrofoblast)', 'Sulfataza (STS) + Aromataza (CYP19A1)', '16α-OH-DHEA-S z wątroby płodu', 'Wolny estriol (E3) trafiający do krwi matki'],
        ['Krew ciężarnej matki', 'Wątrobowa glukuronidacja matki', 'Wolny estriol (uE3)', 'Wydalany z moczem jako glukuronid estriolu'],
      ],
    },
    advanced:
      'W teście potrójnym wykonywanym w II trymestrze ciąży (15.–20. tydzień) w kierunku zespołu Downa (trisomia 21) ocenia się triadę markerów biochemicznych: stężenie wolnego estriolu (uE3) jest OBNIŻONE (~0,7 MoM), stężenie alfa-fetoproteiny (AFP) jest OBNIŻONE (~0,7 MoM), a stężenie całkowitego lub wolnego beta-hCG jest ZNACZNIE PODWYŻSZONE (~2,0 MoM).',
    summary:
      'Synteza estriolu (E3) to szlak 3 narządów: nadnercza płodu robią DHEA-S, wątroba płodu 16-alfa-hydroksyluje do 16α-OH-DHEA-S, a łożysko odsiarcza i aromatyzuje do E3. uE3 to kluczowy marker prenatalny.',
    sourceIds: ['cah_pediatric', 'ata_pregnancy_2017'],
    questions: [
      q(
        'Dlaczego stężenie estriolu (E3) u ciężarnej jest specyficznym markerem dobrostanu płodu, w przeciwieństwie do estronu i estradiolu?',
        ['Ponieważ ponad 90% prekursorów estriolu (16α-OH-DHEA-S) musi zostać wytworzone wspólnie przez nadnercza i wątrobę płodu', 'Obumarcie lub ciężka hipoksja płodu natychmiast zatrzymuje syntezę estriolu.'],
        ['Estriol jest produkowany wyłącznie przez komórki jajnika matki', 'Jajniki matki w ciąży są zablokowane i nie syntetyzują estriolu.'],
        ['Estriol powstaje bezpośrednio z witaminy D w nerkach matki', 'Estriol jest steroidem estrogenowym, nie metabolitem cholekalcyferolu.'],
        'ciaza-jednostka-e3-q1'
      ),
      q(
        'Który enzym łożyskowy odszczepia resztę siarczanową od 16α-OH-DHEA-S przed jego aromatyzacją do estriolu?',
        ['Łożyskowa sulfataza steroidowa (STS)', 'Uwolnienie wolnego steroidu jest warunkiem koniecznym do zajścia reakcji aromatyzacji w retikulum łożyska.'],
        ['Dejodynaza typu 1', 'Dejodynazy metabolizują hormony tarczycy, nie steroidy.'],
        ['Insulinaza', 'Insulinaza degraduje peptydy insulinowe.'],
        'ciaza-jednostka-e3-q2'
      ),
      q(
        'Jaki profil biochemiczny testu potrójnego (uE3, AFP, hCG) w II trymestrze ciąży wskazuje na wysokie ryzyko zespołu Downa (trisomii 21)?',
        ['Obniżony estriol (uE3), obniżona alfa-fetoproteina (AFP) oraz wysokie hCG', 'Jest to klasyczna triada biochemiczna aneuploidii chromosomu 21.'],
        ['Wysoki estriol, wysoka AFP i niewykrywalne hCG', 'Taki profil nie występuje w zespole Downa.'],
        ['Wszystkie trzy markery przekraczają 10 MoM', 'Wskazywałoby na zaśniad groniasty lub ciążę wielopłodową.'],
        'ciaza-jednostka-e3-q3'
      ),
      q(
        'Dlaczego u płodu z bezmózgowiem (anencefalia) stężenie estriolu w surowicy matki spada niemal do zera?',
        ['Brak podwzgórza i przysadki uniemożliwia wydzielanie ACTH, co powoduje zanik strefy płodowej nadnerczy płodu', 'Brak kory płodowej pozbawia łożysko prekursora DHEA-S.'],
        ['Płód bezmózgowy zjada całe łożysko', 'Twierdzenie to jest anatomicznie i biologicznie absurdalne.'],
        ['Bezmózgowie wywołuje zablokowanie aromatazy w nerkach matki', 'Aromataza znajduje się w łożysku, nie w nerkach matki.'],
        'ciaza-jednostka-e3-q4'
      ),
      q(
        'Który enzym wątroby płodu odpowiada za unikalną 16-alfa-hydroksylację DHEA-S?',
        ['CYP3A7', 'Jest to główny izoenzym cytochromu P450 wątroby płodowej, ulegający wyciszeniu po urodzeniu na rzecz CYP3A4.'],
        ['CYP2D6', 'CYP2D6 odpowiada za metabolizm ksenobiotyków i psychotropów.'],
        ['CYP11B2', 'CYP11B2 to syntaza aldosteronu w kłębuszkowej strefie nadnerczy.'],
        'ciaza-jednostka-e3-q5'
      ),
    ],
  },
];
