import React, { Component } from 'react';
import {ReportTable} from 'components'

class Expense extends Component {
  render() {
    var report = {
	    "rows": [
	        {
	            "count": 1,
	            "to": "2011-06-05T00:00:00Z",
	            "total": "$1,337.00",
	            "from": "2011-05-30T00:00:00Z"
	        },
	        {
	            "count": 2,
	            "to": "2017-01-01T00:00:00Z",
	            "total": "$325,359.00",
	            "from": "2016-12-26T00:00:00Z"
	        },
	        {
	            "count": 1,
	            "to": "2017-06-04T00:00:00Z",
	            "total": "$124.21",
	            "from": "2017-05-29T00:00:00Z"
	        },
	        {
	            "count": 1,
	            "to": "2017-12-31T00:00:00Z",
	            "total": "$235.00",
	            "from": "2017-12-25T00:00:00Z"
	        }
	    ],
	    "grouped_by": "week"
	};
    return (
      <ReportTable {...report} />
    );
  }
}

export default Expense;
