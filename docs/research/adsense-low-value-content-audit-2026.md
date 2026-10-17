# Hloubkový audit Google AdSense (2026): Proč je `pogoevents.app` zamítán za „Obsah nízké hodnoty“ a jaké proveditelné změny vedou ke schválení

**Datum auditu:** 2026-10-17  
**Cílová doména:** `https://pogoevents.app`  
**Důvod zamítnutí v Google AdSense:** *Obsah nízké hodnoty (Low Value Content)* — odkaz v zamítacím e-mailu: [Zásady Google pro majitele obsahu (answer/10502938)](https://support.google.com/adsense/answer/10502938?hl=cs)

---

## 1. Shrnutí (Executive Summary)

Přestože v repozitáři proběhla řada dřívějších SEO a obsahových úprav (doplnění statických právních stránek `/privacy`, `/about`, `/terms`, `/disclaimer`, `/contact`, odstranění `React.lazy` z hlavních veřejných pohledů v `App.tsx`, přidání statických fallback dat pro raidy a Team GO Rocket a vytvoření 17 vícejazyčných průvodců v `guidesData.ts`), **produkční statický build (`frontend/dist/`) a `sitemap.xml` stále vykazují 5 kritických porušení zásad Google AdSense a Publisher Policies**.

Nejzávažnějším zjištěním auditu je, že **85,4 % celé sitemapy (4 100 ze ~4 800 URL)** tvoří programaticky generované stránky `/[lang]/pokemon/1..1025`, z nichž **412 URL v `sitemap.xml` (103 dosud nevydaných Pokémonů × 4 jazyky)** přímo ve vygenerovaném HTML vykresluje prázdný výsledek vyhledávání:
> `<div class="no-rankings-found"><p>Žádní Pokémoni nebyli nalezeni.</p></div>`

 Zároveň všech **72 stránek typů (`/[lang]/types/[type]`)** obsahuje rozbitou šablonu, která přímo do viditelného textu i do `FAQPage` JSON-LD vypisuje:
> `Slabosti (1.6× zranění): [object Object], [object Object], [object Object]`

A přepínač jazyků na těchto 72 stránkách odkazuje na neexistující URL `/cs/types`, `/en/types`, `/ja/types`, `/ru/types` (**HTTP 404**).

### Realistický odhad šance na schválení Google AdSense podle rozsahu úprav

| Scénář / Balíček změn | Náročnost implementace | Odhad šance na schválení AdSense | Hlavní důvod odhadu |
| :--- | :---: | :---: | :--- |
| **0. Současný stav (bez úprav)** | 0 dní | **< 5 %** | Automatický zamítací filtr (`answer/11112688`): 412 prázdných stránek v sitemapě („Žádní Pokémoni nebyli nalezeni“), `[object Object]` na 72 stránkách, 404 odkazy, chybějící zmínka o AdSense v `/privacy`. |
| **Balíček 1: Kritické technické a indexační opravy (Quick Wins)** | **1–2 dny** | **35–45 %** | Odstraní všechny automatické technické blokátory, chyby šablon, 404 odkazy a 4 100 tenkých `/pokemon/[id]` stránek ze sitemapy (`noindex`). Web však může u lidského kontrolora stále působit převážně jako databázový nástroj. |
| **Balíček 2: Oprava SSR obsahu na detailech událostí/raidů + odstranění duplicit** | **2–4 dny** | **60–70 %** | Každá indexovaná URL v `sitemap.xml` bude mít unikátní, na serveru plně vyrenderovaný textový obsah místo sbalených a 90–99 % identických seznamů (`answer/11190248`). |
| **Balíček 3: Redakční transformace (Editorial-First Architecture)** | **1–2 týdny** | **75–85 %** | Přidává viditelnou redakční vrstvu na hlavní stránku a sekce, rozšiřuje hloubkové průvodce na 25–30 článků a propojuje je s kartami událostí a bossů. Zbylých 15–25 % představuje přirozenou přísnost kontrolorů vůči neoficiálním herním trackerům. |

---

## 2. Co přesně znamená „Obsah nízké hodnoty“ podle primárních zdrojů Google

Odkaz `https://support.google.com/adsense/answer/10502938?hl=cs` (*Zásady Google pro majitele obsahu*) je zastřešující rozcestník, pod kterým kontrolní algoritmus AdSense (`Google-Display-Ads-Bot` / `Mediapartners-Google`) a lidští hodnotitelé posuzují 4 konkrétní podzásady:

1. **Reklamy na obrazovkách bez obsahu majitele stránek ([answer/11112688](https://support.google.com/publisherpolicies/answer/11112688?hl=cs))**
   - Výslovně zakazuje zobrazovat reklamy na obrazovkách:
     - *„které jsou ve výstavbě“* nebo obsahují chyby šablon,
     - *„s prázdnými výsledky vyhledávání“*,
     - *„v automaticky generovaném obsahu bez osobní kontroly a výběru“*,
     - *„které se používají výhradně pro upozornění, navigaci nebo jiné chování“*.
2. **Reklamy na obrazovkách s replikovaným obsahem ([answer/11190248](https://support.google.com/publisherpolicies/answer/11190248?hl=cs))**
   - Výslovně zakazuje publikovat obsah převzatý nebo zrcadlený z jiných zdrojů (např. obecné herní parametry, surová data z LeekDuck / PokéMiners / GameMasteru), **pokud k němu nepřidáte podstatnou vlastní přidanou hodnotu, komentář nebo redakční analýzu**.
3. **Obsah Google AdSense a uživatelský dojem ([answer/10015918](https://support.google.com/adsense/answer/10015918?hl=cs))**
   - Vyžaduje originální a jednoznačný obsah a stanoví, že odkazy v navigaci nesmí nikdy:
     - *„vést na neexistující webové stránky“* (404),
     - *„přesměrovávat uživatele na irelevantní nebo zavádějící webové stránky“*.
4. **Jak postupovat, když web nemůže zobrazovat reklamy ([answer/12176698](https://support.google.com/adsense/answer/12176698?hl=cs)) & Požadavky na soukromí ([answer/48182](https://support.google.com/adsense/answer/48182?hl=cs))**
   - Vyžaduje transparentní Zásady ochrany osobních údajů výslovně zmiňující reklamní soubory cookie třetích stran (Google AdSense / DoubleClick) a pro návštěvníky z EHP/UK certifikovanou platformu pro správu souhlasu (Google-certified CMP s IAB TCF v2.2).

---

## 3. Detailní technický důkaz: 5 příčin zamítnutí v současném kódu a buildu (`frontend/dist/`)

### Příčina #1 (KRITICKÁ): 4 100 programatických stránek `/[lang]/pokemon/[id]` tvoří 85 % sitemapy a 412 z nich vykresluje „Žádní Pokémoni nebyli nalezeni.“

- **Kde v kódu:**
  - [`frontend/src/app/sitemap.ts`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts#L173-L182) (`ALL_POKEDEX_IDS = Array.from({ length: 1025 }, (_, i) => i + 1)`)
  - [`frontend/src/app/[lang]/pokemon/[id]/page.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/pokemon/%5Bid%5D/page.tsx#L12-L23)
  - [`frontend/src/utils/pokemonReleaseHelper.ts`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/utils/pokemonReleaseHelper.ts#L4-L100) (`UNRELEASED_POKEDEX_IDS` obsahuje 103 ID, např. `#489` Phione, `#490` Manaphy, `#493` Arceus, `#746` Wishiwashi, `#771` Pyukumuku, `#772` Type: Null, `#773` Silvally, `#774` Minior, `#778` Mimikyu, `#801` Magearna, 29 druhů z Gen 8 a 65 druhů z Gen 9)
  - [`frontend/src/components/PokemonRankingsView.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/components/PokemonRankingsView.tsx#L93) (`useState<boolean>(true)` pro `onlyReleased`) a řádky [`248-250`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/components/PokemonRankingsView.tsx#L248-L250) (`if (onlyReleased && !isPokemonReleased(pokemon.pokedexNumber)) return false;`)
- **Co je ve vygenerovaném HTML (`frontend/dist/cs/pokemon/489.html`):**
  - Stránka `/cs/pokemon/489` (a dalších 411 URL v `sitemap.xml`) předá `initialSearchQuery="#489"` do `<PokemonRankingsView />`. Protože Phione (`#489`) není ve hře vydán a filtr `onlyReleased` je ve výchozím stavu zapnutý, hlavní obsah stránky doslova vypíše:
    ```html
    <div class="no-rankings-found"><p>Žádní Pokémoni nebyli nalezeni.</p></div>
    ```
  - Nad tímto prázdným výsledkem je navíc v `<article class="seo-entity-summary card">` anglicko-český nesmysl vycházející z placeholder dat (`Normal`, `Tackle / Struggle`, `CP 2105`):
    ```html
    <h1>Phione (#489) – Pokémon GO Max CP, Stats & Best Moveset</h1>
    <p>Phione (#489) is a Normal type Pokémon in Pokémon GO with a maximum CP of 2105 (Attack: 162, Defense: 162, Stamina: 190). Best PvE moveset: Tackle + Struggle (9.16 DPS).</p>
    ```
- **Proč to vede k okamžitému zamítnutí:**
  - Podle [answer/11112688](https://support.google.com/publisherpolicies/answer/11112688?hl=cs) jsou **stránky s prázdnými výsledky vyhledávání** a **automaticky generovaný obsah bez osobní kontroly** přímým porušením zásad.
  - I u zbývajících 3 688 vydaných Pokémonů (např. `frontend/dist/cs/pokemon/1.html`) tvoří obsah pouze 3 šablonové věty se základními statistikami a pod nimi celá komponenta `<PokemonRankingsView>` s druhým nadpisem `<h1>PvE Žebříčky Pokémonů</h1>` vyfiltrovaná na 1 řádek. Protože těchto 4 100 URL tvoří **85,4 % celé sitemapy**, hodnotící algoritmus Google zařadí celou doménu `pogoevents.app` do kategorie *Scaled Content Abuse / Thin Auto-Generated Database*.

---

### Příčina #2 (KRITICKÁ): Chyba `[object Object]` na všech 72 stránkách `/[lang]/types/[type]` + 404 odkazy v přepínači jazyků

- **Kde v kódu:**
  - [`frontend/src/app/[lang]/types/[type]/page.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/types/%5Btype%5D/page.tsx#L189):
    ```ts
    const weaknesses = getCounterTypes([capitalizedType]);
    ```
    Funkce `getCounterTypes` v [`frontend/src/utils/pokemonCountersHelper.ts`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/utils/pokemonCountersHelper.ts#L104) vrací pole objektů `CounterTypeInfo[]` (`{ type: string; multiplier: number; label: string }`), nikoliv `string[]`. Na řádcích [`211`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/types/%5Btype%5D/page.tsx#L211) a [`246`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/types/%5Btype%5D/page.tsx#L246) se volá `weaknesses.join(', ')`.
  - [`frontend/src/components/AppShell.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/components/AppShell.tsx#L99):
    ```ts
    case 'types': return `${prefix}/types`;
    ```
- **Co je ve vygenerovaném HTML (`frontend/dist/cs/types/fire.html`):**
  1. Přímo ve viditelném `<article class="seo-entity-summary card">` i ve strukturovaných datech `FAQPage` (`application/ld+json`) se na všech 72 stránkách (18 typů × 4 jazyky) nachází:
     ```html
     <p>... Slabosti (1.6× zranění): [object Object], [object Object], [object Object].</p>
     ```
  2. Všechny odkazy v přepínači jazyků (`<a href="/cs/types">`, `<a href="/en/types">`, `<a href="/ja/types">`, `<a href="/ru/types">`) vedou na **HTTP 404 (Stránka nenalezena)**, protože routa `frontend/src/app/[lang]/types/page.tsx` neexistuje (existuje pouze `/[lang]/types/[type]/page.tsx`).
- **Proč to vede k okamžitému zamítnutí:**
  - Výpis `[object Object]` ve viditelném textu i JSON-LD je pro automatizovaného bota nejpřímějším signálem nezkontrolované, rozbité šablony ([answer/11112688](https://support.google.com/publisherpolicies/answer/11112688?hl=cs)).
  - Odkazy v hlavní navigaci vedoucí na neexistující stránky (404) přímo porušují [answer/10015918](https://support.google.com/adsense/answer/10015918?hl=cs).

---

### Příčina #3 (KRITICKÁ): Duplicitní a sbalený SSR obsah na ~160 stránkách událostí (`/[lang]/events/[slug]`) a 408 stránkách raidů (`/[lang]/raids/[slug]`)

- **Kde v kódu (Události):**
  - [`frontend/src/app/[lang]/events/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/events/%5Bslug%5D/page.tsx#L254-L280) a [`frontend/src/App.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/App.tsx#L394-L420)
- **Co je ve vygenerovaném HTML (`frontend/dist/cs/events/sandile-hatch-day-2026.html`):**
  - V době statického buildu (`getEventsForStaticGeneration()`) mají události z fallback/scraped seznamu často prázdné pole `bonuses: []` a `spawns: []`. Horní `<article class="seo-entity-summary card">` tak obsahuje pouze **jediný řádek metadat**:
    ```html
    <h1>Sandile Hatch Day</h1>
    <p>Začátek: 2026-10-17T11:00:00.000 | Konec: 2026-10-17T17:00:00.000 | Typ: event</p>
    ```
  - Pod ním se vykreslí `<App initialEventId={slug} />`, jenže rozbalení detailu události probíhá až v klientském `useEffect` po hydrataci! Ve statickém HTML jsou proto **všechny karty událostí sbalené (`aria-expanded="false"`)** a zobrazuje se celý obecný seznam všech událostí s druhým nadpisem `<h1>Události</h1>`. Všech ~160 detailních URL událostí v `sitemap.xml` má tak z 99 % identické statické HTML tělo.
- **Kde v kódu (Raidy):**
  - [`frontend/src/app/[lang]/raids/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/raids/%5Bslug%5D/page.tsx#L22) (`POPULAR_RAID_BOSSES` obsahuje 51 bossů včetně 5 dosud nevydaných v Pokémon GO: `calyrex`, `koraidon`, `miraidon`, `terapagos`, `pecharunt`)
  - Řádky [`39-42`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/raids/%5Bslug%5D/page.tsx#L39-L42) generují pro každého bosse **dvě identické URL**: `/raids/${boss}-counters` i `/raids/${boss}` (celkem 408 statických stránek = 204 dvojic 100% duplicitního obsahu).
  - V [`frontend/dist/cs/raids/kyurem-counters.html`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/dist/cs/raids/kyurem-counters.html) se pod krátkou tabulkou 6 counterů vykreslí celá komponenta `<RaidView initialExpandedBoss="kyurem" />` se všemi 28 fallback raid bossy ve sbaleném stavu (`▼`), takže 90 % HTML kódu je opět identických napříč všemi 408 stránkami.

---

### Příčina #4 (VYSOKÁ): Jazykový nesoulad v HTML/JSON-LD a ztráta podstránky v přepínači jazyků

- **Kde v kódu:**
  - [`frontend/src/app/[lang]/pokemon/[id]/page.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/pokemon/%5Bid%5D/page.tsx#L147) a [`198-202`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/pokemon/%5Bid%5D/page.tsx#L198-L202): Na českých (`/cs/`), japonských (`/ja/`) a ruských (`/ru/`) stránkách se do `FAQPage` JSON-LD i do viditelného `<article>` vypisují anglické věty (`"Bulbasaur (#1) is a Grass/Poison type Pokémon in Pokémon GO..."`).
  - [`frontend/src/app/[lang]/raids/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/raids/%5Bslug%5D/page.tsx#L154-L184): Anglické otázky a odpovědi v `FAQPage` JSON-LD na všech jazykových mutacích.
  - [`frontend/src/components/AppShell.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/components/AppShell.tsx#L86-L105) (`getSectionPath`): Přepínač jazyků zahazuje slug podstránky. Například na `/cs/guides/how-to-get-raid-passes` vede přepnutí do angličtiny na `/en/guides` místo `/en/guides/how-to-get-raid-passes`; na `/cs/privacy` vede přepnutí jazyka na hlavní stránku `/en`.

---

### Příčina #5 (VYSOKÁ): Stav AdSense kódu (`ENABLE_ADS = false`), chybějící doložka o Google AdSense v `/privacy` a certifikovaná CMP (IAB TCF v2.2)

- **Kde v kódu:**
  - [`frontend/src/app/layout.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/app/layout.tsx#L75): Skript Google AdSense je zcela odstraněn (`{/* Google AdSense script removed/deactivated per monetization strategy */}`).
  - [`frontend/src/components/AdContainer.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/components/AdContainer.tsx#L10): `const ENABLE_ADS = false;` — komponenta vrací `null`.
  - [`frontend/src/data/legalData.ts`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/data/legalData.ts#L50-L114) (`/privacy`): Text Zásad ochrany osobních údajů zmiňuje pouze technické `localStorage` a Firebase Hosting/Analytics, ale **vůbec nezmiňuje Google AdSense, reklamní soubory cookie DoubleClick/DART ani odkaz na nastavení personalizovaných reklam Google (`adssettings.google.com`)**, což je povinná náležitost dle [Zásad programu AdSense (answer/48182)](https://support.google.com/adsense/answer/48182?hl=cs).
  - **Pozor na umístění skriptu při opětovném zapnutí:** Pokud by se `adsbygoogle.js` vložil plošně do `layout.tsx` (Automatické reklamy), Google AdSense bot jej spustí i na čistě nástrojových stránkách bez redakčního textu (`/settings`, `/download`, `/friends`, `/filter`, `/404`), což okamžitě vyvolá zamítnutí dle [answer/11112688](https://support.google.com/publisherpolicies/answer/11112688?hl=cs) (*„Reklamy na obrazovkách bez obsahu majitele stránek / navigace / upozornění“*).

---

## 4. Proveditelné změny (3-stupňový akční plán) a šance na schválení

Níže jsou navržené změny seřazené do tří logických balíčků podle poměru **pracnost vs. nárůst šance na schválení**. Všechny změny jsou plně kompatibilní se současnou architekturou Next.js 16 (`output: 'export'`) na Firebase Hosting.

---

### Balíček 1: Kritické technické a indexační opravy (1–2 dny práce)
**Odhadovaná šance na schválení po nasazení Balíčku 1: 35–45 %** *(ze současných < 5 %)*

Tento balíček odstraní všechny zjevné chyby šablon, prázdné stránky a signály masově generovaného tenkého obsahu (*Scaled Content Abuse*):

1. **Radikální pročištění `sitemap.ts` a `noindex` pro 4 100 `/pokemon/[id]` stránek:**
   - V [`frontend/src/app/sitemap.ts`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/app/sitemap.ts#L173-L182) **zcela vyřadit generování 4 100 `/pokemon/[id]` URL** (nebo v první fázi zcela vyřadit všech 103 nevydaných Pokémonů a ostatním nastavit `robots: { index: false, follow: true }` v [`frontend/src/app/[lang]/pokemon/[id]/page.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/pokemon/%5Bid%5D/page.tsx)).
   - V [`frontend/src/components/PokemonRankingsView.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/components/PokemonRankingsView.tsx#L93) změnit výchozí stav `onlyReleased` na `false` tehdy, když je zadán `initialSearchQuery` mířící na nevydaného Pokémona, nebo zobrazit plnohodnotnou informační kartu *„Tento Pokémon zatím nebyl v Pokémon GO vydán – podívejte se na očekávané statistiky z hlavní série her“* místo prázdného `Žádní Pokémoni nebyli nalezeni.`.
   - Tímto jediným krokem klesne počet URL v `sitemap.xml` ze ~4 800 na ~500 vysoce koncentrovaných stránek a zmizí všech 412 prázdných stránek.
2. **Oprava chyby `[object Object]` na všech 72 stránkách `/[lang]/types/[type]`:**
   - V [`frontend/src/app/[lang]/types/[type]/page.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/types/%5Btype%5D/page.tsx#L189) upravit:
     ```ts
     const weaknesses = getCounterTypes([capitalizedType]).map(w => `${w.type} (${w.label})`);
     ```
3. **Oprava 404 odkazů v přepínači jazyků (`AppShell.tsx`):**
   - V [`frontend/src/components/AppShell.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/components/AppShell.tsx#L86-L105) nahradit zjednodušenou funkci `getSectionPath(activeTab, targetLang)` u přepínače jazyků přímou transformací aktuální URL (`pathname.replace(/^\/(cs|en|ja|ru)(?=\/|$)/, `/${targetLang}`)`). Tím přestanou odkazy na `/[lang]/types/[type]` vést na neexistující `/[lang]/types` (404) a přepínač jazyků zachová konkrétní podstránku na průvodcích, událostech, raidech i právních stránkách.
4. **Doplnění povinných informací o Google AdSense do `/privacy` (`legalData.ts`) a zapnutí Google CMP:**
   - V [`frontend/src/data/legalData.ts`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/data/legalData.ts#L50-L114) doplnit do sekce `privacy` (ve všech 4 jazycích `cs`, `en`, `ja`, `ru`) odstavec o využívání služby Google AdSense, souborech cookie třetích stran (DoubleClick) a odkazu na `https://adssettings.google.com`.
   - Přímo v administraci Google AdSense (*Soukromí a sdělení -> Obecné nařízení o ochraně osobních údajů / GDPR*) aktivovat bezplatnou certifikovanou lištu souhlasu od Googlu (IAB TCF v2.2).
5. **Bezpečné zapnutí AdSense skriptu pouze na obsahových stránkách:**
   - Místo globálního vložení do `layout.tsx` načítat skript AdSense pouze na stránkách s dostatečným redakčním textem (`/guides`, `/guides/[slug]`, `/events/[slug]`, `/raids`, `/rocket`, `/`, `/rankings`) a **vyloučit** čistě nástrojové a systémové routy (`/settings`, `/download`, `/friends`, `/filter`, `/admin`).

---

### Balíček 2: Oprava SSR obsahu na detailech událostí/raidů a odstranění duplicit (2–4 dny práce)
**Odhadovaná šance na schválení po nasazení Balíčků 1 + 2: 60–70 %**

Tento balíček vyřeší druhý hlavní důvod zamítnutí ([answer/11190248](https://support.google.com/publisherpolicies/answer/11190248?hl=cs) — *Replikovaný a šablonově duplicitní obsah*), kdy desítky podstránek mají ve statickém HTML z 90–99 % identické tělo:

1. **Plné SSR vykreslení detailu události na `/[lang]/events/[slug]`:**
   - V [`frontend/src/app/[lang]/events/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/events/%5Bslug%5D/page.tsx) načítat při statickém buildu kompletní detail události z kešovaných dat (`backend/data/event_details_cache.json` / `translated_events_cache.json`) a na stránce vykreslit **přímo rozbalený detail dané události** (všechny bonusy, spawny, výzkumy, raidy a textový komentář), nikoliv 20 sbalených karet ostatních událostí a druhý nadpis `<h1>Události</h1>`.
   - Události, které v době buildu nemají žádné detaily (prázdné `bonuses` i `spawns`), buď obohatit o kontextový text podle kategorie události (Community Day, Spotlight Hour, Raid Hour, Hatch Day), nebo je dočasně označit `noindex`, dokud scraper nenačte jejich detaily.
2. **Odstranění duplicitních `/raids/[boss]` URL a sbaleného seznamu na `/[lang]/raids/[slug]`:**
   - V [`frontend/src/app/[lang]/raids/[slug]/page.tsx`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/frontend/src/app/%5Blang%5D/raids/%5Bslug%5D/page.tsx#L22-L42):
     - Odstranit 5 nevydaných bossů (`calyrex`, `koraidon`, `miraidon`, `terapagos`, `pecharunt`) z `POPULAR_RAID_BOSSES`.
     - V `generateStaticParams()` generovat pouze kanonický tvar `/raids/${boss}-counters` (odstraní 204 ze 408 duplicitních HTML souborů).
     - Na stránce konkrétního raid bosse nevykreslovat pod tabulkou celý sbalený grid všech 28 fallback bossů (`<RaidView />`), ale pouze kartu daného bosse + víceodstavcový lokalizovaný strategický rozbor (doporučený počet hráčů pro Solo/Duo/Trio, vliv počasí, doporučené Mega evoluce a porovnání Shadow vs. běžných counterů).
3. **Plná lokalizace šablon a JSON-LD (`cs`, `en`, `ja`, `ru`):**
   - Přeložit zbývající anglické věty v `FAQPage` JSON-LD a `<article class="seo-entity-summary">` v `raids/[slug]/page.tsx` a `types/[type]/page.tsx`, aby české, japonské a ruské stránky neobsahovaly smíšený česko-anglický text ([answer/9727](https://support.google.com/adsense/answer/9727?hl=cs)).

---

### Balíček 3: Redakční transformace — Editorial-First Architecture (1–2 týdny práce)
**Odhadovaná šance na schválení po nasazení Balíčků 1 + 2 + 3: 75–85 %**

U herních trackerů a databázových webů přistupují lidští kontroloři Google AdSense při opakovaném posouzení velmi přísně a hledají odpověď na otázku: *„Je tento web originálním redakčním magazínem s nástroji, nebo jen automatizovanou tabulkou dat převzatých ze hry?“* Balíček 3 mění první dojem z webu na první variantu:

1. **Redakční sekce na hlavní stránce (`/[lang]`) a sekčních stránkách (`/raids`, `/rocket`, `/rankings`):**
   - Na hlavní stránku (`/[lang]`) přidat výrazný redakční blok **„Týdenní strategický přehled a nejnovější průvodci“** (3–4 nejnovější články z `guidesData.ts` s náhledem, perexem, datem aktualizace a jménem autora/redakce s odkazem na `/about`) a pod kalendář událostí přidat redakční shrnutí aktuální sezóny v Pokémon GO (400–600 slov).
2. **Propojení průvodců (`guidesData.ts`) s kartami událostí, raidů a Rocket lídrů:**
   - Rozšířit `frontend/src/data/guidesData.ts` ze současných 17 na **25–30 autorských průvodců** (např. samostatné hloubkové průvodce pro poražení Giovanniho, Arla, Cliffa a Sierry v aktuální sezóně, průvodce Mega evolucemi, průvodce přípravou na GO Fest / Community Day, průvodce pro začínající a vracející se hráče).
   - Přímo do karet v `RaidView.tsx`, `RocketGuide.tsx` a `EggView.tsx` přidat kontextové odkazy na tyto průvodce (např. *„Přečtěte si našeho podrobného průvodce: Jak efektivně získávat Raid Passy a stavět raid týmy →“*).
3. **Správné načasování žádosti o novou kontrolu v AdSense (Indexační prodleva):**
   - **Kritické pravidlo:** Po nasazení úprav (`npm.cmd run build:deploy`) **neklikat na „Požádat o kontrolu“ v AdSense okamžitě ten samý den**.
   - Nejprve v **Google Search Console** odeslat novou, pročištěnou `sitemap.xml`, zkontrolovat přes *Kontrola URL (URL Inspection)*, že Googlebot vidí nový statický HTML kód, a **počkat 7 až 14 dní**, než Google přeindexuje hlavní stránky a zahodí staré tenké `/pokemon/[id]` URL. Teprve poté odeslat žádost o kontrolu v Google AdSense.

---

## 5. Kontrolní seznam před odesláním webu ke kontrole v Google AdSense

- [ ] V `sitemap.xml` není žádná z 412 URL nevydaných Pokémonů, které vykreslují `Žádní Pokémoni nebyli nalezeni.` (`frontend/src/app/sitemap.ts`).
- [ ] Programatické stránky `/[lang]/pokemon/[id]` mají nastaveno `noindex` (nebo jsou ze sitemapy vyřazeny), takže netvoří 85 % indexovaných stránek webu.
- [ ] Na žádné ze 72 stránek `/[lang]/types/[type]` se ve viditelném HTML ani v JSON-LD nevyskytuje řetězec `[object Object]`.
- [ ] Přepínač jazyků v `AppShell.tsx` nikde negeneruje odkaz na `/cs/types`, `/en/types`, `/ja/types`, `/ru/types` (HTTP 404) a zachovává aktuální podstránku.
- [ ] Detailní stránky `/[lang]/events/[slug]` a `/[lang]/raids/[slug]` vykreslují v SSR unikátní rozbalený obsah dané entity, nikoliv sbalený seznam všech událostí/bossů.
- [ ] Stránka `/[lang]/privacy` výslovně zmiňuje Google AdSense, reklamní soubory cookie (DoubleClick) a odkaz na nastavení reklam Google.
- [ ] V administraci AdSense je zapnutá certifikovaná CMP lišta pro GDPR (IAB TCF v2.2) a skript `adsbygoogle.js` není vložen na nástrojových stránkách bez textu (`/settings`, `/download`, `/friends`, `/filter`).
- [ ] Nová `sitemap.xml` byla odeslána do Google Search Console alespoň 7 dní před kliknutím na „Požádat o kontrolu“ v Google AdSense.
