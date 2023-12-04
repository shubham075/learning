const mysql = require('mysql');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();

// //sequelize connection with mysql database;
const sequelize = new Sequelize("testdata", 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

//checking database connection
sequelize.authenticate().then((sucess) => {
    console.log('Sucessfully connect with');
}).catch((error) => {
    console.log("Connection falied", error);
});

const admin = sequelize.define("admin", {
    admin_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING,
        set(value) {
            this.setDataValue('password', bcrypt.hashSync(value, saltRounds))
        }
    },
    status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }
});

sequelize.sync();  //{alter:true}

module.exports = { admin }; 