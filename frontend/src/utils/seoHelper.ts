import type { Language } from '@/data/translations';

export const SITE_BASE_URL = 'https://pogoevents.app';
export const PUBLISHER_LOGO_URL = 'https://pogoevents.app/logo-icon-1080.png';
export const DEFAULT_OG_IMAGE_URL = 'https://pogoevents.app/logo-banner.jpg';

/**
 * Generates standardized Next.js Metadata alternates with canonical, all 4 languages (cs, en, ja, ru),
 * x-default (pointing to /en/...), and optional Markdown alternate for GEO / AI agents.
 */
export function buildAlternates(lang: Language, pathSuffix: string = '', markdownEndpoint?: string) {
  const normalizedSuffix = pathSuffix ? (pathSuffix.startsWith('/') ? pathSuffix : `/${pathSuffix}`) : '';

  const alternates: {
    canonical: string;
    languages: Record<string, string>;
    types?: Record<string, string>;
  } = {
    canonical: `${SITE_BASE_URL}/${lang}${normalizedSuffix}`,
    languages: {
      cs: `${SITE_BASE_URL}/cs${normalizedSuffix}`,
      en: `${SITE_BASE_URL}/en${normalizedSuffix}`,
      ja: `${SITE_BASE_URL}/ja${normalizedSuffix}`,
      ru: `${SITE_BASE_URL}/ru${normalizedSuffix}`,
      'x-default': `${SITE_BASE_URL}/en${normalizedSuffix}`,
    },
  };

  if (markdownEndpoint) {
    alternates.types = {
      'text/markdown': markdownEndpoint.startsWith('http')
        ? markdownEndpoint
        : `${SITE_BASE_URL}${markdownEndpoint.startsWith('/') ? '' : '/'}${markdownEndpoint}`,
    };
  }

  return alternates;
}

export const BREADCRUMB_LABELS: Record<
  'home' | 'events' | 'raids' | 'rocket' | 'guides' | 'rankings' | 'types' | 'friends' | 'filter' | 'download' | 'privacy' | 'terms' | 'settings',
  Record<Language, string>
> = {
  home: {
    cs: 'Domů',
    en: 'Home',
    ja: 'ホーム',
    ru: 'Главная',
  },
  events: {
    cs: 'Události',
    en: 'Events',
    ja: 'イベント',
    ru: 'События',
  },
  raids: {
    cs: 'Raid Bossové',
    en: 'Raid Bosses',
    ja: 'レイドボス',
    ru: 'Рейд-боссы',
  },
  rocket: {
    cs: 'Team GO Rocket',
    en: 'Team GO Rocket',
    ja: 'GOロケット団',
    ru: 'Команда GO Rocket',
  },
  guides: {
    cs: 'Průvodce',
    en: 'Guides',
    ja: '攻略ガイド',
    ru: 'Гайды',
  },
  rankings: {
    cs: 'Žebříčky & Pokédex',
    en: 'Pokédex & Rankings',
    ja: 'ランキング・図鑑',
    ru: 'Рейтинги и Покедекс',
  },
  types: {
    cs: 'Typové slabiny',
    en: 'Type Chart',
    ja: 'タイプ相性',
    ru: 'Таблица типов',
  },
  friends: {
    cs: 'Kódy přátel',
    en: 'Friend Codes',
    ja: 'フレンドコード',
    ru: 'Коды друзей',
  },
  filter: {
    cs: 'Generátor filtrů',
    en: 'Filter Generator',
    ja: '検索コード生成',
    ru: 'Генератор фильтров',
  },
  download: {
    cs: 'Ke stažení',
    en: 'Download App',
    ja: 'アプリダウンロード',
    ru: 'Скачать приложение',
  },
  privacy: {
    cs: 'Ochrana soukromí',
    en: 'Privacy Policy',
    ja: 'プライバシーポリシー',
    ru: 'Конфиденциальность',
  },
  terms: {
    cs: 'Podmínky užití',
    en: 'Terms of Service',
    ja: '利用規約',
    ru: 'Условия использования',
  },
  settings: {
    cs: 'Nastavení',
    en: 'Settings',
    ja: '設定',
    ru: 'Настройки',
  },
};

export function getBreadcrumbLabel(
  key: keyof typeof BREADCRUMB_LABELS,
  lang: Language
): string {
  return BREADCRUMB_LABELS[key]?.[lang] || BREADCRUMB_LABELS[key]?.en || key;
}
