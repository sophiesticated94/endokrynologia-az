import { type DraftLesson, q } from './course-types.ts';

export const draftGonadsPart4: DraftLesson[] = [
  {
    id: 'gonady-dsd',
    title: 'Zaburzenia rozwoju płci (DSD) i dysgenezje gonad',
    group: 'Hormonoterapia tranzycyjna i zaburzenia rozwojowe',
    readTime: '13 min',
    goals: [
      'Znać klasyfikację z Chicago zaburzeń rozwoju płci (46,XY DSD, 46,XX DSD, chromosomalne DSD).',
      'Różnicować zespół niewrażliwości na androgeny (CAIS/PAIS) od niedoboru 5-alfa-reduktazy.',
      'Zrozumieć ryzyko gonadoblastoma w dysgenezjach gonad z materiałem chromosomu Y.',
    ],
    sections: [
      {
        title: 'Klasyfikacja zaburzeń rozwoju płci (DSD)',
        content:
          'Zaburzenia rozwoju płci (DSD — Disorders of Sex Development) definiuje się jako wrodzone stany, w których rozwój płci chromosomalnej, gonadalnej lub anatomicznej jest nietypowy (konsensus z Chicago). Klasyfikacja wyróżnia trzy główne grupy: 1) Chromosomalne DSD (zespół Turnera 45,X, zespół Klinefeltera 47,XXY, mozaicyzm 45,X/46,XY); 2) 46,XY DSD (zaburzenia rozwoju jąder, defekty syntezy lub działania androgenów); 3) 46,XX DSD (najczęściej wrodzony przerost nadnerczy — WPN z niedoborem 21-hydroksylazy i maskulinizacją zewnętrznych narządów płciowych).',
      },
      {
        title: 'CAIS vs niedobór 5-alfa-reduktazy typu 2',
        content:
          'Zespół całkowitej niewrażliwości na androgeny (CAIS — zespół Morrisa, mutacja genu receptora androgenowego AR na chromosomie X) manifestuje się fenotypem żeńskim u osoby z kariotypem 46,XY. Obecne są jądra (w kanale pachwinowym lub jamie brzusznej), prawidłowe męskie stężenie testosteronu oraz wysokie stężenie LH. W wyniku działania AMH z komórek Sertoliego brak jest macicy i jajowodów; pochwa jest ślepo zakończona, a owłosienie łonowe i pachowe jest skąpe lub nieobecne. Z kolei w niedoborze 5-alfa-reduktazy (mutacja SRD5A2) występuje niepełna maskulinizacja narządów zewnętrznych przy urodzeniu, a w okresie pokwitania dochodzi do gwałtownej wirylizacji pod wpływem wzrostu stężenia testosteronu.',
      },
      {
        title: 'Dysgenezje gonad i ryzyko gonadoblastoma',
        content:
          'W czystej dysgenezji gonad 46,XY (zespół Swyera, defekt genu SRY) jądra nie rozwijają się, powstają pasmowate gonady (streak gonads), brak jest testosteronu i AMH, w związku z czym rozwijają się prawidłowe narządy rodne żeńskie (macica, jajowody). Wszelkie dysgenetyczne pasmowate gonady zawierające materiał chromosomu Y niosą wysokie (nawet 30–50%) ryzyko transformacji nowotworowej w kierunku gonadoblastoma i dysgerminoma. Standardem postępowania jest obustronna gonadektomia profilaktyczna po ustaleniu rozpoznania.',
      },
    ],
    table: {
      caption: 'Diagnostyka różnicowa wybranych postaci 46,XY DSD',
      headers: ['Jednostka', 'Kariotyp', 'Genitalia zewnętrzne', 'Macica / jajowody', 'Testosteron i LH', 'Ryzyko nowotworu gonady'],
      rows: [
        ['CAIS (zespół Morrisa)', '46,XY', 'Żeńskie, ślepa pochwa', 'Brak (obecny AMH)', 'T męski/podwyższony, LH wysokie', 'Umiarkowane (gonadektomia po pokwitaniu)'],
        ['Niedobór 5-alfa-reduktazy', '46,XY', 'Niejednoznaczne / żeńskie; wirylizacja w dojrzewaniu', 'Brak (obecny AMH)', 'T norma, DHT skrajnie niskie, T/DHT wysoki', 'Niskie'],
        ['Zespół Swyera (dysgenezja)', '46,XY', 'Żeńskie hipoplastyczne', 'Obecne (brak AMH)', 'T i E2 skrajnie niskie, LH/FSH bardzo wysokie', 'Bardzo wysokie 30–50% (pilna gonadektomia)'],
        ['Zespół Turnera', '45,X (lub mozaika)', 'Żeńskie', 'Obecne', 'FSH/LH wysokie, E2 niskie', 'Wzrost ryzyka tylko przy obecności fragmentu Y'],
      ],
    },
    advanced:
      'W zespole Turnera obecność sekwencji chromosomu Y (wykrywana metodami FISH lub PCR dla TSPY/SRY) stanowi bezwzględne wskazanie do laparoskopowego usunięcia pasmowatych gonad z uwagi na ryzyko gonadoblastoma. W CAIS gonadektomię można odroczyć do ukończenia spontanicznego pokwitania (dzięki obwodowej aromatyzacji testosteronu do estradiolu dochodzi do prawidłowego rozwoju piersi), po czym wdraża się substytucję estrogenową.',
    summary:
      'DSD dzieli się na chromosomalne, 46,XY i 46,XX. CAIS ma jądra, brak macicy i wysoki T/LH. Dysgenezje gonad z chromosomem Y (Swyer) wymagają profilaktycznej gonadektomii z powodu ryzyka gonadoblastoma.',
    sourceIds: ['eau-male-hypo-2024', 'endo-trans-2017'],
    questions: [
      q(
        '17-letnia dziewczyna zgłosiła się z pierwotnym brakiem miesiączki. W badaniu: prawidłowo rozwinięte piersi, brak owłosienia łonowego, ślepa pochwa, kariotyp 46,XY. Jakie jest najbardziej prawdopodobne rozpoznanie?',
        ['Zespół całkowitej niewrażliwości na androgeny (CAIS — zespół Morrisa)', 'Brak wrażliwości na androgeny uniemożliwia rozwój owłosienia, a aromatyzacja T daje rozwój piersi; AMH eliminuje macicę.'],
        ['Wrodzony przerost nadnerczy (WPN)', 'WPN u płodu żeńskiego wywołuje maskulinizację i wirylizację, kariotyp 46,XX.'],
        ['Zespół Turnera z kariotypem 45,X', 'W zespole Turnera brak jest rozwoju piersi bez substytucji i obecna jest macica.'],
      ),
      q(
        'Dlaczego u pacjentek z zespołem Swyera (czysta dysgenezja gonad 46,XY) zaleca się pilną obustronną gonadektomię?',
        ['Pasmowate gonady z obecnością chromosomu Y niosą 30–50% ryzyko złośliwego nowotworu (gonadoblastoma)', 'Obecność komórek rozrodczych w dysgenetycznym zrębie z materiałem Y ulega transformacji złośliwej.'],
        ['Gonady te produkują śmiertelne ilości aldosteronu prowadzące do udaru mózgu', 'Pasmowate gonady są afunkcjonalne hormonalnie i nie produkują aldosteronu.'],
        ['Aby umożliwić zajście w ciążę bez zapłodnienia pozaustrojowego', 'Gonadektomia nie przywraca płodności naturalnej.'],
      ),
      q(
        'Jaki marker biochemiczny w teście stymulacji hCG różnicuje niedobór 5-alfa-reduktazy od CAIS?',
        ['Wysoki stosunek testosteronu do dihydrotestosteronu (T/DHT > 20–30) po stymulacji hCG', 'Blok enzymatyczny uniemożliwia konwersję T do DHT, co skutkuje nagromadzeniem T i niedoborem DHT.'],
        ['Całkowity brak hormonu wzrostu GH w surowicy', 'Oś somatotropowa nie uczestniczy w diagnostyce różnicowej 5-alfa-reduktazy.'],
        ['Gwałtowny spadek stężenia sodu i potasu', 'Enzym 5-AR nie bierze udziału w szlaku mineralokortykosteroidów.'],
      ),
      q(
        'Dlaczego u pacjentki z CAIS (zespół Morrisa) NIE dochodzi do wytworzenia macicy i jajowodów?',
        ['Prawidłowo funkcjonujące jądra płodowe wydzielają hormon antymüllerowski (AMH)', 'AMH powoduje fizjologiczną regresję przewodów przyśródnerczowych (Müllera).'],
        ['Brak estrogenów w życiu płodowym powoduje rozpad macicy', 'To AMH, a nie brak estrogenów, odpowiada za zanik przewodów Müllera.'],
        ['Nadmiar kortyzolu niszczy zawiązki jajowodów w 8. tygodniu ciąży', 'Kortyzol nie uczestniczy w ukierunkowaniu przewodów płciowych.'],
      ),
      q(
        'Jaka jest najczęstsza przyczyna zaburzeń rozwoju płci typu 46,XX DSD z wirylizacją zewnętrznych narządów płciowych?',
        ['Klasyczny wrodzony przerost nadnerczy (WPN z niedoborem 21-hydroksylazy)', 'Nadmiar androgenów nadnerczowych in utero powoduje przerost łechtaczki i zrośnięcie fałdów wargowo-mosznowych.'],
        ['Zespół Klinefeltera z dodatkowym chromosomem X', 'Dotyczy kariotypu 47,XXY i fenotypu męskiego.'],
        ['Pierwotna nadczynność przytarczyc matki', 'Hiperkalcemia matczyna nie maskulinizuje narządów płciowych płodu żeńskiego.'],
      ),
    ],
  },
  {
    id: 'gonady-dojrzewanie-plciowe',
    title: 'Dojrzewanie płciowe: pubertas praecox i pubertas tarda',
    group: 'Hormonoterapia tranzycyjna i zaburzenia rozwojowe',
    readTime: '13 min',
    goals: [
      'Znać normy czasowe pokwitania i skalę Tannera (I–V).',
      'Różnicować przedwczesne dojrzewanie prawdziwe (centralne, CPP) od rzekomego (obwodowego, PPP).',
      'Zdiagnozować i leczyć opóźnione dojrzewanie (pubertas tarda): CDGP vs hipogonadyzm.',
    ],
    sections: [
      {
        title: 'Normy fizjologiczne i skala Tannera',
        content:
          'Prawidłowe dojrzewanie płciowe rozpoczyna się u dziewcząt między 8. a 13. rokiem życia (pierwszy objaw: thelarche — rozwój pączków piersiowych), a u chłopców między 9. a 14. rokiem życia (pierwszy objaw: powiększenie objętości jąder do ≥ 4 ml w orchidometrze Pradera). Ocenę zaawansowania cech płciowych prowadzi się w 5-stopniowej skali Tannera. Kluczowym elementem diagnostyki jest ocena wieku kostnego (RTG niedominującej dłoni i nadgarstka wg atlasu Greulicha-Pyle’a).',
      },
      {
        title: 'Przedwczesne dojrzewanie (Pubertas praecox)',
        content:
          'Wystąpienie cech pokwitania przed 8. r.ż. u dziewcząt lub przed 9. r.ż. u chłopców definiuje przedwczesne dojrzewanie. Dzieli się je na: 1) Prawdziwe (ośrodkowe, zależne od GnRH — CPP), w którym dochodzi do przedwczesnej aktywacji osi podwzgórze-przysadka-gonady (test z GnRH wykazuje wyrzut LH > 5 IU/l; u chłopców w >50% przyczyną są guzy OUN, np. hamartoma podwzgórza, u dziewcząt częściej jest idiopatyczne); 2) Rzekome (obwodowe, niezależne od GnRH — PPP), wynikające z autonomicznej produkcji steroidów płciowych (guzy gonad, WPN, torbiele jajników, zespół McCune-Albrighta z mutacją GNAS, testotoksykoza z mutacją aktywującą receptora LHCGR).',
      },
      {
        title: 'Opóźnione dojrzewanie (Pubertas tarda)',
        content:
          'Brak powiększenia jąder ≥ 4 ml u chłopców w wieku 14 lat lub brak thelarche u dziewcząt w wieku 13 lat (lub brak menarche do 15. r.ż.) definiuje opóźnione dojrzewanie. Najczęstszą postacią u chłopców (>60%) jest konstytucjonalne opóźnienie wzrastania i dojrzewania (CDGP) — wariant normy rozwojowej z opóźnionym wiekiem kostnym, prawidłowym docelowym wzrostem i rodzinnym wywiadem późnego pokwitania. Należy je różnicować z trwałym hipogonadyzmem hipogonadotropowym (zespół Kallmanna z anosmią) oraz hipergonadotropowym (zespół Turnera, zespół Klinefeltera).',
      },
    ],
    table: {
      caption: 'Różnicowanie przedwczesnego dojrzewania ośrodkowego (CPP) i obwodowego (PPP)',
      headers: ['Cecha różnicująca', 'Ośrodkowe (prawdziwe, CPP)', 'Obwodowe (rzekome, PPP)'],
      rows: [
        ['Mechanizm', 'Przedwczesna pulsacyjna aktywacja GnRH', 'Autonomiczne wydzielanie androgenów/estrogenów'],
        ['Test z analogiem GnRH', 'Gwałtowny wyrzut LH (LH peak > 5 IU/l)', 'Zablokowany wyrzut LH (LH < 0,5–1,0 IU/l)'],
        ['Wielkość jąder u chłopców', 'Obustronnie powiększone (≥ 4 ml)', 'Przedpokwitaniowe (< 4 ml) lub asymetria (guz jądra)'],
        ['Najczęstsze etiologie', 'Idiopatyczne (dziewczęta), hamartoma OUN (chłopcy)', 'Guzy kory nadnerczy, WPN, McCune-Albright, testotoksykoza'],
        ['Leczenie z wyboru', 'Depot analogi GnRH (np. tryptorelina, leuprolid)', 'Leczenie przyczyny (chirurgia, inhibitory aromatazy, blokery AR)'],
      ],
    },
    advanced:
      'W ośrodkowym przedwczesnym dojrzewaniu (CPP) podawanie depot agonistów receptora GnRH (np. tryptorelina 3,75 mg co 28 dni lub 11,25 mg co 12 tygodni) powoduje desensytyzację i internalizację receptorów GnRH w przysadce, wygaszając wydzielanie LH/FSH. Leczenie zatrzymuje postęp dojrzewania płciowego i zapobiega przedwczesnemu zarośnięciu nasad kości długich, ratując ostateczny wzrost dorosły.',
    summary:
      'Początek dojrzewania: $\ge$4 ml jądra u chłopców (9–14 lat), thelarche u dziewcząt (8–13 lat). W CPP test GnRH wykazuje wysokie LH (leczenie depot agonistą GnRH). CDGP to najczęstsza łagodna przyczyna pubertas tarda.',
    sourceIds: ['eau-hypogonadism-2024', 'endo-trans-2017'],
    questions: [
      q(
        'Jaki jest PIERWSZY fizykalny objaw prawidłowego rozpoczęcia pokwitania u chłopców?',
        ['Zwiększenie objętości jąder do co najmniej 4 ml w orchidometrze Pradera', 'Jest to bezpośredni efekt stymulacji komórek Sertoliego i kanalików nasiennych przez FSH.'],
        ['Mutacja głosu i owłosienie klatki piersiowej', 'Mutacja głosu pojawia się w późnych stadiach Tannera (IV–V).'],
        ['Masywny zarost na brodzie', 'Zarost na twarzy jest objawem zaawansowanego pokwitania.'],
      ),
      q(
        'U 6-letniego chłopca stwierdzono pojawienie się owłosienia łonowego i powiększenie prącia, lecz jądra mają objętość 2 ml (< 4 ml). Jak zinterpretować ten obraz?',
        ['Przedwczesne dojrzewanie obwodowe (rzekome, PPP) — źródło androgenów poza osią podwzgórze-przysadka', 'Małe jądra świadczą o braku stymulacji gonadotropinami przysadkowymi (np. guz nadnercza lub WPN).'],
        ['Fizjologiczne pokwitanie o prawidłowym torze', 'Wiek 6 lat i małe jądra przy cechach maskulinizacji są stanem bezwzględnie patologicznym.'],
        ['Ośrodkowe dojrzewanie prawdziwe (CPP)', 'W CPP jądra uległyby symetrycznemu powiększeniu pod wpływem LH i FSH.'],
      ),
      q(
        'Jaki wynik testu stymulacji z syntetycznym GnRH potwierdza ośrodkowe przedwczesne dojrzewanie (CPP)?',
        ['Wyrzut LH ze szczytowym stężeniem > 5 IU/l', 'Świadczy o dojrzałej, aktywnej odpowiedzi komórek gonadotropowych przysadki.'],
        ['Stężenie LH równe 0,00 IU/l', 'Całkowity brak wyrzutu LH przemawia za przyczyną obwodową lub brakiem dojrzałości osi.'],
        ['Wzrost stężenia glikogenu w moczu', 'Glikogen nie jest parametrem ocenianym w teście z GnRH.'],
      ),
      q(
        'Jak działają depot agonisty GnRH (np. tryptorelina) w leczeniu ośrodkowego przedwczesnego dojrzewania (CPP)?',
        ['Powodują ciągłą stymulację i internalizację receptorów GnRH w przysadce, wygaszając wydzielanie LH i FSH', 'Ciągła obecność agonisty zamiast fizjologicznych pulsów hamuje czynność komórek gonadotropowych.'],
        ['Bezpośrednio niszczą komórki jajnika i jądra przez apoptozę', 'Analogi GnRH nie uszkadzają miąższu gonad; po odstawieniu funkcja powraca.'],
        ['Pobudzają kości do natychmiastowego zarośnięcia chrząstek nasadowych', 'Wręcz przeciwnie — opóźniają zarośnięcie nasad, ratując ostateczny wzrost dorosły.'],
      ),
      q(
        '14,5-letni chłopiec bez cech dojrzewania (jądra 2 ml), z opóźnionym wiekiem kostnym o 2,5 roku i rodzinnym wywiadem późnego skoku wzrostowego u ojca. Co jest najbardziej prawdopodobne?',
        ['Konstytucjonalne opóźnienie wzrastania i dojrzewania (CDGP)', 'Jest to najczęstszy łagodny wariant rozwojowy rokujący samoistne, pełne wejście w pokwitanie.'],
        ['Zespół Klinefeltera z obecnością chromosomu 48,XXXY', 'W zespole Klinefeltera stężenia gonadotropin po 13. r.ż. gwałtownie rosną (hipergonadotropowy).'],
        ['Ostra martwica przysadki mózgowej (udar)', 'Brak objawów ostrych i obecność rodzinnego wywiadu przemawia za CDGP.'],
      ),
    ],
  },
  {
    id: 'gonady-onkologia-guzy',
    title: 'Nowotwory gonad i guzy hormonalnie czynne',
    group: 'Fundamenty i diagnostyka',
    readTime: '13 min',
    goals: [
      'Znać podział guzów jądra i jajnika na nowotwory germinalne i nowotwory ze sznurów płciowych i zrębu.',
      'Rozpoznać objawy hormonalne guzów z komórek Leydiga (Leydigoma) i ziarniszczaka (granulosa cell tumor).',
      'Interpretować markery nowotworowe: b-hCG, AFP, LDH oraz inhibinę B.',
    ],
    sections: [
      {
        title: 'Nowotwory jądra i markery germinalne',
        content:
          'Ponad 95% guzów jądra to nowotwory zarodkowe (germinalne — GCT), dzielące się na nasieniaki (seminoma) i nienasieniaki (non-seminoma: rak zarodkowy, potworniak, guz zatoki endodermalnej YST, kosmówczak choriocarcinoma). Złotą triadą markerów nowotworowych jądra są: alfa-fetoproteina (AFP — podwyższona w YST i raku zarodkowym, NIGDY w czystym nasieniaku), beta-hCG (bardzo wysoka w kosmówczaku, umiarkowana w części nasieniaków) oraz dehydrogenaza mleczanowa (LDH — wskaźnik masy guza i obrotu komórkowego).',
      },
      {
        title: 'Guzy hormonalnie czynne jądra (Leydigoma i Sertolioma)',
        content:
          'Guzy ze sznurów płciowych i zrębu gonadowego (SCST) stanowią ok. 3–5% nowotworów jądra. Najczęstszy jest guz z komórek Leydiga (Leydigoma), który w 90% ma charakter łagodny. Wydziela w sposób autonomiczny testosteron lub estrogeny (w wyniku nadekspresji aromatazy). U chłopców przed pokwitaniem objawia się obwodowym przedwczesnym dojrzewaniem z asymetrią jąder, natomiast u dorosłych mężczyzn ginekomastią, utratą libido, zaburzeniami wzwodu i azoospermią w wyniku supresji gonadotropin przysadkowych.',
      },
      {
        title: 'Hormonalnie czynne guzy jajnika: ziarniszczak i jądrzak',
        content:
          'Ziarniszczak (granulosa cell tumor — GCT) to najczęstszy hormonalnie czynny nowotwór jajnika o niskim stopniu złośliwości. Komórki ziarniste masowo wydzielają estradiol oraz inhibinę B (czuły i swoisty marker wznowy nowotworu). U kobiet po menopauzie objawia się nieprawidłowymi krwawieniami z dróg rodnych, rozrostem endometrium i rakiem błony śluzowej trzonu macicy. Odwrotnym obrazem charakteryzuje się guz z komórek Sertoliego-Leydiga (arrhenoblastoma / jądrzak), który wydziela testosteron i prowadzi do błyskawicznej, ciężkiej wirylizacji u młodych kobiet.',
      },
    ],
    table: {
      caption: 'Markery i profil wydzielania guzów hormonalnie czynnych gonad',
      headers: ['Typ nowotworu', 'Lokalizacja', 'Wydzielany hormon / marker', 'Typowy obraz kliniczny'],
      rows: [
        ['Nasieniak (Seminoma)', 'Jądro', 'LDH, u części b-hCG (AFP ZAWSZE w normie)', 'Bezbolesne stwardnienie jądra u młodego mężczyzny'],
        ['Kosmówczak (Choriocarcinoma)', 'Jądro / gonady', 'Masywnie wysokie b-hCG', 'Wczesne przerzuty krwiopochodne, tyreotoksykoza, ginekomastia'],
        ['Guz z komórek Leydiga', 'Jądro', 'Testosteron lub estradiol (supresja LH/FSH)', 'Chłopcy: PPP; dorośli: ginekomastia, atrofia drugiego jądra'],
        ['Ziarniszczak (Granulosa)', 'Jajnik', 'Estradiol, Inhibina B (oraz AMH)', 'Krwawienia pomenopauzalne, hiperplazja i rak endometrium'],
        ['Arrhenoblastoma (Sertoli-Leydig)', 'Jajnik', 'Testosteron (bardzo wysoki > 150–200 ng/dl)', 'Gwałtowny hirsutyzm, łysienie męskie, klitoromegalia, chrypka'],
      ],
    },
    advanced:
      'W kosmówczaku jądra skrajnie wysokie stężenia beta-hCG (często > 50 000–100 000 IU/l) mogą pobudzać receptor TSH w tarczycy ze względu na homologię podjednostki alfa oraz strukturalne podobieństwo podjednostek beta. Prowadzi to do jawnej tyreotoksykozy paraneoplastycznej z niskim stężeniem TSH i tachykardią, która ustępuje po leczeniu onkologicznym guza.',
    summary:
      'GCT jądra monitoruje się przez b-hCG, AFP i LDH (czysty nasieniak nigdy nie ma podwyższonego AFP). Leydigoma daje ginekomastię lub PPP. Ziarniszczak wydziela estradiol i inhibinę B, a jądrzak wywołuje wirylizację.',
    sourceIds: ['eau-hypogonadism-2024', 'eshre-poi-2024'],
    questions: [
      q(
        'Który z markerów nowotworowych jądra NIGDY nie jest podwyższony w czystym nasieniaku (seminoma)?',
        ['Alfa-fetoproteina (AFP)', 'Obecność podwyższonego AFP wyklucza czystego nasieniaka i świadczy o komponencie nienasieniaka (rak zarodkowy lub YST).'],
        ['Dehydrogenaza mleczanowa (LDH)', 'LDH jest nieswoistym markerem masy guza i często rośnie w nasieniakach.'],
        ['Podjednostka beta gonadotropiny kosmówkowej (b-hCG)', 'Niewielki do umiarkowanego wzrost b-hCG może występować u ok. 15–20% chorych na czyste nasieniaki.'],
      ),
      q(
        '62-letnia kobieta po menopauzie zgłosiła się z powodu nawrotu krwawień z dróg rodnych. W USG: pogrubiałe endometrium 14 mm oraz guz lewego jajnika o średnicy 6 cm. Jaki marker w surowicy ma najwyższą wartość diagnostyczną?',
        ['Inhibina B (oraz estradiol) w podejrzeniu ziarniszczaka jajnika (granulosa cell tumor)', 'Ziarniszczak produkuje inhibinę B i estradiol, co prowadzi do rozrostu i krwawień z endometrium.'],
        ['Parathormon (PTH)', 'PTH nie jest wydzielany przez ziarniszczaka jajnika.'],
        ['Kalcytonina', 'Kalcytonina jest swoistym markerem raka rdzeniastego tarczycy.'],
      ),
      q(
        'Dlaczego skrajnie wysokie stężenie beta-hCG w zaawansowanym kosmówczaku jądra może wywołać nadczynność tarczycy?',
        ['Beta-hCG wykazuje homologię strukturalną z TSH i przy bardzo wysokich stężeniach aktywuje receptor TSH', 'Wspólna podjednostka alfa i podobieństwo pętli podjednostki beta pozwalają na krzyżową aktywację TSHR.'],
        ['Komórki kosmówczaka wstrzykują hormony tarczycy prosto do aorty', 'Nowotwór nie syntetyzuje hormonów tarczycy, lecz pobudza gruczoł tarczowy pacjenta.'],
        ['Beta-hCG niszczy przysadkę mózgową w mechanizmie martwicy krwotocznej', 'Przysadka nie ulega destrukcji; TSH spada w mechanizmie ujemnego sprzężenia zwrotnego.'],
      ),
      q(
        'U 32-letniego mężczyzny wykryto 2-centymetrowy guz jądra, obustronną ginekomastię oraz zablokowane stężenia LH i FSH. Co jest najbardziej prawdopodobną przyczyną?',
        ['Guz z komórek Leydiga (Leydigoma) nadmiernie wydzielający estrogeny', 'Autonomiczna synteza estrogenów lub aromatyzacja androgenów przez guz hamuje przysadkowe LH/FSH i daje ginekomastię.'],
        ['Zwykły torbielak nasienny bez aktywności hormonalnej', 'Torbiele nie produkują hormonów i nie blokują gonadotropin przysadkowych.'],
        ['Zanokcica bakteryjna palucha', 'Infekcja bakteryjna kończyny nie powoduje guzów jądra ani ginekomastii.'],
      ),
      q(
        '24-letnia kobieta zgłasza gwałtowny rozrost owłosienia twarzy, obniżenie głosu i przerost łechtaczki w ciągu 4 miesięcy. Testosteron wynosi 320 ng/dl. Jakie badanie obrazowe należy pilnie wykonać?',
        ['USG przezpochwowe i/lub rezonans magnetyczny miednicy w poszukiwaniu guza jajnika (np. jądrzaka Sertoli-Leydig)', 'Gwałtowna wirylizacja i T > 150–200 ng/dl sugerują guz hormonalnie czynny jajnika lub nadnerczy.'],
        ['RTG klatki piersiowej w poszukiwaniu gruźlicy płuc', 'Gruźlica nie wywołuje ostrego zespołu wirylizacyjnego u młodych kobiet.'],
        ['Scyntygrafię kości całego ciała', 'Nie jest badaniem pierwszego rzutu w poszukiwaniu przyczyny hiperandrogenizmu.'],
      ),
    ],
  },
  {
    id: 'gonady-matematyka-modele',
    title: 'Matematyka i modele osi gonad: Vermeulen i oscylator GnRH',
    group: 'Matematyka i modele',
    readTime: '14 min',
    goals: [
      'Wyprowadzić i rozwiązać równanie Vermeulena na stężenie wolnego testosteronu.',
      'Zrozumieć wskaźnik wolnych androgenów (FAI) i jego ograniczenia przy skrajnych wartościach SHBG.',
      'Poznać model generatora pulsów GnRH jako nieliniowego oscylatora ze sprzężeniem z opóźnieniem.',
    ],
    sections: [
      {
        title: 'Model Vermeulena i równowaga wiązania testosteronu',
        content:
          'Testosteron krąży w osoczu w trzech frakcjach: związany z wysokim powinowactwem z globuliną wiążącą hormony płciowe (SHBG, $K_s \approx 1 \times 10^9\ \\text{M}^{-1}$), związany z niskim powinowactwem z albuminą osocza ($K_a \approx 3{,}6 \times 10^4\ \\text{M}^{-1}$) oraz jako frakcja wolna ($T_{\\text{free}}$, ok. 1–2% puli całkowitej). Zgodnie z prawem działania mas: $[T\\text{SHBG}] = K_s [T_{\\text{free}}] [\\text{SHBG}_{\\text{free}}]$ oraz $[T\\text{Alb}] = K_a [T_{\\text{free}}] [\\text{Alb}_{\\text{free}}]$. Ponieważ stężenie albuminy znacznie przewyższa testosteron, $[\\text{Alb}_{\\text{free}}] \\approx [\\text{Alb}_{\\text{total}}]$, co pozwala zredukować układ do pojedynczego równania kwadratowego.',
      },
      {
        title: 'Wyprowadzenie analityczne Vermeulena',
        content:
          'Definiując $N = 1 + K_a [\\text{Alb}]$, bilans całkowitego testosteronu wynosi: $T_{\\text{total}} = N [T_{\\text{free}}] + \\frac{K_s [T_{\\text{free}}] [\\text{SHBG}]}{1 + K_s [T_{\\text{free}}]}$. Mnożąc obustronnie przez mianownik, otrzymujemy kanoniczne równanie kwadratowe Vermeulena: $a [T_{\\text{free}}]^2 + b [T_{\\text{free}}] + c = 0$, gdzie współczynniki wynoszą: $a = N K_s$, $b = N + K_s (\\text{SHBG} - T_{\\text{total}})$, $c = -T_{\\text{total}}$. Fizycznie dopuszczalny dodatni pierwiastek wynosi: $[T_{\\text{free}}] = \\frac{-b + \\sqrt{b^2 - 4ac}}{2a}$.',
      },
      {
        title: 'Model generatora pulsów GnRH (delay ODE oscillator)',
        content:
          'Pulsacyjne uwalnianie GnRH przez neurony KNDy (kisspeptyna/neurokinina B/dynorfina) można opisać układem równań różniczkowych z opóźnieniem czasowym $\\tau$. Jeśli $x(t)$ oznacza stężenie GnRH, a $y(t)$ stężenie testosteronu wywierającego ujemne sprzężenie: $\\frac{dx}{dt} = \\frac{V_0}{1 + \\left(\\frac{y(t-\\tau)}{K_i}\\right)^n} - k_x x(t)$, gdzie $\\tau \\approx 60\\text{–}90\\ \\text{min}$ reprezentuje opóźnienie biosyntezy i transportu w osi, $n \\ge 2$ to współczynnik kooperatywności Hilla, a $k_x$ to stała degradacji. Gdy opóźnienie $\\tau$ przekracza próg bifurkacji Hopfa, układ przechodzi ze stanu stacjonarnego w stabilny cykl graniczny (oscylacje relaksacyjne).',
      },
    ],
    table: {
      caption: 'Parametry stałych asocjacji i równowagi w modelu Vermeulena (przy $T = 37^\\circ\\text{C}$)',
      headers: ['Parametr / Stała', 'Wartość liczbowa', 'Jednostka', 'Znaczenie fizjologiczne'],
      rows: [
        ['$K_s$ (SHBG)', '$1{,}0 \\times 10^9$', '$\\text{M}^{-1} = \\text{l/mol}$', 'Bardzo wysokie powinowactwo, wolna dysocjacja'],
        ['$K_a$ (Albumina)', '$3{,}6 \\times 10^4$', '$\\text{M}^{-1} = \\text{l/mol}$', 'Niskie powinowactwo, szybka dysocjacja (frakcja biodostępna)'],
        ['Stężenie albuminy', '$43$ (zakres 35–50)', '$\\text{g/l} \\approx 640\\ \\mu\\text{mol/l}$', 'Wysokie stężenie buforujące frakcję labilną'],
        ['FAI formula', '$(100 \\times T_{\\text{tot}}) / \\text{SHBG}$', 'wartość bezwymiarowa', 'Przybliżenie wiarygodne wyłącznie przy normalnym SHBG'],
        ['Frakcja wolna $T_{\\text{free}}$', '$1{,}5\\text{–}2{,}5\\%$', 'procent $T_{\\text{total}}$', 'Frakcja dyfundująca przez błony komórkowe do AR'],
      ],
    },
    advanced:
      'Wskaźnik FAI (Free Androgen Index) traci korelację z rzeczywistym $T_{\\text{free}}$ u mężczyzn oraz przy skrajnych stężeniach SHBG (< 15 nmol/l lub > 100 nmol/l). W takich sytuacjach wytyczne EAU i Endocrine Society bezwzględnie nakazują obliczenie wolnego testosteronu wg wzoru Vermeulena lub pomiar metodą dializy równowagowej (equilibrium dialysis — złoty standard referencyjny).',
    summary:
      'Model Vermeulena rozwiązuje równowagę prawa działania mas dla T, SHBG i albuminy poprzez równanie kwadratowe. FAI zawodzi przy skrajnym SHBG. Pulsy GnRH wynikają z bifurkacji Hopfa w nieliniowym układzie ODE z opóźnieniem czasowym.',
    sourceIds: ['vermeulen-1999', 'eau-male-hypo-2024'],
    questions: [
      q(
        'Dlaczego w równaniu Vermeulena stężenie wolnej albuminy [Alb_free] można przyjąć jako równe stężeniu całkowitemu [Alb_total]?',
        ['Stężenie albuminy (~640 umol/l) przewyższa stężenie testosteronu (~15–30 nmol/l) ponad 20 000 razy', 'Wiązanie testosteronu wysyca ułamek promila cząsteczek albuminy, więc jej wolna frakcja jest praktycznie niezmienna.'],
        ['Albumina w ogóle nie wiąże cząsteczek testosteronu', 'Albumina wiąże ok. 50% krążącego testosteronu, lecz ma bardzo niskie powinowactwo.'],
        ['Testosteron całkowicie niszczy albuminę w procesie proteolizy', 'Hormony steroidowe nie degradują białek nośnikowych w osoczu.'],
      ),
      q(
        'U 68-letniego otyłego mężczyzny (BMI 36) stężenie SHBG wynosi 12 nmol/l, a T całkowity 9,5 nmol/l (z pozoru niski). Jaki błąd popełnimy, opierając się wyłącznie na T całkowitym bez równania Vermeulena?',
        ['Nadrozpoznanie hipogonadyzmu, podczas gdy stężenie biologicznie czynnego wolnego testosteronu może być prawidłowe', 'Niski SHBG obniża pulę związaną, zachowując często prawidłowy poziom wolnego hormonu.'],
        ['Przeoczenie złośliwego raka jądra o utkaniu potworniaka', 'SHBG nie jest markerem histologicznym guzów zarodkowych.'],
        ['Fałszywe rozpoznanie ostrej dekompensacji cukrzycy typu 1', 'SHBG nie służy do monitorowania kwasicy ketonowej.'],
      ),
      q(
        'Który składnik fizjologiczny tworzy tzw. biodostępny testosteron (bioavailable testosterone)?',
        ['Frakcja wolna oraz testosteron słabo związany z albuminą', 'Wiązanie z albuminą cechuje szybka stała dysocjacji, dzięki czemu hormon łatwo uwalnia się w naczyniach włosowatych tkanek.'],
        ['Wyłącznie testosteron związany kowalencyjnie z SHBG', 'Frakcja związana z SHBG jest silnie unieruchomiona i biologicznie nieaktywna w tkankach.'],
        ['Testosteron wydalony z moczem w postaci glukuronianów', 'Metabolity wydalane z moczem nie biorą udziału w sygnalizacji receptorowej.'],
      ),
      q(
        'Jaki warunek matematyczny w modelu generatora pulsów GnRH jest konieczny do powstania stabilnych samopodtrzymujących się oscylacji (cyklu granicznego)?',
        ['Występowanie nieliniowego ujemnego sprzężenia zwrotnego z wystarczająco dużym opóźnieniem czasowym tau przekraczającym punkt bifurkacji Hopfa', 'Bez opóźnienia i nieliniowości układ z ujemnym sprzężeniem zbiegałby do stabilnego punktu stałego bez oscylacji.'],
        ['Całkowity brak jakichkolwiek opóźnień czasowych w układzie', 'Układ liniowy bez opóźnień dąży do monotonicznego stanu równowagi.'],
        ['Zredukowanie szybkości degradacji hormonu do zera bez ujemnego sprzężenia', 'Prowadziłoby to do nieskończonej kumulacji bez regularnego pulsowania.'],
      ),
      q(
        'Jaki jest wzór na wskaźnik wolnych androgenów (FAI — Free Androgen Index)?',
        ['FAI = (100 * T_total [nmol/l]) / SHBG [nmol/l]', 'Wskaźnik ten szacuje dostępność androgenów, pod warunkiem że stężenie SHBG nie jest skrajnie zaburzone.'],
        ['FAI = T_total * SHBG / 100', 'Taki iloczyn nie odzwierciedla frakcji wolnej.'],
        ['FAI = masa ciała / wzrost do kwadratu', 'To definicja wskaźnika masy ciała BMI, a nie wskaźnika androgenowego.'],
      ),
    ],
  },
  {
    id: 'gonady-chemia-biochemia',
    title: 'Chemia i biochemia steroidogenezy: aromataza i SERM',
    group: 'Chemia i biochemia',
    readTime: '14 min',
    goals: [
      'Zrozumieć 3-etapowy mechanizm aromatyzacji pierścienia A katalizowany przez cytochrom P450 aromatazę (CYP19A1).',
      'Poznać stereochemię redukcji wiązania podwójnego C4=C5 przez 5-alfa-reduktazę (SRD5A2) do DHT.',
      'Opisać mechanizm allosteryczny modulacji receptora estrogenowego (ER) przez SERM i przemieszczenie helisy 12 (H12).',
    ],
    sections: [
      {
        title: 'Mechanizm aromatyzacji CYP19A1 (aromataza)',
        content:
          'Aromataza (kompleks enzymatyczny CYP19A1 i reduktazy NADPH-cytochrom P450) przekształca C19-androgeny (androstendion, testosteron) w C18-estrogeny (estron, 17-beta-estradiol). Reakcja wymaga 3 moli $O_2$ i 3 moli NADPH na mol steroidu: 1) Pierwsza hydroksylacja grupy metylowej C19 do 19-hydroksysteroidu; 2) Druga hydroksylacja do 19-diolu lub 19-oksyderiwatu (aldehydu); 3) Trzecie utlenienie prowadzące do ataku nukleofilowego nadtlenożelaza hemu na węgiel C19, eliminacji całej grupy metylowej C19 w postaci kwasu mrówkowego ($HCOOH$), enolizacji grupy ketonowej przy C3 oraz aromatyzacji pierścienia A do fenolu.',
      },
      {
        title: 'Redukcja przez 5-alfa-reduktazę (SRD5A2)',
        content:
          'Enzym 5-alfa-reduktaza (izoformy SRD5A1 i SRD5A2) katalizuje nieodwracalną redukcję wiązania podwójnego $\\Delta^4$ między węglami C4 i C5 w pierścieniu A testosteronu, tworząc dihydrotestosteron ($5\\alpha$-DHT). Donorem wodoru jest NADPH. Wiązanie wodoru przy węglu C5 zachodzi wyłącznie od strony $\\alpha$ (poniżej płaszczyzny cząsteczki), co wymusza zgięcie konformacyjne typu *trans* między pierścieniami A i B. Powstały DHT wykazuje 2–5 razy większe powinowactwo do receptora androgenowego (AR) i 10-krotnie wolniejszą dysocjację niż testosteron.',
      },
      {
        title: 'SERM: allosteria liganda i translokacja helisy 12',
        content:
          'Selektywne modulatory receptora estrogenowego (SERM — np. tamoksyfen, raloksyfen, klomifen) wiążą się w kieszeni wiążącej ligand (LBD) jądrowego receptora $ER\\alpha$. W odróżnieniu od 17-beta-estradiolu, cząsteczki SERM posiadają sterczący łańcuch boczny (zawierający pierścień aminowy). Łańcuch ten powoduje zawadę steryczną, która wypycha helisę 12 (H12) z jej natywnej pozycji agonisty i zamyka kieszeń wiążącą w konformacji uniemożliwiającej rekrutację koaktywatorów transkrypcji (np. SRC-1). W ten sposób SERM działa jako antagonista w tkance piersiowej, jednocześnie zachowując częściowy agonizm w kościach lub endometrium.',
      },
    ],
    table: {
      caption: 'Porównanie właściwości molekularnych i enzymatycznych steroidogenezy gonadowej',
      headers: ['Enzym / Cząsteczka', 'Kofaktor / Donor', 'Substrat $\\to$ Produkt', 'Kluczowy etap stereochemiczny / rola'],
      rows: [
        ['CYP19A1 (Aromataza)', '$3\\ \\text{NADPH} + 3\\ O_2$', 'Testosteron $\\to$ 17-beta-estradiol', 'Eliminacja C19 jako kwas mrówkowy HCOOH i aromatyzacja pierścienia A'],
        ['SRD5A2 (5-alfa-reduktaza)', '$\\text{NADPH}$', 'Testosteron $\\to$ 5-alfa-dihydrotestosteron (DHT)', 'Stereospecyficzna redukcja $\\Delta^4$ z uwodornieniem od strony $\\alpha$'],
        ['Tamoksyfen (SERM)', 'Brak (antagonista syntetyczny)', 'Wiązanie w kieszeni LBD $ER\\alpha$', 'Wypchnięcie helisy 12 (H12), blokada koaktywatorów w piersi'],
        ['Letrozol (Inhibitor aromatazy)', 'Brak (inhibitor niepeptydowy)', 'Kompetycyjne wiązanie hemu CYP19A1', 'Koordynacja pierścienia triazolowego z atomem żelaza hemu'],
        ['Finasteryd (Inhibitor 5-AR)', '$\\text{NADP}^+$ adduct', 'Inhibitor mechanizmowy SRD5A2', 'Kowalencyjny addukt z enzymem i kofaktorem w kieszeni katalitycznej'],
      ],
    },
    advanced:
      'Inhibitory aromatazy III generacji dzielą się na niesteroidowe (letrozol, anastrozol) oraz steroidowe (eksemestan). Letrozol i anastrozol zawierają pierścienie triazolowe, których wolna para elektronowa azotu tworzy wiązanie koordynacyjne z atomem $Fe^{3+}$ hemu w centrum aktywnym cytochromu CYP19A1, kompetycyjnie blokując wiązanie tlenu. Z kolei eksemestan jest „inhibitorem samobójczym” (suicide inhibitor), który po wstępnym utlenieniu tworzy nieodwracalne wiązanie kowalencyjne z apoproteiną enzymu.',
    summary:
      'Aromataza (CYP19A1) przekształca pierścień A w fenol zużywając 3 O2 i 3 NADPH oraz uwalniając HCOOH. 5-alfa-reduktaza tworzy DHT o konfiguracji trans pierścieni A/B. SERM wypychają helisę 12 LBD receptora ER, uniemożliwiając wiązanie koaktywatorów.',
    sourceIds: ['eau-hypogonadism-2024', 'vermeulen-1999'],
    questions: [
      q(
        'Co dzieje się z grupą metylową C19 podczas reakcji aromatyzacji testosteronu do 17-beta-estradiolu przez CYP19A1?',
        ['Zostaje utleniona i odszczepiona w postaci kwasu mrówkowego (HCOOH)', 'Trzecie utlenienie prowadzi do fragmentacji oksydacyjnej i usunięcia węgla C19 jako mrówczanu.'],
        ['Zostaje przekształcona w wolny gazowy metan i uwolniona do pęcherzyków płucnych', 'Metan nie powstaje w enzymatycznych reakcjach cytochromu P450.'],
        ['Zostaje wbudowana w jądro komórkowe jako część histonu H3', 'Grupa C19 nie podlega transferowi na białka jądrowe.'],
      ),
      q(
        'Dlaczego dihydrotestosteron (5-alfa-DHT) NIE MOŻE ulec aromatyzacji do estrogenów?',
        ['Brak wiązania podwójnego C4=C5 w pierścieniu A uniemożliwia mechanizm enolizacji i aromatyzacji', 'Aromatyzacja wymaga układu dienonowego z wiązaniem nienasyconym $\\Delta^4$; DHT jest steroidem w pełni nasyconym w pierścieniu A.'],
        ['DHT jest cząsteczką zbyt dużą, aby zmieścić się w komórkach organizmu', 'DHT ma niemal identyczną masę cząsteczkową jak testosteron.'],
        ['DHT natychmiast rozpuszcza cząsteczki enzymu aromatazy', 'Hormony nie rozpuszczają białek enzymatycznych.'],
      ),
      q(
        'Jaki jest molekularny mechanizm działania inhibitorów aromatazy niesteroidowych (anastrozol, letrozol)?',
        ['Atom azotu w pierścieniu triazolowym tworzy wiązanie koordynacyjne z atomem żelaza hemu w centrum aktywnym enzymu', 'Blokuje to dostęp tlenu i substratu do katalitycznego centrum hemu CYP19A1.'],
        ['Powodują trwałe rozerwanie nici DNA w genie kodującym albuminę', 'Leki te nie są czynnikami alkilującymi DNA.'],
        ['Wstrzykują potas do wnętrza mitochondriów', 'Inhibitory aromatazy nie wpływają bezpośrednio na mitochondrialny transport potasu.'],
      ),
      q(
        'W jaki sposób selektywne modulatory receptora estrogenowego (SERM, np. tamoksyfen) blokują transkrypcję genów w komórkach raka piersi?',
        ['Ich łańcuch boczny wywołuje zawadę steryczną, przemieszczając helisę 12 (H12) i uniemożliwiając przyłączenie koaktywatorów', 'Wypchnięcie H12 z natywnej pozycji uniemożliwia utworzenie powierzchni wiążącej białka koaktywujące (np. p160/SRC-1).'],
        ['Wytwarzają wolne rodniki tlenowe rozrywające błonę komórkową', 'SERM nie są substancjami utleniającymi błony.'],
        ['Całkowicie eliminują receptory estrogenowe ze wszystkich komórek w 5 sekund', 'Receptory nie ulegają natychmiastowemu zniszczeniu, lecz zmianie konformacji.'],
      ),
      q(
        'Jaka jest różnica w powinowactwie i kinetyce dysocjacji do receptora androgenowego (AR) między DHT a testosteronem?',
        ['DHT wykazuje 2–5 razy wyższe powinowactwo do AR i około 10-krotnie wolniejszą kinetykę dysocjacji', 'Ścisłe dopasowanie konformacyjne zgiętego pierścienia A sprawia, że kompleks DHT-AR jest znacznie stabilniejszy i silniej stymuluje transkrypcję.'],
        ['DHT w ogóle nie łączy się z receptorem androgenowym', 'DHT jest najsilniejszym naturalnym agonistą receptora AR.'],
        ['Testosteron wiąże się 1000 razy silniej niż DHT', 'To DHT jest wielokrotnie silniejszym androgenem tkankowym.'],
      ),
    ],
  },
];
