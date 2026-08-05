# 🎮 Pokémon GO Event Tracker & Mobile App

> Přehledná webová a nativní mobilní aplikace (Android) pro sledování aktivních eventů, raidů, Team GO Rocket, hnízdění Pokémonů a dalších herních informací z Pokémon GO v reálném čase.

[![Deploy](https://img.shields.io/badge/Live-pogoevents.app-brightgreen?style=flat-square&logo=firebase)](https://pogoevents.app)
[![Release](https://img.shields.io/github/v/release/DavidFaltus/Pokemon-GO-event-tracker?style=flat-square&logo=github&color=blue)](https://github.com/DavidFaltus/Pokemon-GO-event-tracker/releases)
[![Build & Release APK](https://img.shields.io/github/actions/workflow/status/DavidFaltus/Pokemon-GO-event-tracker/release-apk.yml?style=flat-square&label=Android%20APK%20Build)](https://github.com/DavidFaltus/Pokemon-GO-event-tracker/actions)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Capacitor](https://img.shields.io/badge/Capacitor-8-119EFF?style=flat-square&logo=capacitor)

---

## ✨ Hlavní funkce

* **📅 Přehled eventů v reálném čase** – Živé odpočty (Community Days, Raid Hours, Spotlight Hours, Max Mondays, Rocket Takeovers) s přesným časem začátku a konce.
* **⚔️ Raidy & Doporučené counters (5★, Mega, 3★, 1★ & Shadow)** – Detailní přehled aktivních raid bossů s 100% IV CP rozpětím (základní i weather boosted), indikátorem Shiny formy, PoGO Hub hodnocením a vybranými týmy (Mega, Advanced, Budget).
* **🌍 Automatická detekce regionálních Pokémonů** – Aplikace automaticky podle polohy/časové zóny uživatele (např. EMEA / Evropa) zobrazí místního regionálního raid bossa (např. *Mesprit*) a cizí regionální bossy (*Uxie*, *Azelf*) automaticky skryje. U všech událostí navíc zobrazuje přehledné regionální odznaky.
* **🚀 Team GO Rocket & Shadow Pokémoni** – Kompletní průvodce pro porážku lídrů (Cliff, Arlo, Sierra, Giovanni) a Gruntů vč. aktivních Shadow odměn a slabostí.
* **💜 Ditto maskování & 🥚 Líhnutí z vajec** – Aktuální seznam Pokémonů, za které se maskuje Ditto, a kompletní přehled líhnutí z 2km, 5km, 7km, 10km a 12km vajec.
* **🏅 PVE & PVP Žebříčky Pokémonů** – Přehledný žebříček nejlepších útočníků s doporučenými rychlými i nabíjecími útoky a přímým generátorem vyhledávacích řetězců (Filter Generator).
* **📸 Generátor infografik** – Export vysoce kvalitních tématických obrázků (PNG) pro Raid Hours, Community Days, Spotlight Hours a Rocket Takeovers pro snadné sdílení v komunitě.
* **🔔 Mobilní pozadí & Přesné notifikace (Android)** – Přesné nativní notifikace s vysokou prioritou chráněné proti Doze módu (pomocí `allowWhileIdle` přesných alarmů), které upozorní na nadcházející eventy i při vypnuté aplikaci.
* **📌 Plovoucí widget (Android Overlay Service)** – Podpora přenosného plovoucího okna přes systémové rozhraní Androidu pro rychlé sledování statistik přímo při hraní Pokémon GO.

---

## 📲 Ke stažení (Android APK)

Nejnovější přeloženou verzi mobilní aplikace pro Android (vyžaduje Android 8.0+) si můžete stáhnout přímo z [GitHub Releases](https://github.com/DavidFaltus/Pokemon-GO-event-tracker/releases):

* 📦 **[PokeGO-Event-Tracker.apk](https://github.com/DavidFaltus/Pokemon-GO-event-tracker/releases/latest)** – Automaticky sestavovaný Android balíček vytvořený přes GitHub Actions.

---

## 🖥️ Technologický stack

| Vrstva | Technologie | Popis |
|---|---|---|
| **Frontend** | React 19, TypeScript, Next.js (SSG Export) | Rychlý, SEO-optimalizovaný a plně responzivní frontend |
| **Design** | Vanilla CSS (Dark Glassmorphism) | HSL schémata, gradients, mikroanimace, záře |
| **Mobilní app** | Capacitor 8 (Android) | Nativní propojení WebView a systémových služeb Androidu |
| **Backend / Scraper** | Node.js, Express, Axios, Cheerio | Scraper běžící na Cloud Run se záložním Bingbot user-agentem |
| **Hosting** | Firebase Hosting (`pogoevents.app`) | CDN distribuce webové aplikace s clean-URLs |
| **CI/CD** | GitHub Actions | Automatické nasazení na Firebase a build GitHub Releases (APK) |

---

## 📁 Architektura projektu

```
├── frontend/                # Sdílený React/Next.js frontend & Capacitor Android app
│   ├── src/                 # Komponenty, háčky, databáze a pomocné utility
│   │   ├── components/      # UI komponenty (RaidView, EventCard, RocketGuide, atd.)
│   │   ├── data/            # Databáze útoků, counterů, hodnocení a překladů
│   │   └── utils/           # Resolver obrázků (Unsplash/PogoAssets/PokemonDB) a regionů
│   ├── android/             # Nativní Android projekt (Capacitor + Java Overlay plugin)
│   └── package.json         # Skripty pro build webu (npm run build:deploy) i Androidu (npm run build:android)
│
├── backend/                 # API server a Cloud Run scraper
│   ├── src/scraper.ts       # HTTP Scraper pro LeekDuck, PoGOHub a Niantic News
│   └── custom_events.json   # Ruční a záložní databáze událostí
│
└── .github/workflows/       # CI/CD Workflows
    ├── deploy.yml           # Automatické nasazení webu na Firebase Hosting
    └── release-apk.yml      # Automatický build Android APK & GitHub Release při pushnutí tagu (v*)
```

---

## 🚀 Lokální spuštění a Vývoj

### 1. Webová verze (`frontend`)

```bash
cd frontend
npm install
npm run dev
```

Aplikace poběží lokálně na `http://localhost:3000`.

### 2. Sestavení pro Android (`frontend/android`)

```bash
cd frontend
npm install
npm run build:android    # Zkompiluje Next.js a synchronizuje webové assety do Capacitor Androidu
```

Následně otevřete složku `frontend/android/` v **Android Studiu** a spusťte build nebo vytvořte APK soubor.

### 3. Backend & Scraper (`backend`)

```bash
cd backend
npm install
npm run dev
```

---

## 🔄 Automatické vydávání verzí (CI/CD Releases)

Projekt používá plně automatizované sestavení GitHub Release balíčků podle vzoru `v*`:

Pro vydání nové verze aplikace stačí vytvořit a odeslat git tag:

```bash
git tag -a v1.0.0 -m "Release v1.0.0 - Notifikace, automatické regiony a opravy spritů"
git push origin main --tags
```

GitHub Actions workflow `.github/workflows/release-apk.yml` automaticky:
1. Nainstaluje závislosti a zkompiluje produkční frontend.
2. Synchronizuje Capacitor Android projekt.
3. Pomocí Gradle a JDK 21 sestaví balíček `PokeGO-Event-Tracker.apk`.
4. Vytvoří nový **GitHub Release** na repozitáři a přiloží hotový `.apk` ke stažení.

---

## 📝 Licence & Autorská práva

Tento projekt je určen pro komunita a osobní nekomerční použití. 
Pokémon GO a veškeré související názvy, grafika a ochranné známky jsou majetkem společností **Niantic, Inc.**, **The Pokémon Company** a **Nintendo**.
