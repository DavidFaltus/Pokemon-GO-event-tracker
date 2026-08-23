const fs = require('fs');
const content = fs.readFileSync('C:/Users/Faltusovi/.gemini/antigravity-cli/brain/93568316-2b7b-4ad2-9adc-86fcceaa9abb/.system_generated/steps/1008/content.md', 'utf8');

console.log('File length:', content.length);

// Extract text or links
const textMatch = content.match(/<table[\s\S]*?<\/table>/gi);
console.log('Tables count:', textMatch ? textMatch.length : 0);

// Look for json chunks or pokemon names in next_f
const pushMatches = content.match(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g);
console.log('Next_f pushes:', pushMatches ? pushMatches.length : 0);

if (pushMatches) {
  for (let i = 0; i < pushMatches.length; i++) {
    const raw = pushMatches[i];
    if (raw.includes('ER') || raw.includes('DPS') || raw.includes('Garchomp') || raw.includes('Normal') || raw.includes('Mega')) {
      console.log(`Push ${i} (length ${raw.length}):`, raw.substring(0, 300));
    }
  }
}
