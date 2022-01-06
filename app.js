const http = require("http");
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,'data.txt');


const server = http.createServer((request, response) => {
    console.log(request.url);
    if (request.url === "/") {
        response.write("hello")
        response.end();
    }
    else if (request.url === "/form") {
        response.setHeader("Content-Type", "text/html");
        response.write("<form action='/submit' method='POST'><input name='name' type='text'/><input name='name2' type='text'/><button type='submit'>Submit</button></form>");
        response.end();
    }
    else if (request.url === '/submit') {
        let data = "";
        request.on("data", (chunk) => {
            data += chunk
        })
        request.on("end", () => {
            console.log(data.split('&'));
            fs.writeFile(filePath,data,()=>{
                console.log("DATA SAVED");
            })
        })
        response.write("sucessfuly submited")
        response.end();
    }
})

server.listen(3001);