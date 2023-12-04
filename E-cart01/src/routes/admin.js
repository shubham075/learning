const express = require('express');
const router = express.Router();
const adminCtrl = require('../controller/adminCtrl');
const formvalidator = require('../middleware/formValidator');
const { check, validationResult } = require('express-validator');
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname + '/../../tempdata/uploads'));
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name)
    }
});
const upload = multer({ storage: storage });

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

router.get('/', adminCtrl.adminLogin);
router.get('/home', adminCtrl.adminHome);
router.get('/addProduct', adminCtrl.addProduct);
router.get('/logout', adminCtrl.adminLogout);
router.get('/viewProduct', adminCtrl.viewProducts);


router.post('/', formvalidator.checkAdminLoginData, adminCtrl.postAdminLogin);
router.post('/home', upload.single('productFile'), adminCtrl.fileupload);
router.post('/addProduct', adminCtrl.addIndividualProduct);

router.post('/viewProduct', adminCtrl.viewProductsByCategory);
router.get('/viewProduct/search/:category', adminCtrl.searchProductByName);
router.get('/edit/:category/:id', adminCtrl.editProductById);

router.post('/update/:category/:id', adminCtrl.updateProductById);
router.get('/delete/:category/:id', adminCtrl.deleteProductbyID);


module.exports = router;