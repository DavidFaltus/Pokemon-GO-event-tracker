import type { Metadata } from 'next';
import { LegalPageView } from '@/components/LegalPageView';
import type { Language } from '@/data/translations';
import { LEGAL_PAGES_DATA } from '@/data/legalData';
import { buildAlternates } from '@/utils/seoHelper';

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
  const data = LEGAL_PAGES_DATA.privacy;
  const title = data.title[lang] || data.title.en;
  const description = data.subtitle[lang] || data.subtitle.en;

  return {
    title: `${title} | PoGo Events`,
    description,
    alternates: buildAlternates(lang, '/privacy'),
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';
  const data = LEGAL_PAGES_DATA.privacy;
  const canonicalUrl = `https://pogoevents.app/${lang}/privacy`;

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
      <LegalPageView pageType="privacy" lang={lang} />
    </>
  );
}
