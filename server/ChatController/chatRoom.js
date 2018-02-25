module.exports = (io, room, users, endRoom, backToLobby) => {
	users.forEach((user, idx) => {
		const otherUser = idx ? users[0] : users[1];

		// make sure these two don't get paired again later
		user.restrictedUsers.push(otherUser.socket.id);
		// subscribe each to the same room
		user.socket.join(room);

		io.to(user.socket.id).emit('joinRoom', otherUser.handle);

		// handlers
		user.socket.on('sendChatMsg', handleSendChatMsg);
		user.socket.on('userLeave', handleUserLeave);

		function handleSendChatMsg(msg) {
			user.socket.to(room).emit('receiveChatMsg', msg);
		}

		function handleUserLeave() {
			removeListeners();
			backToLobby(user);
			endRoom(room);
			
			if (room) io.to(otherUser.socket.id).emit('chatSessionEnded');
			room = null;
		}

		// remove listeners when the user leaves the room
		function removeListeners() {
			user.socket.removeListener('sendChatMsg', handleSendChatMsg);
			user.socket.removeListener('userLeave', handleUserLeave);
		}
	});

	return true;
}
