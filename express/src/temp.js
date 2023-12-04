// Serveing static web files using express
const express = require('express');
const path = require('path');
let app = express();

const webFilesPath = path.join(__dirname, "../public");
app.use(express.static(webFilesPath));

app.get('/',(req, res)=>{
    res.send('testing responsive webpage!')
    // res.sendFile(__dirname + "../public/index.html");
});

app.listen(3000, ()=>{
    console.log('server started on port 3000');
});