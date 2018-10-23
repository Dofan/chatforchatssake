console.log("testing......");
// On document ready event
	$(function () {
		var socket = io();
		
		socket.sendData = function(data){
			// Send data to server
			socket.emit('data', data);
		};


		
		


		// Send message to server
		$('form').submit(function(){			
			// Sends contents of message box to the server
				socket.emit('chat message', $('#m').val());
			// Clears message box
			$('#m').val('');
			return false;
		});
		// Receive message from server
		socket.on('chat message', function(msg){
			// Add the message to the HTML list
			$('#messages').append($('<li>').text(msg));
		});
		// Receive message from server
		socket.on('data', function(msg){
			// Add the message to the HTML list
			$('#messages').append($('<li>').text("data : " + msg));
		});


//import * as PIXI from 'pixi.js';
var app = new PIXI.Application(800, 600, {backgroundColor : 0x000000});
document.body.appendChild(app.view);

// create a new Sprite from an image path
var bunny = PIXI.Sprite.fromImage('required/assets/basics/ghost.png')

// center the sprite's anchor point
bunny.anchor.set(0.5);

// move the sprite to the center of the screen
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

// Listen for animate update
app.ticker.add(function(delta) {
	var mouseposition = app.renderer.plugins.interaction.mouse.global;
    
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    //bunny.rotation += 0.1 * delta;
    bunny.x = mouseposition.x;
    bunny.y = mouseposition.y;

    //socket.sendData(bunny.x + " : " + bunny.y);
});





	});

	