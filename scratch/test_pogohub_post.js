const https = require('https');

function postJson(url, body) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    };
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          reject(new Error(`Failed to parse: ${data.substring(0, 300)}`));
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function testPost() {
  const targetBob = {
    maxCP: 5000,
    atk: 200,
    def: 180,
    sta: 200,
    id: 0,
    name: "BOB",
    pokemonId: "BOB",
    type1: "normal",
    isMythical: false,
    isLegendary: false,
    generation: 0
  };

  const payload = {
    target: targetBob,
    locale: "en",
    targetRaidLevel: "5",
    weather: "EXTREME",
    responseSize: 50,
    includeShadowPokemon: true,
    includeMegaPokemon: true,
    includePrimalPokemon: true,
    includeUnavailablePokemon: false,
    allowLegacyMoves: true,
    rankForType: "normal",
    allowMixedMovesets: true,
    allowOfftypeAttackers: true,
    allowedAttackerChargeMoveId: null,
    allowedAttackerQuickMoveId: null,
    allowOnlyDynamaxEligiblePokémon: false
  };

  try {
    const res = await postJson('https://db.pokemongohub.net/api/counters', payload);
    console.log('Result for rankForType: normal:');
    console.log('Total attackers returned:', res.attackers ? res.attackers.length : 'none');
    if (res.attackers) {
      res.attackers.slice(0, 15).forEach((a, i) => {
        console.log(`  #${i+1}: ${a.attacker.name} [${a.attacker.form || 'Base'}] - Fast: ${a.qm.name}, Charge: ${a.cm.name}, DPS: ${a.dps.toFixed(2)}, Score/ER: ${a.score.toFixed(2)}`);
      });
    }
  } catch(err) {
    console.error('Error posting:', err.message);
  }
}

testPost();
