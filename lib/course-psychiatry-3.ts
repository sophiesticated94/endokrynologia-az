import { type DraftLesson, q } from './course-types.ts';

export const draftPsychiatryPart3: DraftLesson[] = [
  {
    id: 'farmakokinetyka-oun-bariera',
    moduleId: 'psych-farmakologia',
    title: 'Farmakokinetyka leków w OUN i bariera krew-mózg',
    subtitle: 'Lipofilność, glikoproteina P (P-gp), wolna frakcja i penetracja do mózgowia',
    group: 'Farmakokinetyka i farmakodynamika OUN',
    minutes: 18,
    goals: [
      'Zrozumiesz rolę bariery krew-mózg (BBB) i pompy effluksowej P-gp w dystrybucji psychotropów.',
      'Scharakteryzujesz wpływ wiązania z białkami osocza na wolną frakcję aktywną leku w OUN.',
      'Ocenisz kinetykę eliminacji i czas osiągania stanu stacjonarnego (steady state).'
    ],
    sections: [
      {
        title: 'Bariera krew-mózg (BBB) i czynniki determinujące przenikanie',
        text: 'Leki psychotropowe, aby wywrzeć efekt terapeutyczny, muszą przekroczyć barierę krew-mózg (blood-brain barrier, BBB), zbudowaną ze ściśle połączonych komórek śródbłonka naczyniowego (tight junctions) otoczonych przez perycyty i stopki astrocytarne. Kluczowymi determinantami penetracji są: niska masa cząsteczkowa (< 400–500 Da), wysoka lipofilność (współczynnik logP) oraz brak ładunku elektrycznego w fizjologicznym pH krwi (7,4).'
      },
      {
        title: 'Glikoproteina P (P-gp / ABCB1) jako strażnik OUN',
        text: 'Aktywna pompa effluksowa glikoproteina P (kodowana przez gen ABCB1) zlokalizowana w błonie komórek śródbłonka aktywnie wypompowuje wiele leków z tkanki mózgowej z powrotem do światła naczynia. Przykładowo, rysperydon i paliperydon są silnymi substratami P-gp, podczas gdy olanzapina i klozapina penetrują swobodniej. Inhibicja P-gp (np. przez werapamil, ketokonazol) może drastycznie zwiększyć mózgowe stężenie leku bez zmiany stężenia we krwi obwodowej.'
      },
      {
        title: 'Wiązanie z białkami, wolna frakcja i stan stacjonarny',
        text: 'Większość psychotropów wiąże się w 90–99% z albuminami lub alfa-1-kwaśną glikoproteiną. Tylko wolna, niezwiązana frakcja leku podlega dyfuzji do płynu mózgowo-rdzeniowego i wiąże się z receptorami. Czas osiągnięcia stanu stacjonarnego wynosi 4–5 okresów półtrwania (t1/2) leku – stąd przy t1/2 wynoszącym 24 godziny stabilne stężenie w mózgu ustala się dopiero po około 5 dniach regularnego przyjmowania.'
      }
    ],
    table: {
      headers: ['Parametr farmakokinetyczny', 'Znaczenie dla działania w OUN', 'Przykład kliniczny', 'Wpływ na dawkowanie'],
      rows: [
        ['Substrat P-gp (ABCB1)', 'Aktywne usuwanie leku z mózgu przez barierę BBB', 'Rysperydon, paliperydon', 'Możliwa rozbieżność między stężeniem w osoczu a efektem w OUN'],
        ['Wysokie wiązanie z białkami (> 95%)', 'Tylko wolna frakcja wywiera efekt i ulega metabolizmowi', 'Diazepam, kwas walproinowy', 'W hipoalbuminemii rośnie wolna frakcja i toksyczność'],
        ['Długi okres półtrwania (t1/2)', 'Czas do steady-state wynosi 4–5 okresów półtrwania', 'Fluoksetyna (oraz norfluoksetyna: t1/2 ~7 dni)', 'Pełna stabilizacja stężenia wymaga nawet 4–5 tygodni']
      ]
    },
    advanced:
      'W ostrych stanach zapalnych OUN (np. zapalenie opon, udar mózgu) lub w przebiegu przewlekłego stresu i depresji dochodzi do rozszczelnienia tight junctions w BBB ("leaky brain"), co zwiększa przepuszczalność dla neurotoksyn, cytokin prozapalnych i leków o gorszym profilu penetracji.',
    summary:
      'Penetracja leków do mózgu zależy od lipofilności i pompy effluksowej P-gp. Działanie wywiera wyłącznie frakcja wolna, a stan stacjonarny ustala się po 4–5 okresach biologicznego półtrwania.',
    sourceIds: ['stahl-essential', 'maudsley15', 'agnp-tdm-2026'],
    questions: [
      q(
        'Ile okresów biologicznego półtrwania (t1/2) potrzeba, aby stężenie leku psychotropowego osiągnęło stan stacjonarny (steady state)?',
        ['Około 4 do 5 okresów półtrwania (t1/2)', 'Wtedy szybkość eliminacji leku zrównuje się z szybkością jego podawania (ok. 94–97% stężenia docelowego).'],
        ['Dokładnie 1 okres półtrwania', 'Po 1 okresie półtrwania lek osiąga zaledwie 50% stężenia stacjonarnego.'],
        ['Co najmniej 30 okresów półtrwania', 'Po 30 okresach lek uległby całkowitej wymianie kilkukrotnie.'],
        'psych-pk-q1'
      ),
      q(
        'Jaką rolę w barierze krew-mózg pełni glikoproteina P (P-gp, transporter ABCB1)?',
        ['Aktywnie usuwa substraty lekowe z tkanki mózgowej z powrotem do krwiobiegu, ograniczając ich penetrację do OUN', 'Jest to zależna od ATP pompa effluksowa chroniąca mózgowie przed ksenobiotykami.'],
        ['Ułatwia wychwyt glukozy i aminokwasów rozgałęzionych do neuronów', 'Transportem glukozy zajmuje się GLUT-1, nie P-gp.'],
        ['Syntetyzuje dopaminę z tyrozyny w śródbłonku', 'P-gp nie ma aktywności hydroksylazy tyrozynowej.'],
        'psych-pk-q2'
      ),
      q(
        'Który metabolit aktywnego leku przeciwdepresyjnego wykazuje wyjątkowo długi okres półtrwania wynoszący ok. 7–14 dni?',
        ['Norfluoksetyna (aktywny metabolit fluoksetyny)', 'Dzięki temu fluoksetyna rzadziej wywołuje zespół odstawienny i wymaga 5-tygodniowego okresu wypłukiwania przed włączeniem MAOI.'],
        ['Kwas walproinowy', 'Kwas walproinowy ma t1/2 ok. 12–16 godzin.'],
        ['Hydroksyzyna', 'Hydroksyzyna ma t1/2 ok. 14–20 godzin.'],
        'psych-pk-q3'
      ),
      q(
        'Co dzieje się z farmakokinetyką leku silnie wiążącego się z białkami (np. kwasu walproinowego) u pacjenta z ciężką hipoalbuminemią?',
        ['Wzrasta stężenie wolnej, aktywnej frakcji leku we krwi, co może wywołać objawy toksyczności przy "prawidłowym" stężeniu całkowitym', 'Tylko wolna frakcja przechodzi do tkanek i wywiera działanie toksyczne.'],
        ['Lek przestaje w ogóle przenikać przez barierę krew-mózg', 'Brak białek ułatwia, a nie blokuje przenikanie wolnego leku.'],
        ['Okres półtrwania leku wydłuża się do 10 lat', 'Klirens wątrobowy wolnej frakcji ulega raczej przyspieszeniu.'],
        'psych-pk-q4'
      ),
      q(
        'Jaka cecha fizykochemiczna cząsteczki leku najbardziej sprzyja biernej dyfuzji przez barierę krew-mózg?',
        ['Wysoka lipofilność przy braku ładunku jonowego w pH 7,4', 'Bariera BBB jest barierą lipidową, łatwo przepuszczalną dla małych cząsteczek niepolarnych.'],
        ['Duża masa cząsteczkowa powyżej 50 000 Da i hydrofilność', 'Cząsteczki hydrofilne i duże nie przekraczają nienaruszonej bariery BBB.'],
        ['Obecność trwałego dodatniego ładunku czwartorzędowego', 'Trwały ładunek jonowy uniemożliwia przenikanie przez lipidy błony.'],
        'psych-pk-q5'
      )
    ]
  },
  {
    id: 'transportery-monoamin-sert-net-dat',
    moduleId: 'psych-farmakologia',
    title: 'Transportery monoamin: SERT, NET i DAT w badaniach PET',
    subtitle: 'Krzywa wysycenia, hiperboliczna zależność dawka-odpowiedź i farmakodynamika',
    group: 'Receptorologia i układy przekaźnikowe',
    minutes: 18,
    goals: [
      'Zrozumiesz mechanizm blokady transporterów SERT, NET i DAT przez leki przeciwdepresyjne.',
      'Zinterpretujesz krzywą wysycenia SERT w badaniach PET (próg terapeutyczny ~80%).',
      'Wyjaśnisz, dlaczego podwajanie dawki SSRI nie podwaja blokady transportera w OUN.'
    ],
    sections: [
      {
        title: 'Rodzina transporterów SLC6 i wychwyt zwrotny',
        text: 'Transportery monoamin: serotoniny (SERT / SLC6A4), noradrenaliny (NET / SLC6A2) i dopaminy (DAT / SLC6A3) należą do rodziny nośników zależnych od gradientu sodowo-potasowego. Ich fizjologiczną rolą jest usuwanie neuroprzekaźnika ze szczeliny synaptycznej z powrotem do kolbki presynaptycznej, co kończy transmisję sygnału. Blokada transportera powoduje kumulację monoaminy w synapsie.'
      },
      {
        title: 'Przełomowe badania PET Meyera: 80% occupancy SERT',
        text: 'Badania pozytonowej tomografii emisyjnej (PET) z użyciem ligandu [11C]DASB (Meyer i wsp.) udowodniły, że minimalna dawka kliniczna każdego SSRI (np. cytalopram 20 mg, escitalopram 10 mg, sertralina 50 mg, paroksetyna 20 mg) blokuje już około 75–85% transporterów SERT w prążkowiu i korze mózgu. Osiągnięcie ~80% occupancy stanowi warunek konieczny do wyzwolenia odpowiedzi przeciwdepresyjnej.'
      },
      {
        title: 'Hiperboliczna krzywa wysycenia i implikacje kliniczne',
        text: 'Krzywa wiązania leku z SERT ma charakter nieliniowy (hiperboliczny wg równania Michaela-Menten). Wzrost dawki sertraliny z 50 mg do 100 mg podnosi blokadę SERT z 80% do ok. 85%, a zwiększenie do 200 mg – do ok. 88%. Wyjaśnia to, dlaczego eskalacja dawek SSRI przynosi skromny przyrost skuteczności przeciwdepresyjnej, natomiast znacznie nasila działania niepożądane (zależne od receptorów obwodowych i innych celów).'
      }
    ],
    table: {
      headers: ['Lek przeciwdepresyjny', 'Minimalna dawka (mg)', 'Occupancy SERT w PET (%)', 'Occupancy przy dawce maks. (%)'],
      rows: [
        ['Escitalopram', '10 mg', '78–82%', '86–89% (20 mg)'],
        ['Sertralina', '50 mg', '77–83%', '87–91% (200 mg)'],
        ['Paroksetyna', '20 mg', '82–86%', '89–93% (40 mg)'],
        ['Wenlafaksyna', '75 mg (tylko SERT)', '75–80%', '85% SERT + ~60% NET (225–375 mg)']
      ]
    },
    advanced:
      'Wenlafaksyna wykazuje zależność profilu od dawki: w dawkach <= 75–150 mg/d działa niemal wyłącznie jako selektywny inhibitor SERT. Dopiero w dawkach >= 225 mg/d dochodzi do istotnego zablokowania transportera noradrenaliny (NET), przekształcając lek w funkcjonalny SNRI.',
    summary:
      'Leki przeciwdepresyjne wymagają ~80% occupancy SERT w badaniach PET, co zapewnia już dawka początkowa. Z powodu hiperbolicznej krzywej wiązania dalsze podwajanie dawki daje niewielki wzrost blokady, potęgując objawy niepożądane.',
    sourceIds: ['pet-sert-meyer', 'stahl-essential', 'canmat-mdd-2023'],
    questions: [
      q(
        'Jaki minimalny procent wysycenia transporterów SERT w badaniach PET jest niezbędny do uzyskania efektu przeciwdepresyjnego wg Meyera?',
        ['Około 80% occupancy SERT w OUN', 'Wartość ta stanowi próg terapeutyczny osiągany już przy minimalnej zarejestrowanej dawce terapeutycznej.'],
        ['Mniej niż 10% occupancy', '10% nie wywołuje zauważalnego podwyższenia stężenia 5-HT w synapsie ani desensytyzacji autoreceptorów.'],
        ['Dokładnie 100% nieodwracalnej blokady', '100% blokada nie występuje i groziłaby ciężkim, ostrym zespołem serotoninowym.'],
        'psych-trans-q1'
      ),
      q(
        'Dlaczego podwojenie dawki SSRI (np. sertraliny z 50 do 100 mg) zwiększa blokadę SERT jedynie o ok. 5–7%?',
        ['Ponieważ krzywa wiązania leku z transporterem ma kształt hiperboliczny i przy 80% wkracza w fazę plateau (nasycenia)', 'Większość miejsc wiążących jest już zajęta; do dalszego wzrostu potrzebne byłyby stężenia logarytmicznie wyższe.'],
        ['Ponieważ sertralina ulega natychmiastowemu wydaleniu przez płuca', 'Sertralina jest metabolizowana w wątrobie, nie w płucach.'],
        ['Transporter SERT ulega zniszczeniu po pierwszej dawce leku', 'Transportery podlegają fizjologicznej internalizacji i recyklingowi, nie destrukcji.'],
        'psych-trans-q2'
      ),
      q(
        'Od jakiej dawki dobowej wenlafaksyna zaczyna w istotnym stopniu klinicznym blokować transporter noradrenaliny (NET)?',
        ['Od dawki 225 mg/d i wyższych', 'W niższych dawkach (75–150 mg) wenlafaksyna działa jak typowy SSRI.'],
        ['Już od najmniejszej dawki 37,5 mg/d', 'Przy 37,5 mg blokada NET jest pomijalna klinicznie.'],
        ['Wenlafaksyna nigdy nie blokuje transportera NET', 'Wenlafaksyna jest zarejestrowana jako SNRI i blokuje NET w odpowiednio wysokiej dawce.'],
        'psych-trans-q3'
      ),
      q(
        'Który transporter odpowiada za wychwyt zwrotny dopaminy m.in. w prążkowiu i jest celem metylofenidatu oraz bupropionu?',
        ['DAT (dopamine transporter / SLC6A3)', 'Blokada DAT w prążkowiu i korze przedczołowej podwyższa toniczne stężenie dopaminy.'],
        ['GLUT-4', 'GLUT-4 to transporter glukozy zależny od insuliny w mięśniach i tkance tłuszczowej.'],
        ['SGLT-2', 'SGLT-2 to kotransporter sodowo-glukozowy w kanalikach nerkowych.'],
        'psych-trans-q4'
      ),
      q(
        'Jakie znaczenie ma selektywność escitalopramu wobec SERT w porównaniu z innymi SSRI?',
        ['Jest najczystszym znanym inhibitorem SERT, niemal pozbawionym powinowactwa do receptorów histaminowych, cholinergicznych czy NET', 'Cechuje się czystym profilem bez działań sedatywnych czy antycholinergicznych.'],
        ['Blokuje wyłącznie receptory beta-adrenolityczne w sercu', 'Escitalopram nie jest beta-blokerem.'],
        ['Wiąże się nieodwracalnie kowalencyjnie z DNA jądrowym', 'Nie ma żadnego działania mutagennego ani alkilującego DNA.'],
        'psych-trans-q5'
      )
    ]
  },
  {
    id: 'receptory-dopaminowe-okno-kapura',
    moduleId: 'psych-farmakologia',
    title: 'Receptory D2 i D3: okno terapeutyczne Kapura (65–80%)',
    subtitle: 'Mechanizm przeciwpsychotyczny, objawy pozapiramidowe i prolaktyna',
    group: 'Receptorologia i układy przekaźnikowe',
    minutes: 18,
    goals: [
      'Zrozumiesz koncepcję prążkowiowego okna terapeutycznego Kapura (65%–80% occupancy D2).',
      'Wyjaśnisz zależność między blokadą D2 > 80% a wystąpieniem objawów pozapiramidowych (EPS) i hiperprolaktynemii.',
      'Scharakteryzujesz rolę częściowych agonistów D2/D3 (aripiprazol, kariprazyna) w prewencji powikłań.'
    ],
    sections: [
      {
        title: 'Hipoteza dopaminowa i rola receptora D2 w szlaku mezolimbicznym',
        text: 'Objawy wytwórcze psychozy (urojenia, omamy) wynikają z nadmiernej, niespójnej stymulacji receptorów dopaminowych D2 w szlaku mezolimbicznym (biegnącym z pola brzusznego nakrywki VTA do jądra półleżącego). Zablokowanie receptorów D2 w tym obwodzie przywraca właściwe filtrowanie bodźców i redukuje aberracyjną wagę poznawczą (aberrant salience).'
      },
      {
        title: 'Przełomowa praca Shitija Kapura: okno occupancy 65–80%',
        text: 'W badaniach neuroobrazowych PET Kapur wykazał istnienie ścisłego okna terapeutycznego blokady prążkowiowych receptorów D2: 1) Poniżej 65% occupancy – brak istotnego działania przeciwpsychotycznego; 2) Pomiędzy 65% a 80% – optymalny efekt przeciwpsychotyczny przy znikomym ryzyku powikłań ruchowych; 3) Powyżej 80% occupancy – gwałtowny, skokowy wzrost ryzyka ostrych objawów pozapiramidowych (EPS: parkinsonizm, akatyzja, dystonie) oraz hiperprolaktynemii.'
      },
      {
        title: 'Trzecia generacja: częściowi agoniści D2/D3',
        text: 'Leki III generacji (aripiprazol, brekspiprazol, kariprazyna) nie są czystymi antagonistami, lecz częściowymi agonistami receptorów D2 i D3. Stabilizują one układ dopaminowy – w warunkach hiperdopaminergii działają jak antagoniści (redukując psychozę), natomiast w warunkach hipodopaminergii stymulują receptor z aktywnością wewnętrzną rzędu 25–40%, co zapobiega EPS i nie podwyższa prolaktyny, nawet przy occupancy sięgającym 90–95% w badaniu PET.'
      }
    ],
    table: {
      headers: ['Poziom Occupancy D2 w PET', 'Efekt kliniczny w OUN', 'Ryzyko EPS', 'Wydzielanie prolaktyny'],
      rows: [
        ['< 65%', 'Nieskuteczny / brak kontroli urojeń i omamów', 'Praktycznie zerowe', 'Prawidłowe'],
        ['65% – 80% (Okno Kapura)', 'Optymalny efekt przeciwpsychotyczny', 'Niskie / akceptowalne', 'Prawidłowe lub umiarkowanie podwyższone'],
        ['> 80%', 'Brak dodatkowej korzyści przeciwpsychotycznej', 'Bardzo wysokie (skokowy wzrost EPS)', 'Znaczna hiperprolaktynemia (szlak guzkowo-lejkowy)'],
        ['Częściowy agonizm D2 (90%)', 'Skuteczność przeciwpsychotyczna bez blokady tonicznej', 'Bardzo niskie (z wyjątkiem akatyzacji)', 'Prawidłowe lub spadek prolaktyny']
      ]
    },
    advanced:
      'Kariprazyna wyróżnia się unikalnym, preferencyjnym powinowactwem do receptora dopaminowego D3 (około 8–10 razy wyższym niż do D2). Receptory D3 zlokalizowane są głównie w układzie limbicznym i korze czołowej, co odpowiada za udowodnioną skuteczność kariprazyny w leczeniu pierwotnych objawów negatywnych i poznawczych w schizofrenii.',
    summary:
      'Okno terapeutyczne Kapura dla antagonistów D2 wynosi 65–80% occupancy. Przekroczenie 80% wyzwala EPS i hiperprolaktynemię. Częściowi agoniści D2/D3 osiągają wysokie occupancy bez blokady bazowej transmisji.',
    sourceIds: ['pet-d2-kapur', 'wfsbp-schizophrenia', 'stahl-essential'],
    questions: [
      q(
        'Jaki jest optymalny przedział blokady (occupancy) receptorów D2 w prążkowiu gwarantujący skuteczność bez wywoływania EPS wg Kapura?',
        ['65% do 80% occupancy D2', 'W tym przedziale następuje ustąpienie psychozy przy minimalnym ryzyku objawów pozapiramidowych.'],
        ['Mniej niż 20% occupancy D2', 'Blokada < 20% nie daje żadnego mierzalnego efektu przeciwpsychotycznego.'],
        ['Zawsze powyżej 95% occupancy D2', 'Blokada > 80% u antagonistów powoduje ciężki parkinsonizm polekowy i sztywność mięśniową.'],
        'psych-kapur-q1'
      ),
      q(
        'Dlaczego częściowy agonista D2 (np. aripiprazol) nie wywołuje parkinsonizmu ani hiperprolaktynemii pomimo occupancy D2 rzędu 85–95% w PET?',
        ['Posiada wewnętrzną aktywność agonistyczną (25–30%), co zapewnia bazowe przewodnictwo w szlaku nigrostriatalnym i guzkowo-lejkowym', 'Działa jak bufor: tonizuje nadmiar dopaminy, lecz nie wygasza całkowicie transmisji do zera.'],
        ['Aripiprazol nie przenika przez barierę krew-mózg', 'Aripiprazol doskonale penetruje do OUN, osiągając wysokie stężenia mózgowe.'],
        ['Pobudza wydzielanie prolaktyny bezpośrednio przez przysadkę', 'Aripiprazol obniża, a nie podwyższa stężenie prolaktyny.'],
        'psych-kapur-q2'
      ),
      q(
        'Który szlak dopaminowy odpowiada za wystąpienie mlekotoku i zaburzeń miesiączkowania przy blokadzie D2 > 80%?',
        ['Szlak guzkowo-lejkowy (tuberoinfundibular)', 'Dopamina jest fizjologicznym inhibitorem wydzielania prolaktyny; blokada D2 odhamowuje laktotrofy przysadki.'],
        ['Szlak nigrostriatalny', 'Szlak nigrostriatalny odpowiada za kontrolę ruchową i objawy pozapiramidowe.'],
        ['Szlak mezokortykalny', 'Szlak mezokortykalny wiąże się z funkcjami poznawczymi i objawami negatywnymi.'],
        'psych-kapur-q3'
      ),
      q(
        'Który z nowoczesnych leków przeciwpsychotycznych III generacji cechuje się najwyższym powinowactwem do receptorów dopaminowych D3?',
        ['Kariprazyna', 'Wysokie powinowactwo do D3 odpowiada za jej skuteczność w redukcji osiowych objawów negatywnych schizofrenii.'],
        ['Haloperydol', 'Haloperydol jest klasycznym, silnym antagonistą D2.'],
        ['Chlorpromazyna', 'Chlorpromazyna to fenotiazyna o niskiej sile działania i nieselektywnym profilu.'],
        'psych-kapur-q4'
      ),
      q(
        'Co dzieje się w szlaku mezolimbicznym podczas zaostrzenia psychozy u pacjenta ze schizofrenią?',
        ['Dochodzi do nadmiernego, chaotycznego wyrzutu dopaminy i hiperstymulacji receptorów D2', 'Prowadzi to do nadawania nadmiernego znaczenia neutralnym bodźcom środowiskowym (aberrant salience).'],
        ['Całkowite obumarcie neuronów dopaminergicznych', 'Schizofrenia nie jest chorobą neurodegeneracyjną z ostrą utratą ciał neuronów VTA.'],
        ['Gwałtowny spadek stężenia dopaminy do zera', 'Spadek dopaminy w szlaku mezolimbicznym tłumiłby psychozę, a nie ją zaostrzał.'],
        'psych-kapur-q5'
      )
    ]
  },
  {
    id: 'uklad-serotoninergiczny-receptory',
    moduleId: 'psych-farmakologia',
    title: 'Układ serotoninergiczny: receptory 5-HT1A, 2A, 2C, 3 i 7',
    subtitle: 'Różnorodność receptorowa, autoreceptory a modulacja uwalniania monoamin',
    group: 'Receptorologia i układy przekaźnikowe',
    minutes: 18,
    goals: [
      'Zróżnicujesz funkcje i lokalizację receptorów 5-HT1A, 5-HT2A, 5-HT2C, 5-HT3 i 5-HT7.',
      'Zrozumiesz, dlaczego antagonizm 5-HT2A leków atypowych chroni przed EPS i prolaktynemią.',
      'Wyjaśnisz działanie przeciwwymiotne i propoznawcze antagonizmu receptorów 5-HT3 i 5-HT7.'
    ],
    sections: [
      {
        title: 'Autoreceptory 5-HT1A a postsynaptyczne 5-HT2A',
        text: 'Serotonina oddziałuje na co najmniej 14 podtypów receptorów. Somatodendrytyczne receptory 5-HT1A w jądrach szwu pełnią funkcję hamulca uwalniania serotoniny. Z kolei receptory postsynaptyczne 5-HT2A (sprzężone z białkiem Gq) zlokalizowane na neuronach piramidowych kory i interneuronach GABA-ergicznych hamują uwalnianie dopaminy w prążkowiu i korze czołowej.'
      },
      {
        title: 'Antagonizm 5-HT2A jako znak rozpoznawczy SGA',
        text: 'Leki przeciwpsychotyczne II generacji (SGA: klozapina, olanzapina, kwetiapina) charakteryzują się wyższym powinowactwem do receptora 5-HT2A niż do D2. Zablokowanie 5-HT2A znosi hamowanie uwalniania dopaminy w prążkowiu (przez interneurony GABA), co powoduje lokalny wyrzut dopaminy konkurującej z lekiem o receptor D2. Chroni to pacjenta przed objawami pozapiramidowymi (EPS) pomimo terapeutycznej dawki leku.'
      },
      {
        title: 'Receptory 5-HT2C, 5-HT3 i 5-HT7 w psychofarmakologii',
        text: 'Blokada receptora 5-HT2C (np. przez mirtazapinę, olanzapinę czy agomelatynę) odhamowuje uwalnianie dopaminy i noradrenaliny w korze przedczołowej, co poprawia nastrój, lecz sprzyja przyrostowi masy ciała. Antagonizm 5-HT3 (wortioksetyna, mirtazapina) znosi nudności i poprawia przekaźnictwo acetylocholinowe, a antagonizm 5-HT7 reguluje rytmy okołodobowe i funkcje wykonawcze.'
      }
    ],
    table: {
      headers: ['Podtyp receptora', 'Mechanizm sygnałowy', 'Efekt stymulacji', 'Efekt blokady (antagonizmu)'],
      rows: [
        ['5-HT1A', 'Gi/o (spadek cAMP)', 'Przeciwlękowy, desensytyzacja w szwie', 'Brak autoregulacji uwalniania'],
        ['5-HT2A', 'Gq (wzrost IP3/DAG, Ca2+)', 'Halucynacje (agoniści 5-HT2A), hamowanie DA', 'Działanie przeciwpsychotyczne, redukcja EPS (SGA)'],
        ['5-HT2C', 'Gq (wzrost IP3/DAG)', 'Tłumienie apetytu, spadek DA/NA w PFC', 'Wzrost apetytu i wagi, wyrzut DA/NA w korze'],
        ['5-HT3', 'Kanał jonowy (napływ Na+/Ca2+)', 'Nudności, wymioty, spadek ACh', 'Działanie przeciwwymiotne, propoznawcze'],
        ['5-HT7', 'Gs (wzrost cAMP)', 'Regulacja rytmu dobowego, termoregulacja', 'Poprawa rytmu snu, działanie przeciwdepresyjne']
      ]
    },
    advanced:
      'Wortioksetyna jest przykładem multimodalnego leku przeciwdepresyjnego: hamuje SERT, działa jako agonista 5-HT1A, częściowy agonista 5-HT1B oraz antagonista 5-HT1D, 5-HT3 i 5-HT7. Złożona modulacja odhamowuje uwalnianie acetylocholiny, dopaminy i histaminy w hipokampie, wywierając bezpośredni korzystny wpływ na funkcje poznawcze w depresji.',
    summary:
      'Profil receptorowy 5-HT decyduje o tolerancji leków. Antagonizm 5-HT2A chroni przed EPS w lekach atypowych, blokada 5-HT2C zwiększa stężenie DA/NA w korze, a antagonizm 5-HT3 eliminuje nudności.',
    sourceIds: ['stahl-essential', 'pet-d2-kapur', 'canmat-mdd-2023'],
    questions: [
      q(
        'Dlaczego leki przeciwpsychotyczne II generacji (SGA) o silnym antagonizmie 5-HT2A wywołują znacznie mniej objawów pozapiramidowych (EPS) niż haloperydol?',
        ['Blokada receptorów 5-HT2A w prążkowiu odhamowuje uwalnianie dopaminy, która konkuruje z lekiem o receptory D2 w szlaku nigrostriatalnym', 'Chroni to układ pozapiramidowy przed nadmierną blokadą transmisyjną.'],
        ['Leki II generacji niszczą prążkowie, więc pacjent nie ma czym drżeć', 'Leki psychotropowe nie powodują destrukcji prążkowia.'],
        ['Antagonizm 5-HT2A całkowicie uniemożliwia wchłanianie leku do krwi', 'Leki SGA wchłaniają się prawidłowo z przewodu pokarmowego.'],
        'psych-5ht-q1'
      ),
      q(
        'Który podtyp receptora serotoninowego jest bezpośrednim kanałem jonowym bramkowanym ligandem (nie receptorem metabotropowym sprzężonym z białkiem G)?',
        ['Receptor 5-HT3', 'Jest to pentameryczny kanał kationowy; jego blokada wywiera silny efekt przeciwwymiotny i prokognitywny.'],
        ['Receptor 5-HT1A', '5-HT1A jest receptorem sprzężonym z białkiem Gi/o hamującym cyklazę adenylanową.'],
        ['Receptor 5-HT2A', '5-HT2A jest receptorem sprzężonym z białkiem Gq stymulującym fosfolipazę C.'],
        'psych-5ht-q2'
      ),
      q(
        'Jaki efekt kliniczny wywołuje silny antagonizm receptorów 5-HT2C (np. w działaniu mirtazapiny lub olanzapiny)?',
        ['Wzrost łaknienia, zwiększenie masy ciała oraz odhamowanie uwalniania DA i NA w korze przedczołowej', 'Receptor 5-HT2C fizjologicznie hamuje apetyt i wyrzut katecholamin korowych.'],
        ['Natychmiastowe zatrzymanie krążenia w mechanizmie asystolii', 'Blokada 5-HT2C nie wywołuje asystolii.'],
        ['Gwałtowny spadek masy ciała o 20 kg w ciągu tygodnia', 'Blokada 5-HT2C promuje tycie, a nie chudnięcie.'],
        'psych-5ht-q3'
      ),
      q(
        'Który lek przeciwdepresyjny łączy blokadę SERT z bezpośrednim antagonizmem receptorów 5-HT3 i 5-HT7 oraz agonizmem 5-HT1A (profil multimodalny)?',
        ['Wortioksetyna', 'Profil ten zapewnia poprawę funkcji poznawczych w depresji i niskie ryzyko dysfunkcji seksualnych.'],
        ['Doksepina', 'Doksepina jest trójpierścieniowym lekiem przeciwdepresyjnym o silnym działaniu antyhistaminowym.'],
        ['Maprotylina', 'Maprotylina jest czteropierścieniowym selektywnym inhibitorem NET.'],
        'psych-5ht-q4'
      ),
      q(
        'Gdzie zlokalizowane są somatodendrytyczne autoreceptory 5-HT1A wygaszające wyładowania neuronów serotoninowych?',
        ['W jądrach szwu pnia mózgu (raphe nuclei)', 'Ich desensytyzacja po 2–4 tygodniach ekspozycji na SSRI odblokowuje trwałe uwalnianie serotoniny w mózgowiu.'],
        ['W rogach tylnych rdzenia kręgowego', 'Rogi tylne przewodzą czucie somatyczne i ból.'],
        ['W opuszce węchowej', 'Opuszka węchowa odbiera bodźce zapachowe.'],
        'psych-5ht-q5'
      )
    ]
  },
  {
    id: 'glutaminian-gaba-neuroplastycznosc',
    moduleId: 'psych-farmakologia',
    title: 'Układy glutaminergiczny i GABA-ergiczny: kaskada neuroplastyczności',
    subtitle: 'Receptory NMDA, AMPA, GABAA oraz rola szlaku BDNF-TrkB w OUN',
    group: 'Receptorologia i układy przekaźnikowe',
    minutes: 18,
    goals: [
      'Zrozumiesz rolę równowagi między pobudzeniem (Glu) a hamowaniem (GABA) w OUN.',
      'Scharakteryzujesz mechanizm szybkiego działania przeciwdepresyjnego poprzez blokadę NMDA i wyrzut BDNF.',
      'Wyjaśnisz budowę receptora GABAA i allosteryczną modulację przez benzodiazepiny.'
    ],
    sections: [
      {
        title: 'Glutaminian i neurotoksyczność ekscytotoksyczna',
        text: 'Kwas glutaminowy jest głównym przekaźnikiem pobudzającym w OUN, działającym na receptory jonotropowe (AMPA, NMDA, kainowe) i metabotropowe (mGluR). Fizjologicznie aktywacja AMPA depolaryzuje błonę, usuwając jon magnezu (Mg2+) blokujący kanał receptora NMDA i umożliwiając napływ jonów Ca2+. Przewlekły stres i nadmiar glutaminianu prowadzą do ekscytotoksyczności, zaniku kolców dendrytycznych i atrofii hipokampa.'
      },
      {
        title: 'Ketamina i przełom w neurobiologii depresji',
        text: 'Ketamina (enancjomer S-ketamina / esketamina) podana w subanestetycznych dawkach paradoksalnie blokuje receptory NMDA na hamujących interneuronach GABA-ergicznych. Prowadzi to do rozhamowania neuronów piramidowych i gwałtownego wyrzutu glutaminianu, który stymuluje receptory AMPA. W kaskadzie wewnątrzkomórkowej aktywowany zostaje szlak mTORC1, co skutkuje masywną syntezą i uwalnianiem czynnika BDNF (Brain-Derived Neurotrophic Factor) oraz odbudową synaps w ciągu zaledwie kilku godzin.'
      },
      {
        title: 'Układ GABA i receptor GABAA',
        text: 'Kwas gamma-aminomasłowy (GABA) jest głównym neuroprzekaźnikiem hamującym. Receptor GABAA to pentameryczny kanał chlorkowy (najczęściej 2alfa, 2beta, 1gamma). Przyłączenie GABA otwiera kanał, powodując napływ jonów Cl- i hiperpolaryzację błony. Leki uspokajające i przeciwlękowe (benzodiazepiny) wiążą się allosterycznie na styku podjednostek alfa i gamma, zwiększając częstość otwarcia kanału w obecności GABA.'
      }
    ],
    table: {
      headers: ['Receptor / Układ', 'Mechanizm molekularny', 'Główny ligand / Lek', 'Znaczenie kliniczne'],
      rows: [
        ['NMDA (Glu)', 'Kanał kationowy (Ca2+, Na+) blokowany przez Mg2+', 'Ketamina, esketamina, memantyna', 'Szybka synaptogeneza, neuroplastyczność, pamięć LTP'],
        ['AMPA (Glu)', 'Szybki kanał sodowy (depolaryzacja błony)', 'Glutaminian, potentiatory AMPA', 'Inicjacja LTP, aktywacja wyrzutu BDNF'],
        ['GABAA', 'Kanał chlorkowy (hiperpolaryzacja Cl-)', 'GABA, benzodiazepiny, leki Z, barbiturany', 'Działanie przeciwlękowe, sedatywne, przeciwdrgawkowe'],
        ['Szlak BDNF / TrkB', 'Receptor kinazy tyrozynowej B', 'BDNF (aktywacja przez SSRI, ketaminę, ruch)', 'Neurogeneza w hipokampie, przeżycie neuronów']
      ]
    },
    advanced:
      'Mutacja w genie kodującym BDNF (polimorfizm Val66Met) upośledza zależne od aktywności uwalnianie BDNF z pęcherzyków presynaptycznych. Nosiciele allelu Met wykazują mniejszą objętość hipokampa, większą podatność na depresję wywołaną stresem oraz słabszą odpowiedź na klasyczne leki przeciwdepresyjne.',
    summary:
      'Równowaga Glu/GABA kontroluje pobudliwość kory. Ketamina poprzez przejściowy wyrzut glutaminianu i aktywację AMPA indukuje ekspresję BDNF i naprawę synaps w ciągu godzin, a receptory GABAA warunkują hamowanie lęku.',
    sourceIds: ['krystal-ketamine', 'stahl-essential', 'canmat-mdd-2023'],
    questions: [
      q(
        'Jaki jest mechanizm błyskawicznego (w ciągu kilku godzin) działania przeciwdepresyjnego subanestetycznych dawek ketaminy/esketaminy?',
        ['Blokada receptorów NMDA na interneuronach GABA-ergicznych, wyrzut glutaminianu, stymulacja receptorów AMPA i gwałtowna synteza BDNF przez szlak mTOR', 'Prowadzi to do odbudowy kolców dendrytycznych i połączeń synaptycznych w korze przedczołowej.'],
        ['Trwałe zablokowanie wszystkich receptorów serotoninowych w całym organizmie', 'Ketamina nie blokuje receptorów 5-HT w mechanizmie osiowym.'],
        ['Zahamowanie produkcji glukozy w hepatocytach', 'Metabolizm wątrobowy nie jest celem przeciwdepresyjnym ketaminy.'],
        'psych-glu-q1'
      ),
      q(
        'Który jon blokuje kanał receptora NMDA w warunkach spoczynkowego potencjału błonowego komórki nerwowej?',
        ['Jon magnezu (Mg2+)', 'Dopiero depolaryzacja błony wywołana przez receptory AMPA usuwa "korek magnezowy", umożliwiając napływ Ca2+.'],
        ['Jon żelaza (Fe3+)', 'Żelazo nie pełni funkcji bramkującej kanał NMDA.'],
        ['Jon miedzi (Cu2+)', 'Miedź nie jest fizjologicznym blokerem kanału NMDA.'],
        'psych-glu-q2'
      ),
      q(
        'W jaki sposób benzodiazepiny nasilają hamowanie neuronalne za pośrednictwem receptora GABAA?',
        ['Działają jako dodatni modulator allosteryczny (PAM), zwiększając częstotliwość otwarcia kanału chlorkowego pod wpływem GABA', 'Napływ jonów Cl- do wnętrza komórki wywołuje hiperpolaryzację błony i spadek jej pobudliwości.'],
        ['Zamykają kanały potasowe w komórkach glejowych', 'BZD nie modulują bezpośrednio kanałów potasowych gleju.'],
        ['Same wiążą się w miejscu wiązania glutaminianu i go niszczą', 'BZD wiążą się na styku podjednostek alfa/gamma receptora GABAA.'],
        'psych-glu-q3'
      ),
      q(
        'Jaki czynnik troficzny i jego receptor o kluczowym znaczeniu dla neurogenezy w zakręcie zębatym hipokampa ulegają nasilonej ekspresji podczas skutecznej terapii przeciwdepresyjnej?',
        ['BDNF (Brain-Derived Neurotrophic Factor) i receptor TrkB', 'Aktywacja kaskady BDNF-TrkB stymuluje przeżycie neuronów i tworzenie nowych kolców dendrytycznych.'],
        ['Insulina i receptor IGF-2', 'Chociaż insulina wpływa na metabolizm mózgu, to BDNF-TrkB jest osiowym szlakiem plastyczności w depresji.'],
        ['Trombopoetyna i receptor Mpl', 'Trombopoetyna reguluje wytwarzanie płytek krwi w szpiku kostnym.'],
        'psych-glu-q4'
      ),
      q(
        'Jaki jest skutek przewlekłej, nadmiernej aktywacji receptorów NMDA przez wysokie stężenia glutaminianu w warunkach niedokrwienia lub przewlekłego stresu?',
        ['Masywny, toksyczny napływ jonów Ca2+ prowadzący do aktywacji proteaz, wolnych rodników i śmierci komórki (ekscytotoksyczność)', 'Ekscytotoksyczność leży u podstaw zaniku struktur hipokampa w przewlekłej nieleczonej depresji.'],
        ['Wzmocnienie pamięci fotograficznej bez żadnych skutków ubocznych', 'Nadmiar glutaminianu niszczy neurony i upośledza pamięć.'],
        ['Przekształcenie neuronów w komórki nowotworowe glejaka', 'Ekscytotoksyczność prowadzi do apoptozy i nekrozy, a nie transformacji nowotworowej.'],
        'psych-glu-q5'
      )
    ]
  },
  {
    id: 'klasyczne-antydepresanty-ssri-snri-tlpd-maoi',
    moduleId: 'psych-farmakologia',
    title: 'Klasyczne leki przeciwdepresyjne: SSRI, SNRI, TLPD i iMAO',
    subtitle: 'Porównanie klas terapeutycznych, profile toksyczności i ryzyko kardiologiczne',
    group: 'Farmakoterapia zaburzeń afektywnych',
    minutes: 18,
    goals: [
      'Porównasz mechanizmy, skuteczność i tolerancję SSRI, SNRI, TLPD oraz inhibitorów MAO.',
      'Rozpoznasz specyficzne powikłania kardiologiczne i antycholinergiczne trójpierścieniowych leków (TLPD).',
      'Wdrożysz zasady diety ubogotyraminowej i bezpiecznego stosowania inhibitorów monoaminooksydazy.'
    ],
    sections: [
      {
        title: 'SSRI i SNRI jako fundament leczenia I rzutu',
        text: 'Inhibitory wychwytu zwrotnego serotoniny (SSRI: sertralina, escitalopram, citalopram, fluoksetyna, paroksetyna) oraz serotoniny i noradrenaliny (SNRI: wenlafaksyna, duloksetyna) są lekami I rzutu ze względu na wysoki wskaźnik bezpieczeństwa w przedawkowaniu i korzystny profil tolerancji. Działania niepożądane (nudności, dysfunkcje seksualne, bezsenność) wynikają głównie z pobudzenia obwodowych receptorów 5-HT2 i 5-HT3.'
      },
      {
        title: 'Trójpierścieniowe leki przeciwdepresyjne (TLPD): wysoka skuteczność, wąskie okno',
        text: 'TLPD (klomipramina, amitryptylina, nortryptylina) silnie blokują SERT i NET, lecz wykazują też silny antagonizm receptorów muskarynowych M1 (suchość w ustach, zaparcia, majaczenie), histaminowych H1 (sedacja, tycie) oraz adrenergicznych alfa-1 (hipotensja ortostatyczna). Ponadto blokują sercowe kanały sodowe (Nav1.5), co w przedawkowaniu prowadzi do poszerzenia QRS, komorowych zaburzeń rytmu i zgonu.'
      },
      {
        title: 'Inhibitory monoaminooksydazy (iMAO) i reakcja tyraminowa',
        text: 'iMAO nieodwracalne (np. fenelzyna, tranylcypromina) hamują enzym MAO-A i MAO-B, blokując rozkład monoamin. Spożycie pokarmów bogatych w tyraminę (dojrzałe sery, wino, wędzone ryby) wywołuje przełom nadciśnieniowy ("cheese effect"), gdyż niewybiórczo zablokowana MAO w jelitach i wątrobie nie neutralizuje tyraminy, co skutkuje masowym wyrzutem noradrenaliny. Odwracalny inhibitor MAO-A (moklobemid) jest pod tym względem znacznie bezpieczniejszy.'
      }
    ],
    table: {
      headers: ['Klasa leków', 'Mechanizm wiodący', 'Główne działania niepożądane', 'Toksyczność w przedawkowaniu'],
      rows: [
        ['SSRI', 'Selektywna blokada SERT', 'Nudności, dysfunkcje seksualne, lęk początkowy', 'Bardzo niska (bezpieczne)'],
        ['SNRI', 'Blokada SERT + NET', 'Nadciśnienie tętnicze, potliwość, tachykardia', 'Niska do umiarkowanej'],
        ['TLPD', 'Blokada SERT, NET, M1, H1, alfa-1', 'Zaparcia, sedacja, hipotensja, suchość śluzówek', 'Skrajnie wysoka (blokada Nav1.5 -> arytmie komorowe)'],
        ['iMAO klasyczne', 'Nieodwracalne hamowanie MAO-A i B', 'Przełom nadciśnieniowy (tyramina), bezsenność', 'Wysoka (stany zagrażające życiu)']
      ]
    },
    advanced:
      'W przypadku ciężkiego zatrucia TLPD z poszerzeniem zespołu QRS > 100–120 ms w EKG lekiem z wyboru znoszącym kardiotoksyczność jest dożylny wlew 8,4% wodorowęglanu sodu (NaHCO3). Alkalizacja osocza (pH 7,45–7,55) oraz wysokie stężenie sodu odwracają blokadę kanałów sodowych Nav1.5.',
    summary:
      'SSRI i SNRI wyparły TLPD z I rzutu z uwagi na bezpieczeństwo kardiologiczne. TLPD grożą śmiertelnymi arytmiami przez blokadę kanałów sodowych (odtrutka: NaHCO3), a klasyczne iMAO wymagają ścisłej diety ubogotyraminowej.',
    sourceIds: ['canmat-mdd-2023', 'nice-depression', 'tyramine-pressor'],
    questions: [
      q(
        'Jaka jest odtrutka z wyboru w ciężkim zatruciu TLPD z poszerzeniem zespołu QRS > 120 ms w zapisie EKG?',
        ['Dożylny roztwór wodorowęglanu sodu (NaHCO3)', 'Alkalizacja krwi i ładunek jonów sodu wypierają cząsteczki TLPD z sercowych kanałów sodowych Nav1.5.'],
        ['Dożylna digoksyna w bolusie', 'Digoksyna nasiliłaby kardiotoksyczność i ryzyko zgonu.'],
        ['Podanie dużej dawki potasu w szybkim wlewie', 'Szybki wlew potasu grozi natychmiastowym asystolią serca.'],
        'psych-clas-q1'
      ),
      q(
        'Dlaczego pacjenci przyjmujący nieodwracalne inhibitory MAO (np. tranylcyprominę) muszą bezwzględnie przestrzegać diety ubogiej w dojrzałe sery i wina?',
        ['Zawierają one tyraminę, która z powodu braku jelitowej MAO przedostaje się do krążenia i wywołuje zagrażający życiu przełom nadciśnieniowy', 'Zjawisko to określa się tradycyjnie mianem reakcji serowej (cheese reaction).'],
        ['Sery wchodzą w bezpośrednią reakcję chemiczną niszczącą nerki', 'Tyramina nie niszczy nerek bezpośrednio, lecz indukuje gwałtowny wyrzut noradrenaliny.'],
        ['Wino powoduje natychmiastowe unieczynnienie leku w żołądku', 'Chodzi o śmiertelną interakcję naczyniową, a nie brak wchłaniania leku.'],
        'psych-clas-q2'
      ),
      q(
        'Który z SSRI wykazuje najsilniejsze właściwości sedatywne i cholinolityczne wskutek powinowactwa do receptorów muskarynowych?',
        ['Paroksetyna', 'Paroksetyna posiada słabe działanie antycholinergiczne, co może sprzyjać sedacji, zaparciom i przyrostowi wagi.'],
        ['Escitalopram', 'Escitalopram jest niemal pozbawiony powinowactwa do receptorów muskarynowych.'],
        ['Sertralina', 'Sertralina wykazuje słabe hamowanie DAT, bez istotnego wpływu cholinolitycznego.'],
        'psych-clas-q3'
      ),
      q(
        'Jaki parametr hemodynamiczny wymaga regularnego monitorowania u pacjentów leczonych wysokimi dawkami SNRI (np. wenlafaksyną >= 225 mg/d)?',
        ['Ciśnienie tętnicze krwi i tętno', 'Wzrost stężenia noradrenaliny w synapsach obwodowych może prowadzić do utrwalonego nadciśnienia tętniczego.'],
        ['Pojemność życiowa płuc w spirometrii', 'SNRI nie wpływają negatywnie na parametry spirometryczne płuc.'],
        ['Czas krwawienia metodą Duke’a', 'Mimo wpływu 5-HT na płytki, to kontrola ciśnienia tętniczego jest kluczowa dla bezpieczeństwa kardiologicznego SNRI.'],
        'psych-clas-q4'
      ),
      q(
        'Który lek jest odwracalnym selektywnym inhibitorem monoaminooksydazy typu A (RIMA), niewymagającym tak rygorystycznej diety ubogotyraminowej?',
        ['Moklobemid', 'Moklobemid może zostać wyparty z enzymu przez wysokie stężenia tyraminy, co drastycznie obniża ryzyko przełomu.'],
        ['Klomipramina', 'Klomipramina jest trójpierścieniowym lekiem przeciwdepresyjnym.'],
        ['Fenelzyna', 'Fenelzyna jest klasycznym, nieodwracalnym i nieselektywnym inhibitorem MAO.'],
        'psych-clas-q5'
      )
    ]
  }
];
