const fs = require('fs');
const https = require('https');
const path = require('path');

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

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function calculateCp(atk, def, sta, level = 50) {
  // CPM for level 50 in Pokemon GO is ~0.84029999
  const cpm = 0.84029999;
  const cp = Math.max(10, Math.floor(((atk + 15) * Math.sqrt(def + 15) * Math.sqrt(sta + 15) * cpm * cpm) / 10));
  return cp;
}

async function syncAll() {
  console.log('Fetching all types from pokemongohub.net...');
  const allEntries = new Map();

  for (const type of types) {
    try {
      const data = await fetchJson(`https://db.pokemongohub.net/api/counters?type=${type}`);
      if (data && data.attackers) {
        for (const item of data.attackers) {
          const atkObj = item.attacker;
          const rawName = atkObj.name.trim();
          const cleanKey = rawName.toLowerCase();

          if (!allEntries.has(cleanKey)) {
            const typesArr = [capitalize(atkObj.type1)];
            if (atkObj.type2) {
              typesArr.push(capitalize(atkObj.type2));
            }

            const maxCp = calculateCp(atkObj.atk, atkObj.def, atkObj.sta, 50);
            const isShadow = rawName.toLowerCase().startsWith('shadow ') || atkObj.form === 'Shadow';
            const isMega = rawName.toLowerCase().startsWith('mega ') || atkObj.form === 'Mega' || atkObj.form === 'Mega X' || atkObj.form === 'Mega Y';
            const isPrimal = rawName.toLowerCase().startsWith('primal ') || atkObj.form === 'Primal';

            allEntries.set(cleanKey, {
              name: rawName,
              pokedexId: atkObj.id,
              types: typesArr,
              attack: atkObj.atk,
              defense: atkObj.def,
              stamina: atkObj.sta,
              maxCp: maxCp,
              pveScore: Math.round(item.score * 3.8), // scale to ~100 scale
              dps: parseFloat(item.dps.toFixed(2)),
              bestFastMove: {
                name: item.qm.name,
                type: capitalize(item.qm.type)
              },
              bestChargedMove: {
                name: item.cm.name,
                type: capitalize(item.cm.type)
              },
              isShadow,
              isMega,
              isPrimal,
              generation: atkObj.generation || 1
            });
          }
        }
      }
    } catch(err) {
      console.error(`Error fetching type ${type}:`, err.message);
    }
  }

  console.log(`Fetched ${allEntries.size} unique Pokemon from Pokemon GO Hub.`);

  // Load local rankings
  const rankingsPath = path.join(__dirname, '../frontend/src/data/pokemonRankings.ts');
  const content = fs.readFileSync(rankingsPath, 'utf8');
  const startIndex = content.indexOf('export const pokemonRankings: PokemonRankData[] =');
  const equalSign = content.indexOf('=', startIndex);
  const arrayStart = content.indexOf('[', equalSign);
  const nextFn = content.indexOf('export function getPokemonByIdOrSlug');
  const arrayEnd = content.lastIndexOf(']', nextFn);

  const localList = JSON.parse(content.substring(arrayStart, arrayEnd + 1));
  console.log(`Current local list count: ${localList.length}`);

  const localNameMap = new Map();
  localList.forEach((p, idx) => localNameMap.set(p.name.toLowerCase().trim(), idx));

  let updatedCount = 0;
  let addedCount = 0;

  for (const [key, entry] of allEntries) {
    if (localNameMap.has(key)) {
      const idx = localNameMap.get(key);
      localList[idx] = { ...localList[idx], ...entry };
      updatedCount++;
    } else {
      localList.unshift(entry);
      addedCount++;
    }
  }

  console.log(`Updated ${updatedCount} existing entries, added ${addedCount} new entries.`);
  console.log(`New total list count: ${localList.length}`);

  // Re-serialize
  const prefix = content.substring(0, arrayStart);
  const suffix = content.substring(arrayEnd + 1);
  const newContent = `${prefix}${JSON.stringify(localList, null, 2)}${suffix}`;

  fs.writeFileSync(rankingsPath, newContent, 'utf8');
  console.log('Successfully written updated pokemonRankings.ts');
}

syncAll();
