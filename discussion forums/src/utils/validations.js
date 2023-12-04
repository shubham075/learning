const { body, validationResult } = require('express-validator');
const { isEmpty, isEqual } = require('lodash');
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
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (Validator.empty(data.email)) {
        errors.email = 'Email is required!';
    }
    if (Validator.empty(data.name)) {
        errors.name = 'name is required!';
    }
    if (Validator.empty(data.username)) {
        errors.username = 'username is required!';
    }
    if (!regex.test(data.email)) {
        errors.email = 'That was not the valid email ID'
    }
    if (Validator.empty(data.password)) {
        errors.password = 'password is required!';
    }
    if (Validator.empty(data.r_password)) {
        errors.r_password = 'password is required!';
    }
    return {
        isValid: isEmpty(errors),
        errors
    };
}

exports.login_data_validation = async (req, res, next) => {
    const { isValid, errors } = validator(req.body);
    if (!isValid) {
        return res.render('login', { err: errors });
    }
    else {
        next();
    }
}

exports.register_data_validation = async (req, res, next) => {
    const { isValid, errors } = validator(req.body);
    if (!isValid) {
        return res.render('register', { err: errors });
    }
    else {
        next();
    }
}