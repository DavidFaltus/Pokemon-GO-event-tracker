'use client';

import React, { useState, useMemo } from 'react';
import type { Language } from '../data/translations';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Lightbulb, 
  Zap, 
  Footprints, 
  Swords, 
  Repeat, 
  Compass,
  Copy,
  Check
} from 'lucide-react';
import { getPokemonIconUrl, handlePokemonImageError } from '../utils/imageResolver';
import { getPokemonName } from '../utils/pokemonTranslator';
import './EvolutionQuestsInteractiveWidget.css';

interface EvolutionQuestsInteractiveWidgetProps {
  lang: Language;
}

const EVOLUTION_QUEST_ITEMS = [
  {
    base: 'Farfetchd-Galarian',
    evolved: 'Sirfetchd',
    category: 'buddy',
    task: { 
      cs: '10× Excellent hodů jako Buddy Pokémon (50 Candy)', 
      en: '10 Excellent Throws as Buddy Pokémon (50 Candy)', 
      ja: '相棒にしてエクセレントスロー10回（アメ50個）', 
      ru: '10 Excellent бросков с бадди (50 конфет)' 
    },
    tip: { 
      cs: 'Hody nemusí jít za sebou! Použijte Nanab Berry na velké raid bossy (Wailmer, Snorlax, legendární bossové).', 
      en: 'Throws do not need to be in a row! Use Nanab Berries on large raid bosses for easy targets.',
      ja: '連続で投げる必要はありません！レイドボスにナナのみを使って落ち着いて狙いましょう。',
      ru: 'Броски не обязательно делать подряд! Используйте Nanab Berry на крупных рейдовых боссах.'
    },
    badge: '10× Excellent'
  },
  {
    base: 'Pancham',
    evolved: 'Pangoro',
    category: 'buddy',
    task: { 
      cs: 'Chytit 32 Dark-type Pokémonů jako Buddy (50 Candy)', 
      en: 'Catch 32 Dark-type Pokémon as Buddy (50 Candy)', 
      ja: '相棒にしてあくタイプ32匹捕獲（アメ50個）', 
      ru: 'Поймать 32 Темных покемона с бадди (50 конфет)' 
    },
    tip: { 
      cs: 'Bojujte s Dark-type Rocket Gruntem ("Kde je světlo, tam je stín") nebo lovte během nočních spawnů.', 
      en: 'Hunt Dark Rocket Grunts or catch Dark-types during night spawns.',
      ja: 'ロケット団のあくタイプしたっぱと戦うか、夜間の出現を狙いましょう。',
      ru: 'Сражайтесь с тёмными пешками Ракеты или ловите тёмных покемонов ночью.'
    },
    badge: '32 Dark-type'
  },
  {
    base: 'Primeape',
    evolved: 'Annihilape',
    category: 'combat',
    task: { 
      cs: 'Porazit 30 Ghost nebo Psychic Pokémonů v bitvách (100 Candy)', 
      en: 'Defeat 30 Ghost or Psychic Pokémon in Trainer Battles (100 Candy)', 
      ja: '相棒にしてゴースト/エスパー30匹撃破（アメ100個）', 
      ru: 'Победить 30 Призраков/Психических в битвах (100 конфет)' 
    },
    tip: { 
      cs: '⚡ Blanche ML Trik: Spusťte trénink proti Blanche v Master League (má Metagrosse). Porazte Metagrosse a okamžitě vzdejte — 30 killů máte za pár minut!', 
      en: '⚡ Blanche ML Trick: Battle Blanche in Master League (Metagross is Psychic). Defeat Metagross and surrender to quickly farm all 30 kills!',
      ja: '⚡ ブランシェ裏技：マスターリーグでブランシェと対戦し、メタグロス（エスパー）を倒したら即降参を繰り返せば数分で達成！',
      ru: '⚡ Трюк с Бланш: Сражайтесь с Бланш в Master League. Побеждайте Metagross и сдавайтесь — 30 побед за пару минут!'
    },
    badge: '30 Ghost/Psychic'
  },
  {
    base: 'Charcadet',
    evolved: 'Armarouge',
    category: 'combat',
    task: { 
      cs: 'Porazit 30 Psychic Pokémonů v bitvách jako Buddy (50 Candy)', 
      en: 'Defeat 30 Psychic-type Pokémon in battles as Buddy (50 Candy)', 
      ja: '相棒にしてエスパータイプ30匹撃破（アメ50個）', 
      ru: 'Победить 30 Психических покемонов в битвах (50 конфет)' 
    },
    tip: { 
      cs: 'Trénink s Blanche v Master League v menu Battle funguje skvěle i na Armarouge!', 
      en: 'Training against Blanche in Master League in the Battle menu works great for Armarouge too!',
      ja: '対戦メニューのブランシェ（マスターリーグ）特訓で素早く達成できます！',
      ru: 'Тренировка с лидером Бланш в Master League отлично подходит для Armarouge!'
    },
    badge: '30 Psychic Defeated'
  },
  {
    base: 'Charcadet',
    evolved: 'Ceruledge',
    category: 'combat',
    task: { 
      cs: 'Porazit 30 Ghost Pokémonů v bitvách jako Buddy (50 Candy)', 
      en: 'Defeat 30 Ghost-type Pokémon in battles as Buddy (50 Candy)', 
      ja: '相棒にしてゴーストタイプ30匹撃破（アメ50個）', 
      ru: 'Победить 30 Призрачных покемонов в битвах (50 конфет)' 
    },
    tip: { 
      cs: 'Zahrajte rychlý přátelský PvP souboj s kamarádem, který nasadí 3× Ghost Pokémony s nízkým CP.', 
      en: 'Battle a friend in PvP who fields three low-CP Ghost-type Pokémon.',
      ja: 'フレンドに対戦でCPの低いゴーストタイプを3匹出してもらうと一瞬で達成できます。',
      ru: 'Сыграйте быстрое PvP с другом, который выставит 3 призрака с низким CP.'
    },
    badge: '30 Ghost Defeated'
  },
  {
    base: 'Slowpoke-Galarian',
    evolved: 'Slowbro-Galarian',
    category: 'buddy',
    task: { 
      cs: 'Chytit 30 Poison-type Pokémonů jako Buddy (50 Candy)', 
      en: 'Catch 30 Poison-type Pokémon as Buddy (50 Candy)', 
      ja: '相棒にしてどくタイプ30匹捕獲（アメ50個）', 
      ru: 'Поймать 30 Ядовитых покемонов с бадди (50 конфет)' 
    },
    tip: { 
      cs: 'Hledejte Poison Rocket Grunta ("Připrav se na otravu!") nebo lovte v zataženém počasí (Cloudy boost).', 
      en: 'Hunt Poison Rocket Grunts or catch Poison-types during Cloudy in-game weather.',
      ja: 'ロケット団のどくタイプしたっぱや、ゲーム内の曇り（Cloudy）ブースト時に捕獲しましょう。',
      ru: 'Ищите ядовитых пешек Ракеты или ловите в облачную погоду (Cloudy).'
    },
    badge: '30 Poison-type'
  },
  {
    base: 'Slowpoke-Galarian',
    evolved: 'Slowking-Galarian',
    category: 'buddy',
    task: { 
      cs: 'Chytit 30 Psychic-type Pokémonů jako Buddy (50 Candy)', 
      en: 'Catch 30 Psychic-type Pokémon as Buddy (50 Candy)', 
      ja: '相棒にしてエスパータイプ30匹捕獲（アメ50個）', 
      ru: 'Поймать 30 Психических покемонов с бадди (50 конфет)' 
    },
    tip: { 
      cs: 'Využijte větrné počasí (Windy) nebo Psychic Rocket Grunta ("Neviditelná síla").', 
      en: 'Hunt during Windy weather or battle Psychic Rocket Grunts.',
      ja: '強風（Windy）天候やエスパータイプのロケット団したっぱを活用しましょう。',
      ru: 'Ловите в ветреную погоду (Windy) или побеждайте психических пешек Ракеты.'
    },
    badge: '30 Psychic-type'
  },
  {
    base: 'Yamask-Galarian',
    evolved: 'Runerigus',
    category: 'combat',
    task: { 
      cs: 'Zúčastnit se / Vyhrát 10 Raidů jako Buddy (50 Candy)', 
      en: 'Participate in / Win 10 Raids as Buddy (50 Candy)', 
      ja: '相棒にしてレイドバトルに10回参加/勝利（アメ50個）', 
      ru: 'Принять участие / Выиграть 10 рейдов с бадди (50 конфет)' 
    },
    tip: { 
      cs: 'Nemusíte v raidu s Yamaskem bojovat, stačí ho mít jako aktivního Buddyho během raidů!', 
      en: 'Yamask does not need to battle in the raid; simply keep it as your active Buddy while clearing raids.',
      ja: 'デスマスを戦闘に出す必要はありません。相棒にした状態でレイドをクリアすればOKです。',
      ru: 'Yamask не обязательно должен сражаться в рейде, достаточно просто держать его напарником!'
    },
    badge: '10 Raids'
  },
  {
    base: 'Qwilfish-Hisuian',
    evolved: 'Overqwil',
    category: 'combat',
    task: { 
      cs: 'Vyhrát 10 Raidů jako Buddy Pokémon (50 Candy)', 
      en: 'Win 10 Raids as Buddy Pokémon (50 Candy)', 
      ja: '相棒にしてレイドバトルで10回勝利（アメ50個）', 
      ru: 'Выиграть 10 рейдов с бадди (50 конфет)' 
    },
    tip: { 
      cs: 'Ideální splnit během Raid Hour nebo víkendových Raid Day eventů s volnými pasy.', 
      en: 'Best completed during Wednesday Raid Hours or weekend Raid Day events with bonus passes.',
      ja: '水曜レイドアワーやレイドデイイベントの無料パスを使って効率よく達成しましょう。',
      ru: 'Идеально выполнять во время Raid Hour по средам или рейдовых дней.'
    },
    badge: '10 Won Raids'
  },
  {
    base: 'Bisharp',
    evolved: 'Kingambit',
    category: 'combat',
    task: { 
      cs: 'Porazit 15 Dark nebo Steel Pokémonů v Raidech (100 Candy)', 
      en: 'Defeat 15 Dark- or Steel-type Pokémon in Raid Battles (100 Candy)', 
      ja: '相棒にしてレイドで あく/はがね タイプ15匹撃破（アメ100個）', 
      ru: 'Победить 15 Темных/Стальных в рейдах с бадди (100 конфет)' 
    },
    tip: { 
      cs: 'Hledejte 1★–3★ raidy s Dark/Steel bossy (Bisharp, Scizor, Tyranitar, Mawile apod.).', 
      en: 'Target 1★–3★ raids featuring Dark/Steel bosses (Bisharp, Scizor, Tyranitar, Mawile).',
      ja: 'あく/はがねタイプの1★〜3★レイドボスを狙って素早くカウントを稼ぎましょう。',
      ru: 'Ищите рейды 1★–3★ с боссами темного/стального типа.'
    },
    badge: '15 Raid Kills'
  },
  {
    base: 'Kubfu',
    evolved: 'Urshifu',
    category: 'combat',
    task: { 
      cs: 'Porazit 30 Dark (Single Strike) NEBO 30 Water (Rapid Strike) v Raidech/Max Battles', 
      en: 'Defeat 30 Dark (Single Strike) OR 30 Water (Rapid Strike) in Raids/Max Battles', 
      ja: '相棒にしてレイド/マックスバトルであく30匹（いちげき）/みず30匹（れんげき）撃破', 
      ru: 'Победить 30 Dark (Single) ИЛИ 30 Water (Rapid) в рейдах/макс-битвах' 
    },
    tip: { 
      cs: 'Počítají se i Max Battles u Power Spotů! Vyberte si formu podle své PvP/PvE preference.', 
      en: 'Dynamax Max Battles at Power Spots count! Choose your form based on PvP/PvE preference.',
      ja: 'パワースポットのマックスバトルもカウントされます！用途に合わせて進化先を選びましょう。',
      ru: 'Макс-битвы на Power Spot тоже засчитываются! Выбирайте форму под свои нужды.'
    },
    badge: '30 Dark/Water Raids'
  },
  {
    base: 'Swirlix',
    evolved: 'Slurpuff',
    category: 'buddy',
    task: { 
      cs: 'Nakrmit Buddyho 25× Berries / pamlsky (50 Candy)', 
      en: 'Feed your Buddy 25 Berries or Treats (50 Candy)', 
      ja: '相棒におやつ（きのみ/ポフィン）を25個あげる（アメ50個）', 
      ru: 'Скормить бадди 25 ягод/угощений (50 конфет)' 
    },
    tip: { 
      cs: 'Počkejte, až Buddymu klesne hladoměr, nebo krmte po 3 Nanab Berries po vypršení!', 
      en: 'Feed 3 Nanab Berries whenever the hunger meter empties to fast-track all 25 treats.',
      ja: 'お腹が減ったタイミングでナナのみを3個ずつあげることで最短クリア可能です。',
      ru: 'Кормите по 3 ягоды каждый раз, когда напарник проголодается.'
    },
    badge: 'Feed 25 Berries'
  },
  {
    base: 'Spritzee',
    evolved: 'Aromatisse',
    category: 'buddy',
    task: { 
      cs: 'Použít 1× Incense jako Buddy Pokémon (50 Candy)', 
      en: 'Use 1 Incense while set as Buddy (50 Candy)', 
      ja: '相棒にした状態でおこうを1個使用（アメ50個）', 
      ru: 'Использовать 1 ладан (Incense) с бадди (50 конфет)' 
    },
    tip: { 
      cs: 'Plně funguje i bezplatný modrý 15minutový Daily Adventure Incense!', 
      en: 'The free daily 15-minute Daily Adventure Incense fully triggers this requirement!',
      ja: '毎日無料で使える15分間の「おさんぽおこう」でも達成可能です！',
      ru: 'Бесплатный ежедневный 15-минутный Daily Adventure Incense отлично подходит!'
    },
    badge: 'Use 1 Incense'
  },
  {
    base: 'Floette',
    evolved: 'Florges',
    category: 'buddy',
    task: { 
      cs: 'Získat 20 srdíček jako Buddy Pokémon (100 Candy)', 
      en: 'Earn 20 Hearts as Buddy Pokémon (100 Candy)', 
      ja: '相棒にしてハートを20個獲得（アメ100個）', 
      ru: 'Заработать 20 сердец с бадди (100 конфет)' 
    },
    tip: { 
      cs: 'Použijte Poffin pro dvojnásobek srdcí (až 26 srdcí za 1 jediný den)!', 
      en: 'Feed a Poffin to double available hearts (earn up to 26 hearts in a single day)!',
      ja: 'ポフィンを使えば1日で最大26個のハートを獲得できるため即座に進化可能になります！',
      ru: 'Используйте Poffin, чтобы удвоить лимит сердец и выполнить квест за 1 день!'
    },
    badge: '20 Buddy Hearts'
  },
  {
    base: 'Poipole',
    evolved: 'Naganadel',
    category: 'buddy',
    task: { 
      cs: 'Chytit 20 Dragon-type Pokémonů jako Buddy (200 Candy)', 
      en: 'Catch 20 Dragon-type Pokémon as Buddy (200 Candy)', 
      ja: '相棒にしてドラゴンタイプ20匹捕獲（アメ200個）', 
      ru: 'Поймать 20 Драконов с бадди (200 конфет)' 
    },
    tip: { 
      cs: 'Využijte Dragon raid bosse (5★ Legendary), Dragon Rocket Grunta nebo Windy počasí.', 
      en: 'Target Dragon-type Legendary raids, Dragon Rocket Grunts, or Windy weather spawns.',
      ja: '伝説レイドのドラゴンボスやロケット団のドラゴンしたっぱを活用しましょう。',
      ru: 'Ловите в легендарных рейдах или побеждайте пешек Ракеты с драконами.'
    },
    badge: '20 Dragon-type'
  },
  {
    base: 'Pawmo',
    evolved: 'Pawmot',
    category: 'walk',
    task: { 
      cs: 'Ujít 25 km jako Buddy Pokémon (100 Candy)', 
      en: 'Walk 25 km as Buddy Pokémon (100 Candy)', 
      ja: '相棒にして25km歩く（アメ100個）', 
      ru: 'Пройти 25 км с бадди (100 конфет)' 
    },
    tip: { 
      cs: 'Jako Buddyho musíte mít Pawmo (2. vývojovou fázi), nikoliv základního Pawmi!', 
      en: 'Must have Pawmo (Stage 1 evolution) equipped as active Buddy, not basic Pawmi!',
      ja: '進化前のパモではなく、第2形態のパモットを相棒にして歩く必要があります！',
      ru: 'Напарником должен быть именно Pawmo (2-я стадия), а не базовый Pawmi!'
    },
    badge: '25 km Buddy Walk'
  },
  {
    base: 'Feebas',
    evolved: 'Milotic',
    category: 'walk',
    task: { 
      cs: 'Ujít 20 km jako Buddy Pokémon (100 Candy)', 
      en: 'Walk 20 km as Buddy Pokémon (100 Candy)', 
      ja: '相棒にして20km歩く（アメ100個）', 
      ru: 'Пройти 20 км с бадди (100 конфет)' 
    },
    tip: { 
      cs: 'Poffin zkrátí vzdálenost pro sběr Candy na 2.5 km a zrychlí plnění.', 
      en: 'Poffin halves candy-finding distance to 2.5 km while working on the 20 km total.',
      ja: 'ポフィンを使うとアメ獲得距離が2.5kmに半減し効率よくアメも集まります。',
      ru: 'Poffin сократит дистанцию до 2.5 км на конфету.'
    },
    badge: '20 km Buddy Walk'
  },
  {
    base: 'Bramblin',
    evolved: 'Brambleghast',
    category: 'walk',
    task: { 
      cs: 'Ujít 20 km jako Buddy Pokémon (50 Candy)', 
      en: 'Walk 20 km as Buddy Pokémon (50 Candy)', 
      ja: '相棒にして20km歩く（アメ50個）', 
      ru: 'Пройти 20 км с бадди (50 конфет)' 
    },
    tip: { 
      cs: 'Zapněte Adventure Sync v nastavení, aby se kilometry načítaly i při vypnuté aplikaci.', 
      en: 'Enable Adventure Sync in game settings to count background walking distance while app is closed.',
      ja: 'いつでも冒険モード（Adventure Sync）をオンにしておけばアプリを閉じていても距離が稼げます。',
      ru: 'Включите Adventure Sync, чтобы километры засчитывались с выключенной игрой.'
    },
    badge: '20 km Buddy Walk'
  },
  {
    base: 'Rellor',
    evolved: 'Rabsca',
    category: 'walk',
    task: { 
      cs: 'Ujít 24 km jako Buddy Pokémon (50 Candy)', 
      en: 'Walk 24 km as Buddy Pokémon (50 Candy)', 
      ja: '相棒にして24km歩く（アメ50個）', 
      ru: 'Пройти 24 км с бадди (50 конфет)' 
    },
    tip: { 
      cs: 'Nachodíte pohodlně během běžných procházek s aktivním Adventure Sync.', 
      en: 'Easily completed during weekly routine walks with Adventure Sync enabled.',
      ja: '日々の移動でいつでも冒険モードを活用すれば自然とクリアできます。',
      ru: 'Легко выполняется при обычных прогулках с включенным Adventure Sync.'
    },
    badge: '24 km Buddy Walk'
  },
  {
    base: 'Sneasel-Hisuian',
    evolved: 'Sneasler',
    category: 'walk',
    task: { 
      cs: 'Ujít 7 km jako Buddy + Vyvinout VE DNE ☀️ (100 Candy)', 
      en: 'Walk 7 km as Buddy + Evolve during DAYTIME ☀️ (100 Candy)', 
      ja: '相棒にして7km歩く＋「昼」に進化（アメ100個）', 
      ru: 'Пройти 7 км с бадди + эволюция ДНЕМ ☀️ (100 конфет)' 
    },
    tip: { 
      cs: 'V noci se tlačítko evoluce uzamkne. Vyčkejte na denní světlo na herní mapě.', 
      en: 'Evolution button locks during night hours. Evolve when the in-game map is in daylight.',
      ja: '夜間は進化ボタンがロックされます。ゲーム内マップが昼間の時間帯に進化させてください。',
      ru: 'Ночью кнопка эволюции блокируется. Дождитесь дневного света в игре.'
    },
    badge: '7 km + Day ☀️'
  },
  {
    base: 'Snom',
    evolved: 'Frosmoth',
    category: 'walk',
    task: { 
      cs: 'Ujít 10 km jako Buddy + Vyvinout V NOCI 🌙 (400 Candy)', 
      en: 'Walk 10 km as Buddy + Evolve during NIGHTTIME 🌙 (400 Candy)', 
      ja: '相棒にして10km歩く＋「夜」に進化（アメ400個）', 
      ru: 'Пройти 10 км с бадди + эволюция НОЧЬЮ 🌙 (400 конфет)' 
    },
    tip: { 
      cs: 'Vyžaduje 400 Candy — používejte Pinap Berry při chytání a krmte Snoma v Gymech.', 
      en: 'Requires 400 Candy — use Silver/Pinap Berries on wild catches and feed Gym defenders.',
      ja: 'アメ400個が必要です。パイルのみを使って捕獲し、ジム防衛ポケモンにおやつをあげて集めましょう。',
      ru: 'Требуется 400 конфет — ловите с Pinap Berry и кормите в гимах.'
    },
    badge: '10 km + Night 🌙'
  },
  {
    base: 'Woobat',
    evolved: 'Swoobat',
    category: 'walk',
    task: { 
      cs: 'Ujít 1 km jako Buddy Pokémon (50 Candy)', 
      en: 'Walk 1 km as Buddy Pokémon (50 Candy)', 
      ja: '相棒にして1km歩く（アメ50個）', 
      ru: 'Пройти 1 км с бадди (50 конфет)' 
    },
    tip: { 
      cs: 'Nejkratší walking quest ve hře! Stačí 10–12 minut běžné chůze.', 
      en: 'Shortest walking quest in the game! Takes just 10–12 minutes of normal walking.',
      ja: 'ゲーム内で最短の歩行タスクです！10分程度の散歩で即完了します。',
      ru: 'Самый короткий квест на ходьбу в игре! Достаточно 10 минут прогулки.'
    },
    badge: '1 km Buddy Walk'
  },
  {
    base: 'Happiny',
    evolved: 'Chansey',
    category: 'walk',
    task: { 
      cs: 'Ujít 15 km jako Buddy Pokémon (25 Candy)', 
      en: 'Walk 15 km as Buddy Pokémon (25 Candy)', 
      ja: '相棒にして15km歩く（アメ25個）', 
      ru: 'Пройти 15 км с бадди (25 конфет)' 
    },
    tip: { 
      cs: 'Platí i pro miminka Bonsly a Mime Jr. (15 km buddy walk).', 
      en: 'Baby Pokémon Bonsly & Mime Jr. share the identical 15 km walking requirement.',
      ja: 'ウソハチやマネネなどのベイビィポケモンも同様に15kmの相棒歩行が必要です。',
      ru: 'Для малышей Bonsly и Mime Jr. действует аналогичное требование в 15 км.'
    },
    badge: '15 km Baby Walk'
  },
  {
    base: 'Bonsly',
    evolved: 'Sudowoodo',
    category: 'walk',
    task: { 
      cs: 'Ujít 15 km jako Buddy Pokémon (50 Candy)', 
      en: 'Walk 15 km as Buddy Pokémon (50 Candy)', 
      ja: '相棒にして15km歩く（アメ50個）', 
      ru: 'Пройти 15 км с бадди (50 конфет)' 
    },
    tip: { 
      cs: 'Baby Pokémon z vajec – vyžaduje nachození 15 km jako aktivní Buddy před odemčením tlačítka Evolve.', 
      en: 'Baby Pokémon hatched from eggs — requires 15 km of buddy walking to unlock evolution.',
      ja: 'タマゴ孵化のベイビィポケモン。進化ボタン解放には相棒として15km歩く必要があります。',
      ru: 'Малыш из яйца — требует пройти 15 км в качестве напарника для разблокировки эволюции.'
    },
    badge: '15 km Baby Walk'
  },
  {
    base: 'Mime Jr.',
    evolved: 'Mr. Mime',
    category: 'walk',
    task: { 
      cs: 'Ujít 15 km jako Buddy Pokémon (50 Candy)', 
      en: 'Walk 15 km as Buddy Pokémon (50 Candy)', 
      ja: '相棒にして15km歩く（アメ50個）', 
      ru: 'Пройти 15 км с бадди (50 конфет)' 
    },
    tip: { 
      cs: 'Evropský regionální baby Pokémon z 5km vajec – vyžaduje 15 km chůze s buddym před evolucí.', 
      en: 'European regional baby Pokémon from 5km eggs — requires walking 15 km as buddy to evolve.',
      ja: '欧州限定タマゴから生まれるベイビィポケモン。進化には相棒歩行15kmが必要です。',
      ru: 'Европейский региональный малыш из 5км яиц — требует пройти 15 км с напарником.'
    },
    badge: '15 km Baby Walk'
  },
  {
    base: 'Eevee',
    evolved: 'Espeon',
    category: 'walk',
    task: { 
      cs: 'Ujít 10 km jako Buddy + Vyvinout VE DNE ☀️ jako Buddy (25 Candy)', 
      en: 'Walk 10 km as Buddy + Evolve during DAYTIME ☀️ while set as Buddy (25 Candy)', 
      ja: '相棒にして10km歩く＋相棒のまま「昼」に進化（アメ25個）', 
      ru: 'Пройти 10 км с бадди + эволюция ДНЕМ ☀️, оставаясь напарником (25 конфет)' 
    },
    tip: { 
      cs: 'POZOR: Po 10 km nesundávejte Eevee z pozice Buddyho! Tlačítko musí ukazovat siluetu Espeona. Name trick: Sakura.', 
      en: 'CRITICAL: Keep Eevee as active Buddy when evolving! Silhouette must show Espeon. Name trick: Sakura.',
      ja: '注意：10km歩いた後、相棒を解除せずに進化させてください（シルエット確認必須）。裏技名：Sakura',
      ru: 'ВАЖНО: Не снимайте Eevee с напарника! Кнопка должна показывать силуэт Espeon. Трюк с именем: Sakura.'
    },
    badge: '10 km + Day ☀️'
  },
  {
    base: 'Eevee',
    evolved: 'Umbreon',
    category: 'walk',
    task: { 
      cs: 'Ujít 10 km jako Buddy + Vyvinout V NOCI 🌙 jako Buddy (25 Candy)', 
      en: 'Walk 10 km as Buddy + Evolve during NIGHTTIME 🌙 while set as Buddy (25 Candy)', 
      ja: '相棒にして10km歩く＋相棒のまま「夜」に進化（アメ25個）', 
      ru: 'Пройти 10 км с бадди + эволюция НОЧЬЮ 🌙, оставаясь напарником (25 конфет)' 
    },
    tip: { 
      cs: 'POZOR: Vyvíjejte v noci na herní mapě a nevyměňujte Buddyho. Tlačítko musí ukazovat siluetu Umbreona. Name trick: Tamao.', 
      en: 'CRITICAL: Evolve at night in-game while still active Buddy. Silhouette must show Umbreon. Name trick: Tamao.',
      ja: '注意：夜間のマップで相棒のまま進化させてください（シルエット確認必須）。裏技名：Tamao',
      ru: 'ВАЖНО: Эволюционируйте ночью в игре, не снимая с напарника. Силуэт должен быть Umbreon. Трюк с именем: Tamao.'
    },
    badge: '10 km + Night 🌙'
  },
  {
    base: 'Eevee',
    evolved: 'Sylveon',
    category: 'buddy',
    task: { 
      cs: 'Získat 70 srdíček jako Buddy Pokémon (25 Candy)', 
      en: 'Earn 70 Hearts as Buddy Pokémon (25 Candy)', 
      ja: '相棒にしてハートを70個獲得（アメ25個）', 
      ru: 'Заработать 70 сердец с напарником (25 конфет)' 
    },
    tip: { 
      cs: 'Použijte Poffin pro zisk až 26 srdcí za jeden den. Jednorázový Name Trick: přejmenujte Eevee na "Kira"!', 
      en: 'Feed Poffins to earn up to 26 hearts per day. One-time Name Trick: rename Eevee to "Kira"!',
      ja: 'ポフィンを使えば1日最大26個獲得可能。初回限定裏技名：「Kira」に改名！',
      ru: 'Используйте Poffin для получения до 26 сердец в день. Имя раз в жизни: "Kira"!'
    },
    badge: '70 Buddy Hearts'
  },
  {
    base: 'Inkay',
    evolved: 'Malamar',
    category: 'special',
    task: { 
      cs: 'Otočit telefon fyzicky vzhůru nohama 🙃 (50 Candy)', 
      en: 'Turn phone physically upside down 🙃 (50 Candy)', 
      ja: '端末を逆さまにして進化ボタンを押す（アメ50個）', 
      ru: 'Перевернуть телефон вверх ногами 🙃 (50 конфет)' 
    },
    tip: { 
      cs: 'Vypněte zámek otáčení obrazovky (Screen Rotation Lock) v telefonu, aby gyroskop detekoval polohu.', 
      en: 'Ensure Screen Rotation Lock is turned off so your phone gyroscope detects the upside down angle.',
      ja: '端末の画面回転ロックを解除し、ジャイロセンサーが機能していることを確認してください。',
      ru: 'Отключите блокировку поворота экрана, чтобы гироскоп зафиксировал перевёрнутое положение.'
    },
    badge: 'Gyro Invert 🙃'
  },
  {
    base: 'Ursaring',
    evolved: 'Ursaluna',
    category: 'special',
    task: { 
      cs: '100 Candy během astronomického Úplňku 🌕', 
      en: '100 Candy during real-world Full Moon night 🌕', 
      ja: '現実の満月の夜に進化ボタンが解禁（アメ100個）', 
      ru: '100 конфет во время реального полнолуния 🌕' 
    },
    tip: { 
      cs: 'Hra se synchronizuje s reálným astronomickým kalendářem. Sledujte noční oblohu ve hře.', 
      en: 'Synchronizes with real astronomical lunar calendars.',
      ja: '現実の天文学的月齢カレンダーと同期しています。ゲーム内の夜空をチェックしましょう。',
      ru: 'Синхронизируется с реальным астрономическим лунным календарём. Следите за ночным небом в игре.'
    },
    badge: 'Full Moon 🌕'
  },
  {
    base: 'Sliggoo',
    evolved: 'Goodra',
    category: 'special',
    task: { 
      cs: 'Během deště 🌧️ NEBO v dosahu Rainy Lure Modulu (100 Candy)', 
      en: 'During in-game Rain 🌧️ OR near active Rainy Lure Module (100 Candy)', 
      ja: '雨天時またはレイニールアーの近くで進化（アメ100個）', 
      ru: 'Во время дождя 🌧️ ИЛИ у Rainy Lure (100 конфет)' 
    },
    tip: { 
      cs: 'Aktivujte modrý Rainy Lure Modul na libovolném PokéStopu pro okamžitou evoluci bez čekání na déšť.', 
      en: 'Drop a Rainy Lure Module on any PokéStop to unlock the evolution instantly.',
      ja: 'ポケストップにレイニールアーを使用すれば天候に関係なく即座に進化できます。',
      ru: 'Установите модуль Rainy Lure на любой покестоп для мгновенной эволюции.'
    },
    badge: 'Rain / Rainy Lure 🌧️'
  },
  {
    base: 'Cosmoem',
    evolved: 'Solgaleo',
    category: 'special',
    task: { 
      cs: 'Vyvinout VE DNE ☀️ (Solgaleo) NEBO V NOCI 🌙 (Lunala) + 100 Candy', 
      en: 'Evolve during DAYTIME ☀️ (Solgaleo) OR NIGHTTIME 🌙 (Lunala) + 100 Candy', 
      ja: '昼間に進化 ☀️（ソルガレオ）/ 夜間に進化 🌙（ルナアーラ）＋アメ100個', 
      ru: 'Эволюция ДНЕМ ☀️ (Solgaleo) ИЛИ НОЧЬЮ 🌙 (Lunala) + 100 конфет' 
    },
    tip: { 
      cs: 'Obě legendy mají prvotřídní Fusion formy s Necrozmou (Dusk Mane & Dawn Wings)!', 
      en: 'Both legendaries form the top-tier Necrozma fusions (Dusk Mane & Dawn Wings)!',
      ja: 'どちらもネクロズマとの合体（日食/月食ネクロズマ）で最強クラスのアタッカーになります！',
      ru: 'Обе легенды создают мощнейшие формы слияния с Necrozma (Dusk Mane / Dawn Wings)!'
    },
    badge: 'Day ☀️ / Night 🌙'
  },
  {
    base: 'Rockruff',
    evolved: 'Lycanroc',
    category: 'special',
    task: { 
      cs: 'Midday (Den ☀️), Midnight (Noc 🌙), Dusk (17:00–19:00 u Dusk Rockruffa)', 
      en: 'Midday (Day ☀️), Midnight (Night 🌙), Dusk Form (17:00–19:00 local with Dusk Rockruff)', 
      ja: 'まひる（昼 ☀️）、まよなか（夜 🌙）、たそがれ（17:00〜19:00・限定個体）', 
      ru: 'Midday (день ☀️), Midnight (ночь 🌙), Dusk (17:00–19:00 у Dusk Rockruff)' 
    },
    tip: { 
      cs: 'Dusk Form Lycanroca lze vyvinout pouze ze speciálního Rockruffa (z vajec / raidů) s ikonou západu slunce.', 
      en: 'Dusk Form Lycanroc requires a specific Dusk-capable Rockruff hatched or caught from raids.',
      ja: 'たそがれのすがたは、夕暮れアイコンが付いた特別なイワンコからのみ進化可能です。',
      ru: 'Форма Dusk доступна только у специального Rockruff со значком заката.'
    },
    badge: 'Lycanroc Forms'
  },
  {
    base: 'Tyrogue',
    evolved: 'Hitmonlee',
    category: 'special',
    task: { 
      cs: 'Nejvyšší IV Attack ➔ Hitmonlee, Defense ➔ Hitmonchan, HP ➔ Hitmontop (25 Candy)', 
      en: 'Highest IV Attack ➔ Hitmonlee, Defense ➔ Hitmonchan, HP ➔ Hitmontop (25 Candy)', 
      ja: '最高個体値が 攻撃 ➔ サワムラー、防御 ➔ エビワラー、HP ➔ カポエラー（アメ25個）', 
      ru: 'Макс. IV: Атака ➔ Hitmonlee, Защита ➔ Hitmonchan, HP ➔ Hitmontop (25 конфет)' 
    },
    tip: { 
      cs: 'Před evolucí použijte funkci Appraise (Ohodnotit). Při shodě více max statů je vývoj náhodný (50/50).', 
      en: 'Appraise IVs first. If highest stats are tied, the evolution outcome is 50/50 random.',
      ja: '進化前に必ず「鑑定」でステータスを確認しましょう。最高値が同じ場合はランダム判定になります。',
      ru: 'Проверьте оценку покемона (Appraise) перед эволюцией. При равенстве статов шанс 50/50.'
    },
    badge: 'IV Appraise Rule'
  },
  {
    base: 'Gimmighoul-Roaming',
    evolved: 'Gholdengo',
    category: 'special',
    task: { 
      cs: 'Nasbírat 999 Gimmighoul Coins + 100 Gimmighoul Candy', 
      en: 'Collect 999 Gimmighoul Coins + 100 Gimmighoul Candy', 
      ja: '「コレクレーのコイン」を999枚集める＋アメ100個', 
      ru: 'Собрать 999 Gimmighoul Coins + 100 конфет' 
    },
    tip: { 
      cs: 'Propojte hru s Nintendo Switch (Pokémon Scarlet/Violet) pro Coin Bag a Golden Lure Moduly.', 
      en: 'Connect Pokémon GO with Nintendo Switch (Scarlet/Violet) to receive the Coin Bag and Golden Lures.',
      ja: 'ニンテンドースイッチ（スカーレット/バイオレット）と連携して「だいじなたからばこ」とおうごんルアーを使いましょう。',
      ru: 'Подключите игру к Nintendo Switch для получения мешка с монетами и Golden Lure.'
    },
    badge: '999 Coins 🪙'
  },
  {
    base: 'Eevee',
    evolved: 'Vaporeon',
    category: 'special',
    task: { 
      cs: 'Náhodná 33% evoluce na Vaporeona, Jolteona nebo Flareona (25 Candy)', 
      en: 'Random 33% chance to evolve into Vaporeon, Jolteon, or Flareon (25 Candy)', 
      ja: 'シャワーズ、サンダース、ブースターへ各33%のランダム進化（アメ25個）', 
      ru: 'Случайный шанс 33% эволюции в Vaporeon, Jolteon или Flareon (25 конфет)' 
    },
    tip: { 
      cs: 'Tlačítko Evolve ukazuje otazník (?). Jednorázové Name Triky: Rainer (Vaporeon), Sparky (Jolteon), Pyro (Flareon).', 
      en: 'Evolve button displays a question mark (?). One-time Name Tricks: Rainer (Vaporeon), Sparky (Jolteon), Pyro (Flareon).', 
      ja: '進化ボタンには「？」が表示されます。初回限定裏技名：Rainer（シャワーズ）、Sparky（サンダース）、Pyro（ブースター）', 
      ru: 'Кнопка эволюции показывает знак вопроса (?). Одноразовые имена: Rainer (Vaporeon), Sparky (Jolteon), Pyro (Flareon).' 
    },
    badge: '33% Random Trio'
  },
  {
    base: 'Tyrunt',
    evolved: 'Tyrantrum',
    category: 'special',
    task: { 
      cs: 'Vyvinout VE DNE ☀️ (50 Candy)', 
      en: 'Evolve during DAYTIME ☀️ (50 Candy)', 
      ja: '「昼」に進化（アメ50個）', 
      ru: 'Эволюция ДНЕМ ☀️ (50 конфет)' 
    },
    tip: { 
      cs: 'Fosilní dinosaurus vyžaduje denní světlo na herní mapě. V noci je tlačítko evoluce uzamčené.', 
      en: 'Fossil Pokémon requiring in-game daylight. Evolution button is locked at night.', 
      ja: 'カセキポケモン。日中のゲーム内マップでのみ進化ボタンが押せます。', 
      ru: 'Ископаемый покемон, требующий дневного света в игре. Ночью кнопка заблокирована.' 
    },
    badge: 'Daytime ☀️'
  },
  {
    base: 'Amaura',
    evolved: 'Aurorus',
    category: 'special',
    task: { 
      cs: 'Vyvinout V NOCI 🌙 (50 Candy)', 
      en: 'Evolve during NIGHTTIME 🌙 (50 Candy)', 
      ja: '「夜」に進化（アメ50個）', 
      ru: 'Эволюция НОЧЬЮ 🌙 (50 конфет)' 
    },
    tip: { 
      cs: 'Fosilní Pokémon polární záře vyžaduje noční oblohu ve hře. Ve dne je tlačítko evoluce neaktivní.', 
      en: 'Aurora fossil Pokémon requiring in-game nighttime sky. Inactive during daylight.', 
      ja: 'オーロラをまとうカセキポケモン。夜間のゲーム内マップでのみ進化可能です。', 
      ru: 'Ископаемый покемон северного сияния — требует ночного неба в игре.' 
    },
    badge: 'Nighttime 🌙'
  },
  {
    base: 'Yungoos',
    evolved: 'Gumshoos',
    category: 'special',
    task: { 
      cs: 'Vyvinout VE DNE ☀️ (50 Candy)', 
      en: 'Evolve during DAYTIME ☀️ (50 Candy)', 
      ja: '「昼」に進化（アメ50個）', 
      ru: 'Эволюция ДНЕМ ☀️ (50 конфет)' 
    },
    tip: { 
      cs: 'Vyžaduje denní světlo na herní mapě. Klíčový Pokémon pro zkompletování Alola Pokédexu.', 
      en: 'Requires in-game daylight. Essential for completing the Alola Pokédex.', 
      ja: 'ゲーム内の昼間にのみ進化可能。アローラ図鑑のコンプリートに必須です。', 
      ru: 'Требует дневного света в игре. Необходим для завершения Алола Покедекса.' 
    },
    badge: 'Daytime ☀️'
  },
  {
    base: 'Fomantis',
    evolved: 'Lurantis',
    category: 'special',
    task: { 
      cs: 'Vyvinout VE DNE ☀️ (50 Candy)', 
      en: 'Evolve during DAYTIME ☀️ (50 Candy)', 
      ja: '「昼」に進化（アメ50個）', 
      ru: 'Эволюция ДНЕМ ☀️ (50 конфет)' 
    },
    tip: { 
      cs: 'Solární travní Pokémon – evoluce se odemkne výhradně během denních hodin.', 
      en: 'Solar Grass-type Pokémon — evolution unlocks exclusively during daylight hours.', 
      ja: '太陽の光を好む草ポケモン。昼間の時間帯にのみ進化ボタンが有効になります。', 
      ru: 'Солнечный травяной покемон — эволюция разблокируется только в дневное время.' 
    },
    badge: 'Daytime ☀️'
  },
  {
    base: 'Wurmple',
    evolved: 'Silcoon',
    category: 'special',
    task: { 
      cs: 'Náhodná 50/50 evoluce na Silcoona (Beautifly) nebo Cascoona (Dustox) (12 Candy)', 
      en: 'Random 50/50 evolution into Silcoon (Beautifly) or Cascoon (Dustox) (12 Candy)', 
      ja: 'カラサリス（アゲハント）またはマユルド（ドクケイル）へ50/50のランダム進化（アメ12個）', 
      ru: 'Случайная эволюция 50/50 в Silcoon (Beautifly) или Cascoon (Dustox) (12 конфет)' 
    },
    tip: { 
      cs: 'Výsledek je určen skrytou hodnotou (personality value) a nelze jej ovlivnit pohlavím ani počasím. Tlačítko ukazuje otazník (?).', 
      en: 'Outcome is completely determined by internal server value and cannot be influenced. Shows a question mark (?).', 
      ja: '内部の性格値によって決まるため性別や天候で操作はできません。ボタンには「？」が表示されます。', 
      ru: 'Результат определяется скрытым серверным параметром и не зависит от пола или погоды. Кнопка показывает (?).' 
    },
    badge: '50/50 Random'
  },
  {
    base: 'Clamperl',
    evolved: 'Huntail',
    category: 'special',
    task: { 
      cs: 'Náhodná 50/50 evoluce na Huntaila nebo Gorebyss (50 Candy)', 
      en: 'Random 50/50 evolution into Huntail or Gorebyss (50 Candy)', 
      ja: 'ハンテールまたはサクラビスへ50/50のランダム進化（アメ50個）', 
      ru: 'Случайная эволюция 50/50 в Huntail или Gorebyss (50 конфет)' 
    },
    tip: { 
      cs: 'Stejně jako u Wurmple je výsledek 100% náhodný. Tlačítko Evolve zobrazuje otazník (?).', 
      en: 'Like Wurmple, outcome is strictly 50/50 random. The Evolve button displays a question mark (?).', 
      ja: 'ケムッソ同様に50%ずつの完全ランダム進化です。進化ボタンには「？」が表示されます。', 
      ru: 'Как и у Wurmple, результат строго случаен 50/50. Кнопка эволюции показывает знак вопроса (?).' 
    },
    badge: '50/50 Random'
  },
  {
    base: 'Kadabra',
    evolved: 'Alakazam',
    category: 'trade',
    task: {
      cs: '0 Candy po výměně s jiným hráčem (normálně 100 Candy)',
      en: '0 Candy cost after trading with another trainer (normally 100 Candy)',
      ja: '交換後にアメ０個で進化可能（通常アメ100個）',
      ru: '0 конфет после обмена (обычно 100 конфет)'
    },
    tip: {
      cs: 'Jeden z nejlepších psychických útočníků. Vyměňte přebytečné Abry z Community Day.',
      en: 'One of the most powerful Psychic attackers. Trade excess Abras from Community Day.',
      ja: '強力なエスパータイプのアタッカー。コミュニティ・デイで余ったケーシィを交換しましょう。',
      ru: 'Один из самых мощных психических атакующих. Обменивайте лишних Абр с Community Day.'
    },
    badge: '0 Candy Trade'
  },
  {
    base: 'Machoke',
    evolved: 'Machamp',
    category: 'trade',
    task: {
      cs: '0 Candy po výměně s jiným hráčem (normálně 100 Candy)',
      en: '0 Candy cost after trading with another trainer (normally 100 Candy)',
      ja: '交換後にアメ０個で進化可能（通常アメ100個）',
      ru: '0 конфет после обмена (обычно 100 конфет)'
    },
    tip: {
      cs: 'Špičkový bojový PvE útočník. Machop je velmi běžný – ušetřete Candy výměnou.',
      en: 'Top Fighting-type PvE attacker. Machop is very common — save Candy by trading.',
      ja: 'PvEでトップクラスのかくとうタイプアタッカー。ワンリキーはよく出現するので、交換でアメを節約しましょう。',
      ru: 'Лучший боевой PvE атакующий. Мачоп очень распространен — экономьте конфеты обменом.'
    },
    badge: '0 Candy Trade'
  },
  {
    base: 'Graveler',
    evolved: 'Golem',
    category: 'trade',
    task: {
      cs: '0 Candy po výměně s jiným hráčem (normálně 100 Candy)',
      en: '0 Candy cost after trading with another trainer (normally 100 Candy)',
      ja: '交換後にアメ０個で進化可能（通常アメ100個）',
      ru: '0 конфет после обмена (обычно 100 конфет)'
    },
    tip: {
      cs: 'Solidní kamenný útočník po výměně.',
      en: 'Solid Rock-type attacker after trade.',
      ja: '交換後の優秀ないわタイプアタッカー。',
      ru: 'Надежный каменный атакующий после обмена.'
    },
    badge: '0 Candy Trade'
  },
  {
    base: 'Haunter',
    evolved: 'Gengar',
    category: 'trade',
    task: {
      cs: '0 Candy po výměně s jiným hráčem (normálně 100 Candy)',
      en: '0 Candy cost after trading with another trainer (normally 100 Candy)',
      ja: '交換後にアメ０個で進化可能（通常アメ100個）',
      ru: '0 конфет после обмена (обычно 100 конфет)'
    },
    tip: {
      cs: 'Elitní duchový/jedový útočník, obzvláště s útokem Shadow Claw.',
      en: 'Elite Ghost/Poison attacker, especially with Shadow Claw legacy move.',
      ja: 'エリートゴースト/どくタイプアタッカー。特に特別なわざ「シャドークロー」が強力。',
      ru: 'Элитный призрачный/ядовитый атакующий, особенно с легаси-атакой Shadow Claw.'
    },
    badge: '0 Candy Trade'
  },
  {
    base: 'Boldore',
    evolved: 'Gigalith',
    category: 'trade',
    task: {
      cs: '0 Candy po výměně s jiným hráčem (normálně 200 Candy)',
      en: '0 Candy cost after trading with another trainer (normally 200 Candy)',
      ja: '交換後にアメ０個で進化可能（通常アメ200個）',
      ru: '0 конфет после обмена (обычно 200 конфет)'
    },
    tip: {
      cs: 'Solidní kamenný útočník po výměně.',
      en: 'Solid Rock-type attacker after trade.',
      ja: '交換後に優秀ないわタイプアタッカーとして活躍します。',
      ru: 'Надежный каменный атакующий после обмена.'
    },
    badge: '0 Candy Trade'
  },
  {
    base: 'Gurdurr',
    evolved: 'Conkeldurr',
    category: 'trade',
    task: {
      cs: '0 Candy po výměně s jiným hráčem (normálně 200 Candy)',
      en: '0 Candy cost after trading with another trainer (normally 200 Candy)',
      ja: '交換後にアメ０個で進化可能（通常アメ200個）',
      ru: '0 конфет после обмена (обычно 200 конфет)'
    },
    tip: {
      cs: 'Nejlepší bojový útočník konkurující Machampovi.',
      en: 'Best Fighting-type DPS rivaling Machamp.',
      ja: 'カイリキーに匹敵する最高のかくとうタイプDPSアタッカー。',
      ru: 'Лучший боевой DPS, соперничающий с Мачампом.'
    },
    badge: '0 Candy Trade'
  },
  {
    base: 'Karrablast',
    evolved: 'Escavalier',
    category: 'trade',
    task: {
      cs: '0 Candy po výměně s jiným hráčem (normálně 200 Candy)',
      en: '0 Candy cost after trading with another trainer (normally 200 Candy)',
      ja: '交換後にアメ０個で進化可能（通常アメ200個）',
      ru: '0 конфет после обмена (обычно 200 конфет)'
    },
    tip: {
      cs: 'Inspirováno mechanikou výměny z původních her.',
      en: 'Inspired by original games\' trade evolution mechanic.',
      ja: '原作ゲームの交換進化の仕組みに基づいています。',
      ru: 'Вдохновлено механикой эволюции через обмен из оригинальных игр.'
    },
    badge: '0 Candy Trade'
  },
  {
    base: 'Shelmet',
    evolved: 'Accelgor',
    category: 'trade',
    task: {
      cs: '0 Candy po výměně s jiným hráčem (normálně 200 Candy)',
      en: '0 Candy cost after trading with another trainer (normally 200 Candy)',
      ja: '交換後にアメ０個で進化可能（通常アメ200個）',
      ru: '0 конфет после обмена (обычно 200 конфет)'
    },
    tip: {
      cs: 'Inspirováno mechanikou výměny z původních her.',
      en: 'Inspired by original games\' trade evolution mechanic.',
      ja: '原作ゲームの交換進化の仕組みに基づいています。',
      ru: 'Вдохновлено механикой эволюции через обмен из оригинальных игр.'
    },
    badge: '0 Candy Trade'
  },
  {
    base: 'Phantump',
    evolved: 'Trevenant',
    category: 'trade',
    task: {
      cs: '0 Candy po výměně s jiným hráčem (normálně 200 Candy)',
      en: '0 Candy cost after trading with another trainer (normally 200 Candy)',
      ja: '交換後にアメ０個で進化可能（通常アメ200個）',
      ru: '0 конфет после обмена (обычно 200 конфет)'
    },
    tip: {
      cs: 'Skvělá volba pro PvP Great League.',
      en: 'Great PvP pick for Great League.',
      ja: 'PvPのスーパーリーグで非常に優秀なポケモンです。',
      ru: 'Отличный выбор для PvP Great League.'
    },
    badge: '0 Candy Trade'
  },
  {
    base: 'Pumpkaboo',
    evolved: 'Gourgeist',
    category: 'trade',
    task: {
      cs: '0 Candy po výměně s jiným hráčem (normálně 200 Candy)',
      en: '0 Candy cost after trading with another trainer (normally 200 Candy)',
      ja: '交換後にアメ０個で進化可能（通常アメ200個）',
      ru: '0 конфет после обмена (обычно 200 конфет)'
    },
    tip: {
      cs: 'Více velikostních forem, všechny profitují z vývoje za 0 Candy po výměně.',
      en: 'Multiple size forms, all benefit from 0-Candy trade evolution.',
      ja: '複数のサイズがあり、すべてが交換によるアメ０個進化の恩恵を受けます。',
      ru: 'Несколько размеров, и все получают выгоду от эволюции за 0 конфет после обмена.'
    },
    badge: '0 Candy Trade'
  }
];

