const config = require('../../db/config/config_details');
const { authenticator } = require('otplib');

const account_sid = config.twilio_account_sid;
const auth_token = config.twilio_auth_token;

const client = require('twilio')(account_sid, auth_token);

const otp_module = {

    generate_send_otp: async (req, res) => {
        console.log('inside the otp module...', req.body);
        const secret = authenticator.generateSecret();
        const token = authenticator.generate(secret);
        //saving otp and secret on server using express-session..
        req.session.otp_code = token;
        req.session.secret_code = secret;

        try {
            const response = await client.messages.create({
                body: `This is your OTP, just for testing module, ${token}`,
                from: config.twilio_phone_number,
                to: req.body.phone_number
            });

            return res.status(200).json({ message: 'OTP send successfuly...' });

        } catch (error) {
            console.error('Error while sending OTP via Twilio', error);
            return res.status(503).json({ message: 'Error while sending OTP....' })
        }

    },

    verify_otp: async (req, res) => {
        console.log('inside verify otp module...', req.session);
        const { input_otp } = req.body;
        const is_valid = authenticator.check(input_otp, req.session.secret_code);
        console.log(is_valid);

        if (!is_valid) {
            return res.status(401).json({ message: 'Incorrect otp provided.....' });
        }
        else {
            return res.status(202).json({ message: 'OTP verified successfuly...' });
        }
    },

}




module.exports = { otp_module }