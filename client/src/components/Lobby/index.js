import React from 'react';
import { styles } from './styles.scss';

export default function Lobby(props) {

	return (
		<main className={ `${styles}` }>
			<p>No one is currently waiting to chat. Please stand by.</p>

			<div className='hourglass-holder'>
				<svg width='200' height='200' viewBox='0 0 200 200'>
					<defs>
						<clipPath id='top'>
							<path d='M 50 25 L 150 25 L 100 100 Z'/>
						</clipPath>
						<clipPath id='btm'>
							<path d='M 50 175 L 150 175 L 100 100 Z'/>
						</clipPath>
					</defs>
					<g>
						<path className='hourglass' d='M 50 25 L 150 25 L 100 100 Z'/>
						<path className='hourglass' d='M 50 175 L 150 175 L 100 100 Z'/>
						<rect className='sand top' x='50' y='25' width='100' height='75' clipPath='url(#top)'/>
						<rect className='sand btm' x='50' y='175' width='100' height='75' clipPath='url(#btm)'/>
					</g>
				</svg>
			</div>
		</main>
	)
}
