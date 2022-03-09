var express = require('express');
var restaurantRoute = express.Router();
const restaurantController = require('../controllers/restaurant.controller');

// get all restaurants
restaurantRoute.get('/', restaurantController.allRestaurants);


// Fallback 
restaurantRoute.get('*', function (req, res) {
    res.send('404 - URL NOT FOUND', 404);
});

module.exports = restaurantRoute;