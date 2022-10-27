const router = require('express').Router();

const categoryRoutes = require('./category-routes')
const dietRoutes = require('./diet-routes');
const recipeRoutes = require('./recipe-routes');
const userRoutes = require('./user-routes');

router.use('/categories', categoryRoutes);
router.use('/diets', dietRoutes);
router.use('/recipes', recipeRoutes);
router.use('/users', userRoutes);

module.exports = router;