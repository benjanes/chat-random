module.exports = (io, room, users, endRoom, backToLobby) => {
	users.forEach((user, idx) => {
		const otherUser = idx ? users[0] : users[1];

		user.restrictedUsers.push(otherUser.socket.id);
		user.socket.join(room);

		io.to(room).emit('joinRoom');

		user.socket.on('sendChatMsg', msg => {
			user.socket.to(room).emit('receiveChatMsg', msg);
		});

		// write logic for leaving
		user.socket.on('userLeave', () => {
			// let the userB know that userA has left
			console.log('send msg that session ended');
			io.to(room).emit('chatSessionEnded');
			endRoom(room);
			backToLobby(user);
		});
	});

	return true;
}