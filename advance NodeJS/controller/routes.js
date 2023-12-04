const express = require('express');
let routers = express.Router();
let app = express();
app.use(express.urlencoded({ extended: true }));

// Database existing email and password data of users;
let loginData = {
    104286539: "s.prakash@thesynapses.com",
    1234567890: "shukpyou@gmail.com",
    9504286539: "prakashkumar730187@gmail.com"
};

const auth = (req, res, next) => {
    // let state = false;
    let email = req.body.email;
    let password = req.body.password;
    for (let key in loginData) {
        if (key == password && loginData[key] == email) {
            // state = true;
            next(); 
        }
    }
};
//express routing
routers.get('/', (req, res) => {
    res.render('index');
});

routers.post('/aboutPage', auth, (req, res) => {
    res.render('aboutPage');
});

routers.get('/loginForm', (req, res) => {
    res.render('loginForm');
});

routers.get('/*', (req,res)=>{
    res.render('error');
});


module.exports = routers;