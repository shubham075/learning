const express = require('express');
const mysql = require('mysql2');
const { isEmpty } = require('lodash');
const Validator = require('is_js');
const bcrypt = require('bcryptjs');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'curd'
});

function validator(data) {
    let errors = {};
    if (Validator.empty(data.name)) {
        errors.name = 'FirstName is required!';
    }
    if (Validator.empty(data.email)) {
        errors.email = 'Email is required!';
    }
    if (Validator.empty(data.contact)) {
        errors.contact = 'Contact is required!';
    }
    if (Validator.empty(data.password)) {
        errors.password = 'password is required!';
    }
    if (data.password !== data.passwordConfirm) {
        errors.passwordConfirm = 'Passwords not matched'
    }
    return {
        isValid: isEmpty(errors), errors
    };
}


exports.login = (req, res) => {
    res.render('loginForm');
}
exports.register = (req, res) => {
    res.render('register');
}

exports.registerAuth = (req, res) => {

    let { isValid, errors } = validator(req.body);
    if (!isValid) {
        res.render('register', {
            err: errors,
            user: {
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                password: req.body.password,
                passwordConfirm: req.body.passwordConfirm
            }
        });
    }
    else {
        const { name, email, contact, password, passwordConfirm } = req.body;
        let hashedPassword = bcrypt.hash(password, 10);
        pool.getConnection((error, connection) => {
            if (error) throw error;
            connection.query(`INSERT INTO users SET name = ?, email = ?, contact = ?, password = ? `, [name, email, contact, password], (error, results) => {
                connection.release();
                if (!error) {
                    res.render('register',{alert: "User registered!"});
                }
                else{
                    console.log(error);
                }
            });
        });
    }

}



