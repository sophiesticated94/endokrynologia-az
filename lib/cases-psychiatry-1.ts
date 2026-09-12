import type { ClinicalCase } from './cases-psychiatry-builder.ts';
import { makeFlexibleCase } from './cases-psychiatry-builder.ts';

export const psychiatryCasesPart1: ClinicalCase[] = [
  // 1. MSE - Początek Wątku B (Jakub M., 21 lat - stan podwyższonego ryzyka)
  makeFlexibleCase(
    'wywiad-psychiatryczny-mse',
    'Wycofanie i spowolnienie u studenta (Wątek B)',
    'Jakub M., 21 lat',
    'Zaawansowany',
    'Student informatyki zgłasza się zaniepokojony przez współlokatorów: od 3 miesięcy opuszcza zajęcia, zamyka się w pokoju i ma poczucie obcości otoczenia.',
    [
      {
        stage: 'Obserwacja i badanie MSE',
        context: 'W gabinecie Jakub ma wyraźnie zubożałą mimikę (hipomimia), wypowiada się cicho, z wydłużoną latencją odpowiedzi (2–3 sekundy). Zaprzecza głosom i podsłuchom, ale wspomina o „dziwnym napięciu w powietrzu”.',
        prompt: 'Które elementy badania MSE wskazują na prodromalne objawy ubytkowe (negatywne), a nie na zwykły lęk społeczny?',
        choices: [
          ['Spłycenie afektu, alogia (ubóstwo treści i ilości mowy) oraz bierność w kontakcie emocjonalnym', 'Objawy ubytkowe cechują się pierwotnym deficytem ekspresji i modulacji emocjonalnej, trudnym do przezwyciężenia w bezpośredniej relacji.'],
          ['Izolowane drżenie rąk i przyspieszenie oddechu bez zubożenia mimiki', 'Objawy autonomiczne są charakterystyczne dla pobudzenia lękowego, a nie dla osiowych objawów ubytkowych.'],
          ['Deklaratywny lęk przed oceną ze sprawną modulacją głosu i pełnym kontaktem wzrokowym', 'W lęku społecznym pacjent przeżywa silne emocje i wykazuje adekwatną ekspresję mimiczną mimo unikania ekspozycji.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Diagnostyka różnicowa i badania',
        context: 'Toksykologia moczu na amfetaminę, THC, opioidy jest ujemna. W podstawowych badaniach krwi (morfologia, CRP, TSH) brak odchyleń.',
        prompt: 'Jaki wniosek diagnostyczny jest najbardziej uzasadniony w odniesieniu do badań somatycznych?',
        choices: [
          ['Prawidłowe wyniki zmniejszają prawdopodobieństwo ostrej intoksykacji i zaburzeń tarczycy, ale nie wykluczają procesu psychotycznego ani rzadszych przyczyn organicznych', 'Badania dodatkowe zawężają pole różnicowe, lecz nie stanowią bezpośredniego potwierdzenia pierwotnej psychozy.'],
          ['Prawidłowy panel definitywnie dowodzi pierwotnej schizofrenii i zwalnia z dalszej czujności somatycznej', 'Brak odchyleń w rutynowych badaniach krwi nie stanowi dowodu jednostki psychiatrycznej; wymaga korelacji z trajektorią objawów.'],
          ['Ujemna toksykologia jednoznacznie wyklucza wpływ jakichkolwiek substancji psychoaktywnych w ostatnich miesiącach', 'Rutynowe testy moczowe wykrywają substancje w oknie od kilkunastu godzin do kilku dni (dłużej dla THC), nie dokumentując dłuższego wywiadu.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Kwalifikacja kliniczna (ARMS/CHR)',
        context: 'Nasilenie objawów spełnia kryteria stanu wysokiego ryzyka psychozy (At-Risk Mental State / CHR). Jakub ma spadek funkcjonowania w skali SOFAS z 85 do 45 punktów.',
        prompt: 'Jaka strategia postępowania jest rekomendowana w fazie CHR/ARMS wg wytycznych EBM?',
        choices: [
          ['Ścisłe monitorowanie kliniczne, psychoedukacja rodziny i terapia CBT skoncentrowana na prodromie; leki przeciwpsychotyczne tylko w razie progresji do jawnego epizodu', 'Wytyczne nie zalecają rutynowej neuroleptyzacji w fazie prodromu ze względu na brak dowodu na zapobieganie psychozie i ryzyko metaboliczne/sedacji.'],
          ['Natychmiastowe włączenie haloperydolu w dawce 10 mg/d celem profilaktyki uszkodzenia istoty szarej', 'Klasyczne neuroleptyki w wysokich dawkach w prodromie są błędem sztuki i nasilają objawy negatywne.'],
          ['Wdrożenie leczenia klozapiną w monoterapii w celu zapobieżenia progresji do psychozy', 'Klozapina nie jest zarejestrowana ani wskazana w stanie podwyższonego ryzyka psychozy z uwagi na profil działań niepożądanych.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Analiza kontrfaktyczna',
        context: 'Rozważ alternatywny rozwój sytuacji klinicznej u Jakuba.',
        prompt: 'Gdyby Jakub zgłosił nagłe pojawienie się w nocy omamów wzrokowych, falującego poziomu przytomności i splątania, co byłoby najbardziej dyskryminującym wnioskiem?',
        choices: [
          ['Obraz ten silnie przemawia przeciwko typowemu prodromowi schizofrenii i nakazuje pilną diagnostykę majaczenia / zapalenia mózgu (np. anty-NMDAR)', 'Fluktuacje świadomości i dominacja omamów wzrokowych są czerwonymi flagami organicznymi wymagającymi pilnego oddziału neurologii/OIT.'],
          ['Stan ten jest klasycznym objawem zaostrzenia schizofrenii i wymaga jedynie podwojenia dawki neuroleptyku', 'Schizofrenia przebiega przy jasnej świadomości; zaburzenia przytomności wykluczają pierwotny proces osiowy.'],
          ['Objawy te potwierdzają zaburzenie depresyjne z lękiem uogólnionym', 'Splątanie i omamy wzrokowe nie mieszczą się w obrazie niepowikłanego epizodu depresyjnego.'],
        ],
        answerIndex: 0,
        counterfactual: {
          alteredFact: 'Zaburzenia świadomości i omamy wzrokowe zamiast izolowanego wycofania',
          supports: ['Majaczenie (delirium)', 'Autoimmunologiczne zapalenie mózgu (anty-NMDAR)', 'Ostra neuroinfekcja'],
          arguesAgainst: ['Pierwotna schizofrenia', 'Prodrom CHR'],
          mostDiscriminatingNextStep: 'Pilne nakłucie lędźwiowe, EEG i panel przeciwciał przeciwneuronalnych',
          invalidatedManagementSteps: ['Leczenie ambulatoryjne CBT bez hospitalizacji somatycznej'],
        },
      },
    ],
    { threadId: 'thread-psychosis-trs', timeOffsetWeeks: 0 }
  ),

  // 2. DSM-5 vs ICD-11
  makeFlexibleCase(
    'klasyfikacje-dsm5-icd11',
    'Dylemat kryteriów w gabinecie POZ',
    'Magdalena R., 29 lat',
    'Podstawowy',
    'Pacjentka zgłasza się 6 tygodni po nagłej utracie pracy i rozstaniu z partnerem. Skarży się na ciągły smutek, płaczliwość i bezsenność.',
    [
      {
        stage: 'Ocena kryteriów diagnostycznych',
        context: 'Pacjentka spełnia 6 z 9 kryteriów epizodu depresyjnego wg DSM-5-TR, objawy trwają nieprzerwanie od 4 tygodni, występuje anhedonia i poczucie winy.',
        prompt: 'Czy obecność ciężkiego stresora życiowego (utrata pracy, rozstanie) wyklucza rozpoznanie epizodu depresyjnego?',
        choices: [
          ['Nie, kryteria DSM-5-TR i ICD-11 zniosły automatyczne wykluczenie żałoby i reakcji stresowych, jeśli spełniony jest pełny biologiczny zespół objawów', 'Obecność stresora nie zaprzecza biologicznemu epizodowi depresyjnemu wymagającemu adekwatnego leczenia.'],
          ['Tak, przy obecności stresora klasyfikacje nakazują wyłącznie rozpoznanie reakcji adaptacyjnej bez leczenia', 'Bagatelizowanie pełnoobjawowego epizodu jako zwykłej reakcji na stres opóźnia leczenie.'],
          ['Stresor życiowy pozwala rozpoznać depresję tylko wtedy, gdy pacjent ma myśli samobójcze z planem', 'Kryteria rozpoznania nie wymagają tendencji suicydalnych do stwierdzenia epizodu.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Interpretacja badań laboratoryjnych',
        context: 'TSH wynosi 1,8 mIU/l, morfologia prawidłowa, CRP <1 mg/l.',
        prompt: 'Jak poprawnie zinterpretować te wyniki z perspektywy rozumowania klinicznego?',
        choices: [
          ['Zmniejszają prawdopodobieństwo jawnej niedoczynności tarczycy i aktywnego stanu zapalnego, wspierając diagnozę pierwotnego zaburzenia afektywnego', 'Prawidłowe wyniki eliminują typowe maski internistyczne, choć nie stanowią bezpośredniego testu na depresję.'],
          ['Definitywnie wykluczają wszystkie schorzenia somatyczne mogące imitować zespół zmęczeniowy', 'Laboratorium w normie nie wyklucza zaburzeń snu (np. bezdechu) ani wczesnych faz innych chorób.'],
          ['Stanowią bezpośredni dowód całkowitej remisji biologicznej wykluczający wskazania do farmakoterapii', 'Prawidłowe parametry tarczycy i zapalne wykluczają tło somatyczne, lecz nie oceniają nasilenia osiowych objawów afektywnych.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Kwalifikacja nasilenia i postępowanie',
        context: 'Wynik w skali MADRS wynosi 26 punktów (nasilenie umiarkowane).',
        prompt: 'Jakie postępowanie pierwszego wyboru zalecają wytyczne NICE i CANMAT?',
        choices: [
          ['Farmakoterapia SSRI (np. sertralina, escitalopram) skojarzona ze strukturalną psychoterapią CBT', 'W depresji umiarkowanej połączenie farmakoterapii i psychoterapii wykazuje najwyższą skuteczność.'],
          ['Monoterapia lekami nasennymi z grupy Z przez 6 miesięcy', 'Leki Z nie leczą depresji i niosą ryzyko uzależnienia.'],
          ['Monoterapia preparatami dziurawca w niekontrolowanych dawkach bez monitorowania stanu psychicznego', 'Preparaty ziołowe niosą ryzyko nieprzewidywalnych interakcji cytochromowych i nie stanowią standardu w umiarkowanej depresji.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Decyzja w warunkach niepewności',
        context: 'Pacjentka pyta o czas potrzebny do oceny skuteczności włączonego leku przeciwdepresyjnego.',
        prompt: 'Jaka informacja edukacyjna jest kluczowa dla bezpieczeństwa terapii?',
        choices: [
          ['Pełny efekt terapeutyczny wymaga 4–6 tygodni na dawce docelowej; w pierwszych 10–14 dniach może przejściowo wystąpić niepokój lub nudności', 'Prawidłowa psychoedukacja o latencji terapeutycznej zapobiega przedwczesnemu odstawieniu leku przez pacjenta.'],
          ['Brak subiektywnej poprawy po 7 dniach jest bezwzględnym wskazaniem do natychmiastowej zamiany leku na inną klasę', 'Ocena skuteczności wczesnej odpowiedzi następuje po 2–4 tygodniach; zbyt wczesna rotacja uniemożliwia ocenę efektu terapeutycznego.'],
          ['Poprawa nastroju pojawi się dopiero po 6 miesiącach nieprzerwanego leczenia', 'Wstępna odpowiedź kliniczna jest widoczna po 2–4 tygodniach.'],
        ],
        answerIndex: 0,
      },
    ]
  ),

  // 3. Psychopatologia
  makeFlexibleCase(
    'psychopatologia-objawow',
    'Głosy zza ściany i poczucie podsłuchu',
    'Krzysztof B., 36 lat',
    'Zaawansowany',
    'Inżynier informatyk zgłasza się przekonany, że sąsiedzi zamontowali w gniazdkach mikrofony i komentują każdy jego krok w mieszkaniu.',
    [
      {
        stage: 'Fenomenologia objawów wytwórczych',
        context: 'Krzysztof słyszy dwa obce głosy dyskutujące między sobą w 3. osobie na temat jego myśli i zachowań. Uznaje ich realność za bezdyskusyjną (brak krytycyzmu).',
        prompt: 'Jak w ścisłej nomenklaturze psychopatologicznej określa się ten zestaw objawów?',
        choices: [
          ['Omamy słuchowe słowne (omamy komentujące) oraz urojenia ksobne i prześladowcze (objawy osiowe wg Schneidera)', 'Głosy dyskutujące w 3. osobie i urojenia oddziaływania stanowią klasyczne objawy I rzędu wg Kurta Schneidera.'],
          ['Myśli natrętne ego-dystoniczne i iluzje zmysłowe', 'Myśli natrętne są przez pacjenta krytykowane jako absurdalne, a iluzje wymagają zniekształcenia realnego bodźca.'],
          ['Zespół paranoidalny w przebiegu ostrego epizodu maniakalnego', 'Brak wzmożonego napędu, gonitwy myśli i wielkościowości wyklucza czystą manię.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Neuroobrazowanie i diagnostyka organiczna',
        context: 'W wykonanym badaniu MRI mózgu nie uwidoczniono zmian ogniskowych ani anomalii naczyniowych. Toksykologia moczu ujemna.',
        prompt: 'Jak prawidłowo interpretować brak zmian w rezonansie magnetycznym?',
        choices: [
          ['Zmniejsza prawdopodobieństwo makroskopowego guza OUN lub udaru, lecz nie wyklucza zaburzeń na poziomie sieci neuronalnych typowych dla schizofrenii', 'Neuroobrazowanie strukturalne wyklucza przyczyny makroskopowe, ale schizofrenia nie daje widocznych ognisk w rutynowym MRI.'],
          ['Wyklucza proces psychotyczny i wskazuje na konieczność wykonania natychmiastowej tomografii emisyjnej SPECT', 'Prawidłowy obraz MRI jest typowy dla większości chorych na schizofrenię; SPECT nie jest badaniem rutynowym.'],
          ['Oznacza bezwzględne wskazanie do seryjnego powtarzania rezonansu magnetycznego co 2 tygodnie', 'Brak wskazań do seryjnego rezonansu przy stabilnym i niepowikłanym obrazie neurologicznym.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Wybór strategii terapeutycznej',
        context: 'Objawy trwają od 4 miesięcy i doprowadziły do całkowitego wycofania z pracy zawodowej.',
        prompt: 'Jaki neuroleptyk i w jakiej strategii dawkowania jest rekomendowany w pierwszym epizodzie psychozy?',
        choices: [
          ['Atypowy lek przeciwpsychotyczny (SGA, np. aripiprazol, risperidon lub olanzapina) w małej lub umiarkowanej dawce z powolnym miareczkowaniem', 'Pierwszy epizod cechuje się wysoką wrażliwością terapeutyczną i podatnością na objawy pozapiramidowe; dawki powinny być niższe niż w nawrotach.'],
          ['Haloperydol w dawce 20 mg/d w skojarzeniu z lewomepromazyną domięśniowo', 'Wysokie dawki FGA w pierwszym epizodzie generują ciężkie objawy pozapiramidowe i wtórną traumę leczenia.'],
          ['Wyłącznie benzodiazepina w monoterapii przez 3 miesiące', 'Benzodiazepiny redukują lęk, lecz nie posiadają swoistego działania przeciwpsychotycznego na szlak mezolimbiczny.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Follow-up i wczesne działania niepożądane',
        context: 'Po włączeniu leczenia Krzysztof zgłasza niepokój ruchowy i niemożność usiedzenia na krześle.',
        prompt: 'Jaka reakcja kliniczna jest priorytetowa?',
        choices: [
          ['Rozpoznanie akatyzacji polekowej i rozważenie redukcji dawki lub dołączenia propranololu', 'Akatyzja bywa błędnie mylona z narastaniem pobudzenia psychotycznego, co grozi błędnym zwiększeniem dawki neuroleptyku.'],
          ['Uznanie objawu za zaostrzenie psychozy i natychmiastowe podwojenie dawki neuroleptyku', 'Zwiększenie dawki neuroleptyku dramatycznie nasili akatyzję i może sprowokować zachowania samobójcze.'],
          ['Dołączenie leku przeciwdepresyjnego z grupy SSRI w celu redukcji napięcia lękowego', 'SSRI w ostrej fazie akatyzacji mogą nasilić niepokój ruchowy i nie stanowią leczenia powikłań pozapiramidowych.'],
        ],
        answerIndex: 0,
      },
    ]
  ),

  // 4. Depresja melancholiczna - Początek Wątku A (Tomasz, 48 lat)
  makeFlexibleCase(
    'depresja-fenotypy-i-kryteria',
    'Gdy zmęczenie nie ustępuje po urlopie (Wątek A)',
    'Tomasz K., 48 lat',
    'Zaawansowany',
    'Dyrektor finansowy zgłasza się z powodu postępującej utraty energii, spadku masy ciała o 7 kg i codziennego wybudzania się o 3:30 nad ranem.',
    [
      {
        stage: 'Identyfikacja fenotypu klinicznego',
        context: 'Tomasz nie odczuwa żadnej radości z sukcesów zawodowych (pełna anhedonia), ma głębokie poczucie winy wobec rodziny i czuje się najgorzej o poranku.',
        prompt: 'Jaki fenotyp epizodu depresyjnego prezentuje pacjent?',
        choices: [
          ['Epizod depresyjny z cechami melancholicznymi (somatycznymi)', 'Wczesne budzenie, poranne pogorszenie, spadek masy ciała i głęboka anhedonia to klasyczny wzorzec melancholii.'],
          ['Depresja atypowa z reaktywnością nastroju i hiperfagią', 'W depresji atypowej apetyt rośnie, a nastrój przejściowo poprawia się w odpowiedzi na bodźce.'],
          ['Reakcja żałoby bez cech zespołu biologicznego', 'U Tomasza brak straty bliskiej osoby, a obecny jest ciężki zespół neuroendokrynny.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Badania i pułapki różnicowania',
        context: 'Wykonano badania: TSH 2,1 mIU/l, FT4 w normie, ferrytyna 80 ng/ml, witamina B12 420 pg/ml, morfologia prawidłowa.',
        prompt: 'Co wynika z prawidłowego profilu metaboliczno-tarczycowego?',
        choices: [
          ['Prawidłowe stężenie TSH zmniejsza prawdopodobieństwo pierwotnej niedoczynności tarczycy jako przyczyny apatii, wspierając pierwotną etiologię afektywną', 'Panel hormonalny eliminuje częstą maskę internistyczną, pozwalając skupić się na celowanym leczeniu przeciwdepresyjnym.'],
          ['Jednoznacznie wyklucza jakąkolwiek etiologię endokrynologiczną, w tym zaburzenia osi podwzgórze-przysadka-nadnercza', 'Prawidłowe TSH wyklucza pierwotną dysfunkcję tarczycy, lecz nie bada czynności osi kortyzolowej ani innych układów dokrewnych.'],
          ['Wymaga natychmiastowego wykonania testu stymulacji z TRH w celu wykrycia utajonej niedoczynności', 'Brak wskazań do dynamicznych testów tyreotropowych przy prawidłowym wyjściowym TSH i FT4.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Kwalifikacja terapeutyczna w melancholii',
        context: 'Skala HAM-D wynosi 25 punktów. Tomasz ma myśli rezygnacyjne, bez aktywnego planu samobójczego.',
        prompt: 'Jaki profil leku przeciwdepresyjnego wykazuje najwyższą skuteczność w fenotypie melancholicznym ze spowolnieniem?',
        choices: [
          ['Lek o podwójnym mechanizmie noradrenergiczno-serotoninergicznym (SNRI, np. wenlafaksyna, duloksetyna) lub skojarzenie SSRI z mirtazapiną', 'Modulacja układu noradrenergicznego i receptorów 5-HT2/3 skuteczniej przełamuje spowolnienie melancholiczne niż monoterapię lekiem słabo aktywizującym.'],
          ['Monoterapia bupropionem w najniższej dawce 150 mg/d', 'W głębokim zespole melancholicznym z lękiem i bezsennością bupropion może nasilać niepokój i nie adresuje układu serotoninergicznego.'],
          ['Doraźne podawanie pochodnych benzodiazepiny w monoterapii przez 3 miesiące', 'Benzodiazepiny nie posiadają swoistego działania przeciwdepresyjnego i niosą wysokie ryzyko tolerancji oraz uzależnienia.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Analiza kontrfaktyczna: Wywiad dwubiegunowy',
        context: 'Rozważ zmianę kluczowego faktu w wywiadzie Tomasza.',
        prompt: 'Gdyby Tomasz wspomniał, że 3 lata temu przez 2 tygodnie spał po 2 godziny na dobę, kupił 3 samochody i czuł się „geniuszem finansowym”, jak zmieniłoby to Twoje postępowanie?',
        choices: [
          ['Klasyfikuje to pacjenta w spektrum choroby afektywnej dwubiegunowej (ChAD I); monoterapię SNRI należy bezwzględnie wstrzymać na rzecz stabilizatora nastroju (np. litu)', 'Podanie silnego leku przeciwdepresyjnego w monoterapii w ChAD grozi inwersją fazy w ciężką manię lub stan mieszany.'],
          ['Informacja ta nie ma znaczenia, ponieważ epizod manii miał miejsce dawno temu', 'Każdy przebyty epizod maniakalny trwale zmienia rozpoznanie z jednobiegunowej depresji na ChAD I.'],
          ['Należy podać podwójną dawkę wenlafaksyny, aby zapobiec ponownej manii', 'Leki przeciwdepresyjne nie chronią przed manią, lecz ją prowokują.'],
        ],
        answerIndex: 0,
        counterfactual: {
          alteredFact: 'W wywiadzie epizod manii z wielkościowością i bezsennością',
          supports: ['Choroba afektywna dwubiegunowa typu I (ChAD I)', 'Wskazanie do stabilizatora (lit, walproinian, kwetiapina)'],
          arguesAgainst: ['Nawracające zaburzenie depresyjne (MDD)', 'Bezpieczeństwo monoterapii SNRI'],
          mostDiscriminatingNextStep: 'Wdrożenie normotymika pod kontrolą TDM zamiast samego antydepresantu',
          invalidatedManagementSteps: ['Monoterapia wenlafaksyną lub duloksetyną'],
        },
      },
    ],
    { threadId: 'thread-bipolar-spectrum', timeOffsetWeeks: 0 }
  ),

  // 5. Mania i hipomania - Kontynuacja Wątku A (Dorota K., 26 lat)
  makeFlexibleCase(
    'mania-hipomania-spektrum',
    'Kreatywny zryw i nieprzespane noce (Wątek A)',
    'Dorota K., 26 lat',
    'Zaawansowany',
    'Młoda architektka zostaje przyprowadzona przez partnera: od 5 dni śpi po 3 godziny, mówi z ogromną prędkością, zaciąga kredyty i twierdzi, że odkryła rewolucyjną teorię urbanistyki.',
    [
      {
        stage: 'Różnicowanie manii z hipomanią',
        context: 'Dorota nie czuje zmęczenia, jest drażliwa przy próbie przerwania jej wywodu, a jej plany inwestycyjne grożą natychmiastową ruiną finansową. Nie wykazuje jednak objawów psychotycznych ani konieczności hospitalizacji przymusowej.',
        prompt: 'Który czynnik rozstrzyga o zakwalifikowaniu epizodu jako pełnej manii, a nie hipomanii?',
        choices: [
          ['Znaczące upośledzenie funkcjonowania społeczno-zawodowego i podejmowanie skrajnie ryzykownych działań finansowych', 'Zgodnie z DSM-5-TR i ICD-11 hipomania NIE powoduje znacznego upośledzenia funkcjonowania; obecność poważnych strat oznacza manię.'],
          ['Czas trwania objawów krótszy niż 2 miesiące', 'Kryterium manii to minimum 7 dni lub jakikolwiek czas przy hospitalizacji; 2 miesiące nie są wymagane.'],
          ['Współwystępowanie obniżonego nastroju w godzinach wieczornych (cechy mieszane)', 'Cechy mieszane mogą towarzyszyć zarówno manii, jak i hipomanii; kryterium rozstrzygającym pozostaje stopień dysfunkcji psychospołecznej i konieczność hospitalizacji.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Weryfikacja wywiadu farmakologicznego',
        context: 'Partner ujawnia, że 3 tygodnie temu lekarz POZ włączył Dorocie sertralinę w dawce 100 mg/d z powodu obniżonego nastroju.',
        prompt: 'Jak zaklasyfikować ten stan wg współczesnych kryteriów DSM-5-TR?',
        choices: [
          ['Pełny epizod maniakalny indukowany antydepresantem, utrzymujący się powyżej fizjologicznego efektu leku, upoważnia do rozpoznania ChAD', 'Kryteria DSM-5-TR jednoznacznie wskazują, że pełny zespół maniakalny utrzymujący się poza fizjologiczny czas działania leku przeciwdepresyjnego spełnia kryteria rozpoznania ChAD typu I.'],
          ['Jest to przejściowy odczyn somatyczny niemający związku z podatnością na zaburzenia afektywne dwubiegunowe', 'Rozwinięcie pełnoobjawowego zespołu maniakalnego po SSRI jest wyrazem podłoża dwubiegunowego.'],
          ['Oznacza konieczność natychmiastowej eskalacji dawki sertraliny do 200 mg/d w celu przełamania pobudzenia', 'Podawanie leków przeciwdepresyjnych w manii dramatycznie nasila pobudzenie psychoruchowe i gonitwę myśli.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Natychmiastowa interwencja farmakologiczna',
        context: 'Należy szybko opanować wzmożony napęd, bezsenność i ryzyko autodestrukcji majątkowej.',
        prompt: 'Jaki jest pierwszy i najważniejszy krok w farmakoterapii ostrej manii u Doroty?',
        choices: [
          ['Natychmiastowe odstawienie sertraliny i wdrożenie leku przeciwpsychotycznego o profilu antymaniakalnym (np. kwetiapina, olanzapina, arypiprazol) lub litu', 'Podstawą jest eliminacja czynnika napędzającego i szybka sedacja oraz stabilizacja nastroju lekiem SGA/litem.'],
          ['Kontynuacja sertraliny z dołączeniem melatoniny na sen', 'Melatonina nie zatrzyma kaskady neurochemicznej ostrej manii.'],
          ['Wdrożenie drugiego leku przeciwdepresyjnego o innym mechanizmie', 'Prowokuje stan mieszany i nasila ryzyko samobójcze.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Plan stabilizacji długoterminowej',
        context: 'Po ustąpieniu epizodu ostrego pacjentka wymaga profilaktyki nawrotów w ChAD.',
        prompt: 'Jaki lek stanowi lek pierwszego rzutu i fundament w zapobieganiu nawrotom manii i depresji oraz redukuje ryzyko samobójcze?',
        choices: [
          ['Węglan litu stosowany pod ścisłą kontrolą stężenia w surowicy (TDM 0,6–0,8 mmol/l)', 'Lit jest jedynym stabilizatorem o udowodnionym bezpośrednim działaniu antyautodestrukcyjnym i wysokiej skuteczności profilaktycznej.'],
          ['Lamotrygina w monoterapii w docelowej dawce 200 mg/d', 'Choć lamotrygina zapobiega epizodom depresyjnym, wykazuje słabą skuteczność w prewencji manii i nie posiada bezpośrednich twardych dowodów na redukcję samobójstw w ChAD I.'],
          ['Wenlafaksyna w monoterapii w powolnej titracji', 'Monoterapia lekami przeciwdepresyjnymi w ChAD niesie wysokie ryzyko zmiany fazy w manie i destabilizacji nastroju.'],
        ],
        answerIndex: 0,
      },
    ],
    { threadId: 'thread-bipolar-spectrum', timeOffsetWeeks: 12 }
  ),

  // 6. Psychoza i szlaki dopaminy - Kontynuacja Wątku B (Jakub M., debiut)
  makeFlexibleCase(
    'psychoza-i-szlaki-dopaminy',
    'Gdy świat nabiera ukrytych znaczeń (Wątek B)',
    'Jakub M., 21 lat',
    'Zaawansowany',
    'Sześć miesięcy po pierwszej wizycie Jakub trafia na izbę przyjęć: twierdzi, że telewizor nadaje zaszyfrowane sygnały o zbliżającej się katastrofie, a ludzie na ulicy czytają w jego myślach.',
    [
      {
        stage: 'Ocena szlaków dopaminergicznych',
        context: 'U Jakuba rozwinęły się pełnoobjawowe urojenia ksobne, nasyłania myśli i omamy słuchowe przy zachowanej orientacji w czasie i przestrzeni.',
        prompt: 'Który szlak dopaminergiczny odpowiada za powstawanie objawów wytwórczych (pozytywnych) w psychozie?',
        choices: [
          ['Szlak mezolimbiczny (z nakrywki brzusznej VTA do jądra półleżącego) w stanie hiperaktywności', 'Nadmierne uwalnianie dopaminy w szlaku mezolimbicznym odpowiada za nadawanie nieprawidłowego znaczenia bodźcom (aberrant salience).'],
          ['Szlak nigrostriatalny w stanie pierwotnego zaniku', 'Szlak nigrostriatalny reguluje motorykę; jego zablokowanie wywołuje objawy parkinsonowskie.'],
          ['Szlak guzkowo-lejkowy w stanie całkowitej blokady', 'Szlak guzkowo-lejkowy kontroluje uwalnianie prolaktyny przez przysadkę.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Kwalifikacja poziomu occupancy D2',
        context: 'Rozważasz wdrożenie risperidonu u Jakuba, który nigdy wcześniej nie przyjmował neuroleptyków.',
        prompt: 'Jaki przedział wysycenia receptorów D2 w badaniach PET (okno Kapura) wiąże się ze statystyczną odpowiedzią bez nasilonych objawów pozapiramidowych dla czystego antagonisty?',
        choices: [
          ['Około 65–80% occupancy w prążkowiu (powyżej 80% gwałtownie rośnie ryzyko EPS i hiperprolaktynemii)', 'Klasyczna heurystyka Kapura wyznacza przedział 65–80% dla czystych antagonistów D2.'],
          ['Przedział 85–95% occupancy z intencją pełnego zablokowania szlaku mezokortykalnego', 'Tak wysoka occupancy wiąże się ze skokowym wzrostem EPS i dysforii neuroleptycznej, bez dodatkowej korzyści terapeutycznej dla czystego antagonisty.'],
          ['Przedział 40–50% occupancy dla zminimalizowania sedacji', 'O ile częściowi agoniści działają przy odmiennych wzorcach, dla czystych antagonistów poziom poniżej 60–65% wiąże się ze statystycznie niższą odpowiedzią kliniczną.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Wybór leku i dawki',
        context: 'Jakub waży 72 kg, ma prawidłową czynność nerek i wątroby.',
        prompt: 'Jaka dawka risperidonu w pierwszym epizodzie pozwala osiągnąć docelowe okno occupancy bez prowokowania EPS?',
        choices: [
          ['Dawka 2–4 mg/dobę (miareczkowana od 1 mg)', 'W pierwszym epizodzie dawka 2–3 mg risperidonu osiąga ~70–75% occupancy D2, co jest w pełni wystarczające.'],
          ['Dawka 8–10 mg/dobę w szybkiej eskalacji', 'Dawki powyżej 6 mg risperidonu u pacjentów w pierwszym epizodzie znacząco przekraczają 80% occupancy D2, prowokując EPS bez zwiększenia skuteczności.'],
          ['Dawka 0,5 mg/dobę co drugi dzień', 'Schemat ten nie zapewnia stałego stężenia stacjonarnego w surowicy i wiąże się z subterapeutycznym wysyceniem D2.'],
        ],
        answerIndex: 0,
      },
      {
        stage: 'Monitorowanie powikłań metabolicznych i neurologicznych',
        context: 'Po 4 tygodniach leczenia risperidonem 3 mg/d objawy psychotyczne uległy redukcji o 50%, ale Jakub przybrał 4 kg na wadze, a jego prolaktyna wzrosła do 65 ng/ml.',
        prompt: 'Jakie działanie kliniczne jest najbardziej racjonalne?',
        choices: [
          ['Ocena objawów klinicznych hiperprolaktynemii (ginekomastia, libido), wdrożenie interwencji dietetycznej, a w razie progresji rozważenie rotacji na lek neutralny metabolicznie i prolaktynowo (np. arypiprazol)', 'Wzrost prolaktyny wynika z blokady D2 w szlaku guzkowo-lejkowym; częściowy agonista przywraca właściwy ton dopaminergiczny.'],
          ['Natychmiastowe odstawienie neuroleptyku bez włączenia leku zastępczego', 'Nagłe odstawienie grozi gwałtownym nawrotem ostrej psychozy z psychozą z odbicia.'],
          ['Dołączenie bromokryptyny bez konsultacji i podwojenie dawki risperidonu', 'Agonista dopaminy może zaostrzyć psychozę, a podwojenie dawki pogłębi problem metaboliczny.'],
        ],
        answerIndex: 0,
      },
    ],
    { threadId: 'thread-psychosis-trs', timeOffsetWeeks: 24 }
  ),
];
