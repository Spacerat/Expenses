import React, { Component } from 'react';
import {ExpenseDetail} from 'components'
import {fake_expenses} from 'api/fake_api'
import _ from 'lodash'

class Expense extends Component {
  render() {
    let id = this.props.params.id;
    var expense = _.find(fake_expenses, (e)=>e.id==id)
    var updateExpense = (e)=> {console.log("Updated expense", e)}
    var deleteExpense = (e)=> {console.log("Deleted expense", e)}
    var props = {expense, updateExpense, deleteExpense}
    return (
      <ExpenseDetail {...props} />
    );
  }
}

export default Expense;
