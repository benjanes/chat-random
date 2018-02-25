module.exports = (io, room, users, endRoom, backToLobby) => {
	users.forEach((user, idx) => {
		const otherUser = idx ? users[0] : users[1];

		user.restrictedUsers.push(otherUser.socket.id);
		user.socket.join(room);

		io.to(user.socket.id).emit('joinRoom', otherUser.handle);

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

		function removeListeners() {
			user.socket.removeListener('sendChatMsg', handleSendChatMsg);
			user.socket.removeListener('userLeave', handleUserLeave);
		}
	});

	return true;
}
