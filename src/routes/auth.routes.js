const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
var express = require('express');
var authRoute = express.Router();

authRoute.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

authRoute.post(
    "/signup",
    [
        verifySignUp.checkDuplicateEmail,
    ],
    controller.signup
);

authRoute.post("/signin", controller.signin);

module.exports = authRoute;