export const EvolutionQuestsInteractiveWidget: React.FC<EvolutionQuestsInteractiveWidgetProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredQuests = useMemo(() => {
    return EVOLUTION_QUEST_ITEMS.filter(q => {
      if (activeCategory !== 'all' && q.category !== activeCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const qLower = searchQuery.toLowerCase();
      const baseMatch = q.base.toLowerCase().includes(qLower);
      const evolvedMatch = q.evolved.toLowerCase().includes(qLower);
      const taskMatch = (q.task[lang] || q.task.en || '').toLowerCase().includes(qLower);
      return baseMatch || evolvedMatch || taskMatch;
    });
  }, [activeCategory, searchQuery, lang]);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  return (
    <div className="evolution-quests-widget-container">
      {/* Hero Header */}
      <div className="evo-widget-hero-header">
        <div className="evo-hero-title-group">
          <div className="evo-badge-pill">
            <Sparkles size={16} />
            <span>EVOLUTION QUEST ENCYCLOPEDIA</span>
          </div>
          <h2>
            {lang === 'cs' ? 'Všechny Speciální Evolve Questy v Pokémon GO' :
             lang === 'ja' ? '全特殊進化タスク・相棒クエスト完全攻略データベース' :
             lang === 'ru' ? 'Все спец-квесты на эволюцию в Pokémon GO' :
             'All Special Evolution Quests & Buddy Tasks Database'}
          </h2>
          <p>
            {lang === 'cs' ? 'Návod jak vyvinout Farfetch\'da, Annihilape, Armarouge, Runeriguse a další. Trik s Blanche v Master League pro 30 killů za 3 minuty!' :
             lang === 'ja' ? 'カモネギ、コノヨザル、グレンアルマ、デスバーン等の特殊進化条件一覧。対戦メタグロス狩りによる高速達成裏技も収録。' :
             lang === 'ru' ? 'Гайд по эволюции Farfetch\'d, Annihilape, Armarouge, Runerigus и др. Трюк с Бланш в Master League для 30 побед за 3 минуты!' :
             'Complete requirements for Farfetch\'d, Annihilape, Armarouge, Runerigus & more, plus the Blanche Master League 3-minute farming trick.'}
          </p>
        </div>

        {/* Quick Blanche Trick Highlight Banner */}
        <div className="blanche-trick-banner">
          <Zap size={20} color="#facc15" />
          <div className="banner-text">
            <strong>
              {lang === 'cs' ? '⚡ BLANCHE MASTER LEAGUE RYCHLÝ TRIK (Annihilape / Armarouge):' :
               lang === 'ja' ? '⚡ ブランシェ特訓高速裏技（コノヨザル／グレンアルマ）：' :
               lang === 'ru' ? '⚡ ТРЮК С БЛАНШ В MASTER LEAGUE (Annihilape / Armarouge):' :
               '⚡ BLANCHE MASTER LEAGUE KILL TRICK (Annihilape / Armarouge):'}
            </strong>
            <span>
              {lang === 'cs' 
                ? 'V menu Battle zvolte dole Training proti Blanche v Master League. Její první Pokémon je Metagross (Psychic). Poražte Metagrosse a okamžitě dejte Top Left -> Surrender. Každý kill se započítá za 15 sekund!'
                : 'In the Battle menu, select Training vs Team Leader Blanche in Master League. Her lead is Metagross (Psychic). Defeat Metagross, then immediately tap Surrender. Farms all 30 kills in under 4 minutes!'}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="evo-card-panel">
        <div className="search-and-filters-row">
          <div className="evo-search-input-wrap">
            <Search size={18} color="#94a3b8" />
            <input 
              type="text" 
              placeholder={lang === 'cs' ? 'Hledat pokémona nebo úkol (např. Annihilape, Excellent, 30...)' : 'Search species or task (e.g. Annihilape, Excellent, 30...)'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="evo-search-input"
            />
          </div>

          <div className="evo-category-tabs">
            <button 
              type="button"
              className={`evo-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              {lang === 'cs' ? 'Všechny' : 'All'}
            </button>
            <button 
              type="button"
              className={`evo-tab-btn ${activeCategory === 'buddy' ? 'active' : ''}`}
              onClick={() => setActiveCategory('buddy')}
            >
              <span>🎯 Buddy</span>
            </button>
            <button 
              type="button"
              className={`evo-tab-btn ${activeCategory === 'combat' ? 'active' : ''}`}
              onClick={() => setActiveCategory('combat')}
            >
              <span>⚔️ Bitvy</span>
            </button>
            <button 
              type="button"
              className={`evo-tab-btn ${activeCategory === 'walk' ? 'active' : ''}`}
              onClick={() => setActiveCategory('walk')}
            >
              <span>👟 Chůze</span>
            </button>
            <button 
              type="button"
              className={`evo-tab-btn ${activeCategory === 'special' ? 'active' : ''}`}
              onClick={() => setActiveCategory('special')}
            >
              <span>🌀 Speciální</span>
            </button>
            <button 
              type="button"
              className={`evo-tab-btn ${activeCategory === 'trade' ? 'active' : ''}`}
              onClick={() => setActiveCategory('trade')}
            >
              <span>🔄 Trade</span>
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count-bar">
          <span>{lang === 'cs' ? `Zobrazeno ${filteredQuests.length} speciálních evolucí` : `Showing ${filteredQuests.length} evolution quests`}</span>
        </div>

        {/* Quests Grid */}
        <div className="guide-evolution-grid">
          {filteredQuests.map((item, idx) => (
            <div key={idx} className="guide-evolution-card">
              <div className="evolution-card-top">
                <div className="evolution-sprite-deck">
                  <div className="pokemon-avatar-box">
                    <img 
                      src={getPokemonIconUrl(item.base)} 
                      alt={item.base} 
                      className="evolution-avatar-img"
                      onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, item.base)}
                      loading="lazy"
                    />
                    <span className="evolution-avatar-name">
                      {item.base.replace('-Galarian', ' (Galarian)').replace('-Hisuian', ' (Hisuian)').replace('-Roaming', '')}
                    </span>
                  </div>

                  <div className="evolution-arrow-badge">
                    <span className="arrow-sym">➔</span>
                    <span className="req-pill">{item.badge}</span>
                  </div>

                  <div className="pokemon-avatar-box">
                    <img 
                      src={getPokemonIconUrl(item.evolved)} 
                      alt={item.evolved} 
                      className="evolution-avatar-img"
                      onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, item.evolved)}
                      loading="lazy"
                    />
                    <span className="evolution-avatar-name">
                      {item.evolved.replace('-Galarian', ' (Galarian)').replace('-Hisuian', ' (Hisuian)')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="evolution-card-body">
                <div className="quest-task-line">
                  <CheckCircle2 size={16} color="#10b981" />
                  <strong>{item.task[lang] || item.task.en}</strong>
                </div>
                {item.tip && (
                  <div className="quest-pro-tip">
                    <Lightbulb size={14} color="#eab308" />
                    <span>{item.tip[lang] || item.tip.en}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1-Click Search Operators */}
      <div className="evo-card-panel">
        <div className="panel-title-bar">
          <Copy size={20} color="#facc15" />
          <h3>
            {lang === 'cs' ? 'Vyhledávací Filtry pro Rychlou Správu v Batohu' :
             lang === 'ja' ? '特殊進化・交換進化用検索コマンド' :
             lang === 'ru' ? 'Поисковые фильтры для эволюций' :
             'One-Click Evolution Search Strings'}
          </h3>
        </div>

        <div className="evo-searches-grid">
          <div className="search-code-card">
            <div className="search-meta">
              <strong>tradeevolve</strong>
              <span>{lang === 'cs' ? 'Všichni Pokémoni, kteří mají po výměně evoluci za 0 Candy' : 'All Pokémon with 0 Candy evolution cost after trading'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy('tradeevolve', 'tradeevolve')}
            >
              {copiedKey === 'tradeevolve' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'tradeevolve' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>

          <div className="search-code-card">
            <div className="search-meta">
              <strong>evolvenew</strong>
              <span>{lang === 'cs' ? 'Pokémoni, jejichž evoluce odemkne novou položku v Pokédexu' : 'Species whose evolution registers a brand new Pokédex entry'}</span>
            </div>
            <button 
              type="button" 
              className="copy-chip-btn"
              onClick={() => handleCopy('evolvenew', 'evolvenew')}
            >
              {copiedKey === 'evolvenew' ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedKey === 'evolvenew' ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
