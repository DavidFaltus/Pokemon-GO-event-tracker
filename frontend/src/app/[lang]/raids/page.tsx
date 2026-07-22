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
      ? 'Aktuální Raid Bossi & Přehled Counterů | Pokémon GO Event Tracker'
      : 'Current Raid Bosses & Counters Guide | Pokémon GO Event Tracker',
    description: isCzech
      ? 'Kompletní přehled aktuálních 1-Star, 3-Star, 5-Star, Mega a Shadow Raid Bossů v Pokémon GO včetně doporučených protihráčů (counters).'
      : 'Complete guide to active 1-Star, 3-Star, 5-Star, Mega, and Shadow Raid Bosses in Pokémon GO with recommended counters.',
  };
}

export default async function RaidsPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';

  return <App initialLang={lang} initialTab="raid" />;
}
