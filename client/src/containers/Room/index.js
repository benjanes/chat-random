import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styles } from './styles.scss';

import { bindActionCreators } from 'redux';
import { setRoomJoined } from '../../store/actions.js';

class Room extends Component {
	constructor(props) {
		super(props);

		this.state = {
			msg: '',
			timers: []
		};

		this.scrollDisplay = this.scrollDisplay.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLeaveBtnClick = this.handleLeaveBtnClick.bind(this);
		this.sendMsg = this.sendMsg.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.chatMsgs.length !== this.props.chatMsgs.length) {
			// scroll the box
			this.scrollDisplay();
		}
	}

	scrollDisplay() {
		const diff = this.list.offsetHeight - this.display.offsetHeight;

		if (diff) {
			this.display.scrollTop = diff;
		}
	}

	handleInput(e) {
		this.setState({ msg: e.target.value });
	}

	handleSubmit(e) {
		if (this.props.chatEnded) {
			e.preventDefault();
			return;
		}

		if (/\/hop/.test(this.state.msg)) {
			this.handleLeaveBtnClick();
			e.preventDefault();
			return;
		}

		if (/^\/delay\s\d+\s.+/.test(this.state.msg)) {
			this.state.msg.replace(/^\/delay\s(\d+)\s(.+)/, (match, dur, msg) => {
				let sendMsg = () => this.sendMsg(msg);
				this.setState({ msg: '' });
				this.state.timers.push(setTimeout(sendMsg, parseInt(dur)));
			});

			e.preventDefault();
			return;
		}

		this.sendMsg(this.state.msg);
		this.setState({ msg: '' });
		e.preventDefault();
	}

	handleLeaveBtnClick(e) {
		this.props.leaveChat(true);
		this.state.timers.forEach(timer => clearTimeout(timer));
		
		// automatically bump to lobby by updating roomJoined
		this.props.setRoomJoined(false);

		if (e) e.preventDefault();
	}

	sendMsg(msg) {
		this.props.sendMsg({
			msg,
			handle: this.props.userHandle
		});
	}

	render() {
		return (
			<main className={ `${styles}` }>
				{ this.props.partnerHandle &&
					<h4>Your partner is "<span className='partner-handle'>{ this.props.partnerHandle }</span>"</h4>
				}
				
				<div className='display-holder'>
					<div
						className='chat-holder'
						ref={ display => this.display = display }
					>
						<ul
							className='chat-list'
							ref={ list => this.list = list }
						>
							{ this.props.chatMsgs.map((chat, idx) => (
								<li
									key={ idx }
									className={ `chat-msg ${ chat.handle === this.props.userHandle ? 'user' : 'partner' }` }
								>
									{ chat.msg }
								</li>
							))}
						</ul>

					</div>
					{
						this.props.chatEnded &&
						<p className='overlay'>The other user has left this chat. Click below to return to the lobby!</p>
					}
				</div>

				<form
					id='chat_msg_form'
					className={ this.props.chatEnded ? 'chat-msg-form disabled' : 'chat-msg-form' }
					onSubmit={ this.handleSubmit }
				>
					<input
						type='text'
						value={ this.state.msg }
						onChange={ this.handleInput }
						disabled={ this.props.chatEnded }
					/>
					<button
						type='submit'
						form='chat_msg_form'
						value='Send'
					>
						Send
					</button>
				</form>

				<p className='instructions'>
					ChatRandom has two special commands that can be used in the chat. Entering <b>/hop</b> will hop 
					you out of this chat session and into another. Entering <b>/delay <i>time_in_ms</i> your message</b> will
					send out a delayed message to the chat. This chat session can also be hopped out of by clicking below.
				</p>

				<button
					className='hop-btn'
					onClick={ this.handleLeaveBtnClick }
				>
					Hop this chat
				</button>
			</main>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ setRoomJoined }, dispatch);
}

function mapStateToProps({ chatMsgs, userHandle, partnerHandle, chatEnded }) {
	return { chatMsgs, userHandle, partnerHandle, chatEnded };
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
