import React from 'react';

import classnames from 'classnames';

import styles from './styles.module.scss';

export default ({ team, role, message }) => {
	const isEvil = team === 'evil';
	const className = classnames({
		[styles.evil]: isEvil,
		[styles.good]: !isEvil,
		[styles.roleCard]: true,
	});

	return (
		<div className={className}>
			<p className={styles.role}>{role}</p>
			<p className={styles.message}>{message}</p>
		</div>
	);
};
