import type { GonadCaseDraft } from './cases-gonads-types.ts';

export const gonadCasesPart1: GonadCaseDraft[] = [
  {
    id: 'case-gonady-fizjologia-hpg',
    title: 'Zagadka braku zapachu i pokwitania',
    patient: 'Mężczyzna, 21 lat',
    difficulty: 'Podstawowy',
    intro: 'Młody mężczyzna zgłasza się z powodu braku objawów dojrzewania płciowego oraz wrodzonego całkowitego braku węchu (anosmii).',
    steps: [
      {
        prompt: 'Pacjent ma eunuchoidalne proporcje ciała, małe jądra (objętość 2 ml) i brak zarostu. Nigdy nie odczuwał zapachów. Jaka jest hipoteza wstępna?',
        context: 'Wzrost 188 cm, rozpiętość ramion 194 cm, wysokie podniebienie.',
        options: [
          { text: 'Wrodzony hipogonadyzm hipogonadotropowy z anosmią (zespół Kallmanna)', explanation: 'Defekt migracji neuronów syntetyzujących GnRH oraz komórek opuszki węchowej z plakody nosowej do podwzgórza prowadzi do współwystępowania hipogonadyzmu i anosmii.' },
          { text: 'Pierwotna moczówka prosta nefrogenna', explanation: 'Moczówka prosta dotyczy wazopresyny i gospodarki wodnej, bez wpływu na dojrzewanie płciowe i węch.' },
        ],
      },
      {
        prompt: 'Które badania hormonalne potwierdzą hipogonadyzm hipogonadotropowy?',
        context: 'Pobrano krew rano na czczo.',
        options: [
          { text: 'Niskie stężenie testosteronu przy nieadekwatnie niskich lub niewykrywalnych stężeniach LH i FSH', explanation: 'W zespole Kallmanna przysadka nie jest stymulowana pulsami GnRH, co skutkuje brakiem wyrzutu gonadotropin pomimo głębokiego niedoboru androgenów.' },
          { text: 'Skrajnie podwyższone LH i FSH przy podwyższonym testosteronie', explanation: 'Taki układ wskazywałby na zespół oporności na androgeny (CAIS), a nie hipogonadyzm hipogonadotropowy.' },
        ],
      },
      {
        prompt: 'Rezonans magnetyczny wykazuje hipoplazję lub aplazję opuszek węchowych. Jakie jest ostateczne rozpoznanie?',
        context: 'Kariotyp męski 46,XY.',
        options: [
          { text: 'Zespół Kallmanna (izolowany hipogonadyzm hipogonadotropowy z anosmią)', explanation: 'Kombinacja eunuchoidyzmu, anosmii, hipoplazji opuszek węchowych i hipogonadotropizmu jest patognomoniczna dla zespołu Kallmanna.' },
          { text: 'Guz chromochłonny nadnerczy produkujący noradrenalinę', explanation: 'Phaeochromocytoma wywołuje napadowe nadciśnienie tętnicze i tachykardię, a nie brak pokwitania.' },
        ],
      },
      {
        prompt: 'Pacjent chce rozwinąć męskie cechy płciowe, lecz obecnie nie planuje potomstwa. Jakie jest leczenie z wyboru?',
        context: 'Wiek kostny opóźniony o 4 lata, osteopenia w densytometrii DXA.',
        options: [
          { text: 'Terapia zastępcza testosteronem (TRT) z powolną eskalacją dawki do poziomu dorosłego', explanation: 'TRT indukuje maskulinizację, zamyka nasady kości i buduje masę kostną. Gdy w przyszłości zechce mieć dzieci, terapię zamienia się na gonadotropiny (hCG + rFSH) lub pompę pulsacyjną GnRH.' },
          { text: 'Podawanie wysokich dawek deksametazonu doustnie', explanation: 'Glikokortykosteroidy nasiliłyby osteoporozę i zahamowały dalszy rozwój tkanek.' },
        ],
      },
    ],
  },
  {
    id: 'case-gonady-diagnostyka-laboratoryjna',
    title: 'Niski testosteron u kierowcy z otyłością',
    patient: 'Mężczyzna, 48 lat',
    difficulty: 'Podstawowy',
    intro: 'Kierowca zawodowy z otyłością brzuszną zgłasza spadek energii i obniżenie libido. W rutynowym badaniu testosteron całkowity wynosi 9,1 nmol/l.',
    steps: [
      {
        prompt: 'Mężczyzna ma BMI 34 kg/m2, obwód talii 112 cm. Dlaczego jednorazowy pomiar testosteronu całkowitego nie wystarcza do rozpoznania hipogonadyzmu?',
        context: 'Objawy są nieswoiste i pokrywają się z zespołem obturacyjnego bezdechu sennego.',
        options: [
          { text: 'Otyłość i insulinooporność silnie obniżają wątrobową syntezę SHBG, sztucznie zaniżając testosteron całkowity', explanation: 'Hiperinsulinemia hamuje ekspresję SHBG w wątrobie. Pula hormonu związanego maleje, podczas gdy biologicznie czynny wolny testosteron może być w normie.' },
          { text: 'U osób otyłych testosteron ulega natychmiastowemu wydaleniu przez pot', explanation: 'Testosteron krąży we krwi związany z białkami i jest metabolizowany w wątrobie, nie w pocie.' },
        ],
      },
      {
        prompt: 'Jakie badania uzupełniające należy bezwzględnie zlecić zgodnie z wytycznymi EAU 2024?',
        context: 'Konieczne potwierdzenie w drugim niezależnym pobraniu porannym.',
        options: [
          { text: 'Powtórzenie porannego testosteronu całkowitego wraz z SHBG i albuminą w celu obliczenia wolnego testosteronu wg Vermeulena', explanation: 'Kalkulacja wolnego testosteronu (Vermeulen) lub pomiar dializą równowagową pozwala obiektywnie ocenić frakcję biodostępną u pacjentów z nieprawidłowym SHBG.' },
          { text: 'Tomografię komputerową miednicy mniejszej z kontrastem', explanation: 'TK miednicy nie ocenia stężeń frakcji wolnej hormonów płciowych.' },
        ],
      },
      {
        prompt: 'SHBG wynosi 12 nmol/l (norma 18–54), albumina 44 g/l. Obliczony wolny testosteron wynosi 248 pmol/l (norma > 220 pmol/l). Jakie jest rozpoznanie?',
        context: 'LH wynosi 3,8 IU/l (norma), FSH 4,1 IU/l (norma).',
        options: [
          { text: 'Pozorny niedobór androgenów wynikający z niskiego stężenia SHBG (eugonadyzm biochemiczny)', explanation: 'Prawidłowe stężenie wolnego testosteronu wyklucza prawdziwy hipogonadyzm komórkowy. Niski testosteron całkowity był jedynie artefaktem obniżonego SHBG.' },
          { text: 'Jatrogenna niewydolność komórek Sertolego', explanation: 'Komórki Sertolego odpowiadają za spermatogenezę i inhibinę B, nie za syntezę testosteronu i SHBG.' },
        ],
      },
      {
        prompt: 'Jakie postępowanie terapeutyczne jest wskazane w tym przypadku?',
        context: 'Pacjent dopytuje o receptę na domięśniowy testosteron.',
        options: [
          { text: 'Modyfikacja stylu życia, redukcja masy ciała o 10%, leczenie bezdechu sennego i kontrola za 6 miesięcy bez wdrożenia TRT', explanation: 'Redukcja masy ciała i poprawa wrażliwości insulinowej podnoszą SHBG i stężenie testosteronu całkowitego. Wdrożenie TRT przy prawidłowym wolnym testosteronie jest błędem.' },
          { text: 'Wdrożenie testosteronu undekanianu 1000 mg i.m. co 10 tygodni', explanation: 'Podanie egzogennego testosteronu zablokowałoby sprawną oś HPG i doprowadziło do atrofii jąder i niepłodności.' },
        ],
      },
    ],
  },
  {
    id: 'case-gonady-hipogonadyzm-meski',
    title: 'Wysoki wzrost i małe twarde jądra',
    patient: 'Mężczyzna, 31 lat',
    difficulty: 'Zaawansowany',
    intro: 'Mężczyzna skierowany z poradni leczenia niepłodności z powodu azoospermii w badaniu nasienia. W badaniu fizykalnym zwraca uwagę wysoki wzrost i ginekomastia.',
    steps: [
      {
        prompt: 'W badaniu andrologicznym stwierdzono jądra o objętości 3 ml, bardzo twarde, obustronną bezbolesną ginekomastię i rzadki zarost. Co podejrzewasz?',
        context: 'Wzrost 192 cm, długie kończyny dolne, trudności edukacyjne w dzieciństwie.',
        options: [
          { text: 'Pierwotny hipogonadyzm hipergonadotropowy w przebiegu zespołu Klinefeltera (47,XXY)', explanation: 'Triada: małe twarde jądra (< 4 ml), wysoki eunuchoidalny wzrost i azoospermia to klasyczny fenotyp zespołu Klinefeltera.' },
          { text: 'Wrodzony przerost kory nadnerczy z utratą soli', explanation: 'Postać z utratą soli objawia się w okresie noworodkowym przełomem nadnerczowym i hiperkaliemią.' },
        ],
      },
      {
        prompt: 'Jakich wyników badań hormonalnych i genetycznych oczekujesz?',
        context: 'Krew pobrana rano.',
        options: [
          { text: 'Bardzo wysokie FSH i LH, niski testosteron, kariotyp 47,XXY', explanation: 'Destrukcja i szkliwienie kanalików nasiennych oraz dysfunkcja komórek Leydiga znoszą ujemne sprzężenie zwrotne, powodując masywny wyrzut FSH i LH.' },
          { text: 'Niewykrywalne FSH i LH, testosteron 35 nmol/l, kariotyp 46,XY', explanation: 'To profil nadmiaru androgenów lub dopingu, całkowicie sprzeczny z obrazem małych twardych jąder.' },
        ],
      },
      {
        prompt: 'Badanie cytogenetyczne potwierdziło kariotyp 47,XXY. Jakie jest rozpoznanie?',
        context: 'Gęstość mineralna kości: T-score -2,6 w kręgosłupie L1-L4.',
        options: [
          { text: 'Zespół Klinefeltera z jawnym hipogonadyzmem pierwotnym i osteoporozą', explanation: 'Kariotyp 47,XXY jest najczęstszą genetyczną przyczyną pierwotnej niewydolności jąder u mężczyzn.' },
          { text: 'Gruczolak przysadki wydzielający TSH (TSH-oma)', explanation: 'TSH-oma wywołuje wtórną nadczynność tarczycy, a nie zespół Klinefeltera.' },
        ],
      },
      {
        prompt: 'Pacjent pragnie w przyszłości mieć biologiczne dziecko z partnerką. Jaka jest właściwa kolejność postępowania?',
        context: 'Przed wdrożeniem substytucji testosteronem.',
        options: [
          { text: 'Kwalifikacja do mikrochirurgicznej biopsji jąder (micro-TESE) w celu poszukiwania plemników PRZED rozpoczęciem TRT', explanation: 'Wdrożenie TRT całkowicie zablokowałoby resztkową spermatogenezę. Biopsja micro-TESE daje ok. 40–50% szans na znalezienie ogniskowych plemników do procedury ICSI.' },
          { text: 'Natychmiastowe wdrożenie wysokich dawek testosteronu przez 2 lata', explanation: 'TRT przed pobraniem nasienia zniszczyłoby ostatnie sprawne nisze komórek spermatogennych.' },
        ],
      },
    ],
  },
  {
    id: 'case-gonady-terapia-testosteronem',
    title: 'Zaczerwieniona twarz po iniekcjach',
    patient: 'Mężczyzna, 54 lata',
    difficulty: 'Podstawowy',
    intro: 'Mężczyzna leczony od roku zastrzykami z testosteronu z powodu hipogonadyzmu zgłasza narastające bóle głowy, szumy uszne i zaczerwienienie skóry twarzy.',
    steps: [
      {
        prompt: 'Ciśnienie tętnicze wynosi 155/95 mmHg, twarz ma sino-czerwone zabarwienie. Jakie badanie krwi ma kluczowe znaczenie bezpieczeństwa?',
        context: 'Pacjent przyjmuje testosteron enantan w dawce 250 mg co 2 tygodnie.',
        options: [
          { text: 'Morfologia krwi z oceną hematokrytu (Hct) i hemoglobiny', explanation: 'Erytrocytoza jest najczęstszym i najgroźniejszym powikłaniem iniekcji estrów testosteronu o krótkim okresie półtrwania (wysokie stężenia szczytowe stymulują EPO).' },
          { text: 'Stężenie troponiny sercowej w moczu', explanation: 'Troponina jest białkiem wewnątrzkomórkowym kardiomiocytów oznaczanym w surowicy, nie w moczu.' },
        ],
      },
      {
        prompt: 'Hematokryt wynosi 56% (norma 40–48%), hemoglobina 18,8 g/dl. Testosteron w szczycie 1250 ng/dl. Jak zinterpretować ten stan?',
        context: 'PSA w normie (1,1 ng/ml), wykluczono czerwienicę prawdziwą (mutacja JAK2 ujemna).',
        options: [
          { text: 'Jatrogenna wtórna erytrocytoza posteroidowa przekraczająca próg krytyczny (Hct > 54%)', explanation: 'Hct > 54% drastycznie zwiększa lepkość krwi i opór naczyniowy, niosąc zagrażające życiu ryzyko zakrzepicy żylnej, zatorowości płucnej, udaru i zawału serca.' },
          { text: 'Fizjologiczna adaptacja do umiarkowanego wysiłku fizycznego', explanation: 'Hct 56% jest stanem patologicznym wymagającym natychmiastowej interwencji medycznej.' },
        ],
      },
      {
        prompt: 'Jakie jest natychmiastowe postępowanie ratunkowe u tego chorego?',
        context: 'Pacjent ma objawy zespołu nadlepkości (bóle i zawroty głowy).',
        options: [
          { text: 'Wykonanie flebotomii terapeutycznej (upustu krwi 400–500 ml z uzupełnieniem płynów) i wstrzymanie kolejnej iniekcji', explanation: 'Upust krwi szybko obniża hematokryt i zapobiega katastrofie zakrzepowej. Iniekcje testosteronu należy czasowo odstawić.' },
          { text: 'Podanie preparatu żelaza w wysokiej dawce dożylnej', explanation: 'Żelazo dostarczyłoby substratu do dalszej nasilonej erytropoezy, pogarszając stan pacjenta.' },
        ],
      },
      {
        prompt: 'Jak zmodyfikować długofalową terapię zastępczą po normalizacji hematokrytu?',
        context: 'Pacjent nadal wymaga leczenia hipogonadyzmu.',
        options: [
          { text: 'Zamiana na żel przezskórny lub testosteron undekanian o stabilnym profilu farmakokinetycznym bez wysokich stężeń szczytowych', explanation: 'Stabilne stężenia testosteronu bez gwałtownych pików znacznie rzadziej stymulują erytropoezę niż krótkodziałające iniekcje enantanu/cypionianu.' },
          { text: 'Podwojenie dawki testosteronu enantanu do 500 mg co tydzień', explanation: 'Zwiększenie dawki wywołałoby natychmiastowy nawrót zagrażającej życiu erytrocytozy.' },
        ],
      },
    ],
  },
  {
    id: 'case-gonady-ginekomastia',
    title: 'Bolesne powiększenie sutków u sportowca',
    patient: 'Mężczyzna, 23 lata',
    difficulty: 'Podstawowy',
    intro: 'Młody mężczyzna, regularnie trenujący sporty siłowe, zauważył bolesne stwardnienia pod obiema brodawkami sutkowymi od 2 miesięcy.',
    steps: [
      {
        prompt: 'W badaniu palpacyjnym wyczuwalne są sprężyste, tkliwe krążki tkanki gruczołowej o średnicy 3,5 cm bezpośrednio pod otoczkami. Jak odróżnić ginekomastię od lipomastii?',
        context: 'Brak wciągnięcia brodawki, brak wycieku, węzły chłonne pachowe niepowiększone.',
        options: [
          { text: 'Ginekomastia to twardo-sprężysta tkanka gruczołowa skoncentrowana podbrodawkowo; lipomastia to miękka, rozlana tkanka tłuszczowa', explanation: 'Palpacja techniką szczypcową (dwoma palcami od obwodu do brodawki) pozwala precyzyjnie wyczuć obecność tkanki gruczołowej.' },
          { text: 'Lipomastia zawsze występuje wyłącznie u osób z niedowagą', explanation: 'Lipomastia (pseudoginekomastia) towarzyszy nadmiarowi tkanki tłuszczowej u osób z nadwagą i otyłością.' },
        ],
      },
      {
        prompt: 'Pacjent przyznaje się do stosowania suplementów diety o podejrzanym składzie oraz finasterydu na łysienie. Jakie badania hormonalne należy wykonać?',
        context: 'Konieczne wykluczenie guza jądra lub nadnerczy.',
        options: [
          { text: 'USG jąder, testosteron całkowity, estradiol (E2), LH, prolaktynę oraz b-hCG i AFP', explanation: 'Panel pozwala wykryć zaburzenie równowagi androgenowo-estrogenowej, hiperprolaktynemię oraz guzy jądra (nasieniaki produkujące b-hCG lub Leydigoma produkujące E2).' },
          { text: 'Dobową zbiórkę moczu na kwas 5-hydroksyindolooctowy (5-HIAA)', explanation: '5-HIAA to marker zespołu rakowiaka, niemający związku z ginekomastią.' },
        ],
      },
      {
        prompt: 'USG jąder jest prawidłowe. Estradiol jest podwyższony (68 pg/ml), testosteron prawidłowy, b-hCG ujemne. Jakie jest rozpoznanie?',
        context: 'Stwierdzono przewagę stymulacji receptorów estrogenowych nad androgenowymi w tkance sutka.',
        options: [
          { text: 'Prawdziwa ginekomastia gruczołowa wywołana zaburzeniem stosunku androgenów do estrogenów (polekowa / związana z suplementacją)', explanation: 'Hamowanie 5-alfa-reduktazy (finasteryd) zwiększa pulę wolnego testosteronu dostępnego dla aromatazy, nasilając konwersję do estradiolu.' },
          { text: 'Rak przewodowy in situ lewej piersi', explanation: 'Zmiana jest obustronna, symetryczna, sprężysta i związana z zaburzeniami hormonalnymi.' },
        ],
      },
      {
        prompt: 'Ginekomastia trwa krótko (< 6 miesięcy, faza aktywna proliferacyjna). Jakie postępowanie farmakologiczne można rozważyć po odstawieniu leków sprawczych?',
        context: 'Pacjent odczuwa znaczny ból i dyskomfort psychiczny.',
        options: [
          { text: 'Selektywny modulator receptora estrogenowego (tamoksyfen 10–20 mg/dobę) przez 3–6 miesięcy', explanation: 'W fazie wczesnej (przed zwłóknieniem szklistym) tamoksyfen skutecznie blokuje receptory ER w tkance sutka, powodując regresję bólu i tkanki gruczołowej u 80% chorych.' },
          { text: 'Natychmiastowa mastektomia radykalna z usunięciem mięśni piersiowych', explanation: 'Mastektomia radykalna jest zabiegiem onkologicznym nieznajdującym zastosowania w łagodnej ginekomastii.' },
        ],
      },
    ],
  },
  {
    id: 'case-gonady-nieplodnosc-meska',
    title: 'Kłębek robaków w mosznie i słabe nasienie',
    patient: 'Mężczyzna, 32 lata',
    difficulty: 'Podstawowy',
    intro: 'Mężczyzna od 18 miesięcy bezskutecznie stara się z żoną o dziecko. W badaniu andrologicznym po lewej stronie moszny stwierdzono poszerzone naczynia splotu wiciowatego.',
    steps: [
      {
        prompt: 'W pozycji stojącej podczas próby Valsalvy lewy powrózek nasienny przypomina palpacyjnie „worek z dżdżownicami”. Co to za zmiana?',
        context: 'Po prawej stronie badanie bez odchyleń.',
        options: [
          { text: 'Żylaki powrózka nasiennego lewostronne (varicocele)', explanation: 'Varicocele występuje w 85–90% po stronie lewej ze względu na kąt prosty ujścia żyły jądrowej lewej do żyły nerkowej lewej i wyższe ciśnienie hydrostatyczne.' },
          { text: 'Ostre zapalenie najądrza wywołane chlamydią', explanation: 'Zapalenie najądrza cechuje się ostrym bólem, obrzękiem, zaczerwienieniem skóry moszny i gorączką.' },
        ],
      },
      {
        prompt: 'Seminogram (badanie nasienia wg WHO 2021) wykazuje: koncentracja 8 mln/ml, ruch postępowy 22%, morfologia 2%. Jak zdefiniować to zaburzenie?',
        context: 'Normy WHO: koncentracja $\ge$ 15 mln/ml, ruch postępowy $\ge$ 30%, morfologia $\ge$ 4%.',
        options: [
          { text: 'Oligoasthenoteratozoospermia (zespół OAT)', explanation: 'Jednoczesne obniżenie liczby (oligo-), ruchliwości (astheno-) i prawidłowej budowy (teratozoospermia) plemników.' },
          { text: 'Całkowita aspermia z martwicą kanalików', explanation: 'Aspermia oznacza brak ejakulatu, podczas gdy pacjent oddał ejakulat z plemnikami.' },
        ],
      },
      {
        prompt: 'W jaki sposób żylaki powrózka nasiennego upośledzają spermatogenezę?',
        context: 'USG Doppler potwierdza wsteczny przepływ krwi w żyle jądrowej lewej > 2 sekundy.',
        options: [
          { text: 'Podwyższenie temperatury moszny, hipoksja żylna i nasilenie stresu oksydacyjnego z fragmentacją DNA plemników', explanation: 'Zastój ciepłej krwi żylnej niweczy fizjologiczny gradient chłodzenia (jądra wymagają temperatury o 2–3°C niższej niż jama brzuszna).' },
          { text: 'Wstrzykiwanie kwasu solnego z żołądka prosto do najądrza', explanation: 'Brak jakiegokolwiek anatomicznego połączenia żołądka z moszną.' },
        ],
      },
      {
        prompt: 'Jakie jest rekomendowane postępowanie wg wytycznych EAU 2024 u tego pacjenta?',
        context: 'Partnerka ma 28 lat i prawidłową rezerwę jajnikową.',
        options: [
          { text: 'Mikrochirurgiczne podwiązanie żył jądrowych z dostępu podpachwinowego (subinguinal microsurgical varicocelectomy)', explanation: 'Mikrochirurgia jest złotym standardem o najwyższym odsetku powodzenia i najmniejszym ryzyku nawrotu oraz wodniaka jądra, istotnie poprawiając parametry nasienia.' },
          { text: 'Zalecenie noszenia ciasnej bielizny i gorących kąpieli', explanation: 'Zwiększenie temperatury moszny jeszcze bardziej zniszczyłoby komórki spermatogenne.' },
        ],
      },
    ],
  },
  {
    id: 'case-gonady-doping-sterydy',
    title: 'Cena za masę mięśniową: zapaść po cyklu AAS',
    patient: 'Mężczyzna, 26 lat',
    difficulty: 'Zaawansowany',
    intro: 'Były kulturysta zgłasza się 4 miesiące po odstawieniu wielomiesięcznego cyklu testosteronu, trenbolonu i nandrolonu. Skarży się na całkowitą utratę libido, impotencję i ciężką depresję.',
    steps: [
      {
        prompt: 'W badaniu: zmniejszenie objętości obu jąder do 6 ml (wiotkie), zanik tkanki mięśniowej, labilność emocjonalna. Co jest pierwotną przyczyną objawów?',
        context: 'Przez 18 miesięcy przyjmował suprafizjologiczne dawki steroidów anaboliczno-androgennych (AAS).',
        options: [
          { text: 'Polekowa supresja osi HPG — zespół hipogonadyzmu indukowanego steroidami anabolicznymi (ASIH)', explanation: 'Suprafizjologiczne stężenia egzogennych androgenów wywołują głębokie, długotrwałe ujemne sprzężenie zwrotne na podwzgórze i przysadkę, wygaszając wydzielanie GnRH, LH i FSH.' },
          { text: 'Wrodzona hipoplazja komórek Leydiga', explanation: 'Zaburzenie wrodzone manifestowałoby się w dzieciństwie, a nie po cyklu dopingowym u 26-latka.' },
        ],
      },
      {
        prompt: 'Jakich wyników badań laboratoryjnych należy się spodziewać w tym zespole?',
        context: 'Krew pobrana na czczo.',
        options: [
          { text: 'Testosteron całkowity poniżej 2 nmol/l, LH < 0,2 IU/l, FSH < 0,2 IU/l', explanation: 'To klasyczny głęboki hipogonadyzm hipogonadotropowy w fazie po odstawieniu dopingu bez wdrożenia skutecznej terapii odblokowującej.' },
          { text: 'Testosteron 45 nmol/l przy LH > 30 IU/l', explanation: 'Taki profil nie występuje po odstawieniu steroidów anabolicznych.' },
        ],
      },
      {
        prompt: 'Dlaczego u tego pacjenta NIE WOLNO wdrożyć typowej terapii zastępczej testosteronem (TRT), jeśli zależy mu na powrocie własnej płodności?',
        context: 'Pacjent planuje w najbliższych latach założenie rodziny.',
        options: [
          { text: 'Egzogenny testosteron podtrzyma supresję przysadkowego LH i FSH, uniemożliwiając restart endogennej spermatogenezy', explanation: 'TRT działa antykoncepcyjnie na jądra. Do powrotu spermatogenezy niezbędna jest wysoka lokalna koncentracja testosteronu wewnątrzjądrowego stymulowana przez LH lub hCG.' },
          { text: 'Testosteron w dawkach leczniczych rozpuszcza kości miednicy', explanation: 'Testosteron mineralizuje i chroni kości, nie powoduje ich rozpuszczania.' },
        ],
      },
      {
        prompt: 'Jaki protokół farmakologiczny (Post-Cycle Recovery) zaleca się w celu restartu osi HPG wg standardów andrologicznych?',
        context: 'Pacjent wymaga pobudzenia komórek Leydiga i zresetowania przysadki.',
        options: [
          { text: 'Terapia skojarzona gonadotropiną kosmówkową (hCG) w celu pobudzenia jąder, a następnie SERM (cytrynian klomifenu) w celu odblokowania przysadki', explanation: 'hCG (analog LH) odbudowuje objętość i funkcję komórek Leydiga, a SERM blokuje receptory estrogenowe w podwzgórzu/przysadce, pobudzając endogenny wyrzut LH i FSH.' },
          { text: 'Podanie leków nasennych i czekanie bez interwencji przez 5 lat', explanation: 'Brak leczenia utrwala atrofię jąder, depresję i ciężką osteoporozę.' },
        ],
      },
    ],
  },
  {
    id: 'case-gonady-pcos',
    title: 'Trądzik, rzadkie miesiączki i pęcherzyki w jajnikach',
    patient: 'Kobieta, 24 lata',
    difficulty: 'Podstawowy',
    intro: 'Młoda kobieta zgłasza się z powodu krwawień miesięcznych występujących co 60–90 dni, uporczywego trądziku i trudności z redukcją masy ciała.',
    steps: [
      {
        prompt: 'W badaniu fizykalnym wskaźnik hirsutyzmu w skali Ferrimana-Gallweya wynosi 11 punktów (norma < 8). Jakie są kryteria rotterdamskie rozpoznania PCOS?',
        context: 'Wymagana obecność co najmniej 2 z 3 kryteriów.',
        options: [
          { text: '1) Rzadkie miesiączki/brak owulacji, 2) Kliniczny lub biochemiczny hiperandrogenizm, 3) Obraz policystycznych jajników w USG (lub wysokie AMH)', explanation: 'Kryteria rotterdamskie (zaktualizowane w wytycznych międzynarodowych 2023) stanowią podstawę rozpoznania po wykluczeniu innych chorób.' },
          { text: 'Obecność nadciśnienia tętniczego i kamicy nerkowej', explanation: 'Nie są to kryteria rozpoznania zespołu policystycznych jajników.' },
        ],
      },
      {
        prompt: 'Które jednostki chorobowe należy bezwzględnie wykluczyć przed postawieniem rozpoznania PCOS?',
        context: 'Pobrano krew rano w fazie folikularnej.',
        options: [
          { text: 'Nieklasyczny wrodzony przerost nadnerczy (NCAH — 17-OHP), hiperprolaktynemię (PRL) oraz dysfunkcję tarczycy (TSH)', explanation: 'Wykluczenie innych schorzeń o podobnym obrazie hiperandrogenizmu i zaburzeń cyklu jest warunkiem sine qua non rozpoznania PCOS.' },
          { text: 'Cukrzycę ciążową w 36. tygodniu', explanation: 'Pacjentka nie jest w ciąży.' },
        ],
      },
      {
        prompt: '17-OH-progesteron wynosi 1,2 ng/ml (< 2,0), TSH i prolaktyna w normie. W USG przezpochwowym: objętość jajników 13 ml, po 24 pęcherzyki w każdym. Rozpoznanie?',
        context: 'Stężenie testosteronu całkowitego 78 ng/dl (podwyższone), AMH 7,8 ng/ml.',
        options: [
          { text: 'Zespół policystycznych jajników (PCOS) — pełny fenotyp A rotterdamski', explanation: 'Obecne są wszystkie 3 kryteria: oligoowulacja, hiperandrogenizm kliniczny i biochemiczny oraz policystyczna morfologia jajników w USG.' },
          { text: 'Przedwczesna niewydolność jajników (POI)', explanation: 'W POI jajniki są małe, pozbawione pęcherzyków, a AMH jest niewykrywalne przy wysokim FSH.' },
        ],
      },
      {
        prompt: 'Pacjentka nie planuje obecnie ciąży. Jakie jest leczenie pierwszego wyboru zaburzeń cyklu i hirsutyzmu?',
        context: 'Stwierdzono również insulinooporność (wskaźnik HOMA-IR 3,4).',
        options: [
          { text: 'Złożona antykoncepcja hormonalna (COC) z progestagenem antyandrogennym oraz modyfikacja stylu życia z metforminą', explanation: 'COC reguluje cykle, chroni endometrium przed rozrostem nowotworowym i podnosi SHBG (obniżając wolny testosteron). Metformina poprawia wrażliwość insulinową.' },
          { text: 'Monoterapia testosteronem podawanym domięśniowo', explanation: 'Podanie testosteronu kobiecie z hiperandrogenizmem dramatycznie nasiliłoby wirylizację.' },
        ],
      },
    ],
  },
];
