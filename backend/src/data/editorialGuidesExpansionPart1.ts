import type { GuideArticle } from './defaultGuidesData';

export const EDITORIAL_GUIDES_PART_1: GuideArticle[] = [
  {
    id: 'pokemon-go-search-strings-master-guide',
    slug: 'pokemon-go-search-strings-master-guide',
    iconName: 'Search',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/479.png',
    featured: true,
    author: 'David Faltus',
    readTime: '9 min',
    updatedAt: '2026-11-20',
    category: {
      cs: 'Pokročilé nástroje & Správa úložiště',
      en: 'Advanced Tools & Storage Management',
      ja: '上級ツール・ボックス整理術',
      ru: 'Инструменты и управление хранилищем',
    },
    title: {
      cs: 'Vyhledávací řetězce (Search Strings) v Pokémon GO: Kompletní příručka pro čištění batohu',
      en: 'Pokémon GO Search Strings Master Guide: Fast Storage Cleanup, PvP IVs & Trash Filters',
      ja: 'Pokémon GO 検索文字列完全ガイド：ボックス整理・PvP個体値・一括博士送り術',
      ru: 'Поисковые строки (Search Strings) в Pokémon GO: полное руководство по очистке хранилища',
    },
    subtitle: {
      cs: 'Ovládněte booleovské operátory (&, ,, !), vytvořte si bezpečný „Trash String“ pro hromadný transfer během Community Day a najděte PvP IV během vteřiny.',
      en: 'Master Boolean operators (&, ,, !), build a safe Trash String for Community Day mass transfers, and isolate PvP IV spreads in seconds.',
      ja: '論理演算子（&・,・!）を使いこなし、コミュニティ・デイ中の安全な一括整理文字列やPvP向け個体値検索をマスターしよう。',
      ru: 'Освойте логические операторы (&, ,, !), создайте безопасный Trash String для массового трансфера и мгновенно находите PvP IV.',
    },
    sections: [
      {
        id: 'boolean-operators-foundation',
        heading: {
          cs: '1. Jak fungují logické operátory v Pokémon GO',
          en: '1. How Boolean Logic Works Inside Pokémon Storage',
          ja: '1. ボックス検索における論理演算子の仕組み',
          ru: '1. Как работают логические операторы в поиске Pokémon GO',
        },
        content: {
          cs: 'Vyhledávací pole v úložišti Pokémonů podporuje plnohodnotnou booleovskou logiku, která dokáže během vteřiny prohledat tisíce chycených Pokémonů bez použití externích aplikací. Základní pravidlo zní: operátor `&` (nebo `|`) znamená „A ZÁROVEŇ“ (obě podmínky musí platit současně), čárka `,` (nebo středník `;` či dvojtečka `:`) znamená „NEBO“ (stačí splnění jedné z podmínek) a vykřičník `!` před výrazem znamená negaci „NE“. Důležité je pořadí vyhodnocování: Pokémon GO vždy nejprve seskupí podmínky oddělené čárkou a teprve poté je spojí přes `&`. To znamená, že zápis `0*,1*,2*&!shiny&!shadow` vybere všechny Pokémony s hodnocením 0 až 2 hvězdy, kteří ZÁROVEŇ nejsou Shiny a nejsou Shadow.',
          en: 'The in-game Pokémon storage search bar runs a full Boolean expression parser that filters thousands of catches instantaneously without third-party overlays. Three core operators control every query: `&` (or `|`) means AND (both conditions must match), `,` (or `;` / `:`) means OR (either condition matches), and `!` placed directly before a keyword means NOT. Operator precedence is critical: Pokémon GO evaluates comma-separated OR groups first, then intersects them with `&`. Consequently, `0*,1*,2*&!shiny&!shadow` safely selects 0–2 star catches while guaranteeing that Shiny and Shadow Pokémon are excluded from the result.',
          ja: 'ポケモンボックスの検索バーは本格的な論理演算に対応しており、外部アプリを使わず数千匹の中から瞬時に目的の個体を抽出できます。基本演算子は3つです：`&`（または`|`）は「かつ（AND）」、`,`（または`;`・`:`）は「または（OR）」、先頭の`!`は「除外（NOT）」を意味します。特に重要なのが優先順位で、カンマ区切りのOR条件が先にまとまり、その後に`&`で結合されます。したがって`0*,1*,2*&!shiny&!shadow`と入力すると、色違いとシャドウを確実に除外した上で星0〜2の個体だけを安全に抽出できます。',
          ru: 'Строка поиска в хранилище Pokémon GO поддерживает полноценную булеву логику, позволяя мгновенно фильтровать тысячи покемонов без сторонних приложений. Три базовых оператора: `&` (или `|`) означает «И» (выполняются оба условия), запятая `,` (или `;` / `:`) означает «ИЛИ», а восклицательный знак `!` перед термином — отрицание «НЕ». Важно помнить приоритет: сначала группируются условия через запятую, затем они объединяются через `&`. Поэтому запрос `0*,1*,2*&!shiny&!shadow` безопасно выберет покемонов 0–2 звёзд, гарантированно исключив всех Shiny и Shadow.',
        },
        tips: {
          cs: [
            'V češtině i angličtině lze klíčová slova kombinovat — pro univerzální sdílení řetězců používejte anglické termíny jako `shiny`, `legendary`, `mythical`, `xxl`, `age0` nebo čísla Pokédexu (`1-151`).',
            'Každý filtr můžete uložit přímo ve hře: po zadání podržte prst na posledním vyhledávání v sekci „Recent“ a přesune se do trvalých „Favorites“, kde ho lze i pojmenovat.',
          ],
          en: [
            'You can save up to 12 favorite search strings directly inside Pokémon GO: tap Search, tap See More, long-press a recent query to pin it to Favorites, then long-press again to rename it.',
            'Combine numeric Pokédex ranges like `1-151` or evolutionary family prefixes (`+eevee`) to isolate an entire evolution line in one tap.',
          ],
          ja: [
            'よく使う検索文字列はゲーム内に最大12件までお気に入り保存可能です。検索履歴を長押しして「お気に入り」に登録し、さらに長押しで分かりやすい名前を付けられます。',
            '進化系統をまとめて表示したい場合は先頭に`+`を付けて`+イーブイ`のように検索すると、全進化先を一括表示できます。',
          ],
          ru: [
            'В игре можно сохранить до 12 избранных фильтров: зажмите недавний запрос в истории поиска, чтобы закрепить его в «Избранном», а затем зажмите снова для переименования.',
            'Префикс `+` перед именем покемона (например, `+eevee`) мгновенно показывает всю его эволюционную ветку.',
          ],
        },
      },
      {
        id: 'safe-trash-string',
        heading: {
          cs: '2. Bezpečný „Trash String“ pro Community Day a Spotlight Hour',
          en: '2. Building a Bulletproof Trash String for Community Day & Spotlight Hour',
          ja: '2. コミュニティ・デイ＆スポットライトアワー用の安全な博士送り文字列',
          ru: '2. Безопасный «Trash String» для Community Day и Spotlight Hour',
        },
        content: {
          cs: 'Během tříhodinového Community Day nebo hodinové Spotlight Hour aktivní trenér chytí 300 až 600 Pokémonů. Ruční kontrola každého kusu přes Appraise by vás připravila o polovinu času eventu. Řešením je univerzální bezpečný Trash String, který ochrání vše cenné (4* Hundo, 3*, Shiny, Shadow, Legendy, Mýtické, Ultra Beasty, Kostýmy, XXL/XXS pro Showcases, Lucky, speciální pozadí i potenciální PvP IV kandidáty): `age0&!4*&!3*&!shiny&!shadow&!legendary&!mythical&!ultra beasts&!costume&!xxl&!xxs&!lucky&!background&!#&2-4attack`. Poslední podmínka `2-4attack` záměrně vynechá Pokémony s útokem 0–1 (0–5 IV), mezi nimiž se skrývají nejlepší PvP kandidáti pro Great a Ultra League.',
          en: 'Active trainers easily catch 300 to 600 Pokémon during a three-hour Community Day or a single Spotlight Hour. Appraising every single catch manually wastes half the event window. A bulletproof Trash String automates cleanup while safeguarding every high-value category (4* Hundos, 3*, Shiny, Shadow, Legendary, Mythical, Ultra Beasts, Costumes, XXL/XXS Showcase contenders, Lucky, Special Backgrounds, tagged Pokémon, and potential PvP spreads): `age0&!4*&!3*&!shiny&!shadow&!legendary&!mythical&!ultra beasts&!costume&!xxl&!xxs&!lucky&!background&!#&2-4attack`. The trailing `2-4attack` clause preserves 0–1 Attack bars so top Great and Ultra League IV spreads stay untouched for post-event review.',
          ja: 'コミュニティ・デイの3時間やスポットライトアワーの1時間で300〜600匹を捕獲する場合、1匹ずつ個体値評価を行うと貴重なイベント時間を大きくロスします。高価値個体（4*、3*、色違い、シャドウ、伝説、幻、ウルトラビースト、衣装、おひろめ用XXL/XXS、キラ、スペシャル背景、タグ付き、PvP候補）をすべて保護する万能整理文字列は `age0&!4*&!3*&!shiny&!shadow&!legendary&!mythical&!ultra beasts&!costume&!xxl&!xxs&!lucky&!background&!#&2-4attack` です。末尾の`2-4attack`により、攻撃個体値が低いスーパー・ハイパーリーグ向け候補を自動的に残せます。',
          ru: 'За три часа Community Day активный игрок ловит 300–600 покемонов, и ручная проверка каждого отнимает слишком много времени. Универсальный безопасный Trash String защищает все ценные категории (4*, 3*, Shiny, Shadow, Легендарные, Мифические, Ультра-звери, костюмы, XXL/XXS для Showcases, Lucky, спецфоны, помеченные тегами и кандидатов для PvP): `age0&!4*&!3*&!shiny&!shadow&!legendary&!mythical&!ultra beasts&!costume&!xxl&!xxs&!lucky&!background&!#&2-4attack`. Условие `2-4attack` специально оставляет нетронутыми покемонов с низкой атакой (0–5 IV) для последующей проверки под Great и Ultra League.',
        },
        pokemon: ['Beldum', 'Larvitar', 'Gible', 'Dratini'],
      },
      {
        id: 'pvp-and-trade-strings',
        heading: {
          cs: '3. Filtry pro PvP IV (Great/Ultra League) a 100km Distance Trading',
          en: '3. Dedicated Queries for PvP IV Hunting & 100km Distance Trading',
          ja: '3. PvP厳選（スーパー・ハイパーリーグ）と100km遠距離交換用フィルター',
          ru: '3. Фильтры для поиска PvP IV и обменов на 100+ км ради XL конфет',
        },
        content: {
          cs: 'Po vyčištění běžných úlovků použijte specializované řetězce pro hledání pokladů. Pro Great a Ultra League zadejte `0-1attack&3-4defense&3-4hp&!4*`, což okamžitě zobrazí jedince s nízkým útočným IV a vysokou obranou i výdrží (typicky Rank 1–100 stat product). Naopak před hromadným vyměňováním s přáteli pro garantovaný Candy XL (vzdálenost chycení nad 100 km) zadejte `distance100-&!favorite&!legendary&!shiny&!traded` — filtr zobrazí výhradně dosud nevyměněné Pokémony chycené více než 100 km od vaší aktuální polohy (včetně těch vylíhnutých ze 7km vajec ze zahraničních dárků!).',
          en: 'Once bulk catches are cleared, run targeted queries to surface hidden gems. For Great and Ultra League stat-product leaders, enter `0-1attack&3-4defense&3-4hp&!4*`, instantly isolating low-Attack, high-bulk spreads (typically Rank 1–100). Before a mass trading session for guaranteed Candy XL (100+ km catch distance), run `distance100-&!favorite&!legendary&!shiny&!traded` to surface only eligible, untraded Pokémon caught over 100 km from your current location—including Pokémon hatched from 7 km Friendship Eggs received from international gifts.',
          ja: '不要個体を整理した後は、目的別の厳選フィルターを活用しましょう。スーパー・ハイパーリーグ向けの良個体を探す場合は `0-1attack&3-4defense&3-4hp&!4*` を入力すると、攻撃低め・防御HP高めの高順位候補だけが残ります。また、確定アメXLを狙う100km以上遠距離交換には `distance100-&!favorite&!legendary&!shiny&!traded` が最適です。海外フレンドの7kmタマゴから孵化した未交換ポケモンを瞬時にリストアップできます。',
          ru: 'После базовой очистки используйте точечные фильтры для поиска лучших экземпляров. Для лиг Great и Ultra введите `0-1attack&3-4defense&3-4hp&!4*` — игра сразу покажет кандидатов с низкой атакой и высокой выживаемостью (обычно Топ-100 по stat product). А для сессии обменов на гарантированные XL конфеты (дистанция 100+ км) используйте `distance100-&!favorite&!legendary&!shiny&!traded`, который соберёт всех необмененных покемонов с дистанцией от 100 км, включая вылупившихся из зарубежных 7 км яиц.',
        },
        tips: {
          cs: [
            'Operátor `!#` vyloučí každého Pokémona, kterému jste přiřadili jakýkoli vlastní Tag (štítky jako „PvP“, „Mega“, „Trade“). Tím si zajistíte 100% pojistku proti omylu.',
            'Pro kontrolu 2× Transfer Candy Spotlight Hour si Pokémony určené na smazání předem označte štítkem `#Transfer` a v úterý v 18:00 smažte najednou.',
          ],
          en: [
            'The `!#` operator excludes any Pokémon carrying at least one custom Tag—making custom tags your ultimate safety net against accidental transfers.',
            'Tag surplus legendaries and rare spawns with `#2xTransfer` during the month, then mass-transfer them during a 2× Transfer Candy Spotlight Hour.',
          ],
          ja: [
            '`!#`演算子は「何らかのタグが付いているポケモンをすべて除外」します。大切な個体にタグを付けておけば誤送信を100%防げます。',
            '余剰の伝説やレア枠には普段から`#博士送り待ち`タグを付け、博士送りアメ2倍のスポットライトアワーでまとめて送るのが最も効率的です。',
          ],
          ru: [
            'Оператор `!#` исключает любых покемонов, на которых стоит хотя бы один ваш тег — это лучшая страховка от случайного удаления.',
            'Отмечайте лишних легендарных покемонов тегом `#Transfer2x` и массово отправляйте их профессору во время Spotlight Hour с 2× конфетами за трансфер.',
          ],
        },
      },
      {
        id: 'evolution-mega-and-move-filters',
        heading: {
          cs: '4. Skryté příkazy pro Mega levely, útoky (@) a zadarmo evoluce',
          en: '4. Hidden Keywords for Mega Levels, Movesets (@) & Free Trade Evolutions',
          ja: '4. メガレベル・技検索（@）・交換進化0アメの隠しコマンド',
          ru: '4. Скрытые команды для Мега-уровней, атак (@) и бесплатных эволюций',
        },
        content: {
          cs: 'Mnoho pokročilých trenérů stále přehlíží operátor `@` a klíčová slova pro Mega a dynamické úkoly. Zápis `@1fire` najde Pokémony s ohnivým rychlým útokem, `@2dragon,@3dragon` s dračím nabíjecím útokem a `@special` odhalí všechny Legacy a Community Day útoky (včetně Frustration a Return). Pro každodenní zvyšování Mega Levelů bez utrácení Mega Energie zadejte `mega1-2&!mega3` — okamžitě uvidíte všechny Mega Pokémony, kteří ještě nedosáhli maximálního Mega Levelu 3. A pokud potřebujete splnit úkol „Evolve 10 Pokémon“ zdarma za 0 Candy, zadejte `tradeevolve&traded` nebo `evolve&10,13,16,265` pro levné 12-Candy evoluce.',
          en: 'Even veteran trainers frequently overlook the `@` move operator and Mega progression keywords. Typing `@1fire` finds Pokémon with a Fire-type Fast Move, `@2dragon,@3dragon` locates Dragon Charged Moves, and `@special` surfaces every Legacy, Elite TM, and Community Day move (as well as Frustration and Return). To level up your Mega Pokédex daily for free, pin `mega1-2&!mega3`—showing only Megas that have not yet reached Max Level 3. Finally, `tradeevolve&traded` highlights 0-Candy trade evolutions for free XP bursts during 2× Evolution XP Spotlight Hours.',
          ja: '上級者でも見落としがちなのが技検索の`@`とメガレベル検索です。`@1ほのお`でほのおタイプのノーマルアタック、`@special`で限定技・レガシー技（やつあたり含む）を持つ個体を一発で抽出できます。メガレベル上げを毎日無料で行うには`mega1-2&!mega3`をお気に入り登録しておくと、マックスレベル未達のメガ進化個体だけを一覧表示できます。さらに`tradeevolve&traded`を使えば、交換進化でアメ0個で進化できる個体を簡単に集められます。',
          ru: 'Многие опытные игроки упускают оператор `@` и фильтры Мега-уровней. Запрос `@1fire` ищет огненную быструю атаку, `@2dragon,@3dragon` — заряженную атаку драконьего типа, а `@special` показывает все эксклюзивные Legacy/Community Day атаки (включая Frustration). Для ежедневной бесплатной прокачки Мега-уровня закрепите фильтр `mega1-2&!mega3` — он покажет только тех Мега-покемонов, которые ещё не достигли 3-го уровня. А `tradeevolve&traded` найдёт бесплатные эволюции за 0 конфет после обмена.',
        },
        pokemon: ['Mega Rayquaza', 'Machoke', 'Haunter', 'Kadabra'],
      },
    ],
  },
  {
    id: 'pvp-go-battle-league-beginners-to-ace-guide',
    slug: 'pvp-go-battle-league-beginners-to-ace-guide',
    iconName: 'Swords',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/184.png',
    featured: true,
    author: 'David Faltus',
    readTime: '11 min',
    updatedAt: '2026-11-20',
    category: {
      cs: 'PvP & GO Battle League strategie',
      en: 'PvP & GO Battle League Strategy',
      ja: 'PvP・GOバトルリーグ戦略',
      ru: 'PvP и стратегия GO Battle League',
    },
    title: {
      cs: 'GO Battle League (PvP): Kompletní průvodce od základů až po Rank Ace a Veteran',
      en: 'GO Battle League (PvP) Masterclass: From Beginner Fundamentals to Ace & Veteran',
      ja: 'GOバトルリーグ（PvP）完全攻略：初心者からエース・ベテラン到達までの必須技術',
      ru: 'GO Battle League (PvP): полное руководство от новичка до рангов Ace и Veteran',
    },
    subtitle: {
      cs: 'Pochopte počítání tahů (Fast Move Timing), CMP Tie, stavbu týmů ABB vs. ABC, správu štítů a proč 0/15/15 poráží v Great League 100% IV.',
      en: 'Master Fast Move timing, CMP ties, ABB vs. ABC team composition, shield management, and why 0/15/15 beats 100% IV in Great & Ultra League.',
      ja: '技の差し込み（ターン管理）、CMP判定、ABB/ABCパーティ構築、シールド管理、なぜ低攻撃個体値が強いのかを徹底解説。',
      ru: 'Разберите тайминг быстрых атак, CMP Tie, схемы команд ABB и ABC, управление щитами и математику PvP IV в лигах до 1500 и 2500 CP.',
    },
    sections: [
      {
        id: 'pvp-iv-stat-product-explained',
        heading: {
          cs: '1. Matematika PvP IV: Proč v Great a Ultra League nechcete 15 Attack',
          en: '1. PvP IV Math: Why Low Attack Dominates CP-Capped Leagues',
          ja: '1. PvP個体値の数学：なぜスーパー・ハイパーリーグでは攻撃0が強いのか',
          ru: '1. Математика PvP IV: почему в лигах с лимитом CP нужна низкая атака',
        },
        content: {
          cs: 'Vzorec pro výpočet CP v Pokémon GO váží statistiku Útoku (Attack) dvojnásobně oproti Obraně (Defense) a Výdrži (HP): `CP ∝ Attack × √Defense × √Stamina`. V ligách se stropem 1500 CP (Great League) nebo 2500 CP (Ultra League) tedy vysoký útočný IV „spálí“ rozpočet CP mnohem rychleji, takže Pokémon dosáhne stropu třeba na Levelu 20,5 místo Levelu 22. Pokémon s IV 0/15/14 se tak do limitu 1500 CP vejde na vyšším levelu, má o 6 až 12 % vyšší celkový součin statistik (Stat Product) a přežije v souboji o jeden až dva nabíjecí útoky navíc. Výjimkou jsou pouze Pokémoni, kteří pod stropem 1500/2500 CP dosahují až Levelu 50 (např. Umbreon a Talonflame v Ultra League nebo Lickitung/Wobbuffet v Great League) — u nich chcete 15/15/15 nebo blízko 100 % IV.',
          en: 'Pokémon GO’s CP formula weights Attack linearly while taking the square root of Defense and Stamina (`CP ∝ Attack × √Defense × √Stamina`). Inside CP-capped formats like Great League (1500 CP) and Ultra League (2500 CP), a 15 Attack IV inflates CP rapidly, forcing your Pokémon to hit the ceiling at a lower level. Conversely, a 0/15/14 spread fits several additional power-ups beneath 1500 CP, delivering 6–12% higher total Stat Product—often surviving one extra Charged Move to flip close matchups. The sole exception is Pokémon that max out near or below the league cap at Level 50 (such as Umbreon or Talonflame in Ultra League), where 15/15/15 Hundos remain optimal.',
          ja: 'Pokémon GOのCP計算式では、攻撃値が防御・HPの平方根に対して重く係数付けされています（`CP ∝ 攻撃 × √防御 × √HP`）。そのためCP1500・2500の上限があるリーグでは、攻撃個体値が高いと低いPLで上限に達してしまいます。逆に攻撃0・防御15・HP14のような個体はより高いポケモンレベルまで強化でき、総ステータス積（SCP）が6〜12%向上し、ゲージ技を1発多く耐えて勝敗を覆すことができます。例外はPL50で上限付近に届くブラッキー（ハイパー）やファイアローなどで、これらは100%個体値が理想です。',
          ru: 'Формула CP в Pokémon GO даёт атаке больший вес по сравнению с защитой и здоровьем (`CP ∝ Attack × √Defense × √Stamina`). В лигах с ограничением 1500 CP и 2500 CP высокий IV атаки слишком быстро упирается в потолок CP на низком уровне. Покемон с IV вроде 0/15/14 помещается в лимит на более высоком уровне, получая на 6–12% больше общего показателя Stat Product и переживая на одну заряженную атаку больше. Исключение составляют лишь покемоны, достигающие потолка лиги только на 50-м уровне (например, Umbreon или Talonflame в Ultra League) — для них идеален 15/15/15.',
        },
        pokemon: ['Azumarill', 'Clodsire', 'Feraligatr', 'Annihilape'],
      },
      {
        id: 'turns-fast-move-timing',
        heading: {
          cs: '2. Systém tahů (0,5 s) a správné načasování nabíjecích útoků (Optimal Timing)',
          en: '2. The 0.5-Second Turn System & Optimal Charged Move Timing',
          ja: '2. 0.5秒ターン制と最適なゲージ技発動タイミング（差し込み防止）',
          ru: '2. Система ходов по 0,5 сек и оптимальный тайминг заряженных атак',
        },
        content: {
          cs: 'Každý PvP zápas v Pokémon GO běží v pevných krocích zvaných tahy (Turns), přičemž 1 tah = 0,5 sekundy. Rychlé útoky trvají 1 tah (Dragon Breath, Lick), 2 tahy (Mud Shot, Shadow Claw, Counter), 3 tahy (Snarl, Rollout), 4 tahy (Confusion, Volt Switch) nebo 5 tahů (Incinerate). Nejdůležitější technika pro skok z 1800 na 2300+ ELO je tzv. Optimal Move Timing: pokud máte 2tahový rychlý útok a soupeř má 3tahový (nebo 4tahový), nikdy neklepejte na Charged Move ve stejný tah, kdy soupeř začíná nový dlouhý útok — jinak mu zdarma darujete 2 až 3 tahy energie navíc! Místo toho zmáčkněte Charged Move na konci soupeřovy animace (např. po 1, 4 nebo 7 vašich 2tahových útocích proti 3tahovému soupeři).',
          en: 'Every PvP match runs on a strict 0.5-second tick grid called Turns. Fast Moves last between 1 turn (Dragon Breath, Lick), 2 turns (Mud Shot, Shadow Claw, Counter), 3 turns (Snarl, Rollout), 4 turns (Volt Switch, Confusion), and 5 turns (Incinerate). Mastering Optimal Charged Move Timing is the single fastest leap from 1800 to 2300+ ELO: whenever your Fast Move is shorter than your opponent’s, avoid throwing your Charged Move on a turn where their longer Fast Move finishes cleanly—otherwise you hand them 2 to 4 turns of free energy. Instead, throw 1 turn before their Fast Move concludes (e.g., throw after 1, 4, or 7 two-turn moves against a three-turn opponent).',
          ja: 'PvPはすべて1ターン＝0.5秒の固定クロックで進行します。通常技は1ターン（りゅうのいぶき等）から5ターン（やきつくす）まで存在します。レート1800から2300以上に伸びる最大の鍵が「最適なゲージ技タイミング（差し込み防止）」です。自分の通常技が相手より短い場合、相手の長ターン技がちょうど終わるタイミングでゲージ技を撃つと、相手に2〜4ターン分の無料エネルギーを与えてしまいます。相手の技の終了1ターン前に合わせる（例：相手の3ターン技に対し2ターン技を1・4・7回撃って発動）だけで勝率が劇的に上がります。',
          ru: 'Каждый бой в PvP идёт по сетке ходов (Turns), где 1 ход = 0,5 секунды. Быстрые атаки длятся от 1 хода (Dragon Breath) до 5 ходов (Incinerate). Главный навык для роста с 1800 до 2300+ ELO — оптимальный тайминг заряженной атаки (Optimal Move Timing): если ваша быстрая атака короче атаки соперника, не нажимайте заряженную атаку в момент завершения его длинной анимации, иначе подарите ему 2–4 бесплатных хода энергии. Нажимайте за 1 ход до окончания его анимации (например, после 1, 4 или 7 двухходовых атак против трёхходовой).',
        },
        tips: {
          cs: [
            'Při CMP Tie (oba hráči zmáčknou Charged Move ve stejný tah) jde vždy první ten Pokémon, který má vyšší reálnou hodnotu Útoku (Attack stat, nikoli jen Attack IV!).',
            'Když soupeři zbývá 10 % HP, neplýtvejte nabíjecím útokem — doražte ho rychlými útoky („Farm Down“), abyste do dalšího soupeřova Pokémona vstoupili s nabitou energií.',
          ],
          en: [
            'On a Charged Move Priority (CMP) tie—when both trainers tap a Charged Move on the same turn—the Pokémon with the higher actual Attack stat always fires first.',
            'Whenever an opponent is low on HP and cannot reach another Charged Move, farm them down with Fast Moves so you enter the next matchup loaded with energy.',
          ],
          ja: [
            '同ターンに双方がゲージ技を撃った場合（CMP同時発動）、攻撃個体値ではなく「実際の攻撃実数値」が高いポケモンが必ず先攻します。',
            '相手のHPが残りわずかな時はゲージ技を温存し、通常技だけで倒し切る（起点作り）ことで次の相手に対して圧倒的優位に立てます。',
          ],
          ru: [
            'При одновременном нажатии заряженной атаки (CMP Tie) первым всегда бьёт покемон с более высоким фактическим параметром атаки (Attack stat).',
            'Если у соперника мало HP, добивайте его быстрыми атаками («Farm Down»), чтобы накопить энергию на следующего покемона противника.',
          ],
        },
      },
      {
        id: 'team-building-abb-vs-abc',
        heading: {
          cs: '3. Architektura týmů: Vyvážený ABC vs. návnadový ABB styl',
          en: '3. Team Building Frameworks: Balanced ABC vs. Bait-and-Sweep ABB',
          ja: '3. パーティ構築理論：バランス型ABCとギミック型ABBの違い',
          ru: '3. Построение команд: сбалансированная ABC против тактики ABB',
        },
        content: {
          cs: 'Úspěšní hráči nestaví 3 náhodné „top rank“ Pokémony, ale jasný herní plán. V klasickém **ABC týmu** (např. Voda + Oheň + Tráva nebo Kámen + Země + Ocel) pokrývá každý člen slabosti druhého, přičemž druhý Pokémon plní roli tzv. *Safe Swapu* (má minimum tvrdých proher a nutí soupeře buď spálit štít, nebo odevzdat výhodu přepínání). V agresivním **ABB týmu** máte vpředu Pokémona A, který drtí tvrdé countery na dvojici B1 a B2 v zadu (např. Bojový v čele + dva Temní/Duchoví vzadu). Pokud soupeř neprohrává lead, okamžitě přepnete na B1 jako návnadu — vytáhnete tak soupeřova jediného countera, necháte ho B1 porazit, doražením přes A získáte energii a druhý B2 pak zbytek soupeřova týmu bez odporu smete.',
          en: 'Top-ranked trainers never throw three random high-ranking Pokémon together; they build around a win condition. A classic **ABC balanced core** pairs three complementary typings (such as Water + Fire + Grass) alongside a flexible *Safe Swap* with few hard losses that can flip switch advantage or claim a shield. An **ABB bait-and-sweep team** puts a strong counter-killer (A) in the lead protecting two Pokémon in the back (B1 and B2) that share a weakness. Whenever the lead isn’t dominant, you immediately swap into B1 to bait out the opponent’s sole answer, farm it down with A, and sweep the endgame uncontested with B2.',
          ja: '上位トレーナーは単に順位の高い3匹を並べるのではなく、明確な勝ち筋で構築します。基本となる**ABC構築**（みず・ほのお・くさ等）は相互補完を重視し、出し負け時に引き先（Safe Swap）でシールドか対面を取り返します。一方**ABB構築**は、裏の2匹（B1・B2）に共通する弱点を先発Aで完封する戦略です。出し負けや互角の対面でB1に即引きして相手の唯一の対策枠を釣り出し、Aで起点にして倒した後、残ったB2で相手の残りを一掃します。',
          ru: 'Сильные игроки не ставят просто трёх случайных топ-покемонов — они строят команду вокруг плана победы. Классическая схема **ABC** (например, Вода + Огонь + Трава) закрывает слабости друг друга и опирается на надёжного *Safe Swap*. Тактика **ABB** строится вокруг двух покемонов со схожей уязвимостью в тылу (B1 и B2) и лидера A, который уничтожает их главного контр-пика. Вы выпускаете B1 как приманку, выманиваете единственный ответ соперника, добиваете его лидером A, после чего второй B2 беспрепятственно закрывает бой.',
        },
        pokemon: ['Lanturn', 'Skarmory', 'Sableye', 'Talonflame'],
      },
      {
        id: 'stardust-and-rank-20-rewards',
        heading: {
          cs: '4. Jak z GO Battle League vytěžit miliony Stardustu i jako příležitostný hráč',
          en: '4. Farming Millions of Stardust, Rare Candy & Legendaries Every Season',
          ja: '4. カジュアル勢でも毎シーズン数百万のほしのすな・ふしぎなアメを稼ぐ方法',
          ru: '4. Как фармить миллионы звёздной пыли, Rare Candy и легенд каждый сезон',
        },
        content: {
          cs: 'I když nemíříte na žebříček Legend, dosažení Ranku 20 je jednou z nejvýnosnějších aktivit v celém Pokémon GO. Na Ranku 20 stačí celkový počet výher (nepotřebujete žádné ELO skóre) a okamžitě se vám odemkne garantovaný Elite Charged TM na konci sezóny, šance na setkání s aktuálním 5★ Legendárním Raid Bossem za 3 výhry v sadě (který nikdy nemůže utéct!) a přes 100 000 Stardustu ze sezónní odměny (150 000 se Star Piece). Během týdnů s Master League a GO Battle Weekendy navíc hra násobí odměnu Stardustu za výhry ×4 — s aktivním Star Piece si za jedinou neděli můžete odnést přes 250 000 Stardustu.',
          en: 'Even if you never push for Legend, reaching Rank 20 each season is one of the highest-return investments in Pokémon GO. Rank 20 requires cumulative wins rather than ELO rating and unlocks a guaranteed end-of-season Elite Charged TM, encounters with the active 5-Star Legendary Raid Boss on your 3rd set win (which can never flee!), and over 100,000 end-of-season Stardust (150,000 with a Star Piece). During Master League rotations and GO Battle Weekends, win Stardust is multiplied 4×—letting you farm 250,000+ Stardust in a single weekend.',
          ja: 'レジェンド帯を目指さないプレイヤーでも、毎シーズン「ランク20」に到達する価値は絶大です。ランク20は累計勝利数のみで到達でき、シーズン終了時の「すごいわざマシンスペシャル」、セット3勝目での現行伝説レイドボス出現（絶対に逃げない！）、そしてほしのすな10万以上（ほしのかけらで15万）が確定します。さらにマスターリーグ週やGOバトルウィークエンドの勝利報酬4倍期間を組み合わせれば、週末だけで25万以上のほしのすなを稼げます。',
          ru: 'Даже если вы не стремитесь к рангу Legend, достижение 20-го ранга — один из самых выгодных источников ресурсов в игре. Для 20-го ранга достаточно накопить победы (рейтинг ELO не требуется), что сразу открывает гарантированный Elite Charged TM в конце сезона, встречи с текущим 5★ легендарным рейд-боссом за 3 победы в сете (он никогда не сбегает!) и 100 000+ звёздной пыли (150 000 со Star Piece). А во время недель Master League и GO Battle Weekends награда пыли умножается в 4 раза.',
        },
      },
    ],
  },
  {
    id: 'pokemon-go-shadow-vs-purified-guide',
    slug: 'pokemon-go-shadow-vs-purified-guide',
    iconName: 'Flame',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
    featured: true,
    author: 'David Faltus',
    readTime: '8 min',
    updatedAt: '2026-11-20',
    category: {
      cs: 'Bojové mechaniky & Team GO Rocket',
      en: 'Combat Mechanics & Team GO Rocket',
      ja: 'バトル仕様・シャドウ育成論',
      ru: 'Боевая механика и Теневые покемоны',
    },
    title: {
      cs: 'Shadow vs. Purified Pokémon: Matematika +20 % DPS a kdy se skutečně vyplatí purifikovat',
      en: 'Shadow vs. Purified Pokémon: The +20% Attack Math & Exact Cases When Purifying Wins',
      ja: 'シャドウ vs リトレーン徹底比較：攻撃+20%の計算式とリトレーンすべき例外',
      ru: 'Shadow против Purified покемонов: математика +20% урона и когда очищение действительно выгодно',
    },
    subtitle: {
      cs: 'Proč 0% Shadow Mewtwo překonává 100% běžného Mewtwo v raidech, kolik stojí vylepšení a u kterých 5 Pokémonů je Purified varianta objektivně lepší.',
      en: 'Why a 0% Shadow Mewtwo out-DPSes a 100% regular Mewtwo in raids, the exact power-up cost trade-off, and the rare Pokémon that actually want to be Purified.',
      ja: '個体値0%のシャドウミュウツーが100%通常個体をレイド火力で上回る理由と、例外的にリトレーンが有利になるポケモン一覧。',
      ru: 'Почему 0% Shadow Mewtwo наносит больше DPS, чем 100% обычный Mewtwo в рейдах, и для каких редких покемонов Purified форма объективно сильнее.',
    },
    sections: [
      {
        id: 'shadow-multiplier-math',
        heading: {
          cs: '1. Proč 0/0/0 Shadow porazí 15/15/15 normálního Pokémona v raidech',
          en: '1. Why a 0/0/0 Shadow Beats a 15/15/15 Hundo in PvE Raids',
          ja: '1. レイドで0/0/0シャドウが100%通常個体を上回る数学的理由',
          ru: '1. Почему 0/0/0 Shadow сильнее обычного 15/15/15 в рейдах',
        },
        content: {
          cs: 'Shadow bonus v Pokémon GO přidává násobitel **×1,20 (+20 %) k reálnému poškození každého útoku** výměnou za **×0,833 (-16,7 %) k efektivní obraně** (tj. přijímá o 20 % více poškození). Rozdíl oproti IV je zásadní: základní útok (Base Attack) legendárního Pokémona jako Mewtwo je 300. Perfektní 15 Attack IV přidá jen 15 bodů (celkem 315, tedy +5 %). Naproti tomu 0 Attack IV Shadow Mewtwo násobí celých 300 koeficientem 1,20 — má tedy efektivní útok **360**! Protože v raidech bojujete především proti časomíře (300 sekund u 5★ raidů), je rychlost udělování poškození (DPS) mnohem důležitější než výdrž jednotlivého kusu. 0% Shadow Mewtwo tak porazí 100% běžného Mewtwo zhruba o 14 % v DPS.',
          en: 'In Pokémon GO, the Shadow bonus applies a flat **1.20× (+20%) Attack damage multiplier** in exchange for **0.833× effective Defense** (taking 20% more damage). Compare that to Individual Values (IVs): Mewtwo’s base Attack is 300, so a 15 Attack IV adds only +15 (315 total, a +5% boost). A 0/0/0 Shadow Mewtwo multiplies its entire 300 base Attack by 1.20 for an effective **360 Attack**! Because Raid Battles are fundamentally a race against the 300-second clock, Damage Per Second (DPS) outweighs single-Pokémon survivability—meaning even a 0% Shadow Mewtwo outperforms a 100% regular Mewtwo in raids by roughly 14%.',
          ja: 'シャドウボーナスは防御が約0.833倍（被ダメ+20%）になる代わりに、すべての技の攻撃ダメージを**1.20倍（+20%）**にします。種族値と個体値を比べると差は歴然です。ミュウツーの基礎攻撃力は300なので、攻撃個体値15を加えても315（約+5%）に過ぎません。しかし攻撃個体値0のシャドウミュウツーは基礎値300全体に1.2倍がかかるため、実質攻撃力は**360**に達します。レイドバトルは制限時間との戦いであるため、0%シャドウでも100%通常個体より約14%高いDPSを叩き出します。',
          ru: 'Теневой бонус даёт **×1,20 (+20%) к урону всех атак** в обмен на **×0,833 к эффективной защите** (покемон получает на 20% больше урона). Сравните это с IV: базовая атака Mewtwo равна 300, поэтому 15 IV добавляют лишь +15 (итого 315, всего +5%). А 0/0/0 Shadow Mewtwo умножает всю базу 300 на 1,20 и получает эффективную атаку **360**! Поскольку рейды — это гонка со временем, DPS важнее выживаемости одного покемона, и даже 0% Shadow бьёт сильнее 100% обычного на ~14%.',
        },
        pokemon: ['Mewtwo', 'Groudon', 'Kyogre', 'Mamoswine', 'Metagross'],
      },
      {
        id: 'power-up-cost-comparison',
        heading: {
          cs: '2. Porovnání nákladů Stardustu a Candy XL (Shadow vs. Normal vs. Purified)',
          en: '2. Resource Economics: Stardust & Candy XL Cost Breakdown',
          ja: '2. 育成コスト比較：ほしのすな・アメXLの必要数',
          ru: '2. Экономика прокачки: сравнение затрат пыли и XL конфет',
        },
        content: {
          cs: 'Vyšší síla Shadow Pokémonů má svou cenu: vylepšení Shadow Pokémona stojí o **20 % více Stardustu a Candy** (včetně 360 Candy XL na Level 50 místo 296 u normálního Pokémona). Naopak Purified Pokémon okamžitě vyskočí na Level 25, získá +2 ke všem třem IV (např. 13/13/13 → 15/15/15 Hundo) a má **10% slevu na Stardust a Candy** (jen 272 Candy XL na Level 50). Strategický tip: pro 95 % raidů bohatě stačí vylepšit silné Shadow útočníky na **Level 35 až Level 40**, kde dosahují 92 % svého maximálního potenciálu bez nutnosti utrácet 360 Candy XL.',
          en: 'Shadow dominance carries a resource premium: powering up a Shadow Pokémon costs **20% more Stardust and Candy**, including 360 Candy XL to reach Level 50 (versus 296 for standard Pokémon). Purifying immediately jumps the Pokémon to Level 25, adds +2 to every IV stat (turning 13/13/13 into a 15/15/15 Hundo), and grants a **10% Stardust and Candy discount** (only 272 Candy XL to Level 50). Smart resource management tip: bringing top Shadow raid attackers to **Level 35–40** captures over 92% of their raid output without burning 360 Candy XL.',
          ja: 'シャドウの高火力にはコストが伴います。強化に必要なほしのすな・アメは通常の**1.2倍**（PL50までアメXLが360個、通常は296個）かかります。一方リトレーンすると即座にPL25になり、各個体値+2（13/13/13が100%に変化）、強化コストが10%割引（アメXLは272個）されます。節約のコツとして、優秀なシャドウアタッカーはまず**PL35〜40**で止めると、アメXLを消費せずに最大火力の約92%を引き出せます。',
          ru: 'Сила Теневых покемонов требует повышенных затрат: прокачка стоит на **20% больше пыли и конфет** (360 XL конфет до 50-го уровня вместо 296). Очищение (Purify) мгновенно поднимает покемона до 25-го уровня, добавляет +2 ко всем IV (13/13/13 становится 100%) и даёт **скидку 10% на пыль и конфеты** (272 XL до 50 уровня). Практический совет: для большинства рейдов достаточно прокачать сильных Shadow до **35–40 уровня**, получая 92% максимального DPS без траты XL конфет.',
        },
      },
      {
        id: 'when-to-purify',
        heading: {
          cs: '3. Kdy SE VYPLATÍ purifikovat (5 konkrétních případů)',
          en: '3. The 5 Exact Cases When Purifying Is Actually the Smart Play',
          ja: '3. リトレーンが正解になる5つの明確なケース',
          ru: '3. Пять конкретных случаев, когда очищение (Purify) действительно выгодно',
        },
        content: {
          cs: 'Pravidlo „nikdy nepurifikuj“ má několik jasných, matematicky podložených výjimek:\n1. **Mega Evoluce:** Shadow Pokémon nemůže podstoupit Mega Evoluci! Pokud máte 13/13/13 Shadow Tyranitara, Salamence, Gardevoir nebo Garchompa a chybí vám kvalitní Mega (zatímco běžných Shadow kusů máte dost), purifikace na 100% IV Mega má velký smysl.\n2. **PvP specialisté vyžadující útok Return:** Sableye a Wobbuffet v Great League jsou díky normálnímu útoku Return (který získá pouze Purified Pokémon) dramaticky silnější než jejich Shadow verze.\n3. **Obránci a PvP tanky:** Pokémoni, jejichž síla stojí na obrovské výdrži (např. Umbreon, Bastiodon, Cresselia), ze ztráty -16,7 % obrany trpí.\n4. **Plnění medaile Purifier & Level úkolů:** Levné 1 000-Stardust purifikace (Zubat, Starly, Bidoof, Weedle, Magikarp) si vždy schovávejte na speciální výzkumy a Level 45/70+ požadavky.\n5. **Sběratelský Hundo Dex u slabých druhů:** U Pokémonů bez PvE i PvP využití (např. Shadow Rattata 13/14/13) vám Shadow bonus k ničemu není.',
          en: 'The golden rule “never purify” has five mathematically justified exceptions:\n1. **Mega Evolutions:** Shadow Pokémon cannot Mega Evolve. If you own a 13/13/13 Shadow Gardevoir, Tyranitar, or Salamence and lack a high-IV Mega candidate while holding spare Shadows, purifying for a 4* Mega is defensible.\n2. **PvP Return Users:** Sableye and Wobbuffet in Great League rely heavily on the Purified-exclusive Charged Move Return for neutral coverage.\n3. **Pure Bulk Tanks:** High-Defense stall Pokémon such as Bastiodon, Cresselia, and Umbreon lose more from the -16.7% Defense drop than they gain in Attack.\n4. **1,000-Stardust Purifications:** Save cheap 1,000-Stardust shadows (Zubat, Weedle, Starly, Bidoof, Poochyena) specifically for Timed Research and Purifier medal milestones.\n5. **Non-Meta Dex Fillers:** If a species has zero PvE or PvP relevance, purifying a 13/13/13+ into a Hundo Dex entry carries zero opportunity cost.',
          ja: '「シャドウは絶対リトレーン禁止」にも明確な5つの例外があります：\n1. **メガシンカ枠：** シャドウはメガシンカできません。他に十分なシャドウ個体がいる状態で13/13/13のバンギラスやサーナイトを100%メガ枠にするのは有効です。\n2. **「おんがえし」必須のPvP枠：** スーパーリーグのヤミラミやソーナンスはリトレーン限定技「おんがえし」が必須級です。\n3. **純耐久型：** トリデプスやクレセリアのように防御特化のポケモンは防御低下のデメリットが大きくなります。\n4. **すな1,000リトレーン：** ズバット、ビードル、ムックル、ビッパ等はリサーチタスク用に確保しましょう。\n5. **対戦・レイド非採用枠：** 実戦で使わない種族の13/13/13以上は100%図鑑埋めにして問題ありません。',
          ru: 'У правила «никогда не очищай Shadow» есть пять обоснованных исключений:\n1. **Мега-эволюции:** Shadow-покемоны не могут Мега-эволюционировать. Если у вас есть лишний 13/13/13 Shadow Gardevoir или Tyranitar, а сильной Меги нет — очищение в 100% оправдано.\n2. **PvP-покемоны с атакой Return:** Sableye и Wobbuffet в Great League нуждаются в эксклюзивной атаке Return, доступной только после очищения.\n3. **Чистые танки:** Bastiodon, Cresselia и Umbreon теряют слишком много от штрафа к защите.\n4. **Дешёвое очищение за 1 000 пыли:** Zubat, Weedle, Bidoof и Starly идеально подходят для квестов и медали Purifier.\n5. **Не-метовые виды:** Если покемон не используется ни в PvE, ни в PvP, смело очищайте 13/13/13+ для коллекции 4*.',
        },
        pokemon: ['Sableye', 'Wobbuffet', 'Tyranitar', 'Gardevoir'],
      },
      {
        id: 'removing-frustration-strategy',
        heading: {
          cs: '4. Jak odstranit Frustration a získat Legacy útoky u Shadow Pokémonů',
          en: '4. Removing Frustration & Timing Legacy Evolutions on Shadow Pokémon',
          ja: '4. 「やつあたり」の消去手順とシャドウへの限定技習得タイミング',
          ru: '4. Как убрать Frustration и получить Legacy-атаки на Shadow покемонах',
        },
        content: {
          cs: 'Každý chycený Shadow Pokémon začíná s nepoužitelným nabíjecím útokem **Frustration**, který lze přepsat běžným Charged TM výhradně během čtvrtletních událostí **Team GO Rocket Takeover**. Důležitá past při vývoji na Community Day: pokud vyvinete Shadow Pokémona (např. Shadow Metanga na Metagrosse), který má stále na prvním slotu Frustration, exkluzivní útok (Meteor Mash) se **nenaučí** ani v případě, že jste mu odemkli druhý nabíjecí útok! Vždy si tedy průběžně štítkujte kvalitní Shadow kusy tagem `#Frustration` a během prvního dne Takeoveru zadejte do vyhledávání `@frustration` a u všech najednou Frustration odstraňte.',
          en: 'Every newly rescued Shadow Pokémon is locked with the unusable Charged Move **Frustration**, which can only be TM’d away during quarterly **Team GO Rocket Takeover** events. Watch out for a notorious evolution trap: evolving a Shadow Pokémon during a Community Day while it still knows Frustration will **fail to grant** the exclusive Legacy move—even if you unlocked a second Charged Move slot! Always tag promising Shadows with `#Frustration`, then search `@frustration` on day one of every Rocket Takeover to strip it off in bulk.',
          ja: '捕獲直後のシャドウは実用性のない「やつあたり」を覚えており、四半期ごとの**GOロケット団占拠イベント**期間中のみ通常のわざマシンスペシャルで消去できます。重大な注意点として、やつあたりが残ったままコミュニティ・デイで進化させると、**技解放をしていても限定技を覚えません**。普段から育成候補を整理し、占拠イベント初日に検索バーへ`@やつあたり`（英語なら`@frustration`）と入力して一斉消去しましょう。',
          ru: 'Каждый спасённый Shadow-покемон изначально знает бесполезную атаку **Frustration**, которую можно сменить обычным Charged TM только во время сезонных ивентов **Team GO Rocket Takeover**. Важная ловушка: если эволюционировать Shadow на Community Day с неубранным Frustration, он **не получит** эксклюзивную атаку — даже если открыт второй слот! Держите фильтр `@frustration` под рукой и очищайте атаку у всех перспективных теневых покемонов в первый же день Takeover.',
        },
      },
    ],
  },
  {
    id: 'pokemon-go-lucky-friends-trading-guide',
    slug: 'pokemon-go-lucky-friends-trading-guide',
    iconName: 'Sparkles',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png',
    featured: false,
    author: 'David Faltus',
    readTime: '9 min',
    updatedAt: '2026-11-20',
    category: {
      cs: 'Přátelství, Trading & Ekonomika',
      en: 'Friendship, Trading & Resource Economy',
      ja: 'フレンド・交換・キラポケモン攻略',
      ru: 'Дружба, обмены и Lucky покемоны',
    },
    title: {
      cs: 'Trading, Lucky Friends & Lucky Pokémon: Jak získat garantované 12/12/12+ legendy',
      en: 'Pokémon GO Trading & Lucky Friends Guide: Odds, Guaranteed Lucky Trades & Stardust Costs',
      ja: 'Pokémon GO 交換・キラフレンド完全ガイド：キラ確率・確定キラ条件・すなコスト表',
      ru: 'Обмены, Lucky Friends и Lucky покемоны в Pokémon GO: шансы, гарантии и стоимость пыли',
    },
    subtitle: {
      cs: 'Přesná tabulka šancí na náhodný Lucky Trade podle stáří Pokémona (5 % až 20 %), pravidla garantovaných Lucky výměn ze starých let a sleva 50 % na Stardust.',
      en: 'Exact random Lucky Trade odds by Pokémon age (5% to 20%), Guaranteed Lucky Trade rules for vintage catches, and the 50% Stardust power-up discount.',
      ja: '捕獲年数別のキラ確率（5%〜20%）、確定キラ交換の上限ルール、育成ほしのすな50%割引の最大活用法を解説。',
      ru: 'Точные шансы случайного Lucky Trade по возрасту покемона (5–20%), правила гарантированных Lucky обменов и скидка 50% на звёздную пыль.',
    },
    sections: [
      {
        id: 'lucky-pokemon-benefits',
        heading: {
          cs: '1. Proč jsou Lucky Pokémoni nejefektivnější cestou k Level 50 týmům',
          en: '1. Why Lucky Pokémon Are the Fastest Path to Level 50 Raid & Master League Teams',
          ja: '1. キラポケモンがPL50育成において最強のコスパを誇る理由',
          ru: '1. Почему Lucky покемоны — лучший путь к командам 50-го уровня',
        },
        content: {
          cs: 'Lucky Pokémon přináší dvě obrovské trvalé výhody: zaručené minimální IV **12/12/12** (což dává šanci 1 z 64 na perfektní 100% Hundo oproti 1 z 4096 v divočině!) a **trvalou 50% slevu na Stardust při každém vylepšení**. Vylepšení běžného Pokémona z Levelu 20 na Level 50 stojí 475 000 Stardustu; u Lucky Pokémona zaplatíte pouze **237 500 Stardustu**, tedy ušetříte téměř čtvrt milionu Stardustu na jediném kusu. Navíc zlaté pozadí Lucky Pokémona přepisuje IV po výměně bez ohledu na to, jak špatné IV měl Pokémon původně — proto se nejvíce vyplatí vyměňovat drahé legendární a Shiny legendy s nízkými IV.',
          en: 'Lucky Pokémon deliver two permanent power spikes: a guaranteed **12/12/12 IV floor** (giving a 1-in-64 Hundo rate compared to 1-in-4,096 wild odds) and a **permanent 50% Stardust discount on every power-up**. Maxing a standard raid catch from Level 20 to Level 50 costs 475,000 Stardust; a Lucky Pokémon requires only **237,500 Stardust**—saving nearly a quarter-million Stardust per attacker. Because trading completely rerolls IVs, Lucky Trades are best spent on low-IV Shiny Legendaries, Fusion hosts (Necrozma, Kyurem), and Master League staples.',
          ja: 'キラポケモンには2つの強力な永続メリットがあります。1つ目は**最低個体値12/12/12保証**（100%個体値の確率が1/64に大幅上昇）、2つ目は**強化に必要なほしのすなが永続的に50%割引**になる点です。PL20からPL50までの強化は通常475,000すな必要ですが、キラ個体なら**237,500すな**で完了します。交換で個体値が完全再抽選されるため、低個体の色違い伝説やネクロズマ・キュレム等の合体ベースに使うのが最も効果的です。',
          ru: 'Lucky покемоны дают два постоянных преимущества: гарантированный минимум IV **12/12/12** (шанс 1 из 64 на 100% Hundo) и **постоянную скидку 50% на звёздную пыль** при каждой прокачке. Прокачка с 20-го до 50-го уровня стоит 475 000 пыли для обычного покемона и лишь **237 500 пыли** для Lucky. Поскольку обмен полностью перебрасывает IV, выгоднее всего тратить Lucky-обмены на легендарных, Shiny-легенд и покемонов для слияния (Necrozma, Kyurem).',
        },
        pokemon: ['Necrozma', 'Kyurem', 'Rayquaza', 'Dialga'],
      },
      {
        id: 'lucky-odds-by-age',
        heading: {
          cs: '2. Přesná pravděpodobnost Lucky Trade podle stáří Pokémona a Garantované Lucky',
          en: '2. Random Lucky Trade Odds by Age & Guaranteed Vintage Lucky Trades',
          ja: '2. 捕獲年数によるキラ確率テーブルと「確定キラ交換」の仕組み',
          ru: '2. Точные шансы Lucky Trade по возрасту и гарантированные обмены старых лет',
        },
        content: {
          cs: 'Při každé běžné výměně se šance na náhodný Lucky Trade odvíjí od **součtu celých let stáří obou vyměňovaných Pokémonů**:\n• Celkové stáří 0 let (chyceno letos): **5 %** (1 z 20).\n• Celkové stáří 1 rok: **10 %** (1 z 10).\n• Celkové stáří 2 roky: **15 %**.\n• Celkové stáří 3 a více let (např. váš 3 roky starý Pokémon + kamarádův čerstvý raid boss): **20 %** (maximální strop náhodného Lucky, 1 z 5!).\nSamostatnou kategorií jsou **Garantované Lucky výměny** pro veteránské Pokémony z raných let hry (2016–2019), pokud odesílatel ještě nepřekročil účetní limit garantovaných Lucky výměn (postupně navyšovaný z 25 na 35+ při každoročních Lunar New Year událostech).',
          en: 'For standard trades, random Lucky odds scale with the **combined full-year age of both traded Pokémon**:\n• 0 combined years: **5%** (1 in 20).\n• 1 combined year: **10%** (1 in 10).\n• 2 combined years: **15%**.\n• 3+ combined years (e.g., your 3-year-old Pokémon paired with a friend’s brand-new Raid Boss): **20% cap** (1 in 5!).\nSeparately, **Guaranteed Lucky Trades** trigger automatically when trading vintage Pokémon from early game years (2016–2019), provided the sender has not exhausted their lifetime Guaranteed Lucky counter (which Niantic/Scopely expands each Lunar New Year).',
          ja: '通常交換のランダムキラ確率は、**交換に出す2匹の「満経過年数の合計」**で決まります：\n• 合計0年：約**5%**（1/20）\n• 合計1年：約**10%**（1/10）\n• 合計2年：約**15%**\n• 合計3年以上（例：自分の3年前個体＋相手の最新伝説）：上限**20%**（1/5！）\nこれとは別に、初期（2016〜2019年頃）に捕獲した古いポケモンは、送り手の確定枠上限（旧正月イベント等で順次拡大）以内であれば**100%確定でキラポケモン**になります。',
          ru: 'Шанс случайного Lucky Trade зависит от **суммарного возраста (в полных годах) обоих обмениваемых покемонов**:\n• 0 лет суммарно: **5%** (1 из 20).\n• 1 год: **10%** (1 из 10).\n• 2 года: **15%**.\n• 3+ года суммарно (например, ваш покемон 3-летней давности + свежий рейд-босс друга): максимум **20%** (1 из 5!).\nОтдельно работают **Гарантированные Lucky обмены** со старыми покемонами 2016–2019 годов, если отправитель ещё не исчерпал лимит гарантированных Lucky на аккаунте.',
        },
        tips: {
          cs: [
            'Vracíte-li se do hry po letech, NIKDY nemažte Pokémony z let 2016–2019 — mají hodnotu garantovaného Lucky Tradelu pro nejvzácnější legendy.',
            'Každý den můžete provést až 100 běžných výměn (plus 1 Special Trade, v sezónních bonusech až 2). Pravidelný „Mirror Trading“ 100 kusů po Community Day přinese v průměru 5 Lucky Pokémonů a až 100 Candy XL.',
          ],
          en: [
            'Returning trainers should NEVER transfer 2016–2019 Pokémon—each one can secure a Guaranteed Lucky Shiny Legendary from local community friends.',
            'You can complete 100 standard trades per day. Mirror-trading 100 Community Day catches yields ~5 Lucky Pokémon and up to 100 guaranteed Candy XL during XL-trade seasons.',
          ],
          ja: [
            '復帰勢は2016〜2019年産のポケモンを絶対に博士へ送らないでください。最新の最強伝説を確定キラにする切り札になります。',
            '通常交換は1日最大100回可能です。コミュニティ・デイ後に100回ミラー交換すると、平均5匹のキラ個体と大量のアメXLを確保できます。',
          ],
          ru: [
            'Если вы вернулись в игру спустя годы, НЕ удаляйте покемонов 2016–2019 годов — это ваш билет к гарантированным Lucky-легендам.',
            'Лимит обычных обменов — 100 в день. Зеркальный обмен 100 покемонов после Community Day даёт в среднем 5 Lucky и до 100 XL конфет в сезоны с бонусом.',
          ],
        },
      },
      {
        id: 'lucky-friends-trigger-and-stardust-table',
        heading: {
          cs: '3. Jak aktivovat Lucky Friends a tabulka cen Stardustu za Special Trade',
          en: '3. Triggering Lucky Friends & Special Trade Stardust Cost Table',
          ja: '3. キラフレンドの発動条件と特別な交換のほしのすなコスト表',
          ru: '3. Как получить статус Lucky Friends и стоимость Special Trade в пыли',
        },
        content: {
          cs: 'Po dosažení **Best Friends** (90 dní interakcí) má vaše **první denní interakce** s daným přítelem (otevření dárku, společný raid, PvP zápas nebo výměna) šanci přibližně **1,17 % (cca 1 z 85)** na spuštění zlatého statusu **Lucky Friends** — vaše příští výměna je pak 100% garantovaně Lucky. Zásadní je také úroveň přátelství u Special Trades (neevidované Shiny nebo Legendy): zatímco u Good Friends stojí neregistrovaná legenda **1 000 000 Stardustu**, u Ultra Friends (30 dní) klesá na **80 000** a u Best Friends (90 dní) na pouhých **40 000 Stardustu** (a u již registrovaných legend jen **800 Stardustu**!).',
          en: 'Once you reach **Best Friends** (90 daily interactions), your **first daily interaction** with that friend (opening a Gift, raiding together, battling, or trading) carries roughly a **1.17% (~1 in 85) chance** to trigger **Lucky Friends**, guaranteeing that your next trade turns Lucky. Friendship tier also dictates Special Trade costs: trading an unregistered Shiny or Legendary costs **1,000,000 Stardust** at Good Friends, drops to **80,000** at Ultra Friends (30 days), and plunges to just **40,000 Stardust** at Best Friends (and only **800 Stardust** if both players already own it in their Pokédex!).',
          ja: '**大親友（90日交流）**に到達すると、そのフレンドとの**1日最初の交流**（ギフト開封・レイド共闘・対戦・交換）ごとに約**1.17%（約1/85）**の確率で**キラフレンド**が発動し、次の交換が確定キラになります。特別な交換のコストも仲良し度で激変します：未登録の色違い・伝説は仲良しで**100万すな**かかりますが、親友で**80,000**、大親友なら**40,000すな**（図鑑登録済みならわずか**800すな**）まで下がります。',
          ru: 'После достижения **Best Friends** (90 дней взаимодействий) первое ежедневное взаимодействие с другом (подарок, рейд, бой или обмен) с шансом ~**1,17% (1 из 85)** активирует **Lucky Friends** — ваш следующий обмен гарантированно станет Lucky. Уровень дружбы критически снижает цену Special Trade незарегистрированной легенды или Shiny: с **1 000 000 пыли** на Good Friends до **80 000** на Ultra Friends и всего **40 000 пыли** на Best Friends (а для уже зарегистрированных — всего **800 пыли**!).',
        },
      },
      {
        id: 'iv-floors-and-pvp-rerolls',
        heading: {
          cs: '4. Skrytý trik pro PvP: Výměny na nízkém přátelství (Good Friends)',
          en: '4. Pro PvP Trick: Why Good Friend Trades Are Best for Great League Legends',
          ja: '4. PvP上級テク：スーパーリーグ伝説は「仲良し」交換が最強の理由',
          ru: '4. Секрет PvP-игроков: почему обмены на Good Friends лучше для лиги 1500 CP',
        },
        content: {
          cs: 'Každá úroveň přátelství nastavuje minimální IV podlahu při výměně: Good Friends `1/1/1`, Great Friends `2/2/2`, Ultra Friends `3/3/3` a Best Friends `5/5/5`. Zatímco do raidů a Master League chcete Best Friends (vyšší šance na vysoká IV), v **Great a Ultra League** vám vysoká podlaha 5/5/5 u Best Friends brání získat nízký útok (1–4 Attack IV) u raidových a legendárních Pokémonů jako Cresselia, Giratina, Tapu Fini nebo Registeel! Proto zkušení PvP hráči vyměňují ligové legendy záměrně s novými **Good Friends (podlaha 1/1/1)**, čímž získávají šanci na absolutní Rank 1 PvP stat product.',
          en: 'Each Friendship tier enforces a minimum IV floor on trades: Good Friends (`1/1/1`), Great (`2/2/2`), Ultra (`3/3/3`), and Best (`5/5/5`). While Best Friends is ideal for raids, that 5/5/5 floor prevents you from rolling ultra-low Attack spreads (1–4 Attack) on Raid-locked Great and Ultra League staples like Registeel, Cresselia, Tapu Fini, and Giratina. Competitive PvP players deliberately trade these Pokémon with **Good Friends (1/1/1 floor)** to unlock Rank 1 stat products impossible to catch directly from raids.',
          ja: '交換時の最低個体値は仲良し度で決まります（仲良し1/1/1、友達2/2/2、親友3/3/3、大親友5/5/5）。レイド用は大親友が有利ですが、レジスチル・クレセリア・ギラティナ・カプ・レヒレなどレイド産伝説をスーパー・ハイパーリーグ用に厳選する場合、大親友だと攻撃5未満が出ません。そのためPvP上級者はあえて**仲良し（最低値1/1/1）**で交換し、レイド産では絶対に入手不可能な理想PvP個体を狙います。',
          ru: 'Каждый уровень дружбы задаёт свой минимум IV при обмене: Good (`1/1/1`), Great (`2/2/2`), Ultra (`3/3/3`), Best (`5/5/5`). Для лиг 1500 и 2500 CP порог 5/5/5 у Best Friends мешает получить низкую атаку у рейдовых покемонов вроде Registeel, Cresselia, Tapu Fini или Giratina. Поэтому PvP-игроки специально меняются ими на уровне **Good Friends (пол 1/1/1)**, чтобы поймать идеальный PvP-разброс, невозможный в обычных рейдах.',
        },
        pokemon: ['Registeel', 'Cresselia', 'Giratina', 'Tapu Fini'],
      },
    ],
  },
  {
    id: 'pokemon-go-buddy-best-buddy-excite-guide',
    slug: 'pokemon-go-buddy-best-buddy-excite-guide',
    iconName: 'Award',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/483.png',
    featured: false,
    author: 'David Faltus',
    readTime: '9 min',
    updatedAt: '2026-11-20',
    category: {
      cs: 'Buddy systém & Optimalizace Candy XL',
      en: 'Buddy System & Candy XL Optimization',
      ja: '相棒システム・大親友育成ガイド',
      ru: 'Система напарника (Buddy) и Best Buddy',
    },
    title: {
      cs: 'Best Buddy systém & Jak dostat Buddyho do Excited stavu bez Poffinu (Návod 2026)',
      en: 'Best Buddy Guide: How to Get Your Buddy Excited Without a Poffin & Level 51 CP Boost',
      ja: '最高の相棒＆ポフィンなしで「大喜び」にする完全手順（CPブースト・アメXL効率化）',
      ru: 'Система Best Buddy: как сделать напарника Excited без Poffin и получить бонус +1 уровня',
    },
    subtitle: {
      cs: 'Přesný 30minutový postup pro dosažení 32 Emotion Points zdarma, poloviční vzdálenost na Candy/Mega Energii a klíčové Level 51 breakpointy v Master League.',
      en: 'The exact 30-minute timer loop to hit 32 Emotion Points for free, halve Candy & Mega Energy walking distances, and unlock Master League Level 51 breakpoints.',
      ja: 'ポフィンを使わず30分ループで感情ポイント32に到達する手順、アメ距離半減、マスターリーグPL51ブレイクポイントを解説。',
      ru: 'Пошаговый 30-минутный цикл для набора 32 Emotion Points бесплатно, вдвое меньшая дистанция конфет и ключевые брейкпоинты 51-го уровня.',
    },
    sections: [
      {
        id: 'emotion-points-excited-loop',
        heading: {
          cs: '1. Jak dostat Buddyho do Excited stavu za 90 minut bez Poffinu (32 EP)',
          en: '1. How to Excite Your Buddy in 90 Minutes Without Spending a Poffin (32 EP)',
          ja: '1. ポフィン無しで90分で「大喜び（32EP）」にする完全タイマー手順',
          ru: '1. Как довести Buddy до состояния Excited за 90 минут без Poffin (32 EP)',
        },
        content: {
          cs: 'Stav **Excited** (dvojitá srdíčka — až 26+ srdcí denně a **poloviční vzdálenost na Candy i Mega Energii**, např. 10 km místo 20 km u legend!) vyžaduje nasbírání **32 skrytých Emotion Points (EP)**. Většina základních akcí dává **+2 EP** a má přesně **30minutový cooldown** (kromě chůze 2 km za +4 EP a nového PokéStopu za +2 EP, které cooldown nemají):\n• Nakrmit Buddyho (Feed): **+2 EP**\n• Pohladit Buddyho (Play): **+2 EP**\n• Vyfotit (Snapshot): **+2 EP**\n• Bojovat s Buddym v týmu (Battle — stačí nastoupit do tréninku proti Team Leaderovi Blanche/Candela/Spark a hned utéct, nebo odehrát Rocket/Raid/Gym): **+2 EP za každý odlišný typ souboje**!\nOpakujte tedy každých 30 minut sadu: *Pohladit (+2) + Foto (+2) + Trénink s lídrem (+2) + krmení (+2 po opadnutí 1/3 hladu) + Rocket/Gym/PvP (+2–4)* a během 90–120 minut dosáhnete 32 EP zcela zdarma!',
          en: 'Reaching the **Excited** mood—which doubles daily Hearts (up to 26+) and **cuts Candy & Mega Energy walking distance in half** (e.g., 10 km instead of 20 km for Legendaries)—requires **32 hidden Emotion Points (EP)**. Most interactions award **+2 EP** on a strict **30-minute cooldown** (while walking 2 km awards +4 EP with zero cooldown):\n• Feed Buddy: **+2 EP** (once hunger drops one bar, or initial full feed)\n• Play (petting): **+2 EP**\n• Snapshot: **+2 EP**\n• Battle with Buddy in your party: **+2 EP** each across separate battle categories (Team Leader training—you can quit immediately!—Gym battle, Raid, Rocket battle, PvP).\nRun a 30-minute timer repeating Play + Snapshot + Leader Battle (+ Feed/Walk/Rocket) and you hit 32 EP completely free in ~90 minutes.',
          ja: '1日のハート上限が2倍になり、**アメ・メガエナジーの獲得距離が半減**（伝説なら20km→10km！）する「大喜び」状態は、隠し数値である**感情ポイント（EP）を32**貯めることで発動します。基本アクションは30分のクールダウンごとに**+2EP**獲得できます：\n• おやつをあげる：**+2EP**\n• なでる：**+2EP**\n• スナップショット：**+2EP**\n• 一緒にバトル：**+2EP**（チームリーダーとのトレーニングは入って即降参でも加算！さらにジム・レイド・ロケット団・PvPは別枠で加算）\n• 2km歩く：**+4EP**（クールダウンなし）\n30分タイマーで「なでる＋写真＋トレーニング（＋おやつ/歩行）」を3〜4セット回せば、ポフィン無しで確実に大喜びになります。',
          ru: 'Состояние **Excited** удваивает дневные сердца и **сокращает дистанцию ходьбы за конфетами и Мега-энергией вдвое** (10 км вместо 20 км для легенд!). Для него нужно набрать **32 скрытых Emotion Points (EP)**. Большинство действий дают **+2 EP** с откатом 30 минут (ходьба 2 км даёт +4 EP без отката):\n• Покормить (Feed): **+2 EP**\n• Погладить (Play): **+2 EP**\n• Сделать снимок (Snapshot): **+2 EP**\n• Сразиться с Buddy в команде: **+2 EP** за каждый отдельный тип боя (тренировка с лидером команды — можно сразу выйти!, Гим, Рейд, Rocket, PvP).\nПовторяя цикл каждые 30 минут, вы гарантированно получите Excited бесплатно за ~90 минут.',
        },
        tips: {
          cs: [
            'EP začnou klesat (-1 EP každých 25 minut), pokud s Buddym neprovedete žádnou interakci déle než 25 minut. Jakmile je Excited, stačí každých 20–25 minut pohladit nebo vyfotit pro udržení stavu celý den!',
            'Pokud máte na konci 20km procházky s legendou 19,5 km, stačí nasadit Poffin nebo vyvolat Excited a okamžitě dostanete 1 Candy + zbyde 9,5/10 km k dalšímu!',
          ],
          en: [
            'EP decays by -1 every 25 minutes of inactivity. Once Excited, simply pet or snapshot your Buddy once every 20–25 minutes to maintain Excited status all day.',
            'Walking a 20 km Legendary? Wait until you reach ~19.5 km, then trigger Excited (or pop a Poffin): you immediately bank 1 Candy and start at 9.5/10 km toward the second!',
          ],
          ja: [
            '25分間何もアクションしないとEPが1ずつ減少します。大喜び到達後も20〜25分ごとに「なでる」か「写真」を行うだけで一日中維持できます。',
            '伝説ポケモンの19.5km時点で大喜び（またはポフィン使用）にすると、即座にアメ1個を獲得し、残り9.5/10kmからすぐ2個目も手に入ります！',
          ],
          ru: [
            'При бездействии дольше 25 минут теряется по 1 EP. После достижения Excited просто гладьте или фотографируйте Buddy каждые 20–25 минут, чтобы удерживать бонус весь день.',
            'Если у легенды пройдено 19,5 из 20 км — активируйте Excited (или Poffin): вы сразу получите 1 конфету и окажетесь на отметке 9,5/10 км до следующей!',
          ],
        },
      },
      {
        id: 'candy-xl-walking-level-31',
        heading: {
          cs: '2. Kritické pravidlo Levelu 31 pro farmu Candy XL chůzí',
          en: '2. The Level 31 Breakpoint for Walking Candy XL',
          ja: '2. 相棒歩行でアメXLを稼ぐための必須ライン「PL31」',
          ru: '2. Золотое правило 31-го уровня для фарма XL конфет ходьбой',
        },
        content: {
          cs: 'Pravděpodobnost, že kromě běžného Candy získáte za ušlou vzdálenost i vzácný **Candy XL**, přímo závisí na aktuálním Levelu vašeho Buddy Pokémona! Na Levelu 15 je šance sotva ~20 %, na Levelu 20 přibližně 45 %, ale na **Levelu 31 dosahuje maxima ~75–80 %** (další vylepšování nad Level 31 až na Level 50 už šanci nezvyšuje!). Než tedy vyrazíte na dlouhou procházku s vzácným Pokémonem (Zygarde, Carbink, Larvesta, Necrozma, Diancie), vždy ho nejdříve vylepšete alespoň na **Level 31** (poznáte podle ceny 6 000 Stardustu za Power Up).',
          en: 'Your probability of earning a bonus **Candy XL** alongside every regular walking Candy scales directly with your Buddy’s current Pokémon Level. At Level 15 the drop rate is ~20%, at Level 20 it sits around 45%, and at **Level 31 it hits its hard ceiling of ~75–80%** (powering up beyond Level 31 yields no additional walking XL odds). Before committing kilometers to rare buddies like Zygarde, Carbink, Larvesta, or Mythicals, always power them up to at least **Level 31** first (identifiable by the 6,000 Stardust power-up tier).',
          ja: '相棒と歩いてアメをもらう際に**アメXL**が同時に落ちる確率は、相棒のポケモンレベル（PL）に依存します。PL20では約45%ですが、**PL31で上限の約75〜80%**に達します（PL31以上に強化しても確率は変わりません）。ジガルデ、メレシー、メラルバ、幻ポケモンなどを相棒にして歩く前は、必ず**PL31**（強化コストすな6,000の段階）まで上げてから歩き始めましょう。',
          ru: 'Шанс получить бонусную **XL конфету** за пройденную дистанцию напрямую зависит от уровня вашего Buddy. На 20-м уровне шанс около 45%, а на **31-м уровне он достигает потолка ~75–80%** (прокачка выше 31-го уровня шанс не увеличивает). Перед тем как нахаживать километры с редкими покемонами вроде Zygarde, Carbink или Larvesta, обязательно поднимите их минимум до **31-го уровня** (стоимость усиления 6 000 пыли).',
        },
        pokemon: ['Zygarde', 'Carbink', 'Larvesta', 'Diancie'],
      },
      {
        id: 'best-buddy-level-51-breakpoints',
        heading: {
          cs: '3. Best Buddy CP Boost (+1 Level) a klíčové Master League breakpointy',
          en: '3. Best Buddy +1 Level CP Boost & Crucial Master League Breakpoints',
          ja: '3. 最高の相棒CPブースト（+1レベル）とマスターリーグ重要ブレイクポイント',
          ru: '3. Бонус Best Buddy (+1 уровень) и ключевые брейкпоинты в Master League',
        },
        content: {
          cs: 'Po nasbírání 300 srdíček (12–15 dní s Excited stavem) získá Pokémon stuhu **Best Buddy** a dokud je nastaven jako váš aktivní Buddy, dostává **+1 Level navíc (až Level 51!)**. V neomezené Master League rozhoduje tento jediný level o tzv. Fast Move Breakpointech (každý rychlý útok uděluje o 1 bod poškození více) a výhrách v CMP Tie. Klasickým příkladem je **Dialga / Origin Dialga** (Level 51 vyhrává zrcadlový souboj proti Level 50 Dialze), **Palkia (Origin)**, **Zygarde (Complete)**, **Dusk Mane Necrozma** nebo **Talonflame / Umbreon** v Ultra League, kde Level 51 posouvá jejich strop těsně k 2500 CP.',
          en: 'After earning 300 Hearts (as fast as 12–15 days using Excited loops), your Pokémon earns the **Best Buddy Ribbon** and receives a **+1 Level boost (up to Level 51)** whenever set as your active Buddy. In open Master League, that extra level flips critical Fast Move breakpoints and wins mirror CMP ties. Iconic Level 51 priorities include **Dialga & Origin Dialga** (beating Level 50 mirrors), **Origin Palkia**, **Complete Forme Zygarde**, **Dusk Mane Necrozma**, and Ultra League Lv50 maxers like **Umbreon** and **Talonflame**.',
          ja: 'ハート300個（大喜び活用で最短12〜15日）で**最高の相棒**になると、相棒設定中のみ**PL+1（最大PL51）のCPブースト**が発動します。上限なしのマスターリーグでは、この1レベル差が通常技のダメージ1増加（ブレイクポイント）やミラー戦のCMP先攻に直結します。最優先候補は**ディアルガ（オリジン含む）**、**オリジンパルキア**、**ジガルデ（パーフェクト）**、**日食ネクロズマ**、そしてハイパーリーグの**ブラッキー／ファイアロー**です。',
          ru: 'Набрав 300 сердец (за 12–15 дней через Excited), покемон получает ленту **Best Buddy** и **+1 к уровню (до 51-го!)**, пока выбран активным напарником. В Master League этот уровень решает исход зеркальных матчей через брейкпоинты быстрых атак и CMP Tie. Главные кандидаты на 51-й уровень: **Dialga / Origin Dialga**, **Origin Palkia**, **Complete Forme Zygarde**, **Dusk Mane Necrozma**, а в Ultra League — **Umbreon** и **Talonflame**.',
        },
        pokemon: ['Dialga', 'Palkia', 'Umbreon', 'Talonflame'],
      },
      {
        id: 'multi-buddy-rotation-medal',
        heading: {
          cs: '4. Rychlá rotace 20 Buddyů denně pro platinovou medaili Best Buddy',
          en: '4. Rotating 20 Buddies Per Day for the Platinum Best Buddy Medal',
          ja: '4. 1日20匹ローテーションで最高の相棒プラチナメダルを最速達成',
          ru: '4. Ротация 20 Buddy в день для платиновой медали Best Buddy',
        },
        content: {
          cs: 'Hra umožňuje přepnout Buddyho až **20× denně**. Pokud chcete rychle dokončit platinovou medaili (200 Best Buddies) nebo paralelně trénovat celou raidovou sestavu, vytvořte si štítek `#Buddy` s 10 až 20 kandidáty. U každého během 40 sekund proveďte rychlou rutinu za 6 srdíček: *Nakrmit (1) + Pohladit (1) + Foto (1) + 3× nastoupit a hned utéct z tréninku proti Blanche (3)*. Celkem 6 srdcí za 40 sekund × 20 Pokémonů = **120 srdcí denně**, tedy 20 nových Best Buddies každých 50 dní bez jediného Poffinu.',
          en: 'Pokémon GO allows up to **20 Buddy swaps per day**. To level an entire raid roster simultaneously or chase the 200 Best Buddy Platinum medal, tag 10–20 candidates with `#Buddy` and run a 40-second 6-Heart routine on each: *Feed (1) + Play (1) + Snapshot (1) + enter and immediately exit Team Leader training 3 times (3)*. That yields **120 Hearts per day** and finishes 20 simultaneous Best Buddies every 50 days without spending a single Poffin.',
          ja: '相棒は**1日最大20回**交代できます。プラチナメダル（200匹）や複数体の同時育成を狙うなら、`#相棒育成`タグを付けた10〜20匹を毎日ローテーションしましょう。1匹あたり40秒で「おやつ(1)＋なでる(1)＋写真(1)＋トレーニング即降参3回(3)＝計6ハート」を稼げます。20匹回せば**1日120ハート**となり、50日ごとに20匹まとめて最高の相棒が完成します。',
          ru: 'Игра разрешает менять напарника до **20 раз в день**. Для быстрого получения платиновой медали (200 Best Buddies) отметьте 10–20 покемонов тегом `#Buddy` и делайте быстрый 40-секундный цикл на 6 сердец: *Покормить (1) + Погладить (1) + Снимок (1) + 3 входа и выхода из тренировки с лидером (3)*. Это даёт **120 сердец в день** и 20 новых Best Buddies каждые 50 дней без единого Poffin.',
        },
      },
    ],
  },
  {
    id: 'pokemon-go-party-play-party-power-guide',
    slug: 'pokemon-go-party-play-party-power-guide',
    iconName: 'Zap',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/383.png',
    featured: false,
    author: 'David Faltus',
    readTime: '8 min',
    updatedAt: '2026-11-20',
    category: {
      cs: 'Raidy & Kooperativní mechaniky',
      en: 'Raids & Cooperative Mechanics',
      ja: 'レイド・チームコラボ攻略',
      ru: 'Рейды и механика Party Play',
    },
    title: {
      cs: 'Party Play & Party Power v Raidech: Jak funguje 2× Charged Move a Duo strategie',
      en: 'Party Play & Party Power Raid Guide: Doubling Charged Move Damage for Duo Clears',
      ja: 'チームコラボ＆チームパワー完全解説：スペシャルアタック2倍の仕組みと少人数レイド攻略',
      ru: 'Party Play и Party Power в рейдах: как удвоить урон заряженных атак и закрывать рейды вдвоём',
    },
    subtitle: {
      cs: 'Proč Party Power mění žebříček nejlepších raidových útočníků (1-barové útoky jako Precipice Blades a Dragon Ascent), rychlost nabíjení podle počtu hráčů a odměny z Party Challenges.',
      en: 'Why Party Power reshuffles the PvE raid rankings in favor of 1-bar nukes (Dragon Ascent, Precipice Blades), charge-rate math by party size, and exclusive Party Challenge encounters.',
      ja: '1ゲージ大技（ガリョウテンセイ・だんがいのつるぎ等）が劇的に強化される理由、人数別チャージ速度、限定チャレンジ報酬を徹底解説。',
      ru: 'Почему Party Power меняет PvE-рейтинги в пользу однополосных ульт (Dragon Ascent, Precipice Blades), скорость зарядки и награды Party Challenges.',
    },
    sections: [
      {
        id: 'party-power-charge-mechanics',
        heading: {
          cs: '1. Jak přesně funguje nabíjení Party Power podle velikosti skupiny (2–4 hráči)',
          en: '1. Exact Party Power Charging Math by Party Size (2 to 4 Trainers)',
          ja: '1. 人数別（2〜4人）のチームパワー蓄積スピードと発動ルール',
          ru: '1. Точная механика зарядки Party Power для групп из 2–4 тренеров',
        },
        content: {
          cs: 'Když před vstupem do raidové lobby vytvoříte **Party (Tým)** 2 až 4 hráčů stojících poblíž, objeví se v levém dolním rohu obrazovky modré tlačítko **Party Power**. Nabíjí se výhradně rychlými útoky (Fast Moves) všech členů party: ve 2 hráčích potřebujete společně 18 rychlých útoků (tedy 9 každý), ve 3 hráčích zhruba 12 a ve 4 hráčích pouhých ~9 útoků (tedy sotva 2–3 rychlé útoky na hráče!). Po klepnutí na plně nabité tlačítko **zdvojnásobí váš příští nabíjecí útok (×2,0 Base Power)** po dobu aktivního okna. U většiny 5★ Legendárních Raid Bossů to zvedne celkové DPS skupiny o **30 až 45 %**, čímž promění dříve těžké Trio v pohodlné Duo!',
          en: 'Forming a 2-to-4 trainer **Party** before entering a Raid lobby unlocks the blue **Party Power** button in the bottom-left corner of combat. Every trainer’s Fast Moves collectively charge the meter: a 2-player party charges it in 18 combined Fast Moves (9 each), a 3-player party in ~12, and a 4-player party in ~9 (just 2–3 Fast Moves per trainer!). Tapping the glowing button **doubles the Base Power (2.0×) of your next Charged Move**. Against Tier 5 Legendary Raid Bosses, consistent Party Power boosts real team DPS by **30–45%**, turning tough Trios into comfortable Duos.',
          ja: 'レイド参加前に2〜4人で**チーム（Party）**を組むと、バトル画面左下に**チームパワー**ボタンが出現します。ゲージはチーム全員の通常技回数で蓄積し、2人なら合計18回（1人9回）、3人なら約12回、4人ならわずか約9回（1人2〜3回！）で満タンになります。発動すると次の**スペシャルアタックの威力が2.0倍**になり、グループ全体の実戦DPSが**30〜45%向上**します。これまで3人必要だった伝説レイドも、2人（デュオ）で安定討伐可能になります。',
          ru: 'Создание **Party (группы)** из 2–4 игроков перед входом в лобби рейда открывает синюю кнопку **Party Power** в левом нижнем углу боя. Шкала заряжается быстрыми атаками всех участников: вдвоём нужно 18 атак (по 9 на игрока), втроём ~12, вчетвером ~9 (всего 2–3 атаки с каждого!). Нажатие **удваивает урон (×2,0)** следующей заряженной атаки, повышая реальный DPS команды на **30–45%** и позволяя уверенно проходить многие 5★ рейды вдвоём.',
        },
        pokemon: ['Primal Groudon', 'Primal Kyogre', 'Mega Rayquaza', 'Black Kyurem'],
      },
      {
        id: 'why-one-bar-moves-dominate',
        heading: {
          cs: '2. Proč v Party Play vyhrávají 1-barové útoky a rychlé 0,5s Fast Moves',
          en: '2. Why 1-Bar Nukes & 0.5-Second Fast Moves Dominate Party Power Meta',
          ja: '2. チームパワー環境で「0.5秒通常技＋1ゲージ大技」が最強になる理由',
          ru: '2. Почему в Party Play доминируют быстрые 0,5с атаки и мощные 1-бар ульты',
        },
        content: {
          cs: 'Protože Party Power násobí **jediný příští nabíjecí útok** a nabíjí se počtem rychlých útoků (nikoli jejich energií!), dramaticky mění žebříček nejlepších raidových útočníků:\n• **Králové rychlého nabíjení (0,5s Fast Moves):** Útoky jako *Metal Claw, Shadow Claw, Dragon Breath, Lick, Bug Bite, Water Gun* a *Fury Cutter* nabijí Party Power dvakrát rychleji než pomalé 1,5s útoky (Volt Switch, Confusion).\n• **Králové dvojnásobného násobiče (1-barové „Nuke“ útoky):** Zdvojnásobit 200-power *Freeze Shock*, 180-power *Behemoth Blade*, 160-power *Sunsteel Strike / Moongeist Beam*, 140-power *Dragon Ascent* nebo 130-power *Precipice Blades* přináší obrovský nárůst poškození na jediné klepnutí — mnohem vyšší než zdvojnásobení slabého 3-barového útoku.',
          en: 'Because Party Power scales off **Fast Move count** and doubles **one single Charged Move**, it reshuffles the standard PvE rankings:\n• **0.5-Second Fast Move Batteries:** Rapid moves like *Shadow Claw, Dragon Breath, Metal Claw, Lick, Fury Cutter*, and *Water Gun* fill the Party Power gauge twice as fast as slow moves like *Confusion* or *Incinerate*.\n• **High-Power 1-Bar Nukes:** Doubling a single *Freeze Shock*, *Sunsteel Strike*, *Moongeist Beam*, *Dragon Ascent*, or *Precipice Blades* adds 130 to 200+ raw base power per activation—vastly outscaling low-power 3-bar Charged Moves.',
          ja: 'チームパワーは通常技の「回数」で溜まり、次の「1発」の威力を2倍にするため、通常のレイドランキングとは評価軸が変わります：\n• **0.5秒の超高速通常技：** シャドークロー、りゅうのいぶき、メタルクロー、したでなめる等はゲージ蓄積速度が2倍以上になります。\n• **高威力1ゲージ大技：** フリーズボルト、メテオドライブ、シャドーレイ、ガリョウテンセイ、だんがいのつるぎ等を2倍化すると、1回の発動で圧倒的なダメージを上乗せできます。',
          ru: 'Поскольку Party Power заряжается от **количества** быстрых атак и удваивает **один** заряженный удар, мета рейдов смещается:\n• **Сверхбыстрые атаки (0,5 с):** *Shadow Claw, Dragon Breath, Metal Claw, Lick, Water Gun* заполняют шкалу в два раза быстрее медленных атак.\n• **Мощные 1-бар ульты:** Удвоение *Freeze Shock, Sunsteel Strike, Moongeist Beam, Dragon Ascent* или *Precipice Blades* даёт колоссальный прирост урона за одно нажатие.',
        },
        pokemon: ['Dusk Mane Necrozma', 'Dawn Wings Necrozma', 'White Kyurem', 'Mega Lucario'],
      },
      {
        id: 'mega-and-party-stacking',
        heading: {
          cs: '3. Kombinace Mega/Primal pozadí + Party Power + Přátelství (Až +80 % DPS)',
          en: '3. Stacking Primal Background Buffs + Party Power + Best Friend Bonus',
          ja: '3. ゲンシカイキ控えバフ＋チームパワー＋大親友ボーナスの重ね掛け',
          ru: '3. Комбинация баффа Primal + Party Power + Best Friend (до +80% DPS)',
        },
        content: {
          cs: 'Pro maximální výkon při Duo raidech zkombinujte tři nezávislé násobiče:\n1. **Best Friend Raid Bonus:** +10 % poškození všem útokům po celou dobu raidu.\n2. **Primal / Mega Rayquaza 6. slot trik:** Zatímco běžný Mega Pokémon přidává spojencům +30 % k odpovídajícímu typu jen dokud je na bojišti, **Primal Groudon, Primal Kyogre a Mega Rayquaza** dávají svůj 30% bonus (pro 3 typy počasí!) **po celou dobu raidu, i když sedí až v 6. slotu vašeho týmu**!\n3. **Aktivní Party Power:** Jakmile je tlačítko modré, klepněte na něj těsně před Charged Move — vyvarujte se zběsilého klikání během animace bosse, aby se tlačítko spolehlivě zaregistrovalo.',
          en: 'For effortless Duo clears, stack three independent multipliers simultaneously:\n1. **Best Friend Bonus:** Flat +10% raid damage throughout the battle.\n2. **The Slot-6 Primal / Mega Rayquaza Anchor:** Standard Megas only buff allies while active on the field, but **Primal Groudon, Primal Kyogre, and Mega Rayquaza** apply their +30% weather-trio buff **for the entire battle even while sitting untouched in Slot 6**!\n3. **Clean Party Power Activation:** Tap the glowing Party Power button cleanly right before unleashing your Charged Move rather than spam-tapping mid-dodge.',
          ja: '少人数レイドで最大火力を出すには3つのバフを重ねます：\n1. **大親友ボーナス：** 全攻撃ダメージ+10%。\n2. **6枠目ゲンシカイキ／メガレックウザ配置：** 通常のメガは場に出ている間のみバフ発動ですが、ゲンシグラードン・ゲンシカイオーガ・メガレックウザは**パーティの6枠目に置くだけで戦闘中ずっと味方に+30%バフ**を付与し続けます！\n3. **確実な発動操作：** ゲージ技の直前に落ち着いてチームパワーボタンを1回タップしましょう。',
          ru: 'Для уверенных Duo-рейдов складывайте три независимых множителя:\n1. **Бонус Best Friend:** +10% ко всему урону в рейде.\n2. **Якорь в 6-м слоте (Primal / Mega Rayquaza):** Обычные Меги баффают союзников только на поле, но **Primal Groudon, Primal Kyogre и Mega Rayquaza** дают свой +30% бонус **весь бой, даже просто находясь в 6-м слоте команды**!\n3. **Чёткая активация Party Power:** Нажимайте синюю кнопку ровно перед ультой, не перебивая её хаотичным спамом.',
        },
      },
      {
        id: 'party-challenges-exclusive-rewards',
        heading: {
          cs: '4. Party Challenges & Exkluzivní odměny (Tandemaus, Mega Energie a Eeveelutions)',
          en: '4. Party Challenges: Farming Exclusive Tandemaus, Mega Energy & Rare Encounters',
          ja: '4. チームチャレンジ限定報酬（ワッカネズミ・メガエナジー・ブイズ衣装）',
          ru: '4. Party Challenges: эксклюзивные награды Tandemaus, Мега-энергия и редкие встречи',
        },
        content: {
          cs: 'Kromě raidů nabízí Party Play rotující výzvy (Party Challenges), které mohou odměňovat **Tandemause** (včetně vzácné rodiny 3 myší!), **Eeveeluce v exkluzivních tričkách** (Vaporeon, Jolteon, Flareon, Espeon, Umbreon), **Mega Energii** nebo balíčky Ultra Ballů a Stardustu. Pokud se vám nabídnuté 4 úkoly nelíbí (např. vyžadují 30 Excellent hodů), jednoduše Party rozpusťte a do 10 sekund založte novou — systém vygeneruje čerstvou sadu úkolů s novými odměnami.',
          en: 'Outside of raids, rotating Party Challenges reward exclusive encounters including **Tandemaus** (with a chance to evolve into the ultra-rare Family of Three Maushold), **Kanto/Johto Eeveelutions**, bonus **Mega Energy**, and bundles of Stardust and Ultra Balls. If none of the four offered challenges have appealing rewards, simply disband the party and reform it in 10 seconds to reroll a brand-new set of challenges.',
          ja: 'レイド以外にも、チームチャレンジでは**ワッカネズミ**（超レアな3びきかぞく狙い）、**イーブイ進化系**、**メガエナジー**、大量のほしのすな等を獲得できます。提示された4つのチャレンジ報酬が微妙な場合は、一度チームを解散して10秒で作り直すだけで新しいチャレンジ一覧にリロール可能です。',
          ru: 'Помимо рейдов, задания Party Challenges приносят эксклюзивные встречи с **Tandemaus** (с шансом на редчайшую форму Family of Three), эволюциями Иви, **Мега-энергией** и пылью. Если предложенные 4 задания невыгодны — просто распустите группу и создайте её заново за 10 секунд, чтобы обновить список наград.',
        },
        pokemon: ['Tandemaus', 'Umbreon', 'Espeon'],
      },
    ],
  },
];
