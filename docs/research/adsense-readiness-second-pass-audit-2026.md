# Druhý adversariální audit připravenosti `pogoevents.app` pro Google AdSense & Google Ads (po commitu `65b6b0b`)

**Datum auditu:** 20. listopadu 2026  
**Auditovaný stav:** `HEAD` = `65b6b0b` (*Phase 1 & 2 AdSense overhaul*) — **ověřeno jak proti lokálnímu buildu `frontend/dist/`, tak proti živé produkci `https://pogoevents.app/`** (commit `65b6b0b` je již živě nasazen; `sitemap.xml` na produkci má timestamp `2026-11-20T16:05:31.362Z`).  
**Rozsah:** Kompletní kontrola všech **456 indexovaných URL** ve 4 aktivních sitemapách, živých HTTP hlaviček, kořenové domény `/`, `AdSenseScript.tsx`, Google Consent Mode v2 / CMP, E-E-A-T signálů, autorských práv / hotlinků, multijazyčné kvality (`cs`, `en`, `ja`, `ru`) a Google Ads Destination & Trademark Requirements.

---

## Executive Summary — Verdikt po commitu `65b6b0b`

**Verdikt: 🟡 BLÍZKO, ALE JEŠTĚ NEPOSÍLAT ŽÁDOST — nalezeno 5 kritických skrytých blokátorů (Fáze 2.5).**

Commit `65b6b0b` udělal obrovský pokrok (redukce sitemapu na 456 URL, rozšíření na 33 původních průvodců, přidání Consent Mode v2 a `noindex` pro utilitní/Pokédex trasy). Druhé adversariální kolo auditu nad skutečným vygenerovaným HTML v `frontend/dist/` a živou produkcí však odhalilo **5 zásadních závad**, z nichž dvě přímo ohrožují technické ověření / CMP na hlavní doméně a tři vážně podkopávají signál kvality („Low value content“) a tvrzení o odstranění cizích hotlinků:

