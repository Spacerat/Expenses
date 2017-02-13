import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import {App, LoginForm} from 'components'
import {Expense, Expenses, Report} from 'containers'

const Routes = (
	<Route path="/" component={App}>
		<IndexRedirect to="/expenses" />
		<Route path="login" component={LoginForm} />
		<Route path="expenses" component={Expenses} />
		<Route path="report" component={Report} />
		<Route path="expense/:id" component={Expense} />
	</Route>
)

export default Routes