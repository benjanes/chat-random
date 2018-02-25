const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.PORT || 8000;

const Chats = require('./server/Chats');
const chatController = new Chats(io);

// server.listen(80);
app.use(express.static('public'));

io.on('connection', function (socket) {

	socket.on('setUserHandle', function(handle) {
		chatController.addUserToLobby({ id: socket.id, handle, restrictedUsers: [ socket.id ], socket });
		socket.emit('userHandleSet', handle);
	});

	socket.on('disconnect', () => {
		chatController.checkRoomsForDisconnectingUser(socket.id);
	});

});

server.listen(port, () => console.log(`Listening on port 8000`));
