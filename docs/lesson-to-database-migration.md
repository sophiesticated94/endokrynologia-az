# Migracja modułów i lekcji do PostgreSQL

Ten dokument opisuje **aktualny wzorzec migracji contentu** w repozytorium `sophiesticated94/endokrynologia-az`.

Punktem referencyjnym jest migracja modułu `tarczyca`. Kolejne moduły powinny używać tych samych kontraktów, repozytoriów, walidacji i testów zamiast tworzyć własny równoległy pipeline.

## 1. Docelowa architektura

Treść kursu jest rozdzielona na trzy warstwy:

```text
PostgreSQL
  courses
  modules
  lessons
  lesson_revisions
  content_sources
  evidence_claims
  widget_presets
  content_assets

ObjectStorage
  binary assets

Kod aplikacji
  React components
  renderery
  widget engines
  clinical engines
  Zod schemas
  registries
```

Najważniejsza zasada:

> PostgreSQL przechowuje content i konfigurację. Kod przechowuje zachowanie. ObjectStorage przechowuje binaria.

Do bazy nie trafiają React components, callbacki, funkcje ani wykonywalny JavaScript.

---

## 2. Model danych

Aktualny model Drizzle znajduje się w:

```text
db/postgres/schema.ts
```

Relacyjny szkielet:

```text
courses
  -> modules
    -> lessons
      -> lesson_revisions
```

Dodatkowe tabele:

```text
content_assets
content_sources
evidence_claims
widget_presets
```

### `lessons`

`lessons` przechowuje stabilną tożsamość lekcji:

- `id`
- `module_id`
- `title`
- `subtitle`
- `sort_order`
- `minutes`
- `published_revision_id`

Nie przechowujemy pełnej treści lekcji bezpośrednio w tym rekordzie.

### `lesson_revisions`

Pełny snapshot treści znajduje się w:

```text
lesson_revisions.document JSONB
```

Każda rewizja posiada:

- UUID
- `lesson_id`
- numer wersji
- `content_hash`
- dokument JSONB
- status `draft | review | published | archived`

`lessons.published_revision_id` wskazuje dokładnie rewizję widoczną w runtime.

**Nie wolno zgadywać opublikowanej rewizji przez `ORDER BY version DESC`.**

Jeżeli `published_revision_id` jest puste, `PostgresContentRepository.getLesson()` zwraca `null`.

---

## 3. Format dokumentu lekcji

Canonical runtime schema znajduje się w:

```text
lib/content/schemas/lesson-revision.ts
```

Migracja ma zachowywać obecny model możliwie 1:1.

Dokument zawiera m.in.:

```text
id
moduleId
title
subtitle
group
minutes
goals
sections
table
advanced
summary
sourceIds
questions
experience
  objectives
  diagnostic
  blocks
  activities
  teachBack
  exitTicket
  widgetIds
derivation?
workedExample?
assetIds
review?
```

Każdy dokument pobrany z PostgreSQL musi przejść:

```text
LessonRevisionDocumentSchema.parse(...)
```

Nie używaj:

```ts
row.document as LessonRevisionDocument
```

bez runtime validation.

---

## 4. Nie normalizujemy treści lekcji na dziesiątki tabel

Nie tworzymy osobnych tabel dla:

- paragrafów
- nagłówków
- odpowiedzi quizowych
- bloków V2
- komórek tabel
- inline enhancements

To są naturalnie zagnieżdżone dane dokumentowe i pozostają w JSONB.

Relacyjnie przechowujemy tożsamość, relacje, publikowanie, źródła, presety i metadata assetów.

---

## 5. Source of truth podczas migracji

W okresie przejściowym działają dwa źródła:

```text
StaticContentRepository
PostgresContentRepository
```

oraz:

```text
ComparingContentRepository
```

Runtime wybiera repozytorium przez:

```text
lib/content/content-repository-factory.ts
```

Fabryka obsługuje:

```text
CONTENT_SOURCE=static
CONTENT_SOURCE=database
CONTENT_SOURCE=compare
```

oraz listę modułów:

```text
CONTENT_DB_MODULES=tarczyca,...
```

### Zasady runtime

- moduł poza `CONTENT_DB_MODULES` pozostaje statyczny
- `static` czyta TypeScript
- `database` czyta PostgreSQL
- `compare` czyta oba źródła, wykonuje structured diff i renderuje DB
- invalid DB content nie może zostać ukryty silent fallbackiem

Fabryka jest server-only.

UI nie powinno ręcznie tworzyć `StaticContentRepository` ani `PostgresContentRepository`.

