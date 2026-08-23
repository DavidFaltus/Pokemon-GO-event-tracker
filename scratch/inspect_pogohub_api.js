const https = require('https');
const fs = require('fs');

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

async function inspect() {
  const normalData = await fetchJson('https://db.pokemongohub.net/api/counters?type=normal');
  console.log('Keys in normalData:', Object.keys(normalData));
  console.log('Total attackers in normalData:', normalData.attackers.length);
  console.log('Sample attacker 0:', JSON.stringify(normalData.attackers[0], null, 2));
  console.log('Sample attacker 1:', JSON.stringify(normalData.attackers[1], null, 2));
  console.log('Sample attacker 2:', JSON.stringify(normalData.attackers[2], null, 2));
}

inspect();
