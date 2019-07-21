const express = require(`express`);
const fetch = require(`node-fetch`);
const bodyParser = require("body-parser");
const pokemonRouter = require(`./pokemon/router`);
const userRouter = require(`./user/router`);
const pokemonUserRouter = require(`./pokemonUser/router`);
const Pokemon = require(`./pokemon/model`);
const cors = require("cors");

const app = express();
//const port = process.env.PORT || 4001;
const port = process.env.PORT;

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app
  .use(bodyParser.json())
  .use(pokemonRouter)
  .use(userRouter)
  .use(pokemonUserRouter)
  .listen(port, () => console.log(`Express API listening on port ${port}`));

  

const fetchPokemons = () => {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=60`)
    .then(response => response.json())
    .then(function(data) {
      data.results.forEach(pokemon => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          .then(function(response) {
            return response.json();
          })
          .then(function(myJson) {
            Pokemon.create({
              name: myJson.name,
              weight: myJson.weight,
              height: myJson.height,
              base_experience: myJson.base_experience,
              image: myJson.sprites.front_default
            })
            .then(pokemon =>
              console.log(`Pokemon created = ${pokemon.name}`)
            );
          });
      });
    })
    .catch(function(error) {
      console.log(`Request failed`, error);
    });
};



fetchPokemons();


module.exports = app;