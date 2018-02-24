import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<header>
				<h1>Chat Random</h1>
				{ this.props.userHandle && <h4>Welcome, { this.props.userHandle }</h4> }
			</header>
		);
	}
}

function mapStateToProps({ appData }) {
	return {
		userHandle: appData.userHandle
	};
}

export default connect(mapStateToProps)(Header);
