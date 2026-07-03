import React from 'react';
import { Sun, CloudRain, CloudSun, Cloud, Wind, Snowflake, CloudFog } from 'lucide-react';

export const moveTypes: Record<string, string> = {
  // Fire
  "fusion flare": "fire", "overheat": "fire", "blast burn": "fire", "flamethrower": "fire", "fire fang": "fire", "fire spin": "fire", "magma storm": "fire", "ember": "fire",
  // Water
  "origin pulse": "water", "hydro cannon": "water", "hydro pump": "water", "surf": "water", "waterfall": "water", "water gun": "water", "bubble": "water",
  // Electric
  "discharge": "electric", "fusion bolt": "electric", "wild charge": "electric", "thunder shock": "electric", "spark": "electric", "charge beam": "electric", "volt switch": "electric",
  // Grass
  "leaf blade": "grass", "power whip": "grass", "frenzy plant": "grass", "grass knot": "grass", "razor leaf": "grass", "vine whip": "grass", "bullet seed": "grass",
  // Ice
  "avalanche": "ice", "glaciate": "ice", "frost breath": "ice", "ice punch": "ice", "weather ball": "ice", "powder snow": "ice", "ice shard": "ice", "ice fang": "ice",
  // Fighting
  "sacred sword": "fighting", "aura sphere": "fighting", "dynamic punch": "fighting", "counter": "fighting", "cross chop": "fighting", "double kick": "fighting", "close combat": "fighting", "low kick": "fighting", "karate chop": "fighting",
  // Rock
  "rock slide": "rock", "rock wrecker": "rock", "meteor beam": "rock", "stone edge": "rock", "ancient power": "rock", "smack down": "rock", "rock throw": "rock",
  // Ground
  "precipice blades": "ground", "earthquake": "ground", "drill run": "ground", "high horsepower": "ground", "earth power": "ground", "mud-shot": "ground", "mud-slap": "ground",
  // Flying
  "dragon ascent": "flying", "oblivion wing": "flying", "fly": "flying", "sky attack": "flying", "air slash": "flying", "gust": "flying", "wing attack": "flying",
  // Psychic
  "psystrike": "psychic", "psychic": "psychic", "confusion": "psychic", "zen headbutt": "psychic", "extrasensory": "psychic",
  // Ghost
  "shadow ball": "ghost", "shadow claw": "ghost", "hex": "ghost", "lick": "ghost", "astonish": "ghost",
  // Dragon
  "outrage": "dragon", "draco meteor": "dragon", "breaking swipe": "dragon", "spacial rend": "dragon", "roar of time": "dragon", "dragon tail": "dragon", "dragon breath": "dragon",
  // Dark
  "brutal swing": "dark", "dark pulse": "dark", "foul play": "dark", "crunch": "dark", "bite": "dark", "snarl": "dark", "sucker punch": "dark",
  // Steel
  "sunsteel strike": "steel", "meteor mash": "steel", "iron head": "steel", "double iron bash": "steel", "bullet punch": "steel", "metal claw": "steel",
  // Fairy
  "dazzling gleam": "fairy", "geomancy": "fairy", "moonblast": "fairy", "play rough": "fairy", "charm": "fairy", "fairy wind": "fairy"
};

