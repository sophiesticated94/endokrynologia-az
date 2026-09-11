import { type DraftLesson, q } from './course-types.ts';

export const draftGonadsPart2: DraftLesson[] = [
  {
    id: 'gonady-nieplodnosc-meska',
    title: 'Niepłodność męska i andrologia kliniczna',
    group: 'Andrologia i gonady męskie',
    readTime: '13 min',
    goals: [
      'Znać normy i interpretować wyniki badania nasienia wg wytycznych WHO 2021 (6. wydanie).',
      'Różnicować azoospermię obstrukcyjną (OA) od nieobstrukcyjnej (NOA).',
      'Poznać rolę żylaków powrózka nasiennego, fragmentacji DNA plemników i stymulacji gonadotropinami.',
    ],
    sections: [
      {
        title: 'Seminogram wg standardów WHO 2021',
        content:
          'Badanie nasienia jest podstawą diagnostyki niepłodności męskiej. Wg 6. wydania podręcznika WHO (2021), badanie wykonuje się po 2–7 dniach abstynencji seksualnej. Wartości referencyjne dolnej granicy normy (5. percentyl) to: objętość ejakulatu >= 1,4 ml, całkowita liczba plemników >= 39 mln w ejakulacie, koncentracja >= 16 mln/ml, ruchliwość postępowa (PR) >= 30%, całkowita ruchliwość (PR+NP) >= 42% oraz odsetek plemników o prawidłowej morfologii >= 4%.',
      },
      {
        title: 'Azoospermia: obstrukcyjna (OA) vs nieobstrukcyjna (NOA)',
        content:
          'Azoospermia oznacza całkowity brak plemników w osadzie odwirowanego ejakulatu. W azoospermii obstrukcyjnej (OA) spermatogeneza jest prawidłowa, lecz istnieje mechaniczna niedrożność dróg wyprowadzających (np. wrodzony obustronny brak nasieniowodów CBAVD w mukowiscydozie CFTR, stan po wazektomii, pozapalne zrosty najądrzy). Cechy OA: prawidłowa objętość jąder, prawidłowe stężenia FSH i inhibiny B. W azoospermii nieobstrukcyjnej (NOA) uszkodzony jest sam miąższ jądra (zespół Klinefeltera, mikrodelecje regionu AZF chromosomu Y, kryptorchizm). Cechy NOA: małe jądra, wysokie stężenie FSH i skrajnie niska inhibina B.',
      },
      {
        title: 'Żylaki powrózka i zaawansowane testy (DFI)',
        content:
          'Żylaki powrózka nasiennego (varicocele) występują u ok. 35–40% mężczyzn z pierwotną niepłodnością. Zastój żylny prowadzi do podwyższenia temperatury moszny, hipoksji i stresu oksydacyjnego, uszkadzając spermatogenezę i zwiększając indeks fragmentacji DNA plemników (DFI > 20–30%). Leczeniem z wyboru klinicznie jawnych żylaków z nieprawidłowym nasieniem jest mikrochirurgiczna subinguinalna warikocelektomia.',
      },
    ],
    table: {
      caption: 'Różnicowanie azoospermii obstrukcyjnej (OA) i nieobstrukcyjnej (NOA)',
      headers: ['Parametr', 'Azoospermia obstrukcyjna (OA)', 'Azoospermia nieobstrukcyjna (NOA)'],
      rows: [
        ['Objętość jąder', 'Prawidłowa (> 15–20 ml)', 'Zmniejszona (< 10–12 ml)'],
        ['Stężenie FSH w surowicy', 'Prawidłowe (1,5–8,0 IU/l)', 'Wybitnie podwyższone (> 10–15 IU/l)'],
        ['Stężenie inhibiny B', 'Prawidłowe', 'Obniżone lub nieoznaczalne'],
        ['Fruktoza i pH w ejakulacie', 'Obniżone w aplazji nasieniowodów (CBAVD)', 'Prawidłowe'],
        ['Metoda pozyskania plemników', 'Aspiracja z najądrza (PESA/MESA) — 100% sukcesu', 'Mikrochirurgiczna biopsja jądra (micro-TESE) — 40–50%'],
      ],
    },
    advanced:
      'Mikrodelecje regionu AZF (Azoospermia Factor) na długim ramieniu chromosomu Y (Yq11) są drugą po zespole Klinefeltera genetyczną przyczyną NOA. Delecja regionu AZFa lub AZFb wiąże się z całkowitym brakiem komórek rozrodczych (Sertoli-cell-only) i zerową szansą na znalezienie plemników w biopsji TESE. Natomiast przy delecji AZFc szansa na pozyskanie plemników w micro-TESE wynosi ok. 50%, lecz męskie potomstwo odziedziczy niepłodność.',
    summary:
      'Ocena nasienia wg WHO 2021 to punkt wyjścia. Kluczowe jest różnicowanie OA (prawidłowe FSH/jądra, blokada mechaniczna) od NOA (wysokie FSH, defekt spermatogenezy). Wskazane badanie kariotypu i AZF.',
    sourceIds: ['who-semen-2021', 'eau-hypogonadism-2024', 'ptgip-nieplodnosc-2024'],
    questions: [
      q(
        'Jaka jest minimalna prawidłowa koncentracja plemników wg standardów WHO 2021?',
        ['16 mln plemników / ml', 'Wartość 5. percentyla populacji referencyjnej WHO 2021 wynosi 16 mln/ml.'],
        ['50 mln plemników / ml', '50 mln/ml to wysoka koncentracja, norma dolna jest znacznie niższa.'],
        ['2 mln plemników / ml', '2 mln/ml to ciężka krypto-/oligozoospermia.'],
      ),
      q(
        'Pacjent z azoospermią ma jądra o objętości 20 ml, FSH 3,2 IU/l i prawidłową inhibinę B. Jaka jest najbardziej prawdopodobna diagnoza?',
        ['Azoospermia obstrukcyjna (OA)', 'Prawidłowa objętość jąder i prawidłowe stężenie FSH świadczą o zachowanej spermatogenezie z mechaniczną przeszkodą.'],
        ['Zespół Klinefeltera z aplazją kanalików', 'W zespole Klinefeltera jądra są małe (<4 ml), a FSH wybitnie podwyższone.'],
        ['Mikrodelecja regionu AZFa z brakiem komórek rozrodczych', 'Delecja AZFa daje postać nieobstrukcyjną z podwyższonym FSH.'],
      ),
      q(
        'Wrodzony obustronny brak nasieniowodów (CBAVD) wiąże się najczęściej z mutacją w genie:',
        ['CFTR (gen mukowiscydozy)', 'Mutacje CFTR prowadzą do zaburzenia rozwoju przewodów Wolffa i braku nasieniowodów.'],
        ['AR (receptor androgenowy)', 'Mutacje receptora androgenowego powodują zespół feminizacji (CAIS/PAIS).'],
        ['KAL1 (anozmina 1)', 'Mutacja KAL1 powoduje zespół Kallmanna.'],
      ),
      q(
        'Który parametr nasienia jest szczególnie uszkadzany przez żylaki powrózka nasiennego (varicocele)?',
        ['Wzrost indeksu fragmentacji DNA plemników (DFI) w wyniku stresu oksydacyjnego', 'Hipertermia i zastój żylny prowadzą do uszkodzeń oksydacyjnych chromatyny plemnikowej.'],
        ['Wybiórcze obniżenie objętości ejakulatu poniżej 0,2 ml', 'Żylaki nie zaburzają objętości płynu nasiennego produkowanego przez pęcherzyki i prostatę.'],
        ['Wzrost pH nasienia powyżej 9,5', 'pH nasienia nie zmienia się drastycznie w varicocele.'],
      ),
      q(
        'Przy której mikrodelecji chromosomu Y szansa na odnalezienie plemników w micro-TESE jest praktycznie ZEROWA?',
        ['Całkowita delecja regionu AZFa lub AZFb', 'Delecja AZFa/b powoduje nieodwracalny brak komórek spermatogenezy (Sertoli cell only).'],
        ['Częściowa mikrodelecja regionu AZFc', 'W delecji AZFc szansa na pobranie plemników w TESE wynosi ok. 50%.'],
        ['Mikrodelecja w obrębie genu SRY', 'Gen SRY determinuje rozwój jądra na ramieniu krótkim, a nie spermatogenezę w AZF.'],
      ),
    ],
  },
  {
    id: 'gonady-doping-sterydy',
    title: 'Doping steroidami anabolicznymi (AAS) i zespół po-sterydowy',
    group: 'Andrologia i gonady męskie',
    readTime: '13 min',
    goals: [
      'Zrozumieć patomechanizm głębokiej supresji osi HPG przez suprafizjologiczne dawki androgenów.',
      'Rozpoznawać kliniczne i laboratoryjne wykładniki zespołu ASIH (AAS-induced hypogonadism).',
      'Poznać powikłania narządowe (sercowo-naczyniowe, wątrobowe, psychiczne) oraz protokoły odblokowania osi (PCT).',
    ],
    sections: [
      {
        title: 'Mechanizm supresji osi HPG przez sterydy anaboliczne',
        content:
          'Stosowanie suprafizjologicznych dawek testosteronu i jego syntetycznych pochodnych (np. nandrolon, trenbolon, stanozolol) wywiera potężne ujemne sprzężenie zwrotne na podwzgórze i przysadkę. Wydzielanie GnRH, LH i FSH zostaje zahamowane niemal do zera (< 0,1 IU/l). Pozbawione stymulacji komórki Leydiga i Sertolego przestają funkcjonować, co prowadzi do gwałtownego spadku wewnątrzjądrowego testosteronu, atrofii jąder i całkowitej azoospermii w ciągu kilku tygodni.',
      },
      {
        title: 'Zespół po-sterydowego hipogonadyzmu (ASIH)',
        content:
          'Po nagłym odstawieniu AAS pacjent wpada w stan ciężkiego hipogonadyzmu: stężenie egzogennego leku spada, a własna oś podwzgórze-przysadka-gonady pozostaje zablokowana przez wiele miesięcy lub nawet lat. Stan ten nazywamy ASIH (Anabolic Steroid-Induced Hypogonadism). Objawia się skrajnym załamaniem nastroju, ciężką depresją (ryzyko samobójcze), utratą libido, impotencją, utratą masy mięśniowej i przewlekłym zmęczeniem. W badaniach laboratoryjnych: LH < 0,5 IU/l, FSH < 0,5 IU/l, testosteron całkowity w granicach kastracyjnych (< 50 ng/dl).',
      },
      {
        title: 'Powikłania narządowe i terapia odblokowująca (PCT)',
        content:
          'Doping AAS wiąże się z groźnymi powikłaniami narządowymi: kardiomiopatią przerostową z dysfunkcją rozkurczową, miażdżycą naczyń wieńcowych (drastyczny spadek HDL < 15 mg/dl, wzrost LDL), peliosis hepatis i gruczolakami wątroby (przy sterydach 17-alfa-alkilowanych), policytemią i ginekomastią. W leczeniu ASIH stosuje się protokoły stymulacji osi: gonadotropinę kosmówkową (hCG) w celu przywrócenia masy komórek Leydiga, a następnie SERM (tamoksyfen, klomifen) w celu odblokowania receptorów estrogenowych w przysadce i stymulacji endogennego wydzielania LH i FSH.',
      },
    ],
    table: {
      caption: 'Wpływ dopingu AAS na parametry laboratoryjne i narządowe',
      headers: ['Układ / Parametr', 'W trakcie przyjmowania cyklu AAS', 'Po nagłym odstawieniu (faza ASIH)'],
      rows: [
        ['Gonadotropiny (LH / FSH)', 'Całkowita supresja (< 0,1 IU/l)', 'Przetrwale obniżone lub powoli rosnące'],
        ['Testosteron w surowicy', 'Suprafizjologiczny (często > 2000 ng/dl)', 'Poziomy kastracyjne (< 50–100 ng/dl)'],
        ['Hematokryt (Hct)', 'Podwyższony (często > 52–56%)', 'Stopniowa normalizacja'],
        ['Profil lipidowy', 'Spadek HDL (< 15 mg/dl), wzrost LDL', 'Powolna regeneracja w ciągu 3–6 miesięcy'],
        ['Morfologia jąder', 'Atrofia, zmniejszenie objętości', 'Utrzymująca się atrofia do czasu odzyskania LH'],
      ],
    },
    advanced:
      'Nandrolon i trenbolon wykazują silne powinowactwo nie tylko do receptora androgenowego, ale również do receptora progesteronowego (PR). Ich metabolity (np. 19-norandrostendion) mogą utrzymywać się w tkance tłuszczowej i hamować oś HPG nawet przez 12–18 miesięcy po zakończeniu iniekcji.',
    summary:
      'Suprafizjologiczne dawki AAS całkowicie blokują oś HPG (LH/FSH < 0,1), prowadząc do atrofii jąder i azoospermii. Nagłe odstawienie wywołuje zespół ASIH z depresją i impotencją, wymagający protokołów PCT (hCG, SERM).',
    sourceIds: ['eau-hypogonadism-2024', 'endo-testosterone-2018'],
    questions: [
      q(
        'Jaki profil hormonalny stwierdza się u kulturysty w trakcie intensywnego cyklu z użyciem sterydów anabolicznych?',
        ['Wybitnie podwyższony testosteron przy całkowicie niewykrywalnych LH i FSH (< 0,1 IU/l)', 'Silne ujemne sprzężenie zwrotne całkowicie wygasza wydzielanie gonadotropin.'],
        ['Wysoki testosteron z równoczesnym podwyższeniem LH i FSH powyżej normy', 'To obraz zespołu niewrażliwości na androgeny lub guza przysadki, a nie dopingu.'],
        ['Niski testosteron, niskie LH, ale wybitnie wysokie stężenie inhibiny B', 'Inhibina B ulega supresji wraz z zahamowaniem spermatogenezy.'],
      ),
      q(
        'Dlaczego u mężczyzn stosujących sterydy anaboliczne często rozwija się ginekomastia?',
        ['Część egzogennych androgenów ulega masywnej aromatyzacji do estradiolu przez CYP19A1', 'Suprafizjologiczne stężenia substratu generują wysokie stężenia estrogenów.'],
        ['AAS niszczą całkowicie tkankę tłuszczową gruczołu piersiowego', 'Ginekomastia to rozrost tkanki gruczołowej pod wpływem estrogenów.'],
        ['AAS wybiórczo stymulują receptor TSH w tarczycy', 'Hormony tarczycy nie odpowiadają bezpośrednio za rozrost gruczołów piersiowych.'],
      ),
      q(
        'Na czym polega terapia odblokowująca (PCT — Post Cycle Therapy) po odstawieniu AAS?',
        ['Podawanie hCG w celu stymulacji komórek Leydiga, a następnie SERM (tamoksyfen/klomifen)', 'hCG regeneruje jądra, a SERM odblokowuje ujemne sprzężenie zwrotne w przysadce.'],
        ['Podawanie dużych dawek progesteronu w celu wywołania krwawienia z odstawienia', 'Progesteron nasiliłby supresję osi u mężczyzny.'],
        ['Zastosowanie radiojodu w celu zniszczenia ektopowej tkanki androgenowej', 'Radiojod niszczy tarczycę, nie ma zastosowania w andrologii.'],
      ),
      q(
        'Jaki groźny wpływ wywierają sterydy anaboliczno-androgenne (zwłaszcza doustne) na profil lipidowy?',
        ['Drastyczny spadek frakcji HDL (często < 15 mg/dl) i wzrost LDL', 'Stymulacja lipazy wątrobowej powoduje gwałtowny spadek ochronnego cholesterolu HDL.'],
        ['Podwyższenie stężenia HDL powyżej 100 mg/dl przy zerowym LDL', 'AAS działają wybitnie proaterogennie, niszcząc frakcję HDL.'],
        ['Całkowite zablokowanie wchłaniania tłuszczów w przewodzie pokarmowym', 'AAS nie wpływają na wchłanianie lipidów w jelicie.'],
      ),
      q(
        'Co to jest zespół ASIH (Anabolic Steroid-Induced Hypogonadism)?',
        ['Przetrwały, głęboki hipogonadyzm hipogonadotropowy po zaprzestaniu stosowania AAS', 'Brak powrotu funkcji osi HPG po odstawieniu sterydów z objawami depresji i impotencji.'],
        ['Ostra hiperglikemiczna kwasica ketonowa wywołana sterydami', 'To powikłanie cukrzycy (DKA), a nie zespołu po-sterydowego.'],
        ['Przerost prostaty wymagający natychmiastowej prostatektomii', 'ASIH dotyczy niedoczynności osi gonadalnej, a nie samego BPH.'],
      ),
    ],
  },
  {
    id: 'gonady-pcos',
    title: 'Zespół policystycznych jajników (PCOS) i zaburzenia metaboliczne',
    group: 'Ginekologia endokrynologiczna',
    readTime: '13 min',
    goals: [
      'Opanować zrewidowane kryteria rotterdamskie (2003/2023) rozpoznania PCOS i fenotypy A–D.',
      'Zrozumieć sprzężenie hiperinsulinizmu z nadprodukcją androgenów w komórkach theca jajnika.',
      'Wdrożyć postępowanie terapeutyczne: styl życia, antykoncepcję złożoną, metforminę i inozytol.',
    ],
    sections: [
      {
        title: 'Kryteria rotterdamskie i fenotypy PCOS',
        content:
          'Zgodnie z międzynarodowymi wytycznymi (2023), rozpoznanie PCOS wymaga spełnienia co najmniej 2 z 3 kryteriów rotterdamskich (po wykluczeniu innych chorób: WPN, hiperprolaktynemii, niedoczynności tarczycy, zespołu Cushinga): 1. Objawy kliniczne lub biochemiczne hiperandrogenizmu; 2. Rzadkie owulacje lub brak owulacji (oligo-/anovulatio); 3. Obraz policystycznych jajników w USG (PCOM: >= 20 pęcherzyków o średnicy 2–9 mm w jajniku lub objętość jajnika >= 10 ml) lub wysokie stężenie AMH. Wyróżnia się 4 fenotypy: A (pełny: 1+2+3), B (hiperandrogenny z anowulacją: 1+2), C (owulacyjny: 1+3) oraz D (bez hiperandrogenizmu: 2+3).',
      },
      {
        title: 'Patogeneza: hiperinsulinizm a komórki osłonki',
        content:
          'Kluczowym ogniwem patofizjologicznym u większości pacjentek jest obwodowa insulinooporność i kompensacyjny hiperinsulinizm. Insulina działa bezpośrednio na komórki theca jajnika synergistycznie z LH, stymulując ekspresję enzymu CYP17A1 i nasilając syntezę androstenedionu i testosteronu. Jednocześnie insulina hamuje wątrobową produkcję SHBG, co dramatycznie podwyższa stężenie biologicznie aktywnego wolnego testosteronu. Hiperandrogenizm wewnątrzjajnikowy zatrzymuje dojrzewanie pęcherzyków na etapie małych pęcherzyków antralnych, uniemożliwiając selekcję pęcherzyka dominującego.',
      },
      {
        title: 'Kompleksowe leczenie PCOS',
        content:
          'Leczeniem pierwszego rzutu zaburzeń miesiączkowania i hirsutyzmu u kobiet nieplanujących ciąży jest złożona antykoncepcja hormonalna (COC) zawierająca progestagen o działaniu antyandrogennym (np. drospirenon, dienogest, octan cyproteronu). Estrogeny w COC podnoszą SHBG, obniżając wolny testosteron. W zaburzeniach metabolicznych i insulinooporności kluczowa jest redukcja masy ciała, metformina oraz mio-inozytol (zwiększający wrażliwość na insulinę). W indukcji owulacji lekiem pierwszego rzutu jest inhibitor aromatazy — letrozol (przewyższający skutecznością klomifen).',
      },
    ],
    table: {
      caption: 'Fenotypy zespołu policystycznych jajników wg kryteriów rotterdamskich',
      headers: ['Fenotyp', 'Hiperandrogenizm', 'Zaburzenia owulacji', 'Obraz PCOM w USG / wysokie AMH', 'Profil metaboliczny'],
      rows: [
        ['Fenotyp A (pełny)', 'Obecny (kliniczny/biochem.)', 'Obecne (oligo/amenorrhea)', 'Obecny', 'Najcięższa insulinooporność, wysokie ryzyko T2D'],
        ['Fenotyp B (klasyczny)', 'Obecny', 'Obecne', 'Brak cech PCOM w USG', 'Wysokie ryzyko metaboliczne'],
        ['Fenotyp C (owulacyjny)', 'Obecny', 'Brak (regularne owulacje)', 'Obecny', 'Umiarkowane ryzyko metaboliczne'],
        ['Fenotyp D (nieandrogenny)', 'Brak', 'Obecne', 'Obecny', 'Najłagodniejszy fenotyp, często szczupłe pacjentki'],
      ],
    },
    advanced:
      'Stosunek stężenia LH do FSH oznaczany w 2.–4. dniu cyklu w klasycznym PCOS często przekracza 2:1 lub 3:1. Nie jest on jednak kryterium rozpoznania, lecz odzwierciedla przyspieszoną pulsację GnRH faworyzującą transkrypcję podjednostki beta LH w przednim płacie przysadki.',
    summary:
      'PCOS wymaga 2 z 3 kryteriów: hiperandrogenizm, anowulacja, PCOM w USG/AMH. Hiperinsulinizm nasila syntezę androgenów jajnikowych i obniża SHBG. W terapii stosuje się COC, metforminę, a w indukcji owulacji letrozol.',
    sourceIds: ['pcos-guideline-2023', 'eshre-art-ohss-2024'],
    questions: [
      q(
        'Ile kryteriów rotterdamskich musi spełniać pacjentka, aby rozpoznać PCOS (po wykluczeniu innych chorób)?',
        ['Co najmniej 2 z 3 kryteriów (hiperandrogenizm, rzadkie owulacje, PCOM w USG/AMH)', 'Definicja rotterdamska opiera się na spełnieniu minimum 2 z 3 warunków.'],
        ['Wszystkie 3 kryteria muszą być bezwzględnie obecne u każdej pacjentki', 'Wymóg wszystkich 3 cech dotyczy tylko fenotypu A, pomijając fenotypy B, C i D.'],
        ['Wystarczy wyłącznie izolowany obraz drobnotorbielowatych jajników w USG', 'Sam obraz PCOM w USG występuje u 20% zdrowych kobiet i nie pozwala na rozpoznanie PCOS.'],
      ),
      q(
        'W jaki sposób hiperinsulinizm nasila hiperandrogenizm w przebiegu PCOS?',
        ['Stymuluje komórki theca do syntezy androgenów i równocześnie hamuje wątrobową produkcję SHBG', 'Podwójny efekt: wzrost produkcji androgenów jajnikowych i wzrost frakcji wolnej.'],
        ['Powoduje zniszczenie aromatazy w jajnikach i całkowite zablokowanie syntezy estrogenów', 'Aromataza w komórkach ziarnistych jest aktywna, lecz brakuje stymulacji FSH.'],
        ['Pobudza przysadkę do wybiórczego wydzielania TSH i prolaktyny', 'Insulina nie działa pierwotnie przez stymulację TSH.'],
      ),
      q(
        'Jaki lek jest obecnie rekomendowany jako PIERWSZY RZUT w indukcji owulacji u kobiet z PCOS planujących ciążę?',
        ['Letrozol (inhibitor aromatazy)', 'Wytyczne międzynarodowe 2023 uznają letrozol za lek I rzutu przewyższający klomifen.'],
        ['Cytrynian klomifenu w skojarzeniu z deksametazonem', 'Klomifen jest obecnie lekiem drugiego wyboru z uwagi na niższy odsetek żywych urodzeń.'],
        ['Octan cyproteronu w dawce 50 mg na dobę', 'Octan cyproteronu działa antykoncepcyjnie i teratogennie na płód męski.'],
      ),
      q(
        'Czym charakteryzuje się fenotyp D zespołu policystycznych jajników?',
        ['Obecnością zaburzeń owulacji i obrazu PCOM bez cech hiperandrogenizmu', 'Fenotyp D to postać bez hiperandrogenizmu klinicznego ani biochemicznego.'],
        ['Obecnością ciężkiego hirsutyzmu przy idealnie regularnych owulacjach', 'To opis fenotypu C (owulacyjnego).'],
        ['Wyłącznie otyłością olbrzymią bez jakichkolwiek zaburzeń hormonalnych', 'PCOS wymaga zaburzeń osi gonadalnej lub morfologii jajnika.'],
      ),
      q(
        'Jaki progestagen w złożonej tabletce antykoncepcyjnej (COC) jest szczególnie korzystny u pacjentki z PCOS i trądzikiem?',
        ['Drospirenon lub octan cyproteronu (działanie antyandrogenne)', 'Blokują receptor androgenowy i zmniejszają konwersję do DHT w mieszkach włosowych.'],
        ['Lewonorgestrel w wysokiej dawce', 'Lewonorgestrel ma profil proandrogenny i może nasilać trądzik.'],
        ['Octan medroksyprogesteronu domięśniowo', 'Nie jest składową doustnej antykoncepcji dwuskładnikowej.'],
      ),
    ],
  },
  {
    id: 'gonady-hiperandrogenizm-kobiecy',
    title: 'Hirsutyzm, wirylizacja i diagnostyka różnicowa hiperandrogenizmu',
    group: 'Ginekologia endokrynologiczna',
    readTime: '13 min',
    goals: [
      'Oceniać nasilenie hirsutyzmu w skali Ferrimana-Gallweya i odróżniać go od hipertrichozy.',
      'Przeprowadzić diagnostykę różnicową: PCOS vs nieklasyczny WPN (NCCAH) vs guz wirylizujący.',
      'Rozpoznawać kliniczne objawy wirylizacji wymagające pilnej diagnostyki obrazowej.',
    ],
    sections: [
      {
        title: 'Hirsutyzm a hipertrichoza i skala Ferrimana-Gallweya',
        content:
          'Hirsutyzm to nadmierny wzrost grubych, pigmentowanych włosów końcowych (terminalnych) u kobiet w rejonach androgenozależnych (warga górna, broda, klatka piersiowa, linia biała brzucha, plecy, pośladki, wewnętrzne powierzchnie ud). Od hirsutyzmu należy odróżnić hipertrichozę, która jest uogólnionym rozrostem cienkich włosów meszkowych (vellus) w miejscach nieandrogenozależnych (np. przedramiona, podudzia) i wynika z uwarunkowań etnicznych, leków (cyklosporyna, minoksydyl) lub niedożywienia. Nasilenie hirsutyzmu ocenia się w zmodyfikowanej skali Ferrimana-Gallweya (mFG) — wynik >= 4–8 pkt (zależnie od populacji) wskazuje na hirsutyzm.',
      },
      {
        title: 'Objawy wirylizacji — czerwone flagi kliniczne',
        content:
          'Wirylizacja oznacza wystąpienie cech męskich w wyniku skrajnie wysokiego stężenia androgenów. Obejmuje: łysienie skroniowe i androgenowe typu męskiego, obniżenie barwy głosu (nieodwracalne pogrubienie strun głosowych), przerost łechtaczki (klitoromegalia — szerokość żołędzi łechtaczki > 5 mm lub indeks > 35 mm^2), zanik piersi, rozwój męskiej sylwetki mięśniowej oraz nasilenie popędu płciowego. Wystąpienie objawów wirylizacji lub gwałtowny rozwój hirsutyzmu w ciągu kilku miesięcy budzi bezwzględne podejrzenie guza wydzielającego androgeny.',
      },
      {
        title: 'Algorytm diagnostyki różnicowej',
        content:
          'W diagnostyce laboratoryjnej oznacza się: testosteron całkowity, DHEA-S (siarczan dehydroepiandrosteronu — marker nadnerczowy) oraz 17-hydroksyprogesteron (17-OHP) rano w fazie folikularnej. Testosteron > 150–200 ng/dl sugeruje guza jajnika (np. arrhenoblastoma / guz z komórek Sertolego-Leydiga) lub nadnerczy. DHEA-S > 700–800 mcg/dl wskazuje na raka kory nadnerczy (ACC). Stężenie 17-OHP na czczo > 2 ng/ml wymaga testu stymulacji tetrakozaktydem (Synacthen 250 mcg) w celu wykluczenia nieklasycznego wrodzonego przerostu nadnerczy (NCCAH z niedoborem 21-hydroksylazy, gdzie 17-OHP po stymulacji przekracza 10 ng/ml).',
      },
    ],
    table: {
      caption: 'Diagnostyka różnicowa hiperandrogenizmu u kobiet',
      headers: ['Jednostka chorobowa', 'Stężenie testosteronu', 'Stężenie DHEA-S', 'Stężenie 17-OHP', 'Cechy kliniczne'],
      rows: [
        ['PCOS', 'Umiarkowanie podwyższony (< 150 ng/dl)', 'Prawidłowy lub lekko podwyższony', 'Prawidłowy (< 2 ng/ml)', 'Początek w pokwitaniu, anowulacja, powolny przebieg'],
        ['Nieklasyczny WPN (NCCAH)', 'Umiarkowanie podwyższony', 'Prawidłowy lub podwyższony', 'Wysoki (> 2 ng/ml, po Synacthenie > 10)', 'Autosomalnie recesywny, mutacja CYP21A2'],
        ['Guz jajnika (Sertoli-Leydig)', 'Bardzo wysoki (> 150–200 ng/dl)', 'Prawidłowy', 'Prawidłowy', 'Nagły początek, szybka wirylizacja, guz w USG'],
        ['Rak kory nadnerczy (ACC)', 'Wybitnie wysoki', 'Ekstremalnie wysoki (> 700–800 mcg/dl)', 'Często podwyższony', 'Szybka progresja, objawy Cushinga, guz w TK'],
      ],
    },
    advanced:
      'W różnicowaniu źródła hiperandrogenizmu pomocne jest badanie obrazowe: przezpochwowe USG z opcją Doppler (ocena unaczynienia jajników) oraz tomografia komputerowa nadnerczy. W trudnych przypadkach małych guzów wirylizujących (np. leydigoma o średnicy <1 cm ukryta w zrębie jajnika) wykonuje się cewnikowanie żył jajnikowych i nadnerczowych z gradientem stężeń androgenów.',
    summary:
      'Hirsutyzm ocenia się w skali Ferrimana-Gallweya. Nagła wirylizacja (klitoromegalia, obniżenie głosu) oraz testosteron > 150 ng/dl lub DHEA-S > 700 mcg/dl wymagają pilnego wykluczenia guza nowotworowego.',
    sourceIds: ['pcos-guideline-2023', 'eau-hypogonadism-2024'],
    questions: [
      q(
        'Który objaw kliniczny świadczy o WIRYLIZACJI (a nie jedynie o izolowanym hirsutyzmie)?',
        ['Przerost łechtaczki (klitoromegalia) i nieodwracalne obniżenie głosu', 'Wirylizacja to zespół cech maskulinizacji w narządach płciowych i krtani.'],
        ['Występowanie pojedynczych włosów terminalnych na brodzie', 'Pojedyncze włosy to łagodny hirsutyzm w skali mFG.'],
        ['Uogólniony wzrost cienkich włosów meszkowych na przedramionach', 'To hipertrichoza, zjawisko niezależne od androgenów.'],
      ),
      q(
        'U 30-letniej kobiety stwierdzono nagłe pojawienie się hirsutyzmu w ciągu 4 miesięcy, klitoromegalię i testosteron 280 ng/dl. Co należy podejrzewać w pierwszej kolejności?',
        ['Guz jajnika wydzielający androgeny (np. guz z komórek Sertolego-Leydiga)', 'Stężenie testosteronu > 150–200 ng/dl z szybką wirylizacją wskazuje na nowotwór jajnika.'],
        ['Łagodny, stabilny zespół policystycznych jajników (PCOS)', 'W PCOS testosteron rzadko przekracza 150 ng/dl, a przebieg jest powolny.'],
        ['Niedoczynność tarczycy w przebiegu choroby Hashimoto', 'Niedoczynność tarczycy nie wywołuje ostrej wirylizacji i testosteronu 280 ng/dl.'],
      ),
      q(
        'Jaki wynik stężenia 17-hydroksyprogesteronu (17-OHP) w teście stymulacji tetrakozaktydem (Synacthen) potwierdza nieklasyczny WPN (NCCAH)?',
        ['Wzrost stężenia 17-OHP powyżej 10 ng/ml (30 nmol/l)', 'Jest to złoty standard diagnostyczny bloku enzymatycznego 21-hydroksylazy.'],
        ['Całkowity spadek stężenia 17-OHP poniżej granicy oznaczalności', 'Stymulacja ACTH w NCCAH powoduje masywny wyrzut prekursora przed blokiem.'],
        ['Izolowany wzrost kortyzolu bez zmiany 17-OHP', 'To prawidłowa odpowiedź kory nadnerczy wykluczająca WPN.'],
      ),
      q(
        'Ekstremalnie wysokie stężenie DHEA-S (> 700–800 mcg/dl) u pacjentki z hiperandrogenizmem wskazuje na patologię zlokalizowaną w:',
        ['Korce nadnerczy (np. guz lub rak kory nadnerczy ACC)', 'DHEA-S jest syntetyzowany niemal w 100% w warstwie siatkowatej kory nadnerczy.'],
        ['Pęcherzykach jajnikowych Graafa', 'Jajniki syntetyzują głównie androstenedion i testosteron, a nie DHEA-S.'],
        ['Przednim płacie przysadki mózgowej', 'Przysadka wydziela ACTH, a nie steroidy androgenne DHEA-S.'],
      ),
      q(
        'Jaka skala punktowa jest międzynarodowym standardem oceny nasilenia hirsutyzmu w 9 obszarach ciała?',
        ['Zmodyfikowana skala Ferrimana-Gallweya (mFG)', 'Ocenia owłosienie terminalne w 9 androgenozależnych okolicach w skali 0–4 pkt.'],
        ['Skala Tannera', 'Skala Tannera służy do oceny etapów dojrzewania płciowego, a nie hirsutyzmu.'],
        ['Skala Gleasona', 'Skala Gleasona służy do histopatologicznej oceny stopnia złośliwości raka prostaty.'],
      ),
    ],
  },
  {
    id: 'gonady-brak-miesiaczki',
    title: 'Zaburzenia miesiączkowania i brak krwawień (amenorrhea)',
    group: 'Ginekologia endokrynologiczna',
    readTime: '13 min',
    goals: [
      'Znać definicję i kryteria różnicowania pierwotnego i wtórnego braku miesiączki.',
      'Zrozumieć patofizjologię czynnościowego podwzgórzowego braku miesiączki (FHA) i triady sportsmenek.',
      'Prawidłowo interpretować próbę progestagenową i estrogenowo-progestagenową w algorytmie diagnostycznym.',
    ],
    sections: [
      {
        title: 'Definicje: pierwotny vs wtórny brak miesiączki',
        content:
          'Pierwotny brak miesiączki definiuje się jako: brak pierwszej miesiączki (menarche) do 15. roku życia przy obecności prawidłowych wtórnych cech płciowych (rozwój piersi) LUB brak miesiączki do 13. roku życia przy całkowitym braku cech dojrzewania płciowego. Wtórny brak miesiączki to zatrzymanie krwawień na okres >= 3 miesięcy u kobiet wcześniej regularnie miesiączkujących lub na >= 6 miesięcy przy cyklach nieregularnych. Pierwszym krokiem u każdej kobiety w wieku rozrodczym jest bezwzględne wykluczenie ciąży (test beta-hCG).',
      },
      {
        title: 'Czynnościowy podwzgórzowy brak miesiączki (FHA)',
        content:
          'FHA (Functional Hypothalamic Amenorrhea) jest jedną z najczęstszych przyczyn wtórnego braku miesiączki. Wynika z zaburzenia pulsacji GnRH pod wpływem przewlekłego deficytu energii (restrykcyjne diety, zaburzenia odżywiania — anoreksja), nadmiernego wysiłku fizycznego (triada sportsmenek: niedobór energii, brak miesiączki, osteoporoza) oraz stresu psychicznego. W badaniach: niskie lub nisko-prawidłowe stężenia LH i FSH, skrajnie niski estradiol (< 20–30 pg/ml), podwyższony kortyzol i obniżone stężenie leptyny.',
      },
      {
        title: 'Próby hormonalne: progestagenowa i estrogenowo-progestagenowa',
        content:
          'Próba progestagenowa (podanie progestagenu, np. dydrogesteronu 10 mg lub medroksyprogesteronu przez 10 dni) ocenia stopień estrogenizacji endometrium. Wystąpienie krwawienia z odstawienia w ciągu 2–7 dni (próba dodatnia) dowodzi, że endometrium było pobudzone przez endogenne estrogeny i drogi odpływu są drożne (najczęściej PCOS lub łagodny brak owulacji). Brak krwawienia (próba ujemna) wymaga wykonania próby estrogenowo-progestagenowej (estrogeny przez 21 dni + progestagen przez ostatnie 10 dni). Brak krwawienia po pełnej próbie potwierdza defekt anatomiczny macicy (np. zespół Ashermana — zrosty wewnątrzmaciczne po łyżeczkowaniu). Wystąpienie krwawienia wskazuje na ciężką hipoestrogenemię (FHA lub niewydolność jajników POI).',
      },
    ],
    table: {
      caption: 'Interpretacja prób czynnościowych w diagnostyce braku miesiączki',
      headers: ['Próba hormonalna', 'Wynik krwawienia', 'Interpretacja patofizjologiczna', 'Lokalizacja defektu'],
      rows: [
        ['Próba progestagenowa', 'Dodatnia (krwawienie wystąpiło)', 'Prawidłowa estrogenizacja endometrium, brak owulacji', 'Oś jajnikowa zachowana, problem z wyrzutem LH (np. PCOS)'],
        ['Próba progestagenowa', 'Ujemna (brak krwawienia)', 'Niedobór estrogenów LUB przeszkoda anatomiczna', 'Wymaga próby estrogenowo-progestagenowej'],
        ['Próba E2 + progestagen', 'Dodatnia (krwawienie wystąpiło)', 'Drogi odpływu i endometrium sprawne, ciężka hipoestrogenemia', 'Podwzgórze (FHA), przysadka lub jajniki (POI)'],
        ['Próba E2 + progestagen', 'Ujemna (brak krwawienia)', 'Zarośnięcie jamy macicy lub brak dróg odpływu', 'Zespół Ashermana, zarośnięcie szyjki macicy'],
      ],
    },
    advanced:
      'Po potwierdzeniu hipoestrogenemii (dodatnia próba E+P po ujemnej próbie P) decydujący jest poziom FSH. Podwyższone stężenie FSH (> 25–40 IU/l) lokalizuje uszkodzenie w jajnikach (przedwczesna niewydolność jajników POI, dysgenezja gonad w zespole Turnera). Niskie lub prawidłowe stężenie FSH wskazuje na przyczynę podwzgórzowo-przysadkową (FHA, guz siodła tureckiego, panhypopituitarismus).',
    summary:
      'Wykluczenie ciąży to krok zerowy. Próba progestagenowa weryfikuje estrogenizację. Próba E+P różnicuje zrosty macicy (Asherman) od hipoestrogenemii, a stężenie FSH rozstrzyga między FHA a pierwotną niewydolnością jajników (POI).',
    sourceIds: ['eshre-poi-2024', 'pcos-guideline-2023'],
    questions: [
      q(
        'Jaki jest PIERWSZY, bezwzględny krok diagnostyczny u każdej kobiety w wieku rozrodczym zgłaszającej brak miesiączki?',
        ['Wykonanie testu ciążowego (oznaczenie beta-hCG)', 'Ciąża jest najczęstszą fizjologiczną przyczyną wtórnego braku miesiączki.'],
        ['Natychmiastowe wykonanie rezonansu magnetycznego przysadki mózgowej', 'Badania obrazowe wdraża się po wykluczeniu ciąży i wstępnej ocenie hormonalnej.'],
        ['Wdrożenie wysokich dawek estrogenów w iniekcjach domięśniowych', 'Leczenia nie wolno wdrażać przed potwierdzeniem braku ciąży i rozpoznaniem.'],
      ),
      q(
        'Co oznacza DODATNIA próba progestagenowa (wystąpienie krwawienia po odstawieniu progestagenu)?',
        ['Błona śluzowa macicy była prawidłowo pobudzona przez estrogeny, a drogi odpływu są drożne', 'Krwawienie z odstawienia potwierdza obecność fazy proliferacyjnej endometrium.'],
        ['Pacjentka ma ciężką, zaawansowaną hipoestrogenemię z zanikiem endometrium', 'Gdyby endometrium było zanikłe, krwawienie by nie wystąpiło.'],
        ['Doszło do zarośnięcia jamy macicy w przebiegu zespołu Ashermana', 'W zespole Ashermana próba jest ujemna z powodu zrostów mechanicznych.'],
      ),
      q(
        'U 20-letniej biegaczki z BMI 17,2 stwierdzono wtórny brak miesiączki, FSH 2,1 IU/l i estradiol 18 pg/ml. Jaka jest przyczyna?',
        ['Czynnościowy podwzgórzowy brak miesiączki (FHA) w wyniku deficytu energii', 'Niski estradiol i niskie FSH w odpowiedzi na niedożywienie i wysiłek to klasyczny obraz FHA.'],
        ['Pierwotna przedwczesna niewydolność jajników (POI)', 'W POI stężenie FSH byłoby wybitnie podwyższone z powodu braku inhibin i estrogenów.'],
        ['Guz komórek ziarnistych jajnika wydzielający estradiol', 'Guz granulosa powoduje hiperestrogenizm (>300 pg/ml), a nie hipoestrogenemię.'],
      ),
      q(
        'Brak krwawienia po pełnej próbie estrogenowo-progestagenowej wskazuje na:',
        ['Anatomiczny defekt narządu rodnego (np. zespół Ashermana z zarośnięciem jamy macicy)', 'Nawet silna stymulacja hormonalna nie wywoła krwawienia przy zrośniętej jamie macicy.'],
        ['Zaburzenie wydzielania kisspeptyny w podwzgórzu', 'Przy defekcie podwzgórza egzogenne hormony wywołałyby prawidłowe krwawienie z odstawienia.'],
        ['Mikrogruczolaka przysadki wydzielającego prolaktynę', 'W hiperprolaktynemii próba E+P jest dodatnia (krwawienie występuje).'],
      ),
      q(
        'Który parametr laboratoryjny pozwala jednoznacznie odróżnić FHA od przedwczesnej niewydolności jajników (POI)?',
        ['Stężenie folitropiny (FSH) w surowicy', 'W POI stężenie FSH jest wysokie (>25 IU/l), a w FHA niskie lub nieadekwatnie prawidłowe.'],
        ['Stężenie prolaktyny po podaniu metoklopramidu', 'Test z metoklopramidem nie różnicuje pierwotnej i wtórnej niewydolności gonad.'],
        ['Stężenie sodu i potasu w surowicy', 'Elektrolity nie służą do różnicowania osi gonadalnej.'],
      ),
    ],
  },
];
