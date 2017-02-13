import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions';
import _ from 'lodash'

function logReducer(state={}, action) {
	console.log(action)
	return state
}


const expensesMergeActions = combineActions(
	'EXPENSE_FETCH_SUCCESS',
	'EXPENSE_CREATE_SUCCESS',
	'EXPENSE_UPDATE_SUCCESS'
)
const expenses = handleActions({
	EXPENSES_FETCH_SUCCESS: (state, {payload})=>payload.expenses,
	[expensesMergeActions]: (state, {payload})=> {
		return _.merge({}, state, payload.expenses)
	},
	EXPENSES_FETCH_REQUESTED: (state, {payload})=> {
		return (payload.args.user) ? {} : state;
	}
}, {})

const report = handleActions({
	REPORT_FETCH_SUCCESS: (state, {payload})=>payload
}, {})

const users = handleActions({
	USERS_FETCH_SUCCESS: (state, {payload})=>(payload)
}, [])

const user = handleActions({
	SELF_FETCH_SUCCESS: (state, {payload})=>(payload)
}, {})


const rootReducer = combineReducers({
	logReducer, 
	expenses, 
	report,
	users,
	user,
	routing: routerReducer
})
export default rootReducer
