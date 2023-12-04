const express = require('express');
const adminQuery = require('../dao/adminDao');
const productDao = require('../dao/productDao');


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const xlsx = require('xlsx');
const path = require('path');
require('dotenv').config();



exports.checkAdminLogin = async (req, res) => {
    let data = req.body;
    const result = await adminQuery.adminDao.getAdminByEmail(data);
    if (!result) {
        res.json({
            message: 'Admin doesnot exist!!'
        });
    }
    else {
        // const checkPassword = await bcrypt.compare(data.password, result.password);
        // console.log('Check password boolean', checkPassword);
        if (!(data.password === result.password)) {
            res.json({
                message: 'Invalid credentials...'
            });
        }
        else {
            const token = jwt.sign({ admin_id: result.admin_id }, process.env.JWT_KEY);
            console.log('Token is>>>>>>>>>>', token);
            req.session.jwt = token;
            req.session.save();
            // res.json({
            //     status:'logged In.......',
            //     message:`Welcome ${result.email}.`
            // });
            // res.render('adminHome');
            res.redirect('/admin/home');
        }
    }
}

exports.uploadProductData = async (req) => {
    try {
        console.log(req.body.inlineRadioOptions);
        const fileName = req.file;
        if (!fileName) {
            return 'You have not upload any file yet!';
        }
        else {
            let [dairy, grain, stationary, unknown, meat] = Array.from({ length: 5 }, () => []);
            let count = 0;
            const filePath = `/../../tempdata/uploads/${fileName.filename}`;
            if (fileName.originalname.split(".")[1] == 'xlsx') {
                let dataSheet = xlsx.readFile(path.join(__dirname + filePath));
                let sheet = dataSheet.Sheets[dataSheet.SheetNames[0]];
                let jsonData = xlsx.utils.sheet_to_json(sheet);
                // console.log('json DATA is @@@@@@@@@@@@@@@@@@@@@@@@@@@@',jsonData);
                for (let ele in jsonData) {
                    let category = jsonData[ele].productCategory;
                    category = category.toLowerCase();
                    switch (category) {
                        case ('dairy'):
                            dairy.push(jsonData[ele]);
                            break;
                        case ('grains'):
                            grain.push(jsonData[ele]);
                            break;
                        case ('books'):
                            stationary.push(jsonData[ele]);
                            break;
                        case ('meats'):
                            meat.push(jsonData[ele]);
                            break;
                        default:
                            unknown.push(jsonData[ele]);
                            count += 1;
                            break;
                    }
                }
                // await productDao.ProductData.insertIntoDairy(dairy);
                // await productDao.ProductData.insertIntoGrain(grain);
                // await productDao.ProductData.insertIntoStationary(stationary);
                // await productDao.ProductData.insertIntoMeat(meat);
                console.log('Dairy products', dairy);
                console.log('grain product', grain);
                console.log('stationary product', stationary);
                console.log(`unknown input data with count of ${count}`, unknown);
                console.log('Meat Products', meat);
                return `File uploaded sucessfully....`;
            }
            else {
                return 'invalid file format';
            }
        }

    } catch (error) {
        console.error(error);
    }
}

exports.addIndividualProductData = async (data) => {
    let options = data.category;
    options = options.toLowerCase();
    switch (options) {
        case ('dairy'):
            return await productDao.ProductData.addIntoDairy(data);
            break;
        case ('grains'):
            return await productDao.ProductData.addIntoGrains(data);
            break;
        case ('books'):
            return await productDao.ProductData.addIntoStationary(data);
            break;
        case ('meats'):
            return await productDao.ProductData.addIntoMeats(data);
            break;
        default:
            return 'No data inserted. Pls try again';
            break;
    }
}

exports.viewAllProducts = async (options) => {
    options = options.toLowerCase();
    switch (options) {
        case ('dairy'):
            return await productDao.ProductData.getAllDairyProduct();
            break;
        case ('grains'):
            return await productDao.ProductData.getAllGrainProduct();
            break;
        case ('books'):
            return await productDao.ProductData.getAllStationaryProducts();
            break;
        case ('meats'):
            return await productDao.ProductData.getAllMeatProducts();
            break;
        default:
            return 'Please choose product';
            break;
    }
}

exports.viewSearchProducts = async (para1, para2) => {
    para2 = para2.toLowerCase();
    switch (para2) {
        case ('dairy'):
            return await productDao.ProductData.searchInDairy(para1);
            break;
        case ('grains'):
            return await productDao.ProductData.searchInGrains(para1);
            break;
        case ('books'):
            return await productDao.ProductData.searchInStationary(para1);
            break;
        case ('meats'):
            return await productDao.ProductData.searchInMeats(para1);
            break;
        default:
            return 'Empty search field....'
            break;
    }
}

exports.getEditProductByID = async (category, id) => {
    category = category.toLowerCase();
    switch (category) {
        case ('dairy'):
            return await productDao.ProductData.getDairyProductById(id)
            break;
        case ('grains'):
            return await productDao.ProductData.getGrainProductById(id);
            break;
        case ('books'):
            return await productDao.ProductData.getStationaryProductById(id);
            break;
        case ('meats'):
            return await productDao.ProductData.getMeatProductById(id);
            break;
        default:
            break;
    }
}

exports.postEditProductByID = async (category, values, id) => {
    category = category.toLowerCase();
    switch (category) {
        case ('dairy'):
            return await productDao.ProductData.updateDairyProductById(values, id);
            break;
        case ('grains'):
            return await productDao.ProductData.updateGrainProductById(values, id);
            break;
        case ('books'):
            return await productDao.ProductData.updateStationaryProductById(values, id);
            break;
        case ('meats'):
            return await productDao.ProductData.updateMeatProductById(values, id);
            break;
        default:
            break;
    }
}

exports.deleteProductByCategory = async (category, id) => {
    category = category.toLowerCase();
    switch (category) {
        case ('dairy'):
            return await productDao.ProductData.deleteDairyProduct(id);
            break;
        case ('grains'):
            return await productDao.ProductData.deleteGrainProduct(id);
            break;
        case ('books'):
            return await productDao.ProductData.deleteStationaryProduct(id);
            break;
        case ('meats'):
            return await productDao.ProductData.deleteMeatProduct(id);
            break;
        default:
            break;
    }
}