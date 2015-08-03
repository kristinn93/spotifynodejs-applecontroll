//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8080; 

var exec = require('child_process').exec;
var play = './spotifyscripts/run spotifyscripts/play.scpt';
var pause = './spotifyscripts/run spotifyscripts/pause.scpt';


//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
     exec(pause, function(error, stdout, stderr) {
    	console.log(error);
    	console.log(stdout);
    	console.log(stderr);
    });
}

//Create a server
var server = http.createServer(handleRequest);
//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
