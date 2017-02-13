import React, { Component } from 'react';
import { UsersList } from 'components'
import { connect } from 'react-redux'
import { fetchUsers } from 'actions'

class Users extends Component {
	componentDidMount() {
		this.props.fetchUsers()
	}
	render() {
    	return <UsersList {...this.props} />
 	}
}

export default connect(
	({users}) => ({users}),
	{fetchUsers}
)(Users)
