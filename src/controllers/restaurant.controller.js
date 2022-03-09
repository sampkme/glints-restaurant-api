const db = require("../models");
const { Op } = require("sequelize");
const Restaurant = db.restaurant;
const RestaurantDay = db.restaurant_day;
const Sequelize = require("sequelize");

const allRestaurants = (req, res) => {
    Restaurant.findAll({
        include: [{
            model: RestaurantDay,
            // where: {
            //     day: req.query.day
            // }
            // where: {
            //     [Op.and]: [
            //         { day: req.query.day },
            //         {
            //             [Op.or]: {
            //                 time_from: {
            //                     [Op.gte]: req.query.time,
            //                 },
            //                 time_to: {
            //                     [Op.lte]: req.query.time
            //                 }
            //             }
            //         }
            //     ],
            // }
        }],
        // attributes: ['name'],
        // where: {
        //     // name: {
        //     //     [Op.like]: '%' + req.query.name + '%'
        //     // },
        //     $and: [
        //         Sequelize.where(
        //             Sequelize.fn('lower', Sequelize.col('name')),
        //             {
        //                 $like: '%' + req.query.name + '%'
        //             }
        //         )
        //     ]
        // }
    }).then(restaurants => {
        res.status(200).json(restaurants);
    }).catch(err => {
        res.setStatus(500);
        res.end();
    })
};

module.exports = {
    allRestaurants,
}