### Ważny wyjątek

Migrator nie używa runtime factory.

Migrator jawnie traktuje:

```text
StaticContentRepository -> source
PostgresContentRepository -> target / verification
```

Dzięki temu ustawienia runtime nie zmieniają zachowania migracji.

---

## 6. Structured parity

Porównanie static vs DB znajduje się w:

```text
lib/content/structured-diff.ts
```

Sprawdzane są m.in.:

- podstawowe pola lekcji
- goals
- sourceIds
- sections
- table
- questions
- answer indexes
- LessonExperienceV2
- objectives
- activities
- blocks
- inlineEnhancements
- widgetIds
- derivation
- workedExample
- assetIds

Nowy moduł jest gotowy do cutover dopiero wtedy, gdy `--verify` przechodzi bez różnic.

Nie zastępuj structured diff prostym `JSON.stringify(a) === JSON.stringify(b)`.

---

## 7. Migrator modułu

Canonical migrator:

```text
scripts/migrate-module.mjs
```

Uruchomienie dla modułu:

```bash
node scripts/migrate-module.mjs --module=<moduleId>
node scripts/migrate-module.mjs --module=<moduleId> --apply
node scripts/migrate-module.mjs --module=<moduleId> --verify
```

Dla Tarczycy istnieją skróty:

```bash
npm run db:seed:tarczyca
npm run db:verify:tarczyca
```

### Pipeline migracji

Dla każdej lekcji:

```text
static Lesson
+ LessonExperienceV2
+ canonical sources
+ referenced assets
+ referenced widget presets
        |
        v
build LessonRevisionDocument
        |
        v
Zod validation
        |
        v
canonical SHA-256 hash
        |
        v
transactional DB upsert
        |
        v
published_revision_id
        |
        v
Postgres read-back
        |
        v
structured parity verification
```

Migrator musi być idempotentny.

Jeżeli `lessonId + contentHash` już istnieje:

```text
nie twórz nowej rewizji
```

---

## 8. Publikowanie i rewizje

Zmiana contentu tworzy nową rewizję zamiast modyfikować istniejący published snapshot.

Model:

```text
v1 published
-> zmiana contentu
-> v2
-> publish
-> lessons.published_revision_id = v2
```

Aktualny migrator wykonuje zapis i ustawienie `published_revision_id` w transakcji.

Dla przyszłego CMS zachowujemy ten sam model:

```text
draft -> review -> published -> archived
```

Nie edytuj historycznej opublikowanej rewizji in-place.

---

## 9. ObjectStorage

Kontrakt znajduje się w:

```text
lib/storage/object-storage.ts
```

Aktualny interfejs obsługuje:

```text
put
get
getStream
stat
exists
delete
list
```

Aktualny provider:

```text
FileSystemObjectStorage
```

w:

```text
lib/storage/filesystem/filesystem-object-storage.ts
```

Factory:

```text
lib/storage/create-object-storage.ts
```

Konfiguracja lokalna:

```text
CONTENT_STORAGE_PROVIDER=filesystem
CONTENT_STORAGE_ROOT=./.data/storage
```

Domena operuje tylko na logical `StorageKey`.

Nigdy nie zapisujemy w lesson JSON:

- absolutnej ścieżki
- filesystem root
- bucket URL
- public URL

Docelowy S3/R2 adapter powinien implementować ten sam `ObjectStorage` contract bez zmian w modelu lekcji.

---

## 10. Security StorageKey

Walidacja znajduje się w:

```text
lib/storage/storage-key.ts
```

Key musi być względny i POSIX-like, np.:

```text
course-assets/endocrinology/tarczyca/fizjologia/hpt-axis.webp
```

Odrzucane są m.in.:

```text
../
absolute paths
Windows drive paths
UNC paths
null bytes
empty segments
.
..
```

`FileSystemObjectStorage` dodatkowo sprawdza containment i symlink escape.

Nie omijaj `normalizeStorageKey()`.

---

## 11. Assets

Metadata znajdują się w `content_assets`.

Binary znajduje się w ObjectStorage.

Lekcja przechowuje `assetIds`.

Serwowanie:

```text
GET /api/assets/[id]
```

Flow:

```text
assetId
-> ContentAssetRepository
-> objectKey
-> ObjectStorage
-> stream
```

Endpoint używa SHA-256 jako ETag oraz immutable cache headers.

### Immutable asset rule

Jeżeli pod tym samym semantic key pojawi się inna treść:

```text
old hash != new hash
```

