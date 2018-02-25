import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import Header from '../../containers/Header';
import HandleInput from '../HandleInput';
import Lobby from '../Lobby';
import Room from '../../containers/Room';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Header/>
				
				{ !this.props.userHandle && <HandleInput setUserHandle={ this.props.socketDispatch.setUserHandle }/> }
				{ this.props.userHandle && !this.props.roomJoined && <Lobby /> }
				{ this.props.userHandle && this.props.roomJoined &&
					<Room
						sendMsg={ this.props.socketDispatch.sendMsg }
						leaveChat={ this.props.socketDispatch.leaveChatSession }
					/>
				}
				
			</div>
		);
	}
}

function mapStateToProps({ userHandle, roomJoined }) {
	return { userHandle, roomJoined };
}

export default connect(mapStateToProps)(App);

