var express = require('express');
const authRoute = require('./auth.routes');
const favouriteRoute = require('./favourite.routes');
const restaurantRoute = require('./restaurant.routes');
const userRoute = require('./user.routes');
var router = express.Router();

// Default URL
router.get('/', function (req, res) {
    res.send("Api works and please use specific url to fetch or save datas");
});

// restaurant route
router.use('/auth', authRoute);

// restaurant route
router.use('/restaurants', restaurantRoute);

// users route
router.use('/users', userRoute);

// favourite route
router.use('/favourites', favouriteRoute);

// Fallback 
router.get('*', function (req, res) {
    res.send('404 - URL NOT FOUND', 404);
});

module.exports = router;