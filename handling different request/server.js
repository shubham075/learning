const express = require('express');
const data = require('./list');

let app = express();
app.use(express.json());

app.listen(3000, ()=>{
    console.log("Srever works fine on port 3000!!");
});

app.get('/api/data', (req, res)=>{
    res.json(data);
})

app.post('/api/data', (req, res)=>{
    let userData = {
        id : data.length+1,
        Name : req.body.name,
        contact : req.body.contact,
        email : req.body.email
    }
    // data.unshift(userData);
    data.push(userData);
    res.json({"message":"New data has posted"});

});

app.put('/api/data/:id', (req, res)=>{
    // Read data to be put....
    let index = Number(req.params.id);
    let Name = req.body.name;
    let contact = req.body.contact;
    let email = req.body.email;

    //find index of that req.params.id.....
    let putIndex = data.findIndex((tempData)=>{
        return (tempData.id == index) 
    });

    if (putIndex >= 0){
        let putData = data[putIndex];
        putData.Name = Name;
        putData.contact = contact;
        putData.email = email;
        res.json({"message":"new data has putted into API!"});
    }
    else{
        res.status(404);
        res.send();
    }
});

app.patch('/api/data/:id', (req, res)=>{
    //reading data to be patch......
    let index = Number(req.params.id);
    let contact = req.body.contact;
    let email = req.body.email;

    let patchIndex = data.findIndex((temp)=>{
        return (temp.id == index);
    });

    if (patchIndex >=0 ){
        let patchData = data[patchIndex];
        patchData.contact = contact;
        patchData.email = email;
        res.json({"message":"New data updated!"});
    }
    else{
        res.status(404).json({"message":"something went worng!"});
    }
});

app.delete('/api/data/:id', (req, res)=>{
    let index = Number.parseInt(req.params.id);

    let deleteIndex = data.findIndex((temp)=>{
        return (temp.id == index);
    });

    if (deleteIndex >= 0){
        data.splice(deleteIndex, 1);
        res.json({"message":"Data is deleted!"});
    }
    else{
        res.status(404);
        res.send();
    }
});



