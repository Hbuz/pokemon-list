const { Router } = require("express");
const PokemonUser = require("./model");
const Pokemon = require("../pokemon/model");

const router = new Router();

//Get favorites
router.get(`/pokemons/favorites/:userId`, function(req, res, next) {
  PokemonUser.findAll({
    where: {
      userId: req.params.userId
    }
  })
    .then(favorites => {
      res.json({ favorites: favorites });
    })
    .catch(err => {
      res.status(500).json({
        message: `Something went wrong`,
        error: err
      });
    });
});

//Add favorite
router.post(`/users/:userId`, (req, res) => {
  const userId = req.params.userId;
  Pokemon.findOne({
    where: {
      name: req.query.name
    }
  })
    .then(pokemon => {
      if (pokemon) {
        console.log(`Saving Pokemon ${pokemon.name} as favorite`);
        PokemonUser.create({
          userId: userId,
          pokemonId: pokemon.id
        }).then(relation => {
          res.status(201);
          res.json({
            userId: relation.userId,
            pokemonId: relation.pokemonId
          });
        });
      } else {
        res.status(400).send({
          message: "Pokemon not found"
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Something went wrong"
      });
    });
});

//Remove favorite
router.delete(`/users/:userId`, (req, res) => {
  const userId = req.params.userId;
  Pokemon.findOne({
    where: {
      name: req.query.name
    }
  })
    .then(pokemon => {
      if (pokemon) {
        console.log(`Deleting Pokemon ${pokemon.name} as favorite`);
        PokemonUser.destroy({
          where: {
            userId: userId,
            pokemonId: pokemon.id
          }
        }).then(relation => {
          res.status(201);
          res.json({
            userId: relation.userId,
            pokemonId: relation.pokemonId
          });
        });
      } else {
        res.status(400).send({
          message: "Pokemon not found"
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Something went wrong"
      });
    });
});

module.exports = router;
