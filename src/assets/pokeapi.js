const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151';
const content = null || document.getElementById('content');

const options = {};

async function fetchData(urlApi)
{
    const response = await fetch(urlApi,options);
    const data = await response.json();

    return data;
}

async function fecthPokemon(urlPokemon)
{
    const response = await fetch(urlPokemon,options);
    const data = await response.json();

    return data;
}

(async ()=>{
    try{
        const pokemons = await fetchData(url);

        let view = `
        ${await Promise.all(
            pokemons.results.map(async pokemon =>{
                const stats = await fecthPokemon(pokemon.url);
                return `
              <div class="group relative">
                            <div
                                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 
                                    rounded-md overflow-hidden group-hover:opacity-75 
                                    lg:aspect-none">
                                <img src="${stats.sprites.other['official-artwork'].front_default}" alt="${stats.name}"
                                 class="w-full">
                            </div>
                            <div class="mt-4 flex justify-between">
                                <h3 class="text-sm text-gray-700">
                                    <span aria-hidden="true" class="absolute inset-0"></span>
                                   ${stats.name}
                                </h3>
                            </div>
              </div>
             `
            })//.slice(0,4).join('')
        )}
`;

        console.log(view);
        content.innerHTML = view;

    }catch (error) {
        //alert("Ha ocurrido un error");
        console.error(error);
    }
})();
