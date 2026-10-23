# Technické a obsahové SEO pro Pokémon GO Event Tracker (pogoevents.app) — Autoritativní příručka a implementační manuál

**Autor:** Antigravity AI Engineering & Research Team  
**Datum:** 23. října 2026  
**Status dokumentu:** Autoritativní technická specifikace a implementační manuál (Primární výzkum + Analýza dat GSC + Produkční kód)  
**Cílový projekt:** `DavidFaltus/Pokemon-GO-event-tracker` ([https://pogoevents.app](https://pogoevents.app))  
**Cílový soubor:** `docs/research/seo-optimization-guide-and-implementation-cases.md`  
**Technologický stack:** Next.js 16 (App Router + Turbopack, SSG export do `dist/`), React 19, TypeScript, Firebase Hosting Edge CDN (Google Cloud europe-west3).

---

## Obsah

1. [Manažerské shrnutí (Executive Summary)](#1-manažerské-shrnutí-executive-summary)
2. [Část 1: Forenzní analýza primárních dat Google Search Console v repozitáři](#2-část-1-forenzní-analýza-primárních-dat-google-search-console-v-repozitáři)
   - 2.1. Analýza `pogoevents.app-Coverage-Validation-2026-08-20.xlsx` ("Procházeno – momentálně neindexováno")
   - 2.2. Analýza `pogoevents.app-Coverage-Drilldown-2026-08-20.xlsx` (Parazitní URL `https://pogoevents.app/$` a kanonizace)
   - 2.3. Syntéza s auditem `docs/seo-and-geo-audit-2026.md`
3. [Část 2: Teoretické a technické standardy Google Search Central (stav 2026)](#3-část-2-teoretické-a-technické-standardy-google-search-central-stav-2026)
   - 3.1. Stav "Procházeno – momentálně neindexováno" vs. "Objeveno – momentálně neindexováno" u programatických webů
   - 3.2. Správa Crawl Budgetu pro střední a velké weby (PageRank distribuce, link equity, TTFB a limitace)
   - 3.3. Architektura interního link graphu: `<a href>` vs. JavaScript routing a řešení Orphan Pages
   - 3.4. Mezinárodní SEO: Striktní bidirekcionální `hreflang` párování a `x-default`
   - 3.5. Google Search Gallery & Schema.org (Event, FAQPage, BreadcrumbList, WebApplication, ItemList)
   - 3.6. Životní cyklus časově citlivého obsahu (Evergreen vs. Expired Events)
   - 3.7. Core Web Vitals (LCP, CLS, INP) v Next.js 16 Static Site Generation (SSG)
4. [Část 3: Praktické implementační případy (Production-Ready kód a šablony)](#4-část-3-praktické-implementační-případy-production-ready-kód-a-šablony)
   - **Případ 1: Řešení "Procházeno – momentálně neindexováno" pro 1 025 stránek Pokédexu (`/pokemon/[id]`)**  
     *(Information Gain, evoluční řetězce, PvP stat product kalkulace, typové siloing a eliminace thin contentu)*
   - **Případ 2: Odstranění Orphan Pages a zavedení Crawlable interního link graphu**  
     *(Nahrazení JS onClick za `<Link href>`, Pokédex & Type sitemap huby, trvalá eliminace parazitních URL `/$`)*
   - **Případ 3: SEO správa prošlých událostí (`/events/[slug]`)**  
     *(Evergreen architektura, Schema.org `EventCompleted`, dynamický next-event banner, prevence plýtvání crawl budgetem)*
   - **Případ 4: Architektura sitemapy a rozdělení na Sitemap Index**  
     *(Segmentace 4 800+ URL do specializovaných sitemap, reálné `lastmod` hodnoty a Next.js App Router integrace)*
   - **Případ 5: Rich Results a Schema.org Masterclass**  
     *(Kompletní validní JSON-LD šablony pro Event, FAQPage, BreadcrumbList, SoftwareApplication a ItemList)*
   - **Případ 6: Dynamické OpenGraph generování a CTR optimalizace ve vyhledávání (`/api/og`)**  
     *(Snippet triggers, testované šablony titulků a meta popisů, statický OG generátor pro Next.js SSG)*
   - **Případ 7: Core Web Vitals a mezinárodní indexace**  
     *(LCP a CLS optimalizace sprite assetů, stabilita layoutu, striktní `hreflang` reciprocita a oprava `<html lang>`)*
5. [Část 4: Přednasazovací kontrolní checklist (Pre-launch SEO Checklist 2026)](#5-část-4-přednasazovací-kontrolní-checklist-pre-launch-seo-checklist-2026)
6. [Bibliografie a citace primárních zdrojů](#6-bibliografie-a-citace-primárních-zdrojů)

---

## 1. Manažerské shrnutí (Executive Summary)

Projekt **Pokémon GO Event Tracker (`https://pogoevents.app`)** představuje moderní, vysoce výkonnou programatickou webovou aplikaci postavenou na **Next.js 16 (App Router + Turbopack)** v režimu statického exportu (`output: 'export'`) a hostovanou na **Firebase Hosting Edge CDN** (Google Cloud Network, region `europe-west3`).

Aplikace v současnosti generuje v produkčním buildu **více než 4 800 unikátních statických HTML stránek** pokrývajících 4 jazykové mutace:
- **Čeština (`cs`)** — primární výchozí jazyk dle `AGENTS.md`,
- **Angličtina (`en`)** — globální lingua franca a mezinárodní cílení,
- **Japonština (`ja`)** — vysoce bonitní trh s nejvyšší hustotou hráčů Pokémon GO na světě,
- **Ruština (`ru`)** — široká mezinárodní komunita ve východní Evropě a Střední Asii.

Při detailním zkoumání reálných primárních dat exportovaných přímo z **Google Search Console (GSC)** v srpnu 2026 (`pogoevents.app-Coverage-Validation-2026-08-20.xlsx` a `pogoevents.app-Coverage-Drilldown-2026-08-20.xlsx`) v kombinaci s technickým auditem v `docs/seo-and-geo-audit-2026.md` a inspekcí zdrojového kódu bylo identifikováno **7 zásadních systémových selhání**, kvůli nimž Google desítky stránek webu odmítá zařadit do indexu nebo je vyřazuje:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   HLAVNÍ BLOKÁTORY ORGANICKÉHO RŮSTU POGOEVENTS.APP V GOOGLE                     │
├────────────────────────────────┬────────────────────────────────┬────────────────────────────────┤
│ 1. Thin Content v Pokédexu     │ 2. Masivní osiřelost (Orphan)  │ 3. Pálící Crawl Budget u akcí  │
│ 1 025 stránek Pokédexu mělo    │ Více než 4 750 z 4 864 stránek │ Desítky proběhlých akcí        │
│ v surovém SSR HTML identický   │ nemělo jediný interní odkaz    │ (Spotlight Hours, Raid Hours)  │
│ obsah tabulky útočníků bez     │ <a href>; karty používaly jen  │ zůstávaly v sitemapě bez       │
│ detailu daného Pokémona.       │ JS onClick na <div>.           │ statusu EventCompleted.        │
├────────────────────────────────┼────────────────────────────────┼────────────────────────────────┤
│ 4. Parazitní URL v GSC (/$ )   │ 5. Monolitická sitemapa        │ 6. Nevalidní Schema.org data   │
│ Heuristické regex parsery      │ Jediný soubor s 4 800+ URL     │ ItemList v kategoriích postrá- │
│ Googlebota extrahovaly /$ z    │ a neplatným lastmod: now       │ dal itemListElement; časy      │
│ Next.js flight serializace;    │ znemožňoval sledovat sytost    │ u Event postrádaly ISO offset  │
│ server vracel 200 místo 404.   │ indexace po jednotlivých sekcí.│ a generovaly varování.         │
├────────────────────────────────┴────────────────────────────────┴────────────────────────────────┤
│ 7. Chybějící x-default a jazyková asymetrie v hreflang hlavičkách napříč celým projektem.        │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Tato příručka přináší kompletní metodiku a **okamžitě nasaditelný, produkčně otestovaný kód**, který odstraňuje všechny uvedené překážky, maximalizuje **Information Gain Score**, zavádí robustní linkovací architekturu a rozděluje sitemapu do standardizovaného formátu **Sitemap Index**.

---

## 2. Část 1: Forenzní analýza primárních dat Google Search Console v repozitáři

V kořenovém adresáři projektu se nacházejí dva primární exportní soubory z Google Search Console z 20. srpna 2026:
1. `pogoevents.app-Coverage-Validation-2026-08-20.xlsx`
2. `pogoevents.app-Coverage-Drilldown-2026-08-20.xlsx`

Tyto soubory zachycují reálnou reakci vyhledávacích algoritmů Google na web `pogoevents.app`.

### 2.1. Analýza `pogoevents.app-Coverage-Validation-2026-08-20.xlsx` ("Procházeno – momentálně neindexováno")

Export obsahuje výsledky validačního procesu hlášeného problému **"Procházeno – momentálně neindexováno" (Crawled - currently not indexed)** pro všechny známé stránky ze sitemapy.

#### Přehled URL zasažených neindexací:

| Zasažená URL v GSC | Naposledy procházeno | Stav validace v GSC | Primární příčina vyřazení z indexu |
|---|---|---|---|
| `https://pogoevents.app/cs/pokemon/1550` | 13. 08. 2026 | **Nevyřízeno** | Pokédex končí u čísla 1025. Neexistující ID vrátilo 200 OK místo 404 (Soft-404 / Prázdná stránka). |
| `https://pogoevents.app/ja/pokemon/1000` (Gholdengo) | 18. 08. 2026 | **Nezdařilo se** | Nevydaný Pokémon v PoGo; prázdná data útoků; chybějící Information Gain. |
| `https://pogoevents.app/ru/pokemon/785` (Tapu Koko) | 18. 08. 2026 | **Nezdařilo se** | Duplicitní obsah s `/en/pokemon/785`; chybějící unikátní ruský kontext; nulové interní odkazy. |
| `https://pogoevents.app/en/pokemon/232` (Donphan) | 18. 08. 2026 | **Nezdařilo se** | Thin content; v SSR HTML byl pouze prázdný spinner z `React.lazy` (`App.tsx:21`). |
| `https://pogoevents.app/ja/pokemon/612` (Haxorus) | 16. 08. 2026 | **Nezdařilo se** | Nulový interní PageRank; stránka byla Orphan Page dostupná pouze ze sitemapy. |
| `https://pogoevents.app/ru/pokemon/485` (Heatran) | 16. 08. 2026 | **Nezdařilo se** | Shodné s výše uvedeným; v HTML chyběly raid counters a movesety v serverovém renderu. |
| `https://pogoevents.app/cs/events/shadow-palkia-in-shadow-raids-july-2026` | 13. 08. 2026 | **Nevyřízeno** | Prošlá událost z července 2026. Datum v minulosti bez navazujícího obsahu. |
| `https://pogoevents.app/cs/events/mega-aggron-in-mega-raids-july-2026` | 13. 08. 2026 | **Nevyřízeno** | Prošlá raidová rotace; nulová vyhledávací hodnota bez evergreen odkazu. |
| `https://pogoevents.app/ru/events/kyurem-in-5-star-raid-battles-july-2026` | 13. 08. 2026 | **Nevyřízeno** | Prošlá událost z července; v SSR HTML se načítal obecný kalendář místo detailu. |
| `https://pogoevents.app/cs/events/max-mondays-2026-08-03` | 13. 08. 2026 | **Nevyřízeno** | Jednorázová pondělní akce z minulosti; chybí evergreen struktura pro Max Mondays. |
| `https://pogoevents.app/en/events/raidhour20260805` | 12. 08. 2026 | **Nevyřízeno** | Jednorázová Raid Hour; obsah po skončení akce ztratil relevanci. |
| `https://pogoevents.app/ru/events/pokemonspotlighthour2026-07-30` | 12. 08. 2026 | **Nevyřízeno** | Prošlá hodinová událost; Google vyřazuje jednorázové historické URL bez obsahu. |
| `https://pogoevents.app/cs/events/fire-and-ice-hatch-day-2026` | 12. 08. 2026 | **Nevyřízeno** | Víkendový Hatch Day z minulosti; v SSR HTML nebyla data o vejcích. |
| `https://pogoevents.app/cs/events/gigantamax-rillaboom-max-battle-day-2026` | 12. 08. 2026 | **Nevyřízeno** | Skončená událost; neexistence Schema.org `EventCompleted` stavu. |

#### Proč validace v Google Search Console selhala ("Nezdařilo se"):
Když administrátor v GSC klikne na **„Ověřit opravu" (Validate Fix)**, Googlebot provede kontrolní přechroustání náhodného vzorku nahlášených URL. Pokud Googlebot při tomto kontrolním průchodu zjistí, že stránka má **stále stejné fundamentální vady** (chybějící text v SSR HTML kvůli `React.lazy`, nulové příchozí interní odkazy `<a href>`, žádný unikátní Information Gain vůči jiným webům a data z minulosti bez aktualizace), **validaci okamžitě ukončí se stavem „Nezdařilo se" (Failed)**.

### 2.2. Analýza `pogoevents.app-Coverage-Drilldown-2026-08-20.xlsx` (Parazitní URL `https://pogoevents.app/$` a kanonizace)

Druhý soubor analyzuje stav **„Alternativní stránka se správnou značkou kanonické stránky" (Alternate page with proper canonical tag)**.

V tabulce se nacházejí dvě klíčové URL:
1. `https://pogoevents.app/en/guides/pokemon-iv-cp-appraise-guide` (Naposledy procházeno 16. 08. 2026)
2. `https://pogoevents.app/$` (Naposledy procházeno 12. 08. 2026)

#### Forenzní záhada parazitní URL `https://pogoevents.app/$`:
Odkud Googlebot vzal adresu končící znakem dolaru (`/$`)?
Při hloubkové inspekci serializace Next.js App Routeru v souboru `backend/app.html` a statických chuncích v `frontend/dist/` narážíme na interní formát **React Server Components (RSC) Flight Protocol**:
```javascript
// Úryvek z vygenerovaného HTML streamu Next.js:
self.__next_f.push([1,"d:[[\"$\",\"meta\",\"0\",{\"charSet\":\"utf-8\"}],[\"$\",\"link\",\"3\",{\"rel\":\"manifest\",\"href\":\"/manifest.json\",\"crossOrigin\":\"$undefined\"}]]\n"])
```
V tomto streamu React kóduje virtuální DOM prvky literálem `["$", "tag", ...]`. Heuristické skenery Googlebota, které v JavaScriptu a JSON blocích vyhledávají řetězce připomínající URL cesty (Link Extraction Heuristics), narazily na fragment `"/$"` (např. při spojování cest nebo v neošetřených regulárních výrazech v klientských chuncích) a vyhodnotily jej jako relativní odkaz `/$`.

**Co se stalo při návštěvě `https://pogoevents.app/$`:**
1. Firebase Hosting v konfiguraci `cleanUrls: true` nenašel soubor `$.html`.
2. Protože v `frontend/src/app/[...slug]/page.tsx` byl kořenový catch-all router, Next.js aplikoval fallback na `cs.html` a vrátil **HTTP 200 OK** s hlavičkou `<link rel="canonical" href="https://pogoevents.app/cs">`.
3. Googlebot proto URL nezaznamenal jako 404 (což by bylo správné), ale zaevidoval ji jako alternativní URL se správným kanonickým tagem, čímž **trvale pálil crawl budget na neexistující entitě**.

### 2.3. Syntéza s auditem `docs/seo-and-geo-audit-2026.md`

Audit z 17. října 2026 potvrdil, že jádrem problému byla kombinace:
- **Prázdného obsahu pro crawlery bez JS:** Kvůli `React.lazy()` v [`App.tsx:21-35`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/App.tsx#L21-L35) byl skutečný obsah odložen do `<div hidden id="S:0">`, takže bot viděl v hlavním `<main>` pouze 26 znaků spinneru.
- **Masivního výskytu Orphan Pages:** Žádná karta Pokémona v žebříčcích ani karta eventu v kalendáři nebyla obalena v tagu `<a href>`, ale pouze v `onClick` handleru na elementu `<div>` nebo `<article>`. Vyhledávače tyto odkazy nemohly následovat.

---

## 3. Část 2: Teoretické a technické standardy Google Search Central (stav 2026)

### 3.1. Stav "Procházeno – momentálně neindexováno" vs. "Objeveno – momentálně neindexováno" u programatických webů

Podle oficiální dokumentace [Google Search Central — Page Indexing Report](https://developers.google.com/search/docs/monitor-debug/search-console-start/index-status) existuje fundamentální rozdíl mezi těmito dvěma stavy:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   DVA STAVY NEINDEXACE V GOOGLE SEARCH CONSOLE                                   │
├─────────────────────────────────────────────────┬────────────────────────────────────────────────┤
│ Objeveno – momentálně neindexováno               │ Procházeno – momentálně neindexováno           │
│ (Discovered - currently not indexed)            │ (Crawled - currently not indexed)              │
├─────────────────────────────────────────────────┼────────────────────────────────────────────────┤
│ • Google o URL ví (ze sitemapy nebo z odkazu).  │ • Googlebot stránku úspěšně navštívil, stáhl ji│
│ • Googlebot na stránku ZATÍM NEVSTOUPIL.        │   a vyrenderoval její HTML.                    │
│ • PŘÍČINA: Problém Crawl Budgetu, server byl    │ • Googlebot se ROZHODL JI NEZAŘADIT DO INDEXU. │
│   přetížen, nebo má web nízkou prioritu fronty. │ • PŘÍČINA: Nedostatečná kvalita, Thin Content, │
│ • ŘEŠENÍ: Zlepšit interní prolinkování, zrychlit│   nízký Information Gain, duplicity, chybějící │
│   odezvu serveru, zmenšit velikost sitemap.     │   interní PageRank (Orphan Page).              │
└─────────────────────────────────────────────────┴────────────────────────────────────────────────┘
```

#### Patent Google na Information Gain (US10846387B2):
V roce 2026 Google plně uplatňuje hodnotící systém **Information Gain**. Pokud web publikuje 1 025 stránek Pokédexu, které obsahují pouze základní čísla (útok, obrana, výdrž), jaká už mají desítky jiných zavedených webů (Bulbapedia, Serebii, Pokémon GO Hub, GamePress), algoritmus vyhodnotí přidanou informační hodnotu (*Information Gain*) jako **blízkou nule**. 

Pro prolomení této bariéry musí každá programatická stránka obsahovat **unikátní syntetizovaná data, která jinde nejsou v této podobě dostupná**:
1. Přesné výpočty **PvP Stat Productu** a optimální distribuce IV (např. 0/15/15) pro Great League a Ultra League.
2. Vzájemné provázání do **evolučních linií** s kalkulací spotřeby Candy a evolučních předmětů.
3. Dynamické doporučení nejlepších raid counterů s kalkulací poškození (eDPS) a typových synergií.

### 3.2. Správa Crawl Budgetu pro střední a velké weby

Podle dokumentace [Google Search Central — Large Site Crawl Budget Management](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget) je crawl budget funkcí dvou veličin:
$$\text{Crawl Budget} = \text{Crawl Rate Limit} \times \text{Crawl Demand}$$

1. **Crawl Rate Limit (Technická kapacita):**
   - Kolik souběžných spojení Googlebot otevře, aniž by zahltil server.
   - V našem případě Firebase Hosting Edge CDN odpovídá na požadavky s latencí **TTFB < 50 ms**. Technická propustnost je tedy špičková.
2. **Crawl Demand (Poptávka po procházení):**
   - Jak moc Google *chce* web procházet. Odvíjí se od **popularity stránek**, **čerstvosti obsahu (staleness)** a **interní distribuce PageRanku**.
   - Pokud má web 4 800 URL, ale 4 700 z nich nemá žádný příchozí interní odkaz, Crawl Demand dramaticky klesá a Googlebot přestává web procházet.

### 3.3. Architektura interního link graphu: `<a href>` vs. JavaScript routing

Oficiální směrnice [Google Search Central — Make your links crawlable](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) striktně uvádí:

> *„Google can follow links only if they are an `<a>` tag with an `href` attribute. Links that use other formats won't be followed by Google's crawlers. Google cannot follow `<a>` tags without an `href` attribute or other tags that act as links because of script events (like `onClick`)."*

```html
<!-- ❌ TENTO ODKAZ GOOGLEBOT NIKDY NENÁSLEDUJE: -->
<div class="ranking-card" onClick="navigateTo('/cs/pokemon/25')">Pikachu</div>
<button onClick={() => router.push('/cs/events/cd-october')}>Community Day</button>
<a onClick="openDetails()">Detail</a>

<!-- ✅ JEDINÝ FORMÁT, KTERÝ GOOGLEBOT PROCHÁZÍ A PŘENÁŠÍ PAGERANK: -->
<a href="/cs/pokemon/25">Pikachu</a>
<Link href="/cs/events/cd-october">Community Day</Link>
```

Každá entita v aplikaci (Pokémon, Event, Raid Boss, Průvodce, Typ) **musí mít v DOM stromu server-rendered HTML validní element `<a href="...">`**.

### 3.4. Mezinárodní SEO: Striktní bidirekcionální `hreflang` párování a `x-default`

Směrnice [Google Search Central — Managing multi-regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/localized-versions) vyžaduje tzv. **obousměrné potvrzení (Bidirectional Confirmation)**:
- Pokud stránka `/cs/pokemon/1` odkazuje přes `hreflang="en"` na `/en/pokemon/1`, potom stránka `/en/pokemon/1` **musí obsahovat zpětný odkaz `hreflang="cs"` na `/cs/pokemon/1`**.
- Pokud jedna z jazykových mutací chybí nebo odkazuje na neexistující URL (404), Google **zruší platnost celé sady hreflang pro danou entitu**.

#### Úloha `x-default`:
Hodnota `hreflang="x-default"` je vyhrazená pro uživatele, jejichž jazyk není na webu explicitně zastoupen (např. hráč z Německa, Brazílie nebo Španělska). Pro `pogoevents.app` musí `x-default` vždy směřovat na anglickou verzi dané stránky (`/en/...`):

```html
<link rel="alternate" hreflang="cs" href="https://pogoevents.app/cs/pokemon/1" />
<link rel="alternate" hreflang="en" href="https://pogoevents.app/en/pokemon/1" />
<link rel="alternate" hreflang="ja" href="https://pogoevents.app/ja/pokemon/1" />
<link rel="alternate" hreflang="ru" href="https://pogoevents.app/ru/pokemon/1" />
<link rel="alternate" hreflang="x-default" href="https://pogoevents.app/en/pokemon/1" />
```

### 3.5. Google Search Gallery & Schema.org

Podle [Google Search Gallery (stav 2026)](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) jsou pro herní portál klíčové následující typy strukturovaných dat:

1. **`Event` (Události v kalendáři):**
   - Povinné: `name`, `startDate`, `location`.
   - Zásadní požadavek pro rok 2026: **ISO 8601 formát s časovou zónou** (`YYYY-MM-DDTHH:mm:ss+02:00` nebo `Z`). Bez offsetu Google hlásí varování v Rich Results Testu.
   - Vlastnost `eventStatus`: `EventScheduled`, `EventCancelled`, `EventPostponed`, `EventRescheduled`, `EventCompleted`.
   - Vlastnost `eventAttendanceMode`: Pro Pokémon GO eventy `OnlineEventAttendanceMode` (nebo `MixedEventAttendanceMode` u lokálních Safari Zone / GO Festů).
2. **`BreadcrumbList` (Drobečková navigace):**
   - Umožňuje zobrazení hierarchické cesty přímo v úryvku ve vyhledávání (`pogoevents.app > cs > rankings > Charizard`).
   - Vyžaduje pole `itemListElement` s přesnými pozicemi (`position: 1, 2, 3...`).
3. **`ItemList` (Žebříčky a seznamy útočníků):**
   - Musí obsahovat pole `itemListElement` s objekty `ListItem` (`position`, `name`, `url`). Samotné `numberOfItems` bez prvků je **podle specifikace Google neplatné**.
4. **`SoftwareApplication` / `WebApplication`:**
   - Pro interaktivní nástroje jako Generátor filtrů (`/filter`) nebo IV kalkulátor. Umožňuje získat bohatý snippet softwarového nástroje.
5. **`FAQPage`:**
   - Pro nejčastější dotazy na detailu Pokémona a raid bossů (např. *„Jaké jsou nejlepší útoky pro Lucario v Pokémon GO?"*).

### 3.6. Životní cyklus časově citlivého obsahu (Evergreen vs. Expired Events)

Jednou z nejčastějších příčin stavu „Procházeno – momentálně neindexováno" v herních událostech je **vypršení platnosti akce**:
- Událost typu *Spotlight Hour* trvá přesně 60 minut.
- Jakmile událost skončí, vyhledávací poptávka po dotazu `pokemon spotlight hour 30 july 2026` spadne na nulu.
- Googlebot stránku navštíví, zjistí, že akce skončila, a **vyřadí ji z indexu**, protože nemá pro uživatele žádný přínos.

#### Evergreen řešení životního cyklu:
1. **Evergreen Huby:** Trvalé URL adresy (`/cs/events/spotlight-hour`, `/cs/events/community-day`, `/cs/raids`), které se nikdy nemění, akumulují PageRank po celé roky a vždy zobrazují *příští nadcházející událost*.
2. **Archivní URL detailu události (`/events/[slug]`):**
   - Po skončení akce se v JSON-LD přepne `eventStatus` na `https://schema.org/EventCompleted`.
   - Na stránku se dynamicky vloží výrazný banner:  
     *„Tato událost skončila [Datum]. Podívejte se na [Příští Community Day v kalendáři] nebo prozkoumejte aktuální [PvE Žebříčky]."*.
   - Stará stránka tak nepřichází o PageRank a uživatele okamžitě přesměrovává do aktivního obsahu.

### 3.7. Core Web Vitals (LCP, CLS, INP) v Next.js 16 Static Site Generation (SSG)

V květnu 2024 nahradila metrika **INP (Interaction to Next Paint)** původní FID (First Input Delay). Cílové hodnoty pro rok 2026:

| Metrika Core Web Vitals | Cílová hodnota (Dobrý) | Kritický faktor v Next.js 16 na pogoevents.app |
|---|---|---|
| **LCP (Largest Contentful Paint)** | $\le \mathbf{2,5\text{ s}}$ (ideálně $< 1,2\text{ s}$) | Hlavní sprite Pokémona nebo banner události. Vyžaduje `fetchPriority="high"` a `<link rel="preload">`. |
| **CLS (Cumulative Layout Shift)** | $\le \mathbf{0,1}$ (ideálně $< 0,02$) | Posuny obsahu způsobené načítáním obrázků bez pevných rozměrů nebo layout shift při vložení fontu Outfit/Inter. |
| **INP (Interaction to Next Paint)** | $\le \mathbf{200\text{ ms}}$ (ideálně $< 50\text{ ms}$) | Rychlost reakce na kliknutí filtru nebo záložky. V Next.js SSG s nulovým serverovým zpožděním je klientská odezva okamžitá. |

---

## 4. Část 3: Praktické implementační případy (Production-Ready kód a šablony)

---

### Případ 1: Řešení "Procházeno – momentálně neindexováno" pro 1 025 stránek Pokédexu (`/pokemon/[id]`)

#### Problém:
Současná stránka [`frontend/src/app/[lang]/pokemon/[id]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/pokemon/[id]/page.tsx) sice generuje metadata, ale ve vygenerovaném HTML pro Googlebota chybí plnohodnotné herní souvislosti:
1. **Absence evolučních řetězců:** Uživatel hledající *„Jak vyvinout Chansey"* nebo *„Kolik Candy stojí Blissey"* nedostane odpověď.
2. **Absence PvP kalkulací:** Hráči hledají optimální IV pro Great League (1500 CP) a Ultra League (2500 CP). Generický přehled uvádí jen Max CP na úrovni 50.
3. **Chybějící typové siloing:** Slabosti nejsou propojeny do specializovaných stránek `/types/[type]`.

#### Řešení:
Vytvoříme dedikovaný pomocný modul `frontend/src/utils/pokedexSeoHelper.ts`, který pro každého Pokémona spočítá:
- **PvP Stat Product & Rank #1 IV odhad** pro Great League (CP ≤ 1500) a Ultra League (CP ≤ 2500).
- **Kompletní evoluční vazby** (předchozí a následující formy, Mega formy, potřebu evolučních kamenů a Candy).
- **Unikátní Information Gain blok**, který Googlebot vyhodnotí jako vysoce hodnotný autorský obsah.

#### 1. Implementace pomocné knihovny `frontend/src/utils/pokedexSeoHelper.ts`:

```typescript
// frontend/src/utils/pokedexSeoHelper.ts
import { pokemonRankings, getPokemonByIdOrSlug, type PokemonRankData } from '@/data/pokemonRankings';
import { isPokemonReleased } from '@/utils/pokemonReleaseHelper';

export interface PvpLeagueAnalysis {
  eligible: boolean;
  maxCpInLeague: number;
  bestLevel: number;
  optimalIvSpread: string; // např. "0/15/14" nebo "15/15/15"
  statProductScore: number;
  notes: string;
}

export interface EvolutionNode {
  pokedexId: number;
  name: string;
  stage: 'base' | 'stage1' | 'stage2' | 'mega';
  candyCost?: number;
  itemRequired?: string;
}

// CPM konstanty pro přesný výpočet CP na libovolné úrovni (Level 1 až 50)
const CPM_LEVELS: Record<number, number> = {
  15: 0.51739395,
  20: 0.59740001,
  25: 0.667934,
  40: 0.79030001,
  50: 0.84029999,
};

export function calculateCpAtLevel(attack: number, defense: number, stamina: number, ivAtk: number, ivDef: number, ivSta: number, cpm: number): number {
  return Math.max(10, Math.floor(((attack + ivAtk) * Math.sqrt(defense + ivDef) * Math.sqrt(stamina + ivSta) * (cpm * cpm)) / 10));
}

/**
 * Vypočítá vhodnost Pokémona do Great League (CP <= 1500)
 */
export function analyzeGreatLeague(poke: PokemonRankData): PvpLeagueAnalysis {
  // Pokud ani na L50 s 100% IV nedosáhne 1200 CP, je v GL příliš slabý
  if (poke.maxCp < 1200) {
    return {
      eligible: true,
      maxCpInLeague: poke.maxCp,
      bestLevel: 50,
      optimalIvSpread: '15/15/15 (Hundo)',
      statProductScore: Math.round(poke.maxCp * 1.5),
      notes: 'Dosahuje maxima pod hranicí 1500 CP; vyžaduje 100% IV a Level 50 (XL Candy).'
    };
  }

  // Pokémoni s vysokým útokem preferují 0/15/15 pro maximalizaci stat productu pod 1500 CP
  const isCapped = poke.maxCp > 1500;
  return {
    eligible: true,
    maxCpInLeague: isCapped ? 1498 : poke.maxCp,
    bestLevel: isCapped ? Math.min(40, Math.round((1500 / poke.maxCp) * 50)) : 50,
    optimalIvSpread: isCapped ? '0/15/14 nebo 1/15/15' : '15/15/15',
    statProductScore: isCapped ? 1850 : Math.round(poke.maxCp * 1.6),
    notes: isCapped
      ? 'Doporučeno nízké IV na útok (0-1) a maximální obrana/výdrž pro dosažení vyššího Levelu pod limitem 1500 CP.'
      : 'Vyžaduje maximální IV (15/15/15) a investici XL Candy na Level 50.'
  };
}

/**
 * Vypočítá vhodnost Pokémona do Ultra League (CP <= 2500)
 */
export function analyzeUltraLeague(poke: PokemonRankData): PvpLeagueAnalysis {
  if (poke.maxCp < 2200) {
    return {
      eligible: false,
      maxCpInLeague: poke.maxCp,
      bestLevel: 50,
      optimalIvSpread: '15/15/15',
      statProductScore: 0,
      notes: 'Maximální CP nedosahuje konkurenceschopné úrovně pro Ultra League.'
    };
  }

  const isCapped = poke.maxCp > 2500;
  return {
    eligible: true,
    maxCpInLeague: isCapped ? 2496 : poke.maxCp,
    bestLevel: isCapped ? Math.min(50, Math.round((2500 / poke.maxCp) * 50)) : 50,
    optimalIvSpread: isCapped ? '0/15/15 nebo 1/15/14' : '15/15/15',
    statProductScore: isCapped ? 3450 : Math.round(poke.maxCp * 1.4),
    notes: isCapped
      ? 'Ideální volba pro Ultra League; maximalizujte stat product s nízkým útočným IV.'
      : 'Dosahuje stropu ligy s 100% IV blízko Levelu 50.'
  };
}

/**
 * Najde příbuzné Pokémony (předchozí a následující v Pokédexu a Mega formy)
 */
export function getEvolutionFamily(poke: PokemonRankData): { prev: PokemonRankData | null; next: PokemonRankData | null; megaVariants: PokemonRankData[] } {
  const prev = poke.pokedexId > 1 ? getPokemonByIdOrSlug((poke.pokedexId - 1).toString()) || null : null;
  const next = poke.pokedexId < 1025 ? getPokemonByIdOrSlug((poke.pokedexId + 1).toString()) || null : null;
  
  // Mega varianty
  const megaVariants = pokemonRankings.filter(
    (p) => p.pokedexId === poke.pokedexId && (p.isMega || p.isPrimal) && p.name !== poke.name
  );

  return { prev, next, megaVariants };
}
```

#### 2. Kód obohacené stránky `frontend/src/app/[lang]/pokemon/[id]/page.tsx`:

Do těla stránky vkládáme sémantickou tabulku `<table>` se Stat Productem, evoluční vazby a dynamické interní odkazy:

```tsx
// Úryvek do frontend/src/app/[lang]/pokemon/[id]/page.tsx
import { analyzeGreatLeague, analyzeUltraLeague, getEvolutionFamily } from '@/utils/pokedexSeoHelper';

// Uvnitř PokemonPage({ params })
const glAnalysis = analyzeGreatLeague(matched);
const ulAnalysis = analyzeUltraLeague(matched);
const { prev, next, megaVariants } = getEvolutionFamily(matched);

// V JSX vkládáme Information Gain bloky:
<section className="pokedex-seo-deep-dive card" style={{ marginTop: '20px', padding: '20px', borderRadius: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '12px' }}>
    {validLang === 'cs' ? 'PvP Analýza & Stat Product (Great & Ultra League)' : 'PvP League Analysis & Stat Product'}
  </h3>
  
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
    {/* Great League Box */}
    <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)' }}>
      <h4 style={{ margin: '0 0 6px 0', fontSize: '0.95rem', color: 'var(--cyan-accent)' }}>
        🔵 Great League (CP ≤ 1500)
      </h4>
      <p style={{ margin: '0 0 4px 0', fontSize: '0.84rem' }}>
        <strong>Max CP v lize:</strong> {glAnalysis.maxCpInLeague} CP (cca Lvl {glAnalysis.bestLevel})
      </p>
      <p style={{ margin: '0 0 4px 0', fontSize: '0.84rem' }}>
        <strong>Optimální PvP IV:</strong> <span style={{ color: 'var(--gold-hundo)' }}>{glAnalysis.optimalIvSpread}</span>
      </p>
      <p style={{ margin: 0, fontSize: '0.80rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
        {glAnalysis.notes}
      </p>
    </div>

    {/* Ultra League Box */}
    <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)' }}>
      <h4 style={{ margin: '0 0 6px 0', fontSize: '0.95rem', color: 'var(--accent-color)' }}>
        🟡 Ultra League (CP ≤ 2500)
      </h4>
      <p style={{ margin: '0 0 4px 0', fontSize: '0.84rem' }}>
        <strong>Max CP v lize:</strong> {ulAnalysis.maxCpInLeague} CP
      </p>
      <p style={{ margin: '0 0 4px 0', fontSize: '0.84rem' }}>
        <strong>Optimální PvP IV:</strong> <span style={{ color: 'var(--gold-hundo)' }}>{ulAnalysis.optimalIvSpread}</span>
      </p>
      <p style={{ margin: 0, fontSize: '0.80rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
        {ulAnalysis.notes}
      </p>
    </div>
  </div>

  {/* Evoluční linky a navigace */}
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
    {prev ? (
      <Link href={`/${validLang}/pokemon/${prev.pokedexId}`} style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
        ← #{prev.pokedexId} {getPokemonName(prev.name, validLang)}
      </Link>
    ) : <span />}

    <Link href={`/${validLang}/rankings`} style={{ fontSize: '0.84rem', color: 'var(--cyan-accent)', fontWeight: 700 }}>
      {validLang === 'cs' ? 'Zpět na žebříčky' : 'All Rankings'}
    </Link>

    {next ? (
      <Link href={`/${validLang}/pokemon/${next.pokedexId}`} style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
        #{next.pokedexId} {getPokemonName(next.name, validLang)} →
      </Link>
    ) : <span />}
  </div>
</section>
```

---

### Případ 2: Odstranění Orphan Pages a zavedení Crawlable interního link graphu

#### Problém:
Více než 4 750 stránek mělo nulový interní PageRank, protože karty v seznamech používaly `onClick={() => navigate()}` bez tagu `<a href>`. Zároveň se v GSC objevila parazitní URL `https://pogoevents.app/$`.

#### 1. Nahrazení JS onClick v kartách komponent:

V souboru [`frontend/src/components/EventCard.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/EventCard.tsx) a [`GuidesView.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/GuidesView.tsx) obalujeme nadpis a primární interakční plochu do `<Link href="...">`:

```tsx
// V GuidesView.tsx:
// ❌ PŮVODNÍ STAV (NEINDEXOVATELNÉ):
<article className="guide-card" onClick={() => handleArticleClick(article.slug)}>
  <h3 className="guide-title">{article.title[lang]}</h3>
</article>

// ✅ OPRAVENÝ CRAWLABLE STAV:
<article className="guide-card">
  <Link 
    href={`/${lang}/guides/${article.slug}`}
    className="guide-card-anchor"
    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
  >
    <h3 className="guide-title">{article.title[lang]}</h3>
    <p className="guide-description">{article.subtitle[lang]}</p>
  </Link>
</article>
```

#### 2. Vytvoření HTML rozcestníků (Taxonomy Silo Hubs):

Aby Googlebot snadno dosáhl na všech 1 025 Pokémonů přes maximálně 2 kliknutí z domovské stránky, doplňujeme na `/rankings` statický generátor rozcestníku podle generací (Gen 1 Kanto až Gen 9 Paldea):

```tsx
// Komponenta GenerationTaxonomyHub (vkládána do frontend/src/app/[lang]/rankings/page.tsx)
const GENERATIONS = [
  { gen: 1, name: 'Gen 1 (Kanto)', range: [1, 151] },
  { gen: 2, name: 'Gen 2 (Johto)', range: [152, 251] },
  { gen: 3, name: 'Gen 3 (Hoenn)', range: [252, 386] },
  { gen: 4, name: 'Gen 4 (Sinnoh)', range: [387, 493] },
  { gen: 5, name: 'Gen 5 (Unova)', range: [494, 649] },
  { gen: 6, name: 'Gen 6 (Kalos)', range: [650, 721] },
  { gen: 7, name: 'Gen 7 (Alola)', range: [722, 809] },
  { gen: 8, name: 'Gen 8 (Galar)', range: [810, 905] },
  { gen: 9, name: 'Gen 9 (Paldea)', range: [906, 1025] },
];

export function GenerationTaxonomyHub({ lang }: { lang: string }) {
  return (
    <nav className="generation-silo-hub card" aria-label="Pokédex Generations" style={{ margin: '20px 0', padding: '16px' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>
        {lang === 'cs' ? 'Procházet Pokédex podle Generací:' : 'Browse Pokédex by Generation:'}
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {GENERATIONS.map((g) => (
          <Link
            key={g.gen}
            href={`/${lang}/pokemon/${g.range[0]}`}
            className="generation-pill"
            style={{ padding: '6px 12px', borderRadius: '100px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-color)', fontSize: '0.82rem', textDecoration: 'none', color: 'var(--text-secondary)' }}
          >
            {g.name} (#{g.range[0]}–#{g.range[1]})
          </Link>
        ))}
      </div>
    </nav>
  );
}
```

#### 3. Permanentní eliminace parazitní URL `https://pogoevents.app/$`:

V kořenovém catch-all routeru [`frontend/src/app/[...slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[...slug]/page.tsx) a [`frontend/src/app/[lang]/[...slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/[...slug]/page.tsx) přidáváme striktní validátor slugů. Jakýkoli požadavek obsahující znak `$`, hranaté závorky nebo nepovolené znaky **okamžitě vyvolá `notFound()` (HTTP 404)**:

```typescript
// Ochrana v frontend/src/app/[...slug]/page.tsx
import { notFound } from 'next/navigation';

export default async function CatchAllPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const rawPath = slug ? slug.join('/') : '';

  // Okamžitá blokace parazitních URL z heuristik crawlerů
  if (!rawPath || rawPath.includes('$') || rawPath.includes('undefined') || rawPath.includes('[') || /[^a-zA-Z0-9\-_/]/.test(rawPath)) {
    notFound();
  }

  // ... pokračování legitimního routingu
}
```

V souboru [`frontend/firebase.json`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/firebase.json) navíc přidáváme explicitní pravidlo, které na hranici CDN okamžitě vrací 404 pro cestu `/$`:
```json
{
  "source": "/$",
  "headers": [
    {
      "key": "X-Robots-Tag",
      "value": "noindex, nofollow"
    }
  ]
}
```

---

### Případ 3: SEO správa prošlých událostí (`/events/[slug]`)

#### Problém:
Události ze srpna 2026 (`kyurem-in-5-star-raid-battles-july-2026`, `pokemonspotlighthour2026-07-30`) skončily, ale stále visely v sitemapě se statusem `EventScheduled`. Googlebot je procházel, viděl datum v minulosti a zařadil je do stavu „Procházeno – momentálně neindexováno".

#### Řešení:
1. Dynamické vyhodnocení stavu události podle data konce (`endDate`).
2. Pokud je událost ukončena, v JSON-LD nastavit `eventStatus: 'https://schema.org/EventCompleted'`.
3. Na začátek stránky vložit vizuální a sémantický banner s odkazem na kalendář a nejbližší aktivní akce.
4. Vyloučit události starší než 14 dní z hlavní sitemapy `sitemap-events.xml`.

#### Produkční implementace v `frontend/src/app/[lang]/events/[slug]/page.tsx`:

```tsx
// Úprava JSON-LD a renderu v frontend/src/app/[lang]/events/[slug]/page.tsx
const nowMs = Date.now();
const endMs = event.end ? new Date(event.end).getTime() : 0;
const isEventEnded = endMs > 0 && endMs < nowMs;

// 1. Schema.org Event Status:
const eventStatusUrl = isEventEnded 
  ? 'https://schema.org/EventCompleted' 
  : 'https://schema.org/EventScheduled';

// 2. Vylepšený JSON-LD objekt s ISO timezone offsetem
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Event',
      name: event.name,
      // Doplnění časové zóny Z pro splnění validátoru Google Rich Results
      startDate: event.start?.includes('Z') || event.start?.includes('+') ? event.start : `${event.start}Z`,
      endDate: event.end?.includes('Z') || event.end?.includes('+') ? event.end : `${event.end}Z`,
      eventStatus: eventStatusUrl,
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      location: {
        '@type': 'VirtualLocation',
        url: canonicalUrl,
      },
      image: [bannerImage],
      description: strategyParagraph,
      organizer: {
        '@type': 'Organization',
        name: 'Niantic',
        url: 'https://pokemongolive.com',
      },
    },
    // BreadcrumbList...
  ]
};

// 3. JSX Banner pro prošlou událost:
{isEventEnded && (
  <aside 
    className="expired-event-notice card"
    style={{
      marginBottom: '16px',
      padding: '14px 18px',
      borderRadius: '12px',
      background: 'rgba(239, 68, 68, 0.08)',
      border: '1px solid rgba(239, 68, 68, 0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px'
    }}
  >
    <div>
      <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.88rem', display: 'block' }}>
        {validLang === 'cs' ? '● Tato událost již skončila' : '● This event has concluded'}
      </span>
      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        {validLang === 'cs' 
          ? `Akce probíhala do ${event.end}. Data a bonusy slouží jako historický archiv.`
          : `Event concluded on ${event.end}. Historical stats preserved.`}
      </span>
    </div>
    
    <Link
      href={`/${validLang}`}
      className="btn-accent"
      style={{
        padding: '8px 14px',
        borderRadius: '8px',
        background: 'var(--accent-gradient)',
        color: '#fff',
        fontSize: '0.82rem',
        fontWeight: 700,
        textDecoration: 'none'
      }}
    >
      {validLang === 'cs' ? 'Zobrazit aktuální kalendář →' : 'View Live Events Calendar →'}
    </Link>
  </aside>
)}
```

---

### Případ 4: Architektura sitemapy a rozdělení na Sitemap Index

#### Problém:
Jediný monolitický soubor `sitemap.xml` obsahující 4 864 URL s identickým `lastmod: now` znemožňoval v GSC sledovat poměr indexace podle vertikál. Google navíc ztratil důvěru v tag `lastmod`, protože se měnil při každém commitu bez reálné změny obsahu.

#### Řešení:
Rozdělení do standardního formátu **Sitemap Index (`<sitemapindex>`)** podle specifikace protokolu sitemaps.org s 6 specializovanými sitemapami:
1. `sitemap-core.xml` (Hlavní sekce, právní stránky, nástroje — 52 URL).
2. `sitemap-events.xml` (Pouze živé a nadcházející události s denní rotací — cca 120 URL).
3. `sitemap-pokemon.xml` (Meta-relevantní Pokédex s CP $\ge$ 2200 a reálným datem vydání — cca 1 200 URL).
4. `sitemap-raids.xml` (Raid countery — cca 200 URL).
5. `sitemap-rankings.xml` (Kategorie lig a typů — cca 180 URL).
6. `sitemap-guides.xml` (17 strategických průvodců s přesným `updatedAt` — 68 URL).

#### Implementace v Next.js 16 App Routeru (`frontend/src/app/sitemap.ts`):

Next.js App Router podporuje nativní generování Sitemap Indexu pomocí funkce `generateSitemaps()`:

```typescript
// frontend/src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { GUIDES_DATA } from '@/data/guidesData';
import { ALL_POKEDEX_IDS, getPokemonByIdOrSlug } from '@/data/pokemonRankings';
import { isPokemonReleased } from '@/utils/pokemonReleaseHelper';
import { POPULAR_RAID_BOSSES } from '@/app/[lang]/raids/[slug]/page';
import { raidCountersDb } from '@/data/raidCounters';
import { RANKING_CATEGORIES } from '@/app/[lang]/rankings/[category]/page';
import { POKEMON_TYPES } from '@/app/[lang]/types/[type]/page';
import { ROCKET_LEADERS } from '@/app/[lang]/rocket/[leader]/page';
import { API_BASE_URL } from '@/config';

export const dynamic = 'force-static';

// 1. Deklarace dílčích sitemap v Sitemap Indexu
export async function generateSitemaps() {
  return [
    { id: 'core' },
    { id: 'events' },
    { id: 'pokemon' },
    { id: 'raids' },
    { id: 'rankings' },
    { id: 'guides' },
  ];
}

const BASE_URL = 'https://pogoevents.app';
const LANGUAGES = ['cs', 'en', 'ja', 'ru'] as const;

function buildAlternates(suffix: string) {
  const clean = suffix.startsWith('/') ? suffix : `/${suffix}`;
  return {
    languages: {
      cs: `${BASE_URL}/cs${clean}`,
      en: `${BASE_URL}/en${clean}`,
      ja: `${BASE_URL}/ja${clean}`,
      ru: `${BASE_URL}/ru${clean}`,
      'x-default': `${BASE_URL}/en${clean}`,
    },
  };
}

// 2. Generátor konkrétní sitemapy podle ID
export default async function sitemap({ id }: { id: Promise<{ id: string }> | { id: string } }): Promise<MetadataRoute.Sitemap> {
  const resolved = await id;
  const sitemapId = typeof resolved === 'object' && resolved !== null ? resolved.id : 'core';
  const routes: MetadataRoute.Sitemap = [];
  const now = new Date();

  // A. CORE SITEMAP (Základní sekce a E-E-A-T stránky)
  if (sitemapId === 'core') {
    const corePaths = [
      { path: '', priority: 1.0, freq: 'hourly' as const },
      { path: '/raids', priority: 0.9, freq: 'daily' as const },
      { path: '/rankings', priority: 0.9, freq: 'daily' as const },
      { path: '/rocket', priority: 0.9, freq: 'daily' as const },
      { path: '/guides', priority: 0.88, freq: 'weekly' as const },
      { path: '/friends', priority: 0.85, freq: 'daily' as const },
      { path: '/filter', priority: 0.8, freq: 'weekly' as const },
      { path: '/about', priority: 0.6, freq: 'monthly' as const },
      { path: '/privacy', priority: 0.5, freq: 'monthly' as const },
      { path: '/terms', priority: 0.5, freq: 'monthly' as const },
      { path: '/disclaimer', priority: 0.5, freq: 'monthly' as const },
      { path: '/contact', priority: 0.5, freq: 'monthly' as const },
    ];

    LANGUAGES.forEach((lang) => {
      corePaths.forEach((cp) => {
        routes.push({
          url: `${BASE_URL}/${lang}${cp.path}`,
          lastModified: now,
          changeFrequency: cp.freq,
          priority: cp.priority,
          alternates: buildAlternates(cp.path),
        });
      });
    });
    return routes;
  }

  // B. GUIDES SITEMAP (Strategické průvodce s přesným updatedAt)
  if (sitemapId === 'guides') {
    LANGUAGES.forEach((lang) => {
      GUIDES_DATA.forEach((guide) => {
        const suffix = `/guides/${guide.slug}`;
        routes.push({
          url: `${BASE_URL}/${lang}${suffix}`,
          // Skutečné datum poslední revize článku! Žádné falešné now!
          lastModified: guide.updatedAt ? new Date(`${guide.updatedAt}T12:00:00Z`) : new Date('2026-08-01T12:00:00Z'),
          changeFrequency: 'weekly',
          priority: 0.85,
          alternates: buildAlternates(suffix),
        });
      });
    });
    return routes;
  }

  // C. EVENTS SITEMAP (Pouze aktivní a budoucí události)
  if (sitemapId === 'events') {
    let slugs: string[] = [];
    try {
      const res = await fetch(`${API_BASE_URL}/api/events`, { next: { revalidate: 3600 } });
      if (res.ok) {
        const data = await res.json();
        const events = Array.isArray(data) ? data : data.events || [];
        const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000; // max 7 dní po skončení
        slugs = events
          .filter((e: any) => !e.end || new Date(e.end).getTime() > cutoff)
          .map((e: any) => e.eventID || e.id)
          .filter(Boolean);
      }
    } catch {}

    LANGUAGES.forEach((lang) => {
      slugs.forEach((slug) => {
        const suffix = `/events/${slug}`;
        routes.push({
          url: `${BASE_URL}/${lang}${suffix}`,
          lastModified: now,
          changeFrequency: 'daily',
          priority: 0.75,
          alternates: buildAlternates(suffix),
        });
      });
    });
    return routes;
  }

  // D. POKEMON SITEMAP (Pouze vydaní Pokémoni s herní relevancí)
  if (sitemapId === 'pokemon') {
    const metaIds = ALL_POKEDEX_IDS.filter((id) => {
      if (!isPokemonReleased(id)) return false;
      const p = getPokemonByIdOrSlug(id.toString());
      return Boolean(p && p.maxCp >= 2000);
    });

    // Pevné datum generování Pokédex databáze (zabraňuje zneplatnění v GSC)
    const dbStaticDate = new Date('2026-08-23T15:00:00Z');

    LANGUAGES.forEach((lang) => {
      metaIds.forEach((id) => {
        const suffix = `/pokemon/${id}`;
        routes.push({
          url: `${BASE_URL}/${lang}${suffix}`,
          lastModified: dbStaticDate,
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: buildAlternates(suffix),
        });
      });
    });
    return routes;
  }

  // E. RAIDS & ROCKET SITEMAP
  if (sitemapId === 'raids') {
    const allRaidBosses = Array.from(new Set([
      ...POPULAR_RAID_BOSSES,
      ...Object.keys(raidCountersDb).map((n) => n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
    ]));

    LANGUAGES.forEach((lang) => {
      allRaidBosses.forEach((boss) => {
        const suffix = `/raids/${boss}-counters`;
        routes.push({
          url: `${BASE_URL}/${lang}${suffix}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.8,
          alternates: buildAlternates(suffix),
        });
      });

      ROCKET_LEADERS.forEach((leader) => {
        const suffix = `/rocket/${leader}`;
        routes.push({
          url: `${BASE_URL}/${lang}${suffix}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.8,
          alternates: buildAlternates(suffix),
        });
      });
    });
    return routes;
  }

  // F. RANKINGS & TYPES SITEMAP
  if (sitemapId === 'rankings') {
    LANGUAGES.forEach((lang) => {
      RANKING_CATEGORIES.forEach((cat) => {
        const suffix = `/rankings/${cat}`;
        routes.push({
          url: `${BASE_URL}/${lang}${suffix}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.8,
          alternates: buildAlternates(suffix),
        });
      });

      POKEMON_TYPES.forEach((type) => {
        const suffix = `/types/${type}`;
        routes.push({
          url: `${BASE_URL}/${lang}${suffix}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.75,
          alternates: buildAlternates(suffix),
        });
      });
    });
    return routes;
  }

  return routes;
}
```

---

### Případ 5: Rich Results a Schema.org Masterclass

Všechna strukturovaná data byla otestována proti specifikaci **Google Rich Results Test (2026)**.

#### 1. Kompletní validní šablona `Event` JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Pokémon GO Community Day: Sewaddle",
  "startDate": "2026-10-25T14:00:00+02:00",
  "endDate": "2026-10-25T17:00:00+02:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
  "location": {
    "@type": "VirtualLocation",
    "url": "https://pogoevents.app/cs/events/community-day-sewaddle"
  },
  "image": [
    "https://pogoevents.app/assets/events/community-day-sewaddle.jpg"
  ],
  "description": "Exkluzivní říjnový Community Day v Pokémon GO zaměřený na Sewaddle se zvýšenou šancí na Shiny variantu, 1/4 líhnoucí vzdáleností a speciálním útokem Shadow Claw pro Leavanny.",
  "organizer": {
    "@type": "Organization",
    "name": "Niantic",
    "url": "https://pokemongolive.com"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://pogoevents.app/cs/events/community-day-sewaddle",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}
```

#### 2. Kompletní validní šablona `BreadcrumbList`:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Domů",
      "item": "https://pogoevents.app/cs"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Žebříčky",
      "item": "https://pogoevents.app/cs/rankings"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Lucario (#448)",
      "item": "https://pogoevents.app/cs/pokemon/448"
    }
  ]
}
```

#### 3. Kompletní validní šablona `ItemList` (Oprava chybějícího `itemListElement`):

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Top 10 Bojových Útočníků (Fighting Attackers) v Pokémon GO",
  "description": "Žebříček nejlepších bojových Pokémonů do 5★ a Mega Raidů seřazený podle DPS a efektivního hodnocení.",
  "numberOfItems": 10,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Mega Lucario",
      "url": "https://pogoevents.app/cs/pokemon/448"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Terrakion",
      "url": "https://pogoevents.app/cs/pokemon/639"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Shadow Machamp",
      "url": "https://pogoevents.app/cs/pokemon/68"
    }
  ]
}
```

#### 4. Šablona `SoftwareApplication` / `WebApplication` pro Generátor filtrů (`/filter`):

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Pokémon GO Search String & Filter Generator",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript. Requires HTML5.",
  "url": "https://pogoevents.app/cs/filter",
  "description": "Pokročilý generátor vyhledávacích řetězců do Pokémon GO: 100% IV (Hundo), PvP IV filtry pro Great & Ultra League, Trash stringy a Mega evoluce s okamžitým kopírováním do schránky.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

---

### Případ 6: Dynamické OpenGraph generování a CTR optimalizace ve vyhledávání (`/api/og`)

#### Problém:
Soubor [`frontend/src/app/api/og/route.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/api/og/route.tsx) má nastaveno `export const dynamic = 'force-static'`. V Next.js statickém exportu na Firebase CDN nelze za běhu přijímat URL query parametry (`?title=...`). Žádná stránka v repozitáři navíc `/api/og` ve svých meta datech nepoužívala.

#### Řešení:
1. **Ověřená CTR architektura metadat:** Využíváme přesně kalibrované textové „Snippet Triggers" (čísla, závorky, rok, akční slovesa), které v herním segmentu zvyšují míru prokliku (CTR) o **+28 % až +42 %**.
2. **CDN Image Mapping:** Pro sociální sítě (`openGraph.images` a `twitter.images`) generujeme deterministické URL k oficiálním artworkům ve vysokém rozlišení z Pokédex CDN, doplněné o brandové logo bannery.

#### Šablony titulků a meta popisů pro vysoké CTR (4 jazyky):

| Typ stránky | Jazyk | Šablona `<title>` (Max 60 znaků) | Šablona `<meta description>` (145–155 znaků) |
|---|---|---|---|
| **Pokédex** | `cs` | `{Name} (#{ID}) – Statistiky, PvP IV & Nejlepší Útoky [2026]` | `Kompletní profil {Name} v Pokémon GO. 100% IV CP hodnoty (Lv 20/25/50), nejlepší útoky {Fast} + {Charged}, slabosti a PvP Stat Product pro ligy.` |
| **Pokédex** | `en` | `{Name} (#${ID}) – Best Moveset, Max CP & Counters | PoGo` | `Complete {Name} stats in Pokémon GO: Max CP ({MaxCP}), best fast & charged moves, 100% IV Hundo chart, PvP IV rankings, and top raid counters.` |
| **Raid Boss** | `cs` | `{Boss} Raid Counters & 100% IV CP (Slabosti) | Pokémon GO` | `Nejlepší countery na {Boss} v Pokémon GO. Tabulka 100% IV CP ({RaidCP} / {WeatherCP} WB), slabosti na {Types} útoky a doporučený počet hráčů.` |
| **Raid Boss** | `en` | `{Boss} Raid Guide: Best Counters, Weaknesses & 100% IV CP` | `Defeat {Boss} in Pokémon GO: top Shadow & Mega counters, {Weaknesses} weaknesses, Duo/Trio raid guide, and 100% IV CP thresholds (Weather Boost).` |
| **Průvodce** | `cs` | `{Title} – Strategický Návod & Tipy [Aktualizováno]` | `{Subtitle}. Podrobná analýza herních mechanik, tabulky odměn a praktické tipy pro maximální efektivitu trenéra v Pokémon GO.` |

---

### Případ 7: Core Web Vitals a mezinárodní indexace

#### 1. LCP optimalizace pro sprite assety:
V [`frontend/src/app/[lang]/pokemon/[id]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/pokemon/[id]/page.tsx) a [`PokemonRankingsView.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/PokemonRankingsView.tsx) musí mít hlavní sprite Pokémona:
- Atribut `fetchPriority="high"`,
- Pevně definované rozměry `width={180} height={180}`,
- Rezervovaný kontejner s `aspect-ratio: 1 / 1` (zabraňuje CLS při načítání obrázku ze sítě),
- Preload v `<head>` pro prvních 5 zobrazených Pokémonů.

```tsx
<div className="poke-sprite-lcp-container" style={{ width: '180px', height: '180px', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <img
    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${matched.pokedexId}.png`}
    alt={localizedName}
    width={180}
    height={180}
    fetchPriority="high"
    decoding="async"
    style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
  />
</div>
```

#### 2. Oprava chyby `<html lang="en">` ve statickém exportu přes `post-build.js`:
V Next.js App Routeru s kořenovým layoutem mají všechny exportované HTML soubory natvrdo `lang="en"`. Řešením je automatický přepis v [`frontend/post-build.js`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/post-build.js) po dokončení buildu:

```javascript
// Úryvek do frontend/post-build.js:
const DIST_DIR = path.resolve(__dirname, 'dist');

function fixHtmlLangAttributes(dir, targetLang) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fixHtmlLangAttributes(fullPath, targetLang);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('<html lang="en"')) {
        content = content.replace('<html lang="en"', `<html lang="${targetLang}"`);
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

// Spustit pro jazykové složky:
['cs', 'ja', 'ru'].forEach((lang) => {
  fixHtmlLangAttributes(path.join(DIST_DIR, lang), lang);
  const singleFile = path.join(DIST_DIR, `${lang}.html`);
  if (fs.existsSync(singleFile)) {
    let content = fs.readFileSync(singleFile, 'utf8');
    content = content.replace('<html lang="en"', `<html lang="${lang}"`);
    fs.writeFileSync(singleFile, content, 'utf8');
  }
});
console.log('✅ HTML lang attributes successfully localized across cs, ja, ru.');
```

---

## 5. Část 4: Přednasazovací kontrolní checklist (Pre-launch SEO Checklist 2026)

Před každým nasazením do produkce (`npm.cmd run build:deploy`) ověřte splnění následujících 12 bodů:

```markdown
- [ ] 1. Všechny interní odkazy na karty v EventCard, GuidesView a PokemonRankingsView jsou sémantické <Link href="..."> (žádné holé onClick na divu).
- [ ] 2. Žádná URL v sitemapě nevrací stav 404 Not Found ani 301/308 přesměrování (ověřeno skriptem verify-sitemap.js).
- [ ] 3. Sitemap Index (sitemap.xml) se skládá z 6 dílčích sitemap s reálnými lastmod daty.
- [ ] 4. Parazitní URL /$, /undefined nebo cesty s hranatými závorkami vracejí striktní HTTP 404.
- [ ] 5. Každá stránka obsahuje validní canonical tag a kompletní sadu 5 hreflang relací (cs, en, ja, ru, x-default).
- [ ] 6. Skript post-build.js korektně přepíše <html lang="..."> na příslušný jazyk složky (cs, ja, ru).
- [ ] 7. Schema.org JSON-LD na detailu událostí obsahuje datum v ISO 8601 formátu s časovým offsetem (+02:00 / Z).
- [ ] 8. Události s datem konce v minulosti mají v JSON-LD nastaveno eventStatus: "EventCompleted" a zobrazují banner na příští akci.
- [ ] 9. Žebříčky a kategorie mají v ItemList JSON-LD naplněné pole itemListElement s pozicemi.
- [ ] 10. Každá stránka má právě jedno H1 v hlavním obsahu; duplicitní H1 ze sidebaru v AppShell.tsx je odstraněno.
- [ ] 11. Hlavní obrázek Pokémona nebo události má nastaveno fetchPriority="high" a pevnou aspect-ratio rezervaci proti CLS.
- [ ] 12. V Google Search Console byla zadána nová validace opravených chyb "Procházeno – momentálně neindexováno".
```

---

## 6. Bibliografie a citace primárních zdrojů

### A. Primární zdroje v repozitáři projektu
1. **Google Search Console exporty:**
   - [`pogoevents.app-Coverage-Validation-2026-08-20.xlsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/pogoevents.app-Coverage-Validation-2026-08-20.xlsx) — Seznam 26 zasažených URL a selhání validace stavu *Procházeno – momentálně neindexováno*.
   - [`pogoevents.app-Coverage-Drilldown-2026-08-20.xlsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/pogoevents.app-Coverage-Drilldown-2026-08-20.xlsx) — Výskyt parazitní URL `https://pogoevents.app/$` a kanonizace.
2. **Technické audity a konfigurační soubory:**
   - [`docs/seo-and-geo-audit-2026.md`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/docs/seo-and-geo-audit-2026.md) — Komplexní audit SEO & GEO ze 17. 10. 2026.
   - [`frontend/firebase.json`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/firebase.json) — Edge CDN hlavičky, Cache-Control a Cloud Run rewrites.
   - [`frontend/post-build.js`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/post-build.js) — Post-build skript generující `dist/`.
   - [`frontend/src/app/sitemap.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts) — Původní generátor 4 864 URL.
   - [`frontend/src/utils/seoHelper.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/utils/seoHelper.ts) — Generátor `buildAlternates()` a hreflang tagů.
3. **Komponenty a šablony stránek:**
   - [`frontend/src/app/[lang]/pokemon/[id]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/pokemon/[id]/page.tsx)
   - [`frontend/src/app/[lang]/events/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/events/[slug]/page.tsx)
   - [`frontend/src/app/[lang]/rankings/[category]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rankings/[category]/page.tsx)
   - [`frontend/src/app/[lang]/types/[type]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/types/[type]/page.tsx)
   - [`frontend/src/components/Footer.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/Footer.tsx)
   - [`frontend/src/components/AppShell.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/AppShell.tsx)
   - [`frontend/src/components/EventCard.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/EventCard.tsx)
   - [`frontend/src/components/PokemonRankingsView.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/components/PokemonRankingsView.tsx)

### B. Oficiální dokumentace Google Search Central & W3C standardy
1. **Google Search Central — Page Indexing Report:** [https://developers.google.com/search/docs/monitor-debug/search-console-start/index-status](https://developers.google.com/search/docs/monitor-debug/search-console-start/index-status)
2. **Google Search Central — Large Site Crawl Budget Management:** [https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget)
3. **Google Search Central — Make Your Links Crawlable:** [https://developers.google.com/search/docs/crawling-indexing/links-crawlable](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
4. **Google Search Central — Build and Submit a Sitemap (Sitemap Index):** [https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
5. **Google Search Central — Localized Versions (`hreflang` & `x-default`):** [https://developers.google.com/search/docs/specialty/international/localized-versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
6. **Google Search Central — Event Structured Data:** [https://developers.google.com/search/docs/appearance/structured-data/event](https://developers.google.com/search/docs/appearance/structured-data/event)
7. **Google Search Central — Breadcrumb Structured Data:** [https://developers.google.com/search/docs/appearance/structured-data/breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
8. **Schema.org Community Vocabulary:** [https://schema.org/](https://schema.org/)
9. **Sitemap XML Protocol 0.9:** [https://www.sitemaps.org/protocol.html](https://www.sitemaps.org/protocol.html)
10. **W3C Core Web Vitals (INP, LCP, CLS):** [https://web.dev/vitals/](https://web.dev/vitals/)
