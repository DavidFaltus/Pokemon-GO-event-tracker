# 🚀 Pokémon GO Event Tracker – SEO, Architektura & Růstová Strategie

Tento dokument definuje kompletní plán pro masivní navýšení organické vyhledatelnosti (SEO), rozšiřování architektury a mobilního zážitku aplikace **`pogoevents.app`**.

---

## 🎯 1. SEO & Štítky Strukturovaných Dat (Rich Snippets & Schema.org)

Aby Google zobrazoval akce z `pogoevents.app` přímo ve výsledcích vyhledávání ve formě **Rich Cards (Události Google)**:

1. **`Schema.org/Event` JSON-LD na stránkách událostí (`/[lang]/events/[slug]`):**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Event",
     "name": "Mewtwo Raid Hour",
     "startDate": "2026-08-19T18:00:00+02:00",
     "endDate": "2026-08-19T19:00:00+02:00",
     "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
     "eventStatus": "https://schema.org/EventScheduled",
     "location": {
       "@type": "Place",
       "name": "Pokémon GO Global / Local Gyms"
     },
     "image": ["https://pogoevents.app/api/og?title=Mewtwo+Raid+Hour"],
     "description": "Kompletní průvodce a nejlepší countery pro Mewtwo v Pokémon GO."
   }
   ```
2. **`Schema.org/BreadcrumbList` & `FAQPage`:**
   - Zlepšuje zobrazení drobečkové navigace ve vyhledávači.
   - FAQ sekce pro dotazy typu *"Jaké jsou nejlepší countery pro Mewtwo?"* nebo *"Kdy probíhá Spotlight Hour?"*.

3. **Dynamické Open Graph Obrázky (`/api/og`):**
   - Vytvoření dynamického generátoru náhledových obrázků pro sociální sítě (Facebook, Twitter/X, Discord, Telegram), který při sdílení odkazu automaticky vytvoří atraktivní banner s názvem eventu a časem.

---

## 🐉 2. Nová Sekce: Dedikované Pokémon Stránky (`/[lang]/pokemon/[id]`)

Pro zachycení velkého objemu organického vyhledávání z Google (např. *"Rayquaza counters Pokemon GO"*, *"Mewtwo 100 IV CP"*, *"Frigibax shiny šance"*):

* **Struktura URL:** `https://pogoevents.app/cs/pokemon/rayquaza` (podpora všech 4 jazyků: `cs`, `en`, `ja`, `ru`).
* **Obsah Pokémon stránky:**
  - **100% IV CP Tabulka:** Standardní CP (L20) vs Weather Boosted CP (L25).
  - **PvE & PvP Meta Rozbor:** Hodnocení v Great / Ultra / Master League a nejlepší útoky (Fast + Charged).
  - **Tabulka slabin a nejlepších Counterů:** Mega, Shadow i Budget Pokémoni pro boj.
  - **Historie a nadcházející eventy:** Seznam událostí, kde se daný Pokémon objevuje.

---

## 📱 3. Mobilní PWA Zážitky & Instalace na Plochu

1. **Prémiový PWA Banner pro Instalaci:**
   - Elegantní glassmorphic lišta na mobilních zařízeních vyzývající k přidání aplikace na plochu (iOS & Android).
2. **Lokální Notifikace:**
   - Možnost zapnout si upozornění 15 minut před začátkem Spotlight Hour, Raid Hour nebo Community Day.

---

## 📸 4. Týdenní Lineup pro Instagram

Kompletní podrobný plán pro týdenní publikaci infografik, popisky v češtině/angličtině a hashtagy byl vytvořen a uložen do samostatného souboru:
👉 **[`INSTAGRAM_LINEUP_STRATEGY.md`](file:///C:/PROJEKTY/OSOBN%C3%8D/Pokemon-GO-event-tracker/INSTAGRAM_LINEUP_STRATEGY.md)**
