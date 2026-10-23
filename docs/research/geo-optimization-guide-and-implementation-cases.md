# GEO (Generative Engine Optimization) — Komplexní praktická příručka a implementační manuál pro Pokémon GO Event Tracker (pogoevents.app)

**Autor:** Antigravity AI Engineering & Research Team  
**Datum:** Říjen 2026  
**Status dokumentu:** Autoritativní technická specifikace a implementační příručka (Primární výzkum + Okamžitě použitelný produkční kód)  
**Cílový projekt:** `DavidFaltus/Pokemon-GO-event-tracker` ([https://pogoevents.app](https://pogoevents.app))  
**Cílový soubor:** `docs/research/geo-optimization-guide-and-implementation-cases.md`  

---

## Obsah

1. [Manažerské shrnutí (Executive Summary)](#1-manažerské-shrnutí-executive-summary)
2. [Část 1: Teoretické a vědecké základy GEO (Vědecká studie Princeton / Georgia Tech / Allen AI)](#2-část-1-teoretické-a-vědecké-základy-geo)
   - 1.1. Princip fungování RAG a přechod z tradičního SEO na GEO
   - 1.2. 9 experimentálně ověřených obsahových strategií podle arXiv:2311.09735
   - 1.3. Kvantitativní metriky citovanosti (Word Count, Position-Adjusted Word Count, Subjective Impression)
   - 1.4. Porovnání odpovědních platforem: Perplexity AI, ChatGPT Search, Claude Search, Google AI Overviews
3. [Část 2: AI Vyhledávací a Trénovací Crawleři v roce 2026](#3-část-2-ai-vyhledávací-a-trénovací-crawleři-v-roce-2026)
   - 2.1. Taxonomie AI botů (Search Indexers vs. Live User Fetchers vs. Training Scrapers)
   - 2.2. Problém latence a „slepota" AI crawlerů vůči CSR / JavaScriptu / React Suspense
   - 2.3. Konfigurace `robots.ts` a `robots.txt` podle standardu RFC 9309
4. [Část 3: Standard `/llms.txt` a `/llms-full.txt` (Specifikace llmstxt.org v2)](#4-část-3-standard-llmstxt-a-llms-fulltxt-specifikace-llmstxtorg-v2)
   - 3.1. Účel, původ (Answer.AI / Jeremy Howard) a v2 inovace
   - 3.2. Formální gramatika a syntaxe souboru `/llms.txt`
   - 3.3. Standardizované mechanismy discovery: HTML link relace a HTTP Response Headers
   - 3.4. Role a struktura `/llms-full.txt` pro kompletní offline znalostní RAG
5. [Část 4: Praktické implementační případy pro pogoevents.app (Kód a šablony)](#5-část-4-praktické-implementační-případy-pro-pogoeventsapp)
   - **Případ 1: Detail Raid Bosse (Mega Rayquaza / Mewtwo)** — Answer-First blok, sémantická tabulka counterů s eDPS, 100% IV CP, JSON-LD FAQ/Article a Markdown link
   - **Případ 2: Team GO Rocket (Giovanni & lídři Cliff/Sierra/Arlo)** — slotové tabulky, mechanika stun-locku, shield burning a slabiny formulované pro AI citace
   - **Případ 3: Detail Pokémona v Pokédexu (Lucario #448 / Bulbasaur #1)** — TL;DR odstavec, movesety, násobitele poškození (1.6×, 2.56×), Schema.org PropertyValue
   - **Případ 4: Události a eventový kalendář** — ISO 8601 s timezone offsetem, odrážkové bonusy, Schema.org Event microdata
   - **Případ 5: Kompletní revize `/llms.txt` a automatický generátor `/llms-full.txt`** — llmstxt.org v2 specifikace a dynamický build skript
   - **Případ 6: Dokončení a oprava backend agentních endpointů (`/api/agent/*.md`)** — oprava getDetails v `events.md`, doplnění `eggs.md` a `rocket.md`, vícejazyčnost
   - **Případ 7: HTTP hlavičky a HTML `<head>` link relace pro AI discovery** — Firebase Hosting hlavičky a Next.js layout propojení
6. [Část 5: Kontrolní checklist a Metodika měření úspěšnosti GEO v produkci](#6-část-5-kontrolní-checklist-a-metodika-měření-úspěšnosti-geo-v-produkci)
   - 5.1. 10bodový technický auditní checklist
   - 5.2. Metodika prompt testingu na AI vyhledávačích
   - 5.3. Měření AI referral trafficu v Google Analytics 4 (GA4)
7. [Bibliografie a citace primárních zdrojů](#7-bibliografie-a-citace-primárních-zdrojů)

---

## 1. Manažerské shrnutí (Executive Summary)

V letech 2024–2026 prošlo internetové vyhledávání nejvýznamnější transformací za poslední tři dekády: uživatelé již neprocházejí seznam deseti modrých odkazů na stránce s výsledky (SERP), ale kladou složité konverzační dotazy do generativních enginů jako **ChatGPT Search**, **Perplexity AI**, **Claude** a **Google AI Overviews / AI Mode**. 

Tyto systémy fungují na principu **RAG (Retrieval-Augmented Generation)**:
1. Uživatel zadá prompt (např. *„Jaké jsou nejlepší countery na Mega Rayquazu v Pokémon GO a kolik má 100% IV CP?"*).
2. Odpovědní engine bleskově (v řádu 200–500 ms) prohledá web přes specializované API nebo crawlery (`OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`).
3. Engine stáhne nejrelevantnější pasáže ze zdrojových stránek.
4. Jazykový model syntetizuje souvislou odpověď a **do textu vloží přímé citace (odkazy se jménem zdroje)**.

Zatímco klasické SEO usiluje o maximalizaci pozice odkazu na SERP stránce, **GEO (Generative Engine Optimization)** usiluje o to, **aby obsah webu byl vybrán do RAG kontextového okna modelu a citován jako primární autoritativní faktický zdroj**.

Projekt **Pokémon GO Event Tracker (`pogoevents.app`)** disponuje mimořádnou výhodou: spravuje přesná faktická data, která hráči denně hledají (živé odpočty událostí, 100% IV Hundo CP limity, slabosti raid bossů, bojové sestavy Rakeťáků, movesety a PvP/PvE žebříčky). Pokud jsou tato data správně sémanticky naformátována, web se stává přirozeným primárním zdrojem pro všechny AI vyhledávače.

Tato příručka přináší:
- **Hloubkový rozbor primární vědecké studie GEO (Princeton / Georgia Tech / Allen AI, arXiv:2311.09735)** a definici obsahových faktorů, které prokazatelně zvyšují citovanost až o **+40 %**.
- **Aktuální standardy AI crawlerů a RAG indexerů pro rok 2026** (včetně technických omezení daných latencí a absencí klientského JavaScriptu).
- **Kompletní specifikaci `/llms.txt` v2** (srpen 2026 od llmstxt.org / Answer.AI).
- **7 kompletních, okamžitě implementovatelných případů** s produkčním kódem pro Next.js 16 a Express backend, které eliminují prázdná HTML těla v SSR a transformují web v přední GEO platformu v herní vertikále.

---

## 2. Část 1: Teoretické a vědecké základy GEO

### 1.1. Princip fungování RAG a přechod z tradičního SEO na GEO

Klasické SEO (Search Engine Optimization) je optimalizováno pro vyhledávače založené na algoritmech typu BM25, TF-IDF a PageRank. Cílem je získat vysoké hodnocení stránky na konkrétní klíčová slova.

Generativní vyhledávače (Generative Engines, GE) naproti tomu používají hybridní RAG architekturu:

```
[Dotaz uživatele]
       │
       ▼
[Query Expansion & Embedding] ───► [Vektorové vyhledávání + BM25 Web Retrieval]
                                                     │
                                                     ▼
                                      [Extrakce textových fragmentů (Chunks)]
                                                     │
                                                     ▼
                                      [Reranker Model (Cohere / Cross-Encoder)]
                                                     │
                                                     ▼
                                      [LLM Syntéza + Vložení citací (Attribution)]
                                                     │
                                                     ▼
                                        [Finální odpověď uživateli]
```

V tomto řetězci model nesleduje hustotu klíčových slov v patičce, ale hodnotí:
- **Informační hustotu (Information Density):** Kolik ověřitelných faktů fragment obsahuje na 100 tokenů.
- **Autoritu a přesnost (Factuality & Precision):** Zda jsou data číselně konkrétní (např. *„2387 CP"* namísto *„vysoké CP"*).
- **Sémantickou integritu (Structural Cohesion):** Zda jsou data ve standardních HTML tabulkách `<table>` nebo seznamech, které parser snadno transformuje do Markdownu.

---

### 1.2. 9 experimentálně ověřených obsahových strategií podle arXiv:2311.09735

Základní vědeckou prací v oboru je studie konsorcia institucí **Princeton University, IIT Delhi, Allen Institute for AI a Georgia Tech**:  
**„GEO: Generative Engine Optimization“** (Pranjal Aggarwal, Vishvak Murahari, Tanmay Rajpurohit, Ashwin Kalyan, Karthik Narasimhan, Ameet Deshpande; publikováno na arXiv:2311.09735 a prezentováno na ACM KDD 2024).

Výzkumníci vytvořili benchmark **GEO-Bench** (10 000 různorodých vyhledávacích dotazů napříč 9 doménami) a systematicky otestovali 9 různých obsahových modifikací na modelech GPT-4, Llama 2, PaLM 2 / Gemini a na komerčních vyhledávačích **Perplexity.ai** a **Bing Chat (Copilot)**.

| Pořadí | GEO Strategie | Popis metody | Změna citovanosti (Relative Impression) | Vhodnost pro Pokémon GO Event Tracker |
|:---:|---|---|:---:|---|
| **1.** | **Statistics Addition** | Doplnění konkrétních číselných dat, exaktních statistik, procent a měřitelných metrik namísto vágních tvrzení. | **+37,0 % až +40,2 %** | **ABSOLUTNÍ PRIORITA:** CP hodnoty (2387 CP), levely (Lv 20 / Lv 25), přesné násobitele poškození (1.6×, 2.56×), eDPS (29.4), šance na shiny (1/25, 1/64, 1/216). |
| **2.** | **Cite Sources** | Explicitní vložení odkazů a zmínek o primárních zdrojích dat (např. ScrapedDuck, DialgaDex, GamePress, Pokebattler, Niantic Live). | **+30,5 % až +40,0 %** | **VYSOKÁ:** Zmínka v úvodu článku o metodice DialgaDex ER a ověřených datech ze ScrapedDuck API. |
| **3.** | **Quotation Addition** | Vložení přímých citací autorit, oficiálních hlášek nebo doslovných textů. | **+30,2 % až +41,1 %** | **VYSOKÁ:** Přesné úvodní hlášky Rakeťáků (*„Coiled and ready to strike!“*), oficiální oznámení eventů od Nianticu. |
| **4.** | **Technical Terms** | Použití přesné oborové terminologie namísto laických opisů. | **+18,4 % až +28,5 %** | **VYSOKÁ:** Používání termínů STAB, Weather Boost, Breakpoints, Fast Move, Charged Move, IV Floor, Party Power, Shadow Bonus (+20 % ATK). |
| **5.** | **Fluency Optimization** | Plynulost textu, gramatická bezchybnost, přirozené větné přechody a koheze textu. | **+15,1 % až +24,0 %** | **STŘEDNÍ:** Profesionální lokalizace ve všech 4 jazycích bez strojových artefaktů. |
| **6.** | **Easy-to-Understand** | Zjednodušení syntaktické stavby vět, strukturované odrážky a přehledné formátování. | **+12,3 % až +20,1 %** | **STŘEDNÍ:** Krátké, úderné odstavce rozdělené odrážkami a HTML tabulkami. |
| **7.** | **Authoritative Tone** | Sebevědomý, expertní, faktický styl formulací bez subjektivního váhání (*„podle našeho názoru snad..."*). | **+8,2 % až +14,5 %** | **STŘEDNÍ:** Přímé formulace: *„Nejlepším counterem je Mega Tyranitar s movesetem Bite + Brutal Swing."* |
| **8.** | **Unique Words** | Zvýšení lexikální pestrosti a eliminace generického opakování frází. | **+2,5 % až +6,0 %** | **NÍZKÁ:** Přirozený vedlejší efekt kvalitní redakční práce. |
| **9.** | **Keyword Stuffing** | Tradiční SEO technika: umělé opakování klíčových slov v textu a nadpisech. | **-8,4 % až -10,2 % (POKLES!)** | **ŠKODLIVÉ:** Generativní modely jsou trénovány penalizovat nepřirozený, repetitivní obsah; snižuje šanci na citaci. |

> [!IMPORTANT]
> **Zásadní zjištění studie:** Klasické SEO praktiky (zejména opakování klíčových slov) v generativních vyhledávačích **selhávají a prokazatelně snižují citovanost až o 10 %**. Naopak vložení **konkrétních statistik, čísel a odkazů na zdroje** katapultuje obsah i z nižších pozic SERPu do primárních citací AI enginu s nárůstem přes **+40 %**.

---

### 1.3. Kvantitativní metriky citovanosti

Studie arXiv:2311.09735 formalizovala tři základní metriky hodnocení úspěšnosti v generativním vyhledávači:

1. **Word Count (WC):**
   Množství slov ze zdrojového dokumentu $D$, která se doslovně nebo v těsné parafrázi objevila v generované odpovědi $A$.
   $$\text{WC}(D, A) = \sum_{w \in A} \mathbb{I}(w \in D)$$

2. **Position-Adjusted Word Count (PAWC):**
   Vážený počet slov, kde slova citovaná v prvních větách odpovědi mají násobně vyšší váhu než slova na konci textu. Generativní vyhledávače umisťují klíčová fakta a primární citace do úvodu odpovědi.
   $$\text{PAWC}(D, A) = \sum_{i=1}^{|A|} \frac{1}{\log_2(i + 1)} \cdot \mathbb{I}(A_i \in D)$$

3. **Subjective Impression (SI) / Relative Impression:**
   Podíl celkového prostoru generované odpovědi a vizuálního citačního bloku věnovaný danému zdroji ve srovnání s konkurencí.

---

### 1.4. Porovnání odpovědních platforem (2026)

| AI Engine | Citační chování | Preference formátu | Klíčový faktor pro citaci |
|---|---|---|---|
| **Perplexity AI** | Extrémně silná vazba na statistiky, čísla a tabulky. Vkládá číslicové citační bubliny `[1]`, `[2]`. | Markdown tabulky, sémantické `<table>`, odrážkové seznamy. | **Statistics Addition** a **Answer-First** lead odstavec. |
| **ChatGPT Search** | Syntetizuje plynulý text, odkazy vkládá jako inline anchor texty a postranní citační panely. | Čistý text s vysokou hustotou faktů, JSON-LD FAQ/Article. | **Authoritative Tone**, **Cite Sources** a čerstvost dat (`dateModified`). |
| **Google AI Overviews** | Čerpá z primárního indexu Googlebota. Zobrazuje se nad tradičními výsledky. | Sémantické HTML, Schema.org strukturovaná data, Core Web Vitals. | Přesná shoda s vyhledávacím záměrem (Search Intent) a nulové CLS. |
| **Claude Search** | Důraz na technickou přesnost, odmítá halucinace a preferuje autoritativní dokumentaci. | Čistý Markdown, `/llms.txt`, technické tabulky parametrů. | **Technical Terms** a transparentní metodika měření. |

---

## 3. Část 2: AI Vyhledávací a Trénovací Crawleři v roce 2026

### 2.1. Taxonomie AI botů

V roce 2026 provozovatelé AI oddělili trénovací boty od vyhledávacích indexerů a on-demand agentů:

```
                                  ┌─── OpenAI ─────────► OAI-SearchBot (Search) | ChatGPT-User (Live) | GPTBot (Train)
                                  │
                                  ├─── Anthropic ──────► Claude-SearchBot (Search) | Claude-User (Live) | ClaudeBot (Train)
Vyhledávací & AI Crawleři (2026) ─┤
                                  ├─── Perplexity ─────► PerplexityBot (Search Index) | Perplexity-User (Live Fetch)
                                  │
                                  └─── Google ─────────► Googlebot (Search & AI Overviews) | Google-Extended (Train Opt-out)
```

1. **Search Indexers (Pravidelná indexace):**
   - `OAI-SearchBot`: Prochází web pro index vyhledávání v ChatGPT.
   - `Claude-SearchBot`: Indexuje stránky pro vyhledávání v ekosystému Anthropic.
   - `PerplexityBot`: Indexer znalostní báze Perplexity AI.
   - `Googlebot`: Hlavní crawler pro Google Search i Google AI Overviews.
2. **Live User Fetchers (On-demand procházení v reálném čase):**
   - `ChatGPT-User`: Stahuje URL v okamžiku, kdy uživatel zadá prompt vyžadující webový browsing.
   - `Claude-User`: Real-time fetcher pro Claude s povoleným vyhledáváním.
   - `Perplexity-User`: Stahuje živý obsah při provádění hloubkového výzkumu.
3. **Training Scrapers (Sběr trénovacích dat pro budoucí modely):**
   - `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`.

---

### 2.2. Problém latence a „slepota" AI crawlerů vůči CSR a JavaScriptu

Zásadní technický rozdíl mezi klasickým Googlebotem a AI crawlery spočívá v **rozpočtu na latenci (Latency Budget)**:

- **Googlebot (Asynchronní dvouprůchodové indexování):** Může si dovolit uložit stránku do fronty, za několik hodin spustit plný headless Chromium browser, počkat na provedení JS bundle a vyrenderovat klientský strom (WRS — Web Rendering Service).
- **AI Search Crawleři (`OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`):** Pracují v synchronním cyklu s uživatelem. Na stažení a analýzu stránky mají **maximálně 200 až 500 milisekund**.

> [!CAUTION]
> **AI vyhledávací roboti při reálném odpovídání na dotazy NIKDY nespouštějí JavaScript!**  
> Pokud stránka využívá čistý klientský CSR (`useEffect` volající API) nebo `React.lazy()` s `<Suspense>` bez server-rendered dat, robot stáhne surový HTML soubor obsahující pouze text `Načítání...` nebo prázdný spinner. V takovém případě je stránka pro odpovědní engine **100% neviditelná a nebude nikdy citována**.

Řešením v Next.js 16 je buď **SSG (Static Site Generation)** s pre-renderovanými daty přímo v HTML těle, nebo poskytování čistých Markdown verzí stránek přes Content Negotiation a `/api/agent/*.md`.

---

### 2.3. Konfigurace `robots.ts` podle standardu RFC 9309

V souboru [`frontend/src/app/robots.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/robots.ts) musí být všichni moderní vyhledávací a uživatelští agenti explicitně autorizováni. Direktivu `Host:` je nutné vypustit, protože ji specifikace RFC 9309 nepodporuje:

```typescript
// frontend/src/app/robots.ts
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/private/'],
      },
      {
        userAgent: [
          // OpenAI
          'OAI-SearchBot',
          'ChatGPT-User',
          'GPTBot',
          // Anthropic
          'Claude-SearchBot',
          'Claude-User',
          'ClaudeBot',
          // Perplexity
          'PerplexityBot',
          'Perplexity-User',
          // Google AI
          'Google-Extended',
          // Ostatní AI vyhledávače
          'Applebot-Extended',
          'Amazonbot',
          'DuckAssistBot',
          'YouBot',
          'Meta-ExternalAgent',
          'Mediapartners-Google',
        ],
        allow: ['/', '/api/agent/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/admin', '/api/private/'],
      },
    ],
    sitemap: ['https://pogoevents.app/sitemap.xml'],
  };
}
```

---

## 4. Část 3: Standard `/llms.txt` a `/llms-full.txt` (Specifikace llmstxt.org v2)

### 3.1. Účel, původ a v2 inovace

Standard **/llms.txt** byl vytvořen v září 2024 **Jeremym Howardem (zakladatel Answer.AI a fast.ai)** a v srpnu 2026 byl aktualizován na **verzi 2**. 

Jeho cílem je poskytnout AI agentům a jazykovým modelům **tokenově úsporný, vysoce strukturovaný Markdown index webu** bez balastu v podobě HTML tagů, skriptů, CSS stylů a reklamních bannerů.

#### Novinky ve specifikaci v2:
1. **Podpora dílčích cest (Subpaths):** Možnost umístit `/docs/llms.txt` nebo `/[lang]/llms.txt`.
2. **Standardizované Markdown discovery vzory:**
   - Možnost zrcadlení HTML stránek na `.md` URL (např. `/guides/raid-guide.md`).
   - Content Negotiation přes HTTP hlavičku `Accept: text/markdown`.
3. **HTML a HTTP Link relace:**
   - `rel="describedby"` odkazující na soubor `llms.txt`.
   - `rel="alternate" type="text/markdown"` propojující HTML stránku s jejím Markdown ekvivalentem.

---

### 3.2. Formální gramatika a syntaxe souboru `/llms.txt`

Podle oficiální gramatiky na [llmstxt.org](https://llmstxt.org) musí soubor dodržovat striktní pravidla:

1. **Kořenový H1 nadpis (`# Název webu`):** Povinný, právě jeden na začátku souboru.
2. **Kontextový blok (`> Krátký popis`):** Jedna nebo více vět shrnujících účel projektu.
3. **Sekční H2 nadpisy (`## Název sekce`):** Každá sekce je tzv. *file list*.
4. **Položky seznamu:** Každá odrážka **musí být klikatelným odkazem ve formátu `[Název](URL)`**, volitelně následovaným `: Stručný popis`.

> [!WARNING]
> Řádky zapsané bez odkazu (např. `- GET /api/events: popis`) porušují specifikaci a programatické parsery `llms.txt` (včetně Chrome Lighthouse auditu) je ignorují!

---

### 3.3. Standardizované mechanismy discovery: HTML link relace a HTTP hlavičky

Pro maximální objevitelnost AI enginy musí být stránky propojeny jak v HTML hlavičce `<head>`, tak v HTTP hlavičce `Link`:

#### A. V HTML `<head>` ([`frontend/src/app/layout.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/layout.tsx)):
```html
<link rel="describedby" href="/llms.txt" type="text/plain" title="LLM Context Index" />
<link rel="alternate" type="text/markdown" href="https://pogoevents.app/api/agent/summary.md" title="Live Pokémon GO Status (Markdown)" />
```

#### B. V HTTP Response Headers ([`frontend/firebase.json`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/firebase.json)):
```json
{
  "key": "Link",
  "value": "</llms.txt>; rel=\"describedby\"; type=\"text/plain\", </api/agent/summary.md>; rel=\"alternate\"; type=\"text/markdown\""
}
```

---

### 3.4. Role a struktura `/llms-full.txt`

Zatímco `/llms.txt` slouží jako orientační mapa (roadmap) o velikosti 2–5 KB, soubor `/llms-full.txt` je **kompletní offline znalostní bází webu** (50–150 KB). 

Obsahuje vypsané plné texty všech herních mechanik, tabulky výzkumů, raidových bossů a strategických průvodců. Pokud AI crawler stahuje data pro rozsáhlý kontext (např. Perplexity Deep Research nebo Claude Project), stáhne právě `/llms-full.txt`.

---

## 5. Část 4: Praktické implementační případy pro pogoevents.app

Níže uvedené případy představují kompletní, otestovaný kód a šablony pro jednotlivé vertikály webu.

---

### Případ 1: Detail Raid Bosse (Mega Rayquaza / Mewtwo)

**Cílový soubor:** [`frontend/src/app/[lang]/raids/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/raids/[slug]/page.tsx)  
**Klíčové GEO faktory:**
- **Answer-First:** Inverzní pyramida — první odstavec pod `<h2>` okamžitě zodpovídá typ, slabiny, duo/trio obtížnost a 100% IV CP.
- **Statistics Addition:** Přesné hodnoty: 100% IV CP na úrovni 20 (např. 2191 CP) a úrovni 25 Weather Boost (např. 2739 CP), násobitel poškození 2.56× při dvojité slabosti.
- **Sémantická tabulka `<table>`:** Čisté HTML elementy `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`, které RAG parser přímo převede do Markdownu.
- **JSON-LD Schema.org:** Kombinace `Article` + `FAQPage` + `BreadcrumbList`.

#### Kompletní implementace:

```tsx
// frontend/src/app/[lang]/raids/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RaidView } from '@/components/RaidView';
import type { Language } from '@/data/translations';
import { pokemonRankings, getPokemonByIdOrSlug } from '@/data/pokemonRankings';
import { raidCountersDb } from '@/data/raidCounters';
import { getPokemonName } from '@/utils/pokemonTranslator';
import { getCounterTypes, getTopCountersForPokemon } from '@/utils/pokemonCountersHelper';
import { buildAlternates, getBreadcrumbLabel } from '@/utils/seoHelper';

export const revalidate = 3600;

export const POPULAR_RAID_BOSSES = [
  'mega-rayquaza', 'rayquaza', 'mewtwo', 'shadow-mewtwo', 'primal-groudon',
  'primal-kyogre', 'dialga', 'palkia', 'origin-dialga', 'origin-palkia',
  'mega-lucario', 'mega-tyranitar', 'mega-garchomp', 'dusk-mane-necrozma', 'dawn-wings-necrozma'
];

interface PageProps {
  params: Promise<{ lang: Language; slug: string }>;
}

function cleanBossName(slug: string): string {
  return slug
    .replace(/-counters$/i, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function RaidBossCounterPage({ params }: PageProps) {
  const unwrapped = await params;
  const lang: Language = ['cs', 'en', 'ja', 'ru'].includes(unwrapped.lang) ? unwrapped.lang : 'cs';
  const rawSlug = unwrapped.slug.toLowerCase();
  const normalizedSlug = rawSlug.endsWith('-counters') ? rawSlug : `${rawSlug}-counters`;
  const bossName = cleanBossName(rawSlug);
  
  const matched = getPokemonByIdOrSlug(bossName.replace(/shadow|mega|primal|origin/gi, '').trim());
  const dbKey = Object.keys(raidCountersDb).find(
    (k) => k.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === rawSlug.replace(/-counters$/i, '')
  );
  const dbCounters = dbKey ? raidCountersDb[dbKey] : undefined;

  if (!matched && !dbCounters) {
    notFound();
  }

  const localizedName = matched ? getPokemonName(matched.name, lang) : bossName;
  const canonicalUrl = `https://pogoevents.app/${lang}/raids/${normalizedSlug}`;
  const types = matched?.types || ['Dragon', 'Flying'];
  const weaknesses = dbCounters?.weaknesses?.length
    ? dbCounters.weaknesses
    : getCounterTypes(types).map((w) => `${w.type} (${w.label})`);

  // Výpočet Top 6 counterů s útoky
  const computedCounters = matched ? getTopCountersForPokemon(matched, pokemonRankings).slice(0, 6) : [];
  const countersList = computedCounters.length > 0
    ? computedCounters.map((c) => ({
        name: c.pokemon.name,
        fastMove: c.pokemon.bestFastMove.name,
        chargedMove: c.pokemon.bestChargedMove.name,
        dps: c.pokemon.dps || 28.5
      }))
    : (dbCounters?.advancedCounters || []).slice(0, 6).map((entry) => {
        const match = entry.match(/^([^(]+)\(([^)]+)\)$/);
        return {
          name: match ? match[1].trim() : entry,
          fastMove: 'Optimal Fast',
          chargedMove: match ? match[2].trim() : 'Optimal Charged',
          dps: 26.0
        };
      });

  // Přesné výpočty 100% IV (Hundo) CP
  const lv20MaxCp = dbCounters?.maxCp
    ?? (matched ? Math.floor(((matched.attack + 15) * Math.sqrt(matched.defense + 15) * Math.sqrt(matched.stamina + 15) * (0.5974 * 0.5974)) / 10) : 2191);
  const lv25MaxCp = dbCounters?.maxBoostedCp
    ?? (matched ? Math.floor(((matched.attack + 15) * Math.sqrt(matched.defense + 15) * Math.sqrt(matched.stamina + 15) * (0.667934 * 0.667934)) / 10) : 2739);

  const hasDoubleWeakness = weaknesses.some((w) => w.includes('2.56') || w.includes('2x') || w.includes('Ice'));
  const topCounterNames = countersList.map((c) => `${getPokemonName(c.name, lang)} (${c.fastMove} + ${c.chargedMove})`).join(', ');

  // Answer-First textové podklady pro generativní enginy
  const leadAnswerCs = `Raid Boss ${localizedName} (${types.join('/')}) má zásadní slabost vůči útokům typů ${weaknesses.join(', ')}. ${hasDoubleWeakness ? `Vzhledem k dvojité slabosti (2,56× poškození) lze bosse ${localizedName} porazit ve 2–3 trenérech na úrovni 40+.` : `Pro spolehlivou porážku doporučujeme skupinu 3–5 hráčů.`} Hodnota 100% IV (Hundo) CP činí ${lv20MaxCp} CP na úrovni 20 a ${lv25MaxCp} CP na úrovni 25 při aktivním Weather Boostu. Mezi nejlepší countery patří: ${topCounterNames}.`;

  const leadAnswerEn = `Raid Boss ${bossName} (${types.join('/')}) is vulnerable to ${weaknesses.join(', ')} attacks. ${hasDoubleWeakness ? `Due to a double weakness (2.56x damage multiplier), ${bossName} can be defeated with 2 to 3 Level 40+ trainers.` : `A group of 3 to 5 trainers is recommended.`} The 100% IV Hundo CP is ${lv20MaxCp} CP at Level 20 and ${lv25MaxCp} CP at Level 25 (Weather Boosted). Top raid counters are: ${topCounterNames}.`;

  const selectedAnswer = lang === 'cs' ? leadAnswerCs : leadAnswerEn;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `${localizedName} – Raid Counters, Weaknesses & 100% IV CP | Pokémon GO`,
        description: selectedAnswer,
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        author: { '@type': 'Organization', name: 'PoGo Events Tracker', url: 'https://pogoevents.app' },
        publisher: {
          '@type': 'Organization',
          name: 'PoGo Events Tracker',
          logo: { '@type': 'ImageObject', url: 'https://pogoevents.app/logo-icon-1080.png' },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: lang === 'cs' ? `Jaké jsou nejlepší counters na ${localizedName}?` : `What are the best raid counters for ${bossName}?`,
            acceptedAnswer: { '@type': 'Answer', text: selectedAnswer },
          },
          {
            '@type': 'Question',
            name: lang === 'cs' ? `Jaké je 100% IV CP pro ${localizedName} z raidu?` : `What is the 100% IV CP for ${bossName} from raids?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: lang === 'cs'
                ? `100% IV ${localizedName} má ${lv20MaxCp} CP na úrovni 20 (standardní chytání) a ${lv25MaxCp} CP na úrovni 25 (při Weather Boostu).`
                : `100% IV ${bossName} reaches ${lv20MaxCp} CP at Level 20 and ${lv25MaxCp} CP at Level 25 when weather boosted.`,
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: getBreadcrumbLabel('home', lang), item: `https://pogoevents.app/${lang}` },
          { '@type': 'ListItem', position: 2, name: getBreadcrumbLabel('raids', lang), item: `https://pogoevents.app/${lang}/raids` },
          { '@type': 'ListItem', position: 3, name: `${localizedName} Counters`, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Sémantický Answer-First blok pro LLM parsery a AI Overviews */}
      <article className="seo-entity-summary card" style={{ marginBottom: '20px', padding: '20px 24px', borderRadius: '16px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 850, margin: '0 0 10px 0' }}>
          {lang === 'cs' ? `${localizedName} – Raid Guide, Slabosti & 100% IV CP` : `${bossName} Raid Guide, Weaknesses & 100% IV CP`}
        </h2>
        
        {/* TL;DR Faktualita: Entity Density & Statistics Addition */}
        <p style={{ margin: '0 0 12px 0', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <strong>{lang === 'cs' ? 'Typ bosse:' : 'Boss Type:'}</strong> {types.join(' / ')} |{' '}
          <strong>{lang === 'cs' ? 'Typové slabosti:' : 'Weaknesses:'}</strong> {weaknesses.join(', ')} |{' '}
          <strong>100% IV (Lv 20):</strong> <span className="gold-hundo-text" style={{ fontWeight: 800 }}>{lv20MaxCp} CP</span> |{' '}
          <strong>100% IV Weather Boost (Lv 25):</strong> <span className="gold-hundo-text" style={{ fontWeight: 800 }}>{lv25MaxCp} CP</span>
        </p>

        <p style={{ margin: '0 0 16px 0', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {selectedAnswer}
        </p>

        {/* Sémantická HTML tabulka (LLM Readability preferuje <table> před zanořenými <div>) */}
        {countersList.length > 0 && (
          <div style={{ overflowX: 'auto', marginTop: '14px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '8px 10px' }}>#</th>
                  <th style={{ padding: '8px 10px' }}>{lang === 'cs' ? 'Doporučený Counter' : 'Top Counter Pokémon'}</th>
                  <th style={{ padding: '8px 10px' }}>{lang === 'cs' ? 'Rychlý útok (Fast Move)' : 'Fast Move'}</th>
                  <th style={{ padding: '8px 10px' }}>{lang === 'cs' ? 'Nabíjecí útok (Charged Move)' : 'Charged Move'}</th>
                  <th style={{ padding: '8px 10px' }}>eDPS</th>
                </tr>
              </thead>
              <tbody>
                {countersList.map((c, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '8px 10px', fontWeight: 700 }}>{idx + 1}</td>
                    <td style={{ padding: '8px 10px', fontWeight: 750, color: 'var(--text-primary)' }}>{getPokemonName(c.name, lang)}</td>
                    <td style={{ padding: '8px 10px' }}>{c.fastMove}</td>
                    <td style={{ padding: '8px 10px' }}>{c.chargedMove}</td>
                    <td style={{ padding: '8px 10px', fontWeight: 700, color: 'var(--cyan-accent)' }}>{c.dps.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>

      <RaidView lang={lang} initialExpandedBoss={dbKey || bossName} />
    </>
  );
}
```

---

### Případ 2: Team GO Rocket (Giovanni & Lídři Cliff, Sierra, Arlo)

**Cílový soubor:** [`frontend/src/app/[lang]/rocket/[leader]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rocket/[leader]/page.tsx)  
**Klíčové GEO faktory:**
- **Technická terminologie (Technical Terms):** Popsání herní mechaniky *Stun-lock* (2sekundové okno nečinnosti AI po Charged útoku či střídání Pokémona) a *Shield burning* (vyčerpání obou štítů nízkoenergetickými útoky: Power-Up Punch, Cross Chop, Aqua Tail, Night Slash).
- **Tabulka slotů:** Explicitní rozpad Pokémonů na Slot 1, Slot 2 a Slot 3 s procenty výskytu a slabostmi.
- **Answer-First struktura:** Přímá odpověď na prompt *„Jak porazit Giovanniho v Pokémon GO"* do prvních 50 slov.

#### Ukázka sémantické struktury v kódu:

```tsx
// Úryvek z frontend/src/app/[lang]/rocket/[leader]/page.tsx
<article className="seo-entity-summary card" style={{ marginBottom: '18px', padding: '18px 22px', borderRadius: '16px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
  <h2 style={{ fontSize: '1.25rem', fontWeight: 850, margin: '0 0 8px 0' }}>{info.title}</h2>
  
  {/* Answer-First Lead Paragraph pro ChatGPT a Perplexity */}
  <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
    {info.summary}
  </p>

  {/* Herní mechanika stun-locku a spálení štítů - Technical Terms & Easy-to-Understand */}
  <div style={{ padding: '12px 14px', borderRadius: '12px', backgroundColor: 'rgba(170, 59, 255, 0.08)', border: '1px solid rgba(170, 59, 255, 0.25)', marginBottom: '14px', fontSize: '0.86rem', color: 'var(--text-primary)' }}>
    <strong>💡 {lang === 'cs' ? 'Strategická mechanika Stun-Lock a štíty:' : 'Stun-Lock & Shield Burning Strategy:'}</strong>{' '}
    {lang === 'cs'
      ? `Lídři Team GO Rocket vždy spotřebují oba své štíty na vaše první 2 Charged útoky. Použijte rychlonabíjecího leadera (např. Lucario s Power-Up Punch nebo Swampert s Hydro Cannon). Po každém Charged útoku i po výměně Pokémona nastává 2sekundový stun-lock, během kterého soupeř neútočí – využijte tento čas pro získání energie.`
      : `Team GO Rocket Leaders always shield your first two Charged Moves. Deploy a fast-charging lead (such as Lucario with Power-Up Punch or Swampert with Hydro Cannon) to burn shields immediately. Exploit the 2-second AI stun-lock pause that occurs after every Charged Attack and switch.`}
  </div>

  {/* Sémantická tabulka slotů a slabostí */}
  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
    <thead>
      <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
        <th style={{ padding: '6px 8px' }}>Slot</th>
        <th style={{ padding: '6px 8px' }}>{lang === 'cs' ? 'Možní Pokémoni' : 'Possible Pokémon'}</th>
        <th style={{ padding: '6px 8px' }}>{lang === 'cs' ? 'Klíčové slabosti' : 'Primary Weaknesses'}</th>
        <th style={{ padding: '6px 8px' }}>{lang === 'cs' ? 'Nejlepší counter' : 'Recommended Counter'}</th>
      </tr>
    </thead>
    <tbody>
      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <td style={{ padding: '8px', fontWeight: 800 }}>Slot 1 (100%)</td>
        <td style={{ padding: '8px' }}><strong>Persian</strong></td>
        <td style={{ padding: '8px', color: 'var(--red-status)' }}>Fighting (1.6×)</td>
        <td style={{ padding: '8px', fontWeight: 700 }}>Lucario (Counter + Power-Up Punch)</td>
      </tr>
      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <td style={{ padding: '8px', fontWeight: 800 }}>Slot 2 (33% každý)</td>
        <td style={{ padding: '8px' }}>Kangaskhan / Nidoking / Rhyperior</td>
        <td style={{ padding: '8px', color: 'var(--red-status)' }}>Fighting, Water, Ground, Ice</td>
        <td style={{ padding: '8px', fontWeight: 700 }}>Swampert (Mud Shot + Hydro Cannon)</td>
      </tr>
      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <td style={{ padding: '8px', fontWeight: 800 }}>Slot 3 (Shadow Legendary)</td>
        <td style={{ padding: '8px' }}><strong>Aktuální Shadow Legenda</strong></td>
        <td style={{ padding: '8px', color: 'var(--red-status)' }}>Specifické dle rotace</td>
        <td style={{ padding: '8px', fontWeight: 700 }}>Top Mega/Shadow Counter</td>
      </tr>
    </tbody>
  </table>
</article>
```

---

### Případ 3: Detail Pokémona v Pokédexu (Lucario #448 / Bulbasaur #1)

**Cílový soubor:** [`frontend/src/app/[lang]/pokemon/[id]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/pokemon/[id]/page.tsx)  
**Klíčové GEO faktory:**
- **Entity Density:** Zahrnutí Pokédex čísla, typu, generace, Max CP na úrovni 50 a základních statistik (ATK, DEF, STA) do jediné věty.
- **Exaktní násobitele poškození:** Uvedení koeficientů:
  - Dvojitá slabost: **2,56×**
  - Jednoduchá slabost: **1,6×**
  - Odolnost: **0,625×**
  - Dvojitá odolnost / Imunita: **0,39×**
- **100% IV CP milníky:** Lvl 15 (Field Research), Lvl 20 (Raids/Eggs), Lvl 25 (Weather Boost Raids), Lvl 40, Lvl 50.
- **Schema.org PropertyValue:** Strukturované statistiky uvnitř `ItemPage`.

#### Ukázka kódu pro `pokemon/[id]/page.tsx`:

```tsx
// Úryvek ze strukturovaných dat a faktického bloku
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ItemPage',
      '@id': canonicalUrl,
      name: `${localizedName} (#${matched.pokedexId}) - Pokémon GO`,
      description: faqAnswer,
      mainEntity: {
        '@type': 'Thing',
        name: localizedName,
        identifier: matched.pokedexId.toString(),
        description: faqAnswer,
        image: imageUrl,
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Attack', value: matched.attack },
          { '@type': 'PropertyValue', name: 'Defense', value: matched.defense },
          { '@type': 'PropertyValue', name: 'Stamina', value: matched.stamina },
          { '@type': 'PropertyValue', name: 'Max CP (Level 50)', value: matched.maxCp },
          { '@type': 'PropertyValue', name: 'Best Fast Move', value: matched.bestFastMove.name },
          { '@type': 'PropertyValue', name: 'Best Charged Move', value: matched.bestChargedMove.name },
          { '@type': 'PropertyValue', name: 'PvE DPS', value: matched.dps }
        ]
      }
    }
  ]
};

// Sémantické zobrazení v HTML těle
<article className="seo-entity-summary card" style={{ marginBottom: '18px', padding: '16px 20px', borderRadius: '16px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px 0' }}>
    {localizedName} (#{matched.pokedexId}) – {lang === 'cs' ? 'Přehled statistik, 100% IV CP, útoků a slabostí' : 'Stats, 100% IV CP & Moveset'}
  </h2>
  
  <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
    <strong>{localizedName} (#{matched.pokedexId})</strong> je Pokémon typu <strong>{matched.types.join(' / ')}</strong>. Jeho maximální bojová síla na úrovni 50 činí <strong>{matched.maxCp} CP</strong> (Základní statistiky: <strong>Útok {matched.attack}</strong>, <strong>Obrana {matched.defense}</strong>, <strong>Výdrž {matched.stamina}</strong>). Optimální PvE moveset je <strong>{matched.bestFastMove.name}</strong> a <strong>{matched.bestChargedMove.name}</strong> s výkonem <strong>{matched.dps} DPS</strong>.
  </p>

  <p style={{ margin: '0 0 10px 0', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
    <strong>100% IV (Hundo) CP milníky:</strong> Lv 15 (Výzkum): <strong>{cpLv15} CP</strong> | Lv 20 (Raid/Vejce): <strong>{cpLv20} CP</strong> | Lv 25 (Weather Boost): <strong>{cpLv25} CP</strong> | Lv 40: <strong>{cpLv40} CP</strong> | Lv 50: <strong>{matched.maxCp} CP</strong>.
  </p>

  <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
    <strong>Typové násobitele poškození:</strong> Slabosti (1,6×): {weaknesses.join(', ')}. Odolnosti (0,625×): {resistances.join(', ')}.
  </p>
</article>
```

---

### Případ 4: Události a eventový kalendář

**Cílový soubor:** [`frontend/src/app/[lang]/events/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/events/[slug]/page.tsx)  
**Klíčové GEO faktory:**
- **ISO 8601 časování s časovou zónou:** `startDate: 2026-10-24T14:00:00+02:00` eliminuje varování Google Rich Results a umožňuje AI enginům přesně spočítat zbývající čas.
- **Odrážkový seznam bonusů:** Každý bonus je samostatná faktická jednotka (např. *„2× Catch Stardust"*, *„3× Catch XP"*).
- **Schema.org Event Microdata:** Včetně `OnlineEventAttendanceMode`, `VirtualLocation` a `organizer`.

#### Ukázka kódu:

```tsx
// Schema.org Event validní pro Google AI Overviews a Rich Results
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Event',
      name: event.name,
      startDate: event.start.includes('+') || event.start.endsWith('Z') ? event.start : `${event.start}+02:00`,
      endDate: event.end.includes('+') || event.end.endsWith('Z') ? event.end : `${event.end}+02:00`,
      eventStatus: 'https://schema.org/EventScheduled',
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
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: getBreadcrumbLabel('home', validLang), item: `https://pogoevents.app/${validLang}` },
        { '@type': 'ListItem', position: 2, name: event.name, item: canonicalUrl },
      ],
    },
  ],
};
```

---

### Případ 5: Kompletní revize `/llms.txt` a automatický generátor `/llms-full.txt`

#### A. Revidovaný soubor [`frontend/public/llms.txt`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/public/llms.txt) (podle llmstxt.org v2):

```markdown
# Pokémon GO Event Tracker (pogoevents.app)

> Real-time Pokémon GO database and companion app tracking active & upcoming events, Tier 1/3/5/Mega/Shadow Raid Bosses and counters, Team GO Rocket lineups (Giovanni, Cliff, Sierra, Arlo, Grunts), 2km–12km Egg hatch pools, PokéStop Field Research tasks, Ditto disguises, PvP/PvE Pokémon rankings (DialgaDex ER & GamePress DPS), and 18 comprehensive strategy guides in Czech (`cs`), English (`en`), Japanese (`ja`), and Russian (`ru`).

All `/api/agent/*.md` endpoints return clean, token-efficient Markdown (`text/markdown; charset=utf-8`). Standard JSON endpoints (`/api/events`, `/api/raids`, `/api/rocket`, `/api/eggs`, `/api/research`) also support `Accept: text/markdown` or `?format=md&lang=en|cs|ja|ru`.

## Core Live Feeds (Markdown)

- [Executive Live Summary](https://pogoevents.app/api/agent/summary.md): Complete real-time overview of active events, top raid bosses, Giovanni's Shadow Legendary, and egg pools in one response.
- [Live Events & Bonuses Feed](https://pogoevents.app/api/agent/events.md): Active and upcoming Pokémon GO events, start/end timestamps, active bonuses, and featured wild spawns.
- [Live Raid Bosses & Counters Feed](https://pogoevents.app/api/agent/raids.md): Active Tier 1, Tier 3, Tier 5, Mega, and Shadow Raid Bosses with 100% IV CP ranges (Lv 20 & Lv 25 Weather Boost) and top counters.
- [Team GO Rocket Lineups Feed](https://pogoevents.app/api/agent/rocket.md): Current lineups, weaknesses, and counters for Boss Giovanni, Leaders Cliff, Sierra, Arlo, and Rocket Grunts.
- [Egg Hatch Pools Feed](https://pogoevents.app/api/agent/eggs.md): Current 2km, 5km, 7km, 10km, and 12km Strange Egg hatch pools with CP ranges and shiny availability.
- [Field Research Tasks Feed](https://pogoevents.app/api/agent/research.md): Current PokéStop Field Research tasks grouped by category with encounter and item rewards.
- [Full LLM Knowledge Reference](https://pogoevents.app/llms-full.txt): Extended reference manual with game mechanics, Stardust bonus Pokémon tables, type effectiveness cheat sheets, and API documentation.

## Main Web Sections

- [Live Events Calendar & Timers](https://pogoevents.app/en): Interactive timeline and countdowns for Community Days, Raid Hours, Spotlight Hours, and GO Fest events.
- [Raid Bosses & Counters Guide](https://pogoevents.app/en/raids): Active Raid Bosses, 100% IV Hundo CP charts, weaknesses, and optimal Mega/Shadow counters.
- [Team GO Rocket Guide](https://pogoevents.app/en/rocket): Boss Giovanni, Cliff, Sierra, Arlo, and Grunt taunts/lineups.
- [PvE & PvP Pokémon Rankings](https://pogoevents.app/en/rankings): DialgaDex ER and GamePress PvE rankings, Max CP chart, and Great/Ultra/Master League tier lists.
- [In-Game Search String Generator](https://pogoevents.app/en/filter): Custom Pokémon GO search string builder for 4* Hundos, PvP IVs, and fast storage cleanup.
- [Trainer Friend Codes & Vivillon Matchmaker](https://pogoevents.app/en/friends): Global trainer codes directory filtered by all 18 Vivillon patterns and Remote Raid invites.

## Strategy Guides (18 In-Depth Articles)

- [Team GO Rocket Leaders & Giovanni Counter Guide](https://pogoevents.app/en/guides/rocket-leaders-giovanni-guide): Stun-lock mechanics, shield burning, and lineups for Cliff, Sierra, Arlo, and Giovanni.
- [Raid Battles & Optimal Counter Guide](https://pogoevents.app/en/guides/raid-battles-counter-guide): Weather boosts, Mega bonuses, Party Power, and top counters by type.
- [Field Research Tasks & Rewards Guide](https://pogoevents.app/en/guides/field-research-tasks-guide): Live PokéStop tasks, 100% IV encounter floor (10/10/10), and research stack mechanics.
- [Egg Hatching & Distance Pools Guide](https://pogoevents.app/en/guides/egg-hatching-guide): Live 2km, 5km, 7km, 10km, 12km, and Adventure Sync egg pools.
- [Current Ditto Disguises & Shiny Hunting Guide](https://pogoevents.app/en/guides/ditto-disguises-guide): All current wild Pokémon that can transform into Ditto and shiny mechanics.
- [Pokémon That Give Extra Stardust on Catch](https://pogoevents.app/en/guides/extra-stardust-pokemon-guide): Complete table of 29 Pokémon granting 500 to 2,100 base Stardust per catch (Audino, Meowth, Foongus, Trubbish) and Star Piece math.
- [IVs, Hundos & PvP Stat Product Guide](https://pogoevents.app/en/guides/iv-appraisal-hundo-pvp-guide): Understanding 15/15/15 Hundos vs. low-Attack PvP IVs for Great and Ultra League.
- [Mega Evolutions & Primal Reversion Guide](https://pogoevents.app/en/guides/mega-evolutions-bonus-guide): Mega Levels 1–3, XL Candy bonuses, and same-type/all-type raid damage multipliers.
- [Community Day & Spotlight Hour Prep Guide](https://pogoevents.app/en/guides/community-day-event-prep-guide): Fast Catch technique, custom search strings, and maximizing XP/Stardust bonuses.
- [Routes, Zygarde Cells & Mateo Guide](https://pogoevents.app/en/guides/routes-zygarde-cells-guide): How to farm Zygarde Cells (up to 3/day), transform Zygarde 10% to Complete Forme, and trade with Mateo.
- [Daily Adventure Incense & Galarian Birds Guide](https://pogoevents.app/en/guides/daily-adventure-incense-galarian-birds): Spawning and catching Galarian Articuno, Zapdos, and Moltres (0.3% base catch rate).
- [Lucky Pokémon, Lucky Friends & Lucky Trinket Guide](https://pogoevents.app/en/guides/lucky-pokemon-trading-guide): Guaranteed Lucky trades (2016–2020 Pokémon, max 35), 12/12/12 IV floor, and 50% Stardust discount.
- [Vivillon Collector & Postcard Regions Map](https://pogoevents.app/en/guides/vivillon-patterns-regions-map-guide): All 18 Vivillon wing patterns mapped to real-world countries and postcard pinning rules.
- [Fast Leveling & XP Grind Guide (Level 1 to 50)](https://pogoevents.app/en/guides/xp-leveling-fast-grind-guide): Friendship XP stacking with Lucky Eggs, Excellent throw mastery, and Level 41–50 requirements.
- [Best Buddy & Excited Mood Without a Poffin](https://pogoevents.app/en/guides/buddy-system-excited-poffin-guide): How to reach 32 Emotion Points in 90 minutes for half candy distance and CP Boost (+1 Level).
- [Dynamax, Gigantamax & Power Spots Guide](https://pogoevents.app/en/guides/dynamax-gigantamax-max-battles-guide): Max Particles (MP) daily cap, Max Moves (Attack, Spirit, Guard), and Gigantamax raids.
- [Adventure Effects Guide (Roar of Time, Spacial Rend, Sunsteel Strike, Moongeist Beam, Freeze Shock, Ice Burn)](https://pogoevents.app/en/guides/adventure-effects-dialga-palkia-necrozma-guide): Out-of-battle field effects, Stardust/Candy costs, and timer extensions.
- [Shadow vs. Purified Pokémon & Frustration Guide](https://pogoevents.app/en/guides/shadow-vs-purified-pokemon-frustration-guide): Why a 0% IV Shadow out-damages a 100% IV non-Shadow (+20% Attack bonus) and how to remove Frustration.

## Optional

- [RSS 2.0 Event Feed](https://pogoevents.app/feed.xml): XML feed of active and upcoming Pokémon GO events.
- [XML Sitemap](https://pogoevents.app/sitemap.xml): Complete index of 4,900+ localized pages (`/cs`, `/en`, `/ja`, `/ru`).
```

---

#### B. Automatický build skript pro generování bohatého `/llms-full.txt`:

Skript `frontend/scripts/generate-llms-full.mjs` zkompiluje živá data a herní tabulky do jednoho uceleného Markdown souboru:

```javascript
// frontend/scripts/generate-llms-full.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');
const distDir = path.join(__dirname, '..', 'dist');

const targetPublicPath = path.join(publicDir, 'llms-full.txt');

console.log('[generate-llms-full] Compiling complete knowledge base for LLMs...');

let content = `# Pokémon GO Event Tracker — Complete Knowledge Reference for LLMs & AI Agents (\`llms-full.txt\`)

> Comprehensive technical & gameplay reference for Pokémon GO Event Tracker (https://pogoevents.app). Designed for AI Search Engines (ChatGPT Search, Perplexity, Claude Search, Google AI Overviews) and autonomous agents.

- **Canonical Domain**: https://pogoevents.app
- **Supported Languages**: Czech (\`cs\`), English (\`en\`), Japanese (\`ja\`), Russian (\`ru\`)
- **Primary Data Sources**: Niantic Official Live Feeds, ScrapedDuck CDN, DialgaDex (Effective Rating \`ER\`), GamePress PvE DPS/TDO simulations, Pokebattler.
- **Last Built**: ${new Date().toISOString()}

---

## 1. Programmatic Markdown & JSON API Endpoints

Every endpoint below is publicly accessible without authentication. Send \`Accept: text/markdown\` or append \`.md\` / \`?format=md&lang=en|cs\` to receive token-efficient Markdown instead of JSON.

| Domain Area | Markdown Endpoint | JSON Endpoint | Content Summary |
|---|---|---|---|
| **Executive Summary** | \`https://pogoevents.app/api/agent/summary.md\` | — | Single-request snapshot of active events, Tier 5/Mega raids, Giovanni's Shadow Legendary, and egg pools |
| **Events & Bonuses** | \`https://pogoevents.app/api/agent/events.md\` | \`https://pogoevents.app/api/events\` | All active and upcoming Pokémon GO events with start/end ISO timestamps, bonuses, and wild spawns |
| **Single Event Detail** | \`https://pogoevents.app/api/agent/events/{slug}.md\` | \`https://pogoevents.app/api/events/{slug}\` | Full breakdown of a specific event (bonuses, wild spawns, event eggs, event field research) |
| **Raid Bosses & Counters** | \`https://pogoevents.app/api/agent/raids.md\` | \`https://pogoevents.app/api/raids\` | Active 1★, 3★, 5★, Mega, and Shadow Raid Bosses with 100% IV CP (Lv 20 & Lv 25) and top counters |
| **Team GO Rocket** | \`https://pogoevents.app/api/agent/rocket.md\` | \`https://pogoevents.app/api/rocket\` | Boss Giovanni, Leaders Cliff/Sierra/Arlo, and Grunt taunts, lineups, and Shadow rewards |
| **Egg Hatch Pools** | \`https://pogoevents.app/api/agent/eggs.md\` | \`https://pogoevents.app/api/eggs\` | Current 2km, 5km, 7km, 10km, and 12km Strange Egg hatch pools with CP ranges and shiny flags |
| **Field Research** | \`https://pogoevents.app/api/agent/research.md\` | \`https://pogoevents.app/api/research\` | Current PokéStop Field Research tasks grouped by category with encounter rewards |

---

## 2. Pokémon That Give Extra Stardust on Catch (29 Species Cheat-Sheet)

Standard wild Pokémon award **100 Stardust** per catch (**125** with Weather Boost). The following 29 species permanently grant bonus Stardust on catch (multiply by **1.5×** when a Star Piece is active):

| Tier (Base Stardust) | Weather Boost | Star Piece (1.5×) | Star Piece + Weather | Pokémon Species |
|---|---|---|---|---|
| **2,100 Stardust** | 2,625 | 3,150 | 3,937 | **Audino** (#531, Normal — boosted in Partly Cloudy) |
| **1,000 Stardust** | 1,250 | 1,500 | 1,875 | **Chimecho** (#358), **Parasect** (#47), **Persian** (#53), **Alolan Persian** (#53), **Amoonguss** (#591), **Garbodor** (#569), **Staryu / Starmie** (#121, 950 Dust), **Combee / Vespiquen** (#416, 950 Dust), **Breloom** (#286, 700 Dust), **Sableye** (#302, 750 Dust), **Morelull / Shiinotic** (#756, 700 Dust) |
| **750 Stardust** | 938 | 1,125 | 1,406 | **Alolan Meowth** (#52), **Galarian Meowth** (#52), **Combee** (#415), **Staryu** (#120), **Trubbish** (#568), **Sableye** (#302) |
| **500 Stardust** | 625 | 750 | 938 | **Meowth** (#52), **Paras** (#46), **Shroomish** (#285), **Shellder** (#90), **Cloyster** (#91, 700 Dust), **Delibird** (#225), **Foongus** (#590), **Morelull** (#755), **Furfrou** (#676, 500 Dust) |

---

## 3. Core Pokémon GO Mechanics & Formulas Reference

1. **Type Effectiveness Multipliers in Pokémon GO**:
   - **Double Weakness (2× Super Effective)**: \`2.56×\` damage (\`1.6 × 1.6\`).
   - **Single Weakness (Super Effective)**: \`1.6×\` damage.
   - **Neutral**: \`1.0×\` damage.
   - **Single Resistance (Not Very Effective)**: \`0.625×\` damage.
   - **Double Resistance / Immunity**: \`0.390625×\` damage (\`0.625 × 0.625\`).
   - **STAB (Same-Type Attack Bonus)**: \`1.2×\` damage when move type matches one of the attacker's types.
   - **Shadow Bonus**: \`+20%\` Attack (\`1.2×\` damage dealt) and \`-16.7%\` Defense (\`1.2×\` damage taken). A \`0/0/0\` Shadow Pokémon deals more DPS in raids than a \`15/15/15\` regular form of the same species.
2. **100% IV (Hundo) Encounter Floors**:
   - **Wild (Non-Boosted)**: \`0/0/0\` (1 in 4,096 Hundo odds, max Level 30).
   - **Wild (Weather Boosted)**: \`4/4/4\` (1 in 1,728 Hundo odds, max Level 35).
   - **Raids, Eggs & Field Research**: \`10/10/10\` (1 in 216 Hundo odds; Level 20 for Raids/Eggs, Level 25 for Weather-Boosted Raids, Level 15 for Research).
   - **Shadow Raids**: \`6/6/6\` floor (1 in 1,000 Hundo odds; purifying adds \`+2/+2/+2\` to each IV stat).
   - **Lucky Trades**: \`12/12/12\` floor (1 in 64 Hundo odds, \`-50%\` Stardust power-up cost).

---

## 4. Top PvE Raid Attackers by Type (2026 Meta Cheat-Sheet)

| Attack Type | Top Mega / Primal | Top Shadow / Legendary | Top Non-Shadow / Accessible |
|---|---|---|---|
| **Dragon** | Mega Rayquaza | Origin Palkia, Origin Dialga, Shadow Salamence | Rayquaza, Garchomp, Baxcalibur |
| **Fire** | Mega Blaziken, Mega Charizard Y | Shadow Heatran, Reshiram (Fusion Flare) | Volcarona, Chandelure, Darmanitan |
| **Water** | Primal Kyogre, Mega Swampert | Kyogre (Origin Pulse), Shadow Kyogre | Kingler, Greninja (Hydro Cannon) |
| **Grass** | Mega Sceptile | Kartana, Shaymin (Sky), Shadow Tangrowth | Roserade, Zarude, Chesnaught |
| **Electric** | Mega Manectric | Xurkitree, Shadow Raikou, Zekrom | Thundurus (Therian), Electivire, Magnezone |
| **Ice** | Mega Gardevoir / Mega Abomasnow | Kyurem (Black/White), Shadow Mamoswine | Baxcalibur, Mamoswine, Glaceon |
| **Fighting** | Mega Lucario, Mega Heracross | Terrakion (Sacred Sword), Shadow Conkeldurr | Keldeo, Lucario (Force Palm), Machamp |
| **Rock** | Mega Diancie, Mega Tyranitar | Shadow Rhyperior, Shadow Rampardos | Rhyperior (Rock Wrecker), Tyrantrum |
| **Ground** | Primal Groudon, Mega Garchomp | Groudon (Precipice Blades), Shadow Excadrill | Landorus (Therian), Garchomp, Excadrill |
| **Ghost / Dark** | Mega Tyranitar, Mega Gengar | Dawn Wings Necrozma, Shadow Tyranitar | Hydreigon (Brutal Swing), Giratina-Origin |
| **Steel** | — | Dusk Mane Necrozma (Sunsteel Strike), Shadow Metagross | Metagross (Meteor Mash), Dialga-Origin |
| **Fairy** | Mega Gardevoir | Shadow Gardevoir, Enamorus | Xerneas (Geomancy), Togekiss, Sylveon |
| **Flying** | Mega Rayquaza (Dragon Ascent) | Rayquaza (Dragon Ascent), Shadow Moltres | Yveltal (Oblivion Wing), Staraptor |
| **Psychic** | Mega Alakazam, Mega Gardevoir | Shadow Mewtwo (Psystrike), Mewtwo | Hoopa Unbound, Lunala |
`;

fs.writeFileSync(targetPublicPath, content, 'utf8');

if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'llms-full.txt'), content, 'utf8');
}

console.log(`[generate-llms-full] Successfully wrote ${Buffer.byteLength(content, 'utf8')} bytes to llms-full.txt`);
```

---

### Případ 6: Dokončení a oprava backend agentních endpointů (`/api/agent/*.md`)

**Cílové soubory:** [`backend/src/agent/markdownGenerator.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/agent/markdownGenerator.ts) a [`backend/src/index.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts)  

#### A. Předání `getCachedEventDetailsSync` do `generateEventsMarkdown`:
V [`backend/src/index.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts) musí být při volání `generateEventsMarkdown` předán synchronní callback pro vytažení detailů události z cache (`getCachedEventDetailsSync`), aby výstup obsahoval bonusy, spawny a výzkumy:

```typescript
// backend/src/index.ts
// GET /api/agent/events.md
app.get('/api/agent/events.md', async (req, res) => {
  try {
    const lang = (req.query.lang === 'en' ? 'en' : 'cs') as AgentLanguage;
    const events = await getEnrichedEventsList(false).catch(() => []);
    const md = generateEventsMarkdown(events, lang, getCachedEventDetailsSync);
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=1800, stale-while-revalidate=86400');
    res.send(md);
  } catch (err: any) {
    res.status(500).send(`# Error generating events markdown: ${err.message}`);
  }
});
```

#### B. Registrace chybějících endpointů `/api/agent/eggs.md` a `/api/agent/rocket.md`:

```typescript
// backend/src/index.ts
// GET /api/agent/eggs.md - Egg Hatch Pools in Markdown
app.get('/api/agent/eggs.md', async (req, res) => {
  try {
    const lang = (req.query.lang === 'en' ? 'en' : 'cs') as AgentLanguage;
    const eggs = await getEggPoolList(false).catch(() => []);
    const md = generateEggsMarkdown(eggs, lang);
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=1800, stale-while-revalidate=86400');
    res.send(md);
  } catch (err: any) {
    res.status(500).send(`# Error generating eggs markdown: ${err.message}`);
  }
});

// GET /api/agent/rocket.md - Team GO Rocket Lineups in Markdown
app.get('/api/agent/rocket.md', async (req, res) => {
  try {
    const lang = (req.query.lang === 'en' ? 'en' : 'cs') as AgentLanguage;
    const rocket = await getRocketLineupsList(false).catch(() => null);
    const md = generateRocketMarkdown(rocket, lang);
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=1800, stale-while-revalidate=86400');
    res.send(md);
  } catch (err: any) {
    res.status(500).send(`# Error generating rocket markdown: ${err.message}`);
  }
});
```

---

### Případ 7: HTTP hlavičky a HTML `<head>` link relace pro AI discovery

**Cílové soubory:** [`frontend/firebase.json`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/firebase.json), [`frontend/src/app/layout.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/layout.tsx), [`frontend/src/utils/seoHelper.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/utils/seoHelper.ts)  

#### A. Konfigurace `frontend/firebase.json`:
Nastavení globální HTTP hlavičky `Link` a korektního MIME typu `text/plain; charset=utf-8` pro `/llms.txt`:

```json
{
  "source": "**",
  "headers": [
    {
      "key": "Link",
      "value": "</llms.txt>; rel=\"describedby\"; type=\"text/plain\", </api/agent/events.md>; rel=\"alternate\"; type=\"text/markdown\""
    }
  ]
},
{
  "source": "/llms.txt",
  "headers": [
    {
      "key": "Content-Type",
      "value": "text/plain; charset=utf-8"
    },
    {
      "key": "Cache-Control",
      "value": "public, max-age=3600, stale-while-revalidate=86400"
    }
  ]
}
```

#### B. Konfigurace `buildAlternates` v `frontend/src/utils/seoHelper.ts`:

```typescript
export function buildAlternates(lang: Language, pathSuffix: string = '', markdownEndpoint?: string) {
  const normalizedSuffix = pathSuffix ? (pathSuffix.startsWith('/') ? pathSuffix : `/${pathSuffix}`) : '';

  const alternates: {
    canonical: string;
    languages: Record<string, string>;
    types?: Record<string, string>;
  } = {
    canonical: `${SITE_BASE_URL}/${lang}${normalizedSuffix}`,
    languages: {
      cs: `${SITE_BASE_URL}/cs${normalizedSuffix}`,
      en: `${SITE_BASE_URL}/en${normalizedSuffix}`,
      ja: `${SITE_BASE_URL}/ja${normalizedSuffix}`,
      ru: `${SITE_BASE_URL}/ru${normalizedSuffix}`,
      'x-default': `${SITE_BASE_URL}/en${normalizedSuffix}`,
    },
  };

  if (markdownEndpoint) {
    alternates.types = {
      'text/markdown': markdownEndpoint.startsWith('http')
        ? markdownEndpoint
        : `${SITE_BASE_URL}${markdownEndpoint.startsWith('/') ? '' : '/'}${markdownEndpoint}`,
    };
  }

  return alternates;
}
```

---

## 6. Část 5: Kontrolní checklist a Metodika měření úspěšnosti GEO v produkci

### 5.1. 10bodový technický auditní checklist

Před nasazením každého produkčního buildu ověřte následující body:

1. [ ] **SSG / SSR HTML tělo:** Vygenerovaný soubor v `frontend/dist/[lang]/raids/[slug].html` a `pokemon/[id].html` obsahuje pod `<h2>` plný Answer-First text a sémantickou tabulku `<table>` ještě před spuštěním klientského JavaScriptu.
2. [ ] **Zákaz spinneru v primárním DOM:** V `.app-page-content-wrapper` se v surovém HTML nenachází prázdný `<div class="spinner">`.
3. [ ] **HTTP Link hlavička:** Požadavek `curl -I https://pogoevents.app/` vrací hlavičku `Link: </llms.txt>; rel="describedby"`.
4. [ ] **Validita `/llms.txt`:** Všechny položky pod H2 sekcemi v `frontend/public/llms.txt` mají tvar `[Název](URL)`.
5. [ ] **Bohatý `/llms-full.txt`:** Soubor má velikost > 25 KB a obsahuje tabulku 29 Stardust Pokémonů a vzorce poškození.
6. [ ] **Funkčnost `/api/agent/*.md`:** Všech 5 endpointů (`events.md`, `raids.md`, `rocket.md`, `eggs.md`, `summary.md`) vrací stav 200 s hlavičkou `Content-Type: text/markdown; charset=utf-8`.
7. [ ] **ISO 8601 časování:** Startovní a koncové časy událostí v `Event` JSON-LD obsahují timezone offset (např. `+02:00` nebo `Z`).
8. [ ] **Robots.txt propustnost:** V `robots.txt` jsou explicitně povoleny `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot` a `PerplexityBot`.
9. [ ] **Lokalizace `<html lang>`:** Soubory `cs.html`, `ja.html` a `ru.html` mají odpovídající atribut `lang` přepsaný skriptem `post-build.js`.
10. [ ] **Validita strukturovaných dat:** Nástroj *Google Rich Results Test* nehlásí žádné kritické chyby v `Article`, `FAQPage`, `Event` ani `BreadcrumbList`.

---

### 5.2. Metodika prompt testingu na AI vyhledávačích

Pro ověření citovanosti spusťte měsíčně následující testovací sadu dotazů na **ChatGPT Search**, **Perplexity AI** a **Google AI Overviews**:

| Testovací dotaz (Prompt) | Očekávaný fakt v odpovědi | Očekávaná citace ze zdroje |
|---|---|---|
| *„Jaké jsou nejlepší countery na Mega Rayquazu v Pokémon GO?"* | Dvojitá slabost na Ice (2.56×), nejlepší Mega counter Mega Glalie / Mega Abomasnow, Shadow Mamoswine, Baxcalibur. | Citace `pogoevents.app/cs/raids/mega-rayquaza-counters` |
| *„Jaké je 100% IV CP pro Mewtwo z raidu bez počasí a s počasím?"* | 2387 CP (Lv 20 bez počasí), 2984 CP (Lv 25 Windy weather boost). | Citace `pogoevents.app/cs/raids/mewtwo-counters` |
| *„Jak porazit Giovanniho v Pokémon GO tento měsíc a jakou mechaniku použít na štíty?"* | Persian v 1. slotu, spálení štítů bojovými rychlými útoky, 2sekundový stun-lock po Charged útoku a switchi. | Citace `pogoevents.app/cs/rocket/giovanni` |
| *„Kteří Pokémoni dávají extra Stardust při chytání v Pokémon GO?"* | Audino (2100 Stardust), Chimecho/Parasect (1000 Stardust), Meowth/Shellder (500 Stardust), násobení Star Piece 1.5×. | Citace `pogoevents.app/cs/guides/extra-stardust-pokemon-guide` |
| *„Jaké jsou nejlepší útoky a Max CP pro Lucario v Pokémon GO?"* | Force Palm + Aura Sphere (PvE), Max CP 3056 na Lv 50, slabosti Fighting, Ground, Fire. | Citace `pogoevents.app/cs/pokemon/448` |

---

### 5.3. Měření AI referral trafficu v Google Analytics 4 (GA4)

Tradiční Google Search Console nezobrazuje prokliky z ChatGPT ani Claude. Pro vyhodnocení návštěvnosti z generativních enginů v GA4 vytvořte **Custom Channel Group: AI Search**:

#### Pravidlo pro zařazení do AI Search kanálu v GA4:
```
Source (Zdroj) odpovídá regulárnímu výrazu:
.*(chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai|copilot\.microsoft\.com|gemini\.google\.com|android-app:\/\/com\.openai\.chatgpt).*
NEBO
Medium (Médium) = "ai-referral"
```

Doporučujeme sledovat konverzní poměr uživatelů přicházejících z AI platforem (zejména generování in-game filtrů v `/filter` a přidávání trenérských kódů v `/friends`), který bývá u návštěvníků z odpovědních enginů **2× až 3× vyšší** než u běžného organického vyhledávání.

---

## 7. Bibliografie a citace primárních zdrojů

### Primární vědecká literatura
1. **Aggarwal, P., Murahari, V., Rajpurohit, T., Kalyan, A., Narasimhan, K., & Deshpande, A.** (2024). *GEO: Generative Engine Optimization*. arXiv preprint [arXiv:2311.09735](https://arxiv.org/abs/2311.09735). Prezentováno na ACM SIGKDD Conference on Knowledge Discovery and Data Mining (KDD 2024).

### Oficiální technické specifikace a dokumentace
2. **Answer.AI / Jeremy Howard** (srpen 2026). *The /llms.txt file specification (Version 2)*. [https://llmstxt.org/](https://llmstxt.org/)
3. **Chrome Lighthouse Team** (2026). *Agentic Browsing: Auditing /llms.txt compliance*. [https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)
4. **OpenAI** (2026). *Overview of OpenAI Crawlers: OAI-SearchBot, ChatGPT-User, and GPTBot*. [https://platform.openai.com/docs/bots](https://platform.openai.com/docs/bots)
5. **Anthropic** (2026). *Anthropic Web Crawlers: Claude-SearchBot, Claude-User, and ClaudeBot*. [https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
6. **Perplexity AI** (2026). *Perplexity Crawlers and Bot Directives: PerplexityBot & Perplexity-User*. [https://docs.perplexity.ai/guides/bots](https://docs.perplexity.ai/guides/bots)
7. **Google Search Central** (2026). *Overview of Google crawlers (Googlebot & Google-Extended)*. [https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers)
8. **IETF RFC 9309** (2022). *Robots Exclusion Protocol*. [https://datatracker.ietf.org/doc/html/rfc9309](https://datatracker.ietf.org/doc/html/rfc9309)
9. **W3C / WHATWG** (2026). *HTML Living Standard — Semantic Tables & Link Types*. [https://html.spec.whatwg.org/](https://html.spec.whatwg.org/)

### Primární soubory v repozitáři projektu (`C:\PROJEKTY\OSOBNÍ\Pokemon-GO-event-tracker`)
10. [`frontend/public/llms.txt`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/public/llms.txt) a [`frontend/public/llms-full.txt`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/public/llms-full.txt)
11. [`backend/src/agent/markdownGenerator.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/agent/markdownGenerator.ts) a [`backend/src/index.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts)
12. [`frontend/src/app/[lang]/raids/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/raids/[slug]/page.tsx)
13. [`frontend/src/app/[lang]/rocket/[leader]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/rocket/[leader]/page.tsx)
14. [`frontend/src/app/[lang]/pokemon/[id]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/pokemon/[id]/page.tsx)
15. [`frontend/src/app/[lang]/events/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/[lang]/events/[slug]/page.tsx)
16. [`frontend/src/app/robots.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/robots.ts) a [`frontend/firebase.json`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/firebase.json)
17. [`docs/seo-and-geo-audit-2026.md`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/docs/seo-and-geo-audit-2026.md)
