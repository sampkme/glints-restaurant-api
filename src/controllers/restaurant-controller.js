const { Pool } = require('pg');
var config = require('../config/config.js');

const pool = new Pool({
    user: config.get('db.user_name'),
    host: config.get('db.host'),
    database: config.get('db.name'),
    password: config.get('db.password'),
    port: config.get('db.port'),
});

const getRestaurants = (req, res) => {
    pool.query('SELECT * FROM restaurants ORDER BY id ASC').then(results => {
        res.status(200).json(results.rows);
    }).catch(err => {
        res.sendStatus(500);
        res.end();
    })
}

const getRestaurant = (req, res) => {
    pool.query('SELECT * FROM restaurants WHERE id=$1', [req.params.id]).then(results => {
        res.status(200).json(results.rows[0]);
    }).catch(err => {
        res.sendStatus(500);
        res.end();
    })
}

module.exports = {
    getRestaurants,
    getRestaurant
}