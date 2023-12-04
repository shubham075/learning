const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');


let routes = express.Router();
let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function signup(req, res, next) {
    let data = {
        username: req.body.username,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password,
    }
    let parseData = fs.readFileSync('./userData.txt', 'utf-8');
    parseData = JSON.parse(parseData);
    let existingEmail = []
    for (let ele in parseData) {
        existingEmail.push(parseData[ele].email);
    }
    let val = existingEmail.find((items) => { return items == data.email });

    try {
        if (data.username == "" || data.email == "" || data.contact == "" || data.password == "" || data.password !== req.body.confirmPassword) {
            res.redirect('/register');
        }
        else if (val == undefined) {
            //repeating file read here.....
            let token = jwt.sign({email: data.email}, 'JSONWEBtoken');
            data.token = token;
            let fileData = fs.readFileSync('./userData.txt', 'utf-8');
            fileData = JSON.parse(fileData);
            fileData.push(data);
            fileData = JSON.stringify(fileData);
            fs.writeFileSync('./userData.txt', fileData);
            res.json({Userdata: data});
        }
        else {
            res.json({ message: "User already registered!!" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went worng!"});
    }
    next();
}

routes.get('/', (req, res) => {
    res.render('index');
});

routes.get('/register', (req, res) => {
    res.render('register');
});

routes.post('/register', signup, (req, res) => {
    res.json({ message: "New data inserted!" });
});

routes.get('/*', (req, res) => {
    res.render('errorPage');
});



module.exports = routes;