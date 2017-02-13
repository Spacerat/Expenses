import React, { Component } from 'react';
import {ExpensesTable} from 'components'
import { connect } from 'react-redux'
import { fetchExpenses } from 'actions'

class Expenses extends Component {
	componentDidMount() {
		this.props.fetchExpenses()
	}
	render() {
    	var createExpense = (e)=> {console.log("Created expense", e)}
    	return (
     		<ExpensesTable expenses={this.props.expenses} createExpense={createExpense} />
    	);
 	}
}

export default connect(
	({expenses}) => ({expenses}),
	{fetchExpenses}
)(Expenses)