nie wolno nadpisać starego assetu.

`AssetService` tworzy nowy versioned key i nowy rekord `content_assets`.

Historyczne lesson revisions mogą nadal wskazywać starszy asset.

---

## 12. Wykrywanie realnych assetów przy migracji

Migrator skanuje treść dokumentu lekcji pod kątem istniejących referencji do obrazów, m.in.:

```text
/assets/...
/images/...
/public/...
*.png
*.webp
*.jpg
*.jpeg
*.svg
*.avif
*.gif
```

Dla każdej referencji:

```text
resolve real file
-> fail if missing
-> buildCourseAssetKey(...)
-> AssetService.ingestAsset(...)
-> add assetId to lesson document
```

Nie skanuj całego repo i nie importuj przypadkowych grafik.

Jeśli lekcja nie zawiera assetu, poprawnym wynikiem jest `0 assets`.

Fixture binary w contract tests nie jest dowodem migracji contentu.

---

## 13. Widget presets

Canonical registry:

```text
lib/content/preset-registry.ts
```

Registry agreguje presety domenowe, aktualnie m.in.:

```text
lib/endocrinology/presets/endocrine-presets.ts
lib/psychiatry/presets/...
```

Preset ma postać logicznie zgodną z:

```ts
{
  id,
  widgetType,
  schemaVersion,
  moduleId,
  lessonId?,
  title,
  initialState,
  evidenceIds?
}
```

Migrator nie importuje wszystkich presetów świata.

Dla każdej lekcji:

```text
collect referenced presetIds
-> resolve through preset registry
-> validate WidgetPresetDefinitionSchema
-> insert/update widget_presets
```

Brakujący `presetId` jest błędem migracji.

Nie traktuj default state widgetu jako named lesson preset.

---

## 14. Dodawanie presetów dla nowego modułu

Nowy moduł powinien trzymać presety blisko domeny, np.:

```text
lib/endocrinology/presets/<module>-presets.ts
```

lub odpowiedni katalog domenowy.

Następnie należy podłączyć je do:

```text
lib/content/preset-registry.ts
```

Zasady:

- stabilne ID
- brak duplicate IDs
- jawny `widgetType`
- `schemaVersion`
- `moduleId`
- tylko serializowalny `initialState`
- żadnych funkcji lub React nodes

---

## 15. Źródła i evidence

Canonical source IDs są zachowywane podczas migracji.

Migrator zbiera `sourceIds` używane przez lekcje i upsertuje odpowiednie rekordy `content_sources`.

Lekcja przechowuje wyłącznie referencje.

Nie kopiuj DOI, URL i metadanych źródła do każdego lesson document, jeśli istnieją w registry źródeł.

`evidence_claims` pozostaje osobną warstwą claim-level evidence.

---

## 16. PostgreSQL local development

Local DB:

```text
postgres:16-alpine
```

Konfiguracja:

```text
docker-compose.yml
```

Uruchomienie:

```bash
npm run db:up
npm run db:migrate
```

Wyłączenie:

```bash
npm run db:down
```

Docker Compose obsługuje:

```text
POSTGRES_DB
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_PORT
```

Produkcyjny runtime wymaga jawnego `DATABASE_URL`.

Nie polegaj w produkcji na lokalnym domyślnym connection stringu.

---

## 17. Testy

### Zwykłe testy

```bash
npm test
```

Nie powinny wymagać działającego PostgreSQL.

Obejmują m.in. ObjectStorage contract/security i schema/content validation.

### Integration tests

```bash
npm run test:integration
```

Wymagają PostgreSQL i mają fail-fast, jeśli baza jest niedostępna.

### Docker convenience wrapper

```bash
npm run test:integration:docker
```

Uruchamia kontener PostgreSQL, czeka na readiness i wykonuje integration suite.

Integration test dla Tarczycy sprawdza obecnie:

- migrations
- migrację wszystkich lekcji
- idempotencję
- structured parity
- publish invariants
- immutable assets
- preset registry
- runtime repository factory

Dla każdego kolejnego modułu wymagany jest analogiczny test integracyjny albo rozszerzenie istniejącego testu parametrycznego.

---

## 18. Procedura migracji kolejnego modułu

Przykład dla `<moduleId>`.

### Krok 1. Audit

Sprawdź:

```text
lesson IDs
module ID
LessonExperienceV2
sourceIds
asset references
inline enhancement presetIds
widgetIds
```

Nie zmieniaj IDs podczas migracji.

### Krok 2. Presety

Jeżeli moduł używa named presets:

