import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Language } from '@/data/translations';
import { pokemonRankings, getPokemonByIdOrSlug } from '@/data/pokemonRankings';
import { POKEDEX_MAP } from '@/data/pokedexCatalog';
import { raidCountersDb } from '@/data/raidCounters';
import { getPokemonName } from '@/utils/pokemonTranslator';
import { getCounterTypes, getTopCountersForPokemon } from '@/utils/pokemonCountersHelper';
import { localizeTypeName } from '@/utils/eventIntelligenceHelper';
import { buildAlternates, getBreadcrumbLabel } from '@/utils/seoHelper';
import { POPULAR_RAID_BOSSES } from '@/data/sitemapConstants';

export const revalidate = 3600;

export { POPULAR_RAID_BOSSES };

const UNRELEASED_BOSS_SLUGS = new Set([
  'eternatus',
  'urshifu',
  'calyrex',
  'koraidon',
  'miraidon',
  'terapagos',
  'pecharunt',
]);

const ALL_RAID_SLUGS = Array.from(
  new Set([
    ...POPULAR_RAID_BOSSES,
    ...Object.keys(raidCountersDb).map((name) =>
      name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    ),
  ])
).filter((slug) => !UNRELEASED_BOSS_SLUGS.has(slug));

export function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const params: { lang: Language; slug: string }[] = [];

  languages.forEach((lang) => {
    ALL_RAID_SLUGS.forEach((boss) => {
      params.push({ lang, slug: `${boss}-counters` });
    });
  });

  return params;
}

interface PageProps {
  params: Promise<{ lang: Language; slug: string }>;
}

function cleanBossName(slug: string): string {
  return slug
    .replace(/-counters$/i, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrapped = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrapped.lang as Language) ? (unwrapped.lang as Language) : 'cs';
  const rawSlug = unwrapped.slug.toLowerCase();
  const isCanonicalCountersSlug = rawSlug.endsWith('-counters');
  const normalizedSlug = isCanonicalCountersSlug ? rawSlug : `${rawSlug}-counters`;
  const bossName = cleanBossName(rawSlug);
  const matched = getPokemonByIdOrSlug(bossName.replace(/shadow|mega|primal/gi, '').trim());

  const localizedName = matched ? getPokemonName(matched.name, lang) : bossName;
  const canonicalUrl = `https://pogoevents.app/${lang}/raids/${normalizedSlug}`;

  const titleByLang: Record<Language, string> = {
    cs: `${localizedName} Raid Counters, Slabosti & 100% IV CP | Pokémon GO`,
    en: `${bossName} Raid Counters, Weaknesses & 100% IV CP Guide | Pokémon GO`,
    ja: `${localizedName} レイド対策・弱点・100% IV CP・おすすめポケモン | Pokémon GO`,
    ru: `${bossName} – Лучшие контр-покемоны, уязвимости и 100% IV CP | Pokémon GO`,
  };

  const descByLang: Record<Language, string> = {
    cs: `Kompletní strategický průvodce a nejlepší counters pro raid bosse ${localizedName} v Pokémon GO. Typové slabosti, Mega evoluce, 100% IV (Hundo) CP tabulka pro Level 20 a 25 a doporučený počet trenérů.`,
    en: `Complete raid strategy guide and top counters for ${bossName} in Pokémon GO. Type weaknesses, best Mega & Shadow attackers, 100% IV Hundo CP chart, and solo/duo/trio difficulty.`,
    ja: `Pokémon GOの${localizedName}レイドバトル完全対策ガイド。弱点タイプ、おすすめメガシンカ・シャドウポケモン、個体値100% CP早見表、最小討伐人数を解説。`,
    ru: `Полный гайд и лучшие контр-покемоны для рейда против ${bossName} в Pokémon GO. Уязвимости, таблица 100% IV CP (20 и 25 уровень) и тактика боя.`,
  };

  return {
    title: titleByLang[lang] || titleByLang.en,
    description: descByLang[lang] || descByLang.en,
    robots: isCanonicalCountersSlug ? { index: true, follow: true } : { index: false, follow: true },
    keywords: [
      `${bossName} counters`,
      `${bossName} raid guide`,
      `${bossName} pokemon go`,
      `${bossName} weaknesses`,
      `${bossName} 100 iv cp`,
    ],
    alternates: buildAlternates(lang, `/raids/${normalizedSlug}`, 'https://pogoevents.app/api/agent/raids.md'),
    openGraph: {
      title: titleByLang[lang] || titleByLang.en,
      description: descByLang[lang] || descByLang.en,
      url: canonicalUrl,
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: bossName }],
    },
  };
}

