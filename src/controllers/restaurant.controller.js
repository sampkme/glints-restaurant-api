var db = require('../config/database');

const getRestaurants = (req, res) => {
    db.query('SELECT * FROM restaurants ORDER BY id ASC').then(results => {
        res.status(200).json(results.rows);
    }).catch(err => {
        res.sendStatus(500);
        res.end();
    })
}

const getRestaurant = (req, res) => {
    db.query('SELECT * FROM restaurants WHERE id=$1', [req.params.id]).then(results => {
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