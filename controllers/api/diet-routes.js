const router = require('express').Router();
const { Diet } = require('../../models');

//get all dietary limitations
router.get("/", (req, res) => {
  Diet.findAll()
    .then((dbDietData) => res.json(dbDietData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//gets a specific dietary limitation by its id
router.get("/:id", (req, res) => {
  Diet.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbDietData) => {
      if (!dbDietData) {
        res.status(404).json({ message: "No dietary limitation found with this id" });
        return;
      }
      res.json(dbDietData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Creates a new dietary limitation
router.post("/", (req, res) => {
  //expects {limit: gluten-free}
  Diet.create({
    diet_name: req.body.diet_name,
  })
    .then((dbDietData) => res.json(dbDietData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Updates a dietary limitation
router.put("/:id", (req, res) => {
  //expects {Diet: gluten free}
  //pass in req.body instead to only update what's passed through
  Diet.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbDietData) => {
      if (!dbDietData) {
        res.status(404).json({ message: "No dietary limitation found with this id" });
        return;
      }
      res.json(dbDietData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete dietary limitation from database
router.delete("/:id", (req, res) => {
  Diet.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbDietData) => {
      if (!dbDietData) {
        res.status(404).json({ message: "No dietary limitation found with this id" });
        return;
      }
      res.json(dbDietData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;