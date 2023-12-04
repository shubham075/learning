const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Middleware function to validate the customer object
const validateCustomers = [
    body('name').isLength({ min: 5, max: 50 }).withMessage('Name must be between 5 and 50 characters'),
    body('phone').isLength({ min: 5, max: 50 }).withMessage('Phone must be between 5 and 50 characters'),
    body('email').isEmail().withMessage('given data is not email').notEmpty().withMessage('Email is required'),
    body('isPremium').isBoolean().optional(), (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: Number,
        minlength: 10,
        maxlength: 12,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isPremium: {
        type: Boolean,
        default: false
    }
}));

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', validateCustomers, async (req, res) => {

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        isPremium: req.body.isPremium
    });
    customer = await customer.save();

    res.send(customer);
});

router.put('/:id', validateCustomers, async (req, res) => {

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            isPremium: req.body.isPremium
        }, { new: true });

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.json({
        message: 'data removed...',
        data: customer
    })
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.json({
        message: 'data fetched....',
        data: customer
    })
});



module.exports = router;