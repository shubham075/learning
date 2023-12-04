const express = require('express');
const router = express.Router();
const { isEmpty } = require('lodash');
const Validator = require('is_js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const nodemailer = require('nodemailer');
require('dotenv').config();
const model = require('../dao/dao');
const saltRounds = 10;


async function main(mailId) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    auth: {
      user: 'prakashshubham075@gmail.com',
      pass: 'aevspoyymycamsxo'
    }
  });
  let info = await transporter.sendMail({
    from: '<prakashshubham075@gmail.com>',
    to: mailId,
    subject: 'sending dummy email to test nodemailer',
    html: '<a herf ="http://localhost:5000/loginform">Back to login page</a>'
  });
  // console.log("message sent!!..... ", info.messageId);
}

function validator(data) {
  let errors = {};
  if (Validator.empty(data.first_name)) {
    errors.first_name = 'FirstName is required!';
  }
  if (Validator.empty(data.last_name)) {
    errors.last_name = 'LastName is required!';
  }
  if (Validator.empty(data.email)) {
    errors.email = 'Email is required!';
  }
  if (Validator.empty(data.contact)) {
    errors.contact = 'Contact is required!';
  }
  return {
    isValid: isEmpty(errors), errors
  };
}
//#################################################################################



exports.forgetPassword = async (req, res, next) => {
  res.render('forgetPass')
}

exports.checkForgetPasswordAuth = async (req, res, next) => {
  const { forgetEmail } = req.body
  console.log(forgetEmail);
  const adminData = await model.userData.getAdminByEmail(forgetEmail);
  // console.log(adminData);
  if (adminData) {
    let data = main(forgetEmail).catch(console.error);
    res.status(200).json({
      status: 'sent',
      message: `Email has been send to ${forgetEmail}........Pls check your mail!!`
    });
  }
  else {
    res.status(400).json({
      status: 'failed',
      message: `${forgetEmail} not registered in admin data`
    })
  }
}

exports.view = async (req, res, next) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',req.headers);
  const data = await model.userData.getAllUsersData();
  if (data) {
    res.status(200);
    res.render('index', { data });
  }
  else {
    res.status(400).json({
      status: 'failed',
      message: 'Data not fetched!'
    });
  }
}

exports.adminLogin = (req, res) => {
  res.render('login');
}

exports.UserRegister = (req, res) => {
  res.render('register');
}

//under construction.........................................
exports.CheckUserRegister = async (req, res, next) => {
  const { name, email, contact, address, password, passwordConfirm } = req.body;
  if (password === passwordConfirm) {
    //check for existing email account
    //hashing password
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    pool.getConnection((error, connection) => {
      if (error) throw error;
      connection.query('INSERT INTO userdata SET name = ?, email = ?, contact = ?, address = ?, password = ?', [name, email, contact, address, hashPassword], (error, results) => {
        connection.release();
        if (!error) {
          res.render('register', { alert: "User sucessfully register!" });
        }
        else {
          console.log(error);
        }
      });
    });
  }
  else {
    res.render('register', { alert: "Passwords does not matched!" });
  }

}

exports.CheckAdminLogin = async (req, res, next) => {
  const { user, lpassword } = req.body;
  const results = await model.userData.getAdminByUserId(user);
  // console.log(results);
  if (results) {
    const verifyPassword = await results.password == lpassword;
    if (verifyPassword) {
      const token = jwt.sign({ UserID: results.admin_id }, process.env.JWT_KEY);
      console.log(token);
      req.session.jwt = token;
      req.session.save();

      // res.header('Authorization', 'Bearer '+ token);

      const data = await model.userData.getAllUsersData();
      res.render('index', { data, alert: 'Succesfully login!' });
    }
    else {
      res.status(401);
      res.render('login', { alert: "Invalid credentials!" });
    }
  }
  else {
    res.status(401);
    res.render('login', { alert: "Invalid credentials!" });
  }
}

exports.viewUser = async (req, res, next) => {
  const id = req.params.id;
  const data = await model.userData.getUserById(id);
  if (data) {
    res.render('aboutPage', { data });
  }
  else {
    res.status(400).json({
      status: 'failed',
      message: 'Data not fetched!'
    });
  }
}

exports.find = async (req, res, next) => {
  let search = req.body.search;
  console.log(req.query);
  const data = await model.userData.searchByNames(search);
  if (data) {
    res.render('index', { data });
  }
  else {
    res.status(400).json({
      status: 'failed',
      message: 'Data not fetched!'
    });
  }
}

exports.addUserForm = async (req, res, next) => {
  res.render('addUser');
}

exports.create = async (req, res, next) => {

  let { isValid, errors } = validator(req.body);
  if (!isValid) {
    res.status(206); //partial content
    res.render('addUser', {
      err: errors,
      user: {
        firstname: req.body.first_name,
        lastname: req.body.last_name,
        email: req.body.email,
        contact: req.body.contact
      }
    });
  }
  else {
    // const { first_name, last_name, contact, email } = req.body;
    await model.userData.addSingleUser(req.body);
    req.flash('success', 'User added successfully!');
    res.redirect('addUser');
  }
}

exports.edit = async (req, res, next) => {
  let id = req.params.id;
  const data = await model.userData.getUserById(id);
  if (data) {
    res.render('edit-user', { data });
  }
  else {
    res.status(400).json({
      status: 'failed',
      message: 'Data not fetched!'
    });
  }
}

exports.update = async (req, res, next) => {
  const { first_name, last_name, contact, email } = req.body;
  let id = req.params.id;
  if (first_name == "" || last_name == "" || contact == "" || email == "") {
    const data = await model.userData.getUserById(id);
    res.status(206); //partial content
    res.render('edit-user', { data, alert: "Please fill all the requested information" });
  }
  else {
    const status = await model.userData.updateSingleUserById(req.body, id);
    res.render('edit-user', { alert: `${first_name} ${last_name} data updated` });
  }
}

exports.delete = async (req, res, next) => {
  let id = req.params.id;
  await model.userData.deleteUserById(id);
  res.redirect("/admin");
}

//add password page setup after google signup.........................................
// exports.addPasswordAfterSignup = (req, res, next) => {
//   res.render('addPassword');
// }

// exports.storePasswordAfterSignup = async (req, res, next) => {
//   const { password, confirmPassword } = req.body;
//   const email = req.session.passport.user;
//   if (password == confirmPassword) {
//     await model.userData.updateAdminUserByEmail(email, password);
//     const userData = await model.userData.getAdminByEmail(email);
//     const token = jwt.sign({ UserID: userData.admin_id }, process.env.JWT_KEY);
//     // console.log('ttttttooooooookkkkkkkkkeeeeeeennnnnnnnn..........', token);
//     req.session.jwt = token;
//     req.session.save();

//     const data = await model.userData.getAllUsersData();
//     res.render('index', { data, alert: 'Succesfully login!' });
//   }
//   else {
//     res.status(401);
//     res.render('addPassword', { alert: "Passwords are not same" });
//   }
// }
