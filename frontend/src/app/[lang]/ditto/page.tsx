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
  const canonicalUrl = `https://pogoevents.app/${lang}/guides/ditto-disguises-guide`;

  return {
    title: 'Ditto Disguises Guide | Pokémon GO Event Tracker',
    description: 'Current Ditto disguises and hunting guide.',
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function DittoPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';
  redirect(`/${lang}/guides/ditto-disguises-guide`);
}

