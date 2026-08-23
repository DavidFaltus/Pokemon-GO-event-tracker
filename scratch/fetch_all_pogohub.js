const https = require('https');
const fs = require('fs');

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

async function fetchAllTypes() {
  const results = {};
  const allAttackersMap = new Map();

  for (const type of types) {
    console.log(`Fetching type: ${type}...`);
    try {
      const data = await fetchJson(`https://db.pokemongohub.net/api/counters?type=${type}`);
      results[type] = data;
      if (data && data.attackers) {
        for (const entry of data.attackers) {
          const name = entry.attacker.name;
          if (!allAttackersMap.has(name)) {
            allAttackersMap.set(name, entry);
          }
        }
      }
    } catch(err) {
      console.error(`Error fetching type ${type}:`, err.message);
    }
  }

  console.log(`\nTotal unique Pokemon forms across all 18 types: ${allAttackersMap.size}`);
  
  fs.writeFileSync('C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/scratch/all_pogohub_types.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('Saved raw data to scratch/all_pogohub_types.json');

  const names = Array.from(allAttackersMap.keys()).sort();
  console.log('Sample names (first 50):', names.slice(0, 50));
}

fetchAllTypes();
