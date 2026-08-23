const fs = require('fs');
const content = fs.readFileSync('C:/Users/Faltusovi/.gemini/antigravity-cli/brain/93568316-2b7b-4ad2-9adc-86fcceaa9abb/.system_generated/steps/1008/content.md', 'utf8');

// Match table rows or Pokemon names in each table
const tableRegex = /<table[\s\S]*?<\/table>/gi;
let tMatch;
let typeIndex = 0;
const types = [
  "Normal", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel",
  "Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy"
];

const allScraped = [];

while ((tMatch = tableRegex.exec(content)) !== null) {
  const typeName = types[typeIndex] || `Type_${typeIndex}`;
  const tableHtml = tMatch[0];
  
  // Extract rows
  const rowRegex = /<tr[\s\S]*?<\/tr>/gi;
  let rMatch;
  const rows = [];
  while ((rMatch = rowRegex.exec(tableHtml)) !== null) {
    const rowHtml = rMatch[0];
    // Strip tags to get cell values
    const cells = [];
    const cellRegex = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
    let cMatch;
    while ((cMatch = cellRegex.exec(rowHtml)) !== null) {
      const clean = cMatch[1].replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
      cells.push(clean);
    }
    if (cells.length > 0) {
      rows.push(cells);
    }
  }
  
  console.log(`\n=== Type: ${typeName} (Rows: ${rows.length}) ===`);
  rows.slice(0, 15).forEach((r, idx) => {
    console.log(`  #${idx}:`, r.join(' | '));
  });
  
  allScraped.push({ type: typeName, rows });
  typeIndex++;
}

fs.writeFileSync('C:/PROJEKTY/OSOBNÍ/Pokemon-GO-event-tracker/scratch/pogohub_best_per_type.json', JSON.stringify(allScraped, null, 2), 'utf8');
console.log('\nSaved all tables to scratch/pogohub_best_per_type.json');
