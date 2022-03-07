var express = require('express');
var restaurantRoute = express.Router();
const restaurantController = require('../controllers/restaurant.controller');

// get all restaurants
// restaurantRoute.get('/', restaurantController.getRestaurants);

// // get restaurant info
// restaurantRoute.get('/:id', restaurantController.getRestaurant);


restaurantRoute.get('/test', restaurantController.parseRestaurantData);

// Fallback 
restaurantRoute.get('*', function (req, res) {
    res.send('404 - URL NOT FOUND', 404);
});

module.exports = restaurantRoute;