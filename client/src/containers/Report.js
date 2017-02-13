import React, { Component } from 'react';
import { connect } from 'react-redux'
import {ReportTable} from 'components'
import { fetchReport } from 'actions'
import _ from 'lodash'

class Report extends Component {
	componentDidMount() {
		this.props.fetchReport()
	}
	render() {
		let report = this.props.report;
    	return <ReportTable {...report} />
	}
}


export default connect(
	({report}) => ({report}),
	{fetchReport}
)(Report)
