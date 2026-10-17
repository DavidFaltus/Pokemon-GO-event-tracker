import type { Metadata } from 'next';
import App from '@/App';
import type { Language } from '@/data/translations';
import { buildAlternates } from '@/utils/seoHelper';

export const revalidate = 300;

export function generateStaticParams() {
  return [
    { lang: 'cs' },
    { lang: 'en' },
    { lang: 'ja' },
    { lang: 'ru' },
  ];
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';

  const titles: Record<Language, string> = {
    cs: 'Nastavení Notifikací & Filtry | Pokémon GO Event Tracker',
    en: 'Notification Settings & Preferences | Pokémon GO Event Tracker',
    ja: '通知設定・言語・タイムゾーン設定 | Pokémon GO Event Tracker',
    ru: 'Настройки уведомлений и часового пояса | Pokémon GO Event Tracker',
  };

  const descriptions: Record<Language, string> = {
    cs: 'Přizpůsobte si filtry událostí, časové pásmo, vzhled a notifikace pro Pokémon GO Event Tracker.',
    en: 'Customize your Pokémon GO event filters, local timezone, theme, and notification preferences.',
    ja: 'Pokémon GO イベントトラッカーの表示フィルター、タイムゾーン、通知設定をカスタマイズします。',
    ru: 'Настройте фильтры событий, часовой пояс, тему оформления и уведомления для Pokémon GO Event Tracker.',
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: buildAlternates(lang, '/settings'),
    robots: { index: false, follow: true },
  };
}

export default async function SettingsPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';

  return <App initialLang={lang} initialTab="settings" />;
}
