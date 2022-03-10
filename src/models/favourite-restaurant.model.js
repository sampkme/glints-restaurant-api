module.exports = (sequelize, Sequelize) => {
    const FavouriteRestaurant = sequelize.define("favourite_restaurants", {
        favourite_id: {
            type: Sequelize.BIGINT,
        },
        restaurant_id: {
            type: Sequelize.BIGINT,
        },
        user_id: {
            type: Sequelize.BIGINT
        },
    });
    return FavouriteRestaurant;
};