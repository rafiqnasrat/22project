const { RecipeDiet } = require('../models');

const recipeDietData = [
  {
    recipe_id: 1,
    diet_id: 1,
  },
  {
    recipe_id: 2,
    diet_id: 1,
  },
];

const seedRecipeDiet = () => RecipeDiet.bulkCreate(recipeDietData);

module.exports = seedRecipeDiet;