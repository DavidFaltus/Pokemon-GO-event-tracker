import type { Metadata } from 'next';
import { PokedexView } from '@/components/PokedexView';
import { SectionEditorialGuide } from '@/components/SectionEditorialGuide';
import { buildAlternates } from '@/utils/seoHelper';
import type { Language } from '@/data/translations';

export const revalidate = 3600;

export async function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
  return languages.map((lang) => ({ lang }));
}

interface PokedexPageProps {
  params: Promise<{ lang: Language }>;
}

export async function generateMetadata({ params }: PokedexPageProps): Promise<Metadata> {
  const { lang } = await params;
  const validLang: Language = ['cs', 'en', 'ja', 'ru'].includes(lang) ? lang : 'cs';

  const titles: Record<Language, string> = {
    cs: 'Kompletní Pokédex Pokémon GO (Gen 1–9) – Statistiky, Varianty & Max CP',
    en: 'Complete Pokémon GO Pokédex (Gen 1–9) – Stats, Variants & Max CP',
    ja: 'ポケモンGO 完全図鑑 (第1〜9世代) – 種族値・メガ・キョダイマックス',
    ru: 'Полный Покедекс Pokémon GO (Ген 1–9) – Характеристики, формы и макс. CP'
  };

  const descriptions: Record<Language, string> = {
    cs: 'Interaktivní databáze a Pokédex všech 1024+ Pokémonů v Pokémon GO. Filtrujte podle generací (Gen 1–9), typů, Dynamax, Gigantamax, Mega evolucí, Shadow a regionálních forem s 1-klikem na Shiny vzhled.',
    en: 'Interactive database and Pokédex of all 1024+ Pokémon in Pokémon GO. Filter by generations (Gen 1–9), types, Dynamax, Gigantamax, Mega evolutions, Shadow and regional forms with 1-click Shiny toggle.',
    ja: 'Pokémon GOの全1024匹以上を網羅した完全図鑑。第1〜9世代、タイプ別、ダイマックス、キョダイマックス、メガシンカ、シャドウ、色違い（色違い一括表示対応）を快適に検索・比較。',
    ru: 'Интерактивный Покедекс всех 1024+ покемонов в Pokémon GO. Фильтры по поколениям, типам, формам Динамакс, Гигантамакс, Мега, теневым и региональным покемонам с переключением шайни.'
  };

  return {
    title: titles[validLang],
    description: descriptions[validLang],
    alternates: buildAlternates(validLang, '/pokedex'),
    openGraph: {
      title: titles[validLang],
      description: descriptions[validLang],
      url: `https://pogoevents.app/${validLang}/pokedex`,
      type: 'website',
      images: [
        {
          url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
          width: 475,
          height: 475,
          alt: titles[validLang]
        }
      ]
    }
  };
}

export default async function PokedexPage({ params }: PokedexPageProps) {
  const { lang } = await params;
  const validLang: Language = ['cs', 'en', 'ja', 'ru'].includes(lang) ? lang : 'cs';
  return (
    <>
      <PokedexView lang={validLang} />
      <SectionEditorialGuide section="pokedex" lang={validLang} />
    </>
  );
}
