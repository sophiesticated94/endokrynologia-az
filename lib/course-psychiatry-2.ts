import { type DraftLesson, q } from './course-types.ts';

export const draftPsychiatryPart2: DraftLesson[] = [
  {
    id: 'neurobiologia-monoaminy',
    moduleId: 'psych-afektywne',
    title: 'Ewolucja hipotezy monoaminowej w depresji',
    subtitle: 'Od stężenia w synapsie do desensytyzacji autoreceptorów 5-HT1A',
    group: 'Neurobiologia i biochemia nastroju',
    minutes: 16,
    goals: [
      'Wyjaśnisz paradoks czasowy między natychmiastowym blokowaniem SERT a opóźnionym efektem klinicznym.',
      'Scharakteryzujesz rolę somatodendrytycznych autoreceptorów 5-HT1A w szlaku serotoninergicznym.',
    ],
    sections: [
      {
        title: 'Paradoks czasowy leków przeciwdepresyjnych',
        text: 'Klasyczna hipoteza monoaminowa z lat 60. zakładała, że depresja wynika z prostego niedoboru serotoniny (5-HT), noradrenaliny (NA) lub dopaminy (DA) w szczelinie synaptycznej. Jednak leki z grupy SSRI blokują transporter serotoniny (SERT) w ciągu zaledwie kilkunastu minut do kilku godzin od podania, podczas gdy zauważalna poprawa nastroju u pacjentów pojawia się dopiero po 2–4 tygodniach. Ten paradoks czasowy jednoznacznie dowodzi, że samo stężenie monoaminy nie jest bezpośrednią przyczyną poprawy.',
      },
      {
        title: 'Mechanizm desensytyzacji autoreceptorów 5-HT1A',
        text: 'W początkowym okresie podawania SSRI serotonina wzrasta nie tylko w synapsach korowych, lecz przede wszystkim w rejonie somatodendrytycznym jąder szwu (raphe nuclei). Tam pobudza hamujące autoreceptory 5-HT1A, co na zasadzie ujemnego sprzężenia zwrotnego zmniejsza częstotliwość wyładowań neuronów serotoninowych i paradoksalnie początkowo ogranicza uwalnianie 5-HT na obwodzie. Dopiero po 2–3 tygodniach ciągłej ekspozycji dochodzi do internalizacji i desensytyzacji (odczulenia) autoreceptorów 5-HT1A, co odblokowuje toniczne uwalnianie serotoniny w korze czołowej i hipokampie.',
      },
      {
        title: 'Przekaźnictwo wewnątrzkomórkowe i epigenetyka',
        text: 'Długofalowy efekt monoamin realizuje się poprzez aktywację szlaków kinaz białkowych (PKA, CaMK) oraz fosforylację czynnika transkrypcyjnego CREB (cAMP response element-binding protein). Prowadzi to do modyfikacji epigenetycznych (acetylacja histonów) i nasilenia transkrypcji genów kodujących czynniki troficzne, w tym BDNF, oraz receptory AMPA.',
      },
    ],
    table: {
      headers: ['Faza terapii', 'Stan autoreceptora 5-HT1A', 'Uwalnianie 5-HT w korze', 'Stan kliniczny'],
      rows: [
        ['Początek (dni 1–5)', 'Silnie pobudzony (hamowanie)', 'Niskie / paradoksalny spadek', 'Działania niepożądane (nudności, lęk), brak poprawy nastroju'],
        ['Adaptacja (dni 7–14)', 'Początek internalizacji', 'Stopniowa normalizacja', 'Spadek lęku wstępnego, pierwsze oznaki stabilizacji snu'],
        ['Remisja (tyg. 3–6)', 'Utrwalona desensytyzacja', 'Wysokie, toniczne uwalnianie', 'Poprawa napędu, redukcja anhedonii, neuroplastyczność'],
      ],
    },
    advanced:
      'Leki o profilu agonisty/częściowego agonisty 5-HT1A (np. buspiron, wilazodon, aripiprazol) lub antagonisty 5-HT7 i 5-HT1A (wortioksetyna) modulują ten układ znacznie szybciej, co stanowi podstawę poszukiwań leków o skróconym czasie latencji terapeutycznej.',
    summary:
      'SSRI natychmiast blokują SERT, lecz hamowanie uwalniania przez somatodendrytyczne receptory 5-HT1A opóźnia efekt. Poprawa kliniczna wymaga 2–4 tygodni na ich desensytyzację i aktywację CREB.',
    sourceIds: ['stahl-essential', 'pet-sert-meyer', 'canmat-mdd-2023'],
    questions: [
      q(
        'Dlaczego efekt przeciwdepresyjny SSRI wymaga 2–4 tygodni, skoro transporter SERT jest blokowany w ciągu kilku godzin?',
        ['Konieczny jest czas na desensytyzację hamujących autoreceptorów 5-HT1A w jądrach szwu', 'Początkowa stymulacja autoreceptorów hamuje wyrzut serotoniny; dopiero ich odczulenie pozwala na trwałe uwalnianie 5-HT.'],
        ['Lek potrzebuje 4 tygodni na przeniknięcie przez barierę krew-mózg', 'SSRI penetrują do OUN w ciągu kilku godzin od wchłonięcia.'],
        ['Wszystkie receptory serotoninowe ulegają natychmiastowemu zniszczeniu', 'Nie dochodzi do zniszczenia receptorów, lecz do adaptacji ich wrażliwości.'],
        'psych-monoaminy-q1'
      ),
      q(
        'Gdzie zlokalizowane są somatodendrytyczne autoreceptory 5-HT1A odpowiedzialne za ujemne sprzężenie w szlaku serotoninowym?',
        ['W jądrach szwu pnia mózgu (raphe nuclei)', 'Ciała neuronów serotoninowych znajdują się w jądrach szwu pnia mózgu.'],
        ['W korze wzrokowej płata potylicznego', 'Kora wzrokowa nie jest ośrodkiem regulacji uogólnionego wyrzutu 5-HT.'],
        ['W rdzeniu nadnerczy', 'Rdzeń nadnerczy produkuje adrenalinę i noradrenalinę, nie 5-HT.'],
        'psych-monoaminy-q2'
      ),
      q(
        'Jaki kluczowy czynnik transkrypcyjny jest aktywowany przez przewlekłą stymulację receptorów monoaminowych sprzężonych z Gs/cAMP?',
        ['CREB (cAMP response element-binding protein)', 'Fosforylacja CREB uruchamia transkrypcję genów neuroplastyczności, w tym BDNF.'],
        ['HIF-1alpha w warunkach normoksji', 'HIF-1 jest czynnikiem indukowanym niedotlenieniem, a nie przekaźnikiem monoamin.'],
        ['Insulinowy FOXO1 w jądrze hepatocyta', 'FOXO1 uczestniczy w glukoneogenezie wątrobowej.'],
        'psych-monoaminy-q3'
      ),
      q(
        'Dlaczego w pierwszych dniach przyjmowania SSRI pacjenci mogą odczuwać przejściowe nasilenie niepokoju i lęku?',
        ['Stymulacja receptorów 5-HT2A i 5-HT2C w ciele migdałowatym przed nastąpieniem adaptacji', 'Początkowy nagły wzrost 5-HT w układzie limbicznym wywołuje lęk do momentu down-regulacji receptorów 5-HT2.'],
        ['Z powodu natychmiastowej hipoglikemii indukowanej przez lek', 'SSRI nie obniżają gwałtownie glukozy u osób bez cukrzycy.'],
        ['Z powodu całkowitego zahamowania syntezy GABA w móżdżku', 'SSRI nie hamują syntezy GABA w ten sposób.'],
        'psych-monoaminy-q4'
      ),
      q(
        'Który lek łączy hamowanie SERT z częściowym agonizmem receptorów 5-HT1A (SPARI)?',
        ['Wilazodon', 'Wilazodon jest selektywnym inhibitorem wychwytu zwrotnego i częściowym agonistą 5-HT1A.'],
        ['Amitryptylina', 'Amitryptylina jest nieselektywnym TLPD o silnym działaniu cholinolitycznym.'],
        ['Haloperidol', 'Haloperidol jest klasycznym antagonistą receptorów D2.'],
        'psych-monoaminy-q5'
      ),
    ],
  },
  {
    id: 'szlak-bdnf-neuroplastycznosc',
    moduleId: 'psych-afektywne',
    title: 'Szlak BDNF/TrkB i neurogeneza hipokampa',
    subtitle: 'Mechanizmy neurotroficzne, atrofia stresowa i naprawa synaptyczna',
    group: 'Neurobiologia i biochemia nastroju',
    minutes: 17,
    goals: [
      'Wyjaśnisz rolę czynnika BDNF i receptora TrkB w plastyczności synaptycznej hipokampa.',
      'Scharakteryzujesz wpływ przewlekłego stresu i leków przeciwdepresyjnych na gęstość kolców dendrytycznych.',
    ],
    sections: [
      {
        title: 'Czynnik neurotroficzny pochodzenia mózgowego (BDNF)',
        text: 'BDNF (Brain-Derived Neurotrophic Factor) jest kluczową neurotrofiną OUN, odpowiedzialną za przeżycie neuronów, synaptogenezę oraz długotrwałe wzmocnienie synaptyczne (LTP – Long-Term Potentiation). BDNF wiąże się ze swoistym receptorem o aktywności kinazy tyrozynowej – TrkB (Tropomyosin receptor kinase B), indukując jego homodimeryzację i autofosforylację reszt tyrozynowych.',
      },
      {
        title: 'Kaskady sygnalizacyjne: MAPK/ERK, PI3K/Akt i PLC-gamma',
        text: 'Aktywacja receptora TrkB uruchamia trzy główne szlaki wewnątrzkomórkowe: 1) Szlak Ras-Raf-MEK-MAPK/ERK promujący różnicowanie i wzrost neurytów, 2) Szlak PI3K/Akt/mTORC1 hamujący apoptozę i stymulujący lokalną translację białek synaptycznych w kolcach dendrytycznych (PSD-95, synaptofizyna), 3) Szlak PLC-gamma/IP3/DAG ułatwiający uwalnianie wapnia i plastyczność synaptyczną.',
      },
      {
        title: 'Atrofia w przewlekłym stresie a neurogeneza',
        text: 'W przewlekłym stresie nadmiar glikokortykosteroidów hamuje ekspresję genu BDNF w komórkach piramidowych hipokampa (obszary CA1 i CA3) oraz zakręcie zębatym. Prowadzi to do zaniku kolców dendrytycznych, upośledzenia neurogenezy u dorosłych (adult neurogenesis) i mierzalnego zmniejszenia objętości hipokampa w badaniach MRI u chorych z nawracającą depresją. Skuteczne leczenie przeciwdepresyjne odwraca ten proces, przywracając poziom BDNF i promując odrost połączeń synaptycznych.',
      },
    ],
    table: {
      headers: ['Stan biologiczny', 'Poziom BDNF / TrkB', 'Morfologia hipokampa', 'Objaw kliniczny'],
      rows: [
        ['Przewlekły stres / nieleczona depresja', 'Obniżony poziom BDNF, deficyt TrkB', 'Zanik kolców dendrytycznych, zahamowana neurogeneza', 'Zaburzenia pamięci roboczej, anhedonia, brak elastyczności poznawczej'],
        ['Skuteczna terapia (SSRI / SNRI)', 'Wzrost BDNF przez CREB po 3–4 tyg.', 'Powolna odbudowa kolców i neosynaptogeneza', 'Stopniowa remisja objawów, poprawa koncentracji'],
        ['Terapia szybkimi lekami (Ketamina)', 'Gwałtowny wyrzut BDNF i aktywacja mTORC1 (<24h)', 'Błyskawiczna synaptogeneza w korze przedczołowej', 'Ustąpienie anhedonii i myśli samobójczych w ciągu godzin'],
      ],
    },
    advanced:
      'Odkrycie bezpośredniego wiązania leków przeciwdepresyjnych z receptorem TrkB (Castrén et al., Cell 2021) rzuciło nowe światło na mechanizm ich działania: fluoksetyna i imipramina mogą allosterycznie stabilizować dimery receptora TrkB na powierzchni komórki w obecności cholesterolu, co ułatwia jego aktywację przez endogenny BDNF niezależnie od blokady transporterów monoaminowych.',
    summary:
      'Depresja wiąże się ze spadkiem BDNF i atrofią połączeń w hipokampie. Leki przeciwdepresyjne poprzez CREB i bezpośrednią modulację TrkB stymulują neurogenezę i odbudowę kolców synaptycznych.',
    sourceIds: ['stahl-essential', 'canmat-mdd-2023', 'nice-depression'],
    questions: [
      q(
        'Z jakim receptorem o aktywności kinazy tyrozynowej łączy się BDNF, indukując plastyczność synaptyczną?',
        ['TrkB', 'Swoistym receptorem o wysokim powinowactwie do BDNF jest kinaza TrkB.'],
        ['TrkA', 'TrkA jest receptorem dla NGF (czynnika wzrostu nerwów).'],
        ['Receptor insulinowy IGF-1R', 'IGF-1R wiąże insulinopodobny czynnik wzrostu, a nie BDNF.'],
        'psych-bdnf-q1'
      ),
      q(
        'Jaka zmiana morfologiczna w mózgu jest obserwowana w badaniach MRI u osób z wieloletnią nieleczoną depresją?',
        ['Zmniejszenie objętości hipokampa', 'Przewlekły stres i deficyt BDNF powodują atrofię neurytów i zmniejszenie hipokampa.'],
        ['Przerost móżdżku o 50%', 'Móżdżek nie wykazuje takiego przerostu w depresji.'],
        ['Całkowity zanik opon mózgowych', 'Opony mózgowe pozostają prawidłowe w zaburzeniach afektywnych.'],
        'psych-bdnf-q2'
      ),
      q(
        'Który szlak wewnątrzkomórkowy downstream od TrkB bezpośrednio stymuluje lokalną syntezę białek w kolcach dendrytycznych?',
        ['PI3K / Akt / mTORC1', 'Kompleks mTORC1 jest kluczowym regulatorem translacji białek synaptycznych.'],
        ['Cykl mocznikowy ornityny', 'Cykl mocznikowy zachodzi w wątrobie w celu detoksykacji amoniaku.'],
        ['Kaskada krzepnięcia krwi zależna od czynnika Xa', 'To układ hemostazy naczyniowej, nie neurobiologii synapsy.'],
        'psych-bdnf-q3'
      ),
      q(
        'Co wykazały najnowsze badania biofizyczne dotyczące leków przeciwdepresyjnych (Castrén et al.)?',
        ['Część leków przeciwdepresyjnych potrafi bezpośrednio wiązać się z domeną transbłonową receptora TrkB', 'Badania wykazały bezpośrednią modulację allosteryczną TrkB przez antydepresanty.'],
        ['Leki te całkowicie blokują receptor TrkB, wywołując jego degradację', 'Antydepresanty ułatwiają działanie TrkB, nie blokują go.'],
        ['BDNF jest toksyczną cząsteczką, którą leki eliminują z mózgu', 'BDNF jest czynnikiem troficznym niezbędnym do zdrowia neuronów.'],
        'psych-bdnf-q4'
      ),
      q(
        'W którym obszarze mózgu dorosłego człowieka zachodzi intensywna neurogeneza podtrzymywana przez BDNF i leki przeciwdepresyjne?',
        ['Zakręt zębaty hipokampa (dentate gyrus)', 'Strefa podziarnista zakrętu zębatego jest głównym miejscem neurogenezy dorosłych w układzie limbicznym.'],
        ['Istota czarna śródmózgowia', 'W istocie czarnej znajdują się neurony dopaminergiczne, nie zachodzi tam klasyczna neurogeneza dorosłych.'],
        ['Torebka wewnętrzna mózgu', 'Torebka wewnętrzna to pasmo istoty białej (aksonów), a nie miejsce powstawania nowych neuronów.'],
        'psych-bdnf-q5'
      ),
    ],
  },
  {
    id: 'os-hpa-stres',
    moduleId: 'psych-afektywne',
    title: 'Oś HPA i neurotoksyczność glikokortykoidów',
    subtitle: 'Niewydolność sprzężenia zwrotnego, test DST i receptor GR',
    group: 'Neurobiologia i biochemia nastroju',
    minutes: 15,
    goals: [
      'Wyjaśnisz mechanizm niewydolności ujemnego sprzężenia zwrotnego osi HPA w depresji melancholicznej.',
      'Scharakteryzujesz wpływ przewlekłego nadmiaru kortyzolu na receptory GR/MR i ekscytotoksyczność glutaminianu.',
    ],
    sections: [
      {
        title: 'Dysregulacja osi podwzgórze–przysadka–nadnercza',
        text: 'W warunkach fizjologicznych podwzgórze wydziela CRH i wazopresynę (AVP), stymulując przysadkę do uwalniania ACTH, co pobudza korę nadnerczy do sekrecji kortyzolu. Kortyzol hamuje dalsze wydzielanie CRH i ACTH poprzez receptory glikokortykoidowe (GR) w hipokampie, podwzgórzu i przysadce. U około 50% pacjentów z ciężką depresją (szczególnie melancholiczną i psychotyczną) to ujemne sprzężenie zwrotne jest głęboko upośledzone.',
      },
      {
        title: 'Test supresji deksametazonem (DST)',
        text: 'Podanie 1 mg deksametazonu o godzinie 23:00 u zdrowej osoby powoduje silne zahamowanie rannego stężenia kortyzolu (< 1,8 ug/dl / < 50 nmol/l) wskutek aktywacji ujemnego sprzężenia na poziomie przysadki. U pacjentów z melancholią obserwuje się brak supresji (non-suppression) – ranny kortyzol pozostaje podwyższony, co odzwierciedla niewrażliwość centralnych receptorów GR na hamowanie zwrotne (glukokortykoidooporność receptorowa).',
      },
      {
        title: 'Zjawisko neurotoksyczności glikokortykoidowej',
        text: 'W mózgu działają dwa typy receptorów: mineralokortykoidowe (MR, wysokie powinowactwo, wysycone w warunkach spoczynkowych) i glikokortykoidowe (GR, niższe powinowactwo, aktywowane przy stresie i szczytach dobowych). Przewlekły nadmiar kortyzolu nasyca receptory GR, co prowadzi do: nadmiernego uwalniania glutaminianu, napływu jonów wapnia Ca2+ do komórki, stresu oksydacyjnego mitochondriów i w konsekwencji obumarcia kolców dendrytycznych neuronów hipokampa.',
      },
    ],
    table: {
      headers: ['Parametr', 'Zdrowy układ fizjologiczny', 'Depresja melancholiczna / ostry stres'],
      rows: [
        ['Rytm dobowy kortyzolu', 'Wysoki rano, głęboki spadek o północy', 'Zniesiony spadek nocny, spłaszczona krzywa, hipersekrecja'],
        ['Test DST (1 mg deksametazonu)', 'Prawidłowa supresja kortyzolu (<1,8 ug/dl)', 'Brak supresji (kortyzol rano pozostaje wysoki)'],
        ['Wrażliwość receptora GR', 'Prawidłowa internalizacja i sygnalizacja', 'Oporność receptora GR (zmniejszona gęstość i translokacja)'],
        ['Wpływ na hipokamp', 'Fizjologiczna neuroprotekcja przez MR', 'Atrofia synaps przez nadmierną stymulację GR i glutaminian'],
      ],
    },
    advanced:
      'Normalizacja wyniku testu DST w trakcie leczenia przeciwdepresyjnego koreluje ze stabilnością remisji klinicznej. Pacjenci, u których mimo ustąpienia objawów subiektywnych test DST pozostaje nieprawidłowy, cechują się znacznie wyższym wskaźnikiem rychłego nawrotu depresji w ciągu kolejnych 6 miesięcy.',
    summary:
      'Oś HPA w depresji melancholicznej cechuje się opornością receptorów GR i brakiem supresji w teście DST. Nadmiar kortyzolu nasila uwalnianie glutaminianu i niszczy neurony hipokampa.',
    sourceIds: ['dsm5tr', 'stahl-essential', 'canmat-mdd-2023'],
    questions: [
      q(
        'Jaki wynik testu hamowania 1 mg deksametazonu (DST) typowo obserwuje się u pacjenta z ciężką depresją melancholiczną?',
        ['Brak supresji kortyzolu (stężenie kortyzolu rano pozostaje wysokie)', 'Wskutek centralnej oporności receptorów GR deksametazon nie hamuje wydzielania ACTH/kortyzolu.'],
        ['Spadek kortyzolu do zera przez 3 kolejne tygodnie', 'Deksametazon działa krótko i nie zeruje kortyzolu na wiele tygodni.'],
        ['Natychmiastowy wzrost stężenia hormonu wzrostu o 1000%', 'DST bada oś HPA, nie oś somatotropową.'],
        'psych-hpa-q1'
      ),
      q(
        'Który receptor w mózgu ma najwyższe powinowactwo do kortyzolu i jest wysycony już przy stężeniach podstawowych?',
        ['Receptor mineralokortykoidowy (MR)', 'Receptor MR charakteryzuje się około 10-krotnie wyższym powinowactwem do kortyzolu niż GR.'],
        ['Receptor glikokortykoidowy (GR)', 'Receptor GR wymaga wyższych stężeń kortyzolu, pojawiających się w stresie.'],
        ['Receptor oksytocynowy', 'Oksytocyna wiąże się ze swoistym receptorem peptydowym.'],
        'psych-hpa-q2'
      ),
      q(
        'Poprzez jaki mechanizm neurochemiczny nadmiar glikokortykoidów w hipokampie wywołuje zanik kolców dendrytycznych?',
        ['Nasilenie uwalniania glutaminianu i ekscytotoksyczny napływ jonów wapnia Ca2+', 'Nadmierna stymulacja receptorów NMDA przez glutaminian prowadzi do przeciążenia wapniowego neuronu.'],
        ['Zablokowanie przepływu krwi w tętnicy podstawnej', 'Glikokortykoidy nie zamykają światła głównych pni naczyniowych.'],
        ['Przekształcenie neuronów w komórki tłuszczowe', 'W hipokampie nie dochodzi do transróżnicowania w adipocyty.'],
        'psych-hpa-q3'
      ),
      q(
        'Co zwiastuje utrzymywanie się braku supresji w teście DST u pacjenta, u którego objawy depresji pozornie ustąpiły?',
        ['Wysokie ryzyko wczesnego nawrotu epizodu depresyjnego', 'Przetrwała dysregulacja osi HPA wskazuje na brak pełnej biologicznej remisji.'],
        ['Całkowite wyleczenie bez konieczności dalszych kontroli', 'Nieprawidłowy wynik laboratoryjny jest czynnikiem niekorzystnym prognostycznie.'],
        ['Rozwój pierwotnej niedoczynności kory nadnerczy', 'Depresja melancholiczna wiąże się z nadczynnością osi HPA, nie jej niedoczynnością.'],
        'psych-hpa-q4'
      ),
      q(
        'Gdzie zlokalizowane są kluczowe struktury OUN sprawujące hamujący wpływ na aktywność osi HPA?',
        ['Hipokamp i kora przedczołowa', 'Hipokamp wysyła projekcje hamujące do podwzgórza, ograniczając wyrzut CRH.'],
        ['Płaty skroniowe w rejonie słuchowym', 'Kora słuchowa nie jest głównym regulatorem neuroendokrynnym osi stresu.'],
        ['Rog przedni rdzenia kręgowego', 'Rogi przednie zawierają neurony ruchowe (motoneurony).'],
        'psych-hpa-q5'
      ),
    ],
  },
  {
    id: 'modele-kinetyki-nastroju',
    moduleId: 'psych-afektywne',
    title: 'Matematyka i modele nieliniowej dynamiki nastroju',
    subtitle: 'Układy bistabilne, bifurkacje w ChAD i kinetyka odpowiedzi na leki',
    group: 'Neurobiologia i biochemia nastroju',
    minutes: 18,
    goals: [
      'Zinterpretujesz nieliniowy model bistabilny opisujący przejścia między eutyreozą/eutymią a depresją i manią.',
      'Obliczysz czas do uzyskania stanu stacjonarnego neuroplastyczności na podstawie modelu akumulacji sygnału.',
    ],
    sections: [
      {
        title: 'Nieliniowa dynamika i histereza w zaburzeniach afektywnych',
        text: 'Nastrój człowieka nie zachowuje się jak prosty suwak liniowy. W modelach biofizycznych (np. modele oparte na równaniach różniczkowych nieliniowych FitzHugh-Nagumo lub układach bistabilnych) nastrój reprezentowany jest jako cząstka w krajobrazie energetycznym o dwóch minimach lokalnych (stany przyciągające – atraktory: stan eutymii vs stan depresji). Aby wytrącić układ ze stanu depresji do eutymii, bodziec terapeutyczny musi pokonać barierę potencjału (zjawisko histerezy: powrót nie następuje po tej samej ścieżce, co załamanie).',
      },
      {
        title: 'Bifurkacja typu "cusp" i przeskok fazy w ChAD',
        text: 'W chorobie afektywnej dwubiegunowej modelowanie matematyczne wykorzystuje teorię katastrof i bifurkacji (np. bifurkacja typu siodło-węzeł lub bifurkacja Hopfa). Gdy parametry kontrolne (np. podatność genetyczna i niestabilność rytmu okołodobowego) przekroczą wartość krytyczną, stabilny punkt równowagi znika, zmuszając układ do gwałtownego przeskoku do przeciwległego stanu (nagły wybuch manii).',
      },
      {
        title: 'Model akumulacji plastyczności: opóźnienie w farmakoterapii',
        text: 'Opóźnienie działania leków przeciwdepresyjnych można modelować równaniem różniczkowym pierwszego rzędu z czasem narastania: dP(t)/dt = k_ind * S(t) - k_deg * P(t), gdzie P to poziom neuroplastyczności (gęstość kolców dendrytycznych i ekspresja TrkB), S(t) to sygnał ze stymulacji monoaminowej, k_ind to stała szybkości indukcji, a k_deg to stała degradacji. Stan stacjonarny P_ss = (k_ind / k_deg) * S osiągany jest po czasie t ~ 4-5 * tau, gdzie tau = 1 / k_deg wynosi około 5–7 dni, co matematycznie tłumaczy czas 3–4 tygodni niezbędny do uzyskania pełnej poprawy klinicznej.',
      },
    ],
    table: {
      headers: ['Pojęcie matematyczne', 'Odpowiednik kliniczny w psychiatrii', 'Konsekwencja praktyczna'],
      rows: [
        ['Atraktor (stan stabilny)', 'Utrwalony epizod depresji lub eutymia', 'Trudność spontanicznego wyjścia z depresji bez interwencji'],
        ['Histereza', 'Różnica między dawką wyleczenia a dawką podtrzymującą', 'Lek podtrzymujący zapobiega nawrotowi, choć nie byłby w stanie sam przerwać ostrego epizodu'],
        ['Bifurkacja Hopfa', 'Cykliczność w ChAD (rapid cycling)', 'Oscylacje nastroju wynikające ze sprzężenia z opóźnieniem fazowym'],
        ['Stała czasowa tau (5–7 dni)', 'Czas obrotu białek synaptycznych i CREB', 'Konieczność cierpliwego oczekiwania na efekt leku przez min. 3–4 tyg.'],
      ],
    },
    derivation: {
      title: 'Model akumulacji odpowiedzi neuroplastycznej (równanie kinetyki)',
      model: 'Jednokompartmentowy model akumulacji plastyczności synaptycznej z opóźnieniem',
      steps: [
        {
          step: '1. Równanie różniczkowe narastania plastyczności P(t)',
          equation: 'dP(t)/dt = k_{syn} \\cdot C(t) - k_{deg} \\cdot P(t)',
          explanation: 'Szybkość przyrostu struktur synaptycznych zależy od stymulacji lekiem C(t) pomniejszonej o naturalną degradację.',
        },
        {
          step: '2. Rozwiązanie analityczne dla stałego stężenia leku C_ss',
          equation: 'P(t) = P_{max} \\cdot (1 - e^{-k_{deg} \\cdot t})',
          explanation: 'Wzrost neuroplastyczności ma charakter wykładniczy dążący asimptotycznie do poziomu maksymalnego P_max.',
        },
        {
          step: '3. Czas osiągnięcia 90% maksymalnej przebudowy synaps',
          equation: 't_{90\\%} = \\frac{-\\ln(0,1)}{k_{deg}} \\approx \\frac{2,303}{k_{deg}}',
          explanation: 'Dla stałej degradacji k_deg = 0,11 dnia^-1 (tau ~ 9 dni) czas t_90% wynosi 2,303 / 0,11 ~ 21 dni (dokładnie 3 tygodnie).',
        },
      ],
      clinicalTakeaway:
        'Biochemiczne tempo obrotu białek synaptycznych (tau ~ 1–2 tygodnie) determinuje, że 90% efektu neuroplastycznego pojawia się dopiero po około 21 dniach terapii stałą dawką leku.',
    },
    advanced:
      'W modelowaniu depresji lekoopornej (TRD) bariera potencjału między studnią depresyjną a studnią zdrowia jest tak wysoka, że standardowy sygnał S(t) z SSRI nie wystarcza do przejścia fazowego. Wymaga to bodźca o wysokiej energii, takiego jak szybki wyrzut glutaminianu (ketamina) lub synchroniczna depolaryzacja całego mózgu (terapia elektrowstrząsowa EW).',
    summary:
      'Nastrój podlega nieliniowym prawom dynamiki bistabilnej. Czas 3-4 tygodni do osiągnięcia remisji po leku przeciwdepresyjnym wynika ściśle ze stałej czasowej akumulacji białek neuroplastycznych (tau ~ 7 dni).',
    sourceIds: ['stahl-essential', 'canmat-mdd-2023'],
    questions: [
      q(
        'Dlaczego w modelach matematycznych nastrój w depresji opisywany jest jako "stan bistabilny z histerezą"?',
        ['Ponieważ powrót do zdrowia wymaga pokonania wyższej bariery energii niż samo wejście w epizod', 'Histereza oznacza, że stan układu zależy od jego historii i powrót wymaga silniejszego bodźca.'],
        ['Ponieważ nastrój zmienia się dokładnie co 1 sekundę o stałą wartość', 'Dynamika nastroju jest powolna i nieliniowa, a nie sekundowa.'],
        ['Ponieważ leki przeciwdepresyjne działają wyłącznie przez 2 minuty', 'Leki działają w sposób ciągły przez wiele miesięcy.'],
        'psych-modele-q1'
      ),
      q(
        'Jeśli stała zaniku białek synaptycznych k_deg wynosi około 0,1 dnia^-1, ile w przybliżeniu wynosi stała czasowa tau (1/k_deg)?',
        ['Około 10 dni', 'tau = 1 / 0,1 = 10 dni; pełny stan stacjonarny (~90%) wymaga około 3 * tau = 30 dni.'],
        ['Około 1 godziny', '1 godzina to za mała wartość dla procesów komórkowych neurogenezy.'],
        ['Około 5 lat', '5 lat to skala dekad, nie odpowiada dynamice leczenia epizodu.'],
        'psych-modele-q2'
      ),
      q(
        'Jakie zjawisko w teorii bifurkacji tłumaczy nagły przeskok pacjenta z głębokiej depresji w stan manii?',
        ['Przekroczenie punktu bifurkacji (np. siodło-węzeł) z utratą stabilności dotychczasowego punktu równowagi', 'Gdy parametr kontrolny przekroczy próg, stary stan znika i układ skokowo przeskakuje do nowego atraktora.'],
        ['Całkowite zatrzymanie przepływu prądu w ciele modzelowatym', 'Nie dochodzi do zatrzymania przewodnictwa neuronalnego.'],
        ['Liniowy przyrost nastroju o 1% każdego dnia bez przeskoków', 'Przeskok w manię ma charakter nieliniowy i gwałtowny.'],
        'psych-modele-q3'
      ),
      q(
        'Dlaczego w depresji lekoopornej standardowe leki modulujące monoaminy bywają nieskuteczne w wyjściu ze studni potencjału?',
        ['Sygnał monoaminowy generuje zbyt małą siłę napędową do pokonania pogłębionej bariery histerezy', 'Głęboki atraktor depresyjny wymaga gwałtownego bodźca (np. ketamina, elektrowstrząsy), by zresetować układ.'],
        ['Pacjent z depresją lekooporną nie posiada w mózgu serotoniny', 'Serotonina jest obecna w mózgu każdego żywego człowieka.'],
        ['Mózg pacjenta staje się odporny na prawa fizyki', 'Procesy mózgowe podlegają prawom biofizyki i dynamiki nieliniowej.'],
        'psych-modele-q4'
      ),
      q(
        'Co w praktyce klinicznej oznacza zjawisko histerezy w farmakoterapii depresji?',
        ['Dawka leku potrzebna do podtrzymania remisji może być niższa niż siła interwencji potrzebna do przełamania ostrego epizodu', 'Po wejściu w stan stabilnej eutymii układ utrzymuje się w nim łatwiej niż w trakcie załamania.'],
        ['Że pacjent musi przyjmować 100 tabletek dziennie', 'Dawkowanie leków mieści się w standardowych przedziałach miligramowych.'],
        ['Że po wyleczeniu pacjent natychmiast wraca do depresji po 5 minutach', 'Eutymia jest stanem względnie stabilnym (lokalnym minimum energii).'],
        'psych-modele-q5'
      ),
    ],
  },
];
