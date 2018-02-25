import React, { Component } from 'react';
import { connect } from 'react-redux';

// components & containers
import Header from '../Header';
import HandleInput from '../../components/HandleInput';
import Lobby from '../../components/Lobby';
import Room from '../Room';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Header/>
				
				{ !this.props.userHandle &&
					<HandleInput setUserHandle={ this.props.socketDispatch.setUserHandle }/>
				}
				{ this.props.userHandle && !this.props.roomJoined &&
					<Lobby />
				}
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
