const { authJwt } = require("../middleware");
const controller = require("../controllers/favourite.controller");
var express = require('express');
var favouriteRoute = express.Router();

favouriteRoute.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
favouriteRoute.get(
    "/",
    [authJwt.verifyToken],
    controller.allFavorites
);

module.exports = favouriteRoute;