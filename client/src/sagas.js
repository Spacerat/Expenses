import { call, put, takeEvery } from 'redux-saga/effects'
import {getClient} from 'api'
import _ from 'lodash'
import { normalize } from 'normalizr';

function* fetchData({payload}) {
    let {path, result_type} = payload
    try {
        yield put({type: `${result_type}_REQUESTED`});
        path = path.split('.')
        const client = yield call(getClient)
        const func = _.reduce(path, (r, k)=>(r[k]), client)
        const result = yield call(func, payload.args)
        let data = result.data
        if (payload.schema) {
            data = normalize(data, payload.schema).entities
        }
        yield put({type: `${result_type}_SUCCEESS`, payload: data});
        if (payload.then) {
            yield put(payload.then)
        }
    } catch (e) {
        yield put({type: `${result_type}_FAILED`, error: true, message: e.message});
    }
}

function* rootSaga() {
  yield takeEvery("CALL_API", fetchData);
}

export default rootSaga;