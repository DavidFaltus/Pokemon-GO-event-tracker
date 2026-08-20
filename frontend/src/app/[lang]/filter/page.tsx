import type { Metadata } from 'next';
import { FilterGeneratorView } from '@/components/FilterGeneratorView';
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
  const canonicalUrl = `https://pogoevents.app/${lang}/filter`;

  return {
    title: isCzech
      ? 'Search String Generátor (In-game filtry) | Pokémon GO Event Tracker'
      : 'In-Game Search String Generator | Pokémon GO Event Tracker',
    description: isCzech
      ? 'Generátor vyhledávacích řetězců pro IV, Trash, Raidy a Trashing přímo do Pokémon GO.'
      : 'Search string generator for IVs, Trashing, and Raids directly inside Pokémon GO.',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'cs': `https://pogoevents.app/cs/filter`,
        'en': `https://pogoevents.app/en/filter`,
        'ja': `https://pogoevents.app/ja/filter`,
        'ru': `https://pogoevents.app/ru/filter`,
      },
    },
  };
}

export default async function FilterPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';

  return <FilterGeneratorView lang={lang} />;
}
