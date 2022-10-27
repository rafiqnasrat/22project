const { Diet } = require("../models");

const dietData = [
  {
    limit: "None",
  },
  {
    limit: "Dairy-Free",
  },
  {
    limit: "Gluten-Free",
  },
  {
    limit: "Kosher",
  },
  {
    limit: "Peskitarian",
  },
  {
    limit: "Shellfish",
  },
  {
    limit: "Vegan",
  },
  {
    limit: "Vegetarian",
  },
];

const seedDiet = () => Diet.bulkCreate(dietData);

module.exports = seedDiet;
