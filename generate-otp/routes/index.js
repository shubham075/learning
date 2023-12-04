const express = require('express');
const router = express.Router();
require('dotenv').config();
const { totp, authenticator } = require('otplib');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


router.get('/', async (req, res) => {
    res.render('index');
});

router.post('/', async (req, res) => {




});

router.get('/sendOTP', async (req, res) => {
    console.log('+91' + req.query.p_number);

    const secret = authenticator.generateSecret();
    const token = authenticator.generate(secret);
    req.session.otpCode = token;
    req.session.secretCode = secret;

    if (!token) {
        res.json({
            message: 'error in token generation..'
        });
    }
    else {
        console.log('token is : ', token);

        const response = await client.messages.create({
            body: `This is you OTP : ${token}`,
            from: process.env.MY_PHONE_NUMBER,
            to: '+91' + req.query.p_number
        })
    }

    res.render('OTP_form', { alert: 'OTP send succesfully!' });
})

router.post('/verify', async (req, res) => {
    // console.log(res);
    console.log('req.body object : ', req.body);
    console.log('secret and token', req.session.otpCode, req.session.secretCode);

    const isValid = authenticator.check(req.body.otp, req.session.secretCode);
    console.log(isValid)
    if (!isValid) {
        res.render('OTP_form', { alert: 'Incorrect OTP!' });
    }
    else {
        res.json({
            message: 'OTP verified',
            data: isValid
        });
    }
})


module.exports = router;
