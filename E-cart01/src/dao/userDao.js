const mysql = require('mysql');
const { Sequelize, Op } = require('sequelize');
const userModel = require('../../db/models/userModel');
// const adminModel = require('../../db/models/adminModel');

require('dotenv').config();


const userDao = {
    getAllUserData: async () => {
        return userModel.user.findAll();
    },

    getUserByEmail: async (data) => {
        return userModel.user.findOne({
            where: {
                email: data,
                status: 'active'
            }
        });
    },
    
}


module.exports = { userDao }