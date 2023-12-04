const { validationResult } = require('express-validator');
const { isEmpty } = require('lodash');
const Validator = require('is_js');


function validator(data) {
    let errors = {};
    if (Validator.empty(data.first_name)) {
        errors.first_name = 'First Name is required!';
    }
    if (Validator.empty(data.last_name)) {
        errors.last_name = 'Last Name is required!';
    }
    if (Validator.empty(data.email)) {
        errors.email = 'Email is required!';
    }
    if (Validator.empty(data.phone)) {
        errors.phone = 'Phone is required!';
    }
    if (Validator.empty(data.password)) {
        errors.password = 'Password is required!';
    }
    if (Validator.empty(data.confirmPassword)) {
        errors.confirmPassword = 'Please renter your password!';
    }
    if (Validator.empty(data.address)) {
        errors.address = 'Please enter your address!';
    }
    if (Validator.empty(data.city)) {
        errors.city = 'Please enter your city!';
    }
    if (Validator.empty(data.state)) {
        errors.state = 'Please enter your state!';
    }
    if (Validator.empty(data.zip)) {
        errors.zip = 'Please enter your zip!';
    }
    return {
        isValid: isEmpty(errors), errors
    };
}

exports.checkLoginFormData = (req, res, next) => {
    let { isValid, errors } = validator(req.body);
    if (!isValid) {
        // console.log(isValid);
        // console.log(errors);
        res.render('userLogin', { err: errors });
    }
    else {
        next();
    }
}
exports.checkRegisterFormData = (req, res, next) => {
    let { isValid, errors } = validator(req.body);
    if (!isValid) {
        // console.log(isValid);
        // console.log(errors);
        res.render('userRegister', { err: errors });
    }
    else {
        next();
    }
}