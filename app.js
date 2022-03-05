const express = require("express");
const app = express();
const morgan = require('morgan');
var config = require('./config/config.js');
const router = require("./route/route.js");

// Log transactions
app.use(morgan('combined'));

// Route
app.use('/api', router);

// Server listening to 3000
app.listen(config.get('port'), function () {
    console.log("SERVER STARTED ON localhost:3000");
})