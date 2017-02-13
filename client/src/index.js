import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware, push } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import Routes from './routes'
import  {loadAuth} from 'api'
import rootReducer from 'reducers'
import rootSaga from './sagas'
import './index.css';

const did_load_auth = loadAuth()
const sagaMiddleware = createSagaMiddleware()
let store = createStore(
	rootReducer, 
	applyMiddleware(routerMiddleware(browserHistory), sagaMiddleware)
)
const history = syncHistoryWithStore(browserHistory, store)

if (!did_load_auth) {
	push('/login')
}

window.dispatch = store.dispatch
window.store = store

sagaMiddleware.run(rootSaga)

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			{Routes}
		</Router>
	</Provider>,
	document.getElementById('root')
);
