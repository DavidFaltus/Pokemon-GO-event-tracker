import type { Metadata } from 'next';
import { RocketGuide } from '@/components/RocketGuide';
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
  const canonicalUrl = `https://pogoevents.app/${lang}/rocket`;

  return {
    title: isCzech
      ? 'Team GO Rocket Průvodce (Giovanni, Lídeři & Grunti) | Pokémon GO Event Tracker'
      : 'Team GO Rocket Lineups & Counters | Pokémon GO Event Tracker',
    description: isCzech
      ? 'Aktuální sestavy a nejlepší protihráči pro Giovanniho, Cliffa, Sierru, Arla a Rakeťáky v Pokémon GO.'
      : 'Current lineups and counter guide for Giovanni, Cliff, Sierra, Arlo, and Rocket Grunts in Pokémon GO.',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'cs': `https://pogoevents.app/cs/rocket`,
        'en': `https://pogoevents.app/en/rocket`,
        'ja': `https://pogoevents.app/ja/rocket`,
        'ru': `https://pogoevents.app/ru/rocket`,
      },
    },
  };
}

export default async function RocketPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';

  return <RocketGuide lang={lang} />;
}
