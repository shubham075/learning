const express = require('express');
const path = require('path')
const hbs = require('hbs');
let routes = require('../controller/routes.js');

let app = express();

const webFilesPath = path.join(__dirname, '../public');
const viewsFilesPath = path.join(__dirname, '../templets/views');
const partialsFilesPath = path.join(__dirname, '../templets/partials');
//1

app.use(express.static(webFilesPath));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', viewsFilesPath);

hbs.registerPartials(partialsFilesPath);



//Express routing files in controller/routes.js
app.use('/', routes);

app.listen(3000, () => {
    console.log('Server works fine on port 3000!');
});


