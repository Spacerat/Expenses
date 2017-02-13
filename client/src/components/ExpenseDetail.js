import React, { Component } from 'react';
import _ from 'lodash'
import dateFormat from 'dateformat'
import Loading from './Loading'

class ExpenseDetail extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        const {date, time, amount, description} = e.target
        this.props.updateExpense({
            id: this.props.id,
            data: {
                datetime: `${date.value}T${time.value}`,
                amount: amount.value,
                description: description.value
            }
        })
    }
    handleDelete = (e) => {
        this.props.deleteExpense({id: this.props.id})
    }
    render() {
        if (!this.props.expense) return <Loading />
        let {expense: {amount, description, datetime, id}} = this.props;
        return (<div>
            <h3>Expense {id}</h3>
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Amount</label>
                    <div className="col-sm-10">
                        <input className="form-control" name="amount" type="number" step="0.01" min="0" defaultValue={amount} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Date</label>
                    <div className="col-sm-10">
                        <input className="form-control" name="date" type="date"  defaultValue={dateFormat(datetime, 'isoDate')}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Time</label>
                    <div className="col-sm-10">
                        <input className="form-control" name="time" type="time" defaultValue={dateFormat(datetime, 'isoTime')}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Description</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" name="description" defaultValue={description}>
                        </textarea>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button className="btn btn-default mr-sm-1em" type="submit">Submit</button>
                        <button className="btn btn-danger" type="button" onClick={this.handleDelete}>Delete</button>
                    </div>
                </div>                
            </form>
        </div>)
    }
}

export default ExpenseDetail;
