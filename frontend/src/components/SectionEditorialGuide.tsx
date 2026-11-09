import React from 'react';
import type { Language } from '@/data/translations';

export type EditorialSectionId = 'raids' | 'rocket' | 'pokedex' | 'rankings' | 'filter' | 'friends';

interface EditorialBlockContent {
  badge: string;
  heading: string;
  lead: string;
  columns: {
    title: string;
    body: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

const SECTION_EDITORIAL_CONTENT: Record<EditorialSectionId, Record<Language, EditorialBlockContent>> = {
  raids: {
    cs: {
      badge: 'Metodika & Strategie Raidů',
      heading: 'Kompletní průvodce Raid bitvami, 100% IV CP a výběrem counterů',
      lead:
        'Raidy (1★, 3★, 5★ Legendární, Mega a Shadow Raidy) jsou hlavním zdrojem nejsilnějších PvE a Master League Pokémonů v Pokémon GO. Abychom vám ušetřili Raid Passy, každou rotaci automaticky přepočítáváme podle reálného DPS (poškození za sekundu) a TDO (celkového výstupu poškození).',
      columns: [
        {
          title: 'Jak fungují 100% IV (Hundo) CP tabulky',
          body:
            'Každý Raid Boss chycený po vítězství má garantovaný IV floor 10/10/10 (u Shadow Raidů 6/6/6) a nachází se přesně na Levelu 20 (bez počasí) nebo na Levelu 25 (s aktivním Weather Boostem). Pokud CP vašeho Raid Bosse na obrazovce chytání odpovídá horní hranici v naší tabulce, máte před sebou 100% IV (4*) Hundo Pokémona.',
        },
        {
          title: 'Pravidlo dvojité slabosti a Mega aur',
          body:
            'V Pokémon GO násobí jednoduchá typová výhoda poškození 1,6× a dvojitá typová výhoda (např. Led proti Rayquazovi nebo Země proti Heatranovi) 2,56×. Vždy mějte v týmu aktivní Mega nebo Primal evoluci stejného typu – ta zvyšuje útok všem ostatním hráčům v lobby o 30 % (a o 10 % i u ostatních typů) a zároveň vám přidá +1 až +2 bonusové Candy a vyšší šanci na Candy XL za chycení.',
        },
        {
          title: 'Party Power a Shadow Raidy',
          body:
            'Pokud hrajete ve skupině 2–4 přátel přes funkci Party Play, tlačítko Party Power zdvojnásobuje poškození vašeho dalšího Charged útoku. V Shadow Raidech (3★ a 5★) se boss v polovině životů rozzuří (Enraged) – k jeho uklidnění použijte Purified Gems, jinak se jeho obrana zvýší o 200 % a útok o 80 %.',
        },
      ],
      faqs: [
        {
          question: 'Kdy probíhá v Pokémon GO Raid Hour?',
          answer:
            'Pravidelná Raid Hour probíhá každou středu od 18:00 do 19:00 místního času. Během této hodiny se téměř na všech volných gymech vylíhne aktuální 5★ Legendární Raid Boss.',
        },
        {
          question: 'Kolik hráčů je potřeba na poražení 5★ Legendárního Raidu?',
          answer:
            'S optimálními countery na Levelu 40+ a funkcí Party Power lze většinu 5★ bossů porazit ve 2 až 3 hráčích (bossy s dvojitou slabostí 2,56× dokonce i v 1–2 hráčích). S náhodnými hráči doporučujeme skupinu 4 až 6 trenérů.',
        },
        {
          question: 'Jak poznám 100% IV (Hundo) Raid Bosse?',
          answer:
            'Sledujte CP Pokémona ve chvíli, kdy přejdete na obrazovku chytání s Premier Bally. Každá karta Raid Bosse na našem webu zobrazuje přesné maximální CP pro Level 20 (běžné počasí) a Level 25 (Weather Boost), které odpovídá IV 15/15/15.',
        },
      ],
    },
    en: {
      badge: 'Raid Methodology & Strategy',
      heading: 'Complete Guide to Pokémon GO Raid Battles, 100% IV CP & Counter Selection',
      lead:
        'Raid Battles (Tier 1, Tier 3, 5-Star Legendary, Mega, and Shadow Raids) are the primary source of top-tier PvE attackers and Master League Legendaries in Pokémon GO. Our database calculates optimal counters using Level 50 Damage Per Second (DPS) and Total Damage Output (TDO).',
      columns: [
        {
          title: 'Understanding 100% IV (Hundo) CP Charts',
          body:
            'Every Raid Boss encountered after victory has a guaranteed 10/10/10 IV floor (6/6/6 in Shadow Raids) and is caught at exactly Level 20 (unboosted) or Level 25 (Weather Boosted). When the encounter CP matches the maximum value shown on our boss cards, it is a guaranteed 15/15/15 (4*) Hundo.',
        },
        {
          title: 'Double Weaknesses & Mega Evolution Boosts',
          body:
            'Single super-effective damage multiplies output by 1.6x in Pokémon GO, while a double weakness (such as Ice against Dragon/Flying or Ground against Fire/Steel) multiplies damage by 2.56x. Always run a matching Mega or Primal Pokémon to grant all allies in the lobby a 30% damage boost while earning extra catch Candy and Candy XL.',
        },
        {
          title: 'Party Power & Shadow Raid Enrage Mechanics',
          body:
            'Teaming up in Party Play (2–4 trainers) unlocks the Party Power button, doubling the damage of your next Charged Move. In 3-Star and 5-Star Shadow Raids, bosses become Enraged at ~60% HP—use 8 Purified Gems across your group to subdue the boss and remove its massive defense boost.',
        },
      ],
      faqs: [
        {
          question: 'When is Legendary Raid Hour in Pokémon GO?',
          answer:
            'Legendary Raid Hour takes place every Wednesday from 6:00 PM to 7:00 PM local time, spawning the current 5-Star Raid Boss on nearly every available Gym.',
        },
        {
          question: 'How many trainers are needed to beat a 5-Star Raid?',
          answer:
            'With Level 40+ top counters, Best Friend bonus, and Party Power, most 5-Star Raid Bosses can be defeated by 2 to 3 trainers (and bosses with a 2.56x double weakness can often be duoed or soloed). For casual lobbies, 4 to 6 trainers is a safe benchmark.',
        },
        {
          question: 'How do I check if a Raid Boss has 100% IVs before catching it?',
          answer:
            'Compare the CP displayed at the start of the Premier Ball catch screen with the Level 20 (normal) and Level 25 (Weather Boosted) maximum CP values listed on each boss card above.',
        },
      ],
    },
    ja: {
      badge: 'レイド攻略＆個体値ガイド',
      heading: 'Pokémon GO レイドバトル完全ガイド：100%個体値CP早見表と対策パーティ編成',
      lead:
        'レイドバトル（星1・星3・伝説5つ星・メガ・シャドウレイド）は、最強クラスのPvEアタッカーやマスターリーグ用伝説ポケモンを入手する最重要コンテンツです。当サイトではDPS（秒間ダメージ）とTDO（総ダメージ量）に基づき最適対策ポケモンを算出しています。',
      columns: [
        {
          title: '個体値100%（Hundo）CPの見分け方',
          body:
            'レイド勝利後のゲットチャレンジでは個体値が最低10/10/10（シャドウレイドは6/6/6）保証され、ポケモンレベルは通常時PL20、天候ブースト時PL25で固定されています。各ボスのカードに記載された最大CPと一致すれば個体値100%（15/15/15）確定です。',
        },
        {
          title: '2重弱点（2.56倍）とメガブーストの活用',
          body:
            'Pokémon GOでは単一弱点で1.6倍、複合タイプの2重弱点では2.56倍のダメージを与えられます。さらにメガシンカ・ゲンシカイキポケモンを編成すると味方全体の同タイプ技威力が1.3倍になり、捕獲時のアメ・アメXL獲得数も増加します。',
        },
        {
          title: 'チームパワーとシャドウレイドの暴走解除',
          body:
            '2〜4人のチームプレイで発動できる「チームパワー」は次のスペシャルアタックの威力を2倍にします。星3・星5シャドウレイドではボスのHPが減ると「暴走」状態になるため、ライトクリスタルを合計8個使って鎮静化させましょう。',
        },
      ],
      faqs: [
        {
          question: 'レイドアワーは毎週いつ開催されますか？',
          answer:
            '毎週水曜日の18:00〜19:00（現地時間）に開催され、現在登場中の伝説レイドボスがほぼすべてのジムに出現します。',
        },
        {
          question: '星5（伝説）レイドは何人いれば勝てますか？',
          answer:
            '適切な弱点対策ポケモン（PL40以上）とチームパワーを活用すれば2〜3人で討伐可能です（2重弱点ボスなら1〜2人でも可能）。一般的なロビーでは4〜6人いれば安定してクリアできます。',
        },
        {
          question: '色違いの伝説レイドボスの捕獲率は？',
          answer:
            '伝説レイド等で出現した色違いポケモンは、ボールが当たれば1発で確定捕獲となります。必ずパイルのみ（またはぎんのパイルのみ）を使ってアメを増やしましょう。',
        },
      ],
    },
    ru: {
      badge: 'Методология и стратегия рейдов',
      heading: 'Полный гайд по Рейдам Pokémon GO, таблицам 100% IV CP и выбору контр-покемонов',
      lead:
        'Рейдовые битвы (1★, 3★, 5★ Легендарные, Мега и Теневые рейды) — главный источник сильнейших PvE-атакующих и легендарных покемонов для Мастер Лиги. Наша база рассчитывает контр-покемонов на основе реального DPS и общей живучести (TDO).',
      columns: [
        {
          title: 'Как определить 100% IV (Hundo) по CP',
          body:
            'Каждый рейд-босс после победы имеет гарантированный минимум IV 10/10/10 (в теневых рейдах 6/6/6) и ловится строго на 20-м уровне (без погоды) или 25-м уровне (с погодным бустом). Если CP при поимке совпадает с максимумом в карточке босса — перед вами 100% IV (15/15/15).',
        },
        {
          title: 'Двойная уязвимость и бонус Мега-эволюций',
          body:
            'Обычная уязвимость увеличивает урон в 1.6 раза, а двойная (2.56×) позволяет побеждать боссов минимальной группой. Активная Мега- или Праймал-эволюция усиливает атаки союзников того же типа на 30% и дает бонусные конфеты при поимке.',
        },
        {
          title: 'Party Power и Теневые рейды',
          body:
            'Игра в группе (Party Play) из 2–4 тренеров открывает кнопку Party Power, удваивающую урон следующей заряженной атаки. В теневых рейдах 3★ и 5★ используйте Очищенные самоцветы (Purified Gems), чтобы снять ярость босса.',
        },
      ],
      faqs: [
        {
          question: 'Когда проходит Час Рейдов (Raid Hour) в Pokémon GO?',
          answer:
            'Легендарный Час Рейдов проходит каждую среду с 18:00 до 19:00 по местному времени на большинстве доступных гимов.',
        },
        {
          question: 'Сколько игроков нужно для победы в 5★ рейде?',
          answer:
            'С оптимальными контр-покемонами 40+ уровня и функцией Party Power большинство 5★ боссов побеждаются вдвоем или втроем. Для обычной группы рекомендуется 4–6 игроков.',
        },
        {
          question: 'Каков шанс поймать шайни легендарного рейд-босса?',
          answer:
            'Шанс встретить шайни в 5★ рейде составляет примерно 1 к 20, при этом шайни-легенда ловится со 100% вероятностью с первого точного попадания мячом (используйте Pinap Berry!).',
        },
      ],
    },
  },
  rocket: {
    cs: {
      badge: 'Mechaniky Team GO Rocket',
      heading: 'Taktický manuál proti Team GO Rocket: Štíty, Stun-Lock a Shadow bonus (+20 % ATK)',
      lead:
        'Souboje s Team GO Rocket fungují podle pravidel PvP (Trainer Battles), ale s unikátními vlastnostmi umělé inteligence. Zvládnutí načasování výměn a nabíjení energie vám umožní porazit i ty nejtěžší sestavy Cliffa, Sierry, Arla a Giovanniho bez ztráty jediného Pokémona.',
      columns: [
        {
          title: 'Dvousekundový Stun-Lock (zamrznutí AI)',
          body:
            'Po každém Charged útoku (vašem i soupeřově) a po každém vystřídání Pokémona přestane člen Team GO Rocket útočit přesně na 2 sekundy (4 PvP turnů). Nikdy proto nedávejte svého hlavního leadera na 1. slot – dejte ho na 2. místo a ihned po startu zápasu na něj přepněte.',
        },
        {
          title: 'Shadow Pokémoni vs. Očištění (Purification)',
          body:
            'Shadow Pokémoni získávají v Pokémon GO permanentní +20% bonus k útoku výměnou za -16,7 % obrany. V časově omezených raidech to znamená, že i 0% IV Shadow Pokémon způsobí více poškození za sekundu (DPS) než 100% IV (Hundo) normální nebo očištěný Pokémon.',
        },
        {
          title: 'Jak odstranit útok Frustration a získat 12km vejce',
          body:
            'Každý chycený Shadow Pokémon má zpočátku uzamčený Charged útok Frustration. Odnaučit ho lze obyčejným Charged TM pouze během eventů Team GO Rocket Takeover. Za poražení lídra (Arlo, Cliff, Sierra) s volným místem na vejce získáte vzácné 12km Strange Egg.',
        },
      ],
      faqs: [
        {
          question: 'Kdy se mění sestavy Giovanniho a lídrů Team GO Rocket?',
          answer:
            'Sestavy Giovanniho, Arla, Cliffa, Sierry i řadových Gruntů se mění vždy na začátku události Team GO Rocket Takeover (přibližně jednou za 3 měsíce v rámci každé sezóny).',
        },
        {
          question: 'Jak získat Rocket Radar a Super Rocket Radar?',
          answer:
            'Běžný Rocket Radar se automaticky složí po poražení 6 řadových Gruntů (6× Mysterious Component) a slouží k nalezení Arla, Cliffa nebo Sierry. Černý Super Rocket Radar na Giovanniho získáte ze sezónního Special Research úkolu.',
        },
        {
          question: 'Proč lídři vždy vykryjí mé první dva útoky?',
          answer:
            'Lídři (Cliff, Sierra, Arlo) a Boss Giovanni mají naprogramováno použít štít na první dva Charged útoky hráče bez ohledu na jejich sílu. Proto vždy začínejte Pokémonem s nejlevnějším Charged útokem (např. Lucario s Power-Up Punch).',
        },
      ],
    },
    en: {
      badge: 'Team GO Rocket Mechanics',
      heading: 'Tactical Manual for Team GO Rocket: AI Stun-Lock, Shield Baiting & Shadow Bonus',
      lead:
        'Team GO Rocket battles use Trainer Battle (PvP) combat mechanics combined with predictable AI behaviors. Mastering switch timing and energy management lets you defeat Cliff, Sierra, Arlo, and Boss Giovanni reliably.',
      columns: [
        {
          title: 'The 2-Second AI Stun-Lock Window',
          body:
            'After every Charged Move or Pokémon switch by either side, the Rocket AI pauses all Fast Move attacks for 2 full seconds (4 turns). Always start battle by immediately switching into your lead counter in Slot 2 to gain 4 free turns of energy.',
        },
        {
          title: 'Shadow Bonus (+20% Attack) vs. Purification',
          body:
            'Shadow Pokémon deal 20% more damage in exchange for taking 20% more damage. In Raid Battles against the clock, a 0/0/0 IV Shadow attacker outperforms a 15/15/15 (100% IV) non-Shadow or Purified version of the same species.',
        },
        {
          title: 'Removing Frustration & Farming 12km Strange Eggs',
          body:
            'Newly caught Shadow Pokémon know the Charged Move Frustration, which can only be removed using a regular Charged TM during seasonal Team GO Rocket Takeover events. Defeating Arlo, Cliff, or Sierra with an open Egg slot rewards a 12km Strange Egg.',
        },
      ],
      faqs: [
        {
          question: 'How often do Team GO Rocket lineups change?',
          answer:
            'Giovanni, Leaders Arlo, Cliff, and Sierra, and Rocket Grunts rotate their lineups and Shadow rewards once per season during Team GO Rocket Takeover events.',
        },
        {
          question: 'What is the difference between a Rocket Radar and a Super Rocket Radar?',
          answer:
            'A standard Rocket Radar (built from 6 Mysterious Components dropped by Grunts) locates Leaders Cliff, Sierra, and Arlo. A black Super Rocket Radar (earned via Special Research) locates Boss Giovanni.',
        },
        {
          question: 'Can Rocket Grunts and Leaders drop Shiny Shadow Pokémon?',
          answer:
            'Leaders Cliff, Sierra, and Arlo have a ~1/64 Shiny Shadow rate on their Slot 1 reward, and eligible Rocket Grunts whose first Pokémon has had its Shiny Shadow unlocked can also be Shiny (~1/256 rate).',
        },
      ],
    },
    ja: {
      badge: 'GOロケット団 バトル仕様解説',
      heading: 'GOロケット団 完全攻略マニュアル：硬直時間（スタンロック）とシャドウボーナス',
      lead:
        'GOロケット団とのバトルはトレーナーバトル（PvP）形式で行われますが、AI特有の硬直仕様が存在します。交代タイミングとシールド剥がしを理解すれば、リーダーやサカキにも確実に勝利できます。',
      columns: [
        {
          title: '2秒間の硬直（スタンロック）仕様',
          body:
            'お互いのゲージ技使用後やポケモン交代後、ロケット団は約2秒間（4ターン）攻撃を停止します。主力ポケモンを2番目に配置し、開始直後に即交代することで安全にエネルギーを溜められます。',
        },
        {
          title: 'シャドウボーナス（攻撃1.2倍）とリトレーン',
          body:
            'シャドウポケモンは攻撃力が1.2倍になる代わりに防御力が低下します。制限時間のあるレイドバトルでは、個体値0%のシャドウポケモンでも個体値100%の通常・リトレーン個体を上回るDPSを発揮します。',
        },
        {
          title: '「やつあたり」消去と12kmタマゴ',
          body:
            '捕獲直後のシャドウポケモンが覚えている「やつあたり」は、GOロケット団占拠イベント期間中にわざマシンスペシャルで消去可能です。またタマゴ枠を空けてリーダーに勝つと12kmタマゴを入手できます。',
        },
      ],
      faqs: [
        {
          question: 'GOロケット団の手持ち編成はいつ変わりますか？',
          answer:
            '各シーズンに1回開催される「GOロケット団占拠イベント」の開始と同時に、サカキ・リーダー・したっぱの手持ちと報酬ポケモンが一斉に更新されます。',
        },
        {
          question: 'ロケットレーダーとスーパーロケットレーダーの違いは？',
          answer:
            '通常のロケットレーダー（ふしぎなパーツ6個で合成）はクリフ・シエラ・アルロを探知し、黒いスーパーロケットレーダーはボスのサカキを探知します。',
        },
        {
          question: 'したっぱからも色違いシャドウポケモンは出ますか？',
          answer:
            '過去にリーダー報酬等で色違いシャドウが実装済みのポケモンであれば、したっぱ戦後のゲットチャレンジでも色違いが出現します。',
        },
      ],
    },
    ru: {
      badge: 'Механики Team GO Rocket',
      heading: 'Тактическое руководство по Team GO Rocket: Стан-лок, щиты и теневой бонус (+20%)',
      lead:
        'Бои с Командой GO Rocket проходят по правилам PvP, но с предсказуемым поведением ИИ. Грамотное использование смен покемонов и быстрых заряженных атак позволяет легко побеждать Клиффа, Сиерру, Арло и Джованни.',
      columns: [
        {
          title: '2-секундная пауза ИИ (стан-лок)',
          body:
            'После каждой заряженной атаки или смены покемона любой из сторон ИИ Команды R полностью прекращает атаковать на 2 секунды (4 хода). Всегда ставьте главного бойца во 2-й слот и переключайтесь на него сразу после старта.',
        },
        {
          title: 'Теневой бонус (+20% к атаке) против Очищения',
          body:
            'Теневые покемоны наносят на 20% больше урона. В рейдах на время даже теневой покемон с 0% IV наносит больше урона в секунду (DPS), чем обычный или очищенный покемон со 100% IV.',
        },
        {
          title: 'Удаление Frustration и 12 км яйца',
          body:
            'Заряженную атаку Frustration можно заменить обычной Charged TM только во время событий Team GO Rocket Takeover. Победа над лидером при свободном слоте для яиц дает редкое 12 км яйцо.',
        },
      ],
      faqs: [
        {
          question: 'Как часто меняются составы лидеров и Джованни?',
          answer:
            'Составы Джованни, Арло, Клиффа, Сиерры и пехотинцев обновляются раз в сезон (примерно каждые 3 месяца) во время события Team GO Rocket Takeover.',
        },
        {
          question: 'В чем разница между обычным Радаром и Супер Радаром?',
          answer:
            'Обычный Радар (из 6 таинственных компонентов от пехотинцев) ищет лидеров Арло, Клиффа и Сиерру, а черный Супер Радар из спец-исследований находит босса Джованни.',
        },
        {
          question: 'Могут ли теневые покемоны быть шайни?',
          answer:
            'Да, у лидеров шанс шайни теневого покемона составляет около 1 к 64, а у пехотинцев (для уже выпущенных шайни-видов) — около 1 к 256.',
        },
      ],
    },
  },
  pokedex: {
    cs: {
      badge: 'Encyklopedie & Herní Statistiky',
      heading: 'Jak číst statistiky v Pokémon GO Pokédexu: Base Stats, CP vzorec a speciální formy',
      lead:
        'Náš kompletní Pokédex (Gen 1 až Gen 9, čísla #0001 až #1025) převádí původní statistiky z hlavních her do reálných Pokémon GO hodnot (Attack, Defense, Stamina) a ukazuje přesné maximální CP na klíčových úrovních.',
      columns: [
        {
          title: 'Výpočet CP a význam Levelů 15, 20, 25, 40 a 50',
          body:
            'Vzorce pro Combat Power (CP) v Pokémon GO dávají nejvyšší váhu statistice Útoku (Attack), zatímco Obrana a Výdrž jsou ve vzorci pod odmocninou. Level 15 odpovídá odměnám z Field Research, Level 20 a 25 Raid Bossům, Level 40 maximu za běžné Candy a Level 50 maximu s Candy XL.',
        },
        {
          title: 'Mega, Primal, Dynamax a Gigantamax varianty',
          body:
            'Dočasné Mega a Primal evoluce přepisují základní statistiky Pokémona a v raidech posilují celý tým. Dynamax a Gigantamax formy jsou klíčové pro Max Battles v Power Spotech, kde Gigantamax verze disponují unikátními G-Max útoky s vyšší základní silou.',
        },
        {
          title: 'Dostupnost ve hře a Shiny kontrola',
          body:
            'Ne všichni Pokémoni z 8. a 9. generace byli do Pokémon GO již vydáni. V našem Pokédexu můžete jedním kliknutím přepnout celý katalog do Shiny režimu, filtrovat podle generací či regionálních forem (Alola, Galar, Hisui, Paldea) a otevřít detailní rozbor každého druhu.',
        },
      ],
      faqs: [
        {
          question: 'Co znamená Level 40 a Level 50 CP v Pokédexu?',
          answer:
            'Level 40 je maximální úroveň Pokémona dosažitelná pomocí běžných Candy. Od trenérského levelu 31 můžete získávat Candy XL, se kterými lze Pokémona vylepšit až na Level 50 (celkem 296 Candy XL u běžného Pokémona, 360 u Shadow).',
        },
        {
          question: 'Jaký je rozdíl mezi Dynamax a Gigantamax Pokémonem?',
          answer:
            'U Dynamax Pokémona se typ jeho Max útoku odvíjí od typu jeho aktuálního Fast útoku (základní síla 250–350). Gigantamax Pokémon má pevně daný unikátní G-Max útok s o 100 bodů vyšší základní silou (350–450).',
        },
        {
          question: 'Jak zjistím, kteří Pokémoni jsou nejlepší do PvE a PvP?',
          answer:
            'Kliknutím na libovolného Pokémona v katalogu otevřete jeho samostatnou profilovou stránku s kompletním hodnocením pro Raidy (DPS/ER), GO Battle League (Great, Ultra, Master League), evolučním řetězcem a seznamem všech Fast a Charged útoků.',
        },
      ],
    },
    en: {
      badge: 'Encyclopedia & Game Mechanics',
      heading: 'How to Read Pokémon GO Pokédex Stats: Base Stats, CP Formula & Special Forms',
      lead:
        'Our complete Pokémon GO Pokédex (Generations 1–9, #0001 to #1025) translates main-series stats into official Pokémon GO base Attack, Defense, and Stamina values while calculating exact 100% IV Max CP across key levels.',
      columns: [
        {
          title: 'CP Formula & Key Level Benchmarks (Lv15–Lv50)',
          body:
            'The Pokémon GO Combat Power (CP) formula weights Attack linearly while taking the square root of Defense and Stamina. Level 15 represents Research encounters, Levels 20/25 represent Raid catches, Level 40 is the regular Candy cap, and Level 50 is the Candy XL cap.',
        },
        {
          title: 'Mega, Primal, Dynamax & Gigantamax Forms',
          body:
            'Mega and Primal Evolutions temporarily overhaul base stats and boost allied Raid damage by up to 30%. Dynamax and Gigantamax forms battle at Power Spots, with Gigantamax species wielding fixed G-Max Moves that deal 100 more base damage than standard Max Moves.',
        },
        {
          title: 'Release Status & 1-Click Shiny Preview',
          body:
            'Use the interactive filter bar to isolate Mega, Shadow, Dynamax, Gigantamax, or Regional variants (Alola, Galar, Hisui, Paldea), toggle Shiny artwork across the entire grid, and open full strategic profiles for any species.',
        },
      ],
      faqs: [
        {
          question: 'What is the difference between Level 40 and Level 50 Max CP?',
          answer:
            'Level 40 is the maximum level reachable using standard Candy. Powering a Pokémon from Level 40 to Level 50 requires 296 Candy XL (360 for Shadow Pokémon) and increases its stats by roughly 6–8%.',
        },
        {
          question: 'How do Gigantamax Pokémon differ from Dynamax Pokémon in Pokémon GO?',
          answer:
            'Dynamax Pokémon have Max Moves whose elemental type matches their equipped Fast Move (250–350 power), whereas Gigantamax Pokémon have a signature G-Max Move with 350–450 base power.',
        },
        {
          question: 'Where can I see a Pokémon’s best moveset and counters?',
          answer:
            'Click any Pokémon card in the Pokédex to open its dedicated detail page featuring full Fast/Charged moveset tables, evolution chains, type weaknesses, and PvE/PvP editorial analysis.',
        },
      ],
    },
    ja: {
      badge: '図鑑データ＆ステータス解説',
      heading: 'Pokémon GO 図鑑の見方：種族値（攻撃・防御・HP）、CP計算式と特殊フォルム',
      lead:
        '当サイトの完全図鑑（第1〜第9世代・No.0001〜1025）では、Pokémon GO固有の種族値（攻撃・防御・HP）と各重要レベルにおける個体値100%の最大CPを網羅しています。',
      columns: [
        {
          title: 'CPの仕組みとPL15・20・25・40・50の基準',
          body:
            'Pokémon GOのCP計算式では「攻撃」種族値が最も大きく影響します。PL15はフィールドリサーチ報酬、PL20/25はレイド捕獲時、PL40は通常のアメの上限、PL50はアメXL強化の最大上限を示します。',
        },
        {
          title: 'メガ・ゲンシ・ダイマックス・キョダイマックス',
          body:
            'メガシンカやゲンシカイキは種族値を大幅に引き上げ、レイドで味方全体を強化します。パワースポットで活躍するキョダイマックス個体は、通常のダイマックス技より基礎威力が100高い専用キョダイマックス技を使用できます。',
        },
        {
          title: '色違い一括切替と詳細データ分析',
          body:
            'フィルター機能で地方リージョンフォーム（アローラ・ガラル・ヒスイ・パルデア）やメガ・シャドウを絞り込めるほか、ワンクリックで全ポケモンの色違い姿を確認できます。',
        },
      ],
      faqs: [
        {
          question: 'PL40とPL50の最大CPの違いは何ですか？',
          answer:
            'PL40は通常のアメで強化できる上限で、PL50はトレーナーレベル31以上で入手できる「アメXL」を296個（シャドウは360個）使用して到達できる最大強化レベルです。',
        },
        {
          question: 'ダイマックスとキョダイマックスの違いは？',
          answer:
            'ダイマックス個体のマックス技タイプは通常技に依存しますが、キョダイマックス個体は種族固有の強力なキョダイマックス技（威力350〜450）を放つことができます。',
        },
        {
          question: '各ポケモンの覚える技や対策はどこで見られますか？',
          answer:
            '図鑑内のポケモンカードをクリックすると、個別詳細ページで通常技・ゲージ技一覧、進化条件、弱点・耐性、PvE/PvP評価を確認できます。',
        },
      ],
    },
    ru: {
      badge: 'Энциклопедия и механики статов',
      heading: 'Как читать характеристики в Покедексе Pokémon GO: Базовые статы, CP и особые формы',
      lead:
        'Наш полный Покедекс (Поколения 1–9, #0001–#1025) содержит точные базовые характеристики Pokémon GO (Атака, Защита, Выносливость) и максимальный CP для 100% IV на ключевых уровнях.',
      columns: [
        {
          title: 'Формула CP и уровни 15, 20, 25, 40 и 50',
          body:
            'В формуле CP наибольший вес имеет показатель Атаки. 15-й уровень соответствует наградам за квесты, 20-й и 25-й — поимке в рейдах, 40-й — лимиту за обычные конфеты, а 50-й — максимуму за конфеты XL.',
        },
        {
          title: 'Мега, Праймал, Динамакс и Гигантамакс формы',
          body:
            'Мега- и Праймал-эволюции временно повышают статы и усиливают союзников в рейдах на 30%. Формы Динамакс и Гигантамакс используются в Макс-Битвах на Power Spots.',
        },
        {
          title: 'Переключение Шайни и детальные профили',
          body:
            'Используйте фильтры по поколениям и стихиям, переключайте отображение шайни-версий в один клик и открывайте подробные страницы каждого покемона с аналитикой для рейдов и PvP.',
        },
      ],
      faqs: [
        {
          question: 'В чем разница между CP на 40-м и 50-м уровнях?',
          answer:
            '40-й уровень достигается за обычные конфеты, а для прокачки с 40-го до 50-го уровня требуется 296 конфет XL (360 для теневых покемонов).',
        },
        {
          question: 'Чем Гигантамакс отличается от Динамакс в Pokémon GO?',
          answer:
            'У Динамакс-покемонов тип Макс-атаки зависит от быстрой атаки, а у Гигантамакс-покемонов есть фиксированная фирменная G-Max атака с увеличенным на 100 единиц базовым уроном.',
        },
        {
          question: 'Где посмотреть лучшие атаки и эволюции конкретного покемона?',
          answer:
            'Нажмите на карточку любого покемона в каталоге, чтобы открыть его отдельную страницу с таблицей атак, цепочкой эволюций и гайдом по применению.',
        },
      ],
    },
  },
  rankings: {
    cs: {
      badge: 'Metodika Žebříčků (ER, DPS & PvP Bulk)',
      heading: 'Jak sestavujeme PvE a PvP žebříčky v Pokémon GO: DialgaDex ER, DPS a ligové limity',
      lead:
        'Správné investování Stardustu a vzácných Rare Candy XL rozhoduje o tom, zda zvládnete raidy v malém počtu lidí a zda uspějete v GO Battle League. Naše žebříčky proto oddělují raidovou ofenzívu (PvE) od ligových soubojů (PvP) a Max Battles.',
      columns: [
        {
          title: 'PvE Raidy: Rozdíl mezi DPS, TDO a ER',
          body:
            'DPS (Damage Per Second) měří, jak rychle Pokémon ubírá životy Raid Bossovi, zatímco TDO (Total Damage Output) měří celkové poškození před omdlením. Metrika ER (Effective Rating, úměrná čtvrté odmocnině z DPS³ × TDO) vyvažuje rychlost i výdrž a je nejlepším ukazatelem reálné síly v raidech.',
        },
        {
          title: 'PvP GO Battle League: Proč v Great a Ultra League vládne obrana',
          body:
            'V ligách s CP stropem (Little Cup ≤ 500 CP, Great League ≤ 1500 CP, Ultra League ≤ 2500 CP) dosahují nejvyššího součtu statistik (Stat Product) Pokémoni s nízkým útokem a vysokou obranou a výdrží (např. IV 0/15/15). Naopak v Master League bez CP limitu potřebujete vždy 100% IV (15/15/15) na Levelu 50.',
        },
        {
          title: 'Max Battles: Role Tanků a Útočníků',
          body:
            'V Dynamax a Gigantamax bitvách v Power Spotech je optimální strategií nabíjet Max Meter pomocí 2 odolných Tanků s 0,5sekundovým Fast útokem (např. Blissey, Metagross, Dubwool) a na samotnou Dynamax fázi přepnout na čistého G-Max/D-Max útočníka.',
        },
      ],
      faqs: [
        {
          question: 'Do kterých Pokémonů se v Pokémon GO nejvíce vyplatí investovat Stardust?',
          answer:
            'Nejvyšší návratnost mají univerzální S-Tier raidoví útočníci a Mega/Primal evoluce: Primal Groudon, Primal Kyogre, Mega Rayquaza, Dawn Wings & Dusk Mane Necrozma, Mega Lucario, Shadow Mamoswine, Shadow Metagross, Kartana a Terrakion.',
        },
        {
          question: 'Proč mají někteří Pokémoni u útoku hvězdičku (Elite TM)?',
          answer:
            'Hvězdička označuje speciální Community Day nebo Legacy útok (např. Meteor Mash u Metagrosse, Precipice Blades u Groudona nebo Hydro Cannon u Swamperta), který nelze získat běžným TM, ale pouze během speciálního eventu nebo pomocí Elite TM.',
        },
        {
          question: 'Jak filtrovat nejlepší útočníky podle konkrétního elementu?',
          answer:
            'V přepínači nad tabulkou vyberte režim „Nejlepší útočníci (Podle typu)“ a klikněte na libovolnou z 18 ikon elementů, případně přejděte na samostatnou stránku daného typu.',
        },
      ],
    },
    en: {
      badge: 'Ranking Methodology (ER, DPS & Stat Product)',
      heading: 'How Our Pokémon GO PvE & PvP Tier Lists Work: Effective Rating, DPS & League Caps',
      lead:
        'Investing Stardust and Rare Candy XL wisely is the key to short-manning 5-Star Raids and climbing in GO Battle League. Our rankings evaluate PvE Raid Attackers, PvP Leagues, and Power Spot Max Battles using distinct mathematical models.',
      columns: [
        {
          title: 'PvE Raids: DPS vs. TDO vs. Effective Rating (ER)',
          body:
            'DPS (Damage Per Second) measures raw speed against the raid clock, while TDO (Total Damage Output) measures total damage dealt before fainting. Effective Rating (ER, proportional to the fourth root of DPS³ × TDO) balances speed and survivability to reflect real-world raid performance.',
        },
        {
          title: 'PvP Leagues: Stat Product & CP Caps',
          body:
            'Because Attack is weighted heavily in the CP formula, CP-capped formats (Little Cup 500, Great League 1500, Ultra League 2500) favor high-Defense, high-Stamina Pokémon with low Attack IVs. Unlimited Master League requires 15/15/15 (100% IV) Level 50 powerhouses.',
        },
        {
          title: 'Max Battles: Tank + Attacker Rotation',
          body:
            'In Power Spot Dynamax and Gigantamax battles, the optimal strategy uses two bulky Tanks with 0.5-second Fast Moves to charge the Max Meter quickly, then swaps into a dedicated G-Max or D-Max Attacker during the Max Phase.',
        },
      ],
      faqs: [
        {
          question: 'Which Pokémon are the safest Stardust investments in Pokémon GO?',
          answer:
            'Top multi-role PvE investments include Primal Groudon, Primal Kyogre, Mega Rayquaza, Dusk Mane & Dawn Wings Necrozma, Mega Lucario, Shadow Mamoswine, Shadow Rhyperior, Shadow Metagross, Kartana, and Terrakion.',
        },
        {
          question: 'What does an Elite TM / Legacy Move mean in the rankings?',
          answer:
            'Signature moves like Meteor Mash (Metagross), Precipice Blades (Groudon), Origin Pulse (Kyogre), and Blast Burn/Hydro Cannon require either evolving during a featured event or using an Elite Fast/Charged TM.',
        },
        {
          question: 'How can I view the best raid attackers for a single elemental type?',
          answer:
            'Select the "By Type" filter tab in the rankings interface and choose any of the 18 elemental types to compare Mega, Shadow, and standard attackers side by side.',
        },
      ],
    },
    ja: {
      badge: 'ランキング算出ロジック解説',
      heading: 'Pokémon GO 最強ランキングの評価基準：ER（総合火力指数）・DPSとPvP耐久指数',
      lead:
        'ほしのすなやアメXLをどのポケモンに投資すべきか迷わないよう、当サイトのランキングでは「レイドバトル（PvE）」「GOバトルリーグ（PvP）」「マックスバトル」のそれぞれに最適化された評価指標を採用しています。',
      columns: [
        {
          title: 'PvEレイド：DPS・TDO・ER（総合火力）の違い',
          body:
            'DPSは秒間ダメージ（討伐速度）、TDOは瀕死になるまでの総ダメージ量を示します。ER（DPS³×TDOの4乗根に基づく指標）はスピードと耐久のバランスを正確に反映する実戦的なレイド評価値です。',
        },
        {
          title: 'PvPリーグ：CP制限と理想個体値の仕組み',
          body:
            'CP制限があるスーパーリーグ（1500以下）やハイパーリーグ（2500以下）では、攻撃種族値が低く防御・HPが高いポケモンが高いステータス積（Stat Product）を実現します。CP無制限のマスターリーグでは個体値100%（15/15/15）のPL50育成が必須となります。',
        },
        {
          title: 'マックスバトル：タンク役とアタッカー役の分担',
          body:
            'パワースポットでのダイマックス・キョダイマックス戦では、0.5秒の高速通常技を持つ高耐久タンク役でメーターを溜め、ダイマックス時に高火力アタッカーへ交代する戦術が最も有効です。',
        },
      ],
      faqs: [
        {
          question: '最優先で育成すべきPvE最強ポケモンはどれですか？',
          answer:
            'ゲンシグラードン、ゲンシカイオーガ、メガレックウザ、ネクロズマ（たそがれのたてがみ・あかつきのつばさ）、メガルカリオ、シャドウマンムー、シャドウメタグロス、カミツルギ、テラキオンなどが最優先の投資先です。',
        },
        {
          question: '技名の横にあるレガシー（特別技）とは何ですか？',
          answer:
            'コミュニティ・デイや特別イベント限定で習得できる強力な技（コメットパンチ、だんがいのつるぎ、ハイドロカノン等）で、通常時は「すごいわざマシン」を使用することで習得できます。',
        },
        {
          question: 'タイプ別の最強アタッカーを調べるには？',
          answer:
            'ランキング上部のタイプフィルターから18タイプのアイコンを選択すると、そのタイプのメガシンカ・シャドウ・通常ポケモンを火力順で比較できます。',
        },
      ],
    },
    ru: {
      badge: 'Методология рейтингов (ER, DPS и PvP)',
      heading: 'Как формируются рейтинги PvE и PvP в Pokémon GO: Показатели ER, DPS и лимиты лиг',
      lead:
        'Грамотное вложение звездной пыли и конфет XL позволяет побеждать рейд-боссов малыми группами и стабильно поднимать рейтинг в GO Battle League. Наши таблицы разделяют рейдовую атаку, PvP-лиги и Макс-Битвы.',
      columns: [
        {
          title: 'PvE Рейды: Разница между DPS, TDO и ER',
          body:
            'DPS показывает урон в секунду, а TDO — общий урон до потери сознания. Показатель ER (Effective Rating) объединяет скорость нанесения урона и выживаемость в единый объективный рейтинг для рейдов.',
        },
        {
          title: 'PvP Лиги: Баланс статов и лимиты CP',
          body:
            'В лигах с ограничением CP (Great League до 1500, Ultra League до 2500) лидируют покемоны с высокой защитой и выносливостью при низкой атаке. В Мастер Лиге без лимита CP требуются покемоны 50-го уровня со 100% IV (15/15/15).',
        },
        {
          title: 'Макс-Битвы: Роли Танков и Атакующих',
          body:
            'В битвах Динамакс и Гигантамакс оптимальная тактика — заряжать шкалу Макс-энергии с помощью двух живучих Танков с быстрыми атаками по 0.5 с, а на фазу Макс-атак переключаться на профильного дамагера.',
        },
      ],
      faqs: [
        {
          question: 'В каких покемонов выгоднее всего вкладывать звездную пыль?',
          answer:
            'Лучшие универсальные вложения для рейдов: Праймал Граудон, Праймал Кайогр, Мега Рейкваза, Некрозма (обе формы слияния), Мега Лукарио, Теневой Мамосвайн, Теневой Метагросс, Картана и Терракион.',
        },
        {
          question: 'Что означают особые (Elite TM) атаки в таблицах?',
          answer:
            'Это фирменные атаки событий (например, Meteor Mash у Метагросса или Precipice Blades у Граудона), которые можно получить во время ивентов или с помощью Elite TM.',
        },
        {
          question: 'Как отфильтровать лучших покемонов одного типа?',
          answer:
            'Выберите фильтр по типам в верхней части таблицы и нажмите на нужную из 18 стихий.',
        },
      ],
    },
  },
  filter: {
    cs: {
      badge: 'Manuál vyhledávacích operátorů',
      heading: 'Jak fungují pokročilé vyhledávací řetězce (Search Strings) a správa batohu v Pokémon GO',
      lead:
        'Vestavěný vyhledávací řádek v Pokémon GO podporuje logické operátory, číselné rozsahy a skryté klíčové příkazy. Náš generátor vám z nich na 1 kliknutí sestaví přesný filtr pro 100% IV, PvP kandidáty nebo bleskové promazání stovek nepotřebných úlovků po Community Day.',
      columns: [
        {
          title: 'Logické operátory: AND (&), OR (,) a NOT (!)',
          body:
            'Středník, čárka nebo dvojtečka (`,`, `;`, `:`) fungují jako logické NEBO (OR). Znak ampersand (`&`) nebo svislítko (`|`) fungují jako logické A ZÁROVEŇ (AND) a vykřičník (`!`) před výrazem výsledek neguje (např. `!shiny&!4*&!legendary` skryje všechny vzácné kusy).',
        },
        {
          title: 'Přesné filtrování IV statistik (0–4)',
          body:
            'Od aktualizace vyhledávání lze filtrovat jednotlivé IV sloupce v rozsahu 0 až 4 hvězdiček: `0attack&3-4defense&3-4hp` okamžitě najde všechny Pokémony s nízkým útokem a vysokou obranou i výdrží, kteří jsou ideální pro PvP Great League a Ultra League.',
        },
        {
          title: 'Textové zkratky v iOS a Gboard (Android)',
          body:
            'Abychom vám ušetřili kopírování před každým turnajem či čištěním batohu, uložte si vygenerovaný řetězec do systémového slovníku klávesnice pod krátkou zkratku (např. `pvpiv` nebo `vycistit`). Po napsání zkratky ve hře se celý dlouhý filtr automaticky vloží.',
        },
      ],
      faqs: [
        {
          question: 'Proč má v Pokémon GO operátor OR vyšší prioritu než AND?',
          answer:
            'Vyhledávač v Pokémon GO vyhodnocuje nejprve všechny čárky (OR) a teprve poté ampersandy (AND). Například zápis `shiny,shadow&4*` znamená „(Shiny NEBO Shadow) A ZÁROVEŇ 100% IV“, nikoliv „všichni Shiny a k tomu 100% IV Shadow“.',
        },
        {
          question: 'Jak bezpečně smazat stovky Pokémonů během Spotlight Hour nebo Community Day?',
          answer:
            'Vygenerujte si v našem nástroji režim „Rychlé čištění batohu (Trash String)“, který automaticky vyloučí 4* (100% IV), 3*, Shiny, Shadow, Legendární, Mýtické, Ultra Beasts, XXL/XXS, oblíbené i PvP IV kandidáty (0-1útok s 3-4obranou/HP).',
        },
        {
          question: 'Jak vyhledat Pokémony podle konkrétního typu útoku?',
          answer:
            'Použijte zavináč `@` před názvem útoku nebo typu: například `@fighting` najde Pokémony s bojovým útokem, `@1fighting` s bojovým Fast útokem, `@2fighting` s bojovým Charged útokem a `@special` najde Pokémony s Legacy/Elite TM útokem.',
        },
      ],
    },
    en: {
      badge: 'Search String Syntax Guide',
      heading: 'How Advanced Pokémon GO Search Strings & Storage Filters Work',
      lead:
        'The in-game Pokémon GO search bar supports boolean logic, stat range operators, and hidden keywords. Our interactive generator builds complex filters in one click for 100% IV hunting, Great/Ultra League PvP IVs, and safe post-event storage cleanup.',
      columns: [
        {
          title: 'Boolean Logic: AND (&), OR (,) & NOT (!)',
          body:
            'Commas, semicolons, and colons (`,`, `;`, `:`) act as logical OR. Ampersands (`&`) and pipes (`|`) act as logical AND, while an exclamation mark (`!`) negates any filter (for example, `!4*&!shiny&!legendary` excludes valuables during mass transfers).',
        },
        {
          title: 'Granular IV Bar Filtering (0–4 Tiers)',
          body:
            'You can query individual IV bars from 0 to 4: `0-1attack&3-4defense&3-4hp` instantly isolates low-Attack, high-bulk Pokémon tailored for CP-capped Great League (1500 CP) and Ultra League (2500 CP) PvP.',
        },
        {
          title: 'Saving Filters as Keyboard Text Replacements',
          body:
            'Save your favorite generated strings into iOS Text Replacement or Android Gboard Personal Dictionary under a short trigger like `!trash` or `!pvp`. Typing that shortcut inside Pokémon GO expands the entire filter instantly.',
        },
      ],
      faqs: [
        {
          question: 'Why does OR (,) evaluate before AND (&) in Pokémon GO search strings?',
          answer:
            'Unlike standard programming languages, Pokémon GO evaluates OR operations (`A,B`) before AND operations (`&C`). Writing `fire,water&3*` returns all Pokémon that are (Fire OR Water) AND 3-Star.',
        },
        {
          question: 'How do I safely mass-transfer Pokémon during Community Day?',
          answer:
            'Use our Storage Cleanup (Trash String) preset, which combines `!4*&!3*&!shiny&!shadow&!legendary&!mythical&!ultrabeast&!@special&!0-1attack` with `age0` so you only see recently caught low-IV Pokémon with no PvP potential.',
        },
        {
          question: 'How do I search for Pokémon by move name or move type?',
          answer:
            'Prefix the move or type with `@`: `@ice` finds any Pokémon with an Ice-type move, `@1ice` checks the Fast Move, `@2ice` checks thefirst Charged Move, and `@special` finds Pokémon with exclusive Legacy/Community Day moves.',
        },
      ],
    },
    ja: {
      badge: '検索コマンド完全マニュアル',
      heading: 'Pokémon GO ボックス検索コマンドの仕組みと高速ボックス整理術',
      lead:
        'Pokémon GOのポケモンボックス検索バーは、論理演算子（AND・OR・NOT）や個体値バー指定に対応しています。当ツールを使えば、個体値100%検索、PvP厳選、コミュニティ・デイ後の不要ポケモン一括博士送り用コマンドをワンクリックで生成できます。',
      columns: [
        {
          title: '論理演算子：AND（&）、OR（,）、NOT（!）',
          body:
            'カンマ（`,`）は「または（OR）」、アンパサンド（`&`）は「かつ（AND）」、感嘆符（`!`）は「除外（NOT）」を意味します。例えば `!4*&!色違い&!伝説のポケモン` と入力すると貴重個体を安全に除外できます。',
        },
        {
          title: '攻撃・防御・HPの個別バー指定（0〜4）',
          body:
            '`0-1攻撃&3-4防御&3-4HP`（英語環境では `0-1attack&3-4defense&3-4hp`）を使えば、スーパーリーグやハイパーリーグ向けの低攻撃・高耐久個体だけを瞬時に抽出できます。',
        },
        {
          title: 'スマホの辞書登録で1秒呼び出し',
          body:
            '生成した検索文字列をiOSの「ユーザ辞書」やAndroid（Gboard）の「単語リスト」に「ぼっくす」や「げんせん」などの短い読みで登録しておくと、ゲーム内でいつでも一瞬で入力できます。',
        },
      ],
      faqs: [
        {
          question: '検索コマンドで「,（OR）」と「&（AND）」を使う際の注意点は？',
          answer:
            'Pokémon GOの検索仕様では、AND（&）よりも先にOR（,）が処理されます。複数条件を組み合わせる際は当ツールの自動生成を使うことで意図通りの絞り込みが可能です。',
        },
        {
          question: 'イベント中にボックスを素早く安全に空ける方法は？',
          answer:
            '「ボックス整理（不要ポケモン抽出）」プリセットを使用すると、星4（100%）、星3、色違い、伝説、幻、特別技持ち、PvP良個体をすべて除外した「24時間以内に捕まえた不要個体」だけを表示できます。',
        },
        {
          question: '特定の技タイプやレガシー技を持つポケモンを探すには？',
          answer:
            '先頭に `@` を付けて `@こおり`（こおり技持ち）、`@1こおり`（通常技がこおり）、`@特別な技`（レガシー技持ち）のように検索できます。',
        },
      ],
    },
    ru: {
      badge: 'Руководство по поисковым операторам',
      heading: 'Как работают поисковые строки (Search Strings) и фильтрация хранилища в Pokémon GO',
      lead:
        'Встроенный поиск в хранилище Pokémon GO поддерживает логические операторы, диапазоны статов и скрытые команды. Наш генератор в один клик создает фильтры для поиска 100% IV, PvP-кандидатов и быстрой очистки сумки после событий.',
      columns: [
        {
          title: 'Логические операторы: И (&), ИЛИ (,) и НЕ (!)',
          body:
            'Запятая (`,`) работает как логическое ИЛИ (OR), символ амперсанда (`&`) — как И (AND), а восклицательный знак (`!`) исключает условие (например, `!4*&!shiny&!legendary` скроет всех редких покемонов).',
        },
        {
          title: 'Точная фильтрация полосок IV (0–4)',
          body:
            'Запрос `0-1attack&3-4defense&3-4hp` мгновенно находит покемонов с низкой атакой и высокой защитой/выносливостью, которые идеально подходят для PvP Великой и Ультра Лиг.',
        },
        {
          title: 'Автозамена текста на клавиатуре смартфона',
          body:
            'Сохраните сгенерированную строку в пользовательский словарь клавиатуры iOS или Gboard на Android под коротким сокращением (например, `!очистка`), чтобы вставлять длинный фильтр в игре за секунду.',
        },
      ],
      faqs: [
        {
          question: 'Почему в поиске Pokémon GO запятая (ИЛИ) важнее амперсанда (И)?',
          answer:
            'Поисковый движок игры сначала объединяет выражения через запятую (OR), а затем применяет пересечение через `&` (AND). Наш генератор автоматически учитывает этот порядок операций.',
        },
        {
          question: 'Как быстро очистить хранилище во время Community Day?',
          answer:
            'Используйте пресет «Очистка хранилища (Trash String)», который исключает 4* (100% IV), 3*, шайни, теневых, легендарных, мифических покемонов и кандидатов для PvP.',
        },
        {
          question: 'Как найти покемонов с определенным типом атак или Legacy-атакой?',
          answer:
            'Используйте символ `@`: например, `@ice` найдет покемонов с ледяными атаками, `@1ice` — с быстрой ледяной атакой, а `@special` — покемонов с эксклюзивными ивентовыми атаками.',
        },
      ],
    },
  },
  friends: {
    cs: {
      badge: 'Průvodce Přátelstvím & Vivillonem',
      heading: 'Jak maximalizovat XP z přátelství, posbírat 18 vzorů Vivillona a získat Lucky Friends',
      lead:
        'Systém přátelství v Pokémon GO je zdaleka nejrychlejším zdrojem trenérských zkušeností (XP), bezplatných předmětů ze 40 otevřených dárků denně, pozvánek na mezinárodní Remote Raidy a sběratelské platinové medaile Vivillon Collector.',
      columns: [
        {
          title: 'Milníky přátelství a zdvojnásobení XP přes Lucky Egg',
          body:
            'Za dosažení Good Friends (1 den) získáte 3 000 XP, Great Friends (7 dní) 10 000 XP, Ultra Friends (30 dní) 50 000 XP a Best Friends (90 dní) masivních 100 000 XP. Aktivací Lucky Egg těsně před otevřením rozhodujícího dárku získáte za jediného Best Frienda 200 000 XP (a během sezónních 1,5× XP bonusů až 300 000 XP).',
        },
        {
          title: 'Sběr všech 18 regionálních vzorů Vivillona',
          body:
            'Přišpendlením (Pin) pohlednice z dárku od přítele do svého Postcard Booku přičtete bod k medaili příslušného geografického regionu (od vzácných regionů Icy Snow, Tundra, Sandstorm, Sun a Ocean až po náš středoevropský Continental a Meadow). Za 3, 9 a 15 pohlednic se odemkne setkání se Scatterbugem.',
        },
        {
          title: 'Lucky Friends a slevy na Stardust při výměně',
          body:
            'S každým Best Friendem máte při první denní interakci (otevření dárku, společný raid, výměna nebo PvP souboj) šanci stát se Lucky Friends. Vaše příští výměna Pokémonů pak garantuje Lucky Pokémona s minimálním IV 12/12/12 a trvalou 50% slevou na Stardust při vylepšování.',
        },
      ],
      faqs: [
        {
          question: 'Kolik dárků mohu v Pokémon GO denně otevřít a poslat?',
          answer:
            'Standardně můžete otevřít až 30 dárků denně (se sezónním bonusem nebo Ticketem až 40–50 dárků) a z PokéStopů můžete za den vytočit a rozeslat až 100 dárků (v batohu lze nést 20 dárků najednou, při bonusu 40).',
        },
        {
          question: 'Které regiony Vivillona jsou nejvzácnější a jak je získat?',
          answer:
            'Nejvzácnější jsou vzory Ocean (Havaj, Réunion), Sandstorm (Blízký východ), Sun (severní Austrálie, Mexiko), Tundra (Hokkaidó v Japonsku, severní Norsko) a Icy Snow (Finsko, Aljaška). V našem vyhledávači výše si můžete přátele filtrovat přímo podle regionu.',
        },
        {
          question: 'Jak přidat přítele jedním kliknutím přes QR kód nebo kopírování?',
          answer:
            'Na mobilu stačí kliknout na tlačítko „Kopírovat kód“ u vybraného trenéra a v Pokémon GO v sekci Přátelé ➔ Přidat přítele kód vložit, případně z druhého displeje naskenovat vygenerovaný QR kód.',
        },
      ],
    },
    en: {
      badge: 'Friendship & Vivillon Guide',
      heading: 'How to Maximize Friendship XP, Collect All 18 Vivillon Patterns & Trigger Lucky Friends',
      lead:
        'The Friendship system in Pokémon GO is the single fastest way to level up via Lucky Egg XP milestones, stock up on items from daily Gifts, join international Remote Raids, and complete the Platinum Vivillon Collector medal.',
      columns: [
        {
          title: 'Friendship XP Milestones & Lucky Egg Stacking',
          body:
            'Reaching Good Friends (1 day) awards 3,000 XP, Great Friends (7 days) 10,000 XP, Ultra Friends (30 days) 50,000 XP, and Best Friends (90 days) 100,000 XP. Popping a Lucky Egg doubles Best Friends to 200,000 XP per trainer (up to 300,000 XP during 1.5x Friendship XP seasons).',
        },
        {
          title: 'Pinning Postcards for All 18 Vivillon Habitats',
          body:
            'Pinning a Gift postcard before opening it progresses that region’s sub-medal—including rare habitats like Ocean, Sandstorm, Sun, Tundra, and Icy Snow—triggering a Scatterbug encounter after 3, 9, and every 15 pinned postcards.',
        },
        {
          title: 'Lucky Friends & Raid Damage / Premier Ball Bonuses',
          body:
            'Raiding with a Best Friend grants a +10% damage bonus and +4 extra Premier Balls. Once at Best Friends, your first daily interaction carries a chance to trigger Lucky Friends, guaranteeing a 12/12/12+ IV Lucky Pokémon on your next trade.',
        },
      ],
      faqs: [
        {
          question: 'How many Gifts can I open and send per day in Pokémon GO?',
          answer:
            'Trainers can open up to 30 Gifts per day by default (up to 40–50 with seasonal bonuses or tickets) and spin PokéStops to send over 100 Gifts daily.',
        },
        {
          question: 'How do I get Scatterbug and rare Vivillon patterns like Ocean and Sandstorm?',
          answer:
            'Filter our Trainer Matchmaker above by region or goal, add trainers from Hawaii (Ocean), the Middle East (Sandstorm), or Hokkaido/Norway (Tundra), and tap the Pin icon on their Gifts before opening them.',
        },
        {
          question: 'Can I pin and immediately unpin a Postcard and still get Vivillon progress?',
          answer:
            'Yes! Pinning a Gift postcard and immediately tapping the Pin icon again to unpin it still counts toward your Scatterbug encounter while keeping your Postcard Book from filling up.',
        },
      ],
    },
    ja: {
      badge: 'フレンド機能＆ビビヨン攻略ガイド',
      heading: 'フレンドXPの効率的な稼ぎ方、ビビヨン全18模様コンプリートとキラフレンドの仕組み',
      lead:
        'Pokémon GOのフレンド機能は、しあわせタマゴを使った大量XP獲得、毎日のギフト開封によるアイテム補給、海外リモートレイド招待、そしてビビヨン全18模様（コレクターメダル）達成に欠かせない機能です。',
      columns: [
        {
          title: '仲良し度XPボーナスとしあわせタマゴの併用',
          body:
            '仲良し度が上がるごとにXPを獲得でき、親友（30日）で50,000 XP、大親友（90日）で100,000 XPが入ります。しあわせタマゴを使用すれば大親友1人あたり200,000 XP（シーズンボーナス時は最大300,000 XP）を獲得可能です。',
        },
        {
          title: 'ポストカードピン留めとビビヨン18模様の集め方',
          body:
            'フレンドから届いたギフトのポストカードをピン留めすると、送信元の地域に応じたビビヨンメダルが進み、3枚・9枚・以降15枚ごとにコフキムシの捕獲チャンスが発生します（日本は主にみやび・せつげん・スコール）。',
        },
        {
          title: 'キラフレンド確率とレイドダメージ＆ボール増加',
          body:
            '大親友と一緒にレイドに参加すると攻撃力+10%とプレミアボール+4個のボーナスが得られます。さらに大親友との1日最初のやり取りで「キラフレンド」になると、次回交換時に個体値12/12/12以上確定のキラポケモンになります。',
        },
      ],
      faqs: [
        {
          question: '1日に開封・送信できるギフトの上限はいくつですか？',
          answer:
            '通常時は1日最大30個まで開封可能（シーズンボーナス等で最大40〜50個）で、ポケストップから1日100個以上のギフトを入手してフレンドに贈ることができます。',
        },
        {
          question: 'レアなビビヨン模様（オーシャン・さじん・たいよう等）を集めるコツは？',
          answer:
            '当掲示板のフィルターで海外トレーナーを検索してフレンド申請し、届いたギフトを開封する前に必ずピン留めボタンを押してください。',
        },
        {
          question: 'ポストカードブックがいっぱいにならない裏技はありますか？',
          answer:
            'ギフト画面でピン留めアイコンをタップした直後にもう一度タップしてピン留めを解除しても、コフキムシのカウントは正常に+1進みます。',
        },
      ],
    },
    ru: {
      badge: 'Гайд по Друзьям и Вивиллону',
      heading: 'Как максимизировать XP за дружбу, собрать все 18 узоров Вивиллона и получить Lucky Friends',
      lead:
        'Система друзей в Pokémon GO — самый быстрый способ прокачки уровня тренера с помощью Lucky Egg, ежедневного получения предметов из подарков, участия в удаленных рейдах и сбора платиновой медали Вивиллона.',
      columns: [
        {
          title: 'Награды XP за уровни дружбы и Lucky Egg',
          body:
            'За уровень Ultra Friends (30 дней) вы получаете 50 000 XP, а за Best Friends (90 дней) — 100 000 XP. Активация Счастливого яйца (Lucky Egg) удваивает награду за Best Friends до 200 000 XP с одного друга.',
        },
        {
          title: 'Сбор всех 18 региональных узоров Вивиллона',
          body:
            'Прикрепляйте (Pin) открытки из подарков друзей перед их открытием, чтобы заполнять шкалу регионов Вивиллона (включая редкие Ocean, Sandstorm, Sun, Tundra и Icy Snow) и ловить Скаттербагов.',
        },
        {
          title: 'Lucky Friends и бонусы в рейдах',
          body:
            'Участие в рейде с Best Friend дает +10% к урону и +4 дополнительных Премьер-мяча. Первое ежедневное взаимодействие с Best Friend может сделать вас Lucky Friends, гарантируя Счастливого покемона (IV от 12/12/12) при следующем обмене.',
        },
      ],
      faqs: [
        {
          question: 'Сколько подарков можно открывать и отправлять в день?',
          answer:
            'По умолчанию можно открывать до 30 подарков в день (до 40–50 с сезонными бонусами) и отправлять более 100 подарков, полученных с Покестопов.',
        },
        {
          question: 'Как быстрее собрать редкие узоры Вивиллона (Ocean, Sandstorm, Sun)?',
          answer:
            'Используйте фильтры нашего списка кодов тренеров выше, чтобы находить игроков из редких регионов, и нажимайте значок булавки на каждом полученном подарке.',
        },
        {
          question: 'Засчитывается ли открытка для Скаттербага, если сразу открепить булавку?',
          answer:
            'Да! Если прикрепить открытку в окне подарка и тут же нажать булавку еще раз для открепления, прогресс медали Вивиллона засчитается, а альбом открыток не переполнится.',
        },
      ],
    },
  },
};

export const SectionEditorialGuide: React.FC<{ section: EditorialSectionId; lang: Language }> = ({ section, lang }) => {
  const content = SECTION_EDITORIAL_CONTENT[section]?.[lang] || SECTION_EDITORIAL_CONTENT[section]?.en;
  if (!content) return null;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <section
      className="section-editorial-guide card"
      style={{
        marginTop: '24px',
        padding: '22px 24px',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-card)',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div style={{ marginBottom: '16px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: '999px',
            backgroundColor: 'rgba(168, 85, 247, 0.14)',
            border: '1px solid rgba(168, 85, 247, 0.35)',
            color: '#c084fc',
            fontSize: '0.75rem',
            fontWeight: 800,
            marginBottom: '8px',
          }}
        >
          {content.badge}
        </span>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 850, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
          {content.heading}
        </h2>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          {content.lead}
        </p>
      </div>

      {/* 3-Column Editorial Breakdown */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '14px',
          alignItems: 'start',
          marginBottom: '20px',
        }}
      >
        {content.columns.map((col, idx) => (
          <article
            key={idx}
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.025)',
              border: '1px solid var(--border-color)',
            }}
          >
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
              {col.title}
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {col.body}
            </p>
          </article>
        ))}
      </div>

      {/* Section FAQs */}
      <div>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 12px 0', color: 'var(--text-primary)' }}>
          {lang === 'cs'
            ? 'Často kladené otázky (FAQ)'
            : lang === 'ja'
              ? 'よくある質問 (FAQ)'
              : lang === 'ru'
                ? 'Часто задаваемые вопросы (FAQ)'
                : 'Frequently Asked Questions (FAQ)'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {content.faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-color)',
              }}
            >
              <h4 style={{ fontSize: '0.9rem', fontWeight: 750, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                {faq.question}
              </h4>
              <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
