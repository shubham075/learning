const express = require('express');
const router = express.Router();

const xlsx = require('xlsx');
const path = require('path');

const admincontroller = require('../controllers/adminCtrl');
// const models = require('../../db/models');
// const dao = require('../dao/dao');

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


// router.get('/', async (req, res) => {
//     let data = await models.products.findAll({
//         include: [
//             { model: models.product_data }
//         ]
//     });

//     res.json({ data: data });
// });



router.post('/upload', upload.single('productData'), admincontroller.fileUpload);




module.exports = router;
