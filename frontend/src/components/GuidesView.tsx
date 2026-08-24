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
  const [regionalFilter, setRegionalFilter] = useState<'all' | 'europe' | 'north-america' | 'latin-america' | 'asia-oceania' | 'africa' | 'hemisphere'>('all');
  const [regionalSearch, setRegionalSearch] = useState('');

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
        // EUROPE & UK
        {
          name: 'Mr-Mime',
          region: 'europe',
          gen: 'Gen 1',
          area: { cs: 'Celá Evropa', en: 'Entire Europe', ja: 'ヨーロッパ全域', ru: 'Вся Европа' },
          note: { cs: 'Běžný ve volné přírodě napříč celou Evropou včetně ČR a Slovenska.', en: 'Common wild spawn across entire Europe including UK and Scandinavia.', ja: 'イギリスや北欧を含むヨーロッパ全域で出現。', ru: 'Обычный дикий спавн по всей Европе.' },
          emoji: '🇪🇺',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Mime-Jr',
          region: 'europe',
          gen: 'Gen 4',
          area: { cs: 'Evropa (5km Vejce)', en: 'Europe (5km Eggs)', ja: 'ヨーロッパ（5kmタマゴ）', ru: 'Европа (5 км яйца)' },
          note: { cs: 'Líhne se výhradně z 5km vajec získaných z evropských Pokéstopů.', en: 'Hatches exclusively from 5km eggs obtained from European PokéStops.', ja: 'ヨーロッパのポケストップから入手した5kmタマゴからのみ孵化。', ru: 'Вылупляется только из 5 км яиц с европейских покестопов.' },
          emoji: '🥚',
          method: { cs: '5km Vejce', en: '5km Eggs', ja: '5kmタマゴ', ru: '5 км яйца' }
        },
        {
          name: 'Klefki',
          region: 'europe',
          gen: 'Gen 6',
          area: { cs: 'Francie & Příhraničí', en: 'France & Border Regions', ja: 'フランスおよび国境周辺', ru: 'Франция и приграничье' },
          note: { cs: 'Francie, Monako, jih Anglie, část Belgie, Švýcarska a severního Španělska.', en: 'France, Monaco, southern UK coast, parts of Belgium, Switzerland, and northern Spain.', ja: 'フランス、モナコ、英国南部沿岸、ベルギー・スイスの一部など。', ru: 'Франция, Монако, юг Англии, части Бельгии и Швейцарии.' },
          emoji: '🇫🇷',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Stonjourner',
          region: 'europe',
          gen: 'Gen 8',
          area: { cs: 'Velká Británie & Irsko', en: 'United Kingdom & Ireland', ja: 'イギリス・アイルランド', ru: 'Великобритания и Ирландия' },
          note: { cs: 'Exkluzivně na Britských ostrovech (Anglie, Skotsko, Wales, Severní Irsko, Irsko).', en: 'Exclusively found on the British Isles (England, Scotland, Wales, Ireland).', ja: 'ブリテン諸島（イングランド、スコットランド、ウェールズ、アイルランド）限定。', ru: 'Эксклюзив Британских островов (Англия, Шотландия, Уэльс, Ирландия).' },
          emoji: '🇬🇧',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },

        // NORTH AMERICA
        {
          name: 'Tauros',
          region: 'north-america',
          gen: 'Gen 1',
          area: { cs: 'USA & Jižní Kanada', en: 'USA & Southern Canada', ja: 'アメリカ・カナダ南部', ru: 'США и Южная Канада' },
          note: { cs: 'Běžný divoký spawn v kontinentálních USA a jižní Kanadě.', en: 'Common wild spawn across continental USA and southern Canada.', ja: 'アメリカ本土およびカナダ南部で野生出現。', ru: 'Обычный дикий спавн в США и на юге Канады.' },
          emoji: '🇺🇸',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Bouffalant',
          region: 'north-america',
          gen: 'Gen 5',
          area: { cs: 'Oblast New York City', en: 'New York City Tri-State', ja: 'ニューヨーク都市圏周辺', ru: 'Окрестности Нью-Йорка' },
          note: { cs: 'New York, New Jersey, Connecticut, východní Pennsylvania, Maryland, DC.', en: 'New York, New Jersey, Connecticut, Eastern PA, Maryland, Delaware, DC.', ja: 'ニューヨーク、ニュージャージー、コネチカットなど東海岸中部に限定。', ru: 'Нью-Йорк, Нью-Джерси, Коннектикут, Мэриленд, Вашингтон.' },
          emoji: '🗽',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Carnivine',
          region: 'north-america',
          gen: 'Gen 4',
          area: { cs: 'Jihovýchod USA', en: 'US Southeast', ja: 'アメリカ南東部', ru: 'Юго-восток США' },
          note: { cs: 'Florida, Georgia, Severní a Jižní Karolína, Alabama.', en: 'Florida, Georgia, North/South Carolina, Alabama.', ja: 'フロリダ州、ジョージア州、カロライナ州、アラバマ州など。', ru: 'Флорида, Джорджия, Каролина, Алабама.' },
          emoji: '🌴',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Pachirisu',
          region: 'north-america',
          gen: 'Gen 4',
          area: { cs: 'Aljaška, Severní Kanada & Sibiř', en: 'Alaska, North Canada & Siberia', ja: 'アラスカ・カナダ北部・シベリア', ru: 'Аляска, Северная Канада и Сибирь' },
          note: { cs: 'Vysoké severní zeměpisné šířky (nad ~52° s.š.).', en: 'High northern latitudes above ~52°N.', ja: '北緯52度以上の高緯度地域に出現。', ru: 'Северные широты выше 52° с.ш.' },
          emoji: '❄️',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Comfey',
          region: 'north-america',
          gen: 'Gen 7',
          area: { cs: 'Havajské ostrovy', en: 'Hawaiian Islands', ja: 'ハワイ諸島', ru: 'Гавайские острова' },
          note: { cs: 'Exkluzivně na Havaji (Oahu, Maui, Big Island, Kauai).', en: 'Exclusive to the state of Hawaii.', ja: 'ハワイ諸島限定で出現。', ru: 'Эксклюзивно на Гавайских островах.' },
          emoji: '🌺',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Hawlucha',
          region: 'north-america',
          gen: 'Gen 6',
          area: { cs: 'Mexiko & Jihovýchod USA', en: 'Mexico & US Border', ja: 'メキシコおよび国境地帯', ru: 'Мексика и приграничье США' },
          note: { cs: 'Celé Mexiko s mírným přesahem do jižního Texasu a Kalifornie.', en: 'Throughout Mexico with slight bleed into southern Texas and SoCal.', ja: 'メキシコ全域およびテキサス・南カリフォルニアの境界部。', ru: 'Вся Мексика и юг Техаса/Калифорнии.' },
          emoji: '🇲🇽',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },

        // LATIN AMERICA & CARIBBEAN
        {
          name: 'Heracross',
          region: 'latin-america',
          gen: 'Gen 2',
          area: { cs: 'Střední & Jižní Amerika', en: 'Central & South America', ja: '中南米全域', ru: 'Центральная и Южная Amerika' },
          note: { cs: 'Jižní Florida (pod 29° s.š.), jižní Texas, Mexiko a celá Jižní Amerika.', en: 'South Florida (below 29°N), South Texas, Mexico, and South America.', ja: '南フロリダ、南テキサス、メキシコ、中南米全域に出現。', ru: 'Южная Флорида, Южный Техас, Мексика и вся Южная Америка.' },
          emoji: '🇧🇷',
          method: { cs: 'Divočina & Mega Raidy', en: 'Wild & Mega Raids', ja: '野生＆メガレイド', ru: 'Дикий спавн и Мега-рейды' }
        },
        {
          name: 'Corsola',
          region: 'latin-america',
          gen: 'Gen 2',
          area: { cs: 'Tropické pobřeží & Karibik', en: 'Tropical Coasts & Caribbean', ja: '熱帯沿岸部・カリブ海', ru: 'Тропические побережья и Карибы' },
          note: { cs: 'Pobřežní oblasti mezi 31° s.š. a 26° j.š. (Florida, Karibik, Bali atd.).', en: 'Coasts between 31°N and 26°S latitudes.', ja: '北緯31度〜南緯26度の熱帯沿岸地域。', ru: 'Прибрежные зоны между 31° с.ш. и 26° ю.ш.' },
          emoji: '🏖️',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Maractus',
          region: 'latin-america',
          gen: 'Gen 5',
          area: { cs: 'Střední Amerika & Karibik', en: 'Central America & Caribbean', ja: '中米・カリブ海・南米北部', ru: 'Центральная Amerika и Карибы' },
          note: { cs: 'Mexiko, Karibské ostrovy, Střední Amerika a sever Jižní Ameriky.', en: 'Mexico, Caribbean, Central America, and northern South America.', ja: 'メキシコ、中米、カリブ海諸島、南米北部。', ru: 'Мексика, Карибы, Центральная Америка.' },
          emoji: '🌵',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Flamigo',
          region: 'latin-america',
          gen: 'Gen 9',
          area: { cs: 'Karibik, Latinská Amerika & Florida', en: 'Caribbean, Latin America & Florida', ja: 'カリブ海・中南米・フロリダ', ru: 'Карибы, Латинская Америка и Флорида' },
          note: { cs: 'Karibik, jižní Florida a tropické zóny Jižní Ameriky.', en: 'Caribbean, South Florida, and tropical South America.', ja: 'カリブ海、南フロリダ、南米の熱帯エリア。', ru: 'Карибы, Южная Флорида и тропики Южной Америки.' },
          emoji: '🦩',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },

        // ASIA & OCEANIA
        {
          name: 'Farfetchd',
          region: 'asia-oceania',
          gen: 'Gen 1',
          area: { cs: 'Východní Asie', en: 'East Asia', ja: '東アジア', ru: 'Восточная Азия' },
          note: { cs: 'Japonsko, Jižní Korea, Tchaj-wan a Hongkong.', en: 'Japan, South Korea, Taiwan, and Hong Kong.', ja: '日本、韓国、台湾、香港で野生出現。', ru: 'Япония, Южная Корея, Тайвань и Гонконг.' },
          emoji: '🇯🇵',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Kangaskhan',
          region: 'asia-oceania',
          gen: 'Gen 1',
          area: { cs: 'Austrálie', en: 'Australia', ja: 'オーストラリア', ru: 'Австралия' },
          note: { cs: 'Běžný ve městech a parcích napříč Austrálií.', en: 'Common in parks and cities across Australia.', ja: 'オーストラリア全土の都市部や公園で出現。', ru: 'Обычен в городах и парках Австралии.' },
          emoji: '🇦🇺',
          method: { cs: 'Divočina & Mega Raidy', en: 'Wild & Mega Raids', ja: '野生＆メガレイド', ru: 'Дикий спавн и Мега-рейды' }
        },
        {
          name: 'Torkoal',
          region: 'asia-oceania',
          gen: 'Gen 3',
          area: { cs: 'Indie & Jihovýchodní Asie', en: 'India & Southeast Asia', ja: 'インド・東南アジア', ru: 'Индия и Юго-Восточная Азия' },
          note: { cs: 'Indie, Pákistán, Thajsko, Vietnam, Malajsie a SAE/Omán.', en: 'India, Pakistan, Thailand, Vietnam, Malaysia, UAE, Oman.', ja: 'インド、パキスタン、タイ、ベトナム、マレーシア、UAEなど。', ru: 'Индия, Пакистан, Таиланд, Вьетнам, Малайзия, ОАЭ.' },
          emoji: '🇮🇳',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Relicanth',
          region: 'asia-oceania',
          gen: 'Gen 3',
          area: { cs: 'Nový Zéland & Pacifické ostrovy', en: 'New Zealand & Pacific Islands', ja: 'ニュージーランド・太平洋諸島', ru: 'Новая Зеландия и острова' },
          note: { cs: 'Nový Zéland, Fidži, Samoa, Vanuatu a Cookovy ostrovy.', en: 'New Zealand, Fiji, Samoa, Vanuatu, and Cook Islands.', ja: 'ニュージーランド、フィジー、サモア、バヌアツなど。', ru: 'Новая Зеландия, Фиджи, Самоа, Вануату.' },
          emoji: '🇳🇿',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Chatot',
          region: 'asia-oceania',
          gen: 'Gen 4',
          area: { cs: 'Jižní polokoule', en: 'Southern Hemisphere', ja: '南半球全域', ru: 'Южное полушарие' },
          note: { cs: 'Všude pod rovníkem (Austrálie, Nový Zéland, jižní Afrika, Jižní Amerika).', en: 'Anywhere below the equator (Australia, NZ, South Africa, South America).', ja: '赤道以南の地域（豪州、NZ、南アフリカ、南米など）。', ru: 'Ниже экватора (Австралия, Южная Африка, Южная Америка).' },
          emoji: '🦜',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },

        // AFRICA & MEDITERRANEAN
        {
          name: 'Tropius',
          region: 'africa',
          gen: 'Gen 3',
          area: { cs: 'Afrika & Středomoří', en: 'Africa & Mediterranean', ja: 'アフリカ・地中海沿岸', ru: 'Африка и Средиземноморье' },
          note: { cs: 'Afrika, Blízký Východ, jih Španělska (Malaga, Gibraltar), Kréta a Kypr.', en: 'Africa, Middle East, southern Spain (Malaga/Gibraltar), Crete, Cyprus.', ja: 'アフリカ、中東、南スペイン（マラガ・ジブラルタル）、キプロスなど。', ru: 'Африка, Ближний Восток, юг Испании (Малага), Кипр.' },
          emoji: '🌍',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Sigilyph',
          region: 'africa',
          gen: 'Gen 5',
          area: { cs: 'Egypt, Řecko & Izrael', en: 'Egypt, Greece & Israel', ja: 'エジプト・ギリシャ・イスラエル', ru: 'Египет, Греция и Израиль' },
          note: { cs: 'Východní Středomoří: Egypt, Řecko, Kypr, Izrael a Jordánsko.', en: 'Eastern Mediterranean: Egypt, Greece, Cyprus, Israel, Jordan.', ja: '東地中海地域（エジプト、ギリシャ、キプロス、イスラエルなど）。', ru: 'Восточное Средиземноморье: Египет, Греция, Кипр, Израиль.' },
          emoji: '🏛️',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },

        // HEMISPHERE & PAIRS
        {
          name: 'Zangoose',
          region: 'hemisphere',
          gen: 'Gen 3',
          area: { cs: 'Evropa, Asie & Austrálie', en: 'Europe, Asia & Australia', ja: '欧州・アジア・豪州', ru: 'Европа, Азия и Австралия' },
          note: { cs: 'Východní polokoule. Rotuje v páru se Seviperem během eventů.', en: 'Eastern Hemisphere. Swaps with Seviper during special events.', ja: '東半球限定。イベント時にハブネークと入れ替わりあり。', ru: 'Восточное полушарие. Ротируется с Севипером.' },
          emoji: '⚔️',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Seviper',
          region: 'hemisphere',
          gen: 'Gen 3',
          area: { cs: 'Severní & Jižní Amerika, Afrika', en: 'Americas & Africa', ja: '南北アメリカ・アフリカ', ru: 'Америка и Африка' },
          note: { cs: 'Západní polokoule. Rotuje v páru se Zangoosem.', en: 'Western Hemisphere. Swaps with Zangoose.', ja: '西半球限定。ザングースと対になる存在。', ru: 'Западное полушарие. Ротируется с Зангусом.' },
          emoji: '🐍',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Heatmor',
          region: 'hemisphere',
          gen: 'Gen 5',
          area: { cs: 'Severní & Jižní Amerika', en: 'Western Hemisphere', ja: '西半球（南北アメリカ）', ru: 'Западное полушарие' },
          note: { cs: 'Americký kontinent. V páru s Durantem (Evropa/Asie/Austrálie).', en: 'Western Hemisphere. Paired with Durant (Eastern Hemisphere).', ja: '西半球限定。アイアントと対になる。', ru: 'Западное полушарие. В паре с Дюрантом.' },
          emoji: '🔥',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Durant',
          region: 'hemisphere',
          gen: 'Gen 5',
          area: { cs: 'Evropa, Asie & Austrálie', en: 'Eastern Hemisphere', ja: '東半球（欧州・アジア・豪州）', ru: 'Восточное полушарие' },
          note: { cs: 'Východní polokoule včetně ČR. V páru s Heatmorem.', en: 'Eastern Hemisphere including Europe. Paired with Heatmor.', ja: '東半球限定。ヨーロッパ・アジア・豪州で出現。', ru: 'Восточное полушарие включая Европу.' },
          emoji: '🐜',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Sawk',
          region: 'hemisphere',
          gen: 'Gen 5',
          area: { cs: 'Evropa, Asie & Austrálie', en: 'Europe, Asia & Australia', ja: '欧州・アジア・豪州', ru: 'Европа, Азия и Австралия' },
          note: { cs: 'Východní polokoule. V páru s Throhem (Ameriky/Afrika).', en: 'Eastern Hemisphere. Paired with Throh (Americas/Africa).', ja: '東半球限定。ナゲキと対になる。', ru: 'Восточное полушарие. В паре с Троу.' },
          emoji: '🥋',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
        {
          name: 'Throh',
          region: 'hemisphere',
          gen: 'Gen 5',
          area: { cs: 'Severní & Jižní Amerika, Afrika', en: 'Americas & Africa', ja: '南北アメリカ・アフリカ', ru: 'Америка и Африка' },
          note: { cs: 'Západní polokoule. V páru se Sawkem.', en: 'Western Hemisphere. Paired with Sawk.', ja: '西半球限定。ダゲキと対になる。', ru: 'Западное полушарие. В паре с Соуком.' },
          emoji: '🥋',
          method: { cs: 'Divočina', en: 'Wild Spawn', ja: '野生', ru: 'В дикой природе' }
        },
      ];

      const filterTabs = [
        { id: 'all', label: { cs: '🌐 Všechny', en: '🌐 All', ja: '🌐 すべて', ru: '🌐 Все' } },
        { id: 'europe', label: { cs: '🇪🇺 Evropa & UK', en: '🇪🇺 Europe & UK', ja: '🇪🇺 ヨーロッパ', ru: '🇪🇺 Европа' } },
        { id: 'north-america', label: { cs: '🇺🇸 Severní Amerika', en: '🇺🇸 North America', ja: '🇺🇸 北米', ru: '🇺🇸 Сев. Америка' } },
        { id: 'latin-america', label: { cs: '🇧🇷 Latinská Amerika', en: '🇧🇷 Latin America', ja: '🇧🇷 中南米', ru: '🇧🇷 Лат. Америка' } },
        { id: 'asia-oceania', label: { cs: '🇯🇵 Asie & Austrálie', en: '🇯🇵 Asia & Oceania', ja: '🇯🇵 アジア・豪州', ru: '🇯🇵 Азия и Океания' } },
        { id: 'africa', label: { cs: '🌍 Afrika & Středomoří', en: '🌍 Africa & Med', ja: '🌍 アフリカ・地中海', ru: '🌍 Африка' } },
        { id: 'hemisphere', label: { cs: '🔄 Polokoule & Páry', en: '🔄 Hemisphere Pairs', ja: '🔄 半球ローテーション', ru: '🔄 Полушария' } },
      ];

      const visiblePokemon = REGIONAL_POKEMON_DATA.filter(p => {
        const matchesCategory = regionalFilter === 'all' || p.region === regionalFilter;
        if (!matchesCategory) return false;
        if (!regionalSearch.trim()) return true;
        const q = regionalSearch.toLowerCase().trim();
        const nameMatch = p.name.toLowerCase().includes(q);
        const areaMatch = (p.area[lang] || p.area.en || '').toLowerCase().includes(q);
        const noteMatch = (p.note[lang] || p.note.en || '').toLowerCase().includes(q);
        return nameMatch || areaMatch || noteMatch;
      });

      return (
        <div className="guide-regional-widget">
          <div className="regional-widget-hero">
            <div className="regional-hero-text">
              <h3>
                {lang === 'cs' ? '🌍 Atlas regionálních Pokémonů (2026)' : lang === 'ja' ? '🌍 地域限定ポケモン図鑑 (2026)' : lang === 'ru' ? '🌍 Атлас региональных покемонов (2026)' : '🌍 Regional Pokémon Atlas (2026)'}
              </h3>
              <p>
                {lang === 'cs' ? 'Kompletní přehled všech 26+ exkluzivních Pokémonů, jejich kontinentálních hranic a způsobů získání.' : lang === 'ja' ? '全地域限定ポケモンの出現エリア、国境、入手方法の完全ガイド。' : lang === 'ru' ? 'Полный список всех эксклюзивных покемонов, границ их спавна и способов получения.' : 'Complete guide to all 26+ regional exclusives, exact spawn boundaries, and acquisition methods.'}
              </p>
            </div>
            <div className="regional-count-badge">
              <span className="regional-count-num">{visiblePokemon.length}</span>
              <span className="regional-count-lbl">{lang === 'cs' ? 'Pokémonů' : 'Pokémon'}</span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="regional-controls">
            <div className="regional-search-bar">
              <Search size={16} className="regional-search-icon" />
              <input
                type="text"
                placeholder={lang === 'cs' ? 'Hledat Pokémona, stát nebo město...' : lang === 'ja' ? 'ポケモン名、国、都市で検索...' : lang === 'ru' ? 'Поиск покемона, страны или города...' : 'Search Pokémon, country, or location...'}
                value={regionalSearch}
                onChange={e => setRegionalSearch(e.target.value)}
                className="regional-search-input"
              />
              {regionalSearch && (
                <button
                  type="button"
                  className="regional-search-clear"
                  onClick={() => setRegionalSearch('')}
                >
                  ✕
                </button>
              )}
            </div>

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

          {/* Cards Grid */}
          <div className="regional-cards-grid">
            {visiblePokemon.map((p, idx) => (
              <div key={idx} className="regional-card">
                <div className="regional-card-header">
                  <div className="regional-card-avatar">
                    <img 
                      src={getPokemonIconUrl(p.name)} 
                      alt={p.name} 
                      onError={(e) => handlePokemonImageError(e.currentTarget, p.name)}
                      loading="lazy"
                    />
                  </div>
                  <div className="regional-card-meta">
                    <div className="regional-card-title-row">
                      <h4>{p.name.replace('-', ' ')}</h4>
                      <span className="regional-flag-pill" title={p.area[lang] || p.area.en}>{p.emoji}</span>
                    </div>
                    <div className="regional-badges-row">
                      <span className="regional-gen-pill">{p.gen}</span>
                      <span className="regional-method-pill">{p.method[lang] || p.method.en}</span>
                    </div>
                  </div>
                </div>

                <div className="regional-card-body">
                  <div className="regional-card-location">
                    <span className="location-icon">📍</span>
                    <span className="location-text">{p.area[lang] || p.area.en}</span>
                  </div>
                  <p className="regional-card-note">{p.note[lang] || p.note.en}</p>
                </div>
              </div>
            ))}
          </div>

          {visiblePokemon.length === 0 && (
            <div className="regional-empty-state">
              <span>🔍</span>
              <p>{lang === 'cs' ? 'Žádný regionální Pokémon neodpovídá zadanému filtru.' : 'No regional Pokémon matches your filter.'}</p>
            </div>
          )}
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
