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
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.updateFilter({
            from: e.target.from.value,
            to: e.target.to.value,
            groupby: e.target.groupby.value
        })
    }

    handleClear = (e) => {
        e.preventDefault()
        this.props.updateFilter()
    }

    render() {

        return (<form className="form-inline" onSubmit={this.handleSubmit}>

            <label htmlFor="date-form">From: </label>
            <input className="form-control" name="from" type="date" id="report-date-from" />
            <label htmlFor="date-to">To: </label>
            <input className="form-control" name="to" type="date" id="report-date-to" />
            <label>Group By</label>
            <select id="report-groupby" name="groupby" className="form-control">
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
        const {report, fetchReport} = this.props
        if (_.isEmpty(report)) return <Loading />
        const {rows, grouped_by, updateFilter, clearFilter} = report
        return (<div>
            <h3>{PeriodName(grouped_by)} Expenses Report</h3>
            <ReportFilterForm updateFilter={fetchReport} />
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
