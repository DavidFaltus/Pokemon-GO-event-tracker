import type { Language } from './translations';

export type LegalPageType = 'privacy' | 'about' | 'terms' | 'disclaimer' | 'contact';

export interface LegalSection {
  id: string;
  title: Record<Language, string>;
  content: Record<Language, string>;
  listItems?: Record<Language, string[]>;
}

export interface LegalPageInfo {
  type: LegalPageType;
  slug: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  icon: 'ShieldCheck' | 'Info' | 'FileText' | 'AlertTriangle' | 'Mail';
  lastUpdated: string;
  sections: LegalSection[];
}

export const LEGAL_PAGES_DATA: Record<LegalPageType, LegalPageInfo> = {
  privacy: {
    type: 'privacy',
    slug: 'privacy',
    title: {
      cs: 'Zásady ochrany osobních údajů (Privacy Policy)',
      en: 'Privacy Policy',
      ja: 'プライバシーポリシー',
      ru: 'Политика конфиденциальности',
    },
    subtitle: {
      cs: 'Informace o tom, jak pogoevents.app respektuje vaše soukromí, nakládá s daty a jaká máte práva.',
      en: 'Information on how pogoevents.app respects your privacy, handles data, and your rights.',
      ja: 'pogoevents.appがユーザーのプライバシーを尊重し、データをどのように扱うかに関する情報。',
      ru: 'Информация о том, как pogoevents.app соблюдает конфиденциальность и обрабатывает данные.',
    },
    icon: 'ShieldCheck',
    lastUpdated: '2026-09-27',
    sections: [
      {
        id: 'no-personal-data',
        title: {
          cs: '1. Sběr a zpracování osobních údajů',
          en: '1. Collection and Processing of Personal Data',
          ja: '1. 個人情報の収集と処理',
          ru: '1. Сбор и обработка персональных данных',
        },
        content: {
          cs: 'Webová aplikace PoGo Events (pogoevents.app) nesbírá, neukládá ani nepředává žádné osobní identifikační údaje (PII), jako jsou celá jména, rodná čísla, telefonní čísla nebo hesla. Používání aplikace nevyžaduje žádnou registraci ani přihlášení.',
          en: 'The PoGo Events web application (pogoevents.app) does not collect, store, or transmit any personally identifiable information (PII) such as full legal names, phone numbers, or passwords. Using the app requires no registration or user login.',
          ja: 'PoGo Events（pogoevents.app）は、氏名、電話番号、パスワードなどの個人を特定できる情報（PII）を収集・保存・送信しません。本アプリの利用に会員登録やログインは一切不要です。',
          ru: 'Веб-приложение PoGo Events (pogoevents.app) не собирает, не сохраняет и не передает персональные идентификационные данные (PII), такие как имена, телефоны или пароли. Для использования приложения не требуется регистрация.',
        },
      },
      {
        id: 'local-storage',
        title: {
          cs: '2. Lokální ukládání dat (LocalStorage)',
          en: '2. Local Storage of User Preferences',
          ja: '2. ローカルストレージ（LocalStorage）',
          ru: '2. Локальное хранилище данных (LocalStorage)',
        },
        content: {
          cs: 'Veškeré uživatelské volby a konfigurace jsou uloženy výhradně lokálně ve vašem internetovém prohlížeči (prostřednictvím LocalStorage). Tato data nikdy neopouštějí váš prohlížeč a nejsou odesílána na naše servery. Ukládají se následující údaje:',
          en: 'All user preferences and UI configurations are stored exclusively locally inside your browser (via LocalStorage). This data never leaves your device and is not sent to external servers. The following information is stored:',
          ja: 'ユーザー設定および環境設定は、お使いのブラウザ内（LocalStorage）にのみローカル保存されます。これらのデータがサーバーに送信されることはありません。以下の情報が含まれます。',
          ru: 'Все пользовательские настройки хранятся исключительно локально в вашем браузере (через LocalStorage). Эти данные никогда не покидают ваше устройство:',
        },
        listItems: {
          cs: [
            'Jazyková preference (čeština, angličtina, japonština, ruština)',
            'Preference tmavého / světlého režimu zobrazení (Dark / Light Theme)',
            'Nastavení časového pásma pro synchronizaci raidů a eventů',
            'Seznam splněných či odškrtnutých událostí a úkolů',
            'Uživatelské filtry pro vyhledávání Pokémonů a raidových bossů',
          ],
          en: [
            'Language preference (Czech, English, Japanese, Russian)',
            'Dark / Light theme display mode preference',
            'Timezone selection for accurate event & raid countdown sync',
            'Completed or checked events checklist',
            'Custom search strings and filter generator preferences',
          ],
          ja: [
            '言語設定（日本語、英語、チェコ語、ロシア語）',
            'ダーク／ライトテーマの表示設定',
            'イベントおよびレイドのカウントダウン用タイムゾーン設定',
            'チェック済みのイベントおよびタスクリスト',
            '検索フィルターおよびカウンター設定',
          ],
          ru: [
            'Выбранный язык (чешский, английский, японский, русский)',
            'Выбор темной / светлой темы оформления',
            'Выбранный часовой пояс для точного отсчета рейдов и событий',
            'Отмеченные выполненные события и квесты',
            'Пользовательские фильтры поиска покемонов',
          ],
        },
      },
      {
        id: 'analytics',
        title: {
          cs: '3. Webová analytika a soubory Cookie',
          en: '3. Web Analytics & Cookie Notice',
          ja: '3. ウェブ解析およびクッキー',
          ru: '3. Веб-аналитика и файлы cookie',
        },
        content: {
          cs: 'Pro vyhodnocování stability, rychlosti načítání a souhrnné návštěvnosti využíváme službu Google Analytics v anonymizovaném režimu bez sledování osobních profilů. Prohlížeč může ukládat technické soubory cookie nezbytné pro fungování Edge CDN sítě a mezipaměti. Ukládání souborů cookie můžete kdykoliv zakázat v nastavení svého internetového prohlížeče.',
          en: 'To evaluate system uptime, loading performance, and aggregate traffic patterns, we utilize Google Analytics in an anonymized mode without personal profiling. Your browser may also store technical cookies essential for Edge CDN caching. You may disable or clear cookies in your browser settings at any time.',
          ja: '稼働率、読み込み速度、アクセス動向を把握するため、個人プロファイリングを行わない匿名化されたGoogle Analyticsを使用しています。Edge CDNキャッシュに必要な技術的クッキーが保存される場合があります。クッキーはブラウザ設定でいつでも無効化できます。',
          ru: 'Для оценки стабильности и скорости загрузки мы используем Google Analytics в анонимизированном режиме без профилирования. Браузер может сохранять технические файлы cookie для Edge CDN. Вы можете отключить cookie в настройках браузера.',
        },
      },
      {
        id: 'rights-and-gdpr',
        title: {
          cs: '4. Práva uživatelů a GDPR',
          en: '4. User Rights & GDPR Compliance',
          ja: '4. ユーザーの権利とGDPR遵守',
          ru: '4. Права пользователей и регламент GDPR',
        },
        content: {
          cs: 'V souladu s Nařízením Evropského parlamentu a Rady (EU) 2016/679 (GDPR) a dalšími platnými předpisy mají uživatelé právo na informace o zpracování dat. Jelikož neukládáme žádné osobní identifikátory na serverech, vymazání všech lokálních dat můžete provést jednoduše vymazáním mezipaměti a LocalStorage ve vašem prohlížeči.',
          en: 'In compliance with European Regulation (EU) 2016/679 (GDPR) and related data protection regulations, users retain the right to information regarding data processing. Because no personal data is stored on external servers, you can erase all local data at any time by clearing your browser cache and LocalStorage.',
          ja: '欧州一般データ保護規則（GDPR）および関連法規に基づき、ユーザーにはデータ処理に関する権利があります。当サービスのサーバーに個人データは保存されないため、ブラウザのキャッシュとLocalStorageを削除することで、すべてのローカルデータを消去できます。',
          ru: 'В соответствии с GDPR (EU 2016/679) пользователи имеют право на защиту данных. Поскольку мы не храним персональные данные на серверах, вы можете удалить все локальные данные, очистив кэш и LocalStorage в браузере.',
        },
      },
    ],
  },
  about: {
    type: 'about',
    slug: 'about',
    title: {
      cs: 'O projektu PoGo Events',
      en: 'About PoGo Events',
      ja: 'PoGo Events プロジェクトについて',
      ru: 'О проекте PoGo Events',
    },
    subtitle: {
      cs: 'Nezávislá komunitní PWA aplikace a real-time tracker pro trenéry hry Pokémon GO.',
      en: 'Independent community PWA application and real-time tracker for Pokémon GO trainers worldwide.',
      ja: '世界中のPokémon GOトレーナーのための非公式コミュニティPWAおよびリアルタイムトラッカー。',
      ru: 'Независимое фанатское PWA-приложение и трекер в реальном времени для тренеров Pokémon GO.',
    },
    icon: 'Info',
    lastUpdated: '2026-09-27',
    sections: [
      {
        id: 'mission',
        title: {
          cs: 'Mise a vize projektu',
          en: 'Mission & Vision',
          ja: 'プロジェクトのミッションと理念',
          ru: 'Миссия и концепция проекта',
        },
        content: {
          cs: 'PoGo Events vznikl s cílem poskytnout komunitě hráčů Pokémon GO nejrychlejší, nejpřehlednější a datově nejúspornější nástroj pro sledování herních událostí. Aplikace sjednocuje kalendář událostí, raidové bossy s jejich 100% IV hodnotami a nejlepšími countery, sestavy Team GO Rocket, líhnutí z vajec, úkoly polního výzkumu a generátor herních filtrů do jednoho intuitivního rozhraní.',
          en: 'PoGo Events was built to provide the Pokémon GO community with the fastest, cleanest, and most bandwidth-efficient companion tool available. The platform consolidates live event schedules, raid bosses with 100% IV appraisal ceilings and top counters, Team GO Rocket lineups, egg hatches, field research tasks, and search string filter generators into a unified, responsive interface.',
          ja: 'PoGo Eventsは、Pokémon GOコミュニティに向けて最速・軽量・高機能なコンパニオンツールを提供することを目的に開発されました。リアルタイムのイベントスケジュール、レイドボスと100%個体値（100IV）情報、GOロケット団の最新構成、タマゴ孵化、フィールドリサーチ、検索文字列フィルタージェネレーターを統合しています。',
          ru: 'PoGo Events создан для того, чтобы предоставить сообществу Pokémon GO самый быстрый, удобный и легкий трекер. Платформа объединяет расписание событий, рейдовых боссов с параметрами 100% IV, составы Команды GO Ракета, вылупление яиц, полевые квесты и генератор поисковых фильтров.',
        },
      },
      {
        id: 'technology',
        title: {
          cs: 'Architektura a technologie',
          en: 'Architecture & Technology',
          ja: 'アーキテクチャとテクノロジー',
          ru: 'Архитектура и технологии',
        },
        content: {
          cs: 'Web je vybudován na moderním stacku: Next.js 16 (App Router), React 19, TypeScript a Dark Glassmorphic designovém systému. Všechny klíčové stránky jsou předgenerovány pomocí statického generování (SSG) a distribuovány přes globální Edge CDN síť s bleskovou odezvou (TTFB pod 50 ms). Aplikace plně podporuje instalaci jako PWA na mobilní telefony se systémem iOS i Android.',
          en: 'The platform is powered by a modern stack: Next.js 16 (App Router), React 19, TypeScript, and a high-contrast Dark Glassmorphic design system. Core pages are pre-rendered via Static Site Generation (SSG) and served over a global Edge CDN with sub-50ms TTFB latency worldwide. Full Progressive Web App (PWA) support enables home-screen installation on both iOS and Android.',
          ja: '当サイトはNext.js 16（App Router）、React 19、TypeScript、およびダークグラスモーフィズムデザインシステムを採用しています。主要ページは静的サイト生成（SSG）され、グローバルEdge CDN経由で50ミリ秒未満の高速レスポンスを実現しています。iOSおよびAndroidでのPWAインストールに対応しています。',
          ru: 'Сайт построен на Next.js 16 (App Router), React 19, TypeScript и темном дизайне Glassmorphism. Страницы генерируются статически (SSG) и доставляются через Edge CDN с задержкой менее 50 мс. Поддерживается установка PWA на iOS и Android.',
        },
      },
      {
        id: 'data-sources',
        title: {
          cs: 'Zdroje dat a synchronizace',
          en: 'Data Sources & Synchronization',
          ja: 'データソースと同期',
          ru: 'Источники данных и синхронизация',
        },
        content: {
          cs: 'Veškeré časové údaje a rozvrhy událostí jsou automaticky konvertovány do vašeho lokálního časového pásma zjištěného z vašeho zařízení. Data o událostech, raidových bossech a líhnutí jsou průběžně agregována a validována z ověřených komunitních zdrojů (např. ScrapedDuck, LeekDuck a oficiální Niantic blogy).',
          en: 'All event schedules and raid timers are automatically converted to your local device timezone. Game data, raid lineups, and egg pools are continuously aggregated and verified against established community resources (such as ScrapedDuck, LeekDuck, and official Niantic announcements).',
          ja: 'すべてのイベント日程とレイドタイマーは、端末の現地タイムゾーンに自動変換されます。データはScrapedDuck、LeekDuck、Niantic公式発表などの検証済みコミュニティリソースから定期的に同期されています。',
          ru: 'Все временные рамки событий автоматически переводятся в локальный часовой пояс вашего устройства. Данные синхронизируются с проверенными источниками сообщества (ScrapedDuck, LeekDuck, анонсы Niantic).',
        },
      },
    ],
  },
  terms: {
    type: 'terms',
    slug: 'terms',
    title: {
      cs: 'Podmínky použití (Terms of Use)',
      en: 'Terms of Use',
      ja: '利用規約',
      ru: 'Условия использования',
    },
    subtitle: {
      cs: 'Pravidla pro používání webové aplikace a omezení odpovědnosti za herní data.',
      en: 'Rules governing the usage of this web utility and limitations of data accuracy liability.',
      ja: '当ウェブツールの利用規約およびデータ正確性に関する免責事項。',
      ru: 'Правила использования веб-сервиса и ограничение ответственности за точность данных.',
    },
    icon: 'FileText',
    lastUpdated: '2026-09-27',
    sections: [
      {
        id: 'acceptance',
        title: {
          cs: '1. Přijetí podmínek',
          en: '1. Acceptance of Terms',
          ja: '1. 規約への同意',
          ru: '1. Принятие условий',
        },
        content: {
          cs: 'Vstupem do webové aplikace pogoevents.app a jejím používáním vyjadřujete svůj úplný souhlas s těmito podmínkami použití. Pokud s těmito podmínkami nesouhlasíte, nepoužívejte tuto aplikaci.',
          en: 'By accessing and utilizing the pogoevents.app web utility, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please discontinue using the service.',
          ja: 'pogoevents.appにアクセスし利用することにより、利用者は本利用規約に同意したものとみなされます。規約に同意されない場合は、本サービスの利用をお控えください。',
          ru: 'Используя веб-приложение pogoevents.app, вы подтверждаете свое согласие с настоящими Условиями использования. Если вы не согласны, пожалуйста, прекратите использование сервиса.',
        },
      },
      {
        id: 'accuracy-disclaimer',
        title: {
          cs: '2. Informační povaha a přesnost herních dat',
          en: '2. Informational Purpose & Data Accuracy',
          ja: '2. 情報の性質と正確性',
          ru: '2. Информационный характер и точность данных',
        },
        content: {
          cs: 'Veškerá data o herních událostech, časech raidů, slabostech, doporučených counterech a 100% IV hodnotách jsou poskytována výhradně pro informační a vzdělávací účely ve stavu „tak, jak jsou“ (as is). Přestože usilujeme o maximální přesnost a okamžitou synchronizaci, neručíme za případné neohlášené změny rozvrhů, technické výpadky nebo zásahy do herních mechanik ze strany vývojáře hry Niantic, Inc.',
          en: 'All event schedules, raid timers, type effectiveness charts, counter recommendations, and 100% IV appraisal figures are provided strictly for informational and reference purposes on an "as is" basis. While we strive for absolute accuracy, we cannot guarantee against unannounced schedule shifts, game bugs, or server disruptions by Niantic, Inc.',
          ja: 'イベント日程、レイド時間、タイプ相性、対策ポケモン、100%個体値データは、すべて参考情報として「現状有姿（as is）」で提供されます。正確性の維持に努めていますが、Niantic, Inc.による予告のない仕様変更や変更について一切の保証はいたしかねます。',
          ru: 'Все данные об ивентах, рейдах, слабостях и 100% IV предоставляются исключительно в информационных целях по принципу «как есть». Мы не несем ответственности за внезапные изменения в игре разработчиками Niantic, Inc.',
        },
      },
      {
        id: 'fair-use',
        title: {
          cs: '3. Pravidla chování a zákaz zneužití',
          en: '3. Acceptable Use & API Integrity',
          ja: '3. 適正利用とサーバー保護',
          ru: '3. Правила использования и защита серверов',
        },
        content: {
          cs: 'Uživatelé se zavazují nepodnikat žádné kroky, které by mohly narušit dostupnost, stabilitu nebo bezpečnost aplikace. Je přísně zakázáno:',
          en: 'Users agree not to take any action that could compromise the availability, security, or performance of the platform. The following activities are strictly prohibited:',
          ja: '利用者は、プラットフォームの可用性、セキュリティ、安定性を損なう行為を行わないことに同意します。以下の行為は固く禁止されています。',
          ru: 'Пользователи обязуются не нарушать стабильность и безопасность сервиса. Категорически запрещено:',
        },
        listItems: {
          cs: [
            'Provádět automatizované útoky na odepření služby (DoS / DDoS)',
            'Nadměrně přetěžovat backendové API skripty bez dodržování limitů (rate limiting)',
            'Obcházet bezpečnostní mechanismy aplikace nebo manipulovat se zdrojovým kódem',
          ],
          en: [
            'Executing automated denial-of-service (DoS / DDoS) attacks or intentional flooding',
            'Overloading backend API endpoints without respecting rate limits and caching headers',
            'Attempting to reverse-engineer, bypass security tokens, or manipulate internal routes',
          ],
          ja: [
            'DoS/DDoS攻撃や過剰なリクエストによるサーバーへの負荷行為',
            'レート制限を無視したAPIエンドポイントへの不正アクセスやスクレイピング',
            'セキュリティ機構の回避や内部コードの改ざんの試み',
          ],
          ru: [
            'Проведение атак типа DoS / DDoS или искусственная перегрузка серверов',
            'Злоупотребление API без соблюдения лимитов запросов',
            'Попытки взлома или обхода систем безопасности',
          ],
        },
      },
    ],
  },
  disclaimer: {
    type: 'disclaimer',
    slug: 'disclaimer',
    title: {
      cs: 'Právní doložka & Ochranné známky (Disclaimer)',
      en: 'Legal Disclaimer & Copyright',
      ja: '免責事項・知的財産権',
      ru: 'Правовая оговорка и авторские права',
    },
    subtitle: {
      cs: 'Informace o neoficiálním fanouškovském statusu projektu a ochraně duševního vlastnictví.',
      en: 'Information on the unofficial fan nature of this project and trademark acknowledgements.',
      ja: '本プロジェクトの非公式ファンツールとしての性質および商標に関する告知。',
      ru: 'Информация о неофициальном фанатском статусе проекта и товарных знаках.',
    },
    icon: 'AlertTriangle',
    lastUpdated: '2026-09-27',
    sections: [
      {
        id: 'fan-status',
        title: {
          cs: 'Neoficiální fanouškovský status',
          en: 'Unofficial Community Guide Status',
          ja: '非公式ファンコミュニティガイド',
          ru: 'Неофициальный статус проекта',
        },
        content: {
          cs: 'PoGo Events (pogoevents.app) je nezávislá, bezplatná komunitní aplikace vytvořená fanoušky hry Pokémon GO pro hráče po celém světě. Tato webová stránka není nijak přidružena, schválena, sponzorována ani provozována společnostmi Niantic, Inc., The Pokémon Company, Nintendo Co., Ltd., Creatures Inc. ani Game Freak Inc.',
          en: 'PoGo Events (pogoevents.app) is an independent, non-commercial fan application built by passionate trainers for the worldwide Pokémon GO community. This service is not affiliated with, endorsed, sponsored, or supported by Niantic, Inc., The Pokémon Company, Nintendo Co., Ltd., Creatures Inc., or Game Freak Inc.',
          ja: 'PoGo Events（pogoevents.app）は、世界中のトレーナーのために作成された非公式のファンメイドツールです。本サイトは、Niantic, Inc.、株式会社ポケモン、任天堂株式会社、株式会社クリーチャーズ、株式会社ゲームフリークとは一切関係ありません。',
          ru: 'PoGo Events (pogoevents.app) — это независимое фанатское веб-приложение. Сервис никак не связан, не спонсируется и не поддерживается Niantic, Inc., The Pokémon Company, Nintendo Co., Ltd., Creatures Inc. или Game Freak Inc.',
        },
      },
      {
        id: 'trademarks',
        title: {
          cs: 'Ochranné známky a autorská práva',
          en: 'Trademarks & Fair Use Notice',
          ja: '商標およびフェアユースの告知',
          ru: 'Товарные знаки и добросовестное использование',
        },
        content: {
          cs: 'Pokémon a názvy jednotlivých postav Pokémon jsou registrovanými ochrannými známkami společností Nintendo, Creatures Inc., GAME FREAK inc. a Niantic, Inc. Veškeré ilustrace, názvy, herní termíny a grafika zobrazené v této aplikaci slouží výhradně k identifikaci, referenčním účelům a popisu herních prvků v souladu se zásadami oprávněného užití (Fair Use). Veškerá práva náleží jejich právoplatným vlastníkům.',
          en: 'Pokémon and Pokémon character names are registered trademarks of Nintendo, Creatures Inc., GAME FREAK inc., and Niantic, Inc. All sprites, official artworks, character names, and in-game terms displayed on this platform are used solely for identification, reference, and informational commentary under applicable Fair Use doctrines. All copyrights belong to their respective owners.',
          ja: 'ポケットモンスター・ポケモン・Pokémonおよびポケモンキャラクター名は、任天堂・クリーチャーズ・ゲームフリーク・Nianticの登録商標です。掲載されている画像、名称、ゲーム用語は、識別および解説目的でのみ引用されており、権利は各権利所有者に帰属します。',
          ru: 'Pokémon и имена персонажей являются товарными знаками Nintendo, Creatures Inc., GAME FREAK inc. и Niantic, Inc. Все изображения и игровые термины используются исключительно в справочных и информационных целях (Fair Use).',
        },
      },
      {
        id: 'community-credits',
        title: {
          cs: 'Poděkování komunitním zdrojům',
          en: 'Community Attributions & Acknowledgements',
          ja: 'コミュニティへの謝辞とクレジット',
          ru: 'Благодарности сообществу',
        },
        content: {
          cs: 'Velké uznání a poděkování patří komunitním projektům Leek Duck (leekduck.com), ScrapedDuck a PokeAPI za jejich neúnavnou práci při shromažďování a strukturování otevřených dat pro celou komunitu Pokémon GO.',
          en: 'Special thanks and full attribution go to community resources including Leek Duck (leekduck.com), ScrapedDuck, and PokeAPI for their tireless efforts in cataloging open game data for trainers globally.',
          ja: 'オープンデータの収集と整理にご尽力いただいているLeek Duck（leekduck.com）、ScrapedDuck、PokeAPIなどのコミュニティプロジェクトに心より感謝申し上げます。',
          ru: 'Особая благодарность проектам Leek Duck (leekduck.com), ScrapedDuck и PokeAPI за огромную работу по сбору и систематизации данных для игроков Pokémon GO.',
        },
      },
    ],
  },
  contact: {
    type: 'contact',
    slug: 'contact',
    title: {
      cs: 'Kontakt a Podpora (Contact & Support)',
      en: 'Contact & Support',
      ja: 'お問い合わせ・サポート',
      ru: 'Контакты и поддержка',
    },
    subtitle: {
      cs: 'Máte dotaz, návrh na zlepšení nebo hlášení chyby? Rádi od vás uslyšíme.',
      en: 'Have a question, feature proposal, or bug report? We would love to hear from you.',
      ja: 'ご質問、機能のご提案、バグの報告など、お気軽にお問い合わせください。',
      ru: 'Есть вопрос, предложение по улучшению или отчет об ошибке? Свяжитесь с нами.',
    },
    icon: 'Mail',
    lastUpdated: '2026-09-27',
    sections: [
      {
        id: 'direct-contact',
        title: {
          cs: 'Přímý kontakt',
          en: 'Direct Inquiries',
          ja: '直接のお問い合わせ',
          ru: 'Прямая связь',
        },
        content: {
          cs: 'Pokud jste narazili na technickou chybu, máte nápad na nový nástroj nebo potřebujete vyřešit záležitost týkající se ochrany údajů, můžete se obrátit přímo na náš tým prostřednictvím oficiálního e-mailu:',
          en: 'For bug reports, feature requests, data accuracy questions, or privacy inquiries, feel free to contact our development team via our official email address:',
          ja: 'バグ報告、新機能のご要望、データの修正、プライバシーに関するお問い合わせは、以下の公式メールアドレスまでご連絡ください。',
          ru: 'Если вы обнаружили ошибку, хотите предложить новую функцию или у вас есть вопросы по конфиденциальности, напишите нам:',
        },
      },
      {
        id: 'social-channels',
        title: {
          cs: 'Komunitní kanály a sociální sítě',
          en: 'Community & Social Channels',
          ja: '公式SNS・コミュニティ',
          ru: 'Социальные сети и сообщество',
        },
        content: {
          cs: 'Sledujte aktuální infografiky a herní tipy také na našich oficiálních profilech na sociálních sítích:',
          en: 'Follow our latest infographics, event alerts, and trainer tips across our social channels:',
          ja: '最新のインフォグラフィックやイベント速報は公式SNSでも発信しています。',
          ru: 'Следите за свежими инфографиками и новостями на наших страницах в соцсетях:',
        },
        listItems: {
          cs: [
            'Instagram: @pogoevents (novinky, infografiky a rychlé alerty)',
            'TikTok: @pogoevents2 (krátké video průvodce a tipy)',
          ],
          en: [
            'Instagram: @pogoevents (news, infographics, and instant alerts)',
            'TikTok: @pogoevents2 (short video guides and battle strategies)',
          ],
          ja: [
            'Instagram: @pogoevents（ニュース、最新インフォグラフィック）',
            'TikTok: @pogoevents2（攻略動画・ショートガイド）',
          ],
          ru: [
            'Instagram: @pogoevents (новости, инфографика и алерты)',
            'TikTok: @pogoevents2 (видеогайды и советы)',
          ],
        },
      },
    ],
  },
};
