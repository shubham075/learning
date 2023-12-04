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

const adminUser = sequelize.define("admin", {
    admin_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userID: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        defaultValue: 'prakashkumar730187@gmail.com'
    },
    status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }

});

sequelize.sync();  //{alter:true}

module.exports = { adminUser }; 