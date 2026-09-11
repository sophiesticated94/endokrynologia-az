import type { ParathyroidCaseDraft } from './cases-parathyroid-types.ts';

export const parathyroidCasesPart2: ParathyroidCaseDraft[] = [
  {
    id: 'case-shpt-thpt-pchn',
    title: 'Autonomia po latach dializ',
    patient: 'Tadeusz, 61 lat',
    difficulty: 'Zaawansowany',
    intro:
      '61-letni mężczyzna ze schyłkową niewydolnością nerek w przebiegu nefropatii cukrzycowej, od 9 lat leczony powtarzanymi hemodializami, zgłasza nasilające się bóle kości, świąd skóry oraz osłabienie mięśniowe. W ostatnich miesiącach jego stężenie wapnia całkowitego wzrosło do 11,6 mg/dl (hiperkalcemia), fosforany wynoszą 6,8 mg/dl (hiperfosfatemia), a stężenie iPTH sięga 1680 pg/ml.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'W badaniu fizykalnym stwierdzasz bolesność uciskową piszczeli i żeber. W RTG rąk widoczna jest podokostnowa resorpcja kości paliczków. Co oznacza pojawienie się hiperkalcemii u wieloletniego dializowanego z tak wysokim PTH?',
        options: [
          {
            text: 'Transformację wtórnej nadczynności przytarczyc (SHPT) w autonomiczną nadczynność trzeciorzędową (THPT)',
            explanation: 'Prawidłowo! Wieloletnia stymulacja doprowadziła do rozrostu guzkowego przytarczyc, utraty receptorów CaSR i VDR oraz autonomicznej hipersekrecji PTH niepodatnej na hamowanie hiperkalcemią.',
          },
          {
            text: 'Całkowite wyleczenie niewydolności nerek i powrót funkcji nefronów',
            explanation: 'Hiperkalcemia i hiperfosfatemia są wyrazem ciężkiej dekompensacji metabolicznej, a nie regeneracji nerek.',
          },
          {
            text: 'Ostre zatrucie glinem ze stacji dializ',
            explanation: 'Choroba posteroidowa/postglinowa wiązała się z niskim PTH (adynamiczna choroba kości).',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Obliczasz iloczyn wapniowo-fosforanowy (Ca x P): 11,6 mg/dl * 6,8 mg/dl = 78,8 mg2/dl2 (norma bezpieczeństwa <55 mg2/dl2). Jakie bezpośrednie zagrożenie naczyniowe niesie tak wysoki iloczyn?',
        options: [
          {
            text: 'Wysokie ryzyko kalcyfilaksji (martwicy naczyń skóry) oraz masywnych zwapnień zastawek serca i tętnic wieńcowych',
            explanation: 'Dokładnie! Przekroczenie iloczynu 55 mg2/dl2 powoduje wytrącanie się kryształów fosforanu wapnia w ścianach naczyń krwionośnych, grożąc zawałem serca i śmiertelną kalcyfilaksją.',
          },
          {
            text: 'Ryzyko nagłego rozpuszczenia kośćca w ciągu 24 godzin',
            explanation: 'Kości ulegają przebudowie (osteitis fibrosa cystica), ale krytycznym zagrożeniem życia jest kalcyfikacja łożyska naczyniowego.',
          },
          {
            text: 'Zanik błony śluzowej żołądka z niedokrwistością Addisona-Biermera',
            explanation: 'Iloczyn Ca x P nie odpowiada za autoimmunologiczne zapalenie błony śluzowej żołądka.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'W USG szyi uwidoczniono powiększenie wszystkich czterech przytarczyc, z dominującym guzkiem o średnicy 22 mm w okolicy prawego dolnego bieguna. Jakie jest rozpoznanie?',
        options: [
          {
            text: 'Trzeciorzędowa nadczynność przytarczyc (THPT) z hiperplazją guzkową w przebiegu zaawansowanego CKD-MBD',
            explanation: 'Prawidłowe rozpoznanie. Występuje pełny obraz autonomizacji: hiperkalcemia + wysokie PTH + rozrost wielogruczołowy u pacjenta dializowanego.',
          },
          {
            text: 'Zwykły pojedynczy sporadyczny gruczolak przytarczyc bez związku z dializami',
            explanation: 'W THPT dochodzi do patologii wszystkich gruczołów w odpowiedzi na wieloletnią mocznicę.',
          },
          {
            text: 'Rak rdzeniasty tarczycy z przerzutami do przytarczyc',
            explanation: 'Obraz jest typowy dla zaburzeń mineralno-kostnych w PChN.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Mimo maksymalnych dawek cynakalcetu i niewapniowych leków wiążących fosforany utrzymuje się hiperkalcemia >11,5 mg/dl i ból kości. Jakie jest definitywne postępowanie z wyboru wg wytycznych KDIGO?',
        options: [
          {
            text: 'Kwalifikacja do leczenia operacyjnego: subtotalna paratyreoidktomia (wycięcie 3,5 gruczołu) lub totalna z autotransplantacją',
            explanation: 'Znakomita decyzja! W opornej na farmakoterapię THPT z hiperkalcemią i bólami kostnymi operacja usuwa autonomiczną masę gruczołów, chroniąc naczynia przed zgonem sercowo-naczyniowym.',
          },
          {
            text: 'Zwiększenie dawek doustnego węglanu wapnia do 6 gramów na dobę',
            explanation: 'Dalsza podaż wapnia przy iloczynie Ca x P >78 doprowadziłaby do natychmiastowej śmierci naczyniowej chorego!',
          },
          {
            text: 'Wstrzymanie hemodializ na okres 4 tygodni',
            explanation: 'Przerwanie dializoterapii wywołałoby zgon z powodu mocznicy i hiperkaliemii.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-hiperkalcemia-nowotwory',
    title: 'Złośliwa hiperkalcemia u palacza',
    patient: 'Henryk, 67 lat',
    difficulty: 'Podstawowy',
    intro:
      '67-letni wieloletni palacz tytoniu (50 paczkolat) został skierowany do szpitala przez lekarza POZ z powodu postępującego od 3 tygodni osłabienia, braku apetytu, ubytku masy ciała o 8 kg, uporczywych zaparć i narastającej senności. W badaniach laboratoryjnych stwierdzono stężenie wapnia całkowitego 14,4 mg/dl (ciężka hiperkalcemia), kreatyninę 2,3 mg/dl oraz mocznik 98 mg/dl.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Pacjent jest spowolniały psychoruchowo, podsypiający, skóra jest sucha o obniżonym turgorze, język podsuszony, ciśnienie 95/60 mmHg. Które badanie hormonalne pozwoli natychmiast ustalić, czy hiperkalcemia zależy od przytarczyc?',
        options: [
          {
            text: 'Oznaczenie nienaruszonego parathormonu (iPTH)',
            explanation: 'Dokładnie! iPTH jest kluczowym rozdrożem diagnostycznym: stężenie podwyższone oznacza PHPT, natomiast stężenie stłumione (<10 pg/ml) wskazuje na przyczynę pozaprzytarczycową (najczęściej nowotwór).',
          },
          {
            text: 'Oznaczenie stężenia tyreoglobuliny (Tg)',
            explanation: 'Tyreoglobulina jest markerem raka tarczycy i nie różnicuje mechanizmu hiperkalcemii.',
          },
          {
            text: 'Dobowe wydalanie kwasu 5-hydroksyindolooctowego (5-HIAA)',
            explanation: '5-HIAA służy do diagnostyki rakowiaka i zespołu rakowiaka, a nie hiperkalcemii.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Wynik iPTH wynosi 3,5 pg/ml (norma 15–65 pg/ml, stłumiony!). W RTG klatki piersiowej uwidoczniono masę guzowatą o średnicy 6 cm we wnęce płuca prawego. Oznaczono stężenie PTHrP — jest wybitnie podwyższone. Jaki nowotwór najczęściej odpowiada za ten obraz?',
        options: [
          {
            text: 'Rak płaskonabłonkowy płuca wydzielający peptyd parathormonopodobny (PTHrP)',
            explanation: 'Prawidłowo! Rak płaskonabłonkowy płuca jest klasycznym guzem wywołującym humoralną hiperkalcemię nowotworową (HHM) poprzez masową sekrecję PTHrP.',
          },
          {
            text: 'Gruczolakorak jelita grubego z przerzutami do kości',
            explanation: 'Gruczolakoraki rzadziej wydzielają PTHrP; u tego palacza guz zlokalizowany jest pierwotnie w płucu.',
          },
          {
            text: 'Szpiczak mnogi z przewagą łańcuchów lekkich',
            explanation: 'Szpiczak powoduje miejscową osteolizę cytokinową, a nie ektopową syntezę PTHrP.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Jakie jest całościowe rozpoznanie u Henryka?',
        options: [
          {
            text: 'Humoralna hiperkalcemia nowotworowa (HHM) zależna od PTHrP w przebiegu raka płuca powikłana ostrym uszkodzeniem nerek (AKI)',
            explanation: 'Prawidłowe rozpoznanie. Ciężka hiperkalcemia doprowadziła do odwodnienia i przednerkowego uszkodzenia nerek.',
          },
          {
            text: 'Przełom w przebiegu pierwotnej nadczynności przytarczyc z gruczolakiem ektopowym w śródpiersiu',
            explanation: 'Stłumione stężenie iPTH (3,5 pg/ml) całkowicie wyklucza gruczolaka przytarczyc.',
          },
          {
            text: 'Hiperwitaminoza D wywołana nadmierną suplementacją cholekalcyferolu',
            explanation: 'W zatruciu witaminą D podwyższone byłoby 25(OH)D, a nie peptyd PTHrP.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jaki jest PIERWSZY krok terapeutyczny, który musisz wdrożyć natychmiast na sali reanimacyjnej?',
        options: [
          {
            text: 'Forsowny wlew dożylny 0,9% NaCl (3–4 litry w pierwszej dobie) w celu uzupełnienia łożyska naczyniowego i wymuszenia kalciurii',
            explanation: 'Wzorowe postępowanie ratunkowe! Wlew soli fizjologicznej przywraca objętość krwi, perfuzję nerek i wypłukuje wapń. Dopiero w drugiej kolejności podaje się kwas zoledronowy.',
          },
          {
            text: 'Podanie dożylne 120 mg furosemidu bez podawania jakichkolwiek płynów',
            explanation: 'Kardynalny błąd! Odwodniony pacjent z ciśnieniem 95/60 mmHg po podaniu diuretyku wpadłby w nieodwracalny wstrząs hipowolemiczny ze zgonem.',
          },
          {
            text: 'Pilna operacja resekcji płata płuca w trybie ostrym',
            explanation: 'W stanie ciężkiej hiperkalcemii i niewydolności nerek znieczulenie ogólne grozi zatrzymaniem krążenia; najpierw należy wyrównać zaburzenia metaboliczne.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-hipokalcemia-niedoczynnosc',
    lessonId: 'hipokalcemia-niedoczynnosc',
    title: 'Drętwienie dłoni po wycięciu tarczycy',
    patient: 'Monika, 46 lat',
    difficulty: 'Podstawowy',
    intro:
      '46-letnia kobieta w 2. dobie po całkowitym wycięciu tarczycy z powodu wola guzowatego nietoksycznego zgłasza narastające uczucie mrowienia warg i czubka nosa oraz bolesne skurcze palców obu dłoni. W badaniu fizykalnym uderzenie w pień nerwu twarzowego wywołuje gwałtowny skurcz kącika ust (dodatni objaw Chvostka).',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Co jest najbardziej prawdopodobną przyczyną wystąpienia objawów tężyczkowych w 2. dobie po całkowitym wycięciu tarczycy?',
        options: [
          {
            text: 'Przejściowe lub trwałe niedokrwienie / niezamierzone usunięcie przytarczyc w trakcie tyreoidektomii',
            explanation: 'Prawidłowo! Pooperacyjna hipoparatyreoza jest najczęstszym powikłaniem radykalnej chirurgii tarczycy (dotyczy 10–30% operowanych przejściowo, a 1–3% na stałe).',
          },
          {
            text: 'Porażenie nerwu krtaniowego wstecznego',
            explanation: 'Porażenie nerwu krtaniowego wstecznego objawia się chrypką lub dusznością, a nie tężyczką rąk.',
          },
          {
            text: 'Ostra niedoczynność kory nadnerczy',
            explanation: 'Chirurgia tarczycy nie uszkadza nadnerczy; objawy są typowe dla ostrej hipokalcemii.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Pobrano krew na badania pilne: wapń całkowity wynosi 6,8 mg/dl (norma 8,6–10,2), fosforany 5,4 mg/dl (podwyższone), a iPTH wynosi 4,2 pg/ml (norma 15–65). Jaki jest cel leczenia doraźnego?',
        options: [
          {
            text: 'Przerwanie objawów tężyczki poprzez powolny wlew dożylny 10% glukonianu wapnia pod kontrolą EKG',
            explanation: 'Dokładnie tak! Podaje się 1–2 ampułki (10–20 ml) 10% glukonianu wapnia rozcieńczone w 100 ml 5% glukozy powoli w ciągu 10–20 minut, monitorując tętno i rytm serca.',
          },
          {
            text: 'Podanie doustnej witaminy D3 w dawce 1000 j.m. raz w tygodniu',
            explanation: 'Zwykła witamina D działa zbyt wolno (dni/tygodnie) i nie ulegnie aktywacji przy braku PTH.',
          },
          {
            text: 'Podanie dożylne wodorowęglanu sodu 8,4%',
            explanation: 'Alkalizacja krwi pogłębiłaby hipokalcemię zjonizowaną i nasiliła skurcze krtaniowe!',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Jakie jest rozpoznanie u Moniki?',
        options: [
          {
            text: 'Ostra pooperacyjna niedoczynność przytarczyc z objawową hipokalcemią',
            explanation: 'Prawidłowe rozpoznanie. Niski wapń, wysokie fosforany i niski PTH w 48 h po tyreoidektomii definiują ten stan.',
          },
          {
            text: 'Tężyczka psychogenna',
            explanation: 'Potwierdzony niski wapń całkowity i niski PTH wykluczają tło emocjonalne.',
          },
          {
            text: 'Przełom tarczycowy hipometaboliczny',
            explanation: 'Wole było nietoksyczne, a objawy wynikają wyłącznie z niedoboru przytarczyc.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Po ustąpieniu objawów ostrych planujesz terapię doustną przed wypisem do domu. Jaki zestaw leków wg wytycznych ESE zapewni skuteczną kontrolę wapnia?',
        options: [
          {
            text: 'Aktywny metabolit witaminy D (alfakalcydol 1–2 µg/d lub kalcytriol 0,5–1 µg/d) w połączeniu z węglanem wapnia 1500–2000 mg Ca/d',
            explanation: 'Znakomita decyzja! Aktywna witamina D omija brak nerkowej hydroksylacji, a węglan wapnia dostarcza substratu. Celem jest utrzymanie Ca w dolnej granicy normy.',
          },
          {
            text: 'Wyłącznie zwykły cholekalcyferol (witamina D3) w dawce 500 j.m./dobę',
            explanation: 'Monoterapia cholekalcyferolem bez PTH nie jest w stanie wygenerować aktywnego kalcytriolu i doprowadzi do nawrotu tężyczki.',
          },
          {
            text: 'Cynakalcet w dawce 30 mg dwa razy na dobę',
            explanation: 'Cynakalcet obniża stężenie wapnia i jest stosowany w nadczynności przytarczyc; podany tutaj wywołałby śmiertelną tężyczkę!',
          },
        ],
      },
    ],
  },
  {
    id: 'case-tezyczka-objawy',
    title: 'Skurcz dłoni i niepokojące EKG',
    patient: 'Barbara, 33 lata',
    difficulty: 'Zaawansowany',
    intro:
      '33-letnia pacjentka z chorobą Leśniowskiego-Crohna i zespołem krótkiego jelita po resekcjach zgłasza bolesne kurcze stóp i dłoni, utrudniające pisanie na klawiaturze. Lekarz POZ napompował mankiet ciśnieniomierza na ramieniu — po 2 minutach ręka pacjentki zgięła się mimowolnie w stawach śródręczno-paliczkowych z przywiedzionym kciukiem („ręka położnika”).',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Jaki objaw fizykalny został wywołany przez lekarza i jak świadczy on o pobudliwości nerwowej?',
        options: [
          {
            text: 'Dodatni objaw Trousseau, świadczący o wybitnej nadpobudliwości nerwowo-mięśniowej pod wpływem niedokrwienia pnia nerwowego',
            explanation: 'Prawidłowo! Objaw Trousseau jest wysoce swoisty (>95%) dla tężyczki i świadczy o gotowości drgawkowej włókien nerwowych.',
          },
          {
            text: 'Objaw Goldflama świadczący o zapaleniu nerki',
            explanation: 'Objaw Goldflama to bolesność wstrząsania okolicy lędźwiowej.',
          },
          {
            text: 'Objaw Homansa świadczący o zakrzepicy żył głębokich podudzia',
            explanation: 'Objaw Homansa dotyczy bólu łydki przy zgięciu grzbietowym stopy.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'W EKG stwierdzono wydłużenie odstępu QTc do 510 ms (norma <450 ms). Wyniki badań krwi: wapń całkowity 7,1 mg/dl, wapń zjonizowany 0,88 mmol/l, magnez 0,38 mmol/l (norma 0,75–1,05 mmol/l). Co jest przyczyną oporności na samo leczenie solami wapnia?',
        options: [
          {
            text: 'Głęboka hipomagnezemia, która hamuje uwalnianie PTH z przytarczyc i wywołuje obwodową oporność receptora PTHR1',
            explanation: 'Znakomita wiedza fizjologiczna! Bez wyrównania magnezu w ustroju podawanie samego wapnia nie przyniesie trwałego efektu terapeutycznego.',
          },
          {
            text: 'Podwyższona aktywność transaminaz wątrobowych',
            explanation: 'Enzymy wątrobowe nie wpływają na elektrofizjologię mięśniówki.',
          },
          {
            text: 'Nadmierne gromadzenie żelaza w szpiku kostnym',
            explanation: 'Gospodarka żelazem nie tłumaczy patogenezy tężyczki.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Jakie jest pełne rozpoznanie u Barbary?',
        options: [
          {
            text: 'Tężyczka jawna z wydłużeniem QTc w przebiegu zespołu złego wchłaniania z ciężką hipokalcemią i hipomagnezemią',
            explanation: 'Prawidłowe rozpoznanie. Utrata powierzchni chłonnej jelita w chorobie Crohna doprowadziła do ucieczki jonów dwuwartościowych.',
          },
          {
            text: 'Wrodzona padaczka miokloniczna',
            explanation: 'Skurcze tężyczkowe w pełni ustępują po wyrównaniu zaburzeń elektrolitowych.',
          },
          {
            text: 'Ostry zespół wieńcowy bez uniesienia odcinka ST (NSTEMI)',
            explanation: 'Wydłużenie QTc wynika z zaburzeń elektrolitowych, a nie martwicy mięśnia sercowego.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jaki schemat postępowania ratunkowego należy wdrożyć w pierwszej kolejności?',
        options: [
          {
            text: 'Równoległy dożylny wlew siarczanu magnezu (MgSO4) oraz glukonianu wapnia pod ciągłym kardiomonitorem',
            explanation: 'Wzorowa decyzja! Jednoczesne uzupełnienie magnezu odblokowuje wydzielanie PTH i umożliwia komórkom mięśniowym powrót do stabilnego potencjału spoczynkowego.',
          },
          {
            text: 'Podanie doustnych tabletek magnezu z tlenkiem magnezu w dawce 50 mg',
            explanation: 'Droga doustna w zespole krótkiego jelita i ostrej tężyczce z wydłużonym QTc jest nieskuteczna i zbyt wolna.',
          },
          {
            text: 'Podanie digoksyny w celu skrócenia odstępu QTc',
            explanation: 'Digoksyna przy hipomagnezemii i hipokalcemii wywołałaby śmiertelne zaburzenia rytmu serca!',
          },
        ],
      },
    ],
  },
];
