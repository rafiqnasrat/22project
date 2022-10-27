const { Diet } = require("../models");

const dietData = [
  {
    diet_name: "None",
  },
  {
    diet_name: "Dairy-Free",
  },
  {
    diet_name: "Gluten-Free",
  },
  {
    diet_name: "Kosher",
  },
  {
    diet_name: "Peskitarian",
  },
  {
    diet_name: "Shellfish",
  },
  {
    diet_name: "Vegan",
  },
  {
    diet_name: "Vegetarian",
  },
];

const seedDiet = () => Diet.bulkCreate(dietData);

module.exports = seedDiet;
