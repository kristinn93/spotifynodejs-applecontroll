//Lets require/import the HTTP module
var http = require('http');
var express = require('express');

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);
//Lets define a port we want to listen to
const PORT=8001;

var exec = require('child_process').exec;

app.get('/', function(req, res){
  res.sendFile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

app.get('/ip', function(req, res){
	var os = require('os');

	var interfaces = os.networkInterfaces();
	var addresses = [];
	for (var k in interfaces) {
    	for (var k2 in interfaces[k]) {
        	var address = interfaces[k][k2];
        	if (address.family === 'IPv4' && !address.internal) {
            	addresses.push(address.address);
        	}
    	}
	}
	res.json({ip: addresses[0], port: PORT});
});

app.get('/play', function(req, res) {
	console.log('play function');
	var play = './scripts/run scripts/play.scpt';
	doSpot(play, function(err, stdout){
		if(err) {
			res.status(500).json('Can\'t play');
		}
		res.json('OK');
	});
});

app.get('/pause', function(req, res) {
	var pause = './scripts/run scripts/pause.scpt';
	doSpot(pause, function(err, stdout) {
		if(err) {
			res.status(500).json('Can\'t pause');
		}
		res.json('OK');
	});
});

app.get('/next', function(req, res) {
	var next = './scripts/run scripts/next.scpt';
	doSpot(next, function(err, stdout){
		if(err) {
			res.status(500).json('Can\'t play next song');
		}
		res.json('OK');
	});
});

app.get('/currSong', function(req, res) {
	var current = './scripts/run scripts/currentSong.scpt';
	doSpot(current, function(err, stdout) {
		if(err) {
			res.status(500).json('Can\'t find the name of song');
		}
		var artist = stdout.split('/')[0];
		var song = stdout.split('/')[1];
		res.json({artist: artist, song: song});
	});
});

function doSpot(command, cb){
	exec(command, function(error, stdout, stderr) {
    	cb(error, stdout);
  	});
};


//Create a server

//Lets start our server
server.listen(PORT, function(){
  //Callback triggered when server is successfully listening. Hurray!
  console.log("Server listening on: http://localhost:%s", PORT);
});

