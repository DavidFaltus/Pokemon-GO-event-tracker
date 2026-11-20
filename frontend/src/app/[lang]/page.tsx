import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Link from 'next/link';
import App from '@/App';
import type { Language } from '@/data/translations';
import { GUIDES_DATA } from '@/data/guidesData';
import { buildAlternates } from '@/utils/seoHelper';
import { resolveImage } from '@/utils/imageResolver';
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';
  const canonicalUrl = `https://pogoevents.app/${lang}`;

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

function sanitizeEventMediaForSsr(events: any[]): any[] {
  const sanitizeNested = (val: any): any => {
    if (typeof val === 'string') {
      if (val.includes('cdn.leekduck.com')) {
        return resolveImage(val);
      }
      if (val.includes('leekduck.com')) {
        return '';
      }
      return val;
    }
    if (Array.isArray(val)) return val.map(sanitizeNested);
    if (val && typeof val === 'object') {
      const out: Record<string, any> = {};
      for (const [k, v] of Object.entries(val)) {
        if (k === 'image' && typeof v === 'string' && v.includes('leekduck.com')) {
          out[k] = resolveImage(v, val.eventType, val.name);
        } else {
          out[k] = sanitizeNested(v);
        }
      }
      return out;
    }
    return val;
  };

  return events.map((ev) => {
    const clean = sanitizeNested(ev);
    clean.image = resolveImage(ev.image, ev.eventType, ev.name);
    if (typeof clean.link === 'string' && clean.link.includes('leekduck.com')) {
      clean.link = '';
    }
    return clean;
  });
}

async function getInitialEvents() {
  try {
    const res = await apiFetch('/api/events', { next: { revalidate: 300 } });
    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.events || [];
      if (list.length > 0) return sanitizeEventMediaForSsr(list);
    }
  } catch (err) {}

  try {
    const cacheFile = path.resolve(process.cwd(), '../backend/events_list_cache.json');
    const customFile = path.resolve(process.cwd(), '../backend/custom_events.json');
    let merged: any[] = [];
    if (fs.existsSync(cacheFile)) {
      const raw = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
      const list = Array.isArray(raw) ? raw : raw.data || raw.events || [];
      if (Array.isArray(list)) merged.push(...list);
    }
    if (fs.existsSync(customFile)) {
      const custom = JSON.parse(fs.readFileSync(customFile, 'utf-8'));
      if (Array.isArray(custom)) merged.push(...custom);
    }
    if (merged.length > 0) return sanitizeEventMediaForSsr(merged);
  } catch (e) {}

  return [];
}

export default async function HomePage({ params }: PageProps) {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';
  const initialEvents = await getInitialEvents();
  const featuredGuides = GUIDES_DATA.filter((g) => g.featured).slice(0, 8);
  const canonicalUrl = `https://pogoevents.app/${lang}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://pogoevents.app/#website',
        name: 'Pokémon GO Event Tracker',
        alternateName: 'PoGo Events',
        url: canonicalUrl,
        inLanguage: ['cs', 'en', 'ja', 'ru'],
        description: descriptions[lang] || descriptions.en,
        publisher: {
          '@type': 'Organization',
          '@id': 'https://pogoevents.app/#organization',
          name: 'PoGo Events Tracker',
          url: 'https://pogoevents.app',
          logo: {
            '@type': 'ImageObject',
            url: 'https://pogoevents.app/logo-icon-1080.png',
          },
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Pokémon GO Event Tracker',
        operatingSystem: 'Android, iOS, Web Browser',
        applicationCategory: 'GameApplication',
        url: canonicalUrl,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
              ? `Zobrazit všech ${GUIDES_DATA.length} průvodců →`
              : lang === 'ja'
                ? `全${GUIDES_DATA.length}件の攻略ガイドを見る →`
                : lang === 'ru'
                  ? `Смотреть все ${GUIDES_DATA.length} руководств →`
                  : `View all ${GUIDES_DATA.length} strategy guides →`}
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
