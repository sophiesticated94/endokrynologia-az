import { type DraftLesson, q } from './course-types.ts';

export const draftPsychiatryPart3: DraftLesson[] = [
  {
    id: 'ssri-mechanizm-wybor',
    moduleId: 'psych-farmakologia',
    title: 'SSRI: powinowactwo do SERT, krzywa PET i profil cząsteczek',
    subtitle: 'Wysycenie 80% SERT, różnice farmakodynamiczne i dobór leku',
    group: 'Leki przeciwdepresyjne i stabilizatory',
    minutes: 16,
    goals: [
      'Wyjaśnisz zależność między dawką SSRI a stopniem wysycenia transportera SERT w badaniach PET.',
      'Scharakteryzujesz unikalne cechy farmakodynamiczne sertraliny, escitalopramu i fluoksetyny.',
    ],
    sections: [
      {
        title: 'Krzywa wysycenia SERT w badaniach PET (Meyer et al.)',
        text: 'Badania pozytonowej tomografii emisyjnej (PET) z użyciem znaczników radiologicznych (np. [11C]DASB) wykazały, że kliniczny efekt przeciwdepresyjny SSRI wymaga zablokowania co najmniej 70–80% transporterów serotoniny (SERT) w prążkowiu i korze. Krzywa zależności wysycenia SERT od dawki ma charakter hiperboliczny: minimalna dawka terapeutyczna (np. 20 mg citalopramu, 10 mg escitalopramu, 50 mg sertraliny) osiąga już ~80% blokady SERT. Dalsze podwajanie dawki zwiększa wysycenie zaledwie o kilka procent (do 85%), ale może istotnie nasilać działania niepożądane.',
      },
      {
        title: 'Profil poszczególnych cząsteczek SSRI',
        text: 'Mimo wspólnej klasy cząsteczki SSRI różnią się profilami receptorowymi: 1) Escitalopram jest najbardziej selektywnym inhibitorem SERT o działaniu allosterycznym, 2) Sertralina posiada dodatkowe słabe działanie hamujące wychwyt zwrotny dopaminy (DAT) oraz powinowactwo do receptora sigma-1, co sprzyja aktywacji napędu i redukcji anhedonii, 3) Fluoksetyna blokuje receptory 5-HT2C (co może działać odhamowująco na noradrenalinę i dopaminę w korze przedczołowej, zmniejszając apetyt), a jej aktywny metabolit (norfluoksetyna) ma okres półtrwania t1/2 sięgający 7–15 dni.',
      },
      {
        title: 'Działania niepożądane i bezpieczeństwo',
        text: 'Główne działania niepożądane wynikają ze stymulacji receptorów serotoninowych w innych tkankach: 5-HT3 w przewodzie pokarmowym (nudności, biegunki we wczesnej fazie), 5-HT2A w OUN i rdzeniu (dysfunkcje seksualne: opóźniony wytrysk, anorgazmia u 40-70% pacjentów; zaburzenia snu). Dodatkowo SSRI hamują wychwyt serotoniny do płytek krwi, zwiększając ryzyko krwawień z górnego odcinka przewodu pokarmowego (szczególnie przy łączeniu z NLPZ).',
      },
    ],
    table: {
      headers: ['Cząsteczka', 'Główny profil dodatkowy', 'Okres półtrwania (t1/2)', 'Zastosowanie preferowane'],
      rows: [
        ['Escitalopram', 'Czysty SERT (modulacja allosteryczna)', 'Około 30 godzin', 'Lęk napadowy, uogólniony, depresja u osób starszych (mało interakcji)'],
        ['Sertralina', 'Słaby inhibitor DAT + sigma-1', 'Około 26 godzin', 'Depresja ze spowolnieniem, po zawale serca (bezpieczna kardiologicznie)'],
        ['Fluoksetyna', 'Antagonista 5-HT2C (aktywujący)', '2-4 dni (metabolit: 7-15 dni)', 'Depresja z atypową apatią, bulimia, niska adherencja (brak nagłego odstawienia)'],
        ['Paroksetyna', 'Działanie cholinolityczne (M1) i hamowanie NOS', 'Około 21 godzin', 'Ciężki lęk, ale wysokie ryzyko sedacji, tycia, dysfunkcji seksualnych i objawów odstawiennych'],
      ],
    },
    advanced:
      'W przypadku zaburzeń obsesyjno-kompulsyjnych (OCD) zaleca się dawki SSRI istotnie wyższe niż w klasycznej depresji (np. sertralina do 200 mg/d, escitalopram do 20–30 mg/d, fluoksetyna do 60–80 mg/d). W badaniach PET w OCD wykazano, że wyższe dawki są konieczne do osiągnięcia maksymalnego wysycenia transporterów w specyficznych pętlach korowo-prążkowiowo-wzgórzowo-korowych (CSTC).',
    summary:
      'Efekt przeciwdepresyjny SSRI wymaga ~80% wysycenia SERT w PET, co osiąga się już przy standardowych dawkach. Sertralina moduluje DAT, fluoksetyna 5-HT2C, a escitalopram jest najczystszym inhibitorem SERT.',
    sourceIds: ['pet-sert-meyer', 'maudsley15', 'canmat-mdd-2023', 'stahl-essential'],
    questions: [
      q(
        'Jaki odsetek zablokowania transporterów serotoniny (SERT) w badaniach PET odpowiada standardowemu progowi odpowiedzi terapeutycznej?',
        ['Około 70–80%', 'Klasyczne badania Meyera i wsp. wykazały, że terapeutyczny efekt przeciwdepresyjny pojawia się przy wysyceniu SERT >= 70-80%.'],
        ['Dokładnie 10%', '10% wysycenia nie daje istotnego klinicznie efektu przeciwdepresyjnego.'],
        ['Zawsze bezwzględne 100%', '100% zablokowanie nie jest osiągalne przy dawkach klinicznych i groziłoby ciężką toksycznością.'],
        'psych-ssri-q1'
      ),
      q(
        'Który lek z grupy SSRI posiada dodatkowe, unikalne działanie hamujące wychwyt zwrotny dopaminy (DAT)?',
        ['Sertralina', 'Sertralina wykazuje słabe powinowactwo do DAT, co przyczynia się do poprawy motywacji i napędu.'],
        ['Escitalopram', 'Escitalopram jest wysoce selektywny dla SERT bez wpływu na DAT.'],
        ['Paroksetyna', 'Paroksetyna ma komponentę cholinolityczną, a nie dopaminergiczną.'],
        'psych-ssri-q2'
      ),
      q(
        'Dlaczego po nagłym przerwaniu fluoksetyny objawy odstawienne (discontinuation syndrome) pojawiają się rzadko lub bardzo późno?',
        ['Jej aktywny metabolit (norfluoksetyna) ma bardzo długi okres półtrwania wynoszący 7–15 dni', 'Norfluoksetyna działa jak "wbudowany w organizm" automatyczny powolny taper leku.'],
        ['Fluoksetyna nie wchłania się do tkanek organizmu', 'Lek wchłania się prawidłowo i osiąga wysokie stężenia w OUN.'],
        ['Fluoksetyna natychmiast zamienia się w dopaminę', 'Fluoksetyna nie jest prekursorem dopaminy.'],
        'psych-ssri-q3'
      ),
      q(
        'Który lek z grupy SSRI jest uznawany za najbezpieczniejszy u pacjentów kardiologicznych (np. po zawale mięśnia sercowego)?',
        ['Sertralina', 'Badanie SADHART potwierdziło wysoki profil bezpieczeństwa sertraliny u pacjentów po ostrych zespołach wieńcowych.'],
        ['Citalopram w dawce 80 mg/dobę', 'Wysokie dawki citalopramu są przeciwwskazane z powodu wydłużenia odstępu QTc.'],
        ['Doksepina w dawce toksycznej', 'Doksepina to kardiotoksyczny TLPD, a nie SSRI.'],
        'psych-ssri-q4'
      ),
      q(
        'Który podtyp receptora serotoninowego odpowiada za występowanie anorgazmii i opóźnionego wytrysku podczas leczenia SSRI?',
        ['Receptor 5-HT2A', 'Pobudzenie receptora 5-HT2A w OUN i szlakach rdzeniowych hamuje funkcje seksualne i orgazm.'],
        ['Receptor 5-HT4', '5-HT4 zlokalizowany jest głównie w przewodzie pokarmowym i wpływa na perystaltykę.'],
        ['Receptor insulinowy beta', 'Receptor insuliny nie uczestniczy w bezpośredniej neurotransmisji serotoninowej.'],
        'psych-ssri-q5'
      ),
    ],
  },
  {
    id: 'snri-tlpd',
    moduleId: 'psych-farmakologia',
    title: 'SNRI i TLPD: podwójny wychwyt i ryzyko kardiotoksyczności',
    subtitle: 'Wenlafaksyna, duloksetyna i przedawkowanie trójpierścieniowych leków przeciwdepresyjnych',
    group: 'Leki przeciwdepresyjne i stabilizatory',
    minutes: 16,
    goals: [
      'Wyjaśnisz zależność profilu receptorowego wenlafaksyny od zastosowanej dawki (zależność SERT/NET).',
      'Rozpoznasz objawy kardiotoksyczności i blokady kanałów sodowych Nav1.5 po przedawkowaniu TLPD.',
    ],
    sections: [
      {
        title: 'Wenlafaksyna i duloksetyna: farmakodynamika SNRI',
        text: 'Inhibitory wychwytu zwrotnego serotoniny i noradrenaliny (SNRI) różnią się kinetyką blokady transporterów: 1) Wenlafaksyna w małych dawkach (<= 75 mg/d) działa praktycznie jak czysty SSRI (hamuje niemal wyłącznie SERT). Dopiero przy dawkach >= 150 mg/d pojawia się istotna blokada transportera noradrenaliny (NET), a przy dawkach >= 300 mg/d słaby wpływ na DAT. Może powodować zależny od dawki wzrost ciśnienia tętniczego krwi. 2) Duloksetyna wykazuje zrównoważone hamowanie SERT i NET w całym zakresie dawek (od 30-60 mg/d) i posiada udowodnioną skuteczność w przewlekłym bólu neuropatycznym.',
      },
      {
        title: 'Trójpierścieniowe leki przeciwdepresyjne (TLPD)',
        text: 'TLPD (amitryptylina, klomipramina, nortryptylina) to leki o silnym działaniu przeciwdepresyjnym (blokada SERT i NET), ale obciążone licznymi działaniami niepożądanymi wynikającymi z nieselektywnego blokowania innych receptorów: blokada M1 (suchość w ustach, zaparcia, zaburzenia akomodacji, retencja moczu, majaczenie u starszych), blokada H1 (sedacja, przyrost masy ciała) oraz blokada alfa-1 (hipotonia ortostatyczna i odruchowa tachykardia).',
      },
      {
        title: 'Kardiotoksyczność TLPD w przedawkowaniu',
        text: 'Przedawkowanie TLPD jest stanem bezpośredniego zagrożenia życia. Wynika z blokady szybkich kanałów sodowych (Nav1.5) w mięśniu sercowym. W zapisie EKG obserwuje się: poszerzenie zespołu QRS > 100 ms (wzrost ryzyka drgawek) oraz QRS > 160 ms (wysokie ryzyko groźnych komorowych zaburzeń rytmu – VT/VF), prawogram i wysoki załamek R w odprowadzeniu aVR. Odtrutką z wyboru jest dożylny wodorowęglan sodu (1-2 mEq/kg m.c. w bolusie, dążąc do pH krwi 7,45–7,55), który zwiększa zewnątrzkomórkowe stężenie Na+ i alkalizuje osocze, odrywając lek od kanału.',
      },
    ],
    table: {
      headers: ['Grupa / Lek', 'Profil wychwytu zwrotnego', 'Główne receptory blokowane', 'Ryzyko w przedawkowaniu'],
      rows: [
        ['Wenlafaksyna (SNRI)', 'Dawkozależny: <=75mg SERT, >=150mg SERT+NET', 'Brak istotnego M1, H1, alfa-1', 'Umiarkowane (drgawki, tachykardia, zespół serotoninowy)'],
        ['Duloksetyna (SNRI)', 'Zrównoważony SERT + NET od 30-60 mg', 'Brak istotnego M1, H1', 'Umiarkowane (nudności, hepatotoksyczność przy nadużywaniu alkoholu)'],
        ['Amitryptylina (TLPD)', 'Nieselektywny SERT + NET', 'Silna blokada M1, H1, alfa-1, Nav1.5', 'Bardzo wysokie (poszerzenie QRS, zgon z arytmii komorowej)'],
        ['Klomipramina (TLPD)', 'Bardzo silny SERT > NET', 'Silna blokada M1, H1, alfa-1, Nav1.5', 'Bardzo wysokie (obniżenie progu drgawkowego, arytmie komorowe)'],
      ],
    },
    advanced:
      'Wodorowęglan sodu podany w zatruciu TLPD działa dwutorowo: 1) Alkalizacja krwi (podwyższenie pH) zmienia stopień jonizacji cząsteczki TLPD, zmniejszając frakcję leku związaną z kanałem sodowym serca, 2) Zwiększenie stężenia jonów sodu (ładunek Na+) w przestrzeni zewnątrzkomórkowej przezwycięża kompetycyjną blokadę kanału Nav1.5.',
    summary:
      'Wenlafaksyna włącza komponent noradrenalinowy od 150 mg/d. TLPD silnie blokują receptory M1, H1 i alfa-1, a ich przedawkowanie blokuje kanały Nav1.5 (poszerzenie QRS w EKG), co wymaga natychmiastowego podania wodorowęglanu sodu.',
    sourceIds: ['maudsley15', 'stahl-essential', 'canmat-mdd-2023'],
    questions: [
      q(
        'Od jakiej dawki dobowej wenlafaksyna zaczyna w istotnym stopniu blokować transporter noradrenaliny (NET)?',
        ['Od około 150 mg/dobę', 'W dawkach <=75 mg wenlafaksyna zachowuje się jak SSRI; komponent NET włącza się od 150 mg/d.'],
        ['Już od dawki 12,5 mg/dobę', 'To dawka subkliniczna, bez wpływu na NET.'],
        ['Dopiero od 1200 mg/dobę', 'Taka dawka jest toksyczna i przekracza zakres terapeutyczny.'],
        'psych-snri-q1'
      ),
      q(
        'Jaka zmiana w EKG jest kluczowym zwiastunem zagrożenia życia w zatruciu trójpierścieniowymi lekami przeciwdepresyjnymi (TLPD)?',
        ['Poszerzenie zespołu QRS powyżej 100-160 ms wskutek blokady kanałów sodowych Nav1.5', 'Poszerzenie QRS > 160 ms wiąże się z 50% ryzykiem złośliwych komorowych zaburzeń rytmu.'],
        ['Zwężenie zespołu QRS do 20 ms', 'QRS nie ulega patologicznemu zwężeniu w zatruciach lekowych.'],
        ['Całkowite zniknięcie załamka P bez innych zmian', 'Izolowany brak załamka P nie jest specyficznym objawem blokady sodowej przez TLPD.'],
        'psych-snri-q2'
      ),
      q(
        'Co jest lekiem z wyboru w leczeniu kardiotoksyczności i poszerzenia QRS w ostrym przedawkowaniu TLPD?',
        ['Dożylny wodorowęglan sodu (NaHCO3)', 'Wodorowęglan sodu dostarcza Na+ i alkalizuje krew, odblokowując kanały sodowe serca.'],
        ['Dożylny chlorek potasu w szybkim wlewie', 'Potas mógłby nasilić zaburzenia przewodnictwa i wywołać asystolię.'],
        ['Podanie doustne soku grejpfrutowego', 'Sok grejpfrutowy hamuje CYP3A4 i nie jest lekiem ratunkowym.'],
        'psych-snri-q3'
      ),
      q(
        'Który lek z grupy SNRI posiada rejestrację i udowodnioną skuteczność w leczeniu bólu w polineuropatii cukrzycowej?',
        ['Duloksetyna', 'Duloksetyna posiada solidne dowody EBM w redukcji bólu neuropatycznego i fibromialgii.'],
        ['Fluoksetyna', 'Fluoksetyna nie jest lekiem pierwszego rzutu w obwodowym bólu neuropatycznym.'],
        ['Rezerpina', 'Rezerpina wyczerpuje pęcherzyki monoaminowe i nasila depresję. Nie stosuje się jej w neuropatii.'],
        'psych-snri-q4'
      ),
      q(
        'Który objaw uboczny TLPD wynika z ich silnego działania cholinolitycznego (antagonizm receptora M1)?',
        ['Suchość błon śluzowych jamy ustnej, zaparcia i zaburzenia akomodacji', 'Blokada receptorów muskarynowych prowadzi do klasycznych objawów atropinopodobnych.'],
        ['Nadmierne ślinienie się i skurcz oskrzeli', 'To objawy cholinomimetyczne, przeciwne do działania TLPD.'],
        ['Wybitna hiponatremia z obrzękiem mózgu', 'Hiponatremia w SIADH bywa obserwowana po SSRI, nie jest cechą M1.'],
        'psych-snri-q5'
      ),
    ],
  },
  {
    id: 'leki-atypowe-antydepresyjne',
    moduleId: 'psych-farmakologia',
    title: 'Atypowe leki przeciwdepresyjne: bupropion, mirtazapina i wortioksetyna',
    subtitle: 'Mechanizmy non-SSRI: NDRI, NaSSA, SARI i receptory multimodalne',
    group: 'Leki przeciwdepresyjne i stabilizatory',
    minutes: 15,
    goals: [
      'Scharakteryzujesz mechanizm działania i wskazania dla bupropionu (NDRI) oraz mirtazapiny (NaSSA).',
      'Dobierzesz lek przeciwdepresyjny u pacjenta z obawą o masę ciała lub dysfunkcje seksualne.',
    ],
    sections: [
      {
        title: 'Bupropion: selektywny inhibitor wychwytu DA i NA (NDRI)',
        text: 'Bupropion blokuje transportery dopaminy (DAT) i noradrenaliny (NET) bez jakiegokolwiek wpływu na układ serotoninergiczny. Dzięki temu nie wywołuje dysfunkcji seksualnych (może wręcz poprawiać libido) ani przyrostu masy ciała (promuje spadek wagi). Jest lekiem pierwszego wyboru w depresji z dominującą anhedonią, apatią, przewlekłym zmęczeniem oraz w zespole uzależnienia od nikotyny. Bezwzględnym przeciwwskazaniem jest padaczka w wywiadzie oraz zaburzenia odżywiania (jadłowstręt/bulimia) z uwagi na obniżenie progu drgawkowego.',
      },
      {
        title: 'Mirtazapina: noradrenergiczny i swoiście serotoninergiczny (NaSSA)',
        text: 'Mirtazapina nie blokuje transporterów wychwytu zwrotnego. Działa poprzez: 1) Blokadę presynaptycznych autoreceptorów i heteroreceptorów alfa-2 adrenergicznych, co odhamowuje wydzielanie NA i 5-HT, 2) Blokadę receptorów 5-HT2A, 5-HT2C i 5-HT3, kierując uwalnianą serotoninę swoiście na prokognitywne receptory 5-HT1A, 3) Bardzo silną blokadę receptorów histaminowych H1, co wywołuje silny efekt sedatywny, ułatwia zasypianie i stymuluje apetyt (przyrost masy ciała).',
      },
      {
        title: 'Wortioksetyna i trazodon',
        text: 'Wortioksetyna to lek multimodalny: hamuje SERT, działa jako agonista 5-HT1A, częściowy agonista 5-HT1B oraz antagonista 5-HT3, 5-HT1D i 5-HT7. Dzięki modulacji receptorowej zwiększa uwalnianie acetylocholiny, dopaminy i histaminy w korze czołowej, poprawiając funkcje poznawcze w depresji. Trazodon (SARI) w małych dawkach (25–100 mg) działa jako silny antagonista 5-HT2A, H1 i alfa-1, służąc jako nienaruszający architektury snu lek nasenny; w wyższych dawkach (>150–300 mg) blokuje SERT, wykazując działanie przeciwdepresyjne.',
      },
    ],
    table: {
      headers: ['Lek', 'Mechanizm główny', 'Wpływ na masę ciała', 'Wpływ na sferę seksualną'],
      rows: [
        ['Bupropion', 'NDRI (DAT + NET)', 'Spadek masy ciała / neutralny', 'Brak dysfunkcji (możliwa poprawa popędu)'],
        ['Mirtazapina', 'NaSSA (alfa-2 + 5-HT2/3 + H1)', 'Wzrost masy ciała (zwiększone łaknienie)', 'Neutralny / minimalny'],
        ['Wortioksetyna', 'Multimodalny (SERT + receptory 5-HT)', 'Neutralny', 'Niskie ryzyko dysfunkcji (< typowe SSRI)'],
        ['Trazodon', 'SARI (5-HT2A + H1 + SERT w wysokiej dawce)', 'Neutralny', 'Rzadko priapizm (alarm urologiczny)'],
      ],
    },
    advanced:
      'Priapizm (długotrwały, bolesny wzwód prącia bez pobudzenia seksualnego) to rzadkie, lecz groźne powikłanie trazodonu wynikające z obwodowej blokady receptorów alfa-1 adrenergicznych w ciałach jamistych. Wymaga pilnej interwencji urologicznej (punkcja, leki alfa-adrenergiczne) w celu uniknięcia trwałej martwicy i impotencji.',
    summary:
      'Bupropion (NDRI) nie zaburza funkcji seksualnych i zmniejsza wagę, ale obniża próg drgawkowy. Mirtazapina (NaSSA) poprawia sen i apetyt przez blokadę alfa-2 i H1. Wortioksetyna poprawia funkcje poznawcze.',
    sourceIds: ['maudsley15', 'canmat-mdd-2023', 'stahl-essential'],
    questions: [
      q(
        'Który lek przeciwdepresyjny jest zalecany u pacjenta, dla którego kluczowe jest uniknięcie dysfunkcji seksualnych i przyrostu masy ciała?',
        ['Bupropion', 'Bupropion nie wpływa na układ serotoninowy i nie powoduje typowych dla SSRI dysfunkcji seksualnych ani tycia.'],
        ['Paroksetyna', 'Paroksetyna niesie jedno z najwyższych ryzyk dysfunkcji seksualnych i przyrostu wagi.'],
        ['Mirtazapina', 'Mirtazapina silnie stymuluje łaknienie i prowadzi do przyrostu masy ciała.'],
        'psych-atypowe-q1'
      ),
      q(
        'Co stanowi bezwzględne przeciwwskazanie do zastosowania bupropionu?',
        ['Padaczka w wywiadzie lub aktywne zaburzenia odżywiania (bulimia/anoreksja)', 'Bupropion zależnie od dawki obniża próg drgawkowy; w bulimii ryzyko napadów drgawkowych jest szczególnie wysokie.'],
        ['Nadmierna masa ciała (BMI > 35)', 'Otyłość nie jest przeciwwskazaniem; bupropion bywa składnikiem leków odchudzających.'],
        ['Współistniejące uzależnienie od nikotyny', 'Bupropion jest zarejestrowany w leczeniu uzależnienia od tytoniu.'],
        'psych-atypowe-q2'
      ),
      q(
        'Poprzez blokadę którego receptora mirtazapina wywołuje szybki efekt uspokajający i ułatwiający zasypianie?',
        ['Receptora histaminowego H1', 'Silny antagonizm H1 odpowiada za sedację i senność po mirtazapinie.'],
        ['Receptora beta-1 adrenergicznego', 'Mirtazapina nie blokuje receptorów beta-adrenergicznych.'],
        ['Receptora dopaminowego D2 w przysadce', 'Mirtazapina nie wykazuje istotnego powinowactwa do D2 i nie wywołuje hiperprolaktynemii.'],
        'psych-atypowe-q3'
      ),
      q(
        'Jakie rzadkie, ale pilne powikłanie urologiczne może wystąpić u mężczyzn podczas stosowania trazodonu?',
        ['Priapizm (przetrwały, bolesny wzwód prącia)', 'Blokada receptorów alfa-1 w naczyniach ciał jamistych może doprowadzić do priapizmu wymagającego pilnej pomocy.'],
        ['Ostre zapalenie gruczołu krokowego', 'Trazodon nie wywołuje infekcyjnego zapalenia prostaty.'],
        ['Całkowita atrofia jąder w ciągu 24 godzin', 'Trazodon nie wpływa destrukcyjnie na tkankę gonadalną w ten sposób.'],
        'psych-atypowe-q4'
      ),
      q(
        'W jaki sposób wortioksetyna wywiera korzystny wpływ na funkcje poznawcze w depresji?',
        ['Dzięki multimodalnemu profilowi receptorowemu (antagonizm 5-HT3/7 i modulacja 5-HT1A) nasila uwalnianie acetylocholiny i histaminy w korze', 'Modulacja heteroreceptorów odhamowuje uwalnianie neuroprzekaźników pro-kognitywnych w korze przedczołowej.'],
        ['Działa jak czysty kwas solny rozpuszczający amyloid', 'Wortioksetyna nie niszczy chemicznie tkanek.'],
        ['Blokuje wszystkie neurony w płacie czołowym', 'Wortioksetyna optymalizuje neurotransmisję, nie wyłącza kory.'],
        'psych-atypowe-q5'
      ),
    ],
  },
  {
    id: 'stabilizatory-lit',
    moduleId: 'psych-farmakologia',
    title: 'Lit: złoty standard stabilizacji nastroju i TDM',
    subtitle: 'Mechanizmy neuroprotekcji, stężenia terapeutyczne i toksyczność',
    group: 'Leki przeciwdepresyjne i stabilizatory',
    minutes: 17,
    goals: [
      'Scharakteryzujesz wewnątrzkomórkowe mechanizmy działania jonów litu (GSK-3beta, szlak inozytolu).',
      'Zinterpretujesz stężenia litu we krwi w profilaktyce i manii oraz wskażesz narządy wymagające monitorowania.',
    ],
    sections: [
      {
        title: 'Mechanizm biologiczny: enzymy zależne od magnezu',
        text: 'Jon litu (Li+) jest małym kationem jednowartościowym, który konkuruje z magnezem (Mg2+) o centra katalityczne kluczowych enzymów wewnątrzkomórkowych. Do jego głównych celów molekularnych należą: 1) Syntaza kinazy glikogenu 3-beta (GSK-3beta) – lit hamuje ten enzym, co zapobiega fosforylacji białka tau, chroni przed apoptozą i nasila ekspresję beta-kateniny oraz czynników neurotroficznych (BDNF, Bcl-2), 2) Monofosfataza inozytolu (IMPaza) – lit hamuje obrót fosfoinozytydów, zmniejszając nadmierną pobudliwość kory mózgowej w stanach manii.',
      },
      {
        title: 'Okna terapeutyczne wg AGNP 2026 i Maudsley 15th ed.',
        text: 'Lit charakteryzuje się bardzo wąskim indeksem terapeutycznym. Krew na badanie pobiera się rano, dokładnie 12 godzin po ostatniej dawce wieczornej (stężenie 12h-trough) w stanie stacjonarnym (po 4–7 dniach): 1) Leczenie podtrzymujące i profilaktyka ChAD: 0,6–0,8 mmol/l (u osób starszych 0,4–0,6 mmol/l), 2) Leczenie ostrego epizodu manii: 0,8–1,0 mmol/l, 3) Toksyczność: stężenia > 1,2 mmol/l wywołują objawy zatrucia (grubofaliste drżenie rąk, nudności, biegunka, ataksja, dyzartria), a stężenia > 2,0 mmol/l grożą drgawkami, śpiączką i nieodwracalnym uszkodzeniem OUN (wskazanie do pilnej hemodializy).',
      },
      {
        title: 'Monitorowanie narządowe: nerki, tarczyca i serce',
        text: 'Lit jest wydalany w 95% w stanie niezmienionym przez nerki w kanalikach bliższych (konkuruje z sodem). Odwodnienie, dieta ubogosodowa, leki z grupy NLPZ, inhibitory ACE lub sartany oraz diuretyki tiazydowe zmniejszają klirens nerkowy litu i gwałtownie prowadzą do zatrucia. Przed włączeniem i w trakcie leczenia (co 3-6 miesięcy) obowiązkowo monitoruje się: eGFR, kreatyninę, TSH (ryzyko wola i niedoczynności tarczycy u 10-20% chorych) oraz wapń/PTH (ryzyko hiperkalcemii i nadczynności przytarczyc).',
      },
    ],
    table: {
      headers: ['Stężenie Li+ (12h trough)', 'Stan kliniczny', 'Postępowanie'],
      rows: [
        ['< 0,6 mmol/l', 'Stężenie subterapeutyczne (wyjątek: osoby w podeszłym wieku)', 'Ryzyko nawrotu manii/depresji; rozważenie korekty dawki'],
        ['0,6 – 0,8 mmol/l', 'Optymalne okno podtrzymujące w ChAD', 'Standardowa profilaktyka; doskonałe działanie antysuicydalne'],
        ['0,8 – 1,0 mmol/l', 'Docelowe w ostrym epizodzie manii', 'Ścisła kontrola tolerancji i parametrów nerkowych'],
        ['1,2 – 2,0 mmol/l', 'Toksyczność łagodna do umiarkowanej', 'Pilne wstrzymanie leku, nawodnienie 0,9% NaCl, kontrola stężeń'],
        ['> 2,0 mmol/l', 'Ciężkie zatrucie zagrażające życiu', 'Wskazanie do pilnej hospitalizacji na OIT i hemodializy'],
      ],
    },
    advanced:
      'Lit jest jedynym stabilizatorem o niepodważalnie udowodnionym efekcie redukcji wskaźnika samobójstw w ChAD i nawracającej depresji (redukcja ryzyka zgonu samobójczego o ponad 60-70% w metaanalizach Ciprianiego). Efekt ten jest niezależny od zapobiegania nawrotom samych faz afektywnych i wiąże się ze zmniejszeniem poziomu impulsywnej agresji.',
    summary:
      'Lit działa neuroprotekcyjnie przez hamowanie GSK-3beta i IMPazy. Wymaga monitorowania stężeń 12h po dawce (0,6–0,8 mmol/l w profilaktyce). Odwodnienie i NLPZ nasilają retencję litu i grożą zatruciem.',
    sourceIds: ['agnp-tdm-2026', 'maudsley15', 'canmat-isbd-bipolar'],
    questions: [
      q(
        'Jaki jest docelowy przedział stężenia litu w surowicy (12h po dawce) w leczeniu podtrzymującym ChAD wg AGNP 2026 i Maudsley?',
        ['0,6 – 0,8 mmol/l', 'To kanoniczny, zwalidowany przedział stężenia stacjonarnego zapewniający skuteczność i minimalizujący toksyczność.'],
        ['0,05 – 0,1 mmol/l', 'To stężenie subterapeutyczne, nie chroniące przed nawrotem fazy.'],
        ['2,5 – 4,0 mmol/l', 'To zakres ciężkiego, śmiertelnego zatrucia litem.'],
        'psych-lit-q1'
      ),
      q(
        'Który enzym wewnątrzkomórkowy jest bezpośrednio hamowany przez lit, co prowadzi do neuroprotekcji i nasilenia BDNF?',
        ['Syntaza kinazy glikogenu 3-beta (GSK-3beta)', 'Hamowanie GSK-3beta przez lit aktywuje czynniki pro-przeżyciowe i stabilizuje synapsy.'],
        ['Aromataza CYP19A1 w jajniku', 'Aromataza przekształca androgeny w estrogeny; nie jest celem litu.'],
        ['Lipaza lipoproteinowa w naczyniach włosowatych', 'LPL uczestniczy w metabolizmie chylomikronów.'],
        'psych-lit-q2'
      ),
      q(
        'Która grupa leków przeciwbólowych powszechnie dostępnych bez recepty może gwałtownie zwiększyć stężenie litu we krwi i wywołać zatrucie?',
        ['Niesteroidowe leki przeciwzapalne (NLPZ, np. ibuprofen, ketoprofen)', 'NLPZ hamują syntezę prostaglandyn w nerkach, zmniejszają filtrację kłębuszkową i redukują wydalanie litu.'],
        ['Paracetamol w dawkach terapeutycznych', 'Paracetamol nie wpływa istotnie na nerkowy klirens litu.'],
        ['Preparaty magnezu doustnego', 'Magnez nie hamuje filtracji kłębuszkowej litu.'],
        'psych-lit-q3'
      ),
      q(
        'Jakie narządy wymagają bezwzględnego, rutynowego monitorowania laboratoryjnego podczas przewlekłej terapii litem?',
        ['Nerki (eGFR, kreatynina) oraz tarczyca (TSH)', 'Lit może powodować nefropatię cewkowo-śródmiąższową, moczówkę nerkopochodną oraz niedoczynność tarczycy.'],
        ['Śledziona i migdałki podniebienne', 'Lit nie wykazuje specyficznej toksyczności dla śledziony i migdałków.'],
        ['Pęcherzyk żółciowy i trzustka co 7 dni', 'Nie ma wskazań do cotygodniowego badania pęcherzyka żółciowego.'],
        'psych-lit-q4'
      ),
      q(
        'Który objaw neurologiczny jest klasycznym, wczesnym sygnałem rozwijającego się zatrucia litem?',
        ['Grubofaliste, nasilone drżenie rąk i ataksja', 'Nasilenie drżenia z drobno- na grubofaliste oraz chwiejność chodu to alarm toksyczności OUN.'],
        ['Całkowita utrata słuchu po 1 sekundzie', 'Głuchota nie jest wczesnym objawem zatrucia litem.'],
        ['Jednostronne opadanie powieki (zespół Hornera)', 'Zespół Hornera wynika z przerwania unerwienia współczulnego oka.'],
        'psych-lit-q5'
      ),
    ],
  },
  {
    id: 'stabilizatory-przeciwpadaczkowe',
    moduleId: 'psych-farmakologia',
    title: 'Stabilizatory przeciwpadaczkowe: kwas walproinowy i lamotrygina',
    subtitle: 'Mechanizmy jonowe, teratogenność VPA i powolne miareczkowanie lamotryginy',
    group: 'Leki przeciwdepresyjne i stabilizatory',
    minutes: 16,
    goals: [
      'Scharakteryzujesz odmienności profilu klinicznego kwasu walproinowego (VPA) i lamotryginy w ChAD.',
      'Wyjaśnisz zasady bezpiecznego miareczkowania lamotryginy w celu uniknięcia zespołu Stevensa-Johnsona.',
    ],
    sections: [
      {
        title: 'Kwas walproinowy (VPA) / walproinian sodu',
        text: 'Walproinian nasila przekaźnictwo GABA-ergiczne (hamuje rozpad GABA przez transaminazę GABA oraz stymuluje dekarboksylazę kwasu glutaminowego GAD) oraz blokuje napięciowo zależne kanały sodowe i wapniowe typu T. Jest wysoce skuteczny w manii ostrej, stanach mieszanych i ChAD z szybką zmianą faz (rapid cycling). Wymaga monitorowania TDM (stężenie terapeutyczne 50–100 ug/ml / 350–700 umol/l).',
      },
      {
        title: 'Czarne skrzynki i teratogenność walproinianu',
        text: 'VPA jest bezwzględnie przeciwwskazany u kobiet w wieku rozrodczym, chyba że spełnione są warunki rygorystycznego Programu Zapobiegania Ciąży. Ryzyko wad wrodzonych (wady cewy nerwowej – spina bifida, wady twarzoczaszki, wady serca) wynosi około 10%, a ryzyko zaburzeń neurorozwojowych (autyzm ASD, deficyty IQ o 7-10 pkt) sięga 30-40% u dzieci matek przyjmujących VPA w ciąży. Inne groźne powikłania to: ostre zapalenie trzustki, hepatotoksyczność i hiperamonemia (encefalopatia bez uszkodzenia wątroby).',
      },
      {
        title: 'Lamotrygina: profilaktyka depresji w ChAD i ryzyko SJS/TEN',
        text: 'Lamotrygina blokuje napięciowo zależne kanały sodowe i hamuje patologiczne uwalnianie glutaminianu. W przeciwieństwie do litu i VPA nie działa przeciwmaniakalnie; jej unikalną siłą jest zapobieganie nawrotom faz depresyjnych w ChAD (zwłaszcza ChAD typu II). Najgroźniejszym powikłaniem są ciężkie odczyny skórne: zespół Stevensa-Johnsona (SJS) i toksyczna nekroliza naskórka (TEN). Ryzyko to minimalizuje się poprzez bardzo powolne miareczkowanie dawki (zaczynając od 25 mg/d przez pierwsze 2 tygodnie, 50 mg/d przez kolejne 2 tygodnie). Przy łączeniu z VPA (który hamuje glukuronidację lamotryginy) dawki lamotryginy muszą być zredukowane o 50%!',
      },
    ],
    table: {
      headers: ['Cecha', 'Kwas walproinowy (VPA)', 'Lamotrygina (LTG)'],
      rows: [
        ['Główny profil w ChAD', 'Leczenie manii ostrej, stanów mieszanych, rapid cycling', 'Profilaktyka i leczenie depresji w ChAD (brak działania w ostrej manii)'],
        ['Monitorowanie TDM', 'Tak, zalecane rutynowo (50–100 ug/ml)', 'Nie ma ustalonego sztywnego okna w psychiatrii'],
        ['Ciąża i teratogenność', 'Kategoria X / bezwzględne ostrzeżenia (spina bifida, autyzm)', 'Uznawana za najbezpieczniejszy stabilizator (niezbędna kontrola stężenia)'],
        ['Główne zagrożenie', 'Hepatotoksyczność, zapalenie trzustki, hiperamonemia', 'Zespół Stevensa-Johnsona (SJS) / TEN przy zbyt szybkim miareczkowaniu'],
      ],
    },
    advanced:
      'Karbamazepina przyspiesza metabolizm lamotryginy (indukcja enzymatyczna UGT), co wymaga podwojenia dawek lamotryginy. Z kolei kwas walproinowy silnie hamuje enzym UGT1A4, co podwaja okres półtrwania lamotryginy i drastycznie zwiększa ryzyko martwiczego złuszczania naskórka (TEN). Pacjent musi natychmiast zgłosić każde pojawienie się nowej wysypki z gorączką lub zajęciem śluzówek.',
    summary:
      'VPA stabilizuje manię i stany mieszane, lecz jest silnym teratogenem (spina bifida, autyzm). Lamotrygina zapobiega depresji w ChAD i wymaga powolnego miareczkowania (ryzyko SJS/TEN), ze szczególną ostrożnością przy skojarzeniu z VPA.',
    sourceIds: ['maudsley15', 'canmat-isbd-bipolar', 'ptp-standardy'],
    questions: [
      q(
        'Dlaczego kwas walproinowy jest bezwzględnie przeciwwskazany u kobiet w wieku rozrodczym bez spełnienia rygorystycznego programu zapobiegania ciąży?',
        ['Bardzo wysokie ryzyko wad cewy nerwowej (spina bifida) oraz trwałych zaburzeń rozwoju intelektualnego i autyzmu u dziecka', 'Dane epidemiologiczne jednoznacznie dowodzą ciężkiej teratogenności i neurotoksyczności rozwojowej VPA.'],
        ['Ponieważ natychmiast wywołuje u kobiety bezpłodność mechaniczną', 'VPA może dawać cechy PCOS, ale nie niszczy mechanicznie narządów rodnych.'],
        ['Ponieważ każda kobieta po VPA zapada w śpiączkę wątrobową', 'Śpiączka wątrobowa jest rzadkim powikłaniem idiosynkratycznym.'],
        'psych-vpa-q1'
      ),
      q(
        'W jakiej fazie choroby afektywnej dwubiegunowej lamotrygina posiada najsilniejsze dowody skuteczności?',
        ['W zapobieganiu nawrotom epizodów depresyjnych (profilaktyka fazy depresyjnej)', 'Lamotrygina jest unikalnym lekiem chroniącym pacjentów z ChAD przed załamaniami depresyjnymi.'],
        ['W ostrym, pobudzonym epizodzie manii psychotycznej', 'Lamotrygina nie posiada skuteczności w przerywaniu ostrej manii.'],
        ['W natychmiastowym przerywaniu drgawek w stanie padaczkowym', 'Do przerywania stanu padaczkowego stosuje się dożylne benzodiazepiny.'],
        'psych-vpa-q2'
      ),
      q(
        'Jak należy postąpić z dawkowaniem lamotryginy u pacjenta, który jednocześnie przyjmuje kwas walproinowy?',
        ['Zmniejszyć dawki początkowe i tempo miareczkowania o połowę (np. zacząć od 25 mg co drugi dzień)', 'VPA hamuje enzym UGT1A4 i podwaja stężenie lamotryginy, drastycznie zwiększając ryzyko SJS.'],
        ['Podwoić dawkę lamotryginy od pierwszego dnia', 'Zwiększenie dawki mogłoby doprowadzić do śmiertelnego zespołu Stevensa-Johnsona.'],
        ['Podać od razu 400 mg lamotryginy w pojedynczej dawce', 'Brak miareczkowania jest błędem sztuki lekarskiej.'],
        'psych-vpa-q3'
      ),
      q(
        'Jaki objaw alarmowy podczas wprowadzania lamotryginy wymaga natychmiastowego przerwania leku i kontaktu z lekarzem?',
        ['Wystąpienie wysypki skórnej, pęcherzy na skórze lub owrzodzeń błon śluzowych (jamy ustnej, oczu)', 'Wysypka może być początkiem zespołu Stevensa-Johnsona lub toksycznej nekrolizy naskórka (TEN).'],
        ['Uczucie suchości w nosie po 3 tygodniach', 'Suchość nosa nie jest objawem martwicy naskórka.'],
        ['Zmniejszenie zapotrzebowania na kawę', 'Brak ochoty na kawę nie stanowi zagrożenia dermatologicznego.'],
        'psych-vpa-q4'
      ),
      q(
        'Jakie jest zalecane stężenie terapeutyczne kwasu walproinowego (VPA) w surowicy w leczeniu ostrej manii wg wytycznych AGNP 2026?',
        ['50 – 100 ug/ml (około 350 – 700 umol/l)', 'To zwalidowany przedział stężenia terapeutycznego VPA w stabilizacji nastroju.'],
        ['1 – 5 ug/ml', 'To stężenie subterapeutyczne, nieskuteczne w ostrej manii.'],
        ['500 – 1000 ug/ml', 'To zakres ciężkiej toksyczności z ryzykiem śpiączki i niewydolności wątroby.'],
        'psych-vpa-q5'
      ),
    ],
  },
  {
    id: 'leki-przeciwpsychotyczne-receptory',
    moduleId: 'psych-farmakologia',
    title: 'Atypowe leki przeciwpsychotyczne: okno receptorowe D2 i 5-HT2A',
    subtitle: 'Okno Kapura 65–80% D2, częściowy agonizm i profil metaboliczny SGA',
    group: 'Leki przeciwdepresyjne i stabilizatory',
    minutes: 17,
    goals: [
      'Zinterpretujesz koncepcję okna terapeutycznego blokady receptorów D2 wg badań PET Kapura (65–80%).',
      'Porównasz mechanizm częściowego agonizmu receptorów D2 (aripiprazol) z silnymi antagonistami (olanzapina, rysperydon).',
    ],
    sections: [
      {
        title: 'Koncepcja okna terapeutycznego D2 (Kapur et al., PET)',
        text: 'Badania neuroobrazowe PET wykazały, że działanie przeciwpsychotyczne (redukcja wytwórczych objawów psychotycznych – omamów i urojeń) wymaga zablokowania co najmniej 65% prążkowiowych receptorów dopaminowych D2 w szlaku mezolimbicznym. Jednak przekroczenie 80% blokady receptorów D2 w szlaku nigrostriatalnym wyzwala objawy pozapiramidowe (EPS: parkinsonizm polekowy, ostra dystonia, akatyzja), a w szlaku guzowo-lejkowym – hiperprolaktynemię. Przedział 65–80% occupancy D2 stanowi wąskie "złote okno terapeutyczne" leków przeciwpsychotycznych.',
      },
      {
        title: 'Rola antagonizmu receptorów 5-HT2A w lekach II generacji (SGA)',
        text: 'Atypowe leki przeciwpsychotyczne (SGA: olanzapina, kwetiapina, klozapina, rysperydon) charakteryzują się wyższym powinowactwem do receptorów serotoninowych 5-HT2A niż do receptorów dopaminowych D2 (iloraz powinowactwa 5-HT2A/D2 > 1). Blokada presynaptycznych receptorów 5-HT2A na neuronach dopaminergicznych w prążkowiu odhamowuje lokalne uwalnianie dopaminy, co chroni szlak nigrostriatalny przed nadmierną blokadą D2 i drastycznie zmniejsza ryzyko EPS w porównaniu z klasycznymi neuroleptykami (haloperidol).',
      },
      {
        title: 'Częściowi agoniści D2: dopaminowe stabilizatory (Aripiprazol, Kariprazyna)',
        text: 'Aripiprazol i kariprazyna nie są prostymi antagonistami D2, lecz częściowymi agonistami o wysokim powinowactwie i umiarkowanej aktywności wewnętrznej (intrinsic activity ~25-30% dla aripiprazolu). W warunkach nadmiaru dopaminy (szlak mezolimbiczny w psychozie) działają funkcjonalnie jak antagonista, obniżając transmisję. W warunkach niedoboru dopaminy (kora przedczołowa, szlak nigrostriatalny) zapewniają podstawowy poziom stymulacji (~25%), zapobiegając parkinsonizmowi i hiperprolaktynemii. W badaniach PET aripiprazol wykazuje wysokie wysycenie D2 (>85-90%) bez wywoływania klasycznego parkinsonizmu.',
      },
    ],
    table: {
      headers: ['Wysycenie D2 w PET', 'Wpływ kliniczny w szlaku mezolimbicznym', 'Wpływ w prążkowiu i przysadce'],
      rows: [
        ['< 65%', 'Brak zadowalającej odpowiedzi przeciwpsychotycznej', 'Brak objawów pozapiramidowych, prawidłowa prolaktyna'],
        ['65% – 80%', 'Optymalna kontrola urojeń i omamów (okno Kapura)', 'Niskie ryzyko parkinsonizmu i akatyzji'],
        ['> 80%', 'Niewielki dalszy przyrost skuteczności', 'Wysokie ryzyko EPS, ostrej dystonii i hiperprolaktynemii'],
        ['> 85% (Aripiprazol)', 'Skuteczność przeciwpsychotyczna (częściowy agonizm)', 'Brak hiperprolaktynemii (często jej spadek); możliwa akatyzja'],
      ],
    },
    advanced:
      'Klozapina jest unikalnym lekiem przeciwpsychotycznym: osiąga efekt kliniczny w schizofrenii lekoopornej przy stosunkowo niskiej blokadzie D2 w PET (zaledwie 40–60%), ale wykazuje potężny antagonizm 5-HT2A, alfa-1, M1, H1 oraz powinowactwo do receptorów D4. Dzięki temu praktycznie nie wywołuje EPS ani późnych dyskinez, jednak wymaga bezwzględnego monitorowania morfologii krwi z powodu ryzyka agranulocytozy (rejestry klozapinowe).',
    summary:
      'Okno terapeutyczne D2 wynosi 65–80% occupancy w PET. Powyżej 80% rośnie ryzyko EPS i hiperprolaktynemii. Leki II generacji chronią prążkowie przez antagonizm 5-HT2A, a częściowi agoniści (aripiprazol) stabilizują transmisję bez wzrostu prolaktyny.',
    sourceIds: ['pet-d2-kapur', 'maudsley15', 'stahl-essential'],
    questions: [
      q(
        'Jaki przedział wysycenia receptorów dopaminowych D2 w prążkowiu w badaniach PET (okno Kapura) zapewnia efekt przeciwpsychotyczny przy minimalnym ryzyku EPS?',
        ['65% – 80%', 'Przy 65% pojawia się odpowiedź przeciwpsychotyczna, a powyżej 80% gwałtownie rośnie ryzyko objawów pozapiramidowych.'],
        ['10% – 25%', 'To za niski poziom wysycenia do kontroli psychozy.'],
        ['Dokładnie 95% – 100%', 'Wysycenie >90% klasycznymi antagonistami wywołuje ciężki parkinsonizm polekowy i sztywność.'],
        'psych-sga-q1'
      ),
      q(
        'Jaki jest mechanizm działania aripiprazolu na receptor dopaminowy D2?',
        ['Częściowy agonizm receptorów D2 o wysokim powinowactwie', 'Aripiprazol ma aktywność wewnętrzną około 25-30%, stabilizując przekaźnictwo dopaminowe.'],
        ['Nieodwracalna destrukcja cząsteczki receptora D2', 'Leki nie niszczą fizycznie cząsteczek receptorów.'],
        ['Czysty agonizm identyczny z dopaminą (100% aktywności)', 'Pełny agonizm wywołałby zaostrzenie psychozy.'],
        'psych-sga-q2'
      ),
      q(
        'Dlaczego atypowe leki przeciwpsychotyczne (SGA) rzadziej wywołują objawy pozapiramidowe niż klasyczne neuroleptyki (np. haloperidol)?',
        ['Dzięki silnemu antagonizmowi receptorów 5-HT2A, który odhamowuje uwalnianie dopaminy w prążkowiu', 'Wychwyt dopaminy w prążkowiu kompensuje blokadę D2 i chroni przed parkinsonizmem.'],
        ['Ponieważ SGA w ogóle nie docierają do mózgu', 'SGA przenikają barierę krew-mózg w stopniu wymaganym do działania.'],
        ['Ponieważ SGA są lekami uspokajającymi bez wpływu na neuroprzekaźniki', 'SGA silnie modulują szlaki monoaminowe.'],
        'psych-sga-q3'
      ),
      q(
        'Który lek przeciwpsychotyczny jest lekiem z wyboru w schizofrenii lekoopornej, lecz wymaga obowiązkowego monitorowania morfologii krwi z uwagi na agranulocytozę?',
        ['Klozapina', 'Klozapina ma najwyższą udowodnioną skuteczność w lekooporności, ale niesie ryzyko agranulocytozy u ~0,8% chorych.'],
        ['Haloperidol', 'Haloperidol nie wymaga rutynowych kontroli leukocytów pod kątem agranulocytozy.'],
        ['Kwetiapina', 'Kwetiapina jest lekiem pierwszego rzutu i nie wymaga rejestru agranulocytozy.'],
        'psych-sga-q4'
      ),
      q(
        'Jak aripiprazol wpływa na stężenie prolaktyny we krwi u pacjentów z hiperprolaktynemią wywołaną rysperydonem?',
        ['Obniża stężenie prolaktyny dzięki częściowemu agonizmowi D2 w szlaku guzowo-lejkowym przysadki', 'Aktywność wewnętrzna aripiprazolu pobudza receptory D2 przysadki wystarczająco, by zahamować uwalnianie prolaktyny.'],
        ['Podwaja stężenie prolaktyny w ciągu godziny', 'Aripiprazol jest znany z działania obniżającego prolaktynę.'],
        ['Nie ma żadnego wpływu na przysadkę mózgową', 'Aripiprazol penetruje do przysadki i moduluje jej wydzielanie.'],
        'psych-sga-q5'
      ),
    ],
  },
];
