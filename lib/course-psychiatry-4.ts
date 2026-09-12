import { type DraftLesson, q } from './course-types.ts';

export const draftPsychiatryPart4: DraftLesson[] = [
  {
    id: 'farmakogenetyka-cyp450',
    moduleId: 'psych-farmakologia',
    title: 'Farmakogenetyka CYP450 i krytyczne interakcje lekowe',
    subtitle: 'CYP2D6, CYP2C19, fenotypy CPIC i induktory metaboliczne',
    group: 'Bezpieczeństwo i stany nagłe',
    minutes: 16,
    goals: [
      'Sklasyfikujesz fenotypy metaboliczne CYP2D6 i CYP2C19 wg CPIC (PM, IM, NM, UM) i ich wpływ na dawkowanie.',
      'Rozpoznasz krytyczne interakcje farmakokinetyczne (np. dym tytoniowy a CYP1A2, fluoksetyna a beta-blokery).',
    ],
    sections: [
      {
        title: 'Izoenzymy cytochromu P450 i fenotypy metaboliczne (CPIC)',
        text: 'Większość leków psychotropowych podlega metabolizmowi wątrobowemu I fazy przez izoenzymy cytochromu P450: CYP2D6, CYP2C19, CYP3A4 i CYP1A2. Zmienność genetyczna (polimorfizm pojedynczego nukleotydu SNP) definiuje 4 główne fenotypy: 1) Wolni metabolizatorzy (Poor Metabolizers – PM): brak aktywności enzymu, akumulacja leku macierzystego, drastyczny wzrost stężenia Css i toksyczność przy standardowych dawkach, 2) Pośredni (Intermediate – IM), 3) Prawidłowi (Normal – NM), 4) Ultraszybcy metabolizatorzy (Ultrarapid – UM): zwielokrotnienie genów, błyskawiczna eliminacja leku i brak efektu terapeutycznego przy dawkach standardowych.',
      },
      {
        title: 'Silne inhibitory: fluoksetyna, paroksetyna i bupropion',
        text: 'Fluoksetyna, paroksetyna oraz bupropion są silnymi inhibitorami enzymu CYP2D6. Jednoczesne podanie ich z lekami metabolizowanymi przez CYP2D6 (np. rysperydon, arypiprazol, wenlafaksyna, haloperidol, a także kardiologiczne beta-blokery: metoprolol) może spowodować 4–8-krotny wzrost stężenia tych leków w osoczu. Dodanie fluoksetyny do metoprololu może wywołać ciężką objawową bradykardię i blok przedsionkowo-komorowy!',
      },
      {
        title: 'Dym tytoniowy i węglowodory aromatyczne a CYP1A2',
        text: 'Wielopierścieniowe węglowodory aromatyczne zawarte w dymie tytoniowym (nie sam nikotyna, lecz dym z palenia tytoniu) są silnymi induktorami izoenzymu CYP1A2. U pacjentów palących papierosy klirens olanzapiny i klozapiny wzrasta nawet o 50%, co wymaga podawania wyższych dawek. Jeśli taki pacjent nagle rzuci palenie lub trafi do szpitala z zakazem palenia, aktywność CYP1A2 spada w ciągu kilku dni, co prowadzi do gwałtownego wzrostu stężenia olanzapiny lub klozapiny i groźnej intoksykacji!',
      },
    ],
    table: {
      headers: ['Izoenzym CYP', 'Główne substraty psychiatryczne', 'Silne inhibitory', 'Induktory kliniczne'],
      rows: [
        ['CYP2D6', 'Rysperydon, arypiprazol, wenlafaksyna, haloperidol', 'Fluoksetyna, paroksetyna, bupropion', 'Brak klinicznie istotnych induktorów enzymu'],
        ['CYP2C19', 'Escitalopram, citalopram, sertralina', 'Omeprazol, fluwoksamina', 'Rifampicyna, karbamazepina'],
        ['CYP1A2', 'Klozapina, olanzapina, duloksetyna', 'Fluwoksamina, cyprofloksacyna', 'Dym tytoniowy (węglowodory aromatyczne), grillowane mięso'],
        ['CYP3A4', 'Kwetiapina, zyprazydon, benzodiazepiny', 'Ketokonazol, klarytromycyna, sok grejpfrutowy', 'Karbamazepina, ziele dziurawca (Hypericum), fenytoina'],
      ],
    },
    advanced:
      'Zgodnie z wytycznymi CPIC 2023 u pacjentów ze statusem CYP2D6 Ultrarapid Metabolizer (UM) wenlafaksyna jest metabolizowana błyskawicznie do O-demetylowenlafaksyny, co może obniżać skuteczność, natomiast u pacjentów CYP2C19 Poor Metabolizer (PM) dawka maksymalna citalopramu powinna być zredukowana o 50% (maks. 20 mg/d) ze względu na ryzyko wydłużenia QTc i zaburzeń rytmu serca.',
    summary:
      'Fenotypy CYP2D6/2C19 (PM vs UM) decydują o stężeniu leków. Fluoksetyna silnie hamuje CYP2D6 (ryzyko intoksykacji rysperydonem/metoprololem). Dym tytoniowy indukuje CYP1A2 – rzucenie palenia drastycznie podnosi poziom klozapiny.',
    sourceIds: ['cpic-cyp2d6-2c19', 'agnp-tdm-2026', 'maudsley15'],
    questions: [
      q(
        'Co dzieje się ze stężeniem klozapiny lub olanzapiny u pacjenta hospitalizowanego na oddziale zamkniętym, który nagle przestał palić papierosy?',
        ['Stężenie leku we krwi gwałtownie wzrasta z powodu wygaśnięcia indukcji CYP1A2 przez dym tytoniowy', 'Węglowodory aromatyczne dymu indukowały CYP1A2; zaprzestanie palenia obniża klirens i podnosi poziom leku nawet o 50%.'],
        ['Stężenie leku natychmiast spada do zera', 'Zaprzestanie palenia spowalnia metabolizm leku, więc jego stężenie rośnie, a nie spada.'],
        ['Dym tytoniowy nie ma żadnego wpływu na metabolizm leków', 'To fałszywa teza; węglowodory dymu są jednym z najsilniejszych induktorów CYP1A2.'],
        'psych-cyp-q1'
      ),
      q(
        'Które leki przeciwdepresyjne są powszechnie znanymi, silnymi inhibitorami izoenzymu CYP2D6?',
        ['Fluoksetyna i paroksetyna', 'Oba leki należą do najsilniejszych inhibitorów CYP2D6 i mogą wielokrotnie zwiększać stężenia innych leków.'],
        ['Czysty chlorek sodu i woda destylowana', 'Sól fizjologiczna nie moduluje cytochromu P450.'],
        ['Mirtazapina w dawce 15 mg', 'Mirtazapina nie wykazuje silnego hamowania CYP2D6.'],
        'psych-cyp-q2'
      ),
      q(
        'Co oznacza status fenotypowy CYP2D6 "Poor Metabolizer" (PM) dla pacjenta leczonego standardową dawką rysperydonu?',
        ['Podwyższone stężenie leku we krwi i znacznie wyższe ryzyko działań pozapiramidowych (EPS)', 'Brak sprawnego enzymu spowalnia eliminację, prowadząc do kumulacji leku i działań toksycznych.'],
        ['Brak jakiegokolwiek wchłaniania leku z przewodu pokarmowego', 'Wchłanianie jelitowe nie zależy od polimorfizmu wątrobowego CYP2D6.'],
        ['Konieczność 10-krotnego zwiększenia dawki leku', 'U pacjentów PM dawki należy redukować, a nie zwiększać.'],
        'psych-cyp-q3'
      ),
      q(
        'Który popularny produkt spożywczy silnie hamuje jelitowy i wątrobowy izoenzym CYP3A4, zwiększając stężenie kwetiapiny i benzodiazepin?',
        ['Sok grejpfrutowy', 'Furanokumaryny zawarte w grejpfrutach trwale inaktywują enzym CYP3A4 w enterocytach.'],
        ['Zielona herbata w umiarkowanej ilości', 'Zielona herbata nie blokuje CYP3A4 w stopniu klinicznie niebezpiecznym.'],
        ['Sól kuchenna kamienna', 'Chlorek sodu nie hamuje CYP3A4.'],
        'psych-cyp-q4'
      ),
      q(
        'Jakie zalecenie dotyczące dawkowania citalopramu wydaje CPIC dla pacjentów ze statusem CYP2C19 Poor Metabolizer (PM)?',
        ['Maksymalna dawka citalopramu nie powinna przekraczać 20 mg/dobę z powodu ryzyka wydłużenia QTc', 'Zmniejszony klirens citalopramu u osób PM prowadzi do niebezpiecznych stężeń i arytmii komorowych.'],
        ['Citalopram należy podawać w dawce 100 mg/dobę', 'Dawka 100 mg jest dawką toksyczną i niedopuszczalną.'],
        ['Pacjent powinien natychmiast odstawić wszystkie płyny', 'Odwodnienie jest niebezpieczne i nie ma uzasadnienia medycznego.'],
        'psych-cyp-q5'
      ),
    ],
  },
  {
    id: 'tdm-agnp-monitorowanie',
    moduleId: 'psych-farmakologia',
    title: 'Monitorowanie stężeń leków (TDM) wg wytycznych AGNP 2026',
    subtitle: 'Poziomy rekomendacji, okna terapeutyczne i standaryzacja pobrania',
    group: 'Bezpieczeństwo i stany nagłe',
    minutes: 15,
    goals: [
      'Zdefiniujesz 4 poziomy rekomendacji TDM wg konsensusu AGNP (Level 1–4).',
      'Prawidłowo zaplanujesz standaryzowane pobranie krwi do oznaczenia stężenia leku w stanie stacjonarnym.',
    ],
    sections: [
      {
        title: 'Koncepcja i poziomy rekomendacji AGNP 2026',
        text: 'Therapeutic Drug Monitoring (TDM) w psychiatrii to oznaczanie stężenia leku we krwi w celu optymalizacji skuteczności i uniknięcia intoksykacji. Grupa Robocza AGNP (Arbeitsgemeinschaft für Neuropsychopharmakologie und Pharmakopsychiatrie) klasyfikuje leki do 4 poziomów rekomendacji: 1) Poziom 1 (Zdecydowanie zalecane): lit, klozapina, kwas walproinowy, karbamazepina, nortryptylina, haloperidol; 2) Poziom 2 (Zalecane): większość leków przeciwpsychotycznych (olanzapina, rysperydon, arypiprazol, kwetiapina) i leków przeciwdepresyjnych (sertralina, escitalopram, wenlafaksyna, duloksetyna); 3) Poziom 3 (Przydatne w szczególnych sytuacjach); 4) Poziom 4 (Prawdopodobnie nieprzydatne).',
      },
      {
        title: 'Zasady standaryzacji pobrania próbki',
        text: 'Aby wynik TDM był klinicznie miarodajny, muszą zostać spełnione 3 warunki: 1) Stan stacjonarny (Steady State): krew pobiera się po upływie co najmniej 4–5 okresów półtrwania leku (t1/2) przy niezmienionej dawce, 2) Stężenie minimalne (Trough concentration): krew pobiera się rano na czczo, bezpośrednio przed kolejną dawką poranną (dla litu dokładnie 12h +/- 30 min po dawce wieczornej), 3) Prawidłowe probówki: probówki bez żelu separującego (niektóre żele adsorbują leki lipofilne, sztucznie zaniżając wynik).',
      },
      {
        title: 'Wskazania kliniczne do wykonania TDM',
        text: 'Do głównych wskazań należą: brak odpowiedzi klinicznej przy dawkach standardowych (podejrzenie non-adherence lub fenotypu ultraszybkiego UM), wystąpienie działań niepożądanych przy małych dawkach (podejrzenie fenotypu PM lub interakcji hamującej), podejrzenie zatrucia lub przedawkowania, modyfikacja dawek leków współistniejących o charakterze induktorów/inhibitorów, ciąża, podeszły wiek pacjenta oraz niewydolność nerek lub wątroby.',
      },
    ],
    table: {
      headers: ['Lek psychotropowy', 'Poziom AGNP', 'Referencyjny przedział terapeutyczny', 'Próg alarmowy / toksyczny'],
      rows: [
        ['Węglan litu', 'Level 1 (Zdecydowanie zalecane)', '0,6 – 0,8 mmol/l (podtrzymująco)', '> 1,2 mmol/l (toksyczność)'],
        ['Klozapina', 'Level 1 (Zdecydowanie zalecane)', '350 – 600 ng/ml (ug/l)', '> 1000 ng/ml (ryzyko drgawek)'],
        ['Kwas walproinowy', 'Level 1 (Zdecydowanie zalecane)', '50 – 100 ug/ml (mg/l)', '> 120 ug/ml (hepatotoksyczność/encefalopatia)'],
        ['Olanzapina', 'Level 2 (Zalecane)', '20 – 80 ng/ml (ug/l)', '> 100 ng/ml'],
      ],
    },
    advanced:
      'Dla klozapiny stężenie w surowicy >= 350 ng/ml jest uznawane za próg skuteczności w schizofrenii lekoopornej. Przekroczenie stężenia 1000 ng/ml dramatycznie obniża próg drgawkowy i wymaga prewencyjnego włączenia leku przeciwpadaczkowego (np. kwasu walproinowego) lub redukcji dawki klozapiny.',
    summary:
      'TDM AGNP Level 1 dotyczy litu, klozapiny i walproinianu. Krew pobiera się rano na czczo w stanie stacjonarnym (trough) bezpośrednio przed dawką, w probówkach bez żelu separującego.',
    sourceIds: ['agnp-tdm-2026', 'maudsley15', 'ptp-standardy'],
    questions: [
      q(
        'Które leki psychiatryczne zaliczane są do Poziomu 1 (Zdecydowanie zalecane) w monitorowaniu TDM wg AGNP 2026?',
        ['Lit, klozapina i kwas walproinowy', 'Leki te cechują się wąskim indeksem terapeutycznym i udowodnioną korelacją stężenia ze skutkiem klinicznym.'],
        ['Witamina C i suplementy magnezu', 'Substancje te nie wymagają rutynowego TDM w psychiatrii.'],
        ['Hydroksyzyna stosowana doraźnie', 'Leki doraźne nie podlegają standardowej ocenie stężeń stacjonarnych.'],
        'psych-tdm-q1'
      ),
      q(
        'Kiedy należy pobrać krew do badania TDM, aby wynik odzwierciedlał standaryzowane stężenie minimalne (trough)?',
        ['Rano na czczo, bezpośrednio przed przyjęciem kolejnej planowanej dawki porannej', 'To definicja stężenia minimalnego (C_trough), zapewniająca porównywalność z normami referencyjnymi.'],
        ['Dokładnie 15 minut po połknięciu tabletki', 'W tym momencie trwa faza wchłaniania i stężenie gwałtownie rośnie, dając wynik niemiarodajny.'],
        ['O dowolnej porze dnia, niezależnie od przyjmowania leków', 'Losowe pobranie uniemożliwia rzetelną interpretację kliniczną.'],
        'psych-tdm-q2'
      ),
      q(
        'Po ilu okresach półtrwania (t1/2) leku ustala się stan stacjonarny (Steady State), uprawniający do pobrania TDM?',
        ['Po około 4–5 okresach półtrwania', 'Po 5 okresach półtrwania stężenie osiąga ponad 96% wartości docelowego stanu równowagi.'],
        ['Po 30 sekundach od pierwszej dawki', 'Procesy farmakokinetyczne wymagają dłuższego czasu kumulacji.'],
        ['Dopiero po 10 latach nieprzerwanej terapii', 'Stan stacjonarny ustala się zazwyczaj w ciągu kilku dni do maksymalnie 2–3 tygodni.'],
        'psych-tdm-q3'
      ),
      q(
        'Dlaczego krew do oznaczenia leków psychotropowych w procedurze TDM powinna być pobierana do probówek bez żelu separującego?',
        ['Część żeli separujących pochłania (adsorbuje) lipofilne cząsteczki leków, sztucznie zaniżając zmierzone stężenie', 'Wiele leków psychotropowych to substancje lipofilne, ulegające adsorpcji na żelach probówek.'],
        ['Żel separujący natychmiast eksploduje w kontakcie z lekiem psychotropowym', 'Nie dochodzi do żadnych wybuchów.'],
        ['Żel separujący fałszywie podnosi stężenie hemoglobiny', 'Hemoglobina nie jest parametrem monitorowanym w procedurze TDM leku.'],
        'psych-tdm-q4'
      ),
      q(
        'Jakie stężenie klozapiny w surowicy uznawane jest wg AGNP za próg optymalnej odpowiedzi terapeutycznej w schizofrenii lekoopornej?',
        ['Co najmniej 350 ng/ml (ug/l)', 'Osiągnięcie stężenia >= 350 ng/ml wiąże się ze statystycznie istotnym wzrostem wskaźnika odpowiedzi klinicznej.'],
        ['Dokładnie 5 ng/ml', 'To stężenie subterapeutyczne, nieskuteczne w psychozie lekoopornej.'],
        ['Powyżej 50 000 ng/ml', 'To zakres skrajnej, śmiertelnej toksyczności.'],
        'psych-tdm-q5'
      ),
    ],
  },
  {
    id: 'zespol-serotoninowy-hunter',
    moduleId: 'psych-farmakologia',
    title: 'Zespół serotoninowy i kryteria decyzyjne Huntera',
    subtitle: 'Toksykologia serotoninergiczna, klonus i postępowanie ratunkowe',
    group: 'Bezpieczeństwo i stany nagłe',
    minutes: 17,
    goals: [
      'Zastosujesz algorytm diagnostyczny kryteriów Huntera (Hunter Serotonin Toxicity Criteria).',
      'Wdrożysz schemat postępowania ratunkowego w zespole serotoninowym (odstawienie, cyproheptadyna).',
    ],
    sections: [
      {
        title: 'Patofizjologia i mechanizm wyzwalający',
        text: 'Zespół serotoninowy (toksyczność serotoninowa) to stan bezpośredniego zagrożenia życia wynikający z nadmiernej stymulacji centralnych i obwodowych receptorów 5-HT2A i 5-HT1A. Najczęściej powstaje w wyniku jednoczesnego zastosowania dwóch lub więcej leków o różnych mechanizmach proserotoninergicznych (np. inhibitor MAO + SSRI/SNRI; SSRI + tramadol; SSRI + dekstrometorfan; SSRI + linezolid; tryptany; MDMA/"ecstasy"). Charakteryzuje się triadą zaburzeń: neuromięśniowych, autonomicznych i stanu psychicznego.',
      },
      {
        title: 'Zwalidowane kryteria decyzyjne Huntera (QJM 2003)',
        text: 'Kryteria Huntera cechują się najwyższą czułością (84%) i swoistością (97%), przewyższając dawne kryteria Sternbacha. U pacjenta przyjmującego substancję proserotoninergiczną zespół serotoninowy rozpoznaje się przy obecności JEDNEGO z następujących warunków: 1. Spontaniczny klonus (spontaneous clonus), 2. Indukowany klonus ORAZ pobudzenie psychoruchowe (agitation) lub obfite poty (diaphoresis), 3. Klonus oczny (ocular clonus) ORAZ pobudzenie lub obfite poty, 4. Drżenie mięśniowe (tremor) ORAZ wygórowanie odruchów ścięgnistych (hiperrefleksja), 5. Hipertermia (>38°C) ORAZ klonus oczny lub indukowany klonus.',
      },
      {
        title: 'Postępowanie ratunkowe',
        text: '1. Natychmiastowe bezwzględne odstawienie wszystkich leków serotoninergicznych, 2. Sedacja benzodiazepinami (np. diazepam i.v. lub lorazepam i.v.) – redukuje pobudzenie, drżenia i napięcie mięśniowe, zapobiegając rabdomiolizie, 3. Chłodzenie fizykalne przy hipertermii (leki przeciwgorączkowe jak paracetamol są całkowicie nieskuteczne, ponieważ gorączka wynika z pracy mięśni, a nie przesunięcia set-pointu w podwzgórzu!), 4. Swoisty antagonista receptorów 5-HT2A: cyproheptadyna doustnie (dawka początkowa 12 mg, następnie 2 mg co 2 godziny). W ciężkich postaciach (hipertermia > 41°C, sztywność) – natychmiastowa intubacja, zwiotczenie niedepolaryzujące (wekuronium) i OIT.',
      },
    ],
    table: {
      headers: ['Objaw', 'Zespół serotoninowy', 'Złośliwy Zespół Neuroleptyczny (NMS)'],
      rows: [
        ['Początek objawów', 'Gwałtowny (godziny od podania leku)', 'Podostry (dni do tygodni po neuroleptyku)'],
        ['Napięcie mięśniowe', 'Klonus (spontaniczny/oczny), hiperrefleksja, drżenie', '"Sztywność ołowianej rury" (lead-pipe rigidity), hiporefleksja'],
        ['Źrenice', 'Rozszerzone (mydriasis)', 'Prawidłowe'],
        ['Perystaltyka jelit', 'Wzmożona (biegunka, przelewanie)', 'Osłabiona lub porażenna'],
        ['Odtrutka farmakologiczna', 'Cyproheptadyna (antagonista 5-HT2A)', 'Dantrolen / Bromokryptyna (agonista D2)'],
      ],
    },
    advanced:
      'Linezolid (popularny antybiotyk przeciwko szczepom MRSA i VRE) jest odwracalnym, nieselektywnym inhibitorem monoaminooksydazy (MAO). Włączenie linezolidu u pacjenta przyjmującego SSRI (np. sertralinę czy escitalopram) jest częstą przyczyną jatrogennego zespołu serotoninowego na oddziałach zabiegowych i internistycznych!',
    summary:
      'Kryteria Huntera opierają się na klonusie (spontanicznym, indukowanym, ocznym) i hiperrefleksji. Leczenie to odstawienie leków, benzodiazepiny, chłodzenie i cyproheptadyna. Paracetamol jest nieskuteczny.',
    sourceIds: ['hunter-criteria', 'maudsley15', 'nms-consensus'],
    questions: [
      q(
        'Który objaw neurologiczny jest centralnym, kluczowym elementem algorytmu decyzyjnego kryteriów Huntera?',
        ['Klonus (spontaniczny, indukowany lub oczny)', 'Klonus mięśniowy jest objawem o najwyższej swoistości dla toksyczności serotoninowej.'],
        ['Wiotkie porażenie czterokończynowe', 'W zespole serotoninowym występuje wzmożenie napięcia i klonus, nie wiotkość.'],
        ['Brak czucia smaku na czubku języka', 'Zaburzenia smaku nie wchodzą w skład kryteriów Huntera.'],
        'psych-hunter-q1'
      ),
      q(
        'Dlaczego klasyczne leki przeciwgorączkowe (paracetamol, ibuprofen) są nieskuteczne w obniżaniu gorączki w zespole serotoninowym?',
        ['Ponieważ hipertermia wynika z nadmiernej generacji ciepła przez mięśnie (klonus/skurcze), a nie z przestawienia ośrodka termoregulacji w podwzgórzu', 'Gorączka nie jest wynikiem działania pirogenów, lecz skrajnej pracy mięśni szkieletowych.'],
        ['Ponieważ paracetamol natychmiast zamienia się w serotoninę', 'Paracetamol nie ma aktywności serotoninergicznej.'],
        ['Ponieważ leki przeciwgorączkowe są neutralizowane przez sok żołądkowy', 'Leki przeciwgorączkowe wchłaniają się prawidłowo, lecz ich punkt uchwytu nie dotyczy tego mechanizmu.'],
        'psych-hunter-q2'
      ),
      q(
        'Jaki swoisty lek o działaniu antagonisty receptorów 5-HT2A stosuje się doustnie jako odtrutkę w zespole serotoninowym?',
        ['Cyproheptadyna', 'Cyproheptadyna blokuje receptory 5-HT2A i odwraca toksyczność serotoninową.'],
        ['Nalokson', 'Nalokson jest odtrutką na przedawkowanie opioidów (receptor mi).'],
        ['Flumazenil', 'Flumazenil znosi działanie benzodiazepin na receptor GABA-A.'],
        'psych-hunter-q3'
      ),
      q(
        'Który antybiotyk stosowany w zakażeniach MRSA/VRE jest inhibitorem MAO i może wywołać zespół serotoninowy w połączeniu z SSRI?',
        ['Linezolid', 'Linezolid wykazuje właściwości iMAO i jest częstą przyczyną groźnych interakcji z lekami przeciwdepresyjnymi.'],
        ['Amoksycylina', 'Penicyliny nie hamują enzymu monoaminooksydazy.'],
        ['Azytromycyna', 'Makrolidy nie posiadają aktywności inhibitora MAO.'],
        'psych-hunter-q4'
      ),
      q(
        'Jakie zaburzenie źrenic i perystaltyki typowo różnicuje zespół serotoninowy od złośliwego zespołu neuroleptycznego (NMS)?',
        ['W zespole serotoninowym źrenice są rozszerzone (mydriasis), a perystaltyka wzmożona (biegunka)', 'Układ serotoninowy stymuluje motorykę jelit i rozszerza źrenice, w odróżnieniu od hipokinetycznego NMS.'],
        ['W zespole serotoninowym źrenice są szpilkowate, a jelita porażone', 'Szpilkowate źrenice są typowe dla intoksykacji opioidowej.'],
        ['Nie ma żadnych różnic klinicznych między tymi stanami', 'Różnicowanie jest wyraźne i determinuje dobór odtrutki.'],
        'psych-hunter-q5'
      ),
    ],
  },
  {
    id: 'nms-ostra-dystonia-eps',
    moduleId: 'psych-farmakologia',
    title: 'Złośliwy Zespół Neuroleptyczny (NMS), akatyzja i ostra dystonia',
    subtitle: 'Blokada D2, sztywność ołowianej rury, kinaza CK i stany nagłe',
    group: 'Bezpieczeństwo i stany nagłe',
    minutes: 17,
    goals: [
      'Rozpoznasz Złośliwy Zespół Neuroleptyczny (NMS) na podstawie objawów klinicznych i laboratoryjnych (CK).',
      'Wdrożysz leczenie ostrej dystonii krtaniowej i odróżnisz akatyzję od nasilenia niepokoju/lęku.',
    ],
    sections: [
      {
        title: 'Złośliwy Zespół Neuroleptyczny (NMS): kryteria konsensusu',
        text: 'NMS to rzadkie (0,01–0,2%), ale potencjalnie śmiertelne powikłanie leczenia neuroleptykami, wywołane gwałtowną i masywną blokadą receptorów dopaminowych D2 w prążkowiu i podwzgórzu. Charakteryzuje się: 1) Ciężką uogólnioną sztywnością mięśniową typu "rury ołowianej" (lead-pipe rigidity), 2) Hipertermią (>38°C), 3) Niestabilnością wegetatywną (labilne ciśnienie, tachykardia, obfite zlewne poty), 4) Zmianami stanu psychicznego (splątanie, mutyzm, stupor, śpiączka). W badaniach laboratoryjnych kluczowy jest potężny wzrost kinazy kreatynowej (CK > 1000 IU/l, nierzadko > 10 000–50 000 IU/l wskutek rabdomiolizy), leukocytoza i mioglobinuria (ryzyko ostrej martwicy cewek nerkowych).',
      },
      {
        title: 'Leczenie NMS',
        text: '1. Natychmiastowe odstawienie neuroleptyku, 2. Intensywne nawadnianie dożylne krystaloidami i wymuszona diureza w celu ochrony nerek przed zablokowaniem przez mioglobinę, 3. Chłodzenie fizykalne, 4. Farmakoterapia celowana: Dantrolen dożylnie (1-2,5 mg/kg m.c. – obwodowy lek zwiotczający mięśnie przez blokadę receptora rianodynowego RyR1 w siateczce sarkoplazmatycznej) oraz Bromokryptyna lub amantadyna (agoniści dopaminy odwracający centralną blokadę D2), 5. Benzodiazepiny i.v. W opornych przypadkach – pilne leczenie elektrowstrząsowe (EW).',
      },
      {
        title: 'Ostra dystonia i akatyzja: różnicowanie i postępowanie',
        text: 'Ostra dystonia (napadowe, bolesne skurcze mięśni szyi – kręcz szyi, wykrzywienie gałek ocznych w górę – napad wejrzeniowy, skurcz mięśni języka i krtani) pojawia się w ciągu 24–48 h od wdrożenia leku; wymaga natychmiastowego podania leku cholinolitycznego (biperyden 2,5–5 mg i.m./i.v.) lub przeciwhistaminowego (difenhydramina). Akatyzja to subiektywne, dręczące poczucie przymusu poruszania kończynami i niemożność usiedzenia w miejscu; bywa tragicznie mylona z "nasileniem lęku lub psychozy", co prowadzi do błędnego zwiększania dawki neuroleptyku. Leczeniem z wyboru akatyzji jest propranolol (beta-bloker) lub benzodiazepiny.',
      },
    ],
    table: {
      headers: ['Stan nagły', 'Mechanizm neurochemiczny', 'Typowy czas wystąpienia', 'Leczenie pierwszego wyboru'],
      rows: [
        ['Ostra dystonia', 'Względna nadaktywność cholinergiczna po blokadzie D2', 'Godziny do 2–3 dni po dawce', 'Biperyden i.m./i.v. lub prometazyna'],
        ['Akatyzja polekowa', 'Blokada D2 w prążkowiu / układzie mezokortykalnym', 'Dni do tygodni', 'Propranolol (40–80 mg/d), benzodiazepiny'],
        ['Parkinsonizm polekowy', 'Blokada >80% D2 w szlaku nigrostriatalnym', 'Tygodnie po wdrożeniu dawki', 'Redukcja dawki neuroleptyku, biperyden'],
        ['NMS', 'Masywna blokada D2 + dysregulacja podwzgórza', 'Dni do 2 tygodni', 'Odstawienie leku, OIT, dantrolen, bromokryptyna'],
      ],
    },
    advanced:
      'Mutyzm i sztywność w NMS mogą przypominać katatonię złośliwą. Testem różnicującym i jednocześnie procedurą ratunkową w katatonii jest próba z lorazepamem (Lorazepam Challenge Test: 1-2 mg i.v.). Jeśli objawy natychmiast ustępują, potwierdza to tło katatoniczne.',
    summary:
      'NMS to hipertermia, sztywność rury ołowianej i wysokie CK (>1000 IU/l); leczy się go dantrolenem i bromokryptyną na OIT. Ostrą dystonię przerywa biperyden, a akatyzję łagodzi propranolol.',
    sourceIds: ['nms-consensus', 'maudsley15', 'stahl-essential'],
    questions: [
      q(
        'Jaki parametr laboratoryjny wykazuje dramatyczny wzrost wskutek rabdomiolizy w przebiegu Złośliwego Zespołu Neuroleptycznego (NMS)?',
        ['Kinaza kreatynowa (CK / CPK)', 'CK wzrasta powyżej 1000 IU/l, często osiągając dziesiątki tysięcy jednostek wskutek uszkodzenia mięśni szkieletowych.'],
        ['Tyreoglobulina', 'Tyreoglobulina jest markerem tarczycowym, bez związku z NMS.'],
        ['Bilirubina pośrednia w moczu', 'Bilirubina pośrednia nie przesącza się do moczu; w moczu pojawia się mioglobina.'],
        'psych-nms-q1'
      ),
      q(
        'Jaki jest mechanizm działania dantrolenu stosowanego w intensywnej terapii NMS?',
        ['Blokuje receptory rianodynowe (RyR1) w siateczce sarkoplazmatycznej mięśni, hamując uwalnianie wapnia i zwiotczając mięśnie', 'Dantrolen działa obwodowo bezpośrednio na mięśnie szkieletowe, przerywając generację ciepła i rabdomiolizę.'],
        ['Pobudza receptory insuliny w wątrobie', 'Dantrolen nie jest lekiem przeciwcukrzycowym.'],
        ['Zwiększa wydalanie potasu przez gruczoły potowe', 'Dantrolen nie wpływa na gruczoły potowe w ten sposób.'],
        'psych-nms-q2'
      ),
      q(
        'Jaki lek podany dożylnie lub domięśniowo jest leczeniem pierwszego rzutu w ostrej dystonii polekowej (np. bolesnym napadzie wejrzeniowym)?',
        ['Biperyden (lek cholinolityczny)', 'Cholinolityki przywracają równowagę dopaminowo-cholinergiczną w prążkowiu, natychmiast przerywając skurcz dystoniczny.'],
        ['Kolejna dawka haloperidolu', 'Zwiększenie dawki neuroleptyku dramatycznie pogłębiłoby dystonię.'],
        ['Insulina krótzkodziałająca', 'Insulina nie leczy zaburzeń pozapiramidowych.'],
        'psych-nms-q3'
      ),
      q(
        'Pacjent przyjmujący haloperidol krąży niespokojnie po sali, nie może usiedzieć na krześle i odczuwa udrękę w nogach. Co podejrzewasz?',
        ['Akatyzję polekową (wymaga redukcji neuroleptyku lub propranololu)', 'Akatyzja to subiektywny przymus poruszania się; błędne uznanie jej za lęk i podanie większej dawki leku jest niebezpieczne.'],
        ['Prawidłowy stan relaksacji po leku', 'Niepokój ruchowy nie jest oznaką relaksacji.'],
        ['Ostre zapalenie wyrostka robaczkowego', 'Objaw nie ma związku z ostrym brzuchem.'],
        'psych-nms-q4'
      ),
      q(
        'Który agonista receptorów dopaminowych jest stosowany w NMS w celu odwrócenia centralnej blokady dopaminergicznej?',
        ['Bromokryptyna', 'Bromokryptyna stymuluje receptory D2, przeciwdziałając deficytowi dopaminergicznemu w OUN.'],
        ['Nalokson', 'Nalokson jest antagonistą opioidowym.'],
        ['Flumazenil', 'Flumazenil jest antagonistą benzodiazepin.'],
        'psych-nms-q5'
      ),
    ],
  },
  {
    id: 'bezpieczenstwo-kardiometaboliczne-qtc',
    moduleId: 'psych-farmakologia',
    title: 'Bezpieczeństwo kardiometaboliczne i wydłużenie odstępu QTc',
    subtitle: 'Rejestr CredibleMeds, kalkulator Tisdale\'a i zespół metaboliczny',
    group: 'Bezpieczeństwo i stany nagłe',
    minutes: 16,
    goals: [
      'Wskażesz leki psychotropowe o najwyższym ryzyku wydłużenia QTc i komorowych zaburzeń rytmu (TdP).',
      'Scharakteryzujesz zasady monitorowania metabolicznego (glikemia, lipidy, masa ciała) po LPP II generacji.',
    ],
    sections: [
      {
        title: 'Wydłużenie odstępu QTc i Torsades de Pointes (CredibleMeds)',
        text: 'Wiele leków przeciwdepresyjnych i przeciwpsychotycznych blokuje szybki opóźniony kanał potasowy IKr (kodowany przez gen hERG) w mięśniu sercowym. Prowadzi to do wydłużenia repolaryzacji komór i odstępu QTc w EKG. Gdy skorygowany odstęp QTc (formuła Bazetta lub Fridericia) przekracza 500 ms lub wydłuża się o > 60 ms względem wartości wyjściowej, gwałtownie wzrasta ryzyko wielokształtnego częstoskurczu komorowego typu Torsades de Pointes (TdP) i nagłego zgonu sercowego.',
      },
      {
        title: 'Kategorie ryzyka leków i kalkulator Tisdale’a',
        text: 'Zgodnie z rejestrem CredibleMeds leki dzielą się na: 1) Known Risk of TdP (znane ryzyko): cytalopram, escytalopram (>20 mg), haloperidol (zwłaszcza dożylny!), tiorydazyna, pimozyd; 2) Possible Risk; 3) Conditional Risk (np. przy hipokaliemii lub interakcjach). Skala Tisdale’a ocenia ryzyko kliniczne (wiek >=68 lat, płeć żeńska, wyjściowe QTc >=450 ms, ostry zawał serca, hipokaliemia <=3,5 mmol/l, jednoczesne stosowanie >= 2 leków wydłużających QT). Hipokaliemia i hipomagnezemia muszą być bezwzględnie wyrównane przed włączeniem tych leków!',
      },
      {
        title: 'Zespół metaboliczny po lekach przeciwpsychotycznych II generacji',
        text: 'Niektóre atypowe leki przeciwpsychotyczne (szczególnie klozapina i olanzapina) wywołują głębokie zaburzenia kardiometaboliczne: szybki przyrost masy ciała (blokada receptorów H1 i 5-HT2C), insulinooporność, cukrzycę typu 2 oraz ciężką dyslipidemię (hipertrójglicerydemię). Standardem opieki jest rutynowe monitorowanie: masy ciała i obwodu talii (co miesiąc przez 3 mies., potem co kwartał), glikemii na czczo / HbA1c oraz profilu lipidowego (wyjściowo, po 12 tyg. i corocznie). Lekami o najniższym ryzyku metabolicznym są: arypiprazol, zyprazydon i lurasidon.',
      },
    ],
    table: {
      headers: ['Lek psychotropowy', 'Ryzyko wydłużenia QTc (CredibleMeds)', 'Ryzyko przyrostu masy ciała / cukrzycy'],
      rows: [
        ['Haloperidol (zwłaszcza i.v.)', 'Znane ryzyko (Known Risk of TdP) — wysokie', 'Niskie'],
        ['Citalopram / Escitalopram', 'Znane ryzyko (dawkozależne: maks. 40/20 mg)', 'Niskie / neutralne'],
        ['Olanzapina', 'Niskie / warunkowe', 'Bardzo wysokie (silne pobudzenie łaknienia)'],
        ['Klozapina', 'Umiarkowane (ryzyko zapalenia mięśnia sercowego)', 'Bardzo wysokie (zespół metaboliczny)'],
        ['Aripiprazol', 'Niskie', 'Bardzo niskie / neutralne'],
      ],
    },
    advanced:
      'W przypadku konieczności nagłego uspokojenia pacjenta pobudzonego, dożylne podanie haloperidolu wiąże się z wielokrotnie wyższym ryzykiem TdP niż podanie domięśniowe lub doustne. Jeśli haloperidol jest podawany i.v., pacjent bezwzględnie wymaga ciągłego monitorowania kardiomonitorem ze śledzeniem odstępu QTc!',
    summary:
      'QTc > 500 ms grozi śmiertelnym częstoskurczem TdP (CredibleMeds: haloperidol i.v., citalopram). Olanzapina i klozapina wymagają ścisłego monitorowania glikemii i lipidów z uwagi na zespół metaboliczny.',
    sourceIds: ['crediblemeds-qt', 'maudsley15', 'ptp-standardy'],
    questions: [
      q(
        'Jaka wartość skorygowanego odstępu QTc w EKG jest uznawana za krytyczny próg bezpieczeństwa, powyżej którego dramatycznie rośnie ryzyko Torsades de Pointes?',
        ['Powyżej 500 ms (lub przyrost o > 60 ms względem wyjściowego)', 'QTc > 500 ms jest bezwzględnym sygnałem ostrzegawczym nakazującym natychmiastową redukcję lub odstawienie leku.'],
        ['Powyżej 200 ms', '200 ms to wartość skrajnie krótka, prawidłowy QTc wynosi 380-440 ms.'],
        ['Dokładnie 1000 ms u każdego zdrowego człowieka', '1000 ms to wartość patologiczna, odpowiadająca zatrzymaniu akcji serca.'],
        'psych-qtc-q1'
      ),
      q(
        'Które zaburzenia elektrolitowe drastycznie zwiększają podatność mięśnia sercowego na wydłużenie QTc i wystąpienie TdP podczas psychofarmakoterapii?',
        ['Hipokaliemia i hipomagnezemia', 'Niski poziom potasu i magnezu spowalnia repolaryzację komór i musi być wyrównany przed podaniem leków obciążających QTc.'],
        ['Hipernatremia z odwodnieniem', 'Sód wpływa głównie na osmolalność, to potas i magnez warunkują repolaryzację komór.'],
        ['Izolowany spadek poziomu żelaza', 'Niedobór żelaza wywołuje anemię, nie blokuje kanałów potasowych hERG.'],
        'psych-qtc-q2'
      ),
      q(
        'Który lek przeciwpsychotyczny II generacji niesie najwyższe ryzyko znacznego przyrostu masy ciała, insulinooporności i dyslipidemii?',
        ['Olanzapina', 'Olanzapina (obok klozapiny) wykazuje najsilniejszy potencjał diabetogenny i metaboliczny spośród SGA.'],
        ['Aripiprazol', 'Aripiprazol jest lekiem metabolicznie neutralnym.'],
        ['Zyprazydon', 'Zyprazydon nie powoduje istotnego przyrostu masy ciała.'],
        'psych-qtc-q3'
      ),
      q(
        'Dlaczego FDA i EMA ograniczyły maksymalną dawkę citalopramu do 20 mg/d u osób w podeszłym wieku (>60 r.ż.)?',
        ['Z powodu dawkozależnego wydłużenia odstępu QTc i ryzyka złośliwych arytmii komorowych', 'Badania kliniczne wykazały, że wyższe dawki citalopramu u osób starszych niosą nieakceptowalne ryzyko kardiologiczne.'],
        ['Ponieważ citalopram u osób starszych natychmiast powoduje wypadanie zębów', 'Lek nie wpływa na zęby.'],
        ['Ponieważ lek ten u osób starszych przestaje wchłaniać się z jelit', 'Lek wchłania się, a jego klirens jest obniżony, co zwiększa stężenie we krwi.'],
        'psych-qtc-q4'
      ),
      q(
        'Jakie postępowanie jest bezwzględnie zalecane przed wdrożeniem dożylnego haloperidolu w warunkach szpitalnych?',
        ['Wykonanie wyjściowego EKG z oceną odstępu QTc oraz oznaczenie poziomu potasu i magnezu', 'Haloperidol podany dożylnie stwarza wysokie ryzyko TdP, co wymaga wcześniejszej weryfikacji EKG i elektrolitów.'],
        ['Wykonanie tomografii komputerowej stóp', 'TK stóp nie ma żadnego związku z bezpieczeństwem kardiologicznym.'],
        ['Zalecenie pacjentowi picia 5 litrów czarnej kawy', 'Kofeina nasiliłaby tachykardię i pobudzenie.'],
        'psych-qtc-q5'
      ),
    ],
  },
];
