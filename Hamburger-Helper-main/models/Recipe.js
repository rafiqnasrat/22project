const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Recipe extends Model {}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    instructions: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    user_id: {
        type: DataTypes.INTEGER,
        REFERENCES: {
            model: "user",
            key: "id",
        }
    },

    category_id: {
        type: DataTypes.INTEGER,
        REFERENCES: {
            model: "category",
            key: "id",
        }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "recipe",
  }
);

module.exports = Recipe;
