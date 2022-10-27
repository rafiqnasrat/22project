const seedCategories = require('./category-seeds');
const seedDiet = require('./diet-seeds');
const seedRecipe = require('./recipe-seeds');
const seedUser = require('./user-seeds');
const seedRecipeDiet = require('./recipe-diet-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedUser();
  console.log('\n-----  USERS SEEDED -----\n');

  await seedDiet();
  console.log('\n----- DIETS SEEDED -----\n');

  await seedRecipe();
  console.log('\n----- RECIPES SEEDED -----\n');

  await seedRecipeDiet();
  console.log('\n----- RECIPES-DIET SEEDED -----\n');

  process.exit(0);
};

seedAll();