import type { Metadata } from 'next';
import Link from 'next/link';
import App from '@/App';
import type { Language } from '@/data/translations';
import { GUIDES_DATA } from '@/data/guidesData';
import { buildAlternates } from '@/utils/seoHelper';
import { apiFetch } from '@/config';

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
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';
  const canonicalUrl = `https://pogoevents.app/${lang}`;

  const titles: Record<Language, string> = {
    cs: 'Pokémon GO Event Tracker - Živé události, Raidy, Rakeťáci & Průvodce',
    en: 'Pokémon GO Event Tracker - Live Events, Raids, Rocket Lineups & Guides',
    ja: 'Pokémon GO イベントトラッカー - イベント、レイド、ロケット団 & ガイド',
    ru: 'Трекер событий Pokémon GO - События, Рейды, Команда R и Руководства',
  };

  const descriptions: Record<Language, string> = {
    cs: 'Sledujte aktuální a nadcházející události v Pokémon GO, raid bossy, sestavy Team GO Rocket, líhnutí z vajec, maskování Ditto a PvP žebříčky v reálném čase.',
    en: 'Track live and upcoming Pokémon GO events, raid bosses, Team GO Rocket lineups, egg hatches, Ditto disguises, and PvP rankings in real time.',
    ja: 'Pokémon GOのイベント、レイドボス、GOロケット団の編成、タマゴ孵化、メタモン、PvPランキングをリアルタイムで確認できます。',
    ru: 'Отслеживайте текущие и предстоящие события Pokémon GO, боссов рейдов, составы Команды R, вылупление яиц и маскировки Дитто в реальном времени.',
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: buildAlternates(lang, '', 'https://pogoevents.app/api/agent/events.md'),
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: canonicalUrl,
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: 'PoGo Events' }]
    }
  };
}

async function getInitialEvents() {
  try {
    const res = await apiFetch('/api/events', { next: { revalidate: 300 } });
    if (res.ok) {
      const data = await res.json();
      return Array.isArray(data) ? data : data.events || [];
    }
  } catch (err) {}
  return [];
}

export default async function HomePage({ params }: PageProps) {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';
  const initialEvents = await getInitialEvents();
  const featuredGuides = GUIDES_DATA.slice(0, 6);

  return (
    <>
      <App initialLang={lang} initialEvents={initialEvents} />
      <section
        className="home-editorial-hub card"
        style={{
          marginTop: '28px',
          padding: '22px 24px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
            {lang === 'cs'
              ? 'Redakční průvodci, strategie a herní analýzy Pokémon GO'
              : lang === 'ja'
                ? 'Pokémon GO 攻略ガイド・最新メタ分析コラム'
                : lang === 'ru'
                  ? 'Редакционные гайды, стратегии и аналитика Pokémon GO'
                  : 'Pokémon GO Editorial Guides, Raid Strategies & Meta Analysis'}
          </h2>
          <Link
            href={`/${lang}/guides`}
            style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-color)', textDecoration: 'none' }}
          >
            {lang === 'cs'
              ? 'Zobrazit všech 17 průvodců →'
              : lang === 'ja'
                ? 'すべての攻略ガイドを見る →'
                : lang === 'ru'
                  ? 'Смотреть все руководства →'
                  : 'View all 17 strategy guides →'}
          </Link>
        </div>
        <p style={{ margin: '0 0 18px 0', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {lang === 'cs'
            ? 'PoGo Events spojuje živý kalendář událostí přizpůsobený vašemu časovému pásmu s autorskými strategickými návody. Přečtěte si naše podrobné rozbory mechanik – od stavby optimálních raidových týmů a 100% IV (Hundo) tabulek přes sestavy lídrů Team GO Rocket (Cliff, Arlo, Sierra, Giovanni) až po maximalizaci Stardustu, XL Candy a pravidelných týdenních minieventů.'
            : lang === 'ja'
              ? 'PoGo Eventsは、タイムゾーン対応のリアルタイムイベントカレンダーと、実践的な攻略ガイドを組み合わせたトレーナー向け情報サイトです。レイド対策パーティの編成や個体値100%（Hundo）早見表、GOロケット団リーダー（クリフ・アルロ・シエラ・サカキ）の対策、ほしのすな・アメXLの効率的な集め方まで詳しく解説しています。'
              : lang === 'ru'
                ? 'PoGo Events объединяет календарь событий в реальном времени с подробными авторскими руководствами. Изучайте наши разборы механик: от подбора оптимальных контр-покемонов для рейдов и таблиц 100% IV до победы над лидерами Команды GO Rocket (Клифф, Арло, Сьерра, Джованни) и фарма звездной пыли.'
                : 'PoGo Events combines a timezone-synchronized live event calendar with in-depth editorial strategy guides. Explore our comprehensive breakdowns covering optimal Raid Boss counters, 100% IV (Hundo) CP charts, Team GO Rocket Leader & Giovanni lineups, Stardust & Candy XL farming, and weekly mini-event routines.'}
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '14px',
            alignItems: 'start',
          }}
        >
          {featuredGuides.map((guide) => (
            <Link
              key={guide.id}
              href={`/${lang}/guides/${guide.slug}`}
              style={{
                display: 'block',
                padding: '14px 16px',
                borderRadius: '14px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--cyan-accent)', marginBottom: '4px' }}>
                {guide.category[lang] || guide.category.en} • {guide.readTime}
              </div>
              <h3 style={{ fontSize: '0.96rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
                {guide.title[lang] || guide.title.en}
              </h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                {guide.subtitle[lang] || guide.subtitle.en}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
