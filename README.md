# 🎮 Pokémon GO Event Tracker

> Přehledná webová a mobilní aplikace pro sledování aktivních eventů, raidů, hnízdění Pokémonů a dalších herních informací z Pokémon GO v reálném čase.

[![Deploy](https://img.shields.io/badge/Live-pokego--event--tracker--2026.web.app-brightgreen?style=flat-square&logo=firebase)](https://pokego-event-tracker-2026.web.app)
[![GitHub Actions](https://img.shields.io/github/actions/workflow/status/DavidFaltus/Pokemon-GO-event-tracker/deploy.yml?style=flat-square&label=CI%2FCD)](https://github.com/DavidFaltus/Pokemon-GO-event-tracker/actions)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)

---

## ✨ Funkce

- **📅 Přehled eventů** – Aktuálně aktivní a nadcházející eventy s přesnými časy zahájení a ukončení.
- **⚔️ Raidy** – Seznam aktivních raid bossů s doporučenými countery a hodnocením.
- **🏅 Žebříček Pokémonů (PVE Ranking)** – Pokémoni seřazeni podle PVE výkonu s ideálními útoky a statistikami. Na mobilech a tabletech lze karty rozbalit kliknutím.
- **🥚 Hnízdění & Líhnutí** – Přehled, kde se aktuálně líhnou a hnízdí vybraní Pokémoni.
- **🚀 Team GO Rocket** – Aktuální složení lídrů Rocketů a Grunts s tipy pro porážku.
- **🔔 Notifikace** – Nastavitelné push notifikace na začátek eventů (mobilní verze).
- **🌍 Vícejazyčnost** – Podpora češtiny a angličtiny.

---

## 🖥️ Technologický stack

| Vrstva | Technologie |
|---|---|
| Frontend | React 19, TypeScript 6, Vite |
| Styling | Vanilla CSS (dark mode, glassmorphism, HSL palettes) |
| Mobilní app | Capacitor 8 (Android) |
| Hosting | Firebase Hosting |
| CI/CD | GitHub Actions |
| Backend | Node.js + TypeScript |

---

## 📁 Struktura repozitáře

```
├── pogo-tracker-web/        # Webová verze (Firebase Hosting)
│   ├── frontend/            # React/Vite frontend
│   └── backend/             # Node.js API server
│
├── pogo-tracker-new/        # Mobilní verze (Capacitor / Android)
│   ├── frontend/            # React/Vite frontend + Capacitor
│   └── android/             # Nativní Android projekt
│
└── .github/workflows/       # CI/CD (GitHub Actions → GitHub Pages)
```

---

## 🚀 Spuštění lokálně

### Webová verze

```bash
cd pogo-tracker-web/frontend
npm install
npm run dev
```

### Mobilní verze (Android)

```bash
cd pogo-tracker-new/frontend
npm install
npm run android:sync   # Build + Capacitor sync
# Poté otevřete android/ v Android Studio
```

### Backend (API server)

```bash
cd pogo-tracker-web/backend
npm install
npm run dev
```

---

## 🌐 Live verze

| Platforma | URL |
|---|---|
| Web App | [pokego-event-tracker-2026.web.app](https://pokego-event-tracker-2026.web.app) |

---

## 📱 Responzivní design

Aplikace je plně přizpůsobena pro tři typy zařízení:

- **📱 Mobilní telefony** – Jednosloupcový layout, spodní navigační panel, kolaps statistik v žebříčku.
- **💻 Tablety** – Dvou/třísloupcový grid, rozložení optimalizované pro dotyk.
- **🖥️ Desktop** – Plný layout s postranními panely, statistiky zobrazeny vždy.

---

## 📝 Licence

Tento projekt je určen pouze pro osobní a nekomerční použití. Pokémon GO a veškeré související ochranné známky jsou majetkem společností Niantic a Nintendo.
