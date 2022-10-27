const User = require("./User");
const Category = require("./Category");
const Recipe = require("./Recipe");
const RecipeDiet = require("./RecipeDiet");
const Diet = require("./Diet");

// User belongsTo RECIPES
Recipe.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

// USER have many RECIPES
User.hasMany(Recipe, {
  foreignKey: "user_id"
});

// RECIPE belongsTo Category
Recipe.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "SET NULL",
});

// Categories have many RECIPES
Category.hasMany(Recipe, {
  foreignKey: "category_id",
});

// Products belongToMany Tags (through recipeDiet)
Recipe.belongsToMany(Diet, {
  through: RecipeDiet,
  foreignKey: "recipe_id",
});

// Tags belongToMany Products (through recipeDiet)
Diet.belongsToMany(Recipe, {
  through: RecipeDiet,
  foreignKey: "diet_id",
});

module.exports = {
  Recipe,
  Category,
  Diet,
  RecipeDiet,
  User,
};