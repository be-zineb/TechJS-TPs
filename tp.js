const fetch = require('node-fetch');
const inquirer = require('inquirer');

const pokemonList = ["pikachu", "bulbasaur", "charmander", "squirtle", "jigglypuff", "meowth", "psyduck", "snorlax", "eevee", "mew"];
const allMoves = [
  { name: "Thunderbolt", power: 90 },
  { name: "Flamethrower", power: 85 },
  { name: "Water Gun", power: 70 },
  { name: "Vine Whip", power: 65 },
  { name: "Tackle", power: 50 },
  { name: "Quick Attack", power: 60 },
  { name: "Ice Beam", power: 80 },
  { name: "Psychic", power: 95 },
  { name: "Hyper Beam", power: 110 },
  { name: "Body Slam", power: 85 }
];

let playerPokemon = null;
let opponentPokemon = null;

async function fetchPokemon(name) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    return res.ok ? await res.json() : null;
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
}

function displayPokemon(pokemon) {
  console.log(`\n=== ${pokemon.name.toUpperCase()} ===`);
  console.log(`HP: ${pokemon.stats[0].base_stat}`);
  console.log(`Attack: ${pokemon.stats[1].base_stat}`);
  console.log(`Defense: ${pokemon.stats[2].base_stat}\n`);
}

async function choosePokemon() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'pokemon',
      message: 'Choose your Pokémon:',
      choices: pokemonList.map(p => p.toUpperCase())
    }
  ]);
  playerPokemon = await fetchPokemon(answers.pokemon);
  displayPokemon(playerPokemon);
}

async function chooseMove() {
  const randomMoves = allMoves.sort(() => 0.5 - Math.random()).slice(0, 5);
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'move',
      message: 'Choose your move:',
      choices: randomMoves.map(m => `${m.name} (${m.power})`)
    }
  ]);
  const moveName = answers.move.split(' ')[0];
  return randomMoves.find(m => m.name === moveName);
}

async function battle() {
  await choosePokemon();
  const playerMove = await chooseMove();

  const enemyName = pokemonList[Math.floor(Math.random() * pokemonList.length)];
  opponentPokemon = await fetchPokemon(enemyName);
  console.log("\nOpponent Pokémon:");
  displayPokemon(opponentPokemon);
  
  const enemyMove = allMoves[Math.floor(Math.random() * allMoves.length)];

  const playerPower = playerPokemon.stats[1].base_stat + playerMove.power;
  const enemyPower = opponentPokemon.stats[1].base_stat + enemyMove.power;

  console.log(`You used ${playerMove.name} (${playerMove.power})`);
  console.log(`Enemy used ${enemyMove.name} (${enemyMove.power})`);

  if (playerPower > enemyPower) console.log(`🎉 ${playerPokemon.name.toUpperCase()} wins!`);
  else if (enemyPower > playerPower) console.log(`💀 ${opponentPokemon.name.toUpperCase()} wins!`);
  else console.log("⚖️ It's a draw!");
}

battle();
