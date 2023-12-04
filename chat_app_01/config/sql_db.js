const mysql = require('mysql');
const dbConfig = require('./db_config');

const sql_conn = mysql.createConnection(dbConfig);
sql_conn.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = { sql_conn };