var express = require('express');
var restaurantRoute = express.Router();
const restaurantController = require('../controllers/restaurant.controller');
const { authJwt } = require('../middleware');

// get all restaurants
restaurantRoute.get(
    '/',
    [authJwt.addToken],
    restaurantController.allRestaurants
);


// Fallback 
restaurantRoute.get('*', function (req, res) {
    res.send('404 - URL NOT FOUND', 404);
});

module.exports = restaurantRoute;