const mysql = require('mysql');
const Sequelize = require('sequelize');
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;

//connection with mysql database;
const sequelize = new Sequelize('testdata', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then((sucess) => {
    console.log('Sucessfully connect with');
}).catch((error) => {
    console.log("Connection falied", error);
});

//creating user model
const user = sequelize.define("customer", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    contact: {
        type: Sequelize.BIGINT
    },
    password: {
        type: Sequelize.STRING,
        set(value) {
            this.setDataValue('password', bcrypt.hashSync(value, saltRounds))
        }
    },
    address: {
        type: Sequelize.STRING,
        defaultValue: "Patna, Bihar-801506"
    },
    status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }
});
sequelize.sync(); //{alter:true}

module.exports = { user };