const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
var express = require('express');
var userRoute = express.Router();

userRoute.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
userRoute.get(
    "/",
    [authJwt.verifyToken],
    controller.allUsers
);

module.exports = userRoute;