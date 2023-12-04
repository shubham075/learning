const mysql = require('mysql');
const Sequelize = require('sequelize');
require('dotenv').config();
const { user } = require('./userModel')

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

const orders = sequelize.define('orders', {
    invoice: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    size: {
        type: Sequelize.STRING,
        allowNull: false
    },
    totalAmount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: user,
            key: 'id'
        }
    }
}, { timestamps: false });