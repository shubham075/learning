
const mysql = require('mysql');
const { Sequelize, Op } = require('sequelize');

const user_sql_conn = require('./userModel');
const admin_sql_conn = require('./adminUserModel')
require('dotenv').config();

const userData = {

    getAllUsersData: async () => {
        return user_sql_conn.user.findAll();
    },

    getAllAdminUsersData: async () => {
        return admin_sql_conn.adminUser.findAll();
    },

    getUserById: async (data) => {
        return user_sql_conn.user.findAll({
            where: {
                id: data,
                status: 'active'
            }
        });
    },
    searchByNames: async (attr1) => {
        return user_sql_conn.user.findAll({
            where: {
                [Op.or]: [{ first_name: attr1 },
                { last_name: attr1 }]
            }
        });
    },
    addSingleUser: async (data) => {
        return user_sql_conn.user.create({
            first_name: data.first_name,
            last_name: data.last_name,
            contact: data.contact,
            email: data.email
        });
    },
    updateSingleUserById: async (data, id) => {
        return user_sql_conn.user.update({
            first_name: data.first_name,
            last_name: data.last_name,
            contact: data.contact,
            email: data.email
        }, {
            where: {
                id: id,
                status: 'active'
            }
        });
    },
    deleteUserById: async (data) => {
        return user_sql_conn.user.destroy({
            where: {
                id: data
            }
        });
    },
    getAdminByUserId: async (data) => {
        return admin_sql_conn.adminUser.findOne({
            where: {
                userID: data,
                status: 'active'
            }
        });
    },
    getAdminByEmail: async (data) => {
        return admin_sql_conn.adminUser.findOne({
            where: {
                email: data,
                status:'active'
            }
        });
    },
    updateAdminUserByEmail: async(email, pass)=>{
        return admin_sql_conn.adminUser.update({
            password:pass
        },{
            where:{
                email:email
            }
        });
    }

}


module.exports = { userData }