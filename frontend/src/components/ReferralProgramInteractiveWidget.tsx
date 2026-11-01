'use client';

import React, { useState } from 'react';
import type { Language } from '../data/translations';
import { 
  Copy, 
  Check, 
  Sparkles, 
  Award, 
  Gift, 
  UserCheck, 
  Swords, 
  ShieldAlert, 
  HeartHandshake, 
  Zap, 
  HelpCircle,
  ExternalLink,
  Flame
} from 'lucide-react';
import './ReferralProgramInteractiveWidget.css';

interface ReferralProgramInteractiveWidgetProps {
  lang: Language;
}

interface MilestoneItem {
  id: string;
  task: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  tip?: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  refereeReward: {
    title: { cs: string; en: string; ja: string; ru: string };
    amount?: string;
    imageUrl: string;
    isPokemon?: boolean;
  };
  referrerReward: {
    title: { cs: string; en: string; ja: string; ru: string };
    amount?: string;
    imageUrl: string;
    isPokemon?: boolean;
  };
}

const REFERRAL_CODE = 'TQ4TH6H4P';

const MILESTONES_DATA: MilestoneItem[] = [
  {
    id: 'instant-code-redemption',
    task: {
      cs: 'Zadání doporučovacího kódu (Do 72h od registrace či návratu)',
      en: 'Redeem Referral Code (Within 72h of signup or return)',
      ja: '招待コードの入力（登録または復帰後72時間以内）',
      ru: 'Активация реферального кода (в течение 72 ч после старта/возврата)'
    },
    tip: {
      cs: 'Okamžitý uvítací balíček! Poké Bally se připíšou i při dočasně plném batohu.',
      en: 'Instant welcome package! Force-credits even if your item bag is full.',
      ja: '即時獲得！道具バッグが満杯でも上限を超えて受け取れます。',
      ru: 'Мгновенный бонус! Покеболы начисляются даже при полной сумке.'
    },
    refereeReward: {
      title: { cs: 'Poké Ball', en: 'Poké Ball', ja: 'モンスターボール', ru: 'Poké Ball' },
      amount: '100×',
      imageUrl: 'https://cdn.leekduck.com/assets/img/items/Poke%20Ball.png'
    },
    referrerReward: {
      title: { cs: 'Přátelství & Odemykání milníků', en: 'Friendship & Milestone Tracker', ja: 'フレンド成立＆タスク開始', ru: 'Дружба и квесты' },
      imageUrl: 'https://cdn.leekduck.com/assets/img/items/Lucky%20Egg.png'
    }
  },
  {
    id: 'defeat-3-rocket-grunts',
    task: {
      cs: 'Poraz 3 řadové členy Team GO Rocket (Grunts)',
      en: 'Defeat 3 Team GO Rocket Grunts',
      ja: 'GOロケット団したっぱに3回勝利する',
      ru: 'Победить 3 агентов Команды GO Ракета'
    },
    tip: {
      cs: 'Garantovaný Charizard s IV floor 10/10/10 a 0% Flee Rate (nikdy neuteče).',
      en: 'Guaranteed Charizard with 10/10/10 IV floor and 0% Flee Rate.',
      ja: '個体値10/10/10保証＆逃走率0%のリザードンが出現します。',
      ru: 'Гарантированный Чаризард с IV от 10/10/10 и 0% шансом побега.'
    },
    refereeReward: {
      title: { cs: 'Charizard', en: 'Charizard', ja: 'リザードン', ru: 'Charizard' },
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
      isPokemon: true
    },
    referrerReward: {
      title: { cs: 'Charizard', en: 'Charizard', ja: 'リザードン', ru: 'Charizard' },
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
      isPokemon: true
    }
  },
  {
    id: 'win-1-raid',
    task: {
      cs: 'Vyhraj 1 Raid Battle',
      en: 'Win 1 Raid Battle',
      ja: 'レイドバトルで1回勝利する',
      ru: 'Выиграть 1 рейд'
    },
    tip: {
      cs: 'Využijte denní bezplatný oranžový pass na 1★ raid.',
      en: 'Use your free daily raid pass on an easy 1-star raid.',
      ja: '毎日の無料オレンジパスで1つ星レイドを倒せばすぐ達成できます。',
      ru: 'Используйте бесплатный ежедневный оранжевый пасс на 1★ рейд.'
    },
    refereeReward: {
      title: { cs: 'Premium Battle Pass', en: 'Premium Battle Pass', ja: 'プレミアムバトルパス', ru: 'Premium Battle Pass' },
      amount: '1×',
      imageUrl: 'https://cdn.leekduck.com/assets/img/items/Premium%20Battle%20Pass.png'
    },
    referrerReward: {
      title: { cs: 'Bagon', en: 'Bagon', ja: 'タツベイ', ru: 'Bagon' },
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/371.png',
      isPokemon: true
    }
  },
  {
    id: 'win-3-raids',
    task: {
      cs: 'Vyhraj 3 Raid Battles',
      en: 'Win 3 Raid Battles',
      ja: 'レイドバトルで3回勝利する',
      ru: 'Выиграть 3 рейда'
    },
    tip: {
      cs: 'Použijte získaný Premium Pass z předchozího milníku.',
      en: 'Chain into this using the Premium Pass earned from the first raid!',
      ja: '前のタスクで手に入れたプレミアムパスを使って連続クリア可能。',
      ru: 'Используйте премиум-пасс, полученный за победу в 1-м рейде.'
    },
    refereeReward: {
      title: { cs: 'Lapras', en: 'Lapras', ja: 'ラプラス', ru: 'Lapras' },
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png',
      isPokemon: true
    },
    referrerReward: {
      title: { cs: 'Premium Battle Pass', en: 'Premium Battle Pass', ja: 'プレミアムバトルパス', ru: 'Premium Battle Pass' },
      amount: '1×',
      imageUrl: 'https://cdn.leekduck.com/assets/img/items/Premium%20Battle%20Pass.png'
    }
  },
  {
    id: 'win-20-raids',
    task: {
      cs: 'Vyhraj 20 Raid Battles',
      en: 'Win 20 Raid Battles',
      ja: 'レイドバトルで20回勝利する',
      ru: 'Выиграть 20 рейдов'
    },
    tip: {
      cs: 'Z celého referralu získáte zdarma celkem 9 Premium Passů + denní volné passy.',
      en: 'Total referral track provides 9 free Premium Passes + daily free passes.',
      ja: '全タスク合計で9枚の無料プレミアムパスが貰えるため課金不要です。',
      ru: 'Всего за реферальную цепочку дается 9 бесплатных премиум-пассов.'
    },
    refereeReward: {
      title: { cs: 'Super Incubator', en: 'Super Incubator', ja: 'スーパーふかそうち', ru: 'Super Incubator' },
      amount: '3×',
      imageUrl: 'https://cdn.leekduck.com/assets/img/items/Super%20Incubator.png'
    },
    referrerReward: {
      title: { cs: 'Super Incubator', en: 'Super Incubator', ja: 'スーパーふかそうち', ru: 'Super Incubator' },
      amount: '5×',
      imageUrl: 'https://cdn.leekduck.com/assets/img/items/Super%20Incubator.png'
    }
  },
  {
    id: 'catch-50-pokemon',
    task: {
      cs: 'Chyť 50 Pokémonů',
      en: 'Catch 50 Pokémon',
      ja: 'ポケモンを50匹捕まえる',
      ru: 'Поймать 50 покемонов'
    },
    tip: {
      cs: 'Získaný Super Inkubátor nasaďte na 2km vejce – vylíhne se za pouhých 1,33 km!',
      en: 'Put the Super Incubator on a 2km egg to hatch it in just 1.33 km!',
      ja: '貰ったスーパーふかそうちを2kmタマゴに使えば1.33kmで即孵化！',
      ru: 'Поставьте полученный супер-инкубатор на 2-км яйцо (вылупится за 1.33 км)!'
    },
    refereeReward: {
      title: { cs: 'Super Incubator', en: 'Super Incubator', ja: 'スーパーふかそうち', ru: 'Super Incubator' },
      amount: '1×',
      imageUrl: 'https://cdn.leekduck.com/assets/img/items/Super%20Incubator.png'
    },
    referrerReward: {
      title: { cs: 'Darumaka', en: 'Darumaka', ja: 'ダルマッカ', ru: 'Darumaka' },
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/554.png',
      isPokemon: true
    }
  },
  {
    id: 'hatch-3-eggs',
    task: {
      cs: 'Vylíhni 3 vajíčka',
      en: 'Hatch 3 Eggs',
      ja: 'タマゴを3個かえす',
      ru: 'Вылупить 3 яйца'
    },
    tip: {
      cs: 'Aktivujte v nastavení Adventure Sync pro započítávání kroků i s vypnutou hrou.',
      en: 'Enable Adventure Sync so your walking distance counts in the background.',
      ja: 'いつでも冒険モードをONにして、通勤や通学の歩数を有効活用しましょう。',
      ru: 'Включите Adventure Sync для учета шагов при закрытом приложении.'
    },
    refereeReward: {
      title: { cs: 'Galarian Farfetch\'d', en: 'Galarian Farfetch\'d', ja: 'カモネギ（ガラルのすがた）', ru: 'Galarian Farfetch\'d' },
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10166.png',
      isPokemon: true
    },
    referrerReward: {
      title: { cs: 'Rare Candy', en: 'Rare Candy', ja: 'ふしぎなアメ', ru: 'Rare Candy' },
      amount: '1×',
      imageUrl: 'https://cdn.leekduck.com/assets/img/items/Rare%20Candy.png'
    }
  },
  {
    id: 'hatch-20-eggs',
    task: {
      cs: 'Vylíhni 20 vajíček',
      en: 'Hatch 20 Eggs',
      ja: 'タマゴを20個かえす',
      ru: 'Вылупить 20 яиц'
    },
    tip: {
      cs: 'Kombinujte nekonečný oranžový inkubátor se Super Inkubátory z předchozích úkolů.',
      en: 'Combine your infinite orange incubator with referral Super Incubators.',
      ja: '無限ふかそうちとリファラル報酬のスーパーふかそうちを併用しましょう。',
      ru: 'Используйте бесконечный оранжевый инкубатор и бонусные супер-инкубаторы.'
    },
    refereeReward: {
      title: { cs: 'Chansey', en: 'Chansey', ja: 'ラッキー', ru: 'Chansey' },
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/113.png',
      isPokemon: true
    },
    referrerReward: {
      title: { cs: 'Deino', en: 'Deino', ja: 'モノズ', ru: 'Deino' },
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/633.png',
      isPokemon: true
    }
  },
  {
    id: 'give-your-buddy-50-treats',
    task: {
      cs: 'Dej svému Buddymu 50 pamlsků (bobulí)',
      en: 'Give your Buddy 50 Treats',
      ja: '相棒におやつを50個あげる',
      ru: 'Дать бадди 50 угощений'
    },
    tip: {
      cs: '⚡ Speedrun Trik: Vyměňte Buddyho až 20× za den! 17 výměn × 3 bobule = 51 pamlsků za 15 minut.',
      en: '⚡ Speedrun: Swap buddies up to 20x daily! 17 swaps × 3 berries = 51 treats in 15 mins.',
      ja: '⚡ 最速技：相棒交代（1日最大20回）！17回交代×各3個＝わずか15分で完了します。',
      ru: '⚡ Трюк: Меняйте бадди (до 20 раз в день)! 17 замен × 3 ягоды = 51 угощение за 15 минут.'
    },
    refereeReward: {
      title: { cs: 'Rare Candy', en: 'Rare Candy', ja: 'ふしぎなアメ', ru: 'Rare Candy' },
      amount: '5×',
      imageUrl: 'https://cdn.leekduck.com/assets/img/items/Rare%20Candy.png'
    },
    referrerReward: {
      title: { cs: 'Gible', en: 'Gible', ja: 'フカマル', ru: 'Gible' },
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/443.png',
      isPokemon: true
    }
  },
  {
    id: 'earn-50-hearts-with-buddy',
    task: {
      cs: 'Získej 50 srdíček se svým Buddym',
      en: 'Earn 50 Hearts with your Buddy',
      ja: '相棒とハートを50個獲得する',
      ru: 'Получить 50 сердечек с бадди'
    },
    tip: {
      cs: 'Krmení, pohlazení, fotka a trénink s lídrem týmu dávají 4 snadná srdce na každého Buddyho.',
      en: 'Feeding, playing, snapshot, and Blanche battle yield 4 quick hearts per buddy.',
      ja: 'おやつ・なでる・スナップショット・チームリーダー対戦で1匹につき即4個獲得。',
      ru: 'Кормление, игра, фото и бой с лидером дают 4 быстрых сердца на каждого бадди.'
    },
    refereeReward: {
      title: { cs: 'Dratini', en: 'Dratini', ja: 'ミニリュウ', ru: 'Dratini' },
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/147.png',
      isPokemon: true
    },
    referrerReward: {
      title: { cs: 'Rare Candy', en: 'Rare Candy', ja: 'ふしぎなアメ', ru: 'Rare Candy' },
      amount: '3×',
      imageUrl: 'https://cdn.leekduck.com/assets/img/items/Rare%20Candy.png'
    }
  },
  {
    id: 'make-100-nice-throws',
    task: {
      cs: 'Hoď 100 Nice hodů při chytání',
      en: 'Make 100 Nice Throws',
      ja: 'ナイススローを100回投げる',
      ru: 'Сделать 100 бросков Nice'
    },
    tip: {
      cs: 'Počítají se i Great a Excellent hody. Využijte velké kruhy u raid bossů.',
      en: 'Great and Excellent throws also count! Aim at large target rings.',
      ja: 'グレートやエクセレントもカウントされます。サークルの大きいポケモンを狙いましょう。',
      ru: 'Great и Excellent тоже засчитываются! Цельтесь в крупных покемонов.'
    },
    refereeReward: {
      title: { cs: 'Snorlax', en: 'Snorlax', ja: 'カビゴン', ru: 'Snorlax' },
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png',
      isPokemon: true
    },
    referrerReward: {
      title: { cs: 'Super Incubator', en: 'Super Incubator', ja: 'スーパーふかそうち', ru: 'Super Incubator' },
      amount: '2×',
      imageUrl: 'https://cdn.leekduck.com/assets/img/items/Super%20Incubator.png'
    }
  },
  {
    id: 'make-3-excellent-throws',
    task: {
      cs: 'Hoď 3 Excellent hody',
      en: 'Make 3 Excellent Throws',
      ja: 'エクセレントスローを3回投げる',
      ru: 'Сделать 3 броска Excellent'
    },
    tip: {
      cs: 'Nejjednodušší na velkých Pokémonech (Ponyta, Wailmer, Snorlax, Onix, Raid Boss).',
      en: 'Easiest on large hitboxes (Ponyta, Wailmer, Snorlax, Onix, 5★ Raid Bosses).',
      ja: 'ポニータ、ホエルコ、カビゴン、イワークなどの巨大サークルが狙い目。',
      ru: 'Проще всего делать на крупных покемонах (Понита, Снорлакс, Оникс, боссы рейдов).'
    },
    refereeReward: {
      title: { cs: 'Rare Candy', en: 'Rare Candy', ja: 'ふしぎなアメ', ru: 'Rare Candy' },
      amount: '1×',
      imageUrl: 'https://cdn.leekduck.com/assets/img/items/Rare%20Candy.png'
    },
    referrerReward: {
      title: { cs: 'Charizard', en: 'Charizard', ja: 'リザードン', ru: 'Charizard' },
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
      isPokemon: true
    }
  },
  {
    id: 'purify-20-shadow-pokemon',
    task: {
      cs: 'Očisti 20 Shadow Pokémonů (Purify)',
      en: 'Purify 20 Shadow Pokémon',
      ja: 'シャドウポケモンを20匹リトレーンする',
      ru: 'Очистить 20 Shadow-покемонов'
    },
    tip: {
      cs: '⚡ 1 000 Dust Trick: Čistěte výhradně levné druhy (Zubat, Magikarp, Rattata, Pidgey, Weedle, Aron) a ušetříte 40 000+ Stardustu!',
      en: '⚡ 1,000 Dust Trick: Only purify 1,000-dust species (Zubat, Magikarp, Rattata, Aron) to save 40,000+ Stardust!',
      ja: '⚡ 1000砂節約術：1000のすなで済むズバットやコイキング等を厳選して4万以上の砂を節約！',
      ru: '⚡ Трюк за 1000 пыли: Очищайте только дешевых покемонов (Зубат, Мэджикарп, Раттата), экономя 40к+ пыли!'
    },
    refereeReward: {
      title: { cs: 'Premium Battle Pass', en: 'Premium Battle Pass', ja: 'プレミアムバトルパス', ru: 'Premium Battle Pass' },
      amount: '5×',
      imageUrl: 'https://cdn.leekduck.com/assets/img/items/Premium%20Battle%20Pass.png'
    },
    referrerReward: {
      title: { cs: 'Rare Candy', en: 'Rare Candy', ja: 'ふしぎなアメ', ru: 'Rare Candy' },
      amount: '30×',
      imageUrl: 'https://cdn.leekduck.com/assets/img/items/Rare%20Candy.png'
    }
  },
  {
    id: 'defeat-team-go-rocket-leader',
    task: {
      cs: 'Poraz bosse Team GO Rocket (Sierra, Cliff nebo Arlo)',
      en: 'Defeat a Team GO Rocket Leader (Sierra, Cliff, or Arlo)',
      ja: 'GOロケット団リーダー（シエラ/クリフ/アルロ）に勝利する',
      ru: 'Победить лидера GO Rocket (Sierra, Cliff или Arlo)'
    },
    tip: {
      cs: 'Porážkou 6 Gruntů získáte Rocket Radar pro zaměření lídra.',
      en: 'Defeat 6 Grunts to assemble the Rocket Radar and locate a Leader.',
      ja: 'したっぱを6回倒してロケットレーダーを組み立てましょう。',
      ru: 'Победите 6 пешек, чтобы собрать Rocket Radar и найти лидера.'
    },
    refereeReward: {
      title: { cs: 'Charizard Mega Energy', en: 'Charizard Mega Energy', ja: 'リザードンメガエナジー', ru: 'Mega Energy Charizard' },
      amount: '50×',
      imageUrl: 'https://cdn.leekduck.com/assets/img/items/Mega%20Energy.png'
    },
    referrerReward: {
      title: { cs: 'Charizard Mega Energy', en: 'Charizard Mega Energy', ja: 'リザードンメガエナジー', ru: 'Mega Energy Charizard' },
      amount: '50×',
      imageUrl: 'https://cdn.leekduck.com/assets/img/items/Mega%20Energy.png'
    }
  },
  {
    id: 'spin-pokestops-30-days-in-a-row',
    task: {
      cs: 'Navštiv PokéStop 30 dní v řadě',
      en: 'Spin PokéStops 30 Days in a Row',
      ja: 'ポケストップを30日連続で回す',
      ru: 'Крутить покестопы 30 дней подряд'
    },
    tip: {
      cs: '⚡ Lucky Egg Synergie: 30. den dosáhnete Ultra Friends! Spusťte Lucky Egg a získejte 100 000 XP + dvojnásobky odměn!',
      en: '⚡ Lucky Egg Combo: Day 30 triggers Ultra Friends! Pop a Lucky Egg for 100,000 XP + double rewards!',
      ja: '⚡ しあわせタマゴ連携：30日目に「大親友」達成！タマゴを使って10万XPを一気に獲得！',
      ru: '⚡ Комбо с Lucky Egg: На 30-й день вы станете Ultra Friends! Включите яйцо и заберите 100 000 XP!'
    },
    refereeReward: {
      title: { cs: 'Dratini', en: 'Dratini', ja: 'ミニリュウ', ru: 'Dratini' },
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/147.png',
      isPokemon: true
    },
    referrerReward: {
      title: { cs: 'Rufflet', en: 'Rufflet', ja: 'ワシボン', ru: 'Rufflet' },
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/627.png',
      isPokemon: true
    }
  },
  {
    id: 'trade-5-pokemon',
    task: {
      cs: 'Vyměň 5 Pokémonů (Trade)',
      en: 'Trade 5 Pokémon',
      ja: 'ポケモンを5匹交換する',
      ru: 'Обменять 5 покемонов'
    },
    tip: {
      cs: 'Vyměňujte obyčejné Pokémony s nízkou cenou Stardustu (100 dustu za trade).',
      en: 'Trade common wild catches with your friend for just 100 Stardust each.',
      ja: '通常の野生ポケモン同士ならほしのすな100だけで交換できます。',
      ru: 'Меняйте обычных пойманных покемонов всего за 100 пыли.'
    },
    refereeReward: {
      title: { cs: 'Pidgeot', en: 'Pidgeot', ja: 'ピジョット', ru: 'Pidgeot' },
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png',
      isPokemon: true
    },
    referrerReward: {
      title: { cs: 'Pidgeot Mega Energy', en: 'Pidgeot Mega Energy', ja: 'ピジョットメガエナジー', ru: 'Mega Energy Pidgeot' },
      amount: '10×',
      imageUrl: 'https://cdn.leekduck.com/assets/img/items/Mega%20Energy.png'
    }
  },
  {
    id: 'make-3-new-friends',
    task: {
      cs: 'Přidej 3 nové přátele',
      en: 'Make 3 New Friends',
      ja: '新しくフレンドを3人追加する',
      ru: 'Добавить 3 новых друзей'
    },
    tip: {
      cs: 'Využijte sekci „Přátelé & Kódy“ v horním menu našeho webu pro bleskové přidání trenérů.',
      en: 'Use our website\'s "Friends & Codes" tab to quickly find active trainers.',
      ja: '当サイトの「Friends」タブを活用すれば、世界中のトレーナーを即座に追加できます。',
      ru: 'Используйте раздел «Друзья и коды» на нашем сайте для быстрого поиска игроков.'
    },
    refereeReward: {
      title: { cs: 'Pidgeot', en: 'Pidgeot', ja: 'ピジョット', ru: 'Pidgeot' },
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png',
      isPokemon: true
    },
    referrerReward: {
      title: { cs: 'Pokémon Encounter', en: 'Pokémon Encounter', ja: 'ポケモン出現', ru: 'Встреча с покемоном' },
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png',
      isPokemon: true
    }
  }
];

