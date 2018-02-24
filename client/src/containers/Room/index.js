import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { setRoomJoined } from '../../store/actions.js';

class Room extends Component {
	constructor(props) {
		super(props);

		this.state = {
			msg: ''
		};

		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLeaveBtnClick = this.handleLeaveBtnClick.bind(this);
	}

	handleInput(e) {
		this.setState({ msg: e.target.value });
	}

	handleSubmit(e) {
		this.props.sendMsg({
			msg: this.state.msg,
			handle: this.props.userHandle
		});

		this.setState({ msg: '' });
		e.preventDefault();
	}

	handleLeaveBtnClick(e) {
		this.props.leaveChat(true);
		
		// automatically bump to lobby by updating roomJoined
		this.props.setRoomJoined(false);


		e.preventDefault();
	}

	render() {
		return (
			<div>
				{ this.props.chatMsgs.map((chat, idx) => <p key={ idx }>{ chat.handle }: { chat.msg }</p>) }

				<form
					id='chat_msg_form'
					onSubmit={ this.handleSubmit }
				>
					<input
						type='text'
						value={ this.state.msg }
						onChange={ this.handleInput }
					/>
				</form>
				<button
					style={{ opacity: this.props.chatEnded ? 0.5 : 1 }}
					type='submit'
					form='chat_msg_form'
					value='Send'
				>
					Send
				</button>

				<button
					onClick={ this.handleLeaveBtnClick }
				>
					Leave this chat
				</button>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ setRoomJoined }, dispatch);
}

function mapStateToProps({ appData }) {
	return {
		chatMsgs: appData.chatMsgs,
		userHandle: appData.userHandle,
		chatEnded: appData.chatEnded
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
