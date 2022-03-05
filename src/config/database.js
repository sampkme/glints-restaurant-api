const { Pool } = require('pg');

var config = require('../config/config.js');

const pool = new Pool({
    user: config.get('db.user_name'),
    host: config.get('db.host'),
    database: config.get('db.name'),
    password: config.get('db.password'),
    port: config.get('db.port'),
});

pool.on('connect', () => {
    console.log('Database successfully connected!');
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};