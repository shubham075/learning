const express = require('express');
const path = require('path');
const hbs = require('hbs');
const routes = require('./controller/routes.js');

let app = express();
//body-parser
app.use(express.urlencoded({ extended : true }));

let webFilesPath = path.join(__dirname, './public');
let viewsFilePath = path.join(__dirname, './templets/views');
//partials files adding later;;
app.use(express.static(webFilesPath));

app.set('view engine', 'hbs');
app.set('views', viewsFilePath);
//partials adding later;;


//routes
app.use('/', routes);


app.listen(3000, ()=>{
    console.log("server works fine on port 3000!!");
});