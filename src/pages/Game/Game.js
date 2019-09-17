import React, { useEffect, useState } from 'react';

import _get from 'lodash/get';
import { Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import socket from '../../socket';
import { GET } from '../../api';
import { Layout, RoleCard } from '../../components';

import styles from './styles.module.scss';

export default props => {
	if (!socket.isConnected()) {
		alert('you must enter your username before joining or creating a room');
		return <Redirect to="/" />;
	}

	const [loading, setLoading] = useState(true);
	const [role, setRole] = useState({});

	const gameId = _get(props, 'match.params.gameId');

	useEffect(() => {
	    setLoading(true);
	    GET(`/games/${gameId}`)
	        .then(role => {
	            setLoading(false);
	            setRole(role);
	        })
	        .catch(console.error); // TODO: What's the catch?!
	}, [gameId]);

	return (
		<Layout className={styles.gameContainer}>
			{loading ? <Loader active /> : <RoleCard {...role} />}
		</Layout>
	);
};
