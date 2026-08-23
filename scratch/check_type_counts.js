const fs = require('fs');
const content = fs.readFileSync('frontend/src/data/pokemonRankings.ts', 'utf8');
const startIndex = content.indexOf('export const pokemonRankings: PokemonRankData[] =');
const equalSign = content.indexOf('=', startIndex);
const arrayStart = content.indexOf('[', equalSign);
const nextFn = content.indexOf('export function getPokemonByIdOrSlug');
const arrayEnd = content.lastIndexOf(']', nextFn);
const list = JSON.parse(content.substring(arrayStart, arrayEnd + 1));

const types = [
  'Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel',
  'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy'
];

console.log('Total in rankings:', list.length);
types.forEach(t => {
  const matching = list.filter(p => p.types.includes(t) || p.bestChargedMove?.type === t);
  console.log(`Type ${t.padEnd(10)}: ${matching.length} pokemon. Top 3: ${matching.slice(0, 3).map(p => p.name).join(', ')}`);
});
