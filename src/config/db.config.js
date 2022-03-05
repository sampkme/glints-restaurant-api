// const { Pool } = require('pg');

var config = require('./config.js');

module.exports = {
    HOST: config.get('db.host'),
    USER: config.get('db.user_name'),
    PASSWORD: config.get('db.password'),
    DB: config.get('db.name'),
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};