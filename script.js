//model
var pokemons = [];

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

}

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
                // type: pokeType,
                abilities: parsedRes.abilities,
                // color:
            })
        })
    })

}






// updated code..................................


// // for fetching types of pokemons
// function fetchPokeType(pokeTypesArr) {
//   pokeTypesArr.forEach((pokeTypeObj) => {
//     var pokeType = pokeTypeObj.name;

//     // fetch url of each type
//     fetch(pokeTypeObj.url)
//       .then((response) => response.json())

//       .then((parsedResponse) => {
//         const pokemonsArr = parsedResponse.pokemon;
//         fetchPokemons(pokemonsArr, pokeType);
//       });
//   });
// }


// // for fetching pokemons from each type
// function fetchPokemons(pokemonsArr, pokeType) {

//   // traverse on 10 pokemons
//   pokemonsArr.forEach(async (pokemon, idx) => {

//     if (idx < 10) {
//       const url = pokemon.pokemon.url;

//       //  fetch for 10 pokemons of each type
//       fetch(url)
//         .then((res) => res.json())

//         //adding each pokemon data to model
//         .then((parsedRes) => {

//           pokemons.push({
//             id: parsedRes.id,
//             image: parsedRes.sprites.front_default,
//             name: parsedRes.name,
//             type: pokeType,
//             abilities: parsedRes.abilities,
//             // color:
//           })

//         })
//     }

//   })

// }















/////lokesh sirrrr

// const url = pokemon.pokemon.url;

//           const geekmon = await fetch(url);

//           const pokeData = await geekmon.json();

//           pokemons.push({
//                     id: pokeData.id,
//                     image: pokeData.sprites.front_default,
//                     name: pokeData.name,
//                     type: pokeType,
//                     abilities: pokeData.abilities,
//                     // color:
//           })











//     .then((pokeTypesArr) => {
//       // traverse on types
//       pokeTypesArr.forEach((pokeTypeObj) => {
//         var pokeType = pokeTypeObj.name;

//         // fetch url of each type
//         fetch(pokeTypeObj.url)
//           .then((response) => response.json())

//           .then((parsedResponse) => {
//             const pokemonsArr = parsedResponse.pokemon;

//             // traverse on 10 pokemons
//             pokemonsArr.forEach((pokemon, idx) => {
//               if (idx < 10) {
//                 const url = pokemon.pokemon.url;

//                 // fetch for 10 pokemons of each type
//                 fetch(url)
//                   .then((res) => res.json())

//                   //adding each pokemon data to model
//                   .then((parsedRes) => {
//                     pokemons.push({
//                       id: parsedRes.id,
//                       image: parsedRes.sprites.front_default,
//                       name: parsedRes.name,
//                       type: pokeType,
//                       abilities: parsedRes.abilities,
//                       // color:
//                     })
//                     showPokemons(pokemons);

//                   })

//               }
//             });

//           });

//         // .then ((pokemons) => console.log(pokemons))
//       });

//       // return pokemons;
//     });
//   // console.log(pokemons);
//   // .then((pokemons) => {
//   //     console.log(pokemons);
//   // })
// };

// // function showPokemons(pokemonsArr) {
// //   console.log(pokemonsArr);
// // }
