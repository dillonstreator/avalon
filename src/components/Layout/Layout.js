import React from 'react';

import { Container } from 'semantic-ui-react';

import styles from './styles.module.scss';

export default ({ children, className = '' }) => (
	<Container className={`${styles.Layout} ${className}`}>{children}</Container>
);
