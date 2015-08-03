//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8001; 

var exec = require('child_process').exec;


//We need a function which handles requests and send response
function handleRequest(request, response){
    console.log("myUrl : " + request.url);
    if(request.url === "/play")
    {
    	console.log("Should play");
    	playMusic();
    	
    }
    else if(request.url === "/pause")
    {
    	pauseMusic();	
    	
    }
    else if(request.url === "/next")
    {
    	playNext();
    }
    else if(request.url === "/currSong")
    {
    	currentSong();
    	
    }
    else
    {
    	console.log("nothing is happening;");
    }
}

function playMusic(){
	var play = './spotifyscripts/run spotifyscripts/play.scpt';
	exec(play, function(error, stdout, stderr) {
    });

};

function pauseMusic(){
	var pause = './spotifyscripts/run spotifyscripts/pause.scpt';
	exec(pause, function(error, stdout, stderr) {
    	});
};

function playNext(){
	var next = './spotifyscripts/run spotifyscripts/next.scpt';
	exec(next, function(error, stdout, stderr) {
    	});
};

function currentSong(){
	console.log("Getting current song");
	var current = './spotifyscripts/run spotifyscripts/currentSong.scpt';
	exec(current, function(error, stdout, stderr) {
		console.log(stdout);
		request.on('response', function (response) {
		  var body = stdout;
		  response.on('end', function () {
		    console.log('BODY: ' + body);
		  });
		});
  		response.end("Current song playing : " + stdout);
    });
};

//Create a server
var server = http.createServer(handleRequest);
//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
