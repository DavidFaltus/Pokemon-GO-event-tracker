import type { Metadata } from 'next';
import { ContestHubView } from '@/components/ContestHubView';

export function generateStaticParams() {
  return [{ lang: 'cs' }];
}

export const metadata: Metadata = {
  title: 'Lokální Soutěže | Pokémon GO Komunita',
  description: 'Soukromý portál lokálních Pokémon GO soutěží, výsledků a odměn.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function SoutezPage() {
  return <ContestHubView />;
}
