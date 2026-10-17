import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
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
  const canonicalUrl = `https://pogoevents.app/${lang}/guides/egg-hatching-guide`;

  return {
    title: 'Egg Hatching Guide | Pokémon GO Event Tracker',
    description: 'Current 2km, 5km, 7km, 10km, and 12km egg pools and hatching guide.',
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function EggsPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';
  redirect(`/${lang}/guides/egg-hatching-guide`);
}

