import React from 'react';

import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

import { Home, Rooms, Room, Game, Auth } from './pages';

import styles from './styles.module.scss';

const store = configureStore();

const App = () => {
	return (
		<div className={styles.App}>
			<Provider store={store}>
				<Router>
					<main className={styles.main}>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/auth" component={Auth} />
							<Route exact path="/rooms" component={Rooms} />
							<Route exact path="/rooms/:roomId" component={Room} />
							<Route exact path="/games/:gameId" component={Game} />

							<Route component={Home} />
						</Switch>
					</main>
				</Router>
			</Provider>
		</div>
	);
};

export default App;
export {
	store
};