var express = require('express');
const restaurantRoute = require('./restaurant-route');
var router = express.Router();

// Default URL
router.get('/', function (req, res) {
    res.send("Api works and please use specific url to fetch or save datas");
});

// restaurant route
router.use('/restaurants', restaurantRoute);

// Fallback 
router.get('*', function (req, res) {
    res.send('404 - URL NOT FOUND', 404);
});

module.exports = router;