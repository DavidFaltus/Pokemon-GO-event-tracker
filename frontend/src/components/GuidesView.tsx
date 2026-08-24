import React, { useState } from 'react';
import './GuidesView.css';
import { GUIDES_DATA } from '../data/guidesData';
import type { Language } from '../data/translations';
import { 
  getPokemonIconUrl, 
  handlePokemonImageError, 
  SHADOW_ICON_URL, 
  handleShadowIconError,
  MEGA_ICON_URL,
  handleMegaIconError
} from '../utils/imageResolver';
import { VIVILLON_PATTERNS, getVivillonSpriteUrl } from './FriendFinderView';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ArrowLeft, 
  Lightbulb, 
  Shield, 
  Swords, 
  Calendar, 
  Sparkles, 
  Trophy, 
  ChevronRight,
  User,
  Zap,
  Target,
  Flame,
  Award,
  Globe,
  Star,
  CheckCircle2,
  Footprints,
  Compass,
  Moon,
  CloudRain,
  RotateCw
} from 'lucide-react';

interface GuidesViewProps {
  lang: Language;
  initialArticleSlug?: string;
  onSelectArticle?: (slug: string) => void;
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
    base: 'Eevee',
    evolved: 'Sylveon',
    category: 'buddy',
    task: { 
      cs: 'Sylveon (70 srdcí), Espeon/Umbreon (10 km + Den/Noc), Leafeon/Glaceon (Lure Moduly)', 
      en: 'Sylveon (70 hearts), Espeon/Umbreon (10 km + Day/Night), Leafeon/Glaceon (Lure Modules)', 
      ja: 'ニンフィア（ハート70個）、エーフィ/ブラッキー（10km＋昼/夜）、リーフィア/グレイシア（ルアー）', 
      ru: 'Sylveon (70 сердец), Espeon/Umbreon (10км + день/ночь), Leafeon/Glaceon (Lure)' 
    },
    tip: { 
      cs: 'Jednorázové triky se jmény: Kira ➔ Sylveon, Sakura ➔ Espeon, Tamao ➔ Umbreon, Linnea ➔ Leafeon, Rea ➔ Glaceon.', 
      en: 'One-time name tricks: Kira (Sylveon), Sakura (Espeon), Tamao (Umbreon), Linnea (Leafeon), Rea (Glaceon).',
      ja: '初回限定名前裏技：Kira（ニンフィア）、Sakura（エーフィ）、Tamao（ブラッキー）、Linnea（リーフィア）、Rea（グレイシア）',
      ru: 'Одноразовые имена: Kira (Sylveon), Sakura (Espeon), Tamao (Umbreon), Linnea (Leafeon), Rea (Glaceon).'
    },
    badge: 'Eeveelutions'
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

export const GuidesView: React.FC<GuidesViewProps> = ({ 
  lang, 
  initialArticleSlug,
  onSelectArticle 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(initialArticleSlug || null);
  const [evolutionCategoryFilter, setEvolutionCategoryFilter] = useState<'all' | 'buddy' | 'combat' | 'walk' | 'special' | 'trade'>('all');
  const [vivillonRarityFilter, setVivillonRarityFilter] = useState<'all' | 'rare' | 'common'>('all');
  const [regionalFilter, setRegionalFilter] = useState<'all' | 'kanto' | 'johto-hoenn' | 'unova-kalos' | 'alola-galar' | 'hemisphere'>('all');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield size={16} />;
      case 'Swords': return <Swords size={16} />;
      case 'Calendar': return <Calendar size={16} />;
      case 'Sparkles': return <Sparkles size={16} />;
      case 'Trophy': return <Trophy size={16} />;
      case 'Globe': return <Globe size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  const selectedArticle = GUIDES_DATA.find(a => a.slug === selectedArticleSlug);

  const filteredArticles = GUIDES_DATA.filter(article => {
    const titleText = article.title[lang] || article.title.en;
    const subtitleText = article.subtitle[lang] || article.subtitle.en;
    const categoryText = article.category[lang] || article.category.en;
    const q = searchQuery.toLowerCase();
    return titleText.toLowerCase().includes(q) || subtitleText.toLowerCase().includes(q) || categoryText.toLowerCase().includes(q);
  });

  const handleArticleClick = (slug: string) => {
    setSelectedArticleSlug(slug);
    if (onSelectArticle) {
      onSelectArticle(slug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPokemonChip = (name: string, isShadow = false, isShiny = false) => {
    const iconUrl = getPokemonIconUrl(name, isShiny);
    return (
      <div key={name} className="guide-pokemon-chip">
        <img 
          src={iconUrl} 
          alt={name} 
          onError={(e) => handlePokemonImageError(e.currentTarget, name, isShiny)}
          loading="lazy"
        />
        <span>{name}</span>
        {isShadow && (
          <img 
            src={SHADOW_ICON_URL} 
            alt="Shadow" 
            style={{ width: 14, height: 14, marginLeft: 2 }}
            onError={(e) => handleShadowIconError(e.currentTarget)}
          />
        )}
      </div>
    );
  };

  const renderVisualArticleWidget = (slug: string) => {
    // 1. All Evolution Quests Master Widget
    if (slug === 'pokemon-evolution-quests-guide') {
      const filteredQuests = EVOLUTION_QUEST_ITEMS.filter(q => {
        if (evolutionCategoryFilter === 'all') return true;
        return q.category === evolutionCategoryFilter;
      });

      return (
        <div className="guide-visual-widget guide-evolution-widget">
          <div className="widget-header-row">
            <h3>
              <Sparkles size={20} color="#38bdf8" />
              {lang === 'cs' ? 'Interaktivní Katalog Všech Evolve Questů' : 'Interactive Evolution Quests Catalog'}
            </h3>
            <div className="widget-filter-tabs">
              <button 
                className={`widget-tab-btn ${evolutionCategoryFilter === 'all' ? 'active' : ''}`}
                onClick={() => setEvolutionCategoryFilter('all')}
              >
                {lang === 'cs' ? 'Všechny' : 'All'}
              </button>
              <button 
                className={`widget-tab-btn ${evolutionCategoryFilter === 'buddy' ? 'active' : ''}`}
                onClick={() => setEvolutionCategoryFilter('buddy')}
              >
                {lang === 'cs' ? '🎯 Buddy & Úkoly' : '🎯 Buddy Tasks'}
              </button>
              <button 
                className={`widget-tab-btn ${evolutionCategoryFilter === 'combat' ? 'active' : ''}`}
                onClick={() => setEvolutionCategoryFilter('combat')}
              >
                {lang === 'cs' ? '⚔️ Bitvy & Trik' : '⚔️ Battles & Trick'}
              </button>
              <button 
                className={`widget-tab-btn ${evolutionCategoryFilter === 'walk' ? 'active' : ''}`}
                onClick={() => setEvolutionCategoryFilter('walk')}
              >
                {lang === 'cs' ? '👟 Chůze' : '👟 Walking'}
              </button>
              <button 
                className={`widget-tab-btn ${evolutionCategoryFilter === 'special' ? 'active' : ''}`}
                onClick={() => setEvolutionCategoryFilter('special')}
              >
                {lang === 'cs' ? '🌀 Speciální' : '🌀 Special'}
              </button>
              <button 
                className={`widget-tab-btn ${evolutionCategoryFilter === 'trade' ? 'active' : ''}`}
                onClick={() => setEvolutionCategoryFilter('trade')}
              >
                {lang === 'cs' ? '🔄 Trade' : lang === 'ja' ? '🔄 交換進化' : lang === 'ru' ? '🔄 Трейд' : '🔄 Trade'}
              </button>
            </div>
          </div>

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
                      <span className="evolution-avatar-name">{item.base.replace('-Galarian', ' (Galarian)').replace('-Hisuian', ' (Hisuian)').replace('-Roaming', '')}</span>
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
                      <span className="evolution-avatar-name">{item.evolved.replace('-Galarian', ' (Galarian)').replace('-Hisuian', ' (Hisuian)')}</span>
                    </div>
                  </div>
                </div>

                <div className="evolution-card-body">
                  <div className="quest-task-line">
                    <CheckCircle2 size={15} color="#10b981" />
                    <strong>{item.task[lang] || item.task.en}</strong>
                  </div>
                  {item.tip && (
                    <div className="quest-pro-tip">
                      <Lightbulb size={13} color="#eab308" />
                      <span>{item.tip[lang] || item.tip.en}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 2. Vivillon 18 Patterns Showcase Widget
    if (slug === 'vivillon-patterns-postcard-guide') {
      const filteredPatterns = VIVILLON_PATTERNS.filter(pat => {
        if (vivillonRarityFilter === 'rare') return pat.rare;
        if (vivillonRarityFilter === 'common') return !pat.rare;
        return true;
      });

      return (
        <div className="guide-visual-widget guide-vivillon-widget">
          <div className="widget-header-row">
            <h3>
              <Globe size={20} color="#38bdf8" />
              {lang === 'cs' ? 'Všech 18 Vzorů Vivillona – Oficiální 3D Art Gallery & Regiony' : 'All 18 Vivillon Wing Patterns – Official 3D Gallery & Regions'}
            </h3>
            <div className="widget-filter-tabs">
              <button 
                className={`widget-tab-btn ${vivillonRarityFilter === 'all' ? 'active' : ''}`}
                onClick={() => setVivillonRarityFilter('all')}
              >
                {lang === 'cs' ? 'Všech 18 vzorů' : 'All 18 Patterns'}
              </button>
              <button 
                className={`widget-tab-btn ${vivillonRarityFilter === 'rare' ? 'active' : ''}`}
                onClick={() => setVivillonRarityFilter('rare')}
              >
                {lang === 'cs' ? '⭐ Nejcennější vzory' : '⭐ Rarest Tiers'}
              </button>
              <button 
                className={`widget-tab-btn ${vivillonRarityFilter === 'common' ? 'active' : ''}`}
                onClick={() => setVivillonRarityFilter('common')}
              >
                {lang === 'cs' ? 'Standardní vzory' : 'Common Patterns'}
              </button>
            </div>
          </div>

          <div className="guide-vivillon-grid">
            {filteredPatterns.map(pat => (
              <div key={pat.id} className={`guide-vivillon-card ${pat.rare ? 'rare' : ''}`}>
                <div className="vivillon-img-wrapper">
                  <img 
                    src={getVivillonSpriteUrl(pat.id)} 
                    alt={pat.id} 
                    className="vivillon-3d-sprite"
                    loading="lazy"
                  />
                  {pat.rare && (
                    <span className="vivillon-rare-tag">
                      <Star size={11} fill="#eab308" color="#eab308" /> {lang === 'cs' ? 'Vzácný' : 'Rare'}
                    </span>
                  )}
                </div>
                <div className="vivillon-card-info">
                  <h4>{pat.name[lang] || pat.name.en}</h4>
                  <p className="vivillon-region-text">
                    {pat.emoji} {pat.id.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Postcard Milestone Indicator */}
          <div className="postcard-milestone-box">
            <div className="milestone-title">
              <Sparkles size={16} color="#38bdf8" />
              <strong>{lang === 'cs' ? 'Postcard Book Milníky pro Scatterbug Encounter:' : 'Postcard Book Milestones for Scatterbug Encounters:'}</strong>
            </div>
            <div className="milestone-steps">
              <div className="milestone-step">
                <span className="milestone-num">1. Medaile</span>
                <span className="milestone-val">3 Pohlednice</span>
              </div>
              <span className="milestone-arrow">➔</span>
              <div className="milestone-step">
                <span className="milestone-num">2. Medaile</span>
                <span className="milestone-val">9 Pohlednic</span>
              </div>
              <span className="milestone-arrow">➔</span>
              <div className="milestone-step">
                <span className="milestone-num">3. Medaile a další</span>
                <span className="milestone-val">15 Pohlednic</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 3. Weekly Mini-Events Widget
    if (slug === 'weekly-hidden-mini-events-guide') {
      return (
        <div className="guide-visual-widget weekly-schedule-widget">
          <h3>
            <Calendar size={20} color="#38bdf8" />
            {lang === 'cs' ? 'Přehled týdenních minieventů a rutin trenéra' : 'Weekly Mini-Events & Trainer Routines Breakdown'}
          </h3>
          <p className="widget-subtitle">
            {lang === 'cs' ? 'Karty rozdělené podle herních disciplín s přesnými časy, bonusy a klíčovými tipy:' : 'Categorized by game mechanics with exact schedules, perks, and pro tips:'}
          </p>

          <div className="mini-events-category-grid">
            <div className="mini-event-category-card combat-card">
              <div className="category-header">
                <span className="category-badge badge-combat"><Swords size={14} /> {lang === 'cs' ? 'Bojové Minieventy' : 'Combat Mini-Events'}</span>
              </div>
              <div className="category-items">
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>Max Mondays</strong>
                    <span className="event-time-pill">{lang === 'cs' ? 'Pondělí 18:00–19:00' : 'Mondays 6–7 PM'}</span>
                  </div>
                  <p>{lang === 'cs' ? 'Dynamax Pokémoni na téměř všech Power Spotech. Zvýšený sběr Max Particles.' : 'Featured Dynamax Pokémon take over Power Spots with boosted Max Particles.'}</p>
                </div>
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>Raid Hour</strong>
                    <span className="event-time-pill">{lang === 'cs' ? 'Středa 18:00–19:00' : 'Wednesdays 6–7 PM'}</span>
                  </div>
                  <p>{lang === 'cs' ? '5★ Legendární boss na všech gymech. Hrajte v Party Play pro 2× Charged Move damage!' : '5★ Legendary boss across all gyms. Activate Party Play for 2x Charged Move damage!'}</p>
                </div>
              </div>
            </div>

            <div className="mini-event-category-card social-card">
              <div className="category-header">
                <span className="category-badge badge-social"><User size={14} /> {lang === 'cs' ? 'Sociální & Trade Zvyky' : 'Social & Trading'}</span>
              </div>
              <div className="category-items">
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>Friendship Friday</strong>
                    <span className="event-time-pill">{lang === 'cs' ? 'Každý Pátek' : 'Every Friday'}</span>
                  </div>
                  <p>{lang === 'cs' ? 'Otevírání max počtu dárků (30–40/den) pro urychlení Best Friends a Lucky Friends statusu.' : 'Maximize gift opening (30–40/day) to trigger Lucky Friends and farm 100k XP.'}</p>
                </div>
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>Trade Weekend</strong>
                    <span className="event-time-pill">{lang === 'cs' ? 'Sobota & Neděle' : 'Weekends'}</span>
                  </div>
                  <p>{lang === 'cs' ? 'Výměna Pokémonů s odstupem 100+ km pro garantovanou Candy XL pro oba trenéry.' : 'Trading Pokémon caught 100+ km apart awards 1 guaranteed Candy XL to both players.'}</p>
                </div>
              </div>
            </div>

            <div className="mini-event-category-card collector-card">
              <div className="category-header">
                <span className="category-badge badge-collector"><Sparkles size={14} /> {lang === 'cs' ? 'Sběratelské & Showcases' : 'Collector & Showcases'}</span>
              </div>
              <div className="category-items">
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>Spotlight Hour</strong>
                    <span className="event-time-pill">{lang === 'cs' ? 'Úterý 18:00–19:00' : 'Tuesdays 6–7 PM'}</span>
                  </div>
                  <p>{lang === 'cs' ? 'Masivní spawn 1 Pokémona a 1 z 5 rotujících bonusů (2× Stardust, 2× XP, 2× Candy atd.).' : 'Intensive spawns of 1 species and rotating 2x Stardust/XP/Candy bonuses.'}</p>
                </div>
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>PokéStop Showcases</strong>
                    <span className="event-time-pill">{lang === 'cs' ? 'Čtvrtek až Neděle' : 'Thu to Sun'}</span>
                  </div>
                  <p>{lang === 'cs' ? 'Soutěže o největšího XXL Pokémona s odměnami: Incubators, Star Pieces, Lures a 10k XP.' : 'Size competitions (XXL) at PokéStops rewarding Incubators, Star Pieces, and 10k XP.'}</p>
                </div>
              </div>
            </div>

            <div className="mini-event-category-card daily-card">
              <div className="category-header">
                <span className="category-badge badge-daily"><Clock size={14} /> {lang === 'cs' ? 'Denní Trenérské Rutiny' : 'Daily Trainer Habits'}</span>
              </div>
              <div className="category-items">
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>Daily Adventure Incense</strong>
                    <span className="event-time-pill">{lang === 'cs' ? '15 minut denně' : '15 mins/day'}</span>
                  </div>
                  <p>{lang === 'cs' ? 'Bezplatné kadidlo při chůzi se šancí na legendární Galarian Articuno, Zapdos a Moltres.' : 'Free walking incense with chance to encounter Galarian Articuno, Zapdos, and Moltres.'}</p>
                </div>
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>50 PokéCoins Gym Defense</strong>
                    <span className="event-time-pill">{lang === 'cs' ? 'Denní limit' : 'Daily Cap'}</span>
                  </div>
                  <p>{lang === 'cs' ? 'Obsazení 2–3 gymů denně (1 500 coinů měsíčně zdarma na Storage a Raid Passy).' : 'Defend Gyms daily for 50 coins = 1,500 monthly free coins for Storage & Passes.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 4. Rocket Leaders & Giovanni Widget
    if (slug === 'rocket-leaders-giovanni-guide') {
      return (
        <div className="guide-visual-widget">
          <h3>
            <Shield size={18} color="#ef4444" />
            {lang === 'cs' ? 'Aktuální Sestava Boss Giovanni & Doporučené Countery' : 'Current Boss Giovanni Lineup & Recommended Counters'}
          </h3>
          <div className="guide-lineup-slots">
            <div className="guide-slot-card">
              <div className="guide-slot-header">Slot 1: Lead (Fixed)</div>
              <div className="guide-pokemon-chips">
                {renderPokemonChip('Persian', true)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: 4 }}>
                {lang === 'cs' ? 'Nejlepší countery (Fighting - Shield Breakers):' : 'Best Counters (Fighting - Shield Breakers):'}
              </div>
              <div className="guide-pokemon-chips">
                {renderPokemonChip('Lucario')}
                {renderPokemonChip('Machamp')}
                {renderPokemonChip('Terrakion')}
              </div>
            </div>

            <div className="guide-slot-card">
              <div className="guide-slot-header">Slot 2: Rotující Shadow</div>
              <div className="guide-pokemon-chips">
                {renderPokemonChip('Nidoking', true)}
                {renderPokemonChip('Rhyperior', true)}
                {renderPokemonChip('Kingler', true)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: 4 }}>
                {lang === 'cs' ? 'Nejlepší countery (Water/Grass/Ground):' : 'Best Counters (Water/Grass/Ground):'}
              </div>
              <div className="guide-pokemon-chips">
                {renderPokemonChip('Swampert')}
                {renderPokemonChip('Kyogre')}
                {renderPokemonChip('Kartana')}
              </div>
            </div>

            <div className="guide-slot-card">
              <div className="guide-slot-header">Slot 3: Shadow Legendary</div>
              <div className="guide-pokemon-chips">
                {renderPokemonChip('Rayquaza', true)}
                {renderPokemonChip('Kyogre', true)}
                {renderPokemonChip('Groudon', true)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: 4 }}>
                {lang === 'cs' ? 'Nejlepší countery (Ice/Dragon/Water):' : 'Best Counters (Ice/Dragon/Water):'}
              </div>
              <div className="guide-pokemon-chips">
                {renderPokemonChip('Mamoswine')}
                {renderPokemonChip('Baxcalibur')}
                {renderPokemonChip('Glaceon')}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 5. Raid Battles Guide Widget
    if (slug === 'raid-battles-counter-guide') {
      return (
        <div className="guide-visual-widget">
          <h3>
            <Swords size={18} color="#38bdf8" />
            {lang === 'cs' ? 'TOP S-Tier Raidoví Útočníci v Pokémon GO (2026 Meta)' : 'TOP S-Tier Raid Attackers in Pokémon GO (2026 Meta)'}
          </h3>
          <div className="guide-pokemon-chips" style={{ gap: 12 }}>
            {renderPokemonChip('Mega Rayquaza')}
            {renderPokemonChip('Mewtwo', true)}
            {renderPokemonChip('Primal Groudon')}
            {renderPokemonChip('Primal Kyogre')}
            {renderPokemonChip('Terrakion')}
            {renderPokemonChip('Reshiram')}
            {renderPokemonChip('Kartana')}
            {renderPokemonChip('Necrozma')}
          </div>
        </div>
      );
    }

    // 6. Spotlight & Community Day Widget
    if (slug === 'spotlight-community-day-guide') {
      return (
        <div className="guide-visual-widget">
          <h3>
            <Award size={18} color="#f59e0b" />
            {lang === 'cs' ? 'Klíčové Předměty pro Stacking Bonusů' : 'Key Items for Bonus Stacking'}
          </h3>
          <div className="guide-pokemon-chips">
            <div className="guide-pokemon-chip">
              <Sparkles size={16} color="#f59e0b" />
              <span>Star Piece (+50% Stardust)</span>
            </div>
            <div className="guide-pokemon-chip">
              <Zap size={16} color="#eab308" />
              <span>Lucky Egg (2x XP)</span>
            </div>
            <div className="guide-pokemon-chip">
              <Target size={16} color="#10b981" />
              <span>Pinap / Silver Pinap (2x+ Candy)</span>
            </div>
          </div>
        </div>
      );
    }

    // 7. IV & Appraisal Widget
    if (slug === 'pokemon-iv-cp-appraise-guide') {
      return (
        <div className="guide-visual-widget">
          <h3>
            <Sparkles size={18} color="#a855f7" />
            {lang === 'cs' ? 'Porovnání: PvE 100% IV vs PvP Great/Ultra League IV' : 'Comparison: PvE 100% IV vs PvP Great/Ultra League IV'}
          </h3>
          <div className="mini-events-category-grid" style={{ marginTop: 12 }}>
            <div className="mini-event-category-card combat-card">
              <div className="category-header">
                <span className="category-badge badge-combat">PvE Raidy & Gymy</span>
              </div>
              <div className="category-items">
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>15 / 15 / 15 (100% IV - Hundo)</strong>
                    <span className="event-time-pill">4★</span>
                  </div>
                  <p>{lang === 'cs' ? 'V raidech není žádný CP limit. 15 Attack zaručuje maximální možné poškození za sekundu.' : 'No CP cap in raids. 15 Attack ensures maximum possible damage output.'}</p>
                </div>
              </div>
            </div>

            <div className="mini-event-category-card social-card">
              <div className="category-header">
                <span className="category-badge badge-social">PvP Great & Ultra League</span>
              </div>
              <div className="category-items">
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>0 / 15 / 15 (Stat Product #1)</strong>
                    <span className="event-time-pill">Max Bulk</span>
                  </div>
                  <p>{lang === 'cs' ? 'Nízký Attack umožní posunout Pokémona na vyšší Level pod limitem 1500/2500 CP, což dává obrovskou výdrž a HP.' : 'Low Attack allows powering up to higher levels under 1,500/2,500 CP caps, maximizing bulk.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 8. Mega & Dynamax Widget
    if (slug === 'mega-dynamax-mechanics-guide') {
      return (
        <div className="guide-visual-widget">
          <h3>
            <Trophy size={18} color="#ec4899" />
            {lang === 'cs' ? 'Úrovně Mega Evoluce & Dynamax Max Moves' : 'Mega Evolution Tiers & Dynamax Max Moves'}
          </h3>
          <div className="guide-pokemon-chips" style={{ gap: 10 }}>
            <div className="guide-pokemon-chip">
              <span style={{ fontWeight: 800, color: '#94a3b8' }}>Tier 1 (Base):</span>
              <span>+1 Candy, 7 dní cooldown</span>
            </div>
            <div className="guide-pokemon-chip">
              <span style={{ fontWeight: 800, color: '#38bdf8' }}>Tier 2 (High):</span>
              <span>+1 Candy, +10% Candy XL, 5 dní cooldown</span>
            </div>
            <div className="guide-pokemon-chip">
              <span style={{ fontWeight: 800, color: '#10b981' }}>Tier 3 (Max):</span>
              <span>+2 Candy, +25% Candy XL, 3 dny cooldown</span>
            </div>
          </div>
        </div>
      );
    }

    if (slug === 'regional-pokemon-world-guide') {
      const REGIONAL_POKEMON_DATA = [
        { name: 'Tauros', region: 'kanto', area: { cs: 'Severní Amerika', en: 'North America', ja: '北米', ru: 'Северная Америка' }, note: { cs: 'Běžný ve volné přírodě v USA a Kanadě', en: 'Common wild spawn in USA and Canada', ja: 'アメリカ・カナダで野生出現', ru: 'Часто встречается в США и Канаде' }, emoji: '🇺🇸', mapPosition: { x: 22, y: 38 } },
        { name: 'Mr-Mime', region: 'kanto', area: { cs: 'Evropa', en: 'Europe', ja: 'ヨーロッパ', ru: 'Европа' }, note: { cs: 'Vyskytuje se po celé Evropě', en: 'Found throughout Europe', ja: 'ヨーロッパ全域で出現', ru: 'Встречается по всей Европе' }, emoji: '🇪🇺', mapPosition: { x: 50, y: 30 } },
        { name: 'Kangaskhan', region: 'kanto', area: { cs: 'Austrálie/Oceánie', en: 'Australia/Oceania', ja: 'オーストラリア/オセアニア', ru: 'Австралия/Океания' }, note: { cs: 'Běžný v australských městech', en: 'Common in Australian cities', ja: 'オーストラリアの都市部で出現', ru: 'Часто встречается в городах Австралии' }, emoji: '🇦🇺', mapPosition: { x: 80, y: 75 } },
        { name: 'Farfetchd', region: 'kanto', area: { cs: 'Východní Asie', en: 'East Asia', ja: '東アジア', ru: 'Восточная Азия' }, note: { cs: 'Japonsko, Jižní Korea, Tchaj-wan', en: 'Japan, South Korea, Taiwan', ja: '日本、韓国、台湾', ru: 'Япония, Южная Корея, Тайвань' }, emoji: '🇯🇵', mapPosition: { x: 83, y: 35 } },
        { name: 'Heracross', region: 'johto-hoenn', area: { cs: 'Latinská Amerika', en: 'Latin America', ja: '中南米', ru: 'Латинская Америка' }, note: { cs: 'Od jižní Floridy po Jižní Ameriku', en: 'From South Florida through South America', ja: '南フロリダから南米全域', ru: 'От южной Флориды до Южной Америки' }, emoji: '🇧🇷', mapPosition: { x: 30, y: 65 } },
        { name: 'Corsola', region: 'johto-hoenn', area: { cs: 'Tropický pás', en: 'Tropical Latitudes', ja: '熱帯地域', ru: 'Тропические широты' }, note: { cs: 'Mezi obratníky (Florida, severní Austrálie)', en: 'Between tropics (Florida, Northern Australia)', ja: '赤道付近（フロリダ、オーストラリア北部等）', ru: 'Между тропиками' }, emoji: '🏖️', mapPosition: { x: 70, y: 55 } },
        { name: 'Torkoal', region: 'johto-hoenn', area: { cs: 'Indie/Jihovýchodní Asie', en: 'India/SE Asia', ja: 'インド/東南アジア', ru: 'Индия/ЮВ Азия' }, note: { cs: 'Indie, Pákistán, SAE', en: 'India, Pakistan, UAE', ja: 'インド、パキスタン、UAE', ru: 'Индия, Пакистан, ОАЭ' }, emoji: '🇮🇳', mapPosition: { x: 67, y: 45 } },
        { name: 'Tropius', region: 'johto-hoenn', area: { cs: 'Afrika/Blízký Východ', en: 'Africa/Middle East', ja: 'アフリカ/中東', ru: 'Африка/Ближний Восток' }, note: { cs: 'Zahrnuje i jižní Španělsko (Malaga)', en: 'Includes southern Spain (Malaga)', ja: 'スペイン南部（マラガ等）も含む', ru: 'Включая южную Испанию (Малага)' }, emoji: '🌍', mapPosition: { x: 53, y: 55 } },
        { name: 'Relicanth', region: 'johto-hoenn', area: { cs: 'Nový Zéland', en: 'New Zealand', ja: 'ニュージーランド', ru: 'Новая Зеландия' }, note: { cs: 'Také Fidži a Vanuatu', en: 'Also Fiji and Vanuatu', ja: 'フィジー、バヌアツでも出現', ru: 'Также Фиджи и Вануату' }, emoji: '🇳🇿', mapPosition: { x: 92, y: 80 } },
        { name: 'Pachirisu', region: 'johto-hoenn', area: { cs: 'Arktická zóna', en: 'Arctic Zone', ja: '北極圏', ru: 'Арктическая зона' }, note: { cs: 'Severní Kanada, Aljaška, Rusko', en: 'Northern Canada, Alaska, Russia', ja: 'カナダ北部、アラスカ、ロシア', ru: 'Северная Канада, Аляска, Россия' }, emoji: '🇨🇦', mapPosition: { x: 18, y: 20 } },
        { name: 'Chatot', region: 'johto-hoenn', area: { cs: 'Jižní polokoule', en: 'Southern Hemisphere', ja: '南半球', ru: 'Южное полушарие' }, note: { cs: 'Běžný všude pod rovníkem', en: 'Common anywhere below the equator', ja: '赤道以南で出現', ru: 'Часто встречается ниже экватора' }, emoji: '🦜', mapPosition: { x: 30, y: 75 } },
        { name: 'Carnivine', region: 'johto-hoenn', area: { cs: 'Jihovýchod USA', en: 'US Southeast', ja: 'アメリカ南東部', ru: 'Юго-Восток США' }, note: { cs: 'Florida, Georgia, Carolinas', en: 'Florida, Georgia, Carolinas', ja: 'フロリダ、ジョージア、カロライナ周辺', ru: 'Флорида, Джорджия, Каролина' }, emoji: '🌴', mapPosition: { x: 24, y: 42 } },
        { name: 'Zangoose', region: 'hemisphere', area: { cs: 'Evropa, Asie, Austrálie', en: 'Europe, Asia, Australia', ja: '欧州、アジア、オーストラリア', ru: 'Европа, Азия, Австралия' }, note: { cs: 'Rotuje se Seviperem', en: 'Rotates with Seviper', ja: 'ハブネークとローテーション', ru: 'Ротируется с Севипером' }, emoji: '🔄', mapPosition: { x: 65, y: 35 } },
        { name: 'Seviper', region: 'hemisphere', area: { cs: 'Ameriky, Afrika', en: 'Americas, Africa', ja: '南北アメリカ、アフリカ', ru: 'Америка, Африка' }, note: { cs: 'Rotuje se Zangoosem', en: 'Rotates with Zangoose', ja: 'ザングースとローテーション', ru: 'Ротируется с Зангусом' }, emoji: '🔄', mapPosition: { x: 25, y: 50 } },
        { name: 'Bouffalant', region: 'unova-kalos', area: { cs: 'New York Area', en: 'New York Area', ja: 'ニューヨーク周辺', ru: 'Окрестности Нью-Йорка' }, note: { cs: 'NY, NJ, CT, MA, PA, MD', en: 'NY, NJ, CT, MA, PA, MD', ja: 'NY、NJ、CT、MA、PA、MD州', ru: 'NY, NJ, CT, MA, PA, MD' }, emoji: '🗽', mapPosition: { x: 26, y: 37 } },
        { name: 'Sigilyph', region: 'unova-kalos', area: { cs: 'Egypt, Řecko', en: 'Egypt, Greece', ja: 'エジプト、ギリシャ', ru: 'Египет, Греция' }, note: { cs: 'Východní Středomoří', en: 'Eastern Mediterranean', ja: '東地中海地域', ru: 'Восточное Средиземноморье' }, emoji: '🏛️', mapPosition: { x: 56, y: 40 } },
        { name: 'Maractus', region: 'unova-kalos', area: { cs: 'Střední Amerika', en: 'Central America', ja: '中米', ru: 'Центральная Америка' }, note: { cs: 'Mexiko, Karibik, severní Jižní Amerika', en: 'Mexico, Caribbean, northern South America', ja: 'メキシコ、カリブ海、南米北部', ru: 'Мексика, Карибы, север Южной Америки' }, emoji: '🌵', mapPosition: { x: 23, y: 50 } },
        { name: 'Klefki', region: 'unova-kalos', area: { cs: 'Francie', en: 'France', ja: 'フランス', ru: 'Франция' }, note: { cs: 'Přesahuje mírně i do okolních zemí', en: 'Bleeds slightly into neighboring countries', ja: '隣接国にもわずかに出現', ru: 'Немного заходит в соседние страны' }, emoji: '🗝️', mapPosition: { x: 48, y: 31 } },
        { name: 'Comfey', region: 'alola-galar', area: { cs: 'Havaj', en: 'Hawaii', ja: 'ハワイ', ru: 'Гавайи' }, note: { cs: 'Exkluzivně na Havajských ostrovech', en: 'Exclusive to the Hawaiian islands', ja: 'ハワイ諸島限定', ru: 'Эксклюзивно на Гавайских островах' }, emoji: '🌺', mapPosition: { x: 5, y: 48 } },
        { name: 'Hawlucha', region: 'alola-galar', area: { cs: 'Mexiko', en: 'Mexico', ja: 'メキシコ', ru: 'Мексика' }, note: { cs: 'Zasáhne i kousek do jižní Kalifornie a Texasu', en: 'Reaches slightly into SoCal and Texas', ja: '南カリフォルニアやテキサスの一部にも出現', ru: 'Немного заходит в Южную Калифорнию и Техас' }, emoji: '🦅', mapPosition: { x: 21, y: 46 } },
        { name: 'Stonjourner', region: 'alola-galar', area: { cs: 'UK/Severní Evropa', en: 'UK/Northern Europe', ja: 'イギリス/北欧', ru: 'Великобритания/Северная Европа' }, note: { cs: 'Velká Británie, Irsko', en: 'United Kingdom, Ireland', ja: 'イギリス、アイルランド', ru: 'Великобритания, Ирландия' }, emoji: '🗿', mapPosition: { x: 47, y: 27 } },
        { name: 'Eiscue', region: 'alola-galar', area: { cs: 'Jižní polokoule', en: 'Southern Hemisphere', ja: '南半球', ru: 'Южное полушарие' }, note: { cs: 'Společně s Chatotem', en: 'Shares space with Chatot', ja: 'ペラップと同じ地域', ru: 'Делит пространство с Чатотом' }, emoji: '🐧', mapPosition: { x: 40, y: 82 } },
        { name: 'Flamigo', region: 'alola-galar', area: { cs: 'Florida/Karibik', en: 'Florida/Caribbean', ja: 'フロリダ/カリブ海', ru: 'Флорида/Карибы' }, note: { cs: 'Sdílí lokace s Carnivine, Heracrossem a Maractusem', en: 'Shares spots with Carnivine, Heracross, Maractus', ja: 'マスキッパやヘラクロスと同じ地域', ru: 'Делит места с Карнивайном, Геракроссом, Марактусом' }, emoji: '🦩', mapPosition: { x: 26, y: 45 } },
      ];

      const filterTabs = [
        { id: 'all', label: { cs: 'Vše', en: 'All', ja: 'すべて', ru: 'Все' } },
        { id: 'kanto', label: { cs: 'Gen 1 (Kanto)', en: 'Gen 1 (Kanto)', ja: '第1世代(カントー)', ru: 'Ген 1 (Канто)' } },
        { id: 'johto-hoenn', label: { cs: 'Gen 2-3', en: 'Gen 2-3', ja: '第2-3世代', ru: 'Ген 2-3' } },
        { id: 'unova-kalos', label: { cs: 'Gen 5-6', en: 'Gen 5-6', ja: '第5-6世代', ru: 'Ген 5-6' } },
        { id: 'alola-galar', label: { cs: 'Gen 7+', en: 'Gen 7+', ja: '第7世代+', ru: 'Ген 7+' } },
        { id: 'hemisphere', label: { cs: 'Hemisféry', en: 'Hemispheres', ja: '半球ローテ', ru: 'Полушария' } }
      ];

      const visiblePokemon = REGIONAL_POKEMON_DATA.filter(p => regionalFilter === 'all' || p.region === regionalFilter);

      return (
        <div className="guide-regional-widget">
          <div className="widget-header">
            <h3>{lang === 'cs' ? 'Mapa regionálních Pokémonů' : lang === 'ja' ? '地域限定ポケモンマップ' : lang === 'ru' ? 'Карта региональных покемонов' : 'Regional Pokémon Map'}</h3>
            <div className="widget-tabs">
              {filterTabs.map(tab => (
                <button
                  key={tab.id}
                  className={`widget-tab ${regionalFilter === tab.id ? 'active' : ''}`}
                  onClick={() => setRegionalFilter(tab.id as any)}
                >
                  {tab.label[lang] || tab.label.en}
                </button>
              ))}
            </div>
          </div>

          <div className="regional-world-map-wrapper">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="regional-map-svg">
              <path d="M15,20 Q25,10 35,25 T40,40 Q30,50 25,70 Q20,80 15,60 T15,20 Z" fill="#0d1117" stroke="#242836" strokeWidth="0.5"/>
              <path d="M45,25 Q55,15 60,30 T75,40 Q85,50 80,60 T60,55 Q50,60 45,45 T45,25 Z" fill="#0d1117" stroke="#242836" strokeWidth="0.5"/>
              <path d="M70,65 Q80,60 85,75 T95,85 Q85,90 75,80 T70,65 Z" fill="#0d1117" stroke="#242836" strokeWidth="0.5"/>
              
              {visiblePokemon.map((p, idx) => (
                <g key={idx} className="regional-marker" transform={`translate(${p.mapPosition.x}, ${p.mapPosition.y})`}>
                  <circle cx="0" cy="0" r="1.5" fill="var(--accent-color)" opacity="0.6" />
                  <circle cx="0" cy="0" r="0.8" fill="var(--accent-color)" />
                  <image 
                    href={getPokemonIconUrl(p.name)} 
                    x="-2" y="-2" width="4" height="4"
                  />
                </g>
              ))}
            </svg>
          </div>

          <div className="regional-cards-grid">
            {visiblePokemon.map((p, idx) => (
              <div key={idx} className="regional-card">
                <div className="regional-card-avatar">
                  <img src={getPokemonIconUrl(p.name)} alt={p.name} />
                </div>
                <div className="regional-card-info">
                  <div className="regional-card-title">
                    <h4>{p.name.replace('-', ' ')}</h4>
                    <span>{p.emoji}</span>
                  </div>
                  <div className="regional-card-area">{p.area[lang] || p.area.en}</div>
                  <div className="regional-card-note">{p.note[lang] || p.note.en}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const getTranslation = (key: string) => {
    const labels: Record<string, Record<Language, string>> = {
      headerBadge: {
        cs: "Průvodce & Tipy",
        en: "Guides & Tips",
        ja: "ガイド & ヒント",
        ru: "Гайды и Советы"
      },
      headerTitle: {
        cs: "Pokémon GO Strategické Průvodce a Návody",
        en: "Pokémon GO Strategy Guides & Tutorials",
        ja: "Pokémon GO 戦略ガイド & チュートリアル",
        ru: "Стратегические гайды и инструкции Pokémon GO"
      },
      headerDesc: {
        cs: "Kompletní návody na poražení lídrů Team GO Rocket, nejlepší countery na Raidy, rozbor 100% IV hodnot a jak maximálně využít bonusy v Community Days a Spotlight Hours.",
        en: "In-depth guides for beating Team GO Rocket Leaders, best Raid counters, 100% IV appraisal deep dives, and maximizing Community Day & Spotlight Hour bonuses.",
        ja: "GOロケット団リーダー攻略、レイドカウンター最適化、個体値100%判別法、コミュニティ・デイ＆スポットライトアワーの活用テクニックを徹底解説。",
        ru: "Подробные инструкции по победам над Лидерами Ракеты, контерам на Райды, 100% IV значениям и максимизации бонусов на ивентах."
      },
      searchPlaceholder: {
        cs: "Hledat v průvodcích...",
        en: "Search guides...",
        ja: "ガイドを検索...",
        ru: "Поиск в гайдах..."
      },
      backToList: {
        cs: "Zpět na seznam průvodců",
        en: "Back to all guides",
        ja: "ガイド一覧に戻る",
        ru: "Назад к списку гайдов"
      },
      proTips: {
        cs: "Tipy pro maximální efektivitu:",
        en: "Pro Tips for Max Efficiency:",
        ja: "効率化のためのプロヒント：",
        ru: "Советы для максимальной эффективности:"
      },
      noResults: {
        cs: "Nenalezeny žádné průvodce odpovídající vašemu vyhledávání.",
        en: "No guides found matching your search.",
        ja: "該当するガイドが見つかりませんでした。",
        ru: "Гайдов по вашему запросу не найдено."
      }
    };

    return labels[key]?.[lang] || labels[key]?.en || '';
  };

  if (selectedArticle) {
    return (
      <div className="guides-container">
        <div className="guide-article-reader">
          <button className="back-btn" onClick={() => setSelectedArticleSlug(null)}>
            <ArrowLeft size={16} />
            {getTranslation('backToList')}
          </button>

          <header className="article-header">
            <div className="article-hero-deck">
              <div className="article-hero-info">
                <div className="guide-card-tag">
                  {getCategoryIcon(selectedArticle.iconName)}
                  {selectedArticle.category[lang] || selectedArticle.category.en}
                </div>

                <h1>{selectedArticle.title[lang] || selectedArticle.title.en}</h1>

                <p className="article-subtitle">
                  {selectedArticle.subtitle[lang] || selectedArticle.subtitle.en}
                </p>

                <div className="guide-card-meta">
                  <span><User size={14} /> {selectedArticle.author}</span>
                  <span><Clock size={14} /> {selectedArticle.readTime}</span>
                  <span>{selectedArticle.updatedAt}</span>
                </div>
              </div>

              {selectedArticle.imageUrl && (
                <div className="article-hero-art-frame">
                  <img 
                    src={selectedArticle.imageUrl} 
                    alt={selectedArticle.title[lang] || selectedArticle.title.en} 
                    className="article-hero-art-img"
                    loading="eager"
                  />
                </div>
              )}
            </div>
          </header>

          <main style={{ marginTop: '28px' }}>
            {renderVisualArticleWidget(selectedArticle.slug)}

            {selectedArticle.sections.map((section) => (
              <section key={section.id} className="article-section">
                <h2>{section.heading[lang] || section.heading.en}</h2>

                {section.pokemon && section.pokemon.length > 0 && (
                  <div className="guide-section-pokemon-deck">
                    <span className="deck-label">{lang === 'cs' ? 'Pokémoni v této sekci:' : 'Featured Pokémon in this section:'}</span>
                    <div className="guide-pokemon-chips">
                      {section.pokemon.map(p => renderPokemonChip(p))}
                    </div>
                  </div>
                )}

                <div className="article-text-flow">
                  {(section.content[lang] || section.content.en).split('\n').map((paragraph, pIdx) => {
                    if (!paragraph.trim()) return null;
                    if (paragraph.startsWith('•') || paragraph.startsWith('-')) {
                      return (
                        <div key={pIdx} className="guide-bullet-point-row">
                          <span className="bullet-dot" />
                          <span>{paragraph.replace(/^[•-]\s*/, '')}</span>
                        </div>
                      );
                    }
                    return <p key={pIdx}>{paragraph}</p>;
                  })}
                </div>

                {section.tips && (
                  <div className="tips-box">
                    <h4><Lightbulb size={16} /> {getTranslation('proTips')}</h4>
                    <ul>
                      {(section.tips[lang] || section.tips.en).map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="guides-container">
      <header className="guides-header">
        <div className="guides-title-badge">
          <BookOpen size={16} />
          {getTranslation('headerBadge')}
        </div>

        <h1>{getTranslation('headerTitle')}</h1>
        <p>{getTranslation('headerDesc')}</p>

        <div className="guides-controls">
          <div className="guides-search">
            <Search size={18} color="#94a3b8" />
            <input 
              type="text" 
              placeholder={getTranslation('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {filteredArticles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
          <p>{getTranslation('noResults')}</p>
        </div>
      ) : (
        <div className="guides-grid">
          {filteredArticles.map((article, index) => {
            const isFeatured = index === 0 && !searchQuery;
            return (
              <article 
                key={article.id} 
                className={`guide-card ${isFeatured ? 'featured' : ''}`}
                onClick={() => handleArticleClick(article.slug)}
              >
                {article.imageUrl && (
                  <div className="guide-card-image-wrapper">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title[lang] || article.title.en} 
                      className="guide-card-art-img"
                      loading="lazy"
                    />
                    <div className="guide-card-image-overlay" />
                  </div>
                )}

                <div className="guide-card-content">
                  <div className="guide-card-tag">
                    {getCategoryIcon(article.iconName)}
                    {article.category[lang] || article.category.en}
                  </div>

                  <h2>{article.title[lang] || article.title.en}</h2>
                  <p>{article.subtitle[lang] || article.subtitle.en}</p>

                  <div className="guide-card-meta">
                    <span><Clock size={14} /> {article.readTime}</span>
                    <span><ChevronRight size={16} color="#38bdf8" style={{ marginLeft: 'auto' }} /></span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
