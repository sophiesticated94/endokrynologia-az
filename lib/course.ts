export const CONTENT_VERSION = '2026.09.11.3';
import legacyQuestionIds from './question-ids.json' with {type:'json'};
import {gahtLessons, gahtSources, gahtConceptCards, gahtLessonIds} from './course-gaht.ts';
import {studyPrompts} from './study-paths.ts';
export const VERIFIED_AT = '2026-09-11';
export type { ModuleId, Option, Question, Source, Pair, DraftQuestion, Lesson, DraftLesson } from './course-types.ts';
import { type ModuleId, type Lesson, type DraftLesson, type Source, q } from './course-types.ts';
import { pituitarySources } from './course-pituitary-sources.ts';
import { draftPituitaryPart1 } from './course-pituitary-1.ts';
import { draftPituitaryPart2 } from './course-pituitary-2.ts';
import { adrenalSources } from './course-adrenal-sources.ts';
import { draftAdrenalPart1 } from './course-adrenal-1.ts';
import { draftAdrenalPart2 } from './course-adrenal-2.ts';
import { parathyroidSources } from './course-parathyroid-sources.ts';
import { draftParathyroidPart1 } from './course-parathyroid-1.ts';
import { draftParathyroidPart2 } from './course-parathyroid-2.ts';
import { thyroidMathChemSources, draftThyroidMathChem } from './course-thyroid-math-chem.ts';
import { pituitaryMathChemSources, draftPituitaryMathChem } from './course-pituitary-math-chem.ts';
import { adrenalMathChemSources, draftAdrenalMathChem } from './course-adrenal-math-chem.ts';
import { parathyroidMathChemSources, draftParathyroidMathChem } from './course-parathyroid-math-chem.ts';
import { diabetesSources } from './course-diabetes-sources.ts';
import { draftDiabetesPart1 } from './course-diabetes-1.ts';
import { draftDiabetesPart2 } from './course-diabetes-2.ts';
import { draftDiabetesMathChem } from './course-diabetes-math-chem.ts';
import { gonadsSources } from './course-gonads-sources.ts';
import { draftGonadsPart1 } from './course-gonads-1.ts';
import { draftGonadsPart2 } from './course-gonads-2.ts';
import { draftGonadsPart3 } from './course-gonads-3.ts';
import { draftGonadsPart4 } from './course-gonads-4.ts';
import { nenSources } from './course-nen-sources.ts';
import { draftNenPart1 } from './course-nen-1.ts';
import { draftNenPart2 } from './course-nen-2.ts';
import { draftNenPart3 } from './course-nen-3.ts';
import { draftNenPart4 } from './course-nen-4.ts';
import { otyloscSources } from './course-otylosc-sources.ts';
import { draftOtyloscPart1 } from './course-otylosc-1.ts';
import { draftOtyloscPart2 } from './course-otylosc-2.ts';
import { draftOtyloscPart3 } from './course-otylosc-3.ts';
import { draftOtyloscPart4 } from './course-otylosc-4.ts';

