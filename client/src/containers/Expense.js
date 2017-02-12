import React, { Component } from 'react';
import {ExpenseDetail} from 'components'

class Expense extends Component {
  render() {
    var expense = {
    	id: 2, 
    	amount: '12.15', 
    	datetime: new Date('2011-05-31T19:55:00Z'), 
    	description: 'KFC blowout'
    };
    var updateExpense = (e)=> {console.log("Updated expense", e)}
    var deleteExpense = (e)=> {console.log("Deleted expense", e)}
    var props = {expense, updateExpense, deleteExpense}
    return (
      <ExpenseDetail {...props} />
    );
  }
}

export default Expense;
