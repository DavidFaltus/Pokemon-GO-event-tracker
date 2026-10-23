# Technický výzkum & Architektonický blueprint: Mobilní widgety a pokročilý napovídač raid týmů (Floating Overlay HUD) pro Pokémon GO Event Tracker

**Autor:** Antigravity Engineering & Architecture Team  
**Datum:** Říjen 2026  
**Dokument:** Technický výzkum a specifikace implementace  
**Cílový repozitář:** `DavidFaltus/Pokemon-GO-event-tracker`  
**Cílové soubory v projektu:**  
- `frontend/capacitor.config.ts`  
- `frontend/android/app/src/main/AndroidManifest.xml`  
- `frontend/android/app/src/main/java/com/pokego/eventtracker/` (`OverlayPlugin.java`, `OverlayService.java`, `EventWidgetProvider.java`)  
- `frontend/src/utils/pokemonCountersHelper.ts`, `frontend/src/utils/megaFilterHelper.ts`  
- `docs/research/mobile-widgets-and-raid-overlay-architecture.md`  

---

## Obsah

1. [Executive Summary & Architektonický cíl](#1-executive-summary--architektonický-cíl)
2. [Audit současné architektury v repozitáři](#2-audit-současné-architektury-v-repozitáři)
   - 2.1. Capacitor 8 & Android projektová konfigurace
   - 2.2. Algoritmické jádro generátoru filtrů a raid counterů
   - 2.3. Datový pipeline raidů a událostí (ScrapedDuck CDN -> Ingest -> Disk Cache -> API)
   - 2.4. Zjištěné slabiny a úzká hrdla existujícího prototypu
3. [Android Floating Overlay & HUD: Hloubková specifikace](#3-android-floating-overlay--hud-hloubková-specifikace)
   - 3.1. Právní rámec, oprávnění a Android Sandbox (`SYSTEM_ALERT_WINDOW`)
   - 3.2. WindowManager architektura a parametry layoutu (`TYPE_APPLICATION_OVERLAY`)
   - 3.3. Životní cyklus a striktní pravidla Android 14+ (API 34/35) pro Foreground Service
   - 3.4. Dotyková gestika a fyzika (Drag, Magnetic Snap-to-Edge, Drag-to-Dismiss)
   - 3.5. Integrace schránky (`ClipboardManager`) a haptická odezva
   - 3.6. Komparativní analýza: PoGo Events HUD vs Calcy IV vs Poke Genie
4. [iOS omezení, systémový sandboxing a nativní alternativy](#4-ios-omezení-systémový-sandboxing-a-nativní-alternativy)
   - 4.1. Proč Apple zakazuje `SYSTEM_ALERT_WINDOW` a zákaz zneužití PiP
   - 4.2. Alternativa A: Live Activities & Dynamic Island (`ActivityKit` + `WidgetKit`)
   - 4.3. Alternativa B: iOS Action Button & App Intents (`AppIntent`) pro 1-tap filtr
   - 4.4. Alternativa C: Zamykací a domovská obrazovka (Lock Screen Widgets)
   - 4.5. Alternativa D: Custom Keyboard Extension
5. [Katalog a specifikace 5 mobilních widgetů](#5-katalog-a-specifikace-5-mobilních-widgetů)
   - 5.1. Widget 1: Aktivní Raid Bossové & Rychlý Counter Filtr
   - 5.2. Widget 2: Nadcházející Eventy & Živé Odpočty
   - 5.3. Widget 3: Team GO Rocket Průvodce
   - 5.4. Widget 4: Denní Herní Checklist & Resety
   - 5.5. Widget 5: Hundo / IV Fast-Filter Widget
   - 5.6. Moderní technologický stack: Jetpack Glance 1.1+ vs iOS WidgetKit (SwiftUI)
6. [Technická integrace s Capacitor 8 & Offline Data Engine](#6-technická-integrace-s-capacitor-8--offline-data-engine)
   - 6.1. Most mezi webovou aplikací a nativní vrstvou (`RaidOverlayPlugin`)
   - 6.2. Eliminace spouštění WebView pro widgety a overlay (Zero-WebView HUD)
   - 6.3. Datová vrstva pro Android (`SharedPreferences` / Room SQLite / JSON)
   - 6.4. Datová vrstva pro iOS (`App Groups`, `UserDefaults`)
   - 6.5. Autonomní synchronizace na pozadí (`WorkManager` a `BGAppRefreshTask`)
7. [Bezpečnost, Google Play, Apple App Store & Niantic ToS Compliance](#7-bezpečnost-google-play-apple-app-store--niantic-tos-compliance)
   - 7.1. Schvalovací proces na Google Play (Justifikace `specialUse`)
   - 7.2. Ochrana před detekcí a banem ze strany Nianticu
   - 7.3. Optimalizace spotřeby baterie, paměti RAM a procesoru
8. [Doporučená roadmapa implementace](#8-doporučená-roadmapa-implementace)
9. [Primární zdroje, specifikace a bibliografie](#9-primární-zdroje-specifikace-a-bibliografie)

---

## 1. Executive Summary & Architektonický cíl

Aplikace **Pokémon GO Event Tracker** ([pogoevents.app](https://pogoevents.app)) disponuje jedním z nejpropracovanějších matematických modelů pro generování vyhledávacích řetězců (search filters) do hry Pokémon GO. Tyto řetězce kombinují slabosti raid bose, účinné rychlé a nabíjecí útoky (`@1type`, `@2type`), Pokédex ID nejlepších counterů z metagame žebříčků, filtrování podle IV (`3*,4*`) a vyloučení stínových pokémonů bez odnaučeného útoku Frustration (`!@frustration`).

Při hraní Pokémon GO však hráči čelí kritickému omezení: **ve 120sekundové raidové lobby není čas přepínat se mezi hrou a webovým prohlížečem**. Hra na mnoha zařízeních s nedostatkem paměti RAM při přepnutí na prohlížeč padá nebo se restartuje, což vede ke ztrátě raid passu a odpojení od týmu.

### Hlavní cíle výzkumu:
1. **Plovoucí HUD / Overlay Bublina (Android)**: Realizovat miniaturní, nenáročnou plovoucí bublinu, která visí nad spuštěnou hrou Pokémon GO. Jedním klepnutím zobrazí aktuální 5★ a Mega bossy, doporučené Mega evoluce pro bonus candy a na 1 tap zkopíruje precizní vyhledávací kód do schránky.
2. **Nativní widgety (Android & iOS)**: Sada 5 specializovaných widgetů na domovskou a zamykací obrazovku, které nabízejí okamžitý přehled bez nutnosti otevírat aplikaci.
3. **Plnohodnotná alternativa pro iOS**: Respektovat sandboxing App Store a poskytnout špičkový zážitek na iPhonech pomocí **Live Activities / Dynamic Island (`ActivityKit`)** a hardwarového **Action Buttonu (`AppIntent`)**.
4. **Offline Zero-WebView Architektura**: Widgety ani plovoucí bublina nesmí spouštět plnou instanci Chromium WebView. Veškerá data o raidech a vygenerované filtry musí být uloženy v nativním binárním úložišti (`SharedPreferences` / `App Group UserDefaults`), což zajistí start do 10 ms a nulové riziko pádu z důvodu paměti RAM.

---

## 2. Audit současné architektury v repozitáři

### 2.1. Capacitor 8 & Android projektová konfigurace
Projekt využívá **Next.js 16 (App Router + Turbopack)** v kombinaci s **Capacitor 8.4.0** (`@capacitor/core`, `@capacitor/android`, `@capacitor/cli`).

- **Konfigurace Capacitoru (`frontend/capacitor.config.ts`)**:
  ```typescript
  const config: CapacitorConfig = {
    appId: 'com.pokego.eventtracker',
    appName: 'PokeGO Event Tracker',
    webDir: 'dist'
  };
  ```
- **Android Manifest (`frontend/android/app/src/main/AndroidManifest.xml`)**:
  V manifestu již existují počáteční deklarace pro overlay a widgety:
  - Oprávnění: `SYSTEM_ALERT_WINDOW`, `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_SPECIAL_USE`, `POST_NOTIFICATIONS`, `SCHEDULE_EXACT_ALARM`, `RECEIVE_BOOT_COMPLETED`, `VIBRATE`, `WAKE_LOCK`.
  - Komponenty: `OverlayService` (typ `specialUse`), `EventWidgetProvider`, `MainActivity` s registrací `OverlayPlugin.class`.
- **Stávající zdrojové soubory v `frontend/android/app/src/main/java/com/pokego/eventtracker/`**:
  - `MainActivity.java`: Standardní `BridgeActivity`, registruje `OverlayPlugin.class`.
  - `OverlayPlugin.java`: Obsahuje metody `isPermissionGranted`, `requestPermission`, `startOverlay`, `updateLanguage`, `stopOverlay`.
  - `OverlayService.java`: Rozsáhlý prototyp (640 řádků), který kreslí bublinu přes `WindowManager`, má jednoduchý drag-and-drop, expandovatelné okno s texty a čipy raid bossů, HTTP stahování dat přes `HttpURLConnection` a experimentální OCR skenování přes ML Kit Latin.
  - `EventWidgetProvider.java`: Implementace `AppWidgetProvider` se starým XML layoutem (`RemoteViews`), která stahuje JSON z `https://pogoevents.app/api/events`.

### 2.2. Algoritmické jádro generátoru filtrů a raid counterů
Frontend disponuje pokročilou matematickou knihovnou v TypeScriptu:
- **`frontend/src/utils/pokemonCountersHelper.ts`**:
  - `TYPE_CHART` & `TYPE_WEAKNESSES`: Kompletní matice účinnosti (1.6× super effective, 0.625× NVE, 0.39× immunity).
  - `calculateDefensiveMatchup()`: Zohledňuje defenzivní matchup útočníka proti útokům bose (odolné tanky dostávají 35% bonus ke skóre, glass cannons 60% penalizaci).
  - `generateRaidSearchString()` a `getTopCountersFilterString()`: Generuje řetězec:
    ```
    3*,4*&448,639,376,384,643&@1fighting,@1rock,@1steel,@1dragon,@1fairy&@2fighting,@3fighting,@2rock,@3rock...&!@frustration
    ```
- **`frontend/src/utils/megaFilterHelper.ts`**:
  - `getRecommendedMegaForEvents()`: Vybírá nejlepší Mega evoluci na základě aktivních bossů a eventů pro maximalizaci +1 Candy a +1 Candy XL (např. `megaevolve&dragon,ice` pro Kyurem / Palkia raidy).
- **`frontend/src/data/pokemonRankings.ts` & `raidCounters.ts`**:
  - Databáze PvE statistik, DPS, fast/charged útoků a ověřených optimálních counterů.

### 2.3. Datový pipeline raidů a událostí
- **Ingest**: Backend stahuje data ze ScrapedDuck multi-CDN feedů (`fetchScrapedDuckRaids()`).
- **Resilientní Fallback**: Pokud ScrapedDuck selže, backend automaticky přepíná na scraping stránek LeekDuck a Pokémon GO Hub (`scrapeRaidBosses()`).
- **Lokální disková cache**: Uloženo v `backend/.cache/raid_bosses.json` (TTL 1 hodina) a `backend/.cache/events_list_cache.json`.
- **Administrátorské overridy**: `backend/custom_raids.json` umožňuje okamžité manuální úpravy a vyřazení neplatných bossů (blacklist).
- **API**: Endpoints `/api/raids`, `/api/events`, a tokenově efektivní Markdown pro AI agenty `/api/agent/raids.md`.

### 2.4. Zjištěné slabiny a úzká hrdla existujícího prototypu
1. **Síťová závislost v nativním vlákně**: `OverlayService` a `EventWidgetProvider` provádějí samostatné HTTP volání přes `HttpURLConnection` v `Executors.newSingleThreadExecutor()`. Pokud je hráč v metru nebo na mobilních datech s vysokým pingem, bublina se zasekne nebo zobrazí prázdná data.
2. **Duplikace logiky filtrů**: V `OverlayService.java` je logika generování filtrů natvrdo nakódována v Javě (`if (lower.contains("kyurem")) ...`), zatímco v TypeScriptu (`pokemonCountersHelper.ts`) je k dispozici plnohodnotný generátor zohledňující stovky pokémonů, legacy útoky a defenzivní tanking. **Java kód v prototypu zaostává za možnostmi webu.**
3. **Chybějící fyzika a magnetic snapping**: Přetahování bubliny v `OverlayService.java` je čisté přepočítávání souřadnic bez animace dojezdu k okraji obrazovky (snap-to-edge), bez fling gest a bez možnosti zahodit bublinu do koše (drag-to-dismiss).
4. **Android 14+ FGS Crash Risk**: V kódu je voláno `startForeground(NOTIFICATION_ID, notification)` bez předání parametru `ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE`, což na Androidu 14 a 15 při target SDK 34+ vyvolává výjimku `MissingForegroundServiceTypeException`.
5. **Zastaralé `RemoteViews` ve widgetu**: `EventWidgetProvider` používá manuální RemoteViews v XML bez podpory Material You dynamických barev a bez plynulých přechodů.

---

## 3. Android Floating Overlay & HUD: Hloubková specifikace

### 3.1. Právní rámec, oprávnění a Android Sandbox (`SYSTEM_ALERT_WINDOW`)
Na platformě Android je překreslování ostatních aplikací řízeno speciálním oprávněním:
- **Deklarace v manifestu**:
  ```xml
  <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
  ```
- **Kontrola oprávnění za běhu**:
  Na rozdíl od standardních runtime oprávnění (`checkSelfPermission`) se `SYSTEM_ALERT_WINDOW` kontroluje přes:
  ```java
  Settings.canDrawOverlays(context);
  ```
- **Vyžádání oprávnění**:
  Aplikace nemůže zobrazit standardní systémový dialog, ale musí uživatele přesměrovat do speciální sekce systémového nastavení:
  ```java
  Intent intent = new Intent(
      Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
      Uri.parse("package:" + context.getPackageName())
  );
  intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
  context.startActivity(intent);
  ```

### 3.2. WindowManager architektura a parametry layoutu (`TYPE_APPLICATION_OVERLAY`)
Od Androidu 8.0 (API 26) jsou starší typy oken (`TYPE_PHONE`, `TYPE_SYSTEM_ALERT`, `TYPE_SYSTEM_OVERLAY`) zastaralé a blokované. Jediným povoleným typem pro ne-systémové aplikace je:
```java
WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
```

#### Kritické flagy pro herní HUD:
```java
int flags = WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE
          | WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL
          | WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS
          | WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED;
```
1. **`FLAG_NOT_FOCUSABLE`**: Zajišťuje, že overlay nepřebírá softwarovou klávesnici ani systémové klávesy zpět (Back). Hráč může psát v Pokémon GO, aniž by overlay kradl fokus.
2. **`FLAG_NOT_TOUCH_MODAL`**: Dotyky mimo plochu plovoucí bubliny jsou okamžitě propouštěny do Pokémon GO pod ní. Když je bublina sbalená (56×56 dp), celá zbývající plocha obrazovky patří hře.
3. **`FLAG_LAYOUT_NO_LIMITS`**: Umožňuje bublině plynulý pohyb až k samotným fyzickým okrajům displeje včetně oblasti pod výřezem fotoaparátu (cutout / notch).

### 3.3. Životní cyklus a striktní pravidla Android 14+ (API 34/35) pro Foreground Service
Android 14 (UPSIDE_DOWN_CAKE) zavedl povinné typování všech Foreground Services. Pro herní overlay slouží typ **`specialUse`**.

#### 1. Požadavky v `AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_SPECIAL_USE" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

<service
    android:name=".OverlayService"
    android:enabled="true"
    android:exported="false"
    android:foregroundServiceType="specialUse">
    <property
        android:name="android.app.PROPERTY_SPECIAL_USE_FGS_SUBTYPE"
        android:value="Floating in-game HUD helper providing Pokémon GO raid counters and clipboard filters" />
</service>
```

#### 2. Spuštění v kódu služby (`startForeground` s typem):
```java
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
        startForeground(
            NOTIFICATION_ID, 
            notification, 
            ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE
        );
    } else {
        startForeground(
            NOTIFICATION_ID, 
            notification, 
            ServiceInfo.FOREGROUND_SERVICE_TYPE_MANIFEST
        );
    }
} else {
    startForeground(NOTIFICATION_ID, notification);
}
```

### 3.4. Dotyková gestika a fyzika
Správný mobilní HUD musí působit přirozeně a nesmí hráče obtěžovat. Jsou implementovány 4 stavy dotyku:

```
[Dotyk (ACTION_DOWN)] ──> [Posun (ACTION_MOVE)] ──> [Pustit (ACTION_UP)]
         │                          │                         │
         ▼                          ▼                         ▼
  Uložit výchozí X,Y        Zobrazit Koš na dně        Je nad košem?
                             (Dismiss Target)         ├── ANO: Zničit službu (Haptic)
                                                      └── NE: Magnetický dojezd k okraji
                                                              (Snap-to-Edge animátor)
```

1. **Touch Slop & Drag Threshold**: Aby se předešlo nechtěnému posunu při pokusu o klepnutí, posun se aktivuje až po překročení `ViewConfiguration.get(context).getScaledTouchSlop()` (cca 8–10 px).
2. **Magnetic Snap-to-Edge**: Při uvolnění prstu (`ACTION_UP`) se vypočítá, zda je bublina blíže k levému či pravému okraji obrazovky. Následně se spustí `ValueAnimator` s interpolátorem `DecelerateInterpolator` nebo `OvershootInterpolator`, který bublinu plynule přitáhne k okraji s 12dp odsazením.
   ```java
   private void snapToEdge(int currentX, int screenWidth, int bubbleWidth) {
       int targetX = (currentX + bubbleWidth / 2 < screenWidth / 2) ? 16 : (screenWidth - bubbleWidth - 16);
       ValueAnimator animator = ValueAnimator.ofInt(currentX, targetX);
       animator.setDuration(220);
       animator.setInterpolator(new DecelerateInterpolator());
       animator.addUpdateListener(animation -> {
           bubbleParams.x = (int) animation.getAnimatedValue();
           if (bubbleView.isAttachedToWindow()) {
               windowManager.updateViewLayout(bubbleView, bubbleParams);
           }
       });
       animator.start();
   }
   ```
3. **Drag-to-Dismiss (Zahození do koše)**: Během tažení se ve spodní části obrazovky zobrazí poloprůhledný kruh s ikonou koše. Pokud se střed bubliny přiblíží na méně než 80 dp k cíli, koš zčervená, proběhne jemná haptická vibrace a při uvolnění se služba ukončí (`stopSelf()`).

### 3.5. Integrace schránky (`ClipboardManager`) a haptická odezva
V okamžiku, kdy hráč v rozbaleném HUD panelu vybere bose nebo klepne na rychlou akci:
1. Filtr se vloží do systémové schránky přes `ClipboardManager`:
   ```java
   ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
   ClipData clip = ClipData.newPlainText("PoGo Filter", filterString);
   clipboard.setPrimaryClip(clip);
   ```
2. **Haptická odezva**:
   ```java
   Vibrator vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
   if (vibrator != null) {
       if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
           vibrator.vibrate(VibrationEffect.createPredefined(VibrationEffect.EFFECT_CLICK));
       } else {
           vibrator.vibrate(25);
       }
   }
   ```
3. **Specifikum Android 13+ (API 33)**: Android 13 automaticky zobrazuje v levém dolním rohu vlastní náhled schránky s možností editace. Naše aplikace proto na Android 13+ nezobrazuje duplicitní systémový `Toast`, ale pouze decentní vizuální indikátor (animace fajfky přímo v HUD tlačítku), aby nepřekrývala herní ovládací prvky.

### 3.6. Komparativní analýza: PoGo Events HUD vs Calcy IV vs Poke Genie

| Vlastnost | Calcy IV | Poke Genie (Android) | PoGo Events Tracker HUD |
|---|---|---|---|
| **Základní princip** | `AccessibilityService` / `MediaProjection` | `MediaProjection` (Screen Recording) | **Pure-HUD Overlay (`TYPE_APPLICATION_OVERLAY`)** |
| **Vyhodnocení counterů** | Lokální offline databáze z OCR | Lokální simulátor z OCR scanu | **Metagame Engine + Živé rotace z cloudu** |
| **Bateriová náročnost** | Střední až vysoká (neustálé OCR) | Střední (snímání při stisku) | **Extrémně nízká (< 0.5% baterie)** |
| **Zátěž paměti RAM** | 120–180 MB | 100–150 MB | **< 25 MB (Zero-WebView nativní layout)** |
| **Riziko pádu herního klienta** | Střední (systém zabíjí POGO) | Střední | **Nulové (minimální footprint paměti)** |
| **Uživatelská přívětivost** | Mnoho nastavení, složité UI | Vyžaduje kalibraci scanu | **1-Tap okamžitá volba aktivního bose** |
| **Riziko banu / ToS** | Bezpečné (nezasahuje do paměti) | Bezpečné | **100% bezpečné (pouze schránka a HUD)** |

---

## 4. iOS omezení, systémový sandboxing a nativní alternativy

### 4.1. Proč Apple zakazuje `SYSTEM_ALERT_WINDOW` a zákaz zneužití PiP
Architektura operačního systému iOS je postavena na striktním bezpečnostním sandboxingovém modelu:
1. **Žádné překryvné okno nad cizí aplikací**: V iOS neexistuje žádný ekvivalent `SYSTEM_ALERT_WINDOW`. Žádná aplikace třetí strany nesmí kreslit žádné vizuální prvky přes rozhraní jiné běžící aplikace.
2. **App Store Review Guidelines (Pravidlo 2.5.1 & 2.5.2)**: Výslovně zakazuje zneužívání systémových funkcí pro účely, pro které nebyly navrženy.
3. **Zákaz zneužití Picture-in-Picture (PiP)**: Některé utility se v minulosti pokusily obcházet toto omezení tím, že vytvořily prázdný video stream přes `AVPictureInPictureController` a do něj vkládaly interaktivní tlačítka (`AVSampleBufferDisplayLayer`). **Apple takové aplikace při revizi nekompromisně zamítá** s odkazem na porušení Guideline 2.5.2 (misuse of background audio/video playback).

### 4.2. Alternativa A: Live Activities & Dynamic Island (`ActivityKit` + `WidgetKit`)
Od iOS 16.1 a 17 je nejlepším nativním způsobem pro zobrazení živých herních dat **Live Activity**:
- Hráč si v aplikaci aktivuje „Raid Session“ nebo se Live Activity spustí automaticky v čase konání Raid Hour (středa 18:00–19:00).
- **Dynamic Island (iPhone 14 Pro, 15, 15 Pro, 16)**:
  - Během hraní Pokémon GO svítí v Dynamic Islandu miniaturní ikona 5★ bose a odpočet.
  - Při dlouhém podržení (long press) se Dynamic Island rozbalí do kompaktního panelu, který zobrazí slabosti bose, nejlepší Mega evoluci a tlačítko pro zkopírování filtru.
- **Lock Screen / StandBy**: Na zamčené obrazovce vidí hráč velkou přehlednou kartu s odpočtem a nejlepšími útočníky.

```swift
// Swift 6 / ActivityKit implementace
import ActivityKit
import WidgetKit
import SwiftUI

public struct RaidActivityAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        public var bossName: String
        public var bossTier: String
        public var weaknessList: String
        public var filterString: String
        public var endsAt: Date
    }
    public var raidEventTitle: String
}
```

### 4.3. Alternativa B: iOS Action Button & App Intents (`AppIntent`) pro 1-tap filtr
Uživatelé iPhonů 15 Pro a kompletní řady iPhone 16 mají k dispozici hardwarové **Action Button** (nebo funkci Back Tap na zádech iPhonu). Pomocí rámce **App Intents** umožníme hráči přiřadit tlačítku akci:
> **„Kopírovat raid filtr pro aktivního bose“**

```swift
import AppIntents
import UIKit

struct CopyActiveRaidFilterIntent: AppIntent {
    static var title: LocalizedStringResource = "Kopírovat Pokémon GO Raid Filtr"
    static var description = IntentDescription("Zkopíruje vyhledávací kód nejlepších counterů aktuálního raid bose do schránky.")
    
    @MainActor
    func perform() async throws -> some IntentResult & ProvidesDialog {
        let defaults = UserDefaults(suiteName: "group.com.pokego.eventtracker")
        let activeFilter = defaults?.string(forKey: "active_raid_filter") ?? "3*,4*&@fighting"
        let bossName = defaults?.string(forKey: "active_boss_name") ?? "Raid Boss"
        
        UIPasteboard.general.string = activeFilter
        
        // Vizuální odezva v Dynamic Islandu / Dynamic Notification banneru
        return .result(dialog: "Filtr pro \(bossName) zkopírován do schránky!")
    }
}
```
**Výsledek pro hráče:** Hráč stojí v Pokémon GO lobby, stiskne na 0.5 s fyzické tlačítko Action Button na boku iPhonu, ozve se haptické cvaknutí, filtr je ve schránce, hráč klepne do vyhledávacího pole v POGO a dá Vložit. Žádné opouštění hry.

### 4.4. Alternativa C: Zamykací a domovská obrazovka (Lock Screen Widgets)
Doplňkové obdélníkové a kruhové widgety na zamykací obrazovce (`accessoryRectangular`, `accessoryCircular`) ukazují:
- Ikona bose a jeho typy.
- Odpočet konce stávající rotace.
- Tap na widget otevře aplikaci přímo na generátoru filtrů pro daného bose.

### 4.5. Alternativa D: Custom Keyboard Extension
Pokročilá alternativa, kterou využívá např. Poke Genie pro iOS. Aplikace poskytuje vlastní systémovou klávesnici. Hráč v Pokémon GO klikne do vyhledávací lišty, přepne klávesnici na „PoGo Events Keyboard“ a na jedno klepnutí vloží makra:
- `[Raid Counters]`
- `[Trash 0*,1*,2*]`
- `[Hundo 4*]`
- `[PvP Great League]`

---

## 5. Katalog a specifikace 5 mobilních widgetů

Všechny widgety jsou navrženy pro obě platformy: **Android (Jetpack Glance 1.1+)** a **iOS (WidgetKit v SwiftUI)**. Využívají barevnou paletu z našeho design systému: Obsidian (`#060709`), Dark Card (`#171921`), Border (`#242836`), Purple Accent (`#aa3bff`), Cyan (`#38bdf8`), Hundo Gold (`#facc15`).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       KATALOG 5 MOBILNÍCH WIDGETŮ                           │
├──────────────────────────┬──────────────────────────────────────────────────┤
│ 1. Raid Boss & Counter   │ Výběr bose, 1-tap copy filtru, odpočet rotace    │
│ 2. Nadcházející Eventy   │ Raid Hour, Spotlight Hour, Community Day progress│
│ 3. Team GO Rocket        │ Lineupy bossů (Cliff, Sierra, Arlo, Giovanni)    │
│ 4. Denní Checklist       │ Resety o půlnoci, Streak PokéStopů a Catch       │
│ 5. Hundo & IV Filtry     │ Rychlý transfer (0*,1*,2*), 4* vyhledávač, PvP   │
└──────────────────────────┴──────────────────────────────────────────────────┘
```

---

### 5.1. Widget 1: Aktivní Raid Bossové & Rychlý Counter Filtr
- **Velikost**: Střední (Medium 4×2 na Androidu / SystemMedium na iOS).
- **Účel**: Poskytnout okamžitý přístup k nejlepším counterům aktuálně aktivních legendárních (5★) a Mega bossů.
- **Prvky uživatelského rozhraní**:
  - Miniaturní přepínač bossů (čipy např. `[Kyurem]`, `[Mega Aggron]`, `[Palkia]`).
  - Zobrazení slabostí (např. `💥 Fighting (2.56×), Rock, Steel`).
  - **1-Tap Tlačítko `📋 Kopírovat filtr`**: Využívá `AppIntent` (iOS) nebo `actionRunCallback` (Android Glance) k okamžitému vložení filtru do schránky bez nutnosti otevírat hlavní aplikaci.
  - Odpočet: `Zbývá: 3 dny, 14 hod.`

```
┌────────────────────────────────────────────────────────┐
│ ⚔️ AKTIVNÍ RAID BOSSOVÉ                 Zbývá: 3d 14h  │
├────────────────────────────────────────────────────────┤
│ [ ⭐ Kyurem ]   [ 🧬 Mega Aggron ]   [ ⭐ Palkia ]      │
├────────────────────────────────────────────────────────┤
│ Slabosti: Fighting (2.56×), Rock, Steel, Dragon, Fairy │
│ Top: Mega Lucario, Terrakion, Metagross, Reshiram      │
├────────────────────────────────────────────────────────┤
│ [ 📋 Zkopírovat Raid Filtr ]  [ 🧬 Mega Bonus: Dragon ]│
└────────────────────────────────────────────────────────┘
```

---

### 5.2. Widget 2: Nadcházející Eventy & Živé Odpočty
- **Velikost**: Malá (2×2) nebo Střední (4×2).
- **Účel**: Upozornit hráče na blížící se časově omezené události.
- **Logika zobrazení**:
  - Dynamicky řadí eventy podle priority:
    1. Právě probíhající krátkodobý event (Raid Hour 18:00–19:00, Spotlight Hour úterý 18:00).
    2. Event začínající v nejbližších 24 hodinách.
    3. Víkendový Community Day / Raid Day.
  - Vizuální progress bar pro aktivní eventy s indikací času do konce.
  - 1-tap kliknutí otevře detail eventu v aplikaci.

```
┌────────────────────────────────────────────────────────┐
│ 🔥 UDÁLOSTI POKÉMON GO                 Aktualizováno   │
├────────────────────────────────────────────────────────┤
│ 🟢 PROBÍHÁ: Raid Hour (Dialga Origin)                  │
│    Končí za: 38 minut [████████████████░░░░]           │
├────────────────────────────────────────────────────────┤
│ 🗓️ ZÍTRA 18:00: Spotlight Hour (Pikachu - 2× Catch XP)│
│ 🗓️ SOBOTA: Community Day: Rowlet                      │
└────────────────────────────────────────────────────────┘
```

---

### 5.3. Widget 3: Team GO Rocket Průvodce
- **Velikost**: Střední (4×2) nebo Velká (4×4).
- **Účel**: Rychlý rádce v terénu při střetu s balónem nebo PokéStopem s Rakeťáky.
- **Obsah**:
  - 4 taby / sekce: **Giovanni**, **Cliff**, **Sierra**, **Arlo**.
  - Zobrazení aktuálního stínového legendárního pokémona u Giovanniho (např. Shadow Groudon / Shadow Rayquaza).
  - Přehled slotů 1, 2 a 3 a jejich slabosti.
  - 1-Tap tlačítko pro zkopírování vyhledávacího filtru pro poražení daného leadera.

```
┌────────────────────────────────────────────────────────┐
│ 🚀 TEAM GO ROCKET RÁDCE                                │
├────────────────────────────────────────────────────────┤
│ [ Giovanni ]  [ Cliff ]  [ Sierra ]  [ Arlo ]          │
├────────────────────────────────────────────────────────┤
│ 👑 Giovanni Lineup:                                    │
│   Slot 1: Persian          (Slabost: Fighting)         │
│   Slot 2: Nidoking / Garchomp (Slabost: Ice, Ground)   │
│   Slot 3: Shadow Kyurem    (Slabost: Fighting, Steel)  │
├────────────────────────────────────────────────────────┤
│ [ 📋 Kopírovat tým proti Giovannimu ]                  │
└────────────────────────────────────────────────────────┘
```

---

### 5.4. Widget 4: Denní Herní Checklist & Resety
- **Velikost**: Malá (2×2) nebo Kompaktní proužek.
- **Účel**: Motivace hráče nezapomenout na denní herní rutiny a udržení streaků.
- **Interaktivní položky (zaškrtávací checkboxy)**:
  - [x] První chycení dne (Catch Streak: Den 5/7)
  - [x] První protočení PokéStopu (Spin Streak: Den 5/7)
  - [ ] Vyzvednut denní bezplatný Raid Pass (Free Daily Pass)
  - [ ] Denní dárek z PokéStopu (Send 20 Gifts)
  - [ ] Půlnoční reset za: `5 hod. 22 min.`
- Ukládání stavu probíhá v nativním widgetu s automatickým resetem o půlnoci lokálního času hráče.

---

### 5.5. Widget 5: Hundo / IV Fast-Filter Widget
- **Velikost**: Malá (2×2) nebo Široká (4×1).
- **Účel**: Nejčastěji používané vyhledávací řetězce pro správu inventáře Pokémonů v terénu na 1 tap.
- **Dlaždice s rychlou schránkou**:
  1. **🗑️ Rychlý úklid (Trash filter)**:  
     `0*,1*,2*&!shiny&!favorite&!legendary&!mythical&!ultra beasts&!shadow&!costume`  
     *(Okamžitě zobrazí všechny bezcenné pokémony připravené na transfer bez rizika smazání cenných kusů).*
  2. **💯 Hundo vyhledávač**:  
     `4*&!favorite`  
     *(Najde nově chycené 100% IV pokémony, které ještě hráč neoznačil hvězdičkou).*
  3. **✨ Nové Shiny & Kostýmy**:  
     `shiny,costume&age0`  
     *(Zobrazí speciální úlovky za posledních 24 hodin).*
  4. **⚔️ PvP Great League IV**:  
     `0-1attack&3-4defense&3-4hp&cp-1500`

---

### 5.6. Moderní technologický stack: Jetpack Glance 1.1+ vs iOS WidgetKit (SwiftUI)

#### Proč Jetpack Glance namísto starých `RemoteViews` v XML?
1. **Deklarativní syntaxe v Kotlinu**: Vývoj probíhá stejně jako v Jetpack Compose (`GlanceAppWidget`, `provideContent { Column { ... } }`). Odpadá zdlouhavé a náchylné ruční nastavování `RemoteViews.setTextViewText(R.id...)`.
2. **Podpora Android 12+ dynamických témat (Material You)**: Glance automaticky přebírá systémové zaoblení rohů (`GlanceModifier.cornerRadius(16.dp)`) a barevné odstíny podle tapety uživatele.
3. **Přímočará správa stavu**: Využívá `PreferencesGlanceStateDefinition`, kde stav widgetu odpovídá nativním `DataStore` / `SharedPreferences`.
4. **Nativní asynchronní akce**: Možnost spustit `ActionCallback` na pozadí (vložení do schránky, haptika) bez spouštění Activity.

#### Proč WidgetKit (SwiftUI) na iOS?
1. **Podpora interaktivity od iOS 17**: Widgety již nejsou pouze statické obrázky. Pomocí `Button(intent: ...)` lze provést akci (vložit do schránky, přepnout bose) bez otevření aplikace.
2. **Adaptabilita pro Lock Screen i Dynamic Island**: Jedna SwiftUI kódová báze sdílí komponenty mezi domovskou obrazovkou, zamykací obrazovkou a Dynamic Islandem.

---

## 6. Technická integrace s Capacitor 8 & Offline Data Engine

### 6.1. Most mezi webovou aplikací a nativní vrstvou (`RaidOverlayPlugin`)
Vytvoříme specializovaný Capacitor plugin, který propojí Next.js React rozhraní s nativním kódem.

#### Rozhraní v TypeScriptu (`frontend/src/plugins/raidOverlayPlugin.ts`):
```typescript
import { registerPlugin } from '@capacitor/core';

export interface RaidOverlayPluginInterface {
  isPermissionGranted(): Promise<{ granted: boolean }>;
  requestPermission(): Promise<{ success: boolean }>;
  startOverlay(options: { lang: string }): Promise<{ started: boolean }>;
  stopOverlay(): Promise<{ stopped: boolean }>;
  syncRaidData(options: {
    raidsJson: string;
    eventsJson: string;
    filtersJson: string;
    activeBossName: string;
  }): Promise<{ success: boolean }>;
}

export const RaidOverlayPlugin = registerPlugin<RaidOverlayPluginInterface>('RaidOverlayPlugin');
```

### 6.2. Eliminace spouštění WebView pro widgety a overlay (Zero-WebView HUD)
Zásadní architektonické rozhodnutí: **Plovoucí bublina ani widgety NIKDY nesmí inicializovat instanci Chromium WebView!**

#### Proč?
- Inicializace Android WebView alokuje **120 až 250 MB paměti RAM** a trvá 800–1800 ms.
- Na mobilních zařízeních (zejména 4GB a 6GB RAM Android telefonech) vede současný běh 3D hry Pokémon GO (jež sama spotřebuje 1.2–1.8 GB RAM) a plného WebView k okamžitému zásahu systémového mechanismu **Low Memory Killer (LMK)**. Výsledkem je okamžitý pád hry Pokémon GO!
- Náš HUD panel a widgety jsou vytvořeny **100% nativně** (Java/Kotlin View hierarchie pro overlay a Glance/SwiftUI pro widgety). Spotřeba paměti celého overlay servisu činí **pouze 18–24 MB RAM**.

### 6.3. Datová vrstva pro Android (`SharedPreferences` / Room SQLite / JSON)
Webová Next.js aplikace při každém stažení čerstvých dat (nebo z lokálního indexovaného úložiště) zavolá metodu `syncRaidData`:
1. Vypočte v TypeScriptu pomocí `pokemonCountersHelper.ts` přesné vyhledávací řetězce pro všechny aktivní bossy.
2. Předá kompaktní JSON do nativního pluginu.
3. Plugin data uloží do soukromého `SharedPreferences` s názvem `"pogo_overlay_data"`:
   - `KEY_ACTIVE_RAIDS`: Kompaktní pole bossů (jméno, tier, slabosti, ikona).
   - `KEY_PRECOMPUTED_FILTERS`: Slovník `{ "Kyurem": "3*,4*&@fighting...", "Mega Aggron": "..." }`.
   - `KEY_MEGA_RECOMMENDATIONS`: Doporučené Mega evoluce a filtry.
   - `KEY_UPCOMING_EVENTS`: 3 nejbližší události.
4. Nativní `OverlayService` a `EventWidgetProvider` čtou přímo z těchto `SharedPreferences`. Odezva při přepnutí bose je **okamžitá (0 ms latency)** a funguje **zcela offline** i bez připojení k internetu.

### 6.4. Datová vrstva pro iOS (`App Groups`, `UserDefaults`)
Na iOS běží Widget Extension a ActivityKit v oddělených procesech než hlavní aplikace. Pro sdílení dat se využívá **App Group** kontejner:
- App Group ID: `group.com.pokego.eventtracker`
- Zápis z Capacitor pluginu:
  ```swift
  let defaults = UserDefaults(suiteName: "group.com.pokego.eventtracker")
  defaults?.set(raidsJsonString, forKey: "cached_raids")
  defaults?.set(filtersJsonString, forKey: "cached_filters")
  WidgetCenter.shared.reloadAllTimelines()
  ```

### 6.5. Autonomní synchronizace na pozadí (`WorkManager` a `BGAppRefreshTask`)
Aby data ve widgetech nezastarala, i když uživatel neotevře aplikaci několik dní:
- **Android (`WorkManager`)**:
  - Periodický `PeriodicWorkRequest` s intervalem 4 hodiny a omezením `NetworkType.CONNECTED`.
  - Stáhne lehký JSON z `https://pogoevents.app/api/raids` a `https://pogoevents.app/api/events`.
  - Aktualizuje `SharedPreferences` a vyvolá obnovení widgetů přes `AppWidgetManager.notifyAppWidgetViewDataChanged()`.
- **iOS (`BGAppRefreshTask`)**:
  - Zaregistrována úloha `com.pokego.eventtracker.refresh` v `BGTaskScheduler`.
  - Využívá systémové okno pro aktualizaci na pozadí a volá `WidgetCenter.shared.reloadAllTimelines()`.

---

## 7. Bezpečnost, Google Play, Apple App Store & Niantic ToS Compliance

### 7.1. Schvalovací proces na Google Play (Justifikace `specialUse`)
Při publikaci aplikace na Google Play Console podléhá oprávnění `FOREGROUND_SERVICE_SPECIAL_USE` lidskému přezkumu ze strany Google reviewerů.

#### Vyžadovaná dokumentace pro Google Play Console:
1. **Účel**: Hráčská utilita pro zobrazení taktických informací během hraní hry Pokémon GO bez nutnosti opouštět hru.
2. **Proč nelze použít standardní typ FGS?** Overlay vyžaduje trvalou existenci plovoucího okna nad cizí aplikací, což neodpovídá typům `location`, `mediaPlayback` ani `camera`.
3. **Video ukázka**: Krátké video zachycující spuštění overlay bubliny v aplikaci, přepnutí do hry Pokémon GO, zkopírování raid filtru a vložení do vyhledávání.

### 7.2. Ochrana před detekcí a banem ze strany Nianticu
Častou obavou hráčů je riziko zablokování herního účtu (3-strike policy):
- **Aplikace se NIKDY nedotýká herního klienta Pokémon GO**: Žádná modifikace binárního souboru APK, žádné injektování knihoven (hooking), žádné čtení paměti procesu (memory reading).
- **Použití standardního Android API**: `WindowManager` a `ClipboardManager` jsou oficiální komponenty operačního systému.
- **Rozdíl oproti botům a spoofing utilitám**: Aplikace nepředstírá polohu GPS ani neautomatizuje herní vstupy. Jedná se o čistý informační HUD a správu schránky, stejně jako u schválených aplikací Poke Genie či Calcy IV, které miliony hráčů bezpečně používají již od roku 2016.

### 7.3. Optimalizace spotřeby baterie, paměti RAM a procesoru
- Při neaktivním stavu (sbalená bublina) je využití CPU **0.0%**. Žádné smyčky, žádné neustálé OCR snímání obrazovky.
- Bublina se překresluje pouze při dotyku uživatele nebo při rozbalení okna.
- Všechny bitmapy ikon jsou načteny ve velikosti 96×96 px s kompresí `Bitmap.Config.RGB_565` pro minimální paměťovou stopu.

---

## 8. Doporučená roadmapa implementace

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ROADMAPA IMPLEMENTACE                                 │
├───────────────┬─────────────────────────────────────────────────────────────┤
│ Fáze 1 (Týden 1) │ Stabilizace Android Overlay jádra (Android 14+ FGS, Fyzika)│
│ Fáze 2 (Týden 2) │ Zero-WebView Data Bridge & SharedPreferences synchronizace │
│ Fáze 3 (Týden 3) │ Vývoj 5 mobilních widgetů (Jetpack Glance na Androidu)     │
│ Fáze 4 (Týden 4) │ iOS Implementace: Dynamic Island, Action Button & WidgetKit │
└───────────────┴─────────────────────────────────────────────────────────────┘
```

### Fáze 1: Stabilizace Android Overlay jádra (Refaktor `OverlayService.java`)
- Oprava volání `startForeground()` pro Android 14/15 s explicitním typem `ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE`.
- Doplnění plynulého **Magnetic Snap-to-Edge** animátoru s přitažením k levému/pravému okraji.
- Implementace **Drag-to-Dismiss** cílové zóny (koš) ve spodní části obrazovky s haptickou odezvou.
- Přepracování UI rozbaleného panelu do elegantního tmavého glassmorphism stylu podle design systému aplikace (`#171921`, neon fialové a azurové linky).

### Fáze 2: Zero-WebView Data Bridge & Offline Engine
- Implementace `RaidOverlayPlugin.syncRaidData()` v TypeScriptu i Javě.
- Přenos vypočtených vyhledávacích filtrů z `pokemonCountersHelper.ts` do `SharedPreferences`.
- Odstranění přímých HTTP požadavků z `OverlayService` – overlay bude startovat okamžitě ze zálohy v `SharedPreferences`.

### Fáze 3: Vývoj 5 mobilních widgetů na Androidu (Jetpack Glance 1.1)
- Vytvoření moderních widgetů pomocí knihovny `androidx.glance:glance-appwidget`:
  1. Raid Boss & Counter Filter Widget (s 1-tap schránkovým tlačítkem).
  2. Event Countdown Widget (s progress barem a indikátorem Raid Hour).
  3. Team GO Rocket Guide Widget.
  4. Daily Reset & Streak Tracker Widget.
  5. Hundo & Fast Trash Filter Widget.
- Integrace `WorkManager` pro periodickou aktualizaci dat na pozadí každé 4 hodiny.

### Fáze 4: Implementace iOS alternativ (ActivityKit & WidgetKit)
- Konfigurace App Group `group.com.pokego.eventtracker` v Xcode.
- Vytvoření Widget Extension v Swiftu se sadou zrcadlových widgetů pro iOS 17+.
- Implementace `AppIntent` pro Action Button na iPhone 15 Pro / 16.
- Implementace Live Activity a Dynamic Islandu pro aktivní Raid Hour.

---

## 9. Primární zdroje, specifikace a bibliografie

1. **Google Android Developers Documentation**:
   - *Draw over other apps permission*: `Settings.ACTION_MANAGE_OVERLAY_PERMISSION` & `Settings.canDrawOverlays(Context)`.  
     URL: [https://developer.android.com/reference/android/provider/Settings#ACTION_MANAGE_OVERLAY_PERMISSION](https://developer.android.com/reference/android/provider/Settings#ACTION_MANAGE_OVERLAY_PERMISSION)
   - *WindowManager.LayoutParams (TYPE_APPLICATION_OVERLAY)*:  
     URL: [https://developer.android.com/reference/android/view/WindowManager.LayoutParams#TYPE_APPLICATION_OVERLAY](https://developer.android.com/reference/android/view/WindowManager.LayoutParams#TYPE_APPLICATION_OVERLAY)
   - *Android 14 Behavior Changes: Foreground service types are required (`specialUse`)*:  
     URL: [https://developer.android.com/about/versions/14/changes/fgs-types-required#special-use](https://developer.android.com/about/versions/14/changes/fgs-types-required#special-use)
   - *Jetpack Glance Overview (Declarative AppWidgets with Compose)*:  
     URL: [https://developer.android.com/jetpack/compose/glance](https://developer.android.com/jetpack/compose/glance)
   - *Android ClipboardManager API*:  
     URL: [https://developer.android.com/reference/android/content/ClipboardManager](https://developer.android.com/reference/android/content/ClipboardManager)

2. **Apple Developer Documentation**:
   - *ActivityKit & Live Activities Overview*:  
     URL: [https://developer.apple.com/documentation/activitykit](https://developer.apple.com/documentation/activitykit)
   - *Displaying live data with Live Activities & Dynamic Island*:  
     URL: [https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities)
   - *App Intents & Hardware Interactions (Action Button integration)*:  
     URL: [https://developer.apple.com/documentation/appintents/hardware-interactions](https://developer.apple.com/documentation/appintents/hardware-interactions)
   - *App Store Review Guidelines (Guideline 2.5.1 Sandbox & 2.5.2 Background Modes)*:  
     URL: [https://developer.apple.com/app-store/review/guidelines/#performance](https://developer.apple.com/app-store/review/guidelines/#performance)

3. **Capacitor 8 Official Documentation**:
   - *Capacitor Android Plugin Guide & Bridge Interaction*:  
     URL: [https://capacitorjs.com/docs/plugins/android](https://capacitorjs.com/docs/plugins/android)
   - *Capacitor iOS Plugin Guide & App Groups Data Sharing*:  
     URL: [https://capacitorjs.com/docs/plugins/ios](https://capacitorjs.com/docs/plugins/ios)

4. **Pokémon GO Metagame & Search Filter Syntax**:
   - *Niantic Pokémon GO Official Search String & Filter Reference*:  
     Podpora operátorů `@1type`, `@2type`, `@3type`, `3*,4*`, `!@frustration`, `megaevolve`, `age0`, `distance`.
   - *Pokebattler & PvPoke PvE Damage Formula Matrix*:  
     Základ pro defenzivní koeficienty v `frontend/src/utils/pokemonCountersHelper.ts`.
