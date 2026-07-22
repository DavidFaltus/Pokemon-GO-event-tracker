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
      ? 'Obsah Vajíček & Líhnutí (2km, 5km, 7km, 10km, 12km) | Pokémon GO Event Tracker'
      : 'Egg Hatch Chart & Pool | Pokémon GO Event Tracker',
    description: isCzech
      ? 'Aktuální seznam Pokémonů líhnoucích se z 2km, 5km, 7km, 10km a 12km vajíček v této sezóně.'
      : 'Current egg hatch pools for 2km, 5km, 7km, 10km, and 12km eggs in Pokémon GO.',
  };
}

export default async function EggsPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';

  return <App initialLang={lang} initialTab="eggs" />;
}
