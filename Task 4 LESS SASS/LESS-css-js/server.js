const fs = require("fs");
const http = require("http");
  
http.createServer(function(request, response){
      
    console.log(`Запрошенный адрес: ${request.url}`);
    const filePath = request.url.substr(1);
    console.log(filePath);
    fs.access(filePath, fs.constants.R_OK, err => {
        if(err){
            response.statusCode = 404;
            response.end("Web site not found!");
        }
        else{
            fs.createReadStream(filePath).pipe(response);
        }
      });
}).listen(2000, function(){
    console.log("Server started at 2000");
});