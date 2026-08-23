const fs = require('fs');
const code = fs.readFileSync('C:/Users/Faltusovi/.gemini/antigravity-cli/brain/93568316-2b7b-4ad2-9adc-86fcceaa9abb/.system_generated/steps/1020/content.md', 'utf8');

console.log('Chunk length:', code.length);

// Search for fetch or urls or endpoints
const urlMatches = code.match(/https?:\/\/[^"'\s`]+|\/api\/[^"'\s`]+|\/data\/[^"'\s`]+|\.json/gi);
console.log('URLs/APIs found:', Array.from(new Set(urlMatches || [])));

// Search for keywords like bestAttackers, DialgaDex, gamemaster, pokeapi
const keywords = ['best', 'attacker', 'type', 'fetch', 'api', 'moves', 'dps', 'er', 'tdo', 'json'];
for (const kw of keywords) {
  const count = (code.match(new RegExp(kw, 'gi')) || []).length;
  console.log(`Keyword "${kw}": count ${count}`);
}
