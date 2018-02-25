const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.PORT || 8000;

const ChatController = require('./server/ChatController');
const chatController = new ChatController(io);

app.use(express.static('public'));

io.on('connection', socket => {

	socket.on('setUserHandle', handle => {
		chatController.addUserToLobby({ id: socket.id, handle, restrictedUsers: [ socket.id ], socket });
		socket.emit('userHandleSet', handle);
	});

	socket.on('disconnect', () => {
		chatController.checkRoomsForDisconnectingUser(socket.id);
	});

});

server.listen(port, () => console.log(`Listening on port ${port}`));
