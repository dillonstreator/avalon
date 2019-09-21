/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import { POST } from '../../api';
import { Layout } from '../../components';
import { withToggle } from '../../hocs';
import { authenticated } from '../../utils/auth';

import { Form, Button, Message } from 'semantic-ui-react';
import _get from 'lodash/get';

import styles from './styles.module.scss';

const onChange = setter => ({ target: { value } }) => setter(value);

const Login = ({ toggle: goToLogin, finish }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const login = () => {
		setError(null);
		setLoading(true);
		POST('/users/login', { body: { username, password } })
			.then(authenticated)
			.then(finish)
			.catch(e => {
				setPassword('');
				setError(e);
			})
			.finally(() => setLoading(false));
	};

	let errorProps = {};
	if (error) {
		switch (_get(error, 'response.status', null)) {
			case 400:
				errorProps = { header: 'username or password is incorrect...' };
				break;
			default:
				errorProps = { header: 'there was an unexpected error... sorry :(' };
				break;
		}
	}

	return (
		<div>
			<h1>Login</h1>
			{error && <Message error {...errorProps} />}
			<Form className={styles.form} loading={loading}>
				<Form.Input
					required
					value={username}
					placeholder="Username..."
					autoFocus
					onChange={onChange(setUsername)}
				/>
				<Form.Input
					required
					type="password"
					value={password}
					placeholder="Password..."
					onChange={onChange(setPassword)}
				/>
				<Button primary onClick={login}>
					Login
				</Button>
			</Form>
			<br />
			<a onClick={goToLogin}>Not a member yet? Register here!</a>
		</div>
	);
};

const Register = ({ toggle: goToLogin, finish }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [passwordsMatch, setPasswordsMatch] = useState(false);
	const [attemptedRegister, setAttemptedRegiser] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const register = () => {
		!attemptedRegister && setAttemptedRegiser(true);

		if (!passwordsMatch) return;
		setPasswordsMatch(true);

		setLoading(true);
		setError(null);
		POST('/users', { body: { username, displayName, password } })
			.then(authenticated)
			.then(finish)
			.catch(setError)
			.finally(() => setLoading(false));
	};

	const showPasswordError = attemptedRegister && !passwordsMatch;

	let errorProps = {};
	if (error) {
		switch (_get(error, 'response.status', null)) {
			case 400:
				errorProps = { header: 'username, display name, and password are required', content: [ _get(error, 'response.statusText', null) ] };
				break;
			default:
				errorProps = { header: 'there was an unexpected error... sorry :(' };
				break;
		}
	}

	return (
		<div>
			<h1>Register</h1>
			{error && <Message error {...errorProps} />}
			<Form loading={loading} className={styles.form}>
				<Form.Input
					required
					value={username}
					placeholder="Username..."
					autoFocus
					onChange={onChange(setUsername)}
				/>
				<Form.Input
					required
					value={displayName}
					placeholder="Display name..."
					onChange={onChange(setDisplayName)}
				/>
				<Form.Input
					required
					type="password"
					value={password}
					placeholder="Password..."
					onChange={onChange(setPassword)}
				/>
				<Form.Input
					{...(showPasswordError ? { error: 'passwords do not match' } : {})}
					required
					type="password"
					value={passwordConfirm}
					placeholder="Password confirmation..."
					onChange={({ target: { value } }) => {
						setPasswordsMatch(value === password);
						setPasswordConfirm(value);
					}}
				/>
				<Button primary onClick={register}>
					Register
				</Button>
			</Form>
			<br />
			<a onClick={goToLogin}>Already a member? Login here!</a>
		</div>
	);
};

const Auth = ({ opened: showRegister, toggle, history }) => {
	const finish = () => {
		const redirect = _get(history, 'location.search.redirect', '/');
		history.push(redirect);
	};

	return (
		<Layout>
			{showRegister ? (
				<Register toggle={toggle} finish={finish} />
			) : (
				<Login toggle={toggle} finish={finish} />
			)}
		</Layout>
	);
};

export default withToggle(Auth);
