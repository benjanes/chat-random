import React from 'react';
import { styles } from './styles.scss';

export default function Lobby(props) {

	return (
		<main className={ `${styles}` }>
			<p>No one is currently waiting to chat. Please stand by.</p>
		</main>
	)
}
