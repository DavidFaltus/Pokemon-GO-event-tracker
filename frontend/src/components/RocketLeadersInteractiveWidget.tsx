'use client';

import React, { useState, useEffect } from 'react';
import type { Language } from '../data/translations';
import { 
  Shield, 
  Zap, 
  Swords, 
  Flame, 
  Sparkles, 
  Copy, 
  Check, 
  Timer, 
  RotateCcw, 
  Award, 
  AlertTriangle,
  Clock,
  ChevronRight,
  Info
} from 'lucide-react';
import './RocketLeadersInteractiveWidget.css';

interface RocketLeadersInteractiveWidgetProps {
  lang: Language;
}

type RocketLeaderTab = 'giovanni' | 'sierra' | 'cliff' | 'arlo' | 'stun';

interface PokemonDetail {
  name: string;
  dexId: number;
  types: string[];
  isCatchable?: boolean;
  canBeShiny?: boolean;
  counters: {
    name: string;
    dexId: number;
    fastMove: string;
    chargedMove: string;
    type: string;
  }[];
}

interface LeaderConfig {
  id: 'giovanni' | 'sierra' | 'cliff' | 'arlo';
  name: Record<Language, string>;
  title: Record<Language, string>;
  radarType: Record<Language, string>;
  radarIcon: string;
  avatarColor: string;
  borderColor: string;
  quote: Record<Language, string>;
  slot1: PokemonDetail[];
  slot2: PokemonDetail[];
  slot3: PokemonDetail[];
  bestTeamRecommendation: {
    lead: { name: string; dexId: number; role: Record<Language, string> };
    shieldBreaker: { name: string; dexId: number; role: Record<Language, string> };
    anchor: { name: string; dexId: number; role: Record<Language, string> };
  };
  strategyTip: Record<Language, string>;
}

