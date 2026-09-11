import { type DraftLesson, q } from './course-types.ts';

export const draftGonadsPart3: DraftLesson[] = [
  {
    id: 'gonady-menopauza-mht',
    title: 'Przedwczesna niewydolność jajników (POI) i menopauza (MHT)',
    group: 'Ginekologia endokrynologiczna',
    readTime: '13 min',
    goals: [
      'Znać kryteria diagnostyczne ESHRE przedwczesnej niewydolności jajników (POI).',
      'Zrozumieć zasady kwalifikacji, okno terapeutyczne i korzyści hormonalnej terapii menopauzalnej (MHT).',
      'Różnicować ryzyko sercowo-naczyniowe i zakrzepowo-zatorowe terapii doustnej vs przezskórnej.',
    ],
    sections: [
      {
        title: 'Przedwczesna niewydolność jajników (POI)',
        content:
          'POI (Premature Ovarian Insufficiency) to utrata czynności jajników przed 40. rokiem życia. Zgodnie z wytycznymi ESHRE (2024), kryteria diagnostyczne obejmują: brak miesiączki (oligo-/amenorrhea) przez co najmniej 4 miesiące oraz podwyższone stężenie FSH > 25 IU/l potwierdzone w dwóch niezależnych oznaczeniach w odstępie co najmniej 4–6 tygodni. Przyczyny obejmują: aberracje chromosomowe (zespół Turnera, premutacja FMR1 w zespole łamliwego chromosomu X), autoimmunizację (przeciwciała przeciwjądrowe, poliendokrynopatie APS-1 i APS-2 z chorobą Addisona) oraz jatrogenię (chemioterapia, radioterapia).',
      },
      {
        title: 'Leczenie substytucyjne w POI vs MHT',
        content:
          'Młode kobiety z POI bezwzględnie wymagają pełnodawkowej substytucji hormonalnej (zwykle do średniego wieku naturalnej menopauzy, tj. 51 lat) w celu ochrony przed przedwczesną osteoporozą, chorobą wieńcową, demencją i przedwczesnym zgonem. Preferuje się naturalny 17-beta-estradiol (doustny lub przezskórny) z cyklicznym mikronizowanym progesteronem u kobiet z zachowaną macicą. Dawki w POI są wyższe niż w klasycznej menopauzie, naśladując fizjologiczne stężenia u młodych kobiet (ok. 100 pg/ml estradiolu).',
      },
      {
        title: 'Hormonalna terapia menopauzalna (MHT) i okno możliwości',
        content:
          'MHT jest najskuteczniejszą metodą leczenia objawów naczynioruchowych (uderzenia gorąca, nocne poty) i zespołu moczowo-płciowego menopauzy (GSM). Zgodnie z koncepcją „okna możliwości terapeutycznych” (timing hypothesis), wdrożenie MHT u kobiet poniżej 60. roku życia lub w ciągu 10 lat od ostatniej miesiączki wiąże się ze znaczną redukcją śmiertelności ogólnej, redukcją zawałów serca i złamań osteoporotycznych. Przezskórny estradiol (plaster, żel) nie podlega efektowi pierwszego przejścia przez wątrobę i nie zwiększa ryzyka żylnej choroby zakrzepowo-zatorowej (VTE), będąc lekiem z wyboru u kobiet z otyłością, nadciśnieniem i cukrzycą.',
      },
    ],
    table: {
      caption: 'Porównanie substytucji w POI oraz terapii menopauzalnej MHT',
      headers: ['Parametr', 'Przedwczesna niewydolność jajników (POI)', 'Hormonalna terapia menopauzalna (MHT)'],
      rows: [
        ['Wiek pacjentki', 'Poniżej 40. roku życia', 'Około 50. roku życia i powyżej'],
        ['Dawka estradiolu', 'Wysoka (np. 2 mg doustnie lub 75–100 mcg plaster)', 'Niska do standardowej (np. 1 mg doustnie lub 25–50 mcg plaster)'],
        ['Czas trwania', 'Obowiązkowo do ok. 51. roku życia (fizjologiczna menopauza)', 'Indywidualnie, zależnie od objawów i bilansu korzyści/ryzyka'],
        ['Główny cel', 'Prewencja zawału, osteoporozy i demencji w młodym wieku', 'Zwalczanie uciążliwych objawów naczynioruchowych i ochrona kości'],
        ['Ochrona endometrium', 'Konieczny progesteron (np. mikronizowany 200 mg)', 'Konieczny progesteron, chyba że pacjentka po histerektomii'],
      ],
    },
    advanced:
      'U kobiet z zachowaną macicą monoterapia samymi estrogenami jest bezwzględnie przeciwwskazana ze względu na gwałtowny, 8–10-krotny wzrost ryzyka raka endometrium w mechanizmie niekontrolowanej proliferacji. Dołączenie progestagenu przez co najmniej 12–14 dni w miesiącu (schemat sekwencyjny) lub codziennie (schemat ciągły złożony) całkowicie eliminuje to ryzyko.',
    summary:
      'POI definiuje wiek <40 i FSH >25 IU/l w 2 pomiarach; wymaga pełnej substytucji do 51. r.ż. MHT w oknie <10 lat od menopauzy chroni układ krążenia i kości. Droga przezskórna minimalizuje ryzyko VTE.',
    sourceIds: ['eshre-poi-2024', 'ptgip-nieplodnosc-2024'],
    questions: [
      q(
        'Jakie kryteria laboratoryjne wg wytycznych ESHRE 2024 definiują przedwczesną niewydolność jajników (POI)?',
        ['FSH > 25 IU/l potwierdzone w dwóch niezależnych oznaczeniach w odstępie 4–6 tygodni przed 40. r.ż.', 'Wymóg dwukrotnego potwierdzenia wyklucza przejściowe fluktuacje stężenia gonadotropin.'],
        ['Jednorazowe stężenie estradiolu > 300 pg/ml w dowolnym dniu cyklu', 'POI charakteryzuje się głębokim niedoborem estradiolu, a nie hiperestrogenizmem.'],
        ['FSH < 2,0 IU/l oraz LH < 1,0 IU/l u kobiety przed 50. rokiem życia', 'To obraz hipogonadyzmu hipogonadotropowego (np. FHA), a nie POI.'],
      ),
      q(
        'Do jakiego wieku kobieta z rozpoznaną POI powinna bezwzględnie kontynuować substytucję hormonalną?',
        ['Co najmniej do średniego wieku naturalnej menopauzy (ok. 50–51 lat)', 'Celem jest zastąpienie fizjologicznej obecności hormonów do naturalnego wieku wygaśnięcia funkcji.'],
        ['Jedynie przez 6 miesięcy od rozpoznania, aby nie uszkodzić wątroby', 'Zaniechanie terapii przed 50. r.ż. prowadzi do wczesnej osteoporozy i zgonu sercowego.'],
        ['Dokładnie do momentu osiągnięcia 35. roku życia', 'Wycofanie hormonów w wieku 35 lat byłoby błędem sztuki medycznej.'],
      ),
      q(
        'Dlaczego u pacjentki z zachowaną macicą NIE WOLNO stosować monoterapii samymi estrogenami?',
        ['Brak progestagenu prowadzi do niekontrolowanego rozrostu i raka endometrium', 'Estrogeny stymulują mitozy komórek błony śluzowej, progestagen hamuje rozrost.'],
        ['Estrogeny w monoterapii wywołują natychmiastową ostrą niewydolność nerek', 'Estrogeny nie uszkadzają bezpośrednio miąższu nerkowego.'],
        ['Monoterapia estrogenowa całkowicie niszczy receptory w mózgu', 'Estrogeny działają neuroprotekcyjnie na ośrodkowy układ nerwowy.'],
      ),
      q(
        'Jaka droga podania estradiolu w MHT jest preferowana u pacjentki otyłej (BMI 33) z żylakami kończyn dolnych?',
        ['Droga przezskórna (plaster lub żel na skórę)', 'Omija metabolizm wątrobowy, nie aktywuje czynników krzepnięcia i nie zwiększa ryzyka VTE.'],
        ['Droga doustna w tabletkach powlekanych', 'Doustny estradiol pobudza syntezę białek krzepnięcia w wątrobie, podnosząc ryzyko VTE.'],
        ['Droga doodbytnicza w postaci czopków glicerynowych', 'Nie jest standardową ani kontrolowaną drogą substytucji estradiolu.'],
      ),
      q(
        'Co oznacza pojęcie „okna możliwości terapeutycznych” (timing hypothesis) w kontekście MHT?',
        ['Wdrożenie MHT u kobiet poniżej 60. r.ż. lub w ciągu 10 lat od menopauzy daje korzyści sercowo-naczyniowe', 'Wczesne wdrożenie zapobiega miażdżycy, podczas gdy późne wdrożenie po 10 latach może nasilać powikłania.'],
        ['Stosowanie MHT jest dozwolone wyłącznie w pierwszych 3 miesiącach roku kalendarzowego', 'Koncepcja dotyczy wieku i czasu od menopauzy, a nie pory roku.'],
        ['Konieczność podawania hormonów dokładnie o godzinie 8:00 rano', 'Chodzi o lata biologiczne pacjentki, a nie porę dnia.'],
      ),
    ],
  },
  {
    id: 'gonady-ivf-art',
    title: 'Wspomagany rozród (ART/IVF) i zespół hiperstymulacji (OHSS)',
    group: 'Ginekologia endokrynologiczna',
    readTime: '13 min',
    goals: [
      'Poznać protokoły stymulacji mnogiego wzrostu pęcherzyków (protokół z antagonistą GnRH vs długi).',
      'Zrozumieć patofizjologię zespołu hiperstymulacji jajników (OHSS) zależnego od VEGF.',
      'Opanować metody prewencji OHSS: trigger agonistą GnRH i strategię freeze-all.',
    ],
    sections: [
      {
        title: 'Protokoły stymulacji jajników w procedurach ART',
        content:
          'Celem kontrolowanej hiperstymulacji jajników (COS) w programach in vitro (IVF/ICSI) jest pozyskanie optymalnej liczby dojrzałych oocytów (zwykle 10–15). Standardem współczesnej medycyny rozrodu jest protokół z antagonistą GnRH (ganireliks, cetroreliks). Antagonista podawany od 5.–6. dnia stymulacji gonadotropinami (rFSH/hMG) natychmiast blokuje receptory w przysadce, zapobiegając przedwczesnemu wyrzutowi LH. Protokół ten jest krótszy, bezpieczniejszy i cechuje się znacznie mniejszym ryzykiem OHSS niż starszy protokół długi z agonistą GnRH.',
      },
      {
        title: 'Patogeneza i powikłania zespołu OHSS',
        content:
          'Zespół hiperstymulacji jajników (OHSS — Ovarian Hyperstimulation Syndrome) jest najgroźniejszym powikłaniem jatrogennym stymulacji owulacji. Kluczowym czynnikiem wyzwalającym jest podanie ludzkiej gonadotropiny kosmówkowej (hCG) jako triggera dojrzewania oocytów. Komórki ziarniste masowo wydzielają naczyniowo-śródbłonkowy czynnik wzrostu (VEGF), co prowadzi do uogólnionej patologicznej przepuszczalności naczyń krwionośnych. Płyn ucieka do trzeciej przestrzeni, powodując: wodobrzusze (ascites), płyn w jamach opłucnowych, hipowolemię wewnątrznaczyniową, hemokoncentrację (hematokryt > 45–50%), spadek perfuzji nerek (oliguria/anuria) oraz masywne ryzyko zakrzepicy żylnej i tętniczej.',
      },
      {
        title: 'Prewencja OHSS: agonista GnRH i freeze-all',
        content:
          'U pacjentek z grupy wysokiego ryzyka OHSS (młody wiek, szczupła budowa, fenotyp PCOS, wysoka rezerwa AMH > 3,5 ng/ml, liczba pęcherzyków antralnych AFC > 20, stężenie estradiolu w dniu triggera > 3000–4000 pg/ml lub > 18–20 pęcherzyków w USG) nie wolno podawać hCG jako triggera! Zamiast hCG stosuje się bolus agonisty GnRH (np. tryptorelina 0,2 mg), który wywołuje krótki endogenny wyrzut LH, bez długiego okresu półtrwania hCG. Równocześnie rezygnuje się ze świeżego transferu zarodka, witryfikując wszystkie zarodki (strategia freeze-all) do późniejszego transferu w cyklu naturalnym.',
      },
    ],
    table: {
      caption: 'Klasyfikacja ciężkości zespołu hiperstymulacji jajników (OHSS)',
      headers: ['Stopień ciężkości', 'Objawy kliniczne', 'Wskaźniki laboratoryjne', 'Postępowanie'],
      rows: [
        ['Łagodny', 'Wzdęcie brzucha, lekki ból, powiększenie jajników < 8 cm', 'Prawidłowe parametry krwi', 'Leczenie ambulatoryjne, nawodnienie doustne'],
        ['Umiarkowany', 'Nudności, wymioty, wodobrzusze widoczne w USG, jajniki 8–12 cm', 'Brak ciężkiej hemokoncentracji', 'Ścisły nadzór ambulatoryjny/szpitalny'],
        ['Ciężki', 'Kliniczne wodobrzusze, duszność, jajniki > 12 cm, skąpomocz', 'Hct > 45%, leukocytoza, wzrost kreatyniny', 'Hospitalizacja, wlewy albuminy, heparyna HDCz'],
        ['Krytyczny', 'Napięte wodobrzusze, płyn w opłucnej, anuria, zatorowość', 'Hct > 55%, niewydolność nerek i wątroby', 'Oddział intensywnej terapii (OIT), punkcja odbarczająca'],
      ],
    },
    advanced:
      'W leczeniu objawowym umiarkowanego i ciężkiego OHSS stosuje się kabergolinę (agonistę receptora dopaminowego D2 w dawce 0,5 mg/dobę przez 8 dni), która bezpośrednio hamuje fosforylację receptora VEGFR-2, zmniejszając przesiąkanie naczyniowe. Wlew albuminy 20% uzupełnia ciśnienie onkotyczne i zapobiega hipowolemii.',
    summary:
      'OHSS wynika z masywnego wyrzutu VEGF po podaniu hCG. Prowadzi do przesięków, hemokoncentracji i zakrzepicy. U pacjentek z PCOS i wysokim estradiolem trigger agonistą GnRH i freeze-all ratują życie.',
    sourceIds: ['eshre-art-ohss-2024', 'pcos-guideline-2023', 'ptgip-nieplodnosc-2024'],
    questions: [
      q(
        'Jaki mediator naczyniowy odpowiada za uogólnioną przepuszczalność naczyń i wodobrzusze w zespole OHSS?',
        ['Naczyniowo-śródbłonkowy czynnik wzrostu (VEGF)', 'VEGF fosforyluje kadheryny śródbłonka, powodując masywny ubytek płynu do trzeciej przestrzeni.'],
        ['Hormon antydiuretyczny (wazopresyna AVP)', 'Wazopresyna odpowiada za wchłanianie wody w nerkach, nie za przesięki naczyniowe.'],
        ['Parathormon (PTH)', 'PTH reguluje gospodarkę wapniowo-fosforanową, bez wpływu na naczynia w OHSS.'],
      ),
      q(
        'U pacjentki z PCOS podczas stymulacji stwierdzono 24 dojrzałe pęcherzyki i estradiol 4800 pg/ml. Jak zapobiec ciężkiemu OHSS?',
        ['Zastosować trigger agonistą GnRH zamiast hCG i zamrozić wszystkie zarodki (freeze-all)', 'Eliminacja hCG i transferu zarodka przerywa kaskadę VEGF i zapobiega późnemu OHSS.'],
        ['Podać podwójną dawkę hCG (20 000 j.m.) i wykonać natychmiastowy transfer', 'Podanie wysokiej dawki hCG wywołałoby zagrażający życiu stan krytycznego OHSS.'],
        ['Podać dożylnie 5 litrów czystej wody w ciągu 2 godzin', 'Doprowadziłoby to do obrzęku mózgu w wyniku skrajnej hiponatremii.'],
      ),
      q(
        'Dlaczego ciąża uzyskana w cyklu ze świeżym transferem nasila i wydłuża zespół OHSS (tzw. późny OHSS)?',
        ['Pojawiające się łożyskowe beta-hCG podtrzymuje i dramatycznie napędza produkcję VEGF w jajnikach', 'Endogenne hCG zagnieżdżonego trofoblastu wyzwala ciężki, przewlekły rzut późnego OHSS.'],
        ['Płód zaczyna wydzielać do krwiobiegu matki duże ilości reniny i aldosteronu', 'To nie renina płodu odpowiada za patomechanizm późnego OHSS.'],
        ['Endometrium w ciąży staje się całkowicie nieprzepuszczalne dla płynów', 'Brak związku z patofizjologią zespołu hiperstymulacji.'],
      ),
      q(
        'Jaki lek dopaminergiczny stosuje się w prewencji OHSS w celu zablokowania receptora VEGFR-2?',
        ['Kabergolina', 'Agonista receptora dopaminowego D2 hamuje aktywację szlaku VEGF w komórkach śródbłonka.'],
        ['Metformina', 'Metformina poprawia wrażliwość na insulinę, lecz nie blokuje natychmiast VEGFR-2.'],
        ['Bromokryptyna w dawkach toksycznych', 'Kabergolina ma znacznie lepszy profil bezpieczeństwa i udowodnioną skuteczność w OHSS.'],
      ),
      q(
        'Który parametr laboratoryjny w ciężkim OHSS jest wyznacznikiem zagrażającej zakrzepicy i hemokoncentracji?',
        ['Wzrost hematokrytu (Hct > 45–50%) i leukocytoza', 'Ucieczka osocza do jam ciała zagęszcza elementy morfotyczne krwi, grożąc udarem i zatorowością.'],
        ['Spadek hematokrytu poniżej 20% z ciężką niedokrwistością aplastyczną', 'W OHSS dochodzi do zagęszczenia (hemokoncentracji), a nie rozcieńczenia krwi.'],
        ['Spadek stężenia fibrynogenu do zera', 'Układ krzepnięcia jest w stanie skrajnej aktywacji prozakrzepowej.'],
      ),
    ],
  },
  {
    id: 'gonady-onkoplednosc',
    title: 'Onkopłodność (oncofertility) i zabezpieczenie rozrodu',
    group: 'Ginekologia endokrynologiczna',
    readTime: '12 min',
    goals: [
      'Poznać gonadotoksyczny wpływ chemioterapii (zwłaszcza leków alkilujących) i radioterapii.',
      'Znać metody zabezpieczenia płodności u kobiet (witryfikacja oocytów/zarodków, mrożenie tkanki jajnikowej).',
      'Znać metody zabezpieczenia płodności u mężczyzn i rolę analogów GnRH w onkologii.',
    ],
    sections: [
      {
        title: 'Gonadotoksyczność leczenia przeciwnowotworowego',
        content:
          'Chemioterapia i radioterapia u dzieci i młodych dorosłych niosą wysokie ryzyko trwałej bezpłodności i przedwczesnego wygasania czynności gonad. Najbardziej gonadotoksyczne są leki alkilujące (cyklofosfamid, ifosfamid, busulfan), które wywołują pęknięcia podwójnej nici DNA w dzielących się spermatogoniach oraz przyspieszają apoptozę nieodnawialnej puli pierwotnych pęcherzyków jajnikowych. Ryzyko zależy od dawki skumulowanej (np. CED — Cyclophosphamide Equivalent Dose) oraz wieku pacjenta.',
      },
      {
        title: 'Zabezpieczenie płodności u kobiet',
        content:
          'Złotym standardem zabezpieczenia płodności u dojrzałych kobiet przed wdrożeniem leczenia gonadotoksycznego jest kontrolowana stymulacja jajników i witryfikacja dojrzałych oocytów (MII) lub zarodków. Współczesne protokoły random-start umożliwiają rozpoczęcie stymulacji w dowolnym dniu cyklu bez opóźniania chemioterapii. U dziewczynek przed pokwitaniem oraz pacjentek wymagających natychmiastowego leczenia jedyną opcją jest laparoskopowe pobranie i mrożenie kory jajnika (OTC — Ovarian Tissue Cryopreservation) z późniejszym autoprzeszczepieniem.',
      },
      {
        title: 'Zabezpieczenie płodności u mężczyzn i analogi GnRH',
        content:
          'U mężczyzn po pokwitaniu procedurą z wyboru jest kriokonserwacja nasienia (najlepiej 2–3 porcji oddanych przed rozpoczęciem chemioterapii). U chłopców przed pokwitaniem bada się eksperymentalne mrożenie tkanki jądrowej zawierającej spermatogonialne komórki macierzyste. Farmakologiczna supresja jajników analogami GnRH (np. goserelina) w trakcie chemioterapii raka piersi zmniejsza ryzyko trwałego POI o ok. 30–40% i jest rekomendowana jako metoda uzupełniająca.',
      },
    ],
    table: {
      caption: 'Metody zachowania płodności w onkologii (Oncofertility)',
      headers: ['Płeć i wiek', 'Metoda z wyboru', 'Czas wymagany do wdrożenia', 'Status kliniczny'],
      rows: [
        ['Kobiety dorosłe', 'Witryfikacja oocytów lub zarodków (protokół random-start)', '10–14 dni', 'Złoty standard rekomendowany przez ESHRE/ASRM'],
        ['Dziewczynki przed pokwitaniem', 'Mrożenie tkanki kory jajnika (OTC) i późniejsza autotransplantacja', '1–2 dni (laparoskopia)', 'Metoda uznana za standard kliniczny (nieeksperymentalna)'],
        ['Mężczyźni dorośli', 'Kriokonserwacja nasienia z ejakulatu', '1–3 dni', 'Złoty standard, wysoka skuteczność po rozmrożeniu'],
        ['Chłopcy przed pokwitaniem', 'Kriokonserwacja tkanki jądrowej z komórkami macierzystymi', '1–2 dni (biopsja)', 'Metoda eksperymentalna'],
      ],
    },
    advanced:
      'W przypadku pacjentek z rakiem piersi hormonozależnym (ER+) poddawanych stymulacji jajników do witryfikacji oocytów, do protokołu gonadotropin bezwzględnie dołącza się letrozol (5 mg/dobę). Letrozol drastycznie obniża stężenie krążącego estradiolu w trakcie stymulacji, eliminując ryzyko progresji guza bez negatywnego wpływu na jakość pobieranych komórek jajowych.',
    summary:
      'Leki alkilujące niszczą pulę komórek rozrodczych. U kobiet metodą z wyboru jest witryfikacja oocytów (protokół random-start + letrozol w raku piersi) lub kory jajnika, u mężczyzn krio-bankowanie nasienia.',
    sourceIds: ['eshre-art-ohss-2024', 'ptgip-nieplodnosc-2024'],
    questions: [
      q(
        'Która grupa chemioterapeutyków wykazuje NAJWYŻSZĄ gonadotoksyczność i ryzyko trwałej bezpłodności?',
        ['Leki alkilujące (np. cyklofosfamid, ifosfamid, busulfan)', 'Uszkadzają podwójną nić DNA bezpośrednio w pęcherzykach pierwotnych i spermatogoniach.'],
        ['Antymetabolity (np. metotreksat w niskiej dawce)', 'Mają znacznie niższy wskaźnik trwałego zniszczenia puli rezerwowej komórek rozrodczych.'],
        ['Przeciwciała monoklonalne anty-HER2 (trastuzumab)', 'Terapia celowana nie wykazuje klasycznej gonadotoksyczności leków alkilujących.'],
      ),
      q(
        'Na czym polega protokół „random-start” w stymulacji jajników u pacjentki onkologicznej?',
        ['Rozpoczęcie stymulacji gonadotropinami w dowolnym dniu cyklu bez czekania na miesiączkę', 'Pozwala uniknąć opóźnienia chemioterapii ratującej życie, dając oocyty po 10–12 dniach.'],
        ['Losowym dobieraniu dawki leku każdego dnia przez rzut kością', 'To absurdalna definicja; termin odnosi się do fazy cyklu miesiączkowego.'],
        ['Pobieraniu oocytów bez jakiejkolwiek stymulacji hormonalnej z losowego jajnika', 'Protokół wymaga pełnej stymulacji hormonalnej gonadotropinami.'],
      ),
      q(
        'Dlaczego u pacjentki z rakiem piersi z obecnością receptorów estrogenowych (ER+) do stymulacji dodaje się letrozol?',
        ['Aby utrzymać niskie stężenie estradiolu w surowicy i zapobiec stymulacji komórek nowotworu', 'Inhibitor aromatazy obniża estradiol, chroniąc pacjentkę przed hiperestrogenizmem stymulacji.'],
        ['Letrozol całkowicie niszczy pęcherzyki jajnikowe, ułatwiając punkcję', 'Letrozol nie niszczy pęcherzyków, lecz hamuje obwodową konwersję do estrogenów.'],
        ['W celu przyspieszenia degradacji komórek jajowych', 'Celem procedury jest pozyskanie zdrowych i dojrzałych oocytów.'],
      ),
      q(
        'Jaka jest jedyna dostępna metoda zabezpieczenia płodności u dziewczynki przed okresem pokwitania?',
        ['Laparoskopowe pobranie i mrożenie kory jajnika (OTC) z późniejszym przeszczepieniem', 'Przed pokwitaniem nie można przeprowadzić stymulacji owulacji i pobrania dojrzałych oocytów.'],
        ['Podanie wysokiej dawki testosteronu undekanianu', 'Testosteron nie zabezpiecza płodności u dzieci.'],
        ['Stymulacja owulacji i pobranie 30 oocytów z pochwy', 'Przed menarche stymulacja przezpochwowa jest anatomicznie i biologicznie niemożliwa.'],
      ),
      q(
        'Kiedy należy pobrać i zamrozić nasienie u młodego mężczyzny z nowo rozpoznanym chłoniakiem Hodgkina?',
        ['Przed rozpoczęciem jakiejkolwiek chemioterapii lub radioterapii', 'Nawet pojedynczy cykl chemioterapii może wywołać mutacje DNA i fragmentację chromatyny nasienia.'],
        ['Dokładnie 2 dni po zakończeniu pełnego cyklu chemioterapii', 'Po chemioterapii nasienie jest uszkodzone genetycznie lub występuje azoospermia.'],
        ['Dopiero po 5 latach pełnej remisji onkologicznej', 'Po 5 latach pacjent może mieć trwały brak plemników w ejakulacie.'],
      ),
    ],
  },
  {
    id: 'gonady-trans-feminizujaca',
    title: 'Hormonoterapia feminizująca (GAHT) i monitorowanie',
    group: 'Hormonoterapia tranzycyjna i zaburzenia rozwojowe',
    readTime: '13 min',
    goals: [
      'Znać cele hormonalne i wytyczne WPATH SOC-8 / Endocrine Society dla terapii feminizującej.',
      'Opanować schematy estrogenów (17-beta-estradiol) i antyandrogenów (octan cyproteronu, spironolakton, analogi GnRH).',
      'Nauczyć się monitorowania bezpieczeństwa: ryzyko żylnej choroby zakrzepowo-zatorowej (VTE) i hiperprolaktynemii.',
    ],
    sections: [
      {
        title: 'Cele i zasady terapii feminizującej',
        content:
          'Gender-Affirming Hormone Therapy (GAHT) u transpłciowych kobiet ma na celu wywołanie cech kobiecych (rozwój piersi, zmiana dystrybucji tkanki tłuszczowej, spadek masy mięśniowej, zmniejszenie owłosienia ciała) przy jednoczesnym zahamowaniu endogennych cech męskich. Zgodnie z wytycznymi Endocrine Society i WPATH SOC-8, cele biochemiczne obejmują: obniżenie stężenia testosteronu całkowitego do zakresu kobiecego (< 50 ng/dl lub < 1,7 nmol/l) oraz utrzymanie stężenia estradiolu w granicach fizjologicznej fazy folikularnej (100–200 pg/ml lub 360–730 pmol/l).',
      },
      {
        title: 'Preparaty: 17-beta-estradiol i blokery androgenowe',
        content:
          'Stosuje się wyłącznie bioidentyczny 17-beta-estradiol (doustny, podjęzykowy, w żelu lub plastrach). Etynyloestradiol i sprzężone estrogeny końskie są bezwzględnie przeciwwskazane z powodu wielokrotnie wyższego ryzyka zakrzepowo-zatorowego. Ponieważ same estrogeny w bezpiecznych dawkach rzadko tłumią testosteron < 50 ng/dl, dołącza się antyandrogen: analogi GnRH (złoty standard — całkowita supresja gonadotropin), octan cyproteronu (CPA — progestagen o silnym działaniu antygonadotropowym i blokującym receptor AR w małych dawkach 10–12,5 mg/d) lub spironolakton (antagonista receptora aldosteronowego i AR).',
      },
      {
        title: 'Bezpieczeństwo: VTE, oponiaki i hiperprolaktynemia',
        content:
          'Głównym zagrożeniem bezpieczeństwa jest żylna choroba zakrzepowo-zatorowa (VTE). Droga przezskórna estradiolu minimalizuje to ryzyko i jest lekiem z wyboru u osób powyżej 40. r.ż., palących tytoń lub z otyłością. Przy stosowaniu octanu cyproteronu (CPA) należy monitorować stężenie prolaktyny (ryzyko hiperprolaktynemii i rzadkich oponiaków mózgu — *meningioma*, szczególnie przy skumulowanych dawkach). Monitoruje się również próby wątrobowe i elektrolity (potas przy spironolaktonie).',
      },
    ],
    table: {
      caption: 'Cele laboratoryjne i monitorowanie w terapii feminizującej wg Endocrine Society',
      headers: ['Parametr hormonalny / metaboliczny', 'Docelowy zakres stężeń', 'Częstość kontroli', 'Potencjalne powikłanie / uwaga'],
      rows: [
        ['Testosteron całkowity', '< 50 ng/dl (< 1,7 nmol/l)', 'Co 3 miesiące w 1. roku, potem co 6–12 mies.', 'Niedostateczna supresja wymaga korekty antyandrogenu'],
        ['17-beta-estradiol', '100–200 pg/ml (360–730 pmol/l)', 'Co 3 miesiące w 1. roku, potem co 6–12 mies.', 'Unikać stężeń suprafizjologicznych (> 300–400 pg/ml)'],
        ['Prolaktyna (PRL)', '< 2-krotność górnej granicy normy', 'Wyjściowo i okresowo przy CPA', 'Wzrost > 100 ng/ml wymaga MRI przysadki / odstawienia CPA'],
        ['Potas w surowicy', '3,5–5,0 mmol/l', 'Wyjściowo i po 3 mies. przy spironolaktonie', 'Ryzyko hiperkaliemii u pacjentek z niewydolnością nerek'],
        ['Ciśnienie tętnicze i masa ciała', '< 130/80 mmHg, profil lipidowy', 'Podczas każdej wizyty kontrolnej', 'Wzrost retencji płynów i zmiana profilu lipidowego'],
      ],
    },
    advanced:
      'Octan cyproteronu (CPA) w dawkach historycznych (50–100 mg/dobę) wiązał się z wysokim ryzykiem oponiaków i hepatotoksyczności. Nowoczesne wytyczne europejskie i WPATH jednoznacznie zalecają niskie dawki CPA (10 mg co drugi dzień lub 10–12,5 mg/dobę), które wykazują pełną skuteczność antyandrogenną przy minimalnym profilu ryzyka.',
    summary:
      'Feminizująca GAHT opiera się na 17-beta-estradiolu (cel: 100–200 pg/ml) i blokerze androgenowym (cel: T < 50 ng/dl). Droga przezskórna chroni przed VTE. Należy kontrolować prolaktynę i unikać etynyloestradiolu.',
    sourceIds: ['wpath-soc8-2022', 'endo-trans-2017'],
    questions: [
      q(
        'Jaki jest docelowy poziom stężenia testosteronu całkowitego w feminizującej terapii hormonalnej u transpłciowych kobiet?',
        ['Poniżej 50 ng/dl (< 1,7 nmol/l — zakres typowy dla kobiet cispłciowych)', 'Celem jest eliminacja stymulacji androgenowej i maskulinizacji.'],
        ['W granicach 300–450 ng/dl', 'To dolna granica normy dla mężczyzn, a nie cel feminizacji.'],
        ['Całkowicie niewykrywalny równy 0,000 ng/dl', 'U kobiet fizjologicznie występuje niewielkie stężenie testosteronu produkowanego przez nadnercza.'],
      ),
      q(
        'Który preparat estrogenowy jest BEZWZGLĘDNIE PRZECIWWSKAZANY w terapii tranzycyjnej ze względu na wysokie ryzyko zakrzepicy VTE?',
        ['Syntetyczny etynyloestradiol (zawarty w starych pigułkach antykoncepcyjnych)', 'Wykazuje silny efekt prozakrzepowy i nie podlega monitorowaniu stężenia estradiolu w surowicy.'],
        ['17-beta-estradiol podawany w postaci żelu przezskórnego', 'Jest najbezpieczniejszym bioidentycznym preparatem o minimalnym ryzyku VTE.'],
        ['Walerian estradiolu podawany doustnie w dawce 2 mg', 'Jest dopuszczonym bioidentycznym estrem 17-beta-estradiolu.'],
      ),
      q(
        'Jaki jest docelowy zakres stężenia 17-beta-estradiolu w surowicy wg wytycznych Endocrine Society i WPATH?',
        ['100–200 pg/ml (360–730 pmol/l)', 'Odpowiada fizjologicznej fazie folikularnej, zapewniając feminizację bez nadmiernego ryzyka powikłań.'],
        ['Powyżej 1000 pg/ml', 'Tak wysokie stężenia są niebezpieczne i suprafizjologiczne.'],
        ['Poniżej 20 pg/ml', 'To stężenie hipoestrogenne odpowiadające menopauzie, uniemożliwiające feminizację.'],
      ),
      q(
        'Co należy monitorować u pacjentki przyjmującej octan cyproteronu (CPA) jako antyandrogen?',
        ['Stężenie prolaktyny w surowicy oraz próby wątrobowe', 'CPA może stymulować laktotrofy przysadki i wywoływać hiperprolaktynemię oraz oponiaki.'],
        ['Stężenie kwasu moczowego i wapnia w dobowej zbiórce moczu', 'Nie są to parametry specyficzne dla monitorowania leczenia CPA.'],
        ['Stężenie hormonu wzrostu i IGF-1 co 2 tygodnie', 'CPA nie zaburza bezpośrednio osi somatotropowej.'],
      ),
      q(
        'U 44-letniej transpłciowej kobiety z otyłością i palącej papierosy, jaka droga podania estradiolu jest najbezpieczniejsza?',
        ['Droga przezskórna (system transdermalny / żel)', 'Omija pierwsze przejście przez wątrobę i nie nasila krzepnięcia krwi u pacjentki z czynnikami ryzyka.'],
        ['Doustne tabletki z etynyloestradiolem', 'To zestawienie stwarza skrajnie wysokie, zagrażające życiu ryzyko zakrzepicy żył głębokich i zatoru płucnego.'],
        ['Doustny estradiol w dawce 8 mg na dobę', 'Droga doustna u palaczki po 40. r.ż. istotnie zwiększa ryzyko zakrzepicy.'],
      ),
    ],
  },
  {
    id: 'gonady-trans-maskulinizujaca',
    title: 'Hormonoterapia maskulinizująca (GAHT) i bezpieczeństwo',
    group: 'Hormonoterapia tranzycyjna i zaburzenia rozwojowe',
    readTime: '13 min',
    goals: [
      'Znać cele terapeutyczne i docelowe stężenia testosteronu u transpłciowych mężczyzn wg WPATH SOC-8 i Endocrine Society.',
      'Opanować preparaty testosteronu (undekanian, enantan/cypionian, żele) i dynamikę zmian fenotypowych.',
      'Zrozumieć monitorowanie bezpieczeństwa: erytrocytozę (hematokryt > 50–54%), lipidy, ginekologię i konwersję do DHT/E2.',
    ],
    sections: [
      {
        title: 'Cele i kinetyka maskulinizacji',
        content:
          'Gender-Affirming Hormone Therapy (GAHT) u transpłciowych mężczyzn polega na podawaniu egzogennego testosteronu w celu indukcji cech męskich (obniżenie tonu głosu, rozwój zarostu twarzy i owłosienia ciała, przyrost beztłuszczowej masy mięśniowej, redystrybucja tkanki tłuszczowej, klitoromegalia) oraz supresji cech żeńskich, w tym zatrzymania krwawień miesięcznych (amenorrhea następuje zazwyczaj w ciągu 2–6 miesięcy). Zgodnie z wytycznymi Endocrine Society i WPATH SOC-8, docelowe stężenie testosteronu całkowitego powinno mieścić się w fizjologicznym zakresie dla cispłciowych mężczyzn (400–700 ng/dl lub 14–24 nmol/l).',
      },
      {
        title: 'Preparaty i schematy dawkowania',
        content:
          'Stosuje się estry testosteronu o przedłużonym działaniu: testosteron undekanian i.m. (1000 mg co 10–14 tygodni, zapewniający stabilne stężenia bez wahań), testosteron enantan lub cypionian (50–100 mg co tydzień lub 100–200 mg co 2 tygodnie podawane głęboko domięśniowo lub podskórnie s.c.) oraz preparaty przezskórne w postaci żelu 1% lub 1,62% (50–100 mg testosteronu/dobę). Wstrzyknięcia podskórne (s.c.) wykazują identyczną farmakokinetykę i skuteczność jak iniekcje domięśniowe, przy znacznie mniejszej bolesności.',
      },
      {
        title: 'Bezpieczeństwo: erytrocytoza, lipidy i atrofia',
        content:
          'Najważniejszym powikłaniem wymagającym regularnego monitorowania jest erytrocytoza indukowana testosteronem (stymulacja erytropoetyny EPO w nerkach i hamowanie hepcydyny). Hematokryt (Hct) > 50% wymaga czujności, a Hct > 54% bezwzględnej interwencji (zmniejszenie dawki, zmiana preparatu z iniekcyjnego na przezskórny, flebotomia odbarczająca) z uwagi na skrajne ryzyko zakrzepicy, udaru i zawału. Inne obszary monitorowania to: profil lipidowy (spadek HDL, wzrost LDL), ciśnienie tętnicze, próby wątrobowe oraz zanikowe zapalenie pochwy (leczone miejscowym estriolem bez działania ogólnoustrojowego).',
      },
    ],
    table: {
      caption: 'Kinetyka zmian fenotypowych i monitorowanie w maskulinizującej GAHT',
      headers: ['Efekt kliniczny / badanie', 'Początek działania', 'Maksymalny efekt', 'Odwracalność po odstawieniu'],
      rows: [
        ['Trądzik i przetłuszczanie skóry', '1–6 miesięcy', '1–2 lata', 'Odwracalny'],
        ['Zatrzymanie miesiączki', '2–6 miesięcy', 'Przeważnie < 6 miesięcy', 'Odwracalne'],
        ['Obniżenie głosu (mutacja)', '3–12 miesięcy', '1–2 lata', 'Nieodwracalne'],
        ['Klitoromegalia (rozrost łechtaczki)', '3–12 miesięcy', '1–2 lata', 'Nieodwracalna'],
        ['Rozwój owłosienia twarzy i ciała', '6–12 miesięcy', '3–5 lat', 'Nieodwracalny / częściowy'],
        ['Hematokryt (Hct) — cel < 50–52%', 'Co 3 mies. w 1. roku', 'Co 6–12 mies. przewlekle', 'Hct > 54%: redukcja dawki / flebotomia'],
      ],
    },
    advanced:
      'W tkankach docelowych testosteron ulega redukcji do silniejszego dihydrotestosteronu (DHT) przez enzym 5-alfa-reduktazę (SRD5A2). To DHT odpowiada za łysienie androgenowe typu męskiego, rozwój zarostu oraz klitoromegalię. Zastosowanie finasterydu (inhibitora 5-AR) może zapobiec łysieniu, lecz jednocześnie hamuje pożądany rozrost zarostu. Nadmiar testosteronu może ulegać obwodowej aromatyzacji do estradiolu (CYP19A1), co paradoksalnie wywołuje nawrót plamień lub tkliwość piersi.',
    summary:
      'Maskulinizująca GAHT dąży do T 400–700 ng/dl. Obniżenie głosu i klitoromegalia są nieodwracalne. Głównym ryzykiem jest erytrocytoza (Hct > 54% grozi zawałem/udarem i wymaga redukcji dawki lub flebotomii).',
    sourceIds: ['wpath-soc8-2022', 'endo-trans-2017'],
    questions: [
      q(
        'Jaki jest docelowy zakres stężenia testosteronu całkowitego u transpłciowego mężczyzny w GAHT?',
        ['Fizjologiczny zakres referencyjny dla dorosłych cispłciowych mężczyzn (400–700 ng/dl)', 'Terapia ma zapewnić prawidłowy męski profil hormonalny bez stężeń suprafizjologicznych.'],
        ['Poniżej 50 ng/dl, aby chronić narządy rodne', 'To zakres typowy dla kobiet, uniemożliwiający maskulinizację.'],
        ['Powyżej 2500 ng/dl w celu jak najszybszej mutacji głosu', 'Suprafizjologiczne stężenia grożą ciężką zakrzepicą, zawałem i udarem.'],
      ),
      q(
        'Który z wymienionych objawów maskulinizacji jest NIEODWRACALNY po odstawieniu testosteronu?',
        ['Obniżenie barwy głosu (mutacja krtani) oraz powiększenie łechtaczki', 'Zarówno przebudowa chrząstek krtani, jak i klitoromegalia pozostają trwałe na całe życie.'],
        ['Trądzik i łojotok skóry twarzy', 'Po odstawieniu testosteronu i powrocie do profilu żeńskiego gruczoły łojowe wygaszają aktywność.'],
        ['Brak miesiączki (amenorrhea)', 'Czynność jajników i miesiączkowanie zazwyczaj powracają po zaprzestaniu podawania testosteronu.'],
      ),
      q(
        'Który wskaźnik laboratoryjny jest kluczowy w monitorowaniu bezpieczeństwa i wymaga pilnej interwencji przy wartości > 54%?',
        ['Hematokryt (Hct) z powodu ryzyka powikłań zakrzepowo-zatorowych wywołanych erytrocytozą', 'Testosteron stymuluje EPO i hamuje hepcydynę; Hct > 54% wymaga zmniejszenia dawki lub flebotomii.'],
        ['Stężenie sodu w surowicy krwi', 'Testosteron nie wywołuje skrajnej hipernatremii > 54 mmol/l.'],
        ['Stężenie amylazy trzustkowej', 'Testosteron nie powoduje ostrego zapalenia trzustki.'],
      ),
      q(
        'Co może być przyczyną nawrotu plamień z dróg rodnych u transpłciowego mężczyzny z suprafizjologicznym stężeniem testosteronu (np. 1400 ng/dl)?',
        ['Obwodowa aromatyzacja nadmiaru testosteronu do estradiolu przez enzym CYP19A1 aromatazę', 'Wysokie stężenie estradiolu stymuluje proliferację endometrium i prowadzi do krwawień przełomowych.'],
        ['Całkowity brak jakichkolwiek estrogenów w całym organizmie', 'Niski poziom estrogenów powoduje atrofię, a nie rozrost krwawiącego endometrium.'],
        ['Gwałtowne zwapnienie naczyń wieńcowych serca', 'Zwapnienie tętnic wieńcowych nie ma związku z plamieniami z dróg rodnych.'],
      ),
      q(
        'Jak leczy się objawy zanikowego zapalenia pochwy i sromu u pacjenta na wieloletniej terapii testosteronem?',
        ['Miejscowymi preparatami estriolu lub estradiolu dopochwowo o minimalnym wchłanianiu ogólnym', 'Miejscowe estrogeny regenerują nabłonek pochwy bez wpływu na maskulinizację i stężenie testosteronu.'],
        ['Natychmiastowym podwojeniem dawki domięśniowego testosteronu', 'Zwiększenie testosteronu nasili objawy atrofii urogenitalnej.'],
        ['Całkowitym odstawieniem płynów doustnych', 'Ograniczenie płynów doprowadziłoby do odwodnienia i uszkodzenia nerek.'],
      ),
    ],
  },
];
