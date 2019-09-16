import React, { useState } from 'react';

import { Input, Button, Loader } from 'semantic-ui-react';
import socket from '../../socket';

import styles from './styles.module.scss';
import { Layout } from '../../components';

export default ({ history }) => {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');

	const keyUp = ({ keyCode }) => {
		if (keyCode !== 13) return;
		submitName();
	};
	const submitName = () => {
		setLoading(true);
		socket.connect({ name });
		socket.addEventListener('handshake completed', () => {
			socket.removeEventListener('handshake completed');
			history.push('/rooms');
		});
	};

	return (
		<Layout>
			{loading ? (
				<Loader active />
			) : (
				<>
					<h1 className={`${styles.welcome} ${styles.first}`}>Welcome</h1>
					<h1 className={`${styles.welcome} ${styles.second}`}>To</h1>
					<h1 className={`${styles.welcome} ${styles.third}`}>Avalon</h1>
					<Input action value={name} placeholder="Who are you...?" onKeyUp={keyUp} onChange={({ target: { value } }) => setName(value)}>
						<input />
						<Button onClick={submitName} type="submit">Play</Button>
					</Input>
				</>
			)}
		</Layout>
	);
};
