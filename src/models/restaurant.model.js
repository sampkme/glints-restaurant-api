module.exports = (sequelize, Sequelize) => {
    const Restaurant = sequelize.define("restaurants", {
        name: {
            type: Sequelize.STRING
        },
    });
    return Restaurant;
};