const { Recipe } = require('../models');

const recipeData = [
  {
    title: 'Quiche',
    description: "this is a recipe for quiche!",
    ingredients: "eggs, cheese, green pepper, and salt and pepper",
    instructions: "I actually don't know how to make quiche",
    time: "probably like 10 mins or so",
    user_id: 1,
    category_id: 1,
  },
  {
    title: 'Quiche',
    description: "this is a recipe for quiche!",
    ingredients: "eggs, cheese, green pepper, and salt and pepper",
    instructions: "I actually don't know how to make quiche",
    time: "probably like 10 mins or so",
    user_id: 2,
    category_id: 1,
  },
  
];

const seedRecipe = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipe;