import React, { useState } from 'react';

import { ReactComponent as Merlin } from '../../assets/images/Merlin.svg';
import { ReactComponent as Percival } from '../../assets/images/Percival.svg';
import { ReactComponent as Assassin } from '../../assets/images/Assassin.svg';
import { ReactComponent as Morgana } from '../../assets/images/Morgana.svg';
import { ReactComponent as VanillaGood } from '../../assets/images/Vanilla Good.svg';
import { ReactComponent as Mordred } from '../../assets/images/Mordred.svg';
import { ReactComponent as VanillaEvil } from '../../assets/images/Vanilla Evil.svg';
import { ReactComponent as Oberon } from '../../assets/images/Oberon.svg';

import { ReactComponent as LadyGood } from '../../assets/images/LadyGood.svg';
import { ReactComponent as LadyEvil } from '../../assets/images/LadyEvil.svg';

import { FlipCard } from '../../components';

import { Card, Button } from 'semantic-ui-react';

import classnames from 'classnames';

import styles from './styles.module.scss';

export default ({ team, role, knowledge }) => {
	if (!role) return 'div';

	const [isFlipped, setIsFlipped] = useState(false);
	const [flipView, setFlipView] = useState('role');

	const isEvil = /evil/i.test(team);

	let Role = null;
	let Description = 'div';
	switch (role) {
		case 'Merlin': {
			Role = Merlin;
			Description = () => (
				<span>
					You are Merlin, the ultimate good! Keep an eye on{' '}
					<strong>{knowledge['First Evil']}</strong> and{' '}
					<strong>{knowledge['Second Evil']}</strong>
				</span>
			);
			break;
		}
		case 'Percival':
			Role = Percival;
			Description = () => (
				<span>
					You are Percival! Try to figure out who is who between{' '}
					<strong>{knowledge['First Unknown']}</strong> and{' '}
					<strong>{knowledge['Second Unknown']}</strong>
				</span>
			);
			break;
		case 'Assassin':
			Role = Assassin;
			Description = () => (
				<span>
					Morgana is <strong>{knowledge['Morgana']}</strong>
					<br />
					Mordred is <strong>{knowledge['Mordred']}</strong>
				</span>
			);
			break;
		case 'Morgana':
			Role = Morgana;
			Description = () => (
				<span>
					You are Morgana! Percival can't tell you apart from Merlin! Assassin
					is <strong>{knowledge['Assassin']}</strong>
					<br />
					Mordred is <strong>{knowledge['Mordred']}</strong>
				</span>
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
				<span>
					You are Mordered! Not even Merlin knows you are evil! Assassin is{' '}
					<strong>{knowledge['Assassin']}</strong>
					<br />
					Morgana is <strong>{knowledge['Morgana']}</strong>
				</span>
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

	const changeView = (view) => {
		setFlipView(view);
		setIsFlipped(true);
	};

	return (
		<FlipCard disabled flipped={isFlipped}>
			<Card className={styles.roleCard}>
				<Card.Content className={styles.cardback} key="option-pane">
					<Card.Description className={styles.actions}>
						<Button onClick={() => changeView('role')}>Role</Button>
						<Button onClick={() => changeView('lady')}>Lady</Button>
					</Card.Description>
				</Card.Content>
			</Card>
			{flipView === 'role' ? (
				<Card className={styles.roleCard}>
					<Button
						icon="times"
						className={styles.xButton}
						onClick={() => setIsFlipped(false)}
					/>
					<Role />
					<Card.Content>
						<Card.Description>
							<Description />
						</Card.Description>
					</Card.Content>
				</Card>
			) : (
				<Card className={styles.roleCard}>
					<Button
						icon="times"
						className={styles.xButton}
						onClick={() => setIsFlipped(false)}
					/>
					<Card.Content>
						{isEvil ? <LadyEvil /> : <LadyGood />}
					</Card.Content>
				</Card>
			)}
		</FlipCard>
	);
};
