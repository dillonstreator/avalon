import React from 'react';

import classnames from 'classnames';

import styles from './styles.module.scss';

import Assassin from '../../assets/images/Assassin.svg';
import Merlin from '../../assets/images/Merlin.svg';
import Mordred from '../../assets/images/Mordred.svg';
import Morgana from '../../assets/images/Morgana.svg';
import Oberon from '../../assets/images/Oberon.svg';
import Percival from '../../assets/images/Percival.svg';
import VanillaEvil from '../../assets/images/Vanilla Evil.svg';
import VanillaGood from '../../assets/images/Vanilla Good.svg';

const imgMap = {
	'Assassin': Assassin,
	'Merlin': Merlin,
	'Mordred': Mordred,
	'Oberon': Oberon,
	'Percival': Percival,
	'Vanilla Evil': VanillaEvil,
	'Vanilla Good': VanillaGood,
	'Morgana': Morgana,
};

export default ({ team, role, knowledge = {} }) => {
	const isEvil = /evil/i.test(team);

	const className = classnames({
		[styles.evil]: isEvil,
		[styles.good]: !isEvil,
		[styles.roleCard]: true,
	});

	return (
		<div className={className}>
			<img src={imgMap[role]} alt={role} />
			<p className={styles.message}>
				<ul>
					{Object.keys(knowledge).map(k => (
						<li key={k}>
							<span>{k}: <strong>{knowledge[k]}</strong></span>
						</li>
					))}
				</ul>
			</p>
		</div>
	);
};
