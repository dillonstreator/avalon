import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import roomsReducer from './ducks/rooms';
import usersReducer from './ducks/users';
import gamesReducer from './ducks/games';

const configureStore = (initialState = {}) => {
	const reducer = combineReducers({
		rooms: roomsReducer,
		users: usersReducer,
		games: gamesReducer,
	});

	const logger = createLogger({ collapsed: () => true });

	const middleware = process.env.NODE_ENV === 'production' ? [] : [logger];

	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	return {
		...createStore(
            reducer,
			initialState,
			composeEnhancers(applyMiddleware(...middleware))
		),
	};
};

export default configureStore;