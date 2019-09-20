import React, { useEffect, useState, useCallback } from 'react';

import _get from 'lodash/get';
import { Redirect } from 'react-router-dom';
import { Loader, Button } from 'semantic-ui-react';

import socket from '../../socket';
import { GET, DELETE } from '../../api';
import { getUser } from '../../utils/auth';
import { Layout, RoleCard } from '../../components';

import styles from './styles.module.scss';

export default props => {
	if (!socket.isConnected()) return <Redirect to="/" />;

	const [loading, setLoading] = useState(true);
	const [role, setRole] = useState({});
	const [game, setGame] = useState({});

	const gameId = _get(props, 'match.params.gameId');

	const endGame = id => {
		DELETE(`/games/${id}`);
	};

	const gameEndHandler = useCallback(({ _id }) => {
		if (_id !== gameId) return;

		props.history.push('/rooms');
	}, [gameId, props.history])

	useEffect(() => {
	    setLoading(true);
	    GET(`/games/${gameId}/me`)
	        .then(role => {
	            setLoading(false);
	            setRole(role);
	        })
					.catch(console.error); // TODO: What's the catch?!
					
			GET(`/games/${gameId}`)
					.then(setGame);

			socket.addEventListener('game ended', gameEndHandler);

			return () => {
				socket.removeEventListener('game ended', gameEndHandler);
			}
	}, [gameId, gameEndHandler]);


	const isHost = getUser()._id === _get(game, ['host', '_id']);

	return (
		<Layout className={styles.gameContainer}>
			{loading ? <Loader active /> : <RoleCard {...role} />}
			{!loading && isHost && <Button onClick={() => endGame(gameId)} color="red" style={{ marginTop: '50px' }}>End Game!</Button>}
		</Layout>
	);
};
