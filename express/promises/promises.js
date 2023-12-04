// function func1(){
//     return new Promise(function(resolve, reject){
//         setTimeout(() => {
//             let error=true;
//             if (!error){
//                 console.log("promise done!");
//                 resolve();
//             }
//             else{
//                 console.log("Sorry promise can't be fulfilled");
//                 reject('promise not fulfilled!!!!!!!!');
//             }
//         }, 2000);
//     })
// }
// func1().then(function(){
//     console.log("Shubham: Thanks for resolving!");
// }).catch(function(error){
//     console.log(`Sorry : ${error}`);
// });


let objects = [{ fname: "shubham", lname: "prakash" },
                { fname: "shubham", lname: "kumar" }
];

function setData(data) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            objects.push(data);
            console.log("data pushed into object");
            const error=false;
            if(!error){
                resolve();
            }
            else{
                reject();
            }
        })
    }, 5000);
}

function getData() {
    setTimeout(() => {
        console.log("given data: ");
        for (let ele in objects) {
            first = objects[ele].fname;
            last = objects[ele].lname;
            console.log(first, last);
        }
    }, 1000);
}
let newData = { fname: "Harry", lname: "Sandhu" };
// setData(newData).then(getData).catch(function(){console.log("Error occured!!")});

//use of async/await
async function start(){
    await setData(newData);
    getData();
}
start();