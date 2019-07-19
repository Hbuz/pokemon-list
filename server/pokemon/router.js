const { Router } = require("express");
const Sequelize = require(`sequelize`);
const Pokemon = require("./model");

const router = new Router();

const Op = Sequelize.Op;

//Retrieve pokemons by search key
router.get(`/pokemons`, function(req, res) {
  const name = req.query.name;
  if (name) {
    Pokemon.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    })
      .then(pokemons => {
        res.json({ pokemons: pokemons });
      })
      .catch(err => {
        res.status(500).json({
          message: `Something went wrong`,
          error: err
        });
      });
  } else {
    Pokemon.findAll()
      .then(pokemons => {
        res.json({ pokemons: pokemons });
      })
      .catch(err => {
        res.status(500).json({
          message: `Something went wrong`,
          error: err
        });
      });
  }
});

//Retrieve pokemon by name (selected from list)
router.get(`/pokemons/:name`, function(req, res) {
  Pokemon.findOne({
    where: {
      name: req.params.name
    }
  })
    .then(pokemon => {
      res.json({ pokemon: pokemon });
    })
    .catch(err => {
      res.status(500).json({
        message: `Something went wrong`,
        error: err
      });
    });
});

module.exports = router;
