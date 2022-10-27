const path = require('path');
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Category, User, Recipe, Diet } = require('../models');
const withAuth = require('../utils/auth');

// Connect with sign up page
router.get('/signup', (req, res) => {
  //If user is already logged in, redirect to userlist
  if (req.session.loggedIn) {
    res.redirect('/userlist');
    return;
  }
  res.render('signup');
});

// Connect with login page
router.get('/login', (req, res) => {
  //If user is already logged in, redirect to userlist
  if (req.session.loggedIn) {
    res.redirect('/userlist');
    return;
  }
  res.render('login');
});

//Connect to user List
router.get('/userlist', withAuth, (req, res) => {
  Recipe.findAll({
    where: { 
      user_id: req.session.user_id 
    },
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  }).then((dbRecipeData) => {
    const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
    const user = req.session.username
    console.log(recipes);
    res.render('userlist', {
      user,
      recipes,
      loggedIn: req.session.loggedIn,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//ADD RECIPES - importing categories and dietary restrictions from db
router.get('/addrecipe', withAuth, (req, res) => {
  //Find categories
  Category.findAll({
    attributes: ['category_name']
  })
  .then((dbCategoryData) => {
    const categories = dbCategoryData.map((category) => category.get({ plain: true}))
    console.log(categories);

    //find dietary limitations
    Diet.findAll({
      attributes: ['diet_name']
    }).then((dbDietData) => {
      const diets = dbDietData.map((diet) => diet.get({ plain: true}))
      console.log(diets)
      //render both
      res.render('addrecipe',  {
        categories,
        diets,
        loggedIn: req.session.loggedIn
      })
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
});

//display all user recipes in dashboard
router.get('/dashboard', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Recipe.findAll({
    attributes: [
      'title',
      'description',
      'ingredients',
      'instructions',
      'time'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbRecipeData => {
      const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true }));
      res.render('dashboard', { recipes, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

  
//redirect undefined to dashboard page
router.get("*", (req, res) => {
  res.render('dashboard');
  //if user is already logged in, they will be redirected to their dashboard
});

//Export router function
module.exports = router;

// //Future development: Connect to search function
// router.get('/dashboard', (req, res) => {
// //Find categories
// Category.findAll({
//   attributes: ['category_name']
// })
// .then((dbCategoryData) => {
//   const categories = dbCategoryData.map((category) => category.get({ plain: true}))
//   console.log(categories);

//   //find dietary limitations
//   Diet.findAll({
//     attributes: ['diet_name']
//   }).then((dbDietData) => {
//     const diets = dbDietData.map((diet) => diet.get({ plain: true}))
//     console.log(diets)
//     //render both
//     res.render('dashboard', {
//       categories,
//       diets,
//       loggedIn: req.session.loggedIn
//     })
//   }).catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });
// });

// //display recipes
// router.get('/display', (req, res) => {
//   Recipe.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: [
//       'id',
//       'title',
//       'description',
//       'ingredients',
//       'instructions',
//       'time'
//     ],
//     include: [
//       {
//         model: Category,
//         attributes: ['category_name'],
//       },
//       {
//         model: User,
//         attributes: ['username']
//       }
//     ]
//   })
//     .then(dbRecipeData => {
//       if (!dbRecipeData) {
//         res.status(404).json({ message: 'No post found with this id' });
//         return;
//       }

//       const post = dbRecipeData.get({ plain: true });

//       res.render('/display', {
//         post,
//         loggedIn: req.session.loggedIn
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
