const fs = require('fs');
const html = fs.readFileSync('C:/Users/Faltusovi/.gemini/antigravity-cli/brain/93568316-2b7b-4ad2-9adc-86fcceaa9abb/.system_generated/steps/996/content.md', 'utf8');

// Check for JSON embedded scripts
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  const content = match[1].trim();
  if (content.startsWith('{') || content.startsWith('self.__next_f.push')) {
    console.log(`Script ${count} length:`, content.length, content.substring(0, 200));
    count++;
  }
}

// Check for pokemon items/links
const pRegex = /href="\/pokemon\/([^"]+)"/g;
let pm;
const pokes = new Set();
while ((pm = pRegex.exec(html)) !== null) {
  pokes.add(pm[1]);
}
console.log('Unique Pokemon slugs on page:', pokes.size, Array.from(pokes));
