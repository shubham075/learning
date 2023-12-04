const express = require('express');
const router = express.Router();
const userServices = require('../services/userServices');
// const productQuery = require('../dao/productDao');
const stripe = require("stripe")("sk_test_51MSDFJSG8DPyqtCHddm7kSv2RmtHnXTxokrDyiTIK6VbaXHM0rIGxGysjO92yJsLXZRNhvAni7gHSw4CAP31Sda7004IX0bfMF");



exports.login = (req, res, next) => {
    return res.render('loginForm');
}
exports.register = (req, res, next) => {
    return res.render('registerForm2');
}
exports.profile = (req, res) => {
    return res.render('userProfile');
}
exports.settings = (req, res) => {
    return res.render('userSettings');
}
exports.address = (req, res) => {
    return res.render('userAddress');
}
exports.homePage = async (req, res) => {
    const data = await userServices.productCategory();
    return res.render('mainPage', { data });
}
exports.Products = async (req, res) => {
    let options = req.params.category;
    const data = await userServices.getAllProducts(options);
    data.forEach((element) => {
        let finalPrice = element.productPrice - (element.productPrice * (element.discountValue / 100));
        finalPrice = parseInt(finalPrice);
        element.finalPrice = finalPrice;
    });
    return res.render('Products', { data });
}

exports.ProductView = async (req, res) => {
    // console.log('Dairy product id is:', req.params.id);
    let id = req.params.id;
    let options = req.params.category;
    let data = await userServices.getProductById(id, options);
    // console.log('product data is >>>>>>>>>>>', data);
    return res.render('openProduct', { data });
}

exports.postRegister = async (req, res) => {
    let data = req.body;
    console.log(data);
    if (data.password === data.confirmPassword) {
        await userServices.createNewUser(data, res);
    }
    else {
        // res.render('registerForm', {alert: 'Password do not match'});
        res.json({
            message: 'Password do not matched>>>'
        });
    }
}

exports.postLogin = async (req, res) => {
    await userServices.checkUserLogin(req, res);
}

exports.logoutPage = async (req, res) => {
    req.session.destroy();
    res.render('loginForm', { alert: 'Succesfully logout....' });
}

exports.addToCart = async (req, res) => {
    let id = req.params.id;
    let options = req.params.category;
    let datas = await userServices.getProductById(id, options);
    let data = await userServices.getAllProducts(options);
    req.session.cartData = req.session.cartData || [];
    req.session.cartData.push(datas[0]);
    // req.session.save();
    res.redirect(`/home/${options}`);
}

exports.viewCart = (req, res) => {
    // res.json({
    //     message: 'cart data',
    //     data: req.session.cartData
    // });
    let amount = 0;
    let data = req.session.cartData;
    if (!data) {
        res.render('cart', { nodata: 'Empty Cart' });
    }
    else {
        data.forEach((element) => {
            let finalPrice = element.productPrice - (element.productPrice * (element.discountValue / 100));
            finalPrice = parseInt(finalPrice);
            amount += finalPrice;
            element.finalPrice = finalPrice;
        });
        req.session.cartData = data;
        // console.log(req.session.cartData);
        res.render('cart', { data, amount });
    }

}

exports.removeFromCart = (req, res) => {
    // let id = req.params.id;
    // req.session.cartData.splice(`${id}`, 1);
    // let data = req.session.cartData;

    // res.render('cart', { data });
}

exports.stripePayment = async (req, res) => {
    let { product } = req.body
    let i = 0;
    const Products = req.session.cartData;
    Products.forEach((element) => {
        element.quantity = req.body.quantity[i];
        element.checkoutPrice = element.finalPrice * element.quantity
        i++;
    });
    console.log('cart data is @@@@@@@', product);
    console.log('session data is ######', Products);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: product.amount * 100,
                },
                quantity: product.quantity,
            },
        ],
        mode: "payment",
        success_url: `http://localhost:5000/home/success`,
        cancel_url: `http://localhost:5000/home/cancel`,
    });
    res.json({ id: session.id });

    // res.json({
    //     status:'ok',
    //     message:product
    // });
}

exports.success = (req, res) => {
    res.render('success');
}
exports.cancel = (req, res) => {
    res.render('cancel');
}
