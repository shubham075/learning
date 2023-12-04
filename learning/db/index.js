const mysql = require('mysql');
const config = require('../db/config/config_details');
const mongoose = require('mongoose');

mongoose.connect(config.mongo_url)
    .then(() => console.log('MongoDB connected.....'))
    .catch((err) => console.error('could not connect to mongoDB...'))

const db_config = {
    host: config.db_host,
    user: config.db_user_name,
    password: config.db_password,
    database: config.db_name,
}

const sql_conn = mysql.createConnection(db_config);
sql_conn.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});



module.exports = { sql_conn };
