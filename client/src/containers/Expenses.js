import React, { Component } from 'react';
import {ExpensesTable} from 'components'
import { connect } from 'react-redux'
import { fetchExpenses, createExpense } from 'actions'

class Expenses extends Component {
	componentDidMount() {
		const user = this.props.user;
		this.props.fetchExpenses(user ? {user} : {})
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.user && !nextProps.user) {
			this.props.fetchExpenses()
		}
	}
	render() {
    	return <ExpensesTable {...this.props} />
 	}
}

export default connect(
	({expenses}, {params}) => ({expenses, user: params.userid}),
	{fetchExpenses, createExpense}
)(Expenses)
