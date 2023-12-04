const express = require('express');
const router = express.Router();

const xlsx = require('xlsx');
const path = require('path');
// const models = require('../../db/models');
const dao = require('../dao/dao');


exports.fileUpload = async (req, res) => {

    if (req.file.originalname.split('.')[1] == 'xlsx') {

        let fileData = xlsx.readFile(req.file.path);
        let data = fileData.Sheets[fileData.SheetNames[0]];
        let jsonData = xlsx.utils.sheet_to_json(data);      //an array of object
        let no_category_data = [];

        for (let i = 0; i < jsonData.length; i++) {
            let obj = jsonData[i];      //getting an object form an array
            if ((obj.hasOwnProperty('name')) && (obj.hasOwnProperty('description')) && (obj.hasOwnProperty('image')) && (obj.hasOwnProperty('price')) && (obj.hasOwnProperty('stock')) && (obj.hasOwnProperty('category'))) {

                let category_name = obj.category.toLowerCase();
                let category_result = await dao.getCategoryID(category_name);
                let product_name = await dao.searchForProductName(obj);     //findOne() return object

                if (!product_name) {
                    console.log('product name does not exist');
                    if (!category_result) {
                        console.log('category not present in database')
                        no_category_data.push(obj);
                        console.log('product name avaliable without category and here is data :', no_category_data);
                    }
                    else {
                        let products_results = await dao.insertIntoProduct(obj, category_result.id);
                        let products_data_results = await dao.insertIntoProduct_data(obj, products_results.id);
                        console.log('insert into products and product_data table');
                    }
                }
                else {
                    //if name of product exist in database
                    //checking for avaliable sizes
                    console.log('Product name exists', product_name.id);
                    let searched_size = await dao.searchForProduct_sizeByProductID(obj.size, product_name.id);
                    if (searched_size.length > 0 ) {
                        console.log('product name exists with the given size ==> leaving', searched_size);
                    }
                    else {
                        console.log('size not found ==> inserting data');
                        let products_data_results = await dao.insertIntoProduct_data(obj, product_name.id);
                        console.log('insert into products table');
                    }
                }
            }
            else {
                console.log('property doesnot exist ==> check your xlsx file');
            }
        }
        res.json({ message: 'file upload successfully!!' });
    }
    else {
        res.json({ message: 'incorrect file format' });
    }
}