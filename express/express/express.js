// // routing in Express JS

const express = require('express');
let app = express();

let things = require('./things.js');

app.use('/', things);


app.listen(3000, ()=>{
    console.log("Server works fine on port 3000");
})