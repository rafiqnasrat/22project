const router = require('express').Router();
const { Recipe, User, Category } = require('../../models');
const withAuth = require("../../utils/auth");

//Get and post routes
// Get all recipes
router.get('/', (req, res) => {
  Recipe.findAll()
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get a single recipe
router.get('/:id', (req, res) => {
  Recipe.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'title',
      'description',
      'ingredients',
      'instructions',
      'time',
      'user_id'
    ],
    include: [
    {
      model: User,
      attributes: ['username']
    }
  ]
  })
    .then(dbRecipeData => {
      if (!dbRecipeData) {
        res.status(404).json({ message: 'No recipe found with this id' });
        return;
      }
      res.json(dbRecipeData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// Create a recipe
router.post('/', withAuth, async (req, res) => {
  Recipe.create({
    title: req.body.title,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    time: req.body.time,
    user_id: req.session.user_id,

  }).then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})

// Update a recipe
router.put('/:id', (req, res) => {
   // pass in req.body instead to only update what's passed through
  Recipe.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbRecipeData => {
      if (!dbRecipeData) {
        res.status(404).json({ message: 'No recipe found with this id' });
        return;
      }
      res.json(dbRecipeData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a recipe
router.delete('/:id', (req, res) => {
  Recipe.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbRecipeData => {
    if (!dbRecipeData) {
      res.status(404).json({ message: 'No recipe found with this id' });
      return;
    }
    res.json(dbRecipeData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

module.exports  = router;