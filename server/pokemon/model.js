const Sequelize = require(`sequelize`);
const db = require(`../db`);

const Pokemon = db.define(
   `pokemon`,
  {
    name: Sequelize.STRING,
    weight: Sequelize.INTEGER,
    height: Sequelize.INTEGER,
    base_experience: Sequelize.INTEGER,
    image: Sequelize.TEXT
  },
  {
    tableName: `pokemons`
  }
);

Pokemon.associate = models => {
  Pokemon.belongsToMany(models.User, {
    through: `pokemonUsers`,
    as: `users`,
    foreignKey: `pokemonId`,
    otherKey: `userId`
  });
};


module.exports = Pokemon;
