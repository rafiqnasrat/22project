const { User } = require("../models");

const userData = [
  {
    id: 1,
    username: "steve",
    email: "stephen@email.com",
    password: "test123",
  },
  {
    id: 2,
    username: "Greg",
    email: "greg@email.com",
    password: "testing",
  },
  
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
