const constant = require('../utils/constant');
const utility = require('../utils/utility');
const { sendEmail } = require('../utils/email');
const responseMessage = require('../utils/response_message');
const authJwt = require('../middleware/auth_check');
const stripeModule = require('../utils/stripe_gateway');



exports.send_email_with_nodemailer = async (req, res) => {

    try {
        const { email_type, emailVariables, email_subject } = req.body;
        const response = await sendEmail(email_type, emailVariables, email_subject);
        console.log('sendEmail resposne data:', response);
        res.status(200).json({ message: `Mail sent to ${emailVariables.email_ids}` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "SERVR ERROR..." });
    }
}

exports.create_stripe_payemnt_intent = async (req, res) => {
    try {
        const paymentIntentResult = await stripeModule.createPaymentIntent(1000, 'INR', 'TESTING PAYMENT ....');
        if (paymentIntentResult.success === true) {
            req.session.payment_intent_id = paymentIntentResult.paymentIntentId;
            return res.status(200).json({
                message: 'payment creation successful',
                data: paymentIntentResult
            });
        }
        else {
            return res.status(503).json({
                message: 'Error creating payment Intent...',
                data: paymentIntentResult.error
            });
        }

    } catch (error) {
        console.error('error inside controller file...:', error);
        return res.status(400).json({
            success: false,
            message: 'Error while creating intents inside controller file...'
        });
    }
}

exports.confirm_stripe_payment_intent = async (req, res) => {
    const paymentIntentId = req.session.payment_intent_id;
    //get payment method data..............
    
    if (paymentIntentId) {
        try {
            const paymentConfirmationResult = await stripeModule.confirmPayemntIntent(paymentIntentId, 'pm_card_visa');
            return res.status(200).json({
                success: paymentConfirmationResult.success,
                message: paymentConfirmationResult.message,
                error: paymentConfirmationResult.error
            });
        } catch (error) {
            console.error('Error while confiming payment....', error);
            return res.status(400).json({
                success: false,
                message: 'Error while confirming payment inside controller file....'
            });
        }
    }
    else {
        return res.status(400).json({
            message: 'No payment intent ID provided....',
            data: paymentIntentId
        });
    }
}