import type { Metadata } from 'next';
import { ContestAdminView } from '@/components/ContestAdminView';

export function generateStaticParams() {
  return [{ lang: 'cs' }];
}

export const metadata: Metadata = {
  title: 'Administrace soutěží | Pokémon GO Komunita',
  description: 'Správa lokálních Pokémon GO soutěží, účastníků, losování výherců a QR kódů.',
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

export default function SoutezAdminPage() {
  return <ContestAdminView />;
}
