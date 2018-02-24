// import actions
import {
	SET_USER_HANDLE,
	SET_ROOM_JOINED,
	SET_CHAT_ENDED,
	ADD_CHAT_MSG
} from './actions.js'

const initialState = {
	userHandle: null,
	roomJoined: false,
	chatEnded: false,
	chatMsgs: []
};

export default function appData(state = initialState, action) {
	switch (action.type) {
		case SET_USER_HANDLE:
			return Object.assign({}, state, { userHandle: action.payload });
		case SET_ROOM_JOINED:
			return Object.assign({}, state, { roomJoined: action.payload });
		case SET_CHAT_ENDED:
			return Object.assign({}, state, { chatEnded: action.payload });
		case ADD_CHAT_MSG:
			return Object.assign({}, state, { chatMsgs: state.chatMsgs.concat([ action.payload ]) })
		default:
			return state;
	}
}