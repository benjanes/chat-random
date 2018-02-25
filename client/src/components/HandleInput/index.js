import React, { Component } from 'react';
import { emitUserHandle } from '../../store/actions.js';
import { styles } from './styles.scss';

export default class HandleForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userHandle: '',
			isWarned: false
		};

		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput(e) {
		this.setState({ userHandle: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();

		if (this.state.userHandle.length) {
			this.props.setUserHandle(this.state.userHandle);
		} else {
			this.setState({ isWarned: true });
		}
	}

	render() {
		return (
			<main className={ `${styles}` }>
				<div className='form-holder'>
					<form
						id='user_handle_form'
						onSubmit={ this.handleSubmit }
					>
						<input
							type='text'
							value={ this.state.userHandle }
							placeholder='enter your handle'
							onChange={ this.handleInput }
						/>
					</form>
					<button
						type='submit'
						form='user_handle_form'
						value='Chat'
					>
						Let&rsquo;s Chat
					</button>
					{ this.state.isWarned && <p className='warning'>Handle cannot be an empty string!</p> }
				</div>
				<p className='instructions'>Enter your handle and we&rsquo;ll pair you with the first available rando. Hop off any time you'd like using <i>/hop</i> and we&rsquo;ll pair you up with someone new.</p>
			</main>
		);
	}
}



