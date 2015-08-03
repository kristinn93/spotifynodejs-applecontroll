//Lets require/import the HTTP module
var http = require('http');
var express = require('express');

var app = express();
//Lets define a port we want to listen to
const PORT=8001;

var exec = require('child_process').exec;

app.get('/play', function(req, res) {
  console.log("Should play");
  playMusic();
  res.json('OK');
});

app.get('/pause', function(req, res) {
  console.log("Should pause");
  pauseMusic();
  res.json('OK');
});

app.get('/next', function(req, res) {
  playNext();
  res.json('OK');
});

app.get('/currSong', function(req, res) {
  currentSong(function(err, songName) {
    if (err) {
      res.status(500).json('Could not find song name');
    }
    var artist = songName.split('/')[0];
    var song = songName.split('/')[1];
    res.json({artist: artist, song: song});
  });
});

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

function currentSong(cb){
	console.log("Getting current song");
	var current = './spotifyscripts/run spotifyscripts/currentSong.scpt';
	exec(current, function(error, stdout, stderr) {
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

