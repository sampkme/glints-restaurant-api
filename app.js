const express = require("express");
const app = express();
const morgan = require('morgan');
const { Pool } = require('pg');
var config = require('./config/config.js');

const pool = new Pool({
    user: config.get('db.user_name'),
    host: config.get('db.host'),
    database: config.get('db.name'),
    password: config.get('db.password'),
    port: config.get('db.port'),
});


// Log transactions
app.use(morgan('combined'));

// Routes
app.get("/", function (req, res) {
    pool.query('SELECT * FROM horrors', (error, results) => {
        if(error) {
            res.send(error);
            res.sendStatus(500);
            res.end();
        }
        res.status(200).json(results.rows);
    });

});

// Server listening to 3000
app.listen(config.get('port'), function () {
    console.log("SERVER STARTED ON localhost:3000");
})