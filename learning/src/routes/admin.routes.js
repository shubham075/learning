//PHYSICIAN SUB-ROUTING ROUTES
const router = require('express').Router();
const validator = require('../utils/validator');
const admin = require('../controllers/admin.ctrl');

router.post('/node-mailer', admin.send_email_with_nodemailer);


//stripe payment routes
router.get('/createPayment', admin.create_stripe_payemnt_intent);
router.post('/confirmPayment', admin.confirm_stripe_payment_intent);

module.exports = router;