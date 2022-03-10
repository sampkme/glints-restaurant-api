module.exports = (sequelize, Sequelize) => {
    const Favourite = sequelize.define("favourites", {
        name: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.BIGINT
        },
    });
    return Favourite;
};