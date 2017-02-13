import { call, put, takeLatest } from 'redux-saga/effects'
import {getClient} from 'api'
import _ from 'lodash'
import { normalize } from 'normalizr';

function* fetchData({payload}) {
	let {path, result_type} = payload
	try {
		console.log(payload.args)
		path = path.split('.')
		const client = yield call(getClient)
		const func = _.reduce(path, (r, k)=>(r[k]), client)
		const result = yield call(func, payload.args)
		let data = result.data
		if (payload.schema) {
			data = normalize(data, payload.schema).entities
		}
	  	yield put({type: `${result_type}_SUCCEESS`, payload: data});
	} catch (e) {
		yield put({type: `${result_type}_FAILED`, message: e.message});
	}
}

function* rootSaga() {
  yield takeLatest("CALL_API", fetchData);
}

export default rootSaga;