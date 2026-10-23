import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PokemonRankingsView } from '@/components/PokemonRankingsView';
import { pokemonRankings, getPokemonByIdOrSlug, ALL_POKEDEX_IDS } from '@/data/pokemonRankings';
import { getPokemonName } from '@/utils/pokemonTranslator';
import { getCounterTypes, getTopCountersForPokemon } from '@/utils/pokemonCountersHelper';
import { isPokemonReleased } from '@/utils/pokemonReleaseHelper';
import { analyzeGreatLeague, analyzeUltraLeague, getEvolutionFamily } from '@/utils/pokedexSeoHelper';
import { buildAlternates, getBreadcrumbLabel } from '@/utils/seoHelper';
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

interface PokemonPageProps {
  params: Promise<{
    lang: Language;
    id: string;
  }>;
}

function calcCpAtCpm(attack: number, defense: number, stamina: number, cpm: number): number {
  return Math.max(10, Math.floor(((attack + 15) * Math.sqrt(defense + 15) * Math.sqrt(stamina + 15) * (cpm * cpm)) / 10));
}

export async function generateMetadata({ params }: PokemonPageProps): Promise<Metadata> {
  const { lang, id } = await params;
  const matched = getPokemonByIdOrSlug(id);

  if (!matched || matched.pokedexId > 1025) {
    return {
      title: 'Pokémon Not Found | Pokémon GO Event Tracker',
      description: 'Pokémon detail not found.',
      robots: { index: false, follow: false },
    };
  }

  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const validLang: Language = validLanguages.includes(lang as Language) ? (lang as Language) : 'cs';
  const localizedName = getPokemonName(matched.name, validLang);
  const released = isPokemonReleased(matched.pokedexId);

  const titleByLang: Record<Language, string> = {
    cs: `${localizedName} (#${matched.pokedexId}) – Statistiky, Nejlepší Útoky & Max CP | Pokémon GO`,
    en: `${matched.name} (#${matched.pokedexId}) – Stats, Best Moveset & Max CP | Pokémon GO`,
    ja: `${localizedName} (図鑑No.${matched.pokedexId}) – ステータス・最適技・最大CP | Pokémon GO`,
    ru: `${matched.name} (#${matched.pokedexId}) – Характеристики, лучшие атаки и макс. CP | Pokémon GO`,
  };
  const title = titleByLang[validLang] || titleByLang.en;

  const descByLang: Record<Language, string> = {
    cs: `Kompletní statistiky pro ${localizedName} (#${matched.pokedexId}) v Pokémon GO. Typ: ${matched.types.join('/')}, Max CP: ${matched.maxCp}, nejlepší útoky: ${matched.bestFastMove.name} a ${matched.bestChargedMove.name}, 100% IV hodnoty a counters.`,
    en: `Complete stats for ${matched.name} (#${matched.pokedexId}) in Pokémon GO. Type: ${matched.types.join('/')}, Max CP: ${matched.maxCp}, best fast & charged moves (${matched.bestFastMove.name} / ${matched.bestChargedMove.name}), 100% IV values, and top counters.`,
    ja: `Pokémon GOの${localizedName} (図鑑No.${matched.pokedexId}) のステータス、最大CP (${matched.maxCp})、おすすめ最適技 (${matched.bestFastMove.name} / ${matched.bestChargedMove.name})、タイプ相性と対策まとめ。`,
    ru: `Полные характеристики ${matched.name} (#${matched.pokedexId}) в Pokémon GO. Тип: ${matched.types.join('/')}, Макс. CP: ${matched.maxCp}, лучшие атаки, 100% IV и контр-покемоны.`
  };
  const description = descByLang[validLang] || descByLang.en;
  const canonicalUrl = `https://pogoevents.app/${validLang}/pokemon/${matched.pokedexId}`;

  return {
    title,
    description,
    robots: released ? { index: true, follow: true } : { index: false, follow: true },
    keywords: [
      matched.name,
      localizedName,
      `${matched.name} pokemon go`,
      `${matched.name} max cp`,
      `${matched.name} best moveset`,
      `${matched.name} counters`,
      'pokemon go iv chart',
      'pokemon rankings'
    ],
    alternates: buildAlternates(validLang, `/pokemon/${matched.pokedexId}`),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${matched.pokedexId}.png`,
          width: 475,
          height: 475,
          alt: matched.name,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${matched.pokedexId}.png`],
    }
  };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { lang, id } = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const validLang: Language = validLanguages.includes(lang as Language) ? (lang as Language) : 'cs';

  const matched = getPokemonByIdOrSlug(id);
  if (!matched || matched.pokedexId > 1025) {
    notFound();
  }

  const localizedName = getPokemonName(matched.name, validLang);
  const canonicalUrl = `https://pogoevents.app/${validLang}/pokemon/${matched.pokedexId}`;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${matched.pokedexId}.png`;
  const weaknesses = getCounterTypes(matched.types).map((w) => `${w.type} (${w.label})`);
  const topCounters = getTopCountersForPokemon(matched, pokemonRankings).slice(0, 5);
  const released = isPokemonReleased(matched.pokedexId);

  const glAnalysis = analyzeGreatLeague(matched);
  const ulAnalysis = analyzeUltraLeague(matched);
  const { prev: prevPoke, next: nextPoke, megaVariants } = getEvolutionFamily(matched);

  const cpLv15 = calcCpAtCpm(matched.attack, matched.defense, matched.stamina, 0.51739395);
  const cpLv20 = calcCpAtCpm(matched.attack, matched.defense, matched.stamina, 0.5974);
  const cpLv25 = calcCpAtCpm(matched.attack, matched.defense, matched.stamina, 0.667934);
  const cpLv40 = calcCpAtCpm(matched.attack, matched.defense, matched.stamina, 0.7903);

  const faqQuestionByLang: Record<Language, string> = {
    cs: `Jaké jsou nejlepší útoky a Max CP pro ${localizedName} (#${matched.pokedexId})?`,
    en: `What is the best moveset and Max CP for ${matched.name} (#${matched.pokedexId}) in Pokémon GO?`,
    ja: `Pokémon GOにおける${localizedName}（図鑑No.${matched.pokedexId}）の最適技と最大CPは？`,
    ru: `Какие лучшие атаки и максимальный CP у ${matched.name} (#${matched.pokedexId}) в Pokémon GO?`,
  };

  const faqAnswerByLang: Record<Language, string> = {
    cs: `${localizedName} (#${matched.pokedexId}) je Pokémon typu ${matched.types.join('/')} s maximálním CP ${matched.maxCp} na úrovni 50 (Útok: ${matched.attack}, Obrana: ${matched.defense}, Výdrž: ${matched.stamina}). Jeho optimální PvE kombinace útoků je ${matched.bestFastMove.name} (rychlý útok) a ${matched.bestChargedMove.name} (nabíjecí útok) s výkonem ${matched.dps} DPS. Mezi jeho hlavní slabosti patří útoky typů ${weaknesses.join(', ')}.`,
    en: `${matched.name} (#${matched.pokedexId}) is a ${matched.types.join('/')} type Pokémon with a Maximum CP of ${matched.maxCp} at Level 50 (Attack: ${matched.attack}, Defense: ${matched.defense}, Stamina: ${matched.stamina}). Its optimal PvE moveset is ${matched.bestFastMove.name} (Fast) and ${matched.bestChargedMove.name} (Charged), delivering ${matched.dps} DPS. It is weak to ${weaknesses.join(', ')} attacks.`,
    ja: `${localizedName}（図鑑No.${matched.pokedexId}）は${matched.types.join('/')}タイプのポケモンで、レベル50時の最大CPは${matched.maxCp}（攻撃: ${matched.attack}、防御: ${matched.defense}、HP: ${matched.stamina}）です。PvEの最適技構成は「${matched.bestFastMove.name}」（ノーマルアタック）と「${matched.bestChargedMove.name}」（スペシャルアタック）で、DPSは${matched.dps}です。弱点タイプは${weaknesses.join('、')}です。`,
    ru: `${matched.name} (#${matched.pokedexId}) — покемон типа ${matched.types.join('/')} с максимальным CP ${matched.maxCp} на 50-м уровне (Атака: ${matched.attack}, Защита: ${matched.defense}, Выносливость: ${matched.stamina}). Лучший набор атак для PvE: ${matched.bestFastMove.name} и ${matched.bestChargedMove.name} (${matched.dps} DPS). Уязвим к атакам типов: ${weaknesses.join(', ')}.`,
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemPage',
        '@id': canonicalUrl,
        name: `${localizedName} (#${matched.pokedexId}) - Pokémon GO`,
        description: faqAnswerByLang[validLang] || faqAnswerByLang.en,
        url: canonicalUrl,
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: imageUrl,
        },
        mainEntity: {
          '@type': 'Thing',
          name: localizedName,
          identifier: matched.pokedexId.toString(),
          description: faqAnswerByLang[validLang] || faqAnswerByLang.en,
          image: imageUrl,
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: faqQuestionByLang[validLang] || faqQuestionByLang.en,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faqAnswerByLang[validLang] || faqAnswerByLang.en,
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: getBreadcrumbLabel('home', validLang),
            item: `https://pogoevents.app/${validLang}`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: getBreadcrumbLabel('rankings', validLang),
            item: `https://pogoevents.app/${validLang}/rankings`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${localizedName} (#${matched.pokedexId})`,
            item: canonicalUrl
          }
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
          marginBottom: '18px',
          padding: '16px 20px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 8px 0' }}>
          {localizedName} (#{matched.pokedexId}) –{' '}
          {validLang === 'cs'
            ? 'Přehled statistik, 100% IV CP, útoků a slabostí'
            : validLang === 'ja'
              ? '種族値・100% IV CP・最適技・弱点まとめ'
              : validLang === 'ru'
                ? 'Статистика, 100% IV CP, лучшие атаки и слабости'
                : 'Base Stats, 100% IV CP, Best Moveset & Weaknesses'}
        </h2>
        {!released && (
          <p style={{ margin: '0 0 10px 0', padding: '8px 12px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.35)', fontSize: '0.84rem', color: '#fbbf24' }}>
            {validLang === 'cs'
              ? `Upozornění: ${localizedName} (#${matched.pokedexId}) zatím nebyl oficiálně vydán ve hře Pokémon GO. Níže uvedené statistiky a přepočty CP vycházejí ze základních parametrů hlavní série her.`
              : validLang === 'ja'
                ? `※注意：${localizedName}（図鑑No.${matched.pokedexId}）は現在Pokémon GOに未実装です。以下のステータスおよびCPは原作データからの予測換算値です。`
                : validLang === 'ru'
                  ? `Примечание: ${matched.name} (#${matched.pokedexId}) еще не выпущен в Pokémon GO. Приведенные ниже характеристики и значения CP рассчитаны на основе базовых параметров основной серии игр.`
                  : `Note: ${matched.name} (#${matched.pokedexId}) has not yet been officially released in Pokémon GO. The base stats and CP projections below are calculated from mainline game parameters.`}
          </p>
        )}
        <p style={{ margin: '0 0 8px 0', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
          <strong>{validLang === 'cs' ? 'Typ:' : validLang === 'ja' ? 'タイプ:' : validLang === 'ru' ? 'Тип:' : 'Type:'}</strong>{' '}
          {matched.types.map((t, i) => (
            <span key={t}>
              {i > 0 ? ' / ' : ''}
              <Link href={`/${validLang}/types/${t.toLowerCase()}`} style={{ color: 'var(--cyan-accent)', textDecoration: 'none', fontWeight: 700 }}>
                {t}
              </Link>
            </span>
          ))}{' '}
          | <strong>Max CP (Lv 50):</strong> {matched.maxCp} CP |{' '}
          <strong>ATK / DEF / STA:</strong> {matched.attack} / {matched.defense} / {matched.stamina} |{' '}
          <strong>{validLang === 'cs' ? 'Ideální Moveset:' : validLang === 'ja' ? '最適技:' : validLang === 'ru' ? 'Лучший мувсет:' : 'Best Moveset:'}</strong>{' '}
          {matched.bestFastMove.name} + {matched.bestChargedMove.name} ({matched.dps} DPS) |{' '}
          <strong>{validLang === 'cs' ? 'Slabosti:' : validLang === 'ja' ? '弱点:' : validLang === 'ru' ? 'Слабости:' : 'Weaknesses:'}</strong>{' '}
          {weaknesses.join(', ')}
        </p>
        <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
          <strong>100% IV (Hundo) CP:</strong>{' '}
          Lv 15 ({validLang === 'cs' ? 'Field Research' : 'Research'}): <strong>{cpLv15} CP</strong> |{' '}
          Lv 20 ({validLang === 'cs' ? 'Raid / Líhnutí' : 'Raid / Egg'}): <strong>{cpLv20} CP</strong> |{' '}
          Lv 25 (Weather Boost): <strong>{cpLv25} CP</strong> |{' '}
          Lv 40: <strong>{cpLv40} CP</strong> |{' '}
          Lv 50 (XL): <strong>{matched.maxCp} CP</strong>
        </p>
        <p style={{ margin: '0 0 8px 0', fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
          {validLang === 'cs'
            ? `V PvE raidech a soubojích o Gymy dosahuje ${localizedName} se základním útokem ${matched.attack} a výdrží ${matched.stamina} efektivního výkonu ${matched.dps} DPS. Pro maximální poškození používejte rychlý útok ${matched.bestFastMove.name} v kombinaci s nabíjecím útokem ${matched.bestChargedMove.name}. Pokud proti ${localizedName} stojíte jako proti raid bossovi nebo obránci Gymu, využijte útočníky s útoky typů ${weaknesses.slice(0, 3).join(', ')}.`
            : validLang === 'ja'
              ? `レイドバトルやジム攻撃において、${localizedName}は攻撃種族値${matched.attack}・HP種族値${matched.stamina}を持ち、最適技「${matched.bestFastMove.name}」と「${matched.bestChargedMove.name}」の組み合わせで${matched.dps} DPSを発揮します。対策する場合は弱点である${weaknesses.slice(0, 3).join('、')}タイプのアタッカーを編成しましょう。`
              : validLang === 'ru'
                ? `В PvE-рейдах и битвах за гимы ${matched.name} с базовой атакой ${matched.attack} и выносливостью ${matched.stamina} выдает ${matched.dps} DPS при использовании комбинации ${matched.bestFastMove.name} + ${matched.bestChargedMove.name}. Для победы над ${matched.name} в рейде выбирайте контр-покемонов с атаками типов ${weaknesses.slice(0, 3).join(', ')}.`
                : `In PvE raid battles and Gym offenses, ${matched.name} combines a base Attack of ${matched.attack} and Stamina of ${matched.stamina} to achieve ${matched.dps} DPS with ${matched.bestFastMove.name} and ${matched.bestChargedMove.name}. When facing ${matched.name} as a raid boss or defender, prioritize counters using ${weaknesses.slice(0, 3).join(', ')} moves.`}
        </p>
        {topCounters.length > 0 && (
          <p style={{ margin: '0 0 12px 0', fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
            <strong>{validLang === 'cs' ? 'Nejlepší Counters:' : validLang === 'ja' ? 'おすすめ対策ポケモン:' : validLang === 'ru' ? 'Лучшие контр-покемоны:' : 'Top Counters:'}</strong>{' '}
            {topCounters.map((c, idx) => (
              <span key={c.pokemon.pokedexId + '-' + idx}>
                {idx > 0 ? ', ' : ''}
                <Link href={`/${validLang}/pokemon/${c.pokemon.pokedexId}`} style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}>
                  {getPokemonName(c.pokemon.name, validLang)}
                </Link>{' '}
                ({c.pokemon.bestFastMove.name} / {c.pokemon.bestChargedMove.name})
              </span>
            ))}
          </p>
        )}

        {/* PvP League Stat Product Deep Dive */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: 800, color: 'var(--cyan-accent)' }}>
              🔵 Great League (CP ≤ 1500)
            </h3>
            <p style={{ margin: '0 0 4px 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <strong>{validLang === 'cs' ? 'Max CP v lize:' : validLang === 'ja' ? 'リーグ内最大CP:' : validLang === 'ru' ? 'Макс. CP:' : 'Max League CP:'}</strong> {glAnalysis.maxCpInLeague} CP ({validLang === 'cs' ? 'cca Level' : 'approx. Lvl'} {glAnalysis.bestLevel})
            </p>
            <p style={{ margin: '0 0 4px 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <strong>{validLang === 'cs' ? 'Optimální PvP IV:' : validLang === 'ja' ? '最適PvP個体値:' : validLang === 'ru' ? 'Оптимальный IV:' : 'Optimal PvP IV:'}</strong> <span style={{ color: 'var(--gold-hundo)', fontWeight: 700 }}>{glAnalysis.optimalIvSpread}</span>
            </p>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              {glAnalysis.notes[validLang] || glAnalysis.notes.en}
            </p>
          </div>

          <div style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: 'rgba(170, 59, 255, 0.08)', border: '1px solid rgba(170, 59, 255, 0.25)' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-color)' }}>
              🟡 Ultra League (CP ≤ 2500)
            </h3>
            <p style={{ margin: '0 0 4px 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <strong>{validLang === 'cs' ? 'Max CP v lize:' : validLang === 'ja' ? 'リーグ内最大CP:' : validLang === 'ru' ? 'Макс. CP:' : 'Max League CP:'}</strong> {ulAnalysis.maxCpInLeague} CP ({validLang === 'cs' ? 'cca Level' : 'approx. Lvl'} {ulAnalysis.bestLevel})
            </p>
            <p style={{ margin: '0 0 4px 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <strong>{validLang === 'cs' ? 'Optimální PvP IV:' : validLang === 'ja' ? '最適PvP個体値:' : validLang === 'ru' ? 'Оптимальный IV:' : 'Optimal PvP IV:'}</strong> <span style={{ color: 'var(--gold-hundo)', fontWeight: 700 }}>{ulAnalysis.optimalIvSpread}</span>
            </p>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              {ulAnalysis.notes[validLang] || ulAnalysis.notes.en}
            </p>
          </div>
        </div>

        {/* Pokédex Interlinking & Mega Variants */}
        <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '0.82rem' }}>
          <div>
            {prevPoke && (
              <Link href={`/${validLang}/pokemon/${prevPoke.pokedexId}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>
                ← #{prevPoke.pokedexId} {getPokemonName(prevPoke.name, validLang)}
              </Link>
            )}
          </div>
          {megaVariants.length > 0 && (
            <div style={{ color: 'var(--gold-hundo)', fontWeight: 700 }}>
              {validLang === 'cs' ? 'Mega Formy:' : validLang === 'ja' ? 'メガシンカ:' : validLang === 'ru' ? 'Мега-формы:' : 'Mega Forms:'}{' '}
              {megaVariants.map((m) => getPokemonName(m.name, validLang)).join(', ')}
            </div>
          )}
          <div>
            {nextPoke && (
              <Link href={`/${validLang}/pokemon/${nextPoke.pokedexId}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>
                #{nextPoke.pokedexId} {getPokemonName(nextPoke.name, validLang)} →
              </Link>
            )}
          </div>
        </div>
      </article>
      <PokemonRankingsView lang={validLang} initialSearchQuery={`#${matched.pokedexId}`} />
    </>
  );
}
