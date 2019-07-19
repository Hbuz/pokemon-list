const Sequelize = require(`sequelize`);
const db = require(`../db`);

const User = db.define(
  `user`,
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    timestamps: false,
    tableName: `users`
  }
);

User.associate = models => {
  User.belongsToMany(models.Pokemon, {
    through: `pokemonUsers`,
    as: `pokemons`,
    foreignKey: `userId`,
    otherKey: `pokemonId`
  });
};


module.exports = User;
