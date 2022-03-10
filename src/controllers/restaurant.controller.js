const db = require("../models");
const { Op, Sequelize } = require("sequelize");
const Restaurant = db.restaurant;
const RestaurantDay = db.restaurant_day;
const FavouriteRestaurant = db.favourite_restaurant;
const Favourite = db.favourite;
const moment = require("moment");

const allRestaurants = (req, res) => {
    var restaurantDayWhereStatement = {};
    var favouriteRestaurantWhereStatement = {};

    if (req.query.day && req.query.time) {
        restaurantDayWhereStatement = {
            [Op.and]: [
                {
                    day: req.query.day,
                },
                {
                    time_from: {
                        [Op.gte]: req.query.time
                    }
                },
                {
                    time_to: {
                        [Op.lte]: req.query.time
                    }
                }
            ],

        };
    }

    if (req.userId) {
        favouriteRestaurantWhereStatement = {
            user_id: req.userId
        };
    }

    Restaurant.findAll({
        include: [{
            model: RestaurantDay,
            as: 'restaurant_days',
            where: restaurantDayWhereStatement
        },
        {
            model: FavouriteRestaurant,
            required: false,
            where: favouriteRestaurantWhereStatement,
            include: [Favourite]
        }],
        where: {
            name: {
                [Op.iLike]: '%' + req.query.name + '%'
            },
        }
    }).then(restaurants => {
        res.status(200).json(restaurants);
    }).catch(err => {
        res.status(500).send(err);
    })
};

module.exports = {
    allRestaurants,
}