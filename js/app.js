const listsPokemons = document.getElementById('lists__pokemons');
const buttons = document.getElementById('buttons');
let urlPokemon = 'https://pokeapi.co/api/v2/pokemon';

async function fetchPokemons(url) {
    try {
        const response = await fetch(url);
        const results = await response.json();
        renderPokemons(results.results);

        const nextButton = results.next ? `<button class="btn" data-url=${results.next}>⏩</button>` : '';
        const previousButton = results.previous ? `<button class="btn" data-url=${results.previous}>⏮</button>` : '';
        buttons.innerHTML = previousButton + " " + nextButton;
    } catch (error) {
        console.log(error);
    }
}

async function renderPokemons(data) {
    listsPokemons.innerHTML = '';
    try {
        for (let index of data) {
            const resp = await fetch(index.url);
            const result = await resp.json();
            const templateHtml = `
                <div class="pokemon__img" data-name="${result.name}" data-img="${result.sprites.other.dream_world.front_default}" data-encounters="${result.location_area_encounters}">
                    <img src="${result.sprites.other.dream_world.front_default}" alt="${result.name}" />
                    <p>${result.name}</p>
                </div>
            `;
            listsPokemons.innerHTML += templateHtml;
        }
    } catch (error) {
        console.log(error);
    }
}

function handlePokemonClick(e) {
    const pokemonElement = e.target.closest('.pokemon__img');
    if (pokemonElement) {
        const name = pokemonElement.getAttribute('data-name');
        const img = pokemonElement.getAttribute('data-img');
        const encounters = pokemonElement.getAttribute('data-encounters');
        window.location.href = `profile_pokemon.html?name=${name}&img=${img}&encounters=${encounters}`;
    }
}

function handleButtonClick(e) {
    if (e.target.classList.contains('btn')) {
        let value = e.target.dataset.url;
        console.log(value);
        fetchPokemons(value);
    }
}


listsPokemons.addEventListener('click', handlePokemonClick);
buttons.addEventListener('click', handleButtonClick);


fetchPokemons(urlPokemon);

