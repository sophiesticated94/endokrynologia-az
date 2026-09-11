# Endokrynologia A–Z 🩺

> Interaktywna platforma edukacyjna z zakresu endokrynologii dla studentów medycyny i lekarzy. Zawiera dwa kompletne, certyfikowane moduły: **Moduł 01: Tarczyca** oraz **Moduł 02: Przysadka i podwzgórze** z dwoma poziomami zaawansowania (student vs lekarz), dwoma interaktywnymi symulatorami fizjologicznymi (oś HPT oraz 3-trybowa Konsola Przysadkowa), 13 wektorowymi schematami medycznymi, 24 przypadkami klinicznymi, bankiem 120 pytań i 120 fiszek z algorytmem powtórek przestrzennych (SRS) oraz synchronizacją postępu przez Supabase.

---

## ✨ Główne funkcje i program edukacyjny

### 1. Moduł 01: Tarczyca (12 lekcji · 60 pytań · 12 przypadków)
- **12 ustrukturyzowanych lekcji**:
  1. *Jak działa tarczyca?* (Fizjologia osi TRH–TSH–T4/T3, synteza, TBG)
  2. *Czytaj wyniki ze zrozumieniem* (Diagnostyka laboratoryjna, pary TSH/FT4, pułapki interferencji)
  3. *Kiedy tarczyca zwalnia* (Niedoczynność pierwotna vs subkliniczna, zasady i interakcje lewotyroksyny)
  4. *Zrozumieć Hashimoto* (Autoimmunizacja, anty-TPO, unikanie niepotrzebnej suplementacji jodem)
  5. *Kiedy hormonów jest za dużo* (Nadczynność vs tyreotoksykoza z destrukcji, beta-blokery)
  6. *Graves-Basedow i oczy* (Autoprzeciwciała TRAb, tiamazol, orbitopatia EUGOGO)
  7. *Zapalenie ma różne oblicza* (Bolesne podostre de Quervaina, wysokie OB/CRP, ciche i ropne)
  8. *Guzek nie znaczy nowotwór* (USG szyi, skala EU-TIRADS, progi biopsji cienkoigłowej BACC ETA 2023)
  9. *Nowotwory tarczycy* (Raki pęcherzykowe, rdzeniasty z komórek C / kalcytonina, anaplastyczny, MEN2)
  10. *Tarczyca w ciąży* (hCG a TSH, wzrost zapotrzebowania na LT4, dobór tyreostatyku PTU)
  11. *Leki, jod i tarczyca* (Amiodaron AIT typ 1 vs typ 2, kontrast jodowy, lit)
  12. *Gdy liczy się czas* (Przełom tarczycowy, śpiączka hipometaboliczna, osłona hydrokortyzonem)

### 2. Moduł 02: Przysadka i podwzgórze (12 lekcji · 60 pytań · 12 przypadków)
- **12 ustrukturyzowanych lekcji**:
  1. *Jak rządzona jest orkiestra?* (Anatomia siodła tureckiego, płaty, krążenie wrotne, hormony tropowe)
  2. *Rozszyfruj przysadkę* (Diagnostyka wieloosiowa, testy dynamiczne ITT, pułapka centralnego TSH)
  3. *Mlekotok i brak miesiączki* (Prolactinoma, kabergolina, wykluczenie makroprolaktyny i efektu hook)
  4. *Gdy rosną dłonie i rysy twarzy* (Akromegalia, przesiew IGF-1, brak supresji GH w teście OGTT 75g, operacja TSS)
  5. *Tajemnice hiperkortyzolemii* (Choroba Cushinga, test 1 mg DEX, odróżnienie ektopowego ACTH i BIPSS)
  6. *Guz, który nie krzyczy hormonami* (Makrogruczolaki nieczynne NFPA, chiasma, efekt odszypułowania)
  7. *Gdy orkiestra cichnie* (Panhipopituitaryzm, zespół Sheehana, reguła: hydrokortyzon PRZED lewotyroksyną!)
  8. *Rzeka bez tamy* (Moczówka prosta centralna vs nerkowa, test odwodnieniowy, odpowiedź na dDAVP)
  9. *Pułapka fałszywego rozcieńczenia* (Zespół SIADH, euwolemia, zasada bezpiecznej korekty sodu max 8–10 mmol/l/24h)
  10. *Autoimmunizacja w siodle* (Hipofizyt limfocytowy, zapalenia po immunoterapii onkologicznej anty-CTLA-4/PD-1)
  11. *Dramat w siodle tureckim* (Udar przysadki / apopleksja, nagły ból głowy, ptoza n. III, wlew hydrokortyzonu)
  12. *Chirurgia i opieka okołooperacyjna* (Dostęp przezklinowy TSS, 3-fazowa odpowiedź moczówkowa DI-SIADH-DI)

