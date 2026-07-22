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
      ? 'Ditto Převleky a Maskování | Pokémon GO Event Tracker'
      : 'Ditto Disguises & Spawns Guide | Pokémon GO Event Tracker',
    description: isCzech
      ? 'Aktuální přehled Pokémonů, za které se Ditto maskuje v divočině v této sezóně.'
      : 'Current list of wild Pokémon Ditto disguises as during this season.',
  };
}

export default async function DittoPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';

  return <App initialLang={lang} initialTab="ditto" />;
}
