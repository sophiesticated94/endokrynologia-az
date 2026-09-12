import { type DraftLesson, q } from './course-types.ts';

export const draftPsychiatryPart4b: DraftLesson[] = [
  {
    id: 'ostre-stany-toksyczne-zespol-serotoninowy',
    moduleId: 'psych-farmakologia',
    title: 'Zespół serotoninowy: mechanizm, kryteria Huntera i ratownictwo',
    subtitle: 'Nadmierna stymulacja 5-HT2A/1A, klonus, sztywność i odtrutka cyproheptadyna',
    group: 'Toksykologia i stany nagłe w psychiatrii',
    minutes: 18,
    goals: [
      'Zastosujesz kryteria decyzyjne Huntera (Hunter Serotonin Toxicity Criteria) o najwyższej czułości i swoistości.',
      'Zidentyfikujesz klonus (spontaniczny, wywołany, oczny) jako osiowy objaw decyzyjny.',
      'Wdrożysz leczenie ratunkowe: chłodzenie, benzodiazepiny oraz swoisty antagonista 5-HT2A – cyproheptadynę.'
    ],
    sections: [
      {
        title: 'Patofizjologia burzy serotoninowej',
        text: 'Zespół serotoninowy (serotonin toxicity / syndrome) jest potencjalnie śmiertelnym powikłaniem wynikającym z masywnej nadstymulacji ośrodkowych i obwodowych receptorów serotoninowych (przede wszystkim 5-HT2A i 5-HT1A). Dochodzi do niego niemal wyłącznie po połączeniu co najmniej dwóch leków zwiększających stężenie serotoniny różnymi mechanizmami (np. SSRI + iMAO, SSRI + tramadol, linezolid, dekstrometorfan, tryptany, lit).'
      },
      {
        title: 'Złoty standard: Kryteria Decyzyjne Huntera (Dunkley 2003)',
        text: 'Zastąpiły one przestarzałe kryteria Sternbacha. U pacjenta przyjmującego lek serotoninergiczny zespół rozpoznaje się, gdy występuje co najmniej jeden z warunków: 1) Klonus spontaniczny; 2) Klonus indukowany ORAZ pobudzenie lub obfite pocenie się; 3) Klonus oczny ORAZ pobudzenie lub obfite pocenie się; 4) Drżenie mięśniowe ORAZ hiperrefleksja (wygórowanie odruchów ścięgnistych); 5) Wzmożone napięcie mięśniowe ORAZ temperatura > 38°C ORAZ klonus (oczny lub indukowany).'
      },
      {
        title: 'Postępowanie ratunkowe i swoista farmakoterapia',
        text: 'Pierwszym krokiem jest natychmiastowe odstawienie wszystkich leków serotoninergicznych. W opanowaniu pobudzenia i drżeń lekiem I wyboru są benzodiazepiny i.v. (np. diazepam, lorazepam). W przypadkach umiarkowanych i ciężkich stosuje się swoistego antagonistę receptorów 5-HT2A – cyproheptadynę (początkowo 12 mg p.o./zgłębnik, następnie 2 mg co 2 godziny). Ciężka hipertermia (> 39–40°C) wymaga intubacji, sedacji i miorelaksacji (nigdy sukcynylocholiną).'
      }
    ],
    table: {
      headers: ['Objaw kliniczny', 'Występowanie w zespole serotoninowym', 'Występowanie w NMS', 'Różnicowanie'],
      rows: [
        ['Odruchy ścięgniste (odruchy głębokie)', 'Hiperrefleksja, klonus (patognomoniczny)', 'Osłabione lub prawidłowe', 'Klonus jednoznacznie wskazuje na zespół serotoninowy'],
        ['Napięcie mięśniowe', 'Zwiększone, głównie kończyny dolne', 'Uogólniona sztywność "rury ołowianej"', 'Sztywność rury ołowianej typowa dla NMS'],
        ['Perystaltyka jelit', 'Wzmożona (biegunka, przelewanie)', 'Osłabiona lub porażenna', 'Biegunka towarzyszy serotoninie'],
        ['Dynamika początku', 'Gwałtowna (w ciągu godzin od dawki)', 'Stopniowa (rozwój w ciągu kilku dni)', 'Szybki początek sprzyja toksyczności 5-HT']
      ]
    },
    advanced:
      'Linezolid (popularny antybiotyk przeciwko szczepom MRSA i VRE) jest odwracalnym, nieselektywnym inhibitorem monoaminooksydazy (MAO). Podanie linezolidu pacjentowi przyjmującemu SSRI lub SNRI wywołuje gwałtowny, zagrażający życiu zespół serotoninowy. Przed podaniem linezolidu konieczna jest natychmiastowa weryfikacja leków psychotropowych.',
    summary:
      'Zespół serotoninowy diagnozuje się wg kryteriów Huntera (klonus + hiperrefleksja + poty). Leczenie obejmuje odstawienie leków, benzodiazepiny i cyproheptadynę. Linezolid jest silnym iMAO i nie wolno go łączyć z SSRI.',
    sourceIds: ['hunter-criteria', 'maudsley15', 'stahl-essential'],
    questions: [
      q(
        'Jaki objaw neurologiczny posiada najwyższą czułość i swoistość i stanowi fundament kryteriów decyzyjnych Huntera w zespole serotoninowym?',
        ['Klonus (spontaniczny, indukowany lub oczny)', 'Klonus w połączeniu z hiperrefleksją i pobudzeniem/potami pozwala na pewne postawienie rozpoznania.'],
        ['Brak czucia smaku na koniuszku języka', 'Zaburzenia smaku nie wchodzą w skład kryteriów Huntera.'],
        ['Wiotkość wszystkich czterech kończyn', 'W zespole serotoninowym napięcie mięśniowe rośnie, nie spada.'],
        'psych-hunt-q1'
      ),
      q(
        'Jaki lek będący antagonistą receptorów 5-HT2A podaje się jako swoistą odtrutkę doustną w umiarkowanym i ciężkim zespole serotoninowym?',
        ['Cyproheptadyna', 'Blokuje receptory 5-HT2A i szybko znosi toksyczność obwodową i ośrodkową serotoniny.'],
        ['Haloperydol w iniekcji', 'Neuroleptyki typowe są przeciwwskazane, gdyż utrudniają termoregulację i mogą wywołać NMS.'],
        ['Propranolol w dawce dożylnej', 'Beta-blokery mogą wywołać zapaść hipotensyjną i maskować tachykardię.'],
        'psych-hunt-q2'
      ),
      q(
        'Który popularny antybiotyk szpitalny o działaniu przeciwko bakteriom Gram-dodatnim (MRSA) jest silnym inhibitorem MAO i może wywołać zgon po podaniu z SSRI?',
        ['Linezolid', 'Linezolid posiada aktywność inhibitora monoaminooksydazy; jednoczesne podanie z SSRI jest kardynalnym błędem.'],
        ['Amoksycylina z kwasem klawulanowym', 'Penicyliny nie wchodzą w tę interakcję farmakodynamiczną.'],
        ['Azytromycyna', 'Azytromycyna może wydłużać QTc, lecz nie hamuje enzymu MAO.'],
        'psych-hunt-q3'
      ),
      q(
        'Czym różni się badanie odruchów ścięgnistych w zespole serotoninowym od złośliwego zespołu neuroleptycznego (NMS)?',
        ['W zespole serotoninowym występuje uderzające wygórowanie odruchów (hiperrefleksja) i klonus, a w NMS odruchy są prawidłowe lub stłumione', 'Jest to kluczowa cecha semiotyczna różnicująca te dwa stany nagłe.'],
        ['W zespole serotoninowym odruchy całkowicie zanikają na zawsze', 'Odruchy powracają do normy po wyleczeniu toksyczności.'],
        ['W NMS występuje klonus obu rzepek', 'Klonus jest cechą zespołu serotoninowego, nie NMS.'],
        'psych-hunt-q4'
      ),
      q(
        'Jaki lek przeciwbólowy dostępny bez recepty lub na receptę wykazuje silne hamowanie wychwytu serotoniny i bywa przyczyną zespołu serotoninowego po dołączeniu do SSRI?',
        ['Tramadol (oraz dekstrometorfan w syropach przeciwkaszlowych)', 'Tramadol blokuje SERT i może wywołać toksyczność połączony z antydepresantami.'],
        ['Paracetamol', 'Paracetamol nie wpływa bezpośrednio na transporter SERT w OUN.'],
        ['Ibuprofen', 'NLPZ nie hamują wychwytu zwrotnego serotoniny.'],
        'psych-hunt-q5'
      )
    ]
  },
  {
    id: 'zlosliwy-zespol-neuroleptyczny-nms',
    moduleId: 'psych-farmakologia',
    title: 'Złośliwy Zespół Neuroleptyczny (NMS): patofizjologia i terapia',
    subtitle: 'Ostra blokada D2, hipertermia, sztywność rury ołowianej, kinaza CPK i dantrolen',
    group: 'Toksykologia i stany nagłe w psychiatrii',
    minutes: 18,
    goals: [
      'Zdiagnozujesz klasyczną tetradę objawów NMS (sztywność, hipertermia, dysautonomia, zaburzenia świadomości).',
      'Zinterpretujesz wzrost stężenia kinazy kreatynowej (CPK > 1000–10000 IU/l) i ryzyko ostrej niewydolności nerek.',
      'Wdrożysz leczenie farmakologiczne: bromokryptynę, amantadynę oraz dantrolen w OIT.'
    ],
    sections: [
      {
        title: 'Patofizjologia ostrej blokady dopaminergicznej',
        text: 'Złośliwy zespół neuroleptyczny (Neuroleptic Malignant Syndrome - NMS) jest zagrażającym życiu powikłaniem (śmiertelność 5–10%) wywołanym nagłą, głęboką blokadą receptorów D2 w szlaku nigrostriatalnym i podwzgórzu lub nagłym odstawieniem agonistów dopaminy (np. lewodopy w chorobie Parkinsona). Blokada podwzgórzowych receptorów D2 rozregulowuje ośrodek termoregulacji, prowadząc do złośliwej hipertermii.'
      },
      {
        title: 'Tetrada objawów klinicznych i markery laboratoryjne',
        text: 'NMS manifestuje się tetradą: 1) Skrajna sztywność mięśniowa typu "rury ołowianej" (lead-pipe rigidity); 2) Wysoka gorączka (często > 38,5–40°C); 3) Niestabilność wegetatywna (labilne ciśnienie tętnicze, tachykardia, bladość, tachypnoe); 4) Zaburzenia świadomości (od przymglenia do śpiączki). W badaniach laboratoryjnych kluczowy jest gwałtowny wzrost kinazy kreatynowej (CPK > 1000, często > 10 000–50 000 IU/l) wskutek rabdomiolizy oraz leukocytoza (> 10 000–40 000/ul).'
      },
      {
        title: 'Protokół leczenia na oddziale intensywnej terapii',
        text: 'Podstawą jest natychmiastowe odstawienie neuroleptyku oraz intensywna terapia: agresywne nawadnianie dożylne w celu ochrony nerek przed nefropatią mioglobinuryczną (forsowana diureza), chłodzenie fizykalne. Farmakologicznie stosuje się: agonistę receptorów dopaminowych – bromokryptynę (2,5–10 mg p.o. co 8h), amantadynę oraz bezpośredni lek zwiotczający mięśnie – dantrolen (1–2,5 mg/kg i.v. w bolusie, powtarzany do maks. 10 mg/kg/d).'
      }
    ],
    table: {
      headers: ['Parametr', 'Wartość w NMS', 'Znaczenie patofizjologiczne', 'Postępowanie docelowe'],
      rows: [
        ['Kinaza kreatynowa (CPK)', '> 1000 do > 50 000 IU/l', 'Masywna rabdomioliza (rozpad mięśni)', 'Wlewy krystaloidów, alkalizacja moczu, dializoterapia'],
        ['Temperatura ciała', '> 38,5 – 41°C', 'Zablokowanie termoregulacji w podwzgórzu', 'Chłodzenie fizykalne, paracetamol (mało skuteczny)'],
        ['Napięcie mięśniowe', 'Sztywność rury ołowianej (lead-pipe)', 'Blokada D2 w prążkowiu', 'Dantrolen i.v., bromokryptyna, benzodiazepiny'],
        ['Morfologia krwi', 'Leukocytoza 10–40 tys./ul z przesunięciem w lewo', 'Ostra reakcja stresowa i zapalna', 'Wykluczenie neuroinfekcji i sepsy']
      ]
    },
    advanced:
      'Dantrolen działa jako antagonista receptorów rianodynowych (RyR1) w siateczce sarkoplazmatycznej mięśni poprzecznie prążkowanych. Blokuje uwalnianie jonów wapnia (Ca2+) do cytoplazmy komórki mięśniowej, co natychmiast przerywa skurcz tężcowy mięśni, hipermetabolizm i produkcję ciepła, chroniąc pacjenta przed hiperkaliemią i śmiercią.',
    summary:
      'NMS to ostra blokada D2 z sztywnością rury ołowianej, hipertermią, skokiem CPK i leukocytozą. Terapia wymaga natychmiastowego odstawienia leków, forsowanej diurezy, dantrolenu i.v. oraz bromokryptyny w OIT.',
    sourceIds: ['nms-consensus', 'maudsley15', 'wfsbp-schizophrenia'],
    questions: [
      q(
        'Jaki enzym mięśniowy ulega dramatycznemu podwyższeniu w surowicy krwi w przebiegu Złośliwego Zespołu Neuroleptycznego (NMS) wskutek rabdomiolizy?',
        ['Kinaza kreatynowa (CPK / CK)', 'Wartości przekraczają często 10 000–50 000 IU/l i korelują z ryzykiem ostrej martwicy cewek nerkowych.'],
        ['Pepsyna żołądkowa', 'Pepsyna jest enzymem trawiennym soku żołądkowego, a nie mięśni.'],
        ['Enteropeptydaza dwunastnicza', 'Nie ma żadnego związku z destrukcją włókien mięśniowych.'],
        'psych-nms-q1'
      ),
      q(
        'Jaki lek będący blokerem receptorów rianodynowych (RyR1) stosuje się w dożylnej terapii NMS w celu przerwania skurczu mięśni i hipertermii?',
        ['Dantrolen', 'Hamuje uwalnianie wapnia z siateczki sarkoplazmatycznej, przerywając hipermetabolizm mięśniowy.'],
        ['Magnez w tabletkach musujących', 'Magnez doustny nie wywiera efektu zwiotczającego w zagrażającej życiu rabdomiolizie.'],
        ['Wapń w dożylnym bolusie', 'Podanie wapnia mogłoby wręcz nasilić toksyczność wewnątrzkomórkową w komórkach mięśniowych.'],
        'psych-nms-q2'
      ),
      q(
        'Który agonista receptorów dopaminowych jest powszechnie stosowany w farmakoterapii NMS w celu przełamania ośrodkowego deficytu dopaminy?',
        ['Bromokryptyna (lub amantadyna)', 'Stymuluje zablokowane receptory D2 w podwzgórzu i prążkowiu, normalizując termoregulację.'],
        ['Haloperydol w wysokiej dawce', 'Haloperydol jest silnym antagonistą D2 i nasiliłby śmiertelność w NMS.'],
        ['Nalokson dożylnie', 'Nalokson jest antagonistą receptorów opioidowych.'],
        'psych-nms-q3'
      ),
      q(
        'Jaki charakter ma wzmożone napięcie mięśniowe w NMS w badaniu neurologicznym?',
        ['Plastyczna sztywność o charakterze "rury ołowianej" (lead-pipe rigidity) jednakowa w całym zakresie ruchu', 'Świadczy o głębokiej blokadzie pozapiramidowej w szlaku nigrostriatalnym.'],
        ['Spastyczne porażenie wiotkie', 'Pojęcia te wykluczają się wzajemnie.'],
        ['Zupełny brak jakiegokolwiek napięcia mięśniowego', 'W NMS występuje skrajne wzmożenie, a nie zanik napięcia.'],
        'psych-nms-q4'
      ),
      q(
        'Jakie powikłanie narządowe jest główną przyczyną zgonu u pacjentów z nieleczoną rabdomiolizą w przebiegu NMS?',
        ['Ostra martwica cewek nerkowych i niewydolność nerek wywołana zatkaniem przez mioglobinę', 'Mioglobina wytrąca się w kanalikach nerkowych, co wymaga agresywnej płynoterapii i forsowanej diurezy.'],
        ['Ostre pęknięcie pęcherza moczowego', 'Rabdomioliza nie powoduje pęknięcia pęcherza moczowego.'],
        ['Zarastanie tętnic szyjnych w ciągu 5 minut', 'Nie występuje taki proces patologiczny.'],
        'psych-nms-q5'
      )
    ]
  },
  {
    id: 'bezpieczenstwo-kardiometaboliczne-qtc-prolaktyna',
    moduleId: 'psych-farmakologia',
    title: 'Bezpieczeństwo kardiometaboliczne: QTc, hERG i prolaktyna',
    subtitle: 'Blokada kanałów hERG, Torsade de Pointes, formuła Fridericia i rejestr CredibleMeds',
    group: 'Toksykologia i stany nagłe w psychiatrii',
    minutes: 18,
    goals: [
      'Obliczysz skorygowany odstęp QTc za pomocą bezpieczniejszej formuły Fridericia (QTcF) zamiast Bazetta.',
      'Zidentyfikujesz leki psychotropowe o udowodnionym ryzyku wywoływania Torsade de Pointes wg CredibleMeds.',
      'Wdrożysz postępowanie profilaktyczne i modyfikację leczenia przy wydłużeniu QTc > 500 ms.'
    ],
    sections: [
      {
        title: 'Elektrofizjologia: blokada kanałów hERG i arytmia TdP',
        text: 'Wydłużenie odstępu QT w zapisie EKG odzwierciedla opóźnioną repolaryzację komór serca. Wiele leków psychotropowych (zwłaszcza citalopram, escitalopram, haloperydol i.v., sertindol, amisulpryd) blokuje bramkowane napięciem kanały potasowe hERG (IKr). Przekroczenie krytycznego progu stwarza ryzyko wystąpienia wczesnych depolaryzacji następczych (EAD) i wyzwolenia wielokształtnego częstoskurczu komorowego Torsade de Pointes (TdP), przechodzącego w migotanie komór.'
      },
      {
        title: 'Korekcja częstotliwości: Formuła Fridericia vs Bazetta',
        text: 'Klasyczna formuła Bazetta (QTc = QT / sqrt(RR)) wykazuje dramatyczny błąd nadkorekcji przy tachykardii (> 80–100/min), prowadząc do fałszywych rozpoznań zespołu długiego QT. Wytyczne kardiologiczne i psychiatryczne jednoznacznie zalecają stosowanie formuły Fridericia (QTcF = QT / cbrt(RR) – pierwiastek sześcienny), która zachowuje liniowość w pełnym zakresie rytmu serca.'
      },
      {
        title: 'Progi alarmowe i algorytm postępowania',
        text: 'Prawidłowy QTc wynosi < 450 ms u mężczyzn i < 460 ms u kobiet. Wartości graniczne to 450–500 ms (wymagają czujności i kontroli elektrolitów: K+ > 4,0 mmol/l, Mg2+ > 0,8 mmol/l). Wartość bezwzględna QTc > 500 ms lub wydłużenie QTc o > 60 ms względem badania wyjściowego stanowi stan bezpośredniego zagrożenia arytmią i bezwzględne wskazanie do redukcji dawki lub odstawienia leku.'
      }
    ],
    table: {
      headers: ['Lek psychotropowy', 'Kategoria CredibleMeds', 'Maksymalna dawka bezpieczna', 'Ryzyko arytmii TdP'],
      rows: [
        ['Citalopram', 'Known Risk (udowodnione ryzyko TdP)', 'Maks. 40 mg/d (20 mg u seniorów)', 'Wysokie (zależne od dawki)'],
        ['Escitalopram', 'Known Risk', 'Maks. 20 mg/d (10 mg u seniorów)', 'Umiarkowane'],
        ['Haloperydol (zwłaszcza i.v.)', 'Known Risk', 'Unikać iniekcji i.v. bez stałego EKG', 'Ekstremalnie wysokie w podaniu dożylnym'],
        ['Amisulpryd / Sertindol', 'Known Risk', 'Wymaga EKG przed każdą eskalacją', 'Wysokie'],
        ['Sertralina / Aripiprazol', 'Conditional / Low Risk', 'Standardowe dawkowanie', 'Bardzo niskie / najbezpieczniejsze kardiologicznie']
      ]
    },
    advanced:
      'W przypadku wystąpienia napadu Torsade de Pointes z zachowanym tętnem lekiem I wyboru znoszącym arytmię jest dożylny siarczan magnezu (MgSO4) w dawce 2 g i.v. podany w bolusie w ciągu 1–2 minut, niezależnie od wyjściowego stężenia magnezu we krwi.',
    summary:
      'Blokada kanałów potasowych hERG grozi śmiertelnym częstoskurczem TdP. Złotym standardem kalkulacji jest wzór Fridericia (QTcF). QTc > 500 ms nakazuje natychmiastowe odstawienie leku; odtrutką na TdP jest MgSO4 i.v.',
    sourceIds: ['crediblemeds-qt', 'maudsley15', 'canmat-mdd-2023'],
    questions: [
      q(
        'Dlaczego w monitorowaniu bezpieczeństwa leków psychotropowych zaleca się stosowanie wzoru Fridericia (QTcF) zamiast klasycznego wzoru Bazetta?',
        ['Formuła Bazetta drastycznie zawyża wartość QTc przy tachykardii (częstość akcji serca > 80–90/min), generując fałszywe alarmy', 'Formuła Fridericia oparta na pierwiastku sześciennym zapewnia precyzyjną ocenę repolaryzacji niezależnie od tętna.'],
        ['Wzór Fridericia nie wymaga żadnych obliczeń ani zapisu EKG', 'Wzór wymaga zmierzenia czasu odstępu QT i RR w EKG.'],
        ['Wzór Bazetta został zakazany z powodu błędów ortograficznych', 'Chodzi o fizyczne ograniczenia matematycznej formuły Bazetta.'],
        'psych-card-q1'
      ),
      q(
        'Jaki bezwzględny czas trwania odstępu QTc w zapisie EKG uznaje się za krytyczny próg alarmowy wymagający pilnej redukcji lub odstawienia leku?',
        ['QTc powyżej 500 ms (lub przyrost o > 60 ms względem badania wyjściowego)', 'Powyżej 500 ms gwałtownie rośnie ryzyko wystąpienia wielokształtnego częstoskurczu komorowego Torsade de Pointes.'],
        ['QTc powyżej 150 ms', '150 ms to wartość fizjologicznie za krótka.'],
        ['QTc powyżej 1500 ms', 'Przy QTc 1500 ms akcja serca uległaby zatrzymaniu.'],
        'psych-card-q2'
      ),
      q(
        'Jaki lek podaje się dożylnie w pierwszej kolejności u pacjenta z napadem częstoskurczu komorowego Torsade de Pointes z zachowanym tętnem?',
        ['Siarczan magnezu (MgSO4) 2 g dożylnie w bolusie', 'Magnez stabilizuje błonę miocytów i blokuje wczesne depolaryzacje następcze EAD.'],
        ['Dożylny citalopram w bolusie', 'Citalopram jeszcze bardziej zablokowałby kanały hERG i doprowadził do asystolii.'],
        ['Wapń w dawce uderzeniowej', 'Wapń nie jest lekiem I rzutu w Torsade de Pointes.'],
        'psych-card-q3'
      ),
      q(
        'Które dwa leki przeciwdepresyjne z grupy SSRI cechują się najniższym ryzykiem wydłużenia odstępu QTc i są preferowane u pacjentów ze schorzeniami kardiologicznymi?',
        ['Sertralina oraz paroksetyna', 'Badania SADHART potwierdziły pełne bezpieczeństwo kardiologiczne sertraliny nawet po zawale serca.'],
        ['Citalopram w dawce 60 mg i escitalopram w dawce 40 mg', 'Dawki te są przekroczeniem limitów bezpieczeństwa FDA/EMA z uwagi na ryzyko arytmii.'],
        ['Klomipramina i amitryptylina', 'TLPD silnie wydłużają repolaryzację i blokują kanały sodowe.'],
        'psych-card-q4'
      ),
      q(
        'Jaki kanał jonowy w kardiomiocytach jest bezpośrednio blokowany przez leki wydłużające odstęp repolaryzacji komór (QTc)?',
        ['Kanał potasowy hERG (IKr - szybki prąd potasowy odkomorowy)', 'Blokada IKr uniemożliwia sprawny wypływ potasu z komórki, wydłużając czas trwania potencjału czynnościowego.'],
        ['Kanał chlorowy cystic fibrosis CFTR', 'CFTR odpowiada za mukowiscydozę w nabłonkach, nie za repolaryzację serca.'],
        ['Akwaporyna 2 w nerkach', 'Akwaporyna transportuje wodę w cewkach zbiorczych nerek.'],
        'psych-card-q5'
      )
    ]
  },
  {
    id: 'zaburzenia-ruchowe-polekowe-eps-dysdyskinezy',
    moduleId: 'psych-farmakologia',
    title: 'Polekowe zaburzenia ruchowe: parkinsonizm, akatyzja i dyskinezy TD',
    subtitle: 'Nierównowaga DA/ACh w prążkowiu, skala BARS/AIMS, leki antycholinergiczne i VMAT2',
    group: 'Toksykologia i stany nagłe w psychiatrii',
    minutes: 18,
    goals: [
      'Zróżnicujesz ostre dystonie, parkinsonizm polekowy, akatyzję oraz późne dyskinezy (TD).',
      'Zastosujesz natychmiastowe leczenie ostrej dystonii (biperyden / prometazyna i.m./i.v.).',
      'Wdrożysz nowoczesne leczenie późnych dyskinez za pomocą inhibitorów VMAT2 (deutetrabenazyna, walbenazyna).'
    ],
    sections: [
      {
        title: 'Spektrum pozapiramidowych powikłań ruchowych',
        text: 'Objawy pozapiramidowe (EPS) wynikają z blokady receptorów D2 w szlaku nigrostriatalnym. Ostre dystonie pojawiają się w pierwszych godzinach do dni (bolesne skurcze mięśni szyi, kręcz karku, napady spojrzeniowe). Zespół parkinsonowski (drżenie spoczynkowe, bradykinezja, sztywność) rozwija się po tygodniach wskutek braku hamowania neuronów cholinergicznych. Akatyzja to subiektywne, męczące poczucie przymusu poruszania kończynami.'
      },
      {
        title: 'Leczenie stanów ostrych: przełamanie przewagi cholinergicznej',
        text: 'W ostrej dystonii natychmiastową ulgę przynosi dożylne lub domięśniowe podanie leku antycholinergicznego (biperyden 2,5–5 mg i.m./i.v. lub prometazyna), co przywraca równowagę dopaminowo-cholinergiczną w prążkowiu. W akatyzji lekami I wyboru są lipofilne beta-adrenolityki (propranolol 20–80 mg/d) lub doraźnie benzodiazepiny.'
      },
      {
        title: 'Późne dyskinezy (Tardive Dyskinesia - TD) i inhibitory VMAT2',
        text: 'TD to mimowolne, powtarzające się ruchy pląsawicze lub atetotyczne twarzy, języka ("zespół żucia gumy") lub kończyn, rozwijające się po miesiącach lub latach terapii wskutek nadwrażliwości odnerwieniowej i up-regulacji receptorów D2. Leki cholinolityczne są w TD bezwzględnie przeciwwskazane, gdyż nasilają objawy! Rewolucją w terapii TD są inhibitory pęcherzykowego transportera monoamin 2 (VMAT2: deutetrabenazyna, walbenazyna).'
      }
    ],
    table: {
      headers: ['Zaburzenie ruchowe', 'Czas wystąpienia od włączenia', 'Główny objaw kliniczny', 'Postępowanie z wyboru'],
      rows: [
        ['Ostra dystonia', 'Godziny do dni (1–5 dni)', 'Bolesny kręcz karku, napad wejrzeniowy, opistotonus', 'Biperyden i.m./i.v., prometazyna'],
        ['Akatyzja', 'Dni do tygodni', 'Wewnętrzny niepokój, przymus przebierania nogami', 'Propranolol, redukcja dawki, zamiana na lek o niskim D2'],
        ['Parkinsonizm polekowy', 'Tygodnie do miesięcy', 'Sztywność koła zębatego, drżenie spoczynkowe 4-6 Hz, hipomimia', 'Redukcja dawki, biperyden p.o., zamiana na SGA/aripiprazol'],
        ['Późne dyskinezy (TD)', 'Miesiące do lat', 'Ruchy mimowolne języka, warg, tułowia (choreoatetoza)', 'Inhibitor VMAT2, zamiana na klozapinę, STOP cholinolitykom!']
      ]
    },
    advanced:
      'Dlaczego leki cholinolityczne (biperyden, triheksyfenidyl) pogarszają późne dyskinezy (TD)? W TD występuje patologiczna nadwrażliwość postsynaptycznych receptorów dopaminowych. Zahamowanie przekaźnictwa acetylocholinowego usuwa resztkowy hamulec dopaminy w prążkowiu, co skutkuje drastycznym nasileniem mimowolnych ruchów pląsawiczych.',
    summary:
      'Ostre dystonie leczy się biperydenem i.m., akatyzję propranololem, a parkinsonizm redukcją D2. W późnych dyskinezach cholinolityki są szkodliwe; przełomem są inhibitory VMAT2 lub zmiana na klozapinę.',
    sourceIds: ['wfsbp-schizophrenia', 'maudsley15', 'stahl-essential'],
    questions: [
      q(
        'Młody mężczyzna po 24 godzinach od podania haloperydolu doznaje nagłego bolesnego skrętu szyi w bok i przymusowego patrzenia ku górze. Jaki lek należy podać natychmiast w iniekcji?',
        ['Biperyden (2,5–5 mg i.m. lub powolny wlew i.v.)', 'Lek przeciwcholinergiczny natychmiast przywraca zachwianą równowagę dopaminowo-acetylocholinową w prążkowiu.'],
        ['Doustną witaminę C w proszku', 'Witamina C nie znosi ostrej dystonii krtaniowo-szyjnej.'],
        ['Kolejną podwójną dawkę haloperydolu i.m.', 'Zwiększenie dawki neuroleptyku doprowadziłoby do skrajnego skurczu krtani i uduszenia.'],
        'psych-eps-q1'
      ),
      q(
        'Jaka grupa leków stanowi leczenie I rzutu w uciążliwej akatyzji polekowej wg wytycznych międzynarodowych?',
        ['Lipofilne beta-adrenolityki (np. propranolol 20–80 mg/d)', 'Propranolol przenika do OUN i wygasza hiperaktywność noradrenergiczną w pniu mózgu i rdzeniu kręgowym.'],
        ['Glikokortykosteroidy w megadawkach', 'Steroidy nie mają zastosowania w leczeniu akatyzacji.'],
        ['Preparaty żelaza dożylnie', 'Żelazo stosuje się w idiopatycznym zespole niespokojnych nóg (RLS), nie w polekowej akatyzji bez anemii.'],
        'psych-eps-q2'
      ),
      q(
        'Dlaczego stosowanie leków cholinolitycznych (np. biperydenu) jest bezwzględnie PRZECIWWSKAZANE w późnych dyskinezach (Tardive Dyskinesia - TD)?',
        ['Zablokowanie receptorów muskarynowych odhamowuje nadwrażliwe receptory dopaminowe w prążkowiu, drastycznie nasilając ruchy mimowolne', 'Cholinolityki pomagają w ostrym parkinsonizmie, lecz utrwalają i pogarszają późne dyskinezy.'],
        ['Powoduje natychmiastową perforację jelita grubego', 'Biperyden może powodować atonię jelit, lecz w TD kluczowy jest mechanizm receptorowy w mózgu.'],
        ['Wywołuje nieodwracalną utratę słuchu', 'Biperyden nie jest lekiem ototoksycznym.'],
        'psych-eps-q3'
      ),
      q(
        'Jaki nowoczesny cel molekularny reprezentują leki zarejestrowane specjalnie do leczenia późnych dyskinez (walbenazyna, deutetrabenazyna)?',
        ['Hamowanie pęcherzykowego transportera monoamin 2 (VMAT2)', 'Zmniejsza to pakowanie dopaminy do pęcherzyków presynaptycznych i ogranicza jej wyrzut do szczeliny synaptycznej.'],
        ['Hamowanie pompy protonowej w żołądku', 'IPPs leczą chorobę wrzodową, nie dyskinezy.'],
        ['Stymulacja receptorów insuliny w mięśniach', 'Insulina nie reguluje mimowolnych ruchów języka.'],
        'psych-eps-q4'
      ),
      q(
        'Który lek przeciwpsychotyczny cechuje się najniższym ryzykiem wywołania późnych dyskinez (TD) i jest lekiem z wyboru, gdy TD już wystąpią?',
        ['Klozapina', 'Klozapina nie tylko nie indukuje późnych dyskinez, lecz wykazuje właściwości tłumiące istniejące ruchy mimowolne.'],
        ['Haloperydol w zastrzykach o przedłużonym uwalnianiu', 'Jest to lek o najwyższym znanym ryzyku wywołania i zaostrzenia TD.'],
        ['Zuklopentyksol', 'Klasyczny neuroleptyk FGA o wysokim profilu ryzyka dyskinez.'],
        'psych-eps-q5'
      )
    ]
  },
  {
    id: 'lekoopornosc-i-klozapina',
    moduleId: 'psych-farmakologia',
    title: 'Lekooporność w schizofrenii (TRS) i algorytm włączania klozapiny',
    subtitle: 'Kryteria TRRIP, schemat titracji klozapiny, powikłania jelitowe i monitorowanie',
    group: 'Precyzyjna psychofarmakologia i metabolizm',
    minutes: 18,
    goals: [
      'Zdefiniujesz schizofrenię lekooporną (TRS) wg kryteriów konsensusu TRRIP.',
      'Wdrożysz bezpieczną titrację klozapiny od 12,5 mg/d i osiągniesz stężenie docelowe 350–600 ng/ml.',
      'Zapobiegniesz zagrażającej życiu hipomotoryce przewodu pokarmowego (clozapine-induced gastrointestinal hypomotility).'
    ],
    sections: [
      {
        title: 'Kryteria lekooporności wg konsensusu TRRIP',
        text: 'Zgodnie z międzynarodowym konsensusem TRRIP (Treatment Response and Resistance in Psychosis) schizofrenię lekooporną (TRS) rozpoznaje się, gdy u pacjenta nie uzyskano zadowalającej poprawy (redukcja PANSS < 20% lub brak remisji) po co najmniej dwóch kolejnych próbach terapeutycznych różnymi lekami przeciwpsychotycznymi w odpowiedniej dawce (ekwiwalent >= 600 mg chlorpromazyny/d) przez co najmniej 6 tygodni każda, przy potwierdzonej dobrej adherencji (np. badaniem TDM).'
      },
      {
        title: 'Klozapina: złoty standard w TRS',
        text: 'Klozapina jest jedynym lekiem o udowodnionej przewadze w TRS. Ze względu na ryzyko ostrej hipotensji ortostatycznej i zapaści naczyniowej wdrażanie rozpoczyna się od mikrodawki 12,5 mg lub 25 mg na noc, zwiększając dawkę powoli o 25–50 mg co 1–2 dni do dawki docelowej 300–450 mg/d. Stężenie terapeutyczne w surowicy krwi powinno wynosić 350–600 ng/ml.'
      },
      {
        title: 'Zaparcia i atonia jelit: cichy zabójca na klozapinie',
        text: 'Choć agranulocytoza budzi największy lęk, to ciężka hipomotoryka przewodu pokarmowego (atonia, niedrożność porażenna jelit) jest przyczyną większej liczby zgonów na klozapinie niż powikłania hematologiczne. Silna blokada receptorów M1–M4 i 5-HT3 paraliżuje perystaltykę. Profilaktyka wymaga rutynowego monitorowania wypróżnień i wczesnego wdrażania leków osmotycznych (makrogole/PEG) od pierwszych dni leczenia.'
      }
    ],
    table: {
      headers: ['Etap leczenia klozapiną', 'Dawka dobowej titracji', 'Zadania monitorujące', 'Możliwe powikłania'],
      rows: [
        ['Dzień 1–2', '12,5 – 25 mg na noc', 'Pomiar ciśnienia (hipotensja ortostatyczna), tętno', 'Zapaść naczyniowa, zawroty głowy'],
        ['Dzień 3–14', 'Stopniowo do 100–200 mg/d', 'Morfologia z rozmazem (ANC) co tydzień', 'Sedacja, ślinotok nocny'],
        ['Tydzień 3–4', '200 – 400 mg/d (do steady-state)', 'Badanie troponin, CRP (zapalenie m. sercowego)', 'Gorączka, tachykardia spoczynkowa'],
        ['Podtrzymanie', 'Indywidualna wg TDM (350–600 ng/ml)', 'ANC co 4 tyg. po 18 tyg., nadzór perystaltyki jelit', 'Zaparcia, niedrożność, przyrost wagi']
      ]
    },
    advanced:
      'Ślinotok nocny (sialorrhea) dotyczy do 50–80% pacjentów leczonych klozapiną. Wynika z paradoksalnego agonizmu receptorów muskarynowych M4 połączonego z osłabieniem odruchu połykania podczas snu. Skutecznym leczeniem miejscowym jest podanie podjęzykowe kropli z bromku ipratropium lub atropiny (1–2 krople pod język przed snem), co hamuje wydzielanie śliny bez ogólnoustrojowych działań niepożądanych.',
    summary:
      'Klozapina jest lekiem I wyboru w lekooporności (TRS) po nieskuteczności 2 neuroleptyków. Wymaga wolnej titracji, nadzoru hematologicznego (ANC) oraz aktywnej prewencji śmiertelnej atonii jelit makrogolami.',
    sourceIds: ['clozapine-consensus', 'wfsbp-schizophrenia', 'nice-schizophrenia'],
    questions: [
      q(
        'Kiedy zgodnie z konsensusem TRRIP należy podjąć decyzję o włączeniu klozapiny w schizofrenii?',
        ['Po braku adekwatnej odpowiedzi na co najmniej 2 różne leki przeciwpsychotyczne stosowane w odpowiedniej dawce przez min. 6 tygodni każdy', 'Odwlekanie wdrożenia klozapiny o lata drastycznie pogarsza szanse na remisję poznawczą i społeczną.'],
        ['Dopiero po 25 latach nieskutecznego leczenia ambulatoryjnego', 'Odwlekanie terapii jest błędem prowadzącym do nieodwracalnych deficytów.'],
        ['Jako lek I rzutu w pierwszym dniu pierwszego epizodu psychozy u każdego pacjenta', 'Klozapina nie jest lekiem I rzutu w niepowikłanym pierwszym epizodie z uwagi na profil bezpieczeństwa.'],
        'psych-cloz-q1'
      ),
      q(
        'Które powikłanie klozapiny statystycznie odpowiada za większą liczbę zgonów pacjentów niż agranulocytoza?',
        ['Porażenna niedrożność jelit wywołana ciężką hipomotoryką przewodu pokarmowego (clozapine-induced gastrointestinal hypomotility)', 'Silne działanie antycholinergiczne i serotoninergiczne prowadzi do zalegania mas kałowych, martwicy jelita i sepsy.'],
        ['Wypadanie włosów na klatce piersiowej', 'Utrata owłosienia nie stanowi zagrożenia życia.'],
        ['Złamanie kości udowej podczas snu', 'Klozapina nie wywołuje samoistnych złamań trzonów kości.'],
        'psych-cloz-q2'
      ),
      q(
        'Jaki zakres stężenia klozapiny we krwi w badaniu TDM uznaje się za optymalny w leczeniu schizofrenii lekoopornej?',
        ['350 do 600 ng/ml', 'Poniżej 350 ng/ml brak skuteczności w TRS, a powyżej 1000 ng/ml drastycznie rośnie ryzyko drgawek padaczkowych.'],
        ['0,05 do 0,1 ng/ml', 'Są to stężenia homeopatyczne pozbawione efektu przeciwpsychotycznego.'],
        ['15 000 do 30 000 ng/ml', 'Stężenie takie wywołałoby natychmiastową śmierć pacjenta.'],
        'psych-cloz-q3'
      ),
      q(
        'W jaki sposób leczy się uciążliwy ślinotok nocny (sialorrhea) u pacjenta leczonego klozapiną?',
        ['Miejscowym podaniem podjęzykowym kropli z lekiem antycholinergicznym (np. bromek ipratropium lub atropina pod język na noc)', 'Miejscowe zablokowanie receptorów w śliniankach ogranicza wydzielanie śliny bez nasilania zaparć ogólnoustrojowych.'],
        ['Podaniem dużej dawki leku moczopędnego dożylnie', 'Leki moczopędne nie hamują czynności ślinianek.'],
        ['Chirurgicznym wycięciem obu warg', 'Jest to okaleczenie pacjenta niemające nic wspólnego z medycyną.'],
        'psych-cloz-q4'
      ),
      q(
        'Od jakiej dawki początkowej należy bezwzględnie rozpoczynać terapię klozapiną, aby zapobiec ostrej zapaści naczyniowej i ciężkiej hipotensji ortostatycznej?',
        ['12,5 mg do 25 mg podane na noc', 'Klozapina silnie blokuje receptory alfa-1 adrenergiczne; zbyt szybka titracja grozi utratą przytomności i wstrząsem.'],
        ['600 mg w pierwszej dawce rano', 'Dawka uderzeniowa 600 mg stwarza bezpośrednie zagrożenie zgonu sercowo-naczyniowego.'],
        ['1000 mg w powolnym wlewie dożylnym', 'Klozapina nie jest podawana w dożylnych megadawkach.'],
        'psych-cloz-q5'
      )
    ]
  },
  {
    id: 'interwencje-biologiczne-ect-rtms-ketamina',
    moduleId: 'psych-farmakologia',
    title: 'Nowoczesne interwencje biologiczne: ECT, rTMS i ketamina',
    subtitle: 'Elektrowstrząsy, przezczaszkowa stymulacja magnetyczna, esketamina i mechanizmy',
    group: 'Precyzyjna psychofarmakologia i metabolizm',
    minutes: 18,
    goals: [
      'Wskażesz bezwzględne i pilne wskazania do terapii elektrowstrząsowej (ECT: katatonia, stupor depresyjny, ciężka suicydalność).',
      'Zrozumiesz zasady neurostymulacji magnetycznej (rTMS) lewej grzbietowo-bocznej kory przedczołowej (dlPFC).',
      'Wdrożysz protokół podawania donosowej esketaminy w depresji lekoopornej (TRD).'
    ],
    sections: [
      {
        title: 'Terapia elektrowstrząsowa (ECT): złoty standard skuteczności',
        text: 'Terapia elektrowstrząsowa (Electroconvulsive Therapy - ECT) pozostaje najskuteczniejszą znaną metodą leczenia ciężkich, zagrażających życiu zaburzeń afektywnych i katatonii (skuteczność 70–90%). Zabieg przeprowadza się w znieczuleniu ogólnym (krótkodziałający anestetyk, np. propofol/etomidat) i zwiotczeniu mięśniowym (sukcynylocholina). Impuls elektryczny wywołuje uogólniony napad drgawkowy w EEG (trwający min. 25–30 sekund), stymulując masywny wyrzut neurotrofin (BDNF, VEGF) i neurogenezę.'
      },
      {
        title: 'Przezczaszkowa stymulacja magnetyczna (rTMS)',
        text: 'Powtarzalna przezczaszkowa stymulacja magnetyczna (repetitive Transcranial Magnetic Stimulation - rTMS) to nieinwazyjna metoda modulacji kory mózgu za pomocą zmiennego pola magnetycznego, niewymagająca znieczulenia. Standardowy protokół w depresji opiera się na stymulacji wysokoczęstotliwościowej (10–20 Hz lub protokół theta-burst iTBS) lewej grzbietowo-bocznej kory przedczołowej (dlPFC), co przywraca jej aktywność metaboliczną i hamuje nadaktywne ciało migdałowate.'
      },
      {
        title: 'Esketamina donosowa w depresji lekoopornej (TRD)',
        text: 'S-enancjomer ketaminy podawany donosowo w połączeniu z SSRI/SNRI zrewolucjonizował leczenie TRD. Esketamina jako niekompetycyjny antagonista NMDA wywołuje szybki efekt przeciwdepresyjny i antysuicydalny (w ciągu 4–24h). Ze względu na przejściowe skoki ciśnienia tętniczego, sedację i objawy dysocjacyjne aplikacja odbywa się w certyfikowanym ośrodku pod 2-godzinnym bezpośrednim nadzorem medycznym.'
      }
    ],
    table: {
      headers: ['Interwencja biologiczna', 'Inwazyjność / Wymóg anestezjologa', 'Szybkość efektu klinicznego', 'Kluczowe wskazanie kliniczne'],
      rows: [
        ['Terapia elektrowstrząsowa (ECT)', 'Znieczulenie ogólne i zwiotczenie (OIT/sala zabiegowa)', 'Wysoka (1–2 tygodnie / seria 6–12 zabiegów)', 'Katatonia zagrażająca życiu, stupor, depresja psychotyczna'],
        ['rTMS (stymulacja magnetyczna)', 'Nieinwazyjna, bez znieczulenia (pacjent przytomny)', 'Stopniowa (4–6 tygodni codziennych sesji)', 'Lekooporna depresja bez wskazań do pilnego ratowania życia'],
        ['Esketamina donosowa', 'Aplikacja donosowa pod 2h nadzorem RR', 'Błyskawiczna (2–24 godziny)', 'TRD, bezpośrednie zagrożenie samobójcze'],
        ['Głęboka stymulacja mózgu (DBS)', 'Zabieg neurochirurgiczny (implantacja elektrod)', 'Zróżnicowana (długoterminowa neuromodulacja)', 'Eksperymentalnie w skrajnie lekoopornym OCD i TRD']
      ]
    },
    advanced:
      'Jedynym bezwzględnym przeciwwskazaniem do klasycznej terapii elektrowstrząsowej (ECT) jest podwyższone ciśnienie wewnątrzczaszkowe (wzrost ICP spowodowany guzem mózgu, obrzękiem lub świeżym krwawieniem śródczaszkowym), z uwagi na ryzyko wgłobienia pnia mózgu podczas wywołanego napadu drgawkowego.',
    summary:
      'ECT to najsilniejsza metoda ratunkowa w katatonii i depresji psychotycznej (znieczulenie + zwiotczenie). rTMS moduluje lewą dlPFC bez znieczulenia. Donosowa esketamina zapewnia efekt przeciwdepresyjny w ciągu godzin.',
    sourceIds: ['apa-ect-guidelines', 'krystal-ketamine', 'canmat-mdd-2023'],
    questions: [
      q(
        'Jakie jest jedyne bezwzględne przeciwwskazanie do przeprowadzenia zabiegu terapii elektrowstrząsowej (ECT)?',
        ['Znacznie podwyższone ciśnienie wewnątrzczaszkowe (np. guz mózgu z efektem masy, świeży krwotok śródczaszkowy)', 'Podczas napadu drgawkowego przejściowo wzrasta przepływ mózgowy, co przy ciasnocie śródczaszkowej grozi śmiertelnym wgłobieniem migdałków móżdżku.'],
        ['Wiek powyżej 65 lat', 'Wiek podeszły nie jest przeciwwskazaniem; seniorzy często doskonale tolerują ECT.'],
        ['Rozpoznanie depresji z objawami psychotycznymi', 'Jest to jedno z głównych wskazań do ECT, a nie przeciwwskazanie.'],
        'psych-bio-q1'
      ),
      q(
        'W jaki sposób zabezpiecza się pacjenta przed złamaniami kości i urazami mięśniowymi podczas zabiegu ECT?',
        ['Poprzez podanie leku zwiotczającego mięśnie (sukcynylocholiny) po uprzednim uśpieniu pacjenta krótkodziałającym anestetykiem', 'Dzięki zwiotczeniu drgawki widoczne są jedynie w zapisie EEG lub jako minimalne drżenie palców stopy.'],
        ['Przez owinięcie całego ciała grubą warstwą gipsu', 'Gips nie jest stosowany w procedurze ECT.'],
        ['Przez podanie 10 litrów zimnej wody do żołądka', 'Procedura wymaga bycia na czczo w celu ochrony przed aspiracją.'],
        'psych-bio-q2'
      ),
      q(
        'Który rejon kory mózgowej jest celem stymulacji wysokoczęstotliwościowej w standardowym protokole rTMS w leczeniu depresji?',
        ['Lewa grzbietowo-boczna kora przedczołowa (left dlPFC)', 'W depresji wykazuje ona hipometabolizm, który stymulacja magnetyczna odwraca.'],
        ['Pierwszorzędowa kora słuchowa w płacie skroniowym', 'Kora słuchowa nie jest celem w terapii depresji.'],
        ['Móżdżek i jądro zębate', 'Móżdżek odpowiada głównie za koordynację ruchową.'],
        'psych-bio-q3'
      ),
      q(
        'Dlaczego po inhalacji donosowej esketaminy pacjent musi pozostać pod bezpośrednią obserwacją personelu medycznego przez co najmniej 2 godziny?',
        ['Z uwagi na ryzyko przejściowego skoku ciśnienia tętniczego krwi, sedacji oraz objawów dysocjacji psychicznej', 'Objawy te osiągają szczyt w ciągu pierwszych 40 minut i ustępują samoistnie po ok. 90–120 minutach.'],
        ['Ponieważ esketamina powoduje natychmiastowe zrośnięcie obu nozdrzy', 'Jest to biologiczny nonsens.'],
        ['Aby odczekać na wyblaknięcie koloru skóry', 'Esketamina nie zmienia koloru powłok skórnych.'],
        'psych-bio-q4'
      ),
      q(
        'W jakim stanie klinicznym terapia elektrowstrząsowa (ECT) stanowi bezwzględną interwencję ratującą życie o najwyższej skuteczności?',
        ['W ostrej katatonii złośliwej oraz w ciężkim stuporze depresyjnym z odmową przyjmowania płynów i pokarmów', 'Zabieg natychmiastowo przerywa stan katatoniczny i zabezpiecza przed zgonem z odwodnienia i powikłań zatorowych.'],
        ['W łagodnym przejściowym smutku po zgubieniu parasola', 'Nie jest to wskazanie do żadnego leczenia psychiatrycznego.'],
        ['W próchnicy zębów trzonowych', 'Stomatologia nie posługuje się terapią ECT.'],
        'psych-bio-q5'
      )
    ]
  }
];
