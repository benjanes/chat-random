import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styles } from './styles.scss';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<header className={ `${styles}` }>
				<h1>
					<span>Chat</span><span>Random</span>
				</h1>
				{ this.props.userHandle &&
					<h4>Welcome, <span className='user-handle'>{ this.props.userHandle }</span></h4>
				}
			</header>
		);
	}
}

function mapStateToProps({ userHandle }) {
	return { userHandle };
}

export default connect(mapStateToProps)(Header);
