
const mysql = require('mysql');
const { Sequelize, Op } = require('sequelize');
const adminModel = require('../../db/models/adminModel');



const adminDao = {
    getAdminByEmail: (data) => {
        return adminModel.admin.findOne({
            where: {
                email: data.email
            }
        });
    }


}

module.exports = { adminDao }

