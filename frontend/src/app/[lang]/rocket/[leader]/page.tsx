import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RocketGuide } from '@/components/RocketGuide';
import type { Language } from '@/data/translations';
import { buildAlternates, getBreadcrumbLabel } from '@/utils/seoHelper';
import { API_BASE_URL } from '@/config';

export const revalidate = 3600;

export const ROCKET_LEADERS = ['giovanni', 'cliff', 'sierra', 'arlo', 'grunts'] as const;
export type RocketLeaderSlug = typeof ROCKET_LEADERS[number];

interface LeaderEditorialInfo {
  name: string;
  roleBadge: string;
  title: string;
  desc: string;
  summary: string;
  tacticsParagraph1: string;
  tacticsParagraph2: string;
  rewardAnalysis: string;
  faqs: { question: string; answer: string }[];
}

const LEADER_INFO: Record<RocketLeaderSlug, Record<Language, LeaderEditorialInfo>> = {
  giovanni: {
    cs: {
      name: 'Giovanni',
      roleBadge: 'Hlavní Boss Team GO Rocket',
      title: 'Boss Giovanni Sestava, Slabosti & Nejlepší Counters | Pokémon GO',
      desc: 'Kompletní taktický průvodce na Bosse Giovanniho v Pokémon GO: aktuální sestava (1.–3. slot), jak snadno porazit Persiana, nejlepší counters a Shadow Legendární odměna.',
      summary:
        'Giovanni je nejvyšší Boss organizace Team GO Rocket a k jeho vyhledání potřebujete černý Super Rocket Radar ze sezónního Special Research úkolu. Zápas vždy zahajuje s Persianem v 1. slotu, ve 2. slotu vybírá jednoho ze tří obrněných Pokémonů a ve 3. slotu nasazuje aktuálního Shadow Legendárního Pokémona.',
      tacticsParagraph1:
        'Klíčem k poražení Giovanniho je správné využití mechaniky dvousekundového zamrznutí (stun-lock). Kdykoliv vystřídáte Pokémona v boji nebo některá strana použije Charged útok, Giovanni přestane útočit přesně na 2 sekundy (4 turnů). Nikdy nezačínejte zápas přímo se svým hlavním bojovým counterem na 1. pozici – dejte ho na 2. místo v týmu a ihned po startu zápasu na něj přepněte. Tím získáte 2 sekundy volného nabíjení energie proti Persianovi, který jinak způsobuje extrémní Fast Move poškození útoky Scratch nebo Feint Attack.',
      tacticsParagraph2:
        'Protože Giovanni (stejně jako lídři) vždy použije své 2 ochranné štíty na vaše první dva Charged útoky bez ohledu na jejich sílu, vyberte na Persiana bojového Pokémona s extrémně levným Charged útokem: Lucario (Force Palm + Power-Up Punch), Terrakion (Double Kick + Sacred Sword) nebo Machamp (Counter + Cross Chop). Jakmile spálíte oba jeho štíty na Persianovi, budete mít čistou cestu k odpálení silných útoků do jeho 2. slotu i finálního Shadow Legendárního Pokémona.',
      rewardAnalysis:
        'Odměnou za poražení Giovanniho je garantované setkání s jeho Shadow Legendárním Pokémonem z 3. slotu (při chytání vždy použijte Pinap Berry, protože Shadow Legendární Pokémon z Giovanniho má 100% šanci na chycení prvním trefeným míčem, pokud nejede příliš rychle). Pokud je navíc aktivní deštivé, větrné či slunečné počasí odpovídající typu bosse, chytíte ho na Levelu 13 místo Levelu 8 a ušetříte desítky tisíc Stardustu.',
      faqs: [
        {
          question: 'Jak získat Super Rocket Radar na Giovanniho?',
          answer:
            'Černý Super Rocket Radar získáte plněním sezónního Team GO Rocket Special Research příběhu, který se odemyká během události Team GO Rocket Takeover (obvykle jednou za sezónu, tedy každé 3 měsíce). Během tohoto úkolu musíte porazit všechny tři lídry – Arla, Cliffa a Sierru.',
        },
        {
          question: 'Jak nejrychleji porazit Giovanniho Persiana v 1. slotu?',
          answer:
            'Dejte svého bojového Pokémona (Mega Lucario, Terrakion, Machamp nebo Annihilape) na 2. slot v týmu a ihned po odpočtu na začátku bitvy na něj vystřídejte. Využijete 2sekundovou pauzu Giovanniho a rychle nabijete dva levné Charged útoky, kterými spálíte oba jeho štíty.',
        },
        {
          question: 'Mám Shadow Legendárního Pokémona od Giovanniho očistit (Purify)?',
          answer:
            'Ve 99 % případů NE! Shadow bonus (+20 % k útoku) dělá i ze Shadow Legendárního Pokémona s průměrným IV (např. 8/10/12) mnohem silnějšího raidového útočníka než 100% IV (Hundo) očištěná verze. Navíc od Giovanniho získáte vždy jen omezený počet kusů.',
        },
      ],
    },
    en: {
      name: 'Giovanni',
      roleBadge: 'Team GO Rocket Supreme Boss',
      title: 'Giovanni Lineup, Weaknesses & Best Counters Guide | Pokémon GO',
      desc: 'Complete tactical guide to defeating Team GO Rocket Boss Giovanni in Pokémon GO: current 3-slot lineup, how to beat Persian, top counters, and Shadow Legendary reward.',
      summary:
        'Giovanni is the Supreme Boss of Team GO Rocket and requires a black Super Rocket Radar from seasonal Special Research to track down. He always leads with Persian in Slot 1, chooses one of three bulky Pokémon in Slot 2, and finishes with the current rotation Shadow Legendary Pokémon in Slot 3.',
      tacticsParagraph1:
        'The single most important mechanic against Giovanni is exploiting the 2-second AI stun-lock delay. Every time either player uses a Charged Move or switches Pokémon, Giovanni stops attacking completely for 2 full seconds (4 turns). Never put your primary Fighting-type Persian counter in your first party slot—place it in Slot 2 and immediately switch to it as soon as the battle starts. This grants free energy generation against Persian, whose Scratch or Feint Attack Fast Moves otherwise shred shields and HP.',
      tacticsParagraph2:
        'Because Giovanni is programmed to always use his two Protect Shields on your first two Charged Moves regardless of damage, use a spammy Fighting-type attacker with low-energy moves: Lucario (Force Palm + Power-Up Punch), Terrakion (Double Kick + Sacred Sword), or Machamp (Counter + Cross Chop). Once both shields are burned during the Persian phase, your backline counters can land unshielded nukes on Slot 2 and the Shadow Legendary in Slot 3.',
      rewardAnalysis:
        'Defeating Giovanni rewards an encounter with his Slot 3 Shadow Legendary Pokémon. Always use a Silver Pinap or regular Pinap Berry on your first throw—Shadow Legendaries rescued from Giovanni have a 100% guaranteed catch rate on the first premier ball that lands (barring GPS speed-lock). Waiting for Weather Boost increases the catch level from Level 8 to Level 13, saving substantial Stardust and Candy.',
      faqs: [
        {
          question: 'How do I get a Super Rocket Radar to find Giovanni?',
          answer:
            'Super Rocket Radars are awarded through seasonal Team GO Rocket Special Research questlines released during Team GO Rocket Takeover events (once per season). You must defeat Leaders Arlo, Cliff, and Sierra to complete the research steps and claim the Super Rocket Radar.',
        },
        {
          question: 'What is the best counter for Giovanni’s Persian?',
          answer:
            'Mega Lucario or regular Lucario with Force Palm and Power-Up Punch is the #1 counter against Persian because Power-Up Punch costs very little energy, burns both shields quickly, boosts Lucario’s Attack stat, and triggers the 2-second AI pause repeatedly.',
        },
        {
          question: 'Should I purify Giovanni’s Shadow Legendary Pokémon?',
          answer:
            'Almost never. The +20% Shadow Attack bonus makes even a low-IV Shadow Legendary significantly stronger in PvE Raids than a 100% IV purified version, and Shadow Legendaries are strictly limited in supply.',
        },
      ],
    },
    ja: {
      name: 'サカキ',
      roleBadge: 'GOロケット団 ボス',
      title: 'サカキの手持ちポケモンと対策・倒し方完全ガイド | Pokémon GO',
      desc: 'Pokémon GOのGOロケット団ボス「サカキ」の最新手持ち編成（1〜3匹目）、ペルシアンの突破方法、最強対策パーティとシャドウ伝説報酬の解説。',
      summary:
        'サカキはGOロケット団の最高幹部（ボス）であり、挑戦するにはスペシャルリサーチ報酬の「スーパーロケットレーダー」が必要です。1匹目は常にペルシアン、2匹目は3種類の候補からランダム、3匹目には現在のシャドウ伝説ポケモンを繰り出してきます。',
      tacticsParagraph1:
        'サカキ攻略で最も重要なテクニックは「約2秒間の硬直時間（スタンロック）」の活用です。ポケモンの交代時やゲージ技の使用後、サカキは約2秒間通常攻撃を完全に停止します。1匹目のペルシアン対策となるかくとうタイプをパーティの2番目に配置し、バトル開始直後に即交代することで一方的にゲージを溜めることができます。',
      tacticsParagraph2:
        'サカキは最初の2回のゲージ技に対して必ずシールドを2枚使用します。そのため、ルカリオ（発勁＋グロウパンチ）、テラキオン（にどげり＋せいなるつるぎ）、カイリキー（カウンター＋クロスチョップ）など、必要エネルギーが少ない高速ゲージ技でシールドを素早く破壊するのが鉄則です。',
      rewardAnalysis:
        'サカキに勝利すると3匹目のシャドウ伝説ポケモンのゲットチャレンジが発生します。サカキ戦のシャドウ伝説はボールが当たれば1発で確定捕獲となるため、必ずパイルのみ（またはぎんのパイルのみ）を使用してアメを2倍獲得しましょう。',
      faqs: [
        {
          question: 'サカキと戦うためのスーパーロケットレーダーの入手方法は？',
          answer:
            '毎シーズン開催される「GOロケット団占拠イベント」で配布されるスペシャルリサーチを進め、リーダーのアルロ・クリフ・シエラを全員倒すことで入手できます。',
        },
        {
          question: '1匹目のペルシアンに勝てない場合の対策は？',
          answer:
            'かくとうタイプ（ルカリオやテラキオン）を先頭ではなく2番目に編成し、開始直後に交代して硬直時間を作りながらグロウパンチ等の軽い技を連打してください。',
        },
        {
          question: 'サカキから入手したシャドウ伝説はリトレーンすべきですか？',
          answer:
            'いいえ。シャドウボーナス（攻撃力1.2倍）により、個体値が低くてもリトレーン後の100%個体よりレイド火力が大幅に高いため、シャドウのまま育成することを強く推奨します。',
        },
      ],
    },
    ru: {
      name: 'Джованни',
      roleBadge: 'Босс Team GO Rocket',
      title: 'Босс Джованни: Состав, слабости и лучшие контр-покемоны | Pokémon GO',
      desc: 'Полный тактический гайд по победе над Боссом Джованни в Pokémon GO: актуальный состав (1–3 слоты), как победить Персиана и получить теневого легендарного покемона.',
      summary:
        'Джованни — верховный босс Команды GO Rocket, для поиска которого требуется черный Супер Радар Команды R из сезонного спец-исследования. В первом слоте он всегда выпускает Персиана, во втором — одного из трех мощных покемонов, а в третьем — текущего теневого легендарного покемона.',
      tacticsParagraph1:
        'Главный секрет победы над Джованни — использование 2-секундной паузы ИИ (стан-лок) после каждой смены покемона или применения заряженной атаки. Никогда не ставьте своего главного боевого контр-покемона против Персиана в первый слот команды: поставьте его вторым и мгновенно переключитесь на него в самом начале боя, чтобы получить 2 секунды бесплатного набора энергии.',
      tacticsParagraph2:
        'Поскольку Джованни всегда тратит оба своих щита на ваши первые две заряженные атаки, используйте боевых покемонов с максимально быстрыми атаками: Лукарио (Force Palm + Power-Up Punch), Терракион (Double Kick + Sacred Sword) или Мачамп (Counter + Cross Chop). Сняв щиты на Персиане, вы сможете беспрепятственно пробить второй и третий слоты.',
      rewardAnalysis:
        'За победу над Джованни вы гарантированно встретите теневого легендарного покемона из его 3-го слота. Обязательно используйте Pinap Berry при броске: теневые легенды от Джованни ловятся со 100% шансом с первого точного попадания.',
      faqs: [
        {
          question: 'Как получить Супер Радар Команды R для битвы с Джованни?',
          answer:
            'Супер Радар выдается за выполнение сезонного спец-исследования во время событий Team GO Rocket Takeover (раз в сезон) после победы над лидерами Арло, Клиффом и Сиеррой.',
        },
        {
          question: 'Как быстрее всего пробить Персиана Джованни?',
          answer:
            'Поставьте Лукарио, Терракиона или Мачампа во 2-й слот и сразу переключитесь на него после старта боя, чтобы спамить быстрыми заряженными атаками и сжечь оба щита босса.',
        },
        {
          question: 'Стоит ли очищать (Purify) теневого легендарного покемона от Джованни?',
          answer:
            'Ни в коем случае! Теневой бонус (+20% к атаке) делает даже покемона со средними IV намного сильнее в рейдах, чем очищенная версия со 100% IV.',
        },
      ],
    },
  },
  cliff: {
    cs: {
      name: 'Cliff',
      roleBadge: 'Lídr Team GO Rocket',
      title: 'Lídr Cliff Sestava, Slabosti & Nejlepší Counters | Pokémon GO',
      desc: 'Aktuální Pokémoni, slabosti a nejlepší counters na lídra Cliffa (Team GO Rocket) v Pokémon GO. Jak spálit štíty a získat Shadow odměnu a 12km vejce.',
      summary:
        'Lídr Cliff je známý svou hrubou silou a odolnými kamennými, zemními a bojovými Pokémony. K zápasu s ním potřebujete klasický Rocket Radar (poskládaný ze 6 Mysterious Components od řadových Gruntů). Vždy kryje první 2 Charged útoky štítem.',
      tacticsParagraph1:
        'Cliffovy sestavy tradičně disponují vysokým Fast Move poškozením. Pokud necháte jeho prvního Pokémona volně útočit bez přerušení, dokáže vám zlikvidovat celého leadera dřív, než nabijete pomalý útok. Proto proti Cliffovi vždy využívejte okamžitou výměnu Pokémona hned po startu bitvy a vsaďte na útočníky s generováním energie přes Force Palm, Mud Shot, Double Kick nebo Counter.',
      tacticsParagraph2:
        'Pro druhý a třetí slot mějte v záloze univerzální pokrytí – kombinace Bojového/Ocelového útočníka (Mega Lucario, Metagross), Ledového útočníka (Shadow Mamoswine s Avalanche) a Vodního/Zemního útočníka (Primal Kyogre, Swampert s Hydro Cannon) spolehlivě pokryje všechny tři varianty jeho zadní linie.',
      rewardAnalysis:
        'Po poražení Cliffa získáte možnost chytit jeho Shadow Pokémona z 1. slotu (s šancí přibližně 1 ku 64 na Shiny Shadow variantu!) a pokud máte volné místo v inventáři vajec, obdržíte také vzácné 12km Strange Egg.',
      faqs: [
        {
          question: 'Jaké Pokémony používá lídr Cliff v aktuální rotaci?',
          answer:
            'Přesnou sestavu Cliffa pro 1., 2. i 3. slot včetně typových slabostí a doporučených Mega, pokročilých i budget counterů najdete v interaktivním přehledu níže na této stránce.',
        },
        {
          question: 'Může být Shadow Pokémon od lídra Cliffa Shiny?',
          answer:
            'Ano! Všichni tři lídři Team GO Rocket (Cliff, Sierra i Arlo) mohou po poražení odměnit hráče Shiny verzí svého prvního Shadow Pokémona se zvýšenou šancí cca 1:64.',
        },
        {
          question: 'Jak získat 12km Strange Egg od Cliffa?',
          answer:
            'Před zahájením bitvy s Cliffem se ujistěte, že máte alespoň 1 volný slot v hlavní nebo bonusové sekci pro vejce a že nemáte plný batoh na Pokémony. Za vítězství pak automaticky získáte 12km Strange Egg.',
        },
      ],
    },
    en: {
      name: 'Cliff',
      roleBadge: 'Team GO Rocket Leader',
      title: 'Leader Cliff Lineup, Weaknesses & Best Counters | Pokémon GO',
      desc: 'Current Pokémon lineup, weaknesses, and best counters to defeat Team GO Rocket Leader Cliff in Pokémon GO, plus Shiny Shadow & 12km Egg tips.',
      summary:
        'Team GO Rocket Leader Cliff specializes in bulky Rock, Ground, and Fighting lineups with heavy Fast Move pressure. Equippable via a standard Rocket Radar (6 Mysterious Components), Cliff always shields your first two Charged Moves.',
      tacticsParagraph1:
        'Cliff’s lineups deal punishing Fast Move damage if allowed to attack uninterrupted. Always switch into your shield-breaker immediately after the countdown ends to trigger the 2-second AI pause, and bring fast-charging moves like Power-Up Punch, Sacred Sword, Hydro Cannon, or Avalanche.',
      tacticsParagraph2:
        'To cover all three possible combinations in Cliff’s second and third slots, build a balanced trio combining a Fighting/Steel lead (Lucario, Terrakion), an Ice attacker (Mamoswine), and a Water/Ground sweeper (Kyogre, Swampert, or Groudon).',
      rewardAnalysis:
        'Defeating Cliff rewards an encounter with his Slot 1 Shadow Pokémon—which carries an approximately 1-in-64 boosted Shiny Shadow rate—along with a 12km Strange Egg if you have an open egg slot.',
      faqs: [
        {
          question: 'Can Cliff’s Shadow reward Pokémon be Shiny?',
          answer:
            'Yes! Defeating Leader Cliff gives an encounter with his first-slot Shadow Pokémon, which has a boosted ~1/64 chance to be a Shiny Shadow Pokémon.',
        },
        {
          question: 'How do I get a 12km Strange Egg from Cliff?',
          answer:
            'Ensure you have an open slot in your regular 9-egg storage or 3-slot bonus storage (and open Pokémon storage space) before battling Cliff with a Rocket Radar.',
        },
        {
          question: 'Why does Cliff shield every Charged Move?',
          answer:
            'All Team GO Rocket Leaders are programmed to use their two Protect Shields on the player’s first two Charged Moves. Use low-energy bait moves first to strip both shields rapidly.',
        },
      ],
    },
    ja: {
      name: 'クリフ',
      roleBadge: 'GOロケット団 リーダー',
      title: 'リーダー・クリフの手持ちポケモンと対策・弱点ガイド | Pokémon GO',
      desc: 'Pokémon GOのGOロケット団リーダー「クリフ」の最新手持ち編成、弱点、おすすめ対策パーティと色違いシャドウ・12kmタマゴ報酬の解説。',
      summary:
        'リーダーのクリフは高耐久・高火力のいわ・じめん・かくとうタイプを中心とした編成を使用します。ロケットレーダーで挑戦でき、最初のゲージ技2回に対して必ずシールドを使用します。',
      tacticsParagraph1:
        'クリフのポケモンは通常技の威力が高いため、バトル開始直後の交代で2秒間の硬直を作り、回転の速いゲージ技（グロウパンチ、せいなるつるぎ、ハイドロカノン、ゆきなだれ等）で素早くシールド2枚を剥がす立ち回りが有効です。',
      tacticsParagraph2:
        '2匹目・3匹目のランダム枠に対応できるよう、かくとうタイプ（ルカリオ・テラキオン）、こおりタイプ（マンムー）、みずタイプ（カイオーガ・ラグラージ）をバランスよく編成しましょう。',
      rewardAnalysis:
        'クリフに勝利すると1匹目のシャドウポケモン（色違い確率は約1/64）を捕獲できるほか、タマゴ枠に空きがあれば12kmタマゴ（赤いタマゴ）を入手できます。',
      faqs: [
        {
          question: 'クリフの報酬ポケモンは色違いになりますか？',
          answer:
            'はい、リーダー（クリフ・シエラ・アルロ）から入手できるシャドウポケモンは約1/64の確率で色違いが出現します。',
        },
        {
          question: 'クリフから12kmタマゴを入手する条件は？',
          answer:
            'バトル開始前にタマゴ枠（通常枠またはボーナス枠）とポケモンボックスの両方に空きがある状態でクリフに勝利すると確定で入手できます。',
        },
        {
          question: 'クリフのシールドを効率よく剥がすには？',
          answer:
            '必要エネルギーが35〜40の軽いゲージ技を持つポケモン（ルカリオやラグラージなど）で連打し、硬直時間を維持しながら突破するのがおすすめです。',
        },
      ],
    },
    ru: {
      name: 'Клифф',
      roleBadge: 'Лидер Team GO Rocket',
      title: 'Лидер Клифф: Состав, слабости и лучшие контр-покемоны | Pokémon GO',
      desc: 'Актуальный состав лидера Клиффа в Pokémon GO, уязвимости, лучшие контр-покемоны и советы по получению шайни теневого покемона и 12 км яйца.',
      summary:
        'Лидер Клифф использует мощных каменных, земляных и боевых покемонов. Для боя с ним нужен стандартный Радар Команды R (из 6 таинственных компонентов), а первые две ваши заряженные атаки он всегда блокирует щитами.',
      tacticsParagraph1:
        'Покемоны Клиффа наносят огромный урон быстрыми атаками, поэтому сразу после начала боя переключайтесь на покемона с дешевыми заряженными атаками (Power-Up Punch, Sacred Sword, Hydro Cannon или Avalanche), чтобы использовать 2-секундную паузу ИИ.',
      tacticsParagraph2:
        'Для надежного покрытия 2-го и 3-го слотов комбинируйте боевого атакующего (Лукарио, Терракион), ледяного (Мамосвайн) и водного/земляного (Кайогр, Свамперт).',
      rewardAnalysis:
        'Победа над Клиффом дает встречу с его первым теневым покемоном (шанс шайни ~1 к 64) и 12 км Странное яйцо при наличии свободного места для яиц.',
      faqs: [
        {
          question: 'Может ли теневой покемон от Клиффа быть шайни (Shiny)?',
          answer:
            'Да, все три лидера Команды R дают шанс около 1 к 64 встретить шайни-версию теневого покемона из их первого слота.',
        },
        {
          question: 'Как получить 12 км яйцо после победы над Клиффом?',
          answer:
            'Убедитесь, что перед началом боя у вас есть свободный слот в хранилище яиц и свободное место в хранилище покемонов.',
        },
        {
          question: 'Почему Клифф блокирует первые две атаки?',
          answer:
            'Лидеры Команды R всегда тратят оба щита на первые две заряженные атаки игрока, поэтому сначала используйте самые дешевые по энергии атаки.',
        },
      ],
    },
  },
  sierra: {
    cs: {
      name: 'Sierra',
      roleBadge: 'Lídryně Team GO Rocket',
      title: 'Lídryně Sierra Sestava, Slabosti & Nejlepší Counters | Pokémon GO',
      desc: 'Aktuální Pokémoni, slabosti a nejlepší counters na lídryni Sierru (Team GO Rocket) v Pokémon GO. Taktika na spálení štítů a získání Shadow odměny.',
      summary:
        'Lídryně Sierra sází na technicky záludné sestavy kombinující zemní, vodní, temné, travní a psychické Pokémony s širokým pokrytím útoků. Stejně jako ostatní lídři vyžaduje Rocket Radar a vždy zablokuje vaše první 2 Charged útoky.',
      tacticsParagraph1:
        'Sierřina sestava je navržena tak, aby trestala jednobarevné týmy – často kombinuje Pokémony s opačnými slabostmi (např. vodní Milotic, travní/ocelový Ferrothorn a temný/duchový Sableye). Nejefektivnější cestou k vítězství je nasadit leadera se spamovacím útokem (Lucario, Melmetal s Double Iron Bash nebo Mamoswine s Powder Snow + Avalanche), který díky 2sekundovéму stun-locku nedovolí Sieře nabít její vlastní Charged útok.',
      tacticsParagraph2:
        'Pokud ve 2. slotu narazíte na Sableye nebo Ferrothorna, mějte připraveného vílího (Mega Gardevoir) nebo ohnivého/bojového (Mega Blaziken, Reshiram) útočníka, který dokáže rychle vyčistit střední fázi zápasu a ušetřit vám štíty na 3. slot.',
      rewardAnalysis:
        'Za poražení Sierry získáte setkání s jejím Shadow Pokémonem z 1. slotu (včetně šance ~1:64 na Shiny Shadow úlovek), 1 000 Stardustu a при volném slotu v inventáři také 12km Strange Egg.',
      faqs: [
        {
          question: 'Jaká je nejlepší strategie na poražení Sierry?',
          answer:
            'Začněte okamžitou výměnou na Pokémona s velmi rychlým nabíjením Charged útoků (např. Lucario, Swampert nebo Mamoswine), abyste spálili její 2 štíty a udrželi ji v dvousekundovém stun-locku po každém útoku.',
        },
        {
          question: 'Které Pokémony Sierra aktuálně používá v 1., 2. a 3. slotu?',
          answer:
            'Kompletní vizuální rozpis všech tří slotů Sierry a doporučených Mega, pokročilých i dostupných (budget) counterů najdete přímo v kartě lídryně Sierry níže.',
        },
        {
          question: 'Vyplatí se farmit Sierru pomocí Rocket Radaru?',
          answer:
            'Ano, pokud cílíte na jejího aktuálního Shadow Pokémona do PvP (Great/Ultra League) nebo PvE raidů, případně pokud hledáte vzácnou Shiny Shadow variantu a 12km Strange Eggs.',
        },
      ],
    },
    en: {
      name: 'Sierra',
      roleBadge: 'Team GO Rocket Leader',
      title: 'Leader Sierra Lineup, Weaknesses & Best Counters | Pokémon GO',
      desc: 'Current Pokémon lineup, weaknesses, and best counters to defeat Team GO Rocket Leader Sierra in Pokémon GO.',
      summary:
        'Team GO Rocket Leader Sierra fields tricky multi-type lineups blending Ground, Water, Dark, Grass, and Psychic Pokémon designed to punish single-type teams. She requires a Rocket Radar and always shields your first two Charged Moves.',
      tacticsParagraph1:
        'Because Sierra mixes defensive typings across Slots 2 and 3 (such as Water-type Milotic, Dark/Ghost Sableye, and Grass/Steel Ferrothorn), rely on rapid energy generation and stun-lock timing rather than slow one-hit nukes. Switching immediately at the start of battle gives you 4 free turns of energy gain.',
      tacticsParagraph2:
        'Pair an Ice or Water shield-breaker (Shadow Mamoswine or Mega Swampert) with a Fighting/Fire corebreaker (Mega Blaziken or Lucario) and a Fairy/Dragon closer to handle every possible combination Sierra can bring.',
      rewardAnalysis:
        'Defeating Sierra grants an encounter with her Slot 1 Shadow Pokémon (with a ~1/64 Shiny Shadow rate), 1,000 Stardust, and a 12km Strange Egg if you have open egg storage.',
      faqs: [
        {
          question: 'What is the best team to beat Leader Sierra?',
          answer:
            'A balanced trio of Shadow Mamoswine (Powder Snow + Avalanche), Mega Blaziken or Lucario (Counter/Force Palm + Blaze Kick/Aura Sphere), and Mega Swampert or Kartana covers every slot in Sierra’s rotation.',
        },
        {
          question: 'Can Sierra drop a Shiny Shadow Pokémon?',
          answer:
            'Yes, Sierra’s first-slot Shadow Pokémon reward has a boosted ~1/64 chance of being Shiny.',
        },
        {
          question: 'How do I stop Sierra’s Pokémon from using Charged Moves?',
          answer:
            'Time your Charged Moves and switches to maximize the 2-second AI stun window—attack for 2–3 Fast Moves after each Charged Move before firing the next one.',
        },
      ],
    },
    ja: {
      name: 'シエラ',
      roleBadge: 'GOロケット団 リーダー',
      title: 'リーダー・シエラの手持ちポケモンと対策・弱点ガイド | Pokémon GO',
      desc: 'Pokémon GOのGOロケット団リーダー「シエラ」の最新手持ち編成、弱点、おすすめ対策パーティと色違いシャドウ報酬の解説。',
      summary:
        'リーダーのシエラは弱点が分散したトリッキーな複合タイプ編成を使用します。ロケットレーダーで挑戦可能で、最初のゲージ技2回に必ずシールドを使用します。',
      tacticsParagraph1:
        'シエラの2匹目・3匹目はミロカロス、ヤミラミ、ナットレイなど弱点が異なるポケモンが選出されるため、交代直後の2秒間の硬直時間を活かして高速でゲージ技を連打する戦術が最も安定します。',
      tacticsParagraph2:
        'こおりタイプ（マンムー）、かくとう・ほのおタイプ（メガバシャーモ・ルカリオ）、みずタイプ（メガラグラージ）を組み合わせることで、どの選出パターンでも安定して突破可能です。',
      rewardAnalysis:
        'シエラ討伐後は1匹目のシャドウポケモン（約1/64で色違い）の捕獲チャンスと、タマゴ枠が空いていれば12kmタマゴを獲得できます。',
      faqs: [
        {
          question: 'シエラ対策で最もおすすめの先発・交代ポケモンは？',
          answer:
            'マンムー（こなゆき＋ゆきなだれ）、メガラグラージ（マッドショット＋ハイドロカノン）、ルカリオ（発勁＋グロウパンチ）など、ゲージ回転が速いアタッカーが最適です。',
        },
        {
          question: 'シエラのシャドウポケモンは色違いが出ますか？',
          answer:
            'はい、シエラ勝利後のゲットチャレンジでは約1/64の確率で色違いシャドウポケモンが出現します。',
        },
        {
          question: 'ヤミラミやナットレイが2匹目に出た場合の対策は？',
          answer:
            'ヤミラミにはフェアリータイプ（サーナイト等）、ナットレイにはほのお・かくとうタイプ（バシャーモやルカリオ）を当てると素早く処理できます。',
        },
      ],
    },
    ru: {
      name: 'Сиерра',
      roleBadge: 'Лидер Team GO Rocket',
      title: 'Лидер Сиерра: Состав, слабости и лучшие контр-покемоны | Pokémon GO',
      desc: 'Актуальный состав лидера Сиерры в Pokémon GO, слабости, лучшие контр-покемоны и тактика боя.',
      summary:
        'Лидер Сиерра использует разнотипные составы (земляные, водные, темные, травяные и психические покемоны), чтобы наказывать однотипные команды игроков. Как и другие лидеры, она блокирует первые две ваши заряженные атаки.',
      tacticsParagraph1:
        'Используйте мгновенное переключение в начале боя для активации 2-секундного стан-лока и берите покемонов с быстрой генерацией энергии (Мамосвайн, Свамперт, Лукарио или Мега Блейзикен).',
      tacticsParagraph2:
        'Комбинация ледяного, огненного/боевого и водного/травяного атакующих позволяет легко закрыть любые варианты 2-го и 3-го слотов Сиерры.',
      rewardAnalysis:
        'За победу над Сиеррой вы получите встречу с ее первым теневым покемоном (шанс шайни ~1/64), 1000 звездной пыли и 12 км яйцо при наличии свободного слота.',
      faqs: [
        {
          question: 'Какая команда лучше всего подходит против Сиерры?',
          answer:
            'Трио из Мамосвайна (Powder Snow + Avalanche), Мега Блейзикена или Лукарио и Мега Свамперта перекрывает все возможные пики Сиерры.',
        },
        {
          question: 'Может ли награда от Сиерры быть шайни?',
          answer:
            'Да, теневой покемон из 1-го слота Сиерры имеет повышенный шанс (~1 к 64) оказаться шайни.',
        },
        {
          question: 'Как не давать покемонам Сиерры использовать заряженные атаки?',
          answer:
            'Делайте по 2–3 быстрые атаки после каждой заряженной атаки или смены покемона, максимально используя 2-секундные паузы ИИ.',
        },
      ],
    },
  },
  arlo: {
    cs: {
      name: 'Arlo',
      roleBadge: 'Lídr Team GO Rocket',
      title: 'Lídr Arlo Sestava, Slabosti & Nejlepší Counters | Pokémon GO',
      desc: 'Aktuální Pokémoni, slabosti a nejlepší counters na lídra Arla (Team GO Rocket) v Pokémon GO. Jak porazit ocelové a psychické sestavy a získat S-Tier Shadow odměnu.',
      summary:
        'Lídr Arlo často přináší ty nejcennější PvE Shadow odměny ze všech tří lídrů (např. Shadow Beldum ➔ Shadow Metagross) a v boji sází na ocelové, psychické, hmyzí a normální Pokémony. Na první 2 Charged útoky vždy použije štít.',
      tacticsParagraph1:
        'Arlova sestava má výraznou společnou slabinu vůči Ohnivým, Temným, Zemním a Bojovým útokům. Proti ocelovým a psychickým Pokémonům v 1. a 2. slotu excelují útočníci jako Mega Blaziken (Fire Spin + Blast Burn / Blaze Kick), Mega Tyranitar nebo Hydreigon (Bite + Brutal Swing) a Primal Groudon (Mud Shot + Precipice Blades).',
      tacticsParagraph2:
        'Ve 3. slotu může Arlo nasadit Scizora (dvojnásobná slabost 2,56× na Oheň), Magnezona (dvojnásobná slabost 2,56× na Zemi) nebo masivního Snorlaxe (slabost na Bojový typ). Proto je ideální mít v týmu kombinaci Ohnivého/Bojového Pokémona (např. Blaziken nebo Reshiram + Terrakion/Lucario) a Zemního Pokémona (Excadrill nebo Groudon).',
      rewardAnalysis:
        'Arlo je v mnoha rotacích hlavním cílem všech PvE hráčů. Pokud má v 1. slotu Pokémona vyvíjejícího se do S-Tier raidového útočníka (jako je Shadow Metagross), vyplatí se věnovat mu každý získaný Rocket Radar.',
      faqs: [
        {
          question: 'Proč je lídr Arlo nejvyhledávanějším lídrem pro PvE hráče?',
          answer:
            'Arlo pravidelně nabízí v 1. slotu elitní Shadow Pokémony (např. Shadow Beldum vyvíjející se na Shadow Metagrosse s Meteor Mash), kteří patří mezi 5 nejsilnějších raidových útočníků v celé hře a mají šanci ~1:64 na Shiny Shadow verzi.',
        },
        {
          question: 'Jak porazit Arlova Scizora, Snorlaxe a Magnezona ve 3. slotu?',
          answer:
            'Scizor má dvojnásobnou slabost na Oheň (2,56×), Magnezone má dvojnásobnou slabost na Zemi (2,56×) a Snorlax je citlivý na Bojové útoky. Univerzální volbou je Mega Blaziken (Oheň + Boj) doplněný o Groudon/Excadrill.',
        },
        {
          question: 'Jak odstranit útok Frustration ze Shadow Pokémona od Arla?',
          answer:
            'Útok Frustration lze odnaučit pomocí obyčejného Charged TM výhradně během speciálních eventů Team GO Rocket Takeover.',
        },
      ],
    },
    en: {
      name: 'Arlo',
      roleBadge: 'Team GO Rocket Leader',
      title: 'Leader Arlo Lineup, Weaknesses & Best Counters | Pokémon GO',
      desc: 'Current Pokémon lineup, weaknesses, and best counters to defeat Team GO Rocket Leader Arlo in Pokémon GO.',
      summary:
        'Team GO Rocket Leader Arlo frequently rewards the most sought-after PvE Shadow Pokémon (such as Shadow Beldum ➔ Shadow Metagross) while fielding Steel, Psychic, Flying, and Normal lineups. He requires a Rocket Radar and shields the first two Charged Moves.',
      tacticsParagraph1:
        'Arlo’s lineup shares pronounced vulnerabilities to Fire, Dark, Ground, and Fighting attacks. Fast-charging attackers like Mega Blaziken (Fire Spin + Blaze Kick / Blast Burn), Hydreigon (Bite + Brutal Swing), and Primal Groudon or Excadrill shred his opener while burning both shields.',
      tacticsParagraph2:
        'In Slot 3, Arlo can bring Scizor (double weak 2.56x to Fire), Magnezone (double weak 2.56x to Ground), or tanky Snorlax (weak to Fighting). A core of Mega Blaziken (covering both Fire and Fighting) plus a Ground attacker like Groudon or Excadrill handles every endgame scenario effortlessly.',
      rewardAnalysis:
        'Whenever Arlo’s Slot 1 reward evolves into an S-Tier raid attacker, prioritize spending all of your Rocket Radars on Arlo to hunt high-IV and Shiny Shadow (~1/64 rate) specimens.',
      faqs: [
        {
          question: 'What are the best counters against Leader Arlo?',
          answer:
            'Mega Blaziken, Reshiram, Hydreigon, Primal Groudon, Excadrill, and Terrakion/Lucario provide optimal coverage against Arlo’s Steel, Psychic, and Normal-type lineup.',
        },
        {
          question: 'How do I beat Arlo’s Scizor, Snorlax, or Magnezone in Slot 3?',
          answer:
            'Exploit Scizor’s 2.56x double weakness to Fire, Magnezone’s 2.56x double weakness to Ground, and Snorlax’s weakness to Fighting—Mega Blaziken + Excadrill/Groudon covers all three.',
        },
        {
          question: 'When can I remove Frustration from Arlo’s Shadow Pokémon?',
          answer:
            'You can use a regular Charged TM to remove the Charged Move Frustration during any Team GO Rocket Takeover event.',
        },
      ],
    },
    ja: {
      name: 'アルロ',
      roleBadge: 'GOロケット団 リーダー',
      title: 'リーダー・アルロの手持ちポケモンと対策・弱点ガイド | Pokémon GO',
      desc: 'Pokémon GOのGOロケット団リーダー「アルロ」の最新手持ち編成、弱点、おすすめ対策パーティとSランクシャドウ報酬の解説。',
      summary:
        'リーダーのアルロは、はがね・エスパー・むし・ノーマルタイプを中心とした編成を使用し、PvEレイドで最強クラスのシャドウポケモン（シャドウダンバル➔メタグロスなど）が報酬として登場することが多い最重要リーダーです。',
      tacticsParagraph1:
        'アルロの編成には「ほのお・あく・じめん・かくとう」タイプが一貫して刺さります。メガバシャーモ（ほのおのうず＋ブレイズキック／ブラストバーン）、サザンドラ（かみつく＋ぶんまわす）、ゲンシグラードンやドリュウズで素早くシールド2枚を削りましょう。',
      tacticsParagraph2:
        '3匹目のハッサム（ほのお2重弱点・2.56倍）、ジバコイル（じめん2重弱点・2.56倍）、カビゴン（かくとう弱点）には、ほのお＆かくとう複合のメガバシャーモとじめんタイプのグラードン／ドリュウズの組み合わせが完璧に対応できます。',
      rewardAnalysis:
        'アルロの1匹目報酬がSランクアタッカーに進化する期間中は、ロケットレーダーをアルロに集中投資して高個体値や色違いシャドウ（確率約1/64）を狙うのが最も効率的です。',
      faqs: [
        {
          question: 'アルロ対策で最もおすすめのポケモンは？',
          answer:
            'ほのお・かくとうタイプを両立できるメガバシャーモ、あくタイプのサザンドラ、じめんタイプのゲンシグラードンやドリュウズが最適です。',
        },
        {
          question: '3匹目のハッサム・カビゴン・ジバコイルの倒し方は？',
          answer:
            'ハッサムにはほのお技（2.56倍）、ジバコイルにはじめん技（2.56倍）、カビゴンにはかくとう技を当てることで簡単に突破できます。',
        },
        {
          question: 'シャドウポケモンの「やつあたり」はいつ消せますか？',
          answer:
            'GOロケット団占拠イベント期間中に「わざマシン スペシャル」を使用することで「やつあたり」を忘れさせることができます。',
        },
      ],
    },
    ru: {
      name: 'Арло',
      roleBadge: 'Лидер Team GO Rocket',
      title: 'Лидер Арло: Состав, слабости и лучшие контр-покемоны | Pokémon GO',
      desc: 'Актуальный состав лидера Арло в Pokémon GO, уязвимости, лучшие контр-покемоны и получение S-Tier теневой награды.',
      summary:
        'Лидер Арло часто предлагает самые ценные PvE-награды среди всех лидеров (например, Теневой Белдум ➔ Метагросс) и использует стальных, психических и нормальных покемонов.',
      tacticsParagraph1:
        'Против стальных и психических покемонов Арло идеально работают огненные, темные, земляные и боевые атаки: Мега Блейзикен, Хайдрейгон (Bite + Brutal Swing), Праймал Граудон и Эскадрилл.',
      tacticsParagraph2:
        'В 3-м слоте Скизор имеет двойную уязвимость к огню (2.56×), Магнезон — двойную уязвимость к земле (2.56×), а Снорлакс уязвим к боевым атакам. Связка Блейзикена и Граудона/Эскадрилла закрывает все три варианта.',
      rewardAnalysis:
        'Когда в наградах Арло находится покемон S-тира для рейдов, тратьте все Радары Команды R именно на него ради высоких IV и шайни-версии (~1/64).',
      faqs: [
        {
          question: 'Какие покемоны лучше всего подходят против Арло?',
          answer:
            'Мега Блейзикен, Реширам, Хайдрейгон, Праймал Граудон, Эскадрилл и Терракион/Лукарио обеспечивают идеальное покрытие.',
        },
        {
          question: 'Как победить Скизора, Снорлакса или Магнезона в 3-м слоте?',
          answer:
            'Используйте двойную слабость Скизора к огню (2.56×), двойную слабость Магнезона к земле (2.56×) и уязвимость Снорлакса к боевым атакам.',
        },
        {
          question: 'Когда можно убрать атаку Frustration у теневого покемона?',
          answer:
            'Атаку Frustration можно заменить обычной Charged TM только во время событий Team GO Rocket Takeover.',
        },
      ],
    },
  },
  grunts: {
    cs: {
      name: 'Řadoví Rakeťáci (Grunts)',
      roleBadge: 'Databáze hlášek & odměn',
      title: 'Team GO Rocket Grunts Hlášky, Typy & Nejlepší Shadow Odměny | Pokémon GO',
      desc: 'Kompletní tabulka hlášek řadových Rakeťáků (Team GO Rocket Grunts) v Pokémon GO: jak poznat typ sestavy před bojem, které Grunty se vyplatí farmit a nejlepší Shadow Pokémoni.',
      summary:
        'Řadoví členové Team GO Rocket (Grunts) obsazují PokéStopy a létají v černých balónech každých 6 hodin (o půlnoci, v 6:00, 12:00 a 18:00; během Takeover eventů ještě častěji). Jejich úvodní hláška před zápasem přesně prozrazuje, jaký typ Pokémonů mají v týmu.',
      tacticsParagraph1:
        'Na rozdíl od lídrů a Giovanniho řadoví Grunti NIKDY nepoužívají ochranné štíty. To znamená, že proti nim nepotřebujete levné baitovací útoky – naopak se vyplatí nasadit Pokémony s nejsilnějšími Fast útoky ve hře (např. Kartana s Razor Leaf, Mega Gardevoir s Charm, Shadow Tyranitar s Bite nebo Shadow Rhyperior s Mud-Slap), kteří dokážou vyčistit první dva sloty čistě přes Fast Move bez zdlouhavých animací Charged útoků.',
      tacticsParagraph2:
        'Vždy se zaměřujte primárně na Grunty, jejichž Shadow odměny se vyvíjejí do S-Tier a A-Tier raidových útočníků: Dračí Grunt (Bagon, Dratini, Gible), Ocelový/Psychický Grunt (Beldum, Ralts), Ledový/Zemní Grunt (Swinub, Drilbur, Rhyhorn), Bojový Grunt (Machop, Timburr) a Temný/Duchový Grunt (Deino, Litwick). Za každého poraženého Grunta získáte 500 Stardustu a 1 Mysterious Component (6 kusů složí Rocket Radar).',
      rewardAnalysis:
        'Po poražení Grunta chytáte ve většině případů jeho Pokémona z 1. slotu, ale u vybraných typů (např. Ohnivý, Vodní, Zemní,Psychický) existuje ~15% šance, že získáte Pokémona z jeho 2. slotu. Během příznivého počasí (Weather Boost) mají chycení Shadow Pokémoni Level 13 a garantované minimální IV 4/4/4.',
      faqs: [
        {
          question: 'Jak poznám, jaké Pokémony má řadový Rakeťák (Grunt)?',
          answer:
            'Každý Grunt pronese před začátkem souboje specifickou větu (taunt), která jednoznačně určuje elementární typ jeho sestavy (např. „Tihle dračí Pokémoni se jen tak nevzdají!“ / „ROAR! ...How’d that sound?“ = Dračí typ).',
        },
        {
          question: 'Jak často přilétá balón Team GO Rocket?',
          answer:
            'Standardně přilétá balón každých 6 hodin ve 4 denních oknech: 00:00–05:59, 06:00–11:59, 12:00–17:59 a 18:00–23:59 (objeví se při prvním otevření hry v daném okně). Během Team GO Rocket Takeover eventů přilétá každé 2 až 3 hodiny.',
        },
        {
          question: 'Které Shadow Pokémony od Gruntů se nejvíce vyplatí nechat jako Shadow?',
          answer:
            'Nikdy neočišťujte (Purify) špičkové PvE útočníky s dobrým útokem: Shadow Bagon (Salamence), Shadow Gible (Garchomp), Shadow Beldum (Metagross), Shadow Swinub (Mamoswine), Shadow Rhyhorn (Rhyperior), Shadow Drilbur (Excadrill), Shadow Timburr (Conkeldurr) a Shadow Ralts (Gardevoir).',
        },
      ],
    },
    en: {
      name: 'Rocket Grunts',
      roleBadge: 'Taunts & Shadow Drops Database',
      title: 'Team GO Rocket Grunts Taunts, Lineups & Best Shadow Drops | Pokémon GO',
      desc: 'Complete guide to Team GO Rocket Grunt opening phrases, elemental types, counters, and S-Tier Shadow Pokémon rewards to farm in Pokémon GO.',
      summary:
        'Team GO Rocket Grunts invade PokéStops and appear in hot-air balloons every 6 hours (00:00, 06:00, 12:00, and 18:00 local time, or more frequently during Takeover events). Every Grunt’s pre-battle taunt reveals the exact elemental type of their lineup.',
      tacticsParagraph1:
        'Unlike Rocket Leaders and Giovanni, Grunts NEVER use Protect Shields. For the fastest farming speed, avoid slow Charged Move animations on the first two slots and instead use high-damage Fast Move sweepers like Kartana (Razor Leaf), Mega Gardevoir (Charm), Shadow Rhyperior (Mud-Slap), or Shadow Chandelure (Incinerate), saving a single Charged Move to one-shot Slot 3.',
      tacticsParagraph2:
        'Prioritize hunting Grunts that drop S-Tier PvE Shadow evolutions: Dragon ("ROAR! ...How’d that sound?" for Bagon, Dratini, Gible), Steel ("You’re no match for my iron will!" for Beldum), Ground/Ice (Swinub, Drilbur, Rhyhorn), Fighting (Timburr, Machop), and Psychic/Fairy (Ralts, Beldum). Each victory grants 500 Stardust and 1 Mysterious Component toward a Rocket Radar.',
      rewardAnalysis:
        'Defeating a Grunt usually rewards their Slot 1 Pokémon, though certain Grunt types carry a ~15% chance to drop their Slot 2 Pokémon instead. Hunting Grunts during active Weather Boost guarantees at least 4/4/4 IVs and catches the Shadow Pokémon at Level 13 instead of Level 8.',
      faqs: [
        {
          question: 'How do I know which Pokémon a Team GO Rocket Grunt will use?',
          answer:
            'Read the Grunt’s dialogue line right before entering the battle screen—each phrase maps to a specific elemental type (for example, "These waters are treacherous!" guarantees a Water-type lineup).',
        },
        {
          question: 'When do Team GO Rocket balloons spawn in Pokémon GO?',
          answer:
            'Rocket balloons spawn four times a day in 6-hour windows starting at 12:00 AM, 6:00 AM, 12:00 PM, and 6:00 PM local time, and every 2–3 hours during Team GO Rocket Takeover events.',
        },
        {
          question: 'Which Grunt Shadow Pokémon are the best to farm for Raids?',
          answer:
            'Top priority Shadow drops include Beldum (Shadow Metagross), Bagon (Shadow Salamence), Gible (Shadow Garchomp), Swinub (Shadow Mamoswine), Rhyhorn (Shadow Rhyperior), Drilbur (Shadow Excadrill), Ralts (Shadow Gardevoir), and Timburr (Shadow Conkeldurr).',
        },
      ],
    },
    ja: {
      name: 'GOロケット団のしたっぱ',
      roleBadge: 'セリフ別タイプ・報酬一覧',
      title: 'GOロケット団したっぱのセリフ別手持ち・対策と厳選すべきシャドウ一覧 | Pokémon GO',
      desc: 'Pokémon GOのGOロケット団したっぱのバトル前セリフ一覧、タイプ判別法、おすすめ対策ポケモン、優先して捕獲すべきSランクシャドウポケモンを解説。',
      summary:
        'GOロケット団のしたっぱはポケストップの侵略や6時間ごとの気球（0時・6時・12時・18時）で出現します。挑戦前のセリフを見ることで、手持ちポケモンのタイプを事前に100%判別することができます。',
      tacticsParagraph1:
        'したっぱはリーダーやサカキと異なりシールドを一切使用しません。そのため、1〜2匹目は通常技の威力が非常に高いポケモン（カミツルギのはっぱカッター、サーナイトのあまえる、ドサイドンのどろかけ等）でゲージ技を使わずに突破し、3匹目に溜まったゲージ技を撃つと最速で周回できます。',
      tacticsParagraph2:
        '特に優先して狙うべきは、進化先がレイド最強（Sランク）になるシャドウポケモンを落とすしたっぱです：ドラゴン（タツベイ・フカマル・ミニリュウ）、はがね・エスパー（ダンバル・ラルトス）、こおり・じめん（ウリムー・モグリュー・サイホーン）、かくとう（ドッコラー・ワンリキー）。',
      rewardAnalysis:
        'したっぱ討伐後は基本的に1匹目のポケモンがゲットチャレンジに登場します（一部のタイプは約15%の確率で2匹目が出現）。天候ブースト時に捕獲するとPL13・最低個体値4/4/4以上が保証されます。',
      faqs: [
        {
          question: 'したっぱの手持ちタイプをバトル前に見分ける方法は？',
          answer:
            'バトル開始前のセリフ（例：「このみずは きけんだ！」＝みずタイプ、「はがねのいしには かてないぞ！」＝はがねタイプ）で手持ちタイプを判別できます。',
        },
        {
          question: 'GOロケット団の気球は何時に出現しますか？',
          answer:
            '通常時は1日4回（0:00〜、6:00〜、12:00〜、18:00〜の6時間枠ごと）に出現し、ロケット団占拠イベント期間中は2〜3時間ごとに出現頻度が上がります。',
        },
        {
          question: '最優先で集めるべきシャドウポケモンはどれですか？',
          answer:
            'ダンバル（メタグロス）、タツベイ（ボーマンダ）、フカマル（ガブリアス）、ウリムー（マンムー）、サイホーン（ドサイドン）、モグリュー（ドリュウズ）、ラルトス（サーナイト）、ドッコラー（ローブシン）が最優先です。',
        },
      ],
    },
    ru: {
      name: 'Пехотинцы Команды R (Grunts)',
      roleBadge: 'База фраз и теневых наград',
      title: 'Фразы пехотинцев Команды R (Grunts), составы и лучшие теневые покемоны | Pokémon GO',
      desc: 'Полная таблица фраз пехотинцев Team GO Rocket в Pokémon GO: как определить тип покемонов до боя, контр-пики и топ-5 теневых покемонов для фарма.',
      summary:
        'Рядовые пехотинцы Команды GO Rocket захватывают Покестопы и прилетают на воздушных шарах каждые 6 часов (в 00:00, 06:00, 12:00 и 18:00). Их приветственная фраза перед боем точно указывает на тип их команды.',
      tacticsParagraph1:
        'В отличие от лидеров и Джованни, пехотинцы НИКОГДА не используют щиты. Для максимально быстрого фарма используйте покемонов с сильнейшими быстрыми атаками (Картана с Razor Leaf, Мега Гардевуар с Charm, Теневой Райпериор с Mud-Slap), снося первые два слота без траты времени на анимацию заряженных атак.',
      tacticsParagraph2:
        'Охотьтесь в первую очередь за пехотинцами, дающими теневых покемонов S-тира для рейдов: Драконий (Bagon, Gible, Dratini), Стальной/Психический (Beldum, Ralts), Ледяной/Земляной (Swinub, Drilbur, Rhyhorn) и Боевой (Timburr, Machop).',
      rewardAnalysis:
        'После победы вы обычно ловите покемона из 1-го слота пехотинца (у некоторых типов есть ~15% шанс встретить покемона из 2-го слота). С погодным бустом теневые покемоны ловятся на 13-м уровне с минимальными IV 4/4/4.',
      faqs: [
        {
          question: 'Как узнать тип покемонов пехотинца Команды R до боя?',
          answer:
            'Посмотрите на фразу пехотинца перед нажатием кнопки боя: каждая реплика соответствует конкретной стихии (например, «Эти воды коварны!» = Водный тип).',
        },
        {
          question: 'Как часто прилетает воздушный шар Команды R?',
          answer:
            'В обычное время шар появляется каждые 6 часов (00:00, 06:00, 12:00, 18:00), а во время событий Team GO Rocket Takeover — каждые 2–3 часа.',
        },
        {
          question: 'Каких теневых покемонов от пехотинцев нужно обязательно оставлять без очищения?',
          answer:
            'Обязательно сохраняйте в теневой форме Beldum (Metagross), Bagon (Salamence), Gible (Garchomp), Swinub (Mamoswine), Rhyhorn (Rhyperior), Drilbur (Excadrill), Ralts (Gardevoir) и Timburr (Conkeldurr).',
        },
      ],
    },
  },
};

