import React, { Component } from 'react';
import {ExpensesTable} from 'components'
import { connect } from 'react-redux'
import { fetchExpenses, createExpense } from 'actions'

class Expenses extends Component {
	componentDidMount() {
		this.props.fetchExpenses()
	}
	render() {
    	return <ExpensesTable {...this.props} />
 	}
}

export default connect(
	({expenses}) => ({expenses}),
	{fetchExpenses, createExpense}
)(Expenses)
