// Creating a server using a HTTP module

const http = require('http');

let server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<h1>first html page using http module</h1>`);
});



server.listen(3000, ()=>{
    console.log('server works on port 3000');
});


