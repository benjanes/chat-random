import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { initSocketConnection, addSocketHandlers, createSocketDispatch } from './socket';

import App from './components/App';
import configureStore from './store/configureStore';
import { socketActions } from './store/actions.js';

const store = configureStore({});
const socket = initSocketConnection();

// combine these
const socketDispatch = createSocketDispatch(store, socket, socketActions);
addSocketHandlers(store, socket, socketActions);

render(
	<Provider store={ store }>
		<App socketDispatch={ socketDispatch }/>
	</Provider>,
	document.getElementById('root')
);
