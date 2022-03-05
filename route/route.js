var express = require('express');
const restaurantRoute = require('../modules/restaurant/restaurant-route');
var router = express.Router();

// Default URL
router.get('/', function(req,res) {
    res.send("Api works and please use specific url to fetch or save datas");
});

// restaurant route
router.use('/restaurants', restaurantRoute);

module.exports = router;