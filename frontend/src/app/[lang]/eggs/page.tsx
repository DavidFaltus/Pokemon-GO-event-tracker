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
      ? 'Egg Hatch Distance Pool (2km, 5km, 7km, 10km, 12km) | Pokémon GO Event Tracker'
      : 'Egg Hatch Distance Pool | Pokémon GO Event Tracker',
    description: isCzech
      ? 'Přehled všech Pokémonů, které lze aktuálně vylíhnout z 2km, 5km, 7km, 10km a 12km vajec.'
      : 'Complete list of Pokémon currently hatching from 2km, 5km, 7km, 10km, and 12km eggs in Pokémon GO.',
  };
}

export default async function EggsPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';

  return <DittoEggsView lang={lang} mode="eggs" />;
}
