const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Middleware function to validate the genre object
const validateGenre = [
    body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters')
        .notEmpty().withMessage('Name is required').trim().toLowerCase(), (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
];


//creating genres mongoose_Schema
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', validateGenre, async (req, res) => {
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.json({ message: 'genre added...', data: genre });
});

router.put('/:id', validateGenre, async (req, res) => {
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.json({ message: 'genre updated...', data: genre });
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.json({ message: 'genre removed...', data: genre });
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.json({ message: `genre found with ID ${req.params.id}...`, data: genre });
});


module.exports = router;