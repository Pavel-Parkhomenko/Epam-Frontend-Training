const http = require("http");
var fs = require('fs');

function define(request, response, jsonString) {
    if (jsonString !== '') {
        let data = JSON.parse(jsonString);
        //console.log(response);

        fs.writeFile("./server/json/" + data.nameFile + ".json", JSON.stringify(data), function (err) {
            if (err) throw err;
            console.log('complete');
        })
    }
    console.log(request.method);

    response.end(JSON.stringify({
        status: 'ok',
        data: JSON.parse(jsonString)
    }));
}

http.createServer(function (request, response) {

    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');

    var jsonString = '';

    request.on('data', (data) => {
        jsonString += data;
    });

    request.on('end', (data) => {
        define(request, response, jsonString);
    });
}).listen(8000);