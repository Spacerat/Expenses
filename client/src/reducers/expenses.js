import { handleActions } from 'redux-actions';
import _ from 'lodash'
export default handleActions({
	EXPENSES_FETCH_SUCCEESS: (state, {payload})=>payload.expenses,
	EXPENSE_FETCH_SUCCEESS: (state, {payload})=> {
		return _.merge({}, state, payload.expenses)
	}
}, {})
