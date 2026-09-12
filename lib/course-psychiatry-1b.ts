import { type DraftLesson, q } from './course-types.ts';

export const draftPsychiatryPart1b: DraftLesson[] = [
  {
    id: 'zaburzenia-lekowe-gad-napadowy',
    moduleId: 'psych-afektywne',
    title: 'Zaburzenia lękowe: lęk uogólniony (GAD) i lęk napadowy',
    subtitle: 'Nadaktywność ciała migdałowatego, pętla lęku i farmakoterapia I rzutu',
    group: 'Zaburzenia lękowe i adaptacyjne',
    minutes: 18,
    goals: [
      'Zróżnicujesz napad paniki od przewlekłego lęku wolnopłynącego w GAD.',
      'Scharakteryzujesz rolę jądra migdałowatego i kory przedczołowej w neurobiologii lęku.',
      'Wdrożysz leczenie farmakologiczne I rzutu (SSRI/SNRI, pregabalina) bez uzależnienia od benzodiazepin.'
    ],
    sections: [
      {
        title: 'Neurobiologia lęku i obwód amygdalar',
        text: 'Lęk uogólniony (GAD) charakteryzuje się ciągłym, nadmiernym zamartwianiem się (worry) trwającym co najmniej 6 miesięcy, połączonym z objawami napięcia wegetatywnego i mięśniowego. Neurobiologicznie wynika z osłabienia hamowania zstępującego z brzuszno-przyśrodkowej kory przedczołowej (vmPFC) na jądro środkowe ciała migdałowatego (CeA), co skutkuje toniczną hiperaktywacją pnia mózgu (locus coeruleus) i podwzgórza.'
      },
      {
        title: 'Lęk napadowy (Panic Disorder) a agorafobia',
        text: 'Napad paniki to nagły wyrzut obezwładniającego przerażenia z palpitacjami, dusznością, zawrotami głowy i depersonalizacją, osiągający szczyt w ciągu 10 minut. W odróżnieniu od zawału serca czy guza chromochłonnego, lęk antycypacyjny (lęk przed kolejnym napadem) prowadzi do zachowań unikających i agorafobii.'
      },
      {
        title: 'Zasady leczenia I rzutu: SSRI, SNRI i pregabalina',
        text: 'Zgodnie z wytycznymi WFSBP i NICE lekami I rzutu w GAD i lęku napadowym są SSRI (escitalopram, sertralina) oraz SNRI (wenlafaksyna). Alternatywą w GAD jest pregabalina modyfikująca podjednostkę alfa-2-delta kanałów wapniowych (VGCC). Benzodiazepiny mogą być stosowane jedynie doraźnie przez maksymalnie 2–4 tygodnie ze względu na ryzyko tachyfilaksji i uzależnienia.'
      }
    ],
    table: {
      headers: ['Jednostka', 'Dominujący objaw', 'Ramy czasowe', 'Leczenie I rzutu'],
      rows: [
        ['GAD (lęk uogólniony)', 'Wolnopłynący lęk, zamartwianie, napięcie mięśni', '>= 6 miesięcy', 'SSRI, SNRI, pregabalina, CBT'],
        ['Lęk napadowy', 'Nagłe ataki paniki, objawy autonomiczne, lęk przed śmiercią', 'Nawracające ataki + 1 mies. lęku przed nimi', 'SSRI (sertralina, paroksetyna), CBT'],
        ['Agorafobia', 'Unikanie miejsc publicznych, tłumu, transportu', '>= 6 miesięcy', 'Ekspozycja in vivo (CBT), SSRI']
      ]
    },
    advanced:
      'W pierwszych 7–14 dniach włączania SSRI u pacjentów z lękiem napadowym występuje paradoksalne nasilenie lęku wywołane pobudzeniem autoreceptorów 5-HT2A i 5-HT2C. Standardem jest rozpoczynanie od 1/2 dawki początkowej (np. sertralina 25 mg lub escitalopram 5 mg).',
    summary:
      'Zaburzenia lękowe wynikają z dysregulacji pętli vmPFC-ciało migdałowate. Podstawą terapii są SSRI/SNRI w ostrożnej titracji oraz CBT; pregabalina stanowi niebenzodiazepinową alternatywę w GAD.',
    sourceIds: ['wfsbp-anxiety', 'nice-depression', 'pregabalin-consensus'],
    questions: [
      q(
        'Dlaczego u pacjentów z lękiem napadowym zaleca się rozpoczynanie leczenia SSRI od połowy typowej dawki początkowej?',
        ['Aby uniknąć przejściowego nasilenia lęku (jitteriness syndrome) w pierwszych dniach terapii', 'Początkowy wyrzut serotoniny pobudza receptory 5-HT2A/2C, co może sprowokować ciężki napad paniki.'],
        ['Ponieważ pacjenci z lękiem metabolizują leki 4-krotnie wolniej niż inni', 'Metabolizm wątrobowy nie zależy od rozpoznania zespołu lękowego.'],
        ['Ponieważ SSRI w pełnej dawce natychmiastowo uszkadzają kanały wapniowe', 'SSRI nie blokują destrukcyjnie kanałów wapniowych.'],
        'psych-gad-q1'
      ),
      q(
        'Jaki jest mechanizm przeciwlękowego działania pregabaliny w uogólnionym zaburzeniu lękowym (GAD)?',
        ['Wiązanie z podjednostką alfa-2-delta zależnych od napięcia kanałów wapniowych i redukcja wyrzutu glutaminianu', 'Pregabalina moduluje bramkowanie jonów Ca2+, hamując presynaptyczne uwalnianie neuroprzekaźników pobudzających.'],
        ['Bezpośrednie allosteryczne pobudzenie receptora GABAA w miejscu benzodiazepinowym', 'Pregabalina nie wiąże się z receptorem benzodiazepinowym ani nie zwiększa prądu chlorkowego bezpośrednio.'],
        ['Selektywne blokowanie transportera serotoniny SERT w korze czołowej', 'Pregabalina nie wykazuje powinowactwa do transporterów monoaminowych.'],
        'psych-gad-q2'
      ),
      q(
        'Jaki jest dopuszczalny bezpieczny czas stosowania benzodiazepin w opanowywaniu ostrego lęku wg standardów międzynarodowych?',
        ['Maksymalnie 2 do 4 tygodni, z równoległym wdrożeniem SSRI i psychoterapii', 'Ograniczenie do 2-4 tygodni minimalizuje ryzyko tolerancji, uzależnienia psychofizycznego i zespołu z odbicia.'],
        ['Minimum 6 miesięcy w stałej dawce dobowej', 'Przewlekłe stosowanie BZD prowadzi do down-regulacji receptorów GABA-A i uzależnienia.'],
        ['Bezterminowo, pod warunkiem regularnej kontroli stężenia we krwi', 'Benzodiazepiny nie są lekami do bezterminowej monoterapii lęku.'],
        'psych-gad-q3'
      ),
      q(
        'Która struktura anatomiczna stanowi główne centrum wykonawcze generujące autonomiczne i behawioralne objawy ostrej paniki?',
        ['Ciało migdałowate (amygdala)', 'Jądro środkowe ciała migdałowatego wysyła projekcje do pnia mózgu i podwzgórza, wyzwalając reakcję walki lub ucieczki.'],
        ['Kora potyliczna pierwszorzędowa', 'Kora potyliczna odpowiada za percepcję wzrokową, nie za generowanie paniki.'],
        ['Przedni róg rdzenia kręgowego', 'Rogi przednie zawierają motoneurony obwodowe, nie inicjują lęku.'],
        'psych-gad-q4'
      ),
      q(
        'Kiedy zgodnie z kryteriami diagnostycznymi można rozpoznać zespół lęku uogólnionego (GAD)?',
        ['Gdy nadmierny, trudny do kontrolowania lęk utrzymuje się przez co najmniej 6 miesięcy przez większość dni', 'Wymóg 6 miesięcy odróżnia przewlekły GAD od przejściowych adaptacyjnych reakcji na stresory życiowe.'],
        ['Wystarczy obecność 2 napadów lękowych w ciągu ostatnich 7 dni', 'Dwa napady lękowe w ciągu tygodnia sugerują lęk napadowy, nie GAD.'],
        ['Wyłącznie wtedy, gdy występuje współistniejąca bezsenność z koszmarami nocnymi', 'Koszmary nocne są typowe dla PTSD, a nie obligatoryjne dla GAD.'],
        'psych-gad-q5'
      )
    ]
  },
  {
    id: 'ocd-i-petla-cstc',
    moduleId: 'psych-afektywne',
    title: 'Zaburzenia obsesyjno-kompulsyjne (OCD) i pętla CSTC',
    subtitle: 'Obwody korowo-prążkowiowe, myśli natrętne i wysokie dawki SSRI',
    group: 'Zaburzenia obsesyjno-kompulsyjne',
    minutes: 18,
    goals: [
      'Zrozumiesz rolę pętli korowo-prążkowiowo-wzgórzowo-korowej (CSTC) w patogenezie natręctw.',
      'Rozróżnisz myśli intruzywne (obsesje) od czynności zabezpieczających (kompulsji).',
      'Wdrożysz protokół farmakoterapii OCD oparty na maksymalnych dawkach SSRI i psychoterapii ERP.'
    ],
    sections: [
      {
        title: 'Neuroanatomia pętli CSTC i brak hamowania wzgórzowego',
        text: 'W zaburzeniu obsesyjno-kompulsyjnym (OCD) dochodzi do dysfunkcji pętli korowo-prążkowiowo-wzgórzowo-korowej (cortico-striato-thalamo-cortical, CSTC), obejmującej korę oczodołowo-czołową (OFC), przedni zakręt obręczy (ACC) oraz jądro ogoniaste. Uszkodzenie wewnętrznego filtra prążkowiowego powoduje, że wzgórze stale przesyła do kory sygnały o błędzie lub zagrożeniu, co pacjent odczuwa jako natrętną, intruzywną myśl (obsesję).'
      },
      {
        title: 'Obsesje a kompulsje w ujęciu behawioralnym',
        text: 'Obsesje to nawracające, uporczywe myśli, impulsy lub wyobrażenia (np. skażenie, symetria, agresja), które wywołują silny lęk. Kompulsje to powtarzające się zachowania (mycie rąk, sprawdzanie zamków) lub akty psychiczne mające na celu neutralizację lęku. Wykonanie kompulsji przynosi chwilową ulgę, co poprzez mechanizm wzmocnienia negatywnego utrwala pętlę objawu.'
      },
      {
        title: 'Farmakoterapia OCD: konieczność wysokich dawek i długiego czasu',
        text: 'Leczenie farmakologiczne OCD wymaga znacznie wyższych dawek SSRI niż leczenie depresji (np. sertralina 200 mg/d, fluoksetyna 60–80 mg/d, escitalopram 20–30 mg/d). Czas oczekiwania na pełną odpowiedź wynosi 10–12 tygodni (nie 2–4). Złotym standardem psychoterapii jest terapia ekspozycji z powstrzymaniem reakcji (ERP).'
      }
    ],
    table: {
      headers: ['Lek', 'Dawka w MDD', 'Dawka docelowa w OCD', 'Czas oczekiwania na odpowiedź'],
      rows: [
        ['Sertralina', '50–100 mg/d', '150–200 mg/d', '8–12 tygodni'],
        ['Fluoksetyna', '20–40 mg/d', '60–80 mg/d', '10–12 tygodni'],
        ['Klomipramina (TLPD)', '75–150 mg/d', '150–250 mg/d', '8–12 tygodni'],
        ['Escitalopram', '10–20 mg/d', '20–30 mg/d (z EKG)', '10–12 tygodni']
      ]
    },
    advanced:
      'W przypadkach lekoopornego OCD (brak poprawy po 2 próbach wysokimi dawkami SSRI + ERP) wytyczne NICE i WFSBP rekomendują augmentację atypowym lekiem przeciwpsychotycznym o niskim profilu antydopaminergicznym (aripiprazol 5–10 mg lub rysperydon 1–2 mg), który moduluje prążkowiowy wyrzut dopaminy.',
    summary:
      'OCD to organiczna dysfunkcja pętli CSTC. Sukces terapeutyczny wymaga wysokich dawek SSRI stosowanych przez minimum 10–12 tygodni w połączeniu z psychoterapią ERP oraz ewentualną augmentacją aripiprazolem.',
    sourceIds: ['nice-ocd', 'wfsbp-anxiety', 'maudsley15'],
    questions: [
      q(
        'Czym różni się dawkowanie SSRI w OCD od typowego dawkowania w epizodzie depresyjnym (MDD)?',
        ['W OCD stosuje się maksymalne lub ponadstandardowe dawki, a czas do oceny odpowiedzi wynosi 8–12 tygodni', 'Desensytyzacja receptorów w pętli CSTC wymaga wyższego stopnia wysycenia SERT i dłuższego czasu niż w depresji.'],
        ['W OCD stosuje się wyłącznie mikrodawki przez 7 dni', 'Mikrodawki nie wywierają żadnego mierzalnego efektu w obwodach CSTC w OCD.'],
        ['W OCD SSRI podaje się wyłącznie dożylnie w warunkach szpitalnych', 'SSRI w OCD stosuje się standardowo drogą doustną ambulatoryjnie.'],
        'psych-ocd-q1'
      ),
      q(
        'Jaki obwód neuronalny wykazuje udowodnioną neuroobrazowo nadaktywność u pacjentów z OCD?',
        ['Pętla korowo-prążkowiowo-wzgórzowo-korowa (CSTC)', 'Nadaktywność OFC i jądra ogoniastego generuje nieustanne poczucie błędu i przymus wykonania czynności.'],
        ['Droga siatkowo-rdzeniowa boczna', 'Droga siatkowo-rdzeniowa kontroluje napięcie mięśniowe, nie generuje myśli intruzywnych.'],
        ['Pęczek łukowaty lewej półkuli', 'Pęczek łukowaty łączy ośrodki mowy Broki i Wernickego.'],
        'psych-ocd-q2'
      ),
      q(
        'Jaka metoda psychoterapii poznawczo-behawioralnej jest złotym standardem o najwyższej skuteczności w OCD?',
        ['Ekspozycja z powstrzymaniem reakcji (ERP - Exposure and Response Prevention)', 'Narażenie na bodziec wyzwalający bez wykonania kompulsji prowadzi do habituacji i wygaszenia lęku.'],
        ['Klasyczna psychoanaliza bez zadań domowych', 'Brak aktywnej ekspozycji behawioralnej nie przerywa pętli kompulsyjnej w OCD.'],
        ['Hipnoterapia regresyjna', 'Hipnoterapia nie posiada dowodów klasy I w randomizowanych badaniach w OCD.'],
        'psych-ocd-q3'
      ),
      q(
        'Jaki lek z grupy TLPD o silnym komponencie serotoninergicznym jest zarejestrowany i wysoce skuteczny w OCD?',
        ['Klomipramina', 'Klomipramina jest najsilniejszym inhibitorem wychwytu zwrotnego serotoniny wśród TLPD i wykazuje dużą siłę w OCD.'],
        ['Amitryptylina', 'Amitryptylina działa silnie sedatywnie i przeciwbólowo, lecz ustępuje klomipraminie w OCD.'],
        ['Maprotylina', 'Maprotylina jest selektywnym inhibitorem wychwytu noradrenaliny bez wpływu na 5-HT.'],
        'psych-ocd-q4'
      ),
      q(
        'Który lek jest rekomendowany w I kolejności do augmentacji SSRI w przypadku lekoopornego OCD wg wytycznych NICE?',
        ['Aripiprazol lub rysperydon w małej dawce', 'Częściowy agonizm D2 aripiprazolu lub mała dawka rysperydonu moduluje przekaźnictwo dopaminowe w prążkowiu.'],
        ['Diazepam w dawce 40 mg/d', 'Benzodiazepiny nie wykazują skuteczności przeciwobsesyjnej i nie przerywają natręctw.'],
        ['Metylotransferaza w iniekcjach domięśniowych', 'Nie jest to substancja stosowana w farmakoterapii psychiatrycznej.'],
        'psych-ocd-q5'
      )
    ]
  },
  {
    id: 'ptsd-trauma-stres',
    moduleId: 'psych-afektywne',
    title: 'Zaburzenia pourazowe: PTSD, złożony PTSD i ostra reakcja na stres',
    subtitle: 'Obwód strachu, hipokamp, neuroplastyczność i farmakoterapia wspomagająca',
    group: 'Zaburzenia lękowe i adaptacyjne',
    minutes: 18,
    goals: [
      'Zróżnicujesz PTSD od ostrej reakcji na stres (ASD) oraz złożonego PTSD (cPTSD wg ICD-11).',
      'Wyjaśnisz rolę atrofii hipokampa i deficytu wygaszania lęku w patofizjologii traumy.',
      'Sformułujesz plan leczenia oparty na psychoterapii traumy (TF-CBT, EMDR) oraz farmakoterapii.'
    ],
    sections: [
      {
        title: 'Triada objawów PTSD a ramy czasowe',
        text: 'Zespół stresu pourazowego (PTSD) rozwija się po narażeniu na zdarzenie zagrażające życiu lub integralności cielesnej. Obejmuje triadę objawów: ponowne przeżywanie traumy (flashbacks, koszmary), unikanie bodźców skojarzonych oraz objawy wzmożonego wzbudzenia (hipervigilance, drażliwość, przestrach). Jeśli objawy trwają krócej niż miesiąc, rozpoznaje się ostrą reakcję na stres (ASD).'
      },
      {
        title: 'Złożone PTSD (cPTSD) w klasyfikacji ICD-11',
        text: 'ICD-11 wprowadziło odrębną jednostkę – złożony zespół stresu pourazowego (complex PTSD), wynikający z długotrwałej, powtarzającej się traumy, z której ucieczka była niemożliwa (np. przemoc domowa, niewola). Oprócz osiowych cech PTSD obejmuje: ciężką dysregulację afektu, chroniczne poczucie bezwartościowości i wstydu oraz trudności w utrzymywaniu relacji interpersonalnych.'
      },
      {
        title: 'Neurobiologia traumy i zasady leczenia',
        text: 'W PTSD obserwuje się zmniejszenie objętości hipokampa (upośledzenie pamięci kontekstowej), nadreaktywność ciała migdałowatego oraz obniżenie aktywności kory przedczołowej. Leczeniem I rzutu jest celowana psychoterapia traumy: TF-CBT (terapia poznawczo-behawioralna zorientowana na traumę) lub EMDR. Farmakoterapią o potwierdzonej skuteczności są SSRI (sertralina, paroksetyna) oraz wenlafaksyna.'
      }
    ],
    table: {
      headers: ['Jednostka', 'Czas trwania objawów', 'Kluczowe składowe kliniczne', 'Interwencja I wyboru'],
      rows: [
        ['Ostra reakcja na stres (ASD)', '3 dni do 1 miesiąca od traumy', 'Wzbudzenie, unikanie, dysocjacja pourazowa', 'Wsparcie psychologiczne, psychoedukacja'],
        ['PTSD', '> 1 miesiąc', 'Intruzje/flashbacks, unikanie, wzmożona czujność', 'TF-CBT, EMDR, sertralina/paroksetyna'],
        ['Złożone PTSD (cPTSD)', 'Przewlekły przebieg po wieloletniej traumie', 'PTSD + dysregulacja emocji + negatywny obraz siebie + relacje', 'Długoterminowa psychoterapia relacyjna / fazowa CBT']
      ]
    },
    advanced:
      'Do redukcji koszmarów sennych pourazowych i poprawy jakości snu w PTSD stosuje się prazosynę – antagonistę receptorów alfa-1 adrenergicznych, który blokuje nadmierną stymulację noradrenergiczną w locus coeruleus w czasie fazy REM.',
    summary:
      'PTSD to deficyt korowego wygaszania strachu z zaburzeniem pamięci kontekstowej hipokampa. Standardem leczenia jest psychoterapia TF-CBT/EMDR; SSRI stanowią wsparcie farmakologiczne, a prazosyna redukuje koszmary senne.',
    sourceIds: ['nice-ptsd', 'wfsbp-anxiety', 'icd11-cddr'],
    questions: [
      q(
        'Jaki minimalny czas trwania objawów jest wymagany do postawienia diagnozy PTSD po ekspozycji na traumę?',
        ['Co najmniej 1 miesiąc utrzymywania się objawów', 'Objawy trwające od 3 dni do 1 miesiąca klasyfikuje się jako ostrą reakcję na stres (ASD).'],
        ['Przynajmniej 12 miesięcy bez żadnej przerwy', '12 miesięcy nie jest warunkiem wstępnym, leczenie wdraża się znacznie wcześniej.'],
        ['Wystarczą 24 godziny bezpośrednio po wypadku', 'Pierwsze 48 godzin to fizjologiczna reakcja ostra na silny stres.'],
        'psych-ptsd-q1'
      ),
      q(
        'Czym charakteryzuje się złożony zespół stresu pourazowego (cPTSD) wprowadzony w ICD-11?',
        ['Obecnością pełnych objawów PTSD oraz dodatkowo dysregulacji emocji, poczucia bezwartościowości i trudności w relacjach', 'cPTSD wynika z długotrwałej, powtarzającej się traumy relacyjnej lub niewoli.'],
        ['Występowaniem wyłącznie omamów słuchowych bez lęku', 'cPTSD nie jest pierwotnym zaburzeniem psychotycznym.'],
        ['Brakiem jakichkolwiek myśli intruzywnych i flashbacków', 'Intruzje są obligatoryjnym elementem każdego wariantu PTSD.'],
        'psych-ptsd-q2'
      ),
      q(
        'Jaki lek blokujący receptory alfa-1 adrenergiczne wykazuje udowodnioną skuteczność w redukcji koszmarów nocnych w PTSD?',
        ['Prazosyna', 'Prazosyna przenika przez barierę krew-mózg i hamuje hiperaktywność noradrenergiczną w OUN podczas snu REM.'],
        ['Propranolol w małej dawce', 'Propranolol jest nieselektywnym beta-adrenolitykiem, rzadziej stosowanym w redukcji koszmarów sennych.'],
        ['Doksazosyna w monoterapii', 'Doksazosyna słabiej penetruje do OUN w porównaniu z prazosyną.'],
        'psych-ptsd-q3'
      ),
      q(
        'Jakie zmiany w strukturach mózgowych są najbardziej powtarzalne w badaniach wolumetrycznych u pacjentów z przewlekłym PTSD?',
        ['Zmniejszenie objętości hipokampa oraz obniżona aktywność kory przedczołowej przy nadaktywności ciała migdałowatego', 'Prowadzi to do niezdolności do hamowania wyuczonej reakcji lękowej i braku pamięci kontekstowej.'],
        ['Masywny przerost kory skroniowej z obrzękiem móżdżku', 'W PTSD nie dochodzi do przerostu struktur korowych.'],
        ['Całkowita utrata istoty czarnej pnia mózgu', 'Utrata istoty czarnej to patologia choroby Parkinsona, nie PTSD.'],
        'psych-ptsd-q4'
      ),
      q(
        'Jakie interwencje psychoterapeutyczne stanowią leczenie I rzutu w PTSD według wytycznych NICE?',
        ['TF-CBT (terapia poznawczo-behawioralna ukierunkowana na traumę) oraz EMDR', 'Obie metody mają najwyższy poziom dowodów naukowych w odwrażliwianiu śladów pamięciowych traumy.'],
        ['Wyłącznie trening relaksacyjny Jacobsona', 'Relaksacja jest metodą pomocniczą, nie usuwa rdzennych mechanizmów intruzji traumatycznych.'],
        ['Terapia elektrowstrząsowa w trybie pilnym', 'ECT nie jest leczeniem I rzutu w zaburzeniach pourazowych.'],
        'psych-ptsd-q5'
      )
    ]
  },
  {
    id: 'adhd-dorosli-i-rozwojowe',
    moduleId: 'psych-afektywne',
    title: 'ADHD u dorosłych i zaburzenia neurorozwojowe',
    subtitle: 'Dopamina i noradrenalina w korze przedczołowej, sieć DMN i diagnostyka',
    group: 'Zaburzenia neurorozwojowe',
    minutes: 18,
    goals: [
      'Rozpoznasz triadę objawów ADHD (nieuwaga, nadruchliwość, impulsywność) w fenotypie osoby dorosłej.',
      'Zrozumiesz dysfunkcję kory przedczołowej i sieci spoczynkowej (DMN) w regulacji uwagi.',
      'Wdrożysz rzetelną diagnostykę różnicową z ChAD, ChAJ, zaburzeniami osobowości i lękowymi.'
    ],
    sections: [
      {
        title: 'Ewolucja objawów ADHD w dorosłości',
        text: 'ADHD (zespół nadpobudliwości psychoruchowej z deficytem uwagi) jest zaburzeniem neurorozwojowym trwającym przez całe życie. U dorosłych motoryczna nadruchliwość często przekształca się w wewnętrzny niepokój ruchowy i gonitwę myśli, podczas gdy na pierwszy plan wysuwają się deficyty funkcji wykonawczych: prokrastynacja, zaburzenia zarządzania czasem, zapominalstwo, dysregulacja emocjonalna oraz trudności z dokończeniem zadań.'
      },
      {
        title: 'Neurobiologia: dopamina, noradrenalina i sieć DMN',
        text: 'W korze przedczołowej (PFC) optymalne funkcjonowanie sieci neuronalnych zależy od stężenia dopaminy (DA) działającej na receptory D1 (wzmocnienie sygnału) i noradrenaliny (NA) działającej na receptory alfa-2A (redukcja szumu tła). W ADHD niedobór tych monoamin uniemożliwia wygaszenie domyślnej sieci spoczynkowej (Default Mode Network, DMN) podczas wykonywania zadań, powodując ciągłe dekoncentrujące intruzje myśli.'
      },
      {
        title: 'Kryteria diagnostyczne i wymóg wywiadu z dzieciństwa',
        text: 'Zarówno DSM-5-TR, jak i ICD-11 wymagają udokumentowania obecności co najmniej części objawów przed ukończeniem 12. roku życia (często weryfikowane opiniami szkolnymi lub wywiadem rozwojowym od rodziców) oraz ich występowania w co najmniej dwóch niezależnych środowiskach (np. praca i dom), prowadzących do istotnego upośledzenia funkcjonowania.'
      }
    ],
    table: {
      headers: ['Domeny objawowe', 'Objaw u dzieci', 'Manifestacja u dorosłych', 'Podłoże neurobiologiczne'],
      rows: [
        ['Nieuwaga', 'Błędy z nieuwagi, gubienie przyborów, "bujanie w obłokach"', 'Chroniczne spóźnienia, trudności z planowaniem, porzucanie projektów', 'Niedobór DA/NA w grzbietowo-bocznej korze przedczołowej (dlPFC)'],
        ['Nadruchliwość', 'Bieganie po klasie, niemożność usiedzenia w ławce', 'Wewnętrzny niepokój, wiercenie się na krześle, natłok myśli', 'Dysfunkcja obwodów jądra półleżącego i prążkowia'],
        ['Impulsywność', 'Wyrywanie się do odpowiedzi, przerywanie innym', 'Podejmowanie impulsywnych decyzji finansowych, przerywanie rozmówcom', 'Niedobór hamowania korowego w korze oczodołowo-czołowej (OFC)']
      ]
    },
    advanced:
      'Kluczową pułapką diagnostyczną jest mylenie labilności afektywnej w ADHD z epizodami w ChAD lub zaburzeniem osobowości borderline. W ADHD wahania nastroju trwają godziny (a nie dni czy tygodnie jak w ChAD) i niemal zawsze są reaktywne na bodźce zewnętrzne (dysforia wywołana odrzuceniem – rejection sensitive dysphoria).',
    summary:
      'ADHD u dorosłych manifestuje się zaburzeniami funkcji wykonawczych i labilnością nastroju wskutek hipodopaminergicznego stanu w PFC. Rozpoznanie wymaga potwierdzenia początku w dzieciństwie i manifestacji w wielu środowiskach.',
    sourceIds: ['nice-adhd', 'wfsbp-adhd', 'dsm5tr'],
    questions: [
      q(
        'Jaki jest kluczowy warunek formalny konieczny do rozpoznania ADHD u dorosłego wg DSM-5-TR i ICD-11?',
        ['Obecność udokumentowanych objawów w dzieciństwie (przed 12. rokiem życia) oraz upośledzenie w co najmniej 2 sferach życia', 'ADHD jest schorzeniem neurorozwojowym; objawy nie mogą pojawić się po raz pierwszy dopiero w wieku dorosłym.'],
        ['Wystąpienie objawów po 25. roku życia po raz pierwszy', 'Pojawienie się takich objawów de novo u dorosłego wskazuje na inną przyczynę (np. zaburzenia afektywne, substancje).'],
        ['Obecność zmian ogniskowych w badaniu rezonansu magnetycznego mózgu', 'ADHD jest diagnozą kliniczną; neuroobrazowanie nie służy do potwierdzania rozpoznania.'],
        'psych-adhd-q1'
      ),
      q(
        'Jak działają dopamina i noradrenalina w korze przedczołowej w celu zapewnienia optymalnej uwagi?',
        ['Dopamina stymuluje receptory D1 (wzmacniając właściwy sygnał), a noradrenalina receptory alfa-2A (wyciszając szum tła)', 'Równowaga ta odpowiada krzywej odwróconego U (Yerkes-Dodson) – optymalne skupienie wymaga precyzyjnego poziomu obu monoamin.'],
        ['Całkowicie blokują aktywność neuronów kory przedczołowej wprowadzając w stan snu', 'Monoaminy regulują aktywność neuronalną, nie wywołują snu.'],
        ['Pobudzają wyłącznie receptory histaminowe H1 w rdzeniu przedłużonym', 'Receptory H1 biorą udział w czuwaniu, lecz to DA i NA w PFC warunkują funkcje wykonawcze.'],
        'psych-adhd-q2'
      ),
      q(
        'Która sieć neuronalna w spoczynku odpowiada za błądzenie myślami i powinna być wygaszona podczas wykonywania zadań skupiających uwagę?',
        ['Sieć wzbudzenia podstawowego (Default Mode Network - DMN)', 'W ADHD dochodzi do zaburzenia hamowania DMN przez sieć wykonawczą (Task-Positive Network).'],
        ['Droga piramidowa skrzyżowana', 'Droga piramidowa odpowiada za ruchy dowolne mięśni.'],
        ['Układ siatkowaty wstępujący w rdzeniu kręgowym', 'Układ siatkowaty kontroluje ogólny stan przytomności.'],
        'psych-adhd-q3'
      ),
      q(
        'Czym różnią się wahania nastroju w ADHD od faz afektywnych w Chorobie Afektywnej Dwubiegunowej (ChAD)?',
        ['W ADHD fluktuacje nastroju trwają godziny i są reaktywne na bodźce, podczas gdy epizody ChAD trwają tygodnie lub miesiące', 'Czas trwania i reaktywność na zdarzenia to kluczowe kryterium różnicowe.'],
        ['W ADHD wahania nastroju trwają zawsze dokładnie 6 miesięcy bez żadnej przerwy', 'Wahania w ADHD są krótkotrwałe i zmienne z godziny na godzinę.'],
        ['W ChAD nastrój zmienia się wyłącznie co 5 minut w rytmie oddechowym', 'Cykle w ChAD mają charakter fazowy i trwają znacznie dłużej.'],
        'psych-adhd-q4'
      ),
      q(
        'Jakie grupy leków stanowią terapię I rzutu w farmakoterapii ADHD u osób dorosłych wg wytycznych NICE i WFSBP?',
        ['Psychostymulanty: metylofenidat lub pochodne amfetaminy', 'Stymulanty blokujące DAT i NET wykazują największą siłę efektu (effect size > 0.8) w redukcji objawów osiowych.'],
        ['Neuroleptyki klasyczne o silnym działaniu sedatywnym (haloperydol)', 'Neuroleptyki klasyczne blokują receptory D2, nasilając deficyty poznawcze w ADHD.'],
        ['Benzodiazepiny w dawkach nasennych', 'Benzodiazepiny upośledzają koncentrację i pamięć roboczą.'],
        'psych-adhd-q5'
      )
    ]
  },
  {
    id: 'zaburzenia-osobowosci-wymiarowe',
    moduleId: 'psych-afektywne',
    title: 'Zaburzenia osobowości: model wymiarowy ICD-11 i wiązki DSM-5-TR',
    subtitle: 'Kategorie wiązek A/B/C, domeny cech w ICD-11 oraz zaburzenie z pogranicza (BPD)',
    group: 'Zaburzenia osobowości',
    minutes: 18,
    goals: [
      'Zrozumiesz przejście z modelu kategorialnego (wiązki A, B, C) do modelu wymiarowego w ICD-11.',
      'Scharakteryzujesz 5 domen cech osobowości w ICD-11 i poziomy nasilenia zaburzeń.',
      'Zdiagnozujesz zaburzenie osobowości typu borderline (BPD) i wdrożysz zasady terapii DBT.'
    ],
    sections: [
      {
        title: 'Przełom w ICD-11: odejście od sztywnych kategorii',
        text: 'Klasyczne podejście DSM-5 dzieli zaburzenia osobowości na trzy wiązki: A (dziwaczno-ekscentryczna: paranoiczne, schizoidalne, schizotypowe), B (dramatyczno-emocjonalna: borderline, antyspołeczna, narcystyczna, histrioniczna) oraz C (lękowo-nadmiarowa: unikająca, zależna, obsesyjno-kompulsyjna). ICD-11 dokonało rewolucji, rezygnując z tych kategorii na rzecz oceny stopnia upośledzenia funkcjonowania (łagodne, umiarkowane, ciężkie) oraz profilu 5 domen cech.'
      },
      {
        title: 'Pięć domen cech osobowości wg ICD-11',
        text: 'Profil osobowości w ICD-11 opisuje 5 domen: 1) Negatywna afektywność (labilność, lęk, wrogość), 2) Dystansowanie się (wycofanie społeczne i emocjonalne), 3) Dyssocjalność (bezduszność, manipulacja, egoizm), 4) Odhamowanie (impulsywność, brak planowania), 5) Anankastia (perfekcjonizm, sztywność kontroli). Dodatkowo zachowano kwalifikator wzorca z pogranicza (Borderline pattern).'
      },
      {
        title: 'Zaburzenie osobowości z pogranicza (Borderline - BPD)',
        text: 'BPD cechuje niestabilność relacji interpersonalnych, obrazu samego siebie i afektu, połączona z wyraźną impulsywnością. Typowe są zachowania parasuicydalne (samookaleczenia bez intencji samobójczej), paniczny lęk przed odrzuceniem, chroniczne poczucie pustki oraz rozszczepienie (czarno-białe widzenie świata). Terapią z wyboru jest Dialektyczno-Behawioralna Terapia (DBT).'
      }
    ],
    table: {
      headers: ['Klasyfikacja', 'Podstawa diagnozy', 'Główne jednostki / domeny', 'Podejście do komorbidności'],
      rows: [
        ['DSM-5-TR (kategorialna)', 'Kryteria wieloobjawowe dla 10 typów', 'Wiązki A (dziwaczne), B (dramatyczne), C (lękowe)', 'Częste współwystępowanie wielu nakładających się typów'],
        ['ICD-11 (wymiarowa)', 'Ogólny poziom dysfunkcji Ja i relacji + domeny cech', 'Negatywny afekt, Odhamowanie, Dystans, Dyssocjalność, Anankastia', 'Jedna spójna diagnoza z profilem cech i nasilenia'],
        ['Wzorzec Borderline (BPD)', 'Specyficzny kwalifikator w ICD-11 / kategoria DSM', 'Labilność, lęk przed odrzuceniem, samookaleczenia, rozszczepienie', 'Często współistnieje z PTSD i zaburzeniami nastroju']
      ]
    },
    advanced:
      'Farmakoterapia w zaburzeniach osobowości ma charakter wyłącznie objawowy i pomocniczy (np. niska dawka leku przeciwpsychotycznego II generacji w celu redukcji impulsywności lub SSRI w objawach dysforycznych). Podstawową metodą leczenia o udowodnionej skuteczności w BPD jest psychoterapia (DBT, MBT, TFP).',
    summary:
      'ICD-11 zastąpiło sztuczne kategorie zaburzeń osobowości oceną wymiarową (stopień zaburzenia + 5 domen cech) z zachowaniem wzorca borderline. Złotym standardem leczenia BPD jest psychoterapia DBT.',
    sourceIds: ['icd11-cddr', 'dsm5tr', 'nice-bpd'],
    questions: [
      q(
        'Jak w klasyfikacji ICD-11 określa się diagnozę zaburzenia osobowości?',
        ['Poprzez ocenę ogólnego stopnia nasilenia zaburzenia funkcjonowania oraz profilu 5 domen cech', 'ICD-11 odeszło od 10 sztywnych jednostek kategorialnych na rzecz podejścia wymiarowego.'],
        ['Wyłącznie na podstawie badania stężenia serotoniny w płynie mózgowo-rdzeniowym', 'Zaburzeń osobowości nie diagnozuje się markerami laboratoryjnymi.'],
        ['Przez przypisanie pacjenta do jednej z 50 odrębnych sztywnych podgrup', 'ICD-11 uprościło system do nasilenia i 5 domen cech.'],
        'psych-pers-q1'
      ),
      q(
        'Które cechy składają się na wzorzec zaburzenia osobowości z pogranicza (Borderline) wg ICD-11 i DSM-5-TR?',
        ['Niestabilność relacji, lęk przed porzuceniem, impulsywność, samouszkodzenia i chroniczne poczucie pustki', 'Są to osiowe przejawy dysregulacji emocjonalnej i tożsamościowej w BPD.'],
        ['Brak jakichkolwiek emocji, całkowite wycofanie ze społeczeństwa i brak mowy', 'To obraz katatonii lub ciężkiej schizofrenii prostej, a nie BPD.'],
        ['Przekonanie o posiadaniu zdolności telepatycznych bez zaburzeń nastroju', 'Poglądy magiczne są charakterystyczne dla osobowości schizotypowej.'],
        'psych-pers-q2'
      ),
      q(
        'Jaka forma psychoterapii została pierwotnie opracowana przez Marshę Linehan specjalnie do leczenia BPD i zachowań samobójczych?',
        ['Terapia dialektyczno-behawioralna (DBT - Dialectical Behavior Therapy)', 'DBT łączy akceptację z mindfulness oraz techniki behawioralnej zmiany i regulacji emocji.'],
        ['Terapia psychoanalityczna w milczeniu analityka', 'Tradycyjna neutralna analiza może nasilać lęk przed odrzuceniem i samookaleczenia u pacjentów z BPD.'],
        ['Trening słuchowy Tomatisa', 'Trening uwagi słuchowej nie jest terapią zaburzeń osobowości.'],
        'psych-pers-q3'
      ),
      q(
        'Która domena cech w modelu wymiarowym ICD-11 odpowiada za skrajny perfekcjonizm, sztywność reguł i nadmierną kontrolę?',
        ['Anankastia', 'Anankastia w ICD-11 reprezentuje cechy obsesyjno-kompulsyjne (sztywność poznawcza i perfekcjonizm).'],
        ['Odhamowanie (Disinhibition)', 'Odhamowanie oznacza impulsywność i brak kontroli nad zachowaniem.'],
        ['Dyssocjalność', 'Dyssocjalność odzwierciedla brak empatii, manipulację i wrogość wobec norm społecznych.'],
        'psych-pers-q4'
      ),
      q(
        'Jaka jest rola farmakoterapii w leczeniu zaburzeń osobowości według wytycznych NICE?',
        ['Ma charakter wyłącznie objawowy i pomocniczy w zaostrzeniach; podstawą leczenia jest psychoterapia', 'Żaden lek nie leczy struktury osobowości jako takiej; farmakologia łagodzi jedynie kryzysy afektywne lub impulsywność.'],
        ['Leki przeciwpsychotyczne są lekiem przyczynowym usuwającym zaburzenie na stałe', 'Leki nie modyfikują utrwalonych schematów poznawczych i osobowościowych.'],
        ['Farmakoterapia jest bezwzględnie zakazana i prawnie zabroniona', 'Leki mogą być bezpiecznie i celowo stosowane w stanach dekompensacji.'],
        'psych-pers-q5'
      )
    ]
  }
];
