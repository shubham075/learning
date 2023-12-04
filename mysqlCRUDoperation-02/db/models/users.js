const mysql = require('mysql');
const Sequelize = require('sequelize');
require('dotenv').config();


// //sequelize connection with mysql database;
const sequelize = new Sequelize("testcase01", 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

//checking database connection
sequelize.authenticate().then((sucess) => {
    console.log('Sucessfully connect with');
}).catch((error) => {
    console.log("Connection falied", error);
});

// //creating models 
const user = sequelize.define("userinfo02", {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    contact: {
        type: Sequelize.BIGINT
    },
    email: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING,
        defaultVlaue: "Patna, Bihar-801506"
    },
    status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }

});
sequelize.sync();  //{alter:true}

module.exports = { user };  