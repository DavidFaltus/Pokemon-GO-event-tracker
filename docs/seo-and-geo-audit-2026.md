# Hloubkový audit SEO a GEO (Generative Engine Optimization) pro Pokémon GO Event Tracker (pogoevents.app)

**Autor:** Antigravity AI Engineering & Research Team  
**Datum:** 17. října 2026  
**Status dokumentu:** Kompletní technický audit (Primární zdroje v kódu + Webové specifikace 2026)  
**Cílový projekt:** `DavidFaltus/Pokemon-GO-event-tracker` (`https://pogoevents.app`)  
**Cílový soubor:** `docs/seo-and-geo-audit-2026.md`  

---

## Obsah

1. [Manažerské shrnutí (Executive Summary)](#manažerské-shrnutí-executive-summary)
2. [Část 1: Současný stav SEO v repozitáři](#část-1-současný-stav-seo-v-repozitáři)
   - 1.1. Co v projektu již funguje skvěle (Silné stránky)
   - 1.2. Audit vygenerovaného statického HTML v `frontend/dist/` (Co skutečně vidí vyhledávače)
   - 1.3. Kritické chyby v `sitemap.ts` a rozpor s kanonickými URL a Firebase Hostingem
   - 1.4. Audit metadat, `<html lang>`, `canonical`, `hreflang` (`x-default`), OpenGraph a `/api/og`
   - 1.5. Audit strukturovaných dat JSON-LD (`Schema.org`) napříč typy stránek
   - 1.6. Audit interního prolinkování (Problém 4 750+ osiřelých stránek a 404 odkazů v patičce)
   - 1.7. Architektonická dvojkolejnost: Firebase Hosting (`dist/`) vs. Express Bot SSR (`backend/src/ssr.ts`)
3. [Část 2: Současný stav GEO (Generative Engine Optimization)](#část-2-současný-stav-geo-generative-engine-optimization)
   - 2.1. Stávající podpora pro AI agenty (`/llms.txt`, `/llms-full.txt`, `/api/agent/*.md`)
   - 2.2. Jak LLM crawleři čtou statické HTML v `dist/` (Slepota vůči CSR a React Suspense)
   - 2.3. Audit `robots.ts` / `robots.txt` vůči AI vyhledávacím a trénovacím botům (stav 2026)
   - 2.4. Audit souladu s oficiální specifikací `llmstxt.org` (v2, srpen 2026)
   - 2.5. Citovatelnost faktů a statistik („Answer-First" struktura pro AI Overviews, ChatGPT Search a Perplexity)
4. [Část 3: Konkrétní návrhy úprav pro SEO (P0 / P1 / P2)](#část-3-konkrétní-návrhy-úprav-pro-seo-seřazené-podle-dopadu-p0--p1--p2)
   - Priorita P0 (Kritické blokátory indexace a crawlování)
   - Priorita P1 (Vysoký dopad na SERP pozice, mezinárodní cílení a Rich Results)
   - Priorita P2 (Střední dopad, technické doladění a sémantika)
5. [Část 4: Konkrétní návrhy úprav pro GEO (P0 / P1 / P2)](#část-4-konkrétní-návrhy-úprav-pro-geo-seřazené-podle-dopadu-p0--p1--p2)
   - Priorita P0 (Okamžitá čitelnost a objevitelnost pro AI vyhledávače a agenty)
   - Priorita P1 (Zvýšení citovanosti v ChatGPT Search, Perplexity, Claude a Google AI Overviews)
   - Priorita P2 (Pokročilá agentní integrace a strojově čitelné datové sady)
6. [Bibliografie a citace primárních zdrojů](#bibliografie-a-citace-primárních-zdrojů)

---

## Manažerské shrnutí (Executive Summary)

Projekt **Pokémon GO Event Tracker (`pogoevents.app`)** má nadstandardně navržené základy pro moderní SEO i GEO: využívá statický export Next.js 16 (`output: 'export'`) nasazený na **Firebase Hosting Edge CDN**, generuje **4 864 URL** v `sitemap.xml` napříč 4 jazyky (`cs`, `en`, `ja`, `ru`), obsahuje RSS kanál (`/feed.xml`), statické soubory `/llms.txt` a `/llms-full.txt` a dedikované tokenově úsporné Markdown endpointy (`/api/agent/*.md`) v backendu.

Detailní forenzní analýza primárních zdrojových souborů a skutečně vygenerovaného HTML v `frontend/dist/` však odhalila **zásadní architektonické a implementační chyby**, které v současnosti blokují plný potenciál v Google Search i v AI vyhledávačích (ChatGPT Search, Perplexity, Claude, Google AI Overviews):

1. **P0 — Prázdné nebo skryté HTML pro crawlery bez JS / s omezeným JS:**
   - Stránky `/[lang]/raids`, `/[lang]/rocket`, `/[lang]/raids/[slug]` a `/[lang]/rocket/[leader]` stahují data výhradně na klientovi (`useEffect` -> `apiFetch`). Ve vygenerovaném `frontend/dist/cs/raids.html` a `rocket.html` je v `<main>` pouze text **`Načítání raidů ze serveru...`** (55 znaků) a **žádné `<h1>` ani `<h2>`**.
   - Stránky využívající `<App />` (`/[lang]`, `/[lang]/events/[slug]`, `/[lang]/guides`, `/[lang]/guides/[guideId]`, `/[lang]/pokemon/[id]`) obalují záložky do `React.lazy()` + `<Suspense fallback={<div class="spinner"/>}>` ([`App.tsx:21-35`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/App.tsx#L21-L35), [`App.tsx:1043`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/App.tsx#L1043)). V primárním stromu `.app-page-content-wrapper` je proto vyrenderován jen prázdný spinner a skutečný obsah je odložen na konec `<body>` do skrytého elementu `<div hidden id="S:0">`.
   - Detailní stránky `/[lang]/pokemon/[id]`, `/[lang]/raids/[slug]` a `/[lang]/rocket/[leader]` navíc v SSR/SSG nevykreslují detail konkrétního Pokémona/bosse/lídra, ale pouze obecný přehled celé sekce!
2. **P0 — Masivní osiřelost stránek (Orphan Pages) a 404 odkazy v patičce:**
   - Z **4 864 URL** v `sitemap.xml` nemá **více než 4 750 podstránek** (`/pokemon/[id]`, `/events/[slug]`, `/guides/[guideId]`, `/rankings/[category]`, `/types/[type]`, `/raids/[slug]`, `/rocket/[leader]`) **ani jeden HTML odkaz `<a href="...">`** z jiných stránek webu, protože karty v `GuidesView.tsx`, `EventCard.tsx` a `PokemonRankingsView.tsx` používají pouze JS `onClick` handlery na `<div>`/`<article>`.
   - Jediné dva hluboké odkazy na průvodce v globální patičce [`Footer.tsx:170-171`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/Footer.tsx#L170-L171) (`/guides/team-go-rocket-leaders-counters-guide` a `/guides/raid-boss-counters-and-hundo-iv-guide`) míří na **neexistující slugy (HTTP 404)** na všech 4 800+ stránkách webu.
3. **P0 — 19 neexistujících (404) URL a 49 nekanonických/přesměrovaných URL přímo v `sitemap.xml`:**
   - [`sitemap.ts:56-91`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts#L56-L91) vkládá do sitemapy `/friends`, `/research` a 17× `/guides/${slug}` bez jazykového prefixu, které Next.js vůbec negeneruje do `dist/` (na Firebase Hostingu vracejí 404). Dalších 12 URL (`/[lang]/ditto`, `/[lang]/eggs`, `/[lang]/research`) jsou v `dist/` pouze prázdné `NEXT_REDIRECT` obálky (45–53 znaků textu).
4. **P0 — Natvrdo nastavené `<html lang="en">` na všech českých, japonských i ruských stránkách:**
   - [`frontend/src/app/layout.tsx:45`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/layout.tsx#L45) má v kořenovém layoutu natvrdo `<html lang="en">`. Všechny statické soubory (`cs.html`, `ja.html`, `ru.html` a tisíce jejich podstránek) mají v surovém HTML `lang="en"`.
5. **P0 (GEO) — Rozpor v `/llms-full.txt` a chybějící propojení HTML s Markdownem:**
   - [`frontend/public/llms-full.txt:30`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/public/llms-full.txt#L30) odkazuje AI agenty na `/api/agent/eggs.md`, který v [`backend/src/index.ts:925-985`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts#L925-L985) **vůbec neexistuje** (chybí také `/api/agent/rocket.md`).
   - V HTML hlavičkách ani v `firebase.json` nejsou deklarovány relace `<link rel="alternate" type="text/markdown">` a `<link rel="describedby" href="/llms.txt">` vyžadované specifikací **llms.txt v2 (srpen 2026)** a kontrolované nástrojem Chrome Lighthouse.

---

## Část 1: Současný stav SEO v repozitáři

### 1.1. Co v projektu již funguje skvěle (Silné stránky)

1. **Rychlost odezvy (TTFB < 50 ms) a Cache-Control strategie na Firebase CDN:**
   - V [`frontend/firebase.json:12-120`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/firebase.json#L12-L120) jsou příkladně nastaveny bezpečnostní hlavičky (`Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) a dvouvrstvé cachování (`public, max-age=1800, stale-while-revalidate=86400` pro HTML a `max-age=31536000, immutable` pro `/_next/static/**`).
   - V [`frontend/src/app/layout.tsx:50-54`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/layout.tsx#L50-L54) jsou správně použity `<link rel="preconnect">` a `<link rel="dns-prefetch">` pro obrazové CDN (`cdn.jsdelivr.net`, `raw.githubusercontent.com`, `img.pokemondb.net`).
   - Google Analytics (`gtag.js`) je v [`layout.tsx:58-71`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/layout.tsx#L58-L71) načítán se strategií `lazyOnload`, takže neblokuje LCP ani TBT (Core Web Vitals).
2. **Vícejazyčná URL architektura (`cs`, `en`, `ja`, `ru`):**
   - Aplikace v `frontend/src/app/[lang]/` striktně odděluje jazykové mutace do samostatných podadresářů (`/cs/...`, `/en/...`, `/ja/...`, `/ru/...`), což přesně odpovídá doporučením [Google Search Central — Managing multi-regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites).
3. **Široké programatické pokrytí vyhledávacích záměrů (Search Intent Coverage):**
   - Projekt pokrývá hlavní vertikály: události (`/[lang]/events/[slug]`), žebříčky podle lig a typů (`/[lang]/rankings/[category]`, 26 kategorií v [`rankings/[category]/page.tsx:9-36`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rankings/[category]/page.tsx#L9-L36)), typové slabiny (`/[lang]/types/[type]`, 18 typů v [`types/[type]/page.tsx:9-13`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/types/[type]/page.tsx#L9-L13)), raid countery (`/[lang]/raids/[slug]`, 51 populárních bossů v [`raids/[slug]/page.tsx:10-20`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/raids/[slug]/page.tsx#L10-L20)), lídry Team GO Rocket (`/[lang]/rocket/[leader]`), 17 hloubkových průvodců (`/[lang]/guides/[guideId]`) a 1 025 položek Pokédexu (`/[lang]/pokemon/[id]`).
4. **Existující RSS 2.0 feed (`/feed.xml`):**
   - Route handler [`frontend/src/app/feed.xml/route.ts:19-71`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/feed.xml/route.ts#L19-L71) generuje při buildu statický soubor `frontend/dist/feed.xml` s validním `atom:link rel="self"` a 30 událostmi.
5. **Samostatné statické právní stránky:**
   - Na rozdíl od dřívějšího stavu (popsaného v `docs/research/adsense-rejection-analysis-and-monetization.md`) již v repozitáři existují statické indexovatelné stránky `/[lang]/privacy`, `/[lang]/about`, `/[lang]/terms`, `/[lang]/disclaimer` a `/[lang]/contact` (např. [`frontend/src/app/[lang]/privacy/page.tsx:1-74`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/privacy/page.tsx#L1-L74)) s vlastním `WebPage` / `AboutPage` JSON-LD a odkazy v [`Footer.tsx:202-206`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/Footer.tsx#L202-L206).

---

### 1.2. Audit vygenerovaného statického HTML v `frontend/dist/` (Co skutečně vidí vyhledávače)

Provedli jsme přímou inspekci vygenerovaných souborů v `frontend/dist/` (vzniklých příkazem `npm.cmd run build:deploy`, který spouští `next build` v režimu `output: 'export'` a následně [`frontend/post-build.js`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/post-build.js)). Výsledky ukazují dramatické rozdíly mezi jednotlivými routami:

| Statický soubor v `frontend/dist/` | Velikost HTML | Viditelný text před `<footer>` | `<div hidden id="S:0">` (Suspense) | `<h1>` v HTML | Skutečný stav sémantického obsahu v server-rendered HTML |
|---|---:|---:|---:|---|---|
| `dist/cs.html` (`dist/index.html`) | 124,5 KB | **26 znaků** (spinner) | **2 983 znaků** | `PoGo Events`, `Události` | V místě `.app-page-content-wrapper` je pouze `<div class="spinner">`. Obsah kalendáře je až na konci `<body>` ve skrytém `<div hidden id="S:0">`. |
| `dist/cs/raids.html` | 52,3 KB | **55 znaků** | 0 znaků | Pouze `PoGo Events` (v sidebaru) | **KRITICKÉ:** Obsahuje pouze text `Načítání raidů ze serveru...`. Žádný `<h1>` pro stránku, žádní raid bossové, žádné tabulky. |
| `dist/cs/rocket.html` | 52,0 KB | **63 znaků** | 0 znaků | Pouze `PoGo Events` (v sidebaru) | **KRITICKÉ:** Obsahuje pouze text `Načítání Team GO Rocket z serveru...`. Žádný `<h1>` pro stránku, žádné sestavy Giovanniho/lídrů. |
| `dist/cs/rankings.html` | 321,0 KB | **7 832 znaků** | 0 znaků | `PoGo Events`, `PvE Žebříčky Pokémonů` | **VÝBORNÉ:** Přímo v místě obsahu je vyrenderováno prvních 40 Pokémonů se statistikami, typy a útoky (protože [`rankings/page.tsx:65`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rankings/page.tsx#L65) volá přímo `<PokemonRankingsView />` bez `React.lazy`). |
| `dist/cs/rankings/great-league.html` | 323,5 KB | **7 832 znaků** | 0 znaků | `PoGo Events`, `PvE Žebříčky Pokémonů` | **CHYBA OBSAHU:** Metadata slibují *Great League Žebříček (CP ≤ 1500)*, ale [`rankings/[category]/page.tsx:296`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rankings/[category]/page.tsx#L296) vykreslí totožný **PvE žebříček** počínaje Mega Rayquazou (CP 6458)! |
| `dist/cs/pokemon/1.html` (Bulbasaur) | 88,0 KB | **26 znaků** (spinner) | **942 znaků** | `PoGo Events`, `PvE Žebříčky Pokémonů` | **KRITICKÉ:** [`pokemon/[id]/page.tsx:168`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/pokemon/[id]/page.tsx#L168) volá `<App initialTab="ranking" initialPokemonSearch="1" />`. Kvůli `useState(initialPokemonSearch)` vs. `pokemonRankings` filtru na `"1"` se vykreslí všechny ID obsahující číslici `1` (#18, #150, #145...) a detail Bulbasaura (top 5 movesetů, countery) **v HTML vůbec není** (vyžaduje rozkliknutí `isExpanded`). |
| `dist/cs/raids/mewtwo-counters.html` | 57,6 KB | **55 znaků** | 0 znaků | Pouze `PoGo Events` | **KRITICKÉ:** [`raids/[slug]/page.tsx:145`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/raids/[slug]/page.tsx#L145) předává `initialPokemonSearch={bossName}` do `<App initialTab="raid">`, ale [`App.tsx:1170`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/App.tsx#L1170) tento prop do `<RaidView>` vůbec nepředává a `RaidView` při SSR vypíše jen `Načítání raidů ze serveru...`! |
| `dist/cs/rocket/giovanni.html` | 57,7 KB | **63 znaků** | 0 znaků | Pouze `PoGo Events` | **KRITICKÉ:** [`rocket/[leader]/page.tsx:140`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rocket/[leader]/page.tsx#L140) volá `<App initialLang={lang} initialTab="rocket" />` (ani nepředává `leaderSlug`!) a v HTML je opět jen `Načítání Team GO Rocket z serveru...`. |
| `dist/cs/guides.html` | 85,5 KB | **26 znaků** (spinner) | **4 566 znaků** | `PoGo Events`, `Pokémon GO Strategické Průvodce a Návody` | Přehled 17 průvodců s `<h2>` nadpisy je přítomen, ale kvůli `React.lazy` v `App.tsx` je zabalen v `<div hidden id="S:0">`. |
| `dist/cs/guides/[guideId].html` | ~70–190 KB | **26 znaků** (spinner) | **1 500–12 000 znaků** | `PoGo Events`, `<Název článku>` | Plný text průvodce se sekcemi a tipy je v HTML přítomen, ale opět uvnitř `<div hidden id="S:0">` kvůli `React.lazy(GuidesView)`. |
| `dist/cs/events/[slug].html` | ~67–125 KB | **26 znaků** (spinner) | **0 nebo 528 znaků** | `PoGo Events`, `Události` | **KRITICKÉ:** [`events/[slug]/page.tsx:155`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/events/[slug]/page.tsx#L155) sice na serveru stáhne `event = await fetchEventDetails(slug)`, ale **vůbec ho nepředá do `<App />`** (`<App initialLang={validLang} initialEventId={slug} />` bez `initialEvents={[event]}`)! V důsledku toho `<App>` při buildu spadne do `MOCK_EVENTS` z června 2026 ([`App.tsx:69-201`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/App.tsx#L69-L201)) a hledaný event v HTML těle vůbec není! |
| `dist/cs/research.html`, `eggs.html`, `ditto.html` | 10,2 KB | **0 znaků** | 0 znaků | Žádné `<h1>` | Soubory [`research/page.tsx:37`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/research/page.tsx#L37), [`eggs/page.tsx:37`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/eggs/page.tsx#L37) a [`ditto/page.tsx:37`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/ditto/page.tsx#L37) volají serverový `redirect(...)`, který ve statickém exportu vytvoří prázdnou stránku s `NEXT_REDIRECT` template. |

#### Proč vzniká problém s `<div hidden id="S:0">` a vnořeným `<main>`:
1. V [`frontend/src/App.tsx:21-35`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/App.tsx#L21-L35) jsou všechny pohledy (`RaidView`, `RocketGuide`, `TimelineView`, `DittoEggsView`, `PokemonRankingsView`, `FilterGeneratorView`, `GuidesView`, `FriendFinderView`, `FieldResearchView`, `DownloadAppView`) importovány přes `React.lazy(...)` a v [`App.tsx:1043`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/App.tsx#L1043) obaleny do `<Suspense fallback={<div className="loading-container"><div className="spinner"></div></div>}>`. Při Next.js statickém exportu React vyrenderuje do hlavního `<main class="app-main">` pouze spinner a vyřešený lazy chunk vypíše až na konec `<body>` do `<div hidden id="S:0">` se skriptem `$RC("B:0","S:0")`. Jakýkoli crawler nebo AI agent, který nespouští JavaScript (nebo ignoruje elementy s atributem `hidden`), vidí v hlavní obsahové části prázdnou stránku!
2. Na stránkách, které používají `<App />` uvnitř `<AppShell />` (např. `/[lang]/guides/[guideId]`), navíc dochází k nevalidnímu vnoření dvou nebo dokonce tří elementů `<main>` (nebo `<h1>`), protože [`AppShell.tsx:214`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/AppShell.tsx#L214) vždy vykresluje v levém sidebaru `<h1>PoGo Events</h1>`, a poté samotná stránka vykreslí druhé `<h1>` (a u průvodce s vloženým `FieldResearchView` dokonce třetí `<h1>`!). Podle HTML5 specifikace nesmí být element `<main>` vnořen do jiného `<main>` a každá stránka by měla mít právě jeden primární `<h1>` reprezentující téma dané URL.

---

### 1.3. Kritické chyby v `sitemap.ts` a rozpor s kanonickými URL a Firebase Hostingem

Analýza souboru [`frontend/src/app/sitemap.ts:18-198`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts#L18-L198) a výsledného `frontend/dist/sitemap.xml` (**4 864 URL**) odhalila 4 závažné chyby porušující [Google Search Central — Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap):

1. **19 URL v `sitemap.xml` vrací přímo HTTP 404 na produkčním Firebase Hostingu:**
   - [`sitemap.ts:56`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts#L56) a [`sitemap.ts:60`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts#L60) přidávají `https://pogoevents.app/friends` a `https://pogoevents.app/research`. Jenže v [`frontend/src/app/[...slug]/page.tsx:10-13`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[...slug]/page.tsx#L10-L13) v množině `VALID_ROOT_ROUTES` položky `'friends'` a `'research'` **chybí**! Soubory `dist/friends.html` a `dist/research.html` se proto vůbec nevygenerují.
   - [`sitemap.ts:84-91`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts#L84-L91) generuje 17 bezjazykových URL `https://pogoevents.app/guides/${guide.slug}`. Protože `[...slug]/page.tsx` generuje pouze jednosegmentové routy (`slug: [route]`), v `dist/guides/` neexistuje jediný pod-soubor `.html`. Všech 17 URL vrací na Firebase Hostingu 404!
2. **37 URL v `sitemap.xml` má `<link rel="canonical">` směřující na jinou URL (Non-canonical URLs in sitemap):**
   - [`sitemap.ts:53-73`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts#L53-L73) vypisuje kořenové bezjazykové cesty (`/`, `/events`, `/raids`, `/rankings`, `/rocket`, `/guides`, `/ditto`, `/eggs`, `/filter`, `/settings`, `/download`, `/privacy`, `/privacy-policy`, `/about`, `/terms`, `/disclaimer`, `/contact`). Všechny tyto stránky mají v [`[...slug]/page.tsx:37-41`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[...slug]/page.tsx#L37-L41) nastavený kanonický odkaz na `/cs/...` (a `dist/index.html` je zkopírované `cs.html` s canonicalem `https://pogoevents.app/cs`).
   - [`sitemap.ts:97`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts#L97) a [`sitemap.ts:110`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts#L110) vypisují `/[lang]/events` (jejichž canonical v [`[lang]/events/page.tsx:25`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/events/page.tsx#L25) směřuje na `/[lang]`) a `/[lang]/privacy-policy` (jejichž canonical v [`[lang]/privacy-policy/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/privacy-policy/page.tsx) směřuje na `/[lang]/privacy`).
3. **12 URL v `sitemap.xml` jsou přesměrování (`NEXT_REDIRECT`):**
   - [`sitemap.ts:102,104,105`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts#L102-L105) zahrnuje `/[lang]/research`, `/[lang]/ditto` a `/[lang]/eggs`, přestože tyto stránky pouze přesměrovávají na `/[lang]/guides/...`.
4. **Neplatné `lastmod` (vždy `new Date()` při buildu) a chybějící `alternates.languages` v sitemapě:**
   - [`sitemap.ts:50`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts#L50) nastavuje všem 4 864 stránkám identický čas `lastModified: now`. Google v oficiální dokumentaci uvádí, že pokud se `lastmod` mění při každém buildu bez skutečné změny obsahu (např. u statických stránek Pokémonů #1–#1025), Google přestane značce `lastmod` důvěřovat.

---

### 1.4. Audit metadat, `<html lang>`, `canonical`, `hreflang` (`x-default`), OpenGraph a `/api/og`

1. **Globální chyba `<html lang="en">` na všech jazykových mutacích:**
   - V [`frontend/src/app/layout.tsx:45`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/layout.tsx#L45) je definováno `<html lang="en" data-theme="dark">`. Protože v Next.js App Routeru vnořený layout [`frontend/src/app/[lang]/layout.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/layout.tsx) nemůže přepsat atribut `lang` na kořenovém `<html>` elementu na serveru, mají **všechny vygenerované HTML soubory** (`dist/cs.html`, `dist/ja.html`, `dist/ru.html` atd.) v kódu `<html lang="en">`. K přepnutí `document.documentElement.lang = lang` dochází až na klientovi v `useEffect` ([`AppShell.tsx:49`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/AppShell.tsx#L49)). Pro čtečky obrazovky, AI crawlery a vyhledávače čtoucí statické HTML je tak český, japonský i ruský text označen jako angličtina (`en`)!
2. **Rozpor mezi `post-build.js` (`index.html` = `cs.html`) a klientským přesměrováním v `src/app/page.tsx`:**
   - V [`frontend/src/app/page.tsx:14-22`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/page.tsx#L14-L22) výchozí kořenová stránka `/` používá jako fallback jazyk `'en'` (`<App initialLang="en" />`).
   - Skript [`frontend/post-build.js:40-60`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/post-build.js#L40-L60) však po buildu vezme `dist/cs.html` a **přepíše jím `dist/index.html`**! Uživatel nebo bot na `https://pogoevents.app/` tak dostane českou stránku s `<link rel="canonical" href="https://pogoevents.app/cs">`, kterou následně klientský JS v `App.tsx:239,500-505` (kde `detectUserLanguage()` vrací `'en'`) přesměruje na `/en`!
3. **Úplná absence `x-default` v `hreflang` (`alternates.languages`) napříč celým projektem:**
   - Ani jedna z 20+ implementací `generateMetadata` v `frontend/src/app/[lang]/**/page.tsx` ani v [`backend/src/ssr.ts:548-551`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/ssr.ts#L548-L551) neobsahuje atribut `'x-default'` v `alternates.languages`. Podle [Google Search Central — Tell Google about localized versions of your page](https://developers.google.com/search/docs/specialty/international/localized-versions#xdefault) je `hreflang="x-default"` klíčový pro určení výchozí verze pro uživatele z jazykových oblastí mimo `cs`, `en`, `ja`, `ru` (např. Německo, Španělsko, Polsko, Latinská Amerika).
4. **Chybějící `canonical` a `hreflang` na stránkách `/[lang]/download` a `/[lang]/settings`:**
   - [`frontend/src/app/[lang]/download/page.tsx:1-23`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/download/page.tsx#L1-L23) **vůbec neexportuje `generateMetadata`**! Stránka `/cs/download` proto dědí obecný titulek z kořenového `layout.tsx` a v `dist/cs/download.html` **zcela chybí `<link rel="canonical">` i všechny `hreflang` tagy**.
   - [`frontend/src/app/[lang]/settings/page.tsx:20-25`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/settings/page.tsx#L20-L25) vrací v `generateMetadata` pouze české `title` a `description` pro všechny 4 jazyky a **rovněž postrádá `alternates.canonical` a `alternates.languages`** (případně `robots: { index: false }`, protože nastavení nemá v indexu co dělat).
5. **Nepřeložená metadata pro `ja` a `ru` na klíčových sekčních stránkách:**
   - V [`frontend/src/app/[lang]/raids/page.tsx:23-32`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/raids/page.tsx#L23-L32), [`rocket/page.tsx:23-32`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rocket/page.tsx#L23-L32), [`guides/page.tsx:23-32`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/guides/page.tsx#L23-L32) a [`filter/page.tsx:23-32`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/filter/page.tsx#L23-L32) se kontroluje pouze `const isCzech = lang === 'cs'`. Japonské (`/ja/raids`, `/ja/rocket`, `/ja/guides`, `/ja/filter`) a ruské (`/ru/...`) stránky proto dostávají **anglický `<title>` a `<meta name="description">`**!
   - Naopak v [`frontend/src/app/[lang]/events/[slug]/page.tsx:87,99`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/events/[slug]/page.tsx#L87) je `description` natvrdo česky (`Detail události ${title} v Pokémon GO...`) i pro `/en/`, `/ja/` a `/ru/`!
6. **Nevyužitý endpoint `/api/og` a chybějící `openGraph` / `twitter` metadata:**
   - V [`frontend/src/app/api/og/route.tsx:1-71`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/api/og/route.tsx#L1-L71) je připraven generátor dynamických OG obrázků (`ImageResponse` z `next/og`), ale má nastaveno `export const dynamic = 'force-static'`. Při statickém exportu bez query parametrů vygeneruje jen jeden statický soubor a **žádná stránka v celém repozitáři `/api/og` ve svých `openGraph.images` nevolá**.
   - Stránky [`raids/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/raids/page.tsx), [`rocket/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rocket/page.tsx), [`guides/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/guides/page.tsx) a [`filter/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/filter/page.tsx) vůbec nedefinují `openGraph` ani `twitter` metadata.
   - V [`guides/[guideId]/page.tsx:126`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/guides/[guideId]/page.tsx#L126) a [`friends/page.tsx:81`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/friends/page.tsx#L81) odkazuje logo vydavatele v JSON-LD na `https://pogoevents.app/logo-1080.png`, ale soubor v `frontend/public/` se ve skutečnosti jmenuje **`logo-icon-1080.png`** (nebo `logo-banner-square-1080.png`) — `logo-1080.png` vrací **404 Not Found**!

---

### 1.5. Audit strukturovaných dat JSON-LD (`Schema.org`) napříč typy stránek

| Typ stránky (Route) | Soubor | Aktuální JSON-LD schémata | Zjištěné chyby a nedostatky podle Google Search Central |
|---|---|---|---|
| Domovská stránka `/[lang]` a `/[lang]/events` | [`[lang]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/page.tsx), [`[lang]/events/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/events/page.tsx) | **ŽÁDNÉ (0)** | Chybí `WebSite` (s `inLanguage`), `Organization` a `ItemList` aktivních událostí. |
| Detail události `/[lang]/events/[slug]` | [`events/[slug]/page.tsx:128-147`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/events/[slug]/page.tsx#L128-L147) | `Event` | Chybí `BreadcrumbList`, chybí `inLanguage`, `description` je jen generické `"Pokémon GO event: ${title}"` v angličtině bez ohledu na `lang`. Časy `startDate` a `endDate` ze ScrapedDuck (`"2026-09-26T10:00:00.000"`) nemají časovou zónu (ISO 8601 offset), což Google Rich Results Test hlásí jako varování u `OnlineEventAttendanceMode`. |
| Přehled raidů `/[lang]/raids` | [`raids/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/raids/page.tsx) | **ŽÁDNÉ (0)** | Chybí `ItemList` / `Dataset` aktuálních raid bossů a `BreadcrumbList`. |
| Raid counter detail `/[lang]/raids/[slug]` | [`raids/[slug]/page.tsx:118-137`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/raids/[slug]/page.tsx#L118-L137) | `Article`, `BreadcrumbList` | V `Article` chybí doporučené vlastnosti `author`, `publisher`, `image` a `dateModified`. Text `headline` a `description` v JSON-LD je natvrdo anglicky i na `/cs/`, `/ja/`, `/ru/` (porušení pravidla jazykové konzistence strukturovaných dat). |
| Přehled Rocket `/[lang]/rocket` | [`rocket/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rocket/page.tsx) | **ŽÁDNÉ (0)** | Chybí `WebPage` / `ItemList` a `BreadcrumbList`. |
| Rocket Leader `/[lang]/rocket/[leader]` | [`rocket/[leader]/page.tsx:113-132`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rocket/[leader]/page.tsx#L113-L132) | `Article`, `BreadcrumbList` | V `Article` chybí `image`, `author`, `publisher`. Položky `BreadcrumbList` (`Home`, `Team GO Rocket`) nejsou lokalizované. |
| Přehled průvodců `/[lang]/guides` | [`guides/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/guides/page.tsx) | **ŽÁDNÉ (0)** | Chybí `CollectionPage` + `ItemList` se seznamem 17 průvodců. |
| Detail průvodce `/[lang]/guides/[guideId]` | [`guides/[guideId]/page.tsx:106-159`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/guides/[guideId]/page.tsx#L106-L159) | `Article`, `FAQPage`, `BreadcrumbList` | 1) `publisher.logo.url` odkazuje na neexistující `https://pogoevents.app/logo-1080.png` (404).<br>2) `FAQPage` převádí nadpisy všech sekcí článku (`1. Základní pravidla...`) na `Question`. Nadpisy, které nejsou otázkou, by měly být formulovány jako otázky nebo ponechány v `Article`. |
| Žebříčky `/[lang]/rankings` | [`rankings/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rankings/page.tsx) | **ŽÁDNÉ (0)** | Chybí `Dataset` / `ItemList` a `BreadcrumbList`. |
| Kategorie žebříčků `/[lang]/rankings/[category]` | [`rankings/[category]/page.tsx:269-288`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rankings/[category]/page.tsx#L269-L288) | `ItemList`, `BreadcrumbList` | `ItemList` má pouze `numberOfItems: 20`, ale **chybí mu pole `itemListElement`** se samotnými položkami žebříčku! Bez `itemListElement` je `ItemList` pro Google Rich Results nevalidní. |
| Detail Pokémona `/[lang]/pokemon/[id]` | [`pokemon/[id]/page.tsx:115-160`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/pokemon/[id]/page.tsx#L115-L160) | `ItemPage` (`mainEntity: Thing`), `BreadcrumbList` | `description` v `ItemPage` i `Thing` je natvrdo anglicky i pro `cs`, `ja`, `ru`. Chybí `additionalProperty` (`PropertyValue`) pro strukturované herní statistiky (Attack, Defense, Stamina, Max CP, Best Fast Move, Best Charged Move, eDPS). |
| Typové slabiny `/[lang]/types/[type]` | [`types/[type]/page.tsx:198-216`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/types/[type]/page.tsx#L198-L216) | `WebPage`, `BreadcrumbList` | Chybí `ItemList` nejlepších útočníků daného typu. |
| Přátelé `/[lang]/friends` | [`friends/page.tsx:69-84`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/friends/page.tsx#L69-L84) | `WebPage` | `publisher.logo.url` odkazuje na neexistující `logo-1080.png` (404), `name` a `description` jsou pouze anglicky. |
| Generátor filtrů `/[lang]/filter` | [`filter/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/filter/page.tsx) | **ŽÁDNÉ (0)** | Chybí `WebApplication` / `SoftwareApplication` JSON-LD popisující webový nástroj. |

---

### 1.6. Audit interního prolinkování (Problém 4 750+ osiřelých stránek a 404 odkazů v patičce)

Podle [Google Search Central — Make your links crawlable](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) dokáže Googlebot sledovat pouze odkazy tvořené elementem `<a>` s atributem `href`, který se překládá na platnou URL. Elementy s `onClick` bez `<a href>` vyhledávače ani AI crawleři **nikdy nenásledují**.

V repozitáři jsme ověřili všechny vygenerované odkazy `<a href>` v `frontend/dist/`:
1. **Každá hlavní stránka (`cs.html`, `cs/guides.html`, `cs/rankings.html`) obsahuje pouze 22 unikátních `<a href>` odkazů**, a to výhradně odkazy ze sidebaru (`AppShell.tsx`) a patičky (`Footer.tsx`).
2. **Dva ze tří odkazů na průvodce v `Footer.tsx` jsou rozbité (404):**
   - V [`frontend/src/components/Footer.tsx:170-171`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/Footer.tsx#L170-L171):
     ```tsx
     <li><Link href={`/${lang}/guides/team-go-rocket-leaders-counters-guide`}>{getTranslation('guideRocket')}</Link></li>
     <li><Link href={`/${lang}/guides/raid-boss-counters-and-hundo-iv-guide`}>{getTranslation('guideRaid')}</Link></li>
     ```
   - Skutečné slugy v [`frontend/src/data/guidesData.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/guidesData.ts) jsou však **`rocket-leaders-giovanni-guide`** a **`raid-battles-counter-guide`**! Tyto dva odkazy v patičce tedy na všech 4 864 stránkách generují tisíce interních 404 chyb!
3. **Karty v `GuidesView.tsx` nepoužívají `<a href>`:**
   - V [`frontend/src/components/GuidesView.tsx:4367-4371`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/GuidesView.tsx#L4367-L4371) je každá karta článku vykreslena jako `<article className="guide-card" onClick={() => handleArticleClick(article.slug)}>`. V `dist/cs/guides.html` proto **neexistuje ani jeden `<a href="/cs/guides/...">` odkaz** na 17 detailních průvodců!
4. **Karty v `PokemonRankingsView.tsx` nepoužívají `<a href>`:**
   - V [`frontend/src/components/PokemonRankingsView.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/PokemonRankingsView.tsx) nejsou žádné odkazy na `/[lang]/rankings/[category]`, `/[lang]/types/[type]` ani `/[lang]/pokemon/[id]`. Všech **4 092 stránek Pokémonů**, **104 stránek kategorií žebříčků** a **72 stránek typů** jsou **100% osiřelé stránky (Orphan Pages)** dostupné pouze ze `sitemap.xml`!
5. **Karty v `EventCard.tsx`, `RaidView.tsx` a `RocketGuide.tsx` nepoužívají `<a href>`:**
   - Stejně tak **192 stránek detailů událostí** (`/[lang]/events/[slug]`), **204 stránek raid counterů** (`/[lang]/raids/[slug]`) a **20 stránek lídrů Rocket** (`/[lang]/rocket/[leader]`) nemá nikde v aplikaci žádné crawlable `<a href>` odkazy.

---

### 1.7. Architektonická dvojkolejnost: Firebase Hosting (`dist/`) vs. Express Bot SSR (`backend/src/ssr.ts`)

V repozitáři existuje v [`backend/src/ssr.ts:247-753`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/ssr.ts#L247-L753) a [`backend/src/index.ts:1487-1660`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts#L1487-L1660) kompletní serverový pre-renderer `generateBotHtml()`, který detekuje boty pomocí funkce `isBot(userAgent)` a skládá pro ně bohaté sémantické HTML s živými událostmi, raidy a sestavami Team GO Rocket.

**Proč tento kód v produkci pro HTML stránky vůbec nefunguje:**
1. Podle [`frontend/firebase.json:122-130`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/firebase.json#L122-L130) směruje Firebase Hosting na Cloud Run (`pogo-tracker-backend`) **výhradně cesty `/api/**`**:
   ```json
   "rewrites": [
     {
       "source": "/api/**",
       "run": {
         "serviceId": "pogo-tracker-backend",
         "region": "europe-west3"
       }
     }
   ]
   ```
2. Všechny ostatní požadavky (např. `https://pogoevents.app/cs/raids`) obsluhuje přímo **Firebase Hosting CDN** ze složky `frontend/dist/`. Požadavek od Googlebota, SeznamBota nebo PerplexityBota na `/cs/raids` tedy **nikdy nedorazí na Express backend** (`backend/src/index.ts`), ale dostane statický soubor `frontend/dist/cs/raids.html` (který obsahuje jen `Načítání raidů ze serveru...`).
3. I kdyby požadavek na backend dorazil, funkce `isBot()` v [`backend/src/index.ts:1487-1510`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts#L1487-L1510) kontroluje pouze historické vyhledávače (`googlebot`, `bingbot`, `duckduckbot`...) a **vůbec neobsahuje moderní AI crawlery** (`gptbot`, `oai-searchbot`, `chatgpt-user`, `claudebot`, `claude-searchbot`, `claude-user`, `perplexitybot`, `perplexity-user`, `google-extended`, `applebot-extended`).

---

## Část 2: Současný stav GEO (Generative Engine Optimization)

**GEO (Generative Engine Optimization)** je disciplína optimalizace webu pro generativní vyhledávače a odpovědní enginy (**Google AI Overviews / AI Mode, ChatGPT Search, Perplexity, Claude Search, Microsoft Copilot**). Na rozdíl od klasického SEO, kde je cílem proklik z 10 modrých odkazů, je cílem GEO **být vybrán do RAG (Retrieval-Augmented Generation) kontextu modelu a získat přímou citaci se zdrojovým odkazem**.

### 2.1. Stávající podpora pro AI agenty (`/llms.txt`, `/llms-full.txt`, `/api/agent/*.md`)

Repozitář již obsahuje nadstandardní GEO infrastrukturu, která jej řadí před většinu herních webů:

1. **Statické soubory `/llms.txt` a `/llms-full.txt`:**
   - Umístěny v [`frontend/public/llms.txt`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/public/llms.txt) (30 řádků, 2 388 B) a [`frontend/public/llms-full.txt`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/public/llms-full.txt) (50 řádků, 3 140 B).
   - V [`frontend/firebase.json:95-120`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/firebase.json#L95-L120) mají explicitně nastavené hlavičky `Content-Type: text/plain; charset=utf-8` a `Cache-Control: public, max-age=3600, stale-while-revalidate=86400`.
2. **Dynamické Markdown endpointy v backendu (`/api/agent/*.md`):**
   - Implementovány v [`backend/src/agent/markdownGenerator.ts:1-231`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/agent/markdownGenerator.ts#L1-L231) a vystaveny v [`backend/src/index.ts:925-985`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts#L925-L985) (dostupné i přes Firebase Hosting díky rewritu `/api/**`):
     - `GET /api/agent/events.md` (podporuje `?lang=cs|en`)
     - `GET /api/agent/raids.md` (podporuje `?lang=cs|en`)
     - `GET /api/agent/research.md` (podporuje `?lang=cs|en`)
     - `GET /api/agent/summary.md` (kompletní exekutivní přehled aktivních eventů, 5★/Mega raidů, Giovanniho Shadow Pokémona a vajec v jediném dokumentu).
3. **Content Negotiation (`Accept: text/markdown`) na REST API:**
   - Endpointy `/api/events` ([`index.ts:774`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts#L774)), `/api/raids` ([`index.ts:861`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts#L861)) a `/api/research` ([`index.ts:908`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts#L908)) detekují hlavičku `Accept: text/markdown` nebo query parametr `?format=md` a vracejí přímo `text/markdown; charset=utf-8`.

---

### 2.2. Jak LLM crawleři čtou statické HTML v `dist/` (Slepota vůči CSR a React Suspense)

Klíčový rozdíl mezi Googlebotem a AI crawlery (`OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-SearchBot`, `PerplexityBot`) spočívá v tom, že **AI crawleři při stahování stránek nespouštějí klientský JavaScript (neprovádějí headless Chromium rendering kvůli latenci v řádu stovek milisekund při odpovídání na prompt)**. Čtou výhradně prvotní HTTP odpověď (surové HTML).

Co se stane, když se uživatel zeptá ChatGPT, Perplexity nebo Claude na aktuální data z `pogoevents.app`:
1. **Dotaz na raidy (`/cs/raids`, `/en/raids/mewtwo-counters`) nebo Team GO Rocket (`/cs/rocket`, `/en/rocket/giovanni`):**
   - AI crawler stáhne `dist/cs/raids.html` (52 KB). Po odstranění `<script>` a `<style>` tagů získá pouze text navigace, patičky a větu **`Načítání raidů ze serveru...`**.
   - **Výsledek:** AI vyhledávač na stránce nenajde žádné raid bossy, žádné CP rozsahy ani žádné countery a stránku z citací vyřadí!
2. **Dotaz na konkrétního Pokémona (`/cs/pokemon/1` až `/cs/pokemon/1025`):**
   - AI crawler vidí v JSON-LD pouze základní větu `Pokémon #1 with Attack: 118, Defense: 111, Stamina: 128, Max CP: 1115`, ale v HTML těle vidí místo Bulbasaura tabulku 40 náhodných Pokémonů obsahujících v ID číslici `1` (Pidgeot #18, Mewtwo #150...) a žádné countery ani top 5 útoků daného Pokémona!
3. **Dotaz na aktivní události (`/cs/events`) v `markdownGenerator.ts`:**
   - V [`backend/src/index.ts:930`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts#L930) se volá `generateEventsMarkdown(events, lang)` **bez třetího parametru `getDetails`**!
   - Podívejme se na [`backend/src/index.ts:926-933`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts#L926-L933) a [`index.ts:777`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts#L777):
     ```ts
     const md = generateEventsMarkdown(events, lang); // getDetails NENÍ předáno!
     ```
   - Protože parametr `getDetails` není předán, v [`markdownGenerator.ts:36,43`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/agent/markdownGenerator.ts#L36-L49) je `details` vždy `null` a **v `/api/agent/events.md` se nikdy nevypíší žádné bonusy událostí, žádné spawny ani žádné eventové výzkumy**, přestože je backend má v cache `details_${eventID}`!

---

### 2.3. Audit `robots.ts` / `robots.txt` vůči AI vyhledávacím a trénovacím botům (stav 2026)

V [`frontend/src/app/robots.ts:14-25`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/robots.ts#L14-L25) jsou explicitně povoleni tito agenti:
- `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-Web`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `Amazonbot`, `Mediapartners-Google`.

Podle oficiální dokumentace OpenAI, Anthropic a Perplexity platné v roce 2026 zde **chybí klíčoví dedikovaní vyhledávací boti (Search Indexing Bots)**, které tyto platformy oddělily od trénovacích crawlerů:
1. **`OAI-SearchBot`** (OpenAI Search Crawler, který indexuje weby přímo pro **ChatGPT Search** výsledky a citace; na rozdíl od `GPTBot`, který slouží pro trénování modelů).
2. **`Claude-SearchBot`** a **`Claude-User`** (Anthropic Search Indexer a Live User Fetcher pro vyhledávání v Claude, které nahradily zastaralý `Claude-Web`).
3. **`Perplexity-User`** (uživatelsky iniciovaný real-time fetcher Perplexity AI).
4. **`DuckAssistBot`** (AI odpovědní engine DuckDuckGo), **`YouBot`** (You.com AI Search) a **`Meta-ExternalAgent`** / **`Meta-ExternalFetcher`**.

*(Poznámka: Protože `User-Agent: *` má `Allow: /`, nejsou tito boti blokováni, ale podle GEO best practices a některých přísnějších parserů `robots.txt`, které při existenci specifických AI bloků vyžadují explicitní uvedení `OAI-SearchBot` a `Claude-SearchBot`, je vysoce doporučeno je uvést explicitně — a navíc nepoužívat nestandardní direktivu `Host: https://pogoevents.app` z [`robots.ts:31`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/robots.ts#L31), kterou Google Search Central i RFC 9309 označují za nepodporovanou).*

---

### 2.4. Audit souladu s oficiální specifikací `llmstxt.org` (v2, srpen 2026)

Porovnáním [`frontend/public/llms.txt`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/public/llms.txt) a [`frontend/public/llms-full.txt`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/public/llms-full.txt) s oficiální specifikací [The /llms.txt file, v2 (llmstxt.org, upraveno 10. 8. 2026)](https://llmstxt.org/) jsme identifikovali 4 nesoulady:

1. **Nefunkční endpoint `/api/agent/eggs.md` uvedený v `llms-full.txt`:**
   - Na řádku [`frontend/public/llms-full.txt:30`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/public/llms-full.txt#L30) je v tabulce uveden endpoint `/api/agent/eggs.md`. V [`backend/src/index.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts) ani v [`backend/src/agent/markdownGenerator.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/agent/markdownGenerator.ts) však tento endpoint **neexistuje** (chybí také `/api/agent/rocket.md` pro Team GO Rocket).
2. **Porušení striktní gramatiky `llms.txt` v sekci `## REST API Endpoints (JSON)`:**
   - Specifikace `llmstxt.org` v2 (sekce *Format*) stanoví, že každá H2 sekce v `/llms.txt` je tzv. *„file list"*, kde každá položka seznamu **musí obsahovat klikatelný Markdown odkaz `[název](url)`** následovaný volitelným `: popis`.
   - V [`frontend/public/llms.txt:24-29`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/public/llms.txt#L24-L29) jsou však položky zapsány jako prostý inline kód bez Markdown odkazu:
     ```markdown
     ## REST API Endpoints (JSON)
     - `GET /api/events`: Seznam všech událostí s detaily a bonusy
     ```
   - Programatické parsery `llms.txt` (včetně oficiálního `llms-txt` Python/JS parseru a Chrome Lighthouse auditu) tyto řádky nedokážou naparsovat jako URL zdroje.
3. **Statický a příliš stručný `/llms-full.txt`:**
   - Soubor `frontend/public/llms-full.txt` má pouhých **50 řádků (3,1 KB)** a obsahuje pouze obecný popis architektury a malou ukázkovou tabulku 6 typů. Konvence `/llms-full.txt` předpokládá, že tento soubor je **kompletní vypsanou znalostní bází celého webu** vygenerovanou při buildu (všech 17 průvodců, kompletní přehled herních mechanik, Adventure Effects, evolucí, přestrojení Ditto, úrovní trenéra 41–50, top 50 PvE útočníků a živých raidů/eventů).
4. **Chybějící `<link rel="alternate" type="text/markdown">` a `<link rel="describedby" href="/llms.txt">`:**
   - Specifikace `llmstxt.org` v2 (odstavec *Proposal*) explicitně doporučuje propojovat HTML stránky s jejich Markdown ekvivalenty a s `/llms.txt` pomocí standardních relací v HTML `<head>` i v HTTP hlavičce `Link:`:
     ```html
     <link rel="describedby" href="/llms.txt" type="text/markdown" />
     <link rel="alternate" type="text/markdown" href="/api/agent/events.md" />
     ```
   - V `pogoevents.app` tato vazba mezi HTML stránkami a `/api/agent/*.md` zatím nikde neexistuje, takže AI agent přicházející na `https://pogoevents.app/cs/raids` vůbec neví, že si může stáhnout čistý `/api/agent/raids.md`!

---

### 2.5. Citovatelnost faktů a statistik („Answer-First" struktura pro AI Overviews, ChatGPT Search a Perplexity)

Výzkumy GEO (např. Princeton/Georgia Tech/Allen AI GEO studie a analýzy citací v Perplexity a Google AI Overviews) ukazují, že generativní vyhledávače vybírají k citaci pasáže, které splňují 3 kritéria:
1. **Answer-First (Inverzní pyramida):** Hned pod `<h1>` nebo `<h2>` se nachází stručný, fakticky hustý odstavec (40–60 slov) nebo sémantická HTML tabulka `<table>`, která přímo odpovídá na otázku (např. *„Jaké jsou nejlepší countery na Mewtwo v Pokémon GO? Nejlepším Mega counterem je Mega Tyranitar (Bite + Brutal Swing, 29.4 eDPS) a Mega Gengar, ze stínových Pokémonů Shadow Chandelure a Shadow Mewtwo. Mewtwo (Psychic) je slabý na Bug, Dark a Ghost útoky (1.6× poškození) a jeho 100% IV CP v raidu je 2387 CP (Lvl 20), respektive 2984 CP při větrném počasí (Lvl 25)."*).
2. **Sémantické HTML tabulky (`<table>`, `<thead>`, `<tbody>`, `<dl>`) namísto hluboce zanořených `<div>` a `<span>`:**
   - V celém `frontend/src/components/` (`PokemonRankingsView.tsx`, `RaidView.tsx`, `RocketGuide.tsx`, `FieldResearchView.tsx`, `DittoEggsView.tsx`) jsou veškerá tabulková data vykreslována jako generické `<div>` a `<span>` s CSS třídami. Pro LLM parsery, které převádějí HTML do Markdownu (např. pomocí Readability / Turndown / Trafilatura), se z `<div>` karet stane nepřehledný shluk čísel, zatímco HTML `<table>` se převede na čistou Markdown tabulku `| Pokémon | Max CP | Rychlý útok | Nabíjecí útok | eDPS |`.
3. **Časové ukotvení a datová čerstvost (Freshness Signals):**
   - AI vyhledávače silně preferují zdroje, které přímo v textu a v JSON-LD (`dateModified`) uvádějí aktuální měsíc a rok (např. *„Aktualizováno pro říjen 2026"*). V `GuidesView.tsx` a `guidesData.ts` sice `updatedAt` existuje, ale u raidů, žebříčků, Pokémonů a typových stránek tento údaj v SSR HTML chybí.

---

## Část 3: Konkrétní návrhy úprav pro SEO (seřazené podle dopadu P0 / P1 / P2)

### Priorita P0 — Kritické blokátory indexace a crawlování (Nutné opravit okamžitě)

#### P0.1: Odstranění `React.lazy` z kritické SSR cesty a vykreslení plného sémantického HTML před hydratací
- **Problém:** Stránky `/[lang]/raids`, `/[lang]/rocket`, `/[lang]/raids/[slug]`, `/[lang]/rocket/[leader]`, `/[lang]/pokemon/[id]` a `/[lang]/events/[slug]` mají ve statickém HTML (`frontend/dist/`) buď pouze text `Načítání ze serveru...`, nebo skrytý `<div hidden id="S:0">`, nebo vykreslují obecný seznam místo detailu dané entity.
- **Konkrétní řešení v kódu:**
  1. V [`frontend/src/App.tsx:21-35`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/App.tsx#L21-L35) nahradit `React.lazy(...)` přímými statickými importy (nebo na jednotlivých App Router routách `frontend/src/app/[lang]/**/page.tsx` vykreslovat přímo cílovou komponentu jako to už dělá [`rankings/page.tsx:65`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rankings/page.tsx#L65), nikoli celou obálku `<App />`).
  2. V [`frontend/src/app/[lang]/raids/page.tsx:45-50`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/raids/page.tsx#L45-L50) a [`rocket/page.tsx:45-50`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rocket/page.tsx#L45-L50) načíst při buildu (`await fetch(`${API_BASE_URL}/api/raids`)` a `/api/rocket`) výchozí data a předat je jako `initialBosses` / `initialRocketData` props do `<RaidView />` a `<RocketGuide />` (stejně jako [`[lang]/page.tsx:64-82`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/page.tsx#L64-L82) předává `initialEvents`). Na klientovi se po hydrataci provede tichý background re-fetch.
  3. V [`frontend/src/app/[lang]/events/[slug]/page.tsx:155`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/events/[slug]/page.tsx#L155) předat stažený `event` do `<App initialLang={validLang} initialEventId={slug} initialEvents={[event]} />` a přímo v `page.tsx` vyrenderovat sémantický `<article>` s `<h1>{event.name}</h1>`, datem konání, bonusy a spawny.
  4. V [`frontend/src/app/[lang]/pokemon/[id]/page.tsx:162-170`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/pokemon/[id]/page.tsx#L162-L170), [`raids/[slug]/page.tsx:139-147`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/raids/[slug]/page.tsx#L139-L147) a [`rocket/[leader]/page.tsx:134-142`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rocket/[leader]/page.tsx#L134-L142) vyrenderovat přímo v `page.tsx` dedikovaný server-rendered blok (`<section className="seo-entity-hero">`) s `<h1>`, souhrnným odstavcem, sémantickou tabulkou `<table>` statistik/counterů a prolinkováním na příbuzné entity.

#### P0.2: Oprava rozbitých 404 odkazů v `Footer.tsx` a doplnění `<a href>` / `<Link>` na všechny karty
- **Problém:** [`Footer.tsx:170-171`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/Footer.tsx#L170-L171) odkazuje na neexistující URL a >4 750 podstránek nemá žádný interní `<a href>` odkaz.
- **Konkrétní řešení v kódu:**
  1. V [`frontend/src/components/Footer.tsx:170-171`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/Footer.tsx#L170-L171) opravit slugy na:
     - `/${lang}/guides/rocket-leaders-giovanni-guide`
     - `/${lang}/guides/raid-battles-counter-guide`
  2. V [`frontend/src/components/GuidesView.tsx:4390`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/GuidesView.tsx#L4390) obalit nadpis karty průvodce do `<Link href={`/${lang}/guides/${article.slug}`}>`.
  3. V [`frontend/src/components/EventCard.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/EventCard.tsx) obalit název události do `<Link href={`/${lang}/events/${event.eventID}`}>`.
  4. V [`frontend/src/components/PokemonRankingsView.tsx:458`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/PokemonRankingsView.tsx#L458) obalit název Pokémona do `<Link href={`/${lang}/pokemon/${poke.pokedexId}`}>` a přidat navigační sekci s `<Link>` odkazy na všech 26 kategorií `/[lang]/rankings/[category]` a 18 typů `/[lang]/types/[type]`.
  5. V [`frontend/src/components/RaidView.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/RaidView.tsx) a [`RocketGuide.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/RocketGuide.tsx) přidat `<Link>` odkazy na `/[lang]/raids/[boss]-counters` a `/[lang]/rocket/[leader]`.

#### P0.3: Vyčištění `sitemap.ts` od 404, přesměrovaných a nekanonických URL
- **Problém:** [`frontend/src/app/sitemap.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts) obsahuje 19 neexistujících (404) URL, 12 přesměrování a 37 nekanonických URL.
- **Konkrétní řešení v kódu:**
  1. Ze [`sitemap.ts:53-91`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts#L53-L91) **odstranit celý blok `rootSections` a bezjazykové `GUIDES_DATA`** (protože všechny mají kanonickou URL pod `/cs/...` nebo neexistují).
  2. Ze seznamu `sections` v [`sitemap.ts:95-115`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts#L95-L115) odstranit nekanonické a přesměrované cesty: `'/events'` (kanonická je `/${lang}`), `'/research'`, `'/ditto'`, `'/eggs'` (jsou přesměrovány na `/guides/...`), `'/privacy-policy'` (duplikát `'/privacy'`) a `'/settings'`.
  3. Ke každé položce v `sitemap.ts` přidat objekt `alternates: { languages: { cs: ..., en: ..., ja: ..., ru: ..., 'x-default': ... } }`, čímž Next.js vygeneruje plnohodnotné `<xhtml:link rel="alternate" hreflang="..." />` přímo do `sitemap.xml`.

#### P0.4: Oprava `<html lang>` a sjednocení chování kořenové URL `/` (`index.html`)
- **Problém:** [`layout.tsx:45`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/layout.tsx#L45) nastavuje natvrdo `<html lang="en">` pro všechny jazyky a [`post-build.js:58-60`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/post-build.js#L58-L60) přepisuje `dist/index.html` souborem `cs.html`.
- **Konkrétní řešení v kódu:**
  1. V [`frontend/post-build.js`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/post-build.js) přidat při kopírování `out/` -> `dist/` průchod přes vygenerované HTML soubory v `dist/cs/**`, `dist/ja/**` a `dist/ru/**` (včetně `dist/cs.html`, `dist/ja.html`, `dist/ru.html`), který nahradí `<html lang="en"` za `<html lang="cs"`, `<html lang="ja"` a `<html lang="ru"`. Jde o ~15 řádků v `post-build.js`, které 100% vyřeší omezení jednoho kořenového layoutu v Next.js statickém exportu bez rozbití routingu!
  2. V [`frontend/src/app/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/page.tsx) sjednotit výchozí jazyk s primárním jazykem webu (`cs` dle `AGENTS.md`, případně detekce `navigator.language`) a přidat `alternates.languages` včetně `'x-default': 'https://pogoevents.app/en'`.

---

### Priorita P1 — Vysoký dopad na SERP pozice, mezinárodní cílení a Rich Results

#### P1.1: Doplnění `x-default` do `alternates.languages` a oprava chybějících překladů metadat
- **Kde:** Všechny soubory `page.tsx` v `frontend/src/app/[lang]/**`.
- **Úprava:**
  1. Vytvořit sdílenou helper funkci `buildAlternates(lang: Language, pathSuffix: string)` v `frontend/src/utils/seoHelper.ts`, která vždy vrátí:
     ```ts
     alternates: {
       canonical: `https://pogoevents.app/${lang}${pathSuffix}`,
       languages: {
         cs: `https://pogoevents.app/cs${pathSuffix}`,
         en: `https://pogoevents.app/en${pathSuffix}`,
         ja: `https://pogoevents.app/ja${pathSuffix}`,
         ru: `https://pogoevents.app/ru${pathSuffix}`,
         'x-default': `https://pogoevents.app/en${pathSuffix}`,
       },
     }
     ```
  2. Doplnit chybějící `ja` a `ru` překlady `title` a `description` do [`raids/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/raids/page.tsx#L27-L32), [`rocket/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rocket/page.tsx#L27-L32), [`guides/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/guides/page.tsx#L27-L32), [`filter/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/filter/page.tsx#L27-L32) a [`events/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/events/[slug]/page.tsx#L87).
  3. Doplnit `generateMetadata` do [`download/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/download/page.tsx) a přidat `robots: { index: false, follow: true }` do [`settings/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/settings/page.tsx).

#### P1.2: Oprava obsahu na `/[lang]/rankings/[category]` (PvP vs. PvE)
- **Problém:** [`frontend/src/app/[lang]/rankings/[category]/page.tsx:296`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rankings/[category]/page.tsx#L296) vykresluje `<PokemonRankingsView lang={lang} initialSearchQuery={filterType || ''} />`. Pro kategorie `great-league`, `ultra-league`, `master-league`, `little-cup`, `best-mega`, `best-shadow`, `max-cp` a `best-gym-defenders` je `filterType` `undefined`, takže všech 8 těchto podstránek vykreslí **identickou tabulku PvE útočníků bez jakéhokoli filtru**!
- **Úprava:** Předat kategorii (`category`) přímo do `PokemonRankingsView` (např. `initialCategory={category}`), aby:
  - `best-mega` filtrovalo `poke.isMega || poke.isPrimal`,
  - `best-shadow` filtrovalo `poke.isShadow`,
  - `max-cp` řadilo podle `b.maxCp - a.maxCp`,
  - `best-gym-defenders` řadilo podle `b.defense * b.stamina`,
  - `great-league` / `ultra-league` / `little-cup` filtrovalo podle CP stropu a bulk skóre.

#### P1.3: Oprava a rozšíření JSON-LD strukturovaných dat (`Schema.org`)
- **Konkrétní úpravy:**
  1. Opravit neexistující URL loga `https://pogoevents.app/logo-1080.png` v [`guides/[guideId]/page.tsx:126`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/guides/[guideId]/page.tsx#L126) a [`friends/page.tsx:81`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/friends/page.tsx#L81) na existující **`https://pogoevents.app/logo-icon-1080.png`**.
  2. V [`rankings/[category]/page.tsx:273-278`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rankings/[category]/page.tsx#L273-L278) naplnit `itemListElement` v `ItemList` prvními 20 Pokémony dané kategorie (`ListItem` s `position`, `name` a `url: https://pogoevents.app/${lang}/pokemon/${poke.pokedexId}`).
  3. V [`pokemon/[id]/page.tsx:115-160`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/pokemon/[id]/page.tsx#L115-L160) lokalizovat `description` podle `validLang` a doplnit `additionalProperty` s `PropertyValue` objekty pro `Attack`, `Defense`, `Stamina`, `Max CP`, `Best Fast Move` a `Best Charged Move`.
  4. V [`[lang]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/page.tsx) přidat `WebSite` + `Organization` JSON-LD (včetně `sameAs` odkazů na Instagram `@pogoevents` a TikTok `@pogoevents2`).

---

### Priorita P2 — Střední dopad, technické doladění a sémantika

1. **Odstranění duplicitního `<h1>PoGo Events</h1>` ze sidebaru a vnořených `<main>` tagů:**
   - V [`frontend/src/components/AppShell.tsx:214`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/AppShell.tsx#L214) změnit `<h1>PoGo Events</h1>` v `.sidebar-logo` na `<span className="sidebar-brand-title">PoGo Events</span>` (stejně jako je tomu v `.app-header` na řádku 396). Každá stránka tak bude mít právě jeden unikátní, klíčovými slovy bohatý `<h1>` v hlavním obsahu.
   - Sjednotit umístění `<main>`: umístit `<main className="app-page-content-wrapper">` přímo do `AppShell.tsx:425` a v `App.tsx:1036` změnit `<main className="app-main">` na `<div className="app-main">`.
2. **Rozhodnutí o osudu `/[lang]/ditto`, `/[lang]/eggs` a `/[lang]/research`:**
   - Buď tyto 3 routy opět vykreslovat jako plnohodnotné samostatné stránky (`<DittoEggsView mode="ditto" />`, `<DittoEggsView mode="eggs" />`, `<FieldResearchView />` — které v kódu stále existují!), nebo pokud mají zůstat přesměrované na `/[lang]/guides/...`, odstranit je ze `sitemap.ts` a z `llms.txt`.

---

## Část 4: Konkrétní návrhy úprav pro GEO (seřazené podle dopadu P0 / P1 / P2)

### Priorita P0 — Okamžitá čitelnost a objevitelnost pro AI vyhledávače a agenty

#### P0.1: Oprava `generateEventsMarkdown` v `backend/src/index.ts` a doplnění `/api/agent/eggs.md` a `/api/agent/rocket.md`
- **Problém:**
  1. [`frontend/public/llms-full.txt:30`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/public/llms-full.txt#L30) inzeruje endpoint `/api/agent/eggs.md`, který v backendu neexistuje (vrací 404/HTML).
  2. [`backend/src/index.ts:777,930`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts#L930) volá `generateEventsMarkdown(events, lang)` bez callbacku `getDetails`, takže `/api/agent/events.md` nikdy neobsahuje bonusy, spawny ani detaily událostí.
- **Konkrétní řešení v kódu:**
  1. V [`backend/src/index.ts:777,930`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts#L930) předat třetí parametr:
     ```ts
     const getDetails = (id: string) => getFromCache<any>(`details_${id}`, 24 * 60 * 60 * 1000) || getStaleCache<any>(`details_${id}`);
     const md = generateEventsMarkdown(events, lang, getDetails);
     ```
  2. V [`backend/src/agent/markdownGenerator.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/agent/markdownGenerator.ts) doplnit funkce `generateEggsMarkdown(eggs, lang)` a `generateRocketMarkdown(rocket, lang)` a v [`backend/src/index.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts) zaregistrovat routy `GET /api/agent/eggs.md` a `GET /api/agent/rocket.md` (a také podporu `Accept: text/markdown` na `/api/eggs` a `/api/rocket`).

#### P0.2: Propojení HTML stránek s Markdown endpointy a `/llms.txt` podle specifikace `llmstxt.org` v2
- **Problém:** AI crawleři a prohlížečoví agenti (včetně Chrome Lighthouse Agentic Browsing auditu) hledají `<link rel="describedby" href="/llms.txt">` a `<link rel="alternate" type="text/markdown">`.
- **Konkrétní řešení v kódu:**
  1. Do [`frontend/src/app/layout.tsx:49`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/layout.tsx#L49) přidat:
     ```tsx
     <link rel="describedby" href="/llms.txt" type="text/markdown" title="LLM Knowledge Index" />
     <link rel="alternate" type="text/markdown" href="/api/agent/summary.md" title="Live Pokémon GO Summary (Markdown)" />
     <link rel="alternate" type="application/rss+xml" href="/feed.xml" title="Pokémon GO Events RSS Feed" />
     ```
  2. Na sekčních stránkách (`/events`, `/raids`, `/rocket`, `/research`, `/eggs`) přidat do `alternates.types` v `generateMetadata` odpovídající Markdown feed (`/api/agent/events.md?lang=${lang}`, `/api/agent/raids.md?lang=${lang}` atd.).
  3. Do [`frontend/firebase.json:14`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/firebase.json#L14) přidat globální HTTP hlavičku:
     ```json
     {
       "key": "Link",
       "value": "</llms.txt>; rel=\"describedby\"; type=\"text/markdown\", </api/agent/summary.md>; rel=\"alternate\"; type=\"text/markdown\""
     }
     ```

#### P0.3: Aktualizace `/llms.txt` do striktního formátu `llmstxt.org` v2 a automatické generování `/llms-full.txt` při buildu
- **Problém:** Sekce `## REST API Endpoints (JSON)` v [`frontend/public/llms.txt:24-29`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/public/llms.txt#L24-L29) nepoužívá Markdown odkazy `[name](url)` a `llms-full.txt` má pouze 50 statických řádků.
- **Konkrétní řešení v kódu:**
  1. V [`frontend/public/llms.txt`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/public/llms.txt) převést všechny položky pod H2 nadpisy na plné absolutní Markdown odkazy `- [GET /api/events](https://pogoevents.app/api/events): ...` a přidat sekci s přímými odkazy na všech 17 strategických průvodců.
  2. Vytvořit build skript (nebo rozšířit `post-build.js`), který při každém buildu vygeneruje bohatý `llms-full.txt` přímo ze zdrojových dat (`GUIDES_DATA`, `ADVENTURE_EFFECT_ITEMS`, `TRAINER_LEVELS_DATA`, `dittoDisguises`, `eggPools`, top 50 `pokemonRankings` a živá data z `/api/agent/summary.md`).

#### P0.4: Doplnění moderních AI Search crawlerů do `frontend/src/app/robots.ts`
- **Konkrétní řešení v kódu:**
  V [`frontend/src/app/robots.ts:14-25`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/robots.ts#L14-L25) rozšířit seznam explicitně povolených AI agentů o vyhledávací a citační boty zavedené v letech 2025–2026 a odstranit nevalidní direktivu `host`:
  ```ts
  userAgent: [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-SearchBot',
    'Claude-User',
    'Claude-Web',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Applebot-Extended',
    'Amazonbot',
    'DuckAssistBot',
    'YouBot',
    'Meta-ExternalAgent',
    'Mediapartners-Google',
  ],
  allow: '/',
  ```

---

### Priorita P1 — Zvýšení citovanosti v ChatGPT Search, Perplexity, Claude a Google AI Overviews

#### P1.1: Zavedení „Answer-First" (TL;DR) faktických bloků a sémantických `<table>` na klíčové stránky
- **Proč:** Generativní modely v RAG pipeline extrahují bloky o délce 40–80 slov s vysokou hustotou entit a čísel.
- **Konkrétní řešení v kódu:**
  1. **Na detailu Pokémona (`/[lang]/pokemon/[id]/page.tsx`):** Vyrenderovat přímo na serveru strukturovanou kartu s Answer-First shrnutím:
     > *„**Bulbasaur (#1)** je Pokémon typu **Grass / Poison** z 1. generace v Pokémon GO. Jeho maximální CP na Levelu 50 (100% IV: 15/15/15) je **1 260 CP** (Útok: 118, Obrana: 111, Výdrž: 128). Nejlepší PvE moveset je **Vine Whip + Power Whip** (eDPS: 18.4). Bulbasaur je nejvíce zranitelný útoky typu **Fire, Flying, Ice a Psychic** (1.6× poškození)."*
  2. **Na detailu Raid Bosse (`/[lang]/raids/[slug]/page.tsx`):** Vyrenderovat server-side sémantickou HTML tabulku `<table>` s 100% IV CP (Lvl 20 a Lvl 25 Weather Boost), typovými slabinami a Top 6 countery z [`frontend/src/data/raidCounters.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/raidCounters.ts) nebo [`pokemonCountersHelper.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/utils/pokemonCountersHelper.ts).
  3. **Na kategoriích žebříčků (`/[lang]/rankings/[category]/page.tsx`) a typových stránkách (`/[lang]/types/[type]/page.tsx`):** Použít sémantické `<table>` pro Top 20 Pokémonů dané kategorie/typu.

#### P1.2: Zpřístupnění `generateBotHtml` (`backend/src/ssr.ts`) pro AI agenty nebo sjednocení se statickým exportem
- **Problém:** Bohatý server-side HTML generátor v [`backend/src/ssr.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/ssr.ts) je na produkci nepoužitý, protože Firebase Hosting servíruje statické soubory z `dist/`.
- **Konkrétní řešení:**
  - Jakmile v kroku **P0.1** obohatíme statické Next.js stránky (`raids/page.tsx`, `rocket/page.tsx`, `pokemon/[id]/page.tsx`, `raids/[slug]/page.tsx`) o pre-fetched data přímo při buildu, statické HTML na Firebase CDN bude obsahovat plná data jak pro uživatele, tak pro všechny AI crawlery s odezvou < 30 ms.
  - V [`backend/src/index.ts:1487-1510`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts#L1487-L1510) přesto doporučujeme doplnit `oai-searchbot`, `gptbot`, `chatgpt-user`, `claudebot`, `claude-searchbot`, `perplexitybot` do pole `botUserAgents` pro případ přímých dotazů na Cloud Run URL.

---

### Priorita P2 — Pokročilá agentní integrace a strojově čitelné datové sady

1. **Rozšíření `/api/agent/*.md` o japonskou (`ja`) a ruskou (`ru`) lokalizaci:**
   - V [`backend/src/agent/markdownGenerator.ts:3`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/agent/markdownGenerator.ts#L3) rozšířit `export type AgentLanguage = 'cs' | 'en' | 'ja' | 'ru'` a podporovat `?lang=ja` a `?lang=ru` pro globální dotazy v Perplexity a ChatGPT.
2. **Statické `.md` zrcadlení průvodců (`/guides/[slug].md`):**
   - Podle doporučení `llmstxt.org` v2 (*„provide a clean markdown version of those pages at the same URL as the original page, with `.md` appended"*) vygenerovat v `post-build.js` pro každého ze 17 průvodců statický soubor `dist/[lang]/guides/[slug].md`, na který bude daná stránka odkazovat přes `<link rel="alternate" type="text/markdown" href="/cs/guides/[slug].md" />`.

---

## Bibliografie a citace primárních zdrojů

### A. Primární zdroje v repozitáři (`C:\PROJEKTY\OSOBNÍ\Pokemon-GO-event-tracker`)
1. **Konfigurace a build pipeline:**
   - [`frontend/firebase.json:1-133`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/firebase.json#L1-L133) — CDN Cache-Control hlavičky, `/llms.txt` MIME typy, Cloud Run rewrite pouze pro `/api/**`.
   - [`frontend/next.config.mjs:1-31`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/next.config.mjs#L1-L31) — Podmíněný `output: 'export'` při `NEXT_PUBLIC_BUILD_TARGET=export`.
   - [`frontend/post-build.js:1-99`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/post-build.js#L1-L99) — Kopírování `out/` do `dist/` a přepisování `dist/index.html` souborem `dist/cs.html` (řádky 58–60).
2. **App Router routy, metadata, sitemapa a robots:**
   - [`frontend/src/app/layout.tsx:17-83`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/layout.tsx#L17-L83) — Globální metadata a natvrdo definované `<html lang="en">` (řádek 45).
   - [`frontend/src/app/sitemap.ts:18-198`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts#L18-L198) — Generátor 4 864 URL včetně neexistujících bezjazykových cest (řádky 56, 60, 84–91).
   - [`frontend/src/app/robots.ts:1-34`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/robots.ts#L1-L34) — Pravidla pro crawlery a AI agenty.
   - [`frontend/src/app/feed.xml/route.ts:1-72`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/feed.xml/route.ts#L1-L72) — RSS 2.0 XML generátor.
   - [`frontend/src/app/api/og/route.tsx:1-71`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/api/og/route.tsx#L1-L71) — Dynamický OG generátor se statickým exportem.
   - [`frontend/src/app/[...slug]/page.tsx:10-70`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[...slug]/page.tsx#L10-L70) — Kořenový catch-all route (`VALID_ROOT_ROUTES`).
   - [`frontend/src/app/[lang]/page.tsx:1-84`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/page.tsx#L1-L84), [`events/page.tsx:1-84`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/events/page.tsx#L1-L84), [`events/[slug]/page.tsx:1-159`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/events/[slug]/page.tsx#L1-L159), [`raids/page.tsx:1-51`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/raids/page.tsx#L1-L51), [`raids/[slug]/page.tsx:1-149`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/raids/[slug]/page.tsx#L1-L149), [`rocket/page.tsx:1-51`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rocket/page.tsx#L1-L51), [`rocket/[leader]/page.tsx:1-144`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rocket/[leader]/page.tsx#L1-L144), [`guides/page.tsx:1-51`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/guides/page.tsx#L1-L51), [`guides/[guideId]/page.tsx:1-171`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/guides/[guideId]/page.tsx#L1-L171), [`rankings/page.tsx:1-67`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rankings/page.tsx#L1-L67), [`rankings/[category]/page.tsx:1-300`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rankings/[category]/page.tsx#L1-L300), [`pokemon/[id]/page.tsx:1-172`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/pokemon/[id]/page.tsx#L1-L172), [`types/[type]/page.tsx:1-228`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/types/[type]/page.tsx#L1-L228), [`friends/page.tsx:1-96`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/friends/page.tsx#L1-L96), [`filter/page.tsx:1-51`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/filter/page.tsx#L1-L51), [`download/page.tsx:1-23`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/download/page.tsx#L1-L23), [`settings/page.tsx:1-35`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/settings/page.tsx#L1-L35), [`research/page.tsx:1-40`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/research/page.tsx#L1-L40), [`eggs/page.tsx:1-40`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/eggs/page.tsx#L1-L40), [`ditto/page.tsx:1-40`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/ditto/page.tsx#L1-L40).
3. **Klientské komponenty a navigace:**
   - [`frontend/src/App.tsx:21-35, 356-512, 1036-1258`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/App.tsx#L21-L35) — `React.lazy` + `<Suspense>` způsobující odsunutí obsahu do `<div hidden id="S:0">`.
   - [`frontend/src/components/AppShell.tsx:211-431`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/AppShell.tsx#L211-L431) — Globální layout a duplicitní `<h1>PoGo Events</h1>` (řádek 214).
   - [`frontend/src/components/Footer.tsx:145-220`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/Footer.tsx#L145-L220) — Neplatné 404 odkazy na průvodce (řádky 170–171).
4. **GEO a Backend Agent vrstva:**
   - [`frontend/public/llms.txt:1-30`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/public/llms.txt#L1-L30) a [`frontend/public/llms-full.txt:1-50`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/public/llms-full.txt#L1-L50).
   - [`backend/src/agent/markdownGenerator.ts:1-231`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/agent/markdownGenerator.ts#L1-L231) — Generátory Markdownu pro AI agenty.
   - [`backend/src/index.ts:770-985, 1487-1660`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts#L770-L985) — Endpointy `/api/agent/*.md`, podpora `Accept: text/markdown` a detekce botů `isBot()`.
   - [`backend/src/ssr.ts:1-754`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/ssr.ts#L1-L754) — Pre-rendering pro boty.

### B. Oficiální webové specifikace a dokumentace
1. **Google Search Central — Localized Versions (`hreflang` & `x-default`):** [https://developers.google.com/search/docs/specialty/international/localized-versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
2. **Google Search Central — Build and Submit a Sitemap:** [https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
3. **Google Search Central — Make Your Links Crawlable (`<a href>`):** [https://developers.google.com/search/docs/crawling-indexing/links-crawlable](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
4. **Google Search Central — Understand JavaScript SEO Basics:** [https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
5. **The `/llms.txt` Specification, v2 (Jeremy Howard / Answer.AI, srpen 2026):** [https://llmstxt.org/](https://llmstxt.org/)
6. **Chrome Lighthouse — Agentic Browsing `/llms.txt` Audit:** [https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)
7. **OpenAI Crawlers Documentation (`OAI-SearchBot`, `GPTBot`, `ChatGPT-User`):** [https://platform.openai.com/docs/bots](https://platform.openai.com/docs/bots)
8. **Anthropic Crawlers Documentation (`Claude-SearchBot`, `ClaudeBot`, `Claude-User`):** [https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
9. **Perplexity Crawlers Documentation (`PerplexityBot`, `Perplexity-User`):** [https://docs.perplexity.ai/guides/bots](https://docs.perplexity.ai/guides/bots)
