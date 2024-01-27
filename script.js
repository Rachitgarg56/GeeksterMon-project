//model
var pokemons = [];


window.onload = () => {

    const select = document.querySelector('#select');

    fetch('https://pokeapi.co/api/v2/type/')

    .then((response) => response.json())
    
    .then((parsedResponse) => {

        const pokeTypesArr = parsedResponse.results;
        
        // fill the select with options 
        for (let i = 0; i < pokeTypesArr.length; i++) {
          const pokemonTypeObj = pokeTypesArr[i];
          const pokemontype = pokemonTypeObj.name;

          const option = document.createElement('option');
          option.setAttribute('value', pokemontype);
          option.innerText = pokemontype;
          select.append(option);
        }

        return pokeTypesArr;
    })



    .then((pokeTypesArr) => {

        // traverse on types
        pokeTypesArr.forEach(pokeTypeObj => {

            var pokeType = pokeTypeObj.name;

            // fetch url of each type
            fetch(pokeTypeObj.url)

            .then((response) => response.json())

            .then((parsedResponse) => {
                const pokemonsArr = parsedResponse.pokemon;

                // traverse on 10 pokemons 
                for (var i=0; i<10; i++) {
                    const url = pokemonsArr[i].pokemon.url;

                    // fetch for 10 pokemons of each type
                    fetch(url)
                    .then((res) => res.json())

                    //adding each pokemon data to model
                    .then((parsedRes) => {
                        pokemons.push({
                            id: parsedRes.id,
                            image: parsedRes.sprites.front_default,
                            name: parsedRes.name,
                            type: pokeType,
                            abilities: parsedRes.abilities,
                            // color: 
                        })
                        // return ((pokemons))
                    })
                    // .then((pokemons) => console.log(pokemons))

                }

                console.log(pokemons);
            })

        });

        // return pokemons;
    })

    .then((pokemons) => {
        console.log(pokemons);
    })

};
