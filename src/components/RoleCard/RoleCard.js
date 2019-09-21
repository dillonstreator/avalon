import React from 'react';

import { ReactComponent as Merlin } from '../../assets/images/Merlin.svg';
import { ReactComponent as Percival } from '../../assets/images/Percival.svg';
import { ReactComponent as Assassin } from '../../assets/images/Assassin.svg';
import { ReactComponent as Morgana } from '../../assets/images/Morgana.svg';
import { ReactComponent as VanillaGood } from '../../assets/images/Vanilla Good.svg';
import { ReactComponent as Mordred } from '../../assets/images/Mordred.svg';
import { ReactComponent as VanillaEvil } from '../../assets/images/Vanilla Evil.svg';
import { ReactComponent as Oberon } from '../../assets/images/Oberon.svg';

import { Card } from 'semantic-ui-react';

import classnames from 'classnames';

import styles from './styles.module.scss';

export default ({ team, role, knowledge }) => {
	if (!role) return 'div';

	const isEvil = /evil/i.test(team);

	const className = classnames({
		[styles.evil]: isEvil,
		[styles.good]: !isEvil,
		[styles.roleCard]: true,
	});

	let Role = null;
	let Description = 'div';
	switch (role) {
		case 'Merlin': {
			Role = Merlin;
			Description = () => (
				<span>You are Merlin, the ultimate good! Keep an eye on <strong>{knowledge['First Evil']}</strong> and <strong>{knowledge['Second Evil']}</strong></span>
			);
			break;
		}
		case 'Percival':
			Role = Percival;
			Description = () => (
				<span>You are Percival! Try to figure out who is who between <strong>{knowledge['First Unknown']}</strong> and <strong>{knowledge['Second Unknown']}</strong></span>
			);
			break;
		case 'Assassin':
			Role = Assassin;
			Description = () => (
				<span>Morgana is <strong>{knowledge['Morgana']}</strong><br />Mordred is <strong>{knowledge['Mordred']}</strong></span>
			);
			break;
		case 'Morgana':
			Role = Morgana;
			Description = () => (
				<span>Assassin is <strong>{knowledge['Assassin']}</strong><br />Mordred is <strong>{knowledge['Mordred']}</strong></span>
			);
			break;
		case 'Vanilla Good':
			Role = VanillaGood;
			Description = () => (
				<span>Good luck finding out your good teamates...</span>
			);
			break;
		case 'Mordred':
			Role = Mordred;
			Description = () => (
				<span>Assassin is <strong>{knowledge['Assassin']}</strong><br />Morgana is <strong>{knowledge['Morgana']}</strong></span>
			);
			break;
		case 'Vanilla Evil':
			Role = VanillaEvil;
			Description = 'div';
			break;
		case 'Oberon':
			Role = Oberon;
			Description = 'div';
			break;
		default:
			Role = 'div';
			Description = 'div';
			break;
	}

	return (
		<Card className={className}>
			<Role />
			<Card.Content>
				<Card.Description>
					<Description />
				</Card.Description>
			</Card.Content>
		</Card>
	);
};
