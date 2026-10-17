# Návrhy témat bakalářské práce

Všechna témata vycházejí z reálného projektu **Pokémon GO Event Tracker** ([pogoevents.app](https://pogoevents.app)) — produkční webová aplikace s ~4 900 SSG stránkami, Express backendem na Google Cloud Run a Android mobilní aplikací.

---

## Téma 1 — Scraping a integrace dat z heterogenních webových zdrojů

### Název práce
**Systém pro automatizovaný sběr a sjednocení dat z heterogenních webových zdrojů s odolností vůči výpadkům**

### Anotace
Práce se zabývá návrhem a implementací modulárního systému pro automatizovaný sběr (web scraping) strukturovaných i nestrukturovaných dat z více nezávislých zdrojů. Systém řeší klíčové problémy reálného scrapingu: rozdílné formáty zdrojových dat, výpadky a rate-limiting poskytovatelů, sémantická klasifikace extrahovaného obsahu a obohacování (enrichment) surových dat do jednotného datového modelu. Praktická implementace je demonstrována na doméně mobilní hry Pokémon GO, kde systém agreguje data o herních událostech, raid bossech, výzkumných úkolech a egg poolech z webů LeekDuck, ScrapedDuck (GitHub CDN) a Niantic blogu.

### Cíle práce
1. Analyzovat existující přístupy k web scrapingu a porovnat knihovny/nástroje (Cheerio, Puppeteer, Playwright, Scrapy).
2. Navrhnout architekturu multi-source ingestion pipeline s failover logikou přes více CDN mirrorů.
3. Implementovat sémantický klasifikátor HTML sekcí (bonusy, spawny, raidy, výzkum, debuty) pomocí pravidlové analýzy DOM stromu.
4. Navrhnout a implementovat enrichment pipeline, který surová data obohacuje o metadata (typy Pokémonů, CP rozsahy, counter doporučení, obtížnostní stupně).
5. Implementovat hybridní cache (in-memory + persistentní disk) se vzorem Stale-While-Revalidate.
6. Experimentálně ověřit spolehlivost systému při simulovaných výpadcích zdrojů.

### Klíčové části projektu, které využiješ

| Modul | Soubor | Co dělá |
|---|---|---|
| ScrapedDuck Ingest | [`scrapedDuckIngest.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/ingest/scrapedDuckIngest.ts) | Multi-CDN failover fetcher se 4 mirrory (jsdelivr, fastly, gcore, GitHub raw) |
| Enrichment Pipelines | [`enrichmentPipelines.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/ingest/enrichmentPipelines.ts) | 4 obohacovací pipelines (raidy, vejce, výzkum, Rocket) |
| Sémantický klasifikátor | [`semanticClassifier.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/parsers/semanticClassifier.ts) | Pravidlová klasifikace HTML sekcí do sémantických kategorií |
| Hlavní scraper | [`scraper.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/scraper.ts) | 3 100+ řádků — HTTP scraping pomocí Cheerio, statické databáze meta dat |
| Cache vrstva | [`index.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts) | Hybridní cache s různými TTL (1h–24h) a SWR vzor |
| Parsery | [`habitatParser.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/parsers/habitatParser.ts), [`moveParser.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/parsers/moveParser.ts), [`goPassParser.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/parsers/goPassParser.ts) | Specializované parsery pro různé typy herního obsahu |

### Metody a technologie
- **Scraping**: Node.js, Cheerio (DOM parsing), HTTP klient s retry logikou
- **Klasifikace**: Pravidlový systém nad DOM stromem (heading hierarchy, keyword matching)
- **Cache**: In-memory Map + JSON persistence, node-cron scheduling
- **Testování**: Vitest — unit testy pro každý modul pipeline

### Očekávaný výstup
Modulární knihovna v TypeScriptu s dokumentovaným API, sada unit testů, experimentální měření spolehlivosti (uptime, latence, fallback úspěšnost), technická zpráva.

### Hodnocení vhodnosti

| Kritérium | Hodnocení |
|---|---|
| Rozsah na bakalářku | ⭐⭐⭐⭐⭐ Ideální — dobře ohraničené |
| Teoretický základ | ⭐⭐⭐⭐ Web scraping, distribuované systémy, cache strategie |
| Praktický výstup | ⭐⭐⭐⭐⭐ Fungující produkční systém |
| Originalita | ⭐⭐⭐ Scraping je známé téma, ale multi-CDN failover + sémantická klasifikace ho posouvají |

---

## Téma 2 — Hybridní přístup k extrakci dat: pravidlový systém s AI zálohou

### Název práce
**Hybridní extrakce strukturovaných dat z webu: kombinace pravidlového parsingu a velkých jazykových modelů**

### Anotace
Práce navrhuje a implementuje hybridní systém pro extrakci strukturovaných dat z webových stránek, který kombinuje deterministický pravidlový parsing s inteligentním AI fallbackem. Jádrem řešení je mechanismus hodnocení spolehlivosti (confidence scoring), který automaticky vyhodnocuje kvalitu extrakce pravidlovým systémem a při nedostatečné spolehlivosti (< 0.75) deleguje zpracování na velký jazykový model (Google Gemini Flash). Systém dále detekuje nové, dosud neznámé herní mechaniky a adaptivně rozhoduje o strategii extrakce. Práce analyzuje trade-off mezi rychlostí/cenou pravidlového přístupu a flexibilitou/přesností LLM přístupu.

### Cíle práce
1. Provést rešerši přístupů k extrakci strukturovaných dat z webu (rule-based, ML-based, LLM-based, hybrid).
2. Navrhnout architekturu confidence scoring systému pro hodnocení kvality extrakce.
3. Implementovat detektor nových/neznámých datových vzorů (novel game mechanics detection).
4. Navrhnout a implementovat AI fallback pipeline využívající Google Gemini Flash API.
5. Implementovat HTML cleaner optimalizovaný pro vstup do LLM (redukce tokenů).
6. Experimentálně porovnat přesnost, latenci a náklady pravidlového vs. AI přístupu na reálném datasetu.

### Klíčové části projektu, které využiješ

| Modul | Soubor | Co dělá |
|---|---|---|
| AI Fallback Ingest | [`aiFallbackIngest.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/ai/aiFallbackIngest.ts) | Confidence evaluator (0.0–1.0), detekce nových mechanik (Gigantamax, Fusion Energy…), HTML cleaner pro AI, Gemini Flash fallback |
| Meta Evaluator | [`metaEvaluator.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/meta/metaEvaluator.ts) | Cross-referencing spawnů/raidů s meta databází, generování EventHighlights |
| Sémantický klasifikátor | [`semanticClassifier.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/parsers/semanticClassifier.ts) | Pravidlový základ — klasifikace DOM sekcí |
| Enrichment Pipelines | [`enrichmentPipelines.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/ingest/enrichmentPipelines.ts) | Post-processing pipeline pro obohacení dat |

### Metody a technologie
- **Pravidlový parsing**: Cheerio, regulární výrazy, DOM traversal
- **AI extrakce**: Google Gemini Flash API, prompt engineering, structured output
- **Hodnocení**: Precision/Recall/F1 na ručně anotovaném datasetu, latence, cena za API volání
- **HTML optimalizace**: Tokenová redukce (odstranění CSS/JS/navigace, zachování sémantiky)

### Očekávaný výstup
Hybridní extrakční framework, anotovaný evaluační dataset (~100 webových stránek s událostmi), srovnávací experimenty (rule-only vs. LLM-only vs. hybrid), cost-benefit analýza.

### Hodnocení vhodnosti

| Kritérium | Hodnocení |
|---|---|
| Rozsah na bakalářku | ⭐⭐⭐⭐ Ambiciózní, ale zvládnutelné — AI část je dobře izolovaná |
| Teoretický základ | ⭐⭐⭐⭐⭐ Information extraction, NLP, confidence estimation, LLM prompting |
| Praktický výstup | ⭐⭐⭐⭐⭐ Měřitelné výsledky, produkční nasazení |
| Originalita | ⭐⭐⭐⭐⭐ Hybrid rule+LLM s confidence scoring je aktuální výzkumné téma |

> [!TIP]
> Toto téma je **akademicky nejsilnější** — kombilnuje aktuální AI trendy s měřitelnými experimenty, což vedoucí práce ocení.

---

## Téma 3 — Generování statických webových stránek ve velkém měřítku

### Název práce
**Statická generace webových stránek ve velkém měřítku: architektura, optimalizace a nasazení vícejazyčného webu s ~5 000 stránkami**

### Anotace
Práce se zabývá návrhem, implementací a optimalizací procesu statické generace (SSG) rozsáhlého vícejazyčného webu s přibližně 5 000 stránkami pomocí frameworku Next.js 16. Řeší klíčové výzvy: efektivní generaci stránek ve 4 jazykových mutacích, dynamické načítání dat z API během build-time, optimalizaci build času, generaci dynamických sitemapů a OG obrázků, a hybridní přístup k renderování (SSG pro uživatele, SSR pro vyhledávací roboty). Výsledný web je nasazen na Firebase Hosting Edge CDN s TTFB pod 50 ms.

### Cíle práce
1. Analyzovat přístupy k renderování webových stránek (CSR, SSR, SSG, ISR) a jejich dopad na výkon a SEO.
2. Navrhnout architekturu pro SSG webu s dynamickými daty a 4 jazykovými mutacemi.
3. Implementovat systém `generateStaticParams` pro ~5 000 kombinací stránek a jazyků.
4. Navrhnout a implementovat dynamický sitemap generátor a OG image endpoint.
5. Implementovat bot-detection s SSR fallbackem pro vyhledávací roboty.
6. Měřit a optimalizovat Core Web Vitals (LCP, FID, CLS, TTFB).
7. Porovnat nasazení na GitHub Pages vs. Firebase Hosting CDN.

### Klíčové části projektu, které využiješ

| Modul | Soubor | Co dělá |
|---|---|---|
| App Router Pages | [`frontend/src/app/[lang]/`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app) | 20+ route segmentů s `[lang]` parametrem |
| Sitemap Generator | [`frontend/src/app/sitemap.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts) | Dynamický sitemap pro 4 900+ URL |
| OG Image Generator | [`frontend/src/app/api/og/route.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/app/api/og/route.tsx) | Dynamické OG obrázky pro sociální sítě |
| SSR pro boty | [`backend/src/ssr.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/ssr.ts) | 754 řádků — pre-rendering HTML s hreflang, canonical, OG meta |
| Lokalizace | [`frontend/src/data/translations.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/data/translations.ts) | UI překlady ve 4 jazycích |
| Pokémon překlad | [`frontend/src/utils/pokemonTranslator.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/utils/pokemonTranslator.ts) | Překlad 1 025 Pokémon jmen do 4 jazyků |
| Post-build | [`frontend/post-build.js`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/post-build.js) | Asset optimalizace a dist sync |
| CI/CD | [`.github/workflows/deploy-firebase.yml`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/.github/workflows/deploy-firebase.yml) | Firebase Hosting deployment |

### Metody a technologie
- **Framework**: Next.js 16 (App Router, Turbopack), React 19
- **Měření**: Lighthouse, WebPageTest, Chrome UX Report
- **Nasazení**: Firebase Hosting CDN, GitHub Pages (A/B porovnání)
- **SEO audit**: Google Search Console, Ahrefs/Screaming Frog

### Hodnocení vhodnosti

| Kritérium | Hodnocení |
|---|---|
| Rozsah na bakalářku | ⭐⭐⭐⭐⭐ Perfektní rozsah |
| Teoretický základ | ⭐⭐⭐⭐ Renderovací strategie, CDN, Web Vitals, SEO |
| Praktický výstup | ⭐⭐⭐⭐⭐ Reálný produkční web s měřitelnými metrikami |
| Originalita | ⭐⭐⭐ SSG je známé, ale škála 5 000 stránek + multilingvální aspekt je zajímavý |

---

## Téma 4 — Vícejazyčné SEO a serverové renderování pro vyhledávací roboty

### Název práce
**Optimalizace vícejazyčné webové aplikace pro vyhledávače: strategie SSR, strukturovaná data a hreflang implementace**

### Anotace
Práce analyzuje a implementuje komplexní SEO strategii pro vícejazyčnou single-page aplikaci (SPA) ve 4 jazykových mutacích (čeština, angličtina, japonština, ruština). Hlavním problémem je, že SPA frameworky standardně generují prázdný HTML shell, který vyhledávací roboti nedokáží efektivně indexovat. Práce navrhuje hybridní řešení: detekci robotů na straně serveru (user-agent analýza) s dynamickým pre-renderingem plnohodnotného HTML včetně hreflang tagů, kanonických URL, Open Graph metadat a strukturovaných dat. Součástí je experimentální měření dopadu implementovaných technik na indexaci a pozice v Google Search.

### Cíle práce
1. Provést rešerši SEO technik pro SPA/PWA aplikace (pre-rendering, dynamic rendering, SSR).
2. Analyzovat specifikaci hreflang a její vliv na indexaci vícejazyčného obsahu.
3. Navrhnout a implementovat bot-detection middleware s SSR fallbackem.
4. Implementovat dynamický sitemap generátor pro 4 900+ URL s prioritami a changeFrequency.
5. Implementovat dynamický OG image endpoint pro sociální sdílení.
6. Měřit dopad na indexaci pomocí Google Search Console (před/po nasazení).

### Klíčové části projektu
Stejné jako Téma 3 (SSR, sitemap, OG, lokalizace) + analýza dat z Google Search Console.

### Hodnocení vhodnosti

| Kritérium | Hodnocení |
|---|---|
| Rozsah na bakalářku | ⭐⭐⭐⭐ Dobře vymezené |
| Teoretický základ | ⭐⭐⭐⭐ SEO, information retrieval, structured data |
| Praktický výstup | ⭐⭐⭐⭐⭐ Měřitelný dopad na reálný traffic |
| Originalita | ⭐⭐⭐ SEO je praktické, ale méně akademicky „sexy" |

---

## Téma 5 — Tokenově efektivní API pro velké jazykové modely

### Název práce
**Návrh tokenově efektivního API pro konzumaci webového obsahu velkými jazykovými modely**

### Anotace
S rostoucím využitím AI chatbotů a agentů (ChatGPT, Gemini, Claude) pro přístup k webovému obsahu vzniká potřeba speciálních API endpointů optimalizovaných pro strojové zpracování. Práce navrhuje a implementuje sadu Markdown-based API endpointů, které transformují komplexní strukturovaná data do tokenově efektivní textové reprezentace vhodné pro LLM konzumaci. Na rozdíl od tradičních JSON API, která obsahují redundantní klíče a vnořené struktury, Markdown formát výrazně redukuje počet tokenů při zachování sémantické bohatosti. Práce experimentálně porovnává JSON vs. Markdown reprezentace z hlediska tokenové efektivity, přesnosti odpovědí LLM a latence zpracování.

### Cíle práce
1. Analyzovat způsoby, jakými LLM agenti konzumují webová data (RAG, tool use, web browsing).
2. Navrhnout Markdown schéma optimalizované pro minimální tokenovou spotřebu.
3. Implementovat 4 generátory: events, raids, research, summary markdown.
4. Experimentálně porovnat tokenovou efektivitu JSON vs. Markdown na vzorku dat.
5. Měřit vliv formátu na kvalitu odpovědí LLM (GPT-4, Gemini, Claude) pomocí evaluačního benchmarku.
6. Navrhnout best practices pro design „AI-friendly" API.

### Klíčové části projektu, které využiješ

| Modul | Soubor | Co dělá |
|---|---|---|
| Markdown Generator | [`markdownGenerator.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/agent/markdownGenerator.ts) | 4 generátory pro events/raids/research/summary v Markdown |
| Agent Endpoints | [`index.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/index.ts) | `/api/agent/*.md` endpointy |
| Testy | [`markdownGenerator.test.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/agent/markdownGenerator.test.ts) | Unit testy generátorů |

### Hodnocení vhodnosti

| Kritérium | Hodnocení |
|---|---|
| Rozsah na bakalářku | ⭐⭐⭐ Menší scope — potřeba rozšířit o experimenty |
| Teoretický základ | ⭐⭐⭐⭐⭐ LLM, tokenizace, API design, information retrieval |
| Praktický výstup | ⭐⭐⭐⭐ Produkční endpointy + benchmark |
| Originalita | ⭐⭐⭐⭐⭐ Velmi aktuální a málo prozkoumaná oblast |

> [!NOTE]
> Toto téma je **nejoriginálnější a nejaktuálnější**, ale samotné API je scope-wise menší — potřebuješ ho rozšířit o experimentální evaluaci s více LLM modely, aby to mělo dostatečný rozsah na bakalářku.

---

## Téma 6 — Cross-platform mobilní aplikace nad staticky generovaným webem

### Název práce
**Vývoj cross-platform mobilní aplikace pomocí Capacitor frameworku nad staticky generovaným webovým obsahem**

### Anotace
Práce se zabývá návrhem a implementací mobilní aplikace pro platformu Android, která obaluje staticky generovaný web (Next.js SSG) pomocí frameworku Capacitor 8. Řeší specifické výzvy hybridního přístupu: integrace nativních funkcí (push notifikace, overlay widget), offline podpora, navigace v SPA kontextu uvnitř WebView, a optimalizace výkonu na mobilních zařízeních. Práce porovnává tento přístup s alternativami (React Native, Flutter, PWA) z hlediska výkonu, vývojářské zkušenosti a schopnosti sdílet kódovou základnu s webem.

### Cíle práce
1. Provést rešerši cross-platform přístupů (Capacitor/Cordova, React Native, Flutter, PWA).
2. Navrhnout architekturu pro obalení SSG webu do nativní Android aplikace.
3. Implementovat nativní push notifikace s přesnými alarmy (allowWhileIdle).
4. Implementovat floating overlay widget service pro in-game informace.
5. Řešit navigaci (App Router ↔ Capacitor router) a deep linking.
6. Měřit výkon (startup time, memory, battery) vs. nativní a PWA alternativy.
7. Implementovat CI/CD pipeline pro automatický build a release APK.

### Klíčové části projektu, které využiješ

| Modul | Soubor | Co dělá |
|---|---|---|
| Capacitor Config | [`frontend/capacitor.config.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/capacitor.config.ts) | Capacitor 8 konfigurace |
| Overlay Plugin | [`overlayPlugin.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/utils/overlayPlugin.ts) | Native Android overlay service bridge |
| Notifikace | [`useNotifications.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/hooks/useNotifications.ts) | Push notification scheduling |
| Navigace | [`useAppNavigate.tsx`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/frontend/src/hooks/useAppNavigate.tsx) | Unified navigation (web + Capacitor) |
| APK Release CI | [`.github/workflows/release-apk.yml`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/.github/workflows/release-apk.yml) | Automatický build Capacitor + Gradle |

### Hodnocení vhodnosti

| Kritérium | Hodnocení |
|---|---|
| Rozsah na bakalářku | ⭐⭐⭐⭐ Solidní rozsah |
| Teoretický základ | ⭐⭐⭐ Cross-platform strategie, WebView architektura |
| Praktický výstup | ⭐⭐⭐⭐⭐ Funkční APK v Google Play / GitHub Releases |
| Originalita | ⭐⭐⭐ Capacitor je známý, ale SSG+overlay widget je unikátní combo |

---

## Téma 7 — CI/CD pipeline pro multi-target deployment

### Název práce
**Návrh a implementace CI/CD pipeline pro současné nasazení webové aplikace na více platforem**

### Anotace
Práce navrhuje a implementuje komplexní CI/CD pipeline pomocí GitHub Actions pro automatické nasazení full-stack webové aplikace na 4 nezávislé platformy: statický frontend na Firebase Hosting CDN a GitHub Pages, backend API na Google Cloud Run, a Android APK přes Capacitor + Gradle. Práce analyzuje výzvy multi-target deploymentu: koordinace závislostí mezi buildy, správa secrets, rollback strategie, cache optimalizace v CI, a monitoring zdraví služeb po nasazení.

### Klíčové části projektu

| Workflow | Co dělá |
|---|---|
| [`deploy.yml`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/.github/workflows/deploy.yml) | SSG → GitHub Pages |
| [`deploy-firebase.yml`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/.github/workflows/deploy-firebase.yml) | SSG → Firebase Hosting |
| [`deploy-backend.yml`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/.github/workflows/deploy-backend.yml) | Backend → Google Cloud Run |
| [`release-apk.yml`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/.github/workflows/release-apk.yml) | Capacitor + Gradle → GitHub Release |

### Hodnocení vhodnosti

| Kritérium | Hodnocení |
|---|---|
| Rozsah na bakalářku | ⭐⭐⭐ Spíš menší — vhodné jako součást většího tématu |
| Teoretický základ | ⭐⭐⭐ DevOps, CI/CD, cloud-native deployment |
| Praktický výstup | ⭐⭐⭐⭐ Funkční pipeline |
| Originalita | ⭐⭐ CI/CD je standardní praxe |

> [!WARNING]
> Samotné CI/CD je na bakalářku **pravděpodobně příliš úzké téma**. Doporučuji ho kombinovat s jiným tématem (např. s Tématem 3 nebo 6) jako kapitolu o nasazení a automatizaci.

---

## Srovnávací tabulka

| # | Téma | Akademická síla | Praktický výstup | Originalita | Doporučení |
|---|---|---|---|---|---|
| 1 | **Scraping & integrace dat** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 🟢 **Bezpečná volba** — tvůj první nápad, solidní scope |
| 2 | **Hybrid rule+AI extrakce** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 🟣 **Nejlepší pro vysoké hodnocení** |
| 3 | **SSG ve velkém měřítku** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 🟢 Solidní volba, dobře měřitelné |
| 4 | **Multilingvální SEO + SSR** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 🟡 Praktické, ale méně akademické |
| 5 | **Token-efektivní API pro LLM** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 🟣 **Nejoriginálnější** — potřeba rozšířit scope |
| 6 | **Cross-platform mobilní app** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 🟡 Spíš praktické než akademické |
| 7 | **CI/CD multi-target** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | 🔴 Příliš úzké — kombinovat s jiným |

---

## Moje doporučení

### Pro maximální hodnocení: **Téma 2** (Hybrid rule + AI extrakce)
Kombinuje tvůj zájem o scraping s aktuálním AI trendem. Confidence scoring + LLM fallback je téma, které se dá pěkně experimentálně změřit a je akademicky atraktivní. Většinu kódu už máš hotovou v [`aiFallbackIngest.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/ai/aiFallbackIngest.ts) a [`semanticClassifier.ts`](file:///C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/backend/src/parsers/semanticClassifier.ts).

### Pro bezpečnou volbu: **Téma 1** (Scraping & integrace dat)
Tvůj původní nápad, dobře ohraničené, máš většinu kódu hotovou. Těžiště práce bude v teoretické rešerši + experimentálním měření spolehlivosti + dokumentaci architektury.

### Pro originální niku: **Téma 5** (Token-efektivní API pro LLM)
Téma, o kterém zatím skoro nikdo nepsal bakalářku. Ale potřebuješ ho rozšířit o solidní experimentální evaluaci s více LLM modely.

### Kombinované téma (pokud chceš pokrýt více):
**„Automatizovaný sběr a zpracování herních dat: od web scrapingu přes sémantickou klasifikaci po AI-asistovanou extrakci"** — spojení Témat 1 + 2 pod jednu střechu, kde pravidlový scraping je základ a AI fallback je nadstavba.
