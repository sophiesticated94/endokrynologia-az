import { type DraftLesson, q } from './course-types.ts';

export const draftGonadsPart1: DraftLesson[] = [
  {
    id: 'gonady-fizjologia-hpg',
    title: 'Oś podwzgórze–przysadka–gonady i generator pulsacyjny',
    group: 'Fundamenty i diagnostyka',
    readTime: '12 min',
    goals: [
      'Zrozumieć pulsacyjną naturę wydzielania GnRH przez neurony KNDy podwzgórza i rolę kisspeptyny.',
      'Poznać mechanizmy różnicowego wydzielania LH i FSH w odpowiedzi na częstość impulsów.',
      'Scharakteryzować pętle sprzężeń zwrotnych testosteronu, estradiolu, inhibiny B i AMH.',
    ],
    sections: [
      {
        title: 'Generator pulsacyjny GnRH i rola neuronów KNDy',
        content:
          'Kluczem do prawidłowego funkcjonowania osi HPG jest pulsacyjne uwalnianie gonadoliberyny (GnRH) z podwzgórza. Generator impulsów tworzą neurony KNDy (wydzielające kisspeptynę, neurokininę B i dynorfinę) w jądrze łukowatym. Ciągły (stały) wlew GnRH prowadzi do paradoksalnej desensytyzacji i internalizacji receptorów GnRH w przysadce, całkowicie wygaszając wydzielanie gonadotropin (zjawisko to wykorzystuje się farmakologicznie w terapii analogami GnRH w raku prostaty, endometriozie i centralnym przedwczesnym dojrzewaniu).',
      },
      {
        title: 'Różnicowe wydzielanie LH i FSH',
        content:
          'Częstotliwość pulsacji GnRH decyduje o profilu syntezy podjednostek beta gonadotropin. Wysoka częstotliwość impulsów (co 60–90 min) faworyzuje transkrypcję i wydzielanie lutropiny (LH), natomiast niska częstotliwość (co 120–180 min) stymuluje wydzielanie folitropiny (FSH). U mężczyzn LH stymuluje komórki Leydiga do syntezy testosteronu, a FSH pobudza komórki Sertolego do wspierania spermatogenezy i wydzielania inhibiny B. U kobiet LH stymuluje komórki osłonki (theca) do syntezy androgenów, a FSH pobudza komórki ziarniste (granulosa) do ich aromatyzacji w estradiol.',
      },
      {
        title: 'Ujemne i dodatnie sprzężenie zwrotne',
        content:
          'Testosteron i estradiol hamują wydzielanie GnRH na poziomie podwzgórza oraz LH na poziomie przysadki. Wyjątkowym zjawiskiem biologicznym jest dodatnie sprzężenie zwrotne estradiolu u kobiet w fazie przedowulacyjnej: wysokie stężenie estradiolu (>200 pg/ml przez ponad 36–48 godzin) przestawia oś na pobudzenie, wyzwalając masywny przedowulacyjny wyrzut LH niezbędny do pęknięcia pęcherzyka Graafa.',
      },
    ],
    table: {
      caption: 'Elementy osi HPG u mężczyzn i kobiet',
      headers: ['Poziom osi', 'Główny hormon', 'Komórka docelowa', 'Efekt fizjologiczny'],
      rows: [
        ['Podwzgórze', 'GnRH (pulsacyjny)', 'Gonadotropy przysadki', 'Stymulacja syntezy podjednostek LH i FSH'],
        ['Przysadka (LH)', 'Lutropina (LH)', 'Komórki Leydiga / komórki theca', 'Synteza testosteronu i androstenedionu'],
        ['Przysadka (FSH)', 'Folitropina (FSH)', 'Komórki Sertolego / ziarniste', 'Spermatogeneza, aromatyzacja do estradiolu, inhibina B'],
        ['Gonady', 'Inhibina B / AMH', 'Gonadotropy przysadki', 'Wybiórcza supresja wydzielania FSH'],
      ],
    },
    advanced:
      'Hormon antymüllerowski (AMH) jest wydzielany przez komórki ziarniste pęcherzyków preantralnych i małych antralnych (2–8 mm). Jego stężenie nie podlega istotnym wahaniom w cyklu miesiączkowym, co czyni go najlepszym markerem rezerwy jajnikowej. U mężczyzn AMH i inhibina B odzwierciedlają masę i dojrzałość komórek Sertolego.',
    summary:
      'Pulsacyjny charakter wydzielania GnRH jest niezbędny dla utrzymania funkcji gonadotropin. Ciągła ekspozycja wygasza oś. Sprzężenia ujemne regulują homeostazę, a wyrzut LH u kobiet wymaga unikalnego przełączenia w sprzężenie dodatnie.',
    sourceIds: ['eau-hypogonadism-2024', 'pcos-guideline-2023'],
    questions: [
      q(
        'Co dzieje się z osią HPG w przypadku ciągłego, niepulsacyjnego podawania GnRH?',
        ['Dochodzi do internalizacji receptorów i wygaszenia wydzielania LH i FSH', 'Zjawisko desensytyzacji receptorów w przysadce blokuje oś.'],
        ['Wydzielanie LH i FSH gwałtownie wzrasta w sposób ciągły', 'Ciągła stymulacja nie wywołuje tachyfilaksji, lecz zjawisko down-regulation.'],
        ['Wydzielanie LH spada, ale FSH rośnie z powodu braku inhibiny', 'Obie gonadotropiny ulegają supresji w mechanizmie receptorowym.']
      ),
      q(
        'Który czynnik stymuluje wybiórczo wydzielanie LH kosztem FSH?',
        ['Wysoka częstotliwość pulsacji GnRH (co 60–90 minut)', 'Częste impulsy GnRH preferencyjnie stymulują promotor podjednostki beta LH.'],
        ['Niska częstotliwość pulsacji GnRH (co 2–3 godziny)', 'Rzadkie impulsy preferencyjnie promują ekspresję podjednostki beta FSH.'],
        ['Wysokie stężenie inhibiny B', 'Inhibina B wybiórczo hamuje wydzielanie FSH, a nie pobudza LH.']
      ),
      q(
        'Jaki warunek musi zostać spełniony, aby estradiol wywołał dodatnie sprzężenie zwrotne i wyrzut LH?',
        ['Stężenie > 200 pg/ml utrzymujące się przez minimum 36–48 godzin', 'Trwała wysoka ekspozycja przestawia podwzgórze na wyrzut LH.'],
        ['Gwałtowny spadek estradiolu poniżej 50 pg/ml w fazie lutealnej', 'Spadek estrogenów nie wyzwala owulacji, lecz krwawienie z odstawienia.'],
        ['Równoczesny wysoki poziom progesteronu > 10 ng/ml', 'Progesteron w wysokim stężeniu hamuje pulsację GnRH i blokuje wyrzut LH.']
      ),
      q(
        'Za co odpowiada hormon antymüllerowski (AMH) w diagnostyce rezerwy jajnikowej?',
        ['Odzwierciedla pulę rosnących pęcherzyków preantralnych i małych antralnych', 'AMH koreluje z liczbą pęcherzyków i nie zależy od dnia cyklu.'],
        ['Odzwierciedla jakość oocytu uwolnionego w dominującym pęcherzyku Graafa', 'AMH mierzy rezerwę ilościową, a nie genetyczną jakość oocytu.'],
        ['Jest bezpośrednim wyznacznikiem pęknięcia pęcherzyka i ciałka żółtego', 'Za funkcję ciałka żółtego odpowiada progesteron, a nie AMH.']
      ),
      q(
        'Które komórki jądra odpowiadają za syntezę testosteronu pod wpływem LH?',
        ['Komórki Leydiga w przestrzeni śródmiąższowej', 'Komórki Leydiga posiadają receptory dla LH i enzymy steroidogenezy.'],
        ['Komórki Sertolego w kanalikach nasiennych', 'Komórki Sertolego odpowiadają na FSH i wspierają spermatogenezę.'],
        ['Komórki mioidalne otaczające kanalik nasienny', 'Komórki mioidalne odpowiadają za kurczliwość, a nie syntezę androgenów.']
      ),
    ],
  },
  {
    id: 'gonady-diagnostyka-laboratoryjna',
    title: 'Diagnostyka laboratoryjna gonad i testy dynamiczne',
    group: 'Fundamenty i diagnostyka',
    readTime: '12 min',
    goals: [
      'Nauczyć się prawidłowego oznaczania testosteronu całkowitego, SHBG i wolnego testosteronu (cFT).',
      'Poznać pułapki interpretacyjne związane ze stężeniem globuliny wiążącej hormony płciowe (SHBG).',
      'Opanować protokoły testów stymulacyjnych z hCG oraz gonadoreliną (GnRH).',
    ],
    sections: [
      {
        title: 'Zasady pobierania i rytm dobowy testosteronu',
        content:
          'Testosteron u mężczyzn wykazuje wyraźny rytm dobowy z najwyższym stężeniem we wczesnych godzinach porannych. Zgodnie z wytycznymi EAU i Endocrine Society, krew na testosteron całkowity należy pobierać rano (między 7:00 a 11:00) na czczo. Rozpoznanie hipogonadyzmu wymaga potwierdzenia obniżonego stężenia w co najmniej dwóch niezależnych oznaczeniach porannych, gdyż przejściowe spadki mogą wynikać z ostrej infekcji, bezsenności lub spożycia posiłku bogatego w glukozę.',
      },
      {
        title: 'Rola SHBG i testosteron wolny (cFT)',
        content:
          'We krwi krąży jedynie 1–2% testosteronu w postaci wolnej, ok. 40–50% jest ściśle związane z SHBG, a pozostała część słabo z albuminą. W stanach obniżonego SHBG (otyłość, zespół metaboliczny, cukrzyca typu 2, niedoczynność tarczycy, stosowanie GKS) testosteron całkowity może być fałszywie niski mimo prawidłowego testosteronu wolnego. Odwrotnie, w stanach podwyższonego SHBG (starzenie, nadczynność tarczycy, marskość wątroby, leki przeciwdrgawkowe) całkowity T może maskować rzeczywisty niedobór wolnej frakcji. W takich sytuacjach złotym standardem jest obliczenie wolnego testosteronu (cFT) wzorem Vermeulena.',
      },
      {
        title: 'Testy dynamiczne: stymulacja hCG i próba z GnRH',
        content:
          'W różnicowaniu hipogonadyzmu i ocenie rezerwy komórek Leydiga stosuje się test stymulacji gonadotropiną kosmówkową (hCG), która jest agonistą receptora LH. Brak wzrostu testosteronu po podaniu hCG (np. 1500–5000 j.m.) potwierdza pierwotną niewydolność jąder lub brak tkanki jądrowej (anorchia). Z kolei test z gonadoreliną (100 mcg GnRH i.v.) pozwala ocenić rezerwę gonadotropową przysadki w hipogonadyzmie hipogonadotropowym.',
      },
    ],
    table: {
      caption: 'Czynniki modyfikujące stężenie SHBG w surowicy',
      headers: ['Kierunek zmiany', 'Czynniki kliniczne', 'Wpływ na testosteron całkowity (TT)', 'Zalecane postępowanie'],
      rows: [
        ['Spadek SHBG', 'Otyłość, hiperinsulinizm, niedoczynność tarczycy, sterydy AAS', 'Fałszywie niski TT', 'Oznacz cFT lub wylicz równaniem Vermeulena'],
        ['Wzrost SHBG', 'Starzenie, nadczynność tarczycy, marskość, anoreksja, estrogeny', 'Fałszywie wysoki/prawidłowy TT', 'Oznacz cFT — faktyczny niedobór biologiczny'],
        ['Norma SHBG', 'Młody zdrowy mężczyzna bez otyłości', 'TT odzwierciedla pulę biologiczną', 'Oznaczenie poranne TT wystarczające do screeningu'],
      ],
    },
    advanced:
      'Równanie Vermeulena wymaga znajomości stężenia testosteronu całkowitego (TT w nmol/l), SHBG (nmol/l) oraz albuminy (g/dl). Stała asocjacji dla SHBG wynosi K_a = 1,0 x 10^9 M^-1, a dla albuminy K_b = 3,6 x 10^4 M^-1. Wolny testosteron (cFT) poniżej 220–250 pmol/l (65 pg/ml) potwierdza hipogonadyzm biochemiczny.',
    summary:
      'Pobieranie testosteronu rano na czczo i powtórzenie wyniku to warunek sine qua non. Wahania SHBG zafałszowują całkowity testosteron, wymagając kalkulacji wolnej frakcji cFT. Test z hCG weryfikuje zdolność biosyntezy jąder.',
    sourceIds: ['eau-hypogonadism-2024', 'endo-testosterone-2018', 'vermeulen-1999'],
    questions: [
      q(
        'Dlaczego krew na oznaczenie stężenia testosteronu należy pobierać rano na czczo?',
        ['Testosteron wykazuje rytm dobowy ze szczytem rano, a glukoza może go obniżać', 'Rytm dobowy i posiłek węglowodanowy mogą fałszywie obniżyć wynik.'],
        ['Testosteron osiąga szczytowe stężenie późnym popołudniem po wysiłku', 'Szczyt przypada na godziny ranne, a nie popołudniowe.'],
        ['Posiłek białkowy drastycznie zwiększa stężenie SHBG w ciągu 30 minut', 'SHBG nie ulega natychmiastowym wahaniom poposiłkowym.'],
      ),
      q(
        'U otyłego pacjenta z BMI 36 stwierdzono testosteron całkowity 210 ng/dl (norma 300–900). Co należy zrobić?',
        ['Oznaczyć SHBG i obliczyć wolny testosteron (cFT) metodą Vermeulena', 'Otyłość obniża SHBG, dając rzekomo niski TT przy prawidłowym cFT.'],
        ['Natychmiast wdrożyć iniekcje testosteronu undekanianu', 'Rozpoznanie wymaga potwierdzenia i oceny wolnej frakcji przed wdrożeniem TRT.'],
        ['Zlecić biopsję jądra w celu wykluczenia zespołu Sertoli-cell-only', 'Biopsja nie ma zastosowania w diagnostyce laboratoryjnej otyłości.'],
      ),
      q(
        'Jaki wynik testu stymulacji z hCG wskazuje na pierwotną niewydolność jąder (hipogonadyzm hipergonadotropowy)?',
        ['Brak istotnego wzrostu stężenia testosteronu po podaniu hCG', 'Zniszczone komórki Leydiga nie są w stanie odpowiedzieć na stymulację LH/hCG.'],
        ['Wielokrotny, dynamiczny wyrzut testosteronu powyżej 1000 ng/dl', 'Prawidłowy wzrost świadczy o zachowanej rezerwie komórek Leydiga.'],
        ['Spadek stężenia LH do zera bez zmiany testosteronu', 'Ocenie podlega stężenie testosteronu w odpowiedzi na egzogenne hCG.'],
      ),
      q(
        'Który stan kliniczny prowadzi do patologicznego wzrostu stężenia SHBG w osoczu?',
        ['Nadczynność tarczycy (tyreotoksykoza)', 'Hormony tarczycy silnie pobudzają wątrobową syntezę SHBG.'],
        ['Otyłość trzewna i ciężki zespół metaboliczny', 'Hiperinsulinizm w otyłości hamuje syntezę SHBG w hepatocytach.'],
        ['Nadużywanie sterydów anaboliczno-androgennych (AAS)', 'Egzogenne androgeny dramatycznie obniżają stężenie SHBG.'],
      ),
      q(
        'Ile porannych pomiarów testosteronu jest wymaganych do pewnego rozpoznania hipogonadyzmu?',
        ['Co najmniej dwa niezależne pomiary w odstępie czasu', 'Wahania dobowe i czynniki stresowe wymagają laboratoryjnej replikacji.'],
        ['Wystarczy jedno pojedyncze oznaczenie o dowolnej porze dnia', 'Jedno oznaczenie niesie wysokie ryzyko fałszywie dodatniego rozpoznania.'],
        ['Minimum pięć oznaczeń w odstępie co najmniej 6 miesięcy', 'Dwa poranne oznaczenia są wystarczające i rekomendowane przez EAU.'],
      ),
    ],
  },
  {
    id: 'gonady-hipogonadyzm-meski',
    title: 'Hipogonadyzm męski — klasyfikacja, etiologia i diagnostyka',
    group: 'Andrologia i gonady męskie',
    readTime: '13 min',
    goals: [
      'Różnicować hipogonadyzm pierwotny (hipergonadotropowy) od wtórnego (hipogonadotropowego).',
      'Poznać obraz kliniczny i genetykę zespołu Klinefeltera (47,XXY).',
      'Zrozumieć patomechanizm zespołu Kallmanna i hipogonadyzmu czynnościowego.',
    ],
    sections: [
      {
        title: 'Klasyfikacja: pierwotny vs wtórny hipogonadyzm',
        content:
          'Hipogonadyzm męski definiuje się jako zespół objawów klinicznych powiązanych z biochemicznie potwierdzonym niedoborem testosteronu. W hipogonadyzmie pierwotnym (hipergonadotropowym) uszkodzenie dotyczy samych jąder: stężenie testosteronu jest niskie, a LH i FSH są podwyższone w wyniku braku ujemnego sprzężenia zwrotnego. W hipogonadyzmie wtórnym (hipogonadotropowym) defekt leży w podwzgórzu lub przysadce: stężenie testosteronu jest niskie, a stężenia LH i FSH są nieadekwatnie prawidłowe lub obniżone.',
      },
      {
        title: 'Zespół Klinefeltera (47,XXY) — najczęstsza przyczyna pierwotna',
        content:
          'Występuje z częstością ok. 1 na 600 noworodków płci męskiej. Dodatkowy chromosom X prowadzi do postępującego szkliwienia i włóknienia kanalików nasiennych w okresie dojrzewania. Fenotyp obejmuje: wysoki wzrost z eunuchoidalnymi proporcjami ciała (rozpiętość ramion przewyższa wzrost o >5 cm), małe twarde jądra (<4 ml), ginekomastię, skąpy zarost, bezpłodność (azoospermia) oraz podwyższone ryzyko zespołu metabolicznego, osteoporozy i raka piersi u mężczyzn. Podstawą rozpoznania jest badanie kariotypu.',
      },
      {
        title: 'Zespół Kallmanna i hipogonadyzm czynnościowy',
        content:
          'Zespół Kallmanna to wrodzony hipogonadyzm hipogonadotropowy wynikający z zaburzenia embriogenezy — braku migracji neuronów wydzielających GnRH z opuszki węchowej do podwzgórza (mutacje genów KAL1/ANOS1, FGFR1, PROKR2). Charakterystycznym objawem towarzyszącym jest anosmia lub hiposmia (brak/osłabienie węchu). U dorosłych najczęstszą postacią hipogonadyzmu wtórnego jest postać czynnościowa (funkcjonalna), wywołana otyłością olbrzymią, cukrzycą typu 2, obturacyjnym bezdechem sennym (OBS) lub przewlekłym leczeniem opioidami.',
      },
    ],
    table: {
      caption: 'Różnicowanie postaci hipogonadyzmu męskiego',
      headers: ['Cecha', 'Pierwotny (jądrowy)', 'Wtórny (podwzgórzowo-przysadkowy)', 'Czynnościowy (metaboliczny)'],
      rows: [
        ['Stężenie LH / FSH', 'Wysokie (hipergonadotropowy)', 'Niskie lub nieadekwatnie w normie', 'Niskie lub w dolnej granicy normy'],
        ['Stężenie testosteronu', 'Niskie', 'Niskie', 'Niskie całkowite (obniżone SHBG)'],
        ['Główne przyczyny', 'Zespół Klinefeltera, zapalenie jąder (świnka), chemioterapia, anorchia', 'Zespół Kallmanna, gruczolak przysadki, hemochromatoza', 'Otyłość olbrzymia, cukrzyca t. 2, bezdech senny, opioidy'],
        ['Odwracalność', 'Nieodwracalny (wymaga TRT)', 'Wymaga leczenia przyczyny (GnRH/gonadotropiny do płodności)', 'Potencjalnie odwracalny po redukcji masy ciała'],
      ],
    },
    advanced:
      'W zespole Klinefeltera stężenia LH i FSH są wybitnie podwyższone, a inhibina B jest nieoznaczalna. Mimo powszechnej azoospermii w ejakulacie, u części pacjentów możliwe jest pozyskanie plemników do procedury ICSI drogą mikrochirurgicznej biopsji jądra (micro-TESE) przed rozpoczęciem lub po modyfikacji TRT.',
    summary:
      'Wysokie stężenia LH/FSH definiują hipogonadyzm pierwotny (Klinefelter), a niskie/prawidłowe wtórny (Kallmann z anosmią, guzy, otyłość). Różnicowanie decyduje o możliwości indukcji spermatogenezy.',
    sourceIds: ['eau-hypogonadism-2024', 'endo-testosterone-2018'],
    questions: [
      q(
        'Który zestaw badań laboratoryjnych jest charakterystyczny dla zespołu Klinefeltera?',
        ['Niski testosteron, wybitnie wysokie LH i FSH, kariotyp 47,XXY', 'Klasyczny pierwotny hipogonadyzm hipergonadotropowy z aberracją chromosomową.'],
        ['Wysoki testosteron, wysokie LH i obniżone FSH', 'W hipogonadyzmie testosteron nie jest podwyższony.'],
        ['Niski testosteron, niskie LH i FSH, prawidłowy węch', 'To obraz hipogonadyzmu wtórnego, a nie zespołu Klinefeltera.'],
      ),
      q(
        'Jaka cecha kliniczna pozwala odróżnić zespół Kallmanna od innych postaci hipogonadyzmu wtórnego?',
        ['Współwystępowanie zaburzeń węchu (anosmia lub hiposmia)', 'Defekt migracji neuronów węchowych i neuronów GnRH z placody węchowej.'],
        ['Obustronne powiększenie jąder powyżej 30 ml', 'W zespole Kallmanna jądra są małe z powodu braku gonadotropin.'],
        ['Obecność masywnej hiperkalcemii i kamicy nerkowej', 'Hiperkalcemia to cecha pierwotnej nadczynności przytarczyc.'],
      ),
      q(
        'Która postać hipogonadyzmu może ustąpić po radykalnej redukcji masy ciała i wyleczeniu bezdechu sennego?',
        ['Czynnościowy hipogonadyzm wtórny u otyłego mężczyzny', 'Redukcja insulinooporności i stanu zapalnego przywraca prawidłową pulsację GnRH.'],
        ['Wrodzony zespół Klinefeltera z atrofią kanalików', 'Włóknienie kanalików w zespole Klinefeltera jest nieodwracalne.'],
        ['Stan po obustronnej orchidektomii z powodu raka jądra', 'Brak jąder stanowi bezwzględną, anatomiczną przyczynę hipogonadyzmu.'],
      ),
      q(
        'Jaki jest typowy fenotyp dorosłego mężczyzny z nieleczonym zespołem Klinefeltera?',
        ['Wysoki wzrost, eunuchoidalne proporcje, małe twarde jądra i ginekomastia', 'Dodatkowy chromosom X i brak androgenów wydłuża nasady kości i powoduje ginekomastię.'],
        ['Niski wzrost, płetwista szyja, krótka 4. kość śródręcza', 'To cechy zespołu Turnera u kobiet (45,X).'],
        ['Niski wzrost, otyłość olbrzymia, małe dłonie i stopy oraz polifagia', 'To cechy zespołu Pradera-Williego.'],
      ),
      q(
        'Dlaczego hemochromatoza może prowadzić do hipogonadyzmu hipogonadotropowego?',
        ['Odkładanie żelaza w komórkach gonadotropowych przedniego płata przysadki', 'Hemosyderoza selektywnie niszczy komórki wydzielające LH i FSH.'],
        ['Żelazo bezpośrednio hamuje aktywność aromatazy w tkance tłuszczowej', 'Głównym mechanizmem hemochromatozy jest uszkodzenie przysadki, a nie aromatazy.'],
        ['Dochodzi do autoimmunologicznego zniszczenia kory nadnerczy', 'Hemochromatoza to choroba spichrzeniowa, a nie autoimmunologiczna.'],
      ),
    ],
  },
  {
    id: 'gonady-terapia-testosteronem',
    title: 'Terapia zastępcza testosteronem (TRT) i bezpieczeństwo',
    group: 'Andrologia i gonady męskie',
    readTime: '13 min',
    goals: [
      'Znać wskazania, formy podania i cele stężeń w terapii zastępczej testosteronem (TRT).',
      'Nauczyć się monitorowania bezpieczeństwa TRT (hematokryt, PSA, profil lipidowy).',
      'Rozpoznawać bezwzględne i względne przeciwwskazania do wdrożenia testosteronu.',
    ],
    sections: [
      {
        title: 'Wskazania i cele stężeń w TRT',
        content:
          'TRT jest wskazana u mężczyzn z objawowym i laboratoryjnie potwierdzonym hipogonadyzmem. Celem leczenia jest uzyskanie fizjologicznego stężenia testosteronu w surowicy (zwykle w środkowym zakresie normy dla młodych zdrowych mężczyzn: 450–600 ng/dl lub 15–20 nmol/l) oraz ustąpienie objawów klinicznych: poprawa libido, erekcji, nastroju, gęstości mineralnej kości i masy mięśniowej.',
      },
      {
        title: 'Dostępne preparaty i farmakokinetyka',
        content:
          'Wyróżniamy preparaty przezskórne (żele 1% lub 2%, zapewniające stabilne dobowe stężenie bez gwałtownych pików, nakładane rano na ramiona lub brzuch) oraz domięśniowe estry testosteronu. Krótkodziałające estry (enantan, cypionian podawane co 2–3 tygodnie) powodują wahania stężeń („roller-coaster” objawów i hematokrytu). Długodziałający undekanian testosteronu (1000 mg i.m. co 10–14 tygodni) zapewnia stabilne stężenia w granicach normy przez wiele tygodni. Testosteron doustny w postaci krystalicznej nie jest zalecany z powodu hepatotoksyczności.',
      },
      {
        title: 'Bezpieczeństwo i monitorowanie: hematokryt i prostata',
        content:
          'Głównym powikłaniem TRT jest wtórna erytrocytoza (stymulacja erytropoetyny i supresja hepcydyny przez androgeny). Hematokryt (Hct) musi być monitorowany po 3, 6 i 12 miesiącach; przekroczenie Hct > 54% wymaga wstrzymania leczenia, upuszczenia krwi (flebotomii) lub redukcji dawki ze względu na ryzyko zakrzepicy. Należy również monitorować stężenie PSA oraz badać prostatę per rectum (DRE). TRT nie wywołuje de novo raka prostaty, ale może przyspieszyć wzrost istniejącego utajonego nowotworu.',
      },
    ],
    table: {
      caption: 'Przeciwwskazania do terapii zastępczej testosteronem wg wytycznych EAU',
      headers: ['Kategoria', 'Stany kliniczne', 'Uzasadnienie patofizjologiczne'],
      rows: [
        ['Bezwzględne', 'Aktywny miejscowo zaawansowany lub przerzutowy rak prostaty', 'Androgenozależny rozrost komórek nowotworowych'],
        ['Bezwzględne', 'Rak piersi u mężczyzn', 'Konwersja do estrogenów i stymulacja receptorów ER/AR'],
        ['Bezwzględne', 'Ciężka niewyrównana niewydolność serca (NYHA IV)', 'Retencja sodu i wody przez mineralokortykoidowe działanie'],
        ['Bezwzględne', 'Hematokryt (Hct) > 54% przed leczeniem', 'Ryzyko zespołu nadlepkości i incydentów zakrzepowo-zatorowych'],
        ['Względne', 'Ciężkie objawy LUTS (IPSS > 19) w przebiegu BPH', 'Wymaga wstępnego leczenia urologicznego (alfa-blokery)'],
        ['Względne / Ważne', 'Chęć posiadania potomstwa w najbliższym czasie', 'TRT całkowicie hamuje spermatogenezę przez supresję LH/FSH'],
      ],
    },
    advanced:
      'Ważna pułapka kliniczna: podanie testosteronu mężczyźnie z hipogonadyzmem, który planuje potomstwo, jest błędem sztuki. Egzogenny testosteron wygasza wydzielanie LH i FSH, prowadząc do zaniku wewnątrzjądrowego stężenia testosteronu (które fizjologicznie jest 50–100 razy wyższe niż w surowicy) i jatrogennej azoospermii. U takich pacjentów zamiast TRT stosuje się gonadotropiny (hCG + rFSH) lub SERM (cytrynian klomifenu).',
    summary:
      'TRT przywraca fizjologiczne stężenia androgenów. Wymaga monitorowania hematokrytu (limit 54%) i PSA. Jest bezwzględnie przeciwwskazana u mężczyzn planujących ojcostwo w krótkim czasie z powodu blokady osi.',
    sourceIds: ['eau-hypogonadism-2024', 'endo-testosterone-2018'],
    questions: [
      q(
        'Dlaczego pacjentowi z hipogonadyzmem planującemu ojcostwo NIE wolno podawać testosteronu?',
        ['Egzogenny testosteron hamuje LH i FSH, całkowicie blokując spermatogenezę', 'Zahamowanie osi HPG prowadzi do jatrogennej azoospermii.'],
        ['Testosteron wywołuje bezpośrednie działanie teratogenne na oocyty partnerki', 'Testosteron nie wpływa teratogennie na komórki jajowe partnerki.'],
        ['Testosteron natychmiast przekształca się w plemnikach w toksyczny dihydrotestosteron', 'To fałszywa teoria; mechanizm wynika z supresji gonadotropin.'],
      ),
      q(
        'Jaka wartość hematokrytu (Hct) stanowi bezwzględne wskazanie do redukcji dawki lub odstawienia TRT?',
        ['Hct > 54%', 'Powyżej 54% gwałtownie wzrasta lepkość krwi i ryzyko udaru oraz zawału.'],
        ['Hct > 45%', '45% to prawidłowa wartość hematokrytu u dorosłego mężczyzny.'],
        ['Hct > 65%', 'Interwencja jest konieczna znacznie wcześniej, przy przekroczeniu 54%.'],
      ),
      q(
        'Który preparat testosteronu zapewnia najbardziej stabilne stężenie w surowicy bez wahań szczytowych?',
        ['Długodziałający undekanian testosteronu domięśniowo lub żel przezskórny', 'Zapewniają powolne uwalnianie i unikanie wahań typu roller-coaster.'],
        ['Krótkodziałający propionian testosteronu podawany doustnie raz na tydzień', 'Propionian działa bardzo krótko i doustnie nie jest skuteczny.'],
        ['Czysty krystaliczny testosteron dożylnie w bolusie', 'Testosteron dożylny nie istnieje i wywołałby zator tłuszczowy.'],
      ),
      q(
        'Co z poniższych stanowi bezwzględne przeciwwskazanie do rozpoczęcia terapii zastępczej testosteronem?',
        ['Aktywny, zaawansowany rak gruczołu krokowego', 'Androgenozależny rozrost nowotworowy wyklucza podawanie testosteronu.'],
        ['Wiek pacjenta powyżej 65. roku życia', 'Wiek nie jest przeciwwskazaniem, jeśli hipogonadyzm jest potwierdzony.'],
        ['Obecność cukrzycy typu 2 z HbA1c 7,5%', 'TRT wręcz poprawia wrażliwość na insulinę u mężczyzn z hipogonadyzmem.'],
      ),
      q(
        'Kiedy należy skontrolować stężenie testosteronu u pacjenta stosującego żel przezskórny 1%?',
        ['Po 2–4 tygodniach od wdrożenia, ok. 2–4 godziny po porannej aplikacji żelu', 'Pozwala to ocenić stężenie w fazie plateau wchłaniania przezskórnego.'],
        ['Dokładnie 5 minut przed nałożeniem żelu na skórę', 'Wchłanianie przezskórne wymaga oceny w trakcie stabilnego dobowego uwalniania.'],
        ['Dopiero po 3 latach od rozpoczęcia kuracji', 'Pierwsza kontrola laboratoryjna jest konieczna w ciągu kilku tygodni.'],
      ),
    ],
  },
  {
    id: 'gonady-ginekomastia',
    title: 'Ginekomastia — patogeneza, różnicowanie i leczenie',
    group: 'Andrologia i gonady męskie',
    readTime: '12 min',
    goals: [
      'Zrozumieć patofizjologię ginekomastii wynikającą z zaburzenia stosunku wolnych estrogenów do androgenów.',
      'Różnicować prawdziwą ginekomastię od lipomastii (steatomastii) i raka piersi u mężczyzn.',
      'Poznać najczęstsze przyczyny polekowe oraz algorytm postępowania zachowawczego i chirurgicznego.',
    ],
    sections: [
      {
        title: 'Mechanizm powstawania ginekomastii',
        content:
          'Ginekomastia to łagodny rozrost tkanki gruczołowej piersi u mężczyzn, wynikający z zachwiania równowagi biologicznej między stymulującym działaniem estrogenów a hamującym wpływem androgenów na receptory w tkance sutkowej. Może być spowodowana: bezwzględnym nadmiarem estrogenów (guzy jądra Leydiga/Sertolego produkujące estradiol, otyłość ze wzmożoną aromatyzacją), niedoborem androgenów (zespół Klinefeltera, hipogonadyzm) lub zablokowaniem receptora androgenowego (antyandrogeny).',
      },
      {
        title: 'Różnicowanie: ginekomastia vs lipomastia vs rak piersi',
        content:
          'W badaniu palpacyjnym ginekomastia prezentuje się jako sprężysty, często tkliwy krążek tkanki gruczołowej zlokalizowany centralnie pod kompleksem brodawka-otoczka (zwykle obustronny). Lipomastia (steatomastia) to wyłącznie nagromadzenie tkanki tłuszczowej u osób otyłych, bez wyczuwalnego zagęszczenia gruczołowego. Z kolei rak piersi u mężczyzn ma postać twardego, niebolesnego guzka położonego ekscentrycznie (poza brodawką), często z zaciągnięciem skóry, wyciekiem z brodawki lub powiększeniem węzłów chłonnych pachowych. W diagnostyce kluczowe jest USG piersi.',
      },
      {
        title: 'Przyczyny polekowe i terapia',
        content:
          'Do leków najczęściej wywołujących ginekomastię należą: spironolakton (blokada receptora AR i hamowanie biosyntezy T), bikalutamid, ketokonazol, inhibitory 5-alfa-reduktazy (finasteryd), leki przeciwpsychotyczne (hiperprolaktynemia), cymetydyna oraz preparaty anaboliczne AAS. W świeżej ginekomastii (< 6–12 miesięcy, faza proliferacyjna tkanki ginekomastalnej) lekiem z wyboru jest SERM — tamoksyfen (10–20 mg/dobę). W ginekomastii utrwalonej (faza włóknienia) farmakoterapia jest nieskuteczna i jedyną opcją pozostaje zabieg chirurgiczny (subtotalna mastektomia podskórna).',
      },
    ],
    table: {
      caption: 'Różnicowanie powiększenia piersi u mężczyzn',
      headers: ['Cecha', 'Ginekomastia prawdziwa', 'Lipomastia (steatomastia)', 'Rak piersi u mężczyzny'],
      rows: [
        ['Konsystencja', 'Sprężysta, dyskowata tkanka gruczołowa', 'Miękka, jednorodna jak tkanka tłuszczowa', 'Twarda, nieelastyczna, zrośnięta z podłożem'],
        ['Lokalizacja', 'Centralnie pod brodawką sutkową', 'Rozlane powiększenie całej piersi', 'Zwykle ekscentryczna, asymetryczna'],
        ['Tkliwość', 'Często obecna w fazie aktywnej', 'Całkowicie bezbolesna', 'Zwykle bezbolesny guz'],
        ['Badanie USG', 'Rozrost hipoechogenicznej tkanki gruczołowej', 'Jednorodna tkanka tłuszczowa bez gruczołu', 'Nieregularna masa hipoechogeniczna z cieniem'],
      ],
    },
    advanced:
      'Fizjologiczna ginekomastia występuje w trzech okresach życia: noworodkowym (przejście matczynych estrogenów przez łożysko), pokwitaniowym (u 50–60% chłopców w wieku 13–14 lat z powodu przejściowej przewagi estradiolu nad testosteronem w fazie wczesnego dojrzewania — ustępuje samoistnie w ciągu 1–2 lat) oraz starczym (spadek testosteronu, wzrost tkanki tłuszczowej i SHBG).',
    summary:
      'Ginekomastia wynika ze wzrostu stosunku estrogeny/androgeny. Wymaga wykluczenia raka piersi (twardy, ekscentryczny guz) i guzów jądra. Wczesna faza odpowiada na tamoksyfen, faza włóknienia wymaga chirurgii.',
    sourceIds: ['eau-hypogonadism-2024', 'endo-testosterone-2018'],
    questions: [
      q(
        'Jaki jest główny patomechanizm powstawania ginekomastii?',
        ['Wzrost stosunku stężenia wolnego estradiolu do wolnego testosteronu', 'Przewaga estrogenowa stymuluje rozrost przewodów mlecznych i zrębu piersi.'],
        ['Wyizolowany spadek wydzielania prolaktyny przez przysadkę', 'Spadek prolaktyny nie powoduje ginekomastii; to jej nadmiar może sprzyjać rozrostowi.'],
        ['Zablokowanie receptora estrogenowego alfa w tkance sutkowej', 'Zablokowanie receptora estrogenowego hamuje ginekomastię (mechanizm tamoksyfenu).'],
      ),
      q(
        'Która cecha w badaniu fizykalnym budzi silne podejrzenie raka piersi u mężczyzny?',
        ['Twardy, niebolesny guz położony asymetrycznie poza otoczką brodawki', 'Ekscentryczna lokalizacja i zrośnięcie ze skórą to cechy nowotworu złośliwego.'],
        ['Obustronne, miękkie powiększenie obu piersi bez wyczuwalnych guzków', 'To klasyczny obraz lipomastii u otyłego mężczyzny.'],
        ['Bolesny, sprężysty krążek zlokalizowany dokładnie pod brodawką', 'To cecha wczesnej, aktywnej ginekomastii gruczołowej.'],
      ),
      q(
        'Który lek jest preparatem pierwszego rzutu w farmakologicznym leczeniu wczesnej ginekomastii?',
        ['Tamoksyfen (selektywny modulator receptora estrogenowego SERM)', 'Blokuje receptory estrogenowe w tkance gruczołowej sutka.'],
        ['Testosteron w dużych dawkach domięśniowych', 'Podanie testosteronu nasili ginekomastię przez obwodową aromatyzację do estradiolu.'],
        ['Spironolakton w dawce 100 mg na dobę', 'Spironolakton jest częstą przyczyną ginekomastii polekowej.'],
      ),
      q(
        'U 14-letniego chłopca stwierdzono obustronne tkliwe powiększenie gruczołów piersiowych o średnicy 2,5 cm. Jakie jest właściwe postępowanie?',
        ['Obserwacja i uspokojenie pacjenta (ginekomastia pokwitaniowa ustępuje samoistnie)', 'Fizjologiczna ginekomastia pokwitaniowa cofa się samoistnie u >80% nastolatków.'],
        ['Natychmiastowe skierowanie na obustronną mastektomię chirurgiczną', 'Zabieg jest przeciwwskazany w fazie fizjologicznego dojrzewania.'],
        ['Wdrożenie chemioterapii metotreksatem', 'Ginekomastia pokwitaniowa nie jest chorobą nowotworową.'],
      ),
      q(
        'Dlaczego marskość wątroby często prowadzi do ginekomastii u mężczyzn?',
        ['Upośledzenie metabolizmu estrogenów i wzrost aromatyzacji w wątrobie', 'Spadek klirensu estrogenów oraz wzrost SHBG zmniejsza pulę wolnego testosteronu.'],
        ['Całkowity brak produkcji albuminy blokujący transport testosteronu', 'Spadek albuminy nie jest pierwotną przyczyną hiperestrogenizmu w marskości.'],
        ['Wątroba zaczyna syntetyzować ektopowo olbrzymie ilości GnRH', 'GnRH jest syntetyzowany wyłącznie w podwzgórzu.'],
      ),
    ],
  },
];
