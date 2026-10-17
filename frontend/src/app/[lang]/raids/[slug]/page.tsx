import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RaidView } from '@/components/RaidView';
import type { Language } from '@/data/translations';
import { pokemonRankings, getPokemonByIdOrSlug } from '@/data/pokemonRankings';
import { raidCountersDb } from '@/data/raidCounters';
import { getPokemonName } from '@/utils/pokemonTranslator';
import { getCounterTypes, getTopCountersForPokemon } from '@/utils/pokemonCountersHelper';
import { buildAlternates, getBreadcrumbLabel } from '@/utils/seoHelper';

export const revalidate = 3600;

export const POPULAR_RAID_BOSSES = [
  'kyurem', 'shadow-palkia', 'mega-aggron', 'rayquaza', 'mewtwo', 'mega-lucario',
  'groudon', 'kyogre', 'dialga', 'palkia', 'giratina', 'heatran', 'regigigas',
  'zekrom', 'reshiram', 'xerneas', 'yveltal', 'necrozma', 'solgaleo', 'lunala',
  'mega-rayquaza', 'mega-garchomp', 'mega-tyranitar', 'mega-salamence', 'mega-gardevoir',
  'mega-charizard-y', 'mega-blastoise', 'mega-venusaur', 'shadow-mewtwo', 'shadow-raikou',
  'shadow-entei', 'shadow-suicune', 'shadow-moltres', 'shadow-zapdos', 'shadow-articuno',
  'shadow-kyogre', 'shadow-groudon', 'shadow-ho-oh', 'shadow-lugia', 'shadow-cresselia',
  'primal-groudon', 'primal-kyogre', 'zacian', 'zamazenta', 'eternatus', 'urshifu'
];

const ALL_RAID_SLUGS = Array.from(
  new Set([
    ...POPULAR_RAID_BOSSES,
    ...Object.keys(raidCountersDb).map((name) =>
      name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    ),
  ])
);

export function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const params: { lang: Language; slug: string }[] = [];

  languages.forEach((lang) => {
    ALL_RAID_SLUGS.forEach((boss) => {
      params.push({ lang, slug: `${boss}-counters` });
      params.push({ lang, slug: boss });
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
    cs: `${localizedName} Raid Counters & Slabosti | Pokémon GO`,
    en: `${bossName} Raid Counters, Weaknesses & Strategy | Pokémon GO`,
    ja: `${localizedName} レイド対策・弱点とおすすめポケモン | Pokémon GO`,
    ru: `${bossName} - Лучшие контр-покемоны и слабости в рейдах | Pokémon GO`,
  };

  const descByLang: Record<Language, string> = {
    cs: `Kompletní průvodce a nejlepší counters pro raid bosse ${localizedName} v Pokémon GO. Slabosti, Mega evoluce, 100% IV CP hodnoty a duo/trio obtížnost.`,
    en: `Complete raid guide and top counters for ${bossName} in Pokémon GO. Type weaknesses, best Mega & Shadow counters, 100% IV CP chart, and raid difficulty.`,
    ja: `Pokémon GOの${localizedName}レイドバトル対策ガイド。弱点タイプ、おすすめメガシンカ、100% IV CP値と討伐人数。`,
    ru: `Полный гайд и лучшие контр-покемоны для рейда против ${bossName} в Pokémon GO. Уязвимости, CP со 100% IV и тактика.`,
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
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: bossName }]
    }
  };
}

