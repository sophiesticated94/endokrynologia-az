Pracujesz na AKTUALNYM HEAD repozytorium `sophiesticated94/endokrynologia-az`.

Chcemy stworzyć uniwersalną warstwę storage dla wszystkich binarnych plików aplikacji.

Pierwsza implementacja:
LOCAL FILESYSTEM z konfigurowalnym root directory.

Architektura musi umożliwiać późniejsze przełączenie praktycznie 1:1 na:
- Amazon S3
- Cloudflare R2
- MinIO
- dowolny S3-compatible object storage

bez zmieniania logiki domenowej, lekcji ani asset repository.

==================================================
1. PODZIAŁ ODPOWIEDZIALNOŚCI
==================================================

PostgreSQL przechowuje:

- asset ID
- logical object key
- mime type
- hash
- rozmiar
- dimensions
- alt text
- caption
- attribution
- license
- timestamps
- metadata

Storage przechowuje:

- binary content

NIE przechowuj:
- absolutnego path filesystemu w lesson JSON
- public URL w lesson JSON
- S3 bucket URL w lesson JSON
- base64 w PostgreSQL

Lekcja referencjonuje wyłącznie:

assetId

==================================================
2. UNIWERSALNY INTERFEJS STORAGE
==================================================

Dodaj domenowy interfejs, np.:

`lib/storage/object-storage.ts`

Interfejs nie może zawierać:
- Node-specific absolute paths
- AWS SDK types
- Cloudflare R2 types

Preferowany kontrakt:

interface ObjectStorage {
  put(
    key: StorageKey,
    content: BinarySource,
    options?: PutObjectOptions
  ): Promise<StoredObject>;

  get(key: StorageKey): Promise<StoredObjectContent | null>;

  getStream(key: StorageKey): Promise<ReadableStream<Uint8Array> | null>;

  stat(key: StorageKey): Promise<StoredObjectMetadata | null>;

  exists(key: StorageKey): Promise<boolean>;

  delete(key: StorageKey): Promise<void>;

  move?(source: StorageKey, destination: StorageKey): Promise<void>;

  copy?(source: StorageKey, destination: StorageKey): Promise<void>;

  list(prefix?: StorageKey): Promise<StoredObjectMetadata[]>;
}

Nie komplikuj interface, jeśli metoda nie jest obecnie potrzebna.

Minimalne wymagane:
put
get/getStream
stat
exists
delete

==================================================
3. STORAGE KEY
==================================================

Aplikacja operuje wyłącznie na LOGICAL KEY.

Przykłady:

courses/psychiatry/psych-organiczne/delirium/attention-fluctuation.webp

courses/endocrinology/tarczyca/hpt-axis.webp

evidence/psychiatry/pet/meyer-2004-figure.webp

imports/2026-09-12/source-image.png

NIGDY:

C:\data\course-storage\...
/var/lib/course-storage/...

To są implementation details filesystem adaptera.

==================================================
4. FILESYSTEM BACKEND
==================================================

Dodaj:

`FileSystemObjectStorage`

constructor:

new FileSystemObjectStorage({
  rootPath
})

Konfiguracja:

CONTENT_STORAGE_PROVIDER=filesystem
CONTENT_STORAGE_ROOT=/srv/endokrynologia/storage

Dla Windows powinno również działać np.:

CONTENT_STORAGE_ROOT=D:\course-storage

Adapter mapuje:

logical key:
courses/psychiatry/image.webp

do:

<rootPath>/courses/psychiatry/image.webp

==================================================
5. PATH SECURITY — KRYTYCZNE
==================================================

Każdy key musi być normalizowany.

NIGDY nie pozwalaj na path traversal:

../
..\
absolute paths
drive letters
UNC paths
null bytes

Forbidden:

../../etc/passwd

C:\Windows\system.ini

\\server\share

/foo/bar

StorageKey powinien być względny i POSIX-like:

