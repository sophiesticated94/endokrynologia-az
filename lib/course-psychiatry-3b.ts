import { type DraftLesson, q } from './course-types.ts';

export const draftPsychiatryPart3b: DraftLesson[] = [
  {
    id: 'atypowe-antydepresanty-multimodalne',
    moduleId: 'psych-farmakologia',
    title: 'Atypowe i multimodalne leki przeciwdepresyjne',
    subtitle: 'Bupropion, mirtazapina, trazodon i wortioksetyna w spersonalizowanym leczeniu',
    group: 'Farmakoterapia zaburzeń afektywnych',
    minutes: 18,
    goals: [
      'Dobierzesz lek przeciwdepresyjny pod kątem fenotypu objawowego (anhedonia, bezsenność, lęk, dysfunkcje seksualne).',
      'Wyjaśnisz mechanizm NDRI bupropionu i brak negatywnego wpływu na masę ciała i sferę seksualną.',
      'Scharakteryzujesz działanie NaSSA mirtazapiny (antagonizm alfa-2 i 5-HT2/3) oraz SARI trazodonu.'
    ],
    sections: [
      {
        title: 'Bupropion (NDRI): aktywacja dopaminergiczna bez serotoniny',
        text: 'Bupropion hamuje wychwyt zwrotny noradrenaliny i dopaminy (NDRI). Jest lekiem z wyboru u pacjentów z dominującą anhedonią, apatią, zmęczeniem, spowolnieniem psychoruchowym oraz u osób obawiających się dysfunkcji seksualnych i przyrostu masy ciała (bupropion sprzyja redukcji wagi). Głównym przeciwwskazaniem jest padaczka oraz zaburzenia odżywiania (bulimia, jadłowstręt) z uwagi na obniżanie progu drgawkowego.'
      },
      {
        title: 'Mirtazapina (NaSSA): odhamowanie noradrenergiczne i sedacja',
        text: 'Mirtazapina jest noradrenergicznym i specyficznie serotoninergicznym lekiem przeciwdepresyjnym (NaSSA). Działa jako antagonista presynaptycznych autoreceptorów i heteroreceptorów alfa-2 adrenergicznych, co odhamowuje wyrzut NA i 5-HT. Ponadto blokuje receptory 5-HT2A, 5-HT2C, 5-HT3 i silnie H1. Zapewnia to szybki efekt nasenny i przeciwlękowy oraz stymulację apetytu (korzystne u pacjentów wyniszczonych i z ciężką bezsennością).'
      },
      {
        title: 'Trazodon (SARI) i leki multimodalne',
        text: 'Trazodon w niskich dawkach (25–100 mg) działa jako antagonista 5-HT2A i H1 oraz inhibitor wychwytu 5-HT (SARI), będąc lekiem z wyboru w bezsenności towarzyszącej depresji bez potencjału uzależniającego. Wortioksetyna łączy blokadę SERT z wieloma celami receptorowymi, poprawiając funkcje wykonawcze i pamięć roboczą u pacjentów w każdym wieku.'
      }
    ],
    table: {
      headers: ['Lek', 'Mechanizm receptorowy', 'Wpływ na wagę / libido', 'Główne wskazanie fenotypowe'],
      rows: [
        ['Bupropion', 'Hamowanie DAT i NET (NDRI)', 'Neutralny lub spadek wagi / brak dysfunkcji seksualnych', 'Apatia, anhedonia, rzucanie palenia, zmęczenie'],
        ['Mirtazapina', 'Antagonizm alfa-2, 5-HT2A, 5-HT2C, 5-HT3, H1 (NaSSA)', 'Silny przyrost masy ciała / brak dysfunkcji seksualnych', 'Ciężka bezsenność, brak apetytu, depresja lękowa'],
        ['Trazodon', 'Antagonizm 5-HT2A, 5-HT2C, alfa-1, H1 + słaby SERT (SARI)', 'Neutralny / rzadko priapizm', 'Depresja ze skrajną bezsennością, architektonika snu'],
        ['Wortioksetyna', 'Hamowanie SERT + agonizm 5-HT1A + antagonizm 5-HT3/7', 'Neutralny / minimalny wpływ na libido', 'Depresja z dominującymi deficytami poznawczymi']
      ]
    },
    advanced:
      'W przypadku mirtazapiny w dawkach niskich (7,5–15 mg) dominuje działanie antyhistaminowe H1 (silna sedacja i senność). W dawkach wyższych (30–45 mg) nasila się toniczna transmisja noradrenergiczna przez blokadę alfa-2, co może paradoksalnie zmniejszać sedację poranną na korzyść działania aktywizującego.',
    summary:
      'Leki atypowe pozwalają na leczenie celowane fenotypowo: bupropion aktywizuje bez dysfunkcji seksualnych, mirtazapina leczy bezsenność i anoreksję, trazodon przywraca architekturę snu, a wortioksetyna usprawnia procesy poznawcze.',
    sourceIds: ['canmat-mdd-2023', 'stahl-essential', 'nice-depression'],
    questions: [
      q(
        'Który lek przeciwdepresyjny jest lekiem I rzutu u pacjenta cierpiącego na depresję z ciężką apatią, który obawia się zaburzeń erekcji i przyrostu masy ciała?',
        ['Bupropion', 'Jako inhibitor wychwytu noradrenaliny i dopaminy nie wywołuje dysfunkcji seksualnych ani tycia.'],
        ['Paroksetyna', 'Paroksetyna najsilniej spośród SSRI wywołuje dysfunkcje seksualne i sprzyja tyciu.'],
        ['Mirtazapina', 'Mirtazapina silnie stymuluje łaknienie i prowadzi do przyrostu masy ciała.'],
        'psych-atyp-q1'
      ),
      q(
        'Jakie schorzenia stanowią bezwzględne przeciwwskazanie do stosowania bupropionu z uwagi na obniżanie progu drgawkowego?',
        ['Padaczka oraz aktywne zaburzenia odżywiania (bulimia, anorexia nervosa)', 'U pacjentów z zaburzeniami odżywiania ryzyko napadu drgawkowego na bupropionie jest wielokrotnie wyższe.'],
        ['Krótkowzroczność i łupież', 'Schorzenia te nie mają żadnego związku z metabolizmem bupropionu.'],
        ['Łagodne nadciśnienie tętnicze dobrze kontrolowane jednym lekiem', 'Kontrolowane nadciśnienie wymaga jedynie monitorowania RR, nie jest bezwzględnym zakazem.'],
        'psych-atyp-q2'
      ),
      q(
        'Dlaczego mirtazapina w dawce 15 mg działa silniej nasennie niż w wyższej dawce 45 mg?',
        ['W niskiej dawce dominuje wysokie powinowactwo do receptorów H1, natomiast w wyższej przeważa aktywujący wyrzut noradrenaliny przez blokadę alfa-2', 'Transmisja noradrenergiczna w wyższych dawkach przeciwdziała sedacji antyhistaminowej.'],
        ['W dawce 45 mg lek przestaje wchłaniać się w jelicie cienkim', 'Mirtazapina wchłania się liniowo w całym zakresie dawek.'],
        ['W dawce 45 mg pacjent zapomina przyjąć tabletkę', 'Dawkowanie wyższe jest zalecane w schemacie wieczornym.'],
        'psych-atyp-q3'
      ),
      q(
        'Jakie rzadkie, lecz urologicznie groźne powikłanie może wystąpić podczas stosowania trazodonu wskutek blokady receptorów alfa-1 adrenergicznych?',
        ['Priapizm (bolesny, przedłużający się wzwód prącia bez pobudzenia seksualnego)', 'Stan ten wymaga pilnej interwencji urologicznej, aby zapobiec martwicy ciał jamistych.'],
        ['Zwapnienie gruczołu krokowego w ciągu 24 godzin', 'Trazodon nie wywołuje zwapnień stercza.'],
        ['Natychmiastowe zrośnięcie cewki moczowej', 'Nie ma takiego powikłania polekowego.'],
        'psych-atyp-q4'
      ),
      q(
        'Który lek przeciwdepresyjny dzięki blokadzie 5-HT3 i 5-HT7 oraz stymulacji 5-HT1A wykazuje specyficzne działanie prokognitywne?',
        ['Wortioksetyna', 'Wielokierunkowa modulacja receptorowa odhamowuje wyrzut acetylocholiny i dopaminy w hipokampie.'],
        ['Doksepina w małej dawce', 'Doksepina działa cholinolitycznie, co może wręcz pogarszać pamięć.'],
        ['Klomipramina', 'Silny cholinolityk pogarszający procesy uwagi i pamięci u seniorów.'],
        'psych-atyp-q5'
      )
    ]
  },
  {
    id: 'normotymiki-lit-walproinian-lamotrygina',
    moduleId: 'psych-farmakologia',
    title: 'Stabilizatory nastroju: lit, kwas walproinowy i lamotrygina',
    subtitle: 'Normotymiki I i II generacji: mechanizmy, okna stężeń i profilaktyka faz ChAD',
    group: 'Farmakoterapia zaburzeń afektywnych',
    minutes: 18,
    goals: [
      'Zastosujesz lek pierwszego rzutu w profilaktyce ChAD – węglan litu – i zinterpretujesz stężenia we krwi.',
      'Scharakteryzujesz teratogenność kwasu walproinowego i zasady programu zapobiegania ciąży.',
      'Wdrożysz bezpieczny, powolny schemat titracji lamotryginy w prewencji zespołu Stevensa-Johnsona.'
    ],
    sections: [
      {
        title: 'Węglan litu: lek pierwszego rzutu w ChAD i prewencji suicydalnej',
        text: 'Lit pozostaje lekiem I wyboru w zapobieganiu nawrotom manii i depresji w ChAD oraz jedynym o udowodnionym bezpośrednim działaniu antysuicydalnym. Hamuje monofosfatazę inozytolową (IMPaza) oraz kinazę syntazy glikogenu 3-beta (GSK-3beta), promując neuroprotekcję. Wymaga ścisłego TDM: stężenie terapeutyczne w podtrzymaniu wynosi 0,6–0,8 mmol/l (w ostrej manii 0,8–1,0 mmol/l). Toksyczność pojawia się powyżej 1,2 mmol/l.'
      },
      {
        title: 'Kwas walproinowy / walproinian sodu (VPA)',
        text: 'Walproinian nasila transmisję GABA-ergiczną (hamuje transaminazę GABA i wychwyt), blokuje kanały sodowe Nav oraz działa jako inhibitor deacetylaz histonowych (HDAC). Jest lekiem z wyboru w manii z szybką zmianą faz (rapid cycling) i stanach mieszanych. Bezwzględnym ograniczeniem jest skrajna teratogenność (wady cewy nerwowej, rozszczep kręgosłupa, spadek IQ potomstwa o 7–10 pkt), co wyklucza jego stosowanie u kobiet w wieku rozrodczym bez spełnienia wymogów programu prewencji ciąży.'
      },
      {
        title: 'Lamotrygina: prewencja epizodów depresyjnych',
        text: 'Lamotrygina blokuje bramkowane napięciem kanały sodowe Nav i zmniejsza presynaptyczne uwalnianie glutaminianu. Jest wysoce skuteczna w zapobieganiu nawrotom depresji dwubiegunowej (nie działa w ostrej manii). Wymaga powolnej titracji (start od 25 mg/d przez 2 tyg., potem 50 mg/d przez 2 tyg.), aby zminimalizować ryzyko zagrażających życiu odczynów skórnych: zespołu Stevensa-Johnsona (SJS) i toksycznej nekrolizy naskórka (TEN).'
      }
    ],
    table: {
      headers: ['Stabilizator', 'Główny profil działania w ChAD', 'Docelowe stężenie we krwi', 'Kluczowe ryzyka narządowe'],
      rows: [
        ['Węglan litu', 'Mania + depresja, działanie antysuicydalne', '0,6–0,8 mmol/l (podtrzymanie)', 'Tarczyca (niedoczynność), nerki (moczówka prosta, spadek eGFR)'],
        ['Kwas walproinowy', 'Ostra mania, rapid cycling, stany mieszane', '50–100 ug/ml (350–700 umol/l)', 'Teratogenność, hepatotoksyczność, trombocytopenia, trzustka'],
        ['Lamotrygina', 'Prewencja nawrotów depresji w ChAD', 'Nie wymaga rutynowego TDM', 'Ciężkie osutki skórne (SJS/TEN przy zbyt szybkiej titracji)'],
        ['Karbamazepina', 'Alternatywa w manii, autoinduktor CYP3A4', '4–12 ug/ml', 'Agranulocytoza, hiponatremia (SIADH), interakcje lekowe']
      ]
    },
    advanced:
      'Interakcja walproinianu z lamotryginą: walproinian silnie hamuje glukuronidację lamotryginy (przez UGT1A4), podwajając jej okres półtrwania i stężenie we krwi. Przy dołączaniu lamotryginy do walproinianu dawkę początkową i tempo titracji należy bezwzględnie zredukować o połowę (start od 12,5–25 mg co drugi dzień).',
    summary:
      'Lit jest lekiem z wyboru o działaniu antysuicydalnym (TDM 0,6–0,8 mmol/l). Walproinian skutecznie kontroluje manię, lecz jest bezwzględnie teratogenny. Lamotrygina chroni przed depresją w ChAD i wymaga powolnego wdrażania.',
    sourceIds: ['canmat-isbd-bipolar', 'agnp-tdm-2026', 'maudsley15'],
    questions: [
      q(
        'Jaki jest referencyjny zakres stężenia węglanu litu w surowicy krwi 12 godzin po ostatniej dawce w leczeniu podtrzymującym ChAD wg AGNP?',
        ['0,6 do 0,8 mmol/l', 'W ostrej manii dopuszcza się 0,8–1,0 mmol/l; stężenia powyżej 1,2 mmol/l grożą ciężkim zatruciem.'],
        ['2,5 do 4,0 mmol/l', 'Tak wysokie stężenie litu powoduje śpiączkę, drgawki i zgon.'],
        ['0,01 do 0,05 mmol/l', 'Są to stężenia homeopatyczne, całkowicie pozbawione efektu leczniczego.'],
        'psych-norm-q1'
      ),
      q(
        'Dlaczego kwas walproinowy jest przeciwwskazany u dziewcząt i kobiet w wieku rozrodczym, chyba że spełnione są warunki rygorystycznego programu zapobiegania ciąży?',
        ['Wykazuje silne działanie teratogenne (wady cewy nerwowej, rozszczep kręgosłupa) oraz obniża IQ dziecka o 7–10 punktów i zwiększa ryzyko autyzmu', 'Jest to najsilniejszy znany teratogen spośród powszechnych leków psychotropowych.'],
        ['Powoduje natychmiastową bezpłodność u 100% pacjentek po jednej dawce', 'Walproinian nie powoduje trwałej kastracji chemicznej, lecz wady wrodzone u płodu.'],
        ['Wywołuje nieodwracalne wypadanie wszystkich zębów u matki', 'Nie ma takiego powikłania polekowego.'],
        'psych-norm-q2'
      ),
      q(
        'Jakie jest kardynalne zalecenie dotyczące dawkowania lamotryginy w celu uniknięcia zespołu Stevensa-Johnsona (SJS)?',
        ['Bardzo powolne zwiększanie dawki (rozpoczynanie od 25 mg/d i podwajanie nie częściej niż co 2 tygodnie)', 'Szybka eskalacja dawki drastycznie potęguje ryzyko martwicy naskórka.'],
        ['Podanie dawki uderzeniowej 400 mg w pierwszym dniu', 'Dawka uderzeniowa 400 mg stwarza bezpośrednie ryzyko śmiertelnego SJS/TEN.'],
        ['Podawanie leku wyłącznie w bezpośrednim wlewie do komory mózgowej', 'Lamotrygina jest lekiem doustnym.'],
        'psych-norm-q3'
      ),
      q(
        'Co należy zrobić z dawkowaniem lamotryginy, jeśli jest ona dołączana do schematu leczenia pacjenta przyjmującego kwas walproinowy?',
        ['Zredukować dawkę początkową i tempo zwiększania lamotryginy o co najmniej 50%, ponieważ walproinian hamuje jej glukuronidację', 'Walproinian podwaja stężenie lamotryginy we krwi przez blokowanie enzymu UGT.'],
        ['Zwiększyć dawkę lamotryginy 4-krotnie od pierwszego dnia', 'Doprowadziłoby to do toksycznego stężenia i martwicy naskórka.'],
        ['Leki te znoszą się wzajemnie, więc dawkowanie nie ma znaczenia', 'Leki nie znoszą się, lecz wchodzą w istotną interakcję farmakokinetyczną.'],
        'psych-norm-q4'
      ),
      q(
        'Jakie badania laboratoryjne należy bezwzględnie kontrolować u pacjenta przewlekle leczonego węglanem litu?',
        ['Stężenie TSH (ryzyko niedoczynności tarczycy) oraz kreatyninę/eGFR (ryzyko nefropatii)', 'Lit kumuluje się w tarczycy i nerkach, mogąc wywołać wole, niedoczynność oraz moczówkę prostą nerkopochodną.'],
        ['Wyłącznie stężenie kwasu moczowego w paznokciach', 'Badanie paznokci nie jest parametrem monitorowania litu.'],
        ['Stężenie bilirubiny co 24 godziny', 'Lit nie jest metabolizowany w wątrobie i wydala się w 100% przez nerki w postaci niezmienionej.'],
        'psych-norm-q5'
      )
    ]
  },
  {
    id: 'leki-przeciwpsychotyczne-generacje',
    moduleId: 'psych-farmakologia',
    title: 'Leki przeciwpsychotyczne I, II i III generacji: profil receptorowy',
    subtitle: 'FGA vs SGA vs agoniści częściowi – skuteczność, tolerancja i algorytmy wyboru',
    group: 'Farmakoterapia psychoz i schizofrenii',
    minutes: 18,
    goals: [
      'Porównasz trzy generacje leków przeciwpsychotycznych pod kątem receptorologii i objawów niepożądanych.',
      'Scharakteryzujesz unikalną pozycję klozapiny w schizofrenii lekoopornej (TRS).',
      'Dobierzesz neuroleptyk minimalizujący ryzyko metaboliczne, kardiologiczne lub sedację.'
    ],
    sections: [
      {
        title: 'I generacja (FGA): silna blokada D2 i wysokie ryzyko EPS',
        text: 'Klasyczne neuroleptyki (FGA: haloperydol, chlorpromazyna, zuklopentyksol) to silni antagoniści receptorów D2 w całym mózgowiu. O ile skutecznie tłumią psychozę, o tyle blokada w szlaku nigrostriatalnym wywołuje ostry parkinsonizm, akatyzję, dystonie oraz po latach stosowania nieodwracalne dyskinezy późne (tardive dyskinesia - TD) wskutek up-regulacji receptorów postsynaptycznych.'
      },
      {
        title: 'II generacja (SGA): synergia D2/5-HT2A i profil metaboliczny',
        text: 'Atypowe leki przeciwpsychotyczne (SGA: olanzapina, kwetiapina, rysperydon, zyprazydon) łączą słabszą blokadę D2 z silnym antagonizmem 5-HT2A. Znacznie rzadziej wywołują EPS, jednak niektóre z nich (zwłaszcza olanzapina i klozapina) charakteryzują się bardzo wysokim ryzykiem zespołu metabolicznego: przyrostu masy ciała, cukrzycy de novo i dyslipidemii aterogennej wskutek blokady receptorów H1 i 5-HT2C.'
      },
      {
        title: 'III generacja: stabilizatory dopaminowe (częściowi agoniści)',
        text: 'Aripiprazol, brekspiprazol i kariprazyna stanowią nową erę. Działają jak częściowi agoniści receptorów D2 i D3 oraz antagoniści 5-HT2A. Cechują się niemal metaboliczną i hormonalną neutralnością (nie powodują tycia ani hiperprolaktynemii), natomiast najczęstszym działaniem niepożądanym w pierwszych dniach leczenia jest akatyzja (niepokój ruchowy), którą można opanować powolnym włączaniem lub małą dawką beta-blokera.'
      }
    ],
    table: {
      headers: ['Generacja / Lek', 'Mechanizm wiodący', 'Ryzyko EPS / TD', 'Ryzyko metaboliczne (tycie, glukoza)'],
      rows: [
        ['FGA (Haloperydol)', 'Silny antagonizm D2', 'Bardzo wysokie', 'Niskie / neutralne'],
        ['SGA (Olanzapina)', 'Antagonizm 5-HT2A > D2, H1, 5-HT2C', 'Bardzo niskie', 'Bardzo wysokie (tycie, cukrzyca)'],
        ['SGA (Rysperydon)', 'Antagonizm 5-HT2A + D2, alfa-1', 'Umiarkowane (zależne od dawki > 4–6 mg)', 'Umiarkowane (silna hiperprolaktynemia)'],
        ['III gen. (Aripiprazol)', 'Częściowy agonizm D2/D3 + 5-HT2A', 'Bardzo niskie (ryzyko akatyzji)', 'Minimalne / neutralne metabolicznie'],
        ['Klozapina (Lek z wyboru w TRS)', 'Słaby D2, silny 5-HT2A, alfa-1, M1, H1', 'Praktycznie zerowe', 'Bardzo wysokie + ryzyko agranulocytozy']
      ]
    },
    advanced:
      'Klozapina jest jedynym lekiem przeciwpsychotycznym o udowodnionej przewadze w lekoopornej schizofrenii (redukuje objawy u ok. 30–60% pacjentów opornych na inne leki). Ze względu na ryzyko agranulocytozy (ok. 0,8%) wymaga obowiązkowego cotygodniowego monitorowania morfologii (ANC) przez pierwsze 18 tygodni leczenia.',
    summary:
      'FGA skutecznie hamują psychozę, lecz niosą ryzyko EPS. SGA chronią przed EPS, ale olanzapina wywołuje powikłania metaboliczne. Leki III generacji (aripiprazol) są bezpieczne metabolicznie, a klozapina ratuje pacjentów lekoopornych.',
    sourceIds: ['wfsbp-schizophrenia', 'nice-schizophrenia', 'clozapine-consensus'],
    questions: [
      q(
        'Który z leków przeciwpsychotycznych II generacji wiąże się z największym ryzykiem powikłań metabolicznych (znacznego przyrostu masy ciała, cukrzycy typu 2 i dyslipidemii)?',
        ['Olanzapina (oraz klozapina)', 'Silna blokada receptorów histaminowych H1 i serotoninowych 5-HT2C w podwzgórzu prowadzi do żarłoczności i insulinooporności.'],
        ['Aripiprazol', 'Aripiprazol jest lekiem o neutralnym profilu metabolicznym.'],
        ['Zyprazydon', 'Zyprazydon nie powoduje przyrostu masy ciała, wymaga jednak podawania z posiłkiem min. 500 kcal.'],
        'psych-antipsy-q1'
      ),
      q(
        'Jaki jest mechanizm działania aripiprazolu i kariprazyny na receptor dopaminowy D2?',
        ['Częściowy agonizm (modulacja wewnętrznej aktywności)', 'W warunkach nadmiaru dopaminy zachowują się jak antagoniści, a w warunkach niedoboru podtrzymują bazową transmisję.'],
        ['Całkowita, nieodwracalna destrukcja receptora D2', 'Leki nie niszczą cząsteczek receptorowych.'],
        ['Czysty agonizm identyczny jak endogenna dopamina', 'Czysty agonista wywołałby gwałtowne zaostrzenie objawów psychotycznych.'],
        'psych-antipsy-q2'
      ),
      q(
        'Dlaczego u pacjenta leczonego haloperydolem w wysokiej dawce rozwija się sztywność mięśniowa typu "koła zębatego" i maskowata twarz?',
        ['Ponieważ blokada receptorów D2 w szlaku nigrostriatalnym przekracza 80%, wywołując polekowy zespół parkinsonowski', 'Niedobór dopaminy w prążkowiu odhamowuje układ cholinergiczny i powoduje wzmożenie napięcia pozapiramidowego.'],
        ['Ponieważ haloperydol wywołuje natychmiastowe złamania kości twarzoczaszki', 'Jest to zaburzenie neuroprzekaźnictwa, a nie uraz mechaniczny.'],
        ['Z powodu braku witaminy C w diecie', 'Objawy pozapiramidowe nie mają związku z poziomem kwasu askorbinowego.'],
        'psych-antipsy-q3'
      ),
      q(
        'Jakie badanie krwi jest bezwzględnie obligatoryjne przed włączeniem oraz w trakcie terapii klozapiną z uwagi na ryzyko zgonu?',
        ['Bezwzględna liczba neutrofilów (ANC - Absolute Neutrophil Count) w morfologii krwi', 'Klozapina może wywołać agranulocytozę (ANC < 500/ul); spadek poniżej normy wymaga natychmiastowego odstawienia leku.'],
        ['Stężenie hormonu wzrostu co 3 dni', 'Hormon wzrostu nie jest parametrem monitorowania bezpieczeństwa klozapiny.'],
        ['Odczyn Biernackiego (OB) raz na 10 lat', 'OB nie jest wskaźnikiem zagrożenia agranulocytozą.'],
        'psych-antipsy-q4'
      ),
      q(
        'Który lek przeciwpsychotyczny II generacji wykazuje najwyższe ryzyko wywołania objawowej hiperprolaktynemii z mlekotokiem?',
        ['Rysperydon (oraz paliperydon)', 'Silna blokada D2 w naczyniach przysadkowych szlaku guzkowo-lejkowego znosi fizjologiczne hamowanie laktotrofów.'],
        ['Kwetiapina', 'Kwetiapina bardzo szybko dysocjuje z receptora D2 i nie podwyższa prolaktyny.'],
        ['Aripiprazol', 'Aripiprazol jako częściowy agonista wręcz obniża stężenie prolaktyny.'],
        'psych-antipsy-q5'
      )
    ]
  },
  {
    id: 'benzodiazepiny-leki-z-tapering',
    moduleId: 'psych-farmakologia',
    title: 'Benzodiazepiny i leki Z: uzależnienie i protokół taperingowy Ashtona',
    subtitle: 'Tolerancja, down-regulacja GABAA, zespół odstawienny i hiperboliczna redukcja',
    group: 'Farmakoterapia zaburzeń lękowych i snu',
    minutes: 18,
    goals: [
      'Zrozumiesz molekularny mechanizm tolerancji i adaptacji receptora GABAA na leki sedatywne.',
      'Zdiagnozujesz objawy fizycznego zespołu odstawiennego po benzodiazepinach i lekach Z.',
      'Przeprowadzisz bezpieczny protokół redukcji dawki oparty na przeliczeniu na diazepam (Protokół Ashtona).'
    ],
    sections: [
      {
        title: 'Mechanizm działania i rozwój tolerancji receptorowej',
        text: 'Benzodiazepiny (alprazolam, lorazepam, klonazepam) oraz niebenzodiazepinowe leki nasenne (leki Z: zolpidem, zopiklon) łączą się z podjednostką alfa receptora GABAA, nasilając prąd chlorkowy. Przewlekła stymulacja (już po 2–4 tygodniach) wywołuje uncoupling receptora (odsprzężenie), jego internalizację oraz kompensacyjny wzrost ekspresji pobudzających receptorów glutaminergicznych AMPA/NMDA.'
      },
      {
        title: 'Zespół odstawienny po nagłym przerwaniu BZD',
        text: 'Nagłe odstawienie BZD u osoby uzależnionej odsłania hipereksploatowany, pozbawiony hamowania układ glutaminergiczny. Manifestuje się: skrajnym lękiem z odbicia (rebound anxiety), bezsennością, potami, drżeniem, przeczulicą zmysłową (fotofobia, nadwrażliwość na dźwięki), a w ciężkich przypadkach napadami drgawkowymi uogólnionymi toniczno-klonowymi oraz majaczeniem z omamami (stan bezpośredniego zagrożenia życia).'
      },
      {
        title: 'Protokół prof. Heather Ashton (The Ashton Manual)',
        text: 'Złotym standardem odstawiania krótko- i średniodziałających BZD (alprazolam, lorazepam) lub leków Z jest ich zamiana na równoważną dawkę długodziałającego diazepamu (t1/2 24–48h, a aktywny metabolit desmetylodiazepam nawet do 100h). Po ustabilizowaniu pacjenta na diazepamie dawkę redukuje się stopniowo (hiperbolicznie) o ok. 1–2 mg co 1–2 tygodnie, co pozwala na bezpieczną resensytyzację receptorów GABAA.'
      }
    ],
    table: {
      headers: ['Substancja', 'Okres półtrwania (t1/2)', 'Dawka równoważna 10 mg diazepamu', 'Ryzyko nagłego odstawienia'],
      rows: [
        ['Alprazolam', '6–12 godzin (krótki)', '0,5 mg', 'Ekstremalnie wysokie (lęki napadowe, drgawki)'],
        ['Lorazepam', '10–20 godzin (pośredni)', '1,0 mg', 'Bardzo wysokie'],
        ['Klonazepam', '20–50 godzin (długi)', '0,5 mg', 'Wysokie (długotrwały zespół abstynencyjny)'],
        ['Zolpidem (lek Z)', '2–3 godziny (b. krótki)', '20 mg (jako ekwiwalent nasenny)', 'Wysokie przy nadużywaniu dawek'],
        ['Diazepam', '24–48h (metabolit do 100h)', '10 mg (lek referencyjny)', 'Płynna eliminacja, podstawa protokołu detoksykacji']
      ]
    },
    advanced:
      'W odstawianiu benzodiazepin kluczowa jest zasada hiperboliczna: ostatnie miligramy diazepamu (np. redukcja z 2 mg do 0 mg) są subiektywnie najtrudniejsze dla pacjenta, ponieważ procentowa zmiana occupancy receptora GABAA przy zejściu z 2 mg do 0 jest znacznie większa niż przy redukcji z 20 mg na 18 mg.',
    summary:
      'Przewlekłe stosowanie BZD prowadzi do internalizacji GABAA i kompensacji glutaminergicznej. Bezpieczna detoksykacja wymaga zamiany na długodziałający diazepam wg Protokołu Ashtona i powolnej redukcji.',
    sourceIds: ['ashton-manual', 'ptp-standardy', 'maudsley15'],
    questions: [
      q(
        'Na czym polega Protokół prof. Heather Ashton (Ashton Manual) w bezpiecznym odstawianiu benzodiazepin?',
        ['Na zamianie krótko działającej BZD na równoważną dawkę długodziałającego diazepamu i stopniowej redukcji o 1-2 mg co 1-2 tygodnie', 'Długi okres półtrwania diazepamu zapewnia stałe stężenie we krwi i zapobiega gwałtownym skokom lęku odstawiennego.'],
        ['Na natychmiastowym odstawieniu leku z dnia na dzień i podaniu dużej dawki kofeiny', 'Postępowanie takie wywołałoby natychmiastowe napady drgawkowe i stan padaczkowy.'],
        ['Na zamianie wszystkich benzodiazepin na dożylną morfinę', 'Morfina jest opioidem i nie leczy zespołu odstawiennego po BZD.'],
        'psych-ashton-q1'
      ),
      q(
        'Jaki jest ekwiwalent dawki 10 mg diazepamu dla alprazolamu wg tabeli równoważności dawek BZD?',
        ['0,5 mg alprazolamu', 'Alprazolam jest około 20-krotnie silniejszy wagowo od diazepamu.'],
        ['10 mg alprazolamu', 'Taka dawka alprazolamu odpowiadałaby 200 mg diazepamu i wywołałaby głęboką śpiączkę.'],
        ['100 mg alprazolamu', 'Jest to dawka śmiertelna.'],
        'psych-ashton-q2'
      ),
      q(
        'Co jest najbardziej niebezpiecznym, zagrażającym życiu powikłaniem nagłego odstawienia wysokich dawek benzodiazepin?',
        ['Uogólnione napady drgawkowe toniczno-klonowe oraz stan padaczkowy z majaczeniem', 'Wynika to z braku hamowania GABA-ergicznego i masywnej burzy glutaminianowej w OUN.'],
        ['Nagłe pęknięcie śledziony', 'BZD nie wpływają mechanicznie na tkankę śledziony.'],
        ['Zwapnienie zastawek serca', 'Zespoły odstawienne nie powodują ostrej kalcyfikacji zastawek.'],
        'psych-ashton-q3'
      ),
      q(
        'Dlaczego leki z grupy Z (zolpidem, zaleplon, zopiklon) również powodują uzależnienie i zespół odstawienny pomimo budowy niebenzodiazepinowej?',
        ['Wiążą się z tym samym miejscem benzodiazepinowym na podjednostce alfa-1 receptora GABAA co klasyczne benzodiazepiny', 'Mają ten sam punkt uchwytu molekularnego, wywołując identyczną adaptację receptorową.'],
        ['Są syntetycznymi pochodnymi kokainy', 'Leki Z nie mają struktury tropanowej i nie blokują DAT w mechanizmie kokainy.'],
        ['Zawierają w składzie alkohol etylowy', 'Są to czyste chemicznie substancje stałe.'],
        'psych-ashton-q4'
      ),
      q(
        'Dlaczego ostatni etap odstawiania diazepamu (np. redukcja z 2 mg do 0 mg) bywa najtrudniejszy dla pacjenta?',
        ['Ponieważ krzywa wysycenia receptora GABAA jest nieliniowa i spadek z 2 mg do 0 oznacza utratę relatywnie dużego procentu occupancy receptora', 'Zasada hiperbolicznego taperingu wyjaśnia silny wzrost objawów przy odstawianiu resztkowych dawek.'],
        ['Ponieważ pacjent w tym momencie traci zdolność chodzenia', 'Odstawienie diazepamu nie upośledza czynności rdzenia kręgowego w ten sposób.'],
        ['Diazepam w dawce 2 mg ulega mutacji w jad kiełbasiany', 'Jest to biologiczny nonsens.'],
        'psych-ashton-q5'
      )
    ]
  },
  {
    id: 'farmakoterapia-adhd-stymulanty',
    moduleId: 'psych-farmakologia',
    title: 'Farmakoterapia ADHD: psychostymulanty i leki niestymulujące',
    subtitle: 'Metylofenidat, lisdeksamfetamina, atomoksetyna i guanfacyna – farmakodynamika',
    group: 'Farmakoterapia zaburzeń neurorozwojowych',
    minutes: 18,
    goals: [
      'Zróżnicujesz mechanizmy działania metylofenidatu, atomoksetyny i guanfacyny.',
      'Scharakteryzujesz formulacje o przedłużonym uwalnianiu (CR, OROS) i ich profile stężenia.',
      'Wdrożysz monitorowanie kardiologiczne (RR, tętno, EKG) u pacjentów leczonych stymulantami.'
    ],
    sections: [
      {
        title: 'Psychostymulanty: metylofenidat i pochodne amfetaminy',
        text: 'Psychostymulanty są lekami I rzutu w leczeniu ADHD o bardzo wysokiej wielkości efektu (d Cohena > 0.8). Metylofenidat (MPH) działa jako inhibitor wychwytu zwrotnego dopaminy i noradrenaliny (NDRI), blokując transportery DAT i NET. Deksamfetamina i lisdeksamfetamina nie tylko blokują DAT/NET, ale również odwracają kierunek transportu i ułatwiają uwalnianie monoamin z pęcherzyków presynaptycznych przez transporter VMAT2.'
      },
      {
        title: 'Formulacje farmaceutyczne: rola kinetyki uwalniania',
        text: 'Formy o natychmiastowym uwalnianiu (IR) dają szybki szczyt stężenia (Tmax 1–2h) i gwałtowny spadek, co sprzyja zjawisku "zjazdu" (rebound effect) pod wieczór oraz stwarza wyższy potencjał nadużywania. Nowoczesne formulacje o zmodyfikowanym uwalnianiu (np. system osmotyczny OROS czy kapsułki z mikropelletkami) zapewniają dwufazowe uwalnianie i stałą kontrolę objawów przez 8–12 godzin bez skoków dopaminowych w prążkowiu.'
      },
      {
        title: 'Leki niestymulujące: atomoksetyna i agoniści alfa-2',
        text: 'U pacjentów z przeciwwskazaniami do stymulantów (czynne uzależnienia w wywiadzie, ciężkie zaburzenia rytmu serca, jaskra, nasilone tiki) lekami z wyboru są leki niestymulujące: atomoksetyna (selektywny inhibitor NET zwiększający DA i NA selektywnie w korze przedczołowej, bez wpływu na prążkowie i układ nagrody) oraz guanfacyna (selektywny agonista postsynaptycznych receptorów alfa-2A adrenergicznych w dlPFC).'
      }
    ],
    table: {
      headers: ['Lek', 'Mechanizm molekularny', 'Czas działania formulacji', 'Główne zalety kliniczne'],
      rows: [
        ['Metylofenidat (MPH IR)', 'Blokada DAT i NET', '3–4 godziny', 'Szybki początek, elastyczne dawkowanie doraźne'],
        ['Metylofenidat (OROS/CR)', 'Blokada DAT i NET (system pompy)', '8–12 godzin', 'Stały poziom, brak wahań nastroju w ciągu dnia, niska podatność na nadużycia'],
        ['Atomoksetyna', 'Selektywna blokada NET w PFC', '24 godziny (efekt ciągły)', 'Brak potencjału uzależniającego, jednoczesne działanie przeciwlękowe'],
        ['Guanfacyna', 'Agonista postsynaptyczny alfa-2A', '24 godziny', 'Poprawa pamięci roboczej, redukcja tików i impulsywności, obniża ciśnienie']
      ]
    },
    advanced:
      'W korze przedczołowej (PFC) występuje bardzo mała gęstość transporterów dopaminy (DAT). Dopamina jest tam usuwana ze szczeliny synaptycznej głównie przez transporter noradrenaliny (NET). Dlatego atomoksetyna, będąc wybiórczym inhibitorem NET, podwyższa stężenie zarówno NA, jak i DA w korze czołowej, nie wpływając na stężenie dopaminy w jądrze półleżącym (brak efektu euforyzującego i uzależnienia).',
    summary:
      'Metylofenidat blokuje DAT/NET i stanowi I rzut w ADHD (preferowane formy o przedłużonym uwalnianiu). U osób z ryzykiem uzależnienia lub tikami lekiem z wyboru jest atomoksetyna lub guanfacyna.',
    sourceIds: ['nice-adhd', 'wfsbp-adhd', 'stahl-essential'],
    questions: [
      q(
        'Dlaczego atomoksetyna, będąc selektywnym inhibitorem wychwytu noradrenaliny (NET), zwiększa stężenie dopaminy w korze przedczołowej, ale NIE w jądrze półleżącym?',
        ['W korze przedczołowej występuje znikoma ilość transporterów DAT i dopamina jest tam wychwytywana przez transporter NET; w jądrze półleżącym dominuje DAT', 'Dzięki temu atomoksetyna poprawia koncentrację w korze bez stymulacji układu nagrody i bez potencjału euforyzującego.'],
        ['Atomoksetyna przekształca się w jądro półleżącym w czysty kwas solny', 'Jest to absurdalny mechanizm.'],
        ['Transporter noradrenaliny w jądrze półleżącym produkuje adrenalinę', 'Jądro półleżące nie syntetyzuje adrenaliny.'],
        'psych-adhddrug-q1'
      ),
      q(
        'Jakie parametry życiowe należy obowiązkowo skontrolować przed włączeniem oraz podczas terapii metylofenidatem wg wytycznych NICE?',
        ['Ciśnienie tętnicze krwi, częstość akcji serca (tętno) oraz EKG (w razie obciążeń kardiologicznych)', 'Stymulanty podnoszą napięcie układu współczulnego, co może wywołać tachykardię i nadciśnienie.'],
        ['Stężenie kwasu moczowego w dobowej zbiórce moczu', 'Kwas moczowy nie ma znaczenia w bezpieczeństwie stymulantów.'],
        ['Audiogram i pole widzenia', 'Nie są to rutynowe badania wymagane przed stymulantami.'],
        'psych-adhddrug-q2'
      ),
      q(
        'Jaka jest główna zaleta stosowania formulacji metylofenidatu w technologii OROS w porównaniu z klasycznymi tabletkami o natychmiastowym uwalnianiu (IR)?',
        ['Zapewnia stabilne stężenie leku przez 10–12 godzin, eliminując wahania nastroju i potrzebę dyskretnego przyjmowania dawek w szkole/pracy', 'Ponadto wolniejszy wzrost stężenia do OUN minimalizuje potencjał nadużywania i uzależnienia.'],
        ['Tabletka OROS rozpuszcza się już w jamie ustnej w 3 sekundy', 'OROS to osmotyczna pompa uwalniająca lek przez 12 godzin w przewodzie pokarmowym.'],
        ['Całkowicie znosi potrzebę snu na 7 dni', 'Stymulanty nie eliminują fizjologicznej potrzeby snu.'],
        'psych-adhddrug-q3'
      ),
      q(
        'Który lek stosowany w ADHD działa jako selektywny agonista postsynaptycznych receptorów alfa-2A adrenergicznych w korze przedczołowej?',
        ['Guanfacyna', 'Wzmacnia przewodnictwo w sieciach grzbietowo-bocznej kory przedczołowej, redukując impulsywność i objawy tikowe.'],
        ['Haloperydol', 'Haloperydol blokuje receptory D2 i nasila deficyty uwagi.'],
        ['Propranolol', 'Propranolol jest nieselektywnym beta-adrenolitykiem.'],
        'psych-adhddrug-q4'
      ),
      q(
        'U którego pacjenta z ADHD atomoksetyna będzie lekiem preferowanym w stosunku do metylofenidatu?',
        ['U pacjenta z aktywnym uzależnieniem od substancji psychoaktywnych w wywiadzie oraz współistniejącym silnym lękiem', 'Atomoksetyna nie jest substancją kontrolowaną, nie daje euforii i wykazuje właściwości anksjolityczne.'],
        ['U pacjenta wymagającego natychmiastowego efektu w ciągu pierwszych 30 minut od pierwszej tabletki', 'Atomoksetyna wymaga 4–8 tygodni regularnego stosowania do osiągnięcia pełnego efektu klinicznego.'],
        ['U pacjenta z ostrą niedrożnością dróg żółciowych', 'Niedrożność dróg żółciowych nie jest wskazaniem preferencyjnym dla atomoksetyny.'],
        'psych-adhddrug-q5'
      )
    ]
  }
];
