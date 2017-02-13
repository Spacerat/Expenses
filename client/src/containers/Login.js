import React, { Component } from 'react';
import {LoginForm} from 'components'
import {login} from 'api'
import {browserHistory} from 'react-router'

class Expense extends Component {
	doLogin = (username, password) => {
		login(username, password).then(()=> {
			browserHistory.push('/expenses')
		}).catch((err)=> {
			console.log(err)
		})
	}
	render() {
		return (<LoginForm login={this.doLogin} />);
  }
}

export default Expense;
