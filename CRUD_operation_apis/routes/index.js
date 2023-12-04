const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

//CRUD API's
router.get('/users', userController.view);
router.get('/users/:id', userController.viewById);
router.post('/users/update/:id', userController.update);
router.post('/users/create/', userController.create);
router.post('/users/delete/:id', userController.delete);
















module.exports = router;
