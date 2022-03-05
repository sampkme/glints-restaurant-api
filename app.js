const express = require("express");
const app = express();
const morgan = require('morgan');
var config = require('./src/config/config');
const router = require("./src/routes/index");
const cors = require('cors');

// Log transactions
app.use(morgan('combined'));

// Route
app.get('/', function (req, res) {
    res.send("Welcome to the Restaurant API project. Please use /api as following specific urls EX: /api/restaurants");
});

app.use('/api', cors(), router);

// Server listening to 3000
app.listen(config.get('port'), function () {
    console.log("SERVER STARTED ON localhost:" + config.get('port'));
})