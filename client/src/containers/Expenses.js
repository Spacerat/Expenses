import React, { Component } from 'react';
import {ExpensesTable} from 'components'
import {fake_expenses} from 'api/fake_api'

class Expenses extends Component {
  render() {
    var createExpense = (e)=> {console.log("Created expense", e)}
    return (
      <ExpensesTable expenses={fake_expenses} createExpense={createExpense} />
    );
  }
}

export default Expenses;
