const express = require('express');
const router = express.Router();
const adminController = require('./admin');

router.get('/', adminController.login);
router.get('/register', adminController.register);
router.post('/register', adminController.registerAuth);


module.exports = router;
