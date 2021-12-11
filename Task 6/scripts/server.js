const http = require("http");
 
function define(request, response, jsonString) {
    console.log(`[${jsonString}]`);
    if (jsonString !== '') {
        let data = JSON.parse(jsonString);
        console.log(data);
    }
    
    console.log(request.method);

    response.end(JSON.stringify({
        status: 'ok',
        data: JSON.parse(jsonString)
    }));
}

http.createServer(function(request, response){

    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');

    console.log(request.method);

    let jsonString = '';

    request.on('data', (data) => {
        jsonString += data;
    });

    request.on('end', () => {
        define(request, response, jsonString);
    });
}).listen(8000);