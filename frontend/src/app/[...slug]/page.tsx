import App from '@/App';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 3600;

const VALID_ROOT_ROUTES = new Set([
  'events', 'guides', 'raids', 'rocket', 'ditto', 'eggs', 'rankings', 'filter', 'settings', 'download', 'app', 'admin'
]);

export async function generateStaticParams() {
  const routes = Array.from(VALID_ROOT_ROUTES);
  return routes.map((route) => ({
    slug: [route],
  }));
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrapped = await params;
  const first = unwrapped.slug?.[0]?.toLowerCase();
  if (!first || !VALID_ROOT_ROUTES.has(first)) {
    return {
      title: 'Page Not Found | Pokémon GO Event Tracker',
      description: 'Page not found.',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `https://pogoevents.app/cs/${first}`;
  return {
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function CatchAllRootPage({ params }: PageProps) {
  const unwrapped = await params;
  const first = unwrapped.slug?.[0]?.toLowerCase();

  if (!first || !VALID_ROOT_ROUTES.has(first)) {
    notFound();
  }

  return <App />;
}
