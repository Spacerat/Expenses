import React, { Component } from 'react';
import _ from 'lodash'
import 'css/DataTable.css';
import Loading from './Loading'
import dateFormat from 'dateformat'


function PeriodName(grouped_by) {
    return (grouped_by.charAt(0).toUpperCase() + grouped_by.slice(1))+"ly"
}

function ReportRow({count, to, from, total}) {
    return (<tr>
        <td>{dateFormat(from, 'fullDate')}</td>
        <td>{dateFormat(to, 'fullDate')}</td>
        <td>{total}</td>
    </tr>)
}

class ReportFilterForm extends Component {
    handleSubmit(e) {
        e.preventDefault()
        this.props.updateFilter(e)
    }

    handleClear(e) {
        e.preventDefault()
        this.props.clearFilter(e)
    }

    render() {
        return (<form className="form-inline" onSubmit={this.handleSubmit}>

            <label htmlFor="date-form">From: </label>
            <input className="form-control" type="date" id="report-date-from" />
            <label htmlFor="date-to">To: </label>
            <input className="form-control" type="date" id="report-date-to" />
            <label>Group By</label>
            <select id="report-groupby" className="form-control">
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
            </select>
        
            <button type="submit" className="btn btn-default mr-sm-1em">Refresh</button>
            <button type="button" className="btn btn-default" onClick={this.handleClear}>Clear</button>
        </form>)
    }
}

class ReportTable extends Component {
    render() {
        if (_.isEmpty(this.props)) return <Loading />
        const {rows, grouped_by, updateFilter, clearFilter} = this.props
        return (<div>
            <h3>{PeriodName(grouped_by)} Expenses Report</h3>
            <ReportFilterForm updateFilter={updateFilter} clearFilter={clearFilter} />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Period Start</th>
                        <th>Period End</th>
                        <th>Ammount</th>
                    </tr>
                </thead>
                <tbody>
                    {_.map(rows, (e)=><ReportRow key={e.from} {...e} />)}
                </tbody>
            </table>
        </div>
        )
    }
}

export default ReportTable;
