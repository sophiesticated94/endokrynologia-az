import { type DraftLesson, q } from './course-types.ts';

export const draftOtyloscPart2: DraftLesson[] = [
  {
    id: 'otylosc-masld-mash',
    title: 'MASLD i MASH: nowa nomenklatura, diagnostyka FIB-4 i opcje terapeutyczne',
    group: 'Powikłania narządowe i kardiometaboliczne',
    readTime: '13 min',
    goals: [
      'Zrozumieć nową nomenklaturę wielodyscyplinarną: przejście z NAFLD na MASLD i z NASH na MASH.',
      'Opanować nieinwazyjną ocenę zwłóknienia wątroby za pomocą wskaźnika FIB-4 i elastografii impulsowej.',
      'Poznać przełomowe możliwości farmakoterapii MASH: analogi GLP-1 oraz agonistę THR-beta rezmetirom.',
    ],
    sections: [
      {
        title: 'Nowa definicja i nomenklatura: MASLD i MASH',
        content:
          'W 2023 roku międzynarodowe towarzystwa hepatologiczne (AASLD, EASL, ALEH) zastąpiły termin NAFLD (niealkoholowa stłuszczeniowa choroba wątroby) nienacechowanym stygmatyzująco terminem MASLD (Metabolic dysfunction-Associated Steatotic Liver Disease). MASLD definiuje się jako obecność stłuszczenia wątroby (w badaniach obrazowych lub histopatologii) przy współistnieniu co najmniej 1 z 5 kardiometabolicznych czynników ryzyka (otyłość/obwód talii, dysglikemia, nadciśnienie, hipertriglicerydemia, niski HDL) oraz braku szkodliwego spożywania alkoholu (< 20 g/d u kobiet, < 30 g/d u mężczyzn; przy wyższym spożyciu rozpoznaje się postać mieszaną MetALD). Postać ze stanem zapalnym i uszkodzeniem hepatocytów (balonowaceniem) nosi nazwę MASH (Metabolic dysfunction-Associated Steatohepatitis).',
      },
      {
        title: 'Nieinwazyjna diagnostyka zwłóknienia: wskaźnik FIB-4 i elastografia',
        content:
          'Kluczowym czynnikiem rokowniczym w MASLD decydującym o zgonie wątrobowym i powikłaniach sercowo-naczyniowych jest zaawansowanie zwłóknienia wątroby (stadia F0–F4). Podstawowym narzędziem przesiewowym w POZ jest wskaźnik FIB-4, wyliczany z prostych parametrów krwi: FIB-4 = [wiek (lata) * AST (U/l)] / [płytki krwi (10^9/l) * pierwiastek kwadratowy z ALT (U/l)]. Wynik FIB-4 < 1,30 (< 2,0 u osób po 65 r.ż.) wyklucza zaawansowane zwłóknienie z wartością predykcyjną ujemną NPV > 90%. Wynik FIB-4 > 2,67 wskazuje na wysokie ryzyko zwłóknienia F3–F4 i wymaga pilnej elastografii impulsowej (VCTE, FibroScan) oraz konsultacji hepatologicznej.',
      },
      {
        title: 'Nowoczesne leczenie MASH: rezmetirom i analogi inkretyn',
        content:
          'Przez dziesięciolecia podstawą terapii była redukcja masy ciała o >= 7–10%, która umożliwia cofnięcie zapalenia i włóknienia. Przełomem roku 2024 była rejestracja przez FDA rezmetiromu — pierwszego selektywnego agonisty wątrobowego receptora tarczycowego beta (THR-beta), który zwiększa utlenianie kwasów tłuszczowych w hepatocytach, redukuje lipotoksyczność i cofa włóknienie bez stymulacji receptorów alfa w sercu i kościach. Potężną skuteczność wykazują agoniści GLP-1 (semaglutyd) oraz podwójni agoniści GLP-1/GIP (tirzepatyd), indukując rezolucję MASH bez progresji zwłóknienia u ponad 60–70% chorych.',
      },
    ],
    table: {
      caption: 'Ocena zaawansowania zwłóknienia wątroby w MASLD (kaskada diagnostyczna)',
      headers: ['Narzędzie diagnostyczne', 'Wartość niska (wykluczenie)', 'Wartość pośrednia (szara strefa)', 'Wartość wysoka (zaawansowane F3/F4)'],
      rows: [
        ['Wskaźnik FIB-4', '< 1,30 (< 2,0 po 65 r.ż.)', '1,30 – 2,67 (wymaga elastografii)', '> 2,67 (wysokie prawdopodobieństwo F3-F4)'],
        ['Elastografia VCTE (FibroScan)', '< 8,0 kPa (brak istotnego włóknienia)', '8,0 – 12,0 kPa (podejrzenie F2-F3)', '> 12,0 – 15,0 kPa (zaawansowane włóknienie / marskość)'],
        ['Postępowanie kliniczne', 'Powtórzenie FIB-4 za 2–3 lata, modyfikacja stylu życia', 'Dalsza diagnostyka specjalistyczna (ELF test, elastografia)', 'Pilne skierowanie do hepatologa, screening żylaków i HCC'],
      ],
    },
    advanced:
      'Genetycznym podłożem podatności na MASLD jest wariant rs738409 genu PNPLA3 (patatin-like phospholipase domain-containing 3), kodujący substytucję I148M (izoleucyna zastąpiona metioniną). Zmutowane białko PNPLA3-148M opiera się degradacji przez proteasom, akumuluje się na powierzchni kropli lipidowych i upośledza hydrolizę triglicerydów przez lipazę triglicerydową (ATGL), prowadząc do ciężkiego stłuszczenia i szybkiej progresji do marskości i raka wątrobowokomórkowego (HCC) nawet u osób bez znacznej otyłości.',
    summary:
      'MASLD zastępuje NAFLD i wymaga stłuszczenia z >= 1 czynnikiem kardiometabolicznym. FIB-4 (< 1,30) wyklucza zaawansowane zwłóknienie. Terapia opiera się na redukcji masy ciała, analogach GLP-1/GIP oraz agoniscie THR-beta rezmetiromie.',
    sourceIds: ['aasld-easl-masld-2024', 'easo-2024'],
    questions: [
      q(
        'Który parametr laboratoryjny znajduje się w mianowniku wzoru na wskaźnik zwłóknienia FIB-4?',
        ['Liczba płytek krwi (PLT) pomnożona przez pierwiastek kwadratowy z aktywności ALT', 'Formuła FIB-4: [wiek * AST] / [PLT * sqrt(ALT)]. Spadek płytek i wzrost AST sygnalizują postępujące włóknienie.'],
        ['Stężenie bilirubiny całkowitej pomnożone przez albuminę', 'Bilirubina i albumina wchodzą w skład skali Childa-Pugha, a nie wzoru FIB-4.'],
        ['Stężenie cholesterolu frakcji LDL pomnożone przez glukozę', 'Lipidogram nie jest składnikiem wskaźnika FIB-4.']
      ),
      q(
        'Jaki wynik wskaźnika FIB-4 u osoby w wieku 50 lat pozwala z wysokim prawdopodobieństwem (NPV > 90%) wykluczyć zaawansowane zwłóknienie wątroby?',
        ['FIB-4 < 1,30', 'Wynik poniżej 1,30 kwalifikuje chorego do grupy niskiego ryzyka i pozwala uniknąć inwazyjnej diagnostyki.'],
        ['FIB-4 > 3,25', 'Wartość powyżej 3,25 wskazuje na bardzo wysokie ryzyko zaawansowanego zwłóknienia lub marskości.'],
        ['FIB-4 pomiędzy 2,0 a 2,67', 'Jest to tzw. szara strefa (ryzyko pośrednie) wymagająca weryfikacji elastografią.']
      ),
      q(
        'Jaki jest mechanizm działania rezmetiromu — leku zaaprobowanego przez FDA w terapii MASH z włóknieniem?',
        ['Jest selektywnym agonistą wątrobowego receptora tarczycowego beta (THR-beta)', 'Aktywacja THR-beta w wątrobie przyspiesza metabolizm tłuszczów i rezolucję stanu zapalnego bez kardiotoksyczności zależnej od THR-alfa.'],
        ['Jest nieselektywnym beta-adrenolitykiem zmniejszającym ciśnienie wrotne', 'Beta-blokery zmniejszają ciśnienie wrotne w marskości, ale nie leczą zapalenia MASH.'],
        ['Jest chelatorem żelaza usuwającym depozyty ferrytyny z hepatocytów', 'Chelatacja żelaza jest domeną leczenia hemochromatozy, a nie MASH.']
      ),
      q(
        'Które kryterium odróżnia postać MASH od prostego stłuszczenia metabolicznego (MASL)?',
        ['Obecność cech zapalenia zrazikowego oraz zwyrodnienia balonowatego hepatocytów w biopsji wątroby', 'Balonowacenie hepatocytów i naciek zapalny definiują aktywne zapalenie z ryzykiem włóknienia.'],
        ['Występowanie kamicy pęcherzyka żółciowego u chorego', 'Kamica pęcherzyka jest częsta w otyłości, ale nie definiuje zapalenia wątroby.'],
        ['Obniżenie aktywności enzymów wątrobowych ALT i AST poniżej normy', 'W MASH enzymy wątrobowe są zazwyczaj podwyższone lub w górnej granicy normy.']
      ),
      q(
        'Jaki polimorfizm genetyczny (rs738409) jest najsilniejszym znanym czynnikiem wrodzonej podatności na MASLD i stłuszczeniową marskość wątroby?',
        ['Wariant I148M w genie PNPLA3', 'Zmutowane białko PNPLA3 zaburza mobilizację triglicerydów z kropli lipidowych w hepatocytach.'],
        ['Mutacja genu receptora LDL (LDLR)', 'Mutacje LDLR wywołują rodzinną hipercholesterolemię, a nie pierwotne stłuszczenie wątroby.'],
        ['Delecja eksonu 3 w genie hormonu wzrostu', 'Defekt receptora GH nie odpowiada za pospolitą podatność na MASLD.']
      ),
    ],
  },
  {
    id: 'otylosc-powiklania-sercowo-oddechowe',
    title: 'Powikłania sercowo-oddechowe otyłości: OSAS, zespół Pickwicka i HFpEF',
    group: 'Powikłania narządowe i kardiometaboliczne',
    readTime: '13 min',
    goals: [
      'Znać kryteria diagnostyczne i narzędzia przesiewowe (STOP-BANG) obturacyjnego bezdechu sennego (OSAS).',
      'Różnicować OSAS od zespołu hipowentylacji w otyłości (OHS, zespół Pickwicka) na podstawie gazometrii krwi.',
      'Zrozumieć patomechanizm niewydolności serca z zachowaną frakcją wyrzutową (HFpEF) w otyłości.',
    ],
    sections: [
      {
        title: 'Obturacyjny bezdech senny (OSAS): patogeneza i kryteria AHI',
        content:
          'W otyłości nagromadzenie tkanki tłuszczowej w przestrzeni gardłowej i języku prowadzi do zwężenia górnych dróg oddechowych i ich zapadania się podczas snu na skutek fizjologicznego spadku napięcia mięśniówki. Każdy epizod bezdechu (apnea) lub spłycenia oddychania (hypopnea) wywołuje hipoksemię, hiperkapnię i gwałtowny wyrzut katecholamin pod koniec epizodu. Wskaźnik bezdechów i spłyceń (AHI) w polisomnografii określa stopień ciężkości: 5–14,9 (łagodny), 15–29,9 (umiarkowany), >= 30/h (ciężki). Narzędziem przesiewowym jest kwestionariusz STOP-BANG (chrapanie, zmęczenie, zaobserwowane bezdechy, ciśnienie, BMI > 35, wiek > 50, obwód szyi > 40/43 cm, płeć męska).',
      },
      {
        title: 'Zespół hipowentylacji w otyłości (OHS, zespół Pickwicka)',
        content:
          'Zespół hipowentylacji w otyłości (OHS) definiuje się jako współistnienie: 1) otyłości (BMI >= 30 kg/m²); 2) przewlekłej dziennej hiperkapnii w spoczynku potwierdzonej w gazometrii krwi tętniczej (PaCO2 >= 45 mmHg przy oddychaniu powietrzem atmosferycznym na poziomie morza); 3) wykluczenia innych przyczyn hipowentylacji (POChP, kwasica oddechowa, wady klatki piersiowej, choroby nerwowo-mięśniowe). Choć 90% chorych na OHS ma współistniejący ciężki OSAS, u 10% występuje izolowana hipowentylacja. Kluczowym mechanizmem jest osłabienie napędu oddechowego w pniu mózgu wskutek centralnej leptynooporności i mechanicznego ograniczenia ruchomości klatki piersiowej.',
      },
      {
        title: 'Niewydolność serca z zachowaną frakcją wyrzutową (HFpEF)',
        content:
          'Otyłość jest wiodącym czynnikiem rozwoju fenotypu kardiometabolicznego niewydolności serca z zachowaną frakcją wyrzutową (HFpEF). Trzewna i nasierdziowa tkanka tłuszczowa (epicardial adipose tissue, EAT) wydziela cytokiny prozapalne bezpośrednio do miokardium. Wywołuje to stan zapalny mikrokrążenia wieńcowego, spadek biodostępności tlenku azotu (NO), niedobór cGMP w kardiomiocytach i hipofosforylację tytyny (białka sprężystego), co prowadzi do zesztywnienia ściany lewej komory i dysfunkcji rozkurczowej. Co istotne, u osób z otyłością stężenia peptydów natriuretycznych (BNP i NT-proBNP) są fałszywie zaniżone o 30–50% z powodu zwiększonej ekspresji receptorów zmiatających NPR-C w adipocytach.',
      },
    ],
    table: {
      caption: 'Porównanie obturacyjnego bezdechu sennego (OSAS) i zespołu hipowentylacji w otyłości (OHS)',
      headers: ['Cecha', 'OSAS (izolowany)', 'OHS (Zespół Pickwicka)'],
      rows: [
        ['Masa ciała / BMI', 'Często podwyższona (BMI >= 30)', 'Prawie zawsze otyłość olbrzymia (zazwyczaj BMI >= 35–40)'],
        ['Gazometria za dnia (PaCO2)', 'Prawidłowa (< 45 mmHg, normokapnia)', 'Podwyższona (PaCO2 >= 45 mmHg, przewlekła hiperkapnia)'],
        ['Stężenie wodorowęglanów (HCO3-)', 'Prawidłowe (< 27 mmol/l)', 'Podwyższone (>= 27 mmol/l — kompensacja nerkowa)'],
        ['Patofizjologia', 'Mechaniczne zapadanie gardła wyłącznie we śnie', 'Zmniejszona podatność płuc + blunting napędu oddechowego'],
        ['Leczenie z wyboru', 'Stałe dodatnie ciśnienie w drogach oddechowych (CPAP)', 'Wentylacja dwupoziomowa (BiPAP) lub CPAP w OSAS-OHS'],
      ],
    },
    advanced:
      'W badaniu STEP-HFpEF semaglutyd w dawce 2,4 mg podawany raz w tygodniu pacjentom z otyłością i HFpEF doprowadził nie tylko do redukcji masy ciała o 10,7%, ale wywołał spektakularną poprawę jakości życia w skali KCCQ (+16,6 pkt vs placebo), wydłużył dystans 6-minutowego chodu (6MWD o +21,5 m) i obniżył stężenie białka C-reaktywnego (hs-CRP) o 43%, co potwierdza, że usunięcie prozapalnego tłuszczu nasierdziowego bezpośrednio odwraca dysfunkcję rozkurczową serca.',
    summary:
      'OSAS to nocne zapadanie gardła z desaturacjami. OHS (zespół Pickwicka) wymaga wykazania dziennej hiperkapnii (PaCO2 >= 45 mmHg). W otyłości HFpEF wynika z zapalenia miokardium przez tłuszcz nasierdziowy, a stężenia BNP są paradoksalnie obniżone.',
    sourceIds: ['easo-2024', 'aace-abcd-2024'],
    questions: [
      q(
        'Które badanie jest bezwzględnie wymagane do postawienia rozpoznania zespołu hipowentylacji w otyłości (OHS, zespół Pickwicka)?',
        ['Gazometria krwi tętniczej wykazująca dzienną hiperkapnię (PaCO2 >= 45 mmHg w spoczynku)', 'Przewlekła hipowentylacja pęcherzykowa z retencją CO2 na jawie jest kardynalnym kryterium OHS.'],
        ['Tomografia emisyjna klatki piersiowej z galem-68', 'PET z galem służy do wykrywania guzów neuroendokrynnych, nie bada wentylacji.'],
        ['Oznaczenie stężenia troponiny sercowej o wysokiej czułości', 'Troponiny diagnozują martwicę kardiomiocytów w zawale serca.'],
      ),
      q(
        'Dlaczego u pacjentów z otyłością stężenia biomarkerów niewydolności serca (BNP i NT-proBNP) są często fałszywie zaniżone?',
        ['Tkanka tłuszczowa wykazuje nadekspresję receptorów zmiatających NPR-C oraz nasila klirens peptydów natriuretycznych', 'Z tego względu punkty odcięcia BNP w diagnostyce HFpEF u osób z otyłością należy obniżyć o około 50%.'],
        ['W otyłości komory serca tracą zdolność syntezy jakichkolwiek białek', 'Miokardium zachowuje ekspresję BNP, lecz hormon jest szybciej usuwany z krążenia.'],
        ['Otyłość blokuje filtrację kłębuszkową w nerkach, zatrzymując peptydy w komórkach cewek', 'Zaburzenia nerkowe podwyższają stężenie peptydów natriuretycznych, a nie je obniżają.'],
      ),
      q(
        'Jaki wskaźnik laboratoryjny w rutynowej jonogramie może służyć jako prosty test przesiewowy nasuwający podejrzenie przewlekłej retencji CO2 w OHS?',
        ['Podwyższone stężenie wodorowęglanów w surowicy (HCO3- >= 27 mmol/l)', 'Nerki kompensują przewlekłą kwasicę oddechową poprzez retencję wodorowęglanów.'],
        ['Ciężka hiperkaliemia > 7,0 mmol/l', 'Hiperkaliemia zagraża zatrzymaniem krążenia, nie jest swoistym markerem kompensacji OHS.'],
        ['Skrajnie obniżone stężenie sodu < 110 mmol/l', 'Ciężka hiponatremia wskazuje na SIADH lub zatrucie wodne.'],
      ),
      q(
        'Jaki wynik wskaźnika bezdechów i spłyceń (AHI) w badaniu polisomnograficznym definiuje obturacyjny bezdech senny o stopniu ciężkim?',
        ['AHI >= 30 epizodów na godzinę snu', 'Wartość >= 30/h oznacza ciężki OSAS z bardzo wysokim ryzykiem powikłań sercowo-naczyniowych.'],
        ['AHI pomiędzy 1 a 4/h', 'Wartość poniżej 5/h mieści się w granicach normy fizjologicznej.'],
        ['AHI równe dokładnie 0/h', 'Zero epizodów to stan idealny bez jakichkolwiek bezdechów.'],
      ),
      q(
        'Jaki aparat i tryb wentylacji stanowi leczenie pierwszego wyboru u pacjentów z OHS i współistniejącym ciężkim bezdechem sennym (OSAS-OHS)?',
        ['Dodatnie ciśnienie w drogach oddechowych (CPAP lub dwupoziomowe BiPAP w razie przetrwałej hiperkapnii)', 'Aparat utrzymuje drożność górnych dróg oddechowych i wspomaga wentylację pęcherzykową.'],
        ['Domowa tlenoterapia bierna wąsami tlenowymi (2 l/min) bez aparatu ciśnieniowego', 'Podanie samego tlenu bez wsparcia ciśnieniowego może nasilić hiperkapnię i wywołać śpiączkę hiperkapniczną.'],
        ['Inhalacje z leków mukolitycznych 3 razy dziennie', 'Mukolityki upłynniają wydzielinę, nie korygują zapadania się gardła ani hipowentylacji.'],
      ),
    ],
  },
  {
    id: 'otylosc-powiklania-mechaniczne-nowotwory',
    title: 'Powikłania mechaniczne, rozrodcze i onkologiczne choroby otyłościowej',
    group: 'Powikłania narządowe i kardiometaboliczne',
    readTime: '13 min',
    goals: [
      'Zrozumieć patomechanizm choroby zwyrodnieniowej stawów: przeciążenie biomechaniczne vs zapalenie indukowane adipokinami.',
      'Scharakteryzować zaburzenia płodności: zespół policystycznych jajników (PCOS) u kobiet i hipogonadyzm hipogonadotropowy u mężczyzn (MOSH).',
      'Poznać 13 nowotworów złośliwych o udowodnionym związku etiologicznym z otyłością wg IARC/WHO.',
    ],
    sections: [
      {
        title: 'Powikłania mechaniczne: choroba zwyrodnieniowa stawów (ChZS) i refluks (GERD)',
        content:
          'Choroba zwyrodnieniowa stawów (osteoarthritis, OA) w otyłości dotyczy nie tylko stawów nośnych (kolana, biodra, kręgosłup), gdzie każdy dodatkowy kilogram masy ciała generuje siłę nacisku 4 kg na staw kolanowy, ale również stawów rąk. Dowodzi to, że obok przeciążenia biomechanicznego kluczową rolę odgrywa układowe zapalenie wywołane prozapalnymi adipokinami (leptyna, rezystyna, wisfatyna) degradującymi macierz chrzęstną. Wzrost ciśnienia wewnątrzbrzusznego sprzyja powstawaniu przepukliny rozworu przełykowego i refluksu żołądkowo-przełykowego (GERD), zwiększając ryzyko przełyku Barretta i gruczolakoraka przełyku.',
      },
      {
        title: 'Zaburzenia rozrodu: PCOS u kobiet i zespół MOSH u mężczyzn',
        content:
          'U kobiet otyłość nasila insulinooporność, stymulując komórki osłonki jajnika (theca) do nadprodukcji androgenów i obniżając stężenie SHBG w wątrobie, co podbija wolny testosteron i wywołuje brak owulacji w PCOS. U mężczyzn tkanka tłuszczowa wykazuje wysoką ekspresję enzymu aromatazy (CYP19A1), która przekształca testosteron w estradiol. Nadmiar krążącego estradiolu hamuje wydzielanie GnRH i gonadotropin (LH/FSH) w przysadce na zasadzie ujemnego sprzężenia zwrotnego, prowadząc do otyłościowego hipogonadyzmu wtórnego (Male Obesity-Secondary Hypogonadism, MOSH), spadku libido, zaburzeń erekcji i oligospermii.',
      },
      {
        title: 'Onkologia metaboliczna: 13 nowotworów zależnych od otyłości wg IARC',
        content:
          'Międzynarodowa Agencja Badań nad Rakiem (IARC/WHO) potwierdziła bezpośredni związek etiologiczny otyłości z 13 nowotworami złośliwymi: rak trzonu macicy (endometrium — wzrost ryzyka aż 4–7-krotny), gruczolakorak przełyku, rak jelita grubego i odbytnicy, rak piersi u kobiet po menopauzie, rak trzustki, rak nerki (nerkowokomórkowy RCC), rak wątroby (HCC), rak żołądka (części wpustowej), rak pęcherzyka żółciowego, rak jajnika, rak tarczycy, oponiak oraz szpiczak mnogi. Głównymi motorami kancerogenezy są: obwodowa hiperestrogenemia (aromatyzacja), hiperinsulinemia z aktywacją receptorów IGF-1R pobudzających proliferację oraz przewlekły stan zapalny tkanki tłuszczowej.',
      },
    ],
    table: {
      caption: 'Mechanizmy onkogenezy zależnej od otyłości i narządy docelowe',
      headers: ['Szlak molekularny', 'Główny mediator', 'Nowotwory o najwyższym wzroście ryzyka'],
      rows: [
        ['Aromatyzacja androgenów', 'Estradiol (nieskrępowany progesteronem)', 'Rak endometrium (4-7x), rak piersi po menopauzie'],
        ['Oś insulina — IGF-1', 'Insulina, wolny IGF-1, spadek IGFBP-1/2', 'Rak jelita grubego, rak trzustki, rak nerki (RCC)'],
        ['Stan zapalny tkanki tłuszczowej', 'TNF-alpha, IL-6, leptyna, spadek adiponektyny', 'Rak wątroby (HCC w przebiegu MASLD/MASH), szpiczak mnogi'],
        ['Mechaniczny refluks kwasowy', 'Przewlekłe zarzucanie treści żołądkowej', 'Gruczolakorak przełyku (na podłożu przełyku Barretta)'],
      ],
    },
    advanced:
      'W zespole MOSH (Male Obesity-Secondary Hypogonadism) redukcja masy ciała o >= 10% (dietetyczna, farmakologiczna lub bariatryczna) przywraca eugonadyzm u ponad 70% mężczyzn bez konieczności stosowania substytucji testosteronem (TRT). Zmniejszenie puli tłuszczu trzewnego redukuje aktywność aromatazy, znosi hamowanie osi HPG przez estradiol i pozwala na normalizację endogennego wydzielania LH i syntezy testosteronu w komórkach Leydiga.',
    summary:
      'Otyłość niszczy stawy mechanicznie i poprzez adipokiny. U kobiet napędza PCOS, a u mężczyzn hipogonadyzm MOSH przez aromatazę. Zgodnie z IARC otyłość odpowiada za 13 nowotworów (szczególnie raka endometrium, jelita grubego i nerek).',
    sourceIds: ['easo-2024', 'aace-abcd-2024'],
    questions: [
      q(
        'Który nowotwór złośliwy wykazuje najsilniejszy wzrost względnego ryzyka rozwoju (nawet 4–7-krotny) u kobiet z otyłością olbrzymią?',
        ['Rak trzonu macicy (rak endometrium)', 'Stała ekspozycja błony śluzowej na estrogeny z aromatyzacji przy braku równoważącego progesteronu prowadzi do hiperplazji i raka.'],
        ['Rak drobnokomórkowy płuca (SCLC)', 'Rak drobnokomórkowy płuca jest ściśle zależny od dymu tytoniowego, a nie od otyłości.'],
        ['Kostniakomięsak (osteosarcoma)', 'Mięsaki kości nie wykazują związku etiologicznego z tkanką tłuszczową.']
      ),
      q(
        'Jaki jest mechanizm powstawania hipogonadyzmu wtórnego u otyłych mężczyzn (zespół MOSH)?',
        ['Wysoka ekspresja aromatazy w tkance tłuszczowej przekształca testosteron w estradiol, który hamuje wydzielanie LH i FSH w przysadce', 'Zwiększone stężenie estrogenów blokuje oś podwzgórze-przysadka na zasadzie ujemnego sprzężenia zwrotnego.'],
        ['Bezpośrednie niszczenie komórek Leydiga przez przeciwciała anty-TPO', 'Anty-TPO atakują tarczycę, nie mają związku z jądrami.'],
        ['Zablokowanie przepływu krwi w tętnicy jądrowej przez blaszki miażdżycowe', 'MOSH jest zaburzeniem neuroendokrynnym osi HPG, a nie zawałem jądra.']
      ),
      q(
        'Dlaczego choroba zwyrodnieniowa stawów (OA) u osób z otyłością rozwija się również w stawach rąk, które nie przenoszą ciężaru ciała?',
        ['Wskutek układowego działania prozapalnych adipokin (np. leptyny i cytokin) niszczących chrząstkę stawową drogą krążenia', 'Stan zapalny o niskim nasileniu generowany przez trzewną tkankę tłuszczową przyspiesza degradację proteoglikanów w całym ustroju.'],
        ['Przez odkładanie się soli kwasu moczowego w pochewkach ścięgnistych palców', 'Odkładanie moczanów definiuje dnę moczanową, a nie chorobę zwyrodnieniową stawów.'],
        ['Z powodu zaburzeń syntezy kolagenu wywołanych niedoborem witaminy C', 'Szkorbut jest chorobą z niedoboru pokarmowego, nie mechanizmem otyłościowego OA.']
      ),
      q(
        'Ile typów nowotworów złośliwych zostało oficjalnie uznanych przez IARC/WHO za wykazujące bezpośredni związek przyczynowo-skutkowy z nadmiarem tkanki tłuszczowej?',
        ['13 typów nowotworów', 'W tym m.in. rak endometrium, jelita grubego, nerki, trzustki, pęcherzyka żółciowego i rak piersi po menopauzie.'],
        ['Tylko 1 typ nowotworu (wyłącznie tłuszczakomięsak)', 'Tłuszczakomięsak jest rzadkim mięsakiem tkanek miękkich, otyłość sprzyja licznym powszechnym rakom nabłonkowym.'],
        ['Ponad 100 typów nowotworów bez wyjątku', 'IARC wyselekcjonowała ściśle 13 nowotworów o udowodnionych mechanizmach kancerogenezy.']
      ),
      q(
        'Jakie postępowanie lecznicze pozwala przywrócić eugonadyzm u większości mężczyzn z zespołem MOSH?',
        ['Skuteczna redukcja masy ciała o co najmniej 10% (dieta, analogi inkretyn lub chirurgia bariatryczna)', 'Spadek masy tłuszczowej redukuje aktywność aromatazy i odblokowuje przysadkowy wyrzut gonadotropin.'],
        ['Bezterminowa suplementacja megadawkami witaminy E', 'Witamina E nie wpływa na neuroendokrynną oś przysadka-gonada.'],
        ['Całkowite usunięcie tkanki tłuszczowej metodą liposukcji estetycznej', 'Liposukcja usuwa jedynie podskórny tłuszcz powierzchowny, nie wpływając na metabolicznie aktywny tłuszcz trzewny.']
      ),
    ],
  },
  {
    id: 'otylosc-leki-inkretynowe-glp1',
    title: 'Agoniści receptora GLP-1: liraglutyd 3.0 mg, semaglutyd 2.4 mg i badanie SELECT',
    group: 'Farmakoterapia otyłości',
    readTime: '13 min',
    goals: [
      'Znać mechanizm działania, farmakokinetykę i schemat eskalacji dawek liraglutydu (3.0 mg) i semaglutydu (2.4 mg).',
      'Zrozumieć wyniki badań klinicznych STEP oraz przełomowe dane kardioprotekcyjne z badania SELECT.',
      'Opanować profilaktykę i postępowanie w działaniach niepożądanych ze strony przewodu pokarmowego.',
    ],
    sections: [
      {
        title: 'Mechanizm działania i farmakologia agonistów GLP-1RA w otyłości',
        content:
          'Endogenny GLP-1 ma czas półtrwania wynoszący zaledwie 1–2 minuty z powodu szybkiego rozkładu przez dipeptydylopeptydazę 4 (DPP-4). Liraglutyd (podawany s.c. raz na dobę) zawiera łańcuch kwasu tłuszczowego C16, co zapewnia wiązanie z albuminą i wydłuża t1/2 do 13 godzin. Semaglutyd (podawany s.c. raz w tygodniu) posiada łańcuch dikwasu dikarboksylowego C18 oraz substytucję Aib8, co czyni go całkowicie opornym na DPP-4 i wydłuża t1/2 do 168 godzin (7 dni). W dawkach stosowanych w otyłości (liraglutyd 3,0 mg/d; semaglutyd 2,4 mg/tydz.) leki te penetrują pole najdalsze (area postrema) i jądro pasma samotnego (NTS), hamując ośrodek głodu, potęgując sytość oraz zwalniając opróżnianie żołądka.',
      },
      {
        title: 'Skuteczność kliniczna: program badań STEP i badanie SELECT',
        content:
          'W programie badań STEP (STEP 1–8) u pacjentów bez cukrzycy stosowanie semaglutydu w dawce 2,4 mg/tydz. w połączeniu z modyfikacją stylu życia doprowadziło po 68 tygodniach do średniej redukcji masy ciała o 14,9% (wobec 2,4% w grupie placebo), przy czym ponad 30% chorych osiągnęło spadek masy ciała >= 20%. Przełomem w medycynie kardiometabolicznej było badanie SELECT (17 604 pacjentów z nadwagą/otyłością i chorobą sercowo-naczyniową bez cukrzycy): semaglutyd 2,4 mg zredukował ryzyko głównych niepożądanych zdarzeń sercowo-naczyniowych (MACE: zgon sercowo-naczyniowy, zawał serca, udar mózgu) aż o 20% (HR = 0,80; p < 0,001).',
      },
      {
        title: 'Bezpieczeństwo i zasady eskalacji dawek',
        content:
          'Najczęstszymi działaniami niepożądanymi są nudności, wymioty, biegunka lub zaparcia, wynikające ze spowolnienia motoryki żołądka. Aby zminimalizować te objawy, semaglutyd wprowadza się w rygorystycznym 4-tygodniowym schemacie eskalacji: 0,25 mg -> 0,5 mg -> 1,0 mg -> 1,7 mg -> docelowo 2,4 mg podskórnie raz w tygodniu. Pacjenci powinni zmniejszyć objętość pojedynczych posiłków, unikać tłustych potraw i dbać o nawodnienie. Do rzadkich powikłań należą: kamica pęcherzyka żółciowego (wynikająca z szybkiego spadku wagi i zastoju żółci), ostre zapalenie trzustki oraz zaostrzenie retinopatii cukrzycowej przy zbyt gwałtownej normalizacji glikemii.',
      },
    ],
    table: {
      caption: 'Porównanie agonistów receptora GLP-1 zarejestrowanych w leczeniu otyłości',
      headers: ['Cząsteczka', 'Nazwa handlowa / Dawka docelowa', 'Średnia redukcja masy ciała', 'Główne dowody kliniczne'],
      rows: [
        ['Liraglutyd', 'Saxenda (3,0 mg s.c. 1x/d)', '~8,0% (vs placebo ~2,6%)', 'Program badań SCALE (redukcja ryzyka T2D o 80%)'],
        ['Semaglutyd', 'Wegovy (2,4 mg s.c. 1x/tydz.)', '~15,0% (vs placebo ~2,4%)', 'Program STEP 1-8, badanie kardiologiczne SELECT (MACE -20%)'],
        ['Tirzepatyd', 'Zepbound (do 15 mg 1x/tydz.)', '~20,9% - 22,5%', 'Program SURMOUNT 1-4 (podwójny agonista GLP-1/GIP)'],
      ],
    },
    advanced:
      'Leki z grupy GLP-1RA są przeciwwskazane u chorych z osobniczym lub rodzinnym wywiadem w kierunku raka rdzeniastego tarczycy (MTC) oraz w zespole mnogiej gruczolakowatości wewnątrzwydzielniczej typu 2 (MEN2). W badaniach na gryzoniach długotrwała aktywacja GLP-1R stymulowała hiperplazję komórek C tarczycy i guzy nowotworowe. Choć u ludzi gęstość receptorów GLP-1R na komórkach C jest znikoma i w badaniach klinicznych (w tym SELECT) nie odnotowano wzrostu zachorowań na MTC, agencje FDA i EMA utrzymały to ostrzeżenie w charakterze środka ostrożności.',
    summary:
      'Semaglutyd 2.4 mg raz w tygodniu redukuje masę ciała o ~15% i zmniejsza ryzyko MACE o 20% (badanie SELECT). Eskalacja dawki co 4 tygodnie chroni przed nudnościami. Leki GLP-1 są przeciwwskazane w wywiadzie w kierunku raka rdzeniastego tarczycy i MEN2.',
    sourceIds: ['ada-obesity-2024', 'easo-2024'],
    questions: [
      q(
        'Jaki kluczowy wynik w zakresie punktu końcowego MACE przyniosło badanie SELECT dla semaglutydu w dawce 2,4 mg?',
        ['Zmniejszenie ryzyka zgonu sercowo-naczyniowego, zawału serca i udaru mózgu o 20% u osób z nadwagą/otyłością bez cukrzycy', 'Badanie SELECT udowodniło, że leczenie otyłości semaglutydem bezpośrednio ratuje życie i zmniejsza powikłania sercowo-naczyniowe.'],
        ['Brak jakiegokolwiek wpływu na układ krążenia przy redukcji masy ciała', 'Wyniki wykazały statystycznie znamienną kardioprotekcję (HR = 0,80).'],
        ['Zwiększenie ryzyka zawału serca o 15%', 'Lek zmniejsza, a nie zwiększa ryzyko incydentów wieńcowych.']
      ),
      q(
        'W jakim schemacie czasowym przeprowadza się standardową eskalację dawki semaglutydu (Wegovy) w leczeniu otyłości?',
        ['Zwiększanie dawki co 4 tygodnie (0,25 mg -> 0,5 mg -> 1,0 mg -> 1,7 mg -> 2,4 mg raz w tygodniu)', 'Stopniowe miareczkowanie pozwala na adaptację przewodu pokarmowego i zapobiega nudnościom oraz wymiotom.'],
        ['Rozpoczęcie od razu od pełnej dawki docelowej 2,4 mg od pierwszego dnia', 'Pominięcie eskalacji wywołałoby ciężkie nudności, wymioty i odwodnienie.'],
        ['Podawanie leku wyłącznie doraźnie raz w miesiącu po obfitym posiłku', 'Semaglutyd wymaga stałego, cotygodniowego stosowania w celu utrzymania stężenia stacjonarnego.']
      ),
      q(
        'Który stan chorobowy stanowi bezwzględne przeciwwskazanie do stosowania agonistów receptora GLP-1 zgodnie z charakterystyką produktu leczniczego?',
        ['Osobisty lub rodzinny wywiad w kierunku raka rdzeniastego tarczycy (MTC) lub zespół MEN2', 'Związane z ostrzeżeniem o potencjalnej stymulacji komórek C tarczycy obserwowanym w modelach gryzoni.'],
        ['Obturacyjny bezdech senny (OSAS)', 'OSAS jest wskazaniem do redukcji masy ciała za pomocą GLP-1, nie przeciwwskazaniem.'],
        ['Stłuszczenie wątroby (MASLD)', 'MASLD odnosi wybitne korzyści terapeutyczne z leczenia analogami GLP-1.']
      ),
      q(
        'Dlaczego u pacjentów szybko tracących masę ciała pod wpływem agonistów GLP-1 rośnie ryzyko kamicy pęcherzyka żółciowego?',
        ['Szybka mobilizacja cholesterolu z tkanek do żółci połączona ze spowolnieniem motoryki i opróżniania pęcherzyka żółciowego', 'Przesycenie żółci cholesterolem i cholestaza sprzyjają krystalizacji złogów żółciowych.'],
        ['Bezpośrednie wytrącanie się cząsteczek peptydu semaglutydu w przewodzie pęcherzykowym', 'Lek nie jest wydalany z żółcią w postaci krystalicznej.'],
        ['Gwałtowny spadek stężenia kwasów żółciowych we krwi do zera', 'Zjawisko wynika ze zmienionego składu żółci i hipomotoryki pęcherzyka.']
      ),
      q(
        'Jaka modyfikacja strukturalna cząsteczki semaglutydu odpowiada za jego przedłużony czas półtrwania (około 7 dni)?',
        ['Dołączenie hydrofobowego łańcucha dikwasu tłuszczowego C18 z łącznikiem glutaminianowym, umożliwiające odwracalne wiązanie z albuminą', 'Silne wiązanie z albuminą osocza chroni peptyd przed filtracją kłębuszkową i degradacją enzymatyczną.'],
        ['Wprowadzenie atomu platyny w rdzeń cząsteczki', 'Semaglutyd nie zawiera metali ciężkich.'],
        ['Hermetyzacja peptydu w liposomach z polietylenoglikolu (PEG)', 'Semaglutyd jest rozpuszczalnym analogiem peptydowym z łańcuchem tłuszczowym, nie formą pegylowaną.']
      ),
    ],
  },
  {
    id: 'otylosc-podwojni-potrojni-agonisci',
    title: 'Podwójni i potrójni agoniści: tirzepatyd (GLP-1/GIP), retatrutyd i nowe cząsteczki',
    group: 'Farmakoterapia otyłości',
    readTime: '13 min',
    goals: [
      'Zrozumieć koncepcję podwójnego agonizmu receptorów GLP-1 i GIP (twincretins) na przykładzie tirzepatydu.',
      'Przeanalizować wyniki programu badań SURMOUNT wykazujące redukcję masy ciała przekraczającą 20%.',
      'Poznać mechanizm potrójnego agonisty GLP-1/GIP/glukagon (retatrutyd) oraz koagonistów amylinowych (CagriSema).',
    ],
    sections: [
      {
        title: 'Tirzepatyd: synergizm fizjologiczny receptorów GLP-1 i GIP',
        content:
          'Tirzepatyd to syntetyczny 39-aminokwasowy peptyd zmodyfikowany kwasem tłuszczowym C20, będący pierwszym podwójnym agonistą receptorów glukagonopodobnego peptydu 1 (GLP-1R) oraz glukozozależnego peptydu insulinotropowego (GIPR). Wykazuje powinowactwo do receptora GIP równe natywnemu hormonowi, a do receptora GLP-1 około 5-krotnie mniejsze. Aktywacja GIPR w tkance tłuszczowej poprawia przepływ krwi przez tkankę tłuszczową, zwiększa jej elastyczność i magazynowanie lipidów, zapobiegając ektopowemu odkładaniu tłuszczu w wątrobie i mięśniach. W podwzgórzu sygnalizacja GIPR potęguje działanie anoreksygenne GLP-1R, jednocześnie łagodząc indukowane przez GLP-1 nudności.',
      },
      {
        title: 'Skuteczność kliniczna tirzepatydu: program badań SURMOUNT',
        content:
          'W badaniu SURMOUNT-1 u 2539 pacjentów z otyłością (bez cukrzycy) stosowanie tirzepatydu w najwyższej dawce 15 mg podskórnie raz w tygodniu przez 72 tygodnie doprowadziło do bezprecedensowej średniej redukcji masy ciała o 20,9% (wobec 3,1% dla placebo), a w analizie adherentnej aż o 22,5% (ubytek średnio 24 kg). Aż 63% pacjentów na dawce 15 mg osiągnęło redukcję masy ciała >= 20%, a u 95% chorych ze stanem przedcukrzycowym doszło do normoglikemii. W badaniach SURMOUNT-2 (z cukrzycą T2D), SURMOUNT-3 i 4 potwierdzono dominację tirzepatydu nad dotychczasowymi terapiami jednoinwazyjnymi.',
      },
      {
        title: 'Potrójni agoniści (retatrutyd) i analogi amyliny (CagriSema)',
        content:
          'Horyzont farmakoterapii wyznaczają potrójni agoniści (tri-agonists). Retatrutyd pobudza trzy receptory: GLP-1R, GIPR oraz receptor dla glukagonu (GCGR). Komponent glukagonowy bezpośrednio nasila wydatek energetyczny poprzez stymulację termogenezy wątrobowej i lipolizy. W badaniach II fazy retatrutyd w dawce 12 mg wywołał spadek masy ciała o 24,2% w 48 tygodni oraz eliminację ponad 85% tłuszczu wątrobowego u chorych z MASLD. Innym obiecującym skojarzeniem jest CagriSema — preparat łączący semaglutyd z kagrilintydem (długodziałającym analogiem amyliny i kalcytoniny działającym w polu najdalszym mózgu).',
      },
    ],
    table: {
      caption: 'Porównanie zaawansowanych terapii wieloreceptorowych w otyłości',
      headers: ['Lek / Związek', 'Receptory docelowe', 'Maksymalny średni spadek masy ciała', 'Unikalny mechanizm biologiczny'],
      rows: [
        ['Semaglutyd (Wegovy)', 'GLP-1R (mono-agonista)', '~15,0% (68 tyg.)', 'Ośrodkowa sytość, opóźnienie opróżniania żołądka'],
        ['Tirzepatyd (Zepbound)', 'GLP-1R + GIPR (dual-agonista)', '~20,9% – 22,5% (72 tyg.)', 'Synergizm w podwzgórzu, poprawa metabolizmu tkanki tłuszczowej'],
        ['Retatrutyd', 'GLP-1R + GIPR + GCGR (tri-agonista)', '~24,2% (48 tyg.)', 'Komponent glukagonowy zwiększa wydatek energetyczny i usuwa stłuszczenie wątroby'],
        ['CagriSema', 'GLP-1R + Amylina/Kalcytonina', '~15,6% (wczesna faza)', 'Równoczesna stymulacja dwóch odrębnych szlaków sytości w mózgowiu'],
      ],
    },
    advanced:
      'Włączenie agonizmu receptora glukagonowego (GCGR) w retatrutydzie budziło początkowo obawy o hiperglikemię (glukagon stymuluje glikogenolizę i glukoneogenezę w wątrobie). Okazało się jednak, że równoczesna potężna aktywacja receptorów GLP-1R i GIPR doskonale równoważy działanie hiperglikemizujące poprzez wyrzut endogennej insuliny, podczas gdy kataboliczny wpływ glukagonu na utlenianie kwasów tłuszczowych w mitochondriach wątroby prowadzi do spektakularnego spadku zawartości tłuszczu w wątrobie (steatosis score) bez pogorszenia glikemii.',
    summary:
      'Tirzepatyd (GLP-1/GIP) osiąga > 20% redukcji masy ciała dzięki synergizmowi ośrodkowemu i metabolicznemu. Retatrutyd (potrójny agonista z glukagonem) nasila wydatek energetyczny i cofa stłuszczenie wątroby, a CagriSema łączy GLP-1 z amyliną.',
    sourceIds: ['ada-obesity-2024', 'easo-2024'],
    questions: [
      q(
        'Które dwa receptory hormonalne aktywuje cząsteczka tirzepatydu (Zepbound/Mounjaro)?',
        ['Receptor GLP-1 oraz receptor GIP (glukozozależnego peptydu insulinotropowego)', 'Tirzepatyd jest pierwszym klinicznie zatwierdzonym podwójnym agonistą inkretynowym (tzw. twincretin).'],
        ['Receptor insuliny oraz receptor glukagonu', 'Tirzepatyd nie wiąże się bezpośrednio z receptorem insulinowym.'],
        ['Receptor leptyny oraz receptor melanokortyny 4', 'Działa na obwodowe i ośrodkowe receptory jelitowe, a nie bezpośrednio na receptor leptynowy.']
      ),
      q(
        'Jaki średni ubytek masy ciała osiągają pacjenci stosujący najwyższą dawkę tirzepatydu (15 mg) w badaniach SURMOUNT-1?',
        ['Około 21–22,5% wyjściowej masy ciała', 'Jest to skuteczność zbliżająca się do wyników klasycznej rękawowej resekcji żołądka (LSG).'],
        ['Dokładnie 5% masy ciała', '5% to próg minimalnej skuteczności klinicznej leków starej generacji.'],
        ['Powyżej 50% masy ciała', 'Żadna monoterapia farmakologiczna nie indukuje utraty połowy masy ciała pacjenta.']
      ),
      q(
        'Jaki dodatkowy efekt metaboliczny wnosi komponent agonizmu receptora glukagonowego (GCGR) w potrójnym agoniście — retatrutydzie?',
        ['Zwiększa podstawowy wydatek energetyczny organizmu i przyspiesza utlenianie tłuszczu w wątrobie', 'Glukagon bezpośrednio stymuluje termogenezę i katabolizm kwasów tłuszczowych w hepatocytach.'],
        ['Całkowicie blokuje wydzielanie insuliny przez komórki beta trzustki', 'Wydzielanie insuliny jest stymulowane przez składowe GLP-1 i GIP retatrutydu.'],
        ['Wywołuje nieodwracalną martwicę adipocytów podskórnych', 'Retatrutyd mobilizuje lipidy, nie niszczy komórek tłuszczowych w mechanizmie martwicy.']
      ),
      q(
        'Dlaczego aktywacja receptora GIPR przez tirzepatyd zmniejsza nasilenie nudności wywoływanych przez stymulację GLP-1R?',
        ['Sygnalizacja GIP w pniu mózgu (pole najdalsze) moduluje obwody wymiotne i tonizuje pobudzenie wywołane przez GLP-1', 'Dzięki temu tirzepatyd cechuje się lepszą tolerancją przewodu pokarmowego w przeliczeniu na stopień redukcji masy ciała.'],
        ['GIP trwale paraliżuje nerw błędny', 'GIP nie uszkadza nerwu błędnego, jedynie moduluje przekaźnictwo synaptyczne.'],
        ['GIP neutralizuje kwas solny w świetle żołądka jak lek alkalizujący', 'GIP jest neuropeptydem, nie ma właściwości chemicznie zobojętniających kwas.']
      ),
      q(
        'Które dwa leki wchodzą w skład preparatu złożonego CagriSema?',
        ['Semaglutyd (analog GLP-1) oraz kagrilintyd (długodziałający analog amyliny)', 'Skojarzenie to atakuje ośrodek sytości dwoma odrębnymi szlakami neurohormonalnymi.'],
        ['Liraglutyd oraz metformina', 'To tradycyjne połączenie, a nie nowoczesna formulacja CagriSema.'],
        ['Tirzepatyd oraz orlistat', 'Orlistat jest inhibitorem lipazy jelitowej, nie wchodzi w skład CagriSema.']
      ),
    ],
  },
];
