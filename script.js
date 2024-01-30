//model
var pokemons = [];
var colorObj = {
    dragon: '#DCAA2B',
    flying: '#475569',
    fire: '#FD842F',
    // fire: 'linear-gradient(45deg, #FD842F, transparent)',
    grass: '#A0CF59',
    ground: '#F7E049',
    rock: '#A8922C',
    water: '#4E98C7',
    ice: '#5AC7E8',
    bug: '#79A449',
    fighting: '#D76F2E',
    poison: '#BD86CC',
    ghost: '#7E789B',
    steel: '#A7A29F',
    electric: '#EFD73F',
    psychic: '#F46EBD',
    dark: '#111827',
    shadow: 'darkorchid',
    fairy: '#FDBDEA',
    normal: '#99692E',
    unknown: '#475569'
};

var geekmonContainer = document.querySelector('#geekmon-container');
var input = document.querySelector('#keyword-query>input');


window.onload = () => {
  const select = document.querySelector("#select");

  fetch("https://pokeapi.co/api/v2/type/")

    .then((response) => response.json())

    .then((parsedResponse) => {
      const pokeTypesArr = parsedResponse.results;

      // fill the select with options
      for (let i = 0; i < pokeTypesArr.length; i++) {
        const pokemonTypeObj = pokeTypesArr[i];
        const pokemontype = pokemonTypeObj.name;

        const option = document.createElement("option");
        option.setAttribute("value", pokemontype);
        option.innerText = pokemontype;
        select.append(option);
      }

      getPokemonsObjsArr();
    });
};


function getPokemonsObjsArr() {

    fetch ('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1300')
    .then((response) => response.json())
    .then((parsedResponse) => {
        const pokemonsObjsArr = parsedResponse.results;
        fetchPokemonsData(pokemonsObjsArr);
    })

};


function fetchPokemonsData (pokemonsObjsArr) {

    pokemonsObjsArr.forEach((pokemonObj) => {
        const url = pokemonObj.url;

        fetch(url)
        .then(res => res.json())

        .then((parsedRes) => {
            pokemons.push({
                id: parsedRes.id,
                image: parsedRes.sprites.front_default,
                name: parsedRes.name,
                type: parsedRes.types[0].type.name,
                abilities: parsedRes.abilities.map((ability) => {
                    return ability.ability.name;
                })
            })

            if (pokemons.length == 1299) {
                func(pokemons);
            }

        })
    })

};


// add pokemons to view by first sorting the pokemons array (id)
function func (pokemons) {

    pokemons.sort((p1,p2) => p1.id - p2.id);

    for (let i = 0; i < pokemons.length; i++) {
        // append geekmon to view
        const geekmon = document.createElement('div');
        geekmon.classList.add('geekmon');

        geekmon.style.background = `linear-gradient(135deg, ${colorObj[pokemons[i].type]} 60%, transparent)`;

        const geekmonFront = document.createElement('div');
        geekmonFront.classList.add('geekmon-front');

        const geekmonBack = document.createElement('div');
        geekmonBack.classList.add('geekmon-back');

        const id = document.createElement('p');
        id.classList.add('number');
        id.innerText = '#' + pokemons[i].id;

        const image = document.createElement('img');
        image.setAttribute('src',pokemons[i].image);

        const h2 = document.createElement('h2');
        h2.classList.add('name');
        h2.innerText = pokemons[i].name;

        const type = document.createElement('span');
        type.classList.add('type');
        type.innerText = pokemons[i].type; 

        const h1 = document.createElement('h1');
        h1.innerText = 'Abilities';

        const abilities = document.createElement('p');
        abilities.innerText = pokemons[i].abilities.reduce((acc,currVal) => {
            return acc + " (" + currVal + ")";
        },'');

        geekmonBack.append(h1,abilities);

        geekmonFront.append(id,image,h2,type);

        geekmon.append(geekmonFront,geekmonBack);

        geekmonContainer.append(geekmon);
    }
    
};


// function for pokemon search by name typed keywords
function handleQuery (e) {

    geekmonContainer.innerHTML = '';

    const query = e.target.value.toLowerCase();

    for (let i=0; i<pokemons.length; i++) {

        const pokeName = pokemons[i].name;
        if (pokeName.startsWith(query)) {
            
            // append geekmon to view
        const geekmon = document.createElement('div');
        geekmon.classList.add('geekmon');
        geekmon.style.background = `linear-gradient(135deg, ${colorObj[pokemons[i].type]} 60%, transparent)`;
        // geekmon.style.backgroundColor = colorObj[pokemons[i].type];

        const geekmonFront = document.createElement('div');
        geekmonFront.classList.add('geekmon-front');

        const geekmonBack = document.createElement('div');
        geekmonBack.classList.add('geekmon-back');

        const id = document.createElement('p');
        id.classList.add('number');
        id.innerText = '#' + pokemons[i].id;

        const image = document.createElement('img');
        image.setAttribute('src',pokemons[i].image);

        const h2 = document.createElement('h2');
        h2.classList.add('name');
        h2.innerText = pokemons[i].name;

        const type = document.createElement('span');
        type.classList.add('type');
        type.innerText = pokemons[i].type; 

        const h1 = document.createElement('h1');
        h1.innerText = 'Abilities';

        const abilities = document.createElement('p');
        abilities.innerText = pokemons[i].abilities.reduce((acc,currVal) => {
            return acc + " (" + currVal + ")";
        },'');

        geekmonBack.append(h1,abilities);

        geekmonFront.append(id,image,h2,type);

        geekmon.append(geekmonFront,geekmonBack);

        geekmonContainer.append(geekmon);
            
        }

    }
};


// function for filtering the pokemons by types
function handleFilter (e) {

    e.preventDefault();

    const type = document.querySelector('#select').value;

    if (type == 'types') return;

    geekmonContainer.innerHTML = '';

    for (let i = 0; i < pokemons.length; i++) {
        
        if (pokemons[i].type == type) {
            // append geekmon to view
            const geekmon = document.createElement('div');
            geekmon.classList.add('geekmon');
            geekmon.style.background = `linear-gradient(135deg, ${colorObj[pokemons[i].type]} 60%, transparent)`;
            // geekmon.style.backgroundColor = colorObj[pokemons[i].type];

            const geekmonFront = document.createElement('div');
            geekmonFront.classList.add('geekmon-front');

            const geekmonBack = document.createElement('div');
            geekmonBack.classList.add('geekmon-back');

            const id = document.createElement('p');
            id.classList.add('number');
            id.innerText = '#' + pokemons[i].id;

            const image = document.createElement('img');
            image.setAttribute('src',pokemons[i].image);

            const h2 = document.createElement('h2');
            h2.classList.add('name');
            h2.innerText = pokemons[i].name;

            const type = document.createElement('span');
            type.classList.add('type');
            type.innerText = pokemons[i].type; 

            const h1 = document.createElement('h1');
            h1.innerText = 'Abilities';

            const abilities = document.createElement('p');
            abilities.innerText = pokemons[i].abilities.reduce((acc,currVal) => {
                return acc + " (" + currVal + ")";
            },'');

            geekmonBack.append(h1,abilities);

            geekmonFront.append(id,image,h2,type);

            geekmon.append(geekmonFront,geekmonBack);

            geekmonContainer.append(geekmon);
        }
        
    }

};




