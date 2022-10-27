const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class RecipeDiet extends Model {}

RecipeDiet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    recipe_id: {
      type: DataTypes.INTEGER,
      REFERENCES: {
        model: "recipe",
        key: "id",
      },
    },

    diet_id: {
      type: DataTypes.INTEGER,
      REFERENCES: {
        model: "diet",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "recipe_diet",
  }
);

module.exports = RecipeDiet;