export const defaultPokemonMoves: Record<string, { fast: { move: string; type: string }; charged: { move: string; type: string } }> = {
  // Megas
  "mega charizard y": { fast: { move: "Fire Spin", type: "fire" }, charged: { move: "Blast Burn", type: "fire" } },
  "mega charizard x": { fast: { move: "Fire Spin", type: "fire" }, charged: { move: "Blast Burn", type: "fire" } },
  "mega swampert": { fast: { move: "Water Gun", type: "water" }, charged: { move: "Hydro Cannon", type: "water" } },
  "mega sceptile": { fast: { move: "Bullet Seed", type: "grass" }, charged: { move: "Frenzy Plant", type: "grass" } },
  "mega blaziken": { fast: { move: "Fire Spin", type: "fire" }, charged: { move: "Blast Burn", type: "fire" } },
  "mega gardevoir": { fast: { move: "Charm", type: "fairy" }, charged: { move: "Dazzling Gleam", type: "fairy" } },
  "mega gengar": { fast: { move: "Shadow Claw", type: "ghost" }, charged: { move: "Shadow Ball", type: "ghost" } },
  "mega garchomp": { fast: { move: "Mud-Shot", type: "ground" }, charged: { move: "Earth Power", type: "ground" } },
  "mega tyranitar": { fast: { move: "Bite", type: "dark" }, charged: { move: "Brutal Swing", type: "dark" } },
  "mega lucario": { fast: { move: "Counter", type: "fighting" }, charged: { move: "Aura Sphere", type: "fighting" } },
  "mega rayquaza": { fast: { move: "Air Slash", type: "flying" }, charged: { move: "Dragon Ascent", type: "flying" } },
  "mega lopunny": { fast: { move: "Double Kick", type: "fighting" }, charged: { move: "Focus Blast", type: "fighting" } },
  "mega scizor": { fast: { move: "Bullet Punch", type: "steel" }, charged: { move: "Iron Head", type: "steel" } },
  "mega beedrill": { fast: { move: "Poison Jab", type: "poison" }, charged: { move: "Sludge Bomb", type: "poison" } },
  "mega banette": { fast: { move: "Shadow Claw", type: "ghost" }, charged: { move: "Shadow Ball", type: "ghost" } },
  "mega pidgeot": { fast: { move: "Gust", type: "flying" }, charged: { move: "Brave Bird", type: "flying" } },
  "mega aerodactyl": { fast: { move: "Rock Throw", type: "rock" }, charged: { move: "Rock Slide", type: "rock" } },
  "mega blastoise": { fast: { move: "Water Gun", type: "water" }, charged: { move: "Hydro Cannon", type: "water" } },
  "mega venusaur": { fast: { move: "Vine Whip", type: "grass" }, charged: { move: "Frenzy Plant", type: "grass" } },
  "mega diancie": { fast: { move: "Rock Throw", type: "rock" }, charged: { move: "Rock Slide", type: "rock" } },
  "mega alakazam": { fast: { move: "Confusion", type: "psychic" }, charged: { move: "Psychic", type: "psychic" } },
  "mega ampharos": { fast: { move: "Volt Switch", type: "electric" }, charged: { move: "Zap Cannon", type: "electric" } },
  "primal kyogre": { fast: { move: "Waterfall", type: "water" }, charged: { move: "Origin Pulse", type: "water" } },
  "primal groudon": { fast: { move: "Mud-Shot", type: "ground" }, charged: { move: "Precipice Blades", type: "ground" } },

  // Standard / Shadow / Apex (Lookup removes "shadow", "apex" prefix)
  "mewtwo": { fast: { move: "Confusion", type: "psychic" }, charged: { move: "Psystrike", type: "psychic" } },
  "articuno": { fast: { move: "Frost Breath", type: "ice" }, charged: { move: "Ice Beam", type: "ice" } },
  "zapdos": { fast: { move: "Thunder Shock", type: "electric" }, charged: { move: "Thunderbolt", type: "electric" } },
  "moltres": { fast: { move: "Fire Spin", type: "fire" }, charged: { move: "Sky Attack", type: "flying" } },
  "lugia": { fast: { move: "Extrasensory", type: "psychic" }, charged: { move: "Aeroblast", type: "flying" } },
  "ho-oh": { fast: { move: "Incinerate", type: "fire" }, charged: { move: "Sacred Fire", type: "fire" } },
  "kyogre": { fast: { move: "Waterfall", type: "water" }, charged: { move: "Origin Pulse", type: "water" } },
  "groudon": { fast: { move: "Mud-Shot", type: "ground" }, charged: { move: "Precipice Blades", type: "ground" } },
  "rayquaza": { fast: { move: "Dragon Tail", type: "dragon" }, charged: { move: "Dragon Ascent", type: "flying" } },
  "dialga": { fast: { move: "Metal Claw", type: "steel" }, charged: { move: "Roar of Time", type: "steel" } },
  "palkia": { fast: { move: "Dragon Breath", type: "dragon" }, charged: { move: "Spacial Rend", type: "dragon" } },
  "giratina": { fast: { move: "Shadow Claw", type: "ghost" }, charged: { move: "Shadow Ball", type: "ghost" } },
  "reshiram": { fast: { move: "Fire Spin", type: "fire" }, charged: { move: "Fusion Flare", type: "fire" } },
  "zekrom": { fast: { move: "Charge Beam", type: "electric" }, charged: { move: "Fusion Bolt", type: "electric" } },
  "kyurem": { fast: { move: "Dragon Breath", type: "dragon" }, charged: { move: "Glaciate", type: "ice" } },
  "xerneas": { fast: { move: "Geomancy", type: "fairy" }, charged: { move: "Moonblast", type: "fairy" } },
  "yveltal": { fast: { move: "Snarl", type: "dark" }, charged: { move: "Oblivion Wing", type: "flying" } },
  "celesteela": { fast: { move: "Air Slash", type: "flying" }, charged: { move: "Heavy Slam", type: "steel" } },
  "kartana": { fast: { move: "Razor Leaf", type: "grass" }, charged: { move: "Leaf Blade", type: "grass" } },
  "xurkitree": { fast: { move: "Thunder Shock", type: "electric" }, charged: { move: "Discharge", type: "electric" } },
  "nihilego": { fast: { move: "Acid", type: "poison" }, charged: { move: "Sludge Bomb", type: "poison" } },
  "guzzlord": { fast: { move: "Snarl", type: "dark" }, charged: { move: "Brutal Swing", type: "dark" } },
  "mamoswine": { fast: { move: "Powder Snow", type: "ice" }, charged: { move: "Avalanche", type: "ice" } },
  "tyranitar": { fast: { move: "Bite", type: "dark" }, charged: { move: "Brutal Swing", type: "dark" } },
  "garchomp": { fast: { move: "Mud-Shot", type: "ground" }, charged: { move: "Earth Power", type: "ground" } },
  "salamence": { fast: { move: "Dragon Tail", type: "dragon" }, charged: { move: "Outrage", type: "dragon" } },
  "gengar": { fast: { move: "Shadow Claw", type: "ghost" }, charged: { move: "Shadow Ball", type: "ghost" } },
  "lucario": { fast: { move: "Counter", type: "fighting" }, charged: { move: "Aura Sphere", type: "fighting" } },
  "gardevoir": { fast: { move: "Charm", type: "fairy" }, charged: { move: "Dazzling Gleam", type: "fairy" } },
  "gallade": { fast: { move: "Confusion", type: "psychic" }, charged: { move: "Close Combat", type: "fighting" } },
  "baxcalibur": { fast: { move: "Dragon Breath", type: "dragon" }, charged: { move: "Avalanche", type: "ice" } },
  "chandelure": { fast: { move: "Fire Spin", type: "fire" }, charged: { move: "Shadow Ball", type: "ghost" } },
  "houndoom": { fast: { move: "Snarl", type: "dark" }, charged: { move: "Foul Play", type: "dark" } },
  "weavile": { fast: { move: "Snarl", type: "dark" }, charged: { move: "Foul Play", type: "dark" } },
  "excadrill": { fast: { move: "Mud-Shot", type: "ground" }, charged: { move: "Drill Run", type: "ground" } },
  "rhyperior": { fast: { move: "Smack Down", type: "rock" }, charged: { move: "Rock Wrecker", type: "rock" } },
  "electivire": { fast: { move: "Thunder Shock", type: "electric" }, charged: { move: "Wild Charge", type: "electric" } },
  "magnezone": { fast: { move: "Spark", type: "electric" }, charged: { move: "Wild Charge", type: "electric" } },
  "dragonite": { fast: { move: "Dragon Tail", type: "dragon" }, charged: { move: "Outrage", type: "dragon" } },
  "conkeldurr": { fast: { move: "Counter", type: "fighting" }, charged: { move: "Dynamic Punch", type: "fighting" } },
  "roserade": { fast: { move: "Razor Leaf", type: "grass" }, charged: { move: "Grass Knot", type: "grass" } },
  "sceptile": { fast: { move: "Bullet Seed", type: "grass" }, charged: { move: "Frenzy Plant", type: "grass" } },
  "venusaur": { fast: { move: "Vine Whip", type: "grass" }, charged: { move: "Frenzy Plant", type: "grass" } },
  "charizard": { fast: { move: "Fire Spin", type: "fire" }, charged: { move: "Blast Burn", type: "fire" } },
  "blaziken": { fast: { move: "Counter", type: "fighting" }, charged: { move: "Blast Burn", type: "fire" } },
  "flareon": { fast: { move: "Fire Spin", type: "fire" }, charged: { move: "Overheat", type: "fire" } },
  "darmanitan": { fast: { move: "Fire Spin", type: "fire" }, charged: { move: "Overheat", type: "fire" } },
  "rampardos": { fast: { move: "Smack Down", type: "rock" }, charged: { move: "Rock Slide", type: "rock" } },
  "terrakion": { fast: { move: "Double Kick", type: "fighting" }, charged: { move: "Sacred Sword", type: "fighting" } },
  "keldeo": { fast: { move: "Low Kick", type: "fighting" }, charged: { move: "Sacred Sword", type: "fighting" } },
  "hydreigon": { fast: { move: "Bite", type: "dark" }, charged: { move: "Brutal Swing", type: "dark" } },
  "darkrai": { fast: { move: "Snarl", type: "dark" }, charged: { move: "Dark Pulse", type: "dark" } },
  "metagross": { fast: { move: "Bullet Punch", type: "steel" }, charged: { move: "Meteor Mash", type: "steel" } },
  "suicune": { fast: { move: "Snarl", type: "dark" }, charged: { move: "Hydro Pump", type: "water" } },
  "entei": { fast: { move: "Fire Spin", type: "fire" }, charged: { move: "Overheat", type: "fire" } },
  "raikou": { fast: { move: "Thunder Shock", type: "electric" }, charged: { move: "Wild Charge", type: "electric" } },
  "tangrowth": { fast: { move: "Vine Whip", type: "grass" }, charged: { move: "Power Whip", type: "grass" } },
  "granbull": { fast: { move: "Charm", type: "fairy" }, charged: { move: "Play Rough", type: "fairy" } },
  "victreebel": { fast: { move: "Razor Leaf", type: "grass" }, charged: { move: "Leaf Blade", type: "grass" } },
  "skuntank": { fast: { move: "Poison Jab", type: "poison" }, charged: { move: "Sludge Bomb", type: "poison" } },
  "overqwil": { fast: { move: "Poison Jab", type: "poison" }, charged: { move: "Gunk Shot", type: "poison" } },
  "pinsir": { fast: { move: "Bug Bite", type: "bug" }, charged: { move: "X-Scissor", type: "bug" } },
  "samurott": { fast: { move: "Waterfall", type: "water" }, charged: { move: "Hydro Cannon", type: "water" } },
  "greninja": { fast: { move: "Water Shuriken", type: "water" }, charged: { move: "Hydro Cannon", type: "water" } },
  "jolteon": { fast: { move: "Thunder Shock", type: "electric" }, charged: { move: "Discharge", type: "electric" } },
  "luxray": { fast: { move: "Spark", type: "electric" }, charged: { move: "Wild Charge", type: "electric" } },
  "zarude": { fast: { move: "Vine Whip", type: "grass" }, charged: { move: "Power Whip", type: "grass" } },
  "shaymin": { fast: { move: "Hidden Power", type: "grass" }, charged: { move: "Grass Knot", type: "grass" } },
  "beartic": { fast: { move: "Powder Snow", type: "ice" }, charged: { move: "Ice Punch", type: "ice" } },
  "aurorus": { fast: { move: "Powder Snow", type: "ice" }, charged: { move: "Weather Ball", type: "ice" } },
  "sirfetch'd": { fast: { move: "Counter", type: "fighting" }, charged: { move: "Close Combat", type: "fighting" } },
  "toxicroak": { fast: { move: "Counter", type: "fighting" }, charged: { move: "Sludge Bomb", type: "poison" } },
  "volcarona": { fast: { move: "Bug Bite", type: "bug" }, charged: { move: "Bug Buzz", type: "bug" } },
  "pheromosa": { fast: { move: "Bug Bite", type: "bug" }, charged: { move: "Bug Buzz", type: "bug" } },
  "vikavolt": { fast: { move: "Spark", type: "electric" }, charged: { move: "X-Scissor", type: "bug" } },
  "yanmega": { fast: { move: "Bug Bite", type: "bug" }, charged: { move: "Bug Buzz", type: "bug" } },
  "accelgor": { fast: { move: "Infestation", type: "bug" }, charged: { move: "Bug Buzz", type: "bug" } },
  "gigalith": { fast: { move: "Smack Down", type: "rock" }, charged: { move: "Meteor Beam", type: "rock" } },
  "aerodactyl": { fast: { move: "Rock Throw", type: "rock" }, charged: { move: "Rock Slide", type: "rock" } },
  "archeops": { fast: { move: "Wing Attack", type: "flying" }, charged: { move: "Ancient Power", type: "rock" } },
  "gholdengo": { fast: { move: "Hex", type: "ghost" }, charged: { move: "Shadow Ball", type: "ghost" } },
  "banette": { fast: { move: "Shadow Claw", type: "ghost" }, charged: { move: "Shadow Ball", type: "ghost" } },
  "drifblim": { fast: { move: "Hex", type: "ghost" }, charged: { move: "Shadow Ball", type: "ghost" } },
  "haxorus": { fast: { move: "Dragon Tail", type: "dragon" }, charged: { move: "Breaking Swipe", type: "dragon" } },
  "sylveon": { fast: { move: "Charm", type: "fairy" }, charged: { move: "Dazzling Gleam", type: "fairy" } },
  "togekiss": { fast: { move: "Charm", type: "fairy" }, charged: { move: "Dazzling Gleam", type: "fairy" } },
  "primarina": { fast: { move: "Waterfall", type: "water" }, charged: { move: "Hydro Cannon", type: "water" } },
  "clefable": { fast: { move: "Charm", type: "fairy" }, charged: { move: "Play Rough", type: "fairy" } },
  "florges": { fast: { move: "Fairy Wind", type: "fairy" }, charged: { move: "Moonblast", type: "fairy" } },
  "regigigas": { fast: { move: "Hidden Power", type: "normal" }, charged: { move: "Giga Impact", type: "normal" } },
  "ursaluna": { fast: { move: "Tackle", type: "normal" }, charged: { move: "High Horsepower", type: "ground" } },
  "ursaring": { fast: { move: "Counter", type: "fighting" }, charged: { move: "Hyper Beam", type: "normal" } },
  "snorlax": { fast: { move: "Lick", type: "ghost" }, charged: { move: "Body Slam", type: "normal" } },
  "heatran": { fast: { move: "Fire Spin", type: "fire" }, charged: { move: "Magma Storm", type: "fire" } },
  "diancie": { fast: { move: "Rock Throw", type: "rock" }, charged: { move: "Rock Slide", type: "rock" } },
  "alakazam": { fast: { move: "Confusion", type: "psychic" }, charged: { move: "Psychic", type: "psychic" } },
  "ampharos": { fast: { move: "Volt Switch", type: "electric" }, charged: { move: "Zap Cannon", type: "electric" } }
};

