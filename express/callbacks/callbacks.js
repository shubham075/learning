let objects = [{ fname: "shubham", lname: "prakash" },
                { fname: "shubham", lname: "kumar" }];

function setData(data, callback) {
    setTimeout(() => {
        objects.push(data);
        console.log("data pushed into object");
        callback();
    }, 2000);
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
let newData = {fname:"Harry", lname:"Sandhu"};
setData(newData, getData);
