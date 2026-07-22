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

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Nastavení Notifikací & Filtry | Pokémon GO Event Tracker',
    description: 'Přizpůsobte si filtry událostí, časové pásmo a notifikace pro Pokémon GO.',
  };
}

export default async function SettingsPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';

  return <App initialLang={lang} initialTab="settings" />;
}