export function getPokemonIconUrl(name: string): string {
  let clean = name.toLowerCase()
    .replace('shadow ', '')
    .replace('apex ', '')
    .replace(' primal', '')
    .replace(' (origin)', '-origin')
    .replace(' origin', '-origin')
    .replace(' (altered)', '-altered')
    .replace(' altered', '-altered')
    .replace(' (dusk mane)', '-dusk-mane')
    .replace(' (dawn wings)', '-dawn-wings')
    .replace(' (regular)', '')
    .trim();
  
  if (clean.startsWith('mega ')) {
    const base = clean.replace('mega ', '');
    clean = `${base}-mega`;
  }
  
  clean = clean.replace(/\s*\(.*?\)\s*/g, '').trim();
  clean = clean.replace(/\s+/g, '-');
  clean = clean.replace(/[^a-z0-9-]/g, '');

  return `https://img.pokemondb.net/sprites/home/normal/${clean}.png`;
}

export const WeatherIcon: React.FC<{ weatherStr: string }> = ({ weatherStr }) => {
  const ws = weatherStr.toLowerCase();
  let Icon = Sun;
  let color = '#f59e0b';
  
  if (ws.includes('rain') || ws.includes('dešt') || ws.includes('dest')) {
    Icon = CloudRain;
    color = '#3b82f6';
  } else if (ws.includes('partly') || ws.includes('částeč') || ws.includes('castec')) {
    Icon = CloudSun;
    color = '#60a5fa';
  } else if (ws.includes('cloudy') || ws.includes('zataž') || ws.includes('zataz')) {
    Icon = Cloud;
    color = '#94a3b8';
  } else if (ws.includes('windy') || ws.includes('větrn') || ws.includes('vetrn')) {
    Icon = Wind;
    color = '#a78bfa';
  } else if (ws.includes('snow') || ws.includes('sněž') || ws.includes('snez')) {
    Icon = Snowflake;
    color = '#38bdf8';
  } else if (ws.includes('fog') || ws.includes('mlh')) {
    Icon = CloudFog;
    color = '#cbd5e1';
  } else if (ws.includes('clear') || ws.includes('sunny') || ws.includes('sluneč') || ws.includes('jasn')) {
    Icon = Sun;
    color = '#eab308';
  }

  // Extract English version inside parentheses
  let displayStr = weatherStr;
  const matches = Array.from(weatherStr.matchAll(/\((.*?)\)/g));
  if (matches.length > 0) {
    displayStr = matches.map(m => m[1]).join(" / ");
  }

  return (
    <span className="weather-boost-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color }}>
      <Icon size={14} className="duotone-icon" style={{ strokeWidth: 2, display: 'inline-block', verticalAlign: 'middle' }} />
      <span style={{ fontSize: '0.85rem', fontWeight: 550, color: 'var(--text-muted)' }}>{displayStr}</span>
    </span>
  );
};

