const express = require('express');
const router = express.Router();
const userController = require('./controller');
const auth = require('./auth_middleware');
const jwt = require('jsonwebtoken');
const { Sequelize, Op } = require('sequelize');
const SpotifyWebApi = require('spotify-web-api-node');
const admin_sql_conn = require('./adminUserModel');

const model = require('./dao');
const passport = require('passport');
require('./googleAuth')(passport);

// //User-controller(routes)............
const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
];

let access_token = '';

const SpotifyApi = new SpotifyWebApi({
    clientId: '44d4bae7077a4dd6961aa6f8fafd12fa',
    clientSecret: '83be679be8e14538852dca3ab1badf98',
    redirectUri: "http://localhost:5000/spotify/callback"
});

/**
 * This function comment is parsed by doctrine
 * @route GET /loginform
 * @group ADMIN login  
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/loginform', userController.adminLogin); //tested

/**
 * This function comment is parsed by doctrine
 * @route GET /registerform
 * @group user login  
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/registerform', userController.UserRegister); //tested


/**
 * This function comment is parsed by doctrine
 * @route GET /forget-password
 * @group ADMIN login  
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/forget-password', userController.forgetPassword);//forgetpassword


//model defination
/**
* @typedef varify_email
* @property {string} forgetEmail.data.required - user email id
*/
/**
* This function is used for varify the email and send otp to email
* @route POST /forget-password
* @group ADMIN login
* @param {varify_email.model} varify_email.body.required
* @produces application/json application/xml
* @consumes application/json application/xml
* @returns {Response} 200 - response object containing data, message and status code
* @returns {Error} default - Unexpected error
*/
/**
* @typedef Response
* @property {integer} status
* @property {string} message.required - response message
* @property {data} response data payload
*/
router.post('/forget-password', userController.checkForgetPasswordAuth);//forgetpassword


// router.post('/registerform', userController.CheckUserRegister);

//model defination
/**
 * @typedef adminLogin
 * @property {string} user.data.required - admin username
 * @property {string} lpassword.data.required - admin user password
 */
/**
 * @route POST /loginform
 * @group ADMIN login
 * @param {adminLogin.model} username.body.required
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Response} 200 - response object containing data, message and status code
 * @returns {Error} default - Unexpected error
 */

router.post('/loginform', userController.CheckAdminLogin); //tested

/**
 * This function comment is parsed by doctrine
 * @route GET /admin
 * @group ADMIN login
 * @security JWT  
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/admin', auth.isLoggedIn, userController.view);  // auth.verifyToken,

//model definition
/**
 * @typedef searchData
 * @property {string} search.data.required -search by name
 */
/**
 * This function comment is parsed by doctrine
 * @route POST /admin/search
 * @group afterLogin search
 * @security JWT  
 * @param {searchData.model} serach.body.required
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/admin/search', auth.isLoggedIn, userController.find); //tested

/**
 * @typedef user_id
 * @property {integer} id -getInfo By ID 
 */
/**
 * This function comment is parsed by doctrine
 * @route GET /admin/userInfo/:id
 * @group afterLogin view
 * @security JWT  
 * @param {user_id.model} userId.params.required
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
/**
* @typedef Response
* @property {integer} status
* @property {string} message.required - response message
* @property {data} response data payload
*/
router.get('/admin/userInfo/:id', auth.isLoggedIn, userController.viewUser) //tested

/**
 * @route GET /admin/adduser
 * @group add user form
 * @security jwt
 * @returns {object} 200 - Add user form
 * @returns {Error}  default - Unexpected error
 */
router.get('/admin/adduser', auth.isLoggedIn, userController.addUserForm); //tested

//model defination
/**
 * @typedef newUser
 * @property {string} first_name.data.required
 * @property {string} last_name.data.required
 * @property {integer} contact.data.required
 * @property {string} email.data.required
 */
