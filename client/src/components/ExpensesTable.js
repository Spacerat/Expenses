import React, { Component } from 'react';
import _ from 'lodash'
import 'css/ExpensesTable.css';

function ExpenseRow({amount, description, datetime, id}) {
	return (<tr key={id}>
		<td>{datetime}</td><td>{amount}</td><td>{description}</td>
	</tr>)
}

class ExpensesTable extends Component {
  render() {
  	const {expenses} = this.props
    return (
      <div className="ExpensesTable">
        <h3>Your expenses</h3>
        <table>
	        <thead>
	        	<tr><th>Date</th><th>Amount</th><th>Description</th></tr>
	        </thead>
	        <tbody>
	        	{_.map(expenses, (e)=><ExpenseRow {...e} />)}
	        </tbody>
        </table>
      </div>
    );
  }
}

export default ExpensesTable;
