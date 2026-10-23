export interface GuideSection {
  id: string;
  heading: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  content: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  tips?: {
    cs: string[];
    en: string[];
    ja: string[];
    ru: string[];
  };
  pokemon?: string[];
}

export interface GuideArticle {
  id: string;
  slug: string;
  title: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  subtitle: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  category: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  author: string;
  readTime: string;
  updatedAt: string;
  iconName: string;
  imageUrl: string;
  featured?: boolean;
  sections: GuideSection[];
}

export const GUIDES_DATA: GuideArticle[] = [
  {
    "id": "galarian-birds-encounter-catch-guide",
    "slug": "galarian-birds-encounter-catch-guide",
    "iconName": "Target",
    "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10169.png",
    "featured": true,
    "author": "PoGo Events Team",
    "readTime": "11 min",
    "updatedAt": "2026-10-23",
    "category": {
      "cs": "Legendární průvodci & Denní mechaniky",
      "en": "Legendary Guides & Daily Mechanics",
      "ja": "伝説攻略＆デイリー仕様",
      "ru": "Легендарные гайды и механики"
    },
    "title": {
      "cs": "Jak ulovit Galarian Birds v Pokémon GO: Daily Adventure Incense, šance na chycení a triky",
      "en": "How to Catch Galarian Birds in Pokémon GO: Daily Adventure Incense, Catch Odds & Pro Tricks",
      "ja": "ガラル三鳥（フリーザー・サンダー・ファイヤー）捕獲完全攻略：おさんぽおこう仕様、捕獲率＆裏技",
      "ru": "Как поймать Галарских птиц в Pokémon GO: Daily Incense, математика поимки и секреты"
    },
    "subtitle": {
      "cs": "Exkluzivní analýza mechanik Daily Adventure Incense, 0,3% Base Catch Rate, 0% Flee Rate u Shiny variant, Master Ball rozhodovací matice a Origin Dialga trik.",
      "en": "Exhaustive guide on Daily Adventure Incense vectoring, 0.3% Base Catch Rate, the 0% Flee Rate rule for Shiny birds, Master Ball strategy, and Roar of Time chaining.",
      "ja": "おさんぽおこうの移動ベクトル判定、0.3%の基礎捕獲率、色違いの「逃走率0%」ルール、マスターボールの使い所、ディアルガ「ときのほうこう」延長術まで徹底解説。",
      "ru": "Полный разбор Daily Adventure Incense, базовый шанс 0.3%, правило 0% побега для Shiny, выбор Master Ball и продление времени с Origin Dialga."
    },
    "sections": [
      {
        "id": "dai-spawn-mechanics-and-speed",
        "pokemon": [
          "Articuno",
          "Zapdos",
          "Moltres"
        ],
        "heading": {
          "cs": "1. Daily Adventure Incense: Jak funguje generátor spawnů a rychlostní limit",
          "en": "1. Daily Adventure Incense: Spawn Engine & Movement Velocity",
          "ja": "1. おさんぽおこう：出現エンジンと移動速度の絶対条件",
          "ru": "1. Daily Adventure Incense: Механика спавна и скорость движения"
        },
        "content": {
          "cs": "Galarian Articuno (#144), Galarian Zapdos (#145) a Galarian Moltres (#146) jsou nejvzácnější divocí legendární Pokémoni ve hře. Objevují se výhradně prostřednictvím modrého denního kadidla (Daily Adventure Incense — DAI), které každý trenér dostává zdarma jednou denně na 15 minut.\n\nKlíčové principy generátoru spawnů:\n• 30sekundový cyklus: Hra kontroluje vaši GPS polohu přesně každých 30,0 sekund. Pokud jste se za tuto dobu pohnuli o alespoň 40 až 50 metrů v přímém směru od předchozího bodu, vygeneruje se nový spawn. Pokud stojíte nebo se vracíte zpět na stejné místo, spawn se nespustí.\n• Optimální tempo chůze: Ideální rychlost je 7,0 až 9,5 km/h (velmi svižná chůze, jogging nebo pomalá jízda na kole). Minimální prahová rychlost je cca 5,4 km/h.\n• Šance na setkání: Každý jednotlivý spawn slot z DAI má přibližně 0,8 % až 1,0 % šanci, že se namísto běžného Pokémona vylosuje Galarian pták (~0,33 % pro konkrétní druh). Během optimální 15minutové procházky s 28 až 30 spawny je kumulativní šance na potkání alespoň jednoho ptáka přibližně 22,4 % — v průměru se s ptákem setkáte jednou za každých 4 až 5 dní aktivního používání DAI.\n• Vliv Weather Boostu: Větrné počasí (Windy) posiluje všechny tři ptáky (sdílejí Flying typ; Articuno navíc Psychic a Moltres Dark). Zapdos je navíc posilován v zataženu (Cloudy) díky Fighting typu. Weather Boost zvyšuje rozsah úrovní z Level 1–30 na Level 31–35 s garantovanou IV podlahou 4/4/4. Vyšší level však drasticky ztěžuje odchyt a posouvá CP nad limit pro Great League.",
          "en": "Galarian Articuno (#144), Galarian Zapdos (#145), and Galarian Moltres (#146) are the rarest wild legendary spawns in Pokémon GO. They appear exclusively through Daily Adventure Incense (DAI), a free 15-minute daily item granted to every trainer.\n\nCore spawn mechanics:\n• 30-Second Cadence: The game evaluates your GPS displacement vector every 30.0 seconds. A new spawn triggers only if you have traveled at least 40 to 50 meters in a straight line from your previous checkpoint. Standing still or looping produces zero spawns.\n• Ideal Velocity Floor: The sweet spot is 7.0 to 9.5 km/h (brisk walking, jogging, or slow cycling), with a minimum speed floor of ~5.4 km/h.\n• Encounter Odds: Each DAI spawn slot has a ~0.8% to 1.0% probability of rolling a Galarian Bird (~0.33% per specific bird). In an optimal 28-spawn walk, the cumulative session odds of seeing at least one bird are ~22.4% — an average of one encounter every 4 to 5 daily incense sessions.\n• Weather Boost Dynamics: Windy weather boosts all three birds due to their Flying secondary typing. Cloudy boosts Zapdos (Fighting), while Fog boosts Moltres (Dark). Weather Boost elevates spawn levels to Level 31–35 with a 4/4/4 IV floor, but higher levels significantly lower catch probability and disqualify spawns from Great League (<1500 CP).",
          "ja": "ガラルフリーザー（#144）、ガラルサンダー（#145）、ガラルファイヤー（#146）は、Pokémon GOで最も希少な野生の伝説ポケモンです。毎日1回無料で配られる15分間の「おさんぽおこう」でのみ出現します。\n\n出現エンジンの重要仕様：\n• 30秒周期判定：GPSの位置ベクトルが30秒ごとに計測され、直前の位置から直線距離で40〜50m以上移動している場合のみ新規ポケモンが出現します。立ち止まりや往復では出現しません。\n• 最適移動速度：時速7.0〜9.5km（早歩き、ジョギング、またはゆっくりとした自転車走行）が理想的です。最低速度は約5.4km/hです。\n• 出現確率：おさんぽおこうの各出現枠でガラル三鳥が選ばれる確率は約0.8%〜1.0%（各鳥単体では約0.33%）です。1回のおこうで28匹以上出現させた場合、いずれかの鳥に遭遇できる確率は約22.4%（4〜5回のおこうにつき1回遭遇する計算）となります。\n• 天候ブースト：強風（ひこうタイプ共有）、曇り（サンダーのかくとう）、霧（ファイヤーのあく）でブーストされます。PL31〜35・個体値4/4/4保証となる一方、捕獲率が低下しスーパーリーグ（CP1500以下）の上限を超えてしまいます。",
          "ru": "Galarian Articuno (#144), Galarian Zapdos (#145) и Galarian Moltres (#146) — самые редкие дикие легендарные покемоны в Pokémon GO. Они появляются исключительно при использовании синего Daily Adventure Incense (DAI), выдаваемого раз в день на 15 минут.\n\nКлючевые принципы спавна:\n• 30-секундный цикл: Игра замеряет ваше перемещение каждые 30 секунд. Новый покемон появится только в том случае, если вы сместились минимум на 40–50 метров по прямой. Стояние на месте или развороты сбивают спавн.\n• Скорость движения: Оптимальная скорость — 7,0–9,5 км/ч (быстрый шаг или легкий бег). Минимальный порог — ~5,4 км/ч.\n• Шанс появления: В каждом слоте шанс появления птицы составляет ~0,8–1,0% (~0,33% на конкретный вид). За 28 спавнов вероятность встретить птицу достигает ~22,4% (в среднем 1 встреча на каждые 4–5 дней).\n• Погодный буст: Ветреная погода (Windy) усиливает всех троих птиц. Облачность (Cloudy) усиливает Zapdos, туман (Fog) — Moltres. Погода поднимает уровень до 31–35 с гарантией IV 4/4/4, но значительно снижает шанс поимки."
        },
        "tips": {
          "cs": [
            "Plánujte trasu v přímé linii (dlouhé ulice, parkové aleje, cyklostezky) bez křižovatek a prudkých zatáček, aby GPS neztrácela lineární vzdálenost.",
            "Jakmile se Galarian pták na mapě objeví, okamžitě zastavte chůzi a zůstaňte stát na místě po celou dobu chytání, abyste předešli speed-locku."
          ],
          "en": [
            "Plan straight-line walking routes (long uninterrupted boulevards or bike paths) to maximize GPS displacement vectors every 30 seconds.",
            "The second a Galarian Bird spawns, immediately stop moving and stand completely still during the entire encounter to prevent speed-lock."
          ],
          "ja": [
            "30秒ごとの直線距離を最大化するため、曲がり角のない長い直線道路やサイクリングロードを歩きましょう。",
            "ガラル三鳥が出現した瞬間、その場に完全に立ち止まり、捕獲が終わるまで移動しないことが鉄則です（速度制限による逃走防止）。"
          ],
          "ru": [
            "Планируйте маршрут строго по прямой (длинные аллеи, набережные) без резких поворотов для максимального расстояния по GPS.",
            "В момент появления птицы немедленно остановитесь и стойте неподвижно до конца поимки, чтобы избежать спидлока."
          ]
        }
      },
      {
        "id": "catch-and-flee-mathematics",
        "pokemon": [
          "Articuno",
          "Zapdos",
          "Moltres"
        ],
        "heading": {
          "cs": "2. Matematika chycení a útěku: 0,3% Base Catch Rate a 90% Flee Rate",
          "en": "2. Catch & Flee Engineering: 0.3% Base Catch Rate & 90% Flee Rate",
          "ja": "2. 捕獲と逃走の計算式：基礎捕獲率0.3%・逃走率90%の真実",
          "ru": "2. Математика поимки и побега: Базовый шанс 0.3% и 90% побег"
        },
        "content": {
          "cs": "Důvodem, proč jsou Galarian ptáci tak legendárně těžko ulovitelní, jsou dva extrémní parametry v kódu hry:\n• Base Catch Rate (BCR = 0,3 %): Běžní raidoví boti mají BCR 2,0 %. Galarian ptáci jsou tedy téměř 7× těžší na chycení než Mewtwo či Rayquaza v raidu!\n• Base Flee Rate (BFR = 90 %): Při každém neúspěšném pokusu má pták 90% šanci, že okamžitě uteče. V průměru máte pouze 1,11 hodu na celé setkání!\n\nReálné šance s maximálními bonusy (Ultra Ball 2×, Golden Razz Berry 2,5×, Curved Excellent 2×, obě Platinové medaile typů 1,4× = celkový násobič 23,8×):\n• Level 1 (CP pod 50): 31,8 % na hod (kumulativně ~34,1 % za celý encounter)\n• Level 15 (~1 000–1 500 CP): 6,7 % na hod\n• Level 20 (~1 500–2 000 CP): 5,8 % na hod\n• Level 25 (Weather Boost): 5,2 % na hod\n• Level 30 (Běžné maximum): 4,8 % na hod\n• Level 35 (Weather Boost maximum): 4,6 % na hod\n\nPokud byste hodili obyčejný červený Pokéball rovným hodem bez bobule, šance na chycení u Levelu 30 je pouhých 0,2 %!",
          "en": "Two extreme hard-coded parameters define the near-impossible capture difficulty of Galarian Birds:\n• Base Catch Rate (BCR = 0.3%): Standard raid legendaries feature a 2.0% BCR. Galarian Birds are nearly 7 times harder to catch than a 5★ raid boss!\n• Base Flee Rate (BFR = 90%): Every breakout carries a 90% chance that the bird immediately flees. Trainers average a minuscule 1.11 throws per encounter!\n\nActual catch odds with maximum multipliers (Ultra Ball 2x, Golden Razz 2.5x, Curved Excellent 2x, dual Platinum medals 1.4x = total 23.8x multiplier):\n• Level 1 (CP under 50): 31.8% single throw (~34.1% cumulative encounter odds)\n• Level 15 (~1,000–1,500 CP): 6.7% single throw\n• Level 20 (~1,500–2,000 CP): 5.8% single throw\n• Level 25 (Weather Boosted): 5.2% single throw\n• Level 30 (Regular Wild Cap): 4.8% single throw\n• Level 35 (Weather Boosted Cap): 4.6% single throw\n\nThrowing a standard red Poké Ball straight without berries yields a microscopic 0.2% catch probability at Level 30!",
          "ja": "ガラル三鳥の捕獲が極めて困難である理由は、ゲームデータ内の2つの極端なパラメーターにあります：\n• 基礎捕獲率（BCR = 0.3%）：通常の伝説レイドボスは2.0%です。ガラル三鳥はレイドのミュウツーやレックウザより約6.7倍も捕まりにくく設定されています。\n• 逃走率（BFR = 90%）：ボールから抜け出した場合、90%の確率で即座に煙を出して逃亡します。1回の遭遇につき平均1.11回しかボールを投げられません！\n\n最高補正時（ハイパーボール2倍×きんのズリのみ2.5倍×カーブ1.7倍×エクセレント約2倍×両タイププラチナメダル1.4倍＝合計約23.8倍）の捕獲率：\n• PL1（CP50以下）：1投あたり31.8%（遭遇全体の累計捕獲率 約34.1%）\n• PL15（CP1000〜1500）：1投あたり6.7%\n• PL20（CP1500〜2000）：1投あたり5.8%\n• PL25（天候ブースト）：1投あたり5.2%\n• PL30（通常野生上限）：1投あたり4.8%\n• PL35（天候ブースト上限）：1投あたり4.6%\n\nズリのみなし・普通のモンスターボールのストレート投げでは、PL30でわずか0.2%しかありません！",
          "ru": "Два экстремальных параметра в коде игры определяют запредельную сложность поимки Galarian птиц:\n• Base Catch Rate (BCR = 0,3%): Стандартные рейдовые легенды имеют 2,0%. Galarian птиц почти в 7 раз труднее поймать, чем легендарного босса 5★!\n• Base Flee Rate (BFR = 90%): При каждом выбивании из покебола шанс побега составляет 90%. В среднем у тренера есть всего 1,11 броска за всю встречу!\n\nРеальные шансы при максимальных множителях (Ultra Ball 2x + Golden Razz 2.5x + Curved Excellent 2x + платиновые медали 1.4x = 23.8x):\n• Level 1 (CP до 50): 31,8% за бросок (~34,1% за всю встречу)\n• Level 15 (~1 000–1 500 CP): 6,7% за бросок\n• Level 20 (~1 500–2 000 CP): 5,8% за бросок\n• Level 25 (Weather Boost): 5,2% за бросок\n• Level 30 (Дикий максимум): 4,8% за бросок\n• Level 35 (Максимум с погодой): 4,6% за бросок\n\nПрямой бросок красного покебола без ягод на 30-м уровне дает ничтожные 0,2% шанса!"
        },
        "tips": {
          "cs": [
            "Nikdy neházejte bez Golden Razz Berry a Ultra Ballu — každé procento multiplikátoru rozhoduje.",
            "Platinové medaile obou typů (např. Flying + Dark pro Moltrese) poskytují trvalý 1,40× násobič, který je naprosto klíčový pro překročení 5% hranice chycení."
          ],
          "en": [
            "Never throw without a Golden Razz Berry and an Ultra Ball — every single multiplier point is vital.",
            "Dual Platinum medals (e.g., Flying + Dark for Moltres) provide a permanent 1.40x multiplier that is essential to push capture odds above 5%."
          ],
          "ja": [
            "きんのズリのみとハイパーボールなしでは絶対に投げないでください。倍率の積み重ねがすべてです。",
            "両タイプのプラチナメダル（ファイヤーならひこう＋あく）は常時1.40倍の補正をもたらし、5%の壁を越えるために不可欠です。"
          ],
          "ru": [
            "Никогда не бросайте без Golden Razz Berry и Ultra Ball — каждый множитель на счету.",
            "Платиновые медали обоих типов (например, Flying + Dark для Moltres) дают постоянный бонус 1.40x, без которого шанс поимки падает в разы."
          ]
        }
      },
      {
        "id": "shiny-galarian-birds-zero-flee",
        "pokemon": [
          "Articuno",
          "Zapdos",
          "Moltres"
        ],
        "heading": {
          "cs": "3. Zlaté pravidlo pro Shiny: 0% Flee Rate a Kanto barevné palety",
          "en": "3. The Golden Rule: 0% Flee Rate for Shiny Galarian Birds",
          "ja": "3. 最重要ルール：色違いガラル三鳥は逃走率0%！",
          "ru": "3. Золотое правило: Shiny Галарские птицы имеют 0% шанс побега"
        },
        "content": {
          "cs": "Od události Galarian Expedition (říjen 2024) lze v Daily Adventure Incense narazit na Shiny varianty všech tří Galarian ptáků. A platí pro ně to nejdůležitější pravidlo celé hry:\n\n⭐ SHINY GALARIAN BIRDS MAJÍ 0% FLEE RATE!\nZatímco běžný Galarian pták po vyskočení z pokéballu na 90 % uteče, Shiny Galarian pták po neúspěšném hodu NIKDY NEUTEČE. Můžete na něj házet Ultra Bally a Golden Razz Berries tak dlouho, dokud ho nechytíte (jedinou výjimkou je aktivace speed-locku nebo vyčerpání zásob pokéballů).\n\n⚠️ Z toho plyne naprosto zásadní pravidlo:\nNIKDY NEPLÝTVEJTE MASTER BALL NA SHINY GALARIAN PTÁKA!\nPoužití Master Ballu na Shiny ptáka je okamžité zahození nejcennějšího předmětu ve hře, protože pták vám neuteče ani při použití běžných Ultra Ballů.\n\nVizuální vzhled Shiny variant vzdává poctu původním kanto barvám:\n• Shiny Galarian Articuno: Namísto fialové má zářivě světle modré ledové peří.\n• Shiny Galarian Zapdos: Namísto oranžovo-černé má zářivě žluté peří s oranžovým zobákem a nohama.\n• Shiny Galarian Moltres: Namísto purpurově černé má zlaté tělo obklopené neonově růžovými plameny.",
          "en": "Since the Galarian Expedition event (October 2024), Shiny variants of all three Galarian Birds roam through Daily Adventure Incense. They feature the most important rule in the entire game:\n\n⭐ SHINY GALARIAN BIRDS HAVE A 0% FLEE RATE!\nWhile non-shiny birds flee on 90% of breakouts, a Shiny Galarian Bird will NEVER flee after breaking out. You can patiently throw Ultra Balls and Golden Razz Berries until it stays inside (the only hazards are GPS speed-lock or running out of balls).\n\n⚠️ This dictates an essential tactical rule:\nNEVER WASTE A MASTER BALL ON A SHINY GALARIAN BIRD!\nUsing a Master Ball on a Shiny Galarian Bird is an immediate waste of an irreplaceable item, because the bird has zero flee probability.\n\nVisuals homage classic Kanto regional palettes:\n• Shiny Galarian Articuno: Swaps deep magenta plumage for classic pale ice-blue feathers.\n• Shiny Galarian Zapdos: Replaces dark runner tones with vibrant electric yellow plumage and bright orange beak/legs.\n• Shiny Galarian Moltres: Replaces crimson-black flames with an ethereal golden body enveloped in vibrant hot-pink fire.",
          "ja": "2024年10月の「ガラル探検」イベント以降、おさんぽおこうで色違いのガラル三鳥が出現するようになりました。そしてここには最も重要な仕様が存在します：\n\n⭐ 色違いガラル三鳥は逃走率0%（絶対に逃げない）！\n通常色はボールから出ると90%の確率で逃げますが、色違いのガラル三鳥はボールから抜け出しても一切逃げません！ボールが尽きるか速度制限にかからない限り、ハイパーボール＋きんのズリのみで捕まるまで何十回でも投げ続けることができます。\n\n⚠️ これにより鉄則が導き出されます：\n色違いガラル三鳥にマスターボールを使ってはいけません！\n逃げないポケモンにマスターボールを消費するのは、ゲーム内で最も貴重なアイテムの無駄遣いです。\n\n色違いのカラーリングは初代カントーの三鳥へのオマージュです：\n• 色違いガラルフリーザー：紫ではなく、初代フリーザーのような淡いアイスブルー。\n• 色違いガラルサンダー：黒橙ではなく、初代サンダーを彷彿とさせる鮮やかなエレクトリックイエロー。\n• 色違いガラルファイヤー：黒紫ではなく、黄金色のボディにネオンピンクの炎をまとっています。",
          "ru": "С ивента Galarian Expedition (октябрь 2024) в Daily Adventure Incense можно встретить Shiny версии всех трех Galarian птиц. Для них действует главное правило игры:\n\n⭐ У SHINY GALARIAN ПТИЦ ШАНС ПОБЕГА РАВЕН 0%!\nВ то время как обычная птица сбегает с вероятностью 90% при выбивании, Shiny птица НЕ СБЕЖИТ НИКОГДА. Вы можете спокойно кидать Ultra Ball и Golden Razz до победного конца (единственный риск — спидлок или нехватка покеболов).\n\n⚠️ Главное тактическое правило:\nНИКОГДА НЕ ТРАТЬТЕ MASTER BALL НА SHINY GALARIAN ПТИЦУ!\nБросать Master Ball в покемона, который не может убежать — пустая трата редчайшего предмета.\n\nЦветовая палитра Shiny отсылает к оригинальным птицам Канто:\n• Shiny Galarian Articuno: Вместо пурпурного — ледяной бледно-голубой окрас.\n• Shiny Galarian Zapdos: Вместо темного — ярко-желтое оперение с оранжевым клювом.\n• Shiny Galarian Moltres: Вместо черного — золотое тело с ярко-розовым пламенем."
        },
        "tips": {
          "cs": [
            "Při setkání se Shiny Galarian ptákem nepanikařte a v klidu krmte Golden Razz Berries a házejte Ultra Bally — máte tolik pokusů, kolik máte míčků v batohu.",
            "Ujistěte se, že máte v batohu vždy rezervu alespoň 30+ Ultra Ballů, aby vám při setkání se Shiny nedošla munice."
          ],
          "en": [
            "Stay calm upon encountering a shiny Galarian bird — take your time feeding Golden Razz Berries and throwing Ultra Balls, as you have unlimited attempts.",
            "Always maintain a safety cushion of at least 30+ Ultra Balls in your bag so you never run out of throws during a shiny encounter."
          ],
          "ja": [
            "色違いが出ても焦らず、きんのズリのみを使いながら落ち着いてハイパーボールを投げてください。逃げる心配はありません。",
            "不意の色違い遭遇に備えて、バッグには常に最低30個以上のハイパーボールを常備しておきましょう。"
          ],
          "ru": [
            "При встрече с Shiny птицей не паникуйте — спокойно кормите Golden Razz и кидайте Ultra Ball. Попыток столько, сколько мячей в сумке.",
            "Всегда держите в инвентаре запас минимум 30+ Ultra Ball, чтобы мячи не закончились в самый неподходящий момент."
          ]
        }
      },
      {
        "id": "master-ball-decision-matrix",
        "pokemon": [
          "Articuno",
          "Zapdos",
          "Moltres"
        ],
        "heading": {
          "cs": "4. Kdy použít Master Ball: Rozhodovací matice a 100% IV (Hundo) hodnoty",
          "en": "4. Master Ball Strategic Matrix: Hundo CP Checkpoints & PvP IVs",
          "ja": "4. マスターボール判断基準：個体値100%（Hundo）CPラインとPvP",
          "ru": "4. Когда бросать Master Ball: CP для 100% IV (Hundo) и PvP"
        },
        "content": {
          "cs": "Master Ball zaručuje 100% jistotu odchytu a zcela obchází BCR i Flee Rate. Jelikož je však jeho množství ve hře extrémně limitované (zpravidla 1 kus za speciální sezónní výzkum), jeho použití vyžaduje přísnou disciplínu.\n\nROZHODOVACÍ MATICE PRO POUŽITÍ MASTER BALLU:\n\n1. KATEGORIE S — OKAMŽITĚ HODIT MASTER BALL:\n• Vysoké CP blížící se 100% IV (Hundo) na Levelu 30 (bez boostu) nebo Levelu 35 (s Weather Boostem). Zde je šance Ultra Ballem pod 5 % a útěk na 90 % jistý:\n  - Galarian Articuno: 3 077 CP (L30 Hundo) / 3 334 CP (L35 WB Hundo)\n  - Galarian Zapdos: 3 042 CP (L30 Hundo) / 3 295 CP (L35 WB Hundo)\n  - Galarian Moltres: 2 715 CP (L30 Hundo) / 2 941 CP (L35 WB Hundo)\n• Poslední chybějící pták do kompletní trojice v Pokédexu, pokud má vysoké CP.\n\n2. KATEGORIE B — ZVÁŽIT PODLE PREFERENCÍ:\n• CP těsně pod 1 500 CP (kolem 1 450–1 490 CP) s potenciálem na špičkový PvP rank v Great League.\n\n3. KATEGORIE NIKDY — MASTER BALL ROZHODNĚ NEHÁZET:\n• Jakýkoliv Shiny Galarian pták (má 0% flee rate, chytíte ho Ultra Ballem).\n• Level 1 ptáci (CP pod 50) — šance na chycení Ultra Ballem je přes 30 %!\n• Pokud se pohybujete v jedoucím autě či autobuse (hrozí aktivní speed-lock).",
          "en": "The Master Ball guarantees a 100% capture rate, bypassing BCR and BFR entirely. Because Master Balls are exceptionally scarce (typically 1 per seasonal Special Research), using one requires strict strategic discipline.\n\nMASTER BALL DECISION MATRIX:\n\n1. TIER S — IMMEDIATE MASTER BALL CANDIDATES:\n• High-CP non-shiny spawns matching 100% IV (Hundo) checkpoints at Level 30 (unboosted) or Level 35 (Weather Boosted), where Ultra Ball catch rate drops below 5% and breakout flee rate is 90%:\n  - Galarian Articuno: 3,077 CP (L30 Hundo) / 3,334 CP (L35 WB Hundo)\n  - Galarian Zapdos: 3,042 CP (L30 Hundo) / 3,295 CP (L35 WB Hundo)\n  - Galarian Moltres: 2,715 CP (L30 Hundo) / 2,941 CP (L35 WB Hundo)\n• The final missing bird required to complete your trio Pokédex entry with high CP.\n\n2. TIER B — SITUATIONAL / PVP CANDIDATES:\n• CP hovering just below 1,500 CP (around 1,450–1,490 CP) with elite Great League PvP stat distribution potential.\n\n3. NEVER — DO NOT THROW MASTER BALL:\n• ANY Shiny Galarian Bird (0% flee rate — save your Master Ball!)\n• Level 1 birds (CP under 50) — capture probability exceeds 31% with Ultra Ball and Golden Razz!\n• While riding in moving transit (speed-lock invalidates captures).",
          "ja": "マスターボールは捕獲率100%を保証し、基礎捕獲率や逃走率の判定を完全に無視します。しかし所持数が極めて限られているため（通常シーズンごとのスペシャルリサーチで1個のみ）、使用には厳格な基準が必要です。\n\nマスターボール判断マトリクス：\n\n1. Sランク（即座に使用推奨）：\n• 通常色でPL30（通常）またはPL35（天候ブースト）の個体値100%（Hundo）に近い超高CP個体：\n  - ガラルフリーザー：CP 3,077（PL30 100%）/ CP 3,334（PL35 100%）\n  - ガラルサンダー：CP 3,042（PL30 100%）/ CP 3,295（PL35 100%）\n  - ガラルファイヤー：CP 2,715（PL30 100%）/ CP 2,941（PL35 100%）\n• ガラル三鳥で最後の1匹となっており、高CPで図鑑をコンプリートしたい場合。\n\n2. Bランク（PvP重視なら検討）：\n• CP1500未満（CP1450〜1490前後）でスーパーリーグ用の上位PvP個体値が期待できる個体。\n\n3. 絶対に使ってはいけないケース：\n• 色違いのガラル三鳥全般（逃走率0%のためハイパーボールで捕獲可能）。\n• PL1個体（CP50以下） — ハイパーボール＋きんのズリで30%以上の確率で捕獲可能。\n• 車や電車での移動中（速度制限による逃走リスク）。",
          "ru": "Master Ball гарантирует 100% поимку, полностью обходя BCR и Flee Rate. Поскольку Master Ball выдается крайне редко (обычно 1 шт. за сезонные спецквесты), тратить его нужно строго по правилам.\n\nМАТРИЦА РЕШЕНИЙ ДЛЯ MASTER BALL:\n\n1. ТИР S — БРОСАТЬ СРАЗУ:\n• Высокий CP обычной птицы, близкий к 100% IV (Hundo) на 30-м или 35-м уровне:\n  - Galarian Articuno: 3 077 CP (L30 Hundo) / 3 334 CP (L35 WB Hundo)\n  - Galarian Zapdos: 3 042 CP (L30 Hundo) / 3 295 CP (L35 WB Hundo)\n  - Galarian Moltres: 2 715 CP (L30 Hundo) / 2 941 CP (L35 WB Hundo)\n• Последняя недостающая птица для закрытия трио в Покедексе при высоком CP.\n\n2. ТИР B — ДЛЯ ФАНАТОВ PVP:\n• CP чуть ниже 1 500 (1 450–1 490 CP) с потенциалом на высокий ранг в Great League.\n\n3. НИКОГДА НЕ БРОСАТЬ:\n• В ЛЮБУЮ Shiny Galarian птицу (у нее 0% шанс побега!).\n• В птиц 1-го уровня (CP до 50) — шанс поимки Ultra Ball превышает 31%!\n• Во время движения в транспорте (риск спидлока)."
        },
        "tips": {
          "cs": [
            "Zapamatujte si orientační hranice 100% IV pro Level 30 (Articuno 3077, Zapdos 3042, Moltres 2715) — pokud potkáte ptáka s takovým CP, neváhejte a použijte Master Ball.",
            "Před hodem Master Ballu zkontrolujte, zda máte stabilní internetové připojení a zda nestojíte v zóně slabého GPS signálu."
          ],
          "en": [
            "Memorize the Level 30 Hundo CP thresholds (Articuno 3,077, Zapdos 3,042, Moltres 2,715) — encountering a bird with these numbers is the premier Master Ball scenario.",
            "Ensure you have a rock-solid cellular connection and zero GPS drift before confirming your Master Ball throw."
          ],
          "ja": [
            "PL30の100% CP（フリーザー3077、サンダー3042、ファイヤー2715）を頭に入れておき、この数値に近い高CPが出た時こそマスターボールの出番です。",
            "マスターボールを投げる前に、通信状態が安定していることを必ず確認してください。"
          ],
          "ru": [
            "Запомните значения 100% IV для 30-го уровня (Articuno 3077, Zapdos 3042, Moltres 2715) — это главный повод для Master Ball.",
            "Перед броском Master Ball убедитесь в стабильном интернет-соединении и отсутствии GPS-дрифта."
          ]
        }
      },
      {
        "id": "pro-tactics-speedlock-and-dialga",
        "pokemon": [
          "Dialga",
          "Articuno",
          "Zapdos",
          "Moltres"
        ],
        "heading": {
          "cs": "5. Pokročilé taktiky: Anti-Speed Lock, autocatchery a Roar of Time trik",
          "en": "5. Pro Field Tactics: Anti-Speed Lock, Auto-Catcher Hazard & Dialga Roar of Time",
          "ja": "5. 上級テクニック：速度制限トラップ、自動捕獲器の罠＆ときのほうこう延長術",
          "ru": "5. Продвинутые тактики: Защита от Speed Lock, ловушка автолокера и Roar of Time"
        },
        "content": {
          "cs": "Pro maximalizaci úspěšnosti lovu Galarian ptáků existují 4 zásadní pokročilé mechaniky:\n\n1. Past zvaná Speed Lock (rychlostní limit):\nPokud hrajete v autobuse, autě nebo vlaku při rychlosti nad 80 km/h, nebo pokud se od okamžiku kliknutí na ptáka vzdálíte o více než 250 metrů od souřadnic spawnu, server aktivuje bezpečnostní speed-lock. Míček se jednou pohne a Pokémon s 100% jistotou okamžitě uteče. Zlaté pravidlo: jakmile pták vyskočí, okamžitě zastavte chůzi a stůjte na místě až do konce odchytu.\n\n2. Katastrofa s Bluetooth Auto-catchery (Pokémon GO Plus+ / Gotcha):\nAutocatcher hodí jeden jediný červený Pokéball rovným hodem bez bobule (šance na chycení 0,2 %) a při neúspěchu encounter okamžitě ukončí. Na 99,8 % vám ptáka okamžitě odežene ještě dříve, než se na něj stihnete podívat na displeji! Před aktivací DAI vždy v nastavení Bluetooth příslušenství vypněte automatické chytání Pokémonů.\n\n3. Circle Lock specifika pro jednotlivé ptáky:\n• Articuno (vzdálenost 5,0 m): Vznáší se ve vzduchu. Zamkněte kruh na cca 20 %, vyčkejte, až po útočné animaci klesne zpět do spodní polohy, a házejte na vrcholu máchnutí křídel.\n• Zapdos (vzdálenost 3,5 m): Pozemní běžec velmi blízko kameře. Vyžaduje krátký a rychlý švih — pozor na přehození!\n• Moltres (vzdálenost 6,0 m): Nejdále od hráče. Oheň na křídlech není součástí hitboxu! Je nutný dlouhý vysoký oblouk mířený přesně do středu trupu.\n\n4. Adventure Effect: Roar of Time (Origin Dialga):\nAktivace efektu Roar of Time za 5 000 Stardustu a 5 Dialga Candies zmrazí odpočet DAI na 6 minut, přičemž spawny z pohybu dál normálně fungují! Efekt lze řetězit až na 2 hodiny. Prodloužením DAI na 75 minut získáte až 148 spawnů v kuse a šance potkat alespoň jednoho ptáka v daném dni vzroste na neuvěřitelných 73,9 %!",
          "en": "Four elite technical mechanics determine long-term success when hunting Galarian Birds:\n\n1. The Speed Lock Trap:\nPlaying from moving transit (buses, cars, trains) traveling over 80 km/h or moving more than 250 meters away from the initial spawn coordinate triggers a server-side speed lock. The ball shakes once and the Pokémon flees with 100% certainty. The golden field rule: the moment a bird spawns, halt immediately and stand completely still until capture concludes.\n\n2. The Auto-Catcher Catastrophe (Pokémon GO Plus+ / Gotcha):\nAuto-catchers throw a single, straight red Poké Ball with no berry (0.2% catch rate) and abort immediately on failure. They will flee your Galarian Bird with 99.8% certainty before you even see it on the map! Always toggle off 'Identify Pokémon' or auto-catch in accessory settings before lighting DAI.\n\n3. Bird-Specific Target Geometries & Circle Lock:\n• Articuno (5.0m distance): Floats vertically. Lock target circle to ~20%, wait for lower resting position, throw during wing sweep peak.\n• Zapdos (3.5m distance): Ground runner close to the screen. Requires a short, fast flick — do not overthrow!\n• Moltres (6.0m distance): Deepest model. Flaming plumage does not count toward hitbox! Throw a high, powerful arc aimed directly at chest core.\n\n4. Origin Dialga Adventure Effect (Roar of Time):\nActivating Roar of Time for 5,000 Stardust + 5 Dialga Candies pauses the DAI timer for 6 minutes while walking spawns continue uninterrupted. Chaining this effect to 75 minutes yields up to 148 spawns and elevates single-day Galarian bird encounter probability to an astonishing 73.9%!",
          "ja": "ガラル三鳥ハントで勝率を最大化するための4つの上級テクニック：\n\n1. 速度制限（スピードロック）の罠：\n時速80km以上の乗り物に乗っている場合、または出現地点から250m以上離れてボールを投げた場合、サーバーの速度制限により1揺れで100%逃亡します。鉄則：鳥が出現したらその場に完全に静止してください。\n\n2. 自動捕獲器（GO Plus+ / Gotcha）の悲劇：\n自動捕獲デバイスはズリのみなしの赤ボールを1球だけストレートで投げるため、捕獲率はわずか0.2%です。99.8%の確率で画面をタップする前に逃走させてしまいます！おさんぽおこう使用前は、設定から「ポケモンの通知」を必ずオフにしてください。\n\n3. 三鳥ごとのサークルロック特徴：\n• フリーザー（距離5.0m）：滞空型。サークルを約20%に固定し、攻撃モーション後の下降タイミングに合わせて翼の頂点で投げます。\n• サンダー（距離3.5m）：地上接近型。手前にいるため奥に投げすぎないよう、短く素早いフリックで投げます。\n• ファイヤー（距離6.0m）：最遠型。翼の炎には当たり判定がありません！胸の中心部を狙い、高く力強い大きな弧を描いて投げてください。\n\n4. オリジンディアルガのフィールド効果「ときのほうこう」：\nほしのすな5,000＋ディアルガのアメ5個で、おさんぽおこうのタイマーを6分間停止できます（移動による出現は継続）。これを重ねがけして75分間（148匹出現）まで延長すると、その日ガラル三鳥に遭遇できる確率はなんと73.9%まで跳ね上がります！",
          "ru": "Четыре главных продвинутых правила для успешной охоты на Galarian птиц:\n\n1. Ловушка Speed Lock:\nИгра в транспорте на скорости выше 80 км/ч или удаление более чем на 250 м от точки спавна активирует спидлок: покебол качнется один раз и птица со 100% гарантией сбежит. Правило: при спавне птицы немедленно остановитесь и стойте на месте.\n\n2. Катастрофа с автолокерами (Pokémon GO Plus+ / Gotcha):\nАвтолокер бросает один красный покебол без ягод (шанс 0,2%) и при неудаче сразу закрывает встречу. В 99,8% случаев он спустит вашу птицу до того, как вы успеете нажать на нее на экране! Перед включением DAI всегда отключайте автопоимку в настройках.\n\n3. Техника Circle Lock для каждой птицы:\n• Articuno (дистанция 5,0 м): Парит в воздухе. Зафиксируйте круг на 20%, дождитесь опускания после атаки и бросайте на взмахе крыльев.\n• Zapdos (дистанция 3,5 м): Стоит очень близко к экрану. Нужен короткий и резкий свайп, чтобы не перебросить.\n• Moltres (дистанция 6,0 м): Дальше всех. Пламя на крыльях не входит в хитбокс! Нужен высокий крутой бросок точно в центр груди.\n\n4. Adventure Effect: Roar of Time (Origin Dialga):\nАктивация эффекта за 5 000 пыли и 5 конфет Dialga замораживает таймер DAI на 6 минут при сохранении спавнов от шагов. Продление DAI до 75 минут (148 спавнов) поднимает вероятность встретить птицу в этот день до внушительных 73,9%!"
        },
        "tips": {
          "cs": [
            "Vždy před zapnutím Daily Adventure Incense dvakrát zkontrolujte, že máte vypnutý autocatcher v nastavení Pokémon GO Plus+.",
            "Pokud máte zásobu Stardustu a Dialga Candy, naplánujte si 'safari procházku' a prodlužte DAI pomocí Roar of Time na 45 až 60 minut."
          ],
          "en": [
            "Double-check that auto-catch is toggled off in accessory settings before lighting your Daily Adventure Incense.",
            "If you have surplus Stardust and Dialga Candy, chain Roar of Time to extend your DAI walk to 45–60 minutes for a high-probability hunt."
          ],
          "ja": [
            "おさんぽおこうを使う前に、オートキャッチャーの自動捕獲がオフになっていることを必ず再確認してください。",
            "ディアルガのアメとすなに余裕があるなら、「ときのほうこう」で45〜60分に延長して週末に集中ハントするのが最も効果的です。"
          ],
          "ru": [
            "Перед включением Daily Adventure Incense дважды проверьте, отключена ли автопоимка в настройках покебол-аксессуара.",
            "Если есть запас пыли и конфет Dialga, продлите DAI через Roar of Time до 45–60 минут для максимальной вероятности встречи."
          ]
        }
      }
    ]
  },
  {
    id: "weekly-hidden-mini-events-guide",
    slug: "weekly-hidden-mini-events-guide",
    iconName: "Calendar",
    imageUrl: "https://cdn.leekduck.com/assets/img/icons/weekly_challenge_icon.png",
    featured: true,
    author: "PoGo Events Team",
    readTime: "9 min",
    updatedAt: "2026-08-15",
    category: {
      cs: "Týdenní rutiny & Minieventy",
      en: "Weekly Habits & Mini-Events",
      ja: "週間ルーティン＆ミニイベント",
      ru: "Еженедельные Рутины и Мини-Ивенты"
    },
    title: {
      cs: "Skryté týdenní minieventy & trenérské rutiny: Kompletní rozpis (Max Mondays, Friendship Friday a další)",
      en: "Hidden Weekly Mini-Events & Trainer Routines: Master Guide (Max Mondays, Friendship Friday & More)",
      ja: "隠れた週間ミニイベント＆トレーナールーティン完全攻略：マックスマンデー、フレンドシップフライデー他",
      ru: "Скрытые еженедельные мини-ивенты и рутины тренера: Полный гайд (Max Mondays, Friendship Friday и др.)"
    },
    subtitle: {
      cs: "Pravidelný týdenní harmonogram od pondělního Adventure Sync resetu přes Spotlight & Raid Hour, Friendship Friday dárky až po víkendové Showcases a Lucky trady.",
      en: "Master weekly schedule from Monday Adventure Sync reset to Spotlight & Raid Hour, Friendship Friday gift interactions, weekend Showcases, and Lucky trade strategies.",
      ja: "月曜日のアドベンチャーシンクリセットからスポットライト＆レイドアワー、フレンドギフト交換、週末のおひろめ（Showcase）まで完全網羅。",
      ru: "Полный еженедельный цикл: от сброса Adventure Sync в понедельник до Spotlight & Raid Hour, пятницы подарков и викенд-шоукейсов."
    },
    sections: [
      {
        id: "weekly-cycle-overview",
        heading: {
          cs: "1. Přehled týdenního cyklu a pondělní reset (Adventure Sync v 9:00)",
          en: "1. Weekly Cycle Overview & Monday Reset (Adventure Sync 9:00 AM)",
          ja: "1. 週間サイクルの概要と月曜リセット（アドベンチャーシンク 9:00）",
          ru: "1. Обзор недельного цикла и сброс в понедельник (Adventure Sync в 9:00)"
        },
        content: {
          cs: "Každé pondělí přesně v 9:00 lokálního času probíhá týdenní vyhodnocení Adventure Sync. Pokud za týden nachodíte 25 km, 50 km nebo 100 km, získáte štědré odměny včetně vzácných 10km a 5km vajíček se speciálním drop poolem, Rare Candy a až 16 000+ Stardustu! Zapnutím Star Piece před 9:00 v pondělí můžete Stardust odměnu navýšit na 24 000+.",
          en: "Every Monday at 9:00 AM local time, Adventure Sync tallies your weekly walking distance. Hitting 25 km, 50 km, or 100 km milestones unlocks massive rewards including exclusive 10km/5km eggs with high-tier hatch pools, Rare Candies, and 16,000+ Stardust! Activating a Star Piece right before 9:00 AM boosts the Stardust reward to 24,000+.",
          ja: "毎週月曜日午前9:00にアドベンチャーシンクの週間リワードが付与されます。25km、50km、100kmの目標を達成すると、特別なタマゴ（10km/5km）、ふしぎなアメ、そして最大16,000以上のほしのすなが手に入ります。受取直前に「ほしのかけら」を使うと24,000以上に増量可能です。",
          ru: "Каждый понедельник в 9:00 утра происходит сброс дистанции Adventure Sync. За 25 км, 50 км и 100 км вы получаете редкие яйца 10км/5км, Rare Candy и до 16 000+ пыли. Включите Star Piece до 9:00 для получения 24 000+ пыли!"
        },
        tips: {
          cs: [
            "Zkontrolujte v neděli večer svůj týdenní nájezd km v profilu trenéra — chybějící 2–3 km do 50 km se vyplatí dochodit!",
            "Před 9:00 v pondělí mějte v inventáři 2 volné sloty na vajíčka, jinak přijdete o speciální Adventure Sync 10km vejce!"
          ],
          en: [
            "Check your profile on Sunday evening — walking an extra 2–3 km to hit the 50 km tier is always worth the bonus rewards!",
            "Ensure you have at least 2 free egg slots in your storage before 9:00 AM Monday to receive the exclusive Adventure Sync 10km egg."
          ],
          ja: [
            "日曜日の夜に歩行距離を確認し、50kmに届きそうなら少し歩いて達成しておきましょう。",
            "月曜日の朝9:00前にタマゴの空き枠を最低2つ確保しておかないと、限定10kmタマゴを受け取れません！"
          ],
          ru: [
            "Проверяйте дистанцию в воскресенье вечером — добить 50 км всегда выгодно!",
            "Оставьте 2 свободных слота под яйца до 9:00 понедельника, чтобы не потерять спец-яйцо 10км!"
          ]
        }
      },
      {
        id: "combat-mini-events",
        pokemon: ["Charizard", "Venusaur", "Blastoise", "Rayquaza", "Mewtwo"],
        heading: {
          cs: "2. Bojové týdenní eventy (Max Mondays, Raid Hour & PvP Battle Days)",
          en: "2. Weekly Combat Mini-Events (Max Mondays, Raid Hour & PvP Battle Days)",
          ja: "2. バトル系ミニイベント（マックスマンデー、レイドアワー、GBLバトルデイ）",
          ru: "2. Боевые еженедельные ивенты (Max Mondays, Raid Hour и PvP Battle Days)"
        },
        content: {
          cs: "Během týdne probíhají 3 klíčové bojové události:\n• Max Mondays (Pondělí 18:00–19:00): Vybraný Dynamax Pokémon přebírá téměř všechny Power Spoty ve městě. Vynikající příležitost nasbírat Max Particles a vyzkoušet Max Moves.\n• Raid Hour (Středa 18:00–19:00): Téměř všechny tělocvičny obsadí aktuální 5★ Legendární boss. V lokálních komunitách se schází party hráčů a dělají 5 až 8 raidů za hodinu.\n• GO Battle Days / PvP Nights: Několikrát za sezónu nabízí 4× Stardust z vítězství v PvP a navýšení denního limitu na 20 sad (100 zápasů).",
          en: "Three essential combat events recur regularly:\n• Max Mondays (Mondays 6:00–7:00 PM): A featured Dynamax Pokémon takes over nearly every Power Spot with boosted particle bonuses.\n• Raid Hour (Wednesdays 6:00–7:00 PM): Active 5★ Legendary/Mega raid boss appears simultaneously at virtually all Gyms. Local raid trains chain 5–8 raids in one hour.\n• GO Battle Days / PvP Nights: Seasonal events offering 4x Stardust win rewards and an increased cap of 20 battle sets (100 matches).",
          ja: "週間で3つの重要バトルイベントがあります：\n• マックスマンデー（月曜18:00〜19:00）：特定のダイマックスポケモンがパワースポットに一斉出現。\n• レイドアワー（水曜18:00〜19:00）：ほぼ全てのジムに伝説レイドボスが降臨。1時間で5〜8戦連続討伐可能。\n• GOバトルデイ／ナイト：勝利時ほしのすな4倍、1日最大20セット（100戦）対戦可能。",
          ru: "Три главных боевых события недели:\n• Max Mondays (Пн 18:00–19:00): Массовые Dynamax рейды на Power Spots.\n• Raid Hour (Ср 18:00–19:00): 5★ Легендарный босс на всех гимах одновременно.\n• GO Battle Days: 4x пыли за победы и лимит в 20 сетов (100 боев)."
        },
        tips: {
          cs: [
            "Během Raid Hour hrajte v režimu Party Play — získáte Party Power (dvojnásobné poškození Charged Move) a stihnete více raidů!",
            "V Max Mondays si předem vyčistěte Max Particles úložiště, abyste mohli sbírat energii z každého vyhraného Power Spotu."
          ],
          en: [
            "Always activate Party Play during Raid Hour to double your Charged Move output via Party Power and clear raids twice as fast!",
            "Spend Max Particles on move upgrades before Max Mondays to avoid hitting the 1,000 MP storage limit during battles."
          ],
          ja: [
            "レイドアワー中は「チームコラボ（Party Play）」を組み、パーティパワー（技2倍ダメージ）を発動させましょう！",
            "マックスマンデー前にマックス粒子の所持上限（1,000 MP）に達しないよう技強化等で消費しておきましょう。"
          ],
          ru: [
            "В Raid Hour играйте в Party Play для бонуса 2x урона Charged атак!",
            "Потратьте Max Particles до начала Max Mondays, чтобы не упираться в лимит 1,000 MP."
          ]
        }
      },
      {
        id: "social-community-habits",
        heading: {
          cs: "3. Sociální zvyky: Friendship Friday, Trade Weekends a Lucky Trades",
          en: "3. Social Traditions: Friendship Friday, Trade Weekends & Lucky Trades",
          ja: "3. ソーシャル習慣：フレンドシップフライデー、トレードウィークエンド、キラフレンド",
          ru: "3. Социальные традиции: Friendship Friday, Trade Weekends и Lucky Trades"
        },
        content: {
          cs: "V komunitě Pokémon GO se vžily pravidelné týdenní tradice:\n• Friendship Friday (Páteční dárky): Trenéři si v pátek hromadně otevírají a posílají dárky na maximum denního limitu (30–40 otevření), což urychluje postup na Best Friends (100 000 XP) a spouští Lucky Friends status.\n• Trade Weekend (Výměnný víkend): Výměny Pokémonů chycených více než 100 km od sebe (garantuje 1× Candy XL pro oba hráče!). Ideální pro likvidaci nechtěných raid bossů a Pokémonů ze Spotlight Hour.\n• Lucky Friend Special Trades: Výměna Shiny a legendárních Pokémonů s garantovaným Lucky statem (minimální IV 12/12/12 a -50% sleva na Stardust při levelování).",
          en: "Global community traditions maximize trainer progression:\n• Friendship Friday: Trainers maximize gift opens (30–40 per day) and sends, accelerating progress toward Best Friends (100,000 XP) and triggering Lucky Friends interactions.\n• Trade Weekends: Swapping Pokémon caught 100+ km apart awards 1 guaranteed Candy XL to both players! Perfect for clearing raid bosses and Spotlight catches.\n• Lucky Friend Special Trades: Trading Legendary and Shiny Pokémon with Lucky status guarantees high minimum IV floors (12/12/12) and a permanent 50% Stardust power-up discount.",
          ja: "世界中のトレーナーが実践するソーシャルルーティン：\n• フレンドシップフライデー：金曜日に上限（30〜40個）までギフトを開封・送付し、大親友（100,000 XP）やキラフレンドを目指す。\n• トレードウィークエンド：100km以上離れた場所のポケモンを交換し、アメXLを確定で1個入手。\n• キラフレンド確定交換：伝説や色違いを交換し、個体値12/12/12以上＆強化すな50%割引を狙う。",
          ru: "Популярные социальные традиции тренеров:\n• Friendship Friday: Массовый обмен подарками (до 30–40 в день) для прокачки Best Friends (100,000 XP) и Lucky Friends.\n• Trade Weekends: Обмен покемонами с дистанцией 100+ км дает гарантированную 1 Candy XL обоим игрокам!\n• Lucky Friend Trades: Обмен легендарных и шайни покемонов с гарантией минимум 12/12/12 IV и скидкой 50% на пыль."
        },
        tips: {
          cs: [
            "Pro nalezení Pokémonů pro distance trade zadejte do vyhledávání: 'distance100-'",
            "Při levelování na Ultra Friends (50k XP) a Best Friends (100k XP) se s kamarádem domluvte a zapněte Lucky Egg na dvojnásobek XP!"
          ],
          en: [
            "Use search filter 'distance100-' in your Pokémon storage to instantly find eligible long-distance trades for guaranteed Candy XL.",
            "Coordinate with friends before hitting Ultra (50k XP) or Best Friends (100k XP) to pop a Lucky Egg for 100k/200k XP bursts!"
          ],
          ja: [
            "距離100km以上のポケモンを抽出するには検索欄に「距離100-」と入力してください。",
            "親友（5万XP）や大親友（10万XP）になる直前に「しあわせタマゴ」を使い、XPを2倍獲得しましょう！"
          ],
          ru: [
            "Используйте фильтр 'distance100-' для поиска покемонов с гарантированной Candy XL при трейде.",
            "Договаривайтесь с друзьями и включайте Lucky Egg перед повышением уровня дружбы (до 200k XP)."
          ]
        }
      },
      {
        id: "collector-showcase-events",
        heading: {
          cs: "4. Sběratelské eventy: Spotlight Hour a PokéStop Showcases (Čt–Ne)",
          en: "4. Collector Events: Spotlight Hour & PokéStop Showcases (Thu–Sun)",
          ja: "4. コレクション系：スポットライトアワー＆ポケストップおひろめ（木〜日）",
          ru: "4. Коллекционные ивенты: Spotlight Hour и PokéStop Showcases (Чт–Вс)"
        },
        content: {
          cs: "Dvě hlavní týdenní sběratelské disciplíny:\n• Spotlight Hour (Úterý 18:00–19:00): Přesně 60 minut masivních spawnů jednoho Pokémona s 1 z 5 rotujících bonusů (2x Stardust, 2x XP, 2x Catch Candy, 2x Transfer Candy, 2x Evolve XP). Při bonusu 2x Stardust na Pokémonech se základním vysokým Stardustem (např. Paras, Meowth, Shellder, Foongus) lze s Star Piece vydělat až 300 000+ Stardustu za hodinu!\n• PokéStop Showcases (Čtvrtek až Neděle/Pondělí): Soutěže o největší a nejtěžší exempláře (XXL) u vybraných PokéStopů. Výhra 1. místa garantuje prémiové odměny: Incubators, Star Pieces, Lucky Eggs, Lure Moduly a 10 000 XP!",
          en: "Two primary collector opportunities each week:\n• Spotlight Hour (Tuesdays 6:00–7:00 PM): 60 minutes of intensive spawns featuring 1 of 5 rotating bonuses. Stardust-rich species (Paras, Meowth, Shellder, Foongus, Staryu) combined with Star Piece yield over 300,000+ Stardust in a single hour!\n• PokéStop Showcases (Thursday to Sunday/Monday): Size competitions (XXL/XXS) hosted at PokéStops. Placing 1st awards premium rewards: Incubators, Star Pieces, Lucky Eggs, Lure Modules, and 10,000 XP!",
          ja: "毎週の2大コレクションイベント：\n• スポットライトアワー（火曜18:00〜19:00）：特定ポケモンの大量発生と5種のローテーションボーナス。すな増加ポケモン（パラス、ニャース、シェルダー、タマゲタケ等）なら1時間で30万以上のすなを獲得可能。\n• ポケストップおひろめ（木曜〜日・月曜）：XXLサイズの大きさを競うコンテスト。1位になるとふかそうち、ほしのかけら、しあわせタマゴ等の豪華報酬を獲得。",
          ru: "Два ключевых коллекционных события:\n• Spotlight Hour (Вт 18:00–19:00): 60 минут массового спавна с бонусом. На покемонах с базовой повышенной пылью (Paras, Meowth, Foongus) можно собрать 300k+ пыли за час!\n• PokéStop Showcases (Чт–Вс/Пн): Соревнования на размер XXL. 1-е место дает инкубаторы, Star Piece, Lucky Egg и 10,000 XP!"
        },
        tips: {
          cs: [
            "Před Spotlight Hour si vyčistěte batoh na Pokémony a naučte se Fast Catch techniku pro chytání 400–600 kusů za hodinu.",
            "Nikdy neposílejte pryč XXL Pokémony — uložte si je do tagu 'Showcase' pro budoucí soutěže!"
          ],
          en: [
            "Clear storage space before Spotlight Hour and master the Fast Catch trick to catch 400–600 Pokémon per hour.",
            "Tag all caught XXL Pokémon under a dedicated 'Showcase' tag instead of transferring them for future competitions."
          ],
          ja: [
            "スポットライトアワー前にボックスを空け、ファストキャッチを使って1時間で400〜600匹捕獲しましょう。",
            "XXLポケモンは博士に送らず「おひろめ用」タグをつけて保存しておきましょう。"
          ],
          ru: [
            "Очистите хранилище перед Spotlight Hour и используйте Fast Catch для поимки 400–600 покемонов в час.",
            "Сохраняйте всех XXL покемонов под тегом 'Showcase' для будущих побед!"
          ]
        }
      },
      {
        id: "daily-trainer-habits",
        pokemon: ["Articuno-Galarian", "Zapdos-Galarian", "Moltres-Galarian"],
        heading: {
          cs: "5. Každodenní trenérské mikro-rutiny (Daily Incense, 50 PokéCoins a Streaks)",
          en: "5. Daily Trainer Micro-Routines (Daily Incense, 50 PokéCoins & Streaks)",
          ja: "5. 毎日のトレーナールーティン（おさんぽおこう、50ポケコイン、デイリーストリーク）",
          ru: "5. Ежедневные рутины тренера (Daily Incense, 50 монет и серии дней)"
        },
        content: {
          cs: "Pro maximální herní zisk provádějte každý den tyto 4 základní rutiny:\n1. Daily Adventure Incense (15 minut): Denní bezplatné kadidlo fungující při chůzi v přímém směru. Šance na setkání s legendárními Galarian Birds (Articuno, Zapdos, Moltres) a vzácnými divokými evolucemi.\n2. 50 PokéCoins denní limit: Umístěte obránce do 2–3 Gymů (ideálně večer). 50 coinů denně = 1 500 coinů měsíčně zdarma pro nákup Storage Upgrade a Remote Raid Passů.\n3. 7denní Catch & Spin Streaks: První chycený Pokémon a první protočený PokéStop každý den. Na 7. den získáte obrovský bonus XP, Stardustu a garantovaný Evolution Item (Sinnoh Stone, King's Rock, Dragon Scale atd.).\n4. Team GO Rocket balóny: Přilétají každých 6 hodin (00:00, 06:00, 12:00, 18:00 lokálního času).",
          en: "Four essential daily habits for consistent progress:\n1. Daily Adventure Incense (15 mins): Free daily incense requiring active walking. Features rare wild spawns and exclusive Galarian Birds (Articuno, Zapdos, Moltres).\n2. 50 Daily PokéCoins: Defend Gyms daily (best placed in the evening). 50 coins/day = 1,500 free monthly coins for Storage upgrades and Raid Passes.\n3. 7-Day Catch & Spin Streaks: Daily first catch and first PokéStop spin. Day 7 streak grants massive XP/Stardust and a guaranteed Evolution Item.\n4. Team GO Rocket Balloons: Spawn every 6 hours (00:00, 06:00, 12:00, 18:00 local time).",
          ja: "毎日行うべき4つの基本習慣：\n1. おさんぽおこう（15分）：歩行時にガラルフリーザー・サンダー・ファイヤー等の激レアが出現。\n2. 1日50ポケコイン：ジム防衛で月間最大1,500コイン（ボックス拡張やパス購入用）獲得。\n3. 7日間デイリーストリーク：7日目に大量XP、すな、確定しんかのいしを入手。\n4. ロケット団気球：6時間おき（00:00、06:00、12:00、18:00）に出現。",
          ru: "Четыре обязательных ежедневных действия:\n1. Daily Adventure Incense (15 мин): Бесплатный ладан при ходьбе с шансом на Galarian Birds.\n2. 50 монет в день: Защита гимов дает до 1,500 монет в месяц на слоты и пассы.\n3. Серия из 7 дней (Catch & Spin): На 7-й день дается куча XP, пыли и гарантированный Evolution Item.\n4. Шары Ракеты: Прилетают каждые 6 часов (00:00, 06:00, 12:00, 18:00)."
        },
        tips: {
          cs: [
            "Při spuštěném Daily Adventure Incense jděte svižnou chůzí po přímce — Pokémon se objeví přibližně každých 30 sekund / 50 metrů.",
            "U Galarian Birds použijte Golden Razz Berry + Ultra Ball + točený Excellent hod. Pokud máte Master Ball, Galarian Birds jsou jedním z nejlepších cílů!"
          ],
          en: [
            "Walk rapidly in a straight line during Daily Incense — a new Pokémon spawns roughly every 30 seconds / 50 meters.",
            "For Galarian Birds, use Golden Razz Berry + Ultra Ball + curved Excellent throw. They are also premier targets for your Master Ball!"
          ],
          ja: [
            "おさんぽおこう使用中は直線方向に素早く歩くと、約30秒（50m）ごとにポケモンが出現します。",
            "ガラル三鳥遭遇時は「きんのズリのみ」＋「ハイパーボール」＋「エクセレントカーブスロー」か「マスターボール」を使いましょう。"
          ],
          ru: [
            "Идите прямо и бодро при Daily Incense — спавн каждые 30 секунд (50 метров).",
            "На Galarian Birds бросайте Golden Razz + Ultra Ball + Excellent или используйте Master Ball!"
          ]
        }
      },
      {
        id: "pro-search-strings",
        heading: {
          cs: "6. Pro Search Strings: Oficiální vyhledávací zkratky pro rychlé třídění",
          en: "6. Pro Search Strings: Official Quick-Filter Shortcuts for Storage Sorting",
          ja: "6. プロ用検索コマンド：ボックス整理のための公式ショートカット集",
          ru: "6. Pro Search Strings: Официальные поисковые строки для быстрой сортировки"
        },
        content: {
          cs: "Ušetřete hodiny ručního klikání pomocí oficiálních vyhledávacích řetězců v inventáři Pokémonů:\n• 4* – Zobrazí všechny 100% IV perfektní Pokémony (Hundo).\n• 0attack&3-4defense&3-4hp – Najde ideální PvP kandidáty pro Great League a Ultra League.\n• distance100- – Zobrazí Pokémony pro trade s garantovaným Candy XL.\n• tradeevolve – Pokémoni s bezplatnou evolucí po výměně (Machamp, Gengar, Alakazam, Gigalith atd.).\n• xxl,xxs – Všichni extrémní velikostní kandidáti pro PokéStop Showcases.\n• !3*&!4*&!shiny&!legendary&!shadow – Zkratka pro hromadný bezpečný transfer po Community Day / Spotlight Hour.\n• mega1-3 – Všichni Pokémoni s aktivovanou Mega Úrovní.",
          en: "Save hours of manual management using official Pokémon storage search strings:\n• 4* – Displays all 100% IV perfect Pokémon (Hundos).\n• 0attack&3-4defense&3-4hp – Locates prime PvP candidates for Great and Ultra League.\n• distance100- – Shows Pokémon caught 100+ km away for guaranteed Candy XL trading.\n• tradeevolve – Free evolution Pokémon when traded (Machoke, Haunter, Kadabra, Boldore, etc.).\n• xxl,xxs – Extreme size Pokémon for PokéStop Showcases.\n• !3*&!4*&!shiny&!legendary&!shadow – Safe bulk-transfer shortcut after Community Day / Spotlight Hour.\n• mega1-3 – All Pokémon with an unlocked Mega Level.",
          ja: "ボックス整理を劇的に効率化する公式検索コマンド集：\n• 4* – 個体値100%（Hundo）を全表示。\n• 0attack&3-4defense&3-4hp – スーパー／ハイパーリーグ用のPvP理想個体を抽出。\n• 距離100- – アメXL確定交換用の長距離捕獲ポケモン。\n• 交換進化 – トレード後にアメ0個で進化可能なポケモン（ゴーリキー、ゴースト等）。\n• xxl,xxs – ポケストップおひろめ用サイズ。\n• !3*&!4*&!色違い&!伝説&!シャドウ – イベント後の安全な一括博士送りフィルター。\n• メガ1-3 – メガレベルが解放されているポケモン。",
          ru: "Поисковые строки для быстрой сортировки хранилища:\n• 4* – Все 100% IV покемоны (Hundo).\n• 0attack&3-4defense&3-4hp – Топовые кандидаты для Great и Ultra PvP лиг.\n• distance100- – Покемоны для гарантированной Candy XL при трейде.\n• tradeevolve – Покемоны с бесплатной эволюцией после обмена.\n• xxl,xxs – Кандидаты для PokéStop Showcases.\n• !3*&!4*&!shiny&!legendary&!shadow – Безопасный фильтр для массовой отправки профессору.\n• mega1-3 – Все покемоны с прокачанным Mega Level."
        },
        tips: {
          cs: [
            "Vyhledávací řetězce si můžete v Pokémon GO uložit jako oblíbené zkratky (Favorite Searches) kliknutím na 'See More' -> podržte prst na vyhledávání!",
            "Zkombinujte 'age0&!4*&!shiny' pro zobrazení všech dnešních běžných úlovků určených ke smazání."
          ],
          en: [
            "Save these strings under 'Favorite Searches' in Pokémon GO by tapping Search -> 'See More' -> long-press recent search!",
            "Use 'age0&!4*&!shiny' to instantly display all of today's non-rare catches ready for bulk transfer."
          ],
          ja: [
            "検索欄の「その他」から長押しでお気に入り検索に保存できます。",
            "「本日&!4*&!色違い」で本日の不要な捕獲分を一発表示できます。"
          ],
          ru: [
            "Сохраняйте строки в Favorite Searches через долгое нажатие в поиске.",
            "Используйте 'age0&!4*&!shiny' для быстрой чистки сегодняшних уловов."
          ]
        }
      }
    ]
  },
  {
    id: "rocket-leaders-giovanni-guide",
    slug: "rocket-leaders-giovanni-guide",
    iconName: "Shield",
    imageUrl: "https://cdn.leekduck.com/assets/img/items/Rocket%20Radar.png",
    featured: false,
    author: "PoGo Events Team",
    readTime: "8 min",
    updatedAt: "2026-08-15",
    category: {
      cs: "Team GO Rocket",
      en: "Team GO Rocket",
      ja: "GOロケット団",
      ru: "Команда GO Ракета"
    },
    title: {
      cs: "Kompletní průvodce Team GO Rocket: Jak porazit Lídry a Giovanniho",
      en: "Ultimate Team GO Rocket Guide: How to Beat Leaders & Giovanni",
      ja: "GOロケット団完全攻略：リーダーとサカキを倒す戦略",
      ru: "Полный гайд по Команде GO Ракета: Как победить Лидеров и Джованни"
    },
    subtitle: {
      cs: "Detailní návod na sestavení nejlepších counterů proti Sierra, Arlo, Cliffovi a šéfovi Giovanni. Získejte stínové legendární Pokémony a odstraňte útok Frustration.",
      en: "Detailed counters guide against Sierra, Arlo, Cliff, and boss Giovanni. Catch legendary Shadow Pokémon, master stun mechanics, and remove Frustration.",
      ja: "シエラ、アルロ、クリフ、サカキを撃破するための最適なカウンター編成とシャドウ伝説ポケモンの入手方法および「やつあたり」消去法。",
      ru: "Подробный гайд по выбору контеров против Сиерры, Арло, Клиффа и босса Джованни. Забирайте теневых легенд и снимайте атаку Frustration."
    },
    sections: [
      {
        id: "intro",
        heading: {
          cs: "Úvod do bojů s Team GO Rocket a 'Stun' mechanika",
          en: "Introduction to Team GO Rocket Battles & The Stun Window",
          ja: "GOロケット団バトルへの招待と硬直時間（スタン）",
          ru: "Введение в битвы с Командой GO Ракета и механика оглушения"
        },
        content: {
          cs: "Team GO Rocket obsazuje PokéStopy a každých 6 hodin přilétá v horkovzdušných balónech (00:00, 06:00, 12:00, 18:00). Porážkou 6 řadových členů (Grunts) sestavíte Rocket Radar pro nalezení lídrů Sierry, Cliffa a Arla.\nKlíčová mechanika: Po každém nabitém útoku (Charged Move) a po každé výměně Pokémona se soupeřův Pokémon na 2–2.5 sekundy zastaví a vůbec neútočí! Tento čas využijte k bezpečnému nabití dalšího útoku.",
          en: "Team GO Rocket invades PokéStops and operates balloons every 6 hours (00:00, 06:00, 12:00, 18:00). Defeating 6 Grunts creates a Rocket Radar to track Leaders Sierra, Cliff, and Arlo.\nCrucial Mechanic: After every Charged Attack or Pokémon switch, the Rocket AI pauses for 2–2.5 seconds without attacking! Use this stun window to farm fast energy safely.",
          ja: "GOロケット団はポケストップを占拠し、6時間おき（0:00、6:00、12:00、18:00）に気球で出現します。下っ端（Grunts）を6体倒すとロケットレーダーが完成し、リーダー（シエラ、クリフ、アルロ）と戦えます。\n重要テクニック：スペシャルアタック発動後およびポケモン交代後、敵の攻撃が約2〜2.5秒間完全に停止します。この硬直時間を利用して通常技エネルギーを安全に溜めましょう。",
          ru: "Команда GO Ракета захватывает покестопы и прилетает на шарах каждые 6 часов. Победа над 6 пешками дает Rocket Radar для поиска лидеров.\nГлавная механика: После каждого Charged Move или смены покемона бот замирает на 2–2.5 секунды. Используйте это для зарядки энергии!"
        },
        tips: {
          cs: [
            "Nikdy nezačínejte boj se svým hlavním útočníkem na 1. pozici — dejte ho na 2. pozici a okamžitě na začátku bitvy ho vyměňte do hry pro aktivaci 2sekundového stunu!",
            "Lídři a Giovanni vždy spotřebují své 2 štíty na vaše první 2 Charged útoky. Používejte spamovací útoky jako Power-Up Punch, Cross Chop, Dragon Claw nebo Aqua Tail!"
          ],
          en: [
            "Never start with your main carry in slot 1 — put it in slot 2 and instantly swap to it at the start of battle to trigger a free 2-second stun!",
            "Leaders and Giovanni always shield your first 2 charged attacks. Lead with rapid shield-breakers like Power-Up Punch, Cross Chop, Dragon Claw, or Aqua Tail!"
          ],
          ja: [
            "主力ポケモンを1番目に置かず、2番目に配置してバトル開始直後に即交代することで、開幕2秒の硬直時間を発動させましょう！",
            "リーダーとサカキは最初の2回の技に必ずシールドを使います。グロウパンチ、クロスチョップ、ドラゴンクロー等で早急に割ってください。"
          ],
          ru: [
            "Ставьте главного бойца во 2-й слот и делайте мгновенную смену в начале боя для получения 2 сек стана!",
            "Лидеры всегда тратят оба щита на первые 2 атаки. Сбивайте их быстрыми Power-Up Punch, Cross Chop или Aqua Tail!"
          ]
        }
      },
      {
        id: "leaders",
        heading: {
          cs: "Strategie na Lídry (Sierra, Cliff, Arlo)",
          en: "Leader Battle Strategies (Sierra, Cliff, Arlo)",
          ja: "リーダー攻略法（シエラ、クリフ、アルロ）",
          ru: "Стратегии победы над Лидерами"
        },
        content: {
          cs: "Každý lídr má stálého 1. Pokémona, kterého po výhře můžete chytit v Shiny Shadow formě. Doporučení:\n• Sierra: Vynikající bojový typ (Lucario s Counter + Power-Up Punch nebo Machamp s Cross Chop) pro okamžité stržení štítů a Ghost/Dark counter (Tyranitar, Hydreigon).\n• Cliff: Využijte Grass/Water (Swampert s Mud Shot + Hydro Cannon, Kartana, Zarude) a Fighting/Ground pro jeho těžké tanky.\n• Arlo: Skvěle fungují Fire a Rock typy (Rhyperior s Smack Down, Reshiram, Heatran, Charizard).",
          en: "Each leader features a fixed lead that can be caught in Shiny Shadow form. Recommended setups:\n• Sierra: Fighting-type (Lucario with Counter + Power-Up Punch or Machamp with Cross Chop) to burn shields, backed by Dark/Ghost (Tyranitar, Hydreigon).\n• Cliff: Grass/Water specialist (Swampert with Mud Shot + Hydro Cannon, Kartana) plus Ground/Fighting for heavy coverage.\n• Arlo: Fire and Rock powerhouses (Rhyperior with Smack Down + Rock Wrecker, Reshiram, Heatran, Tyranitar).",
          ja: "各リーダーの攻略編成：\n• シエラ：かくとう枠（カウンター＋グロウパンチのルカリオ、カイリキー）でシールドを剥がし、あく・ゴースト（バンギラス、サザンドラ）で追撃。\n• クリフ：みず・くさ枠（ラグラージ、カミツルギ）およびじめん・かくとうで高耐久ポケモンを撃破。\n• アルロ：ほのお・いわ枠（ドサイドン、レシラム、ヒードラン）が最適。",
          ru: "Сетапы против Лидеров:\n• Sierra: Lucario (Counter + Power-Up Punch) или Machamp для сбития щитов, затем Tyranitar или Hydreigon.\n• Cliff: Swampert (Hydro Cannon), Kartana и бойцы земляного/боевого типа.\n• Arlo: Огненные и каменные покемоны (Rhyperior, Reshiram, Heatran)."
        }
      },
      {
        id: "giovanni",
        heading: {
          cs: "Jak porazit Šéfa Giovanniho & Odstranění Frustration",
          en: "How to Defeat Boss Giovanni & Removing Frustration",
          ja: "ボス・サカキの倒し方＆「やつあたり」の消去法",
          ru: "Как победить Босса Джованни и убрать атаку Frustration"
        },
        content: {
          cs: "Giovanniho vyhledáte pomocí Super Rocket Radaru. Vždy začíná s Persianem s extrémně rychlým normálním útokem (Scratch/Feint Attack). Na 1. pozici nasaďte Lucaria s Power-Up Punch, který Persianovi strhne oba štíty a díky stunu ho zničí dřív, než vám ublíží. Třetí slot je aktuální Shadow Legendary (např. Shadow Rayquaza, Shadow Mewtwo, Shadow Groudon).\nOdstranění Frustration: Shadow Pokémoni mají zablokovaný útok Frustration, který nelze přepsat běžným TM. Lze ho změnit pouze během speciálních 'Team GO Rocket Takeover' eventů pomocí Charged TM!",
          en: "Locating Giovanni requires a Super Rocket Radar. He always leads with Persian equipped with high-damage Fast Attacks (Scratch/Feint Attack). Use Lucario with Counter + Power-Up Punch to strip both shields while locking Persian in stun frames. His final slot is the featured Shadow Legendary.\nRemoving Frustration: Shadow Pokémon spawn with the unviable Charged Move Frustration. It can ONLY be unlearned during official 'Team GO Rocket Takeover' events using a standard Charged TM!",
          ja: "サカキはスーパーロケットレーダーで追跡します。1体目のペルシアンは「ひっかく」のダメージが高いため、ルカリオ（カウンター＋グロウパンチ）で即座にシールドを割りつつスタンループで倒しましょう。3体目は期間限定のシャドウ伝説です。\n「やつあたり」の消去：シャドウポケモンが覚えている「やつあたり」は、定期開催される「ロケット団占拠イベント」期間中のみ「わざマシンスペシャル」で変更可能です！",
          ru: "Джованни отслеживается через Super Rocket Radar. Первый покемон — Persian. Используйте Lucario с Power-Up Punch для быстрого сбития щитов и стана. В 3 слоте — Теневой Легендарный босс.\nСнятие Frustration: Атаку Frustration у теневых покемонов можно стереть обычным Charged TM ТОЛЬКО во время ивентов Team GO Rocket Takeover!"
        },
        tips: {
          cs: [
            "Během Rocket Takeover eventu zadejte do vyhledávání: 'shadow&@frustration' a změňte útok všem svým nejlepším Shadow Pokémonům!",
            "Shadow Pokémoni mají +20% Attack bonus (a -20% Defense). Jsou to nejsilnější útočníci do raidů ve hře!"
          ],
          en: [
            "During Rocket Takeover events, filter by 'shadow&@frustration' and use Charged TMs on all top-tier Shadow attackers!",
            "Shadow Pokémon receive a permanent +20% Attack bonus (at cost of -20% Defense), making them the premier DPS monsters in PvE raids!"
          ],
          ja: [
            "占拠イベント開始時に「シャドウ&@やつあたり」で検索し、主力ポケモンの技を全て変更しましょう！",
            "シャドウポケモンは攻撃力が+20%（防御-20%）されるため、レイドバトルで最強のアタッカーになります。"
          ],
          ru: [
            "Во время Takeover введите 'shadow&@frustration' и смените атаку всем лучшим теневым покемонам!",
            "Теневые покемоны имеют +20% к Атаке, что делает их лучшими дамагерами для рейдов!"
          ]
        }
      }
    ]
  },
  {
    id: "raid-battles-counter-guide",
    slug: "raid-battles-counter-guide",
    iconName: "Swords",
    imageUrl: "https://cdn.leekduck.com/assets/img/items/Premium%20Battle%20Pass.png",
    featured: false,
    author: "PoGo Events Team",
    readTime: "8 min",
    updatedAt: "2026-08-15",
    category: {
      cs: "Raid Battles",
      en: "Raid Battles",
      ja: "レイドバトル",
      ru: "Рейдовые Битвы"
    },
    title: {
      cs: "Průvodce Raid Battles: Výběr nejlepších counterů, Party Power a výpočet CP 100% IV",
      en: "Raid Battles Master Guide: Optimal Counters, Party Power & 100% IV CP",
      ja: "レイドバトルマスターガイド：最適カウンター、パーティパワー、100% IV判別",
      ru: "Мастер-гайд по Рейдам: Контеры, Party Power и CP 100% IV"
    },
    subtitle: {
      cs: "Kompletní mechaniky typových slabostí, Weather Boost, Party Play 2× bonusu na Charged útoky a jak okamžitě poznat 100% IV bosse při chytání.",
      en: "Master type matchups, Weather Boost multipliers, Party Play 2x Charged Move bonuses, and identify 100% IV Perfect Combat Power at the catch screen.",
      ja: "タイプ相性、天候ブースト倍率、チームコラボの2倍技威力ボーナス、ゲットチャレンジ時の100% IV個体値判別法を徹底解説。",
      ru: "Механика уязвимостей, Weather Boost, удвоенный урон Party Play и мгновенное определение 100% IV босса при поимке."
    },
    sections: [
      {
        id: "raid-types",
        heading: {
          cs: "Úrovně Raidů, Weather Boost a Catch CP",
          en: "Raid Tiers, Weather Boost & Catch CP Calculation",
          ja: "レイドランク、天候ブースト、捕獲時CPの仕組み",
          ru: "Уровни Рейдов, Погодный Буст и CP при поимке"
        },
        content: {
          cs: "Raidy se dělí na 1★, 3★, 5★ (Legendary), Mega, Ultra Beasts a Shadow Raidy. Boss má při chytání standardně Level 20. Pokud je však aktivní odpovídající počasí (Weather Boost), chycený Pokémon má Level 25, vyšší CP a garantované minimální IV statistiky (10/10/10 v raidech, Weather Boost zaručuje vyšší základ). V naší sekci 'Raids' vidíte přesné minimální a maximální (100% IV) CP pro obě úrovně.",
          en: "Raid tiers span 1★, 3★, 5★ (Legendary), Mega, Ultra Beasts, and Shadow Raids. Bosses are caught at Level 20 under standard conditions. Under matching Weather Boost, bosses appear at Level 25 with elevated CP and IV floors (10/10/10 minimum). Check our 'Raids' tab for exact non-boosted (Lvl 20) and boosted (Lvl 25) 100% IV CP ranges.",
          ja: "レイドには1★、3★、5★（伝説）、メガレイド、ウルトラビースト、シャドウレイドが存在します。通常時はレベル20で出現しますが、天候ブースト時はレベル25となり高CPで捕獲可能です。当サイトの「Raids」タブで通常時・ブースト時の個体値100% CPを確認してください。",
          ru: "Рейды делятся на 1★, 3★, 5★ (Легендарные), Мега и Теневые. Обычный босс ловится на 20 уровне, а с Weather Boost — на 25 уровне с повышенным CP. Проверяйте диапазоны CP 100% IV в разделе 'Raids'."
        },
        tips: {
          cs: [
            "Weather Boost navíc zvyšuje útočnou sílu útoků daného typu o +20% během samotného boje!",
            "Při chytání házejte Circle Lock technikou (točený Excellent hod do uzamčeného kruhu) + Golden Razz Berry pro maximální šanci na chycení."
          ],
          en: [
            "Weather Boost additionally increases matching attack damage output by +20% during the raid battle!",
            "Use the Circle Lock technique with Golden Razz Berry and Curved Excellent Throws to achieve 90%+ catch rates on legendaries."
          ],
          ja: [
            "天候ブースト適用中の技は、バトル中に威力が+20%上昇します！",
            "サークル固定投法（Circle Lock）ときんのズリのみでエクセレントカーブを狙い、捕獲率を最大化しましょう。"
          ],
          ru: [
            "Погодный буст увеличивает урон атак соответствующего типа на +20% в бою!",
            "Используйте технику Circle Lock + Golden Razz Berry + Excellent бросок для поимки босса."
          ]
        }
      },
      {
        id: "party-play-boost",
        heading: {
          cs: "Party Play & Friendship Damage Multipliery",
          en: "Party Play & Friendship Damage Multipliers",
          ja: "チームコラボ（Party Play）とフレンドダメージ倍率",
          ru: "Party Play и Множители Урона от Друзей"
        },
        content: {
          cs: "V moderním Pokémon GO lze útočnou sílu týmu dramaticky znásobit pomocí dvou mechanik:\n1. Party Play (Party Power): Když v raidu bojujete v partě (2–4 trenéři), každým rychlým útokem nabíjíte spodní Party Power kruh. Po jeho stisknutí váš další Charged Move udělí masivní 2× (DVOJNÁSOBNÉ) poškození! To umožňuje porazit i nejtěžší 5★ bosse ve 2 lidech.\n2. Friendship Attack Bonus: Boj s přáteli dává trvalý bonus k poškození: Good Friend (+3%), Great Friend (+5%), Ultra Friend (+7%), Best Friends (+10% poškození!).",
          en: "Modern raid DPS can be massively amplified through two synergistic mechanics:\n1. Party Play (Party Power): Raiding in a party (2–4 players) charges the Party Power gauge with fast attacks. Tapping it makes your next Charged Move deal 2x (DOUBLE) damage! This allows duos to defeat even 5★ legendaries.\n2. Friendship Attack Boost: Raiding alongside friends grants permanent damage boosts: Good (+3%), Great (+5%), Ultra (+7%), Best Friends (+10% bonus damage!).",
          ja: "レイドの討伐速度を極限まで高める2大システム：\n1. チームコラボ（Party Power）：2〜4人でパーティを組んでレイドに入ると、通常技でゲージが溜まり、ボタンタップで次のスペシャルアタックが【2倍ダメージ】になります！2人での伝説討伐も容易になります。\n2. フレンドアタックボーナス：フレンドと一緒に戦うと与ダメージが増加（大親友で+10%！）。",
          ru: "Два способа кардинально повысить урон в рейдах:\n1. Party Play (Party Power): В группе из 2–4 игроков заряжается Party Power, дающий 2x УРОН на следующий Charged Move!\n2. Бонус Дружбы: Best Friends дают +10% к урону на протяжении всего боя."
        }
      }
    ]
  },
  {
    id: "spotlight-community-day-guide",
    slug: "spotlight-community-day-guide",
    iconName: "Calendar",
    imageUrl: "https://cdn.leekduck.com/assets/img/items/Lure%20Module.png",
    featured: false,
    author: "PoGo Events Team",
    readTime: "7 min",
    updatedAt: "2026-08-15",
    category: {
      cs: "Události & Eventy",
      en: "Events & Festivals",
      ja: "イベントガイド",
      ru: "События и Ивенты"
    },
    title: {
      cs: "Spotlight Hour a Community Day: Jak vytěžit maximum z herních bonusů a Fast Catch",
      en: "Spotlight Hour & Community Day Master Strategy: Maximum Bonuses & Fast Catch",
      ja: "スポットライトアワー＆コミュニティ・デイ攻略：ボーナス最大化とファストキャッチ",
      ru: "Spotlight Hour и Community Day: Максимизация бонусов и техника Fast Catch"
    },
    subtitle: {
      cs: "Příprava před eventem, spravování Mega Evolucí pro bonusové Candy XL, zvládnutí techniky Fast Catch a oficiální vyhledávací filtry.",
      en: "Pre-event preparation, Mega Evolution Candy XL farming, mastering the Fast Catch technique, and post-event inventory cleanup filters.",
      ja: "事前準備、メガシンカによるアメXLドロップ率アップ、ファストキャッチ（高速捕獲）実践、イベント後の一括整理フィルター。",
      ru: "Подготовка к ивенту, Мега-Эволюции для фарминга Candy XL, техника Fast Catch и фильтры для быстрой сортировки."
    },
    sections: [
      {
        id: "spotlight-basics",
        heading: {
          cs: "5 rotujících bonusů ve Spotlight Hour a jejich kombinace",
          en: "5 Rotating Spotlight Bonuses & Optimal Stacking",
          ja: "スポットライトアワーの5大ローテーションボーナスと重ねがけ",
          ru: "5 ротирующихся бонусов Spotlight Hour и их умножение"
        },
        content: {
          cs: "Spotlight Hour (každé úterý 18:00–19:00) rotuje 5 typů bonusů:\n1. 2× Catch Stardust: Nejhodnotnější bonus! V kombinaci se Star Piece získáte 3× Stardust (např. 1 500+ Stardustu za 1 chyceného Shelldera/Parase!).\n2. 2× Catch XP: Zapněte Lucky Egg a házejte Excellent Throws pro 4 000+ XP za každého chyceného Pokémona.\n3. 2× Catch Candy: Aktivujte Mega Pokémona stejného typu na Max Mega Levelu pro zisk až 7–8 Candy a bonusových Candy XL z každého úlovku.\n4. 2× Transfer Candy: Ideální pro hromadné promazání nechtěných legendárních bossů a vzácných Pokémonů.\n5. 2× Evolve XP: V kombinaci s Lucky Egg dává 4 000 XP za každou evoluci (vhodné pro evoluce Pidgey/Wurmple/Caterpie).",
          en: "Spotlight Hour (Tuesdays 6:00–7:00 PM) cycles through 5 major bonuses:\n1. 2x Catch Stardust: Top tier! Stack with Star Piece for 3x Stardust earnings (1,500+ Stardust per Shellder/Paras/Foongus catch!).\n2. 2x Catch XP: Stack with Lucky Egg + Excellent Throws for 4,000+ XP per catch.\n3. 2x Catch Candy: Pair with a Max Level Mega Evolution of matching type for 7–8 Candy and high Candy XL drops.\n4. 2x Transfer Candy: Perfect for clearing out stored legendary raid bosses and rare species.\n5. 2x Evolve XP: Stacks with Lucky Egg for 4,000 XP per evolution (great for mass evolving 12-candy species).",
          ja: "スポットライトアワー（毎週火曜18:00〜19:00）の5大ボーナス：\n1. 捕獲時ほしのすな2倍：ほしのかけらと併用で3倍（パラスやシェルダーなら1匹1,500以上！）。\n2. 捕獲時XP2倍：しあわせタマゴ＋エクセレントスローで1匹4,000 XP。\n3. 捕獲時アメ2倍：同タイプのメガシンカ併用でアメ大量獲得。\n4. 博士送り時アメ2倍：伝説やレアポケモンの一括整理に最適。\n5. 進化時XP2倍：しあわせタマゴ併用で1進化4,000 XP獲得。",
          ru: "5 бонусов Spotlight Hour (каждый вторник 18:00–19:00):\n1. 2x Catch Stardust: Со Star Piece дает 3x пыли (1,500+ за Shellder/Paras).\n2. 2x Catch XP: С Lucky Egg и Excellent броском дает 4,000+ XP.\n3. 2x Catch Candy: Включайте Мега покемона того же типа для максимума Candy XL.\n4. 2x Transfer Candy: Для чистки легендарных и редких покемонов.\n5. 2x Evolve XP: С Lucky Egg дает 4,000 XP за каждую эволюцию."
        }
      },
      {
        id: "fast-catch-guide",
        heading: {
          cs: "Technika Fast Catch (Zrychlené chytání): Jak chytat 500+ za hodinu",
          en: "Fast Catch Technique: Catch 500+ Pokémon Per Hour",
          ja: "ファストキャッチ（高速捕獲法）：1時間500匹捕獲の技術",
          ru: "Техника Fast Catch: Ловите 500+ покемонов в час"
        },
        content: {
          cs: "Fast Catch přeskočí 10sekundovou animaci chytání a umožní chytat Pokémona za 2 sekundy:\n1. Jedním prstem potáhněte ikonu Pokéballu (nebo Berry) mírně doleva a DRŽTE prst na displeji.\n2. Druhým prstem roztočte a hoďte Pokéball na Pokémona.\n3. Jakmile Pokéball zasáhne Pokémona, pusťte první prst a okamžitě klikněte na ikonu 'Útěk' (Run away v levém horním rohu).\n4. Pokémon je buď okamžitě chycen v inventáři, nebo vyskočil a můžete ho zkusit znovu!",
          en: "Fast Catch skips the 10-second catch animation, enabling 2-second capture cycles:\n1. With one finger, drag the Pokéball (or Berry) icon slightly to the left and HOLD your finger down on screen.\n2. With another finger, spin and throw your Pokéball at the Pokémon.\n3. The moment the ball connects, release the first finger and immediately tap the 'Run' (Escape) button in the top-left corner.\n4. You exit instantly to the map; the Pokémon is already caught in your storage!",
          ja: "ファストキャッチは捕獲演出（約10秒）をスキップし、2秒で捕獲を完了するテクニックです：\n1. 片方の指でボールアイコン（またはきのみアイコン）を左側に引っ張ったまま画面を押さえ続けます。\n2. もう片方の指でボールを投げてポケモンに当てます。\n3. ボールが当たった瞬間に指を離し、左上の「逃げる」ボタンをタップします。\n4. マップ画面に即復帰し、ボックス内にポケモンが捕獲されています！",
          ru: "Fast Catch пропускает 10-секундную анимацию поимки:\n1. Одним пальцем оттяните и удерживайте иконку покебола влево.\n2. Вторым пальцем бросайте покебол в покемона.\n3. Как только покебол попал, отпустите палец и жмите 'Сбежать' (кнопка в левом верхнем углу).\n4. Вы выходите на карту, а покемон уже в хранилище!"
        }
      }
    ]
  },
  {
    id: "pokemon-iv-cp-appraise-guide",
    slug: "pokemon-iv-cp-appraise-guide",
    iconName: "Sparkles",
    imageUrl: "https://cdn.leekduck.com/assets/img/items/Master%20Ball.png",
    featured: false,
    author: "PoGo Events Team",
    readTime: "6 min",
    updatedAt: "2026-08-15",
    category: {
      cs: "Základy & Mechaniky",
      en: "Game Mechanics",
      ja: "ゲームメカニクス",
      ru: "Механика игры"
    },
    title: {
      cs: "Rozbor IV, CP a Hodnocení (Appraise): PvE 100% vs PvP ideální IV",
      en: "Understanding IVs, CP & Appraisal: PvE 100% vs PvP Ideal IV Spreads",
      ja: "IV（個体値）、CP、評価システム：PvE用100%とPvP用理想個体値の違い",
      ru: "Разбор IV, CP и Appraise: PvE 100% против идеальных PvP характеристик"
    },
    subtitle: {
      cs: "Vše o skrytých statistikách Attack, Defense, Stamina a proč je v Great/Ultra League nejlepší mít 0 Attack a 15 Defense/HP.",
      en: "Deep dive into hidden stats (Attack, Defense, Stamina) and why low Attack (0/15/15) is mathematically superior in Great and Ultra PvP leagues.",
      ja: "攻撃・防御・HPの隠しステータス解説と、スーパー／ハイパーリーグで低攻撃（0/15/15）が最強とされる数学的理由。",
      ru: "Все о параметрах Attack, Defense, Stamina и почему в Great и Ultra лигах идеален низкий Attack (0/15/15)."
    },
    sections: [
      {
        id: "iv-explained",
        heading: {
          cs: "Co jsou to IV statistiky (Individual Values)",
          en: "What are IV Stats (Individual Values)",
          ja: "IV（個体値）とは何か",
          ru: "Что такое IV (Individual Values)"
        },
        content: {
          cs: "Každý Pokémon má 3 skryté IV vlastnosti v rozmezí 0–15: Attack, Defense a Stamina (HP). Tyto hodnoty se přičítají k základním statům druhu (Base Stats). Pokémon s hodnotami 15/15/15 se označuje jako 4★ neboli 100% IV (Hundo).\nPro PvE (Raidy, Gymy, Team Rocket) je VŽDY nejlepší mít 100% IV (15/15/15) nebo 15 Attack, protože v raidech není žádný CP limit.",
          en: "Every Pokémon possesses 3 hidden IV values (0–15): Attack, Defense, and Stamina (HP), added on top of species base stats. A 15/15/15 Pokémon is a 4-Star 100% IV (Hundo).\nFor PvE (Raids, Gyms, Team GO Rocket), 100% IV (15/15/15) is ALWAYS optimal because there is no CP cap in raids.",
          ja: "全てのポケモンには0〜15の隠し個体値（攻撃・防御・HP）が存在します。15/15/15は個体値100%（Hundo）と呼ばれます。\nPvE（レイド、ジム、ロケット団）ではCP制限がないため、常に個体値100%（または攻撃15）が最強です。",
          ru: "У каждого покемона есть 3 скрытых IV параметра (0–15): Attack, Defense, Stamina. 15/15/15 — это 4* 100% IV (Hundo).\nДля PvE (Рейды, Гимы, Ракета) ВСЕГДА идеален 100% IV, так как в рейдах нет лимита CP."
        }
      },
      {
        id: "pvp-iv-mechanics",
        heading: {
          cs: "Proč je v PvP Great/Ultra League nejlepší 0/15/15 IV?",
          en: "Why is 0/15/15 Optimal for Great & Ultra PvP Leagues?",
          ja: "PvP（スーパー／ハイパーリーグ）で0/15/15が最強な理由",
          ru: "Почему в PvP Great/Ultra League лучший IV — 0/15/15?"
        },
        content: {
          cs: "Ve formulaci CP má hodnota Attack dvakrát větší vliv na růst CP než Defense a HP. Pokud má Pokémon nízký Attack (např. 0–2), jeho CP roste pomaleji, což mu umožňuje dosáhnout podstatně vyššího Levelu (a tím pádem mít obrovské množství HP a obrany) před dosažením limitu 1500 CP (Great League) nebo 2500 CP (Ultra League).\nVýjimka: Master League (bez CP limitu) vyžaduje vždy 100% IV (15/15/15).",
          en: "In the CP formula, Attack is weighted twice as heavily as Defense and HP. A low Attack stat (0–2) keeps CP lower per level, allowing the Pokémon to power up to a significantly higher Level—granting massive extra bulk and total Stat Product under the 1,500 CP (Great League) or 2,500 CP (Ultra League) caps!\nException: Master League (no CP cap) strictly requires 100% IV (15/15/15).",
          ja: "CP計算式において、攻撃力は防御やHPの約2倍CPを跳ね上げる重み付けがされています。攻撃個体値を低く（0〜2）抑えるとCPの上昇が緩やかになり、CP 1500や2500の制限内でより高いレベルまで強化でき、結果として耐久力（Stat Product）が最大化されます。\n※マスターリーグ（無制限）では100%個体値（15/15/15）が必須です。",
          ru: "В формуле CP параметр Attack влияет на CP в 2 раза сильнее, чем Defense и HP. Низкий Attack (0–2) позволяет прокачать покемона до более высокого уровня под лимит 1500 CP (Great League) или 2500 CP (Ultra League), что дает максимальную живучесть!\nИсключение: В Master League нужен только 100% IV."
        }
      }
    ]
  },
  {
    id: "mega-dynamax-mechanics-guide",
    slug: "mega-dynamax-mechanics-guide",
    iconName: "Trophy",
    imageUrl: "https://cdn.leekduck.com/assets/img/items/Max%20Mushroom.png",
    featured: false,
    author: "PoGo Events Team",
    readTime: "8 min",
    updatedAt: "2026-08-15",
    category: {
      cs: "Mega & Max Battles",
      en: "Mega & Max Battles",
      ja: "メガ＆マックスバトル",
      ru: "Мега и Макс Битвы"
    },
    title: {
      cs: "Mega Evoluce a Max Battles: Kompletní průvodce bonusy a mechanikami",
      en: "Mega Evolution & Max Battles: Comprehensive Mechanics Guide",
      ja: "メガシンカ＆マックスバトル：ボーナスとシステム完全攻略",
      ru: "Мега-Эволюции и Max Battles: Гайд по бонусам и механике"
    },
    subtitle: {
      cs: "Jak zvýšit Mega Úroveň (Mega Level 3), maximalizovat Candy XL a ovládnout Max Battles u Power Spotů.",
      en: "How to reach Mega Level 3, maximize Candy XL drop rates, and master Max Moves and Dynamax battles at Power Spots.",
      ja: "メガレベル3の育成法、アメXLドロップ率最大化、パワースポットでのマックス技強化とダイマックス攻略。",
      ru: "Как прокачать Mega Level 3, максимизировать Candy XL и побеждать в Max Battles на Power Spot."
    },
    sections: [
      {
        id: "mega-levels",
        heading: {
          cs: "Mega Úrovně (Base, High, Max Level 3) a Candy XL",
          en: "Mega Levels Breakdown (Level 1, 2, 3) & Candy XL Yields",
          ja: "メガレベル（レベル1、2、3）とアメXL獲得率",
          ru: "Уровни Мега-Эволюций (Level 1, 2, 3) и фарминг Candy XL"
        },
        content: {
          cs: "Opakovanou Mega Evolucí jednou denně zvyšujete Mega Úroveň Pokémona:\n• Base Mega Level (1 evoluce): +1 Catch Candy, +50 Catch XP, 7 dní cooldown zdarma.\n• High Mega Level (7 evolucí): +1 Catch Candy, +100 Catch XP, +10% šance na Candy XL, 5 dní cooldown zdarma.\n• Max Mega Level (30 evolucí): +2 Catch Candy, +200 Catch XP, +25% VYNIKAJÍCÍ šance na Candy XL, cooldown zdarma pouhé 3 dny!\nPři Raid Day nebo Community Day mějte VŽDY aktivního Mega Pokémona s Max Mega Level stejného typu pro zisk 40–80+ Candy XL!",
          en: "Mega Evolving once per day levels up your Mega Pokémon:\n• Base Level (1 evolution): +1 Catch Candy, +50 Catch XP, 7-day free cooldown.\n• High Level (7 evolutions): +1 Catch Candy, +100 Catch XP, +10% Candy XL chance, 5-day free cooldown.\n• Max Level (30 evolutions): +2 Catch Candy, +200 Catch XP, +25% MASSIVE Candy XL chance, 3-day free cooldown!\nDuring Raid Days or Community Days, ALWAYS activate a Max Level Mega of matching type to farm 40–80+ bonus Candy XL!",
          ja: "1日1回メガシンカさせることでメガレベルが上昇します：\n• ベースレベル（1回）：捕獲時アメ+1個、XP+50、無料再進化クールダウン7日。\n• ハイレベル（7回）：捕獲時アメ+1個、XP+100、アメXL確率+10%、クールダウン5日。\n• マックスレベル（30回）：捕獲時アメ+2個、XP+200、アメXL確率+25%、クールダウンわずか3日！\nレイドデイやコミュデイでは必ず同タイプのマックスレベルメガを起動し、アメXLを大量確保しましょう！",
          ru: "Повышение Mega Level (1 раз в день):\n• Base Level (1 раз): +1 Candy, +50 XP, бесплатный кд 7 дней.\n• High Level (7 раз): +1 Candy, +100 XP, +10% к шансу Candy XL, кд 5 дней.\n• Max Level (30 раз): +2 Candy, +200 XP, +25% К ШАНСУ CANDY XL, кд 3 дня!\nНа Raid Day и Community Day ВСЕГДА включайте Mega Level 3 того же типа для фарма Candy XL!"
        }
      },
      {
        id: "dynamax-power-spots",
        heading: {
          cs: "Dynamax, Gigantamax a Power Spoty",
          en: "Dynamax, Gigantamax & Power Spot Combat",
          ja: "ダイマックス、キョダイマックス、パワースポット攻略",
          ru: "Dynamax, Gigantamax и бои на Power Spot"
        },
        content: {
          cs: "Dynamax a Gigantamax probíhají na Power Spotech pomocí Max Particles (MP):\n• Denní limit: Můžete nasbírat až 800 MP denně (protočením Power Spotů nebo nachozením 2 km).\n• Max Moves: Každý Dynamax Pokémon má 3 Max útoky: Max Strike/Attack (útok), Max Guard (ochrana celého týmu před poškozením) a Max Spirit (léčení HP celého týmu!). Vylepšování Max Spirit a Max Guard je klíčem k sólování těžkých 3★ a 6★ Gigantamax bossů.",
          en: "Dynamax and Gigantamax battles occur at Power Spots using Max Particles (MP):\n• Daily MP Cap: Collect up to 800 MP daily by visiting Power Spots and walking 2 km intervals.\n• Max Moves: Each Dynamax Pokémon features 3 Max Moves: Max Attack, Max Guard (reduces incoming damage for the entire team), and Max Spirit (heals entire team HP!). Upgrading Max Spirit and Max Guard is essential for conquering heavy 3★ and 6★ Gigantamax bosses.",
          ja: "パワースポットでのダイマックスバトルはマックス粒子（MP）を使用します：\n• 1日の上限：パワースポット巡回や2km歩行で1日最大800 MP収集可能。\n• マックス技：ダイアタック（攻撃）、ダイウォール（チーム全体の被ダメージ軽減）、ダイリカバリー（チーム全体のHP回復）の3種。ダイリカバリーとダイウォールをレベルアップすることが高難度キョダイマックス撃破の鍵です。",
          ru: "Бои Dynamax и Gigantamax на Power Spots требуют Max Particles (MP):\n• Дневной лимит: до 800 MP в день.\n• Max Moves: Max Attack, Max Guard (защита команды) и Max Spirit (лечение всей команды!). Прокачка Max Spirit критически важна для сложных 3★ и 6★ Gigantamax рейдов."
        }
      }
    ]
  },
  {
    id: "pokemon-evolution-quests-guide",
    slug: "pokemon-evolution-quests-guide",
    iconName: "Sparkles",
    imageUrl: "https://cdn.leekduck.com/assets/img/items/Sinnoh%20Stone.png",
    author: "PoGo Events Team",
    readTime: "12 min",
    updatedAt: "2026-08-23",
    category: {
      cs: "Evoluce & Buddy Úkoly",
      en: "Evolution & Buddy Tasks",
      ja: "進化＆相棒タスク",
      ru: "Эволюция и Квесты Напарника"
    },
    title: {
      cs: "Všechny Evolve Questy v Pokémon GO: Návod jak vyvinout Farfetch'da, Panchama, Annihilape a další (2026)",
      en: "All Pokémon GO Evolution Quests: Complete Guide for Farfetch'd, Pancham, Annihilape & More (2026)",
      ja: "【2026最新】全特殊進化タスク完全攻略：カモネギ、ヤンチャム、コノヨザル等の進化条件一覧",
      ru: "Все спец-квесты на эволюцию в Pokémon GO: Гайд по Farfetch'd, Pancham, Annihilape и др. (2026)"
    },
    subtitle: {
      cs: "Kompletní přehled všech Pokémonů se speciálními podmínkami vývoje – od 10 Excellent hodů, přes porážení typů, chůzi s buddym, až po otočení telefonu a počasí.",
      en: "Master list of all Pokémon requiring special evolution tasks in Pokémon GO — from 10 Excellent throws and defeating types to walking distance, phone inversion, and lure modules.",
      ja: "エクセレントスロー10回、特定タイプ討伐、相棒歩行、スマホ逆さま、ルアーモジュール進化など全特殊進化を一挙解説。",
      ru: "Полный список покемонов со специальными условиями эволюции: 10 Excellent бросков, победы над типами, дистанция напарника, переворот телефона и модули."
    },
    sections: [
      {
        id: "buddy-task-evolutions",
        heading: {
          cs: "1. Adventure Together: Úkoly při nasazení jako Buddy",
          en: "1. Adventure Together: Active Buddy Evolution Tasks",
          ja: "1. 相棒と一緒に冒険：アクティブ相棒タスク進化",
          ru: "1. Adventure Together: Задания при активном напарнике"
        },
        content: {
          cs: "Pro splnění těchto úkolů musíte mít daného Pokémona aktivně nastaveného jako svého Buddyho. Po splnění úkolu se počítadlo nezresetuje ani při výměně buddyho, a Pokémona můžete vyvinout kdykoliv později:\n\n• Galarian Farfetch'd ➔ Sirfetch'd: Hoďte 10× Excellent hodů (50 Candy).\n• Primeape ➔ Annihilape: Poražte 30 Ghost- nebo Psychic-type Pokémonů (100 Candy).\n• Pancham ➔ Pangoro: Chyťte 32 Dark-type Pokémonů (50 Candy).\n• Charcadet ➔ Armarouge: Poražte 30 Psychic-type Pokémonů (50 Candy).\n• Charcadet ➔ Ceruledge: Poražte 30 Ghost-type Pokémonů (50 Candy).\n• Galarian Slowpoke ➔ Galarian Slowbro: Chyťte 30 Poison-type Pokémonů (50 Candy).\n• Galarian Slowpoke ➔ Galarian Slowking: Chyťte 30 Psychic-type Pokémonů (50 Candy).\n• Poipole ➔ Naganadel: Chyťte 20 Dragon-type Pokémonů (200 Candy).\n• Galarian Yamask ➔ Runerigus: Vyhrajte 10 Raidů jako buddy (50 Candy).\n• Hisuian Qwilfish ➔ Overqwil: Vyhrajte 10 Raidů jako buddy (50 Candy).\n• Spritzee ➔ Aromatisse: Aktivujte 1× Incense (50 Candy).\n• Swirlix ➔ Slurpuff: Nakrmte buddyho 25 pamlsky / Berries (50 Candy).\n• Floette ➔ Florges: Získejte 20 Buddy srdíček (100 Candy).\n• Eevee ➔ Sylveon: Získejte 70 Buddy srdíček (25 Candy, nebo 1× name trick: Kira).",
          en: "The following Pokémon must be set as your active Buddy while completing the challenge. Progress is permanently saved even if you switch buddies before evolving:\n\n• Galarian Farfetch'd ➔ Sirfetch'd: Make 10 Excellent Throws (50 Candy).\n• Primeape ➔ Annihilape: Defeat 30 Ghost- or Psychic-type Pokémon (100 Candy).\n• Pancham ➔ Pangoro: Catch 32 Dark-type Pokémon (50 Candy).\n• Charcadet ➔ Armarouge: Defeat 30 Psychic-type Pokémon (50 Candy).\n• Charcadet ➔ Ceruledge: Defeat 30 Ghost-type Pokémon (50 Candy).\n• Galarian Slowpoke ➔ Galarian Slowbro: Catch 30 Poison-type Pokémon (50 Candy).\n• Galarian Slowpoke ➔ Galarian Slowking: Catch 30 Psychic-type Pokémon (50 Candy).\n• Poipole ➔ Naganadel: Catch 20 Dragon-type Pokémon (200 Candy).\n• Galarian Yamask ➔ Runerigus: Win 10 Raids while buddy (50 Candy).\n• Hisuian Qwilfish ➔ Overqwil: Win 10 Raids while buddy (50 Candy).\n• Spritzee ➔ Aromatisse: Activate 1 Incense (50 Candy).\n• Swirlix ➔ Slurpuff: Feed your buddy 25 treats / berries (50 Candy).\n• Floette ➔ Florges: Earn 20 Buddy Hearts (100 Candy).\n• Eevee ➔ Sylveon: Earn 70 Buddy Hearts (25 Candy, or 1-time name trick: Kira).",
          ja: "以下のポケモンは相棒に設定した状態でタスクを達成する必要があります。達成後は相棒を解除しても進化条件は保持されます：\n\n• ガラルカモネギ ➔ ネギガナイト：エクセレントスローを10回投げる（アメ50個）\n• オコリザル ➔ コノヨザル：ゴーストまたはエスパータイプのポケモンを30匹倒す（アメ100個）\n• ヤンチャム ➔ ゴロンダ：あくタイプのポケモンを32匹捕まえる（アメ50個）\n• カルボウ ➔ グレンアルマ：エスパータイプを30匹倒す（アメ50個）\n• カルボウ ➔ ソウブレイズ：ゴーストタイプを30匹倒す（アメ50個）\n• ガラルヤドン ➔ ガラルヤドラン：どくタイプを30匹捕獲（アメ50個）\n• ガラルヤドン ➔ ガラルヤドキング：エスパータイプを30匹捕獲（アメ50個）\n• ベベノム ➔ アーゴヨン：ドラゴンタイプを20匹捕獲（アメ200個）\n• ガラルデスマス ➔ デスバーン：レイドバトルで10回勝利（アメ50個）\n• ヒスイハリーセン ➔ ハリーマン：レイドバトルで10回勝利（アメ50個）\n• シュシュプ ➔ フレフワン：おこうを1個使う（アメ50個）\n• ペロッパフ ➔ ペロリーム：相棒におやつを25個あげる（アメ50個）\n• フラエッテ ➔ フラージェス：相棒ハートを20個獲得（アメ100個）\n• イーブイ ➔ ニンフィア：相棒ハートを70個獲得（アメ25個、初回限定裏技: Kira）",
          ru: "Покемон должен быть выбран вашим активным напарником (Buddy) во время выполнения условий:\n\n• Galarian Farfetch'd ➔ Sirfetch'd: 10 Excellent бросков (50 конфет).\n• Primeape ➔ Annihilape: Победить 30 Ghost или Psychic покемонов (100 конфет).\n• Pancham ➔ Pangoro: Поймать 32 Dark покемона (50 конфет).\n• Charcadet ➔ Armarouge: Победить 30 Psychic покемонов (50 конфет).\n• Charcadet ➔ Ceruledge: Победить 30 Ghost покемонов (50 конфет).\n• Galarian Slowpoke ➔ Galarian Slowbro: Поймать 30 Poison покемонов (50 конфет).\n• Galarian Slowpoke ➔ Galarian Slowking: Поймать 30 Psychic покемонов (50 конфет).\n• Poipole ➔ Naganadel: Поймать 20 Dragon покемонов (200 конфет).\n• Galarian Yamask ➔ Runerigus: Выиграть 10 рейдов (50 конфет).\n• Hisuian Qwilfish ➔ Overqwil: Выиграть 10 рейдов (50 конфет).\n• Spritzee ➔ Aromatisse: Использовать 1 ладан (Incense) (50 конфет).\n• Swirlix ➔ Slurpuff: Скормить 25 ягод/угощений (50 конфет).\n• Floette ➔ Florges: Заработать 20 сердец напарника (100 конфет).\n• Eevee ➔ Sylveon: Заработать 70 сердец напарника (25 конфет, или имя Kira)."
        },
        tips: {
          cs: [
            "Pro Annihilape a Charcadeta: Nemusíte čekat na raidy! Trénujte s Blanche v Master League (má Metagrosse) nebo dejte rychlý PvP souboj s kamarádem s 3× CP 10 Pokémony!",
            "Pro Galarian Farfetch'da: Použijte Nanab Berry na legendární raid bossy s velkým target kruhem pro 100% jistotu Excellent hodu.",
            "Pro Spritzee: Počítá se i bezplatný 15minutový Daily Adventure Incense."
          ],
          en: [
            "For Annihilape & Charcadet: No need to wait for raids! Train against Team Leader Blanche in Master League (she uses Metagross) or battle a friend fielding three 10-CP Pokémon.",
            "For Galarian Farfetch'd: Use Nanab Berries on 5★ Legendary raid bosses with massive catch rings to effortlessly land 10 Excellent throws.",
            "For Spritzee: The free 15-minute Daily Adventure Incense fully counts for this requirement!"
          ],
          ja: [
            "コノヨザル＆カルボウの裏技：チームリーダーのブランシェ（マスターリーグ）と対戦するか、フレンドにCP10のポケモンを3匹出してもらい素早く30回倒せば数分で達成できます！",
            "ガラルカモネギ：伝説レイドボスの大きなサークルにナナのみを使って落ち着いてエクセレントを狙いましょう。",
            "シュシュプ：無料の「おさんぽおこう（15分）」でも進化条件をクリアできます。"
          ],
          ru: [
            "Лайфхак для Annihilape и Charcadet: Не ждите рейдов! Сражайтесь с лидером Blanche в Master League или попросите друга выставить трех покемонов с 10 CP в PvP!",
            "Для Farfetch'd: Бросайте в легендарных боссов с Nanab Berry для легких Excellent бросков.",
            "Для Spritzee: Бесплатный Daily Adventure Incense полностью засчитывается!"
          ]
        }
      },
      {
        id: "walking-distance-evolutions",
        heading: {
          cs: "2. Chůze s Buddym (Walking Distance)",
          en: "2. Walking Distance Buddy Evolutions",
          ja: "2. 相棒と歩いて進化（距離条件）",
          ru: "2. Дистанция ходьбы с напарником"
        },
        content: {
          cs: "Někteří Pokémoni vyžadují nachození určité vzdálenosti jako Buddy před stisknutím tlačítka Evolve:\n\n• Feebas ➔ Milotic: 20 km (100 Candy)\n• Pawmo ➔ Pawmot: 25 km (100 Candy)\n• Eevee ➔ Espeon: 10 km + vyvinout VE DNE (musí zůstat jako aktivní buddy! 25 Candy, Name trick: Sakura)\n• Eevee ➔ Umbreon: 10 km + vyvinout V NOCI (musí zůstat jako aktivní buddy! 25 Candy, Name trick: Tamao)\n• Hisuian Sneasel ➔ Sneasler: 7 km + vyvinout VE DNE (100 Candy)\n• Woobat ➔ Swoobat: 1 km (50 Candy)\n• Happiny ➔ Chansey: 15 km (25 Candy)\n• Bonsly ➔ Sudowoodo: 15 km (50 Candy)\n• Mime Jr. ➔ Mr. Mime: 15 km (50 Candy)",
          en: "These Pokémon must be walked as your active Buddy to unlock their evolution:\n\n• Feebas ➔ Milotic: 20 km (100 Candy)\n• Pawmo ➔ Pawmot: 25 km (100 Candy)\n• Eevee ➔ Espeon: 10 km + evolve during DAYTIME while set as Buddy (25 Candy, Name trick: Sakura)\n• Eevee ➔ Umbreon: 10 km + evolve during NIGHTTIME while set as Buddy (25 Candy, Name trick: Tamao)\n• Hisuian Sneasel ➔ Sneasler: 7 km + evolve during DAYTIME (100 Candy)\n• Woobat ➔ Swoobat: 1 km (50 Candy)\n• Happiny ➔ Chansey: 15 km (25 Candy)\n• Bonsly ➔ Sudowoodo: 15 km (50 Candy)\n• Mime Jr. ➔ Mr. Mime: 15 km (50 Candy)",
          ja: "相棒にして一定距離を歩くことで進化が可能になるポケモン一覧：\n\n• ヒンバス ➔ ミロカロス：20 km（アメ100個）\n• パモット ➔ パーモット：25 km（アメ100個）\n• イーブイ ➔ エーフィ：10 km ＋ 相棒のまま「昼」に進化（アメ25個、裏技名: Sakura）\n• イーブイ ➔ ブラッキー：10 km ＋ 相棒のまま「夜」に進化（アメ25個、裏技名: Tamao）\n• ヒスイニューラ ➔ オオニューラ：7 km ＋「昼」に進化（アメ100個）\n• コロモリ ➔ ココロモリ：1 km（アメ50個）\n• ピンプク ➔ ラッキー：15 km（アメ25個）\n• ウソハチ ➔ ウソッキー：15 km（アメ50個）\n• マネネ ➔ バリヤード：15 km（アメ50個）",
          ru: "Покемоны, требующие нагулять дистанцию в роли активного напарника:\n\n• Feebas ➔ Milotic: 20 км (100 конфет)\n• Pawmo ➔ Pawmot: 25 км (100 конфет)\n• Eevee ➔ Espeon: 10 км + эволюция ДНЕМ, оставаясь напарником (25 конфет, имя: Sakura)\n• Eevee ➔ Umbreon: 10 км + эволюция НОЧЬЮ, оставаясь напарником (25 конфет, имя: Tamao)\n• Hisuian Sneasel ➔ Sneasler: 7 км + эволюция ДНЕМ (100 конфет)\n• Woobat ➔ Swoobat: 1 км (50 конфет)\n• Happiny ➔ Chansey: 15 км (25 конфет)\n• Bonsly ➔ Sudowoodo: 15 км (50 конфет)\n• Mime Jr. ➔ Mr. Mime: 15 км (50 конфет)"
        },
        tips: {
          cs: [
            "POZOR u Espeona a Umbreona: Po nachození 10 km NESMÍTE Eevee sundat z pozice Buddyho! Tlačítko Evolve musí ukazovat siluetu Espeona/Umbreona, nikoliv otazník.",
            "Denní a noční čas se řídí reálným herním světlem na mapě (slunce / měsíc)."
          ],
          en: [
            "CRITICAL for Espeon & Umbreon: After walking 10 km, keep Eevee as your ACTIVE Buddy when evolving! The Evolve button MUST display Espeon or Umbreon's silhouette instead of a question mark.",
            "Day/night transition follows the real-time lighting cycle on your in-game map."
          ],
          ja: [
            "重要（エーフィ＆ブラッキー）：10km歩いた後、相棒を解除せずに進化ボタンを押してください！ボタンにシルエット（？ではなく）が表示されていることを必ず確認しましょう。",
            "昼夜の判定はゲーム内マップの明るさ（太陽／月）と連動しています。"
          ],
          ru: [
            "ВАЖНО для Espeon и Umbreon: После 10 км НЕ снимайте Eevee с напарника! На кнопке эволюции должен быть силуэт нужного покемона, а не знак вопроса (?).",
            "Смена дня и ночи определяется освещением на игровой карте."
          ]
        }
      },
      {
        id: "unique-lure-item-mechanics",
        heading: {
          cs: "3. Unikátní mechaniky: Gyroskop, Úplněk, Den/Noc a Mince",
          en: "3. Unique Mechanics: Gyroscope, Full Moon, Day/Night & Coins",
          ja: "3. 特殊ギミック：スマホ逆さま、満月、昼夜、コレクレーのコイン",
          ru: "3. Уникальные механики: Гироскоп, Полнолуние, День/Ночь и Монеты"
        },
        content: {
          cs: "Speciální fyzikální a herní podmínky:\n\n• Inkay ➔ Malamar: 50 Candy + Fyzicky otočit telefon vzhůru nohama (displejem dolů). Vyžaduje povolenou auto-rotaci a funkční gyroskop v mobilu!\n• Ursaring ➔ Ursaluna: 100 Candy během astronomického úplňku (Full Moon na noční obloze ve hře) nebo při vybraných eventech.\n• Cosmoem ➔ Solgaleo (ve dne ☀️) / Lunala (v noci 🌙): 100 Candy.\n• Rockruff ➔ Lycanroc: Midday (ve dne ☀️), Midnight (v noci 🌙), Dusk (17:00–19:00 u Dusk Rockruffa).\n• Tyrunt ➔ Tyrantrum (ve dne ☀️) / Amaura ➔ Aurorus (v noci 🌙): 50 Candy.\n• Yungoos ➔ Gumshoos / Fomantis ➔ Lurantis: Ve dne ☀️ (50 Candy).\n• Tyrogue: Podle nejvyšší IV statistiky (Attack ➔ Hitmonlee, Defense ➔ Hitmonchan, HP ➔ Hitmontop).\n• Gimmighoul (Roaming Form) ➔ Gholdengo: 999 Gimmighoul Coins + 100 Candy (z Coin Bagu přes Nintendo Switch).\n• Tandemaus ➔ Maushold: 50 Candy (99% Family of Four, 1% ultra-vzácná Family of Three).",
          en: "Unique physical and situational evolution criteria:\n\n• Inkay ➔ Malamar: 50 Candy + physically turn your mobile device upside down! Ensure screen auto-rotate is enabled and gyro permissions are active.\n• Ursaring ➔ Ursaluna: 100 Candy during a real-world astronomical Full Moon phase (visible in the night sky in-game) or special event windows.\n• Cosmoem ➔ Solgaleo (Daytime ☀️) / Lunala (Nighttime 🌙): 100 Candy.\n• Rockruff ➔ Lycanroc: Midday (Daytime ☀️), Midnight (Nighttime 🌙), Dusk (17:00–19:00 local with Dusk-capable Rockruff).\n• Tyrunt ➔ Tyrantrum (Daytime ☀️) / Amaura ➔ Aurorus (Nighttime 🌙): 50 Candy.\n• Yungoos ➔ Gumshoos / Fomantis ➔ Lurantis: Daytime ☀️ (50 Candy).\n• Tyrogue IV Formula: Highest Attack ➔ Hitmonlee, highest Defense ➔ Hitmonchan, highest HP ➔ Hitmontop (ties are 50/50 random).\n• Gimmighoul (Roaming Form) ➔ Gholdengo: 999 Gimmighoul Coins + 100 Candy (via Coin Bag and Golden Lures).\n• Tandemaus ➔ Maushold: 50 Candy (99% Family of Four, 1% ultra-rare Family of Three).",
          ja: "物理的・環境的特殊ギミック進化一覧：\n\n• マーイーカ ➔ カラマネロ：アメ50個 ＋ スマホ本体を上下逆さまにする（画面の自動回転をONにしジャイロを有効にしてください）。\n• リングマ ➔ ガチグマ：アメ100個 ＋ 現実の「満月」の夜（ゲーム内の空に満月出現時）または特別イベント時。\n• コスモウム ➔ ソルガレオ（昼 ☀️）/ ルナアーラ（夜 🌙）：アメ100個。\n• イワンコ ➔ ルガルガン：まひる（昼 ☀️）、まよなか（夜 🌙）、たそがれ（17:00〜19:00・限定個体）。\n• チゴラス ➔ ガチゴラス（昼 ☀️）/ アマルス ➔ アマルルガ（夜 🌙）：アメ50個。\n• ヤングース ➔ デカグース / カリキリ ➔ ラランテス：昼間 ☀️（アメ50個）。\n• バルキー（個体値判定）：攻撃最高 ➔ サワムラー、防御最高 ➔ エビワラー、HP最高 ➔ カポエラー。\n• コレクレー（とほフォルム）➔ サーフゴー：コレクレーのコイン999枚＋アメ100個。\n• ワッカネズミ ➔ イッカネズミ：アメ50個（99% 4ひきかぞく、1% 超激レア 3びきかぞく）。",
          ru: "Уникальные механические и ситуационные условия эволюции:\n\n• Inkay ➔ Malamar: 50 конфет + физически перевернуть телефон вверх ногами (включите автоповорот экрана!).\n• Ursaring ➔ Ursaluna: 100 конфет во время реального полнолуния (Full Moon на небе в игре) или ивентов.\n• Cosmoem ➔ Solgaleo (днем ☀️) / Lunala (ночью 🌙): 100 конфет.\n• Rockruff ➔ Lycanroc: Midday (днем ☀️), Midnight (ночью 🌙), Dusk (17:00–19:00 у Dusk Rockruff).\n• Tyrunt ➔ Tyrantrum (днем ☀️) / Amaura ➔ Aurorus (ночью 🌙): 50 конфет.\n• Yungoos ➔ Gumshoos / Fomantis ➔ Lurantis: Днем ☀️ (50 конфет).\n• Tyrogue (по IV): Макс. Attack ➔ Hitmonlee, макс. Defense ➔ Hitmonchan, макс. HP ➔ Hitmontop.\n• Gimmighoul ➔ Gholdengo: 999 Gimmighoul Coins + 100 конфет.\n• Tandemaus ➔ Maushold: 50 конфет (99% Family of Four, 1% редкая Family of Three)."
        },
        tips: {
          cs: [
            "Při Inkay evoluci: Pokud se tlačítko Evolve nezaktivuje po otočení, vypněte a znovu zapněte zámek rotace displeje v nastavení telefonu.",
            "Pro Gholdengo: Odesílejte denně pohlednici (Postcard) do Nintendo Switch pro získání Coin Bagu a Golden Lure Modulu!"
          ],
          en: [
            "Inkay Inversion Fix: If the Evolve button does not highlight upside down, toggle your phone's screen auto-rotate lock off and on in system quick settings.",
            "For Gholdengo: Send a daily Postcard to Nintendo Switch to refresh your Coin Bag and earn Golden Lure Modules!"
          ],
          ja: [
            "マーイーカが進化できない場合：スマホの画面回転ロックを解除し、OSの設定でジャイロセンサーが許可されているか確認してください。",
            "サーフゴー入手：毎日ポストカードをニンテンドースイッチに送ることで「だいじなたからばこ」が復活しコインを大量に集められます！"
          ],
          ru: [
            "Если Inkay не эволюционирует: отключите блокировку ориентации экрана в шторке смартфона.",
            "Для Gholdengo: Ежедневно отправляйте открытку на Nintendo Switch для обновления мешка с монетами!"
          ]
        }
      },
      {
        id: "lures-stones-trade-evolutions",
        heading: {
          cs: "4. Lure Moduly, Evoluční Kameny a Trade Evoluce (0 Candy)",
          en: "4. Lure Modules, Evolution Stones & Trade Evolutions (0 Candy)",
          ja: "4. 特別ルアー、進化アイテム、交換進化（アメ0個）",
          ru: "4. Специальные приманки, Камни эволюции и Трейд-эволюции (0 конфет)"
        },
        content: {
          cs: "Podmínky pro speciální moduly, kameny a obchodování:\n\n• Rainy Lure / Déšť: Sliggoo ➔ Goodra / Hisuian Goodra (100 Candy).\n• Magnetic Lure: Magneton ➔ Magnezone, Nosepass ➔ Probopass, Charjabug ➔ Vikavolt (100 Candy).\n• Mossy Lure: Eevee ➔ Leafeon (Name trick: Linnea).\n• Glacial Lure: Eevee ➔ Glaceon (Name trick: Rea), Crabrawler ➔ Crabominable (50 Candy).\n• Sinnoh Stone: Kirlia (♂) ➔ Gallade, Snorunt (♀) ➔ Froslass, Togetic ➔ Togekiss, Roselia ➔ Roserade, Murkrow ➔ Honchkrow, Misdreavus ➔ Mismagius, Gligar ➔ Gliscor, Sneasel ➔ Weavile, Swinub ➔ Mamoswine, Porygon2 ➔ Porygon-Z, Dusclops ➔ Dusknoir, Rhydon ➔ Rhyperior, Electabuzz ➔ Electivire, Magmar ➔ Magmortar, Tangela ➔ Tangrowth, Yanma ➔ Yanmega, Lickitung ➔ Lickilicky, Aipom ➔ Ambipom.\n• Unova Stone: Lampent ➔ Chandelure, Minccino ➔ Cinccino, Eelektrik ➔ Eelektross, Pansear/Pansage/Panpour, Munna ➔ Musharna.\n• Sun Stone: Gloom ➔ Bellossom, Sunkern ➔ Sunflora, Cottonee ➔ Whimsicott, Petilil ➔ Lilligant, Helioptile ➔ Heliolisk.\n• King's Rock: Poliwhirl ➔ Politoed, Slowpoke ➔ Slowking.\n• Metal Coat: Scyther ➔ Scizor, Onix ➔ Steelix.\n• Dragon Scale: Seadra ➔ Kingdra.\n• Up-Grade: Porygon ➔ Porygon2.\n• Trade Evolution (0 Candy po výměně): Kadabra ➔ Alakazam, Machoke ➔ Machamp, Graveler ➔ Golem, Haunter ➔ Gengar, Boldore ➔ Gigalith, Gurdurr ➔ Conkeldurr, Karrablast ➔ Escavalier, Shelmet ➔ Accelgor, Phantump ➔ Trevenant, Pumpkaboo ➔ Gourgeist.\n• Random 50/50 & 33% Evoluce: Eevee ➔ Vaporeon/Jolteon/Flareon (33%), Wurmple ➔ Silcoon/Cascoon (50%), Clamperl ➔ Huntail/Gorebyss (50%).",
          en: "Requirements for module lures, items, trade discounts, and random paths:\n\n• Rainy Lure / Rain: Sliggoo ➔ Goodra / Hisuian Goodra (100 Candy).\n• Magnetic Lure: Magneton ➔ Magnezone, Nosepass ➔ Probopass, Charjabug ➔ Vikavolt (100 Candy).\n• Mossy Lure: Eevee ➔ Leafeon (Name trick: Linnea).\n• Glacial Lure: Eevee ➔ Glaceon (Name trick: Rea), Crabrawler ➔ Crabominable (50 Candy).\n• Sinnoh Stone: Kirlia (♂) ➔ Gallade, Snorunt (♀) ➔ Froslass, Togetic ➔ Togekiss, Roselia ➔ Roserade, Murkrow ➔ Honchkrow, Misdreavus ➔ Mismagius, Gligar ➔ Gliscor, Sneasel ➔ Weavile, Swinub ➔ Mamoswine, Porygon2 ➔ Porygon-Z, Dusclops ➔ Dusknoir, Rhydon ➔ Rhyperior, Electabuzz ➔ Electivire, Magmar ➔ Magmortar, Tangela ➔ Tangrowth, Yanma ➔ Yanmega, Lickitung ➔ Lickilicky, Aipom ➔ Ambipom.\n• Unova Stone: Lampent ➔ Chandelure, Minccino ➔ Cinccino, Eelektrik ➔ Eelektross, Pansear/Pansage/Panpour, Munna ➔ Musharna.\n• Sun Stone: Gloom ➔ Bellossom, Sunkern ➔ Sunflora, Cottonee ➔ Whimsicott, Petilil ➔ Lilligant, Helioptile ➔ Heliolisk.\n• King's Rock: Poliwhirl ➔ Politoed, Slowpoke ➔ Slowking.\n• Metal Coat: Scyther ➔ Scizor, Onix ➔ Steelix.\n• Dragon Scale: Seadra ➔ Kingdra.\n• Up-Grade: Porygon ➔ Porygon2.\n• Free Trade Evolutions (0 Candy cost after trading): Kadabra, Machoke, Graveler, Haunter, Boldore, Gurdurr, Karrablast, Shelmet, Phantump, Pumpkaboo.\n• Random Evolutions: Eevee ➔ Vaporeon/Jolteon/Flareon (33%), Wurmple ➔ Silcoon/Cascoon (50%), Clamperl ➔ Huntail/Gorebyss (50%).",
          ja: "ルアーモジュール、進化アイテム、交換進化、ランダム分岐進化一覧：\n\n• レイニールアー / 雨天：ヌメイル ➔ ヌメルゴン（アメ100個）\n• マグネットルアー：レアコイル ➔ ジバコイル、ノズパス ➔ ダイノーズ、デンヂムシ ➔ クワガノン（アメ100個）\n• ハーブルアー：イーブイ ➔ リーフィア（裏技名: Linnea）\n• アイスルアー：イーブイ ➔ グレイシア（裏技名: Rea）、マケンカニ ➔ ケケンカニ（アメ50個）\n• シンオウのいし：キルリア（♂）➔ エルレイド、ユキワラシ（♀）➔ ユキメノコ、トゲチック ➔ トゲキッス、ロゼリア ➔ ロズレイド、ヤミカラス ➔ ドンカラス、ムウマ ➔ ムウマージ、グライガー ➔ グライオン、ニューラ ➔ マニューラ、ウリムー ➔ マンムー、ポリゴン2 ➔ ポリゴンZ、サマヨール ➔ ヨノワール、サイドン ➔ ドサイドン、エレブー ➔ エレキブル、ブーバー ➔ ブーバーン、モンジャラ ➔ モジャンボ、ヤンヤンマ ➔ メガヤンマ、ベロリンガ ➔ ベロベルト、エイパム ➔ エテボース。\n• イッシュのいし：ランプラー ➔ シャンデラ、チラーミィ ➔ チラチーノ、シビビール ➔ シビルドン、バオップ/ヤナップ/ヒヤップ ➔ バオッキー/ヤナッキー/ヒヤッキー、ムンナ ➔ ムシャーナ。\n• たいようのいし：クサイハナ ➔ キレイハナ、ヒマナッツ ➔ キマワリ、モンメン ➔ エルフーン、チュリネ ➔ ドレディア、エリキテル ➔ エレザード。\n• おうじゃのしるし：ニョロゾ ➔ ニョロトノ、ヤドン ➔ ヤドキング。\n• メタルコート：ストライク ➔ ハッサム、イワーク ➔ ハガネール。\n• りゅうのウロコ：シードラ ➔ キングドラ。\n• アップグレード：ポリゴン ➔ ポリゴン2。\n• 交換進化（交換後アメ0個）：ユンゲラー、ゴーリキー、ゴローン、ゴースト、ガントル、ドテッコツ、カブルモ、チョボマキ、ボクレー、バケッチャ。\n• ランダム分岐進化：イーブイ ➔ シャワーズ/サンダース/ブースター（各33%）、ケムッソ ➔ カラサリス/マユルド（各50%）、パールル ➔ ハンテール/サクラビス（各50%）。",
          ru: "Модули приманок, камни эволюции, трейд-эволюции и случайные развилки:\n\n• Rainy Lure / Дождь: Sliggoo ➔ Goodra (100 конфет).\n• Magnetic Lure: Magneton ➔ Magnezone, Nosepass ➔ Probopass, Charjabug ➔ Vikavolt (100 конфет).\n• Mossy Lure: Eevee ➔ Leafeon (Имя: Linnea).\n• Glacial Lure: Eevee ➔ Glaceon (Имя: Rea), Crabrawler ➔ Crabominable (50 конфет).\n• Sinnoh Stone: Kirlia (♂) ➔ Gallade, Snorunt (♀) ➔ Froslass, Togetic ➔ Togekiss, Roselia ➔ Roserade, Murkrow ➔ Honchkrow, Misdreavus ➔ Mismagius, Gligar ➔ Gliscor, Sneasel ➔ Weavile, Swinub ➔ Mamoswine, Porygon2 ➔ Porygon-Z, Dusclops ➔ Dusknoir, Rhydon ➔ Rhyperior, Electabuzz ➔ Electivire, Magmar ➔ Magmortar, Tangela ➔ Tangrowth, Yanma ➔ Yanmega, Lickitung ➔ Lickilicky, Aipom ➔ Ambipom.\n• Unova Stone: Lampent ➔ Chandelure, Minccino ➔ Cinccino, Eelektrik ➔ Eelektross, Pansear/Pansage/Panpour, Munna ➔ Musharna.\n• Sun Stone: Gloom ➔ Bellossom, Sunkern ➔ Sunflora, Cottonee ➔ Whimsicott, Petilil ➔ Lilligant, Helioptile ➔ Heliolisk.\n• King's Rock: Poliwhirl ➔ Politoed, Slowpoke ➔ Slowking.\n• Metal Coat: Scyther ➔ Scizor, Onix ➔ Steelix.\n• Dragon Scale: Seadra ➔ Kingdra.\n• Up-Grade: Porygon ➔ Porygon2.\n• Бесплатная эволюция после обмена (0 конфет): Kadabra, Machoke, Graveler, Haunter, Boldore, Gurdurr, Karrablast, Shelmet, Phantump, Pumpkaboo.\n• Случайная эволюция: Eevee ➔ Vaporeon/Jolteon/Flareon (33%), Wurmple ➔ Silcoon/Cascoon (50%), Clamperl ➔ Huntail/Gorebyss (50%)."
        },
        tips: {
          cs: [
            "Při vývoji u Lure Modulu: Vždy nejprve zkontrolujte, zda ikona evoluce změnila siluetu z otazníku na konkrétního Pokémona.",
            "Při výměnách vždy měňte Pokémona chyceného 100+ km daleko pro garanci 1× Candy XL a ušetření až 200 Candy na evoluci!"
          ],
          en: [
            "Lure Module Tip: Always ensure the evolution button preview displays the specific target Pokémon silhouette instead of a generic question mark before evolving.",
            "Trading Pro-Tip: Trade Pokémon caught 100+ km apart to secure guaranteed Candy XL while unlocking the 0-Candy evolution cost!"
          ],
          ja: [
            "特別なルアー進化：進化ボタンを押す前に、進化先が「？」ではなく目的のポケモンのシルエットになっていることを必ず確認してください。",
            "交換進化のコツ：100km以上離れた場所で捕まえたポケモンをトレードすると、確定でアメXLを貰いつつ進化のアメ（最大200個）を無料にできます！"
          ],
          ru: [
            "При эволюции у Lure-модуля: Убедитесь, что на кнопке виден силуэт нужного покемона, а не знак вопроса (?).",
            "Совет по трейдам: Меняйтесь покемонами с дистанцией 100+ км для гарантированной Candy XL и экономии до 200 конфет на эволюции!"
          ]
        }
      }
    ]
  },
  {
    id: "vivillon-patterns-postcard-guide",
    slug: "vivillon-patterns-postcard-guide",
    iconName: "BookOpen",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/666.png",
    author: "PoGo Events Team",
    readTime: "10 min",
    updatedAt: "2026-08-23",
    category: {
      cs: "Vivillon & Postcards",
      en: "Vivillon & Postcards",
      ja: "ビビヨン＆ポストカード",
      ru: "Вивиллон и Открытки"
    },
    title: {
      cs: "Vivillon Pokémon GO Guide: Mapa všech 18 vzorů, Postcard triky & Jak získat Sandstorm (2026)",
      en: "Vivillon Pokémon GO Master Guide: All 18 Patterns Map, Postcard Tricks & Sandstorm Tips (2026)",
      ja: "【2026最新】ビビヨン全18模様の出現地域マップ＆ポストカード攻略（砂塵・太陽・氷雪の入手方法）",
      ru: "Полный гайд по Вивиллону в Pokémon GO: Карта всех 18 узоров, открытки и секреты Sandstorm (2026)"
    },
    subtitle: {
      cs: "Kompletní průvodce sbírkou Vivillona: Jak funguje připínání pohlednic, milníky medaile Butterfly Collector, seznam zemí a strategie pro zisk nejvzácnějších vzorů.",
      en: "Ultimate Vivillon collection handbook: How postcard pinning works, Butterfly Collector medal encounter tiers (3, 9, 15), worldwide pattern map, and strategies for rarest forms.",
      ja: "ポストカード保存システム、コレクターメダルの出現条件（3・9・15枚）、18地域の国別マップ、砂塵（Sandstorm）や太陽（Sun）の集め方を完全網羅。",
      ru: "Полное руководство по сбору Вивиллонов: механика сохранения открыток, уровни медали (3, 9, 15), карта регионов и поиск редких Sandstorm и Sun."
    },
    sections: [
      {
        id: "vivillon-postcard-mechanics",
        heading: {
          cs: "1. Jak funguje mechanika připínání pohlednic (Postcards)",
          en: "1. How Postcard Pinning & Scatterbug Encounters Work",
          ja: "1. ポストカード保存とコフキムシ出現の仕組み",
          ru: "1. Механика сохранения открыток и появление Scatterbug"
        },
        content: {
          cs: "Vivillon (a jeho předchozí vývojová stádia Scatterbug a Spewpa) je unikátní Pokémon, jehož křídla mají 18 různých regionálních vzorů. Získávají se připínáním pohlednic (Postcards) z dárků:\n\n1. Připnutí pohlednice od přítele: Při otevírání dárku klikněte na ikonu špendlíku (Pin) před otevřením dárku.\n2. Vlastní pohlednice: Můžete připnout až 3 své vlastní odeslané pohlednice denně, což započítává pokrok do vašeho domovského regionu (např. Continental v ČR/SK).\n3. Milníky pro setkání se Scatterbugem:\n   • 1. setkání: 3 připnuté pohlednice z daného regionu\n   • 2. setkání: 9 připnutých pohlednic\n   • 3. a každé další setkání: 15 připnutých pohlednic\n4. Vývoj: Scatterbug ➔ Spewpa (25 Candy) ➔ Vivillon (100 Candy). Vzor křídel je určen regionem původní pohlednice!",
          en: "Vivillon (evolving from Scatterbug and Spewpa) is a unique Pokémon featuring 18 distinct regional wing patterns acquired through the Postcard Book mechanic:\n\n1. Pinning Friend Postcards: Tap the Pin icon next to the Open button on gifts received from friends worldwide.\n2. Pinning Your Own Postcards: You can pin up to 3 of your own outgoing postcards per day to make progress toward your local region (e.g. Continental in Central Europe).\n3. Scatterbug Encounter Milestones:\n   • 1st encounter: 3 pinned postcards from that region\n   • 2nd encounter: 9 pinned postcards\n   • 3rd & all subsequent encounters: 15 pinned postcards\n4. Evolution Cost: Scatterbug ➔ Spewpa (25 Candy) ➔ Vivillon (100 Candy). Wing pattern is permanently locked to the origin region of the postcard!",
          ja: "ビビヨン（コフキムシ➔コフーライから進化）は世界18種類の羽の模様を持つ特別なポケモンです：\n\n1. フレンドのギフト保存：ギフトを開封する前に「ピン留め（Pin）」アイコンをタップします。\n2. 自分のポストカード保存：自分で入手したポストカードも1日最大3枚までピン留め可能（日本の場合は「みやび/Elegant」等に進捗）。\n3. コフキムシ出現の必要枚数：\n   • 1回目：対象地域のカード 3枚\n   • 2回目：対象地域のカード 9枚\n   • 3回目以降：対象地域のカード 15枚ごと\n4. 進化コスト：コフキムシ ➔ コフーライ（アメ25個） ➔ ビビヨン（アメ100個）。進化後の模様は入手したポストカードの地域で固定されます！",
          ru: "Вивиллон (эволюционирует из Scatterbug и Spewpa) имеет 18 уникальных региональных узоров крыльев, открываемых через сохранение открыток:\n\n1. Сохранение открыток друзей: Нажмите иконку булавки (Pin) перед открытием подарка от друга.\n2. Собственные открытки: Можно закреплять до 3 своих отправляемых открыток в день для прогресса своего региона.\n3. Уровни для поимки Scatterbug:\n   • 1-я встреча: 3 открытки из этого региона\n   • 2-я встреча: 9 открыток\n   • 3-я и все последующие: 15 открыток\n4. Эволюция: Scatterbug ➔ Spewpa (25 конфет) ➔ Vivillon (100 конфет). Узор определяется регионом открытки!"
        },
        tips: {
          cs: [
            "Trik s plným Postcard Bookem: Pohlednici můžete ihned po připnutí (započtení bodu do medaile) zase odepnout (Unpin) v Postcard Booku, abyste nezaplnili limit kapacity.",
            "Použijte Pinap Berry při chytání každého Scatterbuga pro rychlý sběr 125 Candy na kompletní vývoj."
          ],
          en: [
            "Instant Unpin Trick: Immediately unpin the postcard in your Postcard Book after pinning it. The medal progress is awarded instantly and your storage won't get clogged!",
            "Always throw a Silver Pinap or Pinap Berry on every Scatterbug catch to quickly amass the 125 candies required for the final Vivillon evolution."
          ],
          ja: [
            "ピン留め即解除ワザ：ピン留めして進捗が加算された直後、ブック内でピンを外してもメダルのカウントは減りません。容量節約に最適です！",
            "コフキムシ捕獲時は必ず「ぎんのパイルのみ」か「パイルのみ」を使い、進化に必要な125個のアメを効率よく集めましょう。"
          ],
          ru: [
            "Лайфхак с местом: Сразу после закрепления открытки открепите ее в Postcard Book. Прогресс в медаль засчитывается мгновенно!",
            "Всегда используйте Pinap Berry при ловле Scatterbug для сбора 125 конфет на эволюцию."
          ]
        }
      },
      {
        id: "vivillon-all-18-regions",
        heading: {
          cs: "2. Kompletní katalog 18 vzorů a jejich státy",
          en: "2. Master Regional Catalog: All 18 Vivillon Patterns & Countries",
          ja: "2. 全18種類の模様と対象国・地域一覧",
          ru: "2. Каталог всех 18 узоров и страны их обитания"
        },
        content: {
          cs: "Přehled všech 18 vzorů v Pokémon GO a kde je ve světě najít:\n\n• Continental (Běžný): Česko, Slovensko, Polsko, Německo, Rakousko, Dánsko, Nizozemsko, Argentina.\n• Meadow (Běžný): Francie, Itálie, Švýcarsko, části Německa.\n• Garden (Běžný): Velká Británie, Irsko, Nový Zéland.\n• Marine (Běžný): Španělsko, Portugalsko, Řecko, Chorvatsko, Chile.\n• High Plains (Běžný): Západní USA (Kalifornie, Nevada, Arizona, Colorado), Východní Evropa.\n• Modern (Běžný): Jihovýchodní a centrální USA (Texas, Florida, Georgia, Ohio, Chicago).\n• Polar (Běžný): Kanada, Aljaška, severní státy USA, Švédsko, jižní Norsko.\n• Elegant (Střední): Japonsko (většina prefektur).\n• Jungle (Střední): Kolumbie, Malajsie, Singapur, Indonésie, Vietnam, Panama, Ekvádor.\n• River (Střední): Jižní Austrálie, Egypt, Jihoafrická republika.\n• Monsoon (Vzácný): Tchaj-wan, Hongkong, Thajsko, Vietnam, Indie.\n• Savanna (Vzácný): Brazílie, Paraguay, severní Argentina.\n• Archipelago (Vzácný): Karibské ostrovy (Kuba, Jamajka, Bahamy, Dominikánská republika), Puerto Rico.\n• Sun (🔥 Extrémně vzácný): Mexiko, Guatemala, Madagaskar, severní Austrálie.\n• Ocean (🔥 Extrémně vzácný): Havaj, Galapágy, Réunion, Mauricius.\n• Icy Snow (🔥 Extrémně vzácný): Grónsko, severní Finsko, severní Norsko, severní Kanada.\n• Tundra (🔥 Extrémně vzácný): Island, severní Norsko (Tromsø), Hokkaidó (Japonsko).\n• Sandstorm (👑 Nejvzácnější): Blízký východ – Spojené arabské emiráty (Dubaj), Saúdská Arábie, Izrael, Kuvajt, Katar, Omán.\n\n*Poznámka:* Poké Ball Pattern a Fancy Pattern nejsou v Pokémon GO zatím dostupné.",
          en: "Complete guide to all 18 Vivillon wing patterns and their geographic regions:\n\n• Continental: Czechia, Slovakia, Poland, Germany, Austria, Denmark, Netherlands, Argentina.\n• Meadow: France, Italy, Switzerland, parts of Germany.\n• Garden: United Kingdom, Ireland, New Zealand.\n• Marine: Spain, Portugal, Greece, Croatia, Chile.\n• High Plains: Western USA (California, Nevada, Arizona, Colorado), Eastern Europe.\n• Modern: Southeastern and Central USA (Texas, Florida, Georgia, Ohio, Illinois).\n• Polar: Canada, Alaska, Northern USA, Sweden, Southern Norway.\n• Elegant: Japan (mainland prefectures).\n• Jungle: Colombia, Malaysia, Singapore, Indonesia, Vietnam, Panama, Ecuador.\n• River: Southern Australia, Egypt, South Africa.\n• Monsoon: Taiwan, Hong Kong, Thailand, Vietnam, India.\n• Savanna: Brazil, Paraguay, Northern Argentina.\n• Archipelago: Caribbean islands (Cuba, Jamaica, Bahamas, Dominican Republic), Puerto Rico.\n• Sun (🔥 Ultra Rare): Mexico, Guatemala, Madagascar, Northern Australia.\n• Ocean (🔥 Ultra Rare): Hawaii, Galapagos, Réunion, Mauritius.\n• Icy Snow (🔥 Ultra Rare): Greenland, Northern Finland, Northern Norway, Northern Canada.\n• Tundra (🔥 Ultra Rare): Iceland, Northern Norway (Tromsø), Hokkaido (Japan).\n• Sandstorm (👑 Holy Grail): Middle East — UAE (Dubai), Saudi Arabia, Israel, Kuwait, Qatar, Oman.\n\n*Note:* Poké Ball and Fancy Patterns are currently unreleased in Pokémon GO.",
          ja: "全18種類のビビヨン模様と主な出現地域：\n\n• たいりく（Continental）：チェコ、ポーランド、ドイツ、オーストリア、オランダ、アルゼンチン等\n• はなぞの（Meadow）：フランス、イタリア、スイス等\n• ていえん（Garden）：イギリス、アイルランド、ニュージーランド等\n• まりん（Marine）：スペイン、ポルトガル、ギリシャ、チリ等\n• こうや（High Plains）：アメリカ西部（カリフォルニア、ネバダ等）、東欧\n• モダン（Modern）：アメリカ中南部（テキサス、フロリダ等）\n• せつげん（Polar）：カナダ、アラスカ、スウェーデン等\n• みやび（Elegant）：日本（本州・四国・九州）\n• ジャングル（Jungle）：シンガポール、マレーシア、インドネシア、コロンビア等\n• たいが（River）：オーストラリア南部、エジプト、南アフリカ等\n• スコール（Monsoon）：台湾、香港、タイ、ベトナム、インド等\n• サバンナ（Savanna）：ブラジル、パラグアイ等\n• ぐんとう（Archipelago）：カリブ海諸島、プエルトリコ等\n• たいよう（Sun・超激レア）：メキシコ、グアテマラ、マダガスカル等\n• オーシャン（Ocean・超激レア）：ハワイ、ガラパゴス等\n• ひょうせつ（Icy Snow・超激レア）：グリーンランド、北欧最北部、カナダ北部等\n• つんどら（Tundra・超激レア）：アイスランド、ノルウェー北部、北海道\n• さじん（Sandstorm・最難関）：中東地域（ドバイ/UAE、サウジアラビア、イスラエル、カタール、オマーン等）\n\n※モンスターボール模様とファンシー模様は現在未実装です。",
          ru: "Полный список 18 узоров Вивиллона и стран их нахождения:\n\n• Continental: Чехия, Польша, Германия, Австрия, Аргентина.\n• Meadow: Франция, Италия, Швейцария.\n• Garden: Великобритания, Ирландия, Новая Зеландия.\n• Marine: Испания, Португалия, Греция, Чили.\n• High Plains: Запад США (Калифорния, Невада), Восточная Европа.\n• Modern: Юг и центр США (Техас, Флорида).\n• Polar: Канада, Аляска, Швеция.\n• Elegant: Япония.\n• Jungle: Колумбия, Сингапур, Малайзия, Индонезия.\n• River: Южная Австралия, Египет, ЮАР.\n• Monsoon: Тайвань, Гонконг, Таиланд, Индия.\n• Savanna: Бразилия, Парагвай.\n• Archipelago: Карибские острова, Пуэрто-Рико.\n• Sun (🔥 Редкий): Мексика, Мадагаскар, Север Австралии.\n• Ocean (🔥 Редкий): Гавайи, Галапагосы, Реюньон.\n• Icy Snow (🔥 Редкий): Гренландия, Север Норвегии/Финляндии.\n• Tundra (🔥 Редкий): Исландия, Тромсё (Норвегия), Хоккайдо.\n• Sandstorm (👑 Самый редкий): Ближний Восток (ОАЭ/Дубай, Саудовская Аравия, Израиль, Катар).\n\n*Примечание:* Узоры Poké Ball и Fancy пока не выпущены в Pokémon GO."
        },
        tips: {
          cs: [
            "Hledáte vzácný Sandstorm nebo Sun? Využijte naši novou záložku 'Přátelé & Kódy' v horním menu a filtrujte hráče přímo podle jejich Vivillon regionu!",
            "Pro nalezení chycených Scatterbugů zadejte do vyhledávání ve hře: 'Scatterbug' nebo 'Spewpa'."
          ],
          en: [
            "Hunting for rare Sandstorm or Sun patterns? Check out our dedicated 'Friend Codes' tab in the top navigation to find verified active trainers from those regions!",
            "Filter your storage by searching 'Scatterbug' or 'Spewpa' to review unevolved regional specimens."
          ],
          ja: [
            "砂塵（Sandstorm）や太陽（Sun）をお探しの方は、当サイト上部ナビゲーションの「フレンド募集」機能で地域別にトレーナーコードを検索してみてください！",
            "ボックス検索で「コフキムシ」と入力すると未進化のストックを一発で確認できます。"
          ],
          ru: [
            "Ищете редкие Sandstorm или Sun? Воспользуйтесь нашей вкладкой 'Друзья и Коды' для фильтрации тренеров по регионам!",
            "Используйте поиск 'Scatterbug' для быстрого нахождения пойманных бабочек."
          ]
        }
      }
    ]
  },
  {
    id: "regional-pokemon-world-guide",
    slug: "regional-pokemon-world-guide",
    iconName: "Globe",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/122.png",
    author: "PoGo Events Team",
    readTime: "15 min",
    updatedAt: "2026-08-24",
    category: {
      cs: "Regionální Pokémoni",
      en: "Regional Exclusives",
      ja: "地域限定ポケモン",
      ru: "Региональные Покемоны"
    },
    title: {
      cs: "Komplexní průvodce regionálními Pokémony v Pokémon GO 2026",
      en: "Comprehensive 2026 Guide to Regional Exclusive Pokémon in Pokémon GO",
      ja: "2026年版 ポケモンGO 地域限定ポケモン完全ガイド",
      ru: "Подробный гайд по региональным эксклюзивам в Pokémon GO 2026"
    },
    subtitle: {
      cs: "Vše, co potřebujete vědět o lokacích, rotacích hemisfér a způsobech získání regionálních Pokémonů bez cestování.",
      en: "Everything you need to know about locations, hemisphere rotations, and how to get regional Pokémon without traveling.",
      ja: "出現場所、半球ローテーション、そして旅行せずに地域限定ポケモンを入手する方法に関する全情報。",
      ru: "Все, что нужно знать о локациях, ротациях полушарий и способах получить региональных покемонов без путешествий."
    },
    sections: [
      {
        id: "gen1-kanto-regionals",
        heading: {
          cs: "1. Kanto Regionální Pokémoni (Gen 1)",
          en: "1. Kanto Regional Exclusives (Gen 1)",
          ja: "1. カントー地方の地域限定（第1世代）",
          ru: "1. Региональные покемоны Канто (Ген 1)"
        },
        content: {
          cs: "Kanto regionální Pokémoni byli první exkluzivní Pokémoni ve hře. Zahrnují Taurose (Severní Amerika), Mr. Mima (Evropa), Kangaskhana (Austrálie a Oceánie) a Farfetch'da (Východní Asie). Heracross je dostupný v Latinské Americe, jižní Floridě a Texasu. Corsola se nachází v tropických zeměpisných šířkách podél rovníku.",
          en: "Kanto regionals were the first exclusive Pokémon introduced to the game. They include Tauros (North America), Mr. Mime (Europe), Kangaskhan (Australia/Oceania), and Farfetch'd (East Asia). Heracross is available in Latin America, South Florida, and Texas. Corsola can be found in tropical latitudes along the equator.",
          ja: "カントー地方の地域限定ポケモンは、ゲームで最初に実装された限定ポケモンです。ケンタロス（北米）、バリヤード（ヨーロッパ）、ガルーラ（オーストラリア/オセアニア）、カモネギ（東アジア）が含まれます。ヘラクロスは中南米、南フロリダ、テキサスで出現します。サニーゴは赤道付近の熱帯地域で捕獲できます。",
          ru: "Региональные покемоны Канто стали первыми эксклюзивами в игре. Среди них Таурос (Северная Америка), Мистер Майм (Европа), Кангасхан (Австралия и Океания) и Фарфетчд (Восточная Азия). Геракросс доступен в Латинской Америке, южной Флориде и Техасе. Корсолу можно найти в тропических широтах вдоль экватора."
        },
        pokemon: ['Tauros', 'Mr-Mime', 'Kangaskhan', 'Farfetchd', 'Heracross', 'Corsola'],
        tips: {
          cs: ["Mr. Mime (Galarian) a Farfetch'd (Galarian) někdy rotují ve vajíčkách globálně."],
          en: ["Galarian Mr. Mime and Galarian Farfetch'd sometimes rotate globally in eggs."],
          ja: ["ガラルバリヤードやガラルカモネギは、世界中のタマゴから孵化することがあります。"],
          ru: ["Галарские формы Мистера Майма и Фарфетчда иногда появляются в яйцах по всему миру."]
        }
      },
      {
        id: "gen2-gen3-regionals",
        heading: {
          cs: "2. Johto & Hoenn Regionální Pokémoni (Gen 2-3)",
          en: "2. Johto & Hoenn Regional Exclusives (Gen 2-3)",
          ja: "2. ジョウト＆ホウエン地方の地域限定（第2-3世代）",
          ru: "2. Региональные покемоны Джото и Хоэнн (Ген 2-3)"
        },
        content: {
          cs: "V těchto generacích najdeme Torkoala (Jižní/Jihovýchodní Asie, Indie), Tropiuse (Afrika, Blízký Východ, Středomoří), Relicantha (Nový Zéland, Fidži), Pachirisu (Severní Kanada, Rusko, Skandinávie), Chatota (Jižní polokoule), Carnivina (Jihovýchod USA). Dále Pokémoni rotující po polokoulích: Zangoose/Seviper, Illumise/Volbeat a Solrock/Lunatone. Elementární opice (Pansage/Pansear/Panpour) jsou rozděleny na Ameriky, Evropu/Afriku a Asii/Pacifik.",
          en: "These generations feature Torkoal (South/Southeast Asia, India), Tropius (Africa, Middle East, Mediterranean), Relicanth (New Zealand, Fiji), Pachirisu (Northern Canada, Russia, Scandinavia), Chatot (Southern Hemisphere), and Carnivine (US Southeast). Hemisphere rotators include Zangoose/Seviper, Illumise/Volbeat, and Solrock/Lunatone. The elemental monkeys (Pansage/Pansear/Panpour) are split across the Americas, Europe/Africa, and Asia/Pacific.",
          ja: "これらの世代にはコータス（南/東南アジア、インド）、トロピウス（アフリカ、中東、地中海）、ジーランス（ニュージーランド、フィジー）、パチリス（カナダ北部、ロシア、北欧）、ペラップ（南半球）、マスキッパ（アメリカ南東部）が含まれます。ザングース/ハブネーク、イルミーゼ/バルビート、ソルロック/ルナトーンは半球でローテーションします。ヤナップ/バオップ/ヒヤップは南北アメリカ、欧州/アフリカ、アジア/太平洋に分かれています。",
          ru: "В этих поколениях представлены Торкоал (Южная/Юго-Восточная Азия, Индия), Тропиус (Африка, Ближний Восток, Средиземноморье), Реликант (Новая Зеландия, Фиджи), Пачирису (Северная Канада, Россия, Скандинавия), Чатот (Южное полушарие) и Карнивайн (Юго-Восток США). По полушариям ротируются: Зангус/Севипер, Иллюмис/Волбит, Солрок/Лунатон. Обезьяны (Пансейдж/Пансир/Панпур) разделены на Америку, Европу/Африку и Азию/Океанию."
        },
        pokemon: ['Torkoal', 'Tropius', 'Relicanth', 'Zangoose', 'Seviper', 'Pachirisu', 'Chatot', 'Carnivine'],
        tips: {
          cs: ["Zangoose/Seviper a podobní se často mění při speciálních eventech jako je Rivals' Week."],
          en: ["Hemisphere pairs like Zangoose and Seviper often swap during special events like Rivals' Week."],
          ja: ["ザングースやハブネークのようなペアは、「ライバルウィーク」などの特別イベントで入れ替わることがあります。"],
          ru: ["Пары по полушариям, такие как Зангус и Севипер, часто меняются местами во время специальных ивентов (Rivals' Week)."]
        }
      },
      {
        id: "gen5-gen6-regionals",
        heading: {
          cs: "3. Unova & Kalos Regionální Pokémoni (Gen 5-6)",
          en: "3. Unova & Kalos Regional Exclusives (Gen 5-6)",
          ja: "3. イッシュ＆カロス地方の地域限定（第5-6世代）",
          ru: "3. Региональные покемоны Юнова и Калос (Ген 5-6)"
        },
        content: {
          cs: "Mezi novější exkluzivní Pokémony patří Bouffalant (Oblast New York City), Sigilyph (Egypt, Řecko), Maractus (Mexiko, Střední a Jižní Amerika), Klefki (Francie). Heatmor/Durant a Throh/Sawk rotují podle hemisfér. Flabébé má také regionální formy: Červená, Modrá a Žlutá barva květu se nachází v různých částech světa.",
          en: "Newer exclusives include Bouffalant (New York City area), Sigilyph (Egypt, Greece), Maractus (Mexico, Central/South America), and Klefki (France). Heatmor/Durant and Throh/Sawk are hemisphere rotators. Flabébé also has regional forms: Red, Blue, and Yellow flowers are split across different continents.",
          ja: "比較的新しい限定ポケモンには、バッフロン（ニューヨーク周辺）、シンボラー（エジプト、ギリシャ）、マラカッチ（メキシコ、中南米）、クレッフィ（フランス）がいます。クイタラン/アイアント、ナゲキ/ダゲキは半球ローテーション枠です。フラベベの花の色（赤、青、黄）も地域ごとに異なります。",
          ru: "К более новым эксклюзивам относятся Буффалант (Нью-Йорк), Сигилиф (Египет, Греция), Марактус (Мексика, Центральная и Южная Америка) и Клефки (Франция). Хитмор/Дюрант и Троу/Соук ротируются по полушариям. Флабебе также имеет региональные формы: Красный, Синий и Желтый цветы распределены по континентам."
        },
        pokemon: ['Bouffalant', 'Heatmor', 'Durant', 'Throh', 'Sawk', 'Sigilyph', 'Maractus', 'Klefki'],
        tips: {
          cs: ["Klefkiho lze vzácně najít i kousek za hranicemi Francie, např. v jižní Anglii nebo západním Německu."],
          en: ["Klefki can occasionally be found slightly beyond the French border, such as in southern England or western Germany."],
          ja: ["クレッフィは、イギリス南部やドイツ西部など、フランス国境をわずかに越えた地域でも出現することがあります。"],
          ru: ["Клефки иногда можно найти немного за границей Франции, например, на юге Англии или на западе Германии."]
        }
      },
      {
        id: "gen7-gen8-gen9-regionals",
        heading: {
          cs: "4. Alola, Galar & Paldea Regionální Pokémoni (Gen 7-9)",
          en: "4. Alola, Galar & Paldea Regional Exclusives (Gen 7-9)",
          ja: "4. アローラ、ガラル、パルデア地方の地域限定（第7-9世代）",
          ru: "4. Региональные покемоны Алола, Галар и Палдея (Ген 7-9)"
        },
        content: {
          cs: "Nejnovější generace přinesly Comfeyho (Havaj), formy Oricoria (závislé na regionu), Hawluchu (Mexiko), Stonjournera (Velká Británie/Severní Evropa), Eiscueho (Jižní polokoule), Flamiga (Florida, Karibik) a Wigletta (Kalifornie, pobřežní oblasti).",
          en: "The latest generations introduced Comfey (Hawaii), Oricorio forms (region-dependent), Hawlucha (Mexico), Stonjourner (UK/Northern Europe), Eiscue (Southern Hemisphere), Flamigo (Florida, Caribbean), and Wiglett (California, coastal areas).",
          ja: "最新世代では、キュワワー（ハワイ）、オドリドリのフォルム（地域依存）、ルチャブル（メキシコ）、イシヘンジン（イギリス/北欧）、コオリッポ（南半球）、カラミンゴ（フロリダ、カリブ海）、ウミディグダ（カリフォルニア、沿岸部）が登場しました。",
          ru: "Последние поколения принесли Комфея (Гавайи), формы Орикорио (зависят от региона), Хавлучу (Мексика), Стонджурнера (Великобритания/Северная Европа), Эйскью (Южное полушарие), Фламиго (Флорида, Карибы) и Виглетта (Калифорния, побережье)."
        },
        pokemon: ['Comfey', 'Oricorio', 'Hawlucha', 'Stonjourner', 'Eiscue', 'Flamigo'],
        tips: {
          cs: ["Oricorio může změnit svou formu po přenosu do Pokémon HOME, ale v Pokémon GO je zachycen ve své lokální formě."],
          en: ["Oricorio can change forms in main series games, but in Pokémon GO it is permanently locked to its local catch form."],
          ja: ["オドリドリは本家ゲームではフォルムチェンジ可能ですが、ポケモンGOでは捕獲時の地域フォルムで固定されます。"],
          ru: ["Формы Орикорио фиксируются при поимке в Pokémon GO, их нельзя изменить без перевода в Pokémon HOME."]
        }
      },
      {
        id: "how-to-get-regionals",
        heading: {
          cs: "5. Jak získat regionální Pokémony bez cestování",
          en: "5. How to Obtain Regionals Without Traveling",
          ja: "5. 旅行せずに地域限定ポケモンを入手する方法",
          ru: "5. Как получить региональных покемонов без путешествий"
        },
        content: {
          cs: "Eventy: Go Fest, Safari Zone a speciální turné (Tour events) obvykle rotují regionální Pokémony po celém světě. Vejce: 5km, 7km nebo 10km vejce z dárků od přátel mohou během eventů obsahovat regionály. Výměny: Měňte s hráči, kteří cestovali - získáte navíc bonus k Candy XL za vzdálenost (Distance trade). Remote Raidy: Někteří regionální Pokémoni se objevují v 3-hvězdičkových raidech.",
          en: "Events: Go Fest, Safari Zone, and special Tour events typically rotate regional Pokémon worldwide. Eggs: 5km, 7km, or 10km eggs from gifts can sometimes contain regionals during specific events. Trading: Trade with travelers to get them and earn distance Candy XL bonuses. Remote Raids: Some regionals appear in 3-star remote raids during regional events.",
          ja: "イベント：GO Fest、サファリゾーン、GO Tourなどの特別イベントでは、地域限定ポケモンが世界中で出現します。タマゴ：イベント期間中、フレンドからのギフト（5km/7km/10km）から孵化することがあります。交換：旅行者と交換し、距離ボーナスでアメXLも獲得しましょう。リモートレイド：一部の地域限定ポケモンは、イベント中に星3レイドボスとして登場します。",
          ru: "Ивенты: Go Fest, Safari Zone и ивенты Tour обычно делают региональных покемонов доступными по всему миру. Яйца: Во время ивентов 5км, 7км и 10км яйца из подарков могут содержать регионалов. Обмен: Меняйтесь с путешественниками для получения дистанционного бонуса Candy XL. Удаленные рейды: Некоторые регионалы иногда появляются в рейдах."
        },
        tips: {
          cs: ["Sledujte oficiální novinky a nenechte si ujít každoroční Pokémon GO Tour (např. Johto Tour, Hoenn Tour)."],
          en: ["Follow official news and don't miss the annual Pokémon GO Tour events which guarantee global regionals."],
          ja: ["公式ニュースをチェックし、地域限定が世界中で解禁される毎年恒例の「Pokémon GO Tour」を見逃さないようにしましょう。"],
          ru: ["Следите за новостями и не пропускайте ежегодные Pokémon GO Tour, где всегда дают региональных покемонов."]
        }
      },
      {
        id: "regional-map-overview",
        heading: {
          cs: "6. Shrnutí mapy světa a rychlá reference",
          en: "6. World Map Overview & Quick Reference",
          ja: "6. 世界マップの概要とクイックリファレンス",
          ru: "6. Обзор карты мира и краткая справка"
        },
        content: {
          cs: "Vyhledejte si interaktivní mapu níže a objevte přesné hranice výskytu. Hemisphere rotace (např. Zangoose / Seviper) se obvykle mění jednou ročně nebo během velkých herních updatů. Cestovatelům doporučujeme zapnout Incense (Kadidlo) při přestupech na letištích pro maximální šanci na úlovek místních regionálů.",
          en: "Check our interactive map below to discover exact spawn boundaries. Hemisphere rotations (like Zangoose / Seviper) usually swap annually or during major season updates. For travelers, popping an Incense during airport layovers is the best way to secure local regionals quickly.",
          ja: "下のインタラクティブマップで正確な出現境界線を確認してください。半球ローテーション（ザングース/ハブネークなど）は通常、年に1回または大規模アップデート時に切り替わります。旅行中の方は、空港での乗り継ぎ時におこうを使うのが最も効率的です。",
          ru: "Используйте интерактивную карту ниже, чтобы узнать точные границы. Ротации полушарий (например, Зангус/Севипер) обычно происходят раз в год. Путешественникам рекомендуем использовать Incense во время пересадок в аэропортах."
        },
        tips: {
          cs: ["Na letištích u PokéStopů vždy zkuste použít Glacial, Mossy nebo Magnetic Lure Modul."],
          en: ["Always drop a Glacial, Mossy, or Magnetic Lure at airport PokéStops to maximize spawns."],
          ja: ["空港のポケストップでは、特別なルアーモジュール（アイス、ハーブル、マグネット）を使うと出現率が上がります。"],
          ru: ["Всегда используйте особые Lure-модули (Glacial, Mossy, Magnetic) на покестопах в аэропортах."]
        }
      }
    ]
  },
  {
    id: "adventure-effects-master-guide",
    slug: "adventure-effects-master-guide",
    iconName: "Sparkles",
    imageUrl: "https://cdn.leekduck.com/assets/img/items/Rare%20Candy%20XL.png",
    featured: true,
    author: "PoGo Events Team",
    readTime: "11 min",
    updatedAt: "2026-09-24",
    category: {
      cs: "Dobrodružné efekty & Mechaniky",
      en: "Adventure Effects & Mechanics",
      ja: "アドベンチャーエフェクト＆仕様",
      ru: "Эффекты Приключений и Механики"
    },
    title: {
      cs: "Dobrodružné efekty (Adventure Effects): Kompletní přehled všech 11 Pokémonů, schopností a mechanik na mapě",
      en: "Adventure Effects: Complete Master Guide to All 11 Pokémon & Field Mechanics",
      ja: "アドベンチャーエフェクト完全攻略：全11匹のフィールド能力、効果、発動仕様一覧",
      ru: "Adventure Effects: Полный гайд по всем 11 покемонам, эффектам и механикам карты"
    },
    subtitle: {
      cs: "Vše o Origin Dialze, Palkii, Necrozmě, Kyuremu, Zacianovi a dalších: Zmrazení časovačů předmětů, 4× větší rádius chytání, denní/noční evoluce a bojové buffy.",
      en: "Exhaustive breakdown of Origin Dialga, Palkia, Necrozma, Kyurem, Zacian & more: Consumable timer freeze, 4x catch radius, day/night evolution bypass, and combat overhauls.",
      ja: "オリジンディアルガ、パルキア、ネクロズマ、キュレム、ザシアン他の完全攻略：アイテム時間停止、捕獲範囲4倍、昼夜進化解放、戦闘強化まで。",
      ru: "Полный разбор Origin Dialga, Palkia, Necrozma, Kyurem, Zacian и других: заморозка таймеров, радиус 4x, дневные/ночные эволюции и боевые усиления."
    },
    sections: [
      {
        id: "adventure-effects-intro",
        heading: {
          cs: "1. Co jsou to Adventure Effects a jak funguje jejich aktivace?",
          en: "1. What are Adventure Effects & How Does Activation Work?",
          ja: "1. アドベンチャーエフェクトとは何か？発動の仕組み",
          ru: "1. Что такое Adventure Effects и как работает их активация?"
        },
        content: {
          cs: "Dobrodružné efekty (Adventure Effects) jsou unikátní schopnosti spouštěné mimo souboje přímo z karty Pokémona. Na rozdíl od běžných útoků mění základní pravidla hry: zmrazují časovače předmětů, zvětšují dosah interakce na mapě, přitahují specifické druhy Pokémonů nebo odemykají speciální evoluce.\n\nZákladní pravidla systému:\n• Aktivace: Otevřete detail Pokémona s daným podpisovým útokem a klepněte na tlačítko 'Použít' (Use) pod sekcí útoků.\n• Cena a délka: Každá aktivace stojí přesné množství Stardustu a Candy daného Pokémona na 6 až 10 minut.\n• Stohování (Stacking): Čas lze prodlužovat v kuse až do maximálního stropu 24 hodin (1 440 minut).\n• Pravidlo 1 efektu: V jeden okamžik může běžet pouze JEDEN Adventure Effect. Nelze kombinovat např. Dialgu a Palkii současně.\n• Mega Evoluce: Adventure Effect LZE mít aktivní současně s Mega Evolucí nebo Primal Reversion!",
          en: "Adventure Effects are unique, field-altering powers activated directly outside of battle from an eligible Pokémon's summary screen. Unlike standard attacks, they rewrite core game rules: freezing consumable item timers, expanding interaction radiuses, summoning day/night wild spawns, or modifying catch mechanics.\n\nCore System Rules:\n• Activation: Open the detail page of an eligible Pokémon with its signature move and tap 'Use' under the Adventure Effects banner.\n• Cost & Duration: Each increment costs a set bundle of Stardust and species Candy for 6 to 10 minutes of active time.\n• Duration Stacking: Players can stack continuous runtime up to a hard ceiling of 24 hours (1,440 minutes).\n• Single Active Effect Rule: Only ONE Adventure Effect may be active at any given moment.\n• Mega Evolution Stacking: Adventure Effects CAN run concurrently alongside active Mega Evolution or Primal Reversion!",
          ja: "アドベンチャーエフェクトは、対象ポケモンの詳細画面から戦闘外で手動発動する強力なフィールド能力です。通常の技とは異なり、アイテムの効果時間を停止させたり、マップ上の捕獲範囲を劇的に広げたり、昼夜の天候や進化条件を強制変更するなど、ゲームの基本ルールを書き換えます。\n\n基本システムルール：\n• 発動方法：特別技を覚えたポケモンの画面を開き、「アドベンチャーエフェクト」項目の「使用」をタップ。\n• コストと時間：1回ごとに一定のほしのすなと対象ポケモンのアメを消費し、6分または10分間持続。\n• 時間スタック：連続して延長可能で、最大24時間（1,440分）までストック可能。\n• 同時発動制限：同時に発動できるアドベンチャーエフェクトは「1種類のみ」です（ディアルガとパルキアの併用は不可）。\n• メガシンカとの併用：メガシンカやゲンシカイキとは完全に重複発動が可能です！",
          ru: "Adventure Effects — это уникальные полевые способности, активируемые вне боя прямо из карточки покемона. Они изменяют правила игры: замораживают таймеры предметов, увеличивают радиус на карте, привлекают особых покемонов или снимают ограничения на эволюции.\n\nОсновные правила системы:\n• Активация: Откройте карточку покемона с сигнатурной атакой и нажмите кнопку 'Использовать' (Use).\n• Стоимость и длительность: Каждая активация требует фиксированное число пыли и конфет на 6–10 минут.\n• Продление: Можно суммировать время до жесткого лимита в 24 часа (1440 минут).\n• Правило 1 эффекта: Одновременно может работать только ОДИН Adventure Effect.\n• Мега-Эволюции: Эффекты МОЖНО сочетать с активной Мега-Эволюцией или Primal Reversion!"
        },
        tips: {
          cs: [
            "Pokémon nemusí mít plné HP, aby šel efekt spustit — funguje i v případě, že je vyřazený (fainted)!",
            "Efekty lze zapínat i když je Pokémon váš aktivní Buddy nebo je uložený v Pokémon Storage."
          ],
          en: [
            "An eligible Pokémon does not need full HP to activate its effect — it functions even if fainted!",
            "You can trigger effects whether the Pokémon is assigned as your active Buddy or resting in storage."
          ],
          ja: [
            "対象のポケモンは「ひんし（fainted）」状態であってもエフェクトを発動できます！",
            "相棒に設定していなくても、ボックスにいる状態から直接使用可能です。"
          ],
          ru: [
            "Покемон не обязан быть вылечен — эффект активируется, даже если он без сознания (fainted)!",
            "Эффект можно включать прямо из хранилища, не обязательно делать покемона своим напарником (Buddy)."
          ]
        },
        pokemon: ["Dialga-Origin", "Palkia-Origin", "Necrozma-Dusk-Mane", "Necrozma-Dawn-Wings"]
      },
      {
        id: "origin-dialga-roar-of-time",
        heading: {
          cs: "2. Origin Forme Dialga — Roar of Time (Časový řev)",
          en: "2. Origin Forme Dialga — Roar of Time (Chronokinesis)",
          ja: "2. オリジンフォルム ディアルガ：ときのほうこう（時間停止）",
          ru: "2. Origin Forme Dialga — Roar of Time (Заморозка времени)"
        },
        content: {
          cs: "Origin Forme Dialga ovládá čas prostřednictvím svého legendárního útoku Roar of Time (Časový řev). Po aktivaci dočasně ZASTAVÍ odpočet časovačů u aktivních spotřebních předmětů v inventáři.\n\n• Cena: 5 000 Stardustu + 5 Dialga Candy za každých 6 minut (maximum 24h = 1 200 000 Dust + 1 200 Candy).\n• ZMRAZENÉ PŘEDMĚTY (Funguje):\n  1. Daily Adventure Incense (Denní modré kadidlo — 15min limit se pozastaví!)\n  2. Běžné kadidlo (Standard Incense) i Event Incense (zelené i oranžové)\n  3. Lucky Egg (Dvojnásobné XP z chytání a raidů)\n  4. Star Piece (+50 % bonus ke Stardustu)\n\n• NEZASTAVENÉ PŘEDMĚTY (Nefunguje):\n  Mystery Box (Meltan Box), Coin Bag (Roaming Gimmighoul), Lure Moduly na PokéStopech a cooldowny Mega Evolucí (tyto časovače běží na serveru a čas se u nich nepozastavuje).\n\n⚡ Super Trik na Galarian Ptáky: Aktivujte Daily Adventure Incense, okamžitě zapněte Roar of Time na 60 minut a vyrazte na rychlou procházku (6–10 km/h po přímé trase). Místo pouhých 15 minut získáte plných 75 minut nepřetržitého spawnu Daily Incense, což dramaticky zvyšuje šanci na střetnutí s Galarian Articuno, Zapdos a Moltres!",
          en: "Origin Forme Dialga commands time itself with its signature Dragon Charged Attack, Roar of Time. Activating it completely FREEZES countdown clocks on active consumable boosts in your inventory.\n\n• Cost: 5,000 Stardust + 5 Dialga Candy per 6-minute increment (24h cap = 1,200,000 Dust + 1,200 Candy).\n• PAUSED ITEMS (Eligible):\n  1. Daily Adventure Incense (DAI — its standard 15-minute clock is completely halted while spawns continue!)\n  2. Standard Incense & Event Incense (Green and Orange)\n  3. Lucky Egg (2x XP boost)\n  4. Star Piece (+50% Stardust boost)\n\n• UNPAUSED ITEMS (Ineligible):\n  Mystery Box (Meltan Box), Coin Bag (Roaming Gimmighoul), PokéStop Lure Modules, and Mega Evolution cooldown clocks.\n\n⚡ Infinite Galarian Bird Expedition: Pop your Daily Adventure Incense, immediately queue 60 minutes of Roar of Time, and walk briskly in a straight line (6–10 km/h). Instead of 15 minutes, you enjoy 75 minutes of uninterrupted DAI spawns, multiplying your encounter opportunities with Galarian Articuno, Zapdos, and Moltres!",
          ja: "オリジンディアルガの特別技「ときのほうこう」は、インベントリ内の消耗アイテムのタイマーカウントダウンを一時的に「完全停止（フリーズ）」させます。\n\n• コスト：6分ごとに「ほしのすな 5,000 + ディアルガのアメ 5個」（24時間最大＝ほしのすな120万＋アメ1,200個）。\n• 停止するアイテム（有効）：\n  1. おさんぽおこう（通常15分間のタイマーが停止したままポケモンが出現し続けます！）\n  2. 通常のおこう＆イベントおこう（緑・オレンジ）\n  3. しあわせタマゴ（XP2倍）\n  4. ほしのかけら（ほしのすな1.5倍）\n\n• 停止しないアイテム（無効）：\n  ふしぎなはこ（メルタン）、おたからぶくろ（コレクレー）、ルアーモジュール、メガシンカのクールダウン時間。\n\n⚡ ガラル三鳥無限ハント：おさんぽおこうを起動直後に「ときのほうこう」を60分延長して直線歩行（時速6〜10km）すると、通常15分のところ計75分間おさんぽおこうを連続維持できます！ガラル三鳥（フリーザー・サンダー・ファイヤー）を狙う最強の戦術です。",
          ru: "Origin Forme Dialga управляет временем с помощью атаки Roar of Time. При активации способность ЗАМОРАЖИВАЕТ таймеры активных расходных предметов в инвентаре.\n\n• Стоимость: 5 000 пыли + 5 конфет Dialga за каждые 6 минут (максимум 24ч = 1 200 000 пыли + 1 200 конфет).\n• ЗАМОРАЖИВАЕТСЯ:\n  1. Daily Adventure Incense (таймер 15 минут замирает, а спавны продолжаются!)\n  2. Обычный и ивентовый Incense (зеленый и оранжевый)\n  3. Lucky Egg (удвоение опыта)\n  4. Star Piece (+50% пыли)\n\n• НЕ ЗАМОРАЖИВАЕТСЯ:\n  Mystery Box (Meltan), Coin Bag (Gimmighoul), Lure-модули на покестопах и таймеры Мега-Эволюции.\n\n⚡ Охота на Галарских птиц: Включите Daily Adventure Incense, продлите Roar of Time на 60 минут и идите по прямой (6–10 км/ч). Вы получите 75 минут непрерывного спавна вместо 15, что колоссально увеличивает шанс встретить Galarian Articuno, Zapdos и Moltres!"
        },
        tips: {
          cs: [
            "Předměty můžete zapnout PŘED i PO aktivaci Roar of Time — pokud ho zapnete dříve, nově použité Lucky Egg či Star Piece se okamžitě zastaví na plných 30:00!",
            "Během 3× Stardust Community Day zapněte 1 Star Piece a prodlužte Roar of Time na celé 3 hodiny za zlomek nákladů."
          ],
          en: [
            "Activation order does not matter: items popped after activating Roar of Time instantly lock at their full initial 30:00 duration!",
            "During 3x Stardust Community Days, use 1 Star Piece and extend Roar of Time for the full 3 hours to save multiple Star Pieces."
          ],
          ja: [
            "発動順序は自由です。ときのほうこう発動中に使ったしあわせタマゴやほしのかけらも、残り30:00のまま停止します！",
            "ほしのすな3倍のコミュニティ・デイでは、ほしのかけら1個＋ときのほうこう延長で3時間ずっと1.5倍ブーストを維持できます。"
          ],
          ru: [
            "Порядок включения не имеет значения: если включить Roar of Time раньше, новые предметы замрут на полных 30:00!",
            "На Community Day с 3x пылью используйте 1 Star Piece и заморозьте время на все 3 часа."
          ]
        },
        pokemon: ["Dialga-Origin", "Articuno-Galarian", "Zapdos-Galarian", "Moltres-Galarian"]
      },
      {
        id: "origin-palkia-spacial-rend",
        heading: {
          cs: "3. Origin Forme Palkia — Spacial Rend (Prostorové štěpení)",
          en: "3. Origin Forme Palkia — Spacial Rend (Spatial Distortion)",
          ja: "3. オリジンフォルム パルキア：あくうせつだん（捕獲範囲4倍）",
          ru: "3. Origin Forme Palkia — Spacial Rend (Искривление пространства)"
        },
        content: {
          cs: "Origin Forme Palkia zakřivuje prostor kolem hráče svým útokem Spacial Rend (Prostorové štěpení). Tento efekt dramaticky zvětšuje rádius viditelnosti a interakce s divokými Pokémony na herní mapě.\n\n• Cena: 5 000 Stardustu + 5 Palkia Candy za každých 10 minut (maximum 24h = 720 000 Dust + 720 Candy).\n• Matematika dosahu:\n  • Běžný rádius chytání: 40 metrů (plocha cca 5 026 m²)\n  • Spacial Rend rádius chytání: 80 metrů (plocha 20 106 m²)\n  • Zisk: 4,0× větší plocha (+300 % pokrytí mapy!)\n  • Viditelnost spawnů: Divocí Pokémoni se objevují na mapě až do vzdálenosti 90 metrů.\n\n• Co Spacial Rend NEOVLIVŇUJE:\n  Dosah interakce s PokéStopy a Gymy zůstává na standardních 80 metrech (Palkia zvětšuje pouze dosah na Pokémony, nikoliv na točení disků).\n\n⚡ Kdy Spacial Rend nejvíce oceníte:\n1. Hraní z domova, kanceláře, kavárny nebo hotelu — dosáhnete na všechny okolní spawn pointy, aniž byste museli vyjít ven.\n2. Nepřístupný terén — dosáhnete na Pokémony za plotem, na soukromém pozemku, v řece nebo na staveništi.\n3. Auto-Catchery (Pokémon GO Plus+, Gotcha) — zařízení využívá rozšířený 80m okruh a automaticky chytá Pokémony z celého širokého okolí!",
          en: "Origin Forme Palkia tears the fabric of space with its signature move, Spacial Rend. This effect massively magnifies your encounter radius and spawn visibility across the Overworld map.\n\n• Cost: 5,000 Stardust + 5 Palkia Candy per 10-minute increment (24h cap = 720,000 Dust + 720 Candy).\n• Spatial Mathematics:\n  • Standard Catch Radius: 40 meters (Area: 5,026 m²)\n  • Spacial Rend Catch Radius: 80 meters (Area: 20,106 m²)\n  • Net Advantage: 4.0x Circular Surface Area (+300% expanded reach!)\n  • Spawn Visibility: Wild Pokémon render on your screen up to 90 meters away.\n\n• What Spacial Rend Does NOT Change:\n  Interaction range with PokéStops and Gyms remains locked at the standard 80-meter limit (Palkia expands Pokémon encounters, not PokéStop spinning).\n\n⚡ Top Strategic Use Cases:\n1. Stationary Grinding: From home, airports, cafes, or offices, pull 4 times as many cluster spawns into catch reach without taking a single step.\n2. Inaccessible Locations: Catch rare spawns stuck behind fences, waterways, cliffs, or private properties.\n3. Auto-Catcher Synergy: The Pokémon GO Plus+ and Gotcha automatically lock onto wild targets across the expanded 80m circle!",
          ja: "オリジンパルキアの特別技「あくうせつだん」は、プレイヤー周囲の空間を歪め、マップ上の野生ポケモン出現・捕獲サークルを劇的に拡大します。\n\n• コスト：10分ごとに「ほしのすな 5,000 + パルキアのアメ 5個」（24時間最大＝ほしのすな72万＋アメ720個）。\n• 空間の数値変化：\n  • 通常の捕獲半径：40メートル（面積：約5,026㎡）\n  • あくうせつだん捕獲半径：80メートル（面積：約20,106㎡）\n  • 実質効果：円形面積が「4倍（+300%拡大）」に！\n  • 視認可能距離：最大90メートル先に出現したポケモンまでマップにポップします。\n\n• ポケストップへの影響：\n  ポケストップやジムのインタラクション距離は通常の80メートルのまま変更されません（ポケモン捕獲のみが対象です）。\n\n⚡ 最高の活用シーン：\n1. 自宅やオフィス、カフェからの定点狩り：1歩も動かずに周囲の全出現ポイントを巻き込んで捕獲可能。\n2. 立ち入り禁止区域の救出：私有地や水上、フェンスの向こうに出現したレアポケモンを安全にタップ可能。\n3. オートキャッチャー（Pokémon GO Plus+）：拡大された80m範囲内の野生ポケモンを自動捕獲し、時給換算で爆発的な捕獲数を叩き出します！",
          ru: "Origin Forme Palkia искажает пространство атакой Spacial Rend, многократно увеличивая радиус взаимодействия с дикими покемонами на карте.\n\n• Стоимость: 5 000 пыли + 5 конфет Palkia за каждые 10 минут (максимум 24ч = 720 000 пыли + 720 конфет).\n• Математика радиуса:\n  • Обычный радиус ловли: 40 метров (площадь 5 026 м²)\n  • Радиус ловли Spacial Rend: 80 метров (площадь 20 106 м²)\n  • Результат: Площадь взаимодействия увеличена в 4,0 раза (+300% охвата!)\n  • Видимость: Покемоны появляются на карте на расстоянии до 90 метров.\n\n• Что НЕ меняется:\n  Радиус кручения покестопов и гимов остается стандартным (80 м).\n\n⚡ Главные сценарии применения:\n1. Игра из дома или офиса — ловите покемонов из всех соседних дворов, не вставая с дивана.\n2. Недоступные зоны — доставайте покемонов за заборами, на закрытых стройках или на воде.\n3. Автоловеры (GO Plus+, Gotcha) — устройства метят цели по новому 80-метровому радиусу, обеспечивая рекордную скорость фарма!"
        },
        tips: {
          cs: [
            "Během GO Festu a Safari Zone se Spacial Rend vyplatí zapnout po celou dobu trvání eventu — nezmeškáte žádného vzácného Shiny Pokémona v davu!",
            "Lze kombinovat s Mega Evolucí pro zisk extra Candy a Candy XL z celého 80m okruhu."
          ],
          en: [
            "During GO Fest and Safari Zone, keep Spacial Rend running for the entire ticket window to never miss a rare Shiny in dense crowds!",
            "Fully compatible with Mega Evolution: stack Mega boost with the 80m catch circle for maximum Candy XL collection."
          ],
          ja: [
            "GO Festやサファリゾーンなどの大型イベントでは常時発動が鉄則。混雑時でも見落としなく色違いを回収できます！",
            "メガシンカと重ね掛けすることで、80m全域のポケモンからアメXLボーナスを獲得可能です。"
          ],
          ru: [
            "На GO Fest держите Spacial Rend активным весь день, чтобы не упустить ни одного шайни!",
            "Отлично сочетается с Мега-Эволюцией: собирайте Candy XL со всего 80-метрового радиуса."
          ]
        },
        pokemon: ["Palkia-Origin"]
      },
      {
        id: "necrozma-fusions-sun-moon",
        heading: {
          cs: "4. Dusk Mane & Dawn Wings Necrozma — Sluneční a Měsíční síla",
          en: "4. Dusk Mane & Dawn Wings Necrozma — Solar & Lunar Convergence",
          ja: "4. ネクロズマ（たそがれのたてがみ／あかつきのつばさ）：太陽と月の力",
          ru: "4. Dusk Mane & Dawn Wings Necrozma — Солнечная и Лунная сила"
        },
        content: {
          cs: "Fúze Necrozmy se Solgaleo (Dusk Mane) a Lunala (Dawn Wings) přináší dva mocné efekty, které manipulují se dnem, nocí a evolučními podmínkami.\n\n• Cena aktivace: Pouhých 3 000 Stardustu + 3 Necrozma Candy za 10 minut (24h maximum = 432 000 Dust + 432 Candy — nejlevnější Adventure Effecty ve hře!).\n\n☀️ Dusk Mane Necrozma — Sunsteel Strike (Sluneční úder):\n• Působí jako sluneční kadidlo: Přitahuje denní Pokémony (Pidgey, Tyrunt, Rockruff, Cottonee, Solrock, Cherrim Sunny atd.).\n• Denní evoluce kdykoliv: Umožňuje provést denní evoluce i hluboko v noci (např. Rockruff → Midday Lycanroc, Eevee → Espeon, Tyrunt → Tyrantrum, Cosmoem → Solgaleo).\n\n🌙 Dawn Wings Necrozma — Moongeist Beam (Měsíční paprsek):\n• Působí jako lunární kadidlo: Přitahuje noční Pokémony (Amaura, Clefairy, Gligar, Lunatone, Inkay, Phantump atd.).\n• Noční evoluce kdykoliv: Umožňuje provést noční evoluce v pravé poledne (např. Rockruff → Midnight Lycanroc, Eevee → Umbreon, Amaura → Aurorus, Cosmoem → Lunala).\n• 🌕 Nejdůležitější trik: Moongeist Beam simuluje ÚPLNĚK (Full Moon)! Můžete tak okamžitě vyvinout Ursaringa na Ursalunu, aniž byste museli týdny čekat na reálný měsíční úplněk v kalendáři!",
          en: "Fusing Necrozma with Solgaleo (Dusk Mane) or Lunala (Dawn Wings) unlocks two cosmic Adventure Effects that bend day, night, and evolutionary rules.\n\n• Activation Cost: Just 3,000 Stardust + 3 Necrozma Candy per 10-minute increment (24h cap = 432,000 Dust + 432 Candy — the most affordable Adventure Effects in the game!).\n\n☀️ Dusk Mane Necrozma — Sunsteel Strike:\n• Solar Lure Aura: Summons diurnal wild Pokémon (Pidgey, Tyrunt, Rockruff, Cottonee, Solrock, Cherrim Sunny, etc.).\n• Anytime Daytime Evolutions: Enables daytime-restricted evolutions even in the middle of the night (e.g. Rockruff into Midday Lycanroc, Eevee into Espeon, Tyrunt into Tyrantrum, Cosmoem into Solgaleo).\n\n🌙 Dawn Wings Necrozma — Moongeist Beam:\n• Lunar Lure Aura: Summons nocturnal wild Pokémon (Amaura, Clefairy, Gligar, Lunatone, Inkay, Phantump, etc.).\n• Anytime Nighttime Evolutions: Enables nighttime-restricted evolutions at high noon (e.g. Rockruff into Midnight Lycanroc, Eevee into Umbreon, Amaura into Aurorus, Cosmoem into Lunala).\n• 🌕 The Ursaluna Masterstroke: Moongeist Beam synthetically triggers a FULL MOON! You can evolve Ursaring into Ursaluna on demand without waiting weeks for the real-world lunar calendar!",
          ja: "ネクロズマとソルガレオ／ルナアーラの合体（フュージョン）により、昼夜の概念と進化制限を書き換える2つの強力なエフェクトが解放されます。\n\n• コスト：10分ごとに「ほしのすな 3,000 + ネクロズマのアメ 3個」（24時間最大＝ほしのすな43.2万＋アメ432個、全エフェクト中最も低燃費！）。\n\n☀️ 日食ネクロズマ（たそがれのたてがみ）— メテオドライブ：\n• 太陽のおこう効果：昼に出現する野生ポケモン（イワンコ、チゴラス、モンメン、チェリムなど）を引き寄せます。\n• 深夜でも昼進化が可能：イワンコ（まひるのすがた）、イーブイ（エーフィ）、チゴラス（ガチゴラス）、コスモウム（ソルガレオ）への進化が昼夜問わず即座に実行可能。\n\n🌙 月食ネクロズマ（あかつきのつばさ）— シャドーレイ：\n• 月のおこう効果：夜に出現する野生ポケモン（アマルス、ピッピ、グライガー、ルナトーン、ボクレーなど）を引き寄せます。\n• 真昼でも夜進化が可能：イワンコ（まよなかのすがた）、イーブイ（ブラッキー）、アマルス（アマルルガ）、コスモウム（ルナアーラ）への進化が可能。\n• 🌕 ガチグマ（Ursaluna）の即時進化：シャドーレイ発動中はゲーム内が「満月（Full Moon）」扱いになります！現実の満月の日を何週間も待つことなく、リングマをガチグマへいつでも進化させることができます！",
          ru: "Слияние Некрозмы с Солгалео (Dusk Mane) или Луналой (Dawn Wings) открывает космические способности, управляющие днем, ночью и эволюциями.\n\n• Стоимость: 3 000 пыли + 3 конфеты Necrozma за 10 минут (24ч максимум = 432 000 пыли + 432 конфеты — самые дешевые эффекты в игре!).\n\n☀️ Dusk Mane Necrozma — Sunsteel Strike:\n• Солнечный Incense: Привлекает дневных покемонов (Rockruff, Tyrunt, Solrock, Cherrim и др.).\n• Дневная эволюция в любое время: Эволюционируйте Midday Lycanroc, Espeon, Tyrantrum и Solgaleo даже глубокой ночью.\n\n🌙 Dawn Wings Necrozma — Moongeist Beam:\n• Лунный Incense: Привлекает ночных покемонов (Amaura, Gligar, Clefairy, Lunatone и др.).\n• Ночная эволюция в любое время: Эволюционируйте Midnight Lycanroc, Umbreon, Aurorus и Lunala в полдень.\n• 🌕 Трюк с Ursaluna: Moongeist Beam симулирует ПОЛНОЛУНИЕ! Вы можете мгновенно эволюционировать Ursaring в Ursaluna без ожидания реального полнолуния!"
        },
        tips: {
          cs: [
            "Sunsteel Strike a Moongeist Beam fungují jako samostatné kadidlo — nelze je zapnout současně s běžným Incense nebo Daily Incense.",
            "Fúze kompletně zachovává IV, Shiny i Lucky status ze základní Necrozmy (Solgaleo/Lunala slouží jako fúzní materiál)."
          ],
          en: [
            "Sunsteel Strike and Moongeist Beam act as autonomous lures — they cannot run concurrently with standard Incense or Daily Adventure Incense.",
            "Fusion completely preserves the IV, Shiny, and Lucky status of the base Necrozma (Solgaleo/Lunala act as fusion catalyst)."
          ],
          ja: [
            "メテオドライブとシャドーレイはおこう扱いとなるため、通常のおこうやおさんぽおこうとは同時に起動できません。",
            "合体時はベースとなる「ネクロズマ」の個体値・色違い・キラステータスが100%引き継がれます。"
          ],
          ru: [
            "Sunsteel Strike и Moongeist Beam работают как приманки и не могут включаться одновременно с обычным или Daily Incense.",
            "При слиянии покемон сохраняет 100% IV, шайни и lucky статус базовой Некрозмы."
          ]
        },
        pokemon: ["Necrozma-Dusk-Mane", "Necrozma-Dawn-Wings", "Solgaleo", "Lunala", "Ursaluna", "Lycanroc-Dusk"]
      },
      {
        id: "kyurem-black-white",
        heading: {
          cs: "5. Black & White Kyurem — Zmrazení animací a Zpomalení kruhu",
          en: "5. Black & White Kyurem — Freeze Shock & Ice Burn Catch Controls",
          ja: "5. ブラック＆ホワイトキュレム：フリーズボルト＆コールドフレア（捕獲補助）",
          ru: "5. Black & White Kyurem — Freeze Shock и Ice Burn (Контроль ловли)"
        },
        content: {
          cs: "Fúze Kyuremu se Zekromem (Black Kyurem) a Reshiramem (White Kyurem) přináší dva revoluční nástroje pro chytání divokých Pokémonů na obrazovce střetnutí.\n\n⚡ Black Kyurem — Freeze Shock (Zmrazující šok):\n• Cena: 5 000 Stardustu + 5 Kyurem Candy za 10 minut.\n• Sub-Zero Paralýza: Kompletně ZMRAZÍ divokého Pokémona při chytání! Pokémon nemůže skákat, útočit ani provádět úhybné manévry. Zůstává naprosto nehybný, což zaručuje 100% zásah každého hodu a eliminuje odrážení Pokéballů při rychlém chytání (Fast Catch).\n\n❄️ White Kyurem — Ice Burn (Ledový žár):\n• Cena: 5 000 Stardustu + 3 Kyurem Candy za 10 minut.\n• Zpomalení zaměřovacího kruhu: Zpomaluje zmenšování barevného kruhu o 30 až 50 %! Doba, po kterou má kruh velikost pro Excellent Throw, je více než dvakrát delší, což usnadňuje plnění výzkumných úkolů (např. 10× Excellent Throw za sebou) a maximalizuje XP z chytání.",
          en: "Kyurem fused with Zekrom (Black Kyurem) or Reshiram (White Kyurem) unlocks two unprecedented catch-encounter tools.\n\n⚡ Black Kyurem — Freeze Shock:\n• Cost: 5,000 Stardust + 5 Kyurem Candy per 10-minute increment.\n• Sub-Zero Paralysis: Completely IMMOBILIZES wild Pokémon on the catch screen! Target Pokémon cannot jump, attack, or dodge. They remain completely frozen in place, guaranteeing every throw connects and eliminating deflection during high-speed Fast Catching.\n\n❄️ White Kyurem — Ice Burn:\n• Cost: 5,000 Stardust + 3 Kyurem Candy per 10-minute increment.\n• Target Ring Deceleration: Drastically slows down the shrinking catch circle by 30% to 50%! The window for landing an Excellent Throw is extended by more than 2x, trivializing difficult Masterwork research tasks (like consecutive Excellent throws) and maximizing XP farming.",
          ja: "キュレムとゼクロム／レシラムの合体形態は、捕獲画面を支配する2つの強力なアシスト効果を持ちます。\n\n⚡ ブラックキュレム — フリーズボルト：\n• コスト：10分ごとに「ほしのすな 5,000 + キュレムのアメ 5個」。\n• 完全凍結麻痺：捕獲画面の野生ポケモンのジャンプ、攻撃モーション、威嚇を「完全停止」させます！ボールを弾かれることが一切なくなるため、高速捕獲（ファストキャッチ）やレイドボスの捕獲が圧倒的に快適になります。\n\n❄️ ホワイトキュレム — コールドフレア：\n• コスト：10分ごとに「ほしのすな 5,000 + キュレムのアメ 3個」。\n• サークル減速：捕獲サークルの縮小速度を30〜50%大幅に減速！エクセレントスローの受付時間が2倍以上に広がり、連続エクセレントのタスク達成や捕獲XP稼ぎが格段に簡単になります。",
          ru: "Слияния Кюрема с Зекромом (Black Kyurem) и Реширамом (White Kyurem) дают невероятные преимущества при ловле покемонов.\n\n⚡ Black Kyurem — Freeze Shock:\n• Стоимость: 5 000 пыли + 5 конфет Kyurem за 10 минут.\n• Полная заморозка: ПОЛНОСТЬЮ блокирует атаки, прыжки и уклонения диких покемонов! Они не двигаются, мячи не отскакивают, что делает Fast Catch на 100% безошибочным.\n\n❄️ White Kyurem — Ice Burn:\n• Стоимость: 5 000 пыли + 3 конфеты Kyurem за 10 минут.\n• Замедление круга: Замедляет сжатие прицельного круга на 30–50%! Окно для броска Excellent Throw держится вдвое дольше, что облегчает выполнение квестов и максимизирует опыт."
        },
        tips: {
          cs: [
            "Black Kyurem je nejlepší parťák pro těžko chytatelné Legendární Pokémony po Raidech — žádný boss vám neodrazí Premier Ball!",
            "White Kyurem je perfektní pro splnění level 50 výzkumných úkolů vyžadujících Excellent hody."
          ],
          en: [
            "Black Kyurem is the ultimate companion for aggressive legendary raid bosses — no more Premier Balls batted away!",
            "White Kyurem is the top choice for clearing Level 50 requirement tasks demanding consecutive Excellent throws."
          ],
          ja: [
            "ブラックキュレムは威嚇の激しい伝説レイドボス捕獲に最適です。プレミアボールを弾かれるストレスがゼロになります！",
            "ホワイトキュレムはレベル50到達タスクのエクセレント連続スロー達成に必須級のサポート役です。"
          ],
          ru: [
            "Black Kyurem идеален для поимки легендарных боссов — мячи больше никогда не отскочат от атаки!",
            "White Kyurem незаменим для квестов на уровень 50, где нужны серии бросков Excellent."
          ]
        },
        pokemon: ["Kyurem", "Zekrom", "Reshiram"]
      },
      {
        id: "combat-max-buffs",
        heading: {
          cs: "6. Bojové & Max Battle Adventure Effecty (Zacian, Zamazenta, Eternatus, Mewtwo)",
          en: "6. Combat & Max Battle Adventure Effects (Zacian, Zamazenta, Eternatus, Mewtwo)",
          ja: "6. 戦闘＆マックスバトル特化エフェクト：ザシアン、ザマゼンタ、ムゲンダイナ、ミュウツー",
          ru: "6. Боевые и Max Battle эффекты: Zacian, Zamazenta, Eternatus, Mewtwo"
        },
        content: {
          cs: "Nejnovější generace Adventure Effectů se zaměřuje na drtivou dominanci v Raidech a Dynamax Max Battles u Power Spotů:\n\n⚔️ Crowned Sword Zacian — Behemoth Blade (Obří čepel):\n• Cena: 5 000 Dust + 5 Candy za 6 minut.\n• Plný +10 % Attack bonus celému týmu v Raidech a +5 % v Max Battles.\n• Umožňuje necílenému Zacianovi bojovat v Dynamax Max Battles!\n\n🛡️ Crowned Shield Zamazenta — Behemoth Bash (Obří štít):\n• Cena: 5 000 Dust + 5 Candy za 6 minut.\n• Plný +10 % Defense bonus celému týmu v Raidech a +5 % v Max Battles, navíc odemyká Max Guard štít pro absorpci plošného poškození.\n\n🌌 Eternatus — Dynamax Cannon (Dynamaxové dělo):\n• Cena: 5 000 Dust + 30 Candy za 10 minut.\n• Overdrive Max útoků: Zvyšuje úroveň všech Max Moves o +1 Level! Zamčené Max Moves dočasně odemkne na Level 1 a Level 3 útoky povýší na transcendentní Level 4.\n\n👁️ Mega Mewtwo Y — Future Sight+ (Telepatické hodnocení):\n• Cena: Mewtwo Mega Energy + Candy za 10 minut.\n• Hundo & 3★ Radar: Divocí Pokémoni s hodnotou 3★ (82 %+ IV) a 4★ Hundo (100 % IV) vizuálně září zlatou aurou přímo na obrazovce ještě před chycením!",
          en: "The latest evolution of Adventure Effects delivers raw combat supremacy in Raid Battles and Power Spot Max Battles:\n\n⚔️ Crowned Sword Zacian — Behemoth Blade:\n• Cost: 5,000 Dust + 5 Candy per 6-minute increment.\n• Flat +10% Attack buff for raid squads and +5% in Max Battles.\n• Grants non-Dynamax Zacian entry into Max Battles at Power Spots!\n\n🛡️ Crowned Shield Zamazenta — Behemoth Bash:\n• Cost: 5,000 Dust + 5 Candy per 6-minute increment.\n• Flat +10% Defense buff in raids and +5% in Max Battles, fortifying team survivability.\n\n🌌 Eternatus — Dynamax Cannon:\n• Cost: 5,000 Dust + 30 Candy per 10-minute increment.\n• Max Move Overdrive: Boosts all party Max Moves by +1 Level! Unlocks locked moves to Level 1 and elevates Level 3 moves to transcendent Level 4.\n\n👁️ Mega Mewtwo Y — Future Sight+ (Telepathic Appraisal):\n• Cost: Mewtwo Mega Energy + Candy per 10-minute increment.\n• Hundo Aura Sniping: 3-Star (82%+ IV) and 100% IV Hundo wild spawns radiate a golden cosmic aura directly on the encounter screen before you even throw a ball!",
          ja: "最新のアドベンチャーエフェクトは、レイドバトルおよびパワースポットでのマックスバトルに特化した強力な強化をもたらします。\n\n⚔️ ザシアン（けんのおう）— きょじゅうざん：\n• コスト：6分ごとに「ほしのすな 5,000 + アメ 5個」。\n• レイドバトルでチーム全体の攻撃力+10%、マックスバトルで+5%増加。非ダイマックスのザシアンをマックスバトルへ参戦可能にします！\n\n🛡️ ザマゼンタ（たてのほうこう）— きょじゅうだん：\n• コスト：6分ごとに「ほしのすな 5,000 + アメ 5個」。\n• レイドバトルでチーム全体の防御力+10%、マックスバトルで+5%増加し、強敵の即死攻撃からパーティーを守ります。\n\n🌌 ムゲンダイナ — ダイマックスほう：\n• コスト：10分ごとに「ほしのすな 5,000 + アメ 30個」。\n• マックス技オーバードライブ：参加ポケモンの全マックス技レベルを+1強化！未解放の技をレベル1で使用可能にし、レベル3技を超越レベル4へ押し上げます。\n\n👁️ メガミュウツーY — みらいよち＋（テレパシー個体値鑑定）：\n• コスト：メガエナジー + ミュウツーのアメ（10分間）。\n• 個体値100%オーラ透視：個体値82%以上（3つ星）および個体値100%（Hundo）の野生ポケモンが、捕獲画面突入時に黄金の輝きを放ちます！",
          ru: "Новейшие боевые Adventure Effects обеспечивают доминирование в рейдах и Max Battles:\n\n⚔️ Crowned Sword Zacian — Behemoth Blade:\n• Стоимость: 5 000 пыли + 5 конфет за 6 минут.\n• +10% Attack в рейдах и +5% в Max Battles. Позволяет Zacian участвовать в битвах на Power Spots!\n\n🛡️ Crowned Shield Zamazenta — Behemoth Bash:\n• Стоимость: 5 000 пыли + 5 конфет за 6 минут.\n• +10% Defense в рейдах и +5% в Max Battles, спасая команду от тяжелых атак.\n\n🌌 Eternatus — Dynamax Cannon:\n• Стоимость: 5 000 пыли + 30 конфет за 10 минут.\n• Overdrive Max-атак: Повышает уровень всех Max Moves на +1! Разблокирует закрытые атаки до Уровня 1, а Уровень 3 поднимает до Уровня 4.\n\n👁️ Mega Mewtwo Y — Future Sight+ (Телепатический Appraise):\n• Стоимость: Мега-энергия + конфеты Mewtwo за 10 минут.\n• Золотая аура 100% IV: Покемоны с 3★ (82%+) и 100% IV (Hundo) светятся золотой космической аурой прямо на экране поимки!"
        },
        tips: {
          cs: [
            "Zacian a Zamazenta form change je po prvotním odemknutí za 1 000 Energy navždy zdarma bez dalšího placení!",
            "Eternatus Dynamax Cannon umožňuje i začátečníkům s nízkými Max Moves úspěšně porážet 6★ Gigantamax bossy."
          ],
          en: [
            "Zacian and Zamazenta Crowned Form changes are permanently free after the initial 1,000 Crowned Energy unlock!",
            "Eternatus's Dynamax Cannon allows trainers with under-leveled Max Moves to clear daunting 6-Star Gigantamax bosses."
          ],
          ja: [
            "ザシアンとザマゼンタのフォルムチェンジは、初回1,000エナジーで解放した後は何度でも完全無料で切り替え可能です！",
            "ムゲンダイナのエフェクトを使えば、マックス技が未強化のポケモンでも星6キョダイマックスを攻略可能になります。"
          ],
          ru: [
            "Смена форм Zacian и Zamazenta бесплатна навсегда после первой разблокировки за 1000 энергии!",
            "Dynamax Cannon у Eternatus помогает побеждать даже тяжелых 6-звездочных Gigantamax боссов."
          ]
        },
        pokemon: ["Zacian", "Zamazenta", "Eternatus", "Mewtwo"]
      }
    ]
  },
  {
    id: "pokelid-stamp-rally-japan-guide",
    slug: "pokelid-stamp-rally-japan-guide",
    iconName: "MapPin",
    imageUrl: "https://local.pokemon.jp/img/p/manhole/dd60987af1dda49a37486a2cbcb4d407_l.png",
    featured: false,
    author: "PoGo Events Team",
    readTime: "10 min",
    updatedAt: "2026-09-24",
    category: {
      cs: "Japonské Eventy & Pokélids",
      en: "Japan Events & Pokélids",
      ja: "日本イベント＆ポケふた",
      ru: "События в Японии и Pokélids"
    },
    title: {
      cs: "Pokélid Stamp Rally v Japonsku: Kompletní průvodce a Lokační karty",
      en: "Pokélid Stamp Rally in Japan: Complete Guide & Location Cards",
      ja: "ポケふたスタンプラリー完全攻略：全国アンバサダーとロケーション背景ピカチュウ",
      ru: "Pokélid Stamp Rally в Японии: Полный гайд и карточки локаций"
    },
    subtitle: {
      cs: "Jak funguje celostátní razítková rallye Pokémon poklopů v Japonsku, oficiální ambasadoři prefektur a garantovaný zisk Pikachu s unikátním pozadím každé provincie.",
      en: "How the nationwide utility hole cover stamp rally works across Japan: prefectural ambassadors, cultural wordplay, and guaranteed Location Background Pikachu encounters.",
      ja: "全国41都道府県に広がる「ポケふた」スタンプラリーの仕組み、全国推しポケモン（アンバサダー）とご当地背景ピカチュウ入手方法を徹底解説。",
      ru: "Как работает общенациональное ралли люков Pokélid в Японии: амбассадоры префектур и гарантированный Пикачу с фоном соответствующей провинции."
    },
    sections: [
      {
        id: "prefectural-ambassadors",
        heading: {
          cs: "1. Oficiální Ambasadoři prefektur a kulturní hříčky",
          en: "1. Prefectural Ambassadors & Cultural Wordplay",
          ja: "1. 都道府県の「推しポケモン（アンバサダー）」と任命理由",
          ru: "1. Официальные амбассадоры префектур и культурные каламбуры"
        },
        content: {
          cs: "Každá zapojená prefektura má oficiálně jmenovaného 'Podpůrného Pokémona' (Support Pokémon / Ambasadora), jehož jméno, vzhled nebo mytologie souvisí s lokální kulturou:\n\n• Hokkaidó (北海道) ➔ Alolan Vulpix & Vulpix: Ambasadoři sněžných plání; symbolizují subarktické klima a proslulý prašan v lyžařských střediscích.\n• Mijagi (宮城県) ➔ Lapras: Jmenován na podporu obnovy pobřeží po ničivém tsunami v roce 2011; reprezentuje malebný záliv Macušima a mořskou pohostinnost.\n• Kagawa (香川県) ➔ Slowpoke (Yadon): Fenomenální slovní hříčka! Japonské jméno Yadon zní téměř totožně jako Sanuki Udon — slavné nudle z Kagawy. Prefektura se dokonce oficiálně přejmenovala v kampani na 'Slowpoke-ken' (Prefektura Slowpoke)!\n• Iwate (岩手県) ➔ Geodude (Ishitsubute): Slovní a vizuální hříčka: Iwa (岩 = Skála) + Te (手 = Ruka) ➔ Geodude je doslova 'Kámen s rukama'!\n• Tottori (鳥取県) ➔ Sandshrew & Alolan Sandshrew: Obyvatelé písečných dun oslavující obří písečné duny Tottori Sakyū.\n• Fukui (福井県) ➔ Dragonite (Kairyū): Fukui je paleontologické hlavní město Japonska s největším muzeem dinosaurů; slabika Ryū (竜) znamená drak i dinosaurus.\n• Mie (三重県) ➔ Oshawott (Mijumaru): Fonetická podoba: znaky pro Mie se dají číst jako Mijū, což přímo zrcadlí jméno Mijumaru.\n• Mijazaki (宮崎県) ➔ Exeggutor & Alolan Exeggutor: 'Slunečná prefektura' plná tropického slunce a palem Phoenix, které Alolan Exeggutor dokonale ztělesňuje.\n• Okinawa (沖縄県) ➔ Growlithe (Gādī): Ztělesnění mýtických ochranných lvů Shīshā z tradičních střech Okinawy.\n• Nagasaki (長崎県) ➔ Ampharos (Denryū): Symbol historických přístavních majáků a místní lidové písně 'Denderaryuba'.\n• Kóči (高知県) ➔ Quagsire (Nuō): Oslavuje křišťálově čisté řeky Šimanto a Nijodo.\n• Kagošima (指宿市 / Ibusuki) ➔ Eevee: Městská hříčka: název města Ibusuki zní v japonštině jako 'I love Suki' ➔ foneticky Ībui (Eevee)!",
          en: "Each participating prefecture designates an official 'Support Pokémon' whose Japanese name, typing, or cultural associations link to the region:\n\n• Hokkaido (北海道) ➔ Alolan Vulpix & Vulpix: Leaders of the Hokkaido Aficionado Expedition; celebrate powder snow and northern alpine landscapes.\n• Miyagi (宮城県) ➔ Lapras: Appointed in 2019 to aid disaster recovery following the 2011 Pacific tsunami; embodies Matsushima Bay and maritime hospitality.\n• Kagawa (香川県) ➔ Slowpoke (Yadon): Iconic phonetic pun! Yadon mimics 'Sanuki Udon' — Kagawa's world-renowned noodle specialty. Kagawa proudly brands itself as 'Slowpoke Prefecture' (Yadon-ken)!\n• Iwate (岩手県) ➔ Geodude (Ishitsubute): Brilliant visual & kanji pun: Iwa (岩, Rock) + Te (手, Hand) = a Rock with Hands!\n• Tottori (鳥取県) ➔ Sandshrew & Alolan Sandshrew: Ground-type tunnelers celebrating the massive coastal Tottori Sand Dunes.\n• Fukui (福井県) ➔ Dragonite (Kairyu): Fukui is Japan's dinosaur fossil excavation capital; Ryū (竜) means both dragon and prehistoric dinosaur.\n• Mie (三重県) ➔ Oshawott (Mijumaru): Phonetic wordplay: The Kanji for Mie can be read as Mijū, echoing Mijumaru.\n• Miyazaki (宮崎県) ➔ Exeggutor & Alolan Exeggutor: Celebrates the tropical 'Sunshine Prefecture' and its official Phoenix palm trees.\n• Okinawa (沖縄県) ➔ Growlithe (Gādī): Emulates the mythical Ryukyuan guardian stone lions (Shīshā) guarding traditional Okinawan tiled roofs.\n• Nagasaki (長崎県) ➔ Ampharos (Denryū): Commemorates historic port lighthouses, harbor illumination, and the traditional song 'Denderaryuba'.\n• Kochi (高知県) ➔ Quagsire (Nuō): Honors the pristine, crystal-clear currents of the Shimanto and Niyodo rivers.\n• Kagoshima - Ibusuki (指宿市) ➔ Eevee: City pun: 'Ibusuki' sounds playfully like 'I love Suki' ➔ matching Ībui (Eevee)!",
          ja: "各自治体には「推しポケモン」と呼ばれるオフィシャルアンバサダーが任命されており、その選定理由には深い地域愛やユーモアあふれる言葉遊びが込められています。\n\n• 北海道 ➔ アローラロコン＆ロコン：「北海道だいすき発見隊」隊長。雪深い美しい銀世界やパウダースノーのイメージにぴったり。\n• 宮城県 ➔ ラプラス：「宮城巡り応援ポケモン」。東日本大震災からの復興と、日本三景・松島をはじめとする海の観光を象徴。\n• 香川県 ➔ ヤドン：「うどん県×ヤドン」！香川名物「讃岐うどん」と「ヤドン」の語感が酷似していることから任命され、県全体で大々的にコラボ展開中。\n• 岩手県 ➔ イシツブテ：「岩」から「手」が出ているデザインが、まさに「岩手」を完璧に表現！\n• 鳥取県 ➔ サンド＆アローラサンド：日本最大級の海岸砂丘「鳥取砂丘」にちなみ、すなばが大好きなサンドが任命。\n• 福井県 ➔ カイリュー：日本屈指の恐竜化石発掘地・恐竜王国福井県にちなみ、ドラゴンの「リュウ（竜）」つながりで任命。\n• 三重県 ➔ ミジュマル：「三重」の読み（みじゅう）がミジュマルに似ていることから親善大使に就任。\n• 宮崎県 ➔ ナッシー＆アローラナッシー：温暖な気候で「日本のひなた」と呼ばれる宮崎県と、県の木「フェニックス」にそっくりなナッシーがマッチ。\n• 沖縄県 ➔ ガーディ：琉球文化のシンボルである守り神「シーサー」を彷彿とさせるガーディが任命。\n• 長崎県 ➔ デンリュウ：古くから栄えた港町の灯台の明かりや、長崎の伝統民謡「でんでらりゅうば」の語感から抜擢。\n• 高知県 ➔ ヌオー：奇跡の清流「四万十川」や「仁淀川」の豊かな水辺を象徴。\n• 鹿児島県指宿市 ➔ イーブイ：「いぶすき」をもじって「イーブイ好き」➔ イーブイシティとして認定！",
          ru: "Каждая префектура имеет официального 'покемона поддержки' с культурным или лингвистическим подтекстом:\n\n• Хоккайдо ➔ Алола Вульпикс и Вульпикс: Символы северной зимы и горнолыжного курорта.\n• Мияги ➔ Лапрас: Назначен для восстановления туризма после цунами 2011 года; символизирует залив Мацусима.\n• Кагава ➔ Слоупок (Ядон): Знаменитый каламбур! Ядон звучит как 'Сануки Удон' — знаменитая лапша Кагавы. Префектура даже неофициально называет себя префектурой Слоупока!\n• Иватэ ➔ Геодуд: Игры слов: Ива (скала) + Тэ (рука) = Геодуд буквально 'Камень с руками'!\n• Тоттори ➔ Сэндшрю: Земляной покемон в честь песчаных дюн Тоттори.\n• Фукуи ➔ Драгонайт: Столица раскопок динозавров в Японии; иероглиф Рю (дракон) связан с динозаврами.\n• Миэ ➔ Ошавотт: Фонетическое совпадение с иероглифами провинции Миэ.\n• Миядзаки ➔ Экзеггутор: 'Солнечная префектура' и официальные пальмы Феникс.\n• Окинава ➔ Гроулит: Образ каменных львов-хранителей Сиса на черепичных крышах.\n• Нагасаки ➔ Амфарос: Маяки портового города и народная песня Denderaryuba.\n• Коти ➔ Квагсайр: Чистейшие реки Симанто и Ниёдо.\n• Ибусуки (Кагосима) ➔ Иви: Каламбур: 'Ибусуки' звучит как 'Иви-суки' (Я люблю Иви)!"
        },
        tips: {
          cs: [
            "Každý z těchto Pokémonů má v dané prefektuře zvýšený počet tématických PokéStopů a propagačních předmětů v infocentrech.",
            "Při návštěvě Japonska sledujte místní vlaky a autobusy — často nesou celoplošný polep příslušného ambasadora!"
          ],
          en: [
            "Each ambassador Pokémon frequently appears on branded local buses, train cars, and municipal tourism brochures.",
            "Check local souvenir shops and train stations for prefecture-exclusive regional Pokémon merchandise."
          ],
          ja: [
            "アンバサダーポケモンは現地のラッピング電車やバス、空港の看板などにも多数起用されています。",
            "現地のお土産店や観光案内所では、ご当地限定のコラボグッズも多数販売されています。"
          ],
          ru: [
            "Покемоны-амбассадоры часто украшают поезда, автобусы и туристические буклеты регионов.",
            "В местных туристических центрах можно найти эксклюзивные региональные сувениры."
          ]
        },
        pokemon: ["Vulpix-Alolan", "Lapras", "Slowpoke", "Geodude", "Sandshrew-Alolan", "Dragonite", "Oshawott", "Exeggutor-Alolan", "Growlithe", "Ampharos", "Quagsire", "Eevee"]
      },
      {
        id: "reward-pikachu-and-location-background",
        heading: {
          cs: "2. Odměna: Pikachu s Lokačním pozadím dané prefektury",
          en: "2. Rewards: Pikachu with Prefectural Location Backgrounds",
          ja: "2. 報酬：都道府県ごとの限定ロケーション背景付きピカチュウ",
          ru: "2. Награда: Пикачу с фоном локации соответствующей префектуры"
        },
        content: {
          cs: "Zlatým hřebem celé mechaniky je exkluzivní odměna v podobě divokého Pikachu:\n\n• Pravidlo 2 razítek: Za každé DVĚ (2) razítka nasbíraná v rámci TÉŽE prefektury se vám okamžitě odemkne úkol s garantovaným střetnutím s Pikachu!\n• Lokační pozadí prefektury: Tento Pikachu má na obrazovce shrnutí unikátní Lokační kartu (Location Background) vyobrazující specifické přírodní scenérie a kulturu dané provincie:\n  - Hokkaidó: Zasněžené horské štíty pohoří Tokači a sněhové vločky.\n  - Mijagi: Záliv Macušima s ostrůvky borovic a vlnkami Laprase.\n  - Kagawa: Misky vyhlášeného Sanuki Udonu a siluety Slowpoka.\n  - Tottori: Vlnité písečné duny Tottori Sakyū.\n  - Mijazaki: Pobřežní palmy Phoenix a tropické slunce.\n  - Okinawa: Tradiční červené střešní tašky a tyrkysový oceán.\n• Neomezená opakovatelnost: Pokud v prefektuře Mijagi navštívíte a zatočíte 10 různých poklopů, obdržíte celkem 5 samostatných Pikachu s pozadím Mijagi!\n• Možnost Shiny: Pikachu z této odměny může být Shiny (zlatý) — lesk a třpytky fungují v harmonii s lokačním pozadím!\n• Trvalá mechanika: Nejedná se o časově omezenou akci. Stamp Rally je trvalou součástí hry bez data expirace.",
          en: "The ultimate prize of the Stamp Rally is the exclusive commemorative Pikachu encounter:\n\n• The 2-Stamp Threshold: Every two (2) stamps gathered within the SAME prefecture instantly unlocks a claimable research encounter with Pikachu!\n• Prefectural Location Background: This Pikachu displays a custom Location Card on its summary screen illustrating the geography and culture of that prefecture:\n  - Hokkaido: Snow-covered alpine peaks and falling ice crystals.\n  - Miyagi: Pine-crested islets of Matsushima Bay and ocean currents.\n  - Kagawa: Steaming bowls of Sanuki Udon noodles and Slowpoke silhouettes.\n  - Tottori: Wind-swept coastal dunes of Tottori Sakyu.\n  - Miyazaki: Tropical Phoenix palms and radiant sunshine.\n  - Okinawa: Traditional red Ryukyuan roof tiles and turquoise seas.\n• Uncapped Farming: Collecting 10 stamps across Miyagi awards 5 separate Pikachu encounters, each carrying the Miyagi background!\n• Shiny Potential: Pikachu can be encountered as a Shiny — the sparkles alternate gracefully with the commemorative card!\n• Permanent Core Feature: Unlike short-lived seasonal events, the Stamp Rally is a permanent core game engine feature with no expiration.",
          ja: "スタンプラリー最大の魅力は、都道府県ごとの限定アートを宿したピカチュウとの遭遇です。\n\n• 2個ごとの確定リワード：同一都道府県内で「スタンプを2個」集めるごとに、限定リワードが出現しピカチュウと確定遭遇できます！\n• 都道府県限定ロケーション背景：捕獲したピカチュウの詳細画面には、その県ならではの名所や文化を描いた「ロケーション背景（Location Background）」が美しく描かれます：\n  - 北海道：十勝岳連峰の雪景色と舞い散るパウダースノー。\n  - 宮城県：日本三景・松島の島々とラプラスの波紋。\n  - 香川県：名物讃岐うどんのどんぶりとヤドンのシルエット。\n  - 鳥取県：風紋が美しい鳥取砂丘の広大な砂地。\n  - 宮崎県：日南海岸のフェニックス並木と降り注ぐ太陽光。\n  - 沖縄県：伝統的な赤瓦の屋根とエメラルドグリーンの美ら海。\n• 上限なしで周回可能：例えば宮城県で10個のポケふたを巡れば、5匹の「宮城背景付きピカチュウ」を受け取ることができます！\n• 色違い（Shiny）出現あり：色違いのピカチュウも出現判定があり、キラキラのエフェクトと限定背景が同時に楽しめます。\n• 恒久機能：期間限定イベントではなく、いつでも挑戦できる常設コンテンツです。",
          ru: "Главная награда Stamp Rally — эксклюзивный Пикачу с фоном локации:\n\n• Правило 2 штампов: Каждые 2 штампа в ОДНОЙ префектуре дают встречу с Пикачу!\n• Фон префектуры: Пойманный Пикачу имеет на экране уникальный фон локации (Location Background):\n  - Хоккайдо: Заснеженные вершины гор Токати и снежинки.\n  - Мияги: Сосновые островки залива Мацусима и волны Лапраса.\n  - Кагава: Чаши с лапшой Сануки Удон и силуэты Слоупока.\n  - Тоттори: Песчаные дюны Тоттори Сакю.\n  - Миядзаки: Пальмы Феникс и тропическое солнце.\n  - Окинава: Традиционные красные крыши и лазурное море.\n• Безлимитный сбор: 10 штампов в Мияги принесут вам 5 Пикачу с фоном Мияги!\n• Шанс на Шайни: Пикачу может быть Shiny!\n• Постоянная функция: Это постоянная механика игры без ограничения по времени."
        },
        tips: {
          cs: [
            "Pikachu s lokačním pozadím si zachovává toto pozadí i po výměně (Trade) s přáteli.",
            "Pozadí se nesmaže ani při vývoji na Raichu — karta zůstává navždy zachována!"
          ],
          en: [
            "Pikachu preserves its Location Background permanently across trades with friends.",
            "Evolving Pikachu into Raichu retains the Location Background without loss!"
          ],
          ja: [
            "ロケーション背景付きピカチュウは、フレンドと交換（トレード）しても背景がそのまま100%維持されます。",
            "ライチュウへ進化させても背景が消えることはありません。"
          ],
          ru: [
            "Пикачу сохраняет фон локации навсегда даже после обмена с друзьями.",
            "При эволюции в Райчу фон локации также полностью сохраняется!"
          ]
        },
        pokemon: ["Pikachu", "Raichu"]
      },
      {
        id: "cross-link-to-special-backgrounds",
        heading: {
          cs: "3. Související průvodce: Globální a Městská Speciální pozadí",
          en: "3. Related Guide: Global & In-Person Special Backgrounds",
          ja: "3. 関連ガイド：世界各地のスペシャル背景＆ロケーションカード",
          ru: "3. Связанное руководство: Глобальные и Городские специальные фоны"
        },
        content: {
          cs: "Kromě poklopů Poké Lids v Japonsku existuje v Pokémon GO rozsáhlý svět lokačních karet z celosvětových mega-akcí (Pokémon GO Fest, City Safari, GO Tour) a kosmických Speciálních pozadí (Ultra Space Wormhole, fúze Necrozmy a Kyuremu).\n\nChcete vědět, jak fungují pravidla výměny Speciálních pozadí, jaké karty mají města jako Madrid, Sendai, New York nebo Barcelona, a proč se pozadí smaže při převodu do Pokémon HOME?\n\n👉 Prozkoumejte náš kompletní katalog: [Speciální Pozadí a Lokační Karty v Pokémon GO](/guides/special-backgrounds-location-cards-guide).",
          en: "Beyond the Poké Lids in Japan, Pokémon GO features an extensive catalog of Location Cards from worldwide live mega-events (Pokémon GO Fest, City Safari, GO Tour) and cosmic Special Backgrounds (Ultra Space Wormholes, Necrozma & Kyurem fusions).\n\nWant to learn about Special Trade costs, which cities hold exclusive cards, and why Pokémon HOME deletes all backgrounds?\n\n👉 Check out our complete master catalog: [Special Backgrounds & Location Cards Master Guide](/guides/special-backgrounds-location-cards-guide).",
          ja: "日本のポケふたの他にも、『Pokémon GO』には世界各地のリアル大型イベント（GO Fest、City Safari、GO Tour）限定の都市ロケーションカードや、ウルトラホールや合体ネクロズマ／キュレムなどのグローバル「スペシャル背景」が多数存在します。\n\n都市別カードの一覧や、特別な交換（スペシャルフレンドトレード）のルール、Pokémon HOME転送時の注意点を詳しく知りたい方はこちら：\n\n👉 詳細解説：[スペシャル背景＆ロケーションカード完全ガイド](/guides/special-backgrounds-location-cards-guide)。",
          ru: "Помимо японских люков Poké Lids, в Pokémon GO есть огромный каталог карточек локаций с живых фестивалей (GO Fest, City Safari, GO Tour) и космических фонов (Ultra Space Wormhole, слияния Некрозмы и Кюрема).\n\nХотите узнать правила обменов и список всех городов с уникальными фонами?\n\n👉 Читайте наш подробный каталог: [Специальные Фоны и Карточки Локаций в Pokémon GO](/guides/special-backgrounds-location-cards-guide)."
        },
        tips: {
          cs: [
            "Lokační karty z městských akcí i Poké Lids sdílejí vyhledávací filtr: napište do vyhledávání 'locationbackground'.",
            "Všechny typy pozadí podléhají pravidlu Special Trade."
          ],
          en: [
            "Both in-person event cards and Poké Lids share the native search filter: 'locationbackground'.",
            "All commemorative cards require a daily Special Trade slot."
          ],
          ja: [
            "ポケふたもリアルイベントの都市カードも、すべて検索ボックスで「locationbackground」と入力すれば一括抽出できます。",
            "すべての記念背景は「特別な交換」枠を消費します。"
          ],
          ru: [
            "Все карточки люков и живых событий ищутся фильтром 'locationbackground'.",
            "Все памятные карточки требуют слот специального обмена (Special Trade)."
          ]
        },
        pokemon: ["Necrozma", "Kyurem", "Rayquaza"]
      }
    ]
  },
  {
    id: "special-backgrounds-location-cards-guide",
    slug: "special-backgrounds-location-cards-guide",
    iconName: "Sparkles",
    imageUrl: "https://pogoevents.app/backgrounds/ultra-space-wormhole.png",
    featured: true,
    author: "PoGo Events Team",
    readTime: "12 min",
    updatedAt: "2026-09-27",
    category: {
      cs: "Vzácné Karty & Sběratelství",
      en: "Rare Cards & Collectibles",
      ja: "限定カード＆コレクション",
      ru: "Редкие карты и Коллекционирование"
    },
    title: {
      cs: "Speciální Pozadí a Lokační Karty v Pokémon GO: Kompletní velký průvodce",
      en: "Special Backgrounds & Location Cards in Pokémon GO: Ultimate Master Guide",
      ja: "スペシャル背景＆ロケーションカード完全ガイド：全入手方法と合体・トレード仕様",
      ru: "Специальные Фоны и Карточки Локаций в Pokémon GO: Полный мастер-гайд"
    },
    subtitle: {
      cs: "Kompletní velký rozbor všech 66 historických pozadí (35 in-person městských lokačních karet a 31 globálních speciálních pozadí). Včetně fotek všech karet, seznamu dostupných Pokémonů a pravidel fúzí Necrozmy a Kyuremu.",
      en: "Comprehensive breakdown of all 66 historical backgrounds (35 in-person city location cards & 31 global special backgrounds). Complete with photos of all backdrops, featured Pokémon rosters, and fusion genetics for Necrozma & Kyurem.",
      ja: "歴代全66種類の記念背景（都市限定ロケーションカード35種＋グローバルスペシャル背景31種）を完全網羅。全背景の写真、登場ポケモン、合体・トレード仕様まで徹底解説。",
      ru: "Полный разбор всех 66 исторических фонов (35 городских карточек локаций и 31 глобальный специальный фон). Включает фотографии, списки покемонов и генетику слияний Некрозмы и Кюрема."
    },
    sections: [
      {
        id: "pokelid-rally-notice-and-architecture",
        heading: {
          cs: "1. Úvod do pamětních karet a odkaz na Pokélid Rally v Japonsku",
          en: "1. Architecture Overview & Japan Pokélid Rally Notice",
          ja: "1. 記念背景システムの概要と「ポケふたスタンプラリー」案内",
          ru: "1. Архитектура фонов и ссылка на ралли люков Pokélid в Японии"
        },
        content: {
          cs: "Pamětní karty v Pokémon GO jsou prestižní vizuální modifikace, které se zobrazují na pozadí detailu Pokémona za jeho 3D modelem. Celý systém se dělí do dvou hlavních pilířů:\n\n1. Lokační karty (Location Cards): Vázané na konkrétní fyzické geografické místo na světě (města hostící Pokémon GO Fest, GO Tour, City Safari nebo historické památky National Trust).\n2. Speciální pozadí (Special Backgrounds): Vázaná na globální události, kosmické dimenze, lore fenomény (Ultra Space Wormhole, fúze Necrozmy a Kyuremu, lídři Valor/Instinct/Mystic) a dostupná všem trenérům na světě bez nutnosti cestovat.\n\n🇯🇵 DŮLEŽITÉ UPOZORNĚNÍ PRO JAPONSKÉ POKÉ LIDS:\nHledáte oficiální poklopy Poké Lids v Japonsku a Pikachu s pozadím prefektur?\nJaponská razítková rallye má vlastní specializovaný článek!\n👉 Přejděte na: [Pokélid Stamp Rally v Japonsku: Kompletní průvodce](/guides/pokelid-stamp-rally-japan-guide).",
          en: "Commemorative cards in Pokémon GO are prestigious cosmetic modifications displayed behind a Pokémon on its summary screen. The engine divides into two distinct pillars:\n\n1. Location Cards: Bound to physical geographic destinations around the globe (host cities of Pokémon GO Fest, GO Tour, City Safari, or heritage landmarks like UK National Trust).\n2. Special Backgrounds: Bound to global lore, dimensions, and factional milestones (Ultra Space Wormholes, Necrozma & Kyurem fusions, Team Leaders), accessible worldwide without travel.\n\n🇯🇵 IMPORTANT NOTICE REGARDING JAPANESE POKÉ LIDS:\nLooking for the Japanese Poké Lids covers and prefecture-specific Pikachu cards?\nThe Japanese Stamp Rally has its own dedicated master guide!\n👉 Visit: [Pokélid Stamp Rally in Japan: Complete Guide](/guides/pokelid-stamp-rally-japan-guide).",
          ja: "『Pokémon GO』の記念背景システムは、ポケモンの詳細画面の背面に表示される最高峰のコレクターズ要素です。システムは大きく2つの柱に分かれています：\n\n1. ロケーションカード（Location Cards）：実在する特定の都市や会場に紐づいた地理的背景（GO Fest、GO Tour、City Safari開催都市、ナショナル・トラスト史跡など）。\n2. スペシャル背景（Special Backgrounds）：世界規模のイベント、異次元、勢力マイルストーンに紐づいたテーマ背景（ウルトラホール、合体ネクロズマ／キュレム、チームリーダー記念など）。現地に行かなくても世界中で入手可能。\n\n🇯🇵 日本の「ポケふたスタンプラリー」をお探しの方へ：\n日本全国41都道府県のマンホール蓋（ポケふた）、ご当地背景ピカチュウについては、専用の単独ガイドで詳しく解説しています！\n👉 ガイドを見る：[ポケふたスタンプラリー完全攻略：全国アンバサダーとロケーション背景ピカチュウ](/guides/pokelid-stamp-rally-japan-guide)。",
          ru: "Памятные фоны в Pokémon GO — это престижные косметические модификации на экране покемона. Система делится на две категории:\n\n1. Карточки локаций (Location Cards): Привязаны к реальным географическим городам проведения живых событий (GO Fest, GO Tour, City Safari, объекты National Trust).\n2. Специальные фоны (Special Backgrounds): Привязаны к глобальным темам и лору (Ultra Space Wormhole, слияния Некрозмы и Кюрема, Лидеры Команд) и доступны тренерам по всему миру без путешествий.\n\n🇯🇵 ВАЖНОЕ ПРИМЕЧАНИЕ О ЯПОНСКИХ POKÉ LIDS:\nИщете руководство по японским люкам Poké Lids и Пикачу с фонами префектур?\nУ нас есть отдельный специализированный гайд!\n👉 Перейдите к: [Pokélid Stamp Rally в Японии: Полный гайд](/guides/pokelid-stamp-rally-japan-guide)."
        },
        tips: {
          cs: [
            "Pro nalezení všech Pokémonů s jakýmkoliv pozadím ve vašem inventáři napište do hledání 'background'.",
            "Pro filtraci pouze geografických karet zadejte 'locationbackground'."
          ],
          en: [
            "Search 'background' to filter all Pokémon carrying any commemorative backdrop.",
            "Search 'locationbackground' to isolate strictly geographic city cards."
          ],
          ja: [
            "バッグ内の背景持ちポケモンを全検索するには「background」と入力します。",
            "都市限定のロケーションカードのみを抽出したい場合は「locationbackground」と検索してください。"
          ],
          ru: [
            "Используйте поиск 'background' для отображения всех покемонов с фонами.",
            "Используйте 'locationbackground' для фильтрации исключительно карточек локаций городов."
          ]
        },
        pokemon: ["Pikachu", "Necrozma", "Kyurem"]
      },
      {
        id: "trading-rules-and-mechanics",
        heading: {
          cs: "2. Pravidla zobrazení, Výměna (Trade) a ztráta v Pokémon HOME",
          en: "2. Display Rules, Trading Mechanics & Pokémon HOME Deletion",
          ja: "2. 表示アニメーション、トレード仕様、Pokémon HOME転送時の注意",
          ru: "2. Правила отображения, обмен (Trade) и потеря в Pokémon HOME"
        },
        content: {
          cs: "Pravidla a chování pozadí v herním enginu Pokémon GO:\n\n1. Cyklické prolínání obrazovky (Cross-Fade):\nPozadí trvale nenahrazuje původní elementární typ Pokémona (např. oheň, voda). Místo toho herní klient plynule prolíná typové energetické animace a pamětní lokační kartu. U Lucky Pokémonů cyklus střídá zlaté jiskry a pamětní kartu; u Shadow Pokémonů se temná fialová aura vykresluje přímo přes pamětní pozadí!\n\n2. Povinný Speciální Trade (Mandatory Special Trade):\nPOZOR! Každý Pokémon nesoucí Lokační kartu nebo Speciální pozadí je v kódu hry pevně nastaven jako Speciální výměna (Special Trade)! I když vyměňujete obyčejného Eevee z City Safari a protihráč již Eevee v Pokédexu dávno má, výměna spotřebuje denní limit Special Trade a odpovídající množství Stardustu!\n\n3. 100% zachování při výměně (Trade Preservation):\nPozadí se při výměně NIKDY nesmaže ani nezmění. Příjemce obdrží Pokémona s plně zachovanou původní lokační kartou.\n\n4. Vývoj Pokémona (Evolution):\nEvoluce plně zachovává pozadí (např. Eevee s kartou Barcelony vyvinutý na Vaporeona má stále barcelonskou Sagradu Famílii; Treecko s kartou britského National Trustu zůstává na Sceptilovi).\n\n5. ⚠️ ZTRÁTA V POKÉMON HOME:\nPřevod jakéhokoliv Pokémona s lokačním nebo speciálním pozadím do Pokémon HOME toto pozadí NAVŽDY A NENÁVRATNĚ SMAŽE! Systém Pokémon HOME nemá framework pro vykreslování pozadí z GO.",
          en: "Commemorative card engine rules and behaviors:\n\n1. Cross-Fade Display Animation:\nCards do not permanently overwrite standard typing energy backgrounds. The client smoothly cross-fades between elemental typing energy and the commemorative art. Lucky Pokémon alternate between gold shimmers and the card; Shadow Pokémon render their ominous violet mist directly over the card!\n\n2. Mandatory Special Trade:\nCAUTION! Any Pokémon possessing a Location Card or Special Background is hard-coded as a Special Trade! Even trading a regular wild Eevee from City Safari that is already registered in the recipient's Pokédex consumes your daily Special Trade slot!\n\n3. 100% Preservation Across Trades:\nBackgrounds are permanently retained upon trading. The recipient receives the Pokémon with its Location Card or Special Background 100% intact.\n\n4. Evolutionary Inheritance:\nEvolving a Pokémon preserves its background unconditionally (e.g., an Amsterdam Explorer Eevee evolved into Umbreon retains Amsterdam canals; a National Trust Treecko keeps its historic estate card upon evolving into Sceptile).\n\n5. ⚠️ PERMANENT DELETION IN POKÉMON HOME:\nTransferring any Pokémon with a commemorative card into Pokémon HOME permanently and irreversibly ERASES the background forever! Pokémon HOME completely lacks support for GO background layers.",
          ja: "背景システムのゲーム内動作と重要ルール：\n\n1. クロスフェード表示アニメーション：\nポケモンのタイプ背景（炎や水のエフェクト）を完全に消し去るのではなく、タイプ背景と記念背景が一定間隔で滑らかに交互表示（クロスフェード）されます。キラポケモンの場合は金色に輝くエフェクトと記念背景が交互に現れ、シャドウポケモンの場合は紫色の禍々しいオーラが記念背景の上にオーバーレイ描画されます！\n\n2. 確定「特別な交換（Special Trade）」扱い：\n【要注意】ロケーションカードやスペシャル背景を持つポケモンは、ゲーム内で例外なく「特別な交換」に指定されています！仮に図鑑登録済みのイーブイであっても、都市限定背景が付いている個体をトレードすると1日の「特別な交換」枠を1回分消費します。\n\n3. トレード時の背景100%引き継ぎ：\nフレンドと交換しても背景が消えることは絶対にありません。受け取った側もそのままの背景を永久に保持できます。\n\n4. 進化しても背景は維持：\n進化させても背景は引き継がれます（例：バルセロナ背景のイーブイをシャワーズに進化させてもバルセロナ背景のまま残ります）。\n\n5. ⚠️ Pokémon HOME転送による完全消滅警告：\nロケーションカードやスペシャル背景を持つポケモンを『Pokémon HOME』に送ると、背景データは永久に削除され二度と復活しません！HOMEにはGOの背景を表示する仕組みが存在しないためです。",
          ru: "Правила работы фонов в игре:\n\n1. Плавная кросс-фейд анимация:\nФоны плавно сменяют стандартную анимацию стихийного типа покемона. У Lucky-покемонов золотое сияние чередуется с фоном; у Shadow-покемонов темная аура накладывается прямо поверх уникального фона!\n\n2. Обязательный Special Trade:\nВНИМАНИЕ! Любой покемон с карточкой локации или специальным фоном считается специальным обменом (Special Trade)! Даже обычный Eevee с City Safari заберет ваш дневной лимит Special Trade!\n\n3. 100% сохранение при обмене:\nФон никогда не стирается при обмене с друзьями. Получатель видит оригинальный фон во всей красе.\n\n4. Сохранение при эволюции:\nЭволюция сохраняет фон на 100% (например, Eevee из Барселоны после эволюции в Vaporeon сохраняет Sagrada Família).\n\n5. ⚠️ УДАЛЕНИЕ В POKÉMON HOME:\nПеревод покемона с карточкой локации в Pokémon HOME НАВСЕГДА УДАЛЯЕТ ФОН! В Pokémon HOME нет поддержки этих фонов."
        },
        tips: {
          cs: [
            "Před potvrzením výměny si ověřte filtry — hra na potvrzovací obrazovce trejdu nezobrazuje náhled pozadí!",
            "Evolucí nikdy o pozadí nepřijdete, takže můžete své chycené kousky bez obav posouvat na finální formy."
          ],
          en: [
            "Verify backgrounds before confirming trades — the trade confirmation window does not show a background preview badge!",
            "Evolutions never strip backgrounds, so feel free to evolve your event trophies."
          ],
          ja: [
            "トレード確認画面では背景のプレビューが分かりにくいため、事前に「locationbackground」で絞り込んで誤トレードを防ぎましょう。",
            "進化させても背景は消失しないため、安心して最終進化形まで育てることができます。"
          ],
          ru: [
            "Проверяйте фоны перед подтверждением обмена через поисковый фильтр!",
            "Эволюция безопасна — фон никуда не денется."
          ]
        },
        pokemon: ["Eevee", "Dialga-Origin", "Palkia-Origin"]
      },
      {
      "id": "in-person-city-cards-catalog",
      "heading": {
            "cs": "3. Kompletní přehled In-Person Lokačních karet (2023–2026)",
            "en": "3. In-Person City Location Cards Master Catalog (2023–2026)",
            "ja": "3. リアルイベント都市限定ロケーションカード全集（2023〜2026）",
            "ru": "3. Полный каталог карточек локаций с живых событий (2023–2026)"
      },
      "content": {
            "cs": "Kompletní historická kronika všech 35 fyzických lokačních karet měst a památek v Pokémon GO od jejich vzniku v roce 2023 až po rok 2026. Lokační karty reprezentují unikátní suvenýr z reálných cest a fyzických setkání komunity.\n\n🚨 PRAVIDLO ZÍSKÁNÍ: Lokační karty z raidů padají POUZE při osobní přítomnosti u tělocvičny na místě konání (~20–33 % šance). Remote Raid Passy tyto karty nikdy neudělují! Naopak z Timed Research úkolů bývají zaručeny na 100 %.\n\n### 2023: Zrod mechaniky a první lokační karty\n\n![Las Vegas (GO Tour Hoenn 2023) — Sunset Park, Las Vegas, USA (2023)](https://static.wikia.nocookie.net/pokemongo/images/9/9d/Location_Card_Las_Vegas.png/revision/latest)\n• **Las Vegas (GO Tour Hoenn 2023)** (Pokémon GO Tour: Hoenn – Las Vegas (Únor 2023))\n  - Místo: Sunset Park, Las Vegas, USA\n  - Vizuální motiv: Silueta Las Vegas Strip, kasinové neony a pouštní kaňon Red Rock\n  - Pokémoni: Kyogre-Primal, Groudon-Primal\n\n![Londýn (GO Fest 2023) — Brockwell Park, Londýn, Velká Británie (2023)](https://static.wikia.nocookie.net/pokemongo/images/7/77/Location_Card_London.png/revision/latest)\n• **Londýn (GO Fest 2023)** (Pokémon GO Fest 2023: London (Srpen 2023))\n  - Místo: Brockwell Park, Londýn, Velká Británie\n  - Vizuální motiv: Zelené louky Brockwell Parku, řeka Temže, Big Ben a most Tower Bridge\n  - Pokémoni: Rayquaza-Mega, Xerneas, Yveltal, Cresselia\n\n![Ósaka (GO Fest 2023) — Expo '70 Commemorative Park, Ósaka, Japonsko (2023)](https://static.wikia.nocookie.net/pokemongo/images/6/68/Location_Card_Osaka.png/revision/latest)\n• **Ósaka (GO Fest 2023)** (Pokémon GO Fest 2023: Osaka (Srpen 2023))\n  - Místo: Expo '70 Commemorative Park, Ósaka, Japonsko\n  - Vizuální motiv: Ikonická Věž slunce (Tower of the Sun) a moderní panorama Ósaky\n  - Pokémoni: Rayquaza-Mega, Xerneas, Yveltal, Cresselia\n\n![New York City (GO Fest 2023) — Randall's Island Park, New York, USA (2023)](https://static.wikia.nocookie.net/pokemongo/images/a/a8/Location_Card_NYC.png/revision/latest)\n• **New York City (GO Fest 2023)** (Pokémon GO Fest 2023: New York City (Srpen 2023))\n  - Místo: Randall's Island Park, New York, USA\n  - Vizuální motiv: Most Triborough Bridge, Art Deco panorama Manhattanu a řeka East River\n  - Pokémoni: Rayquaza-Mega, Xerneas, Yveltal, Cresselia\n\n![Barcelona (City Safari 2023) — Barcelona, Katalánsko, Španělsko (2023)](https://static.wikia.nocookie.net/pokemongo/images/7/72/Location_Card_Barcelona.png/revision/latest)\n• **Barcelona (City Safari 2023)** (Pokémon GO City Safari: Barcelona (Říjen 2023))\n  - Místo: Barcelona, Katalánsko, Španělsko\n  - Vizuální motiv: Věže chrámu Sagrada Família, mozaiky parku Güell a Středozemní moře\n  - Pokémoni: Eevee, Skiddo\n\n![Soul (City Safari 2023) — Soul, Jižní Korea (2023)](https://static.wikia.nocookie.net/pokemongo/images/5/52/Location_Card_Seoul.png/revision/latest)\n• **Soul (City Safari 2023)** (Pokémon GO City Safari: Seoul (Říjen 2023))\n  - Místo: Soul, Jižní Korea\n  - Vizuální motiv: Televizní věž N Seoul Tower, mosty přes řeku Han a tradiční palác Hanok\n  - Pokémoni: Eevee, Skiddo\n\n![Ciudad de México (City Safari 2023) — Ciudad de México, Mexiko (2023)](https://static.wikia.nocookie.net/pokemongo/images/c/c8/Location_Card_Mexico_City.png/revision/latest)\n• **Ciudad de México (City Safari 2023)** (Pokémon GO City Safari: Mexico City (Listopad 2023))\n  - Místo: Ciudad de México, Mexiko\n  - Vizuální motiv: Zlatý Anděl nezávislosti (Ángel de la Independencia) a kvetoucí žakarandy\n  - Pokémoni: Eevee, Skiddo\n\n![Ostrov Čedžu (Air Adventures 2023) — Ostrov Čedžu, Jižní Korea (2023)](https://static.wikia.nocookie.net/pokemongo/images/7/7c/Location_Card_Jeju.png/revision/latest)\n• **Ostrov Čedžu (Air Adventures 2023)** (Pokémon Air Adventures: Jeju (Červenec 2023))\n  - Místo: Ostrov Čedžu, Jižní Korea\n  - Vizuální motiv: Sopka Hallasan, kamenné sochy Dol hareubang a pobřeží ostrova Čedžu\n  - Pokémoni: Latios-Mega, Latias-Mega, Pikachu\n\n### 2024: Celosvětová expanze, Ultra Beasty a WCS\n\n![Los Angeles (GO Tour Sinnoh 2024) — Rose Bowl Stadium, Pasadena / LA, USA (2024)](https://static.wikia.nocookie.net/pokemongo/images/1/15/Location_Card_Los_Angeles.png/revision/latest)\n• **Los Angeles (GO Tour Sinnoh 2024)** (Pokémon GO Tour: Sinnoh – Los Angeles (Únor 2024))\n  - Místo: Rose Bowl Stadium, Pasadena / LA, USA\n  - Vizuální motiv: Slavný stadion Rose Bowl, kalifornské palmy a pohoří San Gabriel\n  - Pokémoni: Dialga-Origin, Palkia-Origin\n\n![Bali (Air Adventures Indonesia 2024) — Denpasar & Nusa Dua, Bali, Indonésie (2024)](https://static.wikia.nocookie.net/pokemongo/images/a/a3/Location_Card_Bali.png/revision/latest)\n• **Bali (Air Adventures Indonesia 2024)** (Pikachu's Indonesia Journey: Bali (Březen 2024))\n  - Místo: Denpasar & Nusa Dua, Bali, Indonésie\n  - Vizuální motiv: Tradiční balijská brána Candi Bentar, tropické pobřeží a sopka Gunung Agung\n  - Pokémoni: Latios-Mega, Latias-Mega\n\n![Sendai (GO Fest 2024) — Nanakita Park & Sendai, Miyagi, Japonsko (2024)](https://static.wikia.nocookie.net/pokemongo/images/6/6d/Location_Card_Sendai.png/revision/latest)\n• **Sendai (GO Fest 2024)** (Pokémon GO Fest 2024: Sendai (Květen–Červen 2024))\n  - Místo: Nanakita Park & Sendai, Miyagi, Japonsko\n  - Vizuální motiv: Zeleň parku Nanakita, jezdecká socha Date Masamuneho na hradě Aoba a fábory Tanabaty\n  - Pokémoni: Necrozma, Xurkitree, Nihilego, Kartana, Guzzlord, Stakataka, Solgaleo, Lunala\n\n![Madrid (GO Fest 2024) — Parque Juan Carlos I, Madrid, Španělsko (2024)](https://static.wikia.nocookie.net/pokemongo/images/e/e4/Location_Card_Madrid.png/revision/latest)\n• **Madrid (GO Fest 2024)** (Pokémon GO Fest 2024: Madrid (Červen 2024))\n  - Místo: Parque Juan Carlos I, Madrid, Španělsko\n  - Vizuální motiv: Neoklasicistní brána Puerta de Alcalá, fontána Cibeles a Křišťálový palác\n  - Pokémoni: Necrozma, Pheromosa, Nihilego, Kartana, Guzzlord\n\n![New York City (GO Fest 2024) — Randall's Island Park, New York, NY, USA (2024)](https://static.wikia.nocookie.net/pokemongo/images/0/05/Location_Card_NYC_2024.png/revision/latest)\n• **New York City (GO Fest 2024)** (Pokémon GO Fest 2024: New York City (Červenec 2024))\n  - Místo: Randall's Island Park, New York, NY, USA\n  - Vizuální motiv: Mrakodrap Empire State Building, Chrysler Building a panorama Manhattanu\n  - Pokémoni: Necrozma, Buzzwole, Nihilego, Kartana, Guzzlord\n\n![Honolulu (WCS 2024 Scubachu) — Hawaii Convention Center, Honolulu, USA (2024)](https://static.wikia.nocookie.net/pokemongo/images/6/6f/Location_Card_Honolulu.png/revision/latest)\n• **Honolulu (WCS 2024 Scubachu)** (Pokémon World Championships 2024 Honolulu (Srpen 2024))\n  - Místo: Hawaii Convention Center, Honolulu, USA\n  - Vizuální motiv: Sopečný kráter Diamond Head, pláž Waikiki s vlnami Pacifiku a květy ibišku\n  - Pokémoni: Pikachu\n\n![Fukuoka (Wild Area 2024) — Maizuru Park, Fukuoka, Japonsko (2024)](https://static.wikia.nocookie.net/pokemongo/images/2/23/Location_Card_Fukuoka.png/revision/latest)\n• **Fukuoka (Wild Area 2024)** (Pokémon GO Wild Area: Fukuoka (Listopad 2024))\n  - Místo: Maizuru Park, Fukuoka, Japonsko\n  - Vizuální motiv: Věž Fukuoka Tower, záliv Hakata a zářící elektrické blesky\n  - Pokémoni: Toxtricity, Dialga-Origin, Palkia-Origin\n\n![São Paulo (City Safari 2024) — São Paulo, Brazílie (2024)](https://static.wikia.nocookie.net/pokemongo/images/f/f6/Location_Card_Sao_Paulo.png/revision/latest)\n• **São Paulo (City Safari 2024)** (Pokémon GO City Safari: São Paulo (Prosinec 2024))\n  - Místo: São Paulo, Brazílie\n  - Vizuální motiv: Zavěšený most Octávio Frias de Oliveira, park Ibirapuera a brazilské street art\n  - Pokémoni: Eevee, Skiddo\n\n![Tchaj-nan (City Safari 2024) — Tchaj-nan, Tchaj-wan (2024)](https://static.wikia.nocookie.net/pokemongo/images/7/74/Location_Card_Tainan.png/revision/latest)\n• **Tchaj-nan (City Safari 2024)** (Pokémon GO City Safari: Tainan (Březen 2024))\n  - Místo: Tchaj-nan, Tchaj-wan\n  - Vizuální motiv: Historická pevnost Chihkan Tower, Konfuciův chrám a tradiční lampionové uličky\n  - Pokémoni: Eevee, Skiddo\n\n![Surabaja (Air Adventures Indonesia 2024) — Surabaja, Východní Jáva, Indonésie (2024)](https://static.wikia.nocookie.net/pokemongo/images/3/39/Location_Card_Surabaya.png/revision/latest)\n• **Surabaja (Air Adventures Indonesia 2024)** (Pikachu's Indonesia Journey: Surabaya (Květen 2024))\n  - Místo: Surabaja, Východní Jáva, Indonésie\n  - Vizuální motiv: Ikonický památník Suroboyo (žralok a krokodýl) a visutý most Suramadu\n  - Pokémoni: Latios-Mega, Latias-Mega\n\n![Yogyakarta (Air Adventures Indonesia 2024) — Yogyakarta, Jáva, Indonésie (2024)](https://static.wikia.nocookie.net/pokemongo/images/f/f6/Location_Card_Yogyakarta.png/revision/latest)\n• **Yogyakarta (Air Adventures Indonesia 2024)** (Pikachu's Indonesia Journey: Yogyakarta (Srpen 2024))\n  - Místo: Yogyakarta, Jáva, Indonésie\n  - Vizuální motiv: Chrámové věže Prambananu, sopka Merapi a tradiční batikový vzor\n  - Pokémoni: Latios-Mega, Latias-Mega\n\n![Jakarta (City Safari & Air Adventures 2024) — Jakarta, Indonésie (2024)](https://static.wikia.nocookie.net/pokemongo/images/c/c5/Location_Card_Jakarta.png/revision/latest)\n• **Jakarta (City Safari & Air Adventures 2024)** (Pokémon GO City Safari: Jakarta (Září 2024))\n  - Místo: Jakarta, Indonésie\n  - Vizuální motiv: Národní památník Monas se zlatým plamenem a kruhové náměstí Bundaran HI\n  - Pokémoni: Eevee, Skiddo, Latios-Mega, Latias-Mega\n\n![Inčchon (City Safari 2024) — Songdo Central Park, Inčchon, Jižní Korea (2024)](https://static.wikia.nocookie.net/pokemongo/images/a/ab/Location_Card_Incheon.png/revision/latest)\n• **Inčchon (City Safari 2024)** (Pokémon GO City Safari: Incheon (Září 2024))\n  - Místo: Songdo Central Park, Inčchon, Jižní Korea\n  - Vizuální motiv: Futuristické mrakodrapy v Songdo, vodní kanál a most Incheon Grand Bridge\n  - Pokémoni: Eevee, Skiddo, Pikachu\n\n### 2025: Unova, královský Galar a Světové Expo\n\n![Nová Tchaj-pej (GO Tour Unova 2025) — New Taipei Metropolitan Park, Tchaj-wan (2025)](https://static.wikia.nocookie.net/pokemongo/images/7/73/Location_Background_New_Taipei_City.png/revision/latest)\n• **Nová Tchaj-pej (GO Tour Unova 2025)** (Pokémon GO Tour: Unova – New Taipei City (Únor 2025))\n  - Místo: New Taipei Metropolitan Park, Tchaj-wan\n  - Vizuální motiv: Zavěšený most Danhai Light Rail, řeka Tamsui a pohoří Guanyinshan\n  - Pokémoni: Reshiram, Zekrom, Kyurem\n\n![Los Angeles (GO Tour Unova 2025) — Rose Bowl Stadium & Downtown LA, CA, USA (2025)](https://static.wikia.nocookie.net/pokemongo/images/5/54/Location_Background_Los_Angeles.png/revision/latest)\n• **Los Angeles (GO Tour Unova 2025)** (Pokémon GO Tour: Unova – Los Angeles (Únor 2025))\n  - Místo: Rose Bowl Stadium & Downtown LA, CA, USA\n  - Vizuální motiv: Moderní mrakodrapy Downtown LA a silueta stadionu Rose Bowl\n  - Pokémoni: Reshiram, Zekrom, Kyurem\n\n![Singapur (City Safari 2025) — Singapur (Marina Bay & Gardens by the Bay) (2025)](https://static.wikia.nocookie.net/pokemongo/images/b/be/Location_Background_Singapore.png/revision/latest)\n• **Singapur (City Safari 2025)** (Pokémon GO City Safari: Singapore (Březen 2025))\n  - Místo: Singapur (Marina Bay & Gardens by the Bay)\n  - Vizuální motiv: Futuristické Superstromy v Gardens by the Bay, hotel Marina Bay Sands a socha Merliona\n  - Pokémoni: Eevee, Skiddo\n\n![Milán (City Safari 2025) — Milán, Lombardie, Itálie (2025)](https://static.wikia.nocookie.net/pokemongo/images/5/5e/Location_Background_Milan.png/revision/latest)\n• **Milán (City Safari 2025)** (Pokémon GO City Safari: Milan (Březen 2025))\n  - Místo: Milán, Lombardie, Itálie\n  - Vizuální motiv: Gotická katedrála Duomo di Milano, pasáž Galleria Vittorio Emanuele II a hrad Sforzesco\n  - Pokémoni: Eevee, Skiddo\n\n![Bombaj / Mumbai (City Safari 2025) — Bombaj (Mumbai), Maháráštra, Indie (2025)](https://static.wikia.nocookie.net/pokemongo/images/0/0e/Location_Background_Mumbai.png/revision/latest)\n• **Bombaj / Mumbai (City Safari 2025)** (Pokémon GO City Safari: Mumbai (Březen 2025))\n  - Místo: Bombaj (Mumbai), Maháráštra, Indie\n  - Vizuální motiv: Monumentální Brána Indie (Gateway of India) a panorama nábřeží Marine Drive\n  - Pokémoni: Eevee, Skiddo\n\n![Pusan Ohňostroj (Busan Fireworks) — Gwangalli Beach, Pusan, Jižní Korea (2025)](https://static.wikia.nocookie.net/pokemongo/images/a/ac/Location_Background_Busan_Fireworks_Festival_2025.png/revision/latest)\n• **Pusan Ohňostroj (Busan Fireworks)** (Busan Fireworks Festival 2025 (Podzim 2025))\n  - Místo: Gwangalli Beach, Pusan, Jižní Korea\n  - Vizuální motiv: Zářící visutý most Gwangan Bridge ozářený obrovským barevným ohňostrojem nad mořem\n  - Pokémoni: Pikachu\n\n![Ósaka (GO Fest 2025: Zacian & Zamazenta) — Ósaka, Japonsko (Umeda & Dotonbori) (2025)](https://static.wikia.nocookie.net/pokemongo/images/3/30/Location_Background_Osaka_2025.png/revision/latest)\n• **Ósaka (GO Fest 2025: Zacian & Zamazenta)** (Pokémon GO Fest 2025: Osaka (Léto 2025))\n  - Místo: Ósaka, Japonsko (Umeda & Dotonbori)\n  - Vizuální motiv: Mrakodrap Umeda Sky Building, kanál Dotonbori a neonové odlesky noční Ósaky\n  - Pokémoni: Zacian, Zamazenta\n\n![Jersey City (GO Fest 2025: Zacian & Zamazenta) — Liberty State Park, Jersey City, NJ, USA (2025)](https://static.wikia.nocookie.net/pokemongo/images/c/c3/Location_Background_Jersey_City_2025.png/revision/latest)\n• **Jersey City (GO Fest 2025: Zacian & Zamazenta)** (Pokémon GO Fest 2025: Jersey City (Léto 2025))\n  - Místo: Liberty State Park, Jersey City, NJ, USA\n  - Vizuální motiv: Silueta Sochy Svobody, řeka Hudson a panorama Lower Manhattanu z Liberty Parku\n  - Pokémoni: Zacian, Zamazenta\n\n![Paříž (GO Fest 2025: Zacian & Zamazenta) — Champ de Mars, Paříž, Francie (2025)](https://static.wikia.nocookie.net/pokemongo/images/1/1a/Location_Background_Paris_2025.png/revision/latest)\n• **Paříž (GO Fest 2025: Zacian & Zamazenta)** (Pokémon GO Fest 2025: Paris (Léto 2025))\n  - Místo: Champ de Mars, Paříž, Francie\n  - Vizuální motiv: Kovová konstrukce Eiffelovy věže, nábřeží řeky Seiny a historické lucerny Paříže\n  - Pokémoni: Zacian, Zamazenta\n\n### 2026: Éra partnerství, olympijské památky a Mega Mewtwo\n\n![Kodaň (GO Fest 2026 & LEGO) — Kodaň, Dánsko (Nyhavn & Tivoli) (2026)](https://static.wikia.nocookie.net/pokemongo/images/9/91/Location_Background_Copenhagen_2026.png/revision/latest)\n• **Kodaň (GO Fest 2026 & LEGO)** (Pokémon GO Fest 2026: Copenhagen (Červen 2026))\n  - Místo: Kodaň, Dánsko (Nyhavn & Tivoli)\n  - Vizuální motiv: Barevné štíty domů v přístavu Nyhavn, dřevěné plachetnice a socha Malé mořské víly\n  - Pokémoni: Mewtwo, Pikachu\n\n![National Trust UK (Britské Historické Památky) — 27 historických panství a klášterů ve Velké Británii (2026)](https://static.wikia.nocookie.net/pokemongo/images/0/07/Location_Background_National_Trust_Fountains_Abbey.png/revision/latest)\n• **National Trust UK (Britské Historické Památky)** (Partnerství Pokémon GO & National Trust UK (2026))\n  - Místo: 27 historických panství a klášterů ve Velké Británii\n  - Vizuální motiv: Historické kamenné zříceniny opatství Fountains Abbey, paláce Cliveden a lesní zahrady Gibside\n  - Pokémoni: Treecko, Grovyle, Sceptile\n\n![Pokémon Center Obchody (Japonská Síť) — 16 oficiálních obchodů (Tokyo Mega, Shibuya, Kyoto, Osaka atd.) (2026)](https://static.wikia.nocookie.net/pokemongo/images/4/48/Location_Background_PokemonCenter_MegaTokyo.png/revision/latest)\n• **Pokémon Center Obchody (Japonská Síť)** (Prezenční návštěva Pokémon Center prodejen v Japonsku)\n  - Místo: 16 oficiálních obchodů (Tokyo Mega, Shibuya, Kyoto, Osaka atd.)\n  - Vizuální motiv: Moderní technologické interiéry Pokémon Center s futuristickými sochami a logem\n  - Pokémoni: Pikachu\n\n![LEGO Collaboration (LEGO Kostky) — Kodaň a vybrané LEGO Store prodejny (2026)](https://static.wikia.nocookie.net/pokemongo/images/7/70/Special_Background_LEGO.png/revision/latest)\n• **LEGO Collaboration (LEGO Kostky)** (GO Fest Copenhagen & LEGO Stores Global (Léto 2026))\n  - Místo: Kodaň a vybrané LEGO Store prodejny\n  - Vizuální motiv: Stylové barevné LEGO kostky tvořící Pokéball a slavnou architekturu\n  - Pokémoni: Pikachu\n\n![Pchjongčchang (Zimní Festival 2026) — Pchjongčchang, Gangwon, Jižní Korea (2026)](https://static.wikia.nocookie.net/pokemongo/images/0/01/Location_Background_Pyeongchang_Winter_Festival.png/revision/latest)\n• **Pchjongčchang (Zimní Festival 2026)** (Pyeongchang Winter Festival 2026 (Leden 2026))\n  - Místo: Pchjongčchang, Gangwon, Jižní Korea\n  - Vizuální motiv: Zasněžené olympijské sjezdovky v pohoří Taebaek, ledové sochy a mrazivé borovice\n  - Pokémoni: Pikachu, Deerling",
            "en": "Complete chronological master catalog of all 35 in-person city and landmark location cards in Pokémon GO from their inception in 2023 through 2026. Location cards serve as prestigious digital souvenirs of real-world travel and community gatherings.\n\n🚨 ACQUISITION RULE: Raid location cards drop EXCLUSIVELY via in-person gym participation on-site (~20–33% chance). Remote Raid Passes NEVER drop location cards! However, on-site Timed Research tasks guarantee them at 100%.\n\n### 2023: The Debut Era — First City Cards\n\n![Las Vegas (GO Tour Hoenn 2023) — Sunset Park, Las Vegas, NV, USA (2023)](https://static.wikia.nocookie.net/pokemongo/images/9/9d/Location_Card_Las_Vegas.png/revision/latest)\n• **Las Vegas (GO Tour Hoenn 2023)** (Pokémon GO Tour: Hoenn – Las Vegas (February 2023))\n  - Location: Sunset Park, Las Vegas, NV, USA\n  - Artwork: Las Vegas Strip skyline with casino neon silhouettes and Red Rock Canyon\n  - Featured Pokémon: Kyogre-Primal, Groudon-Primal\n\n![London (GO Fest 2023) — Brockwell Park, London, UK (2023)](https://static.wikia.nocookie.net/pokemongo/images/7/77/Location_Card_London.png/revision/latest)\n• **London (GO Fest 2023)** (Pokémon GO Fest 2023: London (August 2023))\n  - Location: Brockwell Park, London, UK\n  - Artwork: Brockwell Park greenery, River Thames, Big Ben clocktower, and Tower Bridge\n  - Featured Pokémon: Rayquaza-Mega, Xerneas, Yveltal, Cresselia\n\n![Osaka (GO Fest 2023) — Expo '70 Park, Osaka, Japan (2023)](https://static.wikia.nocookie.net/pokemongo/images/6/68/Location_Card_Osaka.png/revision/latest)\n• **Osaka (GO Fest 2023)** (Pokémon GO Fest 2023: Osaka (August 2023))\n  - Location: Expo '70 Park, Osaka, Japan\n  - Artwork: Historic Expo '70 Tower of the Sun monument with modern Osaka city skyline\n  - Featured Pokémon: Rayquaza-Mega, Xerneas, Yveltal, Cresselia\n\n![New York City (GO Fest 2023) — Randall's Island Park, New York, NY, USA (2023)](https://static.wikia.nocookie.net/pokemongo/images/a/a8/Location_Card_NYC.png/revision/latest)\n• **New York City (GO Fest 2023)** (Pokémon GO Fest 2023: NYC (August 2023))\n  - Location: Randall's Island Park, New York, NY, USA\n  - Artwork: Randall's Island waterfront, suspension bridges, and Art Deco Manhattan high-rises\n  - Featured Pokémon: Rayquaza-Mega, Xerneas, Yveltal, Cresselia\n\n![Barcelona (City Safari 2023) — Barcelona, Catalonia, Spain (2023)](https://static.wikia.nocookie.net/pokemongo/images/7/72/Location_Card_Barcelona.png/revision/latest)\n• **Barcelona (City Safari 2023)** (Pokémon GO City Safari: Barcelona (Oct 2023))\n  - Location: Barcelona, Catalonia, Spain\n  - Artwork: Sagrada Família spires, Park Güell mosaic styling, and Mediterranean coastline\n  - Featured Pokémon: Eevee, Skiddo\n\n![Seoul (City Safari 2023) — Seoul, South Korea (2023)](https://static.wikia.nocookie.net/pokemongo/images/5/52/Location_Card_Seoul.png/revision/latest)\n• **Seoul (City Safari 2023)** (Pokémon GO City Safari: Seoul (Oct 2023))\n  - Location: Seoul, South Korea\n  - Artwork: N Seoul Tower, Han River suspension bridges, and traditional Hanok palace roofs\n  - Featured Pokémon: Eevee, Skiddo\n\n![Mexico City (City Safari 2023) — Mexico City, Mexico (2023)](https://static.wikia.nocookie.net/pokemongo/images/c/c8/Location_Card_Mexico_City.png/revision/latest)\n• **Mexico City (City Safari 2023)** (Pokémon GO City Safari: Mexico City (Nov 2023))\n  - Location: Mexico City, Mexico\n  - Artwork: Angel of Independence monument, Paseo de la Reforma, and blooming Jacarandas\n  - Featured Pokémon: Eevee, Skiddo\n\n![Jeju Island (Air Adventures 2023) — Jeju Island, South Korea (2023)](https://static.wikia.nocookie.net/pokemongo/images/7/7c/Location_Card_Jeju.png/revision/latest)\n• **Jeju Island (Air Adventures 2023)** (Pokémon Air Adventures: Jeju (July 2023))\n  - Location: Jeju Island, South Korea\n  - Artwork: Mount Hallasan volcano, iconic Dol hareubang stone statues, and basalt coastlines\n  - Featured Pokémon: Latios-Mega, Latias-Mega, Pikachu\n\n### 2024: Global Proliferation, Ultra Beasts & WCS\n\n![Los Angeles (GO Tour Sinnoh 2024) — Rose Bowl Stadium, Pasadena, CA, USA (2024)](https://static.wikia.nocookie.net/pokemongo/images/1/15/Location_Card_Los_Angeles.png/revision/latest)\n• **Los Angeles (GO Tour Sinnoh 2024)** (Pokémon GO Tour: Sinnoh – Los Angeles (February 2024))\n  - Location: Rose Bowl Stadium, Pasadena, CA, USA\n  - Artwork: Historic Rose Bowl stadium arches, California palm trees, and San Gabriel Mountains\n  - Featured Pokémon: Dialga-Origin, Palkia-Origin\n\n![Bali (Pikachu's Indonesia Journey) — Denpasar & Nusa Dua, Bali, Indonesia (2024)](https://static.wikia.nocookie.net/pokemongo/images/a/a3/Location_Card_Bali.png/revision/latest)\n• **Bali (Pikachu's Indonesia Journey)** (Pikachu's Indonesia Journey: Bali (March 2024))\n  - Location: Denpasar & Nusa Dua, Bali, Indonesia\n  - Artwork: Balinese Candi Bentar split gates, tropical turquoise waters, and Mount Agung silhouette\n  - Featured Pokémon: Latios-Mega, Latias-Mega\n\n![Sendai (GO Fest 2024) — Nanakita Park & Sendai, Miyagi, Japan (2024)](https://static.wikia.nocookie.net/pokemongo/images/6/6d/Location_Card_Sendai.png/revision/latest)\n• **Sendai (GO Fest 2024)** (Pokémon GO Fest 2024: Sendai (May–June 2024))\n  - Location: Nanakita Park & Sendai, Miyagi, Japan\n  - Artwork: Nanakita Park foliage, Aoba Castle equestrian statue of Date Masamune, and Tanabata streamers\n  - Featured Pokémon: Necrozma, Xurkitree, Nihilego, Kartana, Guzzlord, Stakataka, Solgaleo, Lunala\n\n![Madrid (GO Fest 2024) — Parque Juan Carlos I, Madrid, Spain (2024)](https://static.wikia.nocookie.net/pokemongo/images/e/e4/Location_Card_Madrid.png/revision/latest)\n• **Madrid (GO Fest 2024)** (Pokémon GO Fest 2024: Madrid (June 2024))\n  - Location: Parque Juan Carlos I, Madrid, Spain\n  - Artwork: Neoclassical Puerta de Alcalá monument, Cibeles fountain, and Parque Juan Carlos I vistas\n  - Featured Pokémon: Necrozma, Pheromosa, Nihilego, Kartana, Guzzlord\n\n![New York City (GO Fest 2024) — Randall's Island Park, New York, NY, USA (2024)](https://static.wikia.nocookie.net/pokemongo/images/0/05/Location_Card_NYC_2024.png/revision/latest)\n• **New York City (GO Fest 2024)** (Pokémon GO Fest 2024: NYC (July 2024))\n  - Location: Randall's Island Park, New York, NY, USA\n  - Artwork: Empire State Building spire, Chrysler Building, and Manhattan waterfront skyline\n  - Featured Pokémon: Necrozma, Buzzwole, Nihilego, Kartana, Guzzlord\n\n![Honolulu (WCS 2024) — Hawaii Convention Center, Honolulu, HI, USA (2024)](https://static.wikia.nocookie.net/pokemongo/images/6/6f/Location_Card_Honolulu.png/revision/latest)\n• **Honolulu (WCS 2024)** (2024 Pokémon World Championships (August 2024))\n  - Location: Hawaii Convention Center, Honolulu, HI, USA\n  - Artwork: Diamond Head volcanic crater, Waikiki Pacific surf, and vibrant Hawaiian Hibiscus flowers\n  - Featured Pokémon: Pikachu\n\n![Fukuoka (Wild Area 2024) — Maizuru Park, Fukuoka, Japan (2024)](https://static.wikia.nocookie.net/pokemongo/images/2/23/Location_Card_Fukuoka.png/revision/latest)\n• **Fukuoka (Wild Area 2024)** (Pokémon GO Wild Area: Fukuoka (November 2024))\n  - Location: Maizuru Park, Fukuoka, Japan\n  - Artwork: Fukuoka Tower, Hakata Bay coastline, and electric punk lightning\n  - Featured Pokémon: Toxtricity, Dialga-Origin, Palkia-Origin\n\n![São Paulo (City Safari 2024) — São Paulo, Brazil (2024)](https://static.wikia.nocookie.net/pokemongo/images/f/f6/Location_Card_Sao_Paulo.png/revision/latest)\n• **São Paulo (City Safari 2024)** (Pokémon GO City Safari: São Paulo (December 2024))\n  - Location: São Paulo, Brazil\n  - Artwork: Octávio Frias de Oliveira cable-stayed bridge, Ibirapuera Park, and Paulistano street art\n  - Featured Pokémon: Eevee, Skiddo\n\n![Tainan (City Safari 2024) — Tainan, Taiwan (2024)](https://static.wikia.nocookie.net/pokemongo/images/7/74/Location_Card_Tainan.png/revision/latest)\n• **Tainan (City Safari 2024)** (Pokémon GO City Safari: Tainan (March 2024))\n  - Location: Tainan, Taiwan\n  - Artwork: Chihkan Tower fortress, Confucius temple eaves, and traditional lantern-lit alleys\n  - Featured Pokémon: Eevee, Skiddo\n\n![Surabaya (Pikachu's Indonesia Journey) — Surabaya, East Java, Indonesia (2024)](https://static.wikia.nocookie.net/pokemongo/images/3/39/Location_Card_Surabaya.png/revision/latest)\n• **Surabaya (Pikachu's Indonesia Journey)** (Pikachu's Indonesia Journey: Surabaya (May 2024))\n  - Location: Surabaya, East Java, Indonesia\n  - Artwork: Iconic Suroboyo monument (Shark & Crocodile) and Suramadu suspension bridge\n  - Featured Pokémon: Latios-Mega, Latias-Mega\n\n![Yogyakarta (Pikachu's Indonesia Journey) — Yogyakarta, Java, Indonesia (2024)](https://static.wikia.nocookie.net/pokemongo/images/f/f6/Location_Card_Yogyakarta.png/revision/latest)\n• **Yogyakarta (Pikachu's Indonesia Journey)** (Pikachu's Indonesia Journey: Yogyakarta (August 2024))\n  - Location: Yogyakarta, Java, Indonesia\n  - Artwork: Prambanan Hindu temple spires, active Mount Merapi volcano, and batik filigree\n  - Featured Pokémon: Latios-Mega, Latias-Mega\n\n![Jakarta (City Safari 2024) — Jakarta, Indonesia (2024)](https://static.wikia.nocookie.net/pokemongo/images/c/c5/Location_Card_Jakarta.png/revision/latest)\n• **Jakarta (City Safari 2024)** (Pokémon GO City Safari: Jakarta (Sept 2024))\n  - Location: Jakarta, Indonesia\n  - Artwork: National Monument (Monas) obelisk topped with gold flame and Bundaran HI fountain circle\n  - Featured Pokémon: Eevee, Skiddo, Latios-Mega, Latias-Mega\n\n![Incheon (City Safari 2024) — Songdo Central Park, Incheon, South Korea (2024)](https://static.wikia.nocookie.net/pokemongo/images/a/ab/Location_Card_Incheon.png/revision/latest)\n• **Incheon (City Safari 2024)** (Pokémon GO City Safari: Incheon (Sept 2024))\n  - Location: Songdo Central Park, Incheon, South Korea\n  - Artwork: Futuristic Songdo high-rises, central canal waters, and Incheon Grand Bridge\n  - Featured Pokémon: Eevee, Skiddo, Pikachu\n\n### 2025: Unova, Royal Galar & World Expo\n\n![New Taipei City (GO Tour Unova 2025) — New Taipei Metropolitan Park, Taiwan (2025)](https://static.wikia.nocookie.net/pokemongo/images/7/73/Location_Background_New_Taipei_City.png/revision/latest)\n• **New Taipei City (GO Tour Unova 2025)** (Pokémon GO Tour: Unova – New Taipei City (Feb 2025))\n  - Location: New Taipei Metropolitan Park, Taiwan\n  - Artwork: Danhai Light Rail suspension bridge, Tamsui River waterfront, and Guanyinshan peak\n  - Featured Pokémon: Reshiram, Zekrom, Kyurem\n\n![Los Angeles (GO Tour Unova 2025) — Rose Bowl Stadium & Downtown LA, CA, USA (2025)](https://static.wikia.nocookie.net/pokemongo/images/5/54/Location_Background_Los_Angeles.png/revision/latest)\n• **Los Angeles (GO Tour Unova 2025)** (Pokémon GO Tour: Unova – Los Angeles (Feb 2025))\n  - Location: Rose Bowl Stadium & Downtown LA, CA, USA\n  - Artwork: Downtown Los Angeles skyscrapers framed by Rose Bowl Stadium arches\n  - Featured Pokémon: Reshiram, Zekrom, Kyurem\n\n![Singapore (City Safari 2025) — Singapore (Marina Bay & Gardens) (2025)](https://static.wikia.nocookie.net/pokemongo/images/b/be/Location_Background_Singapore.png/revision/latest)\n• **Singapore (City Safari 2025)** (Pokémon GO City Safari: Singapore (March 2025))\n  - Location: Singapore (Marina Bay & Gardens)\n  - Artwork: Gardens by the Bay Supertrees, Marina Bay Sands tri-towers, and Merlion fountain\n  - Featured Pokémon: Eevee, Skiddo\n\n![Milan (City Safari 2025) — Milan, Lombardy, Italy (2025)](https://static.wikia.nocookie.net/pokemongo/images/5/5e/Location_Background_Milan.png/revision/latest)\n• **Milan (City Safari 2025)** (Pokémon GO City Safari: Milan (March 2025))\n  - Location: Milan, Lombardy, Italy\n  - Artwork: Gothic spires of Duomo di Milano, Galleria Vittorio Emanuele II arches, and Sforza Castle\n  - Featured Pokémon: Eevee, Skiddo\n\n![Mumbai (City Safari 2025) — Mumbai, Maharashtra, India (2025)](https://static.wikia.nocookie.net/pokemongo/images/0/0e/Location_Background_Mumbai.png/revision/latest)\n• **Mumbai (City Safari 2025)** (Pokémon GO City Safari: Mumbai (March 2025))\n  - Location: Mumbai, Maharashtra, India\n  - Artwork: Monumental Gateway of India basalt arch and scenic Marine Drive ocean curve\n  - Featured Pokémon: Eevee, Skiddo\n\n![Busan Fireworks Festival — Gwangalli Beach, Busan, South Korea (2025)](https://static.wikia.nocookie.net/pokemongo/images/a/ac/Location_Background_Busan_Fireworks_Festival_2025.png/revision/latest)\n• **Busan Fireworks Festival** (Busan Fireworks Festival 2025 (Autumn 2025))\n  - Location: Gwangalli Beach, Busan, South Korea\n  - Artwork: Illuminated Gwangan suspension bridge backlit by massive colorful fireworks over the bay\n  - Featured Pokémon: Pikachu\n\n![Osaka (GO Fest 2025) — Osaka, Japan (Umeda & Dotonbori) (2025)](https://static.wikia.nocookie.net/pokemongo/images/3/30/Location_Background_Osaka_2025.png/revision/latest)\n• **Osaka (GO Fest 2025)** (Pokémon GO Fest 2025: Osaka (Summer 2025))\n  - Location: Osaka, Japan (Umeda & Dotonbori)\n  - Artwork: Umeda Sky Building floating garden observatory, Dotonbori canal reflections, and Osaka neon\n  - Featured Pokémon: Zacian, Zamazenta\n\n![Jersey City (GO Fest 2025) — Liberty State Park, Jersey City, NJ, USA (2025)](https://static.wikia.nocookie.net/pokemongo/images/c/c3/Location_Background_Jersey_City_2025.png/revision/latest)\n• **Jersey City (GO Fest 2025)** (Pokémon GO Fest 2025: Jersey City (Summer 2025))\n  - Location: Liberty State Park, Jersey City, NJ, USA\n  - Artwork: Statue of Liberty silhouette, Hudson River, and Lower Manhattan skyline vista\n  - Featured Pokémon: Zacian, Zamazenta\n\n![Paris (GO Fest 2025) — Champ de Mars, Paris, France (2025)](https://static.wikia.nocookie.net/pokemongo/images/1/1a/Location_Background_Paris_2025.png/revision/latest)\n• **Paris (GO Fest 2025)** (Pokémon GO Fest 2025: Paris (Summer 2025))\n  - Location: Champ de Mars, Paris, France\n  - Artwork: Eiffel Tower iron lattice, Champ de Mars promenades, and Seine river embankments\n  - Featured Pokémon: Zacian, Zamazenta\n\n### 2026: Heritage Partnerships, Winter Festivals & Mega Mewtwo\n\n![Copenhagen (GO Fest 2026) — Copenhagen, Denmark (Nyhavn & Tivoli) (2026)](https://static.wikia.nocookie.net/pokemongo/images/9/91/Location_Background_Copenhagen_2026.png/revision/latest)\n• **Copenhagen (GO Fest 2026)** (Pokémon GO Fest 2026: Copenhagen (June 2026))\n  - Location: Copenhagen, Denmark (Nyhavn & Tivoli)\n  - Artwork: Iconic colorful Nyhavn waterfront gables, historic wooden ships, and Little Mermaid vista\n  - Featured Pokémon: Mewtwo, Pikachu\n\n![National Trust UK Heritage Series — 27 Historic Properties across England, Wales & N. Ireland (2026)](https://static.wikia.nocookie.net/pokemongo/images/0/07/Location_Background_National_Trust_Fountains_Abbey.png/revision/latest)\n• **National Trust UK Heritage Series** (Pokémon GO & National Trust UK Collaboration (2026))\n  - Location: 27 Historic Properties across England, Wales & N. Ireland\n  - Artwork: Architectural stone etchings of historic abbeys (Fountains Abbey), palaces (Cliveden), and estates\n  - Featured Pokémon: Treecko, Grovyle, Sceptile\n\n![Pokémon Center Japan Flagships — 16 Flagship Stores (Mega Tokyo, Shibuya, Kyoto, Osaka, Tohoku, etc.) (2026)](https://static.wikia.nocookie.net/pokemongo/images/4/48/Location_Background_PokemonCenter_MegaTokyo.png/revision/latest)\n• **Pokémon Center Japan Flagships** (In-person visits to Pokémon Center official stores)\n  - Location: 16 Flagship Stores (Mega Tokyo, Shibuya, Kyoto, Osaka, Tohoku, etc.)\n  - Artwork: Sleek futuristic Pokémon Center storefront interiors with cyber lighting and official seal\n  - Featured Pokémon: Pikachu\n\n![LEGO Collaboration (Brick World) — Copenhagen & Partner LEGO Stores Worldwide (2026)](https://static.wikia.nocookie.net/pokemongo/images/7/70/Special_Background_LEGO.png/revision/latest)\n• **LEGO Collaboration (Brick World)** (GO Fest Copenhagen & LEGO Stores (Summer 2026))\n  - Location: Copenhagen & Partner LEGO Stores Worldwide\n  - Artwork: Stylized vibrant LEGO bricks assembling a giant Pokéball and playful city monuments\n  - Featured Pokémon: Pikachu\n\n![Pyeongchang Winter Festival 2026 — Pyeongchang, Gangwon, South Korea (2026)](https://static.wikia.nocookie.net/pokemongo/images/0/01/Location_Background_Pyeongchang_Winter_Festival.png/revision/latest)\n• **Pyeongchang Winter Festival 2026** (Pyeongchang Winter Festival 2026 (January 2026))\n  - Location: Pyeongchang, Gangwon, South Korea\n  - Artwork: Snowbound Taebaek Mountain ski slopes, ice sculptures, and frosty pine forests\n  - Featured Pokémon: Pikachu, Deerling",
            "ja": "2023年の誕生から2026年最新に至るまで、『Pokémon GO』に登場した全35種類のリアルイベント都市限定ロケーションカードの完全クロニクルです。現地への旅やコミュニティの集いの名誉ある記念碑となります。\n\n🚨 ドロップ条件の重要ルール：レイドバトルでのロケーションカードは、現地ジムでの対面直接参加でのみ約20〜33%の確率でドロップします。リモートレイドパスでは絶対にドロップしません！一方、現地タイムチャレンジ報酬では100%確定で入手できます。\n\n### 2023年：新機能の誕生と初期の都市カード\n\n![ラスベガス（ホウエンツアー 2023） — アメリカ・ネバダ州ラスベガス（サンセットパーク） (2023)](https://static.wikia.nocookie.net/pokemongo/images/9/9d/Location_Card_Las_Vegas.png/revision/latest)\n• **ラスベガス（ホウエンツアー 2023）** (GO Tour ホウエン：ラスベガス（2023年2月）)\n  - 開催地: アメリカ・ネバダ州ラスベガス（サンセットパーク）\n  - 背景モチーフ: カジノのネオン輝くラスベガスのスカイラインとレッドロックキャニオン\n  - 対象ポケモン: Kyogre-Primal, Groudon-Primal\n\n![ロンドン（GO Fest 2023） — イギリス・ロンドン（ブロックウェル・パーク） (2023)](https://static.wikia.nocookie.net/pokemongo/images/7/77/Location_Card_London.png/revision/latest)\n• **ロンドン（GO Fest 2023）** (GO Fest 2023：ロンドン（2023年8月）)\n  - 開催地: イギリス・ロンドン（ブロックウェル・パーク）\n  - 背景モチーフ: ブロックウェル・パークの緑、テムズ川、ビッグベン、タワーブリッジ\n  - 対象ポケモン: Rayquaza-Mega, Xerneas, Yveltal, Cresselia\n\n![大阪（GO Fest 2023） — 日本・大阪府吹田市（万博記念公園） (2023)](https://static.wikia.nocookie.net/pokemongo/images/6/68/Location_Card_Osaka.png/revision/latest)\n• **大阪（GO Fest 2023）** (GO Fest 2023：大阪（2023年8月）)\n  - 開催地: 日本・大阪府吹田市（万博記念公園）\n  - 背景モチーフ: 万博記念公園の「太陽の塔」と大阪のスカイライン\n  - 対象ポケモン: Rayquaza-Mega, Xerneas, Yveltal, Cresselia\n\n![ニューヨーク（GO Fest 2023） — アメリカ・ニューヨーク市（ランドールズ島） (2023)](https://static.wikia.nocookie.net/pokemongo/images/a/a8/Location_Card_NYC.png/revision/latest)\n• **ニューヨーク（GO Fest 2023）** (GO Fest 2023：ニューヨーク（2023年8月）)\n  - 開催地: アメリカ・ニューヨーク市（ランドールズ島）\n  - 背景モチーフ: ランドールズ島の岸辺、マンハッタンの高層ビル群と吊り橋\n  - 対象ポケモン: Rayquaza-Mega, Xerneas, Yveltal, Cresselia\n\n![バルセロナ（シティサファリ 2023） — スペイン・バルセロナ (2023)](https://static.wikia.nocookie.net/pokemongo/images/7/72/Location_Card_Barcelona.png/revision/latest)\n• **バルセロナ（シティサファリ 2023）** (GO シティサファリ：バルセロナ（2023年10月）)\n  - 開催地: スペイン・バルセロナ\n  - 背景モチーフ: サグラダ・ファミリアの尖塔、グエル公園のモザイク、地中海\n  - 対象ポケモン: Eevee, Skiddo\n\n![ソウル（シティサファリ 2023） — 韓国・ソウル特別市 (2023)](https://static.wikia.nocookie.net/pokemongo/images/5/52/Location_Card_Seoul.png/revision/latest)\n• **ソウル（シティサファリ 2023）** (GO シティサファリ：ソウル（2023年10月）)\n  - 開催地: 韓国・ソウル特別市\n  - 背景モチーフ: Nソウルタワー、漢江（ハンガン）の橋、伝統家屋韓屋（ハノク）の屋根\n  - 対象ポケモン: Eevee, Skiddo\n\n![メキシコシティ（シティサファリ 2023） — メキシコ・メキシコシティ (2023)](https://static.wikia.nocookie.net/pokemongo/images/c/c8/Location_Card_Mexico_City.png/revision/latest)\n• **メキシコシティ（シティサファリ 2023）** (GO シティサファリ：メキシコシティ（2023年11月）)\n  - 開催地: メキシコ・メキシコシティ\n  - 背景モチーフ: 独立記念塔の黄金の天使像と満開のジャカランダの花並木\n  - 対象ポケモン: Eevee, Skiddo\n\n![済州島（そらとぶピカチュウ 2023） — 韓国・済州島 (2023)](https://static.wikia.nocookie.net/pokemongo/images/7/7c/Location_Card_Jeju.png/revision/latest)\n• **済州島（そらとぶピカチュウ 2023）** (そらとぶピカチュウ：済州島（2023年7月）)\n  - 開催地: 韓国・済州島\n  - 背景モチーフ: 漢拏山（ハルラサン）、トルハルバン石像、済州の青い玄武岩海岸\n  - 対象ポケモン: Latios-Mega, Latias-Mega, Pikachu\n\n### 2024年：世界規模の展開、ウルトラビースト＆WCS\n\n![ロサンゼルス（シンオウツアー 2024） — アメリカ・カリフォルニア州ローズボウル・スタジアム (2024)](https://static.wikia.nocookie.net/pokemongo/images/1/15/Location_Card_Los_Angeles.png/revision/latest)\n• **ロサンゼルス（シンオウツアー 2024）** (GO Tour シンオウ：ロサンゼルス（2024年2月）)\n  - 開催地: アメリカ・カリフォルニア州ローズボウル・スタジアム\n  - 背景モチーフ: ローズボウルのアーチ、カリフォルニアのヤシ並木、サンガブリエル山脈\n  - 対象ポケモン: Dialga-Origin, Palkia-Origin\n\n![バリ島（そらとぶピカチュウプロジェクト） — インドネシア・バリ島 (2024)](https://static.wikia.nocookie.net/pokemongo/images/a/a3/Location_Card_Bali.png/revision/latest)\n• **バリ島（そらとぶピカチュウプロジェクト）** (ピカチュウのインドネシアの旅：バリ島（2024年3月）)\n  - 開催地: インドネシア・バリ島\n  - 背景モチーフ: バリ島の割れ門（チャンディ・ベンタール）、南国の海、アグン山のシルエット\n  - 対象ポケモン: Latios-Mega, Latias-Mega\n\n![仙台（GO Fest 2024） — 日本・宮城県仙台市（七北田公園） (2024)](https://static.wikia.nocookie.net/pokemongo/images/6/6d/Location_Card_Sendai.png/revision/latest)\n• **仙台（GO Fest 2024）** (GO Fest 2024：仙台（2024年5〜6月）)\n  - 開催地: 日本・宮城県仙台市（七北田公園）\n  - 背景モチーフ: 七北田公園の緑、青葉城址・伊達政宗公騎馬像、仙台七夕まつりの笹飾り\n  - 対象ポケモン: Necrozma, Xurkitree, Nihilego, Kartana, Guzzlord, Stakataka, Solgaleo, Lunala\n\n![マドリード（GO Fest 2024） — スペイン・マドリード（フアン・カルロス1世公園） (2024)](https://static.wikia.nocookie.net/pokemongo/images/e/e4/Location_Card_Madrid.png/revision/latest)\n• **マドリード（GO Fest 2024）** (GO Fest 2024：マドリード（2024年6月）)\n  - 開催地: スペイン・マドリード（フアン・カルロス1世公園）\n  - 背景モチーフ: アルカラ門の凱旋門、シベーレス噴水、フアン・カルロス1世公園の景観\n  - 対象ポケモン: Necrozma, Pheromosa, Nihilego, Kartana, Guzzlord\n\n![ニューヨーク（GO Fest 2024） — アメリカ・ニューヨーク市（ランドールズ島） (2024)](https://static.wikia.nocookie.net/pokemongo/images/0/05/Location_Card_NYC_2024.png/revision/latest)\n• **ニューヨーク（GO Fest 2024）** (GO Fest 2024：ニューヨーク（2024年7月）)\n  - 開催地: アメリカ・ニューヨーク市（ランドールズ島）\n  - 背景モチーフ: エンパイアステートビル、クライスラービル、マンハッタンの摩天楼\n  - 対象ポケモン: Necrozma, Buzzwole, Nihilego, Kartana, Guzzlord\n\n![ホノルル（ポケモンWCS 2024） — アメリカ・ハワイ州ホノルル (2024)](https://static.wikia.nocookie.net/pokemongo/images/6/6f/Location_Card_Honolulu.png/revision/latest)\n• **ホノルル（ポケモンWCS 2024）** (ポケモン世界大会 WCS 2024 ホノルル)\n  - 開催地: アメリカ・ハワイ州ホノルル\n  - 背景モチーフ: ダイヤモンドヘッドの噴火口、ワイキキの青い波、ハイビスカスの花壇\n  - 対象ポケモン: Pikachu\n\n![福岡（ワイルドエリア 2024） — 日本・福岡県福岡市（舞鶴公園） (2024)](https://static.wikia.nocookie.net/pokemongo/images/2/23/Location_Card_Fukuoka.png/revision/latest)\n• **福岡（ワイルドエリア 2024）** (GO ワイルドエリア：福岡（2024年11月）)\n  - 開催地: 日本・福岡県福岡市（舞鶴公園）\n  - 背景モチーフ: 福岡タワー、博多湾の夜景、エレキパンクな稲妻\n  - 対象ポケモン: Toxtricity, Dialga-Origin, Palkia-Origin\n\n![サンパウロ（シティサファリ 2024） — ブラジル・サンパウロ (2024)](https://static.wikia.nocookie.net/pokemongo/images/f/f6/Location_Card_Sao_Paulo.png/revision/latest)\n• **サンパウロ（シティサファリ 2024）** (GO シティサファリ：サンパウロ（2024年12月）)\n  - 開催地: ブラジル・サンパウロ\n  - 背景モチーフ: オリベイラ橋のケーブル斜張橋、イビラプエラ公園、サンパウロのストリートアート\n  - 対象ポケモン: Eevee, Skiddo\n\n![台南（シティサファリ 2024） — 台湾・台南市 (2024)](https://static.wikia.nocookie.net/pokemongo/images/7/74/Location_Card_Tainan.png/revision/latest)\n• **台南（シティサファリ 2024）** (GO シティサファリ：台南（2024年3月）)\n  - 開催地: 台湾・台南市\n  - 背景モチーフ: 赤嵌楼（チーカンロウ）、孔子廟、伝統的なランタンが灯る古都の街並み\n  - 対象ポケモン: Eevee, Skiddo\n\n![スラバヤ（そらとぶピカチュウ 2024） — インドネシア・スラバヤ (2024)](https://static.wikia.nocookie.net/pokemongo/images/3/39/Location_Card_Surabaya.png/revision/latest)\n• **スラバヤ（そらとぶピカチュウ 2024）** (ピカチュウのインドネシアの旅：スラバヤ（2024年5月）)\n  - 開催地: インドネシア・スラバヤ\n  - 背景モチーフ: サメとワニが戦うスラバヤの象徴像とスラマドゥ大橋\n  - 対象ポケモン: Latios-Mega, Latias-Mega\n\n![ジョグジャカルタ（そらとぶピカチュウ 2024） — インドネシア・ジョグジャカルタ (2024)](https://static.wikia.nocookie.net/pokemongo/images/f/f6/Location_Card_Yogyakarta.png/revision/latest)\n• **ジョグジャカルタ（そらとぶピカチュウ 2024）** (ピカチュウのインドネシアの旅：ジョグジャカルタ)\n  - 開催地: インドネシア・ジョグジャカルタ\n  - 背景モチーフ: プランバナン寺院の石塔、ムラピ火山、伝統的なバティック文様\n  - 対象ポケモン: Latios-Mega, Latias-Mega\n\n![ジャカルタ（シティサファリ 2024） — インドネシア・ジャカルタ (2024)](https://static.wikia.nocookie.net/pokemongo/images/c/c5/Location_Card_Jakarta.png/revision/latest)\n• **ジャカルタ（シティサファリ 2024）** (GO シティサファリ：ジャカルタ（2024年9月）)\n  - 開催地: インドネシア・ジャカルタ\n  - 背景モチーフ: モナス独立記念塔の黄金の炎とブンダランHIの近代都市景観\n  - 対象ポケモン: Eevee, Skiddo, Latios-Mega, Latias-Mega\n\n![仁川（シティサファリ 2024） — 韓国・仁川広域市（松島セントラルパーク） (2024)](https://static.wikia.nocookie.net/pokemongo/images/a/ab/Location_Card_Incheon.png/revision/latest)\n• **仁川（シティサファリ 2024）** (GO シティサファリ：仁川（2024年9月）)\n  - 開催地: 韓国・仁川広域市（松島セントラルパーク）\n  - 背景モチーフ: 松島（ソンド）の超高層ビル群、セントラルパークの運河、仁川大橋\n  - 対象ポケモン: Eevee, Skiddo, Pikachu\n\n### 2025年：イッシュ、ガラル王権、大阪・関西万博\n\n![新北（イッシュツアー 2025） — 台湾・新北市（新北大都会公園） (2025)](https://static.wikia.nocookie.net/pokemongo/images/7/73/Location_Background_New_Taipei_City.png/revision/latest)\n• **新北（イッシュツアー 2025）** (GO Tour イッシュ：新北市（2025年2月）)\n  - 開催地: 台湾・新北市（新北大都会公園）\n  - 背景モチーフ: 淡海ライトレールの景観、淡水河のウォーターフロント、観音山の峰\n  - 対象ポケモン: Reshiram, Zekrom, Kyurem\n\n![ロサンゼルス（イッシュツアー 2025） — アメリカ・カリフォルニア州ローズボウル・スタジアム (2025)](https://static.wikia.nocookie.net/pokemongo/images/5/54/Location_Background_Los_Angeles.png/revision/latest)\n• **ロサンゼルス（イッシュツアー 2025）** (GO Tour イッシュ：ロサンゼルス（2025年2月）)\n  - 開催地: アメリカ・カリフォルニア州ローズボウル・スタジアム\n  - 背景モチーフ: ダウンタウン・ロサンゼルスの超高層ビル群とローズボウルのアーチ\n  - 対象ポケモン: Reshiram, Zekrom, Kyurem\n\n![シンガポール（シティサファリ 2025） — シンガポール（マリーナベイ） (2025)](https://static.wikia.nocookie.net/pokemongo/images/b/be/Location_Background_Singapore.png/revision/latest)\n• **シンガポール（シティサファリ 2025）** (GO シティサファリ：シンガポール（2025年3月）)\n  - 開催地: シンガポール（マリーナベイ）\n  - 背景モチーフ: ガーデンズ・バイ・ザ・ベイのスーパーツリー、マリーナベイ・サンズ、マーライオン\n  - 対象ポケモン: Eevee, Skiddo\n\n![ミラノ（シティサファリ 2025） — イタリア・ミラノ (2025)](https://static.wikia.nocookie.net/pokemongo/images/5/5e/Location_Background_Milan.png/revision/latest)\n• **ミラノ（シティサファリ 2025）** (GO シティサファリ：ミラノ（2025年3月）)\n  - 開催地: イタリア・ミラノ\n  - 背景モチーフ: ドゥオーモ（ミラノ大聖堂）のゴシック尖塔、ガレリアのアーチ、スフォルツェスコ城\n  - 対象ポケモン: Eevee, Skiddo\n\n![ムンバイ（シティサファリ 2025） — インド・ムンバイ (2025)](https://static.wikia.nocookie.net/pokemongo/images/0/0e/Location_Background_Mumbai.png/revision/latest)\n• **ムンバイ（シティサファリ 2025）** (GO シティサファリ：ムンバイ（2025年3月）)\n  - 開催地: インド・ムンバイ\n  - 背景モチーフ: インド門の玄武岩アーチとマリーンドライブの海岸線パノラマ\n  - 対象ポケモン: Eevee, Skiddo\n\n![釜山花火大会（ダイヤモンドブリッジ） — 韓国・釜山広域市（広安里ビーチ） (2025)](https://static.wikia.nocookie.net/pokemongo/images/a/ac/Location_Background_Busan_Fireworks_Festival_2025.png/revision/latest)\n• **釜山花火大会（ダイヤモンドブリッジ）** (釜山花火祭り 2025)\n  - 開催地: 韓国・釜山広域市（広安里ビーチ）\n  - 背景モチーフ: 広安大橋の夜景と夜空を埋め尽くす大迫力の海上花火パノラマ\n  - 対象ポケモン: Pikachu\n\n![大阪（GO Fest 2025：剣盾王） — 日本・大阪府大阪市 (2025)](https://static.wikia.nocookie.net/pokemongo/images/3/30/Location_Background_Osaka_2025.png/revision/latest)\n• **大阪（GO Fest 2025：剣盾王）** (GO Fest 2025：大阪（2025年夏）)\n  - 開催地: 日本・大阪府大阪市\n  - 背景モチーフ: 梅田スカイビル空中庭園、道頓堀の水面反射、大阪の煌びやかなネオン街\n  - 対象ポケモン: Zacian, Zamazenta\n\n![ジャージーシティ（GO Fest 2025） — アメリカ・ニュージャージー州（リバティ州立公園） (2025)](https://static.wikia.nocookie.net/pokemongo/images/c/c3/Location_Background_Jersey_City_2025.png/revision/latest)\n• **ジャージーシティ（GO Fest 2025）** (GO Fest 2025：ジャージーシティ（2025年夏）)\n  - 開催地: アメリカ・ニュージャージー州（リバティ州立公園）\n  - 背景モチーフ: 自由の女神像のシルエット、ハドソン川、リバティ州立公園からのマンハッタン展望\n  - 対象ポケモン: Zacian, Zamazenta\n\n![パリ（GO Fest 2025） — フランス・パリ（シャン・ド・マルス公園） (2025)](https://static.wikia.nocookie.net/pokemongo/images/1/1a/Location_Background_Paris_2025.png/revision/latest)\n• **パリ（GO Fest 2025）** (GO Fest 2025：パリ（2025年夏）)\n  - 開催地: フランス・パリ（シャン・ド・マルス公園）\n  - 背景モチーフ: エッフェル塔の鉄骨美、シャン・ド・マルス公園、セーヌ川の歴史的街並み\n  - 対象ポケモン: Zacian, Zamazenta\n\n### 2026年：史跡連携、冬季フェス、メガミュウツー\n\n![コペンハーゲン（GO Fest 2026） — デンマーク・コペンハーゲン（ニューハウン） (2026)](https://static.wikia.nocookie.net/pokemongo/images/9/91/Location_Background_Copenhagen_2026.png/revision/latest)\n• **コペンハーゲン（GO Fest 2026）** (GO Fest 2026：コペンハーゲン（2026年6月）)\n  - 開催地: デンマーク・コペンハーゲン（ニューハウン）\n  - 背景モチーフ: ニューハウン運河沿いのカラフルな木造家屋と歴史ある帆船の街並み\n  - 対象ポケモン: Mewtwo, Pikachu\n\n![英国ナショナル・トラスト連携（歴史遺産シリーズ） — イギリス国内27箇所の歴史的遺産・大庭園 (2026)](https://static.wikia.nocookie.net/pokemongo/images/0/07/Location_Background_National_Trust_Fountains_Abbey.png/revision/latest)\n• **英国ナショナル・トラスト連携（歴史遺産シリーズ）** (ナショナル・トラスト提携イベント（2026年）)\n  - 開催地: イギリス国内27箇所の歴史的遺産・大庭園\n  - 背景モチーフ: ファウンテンズ修道院の壮大な廃墟や歴史的庭園を描いた繊細な石造建築画\n  - 対象ポケモン: Treecko, Grovyle, Sceptile\n\n![ポケモンセンター（全国旗艦店記念カード） — メガトウキョー、シブヤ、キョウト、オーサカなど全国16店舗 (2026)](https://static.wikia.nocookie.net/pokemongo/images/4/48/Location_Background_PokemonCenter_MegaTokyo.png/revision/latest)\n• **ポケモンセンター（全国旗艦店記念カード）** (全国のポケモンセンター店舗限定チェックイン)\n  - 開催地: メガトウキョー、シブヤ、キョウト、オーサカなど全国16店舗\n  - 背景モチーフ: 最新鋭のサイバーイルミネーションと歴代のシンボル像が輝くポケセン店内\n  - 対象ポケモン: Pikachu\n\n![レゴ提携記念（ブロックワールド） — コペンハーゲンおよび世界のレゴストア (2026)](https://static.wikia.nocookie.net/pokemongo/images/7/70/Special_Background_LEGO.png/revision/latest)\n• **レゴ提携記念（ブロックワールド）** (GO Fest コペンハーゲン＆レゴストア提携（2026年夏）)\n  - 開催地: コペンハーゲンおよび世界のレゴストア\n  - 背景モチーフ: カラフルなレゴブロックで組み上げられた巨大モンスターボールと街並み\n  - 対象ポケモン: Pikachu\n\n![平昌（ピョンチャン冬祭り 2026） — 韓国・江原道平昌 (2026)](https://static.wikia.nocookie.net/pokemongo/images/0/01/Location_Background_Pyeongchang_Winter_Festival.png/revision/latest)\n• **平昌（ピョンチャン冬祭り 2026）** (平昌マス祭り＆冬の祭典（2026年1月）)\n  - 開催地: 韓国・江原道平昌\n  - 背景モチーフ: 太白山脈の白銀のゲレンデ、氷の彫刻、樹氷輝く松林\n  - 対象ポケモン: Pikachu, Deerling",
            "ru": "Полная историческая хроника всех 35 физических карточек локаций городов и памятников в Pokémon GO с момента их появления в 2023 году по 2026 год. Карточки локаций служат престижными сувенирами реальных путешествий.\n\n🚨 ПРАВИЛО ПОЛУЧЕНИЯ: Карточки локаций в рейдах выпадают ТОЛЬКО при личном участии у гима на месте проведения (~20–33% шанс). С дистанционных рейдов карточки не выпадают никогда! Однако за временные квесты на месте они гарантированы на 100%.\n\n### 2023: Дебют механики и первые карточки городов\n\n![Лас-Вегас (GO Tour Hoenn 2023) — Лас-Вегас, Невада, США (2023)](https://static.wikia.nocookie.net/pokemongo/images/9/9d/Location_Card_Las_Vegas.png/revision/latest)\n• **Лас-Вегас (GO Tour Hoenn 2023)** (GO Tour Hoenn Las Vegas)\n  - Локация: Лас-Вегас, Невада, США\n  - Мотив фона: Неоновый силуэт Лас-Вегас Стрип и каньон Ред-Рок\n  - Покемоны: Kyogre-Primal, Groudon-Primal\n\n![Лондон (GO Fest 2023) — Броквелл Парк, Лондон, Великобритания (2023)](https://static.wikia.nocookie.net/pokemongo/images/7/77/Location_Card_London.png/revision/latest)\n• **Лондон (GO Fest 2023)** (GO Fest 2023 London)\n  - Локация: Броквелл Парк, Лондон, Великобритания\n  - Мотив фона: Зелень парка Броквелл, река Темза, Биг-Бен и Тауэрский мост\n  - Покемоны: Rayquaza-Mega, Xerneas, Yveltal, Cresselia\n\n![Осака (GO Fest 2023) — Экспо Парк, Осака, Япония (2023)](https://static.wikia.nocookie.net/pokemongo/images/6/68/Location_Card_Osaka.png/revision/latest)\n• **Осака (GO Fest 2023)** (GO Fest 2023 Osaka)\n  - Локация: Экспо Парк, Осака, Япония\n  - Мотив фона: Башня Солнца в Экспо Парке и панорама Осаки\n  - Покемоны: Rayquaza-Mega, Xerneas, Yveltal, Cresselia\n\n![Нью-Йорк (GO Fest 2023) — Рэндаллс-Айленд, Нью-Йорк, США (2023)](https://static.wikia.nocookie.net/pokemongo/images/a/a8/Location_Card_NYC.png/revision/latest)\n• **Нью-Йорк (GO Fest 2023)** (GO Fest 2023 NYC)\n  - Локация: Рэндаллс-Айленд, Нью-Йорк, США\n  - Мотив фона: Мосты Манхэттена, Ист-Ривер и силуэт небоскребов Нью-Йорка\n  - Покемоны: Rayquaza-Mega, Xerneas, Yveltal, Cresselia\n\n![Барселона (City Safari 2023) — Барселона, Испания (2023)](https://static.wikia.nocookie.net/pokemongo/images/7/72/Location_Card_Barcelona.png/revision/latest)\n• **Барселона (City Safari 2023)** (City Safari Barcelona 2023)\n  - Локация: Барселона, Испания\n  - Мотив фона: Шпили Саграда Фамилия, мозаика парка Гуэль и Средиземное море\n  - Покемоны: Eevee, Skiddo\n\n![Сеул (City Safari 2023) — Сеул, Южная Корея (2023)](https://static.wikia.nocookie.net/pokemongo/images/5/52/Location_Card_Seoul.png/revision/latest)\n• **Сеул (City Safari 2023)** (City Safari Seoul 2023)\n  - Локация: Сеул, Южная Корея\n  - Мотив фона: Башня N Seoul Tower, мосты реки Хан и дворцовые крыши Ханок\n  - Покемоны: Eevee, Skiddo\n\n![Мехико (City Safari 2023) — Мехико, Мексика (2023)](https://static.wikia.nocookie.net/pokemongo/images/c/c8/Location_Card_Mexico_City.png/revision/latest)\n• **Мехико (City Safari 2023)** (City Safari Mexico City 2023)\n  - Локация: Мехико, Мексика\n  - Мотив фона: Монумент Ангел независимости и цветущие жакаранды\n  - Покемоны: Eevee, Skiddo\n\n![Остров Чеджу (Air Adventures 2023) — Остров Чеджу, Южная Корея (2023)](https://static.wikia.nocookie.net/pokemongo/images/7/7c/Location_Card_Jeju.png/revision/latest)\n• **Остров Чеджу (Air Adventures 2023)** (Air Adventures Jeju 2023)\n  - Локация: Остров Чеджу, Южная Корея\n  - Мотив фона: Вулкан Халласан, каменные статуи Дольхарубан и побережье Чеджу\n  - Покемоны: Latios-Mega, Latias-Mega, Pikachu\n\n### 2024: Всемирная экспансия, Ультра-чудовища и WCS\n\n![Лос-Анджелес (GO Tour Sinnoh 2024) — Роуз Боул, Пасадена, США (2024)](https://static.wikia.nocookie.net/pokemongo/images/1/15/Location_Card_Los_Angeles.png/revision/latest)\n• **Лос-Анджелес (GO Tour Sinnoh 2024)** (GO Tour Sinnoh Los Angeles)\n  - Локация: Роуз Боул, Пасадена, США\n  - Мотив фона: Арки стадиона Роуз Боул, калифорнийские пальмы и горы Сан-Габриэль\n  - Покемоны: Dialga-Origin, Palkia-Origin\n\n![Бали (Air Adventures Indonesia) — Бали, Индонезия (2024)](https://static.wikia.nocookie.net/pokemongo/images/a/a3/Location_Card_Bali.png/revision/latest)\n• **Бали (Air Adventures Indonesia)** (Pikachu's Indonesia Journey: Bali)\n  - Локация: Бали, Индонезия\n  - Мотив фона: Балийские ворота Чанди Бентар, тропический берег и вулкан Агунг\n  - Покемоны: Latios-Mega, Latias-Mega\n\n![Сэндай (GO Fest 2024) — Парк Нанакита, Сэндай, Япония (2024)](https://static.wikia.nocookie.net/pokemongo/images/6/6d/Location_Card_Sendai.png/revision/latest)\n• **Сэндай (GO Fest 2024)** (GO Fest 2024 Sendai)\n  - Локация: Парк Нанакита, Сэндай, Япония\n  - Мотив фона: Парк Нанакита, конная статуя Датэ Масамунэ в замке Аоба и ленты Танабата\n  - Покемоны: Necrozma, Xurkitree, Nihilego, Kartana, Guzzlord, Stakataka, Solgaleo, Lunala\n\n![Мадрид (GO Fest 2024) — Парк Хуан Карлос I, Мадрид, Испания (2024)](https://static.wikia.nocookie.net/pokemongo/images/e/e4/Location_Card_Madrid.png/revision/latest)\n• **Мадрид (GO Fest 2024)** (GO Fest 2024 Madrid)\n  - Локация: Парк Хуан Карлос I, Мадрид, Испания\n  - Мотив фона: Ворота Алькала, фонтан Сибелес и парк Хуан Карлос I\n  - Покемоны: Necrozma, Pheromosa, Nihilego, Kartana, Guzzlord\n\n![Нью-Йорк (GO Fest 2024) — Рэндаллс-Айленд, Нью-Йорк, США (2024)](https://static.wikia.nocookie.net/pokemongo/images/0/05/Location_Card_NYC_2024.png/revision/latest)\n• **Нью-Йорк (GO Fest 2024)** (GO Fest 2024 NYC)\n  - Локация: Рэндаллс-Айленд, Нью-Йорк, США\n  - Мотив фона: Эмпайр-стейт-билдинг, Крайслер-билдинг и панорама Манхэттена\n  - Покемоны: Necrozma, Buzzwole, Nihilego, Kartana, Guzzlord\n\n![Гонолулу (WCS 2024) — Гонолулу, Гавайи, США (2024)](https://static.wikia.nocookie.net/pokemongo/images/6/6f/Location_Card_Honolulu.png/revision/latest)\n• **Гонолулу (WCS 2024)** (WCS 2024 Honolulu)\n  - Локация: Гонолулу, Гавайи, США\n  - Мотив фона: Кратер Даймонд-Хед, серфинг на Вайкики и цветы гибискуса\n  - Покемоны: Pikachu\n\n![Фукуока (Wild Area 2024) — Парк Майдзуру, Фукуока, Япония (2024)](https://static.wikia.nocookie.net/pokemongo/images/2/23/Location_Card_Fukuoka.png/revision/latest)\n• **Фукуока (Wild Area 2024)** (Wild Area Fukuoka)\n  - Локация: Парк Майдзуру, Фукуока, Япония\n  - Мотив фона: Башня Фукуока, залив Хаката и электрические разряды\n  - Покемоны: Toxtricity, Dialga-Origin, Palkia-Origin\n\n![Сан-Паулу (City Safari 2024) — Сан-Паулу, Бразилия (2024)](https://static.wikia.nocookie.net/pokemongo/images/f/f6/Location_Card_Sao_Paulo.png/revision/latest)\n• **Сан-Паулу (City Safari 2024)** (City Safari São Paulo 2024)\n  - Локация: Сан-Паулу, Бразилия\n  - Мотив фона: Вантовый мост Октавио Фриас де Оливейра и парк Ибирапуэра\n  - Покемоны: Eevee, Skiddo\n\n![Тайнань (City Safari 2024) — Тайнань, Тайвань (2024)](https://static.wikia.nocookie.net/pokemongo/images/7/74/Location_Card_Tainan.png/revision/latest)\n• **Тайнань (City Safari 2024)** (City Safari Tainan 2024)\n  - Локация: Тайнань, Тайвань\n  - Мотив фона: Башня Чихкан, храм Конфуция и улочки с фонариками\n  - Покемоны: Eevee, Skiddo\n\n![Сурабая (Air Adventures Indonesia) — Сурабая, Индонезия (2024)](https://static.wikia.nocookie.net/pokemongo/images/3/39/Location_Card_Surabaya.png/revision/latest)\n• **Сурабая (Air Adventures Indonesia)** (Pikachu's Indonesia Journey: Surabaya)\n  - Локация: Сурабая, Индонезия\n  - Мотив фона: Монумент Суробойо (акула и крокодил) и мост Сурамаду\n  - Покемоны: Latios-Mega, Latias-Mega\n\n![Джокьякарта (Air Adventures Indonesia) — Джокьякарта, Индонезия (2024)](https://static.wikia.nocookie.net/pokemongo/images/f/f6/Location_Card_Yogyakarta.png/revision/latest)\n• **Джокьякарта (Air Adventures Indonesia)** (Pikachu's Indonesia Journey: Yogyakarta)\n  - Локация: Джокьякарта, Индонезия\n  - Мотив фона: Шпили храма Прамбанан, вулкан Мерапи и узоры батика\n  - Покемоны: Latios-Mega, Latias-Mega\n\n![Джакарта (City Safari 2024) — Джакарта, Индонезия (2024)](https://static.wikia.nocookie.net/pokemongo/images/c/c5/Location_Card_Jakarta.png/revision/latest)\n• **Джакарта (City Safari 2024)** (City Safari Jakarta 2024)\n  - Локация: Джакарта, Индонезия\n  - Мотив фона: Национальный монумент Монас с золотым пламенем и площадь Бундаран HI\n  - Покемоны: Eevee, Skiddo, Latios-Mega, Latias-Mega\n\n![Инчхон (City Safari 2024) — Сонгдо Централ Парк, Инчхон, Южная Корея (2024)](https://static.wikia.nocookie.net/pokemongo/images/a/ab/Location_Card_Incheon.png/revision/latest)\n• **Инчхон (City Safari 2024)** (City Safari Incheon 2024)\n  - Локация: Сонгдо Централ Парк, Инчхон, Южная Корея\n  - Мотив фона: Небоскребы Сонгдо, каналы парка и мост Инчхон\n  - Покемоны: Eevee, Skiddo, Pikachu\n\n### 2025: Инова, королевский Галар и Всемирная Экспо\n\n![Новый Тайбэй (GO Tour Unova 2025) — Новый Тайбэй, Тайвань (2025)](https://static.wikia.nocookie.net/pokemongo/images/7/73/Location_Background_New_Taipei_City.png/revision/latest)\n• **Новый Тайбэй (GO Tour Unova 2025)** (GO Tour Unova New Taipei City)\n  - Локация: Новый Тайбэй, Тайвань\n  - Мотив фона: Мост Даньхай, набережная реки Тамсуй и гора Гуаньинь\n  - Покемоны: Reshiram, Zekrom, Kyurem\n\n![Лос-Анджелес (GO Tour Unova 2025) — Роуз Боул, Лос-Анджелес, США (2025)](https://static.wikia.nocookie.net/pokemongo/images/5/54/Location_Background_Los_Angeles.png/revision/latest)\n• **Лос-Анджелес (GO Tour Unova 2025)** (GO Tour Unova Los Angeles)\n  - Локация: Роуз Боул, Лос-Анджелес, США\n  - Мотив фона: Небоскребы Даунтауна Лос-Анджелеса и арки Роуз Боул\n  - Покемоны: Reshiram, Zekrom, Kyurem\n\n![Сингапур (City Safari 2025) — Сингапур (Marina Bay) (2025)](https://static.wikia.nocookie.net/pokemongo/images/b/be/Location_Background_Singapore.png/revision/latest)\n• **Сингапур (City Safari 2025)** (City Safari Singapore 2025)\n  - Локация: Сингапур (Marina Bay)\n  - Мотив фона: Супердеревья Gardens by the Bay, отель Marina Bay Sands и Мерлион\n  - Покемоны: Eevee, Skiddo\n\n![Милан (City Safari 2025) — Милан, Италия (2025)](https://static.wikia.nocookie.net/pokemongo/images/5/5e/Location_Background_Milan.png/revision/latest)\n• **Милан (City Safari 2025)** (City Safari Milan 2025)\n  - Локация: Милан, Италия\n  - Мотив фона: Готический Миланский собор Duomo, Галерея Виктора Эммануила II и замок Сфорца\n  - Покемоны: Eevee, Skiddo\n\n![Мумбаи (City Safari 2025) — Мумбаи, Индия (2025)](https://static.wikia.nocookie.net/pokemongo/images/0/0e/Location_Background_Mumbai.png/revision/latest)\n• **Мумбаи (City Safari 2025)** (City Safari Mumbai 2025)\n  - Локация: Мумбаи, Индия\n  - Мотив фона: Монумент Ворота Индии и дуга набережной Марин-Драйв\n  - Покемоны: Eevee, Skiddo\n\n![Busan Fireworks Festival — Пляж Кваналли, Пусан, Южная Корея (2025)](https://static.wikia.nocookie.net/pokemongo/images/a/ac/Location_Background_Busan_Fireworks_Festival_2025.png/revision/latest)\n• **Busan Fireworks Festival** (Busan Fireworks Festival 2025)\n  - Локация: Пляж Кваналли, Пусан, Южная Корея\n  - Мотив фона: Мост Кванан, озаренный грандиозным морским салютом\n  - Покемоны: Pikachu\n\n![Осака (GO Fest 2025) — Осака, Япония (2025)](https://static.wikia.nocookie.net/pokemongo/images/3/30/Location_Background_Osaka_2025.png/revision/latest)\n• **Осака (GO Fest 2025)** (GO Fest 2025 Osaka)\n  - Локация: Осака, Япония\n  - Мотив фона: Небоскреб Umeda Sky Building, канал Дотонбори и огни Осаки\n  - Покемоны: Zacian, Zamazenta\n\n![Джерси-Сити (GO Fest 2025) — Либерти Стейт Парк, Джерси-Сити, США (2025)](https://static.wikia.nocookie.net/pokemongo/images/c/c3/Location_Background_Jersey_City_2025.png/revision/latest)\n• **Джерси-Сити (GO Fest 2025)** (GO Fest 2025 Jersey City)\n  - Локация: Либерти Стейт Парк, Джерси-Сити, США\n  - Мотив фона: Статуя Свободы, река Гудзон и панорама Манхэттена\n  - Покемоны: Zacian, Zamazenta\n\n![Париж (GO Fest 2025) — Марсово поле, Париж, Франция (2025)](https://static.wikia.nocookie.net/pokemongo/images/1/1a/Location_Background_Paris_2025.png/revision/latest)\n• **Париж (GO Fest 2025)** (GO Fest 2025 Paris)\n  - Локация: Марсово поле, Париж, Франция\n  - Мотив фона: Эйфелева башня, Марсово поле и набережная Сены\n  - Покемоны: Zacian, Zamazenta\n\n### 2026: Культурное наследие, Зимний фестиваль и Мега-Мьюту\n\n![Копенгаген (GO Fest 2026) — Копенгаген, Дания (Нюхавн) (2026)](https://static.wikia.nocookie.net/pokemongo/images/9/91/Location_Background_Copenhagen_2026.png/revision/latest)\n• **Копенгаген (GO Fest 2026)** (GO Fest 2026 Copenhagen)\n  - Локация: Копенгаген, Дания (Нюхавн)\n  - Мотив фона: Разноцветные фасады гавани Нюхавн, исторические корабли и Русалочка\n  - Покемоны: Mewtwo, Pikachu\n\n![National Trust UK Heritage — 27 исторических поместий в Великобритании (2026)](https://static.wikia.nocookie.net/pokemongo/images/0/07/Location_Background_National_Trust_Fountains_Abbey.png/revision/latest)\n• **National Trust UK Heritage** (National Trust UK Collaboration)\n  - Локация: 27 исторических поместий в Великобритании\n  - Мотив фона: Архитектурные каменные гравюры аббатства Фаунтинс и поместий National Trust\n  - Покемоны: Treecko, Grovyle, Sceptile\n\n![Pokémon Center Japan Flagships — 16 флагманских магазинов в Японии (2026)](https://static.wikia.nocookie.net/pokemongo/images/4/48/Location_Background_PokemonCenter_MegaTokyo.png/revision/latest)\n• **Pokémon Center Japan Flagships** (Посещение магазинов Pokémon Center в Японии)\n  - Локация: 16 флагманских магазинов в Японии\n  - Мотив фона: Футуристический интерьер магазинов Pokémon Center с кибер-подсветкой\n  - Покемоны: Pikachu\n\n![LEGO Collaboration — Копенгаген и магазины LEGO по всему миру (2026)](https://static.wikia.nocookie.net/pokemongo/images/7/70/Special_Background_LEGO.png/revision/latest)\n• **LEGO Collaboration** (LEGO Collaboration 2026)\n  - Локация: Копенгаген и магазины LEGO по всему миру\n  - Мотив фона: Яркие кубики LEGO, собирающиеся в покебол и памятники\n  - Покемоны: Pikachu\n\n![Пхёнчхан (Winter Festival 2026) — Пхёнчхан, Канвондо, Южная Корея (2026)](https://static.wikia.nocookie.net/pokemongo/images/0/01/Location_Background_Pyeongchang_Winter_Festival.png/revision/latest)\n• **Пхёнчхан (Winter Festival 2026)** (Pyeongchang Winter Festival 2026)\n  - Локация: Пхёнчхан, Канвондо, Южная Корея\n  - Мотив фона: Заснеженные склоны гор Тхэбэк, ледяные скульптуры и морозный лес\n  - Покемоны: Pikachu, Deerling"
      },
      "tips": {
            "cs": [
                  "Při účasti na GO Festu nebo City Safari vždy prioritně dokončete Timed Research — z výzkumů bývá zisk karty 100% garantovaný.",
                  "Pokud nemůžete cestovat, získejte tyto Pokémony výměnou — lokační karta je na 100 % trvalá a nikdy se při trade nesmaže!",
                  "Nezapomeňte, že vzdálené raidy (Remote Raids) tyto městské karty nikdy neudělují — musíte být u Gymu osobně."
            ],
            "en": [
                  "Always prioritize Timed Research at on-site events — research rewards grant 100% guaranteed Location Cards.",
                  "If unable to travel, trade with local friends — backgrounds are 100% permanent across trades!",
                  "Remember that Remote Raid Passes NEVER reward city location cards — on-site physical presence is strictly required."
            ],
            "ja": [
                  "イベント現地ではタイムチャレンジを最優先で完了させましょう。リサーチ報酬は100%確定で背景が付属します。",
                  "現地へ行けなかった場合も、フレンドとトレードすれば背景は100%永久に保持されます。",
                  "リモートレイドでは都市ロケーションカードはドロップしない点に注意してください。現地ジムでの対面参加が必須です。"
            ],
            "ru": [
                  "Всегда выполняйте временные квесты на ивентах — за них дают 100% гарантированные карточки локаций.",
                  "Если не можете поехать, выменяйте покемона у друга — фон сохраняется навсегда при любом обмене!",
                  "Помните: с дистанционных рейдов карточки локаций городов не выпадают никогда — необходимо личное присутствие."
            ]
      },
      "pokemon": [
            "Kyogre-Primal",
            "Groudon-Primal",
            "Rayquaza-Mega",
            "Xerneas",
            "Yveltal",
            "Cresselia",
            "Eevee",
            "Skiddo",
            "Dialga-Origin",
            "Palkia-Origin",
            "Latios-Mega",
            "Latias-Mega",
            "Necrozma",
            "Xurkitree",
            "Nihilego",
            "Kartana",
            "Guzzlord",
            "Stakataka",
            "Solgaleo",
            "Lunala",
            "Pheromosa",
            "Buzzwole",
            "Pikachu",
            "Toxtricity",
            "Reshiram",
            "Zekrom",
            "Kyurem",
            "Mewtwo",
            "Treecko",
            "Grovyle",
            "Sceptile",
            "Zacian"
      ]
},
      {
      "id": "global-special-backgrounds-catalog",
      "heading": {
            "cs": "4. Kompletní přehled Globálních speciálních pozadí (2024–2026)",
            "en": "4. Global Special Backgrounds Master Catalog (2024–2026)",
            "ja": "4. グローバルスペシャル背景全集（2024〜2026）",
            "ru": "4. Полный каталог глобальных специальных фонов (2024–2026)"
      },
      "content": {
            "cs": "Kompletní historický přehled všech 31 Globálních speciálních pozadí v Pokémon GO od roku 2024 do 2026. Na rozdíl od městských karet jsou tato pozadí dostupná všem trenérům po celém světě bez nutnosti fyzického cestování a lze je získat i prostřednictvím vzdálených raidů (Remote Raids) během globálních oken!\n\n### 1. Kosmické dimenze, Ultra Beasty a fúze Necrozmy (2024)\n\n![Ultra Space (Červí díra) (2024)](https://static.wikia.nocookie.net/pokemongo/images/c/c8/Special_Background_GoFest2024_Wormhole.png/revision/latest)\n• **Ultra Space (Červí díra)** (GO Fest 2024: Global & Inbound from Ultra Space)\n  - Vizuální motiv: Rotující multidimenzionální červí díra Ultra Space s temně fialovými a azurovými paprsky\n  - Způsob zisku: Náhodný drop z 5★ raidů Ultra Beasts a Necrozmy (šance cca 1 z 5 raidů)\n  - Pokémoni: Necrozma, Nihilego, Buzzwole, Pheromosa, Xurkitree, Celesteela, Kartana, Guzzlord, Blacephalon, Stakataka\n\n![Zářivé Slunce (Radiant Sunburst) (2024)](https://static.wikia.nocookie.net/pokemongo/images/c/c5/Special_Background_GoFest2024_Radiance.png/revision/latest)\n• **Zářivé Slunce (Radiant Sunburst)** (GO Fest 2024: Global Special Research)\n  - Vizuální motiv: Zlatá sluneční koróna s pulzujícími solárními erupcemi\n  - Způsob zisku: Garantovaná odměna za dokončení příběhového výzkumu GO Fest 2024\n  - Pokémoni: Solgaleo\n\n![Měsíční Srpek (Luminescent Moon) (2024)](https://static.wikia.nocookie.net/pokemongo/images/c/c5/Special_Background_GoFest2024_Radiance.png/revision/latest)\n• **Měsíční Srpek (Luminescent Moon)** (GO Fest 2024: Global Special Research)\n  - Vizuální motiv: Zářící měsíční srpek uprostřed hlubokého nočního vesmíru a mlhovin\n  - Způsob zisku: Garantovaná odměna za dokončení příběhového výzkumu GO Fest 2024\n  - Pokémoni: Lunala\n\n### 2. Globální výzvy lídrů týmů: Triumph Together (2024)\n\n![Team Valor (Plameny Candely) (2024)](https://static.wikia.nocookie.net/pokemongo/images/3/3c/Special_Background_Valor.png/revision/latest)\n• **Team Valor (Plameny Candely)** (Triumph Together & Candela's Quest)\n  - Vizuální motiv: Žhnoucí rudé plameny, žhavé uhlíky a dynamický znak Team Valor\n  - Způsob zisku: Odměna za splnění globální výzvy Team Valor a tematických výzkumů\n  - Pokémoni: Ponyta, Moltres, Charmander, Cyndaquil, Torchic, Chimchar, Tepig, Fennekin, Litten, Scorbunny, Fuecoco\n\n![Team Instinct (Blesky Sparka) (2024)](https://static.wikia.nocookie.net/pokemongo/images/6/6a/Special_Background_Instinct.png/revision/latest)\n• **Team Instinct (Blesky Sparka)** (Triumph Together & Spark's Quest)\n  - Vizuální motiv: Klikaté zlaté blesky, elektrické výboje a emblém Team Instinct\n  - Způsob zisku: Odměna za splnění globální výzvy Team Instinct a tematických výzkumů\n  - Pokémoni: Elekid, Zapdos, Bulbasaur, Chikorita, Treecko, Turtwig, Snivy, Chespin, Rowlet, Grookey, Sprigatito\n\n![Team Mystic (Mrazivé Krystaly Blanche) (2024)](https://static.wikia.nocookie.net/pokemongo/images/0/00/Special_Background_Mystic.png/revision/latest)\n• **Team Mystic (Mrazivé Krystaly Blanche)** (Triumph Together & Blanche's Quest)\n  - Vizuální motiv: Čisté azurové ledové krystaly, třpytivá jinovatka a znak Team Mystic\n  - Způsob zisku: Odměna za splnění globální výzvy Team Mystic a tematických výzkumů\n  - Pokémoni: Lapras, Articuno, Squirtle, Totodile, Mudkip, Piplup, Oshawott, Froakie, Popplio, Sobble, Quaxly\n\n### 3. Zvukové vlny a Community Day arény (2024)\n\n![Wild Area Global (Neonová Zvuková Vlna) (2024)](https://static.wikia.nocookie.net/pokemongo/images/e/eb/Special_Background_GoWildArea2024.png/revision/latest)\n• **Wild Area Global (Neonová Zvuková Vlna)** (Pokémon GO Wild Area Global 2024)\n  - Vizuální motiv: Elektrická neonová zvuková vlna v punkovém fialovo-žlutém stylu\n  - Způsob zisku: Náhodná odměna z Max Battles a 5★ raidů během globálního víkendu Wild Area\n  - Pokémoni: Toxtricity, Kyogre-Primal, Groudon-Primal, Dialga-Origin, Palkia-Origin\n\n### 4. Sezónní legendy, Unova Jin & Jang a Královský Galar (2025)\n\n![Dual Destiny (Dvojí Osud) (2025)](https://static.wikia.nocookie.net/pokemongo/images/c/ce/Special_Background_DualDestiny.png/revision/latest)\n• **Dual Destiny (Dvojí Osud)** (Community Days: Zima 2025 (Sprigatito, Ralts, Karrablast))\n  - Vizuální motiv: Prolínající se světelné linie osudu v modrých a fialových gradientních tónech\n  - Způsob zisku: Odměna ze Special Research během Community Days sezóny Dual Destiny\n  - Pokémoni: Sprigatito, Ralts, Karrablast, Shelmet\n\n![Enigma (Záhady Unovy) (2025)](https://static.wikia.nocookie.net/pokemongo/images/5/57/Special_Background_Enigma.png/revision/latest)\n• **Enigma (Záhady Unovy)** (Pokémon GO Tour: Unova – Road to Unova)\n  - Vizuální motiv: Fialová mlha Dream Mist s plovoucími starověkými glyfy a tajemnými runami\n  - Způsob zisku: Plnění tematických Field Research úkolů během GO Tour Unova\n  - Pokémoni: Zorua, Sandile, Darumaka, Darmanitan, Timburr, Woobat, Sigilyph, Klink, Ferroseed\n\n![Might and Mastery (Síla a Mistrovství) (2025)](https://static.wikia.nocookie.net/pokemongo/images/9/90/Special_Background_MightAndMastery.png/revision/latest)\n• **Might and Mastery (Síla a Mistrovství)** (Jaro 2025: Community Days & GO Battle Week)\n  - Vizuální motiv: Ohnivá energie a zlaté bojové aury reprezentující bojového ducha\n  - Způsob zisku: Plnění milníků GO Battle Week a placených Community Day výzkumů\n  - Pokémoni: Fuecoco, Totodile, Vanillite, Pawmi, Meditite, Stunky, Mareanie, Charcadet, Machop\n\n![Delightful Days (Slunečné Dny) (2025)](https://static.wikia.nocookie.net/pokemongo/images/8/85/Special_Background_DelightfulDays.png/revision/latest)\n• **Delightful Days (Slunečné Dny)** (Léto 2025: Community Days, GO Pass & Water Festival)\n  - Vizuální motiv: Paprsky letního slunce, kapky vody a teplé tropické barvy\n  - Způsob zisku: Postup v letním GO Passu a odměny za Water Festival 2025\n  - Pokémoni: Articuno, Zapdos, Moltres, Jangmo-o, Eevee, Lapras, Quaxly, Rillaboom, Cinderace, Inteleon, Rookidee\n\n![Meč Galaru (Crowned Zacian) (2025)](https://static.wikia.nocookie.net/pokemongo/images/a/a4/Special_Background_GOFest_2025_Sword.png/revision/latest)\n• **Meč Galaru (Crowned Zacian)** (Pokémon GO Fest 2025: Global)\n  - Vizuální motiv: Královská azurová a tyrkysová aura Slumbering Weald s rytířskými symboly meče\n  - Způsob zisku: Náhodný drop z 5★ raidů na Crowned Sword Zaciana během GO Festu 2025\n  - Pokémoni: Zacian\n\n![Max Finale: Dark Skies (Gigantamax) (2025)](https://static.wikia.nocookie.net/pokemongo/images/4/4f/Special_Background_Max_Finale.png/revision/latest)\n• **Max Finale: Dark Skies (Gigantamax)** (Pokémon GO Fest 2025: Max Finale (Srpen 2025))\n  - Vizuální motiv: Temná obloha s vířícími rudými Dynamax mraky a gigantickými sloupy energie\n  - Způsob zisku: Vítězství v 6★ Gigantamax bitvách během víkendu Max Finale 2025\n  - Pokémoni: Venusaur, Charizard, Blastoise, Gengar, Snorlax, Machamp, Kingler, Lapras, Toxtricity\n\n![Tales of Transformation (Legendy Proměny) (2025)](https://static.wikia.nocookie.net/pokemongo/images/2/20/Special_Background_Tales_of_Transformation.png/revision/latest)\n• **Tales of Transformation (Legendy Proměny)** (Podzim 2025: Legends: Z-A Celebration & Community Days)\n  - Vizuální motiv: Hranoly zářícího krystalického světla přecházející v geometrické buňky Zygarda\n  - Způsob zisku: Odměna za podzimní GO Pass a oslavný výzkum Pokémon Legends: Z-A\n  - Pokémoni: Cobalion, Terrakion, Virizion, Flabebe, Solosis, Chikorita, Totodile, Tepig, Pikipek\n\n![Wild Area Global 2025 (Strážci a Příroda) (2025)](https://static.wikia.nocookie.net/pokemongo/images/e/e9/Special_Background_Wild_Area_Global_2025.png/revision/latest)\n• **Wild Area Global 2025 (Strážci a Příroda)** (Pokémon GO Wild Area Global 2025 (Listopad 2025))\n  - Vizuální motiv: Divočina plná přírodní aury, bouřkových mraků a záře strážců ostrovů Tapu\n  - Způsob zisku: Náhodný drop z 5★ raidů na Lugii, Ho-Oh a strážce Tapu během Wild Area 2025\n  - Pokémoni: Lugia, Ho-Oh, Tapu Koko, Tapu Lele, Tapu Bulu, Tapu Fini, Darkrai, Bewear, Grimmsnarl\n\n![Pokémon Concierge (Resortní Psyduck) (2025)](https://static.wikia.nocookie.net/pokemongo/images/b/bd/Special_Background_Concierge.png/revision/latest)\n• **Pokémon Concierge (Resortní Psyduck)** (Pokémon Concierge Celebration Event (Září 2025))\n  - Vizuální motiv: Tropický resort s dřevěnými lehátky, monstery, ibišky a tyrkysovým bazénem\n  - Způsob zisku: Plnění slavnostního výzkumu Pokémon Concierge na oslavu stop-motion seriálu\n  - Pokémoni: Psyduck\n\n### 5. Éra Mega Evoluce, dynamická psychická aura a 10. výročí (2026)\n\n![Community Days 2026 (Moderní Hvězdy) (2026)](https://static.wikia.nocookie.net/pokemongo/images/0/09/Special_Background_Community_2026.png/revision/latest)\n• **Community Days 2026 (Moderní Hvězdy)** (Komunitní dny v roce 2026 (Piplup, Grookey, Scorbunny, Tinkatink))\n  - Vizuální motiv: Moderní geometrické hvězdné paprsky v odstínech roku 2026\n  - Způsob zisku: Odměna za dokončení placených výzkumů Community Day v roce 2026\n  - Pokémoni: Piplup, Grookey, Vulpix, Scorbunny, Tinkatink, Lechonk, Deino, Frigibax, Sobble, Gible\n\n![Dancing in the Moonlight (Svátek Měsíce 2026) (2026)](https://static.wikia.nocookie.net/pokemongo/images/d/d7/Special_Background_Dancing_in_the_Moonlight_2026.png/revision/latest)\n• **Dancing in the Moonlight (Svátek Měsíce 2026)** (Dancing in the Moonlight Event (Září 2026))\n  - Vizuální motiv: Zářící úplněk obklopený nočními lucernami, květy vonokvětky (Osmanthus) a padajícími hvězdami\n  - Způsob zisku: Dokončení podzimního výzkumu při svátku sklizně a úplňku v září 2026\n  - Pokémoni: Clefairy",
            "en": "Comprehensive master catalog of all 31 Global Special Backgrounds in Pokémon GO spanning 2024 through 2026. Unlike city cards, global backgrounds are accessible worldwide without travel requirements and CAN drop from Remote Raids during official global active windows!\n\n### 1. Cosmic Dimensions, Ultra Beasts & Necrozma Fusions (2024)\n\n![Ultra Space (Wormhole) (2024)](https://static.wikia.nocookie.net/pokemongo/images/c/c8/Special_Background_GoFest2024_Wormhole.png/revision/latest)\n• **Ultra Space (Wormhole)** (GO Fest 2024: Global & Inbound from Ultra Space)\n  - Artwork: Swirling multidimensional Ultra Space wormhole with dark purple and cyan cosmic vortexes\n  - How to Obtain: Random drop from 5-Star Ultra Beast and Necrozma raids (~1 in 5 chance)\n  - Featured Pokémon: Necrozma, Nihilego, Buzzwole, Pheromosa, Xurkitree, Celesteela, Kartana, Guzzlord, Blacephalon, Stakataka\n\n![Radiant Sunburst (Solar) (2024)](https://static.wikia.nocookie.net/pokemongo/images/c/c5/Special_Background_GoFest2024_Radiance.png/revision/latest)\n• **Radiant Sunburst (Solar)** (GO Fest 2024: Global Special Research)\n  - Artwork: Golden solar corona with pulsing solar flare arcs\n  - How to Obtain: Guaranteed reward for completing the GO Fest 2024 ticketed storyline\n  - Featured Pokémon: Solgaleo\n\n![Luminescent Moon (Lunar) (2024)](https://static.wikia.nocookie.net/pokemongo/images/c/c5/Special_Background_GoFest2024_Radiance.png/revision/latest)\n• **Luminescent Moon (Lunar)** (GO Fest 2024: Global Special Research)\n  - Artwork: Glowing crescent moon amidst deep cosmic nebulae and stars\n  - How to Obtain: Guaranteed reward for completing the GO Fest 2024 ticketed storyline\n  - Featured Pokémon: Lunala\n\n### 2. Team Leader Milestones: Triumph Together (2024)\n\n![Team Valor (Candela's Embers) (2024)](https://static.wikia.nocookie.net/pokemongo/images/3/3c/Special_Background_Valor.png/revision/latest)\n• **Team Valor (Candela's Embers)** (Triumph Together & Candela's Quest)\n  - Artwork: Blazing red embers, rising heat waves, and dynamic Team Valor insignia\n  - How to Obtain: Reward for clearing Team Valor global milestones and quests\n  - Featured Pokémon: Ponyta, Moltres, Charmander, Cyndaquil, Torchic, Chimchar, Tepig, Fennekin, Litten, Scorbunny, Fuecoco\n\n![Team Instinct (Spark's Lightning) (2024)](https://static.wikia.nocookie.net/pokemongo/images/6/6a/Special_Background_Instinct.png/revision/latest)\n• **Team Instinct (Spark's Lightning)** (Triumph Together & Spark's Quest)\n  - Artwork: Jagged golden electric lightning arcs and Team Instinct emblem\n  - How to Obtain: Reward for clearing Team Instinct global milestones and quests\n  - Featured Pokémon: Elekid, Zapdos, Bulbasaur, Chikorita, Treecko, Turtwig, Snivy, Chespin, Rowlet, Grookey, Sprigatito\n\n![Team Mystic (Blanche's Frost) (2024)](https://static.wikia.nocookie.net/pokemongo/images/0/00/Special_Background_Mystic.png/revision/latest)\n• **Team Mystic (Blanche's Frost)** (Triumph Together & Blanche's Quest)\n  - Artwork: Sharp azure ice crystal lattices, shimmering frost, and Team Mystic crest\n  - How to Obtain: Reward for clearing Team Mystic global milestones and quests\n  - Featured Pokémon: Lapras, Articuno, Squirtle, Totodile, Mudkip, Piplup, Oshawott, Froakie, Popplio, Sobble, Quaxly\n\n### 3. Soundwave Distortions & Community Day Arena (2024)\n\n![Wild Area Global (Neon Soundwave) (2024)](https://static.wikia.nocookie.net/pokemongo/images/e/eb/Special_Background_GoWildArea2024.png/revision/latest)\n• **Wild Area Global (Neon Soundwave)** (Pokémon GO Wild Area Global 2024)\n  - Artwork: Electrifying neon audio soundwave graphics with purple-yellow punk styling\n  - How to Obtain: Random encounter drop from Max Battles and 5-Star raids during Wild Area Global\n  - Featured Pokémon: Toxtricity, Kyogre-Primal, Groudon-Primal, Dialga-Origin, Palkia-Origin\n\n### 4. Seasonal Lore, Unova Yin & Yang & Royal Galar (2025)\n\n![Dual Destiny Season (2025)](https://static.wikia.nocookie.net/pokemongo/images/c/ce/Special_Background_DualDestiny.png/revision/latest)\n• **Dual Destiny Season** (Community Days: Winter 2025)\n  - Artwork: Intertwined cosmic threads of destiny in shifting blue-purple gradients\n  - How to Obtain: Special Research ticket reward during Dual Destiny season events\n  - Featured Pokémon: Sprigatito, Ralts, Karrablast, Shelmet\n\n![Unova Enigma (2025)](https://static.wikia.nocookie.net/pokemongo/images/5/57/Special_Background_Enigma.png/revision/latest)\n• **Unova Enigma** (Pokémon GO Tour: Unova – Road to Unova)\n  - Artwork: Eerie lavender Dream Mist haze filled with floating ancient Unovan glyphs\n  - How to Obtain: Clear themed PokéStop Field Research during GO Tour Unova celebrations\n  - Featured Pokémon: Zorua, Sandile, Darumaka, Darmanitan, Timburr, Woobat, Sigilyph, Klink, Ferroseed\n\n![Might & Mastery Season (2025)](https://static.wikia.nocookie.net/pokemongo/images/9/90/Special_Background_MightAndMastery.png/revision/latest)\n• **Might & Mastery Season** (Spring 2025: Community Days & Battle Week)\n  - Artwork: Crackling crimson fighting aura and dynamic golden energy brushstrokes\n  - How to Obtain: Completing GO Battle Week challenges and Community Day storylines\n  - Featured Pokémon: Fuecoco, Totodile, Vanillite, Pawmi, Meditite, Stunky, Mareanie, Charcadet, Machop\n\n![Delightful Days Season (2025)](https://static.wikia.nocookie.net/pokemongo/images/8/85/Special_Background_DelightfulDays.png/revision/latest)\n• **Delightful Days Season** (Summer 2025: Community Days & Water Festival)\n  - Artwork: Radiant tropical sunlight prism rays and splashing summer water droplets\n  - How to Obtain: Progressing through summer GO Pass tiers and Water Festival tasks\n  - Featured Pokémon: Articuno, Zapdos, Moltres, Jangmo-o, Eevee, Lapras, Quaxly, Rillaboom, Cinderace, Inteleon, Rookidee\n\n![Sword Version (Crowned Zacian) (2025)](https://static.wikia.nocookie.net/pokemongo/images/a/a4/Special_Background_GOFest_2025_Sword.png/revision/latest)\n• **Sword Version (Crowned Zacian)** (Pokémon GO Fest 2025: Global)\n  - Artwork: Royal cyan and magenta mist of Slumbering Weald with glowing sovereign sword crests\n  - How to Obtain: Random drop from Crowned Sword Zacian 5-Star raids at GO Fest 2025 Global\n  - Featured Pokémon: Zacian\n\n![Max Finale: Dark Skies (2025)](https://static.wikia.nocookie.net/pokemongo/images/4/4f/Special_Background_Max_Finale.png/revision/latest)\n• **Max Finale: Dark Skies** (Pokémon GO Fest 2025: Max Finale (August 2025))\n  - Artwork: Stormy violet skies torn by crimson swirl Dynamax clouds and colossal energy pillars\n  - How to Obtain: Clear 6-Star Gigantamax Battles during the Max Finale weekend\n  - Featured Pokémon: Venusaur, Charizard, Blastoise, Gengar, Snorlax, Machamp, Kingler, Lapras, Toxtricity\n\n![Tales of Transformation (2025)](https://static.wikia.nocookie.net/pokemongo/images/2/20/Special_Background_Tales_of_Transformation.png/revision/latest)\n• **Tales of Transformation** (Autumn 2025: Legends: Z-A Celebration)\n  - Artwork: Prismatic crystal luminescence transitioning into emerald Zygarde cell hexagons\n  - How to Obtain: Reward from autumn GO Pass tiers and Pokémon Legends: Z-A event tasks\n  - Featured Pokémon: Cobalion, Terrakion, Virizion, Flabebe, Solosis, Chikorita, Totodile, Tepig, Pikipek\n\n![Wild Area Global 2025 (2025)](https://static.wikia.nocookie.net/pokemongo/images/e/e9/Special_Background_Wild_Area_Global_2025.png/revision/latest)\n• **Wild Area Global 2025** (Pokémon GO Wild Area Global 2025)\n  - Artwork: Primal nature storms swirling with radiant totemic energy of the Tapu guardians\n  - How to Obtain: Random drop from 5-Star raids during Wild Area 2025 Global weekend\n  - Featured Pokémon: Lugia, Ho-Oh, Tapu Koko, Tapu Lele, Tapu Bulu, Tapu Fini, Darkrai, Bewear, Grimmsnarl\n\n![Pokémon Concierge Celebration (2025)](https://static.wikia.nocookie.net/pokemongo/images/b/bd/Special_Background_Concierge.png/revision/latest)\n• **Pokémon Concierge Celebration** (Pokémon Concierge Celebration (Sept 2025))\n  - Artwork: Stop-motion tropical island resort with rattan chairs, monsteras, and turquoise pool\n  - How to Obtain: Completing the special Pokémon Concierge Timed Research questline\n  - Featured Pokémon: Psyduck\n\n### 5. Mega DNA Era, Dynamic Reactive Aura & 10th Anniversary (2026)\n\n![Community Days 2026 (2026)](https://static.wikia.nocookie.net/pokemongo/images/0/09/Special_Background_Community_2026.png/revision/latest)\n• **Community Days 2026** (2026 Community Day Calendar)\n  - Artwork: Modern geometric stellar beams and celebratory particle streaks\n  - How to Obtain: Completing official ticketed Community Day Special Research in 2026\n  - Featured Pokémon: Piplup, Grookey, Vulpix, Scorbunny, Tinkatink, Lechonk, Deino, Frigibax, Sobble, Gible\n\n![Dancing in the Moonlight 2026 (2026)](https://static.wikia.nocookie.net/pokemongo/images/d/d7/Special_Background_Dancing_in_the_Moonlight_2026.png/revision/latest)\n• **Dancing in the Moonlight 2026** (Dancing in the Moonlight (Sept 2026))\n  - Artwork: Luminescent harvest full moon framed by paper festival lanterns, Osmanthus blossoms, and star dust\n  - How to Obtain: Completing Mid-Autumn harvest festival Timed Research across Asia-Pacific and globally\n  - Featured Pokémon: Clefairy",
            "ja": "2024年から2026年にかけて登場した全31種類のグローバルスペシャル背景の完全網羅カタログです。都市限定カードとは異なり、現地への渡航は不要で、世界中のどこからでも入手可能。グローバル期間中はリモートレイドでもドロップ判定があります！\n\n### 1. 異次元、ウルトラビースト、ネクロズマ合体（2024年）\n\n![ウルトラホール（ウルトラスペース） (2024)](https://static.wikia.nocookie.net/pokemongo/images/c/c8/Special_Background_GoFest2024_Wormhole.png/revision/latest)\n• **ウルトラホール（ウルトラスペース）** (GO Fest 2024 グローバル＆ウルトラスペース)\n  - 背景モチーフ: 紫とシアンの光が渦巻くウルトラホールの次元の裂け目\n  - 入手方法: ウルトラビーストおよびネクロズマの星5レイド勝利時に確率で付与\n  - 対象ポケモン: Necrozma, Nihilego, Buzzwole, Pheromosa, Xurkitree, Celesteela, Kartana, Guzzlord, Blacephalon, Stakataka\n\n![日輪の輝き（ソーラー） (2024)](https://static.wikia.nocookie.net/pokemongo/images/c/c5/Special_Background_GoFest2024_Radiance.png/revision/latest)\n• **日輪の輝き（ソーラー）** (GO Fest 2024 スペシャルリサーチ)\n  - 背景モチーフ: 黄金の太陽フレアと燃え盛るコロナ\n  - 入手方法: GO Fest 2024限定スペシャルリサーチ完遂時に確定入手\n  - 対象ポケモン: Solgaleo\n\n![月輪の残光（ルナ） (2024)](https://static.wikia.nocookie.net/pokemongo/images/c/c5/Special_Background_GoFest2024_Radiance.png/revision/latest)\n• **月輪の残光（ルナ）** (GO Fest 2024 スペシャルリサーチ)\n  - 背景モチーフ: 深淵の宇宙に浮かぶ神秘的な三日月と星雲\n  - 入手方法: GO Fest 2024限定スペシャルリサーチ完遂時に確定入手\n  - 対象ポケモン: Lunala\n\n### 2. チームリーダー記念：ともに挑もう！（2024年）\n\n![チームヴァーラー（キャンデラの紅蓮） (2024)](https://static.wikia.nocookie.net/pokemongo/images/3/3c/Special_Background_Valor.png/revision/latest)\n• **チームヴァーラー（キャンデラの紅蓮）** (チームコラボ＆キャンデラのリサーチ)\n  - 背景モチーフ: 燃え盛る紅蓮の業火とチームヴァーラーの紋章\n  - 入手方法: チームヴァーラーのグローバルチャレンジ達成報酬\n  - 対象ポケモン: Ponyta, Moltres, Charmander, Cyndaquil, Torchic, Chimchar, Tepig, Fennekin, Litten, Scorbunny, Fuecoco\n\n![チームインスティンクト（スパークの電撃） (2024)](https://static.wikia.nocookie.net/pokemongo/images/6/6a/Special_Background_Instinct.png/revision/latest)\n• **チームインスティンクト（スパークの電撃）** (チームコラボ＆スパークのリサーチ)\n  - 背景モチーフ: 炸裂する黄金の稲妻とチームインスティンクトの紋章\n  - 入手方法: チームインスティンクトのグローバルチャレンジ達成報酬\n  - 対象ポケモン: Elekid, Zapdos, Bulbasaur, Chikorita, Treecko, Turtwig, Snivy, Chespin, Rowlet, Grookey, Sprigatito\n\n![チームミスティック（ブランシェの氷晶） (2024)](https://static.wikia.nocookie.net/pokemongo/images/0/00/Special_Background_Mystic.png/revision/latest)\n• **チームミスティック（ブランシェの氷晶）** (チームコラボ＆ブランシェのリサーチ)\n  - 背景モチーフ: 幾何学的な蒼氷の結晶とチームミスティックの紋章\n  - 入手方法: チームミスティックのグローバルチャレンジ達成報酬\n  - 対象ポケモン: Lapras, Articuno, Squirtle, Totodile, Mudkip, Piplup, Oshawott, Froakie, Popplio, Sobble, Quaxly\n\n### 3. 音波ディストーション＆コミュニティ・デイ（2024年）\n\n![ワイルドエリア・グローバル（ネオン音波） (2024)](https://static.wikia.nocookie.net/pokemongo/images/e/eb/Special_Background_GoWildArea2024.png/revision/latest)\n• **ワイルドエリア・グローバル（ネオン音波）** (GO ワイルドエリア：グローバル 2024)\n  - 背景モチーフ: 紫と黄色のパンクロック調ネオンイコライザー音波\n  - 入手方法: ワイルドエリア期間中のマックスバトルおよび星5レイド勝利時に確率ドロップ\n  - 対象ポケモン: Toxtricity, Kyogre-Primal, Groudon-Primal, Dialga-Origin, Palkia-Origin\n\n### 4. 季節の伝承、イッシュの陰陽、ガラル王権（2025年）\n\n![デュアルデスティニー（運命の双対） (2025)](https://static.wikia.nocookie.net/pokemongo/images/c/ce/Special_Background_DualDestiny.png/revision/latest)\n• **デュアルデスティニー（運命の双対）** (2025年冬 コミュニティ・デイ)\n  - 背景モチーフ: 青と紫のグラデーションで描かれる運命の交錯ライン\n  - 入手方法: デュアルデスティニー期コミュニティ・デイのリサーチ報酬\n  - 対象ポケモン: Sprigatito, Ralts, Karrablast, Shelmet\n\n![イッシュ・エニグマ（古代の謎） (2025)](https://static.wikia.nocookie.net/pokemongo/images/5/57/Special_Background_Enigma.png/revision/latest)\n• **イッシュ・エニグマ（古代の謎）** (GO Tour イッシュへの道)\n  - 背景モチーフ: 浮遊するイッシュ文字と夢の煙（ドリームミスト）の幻想的な霧\n  - 入手方法: イベント限定フィールドリサーチタスク達成で入手\n  - 対象ポケモン: Zorua, Sandile, Darumaka, Darmanitan, Timburr, Woobat, Sigilyph, Klink, Ferroseed\n\n![マイト＆マスタリー（剛力と武技） (2025)](https://static.wikia.nocookie.net/pokemongo/images/9/90/Special_Background_MightAndMastery.png/revision/latest)\n• **マイト＆マスタリー（剛力と武技）** (2025年春 コミュニティ・デイ＆バトルウィーク)\n  - 背景モチーフ: 闘志を象徴する深紅のオーラと黄金のエネルギー筆跡\n  - 入手方法: GOバトルウィークおよびコミュニティ・デイリサーチ完遂で入手\n  - 対象ポケモン: Fuecoco, Totodile, Vanillite, Pawmi, Meditite, Stunky, Mareanie, Charcadet, Machop\n\n![ディライトフルデイズ（輝く夏） (2025)](https://static.wikia.nocookie.net/pokemongo/images/8/85/Special_Background_DelightfulDays.png/revision/latest)\n• **ディライトフルデイズ（輝く夏）** (2025年夏 コミュニティ・デイ＆ウォーターフェス)\n  - 背景モチーフ: 夏のプリズム光線と水しぶきが舞うトロピカルな背景\n  - 入手方法: GO Passのティア進行およびウォーターフェスティバル報酬\n  - 対象ポケモン: Articuno, Zapdos, Moltres, Jangmo-o, Eevee, Lapras, Quaxly, Rillaboom, Cinderace, Inteleon, Rookidee\n\n![ソードバージョン（けんのおうザシアン） (2025)](https://static.wikia.nocookie.net/pokemongo/images/a/a4/Special_Background_GOFest_2025_Sword.png/revision/latest)\n• **ソードバージョン（けんのおうザシアン）** (GO Fest 2025 グローバル)\n  - 背景モチーフ: まどろみの森の神秘的な青霧と光り輝く宝剣の紋章\n  - 入手方法: GO Fest 2025グローバルでのザシアン星5レイド勝利時にドロップ\n  - 対象ポケモン: Zacian\n\n![マックスフィナーレ：漆黒の空（キョダイマックス） (2025)](https://static.wikia.nocookie.net/pokemongo/images/4/4f/Special_Background_Max_Finale.png/revision/latest)\n• **マックスフィナーレ：漆黒の空（キョダイマックス）** (GO Fest 2025 マックスフィナーレ)\n  - 背景モチーフ: 紅のダイマックス雲が渦巻く暗黒の空と巨大な光柱\n  - 入手方法: マックスフィナーレ期間中のキョダイマックスバトル勝利で確率入手\n  - 対象ポケモン: Venusaur, Charizard, Blastoise, Gengar, Snorlax, Machamp, Kingler, Lapras, Toxtricity\n\n![変革の物語（レジェンズZ-A前夜） (2025)](https://static.wikia.nocookie.net/pokemongo/images/2/20/Special_Background_Tales_of_Transformation.png/revision/latest)\n• **変革の物語（レジェンズZ-A前夜）** (2025年秋 レジェンズZ-A記念＆コミュデイ)\n  - 背景モチーフ: エメラルドのジガルデ・セルと幾何学的クリスタルの煌めき\n  - 入手方法: 秋のGO Pass達成およびZ-A記念リサーチ完遂で入手\n  - 対象ポケモン: Cobalion, Terrakion, Virizion, Flabebe, Solosis, Chikorita, Totodile, Tepig, Pikipek\n\n![ワイルドエリア・グローバル 2025 (2025)](https://static.wikia.nocookie.net/pokemongo/images/e/e9/Special_Background_Wild_Area_Global_2025.png/revision/latest)\n• **ワイルドエリア・グローバル 2025** (GO ワイルドエリア 2025（2025年11月）)\n  - 背景モチーフ: 守り神カプのトーテム光と荒れ狂う自然嵐が渦巻く野生背景\n  - 入手方法: ワイルドエリア2025期間中の星5レイド勝利時に確率ドロップ\n  - 対象ポケモン: Lugia, Ho-Oh, Tapu Koko, Tapu Lele, Tapu Bulu, Tapu Fini, Darkrai, Bewear, Grimmsnarl\n\n![ポケモンコンシェルジュ（南国リゾート） (2025)](https://static.wikia.nocookie.net/pokemongo/images/b/bd/Special_Background_Concierge.png/revision/latest)\n• **ポケモンコンシェルジュ（南国リゾート）** (ポケモンコンシェルジュ配信記念イベント)\n  - 背景モチーフ: ストップモーション調の南国リゾート、ヤシの木、プルメリアとプールサイド\n  - 入手方法: ポケモンコンシェルジュ公開記念タイムチャレンジ完遂で確定入手\n  - 対象ポケモン: Psyduck\n\n### 5. メガDNA、動的反応型オーラ、10周年記念（2026年）\n\n![2026年 コミュニティ・デイ (2026)](https://static.wikia.nocookie.net/pokemongo/images/0/09/Special_Background_Community_2026.png/revision/latest)\n• **2026年 コミュニティ・デイ** (2026年コミュニティ・デイ シリーズ)\n  - 背景モチーフ: 2026年を象徴する幾何学的な光条ときらめくスターダスト\n  - 入手方法: 2026年コミュニティ・デイ限定スペシャルリサーチ達成報酬\n  - 対象ポケモン: Piplup, Grookey, Vulpix, Scorbunny, Tinkatink, Lechonk, Deino, Frigibax, Sobble, Gible\n\n![月夜の宴（中秋の名月 2026） (2026)](https://static.wikia.nocookie.net/pokemongo/images/d/d7/Special_Background_Dancing_in_the_Moonlight_2026.png/revision/latest)\n• **月夜の宴（中秋の名月 2026）** (お月見イベント：月夜の宴（2026年9月）)\n  - 背景モチーフ: 満月の月光に照らされる提灯、金木犀の花びら、夜空に煌めく流れ星\n  - 入手方法: 中秋の名月を祝う限定タイムチャレンジ達成で100%入手\n  - 対象ポケモン: Clefairy",
            "ru": "Полный каталог всех 31 глобальных специальных фонов в Pokémon GO с 2024 по 2026 год. В отличие от карточек городов, эти фоны доступны тренерам по всему миру без необходимости путешествовать, и их МОЖНО получить через дистанционные рейды (Remote Raids) во время глобальных событий!\n\n### 1. Космические измерения, Ультра-чудовища и слияния Некрозмы (2024)\n\n![Ultra Space (Червоточина) (2024)](https://static.wikia.nocookie.net/pokemongo/images/c/c8/Special_Background_GoFest2024_Wormhole.png/revision/latest)\n• **Ultra Space (Червоточина)** (GO Fest 2024 Global)\n  - Мотив фона: Вращающаяся червоточина Ultra Space с фиолетово-лазурными космическими вихрями\n  - Как получить: Случайный шанс в 5-звездочных рейдах на Ultra Beasts и Necrozma\n  - Покемоны: Necrozma, Nihilego, Buzzwole, Pheromosa, Xurkitree, Celesteela, Kartana, Guzzlord, Blacephalon, Stakataka\n\n![Radiant Sunburst (2024)](https://static.wikia.nocookie.net/pokemongo/images/c/c5/Special_Background_GoFest2024_Radiance.png/revision/latest)\n• **Radiant Sunburst** (GO Fest 2024 Special Research)\n  - Мотив фона: Золотая солнечная корона с пульсирующими протуберанцами\n  - Как получить: Гарантированная награда за прохождение специального квеста GO Fest 2024\n  - Покемоны: Solgaleo\n\n![Luminescent Moon (2024)](https://static.wikia.nocookie.net/pokemongo/images/c/c5/Special_Background_GoFest2024_Radiance.png/revision/latest)\n• **Luminescent Moon** (GO Fest 2024 Special Research)\n  - Мотив фона: Светящийся полумесяц среди глубоких туманностей и звезд\n  - Как получить: Гарантированная награда за прохождение специального квеста GO Fest 2024\n  - Покемоны: Lunala\n\n### 2. Испытания лидеров команд: Triumph Together (2024)\n\n![Team Valor (Пламя Кандели) (2024)](https://static.wikia.nocookie.net/pokemongo/images/3/3c/Special_Background_Valor.png/revision/latest)\n• **Team Valor (Пламя Кандели)** (Triumph Together и Candela's Quest)\n  - Мотив фона: Пылающее пламя, угли и эмблема Team Valor\n  - Как получить: Награда за глобальные испытания Team Valor\n  - Покемоны: Ponyta, Moltres, Charmander, Cyndaquil, Torchic, Chimchar, Tepig, Fennekin, Litten, Scorbunny, Fuecoco\n\n![Team Instinct (Молнии Спарка) (2024)](https://static.wikia.nocookie.net/pokemongo/images/6/6a/Special_Background_Instinct.png/revision/latest)\n• **Team Instinct (Молнии Спарка)** (Triumph Together и Spark's Quest)\n  - Мотив фона: Золотые молнии, электрические разряды и эмблема Team Instinct\n  - Как получить: Награда за глобальные испытания Team Instinct\n  - Покемоны: Elekid, Zapdos, Bulbasaur, Chikorita, Treecko, Turtwig, Snivy, Chespin, Rowlet, Grookey, Sprigatito\n\n![Team Mystic (Кристаллы Бланш) (2024)](https://static.wikia.nocookie.net/pokemongo/images/0/00/Special_Background_Mystic.png/revision/latest)\n• **Team Mystic (Кристаллы Бланш)** (Triumph Together и Blanche's Quest)\n  - Мотив фона: Лазурные ледяные кристаллы, морозный блеск и эмблема Team Mystic\n  - Как получить: Награда за глобальные испытания Team Mystic\n  - Покемоны: Lapras, Articuno, Squirtle, Totodile, Mudkip, Piplup, Oshawott, Froakie, Popplio, Sobble, Quaxly\n\n### 3. Звуковые волны и арена Community Day (2024)\n\n![Wild Area Global (2024)](https://static.wikia.nocookie.net/pokemongo/images/e/eb/Special_Background_GoWildArea2024.png/revision/latest)\n• **Wild Area Global** (Wild Area Global 2024)\n  - Мотив фона: Неоновые звуковые волны в фиолетово-желтом панк-стиле\n  - Как получить: Случайный дроп из Max Battles и 5★ рейдов во время Wild Area Global\n  - Покемоны: Toxtricity, Kyogre-Primal, Groudon-Primal, Dialga-Origin, Palkia-Origin\n\n### 4. Сезонные легенды, Инь и Ян Иновы и королевский Галар (2025)\n\n![Dual Destiny Season (2025)](https://static.wikia.nocookie.net/pokemongo/images/c/ce/Special_Background_DualDestiny.png/revision/latest)\n• **Dual Destiny Season** (Dual Destiny Community Days 2025)\n  - Мотив фона: Переплетенные нити судьбы в сине-фиолетовых градиентах\n  - Как получить: Награда за платный квест Community Day сезона Dual Destiny\n  - Покемоны: Sprigatito, Ralts, Karrablast, Shelmet\n\n![Unova Enigma (2025)](https://static.wikia.nocookie.net/pokemongo/images/5/57/Special_Background_Enigma.png/revision/latest)\n• **Unova Enigma** (Road to Unova)\n  - Мотив фона: Лавандовый туман с плавающими древними рунами Иновы\n  - Как получить: Выполнение полевых квестов во время GO Tour Unova\n  - Покемоны: Zorua, Sandile, Darumaka, Darmanitan, Timburr, Woobat, Sigilyph, Klink, Ferroseed\n\n![Might and Mastery Season (2025)](https://static.wikia.nocookie.net/pokemongo/images/9/90/Special_Background_MightAndMastery.png/revision/latest)\n• **Might and Mastery Season** (Might and Mastery 2025)\n  - Мотив фона: Багровая боевая аура и золотые штрихи энергии\n  - Как получить: Награды за GO Battle Week и квесты Community Day\n  - Покемоны: Fuecoco, Totodile, Vanillite, Pawmi, Meditite, Stunky, Mareanie, Charcadet, Machop\n\n![Delightful Days Season (2025)](https://static.wikia.nocookie.net/pokemongo/images/8/85/Special_Background_DelightfulDays.png/revision/latest)\n• **Delightful Days Season** (Delightful Days 2025)\n  - Мотив фона: Тропические солнечные лучи и брызги воды\n  - Как получить: Прогресс в летнем GO Pass и квестах Water Festival\n  - Покемоны: Articuno, Zapdos, Moltres, Jangmo-o, Eevee, Lapras, Quaxly, Rillaboom, Cinderace, Inteleon, Rookidee\n\n![Sword Version (Zacian) (2025)](https://static.wikia.nocookie.net/pokemongo/images/a/a4/Special_Background_GOFest_2025_Sword.png/revision/latest)\n• **Sword Version (Zacian)** (GO Fest 2025 Global)\n  - Мотив фона: Туман Slumbering Weald с сияющими эмблемами королевского меча\n  - Как получить: Шанс в 5★ рейдах на Crowned Zacian во время GO Fest 2025\n  - Покемоны: Zacian\n\n![Max Finale: Dark Skies (2025)](https://static.wikia.nocookie.net/pokemongo/images/4/4f/Special_Background_Max_Finale.png/revision/latest)\n• **Max Finale: Dark Skies** (Max Finale 2025)\n  - Мотив фона: Грозовое фиолетовое небо с алыми вихрями Dynamax облаков\n  - Как получить: Победа в 6★ Gigantamax битвах на фестивале Max Finale\n  - Покемоны: Venusaur, Charizard, Blastoise, Gengar, Snorlax, Machamp, Kingler, Lapras, Toxtricity\n\n![Tales of Transformation (2025)](https://static.wikia.nocookie.net/pokemongo/images/2/20/Special_Background_Tales_of_Transformation.png/revision/latest)\n• **Tales of Transformation** (Tales of Transformation 2025)\n  - Мотив фона: Кристаллический призматический свет и изумрудные гексагоны Зайгарда\n  - Как получить: Награда за осенний GO Pass и квесты по мотивам Legends: Z-A\n  - Покемоны: Cobalion, Terrakion, Virizion, Flabebe, Solosis, Chikorita, Totodile, Tepig, Pikipek\n\n![Wild Area Global 2025 (2025)](https://static.wikia.nocookie.net/pokemongo/images/e/e9/Special_Background_Wild_Area_Global_2025.png/revision/latest)\n• **Wild Area Global 2025** (Wild Area Global 2025)\n  - Мотив фона: Буря первозданной природы с сияющей тотемной энергией Тапу\n  - Как получить: Шанс в рейдах на Лугию, Хо-Ох и Тапу на Wild Area 2025\n  - Покемоны: Lugia, Ho-Oh, Tapu Koko, Tapu Lele, Tapu Bulu, Tapu Fini, Darkrai, Bewear, Grimmsnarl\n\n![Pokémon Concierge (2025)](https://static.wikia.nocookie.net/pokemongo/images/b/bd/Special_Background_Concierge.png/revision/latest)\n• **Pokémon Concierge** (Pokémon Concierge Celebration)\n  - Мотив фона: Тропический островной курорт с шезлонгами и бирюзовым бассейном\n  - Как получить: Выполнение праздничного квеста Pokémon Concierge\n  - Покемоны: Psyduck\n\n### 5. Эра Мега-ДНК, динамическая реактивная аура и 10-летие (2026)\n\n![Community Days 2026 (2026)](https://static.wikia.nocookie.net/pokemongo/images/0/09/Special_Background_Community_2026.png/revision/latest)\n• **Community Days 2026** (Community Days 2026)\n  - Мотив фона: Геометрические звездные лучи и праздничные частицы\n  - Как получить: Награда за квесты Community Day в 2026 году\n  - Покемоны: Piplup, Grookey, Vulpix, Scorbunny, Tinkatink, Lechonk, Deino, Frigibax, Sobble, Gible\n\n![Dancing in the Moonlight 2026 (2026)](https://static.wikia.nocookie.net/pokemongo/images/d/d7/Special_Background_Dancing_in_the_Moonlight_2026.png/revision/latest)\n• **Dancing in the Moonlight 2026** (Dancing in the Moonlight 2026)\n  - Мотив фона: Полная луна, праздничные фонари, лепестки османтуса и звездная пыль\n  - Как получить: Выполнение осеннего квеста к празднику полнолуния\n  - Покемоны: Clefairy"
      },
      "tips": {
            "cs": [
                  "Globální speciální pozadí lze získat i přes Remote Raid Passy, pokud je dané globální eventové okno aktivní!",
                  "Pro rychlé vyhledání všech globálních speciálních pozadí zadejte do herního filtru klíčové slovo 'specialbackground'.",
                  "Při fúzi s Necrozmou nebo Kyuremem sledujte genetiku pozadí — zkombinováním dvou speciálních pozadí vznikají unikátní zatmění!"
            ],
            "en": [
                  "Global Special Backgrounds CAN drop from Remote Raids during official global active windows!",
                  "Search 'specialbackground' in the in-game search bar to instantly isolate your global thematic card collection.",
                  "Pay attention to fusion genetics with Necrozma and Kyurem — combining two special backgrounds unlocks exclusive Eclipse resonance!"
            ],
            "ja": [
                  "グローバルスペシャル背景は、開催期間中であればリモートレイドでもドロップ判定があります！",
                  "ゲーム内の検索バーに「specialbackground」と入力すると、グローバル背景持ちを一括検索できます。",
                  "ネクロズマやキュレムの合体時は背景遺伝に注目しましょう。背景持ち同士を合体させると限定の日食・月食背景が誕生します！"
            ],
            "ru": [
                  "Глобальные фоны МОГУТ выпадать при дистанционных рейдах во время глобальных ивентов!",
                  "Используйте фильтр 'specialbackground' в игре для мгновенного просмотра всей коллекции глобальных фонов.",
                  "Обращайте внимание на генетику слияний Некрозмы и Кюрема — два специальных фона дают уникальный резонанс Затмения!"
            ]
      },
      "pokemon": [
            "Necrozma",
            "Nihilego",
            "Buzzwole",
            "Pheromosa",
            "Xurkitree",
            "Celesteela",
            "Kartana",
            "Guzzlord",
            "Blacephalon",
            "Stakataka",
            "Solgaleo",
            "Lunala",
            "Necrozma-Dusk-Mane",
            "Necrozma-Dawn-Wings",
            "Ponyta",
            "Moltres",
            "Charmander",
            "Cyndaquil",
            "Torchic",
            "Chimchar",
            "Tepig",
            "Fennekin",
            "Litten",
            "Scorbunny",
            "Fuecoco",
            "Elekid",
            "Zapdos",
            "Bulbasaur",
            "Chikorita",
            "Treecko",
            "Turtwig",
            "Snivy"
      ]
},
      {
        id: "fusion-genetics-necrozma-kyurem",
        heading: {
          cs: "5. Genetika fúzních pozadí (Dusk Mane, Dawn Wings, Black & White Kyurem)",
          en: "5. Fusion Background Genetics (Dusk Mane, Dawn Wings, Black & White Kyurem)",
          ja: "5. 合体ポケモンの背景遺伝ルール（ネクロズマ＆キュレム）",
          ru: "5. Генетика фонов при слиянии (Dusk Mane, Dawn Wings, Black & White Kyurem)"
        },
        content: {
          cs: "Mechanika fúze Pokémonů (Dusk Mane & Dawn Wings Necrozma, Black & White Kyurem) má unikátní dědičná pravidla pro pozadí:\n\n1. Princip primárního hostitele (The Host Principle):\nVýsledná forma fúze je technicky formou Necrozmy (nebo Kyuremu). Veškeré staty (IV, Shiny, Lucky) a základní pozadí se odvozují z hostitelské Necrozmy (Solgaleo/Lunala slouží jako fúzní katalyzátor).\n\n2. Matice kombinací pozadí u Necrozmy:\n• Scénář A (Wormhole Necrozma + Sun Solgaleo nebo Moon Lunala):\n➔ DOCHÁZÍ K FÚZNÍ REZONANCI! Vzniká exkluzivní pozadí Zatmění Slunce (Solar Eclipse) u Dusk Mane nebo Zatmění Měsíce (Lunar Eclipse) u Dawn Wings, které mistrně mísí sluneční/měsíční záři s fialovou červí dírou!\n• Scénář B (Městská karta Necrozmy, např. Sendai/Madrid/NYC + Sun/Moon):\n➔ Městská lokační karta má přednost! Fúzní forma si zachová původní panorama města.\n• Scénář C (Běžná Necrozma bez pozadí + Sun/Moon s pozadím):\n➔ Pozadí je potlačeno. Výsledný Pokémon pozadí nemá.\n• Scénář D (Wormhole Necrozma + partner bez pozadí):\n➔ Zůstává základní Ultra Space Wormhole pozadí bez efektu zatmění.\n\n3. Černý a Bílý Kyurem:\nU Black & White Kyuremu se fúzní pozadí odemkne pouze tehdy, pokud spojíte Kyurema nesoucího speciální pozadí s protilehlým Zekromem nebo Reshiramem, který rovněž nese speciální pozadí.\n\n4. 100% obousměrná reverzibilita (Unfuse):\nRozpojení fúze (které je zcela zdarma a nestojí žádné suroviny) okamžitě vrátí oba Pokémony do vašeho Pokémon Boxu s jejich původními, nezměněnými pozadími!",
          en: "Pokémon Fusion mechanics (Dusk Mane & Dawn Wings Necrozma, Black & White Kyurem) operate on complex genetic inheritance rules for backgrounds:\n\n1. The Primary Host Principle:\nThe fused entity is structurally an alternate forme of the Primary Host (Necrozma or Kyurem). All IVs, Shiny/Lucky status, and baseline background inheritance stems strictly from the Host (Solgaleo/Lunala acts as fusion fuel).\n\n2. Necrozma Fusion Inheritance Matrix:\n• Scenario A (Wormhole Necrozma + Sun Solgaleo or Moon Lunala):\n➔ FUSION RESONANCE! Produces the exclusive Solar Eclipse (Dusk Mane) or Lunar Eclipse (Dawn Wings) fusion background blending cosmic rays with the violet rift!\n• Scenario B (City Location Card Necrozma, e.g. Sendai/Madrid/NYC + Sun/Moon partner):\n➔ The City Location Card takes strict precedence! The fused form proudly retains its physical city skyline.\n• Scenario C (Plain Necrozma without background + Sun/Moon partner):\n➔ Background is suppressed. The fused entity displays standard typing backdrops.\n• Scenario D (Wormhole Necrozma + partner without background):\n➔ Retains standard Ultra Space Wormhole without eclipse resonance.\n\n3. Black & White Kyurem Ideological Pairing:\nFor Black & White Kyurem, the fused variant background unlocks strictly when pairing a Kyurem carrying a Special Background with an opposite-ideology Zekrom or Reshiram also carrying a Special Background.\n\n4. 100% Safe Reversibility (Unfuse):\nSeparating a fused Pokémon (which costs 0 Energy and 0 Candy) instantly restores both individual Pokémon to your storage with their original, individual backgrounds completely intact!",
          ja: "合体システム（日食／月食ネクロズマ、ブラック／ホワイトキュレム）には、背景の遺伝に関する極めて緻密なルールが存在します：\n\n1. ベース個体（ホスト）優先の原則：\n合体後のポケモンは、システム上「ネクロズマ（またはキュレム）」のフォルムチェンジとして扱われます。個体値、色違い、キラ状態、そして基本背景はすべてベースとなったネクロズマから100%引き継がれます。\n\n2. ネクロズマ合体背景の決定マトリクス：\n• パターンA（ウルトラホール背景ネクロズマ ＋ 太陽ソルガレオ／月ルナアーラ）：\n➔「背景の共鳴融合」が発生！日食ネクロズマは【日食ウルトラホール背景】、月食ネクロズマは【月食ウルトラホール背景】という超限定の合体背景へと進化します！\n• パターンB（都市限定ロケーションカード持ちネクロズマ ＋ 太陽／月）：\n➔ 都市ロケーションカードが最優先されます！仙台・マドリード・NYCなどの都市背景がそのまま維持されます。\n• パターンC（背景なしネクロズマ ＋ 背景あり太陽／月）：\n➔ 背景は反映されません（通常背景になります）。\n• パターンD（ウルトラホール背景ネクロズマ ＋ 背景なし太陽／月）：\n➔ 通常のウルトラホール背景がそのまま維持されます。\n\n3. ブラック＆ホワイトキュレムの対立条件：\nキュレムの合体背景は、スペシャル背景持ちのキュレムに対し、対になるイデオロギー背景を持ったゼクロム／レシラムを合体させた場合のみ解放されます。\n\n4. いつでも安全に分離（Unfuse）可能：\n合体解除にはエナジーやアメなどのコストは一切かかりません。分離すると、両方のポケモンが元の個別背景を保持したままボックスに戻ります！",
          ru: "Механика слияния покемонов подчиняется строгим законам генетики фонов:\n\n1. Принцип первичного хоста:\nСлитая форма — это форма Necrozma (или Kyurem). Все характеристики (IV, Шайни, Лаки) и фоны определяются хостом.\n\n2. Матрица наследования фонов Некрозмы:\n• Сценарий А (Червоточина Necrozma + Солнце Solgaleo / Луна Lunala):\n➔ РЕЗОНАНС СЛИЯНИЯ! Открывается эксклюзивный фон Солнечного (Solar Eclipse) или Лунного затмения (Lunar Eclipse)!\n• Сценарий Б (Городская карточка Necrozma + Солнце/Луна):\n➔ Городская карточка берет приоритет (сохраняется Сендай, Мадрид, NYC и т.д.).\n• Сценарий В (Обычная Necrozma без фона + партнер с фоном):\n➔ Фон не отображается.\n• Сценарий Г (Червоточина Necrozma + партнер без фона):\n➔ Сохраняется обычная червоточина без затмения.\n\n3. Черный и Белый Кюрем:\nФон слияния у Kyurem активируется только при слиянии особого Kyurem с противоположным Reshiram или Zekrom с особым фоном.\n\n4. Бесплатное разделение (Unfuse):\nРазделение покемонов бесплатно и возвращает обоих покемонов с их оригинальными фонами в целости и сохранности!"
        },
        tips: {
          cs: [
            "Pokud chcete získat nejvzácnější Solar/Lunar Eclipse pozadí, ujistěte se, že oba fúzní partneři mají speciální pozadí!",
            "Rozdělení fúze můžete provést kdykoliv bez obav ze ztráty pozadí."
          ],
          en: [
            "To unlock the elusive Solar or Lunar Eclipse fusion backdrop, verify both fusion partners carry special backgrounds!",
            "Unfusing is always 100% free and completely risk-free for backgrounds."
          ],
          ja: [
            "最も貴重な「日食・月食ウルトラホール背景」を作りたい場合は、ネクロズマと合体相手の両方に背景が付いていることを確認しましょう！",
            "合体解除は完全無料で行えるため、いつでも元の個別背景に戻せます。"
          ],
          ru: [
            "Для получения фона Затмения (Solar/Lunar Eclipse) убедитесь, что оба покемона имеют специальные фоны!",
            "Разделение бесплатно и безопасно для фонов."
          ]
        },
        pokemon: ["Necrozma-Dusk-Mane", "Necrozma-Dawn-Wings", "Kyurem", "Zekrom", "Reshiram"]
      }
    ]
  },
  {
    "id": "trainer-level-rewards-tasks-guide",
    "slug": "trainer-level-rewards-tasks-guide",
    "iconName": "Award",
    "imageUrl": "/icons/trainer-xp-badge.svg",
    "featured": true,
    "author": "PoGo Events Team",
    "readTime": "16 min",
    "updatedAt": "2026-10-17",
    "category": {
      "cs": "Levely & XP",
      "en": "Levels & XP",
      "ja": "レベル＆XP",
      "ru": "Уровни и XP"
    },
    "title": {
      "cs": "Pokémon GO Úrovně Trenéra 1–80: Kompletní přehled odměn, XP a úkolů",
      "en": "Pokémon GO Trainer Levels 1–80: Complete Rewards, XP & Tasks Guide",
      "ja": "Pokémon GO トレーナーレベル1〜80：報酬・必要XP・レベルアップタスク完全攻略",
      "ru": "Уровни тренера в Pokémon GO 1–80: Полный гайд по наградам, XP и квестам"
    },
    "subtitle": {
      "cs": "Vše o novém systému úrovní 1 až 80, interaktivní checklist úkolů pro levely 71 až 80, blueprint pro 50 platinových medailí a nejlepší způsoby farmení XP.",
      "en": "Complete breakdown of all 80 trainer levels, interactive task checklist for levels 71 to 80, 50 Platinum medals master blueprint, and fastest XP farming methods.",
      "ja": "全80レベルの必要XPとアンロック報酬、レベル71〜80の過酷なタスク攻略法、最速でプラチナメダル50個を獲得するロードマップを徹底解説。",
      "ru": "Полный разбор всех 80 уровней, квестов 71–80 уровней, интерактивный чек-лист, стратегия получения 50 платиновых медалей и лучшие способы фарма XP."
    },
    "sections": [
      {
        "id": "trainer-levels-overview-system",
        "heading": {
          "cs": "1. Přehled systému úrovní 1 až 80 a moderní pravidla postupu",
          "en": "1. Overview of Trainer Levels 1–80 & Modern Progression Rules",
          "ja": "1. トレーナーレベル1〜80の新システムと進行ルール概要",
          "ru": "1. Обзор системы уровней 1–80 и современные правила прокачки"
        },
        "content": {
          "cs": "V říjnu 2025 prošel Pokémon GO zásadní reformou úrovní trenéra. Maximální hranice byla navýšena z původního levelu 50 až na velkolepý Level 80. Tato změna přinesla nejen masivní navýšení potřebných zkušeností, ale také klíčové zjednodušení dřívějšího systému.\n\nZatímco ve starém systému museli trenéři plnit speciální úkoly již od levelu 41, v moderním systému od levelu 1 až do levelu 70 postupujete čistě sběrem zkušeností XP. Teprve po dosažení levelu 70 se aktivuje finální výzva v podobě deseti nejvyšších úrovní (Level 71 až 80), kde každý jednotlivý level vyžaduje kromě milionů XP také splnění 4 náročných úkolů.\n\nPro přehlednost dělíme celý systém do tří přirozených bloků:\n• Level 1–40: Klasická základní cesta, během které odemykáte základní herní funkce jako líhnutí vajec, tělocvičny, raidové bitvy, Mega evoluce a systém Candy XL pro posilování pokémonů. Celkem vyžaduje 20 milionů XP.\n• Level 41–70: Pokročilá fáze trenérského růstu založená čistě na soustavném sběru XP. Zde získáváte luxusní odměny v podobě bezplatných inkubátorů, prémiových battle passů a rozšíření inventáře i kapacity pokémonů.\n• Level 71–80: Vrcholový obsah hry. Zde musíte splnit celkem 40 unikátních Level-Up úkolů, nasbírat 50 platinových medailí a nashromáždit celkem přes 203 milionů XP. Za odměnu získáte prestižní oblečení avatara, Master Bally a finální bundu Level 80 Circuit Master.",
          "en": "In October 2025, Pokémon GO underwent a massive trainer progression overhaul, expanding the level cap from level 50 up to the grand Level 80. This redesign streamlined early advancement while establishing a colossal endgame challenge.\n\nUnlike the previous framework where tasks began at level 41, levels 1 through 70 now advance strictly through cumulative XP. Once you reach level 70, the ultimate trials unlock: levels 71 through 80 each demand massive XP along with completing 4 demanding Level-Up Tasks per tier (40 tasks total).\n\nProgression is structured into three clean blocks:\n• Level 1–40: Foundational journey unlocking essential mechanics: egg hatching, Gyms, Raids, Mega Evolution, and the Candy XL system. Requires 20,000,000 XP in total.\n• Level 41–70: Intermediate mastery focused entirely on steady XP grinding without mandatory chore bottlenecks. Grants rich supplies of incubators, raid passes, and permanent item and Pokémon storage expansions.\n• Level 71–80: The ultimate endgame. Requires conquering 40 rigorous Level-Up tasks, securing 50 Platinum medals, and amassing over 203,353,000 XP. Rewards include prestigious avatar apparel, Master Balls, and the legendary Level 80 Circuit Master jacket.",
          "ja": "2025年10月、Pokémon GOのトレーナーレベルシステムが刷新され、上限が従来のLv50から前代未聞の【レベル80】へと拡張されました。\n\n以前はレベル41から課されていた「レベルアップタスク」が撤廃され、レベル1からレベル70までは純粋な【獲得XPのみ】でスムーズに昇格できるようになりました。そしてレベル70に到達した真のベテランにのみ、最後の壁となるレベル71〜80の過酷なタスク（各4個、計40個）が立ちはだかります。\n\nレベル進行は分かりやすく3つの区分に分かれています：\n• Level 1–40：ジム、レイドバトル、メガシンカ、アメXLなどの全基本システムが順次解禁される育成期。累計2,000万XP。\n• Level 41–70：タスク縛りがなく、純粋なXP稼ぎに専念できる充実期。ふかそうちやプレミアムパス、バッグ・ボックス枠の無料拡張が多数配布されます。\n• Level 71–80：最高峰のエンドコンテンツ。計40個の高難度タスクとプラチナメダル50個、累計2億335万XPが必要。限定アバター衣装やマスターボール、Lv80限定ジャケットが授与されます。",
          "ru": "В октябре 2025 года система уровней в Pokémon GO получила масштабное обновление: потолок прокачки вырос с 50 до грандиозного 80 уровня.\n\nКвесты больше не требуются на уровнях 41–70: теперь прокачка с 1 по 70 уровень идет исключительно за счет накопления опыта XP. Лишь по достижении 70 уровня открывается эндгейм: уровни с 71 по 80 требуют не только миллионы XP, но и выполнение 4 сложнейших заданий на каждом уровне (всего 40 заданий).\n\nСистема делится на три понятных блока:\n• Уровни 1–40: Базовый этап, открывающий гимы, рейды, мега-эволюции и механику Candy XL. Требует 20 000 000 XP.\n• Уровни 41–70: Продвинутый этап чистого набора XP без принудительных квестов. Дает ценные награды: инкубаторы, рейдовые пасы и расширения инвентаря.\n• Уровни 71–80: Главный вызов игры. Требует 40 испытаний, 50 платиновых медалей и свыше 203 миллионов XP. Награды включают элитные вещи аватара, Master Ball и куртку 80 уровня."
        },
        "tips": {
          "cs": [
            "XP se v Pokémon GO nikdy neztrácí: veškeré přebytečné zkušenosti se neustále střádají na vašem profilu i před splněním úkolů.",
            "Úkoly pro levely 71 až 80 se začínají započítávat až ve chvíli, kdy na daný level vstoupíte. Jedinou výjimkou jsou platinové medaile, které hra započítává retrospektivně.",
            "Využijte náš interaktivní filtr níže pro okamžité vyhledání odměn a požadavků pro kterýkoliv konkrétní level."
          ],
          "en": [
            "XP in Pokémon GO is never wasted: surplus experience continues accumulating seamlessly on your trainer profile even if tasks are incomplete.",
            "Level 71–80 tasks begin tracking progress only upon reaching that specific level tier, with the sole exception of Platinum medals which track cumulatively.",
            "Use the interactive level browser below to filter levels, view rewards, and inspect unlocks instantly."
          ],
          "ja": [
            "獲得したXPは決して無駄になりません。タスク未達成でも超過したXPは裏でそのまま蓄積され続けます。",
            "レベル71〜80の各タスクは、そのレベルに到達した瞬間にカウントが始まります（プラチナメダルのみ過去の獲得数が自動で反映されます）。",
            "下記のインタラクティブ一覧を使って、気になるレベルの必要XPや解禁アイテムを検索してみてください。"
          ],
          "ru": [
            "Опыт XP никогда не теряется: излишки накапливаются в профиле даже если квесты уровня еще не закрыты.",
            "Задания уровней 71–80 начинают считаться только при вступлении на этот уровень (кроме платиновых медалей, которые учитываются за все время).",
            "Используйте интерактивный виджет ниже для быстрого просмотра наград любого уровня."
          ]
        }
      },
      {
        "id": "trainer-levels-tasks-breakdown-71-80",
        "heading": {
          "cs": "2. Rozbor Level-Up úkolů pro úrovně 71 až 80 a tipy na splnění",
          "en": "2. In-Depth Breakdown of Level 71–80 Tasks & Completion Strategies",
          "ja": "2. レベル71〜80のレベルアップタスク詳細解説と最速達成テクニック",
          "ru": "2. Разбор квестов 71–80 уровней и секреты быстрого прохождения"
        },
        "content": {
          "cs": "Deset závěrečných úrovní přináší 40 pečlivě navržených výzev, které prověří všechny aspekty vašeho hraní: od házení přes bojovou připravenost až po chůzi v reálném světě.\n\nKlíčové skupiny úkolů a jak je zvládnout nejrychleji:\n• Počty chycených pokémonů v jednom dni (Level 71 vyžaduje 100 pokémonů, Level 76 vyžaduje 200 pokémonů):\nNejlepší příležitostí je měsíční Community Day trvající tři hodiny, úterní Spotlight Hour nebo procházka s aktivním Daily Incense a přenosným auto-catcherem. Použitím triku s rychlým chytáním (Fast Catch trick) chytíte 100 pokémonů za necelých 25 minut.\n\n• Úkoly na házení míčků (999 Nice na Lvl 71, 999 Great na Lvl 75, 999 Excellent na Lvl 80):\nZatímco Nice a Great hody splníte běžným každodenním chytáním, 999 Excellent hodů na levelu 80 vyžaduje správnou taktiku. Zaměřte se na legendární raid bossy s velkým cílovým kruhem jako Groudon, Kyogre nebo Necrozma. Pokud jim hodíte Nanab Berry, boss se přestane pohybovat a každý zakřivený míček s jistotou trefí střed.\n\n• Buddy srdíčka (400 srdcí na Level 78):\nNemusíte čekat měsíce ani nachodit stovky kilometrů. Hra umožňuje vyměnit až 20 buddies za den. U každého z nich stačí provést 3 rychlé akce: nakrmit 3 bobulemi, pohladit a vyfotit. Tím získáte 3 srdíčka na jednoho pokémona. S 20 výměnami denně tak nasbíráte 60 srdcí za pouhých 10 minut bez jediného kroku!\n\n• Očišťování stínových pokémonů (100 kousků na Level 73):\nUšetřete si Stardust. Očišťujte výhradně pokémony s nejnižším nákladem 1 000 Stardustu jako Zubat, Rattata, Pidgey, Magikarp, Weedle a Foongus. Nikdy neočišťujte pokémony s cenou 3 000 nebo 5 000 Stardustu, pokud je nepotřebujete pro boj.\n\n• Posilování pokémonů na maximální Level 50 (Level 73 vyžaduje 3 pokémony, Level 77 vyžaduje 7 pokémonů):\nK posílení na Level 50 potřebujete 296 Candy XL na každého pokémona. Zcela zdarma můžete získat neomezené množství Candy XL pro Melmetala díky otevírání Mystery Boxu každé 3 dny. Další skvělou volbou jsou pokémoni z minulých Community Days, kde jste během tří hodin nasbírali stovky XL bonbónů.",
          "en": "The final ten tiers present 40 meticulously designed trials testing every dimension of your gameplay: throwing accuracy, battle acumen, social cooperation, and physical exploration.\n\nKey Task Categories & Optimization Playbooks:\n• Single-Day Catch Marathons (Catch 100 on Lvl 71, Catch 200 on Lvl 76):\nSchedule these during the 3-hour monthly Community Day or Tuesday Spotlight Hour. Utilizing the Fast Catch technique allows catching 100 Pokémon in under 25 minutes.\n\n• Precision Throwing Trials (999 Nice on Lvl 71, 999 Great on Lvl 75, 999 Excellent on Lvl 80):\nWhile Nice and Great throws complete naturally, 999 Excellent throws at Level 80 demands targeted play. Target 5★ Legendary raid bosses with expansive catch circles like Groudon, Kyogre, and Necrozma. Calming bosses with Nanab Berries guarantees reliable Excellent precision.\n\n• Buddy Hearts Accumulation (400 Hearts on Level 78):\nZero walking is required. Pokémon GO allows rotating up to 20 buddy Pokémon every single day. For each buddy, execute 3 instant actions: feed 3 berries, pet, and snapshot. This yields 3 quick hearts per buddy × 20 swaps = 60 hearts daily in just 10 minutes of sofa play.\n\n• Shadow Purifications (Purify 100 on Level 73):\nProtect your Stardust reserves. Strictly filter and purify low-cost 1,000 Stardust species like Zubat, Rattata, Pidgey, Magikarp, Weedle, and Foongus. Never waste 3,000 or 5,000 Stardust on batch purifications.\n\n• Max CP Level 50 Power-ups (3 Pokémon on Level 73, 7 Pokémon on Level 77):\nReaching Level 50 requires 296 Candy XL per species. Melmetal is practically free via the Mystery Box opening every 3 days. Community Day featured species also yield abundant Candy XL reserves.",
          "ja": "レベル71〜80の10段階には、投球技術、バトル力、フレンド交流、現実世界の移動力を試す40の試練が用意されています。\n\n主要タスクの攻略ポイントと裏技：\n• 1日捕獲タスク（Lv71で100匹、Lv76で200匹）：\n月1回のコミュニティ・デイ（14:00〜17:00）または火曜スポットライトアワーで挑みましょう。捕獲画面スキップ（ファストキャッチ）を駆使すれば、100匹なら約25分で終わります。\n\n• スロー回数タスク（Lv71でナイス999回、Lv75でグレート999回、Lv80でエクセレント999回）：\nLv80のエクセレント999回は、カイオーガやグラードンなどサークルが巨大な伝説レイドボスにナナのみを投げて稼ぐのが最も確実です。\n\n• 相棒ハート400個（Lv78）：\n歩く必要はありません！相棒は1日20回まで交代可能です。交代ごとに「おやつ」「撫でる」「写真」を行えば各3個、20匹で1日60個のハートをわずか10分で量産できます。\n\n• シャドウリトレーン100匹（Lv73）：\n必ずすな消費1,000の軽量シャドウ（ズバット、コラッタ、ポッポ、コイキング等）に絞って実行し、大切なほしのすなを温存しましょう。\n\n• Lv50フル強化（Lv73で3匹、Lv77で7匹）：\n「ふしぎなはこ」から無限にアメXLが手に入るメルメタルや、コミュニティ・デイでアメXLが大量にあるポケモンを優先してLv50に引き上げましょう。",
          "ru": "Финал игры предлагает 40 заданий, проверяющих точность бросков, боевой опыт и активность на прогулках.\n\nКлючевые категории квестов и лайфхаки:\n• Улов за один день (100 на 71 уровне, 200 на 76 уровне):\nВыполняйте во время 3-часового Community Day или часового Spotlight Hour. С трюком Fast Catch 100 покемонов ловятся быстрее чем за 25 минут.\n\n• Точные броски (999 Nice на 71 уровне, 999 Great на 75 уровне, 999 Excellent на 80 уровне):\nДля 999 Excellent бросков на 80 уровне бросайте в легендарных боссов рейдов (Groudon, Kyogre, Necrozma) с огромным кольцом, предварительно дав им Nanab Berry.\n\n• 400 сердец с напарником (78 уровень):\nХодить не нужно! Меняйте до 20 бадди в день. Покормите, погладьте и сфотографируйте каждого (3 сердца × 20 = 60 сердец в день за 10 минут).\n\n• Очистка 100 Shadow покемонов (73 уровень):\nОчищайте только дешевых покемонов за 1 000 пыли (Zubat, Rattata, Pidgey, Magikarp, Weedle, Foongus).\n\n• Прокачка до Level 50 (3 покемона на 73 уровне, 7 на 77 уровне):\nИспользуйте Melmetal из Mystery Box (бесплатные конфеты XL каждые 3 дня) и покемонов с прошедших Community Day."
        },
        "tips": {
          "cs": [
            "Níže v článku naleznete interaktivní checklist všech 40 úkolů, kde si můžete odškrtávat svůj postup s automatickým uložením v prohlížeči.",
            "Úkol na 10 výměn na vzdálenost přes 300 km splníte líhnutím 7km vajec z dárků od zahraničních přátel a jejich následnou výměnou s místním trenérem.",
            "Zápasy v GO Battle League pro level 80 plňte na začátku sezóny nebo během GO Battle víkendů, kdy jsou souboje nejrychlejší."
          ],
          "en": [
            "Check out our interactive 40-task checklist below with automatic browser persistence to monitor your endgame progress.",
            "For the 10 distance trades over 300 km task, hatch 7km eggs received in gifts from overseas friends and trade them locally.",
            "Complete the 80 GBL wins for level 80 during GO Battle Weekends or at the season start when matchmaking is rapid."
          ],
          "ja": [
            "本記事の下部にあるインタラクティブチェックリストをご活用ください。ブラウザに自動保存されます。",
            "300km以上のトレードタスクは、海外フレンドのギフトから出た7kmタマゴを孵化させて近所のフレンドと交換すればすぐ終わります。",
            "Lv80のGBL80勝は、GOバトルウィークエンドなどのイベント期間中にランク1〜15の帯で一気に稼ぎましょう。"
          ],
          "ru": [
            "Используйте наш интерактивный чек-лист из 40 заданий ниже: ваш прогресс автоматически сохраняется в браузере.",
            "Для обмена покемонами на 300+ км высиживайте 7км яйца из зарубежных подарков и меняйтесь ими с локальным другом.",
            "Победы в GBL для 80 уровня проще всего фармить на GO Battle Weekend или в начале сезона на низких рангах."
          ]
        }
      },
      {
        "id": "trainer-levels-platinum-medals-blueprint",
        "heading": {
          "cs": "3. Doporučené platinové medaile a blueprint pro 50 medailí",
          "en": "3. Recommended Platinum Medals Blueprint for Level 80",
          "ja": "3. プラチナメダル50個最速達成ブループリント＆優先度ガイド",
          "ru": "3. Топ платиновых медалей: пошаговый план к 50 медалям для 80 уровня"
        },
        "content": {
          "cs": "Získat 50 platinových medailí představuje největší dlouhodobou zkoušku pro každého trenéra směřujícího na Level 80. Ve hře existuje přes 70 různých medailí, ale jejich časová a herní náročnost se dramaticky liší. Některé zvládnete za pár týdnů, zatímco jiné vyžadují roky každodenního hraní nebo velké štěstí.\n\nNáš blueprint dělí medaile do tří přehledných skupin podle rychlosti a efektivity:\n\n1. Doporučené a rychlé medaile (Základ pro 25 až 30 medailí):\n• 18 typových medailí za 2 500 úlovků: Normal, Flying, Water, Grass, Poison, Bug a další. Každý odchyt se počítá a medaile navíc zvyšuje šanci na chytání.\n• Kanto a Johto Pokédex: Kompletní registrace 151 pokémonů z Kanto a 100 pokémonů z Johto.\n• Scientist za 2 000 evolucí: Masivní vyvíjení běžných pokémonů za 12 Candy během bonusových akcí.\n• Cameraman za 400 photobombů: Jedna fotka buddyho denně plus eventové dny s až pěti fotobomby.\n• Idol za 20 Best Friends: Přirozený výsledek posílání dárků s přáteli po dobu 90 dní.\n• Collector za 50 000 úlovků a Backpacker za 50 000 otočení PokéStopů: Tyto dvě medaile splníte přirozeně na cestě k vysokým milionům XP.\n\n2. Skvělé medaile pro aktivní grinding (Doplnění do 50 medailí):\n• Ace Trainer za 2 000 tréninků s lídry: Využijte trik s lídryní Blanche v Master League. Se silným elektrickým pokémonem ukončíte boj za 15 sekund.\n• Purifier za 1 000 očištěných pokémonů: Čistěte výhradně levné pokémony za 1 000 Stardustu a spojte to s lovem Rakeťáků.\n• Hero za 2 000 poražených poskoků Team GO Rocket: Využijte víkendy Rocket Takeover.\n• Battle Girl za 4 000 výher v tělocvičnách: Shazujte gymy rychlým bojovým týmem.\n• Champion za 1 000 raidů a Battle Legend za 1 000 legendárních raidů: Pravidelná účast na bezplatných denních raidech.\n\n3. Medaile, kterým se raději vyhněte a nepočítejte s nimi:\n• Triathlete za 100 sedmidenních sérií: Vyžaduje minimálně 700 dní bez jediného vynechaného dne. Nelze ji nijak urychlit.\n• Fisherman za 1 000 obřích Magikarpů a Youngster za 1 000 drobných krys Rattata: Pouze 12 až 15 procent ulovených kusů splňuje kritéria velikosti, což znamená chytit přes sedm tisíc pokémonů od každého druhu.\n• Unown za 28 písmen: V divočině se téměř nevyskytuje a vyžaduje účast na placených festivalech.\n• Best Buddy za 100 nejlepších parťáků: Extrémně časově náročný proces vyžadující 30 000 srdíček celkem.",
          "en": "Securing 50 Platinum medals is universally recognized as the premier milestone for Level 80. While Pokémon GO features over 70 distinct badges, their difficulty curves diverge drastically.\n\nOur strategic blueprint categorizes badges into three clear speed and efficiency tiers:\n\n1. Recommended Fast Medals (Core foundation of 25–30 medals):\n• 18 Type Catch Badges (2,500 catches each): Normal, Flying, Water, Grass, Bug, and Poison accumulate naturally and grant permanent catch rate boosts.\n• Kanto & Johto Dex Completion: 151 and 100 registrations respectively.\n• Scientist (2,000 Evolutions): Hoarding 12-candy species for mass evolution sessions.\n• Cameraman (400 Photobombs): Daily buddy snapshots plus event boosts.\n• Idol (20 Best Friends): 90 days of daily gift coordination.\n• Collector (50k Catches) & Backpacker (50k Spins): Fully guaranteed byproducts of your massive XP grind.\n\n2. Active Grinding Medals (Pushing your tally to 50):\n• Ace Trainer (2,000 Leader Trainings): Fast-farm Blanche in Master League in 15 seconds per bout.\n• Purifier (1,000 Shadows): Strictly purge 1,000 Stardust specimens.\n• Hero (2,000 Rocket Grunts): Heavy engagement during Rocket Takeovers.\n• Battle Girl (4,000 Gym Victories): Sweeping local gyms with high-DPS Fighting counters.\n• Champion & Battle Legend (1,000 regular & legendary raid clears).\n\n3. Badges to Avoid as Milestones:\n• Triathlete (100× 7-day streaks): Mathematically locked behind 700 uninterrupted days minimum.\n• Fisherman & Youngster: Extreme size bracket RNG requiring 7,000–8,000 catches each.\n• Unown (28 alphabet letters): Dependent on paid ticketed in-person festivals.\n• Best Buddy (100 Best Buddies): Demands 30,000 buddy hearts total.",
          "ja": "プラチナメダル50個の獲得は、レベル80到達における最大の登竜門です。ゲーム内には70種類以上のメダルが存在しますが、達成難易度は天と地ほどの差があります。\n\n効率的に50個を集めるための3段階戦略：\n\n1. 最優先・最速メダル（ベースとなる25〜30個）：\n• タイプ別捕獲メダル18種（各2,500匹）：ノーマル、ひこう、みず、くさ、どく等は日々の捕獲で最速達成可能。\n• カントー＆ジョウト図鑑（151匹・100匹）：イベント復刻や交換でコンプリート。\n• けんきゅういん（進化2,000回）：アメ12個のポッポやケムッソを進化XP2倍時に一括進化。\n• カメラマン（400回）：毎日の相棒撮影で確定カウント。\n• アイドル（大親友20人）：毎日ギフトを送り合って90日で達成。\n• コレクター（5万匹）＆バックパッカー（5万回）：累計XPを稼ぐ過程で自然に達成。\n\n2. 周回で稼げるアクティブメダル（50個への到達枠）：\n• エリートトレーナー（特訓2,000回）：マスターリーグのブランシェを速攻で倒して1戦15秒周回。\n• リトレーナー（1,000匹）：1,000すなの軽量シャドウのみに絞って達成。\n• ヒーロー（したっぱ2,000人）：ロケット団イベントで集中周回。\n• バトルガール（ジム4,000勝）：かくとうパーティでジムを素早く制圧。\n• チャンピオン＆バトルレジェンド（レイド各1,000勝）。\n\n3. 優先すべきでない長期メダル：\n• トライアスリート：最低でも連続700日（約2年）が必要で短縮不可。\n• つりびと＆たんぱんこぞう：判定率12〜15%の超低確率で各7,000〜8,000匹の捕獲が必要。\n• アンノーン：リアルイベント遠征なしでは不可能な文字収集。\n• 最高の相棒100匹：計3万個のハートが必要な過酷作業。",
          "ru": "Получение 50 платиновых медалей — главное испытание на пути к 80 уровню. Из более чем 70 медалей в игре сложность кардинально различается.\n\nПошаговый план к 50 медалям:\n\n1. Рекомендуемые быстрые медали (Базовые 25–30 медалей):\n• 18 медалей типов (по 2 500 покемонов): Normal, Flying, Water, Grass, Bug и Poison закрываются быстрее всего.\n• Покедексы Канто и Джото (151 и 100 покемонов).\n• Scientist (2 000 эволюций): массовая эволюция покемонов за 12 конфет.\n• Cameraman (400 фотобомб): ежедневное фото напарника.\n• Idol (20 Best Friends): 90 дней подарков.\n• Collector (50k поимок) и Backpacker (50k спинов): придут сами в процессе набора XP.\n\n2. Медали для активного фарма (Добейте до 50 штук):\n• Ace Trainer (2 000 тренировок): бой с лидером Blanche в Master League за 15 секунд.\n• Purifier (1 000 очищений): строго покемоны за 1 000 пыли.\n• Hero (2 000 пешек Ракеты).\n• Battle Girl (4 000 побед в гимах).\n• Champion и Battle Legend (по 1 000 рейдов).\n\n3. Медали, которых лучше избегать:\n• Triathlete: требует минимум 700 дней без пропусков (около 2 лет).\n• Fisherman и Youngster: нужный размер выпадает лишь в 12-15% случаев.\n• Unown: 28 букв требуют платных поездок на GO Fest.\n• Best Buddy (100 лучших бадди): 30 000 сердец суммарно."
        },
        "tips": {
          "cs": [
            "Medaile začněte budovat od prvního dne hraní: typové medaile vám navíc trvale přidávají bonus +4 k šanci na chycení pokémona daného typu.",
            "Využijte náš interaktivní přehled medailí v článku pro rychlou kontrolu strategií u každé jednotlivé medaile.",
            "Neztrácejte čas lovem obřích Magikarpů nebo sháněním chybějících Unownů, pokud ještě nemáte hotové základní medaile jako Scientist, Cameraman nebo Ace Trainer."
          ],
          "en": [
            "Start working on badges early: type medals grant a permanent +4 multiplier boost to your catch rate.",
            "Use our interactive badge strategy component below to check requirements and time estimates.",
            "Do not waste energy hunting XL Magikarps or rare Unowns when easy badges like Scientist, Cameraman, and Ace Trainer are incomplete."
          ],
          "ja": [
            "タイプ別メダルはポケモンの捕獲率を最大+4まで底上げしてくれるため、最優先でプラチナを目指しましょう。",
            "本記事内のメダル戦略リストで、各メダルの所要時間と攻略テクニックを確認してください。",
            "けんきゅういん、カメラマン、特訓などの簡単枠が残っているうちは、コイキング厳選やアンノーン集めに時間を割くのは避けましょう。"
          ],
          "ru": [
            "Качайте медали с самого начала: медали типов дают постоянный бонус +4 к шансу поимки.",
            "Используйте наш виджет со стратегиями медалей ниже для оценки времени выполнения.",
            "Не тратьте силы на XL Magikarp или Unown, пока не закрыты простые медали вроде Scientist, Cameraman и Ace Trainer."
          ]
        }
      },
      {
        "id": "trainer-levels-fastest-xp-farming-methods",
        "heading": {
          "cs": "4. Nejrychlejší způsoby získávání XP v moderním Pokémon GO",
          "en": "4. Fastest XP Farming Methods in Modern Pokémon GO",
          "ja": "4. 現代のPokémon GOにおける最速XP獲得テクニック",
          "ru": "4. Самые быстрые способы фарма XP в современном Pokémon GO"
        },
        "content": {
          "cs": "Dosažení levelu 80 vyžaduje celkem přes 203 milionů XP. Získat takové množství zkušeností se může zdát jako nedosažitelný cíl, ale díky moderním herním mechanikám a správnému načasování Lucky Eggu můžete tempo sběru XP zdesetinásobit.\n\nNejvýnosnější metody získávání XP:\n\n1. Přátelství a synchronizace Lucky Eggu (Nejvyšší výnos ve hře):\nDosáhnout statusu Ultra Friends přináší 50 000 XP (100 000 XP s Lucky Eggem) a Best Friends dokonce 100 000 XP (200 000 XP s Lucky Eggem). Synchronizujte otevírání dárků s přáteli na jeden konkrétní čas, například na začátek Community Day, a otevřete desítky dárků pod jedním šťastným vejcem. Pět Best Friends naráz vám přinese 1 000 000 XP za 5 minut!\n\n2. Trénink Excellent hodů (Až 2 340 XP za jediného běžného pokémona):\nKaždý Excellent hod dává základních 1 000 XP plus bonus za chycení prvním hodem a Curveball, což dává přes 1 170 XP na odchyt. Pokud aktivujete Lucky Egg při eventu s dvojnásobkem Catch XP, získáte až 4 680 XP za jediného chyceného pokémona. Při rychlém chytání 150 pokémonů za hodinu to znamená přes 700 000 XP za jediné odpoledne.\n\n3. Spotlight Hour s bonusem 2× Evolution XP:\nJednou za měsíc probíhá úterní Spotlight Hour s bonusem na dvojnásobek zkušeností za evoluci. S aktivním Lucky Eggem dostanete 4 000 XP za každou jednotlivou evoluci. Pokud si předem připravíte zásobu pokémonů za 12 Candy (Pidgey, Caterpie, Wurmple, Pidove) a použijete vyhledávací filtr \"evolve & !shiny\", můžete za hodinu nepřetržitého vyvíjení získat přes 600 000 až 750 000 XP.\n\n4. Víkendové Raid Days a Raid Hours:\nVyhraný 5★ legendární raid dává 10 000 XP (20 000 XP s Lucky Eggem). Během speciálních Raid Days navíc Niantic často navyšuje odměnu až na 50 000 XP za raid s aktivním vajíčkem. Při rychlé rotaci s místní komunitou můžete během 3 hodin odehrát 15 až 20 raidů a získat téměř 1 000 000 XP.\n\n5. Denní a týdenní série (Streaks):\nNikdy nevynechávejte sedmidenní sérii prvního chyceného pokémona a otočeného PokéStopu v týdnu. Spolu s týdenní odměnou z Adventure Sync vám tyto pravidelné návyky zajistí stabilní pasivní přísun statisíců XP každý měsíc.",
          "en": "Reaching Level 80 requires over 203,353,000 XP. While daunting, contemporary game mechanics paired with strategic Lucky Egg deployment can accelerate your XP velocity by more than tenfold.\n\nTop XP Farming Methods Ranked by Hourly Yield:\n1. Friendship Tier Syncing (Highest yield in Pokémon GO):\nHitting Ultra Friends grants 50k XP (100k XP with Lucky Egg) and Best Friends awards 100k XP (200k XP with Lucky Egg). Coordinate gift openings in bulk at predetermined times (e.g. Community Day kickoff). Syncing 5 Best Friends simultaneously nets 1,000,000 XP in under 5 minutes.\n\n2. Excellent Throw Mastery (Up to 2,340 XP per catch):\nEvery Excellent throw delivers 1,000 base XP plus first-throw and curveball multipliers (~1,170 XP). During 2× or 3× Catch XP events stacked with a Lucky Egg, a single catch yields up to 4,680 XP. Catching 150 spawns per hour via Fast Catch produces over 700,000 XP in a single session.\n\n3. Mass Evolution during 2× Evolution XP Spotlight Hours:\nOnce a month, a Tuesday Spotlight Hour offers double Evolution XP. Stacking a Lucky Egg boosts this to 4,000 XP per evolution. Prepare tags of 12-candy species (Pidgey, Wurmple, Caterpie, Pidove) to execute 150+ evolutions for 600,000 to 750,000 XP per hour.\n\n4. Raid Days & Wednesday Raid Hours:\n5★ Legendary raids award 10k XP (20k XP with Lucky Egg). Dedicated Raid Days often feature boosted XP up to 50k XP per win with an egg. Running 15–20 raids with a local raid train yields nearly 1,000,000 XP across an afternoon.\n\n5. 7-Day Catch and Spin Streaks:\nNever drop 7-day milestones for daily catches and PokéStop spins. Combined with Monday Adventure Sync rewards, passive routines provide a consistent baseline of hundreds of thousands of XP every month.",
          "ja": "レベル80到達には累計で2億335万XPという天文学的な数値が求められます。しかし、しあわせタマゴの適切なタイミングと最新の獲得手法を組み合わせれば、育成スピードを10倍以上に加速させることができます。\n\n最速XP獲得テクニック一覧：\n1. フレンド進行の一括開封（ゲーム内最高効率）：\n親友で5万XP（タマゴ使用時10万XP）、大親友で10万XP（タマゴ使用時20万XP）。コミュデイ開始時などにフレンドと合図を合わせ、5人の大親友を一気に達成すればわずか5分で100万XPを獲得可能です。\n\n2. エクセレントスローの徹底（1匹最大2,340XP）：\nエクセレントスローは基本1,000XP。捕獲XP倍増イベント時にしあわせタマゴを重ねると、1匹捕獲するだけで最大4,680XPが得られます。\n\n3. 進化XP2倍スポットライトアワーでの一括進化：\n月1回の進化XP2倍時にタマゴを使えば、1回の進化で4,000XP。アメ12個のポケモンを事前に集めておけば、1時間で60万〜75万XPを量産できます。\n\n4. 伝説レイドアワー＆レイドデイ周回：\n伝説レイド1戦で1万XP（タマゴで2万XP）。週末レイドデイではXPボーナスが付き、1戦で最大5万XP入ることもあります。\n\n5. 7日連続ボーナスといつでも冒険モード：\n7日目の初捕獲＆初スピン、そして月曜朝9時のいつでも冒険モード報酬を欠かさず受け取りましょう。",
          "ru": "Для достижения 80 уровня требуется свыше 203 миллионов XP. С грамотным использованием Lucky Egg этот процесс можно ускорить в разы.\n\nЛучшие способы фарма опыта:\n1. Синхронизация дружбы (Максимальный доход в игре):\nUltra Friends дает 50k XP (100k с Lucky Egg), а Best Friends дает 100k XP (200k с Lucky Egg). Открывайте подарки пачками: 5 Best Friends за один раз принесут 1 000 000 XP за 5 минут.\n\n2. Мастерство Excellent бросков (До 2 340 XP за поимку):\nКаждый бросок Excellent приносит более 1 170 XP. Во время ивентов с умножением XP под Lucky Egg один покемон может давать до 4 680 XP.\n\n3. Массовая эволюция на Spotlight Hour с 2× Evolution XP:\nРаз в месяц во вторник проходит Spotlight Hour с удвоенным опытом за эволюцию (4 000 XP за покемона с яйцом). За час можно набрать 600k–750k XP.\n\n4. Рейдовые дни и Raid Hours:\nЛегендарные рейды 5★ дают 10 000 XP (20 000 XP с яйцом), а во время рейдовых дней награды могут вырастать до 50 000 XP за победу.\n\n5. 7-дневные серии:\nНе пропускайте 7-дневные серии ловли и вращения покестопов."
        },
        "tips": {
          "cs": [
            "Mějte vždy v batohu připravenou zásobu Lucky Eggů pro nečekané události s násobkem XP.",
            "Zapněte si v nastavení hry Adventure Sync, abyste každé pondělí ráno v 9:00 automaticky inkasovali desítky tisíc XP z nachozených kilometrů.",
            "Používejte vyhledávací řetězce v batohu pokémonů jako 'evolve & !shiny', které vám ušetří desítky minut při hromadném vyvíjení."
          ],
          "en": [
            "Always keep a reserve of Lucky Eggs ready for surprise XP multiplier events.",
            "Ensure Adventure Sync is active to automatically claim high weekly walking XP every Monday at 9:00 AM.",
            "Use quick storage search strings like 'evolve & !shiny' to streamline mass-evolution sessions."
          ],
          "ja": [
            "XP倍増イベントに備えて、常にバッグにしあわせタマゴの予備を確保しておきましょう。",
            "いつでも冒険モードを有効にして、毎週月曜朝9時の週間リワードXPを確実に回収しましょう。",
            "「進化 & !色違い」などの検索文字列を活用すれば、一括進化の作業時間を大幅に短縮できます。"
          ],
          "ru": [
            "Всегда держите запас Lucky Egg на случай внезапных ивентов с бонусами XP.",
            "Включите Adventure Sync, чтобы каждый понедельник в 9:00 забирать опыт за прогулки.",
            "Используйте фильтры поиска вроде 'evolve & !shiny' для быстрой массовой эволюции."
          ]
        }
      }
    ]
  },
  {
  "id": "ditto-disguises-guide",
  "slug": "ditto-disguises-guide",
  "iconName": "Sparkles",
  "imageUrl": "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_132_00.png",
  "featured": false,
  "author": "PoGo Events Team",
  "readTime": "8 min",
  "updatedAt": "2026-10-17",
  "category": {
    "cs": "Divočina & Maskování",
    "en": "Wild & Disguises",
    "ja": "野生と変身",
    "ru": "Дикая природа и маскировка"
  },
  "title": {
    "cs": "Ditto v Pokémon GO: Aktuální přehled přestrojení a jak ho najít",
    "en": "Ditto in Pokémon GO: Current Disguises & How to Catch It",
    "ja": "ポケモンGO メタモンへんしんポケモン一覧：見分け方と捕獲攻略",
    "ru": "Дитто в Pokémon GO: Текущие маскировки и способы поимки"
  },
  "subtitle": {
    "cs": "Kompletní živá databáze všech divokých Pokémonů, za které se Ditto v aktuální sezóně maskuje, pravidla pro Shiny formu a tipy na efektivní lov.",
    "en": "Live roster of all wild Pokémon species Ditto is currently disguised as, Shiny mechanics, weather boost rules, and pro catching tips.",
    "ja": "今シーズン野生でメタモンが擬態している全対象ポケモン、色違い仕様、効率的な捕獲ルートを徹底解説。",
    "ru": "Актуальный список покемонов, за которых маскируется Дитто, механика шайни и советы по быстрой поимке."
  },
  "sections": [
    {
      "id": "ditto-mechanics",
      "heading": {
        "cs": "1. Jak funguje mechanika přestrojení Ditta v divočině",
        "en": "1. How Ditto's Wild Disguise Mechanics Work",
        "ja": "1. 野生メタモンの擬態システムと基本ルール",
        "ru": "1. Как работает маскировка Дитто в дикой природе"
      },
      "content": {
        "cs": "Ditto se na herní mapě nikdy nezobrazuje ve své skutečné podobě. Místo toho se maskuje za vybranou skupinu běžných divokých Pokémonů. Teprve po úspěšném hodu a chycení se objeví animace 'Oh?' a pokémon se promění ve svou skutečnou fialovou (nebo modrou shiny) podobu Ditta.\n\nSeznam maskování se v Pokémon GO pravidelně obměňuje s příchodem nových herních sezón nebo tematických eventů. Níže naleznete náš živý interaktivní seznam všech aktuálních přestrojení s automatickým načítáním z herních serverů.",
        "en": "Ditto never reveals its true form on the wild overworld map. Instead, it masquerades as specific common wild Pokémon. Only upon a successful throw and catch does the iconic 'Oh?' transformation sequence trigger, unveiling the purple (or brilliant blue Shiny) Ditto.\n\nDisguise pools rotate seasonally and during special events. Below you will find our live interactive tracker automatically synced with current server spawns.",
        "ja": "メタモンはマップ上で直接その姿を現すことはありません。常に特定の一般ポケモンの姿に化けて野生に出現します。ボールを投げて捕獲に成功した瞬間に「おや？」という演出が発生し、本来のメタモンの姿へと変身します。\n\n変身対象ポケモンはシーズンやイベントごとに定期的に入れ替わります。下記に最新の擬態対象をリアルタイムで掲載しています。",
        "ru": "Дитто никогда не отображается на карте в своем истинном облике. Он маскируется под определенных обычных покемонов. Только после поимки появляется надпись 'Oh?' и покемон превращается в Дитто.\n\nСписок маскировок регулярно обновляется с началом новых сезонов. Ниже представлен актуальный интерактивный список всех текущих маскировок."
      },
      "tips": {
        "cs": [
          "Pokud vidíte pokémona z aktuálního seznamu přestrojení, který je nezvykle těžký na chycení (červený kruh u běžného pokémona), s vysokou pravděpodobností jde o Ditta!",
          "Používejte Razz Berry a Ultra Bally na podezřele se bránící běžné pokémony, aby vám Ditto neutekl."
        ],
        "en": [
          "If a common species from the disguise pool has an unusually dark or red catch circle, it is very likely a Ditto!",
          "Deploy Razz Berries and Ultra Balls if a normally easy catch resists your throws."
        ],
        "ja": [
          "普段なら簡単に捕まるはずのポケモンが異様に捕まりにくい（サークルが赤い）場合、メタモンの可能性が極めて高いです！",
          "逃走を防ぐため、怪しい個体にはズリのみとハイパーボールを惜しみなく使いましょう。"
        ],
        "ru": [
          "Если обычный покемон из списка подозрительно тяжело ловится (красный круг), скорее всего это Дитто!",
          "Используйте Razz Berry и Ultra Ball, чтобы Дитто не сбежал."
        ]
      }
    },
    {
      "id": "shiny-ditto-rules",
      "heading": {
        "cs": "2. Pravidla pro Shiny Ditta a třpytivé formy",
        "en": "2. Shiny Ditto Rules & Mechanics",
        "ja": "2. 色違いメタモンの出現仕様と重要ルール",
        "ru": "2. Правила появления Шайни Дитто"
      },
      "content": {
        "cs": "U Shiny Ditta platí jedno zásadní a neměnné pravidlo:\n\n• Pokud divoký pokémon, na kterého kliknete, září jako Shiny ve svém běžném druhu (například Shiny Oddish nebo Shiny Koffing), NIKDY se z něj po chycení nestane Ditto!\n• Ditto se může proměnit v zářivě modrého Shiny Ditta POUZE z běžného, netřpytivého pokémona na mapě.\n• Když chytíte normálního pokémona z Ditto seznamu, má stálou šanci stát se Shiny Dittem po dokončení proměny.",
        "en": "Shiny Ditto operates on one critical rule:\n\n• If a wild encounter naturally appears Shiny as the base species (e.g. a Shiny Oddish), it can NEVER transform into Ditto upon catch!\n• Ditto can only transform into its brilliant blue Shiny form from a NON-shiny wild spawn.\n• Once a non-shiny disguise is captured, the game rolls a chance for the underlying Ditto to be Shiny upon transformation.",
        "ja": "色違いメタモンには絶対に覚えておくべき鉄則があります：\n\n• 遭遇した擬態ポケモン自体が色違い（例：色違いのナゾノクサ）だった場合、捕獲しても絶対にメタモンには変身しません！\n• メタモンは【通常色の擬態ポケモン】からのみ変身し、変身後に青い色違いメタモンになる抽選が行われます。",
        "ru": "Для шайни Дитто действует главное правило:\n\n• Если дикий покемон уже блестит как шайни (например, шайни Oddish), он НИКОГДА не превратится в Дитто!\n• Дитто превращается в ярко-синего шайни ТОЛЬКО из обычного покемона на карте."
      },
      "tips": {
        "cs": [
          "Pokud vám kamarád hlásí, že z určitého spawnu chytil Ditta, pospěšte si na místo: Ditto je stejný pro všechny hráče nad level 30!",
          "Chytejte pomocí PokéStop scannerů v komunitních skupinách, kde hráči okamžitě hlásí přesné souřadnice."
        ],
        "en": [
          "Ditto spawns are identical for all trainers above Level 30. If a friend catches one, head there immediately!",
          "Keep in touch with local Discord/Campfire groups for instant Ditto spawn callouts."
        ],
        "ja": [
          "トレーナーレベル30以上のプレイヤーには、全く同じ個体がメタモンとして出現します。フレンドが発見したら急いで向かいましょう！",
          "地元のCampfireやコミュニティのメタモン目撃情報をチェックするのが最も確実です。"
        ],
        "ru": [
          "Спавн Дитто одинаков для всех игроков выше 30 уровня. Если друг поймал Дитто, он будет там же и для вас!"
        ]
      }
    }
  ]
},
  {
  "id": "egg-hatching-guide",
  "slug": "egg-hatching-guide",
  "iconName": "Clock",
  "imageUrl": "https://cdn.leekduck.com/assets/img/items/Super%20Incubator.png",
  "featured": false,
  "author": "PoGo Events Team",
  "readTime": "9 min",
  "updatedAt": "2026-10-17",
  "category": {
    "cs": "Líhnutí & Inkubátory",
    "en": "Hatching & Incubators",
    "ja": "タマゴ孵化",
    "ru": "Высиживание яиц"
  },
  "title": {
    "cs": "Líhnutí vajec v Pokémon GO: Aktuální obsah 2km až 12km vajec a inkubátory",
    "en": "Egg Hatching in Pokémon GO: Current 2km to 12km Egg Pools & Incubators",
    "ja": "ポケモンGO タマゴ孵化一覧：2km〜12km最新孵化ポケモンと確率攻略",
    "ru": "Высиживание яиц в Pokémon GO: Список покемонов из яиц 2-12 км и инкубаторы"
  },
  "subtitle": {
    "cs": "Přehled všech dostupných Pokémonů z 2km, 5km, 7km, 10km, 12km vajec a Adventure Sync odměn, šance na Shiny a průvodce inkubátory.",
    "en": "Complete live database of Pokémon hatching from 2km, 5km, 7km, 10km, 12km, and Adventure Sync eggs, Shiny odds, and incubator efficiency.",
    "ja": "2km、5km、7km、10km、12km、いつでも冒険モード週間タマゴの全中身、色違い確率、効率的な孵化手順を網羅。",
    "ru": "Полная база покемонов из всех категорий яиц, включая награды Adventure Sync, шансы шайни и советы по инкубации."
  },
  "sections": [
    {
      "id": "egg-pools-breakdown",
      "heading": {
        "cs": "1. Přehled kategorií vajec a jejich získávání",
        "en": "1. Egg Categories & How to Obtain Them",
        "ja": "1. タマゴの種類と入手方法一覧",
        "ru": "1. Категории яиц и способы их получения"
      },
      "content": {
        "cs": "Líhnutí vajec je jedním z nejlepších zdrojů vzácných Pokémonů s garantovaným vysokým IV (minimálně 10/10/10) a velkým množstvím Candy i Stardustu.\n\nKategorie vajec v Pokémon GO:\n• 2km Vejce (Zelené): Běžní pokémoni a startéři, ideální pro rychlé líhnutí bez plýtvání prémiovými inkubátory.\n• 5km Vejce (Žluté): Středně vzácní pokémoni a regionální druhy z PokéStopů.\n• 7km Vejce (Růžovo-žluté): Získávají se výhradně z dárků od přátel. Obsahují Alolan a Galarian formy nebo speciální eventové Pokémony.\n• 10km Vejce (Fialové): Velmi vzácní pseudolegendární a dračí pokémoni (Larvitar, Bagon, Deino, Goomy, Jangmo-o, Frigibax).\n• 12km Vejce (Červené / Strange Eggs): Získávají se poražením lídrů Team GO Rocket (Cliff, Sierra, Arlo). Obsahují vzácné temné pokémony jako Pawniard, Vullaby, Sandile, Salandit a Varoom.\n• Adventure Sync Vejce (5km & 10km): Pondělní ranní odměna za nachození 25 km nebo 50 km za uplynulý týden.",
        "en": "Egg hatching serves as a primary pipeline for high-IV Pokémon (10/10/10 IV floor) alongside generous Candy and Stardust bounties.\n\nEgg Classifications:\n• 2km Eggs (Green): Accessible starters and common companions.\n• 5km Eggs (Yellow): Mid-tier spawns and regional entries from PokéStops.\n• 7km Eggs (Pink & Yellow): Exclusively gifted by friends. House regional forms (Alolan/Galarian) and baby Pokémon.\n• 10km Eggs (Purple): Rare pseudo-legendaries and apex dragons.\n• 12km Strange Eggs (Red): Sourced exclusively from Team GO Rocket Leaders (Cliff, Sierra, Arlo). Feature exclusive Dark/Poison species including Salandit, Sandile, and Varoom.\n• Adventure Sync Eggs (5km & 10km): Rewarded every Monday at 9:00 AM for clearing 25km or 50km weekly milestones.",
        "ja": "タマゴ孵化は高個体値（最低個体値10/10/10保証）のレアポケモン、そして大量のアメとほしのすなを手に入れる絶好の手段です。\n\nタマゴの分類：\n• 2kmタマゴ（緑）：御三家や基礎的なポケモン。\n• 5kmタマゴ（黄）：中級レアや地域限定ポケモン。\n• 7kmタマゴ（ピンク/黄）：フレンドのギフト限定。アローラ・ガラルの姿やベイビィポケモンが出現。\n• 10kmタマゴ（紫）：600族やドラゴン系（セビエ、ジャラコ、ヌメラ等）の最高峰レア。\n• 12kmタマゴ（赤/12km）：ロケット団リーダー（クリフ/シエラ/アルロ）撃破時のみ獲得。ヤトウモリやブロロンなど超限定ポケモンが狙えます。\n• いつでも冒険モードタマゴ：月曜朝9時に週間歩行距離25km/50km達成で付与。",
        "ru": "Высиживание яиц обеспечивает минимальное IV 10/10/10 и дает солидное количество конфет и пыли.\n\nКатегории яиц:\n• 2 км (зеленые): стартовики и базовые виды.\n• 5 км (желтые): средние виды с покестопов.\n• 7 км (розовые): только из подарков друзей (Галар, Алола, бэби).\n• 10 км (фиолетовые): редкие драконы и 600-ники.\n• 12 км Strange (красные): с лидеров Ракеты (Salandit, Sandile, Varoom).\n• Adventure Sync: награда за 25/50 км в понедельник утром."
      },
      "tips": {
        "cs": [
          "Před soubojem s lídrem Team GO Rocket si zkontrolujte, zda máte volný slot na vejce (nebo v bonusovém úložišti 3 slotů dole), jinak 12km červené vejce vůbec nedostanete!",
          "Nekonečný bezplatný inkubátor (oranžový) používejte výhradně na krátká 2km vejce. Prémiové Super Inkubátory šetřete na 10km a 12km vejce."
        ],
        "en": [
          "Before battling a Team GO Rocket Leader, always ensure you have an open egg slot (or space in the extra 3-slot storage), otherwise the 12km Strange Egg is permanently lost!",
          "Dedicate your infinite orange incubator strictly to 2km eggs. Reserve Super Incubators for 10km and 12km eggs."
        ],
        "ja": [
          "ロケット団リーダーと戦う前に、必ずタマゴ枠（または下部のボーナス枠3枠）に空きがあることを確認しましょう。満杯だと12kmタマゴはもらえません！",
          "無限ふかそうちは2kmタマゴ専用にし、スーパーふかそうちは10km・12kmタマゴに温存しましょう。"
        ],
        "ru": [
          "Перед боем с лидером Ракеты убедитесь, что есть место в инвентаре яиц, иначе 12км яйцо пропадет!",
          "Бесконечный инкубатор используйте для 2км яиц, а супер-инкубаторы — для 10км и 12км."
        ]
      }
    }
  ]
},
  {
  "id": "field-research-tasks-guide",
  "slug": "field-research-tasks-guide",
  "iconName": "Target",
  "imageUrl": "https://cdn.leekduck.com/assets/img/icons/research.png",
  "featured": false,
  "author": "PoGo Events Team",
  "readTime": "9 min",
  "updatedAt": "2026-10-17",
  "category": {
    "cs": "Výzkumy & Úkoly",
    "en": "Field Research & Quests",
    "ja": "フィールドリサーチ",
    "ru": "Полевые исследования"
  },
  "title": {
    "cs": "Polní výzkum Pokémon GO: Aktuální úkoly z PokéStopů a odměny",
    "en": "Field Research in Pokémon GO: Current PokéStop Tasks & Rewards",
    "ja": "フィールドリサーチ完全攻略：最新タスクとリワードポケモン一覧",
    "ru": "Полевые исследования в Pokémon GO: Текущие квесты с покестопов и награды"
  },
  "subtitle": {
    "cs": "Kompletní živý seznam všech aktuálních polních úkolů z PokéStopů, garantovaná setkání s Pokémony, Spinda formy a Research Breakthrough.",
    "en": "Live registry of all current PokéStop Field Research tasks, encounter rewards, Spinda patterns, and monthly Research Breakthrough.",
    "ja": "現在ポケストップから入手できる全フィールドリサーチタスク、リワードポケモン、パッチール模様、大発見報酬を完全収録。",
    "ru": "Полный актуальный список квестов с покестопов, награды за выполнение, формы Спинды и коробка за 7 дней."
  },
  "sections": [
    {
      "id": "field-research-overview",
      "heading": {
        "cs": "1. Jak funguje systém polních úkolů a razítek",
        "en": "1. Field Research Mechanics & Daily Stamps",
        "ja": "1. フィールドリサーチの仕組みとスタンプ収集",
        "ru": "1. Механика полевых заданий и ежедневные печати"
      },
      "content": {
        "cs": "Otočením fotodisku na libovolném PokéStopu získáte jeden náhodný polní úkol (Field Research). Každý PokéStop dává všem hráčům v daný kalendářní den stejný úkol.\n\nZa první splněný úkol v každém kalendářním dni obdržíte jedno razítko. Po nasbírání 7 razítek se odemkne Research Breakthrough (Průlom ve výzkumu), který přináší balíček odměn (XP, Stardust, vzácné předměty jako Remote Raid Pass nebo Sinnoh/Unova Stone) a setkání s vybraným měsíčním Pokémonem.\n\nNíže naleznete živou databázi všech aktuálně platných úkolů rozdělených podle kategorií.",
        "en": "Spinning any PokéStop Photo Disc dispenses one randomized Field Research objective. Every PokéStop gives the exact same task to all trainers on any given calendar day.\n\nCompleting at least one task per day earns a Research Stamp. Collecting 7 stamps unlocks the Research Breakthrough containing generous XP, Stardust, rare evolutionary items, and an encounter with the featured monthly species.\n\nExplore our live category-filtered task matrix below.",
        "ja": "ポケストップのフォトディスクを回すと、1つのフィールドリサーチタスクが手に入ります。同じポケストップからは、その日一日全プレイヤー共通のタスクが出現します。\n\n毎日1つタスクをクリアするごとにスタンプが1つ押され、7個集めると「大発見」報酬（大量のXPやすな、ふしぎなアメ、限定ポケモン）がアンロックされます。\n\n以下にカテゴリ別の最新リサーチタスク一覧をリアルタイム表示しています。",
        "ru": "Вращение покестопа дает одно полевое задание. Каждый покестоп выдает одинаковый квест всем игрокам в течение суток.\n\nПервое выполненное задание в день дает печать. Собрав 7 печатей, вы открываете недельную коробку Research Breakthrough с ценными наградами и покемоном.\n\nНиже представлена актуальная интерактивная база квестов."
      },
      "tips": {
        "cs": [
          "Odložené odměny za chytání: Pokud splníte úkol se setkáním s pokémonem, můžete z obrazovky chytání utéct! Pokémon se uloží do vaší fronty (až 100 pokémonů), kde si ho můžete schovat na Spotlight Hour s bonusem 2×/3× Catch Stardust!",
          "Těžké nebo zdlouhavé úkoly (např. 'Vyhraj 5 raidů') můžete kdykoliv beztrestně smazat ikonkou koše a otočit jiný PokéStop pro snazší úkol."
        ],
        "en": [
          "The Encounter Stacking Trick: You can flee from completed task catch screens to bank up to 100 encounters in a reserve queue. Catch them all during 2× or 3× Catch Stardust events!",
          "Do not hesitate to trash arduous tasks via the trash can icon to free up slots for quick throw and spin objectives."
        ],
        "ja": [
          "リワードストック裏技：タスク達成後の遭遇画面から「逃げる」と、最大100匹まで捕獲枠をストックできます。ほしのすな倍増イベント時に一括捕獲しましょう！",
          "時間がかかるタスクはゴミ箱アイコンで気兼ねなく破棄し、回転率を高めましょう。"
        ],
        "ru": [
          "Трюк со стаком: можно убегать с экрана поимки квестового покемона и копить до 100 штук в очереди для ловли во время 2×/3× пыли!",
          "Удаляйте долгие квесты и ищите быстрые на броски или ягоды."
        ]
      }
    }
  ]
},
  {
    "id": "extra-stardust-pokemon-guide",
    "slug": "extra-stardust-pokemon-guide",
    "iconName": "Sparkles",
    "imageUrl": "https://cdn.leekduck.com/assets/img/items/Star%20Piece.png",
    "featured": false,
    "author": "PoGo Events Team",
    "readTime": "5 min",
    "updatedAt": "2026-10-17",
    "category": {
      "cs": "Stardust & Bonusy",
      "en": "Stardust & Bonuses",
      "ja": "ほしのすな＆ボーナス",
      "ru": "Пыль и Бонусы"
    },
    "title": {
      "cs": "Pokémoni s extra Stardustem za chycení: Kompletní přehled a hodnoty",
      "en": "Pokémon That Give Extra Stardust on Catch: Complete Payout Guide",
      "ja": "捕獲時にほしのすなが多くもらえるポケモン一覧：天候ブースト＆ほしのかけら早見表",
      "ru": "Покемоны с бонусной пылью (Stardust) за поимку: Полный список и таблицы"
    },
    "subtitle": {
      "cs": "Přehled všech 24 Pokémonů, kteří při chycení dávají 500 až 2 100 základního Stardustu, včetně hodnot při Weather Boostu a aktivním Star Piece.",
      "en": "Complete tier list of all 24 Pokémon rewarding 500 to 2,100 base Stardust upon capture, including Weather Boost and Star Piece multipliers.",
      "ja": "捕まえるだけで通常の5倍〜21倍（基本500〜2,100）のほしのすなを獲得できる全24種のポケモンとボーナス計算一覧。",
      "ru": "Все 24 покемона, дающих от 500 до 2 100 базовой пыли при поимке, с расчетом погодного буста и Star Piece."
    },
    "sections": [
      {
        "id": "stardust-multipliers-and-shadows",
        "pokemon": ["Audino", "Cloyster", "Shellder", "Chimecho", "Alolan Meowth", "Trubbish"],
        "heading": {
          "cs": "1. Jak funguje násobení Stardustu (Weather Boost & Star Piece) a pozor na Shadow",
          "en": "1. How Stardust Multipliers Work (Weather Boost & Star Piece) & Shadow Warning",
          "ja": "1. ほしのすな倍率の仕組み（天候ブースト＆ほしのかけら）とシャドウの注意点",
          "ru": "1. Как работают множители пыли (Weather Boost и Star Piece) и исключение Shadow"
        },
        "content": {
          "cs": "Zatímco drtivá většina Pokémonů v Pokémon GO dává při chycení standardních 100 Stardustu (300 u druhého a 500 u třetího vývojového stádia), vybraná skupina 24 Pokémonů odměňuje trenéry masivním bonusem od 500 až do 2 100 základního Stardustu za jediný odchyt.\n\nVšechny tyto zvýšené základní hodnoty se navíc násobí s dalšími herními bonusy:\n• Weather Boost (+25 %): Pokud daného Pokémona chytíte v počasí, které posiluje jeho typ, získáte o čtvrtinu více Stardustu.\n• Star Piece (+50 %): Aktivace předmětu Star Piece na 30 minut zvýší veškerý získaný Stardust o polovinu.\n• Kombinace obojího (+87,5 %): Při současném Weather Boostu a zapnutém Star Piece se oba násobiče násobí navzájem (1,25 × 1,5 = 1,875×), takže například jediný chycený Audino vynese neuvěřitelných 3 938 Stardustu!\n\n⚠️ Důležité upozornění na Shadow Pokémony:\nStínové (Shadow) varianty těchto Pokémonů zachráněné od Team GO Rocket tento bonus NEMAJÍ a při chycení dávají pouze standardní nenavýšené množství Stardustu.",
          "en": "While the vast majority of species in Pokémon GO reward the standard 100 Stardust upon capture (300 for stage 1 and 500 for stage 2 evolutions), an exclusive group of 24 Pokémon awards between 500 and 2,100 base Stardust per catch.\n\nThese base payouts stack multiplicatively with active bonuses:\n• Weather Boost (+25%): Catching a species during its boosted weather condition increases the base Stardust payout by 25%.\n• Star Piece (+50%): Activating a Star Piece boosts all Stardust gains by 50% for 30 minutes.\n• Weather Boost + Star Piece (+87.5%): Combining both multipliers yields 1.875× base Stardust — turning a single weather-boosted Audino catch into a massive 3,938 Stardust payout!\n\n⚠️ Important Note on Shadow Pokémon:\nShadow variations of these Pokémon rescued from Team GO Rocket Grunts or Leaders do NOT grant bonus Stardust and only reward the standard base amount.",
          "ja": "ポケモンの大半は捕獲時に基本100の「ほしのすな」しか獲得できませんが、特定の24種類のポケモンは1匹捕まえるだけで基本500〜最大2,100ものほしのすなをドロップします。\n\nさらに、これらの基本値はゲーム内のボーナスと乗算で重複します：\n• 天候ブースト（+25%）：対象タイプがブーストされる天候時に捕獲すると獲得量が1.25倍に増加。\n• ほしのかけら（+50%）：30分間すべてのほしのすな獲得量が1.5倍に増加。\n• 天候＋ほしのかけら（+87.5%）：両方重なると約1.875倍となり、タブンネ1匹でなんと3,938ものほしのすなを獲得できます！\n\n⚠️ シャドウポケモンの注意点：\nGOロケット団から救出する「シャドウ」の姿のポケモンにはこのボーナスが適用されず、通常の基本獲得量となります。",
          "ru": "В то время как большинство покемонов в Pokémon GO дают стандартные 100 пыли при поимке, особая группа из 24 покемонов приносит от 500 до 2 100 базовой пыли за каждого пойманного покемона.\n\nЭти базовые значения перемножаются с активными бонусами:\n• Погодный буст (+25%): Поимка покемона в подходящую погоду увеличивает базовую награду на четверть.\n• Star Piece (+50%): Активация предмета Star Piece увеличивает всю получаемую пыль в 1,5 раза на 30 минут.\n• Погода + Star Piece (+87,5%): Оба бонуса перемножаются (1,25 × 1,5), благодаря чему один Audino под погодным бустом и Star Piece приносит сразу 3 938 пыли!\n\n⚠️ Важное примечание о Shadow покемонах:\nТеневые (Shadow) версии этих покемонов от Team GO Rocket НЕ дают бонусной пыли и приносят только стандартное базовое количество."
        },
        "tips": {
          "cs": [
            "Pozor také na regionální výjimky: zatímco Kanto Meowth (500) a Alolan Meowth (750) bonus dávají, Galarian Meowth dává pouze běžných 100 Stardustu.",
            "Houboví Pokémoni (Paras, Shroomish, Foongus, Morelull) jsou v přírodě nejčastější a za slunečného (Sunny) či zataženého (Cloudy) počasí představují nejlepší každodenní zdroj Stardustu."
          ],
          "en": [
            "Watch out for regional exceptions: while Kanto Meowth (500) and Alolan Meowth (750) grant bonus Stardust, Galarian Meowth only rewards the standard 100 Stardust.",
            "Mushroom species (Paras, Shroomish, Foongus, Morelull) spawn frequently in the wild and are the most reliable daily Stardust farm during Sunny or Cloudy weather."
          ],
          "ja": [
            "リージョンフォームの例外に注意：通常のニャース（500）とアローラニャース（750）はボーナス対象ですが、ガラルニャースは通常の100すなしか獲得できません。",
            "キノコ系ポケモン（パラス、キノココ、タマゲタケ、ネマシュ）は野生で出現しやすく、晴天や曇りの日に最も稼ぎやすいターゲットです。"
          ],
          "ru": [
            "Обратите внимание на региональное исключение: обычный Meowth (500) и Alolan Meowth (750) дают бонус, а вот Galarian Meowth приносит только стандартные 100 пыли.",
            "Грибные покемоны (Paras, Shroomish, Foongus, Morelull) чаще всего встречаются в дикой природе и отлично подходят для ежедневного фарма в солнечную или облачную погоду."
          ]
        }
      },
      {
        "id": "stardust-events-strategy",
        "pokemon": ["Paras", "Meowth", "Foongus", "Morelull", "Combee", "Staryu"],
        "heading": {
          "cs": "2. Tipy na eventy: Spotlight Hour, Community Day a stackování úkolů",
          "en": "2. Event Grinding Tips: Spotlight Hour, Community Day & Task Stacking",
          "ja": "2. イベント活用術：スポットライトアワー、コミュニティ・デイ、タスクストック",
          "ru": "2. Советы для ивентов: Spotlight Hour, Community Day и накопление квестов"
        },
        "content": {
          "cs": "Skutečný potenciál těchto Pokémonů se naplno projeví během eventů s násobičem Stardustu za chycení (2× Catch Stardust během vybraných úterních Spotlight Hours nebo 3× Catch Stardust během Community Days):\n\n• Spotlight Hour s bonusovým Pokémonem: Když se v úterý od 18:00 do 19:00 objeví v Spotlight Hour Pokémon jako Shellder, Trubbish, Foongus, Morelull nebo Paras (často navíc s bonusem 2× Catch Stardust), zapněte dva Star Piece po sobě. Za jedinou hodinu aktivního chytání získáte 300 000 až 500 000+ Stardustu!\n• Stackování odměn z Field Research: Pokud z PokéStop úkolu získáte setkání s bonusovým Pokémonem (např. Combee, Staryu, Shellder, Paras, Trubbish nebo Audino), nemusíte ho chytat hned. Klikněte vlevo nahoře na ikonu útěku — Pokémon se bezpečně uloží do vaší fronty odměn (lze takto nastackovat až 100 Pokémonů). Celou frontu pak vychytejte naráz pod jedním Star Piece během 3× Stardust Community Day!",
          "en": "The true power of bonus Stardust species shines during events featuring Catch Stardust multipliers (2× Catch Stardust during Tuesday Spotlight Hours or 3× Catch Stardust during Community Days):\n\n• Bonus Species Spotlight Hours: Whenever a Tuesday Spotlight Hour (6:00–7:00 PM) features Shellder, Trubbish, Foongus, Morelull, or Paras — especially paired with a 2× Catch Stardust bonus — running two Star Pieces allows you to farm 300,000 to 500,000+ Stardust in a single hour!\n• Field Research Encounter Stacking: When you complete a Field Research task that rewards a bonus Stardust Pokémon (such as Combee, Staryu, Shellder, Paras, Trubbish, or Audino), tap the top-left Run button instead of catching it immediately. You can bank up to 100 encounters in your research queue and catch them all under a single Star Piece during a 3× Catch Stardust Community Day!",
          "ja": "これらのポケモンが真価を発揮するのは、捕獲時ほしのすな倍増イベント（2倍スポットライトアワーや3倍コミュニティ・デイ）の期間中です：\n\n• スポットライトアワーの大量獲得：火曜18:00〜19:00にシェルダー、ヤブクロン、タマゲタケ、ネマシュ、パラスなどが対象になった際は、ほしのかけらを2個連続で使いましょう。1時間で30万〜50万以上のほしのすなを一気に稼げます！\n• フィールドリサーチの裏技ストック：タスク報酬でミツハニーやシェルダー、タブンネなどが出たら、捕まえずに左上の「逃げる」をタップして最大100匹までストックしておきましょう。捕獲すな3倍のコミュニティ・デイ中にほしのかけらを使ってまとめて捕獲するのが最高効率です！",
          "ru": "Максимальную выгоду эти покемоны приносят во время ивентов с множителями пыли за поимку (2× Catch Stardust на вторничных Spotlight Hour или 3× Catch Stardust на Community Day):\n\n• Spotlight Hour с бонусным покемоном: Когда во вторник с 18:00 до 19:00 героем часа становится Shellder, Trubbish, Foongus, Morelull или Paras (особенно с бонусом 2× пыли), включите два Star Piece подряд. За один час можно легко нафармить от 300 000 до 500 000+ пыли!\n• Накопление квестов (Research Stacking): Получив за полевой квест встречу с бонусным покемоном (Combee, Staryu, Shellder, Paras, Trubbish или Audino), сбегите с экрана поимки. В очереди можно накопить до 100 покемонов и поймать их всех под одним Star Piece во время 3× пыли на Community Day!"
        },
        "tips": {
          "cs": [
            "Někteří z těchto Pokémonů (Audino, Chimecho, Sableye, Combee) mají nižší základní šanci na chycení — mějte v zásobě Ultra Bally a Golden Razz / Razz Berries, abyste při zapnutém Star Piece neztráceli drahocenné vteřiny.",
            "Naučte se techniku rychlého chytání (Fast Catch trick), která přeskočí animaci chycení míčku a ztrojnásobí počet chycených Pokémonů za půlhodinu běhu Star Piece."
          ],
          "en": [
            "Several high-tier Stardust species (Audino, Chimecho, Sableye, Combee) have tough base catch rates — stock up on Ultra Balls and Razz/Golden Razz Berries so you don't waste precious Star Piece time.",
            "Use the Fast Catch technique to skip the Poké Ball shake animation and triple your catches per 30-minute Star Piece."
          ],
          "ja": [
            "タブンネ、チリーン、ヤミラミ、ミツハニーは基本捕獲率が低めです。ほしのかけら使用中に時間をロスしないよう、ハイパーボールとズリのみ／きんのズリのみを準備しておきましょう。",
            "捕獲演出をスキップする「ファストキャッチ」を使えば、ほしのかけら30分間の捕獲数を3倍に増やせます。"
          ],
          "ru": [
            "У некоторых покемонов из верхних тиров (Audino, Chimecho, Sableye, Combee) низкий базовый шанс поимки — запаситесь Ultra Ball и ягодами Razz/Golden Razz, чтобы не терять время действия Star Piece.",
            "Используйте технику быстрой ловли (Fast Catch), чтобы пропускать анимацию покебола и ловить в 3 раза больше покемонов."
          ]
        }
      }
    ]
  }
];
