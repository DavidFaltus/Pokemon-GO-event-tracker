import type { Metadata } from 'next';
import { LegalPageView } from '@/components/LegalPageView';
import type { Language } from '@/data/translations';
import { LEGAL_PAGES_DATA } from '@/data/legalData';

export const revalidate = 86400;

export function generateStaticParams() {
  return [
    { lang: 'cs' },
    { lang: 'en' },
    { lang: 'ja' },
    { lang: 'ru' },
  ];
}

interface PageProps {
  params: Promise<{ lang: Language }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';
  const data = LEGAL_PAGES_DATA.disclaimer;
  const title = data.title[lang] || data.title.en;
  const description = data.subtitle[lang] || data.subtitle.en;
  const canonicalUrl = `https://pogoevents.app/${lang}/disclaimer`;

  return {
    title: `${title} | PoGo Events`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        cs: 'https://pogoevents.app/cs/disclaimer',
        en: 'https://pogoevents.app/en/disclaimer',
        ja: 'https://pogoevents.app/ja/disclaimer',
        ru: 'https://pogoevents.app/ru/disclaimer',
      },
    },
  };
}

export default async function DisclaimerPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';
  const data = LEGAL_PAGES_DATA.disclaimer;
  const canonicalUrl = `https://pogoevents.app/${lang}/disclaimer`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.title[lang] || data.title.en,
    description: data.subtitle[lang] || data.subtitle.en,
    url: canonicalUrl,
    inLanguage: lang,
    publisher: {
      '@type': 'Organization',
      name: 'PoGo Events',
      url: 'https://pogoevents.app',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LegalPageView pageType="disclaimer" lang={lang} />
    </>
  );
}
