import React, { Component } from 'react';
import {LoginForm} from 'components'
import {login} from 'api'
import {browserHistory} from 'react-router'

import { fetchOwnUser } from 'actions'
import { connect } from 'react-redux'

class Login extends Component {
	doLogin = (username, password) => {
		login(username, password).then(()=> {
			browserHistory.push('/expenses')
			this.props.fetchOwnUser()
		}).catch((err)=> {
			console.log(err)
		})
	}
	render() {
		return (<LoginForm login={this.doLogin} />);
  }
}

export default connect(null, {fetchOwnUser})(Login);
