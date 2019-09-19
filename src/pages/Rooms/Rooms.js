import React, { useEffect, useState } from 'react';
import { Layout } from '../../components';
import { Loader, Button, Input, Table } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { GET, PUT, POST } from '../../api';
import socket from '../../socket';
import _orderBy from 'lodash/orderBy';

import styles from './styles.module.scss';

const MAX_POSSIBLE_USERS = 10;

export default ({ history }) => {
	if (!socket.isConnected()) return <Redirect to="/" />;

	const [loading, setLoading] = useState(true);
	const [rooms, setRooms] = useState([]);
	const [roomName, setRoomName] = useState('');

	useEffect(() => {
		const updateHandler = room => {
			const newRooms = rooms.filter(r => r.roomId !== room.roomId).concat(room);
			setRooms(newRooms);
		};
		const deleteHandler = ({ roomId }) => {
			const newRooms = rooms.filter(r => r.roomId !== roomId);
			setRooms(newRooms);
		};
		const createHandler = room => setRooms(rooms.concat(room));
		socket.addEventListener('room deleted', deleteHandler);
		socket.addEventListener('room updated', updateHandler);
		socket.addEventListener('room created', createHandler);

		return () => {
			socket.removeEventListener('room deleted', deleteHandler);
			socket.removeEventListener('room updated', updateHandler);
			socket.removeEventListener('room created', createHandler);
		};
	}, [rooms]);

	useEffect(() => {
		GET('/rooms')
			.then(rooms => {
				setLoading(false);
				setRooms(rooms);
			})
			.catch(console.error); // TODO: what's the catch?!
	}, []);

	const joinRoom = roomId => {
		PUT(`/users/join-room`, { body: { roomId } })
			.then(_ => {
				history.push(`/rooms/${roomId}`);
			})
			.catch(console.error); // TODO: what's the catch?!
	};
	const keyUp = ({ keyCode }) => {
		if (keyCode !== 13) return;

		createRoom();
	};
	const createRoom = () => {
		POST(`/rooms`, { body: { name: roomName } })
			.then(({ _id }) => joinRoom(_id))
			.catch(console.error); // TODO: what's the catch?!
	};

	return (
		<Layout>
			{loading ? (
				<Loader />
			) : (
				<>
					<Table unstackable celled selectable striped>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Room Name</Table.HeaderCell>
								<Table.HeaderCell># Users</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{_orderBy(rooms, ['users'], ['desc']).map(
								({ name, _id, users }) => (
									<Table.Row
										key={_id}
										onClick={() => joinRoom(_id)}
										disabled={users.length >= MAX_POSSIBLE_USERS}
									>
										<Table.Cell>{name}</Table.Cell>
										<Table.Cell>{users.length}</Table.Cell>
									</Table.Row>
								)
							)}
						</Table.Body>
					</Table>
					{rooms.length === 0 && (
						<div className={styles.noRoomsMessage}>
							There are currently no rooms. Go ahead, create one!
						</div>
					)}
				</>
			)}
			<Input
				action
				placeholder="new room name..."
				onChange={({ target: { value } }) => setRoomName(value)}
				onKeyUp={keyUp}
			>
				<input />
				<Button onClick={createRoom} type="submit">
					Create
				</Button>
			</Input>
		</Layout>
	);
};
