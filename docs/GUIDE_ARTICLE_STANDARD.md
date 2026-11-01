# PoGo Events Tracker — Guide Article & Widget Creation Standard

Tento dokument slouží jako **závazná šablona a metodická příručka** pro vytváření nových článků a interaktivních průvodců na [pogoevents.app/guides](https://pogoevents.app/guides).

Každý nový článek v projektu musí dosahovat stejné úrovně kvality, hravosti a interaktivity jako vlajkové lodě:
- **Galarian Birds Encounter & Catch Guide** (`galarian-birds-encounter-catch-guide`)
- **Pokémon GO Referral Program Guide** (`pokemon-go-referral-program-guide`)

---

## 1. Architektura a datová struktura

Každý článek se skládá ze dvou hlavních částí:
1. **Datový záznam** v `frontend/src/data/guidesData.ts` (a zrcadlově v `backend/src/data/defaultGuidesData.ts`).
2. **Interaktivní widget** v `frontend/src/components/<Název>InteractiveWidget.tsx` (registrovaný v `GuidesView.tsx`).

### Šablona pro `guidesData.ts`:

```typescript
{
  id: 'moje-tema-guide',
  slug: 'moje-tema-guide',
  iconName: 'Target', // Lucide icon: Target, Sparkles, Swords, Award, Shield, Zap...
  imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
  featured: true,     // true pro hlavní články týdne
  author: 'PoGo Events Team',
  readTime: '8 min',
  updatedAt: '2026-11-01',
  category: {
    cs: 'Název kategorie',
    en: 'Category Name',
    ja: 'カテゴリー名',
    ru: 'Название категории'
  },
  title: {
    cs: 'Poutavý český SEO titulek: Hlavní klíčové slovo a benefit',
    en: 'Engaging English SEO Title: Primary Keyword & Benefit',
    ja: '日本語のSEOタイトル',
    ru: 'Русский SEO заголовок'
  },
  subtitle: {
    cs: 'Stručné shrnutí článku s klíčovými fakty pro vyhledávače a sociální sítě.',
    en: 'Concise summary with critical game mechanics for search engines and social cards.',
    ja: '記事の概要と要点',
    ru: 'Краткое описание механик и содержания'
  },
  sections: [
    {
      id: 'sekce-1-mechanika',
      pokemon: ['Mewtwo', 'Charizard'], // Volitelné Pokémon chipsy
      heading: {
        cs: '1. Základní mechanika a podmínky',
        en: '1. Core Mechanics & Eligibility',
        ja: '1. 基本仕様と条件',
        ru: '1. Основные механики и условия'
      },
      content: {
        cs: 'Podrobný rozbor mechaniky s přesnými čísly (časy, šance, levely, limity)...',
        en: 'Detailed technical explanation with precise numbers (timers, odds, levels, caps)...',
        ja: '詳細な解説...',
        ru: 'Подробное объяснение...'
      },
      tips: {
        cs: [
          '⚡ Pro tip: Konkrétní trik pro urychlení nebo úsporu zdrojů.',
          'Důležité upozornění na častou chybu hráčů.'
        ],
        en: [
          '⚡ Pro tip: Actionable shortcut to save time or in-game resources.',
          'Critical note avoiding common pitfalls.'
        ],
        ja: [
          '⚡ プロの技：効率化テクニック',
          '注意点'
        ],
        ru: [
          '⚡ Совет: Лайфхак для ускорения',
          'Важное примечание'
        ]
      }
    }
  ]
}
```

---

## 2. Zásady pro tvorbu interaktivních widgetů

Aby článek nebyl jen statickým textem, integrujte vizuální a interaktivní prvky:

### A. Vizuální Hero Card s kódem nebo hlavním benefitem
- Zvýrazněný rámeček s neonovým fialovým gradientem (`rgba(168, 85, 247, 0.45)`).
- Tlačítko **Kopírovat kód / hodnotu** do schránky (`navigator.clipboard.writeText`) s okamžitou zpětnou vazbou:
  - Zelené zaškrtávátko + text „Zkopírováno!“.
- Číslovaný mini-návod (např. 4 kroky v aplikaci) s kulatými odznaky `1`, `2`, `3`, `4`.

### B. Srovnávací milníkové karty (Side-by-Side Dual Rewards)
- Zobrazení obou stran (např. Pozvaný hráč vs Zvoucí trenér nebo Standardní vs Shiny).
- **Oficiální artworky Pokémonů** z PokeAPI:  
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dexId}.png`
- **Oficiální ikony předmětů** z LeekDuck:  
  `https://cdn.leekduck.com/assets/img/items/${Item%20Name}.png`
- Zlatý text pro počty kusů (`#facc15`).
- Zelené štítky pro garantované IV floor (např. `10/10/10 IV • 0% Flee`).
- Žlutý spodní pruh (`.milestone-tip-strip`) s ikonou blesku `Zap` pro strategické tipy.

### C. Podpora světlého režimu (Light Mode)
Každý nový widget musí obsahovat explicitní CSS pravidla pro `body.light-mode`:
```css
body.light-mode .milestone-card {
  background: #ffffff !important;
  border-color: rgba(15, 23, 42, 0.12) !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05) !important;
}

body.light-mode .milestone-task-title {
  color: #0f172a;
}
```

---

## 3. Registrace widgetu v `GuidesView.tsx`

V souboru `frontend/src/components/GuidesView.tsx`:

1. Importujte komponentu widgetu:
   ```tsx
   import { MyFeatureInteractiveWidget } from './MyFeatureInteractiveWidget';
   ```

2. Přidejte podmínku do funkce `renderVisualArticleWidget(slug)`:
   ```tsx
   const renderVisualArticleWidget = (slug: string) => {
     if (slug === 'galarian-birds-encounter-catch-guide') {
       return <GalarianBirdsInteractiveWidget lang={lang} />;
     }
     if (slug === 'pokemon-go-referral-program-guide') {
       return <ReferralProgramInteractiveWidget lang={lang} />;
     }
     if (slug === 'moje-tema-guide') {
       return <MyFeatureInteractiveWidget lang={lang} />;
     }
     // ...
   };
   ```

---

## 4. Povinné testování a validace

Před commitem vždy spusťte kompletní ověřovací proces:

```powershell
# 1. Frontend Unit Testy
cd frontend
npm.cmd test

# 2. Backend Unit Testy & Kompilace
cd ../backend
npm.cmd test
npm.cmd run build

# 3. Export statických stránek (Next.js SSG)
cd ../frontend
npm.cmd run build:deploy
```

Zkontrolujte, že soubor `dist/{lang}/guides/{slug}.html` existuje pro všechny 4 jazyky (`cs`, `en`, `ja`, `ru`) a že byl přidán do `dist/sitemap.xml`.
