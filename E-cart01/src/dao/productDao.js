const mysql = require('mysql');
const { Sequelize, Op, where } = require('sequelize');
const product = require('../../db/models/productCategoryModel');
const dairy = require('../../db/models/dairyModel');
const grains = require('../../db/models/grainModel');
const stationary = require('../../db/models/stationaryMode');
const meat = require('../../db/models/meatModel');

const ProductData = {
    getAllProductCategory: async () => {
        return product.productCategory.findAll();
    },
    getAllDairyProduct: async () => {
        return dairy.DairyProduct.findAll();
    },
    getAllGrainProduct: async () => {
        return grains.GrainProduct.findAll();
    },
    getAllStationaryProducts: async () => {
        return stationary.statinoaryProduct.findAll();
    },
    getAllMeatProducts: async () => {
        return meat.MeatProduct.findAll();
    },
    insertIntoDairy: async (data) => {
        return dairy.DairyProduct.bulkCreate(data);
    },
    insertIntoGrain: async (data) => {
        return grains.GrainProduct.bulkCreate(data);
    },
    insertIntoStationary: async (data) => {
        return stationary.statinoaryProduct.bulkCreate(data);
    },
    insertIntoMeat: async (data) => {
        return meat.MeatProduct.bulkCreate(data);
    },
    searchInDairy: async (data) => {
        return dairy.DairyProduct.findAll({
            where: {
                productName:{
                    [Op.substring]: data
                }
            }
        });
    },
    searchInGrains: async (data) => {
        return grains.GrainProduct.findAll({
            where: {
                productName:{
                    [Op.substring]: data
                }
            }
        })
    },
    searchInStationary: async (data) => {
        return stationary.statinoaryProduct.findAll({
            where: {
                productName:{
                    [Op.substring]: data
                }
            }
        })
    },
    searchInMeats: async (data) => {
        return meat.MeatProduct.findAll({
            where: {
                productName:{
                    [Op.substring]: data
                }
            }
        })
    },
    deleteDairyProduct: async (data) => {
        return dairy.DairyProduct.destroy({
            where: {
                id: data
            }
        });
    },
    deleteGrainProduct: async (data) => {
        return grains.GrainProduct.destroy({
            where: {
                id: data
            }
        });
    },
    deleteMeatProduct: async (data) => {
        return meat.MeatProduct.destroy({
            where: {
                id: data
            }
        });
    },
    deleteStationaryProduct: async (data) => {
        return stationary.statinoaryProduct.destroy({
            where: {
                id: data
            }
        });
    },
    getDairyProductById: async (data) => {
        return dairy.DairyProduct.findAll({
            where: {
                id: data
            }
        });
    },
    getGrainProductById: async (data) => {
        return grains.GrainProduct.findAll({
            where: {
                id: data
            }
        });
    },
    getStationaryProductById: async (data) => {
        return stationary.statinoaryProduct.findAll({
            where: {
                id: data
            }
        });
    },
    getMeatProductById: async (data) => {
        return meat.MeatProduct.findAll({
            where: {
                id: data
            }
        });
    },
    updateDairyProductById: async (data, id) => {
        return dairy.DairyProduct.update({
            productName: data.productName,
            productDescription: data.productDescription,
            productImage: data.productImage,
            discountValue: data.discountValue,
            productPrice: data.productPrice,
            productSize: data.productQuantity,
            stockValue: data.stockValue,
            isAvaliable: data.inlineRadioOptions
        }, {
            where: {
                id: id
            }
        });
    },
    updateGrainProductById: async (data, id) => {
        return grains.GrainProduct.update({
            productName: data.productName,
            productDescription: data.productDescription,
            productImage: data.productImage,
            discountValue: data.discountValue,
            productPrice: data.productPrice,
            productSize: data.productQuantity,
            stockValue: data.stockValue,
            isAvaliable: data.inlineRadioOptions
        }, {
            where: {
                id: id
            }
        });
    },
    updateStationaryProductById: async (data, id) => {
        return stationary.statinoaryProduct.update({
            productName: data.productName,
            productDescription: data.productDescription,
            productImage: data.productImage,
            discountValue: data.discountValue,
            productPrice: data.productPrice,
            productSize: data.productQuantity,
            stockValue: data.stockValue,
            isAvaliable: data.inlineRadioOptions
        }, {
            where: {
                id: id
            }
        });
    },
    updateMeatProductById: async (data, id) => {
        return meat.MeatProduct.update({
            productName: data.productName,
            productDescription: data.productDescription,
            productImage: data.productImage,
            discountValue: data.discountValue,
            productPrice: data.productPrice,
            productSize: data.productQuantity,
            stockValue: data.stockValue,
            isAvaliable: data.inlineRadioOptions
        }, {
            where: {
                id: id
            }
        });
    },
    addIntoDairy: async(data)=>{
        return dairy.DairyProduct.create({
            productName: data.productName,
            productDescription: data.productDescription,
            productImage: data.productImage,
            discountValue: data.discountValue,
            productPrice: data.productPrice,
            productSize: data.productQuantity,
            stockValue: data.stockValue
        });
    },
    addIntoStationary: async(data)=>{
        return stationary.statinoaryProduct.create({
            productName: data.productName,
            productDescription: data.productDescription,
            productImage: data.productImage,
            discountValue: data.discountValue,
            productPrice: data.productPrice,
            productSize: data.productQuantity,
            stockValue: data.stockValue
        });
    },
    addIntoGrains: async (data)=>{
        return grains.GrainProduct.create({
            productName: data.productName,
            productDescription: data.productDescription,
            productImage: data.productImage,
            discountValue: data.discountValue,
            productPrice: data.productPrice,
            productSize: data.productQuantity,
            stockValue: data.stockValue
        });
    },
    addIntoMeats: async(data)=>{
        return meat.MeatProduct.create({
            productName: data.productName,
            productDescription: data.productDescription,
            productImage: data.productImage,
            discountValue: data.discountValue,
            productPrice: data.productPrice,
            productSize: data.productQuantity,
            stockValue: data.stockValue
        });
    }

}

module.exports = { ProductData }