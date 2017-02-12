import React, { Component } from 'react';
import _ from 'lodash'
import 'css/ExpensesTable.css';

function ExpenseEntry() {
    return (<tr> 
        <td>
            <input type="date" name="date" />
            <input type="time" name="time" />
        </td>
        <td><input type="number" step="0.01" min="0" name="amount" placeholder="0.00" /></td>
        <td><input type="text" name="description" placeholder="Description of expense" /></td>
        <td><input type="submit" /></td>
    </tr>)
}

function ExpenseRow({amount, description, datetime, id}) {
    return (<tr>
        <td>{datetime}</td>
        <td>{amount}</td>
        <td>{description}</td>
        <td>Edit</td>
    </tr>)
}

class ExpensesTable extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.createExpense(e)        
    }

    render() {
        const {expenses} = this.props
        return (
          <div className="ExpensesTable">
            <h3>Your expenses</h3>
            <form onSubmit={this.handleSubmit}>
            <table>
                <thead>
                    <tr><th>Date</th><th>Amount</th><th>Description</th><th></th></tr>
                </thead>
                <tbody>
                    {_.map(expenses, (e)=><ExpenseRow key={e.id} {...e} />)}
                </tbody>
                <tfoot>
                    <ExpenseEntry />
                </tfoot>
            </table>
            </form>
          </div>
        );
    }
}

export default ExpensesTable;
