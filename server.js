//Lets require/import the HTTP module
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static(__dirname + '/dist'));
//app.use(express.static(__dirname + '/dist'));
var server = http.createServer(app);

var io = require('socket.io').listen(server);
//Lets define a port we want to listen to
const PORT=8001;

var exec = require('child_process').exec;

var nowPlaying = '';

app.get('/', function(req, res){
  //res.sendFile(__dirname + '/dist/index.html');
  res.redirect('/index.html')
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('sup', function() {
  	console.log('Sup from client');
  });



	setInterval(function(){ 
		console.log('checking song');
    	var current = './scripts/run scripts/currentSong.scpt';
		doSpot(current, function(err, stdout) {
			if(err) {
				return;
			}
			else
			{
				if(nowPlaying !== stdout)
				{
					nowPlaying = stdout;
					socket.emit('getSong');
				}
			}
		});
	}, 5000);

//io.on sviginn
});

app.get('/', function(req, res) {

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
	res.json({ip: addresses[0], port: PORT.toString()});
});

app.get('/play', function(req, res) {
	var play = './scripts/run scripts/play2.scpt';
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

app.get('/prev', function(req, res) {
	var previous = './scripts/run scripts/prev.scpt';
	doSpot(previous, function(err, stdout){
		if(err) {
			res.status(500).json('Can\'t play prev song');
		}
		res.json('OK');
	});
});

app.get('/volDown', function(req, res) {
	var previous = './scripts/run scripts/volDown.scpt';
	doSpot(previous, function(err, stdout){
		if(err) {
			res.status(500).json('Can\'t turn volume downopen');
		}
		res.json('OK');
	});
});

app.get('/volUp', function(req, res) {
	var previous = './scripts/run scripts/volUp.scpt';
	doSpot(previous, function(err, stdout){
		if(err) {
			res.status(500).json('Can\'t turn volume up');
		}
		res.json('OK');
	});
});



app.get('/currSong', function(req, res) {
	var current = './scripts/run scripts/currentSong.scpt';
	doSpot(current, function(err, stdout) {
		if(err) {
			res.status(500).json(' 	Can\'t find the name of song');
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
  console.log("Open your browser with the following URL: http://localhost:%s", PORT);
});