const thyroidSources: Record<string, Source> = {
  physiology:{id:'physiology',title:'Endotext — Thyroid Hormone Synthesis and Secretion',year:'2015',url:'https://www.ncbi.nlm.nih.gov/books/NBK285550/',kind:'Podręcznik: fizjologia'},
  central:{id:'central',title:'ETA — Central Hypothyroidism',year:'2018',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC6198777/',kind:'Wytyczne'},
  lt4:{id:'lt4',title:'ETA — Levothyroxine preparations in monotherapy',year:'2025',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC12323320/',kind:'Wytyczne'},
  hashimoto:{id:'hashimoto',title:'NIDDK — Hashimoto’s Disease',year:'2021',url:'https://www.niddk.nih.gov/health-information/endocrine-diseases/hashimotos-disease',kind:'Materiał uzupełniający: podstawy'},
  subclinical:{id:'subclinical',title:'ETA — Subclinical Hypothyroidism',year:'2013',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC3923601/',kind:'Wytyczne'},
  graves:{id:'graves',title:'ETA — Management of Graves’ Hyperthyroidism',year:'2018',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC6140607/',kind:'Wytyczne'},
  eyes:{id:'eyes',title:'EUGOGO — Graves’ orbitopathy',year:'2021',url:'https://doi.org/10.1530/EJE-21-0479',kind:'Wytyczne'},
  thyroiditis:{id:'thyroiditis',title:'Endotext — Subacute Thyroiditis',year:'2018',url:'https://www.ncbi.nlm.nih.gov/books/NBK279084/',kind:'Podręcznik: różnicowanie'},
  nodules:{id:'nodules',title:'ETA — Thyroid nodule management',year:'2023',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC10448590/',kind:'Wytyczne'},
  cancer:{id:'cancer',title:'Polskie towarzystwa naukowe — Rak tarczycy u dorosłych',year:'2022',url:'https://doi.org/10.5603/EP.a2022.0028',kind:'Polskie rekomendacje'},
  pregnancy:{id:'pregnancy',title:'PTE — Thyroid diseases in pregnancy',year:'2021',url:'https://doi.org/10.5603/EP.a2021.0089',kind:'Polskie zalecenia'},
  amiodarone:{id:'amiodarone',title:'ETA — Amiodarone-associated thyroid dysfunction',year:'2018',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC5869486/',kind:'Wytyczne'},
  iodine:{id:'iodine',title:'ETA — Iodine-based contrast media-induced thyroid dysfunction',year:'2021',url:'https://doi.org/10.1159/000517175',kind:'Wytyczne'},
  storm:{id:'storm',title:'Joint consensus — Management of thyroid storm',year:'2026',url:'https://doi.org/10.1530/ETJ-26-0043',kind:'Konsensus; zakres rozpoznania i pilności'},
  coma:{id:'coma',title:'Joint consensus — Management of myxoedema coma',year:'2026',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC13452032/',kind:'Konsensus'},
  emergency:{id:'emergency',title:'Endotext — Thyroid Storm',year:'2025',url:'https://www.ncbi.nlm.nih.gov/books/NBK278927/',kind:'Podręcznik: postępowanie w stanach nagłych'},
};

export const sources: Record<string, Source> = {
  ...gahtSources,
  ...thyroidSources,
  ...thyroidMathChemSources,
  ...pituitarySources,
  ...pituitaryMathChemSources,
  ...adrenalSources,
  ...adrenalMathChemSources,
  ...parathyroidSources,
  ...parathyroidMathChemSources,
  ...diabetesSources,
  ...gonadsSources,
  ...nenSources,
  ...otyloscSources,
};

const draft: DraftLesson[] = [

{id:'fizjologia',title:'Jak działa tarczyca?',subtitle:'Oś hormonalna, synteza i sprzężenie zwrotne',group:'Fundamenty',minutes:12,
goals:['Wyjaśnisz zależność TRH–TSH–T4/T3.','Połączysz syntezę hormonów z ich działaniem w tkankach.'],
sections:[{title:'Trzy piętra regulacji',text:'Podwzgórze wydziela TRH, które pobudza przysadkę do uwalniania TSH. TSH działa na komórki pęcherzykowe tarczycy, zwiększając syntezę i uwalnianie hormonów. Wzrost dostępności hormonów hamuje wydzielanie TRH i TSH. To ujemne sprzężenie zwrotne: przy sprawnej osi niedobór hormonów nasila sygnał pobudzający gruczoł.'},{title:'Od jodu do działania',text:'Komórka pęcherzykowa wychwytuje jodek. Tyreoperoksydaza (TPO) uczestniczy w jego utlenianiu, organifikacji i sprzęganiu jodotyrozyn na tyreoglobulinie. Koloid stanowi magazyn prekursorów hormonów. Tarczyca wydziela głównie T4; istotna część T3 powstaje poza gruczołem przez dejodynację T4. Hormony wpływają na metabolizm, termogenezę, serce oraz rozwój układu nerwowego.'},{title:'Wynik nie jest całym układem',text:'Większość hormonów krąży związana z białkami, w tym TBG. Zmiana stężenia białek wiążących może zmienić całkowite T4 bez odpowiadającej jej zmiany czynności tarczycy. Dlatego wynik interpretuj w kontekście TSH, frakcji wolnej i sytuacji klinicznej.'}],
table:{headers:['Element','Rola'],rows:[['TRH → przysadka','Pobudzenie wydzielania TSH'],['TSH → tarczyca','Synteza i uwalnianie hormonów'],['T4 → T3 w tkankach','Lokalna regulacja aktywności hormonów'],['T4/T3 → podwzgórze i przysadka','Ujemne sprzężenie zwrotne']]},
advanced:'Stężenie TSH nie jest bezpośrednim miernikiem działania hormonów w każdej tkance. Dejodynazy i transportery regulują lokalną dostępność T3. W uszkodzeniu przysadki prawidłowe laboratoryjnie TSH może być nieadekwatne do niskiego FT4; nie stosuj wówczas prostego algorytmu opartego wyłącznie na TSH.',summary:'Tarczyca jest częścią osi regulacyjnej. Najpierw rozumiej sprzężenie zwrotne, potem interpretuj pojedyncze liczby.',sourceIds:['physiology','central'],questions:[
q('Co bezpośrednio pobudza tarczycę do syntezy hormonów?',['TSH','TSH działa na receptor w komórce pęcherzykowej.'],['TRH','TRH działa przede wszystkim na przysadkę.'],['TBG','TBG transportuje hormony; nie jest sygnałem pobudzającym.']),
q('Jaka jest główna odpowiedź sprawnej osi na wzrost FT4?',['Spadek TSH','To skutek ujemnego sprzężenia zwrotnego.'],['Wzrost TSH','Nasiliłby produkcję mimo nadmiaru hormonów.'],['Wzrost TSH niezależny od FT4','W sprawnej osi te sygnały są powiązane.']),
q('Który proces wymaga udziału TPO?',['Organifikacja jodu','TPO uczestniczy także w sprzęganiu jodotyrozyn.'],['Wydzielanie TRH','TRH powstaje w podwzgórzu.'],['Transport T4 przez TBG','Wiązanie z białkiem transportowym nie wymaga TPO.']),
q('Skąd pochodzi istotna część krążącego T3?',['Z obwodowej konwersji T4','Dejodynacja zachodzi w tkankach poza tarczycą.'],['Z przysadki','Przysadka wydziela TSH, nie T3.'],['Wyłącznie z pożywienia','Organizm syntetyzuje hormony z wykorzystaniem jodu.']),
q('Co może zwiększyć całkowite T4 bez rzeczywistej nadczynności?',['Wzrost TBG','Więcej białka wiążącego zwiększa pulę związaną.'],['Brak białek transportowych','Nie tłumaczy izolowanego wzrostu puli związanej.'],['Zawsze choroba Gravesa-Basedowa','Całkowite T4 samo nie rozstrzyga o nadczynności.'])]},
{id:'diagnostyka',title:'Czytaj wyniki ze zrozumieniem',subtitle:'TSH, FT4, FT3 i pułapki laboratoryjne',group:'Fundamenty',minutes:15,
goals:['Odróżnisz zaburzenie jawne od subklinicznego.','Rozpoznasz sytuacje, w których samo TSH nie wystarcza.'],
sections:[{title:'Zacznij od pytania klinicznego',text:'U stabilnej osoby z podejrzeniem pierwotnej choroby tarczycy TSH jest zwykle pierwszym badaniem. Podwyższone TSH uzupełnij o FT4; obniżone — o FT4 i, gdy potrzebne, FT3. Przy podejrzeniu choroby przysadki oznacz TSH i FT4 od początku. Anty-TPO pomaga ustalić etiologię autoimmunizacyjną, a TRAb — chorobę Gravesa-Basedowa.'},{title:'Jednostki i zakresy',text:'TSH podajemy w mIU/l, FT4 i FT3 często w pmol/l. W ćwiczeniach używamy przykładowych zakresów: TSH 0,4–4,0 mIU/l, FT4 12–22 pmol/l, FT3 3,1–6,8 pmol/l. Nie są to normy uniwersalne: obowiązują przedziały konkretnego laboratorium, metody i populacji. W ciąży potrzebny jest kontekst trymestru.'},{title:'Gdy liczby nie pasują',text:'Zapytaj o leki, suplementy (zwłaszcza biotynę), niedawną ciężką chorobę i czas pobrania względem lewotyroksyny. Interferencja oznaczenia może imitować chorobę. Omów z laboratorium powtórzenie oznaczenia inną metodą; nie rozpoczynaj leczenia wyłącznie na podstawie niespójnego zestawu wyników.'}],
table:{headers:['Wzorzec','Najbardziej typowa interpretacja'],rows:[['TSH ↑, FT4 ↓','Jawna pierwotna niedoczynność'],['TSH ↑, FT4 w zakresie','Subkliniczna niedoczynność — potwierdź trwałość'],['TSH ↓, FT4 i/lub FT3 ↑','Jawna tyreotoksykoza'],['FT4 ↓, TSH niskie lub nieadekwatnie prawidłowe','Rozważ niedoczynność centralną i inne przyczyny']]},
advanced:'W ciężkiej chorobie ogólnoustrojowej obserwuje się zespół pozatarczycowych zaburzeń hormonalnych. W niedoczynności centralnej przed wdrożeniem LT4 należy ocenić wydolność osi nadnerczowej. Nieprawidłowe FT4 z nieobniżonym TSH wymaga wykluczenia interferencji, zanim rozważy się rzadkie zaburzenia osi.',summary:'Interpretuj pary wyników, zakres laboratorium i kontekst. Prawidłowe TSH nie wyklucza choroby przysadki.',sourceIds:['central','subclinical','lt4'],questions:[
q('TSH 16 mIU/l, FT4 8 pmol/l. Jaki to wzorzec?',['Jawna pierwotna niedoczynność','TSH rośnie, a FT4 jest poniżej zakresu ćwiczenia.'],['Subkliniczna niedoczynność','W niej FT4 pozostaje w zakresie.'],['Jawna nadczynność','Oczekiwalibyśmy niskiego TSH i wysokich hormonów.']),
q('FT4 jest niskie, a TSH prawidłowe u chorego po operacji przysadki. Co dalej?',['Ocena niedoczynności centralnej','TSH może być nieadekwatnie prawidłowe.'],['Wykluczenie niedoczynności','Samo TSH nie wystarcza przy chorobie przysadki.'],['Rozpoznanie Gravesa-Basedowa','Niskie FT4 nie pasuje do jawnej nadczynności.']),
q('TSH jest obniżone, FT4 prawidłowe. Jakie badanie może ujawnić T3-tyreotoksykozę?',['FT3','Izolowany wzrost FT3 jest możliwy.'],['Samo anty-TPO','Przeciwciała nie oceniają stężenia T3.'],['Wyłącznie USG','Obrazowanie nie zastępuje oznaczenia hormonów.']),
q('Wyniki sugerują nadczynność, lecz pacjent bez objawów przyjmuje wysokie dawki biotyny. Co uwzględnić?',['Interferencję laboratoryjną','Wpływ zależy od metody; potrzebny kontakt z laboratorium.'],['Pewną chorobę Gravesa-Basedowa','Najpierw wyjaśnij niespójność.'],['Biotyna nie wpływa na żadne testy','Niektóre testy immunochemiczne są podatne.']),
q('Które zakresy referencyjne należy stosować?',['Laboratorium, metody i właściwej populacji','Zakresy nie są jednakowe, a ciąża wymaga odrębnej interpretacji.'],['Jedną normę internetową dla wszystkich','Pomija różnice metod i populacji.'],['Wyłącznie wartości z tego quizu','Są to dydaktyczne przykłady, nie uniwersalne normy.'])]},
{id:'niedoczynnosc',title:'Kiedy tarczyca zwalnia',subtitle:'Niedoczynność i racjonalne leczenie LT4',group:'Praktyka kliniczna',minutes:16,
goals:['Rozpoznasz objawy i biochemiczny wzorzec niedoczynności.','Wyjaśnisz zasady stosowania i monitorowania LT4.'],
sections:[{title:'Od objawów do potwierdzenia',text:'Nietolerancja zimna, zaparcia, suchość skóry, spowolnienie i zmęczenie mogą sugerować niedoczynność, lecz są nieswoiste. Rozpoznanie pierwotnej jawnej niedoczynności opiera się na wysokim TSH i niskim FT4. Przyczyny obejmują autoimmunizację, leczenie operacyjne lub radiojodem oraz niektóre leki.'},{title:'Leczenie zastępcze',text:'Lewotyroksyna (LT4) uzupełnia niedobór T4. Dawkę dobiera się indywidualnie z uwzględnieniem wieku, masy ciała, chorób serca i stopnia niedoboru. Stały sposób przyjmowania pomaga uzyskać stabilny efekt. Pokarm i część preparatów żelaza lub wapnia mogą zmniejszać wchłanianie; sprawdź wymagany odstęp w charakterystyce produktu.'},{title:'Kontrola zamiast pośpiechu',text:'TSH zmienia się wolniej niż stężenie podanego hormonu. Po zmianie dawki ocenę zwykle planuje się po około 6–8 tygodniach. Utrzymujące się objawy przy prawidłowym TSH wymagają poszukiwania innych przyczyn, a nie automatycznej eskalacji dawki. Subkliniczna niedoczynność wymaga potwierdzenia i decyzji zależnej od ryzyka.'}],
table:{headers:['Problem','Co sprawdzić'],rows:[['TSH nadal wysokie','Regularność, sposób przyjmowania, interakcje, wchłanianie'],['TSH zbyt niskie podczas LT4','Możliwe nadmierne leczenie'],['Starszy wiek lub choroba wieńcowa','Ostrożne rozpoczynanie i zwiększanie dawki'],['Objawy mimo wyrównania','Inne choroby i przyczyny nieswoistych dolegliwości']]},
advanced:'W niedoczynności centralnej monitorowanie opiera się przede wszystkim na FT4, nie na normalizacji TSH. Rutynowe leczenie skojarzone LT4/LT3 nie jest standardem dla każdego chorego. Przed uznaniem nieskuteczności LT4 oceniaj regularność przyjmowania i choroby przewodu pokarmowego.',summary:'LT4 uzupełnia niedobór. Bezpieczne leczenie wymaga czasu na ocenę efektu i kontroli interakcji.',sourceIds:['lt4','subclinical','central'],questions:[
q('Co jest standardowym leczeniem jawnej pierwotnej niedoczynności?',['Lewotyroksyna','Jest leczeniem zastępczym niedoboru T4.'],['Tiamazol','Hamuje syntezę hormonów i może pogłębić niedobór.'],['Radiojod','Zmniejsza czynność tkanki, nie uzupełnia hormonów.']),
q('Kiedy zwykle ocenia się TSH po zmianie dawki LT4?',['Po około 6–8 tygodniach','Oś potrzebuje czasu do osiągnięcia nowej równowagi.'],['Po kilku godzinach','To zbyt wcześnie na miarodajną odpowiedź TSH.'],['Dopiero po pięciu latach','Tak długa przerwa uniemożliwia właściwe dostosowanie leczenia.']),
q('Co może osłabić wchłanianie LT4?',['Jednoczesne przyjęcie preparatu żelaza','Możliwa jest interakcja w przewodzie pokarmowym.'],['Regularność przyjmowania','Regularność poprawia przewidywalność działania.'],['Popicie wodą','Woda jest właściwym sposobem przyjmowania tabletki.']),
q('Jak rozpocząć leczenie u starszego chorego z chorobą wieńcową?',['Ostrożnie, z indywidualnym doborem dawki','Zbyt gwałtowna substytucja może obciążyć serce.'],['Maksymalną dawką u każdego','Pomija ryzyko sercowe i indywidualne potrzeby.'],['Nigdy nie leczyć','Choroba wieńcowa nie znosi wskazań do leczenia niedoboru.']),
q('Zmęczenie utrzymuje się mimo prawidłowego TSH podczas LT4. Co jest rozsądne?',['Ocenić inne przyczyny objawów','Zmęczenie jest nieswoiste.'],['Zwiększać dawkę aż TSH zniknie','Supresja może oznaczać nadmierne leczenie.'],['Dodać tyreostatyk','Nie leczy zmęczenia przy wyrównanej niedoczynności.'])]},
{id:'hashimoto',title:'Zrozumieć Hashimoto',subtitle:'Autoimmunizacja nie zawsze oznacza niedoczynność',group:'Praktyka kliniczna',minutes:11,
goals:['Oddzielisz etiologię choroby od stanu hormonalnego.','Wyjaśnisz znaczenie anty-TPO i wskazania do leczenia.'],
sections:[{title:'Proces, a nie pojedyncza liczba',text:'Hashimoto jest przewlekłym autoimmunizacyjnym zapaleniem tarczycy. Uszkodzenie komórek może z czasem ograniczyć produkcję hormonów. Choroba może jednak współistnieć z prawidłową czynnością gruczołu. Dodatnie anty-TPO wspiera rozpoznanie autoimmunizacji, ale nie mówi samo, czy potrzebna jest substytucja.'},{title:'Co mierzymy, a co leczymy?',text:'TSH i FT4 służą do oceny czynności. USG pomaga, gdy istnieją wskazania strukturalne, takie jak wole lub podejrzenie guzka. Powtarzanie miana przeciwciał w celu dostosowania dawki LT4 nie jest właściwą strategią. Leczymy niedobór hormonów i oceniamy dolegliwości, a nie próbujemy wyzerować przeciwciała.'},{title:'Żywienie bez obietnic',text:'Nie ma jednej diety usuwającej autoimmunizację. Należy unikać nadmiernej podaży jodu z niekontrolowanych suplementów. Dieta bezglutenowa wymaga odrębnego uzasadnienia, np. rozpoznanej celiakii; nie jest automatycznym leczeniem Hashimoto u wszystkich.'}],
table:{headers:['Wynik','Znaczenie'],rows:[['Anty-TPO dodatnie, TSH i FT4 prawidłowe','Autoimmunizacja z eutyreozą; obserwacja czynności'],['TSH wysokie, FT4 niskie','Niedobór wymagający leczenia zastępczego'],['Wysokie miano anty-TPO','Nie wyznacza dawki LT4'],['Wole lub wyczuwalna zmiana','Ocena struktury, zwykle USG']]},
advanced:'Hashimoto może współistnieć z innymi chorobami autoimmunizacyjnymi. Badania w ich kierunku dobieraj do obrazu klinicznego. Szybko powiększająca się tarczyca, ucisk lub asymetria wymagają odrębnej diagnostyki; nie przypisuj każdej nowej zmiany znanej autoimmunizacji.',summary:'Hashimoto opisuje przyczynę. TSH i FT4 opisują czynność. Leczenie zależy od tej drugiej i kontekstu klinicznego.',sourceIds:['hashimoto','subclinical','lt4'],questions:[
q('Anty-TPO dodatnie, TSH i FT4 prawidłowe u nieciężarnej osoby bez objawów. Co wynika z tych danych?',['Autoimmunizacja może współistnieć z eutyreozą','Dodatnie przeciwciała nie oznaczają automatycznie niedoboru hormonów.'],['Zawsze jawna niedoczynność','W jawnej niedoczynności FT4 jest obniżone.'],['Zawsze konieczny radiojod','Przeciwciała nie są takim wskazaniem.']),
q('Na czym opiera się dostosowanie LT4 w pierwotnej niedoczynności?',['Na czynności tarczycy i obrazie klinicznym','TSH jest podstawowym parametrem kontroli.'],['Na dążeniu do zerowego anty-TPO','Miano przeciwciał nie jest celem dawkowania.'],['Wyłącznie na wielkości wola','Wielkość nie określa potrzeb hormonalnych.']),
q('Czy każda osoba z Hashimoto powinna odstawić gluten?',['Nie, potrzebne jest odrębne wskazanie','Na przykład rozpoznana celiakia uzasadnia taką dietę.'],['Tak, zawsze','Nie jest to uniwersalne leczenie autoimmunizacji.'],['Tak, zamiast LT4','Dieta nie zastępuje hormonów przy ich niedoborze.']),
q('Jak traktować duże dawki jodu z suplementów?',['Unikać nieuzasadnionej nadmiernej podaży','Nadmiar jodu może zaburzać czynność tarczycy.'],['Stosować do wyzerowania anty-TPO','Nie jest to cel ani uzasadniona terapia.'],['Są obojętne w każdej dawce','Dawka ma znaczenie dla działania biologicznego.']),
q('Znane Hashimoto i szybko narastający ucisk szyi. Jak postąpić?',['Podjąć odrębną pilną ocenę zmiany','Nowe objawy strukturalne wymagają diagnostyki.'],['Uznać to za zwykły wzrost przeciwciał','Miano nie tłumaczy automatycznie objawów ucisku.'],['Zignorować przy prawidłowym TSH','Prawidłowa czynność nie wyklucza problemu strukturalnego.'])]},
{id:'nadczynnosc',title:'Kiedy hormonów jest za dużo',subtitle:'Tyreotoksykoza, nadczynność i różnicowanie',group:'Praktyka kliniczna',minutes:14,
goals:['Odróżnisz nadprodukcję od uwalniania zapasów hormonów.','Dobierzesz badania do przyczyny tyreotoksykozy.'],
sections:[{title:'Dwa pojęcia',text:'Tyreotoksykoza oznacza nadmiar działania hormonów tarczycy niezależnie od źródła. Nadczynność jest jej podtypem wynikającym ze wzmożonej produkcji w gruczole. Zapalenie destrukcyjne uwalnia gotowe hormony, a przyjmowanie nadmiaru LT4 dostarcza je z zewnątrz. Te mechanizmy wymagają innego postępowania.'},{title:'Objawy i ryzyko',text:'Kołatanie serca, drżenie, nietolerancja ciepła i spadek masy ciała kierują uwagę na tyreotoksykozę. U starszej osoby dominować może migotanie przedsionków lub osłabienie. Oceń tętno, stan krążenia, TSH, FT4 i FT3. Nie ograniczaj diagnostyki do samego samopoczucia.'},{title:'Przyczyna wyznacza leczenie',text:'TRAb wspiera rozpoznanie Gravesa-Basedowa. Guzki i obniżone TSH mogą uzasadniać scyntygrafię w celu oceny autonomii. Tyreostatyki hamują nową syntezę, dlatego nie rozwiązują mechanizmu destrukcyjnego zapalenia. Beta-adrenolityk łagodzi objawy u odpowiednio dobranych pacjentów, ale nie zastępuje leczenia przyczyny.'}],
table:{headers:['Mechanizm','Przykład'],rows:[['Nadprodukcja rozlana','Graves-Basedow'],['Nadprodukcja autonomiczna','Guzek autonomiczny lub wole wieloguzkowe toksyczne'],['Uwolnienie zapasów','Destrukcyjne zapalenie tarczycy'],['Źródło zewnętrzne','Nadmierna dawka LT4']]},
advanced:'Subkliniczna nadczynność oznacza utrwalone niskie TSH przy prawidłowych FT4/FT3. Oceniaj nasilenie supresji, wiek, ryzyko arytmii i powikłań kostnych. Niskie TSH może utrzymywać się po poprawie FT4/FT3, dlatego wczesna kontrola terapii nie opiera się tylko na TSH.',summary:'Nie każda tyreotoksykoza oznacza nadprodukcję. Ustal mechanizm przed wyborem terapii.',sourceIds:['graves','thyroiditis','nodules'],questions:[
q('Który stan jest tyreotoksykozą bez zwiększonej syntezy hormonów?',['Destrukcyjne zapalenie tarczycy','Uszkodzone pęcherzyki uwalniają zgromadzone hormony.'],['Graves-Basedow','Receptor TSH jest pobudzany do syntezy.'],['Guzek autonomiczny','Guzek aktywnie produkuje hormony.']),
q('Co sugeruje nowo wykryte migotanie przedsionków u starszej osoby z utratą masy ciała?',['Potrzebę oceny czynności tarczycy','Tyreotoksykoza może przebiegać bez typowego pobudzenia.'],['Wykluczenie choroby tarczycy przez wiek','Starszy wiek nie wyklucza nadczynności.'],['Pewną niedoczynność','Opis bardziej sugeruje nadmiar hormonów, lecz wymaga badań.']),
q('Dlaczego tyreostatyk zwykle nie pomaga w fazie tyreotoksycznej zapalenia destrukcyjnego?',['Nie hamuje uwalniania już zgromadzonych hormonów','Jego zasadniczym celem jest nowa synteza.'],['Zawsze zwiększa syntezę','Tyreostatyki ją hamują.'],['Nie działa na żadną chorobę tarczycy','Jest przydatny w nadprodukcji hormonów.']),
q('TSH jest niskie, a w USG widoczny guzek. Co może ocenić jego autonomię?',['Scyntygrafia, jeśli nie ma przeciwwskazań','Pokazuje czynność tkanki.'],['Samo anty-TPO','Nie pokazuje autonomicznej produkcji guzka.'],['Wyłącznie palpacja','Nie określa aktywności hormonalnej zmiany.']),
q('Jaka jest główna rola beta-adrenolityku w stabilnej tyreotoksykozie?',['Łagodzenie objawów adrenergicznych','Nie zastępuje ustalenia i leczenia przyczyny.'],['Usunięcie guzka','Nie jest metodą usuwania zmian strukturalnych.'],['Trwałe zniszczenie przeciwciał','Nie eliminuje autoimmunizacji.'])]},
{id:'graves',title:'Graves-Basedow i oczy',subtitle:'TRAb, wybór terapii i orbitopatia',group:'Praktyka kliniczna',minutes:17,
goals:['Połączysz TRAb z mechanizmem nadczynności.','Rozpoznasz alarmowe objawy oczne i powikłania leków.'],
sections:[{title:'Receptor bez właściwego hamulca',text:'Pobudzające przeciwciała przeciw receptorowi TSH prowadzą do nadprodukcji hormonów. Rozpoznanie wspierają TRAb, rozlane zmiany gruczołu i typowy obraz kliniczny. Orbitopatia jest związanym procesem autoimmunizacyjnym w oczodole; jej nasilenie nie musi odpowiadać stężeniom hormonów.'},{title:'Trzy drogi leczenia',text:'Do metod należą tyreostatyki, radiojod i operacja. Wybór uwzględnia orbitopatię, wielkość wola, plany rozrodcze, nawroty i preferencje chorego. Tiamazol jest zwykle stosowany poza szczególnymi sytuacjami, takimi jak pierwszy trymestr ciąży. Gorączka lub ból gardła podczas tyreostatyku wymagają przerwania przyjmowania leku i pilnego kontaktu medycznego z oceną morfologii ze względu na ryzyko agranulocytozy.'},{title:'Chroń wzrok',text:'Zaprzestanie palenia i utrzymanie eutyreozy są istotne w orbitopatii. Pogorszenie ostrości wzroku lub widzenia barw, a także uszkodzenie rogówki wymagają pilnej oceny specjalistycznej. Leczenie zależy od aktywności i ciężkości choroby, a nie wyłącznie od obecności wytrzeszczu.'}],
table:{headers:['Sygnał','Znaczenie'],rows:[['TRAb dodatnie','Wspiera etiologię Gravesa-Basedowa'],['Ból gardła i gorączka podczas tyreostatyku','Wyklucz agranulocytozę pilnie'],['Pogorszenie widzenia barw','Podejrzenie zagrożenia nerwu wzrokowego'],['Palenie tytoniu','Modyfikowalny czynnik ryzyka orbitopatii']]},
advanced:'Aktywność zapalna i ciężkość orbitopatii są odrębnymi wymiarami oceny. Aktywna orbitopatia o umiarkowanym lub ciężkim przebiegu wpływa na wybór leczenia nadczynności i wymaga zespołu endokrynologiczno-okulistycznego. Radiojod może pogorszyć orbitopatię; kwalifikacja i ewentualna profilaktyka są zależne od ryzyka.',summary:'Lecz nadczynność i oceniaj oczy równolegle. Objawy agranulocytozy oraz zagrożenia wzroku wymagają szybkiej reakcji.',sourceIds:['graves','eyes'],questions:[
q('Które przeciwciała są szczególnie pomocne w rozpoznaniu Gravesa-Basedowa?',['TRAb','Dotyczą receptora TSH.'],['Wyłącznie anty-TPO','Nie są swoiste dla tej przyczyny nadczynności.'],['Przeciwciała przeciw insulinie','Nie identyfikują tego mechanizmu.']),
q('Gorączka i ból gardła podczas tiamazolu. Jaki jest właściwy krok?',['Wstrzymać lek i pilnie ocenić morfologię oraz stan chorego','Trzeba wykluczyć agranulocytozę.'],['Zwiększyć dawkę tiamazolu','Może pogłębić zagrożenie polekowe.'],['Zaczekać miesiąc','Opóźnia rozpoznanie groźnego powikłania.']),
q('Co jest modyfikowalnym czynnikiem ryzyka orbitopatii?',['Palenie tytoniu','Zaprzestanie palenia jest elementem postępowania.'],['Kolor tęczówki','Nie jest celem tej interwencji.'],['Grupa krwi','Nie służy do redukcji ryzyka orbitopatii.']),
q('Który objaw wymaga pilnej oceny okulistycznej?',['Nowe pogorszenie widzenia barw','Może sygnalizować neuropatię wzrokową.'],['Sam dodatni anty-TPO bez objawów ocznych','Nie jest oznaką ostrego zagrożenia wzroku.'],['Prawidłowe TSH bez objawów','Nie jest alarmowym objawem ocznym.']),
q('Co uwzględnić przed radiojodem w Gravesie-Basedowie?',['Aktywność i ciężkość orbitopatii','Leczenie może wpływać na przebieg choroby oczu.'],['Wyłącznie wiek metrykalny','Nie wystarcza do kwalifikacji.'],['Założenie, że radiojod zawsze poprawia oczy','Może nasilić orbitopatię.'])]},
{id:'zapalenia',title:'Zapalenie ma różne oblicza',subtitle:'Bolesna szyja, fazy choroby i różnicowanie',group:'Praktyka kliniczna',minutes:13,
goals:['Rozpoznasz mechanizm destrukcyjnego zapalenia.','Odróżnisz zapalenie podostre od ropnego.'],
sections:[{title:'Fazy zamiast stałej nadczynności',text:'W destrukcyjnym zapaleniu uszkodzone pęcherzyki uwalniają hormony. Faza tyreotoksyczna może przejść w niedoczynność, a następnie w powrót do prawidłowej czynności. Nie każdy chory przechodzi wszystkie fazy; część pozostaje z niedoborem hormonów. Potrzebne jest monitorowanie.'},{title:'Ból jest wskazówką',text:'Podostre zapalenie de Quervaina często wiąże się z bólem szyi i podwyższonymi wskaźnikami zapalenia, niekiedy po infekcji dróg oddechowych. Poporodowe lub bezbolesne zapalenie może przebiegać bez bólu. Niska jodochwytność w fazie destrukcyjnej pomaga odróżnić ją od wzmożonej syntezy, ale badanie izotopowe ma przeciwwskazania, zwłaszcza w ciąży.'},{title:'Leczenie zależy od mechanizmu',text:'W podostrym bolesnym zapaleniu stosuje się leczenie przeciwzapalne dobrane do nasilenia i przeciwwskazań, a objawy adrenergiczne można łagodzić. Tyreostatyki nie są rutynowym leczeniem destrukcji. Wysoka gorączka, ciężki stan, miejscowy obrzęk i podejrzenie ropnia wymagają pilnej diagnostyki zakażenia i odrębnego leczenia.'}],
table:{headers:['Postać','Wskazówka'],rows:[['Podostre de Quervaina','Ból i podwyższone OB/CRP'],['Bezbolesne / poporodowe','Destrukcja bez typowej bolesności'],['Ropne','Zakażenie, możliwy ropień i ciężki stan'],['Hashimoto','Przewlekła autoimmunizacja']]},
advanced:'W różnicowaniu bolesnej tarczycy uwzględniaj krwawienie do guzka oraz ropne zapalenie. Nie rozpoczynaj glikokortykosteroidu mechanicznie przed oceną podejrzenia zakażenia. Po fazie tyreotoksycznej oznaczaj czynność ponownie, nawet jeśli dolegliwości ustąpiły.',summary:'Destrukcja uwalnia magazyn hormonów. Przebieg zmienia się w czasie, więc pojedynczy wynik nie zamyka obserwacji.',sourceIds:['thyroiditis','hashimoto'],questions:[
q('Bolesna tarczyca po infekcji i wysokie OB sugerują przede wszystkim:',['Podostre zapalenie tarczycy','To typowa wskazówka, choć trzeba wykluczyć inne przyczyny bólu.'],['Zawsze Gravesa-Basedowa','Silna bolesność i OB nie są jego typowym wzorcem.'],['Wyłącznie guza przysadki','Nie tłumaczy miejscowego bólu i zapalenia.']),
q('Co może nastąpić po fazie tyreotoksycznej zapalenia destrukcyjnego?',['Przejściowa niedoczynność','Po opróżnieniu zapasów produkcja może być niewystarczająca.'],['Zawsze trwała nadczynność','Przebieg jest często wielofazowy.'],['Pewny rak tarczycy','Taka ewolucja hormonalna nie oznacza raka.']),
q('Jakiej jodochwytności oczekujesz w typowej fazie destrukcyjnej?',['Niskiej','Hormony pochodzą głównie z uszkodzonych magazynów.'],['Zawsze bardzo wysokiej','Wysoki wychwyt sugeruje aktywną syntezę.'],['Jodochwytność mierzy się anty-TPO','To różne badania.']),
q('Ciężki stan, gorączka i podejrzenie ropnia szyi. Co jest priorytetem?',['Pilna ocena zakażenia i leczenie specjalistyczne','Ropne zapalenie nie jest zwykłą samoograniczającą się destrukcją.'],['Rutynowa kontrola za rok','Opóźnia leczenie poważnego zakażenia.'],['Sam tyreostatyk','Nie usuwa ropnia ani zakażenia.']),
q('Dlaczego kontrolować hormony po ustąpieniu bólu?',['Może rozwinąć się niedoczynność','Poprawa bólu nie dowodzi pełnego powrotu czynności.'],['Ból jest jedynym wskaźnikiem hormonów','Objawy miejscowe nie mierzą czynności.'],['Każdy pacjent wymaga dożywotnio tyreostatyku','Nie wynika to z mechanizmu zapalenia.'])]},
{id:'guzki',title:'Guzek nie znaczy nowotwór',subtitle:'USG, EU-TIRADS i biopsja',group:'Praktyka kliniczna',minutes:16,
goals:['Połączysz obraz USG z czynnością tarczycy.','Wyjaśnisz kwalifikację do biopsji według ryzyka.'],
sections:[{title:'Dwa równoległe pytania',text:'Ocena guzka dotyczy jego czynności i ryzyka złośliwości. TSH odpowiada na pierwszą część, USG tarczycy i węzłów szyi na drugą. Większość guzków jest łagodna. Wywiad obejmuje napromienianie szyi, rodzinne nowotwory, tempo wzrostu i objawy uciskowe.'},{title:'Ryzyko w obrazie',text:'EU-TIRADS porządkuje cechy ultrasonograficzne. Znaczenie mają m.in. echogeniczność, kształt, granice i punktowe zwapnienia. Nie można rozpoznać raka na podstawie pojedynczego słowa w opisie. Wskazanie do biopsji aspiracyjnej cienkoigłowej zależy od kategorii, rozmiaru oraz kontekstu klinicznego.'},{title:'Biopsja i następny krok',text:'Wytyczne ETA 2023 stosują progi wielkości zależne od EU-TIRADS. Podejrzane węzły lub podejrzenie naciekania mogą zmienić postępowanie niezależnie od typowych progów. Cytologię opisuje się kategoriami Bethesda; wynik niediagnostyczny nie oznacza łagodności.'}],
table:{headers:['Kategoria ETA 2023','Typowy próg rozważenia BACC'],rows:[['EU-TIRADS 3','>20 mm'],['EU-TIRADS 4','>15 mm'],['EU-TIRADS 5','>10 mm'],['Podejrzane węzły / naciekanie','Indywidualna kwalifikacja niezależna od tych progów']]},
advanced:'To progi ETA 2023, nie uniwersalny zamiennik polskich zaleceń onkologicznych. Przy niskim TSH oceń autonomię; czynny guzek zmienia ścieżkę diagnostyczną. Bethesda III/IV wymaga integracji cytologii, USG, ryzyka klinicznego i dostępności diagnostyki dodatkowej.',summary:'Łącz TSH, USG i kontekst. Biopsja wynika z ryzyka oraz rozmiaru, nie z samej obecności guzka.',sourceIds:['nodules','cancer'],questions:[
q('Co najlepiej ocenia strukturę guzka i węzły szyi?',['USG','Badanie pokazuje morfologię zmian i węzłów.'],['Samo TSH','TSH ocenia regulację czynności, nie strukturę.'],['Wyłącznie FT3','FT3 nie klasyfikuje cech ultrasonograficznych.']),
q('Jaki typowy próg BACC podaje ETA 2023 dla EU-TIRADS 5 bez dodatkowych alarmów?',['Powyżej 10 mm','To próg tej kategorii w ETA 2023.'],['Powyżej 50 mm','Mógłby nadmiernie opóźnić diagnostykę.'],['Każde 2 mm bez uwzględnienia kontekstu','Nie jest to rutynowy próg ETA.']),
q('Co oznacza niediagnostyczna cytologia?',['Materiał nie wystarcza do rozstrzygnięcia','Potrzebna jest dalsza ocena i często powtórzenie biopsji.'],['Pewną łagodność','Brak wystarczającego materiału nie wyklucza złośliwości.'],['Pewny rak','Niediagnostyczność nie jest rozpoznaniem nowotworu.']),
q('Dlaczego oceniamy także węzły chłonne?',['Podejrzane węzły zmieniają ocenę ryzyka i postępowanie','Nie można ograniczyć USG do samej tarczycy.'],['Węzły wyznaczają dawkę LT4','Nie służą do tego celu.'],['Każdy powiększony węzeł to przerzut','Ocena wymaga morfologii i kontekstu.']),
q('Co oznacza sam fakt wykrycia guzka?',['Potrzebę oceny ryzyka, nie automatyczne rozpoznanie raka','Większość guzków jest łagodna.'],['Konieczność operacji u każdego','Leczenie zależy od ryzyka i objawów.'],['Brak potrzeby jakiejkolwiek oceny','Część zmian wymaga diagnostyki.'])]},
{id:'nowotwory',title:'Nowotwory tarczycy',subtitle:'Typ histologiczny, ryzyko i obserwacja',group:'Praktyka kliniczna',minutes:15,
goals:['Odróżnisz raki zróżnicowane od rdzeniastego.','Wyjaśnisz, dlaczego leczenie i markery są różne.'],
sections:[{title:'Różne komórki, różne choroby',text:'Raki brodawkowaty i pęcherzykowy wywodzą się z komórek pęcherzykowych. Rak rdzeniasty pochodzi z komórek C i wiąże się z kalcytoniną. Rak anaplastyczny ma agresywny przebieg. Jedno określenie „rak tarczycy” nie wyznacza jednego leczenia.'},{title:'Plan zależny od ryzyka',text:'Zakres leczenia chirurgicznego i ewentualne zastosowanie radiojodu w rakach zróżnicowanych zależą od zaawansowania i oceny ryzyka. Radiojod nie jest leczeniem każdego raka tarczycy. Decyzje powinny zapadać w zespole mającym doświadczenie w onkologii tarczycy.'},{title:'Obserwacja jest częścią leczenia',text:'Po leczeniu zróżnicowanego raka ocenia się obraz szyi i — w odpowiednim kontekście leczenia — tyreoglobulinę wraz z przeciwciałami anty-Tg. Marker wymaga interpretacji w zależności od zachowanej tkanki i metody oznaczenia. W raku rdzeniastym istotne są kalcytonina, CEA i ocena genetyczna.'}],
table:{headers:['Typ','Ważna odrębność'],rows:[['Brodawkowaty / pęcherzykowy','Pochodzenie pęcherzykowe; leczenie według ryzyka'],['Rdzeniasty','Komórki C, kalcytonina, możliwy związek z RET'],['Anaplastyczny','Pilna wielodyscyplinarna ocena'],['Tyreoglobulina po leczeniu','Interpretuj wraz z anty-Tg i zakresem operacji']]},
advanced:'W podejrzeniu dziedzicznego raka rdzeniastego istotna jest ocena zespołu MEN2. Przed planową operacją u chorego z MEN2 trzeba wykluczyć guz chromochłonny. Intensywność supresji TSH po raku zróżnicowanym dostosowuje się do ryzyka i odpowiedzi na leczenie, uwzględniając ryzyko sercowe i kostne.',summary:'Typ nowotworu określa dalszą ścieżkę. Nie przenoś markerów i metod leczenia między różnymi typami raka.',sourceIds:['cancer','nodules'],questions:[
q('Z jakich komórek wywodzi się rak rdzeniasty?',['Z komórek C','Dlatego istotnym markerem jest kalcytonina.'],['Z komórek przysadki','Nowotwór jest zlokalizowany w tarczycy i ma inne pochodzenie.'],['Wyłącznie z limfocytów','Takie pochodzenie dotyczyłoby chłoniaka.']),
q('Czy każdy rak tarczycy leczy się radiojodem?',['Nie','Wskazania zależą od typu i ryzyka.'],['Tak, niezależnie od histologii','Rak rdzeniasty nie podlega takiej rutynowej terapii.'],['Tak, zamiast każdej operacji','Radiojod nie jest uniwersalnym zamiennikiem chirurgii.']),
q('Z czym interpretować tyreoglobulinę po leczeniu raka zróżnicowanego?',['Z anty-Tg, zakresem leczenia i obrazem klinicznym','Przeciwciała i pozostała tkanka wpływają na interpretację.'],['Wyłącznie z kolorem skóry','Nie określa wiarygodności markera.'],['Bez znajomości przebytego leczenia','Resztkowa tkanka może wytwarzać tyreoglobulinę.']),
q('Co należy wykluczyć przed planową operacją tarczycy u chorego z MEN2?',['Guz chromochłonny','Nierozpoznany może stanowić istotne zagrożenie okołooperacyjne.'],['Wyłącznie niedobór żelaza','Nie zastępuje oceny tego ryzyka w MEN2.'],['Obecność TBG','TBG jest fizjologicznym białkiem transportowym.']),
q('Od czego zależy intensywność supresji TSH po raku zróżnicowanym?',['Od ryzyka, odpowiedzi na leczenie i obciążeń chorego','Postępowanie powinno być indywidualne.'],['Zawsze od maksymalnej dostępnej dawki','Może prowadzić do niepotrzebnych działań niepożądanych.'],['Od samego dodatniego anty-TPO','Nie jest główną podstawą oceny ryzyka onkologicznego.'])]},
{id:'ciaza',title:'Tarczyca w ciąży',subtitle:'Fizjologiczne zmiany i bezpieczeństwo terapii',group:'Sytuacje szczególne',minutes:16,
goals:['Uwzględnisz trymestr i metodę oznaczenia.','Rozpoznasz szczególne zasady leczenia w ciąży.'],
sections:[{title:'Nowy kontekst fizjologiczny',text:'hCG może pobudzać receptor TSH, zwłaszcza we wczesnej ciąży. Estrogeny zwiększają TBG. Wyniki trzeba odnosić do zakresów odpowiednich dla ciąży i metody, a nie mechanicznie do norm dla osób nieciężarnych. Samo niskie TSH nie dowodzi Gravesa-Basedowa.'},{title:'Niedobór wymaga uwagi',text:'U kobiety leczonej LT4 zapotrzebowanie może wzrosnąć już wcześnie. Plan kontroli i modyfikacji leczenia powinien być ustalony przed ciążą lub szybko po jej potwierdzeniu. Jawna niedoczynność wymaga leczenia. Nie odstawia się automatycznie LT4 z powodu ciąży.'},{title:'Nadczynność i dziecko',text:'Należy odróżnić przejściową tyreotoksykozę ciążową od Gravesa-Basedowa. Jeśli tyreostatyk jest niezbędny, wybór leku zależy od etapu ciąży; zwykle w pierwszym trymestrze preferuje się PTU. Radiojod jest przeciwwskazany. TRAb może przechodzić przez łożysko, dlatego historia Gravesa-Basedowa ma znaczenie nawet po leczeniu radykalnym.'}],
table:{headers:['Sytuacja','Zasada'],rows:[['Interpretacja TSH/FT4','Zakresy ciążowe i kontekst metody'],['Wcześniejsze leczenie LT4','Wczesna kontrola i indywidualne dostosowanie'],['Konieczny tyreostatyk w I trymestrze','Zwykle PTU pod nadzorem specjalisty'],['Radiojod','Przeciwwskazany w ciąży']]},
advanced:'Unika się schematu block-and-replace w ciąży. Celem jest najmniejsza skuteczna dawka tyreostatyku z oceną hormonów i dobrostanu płodu. Wysokie TRAb wymaga odrębnej oceny ryzyka płodowego. Po porodzie należy ponownie dostosować kontrolę i leczenie; możliwy jest nawrót Gravesa lub zapalenie poporodowe.',summary:'Ciąża zmienia interpretację badań i dobór leczenia. Uwzględniaj także płód i przeciwciała matki.',sourceIds:['pregnancy','graves'],questions:[
q('Dlaczego TSH może obniżyć się we wczesnej ciąży?',['hCG może pobudzać receptor TSH','To element fizjologii, wymagający kontekstowej interpretacji.'],['Każda ciąża oznacza Gravesa-Basedowa','Niskie TSH nie rozstrzyga etiologii.'],['TBG bezpośrednio wydziela TSH','TBG jest białkiem transportowym.']),
q('Co zrobić po potwierdzeniu ciąży u kobiety przyjmującej LT4?',['Wcześnie skontrolować czynność i dostosować plan leczenia','Zapotrzebowanie na hormon często rośnie.'],['Automatycznie odstawić LT4','Może doprowadzić do niedoboru hormonów.'],['Poczekać z oceną do porodu','Pomija istotny okres rozwoju płodu.']),
q('Które leczenie jest przeciwwskazane w ciąży?',['Radiojod','Nie stosuje się go u ciężarnych.'],['LT4 przy jawnej niedoczynności','Jest potrzebnym leczeniem zastępczym.'],['Każde badanie krwi','Oznaczenia są elementem kontroli.']),
q('Który tyreostatyk zwykle preferuje się w pierwszym trymestrze, gdy leczenie jest konieczne?',['PTU','Wybór uwzględnia profil ryzyka i wymaga nadzoru.'],['Zawsze tiamazol bez oceny ryzyka','Pierwszy trymestr wymaga szczególnego doboru terapii.'],['Radiojod zamiast leku','Jest przeciwwskazany w ciąży.']),
q('Dlaczego TRAb ma znaczenie po wcześniejszej tyreoidektomii z powodu Gravesa?',['Może utrzymywać się i przechodzić przez łożysko','Brak tarczycy u matki nie eliminuje ryzyka przeciwciał dla płodu.'],['Operacja zawsze usuwa wszystkie przeciwciała','Nie usuwa automatycznie odpowiedzi immunologicznej.'],['TRAb jest wyłącznie markerem raka','Dotyczy receptora TSH i autoimmunizacji.'])]},
{id:'leki',title:'Leki, jod i tarczyca',subtitle:'Amiodaron, interakcje i wyniki pozorne',group:'Sytuacje szczególne',minutes:13,
goals:['Odróżnisz mechanizmy tyreotoksykozy po amiodaronie.','Uwzględnisz kontrast, suplementy i interakcje LT4.'],
sections:[{title:'Amiodaron: więcej niż jedna możliwość',text:'Amiodaron wpływa na gospodarkę jodową i metabolizm hormonów. Może wywołać niedoczynność albo tyreotoksykozę. Typ 1 AIT wiąże się z nadmierną syntezą, często w zmienionym gruczole, a typ 2 z destrukcją. Występują także postacie mieszane.'},{title:'Przyczyna wpływa na terapię',text:'W typie 1 stosuje się przede wszystkim leczenie hamujące syntezę, w typie 2 istotną rolę mają glikokortykosteroidy. Decyzja o kontynuacji amiodaronu zależy także od wskazania kardiologicznego i wymaga współpracy specjalistów. Nie odstawia się go automatycznie bez uwzględnienia ryzyka arytmii.'},{title:'Zbierz pełną listę',text:'Kontrast jodowy może zaburzyć czynność u osób podatnych. Lit i niektóre terapie immunologiczne również wpływają na tarczycę. Suplementy mogą zmieniać wchłanianie LT4 lub wynik oznaczenia: biotyna to przykład interferencji, a preparaty żelaza i wapnia mogą zmniejszać wchłanianie hormonu.'}],
table:{headers:['Ekspozycja','Możliwy problem'],rows:[['Amiodaron','Niedoczynność, AIT 1, AIT 2 lub postać mieszana'],['Kontrast jodowy','Zaburzenia czynności u osób podatnych'],['Biotyna','Interferencja niektórych testów'],['Żelazo / wapń z LT4','Gorsze wchłanianie LT4']]},
advanced:'Rozróżnienie AIT 1 i 2 bywa trudne; pomocne są obraz gruczołu, unaczynienie i kontekst kliniczny. W ciężkiej tyreotoksykozie z chorobą serca pilność leczenia jest większa. Prawidłowy wcześniejszy wynik nie wyklucza późniejszego zaburzenia, więc monitorowanie powinno wynikać z ekspozycji i objawów.',summary:'Pytaj o leki i suplementy przed interpretacją wyników. Ten sam lek może powodować różne mechanizmy choroby.',sourceIds:['amiodarone','iodine','lt4'],questions:[
q('Jaki mechanizm dominuje w AIT typu 2?',['Destrukcyjne zapalenie','Hormony uwalniają się z uszkodzonej tkanki.'],['Wyłącznie autonomiczna nowa synteza','To bliższe AIT typu 1.'],['Niedobór TSH z przysadki','Nie opisuje AIT typu 2.']),
q('Czy amiodaron może powodować niedoczynność?',['Tak','Dysfunkcja po tym leku nie ogranicza się do nadczynności.'],['Nie, tylko nadczynność','Pomija rozpoznaną postać polekowej niedoczynności.'],['Nie wpływa na tarczycę','Wpływa na gospodarkę jodową i metabolizm hormonów.']),
q('Jak podejmować decyzję o odstawieniu amiodaronu?',['Wspólnie z kardiologiem, zależnie od sytuacji','Wskazanie antyarytmiczne może być kluczowe.'],['Zawsze natychmiast bez konsultacji','Może narazić chorego na ryzyko kardiologiczne.'],['Wyłącznie według anty-TPO','Przeciwciała nie wyznaczają pełnego bilansu ryzyka.']),
q('Który suplement może zafałszować niektóre oznaczenia tarczycowe?',['Biotyna','Wpływ zależy od konstrukcji testu.'],['Woda','Nie ma takiego mechanizmu.'],['Każdy produkt białkowy zawsze','Nie jest to uniwersalna właściwość żywności.']),
q('Co sprawdzić przed uznaniem, że dawka LT4 jest za mała?',['Sposób przyjmowania i interakcje','Gorsze wchłanianie może tłumaczyć wysokie TSH.'],['Tylko kolor tabletki','Nie ocenia regularności ani wchłaniania.'],['Wyłącznie wynik USG','USG nie wyjaśnia interakcji lekowych.'])]},
{id:'stany-nagle',title:'Gdy liczy się czas',subtitle:'Przełom tarczycowy i ciężka dekompensacja niedoczynności',group:'Sytuacje szczególne',minutes:15,
goals:['Rozpoznasz objawy dekompensacji wielonarządowej.','Ustalisz priorytety pilnej pomocy bez czekania na komplet badań.'],
sections:[{title:'Przełom tarczycowy',text:'To zagrażająca życiu dekompensacja tyreotoksykozy, oceniana w skali Burcha-Wartofsky’ego (BWPS >= 45 pkt) lub kryteriach japońskich Akamizu. Gorączka, znaczna tachykardia, zaburzenia świadomości, niewydolność serca i objawy przewodu pokarmowego powinny uruchomić pilne postępowanie. Częstym czynnikiem wyzwalającym jest zakażenie, zabieg lub przerwanie leczenia. Rozpoznanie opiera się na obrazie klinicznym; sam poziom FT4 nie mierzy ciężkości przełomu.'},{title:'Ciężka niedoczynność',text:'Hipotermia, bradykardia, hipowentylacja i zaburzenia świadomości u osoby z niedoczynnością sugerują jej ciężką dekompensację, określaną jako śpiączka hipometaboliczna. Pełna śpiączka nie musi być obecna. Stan wymaga pilnej hospitalizacji i monitorowania narządowego.'},{title:'Priorytety zespołu',text:'Najpierw ocena ABC, wezwanie pomocy i leczenie w warunkach intensywnego nadzoru. Równolegle pobiera się badania i poszukuje czynnika wyzwalającego. W przełomie stosuje się wielokierunkowe leczenie: tionamid (PTU/tiamazol) w dużej dawce, jod nieorganiczny po co najmniej 1 h (by nie zasilić syntezy hormonów), beta-bloker i hydrokortyzon; w ciężkiej niedoczynności uzupełnia niedobór hormonów tarczycy, zawsze zabezpieczając ewentualną niewydolność nadnerczy hydrokortyzonem.'}],
table:{headers:['Obraz','Pilna hipoteza'],rows:[['Gorączka + tachykardia + zaburzenia świadomości','Przełom w kontekście tyreotoksykozy (BWPS >= 45)'],['Hipotermia + bradykardia + hipowentylacja','Ciężka dekompensacja niedoczynności'],['Zakażenie / przerwanie leczenia','Możliwy czynnik wyzwalający'],['Sekwencja leczenia przełomu','Tyreostatyk -> jod po >= 1h -> beta-bloker + steroid']]},
advanced:'W przełomie z upośledzoną funkcją serca beta-blokada wymaga szczególnej ostrożności hemodynamicznej. Gdy stosuje się jod w nadprodukcji, bezwzględnie podaje się go po co najmniej 1 godzinie od tyreostatyku, aby uniknąć efektu substratowego i nasilenia syntezy. W ciężkiej niedoczynności należy podać hydrokortyzon przed lub równolegle z lewotyroksyną, aby zapobiec przełomowi nadnerczowemu.',summary:'Ciężkość określa stan narządów, nie sama liczba hormonów. Rozpoznaj alarm i uruchom pilną pomoc.',sourceIds:['storm','coma','emergency','central'],questions:[
q('Tyreotoksykoza, gorączka, tętno 150/min i splątanie. Jaki priorytet?',['Podejrzenie przełomu i natychmiastowa pomoc szpitalna','To objawy możliwej dekompensacji wielonarządowej.'],['Kontrola TSH za pół roku','Nie odpowiada pilności stanu.'],['Wyłącznie planowe USG','Nie zabezpiecza zagrożenia życia.']),
q('Czy bardzo wysokie FT4 samo rozpoznaje przełom?',['Nie, decyduje także obraz kliniczny','Stężenie hormonów nie odzwierciedla wprost dekompensacji.'],['Tak, bez oceny chorego','Pomija funkcję narządów i objawy.'],['Przełom zawsze ma prawidłowe FT4','Nie jest to prawidłowa zasada.']),
q('Co sugeruje ciężką dekompensację niedoczynności?',['Hipotermia, bradykardia i zaburzenia świadomości','To alarmowy zestaw objawów w odpowiednim kontekście.'],['Izolowane dodatnie anty-TPO','Nie dowodzi ostrej dekompensacji.'],['Bezobjawowy mały guzek','Nie odpowiada temu zespołowi.']),
q('Dlaczego w ciężkiej niedoczynności ocenia się oś nadnerczową?',['Może współistnieć niedobór kortyzolu','Wymaga zabezpieczenia przy wdrażaniu hormonów tarczycy.'],['Kortyzol jest markerem raka rdzeniastego','Tym markerem jest m.in. kalcytonina.'],['Każde TSH określa kortyzol','TSH nie ocenia wydolności nadnerczy.']),
q('Czy należy czekać na pełny panel wyników przy niestabilności i podejrzeniu przełomu?',['Nie, rozpocząć pilną ocenę i zabezpieczenie równolegle z badaniami','Zwłoka może być niebezpieczna.'],['Tak, zawsze do kompletnej dokumentacji','Nie można odkładać stabilizacji.'],['Zrezygnować z badań całkowicie','Badania są potrzebne, ale prowadzi się je równolegle.'])]},
];

const allDrafts: DraftLesson[] = [
  ...draft.map(l => ({ ...l, moduleId: 'tarczyca' as ModuleId })),
  ...draftThyroidMathChem,
  ...draftPituitaryPart1,
  ...draftPituitaryPart2,
  ...draftPituitaryMathChem,
  ...draftAdrenalPart1,
  ...draftAdrenalPart2,
  ...draftAdrenalMathChem,
  ...draftParathyroidPart1.map(l => ({ ...l, moduleId: 'przytarczyce' as ModuleId })),
  ...draftParathyroidPart2.map(l => ({ ...l, moduleId: 'przytarczyce' as ModuleId })),
  ...draftParathyroidMathChem,
  ...draftDiabetesPart1.map(l => ({ ...l, moduleId: 'cukrzyca' as ModuleId })),
  ...draftDiabetesPart2.map(l => ({ ...l, moduleId: 'cukrzyca' as ModuleId })),
  ...draftDiabetesMathChem.map(l => ({ ...l, moduleId: 'cukrzyca' as ModuleId })),
  ...draftGonadsPart1.map(l => ({ ...l, moduleId: 'gonady' as ModuleId })),
  ...draftGonadsPart2.map(l => ({ ...l, moduleId: 'gonady' as ModuleId })),
  ...draftGonadsPart3.filter(l=>!gahtLessonIds.includes(l.id)).map(l => ({ ...l, moduleId: 'gonady' as ModuleId })),
  ...gahtLessons,
  ...draftGonadsPart4.map(l => ({ ...l, moduleId: 'gonady' as ModuleId })),
  ...draftNenPart1.map(l => ({ ...l, moduleId: 'nen' as ModuleId })),
  ...draftNenPart2.map(l => ({ ...l, moduleId: 'nen' as ModuleId })),
  ...draftNenPart3.map(l => ({ ...l, moduleId: 'nen' as ModuleId })),
  ...draftNenPart4.map(l => ({ ...l, moduleId: 'nen' as ModuleId })),
  ...draftOtyloscPart1.map(l => ({ ...l, moduleId: 'otylosc' as ModuleId })),
  ...draftOtyloscPart2.map(l => ({ ...l, moduleId: 'otylosc' as ModuleId })),
  ...draftOtyloscPart3.map(l => ({ ...l, moduleId: 'otylosc' as ModuleId })),
  ...draftOtyloscPart4.map(l => ({ ...l, moduleId: 'otylosc' as ModuleId })),
];

export const lessons: Lesson[] = allDrafts.map((l, li) => {
  const subtitle = l.subtitle || l.title;
  const minutes = l.minutes || (l.readTime ? parseInt(l.readTime, 10) : 12);
  const sections = l.sections.map(s => ({
    title: s.title,
    text: s.text || s.content || '',
  }));
  const table = {
    headers: l.table.headers,
    rows: l.table.rows,
  };
  return {
    ...l,
    subtitle,
    minutes,
    sections,
    table,
    questions: l.questions.map((item, i) => {
      const answer = (li + i) % 3;
      const options = item.choices.map(([text, explanation]) => ({ text, explanation }));
      const rotated = [...options.slice(3 - answer), ...options.slice(0, 3 - answer)];
      const legacy = legacyQuestionIds as Record<string,Record<string,string>>;
      const id = item.id ?? legacy[l.id]?.[item.prompt];
      if (!id) throw new Error(`Nadaj trwały identyfikator pytaniu: ${l.id} / ${item.prompt}`);
      return { id, lessonId: l.id, prompt: item.prompt, options: rotated, answer };
    }),
  };
});

export const questions = lessons.flatMap(l => l.questions);
export const flashcards = [...questions.map(q => ({
  id: `${q.id}-card`,
  lessonId: q.lessonId,
  front: q.prompt,
  back: `${q.options[q.answer].text}. ${q.options[q.answer].explanation}`,
})), ...gahtConceptCards, ...Object.entries(studyPrompts).map(([moduleId,p])=>({id:`reasoning-${moduleId}-v1`,lessonId:lessons.find(l=>l.moduleId===moduleId)!.id,front:p.question,back:`${p.answer} Pułapka: ${p.pitfall}`}))];

export const modulesList = [
  { id: 'tarczyca', name: 'Tarczyca', count: 16, subtitle: 'Fizjologia, Hashimoto, Graves, guzki, stany nagłe, kinetyka T4 i mechanizm TPO' },
  { id: 'przysadka', name: 'Przysadka i podwzgórze', count: 16, subtitle: 'Gruczolaki, prolactinoma, akromegalia, Cushing, moczówka, oscylatory Goodwina i równanie Edelmana' },
  { id: 'nadnercza', name: 'Nadnercza', count: 16, subtitle: 'Choroba Addisona, zespół Conna, guz chromochłonny, WPN, kinetyka enzymatyczna i stereochemia' },
  { id: 'przytarczyce', name: 'Przytarczyce i Ca–P', count: 16, subtitle: 'Gospodarka Ca–P, tężyczka, model Hilla CaSR, kinetyka mineralizacji i bisfosfoniany' },
  { id: 'cukrzyca', name: 'Cukrzyca i metabolizm', count: 16, subtitle: 'T1D, T2D, MODY, LADA, DKA/HHS, pompy/CGM, model Bergmana i biochemia receptora insuliny' },
  { id: 'gonady', name: 'Gonady i medycyna rozrodu', count: 26, subtitle: 'Oś HPG, hipogonadyzm, PCOS, MHT, IVF/OHSS, 8 lekcji GAHT, DSD i aromataza' },
  { id: 'nen', name: 'Nowotwory neuroendokrynne i MEN', count: 20, subtitle: 'GEP-NEN, rakowiak, gastrinoma, insulinoma, MEN1, MEN2, MEN4, VHL, PRRT, CAPTEM i kinet. receptorowa' },
  { id: 'otylosc', name: 'Otyłość i lipidy', count: 20, subtitle: 'Adipobiologia, GLP-1/GIP, bariatria, MASLD, FH, PCSK9, model Halla i biochemia lipolizy' },
] as const;

export const plannedModules = [
  'Endokrynologia rozwojowa i pediatryczna',
  'Endokrynologia ciąży i połogu',
];
