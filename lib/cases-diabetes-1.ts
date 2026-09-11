import type { DiabetesCaseDraft } from './cases-diabetes-types.ts';

export const diabetesCasesPart1: DiabetesCaseDraft[] = [
  {
    id: 'case-cukrzyca-fizjologia',
    lessonId: 'cukrzyca-fizjologia',
    title: 'Nietypowe pragnienie u 16-letniego licealisty',
    patient: 'Michał, 16 lat',
    difficulty: 'Podstawowy',
    intro:
      '16-letni uczeń liceum zgłasza się do lekarza POZ z powodu wzmożonego pragnienia (wypija do 5–6 litrów płynów na dobę) i konieczności oddawania moczu w nocy (nokturia 3–4 razy). W ciągu ostatnich 3 tygodni schudł 5 kg mimo zachowanego apetytu. Wcześniej nie chorował przewlekle.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Który objaw w wywiadzie najsilniej wskazuje na osmotyczną diurezę wywołaną przekroczeniem progu nerkowego dla glukozy?',
        context: 'Chłopiec zgłasza osłabienie, suchość w ustach i wielomocz narastający od kilku tygodni.',
        options: [
          {
            text: 'Wielomocz (poliuria) z wtórnym wzmożonym pragnieniem (polidypsją) i utratą masy ciała',
            explanation: 'Prawidłowo! Glukozuria po przekroczeniu progu nerkowego (~180 mg/dl) pociąga za sobą wodę na drodze osmozy, wywołując hipowolemię i pragnienie.',
          },
          {
            text: 'Izolowane uczucie głodu bez zmian w ilości oddawanego moczu',
            explanation: 'Sam głód bez poliurii i polidypsji nie tłumaczy utraty masy ciała ani osmotycznego odwodnienia.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Glikemia przygodna z krwi włośniczkowej w gabinecie wynosi 310 mg/dl (17,2 mmol/l). Jaki jest kolejny niezbędny krok diagnostyczny?',
        context: 'W badaniu ogólnym moczu stwierdzono glukozurię (++++), ketonurię (+), ciężar właściwy 1,032.',
        options: [
          {
            text: 'Rozpoznanie cukrzycy bez konieczności wykonywania testu OGTT i pilne skierowanie na oddział diabetologii',
            explanation: 'Prawidłowo! Glikemia przygodna >= 200 mg/dl z jawnymi objawami hiperglikemii jest jednoznacznym kryterium rozpoznania cukrzycy.',
          },
          {
            text: 'Zlecenie doustnego testu obciążenia 75 g glukozy (OGTT) na kolejny dzień',
            explanation: 'Błąd! Podanie 75 g glukozy pacjentowi z glikemią 310 mg/dl grozi wywołaniem ostrej kwasicy ketonowej DKA.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'W szpitalu oznaczono stężenie peptydu C na czczo: 0,18 ng/ml (norma: 1,1–4,4 ng/ml) oraz przeciwciała anty-GAD65: 145 IU/ml (norma < 5). Jakie jest ostateczne rozpoznanie?',
        context: 'Gazometria: pH 7,36, HCO3- 23 mmol/l, beta-hydroksymaślan 1,1 mmol/l (brak kwasicy).',
        options: [
          {
            text: 'Cukrzyca typu 1 (stadium 3) bez kwasicy ketonowej',
            explanation: 'Prawidłowo! Niski peptyd C dowodzi głębokiego niedoboru endogennej insuliny, a wysokie anty-GAD potwierdzają autoimmunologiczną etiologię T1D.',
          },
          {
            text: 'Cukrzyca typu 2 z insulinoopornością',
            explanation: 'W typowej cukrzycy typu 2 peptyd C jest podwyższony lub prawidłowy, a przeciwciała anty-GAD są ujemne.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jaki model leczenia należy wdrożyć u tego nastolatka?',
        context: 'Pacjent jest wydolny krążeniowo, pije płyny, parametry kwasowo-zasadowe są w normie.',
        options: [
          {
            text: 'Intensywną podskórną funkcjonalną insulinoterapię (FIT) w schemacie baza-bolus oraz edukację diabetologiczną',
            explanation: 'Prawidłowo! Bezwzględny niedobór insuliny w T1D wymaga natychmiastowej substytucji analogiem długodziałającym i szybkodziałającym do posiłków.',
          },
          {
            text: 'Doustną metforminę w monoterapii i zalecenie diety redukcyjnej',
            explanation: 'Błąd! Metformina nie zastąpi brakującej insuliny u chorego z T1D i doprowadzi do szybkiej dekompensacji w DKA.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-cukrzyca-diagnostyka',
    title: 'Przypadkowa hiperglikemia w badaniach medycyny pracy',
    patient: 'Tomasz, 52 lata',
    difficulty: 'Podstawowy',
    intro:
      '52-letni kierowca zawodowy zgłasza się z wynikami okresowych badań medycyny pracy. Glikemia na czczo z krwi żylnej wynosi 138 mg/dl (7,7 mmol/l). Pacjent czuje się dobrze, nie zgłasza pragnienia ani spadku masy ciała. Wskaźnik BMI 32,4 kg/m2 (otyłość I stopnia), obwód talii 106 cm, ciśnienie tętnicze 145/92 mmHg.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Co oznacza obecność otyłości brzusznej i nadciśnienia tętniczego w kontekście nieprawidłowej glikemii u tego pacjenta?',
        context: 'Pacjent prowadzi siedzący tryb życia, w wywiadzie rodzinnym matka choruje na cukrzycę typu 2.',
        options: [
          {
            text: 'Wysokie prawdopodobieństwo zespołu metabolicznego i obwodowej insulinooporności',
            explanation: 'Prawidłowo! Otyłość trzewna i nadciśnienie tętnicze to kluczowe składowe zespołu metabolicznego predysponujące do cukrzycy typu 2.',
          },
          {
            text: 'Pewny objaw pierwotnej niewydolności kory nadnerczy',
            explanation: 'W niewydolności nadnerczy (choroba Addisona) dominuje hipotonia i utrata masy ciała, a nie otyłość i nadciśnienie.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Pacjent nie ma objawów ostrej dekompensacji. Jaki krok jest konieczny, aby formalnie postawić diagnozę cukrzycy?',
        context: 'Pierwsza glikemia na czczo wynosiła 138 mg/dl.',
        options: [
          {
            text: 'Powtórzenie oznaczenia glikemii na czczo w inny dzień lub oznaczenie stężenia HbA1c certyfikowaną metodą',
            explanation: 'Prawidłowo! U osoby bezobjawowej jednoznaczne rozpoznanie wymaga potwierdzenia drugim badaniem krwi żylnej.',
          },
          {
            text: 'Natychmiastowe skierowanie na koronarografię przed powtórzeniem badań krwi',
            explanation: 'Brak wskazań do inwazyjnej diagnostyki wieńcowej bez objawów dławicowych.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'W powtórnym badaniu z krwi żylnej: glikemia na czczo 134 mg/dl (7,4 mmol/l), HbA1c 6,8% (51 mmol/mol). Jakie jest rozpoznanie?',
        context: 'Przeciwciała anty-GAD i anty-IA2 ujemne, peptyd C na czczo 2,8 ng/ml.',
        options: [
          {
            text: 'Cukrzyca typu 2 z towarzyszącym zespołem metabolicznym',
            explanation: 'Prawidłowo! Dwukrotna glikemia na czczo >= 126 mg/dl oraz HbA1c >= 6,5% przy ujemnych przeciwciałach potwierdzają T2D.',
          },
          {
            text: 'Nieprawidłowa glikemia na czczo (IFG)',
            explanation: 'IFG diagnozuje się przy glikemii 100–125 mg/dl; wynik >= 126 mg/dl to jawna cukrzyca.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jaka strategia leczenia farmakologicznego i niefarmakologicznego jest zalecana jako leczenie pierwszego wyboru wg PTD/ADA?',
        context: 'eGFR 88 ml/min/1,73m2, bez białkomoczu, brak wywiadu sercowo-naczyniowego.',
        options: [
          {
            text: 'Modyfikacja stylu życia (dieta śródziemnomorska, redukcja masy o 7–10%, aktywność fizyczna) oraz włączenie metforminy w stopniowo zwiększanej dawce',
            explanation: 'Prawidłowo! Metformina z edukacją żywieniową stanowi bezpieczny fundament terapii pierwszego rzutu.',
          },
          {
            text: 'Wdrożenie intensywnej insulinoterapii 4 wstrzyknięć na dobę bez zmian dietetycznych',
            explanation: 'Błąd! W świeżej, stabilnej T2D z HbA1c 6,8% insulina nie jest wskazana jako lek pierwszego rzutu.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-cukrzyca-technologie-cgm',
    title: 'Chwiejna glikemia u studentki architektury',
    patient: 'Zofia, 23 lata',
    difficulty: 'Zaawansowany',
    intro:
      '23-letnia studentka chorująca od 7 lat na cukrzycę typu 1 (leczona penami w schemacie baza-bolus) zgłasza się na wizytę kontrolną. Skarży się na poranne zmęczenie i lęk przed nocnymi spadkami cukru. Mierzy glikemię glukometrem 4–5 razy dziennie. Ostatnie HbA1c wynosi 7,8% (62 mmol/mol). Zalecono wdrożenie sensora ciągłego monitorowania glikemii (rtCGM).',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Po 14 dniach noszenia sensora pobrano raport AGP (Ambulatory Glucose Profile). Który z poniższych parametrów wskazuje na nadmierną chwiejność glikemii?',
        context: 'Raport AGP: średnia glikemia 168 mg/dl, SD 68 mg/dl, pokrycie sensora 96%.',
        options: [
          {
            text: 'Współczynnik zmienności CV = 40,5% (powyżej bezpiecznego progu 36%)',
            explanation: 'Prawidłowo! CV = (SD / Średnia) * 100% = (68 / 168) * 100% = 40,5%. Wartość > 36% oznacza chwiejność i wysokie ryzyko hipoglikemii.',
          },
          {
            text: 'Wysokie pokrycie sensora (96%)',
            explanation: 'Wysokie pokrycie sensora (> 70%) to zaleta techniczna świadcząca o wiarygodności raportu, a nie patologia.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Analiza wskaźników czasu w zakresach wykazuje: TIR (70–180 mg/dl) = 58%, TAR (>180 mg/dl) = 34%, TBR (<70 mg/dl) = 8% (w tym 3% < 54 mg/dl). Jaki jest priorytet kliniczny?',
        context: 'Wykres AGP ujawnia powtarzające się nocne spadki glikemii do 45–55 mg/dl między 2:00 a 4:30, po których następuje gwałtowny wzrost cukru rano.',
        options: [
          {
            text: 'Redukcja czasu spędzanego w hipoglikemii (TBR z 8% do < 4%), zwłaszcza w nocy, poprzez redukcję dawki insuliny bazowej',
            explanation: 'Prawidłowo! Żelazna zasada diabetologii: najpierw eliminujemy hipoglikemię (TBR), a dopiero potem redukujemy hiperglikemię.',
          },
          {
            text: 'Zwiększenie dawki insuliny bazowej o 30% w celu zbicia porannego cukru',
            explanation: 'Błąd! Spowodowałoby to jeszcze głębszą, potencjalnie śmiertelną hipoglikemię w nocy (zjawisko odbicia po hipoglikemii).',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Dlaczego pacjentka miała wysokie HbA1c (7,8%) pomimo spędzania aż 8% doby w hipoglikemii?',
        context: 'HbA1c odzwierciedla jedynie średnią arytmetyczną glikemii, maskując skrajne wahania.',
        options: [
          {
            text: 'Epizody hipoglikemii były równoważone przez gwałtowne poposiłkowe i poranne hiperglikemie (efekt Somogyi i dojadanie cukrów prostych)',
            explanation: 'Prawidłowo! Średnia glikemia 168 mg/dl dała HbA1c 7,8%, całkowicie ukrywając zagrażające życiu nocne spadki glikemii.',
          },
          {
            text: 'Hemoglobina glikowana reaguje wyłącznie na insulinę egzogenną',
            explanation: 'HbA1c zależy od wiązania glukozy z grupą aminową hemoglobiny, a nie od obecności insuliny.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jakie nowoczesne rozwiązanie technologiczne przyniesie pacjentce największą korzyść w redukcji nocnych hipoglikemii i poprawie TIR?',
        context: 'Pacjentka wyraża chęć korzystania z zaawansowanych technologii pompowej closed-loop.',
        options: [
          {
            text: 'Zastosowanie systemu hybrydowej zamkniętej pętli (AID) z funkcją SmartGuard / Control-IQ automatycznie wstrzymującą podaż insuliny przed spadkiem glikemii',
            explanation: 'Prawidłowo! Algorytm predykcyjny wstrzymuje bazę 30 min przed prognozowaną hipoglikemią, niemal eliminując nocne spadki TBR.',
          },
          {
            text: 'Rezygnacja z sensora CGM i powrót do 2 pomiarów glukometrem dziennie',
            explanation: 'Krok wstecz pozbawiający chorą wglądu w trendy i alarmów predykcyjnych.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-cukrzyca-t1d',
    title: 'Dyżur: wymioty i duszność u 19-letniego studenta',
    patient: 'Kamil, 19 lat',
    difficulty: 'Zaawansowany',
    intro:
      '19-letni student został przywieziony na SOR przez współlokatora z akademika z powodu narastającej od 2 dni senności, bólów brzucha, nudności i częstych wymiotów. Od tygodnia skarżył się na wzmożone pragnienie. Przy przyjęciu podsypiający, zdezorientowany, powłoki brzuszne bolesne palpacyjnie, w oddechu wyczuwalna woń zgniłych jabłek (acetonu).',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Oddech pacjenta jest głęboki i przyspieszony (oddech Kussmaula, 28/min). Co jest bezpośrednią przyczyną tego typu oddychania?',
        context: 'Ciśnienie tętnicze 95/60 mmHg, tętno 120/min, cechy znacznego odwodnienia (suche śluzówki, zapadnięte gałki oczne).',
        options: [
          {
            text: 'Oddechowa kompensacja ostrej kwasicy metabolicznej poprzez hiperwentylację i eliminację CO2',
            explanation: 'Prawidłowo! Spadek pH stymuluje chemoreceptory pnia mózgu do hiperwentylacji w celu obniżenia pCO2 (kwasu węglowego).',
          },
          {
            text: 'Pierwotna niewydolność oddechowa w przebiegu zapalenia płuc',
            explanation: 'Oddech Kussmaula wynika z kwasicy metabolicznej, a nie z pierwotnej hipoksemii miąższowej płuc.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Gazometria tętnicza: pH 7,10, pCO2 18 mmHg, HCO3- 6 mmol/l. Jonogram: Na+ 130 mmol/l, K+ 3,9 mmol/l, Cl- 92 mmol/l. Glikemia 420 mg/dl. Ile wynosi luka anionowa (AG)?',
        context: 'Beta-hydroksymaślan we krwi włośniczkowej wynosi 6,2 mmol/l (norma < 0,6).',
        options: [
          {
            text: '32 mmol/L — potwierdza ciężką kwasicę ze zwiększoną luką anionową (HAGMA)',
            explanation: 'Prawidłowo! AG = Na+ - (Cl- + HCO3-) = 130 - (92 + 6) = 130 - 98 = 32 mmol/L. Norma to 8–12 mmol/L.',
          },
          {
            text: '12 mmol/L — wartość w granicach normy',
            explanation: 'Błąd rachunkowy; nieuwzględnienie wodorowęglanów w mianowniku.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Jaka jest pełna diagnoza kliniczna?',
        context: 'Stwierdzono hiperglikemię 420 mg/dl, ketonemię 6,2 mmol/l, pH 7,10, HCO3- 6 mmol/l i AG 32 mmol/l.',
        options: [
          {
            text: 'Ciężka cukrzycowa kwasica ketonowa (DKA) w przebiegu nowo ujawnionej cukrzycy typu 1',
            explanation: 'Prawidłowo! Spełniona jest pełna triada DKA o ciężkim nasileniu (pH < 7,00–7,24, HCO3- < 10 mmol/l).',
          },
          {
            text: 'Zespół hiperglikemiczno-hiperosmolarny (HHS)',
            explanation: 'W HHS pH wynosi > 7,30, wodorowęglany > 18, a ciała ketonowe są nieobecne lub śladowe.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jaki jest prawidłowy schemat postępowania w 1. godzinie leczenia?',
        context: 'Wyjściowe stężenie potasu K+ wynosi 3,9 mmol/l (w przedziale 3,3–5,2 mmol/l).',
        options: [
          {
            text: 'Wlew 1000 ml 0,9% NaCl w 1h, dodanie potasu (20–30 mmol KCl/litr) oraz dożylny wlew insuliny 0,1 j./kg/h',
            explanation: 'Prawidłowo! Rehydratacja krystaloidem i zabezpieczenie potasu umożliwiają bezpieczny ciągły wlew insuliny.',
          },
          {
            text: 'Podanie bolusa 50 j. insuliny domięśniowo i zakaz podawania jakichkolwiek płynów',
            explanation: 'Błąd śmiertelny! Odwodnienie pogłębi wstrząs hipowolemiczny, a nagły bolus wywoła zapaść i hipokaliemię.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-cukrzyca-t2d',
    title: 'Wieloletnia cukrzyca po zawale serca',
    patient: 'Stanisław, 64 lata',
    difficulty: 'Zaawansowany',
    intro:
      '64-letni emerytowany kolejarz choruje na cukrzycę typu 2 od 12 lat. Rok temu przebył zawał serca z uniesieniem odcinka ST (STEMI) leczony angioplastyką z implantacją stentu (DES). Aktualne leczenie: metformina 2 x 1000 mg, glimepiryd 4 mg, ASA, bisoprolol, ramipryl, atorwastatyna 40 mg. Zgłasza się z wynikiem HbA1c 8,4% (68 mmol/mol), eGFR 68 ml/min/1,73m2, BMI 31,5 kg/m2.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Pacjent odczuwa okresowe osłabienie i drżenie rąk przed obiadem. Glukometr wykazuje spadki cukru do 56–62 mg/dl. Jaki lek odpowiada za te hipoglikemie?',
        context: 'Stosowane leki: metformina, glimepiryd, kardiologiczne.',
        options: [
          {
            text: 'Pochodna sulfonylomocznika (glimepiryd) stymulująca komórki beta niezależnie od aktualnej glikemii',
            explanation: 'Prawidłowo! Sulfonylomocznik blokuje kanały K-ATP nawet przy hipoglikemii, niosąc wysokie ryzyko niebezpiecznych spadków cukru.',
          },
          {
            text: 'Metformina',
            explanation: 'Metformina nie stymuluje sekrecji insuliny i w monoterapii nie wywołuje hipoglikemii.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Zgodnie z wytycznymi ESC 2023 i ADA/EASD 2026 u pacjenta z cukrzycą typu 2 i potwierdzoną chorobą sercowo-naczyniową (przebyty zawał) priorytetem jest włączenie leków o udowodnionej kardioprotekcji. Które grupy leków posiadają najwyższą klasę zaleceń (I A)?',
        context: 'HbA1c 8,4%, przebyty zawał serca.',
        options: [
          {
            text: 'Agonista receptora GLP-1 o udowodnionej redukcji MACE (np. semaglutyd) oraz inhibitor SGLT2 (flozyna)',
            explanation: 'Prawidłowo! Obie grupy leków mają klasę I A w redukcji ponownych zawałów, udarów, hospitalizacji z powodu niewydolności serca i zgonów.',
          },
          {
            text: 'Akarboza i pochodne tiazolidynodionu',
            explanation: 'Akarboza nie redukuje twardych punktów sercowych, a pioglitazon może nasilać retencję płynów.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Jaki jest cel wyrównania HbA1c u tego 64-letniego pacjenta z chorobą naczyniową, ale zachowaną ogólną sprawnością?',
        context: 'Przewidywany czas przeżycia pacjenta przekracza 15–20 lat.',
        options: [
          {
            text: 'HbA1c < 7,0% (53 mmol/mol) pod warunkiem bezpiecznego unikania hipoglikemii',
            explanation: 'Prawidłowo! U stabilnego chorego ze sprawnością funkcjonalną cel to < 7,0%, co chroni przed powikłaniami mikronaczyniowymi.',
          },
          {
            text: 'HbA1c < 5,0% za wszelką cenę',
            explanation: 'Zbyt restrykcyjny cel u chorego z chorobą wieńcową drastycznie zwiększa śmiertelność arytmiczną w epizodach hipoglikemii.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jak należy zmodyfikować farmakoterapię cukrzycy?',
        context: 'Celem jest poprawa rokowania sercowego, redukcja masy ciała i likwidacja hipoglikemii.',
        options: [
          {
            text: 'Odstawić glimepiryd, utrzymać metforminę i dołączyć agonistę GLP-1 (np. semaglutyd s.c. raz w tyg.) oraz flozynę (np. empagliflozynę)',
            explanation: 'Prawidłowo! Likwiduje to hipoglikemie po sulfonylomoczniku, obniża masę ciała i zapewnia maksymalną ochronę sercowo-naczyniową.',
          },
          {
            text: 'Podwoić dawkę glimepirydu i zakazać aktywności fizycznej',
            explanation: 'Błąd! Podwojenie sulfonylomocznika wywoła ciężkie hipoglikemie i ryzyko zawału.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-cukrzyca-mody',
    title: 'Szczupła młoda kobieta i zagadka trzech pokoleń',
    patient: 'Anna, 28 lat',
    difficulty: 'Zaawansowany',
    intro:
      '28-letnia szczupła kobieta (BMI 21,2 kg/m2) została skierowana do poradni diabetologicznej. 2 lata temu po porodzie rozpoznano u niej „cukrzycę typu 1” z powodu braku otyłości i wdrożono małe dawki insuliny (6 j. glarginy i 2–3 j. lispro do dań). Pacjentka często zapomina o dawkach, a jej cukry na czczo są w normie. W wywiadzie rodzinnym: matka, wujek i dziadek ze strony matki chorują na łagodną cukrzycę leczoną dietą lub pojedynczą tabletką.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Która cecha z wywiadu i badania klinicznego najsilniej podważa rozpoznanie klasycznej cukrzycy typu 1?',
        context: 'Pacjentka nigdy nie miała kwasicy ketonowej, a cukrzyca występuje w linii prostej w 3 kolejnych pokoleniach.',
        options: [
          {
            text: 'Dziedziczenie autosomalne dominujące w 3 pokoleniach oraz brak epizodu kwasicy ketonowej mimo pomijania dawek insuliny',
            explanation: 'Prawidłowo! Dziedziczenie w 3 pokoleniach bez cech insulinooporności to klasyczny drogowskaz ku cukrzycy monogenowej MODY.',
          },
          {
            text: 'Młody wiek pacjentki (< 30 lat)',
            explanation: 'Młody wiek jest typowy zarówno dla T1D, jak i MODY, więc sam w sobie nie różnicuje tych jednostek.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Zlecono badania immunologiczne i rezerwy wydzielniczej: anty-GAD ujemne, anty-IA2 ujemne, anty-ZnT8 ujemne, peptyd C na czczo 1,9 ng/ml (w normie po 2 latach od diagnozy). Wykonano badanie genetyczne metodą NGS. Jaki gen jest najbardziej prawdopodobną przyczyną?',
        context: 'W teście OGTT wykazano duży przyrost glikemii po 2h (> 90 mg/dl ponad wartość na czczo) oraz obecność glukozy w moczu przy glikemii 130 mg/dl.',
        options: [
          {
            text: 'Mutacja w genie czynnika transkrypcyjnego HNF1A (cukrzyca MODY 3)',
            explanation: 'Prawidłowo! Obniżony próg nerkowy, wysoki skok w OGTT i zachowany peptyd C to cechy osiowe MODY 3 (HNF1A).',
          },
          {
            text: 'Mutacja genu receptora insuliny INSR (zespół Donohue)',
            explanation: 'Zespół Donohue to skrajna letalna postać oporności u niemowląt z dysmorfią i rogowaceniem ciemnym.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Wynik badania genetycznego potwierdził patogenny wariant w genie HNF1A. Jakie jest ostateczne rozpoznanie?',
        context: 'Badanie sekwencjonowania DNA potwierdziło heterozygotyczną mutację HNF1A c.872dupC.',
        options: [
          {
            text: 'Cukrzyca monogenowa MODY 3 (HNF1A-MODY)',
            explanation: 'Prawidłowo! Potwierdzenie molekularne stanowi złoty standard rozpoznania cukrzycy monogenowej.',
          },
          {
            text: 'Cukrzyca MODY 2 (glukokinazowa)',
            explanation: 'W MODY 2 mutacja dotyczy genu GCK, a przyrost w teście OGTT jest bardzo mały (< 54 mg/dl).',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jakie postępowanie farmakologiczne jest leczeniem z wyboru w MODY 3?',
        context: 'Pacjentka obawia się codziennych zastrzyków insuliny.',
        options: [
          {
            text: 'Odstawienie insuliny i wdrożenie małej dawki doustnej pochodnej sulfonylomocznika (np. gliklazyd 30 mg o zmodyfikowanym uwalnianiu)',
            explanation: 'Prawidłowo! Komórki beta w MODY 3 wykazują niezwykłą nadwrażliwość na sulfonylomocznik, co pozwala uwolnić chorych od igieł na dziesięciolecia.',
          },
          {
            text: 'Eskalacja dawki insuliny i podłączenie osobistej pompy insulinowej',
            explanation: 'Błąd! Błędne traktowanie MODY 3 jako T1D skazuje pacjentkę na niepotrzebne inwazyjne leczenie podskórne.',
          },
        ],
      },
    ],
  },
];
