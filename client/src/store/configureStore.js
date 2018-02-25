import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

// import reducers
import appData from './reducer';

// const rootReducer = combineReducers({
// 	// list reducers
// 	appData,
// });

export default function configureStore(initialState) {
	const logger = createLogger({
		predicate: () => process.env.NODE_ENV === 'development', // only log in dev
		collapsed: true
	});

	const store = createStore(
		appData,
		initialState,
		applyMiddleware(logger)
	);

	return store;
}