export default async function RaidBossCounterPage({ params }: PageProps) {
  const unwrapped = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrapped.lang as Language) ? (unwrapped.lang as Language) : 'cs';
  const rawSlug = unwrapped.slug.toLowerCase();
  const baseBossSlug = rawSlug.replace(/-counters$/i, '');
  const normalizedSlug = `${baseBossSlug}-counters`;
  const bossName = cleanBossName(rawSlug);
  const matched = getPokemonByIdOrSlug(bossName.replace(/shadow|mega|primal/gi, '').trim());
  const dbKey = Object.keys(raidCountersDb).find(
    (k) => k.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === baseBossSlug
  );
  const dbCounters = dbKey ? raidCountersDb[dbKey] : undefined;

  if (!matched && !dbCounters && !ALL_RAID_SLUGS.some((b) => rawSlug.includes(b))) {
    notFound();
  }

  const localizedName = matched ? getPokemonName(matched.name, lang) : bossName;
  const dexEntry = matched ? POKEDEX_MAP[matched.pokedexId] : undefined;
  const canonicalUrl = `https://pogoevents.app/${lang}/raids/${normalizedSlug}`;
  const types = matched?.types || ['Normal'];
  const localizedTypes = types.map((t) => localizeTypeName(t, lang));

  const rawWeaknesses = dbCounters?.weaknesses?.length
    ? dbCounters.weaknesses
    : getCounterTypes(types).map((w) => `${w.type} (${w.label})`);
  const weaknesses = rawWeaknesses.map((w) => localizeTypeName(w, lang));

  const computedCounters = matched ? getTopCountersForPokemon(matched, pokemonRankings).slice(0, 12) : [];
  const countersList =
    computedCounters.length > 0
      ? computedCounters.map((c) => {
          const cEntry = POKEDEX_MAP[c.pokemon.pokedexId];
          return {
            name: c.pokemon.name,
            localizedName: getPokemonName(c.pokemon.name, lang),
            dexId: c.pokemon.pokedexId,
            slug: cEntry?.slug || String(c.pokemon.pokedexId),
            fastMove: c.pokemon.bestFastMove.name,
            chargedMove: c.pokemon.bestChargedMove.name,
            dps: c.pokemon.dps.toFixed(1),
            isMega: Boolean(c.pokemon.isMega || c.pokemon.isPrimal),
            isShadow: Boolean(c.pokemon.isShadow),
          };
        })
      : (dbCounters?.advancedCounters || []).slice(0, 10).map((entry) => {
          const match = entry.match(/^([^(]+)\(([^)]+)\)$/);
          const cName = match ? match[1].trim() : entry;
          return {
            name: cName,
            localizedName: getPokemonName(cName, lang),
            dexId: 150,
            slug: 'mewtwo',
            fastMove: 'Optimal Fast',
            chargedMove: match ? match[2].trim() : 'Optimal Charged',
            dps: '42.5',
            isMega: cName.toLowerCase().includes('mega') || cName.toLowerCase().includes('primal'),
            isShadow: cName.toLowerCase().includes('shadow'),
          };
        });

  const lv20MaxCp =
    dbCounters?.maxCp ??
    dexEntry?.maxCp.lv20 ??
    (matched
      ? Math.floor(
          ((matched.attack + 15) *
            Math.sqrt(matched.defense + 15) *
            Math.sqrt(matched.stamina + 15) *
            (0.5974 * 0.5974)) /
            10
        )
      : 2100);
  const lv25MaxCp =
    dbCounters?.maxBoostedCp ??
    dexEntry?.maxCp.lv25 ??
    (matched
      ? Math.floor(
          ((matched.attack + 15) *
            Math.sqrt(matched.defense + 15) *
            Math.sqrt(matched.stamina + 15) *
            (0.667934 * 0.667934)) /
            10
        )
      : 2625);
  const lv50MaxCp = dexEntry?.maxCp.lv50 ?? matched?.maxCp ?? 4000;

  const lv20MinCp = Math.floor(lv20MaxCp * 0.945);
  const lv25MinCp = Math.floor(lv25MaxCp * 0.945);

  const hasDoubleWeakness = rawWeaknesses.some((w) => w.includes('2.56') || w.includes('2x'));
  const isShadowRaid = baseBossSlug.includes('shadow-');
  const isMegaOrPrimal = baseBossSlug.includes('mega-') || baseBossSlug.includes('primal-');

  const topCounterNames = countersList
    .slice(0, 6)
    .map((c) => `${c.localizedName} (${c.fastMove} + ${c.chargedMove})`)
    .join(', ');

  const faqQ1ByLang: Record<Language, string> = {
    cs: `Jaké jsou nejlepší counters na ${localizedName} v Pokémon GO?`,
    en: `What are the best raid counters for ${bossName} in Pokémon GO?`,
    ja: `Pokémon GOの${localizedName}レイド対策におすすめのポケモンは？`,
    ru: `Какие лучшие контр-покемоны против ${bossName} в рейдах Pokémon GO?`,
  };

  const faqA1ByLang: Record<Language, string> = {
    cs: `Raid boss ${localizedName} (${localizedTypes.join(' / ')}) má slabost vůči útokům typů ${weaknesses.join(', ')}. Mezi nejsilnější raid counters s nejvyšším DPS patří: ${topCounterNames}.`,
    en: `${bossName} (${localizedTypes.join(' / ')}) is weak to ${weaknesses.join(', ')} attacks. The highest-DPS raid counters are ${topCounterNames}.`,
    ja: `${localizedName}（${localizedTypes.join(' / ')}タイプ）の弱点は${weaknesses.join('、')}タイプです。おすすめ対策ポケモンは${topCounterNames}です。`,
    ru: `${bossName} (${localizedTypes.join(' / ')}) уязвим к атакам типов ${weaknesses.join(', ')}. Лучшие контр-покемоны: ${topCounterNames}.`,
  };

  const faqQ2ByLang: Record<Language, string> = {
    cs: `Jaké je 100% IV (Hundo) CP pro ${localizedName} z raidu?`,
    en: `What is the 100% IV Hundo CP for ${bossName} in raids?`,
    ja: `${localizedName}のレイド個体値100%（Hundo）のCPは？`,
    ru: `Какой CP у 100% IV (Hundo) ${bossName} после рейда?`,
  };

  const faqA2ByLang: Record<Language, string> = {
    cs: `100% IV (15/15/15) ${localizedName} má při chytání z raidu přesně ${lv20MaxCp} CP na úrovni 20 (bez počasí, rozsah ${lv20MinCp}–${lv20MaxCp} CP) a ${lv25MaxCp} CP na úrovni 25 při aktivním Weather Boostu (rozsah ${lv25MinCp}–${lv25MaxCp} CP).`,
    en: `A 100% IV (15/15/15) ${bossName} has ${lv20MaxCp} CP at Level 20 (normal catch, range ${lv20MinCp}–${lv20MaxCp} CP) and ${lv25MaxCp} CP at Level 25 (weather boosted, range ${lv25MinCp}–${lv25MaxCp} CP).`,
    ja: `個体値100%の${localizedName}の捕獲時CPは、通常時（PL20）が${lv20MaxCp}（範囲：${lv20MinCp}〜${lv20MaxCp}）、天候ブースト時（PL25）が${lv25MaxCp}（範囲：${lv25MinCp}〜${lv25MaxCp}）です。`,
    ru: `100% IV ${bossName} имеет ${lv20MaxCp} CP на 20-м уровне (диапазон ${lv20MinCp}–${lv20MaxCp} CP) и ${lv25MaxCp} CP на 25-м уровне с погодным бустом (диапазон ${lv25MinCp}–${lv25MaxCp} CP).`,
  };

  const faqQ3ByLang: Record<Language, string> = {
    cs: `Kolik hráčů je potřeba na poražení ${localizedName} v raidu?`,
    en: `How many trainers are needed to defeat ${bossName} in Pokémon GO raids?`,
    ja: `${localizedName}レイドは何人で討伐できますか？`,
    ru: `Сколько игроков нужно для победы над ${bossName} в рейде?`,
  };

  const faqA3ByLang: Record<Language, string> = {
    cs: hasDoubleWeakness
      ? `Díky dvojité slabosti (2,56× zranění) mohou ${localizedName} porazit již 2 dobře vybavení trenéři (Duo) s countery na úrovni 40+ a aktivním Party Power. Pro běžné skupiny doporučujeme 3–4 hráče.`
      : isShadowRaid
        ? `Protože jde o Shadow Raid, boss během souboje přechází do stavu Enraged (zvýšený útok a obrana). Připravte si 8 Purified Gems na jeho utlumení a skupinu alespoň 4–6 lokálních trenérů.`
        : `Pro bezpečné poražení bosse ${localizedName} doporučujeme skupinu 3 až 5 trenérů s optimálními Shadow a Mega countery na úrovni 35–45 a zapnutou funkcí Party Power.`,
    en: hasDoubleWeakness
      ? `Thanks to its double weakness (2.56x damage), ${bossName} can be defeated by a Duo (2 trainers) running Level 40+ counters with Party Power. Casual lobbies should bring 3–4 trainers.`
      : isShadowRaid
        ? `Because this is a Shadow Raid, the boss will become Enraged mid-battle. Coordinate 8 Purified Gems with 4–6 local trainers to subdue its defense boost.`
        : `We recommend 3 to 5 trainers with Level 35–45 Shadow and Mega counters alongside Party Power for a reliable clear against ${bossName}.`,
    ja: hasDoubleWeakness
      ? `二重弱点（2.56倍ダメージ）を突くことで、PL40以上の対策ポケモンとチームコラボを使用すれば2人（デュオ）討伐が可能です。安定討伐には3〜4人を推奨します。`
      : `安定して討伐するためには、PL35〜45の対策ポケモンを揃えた3〜5人のトレーナーでの挑戦を推奨します。`,
    ru: hasDoubleWeakness
      ? `Благодаря двойной уязвимости (2.56× урона) победить ${bossName} можно вдвоем (Duo) с покемонами 40+ уровня и Party Power.`
      : `Для надежной победы над ${bossName} рекомендуется группа из 3–5 тренеров с контр-покемонами 35–45 уровня.`,
  };

  const relatedBosses = ALL_RAID_SLUGS.filter((b) => b !== baseBossSlug).slice(0, 8);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `${localizedName} – Raid Guide, Weaknesses & Top Counters | Pokémon GO`,
        description: faqA1ByLang[lang] || faqA1ByLang.en,
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        author: { '@type': 'Organization', name: 'PoGo Events Editorial Team', url: 'https://pogoevents.app' },
        publisher: {
          '@type': 'Organization',
          name: 'PoGo Events Tracker',
          logo: { '@type': 'ImageObject', url: 'https://pogoevents.app/logo-icon-1080.png' },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: faqQ1ByLang[lang] || faqQ1ByLang.en,
            acceptedAnswer: { '@type': 'Answer', text: faqA1ByLang[lang] || faqA1ByLang.en },
          },
          {
            '@type': 'Question',
            name: faqQ2ByLang[lang] || faqQ2ByLang.en,
            acceptedAnswer: { '@type': 'Answer', text: faqA2ByLang[lang] || faqA2ByLang.en },
          },
          {
            '@type': 'Question',
            name: faqQ3ByLang[lang] || faqQ3ByLang.en,
            acceptedAnswer: { '@type': 'Answer', text: faqA3ByLang[lang] || faqA3ByLang.en },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: getBreadcrumbLabel('home', lang), item: `https://pogoevents.app/${lang}` },
          { '@type': 'ListItem', position: 2, name: getBreadcrumbLabel('raids', lang), item: `https://pogoevents.app/${lang}/raids` },
          { '@type': 'ListItem', position: 3, name: `${localizedName} Counters`, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <div className="standalone-raid-boss-hub" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb & Quick Actions */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <Link
          href={`/${lang}/raids`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '12px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '0.86rem',
          }}
        >
          ← {lang === 'cs' ? 'Zpět na živý přehled Raid Bossů' : lang === 'ja' ? '現在のレイドボス一覧へ戻る' : lang === 'ru' ? 'Назад к списку рейд-боссов' : 'Back to Active Raid Bosses'}
        </Link>
        {dexEntry && (
          <Link
            href={`/${lang}/pokedex/${dexEntry.slug}`}
            style={{
              padding: '8px 14px',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--cyan-accent)',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.84rem',
            }}
          >
            📖 {lang === 'cs' ? `Kompletní profil ${localizedName} v Pokédexu →` : `View ${bossName} in Pokédex →`}
          </Link>
        )}
      </nav>

      {/* Hero Raid Boss Breakdown Card */}
      <article
        className="seo-entity-summary card"
        style={{
          padding: '22px 24px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {matched && (
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${matched.pokedexId}.png`}
              alt={localizedName}
              width={92}
              height={92}
              style={{ objectFit: 'contain' }}
            />
          )}
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              {isShadowRaid ? 'Shadow Raid Boss Guide' : isMegaOrPrimal ? 'Mega / Primal Raid Boss Guide' : '5-Star Legendary Raid Guide'}
            </div>
            <h1 style={{ fontSize: '1.55rem', fontWeight: 850, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
              {lang === 'cs'
                ? `${localizedName} – Raid Counters, Slabosti, 100% IV CP a Taktika`
                : lang === 'ja'
                  ? `${localizedName} レイド対策・弱点・100% IV CP・最強カウンター一覧`
                  : lang === 'ru'
                    ? `${bossName} – Контр-покемоны, слабости и таблица 100% IV CP`
                    : `${bossName} Raid Guide – Best Counters, Weaknesses & 100% IV CP`}
            </h1>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              <strong>{lang === 'cs' ? 'Typ bosse:' : lang === 'ja' ? 'タイプ:' : lang === 'ru' ? 'Тип:' : 'Boss Type:'}</strong> {localizedTypes.join(' / ')} |{' '}
              <strong>{lang === 'cs' ? 'Slabosti (Counter typy):' : lang === 'ja' ? '弱点:' : lang === 'ru' ? 'Слабости:' : 'Weaknesses:'}</strong>{' '}
              <span style={{ color: '#4ade80', fontWeight: 700 }}>{weaknesses.join(', ')}</span>
            </p>
          </div>
        </div>

        {/* CP & IV Reference Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            marginBottom: '18px',
          }}
        >
          <div style={{ padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 700 }}>
              {lang === 'cs' ? '100% IV Hundo (Level 20 – Bez počasí)' : '100% IV Hundo (Level 20 Regular)'}
            </div>
            <div className="gold-hundo-text" style={{ fontSize: '1.25rem', fontWeight: 850, marginTop: '2px' }}>
              {lv20MaxCp} CP
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              {lang === 'cs' ? `Rozsah (10/10/10–15/15/15):` : 'CP Range:'} {lv20MinCp} – {lv20MaxCp} CP
            </div>
          </div>

          <div style={{ padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 700 }}>
              {lang === 'cs' ? '100% IV Weather Boost (Level 25)' : '100% IV Weather Boosted (Level 25)'}
            </div>
            <div className="gold-hundo-text" style={{ fontSize: '1.25rem', fontWeight: 850, marginTop: '2px' }}>
              {lv25MaxCp} CP
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              {lang === 'cs' ? `Rozsah s počasím:` : 'Boosted Range:'} {lv25MinCp} – {lv25MaxCp} CP
            </div>
          </div>

          <div style={{ padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 700 }}>
              {lang === 'cs' ? 'Maximální CP (Level 50) & Statistiky' : 'Max CP (Level 50) & Base Stats'}
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {lv50MaxCp} CP
            </div>
            {matched && (
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                ATK {matched.attack} • DEF {matched.defense} • STA {matched.stamina}
              </div>
            )}
          </div>
        </div>

        {/* Multi-paragraph Strategic Guide */}
        <h2 style={{ fontSize: '1.12rem', fontWeight: 800, margin: '0 0 8px 0' }}>
          {lang === 'cs'
            ? `Jak porazit ${localizedName}: Bojová strategie, Party Power a Mega bonusy`
            : lang === 'ja'
              ? `${localizedName}の討伐戦略・チームコラボ・メガシンカ活用法`
              : lang === 'ru'
                ? `Как победить ${bossName}: стратегия боя, Party Power и Мега-бонусы`
                : `How to Defeat ${bossName}: Combat Strategy, Party Power & Mega Buffs`}
        </h2>
        <p style={{ margin: '0 0 10px 0', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          {faqA3ByLang[lang] || faqA3ByLang.en}
        </p>
        <p style={{ margin: '0 0 16px 0', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          {lang === 'cs'
            ? `Při sestavování raidového týmu proti ${localizedName} kombinujte 1 Mega nebo Primal Pokémona (který všem ostatním hráčům v lobby zvyšuje poškození o 10 % celkově a o 30 % u útoků shodného živlu) s 5 špičkovými Shadow nebo Legendárními útočníky využívajícími slabosti ${weaknesses.join(', ')}. Pokud hrajete ve skupině alespoň 2 přátel, nezapomeňte před vstupem do lobby vytvořit Party (Tým) – tlačítko Party Power v raidu zdvojnásobí sílu každého dalšího nabíjecího útoku (Charged Move), což dramaticky zkracuje čas potřebný k poražení bosse a zvyšuje zisk Premier Ballů a Mega Energie.`
            : lang === 'ja'
              ? `${localizedName}対策パーティを組む際は、味方全体の同タイプ技威力を30%引き上げるメガシンカ（またはゲンシカイキ）枠を1匹編成し、残りの5枠に${weaknesses.join('・')}タイプの高火力シャドウ・伝説ポケモンを配置するのが最も効率的です。フレンドと一緒に挑戦する場合は必ず事前に「チーム（Party）」を組んでチームコラボ（Party Power：スペシャルアタック威力2倍）を発動させましょう。`
              : lang === 'ru'
                ? `При сборке команды против ${bossName} поставьте в слот одного Мега- или Праймал-покемона (он увеличивает урон союзников в лобби на 30% для атак того же типа) и 5 сильных Теневых (Shadow) или легендарных покемонов с атаками типов ${weaknesses.join(', ')}. Обязательно объединяйтесь в группу (Party Power) с друзьями для удвоения урона заряженных атак.`
                : `When building your raid team against ${bossName}, pair 1 active Mega or Primal Evolution (which grants a 30% damage multiplier to all allied trainers in the lobby using matching-type moves) with 5 high-DPS Shadow or Legendary attackers exploiting ${bossName}'s ${weaknesses.join(', ')} weaknesses. Always form a Party with friends before entering the gym lobby so you can trigger Party Power to double your Charged Attack damage output.`}
        </p>

        {/* Top 12 Counters Table */}
        {countersList.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 10px 0' }}>
              🏆{' '}
              {lang === 'cs'
                ? `TOP ${countersList.length} nejlepších Raid Counterů proti ${localizedName}`
                : lang === 'ja'
                  ? `${localizedName}対策 最強カウンターポケモン TOP ${countersList.length}`
                  : lang === 'ru'
                    ? `ТОП-${countersList.length} лучших контр-покемонов против ${bossName}`
                    : `Top ${countersList.length} Best Raid Counters vs. ${bossName}`}
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '8px' }}>#</th>
                  <th style={{ padding: '8px' }}>{lang === 'cs' ? 'Counter Pokémon' : lang === 'ja' ? '対策ポケモン' : lang === 'ru' ? 'Контр-покемон' : 'Counter Pokémon'}</th>
                  <th style={{ padding: '8px' }}>{lang === 'cs' ? 'Rychlý útok (Fast Move)' : lang === 'ja' ? 'ノーマルアタック' : lang === 'ru' ? 'Быстрая атака' : 'Fast Move'}</th>
                  <th style={{ padding: '8px' }}>{lang === 'cs' ? 'Nabíjecí útok (Charged Move)' : lang === 'ja' ? 'スペシャルアタック' : lang === 'ru' ? 'Заряженная атака' : 'Charged Move'}</th>
                  <th style={{ padding: '8px' }}>eDPS</th>
                </tr>
              </thead>
              <tbody>
                {countersList.map((c, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '8px', fontWeight: 800 }}>{idx + 1}</td>
                    <td style={{ padding: '8px', fontWeight: 700 }}>
                      <Link href={`/${lang}/pokedex/${c.slug}`} style={{ color: 'var(--cyan-accent)', textDecoration: 'none' }}>
                        {c.localizedName}
                      </Link>
                    </td>
                    <td style={{ padding: '8px' }}>{c.fastMove}</td>
                    <td style={{ padding: '8px', fontWeight: 600 }}>{c.chargedMove}</td>
                    <td style={{ padding: '8px', color: '#4ade80', fontWeight: 700 }}>{c.dps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>

      {/* FAQ Section */}
      <section
        className="card"
        style={{
          padding: '22px 24px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <h2 style={{ fontSize: '1.18rem', fontWeight: 800, margin: '0 0 14px 0' }}>
          ❓ {lang === 'cs' ? `Časté dotazy (FAQ): Raid Boss ${localizedName}` : `Frequently Asked Questions: ${bossName} Raid`}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { q: faqQ1ByLang[lang] || faqQ1ByLang.en, a: faqA1ByLang[lang] || faqA1ByLang.en },
            { q: faqQ2ByLang[lang] || faqQ2ByLang.en, a: faqA2ByLang[lang] || faqA2ByLang.en },
            { q: faqQ3ByLang[lang] || faqQ3ByLang.en, a: faqA3ByLang[lang] || faqA3ByLang.en },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}
            >
              <h3 style={{ fontSize: '0.94rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>{f.q}</h3>
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Raid Boss Guides */}
      <section
        className="card"
        style={{
          padding: '22px 24px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <h2 style={{ fontSize: '1.12rem', fontWeight: 800, margin: 0 }}>
            ⚔️ {lang === 'cs' ? 'Další populární Raid Boss průvodci' : lang === 'ja' ? 'その他の人気レイドボス対策' : lang === 'ru' ? 'Другие гайды по рейд-боссам' : 'More Popular Raid Boss Counter Guides'}
          </h2>
          <Link href={`/${lang}/raids`} style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-color)', textDecoration: 'none' }}>
            {lang === 'cs' ? 'Zobrazit živou rotaci raidů →' : 'View Live Raid Rotation →'}
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '10px', alignItems: 'start' }}>
          {relatedBosses.map((bSlug) => (
            <Link
              key={bSlug}
              href={`/${lang}/raids/${bSlug}-counters`}
              style={{
                display: 'block',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'rgba(255,255,255,0.02)',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                fontWeight: 750,
                fontSize: '0.88rem',
              }}
            >
              {cleanBossName(bSlug)} Counters →
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
