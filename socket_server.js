// Get a socket_io object
var socket_io = require('socket.io');
var io = socket_io();
var socket_server = {};

socket_server.io = io;

io.on('connection', function(socket){
	console.log('A user connected');
	var socketId = socket.id;
	var clientIp = socket.request.connection.remoteAddress;
	io.emit('data', io.engine.clientsCount);
	console.log(clientIp);
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
		io.emit('data', msg);
	});
});

socket_server.sendNotification = function() {
	io.sockets.emit('hello', {msg: 'Hello World!'});
}

module.exports = socket_server;