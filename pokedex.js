async function traerPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=150';

    try {
        const respuesta = await fetch(url);

        if (respuesta.ok) {
            const data = await respuesta.json();
            //console.log(data.results);
            return data.results;
        } else {
            console.error(`'Error al obtener datos. Código de estado: ${respuesta.status} `);
            return null;
        }
    } catch (error) {
        console.error('Error en la solicitud', error);
        return null;
    }
}

async function obtenerDetallesPokemon(url) {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`Error al obtener detalles del Pokémon. Código de estado: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error('Error al obtener detalles del Pokémon:', error);
        throw error;
    }
}

async function displayPokemon(pokemon) {
    const pokedexList = document.querySelector('#pokedex');

    const card = document.createElement('div');
    card.classList.add('card');
    pokedexList.appendChild(card);

    const image = document.createElement('img');
    image.classList.add('card-image');
    image.src = pokemon.sprites.front_default;
    image.alt = pokemon.name;
    card.appendChild(image);

    const title = document.createElement('h2');
    title.classList.add('card-title');
    title.textContent = pokemon.name;
    card.appendChild(title);

    const type = document.createElement('p');
    type.classList.add('card-subtitle');
    type.textContent = `Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}`;
    card.appendChild(type);

    const id = document.createElement('p');
    id.classList.add('card-subtitle');
    id.textContent = `ID: ${pokemon.id}`;
    card.appendChild(id);
}

async function cargarPokedex() {
    const pokemones = await traerPokemon();
    if (!pokemones) return;

    for (const pokemon of pokemones) {
        try {
            const detalles = await obtenerDetallesPokemon(pokemon.url);
            displayPokemon({
                name: pokemon.name,
                sprites: detalles.sprites,
                types: detalles.types,
                id: detalles.id
            });
        } catch (error) {
            console.error(error);
        }
    }
}

// Llama a la función cargarPokedex al cargar la página
cargarPokedex();