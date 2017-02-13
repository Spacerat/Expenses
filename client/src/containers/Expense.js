import React, { Component } from 'react';
import {ExpenseDetail} from 'components'
import { connect } from 'react-redux'
import { fetchExpense, updateExpense, deleteExpense } from 'actions'
import _ from 'lodash'

class Expense extends Component {
  componentDidMount() {
    this.props.fetchExpense({id: this.props.id})
  }
  render() {
    // let expense = this.props.expense
    // var props = {expense, updateExpense, deleteExpense}
    return <ExpenseDetail {...this.props}/>
  }
}


export default connect(
  ({expenses}, {params}) => ({
    expense: expenses[params.id],
    id: params.id
  }),
  {fetchExpense, updateExpense, deleteExpense}
)(Expense)
