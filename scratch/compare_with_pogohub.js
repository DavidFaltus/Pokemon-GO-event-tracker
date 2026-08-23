const fs = require('fs');
const https = require('https');

const types = [
  'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel',
  'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  // Load our rankings
  const rankingsContent = fs.readFileSync('frontend/src/data/pokemonRankings.ts', 'utf8');
  const startIndex = rankingsContent.indexOf('export const pokemonRankings: PokemonRankData[] =');
  const equalSign = rankingsContent.indexOf('=', startIndex);
  const arrayStart = rankingsContent.indexOf('[', equalSign);
  const nextFn = rankingsContent.indexOf('export function getPokemonByIdOrSlug');
  const arrayEnd = rankingsContent.lastIndexOf(']', nextFn);
  const localList = JSON.parse(rankingsContent.substring(arrayStart, arrayEnd + 1));
  const localMap = new Map();
  localList.forEach(p => {
    localMap.set(p.name.toLowerCase().trim(), p);
    localMap.set(p.pokedexId, p);
  });

  console.log(`Local rankings has ${localList.length} items.`);

  const missingFromLocal = [];
  const pogohubAll = new Map();

  for (const type of types) {
    try {
      const data = await fetchJson(`https://db.pokemongohub.net/api/counters?type=${type}`);
      if (data && data.attackers) {
        for (const item of data.attackers) {
          const name = item.attacker.name;
          const key = name.toLowerCase().trim();
          pogohubAll.set(key, { ...item, type });
          if (!localMap.has(key)) {
            missingFromLocal.push({
              name,
              type,
              id: item.attacker.id,
              dps: item.dps,
              score: item.score,
              qm: item.qm.name,
              cm: item.cm.name
            });
          }
        }
      }
    } catch(e) {
      console.error(`Error for type ${type}:`, e.message);
    }
  }

  console.log(`\nTotal Pogohub attackers fetched: ${pogohubAll.size}`);
  console.log(`Missing from our local rankings: ${missingFromLocal.length}`);
  if (missingFromLocal.length > 0) {
    console.log('List of missing:', missingFromLocal);
  }
}

run();
