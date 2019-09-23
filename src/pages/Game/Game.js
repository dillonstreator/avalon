import React, { useEffect, useState, useCallback } from 'react';

import _get from 'lodash/get';
import { Redirect } from 'react-router-dom';
import { Loader, Button } from 'semantic-ui-react';

import socket from '../../socket';
import { GET, PUT, POST } from '../../api';
import { getMe } from '../../utils/auth';
import { Layout, RoleCard } from '../../components';

import styles from './styles.module.scss';

export default props => {
	if (!socket.isConnected()) return <Redirect to="/" />;

	const [loading, setLoading] = useState(true);
	const [role, setRole] = useState({});
	const [game, setGame] = useState({});

	const gameId = _get(props, 'match.params.gameId');

	const endGame = id => PUT(`/games/${id}/end`);
	const restartGame = gameId => POST(`/games/restart`, { body: { gameId }});

	const gameEndHandler = useCallback(({ _id }) => {
		if (_id !== gameId) return;

		props.history.push('/rooms');
	}, [gameId, props.history]);

	const load = useCallback(() => {
		setLoading(true);
		GET(`/games/${gameId}/me`)
				.then(role => {
						setLoading(false);
						setRole(role);
				})
				.catch(console.error); // TODO: What's the catch?!

		GET(`/games/${gameId}`)
				.then(setGame);
	}, [gameId]);

	const gameRestartHandler = useCallback(({ fromId, _id }) => {
		console.log(fromId, _id);
		if (fromId !== gameId) return;

		props.history.replace(`/games/${_id}`);
	}, [gameId, props.history]);

	useEffect(() => {
		load();

		socket.addEventListener('game ended', gameEndHandler);
		socket.addEventListener('game restarted', gameRestartHandler);

		return () => {
			socket.removeEventListener('game ended', gameEndHandler);
		}
	}, [gameId, gameEndHandler, load, gameRestartHandler]);


	const isHost = _get(getMe(), ['_id']) === _get(game, ['host', '_id']);

	return (
		<Layout className={styles.gameContainer}>
			{loading ? <Loader active /> : <RoleCard {...role} />}
			{!loading && isHost && <Button onClick={() => restartGame(gameId)} color="green" style={{ marginTop: '50px' }}>Restart Game</Button>}
			{!loading && isHost && <Button onClick={() => endGame(gameId)} color="red" style={{ marginTop: '50px' }}>End Game!</Button>}
		</Layout>
	);
};
