const express = require("express");
const app = express();
const morgan = require('morgan');

// Log transactions
app.use(morgan('combined'));

// Routes
app.get("/", function (req, res) {
    res.send("Welcome to the world of science fiction, conflicting theories, fantasies and some eccentric nerds!")
});

// Server listening to 3000
app.listen(3000, function () {
    console.log("SERVER STARTED ON localhost:3000");
})