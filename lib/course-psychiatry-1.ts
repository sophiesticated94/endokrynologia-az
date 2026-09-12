import { type DraftLesson, q } from './course-types.ts';

export const draftPsychiatryPart1: DraftLesson[] = [
  {
    id: 'wywiad-psychiatryczny-mse',
    moduleId: 'psych-afektywne',
    title: 'Wywiad psychiatryczny i badanie stanu psychicznego (MSE)',
    subtitle: 'Struktura badania, domeny MSE, ocena napędu, afektu i krytycyzmu',
    group: 'Fundamenty i diagnostyka ogólna',
    minutes: 16,
    goals: [
      'Przeprowadzisz ustrukturyzowane badanie stanu psychicznego (Mental Status Examination — MSE).',
      'Zróżnicujesz afekt dostosowany, spłaszczony, blady, niedostosowany i labilny.',
      'Ocenisz krytycyzm chorobowy (wgląd / insight) oraz poczucie chorobowości.',
    ],
    sections: [
      {
        title: 'Domeny badania stanu psychicznego (MSE)',
        text: 'Badanie stanu psychicznego (MSE) jest psychiatrycznym odpowiednikiem badania fizykalnego. Obejmuje standaryzowaną ocenę: 1) Wyglądu ogólnego i zachowania (higiena, kontakt wzrokowy, ubiór, mimika, współpraca); 2) Aktywności psychoruchowej i napędu (spowolnienie, osłupienie, pobudzenie, akatyzja, tiki, manieryzmy); 3) Mowy (tempo, głośność, modulacja, latencja odpowiedzi, ciągłość); 4) Nastroju (deklarowany przez pacjenta stan emocjonalny) i afektu (obserwowalny wyraz emocjonalny); 5) Toku i treści myślenia; 6) Spostrzegania; 7) Funkcji poznawczych (orientacja, uwaga, pamięć); 8) Krytycyzmu i oceny rzeczywistości.',
      },
      {
        title: 'Ocena afektu: wymiary i psychopatologia',
        text: 'Afekt opisuje się w czterech wymiarach: modulacji (odpowiedź na bodźce), zakresu (szeroki vs wąski), adekwatności (zgodność z wypowiadaną treścią) oraz stabilności. Wyróżniamy: afekt spłaszczony (znaczne zubożenie ekspresji mimicznej i modulacji głosu, typowy dla objawów negatywnych), afekt blady/tępy (utrata zdolności głębszego przeżywania), afekt labilny (nagłe, nieadekwatne fluktuacje od śmiechu do płaczu) oraz afekt niedostosowany / paratymię (dysonans między treścią wypowiedzi a wyrazem emocjonalnym, np. uśmiech przy relacji o tragedii).',
      },
      {
        title: 'Krytycyzm chorobowy (Insight) i sojusz terapeutyczny',
        text: 'Krytycyzm ocenia się stopniowo: od pełnego braku poczucia choroby (anozognozja — przekonanie o pełnym zdrowiu mimo skrajnych objawów psychotycznych, częste w schizofrenii i manii), przez krytycyzm częściowy (uznawanie problemów nerwowych lub somatycznych bez wglądu w naturę psychiczną), po pełny wgląd (rozumienie etiologii, konieczności leczenia i przestrzegania zaleceń). Ocena wglądu jest kluczowa dla decyzji o leczeniu ambulatoryjnym vs hospitalizacji.',
      },
    ],
    table: {
      headers: ['Domena MSE', 'Cechy prawidłowe', 'Odchylenia psychopatologiczne', 'Przykłady kliniczne'],
      rows: [
        ['Afekt', 'Żywy, modulowany, dostosowany', 'Spłaszczony, blady, labilny, niedostosowany', 'Spłaszczenie w schizofrenii deficytowej, labilność w naczyniopochodnych OUN'],
        ['Tok myślenia', 'Płynny, ukierunkowany na cel', 'Przyspieszony, spowolniony, rozkojarzony, otamowany', 'Gonitwa myśli w manii, otamowania w schizofrenii'],
        ['Krytycyzm (Insight)', 'Pełny, gotowość do leczenia', 'Brak (anozognozja), częściowy intelektualny', 'Brak krytycyzmu w ostrym epizodzie manii z urojeniami wielkościowymi'],
      ],
    },
    advanced:
      'W formalnym zapisie MSE rozróżnia się „nastrój” (mood — klimat emocjonalny, subiektywny stan raportowany przez pacjenta, np. „czuję pustkę”) od „afektu” (affect — pogoda emocjonalna, obiektywna manifestacja obserwowana przez badacza w danym momencie). Rozbieżność między nastrojem a afektem jest cenną wskazówką diagnostyczną.',
    summary:
      'MSE standaryzuje ocenę wyglądu, napędu, mowy, nastroju, afektu, myślenia, percepcji i wglądu. Kluczowe jest odróżnienie afektu spłaszczonego od labilnego i ocena krytycyzmu chorobowego.',
    sourceIds: ['icd11-cddr', 'dsm5tr', 'stahl-essential'],
    questions: [
      q(
        'Jaka jest fundamentalna różnica między nastrojem (mood) a afektem (affect) w badaniu psychiatrycznym?',
        ['Nastrój to subiektywny, utrwalony stan emocjonalny deklarowany przez pacjenta, a afekt to obiektywny wyraz obserwowany przez badacza', 'Nastrój porównuje się do klimatu, a afekt do chwilowej pogody obserwowalnej w mimice i mowie.'],
        ['Nastrój dotyczy wyłącznie chorób psychotycznych, a afekt zaburzeń nerwicowych', 'Obie domeny ocenia się u każdego pacjenta.'],
        ['Afekt ocenia się wyłącznie testami laboratoryjnymi z krwi', 'Afekt jest elementem oceny klinicznej MSE.'],
        'psych-mse-q1'
      ),
      q(
        'Co oznacza pojęcie paratymii (afektu niedostosowanego)?',
        ['Niezgodność między wyrazem emocjonalnym a treścią przeżyć lub wypowiedzi', 'Klasycznym przykładem jest wesołkowaty uśmiech podczas opowiadania o śmierci bliskiej osoby.'],
        ['Całkowity brak jakichkolwiek emocji i zastyganie', 'To opis stuporu lub skrajnego spłaszczenia afektu.'],
        ['Błyskawiczne przechodzenie od wściekłości do euforii w ciągu sekundy', 'To cecha labilności emocjonalnej.'],
        'psych-mse-q2'
      ),
      q(
        'Czym charakteryzuje się anozognozja w przebiegu ostrej psychozy lub manii?',
        ['Całkowitym brakiem poczucia choroby i nieświadomością istnienia objawów psychotycznych', 'Anozognozja wynika z neurobiologicznego zaburzenia wglądu, nie ze złośliwości pacjenta.'],
        ['Przekonaniem pacjenta, że jest chory na nieuleczalną chorobę somatyczną', 'To cecha urojeń hipochondrycznych.'],
        ['Symulowaniem objawów w celu uzyskania korzyści materialnej', 'To symulacja (malingering).'],
        'psych-mse-q3'
      ),
      q(
        'Które z poniższych zachowań świadczy o otamowaniu (blocking) toku myślenia?',
        ['Nagłe, nieprzewidywalne przerwanie wątku wypowiedzi w pół słowa z poczuciem pustki w głowie', 'Otamowanie to nagłe zatrzymanie toku myślenia, po którym pacjent często nie pamięta, o czym mówił.'],
        ['Wypowiadanie słów z ogromną prędkością i rymowanie', 'To gonitwa myśli (flight of ideas).'],
        ['Ciągłe powtarzanie tego samego słowa zadanego przez lekarza', 'To echolalia lub perseweracja.'],
        'psych-mse-q4'
      ),
      q(
        'Jaki element wywiadu psychiatrycznego ma kluczowe znaczenie prognostyczne przy podejrzeniu choroby afektywnej dwubiegunowej?',
        ['Dokładny wywiad rodzinny w kierunku ChAD, samobójstw i epizodów hipomanii po lekach', 'Obciążenie genetyczne ChAD sięga 70-80% heritability, a wcześniejsza hipomania po SSRI silnie wspiera diagnozę spektrum bipolarnego.'],
        ['Grupa krwi pacjenta i poziom cholesterolu całkowitego', 'Nie mają wartości diagnostycznej w różnicowaniu ChAD.'],
        ['Wyłącznie ocena uzębienia pacjenta', 'Nie determinuje podtypu choroby afektywnej.'],
        'psych-mse-q5'
      ),
    ],
  },
  {
    id: 'klasyfikacje-dsm5-icd11',
    moduleId: 'psych-afektywne',
    title: 'Klasyfikacje diagnostyczne: DSM-5-TR vs ICD-11 CDDR',
    subtitle: 'Podejście operacyjne, wymiarowość, progi czasowe i różnice kategoryzacji',
    group: 'Fundamenty i diagnostyka ogólna',
    minutes: 17,
    goals: [
      'Porównasz filozofię diagnostyczną DSM-5-TR (kryteria twarde) z ICD-11 CDDR (elastyczność kliniczna).',
      'Wskażesz główne różnice w kategoryzacji zaburzeń osobowości, PTSD i żałoby powikłanej.',
      'Zastosujesz operacyjne progi czasowe i kryteria wykluczenia w codziennej praktyce.',
    ],
    sections: [
      {
        title: 'Filozofia DSM-5-TR vs ICD-11 CDDR (2024)',
        text: 'DSM-5-TR (APA 2022) opiera się na sztywnych kryteriach operacyjnych (algorytmy typu „co najmniej X z Y objawów przez Z czasu”), stworzonych głównie dla standaryzacji badań klinicznych. Z kolei ICD-11 CDDR (WHO 2024 — Clinical Descriptions and Diagnostic Requirements) stawia na globalną użyteczność kliniczną (clinical utility), zmniejsza arbitralną liczbę progów objawowych i kładzie nacisk na wymiarowe nasilenie oraz wpływ na funkcjonowanie w różnych kręgach kulturowych.',
      },
      {
        title: 'Kluczowe różnice nozologiczne',
        text: 'Najważniejsze rozbieżności obejmują: 1) Zaburzenia osobowości: ICD-11 całkowicie zrezygnowało z tradycyjnych kategorii (paranoidalna, histrioniczna, schizoidalna) na rzecz oceny stopnia ciężkości (łagodne, umiarkowane, ciężkie) oraz 5 domen cechowych; zachowano jedynie wyróżnik Borderline pattern. DSM-5 zachował 10 tradycyjnych kategorii w 3 wiązkach (A, B, C); 2) Trauma: ICD-11 wprowadziło odrębną jednostkę — Złożone PTSD (Complex PTSD — CPTSD), obejmującą dysregulację afektu, negatywny obraz siebie i trudności w relacjach; 3) Żałoba: ICD-11 definiuje Prolonged Grief Disorder po 6 miesiącach, a DSM-5-TR po 12 miesiącach.',
      },
      {
        title: 'Hierarchia diagnostyczna i wykluczenia',
        text: 'W obu systemach obowiązują uniwersalne zasady wykluczenia: 1) Objawy nie mogą wynikać z bezpośredniego działania fizjologicznego substancji (leku, narkotyku) ani toksyny; 2) Objawy nie mogą być bezpośrednim skutkiem innego stanu somatycznego lub neurologicznego; 3) Diagnoza wyższego rzędu unieważnia diagnozę niższego rzędu (np. objawy psychotyczne występujące wyłącznie w epizodzie manii nie uprawniają do diagnozy schizofrenii).',
      },
    ],
    table: {
      headers: ['Jednostka kliniczna', 'ICD-11 CDDR (2024)', 'DSM-5-TR (2022)'],
      rows: [
        ['Zaburzenia osobowości', 'Wymiarowe (stopień ciężkości + 5 domen cech)', 'Kategoryczne (10 typów w wiązkach A, B, C)'],
        ['Złożona trauma (CPTSD)', 'Odrębna kategoria obok klasycznego PTSD', 'Brak odrębnej jednostki (ujęte w podtypie dysocjacyjnym PTSD)'],
        ['Przedłużona żałoba', 'Prolonged Grief Disorder po 6 miesiącach', 'Prolonged Grief Disorder po 12 miesiącach u dorosłych'],
        ['Schizofrenia', 'Usunięcie podtypów, min. 1 miesiąc objawów', 'Usunięcie podtypów, min. 1 miesiąc ostrych w 6 mies. przebiegu'],
      ],
    },
    advanced:
      'Inicjatywa RDoC (Research Domain Criteria) NIMH stanowi alternatywę biologiczną dla obu klasyfikacji, badając wymiary behawioralne (np. negative valence, reward processing) od poziomu genów i obwodów neuronalnych po zachowanie, bez przywiązania do tradycyjnych jednostek nozologicznych.',
    summary:
      'ICD-11 stawia na elastyczność kliniczną i podejście wymiarowe (np. w zaburzeniach osobowości i CPTSD), podczas gdy DSM-5-TR utrzymuje sztywne algorytmy kryterialne.',
    sourceIds: ['icd11-cddr', 'dsm5tr', 'ptp-standardy'],
    questions: [
      q(
        'Jak klasyfikacja ICD-11 CDDR rewolucyjnie zmieniła diagnozowanie zaburzeń osobowości w porównaniu z DSM-5-TR?',
        ['Zastąpiła 10 tradycyjnych kategorii oceną stopnia ciężkości (łagodne/umiarkowane/ciężkie) oraz domenami cechowymi', 'ICD-11 zrezygnowało z arbitralnych podziałów na rzecz modelu wymiarowego, zachowując jedynie specyfikator cech Borderline.'],
        ['Wprowadziła 40 nowych odrębnych podtypów osobowości', 'Wręcz przeciwnie — zmniejszyła fragmentację kategoryczną.'],
        ['Zabroniła diagnozowania zaburzeń osobowości u osób dorosłych', 'Zaburzenia osobowości pozostają ważną jednostką diagnostyczną.'],
        'psych-class-q1'
      ),
      q(
        'Jaka odrębna jednostka związana z ciężką, powtarzalną traumą istnieje w ICD-11, a nie została wyodrębniona jako osobna choroba w DSM-5-TR?',
        ['Złożony zespół stresu pourazowego (Complex PTSD — CPTSD)', 'CPTSD w ICD-11 obejmuje klasyczną triadę PTSD plus zaburzenia regulacji afektu, poczucie bezwartościowości i trudności relacyjne.'],
        ['Schizofrenia paranoidalna o późnym początku', 'Schizofrenia paranoidalna została wycofana z obu klasyfikacji.'],
        ['Proste zaburzenie lękowe', 'Zaburzenia lękowe istnieją w obu systemach.'],
        'psych-class-q2'
      ),
      q(
        'Jaki jest minimalny próg czasowy trwania żałoby powikłanej (Prolonged Grief Disorder) wymagany w ICD-11 CDDR?',
        ['Co najmniej 6 miesięcy od śmierci bliskiej osoby', 'W ICD-11 próg wynosi 6 miesięcy, podczas gdy DSM-5-TR wymaga 12 miesięcy u osób dorosłych.'],
        ['Wystarczą 2 dni po pogrzebie', 'Reakcja w pierwszych dniach jest fizjologiczną żałobą, nie zaburzeniem psychicznym.'],
        ['Dokładnie 10 lat ciągłego płaczu', '10 lat to stanowczo zbyt długi próg, uniemożliwiający pomoc terapeutyczną.'],
        'psych-class-q3'
      ),
      q(
        'Co jest podstawową zasadą wykluczenia obowiązującą w obu systemach klasyfikacyjnych?',
        ['Wykluczenie bezpośredniego wpływu substancji psychoaktywnych lub ogólnego stanu somatycznego na objawy', 'Przed postawieniem diagnozy pierwotnej należy upewnić się, że objawy nie są wtórne do zatrucia lub choroby ciała.'],
        ['Konieczność wykonania biopsji mózgu przed wdrożeniem leków', 'Biopsja mózgu nie jest elementem rutynowej diagnostyki psychiatrycznej.'],
        ['Brak możliwości współwystępowania więcej niż jednego rozpoznania', 'Współchorobowość (komorbidność) jest powszechna i dopuszczalna.'],
        'psych-class-q4'
      ),
      q(
        'Czym charakteryzuje się podejście Research Domain Criteria (RDoC) w psychiatrii naukowej?',
        ['Bada wymiary neurobiologiczne (obwody, geny, przetwarzanie nagrody) niezależnie od granic jednostek nozologicznych', 'RDoC bada fundamentalne mechanizmy psychiczne w poprzek tradycyjnych rozpoznań DSM i ICD.'],
        ['Zaleca diagnozowanie chorób wyłącznie na podstawie astrologii', 'RDoC to ściśle biologiczny projekt neuropsychologiczny NIMH.'],
        ['Wycofuje wszystkie leki przeciwdepresyjne z rynku', 'RDoC służy lepszemu zrozumieniu patomechanizmów i celowanemu rozwojowi leków.'],
        'psych-class-q5'
      ),
    ],
  },
  {
    id: 'psychopatologia-objawow',
    moduleId: 'psych-afektywne',
    title: 'Psychopatologia ogólna: spostrzeganie, myślenie, pamięć i świadomość',
    subtitle: 'Złudzenia, omamy, omamy rzekome, urojenia, natręctwa i zaburzenia toku myślenia',
    group: 'Fundamenty i diagnostyka ogólna',
    minutes: 18,
    goals: [
      'Zróżnicujesz złudzenia (iluzje), omamy właściwe (halucynacje) oraz omamy rzekome (pseudohalucynacje).',
      'Scharakteryzujesz cechy urojeń i odróżnisz je od myśli nadwartościowych oraz natręctw (obsesji).',
      'Rozpoznasz formalne zaburzenia toku myślenia: rozkojarzenie, niespójność, perseweracje i gonitwę myśli.',
    ],
    sections: [
      {
        title: 'Zaburzenia spostrzegania: iluzje, halucynacje i pseudohalucynacje',
        text: '1) Złudzenia (iluzje): zniekształcone spostrzeżenie realnie istniejącego bodźca zewnętrznego (np. płaszcz na wieszaku w mroku brany za włamywacza), podlegające korekcie pod wpływem uwagi; 2) Omamy właściwe (halucynacje): spostrzeżenia zmysłowe powstające bez bodźca zewnętrznego, rzutowane w przestrzeń zewnętrzną z pełnym poczuciem realności (sądem realizującym); 3) Omamy rzekome (pseudohalucynacje): doznania zmysłowe rzutowane w przestrzeń wewnętrzną (doznawane w głowie, za okiem, w ciele), często z poczuciem ich obcości lub nasyłania przez siły zewnętrzne (klasyczny objaw Kandinskiego-Clérambaulta w schizofrenii).',
      },
      {
        title: 'Zaburzenia treści myślenia: urojenia, myśli nadwartościowe i obsesje',
        text: '1) Urojenia (delusions): błędne, fałszywe przekonania o niezłomnej pewności subiektywnej, niepodatne na racjonalną perswazję i niezgodne z kontekstem kulturowym pacjenta; 2) Myśli nadwartościowe: przekonania silnie naładowane emocjonalnie, dominujące w życiu pacjenta, lecz teoretycznie korygowalne (np. skrajne idee polityczne lub religijne); 3) Myśli natrętne (obsesje): natarczywe, nawracające myśli ego-dystoniczne (pacjent ocenia je jako własne, lecz niechciane, absurdalne i budzące lęk, podejmując próby ich neutralizacji).',
      },
      {
        title: 'Formalne zaburzenia toku myślenia',
        text: 'Dotyczą formy, tempa i dynamiki myślenia: 1) Gonitwa myśli (fuga idearum): skrajne przyspieszenie toku z utratą wątku głównego i kojarzeniem na podstawie dźwięków (rymy, asonanse); 2) Spowolnienie toku myślenia (zahamowanie w depresji); 3) Rozkojarzenie: utrata logicznego związku między zdaniami przy zachowanej gramatyce; 4) Sałata słowna (schizofazja): całkowity rozpad gramatyczny i semantyczny języka; 5) Perseweracje: uporczywe powtarzanie tego samego słowa lub frazy mimo zmiany pytania.',
      },
    ],
    table: {
      headers: ['Fenomen psychopatologiczny', 'Bodziec realny', 'Lokalizacja rzutowania', 'Sąd realizujący (poczucie realności)'],
      rows: [
        ['Złudzenie (iluzja)', 'Obecny (zniekształcony)', 'Przestrzeń zewnętrzna', 'Korygowalny pod wpływem uwagi lub weryfikacji'],
        ['Omam właściwy', 'Brak bodźca', 'Przestrzeń zewnętrzna (fizyczna)', 'Pełny, bezkrytyczny (pacjent słyszy głos zza ściany)'],
        ['Pseudohalucynacja', 'Brak bodźca', 'Przestrzeń wewnętrzna (w głowie/umyśle)', 'Często poczucie obcości lub nasyłania'],
        ['Urojenie', 'Sąd myślowy', 'Nie dotyczy percepcji zmysłowej', 'Bezwzględny, niekorygowalny perswazją'],
      ],
    },
    advanced:
      'W różnicowaniu psychopatologicznym kluczowe jest pojęcie ego-syntoniczności vs ego-dystoniczności. Urojenia są z natury ego-syntoniczne (pacjent traktuje je jako część swojej rzeczywistości), podczas gdy obsesje w OCD są ego-dystoniczne (pacjent cierpi z powodu ich obecności i pragnie się od nich uwolnić). Utrata ego-dystoniczności w OCD może zwiastować transformację w zespół urojeniowy.',
    summary:
      'Omam właściwy rzutowany jest na zewnątrz, pseudohalucynacja do wnętrza głowy. Urojenie jest niekorygowalnym sądem fałszywym (ego-syntonicznym), a obsesja natręctwem niechcianym (ego-dystonicznym).',
    sourceIds: ['icd11-cddr', 'dsm5tr', 'stahl-essential'],
    questions: [
      q(
        'Pacjent twierdzi, że słyszy obcy głos komentujący jego czyny, który rozbrzmiewa bezpośrednio wewnątrz jego czaszki (w głowie). Jest to objaw:',
        ['Pseudohalucynacji (omamu rzekomego)', 'Rzutowanie doznania zmysłowego w przestrzeń wewnętrzną (do głowy) definiuje pseudohalucynację.'],
        ['Klasycznej iluzji wzrokowej', 'Iluzja dotyczy zniekształcenia bodźca zewnętrznego.'],
        ['Wyłącznie myśli nadwartościowej', 'Myśl nadwartościowa nie jest doznaniem zmysłowo-percepcyjnym.'],
        'psych-patho-q1'
      ),
      q(
        'Jaka cecha jednoznacznie odróżnia myśl natrętną (obsesję w OCD) od urojenia w schizofrenii?',
        ['Obsesja jest ego-dystoniczna — pacjent uznaje ją za absurdalną i niechcianą, podczas gdy urojenie jest ego-syntoniczne i bezkrytyczne', 'Poczucie obcości myśli przy jednoczesnym uznawaniu jej za wytwór własnego umysłu jest cechą osiową natręctwa.'],
        ['Obsesje występują wyłącznie w nocy podczas snu REM', 'Obsesje występują w stanie pełnej czuwania.'],
        ['Urojenia zawsze ustępują po prostej prośbie rodziny', 'Urojenia są z definicji niepodatne na racjonalną perswazję.'],
        'psych-patho-q2'
      ),
      q(
        'Widzenie potwora w cieniu rzucanym przez stojący w ciemnym pokoju fotel, które znika po zapaleniu światła, to:',
        ['Złudzenie (iluzja)', 'Bodziec realny (fotel w cieniu) został błędnie zinterpretowany, lecz uległ korekcie po doświetleniu.'],
        ['Omam właściwy rzutowany w nieskończoność', 'Omam nie ma bodźca fizycznego i nie koryguje się zapaleniem światła.'],
        ['Urojenie ksobne pierwszego stopnia', 'To zaburzenie percepcji zmysłowej, nie izolowany sąd myślowy.'],
        'psych-patho-q3'
      ),
      q(
        'Na czym polega rozkojarzenie toku myślenia w schizofrenii?',
        ['Na utracie logicznych powiązań semantycznych między zdaniami przy zachowanej poprawności gramatycznej', 'Zdania są poprawnie zbudowane, ale brak między nimi logicznego związku przyczynowo-skutkowego.'],
        ['Na mówieniu szeptem z powodu zapalenia krtani', 'To objaw czysto laryngologiczny.'],
        ['Na błyskawicznym kojarzeniu wyłącznie na podstawie rymów', 'To gonitwa myśli (fuga idearum).'],
        'psych-patho-q4'
      ),
      q(
        'Co charakteryzuje urojenia oddziaływania (wpływu, owładnięcia)?',
        ['Przekonanie pacjenta, że jego myśli, uczucia lub ruchy ciała są kontrolowane przez zewnętrzną siłę lub aparaturę', 'Urojenia owładnięcia należą do klasycznych objawów osiowych schizofrenii w ICD-11.'],
        ['Poczucie, że pacjent jest najbogatszym człowiekiem na świecie', 'To urojenie wielkościowe.'],
        ['Przekonanie o całkowitym zniszczeniu narządów wewnętrznych (zespół Cotarda)', 'To urojenie nihilistyczne.'],
        'psych-patho-q5'
      ),
    ],
  },
  {
    id: 'depresja-fenotypy-i-kryteria',
    moduleId: 'psych-afektywne',
    title: 'Epizod depresyjny i MDD: fenotypy melancholiczny, atypowy i psychotyczny',
    subtitle: 'Kryteria osiowe, różnicowanie fenotypowe, biologia anhedonii i wytyczne leczenia',
    group: 'Klinika zaburzeń afektywnych',
    minutes: 19,
    goals: [
      'Zdiagnozujesz epizod depresyjny wg ICD-11 i DSM-5-TR z określeniem stopnia ciężkości.',
      'Rozpoznasz specyficzne fenotypy: depresję melancholiczną, atypową i psychotyczną.',
      'Wdrożysz leczenie pierwszego rzutu zgodnie z wytycznymi CANMAT 2023 i NICE NG222.',
    ],
    sections: [
      {
        title: 'Kryteria osiowe i gradacja ciężkości epizodu',
        text: 'Rozpoznanie wymaga trwania objawów przez co najmniej 2 tygodnie. Wymóg ICD-11 to obecność co najmniej 5 z 10 objawów (w tym obniżony nastrój lub anhedonia). Stopnie ciężkości: 1) Łagodny: 5 objawów, funkcjonowanie zachowane przy znacznym wysiłku; 2) Umiarkowany: 6–7 objawów, wyraźne trudności w pracy i relacjach; 3) Ciężki bez objawów psychotycznych: >=8 objawów lub skrajne cierpienie, całkowita niezdolność do codziennych czynności; 4) Ciężki z objawami psychotycznymi (urojenia winy, kary, zubożenia lub omamy słuchowe zgodne lub niezgodne z nastrojem).',
      },
      {
        title: 'Depresja melancholiczna vs atypowa',
        text: '1) Fenotyp melancholiczny (endogenny): całkowita utrata reaktywności nastroju na pozytywne bodźce, jakościowo odmienny głęboki smutek (często odczuwany fizycznie w klatce piersiowej), bezsenność z wybudzaniem wcześnie rano (co najmniej 2h przed czasem), gorsze samopoczucie rano (rytm dobowy), znaczne spowolnienie lub pobudzenie psychoruchowe, jadłowstręt i spadek masy ciała; 2) Fenotyp atypowy: zachowana reaktywność nastroju (chwilowa poprawa pod wpływem miłych wydarzeń), wzmożone łaknienie (hiperfagia/wzrost wagi), hipersomnia (sen >10h na dobę), ołowiana bezwładność kończyn (leaden paralysis) oraz przewlekła nadwrażliwość na odrzucenie w relacjach.',
      },
      {
        title: 'Zasady leczenia i wytyczne EBM',
        text: 'Zgodnie z CANMAT 2023 i NICE: w depresji łagodnej lekami z wyboru są niefarmakologiczne interwencje psychologiczne (CBT, psychoterapia interpersonalna). W depresji umiarkowanej i ciężkiej leczeniem I rzutu są leki nowej generacji: SSRI (sertralina, escitalopram), SNRI (wenlafaksyna, duloksetyna), wortioksetyna lub mirtazapina. W depresji melancholicznej wyższą skuteczność wykazują leki o mechanizmie podwójnym (SNRI, TLPD). W depresji psychotycznej konieczne jest bezwzględne połączenie leku przeciwdepresyjnego z lekiem przeciwpsychotycznym II generacji (np. sertralina + olanzapina) lub pilne ECT.',
      },
    ],
    table: {
      headers: ['Cecha kliniczna', 'Depresja melancholiczna', 'Depresja atypowa', 'Depresja psychotyczna'],
      rows: [
        ['Reaktywność nastroju', 'Całkowicie zniesiona (brak reakcji na bodźce)', 'Zachowana (poprawa w odpowiedzi na nagrodę)', 'Całkowicie zniesiona'],
        ['Rytm snu', 'Bezsenność wczesnoporanna (early morning awakening)', 'Hipersomnia (>10h snu/dobę)', 'Ciężka bezsenność całkowita'],
        ['Łaknienie i masa ciała', 'Jadłowstręt, szybki spadek wagi', 'Wzmożone łaknienie (hiperfagia, tycie)', 'Jadłowstręt, ryzyko odwodnienia'],
        ['Leczenie preferowane', 'SNRI, TLPD, mirtazapina, ECT', 'SSRI, bupropion, MAOI (moklobemid)', 'Antydepresant + lek przeciwpsychotyczny LUB pilne ECT'],
      ],
    },
    advanced:
      'W depresji z objawami psychotycznymi monoterapia lekiem przeciwdepresyjnym jest błędem w sztuce i wykazuje skuteczność rzędu zaledwie 20-30%. Dopiero skojarzenie z neuroleptykiem podnosi odsetek remisji do 60-70%, a w stanach zagrożenia życia (odmowa picia i jedzenia) zabiegiem z wyboru o skuteczności >85% pozostają elektrowstrząsy (ECT).',
    summary:
      'Rozpoznaj fenotyp: melancholia to brak reaktywności i wybudzanie rano (leki dualne/ECT); atypowa to hiperfagia i hipersomnia (SSRI/MAOI); psychotyczna wymaga bezwzględnie antydepresantu z neuroleptykiem lub ECT.',
    sourceIds: ['canmat-mdd-2023', 'nice-depression', 'icd11-cddr', 'dsm5tr'],
    questions: [
      q(
        'Który zestaw objawów definiuje fenotyp depresji z cechami atypowymi wg DSM-5-TR?',
        ['Zachowana reaktywność nastroju, hipersomnia, hiperfagia (przyrost wagi) i ołowiana bezwładność kończyn', 'W depresji atypowej pacjent potrafi na chwilę poczuć się lepiej pod wpływem nagrody, dużo śpi i ma wilczy apetyt.'],
        ['Całkowity brak reaktywności nastroju, wybudzanie 2h przed czasem i jadłowstręt', 'To klasyczny fenotyp melancholiczny.'],
        ['Urojenia zubożenia i omamy potępiające', 'To fenotyp psychotyczny.'],
        'psych-mdd-q1'
      ),
      q(
        'Jakie jest prawidłowe postępowanie farmakologiczne I rzutu w ciężkim epizodzie depresji z urojeniami zubożenia i winy (depresja psychotyczna)?',
        ['Połączenie leku przeciwdepresyjnego z lekiem przeciwpsychotycznym II generacji (lub pilne ECT)', 'Sama monoterapia antydepresantem nie znosi urojeń psychotycznych i ma znikomą skuteczność.'],
        ['Monoterapia dziurawcem zwyczajnym w małej dawce', 'Ziołolecznictwo jest nieskuteczne i niebezpieczne w psychozie.'],
        ['Podanie wyłącznie leku nasennego grupy Z', 'Leki Z nie leczą depresji psychotycznej.'],
        'psych-mdd-q2'
      ),
      q(
        'O ile wcześniej budzi się pacjent z typowym fenotypem depresji melancholicznej w porównaniu ze swoim nawykowym czasem snu?',
        ['Co najmniej 2 godziny wcześniej, z niemożnością ponownego zaśnięcia i najgorszym nastrojem rano', 'Wczesnoporanne wybudzanie jest biologicznym markerem ciężkiej depresji melancholicznej.'],
        ['Budzi się dokładnie 5 minut przed budzikiem w doskonałym nastroju', 'To prawidłowy fizjologiczny rytm.'],
        ['Śpi nieprzerwanie przez 18 godzin i budzi się wypoczęty', 'To hipersomnia.'],
        'psych-mdd-q3'
      ),
      q(
        'Kiedy zgodnie z wytycznymi CANMAT 2023 i NICE zaleca się wdrożenie farmakoterapii w epizodzie depresyjnym?',
        ['W epizodach o nasileniu umiarkowanym i ciężkim lub w łagodnych nieodpowiadających na psychoterapię', 'W łagodnej depresji pierwszym wyborem są interwencje psychologiczne (CBT) i higiena snu.'],
        ['U każdego człowieka zgłaszającego 1-dniowy smutek po kłótni', 'Krótkotrwały smutek reaktywny nie jest chorobą.'],
        ['Dopiero po 15 latach nieskutecznej psychoterapii psychoanalitycznej', 'Odwlekanie leczenia w ciężkiej depresji grozi samobójstwem.'],
        'psych-mdd-q4'
      ),
      q(
        'Które badanie somatyczne jest bezwzględnie konieczne w diagnostyce różnicowej każdego pierwszego epizodu depresji?',
        ['Oznaczenie stężenia TSH (w celu wykluczenia pierwotnej niedoczynności tarczycy)', 'Niedoczynność tarczycy doskonale imituje depresję ze spowolnieniem, apatią i sennością.'],
        ['Biopsja wątroby w znieczuleniu ogólnym', 'Nie ma uzasadnienia diagnostycznego.'],
        ['RTG klatki piersiowej na stojąco bez wskazań', 'Nie służy diagnostyce nastroju.'],
        'psych-mdd-q5'
      ),
    ],
  },
  {
    id: 'mania-hipomania-spektrum',
    moduleId: 'psych-afektywne',
    title: 'Mania, hipomania i spektrum ChAD: kryteria, stany mieszane i pułapki',
    subtitle: 'Kryteria ChAD I vs ChAD II, cechy mieszane (mixed features) i pułapka antydepresantów',
    group: 'Klinika zaburzeń afektywnych',
    minutes: 19,
    goals: [
      'Precyzyjnie odróżnisz manię (ChAD I) od hipomanii (ChAD II) na podstawie kryteriów czasowych i funkcjonalnych.',
      'Zdiagnozujesz epizod mieszany oraz specyfikator mixed features wg DSM-5-TR i ICD-11.',
      'Wskażesz śmiertelne pułapki włączania antydepresantów u chorych z niezdiagnozowanym spektrum ChAD.',
    ],
    sections: [
      {
        title: 'Mania (ChAD I) vs Hipomania (ChAD II): kryteria różnicowe',
        text: '1) Mania: trwa co najmniej 7 dni (lub krócej, jeśli wymaga natychmiastowej hospitalizacji); charakteryzuje się wzmożonym, ekspansywnym lub drażliwym nastrojem, gonitwą myśli, skrajnym spadkiem potrzeby snu (np. 2h snu z poczuciem pełnej energii), wielomównością, podejmowaniem lekkomyślnych działań o wysokim ryzyku (zakupy, ryzykowne zachowania seksualne, nieprzemyślane inwestycje). Prowadzi do ZNACZNEGO upośledzenia funkcjonowania i może przebiegać z objawami psychotycznymi (urojenia wielkościowe, posłannicze). Pojedynczy epizod manii w życiu definiuje ChAD typu I; 2) Hipomania: trwa co najmniej 4 kolejne dni; objawy są wyraźną zmianą w stosunku do normy, ale NIE powodują istotnego upośledzenia funkcjonowania społecznego/zawodowego, NIE wymagają hospitalizacji i NIGDY nie mają cech psychotycznych. Występuje w ChAD typu II (wraz z co najmniej jednym ciężkim epizodem depresyjnym).',
      },
      {
        title: 'Stany mieszane (Mixed Features): najwyższe ryzyko suicydalne',
        text: 'W DSM-5-TR i ICD-11 stany mieszane definiuje się jako występowanie objawów z przeciwnego bieguna w trakcie epizodu dominującego (np. pełny epizod depresyjny z co najmniej 3 objawami maniakalnymi/hipomaniakalnymi: gonitwa myśli, pobudzenie psychoruchowe, przyspieszona mowa). Stan ten charakteryzuje się ogromnym napięciem dysforycznym, drażliwością, bezradnością i jednoczesnym odhamowaniem napędu ruchowego. Wiąże się z najwyższym wskaźnikiem prób samobójczych w całej psychiatrii!',
      },
      {
        title: 'Pułapka antydepresantów (Antidepressant-Induced Switch)',
        text: 'Zastosowanie leku przeciwdepresyjnego (zwłaszcza TLPD lub SNRI, w mniejszym stopniu SSRI) w monoterapii u pacjenta z nierozpoznanym ChAD lub cechami mieszanymi niesie katastrofalne skutki: może wywołać nagły przełom maniakalny (switch), zaindukować cyklotymię z szybką zmianą faz (rapid cycling — >=4 epizody w roku) lub drastycznie nasilić pobudzenie w stanie mieszanym, prowokując samobójstwo. Złotą zasadą w ChAD jest bezwzględne stosowanie stabilizatora nastroju (lit, walproinian, kwetiapina) przed jakimkolwiek rozważeniem ostrożnego dołączenia antydepresantu.',
      },
    ],
    table: {
      headers: ['Cecha różnicowa', 'Mania (ChAD I)', 'Hipomania (ChAD II)'],
      rows: [
        ['Minimalny czas trwania', 'Co najmniej 7 dni (lub hospitalizacja)', 'Co najmniej 4 kolejne dni'],
        ['Wpływ na funkcjonowanie', 'Wyraźne załamanie funkcjonowania zawodowego/społecznego', 'Funkcjonowanie zachowane, często subiektywny wzrost produktywności'],
        ['Konieczność hospitalizacji', 'Częsta, nierzadko w trybie nagłym', 'Bezwzględnie brak wskazań do hospitalizacji (jeśli hospitalizacja → to mania)'],
        ['Objawy psychotyczne', 'Mogą występować (urojenia wielkościowe)', 'BEZWZGLĘDNIE BRAK (obecność psychozy = zawsze mania)'],
      ],
    },
    advanced:
      'Spektrum choroby afektywnej dwubiegunowej wg Akiskala obejmuje podtypy takie jak: ChAD I½ (depresja z przedłużoną hipomanią), ChAD II½ (depresja nałożona na temperament cyklotymiczny), ChAD III (mania/hipomania wywołana wyłącznie lekami przeciwdepresyjnymi) oraz ChAD IV (depresja nałożona na temperament hipertymiczny). Wykrycie cech spektrum chroni przed błędem jatrogennym włączenia monoterapii SSRI.',
    summary:
      'ChAD I to mania (>=7 dni, upośledzenie, psychoza); ChAD II to hipomania (>=4 dni, brak psychozy i bez hospitalizacji) + depresja. Monoterapia antydepresantami w ChAD jest błędem sztuki.',
    sourceIds: ['canmat-isbd-bipolar', 'icd11-cddr', 'dsm5tr', 'ptp-standardy'],
    questions: [
      q(
        'Pojawienie się urojeń wielkościowych (np. przekonanie o byciu wysłannikiem Boga) u pacjenta w stanie podwyższonego nastroju oznacza:',
        ['Zawsze epizod pełnej manii (ChAD I), ponieważ hipomania z definicji wyklucza objawy psychotyczne', 'Obecność jakichkolwiek objawów psychotycznych natychmiast klasyfikuje epizod jako manię, niezależnie od czasu trwania.'],
        ['Ciężką postać hipomanii', 'W hipomanii objawy psychotyczne nigdy nie występują.'],
        ['Wyłącznie zespół odstawienny po nikotynie', 'Nikotyna nie wywołuje urojeń wielkościowych.'],
        'psych-bip-q1'
      ),
      q(
        'Jaki jest minimalny czas trwania wzmożonego nastroju wymagany do rozpoznania epizodu hipomanii w DSM-5-TR i ICD-11?',
        ['Co najmniej 4 kolejne dni', '4 dni to formalny próg hipomanii; dla manii wynosi on 7 dni lub wymaga hospitalizacji.'],
        ['Dokładnie 1 godzina po kawie', 'Krótkotrwałe pobudzenie nie jest hipomanią.'],
        ['Co najmniej 6 miesięcy bez przerwy', '6 miesięcy dotyczy innych jednostek przewlekłych.'],
        'psych-bip-q2'
      ),
      q(
        'Dlaczego stan mieszany (epizod depresyjny z cechami mieszanymi wg DSM-5-TR) niesie najwyższe ryzyko samobójstwa w psychiatrii?',
        ['Łączy głębokie cierpienie i rozpacz depresyjną ze wzmożonym napędem psychoruchowym i gonitwą myśli', 'Pacjent ma energię do realizacji autodestrukcyjnych impulsów przy skrajnej dysforii psychicznej.'],
        ['Ponieważ pacjent w tym stanie stale śpi', 'W stanie mieszanym występuje ciężka bezsenność.'],
        ['Ponieważ wiąże się ze spadkiem ciśnienia tętniczego', 'Ciśnienie tętnicze nie determinuje tendencji samobójczych.'],
        'psych-bip-q3'
      ),
      q(
        'Co grozi pacjentowi z nierozpoznaną chorobą afektywną dwubiegunową po włączeniu leku przeciwdepresyjnego w monoterapii?',
        ['Inwersja fazy w manię (switch), przyspieszenie cykli (rapid cycling) lub wywołanie groźnego stanu mieszanego', 'Monoterapia antydepresantem destabilizuje układ afektywny u chorych predysponowanych do ChAD.'],
        ['Natychmiastowe trwałe wyleczenie z ChAD', 'Leki przeciwdepresyjne nie leczą ChAD w monoterapii.'],
        ['Rozwój raka trzustki w ciągu 24 godzin', 'Brak takiego związku onkologicznego.'],
        'psych-bip-q4'
      ),
      q(
        'Jaki lek stanowi fundament farmakoterapii w zapobieganiu nawrotom manii i depresji oraz ma udowodnione działanie przeciwautodestrukcyjne?',
        ['Węglan litu', 'Lit redukuje ryzyko zgonu z przyczyn samobójczych w ChAD nawet 5-krotnie i jest złotym standardem podtrzymującym.'],
        ['Hydroksyzyna w kroplach', 'Hydroksyzyna działa sedatywnie, ale nie stabilizuje przebiegu ChAD.'],
        ['Monoterapia fluoksetyną', 'Może wywołać epizod maniakalny.'],
        'psych-bip-q5'
      ),
    ],
  },
  {
    id: 'psychoza-i-szlaki-dopaminy',
    moduleId: 'psych-afektywne',
    title: 'Psychoza i schizofrenia: objawy wytwórcze, negatywne i szlaki dopaminy',
    subtitle: 'Kryteria schizofrenii 6A20, mezolimbiczna nadaktywność, kora przedczołowa i wczesna interwencja',
    group: 'Fundamenty i diagnostyka ogólna',
    minutes: 18,
    goals: [
      'Zestawisz objawy pozytywne, negatywne i poznawcze psychozy w kontekście neurobiologicznym.',
      'Powiążesz nadaktywność szlaku mezolimbicznego z powstawaniem doznań znaczenia urojeniowego (aberrant salience).',
      'Wyjaśnisz pojęcie DUP (Duration of Untreated Psychosis) i znaczenie wczesnej interwencji w pierwszym epizodzie (FEP).',
    ],
    sections: [
      {
        title: 'Koncepcja psychozy i aberrant salience (Kapur)',
        text: 'Współczesna neurobiologia definiuje psychozę jako stan nieprawidłowego nadawania znaczenia obojętnym bodźcom (aberrant salience). Prawidłowo dopamina w prążkowiu brzusznym sygnalizuje bodźce istotne dla przetrwania. W psychozie patologiczny, hiperergiczny wyrzut dopaminy w szlaku mezolimbicznym sprawia, że przypadkowe zdarzenia (np. czerwony samochód za oknem, kaszlnięcie przechodnia) zyskują skrajnie doniosłe, intymne znaczenie. Umysł pacjenta konstruuje urojenia jako wtórną próbę poznawczego wyjaśnienia tego obezwładniającego poczucia doniosłości.',
      },
      {
        title: 'Kryteria schizofrenii ICD-11 CDDR (6A20) i podział objawów',
        text: 'ICD-11 wymaga co najmniej 2 objawów przez minimum 1 miesiąc (w tym min. 1 podstawowego: uporczywe urojenia, omamy, zaburzenia toku myślenia, doznania owładnięcia/wpływu). Wymiary psychopatologiczne: 1) Pozytywny (urojenia prześladowcze, ksobne, nasyłania myśli; omamy słuchowe komentujące); 2) Negatywny (alogia, awolicja, anhedonia, spłaszczenie afektu, asocjalność — 5A); 3) Poznawczy (spadek pamięci roboczej, funkcji wykonawczych i uwagi); 4) Dezorganizacji (dziwaczne zachowanie, niespójność wypowiedzi).',
      },
      {
        title: 'Pierwszy epizod psychozy (FEP) i czas nieleczonej psychozy (DUP)',
        text: 'Okres od wystąpienia pierwszych jawnych objawów psychotycznych do wdrożenia skutecznego leczenia przeciwpsychotycznego definiuje się jako DUP (Duration of Untreated Psychosis). Badania jednoznacznie dowodzą, że długi DUP (>12 tygodni) koreluje z nieodwracalną utratą substancji szarej w korze czołowej i skroniowej, opornością na leczenie i trwałym inwalidztwem społecznym. Wczesna interwencja farmakologiczna i psychospołeczna w FEP jest najsilniejszym czynnikiem neuroprotekcyjnym.',
      },
    ],
    table: {
      headers: ['Wymiar objawów', 'Przykłady objawów', 'Patofizjologia w OUN', 'Wpływ leków blokujących D2'],
      rows: [
        ['Wymiar pozytywny', 'Urojenia ksobne, omamy słuchowe, poczucie nasyłania myśli', 'Hipersekrecja dopaminy w szlaku mezolimbicznym', 'Wysoka skuteczność (redukcja o >50% w PANSS)'],
        ['Wymiar negatywny', 'Awolicja, anhedonia, alogia, asocjalność, spłaszczony afekt', 'Hipofunkcja D1 w korze przedczołowej (DLPFC)', 'Znikoma (FGA mogą wręcz nasilać objawy negatywne)'],
        ['Wymiar poznawczy', 'Spadek pamięci operacyjnej i elastyczności myślenia', 'Zaburzenia synaptyczne receptorów NMDA i interneuronów GABA', 'Brak poprawy; kluczowa rehabilitacja poznawcza'],
      ],
    },
    advanced:
      'Hipoteza glutaminianergiczna schizofrenii wyjaśnia ograniczenia samej teorii dopaminowej: hipofunkcja receptorów NMDA na interneuronach GABA-ergicznych kory prowadzi do odhamowania neuronów glutaminianergicznych rzutujących do VTA, co wtórnie napędza hipersekrecję dopaminy w układzie mezolimbicznym, a jednocześnie wywołuje hipodopaminergię w korze przedczołowej.',
    summary:
      'Psychoza wynika z aberrant salience napędzanego hipersekrecją dopaminy mezolimbicznej. Kluczowe jest skracanie czasu nieleczonej psychozy (DUP <12 tyg.) w celu ochrony kory mózgowej.',
    sourceIds: ['icd11-cddr', 'dsm5tr', 'wfsbp-schizophrenia', 'nice-schizophrenia'],
    questions: [
      q(
        'Na czym polega zjawisko „aberrant salience” opisane przez Shita Kapura w patofizjologii psychozy?',
        ['Na patologicznym, hiperdopaminergicznym przypisywaniu skrajnego znaczenia neutralnym bodźcom z otoczenia', 'Błędnie zasygnalizowane znaczenie zmusza mózg do urojeniowego wyjaśnienia sytuacji.'],
        ['Na całkowitej utracie zdolności widzenia barw', 'Brak związku z percepcją barw.'],
        ['Na nagłym wzroście łaknienia węglowodanów', 'Dotyczy przetwarzania znaczenia poznawczego, nie łaknienia.'],
        'psych-psy-q1'
      ),
      q(
        'Co oznacza skrót DUP w kontekście wczesnej interwencji w psychozie i dlaczego ma kluczowe znaczenie?',
        ['Duration of Untreated Psychosis (czas trwania nieleczonej psychozy) — jego wydłużenie nieodwracalnie pogarsza rokowanie', 'Dłuższy DUP wiąże się z neuroprogresją, ubytkiem substancji szarej i rozwojem lekooporności.'],
        ['Dose of Unused Pills (dawka niewykorzystanych tabletek)', 'To nie jest medyczna definicja DUP.'],
        ['Degree of Unilateral Paralysis (stopień porażenia połowiczego)', 'To termin neurologiczny z zakresu udarów.'],
        'psych-psy-q2'
      ),
      q(
        'Który z wymienionych objawów należy do tzw. wymiaru negatywnego (osiowych objawów deficytowych) schizofrenii?',
        ['Awolicja (brak woli i niezdolność do inicjowania działań ukierunkowanych na cel)', 'Awolicja, alogia, anhedonia, spłaszczenie afektu i asocjalność tworzą tzw. wymiar 5A objawów negatywnych.'],
        ['Urojenia prześladowcze', 'Urojenia to wymiar pozytywny (wytwórczy).'],
        ['Omamy słuchowe wrogie', 'Omamy to wymiar pozytywny.'],
        'psych-psy-q3'
      ),
      q(
        'Jaki jest minimalny czas trwania objawów wymagany przez ICD-11 CDDR do postawienia diagnozy schizofrenii (kod 6A20)?',
        ['Minimum 1 miesiąc', 'W ICD-11 kryterium czasowe wynosi co najmniej 1 miesiąc obecności objawów osiowych.'],
        ['Dokładnie 24 godziny', 'Wymaga dłuższego trwania; 24h to ostra psychoza przemijająca.'],
        ['Minimum 5 lat', '5 lat to zdecydowanie za długo; opóźniłoby leczenie o lata.'],
        'psych-psy-q4'
      ),
      q(
        'W jaki sposób leki przeciwpsychotyczne I generacji (np. haloperidol) mogą wpływać na objawy negatywne schizofrenii?',
        ['Mogą je pogłębiać poprzez dodatkową blokadę receptorów D2 w i tak hipodopaminergicznej korze przedczołowej', 'Zjawisko to nosi nazwę wtórnych objawów negatywnych (neuroleptic-induced deficit syndrome).'],
        ['Natychmiast całkowicie usuwają objawy negatywne w ciągu 2 godzin', 'FGA nie leczą objawów negatywnych.'],
        ['Zmieniają objawy negatywne w ciężką manię', 'FGA działają przeciwmaniakalnie.'],
        'psych-psy-q5'
      ),
    ],
  },
];
