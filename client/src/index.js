import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { initSocketConnection, addHandlersAndCreateDispatch } from './socket';
import configureStore from './store/configureStore';
import { socketActions } from './store/actions.js';

import App from './containers/App';
import { styles } from './styles/main.scss';

const store = configureStore({});
const socket = initSocketConnection();
const socketDispatch = addHandlersAndCreateDispatch(store, socket, socketActions);

render(
	<Provider store={ store }>
		<App socketDispatch={ socketDispatch }/>
	</Provider>,
	document.getElementById('root')
);
