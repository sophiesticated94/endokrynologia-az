import { type DraftLesson, q } from './course-types.ts';

export const draftNenPart2: DraftLesson[] = [
  {
    id: 'nen-glukagonoma',
    title: 'Glukagonoma: rumień wędrujący nekrolityczny (NME) i hiperglikemia',
    group: 'Guzy neuroendokrynne trzustki (pNET)',
    readTime: '12 min',
    goals: [
      'Rozpoznać charakterystyczny obraz kliniczny rumienia wędrującego nekrolitycznego (necrolytic migratory erythema, NME).',
      'Zrozumieć patofizjologię katabolicznego działania glukagonu (hipoaminokwasemia, ubytek masy ciała, łagodna cukrzyca).',
      'Poznać powikłania zatorowo-zakrzepowe i zasady leczenia analogami somatostatyny (SSA).',
    ],
    sections: [
      {
        title: 'Zespół glukagonoma — triada objawów i fenotyp kataboliczny',
        content:
          'Glukagonoma to rzadki nowotwór neuroendokrynny komórek alfa wysepek trzustkowych (częstość <1 na 20 milionów), w ponad 60–80% przypadków w momencie rozpoznania wykazujący przerzuty (głównie do wątroby i regionalnych węzłów chłonnych). Klasyczny zespół kliniczny obejmuje: (1) rumień wędrujący nekrolityczny (NME), (2) łagodną cukrzycę lub nieprawidłową tolerancję glukozy, (3) drastyczny spadek masy ciała z wyniszczeniem mięśniowym, (4) zapalenie błon śluzowych jamy ustnej (glossitis, cheilitis) oraz (5) skłonność do zakrzepicy żył głębokich i zatorowości płucnej (nawet u 30–50% chorych).',
      },
      {
        title: 'Rumień wędrujący nekrolityczny (NME)',
        content:
          'NME jest objawem patognomonicznym, obecnym u około 70–80% pacjentów. Manifestuje się rumieniowymi, swędzącymi i bolesnymi wykwitami o obwodowym szerzeniu się, z tworzeniem pęcherzyków, pęcherzy, nadżerek i nawarstwionych strupów. Zmiany lokalizują się typowo w rejonach narażonych na tarcie: w pachwinach, okolicy krocza, pośladków, podudzi oraz wokół ust. Patogeneza NME wynika z głębokiej hipoaminokwasemii (spowodowanej stymulowaną glukagonem intensywną glukoneogenezą wątrobową z aminokwasów) oraz niedoborów cynku i kwasów tłuszczowych w naskórku.',
      },
      {
        title: 'Diagnostyka i leczenie',
        content:
          'Rozpoznanie potwierdza stężenie glukagonu w osoczu na czczo przekraczające 500–1000 pg/ml (norma <100–150 pg/ml). Zastosowanie analogów somatostatyny (oktreotyd, lanreotyd) przynosi spektakularną, szybką poprawę kliniczną — cofnięcie zmian skórnych NME w ciągu 48–72 godzin i zahamowanie katabolizmu. Z uwagi na wysokie ryzyko incydentów zakrzepowych bezwzględnie wdraża się profilaktykę heparyną drobnocząsteczkową.',
      },
    ],
    table: {
      caption: 'Kluczowe manifestacje zespołu glukagonoma',
      headers: ['Objaw kliniczny', 'Częstość występowania', 'Mechanizm patofizjologiczny', 'Postępowanie terapeutyczne'],
      rows: [
        ['Rumień wędrujący nekrolityczny (NME)', '70–80%', 'Hipoaminokwasemia, niedobór cynku w keratynocytach', 'Analogi somatostatyny (SSA), wlewy aminokwasów'],
        ['Ubytek masy ciała i kacheksja', '80–90%', 'Masywna proteoliza i glukoneogeneza wątrobowa', 'Żywienie pozajelitowe, leczenie cytoredukcyjne'],
        ['Cukrzyca / stan przedcukrzycowy', '80–90%', 'Glikogenoliza i glukoneogeneza wątrobowa', 'Dieta, metformina, insulina w razie potrzeby'],
        ['Żylna choroba zakrzepowo-zatorowa (VTE)', '30–50%', 'Stan nadkrzepliwości paraneoplastycznej', 'Profilaktyka HDCz u każdego hospitalizowanego pacjenta'],
      ],
    },
    advanced:
      'W histopatologii bioptatu skóry w NME obserwuje się charakterystyczną martwicę powierzchownych warstw naskórka (nekrolizę górnych 2/3 warstwy kolczystej) z obrzękiem i wakuolizacją keratynocytów. W odróżnieniu od łuszczycy brak jest jednak wydłużenia sopli naskórkowych.',
    summary:
      'Glukagonoma to złośliwy guz pNET o fenotypie katabolicznym. Osiowym objawem jest rumień NME wywołany hipoaminokwasemią. Terapia analogami somatostatyny daje natychmiastową remisję zmian skórnych.',
    sourceIds: ['enets-consensus-2023', 'nanets-pnet-2023'],
    questions: [
      q(
        'Jaki mechanizm bezpośrednio odpowiada za rozwój rumienia wędrującego nekrolitycznego (NME) w zespole glukagonoma?',
        ['Masywne zużycie aminokwasów w wątrobowej glukoneogenezie prowadzące do ciężkiej hipoaminokwasemii', 'Glukagon intensywnie stymuluje wychwyt aminokwasów przez hepatocyty do glukoneogenezy, pozbawiając keratynocyty prekursorów białkowych.'],
        ['Bezpośrednie toksyczne działanie glukagonu na melanocyty skóry', 'Glukagon nie działa cytotoksycznie na komórki barwnikowe.'],
        ['Alergia kontaktowa na związki niklu w diecie', 'NME jest zespołem paraneoplastycznym, a nie dermatozą kontaktową.']
      ),
      q(
        'Które powikłanie ogólnoustrojowe występuje u blisko 30–50% chorych z glukagonoma i wymaga rutynowej profilaktyki farmakologicznej?',
        ['Żylna choroba zakrzepowo-zatorowa (zakrzepica żył głębokich i zatorowość płucna)', 'Nadmierna sekrecja glukagonu indukuje stan prozakrzepowy, stanowiąc częstą przyczynę nagłych zgonów.'],
        ['Przełom tyreotoksyczny', 'Glukagonoma nie wpływa na gruczoł tarczowy.'],
        ['Ostra niewydolność wątroby w mechanizmie cholestazy wewnątrzwątrobowej', 'Przerzuty wątrobowe rzadko wywołują ostrą niewydolność narządu.']
      ),
      q(
        'Jaki odsetek guzów glukagonoma posiada przerzuty do wątroby lub węzłów chłonnych w momencie rozpoznania?',
        ['Ponad 60–80% przypadków', 'Glukagonoma charakteryzuje się wysoką złośliwością i późnym rozpoznaniem, przez co większość chorych ma już przerzuty.'],
        ['Mniej niż 5% przypadków', 'Niski odsetek przerzutów cechuje łagodną insulinoma, a nie złośliwy guz glukagonowy.'],
        ['Dokładnie 100% wszystkich guzów', 'Część chorych jest diagnozowana na etapie guza ograniczonego do trzustki.']
      ),
      q(
        'Jakie stężenie glukagonu w osoczu na czczo potwierdza podejrzenie zespołu glukagonoma?',
        ['Znacznie podwyższone stężenie glukagonu przekraczające 500–1000 pg/ml', 'Wartości >500 pg/ml przy normie <150 pg/ml potwierdzają autonomiczną sekrecję guza.'],
        ['Stężenie glukagonu poniżej progu wykrywalności (< 5 pg/ml)', 'Niski glukagon występuje w hipoglikemii indukowanej insuliną, a nie w glukagonoma.'],
        ['Prawidłowe stężenie glukagonu przy obniżonej insulinie', 'W zespole glukagonoma stężenie hormonu jest zawsze wybitnie podwyższone.']
      ),
      q(
        'Jaka jest odpowiedź zmian skórnych NME na wdrożenie leczenia analogami somatostatyny (SSA)?',
        ['Spektakularne cofanie się wykwitów skórnych w ciągu 48–72 godzin od podania leku', 'Hamowanie sekrecji glukagonu przez oktreotyd natychmiastowo przerywa katabolizm aminokwasów i goi naskórek.'],
        ['Całkowity brak reakcji wymagający natychmiastowej chemioterapii platynowej', 'Analogi SSA wykazują bardzo wysoką skuteczność w kontroli objawów NME.'],
        ['Nasilenie rumienia z przejściem w uogólnioną erytrodermię', 'Analogi somatostatyny nie zaostrzają zmian nekrolitycznych w glukagonoma.']
      ),
    ],
  },
  {
    id: 'nen-vipoma-rzadkie',
    title: 'VIPoma (zespół Vernera-Morrisona) oraz rzadkie pNET',
    group: 'Guzy neuroendokrynne trzustki (pNET)',
    readTime: '13 min',
    goals: [
      'Zdefiniować zespół Vernera-Morrisona (WDHA: Watery Diarrhea, Hypokalemia, Achlorhydria) wywołany przez guz VIPoma.',
      'Poznać mechanizm sekrecji wody i elektrolitów do światła jelita stymulowany przez VIP za pośrednictwem cAMP.',
      'Scharakteryzować rzadkie guzy neuroendokrynne trzustki: somatostatynoma, GRFoma oraz PPoma.',
    ],
    sections: [
      {
        title: 'VIPoma i zespół Vernera-Morrisona (WDHA / cholera trzustkowa)',
        content:
          'VIPoma wywodzi się z komórek D1 trzustki i autonomicznie wydziela wazoaktywny peptyd jelitowy (VIP). VIP wiąże się ze swoistymi receptorami VPAC1 i VPAC2 na enterocytach jelita cienkiego i grubego, aktywując cyklazę adenylanową i kaskadę cAMP/PKA. Wywołuje to masywną sekrecję jonów sodu, potasu, chlorków i wody do światła jelita przy jednoczesnym zahamowaniu wchłaniania. Obraz kliniczny określa się akronimem WDHA: Watery Diarrhea (wodniste, obfite stolce >3–5 litrów/dobę przypominające popłuczyny ryżowe), Hypokalemia (często <2,0 mmol/l) oraz Achlorhydria / hipochlorhydria (VIP hamuje komórki okładzinowe żołądka).',
      },
      {
        title: 'Zagrożenia metaboliczne i postępowanie w VIPoma',
        content:
          'Utrata płynów w stolcu prowadzi do wstrząsu hipowolemicznego, ostrego uszkodzenia nerek (AKI) i ciężkiej kwasicy nieoddechowej z prawidłową luką anionową (utrata wodorowęglanów w stolcu). Pacjenci wymagają natychmiastowej, agresywnej krystaloidoterapii dożylnej z intensywną suplementacją chlorku potasu (nawet 100–200 mmol K+/dobę) oraz natychmiastowego podania analogu somatostatyny (oktreotyd podskórnie lub dożylnie), który w ciągu kilku godzin zamyka sekrecję VIP i opanowuje biegunkę.',
      },
      {
        title: 'Rzadkie guzy pNET: Somatostatynoma, GRFoma i PPoma',
        content:
          'Somatostatynoma (guz komórek delta trzustki lub dwunastnicy) wydziela somatostatynę, prowadząc do tzw. zespołu hamowania: (1) cukrzyca (supresja insuliny), (2) kamica pęcherzyka żółciowego (zniesienie motoryki i obkurczania pęcherzyka przez hamowanie CCK) oraz (3) biegunka tłuszczowa (supresja enzymów trzustkowych). GRFoma wydziela somatoliberynę (GHRH), manifestując się akromegalią przy prawidłowej przysadce w badaniu MR. PPoma wydziela polipeptyd trzustkowy i zazwyczaj przebiega bezobjawowo (nieczynna hormonalnie).',
      },
    ],
    table: {
      caption: 'Zestawienie rzadkich czynnościowych guzów neuroendokrynnych trzustki',
      headers: ['Guz / Hormon', 'Zespół kliniczny', 'Wiodące cechy laboratoryjne', 'Leczenie pierwszego rzutu'],
      rows: [
        ['VIPoma (peptyd VIP)', 'Zespół Vernera-Morrisona (WDHA)', 'VIP > 75–100 pg/ml, K+ < 2,5 mmol/l, achlorhydria', 'Płynoterapia, KCl i.v., oktreotyd, resekcja'],
        ['Somatostatynoma (somatostatyna)', 'Zespół hamowania', 'Cukrzyca, kamica pęcherzyka, steatorrhea', 'Chirurgia, substytucja enzymów trzustkowych'],
        ['GRFoma (GHRH)', 'Pozaprzysadkowa akromegalia', 'Wysokie IGF-1 i GHRH w osoczu, czysta przysadka w MR', 'Resekcja guza, analogi somatostatyny (SSA)'],
        ['Glukagonoma (glukagon)', 'Zespół kataboliczny NME', 'Glukagon > 500 pg/ml, głęboka hipoaminokwasemia', 'Oktreotyd/lanreotyd, HDCz, chirurgia'],
      ],
    },
    advanced:
      'W odróżnieniu od biegunek osmotycznych (np. w nietolerancji laktozy), biegunka w zespole WDHA jest typową biegunką sekrecyjną — nie ustępuje w trakcie całkowitej głodówki (postu) i cechuje się luką osmotyczną stolca poniżej 50 mOsm/kg.',
    summary:
      'VIPoma manifestuje się zespołem WDHA (cholerą trzustkową) z ciężką hipokaliemią i achlorhydrią. Somatostatynoma wywołuje triadę: cukrzycę, kamicę żółciową i biegunkę tłuszczową. Podstawą terapii objawowej są analogi somatostatyny.',
    sourceIds: ['enets-consensus-2023', 'who-nen-2022'],
    questions: [
      q(
        'Który zestaw zaburzeń elektrolitowych i hemodynamicznych stanowi bezpośrednie zagrożenie życia w zespole Vernera-Morrisona (VIPoma)?',
        ['Ciężka hipokaliemia, odwodnienie izotoniczne i kwasica metaboliczna z utraty wodorowęglanów', 'Utrata 3–5 litrów stolca na dobę wypłukuje potas i wodorowęglany, wywołując hipowolemię i groźne arytmie serca.'],
        ['Ciężka hiperkaliemia z kwasicą ketonową', 'Hipokaliemia, a nie hiperkaliemia jest definicyjnym elementem zespołu WDHA.'],
        ['Hipernatremia z zasadowicą oddechową', 'Wodnista sekrecja jelitowa nie prowadzi do zasadowicy oddechowej.']
      ),
      q(
        'Jakie objawy tworzą klasyczną triadę zespołu somatostatynoma?',
        ['Cukrzyca, kamica pęcherzyka żółciowego i biegunka tłuszczowa', 'Somatostatyna hamuje wydzielanie insuliny (cukrzyca), cholecystokininy (atonia pęcherzyka i kamica) oraz enzymów trzustkowych (steatorrhea).'],
        ['Nadciśnienie, tachykardia i bladość powłok', 'Jest to triada guza chromochłonnego nadnerczy (pheochromocytoma).'],
        ['Otyłość brzuszna, rozstępy i zanik mięśni', 'To fenotyp zespołu Cushinga.']
      ),
      q(
        'Jaki przekaźnik drugorzędowy w enterocytach pośredniczy w wywoływaniu wodnistej biegunki przez peptyd VIP?',
        ['Cykliczny adenozynomonofosforan (cAMP) aktywujący kinazę PKA i wydzielanie elektrolitów', 'VIP pobudza receptory VPAC1/2 sprzężone z białkiem Gs, stymulując cyklazę adenylanową do produkcji cAMP.'],
        ['Cykliczny guanozynomonofosforan (cGMP)', 'Szlak cGMP jest aktywowany m.in. przez peptydy natriuretyczne, a nie VIP.'],
        ['Inozytolotrifosforan (IP3) i jony wapnia', 'Głównym efektorem VIP w enterocytach jest kaskada cAMP/PKA.']
      ),
      q(
        'Jaki zespół kliniczny wywołuje pozaprzysadkowy guz neuroendokrynny trzustki GRFoma?',
        ['Objawy akromegalii spowodowane ektopowym wydzielaniem somatoliberyny (GHRH) przy prawidłowej przysadce', 'GHRH wydzielane przez guz pobudza somatotropy przysadki do hipersekrecji GH i IGF-1.'],
        ['Zespół Conna z opornym nadciśnieniem i hiperaldosteronizmem', 'GRFoma nie stymuluje kory nadnerczy do wydzielania mineralokortykosteroidów.'],
        ['Chorobę Addisona z hiperpigmentacją skóry', 'Niedoczynność kory nadnerczy nie ma związku z sekrecją GHRH.']
      ),
      q(
        'Jaka cecha kliniczna pozwala odróżnić biegunkę w zespole WDHA od biegunki osmotycznej?',
        ['Biegunka sekrecyjna w WDHA nie ustępuje podczas całkowitej głodówki (postu)', 'Sekrecja elektrolitów stymulowana przez VIP jest autonomiczna i nie zależy od obecności pokarmu w świetle jelita.'],
        ['Biegunka w WDHA całkowicie znika po 6 godzinach niejedzenia', 'Ustępowanie po głodówce jest cechą biegunki osmotycznej, np. w nietolerancji laktozy.'],
        ['Biegunka w WDHA występuje wyłącznie w godzinach nocnych', 'Wypróżnienia w VIPoma są ciągłe w ciągu całej doby, osiągając objętość wielu litrów.']
      ),
    ],
  },
  {
    id: 'nen-zespol-rakowiaka',
    title: 'Zespół rakowiaka: flushing, biegunki i bocznikowanie tryptofanu',
    group: 'Zespół rakowiaka i NEN przewodu pokarmowego oraz płuc',
    readTime: '13 min',
    goals: [
      'Zrozumieć patomechanizm zespołu rakowiaka i rolę ominięcia krążenia wrotnego (przerzuty do wątroby, rakowiaki oskrzela).',
      'Poznać główne objawy: napadowe zaczerwienienie twarzy (flushing), biegunkę sekrecyjną, skurcz oskrzeli i bocznikowanie tryptofanu (pelagra).',
      'Scharakteryzować farmakoterapię: analogi somatostatyny (oktreotyd/lanreotyd) oraz inhibitor hydroksylazy tryptofanu (telotristat etylu).',
    ],
    sections: [
      {
        title: 'Dlaczego zespół rakowiaka wymaga obecności przerzutów wątrobowych?',
        content:
          'Klasyczny rakowiak przewodu pokarmowego wywodzi się z komórek enterochromafinowych (EC) jelita krętego (midgut) i wydziela serotoninę, histaminę, prostaglandyny i kalikreinę. W przypadku izolowanego guza jelita substancje te trafiają żyłą wrotną do wątroby, gdzie ulegają niemal w 100% inaktywacji przez monoaminooksydazę (MAO) i cytochromy. Dlatego zespół rakowiaka rozwija się dopiero wtedy, gdy powstaną przerzuty do wątroby (krew z przerzutów uchodzi bezpośrednio do żył wątrobowych i krążenia systemowego) lub gdy guz pierwotny leży poza spływem wrotnym (np. rakowiak oskrzela, jajnika lub jądra).',
      },
      {
        title: 'Obraz kliniczny: flushing, biegunki i pelagra',
        content:
          'Dwa osiowe objawy to: (1) napadowy flushing (nagłe, kilkuminutowe zaczerwienienie twarzy, szyi i górnej części klatki piersiowej, często wyzwalane alkoholem, stresem lub posiłkiem) oraz (2) przewlekła, wodnista biegunka o charakterze sekrecyjnym (pobudzenie perystaltyki i sekrecji jelitowej przez serotoninę). Ponadto u części chorych rozwija się pelagra (szorstka skóra, zapalenie języka, biegunka, encefalopatia) spowodowana biologicznym bocznikowaniem: do 99% spożytego tryptofanu zostaje zużyte przez komórki guza na syntezę serotoniny, co odcina szlak produkcji niacyny (witaminy B3 / kwasu nikotynowego).',
      },
      {
        title: 'Leczenie farmakologiczne: SSA i telotristat etylu',
        content:
          'Lekami pierwszego rzutu są długodziałające analogi somatostatyny (oktreotyd LAR, lanreotyd autogel), które hamują sekrecję serotoniny i cytokin naczynioruchowych u >70% chorych oraz wykazują działanie antyproliferacyjne. W przypadku biegunki opornej na optymalne dawki SSA przełomem stał się telotristat etylu — doustny drobnocząsteczkowy inhibitor hydroksylazy tryptofanu (TPH), który blokuje pierwszy i ograniczający krok syntezy serotoniny obwodowej, redukując liczbę wypróżnień i stężenie 5-HIAA.',
      },
    ],
    table: {
      caption: 'Objawy kliniczne zespołu rakowiaka',
      headers: ['Objaw', 'Częstość', 'Główny mediator', 'Leczenie celowane'],
      rows: [
        ['Napadowe zaczerwienienie (flushing)', '85–90%', 'Tachykininy, histamina, serotonina, kalikreina', 'Analogi somatostatyny (oktreotyd/lanreotyd)'],
        ['Sekrecyjna biegunka', '70–80%', 'Serotonina (5-HT3, 5-HT4 w jelicie)', 'SSA, telotristat etylu, loperamid'],
        ['Pelagra (niedobór witaminy B3)', '5–10%', 'Zużycie tryptofanu na serotoninę zamiast niacyny', 'Suplementacja niacyny (kwasu nikotynowego)'],
        ['Skurcz oskrzeli (świsty, duszność)', '15–20%', 'Histamina, bradykinina, serotonina', 'SSA, unikać beta-mimetyków (paradoksalny wyrzut)'],
      ],
    },
    advanced:
      'W przypadku wystąpienia skurczu oskrzeli u chorego z zespołem rakowiaka bezwzględnie przeciwwskazane są klasyczne leki beta-adrenergiczne (np. salbutamol, adrenalina) — pobudzenie receptorów beta w guzie wyzwala gwałtowny, masywny wyrzut mediatorów, paradoksalnie nasilając bronchospazm i hipotensję. Jedynym bezpiecznym lekiem rozkurczającym jest dożylny wlew oktreotydu.',
    summary:
      'Zespół rakowiaka manifestuje się flushingiem i biegunką sekrecyjną. Wymaga przerzutów wątrobowych omijających inaktywację wrotną. Bocznikowanie tryptofanu może prowadzić do pelagry. Terapia opiera się na SSA i telotristacie etylu.',
    sourceIds: ['enets-consensus-2023', 'who-nen-2022'],
    questions: [
      q(
        'Dlaczego izolowany, pierwotny rakowiak jelita krętego o średnicy 2 cm bez przerzutów nie wywołuje zespołu rakowiaka?',
        ['Wydzielana serotonina spływa żyłą wrotną do wątroby i ulega enzymatycznej inaktywacji przez MAO', 'Dopiero obecność przerzutów w miąższu wątroby pozwala na bezpośredni drenaż mediatorów do żył wątrobowych i krążenia ogólnego.'],
        ['W jelicie krętym komórki nie produkują serotoniny', 'Rakowiaki jelita krętego są najbogatszym źródłem serotoniny.'],
        ['Serotonina jest natychmiast neutralizowana przez kwas żołądkowy', 'Kwas żołądkowy znajduje się w żołądku, a nie w krążeniu krezkowym jelita krętego.']
      ),
      q(
        'Dlaczego u pacjenta z zaawansowanym rakowiakiem midgut może dojść do rozwoju pelagry (niedoboru niacyny)?',
        ['Komórki nowotworowe zużywają nawet 99% puli tryptofanu na syntezę serotoniny, blokując syntezę kwasu nikotynowego', 'Tryptofan jest wspólnym prekursorem serotoniny i niacyny; jego przechwycenie przez masę guza prowadzi do awitaminozy B3.'],
        ['Serotonina niszczy receptory dla witaminy B3 w enterocytach', 'Nie ma receptorów dla niacyny o takim mechanizmie destrukcji.'],
        ['Oktreotyd chelatuje witaminy rozpuszczalne w wodzie', 'Analogi SSA nie wiążą witamin z grupy B.']
      ),
      q(
        'Jaki drobnocząsteczkowy doustny inhibitor hydroksylazy tryptofanu (TPH) stosuje się w opornych biegunkach zespołu rakowiaka?',
        ['Telotristat etylu', 'Telotristat etylu blokuje kluczowy enzym syntezy serotoniny obwodowej, redukując częstotliwość wypróżnień i stężenie 5-HIAA.'],
        ['Metformina', 'Metformina jest lekiem przeciwcukrzycowym i nie hamuje szlaku serotoniny.'],
        ['Loperamid w monoterapii', 'Loperamid zwalnia motorykę jelit, lecz nie wpływa na syntezę serotoniny przez guz.']
      ),
      q(
        'Który z objawów naczynioruchowych jest najczęstszą manifestacją zespołu rakowiaka (u 85–90% chorych)?',
        ['Napadowy flushing (nagłe zaczerwienienie twarzy, szyi i klatki piersiowej)', 'Flushing wyzwalany alkoholem, stresem lub tyraminą jest wiodącym objawem naczyniowym.'],
        ['Utrwalona bladość skóry powłok brzusznych', 'Zespół rakowiaka wywołuje rozszerzenie naczyń i zaczerwienienie, a nie bladość.'],
        ['Zasinienie dystalnych paliczków stóp', 'Zasinienie nie jest typowym objawem zespołu rakowiaka.']
      ),
      q(
        'Jakie leki są bezwzględnie przeciwwskazane w razie wystąpienia skurczu oskrzeli u pacjenta z zespołem rakowiaka?',
        ['Klasyczne beta-mimetyki (adrenalina, salbutamol), które paradoksalnie wyzwalają lawinowy wyrzut mediatorów z guza', 'Pobudzenie receptorów beta w komórkach rakowiaka stymuluje degranulację i może wywołać śmiertelny przełom.'],
        ['Dożylne analogi somatostatyny (oktreotyd)', 'Oktreotyd jest lekiem z wyboru hamującym bronchospazm w zespole rakowiaka.'],
        ['Glikokortykosteroidy o działaniu przeciwzapalnym', 'Glikokortykosteroidy mogą być bezpiecznie stosowane wspomagająco.']
      ),
    ],
  },
  {
    id: 'nen-serce-rakowiaka',
    title: 'Serce rakowiaka (zespół Hedingera): patologia zastawki trójdzielnej',
    group: 'Zespół rakowiaka i NEN przewodu pokarmowego oraz płuc',
    readTime: '12 min',
    goals: [
      'Poznać patofizjologię włóknienia wsierdzia prawej połowy serca w zespole Hedingera.',
      'Zrozumieć dlaczego zmiany dotyczą niemal wyłącznie zastawek trójdzielnej i pnia płucnego (rola inaktywacji serotoniny w płucach).',
      'Opanować zasady monitorowania echokardiograficznego, rolę biomarkera NT-proBNP oraz kwalifikację do kardiochirurgicznej wymiany zastawek.',
    ],
    sections: [
      {
        title: 'Patogeneza zespołu Hedingera (carcinoid heart disease)',
        content:
          'Serce rakowiaka (zespół Hedingera) rozwija się u około 20–40% chorych z zaawansowanym zespołem rakowiaka i przerzutami do wątroby. Charakteryzuje się odkładaniem bogatych w kolagen mas włóknistych na wsierdziu komór, przedsionków oraz na aparacie zastawkowym prawej połowy serca. Bezpośrednim mediatorem włóknienia jest serotonina działająca poprzez receptor 5-HT2B na fibroblastach i komórkach śródbłonka wsierdzia, indukująca kaskadę transformującego czynnika wzrostu beta (TGF-beta) i syntezę macierzy pozakomórkowej.',
      },
      {
        title: 'Dlaczego prawa połowa serca? Fenomen ochronnego filtra płucnego',
        content:
          'Wysokie stężenie serotoniny z przerzutów wątrobowych trafia żyłą główną dolną bezpośrednio do prawego przedsionka i prawej komory, niszcząc zastawkę trójdzielną i płucną (prowadząc do ich unieruchomienia, skurczenia płatków i ciężkiej niedomykalności). Następnie krew przepływa przez łożysko naczyniowe płuc, gdzie komórki śródbłonka wykazują bardzo bogatą ekspresję monoaminooksydazy A (MAO-A) i transportera SERT, niemal całkowicie inaktywując serotoninę. Dzięki temu lewa połowa serca jest chroniona (zajęcie zastawek lewego serca występuje tylko przy obecności rakowiaka płucnego lub przetrwałego otworu owalnego PFO).',
      },
      {
        title: 'Diagnostyka i leczenie kardiochirurgiczne',
        content:
          'Wiodącym biomarkerem wczesnego uszkodzenia mięśnia sercowego w rakowiaku jest NT-proBNP (wartość > 260 pg/ml wymaga pilnego wykonania echokardiografii przezklatkowej TTE). Obrazem typowym jest unieruchomienie i retrakcja płatków zastawki trójdzielnej z potężną falą niedomykalności i powiększeniem prawej komory. Przy objawowej niewydolności serca leczeniem z wyboru jest kardiochirurgiczna wymiana zastawki trójdzielnej (zwykle na protezę biologiczną z uwagi na ryzyko krwawień przy antykoagulacji).',
      },
    ],
    table: {
      caption: 'Cechy zespołu serca rakowiaka (zespołu Hedingera)',
      headers: ['Cecha', 'Prawa połowa serca', 'Lewa połowa serca', 'Uwagi kliniczne'],
      rows: [
        ['Zajęte zastawki', 'Zastawka trójdzielna, zastawka pnia płucnego', 'Zastawka mitralna, aortalna (<10%)', 'Zajęcie lewego serca sugeruje PFO lub rakowiaka oskrzela'],
        ['Główna wada', 'Ciężka niedomykalność trójdzielna', 'Niedomykalność / stenoza mitralna', 'Prowadzi do zastoinowej prawokomorowej niewydolności serca'],
        ['Biomarkery', 'NT-proBNP > 260 pg/ml, 5-HIAA w DZM', 'Podwyższone NT-proBNP', 'NT-proBNP monitorowane rutynowo co 6 miesięcy u chorych z midgut'],
        ['Leczenie', 'Wymiana zastawki trójdzielnej (bioproteza)', 'Wymiana zastawek lewego serca', 'Wymaga bezwzględnej osłony wlewem oktreotydu podczas operacji'],
      ],
    },
    advanced:
      'Leki o działaniu agonistycznym wobec receptora 5-HT2B (np. fenfluramina stosowana dawniej w odchudzaniu, kabergolina i pergolid w chorobie Parkinsona) wywoływały identyczne włóknienie wsierdzia i wady zastawkowe jak zespół rakowiaka, co ostatecznie potwierdziło wiodącą rolę szlaku 5-HT2B w kardiomiopatii rakowiakowej.',
    summary:
      'Zespół Hedingera to włóknienie wsierdzia prawej połowy serca wywołane aktywacją receptorów 5-HT2B przez serotoninę. Filtr płucny chroni lewe serce. NT-proBNP to kluczowy marker skriningowy, a leczeniem z wyboru jest wymiana zastawki trójdzielnej.',
    sourceIds: ['enets-consensus-2023', 'who-nen-2022'],
    questions: [
      q(
        'Dlaczego u pacjenta z rakowiakiem jelita cienkiego i przerzutami do wątroby zmiany włókniste dotyczą zastawek prawej, a nie lewej połowy serca?',
        ['Śródbłonek naczyń płucnych wychwytuje i inaktywuje serotoninę za pośrednictwem enzymu MAO-A zanim krew dotrze do lewego serca', 'Krążenie płucne stanowi metaboliczną barierę zabezpieczającą lewy przedsionek i lewą komorę przed toksycznym stężeniem serotoniny.'],
        ['Receptory 5-HT2B występują wyłącznie w komorze prawej serca', 'Receptory serotoninowe obecne są w obu komorach, lecz w lewej brak jest ekspozycji na serotoninę.'],
        ['W lewym sercu panuje zbyt wysokie ciśnienie dla rozwoju włóknienia', 'Wysokie ciśnienie sprzyja uszkodzeniom zastawkowym, a brak zmian wynika wyłącznie z degradacji mediatora w płucach.']
      ),
      q(
        'Który biomarker krwi cechuje się najwyższą czułością we wczesnym wykrywaniu kardiomiopatii rakowiakowej i powinien być rutynowo monitorowany?',
        ['NT-proBNP', 'Wzrost stężenia NT-proBNP powyżej 260 pg/ml koreluje z wczesnym przeciążeniem prawej komory i stanowi bezwzględne wskazanie do echokardiografii.'],
        ['Troponina I', 'Troponina wskazuje na ostre niedokrwienie miokardium, a nie przewlekłe włóknienie wsierdzia.'],
        ['D-dimery', 'D-dimery są markerem zakrzepicy, nie kardiomiopatii zastawkowej.']
      ),
      q(
        'Który receptor serotoninowy jest bezpośrednio odpowiedzialny za indukcję włóknienia wsierdzia i aparatu zastawkowego?',
        ['Receptor 5-HT2B', 'Aktywacja receptora 5-HT2B na fibroblastach wsierdzia indukuje kaskadę profibrotyczną zależną od TGF-beta i odkładanie kolagenu.'],
        ['Receptor 5-HT1A', 'Receptor 5-HT1A odpowiada za neurotransmisję w OUN i nie indukuje włóknienia wsierdzia.'],
        ['Receptor 5-HT3', 'Receptor 5-HT3 jest kanałem jonowym zaangażowanym w nudności i motorykę jelitową.']
      ),
      q(
        'Jaka patologia zastawkowa prawej komory serca występuje najczęściej w zespole Hedingera?',
        ['Ciężka niedomykalność zastawki trójdzielnej z retrakcją i unieruchomieniem płatków', 'Włóknienie powoduje obkurczenie płatków i strun ścięgnistych, uniemożliwiając koaptację zastawki w skurczu.'],
        ['Czyste zwężenie zastawki aortalnej z dużym gradientem skurczowym', 'Zastawka aortalna leży w lewym sercu i jest chroniona przed serotoniną przez płuca.'],
        ['Wypadanie płatka zastawki mitralnej bez niedomykalności', 'Wypadanie płatka ma podłoże dysplazji mezenchymalnej, a nie rakowiakowej.']
      ),
      q(
        'W jakiej sytuacji klinicznej zmiany włókniste w zespole rakowiaka mogą objąć także zastawki lewej połowy serca?',
        ['W przypadku pierwotnego rakowiaka płuca lub obecności przetrwałego otworu owalnego (PFO) z przeciekiem prawo-lewym', 'Sytuacje te powodują ominięcie filtru płucnego i bezpośredni dopływ niezinaktywowanej serotoniny do lewego przedsionka.'],
        ['Wyłącznie u pacjentów w podeszłym wieku powyżej 85 lat', 'Wiek nie decyduje o dystrybucji zmian zastawkowych.'],
        ['Po zastosowaniu radioizotopowej terapii PRRT z użyciem 177Lu', 'PRRT nie wywołuje wybiórczego uszkodzenia zastawek lewego serca.']
      ),
    ],
  },
  {
    id: 'nen-przelom-rakowiaka',
    title: 'Przełom rakowiaka: patofizjologia, wstrząs i profilaktyka oktreotydem',
    group: 'Zespół rakowiaka i NEN przewodu pokarmowego oraz płuc',
    readTime: '13 min',
    goals: [
      'Zrozumieć patomechanizm zagrażającego życiu przełomu rakowiaka (carcinoid crisis) wyzwalanego stresem, anestezją lub manipulacją guzem.',
      'Rozpoznać niestabilność hemodynamiczną: zapaść krążeniową, arytmie, uogólnione zaczerwienienie i skurcz oskrzeli.',
      'Opanować schemat okołooperacyjnej profilaktyki ciągłym wlewem dożylnym oktreotydu wg wytycznych ENETS/NANETS.',
    ],
    sections: [
      {
        title: 'Czym jest przełom rakowiaka (carcinoid crisis)?',
        content:
          'Przełom rakowiaka to najcięższe, bezpośrednio zagrażające życiu powikłanie zespołu rakowiaka. Stanowi nagły, masywny i niekontrolowany wyrzut mediatorów biologicznie czynnych (serotoniny, histaminy, bradykininy, kallikreiny, tachykinin) do krążenia ogólnego. Prowadzi do gwałtownego rozszerzenia naczyń obwodowych, zapaści naczyniowej (opornej na płynoterapię i aminy presyjne), skrajnej tachykardii, arytmii komorowych, ciężkiego skurczu oskrzeli uniemożliwiającego wentylację oraz gwałtownego zaczerwienienia lub zasinienia skóry.',
      },
      {
        title: 'Czynniki wyzwalające i śmiertelna pułapka amin katecholowych',
        content:
          'Najczęstszymi wyzwalaczami przełomu są: indukcja znieczulenia ogólnego (zwłaszcza intubacja, podanie leków histaminoliberaotów, np. miwakurium), mechaniczna manipulacja guzem podczas operacji lub biopsji gruboigłowej, embolizacja tętnicy wątrobowej (TACE) oraz rozpoczęcie chemioterapii lub PRRT. Krytycznym błędem w resuscytacji hipotensji w przełomie jest podanie katecholamin (adrenaliny, noradrenaliny) — stymulacja receptorów alfa- i beta-adrenergicznych na komórkach guza wyzwala lawinowy wyrzut kolejnych porcji mediatorów, nasilając wstrząs i prowadząc do zgonu.',
      },
      {
        title: 'Profilaktyka i leczenie: schemat wlewu oktreotydu',
        content:
          'Jedynym skutecznym lekiem przerywającym przełom rakowiaka jest dożylny oktreotyd. W sytuacji ostrej podaje się bolus 500–1000 µg i.v., a następnie ciągły wlew z prędkością 100–200 µg/godzinę. Wytyczne ENETS bezwzględnie nakazują wdrożenie profilaktycznego wlewu oktreotydu (50–100 µg/h i.v.) u każdego chorego z zespołem rakowiaka lub wysokim 5-HIAA rozpoczynając na 2 godziny przed planowanym zabiegiem chirurgicznym, anestezją lub inwazyjną procedurą radiologiczną, z kontynuacją przez 24–48 godzin po operacji.',
      },
    ],
    table: {
      caption: 'Postępowanie w profilaktyce i leczeniu przełomu rakowiaka',
      headers: ['Sytuacja kliniczna', 'Zalecane postępowanie', 'Lek z wyboru / Dawkowanie', 'Błędy w sztuce i pułapki'],
      rows: [
        ['Profilaktyka przedoperacyjna', 'Wlew i.v. rozpoczęty min. 2h przed indukcją', 'Oktreotyd 50–100 µg/h w ciągłym wlewie dożylnym', 'Poleganie wyłącznie na wcześniej podanej dawce leku domięśniowego LAR'],
        ['Ostry przełom śródoperacyjny', 'Natychmiastowy bolus dożylny + eskalacja wlewu', 'Bolus oktreotydu 500–1000 µg i.v., powtarzany w razie potrzeby', 'Podanie adrenaliny lub dopaminy w celu podniesienia ciśnienia'],
        ['Skurcz oskrzeli w przełomie', 'Wyłącznie antagoniści SSTR2 i.v.', 'Oktreotyd w bolusie i.v., pogłębienie sedacji anestetycznej', 'Podanie wziewnych beta2-mimetyków (stymulują wyrzut serotoniny)'],
        ['Utrzymująca się hipotensja', 'Płynoterapia krystaloidowa + oktreotyd + wazopresyna', 'Wazopresyna (nie pobudza receptorów adrenergicznych)', 'Przetoczenie amin katecholowych pierwszego rzutu'],
      ],
    },
    advanced:
      'Chociaż pacjenci przewlekle przyjmują comiesięczne iniekcje oktreotydu LAR lub lanreotydu autogel, stężenie leku we krwi z form depot jest niewystarczające do zablokowania ostrego, masywnego wyrzutu mediatorów w trakcie znieczulenia. Profilaktyczny wlew ciągły szybko działającego oktreotydu w pompie infuzyjnej jest bezwzględnie konieczny.',
    summary:
      'Przełom rakowiaka to zapaść naczyniowa wywołana nagłym wyrzutem mediatorów guza. Aminy katecholowe są bezwzględnie przeciwwskazane. Podstawą leczenia i profilaktyki przed każdym zabiegiem jest ciągły dożylny wlew oktreotydu.',
    sourceIds: ['enets-consensus-2023', 'who-nen-2022'],
    questions: [
      q(
        'Jakiego leku NIE WOLNO podawać w przypadku ciężkiej hipotensji podczas przełomu rakowiaka na sali operacyjnej?',
        ['Adrenaliny i leków pobudzających receptory beta-adrenergiczne', 'Stymulacja receptorów adrenergicznych na komórkach guza wyzwala kolejny masywny wyrzut serotoniny i kalikreiny, pogłębiając zapaść.'],
        ['Oktreotydu w bolusie dożylnym', 'Oktreotyd jest lekiem ratującym życie i lekiem pierwszego wyboru w przełomie.'],
        ['Wazopresyny', 'Wazopresyna może być bezpiecznie stosowana, gdyż obkurcza naczynia bez pobudzania receptorów adrenergicznych w guzie.']
      ),
      q(
        'Jakie postępowanie profilaktyczne jest bezwzględnie wymagane przed planowaną biopsją lub resekcją guza u chorego z zespołem rakowiaka?',
        ['Rozpoczęcie ciągłego wlewu dożylnego oktreotydu (50–100 µg/h) na 2 godziny przed zabiegiem', 'Zapewnia to stałe wysokie stężenie leku w surowicy i natychmiastowe zablokowanie degranulacji komórek guza.'],
        ['Jednorazowe podanie tabletki aspiryny', 'Aspiryna nasila ryzyko krwawienia i nie zapobiega przełomowi.'],
        ['Głodówka przez 5 dni przed zabiegiem', 'Długotrwały post osłabia pacjenta i nie chroni przed wyrzutem mediatorów.']
      ),
      q(
        'Jakie objawy kliniczne charakteryzują ostry przełom rakowiaka w trakcie anestezji?',
        ['Głęboka zapaść hemodynamiczna, tachyarytmie, uogólnione zaczerwienienie skóry i ciężki skurcz oskrzeli', 'Masywny wyrzut serotoniny, bradykininy i histaminy wywołuje wstrząs dystrybucyjny i bronchospazm.'],
        ['Wzrost ciśnienia tętniczego z obrzękiem płuc i bradykardią', 'Przełom rakowiaka manifestuje się głęboką hipotensją i tachykardią, a nie obrzękiem płuc.'],
        ['Izolowana hipertermia zesztywniająca mięśnie bez zmian ciśnienia', 'Sztywność mięśniowa jest cechą hipertermii złośliwej (mutacja RYR1), a nie przełomu rakowiaka.']
      ),
      q(
        'Jaki lek wazopresyjny niepobudzający receptorów adrenergicznych można bezpiecznie rozważyć w opornej hipotensji przełomu rakowiaka?',
        ['Wazopresynę (działającą przez receptory V1a mięśniówki naczyniowej)', 'Wazopresyna obkurcza łożysko naczyniowe bez pobudzania receptorów adrenergicznych guza.'],
        ['Izoprenalinę (nieselektywny beta-agonista)', 'Izoprenalina wywołałaby katastrofalne nasilenie wyrzutu mediatorów z guza.'],
        ['Dobutaminę w wysokich dawkach', 'Aminy katecholowe są bezwzględnie przeciwwskazane w resuscytacji przełomu rakowiaka.']
      ),
      q(
        'Dlaczego comiesięczne iniekcje domięśniowe oktreotydu LAR nie eliminują konieczności wlewu dożylnego przed operacją?',
        ['Stężenie leku we krwi z postaci depot jest niewystarczające do opanowania ostrego, masywnego wyrzutu mediatorów', 'Kinetyka uwalniania depot zabezpiecza przed powolną progresją, lecz wlew ciągły i.v. gwarantuje natychmiastowe wysokie stężenie nasycające SSTR2.'],
        ['Oktreotyd LAR traci właściwości wiążące w kontakcie ze środkami wziewnymi', 'Anestetyki wziewne nie inaktywują cząsteczki oktreotydu.'],
        ['Forma LAR działa wyłącznie w świetle przewodu pokarmowego', 'Oktreotyd LAR wchłania się do krążenia ogólnego, lecz ma odmienną dynamikę stężeń.']
      ),
    ],
  },
];
