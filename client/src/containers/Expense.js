import React, { Component } from 'react';
import {ExpenseDetail} from 'components'
import { connect } from 'react-redux'
import { fetchExpense } from 'actions'
import _ from 'lodash'

class Expense extends Component {
  componentDidMount() {
    console.log(this.props)
    this.props.fetchExpense({id: this.props.id})
  }
  render() {
    let expense = this.props.expense
    var updateExpense = (e)=> {console.log("Updated expense", e)}
    var deleteExpense = (e)=> {console.log("Deleted expense", e)}
    var props = {expense, updateExpense, deleteExpense}
    return <ExpenseDetail {...props}/>
  }
}


export default connect(
  ({expenses}, {params}) => ({
    expense: expenses[params.id],
    id: params.id
  }),
  {fetchExpense}
)(Expense)
