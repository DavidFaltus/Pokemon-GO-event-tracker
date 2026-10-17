import type { Metadata } from 'next';
import App from '@/App';
import type { Language } from '@/data/translations';
import { buildAlternates, getBreadcrumbLabel } from '@/utils/seoHelper';

export const revalidate = 300;

export async function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
  return languages.map(lang => ({ lang }));
}

interface DownloadPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: DownloadPageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';
  const canonicalUrl = `https://pogoevents.app/${lang}/download`;

  const titles: Record<Language, string> = {
    cs: 'Stáhnout PoGo Events Aplikaci (PWA & Android/iOS) | Pokémon GO Event Tracker',
    en: 'Download PoGo Events App (PWA, Android & iOS) | Pokémon GO Event Tracker',
    ja: 'PoGo Events アプリをダウンロード (PWA / Android / iOS) | Pokémon GO',
    ru: 'Скачать приложение PoGo Events (PWA, Android и iOS) | Pokémon GO',
  };

  const descriptions: Record<Language, string> = {
    cs: 'Nainstalujte si aplikaci PoGo Events do mobilu (Android, iOS, PWA) pro okamžité notifikace na události, raidy a 100% IV pokémony v Pokémon GO.',
    en: 'Install the PoGo Events mobile web app (PWA for Android & iOS) for instant event reminders, raid schedules, and 100% IV lookup tools.',
    ja: 'PoGo Events モバイルアプリ（Android・iOS対応PWA）をインストールして、イベント通知やレイド情報を素早くチェックしましょう。',
    ru: 'Установите мобильное приложение PoGo Events (PWA для Android и iOS) для быстрого доступа к расписанию событий и рейдов Pokémon GO.',
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: buildAlternates(lang, '/download'),
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: canonicalUrl,
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: titles[lang] || titles.en }],
    },
  };
}

export default async function DownloadPage({ params }: DownloadPageProps) {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';
  const canonicalUrl = `https://pogoevents.app/${lang}/download`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'PoGo Events Tracker',
        applicationCategory: 'GameApplication',
        operatingSystem: 'Android, iOS, Web',
        url: canonicalUrl,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: getBreadcrumbLabel('home', lang), item: `https://pogoevents.app/${lang}` },
          { '@type': 'ListItem', position: 2, name: getBreadcrumbLabel('download', lang), item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <App initialLang={lang} initialTab="download" />
    </>
  );
}
