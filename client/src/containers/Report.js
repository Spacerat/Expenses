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
    	return <ReportTable {...this.props} />
	}
}


export default connect(
	({report}) => ({report}),
	{fetchReport}
)(Report)
