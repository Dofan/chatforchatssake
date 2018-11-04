// user connects,
// get user data from db,
// send to all users, including self, on user_connect channel
// user recieves data about the connected user,
// user creates an object to represent the new player



/*
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
*/




// Get a socket_io object
var socket_io = require('socket.io');
var io = socket_io();
var socket_server = {};

socket_server.io = io;

io.on('connection', function(socket){
	console.log('A user connected');
	//var socketId = socket.id;
	//var clientIp = socket.request.connection.remoteAddress;
	io.emit('user_connect', socket.id + " " + "");
	

	//console.log(clientIp);
	// On 'disconnect' message from client
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	// On 'chat message' message from client
	socket.on('chat message', function(msg){
		// Send message to all sockets
		io.emit('chat message', msg);
	});
		// On 'data' message from client
	socket.on('data', function(msg){
		// Send message to all sockets
		io.emit('data', socket.id + " : " + msg);
	});
});

socket_server.sendNotification = function() {
	io.sockets.emit('hello', {msg: 'Hello World!'});
}

module.exports = socket_server;