export default async function RaidBossCounterPage({ params }: PageProps) {
  const unwrapped = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrapped.lang as Language) ? (unwrapped.lang as Language) : 'cs';
  const rawSlug = unwrapped.slug.toLowerCase();
  const normalizedSlug = rawSlug.endsWith('-counters') ? rawSlug : `${rawSlug}-counters`;
  const bossName = cleanBossName(rawSlug);
  const matched = getPokemonByIdOrSlug(bossName.replace(/shadow|mega|primal/gi, '').trim());
  const dbKey = Object.keys(raidCountersDb).find(
    (k) => k.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === rawSlug.replace(/-counters$/i, '')
  );
  const dbCounters = dbKey ? raidCountersDb[dbKey] : undefined;

  if (!matched && !dbCounters && !ALL_RAID_SLUGS.some(b => rawSlug.includes(b))) {
    notFound();
  }

  const localizedName = matched ? getPokemonName(matched.name, lang) : bossName;
  const canonicalUrl = `https://pogoevents.app/${lang}/raids/${normalizedSlug}`;
  const types = matched?.types || ['Normal'];
  const weaknesses = dbCounters?.weaknesses?.length
    ? dbCounters.weaknesses
    : getCounterTypes(types).map((w) => `${w.type} (${w.label})`);
  const computedCounters = matched ? getTopCountersForPokemon(matched, pokemonRankings).slice(0, 6) : [];
  const countersList = computedCounters.length > 0
    ? computedCounters.map((c) => ({
        name: c.pokemon.name,
        fastMove: c.pokemon.bestFastMove.name,
        chargedMove: c.pokemon.bestChargedMove.name,
      }))
    : (dbCounters?.advancedCounters || []).slice(0, 6).map((entry) => {
        const match = entry.match(/^([^(]+)\(([^)]+)\)$/);
        return {
          name: match ? match[1].trim() : entry,
          fastMove: 'Optimal Fast',
          chargedMove: match ? match[2].trim() : 'Optimal Charged',
        };
      });

  const lv20MaxCp = dbCounters?.maxCp
    ?? (matched ? Math.floor(((matched.attack + 15) * Math.sqrt(matched.defense + 15) * Math.sqrt(matched.stamina + 15) * (0.5974 * 0.5974)) / 10) : null);
  const lv25MaxCp = dbCounters?.maxBoostedCp
    ?? (matched ? Math.floor(((matched.attack + 15) * Math.sqrt(matched.defense + 15) * Math.sqrt(matched.stamina + 15) * (0.667934 * 0.667934)) / 10) : null);

  const hasDoubleWeakness = weaknesses.some((w) => w.includes('2.56') || w.includes('2x'));
  const topCounterNames = countersList.map((c) => `${getPokemonName(c.name, lang)} (${c.fastMove} + ${c.chargedMove})`).join(', ');

  const faqQ1ByLang: Record<Language, string> = {
    cs: `Jaké jsou nejlepší counters na ${localizedName} v Pokémon GO?`,
    en: `What are the best raid counters for ${bossName} in Pokémon GO?`,
    ja: `Pokémon GOの${localizedName}レイド対策におすすめのポケモンは？`,
    ru: `Какие лучшие контр-покемоны против ${bossName} в рейдах Pokémon GO?`,
  };

  const faqA1ByLang: Record<Language, string> = {
    cs: `Raid boss ${localizedName} (${types.join('/')}) má slabost vůči útokům typů ${weaknesses.join(', ')}. Mezi nejlepší raid counters patří: ${topCounterNames}.`,
    en: `${bossName} (${types.join('/')}) is weak to ${weaknesses.join(', ')} attacks. The top raid counters are ${topCounterNames}.`,
    ja: `${localizedName}（${types.join('/')}タイプ）の弱点は${weaknesses.join('、')}タイプです。おすすめ対策ポケモンは${topCounterNames}です。`,
    ru: `${bossName} (${types.join('/')}) уязвим к атакам типов ${weaknesses.join(', ')}. Лучшие контр-покемоны: ${topCounterNames}.`,
  };

  const faqQ2ByLang: Record<Language, string> = {
    cs: `Jaké je 100% IV (Hundo) CP pro ${localizedName} z raidu?`,
    en: `What is the 100% IV Hundo CP for ${bossName} in raids?`,
    ja: `${localizedName}のレイド個体値100%（Hundo）のCPは？`,
    ru: `Какой CP у 100% IV (Hundo) ${bossName} после рейда?`,
  };

  const faqA2ByLang: Record<Language, string> = {
    cs: `100% IV ${localizedName} má při chytání z raidu ${lv20MaxCp} CP na úrovni 20 (bez počasí) a ${lv25MaxCp} CP na úrovni 25 (při aktivním Weather Boostu).`,
    en: `100% IV ${bossName} has ${lv20MaxCp} CP at Level 20 (normal catch) and ${lv25MaxCp} CP at Level 25 (weather boosted).`,
    ja: `個体値100%の${localizedName}のCPは、通常時（PL20）が${lv20MaxCp}、天候ブースト時（PL25）が${lv25MaxCp}です。`,
    ru: `100% IV ${bossName} имеет ${lv20MaxCp} CP на 20-м уровне (обычная поимка) и ${lv25MaxCp} CP на 25-м уровне (с погодным бустом).`,
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `${localizedName} – Raid Guide & Counters | Pokémon GO`,
        description: faqA1ByLang[lang] || faqA1ByLang.en,
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        author: { '@type': 'Organization', name: 'PoGo Events Tracker', url: 'https://pogoevents.app' },
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
            acceptedAnswer: {
              '@type': 'Answer',
              text: faqA1ByLang[lang] || faqA1ByLang.en,
            },
          },
          ...(lv20MaxCp && lv25MaxCp
            ? [
                {
                  '@type': 'Question',
                  name: faqQ2ByLang[lang] || faqQ2ByLang.en,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faqA2ByLang[lang] || faqA2ByLang.en,
                  },
                },
              ]
            : []),
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: getBreadcrumbLabel('home', lang), item: `https://pogoevents.app/${lang}` },
          { '@type': 'ListItem', position: 2, name: getBreadcrumbLabel('raids', lang), item: `https://pogoevents.app/${lang}/raids` },
          { '@type': 'ListItem', position: 3, name: `${localizedName} Counters`, item: canonicalUrl }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article
        className="seo-entity-summary card"
        style={{
          marginBottom: '20px',
          padding: '18px 22px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px 0' }}>
          {lang === 'cs'
            ? `${localizedName} – Strategický průvodce raidem, slabosti, 100% IV CP a Top Counters`
            : lang === 'ja'
              ? `${localizedName} レイド対策・弱点・100% IV CP 早見表`
              : lang === 'ru'
                ? `${bossName} – Слабости, 100% IV CP и лучшие контр-покемоны`
                : `${bossName} Raid Guide – Weaknesses, 100% IV CP & Top Counters`}
        </h2>
        <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
          <strong>{lang === 'cs' ? 'Typ:' : lang === 'ja' ? 'タイプ:' : lang === 'ru' ? 'Тип:' : 'Type:'}</strong> {types.join(' / ')} |{' '}
          <strong>{lang === 'cs' ? 'Slabosti (Counter typy):' : lang === 'ja' ? '弱点:' : lang === 'ru' ? 'Слабости:' : 'Weaknesses:'}</strong> {weaknesses.join(', ')}
          {lv20MaxCp && lv25MaxCp ? (
            <>
              {' '}| <strong>100% IV CP (Lv 20):</strong> {lv20MaxCp} CP | <strong>100% IV Weather Boost (Lv 25):</strong> {lv25MaxCp} CP
            </>
          ) : null}
        </p>
        <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
          {lang === 'cs'
            ? `Při souboji s raid bossem ${localizedName} v Pokémon GO se zaměřte na útočníky využívající slabosti ${weaknesses.join(', ')}. ${hasDoubleWeakness ? `Díky dvojité slabosti (2,56× poškození) lze bosse ${localizedName} porazit v 2–3 dobře vybavených trenérech s Pokémony na úrovni 40+.` : `Pro spolehlivé poražení bosse ${localizedName} doporučujeme skupinu 3 až 5 trenérů s optimálními Shadow a Mega countery na úrovni 35–40.`} Nezapomeňte aktivovat Mega evoluci stejného útočného typu (+30 % bonus poškození pro celou skupinu) a využít Party Power v týmu přátel.`
            : lang === 'ja'
              ? `${localizedName}のレイドバトルでは、弱点である${weaknesses.join('、')}タイプの技を持つアタッカーを優先して編成しましょう。${hasDoubleWeakness ? '二重弱点（2.56倍ダメージ）を突くことで、PL40以上の対策ポケモンを揃えたトレーナー2〜3人での討伐が可能です。' : '安定して討伐するためには、PL35〜40のシャドウやメガシンカポケモンを揃えた3〜5人のトレーナーでの挑戦を推奨します。'}味方全体の火力を30%引き上げるメガシンカボーナスやチームコラボ（Party Power）も積極的に活用してください。`
              : lang === 'ru'
                ? `В рейде против ${bossName} в Pokémon GO используйте атакующих покемонов с типами атак ${weaknesses.join(', ')}. ${hasDoubleWeakness ? `Благодаря двойной уязвимости (2.56× урона) победить ${bossName} можно группой из 2–3 тренеров с покемонами 40+ уровня.` : `Для уверенной победы над ${bossName} рекомендуется группа из 3–5 тренеров с оптимальными Теневыми и Мега-покемонами 35–40 уровня.`} Активируйте Мега-эволюцию (+30% к урону союзников) и бонус группы (Party Power).`
                : `When challenging ${bossName} in Pokémon GO raids, prioritize counters with ${weaknesses.join(', ')} moves. ${hasDoubleWeakness ? `Because ${bossName} has a double weakness (2.56x damage), 2 to 3 well-prepared trainers with Level 40+ counters can reliably complete the raid.` : `For a safe victory against ${bossName}, we recommend a lobby of 3 to 5 trainers running Level 35–40 Shadow and Mega counters.`} Always coordinate an active Mega Evolution (+30% ally damage boost) and Party Power for maximum DPS.`}
        </p>
        {countersList.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '6px 8px' }}>#</th>
                  <th style={{ padding: '6px 8px' }}>{lang === 'cs' ? 'Counter Pokémon' : lang === 'ja' ? '対策ポケモン' : lang === 'ru' ? 'Контр-покемон' : 'Counter Pokémon'}</th>
                  <th style={{ padding: '6px 8px' }}>{lang === 'cs' ? 'Rychlý útok (Fast Move)' : lang === 'ja' ? 'ノーマルアタック' : lang === 'ru' ? 'Быстрая атака' : 'Fast Move'}</th>
                  <th style={{ padding: '6px 8px' }}>{lang === 'cs' ? 'Nabíjecí útok (Charged Move)' : lang === 'ja' ? 'スペシャルアタック' : lang === 'ru' ? 'Заряженная атака' : 'Charged Move'}</th>
                </tr>
              </thead>
              <tbody>
                {countersList.map((c, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '6px 8px', fontWeight: 700 }}>{idx + 1}</td>
                    <td style={{ padding: '6px 8px', fontWeight: 700 }}>{getPokemonName(c.name, lang)}</td>
                    <td style={{ padding: '6px 8px' }}>{c.fastMove}</td>
                    <td style={{ padding: '6px 8px' }}>{c.chargedMove}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>
      <RaidView lang={lang} initialExpandedBoss={dbKey || bossName} />
    </>
  );
}
