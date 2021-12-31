const http = require("http");
var fs = require('fs');

function define(request, response, jsonString) {
    console.log("3");
    if (jsonString !== '') {
        let data = JSON.parse(jsonString);
        console.log("4");
        //console.log(response);

        fs.writeFile("jsonFiles/" + data.nameFile + ".json", JSON.stringify(data), function (err) {
            if (err) throw err;
            console.log('complete');
        })
    }
    console.log("5");
    console.log(request.method);

    response.end(JSON.stringify({
        status: 'ok',
        data: JSON.parse(jsonString)
    }));
}

http.createServer(function (request, response) {

    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');

    console.log("1");

    var jsonString = '';

    request.on('data', (data) => {
        jsonString += data;
    });

    request.on('end', (data) => {
        define(request, response, jsonString);
    });
    console.log("2");
}).listen(8000);