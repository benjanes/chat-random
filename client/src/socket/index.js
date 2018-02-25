import io from 'socket.io-client';

// use this for receiving data from socket -> update store
const addSocketHandlers = (store, socket, actions) => {
	socket.on('receiveChatMsg', msg => store.dispatch(actions.addChatMsg(msg)));
	socket.on('joinRoom', otherUserHandle => {
		store.dispatch(actions.setPartnerHandle(otherUserHandle));
		store.dispatch(actions.setRoomJoined(true));
		store.dispatch(actions.setChatEnded(false));
	});
	socket.on('chatSessionEnded', () => store.dispatch(actions.setChatEnded(true)));
};

const createSocketDispatch = (store, socket, actions) => {
	return {
		setUserHandle: handle => {
			store.dispatch(actions.setUserHandle(handle));
			socket.emit('setUserHandle', handle);
		},

		sendMsg: msg => {
			store.dispatch(actions.addChatMsg(msg));
			socket.emit('sendChatMsg', msg);
		},

		leaveChatSession: bool => {
			store.dispatch(actions.setChatEnded(bool));
			socket.emit('userLeave');
		}
	}
};

export const addHandlersAndCreateDispatch = (store, socket, actions) => {
	addSocketHandlers(store, socket, actions);
	return createSocketDispatch(store, socket, actions);
}

export const initSocketConnection = () => {
	return io();
};
