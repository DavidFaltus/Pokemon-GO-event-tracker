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
  const data = LEGAL_PAGES_DATA.privacy;
  const title = data.title[lang] || data.title.en;
  const description = data.subtitle[lang] || data.subtitle.en;
  const canonicalUrl = `https://pogoevents.app/${lang}/privacy`;

  return {
    title: `${title} | PoGo Events`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        cs: 'https://pogoevents.app/cs/privacy',
        en: 'https://pogoevents.app/en/privacy',
        ja: 'https://pogoevents.app/ja/privacy',
        ru: 'https://pogoevents.app/ru/privacy',
      },
    },
  };
}

export default async function PrivacyPolicyAliasPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';

  return <LegalPageView pageType="privacy" lang={lang} />;
}
