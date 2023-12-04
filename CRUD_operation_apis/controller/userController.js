const mysql = require('mysql');
const Sequelize = require('sequelize');
require('dotenv').config();
const query = require('../dao/user.dao');

// const userModel = require('../db/userModel');


exports.view = async (req, res, next) => {
    let userData = await query.userData.getAllUsersData();
    res.status(200).json({
        status: 'passed',
        message: 'Data fetched!!',
        length: userData.length,
        data: userData
    });
}

exports.viewById = async (req, res, next) => {
    let id = req.params.id;
    let userDataById = await query.userData.getUserById(id);
    res.status(200).json({
        status: 'passed',
        message: 'Data fetched!!',
        data: userDataById
    });
}

exports.update = async (req, res, next) => {
    const { email, address } = req.body;
    let id = req.params.id;
    let result = await query.userData.getUserById(id);
    if (result.length == 1) {
        let newData = await query.userData.updateUserById(id, email, address);
        res.status(200).json({
            status: 'ok',
            message: 'data updated sucessfully',
            data: newData
        });
    }
    else {
        res.status(400).json({
            status: 'failed',
            message: `No user exist with ID: ${id}`
        });
    }

}

exports.create = async (req, res, next) => {
    // const { first_name, last_name, contact, email, address } = req.body;
    const result = await query.userData.createUserData(req.body);
    if(result){
        res.status(200).json({
            status:'ok!',
            message: 'User created sucessfully',
            data:result
        })
    }
    else{
        res.status(206).json({
            status:'failed!',
            message:'provide all data'           
        })
    }
}

exports.delete = async (req,res,next)=>{
    let id = req.params.id;
    const result = await query.userData.deleteUserById(id);
    if(result == 1){
        res.status(200).json({
            status:'ok!',
            message:'User data deleted'
        })
    }
    else{
        res.status(400).json({
            status:'failed',
            message:`User not existed with ID ${id}`          
        })
    }
}