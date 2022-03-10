const express = require("express");
const app = express();
const morgan = require('morgan');
const config = require('./src/config/config');
const router = require("./src/routes/index");
const cors = require('cors');
const bodyParser = require("body-parser");
const db = require("./src/models");


// Log transactions
app.use(morgan('combined'));

// CORS
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//sequelize syncing
// db.sequelize.sync();

// Route
app.get('/', function (req, res) {
    res.send("Welcome to the Restaurant API project. Please use /api as following specific urls EX: /api/restaurants");
});

app.use('/api', router);

// Server listening to 3000
app.listen(config.get('port'), function () {
    console.log("SERVER STARTED ON localhost:" + config.get('port'));
})