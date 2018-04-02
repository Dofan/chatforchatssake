var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection', function(socket){
	console.log('A user connected');
	var socketId = socket.id;
	var clientIp = socket.request.connection.remoteAddress;

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
});

socketApi.sendNotification = function() {
	io.sockets.emit('hello', {msg: 'Hello World!'});
}

module.exports = socketApi;