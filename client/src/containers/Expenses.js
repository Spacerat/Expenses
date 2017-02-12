import React, { Component } from 'react';
import {ExpensesTable} from 'components'

class Expenses extends Component {
  render() {
    var fake_expenses = [
      {id: 1, display_amount: '$15.00', datetime: '2011-05-03T19:55:00Z'},
      {id: 2, display_amount: '$45.00', datetime: '2011-05-05T19:55:00Z', description: 'KFC blowout'},
      {id: 3, display_amount: '$125.00', datetime: '2011-05-09T19:55:00Z'},
      {id: 4, display_amount: '$125.00', datetime: '2011-05-21T19:55:00Z'},
      ];
    var createExpense = (e)=> {console.log("Created expense", e)}
    return (
      <ExpensesTable expenses={fake_expenses} createExpense={createExpense} />
    );
  }
}

export default Expenses;