| # | Kritický nález | Závažnost | Dopad na AdSense / CMP / Ads |
|---|---|---|---|
| **1** | **Root URL `/` má `isAdSenseEligiblePath('/') === false` a neobsahuje `adsbygoogle.js` ani redirect** (`post-build.js` přepsal `index.html` kopií `cs.html` s `canonical -> /cs`) | 🔴 **KRITICKÉ** | Na vstupní adrese `https://pogoevents.app/` se **nikdy nenačte `adsbygoogle.js`**, nefunguje Google GDPR CMP (Funding Choices), nefungují Auto Ads a selhává ověření přes AdSense snippet. |
| **2** | **Všech 36 indexovaných žebříčků `/[lang]/rankings/[category]` obsahuje zjevně rozbitá a duplicitní data** (např. Great League & Ultra League: `#1–#4 Shadow Blissey 3117 CP`, Best Mega: nevydaný Mega Mewtwo Y/X, Gym Defenders: legendární Lugia) | 🔴 **KRITICKÉ** | Zjevný znak rozbitého automaticky generovaného obsahu (Scaled Content Abuse / Low Value Content) — každý ruční kontrolor i klasifikátor to odhalí během 3 sekund. |
| **3** | **Tvrzení „zero LeekDuck hotlinks“ neplatí: v 456 indexovaných stránkách je stále 2 656 `cdn.leekduck.com` URL** (z toho **1 748 viditelných `<img>` tagů** ve 3 vlajkových průvodcích + 832 v RSC eventů + 72 v RSC raidů), plus **212 `static.wikia.nocookie.net`** a **8 `local.pokemon.jp`** | 🔴 **KRITICKÉ** | Porušení Publisher Policies — Copyrighted Content ([answer/10437795](https://support.google.com/publisherpolicies/answer/10437795)) a okamžitý red flag při ruční revizi cizích assetů. |
| **4** | **`sitemap-events.xml` (144 URL = 31,6 % sitemapu) stále obsahuje 17 prázdných placeholderů (až 89 % Jaccard shoda) a propustil Spotlight Hours** (`pokemonspotlighthour2026-11-19/26` obešly filtr kvůli chybějícím pomlčkám) | 🟠 **VYSOKÉ** | 20 párů eventových stránek má 4-gram Jaccard podobnost ≥ 0,70 (max **0,890**), 17/36 eventů nemá žádného bosse ani spawny (`B:0 S:0`). |
| **5** | **Stará `sitemap-pokedex.xml` (912 `noindex` URL) je stále živá na produkci (HTTP 200 OK)** | 🟠 **VYSOKÉ** | Pokud byla dříve v GSC, Googlebot dál stahuje 912 `noindex` URL (*„Submitted URL marked noindex“*). |

---

## 1. Kritické skryté nálezy (blokátory ověření a schválení Google AdSense / CMP)

### 1.1 Root URL `https://pogoevents.app/` vůbec nenačítá `adsbygoogle.js` ani Google CMP!

Při živém dotazu na `https://pogoevents.app/` i kontrole lokálního buildu bylo zjištěno následující řetězení chyb:

1. [`frontend/post-build.js`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/post-build.js#L97-L99) přepisuje vygenerovaný `dist/index.html` bajtově identickou kopií `dist/cs.html` (`index.html === cs.html: true`).
2. Tím se z produkčního `index.html` zcela ztratí klientský redirect z [`frontend/src/app/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/page.tsx#L11-L20). Když uživatel nebo Googlebot/AdSense reviewer otevře `https://pogoevents.app/`:
   - Dostane HTTP `200 OK` s `<html lang="cs">` a cizím `<link rel="canonical" href="https://pogoevents.app/cs"/>` (není self-referencing canonical pro `/`).
   - Adresa v prohlížeči zůstane `/` (`usePathname()` vrací `'/'`).
3. [`frontend/src/components/AdSenseScript.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/AdSenseScript.tsx#L9-L22) však v `ALLOWED_ADSENSE_PATTERNS` povoluje **pouze** `/^\/(cs|en|ja|ru)\/?$/` a podstránky — **root `/` z whitelistu vypadl!**
   - `isAdSenseEligiblePath('/')` vrací **`false`**.
   - V [`frontend/src/app/layout.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/layout.tsx#L51) je sice statický `<meta name="google-adsense-account" content="ca-pub-8800056915088711" />` (ten ověří pouze vlastnictví domény podle [answer/12169212](https://support.google.com/adsense/answer/12169212)), ale **`adsbygoogle.js` se na `/` nikdy nevloží** (ani staticky v `<head>`, ani po hydrataci v `useEffect`)!
4. **Dopad na Google GDPR CMP (Funding Choices) a Consent Mode v2:**
   - Google's vestavěná CMP (*Privacy & messaging → European regulations*, [answer/13554116](https://support.google.com/adsense/answer/13554116)) se na webu zobrazuje **přímo skrze `adsbygoogle.js`** (není zde samostatný Funding Choices tag `fundingchoicesmessages.google.com`).
   - Protože `adsbygoogle.js` na `/` (a stejně tak na `/[lang]/privacy`, `/[lang]/pokedex`, `/[lang]/pokedle`) **vůbec neběží**, uživatel z EHP/UK/CH na vstupní stránce `https://pogoevents.app/` **neuvidí GDPR lištu** a na `/[lang]/privacy` **nemůže upravit ani odvolat souhlas**, přestože [`frontend/src/data/legalData.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/legalData.ts#L125-L126) výslovně tvrdí opak!
   - Navíc i na povolených trasách (`/cs`, `/cs/guides/...`) se `adsbygoogle.js` injektuje až klientem v `useEffect` po React hydrataci místo statického `<script async src="...adsbygoogle.js?client=ca-pub-8800056915088711">` v `<head>` ([answer/7584263](https://support.google.com/adsense/answer/7584263), [answer/9274516](https://support.google.com/adsense/answer/9274516)). Zároveň [`layout.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/layout.tsx#L60-L78) nastavuje `wait_for_update: 500` (500 ms), což u pozdně hydratovaného `useEffect` může vypršet dříve, než se `adsbygoogle.js` a CMP stihnou načíst (race condition).

**Jak správně vyřešit:**
- Přidat `/^\/$/` do `ALLOWED_ADSENSE_PATTERNS` v [`AdSenseScript.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/AdSenseScript.tsx#L9-L22), **nebo ještě lépe**: buď přesměrovat `/` → `/cs` (301/302 přes `firebase.json` redirects — pozor: podle AdSense dokumentace k root doméně je ale **bezpečnější**, aby `/` vracelo `200 OK` s obsahem + statickým `adsbygoogle.js` v `<head>` a self-referencing canonical, případně v `AdSenseScript` povolit `/` a zvýšit `wait_for_update` na `1000–2000` ms, a na stránkách bez reklam nastavit výjimky přes AdSense Auto Ads *Page exclusions* v administraci AdSense).
- **Doporučená čistá architektura:** Umístit standardní `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8800056915088711" crossOrigin="anonymous">` přímo do statického `<head>` (v `layout.tsx`), a nežádoucí obrazovky (`/pokedle`, `/filter`, `/friends`, `/admin`, `/pokedex/*`) vyloučit ze zobrazování reklam pomocí oficiálního **Auto Ads → Page exclusions** v Google AdSense UI. Tím se:
  1. 100 % splní instrukce Google (*„Paste code between `<head>` and `</head>`“*, [answer/7584263](https://support.google.com/adsense/answer/7584263)),
  2. Google CMP (Funding Choices) a odkaz *Privacy and cookie settings* ve footeru bude fungovat **na všech trasách včetně `/` a `/[lang]/privacy`**,
  3. Zabrání se zobrazování reklam na utilitních/herních obrazovkách bez toho, aby se rozbila detekce AdSense kódu crawlerem.

---

### 1.2 Zcela rozbité SSR tabulky žebříčků na všech 36 indexovaných stránkách `/[lang]/rankings/[category]`

Audit vygenerovaného HTML všech 9 kategorií (`× 4 jazyky = 36 URL` v `sitemap-raids-rocket.xml`) odhalil zásadní algoritmickou chybu v [`frontend/src/app/[lang]/rankings/[category]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/rankings/%5Bcategory%5D/page.tsx#L261-L292):

1. `pokemonRankings` obsahuje více řádků pro téhož Pokémona (pro každou kombinaci Fast/Charged útoků), ale `getCategoryTopPokemon()` **nededuplikuje podle druhu (`pokedexId` / `name`)**.
2. Pro PvP ligy (`great-league`, `ultra-league`, `little-cup`) řadí funkce Pokémony naivně podle `(b.defense * b.stamina)` místo skutečných PvPoke metrik (které přitom web již má v `pokedexMetaIndex.json` pod `meta.pvp.great.rank`!).
3. Do `best-mega` a `max-cp` pronikají **nevydaní Pokémoni** (`Mega Mewtwo Y`, `Mega Mewtwo X`), přestože metodický odstavec přímo nad tabulkou tvrdí *„Žebříček zohledňuje pouze reálně vydané Pokémony“*.
4. Do `max-battles` a `best-gym-defenders` pronikají nelegální Pokémoni (Shadow Pokémoni do Max Battles a Legendární Lugia do Gymů!).

**Skutečný obsah vyrenderovaný v `frontend/dist/en/rankings/*.html` (identicky i v `cs`, `ja`, `ru`):**

| Kategorie | Skutečné řádky `#1–#6` v živém HTML | Věcná chyba |
|---|---|---|
| `great-league` (CP ≤ 1500) | `#1–#4 Shadow Blissey (3117 CP)`, `#5–#6 Blissey (3117 CP)` | 4× stejný Pokémon za sebou + Blissey je v GL nepoužitelná (zobrazuje 3117 CP u ligy do 1500 CP!). |
| `ultra-league` (CP ≤ 2500) | `#1–#4 Shadow Blissey (3117 CP)`, `#5–#6 Blissey (3117 CP)` | Identická kopie Great League! |
| `little-cup` (CP ≤ 500) | `#1–#3 Shadow Chansey (1418 CP)`, `#4–#6 Chansey (1418 CP)` | 6 řádků z 15 jsou jen 2 formy Chansey. |
| `master-league` | `#1–#4 Zacian (Crowned Sword) 5629 CP`, `#5–#6 Black Kyurem` | 4× duplicitní Zacian za sebou. |
| `max-battles` | `#1 Shadow Regigigas`, `#2 Dusk Mane Necrozma`, `#3 Eternatus`, `#6 Shadow Origin Palkia` | Shadow Pokémoni a Necrozma **nemohou** vstoupit do Max Battles! |
| `best-mega` | `#1 Mega Rayquaza`, `#2 Mega Mewtwo Y (7267 CP)`, `#3 Mega Rayquaza`, `#5 Mega Mewtwo X` | **Mega Mewtwo X/Y nejsou v Pokémon GO vydáni** + duplicitní Rayquaza. |
| `max-cp` | `#1 Mega Mewtwo Y`, `#2 Mega Mewtwo X`, `#3 Primal Groudon`, `#5 Primal Groudon` | Nevydaní Pokémoni + duplicity. |
| `best-gym-defenders` | `#1–#4 Blissey`, `#5–#6 Lugia (4186 CP)` | 4× Blissey + **legendární Lugia nesmí do Gymu**. |

> **Dopad:** Pro jakéhokoliv hráče i ručního hodnotitele AdSense (který si klikne na „PvE Žebříčky“ z patičky) to vypadá jako rozbitý spam generovaný skriptem. Oprava zabere ~30 minut (deduplikace podle `name` + napojení `great/ultra/master/little` na existující `pokedexMetaIndex.json` + filtr Dynamax/Gigantamax pro `max-battles` + odfiltrování legendárek v `best-gym-defenders` a nevydaných Mega Mewtwo).

---

### 1.3 Zbývajících 2 656 `cdn.leekduck.com` referencí + 212 Fandom Wiki + 964 `local.pokemon.jp` hotlinků

Ačkoli commit `65b6b0b` uvádí *„zero LeekDuck hotlinks“*, přímý scan všech 456 vygenerovaných HTML souborů v `frontend/dist/` a zdrojových kódů v `frontend/src/` prokázal:

1. **1 748 viditelných `<img src="https://cdn.leekduck.com/...">` tagů ve 12 indexovaných článcích (3 průvodci × 4 jazyky):**
   - `trainer-level-rewards-tasks-guide`: **419 `<img>` tagů na jazyk (1 676 celkem)** — zdroj: [`frontend/src/data/trainerLevelsData.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/trainerLevelsData.ts) (navíc některé URL obsahují neenkódovanou mezeru `Poke Ball.png`!).
   - `pokemon-go-referral-program-guide`: **17 `<img>` tagů na jazyk (68 celkem)** — zdroj: [`frontend/src/components/ReferralProgramInteractiveWidget.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/ReferralProgramInteractiveWidget.tsx).
   - `rocket-leaders-giovanni-guide`: **1 `<img>` tag na jazyk (4 celkem)** — zdroj: [`frontend/src/components/RocketLeadersInteractiveWidget.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/RocketLeadersInteractiveWidget.tsx).
2. **832 `cdn.leekduck.com` URL (952 výskytů `leekduck` celkem) v RSC payloadu všech 144 eventových stránek (`sitemap-events.xml`):**
   - Např. `dynamax-trails-2026.html` obsahuje **63 unikátních `cdn.leekduck.com` URL**, `november-communityday2026.html` **28**, `season-24-twilight-trails.html` **33**.
   - Příčina: [`frontend/src/app/[lang]/events/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/events/%5Bslug%5D/page.tsx#L872-L880) předává surové objekty `event` a `mergedDetails` do klientské komponenty `<EventCard>` bez volání `sanitizeEventMediaForSsr()` (na rozdíl od `[lang]/page.tsx`)!
3. **72 `cdn.leekduck.com` URL v RSC payloadu 4 stránek `/[lang]/raids` (`18/jazyk`):**
   - Příčina: [`frontend/src/app/[lang]/raids/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/raids/page.tsx#L56-L65) předává surová data z `/api/raids` (`boss.image = https://cdn.leekduck.com/...`) do `<RaidView>` bez sanitizace.
4. **Další soubory v `frontend/src/` obsahující `cdn.leekduck.com`:**
   - [`frontend/src/data/dittoEggs.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/dittoEggs.ts) (**72 URL**), [`frontend/src/data/specialEvents.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/specialEvents.ts) (**38 URL**), [`frontend/src/App.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/App.tsx) (**13 cdn / 19 celkem**).
5. **Další cizí hotlinky třetích stran v `<img>` tazích:**
   - **`static.wikia.nocookie.net` (Fandom Wiki): 212 `<img>` tagů** v [`frontend/src/data/guidesData.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/guidesData.ts) (53/jazyk, převážně `special-backgrounds-location-cards-guide`).
   - **`local.pokemon.jp` (oficiální web The Pokémon Company Japan): 8 `<img>` tagů v SSR** (+ **964 URL** v [`frontend/src/data/pokelidDetailsData.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/pokelidDetailsData.ts) a **42 URL** v [`frontend/src/data/specialBackgroundsData.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/specialBackgroundsData.ts)).

---

### 1.4 `sitemap-events.xml` (144 URL = 31,6 % sitemapu): 17 prázdných budoucích placeholderů, 89 % Jaccard klony a propuštěné Spotlight Hours

Hloubková analýza všech 36 unikátních eventových slugů (`× 4 jazyky = 144 URL`) v `frontend/dist/sitemap-events.xml`:

1. **Bug ve filtru Spotlight Hours:**
   - [`frontend/src/utils/eventIntelligenceHelper.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/utils/eventIntelligenceHelper.ts#L77-L88) i [`AdSenseScript.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/AdSenseScript.tsx#L29) filtrují `slug.startsWith('pokemon-spotlight-hour-')` a `type === 'spotlight-hour'`.
   - Reálná data ze ScrapedDuck však mají slug **bez pomlček** (`pokemonspotlighthour2026-11-19`, `pokemonspotlighthour2026-11-26`) a typ **`eventType: "pokemon-spotlight-hour"`**! Oba Spotlight Hours (vč. již skončeného z 19. 11.) proto prošly do `sitemap-events.xml` i na AdSense whitelist!
2. **17 ze 36 eventů (47,2 %) nemá žádné herní entity (`Bosses = 0`, `Spawns = 0`) a 20/36 nemá ani bonusy:**
   - Patří sem neoznámené budoucí termíny pro prosinec 2026 – srpen 2027 (`max-battle-day-december-2026`, `max-battle-day-january-2027`, `raid-day-december-2026`, `raid-day-february-2027`, `super-mega-raid-day-january-2027`, `super-mega-raid-day-january-30-2027`, `january-communityday2027`, `january-communitydayclassic2027`, `february-communityday2027`, 3× `pokemon-go-tour-alola-*-2027`, 3× `minior-showers-*-2027`) a dvě reklamní proma (`pokemon-x-adidas-2026`, `duolingo-timed-research-2026`).
   - Protože nemají žádné konkrétní Pokémony ani bonusy, jejich text je z 80–90 % identická šablona z `buildEventIntelligence()`.
3. **Naměřená 4-gram Jaccard podobnost (EN eventy, 630 dvojic):**
   - Průměr: `0,341` | Maximum: **`0,890`** | Páry ≥ 0,50: **47/630** | Páry ≥ 0,70: **20/630**!
   - Nejhorší klony:
     - `super-mega-raid-day-january-2027` ↔ `super-mega-raid-day-january-30-2027`: **0,890**
     - `max-battle-day-december-2026` ↔ `max-battle-day-january-2027`: **0,842**
     - `raid-day-december-2026` ↔ `raid-day-february-2027`: **0,835**
     - `minior-showers-eta-aquariids-2027` ↔ `minior-showers-southern-delta-aquariids-2027`: **0,825**
     - `january-communitydayclassic2027` ↔ `january-communityday2027`: **0,822**
     - `pokemon-go-tour-alola-kaohsiung-2027` ↔ `pokemon-go-tour-alola-global-2027`: **0,769**
4. **Expirované eventy v sitemapu:** `minior-showers-leonids-2026` (skončil 2026-11-19) a `pokemonspotlighthour2026-11-19` (skončil 2026-11-19).
5. **Prolinkování na `noindex` stránky z „Related Events“:** [`events/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/events/%5Bslug%5D/page.tsx#L292-L294) nefiltruje `relatedEvents` přes `isSitemapWorthyEvent`, takže v sekci souvisejících událostí odkazuje i na `noindex` mikroeventy/GBL.

---

### 1.5 Stará `sitemap-pokedex.xml` (912 `noindex` URL) je stále živá na produkci!

- Živý dotaz `curl https://pogoevents.app/sitemap-pokedex.xml` vrací **`HTTP/1.1 200 OK` (623 912 bajtů, 912 URL)**.
- Důvod: stále existuje route [`frontend/src/app/sitemap-pokedex.xml/route.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap-pokedex.xml/route.ts) a [`frontend/post-build.js`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/post-build.js#L116) jej dále kopíruje do `dist/`, `public/`, `backend/` a `backend/dist/`.
- I když byla `sitemap-pokedex.xml` odstraněna z indexu `sitemap.xml` a `robots.txt`, Google Search Console dříve odeslané subsitemapy pravidelně dál stahuje. Výsledkem je 912 chyb *„Submitted URL marked 'noindex'“*. Soubor je potřeba zcela odstranit z buildu/distribuce (aby vracel 404/410) a odebrat v GSC.

---

## 2. Hloubková kontrola všech 456 indexovaných URL (po kategoriích a jazycích)

### 2.1 Přehledová matice všech 4 aktivních sitemap (`frontend/dist/`)

| Sitemap | Počet URL | Podíl | Průměr slov (EN / CS / RU) | Průměr znaků (JA) | Podíl latinky (JA / RU) | Hlavní zjištěný problém |
|---|---:|---:|---:|---:|---:|---|
| `sitemap-core.xml` | **44** | 9,6 % | 720 / 742 / 643 | 2 355 | 31,4 % / 31,8 % | `/[lang]/raids` má 18 `cdn.leekduck.com` v RSC; právní stránky mají hardcoded datum `27. září 2026`; `/contact` jen 78–103 slov. |
| `sitemap-guides.xml` | **132** | 28,9 % | **1 387 / 1 464 / 1 161** | **4 369** | 22,2 % / 30,4 % | **Nejsilnější část webu**, ale 3 průvodci mají **1 748 `cdn.leekduck.com` `<img>`**, 14 nových článků je výrazně kratších (`ru` min. 313 slov), `GuidesView` má vnořený `<main>` a anglické UI leaky v `ja`/`ru`. |
| `sitemap-events.xml` | **144** | 31,6 % | 737 / 780 / 506 | 2 248 | **67,8 % / 58,3 %** | 17/36 eventů nemá bossy ani spawny (`B:0 S:0`), 20 párů má Jaccard ≥ 0,70 (max 0,890), 832 `cdn.leekduck.com` v RSC, 2 Spotlight Hours prošly filtrem, `ru` min. 226 slov. |
| `sitemap-raids-rocket.xml` | **136** | 29,8 % | Raids 486 / Rocket 643 / Rankings 1 627 | 1 719 / 2 144 / 5 870 | Raids **51,5/49,5 %**<br>Rankings **81,9/87,7 %** | **Rankings (36 URL) jsou datově rozbité** (viz 1.2); Raids (80 URL) mají 4 páry s Jaccard ≥ 0,61 (max 0,757 `kyogre` vs `primal-kyogre`), anglický badge a anglická jména bossů v `ru`; **Rocket (20 URL) je velmi kvalitní a čistý**. |
| **CELKEM** | **456** | **100 %** | — | — | — | **244/456 stránek má stále JSON-LD `author: Organization`.** |

### 2.2 Kontrola SSR obsahu Core hubů (bez JS — žádné prázdné CSR loading skořápky)

Dobrá zpráva: na rozdíl od typických SPA/Next.js aplikací **žádný z hlavních hubů není prázdná CSR skořápka**. Všechny renderují plný SSR text přímo do `<main>`:
- `/cs` (843 slov), `/en` (850 slov): plný kalendář událostí + 8 redakčních karet průvodců.
- `/cs/pokedex` (1 255 slov): kompletní SSR výpis prvních 48 Pokémonů + `SectionEditorialGuide`.
- `/cs/raids` (736 slov): aktivní 1★–5★/Mega raid bossové + `SectionEditorialGuide` (ale 18 `cdn.leekduck.com` URL v RSC payloadu).
- `/cs/rankings` (1 907 slov): plná tabulka PvE žebříčku + `SectionEditorialGuide`.
- `/cs/rocket` (494 slov): Giovanni, lídři + `SectionEditorialGuide`.
- `/cs/guides` (1 461 slov): všech 33 karet průvodců s perexy.
- **Pozor na `/[lang]/download`:** není v `sitemap-core.xml`, ale **nemá `noindex`** (default `index,follow`), má jen **159 slov** a nabízí přímé stažení Android `.apk` mimo Google Play — navíc na ni vede trvalý odkaz z hlavního levého sidebaru v [`AppShell.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/AppShell.tsx#L407-L413). Doporučení: přidat `robots: { index: false, follow: true }`.

### 2.3 Detailní kontrola 33 průvodců (`sitemap-guides.xml`)

- **SSR render:** Všech 33 článků (× 4 jazyky = 132 URL) plně renderuje kompletní prózu staticky v SSG HTML — žádný prázdný placeholder.
- **Rozdíl délky starých vs. nových článků:**
  - 19 původních průvodců: **1 097 – 7 619 slov (EN)** / **1 096 – 7 915 slov (CS)** / **928 – 6 237 slov (RU)**.
  - 14 nových průvodců z `65b6b0b` (`editorialGuidesExpansionPart1/2.ts`): **415 – 582 slov (EN)** / **481 – 644 slov (CS)** / **313 – 493 slov (RU)**. Nejkratší je `pokemon-go-showcase-xxl-size-scoring-guide` (`en: 415`, `ru: 313`). Obsahově jsou faktické a původní, takže pro `cs`/`en` vyhovují, ale v `ru` balancují na hraně tenkého obsahu.
- **HTML & i18n chyby v [`GuidesView.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/GuidesView.tsx#L652-L725):**
  - Řádek `690`: **nevalidní vnořený tag `<main>`** uvnitř `<main className="app-page-content-wrapper">` z [`AppShell.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/AppShell.tsx#L508). Změnit na `<div className="article-body">`.
  - Řádky `652`, `699`, `719`, `725`: natvrdo pouze `cs` vs. `en` fallback — na `ja` a `ru` článcích tak svítí anglické **`Share link`**, **`Featured Pokémon in this section:`** a **`Enlarge`**.

### 2.4 Kvantitativní vyhodnocení: 4 jazyky (`cs/en/ja/ru`) vs. 2 jazyky (`cs/en`)

Reálná měření podílu latinky a kvality lokalizace napříč všemi 456 URL ukazují výraznou asymetrii mezi `cs`/`en` a `ja`/`ru`:

| Sekce | `cs` kvalita | `en` kvalita | `ja` podíl latinky & vady | `ru` podíl latinky & vady |
|---|---|---|---|---|
| **33 Guides** | Výborná (avg 1 464 slov) | Výborná (avg 1 387 slov) | **22,2 % latinky** (kvalitní JP próza, jen `Share link` / `Featured Pokémon...`) | **30,4 % latinky** (dobrá RU próza, 14 nových článků 313–493 slov, anglické UI labely) |
| **5 Rocket Leaderů** | Výborná (avg 659 slov) | Výborná (avg 643 slov) | **32,8 % latinky** (velmi kvalitní JP text) | **33,2 % latinky** (velmi kvalitní RU text) |
| **20 Raid Bossů** | Dobrá (avg 525 slov) | Dobrá (avg 486 slov) | **51,5 % latinky** (anglické názvy útoků, anglický badge `5-Star Legendary Raid Guide`, `Kyurem Counters →`) | **49,5 % latinky** + **bug**: používá anglické `bossName` místo `localizedName` v titulcích, H1, FAQ i těle ([`raids/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/raids/%5Bslug%5D/page.tsx#L85-L572))! |
| **36 Eventů** | Střední (avg 780 slov) | Střední (avg 737 slov) | **67,8 % latinky** (EN názvy eventů, útoků, Mega evolucí, `100% IV CP: Research (Lv 15)`, `View Full Calendar →`) | **58,3 % latinky** + tenké texty (min. **226 slov**!) |
| **9 Rankings** | Rozbitá data (viz 1.2) | Rozbitá data (viz 1.2) | **81,9 % latinky** (názvy útoků + anglické/latinkové hlavičky tabulek) | **87,7 % latinky** (celá tabulka Pokémonů + útoků v latince) |

**Strategický závěr k 4 vs. 2 jazykům:**
- **Nerušit `ja` a `ru` u 33 průvodců, Core hubů a 5 Rocket stránek** — tam je japonský i ruský text přirozený, originální a dlouhý (stačí opravit 4 drobné UI stringy v `GuidesView.tsx`).
- **U `events` a `raids`:** Po proškrtání prázdných 2027 placeholderů a Spotlight Hours klesne počet eventů z 36 na ~10–14 skutečně bohatých událostí (čímž zmizí 226slovné ruské pahýly i 89% Jaccard klony). U `raids/[slug]/page.tsx` opravit `localizedName` v ruštině a lokalizovat badge + `Counters →` — pak mohou zůstat všechny 4 jazyky bez rizika *mixed-language* penalizace. (Pokud by po vyčištění eventů měly `ja`/`ru` eventové stránky nadále >60 % angličtiny, je bezpečnější dát `noindex` pouze na `ja`/`ru` varianty `/events/[slug]`, nikoli na celý jazyk.)

---

## 3. Kontrola E-E-A-T, důvěryhodnosti, CMP/GDPR a autorských práv (vč. Google Ads)

### 3.1 E-E-A-T a konzistence právních stránek

1. **JSON-LD autorita na 244 ze 456 stránek (53,5 %) je stále anonymní:**
   - Pouze 132 stránek (`sitemap-guides.xml`) má `author: { "@type": "Person", "name": "David Faltus", "url": ".../about" }`.
   - **244 stránek** stále vysílá `author: { "@type": "Organization", "name": "PoGo Events Editorial Team" / "PoGo Events Tracker" }`:
     - [`events/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/events/%5Bslug%5D/page.tsx#L323) (144 URL) — navíc má vždy anglický `headline` a `organizer.name = "Niantic"` bez Scopely (řádek 314)!
     - [`raids/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/raids/%5Bslug%5D/page.tsx#L284) (80 URL) — také vždy anglický `headline`!
     - [`rocket/[leader]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/rocket/%5Bleader%5D/page.tsx#L739) (20 URL).
   - Navíc [`layout.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/layout.tsx#L23) má globálně `authors: [{ name: 'Pokémon GO Community' }]` místo `David Faltus`.
2. **Právní stránky (`LegalPageView.tsx` & `legalData.ts`) — drobné, ale viditelné nesoulady:**
   - [`LegalPageView.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/LegalPageView.tsx#L90-L96) natvrdo zobrazuje **„Aktualizováno: 27. září 2026“** pro všech 5 stránek a zcela ignoruje `pageData.lastUpdated` (`2026-11-20`) z `legalData.ts`!
   - [`legalData.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/legalData.ts#L39) má u `privacy`, `terms` a `contact` stále `lastUpdated: '2026-09-27'`, v `terms` (řádky 270–273) chybí `Scopely, Inc.` (je tam jen `Niantic, Inc.`), a v `privacy` (řádek 127) chybí v japonštině věta o EEA/CMP.
   - [`LegalPageView.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/LegalPageView.tsx#L166-L169) na `/contact` korektně zobrazuje klikací `mailto:support@pogoevents.app`, ale pro `ja` a `ru` vypisuje anglický popisek `Official Support Email:`. (Také ověřte, že schránka `support@pogoevents.app` reálně přijímá e-maily!)
   - **Citlivý detail v [`legalData.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/legalData.ts#L364-L376) (`disclaimer`):** Odstavec *„Poděkování komunitním zdrojům“* výslovně děkuje projektu **„ScrapedDuck“** a **„Leek Duck (leekduck.com)“**. Pro manuálního hodnotitele Google AdSense může slovo *„ScrapedDuck“* na stránce Disclaimer vyvolat dojem, že web je primárně scraperem cizího portálu (*Scraped Content* policy). Lepší je uvést neutrální formulaci o otevřených komunitních datech a Pokémon GO Game Masteru bez slova „Scraped“.

### 3.2 Technická kontrola `ads.txt`, `robots.txt`, HTTPS a DNS

| Kontrola | Výsledek na živé produkci | Poznámka |
|---|---|---|
| `https://pogoevents.app/ads.txt` | ✅ `HTTP 200 OK`, `text/plain; charset=utf-8`, 59 B | Přesný řádek `google.com, pub-8800056915088711, DIRECT, f08c47fec0942fa0`. |
| `http://pogoevents.app/ads.txt` | ✅ `HTTP 301` → `https://pogoevents.app/ads.txt` | Splňuje [answer/12171612](https://support.google.com/adsense/answer/12171612). |
| `https://pogoevents.app/robots.txt` | ✅ `HTTP 200 OK`, `Mediapartners-Google: Allow: /` | Neblokuje žádné AdSense/Google Ads crawlery. |
| `https://www.pogoevents.app/` | ⚠️ **NXDOMAIN** (`Could not resolve host`) | Nevadí, pokud je v AdSense zadaná apex doména `pogoevents.app`, ale pro kompletnost a případné zpětné odkazy / Google Ads se vyplatí nastavit DNS CNAME/A + 301 redirect `www` → apex ve Firebase Hosting. |
| Smíšený obsah (`http://` obrázky) | ✅ **0 výskytů** napříč všemi 456 stránkami | 100 % HTTPS. |
| Navigační odkazy na `noindex` | ⚠️ Sidebar v [`AppShell.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/AppShell.tsx#L352-L390) odkazuje na `/pokedle`, `/filter`, `/friends`, `/settings` (všechny `noindex`) | To je v pořádku pro UX (uživatel nástroje potřebuje), ale je nutné, aby na těchto stránkách nebyly reklamy a nebyly v sitemapu (splněno). Odkaz `/download` doplnit o `noindex`. |
| Google Analytics duplicitní ID | ℹ️ [`layout.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/layout.tsx#L109-L110) konfiguruje 2 GA4 property (`G-17PT93VMXQ` a `G-MKGYZSS7GK`) | Neškodí schválení, ale zkontrolujte, zda jsou obě property záměrné. |

### 3.3 Shoda s Google Ads (Destination Requirements & Trademark Policy)

Pokud plánujete kromě monetizace přes Google AdSense také propagovat `pogoevents.app` pomocí placených kampaní v **Google Ads**, platí tyto primární zásady:

1. **Destination Requirements ([support.google.com/adspolicy/answer/6368661](https://support.google.com/adspolicy/answer/6368661)):**
   - ✅ Všechny cílové stránky vrací `200 OK`, neblokují `AdsBot-Google`, nemají login wall ani nečekané redirect smyčky.
   - ⚠️ **NIKDY necilte Google Ads na `/[lang]/download`!** Stránka nabízí přímé stažení Android `.apk` mimo Google Play, což spouští přísné kontroly *Malicious or Unwanted Software* / *Compromised Site* a často vede k zamítnutí reklam.
   - ⚠️ Opravte nefunkční `www.pogoevents.app` (NXDOMAIN) a rozbité tabulky na `/rankings/*` (Destination Experience).
2. **Trademark Policy — výjimka pro informační a fanouškovské weby ([support.google.com/adspolicy/answer/6118](https://support.google.com/adspolicy/answer/6118)):**
   - Google Ads umožňuje informačním a fanouškovským webům odkazovat na ochrannou známku („Pokémon GO“), pokud hlavní účel landing page je čistě informační/vzdělávací a stránka jasně uvádí, že jde o nezávislý neoficiální portál (splněno ve Footeru, Sidebar i `/disclaimer`).
   - Pokud však vlastník ochranné známky (Nintendo / The Pokémon Company / Scopely) uplatní omezení ochranné známky v reklamních textech, může Google Ads omezit použití slova „Pokémon“ přímo v nadpisech/popiscích reklam (*ad text*), nikoli jako klíčové slovo.
3. **Copyrighted Content ([support.google.com/publisherpolicies/answer/10437795](https://support.google.com/publisherpolicies/answer/10437795)):**
   - Odstranění zbývajících **1 748 `cdn.leekduck.com`**, **212 `static.wikia.nocookie.net`** a **964 `local.pokemon.jp`** hotlinků je nejvyšší prioritou z pohledu obou programů (AdSense i Google Ads).

---

## 4. Prioritizovaný seznam „Poslední míle“ (Fáze 2.5 — PŘED odesláním žádosti)

### 🔴 MUST-FIX (Blokátory — opravit před kliknutím na „Request Review“ v AdSense)

1. **Opravit načítání `adsbygoogle.js` a Google CMP na root URL `/` (i globálně v `<head>`)**
   - **Soubory:** [`frontend/src/app/layout.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/layout.tsx#L48-L116), [`frontend/src/components/AdSenseScript.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/AdSenseScript.tsx#L9-L68), [`frontend/post-build.js`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/post-build.js#L97-L99).
   - **Akce:** Vložit `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8800056915088711" crossOrigin="anonymous" />` staticky do `<head>` v `layout.tsx` (a navýšit `wait_for_update: 1500` v Consent Mode v2), odebrat klient-only `AdSenseScript` (nebo jej ponechat jen jako guard, pokud je v AdSense UI zapnuté *Auto Ads → Page exclusions* pro `/pokedle`, `/filter`, `/friends`, `/admin`, `/pokedex/*`, `/settings`). Zároveň v `AdSenseScript.tsx` (pokud zůstane) přidat `/^\/$/` a opravit `/\/events\/pokemon-?spotlight-?hour/i`.
   - **Úsilí:** ~15 min | **Dopad:** 10/10 (přímý blokátor ověření a EU CMP!).

2. **Opravit rozbité a duplicitní tabulky na všech 36 stránkách `/[lang]/rankings/[category]`**
   - **Soubor:** [`frontend/src/app/[lang]/rankings/[category]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/rankings/%5Bcategory%5D/page.tsx#L261-L292).
   - **Akce:**
     - Deduplikovat seznam podle `name` (ponechat jen nejlepší moveset pro každého Pokémona).
     - Pro `great-league`, `ultra-league`, `master-league` a `little-cup` číst reálné PvP pořadí z `pokedexMetaIndex.json` (`meta.pvp[league].rank`).
     - Pro `best-mega` a `max-cp` vyřadit nevydané Pokémony (`Mega Mewtwo X/Y` — ověřit `isPokemonReleasedInGo`).
     - Pro `max-battles` filtrovat skutečné Dynamax/Gigantamax Pokémony (bez Shadow!).
     - Pro `best-gym-defenders` vyřadit legendární a mytické Pokémony (nesmí do Gymu!).
   - **Úsilí:** ~30–45 min | **Dopad:** 9,5/10.

3. **Skutečně odstranit zbývajících 2 656 `cdn.leekduck.com` URL (a Fandom Wiki hotlinky)**
   - **Soubory:**
     - [`frontend/src/data/trainerLevelsData.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/trainerLevelsData.ts) (419 `cdn.leekduck.com` → lokální SVG/PNG item ikony nebo self-hosted `/assets/items/`).
     - [`frontend/src/components/ReferralProgramInteractiveWidget.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/ReferralProgramInteractiveWidget.tsx) (17 `cdn.leekduck.com`).
     - [`frontend/src/components/RocketLeadersInteractiveWidget.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/RocketLeadersInteractiveWidget.tsx) (4 `cdn.leekduck.com`).
     - [`frontend/src/app/[lang]/events/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/events/%5Bslug%5D/page.tsx#L872-L880) (sanitizovat `event` a `mergedDetails` přes `resolveImage` před předáním do `<EventCard>` → odstraní 832 URL).
     - [`frontend/src/app/[lang]/raids/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/raids/page.tsx#L56-L65) (sanitizovat `initialBosses` → odstraní 72 URL).
     - [`frontend/src/data/dittoEggs.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/dittoEggs.ts) (72 URL), [`frontend/src/data/specialEvents.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/specialEvents.ts) (38 URL), [`frontend/src/App.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/App.tsx) (13 URL).
     - Bonus (silně doporučeno): nahradit 212 `static.wikia.nocookie.net` v [`guidesData.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/guidesData.ts) lokálními/vlastními grafikami nebo odstranit zbytečné cizí náhledy.
   - **Úsilí:** ~45–60 min | **Dopad:** 9,5/10.

4. **Zpřísnit `isSitemapWorthyEvent()` — vyhodit Spotlight Hours, expirované eventy a 17 prázdných 2027 placeholderů**
   - **Soubory:** [`frontend/src/utils/eventIntelligenceHelper.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/utils/eventIntelligenceHelper.ts#L62-L91), [`frontend/src/app/[lang]/events/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/events/%5Bslug%5D/page.tsx#L207-L295).
   - **Akce:**
     - Přidat filtr `slug.includes('spotlight') || type === 'pokemon-spotlight-hour'`.
     - Vyřadit ze sitemapu a označit `noindex` všechny eventy, které: (a) jsou již skončené (`end < now`), (b) nemají žádné konkrétní Pokémony (`featuredEntries.length === 0`) ani konkrétní bonusy (tím okamžitě zmizí všech 17 prázdných 2027 placeholderů a brandová proma Adidas/Duolingo — Jaccard klony spadnou na 0!).
     - Filtrovat `relatedEvents` v `events/[slug]/page.tsx` přes `isSitemapWorthyEvent`.
   - **Úsilí:** ~20 min | **Dopad:** 9/10 (sníží sitemap ze 456 na ~370 ultra-čistých stránek).

5. **Odstranit živou zombie `sitemap-pokedex.xml` (912 `noindex` URL)**
   - **Soubory:** smazat [`frontend/src/app/sitemap-pokedex.xml/route.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap-pokedex.xml/route.ts), odebrat `'sitemap-pokedex.xml'` z [`frontend/post-build.js`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/post-build.js#L116) a smazat `frontend/public/sitemap-pokedex.xml` + `backend/sitemap-pokedex.xml`.
   - **Úsilí:** ~5 min | **Dopad:** 8/10.

---

### 🟡 SHOULD-FIX / NICE-TO-HAVE (Silné vylepšení E-E-A-T, čistoty a lokalizace)

6. **Sjednotit JSON-LD `author: Person (David Faltus)` a `Niantic / Scopely` na zbývajících 244 stránkách**
   - Soubory: [`events/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/events/%5Bslug%5D/page.tsx#L312-L329), [`raids/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/raids/%5Bslug%5D/page.tsx#L280-L290), [`rocket/[leader]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/rocket/%5Bleader%5D/page.tsx#L739), [`layout.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/layout.tsx#L23).
   - Lokalizovat `Article.headline` místo hardcoded angličtiny.

7. **Opravit hardcoded datum `27. září 2026` a drobné chyby v `LegalPageView.tsx` & `legalData.ts`**
   - V [`LegalPageView.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/LegalPageView.tsx#L90-L96) formátovat skutečné `pageData.lastUpdated`, lokalizovat popisek e-mailu na `/contact` i pro `ja`/`ru`, aktualizovat `terms` na `Niantic / Scopely`, doplnit CMP zmínku do `ja` verze `privacy`, a v `disclaimer` přeformulovat „ScrapedDuck“ na „otevřená komunitní data a herní Game Master“.

8. **Opravit vnořený `<main>` a anglické UI leaky v `GuidesView.tsx` a `raids/[slug]/page.tsx`**
   - [`GuidesView.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/GuidesView.tsx#L652-L725): nahradit vnitřní `<main>` za `<div>`, doplnit `ja`/`ru` překlady pro `Share link`, `Featured Pokémon in this section:` a `Enlarge`.
   - [`raids/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/raids/%5Bslug%5D/page.tsx#L85-L639): použít `localizedName` v `ru`, přeložit badge `5-Star Legendary Raid Guide` a odkazy `relatedBosses` (a omezit `relatedBosses` na `FEATURED_SITEMAP_RAID_BOSSES`, aby nevedly na `noindex` bosse).

9. **Přidat `robots: { index: false, follow: true }` na `/[lang]/download`**
   - Soubor: [`frontend/src/app/[lang]/download/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/download/page.tsx#L38-L49) (159slovná APK stránka nemá přidanou hodnotu v indexu a přitahuje kontroly APK).

10. **Nastavit DNS + 301 redirect pro `www.pogoevents.app` → `https://pogoevents.app/`** (eliminuje NXDOMAIN při ručním zadání adresy s `www.`).

---

### 🟢 DO-NOT-TOUCH (Co je už po `65b6b0b` správně a neměnit)

- **`ads.txt` a HTTP→HTTPS 301 redirect** — 100 % validní, bez přebytečných mezer a se správným `Content-Type: text/plain; charset=utf-8`.
- **`robots.txt`** — čistě povoluje `Mediapartners-Google` i obecné crawlery, správně odkazuje jen na 4 aktivní sitemapy.
- **Core huby (`/`, `/cs`, `/raids`, `/rocket`, `/guides`, `/rankings`, `/pokedex`)** — všechny mají bohatý SSR obsah bez prázdných CSR loading skořápek.
- **5 stránek Team GO Rocket (`/rocket/giovanni|cliff|sierra|arlo|grunts`)** — jedny z nejčistších a nejkvalitnějších stránek na webu ve všech 4 jazycích (stačí jen přepnout JSON-LD `author` na `Person`).
- **`noindex` politika na `/pokedex/[slug]`, `/types/[type]`, `/pokedle`, `/filter`, `/friends`, `/settings`** — přesně cílená a v produkčním HTML ověřená.
- **33 původních průvodců** — solidní redakční základ s vysokým průměrem slov (1 387–1 464 slov v EN/CS) a interaktivními widgety (po odstranění `cdn.leekduck.com` obrázků ve 3 z nich).

---

## 5. Seznam primárních zdrojů

### Oficiální dokumentace Google (AdSense, Publisher Policies, Google Ads)
1. **Google AdSense — Connect your site to AdSense / umístění kódu do `<head>`:** [https://support.google.com/adsense/answer/7584263](https://support.google.com/adsense/answer/7584263)
2. **Google AdSense — Verify your site ownership (`google-adsense-account`, code snippet, `ads.txt`):** [https://support.google.com/adsense/answer/12169212](https://support.google.com/adsense/answer/12169212)
3. **Google AdSense — Where to place the AdSense code in your HTML (`<head>` vs `<body>`):** [https://support.google.com/adsense/answer/9274516](https://support.google.com/adsense/answer/9274516) a [https://support.google.com/adsense/answer/9190028](https://support.google.com/adsense/answer/9190028)
4. **Google AdSense — Ads.txt guide:** [https://support.google.com/adsense/answer/12171612](https://support.google.com/adsense/answer/12171612)
5. **Google AdSense — EU User Consent Policy & Google-certified CMP (IAB TCF v2.2 / Funding Choices):** [https://support.google.com/adsense/answer/13554116](https://support.google.com/adsense/answer/13554116)
6. **Google AdSense — Common site review issues („Site isn't ready“, root domain, redirects, crawler access):** [https://support.google.com/adsense/answer/9061852](https://support.google.com/adsense/answer/9061852) a [https://support.google.com/adsense/answer/76228](https://support.google.com/adsense/answer/76228)
7. **Google Publisher Policies — Copyrighted content:** [https://support.google.com/publisherpolicies/answer/10437795](https://support.google.com/publisherpolicies/answer/10437795)
8. **Google Ads Policies — Destination requirements:** [https://support.google.com/adspolicy/answer/6368661](https://support.google.com/adspolicy/answer/6368661)
9. **Google Ads Policies — Trademarks (Resellers & Informational / Fan sites):** [https://support.google.com/adspolicy/answer/6118](https://support.google.com/adspolicy/answer/6118)

### Ověřené soubory v repozitáři (`HEAD` = `65b6b0b`)
- [`frontend/src/components/AdSenseScript.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/AdSenseScript.tsx)
- [`frontend/src/app/layout.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/layout.tsx)
- [`frontend/src/app/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/page.tsx)
- [`frontend/post-build.js`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/post-build.js)
- [`frontend/firebase.json`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/firebase.json)
- [`frontend/src/app/[lang]/rankings/[category]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/rankings/%5Bcategory%5D/page.tsx)
- [`frontend/src/app/[lang]/events/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/events/%5Bslug%5D/page.tsx)
- [`frontend/src/utils/eventIntelligenceHelper.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/utils/eventIntelligenceHelper.ts)
- [`frontend/src/app/[lang]/raids/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/raids/%5Bslug%5D/page.tsx)
- [`frontend/src/app/[lang]/raids/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/raids/page.tsx)
- [`frontend/src/app/[lang]/rocket/[leader]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/rocket/%5Bleader%5D/page.tsx)
- [`frontend/src/app/[lang]/download/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/download/page.tsx)
- [`frontend/src/app/sitemap-pokedex.xml/route.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap-pokedex.xml/route.ts)
- [`frontend/src/components/GuidesView.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/GuidesView.tsx)
- [`frontend/src/components/LegalPageView.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/LegalPageView.tsx)
- [`frontend/src/data/legalData.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/legalData.ts)
- [`frontend/src/data/trainerLevelsData.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/trainerLevelsData.ts)
- [`frontend/src/components/ReferralProgramInteractiveWidget.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/ReferralProgramInteractiveWidget.tsx)
- [`frontend/src/components/RocketLeadersInteractiveWidget.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/RocketLeadersInteractiveWidget.tsx)
