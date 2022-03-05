var express = require('express');
var restaurantRoute = express.Router();
const restaurantController = require('./restaurant-controller');

// get all restaurants
restaurantRoute.get('/', restaurantController.getRestaurants);

// get restaurant info
restaurantRoute.get('/:id', restaurantController.getRestaurant);



module.exports = restaurantRoute;