courses/psychiatry/foo.webp

Nawet na Windows logical keys używają `/`.

Po resolve:

resolved absolute path MUST remain inside rootPath.

Dodaj testy path traversal.

==================================================
6. STORAGE KEY VALIDATION
==================================================

Dodaj helper:

normalizeStorageKey()

Reguły:

- trim
- convert `\` → `/`
- remove duplicate `/`
- no leading `/`
- no `..`
- no `.`
- no empty path segments
- reasonable max length
- UTF-8 supported, ale prefer slug-safe paths
- key cannot resolve outside root

Preferuj branded type:

type StorageKey = string & { readonly __brand: 'StorageKey' };

StorageKey powinien powstawać tylko przez validator.

==================================================
7. ATOMIC WRITE
==================================================

Filesystem `put()` nie powinien pisać bezpośrednio do final file.

Zrób:

write:
<filename>.tmp-<random>

fsync / close

rename atomically:
temp → final

Dzięki temu crash podczas uploadu nie zostawi częściowego pliku pod finalnym key.

Jeśli overwrite=false:
fail, jeśli obiekt istnieje.

==================================================
8. CONTENT HASH
==================================================

Podczas uploadu oblicz SHA-256.

StoredObject powinien zwracać:

{
  key,
  size,
  sha256,
  mimeType,
  createdAt?
}

Postgres zapisuje sha256.

Można dzięki temu:
- deduplikować pliki
- wykrywać corruption
- ustawiać ETag
- robić migration verification.

==================================================
9. CONTENT-ADDRESSED OPTION
==================================================

Nie wymagaj content-addressed storage wszędzie, ale przygotuj helper:

buildContentAddressedKey()

np.:

objects/sha256/ab/cd/<fullhash>.webp

oraz semantic aliases mogą pozostać w DB.

Na pierwszym etapie do course assets można używać czytelnych keys:

courses/psychiatry/...

Nie przebudowuj systemu bez potrzeby.

==================================================
10. MIME TYPE
==================================================

Nie ufaj wyłącznie extension.

Importer powinien:

- znać deklarowany mime type
- rozsądnie walidować extension vs mime
- odrzucać nieobsługiwane typy

Dla course images minimum:
image/png
image/jpeg
image/webp
image/avif
image/svg+xml

SVG traktuj ostrożnie:
jeśli SVG pochodzi od użytkownika, wymaga sanitizacji.

==================================================
11. STREAMING
==================================================

Nie czytaj wszystkich dużych plików do Buffer bez potrzeby.

Storage powinien umożliwiać streaming.

Filesystem:
fs.createReadStream / web stream adapter

S3:
GetObject Body stream

HTTP asset endpoint:
storage.getStream(key)
→ response stream

Dzięki temu ten sam endpoint działa niezależnie od providera.

==================================================
12. RANGE REQUESTS
==================================================

Nie musisz implementować tego w pierwszym PR dla samych obrazów.

Ale API zaprojektuj tak, żeby później można było dodać:

getRange(key, start, end)

dla:
- video
- audio
- PDF

Bez zmiany całej abstrakcji.

==================================================
13. ASSET REPOSITORY ≠ STORAGE
==================================================

Rozdziel dwie warstwy:

ObjectStorage
→ fizyczny plik

ContentAssetRepository
→ rekord w PostgreSQL

Przykład:

ContentAssetRepository.get(assetId)

zwraca:

{
  id,
  objectKey,
  mimeType,
  sha256,
  byteSize,
  width,
  height,
  altText,
  ...
}

Następnie:

ObjectStorage.get(objectKey)

Nie mieszaj SQL z filesystemem w jednym service.

==================================================
14. POSTGRES SCHEMA
==================================================

Tabela:

content_assets

id uuid primary key

object_key text NOT NULL UNIQUE

sha256 text NOT NULL

mime_type text NOT NULL

byte_size bigint NOT NULL

width int NULL
height int NULL

alt_text text NULL
caption text NULL
attribution text NULL
license text NULL

original_filename text NULL

created_at timestamptz NOT NULL
updated_at timestamptz NOT NULL

metadata jsonb NOT NULL DEFAULT '{}'

Opcjonalnie:

UNIQUE(sha256)

Tylko jeśli faktycznie chcemy globalną deduplikację identycznych plików.

==================================================
15. NIE ZAPISUJ PROVIDERA W KAŻDYM ASSECIE
==================================================

Nie rób:

provider = filesystem/s3

na każdym rekordzie, jeśli cała aplikacja korzysta z jednego aktywnego storage.

Provider jest deployment configuration.

DB zna:

object_key

A konfiguracja runtime mówi:

object_key
→ filesystem

lub:

object_key
→ S3.

To właśnie umożliwia migrację bez przepisywania rekordów DB.

==================================================
16. STORAGE FACTORY
==================================================

Dodaj:

createObjectStorage()

Konfiguracja:

CONTENT_STORAGE_PROVIDER=filesystem

dla local:

CONTENT_STORAGE_ROOT=/data/endokrynologia

Docelowo:

CONTENT_STORAGE_PROVIDER=s3

S3_BUCKET=...
S3_REGION=...
S3_ENDPOINT=...
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
S3_PREFIX=...

Factory zwraca:

ObjectStorage

Reszta aplikacji nie zna providera.

==================================================
17. S3 SEMANTICS OD POCZĄTKU
==================================================

Projektując filesystem implementation pamiętaj:

S3:
- nie ma prawdziwych katalogów
- wszystko jest key/prefix
- rename nie istnieje atomowo
- move = copy + delete
- list działa po prefix
- directory creation nie istnieje

Dlatego domenowy interface nie powinien mieć:

createDirectory()
directoryExists()

Katalog jest tylko efektem key prefix.

Filesystem adapter sam:
mkdir({ recursive: true })

przy `put()`.

==================================================
18. ROOT / PREFIX
==================================================

Filesystem:

rootPath:
/srv/course-storage

logical key:
courses/psychiatry/a.webp

physical:
 /srv/course-storage/courses/psychiatry/a.webp


S3 odpowiednik:

bucket:
medical-course

prefix:
production/

logical key:
courses/psychiatry/a.webp

S3 key:
production/courses/psychiatry/a.webp

RootPath i S3 prefix pełnią tę samą logiczną rolę:
namespace root.

==================================================
19. PUBLIC URL NIE JEST CZĘŚCIĄ CORE INTERFACE
==================================================

Nie zakładaj, że storage object ma public URL.

Course assets mogą być serwowane przez aplikację:

GET /api/assets/:assetId

Flow:

assetId
→ ContentAssetRepository
→ objectKey
→ ObjectStorage
→ stream

To działa identycznie dla:
filesystem
S3 private bucket
R2 private bucket.

Opcjonalny interface capability później:

SignedUrlStorage

getSignedReadUrl(key, ttl)

ale NIE wrzucaj tego do obowiązkowego core interface.

==================================================
20. CACHE HEADERS
==================================================

Asset endpoint wykorzystuje sha256 jako ETag.

Response:

ETag: "<sha256>"

Cache-Control dla immutable assets:

public, max-age=31536000, immutable

Jeśli asset zmienia treść:
twórz nowy asset ID/key.

Nie nadpisuj istniejącej semantycznie grafiki pod tym samym immutable asset URL.

==================================================
21. FILESYSTEM URL NIE MOŻE WYCIEKAĆ
==================================================

Nigdy nie zwracaj klientowi:

/srv/course-storage/...

Browser powinien widzieć:

/api/assets/<uuid>

lub docelowy CDN URL.

Root directory jest sekretem infrastruktury, nie częścią modelu domenowego.

==================================================
22. MIGRACJA FILESYSTEM → S3
==================================================

Dodaj później lub od razu script:

scripts/migrate-storage.ts

Flow:

source storage
→ target storage

Dla każdego content_assets:

source.stat(objectKey)
source.getStream(objectKey)
target.put(objectKey, stream)

następnie verify:

size
sha256

Ponieważ object_key pozostaje ten sam:
ZERO zmian lesson records
ZERO zmian content_assets
ZERO zmian lesson JSON.

Po migracji:

CONTENT_STORAGE_PROVIDER=s3

i aplikacja działa dalej.

==================================================
23. STORAGE COPY VERIFY
==================================================

Migrator nie może uznać uploadu za sukces tylko dlatego, że `put()` nie rzucił wyjątku.

Po upload:
target.stat()

porównaj:
- size
- sha256 jeśli provider metadata wspiera hash
albo odczytaj i policz checksum

Raport:
copied
skipped
failed
hashMismatch.

==================================================
24. FILESYSTEM BACKUP
==================================================

Filesystem root powinien być samowystarczalny.

Backup:

PostgreSQL dump
+
storage root directory

powinien pozwolić odtworzyć całą treść.

Nie trzymaj plików poza rootem.

==================================================
25. TEMP DIRECTORY
==================================================

Temporary uploads:

<root>/.tmp/

lub system tmp.

Nie traktuj `.tmp` jako canonical objects.

Cleanup orphaned temp files starszych niż określony TTL.

==================================================
26. DELETE SEMANTICS
==================================================

Nie usuwaj od razu fizycznego pliku, gdy jedna lesson revision przestaje go używać.

Published history może nadal referencjonować asset.

Zanim usuniesz asset:
sprawdź references ze wszystkich zachowanych revisions.

Najbezpieczniej:

mark asset deleted/orphaned
→ garbage collector
→ usuń dopiero po grace period.

==================================================
27. REFERENCE COUNTING
==================================================

Nie utrzymuj ręcznego mutable reference counter, jeśli można go policzyć.

GC może znaleźć:

content_assets
LEFT JOIN / extracted revision references

i oznaczyć orphan assets.

Nie pozwól przypadkowo usunąć obrazka używanego przez published historical revision.

==================================================
28. STORAGE STRUCTURE
==================================================

Preferowana struktura logical keys:

course-assets/
  endocrinology/
    <module>/
      <lesson>/
        ...

  psychiatry/
    <module>/
      <lesson>/
        ...

shared/
  diagrams/
  evidence/
  branding/

imports/
  ...

exports/
  ...

Nie koduj tej struktury na sztywno w storage adapter.

To policy wyższej warstwy.

==================================================
29. STORAGE POLICY SERVICE
==================================================

Możesz dodać mały helper:

CourseAssetKeyBuilder

np.:

courseAssetKey({
  courseId,
  moduleId,
  lessonId,
  filename
})

→

course-assets/psychiatry/psych-organiczne/delirium/foo.webp

Dzięki temu keys są spójne.

Ale storage adapter dostaje już gotowy key.

==================================================
30. LOCAL DEV
==================================================

Default development configuration:

CONTENT_STORAGE_PROVIDER=filesystem
CONTENT_STORAGE_ROOT=./.data/storage

Dodaj:
.data/
do .gitignore.

Do repo nie commitujemy binarnych runtime assetów po migracji, chyba że konkretny asset jest świadomie częścią source fixtures.

==================================================
31. DEPLOYMENT WARNING
==================================================

Aktualny projekt korzysta z Cloudflare/Wrangler.

Filesystem storage NIE może być traktowany jako trwały production storage na Cloudflare Workers.

W deploymentach Workers:

ObjectStorage implementation:
S3ObjectStorage / R2ObjectStorage

W local/self-hosted Node:
FileSystemObjectStorage.

Nie implementuj kodu zakładającego, że cwd filesystem jest trwały na każdym deploymencie.

==================================================
32. TESTY KONTRAKTOWE
==================================================

Najważniejsza rzecz dla łatwej podmiany backendu:

napisz jeden wspólny test suite:

runObjectStorageContractTests(factory)

Testy:

put/get roundtrip
binary integrity
unicode key
nested prefix
stat
exists
overwrite behavior
delete
missing object
list prefix
path normalization
zero-byte file
large streamed file

FileSystemObjectStorage:
musi przejść cały suite.

W przyszłości:
S3ObjectStorage
musi przejść TEN SAM suite.

To jest prawdziwa gwarancja wymienności adapterów.

==================================================
33. TESTY SECURITY
==================================================

Odrzuć:

../secret
foo/../../secret
/foo
C:\secret
..\secret
foo\..\secret
null byte

Sprawdź symlink escape.

BARDZO WAŻNE:

filesystem adapter nie może pozwalać na symlink wewnątrz root,
który prowadzi poza root.

Albo:
- prohibit/fail on symlink traversal

albo:
- resolve realpath parent/final path i potwierdź containment.

==================================================
34. CONCURRENCY
==================================================

Dwa równoległe put() tego samego key nie mogą zostawić corrupted file.

Użyj:
unique temp files
+
atomic rename.

Dla immutable assetów preferuj:
overwrite=false.

==================================================
35. ERROR MODEL
==================================================

Dodaj provider-independent errors:

StorageNotFoundError
StorageAlreadyExistsError
StorageInvalidKeyError
StorageUnavailableError
StorageIntegrityError

Nie pozwalaj, żeby wyższe warstwy zależały od:
ENOENT
AWS NoSuchKey
S3ServiceException.

Adapter mapuje native errors → domain errors.

==================================================
36. OBSERVABILITY
==================================================

Loguj:

provider
operation
key
size
duration
success/failure

NIE loguj:
binary content
credentials
absolute root path przy każdym request.

==================================================
37. FINALNA STRUKTURA
==================================================

Preferowana:

lib/storage/
  object-storage.ts
  storage-key.ts
  storage-errors.ts
  create-object-storage.ts

  filesystem/
    filesystem-object-storage.ts

  s3/
    s3-object-storage.ts       // może być scaffold / późniejsza faza

lib/content/
  asset-repository.ts
  asset-service.ts
  course-asset-key-builder.ts

db/
  schema/
    content-assets.ts

scripts/
  migrate-storage.ts
  verify-storage.ts

==================================================
38. NIE NADABSTRAHUJ
==================================================

Nie buduj:
- plugin framework
- event bus
- distributed filesystem abstraction
- mount table
- virtual POSIX filesystem

Potrzebujemy prostego port/adapter:

ObjectStorage
        |
   -------------
   |           |
Filesystem    S3/R2

Tyle.

==================================================
39. ACCEPTANCE CRITERIA
==================================================

Gotowe, gdy:

- root path jest configurable
- wszystkie keys są względem root
- path traversal jest niemożliwy
- binary może być streamowany
- atomic writes działają
- SHA-256 jest liczony
- Postgres przechowuje metadata + object_key
- lessons znają tylko assetId
- storage implementation nie zna Lesson
- filesystem implementation przechodzi contract tests
- asset endpoint nie ujawnia physical path
- zmiana filesystem → S3 nie wymaga migracji lesson JSON
- object keys mogą zostać identyczne przy migracji
- typecheck/test/build przechodzą

==================================================
40. RAPORT KOŃCOWY
==================================================

Podaj:

1. ObjectStorage contract
2. filesystem implementation
3. storage key security rules
4. Postgres content_assets schema
5. asset serving flow
6. configuration/env
7. contract tests
8. migration path filesystem -> S3/R2
9. deployment limitations
10. test/build results

Nie implementuj S3 logiki w domenie.
Provider ma być wymiennym adapterem.