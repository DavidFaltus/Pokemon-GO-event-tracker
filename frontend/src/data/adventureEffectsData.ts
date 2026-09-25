export interface AdventureEffectItem {
  id: string;
  name: { cs: string; en: string; ja: string; ru: string };
  form: { cs: string; en: string; ja: string; ru: string };
  category: 'time-space' | 'sun-moon' | 'combat';
  types: string[];
  move: {
    name: { cs: string; en: string; ja: string; ru: string };
    type: string;
    powerRaid?: number;
    powerPvp?: number;
  };
  cost: {
    stardust: string;
    candy: string;
    duration: string;
  };
  maxStack: { cs: string; en: string; ja: string; ru: string };
  effect: { cs: string; en: string; ja: string; ru: string };
  proTip: { cs: string; en: string; ja: string; ru: string };
  pokemonSprite: string;
}

export const ADVENTURE_EFFECT_ITEMS: AdventureEffectItem[] = [
  {
    id: 'dialga-origin',
    name: { cs: 'Dialga', en: 'Dialga', ja: 'ディアルガ', ru: 'Dialga' },
    form: { cs: 'Origin Forme', en: 'Origin Forme', ja: 'オリジンフォルム', ru: 'Origin Forme' },
    category: 'time-space',
    types: ['dragon', 'steel'],
    move: {
      name: { cs: 'Roar of Time (Časový řev)', en: 'Roar of Time', ja: 'ときのほうこう', ru: 'Roar of Time' },
      type: 'dragon',
      powerRaid: 160,
      powerPvp: 150
    },
    cost: {
      stardust: '5 000',
      candy: '5 Candy',
      duration: '6 min'
    },
    maxStack: {
      cs: '24 hodin (1 200 000 Dust + 1 200 Candy)',
      en: '24 Hours (1,200,000 Dust + 1,200 Candy)',
      ja: '24時間（砂120万＋アメ1,200個）',
      ru: '24 часа (1 200 000 пыли + 1 200 конфет)'
    },
    effect: {
      cs: 'Zmrazuje odpočet časovačů u Daily Adventure Incense, běžného Incense, Lucky Egg a Star Piece.',
      en: 'Freezes countdown timers on Daily Adventure Incense, standard Incense, Lucky Egg, and Star Piece.',
      ja: 'おさんぽおこう、通常のおこう、しあわせタマゴ、ほしのかけらのタイマー時間を完全停止。',
      ru: 'Замораживает таймеры Daily Adventure Incense, обычного Incense, Lucky Egg и Star Piece.'
    },
    proTip: {
      cs: 'Zapněte Daily Adventure Incense a prodlužte Roar of Time na 60+ min pro nekonečný lov Galarian ptáků.',
      en: 'Pop Daily Adventure Incense and stack Roar of Time for 60+ min to maximize Galarian Bird encounters.',
      ja: 'おさんぽおこう発動後にときのほうこうを60分延長し、ガラル三鳥との遭遇チャンスを極大化。',
      ru: 'Включите Daily Adventure Incense и продлите Roar of Time на 60+ минут для охоты на Галарских птиц.'
    },
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10245.png'
  },
  {
    id: 'palkia-origin',
    name: { cs: 'Palkia', en: 'Palkia', ja: 'パルキア', ru: 'Palkia' },
    form: { cs: 'Origin Forme', en: 'Origin Forme', ja: 'オリジンフォルム', ru: 'Origin Forme' },
    category: 'time-space',
    types: ['water', 'dragon'],
    move: {
      name: { cs: 'Spacial Rend (Prostorové štěpení)', en: 'Spacial Rend', ja: 'あくうせつだん', ru: 'Spacial Rend' },
      type: 'dragon',
      powerRaid: 160,
      powerPvp: 95
    },
    cost: {
      stardust: '5 000',
      candy: '5 Candy',
      duration: '10 min'
    },
    maxStack: {
      cs: '24 hodin (720 000 Dust + 720 Candy)',
      en: '24 Hours (720,000 Dust + 720 Candy)',
      ja: '24時間（砂72万＋アメ720個）',
      ru: '24 часа (720 000 пыли + 720 конфет)'
    },
    effect: {
      cs: 'Zvětšuje rádius chytání ze 40m na 80m (4× větší plocha na mapě) a viditelnost spawnů na 90m.',
      en: 'Expands catch radius from 40m to 80m (4x surface area) and wild spawn visibility up to 90m.',
      ja: '捕獲サークル半径を40mから80m（面積4倍）へ拡大し、出現視認距離を90mまで拡張。',
      ru: 'Увеличивает радиус ловли с 40 до 80 м (площадь 4x) и видимость спавнов до 90 м.'
    },
    proTip: {
      cs: 'Nepostradatelný pro hraní z domova/hotelu a masivní sběr Pokémonů pomocí auto-catcherů (GO Plus+).',
      en: 'Essential for stationary play from home/hotel and automated cluster clearing with Pokémon GO Plus+.',
      ja: '自宅・ホテルからの定点狩りや、オートキャッチャー（GO Plus+）での自動捕獲効率が飛躍的に向上。',
      ru: 'Незаменим для игры из дома/отеля и массового авто-лова с Pokémon GO Plus+.'
    },
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10246.png'
  },
  {
    id: 'necrozma-dusk-mane',
    name: { cs: 'Dusk Mane Necrozma', en: 'Dusk Mane Necrozma', ja: '日食ネクロズマ', ru: 'Dusk Mane Necrozma' },
    form: { cs: 'Solgaleo Fúze', en: 'Solgaleo Fusion', ja: 'たそがれのたてがみ', ru: 'Слияние с Солгалео' },
    category: 'sun-moon',
    types: ['psychic', 'steel'],
    move: {
      name: { cs: 'Sunsteel Strike (Sluneční úder)', en: 'Sunsteel Strike', ja: 'メテオドライブ', ru: 'Sunsteel Strike' },
      type: 'steel',
      powerRaid: 230,
      powerPvp: 135
    },
    cost: {
      stardust: '3 000',
      candy: '3 Candy',
      duration: '10 min'
    },
    maxStack: {
      cs: '24 hodin (432 000 Dust + 432 Candy)',
      en: '24 Hours (432,000 Dust + 432 Candy)',
      ja: '24時間（砂43.2万＋アメ432個）',
      ru: '24 часа (432 000 пыли + 432 конфеты)'
    },
    effect: {
      cs: 'Přitahuje denní divoké Pokémony (Solární kadidlo) a odemyká denní evoluce kdykoliv i v noci.',
      en: 'Attracts diurnal wild Pokémon (Solar Lure) and enables daytime-restricted evolutions anytime, even at night.',
      ja: '昼に出現する野生ポケモンをおこう形式で誘引し、深夜でも昼限定の進化を可能にします。',
      ru: 'Привлекает дневных диких покемонов и позволяет проводить дневные эволюции в любое время, даже ночью.'
    },
    proTip: {
      cs: 'Umožňuje okamžitou evoluci Midday Lycanroca, Espeona či Tyrantruma v noci za pouhých 3k Stardustu.',
      en: 'Instantly evolve Midday Lycanroc, Espeon, or Tyrantrum late at night for just 3k Stardust.',
      ja: '深夜でもイワンコ（まひる）やエーフィ、チゴラスを進化可能。全エフェクト中最も低燃費。',
      ru: 'Мгновенная ночная эволюция Midday Lycanroc, Espeon и Tyrantrum всего за 3 000 пыли.'
    },
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10155.png'
  },
  {
    id: 'necrozma-dawn-wings',
    name: { cs: 'Dawn Wings Necrozma', en: 'Dawn Wings Necrozma', ja: '月食ネクロズマ', ru: 'Dawn Wings Necrozma' },
    form: { cs: 'Lunala Fúze', en: 'Lunala Fusion', ja: 'あかつきのつばさ', ru: 'Слияние с Луналой' },
    category: 'sun-moon',
    types: ['psychic', 'ghost'],
    move: {
      name: { cs: 'Moongeist Beam (Měsíční paprsek)', en: 'Moongeist Beam', ja: 'シャドーレイ', ru: 'Moongeist Beam' },
      type: 'ghost',
      powerRaid: 230,
      powerPvp: 135
    },
    cost: {
      stardust: '3 000',
      candy: '3 Candy',
      duration: '10 min'
    },
    maxStack: {
      cs: '24 hodin (432 000 Dust + 432 Candy)',
      en: '24 Hours (432,000 Dust + 432 Candy)',
      ja: '24時間（砂43.2万＋アメ432個）',
      ru: '24 часа (432 000 пыли + 432 конфеты)'
    },
    effect: {
      cs: 'Přitahuje noční Pokémony (Lunární kadidlo) a simuluje ÚPLNĚK: umožňuje okamžitý vývoj Ursaring → Ursaluna!',
      en: 'Attracts nocturnal Pokémon (Lunar Lure) and simulates a FULL MOON: allows on-demand Ursaring → Ursaluna evolution!',
      ja: '夜のポケモンを誘引し、ゲーム内を満月扱いに変更。現実の満月を待たずにリングマ→ガチグマへ進化可能！',
      ru: 'Привлекает ночных покемонов и симулирует ПОЛНОЛУНИЕ: позволяет мгновенно эволюционировать Ursaring → Ursaluna!'
    },
    proTip: {
      cs: 'Nemusíte čekat týdny na reálný měsíční úplněk — aktivujte Moongeist Beam a vyviňte Ursalunu ihned.',
      en: 'Never wait weeks for the real calendar full moon again — pop Moongeist Beam and evolve Ursaluna on demand.',
      ja: '現実の満月の日を待つ必要がなくなります。シャドーレイ起動で即座にガチグマを作成可能。',
      ru: 'Больше не нужно ждать календарного полнолуния — включите Moongeist Beam и эволюционируйте Ursaluna сразу.'
    },
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10156.png'
  },
  {
    id: 'black-kyurem',
    name: { cs: 'Black Kyurem', en: 'Black Kyurem', ja: 'ブラックキュレム', ru: 'Black Kyurem' },
    form: { cs: 'Zekrom Fúze', en: 'Zekrom Fusion', ja: 'ゼクロム合体', ru: 'Слияние с Зекромом' },
    category: 'combat',
    types: ['dragon', 'ice'],
    move: {
      name: { cs: 'Freeze Shock (Zmrazující šok)', en: 'Freeze Shock', ja: 'フリーズボルト', ru: 'Freeze Shock' },
      type: 'ice'
    },
    cost: {
      stardust: '5 000',
      candy: '5 Candy',
      duration: '10 min'
    },
    maxStack: {
      cs: '24 hodin (720 000 Dust + 720 Candy)',
      en: '24 Hours (720,000 Dust + 720 Candy)',
      ja: '24時間（砂72万＋アメ720個）',
      ru: '24 часа (720 000 пыли + 720 конфет)'
    },
    effect: {
      cs: 'Sub-Zero Paralýza: Kompletně zmrazí animace divokých Pokémonů — žádné skákání, útoky ani odrážení Pokéballů!',
      en: 'Sub-Zero Paralysis: Completely immobilizes wild encounters — eliminates jumps, attacks, and ball deflections!',
      ja: '捕獲画面の野生ポケモンの威嚇モーションやジャンプを完全停止。ボールを弾かれる心配がゼロに。',
      ru: 'Полная заморозка: блокирует прыжки, атаки и уклонения диких покемонов — мячи больше никогда не отскакивают!'
    },
    proTip: {
      cs: 'Zajišťuje bleskový Fast Catch bez chyb a perfektní chytání agresivních legendárních bossů po Raidech.',
      en: 'Ensures 100% reliable Fast Catching and stress-free encounters with aggressive Legendary Raid bosses.',
      ja: '高速捕獲（ファストキャッチ）の成功率が跳ね上がり、威嚇が激しい伝説ボスの捕獲ストレスを解消。',
      ru: 'Гарантирует 100% точный Fast Catch и спокойную поимку агрессивных легендарных боссов.'
    },
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10022.png'
  },
  {
    id: 'white-kyurem',
    name: { cs: 'White Kyurem', en: 'White Kyurem', ja: 'ホワイトキュレム', ru: 'White Kyurem' },
    form: { cs: 'Reshiram Fúze', en: 'Reshiram Fusion', ja: 'レシラム合体', ru: 'Слияние с Реширамом' },
    category: 'combat',
    types: ['dragon', 'ice'],
    move: {
      name: { cs: 'Ice Burn (Ledový žár)', en: 'Ice Burn', ja: 'コールドフレア', ru: 'Ice Burn' },
      type: 'ice'
    },
    cost: {
      stardust: '5 000',
      candy: '3 Candy',
      duration: '10 min'
    },
    maxStack: {
      cs: '24 hodin (720 000 Dust + 432 Candy)',
      en: '24 Hours (720,000 Dust + 432 Candy)',
      ja: '24時間（砂72万＋アメ432個）',
      ru: '24 часа (720 000 пыли + 432 конфеты)'
    },
    effect: {
      cs: 'Zpomaluje zmenšování zaměřovacího kruhu o 30–50 %: dramaticky rozšiřuje časové okno pro Excellent Throw.',
      en: 'Slows down catch circle contraction rate by 30–50%, significantly widening the Excellent Throw window.',
      ja: '捕獲サークルの縮小スピードを30〜50%減速。エクセレントスローの成功受付時間が大幅に延長。',
      ru: 'Замедляет сужение прицельного круга на 30–50%, существенно облегчая броски Excellent Throw.'
    },
    proTip: {
      cs: 'Klíč k rychlému splnění náročných výzkumných úkolů vyžadujících série Excellent hodů za sebou.',
      en: 'Trivializes difficult Masterwork and Level 50 research tasks requiring consecutive Excellent throws.',
      ja: '「エクセレントスローを連続で投げる」系の難関リサーチタスクを最速でクリア可能。',
      ru: 'Идеально для закрытия сложных квестов 50 уровня, где требуются серии бросков Excellent.'
    },
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10023.png'
  },
  {
    id: 'zacian-crowned',
    name: { cs: 'Zacian', en: 'Zacian', ja: 'ザシアン', ru: 'Zacian' },
    form: { cs: 'Crowned Sword', en: 'Crowned Sword', ja: 'けんのおう', ru: 'Crowned Sword' },
    category: 'combat',
    types: ['fairy', 'steel'],
    move: {
      name: { cs: 'Behemoth Blade (Obří čepel)', en: 'Behemoth Blade', ja: 'きょじゅうざん', ru: 'Behemoth Blade' },
      type: 'steel'
    },
    cost: {
      stardust: '5 000',
      candy: '5 Candy',
      duration: '6 min'
    },
    maxStack: {
      cs: '24 hodin (1 200 000 Dust + 1 200 Candy)',
      en: '24 Hours (1,200,000 Dust + 1,200 Candy)',
      ja: '24時間（砂120万＋アメ1,200個）',
      ru: '24 часа (1 200 000 пыли + 1 200 конфет)'
    },
    effect: {
      cs: '+10 % Attack bonus celému týmu v Raidech a +5 % v Max Battles; umožňuje Zacianovi vstup do Max Battles.',
      en: 'Flat +10% Attack raid team buff, +5% in Max Battles; enables Zacian to participate in Power Spot Max Battles.',
      ja: 'レイドバトルでチーム全員の攻撃力+10%、マックスバトルで+5%増加。非ダイマックスのザシアンをマックスバトルへ出撃可能に。',
      ru: '+10% к атаке в рейдах и +5% в Max Battles; позволяет Zacian участвовать в битвах на Power Spots.'
    },
    proTip: {
      cs: 'Form change je po prvním odemknutí za 1 000 Energy navždy zdarma — šetřete si buff na těžké 5★ bosse.',
      en: 'Crowned form change is free forever after the initial unlock — activate before tight 5-Star raid short-mans.',
      ja: '初回1,000エナジーで解放後は無料でフォルムチェンジ可能。少人数レイド攻略の切り札。',
      ru: 'Смена формы бесплатна после первой разблокировки — используйте для прохождения рейдов малым составом.'
    },
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10188.png'
  },
  {
    id: 'zamazenta-crowned',
    name: { cs: 'Zamazenta', en: 'Zamazenta', ja: 'ザマゼンタ', ru: 'Zamazenta' },
    form: { cs: 'Crowned Shield', en: 'Crowned Shield', ja: 'たてのほうこう', ru: 'Crowned Shield' },
    category: 'combat',
    types: ['fighting', 'steel'],
    move: {
      name: { cs: 'Behemoth Bash (Obří štít)', en: 'Behemoth Bash', ja: 'きょじゅうだん', ru: 'Behemoth Bash' },
      type: 'steel'
    },
    cost: {
      stardust: '5 000',
      candy: '5 Candy',
      duration: '6 min'
    },
    maxStack: {
      cs: '24 hodin (1 200 000 Dust + 1 200 Candy)',
      en: '24 Hours (1,200,000 Dust + 1,200 Candy)',
      ja: '24時間（砂120万＋アメ1,200個）',
      ru: '24 часа (1 200 000 пыли + 1 200 конфет)'
    },
    effect: {
      cs: '+10 % Defense celému týmu v Raidech a +5 % v Max Battles; odemyká Max Guard štít proti plošnému poškození.',
      en: 'Flat +10% Defense raid team buff, +5% in Max Battles; unlocks Max Guard shield against heavy incoming wipeouts.',
      ja: 'レイドでチーム全員の防御力+10%、マックスバトルで+5%増加。全体攻撃を耐え抜くマックスガードを展開。',
      ru: '+10% к защите в рейдах и +5% в Max Battles; разблокирует щит Max Guard против сокрушительных атак боссов.'
    },
    proTip: {
      cs: 'Chrání skleněné útočníky před one-hit KO a šetří spotřebu Revive a Potionů při těžkých nájezdech.',
      en: 'Shields glass-cannon counters from instant one-hit KOs and conserves Revives during grueling raid marathons.',
      ja: '高火力・低耐久のアタッカーの即死を防ぎ、レイド連戦時の回復アイテム消費を大幅に削減。',
      ru: 'Спасает хрупких топовых дамагеров от мгновенной гибели и экономит Revive и Potion.'
    },
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10189.png'
  },
  {
    id: 'eternatus',
    name: { cs: 'Eternatus', en: 'Eternatus', ja: 'ムゲンダイナ', ru: 'Eternatus' },
    form: { cs: 'Gigantická dračí forma', en: 'Standard Form', ja: 'スタンダード', ru: 'Стандартная форма' },
    category: 'combat',
    types: ['poison', 'dragon'],
    move: {
      name: { cs: 'Dynamax Cannon (Dynamaxové dělo)', en: 'Dynamax Cannon', ja: 'ダイマックスほう', ru: 'Dynamax Cannon' },
      type: 'dragon'
    },
    cost: {
      stardust: '5 000',
      candy: '30 Candy',
      duration: '10 min'
    },
    maxStack: {
      cs: '24 hodin (720 000 Dust + 4 320 Candy)',
      en: '24 Hours (720,000 Dust + 4,320 Candy)',
      ja: '24時間（砂72万＋アメ4,320個）',
      ru: '24 часа (720 000 пыли + 4 320 конфет)'
    },
    effect: {
      cs: 'Max Move Overdrive: Zvyšuje úroveň všech Max Moves v Max Battles o +1 (odemyká zamčené na L1, L3 posouvá na L4).',
      en: 'Max Move Overdrive: Boosts all party Max Moves by +1 Level (unlocks locked to L1, pushes L3 to transcendent L4).',
      ja: 'マックス技オーバードライブ：参加ポケモンの全マックス技を+1強化。未解放技をL1に、L3技を最強L4へ引き上げ。',
      ru: 'Overdrive Max-атак: Повышает уровень всех Max Moves на +1 (открывает закрытые на L1, а L3 повышает до L4).'
    },
    proTip: {
      cs: 'Klíč k porážce extrémně obtížných 6★ Gigantamax bossů i s méně vytrénovaným Dynamax týmem.',
      en: 'The ultimate trump card for defeating brutal 6-Star Gigantamax bosses even with budget Dynamax squads.',
      ja: 'マックス技を育成しきれていないプレイヤーでも、星6キョダイマックスレイドを突破可能にする切り札。',
      ru: 'Главный козырь для победы над сложнейшими 6-звездочными Gigantamax боссами даже бюджетной командой.'
    },
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/890.png'
  },
  {
    id: 'mewtwo-mega-x',
    name: { cs: 'Mega Mewtwo X', en: 'Mega Mewtwo X', ja: 'メガミュウツーX', ru: 'Mega Mewtwo X' },
    form: { cs: 'Fyzická Mega Forma', en: 'Physical Mega Form', ja: '格闘特化フォルム', ru: 'Физическая Мега Форма' },
    category: 'combat',
    types: ['psychic', 'fighting'],
    move: {
      name: { cs: 'Dynamic Punch+ (Dynamický úder+)', en: 'Dynamic Punch+', ja: 'ばくれつパンチ＋', ru: 'Dynamic Punch+' },
      type: 'fighting'
    },
    cost: {
      stardust: 'Mega Energy',
      candy: '5 Candy',
      duration: '10 min'
    },
    maxStack: {
      cs: '24 hodin',
      en: '24 Hours',
      ja: '24時間',
      ru: '24 часа'
    },
    effect: {
      cs: 'Zvýšený útok proti Mega bossům v Mega Raidech; prolomí 2 obranné štíty naráz v Super Mega Raidech.',
      en: '+Damage vs Mega Pokémon in Mega Raids; breaks 2 shields simultaneously in Super Mega Raids.',
      ja: 'メガレイドのボスに対する与ダメージ増加。スーパーメガレイドでシールドを一度に2枚破壊可能。',
      ru: '+Урон по Мега-покемонам в Мега-Рейдах; ломает сразу 2 щита в Супер Мега Рейдах.'
    },
    proTip: {
      cs: 'Dramaticky zkracuje čas raidů a maximalizuje zisk Mega Energy za rychlé poražení bosse.',
      en: 'Dramatically accelerates raid clear times to secure maximum Mega Energy reward tiers.',
      ja: 'レイド討伐時間を大幅短縮し、最速撃破による最大メガエナジー報酬を確定させます。',
      ru: 'Ускоряет прохождение рейдов, обеспечивая максимальное количество Мега-энергии в награду.'
    },
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10043.png'
  },
  {
    id: 'mewtwo-mega-y',
    name: { cs: 'Mega Mewtwo Y', en: 'Mega Mewtwo Y', ja: 'メガミュウツーY', ru: 'Mega Mewtwo Y' },
    form: { cs: 'Speciální Mega Forma', en: 'Special Mega Form', ja: '特殊特化フォルム', ru: 'Специальная Мега Форма' },
    category: 'combat',
    types: ['psychic'],
    move: {
      name: { cs: 'Future Sight+ (Věštecký zrak+)', en: 'Future Sight+', ja: 'みらいよち＋', ru: 'Future Sight+' },
      type: 'psychic'
    },
    cost: {
      stardust: 'Mega Energy',
      candy: '5 Candy',
      duration: '10 min'
    },
    maxStack: {
      cs: '24 hodin',
      en: '24 Hours',
      ja: '24時間',
      ru: '24 часа'
    },
    effect: {
      cs: 'Telepatický Appraise: 3★ (82 %+ IV) a 4★ Hundo (100 % IV) Pokémoni v divočině vizuálně září zlatou kosmickou aurou ještě před hodem!',
      en: 'Telepathic Appraisal: 3-Star (82%+ IV) and 100% IV Hundos radiate a visible golden cosmic aura upon encounter before throwing!',
      ja: '透視個体値鑑定：野生の星3（個体値82%以上）および個体値100%のポケモンが、遭遇画面で黄金の光を放ちます！',
      ru: 'Телепатический Appraise: Покемоны 3★ (82%+) и 100% IV (Hundo) светятся золотой космической аурой еще до броска мяча!'
    },
    proTip: {
      cs: 'Umožňuje okamžitě rozpoznat 100% IV Hundo nebo silné PvP kandidáty bez zdlouhavého chytání celého shluku.',
      en: 'Visually snipes 100% IV Hundos and top-tier candidates instantly without catching every clutter spawn.',
      ja: '大量出現したポケモンの中から、捕獲前に100%個体値や高個体値を一瞬で見分けて狙い撃ち可能。',
      ru: 'Позволяет моментально находить 100% IV Hundo без необходимости ловить весь мусор вокруг.'
    },
    pokemonSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10044.png'
  }
];
