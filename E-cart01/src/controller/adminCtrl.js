const express = require('express');
const adminService = require('../services/adminServices');
// const productDao = require('../dao/productDao');
// const xlsx = require('xlsx');
// const path = require('path');


exports.adminLogin = (req, res) => {
    res.render('adminLogin');
}
exports.postAdminLogin = async (req, res) => {
    await adminService.checkAdminLogin(req, res);
}

exports.adminHome = async (req, res) => {
    res.render('adminHome');
}
exports.addProduct = (req, res) => {
    res.render('addProduct');
}

exports.adminLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/admin');
}

exports.fileupload = async (req, res) => {
    try {
        let alert = await adminService.uploadProductData(req);
        res.render('adminHome', { alert });
    } catch (error) {
        console.error(error);
    }
}

exports.addIndividualProduct = async (req, res) => {
    let data = req.body;
    await adminService.addIndividualProductData(data);
    return res.render('addProduct', { alert: 'New product data inserted...' });

}

exports.viewProducts = async (req, res) => {
    return res.render('viewProduct');
}
exports.viewProductsByCategory = async (req, res) => {
    let category = req.body.productCategory;
    const data = await adminService.viewAllProducts(category);
    if (category == 'none') {
        return res.render('viewProduct', { alert: data });
    }
    else {
        return res.render('viewProduct', { data, category });
    }
}

exports.searchProductByName = async (req, res) => {
    let product = req.query.search;
    let category = req.params.category;
    const data = await adminService.viewSearchProducts(product, category);
    if (!product) {
        return res.render('viewProduct', { data, alert: 'invalid search' });
    }
    else {
        return res.render('viewProduct', { data, category });
    }
}

exports.editProductById = async (req, res) => {
    // return res.render('editProduct');
    console.log(req.params);
    let { category, id } = req.params;
    let data = await adminService.getEditProductByID(category, id);
    res.render('editProduct', { data });
}

exports.updateProductById = async (req, res) => {
    let { category, id } = req.params;
    let payload = req.body;
    // console.log(req.params);
    let data = await adminService.postEditProductByID(category, payload, id);
    console.log(data);
    return res.render('viewProduct', { alert: `${payload.productName} product data updated` });
}

exports.deleteProductbyID = async (req, res) => {
    let { category, id } = req.params;
    let data = await adminService.deleteProductByCategory(category, id);
    console.log('delete data output>>>>', data);
    return res.redirect('/admin/viewProduct');
}