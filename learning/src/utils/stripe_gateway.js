
const config = require('../../db/config/config_details');
const stripe = require('stripe')(config.stripe_sceret_key);

module.exports = {

    createPaymentIntent: async (amount, currency, description) => {

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency,
                description,
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects: 'never',
                },
            });
            //here client_secret is used on client side to confirm the payment...
            return { success: true, clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id }

        } catch (error) {
            console.error('Error while creating payment Intent..:', error);
            return { success: false, error: 'Error creating payment Intent' }
        }

    },
    //inside payment intent object we have ID of every intent created, we use that ID to confirm the payment.....
    confirmPayemntIntent: async (paymentIntentId, paymentMethodId) => {

        try {
            const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId,
                { payment_method: paymentMethodId }
            );
            console.log('inside stripe module payment intent:...', paymentIntent);

            if (paymentIntent.status === 'succeeded') {
                return { success: true, message: 'Payment Successful....' }
            }
            else if (paymentIntent.status === 'requires_action') {
                // Additional action required, 3D Secure authentication
                //will implement later...
            }
            else {
                return { success: false, message: 'payment not succeeded inside stripe module....' }
            }
        } catch (error) {
            console.error('Error confirming payment.....#', error.message);
            return { success: false, message: 'Error confirming payment....', error }
        }
    }

}