export const ReferralProgramInteractiveWidget: React.FC<ReferralProgramInteractiveWidgetProps> = ({ lang }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const getLocalized = (obj: { cs: string; en: string; ja: string; ru: string }) => {
    return obj[lang] || obj.en;
  };

  return (
    <div className="referral-interactive-container">
      {/* 1. HERO REFERRAL CODE CARD */}
      <div className="referral-hero-card">
        <div className="referral-hero-badge">
          <Sparkles size={16} className="sparkle-icon" />
          <span>
            {lang === 'cs' ? 'Oficiální ověřený kód komunity' : 
             lang === 'ja' ? '公式推奨コミュニティ招待コード' : 
             lang === 'ru' ? 'Официальный проверенный код сообщества' : 
             'Official Verified Community Referral Code'}
          </span>
        </div>

        <h3 className="referral-hero-heading">
          {lang === 'cs' ? 'Získejte 100 Poké Ballů ihned po zadání' : 
           lang === 'ja' ? 'コード入力でモンスターボール100個を即時獲得！' : 
           lang === 'ru' ? 'Получите 100 покеболов сразу при активации кода' : 
           'Receive 100 Poké Balls Instantly Upon Redemption'}
        </h3>

        <p className="referral-hero-desc">
          {lang === 'cs' ? 'Zadejte kód do 72 hodin od vytvoření účtu nebo od prvního přihlášení po 90+ dnech neaktivity. Získáte 100 Poké Ballů a odemknete kompletní sadu odměn níže!' :
           lang === 'ja' ? 'アカウント作成または90日以上のブランク復帰から72時間以内に入力してください。100個のボールと以下の豪華タスク報酬が全開放されます！' :
           lang === 'ru' ? 'Введите код в течение 72 часов с момента регистрации или первого входа после 90+ дней перерыва. Получите 100 покеболов и откройте все квесты ниже!' :
           'Enter within 72 hours of registering or returning after 90+ days inactive. Score 100 instant Poké Balls and unlock the complete milestone matrix below!'}
        </p>

        {/* Big Interactive Code Display */}
        <div className="referral-code-box">
          <div className="referral-code-label">
            {lang === 'cs' ? 'Doporučovací kód trenéra:' : 
             lang === 'ja' ? 'リファラル招待コード：' : 
             lang === 'ru' ? 'Реферальный код тренера:' : 
             'Trainer Referral Code:'}
          </div>
          <div className="referral-code-value-row">
            <span className="referral-code-text">{REFERRAL_CODE}</span>
            <button 
              type="button" 
              className={`referral-copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopyCode}
              aria-label="Copy referral code"
            >
              {copied ? (
                <>
                  <Check size={18} />
                  <span>{lang === 'cs' ? 'Zkopírováno!' : lang === 'ja' ? 'コピー完了！' : lang === 'ru' ? 'Скопировано!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy size={18} />
                  <span>{lang === 'cs' ? 'Kopírovat kód' : lang === 'ja' ? 'コードをコピー' : lang === 'ru' ? 'Скопировать' : 'Copy Code'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4 Quick Steps Walkthrough */}
        <div className="referral-steps-grid">
          <div className="referral-step-item">
            <div className="referral-step-num">1</div>
            <div className="referral-step-text">
              {lang === 'cs' ? 'Klepněte vlevo dole na Avatar trenéra' : 
               lang === 'ja' ? 'マップ左下のトレーナーアイコン' : 
               lang === 'ru' ? 'Аватар тренера внизу слева' : 
               'Tap Trainer Avatar in bottom-left'}
            </div>
          </div>
          <div className="referral-step-item">
            <div className="referral-step-num">2</div>
            <div className="referral-step-text">
              {lang === 'cs' ? 'Přejděte na záložku Přátelé (Friends)' : 
               lang === 'ja' ? '「フレンド」タブを選択' : 
               lang === 'ru' ? 'Вкладка «Друзья» (Friends)' : 
               'Navigate to the FRIENDS tab'}
            </div>
          </div>
          <div className="referral-step-item">
            <div className="referral-step-num">3</div>
            <div className="referral-step-text">
              {lang === 'cs' ? 'Stiskněte tlačítko Pozvat (Invite)' : 
               lang === 'ja' ? '「招待」ボタンをタップ' : 
               lang === 'ru' ? 'Кнопка «Пригласить» (Invite)' : 
               'Tap the purple "Invite" button'}
            </div>
          </div>
          <div className="referral-step-item">
            <div className="referral-step-num">4</div>
            <div className="referral-step-text">
              {lang === 'cs' ? 'Klepněte na „Máte kód?“ a vložte TQ4TH6H4P' : 
               lang === 'ja' ? '「招待コードをお持ちですか？」にTQ4TH6H4Pを入力' : 
               lang === 'ru' ? 'Нажмите «Есть код?» и введите TQ4TH6H4P' : 
               'Tap "Have a referral code?" & submit TQ4TH6H4P'}
            </div>
          </div>
        </div>
      </div>

      {/* 2. ALL 17 MILESTONE COMPARATIVE CARDS */}
      <div className="milestones-section-header">
        <div className="milestones-title-row">
          <Award size={24} className="milestones-header-icon" />
          <h2>
            {lang === 'cs' ? 'Všech 17 milníků a odměny pro obě strany' : 
             lang === 'ja' ? '全17マイルストーン＆双方の獲得報酬一覧' : 
             lang === 'ru' ? 'Все 17 квестов и сравнительные награды для обеих сторон' : 
             'All 17 Milestone Quests & Side-by-Side Dual Rewards'}
          </h2>
        </div>
        <p className="milestones-header-desc">
          {lang === 'cs' ? 'Úkoly plní pozvaný (nový či vracející se) hráč. Jakmile je úkol splněn, odměnu získají OBA trenéři. Všechna setkání mají 10/10/10 IV floor a 0% flee rate.' : 
           lang === 'ja' ? '招待されたプレイヤーがタスクを達成すると、両方のトレーナーに報酬が付与されます。出現ポケモンは個体値10/10/10保証・逃走率0%です。' : 
           lang === 'ru' ? 'Квесты выполняет приглашенный игрок, а награды получают ОБА тренера! Покемоны имеют IV от 10/10/10 и гарантированно не сбегают.' : 
           'Tasks are completed by the referee. Once cleared, rewards unlock for BOTH trainers! Encounter Pokémon feature 10/10/10 IV floors and 0% flee rates.'}
        </p>
      </div>

      <div className="milestones-cards-stack">
        {MILESTONES_DATA.map((item, index) => (
          <div key={item.id} className="milestone-card">
            {/* Card Header */}
            <div className="milestone-card-header">
              <div className="milestone-index-pill">
                #{index + 1}
              </div>
              <h4 className="milestone-task-title">{getLocalized(item.task)}</h4>
            </div>

            {/* Split Comparison Columns */}
            <div className="milestone-rewards-split">
              {/* Left Column: Referee / You */}
              <div className="milestone-reward-col referee-col">
                <div className="reward-col-badge referee-badge">
                  <UserCheck size={13} />
                  <span>
                    {lang === 'cs' ? 'Odměna pro vás (Pozvaný hráč)' : 
                     lang === 'ja' ? '招待された側の報酬' : 
                     lang === 'ru' ? 'Награда для приглашенного' : 
                     'Referee Reward (New / Returning)'}
                  </span>
                </div>
                <div className="reward-content-box">
                  <div className="reward-image-wrap">
                    <img 
                      src={item.refereeReward.imageUrl} 
                      alt={getLocalized(item.refereeReward.title)} 
                      className={`reward-img ${item.refereeReward.isPokemon ? 'pokemon-img' : 'item-img'}`}
                      loading="lazy" 
                    />
                  </div>
                  <div className="reward-info-box">
                    {item.refereeReward.amount && (
                      <span className="reward-amount">{item.refereeReward.amount}</span>
                    )}
                    <span className="reward-name">{getLocalized(item.refereeReward.title)}</span>
                    {item.refereeReward.isPokemon && (
                      <span className="reward-subtag">
                        {lang === 'cs' ? '10/10/10 IV • 0% Flee' : '10/10/10 IV • 0% Flee'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Referrer / Friend */}
              <div className="milestone-reward-col referrer-col">
                <div className="reward-col-badge referrer-badge">
                  <HeartHandshake size={13} />
                  <span>
                    {lang === 'cs' ? 'Odměna pro zvoucího (Trenér)' : 
                     lang === 'ja' ? '招待した側の報酬' : 
                     lang === 'ru' ? 'Награда для пригласившего' : 
                     'Referrer Reward (Inviter)'}
                  </span>
                </div>
                <div className="reward-content-box">
                  <div className="reward-image-wrap">
                    <img 
                      src={item.referrerReward.imageUrl} 
                      alt={getLocalized(item.referrerReward.title)} 
                      className={`reward-img ${item.referrerReward.isPokemon ? 'pokemon-img' : 'item-img'}`}
                      loading="lazy" 
                    />
                  </div>
                  <div className="reward-info-box">
                    {item.referrerReward.amount && (
                      <span className="reward-amount">{item.referrerReward.amount}</span>
                    )}
                    <span className="reward-name">{getLocalized(item.referrerReward.title)}</span>
                    {item.referrerReward.isPokemon && (
                      <span className="reward-subtag">
                        {lang === 'cs' ? '10/10/10 IV • 0% Flee' : '10/10/10 IV • 0% Flee'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Tip / Strategy Strip */}
            {item.tip && (
              <div className="milestone-tip-strip">
                <Zap size={15} className="tip-strip-icon" />
                <span className="tip-strip-text">{getLocalized(item.tip)}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
