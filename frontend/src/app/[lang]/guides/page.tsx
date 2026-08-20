import type { Metadata } from 'next';
import App from '@/App';
import type { Language } from '@/data/translations';

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
  params: Promise<{ lang: Language }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';
  const isCzech = lang === 'cs';
  const canonicalUrl = `https://pogoevents.app/${lang}/guides`;

  return {
    title: isCzech
      ? 'Pokémon GO Strategické Průvodce & Návody | PoGo Events'
      : 'Pokémon GO Strategy Guides & Tutorials | PoGo Events',
    description: isCzech
      ? 'Detailní návody jak porazit Lídry a Giovanniho z Team GO Rocket, nejlepší countery na Raidy, rozbor 100% IV hodnot a strategie na eventy.'
      : 'In-depth guides for defeating Team GO Rocket Leaders, best Raid counters, 100% IV appraisal deep dives, and event strategies.',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'cs': `https://pogoevents.app/cs/guides`,
        'en': `https://pogoevents.app/en/guides`,
        'ja': `https://pogoevents.app/ja/guides`,
        'ru': `https://pogoevents.app/ru/guides`,
      },
    },
  };
}

export default async function GuidesPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';

  return <App initialLang={lang} initialTab="guides" />;
}
