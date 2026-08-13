# 📸 Pokémon GO Event Tracker – Instagram Lineup & Content Strategy

Tento dokument obsahuje kompletní týdenní plán (Content Lineup) pro publikaci infografik z aplikace na Instagram a TikTok, včetně doporučených formátů, popisků (captions), hashtagů a strategií pro maximální organický dosah a návštěvnost webu `pogoevents.app`.

---

## 📅 Týdenní Lineup Příspěvků (Weekly Instagram Lineup)

| Den v týdnu | Typ příspěvku / Infografika | Formát příspěvku | Hlavní cíl |
| :--- | :--- | :--- | :--- |
| **Pondělí** | ⚡ **Max Monday / Dynamax Event** | Obrázkový post (1:1 nebo 4:5) / Reel | Ranní reminder na večerní Max Battle (18:00–19:00) |
| **Úterý** | 🍬 **Spotlight Hour Poster** | Obrázkový post / Carousel (Normal + Shiny + Meta) | Příprava na Spotlight Hour (18:00–19:00), návštěvnost webu |
| **Středa** | ⚔️ **Raid Hour & Counter Guide** | Carousel / Single Post (Boss + Countery + CP 100% IV) | Hlavní týdenní magnet pro raidera před Raid Hour |
| **Čtvrtek** | 🚀 **Rocket Takeover / Team Leaders** | Post / Infografika | Návody na counters pro Sierra, Arlo, Cliff, Giovanni |
| **Pátek** | 🗓️ **Weekend Events & Community Day Preview** | Carousel / Infographic Poster | Přehled víkendového obsahu a příprava na Community Day |
| **Sobota** | 🎨 **Community Day / Hatch Day Live Guide** | Story + Post + Reel | Živý přehled aktivního eventu, Shiny rate, bonusy |
| **Neděle** | 📊 **Týdenní Souhrn & Výhled na další týden** | Carousel (Weekly Overview Infographic) | Pravidelný nedělní přehled nadcházejících událostí |

---

## 📝 Detailní šablony příspěvků (Post Templates & Captions)

### 1. 🍬 Úterý: Spotlight Hour Infographic
* **Formát:** 4:5 Portrait Infografika (vygenerovaná z `SpotlightInfographic.tsx`)
* **Popisek (Caption):**
  > 🍬 **Dnešní Pokémon GO Spotlight Hour!**
  > 
  > 📍 **Pokémon:** {Název Pokémona}
  > ✨ **Shiny šance:** {Ano / Ne}
  > 🎁 **Aktivní bonus:** 2× {Candy / Stardust / XP}
  > ⏰ **Čas:** Dnes od 18:00 do 19:00 místního času.
  > 
  > 📊 *PvE & PvP hodnocení:*
  > • PvE: {Rating} | PvP: {Rating}
  > • Best Moveset: {Fast Move} + {Charged Move}
  > 
  > 📲 Pro kompletní časovače a další nadcházející eventy navštivte link v bio: **pogoevents.app**!
  > 
  > #PokemonGO #SpotlightHour #PokemonGOCommunity #PogoEvents #{PokemonName} #PokemonGOTips

---

### 2. ⚔️ Středa: Raid Hour Infographic
* **Formát:** Carousel (Slide 1: Boss + CP Hundo/Boosted + Shiny, Slide 2: Top Mega Counters, Slide 3: Budget & Type Weakness)
* **Popisek (Caption):**
  > ⚔️ **Dnešní Raid Hour Infografika!**
  > 
  > 🐉 **Boss:** {Název Bosse}
  > ⚡ **Slabiny (Weaknesses):** {Slabiny}
  > 💯 **100% IV CP:** Standard: {Min-Max CP} CP | Weather Boosted: {Boosted CP} CP
  > 👥 **Doporučený počet hráčů:** {Počet hráčů}
  > 
  > 🛡️ *Nejlepší Countery:*
  > 1️⃣ Mega {Counter 1}
  > 2️⃣ Shadow {Counter 2}
  > 3️⃣ {Counter 3}
  > 
  > 💡 Vygenerujte si vyhledávací řetězec do hry pro rychlý výběr týmu na **pogoevents.app/cs/filter**!
  > 
  > #PokemonGO #RaidHour #RaidCounters #{BossName} #PokemonGORaid #PogoEvents

---

### 3. 🎨 Sobota / Víkend: Community Day Poster
* **Formát:** 4:5 Poster vygenerovaný z `CommunityDayInfographic.tsx`
* **Popisek (Caption):**
  > 🌟 **Community Day je TADY!**
  > 
  > 📍 **Hlavní Pokémon:** {Název}
  > ✨ **Shiny Rate:** ~1:25
  > ⚔️ **Exkluzivní útok:** {Název útoku} (při evoluci do 22:00)
  > 🎁 **Bonusy:** 3× Stardust, 1/2 Egg Hatch Distance, 3h Lures & Incense
  > 
  > 📲 Stáhněte si kompletní plakát a zkontrolujte úkoly v aplikaci **pogoevents.app**!
  > 
  > #CommunityDay #PokemonGO #PogoEvents #ShinyPokemon

---

## 📈 Strategie pro Růst a Návštěvnost z Instagramu na Web (`pogoevents.app`)

1. **Link in Bio & Instagram Stories:**
   - Každý příspěvek doplňte do Instagram Story s nálepkou **"Odkaz" (Link Sticker)** vedoucí přímo na konkrétní event na webu: `pogoevents.app/cs/events/{eventID}`.
2. **Generátor Filtrů pro Raidy:**
   - Do popisků u Raid Hour dávejte call-to-action: *"Zkopírujte si vyhledávací kód pro vaše nejlepší countery na pogoevents.app/cs/filter"*.
3. **Instagram Grid Estetika:**
   - Používejte jednotný dark glassmorphic styl z aplikace (který generují vestavěné Infographic generátory v Admin Panelu), aby profil působil prémiově a rozpoznatelně.
