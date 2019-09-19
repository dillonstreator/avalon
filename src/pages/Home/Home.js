import React, { useState, useEffect } from 'react';

import { Button, Loader } from 'semantic-ui-react';

import styles from './styles.module.scss';
import { Layout } from '../../components';
import { GET } from '../../api';
import { hasRegistered, authenticated, getToken } from '../../utils/auth';

export default ({ history }) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!hasRegistered()) {
			setLoading(false);
		}
		else {
			GET('/users/me')
				.then(( me = {} ) => {
					authenticated({ token: getToken(), user: me });
					const { gameConnection, roomConnection } = me;
					if (gameConnection) history.push(`/games/${gameConnection}`);
					else if (roomConnection) history.push(`/rooms/${roomConnection}`);
					else history.push('/rooms');
				})
				.catch(e => {
					console.log(e);
					history.push('/auth');
				});
		}
	}, []);

	return (
		<Layout>
			{loading ? (
				<Loader active />
			) : (
				<>
					<h1 className={`${styles.welcome} ${styles.first}`}>Welcome</h1>
					<h1 className={`${styles.welcome} ${styles.second}`}>To</h1>
					<h1 className={`${styles.welcome} ${styles.third}`}>Avalon</h1>
					<br />
					<br />
					<br />
					<Button color="white" onClick={() => history.push('/auth')}>Play</Button>					
				</>
			)}
		</Layout>
	);
};
