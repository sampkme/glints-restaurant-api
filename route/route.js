var express = require('express');
const restaurantRoute = require('../modules/restaurant/restaurant-route');
var router = express.Router();

// restaurant route
router.use('/restaurants', restaurantRoute);

module.exports = router;