const fs = require('fs');
const code = fs.readFileSync('C:/Users/Faltusovi/.gemini/antigravity-cli/brain/93568316-2b7b-4ad2-9adc-86fcceaa9abb/.system_generated/steps/1055/content.md', 'utf8');

const matches = code.match(/s2:[^,}]+|gM:[^,}]+/g);
console.log('Matches:', matches);

// Search for export definitions
const exportRegex = /([a-zA-Z0-9_$]+):(?:\(\)=>)?([a-zA-Z0-9_$]+)/g;
let m;
while ((m = exportRegex.exec(code)) !== null) {
  if (m[1] === 's2' || m[1] === 'gM') {
    console.log('Export:', m[1], '->', m[2]);
    // find declaration of m[2]
    const declRegex = new RegExp(`(?:let|const|var)\\s+${m[2]}\\s*=\\s*([^;]+);`, 'g');
    const declMatch = declRegex.exec(code);
    if (declMatch) {
      console.log('Declaration of', m[2], ':', declMatch[1]);
    }
  }
}
