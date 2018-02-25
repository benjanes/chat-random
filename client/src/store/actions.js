export const SET_USER_HANDLE = 'SET_USER_HANDLE';
const setUserHandle = handle => {
	return {
		type: SET_USER_HANDLE,
		payload: handle
	};
};

export const SET_ROOM_JOINED = 'SET_ROOM_JOINED';
export const setRoomJoined = bool => {
	return {
		type: SET_ROOM_JOINED,
		payload: bool
	};
};

export const SET_PARTNER_HANDLE = 'SET_PARTNER_HANDLE';
const setPartnerHandle = handle => {
	return {
		type: SET_PARTNER_HANDLE,
		payload: handle
	};
};

export const SET_CHAT_ENDED = 'SET_CHAT_ENDED';
const setChatEnded = bool => {
	return {
		type: SET_CHAT_ENDED,
		payload: bool
	};
};

export const ADD_CHAT_MSG = 'ADD_CHAT_MSG';
const addChatMsg = msg => {
	return {
		type: ADD_CHAT_MSG,
		payload: msg
	};
};

export const socketActions = {
	setUserHandle,
	setRoomJoined,
	setPartnerHandle,
	setChatEnded,
	addChatMsg,
};
