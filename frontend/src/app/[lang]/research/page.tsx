import type { Metadata } from 'next';
import { FieldResearchView } from '@/components/FieldResearchView';
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
  const canonicalUrl = `https://pogoevents.app/${lang}/research`;

  return {
    title: isCzech
      ? 'Aktuální Polní Výzkum & Odměny (Field Research) | Pokémon GO Event Tracker'
      : 'Current Field Research Tasks & Rewards | Pokémon GO Event Tracker',
    description: isCzech
      ? 'Přehled všech aktuálních úkolů polního výzkumu z Pokéstopů, odměn a encounterů s možností Shiny v Pokémon GO.'
      : 'Complete list of all active Pokémon GO field research tasks, PokéStop quests, and encounter rewards with shiny chances.',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'cs': `https://pogoevents.app/cs/research`,
        'en': `https://pogoevents.app/en/research`,
        'ja': `https://pogoevents.app/ja/research`,
        'ru': `https://pogoevents.app/ru/research`,
      },
    },
  };
}

export default async function ResearchPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';

  return <FieldResearchView lang={lang} />;
}