const LEADERS_DATA: Record<'giovanni' | 'sierra' | 'cliff' | 'arlo', LeaderConfig> = {
  giovanni: {
    id: 'giovanni',
    name: {
      cs: 'Šéf Giovanni',
      en: 'Boss Giovanni',
      ja: 'ボス サカキ',
      ru: 'Босс Джованни'
    },
    title: {
      cs: 'Nejvyšší šéf Team GO Rocket',
      en: 'Supreme Leader of Team GO Rocket',
      ja: 'GOロケット団 最高幹部',
      ru: 'Верховный босс Команды GO Ракета'
    },
    radarType: {
      cs: 'Super Rocket Radar',
      en: 'Super Rocket Radar',
      ja: 'スーパーロケットレーダー',
      ru: 'Super Rocket Radar'
    },
    radarIcon: 'https://cdn.leekduck.com/assets/img/items/Super%20Rocket%20Radar.png',
    avatarColor: '#b91c1c',
    borderColor: 'rgba(239, 68, 68, 0.45)',
    quote: {
      cs: '„Odvážil ses postavit Team GO Rocket? Poznej naši skutečnou sílu!“',
      en: '"You dare challenge Team GO Rocket? Experience our true supremacy!"',
      ja: '「このサカキ様に挑もうというのか…後悔させてやろう！」',
      ru: '«Ты посмел бросить вызов Команде GO Ракета? Узри нашу истинную силу!»'
    },
    slot1: [
      {
        name: 'Persian',
        dexId: 53,
        types: ['Normal'],
        isCatchable: false,
        counters: [
          { name: 'Lucario', dexId: 448, fastMove: 'Counter', chargedMove: 'Power-Up Punch', type: 'Fighting' },
          { name: 'Machamp', dexId: 68, fastMove: 'Counter', chargedMove: 'Cross Chop', type: 'Fighting' },
          { name: 'Terrakion', dexId: 639, fastMove: 'Double Kick', chargedMove: 'Sacred Sword', type: 'Fighting' }
        ]
      }
    ],
    slot2: [
      {
        name: 'Kingdra',
        dexId: 230,
        types: ['Water', 'Dragon'],
        counters: [
          { name: 'Gardevoir', dexId: 282, fastMove: 'Charm', chargedMove: 'Dazzling Gleam', type: 'Fairy' },
          { name: 'Togekiss', dexId: 468, fastMove: 'Charm', chargedMove: 'Ancient Power', type: 'Fairy' },
          { name: 'Dialga', dexId: 483, fastMove: 'Dragon Breath', chargedMove: 'Iron Head', type: 'Dragon' }
        ]
      },
      {
        name: 'Rhyperior',
        dexId: 464,
        types: ['Ground', 'Rock'],
        counters: [
          { name: 'Swampert', dexId: 260, fastMove: 'Mud Shot', chargedMove: 'Hydro Cannon', type: 'Water' },
          { name: 'Kartana', dexId: 798, fastMove: 'Razor Leaf', chargedMove: 'Leaf Blade', type: 'Grass' },
          { name: 'Kyogre', dexId: 382, fastMove: 'Waterfall', chargedMove: 'Surf', type: 'Water' }
        ]
      },
      {
        name: 'Kangaskhan',
        dexId: 115,
        types: ['Normal'],
        counters: [
          { name: 'Lucario', dexId: 448, fastMove: 'Counter', chargedMove: 'Power-Up Punch', type: 'Fighting' },
          { name: 'Conkeldurr', dexId: 534, fastMove: 'Counter', chargedMove: 'Dynamic Punch', type: 'Fighting' }
        ]
      }
    ],
    slot3: [
      {
        name: 'Shadow Rayquaza',
        dexId: 384,
        types: ['Dragon', 'Flying'],
        isCatchable: true,
        counters: [
          { name: 'Mamoswine', dexId: 473, fastMove: 'Powder Snow', chargedMove: 'Avalanche', type: 'Ice' },
          { name: 'Baxcalibur', dexId: 998, fastMove: 'Ice Fang', chargedMove: 'Avalanche', type: 'Ice' },
          { name: 'Glaceon', dexId: 471, fastMove: 'Frost Breath', chargedMove: 'Avalanche', type: 'Ice' }
        ]
      },
      {
        name: 'Shadow Groudon',
        dexId: 383,
        types: ['Ground'],
        isCatchable: true,
        counters: [
          { name: 'Kyogre', dexId: 382, fastMove: 'Waterfall', chargedMove: 'Surf', type: 'Water' },
          { name: 'Swampert', dexId: 260, fastMove: 'Mud Shot', chargedMove: 'Hydro Cannon', type: 'Water' },
          { name: 'Zarude', dexId: 893, fastMove: 'Vine Whip', chargedMove: 'Power Whip', type: 'Grass' }
        ]
      }
    ],
    bestTeamRecommendation: {
      lead: {
        name: 'Lucario',
        dexId: 448,
        role: {
          cs: 'Spamování Power-Up Punch pro spálení obou štítů Persianovi',
          en: 'Shield burner with rapid Power-Up Punch spam',
          ja: 'グロウパンチ連打でペルシアンのシールドを2枚即時破壊',
          ru: 'Сбивание 2 щитов Персиану быстрыми Power-Up Punch'
        }
      },
      shieldBreaker: {
        name: 'Swampert',
        dexId: 260,
        role: {
          cs: 'Univerzální krytí na Ground / Water / Rock slabosti v 2. slotu',
          en: 'Flexible Water/Ground coverage against slot 2',
          ja: '2枠目のじめん/いわ/はがねに対応するハイドロカノン',
          ru: 'Универсальный дамагер против 2-го слота (Hydro Cannon)'
        }
      },
      anchor: {
        name: 'Mamoswine',
        dexId: 473,
        role: {
          cs: 'Ice Avalanche pro 2.56× double weakness Shadow Legendy',
          en: 'Double Ice Avalanche to eliminate the Shadow Legendary',
          ja: '2重弱点（氷）を突くゆきなだれでシャドウ伝説を一撃粉砕',
          ru: 'Ледяной финишер против Теневой Легенды (двойная уязвимость)'
        }
      }
    },
    strategyTip: {
      cs: '⚡ Klíč k vítězství: Persian dává extrémní Scratch damage. Nikdy nezačínejte s Lucariem na 1. pozici! Dejte ho do 2. slotu a v 0:00 ho okamžitě vyměňte do boje – Persian na 2 sekundy ztuhne a vy získáte energii zdarma.',
      en: '⚡ Win Condition: Persian deals lethal Scratch damage. Never start Lucario in slot 1! Put him in slot 2 and instantly switch to him at 0:00 to trigger the 2-second AI freeze.',
      ja: '⚡ 必勝テクニック：ペルシアンの「ひっかく」は超高火力です。ルカリオを1番目に置かず、2番目に配置してバトル開始直後に即交代！2秒の硬直中に一方的に攻撃して突破しましょう。',
      ru: '⚡ Ключ к победе: У Персиана огромный урон от Scratch. Не ставьте Лукарио в 1-й слот! Поставьте во 2-й и сменитесь на него на 0:00 — бот замрет на 2 секунды.'
    }
  },
  sierra: {
    id: 'sierra',
    name: {
      cs: 'Lídr Sierra',
      en: 'Leader Sierra',
      ja: 'リーダー シエラ',
      ru: 'Лидер Сиерра'
    },
    title: {
      cs: 'Mistryně taktiky Team GO Rocket',
      en: 'Master Tactician of Team GO Rocket',
      ja: 'ロケット団きっての知性派幹部',
      ru: 'Тактический лидер Команды GO Ракета'
    },
    radarType: {
      cs: 'Rocket Radar',
      en: 'Rocket Radar',
      ja: 'ロケットレーダー',
      ru: 'Rocket Radar'
    },
    radarIcon: 'https://cdn.leekduck.com/assets/img/items/Rocket%20Radar.png',
    avatarColor: '#a855f7',
    borderColor: 'rgba(168, 85, 247, 0.45)',
    quote: {
      cs: '„Mé schopnosti jsou dokonalé. Nemáš sebemenší šanci!“',
      en: '"My preparation is flawless. You never stood a chance!"',
      ja: '「私の計算に狂いはないわ。あなたに勝ち目はないの。」',
      ru: '«Мои расчеты безупречны. У тебя нет ни единого шанса!»'
    },
    slot1: [
      {
        name: 'Trapinch',
        dexId: 328,
        types: ['Ground'],
        isCatchable: true,
        canBeShiny: true,
        counters: [
          { name: 'Kartana', dexId: 798, fastMove: 'Razor Leaf', chargedMove: 'Leaf Blade', type: 'Grass' },
          { name: 'Mamoswine', dexId: 473, fastMove: 'Powder Snow', chargedMove: 'Avalanche', type: 'Ice' },
          { name: 'Kyogre', dexId: 382, fastMove: 'Waterfall', chargedMove: 'Surf', type: 'Water' }
        ]
      }
    ],
    slot2: [
      {
        name: 'Milotic',
        dexId: 350,
        types: ['Water'],
        counters: [
          { name: 'Kartana', dexId: 798, fastMove: 'Razor Leaf', chargedMove: 'Leaf Blade', type: 'Grass' },
          { name: 'Zekrom', dexId: 644, fastMove: 'Charge Beam', chargedMove: 'Wild Charge', type: 'Electric' },
          { name: 'Raikou', dexId: 243, fastMove: 'Thunder Shock', chargedMove: 'Wild Charge', type: 'Electric' }
        ]
      },
      {
        name: 'Honchkrow',
        dexId: 430,
        types: ['Dark', 'Flying'],
        counters: [
          { name: 'Rhyperior', dexId: 464, fastMove: 'Smack Down', chargedMove: 'Rock Wrecker', type: 'Rock' },
          { name: 'Tyranitar', dexId: 248, fastMove: 'Smack Down', chargedMove: 'Stone Edge', type: 'Rock' }
        ]
      },
      {
        name: 'Alakazam',
        dexId: 65,
        types: ['Psychic'],
        counters: [
          { name: 'Tyranitar', dexId: 248, fastMove: 'Bite', chargedMove: 'Brutal Swing', type: 'Dark' },
          { name: 'Hydreigon', dexId: 635, fastMove: 'Bite', chargedMove: 'Brutal Swing', type: 'Dark' }
        ]
      }
    ],
    slot3: [
      {
        name: 'Houndoom',
        dexId: 229,
        types: ['Dark', 'Fire'],
        counters: [
          { name: 'Terrakion', dexId: 639, fastMove: 'Double Kick', chargedMove: 'Sacred Sword', type: 'Fighting' },
          { name: 'Swampert', dexId: 260, fastMove: 'Mud Shot', chargedMove: 'Hydro Cannon', type: 'Water' },
          { name: 'Rhyperior', dexId: 464, fastMove: 'Smack Down', chargedMove: 'Rock Wrecker', type: 'Rock' }
        ]
      },
      {
        name: 'Gardevoir',
        dexId: 282,
        types: ['Psychic', 'Fairy'],
        counters: [
          { name: 'Metagross', dexId: 376, fastMove: 'Bullet Punch', chargedMove: 'Meteor Mash', type: 'Steel' },
          { name: 'Dialga', dexId: 483, fastMove: 'Metal Claw', chargedMove: 'Iron Head', type: 'Steel' }
        ]
      }
    ],
    bestTeamRecommendation: {
      lead: {
        name: 'Kartana',
        dexId: 798,
        role: {
          cs: 'Bleskové zničení Trapinche a Milotica čistým Grass dps',
          en: 'Melt Trapinch and Milotic with high Grass DPS',
          ja: '圧倒的な草火力ではっぱカッター連打、トラピンチを秒殺',
          ru: 'Мгновенный разнос Trapinch и Milotic травяным уроном'
        }
      },
      shieldBreaker: {
        name: 'Lucario',
        dexId: 448,
        role: {
          cs: 'Rychlé pálení štítů a drtivý finiš na Houndooma',
          en: 'Shield burner and Houndoom counter',
          ja: 'シールド剥がし兼ヘルガー対策のかくとう枠',
          ru: 'Сбивание щитов и контер против Houndoom'
        }
      },
      anchor: {
        name: 'Metagross',
        dexId: 376,
        role: {
          cs: 'Meteor Mash na Gardevoir a Alakazama s obří odolností',
          en: 'Meteor Mash tank against Gardevoir and Alakazam',
          ja: 'サーナイトとフーディンを完封するコメットパンチ要塞',
          ru: 'Танк с Meteor Mash против Gardevoir и Alakazam'
        }
      }
    },
    strategyTip: {
      cs: '⚡ Pozor na Gardevoir: Její rychlý útok Charm má masivní základní poškození. Nechte si plně nabitý Meteor Mash u Metagrosse nebo Iron Head u Dialgy na okamžité vyřazení.',
      en: '⚡ Gardevoir Warning: Charm hits like a freight train. Save a fully charged Meteor Mash on Metagross to one-shot her before she shreds your lineup.',
      ja: '⚡ サーナイト注意報：「あまえる」の威力が凶悪です。メタグロスのコメットパンチを溜めておき、登場と同時に即撃破してください。',
      ru: '⚡ Опасность: Charm у Gardevoir наносит дикий урон. Сохраните накопленный Meteor Mash на Metagross для ваншота.'
    }
  },
  cliff: {
    id: 'cliff',
    name: {
      cs: 'Lídr Cliff',
      en: 'Leader Cliff',
      ja: 'リーダー クリフ',
      ru: 'Лидер Клифф'
    },
    title: {
      cs: 'Hrubá síla Team GO Rocket',
      en: 'Brute Strength of Team GO Rocket',
      ja: 'ロケット団の剛腕リーダー',
      ru: 'Тяжелая сила Команды GO Ракета'
    },
    radarType: {
      cs: 'Rocket Radar',
      en: 'Rocket Radar',
      ja: 'ロケットレーダー',
      ru: 'Rocket Radar'
    },
    radarIcon: 'https://cdn.leekduck.com/assets/img/items/Rocket%20Radar.png',
    avatarColor: '#0284c7',
    borderColor: 'rgba(56, 189, 248, 0.45)',
    quote: {
      cs: '„Má síla a svaly tě rozdrtí. Nezkoušej mi stát v cestě!“',
      en: '"My sheer power will crush you. Stand aside!"',
      ja: '「オレのパワーに敵う奴などいない！叩き潰してやる！」',
      ru: '«Моя мощь сокрушит тебя. Убирайся с дороги!»'
    },
    slot1: [
      {
        name: 'Aerodactyl',
        dexId: 142,
        types: ['Rock', 'Flying'],
        isCatchable: true,
        canBeShiny: true,
        counters: [
          { name: 'Kyogre', dexId: 382, fastMove: 'Waterfall', chargedMove: 'Surf', type: 'Water' },
          { name: 'Swampert', dexId: 260, fastMove: 'Water Gun', chargedMove: 'Hydro Cannon', type: 'Water' },
          { name: 'Metagross', dexId: 376, fastMove: 'Bullet Punch', chargedMove: 'Meteor Mash', type: 'Steel' },
          { name: 'Rhyperior', dexId: 464, fastMove: 'Smack Down', chargedMove: 'Rock Wrecker', type: 'Rock' }
        ]
      }
    ],
    slot2: [
      {
        name: 'Kingdra',
        dexId: 230,
        types: ['Water', 'Dragon'],
        counters: [
          { name: 'Togekiss', dexId: 468, fastMove: 'Charm', chargedMove: 'Dazzling Gleam', type: 'Fairy' },
          { name: 'Gardevoir', dexId: 282, fastMove: 'Charm', chargedMove: 'Dazzling Gleam', type: 'Fairy' }
        ]
      },
      {
        name: 'Cradily',
        dexId: 346,
        types: ['Rock', 'Grass'],
        counters: [
          { name: 'Lucario', dexId: 448, fastMove: 'Counter', chargedMove: 'Power-Up Punch', type: 'Fighting' },
          { name: 'Metagross', dexId: 376, fastMove: 'Bullet Punch', chargedMove: 'Meteor Mash', type: 'Steel' }
        ]
      },
      {
        name: 'Marowak',
        dexId: 105,
        types: ['Ground'],
        counters: [
          { name: 'Kyogre', dexId: 382, fastMove: 'Waterfall', chargedMove: 'Surf', type: 'Water' },
          { name: 'Kartana', dexId: 798, fastMove: 'Razor Leaf', chargedMove: 'Leaf Blade', type: 'Grass' }
        ]
      }
    ],
    slot3: [
      {
        name: 'Tyranitar',
        dexId: 248,
        types: ['Rock', 'Dark'],
        counters: [
          { name: 'Lucario', dexId: 448, fastMove: 'Counter', chargedMove: 'Power-Up Punch', type: 'Fighting' },
          { name: 'Terrakion', dexId: 639, fastMove: 'Double Kick', chargedMove: 'Sacred Sword', type: 'Fighting' },
          { name: 'Machamp', dexId: 68, fastMove: 'Counter', chargedMove: 'Cross Chop', type: 'Fighting' }
        ]
      },
      {
        name: 'Mamoswine',
        dexId: 473,
        types: ['Ice', 'Ground'],
        counters: [
          { name: 'Metagross', dexId: 376, fastMove: 'Bullet Punch', chargedMove: 'Meteor Mash', type: 'Steel' },
          { name: 'Kyogre', dexId: 382, fastMove: 'Waterfall', chargedMove: 'Surf', type: 'Water' }
        ]
      }
    ],
    bestTeamRecommendation: {
      lead: {
        name: 'Kyogre',
        dexId: 382,
        role: {
          cs: 'Odolá Rock Throw od Aerodactyla a sestřelí ho Waterfallem',
          en: 'Hard-counters Aerodactyl with Waterfall pressure',
          ja: 'プテラの「いわおとし」を高耐久で耐えつつたきのぼりで圧倒',
          ru: 'Держит удары Аэродактиля и сносит его Waterfall'
        }
      },
      shieldBreaker: {
        name: 'Lucario',
        dexId: 448,
        role: {
          cs: 'Double-weakness (4×) Counter finiš na Tyranitara a Cradily',
          en: '4x Fighting damage to erase Tyranitar and burn shields',
          ja: 'バンギラスを二重弱点（格闘）で瞬殺しシールドを全剥がし',
          ru: '4x урон от Fighting по Tyranitar и сбивание щитов'
        }
      },
      anchor: {
        name: 'Togekiss',
        dexId: 468,
        role: {
          cs: 'Bezpečné zničení Kingdry s imunitou vůči Dragon útokům',
          en: 'Fairy immunity wall against Kingdra Dragon moves',
          ja: 'キングドラのドラゴン技を完全無効化するフェアリー壁役',
          ru: 'Иммунитет к атакам Kingdra и добивание Чармом'
        }
      }
    },
    strategyTip: {
      cs: '⚡ Pozor na Aerodactyla: Má extrémně rychlé a silné Rock / Steel útoky. Pokud váš counter padá moc rychle, použijte výměnný trik pro 2s stun!',
      en: '⚡ Aerodactyl Warning: Rock Throw shreds frail counters. Switch immediately on turn 1 to freeze Aerodactyl for 2 free seconds.',
      ja: '⚡ プテラ対策：攻撃力が非常に高い難所です。初手交代テクニックを使って硬直させ、通常技を受けずにゲージを溜めましょう。',
      ru: '⚡ Осторожно с Aerodactyl: Очень высокий урон. Обязательно делайте смену на старте для 2 сек стана.'
    }
  },
  arlo: {
    id: 'arlo',
    name: {
      cs: 'Lídr Arlo',
      en: 'Leader Arlo',
      ja: 'リーダー アルロ',
      ru: 'Лидер Арло'
    },
    title: {
      cs: 'Ambiciózní konstruktér Team GO Rocket',
      en: 'Ambitious Engineer of Team GO Rocket',
      ja: 'ロケット団の野心家メカニック',
      ru: 'Амбициозный инженер Команды GO Ракета'
    },
    radarType: {
      cs: 'Rocket Radar',
      en: 'Rocket Radar',
      ja: 'ロケットレーダー',
      ru: 'Rocket Radar'
    },
    radarIcon: 'https://cdn.leekduck.com/assets/img/items/Rocket%20Radar.png',
    avatarColor: '#ea580c',
    borderColor: 'rgba(249, 115, 22, 0.45)',
    quote: {
      cs: '„Vše mám propočtené do nejmenšího detailu. Tvá porážka je neodvratná!“',
      en: '"Everything is engineered to perfection. Your defeat is inevitable!"',
      ja: '「完璧に計算された私の布陣を崩せる者など存在しない！」',
      ru: '«Все просчитано до мелочей. Твое поражение неизбежно!»'
    },
    slot1: [
      {
        name: 'Bagon',
        dexId: 371,
        types: ['Dragon'],
        isCatchable: true,
        canBeShiny: true,
        counters: [
          { name: 'Mamoswine', dexId: 473, fastMove: 'Powder Snow', chargedMove: 'Avalanche', type: 'Ice' },
          { name: 'Togekiss', dexId: 468, fastMove: 'Charm', chargedMove: 'Ancient Power', type: 'Fairy' },
          { name: 'Gardevoir', dexId: 282, fastMove: 'Charm', chargedMove: 'Dazzling Gleam', type: 'Fairy' }
        ]
      }
    ],
    slot2: [
      {
        name: 'Charizard',
        dexId: 6,
        types: ['Fire', 'Flying'],
        counters: [
          { name: 'Rhyperior', dexId: 464, fastMove: 'Smack Down', chargedMove: 'Rock Wrecker', type: 'Rock' },
          { name: 'Tyranitar', dexId: 248, fastMove: 'Smack Down', chargedMove: 'Stone Edge', type: 'Rock' },
          { name: 'Kyogre', dexId: 382, fastMove: 'Waterfall', chargedMove: 'Surf', type: 'Water' }
        ]
      },
      {
        name: 'Hypno',
        dexId: 97,
        types: ['Psychic'],
        counters: [
          { name: 'Tyranitar', dexId: 248, fastMove: 'Bite', chargedMove: 'Brutal Swing', type: 'Dark' },
          { name: 'Hydreigon', dexId: 635, fastMove: 'Bite', chargedMove: 'Brutal Swing', type: 'Dark' }
        ]
      },
      {
        name: 'Golurk',
        dexId: 623,
        types: ['Ground', 'Ghost'],
        counters: [
          { name: 'Swampert', dexId: 260, fastMove: 'Water Gun', chargedMove: 'Hydro Cannon', type: 'Water' },
          { name: 'Kartana', dexId: 798, fastMove: 'Razor Leaf', chargedMove: 'Leaf Blade', type: 'Grass' }
        ]
      }
    ],
    slot3: [
      {
        name: 'Scizor',
        dexId: 212,
        types: ['Bug', 'Steel'],
        counters: [
          { name: 'Reshiram', dexId: 643, fastMove: 'Fire Fang', chargedMove: 'Fusion Flare', type: 'Fire' },
          { name: 'Heatran', dexId: 485, fastMove: 'Fire Spin', chargedMove: 'Magma Storm', type: 'Fire' },
          { name: 'Charizard', dexId: 6, fastMove: 'Fire Spin', chargedMove: 'Blast Burn', type: 'Fire' }
        ]
      },
      {
        name: 'Dragonite',
        dexId: 149,
        types: ['Dragon', 'Flying'],
        counters: [
          { name: 'Mamoswine', dexId: 473, fastMove: 'Powder Snow', chargedMove: 'Avalanche', type: 'Ice' },
          { name: 'Baxcalibur', dexId: 998, fastMove: 'Ice Fang', chargedMove: 'Avalanche', type: 'Ice' }
        ]
      }
    ],
    bestTeamRecommendation: {
      lead: {
        name: 'Mamoswine',
        dexId: 473,
        role: {
          cs: 'Bleskový odstřel Bagona a 4× Ice slabost na Dragonita',
          en: 'Obliterates Bagon and 4x Ice-counters Dragonite',
          ja: 'タツベイとカイリューを二重弱点の氷雪攻撃で完封',
          ru: 'Уничтожает Bagon и Dragonite двойным ледяным уроном'
        }
      },
      shieldBreaker: {
        name: 'Rhyperior',
        dexId: 464,
        role: {
          cs: 'Double-rock útoky na Charizarda a pálení štítů',
          en: 'Double Rock Wrecker wall against Charizard',
          ja: 'リザードンをいわくだき＋がんせきほうで即死させる岩壁',
          ru: 'Каменный сокрушитель против Charizard и сбивание щитов'
        }
      },
      anchor: {
        name: 'Reshiram',
        dexId: 643,
        role: {
          cs: '4× Fire double weakness na Scizora (zničí ho během 3 sekund)',
          en: '4x Fire melt against Scizor in under 3 seconds',
          ja: 'ハッサムを二重弱点（炎）のクロスフレイムで一瞬で融解',
          ru: '4x урон огнем по Scizor (испаряет за 3 секунды)'
        }
      }
    },
    strategyTip: {
      cs: '⚡ Scizor má pouze 1 jedinou slabost: OHEŇ (Fire). Má však 4× double-weakness! Jakýkoli Fire útočník (Reshiram, Heatran, Charizard) ho zničí dřív, než stihne použít Charged Move.',
      en: '⚡ Scizor Weakness: Scizor resists almost everything EXCEPT Fire (4x double-weakness). Bring any decent Fire-type to incinerate him instantly.',
      ja: '⚡ ハッサムの弱点：ハッサムの弱点は「ほのお」のみですが、4倍の二重弱点です！レシラムやヒードランで瞬時に焼き尽くしましょう。',
      ru: '⚡ Уязвимость Scizor: У него только 1 слабость — ОГОНЬ (х4 урон). Любой Fire-покемон уничтожит его за пару секунд.'
    }
  }
};

