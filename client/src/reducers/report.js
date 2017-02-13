import { handleActions } from 'redux-actions';
export default handleActions({
	REPORT_FETCH_SUCCEESS: (state, {payload})=> {
		return payload
	}
}, {})
