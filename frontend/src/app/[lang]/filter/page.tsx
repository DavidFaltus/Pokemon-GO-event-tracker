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
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const isCzech = rawLang === 'cs';

  return {
    title: isCzech
      ? 'Filter generator pro Pokémon GO | Pokémon GO Event Tracker'
      : 'Pokémon GO Search Filter Generator | Pokémon GO Event Tracker',
    description: isCzech
      ? 'Vygenerujte si vyhledávací filtr s nejlepšími countery pro jakékoliv Pokémon GO raid bossy.'
      : 'Generate search filter with top counters for any Pokémon GO raid bosses.',
  };
}

export default async function FilterPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';

  return <App initialLang={lang} initialTab="filter" />;
}