/**
 * @route POST /admin/adduser
 * @group add user after adminLogin
 * @security jwt
 * @param {newUser.model} newUserData.body.required
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Response} 200 - response object containing data, message and status code
 * @returns {Error} default - Unexpected error
 */
router.post('/admin/adduser', auth.isLoggedIn, userController.create); //tested

/**
 * @route GET /admin/edituser/:id
 * @group get edit user info
 * @security jwt
 * @param {integer} id.params.required
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Response} 200 - response object containing data, message and status code
 * @returns {Error} default - Unexpected error
 */
router.get('/admin/edituser/:id', auth.isLoggedIn, userController.edit); //tested

//model definition
/**
 * @typedef editUser
 * @property {string} first_name.data.required
 * @property {string} last_name.data.required
 * @property {integer} contact.data.required
 * @property {string} email.data.required
 */
/**
 * @route POST /admin/edituser/:id
 * @group get edit user info
 * @security jwt
 * @param {integer} id.param.required
 * @param {editUser.model} editUser.body.required
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Response} 200 - response object containing data, message and status code
 * @returns {Error} default - Unexpected error
 */
router.post('/admin/edituser/:id', auth.isLoggedIn, userController.update); //tested

/**
 * @route GET /admin/deleteuser/:id
 * @group delete user by ID
 * @security jwt
 * @param {integer} id.params.required
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Response} 200 - response object containing data, message and status code
 * @returns {Error} default - Unexpected error
 */
router.get('/admin/deleteuser/:id', auth.isLoggedIn, userController.delete); //tested

// router.get('/addPassword', userController.addPasswordAfterSignup);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email',] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/loginform' }), async (req, res, next) => {
    // console.log('user email is :', email); 
    // console.log("REQ>SESSIONS>>>>>>>>>>>>>",req.session);
    const email = req.session.passport.user;
    const data = await model.userData.getAdminByEmail(email);
    let token = jwt.sign({ UserID: data.admin_id }, process.env.JWT_KEY)
    req.session.jwt = token;
    req.session.save();
    res.redirect('/admin');
});


router.get('/spotify', (req, res) => {
    res.redirect(SpotifyApi.createAuthorizeURL(scopes));
});
router.get('/spotify/callback', async (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

    if (error) {
        console.log("Error is >>>>>>>>>>>>>>>>>>>>>", error);
        res.send(`Callback Error: ${error}`);
        return;
    }
    else {
        SpotifyApi.authorizationCodeGrant(code)
            .then(async (data) => {
                // console.log('code>>>>>>>>>>>>>>>>>>>>>>>>>', code);
                access_token = data.body['access_token']; //
                const refresh_token = data.body['refresh_token'];
                const expires_in = data.body['expires_in'];

                SpotifyApi.setAccessToken(access_token);
                const me = await SpotifyApi.getMe();
                console.log(me.body);
                const [user, created] = await admin_sql_conn.adminUser.findOrCreate({
                    where: {
                        email: me.body.email
                    }, defaults: {
                        email: me.body.email,
                        userID: me.body.display_name
                    }
                });
                if (created) {
                    console.log('User created>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', user);
                    let token = jwt.sign({ UserID: user.admin_id }, process.env.JWT_KEY);
                    req.session.jwt = token;
                    req.session.save();
                    res.redirect('/admin');

                } else {
                    console.log('Existing data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', user);
                    let token = jwt.sign({ UserID: user.admin_id }, process.env.JWT_KEY);
                    req.session.jwt = token;
                    req.session.save();
                    res.redirect('/admin');
                }

                // SpotifyApi.setAccessToken(access_token);
                // SpotifyApi.setRefreshToken(refresh_token);

                //logs
                // console.log('access_token:', access_token);
                // console.log('refresh_token:', refresh_token);
                // console.log('userData>>>>>>>>>>>>>>>>>>>>>', userData);

                console.log(`Sucessfully retreived access token. Expires in ${expires_in} s.`);
            });

        // res.redirect('/admin');
    }
});



module.exports = router;
