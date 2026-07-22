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
  params: Promise<{ lang: Language }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';
  const isCzech = lang === 'cs';

  return {
    title: isCzech
      ? 'Team GO Rocket Průvodce (Giovanni, Lídeři & Grunti) | Pokémon GO Event Tracker'
      : 'Team GO Rocket Lineups & Counters | Pokémon GO Event Tracker',
    description: isCzech
      ? 'Aktuální sestavy a nejlepší protihráči pro Giovanniho, Cliffa, Sierru, Arla a Rakeťáky v Pokémon GO.'
      : 'Current lineups and counter guide for Giovanni, Cliff, Sierra, Arlo, and Rocket Grunts in Pokémon GO.',
  };
}

export default async function RocketPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';

  return <App initialLang={lang} initialTab="rocket" />;
}
