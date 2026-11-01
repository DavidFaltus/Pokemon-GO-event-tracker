import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPokedexEntryById, getPokedexEntryBySlug } from '@/data/pokedexCatalog';
import { ALL_POKEDEX_IDS } from '@/data/pokemonRankings';
import type { Language } from '@/data/translations';

export const revalidate = 3600;

export async function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const params: { lang: Language; id: string }[] = [];

  languages.forEach((lang) => {
    ALL_POKEDEX_IDS.forEach((num) => {
      params.push({ lang, id: num.toString() });
    });
  });

  return params;
}

interface PokemonLegacyPageProps {
  params: Promise<{
    lang: Language;
    id: string;
  }>;
}

export async function generateMetadata({ params }: PokemonLegacyPageProps): Promise<Metadata> {
  const { lang, id } = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const validLang: Language = validLanguages.includes(lang as Language) ? (lang as Language) : 'cs';
  const entry = getPokedexEntryById(id) || getPokedexEntryBySlug(id);

  if (!entry) {
    return {
      title: 'Pokémon Not Found | Pokémon GO Event Tracker',
      robots: { index: false, follow: false }
    };
  }

  const targetPath = `/${validLang}/pokedex/${entry.slug}`;
  const targetUrl = `https://pogoevents.app${targetPath}`;

  return {
    title: `${entry.names[validLang] || entry.names.en} – Pokédex`,
    robots: { index: false, follow: true },
    alternates: {
      canonical: targetUrl
    },
    other: {
      refresh: `0; url=${targetPath}`
    }
  };
}

export default async function LegacyPokemonRedirectPage({ params }: PokemonLegacyPageProps) {
  const { lang, id } = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const validLang: Language = validLanguages.includes(lang as Language) ? (lang as Language) : 'cs';

  const entry = getPokedexEntryById(id) || getPokedexEntryBySlug(id);
  if (!entry) {
    notFound();
  }

  const targetPath = `/${validLang}/pokedex/${entry.slug}`;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `if (typeof window !== 'undefined') { window.location.replace('${targetPath}'); }`
        }}
      />
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '460px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>
            Přesměrovávám do Pokédexu...
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
            Profil Pokémona <strong>{entry.names[validLang] || entry.names.en}</strong> se nyní nachází v oficiálním Pokédexu.
          </p>
          <Link
            href={targetPath}
            style={{
              display: 'inline-block',
              background: 'var(--accent-gradient)',
              color: '#ffffff',
              padding: '10px 22px',
              borderRadius: '24px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(170, 59, 255, 0.35)'
            }}
          >
            Přejít do Pokédexu →
          </Link>
        </div>
      </div>
    </>
  );
}
