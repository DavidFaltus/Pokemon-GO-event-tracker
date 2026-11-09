# Kompletní hloubkový audit a strategie celkové přestavby `pogoevents.app` pro schválení Google AdSense (Listopad 2026)

**Datum výzkumu:** 9. listopadu 2026  
**Cílová doména:** `https://pogoevents.app`  
**Google Publisher ID:** `pub-8800056915088711`  
**Analyzovaný stav repozitáře:** `HEAD` (`436b64b`, po commitech `1dcc09b`, `838ee7b`, `fbc1a6f`, `adf56f2`, `4fd9ed9`)  
**Důvod zamítnutí v Google AdSense:** *Obsah nízké hodnoty (Low Value Content) / Web nesplňuje požadavky programu Google AdSense*

---

## 1. Manažerské shrnutí (Executive Summary)

Přestože v říjnu 2026 (commit `1dcc09b`) proběhla první vlna úprav (stažení tehdejších `/pokemon/[id]` ze sitemapy, doplnění 19 průvodců do `/guides` a přidání krátkých `<article class="seo-entity-summary card">` boxů nad některé podstránky), **následné commity z 1. listopadu 2026 (`838ee7b`, `fbc1a6f`, `adf56f2`) zavedly novou architekturu Sitemap Indexu a masového Pokédexu, která problém „Obsahu nízké hodnoty“ (Low Value Content) naopak mnohonásobně prohloubila.**

Kvantitativní audit aktuálně vygenerovaného statického buildu (`frontend/dist`) a sitemapy (`frontend/public/sitemap*.xml`) odhalil **6 strukturálních příčin**, proč automatizovaný klasifikátor Google (`Mediapartners-Google` / `Googlebot`) i lidský kontrolor vyhodnocují doménu `pogoevents.app` jako **masově generovanou databázi s 80–95 % duplicitního HTML kódu**:

