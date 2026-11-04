const mariadb = require('mariadb');


const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_HOST,
    password: process.env.DB_HOST,
    database: process.env.DB_HOST
});

module.exports = pool;