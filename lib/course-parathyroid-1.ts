import { type DraftLesson, q } from './course-types.ts';

export const draftParathyroidPart1: DraftLesson[] = [
  {
    id: 'przytarczyce-fizjologia',
    title: 'Dyrygenci wapnia i fosforu',
    subtitle: 'Oś PTH, receptor CaSR, witamina D i FGF23',
    group: 'Fundamenty',
    minutes: 14,
    goals: [
      'Zrozumiesz rolę receptora wapniowego (CaSR) w regulacji wydzielania PTH.',
      'Połączysz sprzężenie zwrotne między nerką, kością, jelitem a przytarczycami.',
      'Poznasz fizjologiczną oś kalcytriol–FGF23–fosforany.',
    ],
    sections: [
      {
        title: 'Cztery małe gruczoły o krytycznym znaczeniu',
        text: 'Przytarczyce, najczęściej w liczbie czterech, leżą na tylnej powierzchni tarczycy. Ich główną funkcją jest utrzymywanie stężenia zjonizowanego wapnia w surowicy w niezwykle wąskim, homeostatycznym zakresie fizjologicznym (1,15–1,32 mmol/l). Głównym sensorem kontrolującym tę funkcję jest receptor wapniowy (CaSR — Calcium-Sensing Receptor), sprzężony z białkiem Gq/Gi. Wzrost zewnątrzkomórkowego stężenia jonów wapnia pobudza CaSR, co w odróżnieniu od większości komórek wywołuje w komórkach głównych przytarczyc sygnał hamujący wydzielanie parathormonu (PTH). I odwrotnie: nawet minimalny spadek stężenia Ca2+ odblokowuje CaSR, powodując natychmiastowy wyrzut zmagazynowanego PTH do krążenia.',
      },
      {
        title: 'Trzy narządy docelowe parathormonu',
        text: 'PTH działa na receptor PTHR1 w nerkach i kościach, a pośrednio na jelito cienkie. W nerkach PTH stymuluje wchłanianie zwrotne wapnia w ramieniu wstępującym pętli Henlego i cewce dalszej, hamuje kotransporter sodowo-fosforanowy NPT2a w cewce bliższej (wywołując silną fosfaturię) oraz aktywuje enzym 1alfa-hydroksylazę (CYP27B1). Aktywny metabolit witaminy D — 1,25(OH)2D (kalcytriol) — wzmaga z kolei jelitowe wchłanianie zarówno wapnia, jak i fosforanów. W kościach PTH pobudza osteoblasty do ekspresji liganda RANKL, co stymuluje osteoklastogenezę i osteolizę, uwalniając jony wapnia i fosforanów do krwiobiegu.',
      },
      {
        title: 'FGF23 i oś fosforanowa: przeciwwaga dla witaminy D',
        text: 'Czynnik wzrostu fibroblastów 23 (FGF23), wydzielany przez osteocyty pod wpływem hiperfosfatemii i kalcytriolu, stanowi kluczowy hormon fosfaturyczny. Działa na kompleks receptora FGFR1 z koreceptorem Klotho w cewce bliższej nerki, nasilając wydalanie fosforanów z moczem oraz hamując enzym CYP27B1 (zmniejszając syntezę kalcytriolu). W ten sposób układ tworzy precyzyjną pętlę podwójnego sprzężenia zwrotnego: zapobiega powstawaniu nierozpuszczalnych złogów fosforanu wapnia (Ca x P) w tkankach miękkich i naczyniach krwionośnych.',
      },
    ],
    table: {
      headers: ['Hormon / Czynnik', 'Główne miejsce syntezy', 'Wpływ na stężenie Ca', 'Wpływ na stężenie fosforanów (P)'],
      rows: [
        ['Parathormon (PTH)', 'Komórki główne przytarczyc', 'Podwyższa (reabsorpcja nerkowa + kościogubienie)', 'Obniża (masywna fosfaturia nerkowa)'],
        ['Kalcytriol (1,25(OH)2D)', 'Cewka bliższa nerki (CYP27B1)', 'Podwyższa (wchłanianie jelitowe i nerkowe)', 'Podwyższa (wchłanianie jelitowe)'],
        ['FGF23 (z koreceptorem Klotho)', 'Osteocyty tkanki kostnej', 'Neutralny / nieznacznie obniża', 'Silnie obniża (zmniejsza NPT2a w nerkach)'],
        ['Kalcytonina', 'Komórki C (parapęcherzykowe) tarczycy', 'Nieznacznie obniża (hamuje osteoklasty)', 'Obniża (zwiększa wydalanie z moczem)'],
      ],
    },
    advanced:
      'Receptor CaSR występuje nie tylko w przytarczycach, ale także w komórkach grubego ramienia wstępującego pętli Henlego (TAL), gdzie wysokie stężenie zewnątrzkomórkowego wapnia hamuje transporter NKCC2 i kanał potasowy ROMK. W ten sposób hiperkalcemia działa jak endogenny diuretyk pętlowy (furosemidopodobny), prowadząc do upośledzenia zagęszczania moczu, poliurii i odwodnienia hipowolemicznego u chorych z ciężką nadczynnością przytarczyc.',
    summary:
      'Homeostaza wapniowa zależy od ujemnego sprzężenia CaSR–PTH. PTH podwyższa stężenie wapnia (nerki, kości) i obniża stężenie fosforanów (fosfaturia), a witamina D zwiększa wchłanianie obu jonów w jelicie.',
    sourceIds: ['asbmr_calcium', 'ese_phpt'],
    questions: [
      q(
        'Jaki jest bezpośredni efekt aktywacji receptora CaSR przez wysokie stężenie jonów Ca2+ w przytarczycach?',
        ['Zahamowanie wydzielania parathormonu (PTH)', 'Pobudzenie CaSR wywołuje wewnątrzkomórkowy sygnał supresyjny syntezy i egzocytozy PTH.'],
        ['Wzmożone uwalnianie parathormonu (PTH)', 'Pobudzenie receptora wapniowego blokuje, a nie stymuluje wydzielanie PTH.'],
        ['Wzrost syntezy kalcytoniny w przytarczycach', 'Kalcytonina powstaje w komórkach C tarczycy, a nie w przytarczycach.']
      ),
      q(
        'Jaki jest główny wpływ parathormonu (PTH) na gospodarkę fosforanową w nerkach?',
        ['Hamowanie kotransportera NPT2a i nasilenie fosfaturii', 'PTH obniża próg nerkowy dla fosforanów w cewce bliższej, prowadząc do hipofosfatemii.'],
        ['Wzrost cewkowej reabsorpcji fosforanów do krwi', 'PTH hamuje wchłanianie zwrotne fosforanów w cewce bliższej.'],
        ['Brak wpływu na wydalanie fosforanów z moczem', 'Fosfaturia jest jednym z najważniejszych i najsilniejszych działań nerkowych PTH.']
      ),
      q(
        'Który enzym jest bezpośrednio aktywowany w nerkach przez PTH w procesie bioaktywacji witaminy D?',
        ['1alfa-hydroksylaza (CYP27B1)', 'PTH silnie indukuje 1alfa-hydroksylazę w cewkach bliższych, przekształcając 25(OH)D w aktywny 1,25(OH)2D.'],
        ['24-hydroksylaza (CYP24A1)', 'CYP24A1 jest enzymem inaktywującym, indukowanym przez FGF23 i nadmiar kalcytriolu.'],
        ['25-hydroksylaza wątrobowa (CYP2R1)', 'Hydroksylacja w pozycji 25 zachodzi w hepatocytach niezależnie od parathormonu.']
      ),
      q(
        'Jaka jest kluczowa funkcja biologiczna czynnika FGF23?',
        ['Zwiększanie wydalania fosforanów z moczem i hamowanie syntezy kalcytriolu', 'FGF23 chroni ustrój przed retencją fosforanów i ektopowymi zwapnieniami tkanek.'],
        ['Pobudzanie wydzielania parathormonu przez przytarczyce', 'FGF23 nie stymuluje przytarczyc; hamuje natomiast produkcję kalcytriolu.'],
        ['Zwiększanie jelitowego wchłaniania fosforanów', 'FGF23 zmniejsza pulę fosforanów w ustroju poprzez nasilanie ich utraty z moczem.']
      ),
      q(
        'Dlaczego ciężka hiperkalcemia prowadzi do wielomoczu (poliurii) i odwodnienia?',
        ['Wapń aktywuje CaSR w pętli Henlego, hamując NKCC2 i działając jak furosemid', 'Zahamowanie kotransportera NKCC2 znosi gradient rdzeniowy nerek i blokuje zagęszczanie moczu.'],
        ['Hiperkalcemia stymuluje nadmierne wydzielanie wazopresyny (AVP)', 'Hiperkalcemia wywołuje moczówkę nerkopochodną, a nie centralną nadprodukcję AVP.'],
        ['Wapń bezpośrednio niszczy kłębuszki nerkowe w ciągu kilku minut', 'Odwodnienie wynika z zaburzenia transportu cewkowego w pętli Henlego, a nie natychmiastowej martwicy kłębuszków.']
      ),
    ],
  },
  {
    id: 'przytarczyce-diagnostyka',
    title: 'Wapń, fosfor i pułapki laboratoryjne',
    subtitle: 'Wapń skorygowany, Ca zjonizowany, CCCR i fosfaturia',
    group: 'Fundamenty',
    minutes: 16,
    goals: [
      'Nauczysz się poprawnie korygować stężenie wapnia o stężenie albuminy (wzór Payne’a).',
      'Poznasz wskazania do oznaczania wapnia zjonizowanego i unikania błędów przedanalitycznych.',
      'Opanujesz wyliczanie wskaźnika CCCR (FeCa) w różnicowaniu PHPT i FHH.',
    ],
    sections: [
      {
        title: 'Trzy frakcje wapnia we krwi i rola albuminy',
        text: 'Wapń całkowity w surowicy (norma: 2,15–2,55 mmol/l / 8,6–10,2 mg/dl) występuje w trzech postaciach: biologicznie czynny wapń zjonizowany (ok. 50%), wapń związany z białkami osocza, głównie albuminą (ok. 40%) oraz wapń w kompleksach z cytrynianami, fosforanami i wodorowęglanami (ok. 10%). W stanach hipoalbuminemii (np. marskość wątroby, zespół nerczycowy, niedożywienie) stężenie wapnia całkowitego jest fałszywie niskie pomimo prawidłowej frakcji zjonizowanej. Z tego powodu w codziennej praktyce klinicznej niezbędne jest obliczanie wapnia skorygowanego wg wzoru Payne’a: Ca_skorygowany (mg/dl) = Ca_zmierzony (mg/dl) + 0,8 * [4,0 - Albumina (g/dl)].',
      },
      {
        title: 'Wapń zjonizowany: złoty standard i błędy przedanalityczne',
        text: 'Bezpośredni pomiar wapnia zjonizowanego (Ca2+) za pomocą elektrody jonoselektywnej (norma: 1,15–1,32 mmol/l) eliminuje błędy wynikające z dysproteinemii, jednak jest wybitnie czuły na równowagę kwasowo-zasadową. Zasadowica (alkaloza) zwiększa ujemny ładunek albuminy, co nasila wiązanie wapnia i powoduje nagły spadek wapnia zjonizowanego — stąd hiperwentylacja psychogenna może wyzwolić ostry atak tężyczki przy prawidłowym wapniu całkowitym. Kwasica z kolei osłabia wiązanie wapnia z białkami. Krew na wapń zjonizowany należy pobierać w warunkach beztlenowych (strzykawka heparynizowana) i bez przedłużonego ucisku stazy żylnej.',
      },
      {
        title: 'Wskaźnik klirensu wapniowo-kreatyninowego (CCCR)',
        text: 'W diagnostyce różnicowej hiperkalcemii z nieadekwatnie prawidłowym lub podwyższonym PTH kluczowym parametrem jest wskaźnik klirensu wapniowo-kreatyninowego (CCCR — Calcium-to-Creatinine Clearance Ratio, FeCa). Oblicza się go ze wzoru: CCCR = [Ca_mocz * Kreatynina_surowica] / [Ca_surowica * Kreatynina_mocz] (wszystkie stężenia w mmol/l). Wartość CCCR < 0,01 jednoznacznie wskazuje na łagodną rodzinną hiperkalcemię hipokalciuryczną (FHH), w której operacja przytarczyc jest bezwzględnie przeciwwskazana. Wartość CCCR > 0,02 jest typowa dla pierwotnej nadczynności przytarczyc (PHPT), a zakres 0,01–0,02 stanowi strefę szarą wymagającą badań genetycznych CaSR.',
      },
    ],
    table: {
      headers: ['Parametr laboratoryjny', 'Wartości referencyjne', 'Interpretacja w PHPT', 'Interpretacja w FHH'],
      rows: [
        ['Wapń całkowity skorygowany', '8,6–10,2 mg/dl (2,15–2,55 mmol/l)', 'Podwyższony (>10,2 mg/dl)', 'Podwyższony lub górna granica normy'],
        ['Wapń zjonizowany (Ca2+)', '1,15–1,32 mmol/l', 'Podwyższony', 'Podwyższony'],
        ['Parathormon nienaruszony (iPTH)', '15–65 pg/ml (1,6–6,9 pmol/l)', 'Podwyższony lub nieadekwatnie prawidłowy', 'Nieadekwatnie prawidłowy lub lekko podwyższony'],
        ['Fosforany nieorganiczne', '2,5–4,5 mg/dl (0,81–1,45 mmol/l)', 'Obniżone (<2,5 mg/dl) lub niska norma', 'Prawidłowe'],
        ['Wskaźnik CCCR (FeCa)', 'Fizjologicznie 0,01–0,02', '> 0,02 (hiperkalciuria)', '< 0,01 (skrajna hipokalciuria nerkowa)'],
      ],
    },
    advanced:
      'Wskaźnik cewkowego wchłaniania zwrotnego fosforanów (TmP/GFR) pozwala obiektywnie potwierdzić nadmiar PTH lub FGF23 w organizmie. Obniżony TmP/GFR świadczy o nerkowej ucieczce fosforanów. Pamiętaj także o interferencji biotyny: bardzo wysokie dawki biotyny (>5–10 mg/d) mogą zafałszować oznaczenia iPTH metodami immunoenzymatycznymi opartymi na kompleksie streptawidyna-biotyna, dając fałszywie niskie lub fałszywie wysokie wyniki.',
    summary:
      'W diagnostyce przytarczyc zawsze koryguj wapń o albuminę lub oznaczaj wapń zjonizowany. Wskaźnik CCCR <0,01 ratuje pacjenta z FHH przed niepotrzebną, nieskuteczną operacją wycięcia przytarczyc.',
    sourceIds: ['ese_phpt', 'fhh_consensus', 'asbmr_calcium'],
    questions: [
      q(
        'Pacjent ma stężenie wapnia całkowitego 8,0 mg/dl (norma 8,6–10,2) i stężenie albuminy 2,5 g/dl (norma 4,0). Ile wynosi stężenie wapnia skorygowanego?',
        ['9,2 mg/dl (normokalcemia)', 'Zgodnie ze wzorem Payne’a: 8,0 + 0,8 * (4,0 - 2,5) = 8,0 + 1,2 = 9,2 mg/dl.'],
        ['8,0 mg/dl (rzeczywista hipokalcemia)', 'Pominięcie korekty o albuminę prowadzi do fałszywego rozpoznania hipokalcemii.'],
        ['6,8 mg/dl (ciężka hipokalcemia)', 'Odjęcie zamiast dodania korekty jest częstym błędem rachunkowym; stężenie wapnia zjonizowanego jest prawidłowe.']
      ),
      q(
        'W jaki sposób ostra alkaloza oddechowa wywołana hiperwentylacją wpływa na wapń zjonizowany?',
        ['Obniża wapń zjonizowany poprzez zwiększenie powinowactwa albuminy do Ca2+', 'Wzrost pH uwalnia jony H+ z albuminy, odsłaniając ujemne ładunki wiążące wapń zjonizowany.'],
        ['Podwyższa wapń zjonizowany z powodu rozpadu kompleksów fosforanowych', 'Alkaloza zawsze obniża frakcję zjonizowaną, co może sprowokować napad tężyczki.'],
        ['Nie wpływa w żaden sposób na frakcję zjonizowaną wapnia', 'Równowaga kwasowo-zasadowa jest jednym z najważniejszych regulatorów stężenia Ca2+.']
      ),
      q(
        'Wskaźnik CCCR wynosi u pacjenta z hiperkalcemią 0,006 (<0,01). Jakie jest najbardziej prawdopodobne rozpoznanie?',
        ['Łagodna rodzinna hiperkalcemia hipokalciuryczna (FHH)', 'Wskaźnik CCCR <0,01 odzwierciedla nadmierne wchłanianie zwrotne wapnia w nerkach na skutek mutacji CaSR.'],
        ['Pierwotna nadczynność przytarczyc spowodowana pojedynczym gruczolakiem', 'W typowej PHPT wskaźnik CCCR wynosi >0,02 z powodu hiperkalciurii.'],
        ['Przełom hiperkalcemiczny w przebiegu raka przytarczyc', 'W raku przytarczyc dochodzi do masywnej hiperkalciurii z CCCR przekraczającym 0,03–0,05.']
      ),
      q(
        'Który parametr moczowy jest niezbędny do obliczenia wskaźnika CCCR (FeCa)?',
        ['Stężenie wapnia i kreatyniny w tej samej próbce moczu oraz w surowicy', 'CCCR zestawia klirens nerkowy wapnia z klirensem nerkowym kreatyniny.'],
        ['Wyłącznie dobowe wydalanie kwasu moczowego', 'Kwas moczowy nie wchodzi w skład równania frakcjonowanego wydalania wapnia.'],
        ['Stężenie parathormonu w dobowej zbiórce moczu', 'Parathormon oznacza się w osoczu/surowicy, a nie w moczu.']
      ),
      q(
        'Dlaczego u pacjenta z podejrzeniem zaburzeń osi przytarczycowej zaleca się odstawienie biotyny przed pobraniem krwi?',
        ['Biotyna w dawkach suplementacyjnych interferuje z testami immunochemicznymi iPTH', 'Interferencja z układem biotyna-streptawidyna może zafałszować wynik stężenia parathormonu.'],
        ['Biotyna trwale uszkadza komórki główne przytarczyc', 'Biotyna jest witaminą i nie wykazuje działania cytotoksycznego na przytarczyce.'],
        ['Biotyna chelatuje wapń we krwi, uniemożliwiając pomiar', 'Biotyna nie tworzy nierozpuszczalnych soli z wapniem w surowicy.']
      ),
    ],
  },
  {
    id: 'phpt-pierwotna',
    title: 'Autonomia przytarczyc: PHPT',
    subtitle: 'Gruczolaki, hiperplazja i kryteria kwalifikacji do operacji',
    group: 'Nadczynności i hiperkalcemia',
    minutes: 18,
    goals: [
      'Zróżnicujesz pojedynczy gruczolak przytarczyc od hiperplazji wielogruczołowej (MEN1/MEN2A).',
      'Poznasz pełne kryteria kwalifikacji do paratyreoidktomii w bezobjawowej PHPT.',
      'Opanujesz lokalizację przedoperacyjną (USG, scyntygrafia MIBI, 18F-FCHoline PET/CT).',
    ],
    sections: [
      {
        title: 'Etiologia i spektrum kliniczne PHPT',
        text: 'Pierwotna nadczynność przytarczyc (PHPT) jest trzecią co do częstości endokrynopatią, występującą najczęściej u kobiet po menopauzie. W 85% przypadków odpowiada za nią pojedynczy łagodny gruczolak przytarczycy, w 10–15% rozrost wielogruczołowy (często w zespołach uwarunkowanych genetycznie: MEN1, MEN2A, CDC73/zespół HPT-JT), a w <1% rak przytarczycy. Klasyczna manifestacja opisana triadą „kamienie, kości, bóle brzucha i zaburzenia psychiczne” (stones, bones, abdominal groans, and psychic moans) w krajach rozwiniętych występuje rzadko — dominują postacie bezobjawowe wykrywane przypadkowo podczas rutynowych badań biochemicznych krwi.',
      },
      {
        title: 'Kryteria kwalifikacji do paratyreoidktomii wg wytycznych międzynarodowych',
        text: 'Chirurgiczne usunięcie zmienionej przytarczycy (paratyreoidktomia) jest jedyną metodą trwałego wyleczenia PHPT. U chorych z jawnymi objawami (kamica nerkowa, złamanie niskoenergetyczne) operacja jest bezwzględnie wskazana. U chorych bezobjawowych operację zaleca się przy spełnieniu co najmniej JEDNEGO z następujących kryteriów konsensusu ESE/Endocrine Society: wiek < 50 lat; stężenie wapnia w surowicy > 1,0 mg/dl (0,25 mmol/l) powyżej górnej granicy normy; obniżenie gęstości mineralnej kości (T-score < -2,5 w odcinku lędźwiowym, szyjce kości udowej lub 1/3 dystalnej kości promieniowej); eGFR < 60 ml/min/1,73 m2; hiperkalciuria dobowego moczu > 250 mg/24h (u kobiet) lub > 300 mg/24h (u mężczyzn) ze współistniejącym ryzykiem kamicy; obecność bezobjawowej kamicy lub nefrokalcynozy w badaniach obrazowych USG/TK.',
      },
      {
        title: 'Diagnostyka lokalizacyjna i chirurgia małoinwazyjna (MIP)',
        text: 'Diagnostyka obrazowa (USG szyi wysokiej rozdzielczości oraz scyntygrafia 99mTc-MIBI ze spektrometrią SPECT/CT) służy WYŁĄCZNIE planowaniu zabiegu operacyjnego, a nie ustalaniu rozpoznania! Gdy oba badania jednoznacznie wskazują ten sam gruczolak, chirurg może wykonać celowaną paratyreoidktomię małoinwazyjną (MIP — Minimally Invasive Parathyroidectomy). Standardem bezpieczeństwa jest śródoperacyjne monitorowanie stężenia PTH (ioPTH wg kryteriów z Miami): spadek stężenia PTH o >50% w 10 minut po wycięciu zmiany w stosunku do wartości wyjściowej potwierdza usunięcie autonomicznej tkanki i radykalność zabiegu.',
      },
    ],
    table: {
      headers: ['Kryterium ESE / ASBMR', 'Próg kwalifikacji do paratyreoidktomii w bezobjawowej PHPT', 'Uzasadnienie kliniczne'],
      rows: [
        ['Wiek pacjenta', '< 50. roku życia', 'Długi czas ekspozycji na hiperkalcemię i powikłania narządowe'],
        ['Wapń w surowicy', '> 1,0 mg/dl (> 0,25 mmol/l) ponad normę', 'Ryzyko progresji do przełomu hiperkalcemicznego'],
        ['Gęstość kości (BMD DXA)', 'T-score < -2,5 (kręgosłup, biodro lub 1/3 kości promieniowej)', 'Zapobieganie złamaniom osteoporotycznym (PTH trawi kość korową)'],
        ['Czynność nerek', 'eGFR < 60 ml/min/1,73 m2', 'Zahamowanie postępu nefropatii hiperkalcemicznej'],
        ['Układ moczowy', 'Kamica nerkowa lub nefrokalcynoza w USG/TK', 'Ochrona miąższu nerkowego przed uszkodzeniem'],
      ],
    },
    advanced:
      'W kościach PTH w nadmiarze trawi przede wszystkim kość korową (obfitą w 1/3 dystalnej części kości promieniowej), oszczędzając względnie kość beleczkową (kręgi). Z tego powodu densytometria DXA w PHPT ZAWSZE musi obejmować pomiar na przedramieniu (promień 33%). Gdy operacja jest przeciwwskazana (np. ciężki stan ogólny), lekiem z wyboru obniżającym wapń jest cynakalcet (kalcymimetyk aktywujący CaSR), a w celu ochrony kości stosuje się bisfosfoniany (alendronian).',
    summary:
      'Pojedynczy gruczolak odpowiada za 85% przypadków PHPT. Kryteria operacyjne kwalifikują pacjentów przed 50. r.ż., ze spadkiem T-score <-2,5 (w tym promień 33%), eGFR <60 lub wapniem >1 mg/dl ponad normę. Spadek ioPTH o >50% w 10. minucie potwierdza wyleczenie.',
    sourceIds: ['ese_phpt', 'eses_parathyroid'],
    questions: [
      q(
        '58-letnia kobieta bez objawów ma Ca 10,6 mg/dl (norma do 10,2), PTH 85 pg/ml (norma do 65), T-score kręgosłupa -2,8, eGFR 75 ml/min. Czy pacjentka spełnia kryteria paratyreoidktomii?',
        ['Tak, ze względu na T-score < -2,5 w densytometrii', 'Osteoporoza (T-score < -2,5) jest jednym z bezwzględnych kryteriów kwalifikacji do operacji w PHPT.'],
        ['Nie, ponieważ stężenie wapnia przekracza normę o mniej niż 1 mg/dl', 'Wystarczy spełnienie co najmniej JEDNEGO z kryteriów, aby zakwalifikować do leczenia operacyjnego.'],
        ['Nie, operuje się wyłącznie pacjentów z jawną kolką nerkową', 'Większość współczesnych operacji przytarczyc przeprowadza się w bezobjawowej PHPT wg kryteriów konsensusu.']
      ),
      q(
        'Na czym polega kryterium z Miami w śródoperacyjnym monitorowaniu stężenia parathormonu (ioPTH)?',
        ['Spadek stężenia PTH o >50% w 10 minut po usunięciu gruczolaka względem wartości wyjściowej', 'Krótki okres półtrwania PTH (3–5 minut) pozwala potwierdzić radykalność zabiegu jeszcze na sali operacyjnej.'],
        ['Spadek stężenia PTH do wartości absolutnie niewykrywalnych (0 pg/ml)', 'Wartości nie spadają do zera, ponieważ zdrowe pozostałe przytarczyce zachowują podstawową czynność.'],
        ['Osiągnięcie stężenia wapnia <8,0 mg/dl przed zszyciem rany operacyjnej', 'Wapń w surowicy zmienia się znacznie wolniej niż parathormon i nie służy do kontroli śródoperacyjnej.']
      ),
      q(
        'Które badanie densytometryczne (DXA) jest najbardziej czułe w wykrywaniu ubytku masy kostnej w PHPT?',
        ['Densytometria 1/3 dalszej części kości promieniowej (kość korowa)', 'Ciągły nadmiar PTH w pierwszej kolejności degraduje kość korową, której największy odsetek znajduje się w przedramieniu.'],
        ['Densytometria wyłącznie kręgów lędźwiowych L1–L4', 'Kość beleczkowa kręgosłupa jest względnie oszczędzana i może fałszywie maskować zaawansowany ubytek kostny.'],
        ['Densytometria kości piętowej metodą ultradźwiękową', 'Badanie ultrasonograficzne kości piętowej nie ma wartości diagnostycznej w wytycznych PHPT.']
      ),
      q(
        'Jaki lek należy rozważyć u chorego z jawną hiperkalcemią w przebiegu PHPT, u którego istnieją bezwzględne przeciwwskazania kardiologiczne do operacji?',
        ['Cynakalcet (kalcymimetyk)', 'Cynakalcet uwrażliwia receptor CaSR na wapń, hamując wydzielanie PTH i obniżając stężenie wapnia we krwi bez konieczności operacji.'],
        ['Teryparatyd (rekombinowany PTH 1-34)', 'Teryparatyd to analog parathormonu — jego podanie w nadczynności przytarczyc doprowadziłoby do zagrażającego życiu przełomu!'],
        ['Hydrochlorotiazyd', 'Tiazydy zmniejszają wydalanie wapnia z moczem i nasilają hiperkalcemię, są więc bezwzględnie przeciwwskazane.']
      ),
      q(
        'Kiedy należy wykonać scyntygrafię MIBI lub USG szyi u pacjenta z podejrzeniem PHPT?',
        ['Dopiero po biochemicznym potwierdzeniu PHPT, na etapie kwalifikacji do techniki operacyjnej', 'Badania obrazowe służą lokalizacji przedoperacyjnej u chirurga, a nie ustalaniu rozpoznania choroby.'],
        ['Jako badanie pierwszego rzutu przed oznaczeniem stężenia wapnia i PTH', 'Obrazowanie przed potwierdzeniem biochemicznym prowadzi do fałszywych rozpoznań guzków tarczycy jako przytarczyc.'],
        ['Wyłącznie wtedy, gdy stężenie wapnia wynosi powyżej 15 mg/dl', 'Lokalizację wykonuje się u każdego pacjenta kwalifikowanego do planowej paratyreoidktomii.']
      ),
    ],
  },
  {
    id: 'fhh-hiperkalcemia',
    title: 'Pułapka fałszywej nadczynności: FHH',
    subtitle: 'Mutacja CaSR, hipokalciuria i błędy jatrogenne',
    group: 'Nadczynności i hiperkalcemia',
    minutes: 14,
    goals: [
      'Zrozumiesz patomechanizm łagodnej rodzinnej hiperkalcemii hipokalciurycznej (FHH).',
      'Nauczysz się odróżniać FHH od PHPT za pomocą wskaźnika CCCR i wywiadu rodzinnego.',
      'Zapobiegniesz jatrogennej, nieskutecznej operacji usunięcia przytarczyc.',
    ],
    sections: [
      {
        title: 'Czym jest FHH i jak mutacja przestawia „termostat wapniowy”?',
        text: 'Łagodna rodzinna hiperkalcemia hipokalciuryczna (FHH — Familial Hypocalciuric Hypercalcemia, typ 1 związany z mutacją genu CASR na chromosomie 3q21) jest chorobą dziedziczoną autosomalnie dominująco z blisko 100% penetracją. Inaktywująca mutacja jednej kopii receptora CaSR powoduje, że receptor traci prawidłową wrażliwość na jony wapnia. Przytarczyce interpretują prawidłowe stężenie wapnia jako głęboką hipokalcemię i nie wygaszają wydzielania PTH. „Termostat wapniowy” ustroju zostaje trwale przestawiony na wyższy poziom: pacjent ma umiarkowaną hiperkalcemię, a stężenie parathormonu jest nieadekwatnie prawidłowe lub nieznacznie podwyższone.',
      },
      {
        title: 'Nerkowy mechanizm hipokalciurii',
        text: 'Receptor CaSR występuje gęsto w ramieniu wstępującym pętli Henlego. Defekt receptora w nerkach powoduje zniesienie fizjologicznego hamowania reabsorpcji wapnia. W efekcie nerkowe wchłanianie zwrotne wapnia i magnezu jest skrajnie wzmożone, co prowadzi do paradoksalnie niskiego wydalania wapnia z moczem pomimo hiperkalcemii we krwi. Dobowe wydalanie wapnia w moczu wynosi zazwyczaj <100 mg/24h (<2,5 mmol/24h), a wskaźnik klirensu wapniowo-kreatyninowego (CCCR) spada poniżej 0,01 u ponad 80–85% pacjentów.',
      },
      {
        title: 'Kardynalny błąd medyczny: niepotrzebna paratyreoidktomia',
        text: 'FHH ma przebieg całkowicie łagodny i bezobjawowy: chorzy nie rozwijają kamicy nerkowej, nefrokalcynozy, ubytku masy kostnej ani powikłań sercowo-naczyniowych, a ich oczekiwana długość życia jest całkowicie prawidłowa. Paratyreoidktomia subtotalna lub totalna u chorego z FHH jest błędem w sztuce — nie normalizuje stężenia wapnia, ponieważ zmutowane pozostają komórki w nerkach, a może doprowadzić do jatrogennej, trwałej hipokalcemii pooperacyjnej. Potwierdzenie mutacji CASR lub identyfikacja hiperkalcemii u krewnych I stopnia (zwłaszcza u dzieci) definitywnie kończy diagnostykę i chroni pacjenta przed skalpelem chirurga.',
      },
    ],
    table: {
      headers: ['Cecha kliniczna / laboratoryjna', 'Pierwotna nadczynność (PHPT)', 'Rodzinna hiperkalcemia hipokalciuryczna (FHH)'],
      rows: [
        ['Wydalanie wapnia w DZM', 'Podwyższone (>250–300 mg/24h)', 'Bardzo niskie (<100 mg/24h)'],
        ['Wskaźnik CCCR (FeCa)', '> 0,02 (u 90% pacjentów)', '< 0,01 (u 85% pacjentów)'],
        ['Wywiad rodzinny', 'Zwykle negatywny (poza MEN1/MEN2A)', 'Hiperkalcemia u krewnych I stopnia od dzieciństwa'],
        ['Powikłania narządowe (nerki, kości)', 'Częste (kamica, osteoporoza, złamania)', 'Brak — całkowicie łagodny fenotyp'],
        ['Skutek paratyreoidktomii', 'Trwałe wyleczenie (95–98%)', 'Brak efektu / jatrogenna niedoczynność (przeciwwskazana!)'],
      ],
    },
    advanced:
      'Gdy oboje rodziców przekaże zmutowany allel CASR, u noworodka rozwija się ciężka noworodkowa pierwotna nadczynność przytarczyc (NSHPT — Neonatal Severe Hyperparathyroidism). Cechuje się ona zagrażającą życiu hiperkalcemią (>18–20 mg/dl), hipotonicznym wiotkim dzieckiem, złamaniami kości i niewydolnością oddechową; w NSHPT ratunkiem jest natychmiastowa totalna paratyreoidktomia w pierwszych dniach życia lub wlewy bisfosfonianów.',
    summary:
      'FHH to genetyczne przestawienie termostatu wapniowego (mutacja CaSR). Charakteryzuje się wskaźnikiem CCCR <0,01 i brakiem powikłań. Nie wymaga leczenia ani operacji — operacja jest bezwzględnym błędem!',
    sourceIds: ['fhh_consensus', 'ese_phpt'],
    questions: [
      q(
        'Dlaczego u chorego z FHH paratyreoidktomia jest zabiegiem przeciwwskazanym?',
        ['Choroba jest łagodna, a wycięcie przytarczyc nie likwiduje defektu receptora CaSR w nerkach', 'Zmutowany receptor w cewkach nerkowych nadal nadmiernie zatrzymuje wapń, a chory ryzykuje jatrogenne powikłania operacji.'],
        ['Ponieważ u chorych z FHH przytarczyce nie występują anatomicznie', 'Przytarczyce występują prawidłowo, posiadają jedynie zmutowany sensor CaSR.'],
        ['Operacja natychmiast wywołuje złośliwego raka przytarczyc', 'FHH nie transformuje w nowotwór złośliwy.']
      ),
      q(
        'Który wynik badania laboratoryjnego najsilniej przemawia za FHH, a przeciwko PHPT?',
        ['Wskaźnik klirensu wapniowo-kreatyninowego (CCCR) < 0,01', 'Wskaźnik CCCR <0,01 odzwierciedla nerkową hipokalciurię charakterystyczną dla mutacji CaSR.'],
        ['Stężenie wapnia całkowitego wynoszące 10,8 mg/dl', 'Lekka hiperkalcemia występuje zarówno w PHPT, jak i w FHH.'],
        ['Stężenie PTH w górnej granicy normy', 'Nieadekwatnie prawidłowe PTH jest typowe dla obu tych jednostek chorobowych.']
      ),
      q(
        'W jaki sposób dziedziczy się klasyczna postać FHH typu 1?',
        ['Autosomalnie dominująco z bardzo wysoką penetracją', 'Pojedyncza kopia zmutowanego genu CASR wystarcza do ujawnienia się fenotypu hiperkalcemii.'],
        ['Autosomalnie recesywnie wyłącznie w linii męskiej', 'Choroba dziedziczy się dominująco i występuje z jednakową częstością u obu płci.'],
        ['Sprzężona z chromosomem X w sposób dominujący', 'Gen CASR zlokalizowany jest na chromosomie 3 (autosoma).']
      ),
      q(
        'U 32-letniego mężczyzny bez objawów wykryto Ca 10,7 mg/dl, PTH 68 pg/ml i CCCR 0,007. Jakie postępowanie jest optymalne?',
        ['Oznaczenie stężenia wapnia u rodziców/dzieci oraz badanie genetyczne genu CASR', 'Potwierdzenie hiperkalcemii u bezobjawowych krewnych i znalezienie mutacji potwierdza rozpoznanie i zapobiega operacji.'],
        ['Pilne skierowanie na scyntygrafię MIBI i operację wycięcia 4 przytarczyc', 'Operacja u pacjenta z FHH jest błędem w sztuce lekarskiej.'],
        ['Rozpoczęcie intensywnej chemioterapii przeciwnowotworowej', 'FHH jest łagodną anomalią biochemiczną, a nie nowotworem.']
      ),
      q(
        'Co dzieje się, gdy noworodek odziedziczy mutację inaktywującą CaSR homozygotycznie od obojga rodziców z FHH?',
        ['Rozwija się zagrażająca życiu noworodkowa ciężka nadczynność przytarczyc (NSHPT)', 'Brak jakiejkolwiek sprawnej kopii CaSR prowadzi do skrajnej hiperkalcemii, odwapnienia kości i konieczności ratunkowej paratyreoidktomii.'],
        ['Dziecko rodzi się całkowicie zdrowe bez żadnych zmian biochemicznych', 'Stan homozygotyczny jest stanem bezpośredniego zagrożenia życia noworodka.'],
        ['Dochodzi do wrodzonej agenezji nerek', 'CaSR reguluje transport jonów, ale nie odpowiada za organogenezę nerek.']
      ),
    ],
  },
  {
    id: 'shpt-thpt-pchn',
    title: 'Gdy chorują nerki: SHPT i THPT',
    subtitle: 'Niewydolność nerek, retencja fosforanów, cinakalcet i autonomia',
    group: 'Nadczynności i hiperkalcemia',
    minutes: 16,
    goals: [
      'Zrozumiesz patofizjologię zaburzeń mineralnych i kostnych w przewlekłej chorobie nerek (CKD-MBD).',
      'Odróżnisz wtórną nadczynność (SHPT — hipokalcemia) od trzeciorzędowej (THPT — hiperkalcemia).',
      'Poznasz zasady stosowania leków wiążących fosforany, kalcymimetyków i parikalcytolu.',
    ],
    sections: [
      {
        title: 'Błędne koło wtórnej nadczynności przytarczyc (SHPT)',
        text: 'W miarę postępu przewlekłej choroby nerek (PChN, stadium G3–G5) dochodzi do spadku filtracji kłębuszkowej i retencji fosforanów we krwi. Hiperfosfatemia bezpośrednio stymuluje przytarczyce do produkcji PTH oraz pobudza osteocyty do wyrzutu FGF23. FGF23 wraz z redukcją masy czynnego miąższu nerek blokuje enzym CYP27B1, co drastycznie obniża stężenie aktywnego kalcytriolu (1,25(OH)2D). Spadek kalcytriolu upośledza wchłanianie wapnia w jelitach, wywołując hipokalcemię. Niskie stężenie Ca2+, niski kalcytriol i wysokie fosforany tworzą potężny, stały bodziec stymulujący hiperplazję komórek głównych przytarczyc i masywny wyrzut PTH — tak powstaje wtórna nadczynność przytarczyc (SHPT).',
      },
      {
        title: 'Przejście w trzeciorzędową nadczynność przytarczyc (THPT)',
        text: 'Wieloletnia, niekontrolowana stymulacja przytarczyc w stadium schyłkowej niewydolności nerek (hemodializoterapia) prowadzi do transformacji rozlanej hiperplazji komórek w rozrost guzkowy o charakterze monoklonalnym. Na powierzchni rozrośniętych komórek dochodzi do drastycznego spadku gęstości receptorów CaSR oraz receptorów dla witaminy D (VDR). Przytarczyce stają się całkowicie niewrażliwe na hamujące sygnały sprzężenia zwrotnego i zaczynają produkować kolosalne ilości PTH w sposób w pełni autonomiczny. W tym momencie stężenie wapnia we krwi przestaje być niskie i rośnie do wartości hiperkalcemicznych — dochodzi do rozwoju trzeciorzędowej nadczynności przytarczyc (THPT).',
      },
      {
        title: 'Cele terapeutyczne wg KDIGO i leczenie farmakologiczne',
        text: 'W SHPT priorytetem jest kontrola hiperfosfatemii (dieta ubogofosforanowa i niewapniowe związki wiążące fosforany w jelicie, np. sewelamer, węglan lantanowy) oraz aktywacja receptorów VDR selektywnymi analogami witaminy D (parikalcytol) bez prowokowania hiperkalcemii. W celu zahamowania sekrecji PTH u chorych dializowanych stosuje się allosteryczne modulatory CaSR — kalcymimetyki (cynakalcet doustnie lub etelkalcetyd dożylnie na koniec dializy). Jeśli w THPT rozwija się oporna na farmakoterapię hiperkalcemia, bolesne zwapnienia naczyń (filaksja wapniowa / calciphylaxis) lub ciężka osteodystrofia nerkowa, konieczna jest chirurgiczna subtotalna paratyreoidktomia.',
      },
    ],
    table: {
      headers: ['Postać nadczynności', 'Stężenie wapnia (Ca)', 'Stężenie fosforanów (P)', 'Stężenie parathormonu (PTH)', 'Główny mechanizm'],
      rows: [
        ['Pierwotna (PHPT)', 'Podwyższone (hiperkalcemia)', 'Obniżone (hipofosfatemia)', 'Podwyższone lub nieadekwatnie prawidłowe', 'Autonomiczny gruczolak przytarczycy'],
        ['Wtórna (SHPT)', 'Obniżone lub niska norma (hipokalcemia)', 'Podwyższone (retencja nerkowa)', 'Wybitnie wysokie (reaktywne)', 'PChN: spadek kalcytriolu i retencja fosforanów'],
        ['Trzeciorzędowa (THPT)', 'Podwyższone (hiperkalcemia)', 'Podwyższone lub prawidłowe', 'Ekstremalnie wysokie (>500–2000 pg/ml)', 'Autonomizacja rozrostu guzkowego po latach SHPT'],
      ],
    },
    advanced:
      'Kalcifilaksja (ang. calciphylaxis, arteriolopatia mocznicowa ze zwapnieniem) jest najgroźniejszym powikłaniem zaawansowanego CKD-MBD i THPT. Dochodzi w niej do masywnego odkładania soli wapniowo-fosforanowych w błonie wewnętrznej małych tętniczek skóry i tkanki podskórnej, prowadząc do zawałów skóry, bolesnych owrzodzeń, martwicy i sepsy o śmiertelności sięgającej 60–80%. Leczenie obejmuje tiosiarczan sodu i.v. oraz pilne obniżenie iloczynu Ca x P.',
    summary:
      'SHPT w nerkach cechuje się hipokalcemią, hiperfosfatemią i reaktywnym wyrzutem PTH. Wieloletnia stymulacja prowadzi do THPT: utraty receptorów CaSR/VDR, autonomii i pojawienia się hiperkalcemii.',
    sourceIds: ['kdigo_ckd_mbd', 'asbmr_calcium'],
    questions: [
      q(
        'Jaki zestaw wyników laboratoryjnych jest najbardziej typowy dla wtórnej nadczynności przytarczyc (SHPT) w przebiegu PChN?',
        ['Hipokalcemia, hiperfosfatemia, bardzo wysokie stężenie PTH', 'Utrata nefronów obniża produkcję kalcytriolu i zatrzymuje fosforany, co kompensacyjnie winduje PTH.'],
        ['Hiperkalcemia, hipofosfatemia, wysokie stężenie PTH', 'Taki profil odpowiada pierwotnej nadczynności przytarczyc (PHPT).'],
        ['Hiperkalcemia, hiperfosfatemia, całkowicie niewykrywalne PTH', 'Profil typowy dla zatrucia witaminą D lub nowotworów kości, a nie SHPT.']
      ),
      q(
        'Co definiuje przejście wtórnej nadczynności przytarczyc (SHPT) w nadczynność trzeciorzędową (THPT)?',
        ['Pojawienie się hiperkalcemii na skutek autonomizacji rozrostu przytarczyc i utraty CaSR/VDR', 'Gruczoły przestają reagować na stężenie wapnia i wydzielają PTH autonomicznie mimo rosnącej hiperkalcemii.'],
        ['Spadek stężenia PTH poniżej dolnej granicy normy', 'W THPT stężenia PTH osiągają jedne z najwyższych wartości w medycynie (>800–2000 pg/ml).'],
        ['Całkowita normalizacja parametrów gospodarki mineralnej', 'THPT jest zaostrzeniem i powikłaniem utrwalonej niewydolności metabolicznej.']
      ),
      q(
        'Dlaczego u pacjentów ze schyłkową niewydolnością nerek preferuje się bezwapniowe leki wiążące fosforany (np. sewelamer)?',
        ['Aby uniknąć dodatniego bilansu wapniowego i zagrażających życiu zwapnień naczyniowych', 'Preparaty wapniowe przy hiperfosfatemii zwiększają iloczyn Ca x P i przyspieszają miażdżycę tętnic.'],
        ['Ponieważ węglan wapnia nie wiąże fosforanów w przewodzie pokarmowym', 'Węglan wapnia wiąże fosforany, ale powoduje niebezpieczną hiperkalcemię.'],
        ['Sewelamer bezpośrednio rozpuszcza guzy przytarczyc', 'Sewelamer działa wyłącznie w świetle jelita i nie wchłania się do krążenia.']
      ),
      q(
        'W jaki sposób kalcymimetyk etelkalcetyd obniża stężenie parathormonu u chorych dializowanych?',
        ['Wiąże się allosterycznie z receptorem CaSR, zwiększając jego wrażliwość na pozakomórkowy wapń', '„Oszukuje” przytarczyce, dając sygnał supresyjny syntezy PTH bez podnoszenia stężenia wapnia we krwi.'],
        ['Niszczy komórki przytarczyc na drodze apoptozy cytotoksycznej', 'Etelkalcetyd modyfikuje konformację receptora, a nie niszczy komórek.'],
        ['Hamuje wchłanianie wapnia w jelicie cienkim', 'Lek działa na receptor CaSR w przytarczycach.']
      ),
      q(
        'Czym jest kalcifilaksja (arteriolopatia mocznicowa ze zwapnieniem)?',
        ['Masywnym zwapnieniem drobnych tętnic skóry prowadzącym do bolesnej martwicy i owrzodzeń', 'Śmiertelne powikłanie zaburzeń Ca-P w PChN wywołane zamknięciem naczyń przez złogi fosforanu wapnia.'],
        ['Zapaleniem przytarczyc wywołanym zakażeniem bakteryjnym', 'To zaburzenie naczyniowo-skórne, a nie infekcja gruczołów dokrewnych.'],
        ['Przejściowym przebarwieniem paznokci po dializie', 'Kalcifilaksja jest zagrażającą życiu martwicą niedokrwienną skóry i tkanki podskórnej.']
      ),
    ],
  },
  {
    id: 'hiperkalcemia-nowotwory',
    title: 'Złośliwa hiperkalcemia',
    subtitle: 'PTHrP, osteoliza, chłoniaki i diagnostyka różnicowa',
    group: 'Nadczynności i hiperkalcemia',
    minutes: 15,
    goals: [
      'Zróżnicujesz hiperkalcemię zależną od PTH od hiperkalcemii nowotworowej niezależnej od PTH.',
      'Poznasz 3 główne mechanizmy hiperkalcemii w onkologii (PTHrP, osteoliza, 1,25(OH)2D).',
      'Zrozumiesz znaczenie stłumienia endogennego PTH w diagnostyce różnicowej.',
    ],
    sections: [
      {
        title: 'Najczęstsza przyczyna hiperkalcemii u pacjentów hospitalizowanych',
        text: 'O ile w lecznictwie otwartym 90% przypadków hiperkalcemii stanowi łagodna pierwotna nadczynność przytarczyc (PHPT), o tyle u chorych hospitalizowanych dominującą przyczyną jest hiperkalcemia w chorobie nowotworowej (HCM — Hypercalcemia of Malignancy). HCM rozwija się u 20–30% chorych na nowotwory złośliwe, pojawia się nagle, ma gwałtowny przebieg z ciężkimi objawami neurologicznymi i sercowymi oraz stanowi zwiastun zaawansowanego stadium choroby o niekorzystnym rokowaniu (mediana przeżycia rzędu kilku miesięcy).',
      },
      {
        title: 'Trzy odmienne mechanizmy onkologiczne',
        text: 'Wyróżnia się trzy odrębne patomechanizmy HCM: 1. Humoralna hiperkalcemia nowotworowa (HHM, ok. 80% przypadków) — wywołana wydzielaniem peptydu parathormonopodobnego (PTHrP) przez guzy lite bez przerzutów do kości (rak płaskonabłonkowy płuca, głowy i szyi, przełyku, rak nerki, pęcherza moczowego). PTHrP wiąże się z receptorem PTHR1, naśladując PTH. 2. Miejscowa osteoliza (ok. 20%) — cytokiny (IL-1, IL-6, TNF-alfa, RANKL) wydzielane przez komórki szpiczaka mnogiego lub przerzuty raka piersi bezpośrednio aktywują osteoklasty do niszczenia kości. 3. Nadprodukcja kalcytriolu (ok. 1%) — pozanerkowa aktywność enzymu 1alfa-hydroksylazy w komórkach chłoniaków Hodgkina i nie-Hodgkina oraz w ziarniniakach (sarkoidoza).',
      },
      {
        title: 'Wzorzec laboratoryjny: stłumienie parathormonu',
        text: 'Kluczem różnicującym HCM od pierwotnej nadczynności przytarczyc jest stężenie intaktnego parathormonu (iPTH). W hiperkalcemii nowotworowej zdrowe przytarczyce reagują prawidłowo na wysokie stężenie Ca2+ — receptor CaSR jest silnie pobudzony, a wydzielanie endogennego PTH zostaje całkowicie stłumione do wartości skrajnie niskich lub wręcz niewykrywalnych (iPTH < 5–10 pg/ml). Zestawienie: wysoki wapń + stłumiony PTH jednoznacznie wyklucza pierwotną nadczynność przytarczyc i nakazuje natychmiastowe poszukiwanie nowotworu lub chorób ziarniniakowych.',
      },
    ],
    table: {
      headers: ['Mechanizm HCM', 'Typowe nowotwory', 'Stężenie iPTH', 'Stężenie PTHrP', 'Stężenie 1,25(OH)2D'],
      rows: [
        ['Wydzielanie PTHrP (Humoralna HHM)', 'Rak płaskonabłonkowy (płuca, krtani), rak nerki', 'Stłumione (<10 pg/ml)', 'Wysokie', 'Niskie lub prawidłowe'],
        ['Miejscowa osteoliza', 'Szpiczak mnogi, rak piersi z przerzutami', 'Stłumione (<10 pg/ml)', 'Prawidłowe / niskie', 'Niskie'],
        ['Nadprodukcja kalcytriolu', 'Chłoniaki (Hodgkin, NHL), sarkoidoza', 'Stłumione (<10 pg/ml)', 'Prawidłowe / niskie', 'Znacznie podwyższone'],
        ['Pierwotna nadczynność (dla kontrastu)', 'Gruczolak przytarczycy', 'Podwyższone (>65 pg/ml)', 'Prawidłowe / niskie', 'Podwyższone'],
      ],
    },
    advanced:
      'PTHrP wykazuje homologię do PTH jedynie w pierwszych 13 aminokwasach N-końca, co wystarcza do pobudzenia receptora PTHR1, lecz uniemożliwia wykrycie go w standardowych testach immunoenzymatycznych dla iPTH. W odróżnieniu od natywnego PTH, PTHrP w warunkach in vivo znacznie słabiej stymuluje nerkową 1alfa-hydroksylazę, dlatego w klasycznej HHM stężenie kalcytriolu pozostaje niskie lub prawidłowe pomimo ciężkiej hiperkalcemii.',
    summary:
      'Hiperkalcemia nowotworowa jest stanem nagłym niezależnym od PTH (endogenny iPTH jest stłumiony <10 pg/ml). Odpowiada za nią najczęściej ektopowy peptyd PTHrP (raki płaskonabłonkowe), miejscowa osteoliza (szpiczak) lub kalcytriol (chłoniaki).',
    sourceIds: ['endo_hypercalcemia', 'asbmr_calcium'],
    questions: [
      q(
        'U 64-letniego palacza tytoniu z guzowatą zmianą w płucu stwierdzono Ca 13,8 mg/dl, fosforany 2,0 mg/dl i iPTH 4 pg/ml (norma 15–65). Jaki jest najbardziej prawdopodobny mechanizm hiperkalcemii?',
        ['Wydzielanie peptydu PTHrP przez raka płaskonabłonkowego płuca', 'PTHrP aktywuje receptory PTHR1, dając hiperkalcemię z fosfaturią, przy fizjologicznym stłumieniu endogennego PTH przez CaSR.'],
        ['Współistniejący gruczolak przytarczycy (PHPT)', 'W gruczolaku przytarczycy stężenie iPTH byłoby podwyższone lub nieadekwatnie wysokie, a nie stłumione do 4 pg/ml.'],
        ['Jatrogenne zatrucie hydrochlorotiazydem', 'Tiazydy rzadko dają wapń >12 mg/dl i nie tłumaczą obrazu radiologicznego guza płuca.']
      ),
      q(
        'Jaka jest kluczowa różnica laboratoryjna między hiperkalcemią w PHPT a hiperkalcemią nowotworową (HCM)?',
        ['W HCM stężenie endogennego iPTH jest stłumione, a w PHPT jest podwyższone lub nieadekwatnie prawidłowe', 'Zdrowe przytarczyce w HCM hamują wydzielanie PTH w odpowiedzi na hiperkalcemię.'],
        ['W PHPT stężenie wapnia zawsze przekracza 15 mg/dl, a w HCM wynosi do 11 mg/dl', 'Wprost przeciwnie: ciężkie hiperkalcemie >14 mg/dl są znacznie częstsze w chorobach nowotworowych.'],
        ['W HCM stężenie fosforanów we krwi zawsze wynosi powyżej 8 mg/dl', 'Przy sekrecji PTHrP fosforany są niskie z powodu indukowanej fosfaturii.']
      ),
      q(
        'Który nowotwór układu krwiotwórczego powoduje hiperkalcemię w mechanizmie pozanerkowej 1alfa-hydroksylacji i nadmiaru kalcytriolu?',
        ['Chłoniak Hodgkina i chłoniaki nieziarnicze', 'Makrofagi i komórki chłoniaka zawierają aktywny enzym CYP27B1 syntetyzujący kalcytriol w sposób niekontrolowany.'],
        ['Przewlekła białaczka szpikowa (CML)', 'CML rzadko manifestuje się pierwotną hiperkalcemią kalcytriolozależną.'],
        ['Czerwienica prawdziwa', 'Czerwienica wiąże się z nadkrwistością, a nie zaburzeniami syntezy witaminy D.']
      ),
      q(
        'Dlaczego standardowy test laboratoryjny na parathormon (iPTH) nie wykrywa peptydu PTHrP?',
        ['PTHrP ma odmienną sekwencję aminokwasową poza krótkim fragmentem N-końcowym', 'Przeciwciała w dwumiejscowych testach iPTH są skierowane na inne epitopy cząsteczki parathormonu.'],
        ['PTHrP natychmiast ulega degradacji w probówce w ciągu 1 sekundy', 'PTHrP można oznaczyć dedykowanym, specjalistycznym testem radioimmunologicznym.'],
        ['PTHrP krąży wyłącznie wewnątrz erytrocytów', 'PTHrP jest hormonem peptydowym rozpuszczonym w osoczu.']
      ),
      q(
        'Jakie jest rokowanie u chorego z nowotworem litym, u którego doszło do rozwoju hiperkalcemii nowotworowej (HCM)?',
        ['Poważne i niekorzystne; mediana przeżycia wynosi zwykle kilka miesięcy', 'Pojawienie się HCM świadczy o zaawansowaniu procesu rozrostowego i dużej masie guza.'],
        ['Doskonałe; hiperkalcemia oznacza samoistną martwicę i wyleczenie nowotworu', 'Hiperkalcemia jest stanem zagrożenia życia, a nie objawem zdrowienia.'],
        ['Nie ma żadnego związku ze stanem zaawansowania choroby nowotworowej', 'HCM jest jednym z najważniejszych negatywnych czynników rokowniczych w onkologii.']
      ),
    ],
  },
];
