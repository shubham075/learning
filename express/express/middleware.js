//practice on middleware functions.

const express = require('express');
let app = express();

//middleware simple function
let functionOne = (req,res,next)=>{
    console.log('Middleware execute first');
    next();
};

app.get('/', (req,res)=>{
    res.send(`<h1>Learning middleware function</h1>`);
});

app.get('/user', functionOne, (req,res)=>{
    console.log('auth done!');
    res.send(`<h1>User aunthication done!</h1>`);
});


app.listen(3000, ()=>{
    console.log('server works on port 3000');
});