const { validationResult } = require('express-validator');
const { isEmpty } = require('lodash');
const Validator = require('is_js');

let errorMsg = (params1) => {
    let error = [];
    for (let ele in params1) {
        // error.set(params1[ele].param, params1[ele].msg);
        error.push(params1[ele].msg);
    }
    return error;
}

function validator(data) {
    let errors = {};
    if (Validator.empty(data.name)) {
        errors.name = 'Name is required!';
    }
    if (Validator.empty(data.email)) {
        errors.email = 'Email is required!';
    }
    if (Validator.empty(data.contact)) {
        errors.contact = 'Contact is required!';
    }
    if (Validator.empty(data.password)) {
        errors.password = 'Password is required!';
    }
    if (Validator.empty(data.confirmPassword)) {
        errors.confirmPassword = 'Please renter your password!';
    }
    return {
        isValid: isEmpty(errors), errors
    };
}

exports.checkValidation = (req, res, next) => {
    let { isValid, errors } = validator(req.body);
    if (!isValid) {
        // console.log(isValid);
        // console.log(errors);
        res.render('registerForm2', {
            err: errors
        });
    }
    else {
        next();
    }
}

exports.checkRegisterFormData = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let alert = errors.array();
        let err = errorMsg(alert);
        // console.log(alert);
        res.render('registerForm', { alert: err });
        // res.json({ alert });
    }
    else {
        next();
    }
}

exports.checkLoginFormData = (req, res, next) => {
    let { isValid, errors } = validator(req.body);
    if (!isValid) {
        // console.log(isValid);
        // console.log(errors);
        res.render('loginForm', { err: errors });
    }
    else {
        next();
    }
}

exports.checkAdminLoginData = (req,res,next)=>{
    let { isValid, errors } = validator(req.body);
    if (!isValid) {
        // console.log(isValid);
        // console.log(errors);
        res.render('adminLogin', { err: errors });
    }
    else {
        next();
    }
}





