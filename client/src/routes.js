import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import {App} from 'components'
import {Expense, Expenses, Report, Login} from 'containers'

const Routes = (
	<Route path="/" component={App}>
		<IndexRedirect to="/expenses" />
		<Route path="login" component={Login} />
		<Route path="expenses" component={Expenses} />
		<Route path="report" component={Report} />
		<Route path="expense/:id" component={Expense} />
	</Route>
)

export default Routes