//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8001; 

var exec = require('child_process').exec;
var play = './spotifyscripts/run spotifyscripts/play.scpt';
var pause = './spotifyscripts/run spotifyscripts/pause.scpt';

//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
    console.log("sup");
    if(request.url === "/play")
    {
    	console.log("Should play");
    	exec(play, function(error, stdout, stderr) {
    	});
    }
    else if(request.url === "/pause")
    {
    	console.log("should pause");
    	exec(pause, function(error, stdout, stderr) {
    	});
    }
    else
    {
    	console.log("nothing should happen;");
    }
}

//Create a server
var server = http.createServer(handleRequest);
//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
