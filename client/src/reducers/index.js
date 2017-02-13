import { routerReducer } from 'react-router-redux'
import {combineReducers} from 'redux'
import expenses from './expenses'
import report from './report'

function logReducer(state={}, action) {
	console.log(action)
	return state
}


const rootReducer = combineReducers({
	logReducer, 
	expenses, 
	report,
	routing: routerReducer
})
export default rootReducer
