

const express = require('express');

const router = express.Router();

router.get('/firstPage/:name/:id', (req,res)=>{
    res.send(`<h1>${req.params.name} with id ${req.params.id} is on first Page</h1>`);
});

router.get('/secondPage', (req, res)=>{
    res.send('This second page');
});

router.get('/thirdPage/:name/:id', (req, res)=>{
    res.send(`<h1>${req.params.name} with id ${req.params.id} is on Third Page</h1>`);
});

module.exports = router;

