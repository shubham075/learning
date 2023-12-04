const express = require('express');
const router = express.Router();
const axios = require('axios');

const usercontroller = require('../controllers/userCtrl');
const validator = require('../middleware/validator');

router.get('/login', usercontroller.userLogin);
router.post('/login',validator.checkLoginFormData, usercontroller.postUserLogin);
router.get('/register', usercontroller.userRegister);
router.post('/register',validator.checkRegisterFormData, usercontroller.postUserRegister);

//view all catgeories
router.get('/category', usercontroller.viewCategory);

//view all products inside category
router.get('/category/:categoryID', usercontroller.viewProducts);

//view single product Data
router.get('/products/:productID', usercontroller.viewSingleProductData);

//insert into cart tbale -- axios request
router.post('/add-to-cart', usercontroller.add_to_cart_data);



module.exports = router;