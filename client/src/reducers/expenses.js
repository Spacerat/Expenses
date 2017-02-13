import { handleActions, combineActions } from 'redux-actions';
import _ from 'lodash'

const mergeDataActions = combineActions(
	'EXPENSE_FETCH_SUCCEESS',
	'EXPENSE_CREATE_SUCCEESS',
	'EXPENSE_UPDATE_SUCCEESS'
)
export default handleActions({
	EXPENSES_FETCH_SUCCEESS: (state, {payload})=>payload.expenses,
	[mergeDataActions]: (state, {payload})=> {
		return _.merge({}, state, payload.expenses)
	}
}, {})
