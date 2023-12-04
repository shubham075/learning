const mysql = require('mysql');
const Sequelize = require('sequelize');
require('dotenv').config();
const sql_conn = require('../db/userModel');


const userData = {
    getAllUsersData: async () => {
        return sql_conn.user.findAll();
    },
    getUserById: async (data) => {
        return sql_conn.user.findAll({
            where: {
                id: data,
                status: 'active'
            }
        });
    },
    updateUserById: async (data, email, address) => {
        return sql_conn.user.update({
            email: email,
            address: address
        }, {
            where: {
                id: data,
                status: 'active'
            }
        });
    },
    createUserData: async (data) => {
        return sql_conn.user.create({
            first_name: data.first_name,
            last_name: data.last_name,
            contact: data.contact,
            email: data.email,
            address: data.address
        });
    },
    deleteUserById: async (data) => {
        return sql_conn.user.destroy({
            where: {
                id: data,
            }
        })

    }

}

module.exports = { userData }