export function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const params: { lang: Language; leader: string }[] = [];

  languages.forEach((lang) => {
    ROCKET_LEADERS.forEach((leader) => {
      params.push({ lang, leader });
    });
  });

  return params;
}

interface PageProps {
  params: Promise<{ lang: Language; leader: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrapped = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrapped.lang as Language) ? (unwrapped.lang as Language) : 'cs';
  const leaderSlug = unwrapped.leader.toLowerCase() as RocketLeaderSlug;

  const info = LEADER_INFO[leaderSlug]?.[lang] || LEADER_INFO[leaderSlug]?.en;
  if (!info) {
    return {
      title: 'Leader Not Found | Pokémon GO Event Tracker',
      description: 'Leader not found.',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `https://pogoevents.app/${lang}/rocket/${leaderSlug}`;

  return {
    title: info.title,
    description: info.desc,
    alternates: buildAlternates(lang, `/rocket/${leaderSlug}`, 'https://pogoevents.app/api/agent/rocket.md'),
    openGraph: {
      title: info.title,
      description: info.desc,
      url: canonicalUrl,
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: info.title }],
    },
  };
}

async function getInitialRocketData() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/rocket`, { next: { revalidate: 300 } });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {}
  return undefined;
}

export default async function RocketLeaderPage({ params }: PageProps) {
  const unwrapped = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrapped.lang as Language) ? (unwrapped.lang as Language) : 'cs';
  const leaderSlug = unwrapped.leader.toLowerCase() as RocketLeaderSlug;

  const info = LEADER_INFO[leaderSlug]?.[lang] || LEADER_INFO[leaderSlug]?.en;
  if (!info) {
    notFound();
  }

  const canonicalUrl = `https://pogoevents.app/${lang}/rocket/${leaderSlug}`;
  const initialRocketData = await getInitialRocketData();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: info.title,
        description: info.desc,
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        author: { '@type': 'Organization', name: 'PoGo Events Tracker', url: 'https://pogoevents.app' },
        publisher: {
          '@type': 'Organization',
          name: 'PoGo Events Tracker',
          logo: { '@type': 'ImageObject', url: 'https://pogoevents.app/logo-icon-1080.png' },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: info.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: getBreadcrumbLabel('home', lang), item: `https://pogoevents.app/${lang}` },
          { '@type': 'ListItem', position: 2, name: getBreadcrumbLabel('rocket', lang), item: `https://pogoevents.app/${lang}/rocket` },
          { '@type': 'ListItem', position: 3, name: info.name, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <div className="standalone-rocket-leader-hub" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb & Quick Switcher Bar */}
      <nav
        aria-label="Breadcrumb"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          padding: '12px 16px',
          borderRadius: '14px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          fontSize: '0.84rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <Link href={`/${lang}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
            {getBreadcrumbLabel('home', lang)}
          </Link>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <Link href={`/${lang}/rocket`} style={{ color: 'var(--cyan-accent)', textDecoration: 'none', fontWeight: 700 }}>
            {getBreadcrumbLabel('rocket', lang)}
          </Link>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 750 }}>{info.name}</span>
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {ROCKET_LEADERS.map((slug) => {
            const slugInfo = LEADER_INFO[slug]?.[lang] || LEADER_INFO[slug]?.en;
            const isActive = slug === leaderSlug;
            return (
              <Link
                key={slug}
                href={`/${lang}/rocket/${slug}`}
                style={{
                  padding: '5px 12px',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 750,
                  textDecoration: 'none',
                  background: isActive ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.04)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  border: isActive ? '1px solid rgba(168, 85, 247, 0.5)' : '1px solid var(--border-color)',
                }}
              >
                {slugInfo.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Hero Editorial Card */}
      <article
        className="card"
        style={{
          padding: '22px 24px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '999px',
              backgroundColor: 'rgba(239, 68, 68, 0.14)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#f87171',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            {info.roleBadge}
          </span>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '999px',
              backgroundColor: 'rgba(168, 85, 247, 0.14)',
              border: '1px solid rgba(168, 85, 247, 0.35)',
              color: '#c084fc',
              fontSize: '0.75rem',
              fontWeight: 750,
            }}
          >
            Shadow Bonus +20% ATK
          </span>
        </div>

        <h1 className="tab-seo-title" style={{ margin: '0 0 10px 0', fontSize: '1.55rem', fontWeight: 850 }}>
          {info.title}
        </h1>
        <p style={{ margin: '0 0 16px 0', fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          {info.summary}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '14px',
            alignItems: 'start',
          }}
        >
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.025)',
              border: '1px solid var(--border-color)',
            }}
          >
            <h2 style={{ fontSize: '0.96rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
              {lang === 'cs'
                ? '1. Taktika boje & Stun-Lock mechanika'
                : lang === 'ja'
                  ? '1. バトル戦術＆硬直（スタンロック）の活用'
                  : lang === 'ru'
                    ? '1. Тактика боя и механика стан-лока'
                    : '1. Battle Tactics & AI Stun-Lock Mechanics'}
            </h2>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {info.tacticsParagraph1}
            </p>
          </div>

          <div
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.025)',
              border: '1px solid var(--border-color)',
            }}
          >
            <h2 style={{ fontSize: '0.96rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
              {lang === 'cs'
                ? '2. Složení týmu & pokrytí slotů'
                : lang === 'ja'
                  ? '2. パーティ編成と2〜3匹目の対策'
                  : lang === 'ru'
                    ? '2. Сборка команды и покрытие слотов'
                    : '2. Team Building & Multi-Slot Coverage'}
            </h2>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {info.tacticsParagraph2}
            </p>
          </div>

          <div
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              backgroundColor: 'rgba(168, 85, 247, 0.06)',
              border: '1px solid rgba(168, 85, 247, 0.28)',
            }}
          >
            <h2 style={{ fontSize: '0.96rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
              {lang === 'cs'
                ? '3. Analýza Shadow odměny & IV tipy'
                : lang === 'ja'
                  ? '3. シャドウ報酬の評価と捕獲のコツ'
                  : lang === 'ru'
                    ? '3. Анализ теневой награды и советы по поимке'
                    : '3. Shadow Reward Analysis & Catch Strategy'}
            </h2>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {info.rewardAnalysis}
            </p>
          </div>
        </div>
      </article>

      {/* Interactive Single-Leader Lineup & Counters Card */}
      <RocketGuide
        lang={lang}
        initialRocketData={initialRocketData}
        initialLeader={leaderSlug}
        standaloneLeaderMode={true}
      />

      {/* FAQ Section */}
      <section
        className="card"
        style={{
          padding: '20px 24px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 14px 0' }}>
          {lang === 'cs'
            ? `Často kladené otázky (FAQ) – ${info.name}`
            : lang === 'ja'
              ? `よくある質問 (FAQ) – ${info.name}`
              : lang === 'ru'
                ? `Часто задаваемые вопросы (FAQ) – ${info.name}`
                : `Frequently Asked Questions (FAQ) – ${info.name}`}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {info.faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-color)',
              }}
            >
              <h3 style={{ fontSize: '0.94rem', fontWeight: 750, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
                {faq.question}
              </h3>
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
