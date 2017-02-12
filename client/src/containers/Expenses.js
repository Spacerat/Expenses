import React, { Component } from 'react';
import {ExpensesTable} from 'components'

class Expenses extends Component {
  render() {
    var fake_expenses = [
      {id: 1, amount: '$15.00', datetime: '1992-12-12'},
      {id: 2, amount: '$45.00', datetime: '1992-12-15', description: 'KFC blowout'},
      {id: 3, amount: '$125.00', datetime: '1992-12-21'},
      {id: 4, amount: '$125.00', datetime: '1992-12-24'},
      ];
    var createExpense = (e)=>console.log("Created expense", e)
    return (
      <ExpensesTable expenses={fake_expenses} createExpense={createExpense} />
    );
  }
}

export default Expenses;