const http = require("http");
const fs = require("fs");

http.createServer(function (request, response) {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');

    console.log("Тип запроса: " + request.method);

    let option;
    request.on("data", chunk => {
        option = JSON.parse(chunk);
        console.log(option);
    });

    request.on("end", () => {
        if (option.operation !== "notset") {
            fs.readFile("data.json", (err, data) => {
                let datas = JSON.parse(data.toString());
                if (option.operation == "insert")
                    datas.students.push(JSON.parse(option.student));
                else datas.students[option.ind] = JSON.parse(option.student);

                fs.writeFile("data.json", JSON.stringify(datas), (err) => {
                    if (err) throw err;
                    console.log('add data complete');
                })
            })
        }

        fs.readFile("data.json", (err, data) => {
            if (option.ind < 0 || option.ind >= JSON.parse(data.toString()).students.length) {
                response.end(JSON.stringify({ message: "overload" }))
                console.log(option.ind);
            }
            else
                response.end(JSON.stringify(JSON.parse(data.toString()).students[option.ind]));
            //console.log(JSON.parse(data.toString()).students[option.ind]);
        })

    });

}).listen(3000);