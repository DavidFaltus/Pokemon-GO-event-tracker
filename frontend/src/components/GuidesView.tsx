import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './GuidesView.css';
import { GUIDES_DATA } from '../data/guidesData';
import { ADVENTURE_EFFECT_ITEMS } from '../data/adventureEffectsData';
import { POKELID_PREFECTURES, SPECIAL_BACKGROUNDS_CATALOG } from '../data/specialBackgroundsData';
import { 
  ALL_POKELIDS, 
  JAPAN_REGIONS, 
  getAllPokelidsList, 
  getPokelidsByPrefecture,
  getPokelidsByRegion,
  type PokelidDetailItem 
} from '../data/pokelidDetailsData';
import { 
  ALL_JAPAN_PREFECTURES_PATHS, 
  PREFECTURE_LOCAL_MAPS, 
  POKELID_MAP_PINS,
  projectCoordinatesToLocalMap 
} from '../data/japanPrefecturesMapData';
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
  ChevronLeft,
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
  RotateCw,
  MapPin,
  X,
  ZoomIn
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
  const [adventureFilter, setAdventureFilter] = useState<'all' | 'time-space' | 'sun-moon' | 'combat'>('all');
  const [pokelidFilter, setPokelidFilter] = useState<'all' | 'full-coverage' | 'hokkaido' | 'tohoku' | 'kanto' | 'chubu' | 'kansai' | 'chugoku' | 'shikoku' | 'kyushu' | 'okinawa'>('all');
  const [selectedPrefectureId, setSelectedPrefectureId] = useState<string>('all');
  const [pokelidSearch, setPokelidSearch] = useState('');
  const [pokelidLidSearch, setPokelidLidSearch] = useState('');
  const [hoveredPrefectureId, setHoveredPrefectureId] = useState<string | null>(null);
  const [hoveredLocalLidId, setHoveredLocalLidId] = useState<string | null>(null);
  const [specialBgFilter, setSpecialBgFilter] = useState<'all' | 'global' | 'go-tour' | 'go-fest' | 'city-safari' | 'heritage'>('all');
  const [specialBgSearch, setSpecialBgSearch] = useState('');

  // Upgraded Lightbox Gallery with Prev/Next and Miniature Thumbnails
  const [lightboxGallery, setLightboxGallery] = useState<{
    items: {
      url: string;
      thumb?: string;
      title: string;
      subtitle?: string;
      badge?: string;
      city?: string;
      prefecture?: string;
      descId?: string;
      lat?: number;
      lng?: number;
    }[];
    currentIndex: number;
  } | null>(null);

  // Backward compatible helper for single-image previews
  const setPreviewModalImg = (data: { url: string; title: string } | null) => {
    if (!data) {
      setLightboxGallery(null);
    } else {
      setLightboxGallery({
        items: [{ url: data.url, thumb: data.url, title: data.title }],
        currentIndex: 0
      });
    }
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lightbox loaded URLs cache & refs
  const [loadedLightboxUrls, setLoadedLightboxUrls] = useState<Set<string>>(() => new Set());
  const thumbStripRef = useRef<HTMLDivElement | null>(null);
  const activeThumbBtnRef = useRef<HTMLButtonElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const markLightboxUrlLoaded = useCallback((url: string) => {
    setLoadedLightboxUrls(prev => {
      if (prev.has(url)) return prev;
      const next = new Set(prev);
      next.add(url);
      return next;
    });
  }, []);

  // Keyboard navigation & body scroll lock support for gallery
  useEffect(() => {
    if (!lightboxGallery) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxGallery(null);
      } else if (e.key === 'ArrowRight' && lightboxGallery.items.length > 1) {
        setLightboxGallery(prev => prev ? {
          ...prev,
          currentIndex: (prev.currentIndex + 1) % prev.items.length
        } : null);
      } else if (e.key === 'ArrowLeft' && lightboxGallery.items.length > 1) {
        setLightboxGallery(prev => prev ? {
          ...prev,
          currentIndex: (prev.currentIndex - 1 + prev.items.length) % prev.items.length
        } : null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxGallery]);

  // Proactively preload current and adjacent images (±1, ±2) for instant switching
  useEffect(() => {
    if (!lightboxGallery || lightboxGallery.items.length === 0) return;
    const items = lightboxGallery.items;
    const cur = lightboxGallery.currentIndex;
    const indicesToPreload = items.length === 1 ? [0] : [
      cur,
      (cur + 1) % items.length,
      (cur - 1 + items.length) % items.length,
      (cur + 2) % items.length,
      (cur - 2 + items.length) % items.length,
    ];

    indicesToPreload.forEach(idx => {
      const url = items[idx]?.url;
      if (url) {
        const img = new Image();
        img.src = url;
        if (img.complete && img.naturalWidth > 0) {
          markLightboxUrlLoaded(url);
        } else {
          img.onload = () => markLightboxUrlLoaded(url);
        }
      }
    });
  }, [lightboxGallery?.currentIndex, lightboxGallery?.items, markLightboxUrlLoaded]);

  // Background gallery warmup: progressively prefetch all lids in the active prefecture during idle time
  useEffect(() => {
    if (!lightboxGallery || lightboxGallery.items.length <= 1) return;
    const timer = setTimeout(() => {
      lightboxGallery.items.forEach(item => {
        if (item.url) {
          const img = new Image();
          img.src = item.url;
          if (img.complete && img.naturalWidth > 0) {
            markLightboxUrlLoaded(item.url);
          } else {
            img.onload = () => markLightboxUrlLoaded(item.url);
          }
        }
      });
    }, 250);
    return () => clearTimeout(timer);
  }, [lightboxGallery?.items, markLightboxUrlLoaded]);

  // Synchronize active thumbnail in bottom strip to center smoothly
  useEffect(() => {
    if (activeThumbBtnRef.current && thumbStripRef.current) {
      const container = thumbStripRef.current;
      const btn = activeThumbBtnRef.current;
      const btnLeft = btn.offsetLeft;
      const btnWidth = btn.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollTarget = btnLeft - (containerWidth / 2) + (btnWidth / 2);
      container.scrollTo({
        left: Math.max(0, scrollTarget),
        behavior: 'smooth'
      });
    }
  }, [lightboxGallery?.currentIndex]);

  // Touch handlers for mobile swipe navigation
  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleLightboxTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || !lightboxGallery || lightboxGallery.items.length <= 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    if (diff > 45) {
      // Swipe right -> Previous
      setLightboxGallery(prev => prev ? {
        ...prev,
        currentIndex: (prev.currentIndex - 1 + prev.items.length) % prev.items.length
      } : null);
    } else if (diff < -45) {
      // Swipe left -> Next
      setLightboxGallery(prev => prev ? {
        ...prev,
        currentIndex: (prev.currentIndex + 1) % prev.items.length
      } : null);
    }
    touchStartXRef.current = null;
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield size={16} />;
      case 'Swords': return <Swords size={16} />;
      case 'Calendar': return <Calendar size={16} />;
      case 'Sparkles': return <Sparkles size={16} />;
      case 'Trophy': return <Trophy size={16} />;
      case 'Globe': return <Globe size={16} />;
      case 'MapPin': return <MapPin size={16} />;
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

    // 5. Adventure Effects Master Interactive Widget
    if (slug === 'adventure-effects-master-guide') {
      const filteredEffects = ADVENTURE_EFFECT_ITEMS.filter(item => {
        if (adventureFilter === 'all') return true;
        return item.category === adventureFilter;
      });

      return (
        <div className="guide-visual-widget guide-adventure-widget">
          <div className="widget-header-row">
            <h3>
              <Sparkles size={20} color="#a855f7" />
              {lang === 'cs' ? 'Interaktivní Roster: Všech 11 Pokémonů s Adventure Effecty' : 'Interactive Roster: All 11 Pokémon with Adventure Effects'}
            </h3>
            <div className="widget-filter-tabs">
              <button 
                className={`widget-tab-btn ${adventureFilter === 'all' ? 'active' : ''}`}
                onClick={() => setAdventureFilter('all')}
              >
                {lang === 'cs' ? 'Všech 11 Pokémonů' : lang === 'ja' ? '全11匹一覧' : lang === 'ru' ? 'Все 11 покемонов' : 'All 11 Pokémon'}
              </button>
              <button 
                className={`widget-tab-btn ${adventureFilter === 'time-space' ? 'active' : ''}`}
                onClick={() => setAdventureFilter('time-space')}
              >
                {lang === 'cs' ? '⏳ Čas & Prostor' : lang === 'ja' ? '⏳ 時間＆空間' : lang === 'ru' ? '⏳ Время и Пространство' : '⏳ Time & Space'}
              </button>
              <button 
                className={`widget-tab-btn ${adventureFilter === 'sun-moon' ? 'active' : ''}`}
                onClick={() => setAdventureFilter('sun-moon')}
              >
                {lang === 'cs' ? '☀️ Slunce & Měsíc' : lang === 'ja' ? '☀️ 太陽＆月' : lang === 'ru' ? '☀️ Солнце и Луна' : '☀️ Sun & Moon'}
              </button>
              <button 
                className={`widget-tab-btn ${adventureFilter === 'combat' ? 'active' : ''}`}
                onClick={() => setAdventureFilter('combat')}
              >
                {lang === 'cs' ? '⚔️ Boj & Chytání' : lang === 'ja' ? '⚔️ 戦闘＆捕獲' : lang === 'ru' ? '⚔️ Бой и Ловля' : '⚔️ Combat & Catch'}
              </button>
            </div>
          </div>

          <div className="guide-adventure-grid">
            {filteredEffects.map((item) => (
              <div key={item.id} className={`guide-adventure-card category-${item.category}`}>
                <div className="adventure-card-top">
                  <div className="adventure-sprite-box">
                    <img 
                      src={item.pokemonSprite} 
                      alt={item.name[lang] || item.name.en} 
                      className="adventure-pokemon-sprite"
                      onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, item.id)}
                      loading="lazy"
                    />
                  </div>
                  <div className="adventure-card-meta">
                    <div className="adventure-name-row">
                      <h4>{item.name[lang] || item.name.en}</h4>
                      <span className="adventure-form-tag">{item.form[lang] || item.form.en}</span>
                    </div>
                    <div className="adventure-type-pills">
                      {item.types.map(t => (
                        <span key={t} className={`poke-type-pill type-${t}`}>{t.toUpperCase()}</span>
                      ))}
                    </div>
                    <div className="adventure-move-row">
                      <span className="adventure-move-pill">
                        <Zap size={12} />
                        <strong>{item.move.name[lang] || item.move.name.en}</strong>
                      </span>
                      <span className="adventure-cost-pill">
                        {item.cost.duration} • {item.cost.stardust} Dust
                      </span>
                    </div>
                  </div>
                </div>

                <div className="adventure-card-body">
                  <div className="adventure-effect-desc">
                    <p>{item.effect[lang] || item.effect.en}</p>
                  </div>
                  <div className="adventure-card-footer">
                    <div className="adventure-stack-info">
                      <Clock size={12} />
                      <span><strong>{lang === 'cs' ? 'Max stack:' : lang === 'ja' ? '最大持続:' : lang === 'ru' ? 'Макс:' : 'Max stack:'}</strong> {item.maxStack[lang] || item.maxStack.en}</span>
                    </div>
                    {item.proTip && (
                      <div className="adventure-pro-tip">
                        <Lightbulb size={13} color="#eab308" />
                        <span>{item.proTip[lang] || item.proTip.en}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Rules Banner */}
          <div className="adventure-rules-box">
            <div className="rules-header">
              <Shield size={16} color="#38bdf8" />
              <strong>{lang === 'cs' ? 'Základní pravidla Adventure Effectů:' : lang === 'ja' ? 'アドベンチャーエフェクト共通ルール：' : lang === 'ru' ? 'Общие правила Adventure Effects:' : 'Universal Adventure Effect Rules:'}</strong>
            </div>
            <div className="rules-grid">
              <div className="rule-item">
                <span className="rule-badge">1. {lang === 'cs' ? 'Pravidlo' : 'Rule'}</span>
                <p>{lang === 'cs' ? 'Pouze 1 aktivní efekt v jeden okamžik (nelze mít aktivní Dialgu i Palkii současně).' : 'Only 1 active effect at a time (cannot run Dialga & Palkia concurrently).'}</p>
              </div>
              <div className="rule-item">
                <span className="rule-badge">2. {lang === 'cs' ? 'Pravidlo' : 'Rule'}</span>
                <p>{lang === 'cs' ? 'Maximální délka prodloužení je 24 hodin v kuse (1 440 minut).' : 'Maximum continuous stacking is capped at 24 hours (1,440 minutes).'}</p>
              </div>
              <div className="rule-item">
                <span className="rule-badge">3. {lang === 'cs' ? 'Pravidlo' : 'Rule'}</span>
                <p>{lang === 'cs' ? 'Mega Evoluce a Primal Reversion fungují současně s Adventure Effecty.' : 'Mega Evolution & Primal Reversion are 100% compatible and stack concurrently.'}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (slug === 'pokelid-stamp-rally-japan-guide') {
      const pokelidFilterTabs = [
        { id: 'all', label: { cs: '🗾 Všechny (482)', en: '🗾 All (482)', ja: '🗾 全国（482）', ru: '🗾 Все (482)' } },
        { id: 'full-coverage', label: { cs: '⭐ 100% Pokrytí (7)', en: '⭐ 100% Coverage (7)', ja: '⭐ 全域コンプ（7）', ru: '⭐ 100% Покрытие (7)' } },
        { id: 'hokkaido', label: { cs: '❄️ Hokkaidó (50)', en: '❄️ Hokkaido (50)', ja: '❄️ 北海道（50）', ru: '❄️ Хоккайдо (50)' } },
        { id: 'tohoku', label: { cs: '🏔️ Tóhoku (128)', en: '🏔️ Tohoku (128)', ja: '🏔️ 東北地方（128）', ru: '🏔️ Тохоку (128)' } },
        { id: 'kanto', label: { cs: '⚡ Kanto (33)', en: '⚡ Kanto (33)', ja: '⚡ 関東地方（33）', ru: '⚡ Канто (33)' } },
        { id: 'chubu', label: { cs: '🦖 Čúbu (57)', en: '🦖 Chubu (57)', ja: '🦖 中部地方（57）', ru: '🦖 Тюбу (57)' } },
        { id: 'kansai', label: { cs: '🦦 Kansai (62)', en: '🦦 Kansai (62)', ja: '🦦 近畿地方（62）', ru: '🦦 Кансай (62)' } },
        { id: 'chugoku', label: { cs: '🏜️ Čúgoku (33)', en: '🏜️ Chugoku (33)', ja: '🏜️ 中国地方（33）', ru: '🏜️ Тюгоку (33)' } },
        { id: 'shikoku', label: { cs: '🍜 Šikoku (41)', en: '🍜 Shikoku (41)', ja: '🍜 四国地方（41）', ru: '🍜 Сикоку (41)' } },
        { id: 'kyushu', label: { cs: '⚡ Kjúšú (61)', en: '⚡ Kyushu (61)', ja: '⚡ 九州地方（61）', ru: '⚡ Кюсю (61)' } },
        { id: 'okinawa', label: { cs: '🌺 Okinawa (17)', en: '🌺 Okinawa (17)', ja: '🌺 沖縄地方（17）', ru: '🌺 Окинава (17)' } },
      ];

      const prefectureNameMap: Record<string, string> = {};
      POKELID_PREFECTURES.forEach(p => {
        prefectureNameMap[p.id] = p.prefecture[lang] || p.prefecture.en;
      });

      // Filtered Prefectures
      const filteredPokelids = POKELID_PREFECTURES.filter(item => {
        if (selectedPrefectureId !== 'all') {
          return item.id === selectedPrefectureId;
        }
        if (pokelidFilter === 'full-coverage' && !item.hasFullCoverage) return false;
        if (pokelidFilter !== 'all' && pokelidFilter !== 'full-coverage') {
          const regionObj = JAPAN_REGIONS.find(r => r.id === pokelidFilter);
          if (regionObj && !regionObj.prefectures.includes(item.id)) return false;
        }
        
        if (pokelidSearch.trim()) {
          const q = pokelidSearch.toLowerCase();
          const matchPref = (item.prefecture[lang] || item.prefecture.en).toLowerCase().includes(q);
          const matchAmb = (item.ambassadorName[lang] || item.ambassadorName.en).toLowerCase().includes(q) || item.ambassadorPokemon.toLowerCase().includes(q);
          const matchTheme = (item.backgroundTheme[lang] || item.backgroundTheme.en).toLowerCase().includes(q);
          if (!matchPref && !matchAmb && !matchTheme) return false;
        }
        return true;
      });

      // Active Lids Resolution
      let activeLidsList: PokelidDetailItem[] = [];
      if (selectedPrefectureId !== 'all') {
        activeLidsList = getPokelidsByPrefecture(selectedPrefectureId);
      } else {
        if (pokelidFilter === 'full-coverage') {
          const fullCoverageIds = POKELID_PREFECTURES.filter(p => p.hasFullCoverage).map(p => p.id);
          activeLidsList = getPokelidsByRegion(fullCoverageIds);
        } else if (pokelidFilter !== 'all') {
          const regionObj = JAPAN_REGIONS.find(r => r.id === pokelidFilter);
          if (regionObj) {
            activeLidsList = getPokelidsByRegion(regionObj.prefectures);
          } else {
            activeLidsList = getAllPokelidsList();
          }
        } else {
          activeLidsList = getAllPokelidsList();
        }
      }

      // Live search filter on municipality lids
      const filteredLids = activeLidsList.filter(lid => {
        if (!pokelidLidSearch.trim()) return true;
        const q = pokelidLidSearch.toLowerCase().trim();
        const matchCity = lid.city.toLowerCase().includes(q);
        const matchCityEn = lid.cityEn.toLowerCase().includes(q);
        const matchId = lid.descId.includes(q);
        const prefName = (prefectureNameMap[lid.prefectureId] || '').toLowerCase();
        return matchCity || matchCityEn || matchId || prefName.includes(q);
      });

      const openPokelidsInLightbox = (lidsList: PokelidDetailItem[], startIndex: number) => {
        const items = lidsList.map((lid, idx) => {
          const prefTitle = prefectureNameMap[lid.prefectureId] || lid.prefectureId;
          const cityTitle = lid.cityEn && lid.cityEn !== lid.city 
            ? `${lid.city} (${lid.cityEn})` 
            : lid.city;
          return {
            url: lid.largeImage,
            thumb: lid.smallImage,
            title: `${cityTitle} — ${prefTitle}`,
            subtitle: `${lang === 'cs' ? 'Poké Lid' : lang === 'ja' ? 'ポケふた' : lang === 'ru' ? 'Люк' : 'Poké Lid'} #${lid.descId} • ${idx + 1} / ${lidsList.length}`,
            badge: `#${lid.descId}`,
            city: cityTitle,
            prefecture: prefTitle,
            descId: lid.descId,
            lat: lid.lat,
            lng: lid.lng
          };
        });
        setLightboxGallery({
          items,
          currentIndex: startIndex
        });
      };

      const selectedPrefItem = POKELID_PREFECTURES.find(p => p.id === selectedPrefectureId);

      return (
        <div className="guide-pokelid-widget">
          {/* Header Banner */}
          <div className="pokelid-hero-banner">
            <div className="pokelid-hero-badge">
              <MapPin size={16} />
              <span>{lang === 'cs' ? 'Japonská oficiální iniciativa Pokémon Local Acts' : lang === 'ja' ? 'ポケモンローカルActs・全国ポケふた' : lang === 'ru' ? 'Японская официальная инициатива Pokémon Local Acts' : 'Official Japanese Pokémon Local Acts'}</span>
            </div>
            <h3>{lang === 'cs' ? 'Poké Lid Stamp Rally & Ambasadoři prefektur' : lang === 'ja' ? 'ポケふたスタンプラリー＆推しポケモン名鑑' : lang === 'ru' ? 'Poké Lid Stamp Rally и покемоны-амбассадоры' : 'Poké Lid Stamp Rally & Regional Ambassadors'}</h3>
            <p>
              {lang === 'cs' 
                ? 'Navštivte skutečné litinové poklopy v Japonsku, sbírejte žlutá razítka v albu Scrapbook a za každé 2 razítka získejte garantovaného Pikachu s lokačním pozadím dané prefektury!' 
                : lang === 'ja'
                ? '実在する世界に1枚のポケふたを巡り、現地スピンで黄色いスタンプを収集。同一県内で2個集めるごとに、限定ロケーション背景付きピカチュウを確定ゲット！'
                : lang === 'ru'
                ? 'Посещайте чугунные люки в Японии, собирайте желтые штампы и за каждые 2 штампа получайте гарантированного Пикачу с фоном префектуры!'
                : 'Explore authentic utility hole covers in Japan, collect Yellow Border stamps in your Scrapbook, and unlock guaranteed Pikachu encounters with exclusive prefectural Location Cards every 2 stamps!'}
            </p>
          </div>

          {/* Stamp Distinction Mechanics Box */}
          <div className="pokelid-stamps-explainer">
            <div className="stamp-card yellow-stamp-card">
              <div className="stamp-badge yellow-badge">
                <span className="stamp-dot yellow-dot" />
                <strong>{lang === 'cs' ? 'ŽLUTÉ RAZÍTKO (Na místě)' : lang === 'ja' ? '黄色いスタンプ（現地スピン）' : lang === 'ru' ? 'ЖЕЛТЫЙ ШТАМП (Личный визит)' : 'YELLOW STAMP (In-Person)'}</strong>
              </div>
              <h4>{lang === 'cs' ? 'Fyzické zatočení v Japonsku' : lang === 'ja' ? '現地でポケストップを直接スピン' : lang === 'ru' ? 'Прокрутка покестопа в Японии' : 'Physical Spin On-Site'}</h4>
              <p>
                {lang === 'cs' 
                  ? 'Získáno POUZE fyzickou přítomností u poklopu v dosahu GPS. POUZE tato razítka se počítají k odměně Pikachu!' 
                  : lang === 'ja' 
                  ? '現地のGPS範囲内でスピンした時のみ獲得。ピカチュウの報酬カウントが進むのはこのスタンプだけ！' 
                  : lang === 'ru' 
                  ? 'Выдается ТОЛЬКО при личном визите к люку. Только эти штампы продвигают награду Пикачу!' 
                  : 'Awarded ONLY by physically spinning within GPS range. ONLY Yellow stamps progress Pikachu encounters!'}
              </p>
              <div className="stamp-status-pill yellow-pill">
                <CheckCircle2 size={14} />
                <span>{lang === 'cs' ? 'Započítává se do odměny (100% platné)' : lang === 'ja' ? 'リワード進行対象（有効）' : lang === 'ru' ? 'Засчитывается в награду' : 'Counts toward reward'}</span>
              </div>
            </div>

            <div className="stamp-card blue-stamp-card">
              <div className="stamp-badge blue-badge">
                <span className="stamp-dot blue-dot" />
                <strong>{lang === 'cs' ? 'MODRÉ RAZÍTKO (Dárek od přítele)' : lang === 'ja' ? '青いスタンプ（ギフト受取）' : lang === 'ru' ? 'СИНИЙ ШТАМП (Подарок от друга)' : 'BLUE STAMP (Friend Gift)'}</strong>
              </div>
              <h4>{lang === 'cs' ? 'Otevření dárku s pohlednicí' : lang === 'ja' ? 'フレンドから届いたポストカードを開封' : lang === 'ru' ? 'Открытие открытки из подарка' : 'Opening Gift Postcards'}</h4>
              <p>
                {lang === 'cs' 
                  ? 'Získáno z pohlednice od přítele. Slouží jako suvenýr v albu. Počítadlo odměn je 0, ale při budoucí osobní návštěvě se upgraduje na žluté!' 
                  : lang === 'ja' 
                  ? 'フレンドのギフトから記録。コレクション用（カウント0）。後日現地へ行けば黄色に自動昇格！' 
                  : lang === 'ru' 
                  ? 'Заносится в альбом на память. Не дает прогресса (0), но при личном визите станет желтым!' 
                  : 'Acquired from friend gifts. Souvenir only (0 progress). Automatically upgrades to Yellow upon future physical visits!'}
              </p>
              <div className="stamp-status-pill blue-pill">
                <span>{lang === 'cs' ? 'Suvenýr (0 bodů do odměny)' : lang === 'ja' ? '記念用（進行カウント0）' : lang === 'ru' ? 'Сувенир (0 в награду)' : 'Souvenir (0 progress)'}</span>
              </div>
            </div>
          </div>

          {/* Reward Banner */}
          <div className="pokelid-reward-callout">
            <div className="reward-icon-frame">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" 
                alt="Pikachu" 
                className="reward-pikachu-img" 
              />
            </div>
            <div className="reward-callout-text">
              <span className="reward-tag">🎁 {lang === 'cs' ? 'Garantovaná Odměna' : lang === 'ja' ? '確定リワード遭遇' : lang === 'ru' ? 'Гарантированная награда' : 'Guaranteed Encounter'}</span>
              <h4>{lang === 'cs' ? 'Každá 2 Žlutá Razítka = Pikachu s Lokačním Pozadím' : lang === 'ja' ? '黄色いスタンプ2個ごとに限定背景ピカチュウ確定！' : lang === 'ru' ? 'Каждые 2 желтых штампа = Пикачу с фоном локации' : 'Every 2 Yellow Stamps = Location Background Pikachu'}</h4>
              <p>
                {lang === 'cs' 
                  ? 'Střetnutí s Pikachu, který má na obrazovce shrnutí originální umělecké pozadí dané prefektury. Může být Shiny! Opakovatelné bez omezení.' 
                  : lang === 'ja' 
                  ? '詳細画面にご当地の名所が描かれた限定背景ピカチュウが出現！色違い判定あり、回数無制限で何度でも獲得可能。' 
                  : lang === 'ru' 
                  ? 'Пикачу с уникальным фоном префектуры на экране. Может быть Shiny! Безлимитный сбор.' 
                  : 'Encounter Pikachu bearing custom regional backdrop art. Can be Shiny! Fully repeatable without cap.'}
              </p>
            </div>
          </div>

          {/* Interactive Japan Poké Lids Map Card */}
          <div className="pokelid-interactive-map-card">
            <div className="map-card-header">
              <div className="map-title-badge">
                <MapPin size={15} />
                <span>{lang === 'cs' ? 'Interaktivní Mapa & Regiony' : lang === 'ja' ? 'インタラクティブ日本地図' : lang === 'ru' ? 'Интерактивная карта Японии' : 'Interactive Japan Map'}</span>
              </div>
              <h3>
                {selectedPrefectureId === 'all'
                  ? (lang === 'cs' ? 'Mapa Poké Lids v Japonsku (47 prefektur)' : lang === 'ja' ? '全国47都道府県ポケふた設置マップ' : lang === 'ru' ? 'Карта люков Poké Lids в Японии (47 префектур)' : 'Japan Poké Lids Map (47 Prefectures)')
                  : (selectedPrefItem ? `${selectedPrefItem.prefecture[lang] || selectedPrefItem.prefecture.en} — ${lang === 'cs' ? 'Detailní mapa poklopů' : lang === 'ja' ? '地域詳細マップ' : lang === 'ru' ? 'Подробная карта люков' : 'Municipality Map'}` : 'Poké Lids Map')
                }
              </h3>
              <p>
                {selectedPrefectureId === 'all'
                    ? (lang === 'cs' 
                    ? 'Prohlédněte si všech 47 prefektur Japonska. 42 aktivních prefektur má vlastní oficiální Poké Lids (482 poklopů). Kliknutím na prefekturu na mapě nebo v rychlém výběru níže otevřete její detail se všemi umístěnými poklopy.' 
                    : lang === 'ja' 
                    ? '日本全国47都道府県の境界を正確に表示。ポケふたが配備された42都道府県をクリックすると、設置位置をプロットした詳細マップが開きます。' 
                    : lang === 'ru' 
                    ? 'Все 47 префектур Японии. Нажмите на любую из 42 префектур с люками Poké Lids для перехода к подробной карте с точным расположением.' 
                    : 'Explore all 47 Japanese prefectures. Click any of the 42 official prefectures with Poké Lids to zoom into high-detail vector map with exact lid coordinates.')
                  : (lang === 'cs'
                    ? 'Všechny poklopy jsou umístěny na reálných GPS souřadnicích. Kliknutím na poklop na mapě otevřete jeho detail ve vysokém rozlišení nebo navigaci v Google Maps.'
                    : lang === 'ja'
                    ? 'すべてのポケふたが実際のGPS座標に正確に配置されています。ピンをクリックすると高解像度ビューが起動します。'
                    : lang === 'ru'
                    ? 'Все люки нанесены на карту по реальным координатам GPS. Нажмите на люк для детального просмотра и навигации.'
                    : 'All Poké Lids plotted at verified real-world GPS coordinates. Click any lid pin on the map to inspect in full resolution or navigate.')
                }
              </p>

              {/* Stats Bar */}
              <div className="map-stats-strip">
                <div className="map-stat-badge">
                  <span className="stat-num">{selectedPrefectureId === 'all' ? getAllPokelidsList().length : activeLidsList.length}</span>
                  <span className="stat-label">{lang === 'cs' ? 'Litinových poklopů' : lang === 'ja' ? '設置ポケふた' : lang === 'ru' ? 'Люков' : 'Poké Lids'}</span>
                </div>
                <div className="map-stat-badge">
                  <span className="stat-num">{selectedPrefectureId === 'all' ? POKELID_PREFECTURES.length : '1'}</span>
                  <span className="stat-label">{lang === 'cs' ? 'Aktivních prefektur' : lang === 'ja' ? '参加都道府県' : lang === 'ru' ? 'Префектур' : 'Prefectures'}</span>
                </div>
                {selectedPrefItem?.hasFullCoverage ? (
                  <div className="map-stat-badge highlight-stat">
                    <span className="stat-num">⭐ 100%</span>
                    <span className="stat-label">{lang === 'cs' ? 'Plné pokrytí obcí' : lang === 'ja' ? '市町村全域コンプ' : lang === 'ru' ? '100% Покрытие' : '100% Coverage'}</span>
                  </div>
                ) : (
                  <div className="map-stat-badge highlight-stat">
                    <span className="stat-num">⭐ 7</span>
                    <span className="stat-label">{lang === 'cs' ? '100% Pokrytí obcí' : lang === 'ja' ? '全域配備完了' : lang === 'ru' ? '100% Покрытие' : '100% Coverage'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Region Selector Pills (in National Map Mode) */}
            {selectedPrefectureId === 'all' ? (
              <div className="map-region-filter-pills">
                {pokelidFilterTabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`map-region-pill ${pokelidFilter === tab.id ? 'active' : ''}`}
                    onClick={() => {
                      setPokelidFilter(tab.id as any);
                    }}
                  >
                    {tab.label[lang] || tab.label.en}
                  </button>
                ))}
              </div>
            ) : (
              /* Prefecture Detail Navigation Header */
              <div className="local-map-nav-header">
                <button
                  className="local-back-to-japan-btn"
                  onClick={() => setSelectedPrefectureId('all')}
                >
                  <ArrowLeft size={16} />
                  <span>{lang === 'cs' ? 'Zpět na celou mapu Japonska' : lang === 'ja' ? '全国マップに戻る' : lang === 'ru' ? 'Назад ко всей карте' : 'Back to Japan Map'}</span>
                </button>
                {selectedPrefItem && (
                  <div className="local-header-title-badge">
                    <img 
                      src={getPokemonIconUrl(selectedPrefItem.ambassadorPokemon)} 
                      alt={selectedPrefItem.ambassadorName[lang] || selectedPrefItem.ambassadorName.en}
                      className="local-ambassador-badge-avatar"
                      onError={(e) => handlePokemonImageError(e.currentTarget, selectedPrefItem.ambassadorPokemon)}
                    />
                    <span className="local-header-pref-name">{selectedPrefItem.prefecture[lang] || selectedPrefItem.prefecture.en}</span>
                    <span className="local-header-count-tag">{activeLidsList.length} {lang === 'cs' ? 'poklopů' : lang === 'ja' ? '枚' : lang === 'ru' ? 'люков' : 'lids'}</span>
                  </div>
                )}
              </div>
            )}

            {/* SVG Visual Map Container */}
            <div className="pokelid-svg-viewport">
              {selectedPrefectureId === 'all' ? (
                /* NATIONAL MAP: Accurate 47 Prefectures Boundaries */
                <svg viewBox="15 15 580 465" className="pokelid-japan-svg" preserveAspectRatio="xMidYMid meet">
                  {/* All 47 Japanese Prefectures */}
                  <g className="map-all-prefectures-layer">
                    {ALL_JAPAN_PREFECTURES_PATHS.map(pref => {
                      if (pref.id === 'okinawa') return null; // Rendered in dedicated inset box in top-left corner
                      const isPokelidPref = pref.hasPokelid;
                      const isHovered = hoveredPrefectureId === pref.id;
                      const prefName = pref.name[lang] || pref.name.en;
                      const isRegionActive = 
                        (pokelidFilter === 'hokkaido' && pref.id === 'hokkaido') ||
                        (pokelidFilter === 'tohoku' && ['iwate', 'miyagi', 'fukushima'].includes(pref.id)) ||
                        (pokelidFilter === 'chubu' && pref.id === 'fukui') ||
                        (pokelidFilter === 'kansai' && pref.id === 'mie') ||
                        (pokelidFilter === 'chugoku' && pref.id === 'tottori') ||
                        (pokelidFilter === 'shikoku' && ['kagawa', 'kochi'].includes(pref.id)) ||
                        (pokelidFilter === 'kyushu' && ['nagasaki', 'miyazaki', 'kagoshima'].includes(pref.id)) ||
                        (pokelidFilter === 'full-coverage' && ['miyagi', 'kagawa', 'tottori', 'miyazaki'].includes(pref.id));

                      return (
                        <path
                          key={pref.id}
                          d={pref.path}
                          className={`map-pref-path ${isPokelidPref ? 'has-pokelid' : 'subtle-prefecture'} ${isRegionActive ? 'region-highlighted' : ''} ${isHovered ? 'is-hovered' : ''}`}
                          onMouseEnter={() => {
                            if (isPokelidPref) setHoveredPrefectureId(pref.id);
                          }}
                          onMouseLeave={() => {
                            if (isPokelidPref) setHoveredPrefectureId(null);
                          }}
                          onClick={() => {
                            if (isPokelidPref) {
                              setSelectedPrefectureId(pref.id);
                              const el = document.getElementById('pokelid-gallery-anchor');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          style={{ cursor: isPokelidPref ? 'pointer' : 'default' }}
                        >
                          <title>{prefName}{isPokelidPref ? ` • ${pref.pokelidCount} Poké Lids (${lang === 'cs' ? 'Kliknutím zobrazit detail' : 'Click to view detail'})` : ''}</title>
                        </path>
                      );
                    })}
                  </g>

                  {/* Okinawa Inset Box (Moved to Top-Left Corner) */}
                  <g 
                    className={`map-okinawa-inset-group ${hoveredPrefectureId === 'okinawa' ? 'is-hovered' : ''}`}
                    onMouseEnter={() => setHoveredPrefectureId('okinawa')}
                    onMouseLeave={() => setHoveredPrefectureId(null)}
                    onClick={() => {
                      setSelectedPrefectureId('okinawa');
                      const el = document.getElementById('pokelid-gallery-anchor');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <rect x="24" y="24" width="120" height="92" rx="10" className="map-okinawa-box" />
                    <text x="32" y="40" className="map-inset-tag">OKINAWA / 沖縄</text>
                    <g 
                      transform="translate(28, 40) scale(0.15)" 
                    >
                      <path 
                        d={PREFECTURE_LOCAL_MAPS['okinawa']?.path} 
                        className={`map-pref-path has-pokelid okinawa-inset-path ${pokelidFilter === 'okinawa' ? 'region-highlighted' : ''} ${hoveredPrefectureId === 'okinawa' ? 'is-hovered' : ''}`} 
                      >
                        <title>Okinawa (17 Poké Lids)</title>
                      </path>
                    </g>
                  </g>

                  {/* Connecting rally routes */}
                  <path 
                    d="M 475,95 L 424,215 L 415,245 L 390,276 L 291,323 L 303,362 L 237,335 L 241,364 L 223,395 L 132,393 L 180,425 L 155,451" 
                    className="map-route-line" 
                  />
                  <path 
                    d="M 155,451 C 60,420 30,220 84,116" 
                    className="map-route-line map-route-okinawa-line" 
                  />

                  {/* Subtle location markers for Pokélid Prefectures (when not hovered) */}
                  {POKELID_MAP_PINS.map(pin => {
                    if (hoveredPrefectureId === pin.id) return null;
                    return (
                      <g 
                        key={`subtle-dot-${pin.id}`} 
                        transform={`translate(${pin.x}, ${pin.y})`}
                        className="map-subtle-dot-group"
                        style={{ pointerEvents: 'none' }}
                      >
                        <circle r="4" className="pin-subtle-dot-halo" />
                        <circle r="2.5" className="pin-subtle-dot-center" />
                      </g>
                    );
                  })}

                  {/* Regional Pokémon Pin: Revealed ONLY on hover over a specific prefecture */}
                  {hoveredPrefectureId && (() => {
                    const activePin = POKELID_MAP_PINS.find(p => p.id === hoveredPrefectureId);
                    if (!activePin) return null;
                    const labelText = activePin.label[lang] || activePin.label.en;
                    const prefData = POKELID_PREFECTURES.find(p => p.id === activePin.id);
                    const ambName = prefData ? (prefData.ambassadorName[lang] || prefData.ambassadorName.en) : activePin.pokemon;
                    const fullLabel = `${labelText} • ${ambName}`;

                    return (
                      <g 
                        key={`hovered-pin-${activePin.id}`} 
                        className="map-pin-group hovered"
                        transform={`translate(${activePin.x}, ${activePin.y})`}
                        style={{ pointerEvents: 'none' }}
                      >
                        <circle r="24" className="pin-pulse-ring" />
                        <circle r="18" className="pin-circle" />
                        <image 
                          href={getPokemonIconUrl(activePin.pokemon)} 
                          x="-15" 
                          y="-15" 
                          width="30" 
                          height="30" 
                          className="pin-pokemon-img"
                        />
                        {/* Label Badge */}
                        <g transform="translate(0, 26)">
                          <rect 
                            x={-fullLabel.length * 4.2 - 12} 
                            y="-9" 
                            width={fullLabel.length * 8.4 + 24} 
                            height="18" 
                            rx="9" 
                            className="pin-label-bg" 
                          />
                          <text textAnchor="middle" y="4" className="pin-label-text">
                            {fullLabel}
                          </text>
                        </g>
                        {/* Count Pill */}
                        <text textAnchor="middle" y="44" className="pin-count-text">
                          {activePin.count} 🕳️ {lang === 'cs' ? 'poklopů' : lang === 'ja' ? '枚' : lang === 'ru' ? 'люков' : 'lids'}
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              ) : (
                /* LOCAL PREFECTURE DETAIL MAP WITH PLOTTED POKÉ LIDS */
                <div className="local-prefecture-map-wrapper">
                  {PREFECTURE_LOCAL_MAPS[selectedPrefectureId] && (
                    <svg viewBox="0 0 500 400" className="pokelid-local-prefecture-svg" preserveAspectRatio="xMidYMid meet">
                      <defs>
                        <clipPath id="localLidPinClip">
                          <circle cx="0" cy="0" r="14" />
                        </clipPath>
                        <filter id="localPinShadow" x="-30%" y="-30%" width="160%" height="160%">
                          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.7" />
                        </filter>
                      </defs>

                      {/* Prefecture Boundary Polygon */}
                      <path 
                        d={PREFECTURE_LOCAL_MAPS[selectedPrefectureId].path} 
                        className="local-prefecture-boundary-path" 
                      />

                      {/* Plotted Poké Lids at Real GPS Positions (Covers only, names/numbers hidden until hover) */}
                      {activeLidsList.map((lid, idx) => {
                        const { x, y } = projectCoordinatesToLocalMap(lid.lat, lid.lng, PREFECTURE_LOCAL_MAPS[selectedPrefectureId]);
                        const isLidHovered = hoveredLocalLidId === lid.id;
                        const cityDisplay = lid.cityEn && lid.cityEn !== lid.city ? `${lid.city} (${lid.cityEn})` : lid.city;
                        return (
                          <g
                            key={lid.id}
                            className={`local-lid-pin-group ${isLidHovered ? 'is-hovered' : ''}`}
                            transform={`translate(${x}, ${y})`}
                            onMouseEnter={() => setHoveredLocalLidId(lid.id)}
                            onMouseLeave={() => setHoveredLocalLidId(null)}
                            onClick={() => {
                              openPokelidsInLightbox(activeLidsList, idx);
                            }}
                            tabIndex={0}
                            role="button"
                            aria-label={`#${lid.descId} • ${cityDisplay}`}
                          >
                            <title>{`#${lid.descId} • ${cityDisplay} (GPS: ${lid.lat.toFixed(4)}, ${lid.lng.toFixed(4)})`}</title>

                            {/* Invisible Stable Hit-Test Target: Guarantees stable mouse interaction without jitter */}
                            <circle r="22" fill="transparent" stroke="none" className="local-lid-hit-target" />

                            {/* Visual Scaled Pin Container */}
                            <g className="local-lid-pin-visual" transform={isLidHovered ? 'scale(1.25)' : 'scale(1)'}>
                              {/* Halo / Base circle */}
                              <circle r="17" className="local-lid-pin-halo" />
                              <circle r="15" className="local-lid-pin-bg" />

                              {/* Circular Cover Thumbnail */}
                              <image
                                href={lid.smallImage}
                                x="-14"
                                y="-14"
                                width="28"
                                height="28"
                                clipPath="url(#localLidPinClip)"
                                className="local-lid-cover-image"
                              />
                            </g>
                          </g>
                        );
                      })}

                      {/* Topmost Floating Tooltip for Hovered Lid (Renders above all pins) */}
                      {hoveredLocalLidId && (() => {
                        const lid = activeLidsList.find(l => l.id === hoveredLocalLidId);
                        if (!lid) return null;
                        const { x, y } = projectCoordinatesToLocalMap(lid.lat, lid.lng, PREFECTURE_LOCAL_MAPS[selectedPrefectureId]);
                        const cityDisplay = lid.cityEn && lid.cityEn !== lid.city ? `${lid.city} (${lid.cityEn})` : lid.city;
                        return (
                          <g
                            className="local-lid-active-overlay"
                            transform={`translate(${x}, ${y})`}
                            style={{ pointerEvents: 'none' }}
                          >
                            {/* Active Glowing Ring */}
                            <circle r="20" className="local-lid-active-ring" />

                            {/* Prominent #ID Badge above Pin */}
                            <g transform="translate(0, -22)">
                              <rect
                                x={-String(lid.descId).length * 4.5 - 10}
                                y="-8"
                                width={String(lid.descId).length * 9 + 20}
                                height="16"
                                rx="8"
                                className="local-lid-id-rect"
                              />
                              <text textAnchor="middle" y="4" className="local-lid-id-text">
                                #{lid.descId}
                              </text>
                            </g>

                            {/* City Label Below */}
                            <g transform="translate(0, 26)">
                              <rect
                                x={-Math.min(cityDisplay.length * 4 + 10, 80)}
                                y="-8"
                                width={Math.min(cityDisplay.length * 8 + 20, 160)}
                                height="16"
                                rx="8"
                                className="local-lid-city-rect"
                              />
                              <text textAnchor="middle" y="4" className="local-lid-city-text">
                                {cityDisplay}
                              </text>
                            </g>
                          </g>
                        );
                      })()}
                    </svg>
                  )}
                </div>
              )}
            </div>

            {/* 13 Prefecture Quick Selector Chips */}
            <div className="map-prefecture-chips-strip">
              <span className="chips-title">{lang === 'cs' ? 'Rychlý výběr prefektury:' : lang === 'ja' ? '都道府県クイック選択：' : lang === 'ru' ? 'Быстрый выбор:' : 'Select Prefecture:'}</span>
              <div className="chips-container">
                <button
                  className={`pref-chip-btn ${selectedPrefectureId === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedPrefectureId('all')}
                >
                  <span>🗾 {lang === 'cs' ? 'Všechny (337)' : lang === 'ja' ? '全国（337）' : lang === 'ru' ? 'Все (337)' : 'All (337)'}</span>
                </button>
                {POKELID_PREFECTURES.map(pref => {
                  const isChipActive = selectedPrefectureId === pref.id;
                  return (
                    <button
                      key={pref.id}
                      className={`pref-chip-btn ${isChipActive ? 'active' : ''}`}
                      onMouseEnter={() => setHoveredPrefectureId(pref.id)}
                      onMouseLeave={() => setHoveredPrefectureId(null)}
                      onClick={() => {
                        setSelectedPrefectureId(pref.id);
                        const el = document.getElementById('pokelid-gallery-anchor');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <img 
                        src={getPokemonIconUrl(pref.ambassadorPokemon)} 
                        alt={pref.ambassadorName[lang] || pref.ambassadorName.en}
                        className="pref-chip-avatar"
                        onError={(e) => handlePokemonImageError(e.currentTarget, pref.ambassadorPokemon)}
                      />
                      <span>{pref.prefecture[lang] || pref.prefecture.en}</span>
                      <span className="pref-chip-count">{pref.manholeCount}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Prefecture Showcase or All Prefectures Cards */}
          <div className="pokelid-grid">
            {filteredPokelids.map(item => (
              <div key={item.id} className={`pokelid-card ${selectedPrefectureId === item.id ? 'highlighted-prefecture' : ''}`}>
                <div className="pokelid-card-header">
                  <div className="pokelid-pref-title">
                    <h4>{item.prefecture[lang] || item.prefecture.en}</h4>
                    <span className="pokelid-region-badge">{item.region[lang] || item.region.en}</span>
                  </div>
                  {item.hasFullCoverage && (
                    <span className="pokelid-coverage-badge" title="100% municipal coverage">
                      ⭐ 100% {lang === 'cs' ? 'Pokrytí' : lang === 'ja' ? '全域配備' : lang === 'ru' ? 'Покрытие' : 'Coverage'}
                    </span>
                  )}
                </div>

                <div className="pokelid-ambassador-row">
                  <div className="pokelid-avatar-frame">
                    <img
                      src={getPokemonIconUrl(item.ambassadorPokemon)}
                      alt={item.ambassadorName[lang] || item.ambassadorName.en}
                      className="pokelid-avatar-img"
                      onError={(e) => handlePokemonImageError(e.currentTarget, item.ambassadorPokemon)}
                    />
                  </div>
                  <div className="pokelid-ambassador-info">
                    <span className="pokelid-amb-label">{lang === 'cs' ? 'Oficiální Ambasador' : lang === 'ja' ? '推しポケモン' : lang === 'ru' ? 'Амбассадор' : 'Official Ambassador'}</span>
                    <strong>{item.ambassadorName[lang] || item.ambassadorName.en}</strong>
                    <span className="pokelid-count-pill">{item.manholeCount} {lang === 'cs' ? 'poklopů Poké Lids' : lang === 'ja' ? '箇所のポケふた' : lang === 'ru' ? 'люков' : 'Poké Lids'}</span>
                  </div>
                </div>

                {/* Visual Card Artwork Showcase */}
                <div className="pokelid-visual-showcase">
                  {item.locationCardUrl && (
                    <div 
                      className="pokelid-card-frame" 
                      title={lang === 'cs' ? 'Kliknutím zvětšit herní pozadí' : 'Click to enlarge in-game card'}
                      onClick={() => setLightboxGallery({
                        items: [{
                          url: item.locationCardUrl!,
                          thumb: item.locationCardUrl!,
                          title: `${item.prefecture[lang] || item.prefecture.en} — ${lang === 'cs' ? 'Herní Lokační Pozadí' : 'In-game Location Background'}`,
                          subtitle: lang === 'cs' ? 'Odměna za 2 žlutá razítka' : 'Reward for 2 Yellow Stamps'
                        }],
                        currentIndex: 0
                      })}
                    >
                      <img 
                        src={item.locationCardUrl} 
                        alt={`${item.prefecture[lang] || item.prefecture.en} Location Background`} 
                        className="pokelid-card-img" 
                        loading="lazy" 
                      />
                      <span className="visual-badge card-badge">📱 {lang === 'cs' ? 'Herní pozadí' : 'Location Card'}</span>
                      <span className="visual-zoom-indicator"><ZoomIn size={12} /></span>
                    </div>
                  )}
                  {item.manholeImageUrl && (
                    <div 
                      className="pokelid-manhole-frame" 
                      title={lang === 'cs' ? 'Kliknutím zvětšit oficiální poklop' : 'Click to enlarge Poké Lid cover'}
                      onClick={() => {
                        const lids = getPokelidsByPrefecture(item.id);
                        if (lids.length > 0) {
                          openPokelidsInLightbox(lids, 0);
                        } else {
                          setLightboxGallery({
                            items: [{
                              url: item.manholeImageUrl!,
                              thumb: item.manholeImageUrl!,
                              title: `${item.prefecture[lang] || item.prefecture.en} — ${lang === 'cs' ? 'Oficiální Poklop Poké Lid' : 'Official Poké Lid Manhole Cover'}`,
                              subtitle: `${item.manholeCount} ${lang === 'cs' ? 'poklopů' : 'lids'}`
                            }],
                            currentIndex: 0
                          });
                        }
                      }}
                    >
                      <img 
                        src={item.manholeImageUrl} 
                        alt={`${item.prefecture[lang] || item.prefecture.en} Poké Lid`} 
                        className="pokelid-manhole-img" 
                        loading="lazy" 
                      />
                      <span className="visual-badge manhole-badge">🕳️ {lang === 'cs' ? 'Oficiální Poklop' : 'Poké Lid'}</span>
                      <span className="visual-zoom-indicator"><ZoomIn size={12} /></span>
                    </div>
                  )}
                </div>

                <p className="pokelid-rationale">
                  {item.culturalRationale[lang] || item.culturalRationale.en}
                </p>

                <div className="pokelid-bg-theme-row">
                  <span className="bg-theme-label">{lang === 'cs' ? 'Vzhled Lokačního pozadí:' : lang === 'ja' ? 'ロケーション背景テーマ：' : lang === 'ru' ? 'Тема фона локации:' : 'Location Card Motif:'}</span>
                  <p className="bg-theme-text">{item.backgroundTheme[lang] || item.backgroundTheme.en}</p>
                </div>

                <div className="pokelid-card-footer">
                  <button 
                    className="pokelid-view-lids-btn"
                    onClick={() => {
                      setSelectedPrefectureId(item.id);
                      const el = document.getElementById('pokelid-gallery-anchor');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span>🕳️ {lang === 'cs' ? `Zobrazit všech ${item.manholeCount} poklopů` : lang === 'ja' ? `全${item.manholeCount}枚のポケふたを見る` : lang === 'ru' ? `Смотреть все ${item.manholeCount} люков` : `View all ${item.manholeCount} Poké Lids`}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* DEDICATED POKÉ LID EXPLORER GALLERY */}
          <div id="pokelid-gallery-anchor" className="pokelid-lids-explorer-section">
            <div className="explorer-header">
              <div className="explorer-header-left">
                <div className="explorer-badge">
                  <Sparkles size={14} />
                  <span>{lang === 'cs' ? 'Katalog všech poklopů' : lang === 'ja' ? 'ポケふた一覧図鑑' : lang === 'ru' ? 'Каталог люков' : 'Poké Lids Catalog'}</span>
                </div>
                <h3>
                  {selectedPrefItem 
                    ? `${selectedPrefItem.prefecture[lang] || selectedPrefItem.prefecture.en} — ${selectedPrefItem.manholeCount} ${lang === 'cs' ? 'originálních poklopů' : lang === 'ja' ? '枚のポケふた' : lang === 'ru' ? 'оригинальных люков' : 'Authentic Poké Lids'}`
                    : `${lang === 'cs' ? 'Všech 337 originálních poklopů Poké Lids' : lang === 'ja' ? '全国337枚のポケふた一覧' : lang === 'ru' ? 'Все 337 люков Poké Lids' : 'All 337 Japan Poké Lids'}`
                  }
                </h3>
                <p className="explorer-subtitle">
                  {lang === 'cs'
                    ? 'Kliknutím na kterýkoliv poklop otevřete detailní zobrazení ve vysokém rozlišení s možností plynulého listování šipkami (← / →) a spodním pásem miniatur.'
                    : lang === 'ja'
                    ? 'サムネイルをクリックすると高解像度ビューが開き、矢印キーや下のミニチュア一覧で快適にスライド閲覧できます。'
                    : lang === 'ru'
                    ? 'Нажмите на любой люк, чтобы открыть просмотр в высоком разрешении с перелистыванием стрелками и лентой миниатюр.'
                    : 'Click any Poké Lid thumbnail to open high-resolution modal with arrow key navigation (← / →) and thumbnail preview strip.'}
                </p>
              </div>

              {/* Action: Open Lightbox from beginning */}
              {filteredLids.length > 0 && (
                <button
                  className="explorer-fullscreen-btn"
                  onClick={() => openPokelidsInLightbox(filteredLids, 0)}
                >
                  <ZoomIn size={16} />
                  <span>{lang === 'cs' ? 'Prohlížet ve velkém (Spustit galerii)' : lang === 'ja' ? '大画面ギャラリーを起動' : lang === 'ru' ? 'Открыть галерею во весь экран' : 'Open Fullscreen Gallery'}</span>
                </button>
              )}
            </div>

            {/* Search within Municipality Lids */}
            <div className="explorer-search-bar">
              <Search size={16} color="#94a3b8" />
              <input
                type="text"
                placeholder={lang === 'cs' ? 'Hledat město nebo obec (např. Sendai, Betsukai, Naha)...' : lang === 'ja' ? '市区町村名で検索（例：仙台市、別海町、那覇市）...' : lang === 'ru' ? 'Поиск города или муниципалитета (напр. Sendai, Naha)...' : 'Search municipality (e.g. Sendai, Betsukai, Naha)...'}
                value={pokelidLidSearch}
                onChange={e => setPokelidLidSearch(e.target.value)}
              />
              {pokelidLidSearch && (
                <button className="clear-search-btn" onClick={() => setPokelidLidSearch('')}>
                  <X size={14} />
                </button>
              )}
              <span className="lids-count-tag">
                {filteredLids.length} {lang === 'cs' ? 'poklopů' : lang === 'ja' ? '枚' : lang === 'ru' ? 'люков' : 'lids'}
              </span>
            </div>

            {/* Poké Lids Grid */}
            {filteredLids.length === 0 ? (
              <div className="pokelid-empty-search">
                <p>{lang === 'cs' ? 'Žádné poklopy neodpovídají zadanému filtru.' : lang === 'ja' ? '該当するポケふたが見つかりませんでした。' : lang === 'ru' ? 'По вашему запросу ничего не найдено.' : 'No Poké Lids matched your search query.'}</p>
                <button className="reset-filter-btn" onClick={() => { setPokelidLidSearch(''); setSelectedPrefectureId('all'); setPokelidFilter('all'); }}>
                  {lang === 'cs' ? 'Zobrazit všechny poklopy' : lang === 'ja' ? '全ポケふたを表示' : lang === 'ru' ? 'Показать все' : 'Show All Poké Lids'}
                </button>
              </div>
            ) : (
              <div className="pokelid-lids-grid">
                {filteredLids.map((lid, idx) => {
                  const prefTitle = prefectureNameMap[lid.prefectureId] || lid.prefectureId;
                  const cityDisplay = lid.cityEn && lid.cityEn !== lid.city 
                    ? `${lid.city} (${lid.cityEn})` 
                    : lid.city;
                  return (
                    <div 
                      key={lid.id}
                      id={`pokelid-card-${lid.descId}`}
                      className={`pokelid-lid-item-card ${hoveredLocalLidId === lid.id ? 'is-hovered' : ''}`}
                      onMouseEnter={() => setHoveredLocalLidId(lid.id)}
                      onMouseLeave={() => setHoveredLocalLidId(null)}
                      onClick={() => openPokelidsInLightbox(filteredLids, idx)}
                      title={lang === 'cs' ? `Zvětšit: #${lid.descId} • ${cityDisplay} (${prefTitle})` : `Enlarge: #${lid.descId} • ${cityDisplay}`}
                    >
                      {/* Prominent Header with #ID Badge & Google Maps Navigation Link */}
                      <div className="lid-card-top-bar">
                        <div className="lid-card-id-pill">
                          <span className="lid-card-hash">#</span>
                          <span className="lid-card-id-number">{lid.descId}</span>
                        </div>
                        {lid.lat && lid.lng && (
                          <a
                            href={`https://maps.google.com/maps?q=${lid.lat},${lid.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lid-card-map-btn"
                            onClick={(e) => e.stopPropagation()}
                            title={lang === 'cs' ? 'Navigovat / Otevřít v Google Maps' : 'Open in Google Maps'}
                          >
                            <MapPin size={11} />
                            <span>Maps</span>
                          </a>
                        )}
                      </div>

                      <div className="lid-thumbnail-frame">
                        <img 
                          src={lid.smallImage} 
                          alt={cityDisplay}
                          className="lid-thumb-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="lid-item-info">
                        <strong className="lid-city-name">{cityDisplay}</strong>
                        <span className="lid-pref-tag">{prefTitle}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cross Link Banner to Special Backgrounds */}
          <div className="guide-crosslink-banner">
            <div className="crosslink-content">
              <Sparkles size={20} color="#aa3bff" />
              <div>
                <h4>{lang === 'cs' ? 'Zajímají vás globální Speciální pozadí a Lokační karty z celého světa?' : lang === 'ja' ? '世界各国のGO Festやウルトラホールのスペシャル背景もチェック！' : lang === 'ru' ? 'Интересуют глобальные фоны и карточки с GO Fest по всему миру?' : 'Explore Global Special Backgrounds & City Location Cards worldwide!'}</h4>
                <p>{lang === 'cs' ? 'Přečtěte si o kartách z Madridu, New Yorku, Ultra Space červích dírách a fúzích Necrozmy.' : 'Learn about Madrid, NYC, Ultra Space Wormholes, and Necrozma & Kyurem fusion mechanics.'}</p>
              </div>
            </div>
            <button 
              className="crosslink-btn"
              onClick={() => handleArticleClick('special-backgrounds-location-cards-guide')}
            >
              <span>{lang === 'cs' ? 'Otevřít Velký Průvodce Pozadími' : lang === 'ja' ? 'スペシャル背景ガイドを開く' : lang === 'ru' ? 'Открыть гайд по фонам' : 'Open Special Backgrounds Guide'}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      );
    }

    if (slug === 'special-backgrounds-location-cards-guide') {
      const specialBgFilterTabs = [
        { id: 'all', label: { cs: '🌐 Všechna pozadí', en: '🌐 All Backgrounds', ja: '🌐 全ての背景', ru: '🌐 Все фоны' } },
        { id: 'global', label: { cs: '🌌 Globální (Ultra, Týmy)', en: '🌌 Global (Ultra, Teams)', ja: '🌌 グローバル背景', ru: '🌌 Глобальные' } },
        { id: 'go-fest', label: { cs: '🎪 GO Fest (Města)', en: '🎪 GO Fest (Cities)', ja: '🎪 GO Fest（都市）', ru: '🎪 GO Fest (Города)' } },
        { id: 'city-safari', label: { cs: '🧭 City Safari (Eevee)', en: '🧭 City Safari (Eevee)', ja: '🧭 City Safari', ru: '🧭 City Safari' } },
        { id: 'go-tour', label: { cs: '⏳ GO Tour (Legendy)', en: '⏳ GO Tour', ja: '⏳ GO Tour', ru: '⏳ GO Tour' } },
        { id: 'heritage', label: { cs: '🏛️ Partnerství & WCS', en: '🏛️ Heritage & WCS', ja: '🏛️ 提携史跡・WCS', ru: '🏛️ Партнеры и WCS' } }
      ];

      const filteredBackgrounds = SPECIAL_BACKGROUNDS_CATALOG.filter(item => {
        if (specialBgFilter !== 'all' && item.category !== specialBgFilter) return false;

        if (specialBgSearch.trim()) {
          const q = specialBgSearch.toLowerCase();
          const matchTitle = (item.title[lang] || item.title.en).toLowerCase().includes(q);
          const matchEvent = (item.event[lang] || item.event.en).toLowerCase().includes(q);
          const matchLoc = (item.location[lang] || item.location.en).toLowerCase().includes(q);
          const matchArt = (item.backgroundArtwork[lang] || item.backgroundArtwork.en).toLowerCase().includes(q);
          const matchPkm = item.featuredPokemon.some(p => p.toLowerCase().includes(q));
          if (!matchTitle && !matchEvent && !matchLoc && !matchArt && !matchPkm) return false;
        }
        return true;
      });

      return (
        <div className="guide-special-bg-widget">
          {/* Prominent Pokélid Link Banner */}
          <div className="special-bg-pokelid-callout">
            <div className="callout-flag-col">
              <span className="callout-flag-icon">🗾</span>
            </div>
            <div className="callout-main-col">
              <div className="callout-badge">
                <MapPin size={14} />
                <span>{lang === 'cs' ? 'Hledáte Poké Lids v Japonsku?' : lang === 'ja' ? '日本のポケふたをお探しの方へ' : lang === 'ru' ? 'Ищете Poké Lids в Японии?' : 'Looking for Poké Lids in Japan?'}</span>
              </div>
              <h4>{lang === 'cs' ? 'Pokélid (Pokéfuta) Stamp Rally v Japonsku má samostatného průvodce!' : lang === 'ja' ? '全国41都道府県のポケふたスタンプラリーは専用ガイドで徹底解説！' : lang === 'ru' ? 'Для Poké Lid Stamp Rally в Японии есть отдельный гайд!' : 'Poké Lid Stamp Rally in Japan has its own dedicated master guide!'}</h4>
              <p>
                {lang === 'cs' 
                  ? 'Všechny litinové manhole poklopy, žlutá a modrá razítka, 100% pokryté prefektury a postup zisku Pikachu s lokačním pozadím naleznete v samostatném článku.' 
                  : lang === 'ja' 
                  ? '黄色・青スタンプの違い、全国の推しポケモン、各都道府県の限定背景ピカチュウ入手方法は専用ページをご覧ください。' 
                  : lang === 'ru' 
                  ? 'Все о японских люках, желтых и синих штампах и получении Пикачу с фоном префектуры читайте в отдельном руководстве.' 
                  : 'All cast-iron manhole covers, Yellow vs. Blue border stamps, and prefecture-specific Pikachu encounter mechanics are detailed in our specialized guide.'}
              </p>
            </div>
            <div className="callout-action-col">
              <button 
                className="callout-nav-btn"
                onClick={() => handleArticleClick('pokelid-stamp-rally-japan-guide')}
              >
                <span>{lang === 'cs' ? 'Otevřít Pokélid Průvodce' : lang === 'ja' ? 'ポケふたガイドを見る' : lang === 'ru' ? 'Открыть гайд Pokélid' : 'Open Poké Lid Guide'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Core Rules Quick Summary Bar */}
          <div className="special-bg-rules-banner">
            <div className="rules-header">
              <Shield size={16} color="#38bdf8" />
              <strong>{lang === 'cs' ? '4 Zlatá pravidla Lokačních karet a Speciálních pozadí:' : lang === 'ja' ? '記念背景システムの4大重要ルール：' : lang === 'ru' ? '4 главных правила карточек локаций и фонов:' : '4 Golden Rules of Location & Special Backgrounds:'}</strong>
            </div>
            <div className="rules-grid">
              <div className="rule-item">
                <span className="rule-badge">1. {lang === 'cs' ? 'Special Trade' : 'Special Trade'}</span>
                <p>{lang === 'cs' ? 'Každá výměna Pokémona s pozadím VŽDY spotřebuje 1 denní Special Trade slot!' : 'Always consumes a daily Special Trade slot!'}</p>
              </div>
              <div className="rule-item">
                <span className="rule-badge">2. {lang === 'cs' ? '100% Trvalost' : '100% Permanent'}</span>
                <p>{lang === 'cs' ? 'Pozadí se NIKDY nesmaže při výměně ani při evoluci na vyšší vývojové stádium.' : 'Background is 100% preserved upon trading and evolution.'}</p>
              </div>
              <div className="rule-item">
                <span className="rule-badge">3. {lang === 'cs' ? 'Pouze Na Místě' : 'In-Person Only'}</span>
                <p>{lang === 'cs' ? 'Lokační karty měst padají POUZE z osobních raidů na místě (Remote Raid Passy je NIKDY nedají!).' : 'City cards drop ONLY from in-person raids. Never Remote!'}</p>
              </div>
              <div className="rule-item">
                <span className="rule-badge danger-badge">4. ⚠️ Pokémon HOME</span>
                <p>{lang === 'cs' ? 'Převod do Pokémon HOME pozadí NAVŽDY A NENÁVRATNĚ SMAŽE!' : 'Transferring to Pokémon HOME permanently DELETES the background!'}</p>
              </div>
            </div>
          </div>

          {/* Filter Controls & Search */}
          <div className="special-bg-controls">
            <div className="special-bg-filter-tabs">
              {specialBgFilterTabs.map(tab => (
                <button
                  key={tab.id}
                  className={`special-bg-tab-btn ${specialBgFilter === tab.id ? 'active' : ''}`}
                  onClick={() => setSpecialBgFilter(tab.id as any)}
                >
                  {tab.label[lang] || tab.label.en}
                </button>
              ))}
            </div>

            <div className="special-bg-search-box">
              <Search size={15} color="#94a3b8" />
              <input
                type="text"
                placeholder={lang === 'cs' ? 'Hledat město, Pokémona, událost, rok...' : lang === 'ja' ? '都市名、ポケモン名、イベント、年号を検索...' : lang === 'ru' ? 'Поиск города, покемона, ивента...' : 'Search city, Pokémon, event, year...'}
                value={specialBgSearch}
                onChange={e => setSpecialBgSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Backgrounds Grid */}
          <div className="special-bg-grid">
            {filteredBackgrounds.map(item => (
              <div key={item.id} className="special-bg-card">
                <div className="special-bg-card-top">
                  <span className="special-bg-year-tag">{item.year}</span>
                  <span className={`special-bg-category-badge cat-${item.category}`}>
                    {item.isGlobal ? '🌌 Global' : '📍 In-Person'}
                  </span>
                  <span className="special-bg-loc-pill">
                    {item.location[lang] || item.location.en}
                  </span>
                </div>

                {item.cardImageUrl && (
                  <div 
                    className="special-bg-preview-banner"
                    title={lang === 'cs' ? 'Kliknutím zvětšit pozadí' : 'Click to enlarge background'}
                    onClick={() => setPreviewModalImg({
                      url: item.cardImageUrl!,
                      title: `${item.title[lang] || item.title.en} (${item.year})`
                    })}
                  >
                    <img 
                      src={item.cardImageUrl} 
                      alt={item.title[lang] || item.title.en} 
                      className="special-bg-banner-img" 
                      loading="lazy" 
                    />
                    <div className="special-bg-banner-overlay" />
                    <span className="special-bg-banner-tag">
                      {item.isGlobal ? '🌌 Special Background' : '📍 Location Card'}
                    </span>
                    <span className="special-bg-zoom-badge">
                      <ZoomIn size={13} />
                      <span>{lang === 'cs' ? 'Zvětšit' : 'Enlarge'}</span>
                    </span>
                  </div>
                )}

                <h4 className="special-bg-title">{item.title[lang] || item.title.en}</h4>
                <p className="special-bg-event">{item.event[lang] || item.event.en}</p>

                <div className="special-bg-featured-row">
                  <span className="featured-label">{lang === 'cs' ? 'Dostupní Pokémoni:' : lang === 'ja' ? '対象ポケモン：' : lang === 'ru' ? 'Покемоны:' : 'Featured Pokémon:'}</span>
                  <div className="special-bg-pokemon-chips">
                    {item.featuredPokemon.map(p => renderPokemonChip(p))}
                  </div>
                </div>

                <div className="special-bg-artwork-box">
                  <span className="art-label">{lang === 'cs' ? 'Vizuální motiv pozadí:' : lang === 'ja' ? '背景アート内容：' : lang === 'ru' ? 'Мотив фона:' : 'Background Visual Motif:'}</span>
                  <p className="art-desc">{item.backgroundArtwork[lang] || item.backgroundArtwork.en}</p>
                </div>

                <div className="special-bg-card-bottom">
                  <div className="special-bg-acq-pill">
                    <Zap size={13} color="#38bdf8" />
                    <span>{item.acquisitionMethod[lang] || item.acquisitionMethod.en}</span>
                  </div>
                  <div className="special-bg-trade-pill">
                    <CheckCircle2 size={13} color="#22c55e" />
                    <span>100% {lang === 'cs' ? 'Zachováno při Trade' : lang === 'ja' ? 'トレード維持' : lang === 'ru' ? 'Сохраняется при обмене' : 'Trade Permanent'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fusion Rules Explainer Card */}
          <div className="fusion-genetics-card">
            <div className="fusion-card-header">
              <RotateCw size={18} color="#aa3bff" />
              <h4>{lang === 'cs' ? 'Pravidla fúze pozadí: Dusk Mane / Dawn Wings Necrozma & Kyurem' : lang === 'ja' ? '合体ポケモンの背景遺伝ルール（ネクロズマ＆キュレム）' : lang === 'ru' ? 'Генетика фонов при слиянии: Necrozma и Kyurem' : 'Fusion Background Genetics: Necrozma & Kyurem'}</h4>
            </div>
            <div className="fusion-scenarios-grid">
              <div className="fusion-scenario">
                <span className="scenario-badge badge-resonance">🌌 {lang === 'cs' ? 'Fúzní Rezonance' : 'Fusion Resonance'}</span>
                <strong>Wormhole Necrozma + Sun / Moon Partner</strong>
                <p>{lang === 'cs' ? 'Vzniká exkluzivní pozadí Solar Eclipse (Zatmění Slunce) nebo Lunar Eclipse (Zatmění Měsíce)!' : 'Produces exclusive Solar Eclipse or Lunar Eclipse fusion background!'}</p>
              </div>
              <div className="fusion-scenario">
                <span className="scenario-badge badge-city">🏙️ {lang === 'cs' ? 'Priorita Města' : 'City Card Priority'}</span>
                <strong>Městská Karta Necrozmy (Sendai/Madrid/NYC)</strong>
                <p>{lang === 'cs' ? 'Městská lokační karta má přednost a fúzní forma si zachová panorama města.' : 'The City Location Card takes priority, preserving the host city skyline.'}</p>
              </div>
              <div className="fusion-scenario">
                <span className="scenario-badge badge-safe">🛡️ {lang === 'cs' ? '100% Bezpečné Rozpojení' : 'Safe Unfuse'}</span>
                <strong>Rozpojení fúze (Unfuse)</strong>
                <p>{lang === 'cs' ? 'Kdykoliv zdarma. Oba Pokémoni se vrátí do boxu se svými původními pozadími!' : 'Completely free. Both Pokémon return to storage with original backgrounds!'}</p>
              </div>
            </div>
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

          {/* Lightbox Image Preview Modal (Rendered via Portal directly to body for fixed viewport positioning) */}
          {isMounted && typeof document !== 'undefined' && lightboxGallery && createPortal(
            <div 
              className="guide-lightbox-backdrop"
              onClick={() => setLightboxGallery(null)}
            >
              <div 
                className="guide-lightbox-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="lightbox-modal-header">
                  <div className="lightbox-header-titles">
                    <div className="lightbox-title-row">
                      {lightboxGallery.items[lightboxGallery.currentIndex]?.badge && (
                        <span className="lightbox-hero-id-badge">
                          {lightboxGallery.items[lightboxGallery.currentIndex].badge}
                        </span>
                      )}
                      <h4>{lightboxGallery.items[lightboxGallery.currentIndex]?.title}</h4>
                    </div>
                    <div className="lightbox-meta-row">
                      {lightboxGallery.items[lightboxGallery.currentIndex]?.subtitle && (
                        <span className="lightbox-counter-badge">
                          {lightboxGallery.items[lightboxGallery.currentIndex].subtitle}
                        </span>
                      )}
                      {lightboxGallery.items[lightboxGallery.currentIndex]?.lat && 
                       lightboxGallery.items[lightboxGallery.currentIndex]?.lng && (
                        <a
                          href={`https://maps.google.com/maps?q=${lightboxGallery.items[lightboxGallery.currentIndex].lat},${lightboxGallery.items[lightboxGallery.currentIndex].lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lightbox-maps-action-btn"
                          title={lang === 'cs' ? 'Navigovat v Google Maps' : 'Open in Google Maps'}
                        >
                          <MapPin size={13} />
                          <span>{lang === 'cs' ? 'Navigovat v Google Maps' : lang === 'ja' ? 'Google マップでナビ' : lang === 'ru' ? 'Навигация в Google Maps' : 'Open in Google Maps'}</span>
                        </a>
                      )}
                    </div>
                  </div>
                  <button 
                    className="lightbox-close-btn"
                    onClick={() => setLightboxGallery(null)}
                    aria-label="Close image preview"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div 
                  className="lightbox-image-container"
                  onTouchStart={handleLightboxTouchStart}
                  onTouchEnd={handleLightboxTouchEnd}
                >
                  {lightboxGallery.items.length > 1 && (
                    <button 
                      className="lightbox-nav-btn lightbox-prev-btn"
                      onClick={() => setLightboxGallery(prev => prev ? {
                        ...prev,
                        currentIndex: (prev.currentIndex - 1 + prev.items.length) % prev.items.length
                      } : null)}
                      title={lang === 'cs' ? 'Předchozí (←)' : lang === 'ja' ? '前へ (←)' : lang === 'ru' ? 'Предыдущий (←)' : 'Previous (←)'}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={28} />
                    </button>
                  )}

                  <div className="lightbox-image-stage">
                    {/* Instant 0ms cached thumbnail underlay while full image decodes */}
                    {lightboxGallery.items[lightboxGallery.currentIndex]?.thumb && 
                     lightboxGallery.items[lightboxGallery.currentIndex].thumb !== lightboxGallery.items[lightboxGallery.currentIndex].url && (
                      <img 
                        src={lightboxGallery.items[lightboxGallery.currentIndex].thumb} 
                        alt="" 
                        aria-hidden="true"
                        className={`lightbox-stage-thumb ${loadedLightboxUrls.has(lightboxGallery.items[lightboxGallery.currentIndex]?.url || '') ? 'is-covered' : 'is-visible'} ${lightboxGallery.items[lightboxGallery.currentIndex]?.descId || lightboxGallery.items[lightboxGallery.currentIndex]?.url?.includes('manhole') ? 'is-pokelid' : 'is-card'}`}
                      />
                    )}

                    <img 
                      key={lightboxGallery.items[lightboxGallery.currentIndex]?.url}
                      src={lightboxGallery.items[lightboxGallery.currentIndex]?.url} 
                      alt={lightboxGallery.items[lightboxGallery.currentIndex]?.title} 
                      decoding="async"
                      className={`lightbox-full-img ${loadedLightboxUrls.has(lightboxGallery.items[lightboxGallery.currentIndex]?.url || '') ? 'loaded' : 'loading'} ${lightboxGallery.items[lightboxGallery.currentIndex]?.descId || lightboxGallery.items[lightboxGallery.currentIndex]?.url?.includes('manhole') ? 'is-pokelid' : 'is-card'}`} 
                      onLoad={() => {
                        const url = lightboxGallery.items[lightboxGallery.currentIndex]?.url;
                        if (url) markLightboxUrlLoaded(url);
                      }}
                    />
                  </div>

                  {lightboxGallery.items.length > 1 && (
                    <button 
                      className="lightbox-nav-btn lightbox-next-btn"
                      onClick={() => setLightboxGallery(prev => prev ? {
                        ...prev,
                        currentIndex: (prev.currentIndex + 1) % prev.items.length
                      } : null)}
                      title={lang === 'cs' ? 'Další (→)' : lang === 'ja' ? '次へ (→)' : lang === 'ru' ? 'Следующий (→)' : 'Next (→)'}
                      aria-label="Next image"
                    >
                      <ChevronRight size={28} />
                    </button>
                  )}
                </div>

                {/* Navigation hint */}
                {lightboxGallery.items.length > 1 && (
                  <div className="lightbox-nav-hint">
                    <span>{lang === 'cs' ? 'Použijte šipky ← / →, tažení prstem nebo náhledy níže pro okamžité procházení' : lang === 'ja' ? '矢印キー（← / →）、スワイプ、下のサムネイルで即座に切り替え' : lang === 'ru' ? 'Стрелки ← / →, свайп или миниатюры внизу для быстрого просмотра' : 'Use ← / → arrow keys, swipe, or click thumbnails below'}</span>
                  </div>
                )}

                {/* Miniature Thumbnail Preview Strip */}
                {lightboxGallery.items.length > 1 && (
                  <div className="lightbox-thumbnail-strip" ref={thumbStripRef}>
                    {lightboxGallery.items.map((item, idx) => (
                      <button
                        key={`${item.badge || idx}-${item.url}`}
                        ref={idx === lightboxGallery.currentIndex ? activeThumbBtnRef : null}
                        className={`lightbox-thumb-btn ${idx === lightboxGallery.currentIndex ? 'active' : ''}`}
                        onClick={() => setLightboxGallery(prev => prev ? { ...prev, currentIndex: idx } : null)}
                        title={item.title}
                      >
                        <img src={item.thumb || item.url} alt={item.title} className="lightbox-thumb-img" />
                        {item.badge && <span className="lightbox-thumb-badge">{item.badge}</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>,
            document.body
          )}
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
