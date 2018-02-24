import React, { Component } from 'react';
import { emitUserHandle } from '../../store/actions.js';

export default class SetHandle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userHandle: ''
		};

		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput(e) {
		this.setState({ userHandle: e.target.value });
	}

	handleSubmit(e) {
		// dispatch to redux
		e.preventDefault();
		this.props.setUserHandle(this.state.userHandle);
	}

	render() {
		return (
			<main>
				<form
					id='user_handle_form'
					onSubmit={ this.handleSubmit }
				>
					<label htmlFor='user_handle'>Enter your user handle</label>
					<input
						type='text'
						id='user_handle'
						value={ this.state.userHandle }
						onChange={ this.handleInput }
					/>
				</form>
				<button
					type='submit'
					form='user_handle_form'
					value='Chat'
				>
					Chat!
				</button>
			</main>
		);
	}
}



