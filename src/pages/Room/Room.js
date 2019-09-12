import React, { useEffect, useState } from 'react';

import { Layout } from '../../components';
import { Redirect } from 'react-router-dom';
import socket from '../../socket';
import _get from 'lodash/get';
import { GET } from '../../api';
import { List, Loader, Container, Button } from 'semantic-ui-react';

export default props => {
	if (!socket.isConnected()) {
		alert('you must enter your username before joining or creating a room');
		return <Redirect to="/" />;
	}

	const [room, setRoom] = useState({});
	const [loading, setLoading] = useState(true);

	const roomId = _get(props, 'match.params.roomId');

	useEffect(() => {
		const updateHandler = newRoom => {
			if (newRoom.roomId !== roomId) return;
			setRoom(newRoom);
		};
		setLoading(true);
		GET(`/rooms/${roomId}`)
			.then(newRoom => {
				setRoom(newRoom);
				setLoading(false);
				socket.addEventListener('room updated', updateHandler);
			})
			.catch(console.error); // TODO: what's the catch?!

		return () => socket.removeEventListener('room updated', updateHandler);
	}, [roomId]);

	const { roomName, hostId, users } = room;
	const isHost = socket.getClientId() === hostId;
	const canStartGame = isHost && users.length > 2;

	return (
		<Layout>
			{loading ? (
				<Loader active />
			) : (
				<Container>
					<h1>Room: {roomName}</h1>

					<List>
						{users.map(user => (
							<List.Item key={user}>{user}</List.Item>
						))}
					</List>

					{canStartGame && <Button>Start Game</Button>} { /* // TODO: Make this start the game... */ }
				</Container>
			)}
		</Layout>
	);
};
