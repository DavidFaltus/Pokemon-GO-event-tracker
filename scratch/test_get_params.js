const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch(e) {
          resolve({ status: res.statusCode, raw: data.substring(0, 300) });
        }
      });
    }).on('error', reject);
  });
}

async function testGet() {
  const tests = [
    'https://db.pokemongohub.net/api/counters?type=normal',
    'https://db.pokemongohub.net/api/counters?type=fighting',
    'https://db.pokemongohub.net/api/counters?type=ghost',
    'https://db.pokemongohub.net/api/counters?rankForType=normal',
    'https://db.pokemongohub.net/api/counters?rankForType=fighting'
  ];

  for (const url of tests) {
    const res = await fetchJson(url);
    console.log(`URL: ${url} -> Status: ${res.status}`);
    if (res.data && res.data.attackers) {
      console.log(`  Count: ${res.data.attackers.length}`);
      console.log(`  Top 3:`, res.data.attackers.slice(0, 3).map(a => `${a.attacker.name} (${a.dps?.toFixed(1)} dps, ${a.score?.toFixed(1)} score)`));
    } else {
      console.log('  Raw:', res.raw);
    }
  }
}

testGet();
