const Sequelize = require('sequelize');
const mysql = require('mysql');
require('dotenv').config();

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

const DairyProduct = sequelize.define('dairyProduct', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productName: {
        type: Sequelize.STRING
    },
    productDescription: {
        type: Sequelize.TEXT,
        defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    productCategory: {
        type: Sequelize.STRING  //add ref key (product category model NAME)
    },
    productImage: {
        type: Sequelize.STRING
    },
    discountValue: {
        type: Sequelize.DECIMAL,
    },
    productPrice: {
        type: Sequelize.DECIMAL
        // discount: get('discountValue'),
        // set(value) {
        //     this.setDataValue('productPrice', value - (value * `${this}` / 100));
        // }
    },
    productSize: {
        type: Sequelize.INTEGER
    },
    stockValue: {
        type: Sequelize.INTEGER
    },
    isAvaliable: {
        type: Sequelize.ENUM('InStock', 'OutStock'),
        defaultValue: 'InStock'
    }
});

sequelize.sync(); //{alter:true}  { force: true }

module.exports = { DairyProduct }