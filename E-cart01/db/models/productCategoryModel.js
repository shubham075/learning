const Sequelize = require('sequelize');
const mysql = require('mysql');
const { get } = require('lodash');
require('dotenv').config();

const dairyModel = require('./dairyModel');
const grainModel = require('./grainModel');
const statinoaryModel = require('./stationaryMode');

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

const productCategory = sequelize.define('categoryModel', {
    categoryId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoryName: {
        type: Sequelize.STRING
    },
    categoryDescription: {
        type: Sequelize.TEXT,
        defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    categoryImage: {
        type: Sequelize.STRING
    }
},
    {
        initialAutoIncrement: 1000,
    }
);

sequelize.sync(); //{alter:true}  { force: true }
module.exports = { productCategory }

