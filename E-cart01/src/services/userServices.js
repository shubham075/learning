const express = require('express');
const userQuery = require('../dao/userDao');
const productQuery = require('../dao/productDao');
const userModel = require('../../db/models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


exports.createNewUser = async (data, res) => {
    try {
        const [user, created] = await userModel.user.findOrCreate({
            where: { email: data.email },
            defaults: {
                name: data.name,
                email: data.email,
                contact: data.contact,
                password: data.password
            }
        });
        console.log('>>>>>>>>>>>>>>>>>>>>>>', created);
        if (created) {
            // res.render('registerForm', { alert: 'User data created....' });
            res.json({
                message: 'User data created!!'
            });
        }
        else {
            // res.render('registerForm', { alert: 'User data Exists....' });
            res.json({
                message: 'User data exists..........'
            });
        }

    } catch (error) {
        res.json({
            status: 'failed',
            message: 'Failed to register User'
        });
    }
}

exports.checkUserLogin = async (req, res) => {
    let data = req.body;
    const result = await userQuery.userDao.getUserByEmail(data.email);
    if (!result) {
        res.json({
            message: 'User doesnot exist!!'
        });
    }
    else {
        // console.log(result);
        // const checkPassword = await result.password === data.password;
        const checkPassword = await bcrypt.compare(data.password, result.password);
        console.log('Check password boolean', checkPassword);
        if (!checkPassword) {
            res.json({
                message: 'Invalid credentials...'
            });
        }
        else {
            const token = jwt.sign({ admin_id: result.id }, process.env.JWT_KEY);
            // console.log('Token is>>>>>>>>>>', token);
            req.session.jwt = token;
            req.session.save();
            // res.json({
            //     status:'logged In.......',
            //     message:`Welcome ${result.email}.`
            // });
            // res.render('mainPage');
            res.redirect('/home');
        }
    }
}

exports.productCategory = async () => {
    return await productQuery.ProductData.getAllProductCategory();
}
exports.dairyProducts = async () => {
    return await productQuery.ProductData.getAllDairyProduct();
}
exports.grainProducts = async () => {
    return await productQuery.ProductData.getAllGrainProduct();
}
exports.stationaryProducts = async () => {
    return await productQuery.ProductData.getAllStationaryProducts();
}
exports.meatProducts = async () => {
    return await productQuery.ProductData.getAllMeatProducts();
}

exports.getProductById = async (data, options) => {
    options = options.toLowerCase();
    switch (options) {
        case ('dairy'):
            return await productQuery.ProductData.getDairyProductById(data);
            break;
        case ('grains'):
            return await productQuery.ProductData.getGrainProductById(data);
            break;
        case ('meats'):
            return await productQuery.ProductData.getMeatProductById(data);
            break;
        case ('books'):
            return await productQuery.ProductData.getStationaryProductById(data);
            break;
        default:
            return 'product Not exist...'
            break;
    }
}

exports.getAllProducts = async (options) => {
    options = options.toLowerCase();
    switch (options) {
        case ('dairy'):
            return await productQuery.ProductData.getAllDairyProduct();
            break;
        case ('grains'):
            return await productQuery.ProductData.getAllGrainProduct();
            break;
        case ('books'):
            return await productQuery.ProductData.getAllStationaryProducts();
            break;
        case ('meats'):
            return await productQuery.ProductData.getAllMeatProducts();
            break;
        default:
            break;
    }
}