export const RocketLeadersInteractiveWidget: React.FC<RocketLeadersInteractiveWidgetProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<RocketLeaderTab>('giovanni');
  const [copiedQuery, setCopiedQuery] = useState<string | null>(null);

  // Stun simulator state
  const [isStunSimActive, setIsStunSimActive] = useState(false);
  const [stunTimeLeft, setStunTimeLeft] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isStunSimActive && stunTimeLeft > 0) {
      timer = setTimeout(() => {
        setStunTimeLeft(prev => Math.max(0, +(prev - 0.1).toFixed(1)));
      }, 100);
    } else if (stunTimeLeft === 0) {
      setIsStunSimActive(false);
    }
    return () => clearTimeout(timer);
  }, [isStunSimActive, stunTimeLeft]);

  const handleStartStunSim = () => {
    setIsStunSimActive(true);
    setStunTimeLeft(2.5);
  };

  const handleCopySearch = async (query: string, key: string) => {
    try {
      await navigator.clipboard.writeText(query);
      setCopiedQuery(key);
      setTimeout(() => setCopiedQuery(null), 2500);
    } catch {
      setCopiedQuery(key);
      setTimeout(() => setCopiedQuery(null), 2500);
    }
  };

  const getLoc = (dict: Record<Language, string>) => {
    return dict[lang] || dict.en;
  };

  const currentLeader = activeTab !== 'stun' ? LEADERS_DATA[activeTab] : null;

  return (
    <div className="rocket-interactive-widget">
      {/* 1. TOP NAVIGATION TABS */}
      <div className="rocket-nav-tabs">
        <button
          type="button"
          className={`rocket-tab-btn tab-giovanni ${activeTab === 'giovanni' ? 'active' : ''}`}
          onClick={() => setActiveTab('giovanni')}
        >
          <span className="tab-dot dot-giovanni"></span>
          <span>{lang === 'cs' ? 'Šéf Giovanni' : lang === 'ja' ? 'ボス サカキ' : lang === 'ru' ? 'Джованни' : 'Boss Giovanni'}</span>
        </button>
        <button
          type="button"
          className={`rocket-tab-btn tab-sierra ${activeTab === 'sierra' ? 'active' : ''}`}
          onClick={() => setActiveTab('sierra')}
        >
          <span className="tab-dot dot-sierra"></span>
          <span>{lang === 'cs' ? 'Lídr Sierra' : lang === 'ja' ? 'シエラ' : lang === 'ru' ? 'Сиерра' : 'Leader Sierra'}</span>
        </button>
        <button
          type="button"
          className={`rocket-tab-btn tab-cliff ${activeTab === 'cliff' ? 'active' : ''}`}
          onClick={() => setActiveTab('cliff')}
        >
          <span className="tab-dot dot-cliff"></span>
          <span>{lang === 'cs' ? 'Lídr Cliff' : lang === 'ja' ? 'クリフ' : lang === 'ru' ? 'Клифф' : 'Leader Cliff'}</span>
        </button>
        <button
          type="button"
          className={`rocket-tab-btn tab-arlo ${activeTab === 'arlo' ? 'active' : ''}`}
          onClick={() => setActiveTab('arlo')}
        >
          <span className="tab-dot dot-arlo"></span>
          <span>{lang === 'cs' ? 'Lídr Arlo' : lang === 'ja' ? 'アルロ' : lang === 'ru' ? 'Арло' : 'Leader Arlo'}</span>
        </button>
        <button
          type="button"
          className={`rocket-tab-btn tab-stun ${activeTab === 'stun' ? 'active' : ''}`}
          onClick={() => setActiveTab('stun')}
        >
          <Zap size={14} className="tab-icon-zap" />
          <span>{lang === 'cs' ? '⚡ Stun Trik & Balóny' : lang === 'ja' ? '⚡ スタン硬直＆気球' : lang === 'ru' ? '⚡ Стан и Шары' : '⚡ 2s Stun Engine'}</span>
        </button>
      </div>

      {/* 2. LEADER CONTENT VIEW */}
      {currentLeader && (
        <div className="rocket-leader-panel" style={{ borderColor: currentLeader.borderColor }}>
          {/* Header Banner */}
          <div className="leader-banner-card">
            <div className="leader-badge-pill" style={{ borderColor: currentLeader.borderColor }}>
              <img src={currentLeader.radarIcon} alt="Radar" className="radar-mini-icon" />
              <span>{getLoc(currentLeader.radarType)}</span>
            </div>
            <h2 className="leader-name" style={{ color: currentLeader.avatarColor }}>
              {getLoc(currentLeader.name)}
            </h2>
            <div className="leader-title">{getLoc(currentLeader.title)}</div>
            <div className="leader-quote">{getLoc(currentLeader.quote)}</div>
          </div>

          {/* 3 Slot Matrix */}
          <div className="slots-grid-container">
            {/* Slot 1: Lead (Fixed / Catchable Shadow) */}
            <div className="slot-card slot-card-catchable">
              <div className="slot-card-header">
                <span className="slot-num-badge">SLOT 1</span>
                <span className="slot-type-label">
                  {lang === 'cs' ? 'Garantovaný Lead (Odchyt) ✨' : 
                   lang === 'ja' ? '確定初手（捕獲対象）✨' : 
                   lang === 'ru' ? 'Первый босс (Поимка) ✨' : 
                   'Guaranteed Lead (Catchable) ✨'}
                </span>
              </div>
              <div className="slot-pokemon-list">
                {currentLeader.slot1.map(poke => (
                  <div key={poke.name} className="poke-item-card">
                    <div className="poke-image-col">
                      <div className="shadow-flame-wrap">
                        <img 
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.dexId}.png`} 
                          alt={poke.name} 
                          className="poke-artwork-img"
                        />
                        <Flame size={16} className="shadow-flame-icon" />
                      </div>
                      <span className="poke-name-label">{poke.name}</span>
                      {poke.canBeShiny && (
                        <span className="shiny-shadow-badge">✨ Shiny Shadow</span>
                      )}
                    </div>
                    <div className="poke-counters-col">
                      <div className="counters-title">
                        {lang === 'cs' ? 'Nejlepší countery (Pálení štítů):' : 'Best Shield-Breaker Counters:'}
                      </div>
                      <div className="counters-chips-wrap">
                        {poke.counters.map(c => (
                          <div key={c.name} className="counter-chip">
                            <img 
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${c.dexId}.png`} 
                              alt={c.name} 
                              className="chip-img"
                            />
                            <div className="chip-details">
                              <span className="chip-name">{c.name}</span>
                              <span className="chip-move">{c.fastMove} + <strong>{c.chargedMove}</strong></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slot 2: Middle (Dynamic) */}
            <div className="slot-card">
              <div className="slot-card-header">
                <span className="slot-num-badge">SLOT 2</span>
                <span className="slot-type-label">
                  {lang === 'cs' ? 'Náhodný výběr (1 ze 3)' : 
                   lang === 'ja' ? 'ランダム選出（3種より1匹）' : 
                   lang === 'ru' ? 'Случайный выбор (1 из 3)' : 
                   'Dynamic Pool (1 of 3)'}
                </span>
              </div>
              <div className="slot-pokemon-list">
                {currentLeader.slot2.map(poke => (
                  <div key={poke.name} className="poke-item-card">
                    <div className="poke-image-col">
                      <div className="shadow-flame-wrap">
                        <img 
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.dexId}.png`} 
                          alt={poke.name} 
                          className="poke-artwork-img"
                        />
                      </div>
                      <span className="poke-name-label">{poke.name}</span>
                    </div>
                    <div className="poke-counters-col">
                      <div className="counters-chips-wrap">
                        {poke.counters.map(c => (
                          <div key={c.name} className="counter-chip">
                            <img 
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${c.dexId}.png`} 
                              alt={c.name} 
                              className="chip-img"
                            />
                            <div className="chip-details">
                              <span className="chip-name">{c.name}</span>
                              <span className="chip-move">{c.fastMove} + {c.chargedMove}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slot 3: Boss Anchor / Legendary */}
            <div className="slot-card slot-card-boss">
              <div className="slot-card-header">
                <span className="slot-num-badge">SLOT 3</span>
                <span className="slot-type-label">
                  {activeTab === 'giovanni' ? 
                    (lang === 'cs' ? 'Stínový Legendární Boss' : 'Shadow Legendary Boss') : 
                    (lang === 'cs' ? 'Finální těžký tank' : 'Heavy Anchor Boss')}
                </span>
              </div>
              <div className="slot-pokemon-list">
                {currentLeader.slot3.map(poke => (
                  <div key={poke.name} className="poke-item-card">
                    <div className="poke-image-col">
                      <div className="shadow-flame-wrap boss-flame">
                        <img 
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.dexId}.png`} 
                          alt={poke.name} 
                          className="poke-artwork-img"
                        />
                        <Flame size={18} className="shadow-flame-icon flame-legendary" />
                      </div>
                      <span className="poke-name-label">{poke.name}</span>
                    </div>
                    <div className="poke-counters-col">
                      <div className="counters-chips-wrap">
                        {poke.counters.map(c => (
                          <div key={c.name} className="counter-chip counter-chip-boss">
                            <img 
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${c.dexId}.png`} 
                              alt={c.name} 
                              className="chip-img"
                            />
                            <div className="chip-details">
                              <span className="chip-name">{c.name}</span>
                              <span className="chip-move">{c.fastMove} + <strong>{c.chargedMove}</strong></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dream Team 3-Pokemon Composition */}
          <div className="dream-team-card">
            <div className="dream-team-header">
              <Swords size={18} className="dream-team-icon" />
              <h3>
                {lang === 'cs' ? 'Doporučená univerzální sestava 3 Pokémonů (Tým snů)' : 
                 lang === 'ja' ? '最適攻略おすすめ3体パーティ編成' : 
                 lang === 'ru' ? 'Рекомендуемый сетап из 3 покемонов' : 
                 'Recommended Universal 3-Pokémon Lineup'}
              </h3>
            </div>
            <div className="dream-team-grid">
              <div className="dream-slot">
                <span className="dream-slot-tag">{lang === 'cs' ? '1. Pozice (Lead)' : 'Slot 1 (Lead)'}</span>
                <img 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentLeader.bestTeamRecommendation.lead.dexId}.png`} 
                  alt={currentLeader.bestTeamRecommendation.lead.name}
                  className="dream-poke-img" 
                />
                <span className="dream-poke-name">{currentLeader.bestTeamRecommendation.lead.name}</span>
                <span className="dream-poke-role">{getLoc(currentLeader.bestTeamRecommendation.lead.role)}</span>
              </div>
              <div className="dream-slot">
                <span className="dream-slot-tag">{lang === 'cs' ? '2. Pozice (Shield Burn)' : 'Slot 2 (Shield Burn)'}</span>
                <img 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentLeader.bestTeamRecommendation.shieldBreaker.dexId}.png`} 
                  alt={currentLeader.bestTeamRecommendation.shieldBreaker.name}
                  className="dream-poke-img" 
                />
                <span className="dream-poke-name">{currentLeader.bestTeamRecommendation.shieldBreaker.name}</span>
                <span className="dream-poke-role">{getLoc(currentLeader.bestTeamRecommendation.shieldBreaker.role)}</span>
              </div>
              <div className="dream-slot">
                <span className="dream-slot-tag">{lang === 'cs' ? '3. Pozice (Anchor / Finisher)' : 'Slot 3 (Anchor / Finisher)'}</span>
                <img 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentLeader.bestTeamRecommendation.anchor.dexId}.png`} 
                  alt={currentLeader.bestTeamRecommendation.anchor.name}
                  className="dream-poke-img" 
                />
                <span className="dream-poke-name">{currentLeader.bestTeamRecommendation.anchor.name}</span>
                <span className="dream-poke-role">{getLoc(currentLeader.bestTeamRecommendation.anchor.role)}</span>
              </div>
            </div>
          </div>

          {/* Bottom Tactical Pro Tip */}
          <div className="leader-strategy-strip">
            <Zap size={18} className="strategy-strip-icon" />
            <div className="strategy-strip-text">{getLoc(currentLeader.strategyTip)}</div>
          </div>
        </div>
      )}

      {/* 3. STUN MECHANIC & BALLOONS ENGINE TAB */}
      {activeTab === 'stun' && (
        <div className="rocket-stun-panel">
          <div className="stun-hero-header">
            <Zap size={26} className="stun-hero-icon" />
            <h2>
              {lang === 'cs' ? 'Mechanika 2,5sekundového omráčení (Stun Lock) & Rakeťácké balóny' : 
               lang === 'ja' ? '2.5秒間の硬直時間（スタンループ）＆ロケット団気球仕様' : 
               lang === 'ru' ? 'Механика 2.5-секундного оглушения (Stun Lock) и Шары' : 
               'The 2.5-Second Stun Lock Engine & Balloon Rotation'}
            </h2>
          </div>

          <div className="stun-content-grid">
            {/* Interactive Stun Simulator */}
            <div className="stun-sim-card">
              <h3>
                <Timer size={18} />
                {lang === 'cs' ? 'Interaktivní simulátor Stun efektu' : 'Interactive Stun Simulator'}
              </h3>
              <p>
                {lang === 'cs' ? 'Vyzkoušejte si, jak dlouhé je 2,5sekundové okno, během kterého soupeř po Charged útoku nebo swapu vůbec neútočí:' : 
                 'Simulate how long the 2.5-second freeze window lasts after any charged move or swap:'}
              </p>

              <div className="stun-timer-display">
                <div className={`stun-meter-ring ${isStunSimActive ? 'active' : ''}`}>
                  <span className="stun-timer-value">
                    {isStunSimActive ? `${stunTimeLeft.toFixed(1)}s` : '2.5s'}
                  </span>
                  <span className="stun-timer-state">
                    {isStunSimActive ? (
                      <span className="badge-frozen">❄️ {lang === 'cs' ? 'PROTIVNÍK NEÚTOČÍ!' : 'AI FROZEN!'}</span>
                    ) : (
                      <span className="badge-ready">{lang === 'cs' ? 'Připraveno ke spuštění' : 'Ready'}</span>
                    )}
                  </span>
                </div>
                <button
                  type="button"
                  className={`stun-trigger-btn ${isStunSimActive ? 'btn-running' : ''}`}
                  onClick={handleStartStunSim}
                  disabled={isStunSimActive}
                >
                  <RotateCcw size={16} />
                  <span>
                    {isStunSimActive ? 
                      (lang === 'cs' ? 'Stun aktivní...' : 'Stun running...') : 
                      (lang === 'cs' ? 'Spustit simulaci Charged útoku / Swapu' : 'Simulate Charged Attack / Swap')}
                  </span>
                </button>
              </div>

              <div className="stun-calc-note">
                <Info size={14} />
                <span>
                  {lang === 'cs' ? 'Během těchto 2,5 s stihnete 3–4 Fast útoky (např. Counter nebo Mud Shot) a vygenerujete až 30 energie zcela bez poškození!' : 
                   'During these 2.5 seconds, you gain 3–4 free fast attacks (Counter / Mud Shot), generating up to 30 energy without taking a single hit!'}
                </span>
              </div>
            </div>

            {/* Balloon Spawn Timers Card */}
            <div className="balloon-schedule-card">
              <h3>
                <Clock size={18} />
                {lang === 'cs' ? 'Časový rozvrh balónů (6hodinová okna)' : 'Rocket Balloon Schedule (6-Hour Windows)'}
              </h3>
              <p>
                {lang === 'cs' ? 'Horkovzdušný balón přiletí při prvním otevření mapy v těchto 4 denních oknech:' : 
                 'Balloons spawn upon opening the game within these 4 daily timeframes:'}
              </p>

              <div className="balloon-times-grid">
                <div className="balloon-time-slot">
                  <span className="balloon-window-badge">Okno 1</span>
                  <span className="balloon-hour">00:00 – 05:59</span>
                  <span className="balloon-desc">{lang === 'cs' ? 'Noční balón' : 'Night spawn'}</span>
                </div>
                <div className="balloon-time-slot">
                  <span className="balloon-window-badge">Okno 2</span>
                  <span className="balloon-hour">06:00 – 11:59</span>
                  <span className="balloon-desc">{lang === 'cs' ? 'Ranní balón' : 'Morning spawn'}</span>
                </div>
                <div className="balloon-time-slot">
                  <span className="balloon-window-badge">Okno 3</span>
                  <span className="balloon-hour">12:00 – 17:59</span>
                  <span className="balloon-desc">{lang === 'cs' ? 'Odpolední balón' : 'Afternoon spawn'}</span>
                </div>
                <div className="balloon-time-slot">
                  <span className="balloon-window-badge">Okno 4</span>
                  <span className="balloon-hour">18:00 – 23:59</span>
                  <span className="balloon-desc">{lang === 'cs' ? 'Večerní balón' : 'Evening spawn'}</span>
                </div>
              </div>

              <div className="radar-math-pill">
                <Award size={15} />
                <span>
                  {lang === 'cs' ? 'Porážka 6 Gruntů = 1 Rocket Radar. Vypnutím radaru v batohu přinutíte balón spawnout běžného Grunta namísto Lídra.' : 
                   '6 Grunts = 1 Rocket Radar. Unequipping the radar forces balloons to spawn Grunts instead of Leaders.'}
                </span>
              </div>
            </div>
          </div>

          {/* Rocket Search Strings Box */}
          <div className="rocket-strings-box">
            <h3>
              <Copy size={18} />
              {lang === 'cs' ? 'Užitečné vyhledávací filtry pro inventář Pokémonů' : 'Essential In-Game Search Filters'}
            </h3>
            <div className="strings-grid">
              <div className="string-item">
                <div className="string-info">
                  <span className="string-label">{lang === 'cs' ? 'Odstranění Frustration (Takeover Event)' : 'Frustration Removal (Takeover)'}</span>
                  <code className="string-code">shadow&@frustration</code>
                </div>
                <button 
                  type="button" 
                  className={`string-copy-btn ${copiedQuery === 'frust' ? 'copied' : ''}`}
                  onClick={() => handleCopySearch('shadow&@frustration', 'frust')}
                >
                  {copiedQuery === 'frust' ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedQuery === 'frust' ? (lang === 'cs' ? 'Zkopírováno' : 'Copied') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
                </button>
              </div>

              <div className="string-item">
                <div className="string-info">
                  <span className="string-label">{lang === 'cs' ? 'Nejlepší 3★ a 4★ Shadow Pokémoni' : 'Top 3-Star & 4-Star Shadows'}</span>
                  <code className="string-code">shadow&!purified&3*,4*</code>
                </div>
                <button 
                  type="button" 
                  className={`string-copy-btn ${copiedQuery === '34star' ? 'copied' : ''}`}
                  onClick={() => handleCopySearch('shadow&!purified&3*,4*', '34star')}
                >
                  {copiedQuery === '34star' ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedQuery === '34star' ? (lang === 'cs' ? 'Zkopírováno' : 'Copied') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
                </button>
              </div>

              <div className="string-item">
                <div className="string-info">
                  <span className="string-label">{lang === 'cs' ? 'Levné čištění za 1 000 Stardustu' : 'Cheap 1,000 Stardust Purify'}</span>
                  <code className="string-code">shadow&13,16,19,41,129,304</code>
                </div>
                <button 
                  type="button" 
                  className={`string-copy-btn ${copiedQuery === 'cheap' ? 'copied' : ''}`}
                  onClick={() => handleCopySearch('shadow&13,16,19,41,129,304', 'cheap')}
                >
                  {copiedQuery === 'cheap' ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedQuery === 'cheap' ? (lang === 'cs' ? 'Zkopírováno' : 'Copied') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
