const fs = require('fs');
const content = fs.readFileSync('C:/Users/Faltusovi/.gemini/antigravity-cli/brain/93568316-2b7b-4ad2-9adc-86fcceaa9abb/.system_generated/steps/1008/content.md', 'utf8');

const scriptRegex = /src="([^"]+\.js)"/g;
let m;
const scripts = [];
while ((m = scriptRegex.exec(content)) !== null) {
  scripts.push(m[1]);
}
console.log('Scripts in best/attackers-per-type:', scripts);
