module.exports = (sequelize, Sequelize) => {
    const RestaurantDay = sequelize.define("restaurant_days", {
        restaurant_id: {
            type: Sequelize.BIGINT,
        },
        day: {
            type: Sequelize.STRING
        },
        time_from: {
            type: Sequelize.TIME
        },
        time_to: {
            type: Sequelize.TIME
        },
    });
    return RestaurantDay;
};