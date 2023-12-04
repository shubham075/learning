

const datas = [
    {name:"kevin", profession:'software developer'},
    {name:'charles', profession:'software engineer'}
];

function getData(){
    setTimeout(() => {
        const output = '';
        datas.forEach((data)=>{
            console.log(data.name);
        })
    }, 1000);
}

function setData(newElement){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            datas.push(newElement);
            let state = false;
            if (!state){
                resolve();
            }
            else{
                reject('undefined data inserted!!');
            }
        }, 3000);
    })
};

// setData({name:'rajeev', profession:'master-chef'}).then(getData).catch(err=>console.log(err));

async function start(){
    await setData({name:'rajeev', profession:'master-chef'})
    getData();
}

start();