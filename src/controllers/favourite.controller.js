const db = require("../models");
const Favourite = db.favorite;

const allFavorites = (req, res) => {
    Favourite.findAll({
        where: {
            user_id: req.userId
        }
    }).then(favourites => {
        res.status(200).json(favourites);
    }).catch(err => {
        res.setStatus(500);
        res.end();
    })

};

const createFavourite = (req, res) => {
    Favourite.create({
        name: req.name,
        user_id: req.userId
    }).then(favourite => {
        res.status(200).json(favourite);
    }).catch(err => {
        res.setStatus(500);
        res.end();
    })

};

module.exports = {
    allFavorites
};