1. **82,8 % celé sitemapy (4 096 ze 4 944 URL) tvoří programaticky generované tabulky Pokédexu (`sitemap-pokedex.xml`) bez unikátní redakční prózy — včetně 320 URL pro nevydané Pokémony:**
   - Commit `838ee7b` zavedl `sitemap-pokedex.xml`, který indexuje `1 024 Pokémonů × 4 jazyky = 4 096 URL` (`frontend/src/utils/sitemapGenerator.ts:154-166`).
   - V katalogu `frontend/src/data/pokedexCatalog.json` je **80 Pokémonů, kteří v Pokémon GO vůbec nejsou vydaní** (`isReleasedInGo: false`, např. Phione `#489`, Manaphy `#490`, Arceus `#493`, Koraidon `#1007`, Miraidon `#1008`). Přesto mají v `frontend/src/app/[lang]/pokedex/[slug]/page.tsx:75` nastaveno `robots: { index: true, follow: true }` a jsou v sitemapě (`sitemapGenerator.ts:160`).
   - Měření textu ve vygenerovaném HTML (`frontend/dist/cs/pokedex/`) ukazuje, že mezi `bulbasaur.html` a `charmander.html` je **89,0 % slov identických** (517 slov tvořených téměř výhradně popisky tabulek bez jediného odstavce redakčního rozboru pro běžné Pokémony) a u nevydaných Pokémonů (`phione.html` vs. `manaphy.html`, 482 slov) je shoda dokonce **95,2 %**.
   - Podle zásad Google Search Central ([Spam Policies — Scaled content abuse & Thin content](https://support.google.com/webmasters/answer/9044175)) a zásad Google AdSense ([answer/11112688](https://support.google.com/adsense/answer/11112688)) přítomnost 4 096 šablonových stránek proti pouhým 76 URL redakčních průvodců (poměr **54 : 1** v neprospěch redakčního obsahu) okamžitě spouští zamítnutí na úrovni celé domény (*site-level quality classifier*).

2. **Detailní stránky událostí (`/[lang]/events/[slug]`, 200 URL v `sitemap-events.xml`) mají 94,1 % duplicitního textu, špatné `<h1>` a v SSG vyrenderují prázdnou infografiku bez bonusů a spawnů:**
   - Na hlavním dashboardu (`/[lang]` a `/[lang]/events`) nejsou události samostatnými články, ale kalendářovou mřížkou (`TimelineView.tsx`) nebo rozbalovacími akordeony/modály (`EventCard.tsx`), kde kliknutí na kartu volá `e.preventDefault()` (`EventCard.tsx:704, 946`) a u 17 typů událostí (`shouldDisableExternalLinks`, `EventCard.tsx:36-79`) dokonce vůbec negeneruje odkaz `<a href>`.
   - Samostatná URL události (`frontend/src/app/[lang]/events/[slug]/page.tsx`) při SSG buildu volá pouze `/api/events` a `/api/events/${slug}` (`events/[slug]/page.tsx:60-61`), ale **nikoliv** endpoint `/api/events/${slug}/details`, kde v backendu leží nascraperované bonusy, spawny, vejce a výzkum! Hook `useDynamicEventDetails` (`EventCard.tsx:343`) běží až v prohlížeči přes `useEffect`.
   - Důsledek ve statickém HTML (`frontend/dist/cs/events/dynamax-trails-2026.html`): `<EventInfographic>` vyrenderuje **prázdný plakát** (bez bonusů a bez Pokémonů), nad ním je jen krátký box s `<h2>` a syrovým ISO časem (`2026-11-16T10:00:00.000`) a **pod ním řádek `324` (`<App initialLang={validLang} initialEventId={slug} initialEvents={allEvents} />`) vyrenderuje celý hlavní dashboard s nadpisem `<h1>Události</h1>` a všemi 37 ostatními událostmi!**
   - Měření v `frontend/dist/cs/events/`: dvě libovolné stránky událostí (`cresselia-darkrai-in-5-star-raid-battles-november-2026.html` vs. `dynamax-trails-2026.html`, ~1 050 slov) mají **94,1 % identického textu**.

3. **Všech 516 podstránek v `sitemap-raids-rocket.xml` (`/raids/[slug]`, `/rocket/[leader]`, `/rankings/[category]`, `/types/[type]`) trpí antivzorem „Malý `<article>` box nahoře + kompletní výpis celého nástroje dole“ (80–92 % duplicitního HTML):**
   - Každá z těchto 516 URL vykreslí nahoře ~80–150 slov v `<article class="seo-entity-summary card">` s nadpisem `<h2>` a pod něj vloží **celou rodičovskou komponentu** (`<RaidView />` se všemi 28 raid bossy a `<h1>Raid</h1>`, `<RocketGuide />` s `<h1>Rocket</h1>` nebo `<PokemonRankingsView />` se 40 řádky tabulky a `<h1>PvE Žebříčky Pokémonů</h1>`).
   - Měřená míra duplicity slov ve statickém HTML:
     - `/cs/raids/kyurem-counters.html` vs. `/cs/raids/zekrom-counters.html`: **92,1 % identických slov** (navíc `generateStaticParams` v `raids/[slug]/page.tsx:38-41` stále generuje duplicitní soubory pro `${boss}` i `${boss}-counters`, vč. nevydaných `eternatus` a `urshifu`).
     - `/cs/rankings/great-league.html` vs. `/cs/rankings/ultra-league.html`: **86,9 % identických slov**.
     - `/cs/types/fire.html` vs. `/cs/types/water.html`: **80,1 % identických slov** (a téměř 100% překryv s `/rankings/attackers-fire`).
     - `/cs/rocket/giovanni.html` vs. `/cs/rocket/cliff.html`: **77,3 % identických slov** — a navíc na anglické, japonské i ruské verzi (`/en/rocket/giovanni`, `/ja/rocket/giovanni`, `/ru/rocket/giovanni`) se přímo do HTML vypisují **nepřeložené české věty** z `DEFAULT_ROCKET_DATA` (`RocketGuide.tsx:139, 166, 196, 226`, např. *"Shadow Heatran (Fire Spin + Magma Storm) patří mezi nejsilnější ohnivé PvE útočníky v Pokémon GO."*), což Googlebot vyhodnocuje jako rozbitý strojový překlad / nedokončený web (`answer/11112688`).

4. **Skript `frontend/post-build.js` nemaže starý obsah `dist/`, takže na produkci zůstávají stovky mrtvých a prázdných HTML souborů:**
   - `frontend/post-build.js:56-59` volá `copyDirSync(outDir, distDir)` bez předchozího smazání adresáře `dist/`.
   - V `frontend/dist/cs/events/` tak leží **139 HTML souborů** (přičemž v sitemapě je jen 50 aktuálních událostí) a staré soubory v `dist/` (např. `10th-anniversary-celebration.html`, `catch-mastery-september-2026.html`, `gbl-forever-forward_*.html`) obsahují pouze **67 znaků viditelného textu**!
   - Zároveň `frontend/src/app/[lang]/pokemon/[id]/page.tsx:10-21` stále při každém buildu generuje **4 100 prázdných HTML redirect schránek** (`dist/[lang]/pokemon/1..1025.html`).

5. **Chybějící propojovací meta tag AdSense v `layout.tsx` a riziko plošného skriptu:**
   - V `frontend/src/app/layout.tsx:93` je skript `adsbygoogle.js` zcela zakomentován (`{/* Google AdSense script removed/deactivated per monetization strategy */}`) a chybí zde i ověřovací meta značka `<meta name="google-adsense-account" content="ca-pub-8800056915088711">`.
   - Podle oficiální dokumentace Google AdSense ([answer/7584263](https://support.google.com/adsense/answer/7584263), [answer/9261309](https://support.google.com/adsense/answer/9261309)) musí být web při žádosti o kontrolu propojen buď pomocí `<meta name="google-adsense-account" content="ca-pub-8800056915088711">` + `ads.txt`, nebo pomocí skriptu `adsbygoogle.js`. Současně však nesmí běžet automatické reklamy (Auto Ads) na nástrojových stránkách bez redakčního textu (`/filter`, `/settings`, `/friends`, `/download`), jinak dojde k zamítnutí podle [answer/11112688](https://support.google.com/adsense/answer/11112688).

### Rozpad současné sitemapy (`frontend/public/sitemap*.xml` — 4 944 URL)

| Sub-sitemapa | Počet URL (4 jazyky) | Podíl na celém webu | Skutečný obsah vygenerovaného HTML v `dist/` | Hodnocení robotem AdSense |
|---|---:|---:|---|---|
| `sitemap-pokedex.xml` | **4 096 URL** (1 024 × 4) | **82,8 %** | Čistá databázová karta (staty, tabulky útoků, typové násobitele), u 860+ Pokémonů 0 odstavců prózy; **320 URL jsou nevydaní Pokémoni** (`isReleasedInGo: false`). 89–95,2 % duplicitní text. | **KRITICKÉ RIZIKO** (*Scaled Content Abuse / Thin Auto-Generated Database*) |
| `sitemap-raids-rocket.xml` | **516 URL** (129 × 4) | **10,4 %** | Krátký `<article>` box nahoře + kompletní výpis `<RaidView />` (28 bossů), `<RocketGuide />` nebo `<PokemonRankingsView />` dole. 80–92 % duplicitní HTML + české stringy v EN/JA/RU. | **VYSOKÉ RIZIKO** (*Doorway / Replicated Template Clones*) |
| `sitemap-events.xml` | **200 URL** (50 × 4) | **4,0 %** | Krátký `<article>` + prázdná `<EventInfographic>` (chybí SSR fetch `/details`) + celý dashboard `<App />` s 37 cizími událostmi dole. 94,1 % duplicitní HTML. | **VYSOKÉ RIZIKO** (*Duplicate Content / Under-Construction Infographic*) |
| `sitemap-core.xml` | **56 URL** (14 × 4) | **1,1 %** | Hlavní záložky a utility (`/filter`, `/friends`, `/download`, `/settings`, `/privacy`, `/terms`, `/about`). | **STŘEDNÍ RIZIKO** (`/filter`, `/friends`, `/settings`, `/download` jsou čisté nástroje bez článku) |
| `sitemap-guides.xml` | **76 URL** (19 × 4) | **1,5 %** | 19 kvalitních, dlouhých redakčních průvodců (1 000–2 200 slov), avšak zabalených přes `<App initialTab="guides" />`. | **VYSOKÁ HODNOTA** (Jediný pilíř, který plně splňuje AdSense standardy, ale tvoří jen 1,5 % webu!) |

---

## 2. Rozbor primárních zdrojů Google (AdSense, Publisher Policies & Search Central)

Pro návrh neprůstřelné architektury vycházíme přímo z primární dokumentace Google platné v roce 2026:

### 2.1. Google Publisher Policies: Obrazovky bez obsahu a ve výstavbě ([answer/11112688](https://support.google.com/adsense/answer/11112688))
> *"We do not allow Google-served ads on screens: without content or with low value content, that are under construction, that are used for alerts, navigation, or other behavioral purposes."*

- **Dopad na `pogoevents.app`:**
  1. Stránky čistě behaviorální a navigační (`/filter`, `/settings`, `/friends`, `/download`, `/pokemon/[id]` redirecty) nesmí nikdy spouštět skript `adsbygoogle.js` s aktivními Auto Ads a nemají být indexovány jako vstupní obsahové stránky (`/settings`, `/download`).
  2. Výskyt **nepřeložených českých vět uprostřed anglických, japonských a ruských stránek** (`RocketGuide.tsx:139-226`) a **anglických typových slabostí uprostřed českých/japonských/ruských stránek** (`types/[type]/page.tsx:190, 265`, `raids/[slug]/page.tsx:128`) je algoritmem klasifikován jako neúplná lokalizace (*site under construction*).
  3. Komponenta `<EventInfographic>` na `/[lang]/events/[slug]`, která ve statickém HTML obsahuje pouze nadpis a patičku bez jediného bonusu či spawnu, působí pro crawler jako prázdná šablona.

### 2.2. Google Publisher Policies & Search Central: Replikovaný obsah, Thin Content, Scaled Content Abuse a Doorway Pages ([answer/11190248](https://support.google.com/adsense/answer/11190248), [answer/10502938](https://support.google.com/adsense/answer/10502938), [Search Central Spam Policies answer/9044175](https://support.google.com/webmasters/answer/9044175))
- **Scaled Content Abuse (Zneužívání škálovaného obsahu) & Thin Content (`answer/9044175`):**
  - Google výslovně penalizuje generování tisíců stránek ze strukturované databáze (JSON/CSV), kde se mění pouze čísla v tabulkách a jméno entity v předpřipravené větě (*mad-libs templating*), aniž by stránka přinášela unikátní lidský vhled nebo kontextovou syntézu.
  - V našem případě `sitemap-pokedex.xml` vystavuje **4 096 URL**, které tvoří **82,8 % celého indexovaného webu**. Pro ~860 Pokémonů, kteří nejsou v top 150 PvP žebříčku (`rankMatch === null` v `PokedexDetailView.tsx:266`), stránka neobsahuje **ani jednu větu analytické prózy** — pouze tabulku základních statistik (ATK/DEF/STA), tabulku typových odolností a seznam útoků.
- **Doorway Pages (Vstupní stránky vedoucí do stejného cíle, `answer/9044175`):**
  - Google definuje Doorway pages jako *„stránky nebo weby vytvořené za účelem umístění ve vyhledávání pro konkrétní, podobné vyhledávací dotazy, které uživatele vedou na jednu společnou cílovou stránku“*.
  - Přesně takto dnes fungují routy `/[lang]/events/[slug]`, `/[lang]/raids/[slug]`, `/[lang]/rocket/[leader]`, `/[lang]/rankings/[category]` a `/[lang]/types/[type]`: všechny pod malou hlavičkou vykreslí **totožný hlavní dashboard (`<App />`, `<RaidView />`, `<RocketGuide />`, `<PokemonRankingsView />`)**. Pro Googlebota jde o stovky klonů téže stránky s drobnou variací v prvních 100 slovech.

### 2.3. Zásady připravenosti webu na AdSense ([answer/10015918](https://support.google.com/adsense/answer/10015918))
- Google vyžaduje:
  1. **Originální a obohacující textový obsah:** Tabulky, čísla a seznamy Pokémonů samy o sobě nestačí. Každá indexovaná URL musí fungovat jako plnohodnotný, samostatný odborný článek/průvodce (600–1 500 slov unikátního, dobře strukturovaného textu a kontextových dat), který přímo odpovídá na záměr uživatele, aniž by pod sebou duplikoval cizí položky.
  2. **Jasnou informační architekturu a interní prolinkování:** Kliknutí na událost, raid bosse nebo lídra Rakeťáků musí vést na skutečnou samostatnou URL (`<Link href="...">`), nikoliv být zablokováno přes `e.preventDefault()`.

### 2.4. Jak technicky probíhá ověření a kontrola webu v AdSense ([answer/7584263](https://support.google.com/adsense/answer/7584263), [answer/9261309](https://support.google.com/adsense/answer/9261309), [answer/48182](https://support.google.com/adsense/answer/48182), [answer/13554116](https://support.google.com/adsense/answer/13554116))
- **Může AdSense zkontrolovat a schválit web, pokud je `adsbygoogle.js` z `layout.tsx` úplně odstraněn?**
  - Podle [answer/7584263](https://support.google.com/adsense/answer/7584263) (*Connect your site to AdSense*) existují **3 oficiální metody**, jak Google ověří vlastnictví a propojení webu před zahájením kontroly:
    1. **AdSense kód (`adsbygoogle.js`)** v `<head>`, NEBO
    2. **Meta značka AdSense (`<meta name="google-adsense-account" content="ca-pub-8800056915088711">`)** v `<head>`, NEBO
    3. **Soubor `ads.txt`** v kořeni domény (`https://pogoevents.app/ads.txt`).
  - **Pozor na častou past:** V současnosti má `pogoevents.app` pouze `ads.txt` (`frontend/public/ads.txt:1`), ale v `frontend/src/app/layout.tsx:93` **nemá ani `<meta name="google-adsense-account">`, ani `adsbygoogle.js`!** Pokud uživatel v rozhraní AdSense zvolil ověření pomocí kódu v HTML nebo meta tagu, kontrola selže nebo uvízne.
  - Zároveň platí: když je `adsbygoogle.js` vložen na stránku, spouští na ní požadavek na `pagead2.googlesyndication.com`, což přivolá robota `Mediapartners-Google` přesně na ty URL, kde se skript vykonal. Pokud dáte `adsbygoogle.js` globálně do `layout.tsx` a v účtu AdSense máte zapnuté **Auto Ads (Automatické reklamy)**, skript se spustí i na `/settings`, `/filter`, `/friends`, `/download` či `/404`, což způsobí zamítnutí podle [answer/11112688](https://support.google.com/adsense/answer/11112688).
  - **Nejbezpečnější kombinace pro schválení v roce 2026:**
    1. Do globálního `frontend/src/app/layout.tsx` vložit **meta značku** `<meta name="google-adsense-account" content="ca-pub-8800056915088711" />` (ověří celý web bez načítání reklamního JS na prázdných obrazovkách) a zachovat `/ads.txt`.
    2. Samotný skript `adsbygoogle.js` načítat prostřednictvím dedikované komponenty `<AdSenseScript />` **výhradně na obsahově bohatých redakčních stránkách** (`/guides`, `/events/[slug]`, `/raids/[slug]`, `/rocket/[leader]`, hlavní přehled `/`) a v administraci AdSense mít během schvalování **Auto Ads vypnuté** (případně mít v Auto Ads explicitně vyloučené URL `/filter`, `/settings`, `/friends`, `/download`, `/admin`, `/pokedex`, `/pokemon`).
    3. V rozhraní AdSense (*Ochrana soukromí a zprávy -> Evropská nařízení / GDPR*) aktivovat **Google-certified CMP (IAB TCF v2.2)** podle [answer/13554116](https://support.google.com/adsense/answer/13554116), které se automaticky naváže na tag `ca-pub-8800056915088711`.

---

## 3. Hloubkový technický audit současného kódu (`frontend/src` & `frontend/dist`)

Níže je detailní rozbor všech zkoumaných částí aplikace s přesnými odkazy na soubory a čísla řádků.

### 3.1. Architektura událostí (`events/[slug]/page.tsx`, `events/page.tsx`, `EventCard.tsx`, `TimelineView.tsx`, `App.tsx`)

#### A. Proč jsou karty událostí na hlavním dashboardu jen akordeony/modály místo odkazů na bohaté stránky
1. **Výchozí zobrazení na `/` a `/events` je kalendář (`timeline`), nikoliv seznam karet:**
   - V `frontend/src/App.tsx:432` je výchozí stav nastaven následovně:
     ```tsx
     const [viewMode, setViewMode] = useState<'list' | 'timeline'>(() => (initialEventId ? 'list' : 'timeline'));
     ```
   - V režimu `'timeline'` se vykresluje `frontend/src/components/TimelineView.tsx`. Kliknutí na událost v časové ose (`TimelineView.tsx:222`) pouze nastaví lokální React stav `setActiveModalEvent(ev)` (`TimelineView.tsx:44`) a otevře vyskakovací modální okno (`TimelineView.tsx:254-262`), ve kterém se vykreslí `<EventCard isModal={true} />`. Vůbec přitom nedochází k navigaci na samostatnou URL `/[lang]/events/[slug]`.
2. **I v režimu seznamu (`list`) komponenta `EventCard.tsx` blokuje standardní navigaci na stránku události:**
   - V `frontend/src/components/EventCard.tsx:940-952` je nadpis události vyrenderován takto:
     ```tsx
     {shouldDisableExternalLinks(event) ? (
       <span>{event.name}</span>
     ) : (
       <a
         href={`/${lang}/events/${event.eventID}`}
         onClick={(e) => {
           e.preventDefault();
           e.stopPropagation();
           handleCardClick();
         }}
         style={{ color: 'inherit', textDecoration: 'none' }}
       >
         {event.name}
       </a>
     )}
     ```
   - Funkce `shouldDisableExternalLinks(event)` (`EventCard.tsx:36-79`) vrací `true` pro **17 kategorií a klíčových slov** (`raid-hour`, `raid-battles`, `mega-raids`, `pokemon-spotlight-hour`, `max-monday`, `max-battles`, `research-breakthrough`, `go-battle-league`, `go-pass`, `pokestop-showcase` atd.). U těchto událostí v DOMu vůbec neexistuje `<a href>`!
   - U ostatních událostí sice `<a href>` existuje, ale `onClick` okamžitě volá `e.preventDefault()`. Funkce `handleCardClick()` (`EventCard.tsx:700-735`) na širokých obrazovkách (`window.innerWidth >= 900`) pouze otevře modální okno `setIsModalOpen(true)` bez změny URL a na mobilu pouze rozbalí akordeon `onToggleExpand()`.

#### B. Proč `/[lang]/events/[slug]/page.tsx` generuje 94,1 % duplicitního HTML a prázdnou infografiku
Podívejme se na `frontend/src/app/[lang]/events/[slug]/page.tsx`:
1. **Chybějící stažení detailů události (`/api/events/${slug}/details`) během SSG:**
   - Funkce `fetchEventsAndDetail(slug)` (`events/[slug]/page.tsx:58-87`) stahuje pouze `http://localhost:3001/api/events` a `http://localhost:3001/api/events/${slug}`.
   - Základní seznam `/api/events` však obsahuje pouze metadata hlavičky události (`eventID`, `name`, `eventType`, `heading`, `image`, `start`, `end`, `extraData`). Samotné nascraperované detaily z LeekDucku (seznam bonusů `bonuses`, divoké spawny `spawns`, 7km vejce `eggs`, polní výzkum `research` a speciální útoky `moves`) vrací až dedikovaný backendový endpoint **`/api/events/${slug}/details`** (viz `frontend/src/hooks/useDynamicEventDetails.ts:57`).
   - Protože `events/[slug]/page.tsx:189-197` čte pouze `event.bonuses || event.extraData?.bonuses || specialDetails?.bonuses` (kde `frontend/src/data/specialEvents.ts` obsahuje pouze 2 ručně zadané události z června 2026: `pokemon-go-fest-2026-global` a `flying-taxi-2026`), jsou pro téměř všech 50 aktuálních událostí pole `bonuses` i `spawns` během SSG buildu **prázdná (`[]`)**!
2. **Prázdná komponenta `<EventInfographic>` v SSG HTML:**
   - Uvnitř `EventCard.tsx:343` se detaily dotahují až na klientovi přes `useDynamicEventDetails(event.eventID, event.link, Boolean(isExpanded || isModal))`. Během `next build` se `useEffect` nespustí.
   - Ve vygenerovaném HTML souboru (`frontend/dist/cs/events/dynamax-trails-2026.html`) proto `<EventInfographic>` (`EventCard.tsx:786`) obsahuje pouze prázdný rámeček:
     `POKÉMON GO EVENT 16 – 23 lis 2026 Dynamax Trails pogoevents.app Podrobnosti na pogoevents.app` — bez jediného bonusu, spawnu či úkolu.
3. **Vykreslení celého dashboardu `<App />` pod článkem (`events/[slug]/page.tsx:324`):**
   - Na řádku `324` v `events/[slug]/page.tsx` se vykresluje:
     ```tsx
     <App initialLang={validLang} initialEventId={slug} initialEvents={allEvents} />
     ```
   - Komponenta `<App />` vyrenderuje hlavní nadpis `<h1 class="tab-seo-title">Události</h1>` (`App.tsx:1141`), vyhledávací lištu, filtry a **všech 37 ostatních sbalených karet událostí** (`▼`). Samotný název události v horním `<article>` boxu (`events/[slug]/page.tsx:292`) je přitom jen `<h2>` a časy začátku/konce na řádku `299` se vypisují jako neformátované ISO řetězce (`2026-11-16T10:00:00.000`).
   - **Výsledek měření v `frontend/dist/cs/events/`:** Soubory `cresselia-darkrai-in-5-star-raid-battles-november-2026.html` (1 092 slov) a `dynamax-trails-2026.html` (1 051 slov) mají **94,1 % identických slov**.

---

### 3.2. Programatický Pokédex (`sitemap-pokedex.xml`, `pokedex/[slug]/page.tsx`, `PokedexDetailView.tsx`, `pokemon/[id]/page.tsx`)

1. **Rozsah a podíl na webu:**
   - `frontend/src/utils/sitemapGenerator.ts:154-166` generuje `sitemap-pokedex.xml` pro všech **1 024 záznamů** z `frontend/src/data/pokedexCatalog.json` ve 4 jazycích = **4 096 URL** (82,8 % všech URL v sitemapě).
2. **Indexace 320 URL nevydaných Pokémonů (`isReleasedInGo: false`):**
   - V `pokedexCatalog.json` má **80 druhů** příznak `"isReleasedInGo": false` (např. `#489 Phione`, `#490 Manaphy`, `#493 Arceus`, `#494 Victini` varianty, `#719 Diancie` / `#720 Hoopa` / `#721 Volcanion` / Gen 8–9 Pokémoni jako `#810 Grookey` linie, `#906 Sprigatito` linie, `#1007 Koraidon`, `#1008 Miraidon` atd.).
   - V `frontend/src/app/[lang]/pokedex/[slug]/page.tsx:75` je však natvrdo nastaveno:
     ```tsx
     robots: { index: true, follow: true },
     ```
   - A v `sitemapGenerator.ts:160` jsou i nevydaní Pokémoni vloženi do `sitemap-pokedex.xml` s prioritou `0.6`.
3. **Absence unikátního redakčního textu a 89–95,2 % duplicita:**
   - Komponenta `frontend/src/components/PokedexDetailView.tsx` (715 řádků) skládá stránku z následujících sekcí:
     - Základní karta se 3 čísly (`ATK`, `DEF`, `STA`) a `Max CP` na L40/L50 (`PokedexDetailView.tsx:419-468`).
     - Tabulka CP při chytání na L15/L20/L25 (`PokedexDetailView.tsx:471-505`).
     - Tabulka typové efektivity (`1.6x`, `0.625x` atd., `PokedexDetailView.tsx:508-561`).
     - Seznam rychlých a nabíjecích útoků (`PokedexDetailView.tsx:564-631`).
     - Sekce PvP žebříčku a Raid Counterů (`PokedexDetailView.tsx:633-687`) se vykreslí **pouze tehdy, pokud je daný Pokémon nalezen v `rankingsData.ts` (`rankMatch`, řádek 266)** — což platí jen pro ~150 meta Pokémonů!
   - U zbývajících **~870 Pokémonů** (tj. ~3 480 URL) stránka neobsahuje **jedinou větu souvislého textu** — pouze čísla a názvy útoků. U nevydaných Pokémonů (`phione.html` vs. `manaphy.html`) mají útoky pouze placeholder hodnoty `Tackle` a `Struggle` a textová shoda obou stránek činí **95,2 %** (u běžných vydaných Pokémonů jako `bulbasaur.html` vs. `charmander.html` **89,0 %**).
4. **Mrtvé HTML redirect soubory v `/[lang]/pokemon/[id]` (`4 100 souborů`):**
   - `frontend/src/app/[lang]/pokemon/[id]/page.tsx:10-21` stále generuje `1 025 × 4 = 4 100` statických HTML souborů v `dist/[lang]/pokemon/1..1025.html`, které obsahují pouze klientský `window.location.replace` a `<meta http-equiv="refresh">`. Přestože mají `noindex`, zbytečně nafukují artefakt buildu na dvojnásobek.

---

### 3.3. Šablonové klony `/raids/[slug]`, `/rocket/[leader]`, `/rankings/[category]` a `/types/[type]`

Všech **516 URL** v `sitemap-raids-rocket.xml` vykazuje stejnou architektonickou chybu: **stránka detailu nerenderuje detail dané entity, ale vyrenderuje celý přehledový nástroj pod malým úvodním boxem.**

#### A. `/[lang]/raids/[slug]/page.tsx` (92,1 % duplicitní HTML)
- **Řádky `38-41` (`generateStaticParams`):**
  ```tsx
  for (const boss of POPULAR_RAID_BOSSES) {
    params.push({ lang, slug: `${boss}-counters` });
    params.push({ lang, slug: boss });
  }
  ```
  Generuje dvojnásobný počet statických stránek (`kyurem.html` i `kyurem-counters.html` — celkem **170 HTML souborů na jazyk** v `dist/cs/raids/`), přestože kanonická URL v metadatech (řádek `90`) směřuje vždy na `${boss}-counters`.
- **Řádek `21` (`POPULAR_RAID_BOSSES`) a `sitemapConstants.ts:114-115`:** Stále obsahuje nevydané bosse `eternatus` a `urshifu`, kteří v `BOSS_COUNTERS_DB` (`RaidView.tsx`) nemají žádná data counterů (`counters.length === 0`).
- **Řádek `128`:** Slabosti bosse (`weaknesses`) se z `BOSS_COUNTERS_DB` čtou jako anglické řetězce (např. `['Fighting', 'Ground', 'Steel']`) a vypisují se nepřeložené přímo do českého, japonského i ruského textu (`"mezi jeho hlavní slabiny patří Fighting, Ground, Steel"`).
- **Řádek `301`:** Vykresluje `<RaidView lang={lang as Language} initialExpandedBoss={dbKey || bossName} />`. Komponenta `RaidView` (`frontend/src/components/RaidView.tsx:610`) vypíše globální nadpis `<h1 class="tab-seo-title">Raid</h1>` a pod ním vykreslí **všech 28 raid bossů** z `DEFAULT_FALLBACK_BOSS_SPECS` (`RaidView.tsx:140-169`).
- **Řádek `755` v `RaidView.tsx`:** Odkazy na jednotlivé raid bosse uvnitř `RaidView` mají `onClick={(e) => e.preventDefault()}`, takže uživatel ani nemůže standardně přejít na samostatnou stránku bosse!

#### B. `/[lang]/rocket/[leader]/page.tsx` (77,3 % duplicitní HTML + české texty v cizích jazycích)
- **Řádek `276`:** Vykresluje `<RocketGuide lang={lang as Language} initialRocketData={initialRocketData} initialLeader={leaderSlug} />`, což vypíše hlavní nadpis `<h1>Rocket</h1>` (`RocketGuide.tsx:528`) a kompletní rozhraní průvodce.
- **Kritická chyba lokalizace v `frontend/src/components/RocketGuide.tsx:139, 166, 196, 226`:**
  Pole `reason` v `DEFAULT_ROCKET_DATA` je napsáno **výhradně česky**:
  - Řádek `139`: `reason: 'Shadow Heatran (Fire Spin + Magma Storm) patří mezi nejsilnější ohnivé PvE útočníky v Pokémon GO.'`
  - Řádek `166`: `reason: 'Shadow Tyranitar patří mezi elitní temné a kamenné raid útočníky.'`
  - Řádek `196`: `reason: 'Shadow Metagross s Meteor Mash je absolutní špička mezi ocelovými útočníky.'`
  - Řádek `226`: `reason: 'Shadow Salamence je jedním z nejsilnějších dračích raid útočníků ve hře.'`
  Na řádku `645` (`RocketGuide.tsx`) se `{activeSection.chasePokemon.reason}` vypisuje přímo do DOMu bez jakéhokoliv překladu! Ve statickém buildu `frontend/dist/en/rocket/giovanni.html`, `frontend/dist/ja/rocket/giovanni.html` a `frontend/dist/ru/rocket/giovanni.html` tak uprostřed cizojazyčné stránky svítí česká věta.
- **Řádky `536, 545, 559, 569` v `RocketGuide.tsx`:** Všechny přepínače lídrů (`<Link href="/${lang}/rocket/...">`) volají `onClick={(e) => { e.preventDefault(); ... }}`.

#### C. `/[lang]/rankings/[category]/page.tsx` (86,9 % duplicitní HTML) a `/[lang]/types/[type]/page.tsx` (80,1 % duplicitní HTML)
- V `rankings/[category]/page.tsx:371-375` i v `types/[type]/page.tsx:281` se pod krátkým `<article>` boxem vykresluje celá komponenta `<PokemonRankingsView />` (prvních 40 řádků tabulky).
- Navíc všech 18 stránek `/[lang]/types/[type]` (např. `/cs/types/fire`) vyrenderuje `<PokemonRankingsView lang={lang} initialSelectedType="Fire" />`, což je **téměř identická stránka** jako `/cs/rankings/attackers-fire` (`<PokemonRankingsView lang={lang} initialCategory="attackers" initialSelectedType="Fire" />`)!
- V `types/[type]/page.tsx:190` a `265` se navíc pole `chart.weaknesses` (`Fire (1.6x)`) a `chart.resistances` (`Water (0.625x)`) vypisují **anglicky** i na českých, japonských a ruských stránkách.

#### D. `/[lang]/guides/[guideId]/page.tsx` (Zbytečné obalení přes `<App />`)
- V `frontend/src/app/[lang]/guides/[guideId]/page.tsx:198` se místo přímého vykreslení `<GuidesView>` volá `<App initialLang={lang} initialTab="guides" initialArticleSlug={guide.slug} />`, což při každém načtení článku inicializuje veškeré globální hooky a fetch požadavky hlavního event dashboardu (`App.tsx`).

---

### 3.4. Stav AdSense skriptu (`layout.tsx`), `AdContainer.tsx`, `ads.txt`, `/privacy` a CMP (IAB TCF v2.2)

1. **`frontend/public/ads.txt` (řádek 1):**
   ```text
   google.com, pub-8800056915088711, DIRECT, f08c47fec0942fa0
   ```
   Soubor je validní a správně se kopíruje do `dist/ads.txt`.
2. **`frontend/src/data/legalData.ts` (řádky 117–130) a `/[lang]/privacy/page.tsx`:**
   Sekce 4 (`adsense-cookies`) v `/privacy` byla v commitu `1dcc09b` řádně doplněna ve všech 4 jazycích (`cs`, `en`, `ja`, `ru`) a zmiňuje Google AdSense, soubory cookie DART / DoubleClick, odkaz na `https://adssettings.google.com` i správu souhlasu IAB TCF v2.2.
3. **`frontend/src/app/layout.tsx` (řádek 93) a `frontend/src/components/AdContainer.tsx` (řádek 10):**
   - V `layout.tsx:93` je uvedeno pouze `{/* Google AdSense script removed/deactivated per monetization strategy */}` — v `<head>` **chybí jak `<meta name="google-adsense-account" content="ca-pub-8800056915088711">`, tak skript `adsbygoogle.js`**.
   - V `AdContainer.tsx:10` je nastaveno `const ENABLE_ADS = false;`, takže komponenta vrací `null`.
   - **Proč je to problém při kontrole AdSense a jak to správně nastavit:**
     - Aby Google AdSense dokázal při podání žádosti o kontrolu ověřit, že je web propojen s účtem `ca-pub-8800056915088711`, potřebuje v `<head>` najít značku `<meta name="google-adsense-account" content="ca-pub-8800056915088711">` ([answer/9261309](https://support.google.com/adsense/answer/9261309)) a na obsahových stránkách mít přítomný skript `adsbygoogle.js` ([answer/7584263](https://support.google.com/adsense/answer/7584263)).
     - Současně ale `adsbygoogle.js` **nesmí běžet na prázdných či čistě nástrojových obrazovkách** (`/filter`, `/settings`, `/friends`, `/download`, `/404`), aby automatická kontrola nevyhodnotila porušení zásady *Google-served ads on screens without publisher-content* ([answer/11112688](https://support.google.com/adsense/answer/11112688)).

---

## 4. Návrh cílové architektury („Standalone Rich Entity Pages + Interactive Tracker Hub“)

Cílem přestavby je **zachovat 100 % interaktivních funkcí** (kalendář, rozbalovací karty na hlavním dashboardu, vyhledávač v Pokédexu, generátor filtrů, PvP/PvE tabulky, raid a rocket přehledy), ale **každou indexovanou URL v sitemapě proměnit v unikátní, samostatný a hluboce informativní článek s 0% duplicitou hlavního dashboardu**.

### Přehled cílové struktury sitemapy po přestavbě (~480 vysoce hodnotných URL místo 4 944 šablonových klonů)

| Sitemapa / Sekce | Současný stav | Cílový stav po přestavbě | Změna kvality pro AdSense |
|---|---:|---:|---|
| **`sitemap-guides.xml`** (`/[lang]/guides/[slug]`) | 76 URL (1,5 % webu) | **100–120 URL (25–30 % webu)** | Samostatný `<GuidesView>` bez `<App />` wrapperu; 1 200–2 500 slov unikátní redakční analýzy + interaktivní widgety. |
| **`sitemap-events.xml`** (`/[lang]/events/[slug]`) | 200 URL (94,1 % duplicitní `<App />` dump) | **~160–200 URL (35 % webu)** | Dedikovaná komponenta `<EventDetailView />` se serverovým stažením `/api/events/${slug}/details` při SSG: plné bonusy, spawny, vejce, field research, raid bossové, vyfilled `<EventInfographic />`, strategický rozbor a FAQ — **BEZ** vykreslení 37 cizích událostí pod tím! |
| **`sitemap-raids-rocket.xml`** (`/[lang]/raids/[slug]`, `/[lang]/rocket/[leader]`) | 516 URL (80–92 % duplicitní `<RaidView />` / `<PokemonRankingsView />`) | **~140 URL (30 % webu)** | Dedikované komponenty `<RaidBossDetailView />` (jen 1 boss, všechny jeho countery, CP tabulka, solo/duo analýza, copy string) a `<RocketLeaderDetailView />` (jen 1 lídr, 3 fáze týmu, plně lokalizované CS/EN/JA/RU texty) **BEZ** výpisu 27 cizích bossů pod tím! Sloučení duplicitních `/types/[type]` do `/rankings`. |
| **`sitemap-pokedex.xml`** (`/[lang]/pokedex/[slug]`) | 4 096 URL (82,8 % webu, vč. 320 nevydaných) | **Vyřazeno ze sitemapy (`noindex, follow`) NEBO max. ~200 kurátorovaných Meta Pokémonů** | Pokédex zůstává 100% dostupný a proklikatelný pro uživatele v aplikaci, ale 4 096 automatických tabulek již neředí hodnocení domény (*Scaled Content Abuse*). Indexují se pouze hlavní rozcestníky nebo Top 50 meta Pokémonů s 500+ slovy unikátního rozboru. |
| **`sitemap-core.xml`** | 56 URL (vč. `/settings`, `/download`) | **32 URL (8 hlavních obsahových hubů × 4 jazyky)** | Utility stránky (`/settings`, `/download`, `/filter`, `/friends`) mají `noindex, follow` a nenačítají `adsbygoogle.js`. |

---

### 4.1. Přestavba událostí: Samostatná stránka `<EventDetailView />` a propojení z dashboardu

#### Krok 1: Serverové stažení kompletních detailů události v `frontend/src/app/[lang]/events/[slug]/page.tsx`
V `fetchEventsAndDetail(slug)` (`events/[slug]/page.tsx:58-87`) musíme během SSG buildu stahovat nejen `/api/events/${slug}`, ale také **`/api/events/${slug}/details`** (nebo přímo číst nascraperovanou cache z `backend/data/`):
```tsx
const [listRes, detailRes, scrapedDetailsRes] = await Promise.all([
  fetch('http://localhost:3001/api/events'),
  fetch(`http://localhost:3001/api/events/${encodeURIComponent(slug)}`),
  fetch(`http://localhost:3001/api/events/${encodeURIComponent(slug)}/details`),
]);
```
Sloučením dat z `/api/events/${slug}`, `/api/events/${slug}/details` a `SPECIAL_EVENT_DETAILS[slug]` získá serverová komponenta `EventPage` už při statickém buildu (`next build`) kompletní pole:
- `bonuses` (všechny aktivní bonusy události),
- `spawns` (divocí Pokémoni a vzácné spawny vč. shiny příznaků),
- `eggs` (Pokémoni v 2km, 5km, 7km, 10km vejcích),
- `research` (úkoly Field Research a jejich odměny),
- `raids` (Raid bossové během události),
- `moves` (speciální komunitní/eventové útoky).

#### Krok 2: Vytvoření dedikované komponenty `frontend/src/components/EventDetailView.tsx` (nahrazení `<App initialEventId={slug} />`)
Na řádku `324` v `frontend/src/app/[lang]/events/[slug]/page.tsx` **odstraníme `<App initialLang={validLang} initialEventId={slug} initialEvents={allEvents} />`** a nahradíme jej samostatnou komponentou `<EventDetailView />` obalenou v `<AppShell>`:
1. **Unikátní `<h1 class="tab-seo-title">{event.name}</h1>`** s lidsky formátovaným datem a časem podle `lang` (`Intl.DateTimeFormat`, žádné syrové ISO `2026-11-16T10:00:00.000`), odpočtem do začátku/konce a odznakem kategorie.
2. **Plně vykreslená `<EventInfographic>` přímo v SSG HTML:** Protože komponentě předáme `serverDetails` stažené při buildu, infografika bude obsahovat všechny bonusy, spawny a výzkum hned v prvotním HTML souboru pro Googlebota.
3. **Strukturované sémantické sekce (`<section>`) pouze pro tuto událost:**
   - **Přehled a strategický průvodce událostí** (3–4 odstavce redakčního rozboru podle typu akce — jak připravit Mega evoluce, které Pokémony prioritně chytat na XL Candy / PvP / PvE, jak zkombinovat Star Piece / Lucky Egg s bonusy této konkrétní akce).
   - **Aktivní herní bonusy** (karty bonusů s vysvětlením jejich dopadu).
   - **Divoké spawny (Wild Encounters)** s animovanými sprity, shiny indikátorem a proklikem na detail Pokémona.
   - **Raid Bossové a Max Battles během události** s přímými odkazy na `/[lang]/raids/[boss]-counters`.
   - **Polní výzkum (Field Research) a Vejce (Eggs)** v přehledných kartách.
   - **Interaktivní generátor vyhledávacího filtru přímo pro Pokémony této události** (1-click kopírování stringu do schránky pro rychlé promazání batohu během akce).
   - **Často kladené otázky (FAQ)** specifické pro danou událost + navigační lišta *„Další probíhající a nadcházející události“* (3–4 související karty místo výpisu všech 37 událostí).

#### Krok 3: Propojení z hlavního dashboardu (`EventCard.tsx` a `TimelineView.tsx`)
- Na hlavním dashboardu (`/[lang]` a `/[lang]/events`) zůstane zachováno rychlé rozbalení karty i modální náhled v kalendáři (uživatelé nepřijdou o rychlý přehled), ale:
  1. V `EventCard.tsx:940-952` odstraníme blokaci odkazu přes `shouldDisableExternalLinks` pro interní routu `/[lang]/events/${event.eventID}` (ta má blokovat pouze rozbité externí odkazy na `pokemongolive.com`, nikoliv interní detail události!).
  2. Do rozbalené karty i do modálu v `TimelineView.tsx` přidáme výrazné tlačítko `<Link href="/${lang}/events/${event.eventID}" className="event-full-guide-btn">Otevřít kompletní průvodce událostí a infografiku →</Link>`.

---

### 4.2. Přestavba Raid Bossů (`/[lang]/raids/[slug]`) a Rocket Lídrů (`/[lang]/rocket/[leader]`)

#### A. Samostatná komponenta `RaidBossDetailView.tsx` v `frontend/src/app/[lang]/raids/[slug]/page.tsx`
1. **Odstranění duplicitních URL a nevydaných bossů v `generateStaticParams()` (`raids/[slug]/page.tsx:16-43`):**
   - Generovat pouze kanonický tvar `${boss}-counters` (odstranit duplicitní `params.push({ lang, slug: boss })` na řádku `40`, který zdvojoval počet souborů v `dist/`).
   - Vyřadit `eternatus` a `urshifu` z `POPULAR_RAID_BOSSES` (`raids/[slug]/page.tsx:21` a `sitemapConstants.ts:114-115`), případně filtrovat pouze bosse, kteří existují v `BOSS_COUNTERS_DB` a mají `counters.length > 0`.
2. **Lokalizace typů a slabostí (`raids/[slug]/page.tsx:128`):**
   - Přeložit anglické názvy typů v poli `weaknesses` (`Fighting`, `Ground`, `Steel`...) pomocí `translateType(w, lang)` před jejich vložením do věty v CS/JA/RU.
3. **Nahrazení `<RaidView />` (řádek `301`) dedikovaným `<RaidBossDetailView />`:**
   - Stránka `/[lang]/raids/kyurem-counters` již **nebude vykreslovat 27 ostatních bossů**.
   - Místo toho vykreslí:
     - `<h1>{bossDisplay} Raid Counters & 100% IV CP Guide</h1>`,
     - Kompletní kartu statistik bosse (Raid Tier, Boss CP, 100% IV CP L20 / L25 Weather Boost, počasí posilující bosse i počasí posilující vaše countery),
     - Rozdělené sekce: **Top Mega & Primal Counters**, **Top Shadow Counters**, **Top Standard & Budget Counters** (s Fast Move, Charged Move, rel. DPS indexem a vysvětlením, proč daný counter funguje),
     - **Analýzu obtížnosti (Solo / Duo / Trio / Quad)** a doporučenou velikost lobby podle úrovně trenérů (L35 vs. L40 vs. L50 + Party Power),
     - **1-Click Copy Raid Counter Search String** (vyhledávací řetězec do hry přímo pro countery tohoto bosse),
     - V `RaidView.tsx:755` odstranit `onClick={(e) => e.preventDefault()}` na odkazu bosse nebo přidat tlačítko *„Samostatný průvodce bossem →“*.

#### B. Samostatná komponenta `RocketLeaderDetailView.tsx` a oprava lokalizace v `RocketGuide.tsx`
1. **Okamžitá oprava českých textů v `DEFAULT_ROCKET_DATA` (`RocketGuide.tsx:139, 166, 196, 226`):**
   - Změnit `chasePokemon.reason` z jednoho českého stringu na lokalizovaný objekt `Record<Language, string>` (stejně jako v průvodcích) nebo jej překládat přes slovník v `translations.ts`, aby se na `/en/rocket/*`, `/ja/rocket/*` a `/ru/rocket/*` nikdy nevypisovala čeština.
2. **Nahrazení celého `<RocketGuide />` na `/[lang]/rocket/[leader]/page.tsx:276` detailem vybraného lídra:**
   - Vykreslit `<h1>` přímo pro daného lídra (Giovanni / Cliff / Sierra / Arlo / Grunt) s kompletním rozborem všech 3 slotů (Slot 1, Slot 2 – všechny 3 varianty, Slot 3 – všechny 3 varianty), doporučenou trojicí Pokémonů do týmu (Synergy Team Builder), taktikou spalování štítů (*shield baiting* a *stun-lock* prodleva 2,5 s po výměně/nabitém útoku) a CP tabulkou odměnového Shadow Pokémona.
   - V `RocketGuide.tsx:536, 545, 559, 569` odstranit `e.preventDefault()`, aby přepínání mezi Giovannim, Cliffem, Sierrou a Arlem fungovalo jako čistá navigace mezi samostatnými URL.

---

### 4.3. Řešení programatického Pokédexu (`sitemap-pokedex.xml`) a duplicit `/types/[type]` vs. `/rankings/[category]`

1. **Pokédex (`/[lang]/pokedex/[slug]` — 4 096 URL):**
   - **Proč škodí v sitemapě:** 4 096 stránek (82,8 % sitemapy) s 89–95 % shodou textu a nulovou redakční prózou u běžných/nevydaných Pokémonů je hlavním spouštěčem klasifikátoru *Low Value Content / Scaled Content Abuse*.
   - **Řešení bez ztráty funkčnosti pro uživatele:**
     - **Varianta A (Doporučená pro okamžité schválení AdSense):** Vyřadit `sitemap-pokedex.xml` ze `sitemap.xml` (`sitemapGenerator.ts:127`) a v `frontend/src/app/[lang]/pokedex/[slug]/page.tsx:75` nastavit `robots: { index: false, follow: true }` (nebo `index: true` ponechat **pouze** pro vydané Pokémony, kteří mají `rankMatch` v Top 100 PvE/PvP žebříčku **A ZÁROVEŇ** jim vygenerovat bohatý analytický text o 400+ slovech). Pro všechny nevydané Pokémony (`!poke.isReleasedInGo`) musí být bezpodmínečně `robots: { index: false, follow: true }`.
     - Uživatelé na webu nepřijdou o vůbec nic — vyhledávání v Pokédexu (`/pokedex`), prokliky z událostí, raidů i žebříčků budou 100% fungovat, ale Google AdSense přestane hodnotit doménu podle 4 096 prázdných tabulek!
   - **Odstranění 4 100 redirect schránek `/[lang]/pokemon/[id]`:**
     - Místo generování 4 100 statických HTML souborů v `frontend/src/app/[lang]/pokemon/[id]/page.tsx` použít pravidlo přesměrování v `firebase.json` (`rewrites` / `redirects` z `/cs/pokemon/:id` na `/cs/pokedex`) a adresář `frontend/src/app/[lang]/pokemon/` zcela smazat.

2. **Sloučení `/[lang]/types/[type]` a `/[lang]/rankings/[category]`:**
   - V současnosti 18 stránek `/[lang]/types/[type]` a 18 stránek `/[lang]/rankings/attackers-[type]` vykresluje pod úvodním boxem **identickou tabulku `<PokemonRankingsView />`**.
   - **Řešení:**
     - Buď přeměnit `/[lang]/types/[type]` na čistý **Interaktivní typový kalkulátor a matici odolností/slabostí** (s přeloženými názvy typů přes `translateType` místo anglických řetězců na řádcích `190` a `265`, přehledem všech Mega bonusů daného typu, počasí a nejlepších rychlých/nabitých útoků daného typu) **BEZ** vykreslování `<PokemonRankingsView />`,
     - Nebo `/[lang]/types/[type]` nastavit jako `noindex, follow` (s kanonickým odkazem na `/[lang]/rankings/attackers-[type]`) a vyřadit z `sitemap-raids-rocket.xml`.
   - Na stránkách `/[lang]/rankings/[category]` upravit `<PokemonRankingsView />` tak, aby při předání kategorie z URL měl nadpis `<h1>` přímo název dané ligy/kategorie (nikoliv obecné `PvE Žebříčky Pokémonů`) a v `sitemapConstants.ts:18` sjednotit seznam kategorií s `rankings/[category]/page.tsx:18` (`max-battles`).

3. **Přímé vykreslení `<GuidesView />` v `/[lang]/guides/[guideId]/page.tsx`:**
   - V `frontend/src/app/[lang]/guides/[guideId]/page.tsx:198` nahradit `<App initialLang={lang} initialTab="guides" initialArticleSlug={guide.slug} />` přímým vykreslením `<AppShell>` + `<GuidesView lang={lang} initialArticleSlug={guide.slug} />`, aby stránky průvodců měly čistý strom komponent a okamžitou hydrataci bez stahování eventového dashboardu.

---

### 4.4. Čištění `dist/` v `frontend/post-build.js` a správné nasazení AdSense + CMP

#### A. Oprava `frontend/post-build.js` (řádky 56–59)
Před kopírováním `out/` do `dist/` je nutné adresář `dist/` vymazat, aby v něm nezůstávaly staré smazané události (aktuálně 139 souborů v `dist/cs/events/`, z toho desítky 67znakových prázdných souborů) a duplicitní raidy:
```js
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
copyDirSync(outDir, distDir);
```

#### B. Správná konfigurace AdSense ověření, skriptu `adsbygoogle.js` a CMP (IAB TCF v2.2)
1. **Globální ověřovací meta značka v `frontend/src/app/layout.tsx` (`<head>`):**
   Přidat do `<head>` v `layout.tsx` (nebo přes `metadata.other` v Next.js):
   ```tsx
   <meta name="google-adsense-account" content="ca-pub-8800056915088711" />
   ```
   Tato značka oficiálně propojí doménu s AdSense účtem podle [answer/9261309](https://support.google.com/adsense/answer/9261309), aniž by na prázdných stránkách spouštěla reklamní skript.
2. **Selektivní načítání `adsbygoogle.js` (`AdSenseScript.tsx`):**
   Vytvořit lehkou klientskou komponentu `<AdSenseScript />`, která načte `<Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8800056915088711" crossOrigin="anonymous" strategy="afterInteractive" />` **výhradně na stránkách s plnohodnotným redakčním obsahem**:
   - `/[lang]/guides` a `/[lang]/guides/[guideId]`
   - `/[lang]/events/[slug]` (po přestavbě na `<EventDetailView />`)
   - `/[lang]/raids/[slug]` (po přestavbě na `<RaidBossDetailView />`)
   - `/[lang]/rocket/[leader]` (po přestavbě na `<RocketLeaderDetailView />`)
   - Hlavní obsahové přehledy `/[lang]`, `/[lang]/events`, `/[lang]/raids`, `/[lang]/rocket`, `/[lang]/rankings`
   - **NIKDY** nenačítat `adsbygoogle.js` na: `/[lang]/filter`, `/[lang]/settings`, `/[lang]/friends`, `/[lang]/download`, `/[lang]/pokedex/[slug]` (u neindexovaných záznamů), `/admin` a `/404`.
3. **Aktivace Google Funding Choices CMP (IAB TCF v2.2):**
   V konzoli Google AdSense (*Ochrana soukromí a zprávy -> Evropská nařízení (GDPR)*) publikovat certifikovanou zprávu o souhlasu pro doménu `pogoevents.app` ve 3 možnostech (*Souhlasím / Spravovat možnosti / Nesouhlasím*). Zpráva se automaticky zobrazí návštěvníkům z EHP/UK/CH na stránkách se skriptem `adsbygoogle.js` ([answer/13554116](https://support.google.com/adsense/answer/13554116)).

---

## 5. Kontrolní seznam kroků a odhad šance na schválení

| Fáze implementace | Konkrétní technický zásah | Odhadovaná šance na schválení AdSense |
|---|---|---:|
| **Současný stav (`436b64b`)** | 4 944 URL v sitemapě (82,8 % Pokédex vč. 320 nevydaných Pokémonů, 94,1 % duplicitní `/events/[slug]`, 80–92 % duplicitní `/raids/[slug]` a `/rankings/[category]`, české věty v EN/JA/RU `/rocket`, 139 starých HTML souborů v `dist/`, chybějící `<meta name="google-adsense-account">`). | **< 5 % (Jisté zamítnutí za Low Value Content)** |
| **Fáze 1: Indexační hygiena a vyčištění `dist/`** | Vyřazení 4 096 automatických Pokédex karet ze sitemapy (`noindex, follow` pro běžné/nevydané Pokémony), smazání `/pokemon/[id]` redirectů, čištění `dist/` v `post-build.js`, `noindex` na `/settings`, `/download`, `/filter`, `/friends`. | **~45 %** |
| **Fáze 2: Odstranění „Dashboard Dumpu“ a vytvoření samostatných stránek událostí, raidů a lídrů** | `<EventDetailView />` se serverovým stažením `/api/events/${slug}/details` (plná infografika, bonusy, spawny, výzkum v SSG bez 37 cizích karet), `<RaidBossDetailView />` (jen 1 boss bez 27 cizích bossů), `<RocketLeaderDetailView />` + překlad `DEFAULT_ROCKET_DATA` a typů do všech 4 jazyků. | **~85 %** |
| **Fáze 3: AdSense Meta Tag, selektivní `AdSenseScript`, CMP (TCF v2.2) a reindexace v GSC** | Nasazení `<meta name="google-adsense-account" content="ca-pub-8800056915088711">`, `<AdSenseScript />` pouze na redakčních šablonách, zapnutí Google GDPR CMP v AdSense konzoli, odeslání pročištěné `sitemap.xml` (~480 bohatých URL) do Google Search Console a vyčkání 5–7 dní před kliknutím na *„Požádat o kontrolu“*. | **90–95 %** |

---

## 6. Seznam citovaných primárních zdrojů a souborů v repozitáři

### Primární dokumentace Google
1. **Google AdSense Help — Běžné důvody zamítnutí webu a zásady pro obsah:**  
   `https://support.google.com/adsense/answer/10502938`
2. **Google Publisher Policies — Google-served ads on screens without publisher-content / under construction:**  
   `https://support.google.com/adsense/answer/11112688`
3. **Google Publisher Policies — Google-served ads on screens with replicated content:**  
   `https://support.google.com/adsense/answer/11190248`
4. **Google AdSense Help — Ensure your site is ready for AdSense (Unique & valuable content, Navigation):**  
   `https://support.google.com/adsense/answer/10015918`
5. **Google AdSense Help — Connect your site to AdSense (`adsbygoogle.js` snippet, meta tag, `ads.txt`):**  
   `https://support.google.com/adsense/answer/7584263` a `https://support.google.com/adsense/answer/9261309`
6. **Google AdSense Help — Required Privacy Policy disclosures (DART cookie, `adssettings.google.com`):**  
   `https://support.google.com/adsense/answer/48182`
7. **Google AdSense Help — Requirements for Google-certified CMP integrated with IAB TCF v2.2 (EEA/UK/CH):**  
   `https://support.google.com/adsense/answer/13554116`
8. **Google Search Central — Spam Policies for Google Web Search (Thin content, Scaled content abuse, Doorway pages, Scraped content):**  
   `https://support.google.com/webmasters/answer/9044175`

### Analyzované soubory v repozitáři (`C:\PROJEKTY\OSOBNÍ\Pokemon-GO-event-tracker`)
- `frontend/src/app/layout.tsx` (řádky 1–105, zejm. řádek 93)
- `frontend/src/components/AdContainer.tsx` (řádky 1–132, zejm. řádek 10 `ENABLE_ADS = false`)
- `frontend/public/ads.txt` (řádek 1)
- `frontend/src/app/[lang]/privacy/page.tsx` (řádky 1–65) a `frontend/src/data/legalData.ts` (řádky 117–130)
- `frontend/src/app/[lang]/events/page.tsx` (řádky 1–83)
- `frontend/src/app/[lang]/events/[slug]/page.tsx` (řádky 1–327, zejm. řádky 58–87, 189–197, 292, 299, 324)
- `frontend/src/App.tsx` (řádky 432, 1141–1285)
- `frontend/src/components/EventCard.tsx` (řádky 36–79 `shouldDisableExternalLinks`, 343 `useDynamicEventDetails`, 700–735 `handleCardClick`, 786 `EventInfographic`, 940–952)
- `frontend/src/components/TimelineView.tsx` (řádky 44, 222, 254–262)
- `frontend/src/components/EventInfographic.tsx` (řádky 1–300)
- `frontend/src/hooks/useDynamicEventDetails.ts` (řádky 1–86, zejm. řádek 57 `/api/events/${slug}/details`)
- `frontend/src/data/specialEvents.ts` (řádky 1–200)
- `frontend/src/app/[lang]/pokedex/[slug]/page.tsx` (řádky 1–152, zejm. řádek 75 `robots: { index: true, follow: true }`)
- `frontend/src/components/PokedexDetailView.tsx` (řádky 1–715, zejm. řádek 266 `rankMatch`)
- `frontend/src/data/pokedexCatalog.json` (1 024 záznamů: 944 vydaných, 80 nevydaných s `isReleasedInGo: false`)
- `frontend/src/app/[lang]/pokemon/[id]/page.tsx` (řádky 10–21, 4 100 HTML redirectů)
- `frontend/src/app/[lang]/raids/[slug]/page.tsx` (řádky 21, 38–41, 128, 301) a `frontend/src/components/RaidView.tsx` (řádky 140–169, 338, 610, 755)
- `frontend/src/app/[lang]/rocket/[leader]/page.tsx` (řádky 1–279, zejm. řádek 276) a `frontend/src/components/RocketGuide.tsx` (řádky 139, 166, 196, 226, 528, 536–569, 645)
- `frontend/src/app/[lang]/rankings/[category]/page.tsx` (řádky 18, 371–375) a `frontend/src/components/PokemonRankingsView.tsx`
- `frontend/src/app/[lang]/types/[type]/page.tsx` (řádky 190, 265, 281)
- `frontend/src/app/[lang]/guides/[guideId]/page.tsx` (řádek 198)
- `frontend/src/utils/sitemapGenerator.ts` (řádky 122–167), `frontend/src/data/sitemapConstants.ts` (řádky 18, 114–115), `frontend/post-build.js` (řádky 56–59)
