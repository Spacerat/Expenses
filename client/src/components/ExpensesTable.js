import React, { Component } from 'react';
import _ from 'lodash'
import 'css/DataTable.css';
import 'css/App.css';
import dateFormat from 'dateformat'

function ExpenseEntry() {
    return (<tr> 

        <td>
            <input className="form-control inline-datetime" type="date" name="date" />
            <input className="form-control" type="time" name="time" />
        </td>
        <td><input className="form-control" type="number" step="0.01" min="0" name="amount" placeholder="0.00" /></td>
        <td><input className="form-control" type="text" name="description" placeholder="Description of expense" /></td>
        <td><input className="form-control" type="submit" /></td>
    </tr>)
}

function ExpenseRow({display_amount, description, datetime, id}) {
    return (<tr>
        <td>{dateFormat(datetime, "yyyy-mm-dd HH:MM")}</td>
        <td>{display_amount}</td>
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
          <div>
            <h3>Your expenses</h3>
            <form className="form-inline" onSubmit={this.handleSubmit}>
            <table className="table table-striped">
                <thead>
                    <tr><th>Date</th><th>Amount</th><th>Description</th><th></th></tr>
                </thead>
                <tbody>
                    {_.map(expenses, (e)=><ExpenseRow key={e.id} {...e} />)}
                </tbody>
                <tfoot>
                    <tr><td colSpan="4"><h4>Add Expense</h4></td></tr>
                    <ExpenseEntry />
                </tfoot>
            </table>
            </form>
          </div>
        );
    }
}

export default ExpensesTable;
