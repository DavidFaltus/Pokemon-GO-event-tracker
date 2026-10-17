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
  const canonicalUrl = `https://pogoevents.app/${lang}/guides/field-research-tasks-guide`;

  return {
    title: 'Field Research Tasks Guide | Pokémon GO Event Tracker',
    description: 'Current PokéStop field research tasks, encounters, and rewards.',
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ResearchPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';
  redirect(`/${lang}/guides/field-research-tasks-guide`);
}

