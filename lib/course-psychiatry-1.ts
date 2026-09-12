import { type DraftLesson, q } from './course-types.ts';

export const draftPsychiatryPart1: DraftLesson[] = [
  {
    id: 'mdd-kryteria-icd11',
    moduleId: 'psych-afektywne',
    title: 'Epizod depresyjny: ICD-11 CDDR i DSM-5-TR',
    subtitle: 'Kryteria osiowe, progi czasowe i różnicowanie somatyczne',
    group: 'Klinika zaburzeń afektywnych',
    minutes: 15,
    goals: [
      'Zestawisz kryteria ICD-11 CDDR 2024 z DSM-5-TR w rozpoznawaniu epizodu depresyjnego.',
      'Wskażesz niezbędne badania somatyczne wykluczające wtórne podłoże zaburzeń nastroju.',
    ],
    sections: [
      {
        title: 'Kryteria osiowe i czas trwania',
        text: 'Zarówno ICD-11 CDDR 2024, jak i DSM-5-TR wymagają obecności objawów przez co najmniej 2 tygodnie przez większość dnia niemal każdego dnia. Osiowymi objawami są: obniżony nastrój (dysforia/smutek) oraz wyraźna utrata zainteresowań lub odczuwania przyjemności (anhedonia). W ICD-11 pacjent musi prezentować co najmniej 5 z 10 wymienionych objawów zgrupowanych w domeny afektywną, poznawczą i neurowegetatywną.',
      },
      {
        title: 'Domeny poznawcze i neurowegetatywne',
        text: 'Do objawów towarzyszących należą: zaburzenia snu (bezsenność z wczesnym wybudzaniem lub hipersomnia), zmiany łaknienia i masy ciała, spowolnienie lub pobudzenie psychoruchowe, poczucie braku energii i zmęczenie, nieadekwatne poczucie winy lub niskiej wartości, obniżona zdolność koncentracji oraz nawracające myśli o śmierci lub samobójstwie. Objawy muszą powodować istotne cierpienie lub upośledzenie funkcjonowania społeczno-zawodowego.',
      },
      {
        title: 'Diagnostyka różnicowa z chorobami somatycznymi',
        text: 'Przed ustaleniem pierwotnego rozpoznania psychiatrycznego konieczne jest wykluczenie przyczyn somatycznych. Panel podstawowy obejmuje: TSH (wykluczenie niedoczynności tarczycy), morfologię krwi (niedokrwistość), elektrolity, glikemię na czczo, stężenie witaminy B12 i kwasu foliowego, próby wątrobowe i nerkowe (eGFR), a u osób starszych lub z nietypowym przebiegiem – badanie neuroobrazowe mózgu (MRI/CT).',
      },
    ],
    table: {
      headers: ['Cecha', 'ICD-11 CDDR (2024)', 'DSM-5-TR (2022)'],
      rows: [
        ['Czas trwania', 'Minimum 2 tygodnie', 'Minimum 2 tygodnie'],
        ['Główne objawy', 'Obniżony nastrój LUB anhedonia', 'Obniżony nastrój LUB anhedonia'],
        ['Minimalna liczba objawów', 'Co najmniej 5 z 10 objawów', 'Co najmniej 5 z 9 objawów'],
        ['Wykluczenie somatyczne', 'Konieczne wykluczenie chorób OUN i metabolicznych', 'Nie wynika z bezpośrednich skutków substancji/stanu somatycznego'],
      ],
    },
    advanced:
      'W ICD-11 CDDR kładzie się szczególny nacisk na elastyczność kliniczną i wymiarowe określanie nasilenia (łagodny, umiarkowany, ciężki bez cech psychotycznych, ciężki z cechami psychotycznymi zgodnymi lub niezgodnymi z nastrojem). Wytyczne NICE i CANMAT 2023 podkreślają, że w epizodzie łagodnym pierwszym wyborem są interwencje psychologiczne, a farmakoterapia SSRI jest rezerwowana dla epizodów umiarkowanych, ciężkich lub przy braku odpowiedzi na psychoterapię.',
    summary:
      'Rozpoznanie epizodu depresyjnego opiera się na 2-tygodniowym trwaniu co najmniej 5 objawów (w tym nastroju lub anhedonii) oraz wykluczeniu chorób somatycznych (TSH, B12, morfologia).',
    sourceIds: ['icd11-cddr', 'dsm5tr', 'nice-depression', 'canmat-mdd-2023'],
    questions: [
      q(
        'Jaki jest minimalny czas trwania objawów wymagany do rozpoznania epizodu depresyjnego wg ICD-11 i DSM-5-TR?',
        ['Co najmniej 2 tygodnie', 'Oba standardy wymagają obecności objawów przez co najmniej 14 kolejnych dni.'],
        ['Co najmniej 4 tygodnie', '4 tygodnie to próg wymagany w niektórych innych zaburzeniach, np. lękowych uogólnionych.'],
        ['Co najmniej 6 miesięcy', '6 miesięcy dotyczy zaburzeń przewlekłych, takich jak dystymia.'],
        'psych-mdd-q1'
      ),
      q(
        'Które dwa objawy są uznawane za osiowe, z których co najmniej jeden musi wystąpić w epizodzie depresyjnym?',
        ['Obniżony nastrój lub anhedonia', 'Przynajmniej jeden z tych dwóch objawów kardynalnych musi być obecny.'],
        ['Bezsenność lub spadek masy ciała', 'Są to objawy wegetatywne towarzyszące, ale nie zastępują objawu osiowego.'],
        ['Brak energii lub myśli samobójcze', 'To ważne cechy kliniczne, ale brak nastroju i anhedonii wyklucza typowy epizod.'],
        'psych-mdd-q2'
      ),
      q(
        'Które badanie laboratoryjne jest kluczowe w wykluczeniu endokrynologicznej przyczyny rzekomej depresji?',
        ['TSH', 'Jawna i subkliniczna niedoczynność tarczycy często naśladuje objawy depresyjne i spowolnienie.'],
        ['Kalcytonina', 'Kalcytonina jest markerem raka rdzeniastego tarczycy, bez związku z objawami nastroju.'],
        ['Stężenie gastryny', 'Gastryna służy diagnostyce gastrinoma w przewodzie pokarmowym.'],
        'psych-mdd-q3'
      ),
      q(
        'Jak klasyfikuje się epizod depresyjny, w którym występują urojenia winy i kary zgodne z nastrojem?',
        ['Epizod ciężki z objawami psychotycznymi', 'Urojenia depresyjne klasyfikują epizod jako ciężki psychotyczny (zgodny z nastrojem).'],
        ['Epizod umiarkowany powikłany', 'Wystąpienie urojeń automatycznie podnosi kwalifikację do epizodu ciężkiego.'],
        ['Zaburzenie schizoafektywne bez depresji', 'Urojenia syntoniczne z nastrojem w trakcie depresji nie oznaczają schizofrenii.'],
        'psych-mdd-q4'
      ),
      q(
        'Zgodnie z CANMAT 2023 i NICE, jakie postępowanie jest zalecane w łagodnym epizodzie depresyjnym bez myśli "S"?',
        ['W pierwszej kolejności interwencje psychologiczne / CBT', 'W łagodnej depresji preferuje się psychoterapię CBT, psychoedukację lub aktywację behawioralną.'],
        ['Natychmiastowe wdrożenie dwóch leków przeciwdepresyjnych', 'Polifarmakoterapia nie ma wskazań w pierwszym łagodnym epizodzie.'],
        ['Terapia elektrowstrząsowa (EW)', 'EW stosuje się w depresji lekoopornej lub z bezpośrednim zagrożeniem życia.'],
        'psych-mdd-q5'
      ),
    ],
  },
  {
    id: 'mdd-podtypy',
    moduleId: 'psych-afektywne',
    title: 'Podtypy depresji: melancholiczna, atypowa i psychotyczna',
    subtitle: 'Fenotypy kliniczne, neurobiologia i implikacje terapeutyczne',
    group: 'Klinika zaburzeń afektywnych',
    minutes: 15,
    goals: [
      'Rozróżnisz cechy depresji melancholicznej od atypowej.',
      'Dobierzesz optymalną strategię lekową dla poszczególnych fenotypów depresji.',
    ],
    sections: [
      {
        title: 'Depresja melancholiczna (endogenna)',
        text: 'Cechuje się jakościowo odmiennym przygnębieniem (opisywanym jako "ból psychiczny"), całkowitą utratą reaktywności nastroju na bodźce pozytywne, wyraźnym porannym pogorszeniem samopoczucia, wczesnym budzeniem się (o >= 2 godziny wcześniej niż zwykle), głębokim spowolnieniem lub pobudzeniem psychoruchowym, jadłowstrętem z utratą masy ciała oraz nadmiernym poczuciem winy. Wiąże się z silną nadaktywnością osi HPA.',
      },
      {
        title: 'Depresja atypowa',
        text: 'W depresji atypowej kluczową cechą jest zachowana reaktywność nastroju (nastrój ulega poprawie w odpowiedzi na pozytywne wydarzenia). Towarzyszą jej co najmniej 2 z następujących cech: hiperfagia lub znaczny przyrost masy ciała ("comfort eating"), hipersomnia (sen > 10 h/dobę), objaw ołowianych kończyn (leaden paralysis – uczucie ciężkości nóg i rąk) oraz utrwalona nadwrażliwość na odrzucenie interpersonalne.',
      },
      {
        title: 'Depresja psychotyczna i implikacje farmakoterapii',
        text: 'W depresji psychotycznej występują urojenia (najczęściej winy, grzeszności, kary, biedy, hipochondryczne lub nihilizmu/zespół Cotarda) i/lub omamy. Monoterapia samym lekiem przeciwdepresyjnym (np. SSRI) jest w tym podtypie nieskuteczna; standardem wg Maudsley 15th ed. jest skojarzenie leku przeciwdepresyjnego (SSRI/SNRI) z lekiem przeciwpsychotycznym II generacji (np. olanzapina, kwetiapina) lub kwalifikacja do terapii elektrowstrząsowej (EW).',
      },
    ],
    table: {
      headers: ['Cecha kliniczna', 'Depresja melancholiczna', 'Depresja atypowa'],
      rows: [
        ['Reaktywność nastroju', 'Całkowicie zniesiona', 'Zachowana (poprawa po miłych bodźcach)'],
        ['Wzorzec snu', 'Bezsenność późna (wczesne budzenie)', 'Hipersomnia (>10h snu)'],
        ['Łaknienie i masa', 'Jadłowstręt i spadek wagi', 'Hiperfagia, zajadanie stresu, wzrost wagi'],
        ['Układ ruchowy', 'Wyraźne spowolnienie lub agitacja', 'Poczucie ołowianych kończyn (leaden paralysis)'],
      ],
    },
    advanced:
      'Depresja atypowa wykazuje statystycznie częstszy związek ze spektrum choroby afektywnej dwubiegunowej (ChAD typu II) niż depresja melancholiczna. Historycznie w depresji atypowej wyższą skuteczność wykazywały iMAO (fenelzyna, moklobemid), obecnie lekami pierwszego wyboru pozostają SSRI/SNRI lub bupropion. W depresji melancholicznej wyższą skuteczność niż SSRI mogą wykazywać leki o profilu podwójnym (SNRI: wenlafaksyna, duloksetyna) oraz TLPD.',
    summary:
      'Melancholia to brak reaktywności nastroju, poranne pogorszenie i jadłowstręt. Depresja atypowa to reaktywność, hipersomnia i ołowiane kończyny. Depresja psychotyczna bezwzględnie wymaga LPD + neuroleptyk.',
    sourceIds: ['dsm5tr', 'icd11-cddr', 'maudsley15', 'canmat-mdd-2023'],
    questions: [
      q(
        'Który objaw jest kardynalnym kryterium depresji atypowej w odróżnieniu od melancholijnej?',
        ['Zachowana reaktywność nastroju', 'W depresji atypowej nastrój przejściowo poprawia się w odpowiedzi na pozytywne bodźce.'],
        ['Wczesne poranne budzenie się', 'Poranne budzenie jest typowe dla podtypu melancholicznego.'],
        ['Utrata łaknienia i spadek masy ciała', 'Dla depresji atypowej charakterystyczna jest hiperfagia i przyrost wagi.'],
        'psych-podtypy-q1'
      ),
      q(
        'Jakie jest leczenie pierwszego wyboru w ciężkim epizodzie depresyjnym z objawami psychotycznymi wg Maudsley 15th ed.?',
        ['Antydepresant (SSRI/SNRI) w skojarzeniu z lekiem przeciwpsychotycznym II generacji', 'Monoterapia samym lekiem przeciwdepresyjnym wykazuje niedostateczną skuteczność w depresji psychotycznej.'],
        ['Monoterapia samym SSRI w maksymalnej dawce', 'Samo SSRI rzadko redukuje urojenia depresyjne.'],
        ['Wyłącznie psychoterapia poznawczo-behawioralna', 'Stany psychotyczne wymagają pilnej farmakoterapii lub EW z uwagi na wysokie ryzyko samobójcze.'],
        'psych-podtypy-q2'
      ),
      q(
        'Co oznacza objaw "ołowianych kończyn" (leaden paralysis)?',
        ['Subiektywne uczucie ciężkości rąk lub nóg w depresji atypowej', 'To uciążliwe uczucie ciężkości fizycznej charakterystyczne dla fenotypu atypowego.'],
        ['Objaw oponowy w zapaleniu opon mózgowo-rdzeniowych', 'Objawy oponowe to objaw Kerniga czy Brudzińskiego.'],
        ['Porażenie wiotkie w uszkodzeniu motoneuronu', 'To objaw neurologiczny, a nie cecha depresji.'],
        'psych-podtypy-q3'
      ),
      q(
        'Kiedy typowo przypada dobowe pogorszenie nastroju u pacjenta z depresją melancholiczną?',
        ['W godzinach porannych', 'Wzrost kortyzolu i rytm biologiczny w melancholii dają najgorsze samopoczucie rano.'],
        ['Późnym wieczorem', 'Wieczorne pogorszenie bywa częstsze w zaburzeniach lękowych i depresji atypowej.'],
        ['Zawsze w środku nocy', 'W środku nocy pacjent wybudza się, ale szczyt przygnębienia występuje po wstaniu.'],
        'psych-podtypy-q4'
      ),
      q(
        'Który podtyp depresji częściej maskuje nierozpoznane spektrum choroby afektywnej dwubiegunowej (ChAD II)?',
        ['Depresja atypowa z wczesnym początkiem', 'Fenotyp atypowy (hipersomnia, hiperfagia) częściej koreluje ze spektrum ChAD.'],
        ['Późna depresja naczyniowa u 80-latka', 'Depresja naczyniowa wiąże się z uszkodzeniem istoty białej mózgu.'],
        ['Czysta postać melancholiczna bez wywiadu rodzinnego', 'Klasyczna jednobiegunowa melancholia ma inny profil genetyczny.'],
        'psych-podtypy-q5'
      ),
    ],
  },
  {
    id: 'chad-spektrum',
    moduleId: 'psych-afektywne',
    title: 'Spektrum choroby afektywnej dwubiegunowej: ChAD I, ChAD II i cyklotymia',
    subtitle: 'Różnicowanie manii od hipomanii, kryteria czasowe i przebieg',
    group: 'Klinika zaburzeń afektywnych',
    minutes: 16,
    goals: [
      'Precyzyjnie odróżnisz epizod maniakalny od hipomaniakalnego wg ICD-11 CDDR i DSM-5-TR.',
      'Scharakteryzujesz podział na ChAD typu I, ChAD typu II i cyklotymię.',
    ],
    sections: [
      {
        title: 'Mania a hipomania: kryteria rozstrzygające',
        text: 'Podstawową osią różnicującą jest nasilenie, wpływ na funkcjonowanie oraz czas trwania. Mania (ChAD I) wymaga trwania podwyższonego/ekspansywnego lub drażliwego nastroju ze wzmożoną energią przez co najmniej 7 dni (lub krócej, jeśli konieczna jest hospitalizacja) i prowadzi do znacznego upośledzenia funkcjonowania społecznego/zawodowego lub zawiera objawy psychotyczne. Hipomania (ChAD II) trwa minimum 4 kolejne dni, powoduje zauważalną zmianę zachowania, ale BEZ istotnego upośledzenia funkcjonowania, BEZ konieczności hospitalizacji i BEZ objawów psychotycznych.',
      },
      {
        title: 'ChAD typu I vs ChAD typu II',
        text: 'ChAD typu I definiuje wystąpienie co najmniej jednego epizodu manii w życiu (epizody depresyjne nie są formalnie wymagane do rozpoznania, choć występują u >95% pacjentów). ChAD typu II wymaga wystąpienia co najmniej jednego epizodu hipomanii ORAZ co najmniej jednego epizodu ciężkiej depresji; jeśli u pacjenta kiedykolwiek wystąpi pełna mania, rozpoznanie nieodwracalnie zmienia się na ChAD I. Przebieg ChAD II charakteryzuje się dominacją faz depresyjnych i wysokim ryzykiem samobójczym.',
      },
      {
        title: 'Cyklotymia i epizody mieszane',
        text: 'Cyklotymia to przewlekła niestabilność nastroju trwająca co najmniej 2 lata (1 rok u dzieci/młodzieży), z licznymi okresami objawów hipomaniakalnych i depresyjnych, które jednak nie spełniają pełnych kryteriów epizodu manii ani dużej depresji. Zgodnie z DSM-5-TR i ICD-11 epizody z cechami mieszanymi oznaczają współwystępowanie objawów przeciwnego bieguna (np. depresja ze wzmożonym napędem i gonitwą myśli lub mania z poczuciem winy i myślami rezygnacyjnymi).',
      },
    ],
    table: {
      headers: ['Kryterium', 'Hipomania (ChAD II)', 'Mania (ChAD I)'],
      rows: [
        ['Minimalny czas trwania', 'Co najmniej 4 kolejne dni', 'Co najmniej 7 dni (lub hospitalizacja)'],
        ['Wpływ na funkcjonowanie', 'Zauważalna zmiana, bez upośledzenia', 'Znaczne upośledzenie ról społecznych/pracy'],
        ['Hospitalizacja', 'Nie występuje', 'Może być konieczna (wskazanie bezwzględne)'],
        ['Objawy psychotyczne', 'Nigdy (wykluczają hipomanię)', 'Mogą występować (urojenia wielkościowe itp.)'],
      ],
    },
    advanced:
      'Wystąpienie nawet pojedynczego objawu psychotycznego (np. urojenia misji od Boga lub wszechmocy) automatycznie kwalifikuje stan jako manię (ChAD I), niezależnie od tego, czy trwał 2 dni, czy 7 dni. Wytyczne CANMAT/ISBD 2023 wskazują, że monoterapię przeciwdepresyjną w ChAD uznaje się za błąd sztuki z powodu ryzyka indukcji manii (switch) oraz przyspieszenia cykliczności (rapid cycling).',
    summary:
      'ChAD I to co najmniej jeden epizod manii (>=7 dni, upośledzenie ról lub psychoza). ChAD II to hipomania (>=4 dni, bez psychozy/hospitalizacji) + depresja. Cyklotymia trwa >=2 lata subklinicznych wahań.',
    sourceIds: ['icd11-cddr', 'dsm5tr', 'canmat-isbd-bipolar', 'maudsley15'],
    questions: [
      q(
        'Jaki jest minimalny czas trwania wzmożonego nastroju wymagany do rozpoznania hipomanii bez hospitalizacji?',
        ['Co najmniej 4 kolejne dni', 'ICD-11 i DSM-5-TR ustalają próg hipomanii na minimum 4 dni.'],
        ['Co najmniej 7 kolejnych dni', '7 dni to formalne kryterium pełnego epizodu manii.'],
        ['Co najmniej 14 kolejnych dni', '14 dni to kryterium epizodu depresyjnego.'],
        'psych-chad-q1'
      ),
      q(
        'Pojawienie się urojeń wielkościowych u pacjenta ze wzmożonym nastrojem trwającym 3 dni oznacza:',
        ['Automatyczne rozpoznanie epizodu manii (ChAD I)', 'Obecność objawów psychotycznych bezwzględnie wyklucza hipomanię i definiuje manię.'],
        ['Nadal hipomanię, jeśli pacjent nie trafił do szpitala', 'Objawy psychotyczne zawsze przekreślają kategorię hipomanii.'],
        ['Zaburzenie urojeniowe późne', 'Ostry stan podwyższonego nastroju z urojeniami to komponent manii psychotycznej.'],
        'psych-chad-q2'
      ),
      q(
        'Do jakiego typu ChAD kwalifikuje się pacjent, który miał 5 epizodów ciężkiej depresji i 1 udokumentowany epizod manii?',
        ['ChAD typu I', 'Pojedynczy epizod manii w historii życia definiuje ChAD typu I.'],
        ['ChAD typu II', 'ChAD typu II dopuszcza wyłącznie hipomanię, nigdy pełną manię.'],
        ['Nawracające zaburzenia depresyjne', 'Wystąpienie manii wyklucza depresję jednobiegunową.'],
        'psych-chad-q3'
      ),
      q(
        'Jak definiuje się cyklotymię wg ICD-11 CDDR i DSM-5-TR?',
        ['Stan niestabilności nastroju trwający co najmniej 2 lata, niespełniający kryteriów manii ani dużej depresji', 'To przewlekłe wahania subkliniczne trwające minimum 2 lata u dorosłych.'],
        ['Szybką zmianę faz występującą częściej niż 4 razy w roku', 'To definicja ChAD z szybką zmianą faz (rapid cycling).'],
        ['Każdą postać ChAD leczoną wyłącznie psychoterapią', 'Cyklotymia to odrębna jednostka nozologiczna o charakterze przewlekłym.'],
        'psych-chad-q4'
      ),
      q(
        'Dlaczego monoterapia lekiem przeciwdepresyjnym (np. SSRI) jest przeciwwskazana w ChAD I?',
        ['Ryzyko wyindukowania epizodu manii (switch) lub destabilizacji w rapid cycling', 'Leki przeciwdepresyjne w monoterapii w ChAD niosą wysokie ryzyko przełamania w manię i stany mieszane.'],
        ['SSRI powodują natychmiastowe uszkodzenie kory mózgu w ChAD', 'Nie ma takiego mechanizmu neurotoksycznego.'],
        ['SSRI są w 100% metabolizowane do litu', 'To absurdalna i nieprawdziwa teza biochemiczna.'],
        'psych-chad-q5'
      ),
    ],
  },
  {
    id: 'chad-pulapki',
    moduleId: 'psych-afektywne',
    title: 'Pułapki diagnostyczne w spektrum afektywnym',
    subtitle: 'Przełączenie fazy po SSRI, ChAD maskowany depresją i ADHD vs hipomania',
    group: 'Klinika zaburzeń afektywnych',
    minutes: 16,
    goals: [
      'Rozpoznasz zjawisko przełączenia fazy (switch) po lekach przeciwdepresyjnych.',
      'Zastosujesz Bipolarity Index i cechy sugerujące ukryty ChAD u pacjenta z depresją.',
    ],
    sections: [
      {
        title: 'Przełączenie fazy (antidepressant-induced switch)',
        text: 'Wdrożenie leku przeciwdepresyjnego (zwłaszcza TLPD lub SNRI, rzadziej SSRI) u pacjenta z nierozpoznanym ChAD może wywołać gwałtowne przejście w hipomanię, manię lub stan mieszany. Stan ten charakteryzuje się nagłym zmniejszeniem potrzeby snu (np. 3 h snu bez zmęczenia), gonitwą myśli, skrajną drażliwością i dysinhibicją behawioralną. W DSM-5-TR pełny epizod manii indukowany lekiem, utrzymujący się po wycofaniu leku, uprawnia do rozpoznania ChAD I.',
      },
      {
        title: 'Czerwone flagi dwubiegunowości w wywiadzie',
        text: 'Do cech sugerujących podłoże dwubiegunowe u pacjenta zgłaszającego się z depresją należą: wczesny początek zachorowania (< 25 r.ż.), wywiad rodzinny ChAD u krewnych I stopnia, nagły początek i nagłe ustępowanie epizodów, cechy atypowe (hipersomnia, hiperfagia), depresja poporodowa, epizody psychotyczne w wywiadzie oraz brak odpowiedzi na >= 2 kolejne kuracje przeciwdepresyjne lub zaostrzenie drażliwości i pobudzenia po SSRI.',
      },
      {
        title: 'Różnicowanie: ADHD vs hipomania vs Borderline (BPD)',
        text: 'Kluczowe jest tempo zmian i ciągłość. ADHD to przewlekły, stały deficyt uwagi i impulsywność obecne od wczesnego dzieciństwa, bez wyraźnych wielotygodniowych przerw i bez epizodycznej ekspansywności czy zmniejszonej potrzeby snu. BPD (osobowość z pogranicza) charakteryzuje się chwiejnością nastroju zmieniającą się z godziny na godzinę pod wpływem odrzucenia interpersonalnego (reaktywność), podczas gdy fazy w ChAD trwają dni i tygodnie w sposób autonomiczny.',
      },
    ],
    table: {
      headers: ['Jednostka', 'Charakter wahań', 'Zapotrzebowanie na sen', 'Wyzwalacz'],
      rows: [
        ['Hipomania w ChAD', 'Epizodyczny (trwa dni/tygodnie)', 'Wyraźnie zmniejszone (brak zmęczenia)', 'Często autonomiczny lub zaburzenie rytmu dobowego'],
        ['ADHD', 'Przewlekły, stały stan od dzieciństwa', 'Prawidłowe (trudności z zasypianiem, zmęczenie rano)', 'Nuda, przebodźcowanie, frustracja'],
        ['Osobowość z pogranicza (BPD)', 'Bardzo szybki (godziny/minuty)', 'Zmienne, zależne od emocji', 'Odrzucenie interpersonalne, lęk przed porzuceniem'],
      ],
    },
    advanced:
      'Narzędziem standaryzowanym w ocenie prawdopodobieństwa spektrum ChAD jest Bipolarity Index (Sachs et al.). Skala ta ocenia 5 domen (każda 0-20 pkt, łącznie 100 pkt): cechy epizodu, wiek zachorowania, przebieg choroby i odpowiedź na leczenie, wywiad rodzinny oraz objawy towarzyszące. Wynik > 60 pkt silnie przemawia za spektrum dwubiegunowym i nakazuje włączenie stabilizatora nastroju (lit, lamotrygina, kwetiapina) przed eskalacją antydepresantów.',
    summary:
      'Zmniejszenie potrzeby snu i pobudzenie po SSRI to alarm przełączenia fazy w ChAD. Różnicuj epizodyczny ChAD od przewlekłego ADHD i ultraszybkiej reaktywności emocjonalnej w BPD.',
    sourceIds: ['canmat-isbd-bipolar', 'dsm5tr', 'icd11-cddr', 'maudsley15'],
    questions: [
      q(
        'Pacjent leczony sertraliną po 10 dniach śpi po 3 godziny na dobę, nie czuje zmęczenia i ma gonitwę myśli. Co podejrzewasz?',
        ['Przełączenie fazy (switch) w hipomanię/manię w przebiegu ChAD', 'Zmniejszona potrzeba snu bez zmęczenia i przyspieszenie myśli po SSRI to typowy obraz jatrogennego switcha.'],
        ['Prawidłową wczesną odpowiedź terapeutyczną na lek', 'Brak potrzeby snu nie jest celem ani normalnym efektem leczenia depresji.'],
        ['Zespół odstawienny po sertralinie', 'Pacjent przyjmuje lek, nie doszło do przerwania kuracji.'],
        'psych-pulapki-q1'
      ),
      q(
        'Która cecha z wywiadu u chorego z depresją najbardziej zwiększa prawdopodobieństwo ChAD?',
        ['Choroba afektywna dwubiegunowa u matki lub ojca (krewni I stopnia)', 'Wywiad rodzinny ChAD I stopnia jest jednym z najsilniejszych predyktorów biologicznych.'],
        ['Występowanie choroby wieńcowej u dziadka', 'Choroby kardiologiczne nie różnicują ChAD od MDD.'],
        ['Początek pierwszego epizodu w wieku 65 lat po zawale', 'Późny początek częściej wskazuje na depresję naczyniową lub organiczną.'],
        'psych-pulapki-q2'
      ),
      q(
        'Jak odróżnić labilność emocjonalną w zaburzeniu osobowości z pogranicza (BPD) od ChAD?',
        ['W BPD wahania trwają minuty/godziny w reakcji na relacje, w ChAD epizody trwają dni/tygodnie', 'Dynamika czasowa i zależność od bodźców interpersonalnych są kluczowym kryterium różnicowym.'],
        ['W BPD nigdy nie występują myśli samobójcze', 'BPD cechuje się bardzo wysoką częstością samookaleczeń i kryzysów samobójczych.'],
        ['ChAD występuje wyłącznie u mężczyzn, a BPD wyłącznie u kobiet', 'Oba zaburzenia występują u obu płci.'],
        'psych-pulapki-q3'
      ),
      q(
        'Co jest charakterystyczne dla snu w ADHD w porównaniu z hipomanią?',
        ['W ADHD pacjent ma trudności z zaśnięciem, ale rano jest zmęczony; w hipomanii śpi mało i ma nadmiar energii', 'W hipomanii występuje zmniejszona POTRZEBA snu, podczas gdy w ADHD pacjent cierpi z powodu niedospania.'],
        ['W hipomanii pacjent śpi po 14 godzin na dobę', 'Hipersomnia jest rzadka w hipomanii.'],
        ['W ADHD pacjent nie potrzebuje snu przez całe życie', 'To nieprawda; deprywacja snu w ADHD prowadzi do wyczerpania.'],
        'psych-pulapki-q4'
      ),
      q(
        'Jakie jest pierwsze postępowanie w przypadku wystąpienia pełnej manii po włączeniu leku przeciwdepresyjnego?',
        ['Odstawienie leku przeciwdepresyjnego i wdrożenie leku przeciwpsychotycznego lub stabilizatora (np. lit, olanzapina)', 'Zgodnie z Maudsley i CANMAT należy niezwłocznie wycofać antydepresant i podać lek przeciwmaniakalny.'],
        ['Podwojenie dawki antydepresantu, aby przełamać manię', 'Podwojenie dawki nasiliłoby manię i ryzyko psychozy/agresji.'],
        ['Włączenie leku uspokajającego i pozostawienie antydepresantu bez zmian', 'Antydepresant napędza stan maniakalny i musi zostać zredukowany/odstawiony.'],
        'psych-pulapki-q5'
      ),
    ],
  },
  {
    id: 'dystymia-uporczywe',
    moduleId: 'psych-afektywne',
    title: 'Uporczywe zaburzenie depresyjne (dystymia)',
    subtitle: 'Kryteria 2-letnie, depresja podwójna i leczenie długoterminowe',
    group: 'Klinika zaburzeń afektywnych',
    minutes: 14,
    goals: [
      'Zdefiniujesz kryteria czasowe i kliniczne dystymii wg ICD-11 CDDR i DSM-5-TR.',
      'Rozpoznasz zjawisko "depresji podwójnej" (double depression) i zaplanujesz leczenie.',
    ],
    sections: [
      {
        title: 'Definicja i próg 2 lat',
        text: 'Dystymia (w DSM-5-TR określana jako Persistent Depressive Disorder – PDD) to przewlekły stan obniżonego nastroju, który utrzymuje się przez co najmniej 2 lata (u dzieci i młodzieży przez co najmniej 1 rok). W ciągu tych 2 lat okresy wolne od objawów nie mogą trwać dłużej niż 2 kolejne miesiące. Nasilenie objawów jest zazwyczaj mniejsze niż w ciężkim epizodzie depresyjnym, jednak ich stałość prowadzi do głębokiej erozji jakości życia.',
      },
      {
        title: 'Depresja podwójna (double depression)',
        text: 'Zjawisko to polega na nałożeniu się ostrego epizodu dużej depresji (MDD) na wcześniej istniejącą, przewlekłą dystymię. Pacjent z wyjściowo niskim poziomem funkcjonowania doznaje dalszego gwałtownego załamania z anhedonią, myślami samobójczymi i objawami wegetatywnymi. Po wyleczeniu ostrego epizodu MDD chory często powraca jedynie do swojego "wyjściowego" stanu dystymicznego, co bywa mylnie uznawane za pełną remisję.',
      },
      {
        title: 'Leczenie: farmakoterapia i CBASP',
        text: 'Wbrew dawnym poglądom traktującym dystymię jako stałą "cechę charakteru", jest to stan responsywny na leczenie biologiczne. Wytyczne zalecają leki przeciwdepresyjne (SSRI, SNRI, moklobemid) w połączeniu z psychoterapią ukierunkowaną na przewlekłą depresję, zwłaszcza systemem CBASP (Cognitive Behavioral Analysis System of Psychotherapy) opracowanym przez McCullogha specjalnie dla tej populacji chorych.',
      },
    ],
    table: {
      headers: ['Cecha', 'Epizod MDD', 'Dystymia (PDD)'],
      rows: [
        ['Minimalny czas trwania', '2 tygodnie', '2 lata (dorośli) / 1 rok (dzieci)'],
        ['Przerwy bezobjawowe', 'Mogą trwać miesiące/lata w remisji', 'Maksymalnie < 2 miesiące w ciągu 2 lat'],
        ['Dynamika początku', 'Często ostry lub podostry początek', 'Podstępny, powolny początek, często od młodości'],
        ['Subiektywne poczucie', '"Nie poznaję siebie, zmieniłem się"', '"Taki po prostu jestem, odkąd pamiętam"'],
      ],
    },
    advanced:
      'W badaniach neuroobrazowych pacjenci z dystymią wykazują utrwalone zaburzenia sieci wzbudzeń spoczynkowych (Default Mode Network – DMN) i nadmierną ruminację. Długotrwała farmakoterapia SSRI/SNRI w dystymii powinna być prowadzona przez co najmniej 2 lata od uzyskania remisji, a u pacjentów z nawracającą depresją podwójną często bezterminowo, ze względu na ryzyko nawrotu sięgające >70% w pierwszym roku po odstawieniu leku.',
    summary:
      'Dystymia wymaga trwania obniżonego nastroju przez >= 2 lata (przerwy < 2 mies.). Depresja podwójna to ostry epizod MDD nałożony na dystymię. Skuteczne jest skojarzenie SSRI/SNRI z psychoterapią CBASP.',
    sourceIds: ['icd11-cddr', 'dsm5tr', 'nice-depression', 'maudsley15'],
    questions: [
      q(
        'Jaki jest minimalny czas trwania przewlekłego obniżenia nastroju wymagany do rozpoznania dystymii u dorosłych?',
        ['Co najmniej 2 lata', 'Standardy ICD-11 i DSM-5-TR wymagają trwania objawów przez minimum 24 miesiące.'],
        ['Co najmniej 6 miesięcy', '6 miesięcy to próg dla zaburzeń lękowych uogólnionych (GAD).'],
        ['Co najmniej 5 lat', '5 lat nie jest formalnym progiem w żadnej klasyfikacji.'],
        'psych-dystymia-q1'
      ),
      q(
        'Co oznacza pojęcie "depresji podwójnej" (double depression)?',
        ['Wystąpienie ostrego epizodu dużej depresji (MDD) u osoby chorującej na przewlekłą dystymię', 'To nałożenie się pełnoobjawowego epizodu dużej depresji na podłoże istniejącej dystymii.'],
        ['Jednoczesne wystąpienie depresji u obojga małżonków', 'To potoczne określenie bez znaczenia diagnostycznego.'],
        ['Współwystępowanie depresji i schizofrenii paranoidalnej', 'To schizoafektywne zaburzenie nastroju.'],
        'psych-dystymia-q2'
      ),
      q(
        'Jaki jest dopuszczalny maksymalny czas trwania okresu wolnego od objawów w trakcie 2-letniego przebiegu dystymii?',
        ['Mniej niż 2 kolejne miesiące', 'Przerwa bezobjawowa trwająca 2 miesiące lub dłużej wyklucza rozpoznanie dystymii.'],
        ['Mniej niż 6 kolejnych miesięcy', '6 miesięcy to zbyt długa przerwa dla definicji dystymii.'],
        ['Zero dni – objawy muszą występować w każdej sekundzie', 'Kryteria dopuszczają krótkie, trwające poniżej 2 miesięcy okresy lepszego samopoczucia.'],
        'psych-dystymia-q3'
      ),
      q(
        'Który model psychoterapii został stworzony specjalnie do leczenia przewlekłej depresji i dystymii?',
        ['CBASP (Cognitive Behavioral Analysis System of Psychotherapy)', 'CBASP łączy techniki poznawcze, behawioralne i interpersonalne dedykowane przewlekłej depresji.'],
        ['Klasyczna psychoanaliza freudowska', 'Psychoanaliza nie jest terapią pierwszego wyboru o udowodnionej specyfice w PDD.'],
        ['Desensytyzacja EMDR w protokole pojedynczego urazu', 'EMDR jest dedykowany PTSD, nie dystymii.'],
        'psych-dystymia-q4'
      ),
      q(
        'Dlaczego pacjenci z dystymią często późno zgłaszają się do lekarza psychiatry?',
        ['Uważają swój stan za stałą "cechę charakteru" i pesymistyczną naturę ("taki już jestem")', 'Podstępny wieloletni początek sprzyja utożsamieniu objawów z własną osobowością.'],
        ['W dystymii nie występuje cierpienie psychiczne', 'Cierpienie w dystymii jest znaczne i prowadzi do trwałego obniżenia jakości życia.'],
        ['Dystymia zawsze wiąże się z całkowitym brakiem kontaktu z otoczeniem', 'Funkcjonowanie jest zachowane, choć znacznie upośledzone.'],
        'psych-dystymia-q5'
      ),
    ],
  },
  {
    id: 'ocena-samobojstwa',
    moduleId: 'psych-afektywne',
    title: 'Ocena ryzyka samobójczego i plan bezpieczeństwa',
    subtitle: 'Skala C-SSRS, czynniki ryzyka i wskazania do hospitalizacji',
    group: 'Klinika zaburzeń afektywnych',
    minutes: 17,
    goals: [
      'Przeprowadzisz stratyfikację ryzyka samobójczego przy użyciu skali C-SSRS.',
      'Wdrożysz plan bezpieczeństwa (Safety Planning Intervention) i zidentyfikujesz wskazania do hospitalizacji.',
    ],
    sections: [
      {
        title: 'Ocena w skali C-SSRS: od myśli pasywnych do intencji',
        text: 'Columbia-Suicide Severity Rating Scale (C-SSRS) stopniuje myśli samobójcze na 5 poziomach nasilenia: 1) Pasywne pragnienie śmierci ("chciałbym zasnąć i się nie obudzić"), 2) Niespecyficzne myśli samobójcze ("myślałem o odebraniu sobie życia"), 3) Myśli z metodami bez planu i intencji, 4) Myśli z intencją bez konkretnego planu, 5) Myśli samobójcze ze szczegółowym planem i intencją jego realizacji. Poziomy 4 i 5 oznaczają bezpośrednie zagrożenie życia i wymagają natychmiastowych działań interwencyjnych.',
      },
      {
        title: 'Czynniki ryzyka statyczne i dynamiczne',
        text: 'Do czynników statycznych (niemodyfikowalnych) należą: wcześniejsze próby samobójcze (najsilniejszy pojedynczy predyktor), płeć męska (wyższa dokonana śmiertelność), wywiad samobójstwa w rodzinie. Czynniki dynamiczne (modyfikowalne i podlegające pilnej interwencji) to: poczucie beznadziejności (hopelessness), skrajna bezsenność, pobudzenie psychoruchowe/akatyzja, ból psychiczny, intoksykacja alkoholem/substancjami oraz dostęp do śmiercionośnych środków (broń, leki).',
      },
      {
        title: 'Plan bezpieczeństwa (SPI) i wskazania do hospitalizacji',
        text: 'Plan bezpieczeństwa wg Stanleya i Browna składa się z 6 kroków: 1. Sygnały ostrzegawcze, 2. Własne strategie radzenia sobie (bez angażowania innych), 3. Ludzie i miejsca zapewniające odwrócenie uwagi, 4. Osoby bliskie, które można poprosić o pomoc, 5. Profesjonaliści i numery kryzysowe, 6. Bezpieczne otoczenie (usunięcie leków, noży, sznurów). Brak możliwości zapewnienia bezpieczeństwa w domu, plan z intencją lub cechy psychotyczne są wskazaniem do hospitalizacji, w tym w trybie nagłym.',
      },
    ],
    table: {
      headers: ['Poziom C-SSRS', 'Charakterystyka myśli', 'Ryzyko i działanie'],
      rows: [
        ['Poziom 1', 'Pasywne pragnienie śmierci ("lepiej byłoby nie żyć")', 'Niskie; psychoedukacja, plan bezpieczeństwa'],
        ['Poziom 2-3', 'Aktywne myśli samobójcze, rozważanie metod bez intencji', 'Umiarkowane; intensyfikacja opieki, zaangażowanie bliskich'],
        ['Poziom 4', 'Aktywne myśli z pewną intencją działania, bez planu', 'Wysokie; pilna konsultacja, usunięcie środków'],
        ['Poziom 5', 'Aktywne myśli z konkretnym planem i intencją realizacji', 'Imminentne (bezpośrednie); pilna hospitalizacja psychiatryczna'],
      ],
    },
    advanced:
      'W prawie polskim (Ustawa o ochronie zdrowia psychicznego) przyjęcie do szpitala psychiatrycznego bez zgody pacjenta (art. 23) dopuszczalne jest wyłącznie wtedy, gdy osoba z zaburzeniami psychicznymi bezpośrednio zagraża swojemu życiu albo życiu lub zdrowiu innych osób. Dwa leki o udowodnionym specyficznym działaniu przeciw-samobójczym (niezależnym od ogólnego efektu antydepresyjnego) to lit w ChAD/MDD oraz klozapina w schizofrenii.',
    summary:
      'Skala C-SSRS różnicuje myśli pasywne od intencji i planu (poziom 4-5 = bezpośrednie zagrożenie). Wdrożenie Planu Bezpieczeństwa (SPI) i usunięcie dostępu do niebezpiecznych środków ratuje życie.',
    sourceIds: ['cssrs-scale', 'nice-depression', 'maudsley15', 'canmat-mdd-2023'],
    questions: [
      q(
        'Jaki jest najsilniejszy pojedynczy statyczny czynnik ryzyka dokonania samobójstwa w przyszłości?',
        ['Próba samobójcza w wywiadzie', 'Wcześniejsza próba samobójcza jest statystycznie najsilniejszym predyktorem powtórnego zamachu.'],
        ['Podwyższony poziom cholesterolu', 'Nie ma udowodnionego związku ze statycznym ryzykiem suicydalnym.'],
        ['Wiek poniżej 10 lat', 'Wiek dziecięcy nie jest najsilniejszym predyktorem dokonanych samobójstw.'],
        'psych-suicide-q1'
      ),
      q(
        'Co oznacza poziom 5 w skali C-SSRS?',
        ['Myśli samobójcze ze szczegółowym planem i intencją realizacji', 'To najwyższy poziom z bezpośrednim, imminentnym zagrożeniem zamachem samobójczym.'],
        ['Pasywne pragnienie śmierci bez myśli o odebraniu sobie życia', 'Pasywne myśli to poziom 1 w skali C-SSRS.'],
        ['Brak jakichkolwiek myśli o śmierci', 'Brak myśli oznacza wynik ujemny w przesiewie C-SSRS.'],
        'psych-suicide-q2'
      ),
      q(
        'Który krok jest krytycznym elementem Planu Bezpieczeństwa (Safety Planning Intervention)?',
        ['Zabezpieczenie i ograniczenie dostępu do śmiercionośnych środków (leki, ostre narzędzia, broń)', 'Redukcja dostępu do środków (lethal means restriction) ratuje życie w chwilach impulsu.'],
        ['Podpisanie "kontraktu na niepopełnienie samobójstwa" bez innych działań', 'Takie kontrakty nie mają udowodnionej skuteczności i dają fałszywe poczucie bezpieczeństwa.'],
        ['Wypisanie pacjenta bez numerów kryzysowych', 'Plan bezpieczeństwa bezwzględnie wymaga listy telefonów pomocowych.'],
        'psych-suicide-q3'
      ),
      q(
        'Który lek wykazuje bezpośrednie, specyficzne działanie przeciw-samobójcze w zaburzeniach afektywnych?',
        ['Węglan litu', 'Lit posiada silne dowody EBM na redukcję zgonów samobójczych w ChAD i nawracającej depresji.'],
        ['Hydroksyzyna', 'Hydroksyzyna działa przeciwhistaminowo i uspokajająco, bez specyficznego efektu antysuicydalnego.'],
        ['Propranolol', 'Beta-bloker redukuje objawy somatyczne lęku, ale nie zapobiega samobójstwom.'],
        'psych-suicide-q4'
      ),
      q(
        'Kiedy zgodnie z prawem możliwe jest przyjęcie pacjenta do szpitala psychiatrycznego bez jego zgody?',
        ['Gdy wskutek zaburzenia psychicznego bezpośrednio zagraża swojemu życiu albo życiu lub zdrowiu innych', 'To ustawowa przesłanka art. 23 Ustawy o ochronie zdrowia psychicznego.'],
        ['Gdy rodzina nie ma czasu opiekować się pacjentem', 'Względy socjalne nie stanowią podstawy do hospitalizacji przymusowej.'],
        ['Gdy pacjent odmawia zażywania suplementów witaminowych', 'Odmowa suplementacji nie spełnia kryteriów bezpośredniego zagrożenia życia.'],
        'psych-suicide-q5'
      ),
    ],
  },
];