### 3. Dwa interaktywne symulatory fizjologiczne (`/simulator`)
- **Symulator Osi HPT**: Model sprzężenia zwrotnego $\log_{10}\text{TSH} \sim -\text{FT4}$, suwaki wydolności, TRAb, dawek LT4 i tiamazolu oraz 6 presetów klinicznych z modalem legendy.
- **Konsola Przysadkowo-Podwzgórzowa**: 3 zaawansowane tryby:
  - *Tryb 1 (Osie i gospodarka wodna)*: PRL, GH/IGF-1, ACTH/kortyzol, AVP, sód w surowicy, osmolalność osocza i moczu, dobowa diureza.
  - *Tryb 2 (Testy dynamiczne)*: OGTT 75 g glukozy dla supresji GH, nocny test hamowania 1 mg deksametazonu, test odwodnieniowo-wazopresynowy z dDAVP, leczenie kabergoliną.
  - *Tryb 3 (Siodło, chiasma i pole widzenia)*: Interaktywna perymetria obojga oczu modelująca ubytek skroniowy (niedowidzenie kwadrantowe i całkowita hemianopsia bitemporalis) oraz naciekanie zatoki jamistej w skali Knospa z deficytem nerwów czaszkowych III, IV i VI.

### 4. 13 wektorowych schematów medycznych (SVG)
- Schemat osi HPT ze sprzężeniem zwrotnym
- Matryca diagnostyczna TSH vs FT4
- Krzywa zapalenia de Quervaina
- Atlas ultrasonograficzny EU-TIRADS 1–5
- Przekrój oczodołu w orbitopatii EUGOGO
- Krzywa hormonalna w ciąży (hCG vs TSH)
- Drzewo histopatologiczne raka tarczycy
- Schemat anatomiczny siodła tureckiego, szypuły i zatok jamistych
- Mechanizm niedowidzenia połowiczego dwuskroniowego (skrzyżowanie włókien nosowych siatkówek)
- Krzywe supresji GH w teście OGTT (zdrowy vs akromegalia)
- Algorytm diagnostyczny zespołu Cushinga
- Matryca różnicowa gospodarki wodnej (Moczówka centralna vs nerkowa vs polidypsja vs SIADH)
- Patofizjologia zespołu Sheehana (rozrost ciążowy $\to$ krwotok $\to$ puste siodło)

### 5. Przypadki kliniczne, fiszki i egzamin
- **24 czterostopniowe przypadki kliniczne**: 12 z tarczycy + 12 z przysadki z filtrowaniem wg działu i poziomu zaawansowania.
- **Bank 120 fiszek** z filtrowaniem wg modułów i algorytmem SRS.
- **Elastyczny egzamin końcowy**: losowanie 30 pytań z całego kursu (120 pytań) lub wybranego modułu (Tarczyca / Przysadka).
- **Searchable Słowniczek medyczny (`/glossary`)**: 47+ zweryfikowanych haseł z normami i znaczeniem klinicznym.

### 6. Architektura danych i synchronizacja
- Pełna praca w trybie gościa offline (bez konieczności logowania).
- Opcjonalna chmurowa synchronizacja konta przez Supabase.
- Bezpieczny model zdarzeniowy (append-only Event Sourcing) z Row Level Security (RLS).
- Bezpieczny endpoint konfiguracyjny chroniący przed ujawnieniem klucza `service_role`.

---

## 🚀 Uruchomienie lokalne

### Wymagania
- Node.js `>=20.0.0` (zalecane `>=22.x`)
- npm

### Instalacja i start
```bash
# Sklonuj repozytorium
git clone https://github.com/sophiesticated94/endokrynologia-az.git
cd endokrynologia-az

# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev
```

Aplikacja uruchomi się domyślnie pod adresem **`http://localhost:5173/`**.

---

## 🧪 Testy i weryfikacja

Wszystkie moduły domeny, algorytm SRS, grading, projekcja zdarzeń oraz model fizjologiczny osi HPT są pokryte testami:

```bash
# Uruchomienie testów jednostkowych
node --test tests/learning.test.mjs

# Weryfikacja statycznego typowania TypeScript
node node_modules/typescript/bin/tsc --noEmit
```

---

## ☁️ Konfiguracja z Supabase (opcjonalnie)

Aplikacja domyślnie działa lokalnie w trybie gościa. Aby włączyć rejestrację użytkowników i synchronizację postępu między urządzeniami:

1. Załóż darmowy projekt na [supabase.com](https://supabase.com/).
2. Wklej i wykonaj migrację SQL z pliku [`supabase/migrations/202609110001_learning.sql`](supabase/migrations/202609110001_learning.sql) w panelu Supabase SQL Editor.
3. W sekcji **Authentication -> URL Configuration** dodaj adres URL aplikacji do *Redirect URLs*.
4. Utwórz plik `.env` w katalogu głównym projektu na podstawie [`.env.example`](.env.example):
   ```env
   SUPABASE_URL=https://twoj-projekt.supabase.co
   SUPABASE_ANON_KEY=twoj-publiczny-klucz-anon
   ```
5. Zrestartuj aplikację.

---

## 📄 Licencja

Projekt o charakterze edukacyjnym stworzony z myślą o studentach medycyny, rezydentach i lekarzach.
Treści oparte są na aktualnych wytycznych naukowych (ETA, PTE, EUGOGO, Endotext).
