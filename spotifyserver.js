//Lets require/import the HTTP module
var http = require('http');
var express = require('express');

var app = express();
//Lets define a port we want to listen to
const PORT=8001;

var exec = require('child_process').exec;

app.get('/play', function(req, res) {
	var play = './spotifyscripts/run spotifyscripts/play.scpt';
	doSpot(play, function(err, stdout){
		if(err) {
			res.status(500).json('Can\'t play');
		}
		res.json('OK');
	});
});

app.get('/pause', function(req, res) {
	var pause = './spotifyscripts/run spotifyscripts/pause.scpt';
	doSpot(pause, function(err, stdout) {
		if(err) {
			res.status(500).json('Can\'t pause');
		}
		res.json('OK');
	});
});

app.get('/next', function(req, res) {
	var next = './spotifyscripts/run spotifyscripts/next.scpt';
	doSpot(next, function(err, stdout){
		if(err) {
			res.status(500).json('Can\'t play next song');
		}
		res.json('OK');
	});
});

app.get('/currSong', function(req, res) {
	var current = './spotifyscripts/run spotifyscripts/currentSong.scpt';
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
var server = http.createServer(app);
//Lets start our server
server.listen(PORT, function(){
  //Callback triggered when server is successfully listening. Hurray!
  console.log("Server listening on: http://localhost:%s", PORT);
});

