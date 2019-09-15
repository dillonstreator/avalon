import React from 'react';

import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

import { Home, Rooms, Room, Game } from './pages';

import styles from './styles.module.scss';

const App = () => {
	return (
		<div className={styles.App}>
			<Router>
				<main className={styles.main}>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/rooms" component={Rooms} />
						<Route exact path="/rooms/:roomId" component={Room} />
						<Route exact path="/games/:gameId" component={Game} />
					</Switch>
				</main>
			</Router>
		</div>
	);
};

export default App;
