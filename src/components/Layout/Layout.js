import React from 'react';

import { Container } from 'semantic-ui-react';

import styles from "./styles.module.scss"

export default ({ children }) => <Container className={styles.Layout}>{children}</Container>;
