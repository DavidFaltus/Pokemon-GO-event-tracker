# Pravidla a technická dokumentace pro projekt Pokémon GO Event Tracker

Tento soubor obsahuje specifická pravidla, architektonický přehled a technické instrukce pro vývojové agenty pracující na tomto repozitáři.

---

## 1. Funkční a designová omezení (Zákaznická pravidla)

*   **ŽÁDNÝ Plánovač, Poznámky a Checklisty u karet eventů:** Do detailů karet událostí (`EventCard.tsx`) nikdy neimplementujte ani nepřidávejte žádné textové poznámky, uživatelské úkoly (tasks), checklisty ani plánovače. Uživatel tyto funkce v kartách eventů výslovně nechce.
*   **Prémiový vzhled a čistý design:** Aplikace využívá tmavý režim (glassmorphic a HSL barevná schémata). Nepoužívejte čisté, křiklavé barvy (např. základní červená/zelená/modrá). Využívejte barevné přechody (gradients), mikroanimace a citlivě zvolené barvy pro typy Pokémonů a vzácnost.

---

## 2. Autorská práva a nakládání s grafickými prvky (Copyright & Bandwidth Policy)

Vzhledem k licenčním podmínkám zdrojových webů (zejména Leek Duck) a ochraně autorských práv je **přísně zakázáno stahovat grafické prvky přímo z cizích CDN serverů (hotlinking)**. Veškerá grafika a ikony musí procházet přes resolver a využívat volně šiřitelné alternativy:

1.  **Resolver obrázků (`resolveImage`):** Každý odkaz na obrázek na frontendu (bannery eventů, spawny, líhnutí, bossové) must be obalen voláním funkce `resolveImage(url, eventType, pokemonName)`.
2.  **Bannery a eventové obrázky:** Jakékoli cesty k cizím CDN bannerům (např. `cdn.leekduck.com/assets/img/events/...`) jsou automaticky přesměrovány na vysoce kvalitní, tématické a licenčně bezpečné obrázky ze služby **Unsplash** (definováno v `imageResolver.ts`).
3.  **Pokémon ikony (Gen 1 až 5):** Tyto ikony se automaticky přepisují z cizího CDN na komunitní CDN repozitáře **ZeChrales PogoAssets** (`https://raw.githubusercontent.com/ZeChrales/PogoAssets/master/pokemon_icons/`).
4.  **Pokémon ikony (Gen 6 až 9 - Pokedex ID >= 650):** Jelikož repozitář ZeChrales neobsahuje novější Pokémony (např. Necrozma, Frigibax atd.), resolver u těchto Pokémonů přímo vrací adresu z **PokemonDB** (`https://img.pokemondb.net/sprites/home/normal/...`) pomocí funkce `getPokemonIconUrl(name)`, aby se zamezilo 404 chybám a problikávání (flashingu) obrázků při načítání.
5.  **Chybové stavy a záložní Poké Ball:** V případě selhání načtení jakéhokoliv Pokémon sprite musí `onError` handler nastavit záložní obrázek na oficiální Poké Ball z **PokeAPI** (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png`) a vynulovat `onerror`, aby se zabránilo zacyklení.

---

## 3. Responzivní design a optimalizace pro zařízení

Aplikace musí bezchybně fungovat a skvěle vypadat na třech hlavních typech zařízení:
*   **Mobilní telefony:** Jednosloupcový layout, spodní navigační panel (Bottom Navigation Bar), optimalizované dotykové plochy a zohlednění výřezů (Safe Areas) pro stavové lišty Androidu/iOS.
*   **Tablety:** Flexibilní mřížky (Grids), které automaticky přizpůsobují počet sloupců (zpravidla 2 až 3 sloupce pro karty eventů a detailní přehledy).
*   **Počítače a velké monitory:** Vícesloupcový layout s levým postranním panelem (Desktop Sidebar) a pravým panelem pro reklamy a doplňkový obsah.

---

## 4. Vývoj webové a mobilní (Android/Capacitor) verze

Projekt je rozdělen do dvou hlavních složek frontendu:
1.  **Nový vývoj / Android aplikace (`pogo-tracker-new`):** Tato složka obsahuje integraci s frameworkem **Capacitor** pro sestavení nativní Android aplikace.
2.  **Webová verze (`pogo-tracker-web`):** Samostatná verze optimalizovaná pro nasazení na webové servery / Firebase Hosting.

### Pravidla synchronizace změn:
*   **VŽDY propisujte změny do obou složek:** Jakákoli úprava komponenty, databáze nebo stylu provedená v `pogo-tracker-new/frontend/src/` must be identicky zanesena také do `pogo-tracker-web/frontend/src/`.
*   **Mobilní kompatibilita:** Při úpravách CSS/JS dbejte na to, aby kód fungoval v mobilním WebView (např. nepoužívejte nestandardní API prohlížeče bez fallbacku, dbejte na hardwarovou akceleraci animací a vyhněte se zbytečným re-renderům).

---

## 5. Důsledná lokalizace obsahu (Localization Policy)

*   **Zákaz tvrdého kódování jednoho jazyka:** Pro veškeré popisné texty v databázích (např. bonusy, debuty, úkoly, popisy) používejte datový typ `LocalizedString` (objekt `{ cs: string, en: string }`). Nikdy nepište natvrdo české řetězce (např. "Speciální kostýmový Pikachu") do polí, která se zobrazují uživatelům v anglické verzi.
*   **Vykreslování na frontendu:** Při zobrazení lokalizovaných polí na frontendu vždy použijte aktuální jazyk aplikace, např. `{lang === 'cs' ? item.name.cs : item.name.en}`.
*   **Resolver a fallbacky:** Do resolverů obrázků a chybových handlerů (např. `resolveImage`, `handlePokemonImageError`) předávejte jako název Pokémona vždy anglickou verzi (`item.name.en`), aby se předešlo 404 chybám při načítání obrázků.
