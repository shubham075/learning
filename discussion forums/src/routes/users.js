const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const validator = require('../utils/validations');
const { verifyToken } = require('../middleware/auth');


router.get('/login', userController.loginPage);

router.get('/register', userController.registerPage);
router.get('/home', verifyToken, userController.home);
router.get('/profile', verifyToken, userController.user_profile);
router.get('/bookmark', userController.user_bookmark);

router.post('/login', validator.login_data_validation, userController.post_login);
router.post('/register', validator.register_data_validation, userController.post_register);
router.get('/logout', userController.logout);

router.post('/empData/save/:id', verifyToken, userController.save_employment_credentials);
router.post('/eduData/save/:id', verifyToken, userController.save_education_credentials);
router.post('/locationData/save/:id', verifyToken, userController.save_location_credentials);

// category wise data feed
router.get('/category/:id', verifyToken, userController.category_wise_data_feed);

//get all categories
router.get('/allCategories', userController.getAllCategories);
router.post('/profile/questions/:id', userController.post_Questions);

//questionupvote api
router.post('/question/:id/upvote', verifyToken, userController.question_upvote);
router.post('/question/:id/downvote', verifyToken, userController.question_downvote);
//answer upvote api
router.post('/answer/:id/upvote', verifyToken, userController.answer_upvote);
router.post('/answer/:id/downvote', verifyToken, userController.answer_downvote);
//get all likes and dislike on questions;
router.get('/actions', verifyToken, userController.getAllLikesAndDislikes);

router.post('/question/answer/:id', verifyToken, userController.post_answers);

router.get('/testing', userController.query_testing);

module.exports = router;
