import React, { Component } from 'react';
import {ReportTable} from 'components'
// import {report} from 'api/fake_api'
import api from 'api'

class Expense extends Component {
	constructor(props) {
		super(props)
		this.state = {report: null}
	}
	componentDidMount() {

		api.then((client)=>{
			return client.report.report_list()
		}).then((response) => {
			this.setState({
				report: response.data
			})
		})
	}
	render() {
		const report = this.state.report
		console.log(report)
    	return (
      		(!report ? <div>Loading...</div> : <ReportTable {...report} />)
   		);
	}
}

export default Expense;
