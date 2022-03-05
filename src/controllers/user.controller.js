const db = require("../models");
const User = db.user;

const allUsers = (req, res) => {
    User.findAll().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.setStatus(500);
        res.end();
    })

};

module.exports = {
    allUsers
};