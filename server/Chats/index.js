const Chat = require('./Chat.js');

class Chats {
	constructor(io) {
		this.io = io;
		this.lobby = [];
		this.rooms = {};

		this.addUserToLobby = this.addUserToLobby.bind(this);
		this.establishRoom = this.establishRoom.bind(this);
		this.endRoom = this.endRoom.bind(this);
	}

	addUserToLobby(user) {
		const availableUsers = this.lobby.reduce((avails, otherUser, idx) => {
			if (!otherUser.restrictedUsers.includes(user.id)) avails = avails.concat([idx]);
			return avails;
		}, []);

		// also do a check here so that a user leaving a room isn't pushed back into same room
		if (availableUsers.length) {
			let firstAvailableUser = this.lobby[availableUsers[0]];
			
			this.lobby = this.lobby.slice(0, availableUsers[0]).concat(this.lobby.slice(availableUsers[0] + 1));
			this.establishRoom(user, firstAvailableUser);
		} else {
			this.lobby.push(user);
		}
	}

	establishRoom(user1, user2) {
		const room = `${user1.id}:${user2.id}`;
		this.rooms[room] = Chat(this.io, room, [user1, user2], this.endRoom, this.addUserToLobby);
	}

	checkRoomsForDisconnectingUser(id) {
		const targetRoom = Object.keys(this.rooms).filter(room => room.split(':').includes(id));

		if (targetRoom.length) {
			// alert other user and shutdown the room (endRoom)
			let remainingUser = targetRoom[0].split(':').filter(userId => userId !== id)[0];
			
			this.io.to(remainingUser).emit('chatSessionEnded');
			this.endRoom(targetRoom);
		}
	}

	endRoom(room) {
		delete this.rooms[room];
	}
}

module.exports = Chats;
