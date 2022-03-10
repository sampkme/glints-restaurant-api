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
    controller.allFavourites
);

favouriteRoute.post(
    "/",
    [authJwt.verifyToken],
    controller.createFavourite
);

module.exports = favouriteRoute;