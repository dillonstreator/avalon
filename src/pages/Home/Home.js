import React, { useState } from 'react';

import { Input, Button, Loader } from 'semantic-ui-react';
import socket from '../../socket';

import styles from './styles.module.scss';
import { Layout } from '../../components';

export default ({ history }) => {
	const [loading, setLoading] = useState(false);

	const selectName = ({ keyCode, target: { value: name } }) => {
		if (keyCode !== 13) return;

		setLoading(true);
		socket.connect({ name });
		socket.addEventListener('handshake completed', () => {
			history.push('/rooms');
			socket.removeEventListener('handshake completed');
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
					<Input action placeholder="Who are you...?" onKeyUp={selectName}>
						<input />
						<Button type="submit">Play</Button>
					</Input>
				</>
			)}
		</Layout>
	);
};
