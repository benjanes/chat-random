import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

// import reducers
import appReducer from './reducer';

export default function configureStore(initialState) {
	const logger = createLogger({
		predicate: () => process.env.NODE_ENV === 'development', // only log in dev
		collapsed: true
	});

	const store = createStore(
		appReducer,
		initialState,
		applyMiddleware(logger)
	);

	return store;
}
