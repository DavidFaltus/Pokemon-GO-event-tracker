const fs = require('fs');
const code = fs.readFileSync('C:/Users/Faltusovi/.gemini/antigravity-cli/brain/93568316-2b7b-4ad2-9adc-86fcceaa9abb/.system_generated/steps/1040/content.md', 'utf8');

console.log('Code length:', code.length);
const urlMatches = code.match(/https?:\/\/[^"'\s`]+|\/api\/[^"'\s`]+|\/data\/[^"'\s`]+/gi);
console.log('URLs/APIs in attackers page chunk:', Array.from(new Set(urlMatches || [])));

// Search for any fetch / query parameters
const fetchMatches = code.match(/fetch\([^)]+\)/g);
console.log('Fetch calls:', fetchMatches);