1. dodaj domain-specific registry,
2. podłącz go do `preset-registry.ts`,
3. sprawdź brak duplicate IDs.

### Krok 3. Assets

Nie twórz sztucznych assetów.

Upewnij się, że wszystkie referencje używane przez lekcje wskazują na realne pliki.

### Krok 4. Dry run

```bash
node scripts/migrate-module.mjs --module=<moduleId>
```

Dry run powinien:

- znaleźć lekcje
- znaleźć sources
- wykryć broken asset references
- wykryć broken preset references
- przejść Zod validation
- nie zapisywać contentu do DB

### Krok 5. Apply

```bash
node scripts/migrate-module.mjs --module=<moduleId> --apply
```

### Krok 6. Verify

```bash
node scripts/migrate-module.mjs --module=<moduleId> --verify
```

Wymagane:

```text
100% structured parity
```

### Krok 7. Integration test

Dodaj test analogiczny do:

```text
tests/integration/postgres-tarczyca.test.mjs
```

Minimum:

- liczba lekcji
- pierwsza migracja tworzy rewizje
- druga migracja tworzy 0 nowych rewizji
- verify przechodzi
- unpublished lesson nie fallbackuje do draftu
- presets resolve
- real assets resolve, jeśli moduł je posiada

### Krok 8. Compare mode

W konfiguracji runtime:

```text
CONTENT_DB_MODULES=<moduleId>
CONTENT_SOURCE=compare
```

Przejdź przez reprezentatywne lekcje i sprawdź logi structured diff.

### Krok 9. Database mode

Po parity:

```text
CONTENT_SOURCE=database
CONTENT_DB_MODULES=<moduleId>
```

Dla zmigrowanego modułu brak DB contentu jest błędem, nie powodem do silent static fallbacku.

### Krok 10. Dopiero potem kolejny moduł

Nie rób big-bang cutover całego kursu.

Migracja ma być moduł po module.

---

## 19. Co należy dostosować przy nowym module

`migrate-module.mjs` jest obecnie zbudowany na źródłach Endokrynologii z `lib/course.ts` i `modulesList`.

Przy migracji modułu z innej domeny, np. Psychiatrii, nie kopiuj całego skryptu.

Wyodrębnij mały adapter źródła modułu, który dostarczy migratorowi:

```ts
{
  course,
  module,
  lessons,
  lessonExperiences,
  sources
}
```

Migrator powinien zachować wspólną logikę:

```text
validation
hashing
assets
presets
revision publishing
parity
```

Różnić ma się jedynie adapter danych wejściowych.

To jest preferowany następny refactor, gdy migrowana będzie pierwsza domena poza aktualnym `lib/course.ts`.

---

## 20. Czego NIE robić

Nie:

- twórz osobnego migratora per moduł przez copy/paste
- zmieniaj lesson IDs
- zapisuj React components w DB
- zapisuj funkcje w JSONB
- zapisuj binary jako base64 w lesson document
- zapisuj absolute filesystem paths
- nadpisuj immutable assets
- wybieraj latest revision zamiast `published_revision_id`
- ignoruj Zod validation
- silently fallbackuj do static w `database` mode
- importuj cały katalog `public/` bez referencji z contentu
- generuj sztucznych presetów podczas migracji
- buduj nową warstwę CMS przy każdej migracji modułu

---

## 21. Definition of Done modułu

Moduł jest zmigrowany dopiero, gdy:

- wszystkie lesson IDs zostały zachowane
- wszystkie lessons mają poprawny published revision
- wszystkie documents przechodzą Zod
- migracja jest idempotentna
- `--verify` daje 100% structured parity
- referenced presets istnieją i zostały zwalidowane
- referenced assets istnieją i są w ObjectStorage
- assety są immutable
- sources resolve
- integration tests przechodzą
- compare mode nie wykazuje różnic
- database mode działa bez static fallbacku dla tego modułu
- `npm test` przechodzi
- `npm run test:integration` przechodzi z PostgreSQL
- production build przechodzi

---

## 22. Kolejność dla następnych modułów

Preferowana kolejność pracy:

```text
1. audit source module
2. source adapter, jeśli potrzebny
3. preset registry integration
4. asset reference audit
5. dry-run
6. apply
7. verify
8. integration test
9. compare runtime
10. database runtime
11. kolejny moduł
```

Nie rozwijaj przy okazji nowego frameworka do migracji, jeśli obecne porty wystarczają.

Celem jest powtarzalny pipeline, nie doroczny festiwal abstrakcji.
