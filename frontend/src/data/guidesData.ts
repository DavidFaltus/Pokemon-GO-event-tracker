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
        pokemon: ["Riolu", "Dratini", "Bagon", "Larvitar"],
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
        pokemon: ["Machamp", "Gengar", "Alakazam", "Gurdurr"],
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
    "id": "intro",
    "pokemon": [
      "Lucario",
      "Machamp",
      "Swampert"
    ],
    "heading": {
      "cs": "1. Úvod do bojů s Team GO Rocket a 2,5sekundová 'Stun Lock' mechanika",
      "en": "1. Introduction to Team GO Rocket Battles & The 2.5-Second Stun Lock",
      "ja": "1. GOロケット団バトルの基本と2.5秒間の硬直時間（スタンループ）",
      "ru": "1. Введение в битвы с Командой GO Ракета и 2.5-секундный стан"
    },
    "content": {
      "cs": "Team GO Rocket obsazuje PokéStopy a každých 6 hodin přilétá v horkovzdušných balónech (00:00, 06:00, 12:00, 18:00). Porážkou 6 řadových členů (Grunts) získáte 6 Mysterious Components a automaticky sestavíte Rocket Radar pro zaměření lídrů Sierry, Cliffa a Arla.\n\nKlíčová herní mechanika (Stun Lock):\nPo každém nabitém útoku (Charged Move) a po každé výměně Pokémona (Swap) se protivníkův bot na přesně 2 až 2,5 sekundy zastaví a vůbec neútočí! Tento čas představuje naprostý základ úspěchu — během něj stihnete provést 3 až 4 rychlé útoky (Fast Attacks), vygenerovat energii a nabít další Charged Move bez ztráty jediného HP.",
      "en": "Team GO Rocket invades PokéStops and operates hot-air balloons every 6 hours (00:00, 06:00, 12:00, 18:00). Defeating 6 Grunts earns 6 Mysterious Components to construct a Rocket Radar and locate Leaders Sierra, Cliff, and Arlo.\n\nThe Crucial Stun Lock Mechanic:\nAfter EVERY Charged Move or Pokémon switch (Swap), the Rocket AI freezes completely for 2.0 to 2.5 seconds without attacking! This stun frame is the single most vital combat mechanic in Rocket battles — it gives you 3 to 4 free Fast Attacks, generating energy safely without taking any damage.",
      "ja": "GOロケット団はポケストップを黒く占拠し、6時間おき（0:00、6:00、12:00、18:00）に気球で上空に出現します。したっぱ（Grunts）を6体撃破して「ふしぎなパーツ」を6個集めると、ロケットレーダーが完成してリーダー（シエラ、クリフ、アルロ）と戦えます。\n\n最重要テクニック「スタンループ（硬直時間）」：\nスペシャルアタック（Charged Move）の発動直後およびポケモン交代直後、敵AIの攻撃が約2.0〜2.5秒間完全に停止します！この硬直時間中に通常技を3〜4回叩き込んでエネルギーを安全に溜め、一方的に連続技を繰り出すのが勝利への絶対条件です。",
      "ru": "Команда GO Ракета захватывает покестопы и прилетает на воздушных шарах каждые 6 часов (00:00, 06:00, 12:00, 18:00). Победа над 6 пешками собирает 6 Mysterious Components в Rocket Radar для поиска лидеров Сиерры, Клиффа и Арло.\n\nГлавная боевая механика (Stun Lock):\nПосле КАЖДОГО заряжаемого удара (Charged Move) или смены покемона бот замирает на 2–2.5 секунды и совершенно не атакует! Это окно дает вам возможность сделать 3–4 быстрых удара и накопить энергию абсолютно без урона."
    },
    "tips": {
      "cs": [
        "⚡ Taktika prvního tahu: Nikdy nezačínejte boj s hlavním útočníkem v 1. slotu! Dejte ho do 2. slotu a vteřinu po startu zápasu na něj bleskově přepněte. Získáte okamžitý 2,5s stun zdarma!",
        "Lídři a Giovanni VŽDY spálí své 2 štíty na vaše první 2 Charged útoky bez ohledu na sílu útoku. Používejte rychlé spamovací útoky: Power-Up Punch, Cross Chop, Dragon Claw, Mud Shot nebo Aqua Tail."
      ],
      "en": [
        "⚡ Turn-1 Swap Exploit: Never lead with your primary carry in slot 1! Place it in slot 2 and instantly swap to it the second the battle commences to trigger a free 2.5-second freeze!",
        "Leaders and Giovanni ALWAYS use their 2 shields on your first 2 charged attacks. Lead with ultra-low-energy shield breakers: Power-Up Punch, Cross Chop, Dragon Claw, or Aqua Tail."
      ],
      "ja": [
        "⚡ 開幕交代裏技：主力アタッカーを1番目に置かず、2番目にセットして開幕と同時に即交代！初手から2.5秒の硬直時間を作ってエネルギーを有利に溜めましょう。",
        "リーダーとサカキは最初の2回のスペシャルアタックに必ずシールドを消費します。グロウパンチ、クロスチョップ、アクアテール等の最速技で早急にシールドを割ってください。"
      ],
      "ru": [
        "⚡ Смена на старте: Не ставьте главного бойца в 1-й слот! Поставьте во 2-й и сменитесь на него на 1-й секунде боя для бесплатного 2.5-секундного стана!",
        "Лидеры и Джованни ВСЕГДА щитуют первые 2 атаки. Сбивайте щиты спам-атаками: Power-Up Punch, Cross Chop, Aqua Tail или Dragon Claw."
      ]
    }
  },
  {
    "id": "leaders-sierra-cliff-arlo",
    "pokemon": [
      "Trapinch",
      "Aerodactyl",
      "Bagon",
      "Scizor",
      "Tyranitar"
    ],
    "heading": {
      "cs": "2. Strategie na Lídry (Sierra, Cliff, Arlo) & Možnost Shiny Shadow",
      "en": "2. Leader Breakdown: Sierra, Cliff, Arlo & Shiny Shadow Hunting",
      "ja": "2. 幹部リーダー攻略（シエラ・クリフ・アルロ）と色違いシャドウ厳選",
      "ru": "2. Стратегия против Лидеров (Сиерра, Клифф, Арло) и Shiny Shadow"
    },
    "content": {
      "cs": "Každý lídr má stálého 1. Pokémona, kterého po vítězství můžete chytit v prestižní Shiny Shadow variantě s šancí přibližně 1 ku 64:\n\n• Sierra (Trapinch / Sableye pool): Vyniká vysokým útokem. Proti jejímu leadu nasaďte Water/Grass (Kartana, Kyogre). Pokud nasadí Gardevoir ve 3. slotu, mějte připraveného Metagrosse s Meteor Mash pro zničení jejího nebezpečného útoku Charm.\n• Cliff (Aerodactyl pool): Aerodactyl dává enormní poškození kamennými útoky. Kyogre s Waterfall nebo Swampert s Hydro Cannon ho spolehlivě zastaví. Třetí slot často obsahuje Tyranitara, který má 4× slabost na Fighting útoky (Lucario, Terrakion, Machamp).\n• Arlo (Bagon pool): Bagon padá pod Ice útoky Mamoswina. Pokud se ve 3. slotu objeví Scizor, pamatujte, že má 4× slabost výhradně na Oheň (Fire). Jakýkoli ohnivý útočník (Reshiram, Heatran, Charizard) ho spálí během 3 sekund.",
      "en": "Each Leader possesses a fixed lead slot that drops as an encounterable Shadow Pokémon with an elevated ~1/64 Shiny Shadow probability upon victory:\n\n• Sierra: Features tricky psychic/dark coverage. Use Grass/Water specialists (Kartana, Kyogre). If she deploys Gardevoir in slot 3, counter with Metagross (Meteor Mash) to avoid taking devastating Charm damage.\n• Cliff: Aerodactyl's Rock Throw hits exceptionally hard. Counter with Kyogre (Waterfall) or Swampert (Hydro Cannon). His 3rd slot often contains Tyranitar, which collapses to 4x Fighting damage (Lucario, Terrakion, Machamp).\n• Arlo: Bagon is easily checked by Mamoswine's Ice attacks. When Arlo deploys Scizor in slot 3, remember that Scizor is doubly weak (4x) exclusively to Fire. Reshiram, Heatran, or Charizard will incinerate it in under 3 seconds.",
      "ja": "各リーダーを倒すと、1枠目のシャドウポケモンをゲットチャレンジで捕獲できます（約1/64の確率で色違いシャドウが出現！）：\n\n• シエラ：トラピンチにはカミツルギやカイオーガの水・草技が有効。3枠目にサーナイトが出現した場合は、「あまえる」の高打点を耐えるメタグロス（コメットパンチ）で即撃破しましょう。\n• クリフ：プテラのいわおとしは非常に高威力です。カイオーガやラグラージの水技で耐えつつ突破。3枠目のバンギラスには4倍弱点のかくとう技（ルカリオ、テラキオン）が刺さります。\n• アルロ：タツベイはマンムーの氷技で一掃。3枠目のハッサムは「ほのお」タイプのみが4倍二重弱点です。レシラムやヒードランで瞬時に焼き尽くしましょう。",
      "ru": "После победы над лидером вы ловите покемона из 1-го слота с повышенным шансом на Shiny Shadow (~1 к 64):\n\n• Сиерра: Против Trapinch хороши Kartana и Kyogre. Против Gardevoir в 3-м слоте держите Metagross, чтобы не умереть от Charm.\n• Клифф: Аэродактиль бьет очень больно — используйте Kyogre или Swampert. Против Tyranitar в 3-м слоте используйте 4х уязвимость к Fighting (Lucario, Terrakion).\n• Арло: Bagon быстро падает от Mamoswine. Если в 3-м слоте Scizor — используйте его 4х слабость к Огню (Reshiram, Heatran сжигают его за 3 секунды)."
    },
    "tips": {
      "cs": [
        "Vypnutí radaru: Pokud máte aktivní Rocket Radar a chcete plnit běžné úkoly pro Grunty, otevřete batoh, klepněte na Rocket Radar a zvolte 'Unequip'. Balóny a PokéStopy začnou opět nabízet běžné Grunty.",
        "12km Strange Eggs: Porážkou jakéhokoli lídra získáte 12km Strange Egg, pokud máte volný slot na vejce a volný slot v Pokémon boxu!"
      ],
      "en": [
        "Unequip Radar Trick: To farm regular Grunts while holding a Rocket Radar, unequip the radar in your Item Bag. Balloons will revert to spawning Grunts instead of Leaders.",
        "12km Strange Eggs: Clearing any Leader guarantees a 12km Strange Egg, provided you have open egg and storage slots before initiating battle!"
      ],
      "ja": [
        "レーダー解除技：したっぱタスクを進めたい時は、バッグ内のロケットレーダーを「はずす」に設定すれば、気球からしたっぱが再出現します。",
        "12kmタマゴの確保：リーダー勝利時にタマゴ枠とポケモンボックスに空きがあれば、確定で赤色の「12kmタマゴ」が手に入ります。"
      ],
      "ru": [
        "Отключение радара: Чтобы ловить обычных пешек, снимите Rocket Radar в сумке (Unequip). Шары снова станут приносить пешек.",
        "12-км красные яйца: Победа над лидером гарантирует 12-км Strange Egg, если у вас есть свободный слот для яиц и покемонов!"
      ]
    }
  },
  {
    "id": "giovanni-shadow-legendary",
    "pokemon": [
      "Persian",
      "Rayquaza",
      "Groudon",
      "Kyogre",
      "Mewtwo"
    ],
    "heading": {
      "cs": "3. Jak porazit Šéfa Giovanniho & Získat Shadow Legendy",
      "en": "3. Defeating Boss Giovanni & Securing Shadow Legendaries",
      "ja": "3. ボス・サカキの攻略法＆シャドウ伝説ポケモンの入手",
      "ru": "3. Как победить Босса Джованни и забрать Теневых Легенд"
    },
    "content": {
      "cs": "Giovanni je nejvyšší velitel Team GO Rocket, kterého lze vyhledat výhradně pomocí černého Super Rocket Radaru získaného ze sezónních Special Research úkolů.\n\nSložení Giovanniho týmu:\n1. Slot 1 (Vždy Persian): Extrémně agresivní normální Fast útok (Scratch / Feint Attack). Pokud použije Scratch, dokáže zničit nepřipraveného Pokémona za pár sekund. Proti němu je bezkonkurenční Lucario s Counter + Power-Up Punch. Každý Power-Up Punch zvýší Lucariův útok o 1 stupeň a vyvolá 2,5sekundový stun.\n2. Slot 2 (Rotující trojice): Kingdra, Rhyperior, Nidoking, Kangaskhan nebo Garchomp. Swampert s Mud Shot + Hydro Cannon pokryje většinu variant.\n3. Slot 3 (Shadow Legendary): Aktuálně rotující legendární Pokémon (např. Shadow Rayquaza, Shadow Kyogre, Shadow Groudon, Shadow Mewtwo). Po vítězství je toto legendární monstrum garantovanou odměnou při chytání!",
      "en": "Giovanni is the supreme commander of Team GO Rocket, tracked exclusively using the black Super Rocket Radar rewarded from seasonal Special Research storylines.\n\nGiovanni's Squad Structure:\n1. Slot 1 (Always Persian): Employs relentless Fast Attacks (Scratch / Feint Attack). Scratch deals massive neutral damage. Lucario with Counter + Power-Up Punch is the undisputed king here — each Power-Up Punch boosts Attack while triggering 2.5 seconds of stun frames, dismantling Persian without casualty.\n2. Slot 2 (Rotating Pool): Kingdra, Rhyperior, Nidoking, Kangaskhan, or Garchomp. Swampert with Mud Shot + Hydro Cannon provides universal coverage.\n3. Slot 3 (Featured Shadow Legendary): The featured legendary of the season (Shadow Rayquaza, Shadow Groudon, Shadow Mewtwo). Defeating Giovanni guarantees a 100% encounter with this Shadow Legendary!",
      "ja": "サカキは黒い「スーパーロケットレーダー」を使用することで探索できるロケット団の最高ボスです。\n\nサカキのバトル構成：\n1. 1枠目（ペルシアン固定）：通常技「ひっかく」の威力が極めて危険。ルカリオ（カウンター＋グロウパンチ）で戦い、技を撃つたびに攻撃バフと2.5秒の硬直時間を稼ぎながらシールドを2枚割ります。\n2. 2枠目（ランダム）：キングドラ、ドサイドン、ニドキング、ガルーラ、ガブリアス等。マッドショット＋ハイドロカノンのラグラージで柔軟に対応可能。\n3. 3枠目（期間限定シャドウ伝説）：シャドウレックウザ、シャドウグラードン、シャドウミュウツー等の伝説枠。勝利すると確定でゲットチャレンジへ進めます！",
      "ru": "Джованни отслеживается исключительно с помощью черного Super Rocket Radar из сезонных квестов Special Research.\n\nКоманда Джованни:\n1. Слот 1 (Всегда Persian): Имеет дикий урон от Scratch. Используйте Lucario с Power-Up Punch — каждый удар баффает атаку и активирует стан.\n2. Слот 2 (Ротация): Kingdra, Rhyperior, Kangaskhan или Garchomp. Swampert отлично закрывает большинство вариантов.\n3. Слот 3 (Теневой Легендарный босс): Shadow Rayquaza, Shadow Kyogre, Shadow Mewtwo. Победа дает 100% поимку этого легендарного покемона!"
    },
    "tips": {
      "cs": [
        "Šetření Super Rocket Radaru: Nemusíte Giovanniho porazit ihned! Pokud aktuální Shadow Legenda není meta-relevantní, můžete si Super Rocket Radar schovat v inventáři a počkat na příchod silnější Legendy (např. Shadow Rayquaza nebo Shadow Mewtwo).",
        "Decoy Grunts: Když máte zapnutý Super Rocket Radar, na PokéStopech často narazíte na falešné 'Decoy Grunty' (Bellsprout Grunts). Ti představují skvělý způsob, jak snadno farmit Mysterious Components a Stardust!"
      ],
      "en": [
        "Radar Stacking Strategy: You do NOT have to fight Giovanni immediately. If the current Shadow Legendary is low-priority, keep the Super Rocket Radar unequipped and stack it for future PvE monsters (Shadow Rayquaza, Shadow Mewtwo).",
        "Farming Decoy Grunts: Super Rocket Radars illuminate PokéStops with Decoy Grunts (Bellsprout lineups). Use these to safely farm Mysterious Components, Radar pieces, and Stardust!"
      ],
      "ja": [
        "レーダー温存戦略：現在のシャドウ伝説が不要な場合、スーパーロケットレーダーを使わずに温存し、将来のシャドウレックウザやミュウツーの時に一気に複数体捕獲できます。",
        "おとり下っ端（Decoy Grunts）：レーダー起動時にポケストップにおとりが出現します。ふしぎなパーツやほしのすなを高速周回する絶好のチャンスです。"
      ],
      "ru": [
        "Стратегия сохранения радара: Вы не обязаны бить Джованни прямо сейчас. Radar можно приберечь до появления топовых лег (Shadow Rayquaza, Mewtwo).",
        "Фарм Decoy Grunts: Под супер-радаром на покестопах сидят фальшивые пешки (Decoy). На них отлично фармить детали и пыль!"
      ]
    }
  },
  {
    "id": "balloons-and-radars",
    "pokemon": [
      "Zubat",
      "Magikarp",
      "Rattata",
      "Aron"
    ],
    "heading": {
      "cs": "4. Balóny, rotace časů a radary: Jak efektivně farmit Rakeťáky",
      "en": "4. Balloons, Radar Mechanics & Maximum Grunt Farming Efficiency",
      "ja": "4. 気球の出現スケジュールとレーダーの効率周回ルート",
      "ru": "4. Воздушные шары, расписание и радары: Эффективный фарм"
    },
    "content": {
      "cs": "Horkovzdušné balóny Team GO Rocket jsou nezávislé na PokéStopech a přilétají přímo k vám domů podle přesného 6hodinového cyklu:\n• 00:00 – 05:59 (Noční balón)\n• 06:00 – 11:59 (Ranní balón)\n• 12:00 – 17:59 (Odpolední balón)\n• 18:00 – 23:59 (Večerní balón)\n\nBěhem speciálních 'Rocket Takeover' eventů se tento interval zkracuje na každé 2 až 3 hodiny! Pokud máte sestavený Rocket Radar, z balónu vždy vystoupí jeden z Lídrů. Pokud máte Super Rocket Radar, z balónu vystoupí přímo Giovanni (u balónů se nikdy neobjevují Decoy Grunti).",
      "en": "Rocket Balloons operate completely independently of physical PokéStops, hovering directly above your avatar on a fixed 6-hour cycle:\n• 00:00 – 05:59 (Night balloon)\n• 06:00 – 11:59 (Morning balloon)\n• 12:00 – 17:59 (Afternoon balloon)\n• 18:00 – 23:59 (Evening balloon)\n\nDuring official 'Team GO Rocket Takeover' events, this interval shrinks to every 2 or 3 hours! If you have a Rocket Radar active, the balloon will always spawn a Leader. If you have a Super Rocket Radar active, Giovanni will spawn directly (Decoy Grunts never appear in balloons).",
      "ja": "ロケット団の気球はポケストップの有無に関わらず、トレーナーの現在地に6時間間隔で飛来します：\n• 0:00〜5:59（深夜枠）\n• 6:00〜11:59（早朝・午前枠）\n• 12:00〜17:59（午後枠）\n• 18:00〜23:59（夜枠）\n\n「占拠イベント」期間中は2〜3時間おきに飛来頻度が急増します。ロケットレーダー起動時は必ずリーダーが、スーパーロケットレーダー起動時は確定でサカキ本人が搭乗して出現します（気球にはおとり下っ端は出現しません）。",
      "ru": "Воздушные шары прилетают прямо к вам независимо от покестопов по 6-часовому графику:\n• 00:00 – 05:59 (Ночь)\n• 06:00 – 11:59 (Утро)\n• 12:00 – 17:59 (День)\n• 18:00 – 23:59 (Вечер)\n\nВо время ивентов Takeover шары прилетают каждые 2–3 часа! Если включен Rocket Radar — прилетит Лидер, а с Super Rocket Radar — сам Джованни."
    },
    "tips": {
      "cs": [
        "Restart aplikace: Pokud v daném časovém okně balón nevidíte, restartujte hru a počkejte 10 sekund na mapě — balón se okamžitě snese z nebe.",
        "Rychlé čištění za 1 000 Stardustu: Pro medaili Purifier i referral úkoly čistěte výhradně levné druhy: Zubat, Golbat, Magikarp, Rattata, Pidgey a Aron!"
      ],
      "en": [
        "Force Spawn: If a balloon hasn't appeared during the active window, restart the game client and wait 10 seconds in the overworld to force it to spawn.",
        "Cheap 1,000 Dust Purifications: To progress the Purifier platinum medal and referral quests, only purify 1,000-dust species: Zubat, Magikarp, Rattata, and Aron!"
      ],
      "ja": [
        "強制出現テクニック：時間帯内に気球が見当たらない場合は、アプリを再起動してマップ上で10秒待機すると即座に上空から降下してきます。",
        "1000砂リトレーン厳選：メダル獲得やタスク消化時は、コスト1000のズバット、コイキング、コラッタ、ココドラのみをリトレーンしましょう。"
      ],
      "ru": [
        "Перезапуск игры: Если шара нет в нужное время, перезапустите приложение и подождите 10 секунд на карте.",
        "Дешевая очистка: Для платиновой медали и квестов очищайте только покемонов за 1000 пыли: Zubat, Magikarp, Rattata, Aron!"
      ]
    }
  },
  {
    "id": "frustration-and-shadow-bonus",
    "pokemon": [
      "Mewtwo",
      "Tyranitar",
      "Salamence",
      "Metagross"
    ],
    "heading": {
      "cs": "5. Odstranění Frustration, +20% Shadow Bonus a kdy Pokémony nečistit",
      "en": "5. Removing Frustration, The +20% Shadow Damage Bonus & The Purify Dilemma",
      "ja": "5. 「やつあたり」の消去、+20%シャドウボーナス＆リトレーン禁忌の法則",
      "ru": "5. Снятие атаки Frustration, +20% Shadow-бонус и дилемма очистки"
    },
    "content": {
      "cs": "Shadow Pokémoni mají unikátní pasivní vlastnost: +20 % k poškození všech útoků výměnou za -20 % k obraně. V raidových bitvách je poškození za sekundu (DPS) nejdůležitější statistikou, což ze Shadow Pokémonů dělá nejmocnější útočníky ve hře (např. 0% IV Shadow Mewtwo předčí v raidech 100% IV klasického Mewtwo!).\n\nOdstranění útoku Frustration:\nVšichni chycení Shadow Pokémoni mají zablokovaný útok Frustration. Ten nelze přepsat standardním Charged TM v běžné dny. Lze ho změnit POUZE během speciálních 'Team GO Rocket Takeover' eventů (zpravidla jednou za sezónu). Během eventu použijte obyčejné Charged TM.\n\nKdy Pokémony čistit a kdy NE:\n• NIKDY nečistěte: Top Shadow legendy (Mewtwo, Rayquaza, Groudon, Kyogre) a top PvE útočníky (Salamence, Metagross, Tyranitar, Machamp, Rhyperior, Excadrill).\n• KDY čistit: Pouze pro získání Mega evoluce (Shadow Pokémoni nemohou Mega evolvovat!), levné čištění za 1 000 Stardustu pro medaili, nebo pokud zisk +2 ke všem IV statistikám vytvoří vysněného 100% IV Hundo Pokémona pro Master League.",
      "en": "Shadow Pokémon possess a unique combat passive: +20% damage multiplier to all Fast and Charged attacks at the cost of -20% Defense. In PvE Raids where Damage Per Second (DPS) is king, Shadow Pokémon vastly outclass their regular counterparts (a 0% IV Shadow Mewtwo deals more DPS than a 100% IV regular Mewtwo!).\n\nRemoving Frustration Mechanics:\nAll wild Shadow catches are burdened with the Charged Attack Frustration. It CANNOT be unlearned with standard Charged TMs on ordinary days. It can ONLY be replaced during official 'Team GO Rocket Takeover' weekends (typically once per season) using standard Charged TMs.\n\nThe Purification Dilemma — When to Purify and When NOT to:\n• NEVER Purify: Elite Shadow Legendaries (Mewtwo, Rayquaza, Groudon, Kyogre) and premier PvE raid anchors (Salamence, Metagross, Tyranitar, Machamp, Excadrill).\n• WHEN to Purify: When the species possesses a top-tier Mega Evolution (Shadows cannot Mega Evolve!), for cheap 1,000-dust medal grinding, or if the +2 IV boost elevates a 13/13/13 monster into a 100% IV Hundo for Master League PvP.",
      "ja": "シャドウポケモンは「攻撃力+20%／防御力-20%」という破格のパッシブ補正を持っています。レイドバトルでは時間あたりのダメージ量（DPS）が最重要となるため、個体値0%のシャドウミュウツーが個体値100%の通常ミュウツーを圧倒的に凌駕します。\n\n「やつあたり」の消去方法：\nシャドウポケモンが初期習得している「やつあたり」は、通常時はわざマシンスペシャルを使っても忘れることができません。シーズンごとに数日間だけ開催される「GOロケット団占拠イベント」期間中のみ、通常のわざマシンスペシャルで変更可能です。\n\nリトレーンすべきか否かの判断基準：\n• 絶対にリトレーンしてはいけない：主力シャドウ伝説（ミュウツー、レックウザ、グラードン）および最強レイドアタッカー（ボーマンダ、メタグロス、バンギラス、カイリキー）。\n• リトレーン推奨：メガシンカさせたいポケモン（シャドウはメガシンカ不可！）、1000砂のメダル用、または個体値が+2ずつ底上げされて100%個体値（Hundo）になりマスターリーグで活躍できる場合。",
      "ru": "Теневые покемоны имеют пассивный бонус: +20% к урону (и -20% к защите). В рейдах важен DPS, поэтому 0% IV Shadow Mewtwo наносит значительно больше урона, чем обычный 100% IV Mewtwo!\n\nСнятие атаки Frustration:\nАтака Frustration заблокирована в обычные дни. Ее можно стереть обычным Charged TM ТОЛЬКО во время регулярных ивентов Team GO Rocket Takeover (примерно раз в сезон).\n\nОчищать или НЕТ:\n• НИКОГДА не очищайте: Топовых теневых легенд (Mewtwo, Rayquaza, Groudon) и лучших бойцов для рейдов (Salamence, Metagross, Tyranitar, Machamp).\n• КОГДА очищать: Если нужна Мега-эволюция (теневые не могут эволюционировать в Мега!), для дешевого фарма медали за 1000 пыли или если прибавка +2 ко всем IV сделает покемона 100% IV для Master League."
    },
    "tips": {
      "cs": [
        "Vyhledávací filtr pro Takeover: Jakmile začne event na změnu Frustration, zadejte: 'shadow&@frustration' a projděte celou svou sbírku!",
        "Elite TM není potřeba: K odstranění Frustration během Takeover eventu stačí obyčejný zelený Charged TM, neplýtvejte vzácnými Elite TM!"
      ],
      "en": [
        "Takeover Search String: As soon as a Takeover event goes live, search 'shadow&@frustration' to batch-unlearn moves across your roster!",
        "Standard TMs Suffice: You only need standard green Charged TMs during Takeovers — never waste rare Elite Charged TMs on Frustration removal!"
      ],
      "ja": [
        "占拠イベント用検索コマンド：イベント開始と同時に「シャドウ&@やつあたり」で検索し、主力全員の技を書き換えましょう。",
        "通常マシンで十分：やつあたり消去に必要なのは通常の緑色の「わざマシンスペシャル」です。貴重ないのちのわざマシン（すごいわざマシン）を使う必要はありません。"
      ],
      "ru": [
        "Поисковая строка для Takeover: На старте ивента введите 'shadow&@frustration' и смените атаку всем нужным покемонам!",
        "Обычные TM: Для снятия Frustration подходят обычные зеленые Charged TM, не тратьте редкие Elite TM!"
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
    "id": "raid-tiers-and-weather",
    "pokemon": [
      "Mewtwo",
      "Rayquaza",
      "Kyogre",
      "Groudon"
    ],
    "heading": {
      "cs": "1. Úrovně Raidů, Weather Boost a výpočet Catch CP (Level 20 vs 25)",
      "en": "1. Raid Tiers, Weather Boost Multipliers & Catch CP (Level 20 vs 25)",
      "ja": "1. レイドランク、天候ブースト倍率、捕獲時CPの仕様（レベル20 vs 25）",
      "ru": "1. Уровни Рейдов, Weather Boost и CP при поимке (Уровень 20 vs 25)"
    },
    "content": {
      "cs": "Raidy v Pokémon GO se dělí do 5 hlavních kategorií: 1★ (snadné solo), 3★ (střední, solo/duo), 5★ (Legendární a Ultra Beasts), Mega Raidy a Shadow Raidy (Tier 3 a Tier 5 s enrage mechanikou Purified Gems).\n\nZákladní statistiky bosse při chytání:\n• Bez počasí (Standard): Boss má při chytání vždy přesně Level 20 s minimálními garantovanými IV 10/10/10 (66,7 %) až po maximální 100% IV (15/15/15 Hundo).\n• S počasím (Weather Boost): Pokud herní počasí odpovídá alespoň jednomu z typů raidového bosse, boss je při chycení okamžitě na Levelu 25 (+5 úrovní navíc). Získáte tím silnějšího Pokémona a ušetříte desetitisíce Stardustu a desítky Candy za levelování z L20 na L25!\n\nBonus v boji: Weather Boost navíc zvyšuje útočnou sílu všech útoků odpovídajícího typu o +20 % přímo v raidové aréně.",
      "en": "Raid battles span 5 tiers: 1-Star (trivial solo), 3-Star (solo/duo), 5-Star (Legendary & Ultra Beasts), Mega Raids, and Shadow Raids (featuring Purified Gem enrage mechanics).\n\nEncounter Level & CP Parameters:\n• Standard (No Boost): The boss is encountered at Level 20 with an IV floor of 10/10/10 up to 15/15/15 (100% Perfect Hundo).\n• Weather Boosted: When current weather matches any of the boss's types, the boss appears at Level 25 (+5 levels higher). This awards a dramatically stronger Pokémon, saving 31,000 Stardust and 28 Candy needed to level from 20 to 25!\n\nCombat Advantage: Weather Boost concurrently boosts all matching-type moves by a flat +20% damage in real time.",
      "ja": "レイドバトルには1★（ソロ可）、3★（中級ソロ/デュオ）、5★（伝説/ウルトラビースト）、メガレイド、シャドウレイド（ライトクリスタル使用）が存在します。\n\n捕獲時レベルとCP仕様：\n• 通常時：レベル20で出現（個体値10/10/10〜15/15/15保証）。\n• 天候ブースト時：ボスのタイプと天候が一致すると、レベル25（+5レベル高い状態）で捕獲可能！育成に必要なほしのすな31,000とアメ28個を即座に節約できます。\n\n戦闘ボーナス：天候ブースト適用中の技は、バトル中の威力が一律+20%増加します。",
      "ru": "Рейды делятся на 1★, 3★, 5★ (Легендарные), Мега и Теневые (требующие Purified Gems).\n\nПараметры поимки:\n• Обычные условия: Уровень 20 с минимальными IV 10/10/10 до 100% IV (15/15/15).\n• Weather Boost: При совпадении погоды босс ловится сразу на 25 уровне (+5 уровней), что экономит 31 000 пыли и 28 конфет на прокачку!\n\nБонус в бою: Погодный буст увеличивает урон атак соответствующего типа на +20% в реальном времени."
    },
    "tips": {
      "cs": [
        "Využijte naši záložku 'Raids': V horním menu vidíte živý přehled všech aktivních bossů s přesnými minimálními a maximálními 100% IV CP hodnotami pro L20 i L25.",
        "Počasí se mění v celou hodinu: Pokud raid začíná v 16:55 a počasí se v 17:00 změní, úroveň chyceného bosse se řídí počasím v okamžiku poražení bosse!"
      ],
      "en": [
        "Use our live 'Raids' tab: Check our Raids view for live 100% IV CP charts for both Level 20 and Level 25 for every active boss.",
        "Top of the hour weather shifts: If you engage at 16:58 and the hour flips at 17:00, catch level is determined by the weather when the boss is defeated!"
      ],
      "ja": [
        "当サイトの「Raids」タブを活用：通常時（L20）とブースト時（L25）の個体値100% CPが一覧で確認できます。",
        "毎正時の天候変化に注意：16:55に開始して17:00に天候が変わった場合、ボス撃破時の天候が捕獲レベルに適用されます。"
      ],
      "ru": [
        "Раздел 'Raids' на сайте: Проверяйте точные значения 100% IV CP для 20 и 25 уровней всех активных боссов.",
        "Смена погоды каждый час: Уровень пойманного покемона определяется погодой в момент победы над боссом!"
      ]
    }
  },
  {
    "id": "party-power-and-friendship",
    "pokemon": [
      "Terrakion",
      "Lucario",
      "Swampert"
    ],
    "heading": {
      "cs": "2. Party Power (2× Charged Damage) a Friendship Multipliery",
      "en": "2. Party Play 2x Damage & Friendship Attack Multipliers",
      "ja": "2. チームコラボ（Party Play）の2倍技威力＆フレンド攻撃倍率",
      "ru": "2. Party Play (2x урон) и Множители Урона от Дружбы"
    },
    "content": {
      "cs": "V moderním Pokémon GO představuje kombinace Party Play a Friendship bonusu největší revoluci v obtížnosti raidů:\n\n1. Party Power mechanika:\nKdyž se 2 až 4 trenéři spojí do Party v herním profilu a společně vstoupí do raidu, v boji se vedle Charged útoku objeví modré tlačítko Party Power. Každý rychlý Fast Attack nabíjí kruhový ukazatel. Po jeho naplnění a stisknutí udělí váš následující Charged Attack masivní 2,0× (DVOJNÁSOBNÝ) damage!\n\n2. Stohování s Friendship bonusem:\nKdyž raidujete s přáteli, získáváte trvalý multiplikátor poškození po celou dobu zápasu:\n• Good Friends (1 den): +3 % bonus damage\n• Great Friends (7 dní): +5 % bonus damage\n• Ultra Friends (30 dní): +7 % bonus damage\n• Best Friends (90 dní): +10 % trvalý bonus damage!\n\nPři souběžném Weather Boostu (+20 %), Best Friends (+10 %) a aktivním Party Power (2×) udělí váš útok neuvěřitelných 2,64× základního poškození! Díky tomu lze porazit prakticky jakéhokoli 5★ bosse ve 2 lidech (Duo).",
      "en": "The combination of Party Play and Friendship multipliers constitutes the greatest power jump in modern raid mechanics:\n\n1. Party Power Mechanics:\nWhen 2 to 4 trainers group into a Party and enter a raid, a Party Power button illuminates. Fast attacks charge the gauge. Tapping it makes your next Charged Attack inflict an astronomical 2.0x (DOUBLE) damage!\n\n2. Friendship Multiplier Stacking:\nRaiding alongside friends adds a permanent damage boost throughout the entire encounter:\n• Good Friends (1 Day): +3% damage\n• Great Friends (7 Days): +5% damage\n• Ultra Friends (30 Days): +7% damage\n• Best Friends (90 Days): +10% permanent damage boost!\n\nWhen combined with Weather Boost (+20%), Best Friends (+10%), and Party Power (2x), your charged attacks hit for a staggering 2.64x base damage! This makes duo-takedowns on 5★ legendaries routine.",
      "ja": "チームコラボ（Party Play）とフレンド機能の相乗効果は、現代のレイド攻略における最大の革命です：\n\n1. チームコラボの威力（Party Power）：\n2〜4人でチームを組んでレイドに参加すると、専用のチームパワーボタンが出現。通常技でゲージを溜めてタップすると、次のスペシャルアタックが【2.0倍の特大ダメージ】に跳ね上がります！\n\n2. フレンドアタックボーナスの重ねがけ：\nフレンドと一緒に戦うと、バトル全体を通して永続的な与ダメージボーナスが付与されます（大親友で+10%！）。\n\n天候ブースト（+20%）×大親友（+10%）×チームパワー（2倍）が重なると、威力はなんと基礎値の2.64倍に到達！伝説レイドをわずか2人で討伐（デュオ撃破）することも容易になります。",
      "ru": "Связка Party Play и бонусов Дружбы — самый мощный способ разгона урона в рейдах:\n\n1. Механика Party Power:\nГруппа из 2–4 игроков заряжает кнопку Party Power быстрыми ударами. Активация кнопки дает 2.0x (ДВОЙНОЙ) урон на следующий Charged Attack!\n\n2. Стаки с бонусом Дружбы:\nРейд с друзьями дает постоянную прибавку к урону (Best Friends дают +10%!).\n\nВместе с Weather Boost (+20%) и Best Friends (+10%) кнопка Party Power разгоняет урон до 2.64x от базы, позволяя закрывать 5★ легенд вдвоем."
    },
    "tips": {
      "cs": [
        "Jedno- a dvou-barové Charged útoky: Party Power dává největší absolutní nárůst u silných jednobarových útoků jako Sacred Sword, Hydro Cannon, Avalanche nebo Shadow Force.",
        "Obnovení Party po 1 hodině: Nezapomeňte, že Party Play trvá 1 hodinu (lze prodloužit). Před začátkem Raid Hour zkontrolujte, zda party nevypršela!"
      ],
      "en": [
        "1-Bar & High-DPE Moves: Party Power yields the biggest absolute damage spikes on massive moves like Sacred Sword, Hydro Cannon, Avalanche, and Precipice Blades.",
        "1-Hour Party Timer: Party Play expires after 1 hour (extendable). Re-form or extend your party right before Raid Hour kicks off!"
      ],
      "ja": [
        "高威力技に合わせる：ハイドロカノン、ゆきなだれ、せいなるつるぎ等の高威力技にチームパワーを合わせると最大の瞬間火力を叩き出せます。",
        "チームの有効期限：チームコラボは1時間（延長可能）です。レイドアワー直前に期限が切れていないか確認しましょう。"
      ],
      "ru": [
        "Согласование атак: Party Power дает максимальную отдачу на мощных атаках вроде Sacred Sword, Hydro Cannon, Avalanche и Precipice Blades.",
        "Таймер группы: Party Play длится 1 час (можно продлить). Обновляйте группу перед началом Raid Hour!"
      ]
    }
  },
  {
    "id": "top-pve-attackers-meta",
    "pokemon": [
      "Rayquaza",
      "Kyogre",
      "Groudon",
      "Necrozma",
      "Reshiram"
    ],
    "heading": {
      "cs": "3. S-Tier Raidoví útočníci: Primals, Megas a Shadow DPS Monstra",
      "en": "3. S-Tier Raid Attackers Meta: Primals, Megas & Shadow DPS Titans",
      "ja": "3. 最強Sランクレイドアタッカー：ゲンシカイキ、メガシンカ、シャドウDPS",
      "ru": "3. S-Tier атакующие покемоны: Primal, Mega и Теневые DPS-титаны"
    },
    "content": {
      "cs": "Pro maximální úspěch v raidech nepotřebujete stovky různých Pokémonů. Stačí vybudovat jádro nejuniverzálnějších útočníků s nejvyšším poškozením za sekundu (DPS):\n\n1. Králové Primal & Mega Evolucí:\n• Primal Groudon (Mud Shot + Precipice Blades): Nejlepší Ground útočník ve hře s obří výdrží.\n• Primal Kyogre (Waterfall + Origin Pulse): Absolutní vládce Water typu.\n• Mega Rayquaza (Dragon Tail + Dragon Ascent): Vůbec nejsilnější neutrální útočník v celé hře.\n• Dusk Mane / Dawn Wings Necrozma (Sunsteel Strike / Moongeist Beam): Vládci Steel a Ghost typu s nepřekonatelným burst damage.\n\n2. Elitní Shadow útočníci (+20% Attack):\nShadow Metagross (Meteor Mash), Shadow Mamoswine (Avalanche / High Horsepower), Shadow Salamence (Outrage), Shadow Machamp (Dynamic Punch) a Shadow Chandelure (Shadow Ball).",
      "en": "To dominate raid battles, you only need to invest in a select core of premier attackers boasting the highest Damage Per Second (DPS) and Total Damage Output (TDO):\n\n1. The Primal & Mega Sovereigns:\n• Primal Groudon (Mud Shot + Precipice Blades): The undisputed king of Ground-type damage.\n• Primal Kyogre (Waterfall + Origin Pulse): Absolute master of Water DPS.\n• Mega Rayquaza (Dragon Tail + Dragon Ascent): The single highest neutral DPS Pokémon in the entire game.\n• Dusk Mane & Dawn Wings Necrozma (Sunsteel Strike / Moongeist Beam): Definitive Steel and Ghost titans.\n\n2. Premier Shadow Attackers (+20% Attack Passive):\nShadow Metagross (Meteor Mash), Shadow Mamoswine (Avalanche), Shadow Salamence (Outrage), Shadow Machamp (Dynamic Punch), and Shadow Chandelure (Shadow Ball).",
      "ja": "レイドで無双するために数百匹を育成する必要はありません。以下の最高峰DPS（秒間ダメージ）を持つコアメンバーに集中投資しましょう：\n\n1. ゲンシカイキ＆メガシンカの頂点：\n• ゲンシグラードン（マッドショット＋だんがいのつるぎ）：じめん枠の絶対王者。\n• ゲンシカイオーガ（たきのぼり＋こんげんのはどう）：みず枠の最高峰。\n• メガレックウザ（ドラゴンテール＋ガリョウルウ）：全ポケモン中最強の等倍DPS。\n• ネクロズマ たそがれのたてがみ/あかつきのつばさ：はがね・ゴーストの超火力枠。\n\n2. 最強シャドウアタッカー群（攻撃+20%）：\nシャドウメタグロス、シャドウマンムー、シャドウボーマンダ、シャドウカイリキー、シャドウシャンデラ。",
      "ru": "Для победы в рейдах достаточно прокачать костяк лучших покемонов с максимальным DPS (уроном в секунду):\n\n1. Primal и Mega титаны:\n• Primal Groudon (Mud Shot + Precipice Blades): Абсолютный топ земляного типа.\n• Primal Kyogre (Waterfall + Origin Pulse): Король водного типа.\n• Mega Rayquaza (Dragon Tail + Dragon Ascent): Самый высокий нейтральный DPS в игре.\n• Dusk Mane / Dawn Wings Necrozma: Лучшие бойцы Стального и Призрачного типов.\n\n2. Топовые Теневые бойцы (+20% к урону):\nShadow Metagross, Shadow Mamoswine, Shadow Salamence, Shadow Machamp и Shadow Chandelure."
    },
    "tips": {
      "cs": [
        "Neinvestujte do obranných tanků: Pokémoni jako Blissey, Lugia, Aggron nebo Snorlax do raidů nepatří! V raidech soutěžíte s časem, nikoli o přežití.",
        "Útočný IV parametr: Při výběru kandidátů pro raidy hledejte vždy maximální Attack IV (15). Na Defense a HP záleží v PvE mnohem méně."
      ],
      "en": [
        "Ditch defensive tanks: Blissey, Lugia, Aggron, and Snorlax deal atrocious DPS. Raids are a race against the clock, not a test of endurance!",
        "Prioritize 15 Attack IV: In raid PvE, a 15 Attack stat is paramount; defense and stamina are secondary."
      ],
      "ja": [
        "耐久ポケモンの厳禁：ハピナス、ルギア、ボスゴドラ、カビゴン等はレイドに出してはいけません！レイドは時間制限との戦いです。",
        "攻撃個体値15を最優先：PvEレイドでは攻撃IVが15であることが最も重要です。"
      ],
      "ru": [
        "Никаких Блисси и Аггронов: Защитные танки не наносят урона и крадут время в рейде!",
        "Приоритет атаки 15 IV: В рейдах важен максимальный параметр Attack 15."
      ]
    }
  },
  {
    "id": "circle-lock-technique",
    "pokemon": [
      "Rayquaza",
      "Dialga",
      "Palkia"
    ],
    "heading": {
      "cs": "4. Technika Circle Lock: Jak dosáhnout 90%+ šance na chycení Bosse",
      "en": "4. The Circle Lock Technique: Mastering a 90%+ Legendary Catch Rate",
      "ja": "4. サークル固定投法（Circle Lock）：伝説捕獲率90%超えの極意",
      "ru": "4. Техника Circle Lock: 90%+ шанс поимки легендарного босса"
    },
    "content": {
      "cs": "Základní šance na chycení legendárního 5★ bosse (Base Catch Rate - BCR) je pouhá 2,0 %. Bez správné techniky vám většina bossů uteče. Se zvládnutím Circle Lock techniky a točených Excellent hodů s Golden Razz Berry však zvýšíte úspěšnost na více než 90 %!\n\nPostup techniky Circle Lock krok za krokem:\n1. Krok (Nastavení velikosti): Podržte Premier Ball prstem uprostřed obrazovky. Kruh se začne zmenšovat. Jakmile se zmenší na velikost Excellent hodu (zhruba menší než hlava bosse), zvedněte prst z displeje BEZ HOZENÍ! Kruh je nyní uzamčen.\n2. Krok (Trpělivost): Nyní se displeje vůbec nedotýkejte. Čekejte, až boss provede útočnou animaci (výpad dopředu, úder nebo zařvání). Pokud boss pouze poskočí, kruh zůstává uzamčen, neházejte!\n3. Krok (Hod v animaci): Když boss provede útok, v 70 % průběhu animace roztočte míček v rohu obrazovky a hoďte točený Curveball do středu. Vteřinu poté, co animace skončí, se míček dotkne bosse a kruh bude přesně v uzamčené Excellent velikosti!",
      "en": "The Base Catch Rate (BCR) for a 5-Star Legendary is a meager 2.0%. Throwing blindly leads to heartbreak. By mastering the Circle Lock technique with Golden Razz Berries and Curved Excellent Throws, your cumulative catch probability surges past 90% across 14+ Premier Balls!\n\nCircle Lock Step-by-Step Execution:\n1. Lock the Target: Touch and hold the Premier Ball. Watch the colored circle shrink. When it hits Excellent size (slightly smaller than the boss's head), release your finger WITHOUT throwing. The circle is now frozen.\n2. Wait for the Attack: Do not touch the screen. Wait for the boss to execute an attack animation (lunge, swipe, or roar). Jump animations do not count — stay patient.\n3. Throw During Attack Recovery: At approximately 70% of the attack animation, spin your curveball in the lower corner and throw directly at the center. The moment the attack ends, the ball connects with the locked Excellent ring!",
      "ja": "伝説レイドボスの基礎捕獲率（BCR）はわずか2.0%です。適当に投げると高確率で逃げられますが、「サークル固定投法（Circle Lock）」ときんのズリのみ＋エクセレントカーブを徹底すれば、14個以上のボールで【捕獲成功率90%以上】を確実に達成できます！\n\nサークル固定の3ステップ手順：\n1. サークルサイズの設定：ボールに指を触れたままにします。サークルがエクセレント判定の大きさ（ボスの頭より少し小さい程度）まで縮んだ瞬間に、投げずに指を離します。これでサイズが固定されます。\n2. 威嚇モーションを待つ：画面に触れずに待ちます。ボスが前方に突進したり咆哮する「威嚇（アタック）」モーションを開始するのをじっくり待ちます（ジャンプ時は投げないこと）。\n3. 威嚇終了直前に投球：威嚇動作の約70%（終わり際）で素早くカーブをかけ、中心に向かって投げます。威嚇終了の瞬間にボールが命中し、固定されたエクセレント判定で吸い込まれます！",
      "ru": "Базовый шанс поимки легендарного босса (BCR) составляет всего 2.0%. Техника Circle Lock + Golden Razz Berry + Curved Excellent бросок повышают суммарный шанс поимки до 90%+ за рейд!\n\nИнструкция по шагам:\n1. Фиксация круга: Зажмите мяч пальцем. Когда круг уменьшится до размера Excellent (чуть меньше головы босса), отпустите палец БЕЗ броска. Круг зафиксирован.\n2. Ожидание атаки: Не трогайте экран, пока босс не начнет анимацию атаки (выпад или удар).\n3. Бросок на 70% анимации: На 70% движения атаки раскрутите крученый мяч и бросьте в центр. Мяч попадет ровно в зафиксированный круг Excellent!"
    },
    "tips": {
      "cs": [
        "Platinum Type Medals: Za každou platinovou medaili příslušného typu (2 500 chycených daného typu) získáváte trvalý násobič 1,4× ke všem hodům při chytání!",
        "Nikdy neházejte rovný hod: Točený Curveball hod má masivní 1,7× násobič šance na chycení oproti rovnému hodu."
      ],
      "en": [
        "Platinum Type Medals: Earning Platinum Medals for Pokémon types (2,500 catches per type) permanently confers a 1.4x catch rate multiplier!",
        "Never throw straight: A curved throw inherently multiplies catch probability by a massive 1.7x factor over straight throws."
      ],
      "ja": [
        "タイプ別プラチナメダル：該当タイプの捕獲数が2,500匹に達してプラチナメダルになると、捕獲率が永続的に1.4倍に向上します。",
        "カーブスローは必須：カーブをかけて投げるだけで、捕獲倍率が無条件で1.7倍に跳ね上がります。"
      ],
      "ru": [
        "Платиновые медали типов: Медаль за 2500 покемонов типа дает постоянный множитель 1.4x к шансу поимки!",
        "Всегда крутите мяч: Curveball дает множитель 1.7x к шансу поимки по сравнению с прямым броском."
      ]
    }
  },
  {
    "id": "mega-evolution-xl-boost",
    "pokemon": [
      "Charizard",
      "Rayquaza",
      "Gengar",
      "Lucario"
    ],
    "heading": {
      "cs": "5. Mega Evoluce jako stroj na XL Candy: Jak z raidu vytěžit maximum",
      "en": "5. Mega Evolution Candy XL Multiplier: Maximizing Raid Rewards",
      "ja": "5. メガシンカによるアメXLドロップ率ブースト：レイド報酬の最大化",
      "ru": "5. Мега-Эволюции и бонус Candy XL: Максимизация рейдовых наград"
    },
    "content": {
      "cs": "Mnoho hráčů netuší, že aktivní Mega Evoluce nemusí bojovat v raidu, aby vám přinesla obrovské výhody. Stačí mít před vstupem do raidu aktivovanou jakoukoli Mega Evoluci odpovídajícího typu (sdílející alespoň 1 typ s raidovým bossem):\n\nVýhody Mega Levelu 3 (Max Level):\n• +2 Candy navíc za každého chyceného bosse.\n• +100 XP navíc za chycení.\n• Vynikající šance (+75 % relativní nárůst) na zisk vzácných Candy XL!\n\nUniverzální Mega Pokémoni:\nMega Rayquaza (Dragon/Flying) pokrývá obrovské množství draků i létajících legend. Primal Groudon navíc jako pasivní vlastnost boostuje Candy pro Ground, Fire i Grass typy současně, zatímco Primal Kyogre boostuje Water, Electric a Bug typy!",
      "en": "Your active Mega Evolution does NOT need to participate on the battlefield to shower you with rewards. Simply having a matching-type Mega Evolution active on your profile grants monumental resource gains:\n\nMega Level 3 (Max Level) Perks:\n• +2 Bonus regular Candy per raid catch.\n• +100 Bonus catch XP.\n• Substantially elevated chance (+75% relative probability) of rolling coveted Candy XL drops!\n\nUniversal Mega Engines:\nMega Rayquaza (Dragon/Flying) covers virtually all prominent dragons. Primal Groudon passively boosts Candy drops for Ground, Fire, AND Grass types, while Primal Kyogre boosts Water, Electric, AND Bug types simultaneously!",
      "ja": "アクティブ状態のメガシンカポケモンは、レイドバトルに出撃させる必要はありません。ボスのタイプと一致するメガシンカを発動させておくだけで、報酬に莫大なボーナスが発生します：\n\nメガレベル3（最高ランク）の恩恵：\n• 捕獲時の通常アメが+2個追加。\n• 捕獲時XPが+100増加。\n• 貴重な「アメXL」のドロップ率が約+75%（大幅アップ）！\n\n万能メガシンカ枠：\nメガレックウザ（ドラゴン/ひこう）は伝説の多数を網羅。さらにゲンシグラードンはじめん・ほのお・くさタイプの全アメを同時にブーストし、ゲンシカイオーガはみず・でんき・むしタイプを同時にブーストします！",
      "ru": "Активной Мега-эволюции не обязательно участвовать в бою — достаточно запустить ее перед рейдом, чтобы получить огромный бонус ресурсов:\n\nБонусы Mega Level 3:\n• +2 конфеты за каждую поимку босса.\n• +100 дополнительного опыта.\n• Резко повышенный шанс (+75%) на получение редких Candy XL!\n\nУниверсальные Мега-покемоны:\nMega Rayquaza покрывает драконов и летающих. Primal Groudon бустит Землю, Огонь и Траву одновременно, а Primal Kyogre — Воду, Электро и Насекомых!"
    },
    "tips": {
      "cs": [
        "Aktivujte Mega před Raid Hour: Jedna Mega evoluce trvá celých 8 hodin. Aktivujte ji před začátkem středeční Raid Hour a získejte o desítky Candy XL více ze všech poražených bossů!",
        "Vyhledávání Mega Level 3 v boxu: Zadejte 'mega3' do vyhledávání pro zobrazení všech vašich Pokémonů na maximálním Mega levelu."
      ],
      "en": [
        "Pop Mega Before Raid Hour: Mega Evolution lasts 8 full hours. Activate your level 3 Mega right before Wednesday Raid Hour to amass dozens of extra Candy XL!",
        "Filter for Max Megas: Search 'mega3' in your inventory to instantly view all Pokémon at maximum Mega Level."
      ],
      "ja": [
        "レイドアワー前にメガシンカ起動：効果時間は8時間持続します。水曜レイドアワーの直前に発動させておけば、大量のアメXLを獲得できます。",
        "メガレベル3の検索コマンド：「mega3」で検索すると、最高ランクに到達しているメガシンカ可能ポケモンを瞬時に抽出できます。"
      ],
      "ru": [
        "Запускайте Мега перед Raid Hour: Мега длится 8 часов. Включите ее перед рейдовым часом и соберите десятки дополнительных Candy XL!",
        "Поиск Мега 3 уровня: Введите 'mega3' для быстрого поиска всех покемонов с максимальным мега-уровнем."
      ]
    }
  }
    ]
  },
  {
    "id": "spotlight-community-day-guide",
    "slug": "spotlight-community-day-guide",
    "iconName": "Calendar",
    "imageUrl": "https://cdn.leekduck.com/assets/img/items/Lure%20Module.png",
    "featured": false,
    "author": "PoGo Events Team",
    "readTime": "9 min",
    "updatedAt": "2026-10-31",
    "category": {
      "cs": "Události & Eventy",
      "en": "Events & Festivals",
      "ja": "イベント攻略＆時短術",
      "ru": "События и Ивенты"
    },
    "title": {
      "cs": "Spotlight Hour a Community Day: Kompletní průvodce bonusy, Fast Catch a Candy XL",
      "en": "Spotlight Hour & Community Day Master Guide: Maximum Bonuses, Fast Catch & Candy XL",
      "ja": "スポットライトアワー＆コミュニティ・デイ完全攻略：ボーナス最大化・ファストキャッチ・アメXL",
      "ru": "Spotlight Hour и Community Day: Полный гайд по бонусам, Fast Catch и Candy XL"
    },
    "subtitle": {
      "cs": "Jak vytěžit maximum z 5 rotujících bonusů, ovládnout techniku Fast Catch na 500+ odchytů za hodinu a sklidit 100+ Candy XL.",
      "en": "Master 5 rotating Spotlight bonuses, achieve 500+ catches/hr with Fast Catch, and harvest 100+ Candy XL during Community Days.",
      "ja": "5大ローテーションボーナスの重ねがけ、時速500匹捕獲を実現するファストキャッチ実践法、コミュニティ・デイでのアメXL大量収穫術。",
      "ru": "Максимизация 5 ротирующихся бонусов, ловля 500+ покемонов в час с Fast Catch и фарминг 100+ Candy XL на Community Day."
    },
    "sections": [
      {
        "id": "spotlight-rotating-bonuses",
        "pokemon": [
          "Paras",
          "Shellder",
          "Foongus",
          "Staryu"
        ],
        "heading": {
          "cs": "1. 5 rotujících bonusů ve Spotlight Hour a jejich násobení předměty",
          "en": "1. 5 Rotating Spotlight Bonuses & Tactical Item Stacking",
          "ja": "1. スポットライトアワーの5大ローテーションボーナスとアイテム重複仕様",
          "ru": "1. 5 ротирующихся бонусов Spotlight Hour и их умножение предметами"
        },
        "content": {
          "cs": "Spotlight Hour probíhá každé úterý od 18:00 do 19:00 místního času. Event pravidelně rotuje 5 typů herních bonusů:\n\n1. 2× Catch Stardust:\n• Nejhodnotnější bonus v celé hře! V kombinaci se Star Piece získáváte 3× Stardust.\n• Pokud je featured Pokémonem druh s přirozeně vysokým Stardustem (např. Paras/Parasect 500/700, Shellder 1 000, Foongus 500, Staryu 750, Cloyster 1 200, Meowth 500), získáte až 3 000 až 4 500 Stardustu z jediného Pokémona! Během 1 hodiny lze nasbírat přes 400 000 až 600 000 Stardustu.\n\n2. 2× Catch XP:\n• S Lucky Egg a hody Excellent získáváte přes 4 000 XP z každého chyceného kusu. Za 300 odchytů naskočí přes 1 200 000 XP!\n\n3. 2× Catch Candy:\n• Ve spojení s Pinap Berry a aktivním Mega Pokémonem stejného typu na Max Levelu 3 získáte až 8–9 Candy z každého uloveného Pokémona.\n\n4. 2× Transfer Candy:\n• Ideální hodina pro hromadné odeslání nastřádaných legendárních bossů a Ultra Beasts profesoru Willowovi.\n\n5. 2× Evolve XP:\n• Ve spojení s Lucky Egg dává 4 000 XP za každou evoluci (využijte tag 'evolve' a levné druhy s 12 candy jako Pidgey, Wurmple, Pidove).",
          "en": "Spotlight Hour occurs every Tuesday from 6:00 PM to 7:00 PM local time. The event cycles through 5 rotating bonuses:\n\n1. 2x Catch Stardust:\n• The single most lucrative hourly event in Pokémon GO! Stacking a Star Piece yields 3x Stardust.\n• When the featured Pokémon naturally produces bonus Stardust (Paras/Parasect 500/700, Shellder 1,000, Foongus 500, Staryu 750, Cloyster 1,200), each catch yields up to 3,000 to 4,500 Stardust! Dedicated grinders routinely harvest 400,000 to 600,000+ Stardust in this single hour.\n\n2. 2x Catch XP:\n• Combined with a Lucky Egg and Curveball Excellent Throws, every catch yields 4,000+ XP. 300 catches net over 1,200,000 XP in 60 minutes!\n\n3. 2x Catch Candy:\n• Combined with Pinap Berries and an active Level 3 Mega Pokémon of matching type, every catch generates 8–9 Candy.\n\n4. 2x Transfer Candy:\n• The definitive moment to transfer stockpiled legendary raid bosses and rare Ultra Beasts to Professor Willow.\n\n5. 2x Evolve XP:\n• Stacks with Lucky Egg for 4,000 XP per evolution (ideal for mass-evolving 12-candy species like Pidgey, Wurmple, Caterpie).",
          "ja": "スポットライトアワーは毎週火曜日の18:00〜19:00（現地時間）に開催され、5つの強力なボーナスが週替わりでローテーションします：\n\n1. 捕獲時ほしのすな2倍：\n• ゲーム内屈指の最重要稼ぎ時！「ほしのかけら」使用で3倍になります。\n• パラス（500）、シェルダー（1,000）、タマゲタケ（500）、ヒトデマン（750）などの砂ボーナス持ちポケモンが対象の場合、1匹捕まえるだけで3,000〜4,500の砂が手に入り、1時間で40万〜60万以上の砂を一気に稼ぎ出せます。\n\n2. 捕獲時XP2倍：\n• 「しあわせタマゴ」＋エクセレントスローで1匹あたり4,000 XP以上。300匹捕獲で120万XPを獲得可能です。\n\n3. 捕獲時アメ2倍：\n• パイルのみと同タイプのメガレベル3メガシンカを併用することで、1匹から8〜9個のアメを獲得。\n\n4. 博士送り時アメ2倍：\n• ボックスに溜まった伝説レイドボスやウルトラビーストを一括博士送りする絶好のタイミングです。\n\n5. 進化時XP2倍：\n• しあわせタマゴ併用で1進化あたり4,000 XP（ポッポやケムッソなどのアメ12個進化種の一括進化に最適）。",
          "ru": "Spotlight Hour проходит каждый вторник с 18:00 до 19:00 по местному времени. Бонусы меняются по кругу:\n\n1. 2x Catch Stardust:\n• Главный час для фарма пыли! Со Star Piece дает 3x пыли.\n• Если спавнится вид с повышенной пылью (Paras 500, Shellder 1000, Foongus 500, Staryu 750), за 1 покемона дается 3,000–4,500 пыли! За час можно сделать 400,000–600,000 пыли.\n\n2. 2x Catch XP:\n• С Lucky Egg и Excellent броском дает 4,000+ XP за поимку. За 300 покемонов выходит более 1,200,000 XP!\n\n3. 2x Catch Candy:\n• С Pinap Berry и Мегой 3 уровня дает 8–9 конфет за каждого покемона.\n\n4. 2x Transfer Candy:\n• Лучшее время для чистки легендарных покемонов и Ultra Beasts.\n\n5. 2x Evolve XP:\n• С Lucky Egg дает 4,000 XP за каждую эволюцию."
        },
        "tips": {
          "cs": [
            "Dopředu si zkontrolujte kalendář měsíce — pokud je ve Spotlight Hour Shellder nebo Paras s 2× Stardustem, jedná se o povinnou účast!",
            "Zapněte 2× Star Piece hned v 17:59, aby vám pokryly celých 60 minut bez přerušení.",
            "Během hodiny netřiďte a nezkoumejte IV — pouze chytejte pomocí Fast Catch a třídění nechte až po 19:00."
          ],
          "en": [
            "Check the monthly infographic in advance — a Shellder or Paras hour featuring 2x Stardust is a mandatory event for hardcore players!",
            "Activate 2x Star Pieces at exactly 5:59 PM to cover the entire 60-minute duration uninterrupted.",
            "Never appraise or transfer during the active hour — catch non-stop with Fast Catch and inspect your haul after 7:00 PM."
          ],
          "ja": [
            "月間予定表を事前にチェックし、シェルダーやパラスの「すな2倍アワー」は絶対に参加しましょう！",
            "17:59に「ほしのかけら」を2個連続で使用し、18:00〜19:00の60分間を途切れなくカバーします。",
            "イベント中の1時間は個体値確認や博士送りを一切せず、ファストキャッチで捕獲に専念するのが鉄則です。"
          ],
          "ru": [
            "Следите за расписанием месяца — час с Shellder или Paras и 2x пыли пропускать нельзя!",
            "Активируйте 2 Star Piece ровно в 17:59, чтобы закрыть все 60 минут без пауз.",
            "Во время часа не проверяйте IV — только ловите через Fast Catch, а сортировку оставьте на потом."
          ]
        }
      },
      {
        "id": "community-day-mastery",
        "pokemon": [
          "Charizard",
          "Tyranitar",
          "Metagross",
          "Garchomp"
        ],
        "heading": {
          "cs": "2. Community Day anatomie: 1/25 Shiny odds a Legacy útoky",
          "en": "2. Community Day Anatomy: 1/25 Shiny Rates & Legacy Attacks",
          "ja": "2. コミュニティ・デイの基本構造：色違い確率1/25と特別技（レガシー技）",
          "ru": "2. Анатомия Community Day: Шанс на Shiny 1/25 и Legacy атаки"
        },
        "content": {
          "cs": "Community Day (3hodinový víkendový event) je největší měsíční oslavou v Pokémon GO. Zahrnuje unikátní pravidla:\n\n1. Astronomická šance na Shiny (1 z 25):\nZatímco běžná šance na divokého Shiny Pokémona je 1 z 512 (~0,2 %), během Community Day vystřelí na 1 z 25 (4,0 %)! Během 3 hodin běžný hráč chytí 15 až 35+ Shiny kusů.\n\n2. Exkluzivní Legacy útoky:\nEvolucí Pokémona během eventu (a až do 2 hodin po jeho skončení, tj. do 19:00 nebo 21:00) získá finální forma svůj ikonický elitní útok (např. Blast Burn pro Charizarda, Smack Down pro Tyranitara, Meteor Mash pro Metagrosse, Earth Power pro Garchompa). Bez eventu vyžadují tyto útoky extrémně vzácný Elite Charged TM!\n\n3. Speciální bonusy:\n• Lure Modules a Incense trvají 3 hodiny.\n• Sleva 50 % na spotřebu Stardustu při výměnách a +1 až +2 Special Trades za den.",
          "en": "Community Day is the flagship monthly event in Pokémon GO, transforming wild spawns under exceptional mechanics:\n\n1. Skyrocketed Shiny Odds (1 in 25):\nWhile standard wild shiny rates linger at 1 in 512 (~0.2%), Community Day boosts odds to an incredible 1 in 25 (4.0%)! An active 3-hour participant routinely catches 15 to 35+ shinies.\n\n2. Exclusive Legacy Moves:\nEvolving the featured species during the event (and up to 2 hours afterwards) grants the final evolution its definitive legacy attack (e.g. Blast Burn Charizard, Meteor Mash Metagross, Smack Down Tyranitar, Earth Power Garchomp). Unlocking these outside events requires rare Elite TMs!\n\n3. Supplementary Perks:\n• 3-hour Lure Modules & 3-hour Incense duration.\n• 50% Stardust discount on trading plus 1 to 2 additional Special Trades per day.",
          "ja": "コミュニティ・デイは毎月恒例の大型イベントであり、極めて強力なボーナスが適用されます：\n\n1. 異次元の色違い確率（1/25）：\n通常の野生色違い確率が約1/512（0.2%）であるのに対し、コミュデイ中は「1/25（4.0%）」まで跳ね上がります！3時間プレイすれば誰でも15〜35匹以上の色違いを容易に確保できます。\n\n2. 特別な限定技（レガシー技）：\nイベント中〜終了後2時間以内に最終進化させると、強力な限定特別技（リザードンのブラストバーン、メタグロスのコメットパンチ、バンギラスのうちおとす、ガブリアスのだいちのちから等）を覚えます。通常は貴重な「すごいわざマシン」が必要となる最強技です。\n\n3. 付帯ボーナス：\n• ルアーモジュール＆おこうの効果が3時間持続。\n• ポケモン交換時の消費すな50%割引＋「特別な交換」が1日最大2〜3回まで可能。",
          "ru": "Community Day — главное ежемесячное событие в игре с уникальными правилами:\n\n1. Шанс на Shiny 1 из 25:\nОбычный дикий шанс — 1 из 512 (~0.2%), а в Community Day он возрастает до 1 из 25 (4.0%)! За 3 часа легко поймать 15–35+ блестящих покемонов.\n\n2. Эксклюзивные Legacy атаки:\nЭволюция во время ивента (и 2 часа после него) дает финальной форме эксклюзивную атаку (Blast Burn у Charizard, Meteor Mash у Metagross, Smack Down у Tyranitar). В обычные дни для этого нужен Elite TM!\n\n3. Дополнительные перки:\n• Луры и Incense действуют по 3 часа.\n• Скидка 50% на пыль при обменах и +1–2 Special Trades в день."
        },
        "tips": {
          "cs": [
            "Vždy si nechte alespoň 30–45 minut po skončení chytání (mezi 17:00 a 19:00) na vyhodnocení IV a evoluci pro získání Legacy útoku.",
            "Hledejte PvP kandidáty s nízkým útokem (0–1 Attack, 14–15 Defense/HP) před evolucí.",
            "Nezapomeňte provést Special Trades s kamarádem za poloviční cenu Stardustu."
          ],
          "en": [
            "Reserve at least 30–45 minutes following spawns (between 5:00 PM and 7:00 PM) to appraise IVs and evolve for legacy attacks.",
            "Search candidate Great/Ultra League PvP spreads (0–1 Attack, 14–15 Def/HP) before evolving.",
            "Utilize the 50% Stardust trading discount to complete mutual lucky shiny trades."
          ],
          "ja": [
            "捕獲終了後（17:00〜19:00など）に必ず30〜40分ほど時間を確保し、個体値選別と特別技への進化を完了させましょう。",
            "進化前に低攻撃・高耐久のPvP用個体（0-1attack&3-4defense&3-4hp）を必ず選別してください。",
            "砂半減ボーナスを活用して、フレンドと色違いやキラ交換を行いましょう。"
          ],
          "ru": [
            "Оставьте 30–45 минут после окончания спавна на проверку IV и эволюцию ради Legacy атак.",
            "Ищите PvP IV кандидатов (0–1 Attack, 14–15 Def/HP) перед эволюцией.",
            "Используйте скидку 50% на пыль для обмена ценными Shiny."
          ]
        }
      },
      {
        "id": "fast-catch-execution",
        "pokemon": [
          "Pikachu",
          "Eevee",
          "Magikarp",
          "Beldum"
        ],
        "heading": {
          "cs": "3. Technika Fast Catch: Jak přeskočit 15sekundovou animaci",
          "en": "3. Fast Catch Mastery: Bypassing the 15-Second Catch Cutscene",
          "ja": "3. ファストキャッチの完全習得：15秒の捕獲演出をスキップする極意",
          "ru": "3. Техника Fast Catch: Пропуск 15-секундной анимации поимки"
        },
        "content": {
          "cs": "Běžný odchyt Pokémona trvá přibližně 16 až 18 sekund (třesení míčku 3×, nápis 'Gotcha!', obrazovka se staty a tlačítko OK). Za hodinu tak fyzicky nelze chytit více než 120 až 150 Pokémonů.\n\nTechnika Fast Catch tento čas srazí na neuvěřitelné 3 sekundy:\n\n1. Držet a táhnout:\nLevým palcem položte prst na ikonu Poké Ballu (vpravo dole) a táhněte s ním mírně doleva. Zásadní pravidlo: Prst z obrazovky NIKDY nepouštějte!\n\n2. Hod pravou rukou:\nZatímco levý palec drží lištu, pravou rukou hoďte Curveball Excellent hod.\n\n3. Pustit levý palec:\nV momentě, kdy míček zasáhne Pokémona, pusťte levý palec. Lišta se zatáhne a v levém horním rohu okamžitě naskočí ikona Útěku (dveře s šipkou).\n\n4. Okamžitý útěk:\nKlepněte na ikonu Útěku a okamžitě se ocitnete zpět na mapě světa. Výsledek odchytu rozhodl herní server v okamžiku dopadu míčku — pokud byl Pokémon chycen, již leží ve vašem batohu!",
          "en": "A standard Pokémon encounter demands 16 to 18 seconds (ball rocking 3 times, 'Gotcha!' animation, stat banner, clicking OK). This mechanically caps catching throughput at 120–150 spawns per hour.\n\nThe Fast Catch technique slashes this down to a blistering 3 seconds:\n\n1. The Drawer Drag:\nUsing your left thumb, touch the Poké Ball drawer icon (bottom right) and drag it slightly to the left. The Golden Rule: DO NOT LIFT YOUR THUMB!\n\n2. The Primary Throw:\nWhile maintaining the left-thumb drag, use your right index finger to throw a standard Curveball Excellent throw.\n\n3. The Release Trigger:\nThe exact millisecond the ball contacts the Pokémon, lift your left thumb. The drawer snaps back and the Run/Escape door icon instantly materializes in the top-left corner.\n\n4. The Escape Tap:\nTap the Run door immediately. You return to the world map instantly. The catch outcome was calculated on Niantic's servers the moment the ball collided — if successful, the Pokémon is already stored in your Pokémon box!",
          "ja": "通常の捕獲では、ボールの揺れ演出（3回）、捕獲成功アニメーション、ステータス画面表示などで1匹あたり約16〜18秒を消費します。これでは1時間で最大でも120〜150匹程度しか捕獲できません。\n\n「ファストキャッチ（高速捕獲）」を習得すると、この所要時間をわずか3秒に短縮できます：\n\n1. ボールトレイのドラッグ保持：\n左親指で画面右下のモンスターボールアイコンをタップし、左方向へ少しスライドさせます。最大の鉄則：左親指は画面につけたまま絶対に離さないこと！\n\n2. 右手での投球：\n左親指でトレイを引っ張った状態を維持しながら、右手で通常通りカーブエクセレントスローを投げます。\n\n3. インパクト瞬間の指離し：\nボールがポケモンに命中した瞬間に、左親指を画面から離します。トレイが戻ると同時に、画面左上に「逃げる（退出ドア）」アイコンが即座に出現します。\n\n4. 退出タップで即マップ復帰：\n左上の逃げるボタンをタップすると、演出を全カットして即座にフィールドマップへ戻ります。捕獲判定はボールが当たった瞬間にサーバー側で完了しているため、捕獲成功していればすでにボックス内に収まっています！",
          "ru": "Обычная анимация поимки длится 16–18 секунд (покачивание шара, надпись Gotcha, экран статов). Это ограничивает скорость до 120–150 покемонов в час.\n\nТехника Fast Catch сокращает время до 3 секунд:\n\n1. Удержание шторки:\nЛевым большим пальцем зажмите иконку покебола (справа снизу) и сдвиньте ее влево. Главное правило: НЕ ОТПУСКАЙТЕ ПАЛЕЦ!\n\n2. Бросок правой рукой:\nУдерживая шторку левым пальцем, бросьте крученый Excellent бросок правой рукой.\n\n3. Отпускание пальца:\nКак только шар коснулся покемона, отпустите левый палец. Шторка вернется, а в левом верхнем углу появится кнопка побега (дверь).\n\n4. Мгновенный выход:\nНажмите кнопку побега. Вы моментально вернетесь на карту, а покемон уже будет у вас в хранилище!"
        },
        "tips": {
          "cs": [
            "Pokud Pokémon po Fast Catchi zůstane stát na mapě světa, klepněte na něj znovu — buď jste ho již chytili (a zmizí v oblaku kouře), nebo vyskočil a můžete hodit znovu.",
            "Fast Catch funguje na iOS i Androidu naprosto totožně a není porušením herních pravidel (využívá standardní UI gesto).",
            "Používejte Ultra Bally pro minimalizaci šance, že Pokémon z míčku vyskočí."
          ],
          "en": [
            "If the Pokémon remains standing on the map after escaping, tapping it again will either trigger a poof animation (already caught) or re-engage if it broke free.",
            "Fast Catch works identically on both iOS and Android and is universally accepted as standard competitive gameplay.",
            "Stockpile Ultra Balls to ensure a >90% first-throw catch rate with Fast Catch."
          ],
          "ja": [
            "ファストキャッチ後もマップ上にポケモンが残っている場合、もう一度タップしてください。捕獲成功していれば煙となって消滅し、逃げ出していれば再挑戦できます。",
            "ファストキャッチはiOS・Android双方で動作し、規約違反ではない標準的なUI操作テクニックです。",
            "1投捕獲率を90%以上に保つため、ハイパーボールを多めに用意しておきましょう。"
          ],
          "ru": [
            "Если покемон остался на карте, нажмите на него снова: если он пойман — исчезнет с дымом, если выскочил — можно бросить еще раз.",
            "Fast Catch работает на iOS и Android и является стандартным приемом опытных игроков.",
            "Используйте Ultra Ball, чтобы ловить с первого броска."
          ]
        }
      },
      {
        "id": "mega-candy-xl-harvest",
        "pokemon": [
          "Rayquaza",
          "Lucario",
          "Swampert",
          "Gengar"
        ],
        "heading": {
          "cs": "4. Mega Evoluce Level 3: Jak sklidit 100+ Candy XL za event",
          "en": "4. Mega Level 3 Synergy: Harvesting 100+ Candy XL per Event",
          "ja": "4. メガレベル3の威力：1イベントで100個以上のアメXLを収穫する方法",
          "ru": "4. Мега Level 3: Как собрать 100+ Candy XL за один ивент"
        },
        "content": {
          "cs": "Největší překážkou pro vylepšení Pokémona na maximální Level 50 je potřeba 296 kusů Candy XL (nebo 360 pro Shadow formy). Běžným chytáním získáte Candy XL jen velmi sporadicky.\n\nAktivace Mega Pokémona na Max Levelu 3 (vyžaduje 30 dní předchozích evolucí) mění pravidla hry:\n• Poskytuje +25 % vyšší šanci na drop Candy XL pro všechny chycené Pokémony stejného typu.\n• V kombinaci s vysokým CP Pokémonů v divočině (Level 25 až 35 díky Weather Boostu) stoupne průměrný zisk Candy XL z každého chyceného kusu z ~0,3 XL na 1,2 až 1,5 XL na odchyt!\n\nPři rychlosti 350 odchytů za Community Day vám aktivní Level 3 Mega Pokémon vynese 250 až 350+ Candy XL — což stačí na kompletní maxnutí Pokémona na Level 50 během jediného odpoledne!",
          "en": "The single greatest bottleneck for powering Pokémon to Level 50 is acquiring 296 Candy XL (or 360 for Shadow variants). Normal catching produces Candy XL very inconsistently.\n\nActivating a matching Mega Level 3 Pokémon (requiring 30 prior daily evolutions) transforms your gathering economics:\n• Grants a passive +25% boosted chance for Candy XL drops across all catches matching the Mega's typing.\n• Compounded with high wild spawn levels (Level 25 to 35 via Weather Boost), expected Candy XL yields jump from ~0.3 XL to 1.2–1.5 XL per capture!\n\nAt a velocity of 350 catches during a Community Day, an active Level 3 Mega harvests 250 to 350+ Candy XL — fully funding a Level 50 max-out in a single afternoon!",
          "ja": "ポケモンを最大レベル50まで強化する最大の壁は「アメXL 296個（シャドウは360個）」の収集です。通常の捕獲ではアメXLは低確率でしかドロップしません。\n\n同タイプの「メガレベル3（30日進化済み）」のメガポケモンを起動すると、この状況が一変します：\n• 同タイプポケモンの捕獲時、アメXLドロップ確率がパッシブで「+25%」跳ね上がります。\n• 天候ブーストによる高PL出現（PL25〜35）と掛け合わさることで、1匹あたりの期待値が0.3個から1.2〜1.5個へ劇的に増加します！\n\nコミュデイで350匹捕獲した場合、メガレベル3を起動しているだけで250〜350個以上のアメXLを回収でき、たった1日でPL50フル強化に必要なアメXLが全額集まります！",
          "ru": "Главное препятствие для прокачки до 50 уровня — сбор 296 Candy XL (360 для Shadow). Обычная ловля дает XL крайне редко.\n\nВключение Меги 3 уровня (30 дней эволюций) кардинально меняет сбор:\n• Дает пассивный бонус +25% к шансу выпадения Candy XL за покемонов того же типа.\n• При Weather Boost (уровни 25–35) шанс вырастает с ~0.3 до 1.2–1.5 XL за поимку!\n\nПри поимке 350 покемонов на Community Day активная Мега принесет 250–350+ Candy XL — этого хватит на прокачку до 50 уровня за один день!"
        },
        "tips": {
          "cs": [
            "Před Community Day si vždy ověřte typ hlavního Pokémona a předem si připravte odpovídajícího Level 3 Mega Pokémona.",
            "Primal Groudon pokrývá Ground/Fire/Grass, Primal Kyogre Water/Electric/Bug a Mega Rayquaza Dragon/Flying/Psychic — tito 3 obři pokryjí většinu eventů.",
            "K vyhledání všech vašich připravených Level 3 megas zadejte 'mega3'."
          ],
          "en": [
            "Check the featured Pokémon's typing days before Community Day and ensure your Level 3 Mega is rested and ready.",
            "Primal Groudon covers Ground/Fire/Grass, Primal Kyogre covers Water/Electric/Bug, and Mega Rayquaza covers Dragon/Flying/Psychic.",
            "Find all your active Level 3 candidates in storage by querying 'mega3'."
          ],
          "ja": [
            "コミュデイの対象ポケモンのタイプを事前に確認し、対応するメガレベル3個体を準備しておきましょう。",
            "ゲンシグラードン（地・炎・草）、ゲンシカイオーガ（水・電・虫）、メガレックウザ（竜・飛・超）の3匹がいれば大半のイベントを網羅できます。",
            "ボックスで「mega3」と検索すると即戦力のレベル3メガを一覧できます。"
          ],
          "ru": [
            "Проверьте типы покемона заранее и подготовьте нужную Мегу 3 уровня.",
            "Primal Groudon (Ground/Fire/Grass), Primal Kyogre (Water/Electric/Bug) и Mega Rayquaza (Dragon/Flying/Psychic) покрывают большинство событий.",
            "Строка для поиска готовых мег 3 уровня: 'mega3'."
          ]
        }
      },
      {
        "id": "inventory-cleanup-and-filters",
        "pokemon": [
          "Machamp",
          "Dragonite",
          "Mamoswine",
          "Salamence"
        ],
        "heading": {
          "cs": "5. Vyhledávací filtry pro úklid po eventu a třídění PvP/Hundo",
          "en": "5. Post-Event Cleanup Strings & PvP/Hundo Sorting Filters",
          "ja": "5. イベント後のボックス整理・PvP＆Hundo厳選プロ検索文字列",
          "ru": "5. Поисковые фильтры для чистки после ивента и сортировки"
        },
        "content": {
          "cs": "Po 3 hodinách Community Day s Fast Catchem máte v batohu 800 až 1 200 nových Pokémonů. Třídit je po jednom je nemožné. Použijte tento přesný 3krokový filtrační postup:\n\n1. Krok 1 — Najít 100% IV (Hundo) a Shiny:\n• Zadejte 'age0 & 4*' (označte hvězdičkou 100% IV).\n• Zadejte 'age0 & shiny' (zkontrolujte shiny kusy a oblíbené zamkněte).\n\n2. Krok 2 — Najít PvP Great/Ultra League kandidáty:\n• Zadejte 'age0 & 0-1attack & 3-4defense & 3-4hp & !shiny & !favorite'. Tito Pokémoni mají ideální rozložení statů (nízký útok, vysokou obranu a HP) pro ligy s CP limitem.\n\n3. Krok 3 — Bezpečné smazání zbytku smetí k profesorovi:\n• Zadejte 'age0 & 0*,1*,2* & !shiny & !favorite & !legendary & !shadow & !#'. Můžete bez obav stisknout Select All a hromadně odeslat stovky nepotřebných Pokémonů profesoru Willowovi za méně než 10 sekund!",
          "en": "Following 3 hours of Community Day grinding with Fast Catch, your storage holds 800 to 1,200 newly caught specimens. Appraising them individually is unviable. Follow this precise 3-step triage workflow:\n\n1. Step 1 — Isolate 100% Hundos & Shinies:\n• Query 'age0 & 4*' (favorite any perfect specimens immediately).\n• Query 'age0 & shiny' (inspect and lock high-IV shiny catches).\n\n2. Step 2 — Filter Prime PvP League Spreads:\n• Query 'age0 & 0-1attack & 3-4defense & 3-4hp & !shiny & !favorite'. These match optimal stat product profiles (low Attack, high Defense/HP) for Great and Ultra Leagues.\n\n3. Step 3 — Safe Bulk Trash Transfer:\n• Query 'age0 & 0*,1*,2* & !shiny & !favorite & !legendary & !shadow & !#'. Tap Select All and mass-transfer hundreds of worthless catches to Professor Willow in under 10 seconds with zero risk!",
          "ja": "ファストキャッチを駆使した3時間のコミュデイ後、ボックスには800〜1,200匹のポケモンが溜まります。1匹ずつ確認するのは不可能なため、以下の3ステップ検索術で一瞬で仕分けます：\n\n1. ステップ1 — 個体値100%（Hundo）と色違いの保護：\n• 「age0 & 4*」で本日捕獲した100%個体を抽出し即お気に入り登録。\n• 「age0 & 色違い」（age0 & shiny）で色違いを確認・保護。\n\n2. ステップ2 — PvP（対戦用）理想個体の抽出：\n• 「age0 & 0-1attack & 3-4defense & 3-4hp & !shiny & !favorite」で検索。スーパー／ハイパーリーグ向けの最適個体（低攻撃・高耐久）を一網打尽にします。\n\n3. ステップ3 — 安全な一括博士送り：\n• 「age0 & 0*,1*,2* & !shiny & !favorite & !legendary & !shadow & !#」で検索。色違いやお気に入り、伝説などを完全に保護した状態で「すべて選択」を押し、数百匹のゴミ個体を10秒で一括転送します！",
          "ru": "После 3 часов активной ловли в хранилище скапливается 800–1,200 покемонов. Сортируйте их в 3 простых шага:\n\n1. Шаг 1 — Поиск 100% Hundo и Shiny:\n• Введите 'age0 & 4*' (заблокируйте всех 100%).\n• Введите 'age0 & shiny' (проверьте и сохраните блестящих).\n\n2. Шаг 2 — Поиск кандидатов в PvP:\n• Введите 'age0 & 0-1attack & 3-4defense & 3-4hp & !shiny & !favorite'. Это идеальные кандидаты для Great и Ultra League.\n\n3. Шаг 3 — Безопасный массовый трансфер:\n• Введите 'age0 & 0*,1*,2* & !shiny & !favorite & !legendary & !shadow & !#'. Выделите всех и отправьте профессору за 10 секунд без риска удалить ценное!"
        },
        "tips": {
          "cs": [
            "Řetězec 'age0' filtruje Pokémony chycené během dnešního dne (za posledních 24 hodin).",
            "Podržením prstu na vyhledávacím políčku si tyto filtry uložte do 'Oblíbených vyhledávání' pro budoucí eventy.",
            "Nezapomeňte provést evoluce na Community Day Legacy útok před uzávěrkou v 19:00 nebo 22:00!"
          ],
          "en": [
            "The 'age0' operator filters Pokémon captured within the last 24 hours.",
            "Long-press your search bar to pin these queries as 'Favorite Searches' for every upcoming event.",
            "Ensure you complete all legacy move evolutions before the 7:00 PM or 10:00 PM cutoff!"
          ],
          "ja": [
            "「age0」コマンドは直近24時間以内に捕獲したポケモンのみを絞り込みます。",
            "検索履歴を長押しして「お気に入り」に登録しておけば、毎回のイベントで即座に呼び出せます。",
            "特別技の進化期限（通常19:00または22:00まで）を絶対に過ぎないようアラームを設定しておきましょう！"
          ],
          "ru": [
            "Команда 'age0' фильтрует покемонов, пойманных за последние 24 часа.",
            "Сохраните эти поисковые строки в Избранное долгим нажатием на строку поиска.",
            "Не забудьте завершить эволюции ради Legacy атак до дедлайна (обычно 19:00 или 22:00)!"
          ]
        }
      }
    ]
  },
  {
    "id": "pokemon-iv-cp-appraise-guide",
    "slug": "pokemon-iv-cp-appraise-guide",
    "iconName": "Sparkles",
    "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
    "featured": false,
    "author": "PoGo Events Team",
    "readTime": "9 min",
    "updatedAt": "2026-10-31",
    "category": {
      "cs": "Základy & Pokročilé Mechaniky",
      "en": "Game Mechanics & PvP Strategy",
      "ja": "ゲーム仕様＆対戦戦略",
      "ru": "Механика игры и PvP стратегия"
    },
    "title": {
      "cs": "Rozbor IV, CP a Hodnocení (Appraise): PvE 100% vs PvP ideální IV rozložení",
      "en": "Understanding IVs, CP & Appraisal: PvE 100% Hundo vs PvP Ideal IV Spreads",
      "ja": "IV（個体値）、CP、評価システム完全解説：PvE用100%個体値 vs PvP用最適ステータス",
      "ru": "Разбор IV, CP и Appraise: PvE 100% Hundo против идеальных PvP характеристик"
    },
    "subtitle": {
      "cs": "Matematická analýza skrytých IV Attack, Defense a Stamina (0–15). Proč je v Great a Ultra League nejlepší 0 Attack a 15 Defense/HP a jak fungují IV podlahy.",
      "en": "Deep mathematical analysis of hidden stats (Attack, Defense, Stamina). Why low Attack (0/15/15) maximizes stat product in Great & Ultra League, plus encounter IV floors.",
      "ja": "攻撃・防御・HPの隠しステータス（0〜15）の完全分析。スーパー／ハイパーリーグで低攻撃・高耐久（0/15/15）が最強な数学的理由と各種入手先の最低個体値。",
      "ru": "Глубокий математический разбор параметров Attack, Defense и Stamina. Почему низкий Attack (0/15/15) максимизирует Stat Product в Great и Ultra League, и механика IV floors."
    },
    "sections": [
      {
        "id": "iv-explained",
        "pokemon": [
          "Mewtwo",
          "Rayquaza",
          "Machamp",
          "Tyranitar"
        ],
        "heading": {
          "cs": "1. Co jsou to IV statistiky a jak číst herní Appraise gauge",
          "en": "1. What are IVs & How to Read the Appraisal Gauge",
          "ja": "1. 個体値（IV）の基礎知識とリーダー評価ゲージの読み方",
          "ru": "1. Что такое IV и как читать шкалу оценки Appraise"
        },
        "content": {
          "cs": "Každý Pokémon má základní druhový potenciál (Base Stats) a 3 skryté individuální hodnoty (Individual Values — IV): Attack, Defense a Stamina (HP), každou v rozsahu od 0 do 15 bodů (celkem maximálně 45 bodů neboli 100 %).\n\nJak číst herní Appraise grafiku lídra týmu (Blanche, Candela, Spark):\n• Graf obsahuje 3 horizontální pruhy rozdělené na 3 segmenty po 5 bodech (0–5, 6–10, 11–15).\n• Pokud je pruh plný a zčervená, daná hodnota je přesně 15 (maximum).\n• Hvězdičkové hodnocení odpovídá součtu bodů:\n  - 0★: 0 až 22 bodů (0 % až 48,9 %)\n  - 1★: 23 až 29 bodů (51,1 % až 64,4 %)\n  - 2★: 30 až 36 bodů (66,7 % až 80,0 %)\n  - 3★: 37 až 44 bodů (82,2 % až 97,8 %)\n  - 4★: 45 bodů (přesně 100 % IV neboli Hundo — medaile získá růžovo-červený lesk!).",
          "en": "Every Pokémon has base species statistics (Base Stats) plus 3 hidden Individual Values (IVs): Attack, Defense, and Stamina (HP), ranging from 0 to 15 each (a total pool of 45 IV points or 100%).\n\nReading your team leader's appraisal bars (Blanche, Candela, Spark):\n• The display has 3 horizontal bars, each partitioned into three 5-point segments (0–5, 6–10, 11–15).\n• When a bar is completely maxed out, it glows bright red/magenta, indicating exactly 15.\n• Star ratings correspond directly to the cumulative IV score:\n  - 0★: 0 to 22 points (0% to 48.9%)\n  - 1★: 23 to 29 points (51.1% to 64.4%)\n  - 2★: 30 to 36 points (66.7% to 80.0%)\n  - 3★: 37 to 44 points (82.2% to 97.8%)\n  - 4★: 45 points (100% IV Hundo — the badge sparkles with an iconic reddish-pink glow!).",
          "ja": "すべてのポケモンには種族値（Base Stats）に加えて、0〜15の範囲を持つ3つの隠し個体値（IV：攻撃・防御・HP）が加算されます（最大45ポイント＝100%）。\n\nチームリーダー（ブランシェ、キャンデラ、スパーク）の評価ゲージの見方：\n• 各ステータスバーは5ポイント刻み（0〜5、6〜10、11〜15）の3セグメントに分かれています。\n• バーが最大（15）に達すると、オレンジから鮮やかな赤紫色に変化します。\n• 星評価は合計個体値ポイントに対応しています：\n  - 0★：0〜22点（0%〜48.9%）\n  - 1★：23〜29点（51.1%〜64.4%）\n  - 2★：30〜36点（66.7%〜80.0%）\n  - 3★：37〜44点（82.2%〜97.8%）\n  - 4★：45点満点（100%個体値・Hundo — ピンク色の輝くバッジが表示されます！）。",
          "ru": "У каждого покемона есть базовые характеристики вида (Base Stats) и 3 скрытых параметра IV: Attack, Defense и Stamina (HP) от 0 до 15 каждый (максимум 45 очков или 100%).\n\nКак читать шкалы лидера команды (Blanche, Candela, Spark):\n• Каждая шкала разделена на 3 сегмента по 5 единиц (0–5, 6–10, 11–15).\n• Если шкала заполнена до упора, она загорается ярко-красным светом (значение ровно 15).\n• Звезды отражают сумму очков IV:\n  - 0★: 0–22 очка (0%–48.9%)\n  - 1★: 23–29 очков (51.1%–64.4%)\n  - 2★: 30–36 очков (66.7%–80.0%)\n  - 3★: 37–44 очка (82.2%–97.8%)\n  - 4★: 45 очков (100% IV Hundo — значок сияет розово-красным пламенем!)."
        },
        "tips": {
          "cs": [
            "100% IV (15/15/15) vyhledáte ve hře zadáním '4*' do vyhledávacího políčka.",
            "Čistá nula (0/0/0 neboli Nundo) se hledá pomocí '0attack&0defense&0hp' a je v přírodě vzácnější než hundo!",
            "Pro raidy má vždy prioritu Attack na hodnotě 15, i kdyby celkové IV bylo 'jen' 89 %."
          ],
          "en": [
            "Filter 100% IVs instantly in your box by typing '4*' into the Pokémon search bar.",
            "A true 0% IV (0/0/0 Nundo) can be located with '0attack&0defense&0hp' — it is statistically rarer than a Hundo in the wild!",
            "For PvE raid attackers, an Attack stat of 15 is the paramount priority, even over 91% overall IVs with 12 Attack."
          ],
          "ja": [
            "ボックス内で「4*」と検索すると100%個体値（Hundo）を一発で絞り込めます。",
            "「0attack&0defense&0hp」で完全0%（Nundo）を検索可能。天候ブーストやタスク等がない野生でのみ捕獲できるためHundoより希少です！",
            "レイドバトル用アタッカーは総合IVよりも「攻撃15」が最優先されます。"
          ],
          "ru": [
            "Чтобы мгновенно найти всех 100% покемонов, введите '4*' в строке поиска.",
            "Абсолютный ноль (0/0/0 Nundo) ищется по '0attack&0defense&0hp' — дикий нундо статистически реже хундо!",
            "Для рейдов показатель Attack 15 важнее, чем общие 93% с атакой 12."
          ]
        }
      },
      {
        "id": "pvp-stat-product-math",
        "pokemon": [
          "Swampert",
          "Azumarill",
          "Clodsire",
          "Whiscash"
        ],
        "heading": {
          "cs": "2. Matematika PvP: Proč 0/15/15 dominuje Great a Ultra League",
          "en": "2. PvP Stat Product Math: Why 0/15/15 Dominates Great & Ultra League",
          "ja": "2. PvPの数学：スーパー／ハイパーリーグで0/15/15が最強になるメカニズム",
          "ru": "2. Математика PvP: Почему 0/15/15 доминирует в Great и Ultra League"
        },
        "content": {
          "cs": "V Great League (strop 1500 CP) a Ultra League (strop 2500 CP) je cílem maximalizovat celkový Stat Product (Attack × Defense × HP) při dodržení CP stropu.\n\nVzorec pro výpočet CP v Pokémon GO:\nCP = (Attack × √Defense × √HP × CPMultiplier²) / 10\n\nVšimněte si zásadního rozdílu: Attack je v čitateli lineární, zatímco Defense i HP jsou pod odmocninou (√). Každý bod Attacku zvyšuje CP dvakrát rychleji než bod obrany nebo zdraví!\nPokud má váš Pokémon nízký útok (např. 0–1 Attack) a maximální obranu/HP (14–15), jeho CP stoupá velmi pozvolna. Díky tomu ho můžete vylepšit na podstatně vyšší Level (např. o 2,5 až 4 plné úrovně výše). Výsledný Pokémon získá masivní zásobu HP a obrany a v reálném boji absorbuje o 15 % až 25 % více poškození!",
          "en": "In Great League (1,500 CP cap) and Ultra League (2,500 CP cap), the objective is to maximize total Stat Product (Attack × Defense × HP) without breaching the CP ceiling.\n\nThe official Combat Power (CP) formula:\nCP = (Attack × √Defense × √HP × CPMultiplier²) / 10\n\nNotice the critical mathematical asymmetry: Attack scales linearly in the numerator, while Defense and HP are square-rooted (√). Therefore, every 1 point of Attack inflates CP roughly twice as fast as 1 point of Defense or Stamina!\nBy slashing Attack IVs to 0 or 1 while keeping Defense and HP at 14–15, the CP climbs much slower per power-up. This allows your Pokémon to reach several levels higher under the 1,500/2,500 cap—granting a massive 15% to 25% larger total Stat Product and surviving crucial charged attacks with extra HP!",
          "ja": "CP制限のあるスーパーリーグ（1500以下）やハイパーリーグ（2500以下）では、CP上限に引っかかることなく「総合ステータス積（Stat Product＝攻撃×防御×HP）」を最大化することが勝利の鍵です。\n\n公式CP計算式：\nCP = (攻撃 × √防御 × √HP × CPMultiplier²) / 10\n\nここで重要なのは、攻撃力はそのまま掛算されるのに対し、防御とHPには「平方根（√）」がかかっている点です。つまり、攻撃力の上昇は防御やHPの約2倍CPを跳ね上げてしまいます！\n攻撃個体値を0〜1に抑えて防御・HPを14〜15にすると、CPの上昇が緩やかになり、同じCP1500以内でもポケモンのレベル（PL）を数段階高く育てることができます。結果として実戦での耐久値が15%〜25%向上し、相手のゲージ技を耐え切って逆転勝利できます。",
          "ru": "В Great League (лимит 1500 CP) и Ultra League (лимит 2500 CP) главная цель — максимизировать суммарный Stat Product (Attack × Defense × HP) под потолком CP.\n\nФормула CP в Pokémon GO:\nCP = (Attack × √Defense × √HP × CPMultiplier²) / 10\n\nОбратите внимание на математическую асимметрию: Attack входит линейно, а Defense и HP — под квадратным корнем (√). Поэтому 1 очко атаки раздувает CP в два раза сильнее, чем очко защиты или здоровья!\nПокемон с 0 Attack и 15 Defense/HP поднимается на 2–4 уровня выше под лимитом 1500/2500 CP. Его выживаемость (bulk) возрастает на 15–25%, что позволяет пережить лишний Charged Move."
        },
        "tips": {
          "cs": [
            "Výjimka z pravidla: Pokud Pokémon na Levelu 50 nepřekročí 1500 CP (např. Umbreon, Sableye, Carbink, Talonflame v Ultra), potřebuje VŽDY 100% IV (15/15/15) i pro PvP!",
            "V zrcadlovém duelu (Mirror Match) však vyhrává ten s vyšším útokem (CMP Tie — Charged Move Priority).",
            "K vyhledání PvP IV kandidátů zadejte do vyhledávání: '0-1attack&3-4defense&3-4hp'."
          ],
          "en": [
            "The Max-Out Exception: If a species naturally maxes out below the CP cap at Level 50 (e.g. Medicham/Sableye in Great, or Umbreon/Talonflame in Ultra), it ALWAYS requires 100% IV (15/15/15)!",
            "Mirror match priority: When both players throw a charged move on the exact same turn, the Pokémon with higher raw Attack wins the CMP Tie (Charged Move Priority).",
            "Search candidate PvP spreads instantly: type '0-1attack&3-4defense&3-4hp' in your Pokémon storage."
          ],
          "ja": [
            "上限未達の例外：PL50まで強化してもCP上限に届かない種族（スーパーのヤミラミ・メレシー、ハイパーのブラッキー・ファイアローなど）はPvPでも100%（15/15/15）が理想です。",
            "CMPタイ（同発優先）：両者が同時にゲージ技を撃った場合、実攻撃力が高い方の技が先に発動します。",
            "PvP厳選用検索文字列：ボックスで「0-1attack&3-4defense&3-4hp」と入力すると理想個体候補を即座に抽出できます。"
          ],
          "ru": [
            "Исключение: Если покемон на 50 уровне не дотягивает до лимита (например, Umbreon в Ultra или Sableye в Great), ему НУЖЕН 100% IV (15/15/15)!",
            "CMP Tie: Если оба игрока жмут Charged Move одновременно, право первого хода получает покемон с более высокой текущей атакой.",
            "Строка для быстрого поиска PvP кандидатов: '0-1attack&3-4defense&3-4hp'."
          ]
        }
      },
      {
        "id": "pve-vs-pvp-mastery",
        "pokemon": [
          "Dialga",
          "Metagross",
          "Kyogre",
          "Groudon"
        ],
        "heading": {
          "cs": "3. PvE raidy a Master League: Pravidlo 15 Attack a Shadow bonus",
          "en": "3. PvE Raids & Master League: The 15 Attack Mandate & Shadow Bonus",
          "ja": "3. レイドバトル（PvE）とマスターリーグ：攻撃15の鉄則とシャドウ補正",
          "ru": "3. PvE рейды и Master League: Правило 15 Attack и Shadow бонус"
        },
        "content": {
          "cs": "V PvE (Raidy, Gymy, Team GO Rocket) a v Master League žádný strop CP neexistuje. Zde platí diametrálně odlišná pravidla než v Great/Ultra League:\n\n1. Master League:\n• Zde je 100% IV (15/15/15) absolutní nutností. Snížení útoku o jediný bod může způsobit prohru v CMP tie nebo nedosažení klíčových breakpointů proti soupeřovým legendám.\n\n2. PvE Raid Battles:\n• V raidech soutěžíte s časomírou (obvykle 300 sekund). Klíčová metrika je DPS (Damage Per Second). Hodnota 15 Attack je kritická pro dosažení 'Fast Move Breakpointu' (kdy každý rychlý útok dává o 1 poškození více, což za 100 úderů znamená +100 DMG).\n\n3. Shadow Pokémon paradox:\n• Shadow Pokémoni získávají pasivní bonus +20 % k útoku (a -16,7 % k obraně). Shadow Pokémon s nulovými staty (0/0/0) způsobí v raidu o ~15 % VÍCE celkového poškození za sekundu než běžný Pokémon se 100% IV (15/15/15) na stejném levelu! Proto Shadow Pokémony s vysokým útokem nikdy neočišťujte (Purify) jen kvůli získání 4★ medaile.",
          "en": "In PvE (Raid Bosses, Gym battles, Team GO Rocket) and Master League, there is no CP cap. The rules invert completely compared to Great and Ultra League:\n\n1. Master League:\n• 100% IV (15/15/15) at Level 50 is strictly non-negotiable at competitive ranks. Missing a single Attack IV point surrenders mirror CMP ties and misses offensive damage breakpoints.\n\n2. PvE Raid Battles:\n• Raids are a race against the countdown clock. The governing metric is Damage Per Second (DPS). 15 Attack IV is crucial for hitting fast-attack breakpoints where rounding increases damage by a flat +1 per strike.\n\n3. The Shadow Pokémon Powerhouse:\n• Shadow Pokémon enjoy an unconditional +20% Attack boost (at the cost of -16.7% Defense). A 0% IV Shadow Pokémon deals roughly 15% MORE raid DPS than a perfect 100% IV standard Pokémon at the exact same level! Never purify a meta-relevant Shadow attacker just to get a standard 4★ badge.",
          "ja": "レイドバトル（PvE）やマスターリーグにはCP上限が一切ありません。そのため、制限リーグとは真逆の育成方針となります：\n\n1. マスターリーグ：\n• レベル50・個体値100%（15/15/15）が基本前提です。攻撃が1でも欠けるとCMPタイで確実に後手を取るほか、主要な相手に対するダメージ確定数が変わってしまいます。\n\n2. レイドバトル（PvE）：\n• レイドは時間との戦いであり、最も重要な指標は「DPS（1秒あたりの与ダメージ）」です。通常技のダメージが1上がる「ブレイクポイント」に到達するため、攻撃15が最重要視されます。\n\n3. シャドウポケモンの圧倒的破壊力：\n• シャドウポケモンは「攻撃力+20%（防御力-16.7%）」という強力なボーナスを持っています。個体値0%のシャドウであっても、同レベルの個体値100%の通常ポケモンより約15%高いレイドDPSを叩き出します！レイド戦力として優秀なシャドウは、100%図鑑埋め目的で安易にリトレーンしてはいけません。",
          "ru": "В PvE (рейды, гимы, Команда R) и Master League нет лимита CP. Здесь действуют прямо противоположные правила:\n\n1. Master League:\n• 100% IV (15/15/15) на 50 уровне строго обязателен. Потеря даже 1 очка атаки лишает вас приоритета CMP Tie.\n\n2. PvE Рейды:\n• Главный показатель в рейдах — DPS (урон в секунду). Attack 15 критичен для достижения fast-move breakpoint (когда каждая быстрая атака наносит на 1 единицу урона больше).\n\n3. Феномен Shadow покемонов:\n• Shadow покемоны получают +20% к атаке (-16.7% к защите). Даже Теневой покемон с 0% IV наносит в рейде примерно на 15% БОЛЬШЕ урона в секунду, чем обычный покемон с 100% IV того же уровня! Никогда не очищайте топовых шедоу ради 4★."
        },
        "tips": {
          "cs": [
            "Očištění (Purification) přidá přesně +2 body ke každé IV statistice (Attack, Defense, HP). Pokud má Shadow staty 13/13/13 a výše, po očištění získáte 100% Hundo.",
            "Očištění snižuje spotřebu Candy a Stardustu na power-up o 10 % (20 % pro Candy XL) a Pokémon skočí rovnou na Level 25.",
            "Top raidoví útočníci jako Shadow Mewtwo, Shadow Machamp, Shadow Metagross a Shadow Moltres by NIKDY neměli být očištěni."
          ],
          "en": [
            "Purification adds exactly +2 points to every IV stat (Attack, Defense, Stamina). A Shadow with 13/13/13 or higher will become a 100% Hundo upon purifying.",
            "Purified Pokémon enjoy a 10% discount on Stardust and Candy power-ups (20% for Candy XL) and immediately jump to Level 25.",
            "Top raid damage dealers like Shadow Mewtwo, Shadow Metagross, Shadow Machamp, and Shadow Salamence should never be purified."
          ],
          "ja": [
            "リトレーンすると、全ての個体値（攻撃・防御・HP）が「+2」加算されます。13/13/13以上のシャドウをリトレーンすれば確実に100%（Hundo）になります。",
            "リトレーン済みポケモンは強化に必要なすな・アメが10%割引（アメXLは20%割引）になり、即座にPL25に引き上げられます。",
            "シャドウミュウツー、シャドウメタグロス、シャドウカイリキーなどのトップアタッカーはリトレーンせずシャドウのまま運用するのが正解です。"
          ],
          "ru": [
            "Очищение (Purify) добавляет ровно +2 к каждому показателю IV (Attack, Defense, HP). Теневой с 13/13/13 станет 100% хундо.",
            "Очищенные покемоны дают 10% скидку на пыль и конфеты (20% на XL) и сразу получают 25 уровень.",
            "Лучших рейдовых бойцов (Shadow Mewtwo, Shadow Metagross, Shadow Machamp) никогда не очищайте."
          ]
        }
      },
      {
        "id": "iv-floors-and-rerolls",
        "pokemon": [
          "Lucario",
          "Larvitar",
          "Gible",
          "Beldum"
        ],
        "heading": {
          "cs": "4. Minimální IV podlahy (IV Floors) podle způsobu získání",
          "en": "4. Encounter IV Floors & Re-roll Mechanics",
          "ja": "4. 入手方法別の最低保証個体値（IV Floor）一覧",
          "ru": "4. Минимальные пороги IV (IV Floors) по типам активностей"
        },
        "content": {
          "cs": "V Pokémon GO nelze jakéhokoliv Pokémona chytit s jakýmikoliv IV. Hra aplikuje pevné minimální prahy (IV Floors):\n\n• Divoký odchyt (bez počasí): 0/0/0 (šance na 100% je 1 z 4 096).\n• Weather Boost v přírodě: 4/4/4 (šance na 100% je 1 z 1 728).\n• Raidy, Vejce, Field & Special Research: 10/10/10 (šance na 100% je 1 z 216).\n• Lucky Trade (Šťastná výměna): 12/12/12 (šance na 100% je 1 z 64 — nejvyšší v celé hře!).\n• Best Friend Trade (běžná výměna s nejlepším přítelem): 5/5/5.\n• Ultra Friend Trade: 3/3/3.\n• Great Friend Trade: 2/2/2.\n• Good Friend Trade: 1/1/1.\n\nZ tohoto důvodu NIKDY nemůžete získat ideálního Pokémona pro Great League (např. 0/15/15) přímo z raidu nebo vajíčka! Chcete-li PvP verzi legendy nebo vzácného druhu z vajec (např. Vullaby, Scraggy, Cresselia, Registeel), musíte ho vyměnit s novým kamarádem (Good Friend), aby podlaha IV klesla na 1/1/1.",
          "en": "Not all IV combinations are obtainable through all game modes. Pokémon GO enforces strict stat floors (IV Floors):\n\n• Standard Wild Spawns: 0/0/0 floor (1 in 4,096 chance for 100% Hundo).\n• Weather-Boosted Wild: 4/4/4 floor (1 in 1,728 chance for 100% Hundo).\n• Raids, Eggs, Field & Special Research: 10/10/10 floor (1 in 216 chance for 100% Hundo).\n• Lucky Trades: 12/12/12 floor (1 in 64 chance for 100% Hundo — highest in the game!).\n• Best Friend Trade: 5/5/5 floor.\n• Ultra Friend Trade: 3/3/3 floor.\n• Great Friend Trade: 2/2/2 floor.\n• Good Friend Trade: 1/1/1 floor.\n\nBecause of this rule, you can NEVER hatch or catch a PvP-ideal 0/15/15 IV spread from a Raid or Egg directly! To optimize raid or egg-exclusive species for Great League (such as Cresselia, Registeel, or Vullaby), you must trade them with low-tier friends (Good Friends) to reroll stats below the 10/10/10 raid floor.",
          "ja": "Pokémon GOでは、ポケモンの入手方法ごとに「最低保証個体値（IV Floor）」が厳密に設定されています：\n\n• 通常の野生出現：0/0/0保証（100%確率は 1/4,096）\n• 天候ブースト野生：4/4/4保証（100%確率は 1/1,728）\n• レイドバトル・タマゴ孵化・フィールドリサーチ報酬：10/10/10保証（100%確率は 1/216）\n• キラフレンド確定交換（Lucky Trade）：12/12/12保証（100%確率は 1/64 — ゲーム内最高確率！）\n• 大親友との通常交換：5/5/5保証\n• 親友との交換：3/3/3保証\n• 仲良しとの交換：2/2/2保証\n• 友達との交換：1/1/1保証\n\nこの仕様上、レイドやタマゴから直接0/15/15のPvP理想個体を入手することは絶対に不可能です！クレセリアやレジスチル、バルチャイなどをスーパーリーグ用に厳選するには、仲良し度が低いフレンドと交換して個体値を再抽選（リロール）する必要があります。",
          "ru": "В Pokémon GO существуют жесткие минимальные планки IV (IV Floors) в зависимости от способа получения:\n\n• Дикий спавн (без погоды): порог 0/0/0 (шанс на 100% — 1 из 4,096).\n• Спавн с погодой (Weather Boost): порог 4/4/4 (шанс на 100% — 1 из 1,728).\n• Рейды, Яйца, Квесты: порог 10/10/10 (шанс на 100% — 1 из 216).\n• Lucky Trade (Счастливый обмен): порог 12/12/12 (шанс на 100% — 1 из 64!).\n• Best Friend обмен: порог 5/5/5.\n• Ultra Friend обмен: порог 3/3/3.\n• Great Friend обмен: порог 2/2/2.\n• Good Friend обмен: порог 1/1/1.\n\nИз-за этого правила вы НИКОГДА не получите 0/15/15 прямо из рейда или яйца. Чтобы получить PvP Cresselia или Registeel под Great League, их нужно выменивать с Good Friends для сброса порога 10/10/10."
        },
        "tips": {
          "cs": [
            "Pro Lucky Trade si vždy schovejte legendy do Master League nebo meta útočníky (Rayquaza, Mewtwo, Dialga, Terrakion) — šance 1:64 na Hundo a poloviční spotřeba Stardustu je bezkonkurenční.",
            "Výměnou se IV statistiky vždy zcela přelosují a Pokémona už nelze vyměnit podruhé.",
            "Shadow Pokémony nelze vyměňovat vůbec."
          ],
          "en": [
            "Save Lucky Trades strictly for Master League meta or top raid anchors (Rayquaza, Mewtwo, Dialga, Terrakion) for the 1 in 64 hundo chance and 50% Stardust discount.",
            "Trading completely rerolls IVs permanently; a traded Pokémon can never be traded again.",
            "Shadow Pokémon cannot be traded under any circumstances."
          ],
          "ja": [
            "キラ交換はマスターリーグ用伝説や最強アタッカー（レックウザ、ミュウツー、ディアルガ、テラキオン等）に使いましょう。1/64の高確率と砂50%節約が非常に強力です。",
            "交換すると個体値はランダムに再抽選され、一度交換したポケモンは二度と交換できません。",
            "シャドウポケモンは交換に出すことができません。"
          ],
          "ru": [
            "Используйте Lucky Trades для легенд Master League и топовых рейдовиков (Rayquaza, Mewtwo, Dialga) — шанс 1:64 на хундо и скидка 50% на пыль.",
            "При обмене IV полностью сбрасываются случайным образом, и повторно передать покемона нельзя.",
            "Теневых покемонов менять нельзя."
          ]
        }
      },
      {
        "id": "search-strings-and-management",
        "pokemon": [
          "Charizard",
          "Dragonite",
          "Gengar",
          "Gardevoir"
        ],
        "heading": {
          "cs": "5. Vyhledávací filtry pro efektivní třídění a správu boxu",
          "en": "5. Pro Search Strings for Instant Storage Management",
          "ja": "5. ボックス整理が劇的に速くなるプロ仕様の検索文字列",
          "ru": "5. Поисковые фильтры для быстрой сортировки хранилища"
        },
        "content": {
          "cs": "Udržování čistého Pokémon boxu bez rizika nechtěného smazání cenných kusů vyžaduje kombinaci správných vyhledávacích filtrů:\n\n• '4*': Zobrazí všechny 100% IV Pokémony (Hundo).\n• '3* & 15attack': Ideální PvE útočníci do raidů s maximálním útokem.\n• '0-1attack & 3-4defense & 3-4hp & !4* & !shiny & !favorite': Kandidáti na PvP Great/Ultra League k bližšímu prověření.\n• '0*,1*,2* & !shiny & !legendary & !mythical & !shadow & !favorite & !#': Bezpečný filtr pro hromadný přesun běžného smetí profesoru Willowovi.\n• 'distance 100-': Pokémoni chycení více než 100 km daleko, kteří při výměně garantují +3 Candy a 100% garantovaný Candy XL!",
          "en": "Managing a large Pokémon storage efficiently without accidentally trashing competitive specimens relies on tactical search operators:\n\n• '4*': Displays every 100% IV Hundo.\n• '3* & 15attack': Top-tier PvE raid candidates boasting maxed Attack.\n• '0-1attack & 3-4defense & 3-4hp & !4* & !shiny & !favorite': Prime Great & Ultra League PvP candidates.\n• '0*,1*,2* & !shiny & !legendary & !mythical & !shadow & !favorite & !#': Safe garbage string for 1-tap bulk transfer to Professor Willow.\n• 'distance 100-': Pokémon caught >100 km away that guarantee +3 Candy and a guaranteed bonus Candy XL when traded!",
          "ja": "貴重な個体を誤って博士に送ることなく、数千匹のボックスを素早く整理するための必須検索コマンド：\n\n• 「4*」：個体値100%（Hundo）を全抽出。\n• 「3* & 15attack」：攻撃MAXのレイド用即戦力候補。\n• 「0-1attack & 3-4defense & 3-4hp & !4* & !shiny & !favorite」：スーパー／ハイパーリーグ用PvP理想個体候補。\n• 「0*,1*,2* & !shiny & !legendary & !mythical & !shadow & !favorite & !#」：色違いやお気に入りを守りつつ、不要な個体を安全に一括博士送りする文字列。\n• 「距離 100-」（distance 100-）：100km以上離れた場所で捕獲したポケモン。交換時にアメ3個＋アメXL確定ドロップとなります！",
          "ru": "Для быстрой очистки хранилища без риска случайно удалить ценных покемонов используйте поисковые фильтры:\n\n• '4*': Все 100% IV (Hundo).\n• '3* & 15attack': Топовые кандидаты для рейдов с максимальной атакой.\n• '0-1attack & 3-4defense & 3-4hp & !4* & !shiny & !favorite': Кандидаты на Great/Ultra PvP.\n• '0*,1*,2* & !shiny & !legendary & !mythical & !shadow & !favorite & !#': Безопасный мусорный фильтр для массового трансфера профессору.\n• 'distance 100-': Покемоны, пойманные дальше 100 км — при трейде гарантируют +3 Candy и 100% Candy XL!"
        },
        "tips": {
          "cs": [
            "Filtry si můžete v aplikaci uložit jako 'Oblíbené vyhledávání' (Favorite Searches) podržením prstu na hledané frázi.",
            "Znak '!' znamená negaci (např. '!shiny' vyloučí všechny blyštivé Pokémony).",
            "Znak '&' funguje jako logické A ZÁROVEŇ (obě podmínky musí platit)."
          ],
          "en": [
            "Save frequently used queries as 'Favorite Searches' by long-pressing the search bar in Pokémon GO.",
            "The '!' prefix acts as a NOT operator (e.g. '!shiny' excludes all shiny Pokémon).",
            "The '&' operator acts as a logical AND (both conditions must be satisfied simultaneously)."
          ],
          "ja": [
            "検索履歴の右側にあるスターをタップすると、よく使う文字列を「お気に入り検索」として保存できます。",
            "「!」を先頭に付けると否定（NOT）条件になります（例：!色違い で色違いを除外）。",
            "「&」はAND条件（両方を満たす）として機能します。"
          ],
          "ru": [
            "Сохраняйте частые запросы в 'Избранное', удерживая палец на истории поиска в игре.",
            "Знак '!' перед фильтром означает исключение (например, '!shiny' исключит блестящих).",
            "Знак '&' означает логическое 'И' (оба условия должны выполняться)."
          ]
        }
      }
    ]
  },
  {
    "id": "mega-dynamax-mechanics-guide",
    "slug": "mega-dynamax-mechanics-guide",
    "iconName": "Trophy",
    "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png",
    "featured": false,
    "author": "PoGo Events Team",
    "readTime": "10 min",
    "updatedAt": "2026-10-31",
    "category": {
      "cs": "Mega & Max Battles",
      "en": "Mega & Max Battles",
      "ja": "メガ＆マックスバトル",
      "ru": "Мега и Макс Битвы"
    },
    "title": {
      "cs": "Mega Evoluce, Primal Reversion a Max Battles: Kompletní průvodce mechanikami",
      "en": "Mega Evolution, Primal Reversion & Max Battles: Comprehensive Mechanics Guide",
      "ja": "メガシンカ・ゲンシカイキ＆ダイマックス・キョダイマックス完全攻略",
      "ru": "Мега-Эволюции, Primal Reversion и Max Battles: Полный гайд по механике"
    },
    "subtitle": {
      "cs": "Jak dosáhnout Mega Level 3 pro +25 % Candy XL šanci, pasivní buffy Primal forem a denní Max Particle engine na Power Spotech.",
      "en": "Master Mega Level 3 for +25% Candy XL drops, Primal passive party buffs, and the daily 1,080 Max Particle overflow engine at Power Spots.",
      "ja": "アメXL確率+25%となるメガレベル3の育成法、ゲンシカイキの3タイプ同時パッシブブースト、パワースポットでのMP収集オーバーフロートリック。",
      "ru": "Прокачка Mega Level 3 с +25% к шансу Candy XL, пассивные баффы Primal покемонов и оверфлоу трик сбора 1080 Max Particles на Power Spots."
    },
    "sections": [
      {
        "id": "mega-evolution-and-levels",
        "pokemon": [
          "Rayquaza",
          "Groudon",
          "Kyogre",
          "Tyranitar"
        ],
        "heading": {
          "cs": "1. Úrovně Mega Evoluce (Base, High, Max Level 3) a Candy XL",
          "en": "1. Mega Levels Breakdown (Base, High, Max Level 3) & Candy XL Yields",
          "ja": "1. メガレベル（ベース・ハイ・マックスLv3）とアメXL獲得率の仕様",
          "ru": "1. Уровни Мега-Эволюций (Base, High, Max Level 3) и Candy XL"
        },
        "content": {
          "cs": "Mega Evoluce trvá 8 hodin. Po prvním odemčení za Mega Energy (100 až 400 energie) se odemkne možnost bezplatné evoluce po uplynutí cooldownu. Každý den, kdy Pokémona vyvinete (maximálně 1 zářez za den), sbíráte postup směrem k vyšším Mega Úrovním:\n\n• Base Mega Level (1 den): +1 Catch Candy ze stejného typu, +50 Catch XP, 7 dní cooldown zdarma.\n• High Mega Level (7 dní): +1 Catch Candy, +100 Catch XP, +10 % šance na Candy XL ze stejného typu, 5 dní cooldown zdarma.\n• Max Mega Level 3 (30 dní — TOP TIER 🏆): +2 Catch Candy (+100 % bonus!), +200 Catch XP, +25 % astronomická šance na Candy XL, cooldown zdarma pouhé 3 dny!\n\nStrategické pravidlo: Mějte v zásobě alespoň 1 Pokémona na Mega Level 3 pro každý z 18 typů ve hře. Během Community Day nebo Raid Day vám aktivní Level 3 Mega Pokémon vynese o 40 až 80+ bonusových Candy XL navíc!",
          "en": "Mega Evolution remains active for 8 hours. Following the initial unlock using Mega Energy (100 to 400 Energy), free evolutions become available after a resting cooldown. Evolving once per calendar day earns a progression tick towards higher Mega Levels:\n\n• Base Mega Level (1 Day): +1 Catch Candy for matching types, +50 Catch XP, 7-day free cooldown.\n• High Mega Level (7 Days): +1 Catch Candy, +100 Catch XP, +10% Candy XL drop chance, 5-day free cooldown.\n• Max Mega Level 3 (30 Days — THE PINNACLE 🏆): +2 Catch Candy (+100% bonus!), +200 Catch XP, +25% massive Candy XL drop chance, 3-day free cooldown!\n\nStrategic Rule: Cultivate at least one Level 3 Mega Pokémon covering every single elemental type. Activating a matching Level 3 Mega during Community Days or Raid Days reliably yields 40 to 80+ additional Candy XL per session!",
          "ja": "メガシンカの効果時間は8時間です。初回に必要なメガエナジー（100〜400）を消費した後は、待機期間（クールダウン）が経過すればエナジー消費ゼロで無料再進化が可能になります。1日1回の進化でメガレベルが進行します：\n\n• ベースレベル（1日）：同タイプ捕獲時アメ+1個、XP+50、無料待機期間7日。\n• ハイレベル（7日）：同タイプ捕獲時アメ+1個、XP+100、アメXL確率+10%、無料待機期間5日。\n• マックスレベル3（30日 — 頂点 🏆）：同タイプ捕獲時アメ+2個、XP+200、アメXL確率+25%の大幅上昇、無料待機期間わずか3日！\n\n戦略上の鉄則：全18タイプに対応できるよう、各タイプ1匹以上のメガレベル3個体を育成しましょう。コミュニティ・デイやレイドデイで起動するだけで、1回あたり40〜80個以上のアメXLを追加獲得できます！",
          "ru": "Мега-Эволюция действует 8 часов. После первой эволюции за Mega Energy (100–400 энергии) покемон может эволюционировать бесплатно по истечении кулдауна. Каждая ежедневная эволюция продвигает Mega Level:\n\n• Base Mega Level (1 день): +1 Candy за покемонов того же типа, +50 XP, бесплатный кд 7 дней.\n• High Mega Level (7 дней): +1 Candy, +100 XP, +10% к шансу Candy XL, бесплатный кд 5 дней.\n• Max Mega Level 3 (30 дней — ТОП 🏆): +2 Candy, +200 XP, +25% к шансу Candy XL, бесплатный кд всего 3 дня!\n\nСтратегическое правило: Прокачайте хотя бы одного Mega Level 3 покемона на каждый из 18 типов. Во время Community Day или Raid Day активный Level 3 приносит на 40–80+ Candy XL больше!"
        },
        "tips": {
          "cs": [
            "Mega Pokémony můžete vyvíjet zdarma každé 3 dny na Levelu 3, nebo kdykoliv dříve za symbolických 5 až 10 Mega Energy.",
            "Chůzí s Buddym ze stejné evoluční rodiny získáte 15 Mega Energy za každý nachozený kilometr (pokud jste daný druh už alespoň jednou mega-vyvinuli).",
            "K vyhledání všech vašich Level 3 megas použijte ve vyhledávání příkaz 'mega3'."
          ],
          "en": [
            "Level 3 Megas can evolve for free every 3 days, or instantly anytime for a negligible 5–10 Mega Energy.",
            "Walking with any Buddy in the same evolutionary line generates 15 Mega Energy per kilometer (provided you unlocked the Mega Dex entry at least once).",
            "Filter all your maxed Megas instantly in storage by typing 'mega3'."
          ],
          "ja": [
            "レベル3メガは3日ごとに完全無料、またはわずか5〜10エナジーでいつでも即時進化可能です。",
            "一度メガシンカさせたことのある系統のポケモンを相棒にして歩くと、1kmごとに15個のメガエナジーが自動生成されます。",
            "ボックスで「mega3」と入力すると、レベル3に到達しているメガポケモンを瞬時に確認できます。"
          ],
          "ru": [
            "Покемоны Level 3 эволюционируют бесплатно раз в 3 дня, либо в любой момент за смешные 5–10 энергии.",
            "Выгул бадди той же ветки эволюции дает 15 Mega Energy за каждый километр (если вид был мега-эволюционирован хотя бы раз).",
            "Для быстрого поиска всех ваших Level 3 используйте фильтр 'mega3'."
          ]
        }
      },
      {
        "id": "primal-reversion-weather-engine",
        "pokemon": [
          "Kyogre",
          "Groudon",
          "Rayquaza"
        ],
        "heading": {
          "cs": "2. Primal Reversion a Mega Rayquaza: Pasivní trojitý buff",
          "en": "2. Primal Reversion & Mega Rayquaza: Passive Triple-Type Boosts",
          "ja": "2. ゲンシカイキとメガレックウザ：控えから発動する3タイプ同時パッシブ効果",
          "ru": "2. Primal Reversion и Mega Rayquaza: Пассивный тройной бафф"
        },
        "content": {
          "cs": "Primal Kyogre, Primal Groudon a Mega Rayquaza představují absolutní vrchol síly v Pokémon GO. Fungují podle speciálních mechanik odlišných od běžných Megas:\n\n1. Trojitý pasivní typový buff:\n• Primal Groudon (Desolate Land): Posiluje Ground, Fire i Grass typy.\n• Primal Kyogre (Primordial Sea): Posiluje Water, Electric i Bug typy.\n• Mega Rayquaza (Delta Stream): Posiluje Dragon, Flying i Psychic typy.\n\n2. Pasivní buff z pozadí (Backline Buff):\nNa rozdíl od běžných Megas, které posilují útoky spojenců v raidu pouze v momentě, kdy samy aktivně bojují v aréně, Primal Pokémoni a Mega Rayquaza poskytují raidový útočný bonus (+30 % stejný typ, +10 % ostatní) i tehdy, když sedí na 6. pozici ve vašem týmu a ještě nevstoupili na bojiště!\n\n3. Požadavek Dragon Ascent:\nMega Rayquaza nepotřebuje pouze Mega Energy, ale musí ovládat elitní létající útok Dragon Ascent, který se odemyká pomocí vzácného předmětu Meteorite.",
          "en": "Primal Kyogre, Primal Groudon, and Mega Rayquaza reign at the apex of Pokémon GO mechanics, operating under unique rules:\n\n1. Triple-Type Elemental Synergy:\n• Primal Groudon (Desolate Land): Boosts Ground, Fire, and Grass types simultaneously.\n• Primal Kyogre (Primordial Sea): Boosts Water, Electric, and Bug types simultaneously.\n• Mega Rayquaza (Delta Stream): Boosts Dragon, Flying, and Psychic types simultaneously.\n\n2. The Backline Party Aura:\nStandard Megas boost raid teammates only while actively battling on the field. In contrast, Primal forms and Mega Rayquaza radiate their offensive raid bonus (+30% matching typing, +10% all others) continuously even while resting in your 6th team slot without entering the arena!\n\n3. Dragon Ascent & Meteorites:\nMega Rayquaza uniquely requires the exclusive Charged Attack Dragon Ascent unlocked via rare Meteorite items before it can Mega Evolve.",
          "ja": "ゲンシカイオーガ、ゲンシグラードン、メガレックウザはPokémon GOにおける最強の存在であり、通常のメガシンカとは異なる特別仕様を持っています：\n\n1. 3タイプ同時のパッシブブースト：\n• ゲンシグラードン（おわりの大地）：じめん・ほのお・くさの3タイプを常時ブースト。\n• ゲンシカイオーガ（はじまりのうみ）：みず・でんき・むしの3タイプを常時ブースト。\n• メガレックウザ（デルタストリーム）：ドラゴン・ひこう・エスパーの3タイプを常時ブースト。\n\n2. パーティ後方からのパッシブ支援（控えバフ）：\n通常のメガシンカは戦闘場に出て戦っている間しか味方に攻撃バフを付与できませんが、ゲンシカイキとメガレックウザはパーティの6番目の控えにいるだけでも、レイド中の全トレーナーに攻撃力+30%（同タイプ）／+10%（他タイプ）のバフを常時発動し続けます！\n\n3. ガリョウテンセイと「いんせき」：\nメガレックウザはエナジーに加えて、限定アイテム「いんせき」で覚える特別技「ガリョウテンセイ（Dragon Ascent）」の習得がメガシンカの必須条件となります。",
          "ru": "Primal Kyogre, Primal Groudon и Mega Rayquaza — вершина мощи в Pokémon GO, работающие по уникальным правилам:\n\n1. Тройной бафф типов:\n• Primal Groudon: Бустит Ground, Fire и Grass одновременно.\n• Primal Kyogre: Бустит Water, Electric и Bug одновременно.\n• Mega Rayquaza: Бустит Dragon, Flying и Psychic одновременно.\n\n2. Пассивная аура из запаса:\nОбычные Меги дают бонус союзникам только пока лично дерутся на арене. Primal формы и Mega Rayquaza дают бафф (+30% своему типу, +10% остальным) даже сидя в 6-м слоте команды!\n\n3. Dragon Ascent и Метеориты:\nMega Rayquaza требует обязательного изучения элитной атаки Dragon Ascent с помощью редкого предмета Meteorite."
        },
        "tips": {
          "cs": [
            "Během Go Festu nebo Primal Raid Day mějte Primal Kyogre nebo Groudon aktivní — pokryjí téměř polovinu všech chytaných Pokémonů pro bonus Candy XL!",
            "V Mega Raidech na Rayquazu lze Meteorit získat ze speciálního výzkumu nebo vzácně jako bonusový drop.",
            "Primal Reversion trvá stejně jako Mega evoluce celých 8 hodin."
          ],
          "en": [
            "During major global events, activating Primal Kyogre or Groudon passively covers almost half of all wild spawns for maximum Candy XL yields!",
            "Meteorites are obtained through event Special Research storylines or as rare bonus raid completion drops.",
            "Primal Reversion lasts the full 8-hour duration, identically to Mega Evolution."
          ],
          "ja": [
            "大型イベント時はゲンシグラードンやカイオーガを起動しておけば、出現ポケモンのほぼ半数をカバーしてアメXLを荒稼ぎできます。",
            "「いんせき」はメガレックウザ関連のスペシャルリサーチやレイド勝利時の超低確率ドロップで入手できます。",
            "ゲンシカイキの持続時間はメガシンカと同様に8時間です。"
          ],
          "ru": [
            "Во время глобальных ивентов Primal Kyogre или Groudon покрывают почти половину всех спавнов для бонуса Candy XL!",
            "Метеориты добываются из специальных квестов либо как ультраредкий дроп за победу в рейде.",
            "Primal Reversion действует стандартные 8 часов."
          ]
        }
      },
      {
        "id": "raid-damage-buffs-and-synergy",
        "pokemon": [
          "Lucario",
          "Gengar",
          "Swampert",
          "Blaziken"
        ],
        "heading": {
          "cs": "3. Raidová synergie: Útočné buffy (+30 %) a řetězení v lobby",
          "en": "3. Raid Synergy: Combat Attack Buffs (+30%) & Lobby Rotation",
          "ja": "3. レイドバトルでの与ダメージ相乗効果（+30%）と連携術",
          "ru": "3. Рейдовая синергия: Атакующие баффы (+30%) и ротация"
        },
        "content": {
          "cs": "Přítomnost Mega Pokémona v raidové bitvě poskytuje silný pasivní bonus všem ostatním trenérům v lobby:\n\n• +30 % poškození: Pro všechny útoky spojenců, které odpovídají elementárnímu typu aktivního Mega Pokémona (např. Mega Charizard Y posílí všechny Fire útoky v bitvě o masivních 30 %).\n• +10 % poškození: Pro všechny ostatní útoky nepříbuzných typů.\n\nPravidlo nestohování (Non-Stacking Rule):\nPokud jsou v aréně současně 2 nebo více Mega Pokémonů, buffy se NESCÍTANÍ. Platí pouze jeden buff. Proto je v koordinovaných skupinách nejlepší nasadit Mega Pokémony postupně (např. Hráč 1 má Mega na 1. slotu, Hráč 2 na 3. slotu, Hráč 3 na 5. slotu), aby bonus +30 % vydržel nepřetržitě po celou dobu 300sekundové bitvy!",
          "en": "The presence of a Mega Pokémon on the raid field confers a substantial aura to all other raiding trainers in the lobby:\n\n• +30% Damage Boost: To all ally attacks that match the active Mega's elemental types (e.g. Mega Lucario elevates all Fighting-type attacks by 30%).\n• +10% Damage Boost: To all ally attacks of non-matching types.\n\nThe Non-Stacking Rule:\nIf two or more Mega Pokémon battle simultaneously, their damage auras DO NOT STACK. Only a single +30% bonus applies. In coordinated raid groups, stagger your Mega placements (Trainer 1 puts Mega in slot 1, Trainer 2 in slot 3, Trainer 3 in slot 5) to sustain the +30% boost continuously across the full 300-second raid timer!",
          "ja": "レイドバトルでメガシンカポケモンが場に出ている間、ロビー内の全味方トレーナーに強力な戦闘バフが付与されます：\n\n• 与ダメージ+30%：メガポケモンのタイプと一致する味方の技（例：メガメタグロスなら鋼・エスパー技が30%強化）。\n• 与ダメージ+10%：タイプが一致しない他の全攻撃技。\n\n重複不可ルール（スタック無効）：\n複数のメガポケモンが同時に場に出ていても、バフは加算されません（最大でも+30%のまま）。そのためフレンド同士で挑む際は、トレーナーAが1番手、トレーナーBが3番手、トレーナーCが5番手にメガを配置することで、レイド中常に+30%バフを切らさずに維持するのがプロの戦法です！",
          "ru": "Присутствие Мега-покемона на поле дает мощную боевую ауру всем тренерам в лобби:\n\n• +30% урона: Для всех атак, совпадающих по типу с активной Мегой (например, Mega Lucario усиливает Fighting атаки на 30%).\n• +10% урона: Для всех остальных типов атак.\n\nПравило не-суммирования:\nЕсли на поле одновременно бьются 2 Меги, баффы НЕ СКЛАДЫВАЮТСЯ. В слаженных командах ставьте Мег в разные слоты (игрок 1 — в слот 1, игрок 2 — в слот 3), чтобы бонус +30% висел непрерывно все 300 секунд!"
        },
        "tips": {
          "cs": [
            "Mega Lucario, Mega Heracross a Mega Blaziken tvoří svatou trojici pro drcení Normal, Dark, Ice a Steel raid bossů.",
            "Mega Gengar má nejvyšší Ghost DPS ve hře, ale je křehký — využívejte úskoky (dodge) proti charged útokům bosse.",
            "V Gymech můžete Mega Pokémony používat k útoku, ale nelze je nasadit jako obránce do Gymu."
          ],
          "en": [
            "Mega Lucario, Mega Heracross, and Mega Blaziken form the holy trinity for decimating Normal, Dark, Ice, and Steel raid bosses.",
            "Mega Gengar delivers top Ghost DPS but is glassy; practice dodging boss charged moves to prolong the +30% Ghost aura.",
            "Mega Pokémon can conquer gyms as attackers, but cannot be stationed as Gym defenders."
          ],
          "ja": [
            "メガルカリオ、メガヘラクロス、メガバシャーモはノーマル・悪・氷・鋼ボスを討伐する最強の格闘トリオです。",
            "メガゲンガーは突出したDPSを持つ反面耐久が低いため、ボスのゲージ技を回避して場に長く残す立ち回りが有効です。",
            "メガポケモンはジム攻撃には使用できますが、ジムの防衛ポケモンとして配置することはできません。"
          ],
          "ru": [
            "Mega Lucario, Mega Heracross и Mega Blaziken — тройка абсолютных лидеров против Normal, Dark, Ice и Steel боссов.",
            "Mega Gengar выдает топовый урон, но хрупок — уклоняйтесь (dodge) от атак босса для удержания ауры.",
            "Мега-покемонами можно атаковать гимы, но нельзя ставить их защитниками."
          ]
        }
      },
      {
        "id": "dynamax-max-particle-system",
        "pokemon": [
          "Charizard",
          "Blastoise",
          "Venusaur",
          "Beldum"
        ],
        "heading": {
          "cs": "4. Dynamax systém: Max Particles (MP) a Power Spot mechaniky",
          "en": "4. Dynamax Mechanics: Max Particle (MP) Economy & Power Spots",
          "ja": "4. ダイマックス仕様：マックス粒子（MP）収集とパワースポット攻略",
          "ru": "4. Механика Dynamax: Экономика Max Particles (MP) и Power Spots"
        },
        "content": {
          "cs": "Dynamax mechanika přináší na mapu Power Spoty a fialovou energii Max Particles (MP):\n\n1. Sběr Max Particles (MP):\n• Návštěva Power Spotu: 120 MP (nebo 300 MP při první návštěvě nového spotu).\n• Chůze: 300 MP za každé 2 nachozené kilometry v záložce Nearby.\n• Denní měkký strop (Soft Cap): 800 MP denně.\n\n2. Trik na přetečení limitu (1 080 MP Trick):\nPokud máte nasbíráno 720 až 780 MP (těsně pod limitem 800 MP) a jako poslední akci dne vyzvednete odměnu 300 MP za 2 km chůze, hra povolí překročení limitu a získáte až 1 080 MP za jediný den!\n\n3. Vylepšování Max Moves:\nKaždý Dynamax Pokémon má 3 Max útoky (Max Strike, Max Guard, Max Spirit). Vylepšení na Level 3 vyžaduje 800 MP, 100 Candy a 40 Candy XL. Max Spirit (léčení týmu) je klíčem pro sólování Tier 3 bossů jako Dynamax Beldum nebo Falinks!",
          "en": "Dynamax introduces Power Spots across the map governed by Max Particle (MP) energy:\n\n1. Max Particle Ingestion:\n• Interacting with Power Spots: 120 MP (or 300 MP for the first interaction at a newly discovered spot).\n• Walking Distance: 300 MP for every 2 km walked claimed via the Nearby tab.\n• Daily Soft Cap: 800 MP per calendar day.\n\n2. The 1,080 MP Overflow Trick:\nWhen sitting at 720 to 780 MP (just under the 800 soft cap), claiming your 300 MP walking reward as your final daily action bypasses the threshold, stocking up to 1,080 MP in a single day!\n\n3. Upgrading Max Moves:\nDynamax Pokémon possess 3 Max Moves (Max Strike, Max Guard, Max Spirit). Elevating a move to Level 3 requires 800 MP, 100 Candy, and 40 Candy XL. Max Spirit (team health recovery) is paramount for soloing Tier 3 raids like Dynamax Beldum or Falinks!",
          "ja": "ダイマックスはマップ上のパワースポットと紫色に輝く「マックス粒子（MP）」を軸とした新バトルシステムです：\n\n1. マックス粒子の入手ルート：\n• パワースポット巡回：1箇所につき120 MP（初訪問スポットは300 MP）。\n• 歩行距離：付近のようすタブで2km歩行ごとに300 MP受取可能。\n• 1日の通常上限（ソフトキャップ）：800 MP／日。\n\n2. 1,080 MP上限突破トリック：\n所持MPが720〜780 MP（上限800 MPの直前）の状態で、その日最後の行動として「2km歩行報酬の300 MP」を受け取ると、上限を飛び越えて最大1,080 MPまで1日で収集できます！\n\n3. マックス技のレベルアップ：\nダイマックスポケモンは3つの技（ダイアタック、ダイウォール、ダイリカバリー）を持ちます。レベル3への強化には800 MP、アメ100個、アメXL 40個が必要です。特に「ダイリカバリー（HP回復）」はダイマックスダンバル等のソロ攻略で最重要となります！",
          "ru": "Dynamax привносит Power Spots и фиолетовую энергию Max Particles (MP):\n\n1. Сбор MP:\n• Power Spot: 120 MP (или 300 MP за первое посещение нового места).\n• Ходьба: 300 MP за каждые 2 км пути во вкладке Nearby.\n• Дневной софт-кап: 800 MP в день.\n\n2. Трик на 1080 MP:\nКогда у вас 720–780 MP (прямо перед лимитом 800), заберите награду 300 MP за 2 км ходьбы последней. Игра позволит перешагнуть лимит до 1080 MP!\n\n3. Прокачка Max Moves:\nУ покемона 3 приема: Max Strike, Max Guard, Max Spirit. Прокачка до 3 уровня стоит 800 MP, 100 Candy и 40 Candy XL. Max Spirit (хил команды) критичен для соло-побед над 3★ боссами вроде Beldum!"
        },
        "tips": {
          "cs": [
            "Vstup do 1★ Max Battle stojí 250 MP, 3★ stojí 400 MP a 6★ Gigantamax stojí 800 MP (MP se odečte až při vítězství!).",
            "Pokud bitvu prohrajete nebo z ní odejdete, o žádné MP nepřijdete.",
            "Umístěním svého Dynamax Pokémona do Power Spotu po vítězství sbíráte pasivní Candy a Candy XL od procházejících hráčů."
          ],
          "en": [
            "Max Battle entry costs: 250 MP for Tier 1, 400 MP for Tier 3, and 800 MP for Tier 6 Gigantamax (MP is spent only upon victory!).",
            "Failing or withdrawing from a battle refunds 100% of your Max Particles.",
            "Stationing your Dynamax Pokémon at a conquered Power Spot generates passive Candy and Candy XL assisted by other players."
          ],
          "ja": [
            "バトル参加コスト：星1は250 MP、星3は400 MP、星6キョダイマックスは800 MP（MPは勝利時のみ消費されます）。",
            "敗北や途中退室してもMPは一切減りません。",
            "勝利後にポケモンをパワースポットに配置すると、他のプレイヤーの支援を受けてアメやアメXLを自動獲得できます。"
          ],
          "ru": [
            "Стоимость боев: 250 MP за 1★, 400 MP за 3★, 800 MP за 6★ Gigantamax (MP списываются ТОЛЬКО при победе!).",
            "При поражении или выходе из боя MP не теряются.",
            "Размещение покемона на Power Spot после победы пассивно приносит Candy и Candy XL."
          ]
        }
      },
      {
        "id": "gigantamax-6-star-coop-strategy",
        "pokemon": [
          "Gengar",
          "Machamp",
          "Toxtricity",
          "Lapras"
        ],
        "heading": {
          "cs": "5. Gigantamax 6★ Bitvy: Kooperace 10–40 hráčů a Max Guard",
          "en": "5. Gigantamax 6-Star Battles: 10–40 Trainer Co-op & Max Guard Tactics",
          "ja": "5. キョダイマックス星6バトル：10〜40人協力プレイとダイウォールの連携術",
          "ru": "5. Битвы Gigantamax 6★: Кооператив 10–40 игроков и тактика Max Guard"
        },
        "content": {
          "cs": "Gigantamax (G-Max) bitvy představují nejnáročnější PvE výzvu v historii Pokémon GO:\n\n1. Masivní lobby:\nBitvy umožňují spojení 10 až 40 trenérů současně. Bossové mají obrovské zásoby HP a drtivé plošné útoky.\n\n2. Mechanika Cheer po omdlení:\nPokud všichni 3 vaši Pokémoni padnou, nevypadáváte ze hry! Můžete zbývajícím živým hráčům pomáhat mačkáním tlačítka 'Cheer' (Povzbuzovat), čímž zrychlujete nabíjení jejich Max Meteru pro přechod do Dynamax fáze.\n\n3. Strategie Max Guard a Max Spirit:\nV Gigantamax fázích by neměli všichni hráči slepě používat pouze útok Max Strike. Jeden určený hráč by měl aktivovat Max Guard (ochrání celou skupinu před smrtícím úderem bosse) a další Max Spirit (vyléčí zraněné týmy), což zabrání hromadnému vyhlazení skupiny!",
          "en": "Gigantamax (G-Max) encounters stand as the most formidable co-op challenges in Pokémon GO history:\n\n1. Massive Lobby Scaling:\nBattles support 10 to 40 trainers working in unison. Bosses wield colossal HP pools and devastating field-wide wipe mechanics.\n\n2. The Post-Faint Cheer Engine:\nIf all 3 of your Pokémon faint, you are not disqualified! Tapping the on-screen 'Cheer' button accelerates the Max Meter for surviving teammates, propelling them into the Dynamax transformation phase.\n\n3. Tactical Max Guard & Max Spirit Rotations:\nDuring the Dynamax phase, avoid blindly spamming Max Strike. Designating support trainers to cycle Max Guard (mitigating lethal incoming wipe attacks) and Max Spirit (restoring collective team vitality) ensures steady, reliable victories!",
          "ja": "キョダイマックス（G-Max）バトルは、Pokémon GO史上最高難易度を誇る協力バトルです：\n\n1. 10〜40人の大規模レイド：\n10〜40人のトレーナーが同時に共闘可能。ボスは莫大なHPとチーム全体を一撃で消し去る即死級攻撃を放ちます。\n\n2. 全滅後の「おうえん」システム：\n手持ちの3匹がすべてひんしになっても戦線離脱にはなりません！画面を連打して「おうえん」することで、生き残っている仲間のマックスメーター充填を大幅に加速できます。\n\n3. ダイウォール＆ダイリカバリーの役割分担：\nダイマックス突入時、全員が攻撃（ダイアタック）を連打するのは危険です。一部のプレイヤーが「ダイウォール」でボスの全体即死攻撃を遮断し、「ダイリカバリー」で味方を全体回復する連携が勝利への決定打となります！",
          "ru": "Gigantamax (G-Max) битвы — сложнейшее командное испытание в истории игры:\n\n1. Масштабное лобби:\nБои поддерживают от 10 до 40 тренеров одновременно. У боссов гигантский запас HP и смертоносные атаки.\n\n2. Механика Cheer после гибели:\nЕсли все 3 ваших покемона упали, вы не выбываете! Тапайте кнопку 'Cheer', чтобы ускорять зарядку Max Meter для выживших союзников.\n\n3. Ротация Max Guard и Max Spirit:\nВ фазе Dynamax не спамьте только Max Strike. Использование Max Guard блокирует смертельный урон по всей группе, а Max Spirit восстанавливает здоровье!"
        },
        "tips": {
          "cs": [
            "Gigantamax formy nelze získat běžnou evolucí dynamaxových Pokémonů — musíte je porazit a chytit přímo v 6★ Max Bitvě.",
            "Každý Gigantamax Pokémon ovládá svůj unikátní G-Max Move (např. G-Max Wildfire u Charizarda nebo G-Max Befuddle u Butterfree).",
            "K vyhledání všech Gigantamax obrů zadejte do vyhledávání slovo 'gigantamax'."
          ],
          "en": [
            "Gigantamax forms cannot be obtained by evolving regular Dynamax species; they must be confronted and captured directly in 6-Star Max Battles.",
            "Every Gigantamax species brandishes an exclusive G-Max Move (e.g. G-Max Wildfire on Charizard or G-Max Befuddle on Butterfree).",
            "Filter all your Gigantamax giants in storage instantly by typing 'gigantamax'."
          ],
          "ja": [
            "通常のダイマックスポケモンを進化させてもキョダイマックスにはなりません。星6マックスバトルで直接倒して捕獲する必要があります。",
            "キョダイマックスポケモンは種族固有の強力な「キョダイマックス技（キョダイゴクエン等）」を操ります。",
            "ボックスで「gigantamax」と検索するとキョダイマックスポケモンを一覧表示できます。"
          ],
          "ru": [
            "Обычные Dynamax покемоны не становятся Gigantamax при эволюции — их нужно ловить в 6★ Max Battles.",
            "Каждый Gigantamax владеет уникальной атакой G-Max Move (например, G-Max Wildfire у Чаризарда).",
            "Для фильтрации используйте поисковое слово 'gigantamax'."
          ]
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
        pokemon: ["Farfetchd-Galarian", "Primeape", "Pancham", "Charcadet", "Slowpoke-Galarian", "Poipole", "Yamask-Galarian", "Qwilfish-Hisuian", "Spritzee", "Swirlix", "Floette", "Eevee"],
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
        pokemon: ["Eevee", "Mime-Jr", "Bonsly", "Happiny", "Woobat", "Pawmo", "Bramblin", "Rellor"],
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
      "id": "vivillon-patterns-postcard-guide",
      "slug": "vivillon-patterns-postcard-guide",
      "iconName": "BookOpen",
      "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/666.png",
      "author": "PoGo Events Team",
      "readTime": "11 min",
      "updatedAt": "2026-08-23",
      "category": {
          "cs": "Vivillon & Postcards",
          "en": "Vivillon & Postcards",
          "ja": "ビビヨン＆ポストカード",
          "ru": "Вивиллон и Открытки"
      },
      "title": {
          "cs": "Vivillon Pokémon GO Guide: Mapa všech 18 vzorů, Postcard triky, Pin & Unpin a Hundo 204 CP (2026)",
          "en": "Vivillon Pokémon GO Master Guide: All 18 Patterns Map, Pin & Unpin Storage Trick & 204 CP Hundo (2026)",
          "ja": "【2026最新】ビビヨン全18模様の出現マップ・即ピン解除裏技・204 CP 100%個体値完全攻略",
          "ru": "Полный гайд по Вивиллону в Pokémon GO: Карта всех 18 узоров, трюк Pin & Unpin и 100% сотка 204 CP (2026)"
      },
      "subtitle": {
          "cs": "Kompletní průvodce sbírkou Vivillona: Jak funguje připínání pohlednic, milníky medaile (3, 9, 15), trik Pin & Unpin proti přeplnění alba, 100% IV hodnota 204 CP a hledání Sandstormu.",
          "en": "Ultimate Vivillon collection handbook: Postcard pinning mechanics, Butterfly Collector medal encounter tiers (3, 9, 15), instant Pin & Unpin storage trick, 204 CP Hundo check, and Sandstorm hunting.",
          "ja": "ポストカード保存システム、コレクターメダルの出現条件（3・9・15枚）、所持枠を消費しないピン留め解除裏技、204 CPの100%個体値、砂塵（Sandstorm）の集め方を完全網羅。",
          "ru": "Полное руководство по сбору Вивиллонов: сохранение открыток, уровни медали (3, 9, 15), трюк Pin & Unpin для чистки альбома, 100% сотка 204 CP и поиск редкого Sandstorm."
      },
      "sections": [
          {
              "id": "vivillon-postcard-mechanics",
              "pokemon": [
                  "Scatterbug",
                  "Spewpa",
                  "Vivillon"
              ],
              "heading": {
                  "cs": "1. Jak funguje mechanika připínání pohlednic a medaile Butterfly Collector",
                  "en": "1. How Postcard Pinning & Butterfly Collector Medal Work",
                  "ja": "1. ポストカード保存とコレクターメダルの仕組み",
                  "ru": "1. Механика сохранения открыток и медаль Butterfly Collector"
              },
              "content": {
                  "cs": "Vivillon (a jeho předchozí vývojová stádia Scatterbug a Spewpa) je unikátní Pokémon, jehož křídla mají 18 různých regionálních vzorů. Získávají se připínáním pohlednic (Postcards) z dárků od přátel z celého světa:\n\n1. Připnutí pohlednice od přítele: Při otevírání dárku klepněte na ikonu špendlíku (📌 Pin) před otevřením dárku.\n2. Vlastní pohlednice: Můžete připnout až 3 své vlastní odeslané pohlednice denně z vašeho lokálního regionu (např. Continental v ČR/SK).\n3. Milníky pro setkání se Scatterbugem v medaili:\n   • 1. setkání z regionu: 3 připnuté pohlednice\n   • 2. setkání z regionu: 9 připnutých pohlednic\n   • 3. a každé další setkání: 15 připnutých pohlednic\n4. Vývoj: Scatterbug ➔ Spewpa (25 Candy) ➔ Vivillon (100 Candy). Vzor křídel je trvale uzamčen podle regionu původní pohlednice!",
                  "en": "Vivillon (evolving from Scatterbug and Spewpa) features 18 distinct regional wing patterns acquired through the Postcard Book mechanic from friends across the globe:\n\n1. Pinning Friend Postcards: Tap the Pin (📌) icon next to Open on incoming friend gifts.\n2. Pinning Your Own Postcards: You can pin up to 3 outgoing postcards per day from your local region (e.g. Continental in Central Europe).\n3. Scatterbug Encounter Milestones:\n   • 1st encounter: 3 pinned postcards from that region\n   • 2nd encounter: 9 pinned postcards\n   • 3rd & all subsequent encounters: 15 pinned postcards each\n4. Evolution Cost: Scatterbug ➔ Spewpa (25 Candy) ➔ Vivillon (100 Candy). Wing pattern is permanently locked to the origin region of the postcard!",
                  "ja": "ビビヨン（コフキムシ➔コフーライから進化）は世界18種類の羽の模様を持つ特別なポケモンです：\n\n1. フレンドのギフト保存：ギフトを開封する前に「ピン留め（📌）」アイコンをタップします。\n2. 自分のポストカード保存：自分で入手したポストカードも1日最大3枚までピン留め可能（日本の場合は「みやび/Elegant」等に進捗）。\n3. コフキムシ出現の必要枚数：\n   • 1回目：対象地域のカード 3枚\n   • 2回目：対象地域のカード 9枚\n   • 3回目以降：対象地域のカード 15枚ごと\n4. 進化コスト：コフキムシ ➔ コフーライ（アメ25個） ➔ ビビヨン（アメ100個）。羽の模様はポストカードの地域で確定します！",
                  "ru": "Вивиллон (эволюционирует из Scatterbug и Spewpa) имеет 18 уникальных региональных узоров крыльев, открываемых через прикрепление открыток из подарков друзей:\n\n1. Прикрепление открыток друзей: Нажмите на иконку булавки (📌 Pin) перед открытием подарка.\n2. Свои открытки: Можно прикрепить до 3 своих отправляемых открыток в день для прокачки домашнего региона (Continental в СНГ/Европе).\n3. Пороги появления Scatterbug:\n   • 1-я встреча: 3 открытки из региона\n   • 2-я встреча: 9 открыток\n   • 3-я и все последующие: каждые 15 открыток\n4. Эволюция: Scatterbug ➔ Spewpa (25 конфет) ➔ Vivillon (100 конфет). Узор навсегда привязан к региону открытки!"
              },
              "tips": {
                  "cs": [
                      "Při otevírání dárků vždy nejprve připněte pohlednici a až poté otevřete dárek. Po otevření dárku pohlednice nenávratně zmizí!",
                      "Počet otevřených dárků denně je běžně 30 (během bonusových eventů až 40-50)."
                  ],
                  "en": [
                      "Always pin the postcard BEFORE tapping Open. Once opened, the gift and its postcard disappear forever!",
                      "Daily gift opening cap is 30 gifts normally (expanding up to 40-50 during special seasonal events)."
                  ],
                  "ja": [
                      "ギフトを開封する前に必ずピン留めしてください。開封後はポストカードが消滅します！",
                      "1日のギフト開封上限は通常30個（シーズンイベント時は40〜50個）です。"
                  ],
                  "ru": [
                      "Всегда закрепляйте открытку ДО открытия подарка. После открытия она исчезнет!",
                      "Обычный лимит открытия подарков в день — 30 штук (до 40-50 во время ивентов)."
                  ]
              }
          },
          {
              "id": "pin-unpin-infinite-storage",
              "pokemon": [
                  "Scatterbug"
              ],
              "heading": {
                  "cs": "2. Trik 'Pin & Unpin': Jak připínat donekonečna bez přeplnění alba (350 limit)",
                  "en": "2. The 'Pin & Unpin' Master Trick: Infinite Credits Without Filling Your 350-Slot Book",
                  "ja": "2. 「即ピン留め解除」神技：アルバム上限（350枚）を圧迫せず無限保存",
                  "ru": "2. Трюк 'Pin & Unpin': Бесконечные кредиты без забивания альбома (лимит 350)"
              },
              "content": {
                  "cs": "Kniha pohlednic (Postcard Book) má základní kapacitu pouze 350 pohlednic (rozšiřitelnou v shopu za PokéCoins). Pokud se album zaplní, hra vám zakáže připínat další pohlednice a přijdete o postup k Scatterbugům.\n\n⚡ Trik pro nekonečné připínání:\n1. Otevřete dárek od přítele a klepněte na špendlík (📌 Pin).\n2. Na obrazovce vyskočí animace 'Postcard saved' a v pozadí se okamžitě započítá +1 bod do příslušné Vivillon medaile.\n3. Okamžitě klepněte na ikonu špendlíku znovu! Špendlík se odepne a pohlednice se z alba odstraní.\n4. Započtený bod v medaili VÁM ZŮSTANE NAPOŘÁD!\n5. Nyní otevřete dárek běžným tlačítkem Open.\n\nDíky tomuto postupu zůstane vaše album stále prázdné a můžete denně zpracovat maximum dárků bez nutnosti ručního promazávání 350 položek.",
                  "en": "The Postcard Book has a default storage limit of 350 postcards (expandable via the in-game Shop with PokéCoins). Once full, the game blocks you from pinning any more postcards, stalling your Vivillon medals.\n\n⚡ The Instant Pin & Unpin Technique:\n1. View an incoming friend gift and tap the Pin (📌) icon.\n2. The 'Postcard saved' confirmation flashes and +1 credit is immediately written to your Vivillon sub-medal.\n3. Immediately tap the pin icon a second time! The pin unchecks and the card is purged from your book.\n4. The Scatterbug medal progress IS PERMANENTLY PRESERVED!\n5. Now tap the Open button normally.\n\nUsing this routine keeps your Postcard Book at 0 items permanently, allowing you to cycle through all 30+ daily gifts without annoying storage errors.",
                  "ja": "ポストカードブックの初期容量は350枚（ショップでコイン拡張可能）です。満杯になるとピン留めができなくなり、ビビヨンの進捗が止まってしまいます。\n\n⚡ 即ピン留め解除のやり方：\n1. ギフトを開く画面でピン留めアイコン（📌）をタップ。\n2. 「ポストカードを保存しました」と表示され、裏でメダルのカウントが即座に+1されます。\n3. その直後、もう一度同じピン留めアイコンをタップして解除（Unpin）！\n4. メダルの進捗カウントは消えずにそのまま残ります！\n5. その後、通常通りギフトを開封。\n\nこの裏技を使えばポストカード所持枠が一切増えず、満杯になる心配がゼロになります。",
                  "ru": "Альбом открыток вмещает всего 350 штук. Когда он заполняется, игра блокирует сохранение новых открыток, и прогресс Вивиллонов останавливается.\n\n⚡ Техника мгновенного Pin & Unpin:\n1. Откройте подарок друга и нажмите на булавку (📌 Pin).\n2. Появится уведомление о сохранении открытки, и в медаль сразу запишется +1 балл.\n3. Сразу же нажмите на булавку повторно! Она снимется, и открытка удалится из книги.\n4. Прогресс в медали Scatterbug СОХРАНЯЕТСЯ НАВСЕГДА!\n5. Теперь спокойно нажимайте кнопку 'Открыть'.\n\nЭтот трюк оставляет ваш альбом пустым и позволяет крутить подарки каждый день без ручной чистки."
              },
              "tips": {
                  "cs": [
                      "Odepnutí pohlednice trvá pouhé 0.5 sekundy navíc, ale ušetří vám hodiny otravného mazání po 350 kusech.",
                      "Tento trik funguje i na vaše vlastní 3 odesílané pohlednice denně!"
                  ],
                  "en": [
                      "Unpinning takes just 0.5 seconds per gift, saving hours of tedious manual postcard deletion.",
                      "This trick works identically on your 3 daily outgoing postcards!"
                  ],
                  "ja": [
                      "ピン留め解除はわずか0.5秒で完了し、後から350枚を手動削除する苦痛から解放されます。",
                      "自分の送信ポストカード（1日3回）でも同様に機能します！"
                  ],
                  "ru": [
                      "Снятие булавки занимает полсекунды, но спасает от долгой чистки 350 открыток вручную.",
                      "Трюк работает и для ваших собственных 3 отправляемых открыток в день!"
                  ]
              }
          },
          {
              "id": "vivillon-18-regional-patterns",
              "pokemon": [
                  "Vivillon"
              ],
              "heading": {
                  "cs": "3. Přehled všech 18 vzorů, regionů a vzácnostních tříd",
                  "en": "3. Complete 18 Regional Patterns, Territories & Rarity Tiers",
                  "ja": "3. 全18模様の出現地域一覧・国別分布・レア度Tier",
                  "ru": "3. Список всех 18 узоров, стран и уровней редкости"
              },
              "content": {
                  "cs": "Svět je rozdělen do 18 unikátních Vivillon zón. Nejvzácnější vzory pocházejí z oblastí s nízkou hustotou aktivních hráčů:\n\n👑 TIER S — ULTRA VZÁCNÉ (Nejtěžší na získání):\n• Sandstorm: Blízký východ (Spojené arabské emiráty / Dubaj, Saúdská Arábie, Katar, Izrael, Omán).\n• Sun: Mexiko, Madagaskar, Severní Austrálie (Darwin), Guatemala.\n• Ocean: Havaj (USA), Galapágy (Ekvádor), Réunion.\n• Tundra: Island, Severní Norsko (Tromsø), Hokkaidó (Japonsko).\n• Icy Snow: Grónsko, Severní Finsko, Švédsko, Severní Kanada (Nunavut).\n\n⭐ TIER A — VZÁCNÉ:\n• Savanna: Brazílie, Paraguay.\n• Archipelago: Karibské ostrovy, Portoriko, Dominikánská republika.\n• River: Jižní Austrálie, Jihoafrická republika, Egypt.\n• Monsoon: Tchaj-wan, Hongkong, Thajsko, Vietnam, Indie.\n\n🌍 TIER B — BĚŽNÉ:\n• Continental: Česká republika, Slovensko, Polsko, Německo, Rakousko, Argentina.\n• Meadow: Francie, Itálie, Švýcarsko.\n• Garden: Velká Británie, Irsko, Nový Zéland.\n• Marine: Španělsko, Portugalsko, Řecko, Chile.\n• High Plains: Západ USA (Kalifornie, Nevada), Východní Evropa.\n• Modern: Jih a východ USA (Texas, Florida, New York).\n• Polar: Kanada, Aljaška, Švédsko, Norsko.\n• Elegant: Japonsko (Honšú, Šikoku, Kjúšú).\n• Jungle: Singapur, Malajsie, Indonésie, Kolumbie.",
                  "en": "The Pokémon GO world is partitioned into 18 distinct Vivillon habitats. The hardest patterns to acquire stem from areas with remote populations or few active trainers:\n\n👑 TIER S — ULTRA-RARE (Most Challenging):\n• Sandstorm: Middle East (UAE / Dubai, Saudi Arabia, Qatar, Israel, Oman).\n• Sun: Mexico, Madagascar, Northern Australia (Darwin), Guatemala.\n• Ocean: Hawaii (USA), Galapagos Islands, Réunion.\n• Tundra: Iceland, Northern Norway (Tromsø), Hokkaido (Japan).\n• Icy Snow: Greenland, Northern Finland/Sweden, Northern Canada (Nunavut).\n\n⭐ TIER A — RARE:\n• Savanna: Brazil, Paraguay.\n• Archipelago: Caribbean Islands, Puerto Rico, Dominican Republic.\n• River: Southern Australia, South Africa, Egypt.\n• Monsoon: Taiwan, Hong Kong, Thailand, Vietnam, India.\n\n🌍 TIER B — COMMON:\n• Continental: Czech Republic, Slovakia, Poland, Germany, Austria, Argentina.\n• Meadow: France, Italy, Switzerland.\n• Garden: United Kingdom, Ireland, New Zealand.\n• Marine: Spain, Portugal, Greece, Chile.\n• High Plains: Western USA (California, Nevada), Eastern Europe.\n• Modern: Southern & Eastern USA (Texas, Florida, New York).\n• Polar: Canada, Alaska, Sweden, Norway.\n• Elegant: Japan (Honshu, Shikoku, Kyushu).\n• Jungle: Singapore, Malaysia, Indonesia, Colombia.",
                  "ja": "ポケモンGOの世界は18のビビヨン生息エリアに分かれています：\n\n👑 Tier S（超激レア・最難関）：\n• 砂塵（Sandstorm）：中東（UAE/ドバイ、サウジアラビア、カタール、イスラエル、オマーン）。\n• 太陽（Sun）：メキシコ、マダガスカル、豪州北部（ダーウィン）、グアテマラ。\n• オーシャン（Ocean）：ハワイ（米国）、ガラパゴス諸島、レユニオン。\n• つんどら（Tundra）：アイスランド、ノルウェー北部（トロムソ）、北海道。\n• 氷雪（Icy Snow）：グリーンランド、フィンランド・スウェーデン北部、カナダ北部。\n\n⭐ Tier A（レア）：\n• サバンナ（Savanna）：ブラジル、パラグアイ。\n• 群島（Archipelago）：カリブ海諸島、プエルトリコ。\n• 大河（River）：オーストラリア南部、南アフリカ、エジプト。\n• スコール（Monsoon）：台湾、香港、タイ、ベトナム、インド。\n\n🌍 Tier B（一般）：\n• 大陸（Continental）：中欧（チェコ、ドイツ、ポーランド等）。\n• 花園（Meadow）：フランス、イタリア、スイス。\n• 庭園（Garden）：イギリス、アイルランド、NZ。\n• 海洋（Marine）：スペイン、ポルトガル、ギリシャ。\n• 荒野（High Plains）：米国西部。\n• モダン（Modern）：米国中南部。\n• 雪原（Polar）：カナダ、アラスカ。\n• 雅（Elegant）：日本（本州・四国・九州）。\n• ジャングル（Jungle）：シンガポール、マレーシア、コロンビア。",
                  "ru": "Мир поделен на 18 зон обитания Вивиллонов. Самые редкие происходят из труднодоступных мест с малым числом игроков:\n\n👑 TIER S — УЛЬТРА-РЕДКИЕ:\n• Sandstorm: Ближний Восток (ОАЭ/Дубай, Саудовская Аравия, Катар, Израиль, Оман).\n• Sun: Мексика, Мадагаскар, Север Австралии, Гватемала.\n• Ocean: Гавайи (США), Галапагосы, Реюньон.\n• Tundra: Исландия, Север Норвегии, Хоккайдо.\n• Icy Snow: Гренландия, Север Финляндии, Север Канады.\n\n⭐ TIER A — РЕДКИЕ:\n• Savanna: Бразилия, Парагвай.\n• Archipelago: Карибские о-ва, Пуэрто-Рико.\n• River: Южная Австралия, ЮАР, Египет.\n• Monsoon: Тайвань, Гонконг, Таиланд, Индия.\n\n🌍 TIER B — ОБЫЧНЫЕ:\n• Continental: Чехия, Германия, Польша, Словакия, Аргентина.\n• Meadow: Франция, Италия, Швейцария.\n• Garden: Великобритания, Ирландия, Новая Зеландия.\n• Marine: Испания, Португалия, Греция.\n• High Plains: Запад США, Восточная Европа.\n• Modern: Юг и восток США.\n• Polar: Канада, Аляска, Норвегия.\n• Elegant: Япония.\n• Jungle: Сингапур, Колумбия, Индонезия."
              },
              "tips": {
                  "cs": [
                      "Hledáte vzácný Sandstorm nebo Sun? Využijte sekci 'Přátelé' v naší aplikaci a filtrujte trenéry přímo podle regionu!",
                      "Speciální Poké Ball a Fancy Pattern zatím nejsou ve hře dostupné."
                  ],
                  "en": [
                      "Looking for Sandstorm or Sun? Use our 'Friend Finder' tab to filter players by target Vivillon habitat!",
                      "Poké Ball Pattern and Fancy Pattern are currently unreleased in Pokémon GO."
                  ],
                  "ja": [
                      "砂塵や太陽のフレンドをお探しの方は、当サイトの「フレンド募集」機能で地域検索をご活用ください！",
                      "モンスターボール模様とファンシー模様は現在未実装です。"
                  ],
                  "ru": [
                      "Ищете Sandstorm или Sun? Используйте раздел 'Друзья' на нашем сайте для поиска игроков из нужных стран!",
                      "Узоры Poké Ball и Fancy пока недоступны в игре."
                  ]
              }
          },
          {
              "id": "vivillon-candy-evolution-costs",
              "pokemon": [
                  "Scatterbug",
                  "Spewpa",
                  "Vivillon"
              ],
              "heading": {
                  "cs": "4. Náklady na vývoj, farmení Candy a Pinap Berries",
                  "en": "4. Evolution Candy Costs, Pinap Farming & Buddy Distance",
                  "ja": "4. 進化コスト、アメ集め効率、相棒歩行距離",
                  "ru": "4. Стоимость эволюции, фарм конфет и дистанция напарника"
              },
              "content": {
                  "cs": "Pro zkompletování všech 18 vzorů Vivillona budete potřebovat masivní zásobu Scatterbug Candy:\n\n• Vývoj 1 vzoru: Scatterbug ➔ Spewpa (25 Candy) ➔ Vivillon (100 Candy) = celkem 125 Candy.\n• Všech 18 vzorů: 18 × 125 = 2 250 Scatterbug Candy celkem!\n\nJak maximalizovat Candy výnos:\n1. Silver Pinap / Pinap Berry: Při chytání každého Scatterbuga z medaile VŽDY použijte Silver Pinap (+7 Candy) nebo Pinap (+6 Candy).\n2. Mega Evolve Level 3: Aktivujte Bug-type Mega Pokémona (Mega Beedrill, Mega Pinsir, Mega Scizor, Mega Heracross) pro +2 extra Candy a +25% šanci na Candy XL za každý catch.\n3. Buddy chůze: Scatterbug generuje 1 Candy za pouhý 1 km chůze (při stavu 'Excited' dokonce každých 500 metrů!).",
                  "en": "Completing the entire 18-pattern Vivillon Pokédex requires a considerable stockpile of Scatterbug Candy:\n\n• Single Pattern Cost: Scatterbug ➔ Spewpa (25 Candy) ➔ Vivillon (100 Candy) = 125 Candy per pattern.\n• Master Set (18 patterns): 18 × 125 = 2,250 Scatterbug Candy in total!\n\nMaximizing Candy Yield:\n1. Silver Pinap / Pinap Berry: Always feed a Silver Pinap (7 Candy) or Pinap Berry (6 Candy) on every medal reward catch.\n2. Active Level 3 Mega: Mega Evolve a Bug-type Pokémon (Mega Beedrill, Mega Pinsir, Mega Scizor, Mega Heracross) for +2 bonus Candy and +25% Candy XL odds per catch.\n3. Buddy Distance: Scatterbug earns 1 Candy per 1.0 km walked (drops to just 500 meters when Excited!).",
                  "ja": "全18種類のビビヨンを進化・コンプリートするには大量のアメが必要です：\n\n• 1体あたりの進化コスト：コフキムシ ➔ コフーライ（25個） ➔ ビビヨン（100個）＝ 合計 125個。\n• 全18種類コンプリート：18 × 125 ＝ 合計 2,250個 のアメ！\n\nアメ集めの最速テクニック：\n1. 銀のパイル／パイルの実：メダル報酬のコフキムシ捕獲時は必ずパイルの実を使用（6〜7個のアメ）。\n2. メガレベル3のむしタイプ：メガスピアー、メガカイロス、メガハッサム、メガヘラクロスを発動させておくと、捕獲時アメ+2個＆アメXL確率+25%。\n3. 相棒歩行：コフキムシはわずか1.0kmでアメ1個を獲得（大喜び状態なら500mごと！）。",
                  "ru": "Для сбора всех 18 узоров требуется внушительный запас конфет:\n\n• Эволюция 1 узора: Scatterbug ➔ Spewpa (25) ➔ Vivillon (100) = 125 конфет.\n• Все 18 узоров: 18 × 125 = 2 250 конфет Scatterbug всего!\n\nКак быстрее накопить конфеты:\n1. Silver Pinap / Pinap Berry: Всегда кормите ягодой каждого Scatterbug из медали (+6 или +7 конфет).\n2. Мега-покемон 3-го уровня: Активируйте Mega Beedrill, Pinsir, Scizor или Heracross для бонуса +2 конфеты за поимку.\n3. Дистанция напарника: Scatterbug приносит конфету за каждый 1 км ходьбы (или 500 м при статусе 'Excited')."
              },
              "tips": {
                  "cs": [
                      "Scatterbug Candy je společné pro všechny vzory! Můžete chytat hojné Continental Scatterbugy v ČR a nashromážděné Candy použít na vývoj vzácného Sandstormu.",
                      "Nikdy nepoužívejte Rare Candy na Scatterbuga – díky 1 km buddy chůzi nasbíráte Candy velmi rychle zdarma."
                  ],
                  "en": [
                      "Candy is universally shared across all patterns! Farm plentiful local Continental Scatterbugs to evolve rare Sandstorm specimens.",
                      "Never spend Rare Candy on Scatterbug — walking as buddy yields 1 Candy per km, making candy accumulation virtually free."
                  ],
                  "ja": [
                      "コフキムシのアメは全模様共通です！身近な日本のみやび（Elegant）でアメを稼ぎ、海外の砂塵（Sandstorm）の進化に回せます。",
                      "ふしぎなアメを使うのはもったいないです。相棒に設定して歩けば1kmごとに無料ですぐ貯まります。"
                  ],
                  "ru": [
                      "Конфеты общие для всех узоров! Ловите местных европейских бабочек, а конфеты тратьте на редкий Sandstorm.",
                      "Не тратьте редкие конфеты (Rare Candy) — 1 км с напарником копит конфеты мгновенно."
                  ]
              }
          },
          {
              "id": "vivillon-hundo-lucky-trades",
              "pokemon": [
                  "Scatterbug",
                  "Vivillon"
              ],
              "heading": {
                  "cs": "5. Scatterbug 100% IV (204 CP Hundo) a Lucky Trade strategie",
                  "en": "5. Scatterbug 100% IV (204 CP Hundo) & Lucky Trade Strategy",
                  "ja": "5. コフキムシ100%個体値（204 CP）とキラフレンド交換戦略",
                  "ru": "5. 100% IV сотка (204 CP Hundo) и стратегия Lucky-трейдов"
              },
              "content": {
                  "cs": "Protože se Scatterbug získává výhradně jako odměna z medaile Butterfly Collector, jeho parametry mají fixní statistická pravidla:\n\n• Úroveň (Level): Vždy přesně Level 15.\n• IV Floor (minimum): 10/10/10 (min. CP je 170 CP).\n• 100% IV Hundo (15/15/15): Přesně 204 CP! Pokud má váš Scatterbug 204 CP, je to garantovaná čtyřhvězda (4★).\n\nLucky Trade strategie:\nPokud usilujete o kompletní sbírku Lucky Vivillonů (se zlatým pozadím a polovičními Stardust náklady na power-up), domluvte si Lucky Trade s lokálním hráčem, který má chyceného zahraničního Scatterbuga ze své dovolené nebo od zahraničního přítele. Regionální vzor se při trade nemění!",
                  "en": "Because Scatterbug is exclusively awarded through the Butterfly Collector medal milestone encounters, its encounter statistics are rigidly structured:\n\n• Level: Always exactly Level 15.\n• IV Floor: 10/10/10 minimum (170 CP floor).\n• 100% IV Hundo (15/15/15): Exactly 204 CP! An encounter showing 204 CP is a guaranteed 4-star trophy.\n\nLucky Trade Strategy:\nFor trainers aiming for a full set of Lucky Vivillons (with golden shiny backgrounds and 50% Stardust discount), coordinate Lucky Friend trades with local trainers holding foreign Scatterbugs from their travels or foreign gift networks. Wing patterns remain permanently unaltered upon trading!",
                  "ja": "コフキムシはコレクターメダルの達成報酬としてのみ手に入るため、捕獲ステータスが完全に固定されています：\n\n• レベル：常に レベル15 固定。\n• 個体値下限（フロア）：各ステータス10以上（最低 170 CP）。\n• 100%個体値（15/15/15）：ズバリ 204 CP！ 捕獲画面で204 CPが表示されたら確定4★（Hundo）です。\n\nキラトレードのコツ：\n金枠のキラビビヨンをコンプリートしたい場合、海外旅行帰りや海外フレンドを多く持つ地元のキラフレンドとコフキムシ同士を交換しましょう。トレード後も羽の模様は一切変わりません！",
                  "ru": "Поскольку Scatterbug появляется исключительно в награду за медаль, его параметры строго зафиксированы:\n\n• Уровень: Всегда ровно 15-й уровень.\n• Минимальные IV: 10/10/10 (минимум 170 CP).\n• 100% IV сотка (15/15/15): Ровно 204 CP! Если на экране поимки 204 CP — это гарантированная 4★ сотка.\n\nСтратегия Lucky-обменов:\nДля сбора золотых Lucky Vivillon договаривайтесь с локальными Lucky-друзьями об обмене редких заграничных Scatterbug. Узор крыльев при обмене никогда не меняется!"
              },
              "tips": {
                  "cs": [
                      "Před vývojem si Scatterbuga vždy přejmenujte podle jeho vzoru (např. 'Sandstorm 204' nebo 'Sun 98%'), abyste omylem nevyvinuli duplicitu.",
                      "Hledejte ve svém batohu pomocí vyhledávacího filtru: 'cp204&scatterbug' pro okamžité nalezení Hunda!"
                  ],
                  "en": [
                      "Rename each Scatterbug with its pattern name upon catching (e.g. 'Sandstorm 204' or 'Sun 98%') to avoid accidental duplicate evolutions.",
                      "Search your storage with 'cp204&scatterbug' to instantly highlight your perfect 100% IV specimens!"
                  ],
                  "ja": [
                      "捕獲直後に名前を模様名（例：「さじん 204」や「たいよう 98%」）に変更しておくと、重複進化を防げます。",
                      "ボックス検索で「cp204&コフキムシ」と入力すると100%個体値を一発検索できます！"
                  ],
                  "ru": [
                      "Сразу переименовывайте пойманных бабочек (например, 'Sandstorm 204' или 'Sun 98%'), чтобы не запутаться при эволюции.",
                      "Используйте фильтр 'cp204&scatterbug' для моментального поиска соток в инвентаре!"
                  ]
              }
          }
      ]
  }
,  {
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
      },
      {
      "id": "pokelid-route-planning-tips",
      "pokemon": [
            "Pikachu",
            "Lapras",
            "Slowpoke"
      ],
      "heading": {
            "cs": "4. Plánování trasy a tipy pro cestovatele v Japonsku",
            "en": "4. Route Planning & Travel Tips Across Japan",
            "ja": "4. 日本国内のポケふた巡礼ルート・効率的な集め方",
            "ru": "4. Планирование маршрута и советы путешественникам по Японии"
      },
      "content": {
            "cs": "S více než 480 poklopy Poké Lids rozmístěnými napříč 41 prefekturami vyžaduje jejich návštěva promyšlenou strategii:\n\n1. Letiště a vlaková nádraží: Řada poklopů leží přímo v dosahu velkých uzlů (např. v okolí nádraží Sendai v Mijagi pro Laprase, nebo v Takamacu pro Slowpoke v Kagawě).\n2. Půjčení auta / JR Pass: V rozlehlých prefekturách jako Hokkaidó nebo Tóhoku jsou poklopy rozesety po národních parcích a pobřežních majácích.\n3. Pravidlo 2 žlutých razítek: K získání exkluzivního Pikachu s lokační kartou dané prefektury nepotřebujete navštívit všech 30+ poklopů v kraji! Stačí otočit POUZE 2 unikátní žluté Poké Lids v dané prefektuře.",
            "en": "With over 480 official Poké Lids spread across 41 prefectures, conquering the stamp rally requires strategic planning:\n\n1. Train Hubs & Airports: Several key utility covers sit directly outside Shinkansen terminals (such as Sendai Station for Lapras or Takamatsu Station for Slowpoke in Kagawa).\n2. Rental Car vs JR Pass: In sprawling alpine prefectures like Hokkaido or Tohoku, lids are scattered across scenic roadside stations (Michi-no-Eki) and national parks.\n3. The 2-Stamp Golden Rule: To trigger the guaranteed Location Background Pikachu encounter, you do NOT need to visit all 30+ lids in a prefecture! You only need to spin 2 unique Yellow Poké Lid PokéStops in that specific region.",
            "ja": "全国41都道府県に480枚以上設置されているポケふたを効率よく巡るための旅のコツ：\n\n1. 新幹線駅・空港周辺：仙台駅周辺（ラプラス）や高松駅（ヤドン）など、主要ターミナル駅徒歩圏内に設置されているポケふたは乗り継ぎ時に即回収可能です。\n2. レンタカーの活用：北海道や東北などの広大な地域では、道の駅や国立公園に点在しているためレンタカー移動が便利です。\n3. 黄色スタンプ2個の法則：ご当地背景ピカチュウを入手するために、その県の全30枚以上を回る必要はありません！対象県内の異なる「黄色のポケふた」を2箇所回すだけで即座にリワードが出現します。",
            "ru": "Более 480 люков Poké Lids в 41 префектуре требуют продуманного плана поездки:\n\n1. Вокзалы и аэропорты: Многие люки находятся прямо у станций Синкансэн (например, вокзал Сендай для Lapras или станция Такамацу для Slowpoke).\n2. Аренда авто: В обширных регионах, таких как Хоккайдо или Тохоку, люки разбросаны по придорожным станциям и нацпаркам.\n3. Правило 2-х желтых штампов: Для получения Пикачу с фоном локации НЕ нужно обходить все 30+ люков! Достаточно покрутить ровно 2 уникальных желтых люка в этой префектуре."
      },
      "tips": {
            "cs": [
                  "Využijte naši interaktivní mapu nahoře — stačí kliknout na prefekturu a uvidíte přesné GPS souřadnice a fotografie všech poklopů!",
                  "Otočení poklopu vám do alba uloží i trvalou oficiální pohlednici (Postcard) s uměleckou kresbou poklopu."
            ],
            "en": [
                  "Use our interactive vector map above — click any prefecture to instantly inspect GPS coordinates and photos of all local lids!",
                  "Spinning a Poké Lid PokéStop also awards a permanent, beautifully illustrated official Postcard for your album."
            ],
            "ja": [
                  "当ガイド上部のインタラクティブマップをクリックすると、各ポケふたの詳細なGPS座標と写真を即座に確認できます！",
                  "ポケふたを回すと、美しいイラスト入りの公式ポストカードも手に入ります。"
            ],
            "ru": [
                  "Используйте нашу карту выше — кликайте на любую префектуру для точных GPS-координат и фотографий всех люков!",
                  "Прокрутка люка также дает красивую иллюстрированную открытку в ваш альбом."
            ]
      }
},
      {
      "id": "location-card-trading-search",
      "pokemon": [
            "Pikachu",
            "Raichu"
      ],
      "heading": {
            "cs": "5. Vyhledávací filtry, hodnota při výměnách a varování pro Pokémon HOME",
            "en": "5. Search Filters, Trading Value & Pokémon HOME Warning",
            "ja": "5. 検索コマンド、トレード価値、Pokémon HOME転送時の注意点",
            "ru": "5. Поисковые фильтры, ценность при обмене и важное о Pokémon HOME"
      },
      "content": {
            "cs": "Pozadí z Poké Lids představují jedny z nejvyhledávanějších trofejí mezi mezinárodními sběrateli:\n\n• Vyhledávací příkaz: Zadejte do vyhledávání v batohu 'locationbackground' pro zobrazení všech Pokémonů s lokační kartou.\n• Zachování při výměně: Lokační karta Pikachu ZŮSTÁVÁ 100% ZACHOVÁNA i po výměně (Special Trade) a při evoluci v Raichu!\n• ⚠️ Pozor na Pokémon HOME: Pokud Pokémona s lokační kartou převedete do Pokémon HOME, jeho unikátní pozadí bude NENÁVRATNĚ SMAZÁNO! Lokační karty a speciální pozadí existují výhradně uvnitř aplikace Pokémon GO.",
            "en": "Poké Lid Location Cards rank among the highest-demand trophies in the global Pokémon GO trading community:\n\n• Native Search String: Type 'locationbackground' into your Pokémon storage search bar to filter all specimens with commemorative cards.\n• Trade Permanence: Location Cards are 100% preserved through Special Trades with friends and upon evolving into Raichu!\n• ⚠️ Critical Pokémon HOME Warning: Transferring any Pokémon with a Location Card into Pokémon HOME permanently WIPES the background forever! Special backgrounds exist exclusively within the Pokémon GO engine.",
            "ja": "ポケふたロケーション背景ピカチュウは、世界中のトレーナーの間で最も価値の高いコレクターズアイテムの一つです：\n\n• 公式検索コマンド：ボックスで「locationbackground」と入力すると、全国のロケーションカード所持ポケモンを一発抽出できます。\n• トレードでの永続性：フレンドと特別な交換（Special Trade）を行っても、ライチュウへ進化させても、背景は100%完全に維持されます！\n• ⚠️ Pokémon HOME転送の重大な注意：ロケーションカード付きポケモンを「Pokémon HOME」へ送ると、背景が永久に消滅します！背景システムはポケモンGOアプリ内限定の機能です。",
            "ru": "Фоны локаций Poké Lid — одни из самых желанных трофеев среди коллекционеров по всему миру:\n\n• Поисковый запрос: Введите 'locationbackground' в поиске для отображения всех покемонов с карточками локаций.\n• Сохранение при обмене: Фон сохраняется на 100% при специальном обмене и при эволюции в Райчу!\n• ⚠️ Предупреждение о Pokémon HOME: Перевод покемона с карточкой локации в Pokémon HOME навсегда СТИРАЕТ фон! Фоны существуют исключительно внутри Pokémon GO."
      },
      "tips": {
            "cs": [
                  "Máte v batohu Pikachu z Japonska? Označte si ho hvězdičkou a vyhledejte lokální hráče pro výměnu za jiná vzácná pozadí!",
                  "Nezapomeňte: 'locationbackground' najde jak karty Poké Lids, tak městské karty z akcí GO Fest (Sendai, Madrid, New York)."
            ],
            "en": [
                  "Holding an extra Japanese Poké Lid Pikachu? Favorite it and find local trainers looking to swap for GO Fest city cards!",
                  "Remember: 'locationbackground' filters both Poké Lid cards and in-person GO Fest city cards (Sendai, Madrid, New York)."
            ],
            "ja": [
                  "日本のポケふたピカチュウをお持ちの方は、お気に入りに登録して海外のGO Fest都市カードとの交換用に活用しましょう！",
                  "「locationbackground」はポケふた背景と、海外GO Fest（マドリード、ニューヨーク等）の都市カードを両方抽出できます。"
            ],
            "ru": [
                  "Поймали лишнего японского Пикачу? Сохраните его для выгодного обмена на городские фоны с GO Fest!",
                  "Фильтр 'locationbackground' находит как карточки Poké Lid, так и городские карты фестивалей GO Fest."
            ]
      }
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
    "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png",
    "featured": false,
    "author": "PoGo Events Team",
    "readTime": "9 min",
    "updatedAt": "2026-10-31",
    "category": {
      "cs": "Divočina & Maskování",
      "en": "Wild & Disguises",
      "ja": "野生と変身",
      "ru": "Дикая природа и маскировка"
    },
    "title": {
      "cs": "Ditto v Pokémon GO: Aktuální masky, kruhový paradox BCR a pravidla pro Shiny",
      "en": "Ditto in Pokémon GO: Current Disguises, BCR Ring Tell & Shiny Mechanics",
      "ja": "メタモン完全攻略：最新擬態リスト・捕獲サークルの見分け方・色違いの絶対法則",
      "ru": "Дитто в Pokémon GO: Актуальные маскировки, парадокс BCR и правила Шайни"
    },
    "subtitle": {
      "cs": "Kompletní rozbor maskovacího enginu, jak odhalit Ditta před hodem podle BCR 16 %, pravidlo 'Shiny disguise = nikdy Ditto' a bojová transformace v Gymech.",
      "en": "Full disguise mechanics breakdown, identifying Dittos pre-throw via the 16% BCR tell, the 'Shiny Disguise = Never Ditto' law, and Gym combat transforms.",
      "ja": "擬態エンジンの仕様、16%の基礎捕獲率（BCR）による事前判別法、「擬態が色違いならメタモンではない」絶対法則、ジムバトルでの変身仕様。",
      "ru": "Полный разбор маскировок, вычисление Дитто до броска по кольцу BCR 16%, закон 'Шайни маскировка = не Дитто' и трансформация в гимах."
    },
    "sections": [
      {
        "id": "ditto-mechanics",
        "pokemon": [
          "Ditto",
          "Oddish",
          "Koffing",
          "Bidoof"
        ],
        "heading": {
          "cs": "1. Jak funguje mechanika přestrojení a kruhový paradox (BCR 16 %)",
          "en": "1. Disguise Engine & The Catch Ring Paradox (16% BCR Tell)",
          "ja": "1. 擬態システムと捕獲サークルの色変化（BCR 16%の法則）",
          "ru": "1. Механика маскировки и парадокс кольца поимки (BCR 16%)"
        },
        "content": {
          "cs": "Ditto se v divočině NIKDY neukazuje ve své pravé podobě. Vždy se maskuje za konkrétní běžné druhy Pokémonů (tzv. Disguise Pool), které se pravidelně mění se sezónami.\n\nKlíčový trik pro odhalení Ditta PŘED hodem míčku (Kruhový paradox):\n• Každý Pokémon má základní šanci na odchyt (Base Catch Rate — BCR). Například běžný Oddish, Koffing nebo Bidoof má BCR 50 % až 60 %, což se projevuje zářivě zeleným záchytným kruhem.\n• Pokud je však daný Pokémon ve skutečnosti zamaskovaný Ditto, hra aplikuje DITTŮV základní Base Catch Rate, který činí pouhých 16 %!\n• Důsledek: Pokud narazíte na slabého Pokémona s nízkým CP (např. Bidoof s 120 CP), ale jeho záchytný kruh s běžným Poké Ballem je podezřele tmavě oranžový nebo dokonce červený namísto zeleného — máte 100% jistotu, že jde o Ditta! Použijte Ultra Ball a Razz Berry, aby vám neutekl.",
          "en": "Ditto NEVER appears in its genuine gelatinous form on the wild overworld map. It masquerades exclusively as common species belonging to a rotating seasonal Disguise Pool.\n\nThe Definitive Pre-Throw Tell (The Catch Ring Paradox):\n• Every wild species possesses a Base Catch Rate (BCR). Common species like Oddish, Koffing, or Bidoof feature a generous BCR of 50% to 60%, resulting in a friendly bright green targeting reticle.\n• However, when that encounter secretly conceals a Ditto, the game calculates difficulty using DITTO'S own native Base Catch Rate: a punishing 16%!\n• The Tell: If you encounter a low-CP Pokémon (e.g. a 150 CP Bidoof) that stubbornly displays a dark orange or red catch ring with a standard Poké Ball, you are confronting a disguised Ditto! Switch to an Ultra Ball and feed a Razz Berry to prevent a runaway.",
          "ja": "メタモンはマップ上に直接その姿を現すことは絶対にありません。シーズンごとに指定された一般ポケモンのリスト（擬態プール）の姿を借りて野生に出現します。\n\nボールを投げる前にメタモンを見抜くプロの技（捕獲サークルのパラドックス）：\n• ポケモンにはそれぞれ基礎捕獲率（Base Catch Rate＝BCR）が設定されています。ナゾノクサ、ドガース、ビッパなどの一般的な擬態対象はBCRが50%〜60%と高く、緑色のサークルが表示されます。\n• しかし、そのポケモンがメタモンの擬態であった場合、ゲームは対象ポケモンのBCRではなく「メタモン自身のBCR＝わずか16%」を適用して計算します！\n• 見分け方：CPが極めて低い個体（例：CP150のビッパ）にもかかわらず、通常のモンスターボールを構えた時にサークルが不自然に「濃いオレンジ色」や「赤色」になっている場合、中身はほぼ100%メタモンです！ハイパーボールとズリのみを使って確実に捕獲しましょう。",
          "ru": "Дитто НИКОГДА не появляется на карте в своем истинном облике. Он маскируется под конкретные виды покемонов из ротируемого сезонного списка.\n\nКак вычислить Дитто ДО броска (Парадокс кольца поимки):\n• У каждого покемона есть базовый шанс поимки (BCR). У обычных Oddish, Koffing или Bidoof BCR составляет 50–60%, поэтому круг поимки ярко-зеленый.\n• Но если под видом покемона прячется Дитто, игра рассчитывает шанс по базовой ставке САМОГО ДИТТО — всего 16%!\n• Главный признак: Если у слабого покемона с низким CP круг поимки с обычным покеболом подозрительно темно-оранжевый или красный — перед вами Дитто! Кидайте Ultra Ball и кормите Razz Berry."
        },
        "tips": {
          "cs": [
            "Podezřelý oranžový kruh u běžného Pokémona s nízkým CP je spolehlivým indikátorem Ditta.",
            "Po úspěšném odchytu se animace 'Gotcha!' změní na 'Oh?' a Pokémon se promění ve fialového (nebo modrého) Ditta.",
            "Všechny přestrojené druhy můžete v batohu filtrovat najednou zadáním jejich jmen oddělených čárkou."
          ],
          "en": [
            "A suspicious dark orange ring on an otherwise trivial low-CP wild spawn is the hallmark indicator of Ditto.",
            "Upon capture, the standard 'Gotcha!' victory message transitions into 'Oh?' before unveiling Ditto.",
            "Filter all active disguise candidates simultaneously by searching their names separated by commas."
          ],
          "ja": [
            "低CPの雑魚ポケモンなのにサークルがオレンジや赤色なら、ほぼ間違いなくメタモンです。",
            "捕獲成功時に「やったー！」ではなく「おや？」のテキストが表示され、変身演出に入ります。",
            "ボックスで擬態ポケモンの名前をカンマ区切りで入力すると、対象ポケモンを一括検索できます。"
          ],
          "ru": [
            "Темно-оранжевый круг на слабом покемоне — верный признак спрятанного Дитто.",
            "После поимки вместо обычной надписи 'Gotcha!' появится 'Oh?', и начнется трансформация.",
            "Имена всех маскировок можно вводить через запятую для массового поиска."
          ]
        }
      },
      {
        "id": "shiny-ditto-rules",
        "pokemon": [
          "Ditto",
          "Spinarak",
          "Numel",
          "Goldeen"
        ],
        "heading": {
          "cs": "2. Zlaté pravidlo Shiny Ditta: Proč třpytivá maska nikdy není Ditto",
          "en": "2. The Shiny Ditto Law: Why a Shiny Disguise Is Never Ditto",
          "ja": "2. 色違いメタモンの絶対法則：擬態が色違いなら絶対にメタモンではない理由",
          "ru": "2. Закон Шайни Дитто: Почему блестящая маска никогда не Дитто"
        },
        "content": {
          "cs": "Kolem třpytivé modré Shiny formy Ditta koluje mnoho mýtů. Niantic však nastavil jedno absolutní, matematicky pevné pravidlo:\n\n• Zlaté pravidlo: Pokud divoký Pokémon na mapě září jako Shiny ve své přestrojené formě (např. chytíte třpytivého zeleného Oddishe nebo třpytivého Spinaraka), NIKDY se z něj po chycení nestane Ditto!\n• Důvod: Vývojáři tímto chrání hráče před zklamáním, kdyby se jejich vysněný Shiny Oddish proměnil v běžného Ditta.\n• Jak tedy získat Shiny Ditta: Ditto se může proměnit v zářivě modrého Shiny Ditta VÝHRADNĚ z běžného, netřpytivého pokémona na mapě. Teprve po chycení obyčejného Pokémona proběhne na serveru losování (šance cca 1 z 64), zda pod maskou leží modrý Shiny Ditto!",
          "en": "Enduring myths surround the striking azure-blue Shiny Ditto. However, Niantic's server logic enforces one non-negotiable rule:\n\n• The Golden Rule: If a wild encounter sparkles as a Shiny variant of the disguise species (e.g. you encounter a shiny green Oddish or shiny Spinarak), it can NEVER transform into Ditto!\n• The Rationale: This safeguards trainers from the disappointment of losing a coveted shiny dex entry to an accidental Ditto conversion.\n• How to Acquire Shiny Ditto: A brilliant blue Shiny Ditto triggers EXCLUSIVELY from ordinary, non-shiny disguises. After catching a normal wild disguise, the server rolls a ~1 in 64 permanent probability to determine if the concealed Ditto emerges as Shiny!",
          "ja": "鮮やかなスカイブルーに輝く「色違いメタモン」には、Nianticのサーバー仕様に基づく絶対的な鉄則が存在します：\n\n• 絶対の黄金ルール：遭遇した擬態ポケモン自身が色違い（例：色違いのナゾノクサや色違いのイトマル）であった場合、捕獲しても絶対にメタモンには変身しません！\n• 理由：狙っていた色違いポケモンが捕獲後にメタモンに化けて消滅するという、プレイヤーの落胆事故を防ぐための救済措置です。\n• 色違いメタモンの入手ルート：色違いメタモンは【通常色の擬態ポケモン】からのみ変身します。通常色の擬態ポケモンを捕獲した瞬間に、サーバー側で約1/64の確率で色違いメタモンへの変身抽選が行われます！",
          "ru": "Вокруг ярко-синего Shiny Дитто ходит множество мифов. Но в коде игры заложено строгое правило:\n\n• Золотое правило: Если дикий покемон на карте УЖЕ блестит как Shiny (например, зеленый Oddish), он НИКОГДА не превратится в Дитто!\n• Причина: Разработчики защитили игроков от разочарования, чтобы пойманный редкий шайни не пропал из-за превращения в Дитто.\n• Как получить Shiny Дитто: Шайни Дитто выпадает ИСКЛЮЧИТЕЛЬНО из обычного покемона без блесток. После поимки сервер рассчитывает шанс (примерно 1 из 64) на то, что Дитто окажется синим Shiny!"
        },
        "tips": {
          "cs": [
            "Shiny Ditto má trvalou zvýšenou šanci (Permaboost) přibližně 1 z 64 odchytů Ditta.",
            "Nikdy neignorujte běžné netřpytivé masky — právě z nich padá modrý Shiny Ditto!",
            "Shiny Ditta můžete vyhledat v batohu příkazem 'ditto & shiny'."
          ],
          "en": [
            "Shiny Ditto enjoys a permanently boosted (permaboosted) shiny rate of roughly 1 in 64 transformations.",
            "Never bypass ordinary non-shiny disguises — they are the exclusive source of shiny blue Dittos!",
            "Inspect all your blue treasures with the query 'ditto & shiny'."
          ],
          "ja": [
            "色違いメタモンの変身確率は約1/64と、常時ブースト（パーマブースト）枠に設定されています。",
            "通常色の擬態ポケモンを見かけたら、色違いメタモンの抽選を受けるため積極的に捕獲しましょう！",
            "ボックスで「ditto & 色違い」（ditto & shiny）と入力すると色違いメタモンを抽出できます。"
          ],
          "ru": [
            "У Shiny Дитто постоянный повышенный шанс (permaboost) около 1 из 64 поимок Дитто.",
            "Всегда ловите обычные маски — синий Дитто выпадает только из них!",
            "Фильтр для поиска в хранилище: 'ditto & shiny'."
          ]
        }
      },
      {
        "id": "weather-boost-mechanics",
        "pokemon": [
          "Ditto",
          "Bergmite",
          "Stufful",
          "Roggenrola"
        ],
        "heading": {
          "cs": "3. Weather Boost anomálie: Jak počasí prozradí Ditta",
          "en": "3. Weather Boost Anomalies: How Weather Exposes Disguises",
          "ja": "3. 天候ブーストの矛盾：天候不一致でメタモンを暴く方法",
          "ru": "3. Аномалии Weather Boost: Как погода разоблачает Дитто"
        },
        "content": {
          "cs": "Ditto je čistý Normal typ. Tato vlastnost vytváří fascinující herní situace související s Weather Boostem (Počasím):\n\n1. Částečně zataženo (Partly Cloudy):\n• V tomto počasí je Ditto posilován Weather Boostem. Pokud chytíte zamaskovaného Ditta, bude mít Level 31 až 35 s garantovanou IV podlahou 4/4/4 a bonusem +25 % Stardustu!\n\n2. Meteorologická anomálie:\n• Představte si, že je venku Slunečno (Sunny — posiluje Grass/Fire/Ground). Narazíte na Bergmita (Ice typ, který v Sunny posilován NENÍ). Přesto kolem Bergmita rotuje animace Weather Boostu a má Level nad 30! Jak je to možné? Hra ví, že je to ve skutečnosti Ditto posílený svým počasím (nebo naopak, pokud se počasí právě změnilo v celou hodinu)!",
          "en": "Ditto is a pure Normal-type Pokémon. This singular typing creates revealing mechanical anomalies under the in-game Weather Boost system:\n\n1. Partly Cloudy Synergy:\n• Partly Cloudy weather boosts Normal types, directly buffing Ditto. Disguised Dittos captured in Partly Cloudy will boast boosted levels (Level 31 to 35), guaranteed 4/4/4 IV floors, and +25% bonus Stardust!\n\n2. The Weather Boost Clue:\n• Weather boost visual swirls around a spawn strictly reflect the underlying species. If an Ice-type Bergmite spawns in Sunny weather without its Ice boost, yet displays uncharacteristic weather rings or elevated Level 31+ stats from a server-side weather shift, it is an unmistakable sign of Ditto!",
          "ja": "メタモンは単ノーマルタイプです。この仕様は天候ブースト（ウェザーブースト）において決定的な手がかりを生み出します：\n\n1. 「時々曇り（Partly Cloudy）」の恩恵：\n• ノーマルタイプがブーストされる時々曇りの天候では、メタモンもブースト対象となります。この時に捕獲したメタモンはPL31〜35の高レベルとなり、個体値4/4/4保証とほしのすな+25%ボーナスが得られます。\n\n2. 天候不一致の異常現象：\n• 通常、晴天時（ほのお・くさ・じめん）にカチコール（こおりタイプ）が出現しても天候ブーストはかかりません。しかし、もし天候の切り替わり直後などに本来ブーストされないはずのポケモンが高レベルで出現している場合、内部的にノーマルタイプのメタモンとしてブースト判定されている強力なサインとなります！",
          "ru": "Дитто — чистый покемон Normal типа. Это создает интересные аномалии с Weather Boost:\n\n1. Погода Partly Cloudy (Переменная облачность):\n• Усиливает Normal тип. Дитто получает уровни 31–35, гарантированный IV от 4/4/4 и +25% пыли!\n\n2. Аномалия несоответствия:\n• Если на улице солнечно (Sunny), а вокруг ледяного Bergmite крутятся вихри погодного буста — игра обсчитывает его как спрятанного Normal покемона Дитто!"
        },
        "tips": {
          "cs": [
            "Během Partly Cloudy (Částečně zataženo) je Ditto na svém maximálním Levelu 35 s vyšším CP.",
            "Získaný bonusový Stardust z Weather Boostu činí 125 namísto 100 Stardustu.",
            "Pokud hledáte 100% IV Hundo Ditta, počasí Partly Cloudy zvyšuje šanci z 1:4096 na 1:1728!"
          ],
          "en": [
            "During Partly Cloudy weather, wild Dittos can reach up to Level 35 with substantial CP.",
            "Weather-boosted captures grant 125 Stardust instead of the standard 100.",
            "Hunting a 100% IV Hundo Ditto is far more likely in Partly Cloudy (1 in 1,728 vs 1 in 4,096)."
          ],
          "ja": [
            "「時々曇り」の天候下では、野生メタモンの最大レベルがPL35まで引き上げられます。",
            "天候ブースト時の捕獲砂は100から125に増加します。",
            "100%個体値（Hundo）のメタモンを狙う場合、時々曇りの天候下では確率が1/4096から1/1728に向上します！"
          ],
          "ru": [
            "В погоду Partly Cloudy дикий Дитто спавнится до 35 уровня.",
            "Погодный буст дает 125 пыли вместо 100.",
            "Шанс поймать 100% Hundo Дитто в Partly Cloudy возрастает до 1 из 1,728 (вместо 1 из 4,096)."
          ]
        }
      },
      {
        "id": "gym-and-pvp-transform-mechanics",
        "pokemon": [
          "Ditto",
          "Mewtwo",
          "Rayquaza",
          "Blissey"
        ],
        "heading": {
          "cs": "4. Bojová transformace v Gymech a PvP: Jak Ditto kopíruje protivníka",
          "en": "4. Combat Transform Mechanics: How Ditto Mirrors Opponents in Battle",
          "ja": "4. ジム＆対戦での変身メカニクス：相手のステータスと技の完全模倣",
          "ru": "4. Механика боя в Гимах и PvP: Копирование характеристик противника"
        },
        "content": {
          "cs": "Ditto v boji disponuje jediným rychlým útokem: Transform (Proměna):\n\n1. Co Ditto zkopíruje:\n• Okamžitě se promění ve věrnou kopii protivníka, který stojí proti němu v Gymu nebo PvP.\n• Zkopíruje základní statistiky Attack a Defense druhu, jeho typování a oba jeho útoky (Fast i Charged Move)!\n\n2. Co Ditto NEZKOPÍRUJE (Zůstává Dittovo):\n• HP (Stamina) zůstává výhradně Dittova! Protože má Ditto přirozeně velmi nízkou základní Staminu (pouhých 96), i když se promění v obřího Blisseyho nebo Mewtwo, bude mít stále žalostně málo životů.\n• Level Pokémona a IV statistiky zůstávají Dittovy vlastní.\n\nZ tohoto důvodu je Ditto skvělý pro zábavné souboje a Gymy, ale v kompetitivním PvP Great nebo Master League se kvůli nízkému HP nedokáže vyrovnat skutečným meta tankům.",
          "en": "Ditto enters battle armed with a solitary fast attack: Transform:\n\n1. What Ditto Copies:\n• Ditto instantly shifts into an exact duplicate of the opposing Pokémon.\n• It mimics the opponent's species Base Attack, Base Defense, elemental typing, and entire move pool (Fast & Charged Moves)!\n\n2. What Ditto Retains (Does NOT Copy):\n• HP / Stamina remains strictly Ditto's native value! Because Ditto has a frail base Stamina of only 96, even when transforming into a titanic Blissey or Mewtwo, it possesses only a tiny sliver of health.\n• The Pokémon's Level and IV stats remain Ditto's own.\n\nWhile this creates thrilling mirror matchups in Gym battles, Ditto's tiny HP pool severely limits its viability in high-rank GO Battle League play.",
          "ja": "メタモンは戦闘において、通常技「へんしん（Transform）」のみを覚えています：\n\n1. メタモンがコピーする要素：\n• 戦闘開始と同時に、対面した相手ポケモンの姿へ即座に変身します。\n• 相手の種族値（攻撃・防御）、タイプ、そして通常技・ゲージ技の両方を完全にコピーします！\n\n2. コピーされないメタモン自身の要素：\n• HP（スタミナ）はメタモン自身の数値が維持されます！メタモンの種族HPは「96」と極めて低いため、たとえハピナスやミュウツーに変身しても、本物のような膨大なHPプールは得られません。\n• レベル（PL）と個体値（IV）もメタモン自身のものが適用されます。\n\nこの仕様のため、ジムバトルやレイドでのネタ運用としては非常に盛り上がりますが、HPの低さからGOバトルリーグ（対戦）のガチ環境で活躍するのは困難です。",
          "ru": "В бою у Дитто есть только одна быстрая атака: Transform (Трансформация):\n\n1. Что копирует Дитто:\n• Мгновенно принимает облик покемона соперника.\n• Копирует базовую Атаку, Защиту, типы и все приемы (Fast и Charged Moves) соперника!\n\n2. Что НЕ копируется (остается своим):\n• Показатель HP (Stamina) остается собственным значением Дитто! Так как базовая стамина Дитто всего 96, даже превратившись в Blissey или Mewtwo, он останется с крошечным запасом здоровья.\n• Уровень (Level) и показатели IV остаются своими собственными."
        },
        "tips": {
          "cs": [
            "V Gymech je Ditto skvělý obránce na trollení útočníků — okamžitě se promění v draka či legendu, s níž na něj útočí!",
            "V Raidech Ditto po proměně v raid bosse nezíská astronomické HP bosse, pouze jeho útoky a staty na vašem levelu.",
            "Při proměně v Gymu získá Ditto plný počet nábojů pro Charged Move."
          ],
          "en": [
            "In Gym defense, Ditto is a hilarious surprise — immediately shifting into whatever titan your opponent attacks with!",
            "In Raids, Ditto mirrors the boss's moves and attack power, but will not inherit the boss's artificial 15,000 HP pool.",
            "Transforming in gyms instantly primes Ditto's charged energy."
          ],
          "ja": [
            "ジム防衛にメタモンを置くと、挑んできた相手の最強アタッカーの姿にいきなり変身するため面白い防衛ができます。",
            "レイドバトルでボスに変身した場合、ボスの攻撃力や技はコピーしますが、ボスの規格外HP（15,000等）はコピーされません。",
            "変身と同時にエネルギーがチャージされ、即座に技を撃ち合えます。"
          ],
          "ru": [
            "В защите гимов Дитто весело троллит противников, копируя их же топовых легенд!",
            "В рейдах Дитто копирует атаки босса, но не получает его запас в 15 000 HP."
          ]
        }
      },
      {
        "id": "hunting-strategies-and-strings",
        "pokemon": [
          "Ditto",
          "Grimer",
          "Drowzee",
          "Remoraid"
        ],
        "heading": {
          "cs": "5. Komunitní strategie lovu a Level 30+ spawn parita",
          "en": "5. Hunting Tactics, Discord Callouts & Level 30+ Spawn Parity",
          "ja": "5. 効率的な探索ルートとTL30以上での「同一湧き」仕様",
          "ru": "5. Тактика поиска в сообществах и правило TL 30+"
        },
        "content": {
          "cs": "Pokud plníte Special Research úkoly 'Chyť Ditta' (např. pro získání Mew nebo Melmetana), využijte následující komunitní mechaniky:\n\n1. Parita spawnů pro trenéry nad Level 30:\n• Pokud jakýkoliv hráč s Trainer Level 30+ chytí v divočině Ditta, TENTÝŽ divoký spawn je garantovaným Dittem pro VŠECHNY ostatní hráče s levelem 30 a výše na celém světě!\n• Spawn má stejné IV, stejné CP i stejné přestrojení. Zůstává na mapě obvykle 15 až 30 minut před zmizením.\n\n2. Lokální Campfire a Discord skupiny:\n• Místní komunity mívají vyhrazený kanál '#ditto-sightings'. Jakmile někdo ve městě nahlásí souřadnice nebo PokéStop, stačí se na místo dopravit a Pokémona chytit.\n\n3. Autocatchery (Pokémon GO Plus+ / Gotcha):\n• Autocatchery házejí standardní červené Poké Bally. Vzhledem k 16% BCR Ditta je šance na chycení přes autocatcher pouze cca 35–40 %. Pokud aktivně lovíte Ditta na quest, házejte vždy ručně s Ultra Ballem!",
          "en": "If you are progressing through Special Research quests requiring you to 'Catch a Ditto' (such as the Mythical Discovery line for Mew), leverage these community mechanics:\n\n1. Level 30+ Universal Spawn Parity:\n• If any trainer at Trainer Level 30 or higher encounters a wild spawn that transforms into Ditto, that IDENTICAL spawn is guaranteed to be a Ditto for EVERY other Level 30+ trainer!\n• It shares identical IVs, identical CP, and identical disguise species, lingering on the map for standard 15 to 30-minute despawn timers.\n\n2. Local Campfire & Community Alerts:\n• Active communities maintain dedicated '#ditto-sightings' channels. Simply head to the reported PokéStop to claim your guaranteed research completion.\n\n3. Autocatcher Pitfalls (GO Plus+ / Gotcha):\n• Autocatching accessories throw flat standard Poké Balls without curve multipliers. Given Ditto's low 16% BCR, auto-catch success sits at only ~35%. When on an active Ditto quest, always catch candidate disguises manually with Ultra Balls!",
          "ja": "ミュウ獲得のためのスペシャルリサーチ「メタモンを1匹捕まえる」などのタスクを進める際は、以下のコミュニティ仕様を活用するのが最短ルートです：\n\n1. トレーナーレベル30以上の「完全同一湧き」ルール：\n• TL30以上のプレイヤーが捕獲してメタモンだったポケモンは、同じ場所にいる他のTL30以上の全プレイヤーにとっても【100%確実にメタモン】になります！\n• 個体値（IV）、CP、変身前の姿も完全に同一で、出現から15〜30分間はその場に留まります。\n\n2. Campfire＆コミュニティ共有：\n• 地元のDiscordやCampfireの「メタモン目撃情報」チャンネルを活用しましょう。フレンドの報告したポケストップへ直行するのが最も確実です。\n\n3. オートキャッチャー（GO Plus+等）の注意点：\n• 自動捕獲デバイスは通常の赤ボールをカーブなしで1球しか投げません。メタモンのBCRが16%と低いため、自動捕獲の成功率は35%程度まで落ちてしまいます。メタモンタスク進行中は、擬態ポケモンを手動でハイパーボールを使って捕まえましょう！",
          "ru": "Если вы выполняете квест 'Поймай Дитто' (для получения Mew), используйте эти механики:\n\n1. Правило равенства для TL 30+:\n• Если игрок с уровнем 30+ поймал Дитто, этот спавн гарантированно будет Дитто для ВСЕХ игроков 30 уровня и выше!\n• У него будут те же IV, CP и маска. Покемон живет на карте 15–30 минут.\n\n2. Группы в Campfire и Discord:\n• Вступайте в каналы 'ditto-sightings' вашего города — просто приезжайте по координатам за готовым Дитто.\n\n3. Опасность автокликкеров (Go Plus+):\n• Автокликер кидает обычный красный шар без крученого броска. Из-за шанса 16% Дитто сбегает в 65% случаев. Ловите маски вручную с Ultra Ball!"
        },
        "tips": {
          "cs": [
            "Spawny Ditta trvají na mapě 15 až 30 minut, než přirozeně zmizí (despawn).",
            "Pokud splníte úkol 'Catch a Ditto', odemknete klíčové kroky pro získání mýtického Mew.",
            "K vyhledání všech vašich ulovených Dittů zadejte do filtru jednoduše 'ditto'."
          ],
          "en": [
            "Wild Ditto spawns persist on the map for 15 to 30 minutes before despawning.",
            "Catching a Ditto satisfies the critical stage in the 'A Mythical Discovery' Mew quest line.",
            "Review your entire gelatinous collection anytime by searching 'ditto'."
          ],
          "ja": [
            "野生のメタモンの消滅時間（デスポーン）は通常15分〜30分です。",
            "メタモン捕獲はミュウのスペシャルリサーチにおける最大の難所をクリアする鍵です。",
            "手持ちのメタモンを一覧表示するにはボックスで「ditto」または「メタモン」と検索してください。"
          ],
          "ru": [
            "Спавны Дитто живут на карте от 15 до 30 минут.",
            "Поимка Дитто закрывает сложнейший этап квеста на Mew.",
            "Для просмотра всех пойманных Дитто введите в поиске 'ditto'."
          ]
        }
      }
    ]
  },
  {
    "id": "egg-hatching-guide",
    "slug": "egg-hatching-guide",
    "iconName": "Clock",
    "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/757.png",
    "featured": false,
    "author": "PoGo Events Team",
    "readTime": "10 min",
    "updatedAt": "2026-10-31",
    "category": {
      "cs": "Líhnutí & Inkubátory",
      "en": "Hatching & Incubators",
      "ja": "タマゴ孵化＆距離短縮",
      "ru": "Высиживание яиц"
    },
    "title": {
      "cs": "Líhnutí vajec v Pokémon GO: Aktuální 2km až 12km vejce, Super Inkubátory a Salandit",
      "en": "Egg Hatching in Pokémon GO: 2km to 12km Pools, Super Incubator Math & Salandit Chase",
      "ja": "タマゴ孵化完全攻略：2km〜12km最新一覧・スーパーふかそうち倍率・ヤトウモリ厳選",
      "ru": "Высиживание яиц в Pokémon GO: База 2-12 км яиц, супер-инкубаторы и охота на Salandit"
    },
    "subtitle": {
      "cs": "Kompletní rozbor kategorií 2km až 12km vajec, efektivita Super Inkubátorů, pondělní Adventure Sync trik na 24 000 Stardustu a 12,5% šance na samici Salandita.",
      "en": "Exhaustive guide to 2km–12km egg pools, Super Incubator speedup multipliers, the Monday 9 AM 24,000 Stardust trick, and the 12.5% Female Salandit chase.",
      "ja": "2km〜12kmタマゴの全中身、スーパーふかそうちの距離短縮仕様、月曜朝9時の24,000砂獲得裏技、メス率わずか12.5%のヤトウモリ厳選法。",
      "ru": "Полный разбор пулов 2-12 км яиц, математика супер-инкубаторов, трик понедельника на 24 000 пыли и погоня за самкой Salandit (12.5%)."
    },
    "sections": [
      {
        "id": "egg-categories-and-sources",
        "pokemon": [
          "Frigibax",
          "Larvitar",
          "Bagon",
          "Deino"
        ],
        "heading": {
          "cs": "1. Přehled kategorií vajec a správa bonusového 3-slotového úložiště",
          "en": "1. Egg Classifications & Bonus 3-Slot Inventory Management",
          "ja": "1. タマゴの全カテゴリ分類とボーナス3枠の活用術",
          "ru": "1. Классификация яиц и управление 3 бонусными слотами"
        },
        "content": {
          "cs": "Líhnutí vajec garantuje vysokou kvalitu: každý vylíhnutý Pokémon přichází na Levelu 20 s přísnou IV podlahou 10/10/10 (minimálně 66,7 % IV, šance na 100% Hundo je 1 z 216).\n\nKategorie vajec v Pokémon GO:\n• 2km Vejce (Zelené): Běžní startéři a baby Pokémoni. Líhněte výhradně v bezplatném nekonečném oranžovém inkubátoru!\n• 5km Vejce (Žluté): Běžný drop z PokéStopů a Gymů s regionálními druhy.\n• 7km Vejce (Růžové): Padají výhradně z dárků od přátel. Obsahují Alolan a Galarian formy nebo eventové kostýmové Pokémony.\n• 10km Vejce (Fialové): Velmi vzácní pseudolegendární draci (Frigibax, Larvitar, Dreepy, Jangmo-o).\n• 12km Strange Vejce (Červené): Získávají se poražením lídrů Team GO Rocket (Cliff, Sierra, Arlo).\n• Adventure Sync Vejce (5km & 10km): Pondělní ranní odměna v 9:00 za 25 km nebo 50 km.\n\nBonusové úložiště (Bonus Storage):\nVe spodní části inventáře vajec máte 3 speciální bonusové sloty. Tyto sloty jsou vyhrazeny VÝHRADNĚ pro 12km červená vejce od lídrů Rakeťáků a týdenní Adventure Sync vejce, takže vám běžná 2km/5km vejce z PokéStopů nezablokují zisk vzácných odměn!",
          "en": "Egg hatching guarantees premium floor quality: every hatched specimen arrives at Level 20 with an immutable 10/10/10 IV floor (at least 66.7% IV, with a 1 in 216 chance for a perfect 4★ Hundo).\n\nEgg Classifications:\n• 2km Eggs (Green): Starters and baby Pokémon. Hatch exclusively using your permanent free orange incubator!\n• 5km Eggs (Yellow): Standard PokéStop yield featuring mid-tier species and regional variants.\n• 7km Eggs (Pink): Sourced exclusively from friend Gifts. House Alolan and Galarian regional variants.\n• 10km Eggs (Purple): Premium pool housing pseudo-legendary titans (Frigibax, Larvitar, Dreepy, Jangmo-o).\n• 12km Strange Eggs (Red): Dropped exclusively by Team GO Rocket Leaders (Cliff, Sierra, Arlo).\n• Adventure Sync Eggs (5km & 10km): Dispatched every Monday at 9:00 AM for clearing 25km or 50km goals.\n\nThe 3-Slot Bonus Inventory Partition:\nAt the bottom of your egg storage sits a dedicated 3-slot overflow tray. This reserve is strictly designated for 12km Strange Eggs and Monday Adventure Sync rewards, preventing ordinary PokéStop eggs from cannibalizing precious slots!",
          "ja": "タマゴから生まれるポケモンはすべて「レベル20・個体値10/10/10以上（最低66.7%）」が保証されており、1/216の確率で100%個体値（Hundo）が出現します。\n\nタマゴの全カテゴリ：\n• 2kmタマゴ（緑）：御三家やベイビィポケモン。無料の無限ふかそうちのみで割りましょう！\n• 5kmタマゴ（黄）：ポケストップから入手する中級レアや地域限定種。\n• 7kmタマゴ（ピンク）：フレンドのギフト開封限定。アローラ・ガラルの姿などが出現。\n• 10kmタマゴ（紫）：セビエ、ヨーギラス、ドラメシヤ、ジャラコなどの600族ドラゴン。\n• 12kmタマゴ（赤）：ロケット団リーダー（クリフ/シエラ/アルロ）撃破報酬。\n• 週間タマゴ：月曜朝9時に週間歩行25km/50km達成で付与。\n\nボーナス枠3枠の活用：\nタマゴ画面の下部にある3つのボーナス枠は「12kmタマゴ」と「いつでも冒険モードタマゴ」専用の保護スペースです。通常のポケストップ産タマゴで満杯になっていても、リーダー討伐報酬の12kmタマゴを受け取ることができます！",
          "ru": "Вылупление из яиц гарантирует 20 уровень и минимальный IV 10/10/10 (минимум 66.7%, шанс на 100% хундо — 1 из 216).\n\nКатегории яиц:\n• 2 км (Зеленые): стартовики и бэби. Высиживайте только бесконечным оранжевым инкубатором!\n• 5 км (Желтые): обычные покемоны с покестопов.\n• 7 км (Розовые): только из подарков друзей (Алола и Галар формы).\n• 10 км (Фиолетовые): псевдо-легендарные драконы (Frigibax, Larvitar, Dreepy, Jangmo-o).\n• 12 км Strange (Красные): только с лидеров Ракеты (Cliff, Sierra, Arlo).\n• Adventure Sync (5 и 10 км): награда понедельника в 9:00 за 25 и 50 км.\n\nБонусное хранилище на 3 слота:\nВнизу списка яиц есть 3 слота специально под 12км красные яйца и награды Adventure Sync!"
        },
        "tips": {
          "cs": [
            "Nekonečný oranžový inkubátor mějte VŽDY v provozu — nikdy ho nenechávejte prázdný a dávejte do něj pouze 2km vejce.",
            "Super Inkubátory šetřete výhradně na 10km fialová a 12km červená vejce pro maximální časovou úsporu.",
            "Všechny vylíhnuté Pokémony najdete ve vyhledávání zadáním 'hatched'."
          ],
          "en": [
            "Always keep your infinite orange incubator running non-stop on 2km eggs.",
            "Reserve Super Incubators strictly for 10km purple and 12km red eggs to maximize kilometers saved.",
            "Locate all hatched catches in your box by typing 'hatched'."
          ],
          "ja": [
            "無限ふかそうちは常に2kmタマゴを入れて稼働させ、絶対に空にしてはいけません。",
            "スーパーふかそうちは短縮距離が大きい10kmや12kmタマゴに温存するのが最も効率的です。",
            "ボックスで「hatched」または「孵化」と検索するとタマゴ産ポケモンを一覧表示できます。"
          ],
          "ru": [
            "Бесконечный инкубатор должен работать ВСЕГДА — ставьте в него только 2км яйца.",
            "Супер-инкубаторы тратьте только на 10км и 12км яйца.",
            "Для поиска всех вылупившихся покемонов используйте фильтр 'hatched'."
          ]
        }
      },
      {
        "id": "incubator-math-and-speedup",
        "pokemon": [
          "Salandit",
          "Sandile",
          "Varoom",
          "Pawniard"
        ],
        "heading": {
          "cs": "2. Matematika inkubátorů: Super Inkubátor (0,67×) a eventy",
          "en": "2. Incubator Mathematics: Super Incubators (0.67x) & Event Multipliers",
          "ja": "2. ふかそうちの倍率計算：スーパーふかそうち（0.67倍）とイベント短縮",
          "ru": "2. Математика инкубаторов: Супер-инкубатор (0.67x) и ивенты"
        },
        "content": {
          "cs": "Zkracování líhnutí podléhá přesným matematickým koeficientům:\n\n• Standardní inkubátor: 1,0× (2 km, 5 km, 7 km, 10 km, 12 km).\n• Super Inkubátor: Násobí vzdálenost koeficientem 0,6667 (zkrácení o 33,3 %):\n  - 2km vejce -> 1,33 km (ušetříte 0,67 km)\n  - 5km vejce -> 3,33 km (ušetříte 1,67 km)\n  - 7km vejce -> 4,67 km (ušetříte 2,33 km)\n  - 10km vejce -> 6,67 km (ušetříte 3,33 km)\n  - 12km vejce -> 8,00 km (ušetříte masivní 4,00 km!)\n\nExtrémní eventové stackingy:\nBěhem Community Day s bonusem 1/4 Hatch Distance (nebo 1/2 Hatch Distance) a použitím Super Inkubátoru se násobitele skládají:\n12 km × 0,25 × 0,6667 = pouhé 2,00 km na vylíhnutí 12km Strange Vejce! Pokud navíc zapnete Star Piece při líhnutí devíti 12km vajec najednou, získáte okamžitý nárazový bonus 43 200 až 86 400 Stardustu!",
          "en": "Egg distance reduction operates on precise mathematical coefficients:\n\n• Standard Incubator: 1.0x distance multiplier.\n• Super Incubator: Applies a 0.6667x distance multiplier (33.3% reduction):\n  - 2km -> 1.33 km (saves 0.67 km)\n  - 5km -> 3.33 km (saves 1.67 km)\n  - 7km -> 4.67 km (saves 2.33 km)\n  - 10km -> 6.67 km (saves 3.33 km)\n  - 12km -> 8.00 km (saves a massive 4.00 km!)\n\nEvent Stacking Synergies:\nDuring Community Days featuring 1/4 Hatch Distance combined with Super Incubators, multipliers multiply:\n12km × 0.25 × 0.6667 = a trivial 2.00 km to hatch a 12km Strange Egg! Staggering nine 12km eggs to hatch simultaneously under a Star Piece yields an instant windfall of 43,200 to 86,400 Stardust in a single second!",
          "ja": "ふかそうちによる距離短縮は以下の倍率で計算されます：\n\n• 通常ふかそうち：等倍（1.0倍）\n• スーパーふかそうち：0.6667倍（33.3%短縮）：\n  - 2km -> 1.33km（0.67km短縮）\n  - 5km -> 3.33km（1.67km短縮）\n  - 7km -> 4.67km（2.33km短縮）\n  - 10km -> 6.67km（3.33km短縮）\n  - 12km -> 8.00km（なんと4.00kmも短縮！）\n\nイベント時の超短縮コンボ：\nコミュデイ等で「孵化距離1/4」ボーナスが発動している時にスーパーふかそうちを使うと、効果が重複します：\n12km × 0.25 × 0.6667 ＝ わずか2.00kmで12kmタマゴが孵化！さらに12kmタマゴ9個を同時に孵化させ「ほしのかけら」を合わせれば、一撃で43,200〜86,400のすなを一瞬で回収できます！",
          "ru": "Сокращение дистанции работает по точной формуле:\n\n• Обычный инкубатор: 1.0x.\n• Супер-инкубатор: 0.6667x (минус 33.3%):\n  - 2 км -> 1.33 км\n  - 5 км -> 3.33 км\n  - 7 км -> 4.67 км\n  - 10 км -> 6.67 км\n  - 12 км -> 8.00 км (экономия 4 км!)\n\nИвентовые комбо:\nНа Community Day с бонусом 1/4 дистанции супер-инкубатор делает 12км яйцо всего за 2.00 км! Вылупление девяти 12км яиц со Star Piece приносит 43,200–86,400 пыли мгновенно!"
        },
        "tips": {
          "cs": [
            "Nikdy neplýtvejte Super Inkubátory na 2km vejce — ušetříte jen 0,67 km oproti 4,0 km u 12km vejce.",
            "Z 12km vejce získáte až 64 Candy pro vylíhnutého Pokémona, což stačí na okamžitou evoluci.",
            "Líhněte vejce současně synchronizovaným nasazením do inkubátorů."
          ],
          "en": [
            "Never waste Super Incubators on 2km eggs — saving 0.67 km pales compared to saving 4.0 km on a 12km egg.",
            "12km Strange eggs reward up to 64 Candy per hatch, enough to evolve most species immediately.",
            "Synchronize batch hatching by loading all 9 incubators simultaneously at identical distances."
          ],
          "ja": [
            "2kmタマゴにスーパーふかそうちを使うのはNG（短縮効果が薄いため損をします）。",
            "12kmタマゴからは最大64個のアメがドロップし、即座に最終進化まで育成可能です。",
            "タマゴの孵化タイミングを揃えて、ほしのかけら1個で一括回収するのが効率的です。"
          ],
          "ru": [
            "Никогда не тратьте супер-инкубатор на 2км яйца — экономия всего 670 метров.",
            "Из 12км яйца падает до 64 конфет за раз.",
            "Синхронизируйте дистанцию яиц, чтобы снять награды под одним Star Piece."
          ]
        }
      },
      {
        "id": "female-salandit-and-exclusive-chases",
        "pokemon": [
          "Salandit",
          "Vullaby",
          "Pancham",
          "Scraggy"
        ],
        "heading": {
          "cs": "3. Lov na samici Salandita (12,5 %) a exkluzivní odměny z 12km vajec",
          "en": "3. The 12.5% Female Salandit Chase & 12km Strange Egg Exclusives",
          "ja": "3. メス率12.5%のヤトウモリ厳選と12kmタマゴ限定ポケモン",
          "ru": "3. Охота на самку Salandit (12.5%) и эксклюзивы 12км яиц"
        },
        "content": {
          "cs": "12km červená Strange vejce od lídrů Team GO Rocket obsahují jedny z nejvzácnějších a nejžádanějších Pokémonů ve hře:\n\n1. Salandit gender paradox:\n• Salandit má asymetrický poměr pohlaví: 87,5 % samců a pouhých 12,5 % samic (1 z 8)!\n• ZÁSADNÍ MECHANIKA: Pouze SAMICE Salandita se může vyvinout v jedovatou královnu Salazzle (za 50 Candy). Samec se NIKDY vyvinout nemůže. Získat samici Salandita s vysokým IV je jednou z největších trofejí v Pokémon GO!\n\n2. Další elitní druhy z 12km vajec:\n• Varoom (ocelový/jedový motor, vyvíjí se v Revavroom za 50 Candy).\n• Sandile (Dark/Ground krokodýl, vyvíjí se v Krookodile).\n• Pawniard (vyvíjí se v Bisharpa a budoucího Kingambita).\n• Pancham a Vullaby (top PvP pilíře pro Great a Ultra League s permaboosted 1/64 Shiny šancí!).",
          "en": "12km Strange Eggs sourced from Team GO Rocket Leaders conceal some of the most elusive trophies in the game:\n\n1. The Salandit Gender Asymmetry:\n• Salandit possesses a skewed gender ratio: 87.5% male, and a mere 12.5% female (1 in 8)!\n• THE CRITICAL LAW: Only FEMALE Salandit can evolve into the venomous powerhouse Salazzle (50 Candy). Male Salandit CANNOT EVOLVE under any circumstances. Hatching a high-IV female Salandit is among the rarest flexes in Pokémon GO!\n\n2. 12km High-Value Targets:\n• Varoom: Steel/Poison engine evolving into Revavroom (50 Candy).\n• Sandile: Ground/Dark predator evolving into Krookodile.\n• Pawniard: Steel/Dark blade warrior evolving into Bisharp and Kingambit.\n• Pancham & Vullaby: Dominant PvP champions in Great/Ultra leagues with permanent 1/64 shiny boost odds!",
          "ja": "ロケット団リーダーから手に入る「12kmタマゴ」には、ゲーム屈指の激レアポケモンが封入されています：\n\n1. ヤトウモリの性別格差：\n• ヤトウモリの性別比は「オス87.5%：メス12.5%（1/8）」と極端に偏っています。\n• 運命の分かれ道：【メスのヤトウモリ】のみが強力な「エンニュート」へ進化可能（アメ50個）！オスのヤトウモリは一切進化できません。高個体値のメスヤトウモリを引き当てることは全トレーナーの憧れです。\n\n2. 12kmタマゴのその他重要ポケモン：\n• ブロロン：はがね・どくタイプ。ブロロロームへ進化。\n• メグロコ：ワルビアルへ進化する貴重な地面・悪ポケモン。\n• コマタナ：キリキザンおよび将来のドドゲザンへの進化待機。\n• ヤンチャム＆バルチャイ：対戦で大活躍し、色違い確率も約1/64に常時ブーストされています！",
          "ru": "Красные 12км яйца с лидеров Ракеты содержат редчайших покемонов:\n\n1. Парадокс пола Salandit:\n• Соотношение полов: 87.5% самцов и всего 12.5% самок (1 из 8)!\n• ГЛАВНОЕ ПРАВИЛО: Только САМКА Salandit может эволюционировать в Salazzle (50 конфет). Самец эволюционировать НЕ МОЖЕТ. Поймать самку с высоким IV — огромная удача!\n\n2. Другие ценные виды 12км яиц:\n• Varoom (эволюционирует в Revavroom).\n• Sandile (эволюционирует в Krookodile).\n• Pawniard (эволюционирует в Bisharp и Kingambit).\n• Pancham и Vullaby (топ покемоны PvP с повышенным шансом на шайни 1/64)."
        },
        "tips": {
          "cs": [
            "Samce Salandita si nechte na lucky trades s přáteli, kteří potřebují Candy, nebo je pošlete profesorovi během 2× Transfer Candy.",
            "Pancham i Vullaby mají permaboosted 1/64 shiny šanci přímo z vajíčka.",
            "Před soubojem s lídrem zkontrolujte volné místo ve 3 bonusových slotech."
          ],
          "en": [
            "Save spare male Salandits for distant trades to harvest +3 Candy and guaranteed Candy XL.",
            "Pancham and Vullaby carry permanently boosted 1/64 shiny rates.",
            "Ensure you have space in your 3-slot bonus storage prior to defeating a Leader."
          ],
          "ja": [
            "オスのヤトウモリは100km以上離れた場所で交換に出し、アメ3個＋アメXL確定ドロップに活用しましょう。",
            "ヤンチャムとバルチャイは色違い確率が約1/64と高く設定されています。",
            "リーダー戦前に必ずボーナス枠の空きを確認してください。"
          ],
          "ru": [
            "Самцов Salandit меняйте с друзьями для фарма конфет XL.",
            "Pancham и Vullaby имеют шанс на шайни 1/64.",
            "Проверяйте свободные слоты перед боем с лидером."
          ]
        }
      },
      {
        "id": "adventure-sync-weekly-engine",
        "pokemon": [
          "Riolu",
          "Dratini",
          "Beldum",
          "Gible"
        ],
        "heading": {
          "cs": "4. Adventure Sync: Pondělní ranní odměna a Star Piece trik na 24 000 Dustu",
          "en": "4. Adventure Sync Engine: Monday 9 AM Routine & 24,000 Stardust Trick",
          "ja": "4. いつでも冒険モード：月曜朝9時の報酬＆ほしのかけら24,000砂裏技",
          "ru": "4. Adventure Sync: Награды понедельника в 9:00 и трик на 24 000 пыли"
        },
        "content": {
          "cs": "Adventure Sync měří vaše kroky na pozadí, i když je Pokémon GO vypnuté. Každé pondělí přesně v 9:00 ráno místního času se vyhodnocuje týdenní nachozená vzdálenost:\n\n• 25 km milník: 1 000 Stardustu + 5km Vejce + 3 Rare Candy / Silver Pinap.\n• 50 km milník (HLAVNÍ CÍL 🏆): 16 000 Stardustu + Exkluzivní 10km Vejce (obsahuje prémiový pool s Riolu 1/64 Shiny, Beldumem a Dratinim) + 5 Rare Candy!\n• 100 km milník: 24 000 Stardustu pro elitní maratonce.\n\nPondělní Star Piece trik (zisk 24 000 až 36 000 Dustu):\nPokud jste za týden překonali 50 km, neotevírejte hru před 9:00. V pondělí v 8:58 spusťte aplikaci, okamžitě otevřete batoh a AKTIVUJTE STAR PIECE. V 9:00 naskočí obrazovka Adventure Sync a odměna 16 000 Stardustu se okamžitě vynásobí 1,5× na 24 000 Stardustu!",
          "en": "Adventure Sync tracks walking background displacement with the Pokémon GO app fully terminated. Every Monday at precisely 9:00 AM local time, weekly distance is tallied:\n\n• 25km Milestone: 1,000 Stardust + 5km Egg + 3 Rare Candy / Silver Pinap.\n• 50km Milestone (THE TARGET 🏆): 16,000 Stardust + Exclusive 10km Egg (housing high-yield Riolu 1/64 Shiny, Beldum, and Dratini) + 5 Rare Candy!\n• 100km Milestone: 24,000 Stardust for endurance walkers.\n\nThe Monday Star Piece Masterstroke (Claiming 24,000 to 36,000 Dust):\nIf you surpassed 50km during the week, DO NOT open Pokémon GO casually on Monday morning. Boot the app at 8:58 AM, race to your item bag, and pop a Star Piece. At 9:00 AM the Adventure Sync popup resolves, multiplying your 16,000 Stardust payout by 1.5x up to 24,000 Stardust!",
          "ja": "「いつでも冒険モード」はアプリを起動していなくてもバックグラウンドで歩行距離を計測します。毎週月曜日の朝9:00（現地時間）に週間歩行距離に応じた豪華リワードが一括付与されます：\n\n• 25km達成：ほしのすな1,000 ＋ 5kmタマゴ ＋ ふしぎなアメ/銀パイル3個\n• 50km達成（最重要目標 🏆）：ほしのすな16,000 ＋ 限定10kmタマゴ（リオル・ダンバル・ミニリュウ等の限定プール） ＋ ふしぎなアメ5個！\n• 100km達成：ほしのすな24,000\n\n月曜朝のほしのかけら裏技（砂24,000〜36,000獲得）：\n50kmを達成している週は、月曜の朝9時前に無駄にアプリを開いてはいけません。朝8:58にアプリを起動し、即座に「ほしのかけら」を使用します。朝9:00になると冒険モードのポップアップが表示され、基本16,000の砂が1.5倍の「24,000ほしのすな」へと跳ね上がります！",
          "ru": "Adventure Sync считает шаги в фоновом режиме. Каждый понедельник в 9:00 утра выдаются награды:\n\n• 25 км: 1 000 пыли + 5км яйцо + 3 Rare Candy.\n• 50 км (ГЛАВНАЯ ЦЕЛЬ 🏆): 16 000 пыли + эксклюзивное 10км яйцо (с Riolu, Beldum, Dratini) + 5 Rare Candy!\n• 100 км: 24 000 пыли.\n\nТрик со Star Piece в понедельник:\nЕсли вы находили 50 км, не заходите в игру раньше времени. В 8:58 включите игру и СРАЗУ активируйте Star Piece. В 9:00 выскочит окно наград, и вы получите 24 000 пыли вместо 16 000!"
        },
        "tips": {
          "cs": [
            "Mějte v pondělí v 8:59 alespoň 1 až 2 volná místa v bonusovém úložišti vajec, jinak o 10km Adventure Sync vejce přijdete!",
            "Povolte v nastavení telefonu oprávnění k poloze na 'Vždy povolit' a vypněte úsporu baterie pro spolehlivé načítání kroků.",
            "V pondělí v 9:00 můžete spojit Star Piece s vylíhnutím předpřipravených vajec pro 50 000+ Stardustu během 5 minut."
          ],
          "en": [
            "Ensure you possess 1–2 empty slots in your bonus egg tray at 8:59 AM Monday, or the 10km reward egg is forfeited!",
            "Grant 'Always Allow' location permissions and disable battery saver to prevent Adventure Sync step drops.",
            "Stack the 9:00 AM Star Piece with primed hatching eggs to claim 50,000+ Stardust in 5 minutes."
          ],
          "ja": [
            "月曜朝8:59の時点で、必ずタマゴ枠（またはボーナス枠）に1〜2枠の空きを作っておいてください。満杯だと10kmタマゴが消滅します！",
            "スマホの位置情報権限を「常に許可」にし、省電力モードを解除しておくと歩数が正確に反映されます。",
            "朝9時のほしのかけらに合わせて仕込んだタマゴを一斉孵化させれば、5分で5万以上の砂を獲得可能です。"
          ],
          "ru": [
            "В 8:59 понедельника освободите 1–2 места в яйцах, иначе 10км яйцо не выдадут!",
            "Поставьте геолокацию на 'Всегда разрешать' для точного подсчета шагов.",
            "Совмещайте сбор наград с вылуплением яиц под одним Star Piece."
          ]
        }
      },
      {
        "id": "egg-storage-hygiene-and-filters",
        "pokemon": [
          "Togepi",
          "Riolu",
          "Mime-Jr",
          "Toxel"
        ],
        "heading": {
          "cs": "5. Hygiena inventáře vajec a vyhledávací filtry pro líhnutí",
          "en": "5. Egg Inventory Hygiene & Hatched Search Operators",
          "ja": "5. タマゴ枠の管理術と孵化厳選用プロ検索コマンド",
          "ru": "5. Управление инвентарем яиц и поисковые команды"
        },
        "content": {
          "cs": "Správa vajec vyžaduje přísnou disciplínu, abyste nezaplnili batoh nechtěnými 5km vejci:\n\n1. Pravidlo otevírání dárků:\n• Pokud chcete 7km vejce (s Alolan/Galarian/baby formami), otevírejte dárky od přátel POUZE tehdy, když máte alespoň 1 volný slot v hlavním 9místném úložišti vajec.\n• Pokud naopak 7km vejce NECHCETE, otevřete všechny dárky v momentě, kdy máte batoh na vejce plný (9/9)!\n\n2. Pravidlo protáčení PokéStopů:\n• Každý protočený PokéStop nebo Gym s volným slotem vám okamžitě přidělí 2km, 5km nebo 10km vejce. Pokud si šetříte místo na 12km Strange vejce od lídra Team GO Rocket, NEPROTÁČEJTE PokéStopy před soubojem!\n\n3. Užitečné vyhledávací operátory:\n• 'hatched': Zobrazí všechny vylíhnuté Pokémony.\n• 'hatched & 4*': Zobrazí všechny vaše 100% IV Hundo klenoty z vajec.\n• 'eggsonly': Filtruje baby Pokémony dostupné výhradně z vajíček.",
          "en": "Egg storage hygiene demands tactical discipline to prevent unwanted 5km eggs from clogging your pipeline:\n\n1. The Gift Opening Cadence:\n• If targeting 7km Gift Eggs (for regional forms or baby chases), open friend Gifts ONLY when holding open slots in your primary 9-slot egg tray.\n• Inversely, if you wish to AVOID 7km eggs entirely, open all daily gifts while your egg inventory is completely capped at 9/9!\n\n2. The PokéStop Spin Warning:\n• Spinning any PokéStop or Gym with an open egg slot instantly awards a 2km, 5km, or 10km egg. When hunting Team GO Rocket Leaders for a 12km Strange Egg, AVOID spinning PokéStops until the leader is defeated!\n\n3. Indispensable Search Operators:\n• 'hatched': Displays all Pokémon born from eggs.\n• 'hatched & 4*': Filters your perfect 100% IV egg trophies.\n• 'eggsonly': Pulls baby Pokémon exclusive to the hatching pipeline.",
          "ja": "不要な5kmタマゴで枠を埋めないための徹底管理術：\n\n1. ギフト開封のタイミング管理：\n• 7kmタマゴ（アローラ・ガラル・ベイビィ）が欲しい時は、タマゴ枠に空きがある状態でギフトを開封します。\n• 逆に7kmタマゴが不要な時は、タマゴ枠が「9/9満杯」の時にギフトを一括開封するのが鉄則です！\n\n2. ポケストップ誤回転の防止：\n• タマゴ枠に空きがある状態でポケストップやジムを回すと、瞬時に2kmや5kmタマゴで埋まってしまいます。ロケット団リーダーから12kmタマゴを狙う際は、リーダー戦が終わるまでポケストップを絶対に回さないよう注意してください！\n\n3. 必須の検索コマンド：\n• 「hatched」：タマゴから孵化した全ポケモン。\n• 「hatched & 4*」：タマゴ産の個体値100%（Hundo）コレクション。\n• 「eggsonly」：タマゴ限定のベイビィポケモン（ピチュー、トゲピー、リオル等）。",
          "ru": "Правила управления инвентарем яиц:\n\n1. Открытие подарков:\n• Если нужны 7км яйца, открывайте подарки ТОЛЬКО при наличии свободного места в яйцах.\n• Если 7км яйца НЕ нужны, открывайте подарки при полном инвентаре (9/9)!\n\n2. Прокрутка покестопов:\n• Любой прокрут покестопа со свободным слотом сразу дает яйцо. Если идете на лидера за 12км яйцом, НЕ крутите покестопы перед боем!\n\n3. Полезные команды поиска:\n• 'hatched': все вылупившиеся покемоны.\n• 'hatched & 4*': 100% IV хундо из яиц.\n• 'eggsonly': бэби покемоны, доступные только из яиц."
        },
        "tips": {
          "cs": [
            "Před soubojem s lídrem zkontrolujte, zda máte volné místo ve 3 bonusových slotech.",
            "Filtry si uložte podržením prstu na hledané frázi v batohu.",
            "Baby Pokémoni (Pichu, Togepi, Riolu, Wynaut) mají nižší náklady na druhou Charged útok (10 000 Dustu a 25 Candy) — druhou útok odemkněte PŘED evolucí!"
          ],
          "en": [
            "Ensure an open slot in your 3 bonus trays prior to engaging a Rocket Leader.",
            "Pin frequent queries to your Favorite Searches bar by long-pressing.",
            "Baby Pokémon enjoy heavily discounted second Charged Move unlock costs (10,000 Dust & 25 Candy) — ALWAYS unlock the second move BEFORE evolving!"
          ],
          "ja": [
            "リーダー戦前にボーナス枠の空きを必ず確認しましょう。",
            "よく使う検索コマンドは検索窓長押しでお気に入りに登録できます。",
            "ベイビィポケモン（トゲピー、リオル等）は進化前の方がサードアタック解放コストが格安（すな10,000＋アメ25個）です。必ず【進化前に解放】してください！"
          ],
          "ru": [
            "Проверяйте бонусные слоты перед боем с лидером.",
            "Сохраняйте фильтры в Избранное долгим нажатием.",
            "У бэби-покемонов (Riolu, Togepi) открытие второй атаки стоит дешевле (10,000 пыли и 25 конфет) — открывайте вторую атаку ДО эволюции!"
          ]
        }
      }
    ]
  },
  {
    "id": "field-research-tasks-guide",
    "slug": "field-research-tasks-guide",
    "iconName": "Target",
    "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/327.png",
    "featured": false,
    "author": "PoGo Events Team",
    "readTime": "9 min",
    "updatedAt": "2026-10-31",
    "category": {
      "cs": "Výzkumy & Úkoly",
      "en": "Field Research & Quests",
      "ja": "フィールドリサーチ＆裏技",
      "ru": "Полевые исследования"
    },
    "title": {
      "cs": "Polní výzkum v Pokémon GO: Úkoly, fronta 100 pokémonů (Stacking) a Spinda",
      "en": "Field Research in Pokémon GO: Quest Matrix, 100-Stacking Bank & Spinda",
      "ja": "フィールドリサーチ完全攻略：最新タスク・100匹ストック裏技・パッチール模様",
      "ru": "Полевые исследования в Pokémon GO: Квесты, стак до 100 покемонов и Спинда"
    },
    "subtitle": {
      "cs": "Jak funguje ukládání až 100 odměn do neviditelné fronty pro zisk milionu Stardustu, 100% Hundo CP tabulka a Spinda vzory z 5 Great Curveball hodů.",
      "en": "Mastering the 100-encounter stacking bank for 1,000,000 Stardust windfalls, Level 15 Hundo CPs, and Spinda 5-streak throw mechanics.",
      "ja": "最大100匹のリワードストックによる砂ミリオン獲得術、PL15個体値100%確定CP一覧、カーブ5連続グレートのパッチール厳選。",
      "ru": "Трюк со стаком до 100 покемонов для фарма 1 000 000 пыли, таблица 100% Hundo CP и формы Спинды за 5 крученых бросков."
    },
    "sections": [
      {
        "id": "field-research-overview",
        "pokemon": [
          "Spinda",
          "Beldum",
          "Gible",
          "Larvitar"
        ],
        "heading": {
          "cs": "1. Jak funguje systém polních úkolů a denní distribuce PokéStopů",
          "en": "1. Field Research Quest Engine & PokéStop Distribution Rules",
          "ja": "1. フィールドリサーチの生成仕様とポケストップ配布ルール",
          "ru": "1. Механика полевых квестов и распределение покестопов"
        },
        "content": {
          "cs": "Polní výzkum (Field Research) tvoří páteř denní aktivity v Pokémon GO:\n\n• Jednotná denní distribuce: Každý jednotlivý PokéStop ve vašem městě dává v daný kalendářní den (od půlnoci do půlnoci) naprosto stejný úkol pro všechny trenéry.\n• Kapacita úkolů: Můžete mít současně až 3 aktivní polní úkoly plus 1 vyhrazený slot pro AR Mapping úkol.\n• Třídění úkolů: Pokud dostanete úkol, který se vám nehodí (např. 'Vyhraj 5 raidů' nebo 'Chyť 10 různých druhů Pokémonů'), bez obav klepněte na ikonu odpadkového koše v pravém horním rohu úkolu. Uvolníte tím slot pro rychlé úkoly z jiných PokéStopů!",
          "en": "Field Research constitutes the everyday operational backbone of Pokémon GO:\n\n• Universal Daily Distribution: Every individual PokéStop in your city dispenses the exact same task to every single trainer throughout that calendar day (midnight to midnight).\n• Task Capacity: Your quest log accommodates up to 3 standard Field Research tasks simultaneously, plus 1 supplementary slot dedicated strictly to an AR Mapping scan.\n• Task Pruning: If a PokéStop awards an impractical or time-consuming task (e.g. 'Win 5 Raids'), immediately discard it via the trash can icon. This instantly frees up capacity for rapid throw or catch tasks from neighboring stops!",
          "ja": "フィールドリサーチはPokémon GOのデイリープレイにおける最重要システムです：\n\n• 全トレーナー共通のデイリー配布：街の各ポケストップは、その日一日（深夜0:00〜23:59）全プレイヤーに対して全く同じタスクを配布します。\n• タスク保持枠：通常タスク3枠に加え、ARマッピング専用タスク1枠の最大4枠を同時に保持できます。\n• タスクの即時破棄：時間のかかる面倒なタスク（「レイドで5回勝つ」等）は、右上のゴミ箱アイコンでためらわずに破棄しましょう。空いた枠で近隣の簡単なタスク（「カーブボールを3回投げる」等）を回すのがプロの立ち回りです！",
          "ru": "Полевые исследования — основа ежедневного геймплея в Pokémon GO:\n\n• Одинаковые квесты для всех: Каждый покестоп выдает абсолютно одинаковое задание всем игрокам в течение суток (с полуночи до полуночи).\n• Лимит заданий: 3 стандартных слота + 1 отдельный слот под AR Mapping.\n• Удаление долгих квестов: Если квест слишком долгий (например, 'Выиграй 5 рейдов'), удаляйте его через иконку мусорки и крутите другие покестопы!"
        },
        "tips": {
          "cs": [
            "Mějte v inventáři trvale uložený 1 AR Mapping úkol — tím zajistíte, že ostatní PokéStopy budou dávat pouze běžné úkoly se setkáním.",
            "Úkoly se mění o půlnoci, nebo v 18:00 při startu nového eventu.",
            "První splněný úkol v každém kalendářním dni přidá 1 razítko na Research Breakthrough."
          ],
          "en": [
            "Keep 1 unfinished AR Mapping task permanently in your log to force all PokéStops to award standard encounter tasks.",
            "Tasks reset at midnight local time, or at 6:00 PM when major events launch.",
            "Your first completed task each calendar day stamps your 7-day Breakthrough card."
          ],
          "ja": [
            "ARマッピングタスクを1つ常に保持しておくと、通常のポケストップから良質なポケモン遭遇タスクが出やすくなります。",
            "タスクは深夜0時、または大型イベント開始の18:00に切り替わります。",
            "1日1回タスクをクリアするとスタンプが押され、7個で大発見報酬が手に入ります。"
          ],
          "ru": [
            "Держите 1 невыполненный AR квест в логе, чтобы остальные покестопы давали квесты на покемонов.",
            "Квесты сбрасываются в полночь или в 18:00 на старте новых ивентов.",
            "Первое выполненное задание в день дает 1 печать для недельной коробки."
          ]
        }
      },
      {
        "id": "research-stacking-bank-100",
        "pokemon": [
          "Audino",
          "Meowth",
          "Paras",
          "Shellder"
        ],
        "heading": {
          "cs": "2. Trik odložených odměn (Stacking Bank): Jak nasyslit 1 000 000 Stardustu",
          "en": "2. The 100-Encounter Stacking Bank: Harvesting 1,000,000 Stardust",
          "ja": "2. 100匹リワードストック裏技：砂100万を一気に回収する錬金術",
          "ru": "2. Трюк со стаком до 100 наград: Как накопить 1 000 000 пыли"
        },
        "content": {
          "cs": "Většina trenérů chytí odměnu z úkolu okamžitě. Zkušení hráči však využívají mechaniku tzv. Stacking Banky (Ukládání do fronty):\n\n1. Jak bankovat odměny:\n• Splňte úkol se setkáním s Pokémonem a klepněte na Claim Reward.\n• Jakmile se načte obrazovka odchytu, NEHÁZEJTE míček! Místo toho klepněte v levém horním rohu na ikonu Útěku (dveře s šipkou).\n• Výsledek: Pokémon NEZMÍZÍ! Úkol zmizí ze seznamu a nad vašimi 3 sloty se vytvoří speciální 4. slot s ikonou odložených odměn.\n\n2. Kapacita fronty (Přesně 100 Pokémonů):\n• Tuto akci můžete opakovat až 100×! Hra řadí odložené Pokémony do fronty (First-In, First-Out — nejdříve chytáte ty nejstarší).\n• POZOR: Limit je přesně 100 pokémonů. 101. pokémon smaže toho nejstaršího na začátku fronty bez varování!\n\n3. Strategie na 1 000 000 Stardustu:\n• Do banky ukládejte výhradně Pokémony s extra Stardustem (Audino: 2 100 Dust, Shellder: 1 000 Dust, Sableye/Combee: 750 Dust, Paras/Meowth: 500 Dust).\n• Během Community Day s 3× Catch Stardustem zapněte Star Piece (multiplikátor 4,5×) a celou frontu 100 pokémonů vyprázdněte pomocí Fast Catch za 15 minut. Získáte 500 000 až 945 000 Stardustu za jedno odpoledne!",
          "en": "While casual trainers catch quest rewards immediately, veteran players exploit the Stacking Bank mechanism:\n\n1. How to Bank Encounters:\n• Complete any encounter research task and tap Claim Reward.\n• Once the encounter screen loads, DO NOT throw a ball! Instead, tap the Run/Escape door icon in the top-left corner.\n• The Result: The encounter is NOT lost! It gets filed into a persistent overflow queue resting above your 3 active task slots.\n\n2. The 100-Encounter Buffer Ceiling:\n• You can repeat this sequence up to 100 times! The game manages this reserve as a First-In, First-Out (FIFO) stack.\n• CRITICAL WARNING: The capacity is hard-capped at 100 encounters. Stacking a 101st encounter silently vaporizes the oldest encounter at the front of your queue!\n\n3. The 1,000,000 Stardust Cash-Out:\n• Stockpile exclusively high-dust species (Audino: 2,100 Dust, Shellder: 1,000 Dust, Sableye: 750 Dust, Paras/Foongus: 500 Dust).\n• During a 3x Catch Stardust Community Day, pop a Star Piece (elevating gains to 4.5x) and drain all 100 banked encounters using Fast Catch in 15 minutes. This instantly delivers 500,000 to 945,000 Stardust!",
          "ja": "多くのトレーナーはリサーチ報酬をすぐに捕獲しますが、上級者は「リワードストック（貯金）」を活用して莫大な砂を稼ぎます：\n\n1. ストックのやり方：\n• リサーチタスクを達成し、リワードを受け取ります。\n• 捕獲画面に入ったらボールを投げず、左上の「逃げる（退出ドア）」ボタンをタップします。\n• 結果：ポケモンは消滅せず、タスク一覧の最上部に「ストック枠」として蓄積されます！\n\n2. 保管上限（厳密に100匹まで）：\n• この手順で最大100匹まで捕獲を保留できます（先入れ先出し方式）。\n• 注意：上限の100匹を超えて101匹目をストックすると、一番古い1匹目が警告なしで消去されます！\n\n3. 砂100万荒稼ぎ作戦：\n• タブンネ（2,100砂）、シェルダー（1,000砂）、ヤミラミ（750砂）、パラス（500砂）など、すなボーナス持ちポケモンを優先してストックします。\n• コミュデイ等の「すな3倍」イベント時に「ほしのかけら（×1.5）」を使用（実質4.5倍！）。ファストキャッチで15分で100匹一気捕獲すれば、一瞬で50万〜94万以上のすなを荒稼ぎできます！",
          "ru": "Большинство игроков ловят квестовых покемонов сразу. Опытные игроки используют механику Stacking (банк наград):\n\n1. Как отправить покемона в стак:\n• Нажмите забрать награду за квест.\n• На экране поимки НЕ бросайте шар, а нажмите кнопку побега в левом верхнем углу.\n• Покемон сохранится в отдельном верхнем слоте над активными квестами!\n\n2. Лимит очереди (ровно 100 покемонов):\n• Так можно накопить до 100 покемонов.\n• ВНИМАНИЕ: 101-й покемон молча удалит самого первого в очереди!\n\n3. Стратегия на 1 000 000 пыли:\n• Копите покемонов с повышенной пылью (Audino: 2,100, Shellder: 1,000, Paras: 500).\n• На Community Day с х3 пыли включите Star Piece (будет х4.5) и выловите весь стак через Fast Catch за 15 минут, получив от 500 000 до 945 000 пыли!"
        },
        "tips": {
          "cs": [
            "Počítejte si své uložené odměny — nikdy nepřekračujte 90–95 kusů, abyste neriskovali smazání prvních kousků.",
            "Uložené odměny NIKDY nemohou utéct — mají 0% Flee Rate!",
            "Všechny úkoly vyčistěte pomocí Fast Catch během méně než 15 minut."
          ],
          "en": [
            "Keep mental or written track of your stack size — stop banking at 90–95 to avoid accidental queue overflow drops.",
            "Banked encounters have an absolute 0% Flee Rate — they can never run away!",
            "Drain your entire bank queue with Fast Catch in under 15 minutes."
          ],
          "ja": [
            "ストック数は目視できないため、90匹前後で安全に止めておくのが消失事故を防ぐコツです。",
            "ストックしたポケモンは逃走率0%のため、絶対に逃げられません。",
            "ファストキャッチを使えば、100匹のストックをわずか15分で全回収できます。"
          ],
          "ru": [
            "Считайте стак и не превышайте 90–95 штук во избежание потерь.",
            "Покемоны из стака имеют 0% шанс на побег — они никогда не убегут!",
            "Вылавливайте весь стак через Fast Catch за 15 минут."
          ]
        }
      },
      {
        "id": "spinda-forms-and-streak-throws",
        "pokemon": [
          "Spinda",
          "Chansey",
          "Snorlax",
          "Lapras"
        ],
        "heading": {
          "cs": "3. Spinda a 5 Great Curveball hodů za sebou: 9 vzorů a Shiny",
          "en": "3. Spinda Quest Mastery: 5 Great Curveballs in a Row & Shiny Forms",
          "ja": "3. パッチール厳選：カーブボール5連続グレートと9種類の斑点模様",
          "ru": "3. Квест на Спинду: 5 Great крученых бросков подряд и формы"
        },
        "content": {
          "cs": "Legendární úkol 'Make 5 Great Curveball Throws in a row' (Hoď 5 Great Curveballů za sebou) je jediným způsobem, jak v Pokémon GO získat Spindu (#327):\n\n1. Rotace 9 vzorů skvrn:\n• Ve hře existuje 9 číslovaných vzorů skvrn (Form 1 až 9) plus speciální Heart Pattern (srdíčková forma uvolňovaná během Valentýna).\n• Každý měsíc je aktivní jeden konkrétní vzor. Úspěšným splněním úkolu získáte aktuální měsíční formu.\n\n2. Permaboosted Shiny šance (1 z 64):\n• Shiny Spinda září nápadně světle zelenou barvou a má trvale zvýšenou šanci na odchyt 1 z 64. Jedná se o jeden z nejprestižnějších sběratelských klenotů v celé hře!\n\n3. Trik na sérii hodů:\n• Házejte na velké raid bossy (Snorlax, Wailmer, Kyogre, Groudon, Onix, Ponyta), kteří mají obrovský hitbox.\n• Použijte Nanab Berry, která Pokémona zcela uklidní a zabrání jeho poskakování či útokům.",
          "en": "The iconic research quest 'Make 5 Great Curveball Throws in a row' is the sole gateway to obtaining Spinda (#327) in Pokémon GO:\n\n1. 9 Numbered Spot Patterns:\n• Pokémon GO features 9 numbered facial spot patterns (Forms 1 through 9), plus a coveted Heart pattern unlocked exclusively during Valentine's Day events.\n• Patterns rotate on a seasonal schedule. Clearing the task awards the active monthly variant.\n\n2. The 1 in 64 Permaboosted Shiny:\n• Shiny Spinda radiates an unmistakable vibrant lime-green color and carries a permanently boosted 1 in 64 shiny probability. Complete shiny sets represent peak collector prestige!\n\n3. Streak Throw Execution Strategy:\n• Target species with massive catch rings (Snorlax, Wailmer, Onix, Ponyta, legendary raid bosses).\n• Feed Nanab Berries to freeze the Pokémon's animation cycle and eliminate sudden jumps or swat attacks.",
          "ja": "大人気タスク「カーブボールのグレートスローを5回連続で投げる」は、パッチール（#327）を入手する唯一の手段です：\n\n1. 9種類の斑点模様ローテーション：\n• パッチールには1番から9番までの番号付き模様が存在し、バレンタイン限定でハート模様も登場します。\n• 模様はシーズンや月単位でローテーションし、タスク達成でその月の対象模様が手に入ります。\n\n2. 色違い確率1/64（パーマブースト）：\n• 色違いパッチールは鮮やかな黄緑色に輝き、出現確率は約1/64と常時ブーストされています。コレクター間で最も価値の高い色違いの一つです！\n\n3. 連続スローを成功させるコツ：\n• サークルが大きいポケモン（カビゴン、ホエルコ、イワーク、ポニータ、レイドボス等）を狙いましょう。\n• 「ナナのみ」を使うとポケモンが威嚇やジャンプをしなくなるため、安全に連続記録を繋げられます。",
          "ru": "Квест 'Сделай 5 Great крученых бросков подряд' — единственный способ получить Спинду (#327):\n\n1. 9 вариаций пятен:\n• В игре есть 9 номерных форм пятен (с 1 по 9), плюс форма с сердцем на День святого Валентина.\n• Формы меняются каждый месяц.\n\n2. Шанс на Shiny 1 из 64:\n• Шайни Спинда ярко-зеленая и имеет повышенный шанс 1 из 64. Это одна из самых ценных коллекционных находок!\n\n3. Как не сбить серию бросков:\n• Кидайте в крупных покемонов с большим кольцом (Snorlax, Wailmer, Onix, рейдовые боссы).\n• Кормите Nanab Berry, чтобы покемон не дергался и не сбивал серию."
        },
        "tips": {
          "cs": [
            "Pokud vám hrozí zkažení série u 4. hodu, použijte Airplane Mode (Režim Letadlo): zapněte Letadlo před hodem. Pokud hod minete, shoďte aplikaci z paměti a sérii neztratíte!",
            "K vyhledání všech vašich Spind použijte filtr 'spinda'.",
            "Spinda z výzkumu přichází na Levelu 15 s minimálním IV 10/10/10."
          ],
          "en": [
            "Airplane Mode safety trick: Engage Airplane Mode before throw #5. If you miss, force-close the app to preserve your streak intact!",
            "Filter all your dizzy bears with the query 'spinda'.",
            "Task-rewarded Spinda always hatches at Level 15 with guaranteed 10/10/10 IV floors."
          ],
          "ja": [
            "機内モード裏技：4回成功後、5投目を投げる直前に機内モードにします。外れたらアプリをタスクキルすれば連続記録がリセットされません！",
            "ボックスで「spinda」または「パッチール」で検索可能。",
            "タスク産パッチールはPL15・個体値10/10/10以上が保証されています。"
          ],
          "ru": [
            "Трик с Авиарежимом: включите Авиарежим перед 5-м броском. Если промазали — закройте игру, и серия не собьется!",
            "Для поиска используйте слово 'spinda'.",
            "Спинда из квеста всегда 15 уровня с минимальным IV 10/10/10."
          ]
        }
      },
      {
        "id": "level-15-iv-floors-and-hundos",
        "pokemon": [
          "Dratini",
          "Eevee",
          "Magikarp",
          "Bagon"
        ],
        "heading": {
          "cs": "4. Level 15 mechanika a jak okamžitě poznat 100% IV (Hundo)",
          "en": "4. Fixed Level 15 Mechanics & Spotting 100% IV Hundos Pre-Catch",
          "ja": "4. 固定PL15仕様と捕獲画面での個体値100%（Hundo）判別法",
          "ru": "4. Фиксированный 15 уровень и вычисление 100% Hundo до поимки"
        },
        "content": {
          "cs": "Každé setkání z polního i speciálního výzkumu podléhá přísným pravidlům:\n\n• Pevný Level 15: Pokémon má vždy přesně Level 15 (na rozdíl od vajec a raidů, které jsou na Levelu 20).\n• IV podlaha 10/10/10: Nejnižší možný výsledek je 10 Attack, 10 Defense a 10 HP (66,7 % IV). Šance na zisk 100% IV (15/15/15) je přesně 1 z 216 pokusů.\n• Trik s CP hodnotou: Protože je Level pevně zafixován na 15, existuje pro každý druh POUZE JEDNA JINÁ CP hodnota, která odpovídá 100% IV! Pokud se na obrazovce odchytu objeví toto magické číslo (např. CP 417 u Belduma, CP 477 u Gibleho, CP 445 u Larvitara, CP 430 u Dratiniho nebo CP 117 u Magikarpa), držíte v rukou stoprocentního Hunda ještě před hodem prvního míčku!",
          "en": "Every encounter originating from Field and Special Research adheres to rigid mechanical formulas:\n\n• Fixed Level 15: All task rewards arrive strictly at Level 15 (compared to eggs and raids which arrive at Level 20).\n• The 10/10/10 IV Floor: The lowest stat roll possible is 10/10/10 (66.7% IV), yielding an elevated 1 in 216 probability for a flawless 100% IV (15/15/15 Hundo).\n• The CP Lock Tell: Because the encounter Level is mathematically locked at 15, there is exactly ONE singular CP number representing a 100% IV for each species! Encountering that magic number (e.g. CP 417 Beldum, CP 477 Gible, CP 445 Larvitar, CP 430 Dratini, CP 117 Magikarp) guarantees a pristine Hundo before the ball leaves your finger!",
          "ja": "フィールドリサーチおよびスペシャルリサーチのリワード遭遇には、厳格な固定仕様が適用されます：\n\n• 固定PL15（レベル15）：タスク報酬はタマゴやレイド（PL20）と異なり、完全に「レベル15」固定で出現します。\n• 個体値10/10/10保証：各ステータスは最低10保証（66.7%以上）され、1/216の確率で個体値100%（15/15/15 Hundo）が誕生します。\n• 遭遇画面でのHundo判別法：レベルが15に固定されているため、個体値100%の時に表示されるCP数値は【種族ごとに世界中でたった1つ】しか存在しません！例えばダンバルのCP 417、フカマルのCP 477、ヨーギラスのCP 445、ミニリュウのCP 430、コイキングのCP 117は、ボールを投げる前から100%個体値であることが確定しています！",
          "ru": "Все награды за полевые и специальные исследования подчиняются строгим правилам:\n\n• Фиксированный 15 уровень: Всегда ровно 15 уровень (в отличие от яиц и рейдов 20 уровня).\n• Порог IV 10/10/10: Минимальный показатель 10/10/10 (66.7%), а шанс на 100% хундо — 1 из 216.\n• Определение Hundo по CP: Так как уровень зафиксирован на 15, каждому виду соответствует РОВНО ОДНО значение CP для 100% IV! Например, Beldum CP 417, Gible CP 477, Larvitar CP 445, Dratini CP 430 гарантируют 100% до броска шара!"
        },
        "tips": {
          "cs": [
            "Zapamatujte si klíčová čísla CP u vzácných druhů, abyste na 100% kusy neomylně použili Ultra Ball a Silver Pinap.",
            "Výzkumní Pokémoni nemohou utéct — máte neomezený počet hodů!",
            "Filtrujte své 100% research úlovky dotazem 'research & 4*'."
          ],
          "en": [
            "Memorize key Hundo CP figures for rare dragons to deploy Ultra Balls and Silver Pinaps instantly.",
            "Research reward encounters cannot flee — you have infinite throws until capture!",
            "Filter your research hundo hall of fame with 'research & 4*'."
          ],
          "ja": [
            "フカマルやダンバルなどの目玉ポケモンの100%確定CPを暗記しておくと、即座に銀パイルやハイパーボールを投入できます。",
            "リサーチ報酬のポケモンは逃走しない（逃走率0%）ため、ボールが尽きない限り確実に捕獲できます。",
            "ボックスで「research & 4*」と検索するとリサーチ産の100%個体を抽出できます。"
          ],
          "ru": [
            "Запомните CP редких драконов, чтобы сразу кормить Silver Pinap.",
            "Квестовые покемоны не сбегают — число бросков бесконечно!",
            "Ищите всех 100% квестовых покемонов строкой 'research & 4*'."
          ]
        }
      },
      {
        "id": "research-breakthrough-and-search-filters",
        "pokemon": [
          "Machop",
          "Gastly",
          "Ralts",
          "Riolu"
        ],
        "heading": {
          "cs": "5. Research Breakthrough (7 razítek) a rychlé vyhledávací filtry",
          "en": "5. Research Breakthrough (7 Stamps) & Storage Search Operators",
          "ja": "5. 大発見リワード（スタンプ7個）とボックス整理用プロ検索コマンド",
          "ru": "5. Research Breakthrough (7 печатей) и поисковые фильтры"
        },
        "content": {
          "cs": "Research Breakthrough (Průlom ve výzkumu) představuje týdenní vyvrcholení plnění úkolů:\n\n1. Systém 7 razítek:\n• Každý kalendářní den, kdy splníte alespoň jeden úkol, získáte razítko.\n• Po 7 razítkách (nemusí jít o po sobě jdoucí dny!) odemknete velkou odměnu obsahující 3 000 XP, 2 000 Stardustu a šanci na vzácné předměty včetně Remote Raid Passu, Sinnoh Stone, Unova Stone nebo 20 Poké Ballů.\n\n2. Měsíční rotace Pokémonů:\n• Box obsahuje náhodné setkání z aktuální sezónní nabídky 6 Pokémonů s garantovaným IV 10/10/10 a zvýšenou šancí na Shiny.\n\n3. Užitečné vyhledávací operátory:\n• 'research': Zobrazí všechny Pokémony získané z Field nebo Special Research.\n• 'research & shiny': Zobrazí všechny vaše třpytivé trofeje z výzkumů.\n• 'research & 4*': Všechny vaše 100% klenoty s maximálními staty.",
          "en": "The weekly Research Breakthrough marks the culmination of disciplined daily play:\n\n1. The 7-Stamp Progression:\n• Clearing at least one task per calendar day awards a progress stamp.\n• Amassing 7 stamps (does not require consecutive days) unlocks the master box awarding 3,000 XP, 2,000 Stardust, evolutionary stones, and rare drops including Remote Raid Passes.\n\n2. Seasonal Encounter Rotations:\n• Features a rotating seasonal pool of 6 diverse species arriving at Level 15 with 10/10/10 IV floors and boosted shiny probabilities.\n\n3. Essential Storage Queries:\n• 'research': Pulls all catches secured through Field and Special Research.\n• 'research & shiny': Unveils your shiny research trophies.\n• 'research & 4*': Isolates your perfect 100% IV research collection.",
          "ja": "「大発見（Research Breakthrough）」は毎日のタスク達成を称える週間目玉報酬です：\n\n1. スタンプ7個のルール：\n• 毎日最初のタスク完了時にスタンプが1個押されます。\n• 7個集めると（連続した日数でなくてもOK）大発見ボックスが開き、XP 3,000やすな 2,000、シンオウ・イッシュのいし、そして低確率でリモートレイドパスなどの超貴重アイテムが付与されます。\n\n2. シーズン別の出現ポケモン：\n• シーズンごとに指定された6種の対象ポケモンからランダムで1匹が出現（PL15・個体値10/10/10保証・色違い確率アップ）。\n\n3. ボックス整理の必須コマンド：\n• 「research」：リサーチタスク全般から入手した全ポケモン。\n• 「research & shiny」：リサーチ産の色違いコレクション。\n• 「research & 4*」：リサーチで引き当てた個体値100%（Hundo）一覧。",
          "ru": "Research Breakthrough — недельная награда за выполнение заданий:\n\n1. Система 7 печатей:\n• Первая печать дается за первый выполненный квест в день.\n• За 7 печатей (не обязательно подряд) выдается коробка с 3,000 XP, 2,000 пыли, камнями эволюции и шансом на Remote Raid Pass.\n\n2. Ротация покемонов:\n• Содержит одного из 6 сезонных покемонов с гарантией IV 10/10/10 и шансом на Shiny.\n\n3. Полезные фильтры поиска:\n• 'research': все квестовые покемоны.\n• 'research & shiny': блестящие покемоны из квестов.\n• 'research & 4*': 100% IV хундо из квестов."
        },
        "tips": {
          "cs": [
            "Razítko můžete získat jednou denně — pokud v 23:55 splníte úkol, vyzvedněte ho hned a v 0:01 otočte další pro rychlý zisk 2 razítek za 10 minut.",
            "Z boxu Research Breakthrough lze vzácně získat Remote Raid Pass zdarma.",
            "Filtry si uložte podržením prstu na hledané frázi v batohu."
          ],
          "en": [
            "Stamp timing tip: Claim a task at 11:58 PM, then clear a second task at 12:01 AM to score two stamps in under 5 minutes.",
            "The Research Breakthrough box has a rare chance to reward a free Remote Raid Pass.",
            "Pin key queries to your storage favorites by long-pressing."
          ],
          "ja": [
            "スタンプ獲得の裏技：深夜23:58に1個目を達成し、日付が変わった0:02に2個目を達成すれば、わずか5分間で2日分のスタンプを進められます。",
            "大発見ボックスからは極めて低確率で「リモートレイドパス」が直接ドロップすることがあります。",
            "よく使うコマンドは検索履歴長押しでお気に入り登録しておきましょう。"
          ],
          "ru": [
            "Трик со временем: сдайте квест в 23:58, а следующий — в 0:02, получив 2 печати за 5 минут.",
            "Из недельной коробки может выпасть бесплатный Remote Raid Pass.",
            "Сохраняйте частые запросы в Избранное долгим нажатием."
          ]
        }
      }
    ]
  },
  {
    "id": "extra-stardust-pokemon-guide",
    "slug": "extra-stardust-pokemon-guide",
    "iconName": "Sparkles",
    "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/531.png",
    "featured": false,
    "author": "PoGo Events Team",
    "readTime": "9 min",
    "updatedAt": "2026-10-31",
    "category": {
      "cs": "Zdroje & Farma Stardustu",
      "en": "Resources & Stardust Farming",
      "ja": "ほしのすな・育成素材",
      "ru": "Ресурсы и фарминг пыли"
    },
    "title": {
      "cs": "Extra Stardust Pokémoni: Kompletní přehled 23 druhů, počasí a násobiče",
      "en": "Extra Stardust Pokémon: All 23 Species, Weather Boosts & Multipliers",
      "ja": "ほしのすな増量ポケモン完全ガイド：全23種・天候ブースト・かけら倍率",
      "ru": "Покемоны с повышенной пылью: Все 23 вида, погода и умножение наград"
    },
    "subtitle": {
      "cs": "Kteří Pokémoni dávají až 2 100 Stardustu za odchyt (3 938 se Star Piece), jak funguje počasí a kde najít hnízda Shelldera a Parase.",
      "en": "Which wild Pokémon yield up to 2,100 base Stardust (3,938 with Star Piece), weather boost interactions, and farming Shellder/Paras nests.",
      "ja": "捕獲で最大2,100砂（天候＋かけらで3,938砂）獲得できる対象ポケモン、天候相性、パラスやシェルダーの巣の周回術。",
      "ru": "Какие покемоны дают до 2 100 базовой пыли (3 938 со Star Piece), влияние погоды и фарм в гнездах Shellder и Paras."
    },
    "sections": [
      {
        "id": "stardust-tiers-breakdown",
        "pokemon": [
          "Audino",
          "Shellder",
          "Sableye",
          "Paras"
        ],
        "heading": {
          "cs": "1. Žebříček 23 Pokémonů s přirozeně zvýšenou odměnou Stardustu",
          "en": "1. The 23 Bonus Stardust Species Ranked by Payout Tier",
          "ja": "1. ほしのすな増量ポケモン全23種のティア別格付け一覧",
          "ru": "1. Рейтинг всех 23 покемонов с повышенной пылью по тирам"
        },
        "content": {
          "cs": "Zatímco 98 % běžných divokých Pokémonů dává při chycení pouhých 100 Stardustu, vybraných 23 druhů v Pokémon GO disponuje trvalým, zabudovaným bonusem Stardustu:\n\n• Tier 1 (Král Stardustu): Audino — astronomických 2 100 Stardustu za jediný běžný odchyt!\n• Tier 2 (Top farma): Cloyster (1 200 Stardustu), Shellder (1 000 Stardustu), Chimecho (1 000 Stardustu).\n• Tier 3 (Střední elita): Alolan Persian, Starmie, Vespiquen, Garbodor (950 Stardustu), Alolan Meowth, Staryu, Sableye, Combee, Trubbish (750 Stardustu).\n• Tier 4 (Hnízdící druhy): Parasect, Persian, Breloom, Amoonguss, Shiinotic (700 Stardustu), Paras, Meowth, Delibird, Shroomish, Foongus, Morelull (500 Stardustu).\n\nKaždý zkušený trenér má v batohu připravenou zásobu Ultra Ballů a Razz Berry pro okamžitý odchyt kteréhokoliv z těchto 23 druhů!",
          "en": "While 98% of standard wild encounters yield a modest 100 Stardust, a select roster of 23 species carries permanent, built-in base Stardust bonuses:\n\n• Tier 1 (The Sovereign of Dust): Audino — a staggering 2,100 base Stardust for a single standard wild catch!\n• Tier 2 (Prime Harvesters): Cloyster (1,200 Dust), Shellder (1,000 Dust), Chimecho (1,000 Dust).\n• Tier 3 (Mid-Tier Elite): Alolan Persian, Starmie, Vespiquen, Garbodor (950 Dust), Alolan Meowth, Staryu, Sableye, Combee, Trubbish (750 Dust).\n• Tier 4 (Prolific Nesters): Parasect, Persian, Breloom, Amoonguss, Shiinotic (700 Dust), Paras, Meowth, Delibird, Shroomish, Foongus, Morelull (500 Dust).\n\nVeteran trainers reserve Ultra Balls and Razz Berries on sight whenever any of these 23 lucrative targets spawn!",
          "ja": "通常出現するポケモンの98%は捕獲時にわずか100のすなしか落としませんが、厳選された23種には恒常的なすな増量ボーナスが設定されています：\n\n• ティア1（砂の絶対王者）：タブンネ — 1匹捕獲するだけで規格外の「2,100ほしのすな」！\n• ティア2（超主力）：パルシェン（1,200砂）、シェルダー（1,000砂）、チリーン（1,000砂）。\n• ティア3（準特級）：アローラペルシアン、スターミー、ビークイン、ダストダス（950砂）、アローラニャース、ヒトデマン、ヤミラミ、ミツハニー、ヤブクロン（750砂）。\n• ティア4（量産型）：パラセクト、ペルシアン、キノガッサ、モロバレル、マシェード（700砂）、パラス、ニャース、デリバード、キノココ、タマゲタケ、ネマシュ（500砂）。\n\nこれらのポケモンを発見した際は、絶対に逃がさないようハイパーボールとズリのみで確実に仕留めましょう！",
          "ru": "В то время как 98% диких покемонов дают всего 100 пыли, ровно 23 вида имеют постоянный встроенный бонус пыли:\n\n• Тир 1 (Король пыли): Audino — колоссальные 2 100 пыли за поимку!\n• Тир 2: Cloyster (1 200 пыли), Shellder (1 000 пыли), Chimecho (1 000 пыли).\n• Тир 3: Alolan Persian, Starmie, Vespiquen, Garbodor (950 пыли), Staryu, Sableye, Combee, Trubbish (750 пыли).\n• Тир 4: Parasect, Breloom, Amoonguss (700 пыли), Paras, Meowth, Delibird, Shroomish, Foongus (500 пыли).\n\nВсегда ловите этих покемонов через Ultra Ball и ягоды!"
        },
        "tips": {
          "cs": [
            "Audino dává 21× více Stardustu než běžný Pidgey nebo Rattata!",
            "Shellder a Paras často tvoří rozsáhlá městská hnízda (Nests), kde lze za hodinu nasbírat přes 100 000 Stardustu.",
            "Filtrujte všechny extra dust druhy najednou pomocí našeho 1-click vyhledávacího kódu."
          ],
          "en": [
            "A single Audino provides 21x the Stardust volume of an ordinary Pidgey or Rattata!",
            "Shellder and Paras frequently form massive park nests yielding 100,000+ Stardust per hour.",
            "Filter all bonus dust targets simultaneously in your box with our 1-click query."
          ],
          "ja": [
            "タブンネ1匹で普通のポッポやコラッタ21匹分のすなを一撃で獲得できます！",
            "シェルダーやパラスは公園の巨大な巣（ネスト）として出現しやすく、1時間で10万以上の砂を稼げます。",
            "ワンタップ検索コマンドで全対象種を一括抽出できます。"
          ],
          "ru": [
            "Один Audino дает в 21 раз больше пыли, чем обычный покемон!",
            "Shellder и Paras часто гнездятся в парках, давая более 100 000 пыли в час.",
            "Используйте готовую строку поиска для всех 23 видов."
          ]
        }
      },
      {
        "id": "weather-boost-and-star-piece-stacking",
        "pokemon": [
          "Audino",
          "Cloyster",
          "Staryu",
          "Combee"
        ],
        "heading": {
          "cs": "2. Matematika násobičů: Weather Boost (+25 %) a Star Piece (+50 %)",
          "en": "2. Multiplier Stacking: Weather Boost (+25%) & Star Piece (+50%)",
          "ja": "2. 重複倍率の計算式：天候ブースト（+25%）とほしのかけら（+50%）",
          "ru": "2. Математика умножения: Weather Boost (+25%) и Star Piece (+50%)"
        },
        "content": {
          "cs": "Herní bonusy za počasí a předměty se v Pokémon GO násobí, což vytváří astronomické odměny:\n\n1. Weather Boost (+25 %):\nPokud typ Pokémona odpovídá aktuálnímu počasí (např. Audino v Partly Cloudy, Shellder v Dešti, Paras v Slunečnu/Dešti), získáte +25 % Stardustu.\n\n2. Star Piece (+50 %):\nPředmět Star Piece zvyšuje veškerý získaný Stardust o 50 % po dobu 30 minut.\n\n3. Kombinovaný výnos (Počasí + Star Piece = 1,875×):\n• Audino: 2 100 -> 2 625 (počasí) -> 3 150 (Star Piece) -> 3 938 STARDUSTU za jediný odchyt!\n• Cloyster: 1 200 -> 1 500 -> 1 800 -> 2 250 Stardustu!\n• Shellder / Chimecho: 1 000 -> 1 250 -> 1 500 -> 1 875 Stardustu!\n\nV kombinaci s Community Day (3× Catch Stardust) vynese jeden jediný Audino neuvěřitelných 11 812 Stardustu!",
          "en": "Weather Boosts and premium items stack multiplicatively in Pokémon GO, yielding staggering windfalls:\n\n1. Weather Boost (+25%):\nWhen the wild encounter matches current weather conditions (e.g. Audino in Partly Cloudy, Shellder in Rainy, Paras in Sunny/Rainy), base Stardust is multiplied by 1.25x.\n\n2. Star Piece (+50%):\nA Star Piece amplifies all incoming Stardust gains by 1.5x across a 30-minute window.\n\n3. Combined Multiplier (Weather + Star Piece = 1.875x):\n• Audino: 2,100 -> 2,625 (Weather) -> 3,150 (Star Piece) -> 3,938 STARDUST for a single capture!\n• Cloyster: 1,200 -> 1,500 -> 1,800 -> 2,250 Stardust!\n• Shellder / Chimecho: 1,000 -> 1,250 -> 1,500 -> 1,875 Stardust!\n\nUnder a 3x Stardust Community Day, an individual weather-boosted Audino under a Star Piece awards an astronomical 11,812 Stardust!",
          "ja": "天候ブーストとアイテムの効果は乗算され、劇的な獲得量に跳ね上がります：\n\n1. 天候ブースト（+25%）：\nポケモンのタイプと天候が一致している場合（タブンネの時々曇り、シェルダーの雨、パラスの晴天/雨等）、捕獲すなが1.25倍になります。\n\n2. ほしのかけら（+50%）：\n使用から30分間、全すな獲得量が1.5倍になります。\n\n3. 重複時の獲得すな（天候＋かけら＝1.875倍）：\n• タブンネ：2,100 -> 2,625（天候） -> 3,150（かけら） -> 【3,938ほしのすな】！\n• パルシェン：1,200 -> 1,500 -> 1,800 -> 2,250すな！\n• シェルダー/チリーン：1,000 -> 1,250 -> 1,500 -> 1,875すな！\n\nコミュデイの「すな3倍」ボーナスと重なると、天候ブーストタブンネ1匹で【11,812ほしのすな】という天文学的報酬が手に入ります！",
          "ru": "Погодный буст и Star Piece перемножаются, создавая колоссальные награды:\n\n1. Weather Boost (+25%):\nЕсли тип совпадает с погодой, награда пыли умножается на 1.25x.\n\n2. Star Piece (+50%):\nУвеличивает всю пыль на 50% в течение 30 минут.\n\n3. Комбо (Погода + Star Piece = 1.875x):\n• Audino: 2 100 -> 2 625 -> 3 150 -> 3 938 ПЫЛИ за 1 покемона!\n• Cloyster: 1 200 -> 1 500 -> 1 800 -> 2 250 пыли!\n• Shellder: 1 000 -> 1 250 -> 1 500 -> 1 875 пыли!\n\nНа ивенте с 3х пыли один Audino под погодой и Star Piece приносит 11 812 пыли!"
        },
        "tips": {
          "cs": [
            "Během Partly Cloudy (Polojasno) sledujte radar na Audina a Meowtha.",
            "V dešti (Rainy) mají Shellder, Staryu a Cloyster garantovaný +25% bonus.",
            "Star Piece aktivujte vždy, když vstoupíte do parku s hnízdem Shelldera."
          ],
          "en": [
            "Monitor your nearby radar in Partly Cloudy weather for Audino and Meowth.",
            "Rainy weather guarantees the +25% boost on Shellder, Staryu, and Cloyster.",
            "Pop a Star Piece immediately upon arriving at a verified Shellder park nest."
          ],
          "ja": [
            "「時々曇り」の日はタブンネとニャースがブーストされるため狙い目です。",
            "「雨」の日はシェルダー、ヒトデマン、パルシェンが確定で1.25倍になります。",
            "シェルダーの巣に到着したら、即座にほしのかけらを使用しましょう。"
          ],
          "ru": [
            "В погоду Partly Cloudy следите за радаром на Audino и Meowth.",
            "В дождь (Rainy) Shellder и Staryu гарантированно дают +25%.",
            "Включайте Star Piece при входе в парк с гнездом Shellder."
          ]
        }
      },
      {
        "id": "evolution-stages-stardust-scaling",
        "pokemon": [
          "Charizard",
          "Blastoise",
          "Venusaur",
          "Dragonite"
        ],
        "heading": {
          "cs": "3. Škálování evolučních fází: 100 -> 300 -> 500 Stardustu",
          "en": "3. Evolution Stage Scaling: 100 -> 300 -> 500 Base Stardust",
          "ja": "3. 進化段階によるすな増量：1進化300砂・2進化500砂の法則",
          "ru": "3. Рост пыли по стадиям эволюции: 100 -> 300 -> 500 пыли"
        },
        "content": {
          "cs": "Kromě 23 speciálních druhů platí v Pokémon GO univerzální pravidlo pro všechny divoké evoluce:\n\n• Základní forma (Stage 1): 100 Stardustu (např. Charmander, Pidgey, Bulbasaur).\n• 1. evoluce (Stage 2): 300 Stardustu (např. Charmeleon, Pidgeotto, Ivysaur).\n• 2. finální evoluce (Stage 3): 500 Stardustu (např. Charizard, Pidgeot, Venusaur, Dragonite, Blastoise)!\n\nPokud v přírodě potkáte finální evoluci (např. divokého Dragonita nebo Tyranitara) za příznivého počasí se zapnutým Star Piece, získáte 938 Stardustu bez ohledu na to, zda jde o druh z extra dust seznamu!",
          "en": "Beyond the 23 dedicated species, a universal law governs all wild evolved Pokémon:\n\n• Base Species (Stage 1): 100 base Stardust (e.g. Charmander, Pidgey, Bulbasaur).\n• Middle Evolution (Stage 2): 300 base Stardust (e.g. Charmeleon, Pidgeotto, Ivysaur).\n• Final Evolution (Stage 3): 500 base Stardust (e.g. Charizard, Pidgeot, Venusaur, Dragonite)!\n\nEncountering a wild fully evolved titan (such as a wild Dragonite or Tyranitar) under matching weather and a Star Piece grants 938 Stardust from a single encounter!",
          "ja": "23種の特別ポケモン以外にも、進化段階に応じた普遍的なすなボーナスが存在します：\n\n• 無進化（たねポケモン）：基本100ほしのすな（ヒトカゲ、ポッポ、フシギダネ等）。\n• 1進化ポケモン：基本300ほしのすな（リザード、ピジョン、フシギソウ等）。\n• 2進化ポケモン（最終進化）：基本500ほしのすな（リザードン、ピジョット、フシギバナ、カイリュー等）！\n\n野生で最終進化形（カイリューやバンギラス等）に遭遇した場合、天候ブーストとかけらを合わせることで1匹あたり938のすなが手に入ります！",
          "ru": "Помимо 23 специальных видов, для всех эволюций в игре действует правило:\n\n• Базовый покемон: 100 пыли (Charmander, Pidgey).\n• 1-я эволюция: 300 пыли (Charmeleon, Ivysaur).\n• Финальная 2-я эволюция: 500 пыли (Charizard, Dragonite, Venusaur)!\n\nПоимка финальной эволюции с погодным бустом и Star Piece дает 938 пыли!"
        },
        "tips": {
          "cs": [
            "Divoké finální evoluce neignorujte — přinášejí 5× více Stardustu než běžný základní spawn.",
            "Použijte Ultra Ball a Razz Berry, protože vyvinutí Pokémoni mají nižší Base Catch Rate.",
            "Vyvinutí Pokémoni dávají navíc garantované Candy XL při chycení."
          ],
          "en": [
            "Never pass up wild fully evolved spawns — they deliver 5x the Stardust of a basic spawn.",
            "Deploy Ultra Balls and Razz Berries, as evolved species possess naturally lower Base Catch Rates.",
            "Evolved catches additionally guarantee bonus Candy XL."
          ],
          "ja": [
            "野生の最終進化形は普通のたねポケモンの5倍のすなを落とすため、絶対に見逃してはいけません。",
            "捕獲難易度が高いため、ハイパーボールとズリのみで確実に捕獲しましょう。",
            "進化後ポケモンは捕獲時にアメXLが確定ドロップする恩恵もあります。"
          ],
          "ru": [
            "Никогда не пропускайте финальные эволюции на карте — они дают в 5 раз больше пыли.",
            "Используйте Ultra Ball, так как шанс поимки у эволюций ниже.",
            "За поимку эволюций гарантированно даются конфеты XL."
          ]
        }
      },
      {
        "id": "nesting-and-seasonal-biomes",
        "pokemon": [
          "Parasect",
          "Amoonguss",
          "Breloom",
          "Meowth"
        ],
        "heading": {
          "cs": "4. Hnízda v parcích (Nests): Kde a jak grindovat statisíce Stardustu",
          "en": "4. Park Mega-Nests: How to Farm Hundreds of Thousands of Stardust",
          "ja": "4. 公園の巨大な巣（ネスト）：時速数十万のすなを稼ぐ周回ルート",
          "ru": "4. Гнезда в парках: Как фармить сотни тысяч пыли"
        },
        "content": {
          "cs": "Ne všechny druhy z 23členného seznamu mohou tvořit hnízda (Nests). Schopnost hnízdění v městských parcích určuje jejich praktickou hodnotu:\n\n• Druhy, které MOHOU hnízdit v parcích:\n  - Shellder (1 000 Dustu — KRÁL HNÍZD!)\n  - Paras (500 Dustu)\n  - Foongus (500 Dustu)\n  - Shroomish (500 Dustu)\n\n• Druhy, které NIKDY NEHNÍZDÍ:\n  - Audino (2 100 Dustu — výhradně vzácný divoký spawn)\n  - Sableye (750 Dustu)\n  - Chimecho (1 000 Dustu)\n  - Delibird (500 Dustu — pouze vánoční eventy)\n\nPokud lokální komunita nahlásí, že se velký park v centru města stal hnízdem Shelldera, jedná se o nejvýnosnější farmu v celé hře: za dvouhodinovou procházku s Fast Catchem a Star Piece v dešti si odnesete přes 300 000 až 500 000 Stardustu!",
          "en": "Not all 23 species possess the capability to form park nests. Nest eligibility dictates practical farming efficiency:\n\n• Species that DO Form Park Nests:\n  - Shellder (1,000 Dust — THE NEST SOVEREIGN!)\n  - Paras (500 Dust)\n  - Foongus (500 Dust)\n  - Shroomish (500 Dust)\n\n• Species that NEVER Nest:\n  - Audino (2,100 Dust — rare wild spawn only)\n  - Sableye (750 Dust)\n  - Chimecho (1,000 Dust)\n  - Delibird (500 Dust — holiday events only)\n\nWhen local Discord communities discover a major central park rotating into a Shellder mega-nest, it becomes the single most profitable grinding venue in the game: a 2-hour Fast Catch circuit in Rainy weather under Star Pieces routinely harvests 300,000 to 500,000+ Stardust!",
          "ja": "23種のすべてが公園の「巣（ネスト）」になるわけではありません。巣になるかどうかが実戦での稼ぎやすさを決定づけます：\n\n• 公園で巣を形成するポケモン：\n  - シェルダー（1,000砂 — 【巣の絶対王者】！）\n  - パラス（500砂）\n  - タマゲタケ（500砂）\n  - キノココ（500砂）\n\n• 巣を作らないポケモン（単独出現のみ）：\n  - タブンネ（2,100砂 — 超激レア単独湧きのみ）\n  - ヤミラミ（750砂）\n  - チリーン（1,000砂）\n  - デリバード（500砂 — 冬季限定）\n\nもし近くの大規模公園が「シェルダーの巣」になったら、全スケジュールを空けて向かいましょう！雨の日にほしのかけらを使ってファストキャッチ周回すれば、2時間で30万〜50万以上のすなを一気に確保できます！",
          "ru": "Не все 23 вида покемонов могут образовывать гнезда (Nests) в парках:\n\n• Виды, которые ГНЕЗДЯТСЯ в парках:\n  - Shellder (1 000 пыли — КОРОЛЬ ГНЕЗД!)\n  - Paras (500 пыли)\n  - Foongus (500 пыли)\n  - Shroomish (500 пыли)\n\n• Виды, которые НЕ ГНЕЗДЯТСЯ:\n  - Audino (2 100 пыли — только редкий спавн)\n  - Sableye (750 пыли)\n  - Chimecho (1 000 пыли)\n  - Delibird (500 пыли — новогодний ивент)\n\nЕсли парк стал гнездом Shellder, двухчасовая сессия в дождь под Star Piece принесет 300 000–500 000 пыли!"
        },
        "tips": {
          "cs": [
            "Hnízda v Pokémon GO migrují pravidelně každé dva týdny ve čtvrtek o půlnoci UTC.",
            "Využijte komunitní mapy hnízd pro ověření aktuálních rotací ve vašem okolí.",
            "Při farmení hnízda používejte techniku Fast Catch pro maximální rychlost odchytů."
          ],
          "en": [
            "Pokémon GO park nests migrate on a fixed bi-weekly schedule every second Thursday at midnight UTC.",
            "Consult local community nest reports to pinpoint active Shellder or Paras clusters.",
            "Always deploy the Fast Catch technique during nest circuits to maximize catch throughput."
          ],
          "ja": [
            "公園の巣は隔週木曜日の午前9時（日本時間）に定期的にシャッフル（巣の移動）されます。",
            "コミュニティの巣情報を確認し、シェルダーやパラスの巣を見逃さないようにしましょう。",
            "巣の周回時はファストキャッチで高速捕獲し、時速を最大化するのが基本です。"
          ],
          "ru": [
            "Гнезда в парках меняются каждые 2 недели по четвергам в полночь UTC.",
            "Следите за отчетами игроков о гнездах Shellder и Paras.",
            "Всегда используйте Fast Catch при обходе гнезда."
          ]
        }
      },
      {
        "id": "catch-and-search-efficiency",
        "pokemon": [
          "Delibird",
          "Chimecho",
          "Trubbish",
          "Garbodor"
        ],
        "heading": {
          "cs": "5. Efektivita lovu, šetření míčků a vyhledávací operátory",
          "en": "5. Catching Mechanics, Ball Conservation & Pro Search Queries",
          "ja": "5. 捕獲効率化・ボール温存術＆プロ仕様の検索コマンド",
          "ru": "5. Эффективность ловли, экономия шаров и поисковые команды"
        },
        "content": {
          "cs": "Chytání extra Stardust Pokémonů vyžaduje správné hospodaření s míčky:\n\n1. Base Catch Rate (BCR) specifika:\n• Audino má velmi nízký Base Catch Rate (pouhých 20 %) a vysokou odolnost proti útěku. VŽDY na něj použijte Ultra Ball a Razz Berry, aby vám neutekl 2 100+ Stardust!\n• Shellder má BCR 40 % a zelený až žlutý kruh — na něj stačí Great Ball s Curveballem.\n\n2. Hromadný vyhledávací dotaz pro box:\nChcete zkontrolovat, kolik vzácných extra dust Pokémonů jste dnes nachytali? Použijte náš univerzální vyhledávací řetězec, který zahrnuje všech 23 druhů:\n'Audino,Shellder,Cloyster,Paras,Parasect,Meowth,Persian,Staryu,Starmie,Foongus,Amoonguss,Shroomish,Breloom,Delibird,Sableye,Combee,Vespiquen,Chimecho,Trubbish,Garbodor,Morelull,Shiinotic'",
          "en": "Farming bonus Stardust species requires prudent Poké Ball economy:\n\n1. Base Catch Rate (BCR) Dynamics:\n• Audino possesses a punishing 20% Base Catch Rate and heavy resistance. ALWAYS deploy an Ultra Ball and Razz Berry to secure that 2,100+ Stardust bounty!\n• Shellder features a manageable 40% BCR, comfortably caught using Great Balls with Curveball throws.\n\n2. The Master Storage Query:\nInspect all bonus dust species captured during your session using our comprehensive multi-species query string covering all 23 targets:\n'Audino,Shellder,Cloyster,Paras,Parasect,Meowth,Persian,Staryu,Starmie,Foongus,Amoonguss,Shroomish,Breloom,Delibird,Sableye,Combee,Vespiquen,Chimecho,Trubbish,Garbodor,Morelull,Shiinotic'",
          "ja": "すな増量ポケモンの捕獲には、適切なボール管理が不可欠です：\n\n1. 基礎捕獲率（BCR）の違い：\n• タブンネはBCRがわずか20%と低く、脱出率も高めです。逃げられて2,100砂を無駄にしないよう、必ず「ハイパーボール＋ズリのみ」を使用してください！\n• シェルダーはBCR 40%のため、スーパーボールのカーブ投げで安定して捕獲できます。\n\n2. 全23種を一括確認するマスター検索コマンド：\nセッション中に捕獲したすな増量ポケモンを一発で確認するための検索文字列：\n「Audino,Shellder,Cloyster,Paras,Parasect,Meowth,Persian,Staryu,Starmie,Foongus,Amoonguss,Shroomish,Breloom,Delibird,Sableye,Combee,Vespiquen,Chimecho,Trubbish,Garbodor,Morelull,Shiinotic」",
          "ru": "Ловля покемонов с повышенной пылью требует правильного расхода ресурсов:\n\n1. Разница в шансах поимки (BCR):\n• У Audino шанс поимки всего 20%. ВСЕГДА используйте Ultra Ball и Razz Berry, чтобы не потерять 2 100 пыли!\n• У Shellder шанс 40% — достаточно Great Ball с крученым броском.\n\n2. Единая поисковая строка на все 23 вида:\nДля поиска всех пойманных покемонов с пылью используйте готовую строку:\n'Audino,Shellder,Cloyster,Paras,Parasect,Meowth,Persian,Staryu,Starmie,Foongus,Amoonguss,Shroomish,Breloom,Delibird,Sableye,Combee,Vespiquen,Chimecho,Trubbish,Garbodor,Morelull,Shiinotic'"
        },
        "tips": {
          "cs": [
            "Podržením prstu na vyhledávacím řádku si uložte řetězec všech 23 druhů do oblíbených.",
            "Zkombinujte řetězec s 'age0' ('age0 & Audino,Shellder...'), abyste viděli pouze dnešní úlovky.",
            "Při 2× Transfer Candy eventech tyto pokémony bezpečně pošlete profesorovi."
          ],
          "en": [
            "Pin the 23-species search string to your favorites bar by long-pressing.",
            "Combine with 'age0' ('age0 & Audino,Shellder...') to inspect only today's session haul.",
            "Transfer extra duplicates to Professor Willow during 2x Transfer Candy events."
          ],
          "ja": [
            "検索窓長押しで全23種の文字列をお気に入り登録しておきましょう。",
            "「age0 & Audino,Shellder...」と組み合わせると、本日の収穫だけを即座に確認できます。",
            "ボックス圧迫時は「博士送り時アメ2倍」アワーで一括転送しましょう。"
          ],
          "ru": [
            "Сохраните строку поиска в Избранное долгим нажатием.",
            "Добавьте 'age0' ('age0 & Audino,Shellder...'), чтобы видеть только сегодняшние уловы.",
            "Лишних отдавайте профессору в часы 2х конфет за трансфер."
          ]
        }
      }
    ]
  },
  {
    "id": "pokemon-go-referral-program-guide",
    "slug": "pokemon-go-referral-program-guide",
    "iconName": "Award",
    "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    "featured": true,
    "author": "PoGo Events Team",
    "readTime": "8 min",
    "updatedAt": "2026-11-01",
    "category": {
      "cs": "Doporučení & Herní bonusy",
      "en": "Referral & Social Rewards",
      "ja": "リワード＆フレンド招待",
      "ru": "Рефералы и награды дружбы"
    },
    "title": {
      "cs": "Doporučovací program Pokémon GO: Jak získat 100 Poké Ballů, Charizarda, inkubátory a kódy",
      "en": "Pokémon GO Referral Program Guide: How to Get 100 Poké Balls, Charizard, Incubators & Codes",
      "ja": "Pokémon GO リファラル（フレンド招待）完全攻略：100個のボール、リザードン、ふかそうち獲得法",
      "ru": "Гайд по реферальной программе Pokémon GO: Как получить 100 покеболов, Чаризарда и инкубаторы"
    },
    "subtitle": {
      "cs": "Kompletní průvodce doporučovacím systémem (Referral Program). Přesné podmínky 72h okna pro nové i vracející se hráče (90+ dní), tabulka odměn za milníky a ověřený kód TQ4TH6H4P.",
      "en": "Exhaustive guide to the Pokémon GO Referral Program. Detailed 72-hour window mechanics for new and returning players (90+ days inactive), complete milestone rewards matrix, and community code TQ4TH6H4P.",
      "ja": "フレンド招待プログラムの完全仕様書。新規＆90日以上復帰プレイヤー対象の72時間期限ルール、全マイルストーン報酬一覧、および推奨コミュニティコードTQ4TH6H4Pを徹底解説。",
      "ru": "Полное руководство по реферальной программе Pokémon GO. Правила 72-часового окна для новых и вернувшихся игроков (90+ дней офлайн), таблица всех наград и рабочий код TQ4TH6H4P."
    },
    "sections": [
      {
        "id": "referral-eligibility-and-72h-window",
        "heading": {
          "cs": "1. Kdo má nárok na odměny: 72hodinové okno a pravidlo 90 dní neaktivity",
          "en": "1. Eligibility Rules: The 72-Hour Window & The 90-Day Inactivity Requirement",
          "ja": "1. 対象条件：72時間の制限時間と「90日以上未ログイン」ルール",
          "ru": "1. Кто может участвовать: Правило 72 часов и 90 дней неактивности"
        },
        "content": {
          "cs": "Doporučovací systém (Referral Program) v Pokémon GO umožňuje novým a vracejícím se hráčům získat obrovské množství prémiových předmětů a vzácných Pokémonů zcela zdarma.\n\nAby hráč mohl zadat doporučovací kód, musí splňovat jednu ze dvou podmínek:\n1. Nový hráč: Účet byl nově zaregistrován a od vytvoření neuplynulo více než 72 hodin.\n2. Vracející se hráč: Účet byl zcela neaktivní po dobu minimálně 90 po sobě jdoucích dnů (žádné přihlášení do hry). Od prvního nového přihlášení po této pauze běží přesně 72 hodin na zadání kódu.\n\nPokud 72hodinové okno propásnete, možnost zadat kód v menu trvale zmizí! Zadání kódu by proto mělo být vaším úplně prvním krokem po spuštění hry.",
          "en": "The Pokémon GO Referral Program allows new and returning trainers to secure a massive stash of premium items, incubators, and rare encounter Pokémon completely free.\n\nTo be eligible to redeem a referral code, an account must meet one of two criteria:\n1. Brand New Player: The account was recently created, and fewer than 72 hours have elapsed since registration.\n2. Returning Player: The account has been completely inactive for at least 90 consecutive days (zero logins). A strict 72-hour countdown starts the exact moment you first log back into the game.\n\nIf you miss this 72-hour window, the redemption prompt permanently disappears! Redeeming a code should always be your absolute first step upon entering the overworld.",
          "ja": "Pokémon GOのフレンド招待プログラム（リファラルシステム）は、新規プレイヤーや久しぶりに復帰したプレイヤーに大量のプレミアムアイテムや貴重なポケモンを無料で提供する公式機能です。\n\n招待コードを入力できる対象者は以下のいずれかに該当するトレーナーです：\n1. 新規プレイヤー：アカウント作成後、72時間以内のプレイヤー。\n2. 復帰プレイヤー：連続して「90日以上」ゲームにログインしておらず、再ログインしてから72時間以内のプレイヤー。\n\n72時間が経過すると入力ボタンが画面から完全に消滅し、二度と受け取れなくなります。ゲームを起動したら最優先でコードを入力しましょう。",
          "ru": "Реферальная программа Pokémon GO дает новым и вернувшимся тренерам возможность бесплатно получить огромный набор премиальных предметов, инкубаторов и редких покемонов.\n\nЧтобы активировать реферальный код, аккаунт должен соответствовать одному из условий:\n1. Новый игрок: Аккаунт только что создан, и с момента регистрации прошло менее 72 часов.\n2. Вернувшийся игрок: Вы не заходили в игру 90 и более дней подряд. Таймер на 72 часа запускается в первую же секунду входа в игру после перерыва.\n\nЕсли пропустить 72-часовое окно, кнопка ввода навсегда исчезнет из меню! Поэтому ввод кода должен быть вашим самым первым действием."
        },
        "tips": {
          "cs": [
            "Ověřte si nárok: Otevřete záložku Přátelé (Friends) -> Pozvat (Invite). Pokud vidíte modrý text „Máte doporučovací kód?“, váš účet má na odměny plný nárok!",
            "Dětské účty (Niantic Kids / PTC Child) se programu z legislativních důvodů nemohou účastnit, a to ani s povolením rodičů."
          ],
          "en": [
            "Check eligibility: Go to Friends -> Invite. If you see the clickable blue text 'Have a referral code?', your account is 100% eligible!",
            "Child accounts (Niantic Kids / PTC Child) cannot redeem or generate referral codes due to age and privacy restrictions."
          ],
          "ja": [
            "対象か確認する方法：「フレンド」画面→「招待」をタップ。画面下に青文字で「招待コードをお持ちですか？」と表示されていれば適用可能です！",
            "Niantic Kidsやお子様用ポケモントレーナークラブアカウントは、保護者設定に関わらず仕様上リファラル機能を利用できません。"
          ],
          "ru": [
            "Проверка статуса: Откройте «Друзья» -> «Пригласить». Если внизу видна синяя надпись «Есть реферальный код?», ваш аккаунт подходит!",
            "Детские аккаунты (Niantic Kids / PTC) не могут использовать реферальные коды из-за ограничений безопасности."
          ]
        }
      },
      {
        "id": "how-to-redeem-code-step-by-step",
        "heading": {
          "cs": "2. Kde a jak zadat kód: Komunitní doporučovací kód TQ4TH6H4P",
          "en": "2. Where and How to Redeem: Recommended Community Code TQ4TH6H4P",
          "ja": "2. コードの入力手順：公式コミュニティコード「TQ4TH6H4P」",
          "ru": "2. Где и как ввести код: Проверенный код сообщества TQ4TH6H4P"
        },
        "content": {
          "cs": "Zadání kódu probíhá přímo v mobilní aplikaci Pokémon GO (nikoli na webovém portálu):\n\n1. Klepněte vlevo dole na mapě na ikonu vašeho trenéra (Avatar).\n2. V horní navigaci přejděte na záložku PŘÁTELÉ (Friends).\n3. Klepněte na fialové tlačítko POZVAT (Invite).\n4. Sjeďte dolů a klepněte na modrý odkaz „Máte doporučovací kód?“ (Have a referral code?).\n5. Zadejte ověřený komunitní kód: TQ4TH6H4P a potvrďte.\n\nOkamžitý bonus: Ihned po odeslání kódu se vám do batohu připíše 100× Poké Ball! Zároveň se automaticky odešle žádost o přátelství a na profilu přítele se odemkne seznam speciálních úkolů s odměnami za milníky.",
          "en": "Redemption happens directly inside the Pokémon GO mobile client (not via the external web store):\n\n1. Tap your Trainer Profile Avatar in the bottom-left corner of the map.\n2. Tap the FRIENDS tab at the top of the screen.\n3. Tap the purple INVITE button.\n4. Scroll to the bottom and tap the blue text: 'Have a referral code?'.\n5. Enter the verified community code: TQ4TH6H4P and confirm.\n\nInstant Bonus: You immediately receive 100× Poké Balls directly into your Item Bag! An automatic friend connection is formed, and the complete referral milestone task tracker activates on your friend's profile.",
          "ja": "コードの入力は外部Webサイトではなく、Pokémon GOアプリ内で行います：\n\n1. マップ画面左下のトレーナーアイコン（アバター）をタップ。\n2. 画面上部の「フレンド」タブを選択。\n3. 「招待」ボタンをタップ。\n4. 画面下部の「招待コードをお持ちですか？」をタップ。\n5. コミュニティ推奨コード「TQ4TH6H4P」を入力して確定。\n\n即時特典：コードが承認されると、即座に「モンスターボール×100個」が道具バッグに付与されます！同時に自動でフレンド関係が結ばれ、豪華なマイルストーンタスク画面が解禁されます。",
          "ru": "Код вводится прямо внутри приложения Pokémon GO (не через сайт):\n\n1. Нажмите на аватар вашего тренера в левом нижнем углу карты.\n2. Перейдите на вкладку «ДРУЗЬЯ» (Friends) вверху экрана.\n3. Нажмите кнопку «ПРИГЛАСИТЬ» (Invite).\n4. Нажмите синюю строку «Есть реферальный код?» внизу окна.\n5. Введите проверенный код сообщества: TQ4TH6H4P и подтвердите.\n\nМгновенный бонус: Вам сразу же начисляется 100 покеболов в инвентарь! Вы автоматически добавляетесь в друзья, и на экране профиля открывается цепочка квестов с наградами."
        },
        "tips": {
          "cs": [
            "Doporučený kód: Zadejte kód TQ4TH6H4P pro garantované propojení s aktivním účtem, který má vždy volné místo v seznamu přátel.",
            "Plný batoh nevadí: Počátečních 100 Poké Ballů se vám do batohu připíše i v případě, že máte aktuálně plnou kapacitu předmětů."
          ],
          "en": [
            "Recommended Code: Use TQ4TH6H4P for guaranteed linking with an active veteran trainer with permanently open friend slots.",
            "Bag Overfill: The initial 100 Poké Balls will force-credit into your inventory even if your Item Bag is temporarily full."
          ],
          "ja": [
            "推奨コード：フレンド枠が常に空いているアクティブプレイヤー「TQ4TH6H4P」を入力すれば、エラーなく確実に連携できます。",
            "バッグ満杯でも安心：最初のモンスターボール100個は、道具の上限を超えていても強制的に付与されます。"
          ],
          "ru": [
            "Проверенный код: Используйте TQ4TH6H4P для 100% подключения к активному игроку со свободными слотами в друзьях.",
            "Переполненный инвентарь: 100 покеболов будут начислены в сумку, даже если в ней временно нет свободного места."
          ]
        }
      },
      {
        "id": "referral-milestone-quests-and-rewards-matrix",
        "pokemon": ["Charizard", "Gible", "Deino", "Bagon", "Lapras", "Snorlax"],
        "heading": {
          "cs": "3. Přehled úkolů a odměn: Inkubátory, Charizard, Gible a Rare Candies",
          "en": "3. Milestone Quests & Rewards: Incubators, Charizard, Gible & Rare Candies",
          "ja": "3. 全マイルストーン報酬一覧：ふかそうち、リザードン、フカマル、ふしぎなアメ",
          "ru": "3. Все квесты и награды: Инкубаторы, Чаризард, Гибл и Rare Candy"
        },
        "content": {
          "cs": "Jakmile je kód zadán, odemkne se speciální seznam úkolů, které plní nový nebo vracející se hráč. Jakmile úkol splní, odměnu získají OBA hráči (vy i zvoucí trenér)!\n\nKlíčové úkoly a odměny pro pozvaného hráče:\n• Poraz 3 Rakeťáky (Defeat 3 Team GO Rocket Grunts) -> Setkání s Charizardem!\n• Vyhraj 1 Raid -> 1× Premium Battle Pass (a pro zvoucího Bagon)\n• Vyhraj 3 Raidy -> Lapras / 1× Premium Battle Pass\n• Vyhraj 20 Raidů -> 3× Super Incubator (pro zvoucího 5× Super Incubator)\n• Chyť 50 Pokémonů -> 1× Super Incubator (pro zvoucího Darumaka)\n• Vylíhni 20 vajíček -> Setkání s Chansey (pro zvoucího Deino)\n• Dej svému Buddymu 50 pamlsků -> 5× Rare Candy (pro zvoucího Gible)\n• Hoď 100 Nice hodů -> Setkání se Snorlaxem (pro zvoucího 2× Super Incubator)\n• Očisti 20 Shadow Pokémonů -> 5× Premium Battle Pass (pro zvoucího 30× Rare Candy)\n• Poraz bosse Rakeťáků (Leader) -> 50× Charizard Mega Energy pro oba!\n• Navštiv PokéStop 30 dní v řadě -> Setkání s Dratini (pro zvoucího Rufflet)\n\nVšechna setkání z těchto úkolů mají garantovaný Research IV floor 10/10/10 a Pokémon vám z obrazovky nikdy neuteče (0% Flee Rate)!",
          "en": "Once the referral code is redeemed, a dedicated milestone track unlocks. Tasks are completed by the referred friend, and rewards are unlocked for BOTH trainers!\n\nKey Milestones and Referee Rewards:\n• Defeat 3 Team GO Rocket Grunts -> Charizard Encounter for both!\n• Win a Raid -> 1× Premium Battle Pass (Inviter gets Bagon)\n• Win 3 Raids -> Lapras Encounter / 1× Premium Battle Pass\n• Win 20 Raids -> 3× Super Incubators (Inviter gets 5× Super Incubators)\n• Catch 50 Pokémon -> 1× Super Incubator (Inviter gets Darumaka)\n• Hatch 20 Eggs -> Chansey Encounter (Inviter gets Deino)\n• Give your buddy 50 treats -> 5× Rare Candies (Inviter gets Gible)\n• Make 100 Nice Throws -> Snorlax Encounter (Inviter gets 2× Super Incubators)\n• Purify 20 Shadow Pokémon -> 5× Premium Battle Passes (Inviter gets 30× Rare Candies)\n• Defeat a Rocket Leader -> 50× Charizard Mega Energy for both!\n• Spin PokéStops 30 days in a row -> Dratini Encounter (Inviter gets Rufflet)\n\nAll referral encounter Pokémon have a guaranteed 10/10/10 IV floor, Level 15 stats, and a 0% flee rate (they cannot run away)!",
          "ja": "コードが認証されると、特別なマイルストーンタスクが開放されます。招待されたプレイヤーがタスクをクリアすると、両方のプレイヤーに豪華報酬が付与されます！\n\n主なタスクと招待された側の報酬：\n• GOロケット団したっぱに3回勝利 -> リザードン出現（双方）！\n• レイドバトルに1回勝利 -> プレミアムバトルパス×1（招待者：タツベイ）\n• レイドバトルに3回勝利 -> ラプラス出現 / プレミアムパス\n• レイドバトルに20回勝利 -> スーパーふかそうち×3（招待者：×5）\n• ポケモンを50匹捕まえる -> スーパーふかそうち×1（招待者：ダルマッカ）\n• タマゴを20個かえす -> ラッキー出現（招待者：モノズ）\n• 相棒におやつを50個あげる -> ふしぎなアメ×5（招待者：フカマル）\n• ナイススローを100回投げる -> カビゴン出現（招待者：スーパーふかそうち×2）\n• シャドウポケモンを20匹リトレーン -> プレミアムバトルパス×5（招待者：ふしぎなアメ×30）\n• GOロケット団リーダーに勝利 -> リザードンメガエナジー×50（双方）\n• ポケストップを30日連続で回す -> ミニリュウ出現（招待者：ワシボン）\n\nこれらすべての報酬ポケモンは、個体値10/10/10以上保証・逃走率0%（絶対に逃げない）仕様です！",
          "ru": "После активации кода открывается список заданий, которые выполняет приглашенный игрок. Награды получают ОБА тренера!\n\nГлавные квесты и награды для приглашенного:\n• Победить 3 агентов GO Rocket -> Поимка Чаризарда для обоих!\n• Выиграть 1 рейд -> 1× Премиум-пасс (пригласившему: Багон)\n• Выиграть 3 рейда -> Встреча с Лапрасом / Премиум-пасс\n• Выиграть 20 рейдов -> 3× Супер-инкубатора (пригласившему: 5×)\n• Поймать 50 покемонов -> 1× Супер-инкубатор (пригласившему: Дарумака)\n• Вылупить 20 яиц -> Встреча с Ченси (пригласившему: Дейно)\n• Дать покемону-помощнику 50 угощений -> 5× Rare Candy (пригласившему: Гибл)\n• Сделать 100 бросков Nice -> Встреча со Снорлаксом (пригласившему: 2× инкубатора)\n• Очистить 20 Shadow-покемонов -> 5× Премиум-пассов (пригласившему: 30× Rare Candy)\n• Победить лидера GO Rocket -> 50× Мега-энергии Чаризарда для обоих!\n• Крутить покестопы 30 дней подряд -> Встреча с Дратини (пригласившему: Раффлет)\n\nВсе покемоны за реферальные квесты имеют гарантированные IV от 10/10/10 и никогда не сбегают (0% шанс побега)!"
        },
        "tips": {
          "cs": [
            "Nezapomeňte odměny vyzvednout: Po splnění úkolu musíte jít do profilu přítele a klepnout na oranžově svítící tlačítko úkolu.",
            "Využijte Silver Pinap Berries: Jelikož odměnoví Pokémoni nemohou utéct, můžete bez rizika použít Silver nebo obyčejné Pinap Berries pro dvojnásobek candy."
          ],
          "en": [
            "Manual Claiming: Rewards do not auto-deposit; you must open your friend's profile and tap the illuminated milestone card.",
            "Use Silver Pinap Berries: Because referral encounters cannot flee (0% flee rate), always use Pinap Berries for maximum candy output."
          ],
          "ja": [
            "手動受け取りが必要：達成した報酬は自動付与されません。フレンドの個別プロフィール画面から受け取りボタンを押してください。",
            "ぎんのパイルのみ推奨：リファラル報酬のポケモンは逃走率0%のため、安心してパイルのみを使ってアメを2倍に増やしましょう。"
          ],
          "ru": [
            "Ручной забор наград: Награды не падают в сумку автоматически — зайдите в профиль друга и нажмите на выполненный квест.",
            "Используйте Pinap Berries: Покемоны из реферальных наград не могут убежать, поэтому смело удваивайте конфеты ягодами."
          ]
        }
      },
      {
        "id": "speedrun-and-optimization-tactics",
        "heading": {
          "cs": "4. Taktika pro bleskové splnění: Trik s 50 pamlsky a čištěním Rakeťáků",
          "en": "4. Speedrun Playbook: The 50 Treats Buddy Swap & Rocket Purification Tricks",
          "ja": "4. 最速クリア攻略：相棒交代「おやつ50個」裏技＆1000砂リトレーン術",
          "ru": "4. Тактика быстрого выполнения: Трюк с 50 угощениями и очисткой за 1000 пыли"
        },
        "content": {
          "cs": "Většinu milníků lze splnit během prvních 48 hodin pomocí chytrých herních mechanik:\n\n1. 50 pamlsků za 15 minut (Buddy Swap Trick):\nBěžně trvá vyhladovění jednoho Buddyho 3 hodiny. Hra vám ale umožňuje vyměnit Buddyho až 20× denně! Nastavte nového Buddyho, nakrmte ho 3 bobulemi, vyměňte za dalšího a postup opakujte. 17 výměn × 3 bobule = 51 pamlsků za méně než 20 minut!\n\n2. Levné čištění Rakeťáků (1 000 Stardustu):\nPro splnění úkolu na 20 očištěných Pokémonů neplýtvejte Stardustem na drahé Pokémony (3 000 až 5 000 dustu). Schovávejte si výhradně levné druhy, které stojí pouze 1 000 Stardustu a 1 candy: Zubat, Golbat, Pidgey, Rattata, Magikarp, Aron, Ducklett a Weedle. Ušetříte přes 40 000 Stardustu!\n\n3. Řetězení Raidů zdarma:\nZa 1 vyhraný raid dostanete zdarma 1 Premium Battle Pass. Za další úkoly dostanete dalších 8 passů. V kombinaci s denními oranžovými passy tak splníte milníky bez nákupu PokéCoinů za reálné peníze.",
          "en": "You can conquer the majority of referral milestones within the first 48 hours utilizing clever mechanics:\n\n1. 50 Treats in 15 Minutes (Buddy Swap Exploit):\nNormally a buddy takes 3 hours to get hungry. However, you can swap buddies 20 times per day! Set a buddy, feed it 3 berries, swap to the next, and repeat. 17 swaps × 3 berries = 51 treats completed in under 20 minutes!\n\n2. The 1,000 Stardust Purification Shortcut:\nDo not waste 3,000 to 5,000 Stardust purifying expensive Pokémon. Hoard 1,000-Stardust shadows: Zubat, Golbat, Pidgey, Rattata, Magikarp, Aron, Ducklett, and Weedle. You will save 40,000+ Stardust while unlocking 30 Rare Candies and 5 Premium Passes!\n\n3. Free Raid Chaining:\nWinning your first raid with a free daily pass rewards 1 Premium Pass. Clearing subsequent milestones grants 8 additional Premium Passes, funding your raid progression 100% free-to-play.",
          "ja": "ゲームの仕様を理解していれば、大半のマイルストーンは最初の48時間で達成可能です：\n\n1. 相棒交代裏技（おやつ50個を20分で達成）：\n1匹の相棒のお腹が空くまで待つと数日かかりますが、相棒は1日20回まで交代可能です。新しい相棒にしてきのみを3個与え、すぐ別のポケモンに交代を17回繰り返すだけで、わずか20分でおやつ50個タスクが完了します！\n\n2. 1000砂リトレーン節約術：\nリトレーン20匹タスクで3000〜5000のほしのすなを使うのは厳禁です。コスト1000砂＆アメ1個のポケモン（ズバット、ゴルバット、ポッポ、コラッタ、コイキング、ココドラ、コアルヒー、ビードル）だけをリトレーンすれば、4万以上の砂を節約できます！\n\n3. 無料レイドパスの連鎖：\n毎日の無料パスでレイドに1回勝つとプレミアムパスが1枚戻り、他のタスクでも計8枚のプレミアムパスが手に入るため、課金ゼロで20回レイドを攻略できます。",
          "ru": "Большую часть квестов можно закрыть за 48 часов с помощью простых хитростей:\n\n1. 50 угощений за 15 минут (Трюк со сменой бадди):\nОбычно бадди становится голодным раз в 3 часа. Но игра позволяет менять бадди до 20 раз в день! Ставьте покемона, кормите 3 ягодами, меняйте на следующего. 17 замен × 3 ягоды = 51 угощение за 20 минут!\n\n2. Очистка за 1 000 пыли:\nНе тратьте по 3000–5000 пыли на очистку. Очищайте только дешевых теневых покемонов за 1000 пыли: Зубат, Пиджи, Раттата, Мэджикарп, Арон, Даклетт, Видл. Это сбережет вам более 40 000 пыли!\n\n3. Бесплатные рейды по цепочке:\nПервый бесплатный ежедневный рейд дает вам 1 Премиум-пасс. Другие квесты суммарно дают еще 8 пассов, что позволяет полностью закрыть рейд-миссии без доната."
        },
        "tips": {
          "cs": [
            "Super Incubator na 2km vejce: První Super Incubator získejte za 50 chycení a nasaďte ho na 2km vajíčko — vylíhne se už po 1,33 km chůze!",
            "Aktivujte Adventure Sync: Zapněte v nastavení synchronizaci s Apple Zdraví / Google Health Connect pro započítávání kroků i při vypnuté hře."
          ],
          "en": [
            "Super Incubator on 2km Eggs: Use the free incubator from 50 catches on a 2km egg to hatch it in just 1.33 km!",
            "Enable Adventure Sync: Turn on Adventure Sync in settings so your steps count toward egg hatching even when the app is completely closed."
          ],
          "ja": [
            "スーパーふかそうちは2kmタマゴに：50匹捕獲で貰えるふかそうちを2kmタマゴに使うと、わずか1.33kmで孵化できます！",
            "いつでも冒険モードを必ずONに：端末のヘルスケア連携により、通勤や買い物中の歩行でも自動でタマゴが割れます。"
          ],
          "ru": [
            "Супер-инкубатор на 2-км яйца: Получите инкубатор за 50 поимок и положите 2-км яйцо — оно вылупится всего за 1.33 км!",
            "Включите Adventure Sync: Активируйте синхронизацию в настройках игры, чтобы километры засчитывались даже при закрытом приложении."
          ]
        }
      },
      {
        "id": "friendship-xp-and-lucky-egg-stacking",
        "heading": {
          "cs": "5. Maximalizace XP: Stohování odměn s Lucky Egg a úrovně přátelství",
          "en": "5. XP Maximization: Friendship Tiers & Lucky Egg Stacking",
          "ja": "5. 経験値（XP）最大化術：しあわせタマゴと親友ボーナスの重ねがけ",
          "ru": "5. Максимизация XP: Уровни дружбы и удвоение опыта с Lucky Egg"
        },
        "content": {
          "cs": "Propojení přes doporučovací kód z vás a zvoucího hráče automaticky udělá přátele ve hře. To představuje nejrychlejší cestu k získání stovek tisíc XP bez jakéhokoli grindování:\n\n• Dobří přátelé (1 den): 3 000 XP (6 000 XP s Lucky Egg)\n• Skvělí přátelé (7 dní): 10 000 XP (20 000 XP s Lucky Egg)\n• Velcí přátelé (30 dní): 50 000 XP (100 000 XP s Lucky Egg)\n• Nejlepší přátelé (90 dní): 100 000 XP (200 000 XP s Lucky Egg)\n\nDokonalá synergie na 30. den:\nÚkol „Navštiv PokéStop 30 dní v řadě“ se dokonale kryje s dosažením milníku Ultra Friends (Velcí přátelé). Domluvte se na 30. den, zapněte Lucky Egg, otevřete dárek a vyzvedněte si všechny nasbírané odměny z úkolů pod jedním 2× násobičem XP. Během jediného měsíce získáte přes 500 000 XP!",
          "en": "Linking via a referral code automatically establishes an active in-game friendship. This is the single fastest leveling engine in the game:\n\n• Good Friends (1 Day): 3,000 XP (6,000 XP with Lucky Egg)\n• Great Friends (7 Days): 10,000 XP (20,000 XP with Lucky Egg)\n• Ultra Friends (30 Days): 50,000 XP (100,000 XP with Lucky Egg)\n• Best Friends (90 Days): 100,000 XP (200,000 XP with Lucky Egg)\n\nThe Day 30 Synchronization Masterstroke:\nThe milestone 'Visit a PokéStop 30 days in a row' aligns exactly with reaching Ultra Friends at Day 30. Coordinate with your referring friend, pop a Lucky Egg, open the daily gift, and claim all stored milestone rewards under 2× XP for a burst of 500,000+ XP in under 30 minutes!",
          "ja": "招待コードを入力すると自動的にフレンドリストに追加されます。これはゲーム内で最も効率よくXP（経験値）を稼ぐ最強の手段です：\n\n• 仲良し（1日）：3,000 XP（しあわせタマゴ時：6,000 XP）\n• 最高の相棒/親友（7日）：10,000 XP（タマゴ時：20,000 XP）\n• 大親友（30日）：50,000 XP（タマゴ時：100,000 XP）\n• 大親友（90日）：100,000 XP（タマゴ時：200,000 XP）\n\n30日目の完璧なタイミング：\n「ポケストップを30日連続で回す」タスクの完了日は、ちょうど「大親友（Ultra Friends）」に到達するタイミングと一致します。30日目に連絡を取り合い、しあわせタマゴを使ってギフトを開封＆マイルストーン報酬を一気に回収すれば、一瞬で50万〜100万XP以上を荒稼ぎできます！",
          "ru": "Реферальная связь автоматически добавляет вас в список друзей. Это самый быстрый способ прокачать уровень в игре:\n\n• Good Friends (1 день): 3 000 XP (6 000 с Lucky Egg)\n• Great Friends (7 дней): 10 000 XP (20 000 с Lucky Egg)\n• Ultra Friends (30 дней): 50 000 XP (100 000 с Lucky Egg)\n• Best Friends (90 дней): 100 000 XP (200 000 с Lucky Egg)\n\nСинхронизация на 30-й день:\nКвест «Крутить покестопы 30 дней подряд» идеально совпадает с достижением статуса Ultra Friends. На 30-й день включите Lucky Egg, откройте подарок и заберите все накопленные награды под х2 опытом — вы получите более 500 000 XP за раз!"
        },
        "tips": {
          "cs": [
            "Plánujte na Community Day: Pokud máte před dosažením milníku přátelství, počkejte na začátek Community Day nebo Raid Hour, kdy budete mít Lucky Egg stejně zapnuté.",
            "Otevřete dárek jako první: Hráč, který otevírá dárek pro posun přátelství, má plnou kontrolu nad časem aktivace Lucky Egg."
          ],
          "en": [
            "Stack on Community Days: Time your friendship tier advancements during Community Days or Raid Hours when you naturally run Lucky Eggs.",
            "Gift Opening Control: The trainer who opens the friendship-advancing gift controls the exact timing of the XP trigger."
          ],
          "ja": [
            "コミュニティ・デイに合わせる：親友ボーナス直前で調整し、どうせしあわせタマゴを使うコミュニティ・デイ当日に合わせると無駄がありません。",
            "ギフトを開ける側が主導権：最後の日数を進めるギフトを開封する側が、タマゴを使うタイミングを完全にコントロールできます。"
          ],
          "ru": [
            "Синхронизируйте с Community Day: Завершайте уровни дружбы во время ивентов, когда у вас уже активировано яйцо удачи.",
            "Контроль за открытием: Тот игрок, который открывает подарок для повышения уровня дружбы, выбирает точный момент для старта Lucky Egg."
          ]
        }
      }
    ]
  }
];
