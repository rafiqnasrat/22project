const express = require('express');
//import routes
var session = require('express-session');
const routes = require('./controllers');

//setup handlebars
const path = require('path')
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

//Heroku port || local port
const PORT = process.env.PORT || 3001;
const app = express();

//import sequelize
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.Secret,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//include files in public folder
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

//turn on handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now Listening"));
});