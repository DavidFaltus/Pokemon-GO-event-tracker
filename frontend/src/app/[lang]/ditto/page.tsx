import type { Metadata } from 'next';
import { DittoEggsView } from '@/components/DittoEggsView';
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

  return {
    title: isCzech
      ? 'Ditto Disguises (Aktuální maskování) | Pokémon GO Event Tracker'
      : 'Current Ditto Disguises | Pokémon GO Event Tracker',
    description: isCzech
      ? 'Seznam všech Pokémonů, v které se může Ditto aktuálně maskovat na divoko.'
      : 'List of all wild Pokémon that Ditto can currently disguise as in Pokémon GO.',
  };
}

export default async function DittoPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';

  return <DittoEggsView lang={lang} mode="ditto" />;
}
