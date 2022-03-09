const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
var bcrypt = require("bcryptjs");
const restaurantDataController = require('../controllers/restaurant.data.controller');

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: 0,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.restaurant = require("../models/restaurant.model.js")(sequelize, Sequelize);
db.restaurant_day = require("../models/restaurant-day.model.js")(sequelize, Sequelize);

db.restaurant.hasMany(db.restaurant_day, { foreignKey: 'restaurant_id', sourceKey: 'id' });

const User = db.user;
const Restaurant = db.restaurant;
const RestaurantDay = db.restaurant_day;


db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
    createRestaurantData();
});

// Create default user
function initial() {
    User.create({
        id: 1,
        name: "Saravana Kumar",
        email: "sampkme@gmail.com",
        password: bcrypt.hashSync("saravana7", 8)
    });
}

//Create restaurant datas
async function createRestaurantData() {
    let csvData = await restaurantDataController.parseRestaurantData();
    var days = [];
    let promises = [];
    csvData.forEach(data => {
        promises.push(
            Restaurant.create({
                name: data.name
            }).then(restaurant => {
                data.opening_periods.forEach(period => {
                    period.days.forEach(basicDay => {
                        var day = {
                            restaurant_id: restaurant.id,
                            time_from: period.time_from,
                            time_to: period.time_to,
                            day: basicDay
                        };
                        days.push(day);
                    })
                })
            })
        );
    });
    Promise.all(promises).then((result) => {
        RestaurantDay.bulkCreate(days).catch(err => {
            console.log(err);
        });
    });
}

module.exports = db;