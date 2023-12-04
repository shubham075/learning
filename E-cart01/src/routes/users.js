const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/userCtrl');
const adminCtrl = require('../controller/adminCtrl');
const userDao = require('../dao/userDao');
const formvalidator = require('../middleware/formValidator');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const app = require('../../app');
require('../middleware/gAuth')(passport);

let errorMsg = (params1) => {
    let error = [];
    for (let ele in params1) {
        // error.set(params1[ele].param, params1[ele].msg);
        error.push(params1[ele].msg);
    }
    return error;
}
const validatorArr = [
    check('name', 'Name characters should be 3+ long')
        .exists()
        .isLength({ min: 3 }),

    check('email', 'Please enter valid email')
        .exists()
        .normalizeEmail()
        .isEmail(),

    check('contact', 'please enter your contact number')
        .exists()
        .isLength({ min: 10 }),

    check('password', 'Enter your password')
        .isLength({ min: 4 }),

    check('confirmPassword', 'Password not matched')
        .exists()
        .custom((value, { req }) => value === req.body.password)
];


router.get('/login', userCtrl.login);
router.get('/register', userCtrl.register);
router.get('/home', userCtrl.homePage);

router.get('/home/profile', userCtrl.profile);
router.get('/home/settings',userCtrl.settings);
router.get('/home/address', userCtrl.address);

router.get('/logout', userCtrl.logoutPage);
router.get('/home/:category', userCtrl.Products);

router.get('/home/:category/:id', userCtrl.ProductView);
router.get('/addToCart/:category/:id', userCtrl.addToCart);
router.get('/demoCart', userCtrl.viewCart);
// router.get('/demoCart/:id', userCtrl.removeFromCart);
router.get('/home/success', userCtrl.success);
router.get('/home/cancel', userCtrl.cancel);
router.post('/demoCart/payment', userCtrl.stripePayment);

router.post('/register', formvalidator.checkValidation, userCtrl.postRegister);
router.post('/login', formvalidator.checkLoginFormData, userCtrl.postLogin);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email',] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/loginForm' }), async (req, res, next) => {
    const email = req.session.passport.user;
    const data = await userDao.userDao.getUserByEmail(email);
    let token = jwt.sign({ admin_id: data.id }, process.env.JWT_KEY);
    req.session.jwt = token;
    req.session.save();
    res.redirect('/home');
});



module.exports = router;
