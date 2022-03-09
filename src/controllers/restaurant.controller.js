const db = require("../models");
const { Op, Sequelize } = require("sequelize");
const Restaurant = db.restaurant;
const RestaurantDay = db.restaurant_day;
const moment = require("moment");

const allRestaurants = (req, res) => {
    var restaurantDayWhereStatement = {};

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

    Restaurant.findAll({
        include: [{
            model: RestaurantDay,
            as: 'restaurant_days',
            where: restaurantDayWhereStatement
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