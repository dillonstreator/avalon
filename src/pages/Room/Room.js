import React, { useEffect, useState, useCallback } from 'react';

import { connect } from 'react-redux';
import { actions as roomActions } from '../../ducks/rooms';

import { Redirect } from 'react-router-dom';
import { List, Loader, Container, Button } from 'semantic-ui-react';
import _get from 'lodash/get';
import classnames from 'classnames';
import { Layout } from '../../components';
import socket from '../../socket';
import { GET, PUT, POST } from '../../api';
import { getMe } from '../../utils/auth';

import styles from './styles.module.scss';

const MIN_POSSIBLE_USERS = 5;

const Room = ({ match, history, room = {}, addRoom }) => {	
	const [loading, setLoading] = useState(true);

	const roomId = _get(match, 'params.roomId');

	const startGame = theRoomId => {
		POST(`/games`, { body: { roomId: theRoomId } }).catch(console.error); // TODO: what's the catch?!
	};

	const gameStartHandler = useCallback(
		({ _id }) => history.push(`/games/${_id}`),
		[history]
	);

	useEffect(() => {
		setLoading(true);
		GET(`/rooms/${roomId}`)
			.then(r => {
				addRoom(r);
				socket.addEventListener('game started', gameStartHandler);
			})
			.catch(console.error)
			.finally(() => setLoading(false)); // TODO: what's the catch?!

			
		return () => {
			socket.removeEventListener('game started', gameStartHandler);
			PUT(`/users/leave-room`)
				.then(() => {})
				.catch(console.error); // TODO: what's the catch?!
		};
	}, [roomId, gameStartHandler, addRoom]);

	if (!socket.isConnected()) return <Redirect to="/" />;
	
	const { name, users, host = {} } = room;
	const { _id: hostId } = host;
	const isHost = getMe()._id === hostId;
	const canStartGame = isHost && users.length >= MIN_POSSIBLE_USERS;

	return (
		<Layout>
			{loading ? (
				<Loader active />
			) : (
				<Container>
					<h1>Room: {name}</h1>
					<List>
						{users.map(({ _id, displayName, isConnected }) => {
							const itemClassnNames = classnames({
								[styles.listItem]: true,
								[styles.disconnected]: !isConnected,
							});
							return (
								<List.Item className={itemClassnNames} key={_id}>
									{displayName}
								</List.Item>
							);
						})}
					</List>
					{canStartGame && (
						<Button onClick={() => startGame(roomId)}>Start Game</Button>
					)}
				</Container>
			)}
		</Layout>
	);
};

const mapStateToProps = ({ rooms }, props) => ({
	room: rooms[_get(props, 'match.params.roomId')],
});
const mapDispatchToProps = dispatch => ({
	addRoom: room => dispatch(roomActions.addRoom(room)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