export const MoveTypeIcon: React.FC<{ typeStr: string }> = ({ typeStr }) => {
  const typeClass = typeStr.toLowerCase().trim();
  const iconUrl = `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeClass}.svg`;
  
  const typeColors: Record<string, string> = {
    fire: '#ef4444', water: '#3b82f6', grass: '#22c55e', electric: '#eab308',
    ice: '#06b6d4', fighting: '#f97316', poison: '#a855f7', ground: '#ca8a04',
    flying: '#a78bfa', psychic: '#ec4899', bug: '#84cc16', rock: '#a16207',
    ghost: '#6366f1', dragon: '#4f46e5', dark: '#4b5563', steel: '#6b7280',
    fairy: '#f472b6', normal: '#9ca3af'
  };

  const color = typeColors[typeClass] || '#9ca3af';

  return (
    <img
      src={iconUrl}
      alt={typeStr}
      style={{
        width: '10px',
        height: '10px',
        objectFit: 'contain',
        filter: `drop-shadow(0 0 1px ${color})`,
        display: 'inline-block',
        verticalAlign: 'middle'
      }}
    />
  );
};

export const CounterItem: React.FC<{ counterStr: string }> = ({ counterStr }) => {
  const [hasError, setHasError] = React.useState(false);

  if (hasError) return null;

  const match = counterStr.match(/^(.*?)\s*\((.*?)\)$/);
  let pokemonName = counterStr;
  let moveName = "";
  
  if (match) {
    pokemonName = match[1].trim();
    moveName = match[2].trim();
  }

  const iconUrl = getPokemonIconUrl(pokemonName);

  // Resolve fast and charged moves
  let resolvedFast = { move: "", type: "" };
  let resolvedCharged = { move: "", type: "" };

  const lookupKey = pokemonName.toLowerCase().replace('shadow ', '').replace('apex ', '').trim();
  const baseData = defaultPokemonMoves[lookupKey];

  if (baseData) {
    resolvedFast = { ...baseData.fast };
    resolvedCharged = { ...baseData.charged };
  }

  if (moveName) {
    const moveType = moveTypes[moveName.toLowerCase()] || "normal";
    resolvedCharged = { move: moveName, type: moveType };
    
    // Auto-adjust fast move to match the charged move's type if possible
    if (baseData) {
      if (baseData.fast.type === moveType) {
        resolvedFast = { ...baseData.fast };
      } else if (lookupKey === 'mamoswine' && moveType === 'ground') {
        resolvedFast = { move: "Mud-Slap", type: "ground" };
      } else if (lookupKey === 'tyranitar' && moveType === 'rock') {
        resolvedFast = { move: "Smack Down", type: "rock" };
      } else if (lookupKey === 'garchomp' && moveType === 'dragon') {
        resolvedFast = { move: "Dragon Tail", type: "dragon" };
      } else if (lookupKey === 'salamence' && moveType === 'flying') {
        resolvedFast = { move: "Air Slash", type: "flying" };
      } else if (lookupKey === 'chandelure' && moveType === 'fire') {
        resolvedFast = { move: "Fire Spin", type: "fire" };
      }
    }
  }

  return (
    <li className="counter-item-card">
      <img 
        src={iconUrl} 
        alt={pokemonName} 
        onError={() => setHasError(true)}
      />
      <div className="counter-pokemon-info">
        <span className="counter-pokemon-name">{pokemonName}</span>
        <div className="counter-moves-container">
          {resolvedFast.move && (
            <span className="counter-move-row">
              <MoveTypeIcon typeStr={resolvedFast.type} />
              <span>{resolvedFast.move}</span>
            </span>
          )}
          {resolvedCharged.move && (
            <span className="counter-move-row">
              <MoveTypeIcon typeStr={resolvedCharged.type} />
              <strong style={{ fontWeight: 600 }}>{resolvedCharged.move}</strong>
            </span>
          )}
        </div>
      </div>
    </li>
  );
};
