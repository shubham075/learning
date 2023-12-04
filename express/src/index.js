// // creating a server using http core module

// const http = require('http');
// let server = http.createServer((req, res)=>{
//     res.end("Server works fine!");
// });

// server.listen(3000, ()=>{
//     console.log("Server runs on port: 3000");
// });





// // craeting a server using expressJS 3rd party module

// let express = require("express");
// let app = express();

// app.get('/', (req, res)=>{
//     res.send("<h1>Server works fine!!</h1>")
// })

// app.get('/tasks', (req, res)=>{
//     res.send("<h2>Task has been completed!!</h2>")
// })

// app.listen(3000, ()=>{
//     console.log("Server running on port : 3000");
// });







// creating server using http core module along with expressJS and use fs.readFile 
// to fetch data inside JSON file.

const express = require('express');
// let http = require('http');
const fs = require('fs');

let app = express();
// let server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('<h1>Server works fine!!</h1>');
});

app.get('/task', (req, res) => {
    fs.readFile('./temp.json', 'utf-8', (err, data) => {
        if (!err) {
            let task = JSON.parse(data);
            res.send(task);
        }
    });
});

app.listen(3000, () => {
    console.log("server runnign on port 3000!!!");
});


