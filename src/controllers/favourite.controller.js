const db = require("../models");
const Favourite = db.favourite;
const FavouriteRestaurant = db.favourite_restaurant;

const allFavourites = (req, res) => {
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
    const body = req.body;
    try {
        if (body.id) {
            FavouriteRestaurant.create({
                favourite_id: body.id,
                restaurant_id: body.restaurant_id,
                user_id: req.userId
            }).then(favourite => {
                res.status(200).json(favourite);
            })
        }
        else {
            Favourite.create({
                name: body.name,
                user_id: req.userId
            }).then(favourite => {
                FavouriteRestaurant.create({
                    favourite_id: favourite.id,
                    restaurant_id: body.restaurant_id,
                    user_id: req.userId
                })
                res.status(200).json(favourite);
            })
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = {
    allFavourites,
    createFavourite
};