import React from 'react';
import { Metadata } from 'next';
import App from '@/App';
import { Language } from '@/data/translations';

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
      ? 'PvE Žebříčky Pokémonů a Ideální Movesety | Pokémon GO Event Tracker'
      : 'PvE Pokémon Rankings & Best Movesets | Pokémon GO Event Tracker',
    description: isCzech
      ? 'Kompletní žebříček nejlepších Pokémonů a útoků pro raidy. Porovnejte statistiky útoku, obrany, výdrže a eDPS ER skóre.'
      : 'Complete ranking of top raid Pokémon and movesets. Compare attack, defense, stamina stats, and eDPS ER scores.',
  };
}

export default async function RankingsPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';

  return <App initialLang={lang} initialTab="ranking" />;
}
