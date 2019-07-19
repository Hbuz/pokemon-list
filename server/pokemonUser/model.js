const Sequelize = require(`sequelize`);
const db = require(`../db`);

const PokemonUser = db.define(
  `pokemonUser`,
  {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: `users`,
        key: `id`
      }
    },
    pokemonId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: `pokemons`,
        key: `id`
      }
    }
  },
  {
    tableName: `pokemonUsers`
  }
);


module.exports = PokemonUser;
